import { lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { LESSON_PASS_THRESHOLD, getLatestLessonPercentage, getTopicById } from './lib/learning';
import { AppFooter } from './app/AppFooter';
import { AppHeader } from './app/AppHeader';
import { useAppController } from './app/useAppController';
import { HomeView } from './app/views/HomeView';

const Dashboard = lazy(() => import('./components/Dashboard').then((module) => ({ default: module.Dashboard })));
const ExerciseView = lazy(() => import('./components/ExerciseView').then((module) => ({ default: module.ExerciseView })));
const LessonView = lazy(() => import('./components/LessonView').then((module) => ({ default: module.LessonView })));
const ProfileModal = lazy(() => import('./components/ProfileModal').then((module) => ({ default: module.ProfileModal })));
const TutorChat = lazy(() => import('./components/TutorChat').then((module) => ({ default: module.TutorChat })));
const PathView = lazy(() => import('./app/views/PathView').then((module) => ({ default: module.PathView })));
const TopicView = lazy(() => import('./app/views/TopicView').then((module) => ({ default: module.TopicView })));

function AppViewFallback() {
  return (
    <div className="mx-auto max-w-4xl px-6">
      <div className="space-y-4 bg-white p-8 brutal-border">
        <div className="h-6 w-2/3 bg-dark/10 brutal-border" />
        <div className="h-4 w-full bg-dark/10 brutal-border" />
        <div className="h-4 w-11/12 bg-dark/10 brutal-border" />
        <div className="h-4 w-10/12 bg-dark/10 brutal-border" />
      </div>
    </div>
  );
}

export default function App() {
  const { refs, state, derived, actions } = useAppController();

  return (
    <div className="min-h-screen bg-paper">
      <Suspense fallback={null}>
        <ProfileModal
          isOpen={state.isProfileOpen}
          profile={state.profile}
          onClose={actions.closeProfile}
          onSave={actions.saveProfile}
          onLogout={actions.logout}
        />
      </Suspense>

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
                availableBranchFilters={derived.availableBranchFilters}
                branchFilter={state.branchFilter}
                communitySectionRef={refs.communitySectionRef}
                filteredTopics={derived.filteredTopics}
                groupedTopics={derived.groupedTopics}
                levelFilter={state.levelFilter}
                nextRecommendedLesson={derived.nextRecommendedLesson}
                nextRecommendedTopic={derived.nextRecommendedTopic}
                pathsSectionRef={refs.pathsSectionRef}
                profile={state.profile}
                progress={state.progress}
                searchQuery={state.searchQuery}
                searchResults={derived.searchResults}
                statusFilter={state.statusFilter}
                suggestedPath={derived.suggestedPath}
                topicsSectionRef={refs.topicsSectionRef}
                onBranchFilterChange={actions.setBranchFilter}
                onLevelFilterChange={actions.setLevelFilter}
                onOpenDashboard={actions.openDashboard}
                onOpenHomeSection={actions.openHomeSection}
                onPathSelect={actions.selectPath}
                onSearchQueryChange={actions.setSearchQuery}
                onSearchSelection={actions.selectSearchResult}
                onStartPath={actions.startPath}
                onStartRecommendedFlow={actions.startRecommendedFlow}
                onStatusFilterChange={actions.setStatusFilter}
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
              <Suspense fallback={<AppViewFallback />}>
                <PathView
                  path={state.selectedPath}
                  progress={state.progress}
                  onBack={actions.goHome}
                  onLessonSelect={actions.selectLesson}
                  onStartPath={actions.startPath}
                  onToggleSavedPath={actions.toggleSavedPath}
                  onTopicSelect={actions.selectTopic}
                />
              </Suspense>
            </motion.div>
          )}

          {state.view === 'topic' && state.selectedTopic && (
            <motion.div
              key="topic"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Suspense fallback={<AppViewFallback />}>
                <TopicView
                  isFavorite={derived.isSelectedTopicFavorite}
                  lessons={derived.selectedTopicLessons}
                  progress={state.progress}
                  topic={state.selectedTopic}
                  onBack={actions.goHome}
                  onLessonSelect={actions.selectLesson}
                  onToggleFavoriteTopic={actions.toggleFavoriteTopic}
                />
              </Suspense>
            </motion.div>
          )}

          {state.view === 'lesson' && state.selectedLesson && (
            <motion.div key="lesson" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Suspense fallback={<AppViewFallback />}>
                <LessonView
                  lesson={state.selectedLesson}
                  topic={getTopicById(state.selectedLesson.topicId)}
                  questionCount={derived.selectedLessonQuestionCount}
                  bestScore={state.progress.lessonScores[state.selectedLesson.id]}
                  latestScore={getLatestLessonPercentage(state.selectedLesson.id, state.progress) ?? undefined}
                  isCompleted={state.progress.completedLessons.includes(state.selectedLesson.id)}
                  passThreshold={LESSON_PASS_THRESHOLD}
                  onBack={actions.goBackToTopic}
                  onStartExercises={actions.startExercises}
                  onNextLesson={derived.hasNextLesson ? actions.goToNextLesson : undefined}
                />
              </Suspense>
            </motion.div>
          )}

          {state.view === 'exercise' && state.selectedLesson && (
            <motion.div
              key="exercise"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
            >
              <Suspense fallback={<AppViewFallback />}>
                <ExerciseView
                  lessonTitle={state.selectedLesson.title}
                  questions={derived.selectedLessonQuestions}
                  isLoading={derived.selectedLessonQuestionsLoading}
                  canContinue={derived.hasSequentialNextLesson}
                  passThreshold={LESSON_PASS_THRESHOLD}
                  onBack={actions.goBackToLesson}
                  onComplete={actions.completeExercise}
                />
              </Suspense>
            </motion.div>
          )}

          {state.view === 'dashboard' && (
            <motion.div key="dashboard" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <Suspense fallback={<AppViewFallback />}>
                <Dashboard
                  progress={state.progress}
                  profile={state.profile}
                  sessionLabel={derived.session.actorLabel}
                  analyticsSummary={derived.analyticsSummary}
                  onContinue={actions.startRecommendedFlow}
                  onExportSnapshot={actions.exportStorageSnapshot}
                  onImportSnapshot={actions.importStorageSnapshot}
                  onOpenProfile={actions.openProfile}
                  onResetProgress={actions.resetProgress}
                />
              </Suspense>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Suspense fallback={null}>
        <TutorChat
          currentTopic={state.selectedTopic}
          currentLesson={state.selectedLesson}
          currentLessonQuestions={derived.selectedLessonQuestions}
        />
      </Suspense>

      <AppFooter onOpenHomeSection={actions.openHomeSection} onStartRecommendedFlow={actions.startRecommendedFlow} />
    </div>
  );
}
