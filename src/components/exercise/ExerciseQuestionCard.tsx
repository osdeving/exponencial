import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Check, ClipboardList, Lightbulb, RotateCcw, X } from 'lucide-react';
import { Question } from '../../types';
import { cn } from '../../lib/utils';
import { hasStructuredSolution, isMultipleChoiceQuestion } from '../../lib/questions';
import { MarkdownContent } from '../MarkdownContent';
import { QuestionSolutionView } from '../QuestionSolutionView';

interface ExerciseQuestionCardProps {
  currentIndex: number;
  isAnswered: boolean;
  lessonTitle: string;
  officialAnswer: string;
  onBack: () => void;
  onNextQuestion: () => void;
  onOpenAnswerSheet: () => void;
  onOptionSelect: (index: number) => void;
  onReset: () => void;
  onRevealAnswer: () => void;
  onSelfCheck: (wasCorrect: boolean) => void;
  onStudentAnswerChange: (value: string) => void;
  onToggleHint: () => void;
  question: Question;
  questionsLength: number;
  selectedOption: number | null;
  showAnswer: boolean;
  showHint: boolean;
  studentAnswer: string;
}

export function ExerciseQuestionCard({
  currentIndex,
  isAnswered,
  lessonTitle,
  officialAnswer,
  onBack,
  onNextQuestion,
  onOpenAnswerSheet,
  onOptionSelect,
  onReset,
  onRevealAnswer,
  onSelfCheck,
  onStudentAnswerChange,
  onToggleHint,
  question,
  questionsLength,
  selectedOption,
  showAnswer,
  showHint,
  studentAnswer,
}: ExerciseQuestionCardProps) {
  const progressPercent = ((currentIndex + 1) / questionsLength) * 100;
  const isMultipleChoice = isMultipleChoiceQuestion(question);

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] opacity-50">{lessonTitle}</p>
          <span className="font-display text-2xl uppercase">
            {question.number ? `Questão ${question.number}` : `Questão ${currentIndex + 1}`}
          </span>
          <p className="mt-2 text-sm font-medium opacity-70">
            {currentIndex + 1}/{questionsLength}
            {question.section ? ` · ${question.section}` : ''}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="h-2 w-48 overflow-hidden bg-dark/10 brutal-border">
            <motion.div className="h-full bg-brand" initial={{ width: 0 }} animate={{ width: `${progressPercent}%` }} />
          </div>
          <button onClick={onOpenAnswerSheet} className="brutal-btn flex items-center gap-2 bg-white text-xs">
            <ClipboardList size={14} />
            Gabarito
          </button>
          <button onClick={onBack} className="brutal-btn flex items-center gap-2 bg-white text-xs">
            <ArrowLeft size={14} />
            Teoria
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="mb-8 brutal-border bg-white p-8"
        >
          {question.source && (
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] opacity-50">{question.source}</p>
          )}

          <MarkdownContent
            content={question.text}
            className="prose-lg prose-p:my-3 prose-ul:my-3 prose-ol:my-3 prose-headings:mb-4"
          />

          {isMultipleChoice && (
            <div className="mt-8 grid gap-4">
              {question.options.map((option, index) => {
                const isCorrect = index === question.correctAnswer;
                const isSelected = index === selectedOption;

                return (
                  <button
                    key={`${question.id}-${index}`}
                    onClick={() => onOptionSelect(index)}
                    disabled={isAnswered}
                    className={cn(
                      'brutal-btn flex items-center justify-between px-6 py-4 text-left normal-case',
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

          {!isMultipleChoice && (
            <div className="mt-8 grid gap-4">
              <label className="block">
                <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] opacity-50">Sua resposta</span>
                <textarea
                  value={studentAnswer}
                  onChange={(event) => onStudentAnswerChange(event.target.value)}
                  placeholder="Escreva sua conta, ideia ou resposta final. Depois use o gabarito para conferir."
                  className="min-h-32 w-full brutal-border p-4 font-medium outline-none"
                />
              </label>

              {!showAnswer && (
                <button
                  onClick={onRevealAnswer}
                  className="brutal-btn flex w-full items-center justify-center gap-2 bg-brand py-4 text-lg text-dark"
                >
                  Mostrar Gabarito
                  <ClipboardList size={20} />
                </button>
              )}
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            {question.hint && (
              <button onClick={onToggleHint} className="brutal-btn flex items-center gap-2 bg-white text-xs">
                <Lightbulb size={14} />
                {showHint ? 'Esconder dica' : 'Ver dica'}
              </button>
            )}
            <button onClick={onReset} className="brutal-btn flex items-center gap-2 bg-white text-xs">
              <RotateCcw size={14} />
              Reiniciar
            </button>
          </div>

          {showHint && question.hint && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-6 bg-yellow-200 p-4 font-medium brutal-border">
              {question.hint}
            </motion.div>
          )}

          {showAnswer && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 border-l-4 border-dark bg-dark/5 p-5">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Gabarito oficial</p>
              <MarkdownContent
                content={officialAnswer}
                className="prose-base prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-strong:text-dark"
              />
              {question.explanation && question.explanation !== officialAnswer && (
                <MarkdownContent
                  content={question.explanation}
                  className="mt-3 prose-sm prose-p:my-2 prose-ul:my-2 prose-ol:my-2"
                />
              )}
              {hasStructuredSolution(question) && (
                <div className="mt-5 border-t-4 border-dark/10 pt-5">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Resolução passo a passo</p>
                  <QuestionSolutionView solution={question.solution} interactive />
                </div>
              )}

              {!isMultipleChoice && !isAnswered && (
                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  <button
                    onClick={() => onSelfCheck(true)}
                    className="brutal-btn flex w-full items-center justify-center gap-2 bg-brand py-3 text-dark"
                  >
                    Acertei
                    <Check size={18} />
                  </button>
                  <button
                    onClick={() => onSelfCheck(false)}
                    className="brutal-btn flex w-full items-center justify-center gap-2 bg-white py-3 text-dark"
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
          onClick={onNextQuestion}
          className="brutal-btn flex w-full items-center justify-center gap-2 bg-dark py-4 text-xl text-white"
        >
          {currentIndex === questionsLength - 1 ? 'Finalizar' : 'Próxima Questão'}
          <ArrowRight size={24} />
        </button>
      )}
    </div>
  );
}
