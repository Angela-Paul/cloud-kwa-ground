import { BarChart3, TrendingUp, Check, X, Target, ArrowRight, AlertTriangle, Sparkles, BookOpen, Layers, RotateCcw } from 'lucide-react';
import type { PageId, ProgressState } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import {
  aggregateByTopic,
  totalAnswered,
  totalCorrect,
  overallAccuracy,
  getWeakestTopic,
  getRecommendedActivity,
  isExamReady,
  totalQuizQuestions,
} from '@/utils/progress';

interface ProgressPageProps {
  progress: ProgressState;
  onNavigate: (page: PageId) => void;
}

export function MyProgress({ progress, onNavigate }: ProgressPageProps) {
  const aggregates = aggregateByTopic(progress);
  const answered = totalAnswered(progress);
  const correct = totalCorrect(progress);
  const accuracy = overallAccuracy(progress);
  const weakest = getWeakestTopic(progress);
  const recommendation = getRecommendedActivity(progress);
  const examReady = isExamReady(progress);
  const totalQs = totalQuizQuestions();
  const flashcardKnowCount = progress.flashcards.knowIt.length;
  const flashcardReviewCount = progress.flashcards.reviewAgain.length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-violet/15 flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-violet-light" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">My Progress</h1>
          <p className="text-sm text-navy-400">Track your performance and see where to focus next</p>
        </div>
      </div>

      {/* Overview cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan/15 flex items-center justify-center flex-shrink-0">
              <Target className="w-5 h-5 text-cyan-light" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-navy-400">Questions Answered</p>
              <p className="text-lg font-semibold text-white">{answered}/{totalQs}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/15 flex items-center justify-center flex-shrink-0">
              <Check className="w-5 h-5 text-emerald-300" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-navy-400">Correct</p>
              <p className="text-lg font-semibold text-white">{correct}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-rose-500/15 flex items-center justify-center flex-shrink-0">
              <X className="w-5 h-5 text-rose-300" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-navy-400">Incorrect</p>
              <p className="text-lg font-semibold text-white">{answered - correct}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-violet/15 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-violet-light" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-navy-400">Overall Accuracy</p>
              <p className="text-lg font-semibold text-white">{accuracy}%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Topic breakdown */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Performance by Topic</h2>
        <div className="space-y-3">
          {aggregates.map((agg) => {
            const accuracyColor =
              agg.attempted === 0
                ? 'from-navy-600 to-navy-500'
                : agg.accuracy >= 70
                  ? 'from-emerald-500 to-emerald-400'
                  : agg.accuracy >= 50
                    ? 'from-amber-500 to-amber-400'
                    : 'from-rose-500 to-rose-400';

            return (
              <Card key={agg.topicId}>
                <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                  <h3 className="font-medium text-white text-sm">{agg.topicName}</h3>
                  <div className="flex items-center gap-2">
                    {agg.attempted > 0 ? (
                      <>
                        <Badge variant={agg.accuracy >= 70 ? 'success' : agg.accuracy >= 50 ? 'warning' : 'error'}>
                          {agg.accuracy}% accuracy
                        </Badge>
                        <span className="text-xs text-navy-400">{agg.correct}/{agg.attempted} correct</span>
                      </>
                    ) : (
                      <Badge variant="neutral">Not attempted</Badge>
                    )}
                  </div>
                </div>
                <ProgressBar
                  value={agg.accuracy}
                  max={100}
                  colorClass={accuracyColor}
                  height="h-2"
                />
              </Card>
            );
          })}
        </div>
      </div>

      {/* Weakest topic */}
      {weakest && (
        <Card>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/15 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-medium text-white text-sm">Weakest Topic</h3>
              <p className="text-sm text-navy-300 mt-1">
                <span className="text-amber-300 font-medium">{weakest.topicName}</span> — {weakest.accuracy}% accuracy ({weakest.correct}/{weakest.attempted} correct)
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Flashcard stats */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/15 flex items-center justify-center flex-shrink-0">
              <Layers className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <p className="text-xs text-navy-400">Flashcards: Know It</p>
              <p className="text-lg font-semibold text-white">{flashcardKnowCount}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/15 flex items-center justify-center flex-shrink-0">
              <RotateCcw className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <p className="text-xs text-navy-400">Flashcards: Review Again</p>
              <p className="text-lg font-semibold text-white">{flashcardReviewCount}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recommendation */}
      <Card>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet to-cyan flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-white text-sm mb-1">Recommended Next Step</h3>
            <p className="text-sm text-navy-300 leading-relaxed">{recommendation}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {answered < totalQs && (
                <button onClick={() => onNavigate('quiz')} className="btn-primary text-sm inline-flex items-center gap-2">
                  <Target className="w-4 h-4" /> Continue Quiz
                </button>
              )}
              <button onClick={() => onNavigate('explain')} className="btn-secondary text-sm inline-flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Review Concepts
              </button>
              <button onClick={() => onNavigate('flashcards')} className="btn-secondary text-sm inline-flex items-center gap-2">
                <Layers className="w-4 h-4" /> Flashcards
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Readiness notice */}
      <Card>
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${examReady ? 'bg-emerald-500/15' : 'bg-navy-700/50'}`}>
            {examReady ? (
              <Check className="w-5 h-5 text-emerald-300" />
            ) : (
              <Target className="w-5 h-5 text-navy-400" />
            )}
          </div>
          <div>
            <h3 className="font-medium text-white text-sm">
              {examReady ? 'You are performing well!' : 'Keep practising'}
            </h3>
            <p className="text-sm text-navy-300 mt-1 leading-relaxed">
              {examReady
                ? `You have answered ${answered} questions with ${accuracy}% accuracy. This is a good sign — keep up the consistent practice and you will be well prepared.`
                : `You have answered ${answered} out of ${totalQs} available questions. We recommend answering at least 10 questions with 80% or higher accuracy before feeling confident about the exam.`}
            </p>
            {!examReady && (
              <button onClick={() => onNavigate('quiz')} className="mt-3 text-sm text-violet-light hover:text-violet inline-flex items-center gap-1 transition-colors">
                Practice more <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </Card>

      {/* Disclaimer */}
      <p className="text-center text-xs text-navy-500 pb-2">
        Independent learning project. Not affiliated with or endorsed by Microsoft.
      </p>
    </div>
  );
}


