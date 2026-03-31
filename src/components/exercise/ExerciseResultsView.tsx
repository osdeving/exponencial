import { ArrowRight, ClipboardList, RotateCcw } from 'lucide-react';

interface ExerciseResultsViewProps {
  canContinue: boolean;
  lessonTitle: string;
  passThreshold: number;
  percentage: number;
  score: number;
  total: number;
  onContinue: () => void;
  onFinish: () => void;
  onOpenAnswerSheet: () => void;
  onRestart: () => void;
}

export function ExerciseResultsView({
  canContinue,
  lessonTitle,
  passThreshold,
  percentage,
  score,
  total,
  onContinue,
  onFinish,
  onOpenAnswerSheet,
  onRestart,
}: ExerciseResultsViewProps) {
  const isPerfect = score === total;
  const isPassed = percentage >= passThreshold;

  return (
    <div className="mx-auto max-w-2xl p-8 text-center">
      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] opacity-50">{lessonTitle}</p>
      <h2 className="mb-4 font-display text-6xl uppercase">Resultado</h2>
      <div className="mb-8 brutal-border bg-brand p-12">
        <p className="text-8xl font-display">
          {score}/{total}
        </p>
        <p className="mt-4 font-bold uppercase">{percentage}% de aproveitamento</p>
        <p className="mt-3 font-medium">
          {isPerfect
            ? 'Execução perfeita. Pode avançar.'
            : isPassed
              ? `Corte mínimo de ${passThreshold}% atingido. A próxima etapa foi liberada.`
              : `Você ainda não atingiu o corte mínimo de ${passThreshold}%. Revise a teoria e tente novamente para destravar a próxima etapa.`}
        </p>
      </div>

      <div className="grid gap-4">
        <button
          onClick={onOpenAnswerSheet}
          className="brutal-btn flex w-full items-center justify-center gap-2 bg-white py-4 text-xl text-dark"
        >
          Ver Gabarito Completo
          <ClipboardList size={22} />
        </button>
        {canContinue && isPassed && (
          <button
            onClick={onContinue}
            className="brutal-btn flex w-full items-center justify-center gap-2 bg-brand py-4 text-xl text-dark"
          >
            Próxima Lição
            <ArrowRight size={24} />
          </button>
        )}
        {isPassed ? (
          <button
            onClick={onRestart}
            className="brutal-btn flex w-full items-center justify-center gap-2 bg-white py-4 text-xl text-dark"
          >
            Refazer Exercícios
            <RotateCcw size={22} />
          </button>
        ) : null}
        <button onClick={onFinish} className="brutal-btn w-full bg-dark py-4 text-xl text-white">
          {isPassed ? 'Salvar e Voltar ao Início' : 'Salvar e Iniciar Recuperação'}
        </button>
      </div>
    </div>
  );
}
