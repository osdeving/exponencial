import assert from 'node:assert/strict';
import test from 'node:test';
import { appendAnalyticsEvent, buildAnalyticsSummary, normalizeAnalyticsEvents } from '../src/lib/analytics.ts';

test('normalizeAnalyticsEvents saneia payload persistido de telemetria', () => {
  const normalized = normalizeAnalyticsEvents([
    {
      id: 'evt-1',
      type: 'exercise-submitted',
      occurredAt: '2026-03-31T10:00:00.000Z',
      lessonId: 'fractions-intro',
      topicId: 'fractions',
      score: 4,
      total: 5,
      percentage: 80,
    },
    {
      type: 'broken',
      occurredAt: '2026-03-31T10:00:00.000Z',
    },
    'invalid',
  ]);

  assert.deepEqual(normalized, [
    {
      id: 'evt-1',
      type: 'exercise-submitted',
      occurredAt: '2026-03-31T10:00:00.000Z',
      lessonId: 'fractions-intro',
      topicId: 'fractions',
      score: 4,
      total: 5,
      percentage: 80,
    },
  ]);
});

test('buildAnalyticsSummary calcula aprovacao, bloqueio e eventos recentes', () => {
  const events = [
    appendAnalyticsEvent([], {
      type: 'profile-configured',
      occurredAt: '2026-03-31T09:00:00.000Z',
    })[0],
    appendAnalyticsEvent([], {
      type: 'lesson-started',
      lessonId: 'fractions-intro',
      topicId: 'fractions',
      occurredAt: '2026-03-31T09:10:00.000Z',
    })[0],
    appendAnalyticsEvent([], {
      type: 'exercise-submitted',
      lessonId: 'fractions-intro',
      topicId: 'fractions',
      score: 3,
      total: 5,
      percentage: 60,
      occurredAt: '2026-03-31T09:20:00.000Z',
    })[0],
    appendAnalyticsEvent([], {
      type: 'lesson-blocked',
      lessonId: 'fractions-intro',
      topicId: 'fractions',
      score: 3,
      total: 5,
      percentage: 60,
      occurredAt: '2026-03-31T09:20:01.000Z',
    })[0],
    appendAnalyticsEvent([], {
      type: 'exercise-submitted',
      lessonId: 'fractions-intro',
      topicId: 'fractions',
      score: 5,
      total: 5,
      percentage: 100,
      occurredAt: '2026-03-31T09:40:00.000Z',
    })[0],
    appendAnalyticsEvent([], {
      type: 'lesson-passed',
      lessonId: 'fractions-intro',
      topicId: 'fractions',
      score: 5,
      total: 5,
      percentage: 100,
      occurredAt: '2026-03-31T09:40:01.000Z',
    })[0],
  ];

  const summary = buildAnalyticsSummary(events);

  assert.equal(summary.totalEvents, 6);
  assert.equal(summary.profileConfiguredCount, 1);
  assert.equal(summary.lessonStartedCount, 1);
  assert.equal(summary.exerciseSubmittedCount, 2);
  assert.equal(summary.lessonPassedCount, 1);
  assert.equal(summary.lessonBlockedCount, 1);
  assert.equal(summary.approvalRate, 50);
  assert.equal(summary.blockRate, 50);
  assert.equal(summary.recentEvents[0]?.type, 'lesson-passed');
  assert.equal(summary.recentEvents[1]?.type, 'exercise-submitted');
});
