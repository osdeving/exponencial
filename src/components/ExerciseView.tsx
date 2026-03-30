import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Question } from '../types';
import { cn } from '../lib/utils';
import { Check, X, ArrowRight, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ExerciseViewProps {
  questions: Question[];
  onComplete: (score: number) => void;
  onNextLesson?: () => void;
}

export const ExerciseView: React.FC<ExerciseViewProps> = ({ questions, onComplete, onNextLesson }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === currentQuestion.correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(c => c + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
      if (score === questions.length) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  if (showResults) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center">
        <h2 className="font-display text-6xl uppercase mb-4">Resultado</h2>
        <div className="brutal-border p-12 bg-brand mb-8">
          <p className="text-8xl font-display">{score}/{questions.length}</p>
          <p className="font-bold uppercase mt-4">Exercícios Concluídos</p>
        </div>
        
        <div className="flex flex-col gap-4">
          {onNextLesson && score === questions.length && (
            <button 
              onClick={onNextLesson}
              className="brutal-btn bg-brand text-dark w-full py-4 text-xl flex items-center justify-center gap-2"
            >
              Próxima Lição
              <ArrowRight size={24} />
            </button>
          )}
          <button 
            onClick={() => onComplete(score)}
            className="brutal-btn bg-dark text-white w-full py-4 text-xl"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-8 flex justify-between items-center">
        <span className="font-display text-2xl uppercase">Questão {currentIndex + 1}/{questions.length}</span>
        <div className="h-2 w-48 bg-dark/10 brutal-border overflow-hidden">
          <motion.div 
            className="h-full bg-brand"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
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
                    "brutal-btn text-left normal-case py-4 px-6 flex justify-between items-center",
                    !isAnswered && "bg-white hover:bg-brand",
                    isAnswered && isCorrect && "bg-brand",
                    isAnswered && isSelected && !isCorrect && "bg-red-500 text-white",
                    isAnswered && !isCorrect && !isSelected && "opacity-50"
                  )}
                >
                  <span className="font-bold">{option}</span>
                  {isAnswered && isCorrect && <Check size={20} />}
                  {isAnswered && isSelected && !isCorrect && <X size={20} />}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-4 bg-dark/5 border-l-4 border-dark font-medium italic"
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
