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
  Activity,
  Minus
} from 'lucide-react';
import { soundManager } from '../../utils/soundEffects';
import { haptics } from '../../utils/haptics';
import { fireCelebration } from '../../utils/confettiHelper';
import {
  SUBTRACTION_STAGES,
  SUBTRACTION_TECHNIQUES,
  SubtractionStageConfig,
  SubtractionQuestion,
  SubtractionStats,
  DEFAULT_SUBTRACTION_STATS,
  STORAGE_KEY_SUBTRACTION_STATS,
  STORAGE_KEY_SUBTRACTION_WEAK,
  generateSubtractionStageQuestion,
  getSubtractionRank,
  generateSubtractionDistractors
} from '../../data/calculationSubtractionData';

export type SubtractionMode = 'stages' | 'blitz' | 'zen' | 'tricks' | 'stats';
export type SubtractionZenDifficulty = 'all' | '1-digit' | '2-digit-simple' | '2-digit-borrow' | '3-digit' | 'decimal';
export type SubtractionInputType = 'mcq' | 'numpad';
export type SubtractionCategoryFilter = 'all' | 'Foundation' | 'Core Speed' | 'Vedic Split' | 'DI Master';

export interface SubtractionCategoryTab {
  id: SubtractionCategoryFilter;
  label: string;
  icon: string;
  count: number;
  range: string;
}

const SUBTRACTION_CATEGORIES: SubtractionCategoryTab[] = [
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
        badgeBg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
        accentBar: 'from-rose-500 via-pink-400 to-red-400',
        borderHover: 'hover:border-rose-500/50',
        tagText: 'text-rose-600 dark:text-rose-400',
        dotBg: 'bg-rose-500'
      };
    case 'Core Speed':
      return {
        badgeBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
        accentBar: 'from-amber-500 via-orange-400 to-yellow-400',
        borderHover: 'hover:border-amber-500/50',
        tagText: 'text-amber-600 dark:text-amber-400',
        dotBg: 'bg-amber-500'
      };
    case 'Vedic Split':
      return {
        badgeBg: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20',
        accentBar: 'from-violet-500 via-purple-400 to-indigo-400',
        borderHover: 'hover:border-violet-500/50',
        tagText: 'text-violet-600 dark:text-violet-400',
        dotBg: 'bg-violet-500'
      };
    case 'DI Master':
      return {
        badgeBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        accentBar: 'from-emerald-500 via-teal-400 to-cyan-400',
        borderHover: 'hover:border-emerald-500/50',
        tagText: 'text-emerald-600 dark:text-emerald-400',
        dotBg: 'bg-emerald-500'
      };
    default:
      return {
        badgeBg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
        accentBar: 'from-indigo-500 to-purple-500',
        borderHover: 'hover:border-indigo-500/50',
        tagText: 'text-indigo-600 dark:text-indigo-400',
        dotBg: 'bg-indigo-500'
      };
  }
};

export const CalculationBoosterSubtraction: React.FC = () => {
  // Navigation Mode
  const [activeMode, setActiveMode] = useState<SubtractionMode>('stages');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // -------------------------------------------------------------------
  // PERSISTENCE STATE (Stats & Weak Pairs)
  // -------------------------------------------------------------------
  const [stats, setStats] = useState<SubtractionStats>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SUBTRACTION_STATS);
      return saved ? { ...DEFAULT_SUBTRACTION_STATS, ...JSON.parse(saved) } : DEFAULT_SUBTRACTION_STATS;
    } catch {
      return DEFAULT_SUBTRACTION_STATS;
    }
  });

  const [weakPairs, setWeakPairs] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SUBTRACTION_WEAK);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Current session streak
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [comboMultiplier, setComboMultiplier] = useState<number>(1);

  // Sync stats to localStorage
  const updateStats = useCallback((updater: (prev: SubtractionStats) => SubtractionStats) => {
    setStats(prev => {
      const next = updater(prev);
      try {
        localStorage.setItem(STORAGE_KEY_SUBTRACTION_STATS, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const recordMistake = useCallback((expression: string) => {
    setWeakPairs(prev => {
      const next = { ...prev, [expression]: (prev[expression] || 0) + 1 };
      try {
        localStorage.setItem(STORAGE_KEY_SUBTRACTION_WEAK, JSON.stringify(next));
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
  const playerRank = useMemo(() => getSubtractionRank(stats.totalXp), [stats.totalXp]);
  const xpInCurrentLevel = stats.totalXp - playerRank.prevThreshold;
  const xpNeededForLevel = playerRank.nextThreshold - playerRank.prevThreshold;
  const levelProgressPercent = Math.min(100, Math.max(0, Math.round((xpInCurrentLevel / xpNeededForLevel) * 100)));

  // -------------------------------------------------------------------
  // 1. STAGES CAMPAIGN STATE
  // -------------------------------------------------------------------
  const [selectedStage, setSelectedStage] = useState<SubtractionStageConfig | null>(null);
  const [stageQuestions, setStageQuestions] = useState<SubtractionQuestion[]>([]);
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
  const [stageFeedback, setStageFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [showMentalHint, setShowMentalHint] = useState<boolean>(false);
  const stageStartTimeRef = useRef<number>(0);
  const [stageCategoryFilter, setStageCategoryFilter] = useState<SubtractionCategoryFilter>('all');

  const totalStarsEarned = useMemo(() => {
    return Object.values(stats.stageStars || {}).reduce((acc: number, curr: number) => acc + (curr || 0), 0);
  }, [stats.stageStars]);

  const masteredStagesCount = useMemo(() => {
    return Object.values(stats.stageStars || {}).filter(s => s === 3).length;
  }, [stats.stageStars]);

  const filteredStages = useMemo(() => {
    if (stageCategoryFilter === 'all') return SUBTRACTION_STAGES;
    return SUBTRACTION_STAGES.filter(s => s.category === stageCategoryFilter);
  }, [stageCategoryFilter]);

  const handleEndStage = useCallback(() => {
    if (!selectedStage) return;
    setStageActive(false);

    const timeSpent = Math.max(1, Math.round((Date.now() - stageStartTimeRef.current) / 1000));
    const accuracy = stageScore / selectedStage.questionCount;

    let stars = 0;
    if (accuracy >= 0.9) stars = 3;
    else if (accuracy >= 0.7) stars = 2;
    else if (accuracy >= 0.5) stars = 1;

    const baseXP = stageScore * 10;
    const bonusXP = stars === 3 ? 50 : stars === 2 ? 25 : 10;
    const totalGainedXP = baseXP + bonusXP;

    // Update stats
    updateStats(prev => {
      const existingStars = prev.stageStars[selectedStage.id] || 0;
      const nextUnlocked = stars >= 1 && selectedStage.id >= prev.unlockedStage
        ? Math.min(10, selectedStage.id + 1)
        : prev.unlockedStage;

      return {
        ...prev,
        totalXp: prev.totalXp + totalGainedXP,
        stageStars: {
          ...prev.stageStars,
          [selectedStage.id]: Math.max(existingStars, stars)
        },
        unlockedStage: nextUnlocked
      };
    });

    if (stars >= 2) {
      if (soundEnabled) soundManager.playLevelUp();
      fireCelebration({ particleCount: 50, spread: 70, origin: { y: 0.7 } });
    } else if (soundEnabled) {
      soundManager.playSuccess();
    }

    setStageSummary({
      stageId: selectedStage.id,
      score: stageScore,
      total: selectedStage.questionCount,
      stars,
      timeTaken: timeSpent,
      xpGained: totalGainedXP
    });
  }, [selectedStage, stageScore, soundEnabled, updateStats]);

  // Stage Timer Countdown
  useEffect(() => {
    if (!stageActive || stageTimer <= 0) return;
    const interval = setInterval(() => {
      setStageTimer(prev => {
        if (prev <= 1) {
          handleEndStage();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [stageActive, stageTimer, handleEndStage]);

  const handleStartStage = (stage: SubtractionStageConfig) => {
    if (stage.id > (stats.unlockedStage || 1)) return; // Locked
    if (soundEnabled) soundManager.playClick();
    haptics.selection();

    // Generate questions for stage
    const qs: SubtractionQuestion[] = [];
    for (let i = 0; i < stage.questionCount; i++) {
      qs.push(generateSubtractionStageQuestion(stage.id));
    }

    setSelectedStage(stage);
    setStageQuestions(qs);
    setCurrentStageQIdx(0);
    setStageScore(0);
    setStageTimer(stage.targetTimeSec);
    setStageFeedback(null);
    setShowMentalHint(false);
    setStageSummary(null);
    setStageActive(true);
    stageStartTimeRef.current = Date.now();
  };

  const handleAnswerStage = (chosen: number) => {
    if (stageFeedback !== null || !stageQuestions[currentStageQIdx]) return;

    const currentQ = stageQuestions[currentStageQIdx];
    const isCorrect = Math.abs(chosen - currentQ.answer) < 0.001;

    if (isCorrect) {
      if (soundEnabled) soundManager.playCompleteChime();
      haptics.success();
      setStageFeedback('correct');
      setStageScore(prev => prev + 1);

      // Streak & XP boost
      setCurrentStreak(prev => {
        const next = prev + 1;
        updateStats(s => ({
          ...s,
          totalAnswered: s.totalAnswered + 1,
          totalCorrect: s.totalCorrect + 1,
          bestStreak: Math.max(s.bestStreak, next)
        }));
        return next;
      });

      // Advance after short delay
      setTimeout(() => {
        handleNextStageQuestion();
      }, 400);
    } else {
      if (soundEnabled) soundManager.playError();
      haptics.error();
      setStageFeedback('wrong');
      setCurrentStreak(0);
      recordMistake(currentQ.displayExpression.replace(' = ?', ''));
      updateStats(s => ({ ...s, totalAnswered: s.totalAnswered + 1 }));

      // Reveal mental hint to explain mistake
      setShowMentalHint(true);
    }
  };

  const handleNextStageQuestion = () => {
    setStageFeedback(null);
    setShowMentalHint(false);

    if (currentStageQIdx + 1 >= stageQuestions.length) {
      handleEndStage();
    } else {
      setCurrentStageQIdx(prev => prev + 1);
    }
  };

  // -------------------------------------------------------------------
  // 2. 60-SECOND SPEED BLITZ STATE
  // -------------------------------------------------------------------
  const [blitzActive, setBlitzActive] = useState<boolean>(false);
  const [blitzTimer, setBlitzTimer] = useState<number>(60);
  const [blitzScore, setBlitzScore] = useState<number>(0);
  const [blitzTotal, setBlitzTotal] = useState<number>(0);
  const [blitzDifficulty, setBlitzDifficulty] = useState<'easy' | 'medium' | 'hard' | 'mixed'>('medium');
  const [blitzQuestion, setBlitzQuestion] = useState<SubtractionQuestion | null>(null);
  const [blitzSummary, setBlitzSummary] = useState<{
    score: number;
    total: number;
    apm: number;
    isNewHigh: boolean;
  } | null>(null);

  const generateBlitzQ = useCallback((): SubtractionQuestion => {
    let stagePick = 5;
    if (blitzDifficulty === 'easy') {
      stagePick = Math.random() > 0.5 ? 1 : 2;
    } else if (blitzDifficulty === 'medium') {
      const picks = [3, 4, 5, 6];
      stagePick = picks[Math.floor(Math.random() * picks.length)];
    } else if (blitzDifficulty === 'hard') {
      const picks = [7, 8, 9, 10];
      stagePick = picks[Math.floor(Math.random() * picks.length)];
    } else {
      stagePick = Math.floor(Math.random() * 10) + 1;
    }
    return generateSubtractionStageQuestion(stagePick);
  }, [blitzDifficulty]);

  const handleEndBlitz = useCallback(() => {
    setBlitzActive(false);
    const isNew = blitzScore > stats.blitzHighScore;
    const apm = blitzScore; // in 60s, score is APM

    if (isNew) {
      if (soundEnabled) soundManager.playLevelUp();
      fireCelebration({ particleCount: 60, spread: 80, origin: { y: 0.6 } });
    } else if (soundEnabled) {
      soundManager.playSuccess();
    }

    const xpEarned = blitzScore * 12;
    updateStats(prev => ({
      ...prev,
      totalXp: prev.totalXp + xpEarned,
      blitzHighScore: Math.max(prev.blitzHighScore, blitzScore)
    }));

    setBlitzSummary({
      score: blitzScore,
      total: blitzTotal,
      apm,
      isNewHigh: isNew
    });
  }, [blitzScore, blitzTotal, soundEnabled, stats.blitzHighScore, updateStats]);

  // Blitz Timer
  useEffect(() => {
    if (!blitzActive || blitzTimer <= 0) return;
    const interval = setInterval(() => {
      setBlitzTimer(prev => {
        if (prev <= 1) {
          handleEndBlitz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [blitzActive, blitzTimer, handleEndBlitz]);

  const handleStartBlitz = () => {
    if (soundEnabled) soundManager.playClick();
    haptics.selection();
    setBlitzActive(true);
    setBlitzTimer(60);
    setBlitzScore(0);
    setBlitzTotal(0);
    setBlitzSummary(null);
    setBlitzQuestion(generateBlitzQ());
  };

  const handleAnswerBlitz = (chosen: number) => {
    if (!blitzQuestion || !blitzActive) return;

    const isCorrect = Math.abs(chosen - blitzQuestion.answer) < 0.001;
    setBlitzTotal(prev => prev + 1);

    if (isCorrect) {
      if (soundEnabled) soundManager.playCompleteChime();
      haptics.selection();
      setBlitzScore(prev => prev + 1);

      setCurrentStreak(prev => {
        const next = prev + 1;
        updateStats(s => ({
          ...s,
          totalAnswered: s.totalAnswered + 1,
          totalCorrect: s.totalCorrect + 1,
          bestStreak: Math.max(s.bestStreak, next)
        }));
        return next;
      });
    } else {
      if (soundEnabled) soundManager.playError();
      haptics.error();
      setCurrentStreak(0);
      recordMistake(blitzQuestion.displayExpression.replace(' = ?', ''));
      updateStats(s => ({ ...s, totalAnswered: s.totalAnswered + 1 }));
    }

    // Instantly generate next question for blitz speed
    setBlitzQuestion(generateBlitzQ());
  };

  // -------------------------------------------------------------------
  // 3. ZEN PRACTICE MODE STATE
  // -------------------------------------------------------------------
  const [zenDifficulty, setZenDifficulty] = useState<SubtractionZenDifficulty>('all');
  const [zenInputType, setZenInputType] = useState<SubtractionInputType>('mcq');
  const [zenQuestion, setZenQuestion] = useState<SubtractionQuestion>(() => generateSubtractionStageQuestion(4));
  const [numpadValue, setNumpadValue] = useState<string>('');
  const [zenFeedback, setZenFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [zenShowHint, setZenShowHint] = useState<boolean>(false);

  const generateZenQ = useCallback(() => {
    let stage = 5;
    if (zenDifficulty === '1-digit') stage = 1;
    else if (zenDifficulty === '2-digit-simple') stage = 4;
    else if (zenDifficulty === '2-digit-borrow') stage = 5;
    else if (zenDifficulty === '3-digit') stage = 7;
    else if (zenDifficulty === 'decimal') stage = 10;
    else stage = Math.floor(Math.random() * 10) + 1;

    setZenQuestion(generateSubtractionStageQuestion(stage));
    setZenFeedback(null);
    setZenShowHint(false);
    setNumpadValue('');
  }, [zenDifficulty]);

  const handleAnswerZen = (val: number) => {
    if (zenFeedback !== null) return;
    const isCorrect = Math.abs(val - zenQuestion.answer) < 0.001;

    if (isCorrect) {
      if (soundEnabled) soundManager.playCompleteChime();
      haptics.success();
      setZenFeedback('correct');
      const xpBonus = Math.round(10 * comboMultiplier);
      setCurrentStreak(prev => {
        const next = prev + 1;
        updateStats(s => ({
          ...s,
          totalAnswered: s.totalAnswered + 1,
          totalCorrect: s.totalCorrect + 1,
          totalXp: s.totalXp + xpBonus,
          bestStreak: Math.max(s.bestStreak, next)
        }));
        return next;
      });
    } else {
      if (soundEnabled) soundManager.playError();
      haptics.error();
      setZenFeedback('wrong');
      setZenShowHint(true);
      setCurrentStreak(0);
      recordMistake(zenQuestion.displayExpression.replace(' = ?', ''));
      updateStats(s => ({ ...s, totalAnswered: s.totalAnswered + 1 }));
    }
  };

  const handleNumpadInput = (digit: string) => {
    if (zenFeedback !== null) return;
    if (digit === 'DEL') {
      setNumpadValue(prev => prev.slice(0, -1));
      return;
    }
    if (digit === 'ENTER') {
      if (numpadValue) {
        handleAnswerZen(parseFloat(numpadValue));
      }
      return;
    }
    if (digit === '.' && numpadValue.includes('.')) return;
    if (numpadValue.length >= 6) return;
    setNumpadValue(prev => prev + digit);
  };

  // -------------------------------------------------------------------
  // 4. WEAK PAIRS & DRILL LIST
  // -------------------------------------------------------------------
  const weakPairList = useMemo(() => {
    return Object.entries(weakPairs)
      .sort((a, b) => b[1] - a[1])
      .map(([pair, count]) => ({ pair, count }));
  }, [weakPairs]);

  return (
    <div className="w-full space-y-6 animate-fade-in pb-12">
      {/* =========================================================
          TOP HERO: LEVEL, XP, STREAK, AND PROFILE STATS
          ========================================================= */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-rose-950/70 via-slate-900 to-slate-950 text-white border border-rose-500/20 shadow-xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
                {playerRank.badge}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {playerRank.hindiTitle}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <Minus className="w-7 h-7 text-rose-400 inline p-1 rounded-lg bg-rose-500/20" />
              <span>{playerRank.title}</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Exam Speed Mental Subtraction Engine • All from 9, Last from 10 & Left-to-Right Drops
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
            {/* Streak */}
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/5 border border-white/10 text-slate-300">
              <Flame className={`w-5 h-5 ${currentStreak > 0 ? 'text-orange-500 animate-bounce' : 'text-slate-500'}`} />
              <div>
                <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Streak</div>
                <div className="text-sm font-black text-white font-mono flex items-center gap-1">
                  <span>{currentStreak}</span>
                  {comboMultiplier > 1 && (
                    <span className="text-[10px] px-1 py-0.2 rounded bg-amber-500/20 text-amber-300">
                      {comboMultiplier}x
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Total XP */}
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/5 border border-white/10 text-slate-300">
              <Trophy className="w-5 h-5 text-amber-400" />
              <div>
                <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Total XP</div>
                <div className="text-sm font-black text-white font-mono">{stats.totalXp}</div>
              </div>
            </div>

            {/* Sound Toggle */}
            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-red-400" />}
            </button>
          </div>
        </div>

        {/* Level XP Progress Bar */}
        <div className="mt-4 pt-4 border-t border-white/10 space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-300 font-medium">
              Level {playerRank.level} Progress: <strong className="text-rose-300">{xpInCurrentLevel} XP</strong>
            </span>
            <span className="text-slate-400 font-mono">
              Next Rank: {playerRank.nextThreshold} XP ({levelProgressPercent}%)
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 transition-all duration-500"
              style={{ width: `${levelProgressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* =========================================================
          MODE SELECTOR TABS
          ========================================================= */}
      <div className="flex items-center p-1.5 rounded-2xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs gap-1.5 w-full overflow-x-auto no-scrollbar">
        <button
          type="button"
          onClick={() => {
            if (soundEnabled) soundManager.playClick();
            haptics.selection();
            setActiveMode('stages');
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeMode === 'stages'
              ? 'bg-rose-600 text-white shadow-xs font-black ring-1 ring-rose-400/40'
              : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.04]'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Stage Quest (10 Levels)</span>
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
              ? 'bg-amber-600 text-white shadow-xs font-black ring-1 ring-amber-400/40'
              : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.04]'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>60s Speed Blitz</span>
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
              ? 'bg-emerald-600 text-white shadow-xs font-black ring-1 ring-emerald-400/40'
              : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.04]'
          }`}
        >
          <Target className="w-4 h-4" />
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
              ? 'bg-rose-600 text-white shadow-xs font-black ring-1 ring-rose-400/40'
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
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400">
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

                {/* Countdown Timer */}
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 font-mono text-sm font-bold text-slate-700 dark:text-slate-300">
                  <Timer className={`w-4 h-4 ${stageTimer <= 5 ? 'text-red-500 animate-pulse' : 'text-rose-500'}`} />
                  <span className={stageTimer <= 5 ? 'text-red-500 font-black' : ''}>{stageTimer}s</span>
                </div>
              </div>

              {/* Question Expression Display */}
              {stageQuestions[currentStageQIdx] && (
                <div className="py-8 sm:py-12 px-4 rounded-3xl bg-gradient-to-b from-slate-50 to-white dark:from-white/[0.02] dark:to-transparent border border-slate-200/60 dark:border-white/5 text-center space-y-4">
                  <div className="text-xs uppercase font-bold tracking-widest text-rose-600 dark:text-rose-400">
                    Solve Mentally (No Pen / Paper)
                  </div>
                  <div className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
                    {stageQuestions[currentStageQIdx].displayExpression}
                  </div>

                  {/* Mental Trick Reveal (if wrong) */}
                  {showMentalHint && (
                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-300 max-w-lg mx-auto text-xs sm:text-sm text-left animate-fade-in flex items-start gap-3">
                      <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <strong>Mental Solution: </strong>
                        <span>{stageQuestions[currentStageQIdx].mentalBreakdown}</span>
                        <div className="mt-2 text-right">
                          <button
                            type="button"
                            onClick={handleNextStageQuestion}
                            className="px-3 py-1 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs cursor-pointer hover:bg-amber-400"
                          >
                            Next Question →
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 4 Interactive MCQ Options */}
              {stageQuestions[currentStageQIdx] && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full">
                  {stageQuestions[currentStageQIdx].options.map((opt, idx) => {
                    const isCorrectAnswer = opt === stageQuestions[currentStageQIdx].answer;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleAnswerStage(opt)}
                        disabled={stageFeedback !== null}
                        className={`p-4 sm:p-5 rounded-2xl font-mono text-xl sm:text-2xl font-black transition-all cursor-pointer shadow-xs border ${
                          stageFeedback === 'correct' && isCorrectAnswer
                            ? 'bg-emerald-600 text-white border-emerald-500 shadow-emerald-500/20 scale-105'
                            : stageFeedback === 'wrong' && !isCorrectAnswer
                            ? 'bg-red-500/10 text-red-500 border-red-500/30'
                            : stageFeedback === 'wrong' && isCorrectAnswer
                            ? 'bg-emerald-600 text-white border-emerald-500'
                            : 'bg-white dark:bg-[#121422] text-slate-900 dark:text-white border-slate-200 dark:border-white/10 hover:border-rose-500 hover:scale-[1.02] active:scale-[0.98]'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Cancel Button */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setStageActive(false)}
                  className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 underline cursor-pointer"
                >
                  Quit Stage
                </button>
              </div>
            </div>
          )}

          {/* Stage Completion Summary Modal */}
          {stageSummary && (
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-rose-950 via-slate-900 to-slate-950 text-white border border-rose-500/30 shadow-2xl text-center space-y-6 max-w-xl mx-auto animate-fade-in">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-500/20 flex items-center justify-center border border-amber-500/40">
                <Trophy className="w-8 h-8 text-amber-400" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-white">Stage Completed!</h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  {stageSummary.score} / {stageSummary.total} Questions Solved in {stageSummary.timeTaken}s
                </p>

                {/* Stars earned */}
                <div className="flex justify-center items-center gap-2 pt-2">
                  {[1, 2, 3].map(s => (
                    <Star
                      key={s}
                      className={`w-8 h-8 transition-all ${
                        s <= stageSummary.stars
                          ? 'text-yellow-400 fill-yellow-400 scale-110 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]'
                          : 'text-white/20'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-[10px] uppercase font-bold text-slate-400">XP Gained</div>
                  <div className="text-xl font-black text-amber-400 font-mono">+{stageSummary.xpGained} XP</div>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Accuracy</div>
                  <div className="text-xl font-black text-emerald-400 font-mono">
                    {Math.round((stageSummary.score / stageSummary.total) * 100)}%
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    const st = SUBTRACTION_STAGES.find(s => s.id === stageSummary.stageId);
                    if (st) handleStartStage(st);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer"
                >
                  Retry Stage
                </button>
                <button
                  type="button"
                  onClick={() => setStageSummary(null)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-black text-xs sm:text-sm transition-all cursor-pointer shadow-lg"
                >
                  Back to Stages
                </button>
              </div>
            </div>
          )}

          {/* 10-Stages Grid (If not currently playing) */}
          {!stageActive && !stageSummary && (
            <div className="space-y-6">
              {/* Campaign Control & Progress Banner */}
              <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-5">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-xs">
                        SSC & Bank Calculation Quest
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                        10 Progressive Stages (Basic → Advanced)
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                      Subtraction Mastery Progression Campaign
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-2xl">
                      Next stage unlock karne ke liye har level me kam se kam 1 Star earn karein. Full mastery ke liye 3 Stars target karein!
                    </p>
                  </div>

                  {/* Campaign KPI Stat Pills */}
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                    <div className="px-3.5 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center min-w-[90px]">
                      <div className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400">Campaign Stars</div>
                      <div className="text-base sm:text-lg font-black text-amber-600 dark:text-amber-300 font-mono flex items-center justify-center gap-1">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400 inline" />
                        <span>{totalStarsEarned} / 30</span>
                      </div>
                    </div>

                    <div className="px-3.5 py-2 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-center min-w-[90px]">
                      <div className="text-[10px] uppercase font-bold text-rose-600 dark:text-rose-400">Mastered (3★)</div>
                      <div className="text-base sm:text-lg font-black text-rose-600 dark:text-rose-300 font-mono">
                        {masteredStagesCount} / 10
                      </div>
                    </div>

                    <div className="px-3.5 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center min-w-[90px]">
                      <div className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400">Frontier</div>
                      <div className="text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-300 font-mono">
                        Stage {stats.unlockedStage || 1} / 10
                      </div>
                    </div>
                  </div>
                </div>

                {/* Overall Campaign Mastery Progress Bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-600 dark:text-slate-400 font-bold flex items-center gap-1.5">
                      <Trophy className="w-3.5 h-3.5 text-amber-500" />
                      <span>Campaign Completion Progress</span>
                    </span>
                    <span className="font-mono font-black text-rose-600 dark:text-rose-400">
                      {Math.round((totalStarsEarned / 30) * 100)}% ({totalStarsEarned}/30 Stars Earned)
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden p-0.5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-rose-500 via-purple-500 to-amber-400 transition-all duration-700 shadow-sm"
                      style={{ width: `${Math.max(4, Math.round((totalStarsEarned / 30) * 100))}%` }}
                    />
                  </div>
                </div>

                {/* Category Filter Pills */}
                <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex items-center gap-2 overflow-x-auto no-scrollbar">
                  {SUBTRACTION_CATEGORIES.map(cat => {
                    const isSelected = stageCategoryFilter === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          if (soundEnabled) soundManager.playClick();
                          setStageCategoryFilter(cat.id);
                        }}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                          isSelected
                            ? 'bg-rose-600 text-white shadow-xs font-black ring-1 ring-rose-400/40'
                            : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        <span>{cat.icon}</span>
                        <span>{cat.label}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-slate-400 font-mono'
                        }`}>
                          {cat.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 10-Stages Responsive Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredStages.map(stage => {
                  const isUnlocked = stage.id <= (stats.unlockedStage || 1);
                  const stars = stats.stageStars[stage.id] || 0;
                  const isMastered = stars === 3;
                  const isCleared = stars > 0 && stars < 3;
                  const isCurrentChallenge = isUnlocked && stars === 0 && (stage.id === (stats.unlockedStage || 1) || (stage.id === 1 && !stats.unlockedStage));
                  const theme = getCategoryTheme(stage.category);
                  const cleanTitle = stage.name.replace(/^Stage\s+\d+:\s*/i, '');

                  return (
                    <div
                      key={stage.id}
                      className={`group rounded-3xl border transition-all duration-300 relative flex flex-col justify-between overflow-hidden ${
                        !isUnlocked
                          ? 'bg-slate-50/50 dark:bg-white/[0.02] border-dashed border-slate-200 dark:border-white/5 opacity-75 backdrop-blur-[2px]'
                          : isCurrentChallenge
                          ? 'bg-white dark:bg-[#0E101B] border-rose-500/70 dark:border-rose-400/60 ring-2 ring-rose-500/40 shadow-lg shadow-rose-500/10 dark:shadow-[0_0_30px_rgba(244,63,94,0.22)] hover:-translate-y-1'
                          : isMastered
                          ? 'bg-white dark:bg-[#0E101B] border-amber-400/40 dark:border-amber-400/25 shadow-xs hover:border-amber-400 hover:shadow-md hover:-translate-y-1'
                          : 'bg-white dark:bg-[#0E101B] border-slate-200/80 dark:border-white/10 shadow-xs hover:border-rose-500/70 hover:shadow-md hover:-translate-y-1'
                      }`}
                    >
                      {/* Top Gradient Accent Bar */}
                      <div className={`h-1.5 w-full bg-gradient-to-r ${isUnlocked ? theme.accentBar : 'from-slate-300 to-slate-200 dark:from-white/10 dark:to-white/5'}`} />

                      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          {/* Header: Stage Number, Category, Objective Badge & Stars/Lock */}
                          <div className="flex items-center justify-between gap-3 mb-3">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-mono text-[11px] font-black px-2.5 py-1 rounded-xl bg-slate-900/5 dark:bg-white/10 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-white/10 tracking-wider">
                                STAGE {stage.id < 10 ? `0${stage.id}` : stage.id}
                              </span>

                              <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg border ${theme.badgeBg}`}>
                                {stage.category}
                              </span>

                              {isCurrentChallenge && (
                                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg bg-gradient-to-r from-rose-500 to-pink-600 text-white animate-pulse shadow-xs">
                                  🔥 Next Goal
                                </span>
                              )}
                            </div>

                            {/* Stars / Lock */}
                            <div className="shrink-0">
                              {isUnlocked ? (
                                <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100/80 dark:bg-white/5 border border-slate-200/60 dark:border-white/10">
                                  {[1, 2, 3].map(s => (
                                    <Star
                                      key={s}
                                      className={`w-4 h-4 transition-all ${
                                        s <= stars
                                          ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)] scale-110'
                                          : 'text-slate-300 dark:text-white/15'
                                      }`}
                                    />
                                  ))}
                                </div>
                              ) : (
                                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-400 text-xs font-bold">
                                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                                  <span>Locked</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Badge & Title */}
                          <div className="space-y-1">
                            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                              {stage.badge}
                            </div>
                            <h4 className="font-black text-slate-900 dark:text-white text-base sm:text-lg leading-snug group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                              {cleanTitle}
                            </h4>
                            <p className="text-xs font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1.5 pt-0.5">
                              <span className={`w-1.5 h-1.5 rounded-full ${theme.dotBg} shrink-0`} />
                              <span>{stage.hindiName}</span>
                            </p>
                          </div>

                          {/* Description */}
                          <p className="mt-3 text-xs text-slate-600 dark:text-slate-300/90 leading-relaxed">
                            {stage.description}
                          </p>
                        </div>

                        {/* Technique Box */}
                        <div className="p-3 rounded-2xl bg-amber-500/[0.08] dark:bg-amber-500/[0.04] border border-amber-500/20 dark:border-amber-400/15 space-y-1">
                          <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-400">
                            <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                            <span>Vedic & Mental Hack</span>
                          </div>
                          <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                            {stage.techniqueTip}
                          </p>
                        </div>

                        {/* Bottom Area: Specs + Full-width CTA */}
                        <div className="pt-3 border-t border-slate-100 dark:border-white/5 space-y-3">
                          <div className="flex items-center justify-between text-xs gap-2">
                            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-medium">
                              <Timer className="w-3.5 h-3.5 text-rose-500" />
                              <span className="font-bold text-slate-700 dark:text-slate-300">{stage.targetTimeSec}s</span>
                              <span className="text-slate-300 dark:text-slate-600">•</span>
                              <span>{stage.questionCount} Questions</span>
                            </div>

                            <div className="font-mono text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                              <span className="text-slate-400 text-[11px]">Sample:</span>
                              <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/10 text-rose-600 dark:text-rose-300 font-black">
                                {stage.sampleProblem}
                              </span>
                            </div>
                          </div>

                          {/* Action CTA Button */}
                          {isUnlocked ? (
                            <button
                              type="button"
                              onClick={() => handleStartStage(stage)}
                              className={`w-full py-2.5 px-4 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-2 ${
                                isMastered
                                  ? 'bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-900 dark:text-white border border-slate-200/80 dark:border-white/10 shadow-xs'
                                  : isCleared
                                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs hover:shadow-emerald-500/20'
                                  : 'bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 hover:from-rose-700 hover:to-purple-700 text-white shadow-md shadow-rose-500/25 active:scale-[0.99]'
                              }`}
                            >
                              {isMastered ? (
                                <>
                                  <RotateCcw className="w-3.5 h-3.5 text-amber-500" />
                                  <span>Mastered (3★) · Replay Stage</span>
                                </>
                              ) : isCleared ? (
                                <>
                                  <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                                  <span>Improve Score ({stars}★) · Replay</span>
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </>
                              ) : (
                                <>
                                  <Play className="w-3.5 h-3.5 fill-current" />
                                  <span>Start Stage Challenge</span>
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </>
                              )}
                            </button>
                          ) : (
                            <div className="w-full py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 text-slate-400 text-[11px] font-bold flex items-center justify-center gap-1.5 cursor-not-allowed">
                              <Lock className="w-3.5 h-3.5" />
                              <span>Complete Stage {stage.id - 1} with ≥ 1★ to Unlock</span>
                            </div>
                          )}
                        </div>
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
        <div className="space-y-6 animate-fade-in w-full">
          {!blitzActive && !blitzSummary && (
            <div className="p-8 sm:p-12 text-center rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-lg space-y-7 w-full">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20">
                <Zap className="w-8 h-8 fill-amber-500" />
              </div>

              <div className="space-y-2 max-w-2xl mx-auto">
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  60-Second Subtraction Blitz (टाइम अटैक)
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  1 minute me maximum mental subtractions solve karein. Fast correct streaks par combo multiplier (1.2x, 1.5x, 2x) unlock hota hai!
                </p>
              </div>

              {/* Difficulty Selector */}
              <div className="flex items-center justify-center gap-2 flex-wrap">
                {(['easy', 'medium', 'hard', 'mixed'] as const).map(diff => (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => setBlitzDifficulty(diff)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                      blitzDifficulty === diff
                        ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
                        : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10'
                    }`}
                  >
                    {diff === 'easy' && '🌱 Easy (1-Digit & Drops)'}
                    {diff === 'medium' && '⚡ Medium (2-Digit & 100s)'}
                    {diff === 'hard' && '🔥 Hard (3-Digit & Decimals)'}
                    {diff === 'mixed' && '🎲 Mixed Exam Level'}
                  </button>
                ))}
              </div>

              {/* High Score Banner */}
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 max-w-xs mx-auto text-xs font-mono font-bold flex items-center justify-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>Your Blitz Record: {stats.blitzHighScore} Solved in 60s</span>
              </div>

              <div>
                <button
                  type="button"
                  onClick={handleStartBlitz}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-slate-950 font-black text-base transition-all shadow-xl shadow-amber-500/25 hover:scale-105 active:scale-95 cursor-pointer inline-flex items-center gap-2"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>Start 60s Blitz Run</span>
                </button>
              </div>
            </div>
          )}

          {/* Blitz Running Board */}
          {blitzActive && blitzQuestion && (
            <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xl space-y-7">
              {/* Top Blitz Header */}
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 font-mono text-xs font-black">
                    SCORE: <span className="text-base text-slate-900 dark:text-white">{blitzScore}</span>
                  </div>
                  {comboMultiplier > 1 && (
                    <span className="text-xs font-black px-2 py-1 rounded-lg bg-orange-500 text-white animate-pulse">
                      {comboMultiplier}x COMBO
                    </span>
                  )}
                </div>

                {/* Big Countdown Timer */}
                <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-100 dark:bg-white/5 font-mono text-base font-black">
                  <Timer className={`w-5 h-5 ${blitzTimer <= 10 ? 'text-red-500 animate-pulse' : 'text-amber-500'}`} />
                  <span className={blitzTimer <= 10 ? 'text-red-500 font-black text-lg' : 'text-slate-800 dark:text-white'}>
                    {blitzTimer}s
                  </span>
                </div>
              </div>

              {/* Expression */}
              <div className="py-10 text-center rounded-3xl bg-gradient-to-b from-slate-50 to-white dark:from-white/[0.02] dark:to-transparent border border-slate-200/60 dark:border-white/5 space-y-2">
                <div className="text-xs uppercase font-bold text-amber-500 tracking-wider">Speed Subtraction</div>
                <div className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
                  {blitzQuestion.displayExpression}
                </div>
              </div>

              {/* 4 Instant MCQ Choices */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {blitzQuestion.options.map((opt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleAnswerBlitz(opt)}
                    className="p-5 sm:p-6 rounded-2xl font-mono text-2xl sm:text-3xl font-black bg-white dark:bg-[#121422] text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 hover:border-amber-500 hover:bg-amber-500/5 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-xs"
                  >
                    {opt}
                  </button>
                ))}
              </div>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setBlitzActive(false)}
                  className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 underline cursor-pointer"
                >
                  Quit Blitz Run
                </button>
              </div>
            </div>
          )}

          {/* Blitz Results Modal */}
          {blitzSummary && (
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-amber-950/80 via-slate-900 to-slate-950 text-white border border-amber-500/30 shadow-2xl text-center space-y-6 max-w-xl mx-auto animate-fade-in">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-500/20 flex items-center justify-center border border-amber-500/40">
                <Trophy className="w-8 h-8 text-amber-400" />
              </div>

              <div className="space-y-1.5">
                {blitzSummary.isNewHigh && (
                  <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-amber-400 text-slate-950 shadow-md">
                    🎉 New High Score!
                  </span>
                )}
                <h3 className="text-3xl font-black text-white pt-2">Blitz Run Finished!</h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Aapne 60 seconds me total <strong className="text-amber-300">{blitzSummary.score}</strong> subtractions successfully solve kiye!
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Solved</div>
                  <div className="text-2xl font-black text-white font-mono">{blitzSummary.score}</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Speed (APM)</div>
                  <div className="text-2xl font-black text-amber-400 font-mono">{blitzSummary.apm}</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Accuracy</div>
                  <div className="text-2xl font-black text-emerald-400 font-mono">
                    {blitzSummary.total > 0 ? Math.round((blitzSummary.score / blitzSummary.total) * 100) : 0}%
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-center pt-2">
                <button
                  type="button"
                  onClick={handleStartBlitz}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm transition-all cursor-pointer shadow-lg"
                >
                  Play Again ⚡
                </button>
                <button
                  type="button"
                  onClick={() => setBlitzSummary(null)}
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer"
                >
                  Back to Menu
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================
          MODE 3: ZEN PRACTICE (UNTIMED MASTERY)
          ========================================================= */}
      {activeMode === 'zen' && (
        <div className="space-y-6 animate-fade-in w-full">
          {/* Controls Bar: Difficulty + Input Mode */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {[
                { id: 'all', label: 'All Mixed' },
                { id: '1-digit', label: '1-Digit Reflex' },
                { id: '2-digit-simple', label: '2-Digit Simple' },
                { id: '2-digit-borrow', label: '2-Digit Borrow' },
                { id: '3-digit', label: '3-Digit Drops' },
                { id: 'decimal', label: 'Decimals' }
              ].map(f => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => {
                    setZenDifficulty(f.id as any);
                    setTimeout(generateZenQ, 50);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    zenDifficulty === f.id
                      ? 'bg-emerald-600 text-white shadow-xs font-black ring-1 ring-emerald-400/40'
                      : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Input Toggle (MCQ vs Numpad) */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-white/5 shrink-0 self-start md:self-auto">
              <button
                type="button"
                onClick={() => setZenInputType('mcq')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  zenInputType === 'mcq'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-black'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                4 Options (MCQ)
              </button>
              <button
                type="button"
                onClick={() => setZenInputType('numpad')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  zenInputType === 'numpad'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-black'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                Virtual Keypad
              </button>
            </div>
          </div>

          {/* Question Box */}
          <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-lg text-center space-y-6">
            <div className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              Untimed Zen Practice • Mental Flow
            </div>

            <div className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white font-mono tracking-tight py-4">
              {zenQuestion.displayExpression}
            </div>

            {/* Mental Breakdown Reveal Card */}
            {(zenShowHint || zenFeedback === 'wrong') && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-300 max-w-lg mx-auto text-xs sm:text-sm text-left animate-fade-in flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong>Mental Solution Technique:</strong>
                  <p>{zenQuestion.mentalBreakdown}</p>
                </div>
              </div>
            )}

            {/* Mode A: 4 Options */}
            {zenInputType === 'mcq' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto pt-2">
                {zenQuestion.options.map((opt, idx) => {
                  const isCorrectAnswer = opt === zenQuestion.answer;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAnswerZen(opt)}
                      disabled={zenFeedback !== null}
                      className={`p-5 rounded-2xl font-mono text-xl sm:text-2xl font-black transition-all cursor-pointer border ${
                        zenFeedback === 'correct' && isCorrectAnswer
                          ? 'bg-emerald-600 text-white border-emerald-500 scale-105 shadow-md shadow-emerald-500/20'
                          : zenFeedback === 'wrong' && !isCorrectAnswer
                          ? 'bg-red-500/10 text-red-500 border-red-500/30'
                          : zenFeedback === 'wrong' && isCorrectAnswer
                          ? 'bg-emerald-600 text-white border-emerald-500'
                          : 'bg-slate-50 dark:bg-white/[0.03] text-slate-900 dark:text-white border-slate-200/80 dark:border-white/10 hover:border-emerald-500 hover:scale-[1.02]'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Mode B: Virtual Keypad */}
            {zenInputType === 'numpad' && (
              <div className="max-w-xs mx-auto space-y-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 font-mono text-3xl font-black text-slate-900 dark:text-white min-h-[64px] flex items-center justify-center">
                  {numpadValue || <span className="text-slate-400 text-xl font-normal">Type answer...</span>}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'DEL'].map(k => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => handleNumpadInput(k)}
                      className={`p-3.5 rounded-xl font-mono text-lg font-black transition-all cursor-pointer ${
                        k === 'DEL'
                          ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20'
                          : 'bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-800 dark:text-white border border-slate-200/50 dark:border-white/5'
                      }`}
                    >
                      {k}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => handleNumpadInput('ENTER')}
                  disabled={!numpadValue}
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-black text-sm transition-all cursor-pointer shadow-md shadow-emerald-500/20"
                >
                  Submit Answer ↵
                </button>
              </div>
            )}

            {/* Next Question / Solution Button */}
            <div className="flex items-center justify-center gap-3 pt-4">
              {!zenShowHint && zenFeedback === null && (
                <button
                  type="button"
                  onClick={() => setZenShowHint(true)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1.5 cursor-pointer"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                  <span>Reveal Mental Hack</span>
                </button>
              )}

              <button
                type="button"
                onClick={generateZenQ}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 shadow-xs"
              >
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          MODE 4: VEDIC & MIND TRICKS (LESSONS)
          ========================================================= */}
      {activeMode === 'tricks' && (
        <div className="space-y-6 animate-fade-in w-full">
          <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs">
            <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-purple-500" />
              <span>Vedic & Speed Mental Subtraction Techniques</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              In 6 foundational techniques ko master karke aap paper par borrow likhne ke bajaye direct mind me subtract kar sakte hain.
            </p>
          </div>

          {/* Single Card Per Row Layout */}
          <div className="grid grid-cols-1 gap-6 w-full">
            {SUBTRACTION_TECHNIQUES.map((trick, idx) => (
              <div
                key={trick.id}
                className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-6 w-full hover:border-purple-500/40 transition-colors"
              >
                {/* Header Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-white/5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                        {trick.badge}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-400">
                        Method {idx + 1} of {SUBTRACTION_TECHNIQUES.length}
                      </span>
                    </div>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                      {trick.title}
                    </h4>
                    <p className="text-xs font-semibold text-purple-600 dark:text-purple-400">
                      {trick.hindiTitle}
                    </p>
                  </div>

                  <div className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 font-mono text-xs font-bold shrink-0">
                    Formula: {trick.formula}
                  </div>
                </div>

                {/* Explanation */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {trick.explanation}
                </p>

                {/* 2-Column Split: Steps & Live Example */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {/* Step by Step Breakdown */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5 space-y-3">
                    <div className="text-xs uppercase font-black tracking-wider text-slate-500 dark:text-slate-400">
                      How It Works (कार्यविधि)
                    </div>
                    <ul className="space-y-2.5">
                      {trick.steps.map((st, sIdx) => (
                        <li key={sIdx} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5 font-mono">
                            {sIdx + 1}
                          </span>
                          <span className="leading-snug">{st}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Live Exam Example */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-purple-500/[0.04] border border-purple-500/20 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="text-xs uppercase font-black tracking-wider text-purple-600 dark:text-purple-400">
                        Live Exam Example
                      </div>
                      <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                        {trick.example.problem} = ?
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        <strong>Thought Process: </strong> {trick.example.thoughtProcess}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-purple-500/20 flex items-center justify-between">
                      <span className="text-xs font-bold text-purple-600 dark:text-purple-400">Answer:</span>
                      <span className="font-mono text-xl font-black text-purple-600 dark:text-purple-300">
                        {trick.example.answer}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Interactive Practice Quiz Button */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold text-slate-500">Quick Practice:</span>
                    <span className="font-mono font-black text-sm text-slate-900 dark:text-white ml-2">
                      {trick.sampleQuiz.problem} = ?
                    </span>
                    <span className="text-xs text-slate-400 ml-2">({trick.sampleQuiz.mentalTip})</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {trick.sampleQuiz.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        type="button"
                        onClick={() => {
                          if (opt === trick.sampleQuiz.answer) {
                            if (soundEnabled) soundManager.playCompleteChime();
                            haptics.success();
                            alert('Correct! Great mental calculation.');
                          } else {
                            if (soundEnabled) soundManager.playError();
                            haptics.error();
                            alert(`Not quite! Hint: ${trick.sampleQuiz.mentalTip}`);
                          }
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-white/10 hover:bg-purple-600 hover:text-white text-xs font-mono font-bold transition-all cursor-pointer border border-slate-200 dark:border-white/10"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================
          MODE 5: STATS & WEAK SPOTS (DIAGNOSTIC ENGINE)
          ========================================================= */}
      {activeMode === 'stats' && (
        <div className="space-y-6 animate-fade-in w-full">
          {/* Diagnostic KPI Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-1">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Questions</div>
              <div className="text-3xl font-black text-slate-900 dark:text-white font-mono">
                {stats.totalAnswered}
              </div>
              <div className="text-[11px] text-slate-400">Total practice attempts</div>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-1">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Accuracy</div>
              <div className="text-3xl font-black text-emerald-500 font-mono">
                {stats.totalAnswered > 0 ? Math.round((stats.totalCorrect / stats.totalAnswered) * 100) : 0}%
              </div>
              <div className="text-[11px] text-slate-400">{stats.totalCorrect} correct answers</div>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-1">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Blitz High Score</div>
              <div className="text-3xl font-black text-amber-500 font-mono">
                {stats.blitzHighScore}
              </div>
              <div className="text-[11px] text-slate-400">in 60 seconds run</div>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-1">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Longest Streak</div>
              <div className="text-3xl font-black text-orange-500 font-mono">
                {stats.bestStreak}
              </div>
              <div className="text-[11px] text-slate-400">unbroken correct streak</div>
            </div>
          </div>

          {/* Weak Subtraction Pairs Drill */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Brain className="w-5 h-5 text-rose-500" />
                  <span>Weak Subtraction Pairs (गलतियों का रिकॉर्ड)</span>
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Ye wo subtraction pairs hain jinme speed me sabse zyada mistakes hui hain. Inhe bar-bar drill karein.
                </p>
              </div>

              {weakPairList.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setWeakPairs({});
                    localStorage.removeItem(STORAGE_KEY_SUBTRACTION_WEAK);
                  }}
                  className="text-xs font-bold text-rose-500 hover:underline cursor-pointer"
                >
                  Clear Mistakes Log
                </button>
              )}
            </div>

            {weakPairList.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-dashed border-slate-200 dark:border-white/10 text-slate-400 text-xs">
                No recurring mistake pairs yet! Play Blitz or Stage Quest to track your tricky subtraction pairs.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {weakPairList.map(({ pair, count }) => (
                  <div
                    key={pair}
                    className="p-3.5 rounded-2xl bg-rose-500/[0.04] border border-rose-500/20 text-center space-y-1"
                  >
                    <div className="text-xs font-mono font-black text-slate-900 dark:text-white">
                      {pair}
                    </div>
                    <div className="text-[11px] font-bold text-rose-500">
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
