import { ProductAnalyticsEvent, ProductAnalyticsSummary } from '../types';

const MAX_ANALYTICS_EVENTS = 200;

export function normalizeAnalyticsEvents(raw: unknown): ProductAnalyticsEvent[] {
  if (!Array.isArray(raw)) {
    return [];
  }

  return raw.flatMap((item) => {
    if (!item || typeof item !== 'object') {
      return [];
    }

    const value = item as Record<string, unknown>;
    if (
      typeof value.id !== 'string' ||
      typeof value.type !== 'string' ||
      typeof value.occurredAt !== 'string'
    ) {
      return [];
    }

    return [
      {
        id: value.id,
        type: value.type as ProductAnalyticsEvent['type'],
        occurredAt: value.occurredAt,
        lessonId: typeof value.lessonId === 'string' ? value.lessonId : undefined,
        topicId: typeof value.topicId === 'string' ? value.topicId : undefined,
        score: typeof value.score === 'number' ? value.score : undefined,
        total: typeof value.total === 'number' ? value.total : undefined,
        percentage: typeof value.percentage === 'number' ? value.percentage : undefined,
      } satisfies ProductAnalyticsEvent,
    ];
  });
}

export function appendAnalyticsEvent(
  events: ProductAnalyticsEvent[],
  event: Omit<ProductAnalyticsEvent, 'id' | 'occurredAt'> & { occurredAt?: string },
): ProductAnalyticsEvent[] {
  const nextEvent: ProductAnalyticsEvent = {
    ...event,
    id: `${event.type}-${event.lessonId ?? event.topicId ?? 'global'}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    occurredAt: event.occurredAt ?? new Date().toISOString(),
  };

  return [...events, nextEvent].slice(-MAX_ANALYTICS_EVENTS);
}

export function buildAnalyticsSummary(events: ProductAnalyticsEvent[]): ProductAnalyticsSummary {
  const profileConfiguredCount = events.filter((event) => event.type === 'profile-configured').length;
  const lessonStartedCount = events.filter((event) => event.type === 'lesson-started').length;
  const exerciseSubmittedCount = events.filter((event) => event.type === 'exercise-submitted').length;
  const lessonPassedCount = events.filter((event) => event.type === 'lesson-passed').length;
  const lessonBlockedCount = events.filter((event) => event.type === 'lesson-blocked').length;

  return {
    totalEvents: events.length,
    profileConfiguredCount,
    lessonStartedCount,
    exerciseSubmittedCount,
    lessonPassedCount,
    lessonBlockedCount,
    approvalRate:
      exerciseSubmittedCount === 0 ? 0 : Math.round((lessonPassedCount / exerciseSubmittedCount) * 100),
    blockRate:
      exerciseSubmittedCount === 0 ? 0 : Math.round((lessonBlockedCount / exerciseSubmittedCount) * 100),
    recentEvents: [...events]
      .sort((left, right) => right.occurredAt.localeCompare(left.occurredAt))
      .slice(0, 5),
  };
}
