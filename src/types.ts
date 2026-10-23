export type TopicId =
  | 'cloud-concepts'
  | 'architecture-services'
  | 'management-governance'
  | 'security-identity';

export type PageId =
  | 'dashboard'
  | 'quiz'
  | 'explain'
  | 'flashcards'
  | 'progress';

export interface Topic {
  id: TopicId;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  color: string;
}

export interface QuizQuestion {
  id: string;
  topicId: TopicId;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  realLifeExample?: string;
}

export interface ConceptEntry {
  id: string;
  term: string;
  plainEnglish: string;
  realLifeExample: string;
  technicalDefinition: string;
  topicId: TopicId;
}

export interface Flashcard {
  id: string;
  topicId: TopicId;
  front: string;
  back: string;
}

export interface TopicStats {
  correct: number;
  incorrect: number;
  attempted: number;
}

export interface FlashcardSessionStats {
  knowIt: string[];
  reviewAgain: string[];
}

export interface ProgressState {
  quiz: {
    [questionId: string]: {
      correct: boolean;
      topicId: TopicId;
      timestamp: number;
    };
  };
  flashcards: {
    knowIt: string[];
    reviewAgain: string[];
  };
  dailyGoal: number;
  lastVisited: PageId | null;
}
