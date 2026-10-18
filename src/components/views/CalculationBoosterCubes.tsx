import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import {
  Boxes,
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
  Filter,
  Clock,
  Star,
  Brain,
  Hash,
  BarChart2,
  ListOrdered,
  LayoutGrid,
  Zap,
  Sparkles
} from 'lucide-react';
import { soundManager } from '../../utils/soundEffects';
import { haptics } from '../../utils/haptics';
import { fireCelebration } from '../../utils/confettiHelper';

// ---------------------------------------------------------------------
// STORAGE KEYS & CONSTANTS
// ---------------------------------------------------------------------
const STORAGE_KEY_MASTERED_CUBES = 'syllabus3d_cubes_mastered_v1';
const STORAGE_KEY_STATS_CUBES = 'syllabus3d_cubes_stats_v1';
const STORAGE_KEY_WEAK_CUBES = 'syllabus3d_cubes_weak_v1';

export type CubeRange = '1-10' | '11-20' | '21-30' | 'ending-5' | 'all' | 'weak';
export type CubesBoosterMode = 'learn' | 'practice' | 'stats';
export type PracticeType = 'mcq' | 'type';
export type PracticeDuration = 'zen' | '60s';
export type PracticeQuestionType = 'cube' | 'root' | 'mixed';

interface CubeStats {
  totalAnswered: number;
  totalCorrect: number;
  bestStreak: number;
  blitzRecord: number;
}

const DEFAULT_STATS: CubeStats = {
  totalAnswered: 0,
  totalCorrect: 0,
  bestStreak: 0,
  blitzRecord: 0
};

// Pre-computed cubes 1 to 30
export const CUBES_MAP: Record<number, number> = {};
for (let i = 1; i <= 30; i++) {
  CUBES_MAP[i] = i * i * i;
}

// Vedic mental math trick generator for any cube 1 to 30
export function getCubeTrick(n: number): string {
  if (n <= 10) {
    return `Fundamental base cube: ${n}³ = ${n * n * n}. Memorizing 1 to 10 cubes is the key foundation for solving all cube root questions in 2 seconds.`;
  }
  if (n % 10 === 0) {
    const tens = n / 10;
    return `Ends in 0: Cube ${tens} (${tens * tens * tens}) and append three zeros (000) ➔ ${n * n * n}.`;
  }
  if (n === 11) {
    return `Pascal's Triangle row (1, 3, 3, 1): 11³ = 1331. One of the most repeated numbers in Compound Interest.`;
  }
  if (n === 12) {
    return `Vedic Ratio method (1 : 2): 1 | 2 | 4 | 8. Double middle: _ | 4 | 8 | _. Sum columns with carry ➔ 1728.`;
  }
  if (n === 15) {
    return `15³ = 3375. Repeated frequently in 3-year CI problems at 15% rate.`;
  }
  if (n === 16) {
    return `Power of 2: 16³ = (2⁴)³ = 2¹² = 4096. Fundamental in binary powers.`;
  }
  if (n === 21) {
    return `CI 3-year multiplier for 5% interest (20³ = 8000, 21³ = 9261). Crucial exam ratio!`;
  }
  if (n === 25) {
    return `25³ = 25 × 625 = 15,625. Common benchmark in geometry and volume calculations.`;
  }

  const lastDigit = n % 10;
  if ([0, 1, 4, 5, 6, 9].includes(lastDigit)) {
    return `Same Last Digit Property: Numbers ending in ${lastDigit} always cube to end in ${lastDigit}. ${n}³ = ${n * n * n}.`;
  }
  if (lastDigit === 2 || lastDigit === 8) {
    return `Inverse Pair (2 ↔ 8): Unit digit ${lastDigit} cubes to end in ${lastDigit === 2 ? 8 : 2} (sum equals 10). ${n}³ = ${n * n * n}.`;
  }
  if (lastDigit === 3 || lastDigit === 7) {
    return `Inverse Pair (3 ↔ 7): Unit digit ${lastDigit} cubes to end in ${lastDigit === 3 ? 7 : 3} (sum equals 10). ${n}³ = ${n * n * n}.`;
  }

  return `Vedic Expansion: (a + b)³ = a³ + 3a²b + 3ab² + b³ = ${n * n * n}.`;
}

// Unit digit cube rule
export function getCubeUnitDigitRule(n: number): string {
  const last = n % 10;
  const cubeLast = (last * last * last) % 10;
  if (last === cubeLast) {
    return `Same unit digit: ${last}³ ends in ${cubeLast}`;
  }
  return `Invert rule (sum=10): ${last}³ ends in ${cubeLast} (${last} + ${cubeLast} = 10)`;
}

export const CalculationBoosterCubes: React.FC = () => {
  // Navigation Modes
  const [activeMode, setActiveMode] = useState<CubesBoosterMode>('learn');

  // -------------------------------------------------------------------
  // PERSISTENCE STATE (Mastered & Stats)
  // -------------------------------------------------------------------
  const [masteredCubes, setMasteredCubes] = useState<Set<number>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MASTERED_CUBES);
      return saved ? new Set(JSON.parse(saved)) : new Set([1, 2, 3, 4, 5, 10]);
    } catch {
      return new Set([1, 2, 3, 4, 5, 10]);
    }
  });

  const [stats, setStats] = useState<CubeStats>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STATS_CUBES);
      return saved ? { ...DEFAULT_STATS, ...JSON.parse(saved) } : DEFAULT_STATS;
    } catch {
      return DEFAULT_STATS;
    }
  });

  const [weakCubes, setWeakCubes] = useState<Record<number, number>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_WEAK_CUBES);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const saveStats = useCallback((updater: (prev: CubeStats) => CubeStats) => {
    setStats(prev => {
      const next = updater(prev);
      try {
        localStorage.setItem(STORAGE_KEY_STATS_CUBES, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const recordMistake = useCallback((num: number) => {
    setWeakCubes(prev => {
      const next = { ...prev, [num]: (prev[num] || 0) + 1 };
      try {
        localStorage.setItem(STORAGE_KEY_WEAK_CUBES, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const clearMistake = useCallback((num: number) => {
    setWeakCubes(prev => {
      if (!prev[num]) return prev;
      const next = { ...prev };
      delete next[num];
      try {
        localStorage.setItem(STORAGE_KEY_WEAK_CUBES, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const toggleMastered = (num: number) => {
    soundManager.playSuccess();
    haptics.success();
    setMasteredCubes(prev => {
      const next = new Set(prev);
      if (next.has(num)) {
        next.delete(num);
      } else {
        next.add(num);
        fireCelebration({ particleCount: 25, spread: 50, origin: { y: 0.8 } });
      }
      try {
        localStorage.setItem(STORAGE_KEY_MASTERED_CUBES, JSON.stringify([...next]));
      } catch {}
      return next;
    });
  };

  // -------------------------------------------------------------------
  // LEARN MODE STATE
  // -------------------------------------------------------------------
  const [selectedNum, setSelectedNum] = useState<number>(17);
  const [rangeFilter, setRangeFilter] = useState<CubeRange>('11-20');
  const [isAnswersHidden, setIsAnswersHidden] = useState<boolean>(false);
  const [revealedNumbers, setRevealedNumbers] = useState<Set<number>>(new Set());
  const [learnViewType, setLearnViewType] = useState<'single' | 'grid'>('single');
  const [isSpeechEnabled, setIsSpeechEnabled] = useState<boolean>(false);
  const [isPlayingAuto, setIsPlayingAuto] = useState<boolean>(false);

  // Auto Recite Timer
  useEffect(() => {
    if (!isPlayingAuto) return;

    const speakItem = (n: number) => {
      const cube = n * n * n;
      if (isSpeechEnabled && typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(`Cube of ${n} is ${cube}`);
          utterance.rate = 1.05;
          window.speechSynthesis.speak(utterance);
        } catch {}
      } else {
        soundManager.playClick();
      }
    };

    speakItem(selectedNum);

    const interval = setInterval(() => {
      setSelectedNum(prev => {
        if (prev >= 30) {
          setIsPlayingAuto(false);
          soundManager.playLevelUp();
          return 1;
        }
        const next = prev + 1;
        speakItem(next);
        return next;
      });
    }, 1800);

    return () => {
      clearInterval(interval);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isPlayingAuto, selectedNum, isSpeechEnabled]);

  // Compute number list based on range filter
  const visibleNumbers = useMemo(() => {
    if (rangeFilter === '1-10') return Array.from({ length: 10 }, (_, i) => i + 1);
    if (rangeFilter === '11-20') return Array.from({ length: 10 }, (_, i) => i + 11);
    if (rangeFilter === '21-30') return Array.from({ length: 10 }, (_, i) => i + 21);
    if (rangeFilter === 'ending-5') return [5, 15, 25];
    if (rangeFilter === 'weak') {
      const weaks = Object.keys(weakCubes).map(Number);
      return weaks.length > 0 ? weaks : [13, 17, 19, 23, 27, 29];
    }
    return Array.from({ length: 30 }, (_, i) => i + 1);
  }, [rangeFilter, weakCubes]);

  const handleSelectNumber = (num: number) => {
    soundManager.playClick();
    haptics.selection();
    setSelectedNum(num);
    setIsPlayingAuto(false);
  };

  const handleToggleReveal = (num: number) => {
    soundManager.playClick();
    haptics.selection();
    setRevealedNumbers(prev => {
      const next = new Set(prev);
      if (next.has(num)) next.delete(num);
      else next.add(num);
      return next;
    });
  };

  const handleSpeakSingle = (n: number) => {
    soundManager.playClick();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const text = `Cube of ${n} is ${n * n * n}`;
        const u = new SpeechSynthesisUtterance(text);
        u.rate = 1.0;
        window.speechSynthesis.speak(u);
      } catch {}
    }
  };

  // -------------------------------------------------------------------
  // PRACTICE DRILL ENGINE STATE
  // -------------------------------------------------------------------
  const [practiceRange, setPracticeRange] = useState<CubeRange>('11-20');
  const [practiceType, setPracticeType] = useState<PracticeType>('mcq');
  const [practiceDuration, setPracticeDuration] = useState<PracticeDuration>('zen');
  const [practiceQType, setPracticeQType] = useState<PracticeQuestionType>('cube');
  const [drillActive, setDrillActive] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(60);

  // Drill question state
  const [currentQuestion, setCurrentQuestion] = useState<{
    num: number;
    cube: number;
    isRoot: boolean;
    questionText: string;
    answer: number;
    options: number[];
  }>({
    num: 17,
    cube: 4913,
    isRoot: false,
    questionText: '17³ = ?',
    answer: 4913,
    options: [4813, 4913, 4923, 5013]
  });

  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [drillScore, setDrillScore] = useState<number>(0);
  const [drillCorrect, setDrillCorrect] = useState<number>(0);
  const [drillTotal, setDrillTotal] = useState<number>(0);
  const [drillFeedback, setDrillFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [typeInput, setTypeInput] = useState<string>('');
  const [showBlitzSummary, setShowBlitzSummary] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Practice number pool
  const practiceNumberPool = useMemo(() => {
    if (practiceRange === '1-10') return Array.from({ length: 10 }, (_, i) => i + 1);
    if (practiceRange === '11-20') return Array.from({ length: 10 }, (_, i) => i + 11);
    if (practiceRange === '21-30') return Array.from({ length: 10 }, (_, i) => i + 21);
    if (practiceRange === 'ending-5') return [5, 15, 25];
    if (practiceRange === 'weak') {
      const weaks = Object.keys(weakCubes).map(Number);
      return weaks.length > 0 ? weaks : [13, 17, 19, 23, 27, 29];
    }
    return Array.from({ length: 30 }, (_, i) => i + 1);
  }, [practiceRange, weakCubes]);

  // Generate a new random question
  const generateQuestion = useCallback(() => {
    const pool = practiceNumberPool;
    const num = pool[Math.floor(Math.random() * pool.length)];
    const cube = num * num * num;

    const isRoot =
      practiceQType === 'root'
        ? true
        : practiceQType === 'cube'
        ? false
        : Math.random() > 0.5;

    let questionText = '';
    let answer = 0;
    const wrong = new Set<number>();

    if (isRoot) {
      questionText = `∛${cube} = ?`;
      answer = num;
      while (wrong.size < 3) {
        const offset = (Math.floor(Math.random() * 4) + 1) * (Math.random() > 0.5 ? 1 : -1);
        const candidate = answer + offset;
        if (candidate > 0 && candidate <= 30 && candidate !== answer) {
          wrong.add(candidate);
        }
      }
    } else {
      questionText = `${num}³ = ?`;
      answer = cube;

      // Generate smart distractors
      while (wrong.size < 3) {
        const offsets = [
          100,
          -100,
          (num + 1) * (num + 1) * (num + 1) - cube,
          (num - 1) * (num - 1) * (num - 1) - cube,
          (Math.floor(Math.random() * 5) + 1) * (Math.random() > 0.5 ? 50 : -50)
        ];
        const offset = offsets[Math.floor(Math.random() * offsets.length)];
        const candidate = answer + offset;
        if (candidate > 0 && candidate !== answer) {
          wrong.add(candidate);
        }
      }
    }

    const options = [...wrong, answer].sort(() => Math.random() - 0.5);
    setCurrentQuestion({ num, cube, isRoot, questionText, answer, options });
    setDrillFeedback(null);
    setTypeInput('');
  }, [practiceNumberPool, practiceQType]);

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

  // 60s Blitz Countdown
  useEffect(() => {
    if (!drillActive || practiceDuration !== '60s') return;

    if (timeLeft <= 0) {
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
    if (drillFeedback !== null) return;

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

      if (newStreak === 10 || newStreak === 25 || newStreak === 50) {
        soundManager.playLevelUp();
        fireCelebration({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
      }

      saveStats(prev => ({
        ...prev,
        totalAnswered: prev.totalAnswered + 1,
        totalCorrect: prev.totalCorrect + 1,
        bestStreak: Math.max(prev.bestStreak, newStreak)
      }));

      clearMistake(currentQuestion.num);

      setTimeout(() => {
        generateQuestion();
        inputRef.current?.focus();
      }, 400);
    } else {
      soundManager.playError();
      haptics.error();
      setDrillFeedback('wrong');
      setCurrentStreak(0);
      recordMistake(currentQuestion.num);

      saveStats(prev => ({
        ...prev,
        totalAnswered: prev.totalAnswered + 1
      }));

      setTimeout(() => {
        generateQuestion();
        inputRef.current?.focus();
      }, 1300);
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
      
      {/* 🧭 Cubes Header & Sub-Mode Switcher */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-500 text-white flex items-center justify-center font-black shadow-md shrink-0">
            <Boxes className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                Cubes & Cube Roots Booster (1 to 30)
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-mono">
                {masteredCubes.size}/30 Mastered
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              High-yield cubes for Compound Interest, Geometry & simplification drills.
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
                ? 'bg-cyan-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Learn Cubes</span>
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
                ? 'bg-cyan-600 text-white shadow-xs'
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
                ? 'bg-cyan-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            <span>Mastery Matrix</span>
          </button>
        </div>
      </div>

      {/* ===============================================================
          SECTION 1: LEARN CUBES (1 to 30)
          =============================================================== */}
      {activeMode === 'learn' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Controls Bar: Range filters + View Toggle */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-4">
            
            {/* Top row: Range pills */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-white/[0.06]">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                <span className="text-xs font-bold text-slate-400 flex items-center gap-1 mr-1 shrink-0">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Range:</span>
                </span>
                {(
                  [
                    { id: '1-10', label: '1 - 10 (Foundations)' },
                    { id: '11-20', label: '11 - 20 (Core Exam Tier)' },
                    { id: '21-30', label: '21 - 30 (Advanced Tier)' },
                    { id: 'ending-5', label: 'Ending in 5 (5, 15, 25)' },
                    { id: 'all', label: 'All (1 to 30)' }
                  ] as const
                ).map(r => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      haptics.selection();
                      setRangeFilter(r.id);
                      if (r.id === '1-10') setSelectedNum(7);
                      else if (r.id === '11-20') setSelectedNum(17);
                      else if (r.id === '21-30') setSelectedNum(23);
                      else if (r.id === 'ending-5') setSelectedNum(15);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      rangeFilter === r.id
                        ? 'bg-cyan-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-white/[0.05] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>

              {/* View Layout Switcher */}
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
                        ? 'bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 shadow-2xs'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <ListOrdered className="w-3.5 h-3.5" />
                    <span>Focus Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setLearnViewType('grid');
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                      learnViewType === 'grid'
                        ? 'bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 shadow-2xs'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>Grid View</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Number Chips 1 to 30 */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {visibleNumbers.map(num => {
                const isSelected = selectedNum === num;
                const isMastered = masteredCubes.has(num);
                const isWeak = !!weakCubes[num];

                return (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handleSelectNumber(num)}
                    className={`relative px-3.5 py-2 rounded-2xl text-xs font-mono font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md scale-105 ring-2 ring-cyan-400/40'
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

          {/* VIEW TYPE 1: FOCUS SINGLE CUBE CARD EXPLORER */}
          {learnViewType === 'single' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Big Interactive Cube Showcase (7 cols) */}
              <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-6">
                
                {/* Header with Star and Blind recall */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/[0.06] pb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                      Cube Explorer
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleMastered(selectedNum)}
                      className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                        masteredCubes.has(selectedNum)
                          ? 'bg-amber-500/20 text-amber-500'
                          : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100'
                      }`}
                      title={masteredCubes.has(selectedNum) ? 'Mastered' : 'Mark as Mastered'}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsSpeechEnabled(!isSpeechEnabled)}
                      className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                        isSpeechEnabled
                          ? 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-400'
                          : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                      }`}
                      title={isSpeechEnabled ? 'Voice Enabled' : 'Voice Muted'}
                    >
                      {isSpeechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        setIsAnswersHidden(!isAnswersHidden);
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isAnswersHidden
                          ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                          : 'bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {isAnswersHidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{isAnswersHidden ? 'Answer Hidden' : 'Hide Answer'}</span>
                    </button>
                  </div>
                </div>

                {/* Main Hero Equation Display */}
                <div className="py-8 sm:py-12 flex flex-col items-center justify-center text-center space-y-4 rounded-3xl bg-gradient-to-br from-cyan-900/10 via-blue-900/5 to-slate-900/20 border border-cyan-500/20">
                  <div className="text-sm font-mono font-bold text-slate-400 uppercase tracking-widest">
                    Cube of {selectedNum} (घन)
                  </div>

                  <div className="flex items-center justify-center gap-3 text-4xl sm:text-6xl font-mono font-black text-slate-900 dark:text-white">
                    <span>{selectedNum}³</span>
                    <span className="text-cyan-500">=</span>

                    {isAnswersHidden && !revealedNumbers.has(selectedNum) ? (
                      <button
                        type="button"
                        onClick={() => handleToggleReveal(selectedNum)}
                        className="px-6 py-2 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 border-2 border-dashed border-amber-500 text-2xl sm:text-3xl font-mono font-bold hover:bg-amber-500/30 transition-all cursor-pointer"
                      >
                        ? Tap to Reveal
                      </button>
                    ) : (
                      <span className="text-cyan-600 dark:text-cyan-400 animate-scale-in">
                        {CUBES_MAP[selectedNum]}
                      </span>
                    )}
                  </div>

                  {/* Reverse Cube Root Relation */}
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-mono font-bold text-slate-500 dark:text-slate-400 bg-white/60 dark:bg-black/30 px-4 py-1.5 rounded-xl border border-slate-200/60 dark:border-white/10">
                    <span>Cube Root:</span>
                    <span className="text-slate-900 dark:text-white">
                      ∛{CUBES_MAP[selectedNum]} = {selectedNum}
                    </span>
                  </div>
                </div>

                {/* Key Insights & Unit Digit Indicator */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#141624] border border-slate-200/80 dark:border-white/[0.06] space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                      Cube Unit Digit Property
                    </span>
                    <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {getCubeUnitDigitRule(selectedNum)}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#141624] border border-slate-200/80 dark:border-white/[0.06] space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                      Exam Frequency
                    </span>
                    <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {selectedNum <= 10
                        ? 'Essential Foundation (1 - 10)'
                        : selectedNum <= 20
                        ? 'High-Yield CI Tier (11 - 20)'
                        : 'Advanced Mastery (21 - 30)'}
                    </div>
                  </div>
                </div>

                {/* Bottom Navigation */}
                <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-white/[0.06]">
                  <button
                    type="button"
                    disabled={selectedNum <= 1}
                    onClick={() => handleSelectNumber(selectedNum - 1)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold text-slate-700 dark:text-slate-200 transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>{selectedNum - 1}³ ({selectedNum > 1 ? (selectedNum - 1) * (selectedNum - 1) * (selectedNum - 1) : ''})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSpeakSingle(selectedNum)}
                    className="px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Recite</span>
                  </button>

                  <button
                    type="button"
                    disabled={selectedNum >= 30}
                    onClick={() => handleSelectNumber(selectedNum + 1)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold text-slate-700 dark:text-slate-200 transition-all cursor-pointer"
                  >
                    <span>{selectedNum + 1}³ ({selectedNum < 30 ? (selectedNum + 1) * (selectedNum + 1) * (selectedNum + 1) : ''})</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Column: Vedic Mental Math Trick & Drill Launcher (5 cols) */}
              <div className="lg:col-span-5 space-y-5">
                
                {/* Vedic Mental Math Trick Card */}
                <div className="p-6 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-cyan-500/5 to-transparent border border-cyan-500/20 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-400 font-bold text-sm">
                    <Sparkles className="w-4 h-4" />
                    <span>Vedic Cube Shortcut & CI Property</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    {getCubeTrick(selectedNum)}
                  </p>

                  <div className="p-3 rounded-2xl bg-white/70 dark:bg-black/30 border border-cyan-500/20 text-[11px] font-mono text-cyan-800 dark:text-cyan-300 space-y-1">
                    <div>
                      💡 <strong>Vedic Cube Root Instant Rule:</strong>
                    </div>
                    <div>1. Last 3 digits cut karein.</div>
                    <div>2. Remaining number se closest cube root dekhein (tens digit).</div>
                    <div>3. Unit digit rule (2 ↔ 8, 3 ↔ 7, others same) se unit digit instant milta hai!</div>
                  </div>
                </div>

                {/* Instant Drill Launcher */}
                <div className="p-5 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Target className="w-4 h-4 text-cyan-500" />
                      <span>Test Your Cube Recall</span>
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Ready to test Cubes 1 to 30 under speed timer pressure?
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
                    className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Start Cubes Speed Drill</span>
                  </button>
                </div>

                {/* Landmark Cubes Table */}
                <div className="p-5 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3">
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono">
                    High-Frequency Landmark Cubes
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { n: 11, val: 1331, tag: '10% CI Anchor' },
                      { n: 12, val: 1728, tag: 'Gross (12³)' },
                      { n: 20, val: 8000, tag: 'Base 20' },
                      { n: 21, val: 9261, tag: '5% CI Anchor' }
                    ].map(item => (
                      <div
                        key={item.n}
                        onClick={() => setSelectedNum(item.n)}
                        className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#141624] border border-slate-200/60 dark:border-white/5 cursor-pointer hover:border-cyan-500/40 transition-all flex flex-col justify-between"
                      >
                        <span className="text-[10px] text-slate-400 font-mono">{item.tag}</span>
                        <span className="text-sm font-mono font-bold text-slate-900 dark:text-white">
                          {item.n}³ = {item.val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* VIEW TYPE 2: GRID MATRIX OVERVIEW */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 animate-fade-in">
              {visibleNumbers.map(num => {
                const cube = CUBES_MAP[num];
                const isMastered = masteredCubes.has(num);

                return (
                  <div
                    key={num}
                    onClick={() => {
                      setSelectedNum(num);
                      setLearnViewType('single');
                    }}
                    className="p-4 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 hover:border-cyan-500/40 hover:scale-102 transition-all shadow-xs flex flex-col justify-between space-y-2 cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-slate-400">
                        {num}³
                      </span>
                      {isMastered && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                    </div>

                    <div className="text-xl font-mono font-black text-cyan-600 dark:text-cyan-400">
                      {cube}
                    </div>

                    <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-white/[0.06] pt-1.5 flex items-center justify-between">
                      <span>∛{cube}</span>
                      <span>= {num}</span>
                    </div>
                  </div>
                );
              })}
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
            /* Drill Setup Phase */
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs max-w-3xl mx-auto space-y-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-3xl bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mx-auto shadow-inner">
                  <Target className="w-8 h-8" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  Cubes Speed Drill Configuration
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                  Master instant cube and cube root recall under timer pressure for competitive exams.
                </p>
              </div>

              {/* Setting 1: Range */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono">
                  1. Select Range:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: '1-10', label: '1 - 10 (Foundations)' },
                    { id: '11-20', label: '11 - 20 (Core Exam Tier)' },
                    { id: '21-30', label: '21 - 30 (Advanced Tier)' },
                    { id: 'ending-5', label: 'Ending in 5' },
                    { id: 'all', label: 'Full Range (1 to 30)' }
                  ].map(r => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        setPracticeRange(r.id as CubeRange);
                      }}
                      className={`p-3 rounded-2xl border text-xs font-bold text-left transition-all cursor-pointer ${
                        practiceRange === r.id
                          ? 'bg-cyan-600 text-white border-cyan-600 shadow-xs'
                          : 'bg-slate-50 dark:bg-[#141624] border-slate-200/80 dark:border-white/[0.06] text-slate-700 dark:text-slate-300 hover:border-cyan-500/40'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Setting 2: Question Type (Cube, Root, Mixed) */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono">
                  2. Question Mode:
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'cube', label: 'Cube (N³ = ?)' },
                    { id: 'root', label: 'Cube Root (∛X = ?)' },
                    { id: 'mixed', label: 'Mixed (Both)' }
                  ].map(q => (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        setPracticeQType(q.id as PracticeQuestionType);
                      }}
                      className={`p-3 rounded-2xl border text-xs font-bold text-center transition-all cursor-pointer ${
                        practiceQType === q.id
                          ? 'bg-cyan-600 text-white border-cyan-600 shadow-xs'
                          : 'bg-slate-50 dark:bg-[#141624] border-slate-200/80 dark:border-white/[0.06] text-slate-700 dark:text-slate-300 hover:border-cyan-500/40'
                      }`}
                    >
                      {q.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Setting 3: Input Format & Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono">
                    3. Input Mode:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPracticeType('mcq')}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        practiceType === 'mcq'
                          ? 'bg-cyan-600 text-white border-cyan-600'
                          : 'bg-slate-50 dark:bg-[#141624] border-slate-200/80 dark:border-white/[0.06] text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      4-Choice MCQ
                    </button>
                    <button
                      type="button"
                      onClick={() => setPracticeType('type')}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        practiceType === 'type'
                          ? 'bg-cyan-600 text-white border-cyan-600'
                          : 'bg-slate-50 dark:bg-[#141624] border-slate-200/80 dark:border-white/[0.06] text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      Type Answer
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono">
                    4. Drill Duration:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPracticeDuration('zen')}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        practiceDuration === 'zen'
                          ? 'bg-cyan-600 text-white border-cyan-600'
                          : 'bg-slate-50 dark:bg-[#141624] border-slate-200/80 dark:border-white/[0.06] text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <Flame className="w-3.5 h-3.5" />
                      <span>Streak</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPracticeDuration('60s')}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        practiceDuration === '60s'
                          ? 'bg-cyan-600 text-white border-cyan-600'
                          : 'bg-slate-50 dark:bg-[#141624] border-slate-200/80 dark:border-white/[0.06] text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>60s Blitz</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Start Button */}
              <button
                type="button"
                onClick={handleStartDrill}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-700 hover:to-indigo-700 text-white font-black text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Start Cubes Drill Now</span>
              </button>
            </div>
          ) : (
            /* Active Drill Arena */
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-md max-w-2xl mx-auto space-y-6 animate-scale-in">
              
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
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 font-mono font-bold text-xs border border-cyan-500/20">
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
                <span className="text-xs uppercase font-mono font-bold text-cyan-500 tracking-wider">
                  Calculate Cube in Mind
                </span>

                <div className="text-4xl sm:text-5xl md:text-6xl font-mono font-black text-slate-900 dark:text-white tracking-wider">
                  {currentQuestion.questionText}
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
                        className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-[#141624] hover:bg-cyan-600 hover:text-white dark:hover:bg-cyan-600 border border-slate-200/80 dark:border-white/[0.08] hover:border-cyan-600 text-xl font-mono font-black text-slate-900 dark:text-white transition-all cursor-pointer shadow-xs active:scale-95 flex items-center justify-between"
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
                    className="w-full py-3 text-center text-2xl font-mono font-black rounded-2xl bg-slate-50 dark:bg-[#141624] border-2 border-cyan-500/50 text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-cyan-500/20"
                    autoFocus
                  />

                  {/* Touch Numpad */}
                  <div className="grid grid-cols-3 gap-2">
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'].map(btn => (
                      <button
                        key={btn}
                        type="button"
                        onClick={() => handleNumpadPress(btn)}
                        className="py-3 rounded-xl bg-slate-100 dark:bg-[#181a2e] hover:bg-cyan-600 hover:text-white text-base font-mono font-bold text-slate-800 dark:text-slate-200 transition-all cursor-pointer active:scale-95"
                      >
                        {btn}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 60s Blitz Summary Card */}
          {showBlitzSummary && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0E101B] border-2 border-cyan-500/40 shadow-xl max-w-lg mx-auto text-center space-y-5 animate-scale-in">
              <div className="w-16 h-16 rounded-3xl bg-amber-500/20 text-amber-500 flex items-center justify-center mx-auto shadow-inner">
                <Trophy className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  60-Second Cubes Blitz Complete!
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Awesome mental calculation sprint session.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2.5 p-4 rounded-2xl bg-slate-50 dark:bg-[#141624]">
                <div>
                  <div className="text-xs text-slate-400 font-mono">Score</div>
                  <div className="text-xl font-mono font-black text-cyan-600 dark:text-cyan-400">
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
                  <div className="text-xl font-mono font-black text-blue-600 dark:text-blue-400">
                    {drillCorrect}/{drillTotal}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleStartDrill}
                className="w-full py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs transition-all shadow-md cursor-pointer"
              >
                Play Again
              </button>
            </div>
          )}
        </div>
      )}

      {/* ===============================================================
          SECTION 3: MASTERY MATRIX (1 to 30)
          =============================================================== */}
      {activeMode === 'stats' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Top Performance Numbers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-5 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-1">
              <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-cyan-500" />
                <span>Mastered Cubes</span>
              </span>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
                {masteredCubes.size} / 30
              </div>
              <div className="w-full bg-slate-100 dark:bg-white/10 h-1.5 rounded-full overflow-hidden mt-2">
                <div
                  className="bg-cyan-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(masteredCubes.size / 30) * 100}%` }}
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
                <Trophy className="w-3.5 h-3.5 text-blue-500" />
                <span>60s Blitz Record</span>
              </span>
              <div className="text-2xl sm:text-3xl font-black text-blue-500 font-mono">
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

          {/* 1 to 30 Matrix Grid */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-white/[0.06]">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>Cubes Heatmap (1 to 30)</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Green indicates mastered cubes. Red indicates numbers where mistakes were made during speed practice.
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

            {/* 30 Grid Matrix */}
            <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-2.5">
              {Array.from({ length: 30 }, (_, i) => i + 1).map(num => {
                const isMastered = masteredCubes.has(num);
                const isWeak = !!weakCubes[num];

                return (
                  <div
                    key={num}
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedNum(num);
                      setActiveMode('learn');
                      setLearnViewType('single');
                    }}
                    className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between gap-0.5 hover:scale-105 ${
                      isWeak
                        ? 'bg-rose-500/15 border-rose-500/40 text-rose-700 dark:text-rose-400'
                        : isMastered
                        ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-400'
                        : 'bg-slate-50 dark:bg-[#141624] border-slate-200/60 dark:border-white/5 text-slate-700 dark:text-slate-300 hover:border-cyan-500/40'
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-mono font-black">{num}³</span>
                    <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400">
                      {CUBES_MAP[num]}
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
