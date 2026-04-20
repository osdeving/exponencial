import React from 'react';
import { ArrowRight, BookOpenCheck, Dumbbell, Layout, Layers3, Sparkles, Trophy } from 'lucide-react';
import { MOCK_RANKING } from '../../config';
import { getContentLibraryStats } from '../../lib/contentStats';
import { LearningPath, Lesson, Topic, UserProfile, UserProgress } from '../../types';

interface HomeViewProps {
  communitySectionRef: React.RefObject<HTMLDivElement | null>;
  nextRecommendedLesson?: Lesson;
  nextRecommendedTopic?: Topic;
  profile: UserProfile | null;
  progress: UserProgress;
  suggestedPath: LearningPath;
  onOpenCatalog: () => void;
  onOpenDashboard: () => void;
  onOpenPaths: () => void;
  onOpenRoadmap: () => void;
  onPathSelect: (path: LearningPath) => void;
  onStartRecommendedFlow: () => void;
}

export function HomeView({
  communitySectionRef,
  nextRecommendedLesson,
  nextRecommendedTopic,
  profile,
  progress,
  suggestedPath,
  onOpenCatalog,
  onOpenDashboard,
  onOpenPaths,
  onOpenRoadmap,
  onPathSelect,
  onStartRecommendedFlow,
}: HomeViewProps) {
  const libraryStats = getContentLibraryStats();
  const proofCards = [
    {
      label: 'Tópicos mapeados',
      value: libraryStats.topicCount,
      description: 'Da base do Fundamental ao Médio, organizados por nível, ramo e etapa escolar.',
      icon: Layers3,
    },
    {
      label: 'Aulas no catálogo',
      value: libraryStats.lessonCount,
      description: 'Conteúdo em Markdown, com teoria, exemplos resolvidos, tabelas e fórmulas renderizadas.',
      icon: BookOpenCheck,
    },
    {
      label: 'Exercícios cadastrados',
      value: libraryStats.exerciseCount,
      description: 'Prática guiada com correção, gabarito, recuperação e rastreio de progresso local.',
      icon: Dumbbell,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-6">
      <div className="mb-20 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 bg-brand px-3 py-1 brutal-border">
            <Sparkles size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Aprenda Matemática com Fluxo Completo</span>
          </div>
          <h1 className="mb-6 font-display text-7xl uppercase leading-[0.85] md:text-8xl">
            Domine a <br />
            <span className="text-brand">Matemática</span>
          </h1>
          <p className="mb-8 max-w-xl text-xl font-medium">
            Um catálogo vivo com {libraryStats.topicCount} tópicos, {libraryStats.lessonCount} aulas e {libraryStats.exerciseCount}{' '}
            exercícios para estudar teoria, praticar, revisar lacunas e acompanhar seu progresso em um só lugar.
          </p>
          <div className="flex flex-wrap gap-4">
            <button onClick={onStartRecommendedFlow} className="brutal-btn bg-brand px-8 py-4 text-xl">
              Começar Agora
            </button>
            <button onClick={onOpenPaths} className="brutal-btn bg-white px-8 py-4 text-xl">
              Ver Trilhas
            </button>
            <button onClick={onOpenRoadmap} className="brutal-btn bg-white px-8 py-4 text-xl">
              Ver Roadmap
            </button>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rotate-1 bg-brand p-8 brutal-border">
            <div className="-rotate-2 bg-white p-6 brutal-border">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] opacity-50">Próximo passo</p>
                  <h2 className="font-display text-4xl uppercase leading-none">
                    {nextRecommendedLesson ? nextRecommendedLesson.title : 'Escolha uma trilha'}
                  </h2>
                </div>
                <Layout size={28} />
              </div>
              <p className="mb-6 font-medium">
                {nextRecommendedTopic
                  ? `${nextRecommendedTopic.title} · ${nextRecommendedTopic.stage} · ${nextRecommendedLesson?.estimatedMinutes} min`
                  : 'Ainda sem histórico. Use uma trilha ou explore por tópico.'}
              </p>
              <button
                onClick={onStartRecommendedFlow}
                className="flex w-full items-center justify-center gap-2 brutal-btn bg-dark text-white"
              >
                Continuar aprendendo
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-white p-5 brutal-border">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] opacity-50">Perfil</p>
              <p className="font-display text-3xl uppercase leading-none">{profile?.name ?? 'Anônimo'}</p>
              <p className="mt-2 text-sm font-medium">{profile ? profile.goal : 'Crie um perfil local para personalizar o app.'}</p>
            </div>
            <div className="bg-white p-5 brutal-border">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] opacity-50">Pontos</p>
              <p className="font-display text-3xl uppercase leading-none">{progress.points}</p>
              <p className="mt-2 text-sm font-medium">{progress.badges.length} medalhas liberadas</p>
            </div>
            <div className="bg-dark p-5 text-white brutal-border">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] opacity-50">Meta</p>
              <p className="font-display text-3xl uppercase leading-none">{profile?.weeklyGoal ?? 3}/semana</p>
              <p className="mt-2 text-sm font-medium">Streak atual: {progress.streak || 0} dia(s)</p>
            </div>
          </div>
        </div>
      </div>

      <section className="mb-20">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 w-fit bg-brand px-3 py-1 text-[10px] font-bold uppercase tracking-widest brutal-border">
              Por que o Exponencial vale seu tempo
            </p>
            <h2 className="font-display text-4xl uppercase leading-none">Teoria forte, prática visível</h2>
          </div>
          <p className="max-w-xl text-sm font-bold uppercase leading-6 opacity-60">
            {libraryStats.readyLessonCount} aulas já estão prontas para estudo completo, e a grade segue crescendo sem prender conteúdo dentro da UI.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {proofCards.map((card) => {
            const Icon = card.icon;

            return (
              <article key={card.label} className="flex min-h-[220px] flex-col bg-white p-6 brutal-border">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="bg-brand p-3 brutal-border">
                    <Icon size={24} />
                  </div>
                  <p className="font-display text-5xl uppercase leading-none">{card.value}</p>
                </div>
                <h3 className="mb-3 text-lg font-bold uppercase">{card.label}</h3>
                <p className="text-sm font-medium leading-7 opacity-70">{card.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <div className="mb-20 flex flex-col justify-between gap-6 bg-dark p-6 text-white brutal-border md:flex-row md:items-center md:p-8">
        <div>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] opacity-50">Recomendação</p>
          <h2 className="font-display text-4xl uppercase leading-none">{suggestedPath.title}</h2>
          <p className="mt-3 max-w-2xl font-medium">{suggestedPath.focus}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => onPathSelect(suggestedPath)} className="brutal-btn bg-white text-dark">
            Abrir trilha
          </button>
          <button onClick={onOpenCatalog} className="brutal-btn bg-white text-dark">
            Explorar catálogo
          </button>
          <button onClick={onStartRecommendedFlow} className="brutal-btn bg-brand text-dark">
            Ir para próxima aula
          </button>
        </div>
      </div>

      <div ref={communitySectionRef} className="mt-20 scroll-mt-28">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-4xl uppercase">Comunidade & Ranking</h2>
            <p className="text-xs font-bold uppercase opacity-50">A parte social sugerida pela UI agora tem preview e entrada direta</p>
          </div>
          <button onClick={onOpenDashboard} className="brutal-btn bg-white text-xs">
            Abrir painel completo
          </button>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="bg-brand p-8 brutal-border">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] opacity-50">Comparativo</p>
            <h3 className="mb-4 font-display text-5xl uppercase leading-none">Suba no Ranking</h3>
            <p className="mb-6 max-w-xl font-medium">
              Complete aulas, salve trilhas e faça os exercícios para ganhar pontos. O painel compara seu ritmo com a comunidade mockada.
            </p>
            <div className="flex flex-wrap gap-3">
              <button onClick={onOpenDashboard} className="brutal-btn bg-dark text-white">
                Ver meu ranking
              </button>
              <button onClick={onStartRecommendedFlow} className="brutal-btn bg-white">
                Ganhar pontos agora
              </button>
            </div>
          </div>

          <div className="grid gap-4">
            {MOCK_RANKING.slice(0, 3).map((user, index) => (
              <div key={user.name} className="flex items-center gap-4 bg-white p-4 brutal-border">
                <div className="font-display text-3xl">{index + 1}</div>
                <img src={user.avatar} alt={user.name} className="h-14 w-14 object-cover brutal-border" />
                <div className="flex-1">
                  <p className="text-sm font-bold uppercase">{user.name}</p>
                  <p className="text-sm font-medium opacity-70">{user.points} pts</p>
                </div>
                <Trophy size={18} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
