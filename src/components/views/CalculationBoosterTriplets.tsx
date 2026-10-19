import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import {
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
  Zap,
  Triangle,
  Info
} from 'lucide-react';
import { soundManager } from '../../utils/soundEffects';
import { haptics } from '../../utils/haptics';
import { fireCelebration } from '../../utils/confettiHelper';
import {
  TripletItem,
  TripletCategoryTab,
  TRIPLET_CATEGORIES,
  PYTHAGOREAN_TRIPLETS,
  TRIPLET_GENERATION_RULES
} from '../../data/calculationTripletsData';

// ---------------------------------------------------------------------
// STORAGE KEYS & CONSTANTS
// ---------------------------------------------------------------------
const STORAGE_KEY_MASTERED_TRIPLETS = 'syllabus3d_triplets_mastered_v1';
const STORAGE_KEY_STATS_TRIPLETS = 'syllabus3d_triplets_stats_v1';
const STORAGE_KEY_WEAK_TRIPLETS = 'syllabus3d_triplets_weak_v1';

export type TripletsBoosterMode = 'learn' | 'practice' | 'rules' | 'stats';
export type PracticeDirection = 'hypotenuse' | 'leg' | 'identify' | 'mixed';
export type PracticeType = 'mcq' | 'flashcard';
export type PracticeDuration = 'zen' | '60s';

interface TripletStats {
  totalAnswered: number;
  totalCorrect: number;
  bestStreak: number;
  blitzRecord: number;
  lastPracticed?: string;
}

interface QuestionState {
  id: string;
  item: TripletItem;
  prompt: string;
  subPrompt: string;
  expectedAnswer: string;
  options: string[];
  userAnswer?: string;
  isCorrect?: boolean;
  type: 'hypotenuse' | 'leg' | 'identify';
}

export const CalculationBoosterTriplets: React.FC = () => {
  // Navigation & View Mode
  const [activeMode, setActiveMode] = useState<TripletsBoosterMode>('learn');
  const [selectedCategory, setSelectedCategory] = useState<TripletCategoryTab>('P1');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewStyle, setViewStyle] = useState<'grid' | 'table'>('grid');

  // Active Recall Mode (Hide Hypotenuse / Hide Leg)
  const [hideMode, setHideMode] = useState<'none' | 'hypotenuse' | 'leg'>('none');
  const [audioEnabled, setAudioEnabled] = useState(true);

  // Selected Triplet for visual diagram inspection
  const [inspectedTriplet, setInspectedTriplet] = useState<TripletItem | null>(null);

  // Persistence (Mastered & Weak items)
  const [masteredIds, setMasteredIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MASTERED_TRIPLETS);
      return saved ? new Set(JSON.parse(saved)) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  });

  const [weakIds, setWeakIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_WEAK_TRIPLETS);
      return saved ? new Set(JSON.parse(saved)) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  });

  const [stats, setStats] = useState<TripletStats>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STATS_TRIPLETS);
      return saved
        ? JSON.parse(saved)
        : { totalAnswered: 0, totalCorrect: 0, bestStreak: 0, blitzRecord: 0 };
    } catch {
      return { totalAnswered: 0, totalCorrect: 0, bestStreak: 0, blitzRecord: 0 };
    }
  });

  // Save changes to localStorage
  const saveMastered = useCallback((newSet: Set<string>) => {
    setMasteredIds(newSet);
    try {
      localStorage.setItem(STORAGE_KEY_MASTERED_TRIPLETS, JSON.stringify(Array.from(newSet)));
    } catch {}
  }, []);

  const recordMistake = useCallback((id: string) => {
    setWeakIds(prev => {
      const next = new Set(prev).add(id);
      try {
        localStorage.setItem(STORAGE_KEY_WEAK_TRIPLETS, JSON.stringify(Array.from(next)));
      } catch {}
      return next;
    });
  }, []);

  const clearMistake = useCallback((id: string) => {
    setWeakIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      try {
        localStorage.setItem(STORAGE_KEY_WEAK_TRIPLETS, JSON.stringify(Array.from(next)));
      } catch {}
      return next;
    });
  }, []);

  const saveStats = useCallback((updater: (prev: TripletStats) => TripletStats) => {
    setStats(prev => {
      const updated = updater(prev);
      try {
        localStorage.setItem(STORAGE_KEY_STATS_TRIPLETS, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  }, []);

  // -------------------------------------------------------------------
  // SPEECH SYNTHESIS (Pronounce Triplet)
  // -------------------------------------------------------------------
  const speakTriplet = useCallback(
    (item: TripletItem) => {
      if (!audioEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;
      try {
        window.speechSynthesis.cancel();
        const text = `Pythagorean Triplet: ${item.a}, ${item.b}, and hypotenuse ${item.c}.`;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        window.speechSynthesis.speak(utterance);
      } catch {}
    },
    [audioEnabled]
  );

  // -------------------------------------------------------------------
  // FILTERED LIST
  // -------------------------------------------------------------------
  const filteredTriplets = useMemo(() => {
    let list = PYTHAGOREAN_TRIPLETS;

    if (selectedCategory === 'P1') {
      list = list.filter(t => t.page === 'P1');
    } else if (selectedCategory === 'P2') {
      list = list.filter(t => t.page === 'P2');
    } else if (selectedCategory === 'derived') {
      list = list.filter(t => t.page === 'derived');
    } else if (selectedCategory === 'weak') {
      list = list.filter(t => weakIds.has(t.id));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        t =>
          t.id.includes(q) ||
          `${t.a}`.includes(q) ||
          `${t.b}`.includes(q) ||
          `${t.c}`.includes(q) ||
          `(${t.a}, ${t.b}, ${t.c})`.includes(q) ||
          (t.tip && t.tip.toLowerCase().includes(q))
      );
    }

    return list;
  }, [selectedCategory, searchQuery, weakIds]);

  // -------------------------------------------------------------------
  // PRACTICE DRILL STATE
  // -------------------------------------------------------------------
  const [practiceType, setPracticeType] = useState<PracticeType>('mcq');
  const [practiceDirection, setPracticeDirection] = useState<PracticeDirection>('mixed');
  const [practiceDuration, setPracticeDuration] = useState<PracticeDuration>('60s');
  const [isDrillActive, setIsDrillActive] = useState(false);
  const [timerRemaining, setTimerRemaining] = useState<number>(60);
  const [streak, setStreak] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [drillAnswered, setDrillAnswered] = useState(0);
  const [drillCorrect, setDrillCorrect] = useState(0);
  const [drillMistakes, setDrillMistakes] = useState<QuestionState[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionState | null>(null);
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);

  // Generate a random practice question
  const generateQuestion = useCallback((): QuestionState => {
    // Select pool based on weak or primary triplets
    const pool =
      weakIds.size > 0 && Math.random() < 0.35
        ? PYTHAGOREAN_TRIPLETS.filter(t => weakIds.has(t.id))
        : PYTHAGOREAN_TRIPLETS;

    const item = pool[Math.floor(Math.random() * pool.length)];

    let type: 'hypotenuse' | 'leg' | 'identify' = 'hypotenuse';
    if (practiceDirection === 'hypotenuse') type = 'hypotenuse';
    else if (practiceDirection === 'leg') type = 'leg';
    else if (practiceDirection === 'identify') type = 'identify';
    else {
      const rand = Math.random();
      if (rand < 0.45) type = 'hypotenuse';
      else if (rand < 0.8) type = 'leg';
      else type = 'identify';
    }

    let prompt = '';
    let subPrompt = '';
    let expectedAnswer = '';
    let options: string[] = [];

    if (type === 'hypotenuse') {
      prompt = `(${item.a}, ${item.b}, ?)`;
      subPrompt = `Find the Hypotenuse for sides ${item.a} & ${item.b}`;
      expectedAnswer = `${item.c}`;

      // Generate distractors close to hypotenuse
      const wrong = new Set<string>();
      const deltas = [-3, -2, -1, 1, 2, 3, 4, 5];
      deltas.sort(() => Math.random() - 0.5);

      for (const d of deltas) {
        const val = item.c + d;
        if (val > 0 && val !== item.c) {
          wrong.add(`${val}`);
        }
        if (wrong.size >= 3) break;
      }
      options = Array.from(wrong);
      options.push(expectedAnswer);
      options.sort(() => Math.random() - 0.5);
    } else if (type === 'leg') {
      // Hide either a or b
      const hideA = Math.random() < 0.5;
      if (hideA) {
        prompt = `(?, ${item.b}, ${item.c})`;
        subPrompt = `Given side ${item.b} and Hypotenuse ${item.c}, find the missing side`;
        expectedAnswer = `${item.a}`;
      } else {
        prompt = `(${item.a}, ?, ${item.c})`;
        subPrompt = `Given side ${item.a} and Hypotenuse ${item.c}, find the missing side`;
        expectedAnswer = `${item.b}`;
      }

      const targetVal = hideA ? item.a : item.b;
      const wrong = new Set<string>();
      const deltas = [-3, -2, -1, 1, 2, 3, 4];
      deltas.sort(() => Math.random() - 0.5);

      for (const d of deltas) {
        const val = targetVal + d;
        if (val > 0 && val !== targetVal && val < item.c) {
          wrong.add(`${val}`);
        }
        if (wrong.size >= 3) break;
      }
      // Fallback distractors
      while (wrong.size < 3) {
        const dummy = targetVal + Math.floor(Math.random() * 8) + 1;
        if (dummy !== targetVal) wrong.add(`${dummy}`);
      }
      options = Array.from(wrong);
      options.push(expectedAnswer);
      options.sort(() => Math.random() - 0.5);
    } else {
      // Is it a valid Pythagorean Triplet?
      const isValid = Math.random() < 0.5;
      if (isValid) {
        prompt = `(${item.a}, ${item.b}, ${item.c})`;
        subPrompt = 'Is this a valid Pythagorean Triplet?';
        expectedAnswer = 'Yes (Valid)';
        options = ['Yes (Valid)', 'No (Invalid)'];
      } else {
        const fakeC = item.c + (Math.random() < 0.5 ? 1 : -1);
        prompt = `(${item.a}, ${item.b}, ${fakeC})`;
        subPrompt = 'Is this a valid Pythagorean Triplet?';
        expectedAnswer = 'No (Invalid)';
        options = ['Yes (Valid)', 'No (Invalid)'];
      }
    }

    return {
      id: `${item.id}-${Date.now()}`,
      item,
      prompt,
      subPrompt,
      expectedAnswer,
      options,
      type
    };
  }, [practiceDirection, weakIds]);

  // Start drill
  const handleStartDrill = () => {
    soundManager.playClick();
    haptics.selection();
    setIsDrillActive(true);
    setTimerRemaining(practiceDuration === '60s' ? 60 : 0);
    setStreak(0);
    setCurrentScore(0);
    setDrillAnswered(0);
    setDrillCorrect(0);
    setDrillMistakes([]);
    setFlashcardFlipped(false);
    setCurrentQuestion(generateQuestion());
  };

  // Finish drill
  const handleFinishDrill = useCallback(() => {
    setIsDrillActive(false);
    if (drillCorrect >= 10) {
      fireCelebration({ particleCount: 60, spread: 80 });
      soundManager.playSuccess();
    }
  }, [drillCorrect]);

  // Timer effect for 60s Blitz
  useEffect(() => {
    if (!isDrillActive || practiceDuration !== '60s') return;
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
  }, [isDrillActive, practiceDuration, handleFinishDrill]);

  // Handle MCQ selection
  const handleSelectOption = (selected: string) => {
    if (!currentQuestion || currentQuestion.userAnswer !== undefined) return;

    const isCorrect = selected === currentQuestion.expectedAnswer;
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

    // Auto next after 550ms
    setTimeout(() => {
      if (practiceDuration === '60s' && timerRemaining <= 1) {
        handleFinishDrill();
      } else {
        setFlashcardFlipped(false);
        setCurrentQuestion(generateQuestion());
      }
    }, 550);
  };

  // Keyboard shortcut listener for options (1, 2, 3, 4)
  useEffect(() => {
    if (!isDrillActive || !currentQuestion || currentQuestion.userAnswer !== undefined) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['1', '2', '3', '4'].includes(e.key)) {
        const index = parseInt(e.key, 10) - 1;
        if (currentQuestion.options[index]) {
          handleSelectOption(currentQuestion.options[index]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div className="space-y-6">
      {/* ─────────────────────────────────────────────────────────────
          TOP HEADER & NAVIGATION
      ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
            <Triangle className="w-6 h-6 rotate-90" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                Pythagorean Triplets
              </h2>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                Geometry & Trigonometry Booster
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Right triangles (a² + b² = c²), inradius tricks, and high-frequency exam multiples.
            </p>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 self-start md:self-auto">
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setActiveMode('learn');
            }}
            className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'learn'
                ? 'bg-indigo-600 text-white shadow-xs font-black'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Triplets Cards</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setActiveMode('practice');
            }}
            className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'practice'
                ? 'bg-indigo-600 text-white shadow-xs font-black'
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
              setActiveMode('rules');
            }}
            className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'rules'
                ? 'bg-indigo-600 text-white shadow-xs font-black'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>Rules & Inradius</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setActiveMode('stats');
            }}
            className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'stats'
                ? 'bg-indigo-600 text-white shadow-xs font-black'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Stats</span>
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          MODE 1: LEARN & CARDS VIEW
      ───────────────────────────────────────────────────────────── */}
      {activeMode === 'learn' && (
        <div className="space-y-5">
          {/* Controls Bar: Category Tabs, Search, Active Recall & Audio */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs">
            {/* Category Tabs (P1, P2, All, Multiples, Weak) */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 lg:pb-0">
              {TRIPLET_CATEGORIES.map(cat => {
                const count =
                  cat.id === 'all'
                    ? PYTHAGOREAN_TRIPLETS.length
                    : cat.id === 'P1'
                    ? PYTHAGOREAN_TRIPLETS.filter(t => t.page === 'P1').length
                    : cat.id === 'P2'
                    ? PYTHAGOREAN_TRIPLETS.filter(t => t.page === 'P2').length
                    : cat.id === 'derived'
                    ? PYTHAGOREAN_TRIPLETS.filter(t => t.page === 'derived').length
                    : weakIds.size;

                const isActive = selectedCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedCategory(cat.id);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-xs font-black ring-1 ring-indigo-400/40'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.05]'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right Tools: Search, Active Recall & Layout */}
            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <div className="relative flex-1 sm:w-48">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search triplet..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-[#161826] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              {/* Active Recall Toggle */}
              <div className="flex items-center gap-1 p-0.5 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-[11px] font-bold">
                <button
                  type="button"
                  title="Show all numbers"
                  onClick={() => setHideMode('none')}
                  className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                    hideMode === 'none'
                      ? 'bg-white dark:bg-[#1C1F33] text-indigo-600 dark:text-indigo-400 shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Show All
                </button>
                <button
                  type="button"
                  title="Hide Hypotenuse for active recall"
                  onClick={() => setHideMode('hypotenuse')}
                  className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                    hideMode === 'hypotenuse'
                      ? 'bg-white dark:bg-[#1C1F33] text-indigo-600 dark:text-indigo-400 shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Hide Hypotenuse
                </button>
                <button
                  type="button"
                  title="Hide side b"
                  onClick={() => setHideMode('leg')}
                  className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                    hideMode === 'leg'
                      ? 'bg-white dark:bg-[#1C1F33] text-indigo-600 dark:text-indigo-400 shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Hide Leg
                </button>
              </div>

              {/* Audio Pronunciation Toggle */}
              <button
                type="button"
                onClick={() => setAudioEnabled(!audioEnabled)}
                title={audioEnabled ? 'Mute Speech' : 'Enable Speech'}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                  audioEnabled
                    ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20'
                    : 'bg-slate-100 dark:bg-white/[0.05] text-slate-400 border-slate-200 dark:border-white/10'
                }`}
              >
                {audioEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Triplet Cards Grid (Designed to look crisp, clean, and match user reference screenshots) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredTriplets.map(item => {
              const isMastered = masteredIds.has(item.id);
              const isWeak = weakIds.has(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setInspectedTriplet(item);
                    speakTriplet(item);
                  }}
                  className={`group relative p-4 rounded-2xl transition-all cursor-pointer border flex flex-col justify-between space-y-3 shadow-2xs hover:shadow-md hover:scale-[1.02] active:scale-[0.99] ${
                    isMastered
                      ? 'bg-emerald-500/[0.03] dark:bg-emerald-500/[0.02] border-emerald-500/40 hover:border-emerald-500'
                      : isWeak
                      ? 'bg-rose-500/[0.03] dark:bg-rose-500/[0.02] border-rose-500/40 hover:border-rose-500'
                      : 'bg-white dark:bg-[#121422] border-slate-200/90 dark:border-white/10 hover:border-indigo-500/60'
                  }`}
                >
                  {/* Top: Badges and Quick Audio */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-slate-400">
                      {item.page === 'derived' ? 'Scaled' : item.page}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {item.isPrimitive && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                          Primitive
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={e => {
                          e.stopPropagation();
                          const next = new Set(masteredIds);
                          if (isMastered) next.delete(item.id);
                          else next.add(item.id);
                          saveMastered(next);
                          soundManager.playClick();
                        }}
                        title={isMastered ? 'Mark unlearned' : 'Mark as mastered'}
                        className={`p-1 rounded-lg transition-all ${
                          isMastered
                            ? 'text-emerald-500 bg-emerald-500/10'
                            : 'text-slate-400 hover:text-emerald-500 hover:bg-slate-100 dark:hover:bg-white/10'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Center: The Iconic Pill Display (a, b, c) */}
                  <div className="py-2 flex items-center justify-center">
                    <div className="px-5 py-2.5 rounded-2xl bg-slate-50 dark:bg-[#181B2E] border border-slate-200/80 dark:border-white/[0.08] shadow-inner text-xl sm:text-2xl font-mono font-black text-slate-900 dark:text-white tracking-wider flex items-center gap-2 group-hover:border-indigo-500/40 transition-colors">
                      {hideMode === 'none' ? (
                        <span>({item.a}, {item.b}, {item.c})</span>
                      ) : hideMode === 'hypotenuse' ? (
                        <span>
                          ({item.a}, {item.b},{' '}
                          <span className="text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md">
                            ?
                          </span>
                          )
                        </span>
                      ) : (
                        <span>
                          ({item.a},{' '}
                          <span className="text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md">
                            ?
                          </span>
                          , {item.c})
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom: Quick Math Details & Inradius */}
                  <div className="pt-2 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    <span title="Inradius r = (a+b-c)/2">
                      r = <strong className="text-indigo-600 dark:text-indigo-400 font-black">{item.inradius}</strong>
                    </span>
                    <span title="Hypotenuse c">
                      c = <strong className="text-slate-900 dark:text-white">{item.c}</strong>
                    </span>
                    <span title="Area = (a*b)/2">
                      A = <strong className="text-slate-700 dark:text-slate-300">{item.area}</strong>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredTriplets.length === 0 && (
            <div className="text-center py-12 rounded-3xl bg-slate-50 dark:bg-white/[0.02] border border-dashed border-slate-300 dark:border-white/10 space-y-2">
              <Triangle className="w-8 h-8 text-slate-400 mx-auto opacity-50" />
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                No Pythagorean Triplets match your filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
              >
                Reset all filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          INSPECTED TRIPLET MODAL / RIGHT TRIANGLE VISUALIZER
      ───────────────────────────────────────────────────────────── */}
      {inspectedTriplet && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
          onClick={() => setInspectedTriplet(null)}
        >
          <div
            className="w-full max-w-lg rounded-3xl bg-white dark:bg-[#121424] border border-slate-200 dark:border-white/15 shadow-2xl p-6 space-y-5 animate-scale-in"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-500 flex items-center justify-center font-bold">
                  <Triangle className="w-5 h-5 rotate-90" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    Pythagorean Triplet: ({inspectedTriplet.a}, {inspectedTriplet.b}, {inspectedTriplet.c})
                  </h3>
                  <span className="text-xs text-indigo-600 dark:text-indigo-400 font-mono font-bold">
                    {inspectedTriplet.a}² + {inspectedTriplet.b}² = {inspectedTriplet.c}² ({inspectedTriplet.a * inspectedTriplet.a} + {inspectedTriplet.b * inspectedTriplet.b} = {inspectedTriplet.c * inspectedTriplet.c})
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setInspectedTriplet(null)}
                className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-all cursor-pointer"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Visual Right-Triangle SVG Diagram */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#181A2D] border border-slate-200/80 dark:border-white/10 flex flex-col items-center justify-center">
              <svg width="220" height="150" viewBox="0 0 220 150" className="overflow-visible">
                {/* Triangle polygon */}
                <polygon
                  points="30,130 190,130 30,20"
                  fill="rgba(99, 102, 241, 0.12)"
                  stroke="rgba(99, 102, 241, 0.9)"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
                {/* Right angle marker */}
                <path
                  d="M 30,115 L 45,115 L 45,130"
                  fill="none"
                  stroke="rgba(99, 102, 241, 0.8)"
                  strokeWidth="2"
                />
                {/* Labels */}
                {/* Leg a (vertical) */}
                <text x="12" y="75" fill="#6366f1" fontSize="13" fontWeight="bold" fontFamily="monospace">
                  a = {inspectedTriplet.a}
                </text>
                {/* Leg b (base) */}
                <text x="105" y="146" fill="#6366f1" fontSize="13" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                  b = {inspectedTriplet.b}
                </text>
                {/* Hypotenuse c (diagonal) */}
                <text x="120" y="65" fill="#10b981" fontSize="14" fontWeight="900" fontFamily="monospace">
                  c = {inspectedTriplet.c}
                </text>
              </svg>

              <div className="mt-3 flex items-center gap-2 text-xs font-mono font-bold text-slate-600 dark:text-slate-300">
                <span className="px-2 py-0.5 rounded bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10">
                  Hypotenuse = {inspectedTriplet.c}
                </span>
                <span className="px-2 py-0.5 rounded bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10">
                  Inradius r = {inspectedTriplet.inradius}
                </span>
                <span className="px-2 py-0.5 rounded bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10">
                  Circumradius R = {inspectedTriplet.circumradius}
                </span>
              </div>
            </div>

            {/* Details & Exam Usage */}
            <div className="space-y-3 text-xs">
              {inspectedTriplet.generatorDesc && (
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-700 dark:text-indigo-300">
                  <span className="font-bold">Generator Pattern: </span>
                  <span className="font-mono">{inspectedTriplet.generatorDesc}</span>
                </div>
              )}

              {inspectedTriplet.tip && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300">
                  <span className="font-bold">Pro Tip: </span>
                  {inspectedTriplet.tip}
                </div>
              )}

              {inspectedTriplet.examUsage && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300">
                  <span className="font-bold">Exam Application: </span>
                  {inspectedTriplet.examUsage}
                </div>
              )}

              {inspectedTriplet.multiples && inspectedTriplet.multiples.length > 0 && (
                <div className="space-y-1">
                  <span className="font-bold text-slate-700 dark:text-slate-300">Popular Scaled Multiples:</span>
                  <div className="flex flex-wrap gap-1.5 font-mono">
                    {inspectedTriplet.multiples.map(m => (
                      <span
                        key={m.join('-')}
                        className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-slate-200 font-bold border border-slate-200 dark:border-white/10"
                      >
                        ({m[0]}, {m[1]}, {m[2]})
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setInspectedTriplet(null)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
              >
                Close Visualizer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODE 2: SPEED PRACTICE DRILLS
      ───────────────────────────────────────────────────────────── */}
      {activeMode === 'practice' && (
        <div className="space-y-6">
          {!isDrillActive ? (
            /* Setup Screen */
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-6 max-w-2xl mx-auto">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold mx-auto">
                  <Zap className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  Pythagorean Triplets Speed Drill
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                  Master right triangles by instant recall. Calculate hypotenuse and missing sides in under 2 seconds!
                </p>
              </div>

              {/* Settings: Direction, Duration */}
              <div className="space-y-4 pt-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                    Question Focus
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'mixed', label: 'Mixed Drills' },
                      { id: 'hypotenuse', label: 'Find Hypotenuse' },
                      { id: 'leg', label: 'Find Missing Leg' },
                      { id: 'identify', label: 'Valid / Invalid' }
                    ].map(opt => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setPracticeDirection(opt.id as PracticeDirection)}
                        className={`p-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          practiceDirection === opt.id
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                            : 'bg-slate-50 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-indigo-500/40'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                    Sprint Timer Mode
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: '60s', label: '⚡ 60s Blitz Sprint', desc: 'Answer as many as you can' },
                      { id: 'zen', label: '🧘 Zen Unlimited', desc: 'No timer pressure' }
                    ].map(opt => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setPracticeDuration(opt.id as PracticeDuration)}
                        className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                          practiceDuration === opt.id
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                            : 'bg-slate-50 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-indigo-500/40'
                        }`}
                      >
                        <div className="text-xs font-bold">{opt.label}</div>
                        <div
                          className={`text-[10px] mt-0.5 ${
                            practiceDuration === opt.id ? 'text-indigo-100' : 'text-slate-400'
                          }`}
                        >
                          {opt.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Start Button */}
              <button
                type="button"
                onClick={handleStartDrill}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-black transition-all cursor-pointer shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Start Speed Sprint</span>
              </button>
            </div>
          ) : (
            /* Active Drill Question Arena */
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0E101B] border border-indigo-500/30 dark:border-indigo-500/20 shadow-lg space-y-6 max-w-2xl mx-auto">
              {/* Header: Timer, Streak, Score */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  {practiceDuration === '60s' ? (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono font-black text-sm border border-indigo-500/20">
                      <Clock className="w-4 h-4" />
                      <span>{timerRemaining}s</span>
                    </div>
                  ) : (
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                      Zen Mode
                    </span>
                  )}

                  {streak > 1 && (
                    <div className="flex items-center gap-1 text-xs font-black text-amber-500 animate-pulse">
                      <Flame className="w-4 h-4 fill-amber-500" />
                      <span>{streak} Streak!</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-xl bg-slate-100 dark:bg-white/[0.08] text-slate-800 dark:text-slate-200">
                    Score: {currentScore}
                  </span>
                  <button
                    type="button"
                    onClick={handleFinishDrill}
                    className="text-xs font-bold text-rose-500 hover:underline cursor-pointer"
                  >
                    Finish
                  </button>
                </div>
              </div>

              {/* Question Presentation */}
              {currentQuestion && (
                <div className="py-6 flex flex-col items-center justify-center space-y-4 text-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    {currentQuestion.subPrompt}
                  </span>

                  <div className="text-4xl sm:text-5xl font-mono font-black text-slate-900 dark:text-white tracking-wider">
                    {currentQuestion.prompt}
                  </div>

                  <span className="text-[11px] text-slate-400">
                    Press keyboard keys <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/10 font-mono">1</kbd>, <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/10 font-mono">2</kbd>, <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/10 font-mono">3</kbd>, <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/10 font-mono">4</kbd>
                  </span>

                  {/* MCQ Options Grid */}
                  <div className="grid grid-cols-2 gap-3 w-full max-w-md pt-3">
                    {currentQuestion.options.map((opt, idx) => {
                      const isAnswered = currentQuestion.userAnswer !== undefined;
                      const isSelected = currentQuestion.userAnswer === opt;
                      const isTargetCorrect = opt === currentQuestion.expectedAnswer;

                      let btnStyle =
                        'bg-slate-50 dark:bg-[#161828] border-slate-200/90 dark:border-white/10 hover:border-indigo-500 text-slate-900 dark:text-white';

                      if (isAnswered) {
                        if (isTargetCorrect) {
                          btnStyle = 'bg-emerald-600 text-white border-emerald-600 shadow-md';
                        } else if (isSelected && !isTargetCorrect) {
                          btnStyle = 'bg-rose-600 text-white border-rose-600 shadow-md';
                        } else {
                          btnStyle = 'opacity-40 bg-slate-100 dark:bg-white/5 border-transparent text-slate-400';
                        }
                      }

                      return (
                        <button
                          key={opt}
                          type="button"
                          disabled={isAnswered}
                          onClick={() => handleSelectOption(opt)}
                          className={`p-3.5 sm:p-4 rounded-2xl border text-lg sm:text-xl font-mono font-bold transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                        >
                          <span className="text-xs text-slate-400 font-sans font-bold">
                            [{idx + 1}]
                          </span>
                          <span className="flex-1 text-center">{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODE 3: RULES & GENERATORS CHEATSHEET
      ───────────────────────────────────────────────────────────── */}
      {activeMode === 'rules' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TRIPLET_GENERATION_RULES.map((rule, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    {rule.title}
                  </h3>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#151726] border border-slate-200/60 dark:border-white/10 font-mono text-sm font-bold text-indigo-600 dark:text-indigo-400">
                  {rule.formula}
                </div>

                <div className="space-y-1 text-xs">
                  <p className="text-slate-700 dark:text-slate-300 font-medium">
                    <strong className="text-slate-900 dark:text-white">Example: </strong>
                    {rule.example}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400">
                    <strong className="text-indigo-600 dark:text-indigo-400">Exam Note: </strong>
                    {rule.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODE 4: STATS & MASTERY
      ───────────────────────────────────────────────────────────── */}
      {activeMode === 'stats' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-5 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-1">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Mastered Triplets
              </span>
              <div className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400">
                {masteredIds.size} / {PYTHAGOREAN_TRIPLETS.length}
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-1">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Best Blitz Streak
              </span>
              <div className="text-2xl sm:text-3xl font-black text-amber-500 flex items-center gap-1">
                <Flame className="w-6 h-6 fill-amber-500" />
                <span>{stats.bestStreak}</span>
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-1">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Accuracy Rate
              </span>
              <div className="text-2xl sm:text-3xl font-black text-emerald-500">
                {stats.totalAnswered > 0
                  ? Math.round((stats.totalCorrect / stats.totalAnswered) * 100)
                  : 0}
                %
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-1">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Needs Review
              </span>
              <div className="text-2xl sm:text-3xl font-black text-rose-500">
                {weakIds.size}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
