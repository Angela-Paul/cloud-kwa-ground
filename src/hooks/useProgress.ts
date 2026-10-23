import { useCallback, useEffect, useState } from 'react';
import type { ProgressState, TopicId, PageId } from '@/types';

const STORAGE_KEY = 'cloud-kwa-ground-progress';

const DEFAULT_STATE: ProgressState = {
  quiz: {},
  flashcards: {
    knowIt: [],
    reviewAgain: [],
  },
  dailyGoal: 10,
  lastVisited: null,
};

function loadState(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as ProgressState;
    return {
      ...DEFAULT_STATE,
      ...parsed,
      flashcards: {
        ...DEFAULT_STATE.flashcards,
        ...parsed.flashcards,
      },
      quiz: parsed.quiz ?? {},
    };
  } catch {
    return DEFAULT_STATE;
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(loadState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // ignore quota errors
    }
  }, [progress]);

  const recordQuizAnswer = useCallback(
    (questionId: string, correct: boolean, topicId: TopicId) => {
      setProgress((prev) => ({
        ...prev,
        quiz: {
          ...prev.quiz,
          [questionId]: { correct, topicId, timestamp: Date.now() },
        },
      }));
    },
    [],
  );

  const markFlashcard = useCallback((cardId: string, knowIt: boolean) => {
    setProgress((prev) => {
      const knowItArr = prev.flashcards.knowIt.filter((id) => id !== cardId);
      const reviewArr = prev.flashcards.reviewAgain.filter((id) => id !== cardId);
      if (knowIt) {
        knowItArr.push(cardId);
      } else {
        reviewArr.push(cardId);
      }
      return {
        ...prev,
        flashcards: { knowIt: knowItArr, reviewAgain: reviewArr },
      };
    });
  }, []);

  const setLastVisited = useCallback((page: PageId) => {
    setProgress((prev) => ({ ...prev, lastVisited: page }));
  }, []);

  const setDailyGoal = useCallback((goal: number) => {
    const clamped = Math.max(1, Math.min(100, Math.round(goal)));
    setProgress((prev) => ({ ...prev, dailyGoal: clamped }));
  }, []);

  return {
    progress,
    recordQuizAnswer,
    markFlashcard,
    setLastVisited,
    setDailyGoal,
  };
}
