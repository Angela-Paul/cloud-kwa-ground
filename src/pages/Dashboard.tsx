import { Cloud, Server, Settings, Shield, ArrowRight, Target, Trophy, TrendingUp, AlertCircle, BookOpen, Pencil, Check } from 'lucide-react';
import { useState } from 'react';
import type { PageId, ProgressState } from '@/types';
import { TOPICS } from '@/data/topics';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import {
  totalAnswered,
  totalCorrect,
  overallAccuracy,
  getWeakestTopic,
  questionsAnsweredToday,
  totalQuizQuestions,
} from '@/utils/progress';

const ICON_MAP: Record<string, typeof Cloud> = {
  Cloud,
  Server,
  Settings,
  Shield,
};

interface DashboardProps {
  progress: ProgressState;
  onNavigate: (page: PageId) => void;
  setDailyGoal: (goal: number) => void;
}

export function Dashboard({ progress, onNavigate, setDailyGoal }: DashboardProps) {
  const [editingGoal, setEditingGoal] = useState(false);
  const [goalInput, setGoalInput] = useState(String(progress.dailyGoal));

  const answered = totalAnswered(progress);
  const correct = totalCorrect(progress);
  const accuracy = overallAccuracy(progress);
  const weakest = getWeakestTopic(progress);
  const todayCount = questionsAnsweredToday(progress);
  const totalQs = totalQuizQuestions();

  const handleSaveGoal = () => {
    const parsed = parseInt(goalInput, 10);
    if (!isNaN(parsed) && parsed > 0) {
      setDailyGoal(parsed);
    } else {
      setGoalInput(String(progress.dailyGoal));
    }
    setEditingGoal(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 border border-navy-700/50 p-8 md:p-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan/10 rounded-full blur-3xl translate-y-1/2" />
        <div className="relative">
          <Badge variant="violet">
            <Cloud className="w-3 h-3" /> AZ-900 Exam Prep
          </Badge>
          <h1 className="mt-4 text-2xl md:text-3xl font-bold text-white leading-tight">
            Karibu Cloud Kwa Ground
          </h1>
          <p className="mt-2 text-navy-300 text-sm md:text-base max-w-lg leading-relaxed">
            Your beginner-friendly companion for mastering Azure fundamentals. Learn at your pace with simple explanations and practice questions.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('quiz')}
              className="btn-primary inline-flex items-center gap-2"
            >
              Start Learning <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('explain')}
              className="btn-secondary inline-flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" /> Explain It Simply
            </button>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-violet/15 flex items-center justify-center flex-shrink-0">
              <Target className="w-5 h-5 text-violet-light" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <p className="text-xs text-navy-400">Daily Goal</p>
                {editingGoal ? (
                  <button onClick={handleSaveGoal} className="text-emerald-300 hover:text-emerald-200">
                    <Check className="w-4 h-4" />
                  </button>
                ) : (
                  <button onClick={() => { setEditingGoal(true); setGoalInput(String(progress.dailyGoal)); }} className="text-navy-400 hover:text-violet-light">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              {editingGoal ? (
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={goalInput}
                  onChange={(e) => setGoalInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveGoal()}
                  onBlur={handleSaveGoal}
                  autoFocus
                  className="w-16 bg-navy-800 border border-violet/40 rounded-md px-2 py-0.5 text-lg font-semibold text-white focus:outline-none focus:border-violet"
                />
              ) : (
                <p className="text-lg font-semibold text-white">{todayCount}/{progress.dailyGoal}</p>
              )}
            </div>
          </div>
          <div className="mt-3">
            <ProgressBar value={todayCount} max={progress.dailyGoal} height="h-1.5" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan/15 flex items-center justify-center flex-shrink-0">
              <Trophy className="w-5 h-5 text-cyan-light" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-navy-400">Completed</p>
              <p className="text-lg font-semibold text-white">{answered}/{totalQs}</p>
            </div>
          </div>
          <div className="mt-3">
            <ProgressBar value={answered} max={totalQs} colorClass="from-cyan to-cyan-light" height="h-1.5" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/15 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-emerald-300" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-navy-400">Quiz Accuracy</p>
              <p className="text-lg font-semibold text-white">{accuracy}%</p>
            </div>
          </div>
          <p className="mt-3 text-xs text-navy-400">{correct} correct answers</p>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/15 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-amber-300" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-navy-400">Weakest Topic</p>
              <p className="text-sm font-semibold text-white truncate">
                {weakest ? weakest.topicName.split(' ')[0] : '—'}
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs text-navy-400">
            {weakest ? `${weakest.accuracy}% accuracy` : 'Answer questions to see'}
          </p>
        </Card>
      </div>

      {/* Study areas */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Study Areas</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {TOPICS.map((topic) => {
            const Icon = ICON_MAP[topic.icon] ?? Cloud;
            return (
              <Card
                key={topic.id}
                hover
                onClick={() => onNavigate('quiz')}
              >
                <div className="flex items-start gap-4">
                  <div className={`
                    w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
                    ${topic.color === 'violet' ? 'bg-violet/15' : 'bg-cyan/15'}
                  `}>
                    <Icon className={`w-6 h-6 ${topic.color === 'violet' ? 'text-violet-light' : 'text-cyan-light'}`} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-medium text-white text-sm">{topic.name}</h3>
                    <p className="text-xs text-navy-400 mt-1 leading-relaxed">{topic.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Continue where you left off */}
      {progress.lastVisited && (
        <Card>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 className="font-semibold text-white text-sm">Continue where you left off</h3>
              <p className="text-xs text-navy-400 mt-1">
                You were last on the {progress.lastVisited === 'quiz' ? 'Smart Quiz' : progress.lastVisited === 'explain' ? 'Explain It Simply' : progress.lastVisited === 'flashcards' ? 'Flashcards' : 'My Progress'} page.
              </p>
            </div>
            <button
              onClick={() => onNavigate(progress.lastVisited!)}
              className="btn-secondary inline-flex items-center gap-2 text-sm"
            >
              Resume <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </Card>
      )}

      {/* Disclaimer */}
      <p className="text-center text-xs text-navy-500 pb-2">
        Independent learning project. Not affiliated with or endorsed by Microsoft.
      </p>
    </div>
  );
}
