import { Question } from '../types';
import { LESSON_CONTENT_IMPORTERS } from '../generated/lesson-content-index';
import { QUESTION_COUNTS_BY_LESSON_ID, QUESTION_IMPORTERS } from '../generated/question-index';

const lessonContentCache = new Map<string, string>();
const questionCache = new Map<string, Question[]>();

export function getQuestionCountByLessonId(lessonId: string) {
  return QUESTION_COUNTS_BY_LESSON_ID[lessonId] ?? 0;
}

export async function loadQuestionsByLessonId(lessonId?: string | null): Promise<Question[]> {
  if (!lessonId) {
    return [];
  }

  const cachedQuestions = questionCache.get(lessonId);
  if (cachedQuestions) {
    return cachedQuestions;
  }

  const importer = QUESTION_IMPORTERS[lessonId as keyof typeof QUESTION_IMPORTERS];
  if (!importer) {
    questionCache.set(lessonId, []);
    return [];
  }

  const module = await importer();
  questionCache.set(lessonId, module.QUESTIONS);
  return module.QUESTIONS;
}

export async function loadLessonContentById(lessonId?: string | null): Promise<string> {
  if (!lessonId) {
    return '';
  }

  const cachedContent = lessonContentCache.get(lessonId);
  if (typeof cachedContent === 'string') {
    return cachedContent;
  }

  const importer = LESSON_CONTENT_IMPORTERS[lessonId as keyof typeof LESSON_CONTENT_IMPORTERS];
  if (!importer) {
    lessonContentCache.set(lessonId, '');
    return '';
  }

  const module = await importer();
  lessonContentCache.set(lessonId, module.CONTENT);
  return module.CONTENT;
}
