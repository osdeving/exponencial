import React from 'react';
import { AnimatePresence } from 'motion/react';
import { Question } from '../types';
import { ExerciseAnswerSheetModal } from './exercise/ExerciseAnswerSheetModal';
import { ExerciseQuestionCard } from './exercise/ExerciseQuestionCard';
import { ExerciseResultsView } from './exercise/ExerciseResultsView';
import { useExerciseSession } from './exercise/useExerciseSession';

interface ExerciseViewProps {
  lessonTitle: string;
  questions: Question[];
  isLoading?: boolean;
  canContinue: boolean;
  passThreshold: number;
  onBack: () => void;
  onComplete: (result: { score: number; total: number; continueToNext: boolean }) => void;
}

export const ExerciseView: React.FC<ExerciseViewProps> = ({
  lessonTitle,
  questions,
  isLoading = false,
  canContinue,
  passThreshold,
  onBack,
  onComplete,
}) => {
  const { state, actions } = useExerciseSession(questions);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl p-6">
        <div className="mb-8 flex items-center justify-between">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-50">{lessonTitle}</p>
          <span className="text-xs font-bold uppercase opacity-50">Carregando exercícios</span>
        </div>
        <div className="space-y-4 brutal-border bg-white p-8">
          <div className="h-6 w-2/3 bg-dark/10 brutal-border" />
          <div className="h-4 w-full bg-dark/10 brutal-border" />
          <div className="h-4 w-11/12 bg-dark/10 brutal-border" />
          <div className="mt-6 h-14 w-full bg-dark/10 brutal-border" />
          <div className="h-14 w-full bg-dark/10 brutal-border" />
          <div className="h-14 w-full bg-dark/10 brutal-border" />
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="mx-auto max-w-2xl p-6">
        <div className="space-y-4 bg-white p-10 text-center brutal-border">
          <h2 className="font-display text-5xl uppercase">Sem Exercícios</h2>
          <p className="font-medium">
            Esta lição ainda não tem questões cadastradas. Você pode voltar para a teoria e seguir para a próxima lição.
          </p>
          <button onClick={onBack} className="brutal-btn bg-brand">
            Voltar para a lição
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {state.showResults ? (
        <ExerciseResultsView
          canContinue={canContinue}
          lessonTitle={lessonTitle}
          passThreshold={passThreshold}
          percentage={state.percentage}
          score={state.score}
          total={questions.length}
          onContinue={() => onComplete({ score: state.score, total: questions.length, continueToNext: true })}
          onFinish={() => onComplete({ score: state.score, total: questions.length, continueToNext: false })}
          onOpenAnswerSheet={actions.openAnswerSheet}
          onRestart={actions.resetExercise}
        />
      ) : (
        state.currentQuestion && (
          <ExerciseQuestionCard
            currentIndex={state.currentIndex}
            isAnswered={state.isAnswered}
            lessonTitle={lessonTitle}
            officialAnswer={state.officialAnswer}
            onBack={onBack}
            onNextQuestion={actions.goToNextQuestion}
            onOpenAnswerSheet={actions.openAnswerSheet}
            onOptionSelect={actions.handleOptionSelect}
            onReset={actions.resetExercise}
            onRevealAnswer={actions.revealAnswer}
            onSelfCheck={actions.markSelfCheck}
            onStudentAnswerChange={actions.setStudentAnswer}
            onToggleHint={actions.toggleHint}
            question={state.currentQuestion}
            questionsLength={questions.length}
            selectedOption={state.selectedOption}
            showAnswer={state.showAnswer}
            showHint={state.showHint}
            studentAnswer={state.studentAnswer}
          />
        )
      )}

      <AnimatePresence>
        {state.showAnswerSheet && (
          <ExerciseAnswerSheetModal
            lessonTitle={lessonTitle}
            onClose={actions.closeAnswerSheet}
            questions={questions}
          />
        )}
      </AnimatePresence>
    </>
  );
};
