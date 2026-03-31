import React from 'react';
import { ArrowRight, Layout, Search, Sparkles, Trophy } from 'lucide-react';
import { MOCK_RANKING, PATHS } from '../../config';
import { PathCard } from '../../components/PathCard';
import { TopicCard } from '../../components/TopicCard';
import { LEVEL_FILTERS, STATUS_FILTERS, getContentStatusLabel, getPathProgress, getTopicProgress } from '../../lib/learning';
import { cn } from '../../lib/utils';
import { HomeSection } from '../types';
import { LearningPath, Lesson, SearchResult, Topic, UserProfile, UserProgress } from '../../types';

interface HomeViewProps {
  availableBranchFilters: string[];
  branchFilter: string;
  communitySectionRef: React.RefObject<HTMLDivElement | null>;
  filteredTopics: Topic[];
  groupedTopics: Array<{ branchTitle: string; topics: Topic[] }>;
  levelFilter: (typeof LEVEL_FILTERS)[number];
  nextRecommendedLesson?: Lesson;
  nextRecommendedTopic?: Topic;
  pathsSectionRef: React.RefObject<HTMLDivElement | null>;
  profile: UserProfile | null;
  progress: UserProgress;
  searchQuery: string;
  searchResults: SearchResult[];
  statusFilter: (typeof STATUS_FILTERS)[number];
  suggestedPath: LearningPath;
  topicsSectionRef: React.RefObject<HTMLDivElement | null>;
  onBranchFilterChange: (value: string) => void;
  onLevelFilterChange: (filter: (typeof LEVEL_FILTERS)[number]) => void;
  onOpenDashboard: () => void;
  onOpenHomeSection: (section: HomeSection) => void;
  onPathSelect: (path: LearningPath) => void;
  onSearchQueryChange: (value: string) => void;
  onSearchSelection: (result: SearchResult) => void;
  onStartPath: (path: LearningPath) => void;
  onStartRecommendedFlow: () => void;
  onStatusFilterChange: (filter: (typeof STATUS_FILTERS)[number]) => void;
  onTopicSelect: (topic: Topic) => void;
}

export function HomeView({
  availableBranchFilters,
  branchFilter,
  communitySectionRef,
  filteredTopics,
  groupedTopics,
  levelFilter,
  nextRecommendedLesson,
  nextRecommendedTopic,
  pathsSectionRef,
  profile,
  progress,
  searchQuery,
  searchResults,
  statusFilter,
  suggestedPath,
  topicsSectionRef,
  onBranchFilterChange,
  onLevelFilterChange,
  onOpenDashboard,
  onOpenHomeSection,
  onPathSelect,
  onSearchQueryChange,
  onSearchSelection,
  onStartPath,
  onStartRecommendedFlow,
  onStatusFilterChange,
  onTopicSelect,
}: HomeViewProps) {
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
            Teoria, prática, trilhas salvas, progresso persistido e tutor contextual em uma interface que agora fecha o ciclo inteiro.
          </p>
          <div className="flex flex-wrap gap-4">
            <button onClick={onStartRecommendedFlow} className="brutal-btn bg-brand px-8 py-4 text-xl">
              Começar Agora
            </button>
            <button onClick={() => onOpenHomeSection('paths')} className="brutal-btn bg-white px-8 py-4 text-xl">
              Ver Planos
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
          <button onClick={onStartRecommendedFlow} className="brutal-btn bg-brand text-dark">
            Ir para próxima aula
          </button>
        </div>
      </div>

      <div ref={pathsSectionRef} className="mb-20 scroll-mt-28">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-4xl uppercase">Trilhas de Aprendizado</h2>
            <p className="text-xs font-bold uppercase opacity-50">Caminhos salvos, progresso visível e retomada rápida</p>
          </div>
          <button onClick={() => onStartPath(suggestedPath)} className="brutal-btn bg-white text-xs">
            Retomar trilha sugerida
          </button>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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

      <div ref={topicsSectionRef} className="scroll-mt-28">
        <div className="mb-12 flex flex-col gap-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="font-display text-4xl uppercase">Explorar Tópicos</h2>
              <p className="text-xs font-bold uppercase opacity-50">Busca real, filtros por nível e currículo organizado por etapa</p>
            </div>
            <div className="relative w-full lg:w-[420px]">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                value={searchQuery}
                onChange={(event) => onSearchQueryChange(event.target.value)}
                placeholder="Buscar por tópico, aula ou trilha"
                className="w-full bg-white py-3 pl-12 pr-4 brutal-border focus:bg-brand/10 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {LEVEL_FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => onLevelFilterChange(filter)}
                className={cn(
                  'px-4 py-2 text-xs font-bold uppercase brutal-border',
                  levelFilter === filter ? 'bg-dark text-white' : 'bg-white',
                )}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {STATUS_FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => onStatusFilterChange(filter)}
                className={cn(
                  'px-4 py-2 text-xs font-bold uppercase brutal-border',
                  statusFilter === filter ? 'bg-brand text-dark' : 'bg-white',
                )}
              >
                {getContentStatusLabel(filter)}
              </button>
            ))}
          </div>

          <div className="w-full lg:w-[420px]">
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] opacity-50">Ramo canônico</label>
            <select
              value={branchFilter}
              onChange={(event) => onBranchFilterChange(event.target.value)}
              className="w-full bg-white px-4 py-3 brutal-border focus:bg-brand/10 focus:outline-none"
            >
              {availableBranchFilters.map((filter) => (
                <option key={filter} value={filter}>
                  {filter}
                </option>
              ))}
            </select>
          </div>

          {searchResults.length > 0 && searchQuery.trim() && (
            <div className="grid gap-3">
              {searchResults.map((result) => (
                <button
                  key={`${result.type}-${result.id}`}
                  onClick={() => onSearchSelection(result)}
                  className="flex items-center justify-between bg-white px-5 py-4 text-left brutal-border hover:bg-brand"
                >
                  <div>
                    <p className="text-sm font-bold uppercase">
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

        <div className="space-y-10">
          {groupedTopics.map((group) => (
            <section key={group.branchTitle}>
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-3xl uppercase">{group.branchTitle}</h3>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50">{group.topics.length} tópicos</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {group.topics.map((topic) => {
                  const topicProgress = getTopicProgress(topic.id, progress);

                  return (
                    <TopicCard
                      key={topic.id}
                      topic={topic}
                      lessonCount={topicProgress.totalLessons}
                      progressPercent={topicProgress.completionPercent}
                      isFavorite={Boolean(profile?.favoriteTopics.includes(topic.id))}
                      onClick={() => onTopicSelect(topic)}
                    />
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {filteredTopics.length === 0 && (
          <div className="mt-6 bg-dark/5 p-12 text-center brutal-border">
            <p className="font-bold uppercase">Nenhum tópico encontrado para esse filtro.</p>
          </div>
        )}
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
