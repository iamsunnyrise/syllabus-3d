import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import {
  Zap,
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
  ChevronLeft,
  ChevronRight,
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
  LayoutGrid
} from 'lucide-react';
import { soundManager } from '../../utils/soundEffects';
import { haptics } from '../../utils/haptics';
import { fireCelebration } from '../../utils/confettiHelper';

// ---------------------------------------------------------------------
// STORAGE KEYS & DATA TYPES
// ---------------------------------------------------------------------
const STORAGE_KEY_MASTERED = 'syllabus3d_tables_mastered_v1';
const STORAGE_KEY_STATS = 'syllabus3d_tables_stats_v1';
const STORAGE_KEY_WEAK = 'syllabus3d_tables_weak_v1';

export type TableRange = '1-10' | '11-20' | '21-30' | '31-40' | 'all' | 'primes' | 'weak';
export type BoosterMode = 'learn' | 'practice' | 'stats';
export type PracticeType = 'mcq' | 'type';
export type PracticeDuration = 'zen' | '60s';

interface TableStats {
  totalAnswered: number;
  totalCorrect: number;
  bestStreak: number;
  blitzRecord: number;
}

const DEFAULT_STATS: TableStats = {
  totalAnswered: 0,
  totalCorrect: 0,
  bestStreak: 0,
  blitzRecord: 0
};

const PRIME_TABLES = [13, 17, 19, 23, 29, 31, 37];

// Table mnemonic / quick trick helper
const TABLE_TIPS: Record<number, string> = {
  9: 'Sum of digits in 9x table is always 9 (09, 18, 27, 36...)',
  11: 'Multiply by 11: Repeat digit (11x3=33) or sum & insert in middle (11x14=154)',
  12: '12 is 10x + 2x (e.g. 12x7 = 70 + 14 = 84)',
  13: '13 is 10x + 3x (e.g. 13x8 = 80 + 24 = 104)',
  15: 'Every multiple ends in 0 or 5. 15 is 10x + half of 10x (15x6 = 60 + 30 = 90)',
  19: 'Odd numbers for tens column (1,3,5..), decreasing 9..0 for units (19,38,57..)',
  20: 'Double the number and append 0',
  25: 'Think in quarters: 25, 50, 75, 100, 125, 150...',
  29: '30x minus 1x (e.g. 29x6 = 180 - 6 = 174)',
  39: '40x minus 1x (e.g. 39x5 = 200 - 5 = 195)'
};

export const CalculationBoosterTables: React.FC = () => {
  // Navigation Modes
  const [activeMode, setActiveMode] = useState<BoosterMode>('learn');

  // -------------------------------------------------------------------
  // PERSISTENCE STATE (Mastered & Stats)
  // -------------------------------------------------------------------
  const [masteredTables, setMasteredTables] = useState<Set<number>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MASTERED);
      return saved ? new Set(JSON.parse(saved)) : new Set([1, 2, 3, 5, 10]);
    } catch {
      return new Set([1, 2, 3, 5, 10]);
    }
  });

  const [stats, setStats] = useState<TableStats>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STATS);
      return saved ? { ...DEFAULT_STATS, ...JSON.parse(saved) } : DEFAULT_STATS;
    } catch {
      return DEFAULT_STATS;
    }
  });

  const [weakTables, setWeakTables] = useState<Record<number, number>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_WEAK);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const saveStats = useCallback((updater: (prev: TableStats) => TableStats) => {
    setStats(prev => {
      const next = updater(prev);
      try {
        localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const recordMistake = useCallback((tableNum: number) => {
    setWeakTables(prev => {
      const next = { ...prev, [tableNum]: (prev[tableNum] || 0) + 1 };
      try {
        localStorage.setItem(STORAGE_KEY_WEAK, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const clearMistake = useCallback((tableNum: number) => {
    setWeakTables(prev => {
      if (!prev[tableNum]) return prev;
      const next = { ...prev };
      delete next[tableNum];
      try {
        localStorage.setItem(STORAGE_KEY_WEAK, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const toggleMastered = (num: number) => {
    soundManager.playSuccess();
    haptics.success();
    setMasteredTables(prev => {
      const next = new Set(prev);
      if (next.has(num)) {
        next.delete(num);
      } else {
        next.add(num);
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
  const [selectedTable, setSelectedTable] = useState<number>(19);
  const [rangeFilter, setRangeFilter] = useState<TableRange>('11-20');
  const [multiplierDepth, setMultiplierDepth] = useState<10 | 20>(10);
  const [isAnswersHidden, setIsAnswersHidden] = useState<boolean>(false);
  const [revealedRows, setRevealedRows] = useState<Set<number>>(new Set());
  const [learnViewType, setLearnViewType] = useState<'single' | 'grid'>('single');
  const [isSpeechEnabled, setIsSpeechEnabled] = useState<boolean>(false);
  const [isPlayingAuto, setIsPlayingAuto] = useState<boolean>(false);
  const [autoHighlightRow, setAutoHighlightRow] = useState<number | null>(null);

  // Auto Recite Timer
  useEffect(() => {
    if (!isPlayingAuto) {
      setAutoHighlightRow(null);
      return;
    }

    let currentRow = 1;
    setAutoHighlightRow(1);

    const speakRow = (mult: number) => {
      const result = selectedTable * mult;
      if (isSpeechEnabled && typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(`${selectedTable} into ${mult} is ${result}`);
          utterance.rate = 1.05;
          utterance.pitch = 1.0;
          window.speechSynthesis.speak(utterance);
        } catch {}
      } else {
        soundManager.playClick();
      }
    };

    speakRow(1);

    const interval = setInterval(() => {
      currentRow += 1;
      if (currentRow > multiplierDepth) {
        setIsPlayingAuto(false);
        setAutoHighlightRow(null);
        soundManager.playLevelUp();
        return;
      }
      setAutoHighlightRow(currentRow);
      speakRow(currentRow);
    }, 1700);

    return () => {
      clearInterval(interval);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isPlayingAuto, selectedTable, multiplierDepth, isSpeechEnabled]);

  // Compute table list based on range filter
  const visibleTableNumbers = useMemo(() => {
    if (rangeFilter === '1-10') return Array.from({ length: 10 }, (_, i) => i + 1);
    if (rangeFilter === '11-20') return Array.from({ length: 10 }, (_, i) => i + 11);
    if (rangeFilter === '21-30') return Array.from({ length: 10 }, (_, i) => i + 21);
    if (rangeFilter === '31-40') return Array.from({ length: 10 }, (_, i) => i + 31);
    if (rangeFilter === 'primes') return PRIME_TABLES;
    if (rangeFilter === 'weak') {
      const weaks = Object.keys(weakTables).map(Number);
      return weaks.length > 0 ? weaks : [13, 17, 19, 23, 29];
    }
    return Array.from({ length: 40 }, (_, i) => i + 1);
  }, [rangeFilter, weakTables]);

  const handleSelectTable = (num: number) => {
    soundManager.playClick();
    haptics.selection();
    setSelectedTable(num);
    setIsPlayingAuto(false);
    setRevealedRows(new Set());
  };

  const handleToggleRevealRow = (mult: number) => {
    soundManager.playClick();
    haptics.selection();
    setRevealedRows(prev => {
      const next = new Set(prev);
      if (next.has(mult)) next.delete(mult);
      else next.add(mult);
      return next;
    });
  };

  const handleRevealAll = () => {
    soundManager.playClick();
    const all = new Set<number>();
    for (let i = 1; i <= multiplierDepth; i++) all.add(i);
    setRevealedRows(all);
  };

  const handleHideAll = () => {
    soundManager.playClick();
    setRevealedRows(new Set());
  };

  const handleSpeakSingle = (mult: number) => {
    const ans = selectedTable * mult;
    soundManager.playClick();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const text = `${selectedTable} into ${mult} is ${ans}`;
        const u = new SpeechSynthesisUtterance(text);
        u.rate = 1.0;
        window.speechSynthesis.speak(u);
      } catch {}
    }
  };

  // -------------------------------------------------------------------
  // PRACTICE DRILL ENGINE STATE
  // -------------------------------------------------------------------
  const [practiceRange, setPracticeRange] = useState<TableRange>('11-20');
  const [practiceType, setPracticeType] = useState<PracticeType>('mcq');
  const [practiceDuration, setPracticeDuration] = useState<PracticeDuration>('zen');
  const [drillActive, setDrillActive] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(60);

  // Drill question state
  const [currentQuestion, setCurrentQuestion] = useState<{
    table: number;
    multiplier: number;
    answer: number;
    options: number[];
  }>({
    table: 19,
    multiplier: 7,
    answer: 133,
    options: [123, 133, 143, 152]
  });

  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [drillScore, setDrillScore] = useState<number>(0);
  const [drillCorrect, setDrillCorrect] = useState<number>(0);
  const [drillTotal, setDrillTotal] = useState<number>(0);
  const [drillFeedback, setDrillFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [typeInput, setTypeInput] = useState<string>('');
  const [showBlitzSummary, setShowBlitzSummary] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Pool of numbers for practice
  const practiceTablePool = useMemo(() => {
    if (practiceRange === '1-10') return Array.from({ length: 10 }, (_, i) => i + 1);
    if (practiceRange === '11-20') return Array.from({ length: 10 }, (_, i) => i + 11);
    if (practiceRange === '21-30') return Array.from({ length: 10 }, (_, i) => i + 21);
    if (practiceRange === '31-40') return Array.from({ length: 10 }, (_, i) => i + 31);
    if (practiceRange === 'primes') return PRIME_TABLES;
    if (practiceRange === 'weak') {
      const weaks = Object.keys(weakTables).map(Number);
      return weaks.length > 0 ? weaks : [13, 17, 19, 23, 29];
    }
    return Array.from({ length: 40 }, (_, i) => i + 1);
  }, [practiceRange, weakTables]);

  // Generate a new random question
  const generateQuestion = useCallback(() => {
    const pool = practiceTablePool;
    const table = pool[Math.floor(Math.random() * pool.length)];
    // Multipliers 2 through 10 (or up to 12)
    const multiplier = Math.floor(Math.random() * 9) + 2;
    const answer = table * multiplier;

    // Distractor generation
    const wrong = new Set<number>();
    while (wrong.size < 3) {
      // Create intelligent realistic distractors (e.g. ±table, ±10, off by 2)
      const offsets = [
        table,
        -table,
        10,
        -10,
        (Math.floor(Math.random() * 4) + 1) * (Math.random() > 0.5 ? 1 : -1) * 2
      ];
      const offset = offsets[Math.floor(Math.random() * offsets.length)];
      const candidate = answer + offset;
      if (candidate > 0 && candidate !== answer) {
        wrong.add(candidate);
      }
    }

    const options = [...wrong, answer].sort(() => Math.random() - 0.5);
    setCurrentQuestion({ table, multiplier, answer, options });
    setDrillFeedback(null);
    setTypeInput('');
  }, [practiceTablePool]);

  // Start Drill
  const handleStartDrill = () => {
    soundManager.playClick();
    haptics.selection();
    setDrillActive(true);
    setCurrentStreak(0);
    setDrillScore(0);
    setDrillCorrect(0);
    setDrillTotal(0);
    setShowBlitzSummary(false);
    setTimeLeft(60);
    generateQuestion();
    setTimeout(() => inputRef.current?.focus(), 150);
  };

  // 60s Blitz Countdown Timer
  useEffect(() => {
    if (!drillActive || practiceDuration !== '60s') return;

    if (timeLeft <= 0) {
      // Blitz Finished!
      setDrillActive(false);
      setShowBlitzSummary(true);
      soundManager.playLevelUp();
      fireCelebration({ particleCount: 50, spread: 70, origin: { y: 0.6 } });

      saveStats(prev => ({
        ...prev,
        blitzRecord: Math.max(prev.blitzRecord, drillScore)
      }));
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [drillActive, practiceDuration, timeLeft, drillScore, saveStats]);

  // Answer handler
  const handleAnswerSubmit = (selected: number) => {
    if (drillFeedback !== null) return; // Prevent double answer spam

    const isCorrect = selected === currentQuestion.answer;
    setDrillTotal(t => t + 1);

    if (isCorrect) {
      soundManager.playSuccess();
      haptics.success();
      setDrillFeedback('correct');
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      setDrillCorrect(c => c + 1);
      setDrillScore(s => s + 10 + Math.min(newStreak * 2, 20));

      // Milestone streak celebrations
      if (newStreak === 10 || newStreak === 25 || newStreak === 50) {
        soundManager.playLevelUp();
        fireCelebration({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
      }

      // Update total stats
      saveStats(prev => ({
        ...prev,
        totalAnswered: prev.totalAnswered + 1,
        totalCorrect: prev.totalCorrect + 1,
        bestStreak: Math.max(prev.bestStreak, newStreak)
      }));

      // If they got it right, clear from weak tables if it had mistakes
      clearMistake(currentQuestion.table);

      setTimeout(() => {
        generateQuestion();
        inputRef.current?.focus();
      }, 400);
    } else {
      soundManager.playError();
      haptics.error();
      setDrillFeedback('wrong');
      setCurrentStreak(0);
      recordMistake(currentQuestion.table);

      saveStats(prev => ({
        ...prev,
        totalAnswered: prev.totalAnswered + 1
      }));

      // Pause briefly so student sees correct answer before moving on
      setTimeout(() => {
        generateQuestion();
        inputRef.current?.focus();
      }, 1200);
    }
  };

  // Keyboard navigation for MCQ (1, 2, 3, 4)
  useEffect(() => {
    if (!drillActive || practiceType !== 'mcq') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['1', '2', '3', '4'].includes(e.key)) {
        const idx = parseInt(e.key, 10) - 1;
        if (currentQuestion.options[idx] !== undefined) {
          handleAnswerSubmit(currentQuestion.options[idx]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [drillActive, practiceType, currentQuestion, handleAnswerSubmit]);

  // Handle typing input
  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    setTypeInput(val);

    const numericVal = parseInt(val, 10);
    if (!isNaN(numericVal) && val.length === String(currentQuestion.answer).length) {
      handleAnswerSubmit(numericVal);
    }
  };

  const handleNumpadPress = (digit: string) => {
    haptics.selection();
    if (digit === 'C') {
      setTypeInput('');
      return;
    }
    if (digit === '⌫') {
      setTypeInput(prev => prev.slice(0, -1));
      return;
    }
    const nextVal = typeInput + digit;
    setTypeInput(nextVal);
    const numericVal = parseInt(nextVal, 10);
    if (!isNaN(numericVal) && nextVal.length === String(currentQuestion.answer).length) {
      handleAnswerSubmit(numericVal);
    }
  };

  return (
    <div className="w-full space-y-6 animate-fade-in">
      
      {/* 🧭 Booster Header & Sub-Mode Switcher */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-black shadow-md shrink-0">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                Tables Calculation Booster (1 to 40)
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono">
                {masteredTables.size}/40 Mastered
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              High-speed mental math mastery for SSC, Banking, Railways & CSAT exams.
            </p>
          </div>
        </div>

        {/* 3 Main Action Modes */}
        <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-[#161828] border border-slate-200/80 dark:border-white/10 gap-1 self-start sm:self-auto shrink-0">
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              haptics.selection();
              setActiveMode('learn');
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'learn'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Learn Tables</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              haptics.selection();
              setActiveMode('practice');
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'practice'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>Speed Practice</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              haptics.selection();
              setActiveMode('stats');
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'stats'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            <span>Mastery Matrix</span>
          </button>
        </div>
      </div>

      {/* ===============================================================
          SECTION 1: LEARN MODE
          =============================================================== */}
      {activeMode === 'learn' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Range Selection & View Controls Bar */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-4">
            
            {/* Top row: Range pills + View switcher */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-white/[0.06]">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                <span className="text-xs font-bold text-slate-400 flex items-center gap-1 mr-1 shrink-0">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Range:</span>
                </span>
                {(
                  [
                    { id: '1-10', label: '1 - 10 (Foundations)' },
                    { id: '11-20', label: '11 - 20 (Core Exam)' },
                    { id: '21-30', label: '21 - 30 (Advanced)' },
                    { id: '31-40', label: '31 - 40 (Mastery)' },
                    { id: 'primes', label: 'Primes Only (13,17,19..)' },
                    { id: 'all', label: 'All (1 to 40)' }
                  ] as const
                ).map(r => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      haptics.selection();
                      setRangeFilter(r.id);
                      if (r.id === '1-10') setSelectedTable(7);
                      else if (r.id === '11-20') setSelectedTable(19);
                      else if (r.id === '21-30') setSelectedTable(23);
                      else if (r.id === '31-40') setSelectedTable(37);
                      else if (r.id === 'primes') setSelectedTable(17);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      rangeFilter === r.id
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-white/[0.05] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>

              {/* View Layout Toggle: Single Table vs Matrix Grid */}
              <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
                <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-[#161828] border border-slate-200/80 dark:border-white/10 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setLearnViewType('single');
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                      learnViewType === 'single'
                        ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-2xs'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <ListOrdered className="w-3.5 h-3.5" />
                    <span>Focus View</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setLearnViewType('grid');
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                      learnViewType === 'grid'
                        ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-2xs'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>Grid View</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Table Number Selector Chips */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {visibleTableNumbers.map(num => {
                const isSelected = selectedTable === num;
                const isMastered = masteredTables.has(num);
                const isWeak = !!weakTables[num];
                return (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handleSelectTable(num)}
                    className={`relative px-3.5 py-2 rounded-2xl text-xs font-mono font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md scale-105 ring-2 ring-blue-400/40'
                        : isWeak
                        ? 'bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-400 hover:bg-rose-500/20'
                        : isMastered
                        ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20'
                        : 'bg-slate-100 dark:bg-white/[0.05] border border-slate-200/60 dark:border-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
                    }`}
                  >
                    <span>{num}</span>
                    {isMastered && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                    {isWeak && <Flame className="w-3 h-3 text-rose-500" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* VIEW TYPE 1: SINGLE FOCUS TABLE VIEW */}
          {learnViewType === 'single' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Big Table Card (7 cols) */}
              <div className="lg:col-span-7 p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-6">
                
                {/* Table Header & Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-white/[0.06] pb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black text-2xl font-mono shadow-inner border border-blue-500/30">
                      {selectedTable}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                          Table of {selectedTable}
                        </h3>
                        <button
                          type="button"
                          onClick={() => toggleMastered(selectedTable)}
                          className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                            masteredTables.has(selectedTable)
                              ? 'bg-amber-500/20 text-amber-500'
                              : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-white/10'
                          }`}
                          title={masteredTables.has(selectedTable) ? 'Mastered' : 'Mark as Mastered'}
                        >
                          <Star className="w-4 h-4 fill-current" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {selectedTable} का पहाड़ा • Multiples 1 to {multiplierDepth}
                      </p>
                    </div>
                  </div>

                  {/* Depth & Blind Mode Switchers */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Up to 10 vs 20 */}
                    <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-[#161828] border border-slate-200/80 dark:border-white/10 text-xs font-mono font-bold">
                      <button
                        type="button"
                        onClick={() => {
                          soundManager.playClick();
                          setMultiplierDepth(10);
                        }}
                        className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                          multiplierDepth === 10
                            ? 'bg-blue-600 text-white shadow-2xs'
                            : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        ×10
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          soundManager.playClick();
                          setMultiplierDepth(20);
                        }}
                        className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                          multiplierDepth === 20
                            ? 'bg-blue-600 text-white shadow-2xs'
                            : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        ×20
                      </button>
                    </div>

                    {/* Blind Recall Toggle */}
                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        setIsAnswersHidden(!isAnswersHidden);
                        if (!isAnswersHidden) setRevealedRows(new Set());
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isAnswersHidden
                          ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                          : 'bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {isAnswersHidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{isAnswersHidden ? 'Hidden Mode' : 'Hide Answers'}</span>
                    </button>
                  </div>
                </div>

                {/* Sub Controls: Blind Mode reveal buttons & Auto-runner */}
                <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-[#141626] border border-slate-200/80 dark:border-white/[0.06]">
                  {/* Left: Blind recall reveal buttons */}
                  {isAnswersHidden ? (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleRevealAll}
                        className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-bold hover:bg-emerald-500/25 cursor-pointer"
                      >
                        Reveal All
                      </button>
                      <button
                        type="button"
                        onClick={handleHideAll}
                        className="px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-300 cursor-pointer"
                      >
                        Hide All
                      </button>
                      <span className="text-[11px] text-slate-400">
                        {revealedRows.size}/{multiplierDepth} Revealed
                      </span>
                    </div>
                  ) : (
                    <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                      <span>Tap any row to recite aloud or test mental recall.</span>
                    </div>
                  )}

                  {/* Right: Auto Play Recite Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsSpeechEnabled(!isSpeechEnabled)}
                      className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                        isSpeechEnabled
                          ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400'
                          : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                      }`}
                      title={isSpeechEnabled ? 'Speech Voice Enabled' : 'Voice Muted'}
                    >
                      {isSpeechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        setIsPlayingAuto(!isPlayingAuto);
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isPlayingAuto
                          ? 'bg-rose-500 text-white shadow-xs animate-pulse'
                          : 'bg-blue-600 text-white hover:bg-blue-700 shadow-xs'
                      }`}
                    >
                      {isPlayingAuto ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      <span>{isPlayingAuto ? 'Stop Auto' : 'Auto Recite'}</span>
                    </button>
                  </div>
                </div>

                {/* Multiplication Table Rows Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {Array.from({ length: multiplierDepth }, (_, i) => i + 1).map(mult => {
                    const result = selectedTable * mult;
                    const isRevealed = revealedRows.has(mult);
                    const isHighlighted = autoHighlightRow === mult;

                    return (
                      <div
                        key={mult}
                        onClick={() => {
                          if (isAnswersHidden) {
                            handleToggleRevealRow(mult);
                          } else {
                            handleSpeakSingle(mult);
                          }
                        }}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          isHighlighted
                            ? 'bg-blue-500/20 border-blue-500 text-blue-900 dark:text-blue-200 scale-102 shadow-sm ring-1 ring-blue-500'
                            : 'bg-slate-50 dark:bg-[#141624] border-slate-200/80 dark:border-white/[0.06] hover:border-blue-500/40 hover:bg-blue-500/[0.03]'
                        }`}
                      >
                        {/* Equation: 19 × 7 */}
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-mono font-bold flex items-center justify-center">
                            {mult}
                          </span>
                          <span className="text-sm font-mono font-bold text-slate-800 dark:text-slate-200">
                            {selectedTable} × {mult}
                          </span>
                        </div>

                        {/* Result Display */}
                        {isAnswersHidden && !isRevealed ? (
                          <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 hover:bg-amber-500/25 transition-all">
                            ? Tap
                          </span>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="text-base sm:text-lg font-mono font-black text-blue-600 dark:text-blue-400">
                              = {result}
                            </span>
                            {isAnswersHidden && isRevealed && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Table Navigation Jumpers */}
                <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-white/[0.06]">
                  <button
                    type="button"
                    disabled={selectedTable <= 1}
                    onClick={() => handleSelectTable(selectedTable - 1)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold text-slate-700 dark:text-slate-200 transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Table of {selectedTable - 1}</span>
                  </button>

                  <button
                    type="button"
                    disabled={selectedTable >= 40}
                    onClick={() => handleSelectTable(selectedTable + 1)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold text-slate-700 dark:text-slate-200 transition-all cursor-pointer"
                  >
                    <span>Table of {selectedTable + 1}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Column: Tips, Patterns & Direct Practice Launcher (5 cols) */}
              <div className="lg:col-span-5 space-y-5">
                
                {/* Speed Math Trick & Memory Key */}
                <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm">
                    <Sparkles className="w-4 h-4" />
                    <span>Calculation Shortcut / Memory Hack</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    {TABLE_TIPS[selectedTable] ||
                      `${selectedTable} can be split as ${Math.floor(selectedTable / 10) * 10} + ${selectedTable % 10}. Example: ${selectedTable} × 7 = (${Math.floor(selectedTable / 10) * 10} × 7) + (${selectedTable % 10} × 7) = ${Math.floor(selectedTable / 10) * 70} + ${(selectedTable % 10) * 7} = ${selectedTable * 7}.`}
                  </p>

                  <div className="p-2.5 rounded-xl bg-white/60 dark:bg-black/20 border border-amber-500/20 text-[11px] font-mono text-amber-800 dark:text-amber-300">
                    💡 <strong>Pro Tip:</strong> Active recall by hiding answers improves retrieval speed in mains exams by 4x!
                  </div>
                </div>

                {/* Instant Table Drill Launcher */}
                <div className="p-5 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Target className="w-4 h-4 text-blue-500" />
                      <span>Ready to test Table {selectedTable}?</span>
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Launch an instant speed quiz exclusively for Table of {selectedTable}.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setActiveMode('practice');
                      setPracticeRange('all');
                      handleStartDrill();
                    }}
                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Start Table Speed Drill</span>
                  </button>
                </div>

                {/* Multiples Milestone Table (e.g. ×5, ×10, ×15, ×20) */}
                <div className="p-5 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3">
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono">
                    Anchor Multiples (Key Milestones)
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { mult: 2, label: 'Double (×2)' },
                      { mult: 5, label: 'Half-Dec (×5)' },
                      { mult: 10, label: 'Decade (×10)' },
                      { mult: 15, label: 'Anchor (×15)' }
                    ].map(item => (
                      <div
                        key={item.mult}
                        className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#141624] border border-slate-200/60 dark:border-white/5 flex flex-col justify-between"
                      >
                        <span className="text-[10px] text-slate-400 font-mono">{item.label}</span>
                        <span className="text-sm font-mono font-bold text-slate-900 dark:text-white">
                          {selectedTable} × {item.mult} = {selectedTable * item.mult}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* VIEW TYPE 2: MULTI-TABLE MATRIX GRID */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 animate-fade-in">
              {visibleTableNumbers.map(num => (
                <div
                  key={num}
                  className="p-4 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 hover:border-blue-500/40 transition-all shadow-xs flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/[0.06]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-black font-mono flex items-center justify-center">
                        {num}
                      </span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        Table {num}
                      </span>
                    </div>
                    {masteredTables.has(num) && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    )}
                  </div>

                  <div className="space-y-1 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                    {Array.from({ length: 10 }, (_, i) => i + 1).map(mult => (
                      <div key={mult} className="flex items-center justify-between py-0.5">
                        <span className="text-slate-400">
                          {num} × {mult}
                        </span>
                        <span className="font-bold text-slate-900 dark:text-white">
                          {num * mult}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTable(num);
                      setLearnViewType('single');
                    }}
                    className="w-full py-1.5 rounded-xl bg-slate-100 dark:bg-white/[0.06] hover:bg-blue-600 hover:text-white text-slate-700 dark:text-slate-300 text-xs font-bold transition-all cursor-pointer text-center"
                  >
                    Focus Table {num}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ===============================================================
          SECTION 2: SPEED PRACTICE DRILL ENGINE
          =============================================================== */}
      {activeMode === 'practice' && (
        <div className="space-y-6 animate-fade-in">
          {!drillActive ? (
            /* Setup Phase Card */
            <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs w-full space-y-7">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-3xl bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto shadow-inner">
                  <Target className="w-8 h-8" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  Table Speed Drill Configuration
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
                  Customize the tables and format you want to practice. Speed drills develop split-second calculation reflexes.
                </p>
              </div>

              {/* Setting 1: Select Tables Range */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono">
                  1. Select Tables Range:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                  {[
                    { id: '1-10', label: 'Tables 1 - 10 (Basics)' },
                    { id: '11-20', label: 'Tables 11 - 20 (Core CGL/Bank)' },
                    { id: '21-30', label: 'Tables 21 - 30 (Advanced)' },
                    { id: '31-40', label: 'Tables 31 - 40 (Mastery)' },
                    { id: 'primes', label: 'Primes (13,17,19,23..)' },
                    { id: 'all', label: 'Full Range (1 to 40)' }
                  ].map(r => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        setPracticeRange(r.id as TableRange);
                      }}
                      className={`p-3 rounded-2xl border text-xs font-bold text-left transition-all cursor-pointer ${
                        practiceRange === r.id
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs ring-2 ring-blue-400/30'
                          : 'bg-slate-50 dark:bg-[#141624] border-slate-200/80 dark:border-white/[0.06] text-slate-700 dark:text-slate-300 hover:border-blue-500/40'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Setting 2 & Setting 3 in Responsive 2-Column Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Setting 2: Quiz Format (MCQ vs Direct Typing) */}
                <div className="space-y-2.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono">
                    2. Answer Input Mode:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        setPracticeType('mcq');
                      }}
                      className={`p-3.5 rounded-2xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-3 ${
                        practiceType === 'mcq'
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-slate-50 dark:bg-[#141624] border-slate-200/80 dark:border-white/[0.06] text-slate-700 dark:text-slate-300 hover:border-blue-500/40'
                      }`}
                    >
                      <ListOrdered className="w-5 h-5 shrink-0" />
                      <div className="text-left">
                        <div>4-Choice MCQ</div>
                        <div className="text-[10px] font-normal opacity-80">Keys 1, 2, 3, 4 supported</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        setPracticeType('type');
                      }}
                      className={`p-3.5 rounded-2xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-3 ${
                        practiceType === 'type'
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-slate-50 dark:bg-[#141624] border-slate-200/80 dark:border-white/[0.06] text-slate-700 dark:text-slate-300 hover:border-blue-500/40'
                      }`}
                    >
                      <Hash className="w-5 h-5 shrink-0" />
                      <div className="text-left">
                        <div>Speed Keypad Typing</div>
                        <div className="text-[10px] font-normal opacity-80">Instant auto-check</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Setting 3: Timer Mode */}
                <div className="space-y-2.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono">
                    3. Practice Duration:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        setPracticeDuration('zen');
                      }}
                      className={`p-3.5 rounded-2xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        practiceDuration === 'zen'
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-slate-50 dark:bg-[#141624] border-slate-200/80 dark:border-white/[0.06] text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <Flame className="w-4 h-4" />
                      <span>Streak Mode (Endless)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        setPracticeDuration('60s');
                      }}
                      className={`p-3.5 rounded-2xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        practiceDuration === '60s'
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-slate-50 dark:bg-[#141624] border-slate-200/80 dark:border-white/[0.06] text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <Clock className="w-4 h-4" />
                      <span>60-Second Blitz Test</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Start Button */}
              <button
                type="button"
                onClick={handleStartDrill}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-black text-sm sm:text-base transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Start Practice Drill Now</span>
              </button>
            </div>
          ) : (
            /* Active Drill Arena */
            <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-md w-full max-w-4xl mx-auto space-y-7 animate-scale-in">
              
              {/* Top Stats Bar */}
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 dark:border-white/[0.06] pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 font-mono font-bold text-xs border border-amber-500/20">
                    <Flame className="w-4 h-4 text-amber-500 fill-current" />
                    <span>Streak: {currentStreak}</span>
                  </div>

                  <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                    Score: {drillScore}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {practiceDuration === '60s' && (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400 font-mono font-bold text-xs border border-blue-500/20">
                      <Clock className="w-4 h-4" />
                      <span>{timeLeft}s</span>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setDrillActive(false);
                    }}
                    className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 text-xs font-bold text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
                  >
                    Quit Drill
                  </button>
                </div>
              </div>

              {/* Big Equation Box */}
              <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
                <span className="text-xs uppercase font-mono font-bold text-blue-500 tracking-wider">
                  Calculate in Mind
                </span>

                <div className="text-4xl sm:text-5xl md:text-6xl font-mono font-black text-slate-900 dark:text-white tracking-wider">
                  {currentQuestion.table} × {currentQuestion.multiplier} = ?
                </div>

                {/* Instant Feedback Notice */}
                {drillFeedback === 'correct' && (
                  <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 animate-scale-in">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Correct! +10 Points</span>
                  </div>
                )}
                {drillFeedback === 'wrong' && (
                  <div className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5 animate-scale-in">
                    <XCircle className="w-4 h-4" />
                    <span>Incorrect! Correct answer is {currentQuestion.answer}</span>
                  </div>
                )}
              </div>

              {/* MCQ Options Display */}
              {practiceType === 'mcq' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    {currentQuestion.options.map((opt, idx) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleAnswerSubmit(opt)}
                        className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-[#141624] hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 border border-slate-200/80 dark:border-white/[0.08] hover:border-blue-600 text-xl font-mono font-black text-slate-900 dark:text-white transition-all cursor-pointer shadow-xs active:scale-95 flex items-center justify-between"
                      >
                        <span className="text-xs font-mono font-normal opacity-50">
                          {idx + 1}
                        </span>
                        <span>{opt}</span>
                        <span className="w-3" />
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-center text-slate-400 font-mono">
                    Press keys 1, 2, 3, or 4 on your keyboard for lightning fast selection.
                  </p>
                </div>
              )}

              {/* Direct Typing Input & On-Screen Numpad */}
              {practiceType === 'type' && (
                <div className="space-y-4 max-w-sm mx-auto">
                  <input
                    ref={inputRef}
                    type="text"
                    inputMode="numeric"
                    value={typeInput}
                    onChange={handleTypeChange}
                    placeholder="Type Answer..."
                    className="w-full py-3 text-center text-2xl font-mono font-black rounded-2xl bg-slate-50 dark:bg-[#141624] border-2 border-blue-500/50 text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                    autoFocus
                  />

                  {/* Touch Numpad */}
                  <div className="grid grid-cols-3 gap-2">
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'].map(btn => (
                      <button
                        key={btn}
                        type="button"
                        onClick={() => handleNumpadPress(btn)}
                        className="py-3 rounded-xl bg-slate-100 dark:bg-[#181a2e] hover:bg-blue-600 hover:text-white text-base font-mono font-bold text-slate-800 dark:text-slate-200 transition-all cursor-pointer active:scale-95"
                      >
                        {btn}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 60s Blitz Summary Modal / Card */}
          {showBlitzSummary && (
            <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#0E101B] border-2 border-blue-500/40 shadow-xl w-full max-w-2xl mx-auto text-center space-y-6 animate-scale-in">
              <div className="w-16 h-16 rounded-3xl bg-amber-500/20 text-amber-500 flex items-center justify-center mx-auto shadow-inner">
                <Trophy className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  60-Second Blitz Complete!
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Awesome mental calculation sprint session.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2.5 p-4 rounded-2xl bg-slate-50 dark:bg-[#141624]">
                <div>
                  <div className="text-xs text-slate-400 font-mono">Score</div>
                  <div className="text-xl font-mono font-black text-blue-600 dark:text-blue-400">
                    {drillScore}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-mono">Accuracy</div>
                  <div className="text-xl font-mono font-black text-emerald-600 dark:text-emerald-400">
                    {drillTotal > 0 ? Math.round((drillCorrect / drillTotal) * 100) : 0}%
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-mono">Solved</div>
                  <div className="text-xl font-mono font-black text-purple-600 dark:text-purple-400">
                    {drillCorrect}/{drillTotal}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleStartDrill}
                className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-md cursor-pointer"
              >
                Play Again
              </button>
            </div>
          )}
        </div>
      )}

      {/* ===============================================================
          SECTION 3: MASTERY & STATS MATRIX
          =============================================================== */}
      {activeMode === 'stats' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Top Performance Numbers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-5 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-1">
              <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-blue-500" />
                <span>Mastered Tables</span>
              </span>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
                {masteredTables.size} / 40
              </div>
              <div className="w-full bg-slate-100 dark:bg-white/10 h-1.5 rounded-full overflow-hidden mt-2">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(masteredTables.size / 40) * 100}%` }}
                />
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-1">
              <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>Best Streak</span>
              </span>
              <div className="text-2xl sm:text-3xl font-black text-amber-500 font-mono">
                {stats.bestStreak}
              </div>
              <p className="text-[10px] text-slate-400">Consecutive correct answers</p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-1">
              <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-purple-500" />
                <span>60s Blitz Record</span>
              </span>
              <div className="text-2xl sm:text-3xl font-black text-purple-500 font-mono">
                {stats.blitzRecord} pts
              </div>
              <p className="text-[10px] text-slate-400">Personal best timed score</p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-1">
              <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5 text-emerald-500" />
                <span>Drill Accuracy</span>
              </span>
              <div className="text-2xl sm:text-3xl font-black text-emerald-500 font-mono">
                {stats.totalAnswered > 0
                  ? Math.round((stats.totalCorrect / stats.totalAnswered) * 100)
                  : 0}
                %
              </div>
              <p className="text-[10px] text-slate-400">
                {stats.totalCorrect}/{stats.totalAnswered} questions correct
              </p>
            </div>
          </div>

          {/* 1 to 40 Matrix Grid */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-white/[0.06]">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>Multiplication Table Heatmap (1 to 40)</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Green indicates mastered tables. Red indicates tables where mistakes were made during speed practice.
                </p>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-3 text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-slate-600 dark:text-slate-300">Mastered</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500" />
                  <span className="text-slate-600 dark:text-slate-300">Needs Practice</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-slate-300 dark:bg-white/20" />
                  <span className="text-slate-600 dark:text-slate-300">In Progress</span>
                </div>
              </div>
            </div>

            {/* 40 Grid Matrix */}
            <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2.5">
              {Array.from({ length: 40 }, (_, i) => i + 1).map(num => {
                const isMastered = masteredTables.has(num);
                const isWeak = !!weakTables[num];

                return (
                  <div
                    key={num}
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedTable(num);
                      setActiveMode('learn');
                      setLearnViewType('single');
                    }}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between gap-1 hover:scale-105 ${
                      isWeak
                        ? 'bg-rose-500/15 border-rose-500/40 text-rose-700 dark:text-rose-400'
                        : isMastered
                        ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-400'
                        : 'bg-slate-50 dark:bg-[#141624] border-slate-200/60 dark:border-white/5 text-slate-700 dark:text-slate-300 hover:border-blue-500/40'
                    }`}
                  >
                    <span className="text-sm sm:text-base font-mono font-black">{num}</span>
                    <span className="text-[9px] font-mono opacity-70">
                      {isWeak ? 'Weak' : isMastered ? 'Master' : 'Practice'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
