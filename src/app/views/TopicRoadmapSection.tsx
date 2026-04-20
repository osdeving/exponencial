import { ArrowRight, BookOpen, Map } from 'lucide-react';
import { getTopicContentStats } from '../../lib/contentStats';
import { getContentStatusLabel } from '../../lib/learning';
import type { TopicRoadmapEntry } from '../../lib/learning';
import type { Topic } from '../../types';

interface TopicRoadmapSectionProps {
  entries: TopicRoadmapEntry[];
  onTopicSelect: (topic: Topic) => void;
}

function formatPathSummary(pathTitles: string[]) {
  if (pathTitles.length === 0) {
    return 'Ainda não entra em uma trilha dedicada.';
  }

  const visibleTitles = pathTitles.slice(0, 3).join(', ');
  const hiddenCount = pathTitles.length - 3;
  const suffix = hiddenCount > 0 ? ` e mais ${hiddenCount}` : '';

  if (pathTitles.length === 1) {
    return `Aparece na trilha ${visibleTitles}.`;
  }

  return `Aparece em ${pathTitles.length} trilhas: ${visibleTitles}${suffix}.`;
}

function getPreparationLabel(entry: TopicRoadmapEntry) {
  return entry.previousTopic ? entry.previousTopic.title : 'Pode ser ponto de entrada no catálogo.';
}

function getNextTopicLabel(entry: TopicRoadmapEntry) {
  return entry.nextTopic ? entry.nextTopic.title : 'Fecha a sequência atual de tópicos do catálogo.';
}

export function TopicRoadmapSection({ entries, onTopicSelect }: TopicRoadmapSectionProps) {
  return (
    <div className="mx-auto max-w-7xl px-6">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 bg-brand px-3 py-1 brutal-border">
            <Map size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Roadmap do catálogo</span>
          </div>
          <h2 className="font-display text-4xl uppercase">O que o site oferece</h2>
          <p className="max-w-3xl text-sm font-bold uppercase opacity-50">
            Tópicos em ordem crescente, com etapa escolar, trilhas relacionadas e continuidade lógica.
          </p>
        </div>
        <div className="bg-white px-4 py-3 text-xs font-bold uppercase brutal-border">
          {entries.length} tópicos mapeados
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {entries.map((entry) => {
          const topicContentStats = getTopicContentStats(entry.topic.id);

          return (
            <article key={entry.topic.id} className="flex flex-col gap-5 bg-white p-6 brutal-border">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] opacity-50">
                    {entry.topic.level} · {entry.topic.stage}
                  </p>
                  <h3 className="font-display text-3xl uppercase leading-none">{entry.topic.title}</h3>
                </div>
                <span className="w-fit bg-brand px-3 py-1 text-[10px] font-bold uppercase brutal-border">
                  {getContentStatusLabel(entry.topic.status ?? 'outline')}
                </span>
              </div>

              <p className="text-sm font-medium leading-7">{entry.topic.description}</p>

              <div className="grid gap-3 text-sm md:grid-cols-2">
                <div className="bg-dark/5 p-4 brutal-border">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] opacity-50">Onde é visto</p>
                  <p className="font-bold">{entry.topic.stage}</p>
                  <p className="mt-1 text-xs font-medium opacity-70">{entry.topic.branchTitle ?? entry.topic.category}</p>
                </div>
                <div className="bg-dark/5 p-4 brutal-border">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] opacity-50">Aulas</p>
                  <p className="font-bold">
                    {entry.readyLessonCount}/{entry.lessonCount} prontas
                  </p>
                  <p className="mt-1 text-xs font-medium opacity-70">{topicContentStats.exerciseCount} exercícios no tópico.</p>
                </div>
              </div>

              <p className="text-xs font-bold uppercase leading-6 opacity-50">{formatPathSummary(entry.pathTitles)}</p>

              <div className="grid gap-3 text-sm md:grid-cols-2">
                <div>
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] opacity-50">Recomendado antes</p>
                  <p className="font-bold">{getPreparationLabel(entry)}</p>
                </div>
                <div>
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] opacity-50">Próximo tema lógico</p>
                  <p className="font-bold">{getNextTopicLabel(entry)}</p>
                </div>
              </div>

              <button onClick={() => onTopicSelect(entry.topic)} className="mt-auto flex items-center justify-center gap-2 brutal-btn bg-white">
                <BookOpen size={16} />
                Abrir tópico
                <ArrowRight size={16} />
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
}
