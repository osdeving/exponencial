import { AnimatePresence, motion } from 'motion/react';
import { GraduationCap, Layout, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { HomeSection, ViewState } from './types';

interface AppHeaderProps {
  isMobileMenuOpen: boolean;
  points: number;
  profileName?: string;
  view: ViewState;
  onGoHome: () => void;
  onOpenDashboard: () => void;
  onOpenHomeSection: (section: HomeSection) => void;
  onOpenProfile: () => void;
  onToggleMobileMenu: () => void;
}

export function AppHeader({
  isMobileMenuOpen,
  points,
  profileName,
  view,
  onGoHome,
  onOpenDashboard,
  onOpenHomeSection,
  onOpenProfile,
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

        <div className="hidden items-center gap-3 md:flex lg:gap-8">
          <button
            onClick={() => onOpenHomeSection('topics')}
            className={cn('text-sm font-bold uppercase hover:text-brand-dark', view === 'home' && 'underline underline-offset-8')}
          >
            Explorar
          </button>
          <button onClick={() => onOpenHomeSection('paths')} className="text-sm font-bold uppercase hover:text-brand-dark">
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

        <button onClick={onToggleMobileMenu} className="bg-white p-2 brutal-border md:hidden">
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t-2 border-dark bg-white md:hidden"
          >
            <div className="grid gap-3 px-6 py-4">
              <button onClick={() => onOpenHomeSection('topics')} className="brutal-btn justify-center bg-white">
                Explorar
              </button>
              <button onClick={() => onOpenHomeSection('paths')} className="brutal-btn justify-center bg-white">
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
    </nav>
  );
}
