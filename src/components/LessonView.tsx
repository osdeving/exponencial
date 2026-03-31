import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Lesson, Topic } from '../types';
import { ArrowLeft, BookOpen, Play, Clock3, Target, CheckCircle2 } from 'lucide-react';

interface LessonViewProps {
  lesson: Lesson;
  topic?: Topic;
  questionCount: number;
  bestScore?: number;
  isCompleted: boolean;
  onBack: () => void;
  onStartExercises: () => void;
  onNextLesson?: () => void;
}

export const LessonView: React.FC<LessonViewProps> = ({
  lesson,
  topic,
  questionCount,
  bestScore,
  isCompleted,
  onBack,
  onStartExercises,
  onNextLesson,
}) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 font-bold uppercase hover:underline"
        >
          <ArrowLeft size={20} />
          Voltar aos Tópicos
        </button>

        {onNextLesson && (
          <button 
            onClick={onNextLesson}
            className="flex items-center gap-2 font-bold uppercase hover:underline"
          >
            Próxima Lição
            <ArrowLeft size={20} className="rotate-180" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="brutal-border p-8 bg-white mb-8">
            <div className="flex items-center gap-2 text-brand-dark mb-4">
              <BookOpen size={20} />
              <span className="font-bold uppercase text-xs tracking-widest">Teoria</span>
            </div>
            <h1 className="font-display text-5xl uppercase mb-8 leading-none">{lesson.title}</h1>
            {topic && (
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="brutal-border bg-brand px-3 py-1 text-[10px] font-bold uppercase">{topic.title}</span>
                <span className="brutal-border bg-white px-3 py-1 text-[10px] font-bold uppercase">
                  {lesson.estimatedMinutes} min
                </span>
                <span className="brutal-border bg-white px-3 py-1 text-[10px] font-bold uppercase">
                  {questionCount} exercícios
                </span>
              </div>
            )}
            
            <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:uppercase prose-strong:text-brand-dark">
              <ReactMarkdown>{lesson.content}</ReactMarkdown>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-6 flex flex-col gap-6">
            <div className="brutal-border p-6 bg-brand">
              <h3 className="font-display text-2xl uppercase mb-2">Pronto para praticar?</h3>
              <p className="font-medium mb-6">Teste seus conhecimentos com exercícios interativos.</p>
              <button 
                onClick={onStartExercises}
                className="brutal-btn bg-dark text-white w-full flex items-center justify-center gap-2"
              >
                Começar Exercícios
                <Play size={18} />
              </button>
            </div>

            <div className="brutal-border p-6 bg-white">
              <h4 className="font-bold uppercase text-xs mb-4 opacity-50">Resumo da Lição</h4>
              <div className="grid gap-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand brutal-border">
                    <Clock3 size={16} />
                  </div>
                  <div>
                    <p className="font-bold uppercase text-[10px] opacity-50">Tempo estimado</p>
                    <p className="font-medium">{lesson.estimatedMinutes} minutos</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white brutal-border">
                    <Target size={16} />
                  </div>
                  <div>
                    <p className="font-bold uppercase text-[10px] opacity-50">Objetivos</p>
                    <p className="font-medium">{lesson.goals.join(' · ')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`p-2 brutal-border ${isCompleted ? 'bg-brand' : 'bg-white'}`}>
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <p className="font-bold uppercase text-[10px] opacity-50">Status</p>
                    <p className="font-medium">
                      {isCompleted ? 'Exercícios concluídos' : 'Teoria pronta para prática'}
                      {typeof bestScore === 'number' ? ` · Melhor nota ${bestScore}%` : ''}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="brutal-border p-6 bg-white">
              <h4 className="font-bold uppercase text-xs mb-4 opacity-50">Dificuldade</h4>
              <div className="flex gap-2 flex-wrap">
                {['Fácil', 'Médio', 'Difícil'].map(d => (
                  <span 
                    key={d}
                    className={`px-2 py-1 text-[10px] font-bold brutal-border ${
                      lesson.difficulty === d ? 'bg-dark text-white' : 'bg-white'
                    }`}
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
