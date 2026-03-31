import React from 'react';
import { motion } from 'motion/react';
import { Question } from '../../types';
import { getOfficialAnswer, hasStructuredSolution } from '../../lib/questions';
import { MarkdownContent } from '../MarkdownContent';
import { QuestionSolutionView } from '../QuestionSolutionView';

interface ExerciseAnswerSheetModalProps {
  lessonTitle: string;
  onClose: () => void;
  questions: Question[];
}

export function ExerciseAnswerSheetModal({
  lessonTitle,
  onClose,
  questions,
}: ExerciseAnswerSheetModalProps) {
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
          <button onClick={onClose} className="brutal-btn bg-dark text-xs text-white">
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
                      <p className="text-sm font-bold uppercase">{sectionHeader}</p>
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
}
