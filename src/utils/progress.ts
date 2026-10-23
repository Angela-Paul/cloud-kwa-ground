import type { ProgressState, TopicId } from '@/types';
import { QUIZ_QUESTIONS } from '@/data/questions';
import { TOPICS } from '@/data/topics';

export interface TopicAgg {
  topicId: TopicId;
  topicName: string;
  correct: number;
  incorrect: number;
  attempted: number;
  accuracy: number;
}

export function aggregateByTopic(progress: ProgressState): TopicAgg[] {
  return TOPICS.map((topic) => {
    const entries = Object.entries(progress.quiz).filter(
      ([, v]) => v.topicId === topic.id,
    );
    const correct = entries.filter(([, v]) => v.correct).length;
    const incorrect = entries.filter(([, v]) => !v.correct).length;
    const attempted = entries.length;
    const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
    return {
      topicId: topic.id,
      topicName: topic.name,
      correct,
      incorrect,
      attempted,
      accuracy,
    };
  });
}

export function totalAnswered(progress: ProgressState): number {
  return Object.keys(progress.quiz).length;
}

export function totalCorrect(progress: ProgressState): number {
  return Object.values(progress.quiz).filter((v) => v.correct).length;
}

export function overallAccuracy(progress: ProgressState): number {
  const total = totalAnswered(progress);
  if (total === 0) return 0;
  return Math.round((totalCorrect(progress) / total) * 100);
}

export function getWeakestTopic(progress: ProgressState): TopicAgg | null {
  const aggregates = aggregateByTopic(progress);
  const attemptedTopics = aggregates.filter((a) => a.attempted >= 3);
  if (attemptedTopics.length === 0) return null;
  return attemptedTopics.reduce((worst, current) => {
    if (current.attempted >= 3 && current.accuracy < worst.accuracy) {
      return current;
    }
    return worst;
  });
}

export function getRecommendedActivity(progress: ProgressState): string {
  const weakest = getWeakestTopic(progress);
  const totalAnsweredCount = totalAnswered(progress);

  if (totalAnsweredCount === 0) {
    return 'Start with the Smart Quiz to begin tracking your progress and identify your strong and weak areas.';
  }

  if (totalAnsweredCount < 5) {
    return 'You are just getting started. Try answering a few more quiz questions and review some flashcards to build a baseline. Once you have answered at least 3 questions in a topic, we can identify your weak areas.';
  }

  if (weakest) {
    if (weakest.accuracy < 50) {
      return `Your weakest area is "${weakest.topicName}" (${weakest.accuracy}% accuracy based on ${weakest.attempted} attempts). We recommend reviewing the "Explain It Simply" concepts for this topic, then retrying the quiz questions.`;
    }
    return `You are doing well overall, but "${weakest.topicName}" could use a boost (${weakest.accuracy}% accuracy based on ${weakest.attempted} attempts). Try the flashcards for this topic to reinforce your understanding.`;
  }

  if (totalAnsweredCount >= 5) {
    return 'Great work — you are performing well across all topics you have practised. Keep going with flashcards and try answering more quiz questions to cover every topic.';
  }

  return 'Keep practising — answer at least 3 questions in each topic so we can identify your strengths and weak spots.';
}

export function isExamReady(progress: ProgressState): boolean {
  const total = totalAnswered(progress);
  if (total < 10) return false;
  const accuracy = overallAccuracy(progress);
  return accuracy >= 80;
}

export function questionsAnsweredToday(progress: ProgressState): number {
  const today = new Date();
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  return Object.values(progress.quiz).filter((v) => v.timestamp >= startOfDay).length;
}

export function totalQuizQuestions(): number {
  return QUIZ_QUESTIONS.length;
}
