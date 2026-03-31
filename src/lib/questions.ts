import { Question } from '../types';

export function isMultipleChoiceQuestion(question: Question): question is Question & {
  options: string[];
  correctAnswer: number;
} {
  return (
    (question.type === 'multiple-choice' || (question.type == null && Array.isArray(question.options))) &&
    Array.isArray(question.options) &&
    typeof question.correctAnswer === 'number'
  );
}

export function getOfficialAnswer(question: Question) {
  if (typeof question.answer === 'string' && question.answer.trim().length > 0) {
    return question.answer;
  }

  if (isMultipleChoiceQuestion(question)) {
    return question.options[question.correctAnswer];
  }

  return question.explanation;
}

export function getQuestionMode(question: Question) {
  return isMultipleChoiceQuestion(question) ? 'multiple-choice' : 'self-check';
}

export function hasStructuredSolution(question: Question) {
  return Array.isArray(question.solution?.steps) && question.solution.steps.length > 0;
}
