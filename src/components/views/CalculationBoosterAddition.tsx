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
  ADDITION_STAGES,
  ADDITION_TECHNIQUES,
  AdditionStageConfig,
  AdditionQuestion,
  AdditionStats,
  DEFAULT_ADDITION_STATS,
  STORAGE_KEY_ADDITION_STATS,
  STORAGE_KEY_ADDITION_WEAK,
  generateStageQuestion,
  getAdditionRank,
  generateDistractors
} from '../../data/calculationAdditionData';

export type AdditionMode = 'stages' | 'blitz' | 'zen' | 'tricks' | 'stats';
export type ZenDifficulty = 'all' | '1-digit' | '2-digit-simple' | '2-digit-carry' | 'chain' | 'decimal';
export type InputType = 'mcq' | 'numpad';
export type StageCategoryFilter = 'all' | 'Foundation' | 'Core Speed' | 'Vedic Split' | 'DI Master';

export interface StageCategoryTab {
  id: StageCategoryFilter;
  label: string;
  icon: string;
  count: number;
  range: string;
}

const STAGE_CATEGORIES: StageCategoryTab[] = [
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
        badgeBg: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
        accentBar: 'from-blue-500 via-cyan-400 to-teal-400',
        borderHover: 'hover:border-cyan-500/50',
        tagText: 'text-cyan-600 dark:text-cyan-400',
        dotBg: 'bg-cyan-500'
      };
    case 'Core Speed':
      return {
        badgeBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        accentBar: 'from-emerald-500 via-teal-400 to-green-400',
        borderHover: 'hover:border-emerald-500/50',
        tagText: 'text-emerald-600 dark:text-emerald-400',
        dotBg: 'bg-emerald-500'
      };
    case 'Vedic Split':
      return {
        badgeBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
        accentBar: 'from-amber-500 via-orange-400 to-rose-400',
        borderHover: 'hover:border-amber-500/50',
        tagText: 'text-amber-600 dark:text-amber-400',
        dotBg: 'bg-amber-500'
      };
    case 'DI Master':
      return {
        badgeBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
        accentBar: 'from-purple-500 via-indigo-400 to-pink-400',
        borderHover: 'hover:border-purple-500/50',
        tagText: 'text-purple-600 dark:text-purple-400',
        dotBg: 'bg-purple-500'
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

export const CalculationBoosterAddition: React.FC = () => {
  // Navigation Mode
  const [activeMode, setActiveMode] = useState<AdditionMode>('stages');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // -------------------------------------------------------------------
  // PERSISTENCE STATE (Stats & Weak Pairs)
  // -------------------------------------------------------------------
  const [stats, setStats] = useState<AdditionStats>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ADDITION_STATS);
      return saved ? { ...DEFAULT_ADDITION_STATS, ...JSON.parse(saved) } : DEFAULT_ADDITION_STATS;
    } catch {
      return DEFAULT_ADDITION_STATS;
    }
  });

  const [weakPairs, setWeakPairs] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ADDITION_WEAK);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Current session streak
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [comboMultiplier, setComboMultiplier] = useState<number>(1);

  // Sync stats to localStorage
  const updateStats = useCallback((updater: (prev: AdditionStats) => AdditionStats) => {
    setStats(prev => {
      const next = updater(prev);
      try {
        localStorage.setItem(STORAGE_KEY_ADDITION_STATS, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const recordMistake = useCallback((expression: string) => {
    setWeakPairs(prev => {
      const next = { ...prev, [expression]: (prev[expression] || 0) + 1 };
      try {
        localStorage.setItem(STORAGE_KEY_ADDITION_WEAK, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const clearMistake = useCallback((expression: string) => {
    setWeakPairs(prev => {
      if (!prev[expression]) return prev;
      const next = { ...prev };
      delete next[expression];
      try {
        localStorage.setItem(STORAGE_KEY_ADDITION_WEAK, JSON.stringify(next));
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
  const playerRank = useMemo(() => getAdditionRank(stats.totalXp), [stats.totalXp]);
  const xpInCurrentLevel = stats.totalXp - playerRank.prevThreshold;
  const xpNeededForLevel = playerRank.nextThreshold - playerRank.prevThreshold;
  const levelProgressPercent = Math.min(100, Math.max(0, Math.round((xpInCurrentLevel / xpNeededForLevel) * 100)));

  // -------------------------------------------------------------------
  // 1. STAGES CAMPAIGN STATE
  // -------------------------------------------------------------------
  const [selectedStage, setSelectedStage] = useState<AdditionStageConfig | null>(null);
  const [stageQuestions, setStageQuestions] = useState<AdditionQuestion[]>([]);
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
  const [stageCategoryFilter, setStageCategoryFilter] = useState<StageCategoryFilter>('all');

  const totalStarsEarned = useMemo(() => {
    return Object.values(stats.stageStars || {}).reduce((acc: number, curr: number) => acc + (curr || 0), 0);
  }, [stats.stageStars]);

  const masteredStagesCount = useMemo(() => {
    return Object.values(stats.stageStars || {}).filter(s => s === 3).length;
  }, [stats.stageStars]);

  const filteredStages = useMemo(() => {
    if (stageCategoryFilter === 'all') return ADDITION_STAGES;
    return ADDITION_STAGES.filter(s => s.category === stageCategoryFilter);
  }, [stageCategoryFilter]);

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
  }, [stageActive, stageTimer]);

  const handleStartStage = (stage: AdditionStageConfig) => {
    if (stage.id > (stats.unlockedStage || 1)) return; // Locked
    if (soundEnabled) soundManager.playClick();
    haptics.selection();

    // Generate questions for stage
    const qs: AdditionQuestion[] = [];
    for (let i = 0; i < stage.questionCount; i++) {
      qs.push(generateStageQuestion(stage.id));
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

  const handleAnswerStage = (selectedVal: number) => {
    if (!stageActive || stageFeedback !== null) return;
    const currentQ = stageQuestions[currentStageQIdx];
    if (!currentQ) return;

    const isCorrect = Math.abs(selectedVal - currentQ.answer) < 0.001;

    if (isCorrect) {
      if (soundEnabled) soundManager.playCompleteChime();
      haptics.success();
      setStageFeedback('correct');
      setStageScore(prev => prev + 1);
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
      clearMistake(currentQ.displayExpression);

      // Auto advance after 500ms
      setTimeout(() => {
        setStageFeedback(null);
        if (currentStageQIdx + 1 < stageQuestions.length) {
          setCurrentStageQIdx(prev => prev + 1);
        } else {
          handleEndStage();
        }
      }, 550);
    } else {
      if (soundEnabled) soundManager.playError();
      haptics.error();
      setStageFeedback('wrong');
      setCurrentStreak(0);
      setShowMentalHint(true);
      recordMistake(currentQ.displayExpression);

      updateStats(s => ({
        ...s,
        totalAnswered: s.totalAnswered + 1
      }));

      // Allow student to see the breakdown and click Next
    }
  };

  const handleNextStageQuestion = () => {
    setStageFeedback(null);
    setShowMentalHint(false);
    if (currentStageQIdx + 1 < stageQuestions.length) {
      setCurrentStageQIdx(prev => prev + 1);
    } else {
      handleEndStage();
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
  const [blitzQuestion, setBlitzQuestion] = useState<AdditionQuestion | null>(null);
  const [blitzSummary, setBlitzSummary] = useState<{
    score: number;
    total: number;
    apm: number;
    isNewHigh: boolean;
  } | null>(null);

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
  }, [blitzActive, blitzTimer]);

  const generateBlitzQ = useCallback((): AdditionQuestion => {
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
    return generateStageQuestion(stagePick);
  }, [blitzDifficulty]);

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
    updateStats(s => ({
      ...s,
      blitzHighScore: Math.max(s.blitzHighScore, blitzScore),
      totalXp: s.totalXp + xpEarned
    }));

    setBlitzSummary({
      score: blitzScore,
      total: blitzTotal,
      apm,
      isNewHigh: isNew
    });
  }, [blitzScore, blitzTotal, soundEnabled, stats.blitzHighScore, updateStats]);

  const handleAnswerBlitz = (selectedVal: number) => {
    if (!blitzActive || !blitzQuestion) return;

    setBlitzTotal(prev => prev + 1);
    const isCorrect = Math.abs(selectedVal - blitzQuestion.answer) < 0.001;

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
      recordMistake(blitzQuestion.displayExpression);
      updateStats(s => ({ ...s, totalAnswered: s.totalAnswered + 1 }));
    }

    // Instantly generate next question for blitz speed
    setBlitzQuestion(generateBlitzQ());
  };

  // -------------------------------------------------------------------
  // 3. ZEN PRACTICE MODE STATE
  // -------------------------------------------------------------------
  const [zenDifficulty, setZenDifficulty] = useState<ZenDifficulty>('all');
  const [zenInputType, setZenInputType] = useState<InputType>('mcq');
  const [zenQuestion, setZenQuestion] = useState<AdditionQuestion>(() => generateStageQuestion(4));
  const [numpadValue, setNumpadValue] = useState<string>('');
  const [zenFeedback, setZenFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [zenShowHint, setZenShowHint] = useState<boolean>(false);

  const generateZenQ = useCallback(() => {
    let stage = 5;
    if (zenDifficulty === '1-digit') stage = 1;
    else if (zenDifficulty === '2-digit-simple') stage = 4;
    else if (zenDifficulty === '2-digit-carry') stage = 5;
    else if (zenDifficulty === 'chain') stage = 8;
    else if (zenDifficulty === 'decimal') stage = 10;
    else stage = Math.floor(Math.random() * 10) + 1;

    setZenQuestion(generateStageQuestion(stage));
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
      clearMistake(zenQuestion.displayExpression);

      setTimeout(() => {
        generateZenQ();
      }, 500);
    } else {
      if (soundEnabled) soundManager.playError();
      haptics.error();
      setZenFeedback('wrong');
      setZenShowHint(true);
      setCurrentStreak(0);
      recordMistake(zenQuestion.displayExpression);
      updateStats(s => ({ ...s, totalAnswered: s.totalAnswered + 1 }));
    }
  };

  const handleNumpadPress = (digit: string) => {
    if (soundEnabled) soundManager.playClick();
    haptics.selection();
    if (digit === 'del') {
      setNumpadValue(prev => prev.slice(0, -1));
    } else if (digit === 'submit') {
      const num = parseFloat(numpadValue);
      if (!isNaN(num)) {
        handleAnswerZen(num);
      }
    } else {
      if (numpadValue.length < 7) {
        setNumpadValue(prev => prev + digit);
      }
    }
  };

  // Keyboard support for Zen NumPad
  useEffect(() => {
    if (activeMode !== 'zen') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        if (zenInputType === 'numpad') {
          handleNumpadPress(e.key);
        }
      } else if (e.key === '.' && zenQuestion.isDecimal) {
        if (zenInputType === 'numpad') {
          handleNumpadPress('.');
        }
      } else if (e.key === 'Backspace') {
        if (zenInputType === 'numpad') {
          handleNumpadPress('del');
        }
      } else if (e.key === 'Enter') {
        if (zenInputType === 'numpad') {
          handleNumpadPress('submit');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeMode, zenInputType, zenQuestion, numpadValue]);

  // -------------------------------------------------------------------
  // 4. MISTAKE BANK PRACTICE
  // -------------------------------------------------------------------
  const weakPairList = useMemo(() => Object.keys(weakPairs), [weakPairs]);

  const handlePracticeMistakes = () => {
    if (weakPairList.length === 0) return;
    setActiveMode('zen');
    setZenDifficulty('all');
    // Generate a problem
    generateZenQ();
  };

  return (
    <div className="w-full space-y-6 animate-fade-in pb-12">
      {/* =========================================================
          TOP GAMIFIED HERO & XP PROGRESS BAR
          ========================================================= */}
      <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 text-white border border-indigo-500/20 shadow-xl relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute -right-20 -top-20 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Title & Player Rank */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 shadow-xs flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                <span>Addition Mastery (Gamified)</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/10 text-indigo-200 border border-white/10">
                Basic to Advanced 10 Stages
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Vedic Speed Maths
              </span>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                <span>{playerRank.title}</span>
                <span className="text-xs px-2.5 py-0.5 rounded-lg bg-indigo-500/30 text-indigo-300 font-mono font-bold border border-indigo-400/30">
                  {playerRank.badge}
                </span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              {playerRank.hindiTitle} • SSC CGL, CHSL, CPO, MTS & Banking DI Speed Booster
            </p>
          </div>

          {/* Gamified HUD: XP, Streak & Controls */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Streak Meter */}
            <div className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl border transition-all ${
              currentStreak >= 5
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-lg shadow-amber-500/10 animate-pulse'
                : 'bg-white/5 border-white/10 text-slate-300'
            }`}>
              <Flame className={`w-5 h-5 ${currentStreak >= 3 ? 'text-amber-400 fill-amber-400' : 'text-slate-400'}`} />
              <div>
                <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Streak</div>
                <div className="text-sm font-black text-white flex items-center gap-1">
                  <span>{currentStreak}</span>
                  {comboMultiplier > 1 && (
                    <span className="text-[10px] text-amber-400 font-mono font-black">
                      ({comboMultiplier}x XP)
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Total XP */}
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/5 border border-white/10 text-slate-300">
              <Trophy className="w-5 h-5 text-yellow-400" />
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
              Level {playerRank.level} Progress: <strong className="text-amber-300">{xpInCurrentLevel} XP</strong>
            </span>
            <span className="text-slate-400 font-mono">
              Next Rank: {playerRank.nextThreshold} XP ({levelProgressPercent}%)
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-indigo-500 transition-all duration-500"
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
              ? 'bg-indigo-600 text-white shadow-xs font-black ring-1 ring-indigo-400/40'
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
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
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
                  <Timer className={`w-4 h-4 ${stageTimer <= 5 ? 'text-red-500 animate-pulse' : 'text-indigo-500'}`} />
                  <span className={stageTimer <= 5 ? 'text-red-500 font-black' : ''}>{stageTimer}s</span>
                </div>
              </div>

              {/* Question Expression Display */}
              {stageQuestions[currentStageQIdx] && (
                <div className="py-8 sm:py-12 px-4 rounded-3xl bg-gradient-to-b from-slate-50 to-white dark:from-white/[0.02] dark:to-transparent border border-slate-200/60 dark:border-white/5 text-center space-y-4">
                  <div className="text-xs uppercase font-bold tracking-widest text-indigo-600 dark:text-indigo-400">
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
                            : 'bg-white dark:bg-[#121422] text-slate-900 dark:text-white border-slate-200 dark:border-white/10 hover:border-indigo-500 hover:scale-[1.02] active:scale-[0.98]'
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
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 text-white border border-indigo-500/30 shadow-2xl text-center space-y-6 max-w-xl mx-auto animate-fade-in">
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
                    const st = ADDITION_STAGES.find(s => s.id === stageSummary.stageId);
                    if (st) handleStartStage(st);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer"
                >
                  Retry Stage
                </button>
                <button
                  type="button"
                  onClick={() => setStageSummary(null)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-black text-xs sm:text-sm transition-all cursor-pointer shadow-lg"
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
                      <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xs">
                        SSC & Bank Calculation Quest
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                        10 Progressive Stages (Basic → Advanced)
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                      Addition Mastery Progression Campaign
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

                    <div className="px-3.5 py-2 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-center min-w-[90px]">
                      <div className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400">Mastered (3★)</div>
                      <div className="text-base sm:text-lg font-black text-indigo-600 dark:text-indigo-300 font-mono">
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
                    <span className="font-mono font-black text-indigo-600 dark:text-indigo-400">
                      {Math.round((totalStarsEarned / 30) * 100)}% ({totalStarsEarned}/30 Stars Earned)
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden p-0.5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-amber-400 transition-all duration-700 shadow-sm"
                      style={{ width: `${Math.max(4, Math.round((totalStarsEarned / 30) * 100))}%` }}
                    />
                  </div>
                </div>

                {/* Category Filter Pills */}
                <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex items-center gap-2 overflow-x-auto no-scrollbar">
                  {STAGE_CATEGORIES.map(cat => {
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
                            ? 'bg-indigo-600 text-white shadow-xs font-black ring-1 ring-indigo-400/40'
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
                          ? 'bg-white dark:bg-[#0E101B] border-indigo-500/70 dark:border-indigo-400/60 ring-2 ring-indigo-500/40 shadow-lg shadow-indigo-500/10 dark:shadow-[0_0_30px_rgba(99,102,241,0.22)] hover:-translate-y-1'
                          : isMastered
                          ? 'bg-white dark:bg-[#0E101B] border-amber-400/40 dark:border-amber-400/25 shadow-xs hover:border-amber-400 hover:shadow-md hover:-translate-y-1'
                          : 'bg-white dark:bg-[#0E101B] border-slate-200/80 dark:border-white/10 shadow-xs hover:border-indigo-500/70 hover:shadow-md hover:-translate-y-1'
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
                                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white animate-pulse shadow-xs">
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
                            <h4 className="font-black text-slate-900 dark:text-white text-base sm:text-lg leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                              {cleanTitle}
                            </h4>
                            <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 pt-0.5">
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
                              <Timer className="w-3.5 h-3.5 text-indigo-500" />
                              <span className="font-bold text-slate-700 dark:text-slate-300">{stage.targetTimeSec}s</span>
                              <span className="text-slate-300 dark:text-slate-600">•</span>
                              <span>{stage.questionCount} Questions</span>
                            </div>

                            <div className="font-mono text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                              <span className="text-slate-400 text-[11px]">Sample:</span>
                              <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/10 text-indigo-600 dark:text-indigo-300 font-black">
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
                                  : 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md shadow-indigo-500/25 active:scale-[0.99]'
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
                  60-Second Speed Blitz (टाइम अटैक)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Race against the clock! Solve as many mental additions as possible in 60 seconds. Push your Additions Per Minute (APM) to exam topper levels.
                </p>
              </div>

              {/* Difficulty selector */}
              <div className="space-y-2 max-w-2xl mx-auto">
                <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">Select Difficulty</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {(['easy', 'medium', 'hard', 'mixed'] as const).map(d => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setBlitzDifficulty(d)}
                      className={`p-3 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer border ${
                        blitzDifficulty === d
                          ? 'bg-amber-500 text-slate-950 font-black shadow-md border-amber-400 ring-2 ring-amber-400/30'
                          : 'bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/5 hover:border-amber-500/30'
                      }`}
                    >
                      {d === 'easy' ? 'Easy (1-2 Digits)' : d === 'medium' ? 'Medium (Split Carry)' : d === 'hard' ? 'Hard (Chains & DI)' : 'Mixed Rush'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Personal High Score */}
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 max-w-md mx-auto">
                <div className="text-[11px] uppercase font-bold text-amber-900 dark:text-amber-300">Personal Best Record</div>
                <div className="text-3xl sm:text-4xl font-black text-amber-500 font-mono mt-1">{stats.blitzHighScore} Solved</div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={handleStartBlitz}
                  className="px-10 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-base sm:text-lg transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95"
                >
                  Start 60s Blitz Rush 🔥
                </button>
              </div>
            </div>
          )}

          {/* Active Blitz Play Board */}
          {blitzActive && blitzQuestion && (
            <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#0E101B] border border-amber-500/30 shadow-xl space-y-6 w-full">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-3">
                  <div className="text-2xl font-black text-amber-500 font-mono">
                    Score: {blitzScore}
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold capitalize">
                    {blitzDifficulty}
                  </span>
                </div>

                <div className="flex items-center gap-2 px-4 py-1.5 rounded-2xl bg-red-500/10 text-red-500 font-mono text-base font-black border border-red-500/20">
                  <Clock className="w-4 h-4 animate-spin" />
                  <span>{blitzTimer}s</span>
                </div>
              </div>

              {/* Big Math Display */}
              <div className="py-12 sm:py-16 text-center rounded-3xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/5 w-full">
                <div className="text-4xl sm:text-6xl md:text-7xl font-black font-mono text-slate-900 dark:text-white">
                  {blitzQuestion.displayExpression}
                </div>
              </div>

              {/* Options */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full">
                {blitzQuestion.options.map((opt, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleAnswerBlitz(opt)}
                    className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#121422] text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 hover:border-amber-500 hover:bg-amber-500/5 font-mono text-2xl sm:text-3xl font-black transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Blitz Summary Modal */}
          {blitzSummary && (
            <div className="p-8 text-center rounded-3xl bg-gradient-to-br from-amber-950 via-slate-900 to-slate-950 text-white border border-amber-500/40 shadow-2xl space-y-6 max-w-md mx-auto animate-fade-in">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-500/20 flex items-center justify-center border border-amber-500/40">
                <Flame className="w-8 h-8 text-amber-400 fill-amber-400" />
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-black text-white">Time&apos;s Up!</h3>
                <p className="text-xs text-slate-300">60-Second Addition Rush Complete</p>
                {blitzSummary.isNewHigh && (
                  <div className="mt-2 text-xs font-black px-3 py-1 rounded-full bg-amber-400 text-slate-950 inline-block uppercase tracking-wider animate-bounce">
                    🎉 New Personal Best Record!
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Total Solved</div>
                  <div className="text-2xl font-black text-amber-400 font-mono">{blitzSummary.score}</div>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-[10px] uppercase font-bold text-slate-400">APM Speed</div>
                  <div className="text-2xl font-black text-emerald-400 font-mono">{blitzSummary.apm} / min</div>
                </div>
              </div>

              <div className="flex gap-3 justify-center">
                <button
                  type="button"
                  onClick={handleStartBlitz}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs sm:text-sm cursor-pointer shadow-lg hover:scale-105 active:scale-95"
                >
                  Play Again 🔥
                </button>
                <button
                  type="button"
                  onClick={() => setBlitzSummary(null)}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm cursor-pointer"
                >
                  Back
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================
          MODE 3: ZEN UNLIMITED PRACTICE
          ========================================================= */}
      {activeMode === 'zen' && (
        <div className="space-y-6 animate-fade-in">
          {/* Controls Bar: Difficulty Filter + Input Switcher */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Filter by Category */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {[
                { id: 'all', label: 'All Mixed' },
                { id: '1-digit', label: '1-Digit Reflex' },
                { id: '2-digit-simple', label: '2-Digit Simple' },
                { id: '2-digit-carry', label: '2-Digit Vedic Split' },
                { id: 'chain', label: '3-Numbers Chain' },
                { id: 'decimal', label: 'Decimals' }
              ].map(f => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => {
                    setZenDifficulty(f.id as ZenDifficulty);
                    setTimeout(generateZenQ, 50);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    zenDifficulty === f.id
                      ? 'bg-emerald-600 text-white font-black shadow-xs'
                      : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Input Mode Toggle: MCQ vs NumPad */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-white/5 self-start shrink-0">
              <button
                type="button"
                onClick={() => setZenInputType('mcq')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  zenInputType === 'mcq'
                    ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                4 Options (MCQ)
              </button>
              <button
                type="button"
                onClick={() => setZenInputType('numpad')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  zenInputType === 'numpad'
                    ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Smart NumPad ⌨️
              </button>
            </div>
          </div>

          {/* Active Question Box */}
          <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-lg text-center space-y-6 w-full">
            <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-100 dark:border-white/5">
              <span className="font-bold uppercase tracking-wider text-slate-500">Zen Flow Practice</span>
              <button
                type="button"
                onClick={generateZenQ}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 text-emerald-600 dark:text-emerald-400 font-bold hover:bg-emerald-500/10 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Skip / Next</span>
              </button>
            </div>

            <div className="py-10 sm:py-16 rounded-3xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/5 w-full">
              <div className="text-4xl sm:text-6xl md:text-7xl font-black font-mono text-slate-900 dark:text-white tracking-tight">
                {zenQuestion.displayExpression}
              </div>
            </div>

            {/* Hint Box (if triggered) */}
            {zenShowHint && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-300 text-xs sm:text-sm text-left animate-fade-in flex items-start gap-3 max-w-2xl mx-auto">
                <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong>Mental Breakdown: </strong>
                  <span>{zenQuestion.mentalBreakdown}</span>
                </div>
              </div>
            )}

            {/* Input Style A: 4 Big Options */}
            {zenInputType === 'mcq' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full">
                {zenQuestion.options.map((opt, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleAnswerZen(opt)}
                    className={`p-5 sm:p-6 rounded-2xl font-mono text-2xl sm:text-3xl font-black transition-all cursor-pointer border ${
                      zenFeedback === 'correct' && opt === zenQuestion.answer
                        ? 'bg-emerald-600 text-white border-emerald-500 scale-105 shadow-lg shadow-emerald-500/20'
                        : zenFeedback === 'wrong' && opt !== zenQuestion.answer
                        ? 'bg-red-500/10 text-red-500 border-red-500/30'
                        : 'bg-white dark:bg-[#121422] text-slate-900 dark:text-white border-slate-200 dark:border-white/10 hover:border-emerald-500 hover:scale-[1.02] active:scale-[0.98]'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {/* Input Style B: Smart NumPad */}
            {zenInputType === 'numpad' && (
              <div className="space-y-4 max-w-md mx-auto w-full">
                {/* Typed Value Display */}
                <div className="p-4 rounded-2xl bg-slate-100 dark:bg-white/5 border-2 border-slate-200 dark:border-white/10 font-mono text-3xl font-black text-slate-900 dark:text-white min-h-[64px] flex items-center justify-center shadow-inner">
                  {numpadValue || <span className="text-slate-400 font-normal text-sm">Type answer on numpad or keyboard...</span>}
                </div>

                {/* 0-9 NumPad Grid */}
                <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'del'].map(btn => (
                    <button
                      key={btn}
                      type="button"
                      onClick={() => handleNumpadPress(btn)}
                      className={`p-4 sm:p-5 rounded-2xl font-mono text-xl sm:text-2xl font-black transition-all cursor-pointer border shadow-xs ${
                        btn === 'del'
                          ? 'bg-red-500/10 text-red-600 border-red-500/20 hover:bg-red-500/20 active:scale-95'
                          : 'bg-white dark:bg-[#121422] text-slate-900 dark:text-white border-slate-200 dark:border-white/10 hover:border-emerald-500 hover:bg-emerald-500/5 active:scale-95'
                      }`}
                    >
                      {btn === 'del' ? '⌫' : btn}
                    </button>
                  ))}
                </div>

                {/* Submit button */}
                <button
                  type="button"
                  onClick={() => handleNumpadPress('submit')}
                  disabled={!numpadValue}
                  className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-black text-base transition-all cursor-pointer shadow-lg hover:scale-[1.01] active:scale-[0.99]"
                >
                  Submit Answer ↵
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================
          MODE 4: VEDIC & MIND TRICKS (LESSONS HUB)
          ========================================================= */}
      {activeMode === 'tricks' && (
        <div className="space-y-6 animate-fade-in w-full">
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Vedic & Speed Mental Addition Techniques
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Exam toppers never calculate on rough paper. Master these 5 mental strategies to solve 2-digit & multi-digit sums in under 2 seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 w-full">
            {ADDITION_TECHNIQUES.map(tech => (
              <div
                key={tech.id}
                className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-5 hover:border-purple-500/50 transition-all w-full"
              >
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-white/5 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 font-mono">
                        {tech.badge}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 text-slate-500 font-mono">
                        {tech.category}
                      </span>
                    </div>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                      {tech.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-purple-600 dark:text-purple-400 font-medium">
                      {tech.hindiTitle}
                    </p>
                  </div>

                  <div className="p-3 sm:px-4 sm:py-2.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 font-mono text-xs sm:text-sm font-bold text-purple-700 dark:text-purple-300 self-start sm:self-auto shrink-0">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block sm:inline mr-2">Formula:</span>
                    <span>{tech.formula}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {tech.summary}
                </p>

                {/* 2-column internal split for spacious presentation */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-1">
                  {/* Left: How it works steps */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/50 dark:border-white/5 space-y-2.5">
                    <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono">
                      How It Works (कार्यविधि):
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      {tech.steps.map((st, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <span className="leading-relaxed">{st}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right: Live Example box */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/25 space-y-3 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider font-mono">
                          Live Exam Example
                        </span>
                        <span className="text-base sm:text-lg font-mono font-black text-slate-900 dark:text-white">
                          {tech.example.problem}
                        </span>
                      </div>
                      <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed bg-white/50 dark:bg-black/30 p-3 rounded-xl border border-amber-500/15">
                        💡 <em>&quot;{tech.example.thoughtProcess}&quot;</em>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-amber-500/20 text-xs sm:text-sm font-bold">
                      <span className="text-slate-500">Instant Final Sum:</span>
                      <span className="text-base sm:text-lg font-mono font-black text-emerald-600 dark:text-emerald-400">
                        = {tech.example.answer}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================
          MODE 5: STATS & MISTAKE BANK
          ========================================================= */}
      {activeMode === 'stats' && (
        <div className="space-y-6 animate-fade-in">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs">
              <div className="flex items-center gap-2 text-indigo-500 text-xs font-bold mb-1">
                <Target className="w-4 h-4" />
                <span>Total Solved</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
                {stats.totalAnswered}
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs">
              <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Accuracy</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
                {stats.totalAnswered > 0
                  ? Math.round((stats.totalCorrect / stats.totalAnswered) * 100)
                  : 0}%
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs">
              <div className="flex items-center gap-2 text-amber-500 text-xs font-bold mb-1">
                <Flame className="w-4 h-4" />
                <span>Best Streak</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
                {stats.bestStreak} 🔥
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs">
              <div className="flex items-center gap-2 text-purple-500 text-xs font-bold mb-1">
                <Zap className="w-4 h-4" />
                <span>Blitz Record</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
                {stats.blitzHighScore} APM
              </div>
            </div>
          </div>

          {/* Mistake Bank (Weak Pairs Tracker) */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <span>Mistake Bank / Weak Spots</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold">
                    {weakPairList.length} Items
                  </span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Every addition problem you get wrong is automatically saved here so you can master your blind spots.
                </p>
              </div>

              {weakPairList.length > 0 && (
                <button
                  type="button"
                  onClick={handlePracticeMistakes}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs transition-all cursor-pointer shadow-xs"
                >
                  Practice Mistakes →
                </button>
              )}
            </div>

            {weakPairList.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-dashed border-slate-200 dark:border-white/10 space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Clean Slate! No recorded mistakes yet.
                </p>
                <p className="text-xs text-slate-400">
                  Start practicing in Stage Quest or Speed Blitz to identify weak pairs.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {weakPairList.map(pair => (
                  <div
                    key={pair}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-mono font-black text-sm text-slate-900 dark:text-white">
                        {pair}
                      </div>
                      <div className="text-[10px] text-rose-500 font-medium">
                        Mistakes: {weakPairs[pair]}x
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => clearMistake(pair)}
                      title="Mark as Mastered"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-500 transition-all cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                    </button>
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

