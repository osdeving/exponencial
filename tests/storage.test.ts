import assert from 'node:assert/strict';
import test from 'node:test';
import { DEFAULT_PROGRESS } from '../src/lib/learning.ts';
import {
  buildStorageSnapshot,
  parseStorageSnapshot,
  serializeStorageSnapshot,
} from '../src/app/storage.ts';

test('buildStorageSnapshot e parseStorageSnapshot preservam contrato local-first', () => {
  const snapshot = buildStorageSnapshot({
    profile: {
      name: 'Ana',
      level: 'Fundamental',
      goal: 'Revisar base',
      weeklyGoal: 4,
      favoriteTopics: ['fractions'],
      joinedAt: '2026-03-01T12:00:00.000Z',
    },
    progress: {
      ...DEFAULT_PROGRESS,
      completedLessons: ['fractions-intro'],
      lessonScores: {
        'fractions-intro': 80,
      },
      savedPaths: ['core-rebuild'],
      points: 200,
    },
  });

  const parsed = parseStorageSnapshot(serializeStorageSnapshot(snapshot));

  assert.equal(snapshot.kind, 'exponencial/storage-snapshot');
  assert.equal(snapshot.version, 1);
  assert.equal(snapshot.session.mode, 'local');
  assert.equal(parsed.profile?.name, 'Ana');
  assert.deepEqual(parsed.progress.completedLessons, ['fractions-intro']);
  assert.deepEqual(parsed.progress.savedPaths, ['core-rebuild']);
});

test('parseStorageSnapshot rejeita formatos desconhecidos', () => {
  assert.throws(
    () =>
      parseStorageSnapshot(
        JSON.stringify({
          kind: 'unknown',
          version: 99,
        }),
      ),
    /Formato de snapshot nao reconhecido/,
  );
});
