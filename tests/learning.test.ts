import assert from 'node:assert/strict';
import test from 'node:test';
import { getPathById } from '../src/config/index.ts';
import {
  DEFAULT_PROGRESS,
  buildProgressAfterLessonCompletion,
  getLessonById,
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
});
