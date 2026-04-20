import { LESSONS as LESSONS_RAW, TOPICS as TOPICS_RAW } from '../generated/content-manifest';
import { CANONICAL_SUBSECTIONS } from '../generated/canonical-taxonomy';
import { TOPIC_TAXONOMY_BY_TOPIC_ID } from '../generated/topic-taxonomy';
import { ContentStatus, Lesson, Topic } from '../types';

export const LESSONS: Lesson[] = LESSONS_RAW;

// O status do topico e derivado das licoes para evitar manter duas fontes manuais.
function deriveTopicStatus(topicId: string): ContentStatus {
  const topicLessons = LESSONS.filter((lesson) => lesson.topicId === topicId);

  if (topicLessons.length === 0) {
    return 'outline';
  }

  if (topicLessons.every((lesson) => lesson.status === 'ready')) {
    return 'ready';
  }

  if (topicLessons.some((lesson) => lesson.status === 'ready' || lesson.status === 'in-progress')) {
    return 'in-progress';
  }

  return 'outline';
}

// TOPICS junta metadados autorais, taxonomia canonica e status calculado.
export const TOPICS: Topic[] = TOPICS_RAW.map((topic) => ({
  ...topic,
  ...(TOPIC_TAXONOMY_BY_TOPIC_ID[topic.id] ?? {}),
  status: deriveTopicStatus(topic.id),
}));

export { CANONICAL_SUBSECTIONS };
