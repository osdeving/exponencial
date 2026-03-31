import { getQuestionCountByLessonId } from '../../content/queries';
import { getContentStatusLabel } from '../../lib/learning';
import { Lesson, Topic, UserProgress } from '../../types';

interface TopicViewProps {
  isFavorite: boolean;
  lessons: Lesson[];
  progress: UserProgress;
  topic: Topic;
  onBack: () => void;
  onLessonSelect: (lesson: Lesson) => void;
  onToggleFavoriteTopic: (topicId: string) => void;
}

export function TopicView({
  isFavorite,
  lessons,
  progress,
  topic,
  onBack,
  onLessonSelect,
  onToggleFavoriteTopic,
}: TopicViewProps) {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <button onClick={onBack} className="mb-8 flex items-center gap-2 text-sm font-bold uppercase">
        ← Voltar
      </button>
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] opacity-50">
            {topic.level} · {topic.stage}
          </p>
          <h2 className="mb-2 font-display text-6xl uppercase">{topic.title}</h2>
          <p className="max-w-3xl text-xl font-medium opacity-70">{topic.description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => onToggleFavoriteTopic(topic.id)} className="brutal-btn bg-white text-xs">
            {isFavorite ? 'Remover favorito' : 'Favoritar tópico'}
          </button>
          <button
            onClick={() => {
              if (lessons[0]) {
                onLessonSelect(lessons[0]);
              }
            }}
            className="brutal-btn bg-brand text-xs"
            disabled={lessons.length === 0}
          >
            Começar do início
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        {lessons.map((lesson) => {
          const bestScore = progress.lessonScores[lesson.id];
          const attempt = progress.attempts[lesson.id];
          const isCompleted = progress.completedLessons.includes(lesson.id);

          return (
            <div
              key={lesson.id}
              onClick={() => onLessonSelect(lesson)}
              className="group flex cursor-pointer flex-col gap-4 bg-white p-6 brutal-border hover:bg-brand md:flex-row md:items-center md:justify-between"
            >
              <div>
                <h3 className="text-2xl font-bold uppercase">{lesson.title}</h3>
                <p className="mt-2 max-w-2xl text-sm font-medium opacity-70">{lesson.summary}</p>
                <div className="mt-2 flex flex-wrap gap-2 text-[10px] font-bold uppercase opacity-60">
                  <span>{lesson.difficulty}</span>
                  <span>{lesson.estimatedMinutes} min</span>
                  <span>{getQuestionCountByLessonId(lesson.id)} exercícios</span>
                  <span>{getContentStatusLabel(lesson.status)}</span>
                  {typeof bestScore === 'number' && <span>Melhor nota {bestScore}%</span>}
                  {attempt && <span>Última tentativa {attempt.score}/{attempt.total}</span>}
                </div>
              </div>
              <div className="flex items-center gap-3">
                {isCompleted && <div className="bg-dark px-3 py-2 text-xs font-bold uppercase text-white brutal-border">Concluída</div>}
                <div className="bg-dark p-2 text-white brutal-border group-hover:bg-white group-hover:text-dark">Abrir</div>
              </div>
            </div>
          );
        })}
        {lessons.length === 0 && (
          <div className="bg-dark/5 p-12 text-center brutal-border">
            <p className="font-bold uppercase">Conteúdo em breve.</p>
          </div>
        )}
      </div>
    </div>
  );
}
