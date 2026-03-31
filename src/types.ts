export type Level = 'Fundamental' | 'Médio' | 'Superior';
export type Difficulty = 'Fácil' | 'Médio' | 'Difícil';
export type LearningGoal = 'Revisar base' | 'Melhorar notas' | 'Vestibular' | 'Preparar faculdade';
export type ContentStatus = 'outline' | 'ready';

export interface Topic {
  id: string;
  title: string;
  description: string;
  level: Level;
  stage: string;
  category: string;
  icon: string;
  order: number;
  tags: string[];
}

export interface Lesson {
  id: string;
  topicId: string;
  title: string;
  content: string; // Markdown
  difficulty: Difficulty;
  estimatedMinutes: number;
  order: number;
  summary: string;
  goals: string[];
  prerequisites: string[];
  tags: string[];
  status: ContentStatus;
}

export interface Question {
  id: string;
  lessonId: string;
  text: string;
  type?: 'multiple-choice' | 'self-check';
  options?: string[];
  correctAnswer?: number;
  answer?: string;
  explanation: string;
  hint?: string;
  number?: number;
  section?: string;
  source?: string;
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
  estimatedWeeks: number;
  focus: string;
  featuredLessonId: string;
}

export interface RankingEntry {
  name: string;
  points: number;
  avatar: string;
}

export interface UserProfile {
  name: string;
  level: Level;
  goal: LearningGoal;
  weeklyGoal: number;
  favoriteTopics: string[];
  joinedAt: string;
}

export interface LessonAttempt {
  score: number;
  total: number;
  completedAt: string;
}

export interface UserProgress {
  completedLessons: string[];
  lessonScores: Record<string, number>;
  scores: Record<string, number>;
  points: number;
  badges: string[];
  savedPaths: string[];
  completedPaths: string[];
  lastLessonId: string | null;
  streak: number;
  lastActiveDate: string | null;
  attempts: Record<string, LessonAttempt>;
}

export interface SearchResult {
  type: 'topic' | 'lesson' | 'path';
  id: string;
  title: string;
  subtitle: string;
  level?: Level;
}
