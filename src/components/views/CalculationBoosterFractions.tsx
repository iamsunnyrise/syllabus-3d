import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import {
  Percent,
  BookOpen,
  Target,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Play,
  Pause,
  Award,
  Flame,
  Trophy,
  Sparkles,
  Filter,
  Check,
  Clock,
  Star,
  Brain,
  Hash,
  BarChart2,
  ListOrdered,
  LayoutGrid,
  Search,
  ArrowRight,
  TrendingUp,
  HelpCircle,
  ChevronRight,
  Zap
} from 'lucide-react';
import { soundManager } from '../../utils/soundEffects';
import { haptics } from '../../utils/haptics';
import { fireCelebration } from '../../utils/confettiHelper';
import {
  FractionItem,
  FractionCategoryTab,
  FRACTION_CATEGORIES,
  FRACTION_ITEMS,
  FRACTION_TIPS_MAP
} from '../../data/calculationFractionsData';

// ---------------------------------------------------------------------
// STORAGE KEYS & DATA TYPES
// ---------------------------------------------------------------------
const STORAGE_KEY_MASTERED = 'syllabus3d_fractions_mastered_v1';
const STORAGE_KEY_STATS = 'syllabus3d_fractions_stats_v1';
const STORAGE_KEY_WEAK = 'syllabus3d_fractions_weak_v1';

export type BoosterMode = 'learn' | 'practice' | 'stats';
export type PracticeDirection = 'frac-to-pct' | 'pct-to-frac' | 'mixed';
export type PracticeType = 'mcq' | 'flashcard';
export type PracticeDuration = 'zen' | '60s';

interface FractionStats {
  totalAnswered: number;
  totalCorrect: number;
  bestStreak: number;
  blitzRecord: number;
}

const DEFAULT_STATS: FractionStats = {
  totalAnswered: 0,
  totalCorrect: 0,
  bestStreak: 0,
  blitzRecord: 0
};

interface QuestionState {
  item: FractionItem;
  direction: 'frac-to-pct' | 'pct-to-frac';
  prompt: string;
  correctAnswer: string;
  options: string[];
  userAnswer: string | null;
  isCorrect: boolean | null;
}

export const CalculationBoosterFractions: React.FC = () => {
  // Navigation Modes
  const [activeMode, setActiveMode] = useState<BoosterMode>('learn');

  // -------------------------------------------------------------------
  // PERSISTENCE STATE (Mastered & Stats)
  // -------------------------------------------------------------------
  const [masteredFractions, setMasteredFractions] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MASTERED);
      return saved ? new Set(JSON.parse(saved)) : new Set(['1/2', '1/4', '1/5', '1/10']);
    } catch {
      return new Set(['1/2', '1/4', '1/5', '1/10']);
    }
  });

  const [stats, setStats] = useState<FractionStats>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STATS);
      return saved ? { ...DEFAULT_STATS, ...JSON.parse(saved) } : DEFAULT_STATS;
    } catch {
      return DEFAULT_STATS;
    }
  });

  const [weakFractions, setWeakFractions] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_WEAK);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const saveStats = useCallback((updater: (prev: FractionStats) => FractionStats) => {
    setStats(prev => {
      const next = updater(prev);
      try {
        localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const recordMistake = useCallback((fractionId: string) => {
    setWeakFractions(prev => {
      const next = { ...prev, [fractionId]: (prev[fractionId] || 0) + 1 };
      try {
        localStorage.setItem(STORAGE_KEY_WEAK, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const clearMistake = useCallback((fractionId: string) => {
    setWeakFractions(prev => {
      if (!prev[fractionId]) return prev;
      const next = { ...prev };
      delete next[fractionId];
      try {
        localStorage.setItem(STORAGE_KEY_WEAK, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const toggleMastered = (id: string) => {
    soundManager.playSuccess();
    haptics.success();
    setMasteredFractions(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        fireCelebration({ particleCount: 25, spread: 50, origin: { y: 0.8 } });
      }
      try {
        localStorage.setItem(STORAGE_KEY_MASTERED, JSON.stringify([...next]));
      } catch {}
      return next;
    });
  };

  // -------------------------------------------------------------------
  // LEARN MODE STATE
  // -------------------------------------------------------------------
  const [selectedCategory, setSelectedCategory] = useState<FractionCategoryTab>('basic');
  const [searchQuery, setSearchQuery] = useState('');
  const [hidePercentages, setHidePercentages] = useState(false);
  const [revealedCards, setRevealedCards] = useState<Set<string>>(new Set());
  const [layoutMode, setLayoutMode] = useState<'list' | 'grid'>('list');
  const [voiceSpeechEnabled, setVoiceSpeechEnabled] = useState(true);

  // Filtered Items for Learn Mode
  const filteredFractions = useMemo(() => {
    return FRACTION_ITEMS.filter(item => {
      // Category filter
      if (selectedCategory === 'weak') {
        if (!weakFractions[item.id]) return false;
      } else if (selectedCategory !== 'all') {
        if (item.category !== selectedCategory) return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesFraction = item.fraction.toLowerCase().includes(query);
        const matchesPct = item.decimalPercentage.toLowerCase().includes(query);
        const matchesMixed = item.mixedPercentage?.toLowerCase().includes(query);
        const matchesDecimal = item.decimalValue.includes(query);
        if (!matchesFraction && !matchesPct && !matchesMixed && !matchesDecimal) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, searchQuery, weakFractions]);

  const toggleCardReveal = (id: string) => {
    setRevealedCards(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Audio speech synthesis helper
  const speakFraction = (item: FractionItem) => {
    if (!voiceSpeechEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const textToSpeak = `${item.fraction} equals ${item.decimalPercentage}`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch {}
  };

  // -------------------------------------------------------------------
  // PRACTICE DRILL STATE
  // -------------------------------------------------------------------
  const [practiceCategory, setPracticeCategory] = useState<FractionCategoryTab>('all');
  const [practiceDirection, setPracticeDirection] = useState<PracticeDirection>('frac-to-pct');
  const [practiceType, setPracticeType] = useState<PracticeType>('mcq');
  const [practiceDuration, setPracticeDuration] = useState<PracticeDuration>('60s');

  const [drillActive, setDrillActive] = useState(false);
  const [drillFinished, setDrillFinished] = useState(false);
  const [timerRemaining, setTimerRemaining] = useState(60);
  const [streak, setStreak] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [drillAnswered, setDrillAnswered] = useState(0);
  const [drillCorrect, setDrillCorrect] = useState(0);
  const [drillMistakes, setDrillMistakes] = useState<QuestionState[]>([]);
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState<QuestionState | null>(null);

  // Pool of candidate items for practice
  const practicePool = useMemo(() => {
    if (practiceCategory === 'weak') {
      const weakList = FRACTION_ITEMS.filter(f => weakFractions[f.id]);
      return weakList.length > 0 ? weakList : FRACTION_ITEMS;
    }
    if (practiceCategory === 'all') return FRACTION_ITEMS;
    return FRACTION_ITEMS.filter(f => f.category === practiceCategory);
  }, [practiceCategory, weakFractions]);

  // Generate a random question
  const generateQuestion = useCallback((): QuestionState => {
    const pool = practicePool.length > 0 ? practicePool : FRACTION_ITEMS;
    const randomItem = pool[Math.floor(Math.random() * pool.length)];

    let dir: 'frac-to-pct' | 'pct-to-frac' = 'frac-to-pct';
    if (practiceDirection === 'pct-to-frac') {
      dir = 'pct-to-frac';
    } else if (practiceDirection === 'mixed') {
      dir = Math.random() > 0.5 ? 'frac-to-pct' : 'pct-to-frac';
    }

    if (dir === 'frac-to-pct') {
      // Prompt: Fraction (e.g. 3/8) -> Answer: Percentage (e.g. 37.5% or 37 ½%)
      const prompt = randomItem.fraction;
      const correctAnswer = randomItem.displayPercentage;

      // Generate 3 distractors
      const distractors = FRACTION_ITEMS
        .filter(f => f.id !== randomItem.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(f => f.displayPercentage);

      const options = [correctAnswer, ...distractors].sort(() => 0.5 - Math.random());

      return {
        item: randomItem,
        direction: dir,
        prompt,
        correctAnswer,
        options,
        userAnswer: null,
        isCorrect: null
      };
    } else {
      // Prompt: Percentage (e.g. 37.5% or 37 ½%) -> Answer: Fraction (e.g. 3/8)
      const prompt = randomItem.displayPercentage;
      const correctAnswer = randomItem.fraction;

      // Generate 3 distractors
      const distractors = FRACTION_ITEMS
        .filter(f => f.id !== randomItem.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(f => f.fraction);

      const options = [correctAnswer, ...distractors].sort(() => 0.5 - Math.random());

      return {
        item: randomItem,
        direction: dir,
        prompt,
        correctAnswer,
        options,
        userAnswer: null,
        isCorrect: null
      };
    }
  }, [practicePool, practiceDirection]);

  // Start a new practice session
  const handleStartDrill = () => {
    soundManager.playClick();
    haptics.selection();
    setDrillActive(true);
    setDrillFinished(false);
    setStreak(0);
    setCurrentScore(0);
    setDrillAnswered(0);
    setDrillCorrect(0);
    setDrillMistakes([]);
    setFlashcardFlipped(false);
    setTimerRemaining(practiceDuration === '60s' ? 60 : 0);

    const q = generateQuestion();
    setCurrentQuestion(q);
  };

  // Answer a question
  const handleSelectOption = (selected: string) => {
    if (!currentQuestion || currentQuestion.userAnswer !== null) return;

    const isCorrect = selected === currentQuestion.correctAnswer;
    const answeredQuestion: QuestionState = {
      ...currentQuestion,
      userAnswer: selected,
      isCorrect
    };

    setCurrentQuestion(answeredQuestion);
    setDrillAnswered(prev => prev + 1);

    if (isCorrect) {
      soundManager.playSuccess();
      haptics.success();
      setDrillCorrect(prev => prev + 1);
      const newStreak = streak + 1;
      setStreak(newStreak);
      setCurrentScore(prev => prev + 10 + Math.min(newStreak * 2, 20));

      if (newStreak % 5 === 0) {
        fireCelebration({ particleCount: 30, spread: 60 });
      }

      // Clear from weak list if was present
      clearMistake(currentQuestion.item.id);

      saveStats(prev => ({
        ...prev,
        totalAnswered: prev.totalAnswered + 1,
        totalCorrect: prev.totalCorrect + 1,
        bestStreak: Math.max(prev.bestStreak, newStreak),
        blitzRecord: Math.max(prev.blitzRecord, currentScore + 10)
      }));
    } else {
      soundManager.playError();
      haptics.error();
      setStreak(0);
      setDrillMistakes(prev => [...prev, answeredQuestion]);
      recordMistake(currentQuestion.item.id);

      saveStats(prev => ({
        ...prev,
        totalAnswered: prev.totalAnswered + 1
      }));
    }

    // Auto proceed to next question after 600ms
    setTimeout(() => {
      if (practiceDuration === '60s' && timerRemaining <= 1) {
        handleFinishDrill();
      } else {
        setFlashcardFlipped(false);
        setCurrentQuestion(generateQuestion());
      }
    }, 600);
  };

  // Flashcard self-grading (Got it / Missed it)
  const handleRateFlashcard = (isCorrect: boolean) => {
    if (!currentQuestion) return;

    setDrillAnswered(prev => prev + 1);
    if (isCorrect) {
      soundManager.playSuccess();
      haptics.success();
      setDrillCorrect(prev => prev + 1);
      const newStreak = streak + 1;
      setStreak(newStreak);
      clearMistake(currentQuestion.item.id);

      saveStats(prev => ({
        ...prev,
        totalAnswered: prev.totalAnswered + 1,
        totalCorrect: prev.totalCorrect + 1,
        bestStreak: Math.max(prev.bestStreak, newStreak)
      }));
    } else {
      soundManager.playError();
      haptics.error();
      setStreak(0);
      setDrillMistakes(prev => [...prev, currentQuestion]);
      recordMistake(currentQuestion.item.id);

      saveStats(prev => ({
        ...prev,
        totalAnswered: prev.totalAnswered + 1
      }));
    }

    setFlashcardFlipped(false);
    setCurrentQuestion(generateQuestion());
  };

  const handleFinishDrill = () => {
    setDrillActive(false);
    setDrillFinished(true);
    soundManager.playSuccess();
    haptics.success();
    fireCelebration({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
  };

  // Countdown timer effect for 60s Blitz mode
  useEffect(() => {
    if (!drillActive || practiceDuration !== '60s') return;

    const interval = setInterval(() => {
      setTimerRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleFinishDrill();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [drillActive, practiceDuration]);

  // Keyboard hotkeys for MCQ answers (1, 2, 3, 4)
  useEffect(() => {
    if (!drillActive || practiceType !== 'mcq' || !currentQuestion || currentQuestion.userAnswer !== null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['1', '2', '3', '4'].includes(e.key)) {
        const idx = parseInt(e.key) - 1;
        if (currentQuestion.options[idx]) {
          handleSelectOption(currentQuestion.options[idx]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [drillActive, practiceType, currentQuestion]);

  return (
    <div className="space-y-6 font-sans select-none animate-fade-in">
      {/* ═══════════════════════════════════════════════════════════════
          TOP HEADER BANNER & MODE SELECTOR
          ═══════════════════════════════════════════════════════════════ */}
      <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-6 bg-white dark:bg-[#121424] border border-slate-200/90 dark:border-white/10 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 via-teal-500/15 to-emerald-500/20 border border-emerald-400/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-xs shrink-0">
            <Percent className="w-6 h-6 stroke-[2.3]" />
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
                Percentage to Fraction Master
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/25">
                {masteredFractions.size} / {FRACTION_ITEMS.length} Mastered
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              High-yield conversions (1/1 to 1/40) for split-second Arithmetic, Profit & Loss, and Data Interpretation.
            </p>
          </div>
        </div>

        {/* Mode Toggle Switcher */}
        <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-white/[0.06] border border-slate-200/80 dark:border-white/10 self-start md:self-auto shrink-0 shadow-2xs">
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setActiveMode('learn');
            }}
            className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'learn'
                ? 'bg-white dark:bg-[#1A1D2E] text-slate-900 dark:text-white shadow-xs font-black'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
            <span>Learn & Chart</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setActiveMode('practice');
            }}
            className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'practice'
                ? 'bg-emerald-600 text-white shadow-xs font-black'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Speed Practice Drill</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setActiveMode('stats');
            }}
            className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'stats'
                ? 'bg-white dark:bg-[#1A1D2E] text-slate-900 dark:text-white shadow-xs font-black'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5 text-indigo-500" />
            <span>My Stats</span>
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1: LEARN & EXPLORE (CHART VIEW)
          ═══════════════════════════════════════════════════════════════ */}
      {activeMode === 'learn' && (
        <div className="space-y-4">
          {/* Controls Bar: Category Tabs, Search, Active Recall & Layout */}
          <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121424] border border-slate-200/90 dark:border-white/10 shadow-xs space-y-3.5">
            {/* Category Tabs matching PDF Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {FRACTION_CATEGORIES.map(cat => {
                const isSelected = selectedCategory === cat.id;
                const count = cat.id === 'all'
                  ? FRACTION_ITEMS.length
                  : cat.id === 'weak'
                  ? Object.keys(weakFractions).length
                  : FRACTION_ITEMS.filter(f => f.category === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedCategory(cat.id);
                    }}
                    className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-xs font-black ring-2 ring-emerald-400/30'
                        : 'bg-slate-100 dark:bg-white/[0.05] text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                      isSelected ? 'bg-black/20 text-white' : 'bg-black/5 dark:bg-white/10 text-slate-500 dark:text-slate-400'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Sub-controls: Search & Tools */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-white/[0.06]">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search fractions (e.g. 1/7, 37.5%, 33 1/3)..."
                  className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-50 dark:bg-[#161828] border border-slate-200/80 dark:border-white/[0.08] text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white p-0.5"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Utility Toggles */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* Active Recall Toggle */}
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setHidePercentages(prev => !prev);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    hidePercentages
                      ? 'bg-amber-500/15 border-amber-500/30 text-amber-700 dark:text-amber-300'
                      : 'bg-slate-100 dark:bg-white/[0.06] border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300'
                  }`}
                  title="Hide answers to test active recall memory"
                >
                  {hidePercentages ? <EyeOff className="w-3.5 h-3.5 text-amber-500" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{hidePercentages ? 'Active Recall (Hidden)' : 'Hide Answers'}</span>
                </button>

                {/* Voice Pronunciation Toggle */}
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setVoiceSpeechEnabled(prev => !prev);
                  }}
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                    voiceSpeechEnabled
                      ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                      : 'bg-slate-100 dark:bg-white/[0.06] border-slate-200 dark:border-white/10 text-slate-400'
                  }`}
                  title={voiceSpeechEnabled ? 'Voice pronunciation enabled' : 'Voice pronunciation muted'}
                >
                  {voiceSpeechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>

                {/* Layout Switcher (List vs Grid) */}
                <div className="flex items-center rounded-xl bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/10 p-0.5">
                  <button
                    type="button"
                    onClick={() => setLayoutMode('list')}
                    className={`p-1.5 rounded-lg transition-all ${
                      layoutMode === 'list' ? 'bg-white dark:bg-[#1A1D2E] text-slate-900 dark:text-white shadow-2xs' : 'text-slate-400 hover:text-slate-700'
                    }`}
                    title="List View (Reference Style)"
                  >
                    <ListOrdered className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setLayoutMode('grid')}
                    className={`p-1.5 rounded-lg transition-all ${
                      layoutMode === 'grid' ? 'bg-white dark:bg-[#1A1D2E] text-slate-900 dark:text-white shadow-2xs' : 'text-slate-400 hover:text-slate-700'
                    }`}
                    title="Grid Cards View"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              FRACTION CARDS / LIST DISPLAY
              ───────────────────────────────────────────────────────────── */}
          {filteredFractions.length === 0 ? (
            <div className="text-center py-12 rounded-3xl bg-white dark:bg-[#121424] border border-slate-200 dark:border-white/10 p-6 space-y-3">
              <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
              <h4 className="text-base font-bold text-slate-800 dark:text-slate-200">No fractions found</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try searching with a different fraction or select "All Fractions" tab.
              </p>
            </div>
          ) : layoutMode === 'list' ? (
            /* Reference List View (Matching user's PDF layout exactly) */
            <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121424] border border-slate-200/90 dark:border-white/10 overflow-hidden shadow-xs divide-y divide-slate-100 dark:divide-white/[0.06]">
              {filteredFractions.map(item => {
                const isMastered = masteredFractions.has(item.id);
                const isWeak = Boolean(weakFractions[item.id]);
                const isHidden = hidePercentages && !revealedCards.has(item.id);

                return (
                  <div
                    key={item.id}
                    className="p-3 sm:px-6 sm:py-3.5 flex items-center justify-between hover:bg-slate-50/80 dark:hover:bg-white/[0.02] transition-colors group"
                  >
                    {/* Left: Equation in Big Bold Clean Typography */}
                    <div className="flex items-center gap-3 sm:gap-6 min-w-0">
                      {/* Fraction */}
                      <span className="font-mono text-base sm:text-xl font-black text-slate-900 dark:text-white w-14 sm:w-16 shrink-0 text-right">
                        {item.fraction}
                      </span>

                      <span className="text-slate-400 font-mono text-sm sm:text-base font-bold shrink-0">
                        =
                      </span>

                      {/* Percentage Display */}
                      <div className="min-w-0">
                        {isHidden ? (
                          <button
                            type="button"
                            onClick={() => toggleCardReveal(item.id)}
                            className="px-3 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-700 dark:text-amber-300 font-mono font-bold text-xs transition-all cursor-pointer border border-amber-500/30"
                          >
                            👁️ Tap to Reveal
                          </button>
                        ) : (
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm sm:text-lg font-mono font-bold text-slate-900 dark:text-white">
                              {item.displayPercentage}
                            </span>
                            {item.decimalValue && (
                              <span className="hidden md:inline text-[11px] font-mono text-slate-400">
                                ({item.decimalValue})
                              </span>
                            )}
                          </div>
                        )}
                        {item.tip && !isHidden && (
                          <p className="text-[11px] text-amber-600 dark:text-amber-400 font-sans mt-0.5 hidden sm:block">
                            💡 {item.tip}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Right: Actions (Pronounce & Master Checkmark) */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      {/* Speak button */}
                      <button
                        type="button"
                        onClick={() => speakFraction(item)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/15 transition-colors cursor-pointer"
                        title="Listen pronunciation"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>

                      {/* Mastered Star / Check */}
                      <button
                        type="button"
                        onClick={() => toggleMastered(item.id)}
                        className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                          isMastered
                            ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/15'
                            : 'text-slate-300 dark:text-slate-600 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/15'
                        }`}
                        title={isMastered ? 'Mastered (Tap to unmark)' : 'Mark as Mastered'}
                      >
                        {isMastered ? <CheckCircle2 className="w-4 h-4 fill-emerald-500 text-white" /> : <Star className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Modern Grid Cards View */
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {filteredFractions.map(item => {
                const isMastered = masteredFractions.has(item.id);
                const isHidden = hidePercentages && !revealedCards.has(item.id);

                return (
                  <div
                    key={item.id}
                    className={`p-4 rounded-2xl sm:rounded-3xl border bg-white dark:bg-[#121424] transition-all duration-200 select-none shadow-xs hover:shadow-md flex flex-col justify-between space-y-3 relative overflow-hidden group ${
                      isMastered
                        ? 'border-emerald-500/40 dark:border-emerald-500/30'
                        : 'border-slate-200/90 dark:border-white/10 hover:border-emerald-400/50'
                    }`}
                  >
                    {/* Top Row: Mastered Pill & Audio */}
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/[0.06] text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400">
                        {item.categoryLabel}
                      </span>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => speakFraction(item)}
                          className="p-1 text-slate-400 hover:text-emerald-500"
                          title="Speak"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleMastered(item.id)}
                          className="p-1 cursor-pointer"
                          title={isMastered ? 'Mastered' : 'Mark mastered'}
                        >
                          {isMastered ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-500 text-white" />
                          ) : (
                            <Star className="w-4 h-4 text-slate-300 hover:text-amber-500" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Middle: Big Fraction & Value */}
                    <div className="text-center py-2 space-y-1">
                      <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white tracking-tight">
                        {item.fraction}
                      </div>

                      <div className="text-xs font-mono text-slate-400">=</div>

                      {isHidden ? (
                        <button
                          type="button"
                          onClick={() => toggleCardReveal(item.id)}
                          className="px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-700 dark:text-amber-300 font-mono font-bold text-xs transition-all cursor-pointer border border-amber-500/30 w-full"
                        >
                          👁️ Reveal
                        </button>
                      ) : (
                        <div className="text-base sm:text-lg font-mono font-extrabold text-emerald-600 dark:text-emerald-400">
                          {item.displayPercentage}
                        </div>
                      )}
                    </div>

                    {/* Bottom: Pro Tip if present */}
                    {item.tip && !isHidden && (
                      <div className="text-[10px] text-amber-700 dark:text-amber-300/90 bg-amber-500/10 p-2 rounded-xl border border-amber-500/20 leading-snug">
                        💡 {item.tip}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Bottom Quick Exam Memory Hacks Pill */}
          <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent border border-amber-400/30 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-amber-900 dark:text-amber-200">
                  Ready to test your split-second conversion speed?
                </h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  Switch to Speed Practice Drill for timed 60s sprints & active recall streaks.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setActiveMode('practice');
              }}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <span>Launch Speed Drill</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2: SPEED PRACTICE DRILL ENGINE
          ═══════════════════════════════════════════════════════════════ */}
      {activeMode === 'practice' && (
        <div className="space-y-6">
          {!drillActive && !drillFinished ? (
            /* Setup Phase Card */
            <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#121424] border border-slate-200/90 dark:border-white/10 shadow-xs space-y-7">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-3xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
                  <Target className="w-8 h-8" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  Fraction to Percentage Speed Drill
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
                  Master rapid mental conversion reflexes. In SSC & Banking exams, knowing 1/7 = 14.28% or 3/8 = 37.5% saves 30+ seconds per question!
                </p>
              </div>

              {/* Setting 1: Select Category Range */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono">
                  1. Select Question Category:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                  {[
                    { id: 'all', label: 'All Fractions (1 to 1/40)' },
                    { id: 'basic', label: 'Basic (1 to 4/7)' },
                    { id: '1/7-1/11', label: '1/7 - 1/11 (High Yield)' },
                    { id: '1/12-1/20', label: '1/12 - 1/20 (Advanced)' },
                    { id: '1/24-1/40', label: '1/24 - 1/40 (Challenger)' },
                    { id: 'weak', label: 'Mistakes & Weak Only' }
                  ].map(r => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        setPracticeCategory(r.id as FractionCategoryTab);
                      }}
                      className={`p-3 rounded-2xl border text-xs font-bold text-left transition-all cursor-pointer ${
                        practiceCategory === r.id
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs ring-2 ring-emerald-400/30'
                          : 'bg-slate-50 dark:bg-[#161828] border-slate-200/80 dark:border-white/[0.06] text-slate-700 dark:text-slate-300 hover:border-emerald-500/40'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Setting 2 & 3: Direction & Duration */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Setting 2: Direction */}
                <div className="space-y-2.5 md:col-span-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono">
                    2. Conversion Direction:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        setPracticeDirection('frac-to-pct');
                      }}
                      className={`p-3.5 rounded-2xl border text-xs font-bold transition-all cursor-pointer text-left ${
                        practiceDirection === 'frac-to-pct'
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-slate-50 dark:bg-[#161828] border-slate-200/80 dark:border-white/[0.06] text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div>Fraction ➔ Percentage</div>
                      <div className="text-[10px] font-normal opacity-80 mt-0.5">e.g. 3/8 ➔ 37.5%</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        setPracticeDirection('pct-to-frac');
                      }}
                      className={`p-3.5 rounded-2xl border text-xs font-bold transition-all cursor-pointer text-left ${
                        practiceDirection === 'pct-to-frac'
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-slate-50 dark:bg-[#161828] border-slate-200/80 dark:border-white/[0.06] text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div>Percentage ➔ Fraction</div>
                      <div className="text-[10px] font-normal opacity-80 mt-0.5">e.g. 14.28% ➔ 1/7</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        setPracticeDirection('mixed');
                      }}
                      className={`p-3.5 rounded-2xl border text-xs font-bold transition-all cursor-pointer text-left ${
                        practiceDirection === 'mixed'
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-slate-50 dark:bg-[#161828] border-slate-200/80 dark:border-white/[0.06] text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div>Mixed Both Randomly</div>
                      <div className="text-[10px] font-normal opacity-80 mt-0.5">Ultimate exam simulation</div>
                    </button>
                  </div>
                </div>

                {/* Setting 3: Timer */}
                <div className="space-y-2.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono">
                    3. Duration Mode:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        setPracticeDuration('60s');
                      }}
                      className={`p-3.5 rounded-2xl border text-xs font-bold transition-all cursor-pointer text-center ${
                        practiceDuration === '60s'
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-slate-50 dark:bg-[#161828] border-slate-200/80 dark:border-white/[0.06] text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <Clock className="w-4 h-4 mx-auto mb-1" />
                      <div>60s Blitz</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        setPracticeDuration('zen');
                      }}
                      className={`p-3.5 rounded-2xl border text-xs font-bold transition-all cursor-pointer text-center ${
                        practiceDuration === 'zen'
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-slate-50 dark:bg-[#161828] border-slate-200/80 dark:border-white/[0.06] text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <Brain className="w-4 h-4 mx-auto mb-1" />
                      <div>Zen (Untimed)</div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Start Drill Button */}
              <button
                type="button"
                onClick={handleStartDrill}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm sm:text-base transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Start Speed Conversion Drill</span>
              </button>
            </div>
          ) : drillActive && currentQuestion ? (
            /* Active Drill Question Arena */
            <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#121424] border border-slate-200/90 dark:border-white/10 shadow-lg space-y-6 max-w-2xl mx-auto">
              {/* Drill Progress Bar & Live Heads-Up Display */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/[0.06]">
                <div className="flex items-center gap-3">
                  {practiceDuration === '60s' ? (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300 font-mono font-bold text-sm">
                      <Clock className="w-4 h-4 animate-spin-slow" />
                      <span>{timerRemaining}s</span>
                    </div>
                  ) : (
                    <div className="text-xs font-mono font-bold text-slate-500">
                      Question #{drillAnswered + 1}
                    </div>
                  )}

                  {streak >= 2 && (
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-orange-500/15 border border-orange-500/30 text-orange-600 dark:text-orange-400 font-mono font-black text-xs animate-bounce-subtle">
                      <Flame className="w-4 h-4 fill-current text-orange-500" />
                      <span>{streak} Streak!</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                    ✓ {drillCorrect}
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">/</span>
                  <span className="text-slate-600 dark:text-slate-400 font-medium">
                    {drillAnswered}
                  </span>

                  <button
                    type="button"
                    onClick={handleFinishDrill}
                    className="ml-3 px-3 py-1 rounded-lg bg-slate-100 dark:bg-white/[0.08] hover:bg-slate-200 text-slate-600 dark:text-slate-300 text-xs font-bold cursor-pointer"
                  >
                    Finish
                  </button>
                </div>
              </div>

              {/* Big Question Prompt Card */}
              <div className="py-10 px-6 rounded-3xl bg-gradient-to-br from-emerald-500/[0.08] via-teal-500/[0.04] to-transparent border border-emerald-400/30 text-center space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                  {currentQuestion.direction === 'frac-to-pct'
                    ? 'What is the percentage for:'
                    : 'What fraction equals:'}
                </span>

                <div className="text-4xl sm:text-6xl font-black font-mono tracking-tight text-slate-900 dark:text-white py-2">
                  {currentQuestion.prompt}
                </div>
              </div>

              {/* 4 MCQ Answer Options (Keys 1, 2, 3, 4) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQuestion.options.map((opt, idx) => {
                  const isSelected = currentQuestion.userAnswer === opt;
                  const isAnswered = currentQuestion.userAnswer !== null;
                  const isThisCorrect = opt === currentQuestion.correctAnswer;

                  let btnStyle = 'bg-slate-50 dark:bg-[#161828] border-slate-200/90 dark:border-white/[0.08] text-slate-800 dark:text-slate-100 hover:border-emerald-500/50 hover:bg-emerald-50/50';

                  if (isAnswered) {
                    if (isThisCorrect) {
                      btnStyle = 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-400/40';
                    } else if (isSelected && !isThisCorrect) {
                      btnStyle = 'bg-rose-600 text-white border-rose-600 shadow-md';
                    } else {
                      btnStyle = 'bg-slate-50 dark:bg-[#161828] border-slate-200 dark:border-white/5 opacity-40';
                    }
                  }

                  return (
                    <button
                      key={opt}
                      type="button"
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(opt)}
                      className={`p-4 rounded-2xl border font-mono text-sm sm:text-base font-bold transition-all duration-150 flex items-center justify-between cursor-pointer active:scale-98 ${btnStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-black/10 dark:bg-white/10 text-xs font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span>{opt}</span>
                      </div>

                      {isAnswered && isThisCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                      )}
                      {isAnswered && isSelected && !isThisCorrect && (
                        <XCircle className="w-5 h-5 text-white shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="text-center text-[11px] text-slate-400 font-mono">
                Keyboard Shortcuts: Press <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/10 font-bold">1</kbd>, <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/10 font-bold">2</kbd>, <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/10 font-bold">3</kbd>, <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/10 font-bold">4</kbd> on your keyboard!
              </div>
            </div>
          ) : (
            /* Drill Results Summary Screen */
            <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#121424] border border-slate-200/90 dark:border-white/10 shadow-xl space-y-7 max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
                <Trophy className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  Sprint Complete!
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Great effort sharpening your mental arithmetic conversions.
                </p>
              </div>

              {/* 3 Metric Summary Boxes */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#161828] border border-slate-200/80 dark:border-white/10">
                  <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                    {drillCorrect}/{drillAnswered}
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase font-mono mt-1">
                    Correct
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#161828] border border-slate-200/80 dark:border-white/10">
                  <div className="text-2xl sm:text-3xl font-black font-mono text-blue-600 dark:text-blue-400">
                    {drillAnswered > 0 ? Math.round((drillCorrect / drillAnswered) * 100) : 0}%
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase font-mono mt-1">
                    Accuracy
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#161828] border border-slate-200/80 dark:border-white/10">
                  <div className="text-2xl sm:text-3xl font-black font-mono text-orange-500">
                    {stats.bestStreak}
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase font-mono mt-1">
                    Best Streak
                  </div>
                </div>
              </div>

              {/* Mistake Review Section */}
              {drillMistakes.length > 0 && (
                <div className="text-left space-y-2 pt-2">
                  <h4 className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider font-mono">
                    Items to review ({drillMistakes.length}):
                  </h4>
                  <div className="max-h-48 overflow-y-auto space-y-2 no-scrollbar">
                    {drillMistakes.map((m, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs flex items-center justify-between"
                      >
                        <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                          {m.prompt}
                        </span>
                        <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                          = {m.correctAnswer}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Next Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleStartDrill}
                  className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Practice Again</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setDrillActive(false);
                    setDrillFinished(false);
                  }}
                  className="px-5 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm transition-all cursor-pointer"
                >
                  Change Settings
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3: STATS & WEAK ITEMS BREAKDOWN
          ═══════════════════════════════════════════════════════════════ */}
      {activeMode === 'stats' && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#121424] border border-slate-200/90 dark:border-white/10 shadow-xs space-y-6">
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-emerald-500" />
              <span>Conversion Mastery & Performance Analytics</span>
            </h3>

            {/* 4 Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#161828] border border-slate-200/80 dark:border-white/10">
                <div className="text-xs font-mono text-slate-400 font-bold uppercase">Total Drilled</div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white mt-1">
                  {stats.totalAnswered}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#161828] border border-slate-200/80 dark:border-white/10">
                <div className="text-xs font-mono text-slate-400 font-bold uppercase">Accuracy</div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">
                  {stats.totalAnswered > 0 ? Math.round((stats.totalCorrect / stats.totalAnswered) * 100) : 0}%
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#161828] border border-slate-200/80 dark:border-white/10">
                <div className="text-xs font-mono text-slate-400 font-bold uppercase">Best Streak</div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-orange-500 mt-1">
                  {stats.bestStreak}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#161828] border border-slate-200/80 dark:border-white/10">
                <div className="text-xs font-mono text-slate-400 font-bold uppercase">Mastered Count</div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-blue-600 dark:text-blue-400 mt-1">
                  {masteredFractions.size} / {FRACTION_ITEMS.length}
                </div>
              </div>
            </div>

            {/* Weak Items List if any */}
            {Object.keys(weakFractions).length > 0 ? (
              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-white/[0.06]">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2">
                    <span>⚠️ Difficult Conversions ({Object.keys(weakFractions).length})</span>
                  </h4>
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setPracticeCategory('weak');
                      setActiveMode('practice');
                      handleStartDrill();
                    }}
                    className="px-3 py-1.5 rounded-xl bg-rose-600 text-white font-bold text-xs cursor-pointer hover:bg-rose-500 shadow-xs"
                  >
                    Drill Weak Items Now
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {Object.entries(weakFractions).map(([fid, count]) => {
                    const item = FRACTION_ITEMS.find(f => f.id === fid);
                    if (!item) return null;
                    return (
                      <div
                        key={fid}
                        className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 flex items-center justify-between text-xs"
                      >
                        <span className="font-mono font-bold text-slate-900 dark:text-white">
                          {item.fraction} = {item.displayPercentage}
                        </span>
                        <span className="text-[10px] font-mono text-rose-600 dark:text-rose-400 font-bold">
                          {count} {count === 1 ? 'miss' : 'misses'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Zero weak conversion traps! You are on top of all fraction-percentage mappings.</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
