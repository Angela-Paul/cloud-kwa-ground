import { useCallback, useState } from 'react';
import type { PageId } from '@/types';
import { useProgress } from '@/hooks/useProgress';
import { Navigation } from '@/components/Navigation';
import { Dashboard } from '@/pages/Dashboard';
import { SmartQuiz } from '@/pages/SmartQuiz';
import { ExplainItSimply } from '@/pages/ExplainItSimply';
import { Flashcards } from '@/pages/Flashcards';
import { MyProgress } from '@/pages/MyProgress';

function App() {
  const { progress, recordQuizAnswer, markFlashcard, setLastVisited, setDailyGoal } = useProgress();
  const [currentPage, setCurrentPage] = useState<PageId>('dashboard');

  const handleNavigate = useCallback(
    (page: PageId) => {
      setCurrentPage(page);
      setLastVisited(page);
      window.scrollTo(0, 0);
    },
    [setLastVisited],
  );

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard progress={progress} onNavigate={handleNavigate} setDailyGoal={setDailyGoal} />;
      case 'quiz':
        return <SmartQuiz progress={progress} recordQuizAnswer={recordQuizAnswer} />;
      case 'explain':
        return <ExplainItSimply onNavigate={handleNavigate} />;
      case 'flashcards':
        return (
          <Flashcards
            knowIt={progress.flashcards.knowIt}
            reviewAgain={progress.flashcards.reviewAgain}
            markFlashcard={markFlashcard}
          />
        );
      case 'progress':
        return <MyProgress progress={progress} onNavigate={handleNavigate} />;
      default:
        return <Dashboard progress={progress} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-navy-950">
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="md:ml-64 pt-16 md:pt-8 pb-24 md:pb-8 px-4 md:px-8 max-w-5xl mx-auto">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
