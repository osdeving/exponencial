import { LESSONS } from '../content';
import { Lesson, Question, RecoveryAssignment, RecoveryOverview, UserProgress } from '../types';

const MAX_RECOVERY_TARGETS = 3;

const normalizeStringArray = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0) : [];

function getLessonsByTopicId(topicId: string) {
  return LESSONS.filter((lesson) => lesson.topicId === topicId).sort((left, right) => left.order - right.order);
}

function getPreviousLessonInTopic(lesson: Lesson) {
  const lessons = getLessonsByTopicId(lesson.topicId);
  const currentIndex = lessons.findIndex((candidate) => candidate.id === lesson.id);

  if (currentIndex <= 0) {
    return undefined;
  }

  return lessons[currentIndex - 1];
}

function getLessonsForCanonicalIds(canonicalIds: string[], currentLessonId: string) {
  const canonicalIdSet = new Set(canonicalIds);

  return LESSONS.filter(
    (lesson) =>
      lesson.id !== currentLessonId &&
      (lesson.canonicalIds ?? []).some((canonicalId) => canonicalIdSet.has(canonicalId)),
  )
    .sort((left, right) => left.order - right.order)
    .map((lesson) => lesson.id);
}

// Sanitiza recuperacoes persistidas para manter compatibilidade entre versoes do app.
export function normalizeRecoveryAssignments(value: unknown): UserProgress['recoveryAssignments'] {
  if (!value || typeof value !== 'object') {
    return {};
  }

  return Object.fromEntries(
    Object.entries(value).flatMap(([lessonId, candidate]) => {
      if (!candidate || typeof candidate !== 'object') {
        return [];
      }

      const record = candidate as Record<string, unknown>;
      if (typeof record.createdAt !== 'string' || typeof record.status !== 'string' || typeof record.summary !== 'string') {
        return [];
      }

      return [
        [
          lessonId,
          {
            lessonId,
            createdAt: record.createdAt,
            status:
              record.status === 'completed'
                ? 'completed'
                : record.status === 'awaiting-retry'
                  ? 'awaiting-retry'
                  : 'active',
            targetLessonIds: normalizeStringArray(record.targetLessonIds),
            revisitedLessonIds: normalizeStringArray(record.revisitedLessonIds),
            sourceQuestionIds: normalizeStringArray(record.sourceQuestionIds),
            misconceptionTags: normalizeStringArray(record.misconceptionTags),
            prerequisiteCanonicalIds: normalizeStringArray(record.prerequisiteCanonicalIds),
            summary: record.summary,
            readyForRetryAt: typeof record.readyForRetryAt === 'string' ? record.readyForRetryAt : undefined,
            completedAt: typeof record.completedAt === 'string' ? record.completedAt : undefined,
          } satisfies RecoveryAssignment,
        ],
      ];
    }),
  );
}

function buildRecoverySummary(targetLessonIds: string[], misconceptionTags: string[]) {
  const targetTitles = targetLessonIds
    .map((lessonId) => LESSONS.find((lesson) => lesson.id === lessonId)?.title)
    .filter((title): title is string => Boolean(title));

  if (misconceptionTags.length > 0) {
    return `Revise ${misconceptionTags.join(', ')} antes de tentar novamente.`;
  }

  if (targetTitles.length > 0) {
    return `Revise ${targetTitles.join(' · ')} antes de tentar novamente.`;
  }

  return 'Revise a base indicada antes de tentar novamente.';
}

// Monta a rota de revisao usando metadados das questoes erradas e fallback para a licao anterior.
export function buildRecoveryAssignment({
  lesson,
  questions,
  incorrectQuestionIds,
  attemptedAt,
}: {
  lesson: Lesson;
  questions: Question[];
  incorrectQuestionIds: string[];
  attemptedAt: string;
}): RecoveryAssignment | null {
  if (incorrectQuestionIds.length === 0) {
    return null;
  }

  const incorrectIdSet = new Set(incorrectQuestionIds);
  const incorrectQuestions = questions.filter((question) => incorrectIdSet.has(question.id));

  const misconceptionTags = Array.from(
    new Set(incorrectQuestions.flatMap((question) => question.misconceptionTags ?? [])),
  );
  const prerequisiteCanonicalIds = Array.from(
    new Set(incorrectQuestions.flatMap((question) => question.prerequisiteCanonicalIds ?? [])),
  );

  const explicitTargetLessonIds = Array.from(
    new Set(incorrectQuestions.flatMap((question) => question.recoveryLessonIds ?? [])),
  );
  const mappedTargetLessonIds = getLessonsForCanonicalIds(prerequisiteCanonicalIds, lesson.id);
  const previousLesson = getPreviousLessonInTopic(lesson);

  const targetLessonIds = (
    explicitTargetLessonIds.length > 0
      ? explicitTargetLessonIds
      : mappedTargetLessonIds.length > 0
        ? mappedTargetLessonIds
        : previousLesson
          ? [previousLesson.id]
          : [lesson.id]
  ).slice(0, MAX_RECOVERY_TARGETS);

  return {
    lessonId: lesson.id,
    createdAt: attemptedAt,
    status: 'active',
    targetLessonIds,
    revisitedLessonIds: [],
    sourceQuestionIds: incorrectQuestionIds,
    misconceptionTags,
    prerequisiteCanonicalIds,
    summary: buildRecoverySummary(targetLessonIds, misconceptionTags),
  };
}

export function getActiveRecoveryAssignment(lessonId: string, progress: UserProgress) {
  const assignment = progress.recoveryAssignments[lessonId];
  if (!assignment || assignment.status === 'completed') {
    return undefined;
  }

  return assignment;
}

export function getNextRecoveryLessonId(assignment?: RecoveryAssignment) {
  if (!assignment) {
    return undefined;
  }

  if (assignment.status === 'awaiting-retry') {
    return assignment.lessonId;
  }

  return assignment.targetLessonIds.find((lessonId) => !assignment.revisitedLessonIds.includes(lessonId)) ?? assignment.lessonId;
}

function getLessonTitle(lessonId: string) {
  return LESSONS.find((lesson) => lesson.id === lessonId)?.title;
}

export function getRecoveryAssignmentReason(assignment: RecoveryAssignment) {
  if (assignment.status === 'awaiting-retry') {
    return `${assignment.summary} Revisao concluida. Refaça os exercicios desta licao para destravar o avanço.`;
  }

  const nextLessonId = getNextRecoveryLessonId(assignment);
  if (nextLessonId && nextLessonId !== assignment.lessonId) {
    const nextLessonTitle = getLessonTitle(nextLessonId);
    return nextLessonTitle ? `${assignment.summary} Proxima revisao: ${nextLessonTitle}.` : assignment.summary;
  }

  return `${assignment.summary} Refaça os exercicios desta licao para destravar o avanço.`;
}

export function getPendingRecoveryAssignments(progress: UserProgress) {
  return Object.values(progress.recoveryAssignments)
    .filter((assignment) => assignment.status !== 'completed')
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt));
}

export function getNextRecoveryAction(progress: UserProgress) {
  const assignment = getPendingRecoveryAssignments(progress)[0];
  if (!assignment) {
    return undefined;
  }

  const lessonId = getNextRecoveryLessonId(assignment);
  return lessonId
    ? {
        assignment,
        lessonId,
      }
    : undefined;
}

export function buildRecoveryOverview(progress: UserProgress): RecoveryOverview {
  const pendingAssignments = getPendingRecoveryAssignments(progress);
  const nextAction = getNextRecoveryAction(progress);
  const nextActionTitle = nextAction ? getLessonTitle(nextAction.lessonId) ?? null : null;

  return {
    pendingAssignments: pendingAssignments.length,
    reviewAssignments: pendingAssignments.filter((assignment) => assignment.status === 'active').length,
    retryAssignments: pendingAssignments.filter((assignment) => assignment.status === 'awaiting-retry').length,
    nextActionLessonId: nextAction?.lessonId ?? null,
    nextActionLessonTitle: nextActionTitle,
    nextActionSummary: nextAction ? getRecoveryAssignmentReason(nextAction.assignment) : null,
  };
}

export function assignRecoveryForLesson({
  progress,
  lesson,
  questions,
  incorrectQuestionIds,
  attemptedAt,
}: {
  progress: UserProgress;
  lesson: Lesson;
  questions: Question[];
  incorrectQuestionIds: string[];
  attemptedAt: string;
}): UserProgress {
  const assignment = buildRecoveryAssignment({
    lesson,
    questions,
    incorrectQuestionIds,
    attemptedAt,
  });

  if (!assignment) {
    return progress;
  }

  return {
    ...progress,
    recoveryAssignments: {
      ...progress.recoveryAssignments,
      [lesson.id]: assignment,
    },
  };
}

export function resolveRecoveryForLesson(progress: UserProgress, lessonId: string, completedAt: string): UserProgress {
  const assignment = progress.recoveryAssignments[lessonId];
  if (!assignment) {
    return progress;
  }

  return {
    ...progress,
    recoveryAssignments: {
      ...progress.recoveryAssignments,
      [lessonId]: {
        ...assignment,
        status: 'completed',
        readyForRetryAt: assignment.readyForRetryAt,
        completedAt,
      },
    },
  };
}

// Registrar visita a uma licao de revisao pode liberar o reteste da licao original.
export function markRecoveryLessonVisited(progress: UserProgress, visitedLessonId: string, visitedAt: string): UserProgress {
  let changed = false;

  const nextAssignments = Object.fromEntries(
    Object.entries(progress.recoveryAssignments).map(([lessonId, assignment]) => {
      if (
        assignment.status !== 'active' ||
        !assignment.targetLessonIds.includes(visitedLessonId) ||
        assignment.revisitedLessonIds.includes(visitedLessonId)
      ) {
        return [lessonId, assignment];
      }

      changed = true;
      const revisitedLessonIds = [...assignment.revisitedLessonIds, visitedLessonId];
      const readyForRetry =
        assignment.targetLessonIds.length > 0 &&
        assignment.targetLessonIds.every((targetLessonId) => revisitedLessonIds.includes(targetLessonId));

      return [
        lessonId,
        {
          ...assignment,
          revisitedLessonIds,
          status: readyForRetry ? 'awaiting-retry' : assignment.status,
          readyForRetryAt: readyForRetry ? visitedAt : assignment.readyForRetryAt,
        },
      ];
    }),
  ) as UserProgress['recoveryAssignments'];

  return changed
    ? {
        ...progress,
        recoveryAssignments: nextAssignments,
      }
    : progress;
}
