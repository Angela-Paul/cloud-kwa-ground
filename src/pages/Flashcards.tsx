import { useMemo, useState, useCallback } from 'react';
import { Layers, ChevronLeft, ChevronRight, Eye, Check, RotateCcw, Sparkles } from 'lucide-react';
import type { TopicId } from '@/types';
import { FLASHCARDS } from '@/data/flashcards';
import { TOPIC_MAP, TOPICS } from '@/data/topics';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface FlashcardsPageProps {
  knowIt: string[];
  reviewAgain: string[];
  markFlashcard: (cardId: string, knowIt: boolean) => void;
}

export function Flashcards({ knowIt, reviewAgain, markFlashcard }: FlashcardsPageProps) {
  const [filterTopic, setFilterTopic] = useState<TopicId | 'all'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const filteredCards = useMemo(() => {
    if (filterTopic === 'all') return FLASHCARDS;
    return FLASHCARDS.filter((c) => c.topicId === filterTopic);
  }, [filterTopic]);

  const currentCard = filteredCards[currentIndex];

  const goNext = useCallback(() => {
    setIsFlipped(false);
    setCurrentIndex((i) => (i + 1) % filteredCards.length);
  }, [filteredCards.length]);

  const goPrev = useCallback(() => {
    setIsFlipped(false);
    setCurrentIndex((i) => (i - 1 + filteredCards.length) % filteredCards.length);
  }, [filteredCards.length]);

  const handleMark = useCallback(
    (knowItFlag: boolean) => {
      if (!currentCard) return;
      markFlashcard(currentCard.id, knowItFlag);
      goNext();
    },
    [currentCard, markFlashcard, goNext],
  );

  const selectTopic = (topic: TopicId | 'all') => {
    setFilterTopic(topic);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  if (filteredCards.length === 0) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet/15 flex items-center justify-center">
            <Layers className="w-5 h-5 text-violet-light" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Flashcards</h1>
            <p className="text-sm text-navy-400">Flip cards, learn, and track what you know</p>
          </div>
        </div>
        <Card>
          <div className="text-center py-8">
            <p className="text-white font-medium text-sm">No flashcards available for this topic.</p>
          </div>
        </Card>
      </div>
    );
  }

  const cardStatus = currentCard
    ? knowIt.includes(currentCard.id)
      ? 'knowIt'
      : reviewAgain.includes(currentCard.id)
        ? 'reviewAgain'
        : 'new'
    : 'new';

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-violet/15 flex items-center justify-center">
          <Layers className="w-5 h-5 text-violet-light" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Flashcards</h1>
          <p className="text-sm text-navy-400">Flip cards, learn, and track what you know</p>
        </div>
      </div>

      {/* Topic filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => selectTopic('all')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200
            ${filterTopic === 'all'
              ? 'bg-violet/15 text-violet-light border-violet/30'
              : 'bg-navy-800/40 text-navy-400 border-navy-700/50 hover:border-navy-600'
            }`}
        >
          All Topics
        </button>
        {TOPICS.map((topic) => (
          <button
            key={topic.id}
            onClick={() => selectTopic(topic.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200
              ${filterTopic === topic.id
                ? topic.color === 'violet'
                  ? 'bg-violet/15 text-violet-light border-violet/30'
                  : 'bg-cyan/15 text-cyan-light border-cyan/30'
                : 'bg-navy-800/40 text-navy-400 border-navy-700/50 hover:border-navy-600'
              }`}
          >
            {topic.shortName}
          </button>
        ))}
      </div>

      {/* Progress + card counter */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Badge variant="violet">Card {currentIndex + 1} / {filteredCards.length}</Badge>
          {cardStatus === 'knowIt' && <Badge variant="success"><Check className="w-3 h-3" /> Know It</Badge>}
          {cardStatus === 'reviewAgain' && <Badge variant="warning"><RotateCcw className="w-3 h-3" /> Review Again</Badge>}
        </div>
        <div className="flex gap-2">
          <Badge variant="success">{knowIt.length} Know It</Badge>
          <Badge variant="warning">{reviewAgain.length} Review Again</Badge>
        </div>
      </div>

      {/* Flashcard */}
      {currentCard && (
        <div className="relative" style={{ perspective: '1000px' }}>
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="relative w-full min-h-[280px] cursor-pointer transition-transform duration-500"
            style={{
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          >
            {/* Front */}
            <div
              className="absolute inset-0 glass-card p-8 flex flex-col items-center justify-center"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Badge variant={TOPIC_MAP[currentCard.topicId].color === 'violet' ? 'violet' : 'cyan'}>
                  {TOPIC_MAP[currentCard.topicId].shortName}
                </Badge>
              </div>
              <p className="text-lg font-medium text-white text-center leading-relaxed">
                {currentCard.front}
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs text-navy-400">
                <Eye className="w-3.5 h-3.5" /> Tap to reveal answer
              </div>
            </div>

            {/* Back */}
            <div
              className="absolute inset-0 glass-card p-8 flex flex-col items-center justify-center border-violet/30"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-violet-light" />
                <p className="text-xs font-semibold text-violet-light uppercase tracking-wide">Answer</p>
              </div>
              <p className="text-base text-navy-100 text-center leading-relaxed">
                {currentCard.back}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={goPrev}
          className="btn-secondary p-3"
          aria-label="Previous card"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex gap-2 flex-1">
          <button
            onClick={() => handleMark(false)}
            className="flex-1 px-4 py-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-medium text-sm
                       transition-all duration-200 hover:bg-amber-500/20 hover:border-amber-500/50 active:scale-[0.98]
                       inline-flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" /> Review Again
          </button>
          <button
            onClick={() => handleMark(true)}
            className="flex-1 px-4 py-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-medium text-sm
                       transition-all duration-200 hover:bg-emerald-500/20 hover:border-emerald-500/50 active:scale-[0.98]
                       inline-flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" /> Know It
          </button>
        </div>

        <button
          onClick={goNext}
          className="btn-secondary p-3"
          aria-label="Next card"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Disclaimer */}
      <p className="text-center text-xs text-navy-500 pb-2">
        Independent learning project. Not affiliated with or endorsed by Microsoft.
      </p>
    </div>
  );
}
