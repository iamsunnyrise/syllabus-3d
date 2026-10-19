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
  Zap
} from 'lucide-react';
import { soundManager } from '../../utils/soundEffects';
import { haptics } from '../../utils/haptics';
import { fireCelebration } from '../../utils/confettiHelper';
import {
  PowerItem,
  PowerCategoryTab,
  POWER_CATEGORIES,
  HIGHER_POWERS,
  CYCLICITY_RULES,
  EXPONENT_LAWS
} from '../../data/calculationPowersData';

// ---------------------------------------------------------------------
// STORAGE KEYS & DATA TYPES
// ---------------------------------------------------------------------
const STORAGE_KEY_MASTERED_POWERS = 'syllabus3d_powers_mastered_v1';
const STORAGE_KEY_STATS_POWERS = 'syllabus3d_powers_stats_v1';
const STORAGE_KEY_WEAK_POWERS = 'syllabus3d_powers_weak_v1';

export type PowersBoosterMode = 'learn' | 'practice' | 'cyclicity' | 'stats';
export type PracticeType = 'mcq' | 'flashcard';
export type PracticeDuration = 'zen' | '60s';
export type QuestionDirection = 'result' | 'exponent' | 'unit-digit' | 'mixed';

interface PowerStats {
  totalAnswered: number;
  totalCorrect: number;
  bestStreak: number;
  blitzRecord: number;
}

interface QuestionState {
  id: string;
  item: PowerItem;
  prompt: string;
  subPrompt: string;
  expectedAnswer: string;
  options: string[];
  userAnswer?: string;
  isCorrect?: boolean;
  type: 'result' | 'exponent' | 'unit-digit';
}

// Superscript number helper
const toSuperscript = (num: number): string => {
  const supers: Record<string, string> = {
    '0': '⁰',
    '1': '¹',
    '2': '²',
    '3': '³',
    '4': '⁴',
    '5': '⁵',
    '6': '⁶',
    '7': '⁷',
    '8': '⁸',
    '9': '⁹'
  };
  return num
    .toString()
    .split('')
    .map(c => supers[c] || c)
    .join('');
};

export const CalculationBoosterPowers: React.FC = () => {
  // Navigation & View Mode
  const [activeMode, setActiveMode] = useState<PowersBoosterMode>('learn');
  const [selectedCategory, setSelectedCategory] = useState<PowerCategoryTab>('2');
  const [searchQuery, setSearchQuery] = useState('');

  // Active Recall Mode
  const [hideMode, setHideMode] = useState<'none' | 'result' | 'exponent'>('none');
  const [audioEnabled, setAudioEnabled] = useState(true);

  // Inspected Power Item
  const [inspectedPower, setInspectedPower] = useState<PowerItem | null>(null);

  // Persistence (Mastered & Weak items)
  const [masteredIds, setMasteredIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MASTERED_POWERS);
      return saved ? new Set(JSON.parse(saved)) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  });

  const [weakIds, setWeakIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_WEAK_POWERS);
      return saved ? new Set(JSON.parse(saved)) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  });

  const [stats, setStats] = useState<PowerStats>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STATS_POWERS);
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
      localStorage.setItem(STORAGE_KEY_MASTERED_POWERS, JSON.stringify(Array.from(newSet)));
    } catch {}
  }, []);

  const recordMistake = useCallback((id: string) => {
    setWeakIds(prev => {
      const next = new Set(prev).add(id);
      try {
        localStorage.setItem(STORAGE_KEY_WEAK_POWERS, JSON.stringify(Array.from(next)));
      } catch {}
      return next;
    });
  }, []);

  const clearMistake = useCallback((id: string) => {
    setWeakIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      try {
        localStorage.setItem(STORAGE_KEY_WEAK_POWERS, JSON.stringify(Array.from(next)));
      } catch {}
      return next;
    });
  }, []);

  const saveStats = useCallback((updater: (prev: PowerStats) => PowerStats) => {
    setStats(prev => {
      const updated = updater(prev);
      try {
        localStorage.setItem(STORAGE_KEY_STATS_POWERS, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  }, []);

  // Pronunciation
  const speakPower = useCallback(
    (item: PowerItem) => {
      if (!audioEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;
      try {
        window.speechSynthesis.cancel();
        const text = `${item.base} to the power ${item.exponent} equals ${item.result}.`;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
      } catch {}
    },
    [audioEnabled]
  );

  // Grouped items based on tab
  const groupedPowers = useMemo(() => {
    let list = HIGHER_POWERS;

    if (selectedCategory === '2') {
      list = list.filter(p => p.base === 2);
    } else if (selectedCategory === '3-4') {
      list = list.filter(p => p.base === 3 || p.base === 4);
    } else if (selectedCategory === '5-9') {
      list = list.filter(p => p.base === 5 || p.base === 9);
    } else if (selectedCategory === 'extended') {
      list = list.filter(p => [6, 7, 8, 11].includes(p.base));
    } else if (selectedCategory === 'weak') {
      list = list.filter(p => weakIds.has(p.id));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        p =>
          p.id.includes(q) ||
          `${p.base}`.includes(q) ||
          `${p.result}`.includes(q) ||
          (p.tip && p.tip.toLowerCase().includes(q))
      );
    }

    // Group by base
    const groups: { base: number; title: string; items: PowerItem[] }[] = [];
    const baseMap = new Map<number, PowerItem[]>();

    list.forEach(item => {
      if (!baseMap.has(item.base)) {
        baseMap.set(item.base, []);
      }
      baseMap.get(item.base)!.push(item);
    });

    baseMap.forEach((items, base) => {
      groups.push({
        base,
        title: `Powers of ${base}`,
        items: items.sort((a, b) => a.exponent - b.exponent)
      });
    });

    return groups.sort((a, b) => a.base - b.base);
  }, [selectedCategory, searchQuery, weakIds]);

  // -------------------------------------------------------------------
  // PRACTICE DRILL ENGINE
  // -------------------------------------------------------------------
  const [practiceDirection, setPracticeDirection] = useState<QuestionDirection>('mixed');
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
    const pool =
      weakIds.size > 0 && Math.random() < 0.35
        ? HIGHER_POWERS.filter(p => weakIds.has(p.id))
        : HIGHER_POWERS;

    const item = pool[Math.floor(Math.random() * pool.length)];

    let type: 'result' | 'exponent' | 'unit-digit' = 'result';
    if (practiceDirection === 'result') type = 'result';
    else if (practiceDirection === 'exponent') type = 'exponent';
    else if (practiceDirection === 'unit-digit') type = 'unit-digit';
    else {
      const rand = Math.random();
      if (rand < 0.5) type = 'result';
      else if (rand < 0.8) type = 'exponent';
      else type = 'unit-digit';
    }

    let prompt = '';
    let subPrompt = '';
    let expectedAnswer = '';
    let options: string[] = [];

    if (type === 'result') {
      prompt = `${item.base}${toSuperscript(item.exponent)} = ?`;
      subPrompt = `What is ${item.base} to the power ${item.exponent}?`;
      expectedAnswer = `${item.result}`;

      const wrong = new Set<string>();
      // Same base with different exponent
      const otherSameBase = HIGHER_POWERS.filter(
        p => p.base === item.base && p.exponent !== item.exponent
      );
      otherSameBase.forEach(p => wrong.add(`${p.result}`));

      // Neighboring powers
      const doubleVal = item.result * 2;
      const halfVal = Math.floor(item.result / 2);
      if (doubleVal > 0 && doubleVal !== item.result) wrong.add(`${doubleVal}`);
      if (halfVal > 0 && halfVal !== item.result) wrong.add(`${halfVal}`);

      while (wrong.size < 3) {
        const delta = (Math.floor(Math.random() * 5) + 1) * (Math.random() < 0.5 ? 1 : -1);
        const candidate = item.result + delta;
        if (candidate > 0 && candidate !== item.result) wrong.add(`${candidate}`);
      }

      options = Array.from(wrong).slice(0, 3);
      options.push(expectedAnswer);
      options.sort(() => Math.random() - 0.5);
    } else if (type === 'exponent') {
      prompt = `${item.base}ˣ = ${item.result}`;
      subPrompt = `Find exponent x for base ${item.base}`;
      expectedAnswer = `${item.exponent}`;

      const wrong = new Set<string>();
      for (let delta of [-2, -1, 1, 2, 3]) {
        const val = item.exponent + delta;
        if (val > 0 && val !== item.exponent) wrong.add(`${val}`);
        if (wrong.size >= 3) break;
      }
      options = Array.from(wrong).slice(0, 3);
      options.push(expectedAnswer);
      options.sort(() => Math.random() - 0.5);
    } else {
      prompt = `Unit Digit of ${item.base}${toSuperscript(item.exponent)}`;
      subPrompt = `Cyclicity rule: find unit digit of ${item.base}^${item.exponent}`;
      expectedAnswer = `${item.unitDigit}`;

      const allDigits = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
      const filtered = allDigits.filter(d => d !== `${item.unitDigit}`);
      filtered.sort(() => Math.random() - 0.5);

      options = filtered.slice(0, 3);
      options.push(expectedAnswer);
      options.sort(() => Math.random() - 0.5);
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

  // Timer effect
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

    setTimeout(() => {
      if (practiceDuration === '60s' && timerRemaining <= 1) {
        handleFinishDrill();
      } else {
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
          TOP HEADER & MODE NAVIGATION
      ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 text-violet-600 dark:text-violet-400 flex items-center justify-center font-bold">
            <span className="font-mono text-base font-black">xʸ</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                Higher Powers
              </h2>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
                Indices & Number Systems
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Powers of 2 (up to 2¹²), 3, 4, 5, 9, cyclicity rules, and compound interest shortcuts.
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
                ? 'bg-violet-600 text-white shadow-xs font-black'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Power Charts</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setActiveMode('practice');
            }}
            className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'practice'
                ? 'bg-violet-600 text-white shadow-xs font-black'
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
              setActiveMode('cyclicity');
            }}
            className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'cyclicity'
                ? 'bg-violet-600 text-white shadow-xs font-black'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>Cyclicity & Laws</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setActiveMode('stats');
            }}
            className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'stats'
                ? 'bg-violet-600 text-white shadow-xs font-black'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Stats</span>
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          MODE 1: LEARN & POWER CHARTS
      ───────────────────────────────────────────────────────────── */}
      {activeMode === 'learn' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs">
            {/* Category Tabs: Powers of 2 | 3 & 4 | 5 & 9 | Extended | Weak */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 lg:pb-0">
              {POWER_CATEGORIES.map(cat => {
                const count =
                  cat.id === 'all'
                    ? HIGHER_POWERS.length
                    : cat.id === '2'
                    ? HIGHER_POWERS.filter(p => p.base === 2).length
                    : cat.id === '3-4'
                    ? HIGHER_POWERS.filter(p => p.base === 3 || p.base === 4).length
                    : cat.id === '5-9'
                    ? HIGHER_POWERS.filter(p => p.base === 5 || p.base === 9).length
                    : cat.id === 'extended'
                    ? HIGHER_POWERS.filter(p => [6, 7, 8, 11].includes(p.base)).length
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
                        ? 'bg-violet-600 text-white shadow-xs font-black ring-1 ring-violet-400/40'
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

            {/* Right Tools: Search, Active Recall & Audio */}
            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <div className="relative flex-1 sm:w-48">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search power..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-[#161826] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-violet-500"
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
                      ? 'bg-white dark:bg-[#1C1F33] text-violet-600 dark:text-violet-400 shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Show All
                </button>
                <button
                  type="button"
                  title="Hide Result (e.g. 2⁸ = ?)"
                  onClick={() => setHideMode('result')}
                  className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                    hideMode === 'result'
                      ? 'bg-white dark:bg-[#1C1F33] text-violet-600 dark:text-violet-400 shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Hide Result
                </button>
                <button
                  type="button"
                  title="Hide Exponent (e.g. 2^? = 256)"
                  onClick={() => setHideMode('exponent')}
                  className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                    hideMode === 'exponent'
                      ? 'bg-white dark:bg-[#1C1F33] text-violet-600 dark:text-violet-400 shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Hide Exponent
                </button>
              </div>

              {/* Audio Pronunciation Toggle */}
              <button
                type="button"
                onClick={() => setAudioEnabled(!audioEnabled)}
                title={audioEnabled ? 'Mute Speech' : 'Enable Speech'}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                  audioEnabled
                    ? 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20'
                    : 'bg-slate-100 dark:bg-white/[0.05] text-slate-400 border-slate-200 dark:border-white/10'
                }`}
              >
                {audioEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Grouped Powers Sections (Matching reference PDF cards exactly) */}
          <div className="space-y-6">
            {groupedPowers.map(group => (
              <div
                key={group.base}
                className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-4"
              >
                {/* Section Header */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-violet-500/15 text-violet-600 dark:text-violet-400 flex items-center justify-center font-bold font-mono text-sm">
                      {group.base}ⁿ
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                      {group.title}
                    </h3>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    {group.items.length} powers
                  </span>
                </div>

                {/* Power Items: Vertical list matching PDF screenshot style */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                  {group.items.map(item => {
                    const isMastered = masteredIds.has(item.id);
                    const isWeak = weakIds.has(item.id);

                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          setInspectedPower(item);
                          speakPower(item);
                        }}
                        className={`group relative p-3.5 rounded-2xl transition-all cursor-pointer border flex items-center justify-between shadow-2xs hover:shadow-md hover:scale-[1.02] active:scale-[0.99] ${
                          isMastered
                            ? 'bg-emerald-500/[0.03] dark:bg-emerald-500/[0.02] border-emerald-500/40 hover:border-emerald-500'
                            : isWeak
                            ? 'bg-rose-500/[0.03] dark:bg-rose-500/[0.02] border-rose-500/40 hover:border-rose-500'
                            : 'bg-slate-50 dark:bg-[#141626] border-slate-200/80 dark:border-white/[0.06] hover:border-violet-500/60'
                        }`}
                      >
                        {/* The Iconic Mathematical Expression: base^exp = result */}
                        <div className="flex items-center gap-2 font-mono">
                          {/* Base and Exponent */}
                          <span className="text-lg font-black text-slate-900 dark:text-white">
                            {hideMode === 'exponent' ? (
                              <span>
                                {item.base}
                                <span className="text-violet-600 dark:text-violet-400 bg-violet-500/10 px-1 rounded">
                                  ?
                                </span>
                              </span>
                            ) : (
                              <span>
                                {item.base}
                                <sup className="text-sm font-black text-violet-600 dark:text-violet-400">
                                  {item.exponent}
                                </sup>
                              </span>
                            )}
                          </span>

                          <span className="text-slate-400 font-bold">=</span>

                          {/* Result */}
                          <span className="text-lg font-black text-violet-600 dark:text-violet-400">
                            {hideMode === 'result' ? (
                              <span className="bg-violet-500/10 text-violet-600 dark:text-violet-400 px-2 py-0.5 rounded-md text-sm">
                                ?
                              </span>
                            ) : (
                              item.formattedResult
                            )}
                          </span>
                        </div>

                        {/* Right: Unit digit badge & Mastered tick */}
                        <div className="flex items-center gap-1.5">
                          <span
                            title={`Unit Digit: ${item.unitDigit}`}
                            className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white dark:bg-white/10 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10"
                          >
                            Unit: {item.unitDigit}
                          </span>

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
                                : 'text-slate-400 hover:text-emerald-500 hover:bg-slate-200 dark:hover:bg-white/10'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          INSPECTED POWER MODAL
      ───────────────────────────────────────────────────────────── */}
      {inspectedPower && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
          onClick={() => setInspectedPower(null)}
        >
          <div
            className="w-full max-w-md rounded-3xl bg-white dark:bg-[#121424] border border-slate-200 dark:border-white/15 shadow-2xl p-6 space-y-4 animate-scale-in"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-violet-500/20 text-violet-500 flex items-center justify-center font-black font-mono text-base">
                  {inspectedPower.base}ⁿ
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white font-mono">
                    {inspectedPower.base}
                    <sup>{inspectedPower.exponent}</sup> = {inspectedPower.formattedResult}
                  </h3>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {inspectedPower.categoryLabel}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setInspectedPower(null)}
                className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-all cursor-pointer"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-800 dark:text-violet-300">
                <span className="font-bold">Unit Digit: </span>
                <span className="font-mono font-bold text-sm">{inspectedPower.unitDigit}</span>
              </div>

              {inspectedPower.tip && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300">
                  <span className="font-bold">Memory Trick: </span>
                  {inspectedPower.tip}
                </div>
              )}

              {inspectedPower.examUsage && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300">
                  <span className="font-bold">Exam Application: </span>
                  {inspectedPower.examUsage}
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setInspectedPower(null)}
                className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
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
                <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 text-violet-600 dark:text-violet-400 flex items-center justify-center font-bold mx-auto">
                  <Zap className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  Higher Powers Speed Drill
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                  Recall higher exponents, find unknown powers, and master unit digit cyclicity in seconds!
                </p>
              </div>

              {/* Settings: Question Type & Duration */}
              <div className="space-y-4 pt-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                    Question Focus
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'mixed', label: 'Mixed Drills' },
                      { id: 'result', label: 'Find Result (xʸ)' },
                      { id: 'exponent', label: 'Find Exponent (x)' },
                      { id: 'unit-digit', label: 'Unit Digit' }
                    ].map(opt => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setPracticeDirection(opt.id as QuestionDirection)}
                        className={`p-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          practiceDirection === opt.id
                            ? 'bg-violet-600 text-white border-violet-600 shadow-xs'
                            : 'bg-slate-50 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-violet-500/40'
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
                            ? 'bg-violet-600 text-white border-violet-600 shadow-xs'
                            : 'bg-slate-50 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-violet-500/40'
                        }`}
                      >
                        <div className="text-xs font-bold">{opt.label}</div>
                        <div
                          className={`text-[10px] mt-0.5 ${
                            practiceDuration === opt.id ? 'text-violet-100' : 'text-slate-400'
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
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white text-sm font-black transition-all cursor-pointer shadow-lg shadow-violet-500/25 flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Start Speed Sprint</span>
              </button>
            </div>
          ) : (
            /* Active Drill Question Arena */
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0E101B] border border-violet-500/30 dark:border-violet-500/20 shadow-lg space-y-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  {practiceDuration === '60s' ? (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 font-mono font-black text-sm border border-violet-500/20">
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
                  <span className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
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
                        'bg-slate-50 dark:bg-[#161828] border-slate-200/90 dark:border-white/10 hover:border-violet-500 text-slate-900 dark:text-white';

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
          MODE 3: CYCLICITY & EXPONENT LAWS
      ───────────────────────────────────────────────────────────── */}
      {activeMode === 'cyclicity' && (
        <div className="space-y-6">
          {/* Cyclicity Section */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-violet-500/20 text-violet-600 dark:text-violet-400 flex items-center justify-center font-bold">
                <Brain className="w-4 h-4" />
              </div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                Unit Digit Cyclicity Rules
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {CYCLICITY_RULES.map((c, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-[#151726] border border-slate-200/60 dark:border-white/10 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-mono font-black text-violet-600 dark:text-violet-400">
                      Digits: {c.digits}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-violet-500/10 text-violet-600 dark:text-violet-400">
                      Cycle: {c.cyclicity}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">{c.rule}</p>
                  <div className="p-2 rounded-xl bg-white dark:bg-white/5 border border-slate-200/40 dark:border-white/5 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    {c.example}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Laws of Exponents Section */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-fuchsia-500/20 text-fuchsia-600 dark:text-fuchsia-400 flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                Laws of Indices & Exponents
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {EXPONENT_LAWS.map((law, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-[#151726] border border-slate-200/60 dark:border-white/10 space-y-1.5"
                >
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {law.law}
                  </span>
                  <div className="text-base font-mono font-black text-violet-600 dark:text-violet-400">
                    {law.formula}
                  </div>
                  <div className="text-[11px] font-mono text-slate-600 dark:text-slate-400">
                    Ex: {law.example}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODE 4: STATS
      ───────────────────────────────────────────────────────────── */}
      {activeMode === 'stats' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-5 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-1">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Mastered Powers
              </span>
              <div className="text-2xl sm:text-3xl font-black text-violet-600 dark:text-violet-400">
                {masteredIds.size} / {HIGHER_POWERS.length}
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
