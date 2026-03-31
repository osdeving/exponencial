import { LESSONS, TOPICS } from '../content';
import { BADGES, PATHS, getCanonicalPathId, getPathById } from '../config';
import { buildCanonicalMasteryAfterLessonCompletion, normalizeCanonicalMastery } from './mastery';
import {
  Badge,
  ContentStatus,
  Lesson,
  LearningGoal,
  LearningPath,
  Level,
  SearchResult,
  Topic,
  UserProfile,
  UserProgress,
} from '../types';

export const DEFAULT_PROGRESS: UserProgress = {
  completedLessons: [],
  lessonScores: {},
  scores: {},
  points: 0,
  badges: [],
  savedPaths: [],
  completedPaths: [],
  lastLessonId: null,
  streak: 0,
  lastActiveDate: null,
  attempts: {},
  canonicalMastery: {},
};

export const DEFAULT_PROFILE: UserProfile = {
  name: '',
  level: 'Fundamental',
  goal: 'Melhorar notas',
  weeklyGoal: 3,
  favoriteTopics: [],
  joinedAt: '',
};

export const LEVEL_FILTERS: Array<'Todos' | Level> = ['Todos', 'Fundamental', 'Médio'];
export const STATUS_FILTERS: Array<'Todos' | ContentStatus> = ['Todos', 'outline', 'in-progress', 'ready'];

const SEARCH_LIMIT = 8;

const normalizeStringArray = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];

const normalizePathIdArray = (value: unknown): string[] =>
  Array.from(new Set(normalizeStringArray(value).map((pathId) => getCanonicalPathId(pathId))));

const normalizeNumberRecord = (value: unknown): Record<string, number> => {
  if (!value || typeof value !== 'object') {
    return {};
  }

  return Object.fromEntries(
    Object.entries(value).filter((entry): entry is [string, number] => typeof entry[1] === 'number'),
  );
};

const normalizeAttempts = (value: unknown): UserProgress['attempts'] => {
  if (!value || typeof value !== 'object') {
    return {};
  }

  return Object.fromEntries(
    Object.entries(value).flatMap(([lessonId, attempt]) => {
      if (!attempt || typeof attempt !== 'object') {
        return [];
      }

      const { score, total, completedAt } = attempt as Record<string, unknown>;
      if (
        typeof score !== 'number' ||
        typeof total !== 'number' ||
        typeof completedAt !== 'string'
      ) {
        return [];
      }

      return [[lessonId, { score, total, completedAt }]];
    }),
  );
};

export function normalizeProgress(raw: unknown): UserProgress {
  if (!raw || typeof raw !== 'object') {
    return DEFAULT_PROGRESS;
  }

  const value = raw as Record<string, unknown>;

  return {
    completedLessons: normalizeStringArray(value.completedLessons),
    lessonScores: normalizeNumberRecord(value.lessonScores),
    scores: normalizeNumberRecord(value.scores),
    points: typeof value.points === 'number' ? value.points : 0,
    badges: normalizeStringArray(value.badges),
    savedPaths: normalizePathIdArray(value.savedPaths),
    completedPaths: normalizePathIdArray(value.completedPaths),
    lastLessonId: typeof value.lastLessonId === 'string' ? value.lastLessonId : null,
    streak: typeof value.streak === 'number' ? value.streak : 0,
    lastActiveDate: typeof value.lastActiveDate === 'string' ? value.lastActiveDate : null,
    attempts: normalizeAttempts(value.attempts),
    canonicalMastery: normalizeCanonicalMastery(value.canonicalMastery),
  };
}

export function normalizeProfile(raw: unknown): UserProfile | null {
  if (!raw || typeof raw !== 'object') {
    return null;
  }

  const value = raw as Record<string, unknown>;
  if (typeof value.name !== 'string' || value.name.trim().length === 0) {
    return null;
  }

  return {
    name: value.name.trim(),
    level: isLevel(value.level) ? value.level : 'Fundamental',
    goal: isLearningGoal(value.goal) ? value.goal : 'Melhorar notas',
    weeklyGoal: typeof value.weeklyGoal === 'number' ? value.weeklyGoal : 3,
    favoriteTopics: normalizeStringArray(value.favoriteTopics),
    joinedAt: typeof value.joinedAt === 'string' ? value.joinedAt : new Date().toISOString(),
  };
}

export function isLevel(value: unknown): value is Level {
  return value === 'Fundamental' || value === 'Médio' || value === 'Superior';
}

export function isLearningGoal(value: unknown): value is LearningGoal {
  return (
    value === 'Revisar base' ||
    value === 'Melhorar notas' ||
    value === 'Vestibular' ||
    value === 'Preparar faculdade'
  );
}

export function getTopicById(topicId: string): Topic | undefined {
  return TOPICS.find((topic) => topic.id === topicId);
}

export function getLessonById(lessonId: string): Lesson | undefined {
  return LESSONS.find((lesson) => lesson.id === lessonId);
}

export function getLessonsByTopic(topicId: string): Lesson[] {
  return LESSONS.filter((lesson) => lesson.topicId === topicId).sort((a, b) => a.order - b.order);
}

export function getTopicProgress(topicId: string, progress: UserProgress) {
  const topicLessons = getLessonsByTopic(topicId);
  const completed = topicLessons.filter((lesson) => progress.completedLessons.includes(lesson.id)).length;
  const attemptedScores = topicLessons
    .map((lesson) => progress.lessonScores[lesson.id])
    .filter((score): score is number => typeof score === 'number');
  const averageScore =
    attemptedScores.length > 0
      ? Math.round(attemptedScores.reduce((total, score) => total + score, 0) / attemptedScores.length)
      : 0;

  return {
    totalLessons: topicLessons.length,
    completedLessons: completed,
    completionPercent: topicLessons.length === 0 ? 0 : Math.round((completed / topicLessons.length) * 100),
    averageScore,
  };
}

export function getPathProgress(path: LearningPath, progress: UserProgress) {
  const pathLessons = path.topicIds.flatMap((topicId) => getLessonsByTopic(topicId));
  const completed = pathLessons.filter((lesson) => progress.completedLessons.includes(lesson.id)).length;

  return {
    totalLessons: pathLessons.length,
    completedLessons: completed,
    completionPercent: pathLessons.length === 0 ? 0 : Math.round((completed / pathLessons.length) * 100),
  };
}

export function getNextLessonInTopic(topicId: string, lessonId: string): Lesson | undefined {
  const topicLessons = getLessonsByTopic(topicId);
  const currentIndex = topicLessons.findIndex((lesson) => lesson.id === lessonId);

  if (currentIndex === -1 || currentIndex === topicLessons.length - 1) {
    return undefined;
  }

  return topicLessons[currentIndex + 1];
}

export function getNextLessonForPath(pathId: string, progress: UserProgress): Lesson | undefined {
  const path = getPathById(pathId);
  if (!path) {
    return undefined;
  }

  const candidate = path.topicIds
    .flatMap((topicId) => getLessonsByTopic(topicId))
    .find((lesson) => !progress.completedLessons.includes(lesson.id));

  return candidate ?? getLessonById(path.featuredLessonId) ?? getLessonsByTopic(path.topicIds[0])[0];
}

export function getRecommendedLesson(progress: UserProgress): Lesson | undefined {
  if (progress.lastLessonId) {
    const lastLesson = getLessonById(progress.lastLessonId);
    if (lastLesson) {
      const nextInTopic = getNextLessonInTopic(lastLesson.topicId, lastLesson.id);
      if (nextInTopic && !progress.completedLessons.includes(nextInTopic.id)) {
        return nextInTopic;
      }
    }
  }

  for (const pathId of progress.savedPaths) {
    const lesson = getNextLessonForPath(pathId, progress);
    if (lesson && lesson.status !== 'outline') {
      return lesson;
    }
  }

  return (
    LESSONS.find((lesson) => lesson.status !== 'outline' && !progress.completedLessons.includes(lesson.id)) ??
    LESSONS.find((lesson) => !progress.completedLessons.includes(lesson.id)) ??
    LESSONS[0]
  );
}

export function getSuggestedPath(profile: UserProfile | null): LearningPath {
  if (!profile) {
    return getPathById('core-rebuild') ?? PATHS[0];
  }

  if (profile.goal === 'Revisar base') {
    return getPathById('core-rebuild') ?? PATHS[0];
  }

  if (profile.goal === 'Preparar faculdade') {
    return getPathById('zero-math-journey') ?? PATHS[0];
  }

  if (profile.goal === 'Vestibular') {
    return getPathById('enem-nuclear') ?? PATHS[0];
  }

  if (profile.level === 'Médio') {
    return getPathById('algebra-functions-ladder') ?? PATHS[0];
  }

  return getPathById('fundamental-complete') ?? PATHS[0];
}

export function getContentStatusLabel(status: ContentStatus | 'Todos') {
  if (status === 'ready') {
    return 'Pronto';
  }

  if (status === 'in-progress') {
    return 'Em progresso';
  }

  if (status === 'outline') {
    return 'Estrutura pronta';
  }

  return 'Todos';
}

export function getTopicBranchLabel(topic: Topic) {
  return topic.branchTitle ?? topic.category;
}

export function getBranchFilters(topics: Topic[] = TOPICS) {
  return ['Todos os ramos', ...Array.from(new Set(topics.map((topic) => getTopicBranchLabel(topic)))).sort((left, right) => left.localeCompare(right, 'pt-BR'))];
}

export function groupTopicsByBranch(topics: Topic[]) {
  const groups = topics.reduce<Record<string, Topic[]>>((accumulator, topic) => {
    const branchLabel = getTopicBranchLabel(topic);
    const currentTopics = accumulator[branchLabel] ?? [];
    currentTopics.push(topic);
    accumulator[branchLabel] = currentTopics;
    return accumulator;
  }, {});

  return Object.entries(groups)
    .sort(([left], [right]) => left.localeCompare(right, 'pt-BR'))
    .map(([branchTitle, branchTopics]) => ({
      branchTitle,
      topics: branchTopics.sort((left, right) => left.order - right.order || left.title.localeCompare(right.title, 'pt-BR')),
    }));
}

export function buildSearchResults(query: string): SearchResult[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return [];
  }

  const topicResults: SearchResult[] = TOPICS.filter((topic) =>
    `${topic.title} ${topic.description} ${topic.category} ${topic.stage} ${topic.tags.join(' ')} ${(topic.canonicalIds ?? []).join(' ')} ${(topic.canonicalTitles ?? []).join(' ')} ${(topic.examProfiles ?? []).join(' ')} ${(topic.schoolYearBands ?? []).join(' ')} ${(topic.branchTitles ?? []).join(' ')}`
      .toLowerCase()
      .includes(normalized),
  ).map((topic) => ({
    type: 'topic',
    id: topic.id,
    title: topic.title,
    subtitle: `${topic.level} · ${topic.stage} · ${getTopicBranchLabel(topic)}`,
    level: topic.level,
  }));

  const lessonResults: SearchResult[] = LESSONS.filter((lesson) =>
    `${lesson.title} ${lesson.summary} ${lesson.goals.join(' ')} ${lesson.prerequisites.join(' ')} ${lesson.tags.join(' ')}`
      .toLowerCase()
      .includes(normalized),
  ).map((lesson) => {
    const topic = getTopicById(lesson.topicId);

    return {
      type: 'lesson',
      id: lesson.id,
      title: lesson.title,
      subtitle: topic ? `${topic.title} · ${topic.stage} · ${lesson.difficulty}` : lesson.difficulty,
      level: topic?.level,
    };
  });

  const pathResults: SearchResult[] = PATHS.filter((path) =>
    `${path.title} ${path.description} ${path.focus}`.toLowerCase().includes(normalized),
  ).map((path) => ({
    type: 'path',
    id: path.id,
    title: path.title,
    subtitle: `${path.estimatedWeeks} semanas · ${path.focus}`,
  }));

  return [...topicResults, ...lessonResults, ...pathResults].slice(0, SEARCH_LIMIT);
}

export function filterTopicsForCatalog({
  query,
  levelFilter,
  branchFilter,
  statusFilter,
  favoriteTopicIds,
}: {
  query: string;
  levelFilter: 'Todos' | Level;
  branchFilter: string;
  statusFilter: 'Todos' | ContentStatus;
  favoriteTopicIds: string[];
}) {
  const normalizedQuery = query.trim().toLowerCase();

  return TOPICS.filter((topic) => {
    const passesLevel =
      levelFilter === 'Todos' || topic.level === levelFilter || Boolean(topic.levelBands?.includes(levelFilter));
    if (!passesLevel) {
      return false;
    }

    const passesBranch = branchFilter === 'Todos os ramos' || getTopicBranchLabel(topic) === branchFilter;
    if (!passesBranch) {
      return false;
    }

    const passesStatus = statusFilter === 'Todos' || topic.status === statusFilter;
    if (!passesStatus) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const searchableContent = [
      topic.title,
      topic.description,
      topic.stage,
      topic.category,
      getTopicBranchLabel(topic),
      ...topic.tags,
      ...(topic.canonicalIds ?? []),
      ...(topic.canonicalTitles ?? []),
      ...(topic.schoolYearBands ?? []),
      ...(topic.examProfiles ?? []),
      ...(topic.flags ?? []),
      ...getLessonsByTopic(topic.id).map(
        (lesson) =>
          `${lesson.title} ${lesson.summary} ${lesson.goals.join(' ')} ${lesson.prerequisites.join(' ')} ${lesson.status} ${(lesson.canonicalIds ?? []).join(' ')} ${lesson.tags.join(' ')}`,
      ),
    ]
      .join(' ')
      .toLowerCase();

    return searchableContent.includes(normalizedQuery);
  }).sort((left, right) => {
    const leftFavorite = favoriteTopicIds.includes(left.id) ? 1 : 0;
    const rightFavorite = favoriteTopicIds.includes(right.id) ? 1 : 0;
    return rightFavorite - leftFavorite || left.order - right.order;
  });
}

export function getCompletedPaths(progress: UserProgress): string[] {
  return PATHS.filter((path) => {
    const pathLessons = path.topicIds.flatMap((topicId) => getLessonsByTopic(topicId));
    return pathLessons.length > 0 && pathLessons.every((lesson) => progress.completedLessons.includes(lesson.id));
  }).map((path) => path.id);
}

export function getEarnedBadges(progress: UserProgress): string[] {
  const earned = new Set(progress.badges);

  BADGES.forEach((badge) => {
    const topicLessons = getLessonsByTopic(badge.requirement);
    const perfectTopic =
      topicLessons.length > 0 &&
      topicLessons.every((lesson) => progress.lessonScores[lesson.id] === 100);

    if (perfectTopic) {
      earned.add(badge.id);
    }
  });

  return Array.from(earned);
}

export function getBadgeById(badgeId: string): Badge | undefined {
  return BADGES.find((badge) => badge.id === badgeId);
}

export function calculatePoints(score: number, total: number, isFirstCompletion: boolean) {
  const percentage = total === 0 ? 0 : Math.round((score / total) * 100);
  const completionBonus = isFirstCompletion ? 60 : 20;
  const perfectBonus = percentage === 100 ? 80 : 0;

  return Math.round(percentage * 2.5) + completionBonus + perfectBonus;
}

export function getNewStreak(lastActiveDate: string | null, nextDate: string, currentStreak: number) {
  if (!lastActiveDate) {
    return 1;
  }

  if (lastActiveDate === nextDate) {
    return currentStreak || 1;
  }

  const previous = new Date(`${lastActiveDate}T00:00:00`);
  const current = new Date(`${nextDate}T00:00:00`);
  const dayDifference = Math.round((current.getTime() - previous.getTime()) / (1000 * 60 * 60 * 24));

  if (dayDifference === 1) {
    return currentStreak + 1;
  }

  return 1;
}

export function buildProgressAfterLessonCompletion({
  progress,
  lesson,
  score,
  total,
  completedAt,
  nextLessonId,
}: {
  progress: UserProgress;
  lesson: Lesson;
  score: number;
  total: number;
  completedAt: string;
  nextLessonId?: string;
}) {
  const currentDate = completedAt.slice(0, 10);
  const percentage = total === 0 ? 0 : Math.round((score / total) * 100);
  const isFirstCompletion = !progress.completedLessons.includes(lesson.id);
  const nextLessonScores = {
    ...progress.lessonScores,
    [lesson.id]: Math.max(progress.lessonScores[lesson.id] ?? 0, percentage),
  };
  const nextCompletedLessons = Array.from(new Set([...progress.completedLessons, lesson.id]));
  const nextScores = recomputeTopicScores(nextLessonScores);
  const nextPoints = progress.points + calculatePoints(score, total, isFirstCompletion);
  const nextCanonicalMastery = buildCanonicalMasteryAfterLessonCompletion({
    currentMastery: progress.canonicalMastery,
    lesson,
    percentage,
    completedAt,
  });

  const draftProgress: UserProgress = {
    ...progress,
    completedLessons: nextCompletedLessons,
    lessonScores: nextLessonScores,
    scores: nextScores,
    points: nextPoints,
    lastLessonId: nextLessonId ?? lesson.id,
    streak: getNewStreak(progress.lastActiveDate, currentDate, progress.streak),
    lastActiveDate: currentDate,
    attempts: {
      ...progress.attempts,
      [lesson.id]: {
        score,
        total,
        completedAt,
      },
    },
    canonicalMastery: nextCanonicalMastery,
  };

  const nextBadges = getEarnedBadges(draftProgress);

  return {
    ...draftProgress,
    badges: nextBadges,
    completedPaths: getCompletedPaths({ ...draftProgress, badges: nextBadges }),
  };
}

export function recomputeTopicScores(lessonScores: Record<string, number>) {
  return TOPICS.reduce<Record<string, number>>((accumulator, topic) => {
    const scores = getLessonsByTopic(topic.id)
      .map((lesson) => lessonScores[lesson.id])
      .filter((score): score is number => typeof score === 'number');

    accumulator[topic.id] =
      scores.length > 0 ? Math.round(scores.reduce((total, score) => total + score, 0) / scores.length) : 0;

    return accumulator;
  }, {});
}
