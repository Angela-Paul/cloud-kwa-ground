import { useMemo, useState, useCallback } from 'react';
import { Brain, Check, X, RotateCcw, ArrowRight, Trophy, Lightbulb, MapPin } from 'lucide-react';
import type { ProgressState, TopicId } from '@/types';
import { QUIZ_QUESTIONS } from '@/data/questions';
import { TOPIC_MAP } from '@/data/topics';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';

interface QuizPageProps {
  progress: ProgressState;
  recordQuizAnswer: (questionId: string, correct: boolean, topicId: TopicId) => void;
}

export function SmartQuiz({ progress, recordQuizAnswer }: QuizPageProps) {
  const [filterTopic, setFilterTopic] = useState<TopicId | 'all'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [retryMode, setRetryMode] = useState(false);
  const [sessionScore, setSessionScore] = useState(0);
  const [sessionAnswered, setSessionAnswered] = useState(0);

  const filteredQuestions = useMemo(() => {
    if (filterTopic === 'all') return QUIZ_QUESTIONS;
    return QUIZ_QUESTIONS.filter((q) => q.topicId === filterTopic);
  }, [filterTopic]);

  // Build retry list: questions that have been answered incorrectly
  const retryQuestions = useMemo(() => {
    return QUIZ_QUESTIONS.filter((q) => {
      const record = progress.quiz[q.id];
      return record && !record.correct;
    });
  }, [progress.quiz]);

  const activeQuestions = retryMode ? retryQuestions : filteredQuestions;

  const currentQuestion = activeQuestions[currentIndex];

  const handleSelectOption = useCallback(
    (index: number) => {
      if (hasAnswered || !currentQuestion) return;
      setSelectedOption(index);
      setHasAnswered(true);
      const isCorrect = index === currentQuestion.correctIndex;
      recordQuizAnswer(currentQuestion.id, isCorrect, currentQuestion.topicId);
      setSessionAnswered((s) => s + 1);
      if (isCorrect) setSessionScore((s) => s + 1);
    },
    [hasAnswered, currentQuestion, recordQuizAnswer],
  );

  const handleNext = useCallback(() => {
    if (currentIndex + 1 >= activeQuestions.length) {
      setQuizFinished(true);
      return;
    }
    setCurrentIndex((i) => i + 1);
    setSelectedOption(null);
    setHasAnswered(false);
  }, [currentIndex, activeQuestions.length]);

  const startQuiz = (topic: TopicId | 'all') => {
    setFilterTopic(topic);
    setRetryMode(false);
    setCurrentIndex(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setQuizFinished(false);
    setSessionScore(0);
    setSessionAnswered(0);
  };

  const startRetry = () => {
    setRetryMode(true);
    setCurrentIndex(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setQuizFinished(false);
    setSessionScore(0);
    setSessionAnswered(0);
  };

  const resetQuiz = () => {
    setRetryMode(false);
    setCurrentIndex(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setQuizFinished(false);
    setSessionScore(0);
    setSessionAnswered(0);
  };

  // ── Topic selection screen ──
  if (!retryMode && !quizFinished && currentIndex === 0 && filterTopic === 'all' && !hasAnswered) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet/15 flex items-center justify-center">
            <Brain className="w-5 h-5 text-violet-light" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Smart Quiz</h1>
            <p className="text-sm text-navy-400">Test your knowledge with original practice questions</p>
          </div>
        </div>

        {retryQuestions.length > 0 && (
          <Card hover onClick={startRetry}>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/15 flex items-center justify-center">
                  <RotateCcw className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-medium text-white text-sm">Retry Incorrect Questions</h3>
                  <p className="text-xs text-navy-400">
                    You have {retryQuestions.length} question{retryQuestions.length !== 1 ? 's' : ''} to review
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-navy-400" />
            </div>
          </Card>
        )}

        <div>
          <h2 className="text-sm font-medium text-navy-200 mb-3">Choose a study area</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Card hover onClick={() => startQuiz('all')}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet to-cyan flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-white text-sm">All Topics</h3>
                  <p className="text-xs text-navy-400">{QUIZ_QUESTIONS.length} questions</p>
                </div>
              </div>
            </Card>
            {Object.values(TOPIC_MAP).map((topic) => {
              const count = QUIZ_QUESTIONS.filter((q) => q.topicId === topic.id).length;
              return (
                <Card key={topic.id} hover onClick={() => startQuiz(topic.id)}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${topic.color === 'violet' ? 'bg-violet/15' : 'bg-cyan/15'}`}>
                      <Brain className={`w-5 h-5 ${topic.color === 'violet' ? 'text-violet-light' : 'text-cyan-light'}`} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-medium text-white text-sm">{topic.name}</h3>
                      <p className="text-xs text-navy-400">{count} questions</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ── Empty state: no retry questions available ──
  if (retryMode && retryQuestions.length === 0) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center">
            <Check className="w-5 h-5 text-emerald-300" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">All Caught Up!</h1>
            <p className="text-sm text-navy-400">You have no incorrect questions to retry.</p>
          </div>
        </div>
        <Card>
          <div className="text-center py-8">
            <Trophy className="w-12 h-12 text-emerald-300 mx-auto mb-3" />
            <p className="text-white font-medium">Great work! You have answered all questions correctly.</p>
            <p className="text-sm text-navy-400 mt-1">Try the flashcards or explore Explain It Simply to keep learning.</p>
            <button onClick={resetQuiz} className="btn-primary mt-6">
              Back to Quiz Home
            </button>
          </div>
        </Card>
      </div>
    );
  }

  // ── Quiz finished screen ──
  if (quizFinished) {
    const sessionAccuracy = sessionAnswered > 0 ? Math.round((sessionScore / sessionAnswered) * 100) : 0;
    return (
      <div className="space-y-6 animate-fade-in">
        <Card>
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet to-cyan flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Quiz Complete!</h1>
            <p className="text-sm text-navy-400 mt-1">
              {retryMode ? 'Retry session finished' : `You answered ${activeQuestions.length} questions`}
            </p>
            <div className="mt-6 flex justify-center gap-8">
              <div className="text-center">
                <p className="text-3xl font-bold gradient-text">{sessionScore}/{sessionAnswered}</p>
                <p className="text-xs text-navy-400 mt-1">Score</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold gradient-text">{sessionAccuracy}%</p>
                <p className="text-xs text-navy-400 mt-1">Accuracy</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button onClick={resetQuiz} className="btn-secondary">Back to Quiz Home</button>
              {retryQuestions.length > 0 && (
                <button onClick={startRetry} className="btn-primary inline-flex items-center gap-2">
                  <RotateCcw className="w-4 h-4" /> Retry Incorrect
                </button>
              )}
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // ── Active question screen ──
  if (!currentQuestion) {
    return (
      <Card>
        <div className="text-center py-8">
          <p className="text-white font-medium">No questions available for this selection.</p>
          <button onClick={resetQuiz} className="btn-primary mt-4">Back to Quiz Home</button>
        </div>
      </Card>
    );
  }

  const topic = TOPIC_MAP[currentQuestion.topicId];
  const isCorrect = selectedOption === currentQuestion.correctIndex;

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
      {/* Progress header */}
      <div>
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Badge variant={topic.color === 'violet' ? 'violet' : 'cyan'}>{topic.shortName}</Badge>
            {retryMode && <Badge variant="warning"><RotateCcw className="w-3 h-3" /> Retry</Badge>}
          </div>
          <span className="text-sm text-navy-300">
            Question {currentIndex + 1} of {activeQuestions.length}
          </span>
        </div>
        <ProgressBar
          value={currentIndex + (hasAnswered ? 1 : 0)}
          max={activeQuestions.length}
          height="h-1.5"
        />
      </div>

      {/* Question card */}
      <Card>
        <p className="text-base md:text-lg font-medium text-white leading-relaxed">
          {currentQuestion.question}
        </p>

        <div className="mt-6 space-y-3">
          {currentQuestion.options.map((option, index) => {
            let style = 'border-navy-700 bg-navy-800/40 hover:border-violet/40 hover:bg-navy-800';
            let icon = null;

            if (hasAnswered) {
              if (index === currentQuestion.correctIndex) {
                style = 'border-emerald-500/50 bg-emerald-500/10';
                icon = <Check className="w-5 h-5 text-emerald-300" />;
              } else if (index === selectedOption) {
                style = 'border-rose-500/50 bg-rose-500/10';
                icon = <X className="w-5 h-5 text-rose-300" />;
              } else {
                style = 'border-navy-700/50 bg-navy-800/20 opacity-50';
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleSelectOption(index)}
                disabled={hasAnswered}
                className={`
                  w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl
                  border text-sm text-left transition-all duration-200
                  ${style}
                  ${!hasAnswered ? 'cursor-pointer' : 'cursor-default'}
                `}
              >
                <span className="text-navy-100">{option}</span>
                {icon}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {hasAnswered && (
          <div className="mt-6 space-y-4 animate-scale-in">
            <div className={`flex items-start gap-3 p-4 rounded-xl border ${isCorrect ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-rose-500/30 bg-rose-500/5'}`}>
              {isCorrect ? (
                <Check className="w-5 h-5 text-emerald-300 flex-shrink-0 mt-0.5" />
              ) : (
                <X className="w-5 h-5 text-rose-300 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <p className={`font-medium text-sm ${isCorrect ? 'text-emerald-300' : 'text-rose-300'}`}>
                  {isCorrect ? 'Correct!' : 'Not quite right.'}
                </p>
                <p className="text-sm text-navy-200 mt-1 leading-relaxed">{currentQuestion.explanation}</p>
              </div>
            </div>

            {currentQuestion.realLifeExample && (
              <div className="flex items-start gap-3 p-4 rounded-xl border border-violet/20 bg-violet/5">
                <Lightbulb className="w-5 h-5 text-violet-light flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-violet-light mb-1">Real-life example</p>
                  <p className="text-sm text-navy-200 leading-relaxed">{currentQuestion.realLifeExample}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 text-xs text-navy-400">
              <MapPin className="w-3 h-3" />
              Topic: {topic.name}
            </div>

            <button onClick={handleNext} className="btn-primary w-full inline-flex items-center justify-center gap-2">
              {currentIndex + 1 >= activeQuestions.length ? 'Finish Quiz' : 'Next Question'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </Card>

      {/* Session score */}
      {sessionAnswered > 0 && (
        <div className="flex justify-center gap-4">
          <Badge variant="violet">Session: {sessionScore}/{sessionAnswered}</Badge>
          <Badge variant="cyan">{sessionAnswered > 0 ? Math.round((sessionScore / sessionAnswered) * 100) : 0}% accuracy</Badge>
        </div>
      )}
    </div>
  );
}
