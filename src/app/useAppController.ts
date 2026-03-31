import { useMemo } from 'react';
import { getPathById } from '../config';
import { appendAnalyticsEvent, buildAnalyticsSummary } from '../lib/analytics';
import { getLessonById, getLessonsByTopic, getTopicById } from '../lib/learning';
import { markRecoveryLessonVisited } from '../lib/recovery';
import { ProductAnalyticsEvent, SearchResult } from '../types';
import { buildStorageSnapshot, createLocalSessionDescriptor, exportSnapshotToBrowser, parseStorageSnapshot } from './storage';
import { useCatalogState } from './catalog/useCatalogState';
import { useAppNavigation } from './navigation/useAppNavigation';
import { useProfileActions } from './profile/useProfileActions';
import { useLearningFlow } from './progress/useLearningFlow';
import { usePersistentAnalyticsEvents } from './usePersistentAnalyticsEvents';
import { usePersistentProfile } from './usePersistentProfile';
import { usePersistentProgress } from './usePersistentProgress';

export function useAppController() {
  const navigation = useAppNavigation();
  const [profile, setProfile] = usePersistentProfile();
  const [progress, setProgress] = usePersistentProgress();
  const [analyticsEvents, setAnalyticsEvents] = usePersistentAnalyticsEvents();
  const catalog = useCatalogState(profile?.favoriteTopics ?? []);
  const trackEvent = (event: Omit<ProductAnalyticsEvent, 'id' | 'occurredAt'> & { occurredAt?: string }) => {
    setAnalyticsEvents((current) => appendAnalyticsEvent(current, event));
  };
  const openLesson = (lesson: Parameters<typeof navigation.actions.selectLesson>[0]) => {
    setProgress((current) => markRecoveryLessonVisited(current, lesson.id, new Date().toISOString()));
    trackEvent({
      type: 'lesson-started',
      lessonId: lesson.id,
      topicId: lesson.topicId,
    });
    navigation.actions.selectLesson(lesson);
  };
  const profileActions = useProfileActions({
    profile,
    setProfile,
    openProfile: navigation.actions.openProfile,
    closeProfile: navigation.actions.closeProfile,
  });
  const learningFlow = useLearningFlow({
    profile,
    progress,
    selectedLesson: navigation.state.selectedLesson,
    setProgress,
    selectLesson: openLesson,
    startExercises: navigation.actions.startExercises,
    trackEvent,
    openHomeSection: navigation.actions.openHomeSection,
    goHome: navigation.actions.goHome,
  });

  const selectedTopicLessons = useMemo(
    () => (navigation.state.selectedTopic ? getLessonsByTopic(navigation.state.selectedTopic.id) : []),
    [navigation.state.selectedTopic],
  );
  const isSelectedTopicFavorite = useMemo(
    () =>
      Boolean(
        navigation.state.selectedTopic && profile?.favoriteTopics.includes(navigation.state.selectedTopic.id),
      ),
    [navigation.state.selectedTopic, profile],
  );
  const session = useMemo(() => createLocalSessionDescriptor(profile), [profile]);
  const analyticsSummary = useMemo(() => buildAnalyticsSummary(analyticsEvents), [analyticsEvents]);

  const selectSearchResult = (result: SearchResult) => {
    catalog.actions.clearSearch();

    if (result.type === 'topic') {
      const topic = getTopicById(result.id);
      if (topic) {
        navigation.actions.selectTopic(topic);
      }
      return;
    }

    if (result.type === 'lesson') {
      const lesson = getLessonById(result.id);
      if (lesson) {
        openLesson(lesson);
      }
      return;
    }

    const path = getPathById(result.id);
    if (path) {
      navigation.actions.selectPath(path);
    }
  };

  const exportStorageSnapshot = () => {
    exportSnapshotToBrowser(
      buildStorageSnapshot({
        profile,
        progress,
      }),
    );
  };

  const importStorageSnapshot = async (file: File) => {
    const confirmed = window.confirm(
      'Restaurar este backup vai substituir o perfil e o progresso salvos neste navegador. Deseja continuar?',
    );
    if (!confirmed) {
      return;
    }

    try {
      const content = await file.text();
      const snapshot = parseStorageSnapshot(content);
      setProfile(snapshot.profile);
      setProgress(snapshot.progress);
      navigation.actions.goHome();
      window.alert('Backup restaurado com sucesso neste navegador.');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Nao foi possivel restaurar o backup selecionado.';
      window.alert(message);
    }
  };

  return {
    refs: navigation.refs,
    state: {
      ...navigation.state,
      ...catalog.state,
      profile,
      progress,
    },
    derived: {
      ...catalog.derived,
      ...learningFlow.derived,
      analyticsSummary,
      isSelectedTopicFavorite,
      session,
      selectedTopicLessons,
    },
    actions: {
      ...navigation.actions,
      ...catalog.actions,
      ...profileActions,
      ...learningFlow.actions,
      exportStorageSnapshot,
      importStorageSnapshot,
      saveProfile: (nextProfile) => {
        profileActions.saveProfile(nextProfile);
        trackEvent({ type: 'profile-configured' });
      },
      selectSearchResult,
      selectLesson: openLesson,
    },
  };
}
