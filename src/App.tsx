import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TOPICS, LESSONS, QUESTIONS, PATHS, BADGES } from './data';
import { Topic, Lesson, Question, UserProgress, LearningPath } from './types';
import { TopicCard } from './components/TopicCard';
import { LessonView } from './components/LessonView';
import { ExerciseView } from './components/ExerciseView';
import { Dashboard } from './components/Dashboard';
import { PathCard } from './components/PathCard';
import { TutorChat } from './components/TutorChat';
import { Layout, Search, GraduationCap, Menu, X, Github, Sparkles, Trophy } from 'lucide-react';
import { cn } from './lib/utils';
import confetti from 'canvas-confetti';

type ViewState = 'home' | 'topic' | 'lesson' | 'exercise' | 'dashboard' | 'path';

export default function App() {
  const [view, setView] = useState<ViewState>('home');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('math-progress');
    return saved ? JSON.parse(saved) : { completedLessons: [], scores: {}, points: 0, badges: [] };
  });

  useEffect(() => {
    localStorage.setItem('math-progress', JSON.stringify(progress));
  }, [progress]);

  const handleTopicSelect = (topic: Topic) => {
    setSelectedTopic(topic);
    setView('topic');
  };

  const handleLessonSelect = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setView('lesson');
  };

  const handlePathSelect = (path: LearningPath) => {
    setSelectedPath(path);
    setView('path');
  };

  const handleNextLesson = () => {
    if (!selectedTopic || !selectedLesson) return;
    const topicLessons = LESSONS.filter(l => l.topicId === selectedTopic.id);
    const currentIndex = topicLessons.findIndex(l => l.id === selectedLesson.id);
    if (currentIndex < topicLessons.length - 1) {
      setSelectedLesson(topicLessons[currentIndex + 1]);
      setView('lesson');
    }
  };

  const hasNextLesson = () => {
    if (!selectedTopic || !selectedLesson) return false;
    const topicLessons = LESSONS.filter(l => l.topicId === selectedTopic.id);
    const currentIndex = topicLessons.findIndex(l => l.id === selectedLesson.id);
    return currentIndex < topicLessons.length - 1;
  };

  const handleExerciseComplete = (score: number) => {
    if (selectedTopic && selectedLesson) {
      const lessonQuestions = QUESTIONS.filter(q => q.lessonId === selectedLesson.id);
      const pointsEarned = (score * 50) + (score === lessonQuestions.length ? 100 : 0);
      
      setProgress(prev => {
        const newCompleted = Array.from(new Set([...prev.completedLessons, selectedLesson.id]));
        const newScores = { ...prev.scores, [selectedTopic.id]: Math.max(prev.scores[selectedTopic.id] || 0, score) };
        const newPoints = prev.points + pointsEarned;
        
        // Badge logic
        const newBadges = [...prev.badges];
        BADGES.forEach(badge => {
          if (!newBadges.includes(badge.id)) {
            // Simple check: if they got 100% in a lesson of that topic
            if (badge.requirement === selectedTopic.id && score === lessonQuestions.length) {
              newBadges.push(badge.id);
              confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#00FF00', '#000000', '#FFFFFF']
              });
            }
          }
        });

        return {
          completedLessons: newCompleted,
          scores: newScores,
          points: newPoints,
          badges: newBadges
        };
      });
    }
    setView('home');
  };

  return (
    <div className="min-h-screen bg-paper">
      {/* Navbar */}
      <nav className="border-b-4 border-dark bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => setView('home')}
          >
            <div className="bg-brand brutal-border p-2">
              <GraduationCap size={24} />
            </div>
            <span className="font-display text-3xl uppercase tracking-tighter">Exponencial</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => setView('home')}
              className={cn("font-bold uppercase text-sm hover:text-brand-dark", view === 'home' && "underline underline-offset-8")}
            >
              Explorar
            </button>
            <button 
              onClick={() => setView('dashboard')}
              className={cn("font-bold uppercase text-sm hover:text-brand-dark flex items-center gap-2", view === 'dashboard' && "underline underline-offset-8")}
            >
              Meu Progresso
              <div className="bg-brand px-2 py-0.5 brutal-border text-[10px]">{progress.points} pts</div>
            </button>
            <button className="brutal-btn bg-dark text-white text-xs">
              Entrar
            </button>
          </div>
        </div>
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
              {/* Hero */}
              <div className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 bg-brand px-3 py-1 brutal-border mb-6">
                    <Sparkles size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Aprenda Matemática de Verdade</span>
                  </div>
                  <h1 className="font-display text-8xl uppercase leading-[0.85] mb-6">
                    Domine a <br />
                    <span className="text-brand stroke-dark stroke-2">Matemática</span>
                  </h1>
                  <p className="text-xl font-medium max-w-md mb-8">
                    Aprenda do fundamental ao médio com teoria dinâmica e exercícios práticos. Ganhe pontos e medalhas!
                  </p>
                  <div className="flex gap-4">
                    <button className="brutal-btn bg-brand text-xl px-8 py-4">Começar Agora</button>
                    <button className="brutal-btn bg-white text-xl px-8 py-4">Ver Planos</button>
                  </div>
                </div>
                <div className="hidden lg:block">
                  <div className="brutal-border bg-brand p-8 rotate-3">
                    <div className="brutal-border bg-white p-6 -rotate-6">
                      <pre className="font-mono text-sm">
                        {`f(x) = ax² + bx + c\n\nΔ = b² - 4ac\n\nx = (-b ± √Δ) / 2a`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* Learning Paths */}
              <div className="mb-20">
                <div className="mb-8">
                  <h2 className="font-display text-4xl uppercase">Trilhas de Aprendizado</h2>
                  <p className="font-bold uppercase text-xs opacity-50">Caminhos curados para seus objetivos</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {PATHS.map(path => (
                    <PathCard 
                      key={path.id} 
                      path={path} 
                      onClick={() => handlePathSelect(path)} 
                    />
                  ))}
                </div>
              </div>

              {/* Topics Grid */}
              <div className="mb-12 flex justify-between items-end">
                <div>
                  <h2 className="font-display text-4xl uppercase">Explorar Tópicos</h2>
                  <p className="font-bold uppercase text-xs opacity-50">Escolha um assunto para começar</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 brutal-border bg-dark text-white text-xs font-bold uppercase">Todos</button>
                  <button className="px-4 py-2 brutal-border bg-white text-xs font-bold uppercase">Fundamental</button>
                  <button className="px-4 py-2 brutal-border bg-white text-xs font-bold uppercase">Médio</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {TOPICS.map(topic => (
                  <TopicCard 
                    key={topic.id} 
                    topic={topic} 
                    onClick={() => handleTopicSelect(topic)} 
                  />
                ))}
              </div>
            </motion.div>
          )}

          {view === 'path' && selectedPath && (
            <motion.div
              key="path"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto px-6"
            >
              <button 
                onClick={() => setView('home')}
                className="font-bold uppercase text-sm mb-8 flex items-center gap-2"
              >
                ← Voltar
              </button>
              <div className="brutal-border p-8 mb-12" style={{ backgroundColor: selectedPath.color }}>
                <h2 className="font-display text-6xl uppercase mb-2">{selectedPath.title}</h2>
                <p className="text-xl font-medium opacity-80">{selectedPath.description}</p>
              </div>
              
              <div className="grid gap-6">
                {TOPICS.filter(t => selectedPath.topicIds.includes(t.id)).map(topic => (
                  <div 
                    key={topic.id}
                    onClick={() => handleTopicSelect(topic)}
                    className="brutal-border p-6 bg-white hover:bg-brand cursor-pointer flex justify-between items-center group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-brand p-2 brutal-border">
                        <Trophy size={20} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold uppercase">{topic.title}</h3>
                        <p className="text-xs font-bold uppercase opacity-50">{topic.category}</p>
                      </div>
                    </div>
                    <div className="brutal-border p-2 bg-dark text-white group-hover:bg-white group-hover:text-dark">
                      Explorar
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {view === 'topic' && selectedTopic && (
            <motion.div
              key="topic"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto px-6"
            >
              <button 
                onClick={() => setView('home')}
                className="font-bold uppercase text-sm mb-8 flex items-center gap-2"
              >
                ← Voltar
              </button>
              <h2 className="font-display text-6xl uppercase mb-2">{selectedTopic.title}</h2>
              <p className="text-xl font-medium mb-12 opacity-70">{selectedTopic.description}</p>
              
              <div className="grid gap-6">
                {LESSONS.filter(l => l.topicId === selectedTopic.id).map(lesson => (
                  <div 
                    key={lesson.id}
                    onClick={() => handleLessonSelect(lesson)}
                    className="brutal-border p-6 bg-white hover:bg-brand cursor-pointer flex justify-between items-center group"
                  >
                    <div>
                      <h3 className="text-2xl font-bold uppercase">{lesson.title}</h3>
                      <span className="text-xs font-bold uppercase opacity-50">{lesson.difficulty}</span>
                    </div>
                    <div className="brutal-border p-2 bg-dark text-white group-hover:bg-white group-hover:text-dark">
                      Começar
                    </div>
                  </div>
                ))}
                {LESSONS.filter(l => l.topicId === selectedTopic.id).length === 0 && (
                  <div className="brutal-border p-12 text-center bg-dark/5">
                    <p className="font-bold uppercase">Conteúdo em breve!</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {view === 'lesson' && selectedLesson && (
            <motion.div
              key="lesson"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LessonView 
                lesson={selectedLesson} 
                onBack={() => setView('topic')}
                onStartExercises={() => setView('exercise')}
                onNextLesson={hasNextLesson() ? handleNextLesson : undefined}
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
                questions={QUESTIONS.filter(q => q.lessonId === selectedLesson.id)}
                onComplete={handleExerciseComplete}
                onNextLesson={hasNextLesson() ? handleNextLesson : undefined}
              />
            </motion.div>
          )}

          {view === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Dashboard progress={progress} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Tutor Chat */}
      <TutorChat currentTopic={selectedTopic} currentLesson={selectedLesson} />

      {/* Footer */}
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
              Transformando o ensino de matemática através de design arrojado e interatividade.
            </p>
          </div>
          <div>
            <h4 className="font-display text-xl uppercase mb-4">Plataforma</h4>
            <ul className="flex flex-col gap-2 font-bold uppercase text-xs">
              <li><a href="#" className="hover:underline">Cursos</a></li>
              <li><a href="#" className="hover:underline">Exercícios</a></li>
              <li><a href="#" className="hover:underline">Comunidade</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-xl uppercase mb-4">Social</h4>
            <div className="flex gap-4">
              <div className="brutal-border p-2 bg-brand cursor-pointer">
                <Github size={20} />
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-dark/10 text-[10px] font-bold uppercase opacity-50">
          © 2026 Exponencial - Todos os direitos reservados
        </div>
      </footer>
    </div>
  );
}
