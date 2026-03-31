import { Question } from '../types';
import { QUESTIONS } from './index';

export const QUESTIONS_BY_LESSON_ID = QUESTIONS.reduce<Record<string, Question[]>>((accumulator, question) => {
  const currentQuestions = accumulator[question.lessonId] ?? [];
  currentQuestions.push(question);
  accumulator[question.lessonId] = currentQuestions;
  return accumulator;
}, {});

export function getQuestionsByLessonId(lessonId?: string | null): Question[] {
  return lessonId ? QUESTIONS_BY_LESSON_ID[lessonId] ?? [] : [];
}

export function getQuestionCountByLessonId(lessonId: string) {
  return QUESTIONS_BY_LESSON_ID[lessonId]?.length ?? 0;
}
