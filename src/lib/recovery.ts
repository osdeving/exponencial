import { LESSONS } from '../content';
import { Lesson, Question, RecoveryAssignment, UserProgress } from '../types';

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
            status: record.status === 'completed' ? 'completed' : 'active',
            targetLessonIds: normalizeStringArray(record.targetLessonIds),
            revisitedLessonIds: normalizeStringArray(record.revisitedLessonIds),
            sourceQuestionIds: normalizeStringArray(record.sourceQuestionIds),
            misconceptionTags: normalizeStringArray(record.misconceptionTags),
            prerequisiteCanonicalIds: normalizeStringArray(record.prerequisiteCanonicalIds),
            summary: record.summary,
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
  if (!assignment || assignment.status !== 'active') {
    return undefined;
  }

  return assignment;
}

export function getNextRecoveryLessonId(assignment?: RecoveryAssignment) {
  if (!assignment) {
    return undefined;
  }

  return assignment.targetLessonIds.find((lessonId) => !assignment.revisitedLessonIds.includes(lessonId));
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
        completedAt,
      },
    },
  };
}

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
      const completed =
        assignment.targetLessonIds.length > 0 &&
        assignment.targetLessonIds.every((targetLessonId) => revisitedLessonIds.includes(targetLessonId));

      return [
        lessonId,
        {
          ...assignment,
          revisitedLessonIds,
          status: completed ? 'completed' : assignment.status,
          completedAt: completed ? visitedAt : assignment.completedAt,
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
