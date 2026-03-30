export type Level = 'Fundamental' | 'Médio' | 'Superior';

export interface Topic {
  id: string;
  title: string;
  description: string;
  level: Level;
  category: string;
  icon: string;
}

export interface Lesson {
  id: string;
  topicId: string;
  title: string;
  content: string; // Markdown
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
}

export interface Question {
  id: string;
  lessonId: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: string;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  topicIds: string[];
  color: string;
}

export interface RankingEntry {
  name: string;
  points: number;
  avatar: string;
}

export interface UserProgress {
  completedLessons: string[];
  scores: Record<string, number>;
  points: number;
  badges: string[];
}
