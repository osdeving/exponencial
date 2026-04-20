import { useEffect, useRef, useState } from 'react';
import { getTopicById } from '../../lib/learning';
import { Lesson, LearningPath, Topic } from '../../types';
import { HomeSection, ViewState } from '../types';

// Mantem compatibilidade entre navegadores ao forcar o topo apos troca de tela.
function scrollViewportToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export function useAppNavigation() {
  // Este hook substitui um roteador: view + selecoes dizem qual tela o App renderiza.
  const [view, setView] = useState<ViewState>('home');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [pendingHomeSection, setPendingHomeSection] = useState<HomeSection | null>(null);

  const communitySectionRef = useRef<HTMLDivElement>(null);
  const didHandleHomeSectionScrollRef = useRef(false);

  // Quando o usuario pede uma secao da Home, espera a Home renderizar e entao rola ate ela.
  useEffect(() => {
    if (view !== 'home' || !pendingHomeSection) {
      return;
    }

    const sectionMap = {
      community: communitySectionRef,
    } as const;

    const animationFrame = requestAnimationFrame(() => {
      sectionMap[pendingHomeSection].current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      didHandleHomeSectionScrollRef.current = true;
      setPendingHomeSection(null);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [pendingHomeSection, view]);

  // Trocas entre telas principais devem comecar no topo, exceto scroll intencional da Home.
  useEffect(() => {
    if (view === 'home' && pendingHomeSection) {
      return;
    }

    if (didHandleHomeSectionScrollRef.current) {
      didHandleHomeSectionScrollRef.current = false;
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

  const openCatalog = () => {
    resetSelections();
    setPendingHomeSection(null);
    setView('catalog');
    closeMobileMenu();
  };

  const openPaths = () => {
    resetSelections();
    setPendingHomeSection(null);
    setView('paths');
    closeMobileMenu();
  };

  const openRoadmap = () => {
    resetSelections();
    setPendingHomeSection(null);
    setView('roadmap');
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
    // Selecionar licao tambem preserva o topico pai para voltar e alimentar o tutor.
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
      openCatalog,
      openDashboard,
      openHomeSection,
      openPaths,
      openProfile,
      openRoadmap,
      selectLesson,
      selectPath,
      selectTopic,
      startExercises,
      toggleMobileMenu: () => setIsMobileMenuOpen((current) => !current),
    },
  };
}
