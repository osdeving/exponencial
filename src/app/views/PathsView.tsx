import { PATHS } from '../../config';
import { PathCard } from '../../components/PathCard';
import { getPathProgress } from '../../lib/learning';
import type { LearningPath, UserProgress } from '../../types';

interface PathsViewProps {
  progress: UserProgress;
  suggestedPath: LearningPath;
  onPathSelect: (path: LearningPath) => void;
  onStartPath: (path: LearningPath) => void;
}

export function PathsView({ progress, suggestedPath, onPathSelect, onStartPath }: PathsViewProps) {
  return (
    <div className="mx-auto max-w-7xl px-6">
      <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="mb-3 w-fit bg-brand px-3 py-1 text-[10px] font-bold uppercase tracking-widest brutal-border">
            Trilhas
          </p>
          <h1 className="font-display text-6xl uppercase leading-none">Trilhas de Aprendizado</h1>
          <p className="mt-4 max-w-3xl text-lg font-medium">
            Caminhos organizados para estudar por objetivo, com progresso visível e retomada rápida.
          </p>
        </div>
        <button onClick={() => onStartPath(suggestedPath)} className="brutal-btn bg-white text-xs">
          Retomar trilha sugerida
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {PATHS.map((path) => (
          <PathCard
            key={path.id}
            path={path}
            progressPercent={getPathProgress(path, progress).completionPercent}
            onClick={() => onPathSelect(path)}
          />
        ))}
      </div>
    </div>
  );
}
