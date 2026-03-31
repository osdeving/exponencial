import { LearningPath, Lesson, Topic, UserProgress } from '../../types';
import { getLessonsByTopic, getPathProgress, getTopicById, getTopicProgress } from '../../lib/learning';

interface PathViewProps {
  path: LearningPath;
  progress: UserProgress;
  onBack: () => void;
  onLessonSelect: (lesson: Lesson) => void;
  onStartPath: (path: LearningPath) => void;
  onToggleSavedPath: (pathId: string) => void;
  onTopicSelect: (topic: Topic) => void;
}

export function PathView({ path, progress, onBack, onLessonSelect, onStartPath, onToggleSavedPath, onTopicSelect }: PathViewProps) {
  const pathProgress = getPathProgress(path, progress);
  const pathTopics = path.topicIds
    .map((topicId) => getTopicById(topicId))
    .filter((topic): topic is Topic => Boolean(topic));

  return (
    <div className="mx-auto max-w-5xl px-6">
      <button onClick={onBack} className="mb-8 flex items-center gap-2 text-sm font-bold uppercase">
        ← Voltar
      </button>
      <div className="mb-12 p-8 brutal-border" style={{ backgroundColor: path.color }}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h2 className="mb-2 font-display text-6xl uppercase">{path.title}</h2>
            <p className="max-w-3xl text-xl font-medium opacity-80">{path.description}</p>
            <p className="mt-4 text-sm font-bold uppercase opacity-70">{path.focus}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => onStartPath(path)} className="brutal-btn bg-dark text-white">
              Continuar trilha
            </button>
            <button onClick={() => onToggleSavedPath(path.id)} className="brutal-btn bg-white">
              {progress.savedPaths.includes(path.id) ? 'Remover dos salvos' : 'Salvar trilha'}
            </button>
          </div>
        </div>

        <div className="mt-8 max-w-md space-y-2">
          <div className="flex items-center justify-between text-xs font-bold uppercase">
            <span>{path.estimatedWeeks} semanas</span>
            <span>{pathProgress.completionPercent}% concluído</span>
          </div>
          <div className="h-2 overflow-hidden bg-white/70 brutal-border">
            <div className="h-full bg-dark" style={{ width: `${pathProgress.completionPercent}%` }} />
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {pathTopics.map((topic) => {
          const topicProgress = getTopicProgress(topic.id, progress);
          const nextPathLesson = getLessonsByTopic(topic.id).find((lesson) => !progress.completedLessons.includes(lesson.id));

          return (
            <div key={topic.id} className="bg-white p-6 brutal-border">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-3xl font-bold uppercase">{topic.title}</h3>
                  <p className="text-sm font-medium opacity-70">{topic.description}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => onTopicSelect(topic)} className="brutal-btn bg-white text-xs">
                    Abrir tópico
                  </button>
                  <button
                    onClick={() => {
                      const lessonToOpen = nextPathLesson ?? getLessonsByTopic(topic.id)[0];
                      if (lessonToOpen) {
                        onLessonSelect(lessonToOpen);
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
                  <span>
                    {topicProgress.completedLessons}/{topicProgress.totalLessons} lições
                  </span>
                  <span>{topicProgress.completionPercent}% concluído</span>
                </div>
                <div className="h-2 overflow-hidden bg-dark/10 brutal-border">
                  <div className="h-full bg-brand" style={{ width: `${topicProgress.completionPercent}%` }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
