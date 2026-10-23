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
  Play,
  Pause,
  Award,
  Flame,
  Trophy,
  Sparkles,
  Clock,
  Star,
  Brain,
  Hash,
  BarChart2,
  Lock,
  Unlock,
  ChevronRight,
  ArrowRight,
  TrendingUp,
  HelpCircle,
  Lightbulb,
  Check,
  Delete,
  ShieldCheck,
  Timer,
  Layers,
  Activity
} from 'lucide-react';
import { soundManager } from '../../utils/soundEffects';
import { haptics } from '../../utils/haptics';
import { fireCelebration } from '../../utils/confettiHelper';
import {
  DIVISION_STAGES,
  DIVISION_TECHNIQUES,
  DivisionStageConfig,
  DivisionQuestion,
  DivisionStats,
  DEFAULT_DIVISION_STATS,
  STORAGE_KEY_DIVISION_STATS,
  STORAGE_KEY_DIVISION_WEAK,
  generateDivisionStageQuestion,
  getDivisionRank,
  generateDivisionDistractors
} from '../../data/calculationDivisionData';

export type DivisionMode = 'stages' | 'blitz' | 'zen' | 'tricks' | 'stats';
export type DivisionZenDifficulty = 'all' | '1-digit' | 'chunking' | 'double-shift' | 'factor-reduction' | 'vedic-9' | 'vedic-dhwajank' | 'decimals';
export type DivisionInputType = 'mcq' | 'numpad';
export type DivisionCategoryFilter = 'all' | 'Foundation' | 'Core Speed' | 'Vedic Split' | 'DI Master';

export interface DivisionCategoryTab {
  id: DivisionCategoryFilter;
  label: string;
  icon: string;
  count: number;
  range: string;
}

const DIVISION_CATEGORIES: DivisionCategoryTab[] = [
  { id: 'all', label: 'All Levels', icon: '🌟', count: 10, range: 'Stages 1-10' },
  { id: 'Foundation', label: 'Foundation', icon: '🧱', count: 2, range: 'Stages 1-2' },
  { id: 'Core Speed', label: 'Core Speed', icon: '🚀', count: 2, range: 'Stages 3-4' },
  { id: 'Vedic Split', label: 'Vedic Split', icon: '🔥', count: 3, range: 'Stages 5-7' },
  { id: 'DI Master', label: 'DI Master', icon: '📊', count: 3, range: 'Stages 8-10' }
];

const getCategoryTheme = (category: string) => {
  switch (category) {
    case 'Foundation':
      return {
        badgeBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        accentBar: 'from-emerald-500 via-teal-400 to-cyan-400',
        borderHover: 'hover:border-emerald-500/50',
        tagText: 'text-emerald-600 dark:text-emerald-400',
        dotBg: 'bg-emerald-500'
      };
    case 'Core Speed':
      return {
        badgeBg: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
        accentBar: 'from-cyan-500 via-teal-400 to-emerald-400',
        borderHover: 'hover:border-cyan-500/50',
        tagText: 'text-cyan-600 dark:text-cyan-400',
        dotBg: 'bg-cyan-500'
      };
    case 'Vedic Split':
      return {
        badgeBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
        accentBar: 'from-purple-500 via-pink-400 to-rose-400',
        borderHover: 'hover:border-purple-500/50',
        tagText: 'text-purple-600 dark:text-purple-400',
        dotBg: 'bg-purple-500'
      };
    case 'DI Master':
      return {
        badgeBg: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20',
        accentBar: 'from-teal-500 via-indigo-400 to-blue-400',
        borderHover: 'hover:border-teal-500/50',
        tagText: 'text-teal-600 dark:text-teal-400',
        dotBg: 'bg-teal-500'
      };
    default:
      return {
        badgeBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        accentBar: 'from-emerald-500 to-teal-500',
        borderHover: 'hover:border-emerald-500/50',
        tagText: 'text-emerald-600 dark:text-emerald-400',
        dotBg: 'bg-emerald-500'
      };
  }
};

export const CalculationBoosterDivision: React.FC = () => {
  // Navigation Mode
  const [activeMode, setActiveMode] = useState<DivisionMode>('stages');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // -------------------------------------------------------------------
  // PERSISTENCE STATE (Stats & Weak Pairs)
  // -------------------------------------------------------------------
  const [stats, setStats] = useState<DivisionStats>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DIVISION_STATS);
      return saved ? { ...DEFAULT_DIVISION_STATS, ...JSON.parse(saved) } : DEFAULT_DIVISION_STATS;
    } catch {
      return DEFAULT_DIVISION_STATS;
    }
  });

  const [weakPairs, setWeakPairs] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DIVISION_WEAK);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Current session streak
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [comboMultiplier, setComboMultiplier] = useState<number>(1);

  // Sync stats to localStorage
  const updateStats = useCallback((updater: (prev: DivisionStats) => DivisionStats) => {
    setStats(prev => {
      const next = updater(prev);
      try {
        localStorage.setItem(STORAGE_KEY_DIVISION_STATS, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const recordMistake = useCallback((expression: string) => {
    setWeakPairs(prev => {
      const next = { ...prev, [expression]: (prev[expression] || 0) + 1 };
      try {
        localStorage.setItem(STORAGE_KEY_DIVISION_WEAK, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  // Update combo multiplier based on streak
  useEffect(() => {
    if (currentStreak >= 10) setComboMultiplier(2.0);
    else if (currentStreak >= 5) setComboMultiplier(1.5);
    else if (currentStreak >= 3) setComboMultiplier(1.2);
    else setComboMultiplier(1.0);
  }, [currentStreak]);

  // Player Rank info
  const playerRank = useMemo(() => getDivisionRank(stats.totalXp), [stats.totalXp]);
  const xpInCurrentLevel = stats.totalXp - playerRank.prevThreshold;
  const xpNeededForLevel = playerRank.nextThreshold - playerRank.prevThreshold;
  const levelProgressPercent = Math.min(100, Math.max(0, Math.round((xpInCurrentLevel / xpNeededForLevel) * 100)));

  // -------------------------------------------------------------------
  // 1. STAGES CAMPAIGN STATE
  // -------------------------------------------------------------------
  const [selectedStage, setSelectedStage] = useState<DivisionStageConfig | null>(null);
  const [stageQuestions, setStageQuestions] = useState<DivisionQuestion[]>([]);
  const [currentStageQIdx, setCurrentStageQIdx] = useState<number>(0);
  const [stageScore, setStageScore] = useState<number>(0);
  const [stageTimer, setStageTimer] = useState<number>(30);
  const [stageActive, setStageActive] = useState<boolean>(false);
  const [stageSummary, setStageSummary] = useState<{
    stageId: number;
    score: number;
    total: number;
    stars: number;
    timeTaken: number;
    xpGained: number;
  } | null>(null);

  const [categoryFilter, setCategoryFilter] = useState<DivisionCategoryFilter>('all');
  const [stageSelectedAnswer, setStageSelectedAnswer] = useState<number | null>(null);
  const [stageFeedback, setStageFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const stageStartTimeRef = useRef<number>(Date.now());
  const questionStartTimeRef = useRef<number>(Date.now());

  // Filtered stages
  const filteredStages = useMemo(() => {
    if (categoryFilter === 'all') return DIVISION_STAGES;
    return DIVISION_STAGES.filter(s => s.category === categoryFilter);
  }, [categoryFilter]);

  // Start a stage run
  const handleStartStage = (stage: DivisionStageConfig) => {
    if (stage.id > stats.unlockedStage) {
      if (soundEnabled) soundManager.playError();
      return;
    }
    if (soundEnabled) soundManager.playClick();
    haptics.selection();

    const qs: DivisionQuestion[] = [];
    for (let i = 0; i < stage.questionCount; i++) {
      qs.push(generateDivisionStageQuestion(stage.id));
    }
    setSelectedStage(stage);
    setStageQuestions(qs);
    setCurrentStageQIdx(0);
    setStageScore(0);
    setStageTimer(stage.targetTimeSec);
    setStageSelectedAnswer(null);
    setStageFeedback('idle');
    setStageSummary(null);
    setStageActive(true);
    stageStartTimeRef.current = Date.now();
    questionStartTimeRef.current = Date.now();
  };

  // Stage timer countdown
  useEffect(() => {
    if (!stageActive || stageTimer <= 0 || stageSummary) return;
    const timer = setInterval(() => {
      setStageTimer(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          finishStage(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [stageActive, stageTimer, stageSummary]);

  // Finish stage
  const finishStage = (completedAll: boolean) => {
    if (!selectedStage) return;
    setStageActive(false);
    const timeTaken = Math.max(1, Math.round((Date.now() - stageStartTimeRef.current) / 1000));
    const accuracy = stageQuestions.length > 0 ? (stageScore / stageQuestions.length) : 0;

    let stars = 1;
    if (stageScore === selectedStage.questionCount && timeTaken <= selectedStage.targetTimeSec) {
      stars = 3;
    } else if (stageScore >= Math.ceil(selectedStage.questionCount * 0.7)) {
      stars = 2;
    }

    const baseExp = stageScore * 15;
    const starBonus = stars * 25;
    const xpGained = baseExp + starBonus;

    if (stars >= 2) {
      fireCelebration();
      if (soundEnabled) soundManager.playLevelUp();
    } else {
      if (soundEnabled) soundManager.playCompleteChime();
    }

    // Save stats & unlock next
    updateStats(prev => {
      const nextUnlocked = (stars >= 1 && selectedStage.id === prev.unlockedStage && prev.unlockedStage < 10)
        ? prev.unlockedStage + 1
        : prev.unlockedStage;

      const currentStars = prev.stageStars[selectedStage.id] || 0;
      const nextStars = Math.max(currentStars, stars);

      return {
        ...prev,
        totalAnswered: prev.totalAnswered + stageQuestions.length,
        totalCorrect: prev.totalCorrect + stageScore,
        totalXp: prev.totalXp + xpGained,
        unlockedStage: nextUnlocked,
        stageStars: {
          ...prev.stageStars,
          [selectedStage.id]: nextStars
        }
      };
    });

    setStageSummary({
      stageId: selectedStage.id,
      score: stageScore,
      total: selectedStage.questionCount,
      stars,
      timeTaken,
      xpGained
    });
  };

  // Submit Answer in Stage Run
  const handleStageAnswer = (answer: number) => {
    if (stageFeedback !== 'idle' || !stageActive) return;
    const currentQ = stageQuestions[currentStageQIdx];
    if (!currentQ) return;

    setStageSelectedAnswer(answer);
    const isCorrect = Math.abs(answer - currentQ.answer) < 0.001;
    const responseSec = (Date.now() - questionStartTimeRef.current) / 1000;

    if (isCorrect) {
      setStageFeedback('correct');
      setStageScore(prev => prev + 1);
      setCurrentStreak(prev => prev + 1);
      if (soundEnabled) soundManager.playCompleteChime();
      haptics.success();

      // Update fastest response time
      updateStats(prev => ({
        ...prev,
        fastestAnswerSec: Math.min(prev.fastestAnswerSec, Number(responseSec.toFixed(2)))
      }));
    } else {
      setStageFeedback('wrong');
      setCurrentStreak(0);
      recordMistake(currentQ.displayExpression.replace(' = ?', ''));
      if (soundEnabled) soundManager.playError();
      haptics.error();
    }

    setTimeout(() => {
      if (currentStageQIdx + 1 < stageQuestions.length) {
        setCurrentStageQIdx(prev => prev + 1);
        setStageSelectedAnswer(null);
        setStageFeedback('idle');
        questionStartTimeRef.current = Date.now();
      } else {
        finishStage(true);
      }
    }, 700);
  };

  // -------------------------------------------------------------------
  // 2. 60-SECOND SPEED BLITZ STATE
  // -------------------------------------------------------------------
  const [blitzActive, setBlitzActive] = useState<boolean>(false);
  const [blitzTimer, setBlitzTimer] = useState<number>(60);
  const [blitzScore, setBlitzScore] = useState<number>(0);
  const [blitzStreak, setBlitzStreak] = useState<number>(0);
  const [blitzQuestion, setBlitzQuestion] = useState<DivisionQuestion | null>(null);
  const [blitzSelectedAnswer, setBlitzSelectedAnswer] = useState<number | null>(null);
  const [blitzFeedback, setBlitzFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [blitzFinished, setBlitzFinished] = useState<boolean>(false);

  // Start Blitz
  const handleStartBlitz = () => {
    if (soundEnabled) soundManager.playClick();
    haptics.selection();
    setBlitzScore(0);
    setBlitzStreak(0);
    setBlitzTimer(60);
    setBlitzFinished(false);
    setBlitzFeedback('idle');
    setBlitzSelectedAnswer(null);
    setBlitzActive(true);
    setBlitzQuestion(generateDivisionStageQuestion(Math.floor(Math.random() * 6) + 1));
  };

  // Blitz Timer
  useEffect(() => {
    if (!blitzActive || blitzTimer <= 0) return;
    const interval = setInterval(() => {
      setBlitzTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          finishBlitz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [blitzActive, blitzTimer]);

  const finishBlitz = () => {
    setBlitzActive(false);
    setBlitzFinished(true);
    fireCelebration();
    if (soundEnabled) soundManager.playLevelUp();

    const xpEarned = blitzScore * 20;
    updateStats(prev => ({
      ...prev,
      totalAnswered: prev.totalAnswered + blitzScore,
      totalCorrect: prev.totalCorrect + blitzScore,
      totalXp: prev.totalXp + xpEarned,
      blitzHighScore: Math.max(prev.blitzHighScore, blitzScore),
      bestStreak: Math.max(prev.bestStreak, blitzStreak)
    }));
  };

  const handleBlitzAnswer = (ans: number) => {
    if (blitzFeedback !== 'idle' || !blitzQuestion) return;
    setBlitzSelectedAnswer(ans);
    const isCorrect = Math.abs(ans - blitzQuestion.answer) < 0.001;

    if (isCorrect) {
      setBlitzFeedback('correct');
      setBlitzScore(prev => prev + 1);
      setBlitzStreak(prev => {
        const next = prev + 1;
        if (soundEnabled) soundManager.playCompleteChime();
        return next;
      });
      haptics.success();
    } else {
      setBlitzFeedback('wrong');
      setBlitzStreak(0);
      recordMistake(blitzQuestion.displayExpression.replace(' = ?', ''));
      if (soundEnabled) soundManager.playError();
      haptics.error();
    }

    setTimeout(() => {
      setBlitzSelectedAnswer(null);
      setBlitzFeedback('idle');
      // Pick next question: mix of stages 1 to 7
      const nextStage = Math.floor(Math.random() * 7) + 1;
      setBlitzQuestion(generateDivisionStageQuestion(nextStage));
    }, 450);
  };

  // -------------------------------------------------------------------
  // 3. ZEN PRACTICE STATE
  // -------------------------------------------------------------------
  const [zenDifficulty, setZenDifficulty] = useState<DivisionZenDifficulty>('all');
  const [zenInputType, setZenInputType] = useState<DivisionInputType>('mcq');
  const [zenQuestion, setZenQuestion] = useState<DivisionQuestion>(() => generateDivisionStageQuestion(1));
  const [zenSelectedAns, setZenSelectedAns] = useState<number | null>(null);
  const [zenNumpadVal, setZenNumpadVal] = useState<string>('');
  const [zenFeedback, setZenFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [zenTotalAnswered, setZenTotalAnswered] = useState<number>(0);
  const [zenCorrectCount, setZenCorrectCount] = useState<number>(0);
  const [zenStreak, setZenStreak] = useState<number>(0);
  const [zenShowTip, setZenShowTip] = useState<boolean>(false);

  // Map difficulty to stage ids
  const getStageForDifficulty = useCallback((diff: DivisionZenDifficulty): number => {
    switch (diff) {
      case '1-digit': return 1;
      case 'chunking': return 2;
      case 'double-shift': return 3;
      case 'factor-reduction': return 4;
      case 'vedic-9': return 5;
      case 'vedic-dhwajank': return 6;
      case 'decimals': return 9;
      case 'all':
      default:
        return Math.floor(Math.random() * 10) + 1;
    }
  }, []);

  const loadNextZenQuestion = useCallback(() => {
    const stId = getStageForDifficulty(zenDifficulty);
    setZenQuestion(generateDivisionStageQuestion(stId));
    setZenSelectedAns(null);
    setZenNumpadVal('');
    setZenFeedback('idle');
    setZenShowTip(false);
  }, [zenDifficulty, getStageForDifficulty]);

  const handleZenAnswer = (ans: number) => {
    if (zenFeedback !== 'idle') return;
    setZenSelectedAns(ans);
    setZenTotalAnswered(prev => prev + 1);

    const isCorrect = Math.abs(ans - zenQuestion.answer) < 0.001;
    if (isCorrect) {
      setZenFeedback('correct');
      setZenCorrectCount(prev => prev + 1);
      setZenStreak(prev => prev + 1);
      if (soundEnabled) soundManager.playCompleteChime();
      haptics.success();

      updateStats(prev => ({
        ...prev,
        totalAnswered: prev.totalAnswered + 1,
        totalCorrect: prev.totalCorrect + 1,
        totalXp: prev.totalXp + 10,
        bestStreak: Math.max(prev.bestStreak, zenStreak + 1)
      }));
    } else {
      setZenFeedback('wrong');
      setZenStreak(0);
      recordMistake(zenQuestion.displayExpression.replace(' = ?', ''));
      if (soundEnabled) soundManager.playError();
      haptics.error();

      updateStats(prev => ({
        ...prev,
        totalAnswered: prev.totalAnswered + 1
      }));
    }

    setTimeout(() => {
      loadNextZenQuestion();
    }, 850);
  };

  const handleZenNumpadSubmit = () => {
    if (!zenNumpadVal.trim() || zenFeedback !== 'idle') return;
    const num = parseFloat(zenNumpadVal);
    if (isNaN(num)) return;
    handleZenAnswer(num);
  };

  // -------------------------------------------------------------------
  // 4. TRICKS & VEDIC LESSONS QUIZ STATE
  // -------------------------------------------------------------------
  const [trickQuizSelected, setTrickQuizSelected] = useState<Record<string, number>>({});
  const [trickQuizFeedback, setTrickQuizFeedback] = useState<Record<string, boolean>>({});

  const handleTrickQuizSubmit = (trickId: string, selectedOpt: number, correctAns: number) => {
    setTrickQuizSelected(prev => ({ ...prev, [trickId]: selectedOpt }));
    const isCorrect = Math.abs(selectedOpt - correctAns) < 0.001;
    setTrickQuizFeedback(prev => ({ ...prev, [trickId]: isCorrect }));

    if (isCorrect) {
      if (soundEnabled) soundManager.playCompleteChime();
      haptics.success();
      updateStats(prev => ({ ...prev, totalXp: prev.totalXp + 25 }));
    } else {
      if (soundEnabled) soundManager.playError();
      haptics.error();
    }
  };

  // Weak mistakes array
  const weakPairList = useMemo(() => {
    return Object.entries(weakPairs)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12);
  }, [weakPairs]);

  return (
    <div className="space-y-6 max-w-full">
      {/* =========================================================
          TOP GAMIFIED HUD (XP, RANK, STREAK, SOUND)
          ========================================================= */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white p-6 sm:p-8 border border-teal-500/30 shadow-2xl">
        {/* Glow backdrop decorative orb */}
        <div className="absolute top-0 right-1/4 -mt-16 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 -mb-16 w-60 h-60 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left: Module Identity & Player Title */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1.5 shadow-xs">
                <span className="font-mono font-black text-xs leading-none">÷</span>
                <span>Speed Calculation Pillar #4</span>
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-slate-200 border border-white/10 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-emerald-400" />
                <span>Level {playerRank.level}: {playerRank.title}</span>
              </span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white flex items-center gap-2">
                <span>Division Mastery</span>
                <span className="text-emerald-400 font-serif">⚡</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-300 font-medium max-w-2xl mt-1">
                Zero pen-paper mental quotients. Master Left-to-Right Chunking, the Double & Shift rule (÷5, ÷25, ÷50),
                Factor Reduction, and Vedic Dhwajank (Flag method) for SSC & Banking exams.
              </p>
            </div>

            {/* XP Progression Bar */}
            <div className="pt-2 max-w-md space-y-1.5">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-emerald-400" />
                  <span>XP Progress: {stats.totalXp} XP</span>
                </span>
                <span className="text-emerald-400 font-mono font-bold">
                  {xpInCurrentLevel} / {xpNeededForLevel} XP ({levelProgressPercent}%)
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-800/80 border border-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 transition-all duration-500 shadow-sm"
                  style={{ width: `${levelProgressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Right: Quick KPI Badges & Controls */}
          <div className="flex flex-wrap lg:flex-col items-end gap-3 justify-between lg:justify-center">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setSoundEnabled(prev => !prev);
                  haptics.selection();
                }}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold ${
                  soundEnabled
                    ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300'
                    : 'bg-white/5 border-white/10 text-slate-400'
                }`}
                title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                <span className="hidden sm:inline">{soundEnabled ? 'Audio On' : 'Muted'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Reset Division stats & progress?')) {
                    localStorage.removeItem(STORAGE_KEY_DIVISION_STATS);
                    localStorage.removeItem(STORAGE_KEY_DIVISION_WEAK);
                    setStats(DEFAULT_DIVISION_STATS);
                    setWeakPairs({});
                    haptics.success();
                  }
                }}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-all cursor-pointer text-xs font-semibold flex items-center gap-1"
                title="Reset Statistics"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>

            {/* Mini HUD Stats Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full lg:w-auto">
              <div className="px-3 py-2 rounded-xl bg-slate-800/80 border border-white/10 text-center">
                <div className="text-[10px] uppercase font-bold text-slate-400">Streak</div>
                <div className="text-base font-black text-emerald-400 font-mono flex items-center justify-center gap-1">
                  <Flame className="w-4 h-4 text-emerald-500 animate-pulse" />
                  <span>{currentStreak}</span>
                  {comboMultiplier > 1 && (
                    <span className="text-[10px] px-1 rounded-sm bg-emerald-500/20 text-emerald-300 font-sans">
                      {comboMultiplier}x
                    </span>
                  )}
                </div>
              </div>

              <div className="px-3 py-2 rounded-xl bg-slate-800/80 border border-white/10 text-center">
                <div className="text-[10px] uppercase font-bold text-slate-400">Blitz Best</div>
                <div className="text-base font-black text-cyan-400 font-mono flex items-center justify-center gap-1">
                  <Trophy className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{stats.blitzHighScore}</span>
                </div>
              </div>

              <div className="px-3 py-2 rounded-xl bg-slate-800/80 border border-white/10 text-center col-span-2 sm:col-span-1">
                <div className="text-[10px] uppercase font-bold text-slate-400">Stages</div>
                <div className="text-base font-black text-teal-400 font-mono">
                  {stats.unlockedStage} / 10
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          MODE SWITCHER TABS (Stages, Blitz, Zen, Tricks, Stats)
          ========================================================= */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 visible-pill-scrollbar-indigo max-w-full">
        <button
          type="button"
          onClick={() => {
            if (soundEnabled) soundManager.playClick();
            haptics.selection();
            setActiveMode('stages');
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeMode === 'stages'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs font-black ring-1 ring-emerald-400/40'
              : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.04]'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>Stage Quest (1-10)</span>
        </button>

        <button
          type="button"
          onClick={() => {
            if (soundEnabled) soundManager.playClick();
            haptics.selection();
            setActiveMode('blitz');
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeMode === 'blitz'
              ? 'bg-cyan-600 text-white shadow-xs font-black ring-1 ring-cyan-400/40'
              : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.04]'
          }`}
        >
          <Timer className="w-4 h-4" />
          <span>60s Speed Blitz ⚡</span>
        </button>

        <button
          type="button"
          onClick={() => {
            if (soundEnabled) soundManager.playClick();
            haptics.selection();
            setActiveMode('zen');
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeMode === 'zen'
              ? 'bg-teal-600 text-white shadow-xs font-black ring-1 ring-teal-400/40'
              : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.04]'
          }`}
        >
          <Brain className="w-4 h-4" />
          <span>Zen Practice</span>
        </button>

        <button
          type="button"
          onClick={() => {
            if (soundEnabled) soundManager.playClick();
            haptics.selection();
            setActiveMode('tricks');
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeMode === 'tricks'
              ? 'bg-purple-600 text-white shadow-xs font-black ring-1 ring-purple-400/40'
              : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.04]'
          }`}
        >
          <Lightbulb className="w-4 h-4" />
          <span>Vedic & Mind Tricks</span>
        </button>

        <button
          type="button"
          onClick={() => {
            if (soundEnabled) soundManager.playClick();
            haptics.selection();
            setActiveMode('stats');
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeMode === 'stats'
              ? 'bg-emerald-600 text-white shadow-xs font-black ring-1 ring-emerald-400/40'
              : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.04]'
          }`}
        >
          <BarChart2 className="w-4 h-4" />
          <span>Stats & Weak Spots ({weakPairList.length})</span>
        </button>
      </div>

      {/* =========================================================
          MODE 1: STAGE QUEST (CAMPAIGN)
          ========================================================= */}
      {activeMode === 'stages' && (
        <div className="space-y-6 animate-fade-in">
          {/* If Stage Active, render game board */}
          {stageActive && selectedStage && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-lg space-y-6">
              {/* Stage Run Top Bar */}
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-white/5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      {selectedStage.badge}
                    </span>
                    <h3 className="font-black text-slate-900 dark:text-white text-base sm:text-lg">
                      {selectedStage.name}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Question {currentStageQIdx + 1} of {selectedStage.questionCount} • Score: {stageScore}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Countdown Timer Badge */}
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-sm font-bold border ${
                    stageTimer <= 5
                      ? 'bg-red-500/10 border-red-500/30 text-red-500 animate-pulse'
                      : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300'
                  }`}>
                    <Clock className="w-4 h-4" />
                    <span>{stageTimer}s</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('Quit this stage run?')) {
                        setStageActive(false);
                      }
                    }}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
                    title="Quit Stage"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Progress Bar for Current Stage */}
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-white/5 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300"
                  style={{ width: `${((currentStageQIdx + 1) / selectedStage.questionCount) * 100}%` }}
                />
              </div>

              {/* The Problem Expression */}
              {stageQuestions[currentStageQIdx] && (
                <div className="text-center py-8 space-y-3">
                  <div className="text-xs uppercase tracking-widest font-black text-slate-400">
                    Solve Mentally
                  </div>
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-black font-mono tracking-tight text-slate-900 dark:text-white">
                    {stageQuestions[currentStageQIdx].displayExpression.replace(' = ?', '')}
                  </div>
                  <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center justify-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Tip: {selectedStage.techniqueTip}</span>
                  </div>
                </div>
              )}

              {/* MCQ Options Grid */}
              {stageQuestions[currentStageQIdx] && (
                <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-xl mx-auto">
                  {stageQuestions[currentStageQIdx].options.map((opt, idx) => {
                    const isSelected = stageSelectedAnswer === opt;
                    const isCorrect = Math.abs(opt - stageQuestions[currentStageQIdx].answer) < 0.001;

                    let btnStyle = 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-emerald-500/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-500/10 text-slate-800 dark:text-slate-200';

                    if (stageFeedback !== 'idle') {
                      if (isSelected) {
                        btnStyle = isCorrect
                          ? 'bg-emerald-500 text-white border-emerald-400 ring-2 ring-emerald-300'
                          : 'bg-red-500 text-white border-red-400 ring-2 ring-red-300';
                      } else if (isCorrect) {
                        btnStyle = 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/40';
                      } else {
                        btnStyle = 'opacity-40 border-transparent';
                      }
                    }

                    return (
                      <button
                        key={`${opt}-${idx}`}
                        type="button"
                        disabled={stageFeedback !== 'idle'}
                        onClick={() => handleStageAnswer(opt)}
                        className={`p-4 sm:p-5 rounded-2xl text-xl sm:text-2xl font-black font-mono border-2 transition-all cursor-pointer shadow-xs active:scale-95 flex items-center justify-center gap-2 ${btnStyle}`}
                      >
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Feedback Breakdown Explanation */}
              {stageFeedback !== 'idle' && stageQuestions[currentStageQIdx] && (
                <div className={`p-4 rounded-2xl text-center text-xs sm:text-sm font-semibold animate-fade-in ${
                  stageFeedback === 'correct'
                    ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20'
                    : 'bg-red-500/10 text-red-700 dark:text-red-300 border border-red-500/20'
                }`}>
                  {stageQuestions[currentStageQIdx].mentalBreakdown}
                </div>
              )}
            </div>
          )}

          {/* If Stage Summary Modal is active */}
          {stageSummary && selectedStage && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-2xl text-center space-y-6 animate-scale-up max-w-xl mx-auto">
              <div className="inline-flex p-4 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg">
                <Trophy className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  {stageSummary.stars >= 2 ? 'Stage Mastered!' : 'Stage Completed!'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {selectedStage.name}
                </p>
              </div>

              {/* Star Rating Display */}
              <div className="flex items-center justify-center gap-2 py-2">
                {[1, 2, 3].map(s => (
                  <Star
                    key={s}
                    className={`w-8 h-8 ${
                      s <= stageSummary.stars
                        ? 'text-emerald-400 fill-emerald-400 drop-shadow-md animate-bounce'
                        : 'text-slate-300 dark:text-slate-700'
                    }`}
                  />
                ))}
              </div>

              {/* Summary KPIs */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Score</div>
                  <div className="text-lg font-black text-slate-900 dark:text-white font-mono">
                    {stageSummary.score} / {stageSummary.total}
                  </div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Time Taken</div>
                  <div className="text-lg font-black text-cyan-500 font-mono">
                    {stageSummary.timeTaken}s
                  </div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                  <div className="text-[10px] uppercase font-bold text-slate-400">XP Gained</div>
                  <div className="text-lg font-black text-emerald-500 font-mono">
                    +{stageSummary.xpGained}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleStartStage(selectedStage)}
                  className="flex-1 py-3 px-4 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 font-bold text-xs sm:text-sm text-slate-700 dark:text-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Replay Stage</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStageSummary(null);
                    setSelectedStage(null);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 font-bold text-xs sm:text-sm text-white shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Back to Quest Map</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Stage Quest Selection Map */}
          {!stageActive && !stageSummary && (
            <div className="space-y-6">
              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 visible-pill-scrollbar-indigo max-w-full">
                {DIVISION_CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      if (soundEnabled) soundManager.playClick();
                      haptics.selection();
                      setCategoryFilter(cat.id);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      categoryFilter === cat.id
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-xs'
                        : 'bg-white dark:bg-[#0E101B] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                    <span className="text-[10px] opacity-60">({cat.count})</span>
                  </button>
                ))}
              </div>

              {/* Stages Grid (2 Cols on desktop) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredStages.map(stage => {
                  const isUnlocked = stage.id <= stats.unlockedStage;
                  const stars = stats.stageStars[stage.id] || 0;
                  const theme = getCategoryTheme(stage.category);

                  return (
                    <div
                      key={stage.id}
                      className={`relative p-5 sm:p-6 rounded-3xl border transition-all ${
                        isUnlocked
                          ? 'bg-white dark:bg-[#0E101B] border-slate-200/80 dark:border-white/10 shadow-xs hover:shadow-md hover:border-emerald-500/40 cursor-pointer'
                          : 'bg-slate-100/60 dark:bg-white/[0.02] border-slate-200/40 dark:border-white/5 opacity-70 cursor-not-allowed'
                      }`}
                      onClick={() => isUnlocked && handleStartStage(stage)}
                    >
                      {/* Top Header */}
                      <div className="flex items-start justify-between gap-3 pb-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md border ${theme.badgeBg}`}>
                              {stage.category}
                            </span>
                            <span className="text-xs font-mono font-bold text-slate-400">
                              Stage {stage.id}
                            </span>
                          </div>
                          <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                            {stage.name}
                          </h4>
                          <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                            {stage.hindiName}
                          </p>
                        </div>

                        {/* Lock / Star status badge */}
                        <div>
                          {isUnlocked ? (
                            <div className="flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded-lg">
                              {[1, 2, 3].map(s => (
                                <Star
                                  key={s}
                                  className={`w-3.5 h-3.5 ${
                                    s <= stars
                                      ? 'text-emerald-500 fill-emerald-500'
                                      : 'text-slate-300 dark:text-slate-700'
                                  }`}
                                />
                              ))}
                            </div>
                          ) : (
                            <div className="p-2 rounded-xl bg-slate-200 dark:bg-white/5 text-slate-400">
                              <Lock className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Description & Sample */}
                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-1">
                        {stage.description}
                      </p>

                      {/* Sample problem tag */}
                      <div className="mt-3 p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-medium">Sample:</span>
                        <span className="font-mono font-black text-emerald-600 dark:text-emerald-400">
                          {stage.sampleProblem}
                        </span>
                      </div>

                      {/* Footer Info */}
                      <div className="flex items-center justify-between pt-4 mt-2 border-t border-slate-100 dark:border-white/5 text-xs text-slate-500">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span>{stage.targetTimeSec}s</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <Target className="w-3.5 h-3.5 text-slate-400" />
                            <span>{stage.questionCount} Questions</span>
                          </span>
                        </div>

                        {isUnlocked && (
                          <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                            <span>Start</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================
          MODE 2: 60-SECOND SPEED BLITZ
          ========================================================= */}
      {activeMode === 'blitz' && (
        <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
          {!blitzActive && !blitzFinished && (
            <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 text-center space-y-6 shadow-xl">
              <div className="inline-flex p-4 rounded-3xl bg-gradient-to-br from-cyan-500 to-teal-600 text-white shadow-lg">
                <Timer className="w-12 h-12" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  60-Second Division Blitz ⚡
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                  Race against the clock! Solve as many mental quotients as you can in 1 minute.
                  Streak multipliers double your score!
                </p>
              </div>

              {/* High Score Banner */}
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 font-mono font-bold text-sm">
                <Trophy className="w-4 h-4" />
                <span>All-Time Blitz High Score: {stats.blitzHighScore} Points</span>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleStartBlitz}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-black text-base shadow-lg transition-all active:scale-95 cursor-pointer inline-flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5 fill-white" />
                  <span>Start 60s Blitz Run</span>
                </button>
              </div>
            </div>
          )}

          {/* Active Blitz Board */}
          {blitzActive && blitzQuestion && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xl space-y-6">
              {/* Blitz HUD */}
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-emerald-500 animate-pulse" />
                  <span className="font-mono font-black text-lg text-slate-900 dark:text-white">
                    Score: {blitzScore}
                  </span>
                  {blitzStreak >= 3 && (
                    <span className="text-xs px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 font-bold font-mono">
                      {blitzStreak} Streak!
                    </span>
                  )}
                </div>

                <div className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-mono text-base font-black border ${
                  blitzTimer <= 10
                    ? 'bg-red-500/10 border-red-500/30 text-red-500 animate-pulse'
                    : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200'
                }`}>
                  <Clock className="w-4 h-4" />
                  <span>{blitzTimer}s</span>
                </div>
              </div>

              {/* Timer Progress Bar */}
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-white/5 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-teal-500 transition-all duration-1000"
                  style={{ width: `${(blitzTimer / 60) * 100}%` }}
                />
              </div>

              {/* Expression */}
              <div className="text-center py-6">
                <div className="text-5xl sm:text-6xl font-black font-mono tracking-tight text-slate-900 dark:text-white">
                  {blitzQuestion.displayExpression.replace(' = ?', '')}
                </div>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto">
                {blitzQuestion.options.map((opt, idx) => {
                  const isSelected = blitzSelectedAnswer === opt;
                  const isCorrect = Math.abs(opt - blitzQuestion.answer) < 0.001;

                  let style = 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-cyan-500/50 hover:bg-cyan-50/50 dark:hover:bg-cyan-500/10 text-slate-800 dark:text-slate-200';

                  if (blitzFeedback !== 'idle') {
                    if (isSelected) {
                      style = isCorrect
                        ? 'bg-emerald-500 text-white border-emerald-400'
                        : 'bg-red-500 text-white border-red-400';
                    } else if (isCorrect) {
                      style = 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';
                    }
                  }

                  return (
                    <button
                      key={`${opt}-${idx}`}
                      type="button"
                      disabled={blitzFeedback !== 'idle'}
                      onClick={() => handleBlitzAnswer(opt)}
                      className={`p-4 rounded-2xl text-xl sm:text-2xl font-black font-mono border-2 transition-all cursor-pointer shadow-xs active:scale-95 flex items-center justify-center ${style}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Blitz Finished Summary */}
          {blitzFinished && (
            <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-2xl text-center space-y-6">
              <div className="inline-flex p-4 rounded-3xl bg-gradient-to-br from-cyan-500 to-teal-600 text-white shadow-lg">
                <Award className="w-12 h-12" />
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  Blitz Finished!
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Great stamina! Here are your blitz stats:
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Quotients</div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                    {blitzScore}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Best Streak</div>
                  <div className="text-2xl font-black text-emerald-500 font-mono">
                    {blitzStreak}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                  <div className="text-[10px] uppercase font-bold text-slate-400">XP Gained</div>
                  <div className="text-2xl font-black text-cyan-500 font-mono">
                    +{blitzScore * 20}
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleStartBlitz}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-black text-sm shadow-md transition-all active:scale-95 cursor-pointer inline-flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Play Blitz Again</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================
          MODE 3: ZEN PRACTICE
          ========================================================= */}
      {activeMode === 'zen' && (
        <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
          {/* Zen Filter & Settings Bar */}
          <div className="p-4 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-wrap items-center justify-between gap-3">
            {/* Difficulty Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 visible-pill-scrollbar-indigo max-w-full">
              {(
                [
                  { id: 'all', label: 'All Mixed' },
                  { id: '1-digit', label: '1-Digit Tables' },
                  { id: 'chunking', label: 'Left-to-Right Chunking' },
                  { id: 'double-shift', label: '÷5, ÷25, ÷50' },
                  { id: 'factor-reduction', label: 'Cancel Down' },
                  { id: 'vedic-9', label: 'Vedic 9/99' },
                  { id: 'vedic-dhwajank', label: 'Vedic Flag' },
                  { id: 'decimals', label: 'Decimals' }
                ] as const
              ).map(d => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => {
                    setZenDifficulty(d.id);
                    haptics.selection();
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    zenDifficulty === d.id
                      ? 'bg-teal-600 text-white font-black shadow-xs'
                      : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>

            {/* MCQ vs Numpad Toggle */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-white/5 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setZenInputType('mcq')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  zenInputType === 'mcq'
                    ? 'bg-white dark:bg-[#0E101B] text-slate-900 dark:text-white shadow-xs font-black'
                    : 'text-slate-500'
                }`}
              >
                MCQ (4)
              </button>
              <button
                type="button"
                onClick={() => setZenInputType('numpad')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  zenInputType === 'numpad'
                    ? 'bg-white dark:bg-[#0E101B] text-slate-900 dark:text-white shadow-xs font-black'
                    : 'text-slate-500'
                }`}
              >
                Numpad Direct
              </button>
            </div>
          </div>

          {/* Zen Problem Board */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-lg space-y-6">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
              <div className="flex items-center gap-3">
                <span>Total Answered: {zenTotalAnswered}</span>
                <span>Accuracy: {zenTotalAnswered > 0 ? Math.round((zenCorrectCount / zenTotalAnswered) * 100) : 100}%</span>
              </div>
              <div className="flex items-center gap-1 text-emerald-500 font-bold font-mono">
                <Flame className="w-3.5 h-3.5" />
                <span>Streak: {zenStreak}</span>
              </div>
            </div>

            {/* Problem Expression */}
            <div className="text-center py-6 space-y-2">
              <div className="text-5xl sm:text-6xl font-black font-mono tracking-tight text-slate-900 dark:text-white">
                {zenQuestion.displayExpression.replace(' = ?', '')}
              </div>
              {zenShowTip && (
                <div className="text-xs text-teal-600 dark:text-teal-400 font-semibold animate-fade-in">
                  💡 {zenQuestion.mentalBreakdown}
                </div>
              )}
            </div>

            {/* MCQ Options */}
            {zenInputType === 'mcq' ? (
              <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                {zenQuestion.options.map((opt, idx) => {
                  const isSelected = zenSelectedAns === opt;
                  const isCorrect = Math.abs(opt - zenQuestion.answer) < 0.001;

                  let style = 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-teal-500/50 hover:bg-teal-50/50 dark:hover:bg-teal-500/10 text-slate-800 dark:text-slate-200';

                  if (zenFeedback !== 'idle') {
                    if (isSelected) {
                      style = isCorrect
                        ? 'bg-emerald-500 text-white border-emerald-400'
                        : 'bg-red-500 text-white border-red-400';
                    } else if (isCorrect) {
                      style = 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';
                    }
                  }

                  return (
                    <button
                      key={`${opt}-${idx}`}
                      type="button"
                      disabled={zenFeedback !== 'idle'}
                      onClick={() => handleZenAnswer(opt)}
                      className={`p-4 rounded-2xl text-xl sm:text-2xl font-black font-mono border-2 transition-all cursor-pointer shadow-xs active:scale-95 flex items-center justify-center ${style}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            ) : (
              /* Numpad Direct Input */
              <div className="max-w-xs mx-auto space-y-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-center font-mono font-black text-2xl text-slate-900 dark:text-white min-h-[52px] flex items-center justify-center">
                  {zenNumpadVal || <span className="text-slate-400 text-base font-normal">Type answer...</span>}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => {
                        setZenNumpadVal(prev => prev + num);
                        haptics.selection();
                      }}
                      className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-lg font-black font-mono transition-all cursor-pointer"
                    >
                      {num}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      if (!zenNumpadVal.includes('.')) {
                        setZenNumpadVal(prev => prev + '.');
                        haptics.selection();
                      }
                    }}
                    className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-lg font-black font-mono transition-all cursor-pointer"
                  >
                    .
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setZenNumpadVal(prev => prev + '0');
                      haptics.selection();
                    }}
                    className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-lg font-black font-mono transition-all cursor-pointer"
                  >
                    0
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setZenNumpadVal(prev => prev.slice(0, -1));
                      haptics.selection();
                    }}
                    className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-sm font-bold transition-all cursor-pointer flex items-center justify-center text-slate-500"
                  >
                    <Delete className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleZenNumpadSubmit}
                  className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  Submit Answer
                </button>
              </div>
            )}

            {/* Bottom Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/5 text-xs">
              <button
                type="button"
                onClick={() => setZenShowTip(prev => !prev)}
                className="text-teal-600 dark:text-teal-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{zenShowTip ? 'Hide Mental Hint' : 'Show Mental Hint'}</span>
              </button>

              <button
                type="button"
                onClick={loadNextZenQuestion}
                className="text-slate-500 hover:text-slate-900 dark:hover:text-white font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>Skip Question</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          MODE 4: VEDIC & MIND TRICKS (1 CARD PER ROW WIDE LAYOUT)
          ========================================================= */}
      {activeMode === 'tricks' && (
        <div className="space-y-6 animate-fade-in w-full">
          <div className="p-4 sm:p-6 rounded-3xl bg-purple-500/10 border border-purple-500/20 text-purple-900 dark:text-purple-200 flex items-start gap-3">
            <Lightbulb className="w-6 h-6 text-purple-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-black text-sm sm:text-base">
                Vedic Sutras & Mind Division Lessons (1 Card Per Row Full-Width)
              </h3>
              <p className="text-xs sm:text-sm text-purple-800 dark:text-purple-300">
                Understand the mental algorithms, Hindi explanations, solved thought processes, and take live quizzes to lock in each method.
              </p>
            </div>
          </div>

          {/* Single Card Per Row Layout */}
          <div className="grid grid-cols-1 gap-6 w-full">
            {DIVISION_TECHNIQUES.map((trick, idx) => (
              <div
                key={trick.id}
                className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-6 w-full hover:border-emerald-500/40 transition-colors"
              >
                {/* Header Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-white/5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        {trick.badge}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-400">
                        Method {idx + 1} of {DIVISION_TECHNIQUES.length}
                      </span>
                    </div>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                      {trick.title}
                    </h4>
                    <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      {trick.hindiTitle}
                    </p>
                  </div>

                  <div className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 font-mono text-xs font-bold text-slate-700 dark:text-slate-300 self-start sm:self-auto">
                    {trick.category}
                  </div>
                </div>

                {/* Summary & Explanation */}
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    {trick.summary}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {trick.explanation}
                  </p>
                </div>

                {/* Formula Callout */}
                <div className="p-3.5 rounded-2xl bg-slate-900 text-white font-mono text-xs sm:text-sm font-bold flex items-center justify-between border border-white/10 overflow-x-auto">
                  <span className="text-emerald-400">Formula:</span>
                  <span>{trick.formula}</span>
                </div>

                {/* Steps Section */}
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Mental Algorithm Steps:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {trick.steps.map((st, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2"
                      >
                        <span className="font-mono font-bold text-emerald-500 shrink-0">
                          {sIdx + 1}.
                        </span>
                        <span>{st}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Solved Example Box */}
                <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-700 dark:text-emerald-300">
                    <span>Solved Example:</span>
                    <span className="font-mono text-sm font-black text-slate-900 dark:text-white">
                      {trick.example.problem} = {trick.example.answer}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">Thought Process: </span>
                    {trick.example.thoughtProcess}
                  </p>
                </div>

                {/* Interactive Practice Quiz */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-500" />
                      <span className="text-xs font-black uppercase text-slate-900 dark:text-white tracking-wider">
                        Quick Check Quiz: Solve Mentally
                      </span>
                    </div>
                    <span className="text-xs font-mono font-black text-slate-900 dark:text-white">
                      {trick.sampleQuiz.problem} = ?
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {trick.sampleQuiz.options.map((opt, oIdx) => {
                      const isChosen = trickQuizSelected[trick.id] === opt;
                      const hasAnswered = trickQuizSelected[trick.id] !== undefined;
                      const isCorrect = Math.abs(opt - trick.sampleQuiz.answer) < 0.001;

                      let optClass = 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-emerald-500/40 text-slate-800 dark:text-slate-200';

                      if (hasAnswered) {
                        if (isChosen) {
                          optClass = isCorrect
                            ? 'bg-emerald-500 text-white border-emerald-400 font-black'
                            : 'bg-red-500 text-white border-red-400 font-black';
                        } else if (isCorrect) {
                          optClass = 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/40 font-black';
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          type="button"
                          disabled={hasAnswered}
                          onClick={() => handleTrickQuizSubmit(trick.id, opt, trick.sampleQuiz.answer)}
                          className={`p-3 rounded-xl border text-sm font-mono font-bold transition-all cursor-pointer flex items-center justify-center ${optClass}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {trickQuizSelected[trick.id] !== undefined && (
                    <div className={`p-3 rounded-xl text-xs font-semibold animate-fade-in ${
                      trickQuizFeedback[trick.id]
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                        : 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20'
                    }`}>
                      {trickQuizFeedback[trick.id]
                        ? `🎉 Shabaash! Correct. ${trick.sampleQuiz.mentalTip}`
                        : `❌ Sahi uttar hai ${trick.sampleQuiz.answer}. ${trick.sampleQuiz.mentalTip}`}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================
          MODE 5: STATS & WEAK SPOTS
          ========================================================= */}
      {activeMode === 'stats' && (
        <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
          {/* Main KPI Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 text-center space-y-1 shadow-xs">
              <div className="text-[10px] uppercase font-bold text-slate-400">Total Solved</div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white">
                {stats.totalAnswered}
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 text-center space-y-1 shadow-xs">
              <div className="text-[10px] uppercase font-bold text-slate-400">Accuracy</div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-500">
                {stats.totalAnswered > 0 ? Math.round((stats.totalCorrect / stats.totalAnswered) * 100) : 100}%
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 text-center space-y-1 shadow-xs">
              <div className="text-[10px] uppercase font-bold text-slate-400">Fastest Answer</div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-cyan-500">
                {stats.fastestAnswerSec < 90 ? `${stats.fastestAnswerSec}s` : '--'}
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 text-center space-y-1 shadow-xs">
              <div className="text-[10px] uppercase font-bold text-slate-400">Total XP</div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-teal-500">
                {stats.totalXp}
              </div>
            </div>
          </div>

          {/* Weak Spots Logger */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h4 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  <span>Targeted Mistake Log & Weak Spots</span>
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Equations where you hesitated or answered incorrectly are auto-logged here for focused revision.
                </p>
              </div>

              {weakPairList.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    localStorage.removeItem(STORAGE_KEY_DIVISION_WEAK);
                    setWeakPairs({});
                    haptics.selection();
                  }}
                  className="text-xs text-slate-400 hover:text-red-500 font-bold transition-all cursor-pointer"
                >
                  Clear Mistakes
                </button>
              )}
            </div>

            {weakPairList.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400 bg-slate-50 dark:bg-white/5 rounded-2xl border border-dashed border-slate-200 dark:border-white/10">
                🎉 No frequent mistakes recorded yet! Play more Stages or Blitz runs to map your weak spots.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {weakPairList.map(([pair, count]) => (
                  <div
                    key={pair}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-center space-y-1 hover:border-emerald-500/40 transition-colors"
                  >
                    <div className="text-xs font-mono font-black text-slate-900 dark:text-white">
                      {pair}
                    </div>
                    <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                      {count} {count === 1 ? 'mistake' : 'mistakes'}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
