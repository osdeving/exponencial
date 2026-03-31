import assert from 'node:assert/strict';
import test from 'node:test';
import { buildCanonicalMasteryAfterLessonCompletion, buildCanonicalMasteryOverview } from '../src/lib/mastery.ts';
import { DEFAULT_PROGRESS, getLessonById } from '../src/lib/learning.ts';

test('buildCanonicalMasteryAfterLessonCompletion atualiza cada habilidade canônica da lição', () => {
  const lesson = getLessonById('fractions-intro');
  assert.ok(lesson, 'A lição fractions-intro precisa existir no seed curricular.');

  const firstAttempt = buildCanonicalMasteryAfterLessonCompletion({
    currentMastery: {},
    lesson,
    percentage: 80,
    completedAt: '2026-03-31T10:00:00.000Z',
  });

  assert.equal(Object.keys(firstAttempt).length, 8);
  assert.deepEqual(firstAttempt['NUM.06.01'], {
    canonicalId: 'NUM.06.01',
    subsectionId: 'NUM.06',
    bestScore: 80,
    latestScore: 80,
    attemptCount: 1,
    mastered: true,
    lastLessonId: 'fractions-intro',
    updatedAt: '2026-03-31T10:00:00.000Z',
  });

  const secondAttempt = buildCanonicalMasteryAfterLessonCompletion({
    currentMastery: firstAttempt,
    lesson,
    percentage: 60,
    completedAt: '2026-03-31T11:00:00.000Z',
  });

  assert.equal(secondAttempt['NUM.06.01']?.bestScore, 80);
  assert.equal(secondAttempt['NUM.06.01']?.latestScore, 60);
  assert.equal(secondAttempt['NUM.06.01']?.attemptCount, 2);
  assert.equal(secondAttempt['NUM.06.01']?.mastered, true);
});

test('buildCanonicalMasteryOverview resume domínio, dívida ativa e cobertura por subseção', () => {
  const overview = buildCanonicalMasteryOverview({
    ...DEFAULT_PROGRESS,
    canonicalMastery: {
      'NUM.06.01': {
        canonicalId: 'NUM.06.01',
        subsectionId: 'NUM.06',
        bestScore: 90,
        latestScore: 90,
        attemptCount: 1,
        mastered: true,
        lastLessonId: 'fractions-intro',
        updatedAt: '2026-03-31T10:00:00.000Z',
      },
      'NUM.06.02': {
        canonicalId: 'NUM.06.02',
        subsectionId: 'NUM.06',
        bestScore: 50,
        latestScore: 50,
        attemptCount: 1,
        mastered: false,
        lastLessonId: 'fractions-intro',
        updatedAt: '2026-03-31T10:00:00.000Z',
      },
      'NUM.10.01': {
        canonicalId: 'NUM.10.01',
        subsectionId: 'NUM.10',
        bestScore: 40,
        latestScore: 40,
        attemptCount: 1,
        mastered: false,
        lastLessonId: 'powers-exponents',
        updatedAt: '2026-03-31T10:00:00.000Z',
      },
    },
  });

  assert.equal(overview.totalSkills, 495);
  assert.equal(overview.attemptedSkills, 3);
  assert.equal(overview.masteredSkills, 1);
  assert.equal(overview.activeDebtSkills, 2);
  assert.equal(overview.untouchedSkills, 492);
  assert.equal(overview.masteryPercent, 0);
  assert.deepEqual(
    overview.activeDebtBuckets.slice(0, 2).map((bucket) => bucket.subsectionId),
    ['NUM.10', 'NUM.06'],
  );

  const fractionsBucket = overview.buckets.find((bucket) => bucket.subsectionId === 'NUM.06');
  assert.deepEqual(fractionsBucket, {
    subsectionId: 'NUM.06',
    subsectionTitle: 'Frações',
    branchTitle: 'Números, operações, frações, razão e estruturas aritméticas',
    totalSkills: 20,
    masteredSkills: 1,
    attemptedSkills: 2,
    activeDebtSkills: 1,
    untouchedSkills: 18,
    masteryPercent: 5,
  });
});
