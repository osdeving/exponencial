import { LESSONS, TOPICS } from '../content';
import { getQuestionCountByLessonId } from '../content/queries';

export interface TopicContentStats {
  lessonCount: number;
  readyLessonCount: number;
  exerciseCount: number;
}

export function getTopicContentStats(topicId: string): TopicContentStats {
  const topicLessons = LESSONS.filter((lesson) => lesson.topicId === topicId);

  return {
    lessonCount: topicLessons.length,
    readyLessonCount: topicLessons.filter((lesson) => lesson.status === 'ready').length,
    exerciseCount: topicLessons.reduce((total, lesson) => total + getQuestionCountByLessonId(lesson.id), 0),
  };
}

export function getContentLibraryStats() {
  const exerciseCount = LESSONS.reduce((total, lesson) => total + getQuestionCountByLessonId(lesson.id), 0);
  const readyLessonCount = LESSONS.filter((lesson) => lesson.status === 'ready').length;
  const readyTopicCount = TOPICS.filter((topic) => topic.status === 'ready').length;
  const levels = new Set(TOPICS.map((topic) => topic.level));

  return {
    topicCount: TOPICS.length,
    lessonCount: LESSONS.length,
    readyLessonCount,
    readyTopicCount,
    exerciseCount,
    levelCount: levels.size,
  };
}
