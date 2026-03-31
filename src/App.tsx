import { AnimatePresence, motion } from 'motion/react';
import { Dashboard } from './components/Dashboard';
import { ExerciseView } from './components/ExerciseView';
import { LessonView } from './components/LessonView';
import { ProfileModal } from './components/ProfileModal';
import { TutorChat } from './components/TutorChat';
import { getTopicById } from './lib/learning';
import { AppFooter } from './app/AppFooter';
import { AppHeader } from './app/AppHeader';
import { useAppController } from './app/useAppController';
import { HomeView } from './app/views/HomeView';
import { PathView } from './app/views/PathView';
import { TopicView } from './app/views/TopicView';

export default function App() {
  const { refs, state, derived, actions } = useAppController();

  return (
    <div className="min-h-screen bg-paper">
      <ProfileModal
        isOpen={state.isProfileOpen}
        profile={state.profile}
        onClose={actions.closeProfile}
        onSave={actions.saveProfile}
        onLogout={actions.logout}
      />

      <AppHeader
        isMobileMenuOpen={state.isMobileMenuOpen}
        points={state.progress.points}
        profileName={state.profile?.name}
        view={state.view}
        onGoHome={actions.goHome}
        onOpenDashboard={actions.openDashboard}
        onOpenHomeSection={actions.openHomeSection}
        onOpenProfile={actions.openProfile}
        onToggleMobileMenu={actions.toggleMobileMenu}
      />

      <main className="py-12">
        <AnimatePresence mode="wait">
          {state.view === 'home' && (
            <motion.div key="home" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <HomeView
                communitySectionRef={refs.communitySectionRef}
                filteredTopics={derived.filteredTopics}
                levelFilter={state.levelFilter}
                nextRecommendedLesson={derived.nextRecommendedLesson}
                nextRecommendedTopic={derived.nextRecommendedTopic}
                pathsSectionRef={refs.pathsSectionRef}
                profile={state.profile}
                progress={state.progress}
                searchQuery={state.searchQuery}
                searchResults={derived.searchResults}
                suggestedPath={derived.suggestedPath}
                topicsSectionRef={refs.topicsSectionRef}
                onLevelFilterChange={actions.setLevelFilter}
                onOpenDashboard={actions.openDashboard}
                onOpenHomeSection={actions.openHomeSection}
                onPathSelect={actions.selectPath}
                onSearchQueryChange={actions.setSearchQuery}
                onSearchSelection={actions.selectSearchResult}
                onStartPath={actions.startPath}
                onStartRecommendedFlow={actions.startRecommendedFlow}
                onTopicSelect={actions.selectTopic}
              />
            </motion.div>
          )}

          {state.view === 'path' && state.selectedPath && (
            <motion.div
              key="path"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <PathView
                path={state.selectedPath}
                progress={state.progress}
                onBack={actions.goHome}
                onLessonSelect={actions.selectLesson}
                onStartPath={actions.startPath}
                onToggleSavedPath={actions.toggleSavedPath}
                onTopicSelect={actions.selectTopic}
              />
            </motion.div>
          )}

          {state.view === 'topic' && state.selectedTopic && (
            <motion.div
              key="topic"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <TopicView
                isFavorite={derived.isSelectedTopicFavorite}
                lessons={derived.selectedTopicLessons}
                progress={state.progress}
                topic={state.selectedTopic}
                onBack={actions.goHome}
                onLessonSelect={actions.selectLesson}
                onToggleFavoriteTopic={actions.toggleFavoriteTopic}
              />
            </motion.div>
          )}

          {state.view === 'lesson' && state.selectedLesson && (
            <motion.div key="lesson" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <LessonView
                lesson={state.selectedLesson}
                topic={getTopicById(state.selectedLesson.topicId)}
                questionCount={derived.selectedLessonQuestions.length}
                bestScore={state.progress.lessonScores[state.selectedLesson.id]}
                isCompleted={state.progress.completedLessons.includes(state.selectedLesson.id)}
                onBack={actions.goBackToTopic}
                onStartExercises={actions.startExercises}
                onNextLesson={derived.hasNextLesson ? actions.goToNextLesson : undefined}
              />
            </motion.div>
          )}

          {state.view === 'exercise' && state.selectedLesson && (
            <motion.div
              key="exercise"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
            >
              <ExerciseView
                lessonTitle={state.selectedLesson.title}
                questions={derived.selectedLessonQuestions}
                canContinue={derived.hasNextLesson}
                onBack={actions.goBackToLesson}
                onComplete={actions.completeExercise}
              />
            </motion.div>
          )}

          {state.view === 'dashboard' && (
            <motion.div key="dashboard" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <Dashboard
                progress={state.progress}
                profile={state.profile}
                onContinue={actions.startRecommendedFlow}
                onOpenProfile={actions.openProfile}
                onResetProgress={actions.resetProgress}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <TutorChat currentTopic={state.selectedTopic} currentLesson={state.selectedLesson} />

      <AppFooter onOpenHomeSection={actions.openHomeSection} onStartRecommendedFlow={actions.startRecommendedFlow} />
    </div>
  );
}
