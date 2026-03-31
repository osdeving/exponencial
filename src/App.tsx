import React, { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  ArrowRight,
  Github,
  GraduationCap,
  Layout,
  Menu,
  Search,
  Sparkles,
  Trophy,
  X,
} from 'lucide-react';
import { MOCK_RANKING, PATHS, QUESTIONS, TOPICS } from './data';
import { Dashboard } from './components/Dashboard';
import { ExerciseView } from './components/ExerciseView';
import { LessonView } from './components/LessonView';
import { PathCard } from './components/PathCard';
import { ProfileModal } from './components/ProfileModal';
import { TopicCard } from './components/TopicCard';
import { TutorChat } from './components/TutorChat';
import { cn } from './lib/utils';
import {
  DEFAULT_PROGRESS,
  LEVEL_FILTERS,
  buildSearchResults,
  calculatePoints,
  getCompletedPaths,
  getEarnedBadges,
  getLessonById,
  getLessonsByTopic,
  getNewStreak,
  getNextLessonForPath,
  getNextLessonInTopic,
  getPathProgress,
  getRecommendedLesson,
  getTopicById,
  getTopicProgress,
  normalizeProfile,
  normalizeProgress,
  recomputeTopicScores,
} from './lib/learning';
import { Lesson, LearningPath, Level, SearchResult, Topic, UserProfile, UserProgress } from './types';

type ViewState = 'home' | 'topic' | 'lesson' | 'exercise' | 'dashboard' | 'path';
type HomeSection = 'paths' | 'topics' | 'community';

const PROGRESS_STORAGE_KEY = 'math-progress';
const PROFILE_STORAGE_KEY = 'math-profile';
const REPOSITORY_URL = 'https://github.com/osdeving/exponencial';

function readStoredJson(key: string) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

export default function App() {
  const [view, setView] = useState<ViewState>('home');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<'Todos' | Level>('Todos');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [pendingHomeSection, setPendingHomeSection] = useState<HomeSection | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(() => normalizeProfile(readStoredJson(PROFILE_STORAGE_KEY)));
  const [progress, setProgress] = useState<UserProgress>(() => normalizeProgress(readStoredJson(PROGRESS_STORAGE_KEY)));

  const pathsSectionRef = useRef<HTMLDivElement>(null);
  const topicsSectionRef = useRef<HTMLDivElement>(null);
  const communitySectionRef = useRef<HTMLDivElement>(null);

  const deferredSearchQuery = useDeferredValue(searchQuery);

  const scrollViewportToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  useEffect(() => {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    if (profile) {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
      return;
    }

    localStorage.removeItem(PROFILE_STORAGE_KEY);
  }, [profile]);

  useEffect(() => {
    if (view !== 'home' || !pendingHomeSection) {
      return;
    }

    const sectionMap = {
      paths: pathsSectionRef,
      topics: topicsSectionRef,
      community: communitySectionRef,
    } as const;

    requestAnimationFrame(() => {
      sectionMap[pendingHomeSection].current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setPendingHomeSection(null);
    });
  }, [pendingHomeSection, view]);

  useEffect(() => {
    if (view === 'home' && pendingHomeSection) {
      return;
    }

    requestAnimationFrame(() => {
      scrollViewportToTop();
    });
  }, [pendingHomeSection, selectedLesson?.id, selectedPath?.id, selectedTopic?.id, view]);

  const searchResults = useMemo(() => buildSearchResults(deferredSearchQuery), [deferredSearchQuery]);

  const filteredTopics = useMemo(
    () =>
      TOPICS.filter((topic) => {
        const passesLevel = levelFilter === 'Todos' || topic.level === levelFilter;
        if (!passesLevel) {
          return false;
        }

        if (!deferredSearchQuery.trim()) {
          return true;
        }

        const searchableContent = [
          topic.title,
          topic.description,
          topic.stage,
          topic.category,
          ...topic.tags,
          ...getLessonsByTopic(topic.id).map(
            (lesson) => `${lesson.title} ${lesson.summary} ${lesson.content} ${lesson.status} ${lesson.tags.join(' ')}`,
          ),
        ]
          .join(' ')
          .toLowerCase();

        return searchableContent.includes(deferredSearchQuery.trim().toLowerCase());
      }).sort((left, right) => {
        const leftFavorite = profile?.favoriteTopics.includes(left.id) ? 1 : 0;
        const rightFavorite = profile?.favoriteTopics.includes(right.id) ? 1 : 0;
        return rightFavorite - leftFavorite || left.order - right.order;
      }),
    [deferredSearchQuery, levelFilter, profile],
  );

  const selectedTopicLessons = selectedTopic ? getLessonsByTopic(selectedTopic.id) : [];
  const selectedLessonQuestions = selectedLesson ? QUESTIONS.filter((question) => question.lessonId === selectedLesson.id) : [];
  const nextRecommendedLesson = useMemo(() => getRecommendedLesson(progress), [progress]);
  const nextRecommendedTopic = nextRecommendedLesson ? getTopicById(nextRecommendedLesson.topicId) : undefined;
  const suggestedPath =
    PATHS.find((path) => {
      if (!profile) {
        return path.id === 'exam-prep';
      }

      if (profile.goal === 'Preparar faculdade') {
        return path.id === 'algebra-track';
      }

      if (profile.goal === 'Vestibular' || profile.level === 'Médio') {
        return path.id === 'vestibular-essentials';
      }

      if (profile.goal === 'Revisar base') {
        return path.id === 'exam-prep';
      }

      return path.id === 'exam-prep';
    }) ?? PATHS[0];

  const openHomeSection = (section: HomeSection) => {
    setView('home');
    setPendingHomeSection(section);
    setIsMobileMenuOpen(false);
  };

  const handleTopicSelect = (topic: Topic) => {
    setSelectedTopic(topic);
    setView('topic');
    setIsMobileMenuOpen(false);
  };

  const handleLessonSelect = (lesson: Lesson) => {
    const topic = getTopicById(lesson.topicId);
    if (topic) {
      setSelectedTopic(topic);
    }

    setSelectedLesson(lesson);
    setView('lesson');
    setIsMobileMenuOpen(false);
  };

  const handlePathSelect = (path: LearningPath) => {
    setSelectedPath(path);
    setView('path');
    setIsMobileMenuOpen(false);
  };

  const handleNextLesson = () => {
    if (!selectedLesson) {
      return;
    }

    const nextLesson = getNextLessonInTopic(selectedLesson.topicId, selectedLesson.id);
    if (nextLesson) {
      handleLessonSelect(nextLesson);
    }
  };

  const startRecommendedFlow = () => {
    if (nextRecommendedLesson) {
      handleLessonSelect(nextRecommendedLesson);
      return;
    }

    openHomeSection('topics');
  };

  const handleSearchSelection = (result: SearchResult) => {
    setSearchQuery('');

    if (result.type === 'topic') {
      const topic = getTopicById(result.id);
      if (topic) {
        handleTopicSelect(topic);
      }
      return;
    }

    if (result.type === 'lesson') {
      const lesson = getLessonById(result.id);
      if (lesson) {
        handleLessonSelect(lesson);
      }
      return;
    }

    const path = PATHS.find((item) => item.id === result.id);
    if (path) {
      handlePathSelect(path);
    }
  };

  const handleSaveProfile = (nextProfile: Omit<UserProfile, 'joinedAt' | 'favoriteTopics'>) => {
    setProfile((current) => ({
      name: nextProfile.name,
      level: nextProfile.level,
      goal: nextProfile.goal,
      weeklyGoal: nextProfile.weeklyGoal,
      favoriteTopics: current?.favoriteTopics ?? [],
      joinedAt: current?.joinedAt ?? new Date().toISOString(),
    }));
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    setProfile(null);
    setIsProfileOpen(false);
  };

  const handleToggleFavoriteTopic = (topicId: string) => {
    if (!profile) {
      setIsProfileOpen(true);
      return;
    }

    setProfile((current) => {
      if (!current) {
        return current;
      }

      const alreadyFavorite = current.favoriteTopics.includes(topicId);
      return {
        ...current,
        favoriteTopics: alreadyFavorite
          ? current.favoriteTopics.filter((id) => id !== topicId)
          : [...current.favoriteTopics, topicId],
      };
    });
  };

  const handleToggleSavedPath = (pathId: string) => {
    setProgress((current) => {
      const alreadySaved = current.savedPaths.includes(pathId);

      return {
        ...current,
        savedPaths: alreadySaved ? current.savedPaths.filter((id) => id !== pathId) : [...current.savedPaths, pathId],
      };
    });
  };

  const handleStartPath = (path: LearningPath) => {
    const nextLesson = getNextLessonForPath(path.id, progress) ?? getLessonById(path.featuredLessonId);

    if (!progress.savedPaths.includes(path.id)) {
      handleToggleSavedPath(path.id);
    }

    if (nextLesson) {
      handleLessonSelect(nextLesson);
    }
  };

  const handleExerciseComplete = ({
    score,
    total,
    continueToNext,
  }: {
    score: number;
    total: number;
    continueToNext: boolean;
  }) => {
    if (!selectedLesson) {
      return;
    }

    const completedAt = new Date().toISOString();
    const currentDate = completedAt.slice(0, 10);
    const percentage = total === 0 ? 0 : Math.round((score / total) * 100);
    const nextLesson = continueToNext ? getNextLessonInTopic(selectedLesson.topicId, selectedLesson.id) : undefined;

    const isFirstCompletion = !progress.completedLessons.includes(selectedLesson.id);
    const nextLessonScores = {
      ...progress.lessonScores,
      [selectedLesson.id]: Math.max(progress.lessonScores[selectedLesson.id] ?? 0, percentage),
    };
    const nextCompletedLessons = Array.from(new Set([...progress.completedLessons, selectedLesson.id]));
    const nextScores = recomputeTopicScores(nextLessonScores);
    const nextPoints = progress.points + calculatePoints(score, total, isFirstCompletion);

    const draftProgress: UserProgress = {
      ...progress,
      completedLessons: nextCompletedLessons,
      lessonScores: nextLessonScores,
      scores: nextScores,
      points: nextPoints,
      lastLessonId: nextLesson?.id ?? selectedLesson.id,
      streak: getNewStreak(progress.lastActiveDate, currentDate, progress.streak),
      lastActiveDate: currentDate,
      attempts: {
        ...progress.attempts,
        [selectedLesson.id]: {
          score,
          total,
          completedAt,
        },
      },
    };

    const nextBadges = getEarnedBadges(draftProgress);
    const nextProgress: UserProgress = {
      ...draftProgress,
      badges: nextBadges,
      completedPaths: getCompletedPaths({ ...draftProgress, badges: nextBadges }),
    };
    const hasNewBadge = nextBadges.length > progress.badges.length;

    setProgress(nextProgress);

    if (score === total || hasNewBadge) {
      confetti({
        particleCount: hasNewBadge ? 180 : 120,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#00FF00', '#000000', '#FFFFFF'],
      });
    }

    if (continueToNext && nextLesson) {
      handleLessonSelect(nextLesson);
      return;
    }

    setView('home');
  };

  const handleResetProgress = () => {
    if (!window.confirm('Isso vai apagar o progresso salvo neste navegador. Deseja continuar?')) {
      return;
    }

    setProgress(DEFAULT_PROGRESS);
  };

  const hasNextLesson = selectedLesson ? Boolean(getNextLessonInTopic(selectedLesson.topicId, selectedLesson.id)) : false;
  const isSelectedTopicFavorite = Boolean(selectedTopic && profile?.favoriteTopics.includes(selectedTopic.id));

  return (
    <div className="min-h-screen bg-paper">
      <ProfileModal
        isOpen={isProfileOpen}
        profile={profile}
        onClose={() => setIsProfileOpen(false)}
        onSave={handleSaveProfile}
        onLogout={handleLogout}
      />

      <nav className="border-b-4 border-dark bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
          <button className="flex items-center gap-3 cursor-pointer" onClick={() => setView('home')}>
            <div className="bg-brand brutal-border p-2">
              <GraduationCap size={24} />
            </div>
            <span className="font-display text-3xl uppercase tracking-tighter">Exponencial</span>
          </button>

          <div className="hidden md:flex items-center gap-3 lg:gap-8">
            <button
              onClick={() => openHomeSection('topics')}
              className={cn('font-bold uppercase text-sm hover:text-brand-dark', view === 'home' && 'underline underline-offset-8')}
            >
              Explorar
            </button>
            <button onClick={() => openHomeSection('paths')} className="font-bold uppercase text-sm hover:text-brand-dark">
              Trilhas
            </button>
            <button
              onClick={() => setView('dashboard')}
              className={cn(
                'font-bold uppercase text-sm hover:text-brand-dark flex items-center gap-2',
                view === 'dashboard' && 'underline underline-offset-8',
              )}
            >
              Meu Progresso
              <div className="bg-brand px-2 py-0.5 brutal-border text-[10px]">{progress.points} pts</div>
            </button>
            <button onClick={() => setIsProfileOpen(true)} className="brutal-btn bg-dark text-white text-xs">
              {profile ? profile.name : 'Entrar'}
            </button>
          </div>

          <button onClick={() => setIsMobileMenuOpen((current) => !current)} className="md:hidden brutal-border p-2 bg-white">
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t-2 border-dark bg-white overflow-hidden"
            >
              <div className="px-6 py-4 grid gap-3">
                <button onClick={() => openHomeSection('topics')} className="brutal-btn bg-white justify-center">
                  Explorar
                </button>
                <button onClick={() => openHomeSection('paths')} className="brutal-btn bg-white justify-center">
                  Trilhas
                </button>
                <button
                  onClick={() => {
                    setView('dashboard');
                    setIsMobileMenuOpen(false);
                  }}
                  className="brutal-btn bg-white justify-center"
                >
                  Meu Progresso
                </button>
                <button
                  onClick={() => {
                    setIsProfileOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="brutal-btn bg-brand justify-center"
                >
                  {profile ? 'Editar Perfil' : 'Entrar'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="py-12">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-7xl mx-auto px-6"
            >
              <div className="mb-20 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 bg-brand px-3 py-1 brutal-border mb-6">
                    <Sparkles size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Aprenda Matemática com Fluxo Completo</span>
                  </div>
                  <h1 className="font-display text-7xl md:text-8xl uppercase leading-[0.85] mb-6">
                    Domine a <br />
                    <span className="text-brand">Matemática</span>
                  </h1>
                  <p className="text-xl font-medium max-w-xl mb-8">
                    Teoria, prática, trilhas salvas, progresso persistido e tutor contextual em uma interface que agora fecha o ciclo inteiro.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button onClick={startRecommendedFlow} className="brutal-btn bg-brand text-xl px-8 py-4">
                      Começar Agora
                    </button>
                    <button onClick={() => openHomeSection('paths')} className="brutal-btn bg-white text-xl px-8 py-4">
                      Ver Planos
                    </button>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="brutal-border bg-brand p-8 rotate-1">
                    <div className="brutal-border bg-white p-6 -rotate-2">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-50 mb-2">Próximo passo</p>
                          <h2 className="font-display text-4xl uppercase leading-none">
                            {nextRecommendedLesson ? nextRecommendedLesson.title : 'Escolha uma trilha'}
                          </h2>
                        </div>
                        <Layout size={28} />
                      </div>
                      <p className="font-medium mb-6">
                        {nextRecommendedTopic
                          ? `${nextRecommendedTopic.title} · ${nextRecommendedTopic.stage} · ${nextRecommendedLesson?.estimatedMinutes} min`
                          : 'Ainda sem histórico. Use uma trilha ou explore por tópico.'}
                      </p>
                      <button onClick={startRecommendedFlow} className="brutal-btn bg-dark text-white w-full flex items-center justify-center gap-2">
                        Continuar aprendendo
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="brutal-border p-5 bg-white">
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-50 mb-2">Perfil</p>
                      <p className="font-display text-3xl uppercase leading-none">{profile?.name ?? 'Anônimo'}</p>
                      <p className="mt-2 text-sm font-medium">{profile ? profile.goal : 'Crie um perfil local para personalizar o app.'}</p>
                    </div>
                    <div className="brutal-border p-5 bg-white">
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-50 mb-2">Pontos</p>
                      <p className="font-display text-3xl uppercase leading-none">{progress.points}</p>
                      <p className="mt-2 text-sm font-medium">{progress.badges.length} medalhas liberadas</p>
                    </div>
                    <div className="brutal-border p-5 bg-dark text-white">
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-50 mb-2">Meta</p>
                      <p className="font-display text-3xl uppercase leading-none">{profile?.weeklyGoal ?? 3}/semana</p>
                      <p className="mt-2 text-sm font-medium">Streak atual: {progress.streak || 0} dia(s)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-20 brutal-border bg-dark text-white p-6 md:p-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-50 mb-2">Recomendação</p>
                  <h2 className="font-display text-4xl uppercase leading-none">{suggestedPath.title}</h2>
                  <p className="mt-3 font-medium max-w-2xl">{suggestedPath.focus}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => handlePathSelect(suggestedPath)} className="brutal-btn bg-white text-dark">
                    Abrir trilha
                  </button>
                  <button onClick={startRecommendedFlow} className="brutal-btn bg-brand text-dark">
                    Ir para próxima aula
                  </button>
                </div>
              </div>

              <div ref={pathsSectionRef} className="mb-20 scroll-mt-28">
                <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <h2 className="font-display text-4xl uppercase">Trilhas de Aprendizado</h2>
                    <p className="font-bold uppercase text-xs opacity-50">Caminhos salvos, progresso visível e retomada rápida</p>
                  </div>
                  <button onClick={() => handleStartPath(suggestedPath)} className="brutal-btn bg-white text-xs">
                    Retomar trilha sugerida
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {PATHS.map((path) => (
                    <PathCard
                      key={path.id}
                      path={path}
                      progressPercent={getPathProgress(path, progress).completionPercent}
                      onClick={() => handlePathSelect(path)}
                    />
                  ))}
                </div>
              </div>

              <div ref={topicsSectionRef} className="scroll-mt-28">
                <div className="mb-12 flex flex-col gap-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                      <h2 className="font-display text-4xl uppercase">Explorar Tópicos</h2>
                      <p className="font-bold uppercase text-xs opacity-50">Busca real, filtros por nível e currículo organizado por etapa</p>
                    </div>
                    <div className="relative w-full lg:w-[420px]">
                      <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        placeholder="Buscar por tópico, aula ou trilha"
                        className="w-full brutal-border pl-12 pr-4 py-3 bg-white focus:outline-none focus:bg-brand/10"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {LEVEL_FILTERS.map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setLevelFilter(filter)}
                        className={cn(
                          'px-4 py-2 brutal-border text-xs font-bold uppercase',
                          levelFilter === filter ? 'bg-dark text-white' : 'bg-white',
                        )}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>

                  {searchResults.length > 0 && deferredSearchQuery.trim() && (
                    <div className="grid gap-3">
                      {searchResults.map((result) => (
                        <button
                          key={`${result.type}-${result.id}`}
                          onClick={() => handleSearchSelection(result)}
                          className="brutal-border bg-white px-5 py-4 text-left flex items-center justify-between hover:bg-brand"
                        >
                          <div>
                            <p className="font-bold uppercase text-sm">
                              {result.title} <span className="opacity-40">· {result.type}</span>
                            </p>
                            <p className="text-sm font-medium opacity-70">{result.subtitle}</p>
                          </div>
                          <ArrowRight size={18} />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTopics.map((topic) => {
                    const topicProgress = getTopicProgress(topic.id, progress);

                    return (
                      <TopicCard
                        key={topic.id}
                        topic={topic}
                        lessonCount={topicProgress.totalLessons}
                        progressPercent={topicProgress.completionPercent}
                        isFavorite={Boolean(profile?.favoriteTopics.includes(topic.id))}
                        onClick={() => handleTopicSelect(topic)}
                      />
                    );
                  })}
                </div>

                {filteredTopics.length === 0 && (
                  <div className="mt-6 brutal-border p-12 text-center bg-dark/5">
                    <p className="font-bold uppercase">Nenhum tópico encontrado para esse filtro.</p>
                  </div>
                )}
              </div>

              <div ref={communitySectionRef} className="mt-20 scroll-mt-28">
                <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <h2 className="font-display text-4xl uppercase">Comunidade & Ranking</h2>
                    <p className="font-bold uppercase text-xs opacity-50">A parte social sugerida pela UI agora tem preview e entrada direta</p>
                  </div>
                  <button onClick={() => setView('dashboard')} className="brutal-btn bg-white text-xs">
                    Abrir painel completo
                  </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-6">
                  <div className="brutal-border bg-brand p-8">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-50 mb-3">Comparativo</p>
                    <h3 className="font-display text-5xl uppercase leading-none mb-4">Suba no Ranking</h3>
                    <p className="font-medium max-w-xl mb-6">
                      Complete aulas, salve trilhas e faça os exercícios para ganhar pontos. O painel compara seu ritmo com a comunidade mockada.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button onClick={() => setView('dashboard')} className="brutal-btn bg-dark text-white">
                        Ver meu ranking
                      </button>
                      <button onClick={startRecommendedFlow} className="brutal-btn bg-white">
                        Ganhar pontos agora
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {MOCK_RANKING.slice(0, 3).map((user, index) => (
                      <div key={user.name} className="brutal-border bg-white p-4 flex items-center gap-4">
                        <div className="font-display text-3xl">{index + 1}</div>
                        <img src={user.avatar} alt={user.name} className="w-14 h-14 brutal-border object-cover" />
                        <div className="flex-1">
                          <p className="font-bold uppercase text-sm">{user.name}</p>
                          <p className="text-sm font-medium opacity-70">{user.points} pts</p>
                        </div>
                        <Trophy size={18} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'path' && selectedPath && (
            <motion.div
              key="path"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-5xl mx-auto px-6"
            >
              <button onClick={() => setView('home')} className="font-bold uppercase text-sm mb-8 flex items-center gap-2">
                ← Voltar
              </button>
              <div className="brutal-border p-8 mb-12" style={{ backgroundColor: selectedPath.color }}>
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <h2 className="font-display text-6xl uppercase mb-2">{selectedPath.title}</h2>
                    <p className="text-xl font-medium opacity-80 max-w-3xl">{selectedPath.description}</p>
                    <p className="mt-4 text-sm font-bold uppercase opacity-70">{selectedPath.focus}</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button onClick={() => handleStartPath(selectedPath)} className="brutal-btn bg-dark text-white">
                      Continuar trilha
                    </button>
                    <button onClick={() => handleToggleSavedPath(selectedPath.id)} className="brutal-btn bg-white">
                      {progress.savedPaths.includes(selectedPath.id) ? 'Remover dos salvos' : 'Salvar trilha'}
                    </button>
                  </div>
                </div>

                <div className="mt-8 max-w-md space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold uppercase">
                    <span>{selectedPath.estimatedWeeks} semanas</span>
                    <span>{getPathProgress(selectedPath, progress).completionPercent}% concluído</span>
                  </div>
                  <div className="h-2 brutal-border overflow-hidden bg-white/70">
                    <div
                      className="h-full bg-dark"
                      style={{ width: `${getPathProgress(selectedPath, progress).completionPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-6">
                {TOPICS.filter((topic) => selectedPath.topicIds.includes(topic.id)).map((topic) => {
                  const topicProgress = getTopicProgress(topic.id, progress);
                  const nextPathLesson = getLessonsByTopic(topic.id).find(
                    (lesson) => !progress.completedLessons.includes(lesson.id),
                  );

                  return (
                    <div key={topic.id} className="brutal-border p-6 bg-white">
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                          <h3 className="text-3xl font-bold uppercase">{topic.title}</h3>
                          <p className="text-sm font-medium opacity-70">{topic.description}</p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          <button onClick={() => handleTopicSelect(topic)} className="brutal-btn bg-white text-xs">
                            Abrir tópico
                          </button>
                          <button
                            onClick={() => {
                              const lessonToOpen = nextPathLesson ?? getLessonsByTopic(topic.id)[0];
                              if (lessonToOpen) {
                                handleLessonSelect(lessonToOpen);
                              }
                            }}
                            className="brutal-btn bg-brand text-xs"
                          >
                            {nextPathLesson ? 'Continuar aula' : 'Revisar tópico'}
                          </button>
                        </div>
                      </div>
                      <div className="mt-6 space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold uppercase">
                          <span>{topicProgress.completedLessons}/{topicProgress.totalLessons} lições</span>
                          <span>{topicProgress.completionPercent}% concluído</span>
                        </div>
                        <div className="h-2 brutal-border overflow-hidden bg-dark/10">
                          <div className="h-full bg-brand" style={{ width: `${topicProgress.completionPercent}%` }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {view === 'topic' && selectedTopic && (
            <motion.div
              key="topic"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-5xl mx-auto px-6"
            >
              <button onClick={() => setView('home')} className="font-bold uppercase text-sm mb-8 flex items-center gap-2">
                ← Voltar
              </button>
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between mb-12">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-50 mb-2">
                    {selectedTopic.level} · {selectedTopic.stage}
                  </p>
                  <h2 className="font-display text-6xl uppercase mb-2">{selectedTopic.title}</h2>
                  <p className="text-xl font-medium max-w-3xl opacity-70">{selectedTopic.description}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => handleToggleFavoriteTopic(selectedTopic.id)} className="brutal-btn bg-white text-xs">
                    {isSelectedTopicFavorite ? 'Remover favorito' : 'Favoritar tópico'}
                  </button>
                  <button
                    onClick={() => {
                      if (selectedTopicLessons[0]) {
                        handleLessonSelect(selectedTopicLessons[0]);
                      }
                    }}
                    className="brutal-btn bg-brand text-xs"
                    disabled={selectedTopicLessons.length === 0}
                  >
                    Começar do início
                  </button>
                </div>
              </div>

              <div className="grid gap-6">
                {selectedTopicLessons.map((lesson) => {
                  const bestScore = progress.lessonScores[lesson.id];
                  const attempt = progress.attempts[lesson.id];
                  const isCompleted = progress.completedLessons.includes(lesson.id);

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => handleLessonSelect(lesson)}
                      className="brutal-border p-6 bg-white hover:bg-brand cursor-pointer flex flex-col gap-4 md:flex-row md:items-center md:justify-between group"
                    >
                      <div>
                        <h3 className="text-2xl font-bold uppercase">{lesson.title}</h3>
                        <p className="mt-2 text-sm font-medium opacity-70 max-w-2xl">{lesson.summary}</p>
                        <div className="mt-2 flex flex-wrap gap-2 text-[10px] font-bold uppercase opacity-60">
                          <span>{lesson.difficulty}</span>
                          <span>{lesson.estimatedMinutes} min</span>
                          <span>{QUESTIONS.filter((question) => question.lessonId === lesson.id).length} exercícios</span>
                          <span>{lesson.status === 'ready' ? 'conteúdo pronto' : 'estrutura pronta'}</span>
                          {typeof bestScore === 'number' && <span>Melhor nota {bestScore}%</span>}
                          {attempt && <span>Última tentativa {attempt.score}/{attempt.total}</span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {isCompleted && <div className="brutal-border px-3 py-2 bg-dark text-white text-xs font-bold uppercase">Concluída</div>}
                        <div className="brutal-border p-2 bg-dark text-white group-hover:bg-white group-hover:text-dark">
                          Abrir
                        </div>
                      </div>
                    </div>
                  );
                })}
                {selectedTopicLessons.length === 0 && (
                  <div className="brutal-border p-12 text-center bg-dark/5">
                    <p className="font-bold uppercase">Conteúdo em breve.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {view === 'lesson' && selectedLesson && (
            <motion.div key="lesson" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <LessonView
                lesson={selectedLesson}
                topic={getTopicById(selectedLesson.topicId)}
                questionCount={selectedLessonQuestions.length}
                bestScore={progress.lessonScores[selectedLesson.id]}
                isCompleted={progress.completedLessons.includes(selectedLesson.id)}
                onBack={() => setView('topic')}
                onStartExercises={() => setView('exercise')}
                onNextLesson={hasNextLesson ? handleNextLesson : undefined}
              />
            </motion.div>
          )}

          {view === 'exercise' && selectedLesson && (
            <motion.div
              key="exercise"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
            >
              <ExerciseView
                lessonTitle={selectedLesson.title}
                questions={selectedLessonQuestions}
                canContinue={hasNextLesson}
                onBack={() => setView('lesson')}
                onComplete={handleExerciseComplete}
              />
            </motion.div>
          )}

          {view === 'dashboard' && (
            <motion.div key="dashboard" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <Dashboard
                progress={progress}
                profile={profile}
                onContinue={startRecommendedFlow}
                onOpenProfile={() => setIsProfileOpen(true)}
                onResetProgress={handleResetProgress}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <TutorChat currentTopic={selectedTopic} currentLesson={selectedLesson} />

      <footer className="border-t-4 border-dark bg-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-brand brutal-border p-2">
                <GraduationCap size={24} />
              </div>
              <span className="font-display text-3xl uppercase tracking-tighter">Exponencial</span>
            </div>
            <p className="font-medium max-w-sm">
              Plataforma de matemática com trilhas, teoria, exercícios, ranking e tutor contextual funcionando direto no navegador.
            </p>
          </div>
          <div>
            <h4 className="font-display text-xl uppercase mb-4">Plataforma</h4>
            <ul className="flex flex-col gap-2 font-bold uppercase text-xs">
              <li>
                <button onClick={() => openHomeSection('topics')} className="hover:underline">
                  Cursos
                </button>
              </li>
              <li>
                <button onClick={startRecommendedFlow} className="hover:underline">
                  Exercícios
                </button>
              </li>
              <li>
                <button onClick={() => openHomeSection('community')} className="hover:underline">
                  Comunidade
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-xl uppercase mb-4">Social</h4>
            <a
              href={REPOSITORY_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex brutal-border p-2 bg-brand cursor-pointer"
            >
              <Github size={20} />
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-dark/10 text-[10px] font-bold uppercase opacity-50">
          © 2026 Exponencial - Todos os direitos reservados
        </div>
      </footer>
    </div>
  );
}
