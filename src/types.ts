export type Level = 'Fundamental' | 'Médio' | 'Superior';
export type Difficulty = 'Fácil' | 'Médio' | 'Difícil';
export type LearningGoal = 'Revisar base' | 'Melhorar notas' | 'Vestibular' | 'Preparar faculdade';
export type ContentStatus = 'outline' | 'in-progress' | 'ready';

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
  status?: ContentStatus;
  canonicalIds?: string[];
  canonicalPrimaryId?: string;
  canonicalTitles?: string[];
  branchIds?: string[];
  branchTitle?: string;
  branchTitles?: string[];
  schoolYearBands?: string[];
  levelBands?: Level[];
  taxonomyLevelBands?: string[];
  examProfiles?: string[];
  flags?: string[];
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
  canonicalIds?: string[];
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
  misconceptionTags?: string[];
  prerequisiteCanonicalIds?: string[];
  recoveryLessonIds?: string[];
  solution?: QuestionSolution;
}

export type QuestionSolutionMode = 'static' | 'step-by-step';
export type QuestionSolutionStepType = 'markdown' | 'equation' | 'scratchpad' | 'algorithm';
export type QuestionSolutionAlgorithmLayout = 'mmc' | 'long-division' | 'continued-division' | 'custom';

interface QuestionSolutionStepBase {
  id?: string;
  title?: string;
  revealMs?: number;
}

export interface QuestionMarkdownSolutionStep extends QuestionSolutionStepBase {
  type: 'markdown' | 'equation';
  content: string;
}

export interface QuestionScratchpadSolutionStep extends QuestionSolutionStepBase {
  type: 'scratchpad';
  lines: string[];
}

export interface QuestionAlgorithmSolutionStep extends QuestionSolutionStepBase {
  type: 'algorithm';
  layout: QuestionSolutionAlgorithmLayout;
  lines: string[];
  result?: string;
  annotations?: string[];
}

export type QuestionSolutionStep =
  | QuestionMarkdownSolutionStep
  | QuestionScratchpadSolutionStep
  | QuestionAlgorithmSolutionStep;

export interface QuestionSolution {
  mode: QuestionSolutionMode;
  summary?: string;
  steps: QuestionSolutionStep[];
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

export interface CanonicalMasteryRecord {
  canonicalId: string;
  subsectionId: string;
  bestScore: number;
  latestScore: number;
  attemptCount: number;
  mastered: boolean;
  lastLessonId: string;
  updatedAt: string;
}

export interface CanonicalMasteryBucket {
  subsectionId: string;
  subsectionTitle: string;
  branchTitle: string;
  totalSkills: number;
  masteredSkills: number;
  attemptedSkills: number;
  activeDebtSkills: number;
  untouchedSkills: number;
  masteryPercent: number;
}

export interface CanonicalMasteryOverview {
  totalSkills: number;
  masteredSkills: number;
  attemptedSkills: number;
  activeDebtSkills: number;
  untouchedSkills: number;
  masteryPercent: number;
  buckets: CanonicalMasteryBucket[];
  activeDebtBuckets: CanonicalMasteryBucket[];
}

export type LessonGateStatus = 'locked' | 'ready' | 'in-review' | 'passed';

export interface LessonGate {
  lessonId: string;
  status: LessonGateStatus;
  thresholdPercent: number;
  bestScore: number | null;
  latestScore: number | null;
  isPassed: boolean;
  isLocked: boolean;
  blockingLessonId: string | null;
  reason: string;
}

export type ProductAnalyticsEventType =
  | 'profile-configured'
  | 'lesson-started'
  | 'exercise-submitted'
  | 'lesson-passed'
  | 'lesson-blocked';

export interface ProductAnalyticsEvent {
  id: string;
  type: ProductAnalyticsEventType;
  occurredAt: string;
  lessonId?: string;
  topicId?: string;
  score?: number;
  total?: number;
  percentage?: number;
}

export interface ProductAnalyticsSummary {
  totalEvents: number;
  profileConfiguredCount: number;
  lessonStartedCount: number;
  exerciseSubmittedCount: number;
  lessonPassedCount: number;
  lessonBlockedCount: number;
  approvalRate: number;
  blockRate: number;
  recentEvents: ProductAnalyticsEvent[];
}

export type RecoveryAssignmentStatus = 'active' | 'completed';

export interface RecoveryAssignment {
  lessonId: string;
  createdAt: string;
  status: RecoveryAssignmentStatus;
  targetLessonIds: string[];
  revisitedLessonIds: string[];
  sourceQuestionIds: string[];
  misconceptionTags: string[];
  prerequisiteCanonicalIds: string[];
  summary: string;
  completedAt?: string;
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
  canonicalMastery: Record<string, CanonicalMasteryRecord>;
  recoveryAssignments: Record<string, RecoveryAssignment>;
}

export interface SearchResult {
  type: 'topic' | 'lesson' | 'path';
  id: string;
  title: string;
  subtitle: string;
  level?: Level;
}
