import { ArrowRight, Search } from 'lucide-react';
import { TopicCard } from '../../components/TopicCard';
import { getTopicContentStats } from '../../lib/contentStats';
import { LEVEL_FILTERS, STATUS_FILTERS, getContentStatusLabel, getTopicProgress } from '../../lib/learning';
import { cn } from '../../lib/utils';
import type { SearchResult, Topic, UserProfile, UserProgress } from '../../types';

interface CatalogViewProps {
  availableBranchFilters: string[];
  branchFilter: string;
  filteredTopics: Topic[];
  groupedTopics: Array<{ branchTitle: string; topics: Topic[] }>;
  levelFilter: (typeof LEVEL_FILTERS)[number];
  profile: UserProfile | null;
  progress: UserProgress;
  searchQuery: string;
  searchResults: SearchResult[];
  statusFilter: (typeof STATUS_FILTERS)[number];
  onBranchFilterChange: (value: string) => void;
  onLevelFilterChange: (filter: (typeof LEVEL_FILTERS)[number]) => void;
  onSearchQueryChange: (value: string) => void;
  onSearchSelection: (result: SearchResult) => void;
  onStatusFilterChange: (filter: (typeof STATUS_FILTERS)[number]) => void;
  onTopicSelect: (topic: Topic) => void;
}

export function CatalogView({
  availableBranchFilters,
  branchFilter,
  filteredTopics,
  groupedTopics,
  levelFilter,
  profile,
  progress,
  searchQuery,
  searchResults,
  statusFilter,
  onBranchFilterChange,
  onLevelFilterChange,
  onSearchQueryChange,
  onSearchSelection,
  onStatusFilterChange,
  onTopicSelect,
}: CatalogViewProps) {
  return (
    <div className="mx-auto max-w-7xl px-6">
      <div className="mb-12 flex flex-col gap-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 w-fit bg-brand px-3 py-1 text-[10px] font-bold uppercase tracking-widest brutal-border">
              Catálogo
            </p>
            <h1 className="font-display text-6xl uppercase leading-none">Explorar Tópicos</h1>
            <p className="mt-4 max-w-3xl text-lg font-medium">
              Busca, filtros por nível e currículo organizado por ramo canônico.
            </p>
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
                <h2 className="font-display text-3xl uppercase">{group.branchTitle}</h2>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50">{group.topics.length} tópicos</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {group.topics.map((topic) => {
                const topicProgress = getTopicProgress(topic.id, progress);
                const topicContentStats = getTopicContentStats(topic.id);

                return (
                  <TopicCard
                    key={topic.id}
                    topic={topic}
                    lessonCount={topicProgress.totalLessons}
                    exerciseCount={topicContentStats.exerciseCount}
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
  );
}
