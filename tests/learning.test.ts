import assert from 'node:assert/strict';
import test from 'node:test';
import { getPathById } from '../src/config/index.ts';
import {
  DEFAULT_PROGRESS,
  LESSON_PASS_THRESHOLD,
  buildProgressAfterLessonCompletion,
  getFirstActionableLessonInTopic,
  getLessonGate,
  getLessonById,
  getNextUnlockedLessonInTopic,
  getRecommendedLesson,
  getSuggestedPath,
  normalizeProfile,
  normalizeProgress,
} from '../src/lib/learning.ts';

test('normalizeProgress saneia payload persistido sem quebrar o contrato', () => {
  const normalized = normalizeProgress({
    completedLessons: ['fractions-intro', 1],
    lessonScores: {
      'fractions-intro': 80,
      broken: '90',
    },
    scores: {
      fractions: 80,
      invalid: false,
    },
    points: '300',
    badges: ['fraction-master', null],
    savedPaths: ['exam-prep', 'core-rebuild', 2],
    completedPaths: ['geometry-deep', {}],
    lastLessonId: 7,
    streak: '4',
    lastActiveDate: 10,
    attempts: {
      'fractions-intro': {
        score: 4,
        total: 5,
        completedAt: '2026-03-30T10:00:00.000Z',
      },
      broken: {
        score: '4',
        total: 5,
        completedAt: '2026-03-30T10:00:00.000Z',
      },
    },
    canonicalMastery: {
      'NUM.06.01': {
        subsectionId: 'NUM.06',
        bestScore: 80,
        latestScore: 80,
        attemptCount: 1,
        mastered: true,
        lastLessonId: 'fractions-intro',
        updatedAt: '2026-03-30T10:00:00.000Z',
      },
      broken: {
        subsectionId: 'BROKEN',
        bestScore: '80',
      },
    },
    recoveryAssignments: {
      'fractions-operations': {
        createdAt: '2026-03-31T10:00:00.000Z',
        status: 'awaiting-retry',
        targetLessonIds: ['fractions-intro'],
        revisitedLessonIds: ['fractions-intro'],
        sourceQuestionIds: ['fractions-operations-question-20'],
        misconceptionTags: ['soma de frações com denominadores diferentes'],
        prerequisiteCanonicalIds: ['NUM.06.12'],
        summary: 'Revise a base.',
        readyForRetryAt: '2026-03-31T10:10:00.000Z',
      },
    },
  });

  assert.deepEqual(normalized.completedLessons, ['fractions-intro']);
  assert.deepEqual(normalized.lessonScores, { 'fractions-intro': 80 });
  assert.deepEqual(normalized.scores, { fractions: 80 });
  assert.equal(normalized.points, 0);
  assert.deepEqual(normalized.badges, ['fraction-master']);
  assert.deepEqual(normalized.savedPaths, ['core-rebuild']);
  assert.deepEqual(normalized.completedPaths, ['geometry-visual']);
  assert.equal(normalized.lastLessonId, null);
  assert.equal(normalized.streak, 0);
  assert.equal(normalized.lastActiveDate, null);
  assert.deepEqual(normalized.attempts, {
    'fractions-intro': {
      score: 4,
      total: 5,
      completedAt: '2026-03-30T10:00:00.000Z',
    },
  });
  assert.deepEqual(normalized.canonicalMastery, {
    'NUM.06.01': {
      canonicalId: 'NUM.06.01',
      subsectionId: 'NUM.06',
      bestScore: 80,
      latestScore: 80,
      attemptCount: 1,
      mastered: true,
      lastLessonId: 'fractions-intro',
      updatedAt: '2026-03-30T10:00:00.000Z',
    },
  });
  assert.deepEqual(normalized.recoveryAssignments, {
    'fractions-operations': {
      lessonId: 'fractions-operations',
      createdAt: '2026-03-31T10:00:00.000Z',
      status: 'awaiting-retry',
      targetLessonIds: ['fractions-intro'],
      revisitedLessonIds: ['fractions-intro'],
      sourceQuestionIds: ['fractions-operations-question-20'],
      misconceptionTags: ['soma de frações com denominadores diferentes'],
      prerequisiteCanonicalIds: ['NUM.06.12'],
      summary: 'Revise a base.',
      readyForRetryAt: '2026-03-31T10:10:00.000Z',
      completedAt: undefined,
    },
  });
});

test('normalizeProfile exige nome e aplica defaults consistentes', () => {
  assert.equal(
    normalizeProfile({
      level: 'Médio',
      goal: 'Vestibular',
    }),
    null,
  );

  const normalized = normalizeProfile({
    name: '  Ana  ',
    level: 'Inválido',
    goal: 'Objetivo desconhecido',
    weeklyGoal: 5,
    favoriteTopics: ['fractions', 8],
    joinedAt: '2026-03-01T12:00:00.000Z',
  });

  assert.deepEqual(normalized, {
    name: 'Ana',
    level: 'Fundamental',
    goal: 'Melhorar notas',
    weeklyGoal: 5,
    favoriteTopics: ['fractions'],
    joinedAt: '2026-03-01T12:00:00.000Z',
  });
});

test('getSuggestedPath seleciona trilhas coerentes com perfil e objetivo', () => {
  assert.equal(getSuggestedPath(null).id, 'core-rebuild');
  assert.equal(
    getSuggestedPath({
      name: 'Bia',
      level: 'Fundamental',
      goal: 'Preparar faculdade',
      weeklyGoal: 3,
      favoriteTopics: [],
      joinedAt: '2026-03-01T12:00:00.000Z',
    }).id,
    'zero-math-journey',
  );
  assert.equal(
    getSuggestedPath({
      name: 'Caio',
      level: 'Médio',
      goal: 'Melhorar notas',
      weeklyGoal: 4,
      favoriteTopics: [],
      joinedAt: '2026-03-01T12:00:00.000Z',
    }).id,
    'algebra-functions-ladder',
  );
  assert.equal(
    getSuggestedPath({
      name: 'Duda',
      level: 'Médio',
      goal: 'Vestibular',
      weeklyGoal: 4,
      favoriteTopics: [],
      joinedAt: '2026-03-01T12:00:00.000Z',
    }).id,
    'enem-nuclear',
  );
});

test('getPathById preserva compatibilidade com ids legados de trilha', () => {
  assert.equal(getPathById('exam-prep')?.id, 'core-rebuild');
  assert.equal(getPathById('geometry-deep')?.id, 'geometry-visual');
  assert.equal(getPathById('algebra-track')?.id, 'algebra-functions-ladder');
  assert.equal(getPathById('vestibular-essentials')?.id, 'enem-nuclear');
});

test('buildProgressAfterLessonCompletion atualiza pontuação, tentativa e próxima recomendação', () => {
  const lesson = getLessonById('fractions-intro');
  assert.ok(lesson, 'A lição fractions-intro precisa existir no seed curricular.');

  const firstAttempt = buildProgressAfterLessonCompletion({
    progress: structuredClone(DEFAULT_PROGRESS),
    lesson,
    score: 4,
    total: 5,
    completedAt: '2026-03-30T10:00:00.000Z',
  });

  assert.deepEqual(firstAttempt.completedLessons, ['fractions-intro']);
  assert.equal(firstAttempt.lessonScores['fractions-intro'], 80);
  assert.equal(firstAttempt.scores.fractions, 80);
  assert.equal(firstAttempt.points, 260);
  assert.equal(firstAttempt.lastLessonId, 'fractions-intro');
  assert.equal(firstAttempt.streak, 1);
  assert.equal(firstAttempt.lastActiveDate, '2026-03-30');
  assert.deepEqual(firstAttempt.attempts['fractions-intro'], {
    score: 4,
    total: 5,
    completedAt: '2026-03-30T10:00:00.000Z',
  });
  assert.equal(firstAttempt.canonicalMastery['NUM.06.01']?.bestScore, 80);
  assert.equal(firstAttempt.canonicalMastery['NUM.06.01']?.mastered, true);
  assert.equal(firstAttempt.canonicalMastery['NUM.06.08']?.attemptCount, 1);
  assert.equal(getRecommendedLesson(firstAttempt)?.id, 'fractions-operations');

  const secondAttempt = buildProgressAfterLessonCompletion({
    progress: firstAttempt,
    lesson,
    score: 3,
    total: 5,
    completedAt: '2026-03-31T09:00:00.000Z',
  });

  assert.equal(secondAttempt.lessonScores['fractions-intro'], 80);
  assert.equal(secondAttempt.points, 430);
  assert.equal(secondAttempt.streak, 2);
  assert.deepEqual(secondAttempt.completedLessons, ['fractions-intro']);
  assert.deepEqual(secondAttempt.attempts['fractions-intro'], {
    score: 3,
    total: 5,
    completedAt: '2026-03-31T09:00:00.000Z',
  });
  assert.equal(secondAttempt.canonicalMastery['NUM.06.01']?.bestScore, 80);
  assert.equal(secondAttempt.canonicalMastery['NUM.06.01']?.latestScore, 60);
  assert.equal(secondAttempt.canonicalMastery['NUM.06.01']?.attemptCount, 2);
});

test('buildProgressAfterLessonCompletion so conclui a licao quando atinge o corte minimo', () => {
  const lesson = getLessonById('fractions-intro');
  assert.ok(lesson, 'A lição fractions-intro precisa existir no seed curricular.');

  const failedAttempt = buildProgressAfterLessonCompletion({
    progress: structuredClone(DEFAULT_PROGRESS),
    lesson,
    score: 3,
    total: 5,
    completedAt: '2026-03-31T10:00:00.000Z',
  });

  assert.deepEqual(failedAttempt.completedLessons, []);
  assert.equal(failedAttempt.lessonScores['fractions-intro'], 60);
  assert.equal(getLessonGate(lesson, failedAttempt).status, 'in-review');
  assert.equal(getNextUnlockedLessonInTopic(lesson.topicId, lesson.id, failedAttempt), undefined);

  const passedAttempt = buildProgressAfterLessonCompletion({
    progress: failedAttempt,
    lesson,
    score: 4,
    total: 5,
    completedAt: '2026-03-31T11:00:00.000Z',
  });

  assert.deepEqual(passedAttempt.completedLessons, ['fractions-intro']);
  assert.equal(passedAttempt.lessonScores['fractions-intro'], LESSON_PASS_THRESHOLD);
  assert.equal(getLessonGate(lesson, passedAttempt).status, 'passed');
  assert.equal(getNextUnlockedLessonInTopic(lesson.topicId, lesson.id, passedAttempt)?.id, 'fractions-operations');
});

test('getRecommendedLesson prioriza o retorno ao teste original quando a recuperacao ja foi revisada', () => {
  const recommendedLesson = getRecommendedLesson({
    ...DEFAULT_PROGRESS,
    lastLessonId: 'fractions-intro',
    recoveryAssignments: {
      'fractions-operations': {
        lessonId: 'fractions-operations',
        createdAt: '2026-03-31T10:00:00.000Z',
        status: 'awaiting-retry',
        targetLessonIds: ['fractions-intro'],
        revisitedLessonIds: ['fractions-intro'],
        sourceQuestionIds: ['fractions-operations-question-20'],
        misconceptionTags: ['soma de frações com denominadores diferentes'],
        prerequisiteCanonicalIds: ['NUM.06.12'],
        summary: 'Revise a base.',
        readyForRetryAt: '2026-03-31T10:10:00.000Z',
      },
    },
  });

  assert.equal(recommendedLesson?.id, 'fractions-operations');
});

test('getLessonGate bloqueia a proxima etapa enquanto a anterior nao passa', () => {
  const introLesson = getLessonById('fractions-intro');
  const operationsLesson = getLessonById('fractions-operations');
  assert.ok(introLesson);
  assert.ok(operationsLesson);

  const blockedProgress = buildProgressAfterLessonCompletion({
    progress: structuredClone(DEFAULT_PROGRESS),
    lesson: introLesson,
    score: 3,
    total: 5,
    completedAt: '2026-03-31T10:00:00.000Z',
  });

  const blockedGate = getLessonGate(operationsLesson, blockedProgress);
  assert.equal(blockedGate.status, 'locked');
  assert.equal(blockedGate.blockingLessonId, 'fractions-intro');
  assert.match(blockedGate.reason, /Frações/i);
  assert.equal(getFirstActionableLessonInTopic('fractions', blockedProgress)?.id, 'fractions-intro');

  const unlockedProgress = buildProgressAfterLessonCompletion({
    progress: blockedProgress,
    lesson: introLesson,
    score: 5,
    total: 5,
    completedAt: '2026-03-31T11:00:00.000Z',
  });

  assert.equal(getLessonGate(operationsLesson, unlockedProgress).status, 'ready');
  assert.equal(getFirstActionableLessonInTopic('fractions', unlockedProgress)?.id, 'fractions-operations');
});
