import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { UserProfile, LearningGoal, Level } from '../types';
import { X, UserRound, Target, Sparkles, LogOut } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  profile: UserProfile | null;
  onClose: () => void;
  onSave: (profile: Omit<UserProfile, 'joinedAt' | 'favoriteTopics'>) => void;
  onLogout: () => void;
}

const LEVELS: Level[] = ['Fundamental', 'Médio', 'Superior'];
const GOALS: LearningGoal[] = ['Melhorar notas', 'Revisar base', 'Vestibular', 'Preparar faculdade'];

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  profile,
  onClose,
  onSave,
  onLogout,
}) => {
  const [name, setName] = useState(profile?.name ?? '');
  const [level, setLevel] = useState<Level>(profile?.level ?? 'Fundamental');
  const [goal, setGoal] = useState<LearningGoal>(profile?.goal ?? 'Melhorar notas');
  const [weeklyGoal, setWeeklyGoal] = useState(profile?.weeklyGoal ?? 3);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setName(profile?.name ?? '');
    setLevel(profile?.level ?? 'Fundamental');
    setGoal(profile?.goal ?? 'Melhorar notas');
    setWeeklyGoal(profile?.weeklyGoal ?? 3);
  }, [isOpen, profile]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim()) {
      return;
    }

    onSave({
      name: name.trim(),
      level,
      goal,
      weeklyGoal,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] bg-dark/60 p-4 md:p-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            className="mx-auto mt-8 max-w-2xl brutal-border bg-white"
          >
            <div className="border-b-4 border-dark bg-brand px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-70">Perfil</p>
                <h2 className="font-display text-4xl uppercase leading-none">Entrar na Plataforma</h2>
              </div>
              <button onClick={onClose} className="brutal-border bg-white p-2">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="flex items-center gap-2 text-xs font-bold uppercase">
                    <UserRound size={14} />
                    Seu nome
                  </span>
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Ex.: Maria"
                    className="w-full brutal-border px-4 py-3 focus:outline-none focus:bg-brand/10"
                  />
                </label>

                <label className="space-y-2">
                  <span className="flex items-center gap-2 text-xs font-bold uppercase">
                    <Sparkles size={14} />
                    Seu nível
                  </span>
                  <select
                    value={level}
                    onChange={(event) => setLevel(event.target.value as Level)}
                    className="w-full brutal-border px-4 py-3 bg-white focus:outline-none focus:bg-brand/10"
                  >
                    {LEVELS.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="space-y-2 block">
                <span className="flex items-center gap-2 text-xs font-bold uppercase">
                  <Target size={14} />
                  Objetivo principal
                </span>
                <div className="grid gap-3 md:grid-cols-2">
                  {GOALS.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setGoal(item)}
                      className={`brutal-border px-4 py-3 text-left font-bold uppercase text-xs ${
                        goal === item ? 'bg-brand' : 'bg-white'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </label>

              <label className="space-y-2 block">
                <span className="text-xs font-bold uppercase">Meta semanal</span>
                <input
                  type="range"
                  min={1}
                  max={7}
                  value={weeklyGoal}
                  onChange={(event) => setWeeklyGoal(Number(event.target.value))}
                  className="w-full accent-dark"
                />
                <div className="flex items-center justify-between text-xs font-bold uppercase">
                  <span>1 aula</span>
                  <span>{weeklyGoal} aulas por semana</span>
                  <span>7 aulas</span>
                </div>
              </label>

              <div className="brutal-border bg-dark text-white p-4">
                <p className="text-xs font-bold uppercase mb-2">Como isso funciona</p>
                <p className="text-sm">
                  O perfil fica salvo localmente para personalizar trilhas, progresso e recomendações sem depender de backend.
                </p>
              </div>

              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                {profile ? (
                  <button
                    type="button"
                    onClick={onLogout}
                    className="brutal-btn bg-white text-dark flex items-center justify-center gap-2"
                  >
                    <LogOut size={16} />
                    Sair
                  </button>
                ) : (
                  <div />
                )}

                <div className="flex gap-3">
                  <button type="button" onClick={onClose} className="brutal-btn bg-white">
                    Cancelar
                  </button>
                  <button type="submit" className="brutal-btn bg-brand">
                    Salvar perfil
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
