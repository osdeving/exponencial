import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Lesson } from '../types';
import { ArrowLeft, BookOpen, Play } from 'lucide-react';

interface LessonViewProps {
  lesson: Lesson;
  onBack: () => void;
  onStartExercises: () => void;
  onNextLesson?: () => void;
}

export const LessonView: React.FC<LessonViewProps> = ({ lesson, onBack, onStartExercises, onNextLesson }) => {
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
              <h4 className="font-bold uppercase text-xs mb-4 opacity-50">Dificuldade</h4>
              <div className="flex gap-2">
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
