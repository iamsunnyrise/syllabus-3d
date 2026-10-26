import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import {
  Search,
  Volume2,
  Star,
  Copy,
  Check,
  Sparkles,
  Filter,
  RotateCcw,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Shuffle,
  X,
  CheckCircle2,
  HelpCircle,
  Trophy,
  Flame,
  Bookmark,
  Award,
  Zap,
  Brain,
  AlertTriangle,
  Lightbulb,
  Compass,
  Layers,
  RefreshCw,
  Eye,
  EyeOff,
  CheckSquare,
  Square
} from 'lucide-react';
import {
  HIGH_YIELD_FIXED_PREPOSITIONS,
  CONFUSING_PREPOSITION_PAIRS,
  FIXED_PREPOSITIONS_QUIZ_DATA,
  FixedPrepositionItem,
  ConfusingPairGroup,
  FixedPrepositionQuizQuestion
} from '../../data/highYieldFixedPrepositionsData';
import { soundManager } from '../../utils/soundEffects';
import { haptics } from '../../utils/haptics';
import { fireCelebration } from '../../utils/confettiHelper';

// Helper color palette for prepositions to build strong visual association
const PREP_COLOR_MAP: Record<string, { bg: string; text: string; border: string; badge: string; glow: string }> = {
  to: {
    bg: 'bg-sky-500/10 dark:bg-sky-500/15',
    text: 'text-sky-600 dark:text-sky-400',
    border: 'border-sky-500/30',
    badge: 'bg-sky-500 text-white',
    glow: 'rgba(14, 165, 233, 0.25)'
  },
  of: {
    bg: 'bg-amber-500/10 dark:bg-amber-500/15',
    text: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-500/30',
    badge: 'bg-amber-500 text-slate-950',
    glow: 'rgba(245, 158, 11, 0.25)'
  },
  for: {
    bg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
    text: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-500/30',
    badge: 'bg-emerald-500 text-white',
    glow: 'rgba(16, 185, 129, 0.25)'
  },
  with: {
    bg: 'bg-purple-500/10 dark:bg-purple-500/15',
    text: 'text-purple-600 dark:text-purple-400',
    border: 'border-purple-500/30',
    badge: 'bg-purple-500 text-white',
    glow: 'rgba(168, 85, 247, 0.25)'
  },
  from: {
    bg: 'bg-rose-500/10 dark:bg-rose-500/15',
    text: 'text-rose-600 dark:text-rose-400',
    border: 'border-rose-500/30',
    badge: 'bg-rose-500 text-white',
    glow: 'rgba(244, 63, 94, 0.25)'
  },
  in: {
    bg: 'bg-indigo-500/10 dark:bg-indigo-500/15',
    text: 'text-indigo-600 dark:text-indigo-400',
    border: 'border-indigo-500/30',
    badge: 'bg-indigo-500 text-white',
    glow: 'rgba(99, 102, 241, 0.25)'
  },
  on: {
    bg: 'bg-teal-500/10 dark:bg-teal-500/15',
    text: 'text-teal-600 dark:text-teal-400',
    border: 'border-teal-500/30',
    badge: 'bg-teal-500 text-white',
    glow: 'rgba(20, 184, 166, 0.25)'
  },
  at: {
    bg: 'bg-orange-500/10 dark:bg-orange-500/15',
    text: 'text-orange-600 dark:text-orange-400',
    border: 'border-orange-500/30',
    badge: 'bg-orange-500 text-white',
    glow: 'rgba(249, 115, 22, 0.25)'
  },
  by: {
    bg: 'bg-blue-500/10 dark:bg-blue-500/15',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-500/30',
    badge: 'bg-blue-500 text-white',
    glow: 'rgba(59, 130, 246, 0.25)'
  },
  into: {
    bg: 'bg-cyan-500/10 dark:bg-cyan-500/15',
    text: 'text-cyan-600 dark:text-cyan-400',
    border: 'border-cyan-500/30',
    badge: 'bg-cyan-500 text-white',
    glow: 'rgba(6, 182, 212, 0.25)'
  }
};

const DEFAULT_PREP_COLOR = {
  bg: 'bg-slate-500/10 dark:bg-slate-500/15',
  text: 'text-slate-600 dark:text-slate-300',
  border: 'border-slate-500/30',
  badge: 'bg-slate-600 text-white',
  glow: 'rgba(100, 116, 139, 0.25)'
};

const PREPOSITION_LIST = ['ALL', 'TO', 'OF', 'FOR', 'WITH', 'FROM', 'IN', 'ON', 'AT', 'BY', 'INTO'] as const;

export const FixedPrepositionsView: React.FC = () => {
  // Mode: 'cards' | 'flashcards' | 'traps' | 'quiz'
  const [activeMode, setActiveMode] = useState<'cards' | 'flashcards' | 'traps' | 'quiz'>('cards');

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPrepFilter, setSelectedPrepFilter] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'verb' | 'adjective' | 'noun'>('all');
  const [selectedLetter, setSelectedLetter] = useState<string>('ALL');
  const [onlyStarred, setOnlyStarred] = useState(false);
  const [onlyUnmastered, setOnlyUnmastered] = useState(false);

  // Persistence: Starred IDs
  const [starredIds, setStarredIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('syllabus_fixed_prepositions_starred_v1');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Persistence: Mastered IDs
  const [masteredIds, setMasteredIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('syllabus_fixed_prepositions_mastered_v1');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Speech & Copy state
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Flashcards Mode state
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlashcardFlipped, setIsFlashcardFlipped] = useState(false);

  // Quiz Mode state
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{ [qId: string]: { selected: string; isCorrect: boolean } }>({});

  // Audio Speech Synthesis
  const speakText = useCallback((text: string, id: string) => {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      setPlayingId(id);
      utterance.onend = () => setPlayingId(null);
      utterance.onerror = () => setPlayingId(null);
      window.speechSynthesis.speak(utterance);
      haptics.selection();
    } catch {
      setPlayingId(null);
    }
  }, []);

  // Copy phrase helper
  const copyPhrase = useCallback((phrase: string, id: string) => {
    navigator.clipboard.writeText(phrase);
    setCopiedId(id);
    soundManager.playClick();
    haptics.selection();
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  // Toggle Star / Bookmark
  const toggleStar = useCallback((id: string) => {
    soundManager.playClick();
    haptics.selection();
    setStarredIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        localStorage.setItem('syllabus_fixed_prepositions_starred_v1', JSON.stringify(Array.from(next)));
      } catch {
        // Ignore localStorage quota errors
      }
      return next;
    });
  }, []);

  // Toggle Mastered
  const toggleMastered = useCallback((id: string) => {
    soundManager.playClick();
    haptics.selection();
    setMasteredIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        soundManager.playSuccess();
      }
      try {
        localStorage.setItem('syllabus_fixed_prepositions_mastered_v1', JSON.stringify(Array.from(next)));
      } catch {
        // Ignore localStorage quota errors
      }
      return next;
    });
  }, []);

  // Filtered List for Cards and Flashcards
  const filteredItems = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return HIGH_YIELD_FIXED_PREPOSITIONS.filter(item => {
      // Preposition filter
      if (selectedPrepFilter !== 'ALL' && item.preposition.toUpperCase() !== selectedPrepFilter) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Letter filter
      if (selectedLetter !== 'ALL' && !item.word.toUpperCase().startsWith(selectedLetter)) {
        return false;
      }
      // Starred only
      if (onlyStarred && !starredIds.has(item.id)) {
        return false;
      }
      // Unmastered only
      if (onlyUnmastered && masteredIds.has(item.id)) {
        return false;
      }
      // Search Query
      if (q) {
        const matchesWord = item.word.toLowerCase().includes(q);
        const matchesPrep = item.preposition.toLowerCase().includes(q);
        const matchesPhrase = item.phrase.toLowerCase().includes(q);
        const matchesHindi = item.hindiMeaning.toLowerCase().includes(q);
        const matchesEng = item.englishMeaning.toLowerCase().includes(q);
        const matchesEx = item.example.toLowerCase().includes(q);
        const matchesExam = item.repeatedIn.some(ex => ex.toLowerCase().includes(q));
        if (!matchesWord && !matchesPrep && !matchesPhrase && !matchesHindi && !matchesEng && !matchesEx && !matchesExam) {
          return false;
        }
      }
      return true;
    });
  }, [searchQuery, selectedPrepFilter, selectedCategory, selectedLetter, onlyStarred, onlyUnmastered, starredIds, masteredIds]);

  // Keep flashcardIndex within range when list changes
  useEffect(() => {
    if (flashcardIndex >= filteredItems.length && filteredItems.length > 0) {
      setFlashcardIndex(0);
    }
    setIsFlashcardFlipped(false);
  }, [filteredItems.length]);

  // Keyboard navigation for Flashcards
  useEffect(() => {
    if (activeMode !== 'flashcards' || filteredItems.length === 0) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        soundManager.playClick();
        setIsFlashcardFlipped(prev => !prev);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNextFlashcard();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevFlashcard();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeMode, filteredItems.length, flashcardIndex]);

  // Flashcard Next & Prev handlers
  const handleNextFlashcard = useCallback(() => {
    if (filteredItems.length === 0) return;
    soundManager.playClick();
    haptics.selection();
    setIsFlashcardFlipped(false);
    setFlashcardIndex(prev => (prev + 1) % filteredItems.length);
  }, [filteredItems.length]);

  const handlePrevFlashcard = useCallback(() => {
    if (filteredItems.length === 0) return;
    soundManager.playClick();
    haptics.selection();
    setIsFlashcardFlipped(false);
    setFlashcardIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
  }, [filteredItems.length]);

  const handleShuffleFlashcards = useCallback(() => {
    if (filteredItems.length <= 1) return;
    soundManager.playClick();
    haptics.selection();
    setIsFlashcardFlipped(false);
    const randomIndex = Math.floor(Math.random() * filteredItems.length);
    setFlashcardIndex(randomIndex);
  }, [filteredItems.length]);

  // Quiz Option Click Handler
  const handleQuizOption = useCallback((option: string) => {
    if (selectedOption !== null) return; // Prevent double answer
    setSelectedOption(option);
    const currentQ = FIXED_PREPOSITIONS_QUIZ_DATA[quizIndex];
    const isCorrect = option.toLowerCase() === currentQ.correctPreposition.toLowerCase();

    if (isCorrect) {
      soundManager.playSuccess();
      haptics.success();
      setQuizScore(prev => prev + 1);
    } else {
      soundManager.playError();
      haptics.error();
    }

    setUserAnswers(prev => ({
      ...prev,
      [currentQ.id]: { selected: option, isCorrect }
    }));
  }, [quizIndex, selectedOption]);

  const handleNextQuizQuestion = useCallback(() => {
    soundManager.playClick();
    haptics.selection();
    setSelectedOption(null);
    if (quizIndex + 1 < FIXED_PREPOSITIONS_QUIZ_DATA.length) {
      setQuizIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
      fireCelebration();
    }
  }, [quizIndex]);

  const handleRestartQuiz = useCallback(() => {
    soundManager.playClick();
    haptics.selection();
    setQuizIndex(0);
    setSelectedOption(null);
    setQuizScore(0);
    setQuizFinished(false);
    setUserAnswers({});
  }, []);

  // Preposition count map
  const prepCounts = useMemo(() => {
    const map: Record<string, number> = { ALL: HIGH_YIELD_FIXED_PREPOSITIONS.length };
    HIGH_YIELD_FIXED_PREPOSITIONS.forEach(item => {
      const p = item.preposition.toUpperCase();
      map[p] = (map[p] || 0) + 1;
    });
    return map;
  }, []);

  // Unique alphabet letters present in dataset
  const availableLetters = useMemo(() => {
    const letters = new Set<string>();
    HIGH_YIELD_FIXED_PREPOSITIONS.forEach(item => {
      letters.add(item.word.charAt(0).toUpperCase());
    });
    return ['ALL', ...Array.from(letters).sort()];
  }, []);

  // Progress stats
  const totalCount = HIGH_YIELD_FIXED_PREPOSITIONS.length;
  const masteredCount = masteredIds.size;
  const starredCount = starredIds.size;
  const progressPercent = Math.min(100, Math.round((masteredCount / totalCount) * 100));

  const currentFlashcard = filteredItems[flashcardIndex];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* ──────────────────────────────────────────────────────────
          1. HERO HEADER BANNER & STATS
         ────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-3xl p-5 sm:p-7 bg-gradient-to-br from-indigo-950 via-slate-900 to-sky-950 border border-sky-500/20 shadow-2xl text-white">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-xs font-black tracking-wide uppercase">
              <Compass className="w-3.5 h-3.5 text-sky-400 animate-spin-slow" />
              <span>SSC CGL, CHSL, CPO, CDS, Bank PO Special</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white flex items-center gap-2.5">
              <span>Fixed Prepositions Mastery</span>
              <span className="text-xs sm:text-sm font-bold px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950 shadow-xs">
                170+ PYQ Items
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              निश्चित संबंधबोधक अव्यय — परीक्षा के सबसे बड़े ट्रैप्स को समझें! Smart Cards, Fill-in Active Recall Flashcards, 10 Confusing Pairs, और Real PYQ Speed Quiz के साथ एक बार में पक्का याद करें।
            </p>
          </div>

          {/* Quick Mastery Progress Metric Card */}
          <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-4 p-4 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/10 shrink-0">
            <div className="text-left lg:text-right">
              <div className="flex items-center gap-2">
                <span className="text-2xl sm:text-3xl font-black text-sky-400">{masteredCount}</span>
                <span className="text-slate-400 text-sm font-semibold">/ {totalCount} Mastered</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1.5">
                <Trophy className="w-3 h-3 text-amber-400" />
                <span>{progressPercent}% Complete ({starredCount} Starred)</span>
              </div>
            </div>
            <div className="w-36 sm:w-44 h-2.5 bg-slate-800 rounded-full overflow-hidden border border-white/10">
              <div
                className="h-full bg-gradient-to-r from-sky-400 via-indigo-400 to-emerald-400 transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* 4 Mode Navigation Switcher Tabs */}
        <div className="relative z-10 mt-6 pt-5 border-t border-white/10 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              haptics.selection();
              setActiveMode('cards');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer whitespace-nowrap shadow-xs ${
              activeMode === 'cards'
                ? 'bg-sky-500 text-white ring-2 ring-sky-300/40 shadow-sky-500/25'
                : 'bg-white/10 text-slate-300 hover:text-white hover:bg-white/15'
            }`}
          >
            <BookOpen className="w-4 h-4 text-sky-300" />
            <span>Smart Cards (कार्ड्स ग्रिड)</span>
            <span className="px-1.5 py-0.5 rounded-md bg-black/25 text-[10px] font-bold">
              {filteredItems.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              haptics.selection();
              setActiveMode('flashcards');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer whitespace-nowrap shadow-xs ${
              activeMode === 'flashcards'
                ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white ring-2 ring-purple-300/40 shadow-purple-500/25'
                : 'bg-white/10 text-slate-300 hover:text-white hover:bg-white/15'
            }`}
          >
            <Brain className="w-4 h-4 text-purple-300" />
            <span>Active Recall Flashcards (याद करें)</span>
            <span className="px-1.5 py-0.5 rounded-md bg-black/25 text-[10px] font-bold">
              Fill-in
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              haptics.selection();
              setActiveMode('traps');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer whitespace-nowrap shadow-xs ${
              activeMode === 'traps'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 ring-2 ring-amber-300/40 shadow-amber-500/25'
                : 'bg-white/10 text-slate-300 hover:text-white hover:bg-white/15'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-amber-900" />
            <span>Confusing Traps & Pairs (परीक्षा ट्रैप्स)</span>
            <span className="px-1.5 py-0.5 rounded-md bg-black/25 text-white text-[10px] font-bold">
              10 Pairs
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              haptics.selection();
              setActiveMode('quiz');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer whitespace-nowrap shadow-xs ${
              activeMode === 'quiz'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 ring-2 ring-emerald-300/40 shadow-emerald-500/25'
                : 'bg-white/10 text-slate-300 hover:text-white hover:bg-white/15'
            }`}
          >
            <Zap className="w-4 h-4 text-emerald-950" />
            <span>PYQ Speed Quiz (20 MCQs)</span>
            <span className="px-1.5 py-0.5 rounded-md bg-black/25 text-slate-950 text-[10px] font-bold">
              Test
            </span>
          </button>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          2. FILTER BAR & SEARCH (Shown for 'cards' & 'flashcards')
         ────────────────────────────────────────────────────────── */}
      {(activeMode === 'cards' || activeMode === 'flashcards') && (
        <div className="space-y-3 p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0B0D14] border border-slate-200 dark:border-white/10 shadow-sm">
          {/* Search bar + Action pills */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by word, preposition, Hindi meaning or exam (e.g., accused, with, चोरी, CGL)..."
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Starred & Mastered Toggles */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  haptics.selection();
                  setOnlyStarred(prev => !prev);
                }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                  onlyStarred
                    ? 'bg-amber-500/15 border-amber-500/40 text-amber-600 dark:text-amber-400 font-black'
                    : 'bg-slate-50 dark:bg-white/[0.04] border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Star className={`w-3.5 h-3.5 ${onlyStarred ? 'fill-amber-400 text-amber-400' : ''}`} />
                <span>Starred ({starredCount})</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  haptics.selection();
                  setOnlyUnmastered(prev => !prev);
                }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                  onlyUnmastered
                    ? 'bg-sky-500/15 border-sky-500/40 text-sky-600 dark:text-sky-400 font-black'
                    : 'bg-slate-50 dark:bg-white/[0.04] border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Unmastered</span>
              </button>

              {(searchQuery || selectedPrepFilter !== 'ALL' || selectedCategory !== 'all' || selectedLetter !== 'ALL' || onlyStarred || onlyUnmastered) && (
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    haptics.selection();
                    setSearchQuery('');
                    setSelectedPrepFilter('ALL');
                    setSelectedCategory('all');
                    setSelectedLetter('ALL');
                    setOnlyStarred(false);
                    setOnlyUnmastered(false);
                  }}
                  title="Reset all filters"
                  className="p-2 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Quick Preposition Pills Filter Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 shrink-0">
              Filter by Prep:
            </span>
            {PREPOSITION_LIST.map(prep => {
              const count = prepCounts[prep] || 0;
              const isSelected = selectedPrepFilter === prep;
              const prepStyle = PREP_COLOR_MAP[prep.toLowerCase()] || DEFAULT_PREP_COLOR;

              return (
                <button
                  key={prep}
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    haptics.selection();
                    setSelectedPrepFilter(prep);
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer shrink-0 border ${
                    isSelected
                      ? `${prepStyle.badge} border-transparent shadow-xs font-black scale-105`
                      : 'bg-slate-100 dark:bg-white/[0.04] border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
                  }`}
                >
                  <span>{prep}</span>
                  <span className={`text-[10px] px-1 py-0.2 rounded-full ${isSelected ? 'bg-black/25 text-white' : 'text-slate-400'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Category & Letter Selector Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-white/5 text-xs">
            {/* Category: Verb, Adjective, Noun */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 font-semibold">Part of Speech:</span>
              {(['all', 'verb', 'adjective', 'noun'] as const).map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    haptics.selection();
                    setSelectedCategory(cat);
                  }}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold capitalize transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black'
                      : 'bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {cat === 'all' ? 'All Types' : cat}
                </button>
              ))}
            </div>

            {/* A-Z Letter Nav */}
            <div className="flex items-center gap-1 overflow-x-auto max-w-full no-scrollbar py-0.5">
              {availableLetters.map(letter => (
                <button
                  key={letter}
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    haptics.selection();
                    setSelectedLetter(letter);
                  }}
                  className={`min-w-6 h-6 px-1.5 flex items-center justify-center rounded text-[11px] font-bold transition-all cursor-pointer ${
                    selectedLetter === letter
                      ? 'bg-sky-500 text-white font-black scale-105'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06]'
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────
          3. MODE: CARDS GRID VIEW
         ────────────────────────────────────────────────────────── */}
      {activeMode === 'cards' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 px-1">
            <span>Showing {filteredItems.length} Preposition Rules</span>
            <span>Click speaker to pronounce, star to save</span>
          </div>

          {filteredItems.length === 0 ? (
            <div className="text-center py-16 px-4 rounded-3xl bg-white dark:bg-[#0B0D14] border border-slate-200 dark:border-white/10 space-y-3">
              <Compass className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto animate-pulse" />
              <h3 className="text-base font-bold text-slate-700 dark:text-slate-200">No fixed prepositions match your filter</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Try searching with a different word or clear the preposition/category filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedPrepFilter('ALL');
                  setSelectedCategory('all');
                  setSelectedLetter('ALL');
                  setOnlyStarred(false);
                  setOnlyUnmastered(false);
                }}
                className="px-4 py-2 rounded-xl bg-sky-500 text-white text-xs font-bold shadow-xs hover:bg-sky-600 cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredItems.map(item => {
                const prepStyle = PREP_COLOR_MAP[item.preposition.toLowerCase()] || DEFAULT_PREP_COLOR;
                const isStarred = starredIds.has(item.id);
                const isMastered = masteredIds.has(item.id);
                const isPlaying = playingId === item.id;
                const isCopied = copiedId === item.id;

                return (
                  <div
                    key={item.id}
                    className={`group relative rounded-2xl p-4 sm:p-5 transition-all duration-300 flex flex-col justify-between border ${
                      isMastered
                        ? 'bg-emerald-50/40 dark:bg-emerald-950/10 border-emerald-500/30'
                        : 'bg-white dark:bg-[#0B0D14] border-slate-200/90 dark:border-white/10 hover:border-sky-500/40 dark:hover:border-sky-500/40 shadow-xs hover:shadow-lg hover:-translate-y-0.5'
                    }`}
                  >
                    {/* Top Row: Word + Preposition Pill + Action Buttons */}
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
                              {item.word}
                            </span>
                            {/* Prominent Fixed Preposition Badge */}
                            <span
                              className={`px-2.5 py-0.5 rounded-lg text-xs font-black uppercase tracking-wider border shadow-xs ${prepStyle.badge} border-white/20`}
                            >
                              + {item.preposition}
                            </span>
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400 capitalize">
                              {item.category}
                            </span>
                          </div>
                          <div className="text-xs font-black text-sky-600 dark:text-sky-400 mt-0.5">
                            {item.phrase}
                          </div>
                        </div>

                        {/* Top-Right Tools: Speak, Copy, Star */}
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => speakText(item.phrase, item.id)}
                            title="Pronounce phrase"
                            className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                              isPlaying
                                ? 'bg-sky-500 text-white animate-pulse'
                                : 'text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10'
                            }`}
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => copyPhrase(item.phrase, item.id)}
                            title="Copy phrase"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all cursor-pointer"
                          >
                            {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleStar(item.id)}
                            title={isStarred ? 'Remove bookmark' : 'Bookmark for revision'}
                            className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                              isStarred
                                ? 'text-amber-500 hover:text-amber-600 bg-amber-500/10'
                                : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-white/10'
                            }`}
                          >
                            <Star className={`w-4 h-4 ${isStarred ? 'fill-amber-400' : ''}`} />
                          </button>
                        </div>
                      </div>

                      {/* Hindi Meaning & English Definition */}
                      <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/5">
                        <div className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-baseline gap-2">
                          <span className="text-slate-400 text-xs font-normal">अर्थ:</span>
                          <span className="text-amber-600 dark:text-amber-400 font-black">{item.hindiMeaning}</span>
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-300">
                          {item.englishMeaning}
                        </div>
                      </div>

                      {/* Real Exam Example Sentence */}
                      <div className="text-xs text-slate-700 dark:text-slate-300 p-3 rounded-xl bg-sky-50/50 dark:bg-sky-950/20 border border-sky-200/50 dark:border-sky-500/15">
                        <span className="font-bold text-sky-700 dark:text-sky-400 block mb-1">
                          Exam Example:
                        </span>
                        <p className="italic leading-relaxed font-medium">
                          "{item.example}"
                        </p>
                      </div>

                      {/* Exam Trap Tip (If present) */}
                      {item.examTrapTip && (
                        <div className="flex items-start gap-2 p-2.5 rounded-xl bg-rose-500/10 dark:bg-rose-500/15 border border-rose-500/25 text-rose-700 dark:text-rose-300 text-[11px] leading-snug">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-black uppercase tracking-wider mr-1">Exam Trap:</span>
                            <span>{item.examTrapTip}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bottom Row: Exam Tags & Mastered Toggle */}
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-1">
                        {item.repeatedIn.slice(0, 3).map((exam, idx) => (
                          <span
                            key={idx}
                            className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400"
                          >
                            {exam}
                          </span>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleMastered(item.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                          isMastered
                            ? 'bg-emerald-500 text-white shadow-xs'
                            : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-emerald-500/20 hover:text-emerald-500'
                        }`}
                      >
                        <CheckCircle2 className={`w-3.5 h-3.5 ${isMastered ? 'text-white' : ''}`} />
                        <span>{isMastered ? 'Mastered' : 'Mark Known'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────
          4. MODE: ACTIVE RECALL FLASHCARDS
         ────────────────────────────────────────────────────────── */}
      {activeMode === 'flashcards' && (
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Instructions banner */}
          <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-between text-xs text-purple-700 dark:text-purple-300">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-purple-500 shrink-0" />
              <span>
                <strong>Active Recall:</strong> Guess the blank preposition first, then flip to verify! Use Space/Enter to flip, Arrows to navigate.
              </span>
            </div>
            <button
              type="button"
              onClick={handleShuffleFlashcards}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 font-bold shrink-0 cursor-pointer"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Shuffle</span>
            </button>
          </div>

          {filteredItems.length === 0 ? (
            <div className="text-center py-16 px-4 rounded-3xl bg-white dark:bg-[#0B0D14] border border-slate-200 dark:border-white/10">
              <p className="text-slate-500">No cards to display. Adjust filters above.</p>
            </div>
          ) : (
            currentFlashcard && (
              <div className="space-y-4">
                {/* Flashcard Container */}
                <div
                  className={`min-h-[360px] sm:min-h-[400px] rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative border shadow-xl ${
                    isFlashcardFlipped
                      ? 'bg-gradient-to-br from-indigo-950 via-slate-900 to-sky-950 text-white border-sky-500/30'
                      : 'bg-white dark:bg-[#0E101B] border-slate-200 dark:border-white/10 text-slate-900 dark:text-white'
                  }`}
                >
                  {/* Card Top: Counter + Part of speech badge + Star button */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400">
                      Card {flashcardIndex + 1} of {filteredItems.length}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-wider font-black px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30">
                        {currentFlashcard.category}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleStar(currentFlashcard.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 cursor-pointer"
                      >
                        <Star className={`w-4 h-4 ${starredIds.has(currentFlashcard.id) ? 'fill-amber-400 text-amber-400' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Card Center: Front vs Back */}
                  {!isFlashcardFlipped ? (
                    // FRONT: Fill-in-the-blank prompt
                    <div className="my-auto py-8 text-center space-y-5">
                      <div className="text-xs font-black uppercase tracking-widest text-slate-400">
                        Fill in the correct preposition:
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                        {currentFlashcard.word} + <span className="text-sky-500 underline decoration-dashed decoration-2">_____</span> ?
                      </div>
                      <div className="max-w-lg mx-auto p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/5 text-base sm:text-lg font-medium italic text-slate-700 dark:text-slate-200">
                        "{currentFlashcard.example.replace(
                          new RegExp(`\\b${currentFlashcard.preposition}\\b`, 'i'),
                          '_______'
                        )}"
                      </div>
                      <div className="text-xs text-slate-500 flex items-center justify-center gap-2">
                        <span>अर्थ का संकेत:</span>
                        <span className="font-bold text-amber-600 dark:text-amber-400">{currentFlashcard.hindiMeaning}</span>
                      </div>
                    </div>
                  ) : (
                    // BACK: The Answer & Rule
                    <div className="my-auto py-6 text-center space-y-4 animate-fade-in">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 text-xs font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Preposition Revealed!</span>
                      </div>
                      <div className="text-3xl sm:text-4xl font-black text-white flex items-center justify-center gap-2">
                        <span>{currentFlashcard.word}</span>
                        <span className="px-3 py-1 rounded-xl bg-sky-500 text-white font-black shadow-lg">
                          {currentFlashcard.preposition.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-lg font-black text-amber-300">
                        {currentFlashcard.hindiMeaning}
                      </div>
                      <div className="text-xs text-slate-300 max-w-md mx-auto">
                        {currentFlashcard.englishMeaning}
                      </div>
                      <div className="p-3.5 rounded-2xl bg-white/[0.06] border border-white/10 text-xs text-slate-200 text-left max-w-lg mx-auto">
                        <span className="font-bold text-sky-400 block mb-1">Full Sentence:</span>
                        <p className="italic">"{currentFlashcard.example}"</p>
                      </div>
                      {currentFlashcard.examTrapTip && (
                        <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-400/30 text-rose-200 text-xs text-left max-w-lg mx-auto flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold">Exam Trap: </span>
                            {currentFlashcard.examTrapTip}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Card Bottom: Single Primary Flip Button */}
                  <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        setIsFlashcardFlipped(prev => !prev);
                      }}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-black text-xs sm:text-sm shadow-lg shadow-sky-500/25 flex items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95"
                    >
                      {isFlashcardFlipped ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      <span>{isFlashcardFlipped ? 'Hide Answer (वापस प्रश्न देखें)' : 'Flip to Reveal Preposition & Rule'}</span>
                    </button>
                  </div>
                </div>

                {/* Spaced Repetition Actions & Prev/Next Bar */}
                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handlePrevFlashcard}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        toggleMastered(currentFlashcard.id);
                        handleNextFlashcard();
                      }}
                      className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-black shadow-xs transition-all cursor-pointer ${
                        masteredIds.has(currentFlashcard.id)
                          ? 'bg-emerald-600 text-white'
                          : 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{masteredIds.has(currentFlashcard.id) ? 'Mastered!' : 'I Know This'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        handleNextFlashcard();
                      }}
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-black shadow-xs transition-all cursor-pointer"
                    >
                      <span>Next</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────
          5. MODE: CONFUSING PAIRS & EXAM TRAPS
         ────────────────────────────────────────────────────────── */}
      {activeMode === 'traps' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3 text-amber-800 dark:text-amber-300">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <h4 className="font-black text-sm">Top 10 High-Yield Exam Preposition Traps in SSC & Banking</h4>
              <p className="leading-relaxed">
                इन शब्दों के साथ अलग-अलग संदर्भ में Preposition बदल जाती है। SSC CGL/CHSL और Bank Exams में 80% प्रश्न इन्हीं Trap Pairs से पूछे जाते हैं:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {CONFUSING_PREPOSITION_PAIRS.map((group, gIdx) => (
              <div
                key={group.id}
                className="rounded-3xl p-5 sm:p-6 bg-white dark:bg-[#0B0D14] border border-slate-200 dark:border-white/10 shadow-sm space-y-4"
              >
                {/* Header: Title & Golden Rule */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-white/5">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black text-xs shrink-0">
                      #{gIdx + 1}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                      {group.title}
                    </h3>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-bold border border-sky-500/20">
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>{group.coreRule}</span>
                  </div>
                </div>

                {/* Comparison Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {group.items.map((item, iIdx) => (
                    <div
                      key={iIdx}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 space-y-2.5 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-base font-black text-slate-900 dark:text-white">
                            {item.phrase}
                          </span>
                          <span className="text-[10px] uppercase tracking-wider font-black px-2 py-0.5 rounded-full bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300">
                            {item.condition}
                          </span>
                        </div>
                        <div className="text-xs font-bold text-amber-600 dark:text-amber-400">
                          {item.hindiMeaning}
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-300 italic p-2 rounded-xl bg-white dark:bg-black/20 border border-slate-200/40 dark:border-white/5">
                          "{item.example}"
                        </div>
                      </div>

                      {item.trapWarning && (
                        <div className="mt-2 p-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-[11px] font-semibold leading-tight flex items-start gap-1.5">
                          <X className="w-3.5 h-3.5 shrink-0 mt-0.5 text-rose-500" />
                          <span>{item.trapWarning}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────
          6. MODE: PYQ SPEED QUIZ
         ────────────────────────────────────────────────────────── */}
      {activeMode === 'quiz' && (
        <div className="max-w-2xl mx-auto space-y-6">
          {!quizFinished ? (
            (() => {
              const currentQ = FIXED_PREPOSITIONS_QUIZ_DATA[quizIndex];
              const userAns = selectedOption;
              const hasAnswered = userAns !== null;
              const isCorrect = userAns !== null && userAns.toLowerCase() === currentQ.correctPreposition.toLowerCase();

              return (
                <div className="space-y-5">
                  {/* Top Progress & Score Bar */}
                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-[#0B0D14] border border-slate-200 dark:border-white/10 text-xs">
                    <span className="font-bold text-slate-500 dark:text-slate-400">
                      Question {quizIndex + 1} of {FIXED_PREPOSITIONS_QUIZ_DATA.length}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 font-black">
                        {currentQ.examTag}
                      </span>
                      <span className="font-black text-amber-500 flex items-center gap-1">
                        <Trophy className="w-3.5 h-3.5" />
                        Score: {quizScore}
                      </span>
                    </div>
                  </div>

                  {/* Question Card */}
                  <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B0D14] border border-slate-200 dark:border-white/10 shadow-lg space-y-6">
                    <div className="space-y-2">
                      <div className="text-[11px] uppercase tracking-wider font-black text-slate-400">
                        Choose the correct preposition:
                      </div>
                      <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-relaxed">
                        {currentQ.sentence}
                      </h3>
                      <p className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                        अर्थ: {currentQ.hindiMeaning}
                      </p>
                    </div>

                    {/* 4 Options Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      {currentQ.options.map(option => {
                        const isThisSelected = userAns === option;
                        const isThisCorrect = option.toLowerCase() === currentQ.correctPreposition.toLowerCase();

                        let btnStyle = 'bg-slate-50 dark:bg-white/[0.04] border-slate-200 dark:border-white/10 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/[0.08]';
                        if (hasAnswered) {
                          if (isThisCorrect) {
                            btnStyle = 'bg-emerald-500 text-white border-emerald-600 shadow-md scale-102';
                          } else if (isThisSelected) {
                            btnStyle = 'bg-rose-500 text-white border-rose-600 shadow-md';
                          } else {
                            btnStyle = 'opacity-40 bg-slate-100 dark:bg-white/5 border-transparent text-slate-400';
                          }
                        }

                        return (
                          <button
                            key={option}
                            type="button"
                            disabled={hasAnswered}
                            onClick={() => handleQuizOption(option)}
                            className={`p-4 rounded-2xl border text-sm sm:text-base font-black transition-all cursor-pointer text-center capitalize ${btnStyle}`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>

                    {/* Feedback & Explanation Card */}
                    {hasAnswered && (
                      <div
                        className={`p-4 rounded-2xl text-xs space-y-2 animate-fade-in border ${
                          isCorrect
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300'
                            : 'bg-rose-500/10 border-rose-500/30 text-rose-800 dark:text-rose-300'
                        }`}
                      >
                        <div className="flex items-center gap-2 font-black text-sm">
                          {isCorrect ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                              <span>Correct! Excellent memory!</span>
                            </>
                          ) : (
                            <>
                              <AlertTriangle className="w-4 h-4 text-rose-500" />
                              <span>Incorrect! Correct preposition is "{currentQ.correctPreposition.toUpperCase()}"</span>
                            </>
                          )}
                        </div>
                        <p className="leading-relaxed font-medium">
                          <strong>Rule: </strong>{currentQ.explanation}
                        </p>
                      </div>
                    )}

                    {/* Next Button */}
                    {hasAnswered && (
                      <div className="flex justify-end pt-2">
                        <button
                          type="button"
                          onClick={handleNextQuizQuestion}
                          className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs sm:text-sm font-black shadow-lg shadow-sky-500/25 flex items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95"
                        >
                          <span>{quizIndex + 1 === FIXED_PREPOSITIONS_QUIZ_DATA.length ? 'View Results' : 'Next Question'}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()
          ) : (
            // Quiz Completed Result Card
            <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0B0D14] border border-slate-200 dark:border-white/10 shadow-xl text-center space-y-6 animate-scale-up">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center mx-auto shadow-xl shadow-amber-500/30">
                <Trophy className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  Quiz Completed! 🎉
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  You scored <strong className="text-amber-500 text-base">{quizScore}</strong> out of{' '}
                  <strong className="text-slate-900 dark:text-white text-base">{FIXED_PREPOSITIONS_QUIZ_DATA.length}</strong>!
                </p>
              </div>

              {/* Score bar */}
              <div className="max-w-xs mx-auto p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/5 space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>Accuracy</span>
                  <span className="text-sky-500 font-black">
                    {Math.round((quizScore / FIXED_PREPOSITIONS_QUIZ_DATA.length) * 100)}%
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-sky-400 to-emerald-400 rounded-full"
                    style={{ width: `${(quizScore / FIXED_PREPOSITIONS_QUIZ_DATA.length) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleRestartQuiz}
                  className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs sm:text-sm font-black shadow-lg shadow-sky-500/25 flex items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Retake Quiz</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMode('cards')}
                  className="px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-800 dark:text-white text-xs sm:text-sm font-bold transition-all cursor-pointer"
                >
                  <span>Review Cards</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
