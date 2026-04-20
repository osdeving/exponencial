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
import {
  assignRecoveryForLesson,
  getActiveRecoveryAssignment,
  getNextRecoveryLessonId,
  getRecoveryAssignmentReason,
  resolveRecoveryForLesson,
} from '../../lib/recovery';
import { Lesson, LearningPath, ProductAnalyticsEvent, UserProfile, UserProgress } from '../../types';

interface UseLearningFlowOptions {
  profile: UserProfile | null;
  progress: UserProgress;
  selectedLesson: Lesson | null;
  setProgress: Dispatch<SetStateAction<UserProgress>>;
  selectLesson: (lesson: Lesson) => void;
  startExercises: () => void;
  trackEvent: (event: Omit<ProductAnalyticsEvent, 'id' | 'occurredAt'> & { occurredAt?: string }) => void;
  openCatalog: () => void;
  goHome: () => void;
}

// Coordena o fluxo pedagogico: recomendacao, pratica, recuperacao, pontos e navegacao pos-exercicio.
export function useLearningFlow({
  profile,
  progress,
  selectedLesson,
  setProgress,
  selectLesson,
  startExercises,
  trackEvent,
  openCatalog,
  goHome,
}: UseLearningFlowOptions) {
  // Questoes sao carregadas sob demanda para a licao selecionada.
  const selectedLessonQuestions = useLessonQuestions(selectedLesson?.id);
  const selectedLessonRecoveryAssignment = useMemo(
    () => (selectedLesson ? getActiveRecoveryAssignment(selectedLesson.id, progress) : undefined),
    [progress, selectedLesson],
  );
  const selectedLessonRecoveryTarget = useMemo(() => {
    if (!selectedLessonRecoveryAssignment) {
      return undefined;
    }

    const nextRecoveryLessonId = getNextRecoveryLessonId(selectedLessonRecoveryAssignment);
    return nextRecoveryLessonId ? getLessonById(nextRecoveryLessonId) : undefined;
  }, [selectedLessonRecoveryAssignment]);
  const selectedLessonRecoveryReason = useMemo(
    () => (selectedLessonRecoveryAssignment ? getRecoveryAssignmentReason(selectedLessonRecoveryAssignment) : undefined),
    [selectedLessonRecoveryAssignment],
  );
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

    openCatalog();
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
    incorrectQuestionIds,
  }: {
    score: number;
    total: number;
    continueToNext: boolean;
    incorrectQuestionIds: string[];
  }) => {
    if (!selectedLesson) {
      return;
    }

    // Esta e a transacao principal do app local-first: tentativa -> progresso -> recuperacao/recomendacao.
    const completedAt = new Date().toISOString();
    const currentPercentage = total === 0 ? 0 : Math.round((score / total) * 100);
    const passedCurrentAttempt = currentPercentage >= LESSON_PASS_THRESHOLD;
    const provisionalNextLesson = continueToNext && passedCurrentAttempt
      ? getNextLessonInTopic(selectedLesson.topicId, selectedLesson.id)
      : undefined;
    let nextProgress = buildProgressAfterLessonCompletion({
      progress,
      lesson: selectedLesson,
      score,
      total,
      completedAt,
      nextLessonId: provisionalNextLesson?.id,
    });
    // Passou: encerra recuperacao. Nao passou: cria roteiro de revisao usando questoes erradas.
    nextProgress = passedCurrentAttempt
      ? resolveRecoveryForLesson(nextProgress, selectedLesson.id, completedAt)
      : assignRecoveryForLesson({
          progress: nextProgress,
          lesson: selectedLesson,
          questions: selectedLessonQuestions.questions,
          incorrectQuestionIds,
          attemptedAt: completedAt,
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

  const startSelectedLessonExercises = () => {
    if (!selectedLesson) {
      return;
    }

    if (selectedLessonRecoveryTarget && selectedLessonRecoveryTarget.id !== selectedLesson.id) {
      // Antes de refazer, o aluno e enviado para a primeira revisao pendente.
      selectLesson(selectedLessonRecoveryTarget);
      return;
    }

    if (selectedLessonRecoveryAssignment && !selectedLessonRecoveryTarget) {
      return;
    }

    startExercises();
  };

  return {
    derived: {
      hasNextLesson,
      hasSequentialNextLesson,
      nextRecommendedLesson,
      nextRecommendedTopic,
      selectedLessonQuestionCount,
      selectedLessonRecoveryAssignment,
      selectedLessonRecoveryReason,
      selectedLessonRecoveryTarget,
      selectedLessonQuestions: selectedLessonQuestions.questions,
      selectedLessonQuestionsLoading: selectedLessonQuestions.isLoading,
      suggestedPath,
    },
    actions: {
      completeExercise,
      goToNextLesson,
      resetProgress,
      startSelectedLessonExercises,
      startPath,
      startRecommendedFlow,
      toggleSavedPath,
    },
  };
}
