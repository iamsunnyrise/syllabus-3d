import React, { useState, useMemo, useEffect } from 'react';
import { useSyllabus } from '../../context/SyllabusContext';
import { useAuth } from '../../context/AuthContext';
import {
  Target,
  CalendarCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Layers,
  ArrowUpRight,
  Globe,
  Sparkles,
  ExternalLink,
  Flame,
  TrendingUp,
  MoreVertical,
  BookOpen,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Trophy,
  Zap,
  Calculator,
  BrainCircuit,
  BookMarked,
  ShieldCheck,
  Award,
  Footprints,
  Headphones
} from 'lucide-react';
import { AppView } from '../layout/Sidebar';
import { Topic } from '../../types/syllabus';
import { TimerFontFamily } from '../../types/timer';
import { ExamCountdown3D } from '../3d/ExamCountdown3D';
import { Top3TargetsWidget } from '../dashboard/Top3TargetsWidget';
import { StudyDeskHeroIllustration } from '../dashboard/StudyDeskHeroIllustration';
import { DailyInspirationBanner } from '../dashboard/DailyInspirationBanner';
import { AppFooter } from '../common/AppFooter';
import { SectionBadgeIcon } from '../common/SectionBadgeIcon';
import { soundManager } from '../../utils/soundEffects';
import { useRoutine, format12Hour } from '../../context/RoutineContext';

const SUBJECT_ICON_MAP: Record<string, React.ElementType> = {
  BookOpen,
  Calculator,
  BrainCircuit,
  Globe,
  TrendingUp,
  BookMarked,
  ShieldCheck,
  Sparkles,
  Award,
  Zap,
  Flame,
  Target,
  Layers,
};

const renderSubjectIcon = (iconStr: string | undefined, color?: string) => {
  if (!iconStr) {
    return <BookOpen className="w-3.5 h-3.5 shrink-0" style={{ color: color || '#2563EB' }} />;
  }
  const IconComp = SUBJECT_ICON_MAP[iconStr];
  if (IconComp) {
    return <IconComp className="w-3.5 h-3.5 shrink-0" style={{ color: color || '#2563EB' }} />;
  }
  if (iconStr.length <= 4 && !/^[a-zA-Z]+$/.test(iconStr)) {
    return <span className="text-xs leading-none select-none">{iconStr}</span>;
  }
  return <BookOpen className="w-3.5 h-3.5 shrink-0" style={{ color: color || '#2563EB' }} />;
};

interface OverviewViewProps {
  onNavigate: (view: AppView) => void;
  onNavigateToSubject?: (subjectId: string) => void;
  onOpenTopicDrawer: (topic: Topic, subName: string, chName: string) => void;
  onOpenRevisionSession: () => void;
  onOpenAddTopic?: () => void;
  onOpenFocus?: () => void;
  onOpenWalkAndRevise?: () => void;
  onOpenBacklogRescue?: () => void;
}

const toNaturalCase = (text: string): string => {
  if (!text) return '';
  if (text === text.toUpperCase() && text.length > 2) {
    return text
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  return text;
};

export const OverviewView: React.FC<OverviewViewProps> = ({
  onNavigate,
  onNavigateToSubject,
  onOpenTopicDrawer,
  onOpenRevisionSession: _onOpenRevisionSession,
  onOpenAddTopic,
  onOpenFocus,
  onOpenWalkAndRevise,
  onOpenBacklogRescue,
}) => {
  const {
    overallStats,
    subjectStats,
    profile,
    currentExam,
    plannerTasks,
    platforms
  } = useSyllabus();
  const { user } = useAuth();
  const { activeSlot, nextSlot } = useRoutine();

  const todayPlannerTasks = plannerTasks.filter(t => t.status === 'today' || t.status === 'in_progress');
  const completedTodayTasks = plannerTasks.filter(t => t.status === 'completed');
  const totalTasksToday = todayPlannerTasks.length + completedTodayTasks.length;
  const todayProgressPercent = totalTasksToday > 0
    ? Math.round((completedTodayTasks.length / totalTasksToday) * 100)
    : 0;

  // Subject Mastery Breakdown
  const subjectProgressList = useMemo(() => {
    if (!currentExam?.subjects || currentExam.subjects.length === 0) return [];
    return currentExam.subjects.map(subject => {
      const stat = subjectStats.find(s => s.subjectId === subject.id) || {
        completedTopics: 0,
        totalTopics: 0,
        percentage: 0,
        weakCount: 0,
        lastStudied: null
      };
      let totalTopics = stat.totalTopics;
      let completedTopics = stat.completedTopics;
      if (totalTopics === 0 && subject.chapters) {
        for (const ch of subject.chapters) {
          totalTopics += ch.topics?.length || 0;
          completedTopics += ch.topics?.filter(t => t.status === 'completed').length || 0;
        }
      }
      const pct = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
      return {
        id: subject.id,
        name: subject.name,
        icon: subject.icon,
        color: subject.color,
        completedTopics,
        totalTopics,
        percentage: pct,
        weakCount: stat.weakCount
      };
    });
  }, [currentExam?.subjects, subjectStats]);

  // Smart Next Recommended Target HUD
  const nextRecommendedTopic = useMemo(() => {
    if (!currentExam?.subjects) return null;
    let weakOrDue: { topic: Topic; subjectName: string; chapterName: string; badge: string; badgeColor: string } | null = null;
    let inProgress: { topic: Topic; subjectName: string; chapterName: string; badge: string; badgeColor: string } | null = null;
    let notStarted: { topic: Topic; subjectName: string; chapterName: string; badge: string; badgeColor: string } | null = null;

    for (const subject of currentExam.subjects) {
      for (const chapter of subject.chapters || []) {
        for (const topic of chapter.topics || []) {
          if (!weakOrDue && (topic.status === 'weak' || topic.isWeak)) {
            weakOrDue = {
              topic,
              subjectName: subject.name,
              chapterName: chapter.name,
              badge: 'Weak Area',
              badgeColor: 'text-rose-600 bg-rose-50 border-rose-200 dark:text-rose-400 dark:bg-rose-950/40 dark:border-rose-900/50'
            };
          } else if (!weakOrDue && topic.status === 'revision_due') {
            weakOrDue = {
              topic,
              subjectName: subject.name,
              chapterName: chapter.name,
              badge: 'Revision Due',
              badgeColor: 'text-amber-600 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-950/40 dark:border-amber-900/50'
            };
          } else if (!inProgress && topic.status === 'in_progress') {
            inProgress = {
              topic,
              subjectName: subject.name,
              chapterName: chapter.name,
              badge: 'In Progress',
              badgeColor: 'text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-950/40 dark:border-blue-900/50'
            };
          } else if (!notStarted && topic.status === 'not_started') {
            notStarted = {
              topic,
              subjectName: subject.name,
              chapterName: chapter.name,
              badge: 'Up Next',
              badgeColor: 'text-purple-600 bg-purple-50 border-purple-200 dark:text-purple-400 dark:bg-purple-950/40 dark:border-purple-900/50'
            };
          }
        }
      }
    }

    return weakOrDue || inProgress || notStarted || null;
  }, [currentExam?.subjects]);

  // Circular Progress calculations
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallStats.completionPercentage / 100) * circumference;

  const examName = currentExam?.name || 'SSC CGL 2026';
  const examYear = currentExam?.targetYear || 2026;
  const examYearStr = String(examYear);
  const baseExamName = examName.includes(examYearStr)
    ? examName.replace(examYearStr, '').trim()
    : examName;

  // Pomodoro Focus Timer State
  const [pomodoroSeconds, setPomodoroSeconds] = useState(25 * 60);
  const [isPomodoroRunning, setIsPomodoroRunning] = useState(false);

  // Timer Typography Font Selection
  const [timerFont, setTimerFont] = useState<TimerFontFamily>(() => {
    return (localStorage.getItem('syllabus3d_timer_font') as TimerFontFamily) || 'jetbrains';
  });

  useEffect(() => {
    const handleFontSync = () => {
      const saved = localStorage.getItem('syllabus3d_timer_font') as TimerFontFamily;
      if (saved && (saved === 'jetbrains' || saved === 'roboto-mono' || saved === 'orbitron')) {
        setTimerFont(saved);
      }
    };
    window.addEventListener('storage', handleFontSync);
    window.addEventListener('syllabus3d_timer_font_change', handleFontSync);
    return () => {
      window.removeEventListener('storage', handleFontSync);
      window.removeEventListener('syllabus3d_timer_font_change', handleFontSync);
    };
  }, []);

  useEffect(() => {
    let interval: any = null;
    if (isPomodoroRunning && pomodoroSeconds > 0) {
      interval = setInterval(() => {
        setPomodoroSeconds(prev => prev - 1);
      }, 1000);
    } else if (pomodoroSeconds === 0 && isPomodoroRunning) {
      setIsPomodoroRunning(false);
      soundManager.playCompleteChime();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPomodoroRunning, pomodoroSeconds]);

  const handlePomodoroStart = () => {
    soundManager.playClick();
    setIsPomodoroRunning(true);
  };

  const handlePomodoroPause = () => {
    soundManager.playClick();
    setIsPomodoroRunning(false);
  };

  const handlePomodoroReset = () => {
    soundManager.playClick();
    setIsPomodoroRunning(false);
    setPomodoroSeconds(25 * 60);
  };

  const formatPomodoroTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };


  const totalStudyHours = (overallStats.completedCount * 1.5) || 0.0;

  return (
    <div className="space-y-4 sm:space-y-5 pb-24 sm:pb-12">
      
      {/* 🖨️ PRINT-ONLY DESK REVISION SUMMARY HEADER */}
      <div className="hidden print:block mb-6 pb-4 border-b-2 border-black">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-gray-700 block">
              STUDY DESK REVISION CHEATSHEET
            </span>
            <h1 className="text-2xl font-black uppercase tracking-tight text-black mt-1">
              🎯 {examName.toUpperCase()} • DESK MISSION CONTROL
            </h1>
            <div className="flex items-center gap-3 text-xs font-mono text-gray-700 mt-2">
              <span>Aspirant: <strong>{profile.name || user?.name || 'Scholar'}</strong></span>
              <span>• Overall Progress: <strong>{overallStats.completionPercentage}% Mastered ({overallStats.completedCount}/{overallStats.totalTopics} Topics)</strong></span>
            </div>
          </div>
          <div className="text-right text-xs font-mono">
            <div className="font-bold text-black uppercase">Study Desk Dashboard</div>
            <div className="text-gray-600 mt-1">Printed: {new Date().toLocaleDateString()}</div>
            <div className="text-[10px] text-gray-500 mt-0.5">Syllabus 3D Precision Study System</div>
          </div>
        </div>
      </div>

      {/* 1. TOP HEADER ROW: Dashboard Title + Add Task Button */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-3">
          <SectionBadgeIcon section="overview" size="md" />
          <h1 className="text-2xl sm:text-3xl font-bold font-grotesk text-slate-900 dark:text-white tracking-tight">
            Dashboard
          </h1>
        </div>

        {onOpenAddTopic && (
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onOpenAddTopic();
            }}
            className="h-10 sm:h-10.5 px-4 sm:px-5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-indigo-500/25 active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add Task</span>
          </button>
        )}
      </div>

      {/* 2. MOTIVATIONAL QUOTE BANNER (Interactive Daily Inspiration Hub) */}
      <DailyInspirationBanner onOpenFocus={onOpenFocus} />

      {/* 3. 4 VIBRANT METRIC KPI CARDS (Purple, Hot Pink, Cyan, Mint Green) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        {/* Card 1: Purple Gradient - Total Topics */}
        <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-6 bg-gradient-to-br from-[#5346E8] to-[#3B2FB3] text-white shadow-md shadow-indigo-500/15 flex flex-col justify-between min-h-[120px] transition-transform hover:scale-[1.01]">
          <div className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight">
            {overallStats.totalTopics || 0}
          </div>
          <div className="text-xs sm:text-sm font-bold text-white/90">
            Total Topics
          </div>
        </div>

        {/* Card 2: Hot Pink/Coral Gradient - Completed */}
        <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-6 bg-gradient-to-br from-[#FF4E8D] to-[#E92A67] text-white shadow-md shadow-pink-500/15 flex flex-col justify-between min-h-[120px] transition-transform hover:scale-[1.01]">
          <div className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight">
            {overallStats.completedCount || 0}
          </div>
          <div className="text-xs sm:text-sm font-bold text-white/90">
            Completed
          </div>
        </div>

        {/* Card 3: Sky Blue/Cyan Gradient - Study Hours */}
        <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-6 bg-gradient-to-br from-[#00D2FF] to-[#0099FF] text-white shadow-md shadow-cyan-500/15 flex flex-col justify-between min-h-[120px] transition-transform hover:scale-[1.01]">
          <div className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight">
            {totalStudyHours > 0 ? totalStudyHours.toFixed(1) : '0.0'}
          </div>
          <div className="text-xs sm:text-sm font-bold text-white/90">
            Study Hours
          </div>
        </div>

        {/* Card 4: Neon Mint/Emerald Gradient - Completion Rate */}
        <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-6 bg-gradient-to-br from-[#00F2A9] to-[#00BA74] text-white shadow-md shadow-emerald-500/15 flex flex-col justify-between min-h-[120px] transition-transform hover:scale-[1.01]">
          <div className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight">
            {overallStats.completionPercentage || 0}%
          </div>
          <div className="text-xs sm:text-sm font-bold text-white/90">
            Completion Rate
          </div>
        </div>

      </div>

      {/* 4. GOLDEN AMBER DAY STREAK BANNER (Matching Mockup) */}
      <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-gradient-to-r from-[#FFC72C] via-[#FFB703] to-[#FB8500] text-slate-950 flex items-center justify-between shadow-md shadow-amber-500/15">
        <div className="flex items-center gap-3.5">
          <span className="text-3xl sm:text-4xl select-none leading-none">🔥</span>
          <div>
            <div className="text-2xl sm:text-3xl font-black font-mono leading-none">
              {profile.currentStreak || 7}
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-900/80 mt-1">
              Day Streak
            </div>
          </div>
        </div>
        <div className="hidden sm:block text-xs font-bold text-slate-900/80">
          Keep your momentum going!
        </div>
      </div>



      {/* 6. POMODORO FOCUS TIMER (Matching Mockup) */}
      <div className="rounded-3xl p-5 sm:p-6 bg-white dark:bg-[#121424] border border-slate-200/90 dark:border-white/10 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-bold font-grotesk text-slate-900 dark:text-white">
            Pomodoro Timer
          </h3>
          {onOpenFocus && (
            <button
              type="button"
              onClick={onOpenFocus}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              Launch Focus Chamber →
            </button>
          )}
        </div>

        <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-10 bg-gradient-to-r from-[#4E54C8] to-[#8F94FB] text-white text-center shadow-lg shadow-indigo-500/20">
          <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-indigo-100">
            Focus Session
          </div>

          <div className={`text-5xl sm:text-7xl font-black ${
            timerFont === 'orbitron'
              ? 'font-orbitron tracking-wider'
              : timerFont === 'roboto-mono'
              ? 'font-roboto-mono tracking-tight tabular-nums'
              : 'font-mono tracking-tight tabular-nums'
          } my-4 sm:my-6 drop-shadow-md`}>
            {formatPomodoroTime(pomodoroSeconds)}
          </div>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            {!isPomodoroRunning ? (
              <button
                type="button"
                onClick={handlePomodoroStart}
                className="h-10 sm:h-11 px-6 rounded-xl bg-white text-indigo-700 hover:bg-indigo-50 font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-indigo-700" />
                <span>Start</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePomodoroPause}
                className="h-10 sm:h-11 px-6 rounded-xl bg-white text-indigo-700 hover:bg-indigo-50 font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Pause className="w-3.5 h-3.5 fill-indigo-700" />
                <span>Pause</span>
              </button>
            )}

            <button
              type="button"
              onClick={handlePomodoroReset}
              className="h-10 sm:h-11 px-6 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs sm:text-sm border border-white/30 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Clean Target Countdown Flip Clock */}
      <ExamCountdown3D />

      {/* 4. TOP 3 NON-NEGOTIABLES & NIGHT REFLECTION WIDGET */}
      <Top3TargetsWidget />

      {/* 5. MASTERY ENGINE + DAILY PLANNER — Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
        
        {/* CARD 1: Syllabus Mastery Engine */}
        <div className="md:col-span-7 p-4 sm:p-6 rounded-2xl bg-white dark:bg-[#151622] border border-slate-200/80 dark:border-white/[0.08] shadow-subtle-depth flex flex-col justify-between relative overflow-hidden space-y-4">
          
          {/* Header Row */}
          <div className="relative z-10 flex items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-700/60">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-[#2563EB] to-indigo-600 dark:from-[#7AA2F7] dark:to-[#4D76D6] text-white flex items-center justify-center font-bold shadow-md shadow-[#2563EB]/20 dark:shadow-[#7AA2F7]/25 shrink-0">
                <Target className="w-4 sm:w-5 h-4 sm:h-5 stroke-[2.4]" />
              </div>
              <div>
                <h3 className="text-[15px] sm:text-base font-bold font-grotesk text-slate-900 dark:text-[#F5F5F7] tracking-tight">
                  Syllabus Mastery
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-300 font-medium font-mono">
                  {baseExamName} • {examYear}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-xl bg-slate-50 dark:bg-[#1B243B] border border-slate-200/70 dark:border-slate-700/70 shadow-2xs shrink-0">
                <span className="w-2 h-2 rounded-full bg-[#2563EB] dark:bg-[#7AA2F7] animate-pulse" />
                <span className="text-xs font-black text-slate-900 dark:text-blue-300 font-mono">
                  {profile.levelTitle || `Level ${profile.level}`}
                </span>
              </div>
              <button
                onClick={() => {
                  soundManager.playClick();
                  onNavigate('syllabus');
                }}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-50 dark:bg-[#1B243B] border border-slate-200/70 dark:border-slate-700/70 text-slate-700 dark:text-slate-200 hover:text-[#2563EB] dark:hover:text-[#7AA2F7] hover:border-[#2563EB]/40 dark:hover:border-[#7AA2F7]/40 text-xs font-bold transition-all cursor-pointer shadow-2xs active:scale-[0.97] tap-bounce"
                title="Explore Full Syllabus"
              >
                <span>Syllabus</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Radial Progress + Bento Metrics Grid */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
            {/* Circular Progress Gauge */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
                <defs>
                  <linearGradient id="masteryGaugeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="1" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="1" />
                  </linearGradient>
                  <filter id="gaugeGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#3B82F6" floodOpacity="0.5" />
                  </filter>
                </defs>

                {/* Outer Track Rim (subtle border for crisp definition in dark mode) */}
                <circle
                  cx="70" cy="70" r={radius + 5.5}
                  stroke="currentColor" strokeWidth="1"
                  className="text-slate-300/40 dark:text-slate-700/50"
                  fill="transparent"
                />

                {/* Main Gauge Track (High Contrast & Visible in OLED/Dark Mode) */}
                <circle
                  cx="70" cy="70" r={radius}
                  stroke="currentColor" strokeWidth="11"
                  className="text-slate-200/90 dark:text-[#222A40]"
                  fill="transparent"
                />

                {/* Inner Track Rim */}
                <circle
                  cx="70" cy="70" r={radius - 5.5}
                  stroke="currentColor" strokeWidth="1"
                  className="text-slate-300/40 dark:text-slate-700/50"
                  fill="transparent"
                />

                {/* Foreground Progress Arc */}
                <circle
                  cx="70" cy="70" r={radius}
                  stroke="url(#masteryGaugeGrad)"
                  strokeWidth="11"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap={overallStats.completionPercentage > 0 ? 'round' : 'butt'}
                  filter="url(#gaugeGlow)"
                  className="transition-all duration-1000 ease-out"
                  fill="transparent"
                  opacity={overallStats.completionPercentage > 0 ? 1 : 0}
                />
              </svg>

              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-2xl sm:text-3xl font-black tabular-nums tracking-tight text-slate-900 dark:text-[#F5F5F7] font-mono">
                  {overallStats.completionPercentage}%
                </span>
                <span className="text-[10px] font-bold text-[#2563EB] dark:text-[#7AA2F7] uppercase tracking-widest font-mono mt-0.5">
                  Mastered
                </span>
              </div>
            </div>

            {/* KPI Cards & Multi-Status Distribution */}
            <div className="w-full space-y-2 flex-1">
              <div className="grid grid-cols-2 gap-2">
                {/* Completed Topics */}
                <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-50/90 dark:bg-[#1B243B] border border-slate-200/70 dark:border-slate-700/60 shadow-2xs space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-300">
                    <span className="flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      Completed
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-base sm:text-lg font-black tabular-nums text-slate-900 dark:text-white font-mono">
                      {overallStats.completedCount}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-300 font-medium font-mono">
                      / {overallStats.totalTopics} Topics
                    </span>
                  </div>
                </div>

                {/* Study Time */}
                <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-50/90 dark:bg-[#1B243B] border border-slate-200/70 dark:border-slate-700/60 shadow-2xs space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-300">
                    <span className="flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                      <Clock className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#7AA2F7] shrink-0" />
                      Study Time
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-base sm:text-lg font-black tabular-nums text-[#2563EB] dark:text-[#7AA2F7] font-mono">
                      {overallStats.totalStudyHours}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-300 font-medium font-mono">
                      Hours
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Segment Meter */}
              <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-50/90 dark:bg-[#1B243B] border border-slate-200/70 dark:border-slate-700/60 space-y-1.5">
                <div className="flex justify-between items-center text-[11px] font-bold font-mono">
                  <span className="text-[#2563EB] dark:text-[#7AA2F7] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#2563EB] dark:bg-[#7AA2F7]" />
                    In Progress ({overallStats.inProgressCount})
                  </span>
                  <span className="text-rose-500 dark:text-rose-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    Weak ({overallStats.weakCount})
                  </span>
                </div>

                <div className="w-full h-2.5 rounded-full bg-slate-200/80 dark:bg-[#0D1424] overflow-hidden flex p-0.5 shadow-inner border border-slate-200/50 dark:border-slate-700/50">
                  <div
                    className="h-full bg-emerald-500 rounded-l-full transition-all duration-500"
                    style={{ width: `${(overallStats.completedCount / (overallStats.totalTopics || 1)) * 100}%` }}
                    title="Completed"
                  />
                  <div
                    className="h-full bg-[#2563EB] dark:bg-[#7AA2F7] transition-all duration-500"
                    style={{ width: `${(overallStats.inProgressCount / (overallStats.totalTopics || 1)) * 100}%` }}
                    title="In Progress"
                  />
                  <div
                    className="h-full bg-rose-500 rounded-r-full transition-all duration-500"
                    style={{ width: `${(overallStats.weakCount / (overallStats.totalTopics || 1)) * 100}%` }}
                    title="Needs Revision"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Subject Mastery Breakdown (Issues 7 & 11) */}
          <div className="relative z-10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200 font-mono flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
                <span>Subject Mastery Breakdown</span>
              </span>
              {subjectProgressList.length > 0 && (
                <button
                  onClick={() => {
                    soundManager.playClick();
                    onNavigate('syllabus');
                  }}
                  className="btn-secondary py-1 px-2.5 text-xs gap-1"
                  title="View all subjects in syllabus"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>

            {subjectProgressList.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {subjectProgressList.slice(0, 4).map((sub) => (
                  <div
                    key={sub.id}
                    onClick={() => {
                      soundManager.playClick();
                      if (onNavigateToSubject) {
                        onNavigateToSubject(sub.id);
                      } else {
                        onNavigate('syllabus');
                      }
                    }}
                    className="p-2.5 rounded-xl bg-slate-50/90 dark:bg-[#1B243B] border border-slate-200/70 dark:border-slate-700/60 hover:border-violet-500/50 dark:hover:border-violet-400/50 hover:bg-violet-50/20 dark:hover:bg-violet-500/10 hover:shadow-[0_10px_24px_-6px_rgba(124,58,237,0.16)] dark:hover:shadow-[0_10px_26px_-6px_rgba(124,58,237,0.26)] transition-all duration-300 ease-out transform-gpu hover:scale-[1.018] hover:-translate-y-0.5 cursor-pointer group shadow-2xs flex flex-col justify-between gap-1.5 active:scale-[0.98] tap-bounce"
                  >
                    <div className="flex items-center justify-between gap-1.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-6 h-6 rounded-lg bg-white dark:bg-[#151622] flex items-center justify-center border border-slate-200/50 dark:border-slate-700/50 shadow-2xs shrink-0 overflow-hidden">
                          {renderSubjectIcon(sub.icon, sub.color)}
                        </span>
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {sub.name}
                        </span>
                      </div>
                      <span className="text-xs font-mono font-bold tabular-nums text-slate-700 dark:text-slate-200 shrink-0">
                        {sub.percentage}%
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full bg-slate-200/80 dark:bg-[#0D1424] overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${Math.min(100, Math.max(sub.percentage, 2))}%`,
                            backgroundColor: sub.color || '#2563EB'
                          }}
                        />
                      </div>
                      <span className="text-xs font-mono text-slate-500 dark:text-slate-400 shrink-0">
                        {sub.completedTopics}/{sub.totalTopics}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-[#1B243B] border border-slate-200/60 dark:border-slate-700/60 text-center">
                <p className="text-xs text-slate-500 dark:text-slate-400">No subjects configured yet.</p>
              </div>
            )}
          </div>

          {/* Smart Next Recommended Target HUD (Issues 8 & 13) */}
          {nextRecommendedTopic ? (
            <div className="relative z-10 p-3 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 dark:from-blue-950/40 dark:via-indigo-950/30 dark:to-purple-950/30 border border-blue-200/80 dark:border-blue-800/50 flex items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-blue-600 dark:bg-[#7AA2F7] text-white dark:text-black flex items-center justify-center shrink-0 shadow-xs">
                  <Zap className="w-4 h-4 fill-current" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-2xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      Recommended Focus
                    </span>
                    <span className={`px-1.5 py-0.5 rounded text-2xs font-bold border ${nextRecommendedTopic.badgeColor}`}>
                      {nextRecommendedTopic.badge}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate mt-0.5">
                    {nextRecommendedTopic.topic.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    <span>{toNaturalCase(nextRecommendedTopic.subjectName)}</span>
                    <span className="mx-1.5 text-slate-300 dark:text-slate-600">•</span>
                    <span>{toNaturalCase(nextRecommendedTopic.chapterName)}</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  soundManager.playClick();
                  if (onOpenTopicDrawer) {
                    onOpenTopicDrawer(nextRecommendedTopic.topic, nextRecommendedTopic.subjectName, nextRecommendedTopic.chapterName);
                  } else {
                    onNavigate('syllabus');
                  }
                }}
                className="btn-primary px-4 py-2 text-xs sm:text-sm font-bold shadow-sm flex items-center gap-2 shrink-0"
                aria-label={`Start studying recommended topic: ${nextRecommendedTopic.topic.name}`}
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Start Study</span>
              </button>
            </div>
          ) : null}
        </div>

        {/* CARD 2: Daily Study Planner */}
        <div className="md:col-span-5 p-4 sm:p-6 rounded-2xl bg-white dark:bg-[#151622] border border-slate-200/80 dark:border-white/[0.08] shadow-subtle-depth flex flex-col justify-between space-y-3.5 relative overflow-hidden">
          
          {/* Header Row */}
          <div className="relative z-10 flex items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-700/60">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-emerald-500 text-white flex items-center justify-center font-bold shadow-md shadow-amber-500/20 shrink-0">
                <CalendarCheck className="w-4 sm:w-5 h-4 sm:h-5 stroke-[2.4]" />
              </div>
              <div>
                <h4 className="text-[15px] sm:text-base font-bold font-grotesk text-slate-900 dark:text-[#F5F5F7] tracking-tight">
                  Daily Planner
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-300 font-medium font-mono">
                  {completedTodayTasks.length}/{totalTasksToday} targets completed
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  soundManager.playClick();
                  if (onOpenAddTopic) {
                    onOpenAddTopic();
                  } else {
                    onNavigate('planner');
                  }
                }}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-purple-50 dark:bg-[#2A1B4E] border border-purple-200/70 dark:border-purple-800/60 text-[#7C3AED] dark:text-[#DDD6FE] hover:bg-purple-100 dark:hover:bg-[#3B1E6D] text-xs font-bold transition-all cursor-pointer shadow-2xs active:scale-[0.97] tap-bounce"
                title="Add New Target"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Add</span>
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  onNavigate('planner');
                }}
                className="btn-secondary py-1.5 px-3 text-xs"
                title="Open Full Study Planner"
              >
                <span>Planner</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Velocity Progress Bar */}
          <div className="relative z-10 p-3 rounded-2xl bg-slate-50/90 dark:bg-[#1B243B] border border-slate-200/70 dark:border-slate-700/60 space-y-1.5 shadow-2xs">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-900 dark:text-[#F5F5F7] flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>Today's Velocity</span>
              </span>
              <span className="text-[#7C3AED] dark:text-[#DDD6FE] font-mono font-black tabular-nums">
                {todayProgressPercent}%
              </span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-200/80 dark:bg-[#0D1424] overflow-hidden p-0.5 border border-slate-200/50 dark:border-slate-700/50">
              <div
                className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-[#7C3AED] rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(todayProgressPercent, todayProgressPercent > 0 ? 3 : 0))}%` }}
              />
            </div>
          </div>

          {/* Live Active Routine Slot Widget */}
          {activeSlot ? (
            <div
              onClick={() => {
                soundManager.playClick();
                onNavigate('planner');
              }}
              className="relative z-10 p-3 rounded-2xl bg-gradient-to-r from-blue-600/15 via-indigo-600/15 to-purple-600/15 border border-blue-500/40 hover:border-blue-500/70 transition-all cursor-pointer group shadow-2xs"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping shrink-0" />
                  <span className="text-[11px] font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    LIVE ROUTINE BLOCK
                  </span>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-bold">
                    ({format12Hour(activeSlot.startTime)} - {format12Hour(activeSlot.endTime)})
                  </span>
                </div>
                <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform shrink-0">
                  <span>Routine</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
              <p className="text-xs sm:text-sm font-black text-slate-900 dark:text-white truncate mt-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {activeSlot.title}
              </p>
            </div>
          ) : nextSlot ? (
            <div
              onClick={() => {
                soundManager.playClick();
                onNavigate('planner');
              }}
              className="relative z-10 p-2.5 px-3.5 rounded-2xl bg-slate-50/90 dark:bg-[#1B243B] border border-slate-200/70 dark:border-slate-700/60 hover:border-blue-500/40 transition-all cursor-pointer flex items-center justify-between text-xs group shadow-2xs"
            >
              <div className="flex items-center gap-2 min-w-0">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="text-[11px] text-slate-500 dark:text-slate-300">
                  Next routine at <strong className="text-slate-800 dark:text-slate-100 font-mono font-bold">{format12Hour(nextSlot.startTime)}</strong>:
                </span>
                <span className="font-bold text-slate-800 dark:text-slate-100 truncate">
                  {nextSlot.title}
                </span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 shrink-0 transition-colors" />
            </div>
          ) : null}

          {/* Focus Queue List / Celebration */}
          <div className="relative z-10 space-y-2 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block font-mono">
                Active Focus Queue
              </span>
              {todayPlannerTasks.length > 0 && (
                <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400">
                  {todayPlannerTasks.length} queued
                </span>
              )}
            </div>

            {todayPlannerTasks.length > 0 ? (
              <div className="space-y-1.5">
                {todayPlannerTasks.slice(0, 3).map((task, idx) => (
                  <div
                    key={task.id}
                    onClick={() => {
                      soundManager.playClick();
                      onNavigate('planner');
                    }}
                    className="p-2.5 px-3 rounded-xl bg-slate-50/90 dark:bg-[#1B243B] border border-slate-200/70 dark:border-slate-700/60 hover:border-[#2563EB]/50 dark:hover:border-[#7AA2F7]/50 hover:bg-blue-50/30 dark:hover:bg-[#7AA2F7]/10 flex items-center justify-between text-xs cursor-pointer transition-all duration-150 group shadow-2xs hover:shadow-xs active:scale-[0.98] tap-bounce"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-5 h-5 rounded-lg bg-slate-200/70 dark:bg-white/[0.1] text-[10px] font-mono font-black text-slate-600 dark:text-white flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="font-bold text-slate-800 dark:text-slate-100 truncate group-hover:text-[#2563EB] dark:group-hover:text-[#7AA2F7] transition-colors">
                        {task.topicName}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-lg text-[10px] font-mono tabular-nums text-[#2563EB] dark:text-[#7AA2F7] bg-[#EFF6FF] dark:bg-[#7AA2F7]/15 border border-[#DBEAFE] dark:border-[#7AA2F7]/25 shrink-0 font-bold ml-2">
                      ⏱️ {task.estimatedMinutes}m
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 sm:p-5 text-center rounded-2xl bg-gradient-to-b from-slate-50/90 via-emerald-50/25 to-slate-50/90 dark:from-[#1B243B]/80 dark:via-emerald-950/20 dark:to-[#1B243B]/80 border border-emerald-200/60 dark:border-emerald-800/40 shadow-2xs space-y-2.5">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400/20 via-emerald-500/20 to-[#2563EB]/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-xs">
                  <Trophy className="w-5 h-5 stroke-[2.2] text-amber-500" />
                </div>
                <div>
                  <p className="text-xs sm:text-[13px] font-black text-slate-900 dark:text-[#F5F5F7]">
                    All Targets Completed for Today! 🎉
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-300 mt-0.5 max-w-xs mx-auto">
                    Your study desk is completely clear. Reclaim your focus or queue up targets for tomorrow.
                  </p>
                </div>
                <div className="flex items-center justify-center gap-2 pt-1">
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      if (onOpenAddTopic) {
                        onOpenAddTopic();
                      } else {
                        onNavigate('planner');
                      }
                    }}
                    className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-[11px] font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer active:scale-[0.97] shadow-md shadow-purple-500/20 tap-bounce"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add Target</span>
                  </button>
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      onNavigate('planner');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#202D47] hover:bg-slate-100 dark:hover:bg-[#2A3B5E] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-[11px] font-bold transition-all inline-flex items-center gap-1 cursor-pointer active:scale-[0.97] shadow-2xs tap-bounce"
                  >
                    <span>Open Planner</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 6. STUDY STATION & HUB LAUNCHER */}
      {platforms.length > 0 && (
        <div className="p-3.5 sm:p-6 rounded-2xl bg-white dark:bg-[#151622] border border-slate-200/80 dark:border-white/[0.08] shadow-subtle-depth space-y-3 sm:space-y-4 relative overflow-hidden">
          
          {/* Header */}
          <div className="relative z-10 flex items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-700/60">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-600/20 shrink-0">
                <Globe className="w-4 sm:w-5 h-4 sm:h-5 stroke-[2.4]" />
              </div>
              <div>
                <h3 className="text-[15px] sm:text-base font-bold font-grotesk text-slate-900 dark:text-[#F5F5F7] tracking-tight">
                  Study Station & Portals
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-300 font-medium">
                  1-Click launch into your study resources, test portals & notes
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                soundManager.playClick();
                onNavigate('platforms');
              }}
              className="btn-secondary py-1.5 px-3 text-xs"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Interactive Platform Launcher Grid */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {platforms.slice(0, 4).map(plat => (
              <div
                key={plat.id}
                onClick={() => {
                  soundManager.playClick();
                  window.open(plat.url, '_blank', 'noopener,noreferrer');
                }}
                className="p-2.5 sm:p-3.5 rounded-xl bg-slate-50/90 dark:bg-[#1B243B] border border-slate-200/70 dark:border-slate-700/60 hover:border-indigo-500/40 dark:hover:border-indigo-400/50 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex items-center gap-2.5 sm:gap-3 group shadow-2xs hover:shadow-md active:scale-[0.97] tap-bounce"
              >
                <div
                  className="w-8 sm:w-9 h-8 sm:h-9 rounded-lg flex items-center justify-center text-sm sm:text-base shadow-xs border border-white/20 shrink-0 transition-transform group-hover:scale-105"
                  style={{ backgroundColor: plat.color || '#5A4FCF' }}
                >
                  {plat.icon || '⚡'}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs sm:text-[13px] font-black text-slate-900 dark:text-[#F5F5F7] truncate block group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {plat.name}
                    </span>
                    <ExternalLink className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </div>
                  <span className="inline-block mt-0.5 px-1.5 py-0.5 rounded text-2xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-300 bg-black/5 dark:bg-white/10">
                    {plat.category === 'course' ? 'Course' : 'Mock'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. SUBJECT MASTERY BREAKDOWN */}
      <div className="p-3.5 sm:p-6 rounded-2xl bg-white dark:bg-[#151622] border border-slate-200/80 dark:border-white/[0.08] shadow-subtle-depth space-y-3.5 sm:space-y-4 print:p-0 print:border-none print:shadow-none">
        
        {/* Header (Issue 11: Standardized View All link) */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-700/60">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl bg-gradient-to-tr from-[#2563EB] to-indigo-600 dark:from-[#7AA2F7] dark:to-[#4D76D6] text-white flex items-center justify-center font-bold shadow-md shadow-[#2563EB]/20 dark:shadow-[#7AA2F7]/25 shrink-0">
              <Layers className="w-4 sm:w-5 h-4 sm:h-5 stroke-[2.4]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[15px] sm:text-base font-bold font-grotesk text-slate-900 dark:text-[#F5F5F7] tracking-tight">
                  Subject Mastery Curriculum
                </h3>
                <span className="px-2 py-0.5 rounded-lg text-2xs font-mono font-bold bg-[#EFF6FF] dark:bg-[#7AA2F7]/15 text-[#2563EB] dark:text-[#7AA2F7] border border-[#DBEAFE] dark:border-[#7AA2F7]/25">
                  {subjectStats.length} Subjects
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-300 font-medium mt-0.5">
                Target coverage, topic counts & diagnostic weak spots by subject
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onNavigate('subjects');
            }}
            className="btn-secondary py-1.5 px-3 text-xs shrink-0 no-print"
            title="View all subjects in curriculum"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Subject Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3.5">
          {subjectStats.map(subj => {
            const isMastered = subj.percentage === 100;
            return (
              <div
                key={subj.subjectId}
                onClick={() => {
                  soundManager.playClick();
                  if (onNavigateToSubject) {
                    onNavigateToSubject(subj.subjectId);
                  } else {
                    onNavigate('syllabus');
                  }
                }}
                className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50/90 dark:bg-[#1B243B] border border-slate-200/70 dark:border-slate-700/60 hover:border-violet-500/50 dark:hover:border-violet-400/50 hover:shadow-[0_14px_30px_-6px_rgba(124,58,237,0.16)] dark:hover:shadow-[0_14px_32px_-6px_rgba(124,58,237,0.28)] transition-all duration-300 ease-out transform-gpu hover:scale-[1.018] hover:-translate-y-1 cursor-pointer space-y-2.5 sm:space-y-3 group active:scale-[0.98] relative overflow-hidden tap-bounce print-avoid-break print:border print:border-black print:rounded-lg"
              >
                {/* Subject Header Row */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: subj.color || '#2563EB' }}
                    />
                    <h4 className="text-[13px] sm:text-sm font-black text-slate-900 dark:text-[#F5F5F7] group-hover:text-[#2563EB] dark:group-hover:text-[#7AA2F7] transition-colors truncate">
                      {subj.subjectName}
                    </h4>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-lg text-xs font-black font-mono tabular-nums shrink-0 ${
                      isMastered
                        ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25'
                        : subj.percentage > 0
                        ? 'bg-[#EFF6FF] dark:bg-[#7AA2F7]/15 text-[#2563EB] dark:text-[#7AA2F7] border border-[#DBEAFE] dark:border-[#7AA2F7]/25'
                        : 'bg-black/5 dark:bg-white/5 text-slate-500'
                    }`}
                  >
                    {subj.percentage}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2.5 rounded-full bg-slate-200/80 dark:bg-[#0D1424] overflow-hidden p-0.5 border border-slate-200/50 dark:border-slate-700/50">
                  <div
                    className="h-full rounded-full transition-all duration-500 shadow-2xs"
                    style={{
                      width: `${subj.percentage}%`,
                      backgroundColor: subj.color || '#2563EB',
                    }}
                  />
                </div>

                {/* Topics & Weak Status Row */}
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="font-mono text-slate-600 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-white font-black">{subj.completedTopics}</strong>
                    <span className="text-slate-500 dark:text-slate-300 text-[11px]">/{subj.totalTopics} Topics</span>
                  </span>

                  {subj.weakCount > 0 ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/25">
                      ⚠️ {subj.weakCount} Weak
                    </span>
                  ) : isMastered ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25">
                      ✓ Mastered
                    </span>
                  ) : (
                    <span className="text-[11px] text-amber-600 dark:text-amber-400 font-bold">
                      In Progress
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 8. PROFESSIONAL & ADVANCED HOMEPAGE FOOTER */}
      <AppFooter onNavigate={onNavigate} />
    </div>
  );
};
