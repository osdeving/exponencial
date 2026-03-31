import { useMemo, useState } from 'react';
import confetti from 'canvas-confetti';
import { Question } from '../../types';
import { getOfficialAnswer, getQuestionMode, isMultipleChoiceQuestion } from '../../lib/questions';

export function useExerciseSession(questions: Question[]) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [incorrectQuestionIds, setIncorrectQuestionIds] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showAnswerSheet, setShowAnswerSheet] = useState(false);
  const [studentAnswer, setStudentAnswer] = useState('');

  const currentQuestion = questions[currentIndex];
  const currentMode = currentQuestion ? getQuestionMode(currentQuestion) : 'self-check';
  const officialAnswer = currentQuestion ? getOfficialAnswer(currentQuestion) : '';
  const percentage = useMemo(
    () => (questions.length === 0 ? 0 : Math.round((score / questions.length) * 100)),
    [questions.length, score],
  );

  const resetQuestionState = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setShowHint(false);
    setShowAnswer(false);
    setStudentAnswer('');
  };

  const resetExercise = () => {
    setCurrentIndex(0);
    resetQuestionState();
    setScore(0);
    setIncorrectQuestionIds([]);
    setShowResults(false);
    setShowAnswerSheet(false);
  };

  const handleOptionSelect = (index: number) => {
    if (isAnswered || !currentQuestion || !isMultipleChoiceQuestion(currentQuestion)) {
      return;
    }

    setSelectedOption(index);
    setIsAnswered(true);
    setShowAnswer(true);

    if (index === currentQuestion.correctAnswer) {
      setScore((previous) => previous + 1);
    } else {
      setIncorrectQuestionIds((previous) =>
        previous.includes(currentQuestion.id) ? previous : [...previous, currentQuestion.id],
      );
    }
  };

  const revealAnswer = () => {
    if (isAnswered || !currentQuestion) {
      return;
    }

    setShowAnswer(true);
  };

  const markSelfCheck = (wasCorrect: boolean) => {
    if (isAnswered || !currentQuestion) {
      return;
    }

    setIsAnswered(true);
    setShowAnswer(true);

    if (wasCorrect) {
      setScore((previous) => previous + 1);
    } else {
      setIncorrectQuestionIds((previous) =>
        previous.includes(currentQuestion.id) ? previous : [...previous, currentQuestion.id],
      );
    }
  };

  const goToNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((previous) => previous + 1);
      resetQuestionState();
      return;
    }

    setShowResults(true);
    if (score === questions.length) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  return {
    state: {
      currentIndex,
      currentMode,
      currentQuestion,
      isAnswered,
      officialAnswer,
      percentage,
      incorrectQuestionIds,
      score,
      selectedOption,
      showAnswer,
      showAnswerSheet,
      showHint,
      showResults,
      studentAnswer,
    },
    actions: {
      goToNextQuestion,
      handleOptionSelect,
      markSelfCheck,
      openAnswerSheet: () => setShowAnswerSheet(true),
      closeAnswerSheet: () => setShowAnswerSheet(false),
      resetExercise,
      revealAnswer,
      setStudentAnswer,
      toggleHint: () => setShowHint((previous) => !previous),
    },
  };
}
