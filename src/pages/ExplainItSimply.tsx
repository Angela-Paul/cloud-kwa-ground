import { useMemo, useState } from 'react';
import { Lightbulb, Search, BookOpen, MapPin, FileText, X, ChevronDown, ChevronUp, HelpCircle, Check } from 'lucide-react';
import type { PageId, TopicId } from '@/types';
import { CONCEPTS } from '@/data/concepts';
import { TOPIC_MAP, TOPICS } from '@/data/topics';
import { QUIZ_QUESTIONS } from '@/data/questions';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface ExplainPageProps {
  onNavigate: (page: PageId) => void;
}

export function ExplainItSimply({ onNavigate }: ExplainPageProps) {
  const [search, setSearch] = useState('');
  const [filterTopic, setFilterTopic] = useState<TopicId | 'all'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [quizConcept, setQuizConcept] = useState<typeof CONCEPTS[0] | null>(null);

  const filteredConcepts = useMemo(() => {
    return CONCEPTS.filter((c) => {
      const matchesSearch =
        search === '' ||
        c.term.toLowerCase().includes(search.toLowerCase()) ||
        c.plainEnglish.toLowerCase().includes(search.toLowerCase());
      const matchesTopic = filterTopic === 'all' || c.topicId === filterTopic;
      return matchesSearch && matchesTopic;
    });
  }, [search, filterTopic]);

  const handleTestUnderstanding = (concept: typeof CONCEPTS[0]) => {
    setQuizConcept(concept);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-violet/15 flex items-center justify-center">
          <Lightbulb className="w-5 h-5 text-violet-light" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Explain It Simply</h1>
          <p className="text-sm text-navy-400">Cloud concepts in plain English with everyday examples</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
        <input
          type="text"
          placeholder="Search concepts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl bg-navy-900/60 border border-navy-700/50
                     text-sm text-white placeholder:text-navy-500
                     focus:outline-none focus:border-violet/50 focus:bg-navy-900
                     transition-all duration-200"
        />
      </div>

      {/* Topic filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilterTopic('all')}
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
            onClick={() => setFilterTopic(topic.id)}
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

      {/* Concepts list */}
      {filteredConcepts.length === 0 ? (
        <Card>
          <div className="text-center py-8">
            <Search className="w-10 h-10 text-navy-600 mx-auto mb-3" />
            <p className="text-white font-medium text-sm">No concepts found</p>
            <p className="text-xs text-navy-400 mt-1">Try a different search term or topic filter.</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredConcepts.map((concept) => {
            const topic = TOPIC_MAP[concept.topicId];
            const isExpanded = expandedId === concept.id;
            return (
              <Card key={concept.id}>
                <button
                  onClick={() => setExpandedId(isExpanded ? null : concept.id)}
                  className="w-full flex items-center justify-between gap-3 text-left"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${topic.color === 'violet' ? 'bg-violet/15' : 'bg-cyan/15'}`}>
                      <BookOpen className={`w-4 h-4 ${topic.color === 'violet' ? 'text-violet-light' : 'text-cyan-light'}`} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-medium text-white text-sm">{concept.term}</h3>
                      <p className="text-xs text-navy-400 truncate">{topic.shortName}</p>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-navy-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-navy-400 flex-shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <div className="mt-5 space-y-4 animate-scale-in">
                    {/* Plain English */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="w-4 h-4 text-violet-light" />
                        <p className="text-xs font-semibold text-violet-light uppercase tracking-wide">In Plain English</p>
                      </div>
                      <p className="text-sm text-navy-200 leading-relaxed">{concept.plainEnglish}</p>
                    </div>

                    {/* Real-life example */}
                    <div className="p-4 rounded-xl border border-cyan/20 bg-cyan/5">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-cyan-light" />
                        <p className="text-xs font-semibold text-cyan-light uppercase tracking-wide">Everyday Example</p>
                      </div>
                      <p className="text-sm text-navy-200 leading-relaxed">{concept.realLifeExample}</p>
                    </div>

                    {/* Technical definition */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-4 h-4 text-navy-300" />
                        <p className="text-xs font-semibold text-navy-300 uppercase tracking-wide">Technical Definition</p>
                      </div>
                      <p className="text-sm text-navy-300 leading-relaxed">{concept.technicalDefinition}</p>
                    </div>

                    {/* Test understanding */}
                    <button
                      onClick={() => handleTestUnderstanding(concept)}
                      className="btn-secondary w-full inline-flex items-center justify-center gap-2 text-sm"
                    >
                      <HelpCircle className="w-4 h-4" /> Test My Understanding
                    </button>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}

      {/* Test understanding modal */}
      {quizConcept && (
        <TestUnderstandingModal
          concept={quizConcept}
          onClose={() => setQuizConcept(null)}
          onNavigate={onNavigate}
        />
      )}
    </div>
  );
}

// ── Inline mini-quiz modal ──
function TestUnderstandingModal({
  concept,
  onClose,
  onNavigate,
}: {
  concept: typeof CONCEPTS[0];
  onClose: () => void;
  onNavigate: (page: PageId) => void;
}) {
  // Find quiz questions related to this concept's topic
  const relatedQuestions = QUIZ_QUESTIONS.filter((q) => q.topicId === concept.topicId);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const question = relatedQuestions[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg">
        <Card className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-navy-400 hover:text-white hover:bg-navy-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="mb-4">
            <Badge variant="violet">
              <HelpCircle className="w-3 h-3" /> Test: {concept.term}
            </Badge>
          </div>

          {!question ? (
            <div className="text-center py-6">
              <p className="text-white font-medium text-sm">No practice question available for this topic yet.</p>
              <p className="text-xs text-navy-400 mt-1">Try the Smart Quiz for more questions.</p>
              <button onClick={() => { onClose(); onNavigate('quiz'); }} className="btn-primary mt-4 text-sm">
                Go to Smart Quiz
              </button>
            </div>
          ) : (
            <>
              <p className="text-sm font-medium text-white mb-4 leading-relaxed">{question.question}</p>
              <div className="space-y-2.5">
                {question.options.map((option, index) => {
                  let style = 'border-navy-700 bg-navy-800/40 hover:border-violet/40 hover:bg-navy-800';
                  if (answered) {
                    if (index === question.correctIndex) {
                      style = 'border-emerald-500/50 bg-emerald-500/10';
                    } else if (index === selectedIdx) {
                      style = 'border-rose-500/50 bg-rose-500/10';
                    } else {
                      style = 'border-navy-700/50 bg-navy-800/20 opacity-50';
                    }
                  }
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        if (answered) return;
                        setSelectedIdx(index);
                        setAnswered(true);
                      }}
                      disabled={answered}
                      className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border text-sm text-left transition-all ${style}`}
                    >
                      <span className="text-navy-100">{option}</span>
                      {answered && index === question.correctIndex && (
                        <Check className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {answered && (
                <div className="mt-4 p-4 rounded-xl border border-violet/20 bg-violet/5 animate-scale-in">
                  <p className="text-sm text-navy-200 leading-relaxed">{question.explanation}</p>
                  <div className="mt-3 flex gap-2">
                    <button onClick={() => { onClose(); onNavigate('quiz'); }} className="btn-secondary text-sm flex-1">
                      More Questions
                    </button>
                    <button onClick={onClose} className="btn-primary text-sm flex-1">
                      Got It
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
