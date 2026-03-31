import { Github, GraduationCap } from 'lucide-react';
import { REPOSITORY_URL } from './constants';
import { HomeSection } from './types';

interface AppFooterProps {
  onOpenHomeSection: (section: HomeSection) => void;
  onStartRecommendedFlow: () => void;
}

export function AppFooter({ onOpenHomeSection, onStartRecommendedFlow }: AppFooterProps) {
  return (
    <footer className="mt-20 border-t-4 border-dark bg-white py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 md:grid-cols-4">
        <div className="col-span-2">
          <div className="mb-6 flex items-center gap-3">
            <div className="bg-brand p-2 brutal-border">
              <GraduationCap size={24} />
            </div>
            <span className="font-display text-3xl uppercase tracking-tighter">Exponencial</span>
          </div>
          <p className="max-w-sm font-medium">
            Plataforma de matemática com trilhas, teoria, exercícios, ranking e tutor contextual funcionando direto no navegador.
          </p>
        </div>
        <div>
          <h4 className="mb-4 font-display text-xl uppercase">Plataforma</h4>
          <ul className="flex flex-col gap-2 text-xs font-bold uppercase">
            <li>
              <button onClick={() => onOpenHomeSection('topics')} className="hover:underline">
                Cursos
              </button>
            </li>
            <li>
              <button onClick={onStartRecommendedFlow} className="hover:underline">
                Exercícios
              </button>
            </li>
            <li>
              <button onClick={() => onOpenHomeSection('community')} className="hover:underline">
                Comunidade
              </button>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-display text-xl uppercase">Social</h4>
          <a href={REPOSITORY_URL} target="_blank" rel="noreferrer" className="inline-flex cursor-pointer bg-brand p-2 brutal-border">
            <Github size={20} />
          </a>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl border-t border-dark/10 px-6 pt-8 text-[10px] font-bold uppercase opacity-50">
        © 2026 Exponencial - Todos os direitos reservados
      </div>
    </footer>
  );
}
