import { useMemo } from 'react';
import { getPathById } from '../config';
import { getLessonById, getLessonsByTopic, getTopicById } from '../lib/learning';
import { SearchResult } from '../types';
import { useCatalogState } from './catalog/useCatalogState';
import { useAppNavigation } from './navigation/useAppNavigation';
import { useProfileActions } from './profile/useProfileActions';
import { useLearningFlow } from './progress/useLearningFlow';
import { usePersistentProfile } from './usePersistentProfile';
import { usePersistentProgress } from './usePersistentProgress';

export function useAppController() {
  const navigation = useAppNavigation();
  const [profile, setProfile] = usePersistentProfile();
  const [progress, setProgress] = usePersistentProgress();
  const catalog = useCatalogState(profile?.favoriteTopics ?? []);
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
    selectLesson: navigation.actions.selectLesson,
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
        navigation.actions.selectLesson(lesson);
      }
      return;
    }

    const path = getPathById(result.id);
    if (path) {
      navigation.actions.selectPath(path);
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
      isSelectedTopicFavorite,
      selectedTopicLessons,
    },
    actions: {
      ...navigation.actions,
      ...catalog.actions,
      ...profileActions,
      ...learningFlow.actions,
      selectSearchResult,
    },
  };
}
