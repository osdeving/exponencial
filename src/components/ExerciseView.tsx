import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Question } from '../types';
import { cn } from '../lib/utils';
import { getOfficialAnswer, getQuestionMode, hasStructuredSolution, isMultipleChoiceQuestion } from '../lib/questions';
import { MarkdownContent } from './MarkdownContent';
import { QuestionSolutionView } from './QuestionSolutionView';
import { ArrowLeft, ArrowRight, Check, ClipboardList, Lightbulb, RotateCcw, X } from 'lucide-react';
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
  const [showAnswer, setShowAnswer] = useState(false);
  const [showAnswerSheet, setShowAnswerSheet] = useState(false);
  const [studentAnswer, setStudentAnswer] = useState('');

  const currentQuestion = questions[currentIndex];
  const currentMode = currentQuestion ? getQuestionMode(currentQuestion) : 'self-check';
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
    setShowResults(false);
    setShowAnswerSheet(false);
  };

  const handleAnswer = (index: number) => {
    if (isAnswered || !currentQuestion || !isMultipleChoiceQuestion(currentQuestion)) {
      return;
    }

    setSelectedOption(index);
    setIsAnswered(true);
    setShowAnswer(true);

    if (index === currentQuestion.correctAnswer) {
      setScore((previous) => previous + 1);
    }
  };

  const handleSelfCheck = (wasCorrect: boolean) => {
    if (isAnswered || !currentQuestion) {
      return;
    }

    setIsAnswered(true);
    setShowAnswer(true);

    if (wasCorrect) {
      setScore((previous) => previous + 1);
    }
  };

  const nextQuestion = () => {
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

  const renderAnswerSheet = () => {
    let lastSection = '';

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-dark/70 p-4 md:p-8"
      >
        <div className="mx-auto flex h-full max-w-5xl flex-col brutal-border bg-white">
          <div className="flex items-center justify-between gap-4 border-b-4 border-dark px-6 py-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-50">{lessonTitle}</p>
              <h3 className="font-display text-4xl uppercase">Gabarito</h3>
            </div>
            <button onClick={() => setShowAnswerSheet(false)} className="brutal-btn bg-dark text-white text-xs">
              Fechar
            </button>
          </div>

          <div className="overflow-y-auto p-6">
            <div className="grid gap-4">
              {questions.map((question, index) => {
                const officialAnswer = getOfficialAnswer(question);
                const sectionHeader = question.section && question.section !== lastSection ? question.section : null;
                if (question.section) {
                  lastSection = question.section;
                }

                return (
                  <React.Fragment key={question.id}>
                    {sectionHeader && (
                      <div className="brutal-border bg-brand px-4 py-3">
                        <p className="font-bold uppercase text-sm">{sectionHeader}</p>
                      </div>
                    )}
                    <div className="brutal-border bg-white p-5">
                      <div className="mb-3 flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">
                        <span>Questão {question.number ?? index + 1}</span>
                        {question.source && <span>{question.source}</span>}
                      </div>
                      <MarkdownContent content={question.text} className="prose-sm prose-p:my-2 prose-ul:my-2 prose-ol:my-2" />
                      <div className="mt-4 border-t-4 border-dark/10 pt-4">
                        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Resposta oficial</p>
                        <MarkdownContent
                          content={officialAnswer}
                          className="prose-sm prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-strong:text-dark"
                        />
                        {question.explanation && question.explanation !== officialAnswer && (
                          <MarkdownContent
                            content={question.explanation}
                            className="mt-3 prose-sm prose-p:my-2 prose-ul:my-2 prose-ol:my-2"
                          />
                        )}
                        {hasStructuredSolution(question) && (
                          <div className="mt-4 border-t-4 border-dark/10 pt-4">
                            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Resolução</p>
                            <QuestionSolutionView solution={question.solution} />
                          </div>
                        )}
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  if (showResults) {
    const isPerfect = score === questions.length;

    return (
      <>
        <div className="max-w-2xl mx-auto p-8 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-50 mb-3">{lessonTitle}</p>
          <h2 className="font-display text-6xl uppercase mb-4">Resultado</h2>
          <div className="brutal-border p-12 bg-brand mb-8">
            <p className="text-8xl font-display">
              {score}/{questions.length}
            </p>
            <p className="font-bold uppercase mt-4">{percentage}% de aproveitamento</p>
            <p className="mt-3 font-medium">
              {isPerfect ? 'Execução perfeita. Pode avançar.' : 'Você já pode revisar a teoria, conferir o gabarito ou seguir para a próxima etapa.'}
            </p>
          </div>

          <div className="grid gap-4">
            <button
              onClick={() => setShowAnswerSheet(true)}
              className="brutal-btn bg-white text-dark w-full py-4 text-xl flex items-center justify-center gap-2"
            >
              Ver Gabarito Completo
              <ClipboardList size={22} />
            </button>
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

        <AnimatePresence>{showAnswerSheet && renderAnswerSheet()}</AnimatePresence>
      </>
    );
  }

  const officialAnswer = currentQuestion ? getOfficialAnswer(currentQuestion) : '';

  return (
    <>
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-50 mb-2">{lessonTitle}</p>
            <span className="font-display text-2xl uppercase">
              {currentQuestion?.number ? `Questão ${currentQuestion.number}` : `Questão ${currentIndex + 1}`}
            </span>
            <p className="mt-2 text-sm font-medium opacity-70">
              {currentIndex + 1}/{questions.length}
              {currentQuestion?.section ? ` · ${currentQuestion.section}` : ''}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="h-2 w-48 bg-dark/10 brutal-border overflow-hidden">
              <motion.div
                className="h-full bg-brand"
                initial={{ width: 0 }}
                animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
            <button
              onClick={() => setShowAnswerSheet(true)}
              className="brutal-btn bg-white flex items-center gap-2 text-xs"
            >
              <ClipboardList size={14} />
              Gabarito
            </button>
            <button onClick={onBack} className="brutal-btn bg-white flex items-center gap-2 text-xs">
              <ArrowLeft size={14} />
              Teoria
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion?.id ?? currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="brutal-border p-8 bg-white mb-8"
          >
            {currentQuestion?.source && (
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] opacity-50">{currentQuestion.source}</p>
            )}

            {currentQuestion && (
              <MarkdownContent
                content={currentQuestion.text}
                className="prose-lg prose-p:my-3 prose-ul:my-3 prose-ol:my-3 prose-headings:mb-4"
              />
            )}

            {currentMode === 'multiple-choice' && isMultipleChoiceQuestion(currentQuestion) && (
              <div className="mt-8 grid gap-4">
                {currentQuestion.options.map((option, idx) => {
                  const isCorrect = idx === currentQuestion.correctAnswer;
                  const isSelected = idx === selectedOption;

                  return (
                    <button
                      key={`${currentQuestion.id}-${idx}`}
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
                      <MarkdownContent
                        content={option}
                        className="prose-base prose-p:my-0 prose-strong:text-current prose-ol:my-0 prose-ul:my-0"
                      />
                      {isAnswered && isCorrect && <Check size={20} />}
                      {isAnswered && isSelected && !isCorrect && <X size={20} />}
                    </button>
                  );
                })}
              </div>
            )}

            {currentMode === 'self-check' && currentQuestion && (
              <div className="mt-8 grid gap-4">
                <label className="block">
                  <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] opacity-50">Sua resposta</span>
                  <textarea
                    value={studentAnswer}
                    onChange={(event) => setStudentAnswer(event.target.value)}
                    placeholder="Escreva sua conta, ideia ou resposta final. Depois use o gabarito para conferir."
                    className="min-h-32 w-full brutal-border p-4 font-medium outline-none"
                  />
                </label>

                {!showAnswer && (
                  <button
                    onClick={() => setShowAnswer(true)}
                    className="brutal-btn bg-brand text-dark w-full py-4 text-lg flex items-center justify-center gap-2"
                  >
                    Mostrar Gabarito
                    <ClipboardList size={20} />
                  </button>
                )}
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              {currentQuestion?.hint && (
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

            {showHint && currentQuestion?.hint && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-yellow-200 brutal-border font-medium"
              >
                {currentQuestion.hint}
              </motion.div>
            )}

            {showAnswer && currentQuestion && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-dark/5 border-l-4 border-dark"
              >
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Gabarito oficial</p>
                <MarkdownContent
                  content={officialAnswer}
                  className="prose-base prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-strong:text-dark"
                />
                {currentQuestion.explanation && currentQuestion.explanation !== officialAnswer && (
                  <MarkdownContent
                    content={currentQuestion.explanation}
                    className="mt-3 prose-sm prose-p:my-2 prose-ul:my-2 prose-ol:my-2"
                  />
                )}
                {hasStructuredSolution(currentQuestion) && (
                  <div className="mt-5 border-t-4 border-dark/10 pt-5">
                    <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Resolução passo a passo</p>
                    <QuestionSolutionView solution={currentQuestion.solution} interactive />
                  </div>
                )}

                {currentMode === 'self-check' && !isAnswered && (
                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    <button
                      onClick={() => handleSelfCheck(true)}
                      className="brutal-btn bg-brand text-dark w-full py-3 flex items-center justify-center gap-2"
                    >
                      Acertei
                      <Check size={18} />
                    </button>
                    <button
                      onClick={() => handleSelfCheck(false)}
                      className="brutal-btn bg-white text-dark w-full py-3 flex items-center justify-center gap-2"
                    >
                      Errei
                      <X size={18} />
                    </button>
                  </div>
                )}
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

      <AnimatePresence>{showAnswerSheet && renderAnswerSheet()}</AnimatePresence>
    </>
  );
};
