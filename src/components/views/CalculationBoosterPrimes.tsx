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
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { soundManager } from '../../utils/soundEffects';
import { haptics } from '../../utils/haptics';
import { fireCelebration } from '../../utils/confettiHelper';
import {
  PrimeItem,
  PrimeCategoryTab,
  PRIME_CATEGORIES,
  PRIME_NUMBERS,
  FAMOUS_COMPOSITE_TRAPS,
  PRIME_BENCHMARKS,
  checkPrimality
} from '../../data/calculationPrimesData';

// ---------------------------------------------------------------------
// STORAGE KEYS & CONSTANTS
// ---------------------------------------------------------------------
const STORAGE_KEY_MASTERED_PRIMES = 'syllabus3d_primes_mastered_v1';
const STORAGE_KEY_STATS_PRIMES = 'syllabus3d_primes_stats_v1';
const STORAGE_KEY_WEAK_PRIMES = 'syllabus3d_primes_weak_v1';

export type PrimesBoosterMode = 'learn' | 'practice' | 'checker' | 'rules' | 'stats';
export type PracticeDuration = 'zen' | '60s';
export type PracticeQuestionType = 'is-prime' | 'next-prime' | 'twin-prime' | 'mixed';

interface PrimeStats {
  totalAnswered: number;
  totalCorrect: number;
  bestStreak: number;
  blitzRecord: number;
}

interface QuestionState {
  id: string;
  prompt: string;
  subPrompt: string;
  expectedAnswer: string;
  options: string[];
  explanation: string;
  userAnswer?: string;
  isCorrect?: boolean;
  type: 'is-prime' | 'next-prime' | 'twin-prime';
  primeId?: string;
}

export const CalculationBoosterPrimes: React.FC = () => {
  // Navigation & View Mode
  const [activeMode, setActiveMode] = useState<PrimesBoosterMode>('learn');
  const [selectedCategory, setSelectedCategory] = useState<PrimeCategoryTab>('1-100');
  const [searchQuery, setSearchQuery] = useState('');

  // Active Recall Mode
  const [hideMode, setHideMode] = useState<'none' | 'hidden'>('none');
  const [audioEnabled, setAudioEnabled] = useState(true);

  // Inspected Prime Item Modal
  const [inspectedPrime, setInspectedPrime] = useState<PrimeItem | null>(null);

  // Prime Checker State
  const [checkerInput, setCheckerInput] = useState('');
  const [checkerResult, setCheckerResult] = useState<{ isPrime: boolean; factor?: number; steps: string[] } | null>(null);

  // Persistence (Mastered & Weak items)
  const [masteredIds, setMasteredIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MASTERED_PRIMES);
      return saved ? new Set(JSON.parse(saved)) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  });

  const [weakIds, setWeakIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_WEAK_PRIMES);
      return saved ? new Set(JSON.parse(saved)) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  });

  const [stats, setStats] = useState<PrimeStats>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STATS_PRIMES);
      return saved
        ? JSON.parse(saved)
        : { totalAnswered: 0, totalCorrect: 0, bestStreak: 0, blitzRecord: 0 };
    } catch {
      return { totalAnswered: 0, totalCorrect: 0, bestStreak: 0, blitzRecord: 0 };
    }
  });

  const saveMastered = useCallback((newSet: Set<string>) => {
    setMasteredIds(newSet);
    try {
      localStorage.setItem(STORAGE_KEY_MASTERED_PRIMES, JSON.stringify(Array.from(newSet)));
    } catch {}
  }, []);

  const recordMistake = useCallback((id: string) => {
    setWeakIds(prev => {
      const next = new Set(prev).add(id);
      try {
        localStorage.setItem(STORAGE_KEY_WEAK_PRIMES, JSON.stringify(Array.from(next)));
      } catch {}
      return next;
    });
  }, []);

  const clearMistake = useCallback((id: string) => {
    setWeakIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      try {
        localStorage.setItem(STORAGE_KEY_WEAK_PRIMES, JSON.stringify(Array.from(next)));
      } catch {}
      return next;
    });
  }, []);

  const saveStats = useCallback((updater: (prev: PrimeStats) => PrimeStats) => {
    setStats(prev => {
      const updated = updater(prev);
      try {
        localStorage.setItem(STORAGE_KEY_STATS_PRIMES, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  }, []);

  // Speech pronunciation
  const speakPrime = useCallback(
    (item: PrimeItem) => {
      if (!audioEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;
      try {
        window.speechSynthesis.cancel();
        const text = `Prime number ${item.n}. It is the ${item.order}th prime number.`;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
      } catch {}
    },
    [audioEnabled]
  );

  // Filtered List
  const filteredPrimes = useMemo(() => {
    let list = PRIME_NUMBERS;

    if (selectedCategory === '1-100') {
      list = list.filter(p => p.range === '1-100');
    } else if (selectedCategory === '101-200') {
      list = list.filter(p => p.range === '101-200');
    } else if (selectedCategory === '201-300') {
      list = list.filter(p => p.range === '201-300');
    } else if (selectedCategory === 'twin') {
      list = list.filter(p => p.isTwinPrime);
    } else if (selectedCategory === 'weak') {
      list = list.filter(p => weakIds.has(p.id));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        p =>
          `${p.n}`.includes(q) ||
          p.id.includes(q) ||
          (p.tip && p.tip.toLowerCase().includes(q))
      );
    }

    return list;
  }, [selectedCategory, searchQuery, weakIds]);

  // Total count banner for currently selected tab
  const rangeBannerText = useMemo(() => {
    if (selectedCategory === '1-100') return 'Total Primes (1 - 100): 25';
    if (selectedCategory === '101-200') return 'Total Primes (101 - 200): 21';
    if (selectedCategory === '201-300') return 'Total Primes (201 - 300): 16';
    if (selectedCategory === 'twin') return 'Twin Primes (1 - 300)';
    if (selectedCategory === 'weak') return `Primes Needing Review: ${weakIds.size}`;
    return `Total Primes (1 - 300): ${PRIME_NUMBERS.length}`;
  }, [selectedCategory, weakIds]);

  // -------------------------------------------------------------------
  // PRACTICE DRILL ENGINE
  // -------------------------------------------------------------------
  const [practiceType, setPracticeType] = useState<PracticeQuestionType>('mixed');
  const [practiceDuration, setPracticeDuration] = useState<PracticeDuration>('60s');
  const [isDrillActive, setIsDrillActive] = useState(false);
  const [timerRemaining, setTimerRemaining] = useState<number>(60);
  const [streak, setStreak] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [drillAnswered, setDrillAnswered] = useState(0);
  const [drillCorrect, setDrillCorrect] = useState(0);
  const [drillMistakes, setDrillMistakes] = useState<QuestionState[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionState | null>(null);

  const generateQuestion = useCallback((): QuestionState => {
    let type: 'is-prime' | 'next-prime' | 'twin-prime' = 'is-prime';
    if (practiceType === 'is-prime') type = 'is-prime';
    else if (practiceType === 'next-prime') type = 'next-prime';
    else if (practiceType === 'twin-prime') type = 'twin-prime';
    else {
      const rand = Math.random();
      if (rand < 0.5) type = 'is-prime';
      else if (rand < 0.8) type = 'next-prime';
      else type = 'twin-prime';
    }

    let prompt = '';
    let subPrompt = '';
    let expectedAnswer = '';
    let explanation = '';
    let options: string[] = [];
    let primeId: string | undefined;

    if (type === 'is-prime') {
      // 50% chance of a prime number, 50% chance of an exam composite trap (e.g. 91, 119, 143, 221)
      const testTrap = Math.random() < 0.5;
      if (testTrap) {
        const trap = FAMOUS_COMPOSITE_TRAPS[Math.floor(Math.random() * FAMOUS_COMPOSITE_TRAPS.length)];
        prompt = `Is ${trap.num} a Prime Number?`;
        subPrompt = 'Primality Test';
        expectedAnswer = 'No (Composite)';
        explanation = `${trap.num} is NOT prime! It is ${trap.factors}. (${trap.note})`;
        options = ['Yes (Prime)', 'No (Composite)'];
      } else {
        const prime = PRIME_NUMBERS[Math.floor(Math.random() * PRIME_NUMBERS.length)];
        primeId = prime.id;
        prompt = `Is ${prime.n} a Prime Number?`;
        subPrompt = 'Primality Test';
        expectedAnswer = 'Yes (Prime)';
        explanation = `${prime.n} is a Prime Number (${prime.order}th prime). ${prime.tip || ''}`;
        options = ['Yes (Prime)', 'No (Composite)'];
      }
    } else if (type === 'next-prime') {
      // Pick a prime that is not the last one
      const idx = Math.floor(Math.random() * (PRIME_NUMBERS.length - 2));
      const curr = PRIME_NUMBERS[idx];
      const next = PRIME_NUMBERS[idx + 1];
      primeId = next.id;

      prompt = `What is the next prime after ${curr.n}?`;
      subPrompt = 'Consecutive Primes';
      expectedAnswer = `${next.n}`;
      explanation = `The next prime number immediately after ${curr.n} is ${next.n}.`;

      const wrong = new Set<string>();
      // Neighboring numbers
      for (const d of [1, 2, 3, 4, 6]) {
        const candidate = curr.n + d;
        if (candidate !== next.n && candidate > curr.n) {
          wrong.add(`${candidate}`);
        }
        if (wrong.size >= 3) break;
      }
      options = Array.from(wrong);
      options.push(expectedAnswer);
      options.sort(() => Math.random() - 0.5);
    } else {
      // Twin Prime drill
      const twinPrimes = PRIME_NUMBERS.filter(p => p.isTwinPrime && p.twinPair && p.twinPair > p.n);
      const chosen = twinPrimes[Math.floor(Math.random() * twinPrimes.length)];
      primeId = chosen.id;

      prompt = `Which number forms a Twin Prime with ${chosen.n}?`;
      subPrompt = 'Twin Prime Pairs (difference of 2)';
      expectedAnswer = `${chosen.twinPair}`;
      explanation = `(${chosen.n}, ${chosen.twinPair}) is a twin prime pair because both are prime and differ by exactly 2!`;

      const wrong = new Set<string>();
      const deltas = [-4, -2, 4, 6];
      for (const d of deltas) {
        const val = chosen.n + d;
        if (val > 0 && val !== chosen.twinPair) wrong.add(`${val}`);
        if (wrong.size >= 3) break;
      }
      options = Array.from(wrong).slice(0, 3);
      options.push(expectedAnswer);
      options.sort(() => Math.random() - 0.5);
    }

    return {
      id: `${Date.now()}-${Math.random()}`,
      prompt,
      subPrompt,
      expectedAnswer,
      explanation,
      options,
      type,
      primeId
    };
  }, [practiceType]);

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
    setCurrentQuestion(generateQuestion());
  };

  const handleFinishDrill = useCallback(() => {
    setIsDrillActive(false);
    if (drillCorrect >= 10) {
      fireCelebration({ particleCount: 60, spread: 80 });
      soundManager.playSuccess();
    }
  }, [drillCorrect]);

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

      if (currentQuestion.primeId) clearMistake(currentQuestion.primeId);

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
      if (currentQuestion.primeId) recordMistake(currentQuestion.primeId);

      saveStats(prev => ({
        ...prev,
        totalAnswered: prev.totalAnswered + 1
      }));
    }

    setTimeout(() => {
      if (practiceDuration === '60s' && timerRemaining <= 1) {
        handleFinishDrill();
      } else {
        setCurrentQuestion(generateQuestion());
      }
    }, 600);
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

  // Prime Checker runner
  const handleRunChecker = () => {
    const num = parseInt(checkerInput.trim(), 10);
    if (isNaN(num)) return;
    const res = checkPrimality(num);
    setCheckerResult(res);
    soundManager.playClick();
  };

  return (
    <div className="space-y-6">
      {/* ─────────────────────────────────────────────────────────────
          TOP HEADER & MODE NAVIGATION
      ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/30 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                Prime Numbers
              </h2>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                1 to 300 Master Vault
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              1-100 (25 primes), 101-200 (21 primes), 201-300 (16 primes), twin primes, and exam composite traps.
            </p>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 self-start md:self-auto flex-wrap">
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setActiveMode('learn');
            }}
            className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'learn'
                ? 'bg-purple-600 text-white shadow-xs font-black'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Primes Grid</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setActiveMode('practice');
            }}
            className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'practice'
                ? 'bg-purple-600 text-white shadow-xs font-black'
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
              setActiveMode('checker');
            }}
            className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'checker'
                ? 'bg-purple-600 text-white shadow-xs font-black'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Prime Checker</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setActiveMode('rules');
            }}
            className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'rules'
                ? 'bg-purple-600 text-white shadow-xs font-black'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>Rules & Traps</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setActiveMode('stats');
            }}
            className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'stats'
                ? 'bg-purple-600 text-white shadow-xs font-black'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Stats</span>
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          MODE 1: LEARN & PRIMES GRID (Matching User's Reference PDF)
      ───────────────────────────────────────────────────────────── */}
      {activeMode === 'learn' && (
        <div className="space-y-5">
          {/* Controls Bar: Category Tabs & Search */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs">
            {/* Category Tabs: 1-100 | 101-200 | 201-300 | All | Twin | Weak */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 lg:pb-0">
              {PRIME_CATEGORIES.map(cat => {
                const count =
                  cat.id === 'all'
                    ? PRIME_NUMBERS.length
                    : cat.id === '1-100'
                    ? PRIME_NUMBERS.filter(p => p.range === '1-100').length
                    : cat.id === '101-200'
                    ? PRIME_NUMBERS.filter(p => p.range === '101-200').length
                    : cat.id === '201-300'
                    ? PRIME_NUMBERS.filter(p => p.range === '201-300').length
                    : cat.id === 'twin'
                    ? PRIME_NUMBERS.filter(p => p.isTwinPrime).length
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
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-purple-600 text-white shadow-xs font-black ring-1 ring-purple-400/40'
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

            {/* Right Tools: Search, Recall & Audio */}
            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <div className="relative flex-1 sm:w-48">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search prime..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-[#161826] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              {/* Active Recall Toggle */}
              <button
                type="button"
                onClick={() => setHideMode(hideMode === 'none' ? 'hidden' : 'none')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  hideMode === 'hidden'
                    ? 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30'
                    : 'bg-slate-100 dark:bg-white/[0.05] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/10'
                }`}
              >
                {hideMode === 'hidden' ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{hideMode === 'hidden' ? 'Recall Active' : 'Hide Primes'}</span>
              </button>

              {/* Audio Toggle */}
              <button
                type="button"
                onClick={() => setAudioEnabled(!audioEnabled)}
                title={audioEnabled ? 'Mute Speech' : 'Enable Speech'}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                  audioEnabled
                    ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20'
                    : 'bg-slate-100 dark:bg-white/[0.05] text-slate-400 border-slate-200 dark:border-white/10'
                }`}
              >
                {audioEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Signature Purple Header Pill (Identical to user's uploaded reference PDF!) */}
          <div className="p-3 sm:p-4 rounded-2xl bg-purple-500/10 dark:bg-purple-500/[0.08] border-2 border-purple-500/30 text-center">
            <span className="text-base sm:text-lg font-black font-mono text-purple-700 dark:text-purple-300 tracking-wide">
              {rangeBannerText}
            </span>
          </div>

          {/* 4-Column Prime Cards Grid (Matching user's reference screenshots) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {filteredPrimes.map(item => {
              const isMastered = masteredIds.has(item.id);
              const isWeak = weakIds.has(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setInspectedPrime(item);
                    speakPrime(item);
                  }}
                  className={`group relative p-4 sm:p-5 rounded-2xl transition-all cursor-pointer border flex flex-col items-center justify-center space-y-1 shadow-2xs hover:shadow-md hover:scale-[1.03] active:scale-[0.98] ${
                    isMastered
                      ? 'bg-emerald-500/[0.03] dark:bg-emerald-500/[0.02] border-emerald-500/40 hover:border-emerald-500'
                      : isWeak
                      ? 'bg-rose-500/[0.03] dark:bg-rose-500/[0.02] border-rose-500/40 hover:border-rose-500'
                      : 'bg-white dark:bg-[#121422] border-slate-200/90 dark:border-white/10 hover:border-purple-500/60'
                  }`}
                >
                  {/* Top: Small Order Badge & Twin Indicator */}
                  <div className="w-full flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>#{item.order}</span>
                    {item.isTwinPrime && (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-purple-500/15 text-purple-600 dark:text-purple-400">
                        Twin
                      </span>
                    )}
                  </div>

                  {/* Main Prime Number Display (Big, Bold, Crisp Monospace font) */}
                  <div className="py-2 text-2xl sm:text-3xl font-mono font-black text-slate-900 dark:text-white tracking-wider group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {hideMode === 'hidden' ? (
                      <span className="bg-purple-500/10 text-purple-600 dark:text-purple-400 px-3 py-1 rounded-xl text-lg">
                        ?
                      </span>
                    ) : (
                      item.n
                    )}
                  </div>

                  {/* Bottom: 6k Form or Tag */}
                  <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                    {item.form6k ? item.form6k : item.n === 2 ? 'Even Prime' : item.n === 3 ? 'Odd Baseline' : ''}
                  </div>
                </div>
              );
            })}
          </div>

          {filteredPrimes.length === 0 && (
            <div className="text-center py-12 rounded-3xl bg-slate-50 dark:bg-white/[0.02] border border-dashed border-slate-300 dark:border-white/10 space-y-2">
              <ShieldCheck className="w-8 h-8 text-slate-400 mx-auto opacity-50" />
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                No Prime numbers match your filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('1-100');
                  setSearchQuery('');
                }}
                className="text-xs text-purple-600 dark:text-purple-400 font-bold hover:underline"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          INSPECTED PRIME MODAL
      ───────────────────────────────────────────────────────────── */}
      {inspectedPrime && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
          onClick={() => setInspectedPrime(null)}
        >
          <div
            className="w-full max-w-md rounded-3xl bg-white dark:bg-[#121424] border border-slate-200 dark:border-white/15 shadow-2xl p-6 space-y-4 animate-scale-in"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-500 flex items-center justify-center font-black font-mono text-2xl">
                  {inspectedPrime.n}
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    {inspectedPrime.order}
                    {inspectedPrime.order === 1
                      ? 'st'
                      : inspectedPrime.order === 2
                      ? 'nd'
                      : inspectedPrime.order === 3
                      ? 'rd'
                      : 'th'}{' '}
                    Prime Number
                  </h3>
                  <span className="text-xs text-purple-600 dark:text-purple-400 font-mono font-bold">
                    Range: {inspectedPrime.range}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setInspectedPrime(null)}
                className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-all cursor-pointer"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Details */}
            <div className="space-y-3 text-xs">
              {inspectedPrime.form6k && (
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-800 dark:text-purple-300">
                  <span className="font-bold">6k ± 1 Formula: </span>
                  <span className="font-mono font-bold">{inspectedPrime.form6k}</span>
                </div>
              )}

              {inspectedPrime.isTwinPrime && inspectedPrime.twinPair && (
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-800 dark:text-indigo-300">
                  <span className="font-bold">Twin Prime Pair: </span>
                  <span className="font-mono font-bold">
                    ({Math.min(inspectedPrime.n, inspectedPrime.twinPair)},{' '}
                    {Math.max(inspectedPrime.n, inspectedPrime.twinPair)})
                  </span>
                </div>
              )}

              {inspectedPrime.tip && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300">
                  <span className="font-bold">Fact & Memory Tip: </span>
                  {inspectedPrime.tip}
                </div>
              )}

              {inspectedPrime.examTrap && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-800 dark:text-rose-300">
                  <span className="font-bold">⚠️ Exam Trap: </span>
                  {inspectedPrime.examTrap}
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setInspectedPrime(null)}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
              >
                Close
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
                <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/30 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold mx-auto">
                  <Zap className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  Prime Numbers Speed Drill
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                  Never fall for composite traps like 91, 119, or 221! Instantly identify prime numbers and twin pairs.
                </p>
              </div>

              {/* Settings: Focus & Duration */}
              <div className="space-y-4 pt-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                    Question Focus
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'mixed', label: 'Mixed Drills' },
                      { id: 'is-prime', label: 'Prime or Composite?' },
                      { id: 'next-prime', label: 'Next Prime' },
                      { id: 'twin-prime', label: 'Twin Pairs' }
                    ].map(opt => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setPracticeType(opt.id as PracticeQuestionType)}
                        className={`p-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          practiceType === opt.id
                            ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                            : 'bg-slate-50 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-purple-500/40'
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
                            ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                            : 'bg-slate-50 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-purple-500/40'
                        }`}
                      >
                        <div className="text-xs font-bold">{opt.label}</div>
                        <div
                          className={`text-[10px] mt-0.5 ${
                            practiceDuration === opt.id ? 'text-purple-100' : 'text-slate-400'
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
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-black transition-all cursor-pointer shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Start Speed Sprint</span>
              </button>
            </div>
          ) : (
            /* Active Drill Question Arena */
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0E101B] border border-purple-500/30 dark:border-purple-500/20 shadow-lg space-y-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  {practiceDuration === '60s' ? (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 font-mono font-black text-sm border border-purple-500/20">
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
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                    {currentQuestion.subPrompt}
                  </span>

                  <div className="text-3xl sm:text-4xl font-mono font-black text-slate-900 dark:text-white tracking-wider">
                    {currentQuestion.prompt}
                  </div>

                  <span className="text-[11px] text-slate-400">
                    Press keyboard keys <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/10 font-mono">1</kbd>, <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/10 font-mono">2</kbd>
                  </span>

                  {/* Options Grid */}
                  <div className="grid grid-cols-2 gap-3 w-full max-w-md pt-3">
                    {currentQuestion.options.map((opt, idx) => {
                      const isAnswered = currentQuestion.userAnswer !== undefined;
                      const isSelected = currentQuestion.userAnswer === opt;
                      const isTargetCorrect = opt === currentQuestion.expectedAnswer;

                      let btnStyle =
                        'bg-slate-50 dark:bg-[#161828] border-slate-200/90 dark:border-white/10 hover:border-purple-500 text-slate-900 dark:text-white';

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
                          className={`p-3.5 sm:p-4 rounded-2xl border text-base sm:text-lg font-mono font-bold transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                        >
                          <span className="text-xs text-slate-400 font-sans font-bold">
                            [{idx + 1}]
                          </span>
                          <span className="flex-1 text-center">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {currentQuestion.userAnswer !== undefined && currentQuestion.explanation && (
                    <div className="text-xs font-mono font-bold mt-2 p-3 rounded-xl bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20 max-w-md">
                      {currentQuestion.explanation}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODE 3: INTERACTIVE PRIME CHECKER TOOL
      ───────────────────────────────────────────────────────────── */}
      {activeMode === 'checker' && (
        <div className="space-y-6 max-w-2xl mx-auto">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-6">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Search className="w-5 h-5 text-purple-500" />
                <span>Instant Primality Test & Divisibility Steps</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Enter any number (e.g. 91, 143, 221, 353, 997) to see if it is prime, along with the step-by-step √N check.
              </p>
            </div>

            <div className="flex gap-2">
              <input
                type="number"
                value={checkerInput}
                onChange={e => setCheckerInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleRunChecker()}
                placeholder="Enter number (e.g. 143)..."
                className="flex-1 px-4 py-3 rounded-2xl bg-slate-50 dark:bg-[#161826] border border-slate-200 dark:border-white/10 text-base font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
              <button
                type="button"
                onClick={handleRunChecker}
                className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-all cursor-pointer shadow-xs shrink-0"
              >
                Test Now
              </button>
            </div>

            {/* Checker Output */}
            {checkerResult && (
              <div
                className={`p-5 rounded-2xl border space-y-3 animate-scale-in ${
                  checkerResult.isPrime
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300'
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-800 dark:text-rose-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  {checkerResult.isPrime ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  ) : (
                    <XCircle className="w-6 h-6 text-rose-500" />
                  )}
                  <h4 className="text-base font-black">
                    {checkerInput} is {checkerResult.isPrime ? 'a PRIME NUMBER!' : 'a COMPOSITE NUMBER!'}
                  </h4>
                </div>

                <div className="space-y-1 font-mono text-xs">
                  {checkerResult.steps.map((st, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <span className="text-slate-400">›</span>
                      <span>{st}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODE 4: RULES, BENCHMARKS & EXAM TRAPS CHEATSHEET
      ───────────────────────────────────────────────────────────── */}
      {activeMode === 'rules' && (
        <div className="space-y-6">
          {/* Distribution Benchmarks */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                <Hash className="w-4 h-4" />
              </div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                Prime Distribution Benchmarks (Must Remember for Exams)
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {PRIME_BENCHMARKS.map((b, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-[#151726] border border-slate-200/60 dark:border-white/10 space-y-1.5"
                >
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {b.range}
                  </span>
                  <div className="text-2xl font-mono font-black text-purple-600 dark:text-purple-400">
                    {b.count} Primes
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">{b.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Famous Composite Trap Numbers */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  Famous Composite Trap Numbers (Look Prime but ARE NOT!)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Examiners deliberately put these in option choices. Memorize their factors!
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {FAMOUS_COMPOSITE_TRAPS.map((trap, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-rose-500/[0.04] border border-rose-500/20 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-mono font-black text-rose-600 dark:text-rose-400">
                      {trap.num}
                    </span>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-white dark:bg-white/10 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10">
                      = {trap.factors}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">{trap.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODE 5: STATS
      ───────────────────────────────────────────────────────────── */}
      {activeMode === 'stats' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-5 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-1">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Mastered Primes
              </span>
              <div className="text-2xl sm:text-3xl font-black text-purple-600 dark:text-purple-400">
                {masteredIds.size} / {PRIME_NUMBERS.length}
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
