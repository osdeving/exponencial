import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { QuestionSolution, QuestionSolutionStep } from '../types';
import { MarkdownContent } from './MarkdownContent';

interface QuestionSolutionViewProps {
  solution?: QuestionSolution;
  interactive?: boolean;
}

function renderStepContent(step: QuestionSolutionStep) {
  if (step.type === 'markdown' || step.type === 'equation') {
    return (
      <MarkdownContent
        content={step.content}
        className={step.type === 'equation' ? 'prose-sm prose-p:my-2 prose-pre:my-2' : 'prose-sm prose-p:my-2 prose-ul:my-2 prose-ol:my-2'}
      />
    );
  }

  if (step.type === 'scratchpad') {
    return (
      <div className="rounded-none bg-paper px-4 py-3 brutal-border">
        <div className="space-y-1 font-mono text-sm">
          {step.lines.map((line) => (
            <div key={line}>{line}</div>
          ))}
        </div>
      </div>
    );
  }

  if (step.type !== 'algorithm') {
    return null;
  }

  const accentClass =
    step.layout === 'mmc'
      ? 'bg-brand/15'
      : step.layout === 'long-division'
        ? 'bg-blue-100'
        : step.layout === 'continued-division'
          ? 'bg-yellow-100'
          : 'bg-paper';

  return (
    <div className={`rounded-none px-4 py-3 brutal-border ${accentClass}`}>
      <div className="space-y-1 font-mono text-sm">
        {step.lines.map((line) => (
          <div key={line}>{line}</div>
        ))}
      </div>
      {step.result && (
        <div className="mt-3 border-t-2 border-dark/20 pt-3 text-sm font-bold uppercase">
          {step.result}
        </div>
      )}
      {step.annotations && step.annotations.length > 0 && (
        <div className="mt-3 space-y-1 text-xs font-medium opacity-75">
          {step.annotations.map((annotation) => (
            <div key={annotation}>{annotation}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export const QuestionSolutionView: React.FC<QuestionSolutionViewProps> = ({ solution, interactive = false }) => {
  const isStepMode = Boolean(solution && interactive && solution.mode === 'step-by-step');
  const totalSteps = solution?.steps.length ?? 0;
  const initialVisibleSteps = isStepMode ? 1 : totalSteps;
  const solutionKey = useMemo(
    () =>
      solution
        ? `${solution.mode}:${solution.steps
            .map((step) => step.id ?? `${step.type}:${step.title ?? ''}`)
            .join('|')}`
        : 'none',
    [solution],
  );
  const [visibleSteps, setVisibleSteps] = useState(initialVisibleSteps);

  useEffect(() => {
    setVisibleSteps(initialVisibleSteps);
  }, [initialVisibleSteps, solutionKey]);

  if (!solution || totalSteps === 0) {
    return null;
  }

  const renderedSteps = solution.steps.slice(0, Math.max(visibleSteps, 0));
  const hasMoreSteps = isStepMode && visibleSteps < totalSteps;

  return (
    <div className="grid gap-4">
      {solution.summary && (
        <div className="bg-paper px-4 py-3 font-medium brutal-border">
          {solution.summary}
        </div>
      )}

      <AnimatePresence initial={false}>
        {renderedSteps.map((step, index) => (
          <motion.div
            key={`${solutionKey}-${step.id ?? index}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="bg-white p-4 brutal-border"
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50">Passo {index + 1}</p>
                {step.title && <h5 className="mt-1 text-sm font-bold uppercase">{step.title}</h5>}
              </div>
              <span className="text-[10px] font-bold uppercase opacity-40">{step.type}</span>
            </div>
            {renderStepContent(step)}
          </motion.div>
        ))}
      </AnimatePresence>

      {isStepMode && (
        <div className="flex flex-wrap gap-3">
          {hasMoreSteps && (
            <button
              onClick={() => setVisibleSteps((current) => Math.min(current + 1, totalSteps))}
              className="brutal-btn flex items-center gap-2 bg-brand text-xs text-dark"
            >
              Próximo passo
              <ArrowRight size={14} />
            </button>
          )}
          {hasMoreSteps && totalSteps > 2 && (
            <button onClick={() => setVisibleSteps(totalSteps)} className="brutal-btn bg-white text-xs">
              Mostrar tudo
            </button>
          )}
          {visibleSteps > 1 && (
            <button onClick={() => setVisibleSteps(1)} className="brutal-btn flex items-center gap-2 bg-white text-xs">
              Reiniciar passos
              <RotateCcw size={14} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
