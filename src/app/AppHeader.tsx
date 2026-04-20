import { AnimatePresence, motion } from 'motion/react';
import { GraduationCap, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { ViewState } from './types';

interface AppHeaderProps {
  isMobileMenuOpen: boolean;
  isLessonUnlockBypassEnabled: boolean;
  points: number;
  profileName?: string;
  view: ViewState;
  onGoHome: () => void;
  onOpenCatalog: () => void;
  onOpenDashboard: () => void;
  onOpenPaths: () => void;
  onOpenProfile: () => void;
  onOpenRoadmap: () => void;
  onToggleMobileMenu: () => void;
}

export function AppHeader({
  isMobileMenuOpen,
  isLessonUnlockBypassEnabled,
  points,
  profileName,
  view,
  onGoHome,
  onOpenCatalog,
  onOpenDashboard,
  onOpenPaths,
  onOpenProfile,
  onOpenRoadmap,
  onToggleMobileMenu,
}: AppHeaderProps) {
  return (
    <nav className="sticky top-0 z-50 border-b-4 border-dark bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-6">
        <button className="flex cursor-pointer items-center gap-3" onClick={onGoHome}>
          <div className="bg-brand p-2 brutal-border">
            <GraduationCap size={24} />
          </div>
          <span className="font-display text-3xl uppercase tracking-tighter">Exponencial</span>
        </button>

        <div className="hidden items-center gap-3 lg:flex xl:gap-8">
          <button
            onClick={onOpenCatalog}
            className={cn('text-sm font-bold uppercase hover:text-brand-dark', view === 'catalog' && 'underline underline-offset-8')}
          >
            Explorar
          </button>
          <button
            onClick={onOpenRoadmap}
            className={cn('text-sm font-bold uppercase hover:text-brand-dark', view === 'roadmap' && 'underline underline-offset-8')}
          >
            Roadmap
          </button>
          <button
            onClick={onOpenPaths}
            className={cn(
              'text-sm font-bold uppercase hover:text-brand-dark',
              (view === 'paths' || view === 'path') && 'underline underline-offset-8',
            )}
          >
            Trilhas
          </button>
          <button
            onClick={onOpenDashboard}
            className={cn(
              'flex items-center gap-2 text-sm font-bold uppercase hover:text-brand-dark',
              view === 'dashboard' && 'underline underline-offset-8',
            )}
          >
            Meu Progresso
            <div className="bg-brand px-2 py-0.5 brutal-border text-[10px]">{points} pts</div>
          </button>
          <button onClick={onOpenProfile} className="brutal-btn bg-dark text-xs text-white">
            {profileName ?? 'Entrar'}
          </button>
        </div>

        <button onClick={onToggleMobileMenu} className="bg-white p-2 brutal-border lg:hidden">
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t-2 border-dark bg-white lg:hidden"
          >
            <div className="grid gap-3 px-6 py-4">
              <button onClick={onOpenCatalog} className="brutal-btn justify-center bg-white">
                Explorar
              </button>
              <button onClick={onOpenRoadmap} className="brutal-btn justify-center bg-white">
                Roadmap
              </button>
              <button onClick={onOpenPaths} className="brutal-btn justify-center bg-white">
                Trilhas
              </button>
              <button onClick={onOpenDashboard} className="brutal-btn justify-center bg-white">
                Meu Progresso
              </button>
              <button onClick={onOpenProfile} className="brutal-btn justify-center bg-brand">
                {profileName ? 'Editar Perfil' : 'Entrar'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isLessonUnlockBypassEnabled && (
        <div className="fixed bottom-4 left-4 z-[60] bg-brand px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] brutal-border">
          Modo teste: aulas liberadas
        </div>
      )}
    </nav>
  );
}
