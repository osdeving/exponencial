import { useEffect, useRef, useState } from 'react';
import { getTopicById } from '../../lib/learning';
import { Lesson, LearningPath, Topic } from '../../types';
import { HomeSection, ViewState } from '../types';

function scrollViewportToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export function useAppNavigation() {
  const [view, setView] = useState<ViewState>('home');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [pendingHomeSection, setPendingHomeSection] = useState<HomeSection | null>(null);

  const pathsSectionRef = useRef<HTMLDivElement>(null);
  const topicsSectionRef = useRef<HTMLDivElement>(null);
  const communitySectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (view !== 'home' || !pendingHomeSection) {
      return;
    }

    const sectionMap = {
      paths: pathsSectionRef,
      topics: topicsSectionRef,
      community: communitySectionRef,
    } as const;

    requestAnimationFrame(() => {
      sectionMap[pendingHomeSection].current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setPendingHomeSection(null);
    });
  }, [pendingHomeSection, view]);

  useEffect(() => {
    if (view === 'home' && pendingHomeSection) {
      return;
    }

    requestAnimationFrame(() => {
      scrollViewportToTop();
    });
  }, [pendingHomeSection, selectedLesson?.id, selectedPath?.id, selectedTopic?.id, view]);

  const resetSelections = () => {
    setSelectedTopic(null);
    setSelectedLesson(null);
    setSelectedPath(null);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const goHome = () => {
    resetSelections();
    setPendingHomeSection(null);
    setView('home');
    closeMobileMenu();
  };

  const openDashboard = () => {
    resetSelections();
    setView('dashboard');
    closeMobileMenu();
  };

  const openProfile = () => {
    setIsProfileOpen(true);
    closeMobileMenu();
  };

  const closeProfile = () => {
    setIsProfileOpen(false);
  };

  const openHomeSection = (section: HomeSection) => {
    resetSelections();
    setView('home');
    setPendingHomeSection(section);
    closeMobileMenu();
  };

  const selectTopic = (topic: Topic) => {
    setSelectedTopic(topic);
    setSelectedLesson(null);
    setSelectedPath(null);
    setView('topic');
    closeMobileMenu();
  };

  const selectLesson = (lesson: Lesson) => {
    const topic = getTopicById(lesson.topicId);
    if (topic) {
      setSelectedTopic(topic);
    }

    setSelectedLesson(lesson);
    setSelectedPath(null);
    setView('lesson');
    closeMobileMenu();
  };

  const selectPath = (path: LearningPath) => {
    setSelectedPath(path);
    setSelectedTopic(null);
    setSelectedLesson(null);
    setView('path');
    closeMobileMenu();
  };

  const goBackToTopic = () => {
    setSelectedLesson(null);
    setView('topic');
  };

  const goBackToLesson = () => {
    setView('lesson');
  };

  const startExercises = () => {
    setView('exercise');
  };

  return {
    refs: {
      communitySectionRef,
      pathsSectionRef,
      topicsSectionRef,
    },
    state: {
      isMobileMenuOpen,
      isProfileOpen,
      selectedLesson,
      selectedPath,
      selectedTopic,
      view,
    },
    actions: {
      closeMobileMenu,
      closeProfile,
      goBackToLesson,
      goBackToTopic,
      goHome,
      openDashboard,
      openHomeSection,
      openProfile,
      selectLesson,
      selectPath,
      selectTopic,
      startExercises,
      toggleMobileMenu: () => setIsMobileMenuOpen((current) => !current),
    },
  };
}
