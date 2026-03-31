import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Question } from '../types';
import { cn } from '../lib/utils';
import { ArrowLeft, ArrowRight, Check, Lightbulb, RotateCcw, X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ExerciseViewProps {
  lessonTitle: string;
  questions: Question[];
  canContinue: boolean;
  onBack: () => void;
  onComplete: (result: { score: number; total: number; continueToNext: boolean }) => void;
}

export const ExerciseView: React.FC<ExerciseViewProps> = ({
  lessonTitle,
  questions,
  canContinue,
  onBack,
  onComplete,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const currentQuestion = questions[currentIndex];
  const percentage = useMemo(
    () => (questions.length === 0 ? 0 : Math.round((score / questions.length) * 100)),
    [questions.length, score],
  );

  const resetExercise = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
    setShowHint(false);
  };

  const handleAnswer = (index: number) => {
    if (isAnswered || !currentQuestion) {
      return;
    }

    setSelectedOption(index);
    setIsAnswered(true);

    if (index === currentQuestion.correctAnswer) {
      setScore((previous) => previous + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((previous) => previous + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowHint(false);
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

  if (questions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="brutal-border p-10 bg-white text-center space-y-4">
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

  if (showResults) {
    const isPerfect = score === questions.length;

    return (
      <div className="max-w-2xl mx-auto p-8 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-50 mb-3">{lessonTitle}</p>
        <h2 className="font-display text-6xl uppercase mb-4">Resultado</h2>
        <div className="brutal-border p-12 bg-brand mb-8">
          <p className="text-8xl font-display">
            {score}/{questions.length}
          </p>
          <p className="font-bold uppercase mt-4">{percentage}% de aproveitamento</p>
          <p className="mt-3 font-medium">
            {isPerfect ? 'Execução perfeita. Pode avançar.' : 'Você já pode revisar a teoria ou seguir para a próxima etapa.'}
          </p>
        </div>

        <div className="grid gap-4">
          {canContinue && (
            <button
              onClick={() => onComplete({ score, total: questions.length, continueToNext: true })}
              className="brutal-btn bg-brand text-dark w-full py-4 text-xl flex items-center justify-center gap-2"
            >
              Próxima Lição
              <ArrowRight size={24} />
            </button>
          )}
          <button
            onClick={resetExercise}
            className="brutal-btn bg-white text-dark w-full py-4 text-xl flex items-center justify-center gap-2"
          >
            Refazer Exercícios
            <RotateCcw size={22} />
          </button>
          <button
            onClick={() => onComplete({ score, total: questions.length, continueToNext: false })}
            className="brutal-btn bg-dark text-white w-full py-4 text-xl"
          >
            Salvar e Voltar ao Início
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-50 mb-2">{lessonTitle}</p>
          <span className="font-display text-2xl uppercase">
            Questão {currentIndex + 1}/{questions.length}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-2 w-48 bg-dark/10 brutal-border overflow-hidden">
            <motion.div
              className="h-full bg-brand"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
          <button onClick={onBack} className="brutal-btn bg-white flex items-center gap-2 text-xs">
            <ArrowLeft size={14} />
            Teoria
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="brutal-border p-8 bg-white mb-8"
        >
          <h3 className="text-2xl font-bold mb-8">{currentQuestion.text}</h3>

          <div className="grid gap-4">
            {currentQuestion.options.map((option, idx) => {
              const isCorrect = idx === currentQuestion.correctAnswer;
              const isSelected = idx === selectedOption;

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={isAnswered}
                  className={cn(
                    'brutal-btn text-left normal-case py-4 px-6 flex justify-between items-center',
                    !isAnswered && 'bg-white hover:bg-brand',
                    isAnswered && isCorrect && 'bg-brand',
                    isAnswered && isSelected && !isCorrect && 'bg-red-500 text-white',
                    isAnswered && !isCorrect && !isSelected && 'opacity-50',
                  )}
                >
                  <span className="font-bold">{option}</span>
                  {isAnswered && isCorrect && <Check size={20} />}
                  {isAnswered && isSelected && !isCorrect && <X size={20} />}
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {currentQuestion.hint && (
              <button
                onClick={() => setShowHint((previous) => !previous)}
                className="brutal-btn bg-white text-xs flex items-center gap-2"
              >
                <Lightbulb size={14} />
                {showHint ? 'Esconder dica' : 'Ver dica'}
              </button>
            )}
            <button onClick={resetExercise} className="brutal-btn bg-white text-xs flex items-center gap-2">
              <RotateCcw size={14} />
              Reiniciar
            </button>
          </div>

          {showHint && currentQuestion.hint && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-yellow-200 brutal-border font-medium"
            >
              {currentQuestion.hint}
            </motion.div>
          )}

          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-dark/5 border-l-4 border-dark font-medium italic"
            >
              {currentQuestion.explanation}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {isAnswered && (
        <button
          onClick={nextQuestion}
          className="brutal-btn bg-dark text-white w-full py-4 text-xl flex items-center justify-center gap-2"
        >
          {currentIndex === questions.length - 1 ? 'Finalizar' : 'Próxima Questão'}
          <ArrowRight size={24} />
        </button>
      )}
    </div>
  );
};
