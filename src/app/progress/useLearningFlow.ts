import confetti from 'canvas-confetti';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { getQuestionCountByLessonId } from '../../content/queries';
import { useLessonQuestions } from '../../content/useLessonQuestions';
import {
  DEFAULT_PROGRESS,
  LESSON_PASS_THRESHOLD,
  buildProgressAfterLessonCompletion,
  getLessonById,
  getNextLessonForPath,
  getNextLessonInTopic,
  getNextUnlockedLessonInTopic,
  getRecommendedLesson,
  getSuggestedPath,
  getTopicById,
} from '../../lib/learning';
import { HomeSection } from '../types';
import { Lesson, LearningPath, ProductAnalyticsEvent, UserProfile, UserProgress } from '../../types';

interface UseLearningFlowOptions {
  profile: UserProfile | null;
  progress: UserProgress;
  selectedLesson: Lesson | null;
  setProgress: Dispatch<SetStateAction<UserProgress>>;
  selectLesson: (lesson: Lesson) => void;
  trackEvent: (event: Omit<ProductAnalyticsEvent, 'id' | 'occurredAt'> & { occurredAt?: string }) => void;
  openHomeSection: (section: HomeSection) => void;
  goHome: () => void;
}

export function useLearningFlow({
  profile,
  progress,
  selectedLesson,
  setProgress,
  selectLesson,
  trackEvent,
  openHomeSection,
  goHome,
}: UseLearningFlowOptions) {
  const selectedLessonQuestions = useLessonQuestions(selectedLesson?.id);
  const nextRecommendedLesson = useMemo(() => getRecommendedLesson(progress), [progress]);
  const nextRecommendedTopic = useMemo(
    () => (nextRecommendedLesson ? getTopicById(nextRecommendedLesson.topicId) : undefined),
    [nextRecommendedLesson],
  );
  const suggestedPath = useMemo(() => getSuggestedPath(profile), [profile]);
  const selectedLessonQuestionCount = useMemo(
    () => (selectedLesson ? getQuestionCountByLessonId(selectedLesson.id) : 0),
    [selectedLesson],
  );
  const hasSequentialNextLesson = useMemo(
    () => (selectedLesson ? Boolean(getNextLessonInTopic(selectedLesson.topicId, selectedLesson.id)) : false),
    [selectedLesson],
  );
  const hasNextLesson = useMemo(
    () =>
      selectedLesson ? Boolean(getNextUnlockedLessonInTopic(selectedLesson.topicId, selectedLesson.id, progress)) : false,
    [progress, selectedLesson],
  );

  const goToNextLesson = () => {
    if (!selectedLesson) {
      return;
    }

    const nextLesson = getNextUnlockedLessonInTopic(selectedLesson.topicId, selectedLesson.id, progress);
    if (nextLesson) {
      selectLesson(nextLesson);
    }
  };

  const startRecommendedFlow = () => {
    if (nextRecommendedLesson) {
      selectLesson(nextRecommendedLesson);
      return;
    }

    openHomeSection('topics');
  };

  const startPath = (path: LearningPath) => {
    const nextLesson = getNextLessonForPath(path.id, progress) ?? getLessonById(path.featuredLessonId);

    setProgress((current) =>
      current.savedPaths.includes(path.id)
        ? current
        : {
            ...current,
            savedPaths: [...current.savedPaths, path.id],
          },
    );

    if (nextLesson) {
      selectLesson(nextLesson);
    }
  };

  const toggleSavedPath = (pathId: string) => {
    setProgress((current) => {
      const alreadySaved = current.savedPaths.includes(pathId);

      return {
        ...current,
        savedPaths: alreadySaved ? current.savedPaths.filter((id) => id !== pathId) : [...current.savedPaths, pathId],
      };
    });
  };

  const completeExercise = ({
    score,
    total,
    continueToNext,
  }: {
    score: number;
    total: number;
    continueToNext: boolean;
  }) => {
    if (!selectedLesson) {
      return;
    }

    const completedAt = new Date().toISOString();
    const currentPercentage = total === 0 ? 0 : Math.round((score / total) * 100);
    const passedCurrentAttempt = currentPercentage >= LESSON_PASS_THRESHOLD;
    const provisionalNextLesson = continueToNext && passedCurrentAttempt
      ? getNextLessonInTopic(selectedLesson.topicId, selectedLesson.id)
      : undefined;
    const nextProgress = buildProgressAfterLessonCompletion({
      progress,
      lesson: selectedLesson,
      score,
      total,
      completedAt,
      nextLessonId: provisionalNextLesson?.id,
    });
    const nextLesson = continueToNext
      ? getNextUnlockedLessonInTopic(selectedLesson.topicId, selectedLesson.id, nextProgress)
      : undefined;
    const hasNewBadge = nextProgress.badges.length > progress.badges.length;
    const occurredAt = completedAt;

    trackEvent({
      type: 'exercise-submitted',
      occurredAt,
      lessonId: selectedLesson.id,
      topicId: selectedLesson.topicId,
      score,
      total,
      percentage: currentPercentage,
    });

    trackEvent({
      type: passedCurrentAttempt ? 'lesson-passed' : 'lesson-blocked',
      occurredAt,
      lessonId: selectedLesson.id,
      topicId: selectedLesson.topicId,
      score,
      total,
      percentage: currentPercentage,
    });

    setProgress(nextProgress);

    if (score === total || hasNewBadge) {
      confetti({
        particleCount: hasNewBadge ? 180 : 120,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#00FF00', '#000000', '#FFFFFF'],
      });
    }

    if (continueToNext && nextLesson) {
      selectLesson(nextLesson);
      return;
    }

    goHome();
  };

  const resetProgress = () => {
    if (!window.confirm('Isso vai apagar o progresso salvo neste navegador. Deseja continuar?')) {
      return;
    }

    setProgress(DEFAULT_PROGRESS);
  };

  return {
    derived: {
      hasNextLesson,
      hasSequentialNextLesson,
      nextRecommendedLesson,
      nextRecommendedTopic,
      selectedLessonQuestionCount,
      selectedLessonQuestions: selectedLessonQuestions.questions,
      selectedLessonQuestionsLoading: selectedLessonQuestions.isLoading,
      suggestedPath,
    },
    actions: {
      completeExercise,
      goToNextLesson,
      resetProgress,
      startPath,
      startRecommendedFlow,
      toggleSavedPath,
    },
  };
}
