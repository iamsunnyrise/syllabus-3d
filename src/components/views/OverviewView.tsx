import React, { useState, useMemo } from 'react';
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
  Plus,
  Trophy,
  Zap,
  Calculator,
  BrainCircuit,
  BookMarked,
  ShieldCheck,
  Award
} from 'lucide-react';
import { AppView } from '../layout/Sidebar';
import { Topic } from '../../types/syllabus';
import { ExamCountdown3D } from '../3d/ExamCountdown3D';
import { Top3TargetsWidget } from '../dashboard/Top3TargetsWidget';
import { StudyDeskHeroIllustration } from '../dashboard/StudyDeskHeroIllustration';
import { AppFooter } from '../common/AppFooter';
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

  // Executive Greeting & Time Status
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';
  const greetingPhase = hour < 12 ? 'Morning Focus' : hour < 17 ? 'Afternoon Momentum' : 'Evening Mastery';
  const greetingIcon = hour < 12 ? '🌅' : hour < 17 ? '☀️' : '🌙';
  const formattedDate = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  const userName = profile.name || user?.name || user?.email?.split('@')[0] || 'Scholar';
  const displayFirstName = (userName.split(' ')[0] || userName).toUpperCase();
  const [isHeroMenuOpen, setIsHeroMenuOpen] = useState(false);

  // Hero Circular Donut Gauge calculations (matching reference Image 2)
  const heroDonutRadius = 38;
  const heroDonutCircumference = 2 * Math.PI * heroDonutRadius;
  const heroDonutOffset = heroDonutCircumference - (Math.min(100, Math.max(0, overallStats.completionPercentage)) / 100) * heroDonutCircumference;

  return (
    <div className="space-y-3 sm:space-y-3.5 pb-24 sm:pb-12">
      
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
              <span>Aspirant: <strong>{userName}</strong></span>
              <span>• Overall Progress: <strong>{overallStats.completionPercentage}% Mastered ({overallStats.completedCount}/{overallStats.totalTopics} Topics)</strong></span>
            </div>
          </div>
          <div className="text-right text-xs font-mono">
            <div className="font-bold text-black uppercase">Study Desk Dashboard</div>
            <div className="text-gray-600 mt-1">Printed: {formattedDate}</div>
            <div className="text-[10px] text-gray-500 mt-0.5">Syllabus 3D Precision Study System</div>
          </div>
        </div>
      </div>

      {/* 1. EXECUTIVE VIP GREETING & COMMAND HERO CARD (Refined to match Image 2) */}
      <div className="relative overflow-hidden rounded-[26px] sm:rounded-[34px] p-4 sm:p-6 md:p-7 bg-white/95 dark:bg-[#161726]/90 backdrop-blur-2xl border border-purple-200/50 dark:border-white/[0.08] shadow-[0_12px_36px_-12px_rgba(124,58,237,0.14)] dark:shadow-[0_16px_48px_-15px_rgba(0,0,0,0.6)] print:p-0 print:border-none print:shadow-none">
        
        {/* Ambient Glow Orbs */}
        <div className="absolute -top-16 -right-16 w-64 sm:w-80 h-64 sm:h-80 rounded-full bg-gradient-to-br from-purple-500/10 via-indigo-500/10 to-transparent dark:from-purple-500/20 dark:via-indigo-500/15 dark:to-transparent blur-3xl pointer-events-none print:hidden" />
        <div className="absolute -bottom-16 -left-16 w-56 sm:w-72 h-56 sm:h-72 rounded-full bg-gradient-to-tr from-amber-500/10 to-orange-500/5 dark:from-amber-500/15 dark:to-transparent blur-3xl pointer-events-none print:hidden" />

        <div className="relative z-10 space-y-4 sm:space-y-5">
          
          {/* ── TOP PILLS ROW: Phase Pill + Level Pill + Progress Pill + Kebab Menu ── */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 sm:gap-2.5 flex-wrap">
              {/* 1. Warm Sun / Phase Pill */}
              <div className="h-8 sm:h-8.5 inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 rounded-full bg-gradient-to-r from-[#FEF3C7] via-[#FFEDD5] to-[#FEF3C7] dark:from-[#78350F]/40 dark:via-[#7C2D12]/30 dark:to-[#78350F]/25 border border-amber-200/90 dark:border-amber-700/50 text-[#92400E] dark:text-[#FDE68A] text-xs sm:text-[13px] font-black tracking-normal shadow-2xs">
                <span className="text-sm sm:text-base leading-none select-none">{greetingIcon}</span>
                <span>{greetingPhase}</span>
              </div>

              {/* 2. Level Pill */}
              <div className="h-8 sm:h-8.5 inline-flex items-center gap-1.5 px-3 sm:px-3.5 rounded-full bg-[#EDE9FE] dark:bg-[#3B0764]/40 border border-purple-200/70 dark:border-purple-800/40 text-[#6D28D9] dark:text-[#DDD6FE] text-xs sm:text-[13px] font-black tracking-normal shadow-2xs">
                <TrendingUp className="w-3.5 h-3.5 stroke-[2.8]" />
                <span>Lvl {profile.level}</span>
              </div>

              {/* 3. Progress Pill */}
              <div className="h-8 sm:h-8.5 inline-flex items-center gap-1.5 px-3 sm:px-3.5 rounded-full bg-[#EDE9FE] dark:bg-[#3B0764]/40 border border-purple-200/70 dark:border-purple-800/40 text-[#6D28D9] dark:text-[#DDD6FE] text-xs sm:text-[13px] font-black tracking-normal shadow-2xs">
                <span className="w-3.5 h-3.5 rounded-full border-2 border-[#7C3AED] dark:border-[#A78BFA] flex items-center justify-center shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] dark:bg-[#A78BFA]" />
                </span>
                <span>{overallStats.completionPercentage}% Done</span>
              </div>
            </div>

            {/* 4. Circular 3-Dots Menu Button */}
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setIsHeroMenuOpen(prev => !prev)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100/90 dark:bg-white/10 hover:bg-slate-200/90 dark:hover:bg-white/15 border border-slate-200/60 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-slate-200 shadow-2xs active:scale-95 transition-all cursor-pointer"
                title="Quick Options"
              >
                <MoreVertical className="w-4 h-4 stroke-[2.4]" />
              </button>

              {/* Quick Options Dropdown */}
              {isHeroMenuOpen && (
                <div className="absolute right-0 top-10 w-48 rounded-2xl bg-white dark:bg-[#1E2033] border border-slate-200/90 dark:border-slate-700/80 shadow-xl py-1.5 z-30 animate-scale-in">
                  <button
                    type="button"
                    onClick={() => {
                      setIsHeroMenuOpen(false);
                      onNavigate('planner');
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-white/5 flex items-center gap-2"
                  >
                    <CalendarCheck className="w-3.5 h-3.5 text-purple-600" />
                    <span>Daily Planner</span>
                  </button>
                  {onOpenFocus && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsHeroMenuOpen(false);
                        onOpenFocus();
                      }}
                      className="w-full text-left px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-white/5 flex items-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Focus Mode</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setIsHeroMenuOpen(false);
                      onNavigate('syllabus');
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-white/5 flex items-center gap-2"
                  >
                    <Target className="w-3.5 h-3.5 text-blue-600" />
                    <span>Full Syllabus</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ── MAIN CONTENT LAYOUT: Left Greeting & Actions + Right Gauge, Quote & 3D Desk ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-center">
            
            {/* Left Column: Greeting, Subtitle & Action Buttons */}
            <div className="lg:col-span-6 xl:col-span-7 space-y-3 sm:space-y-4">
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight flex items-center flex-wrap gap-x-1.5">
                  <span>{greeting},&nbsp;</span>
                  <span className="bg-gradient-to-r from-[#2563EB] via-[#6366F1] to-[#7C3AED] dark:from-indigo-400 dark:via-purple-300 dark:to-violet-200 bg-clip-text text-transparent font-black">
                    {displayFirstName}
                  </span>
                  <span className="inline-block animate-wave origin-[70%_70%] text-2xl sm:text-3xl ml-1 select-none" role="img" aria-label="Waving hand">
                    👋
                  </span>
                </h1>
                <p className="text-sm sm:text-[15px] text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-xl mt-1.5">
                  You have conquered{' '}
                  <span className="font-black text-[#6D28D9] dark:text-[#A78BFA]">
                    {overallStats.completionPercentage}%
                  </span>{' '}
                  of {examName}. Keep your streak alive!
                </p>
              </div>

              {/* Action Buttons: Focus Mode + Today */}
              <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap pt-1 sm:pt-2 no-print">
                {onOpenFocus && (
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playCompleteChime();
                      onOpenFocus();
                    }}
                    className="h-11 sm:h-12 px-5 sm:px-6 rounded-2xl bg-gradient-to-r from-[#7C3AED] via-[#6366F1] to-[#7C3AED] hover:from-[#6D28D9] hover:via-[#4F46E5] hover:to-[#6D28D9] text-white font-black text-sm sm:text-[15px] shadow-[0_8px_25px_-4px_rgba(124,58,237,0.5)] flex items-center gap-2.5 active:scale-95 transition-all cursor-pointer border border-white/20"
                    title="Launch Focus Chamber"
                  >
                    <Sparkles className="w-4 h-4 stroke-[2.5]" />
                    <span>Focus Mode</span>
                    <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold shrink-0 ml-0.5">
                      <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    onNavigate('planner');
                  }}
                  className="h-11 sm:h-12 px-4 sm:px-5 rounded-2xl bg-white dark:bg-[#1E2033] border-2 border-purple-200/90 dark:border-purple-800/60 hover:border-purple-300 dark:hover:border-purple-700 text-slate-900 dark:text-slate-100 font-black text-sm sm:text-[15px] shadow-2xs flex items-center gap-2.5 active:scale-95 transition-all cursor-pointer"
                  title="View Today's Daily Planner"
                >
                  <CalendarCheck className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                  <span>Today ({completedTodayTasks.length}/{totalTasksToday})</span>
                </button>
              </div>
            </div>

            {/* Right Column: Donut Gauge, Quote & 3D Study Desk Artwork */}
            <div className="lg:col-span-6 xl:col-span-5 flex items-center justify-between sm:justify-end gap-3 sm:gap-5 pt-2 lg:pt-0">
              
              {/* Circular Donut Gauge */}
              <div className="flex flex-col items-center shrink-0">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <defs>
                      <linearGradient id="heroDonutGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#A855F7" />
                        <stop offset="100%" stopColor="#6366F1" />
                      </linearGradient>
                      <filter id="heroDonutGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#8B5CF6" floodOpacity="0.4" />
                      </filter>
                    </defs>
                    {/* Track */}
                    <circle
                      cx="50"
                      cy="50"
                      r={heroDonutRadius}
                      stroke="currentColor"
                      strokeWidth="9"
                      fill="transparent"
                      className="text-purple-100 dark:text-purple-900/50"
                    />
                    {/* Foreground Progress */}
                    <circle
                      cx="50"
                      cy="50"
                      r={heroDonutRadius}
                      stroke="url(#heroDonutGrad)"
                      strokeWidth="9"
                      strokeDasharray={heroDonutCircumference}
                      strokeDashoffset={heroDonutOffset}
                      strokeLinecap="round"
                      fill="transparent"
                      filter="url(#heroDonutGlow)"
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  
                  {/* Gauge Center Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tabular-nums tracking-tight leading-none">
                      {overallStats.completionPercentage}%
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 dark:text-slate-400 tracking-tight mt-0.5">
                      Completed
                    </span>
                  </div>
                </div>
              </div>

              {/* Motivational Handwritten Quote */}
              <div className="flex flex-col items-start leading-tight select-none shrink-0 font-serif italic text-slate-800 dark:text-slate-100">
                <span className="text-xs sm:text-sm font-bold tracking-tight">'Discipline</span>
                <span className="text-xs sm:text-sm font-bold tracking-tight">Today</span>
                <span className="text-xs sm:text-sm font-bold tracking-tight">A Stronger</span>
                <span className="text-xs sm:text-sm font-bold tracking-tight">Tomorrow</span>
                {/* Hand-drawn accent swoop underline */}
                <svg className="w-14 sm:w-16 h-2 text-purple-500 dark:text-purple-400 mt-1" viewBox="0 0 80 8" fill="none">
                  <path d="M2 5 Q 40 1, 78 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>

              {/* 3D Study Desk Illustration (Stack of Books PLAN/STUDY/ACHIEVE + Sticky Note + Plant) */}
              <div className="shrink-0">
                <StudyDeskHeroIllustration className="w-32 sm:w-40 md:w-44 lg:w-48 h-auto" />
              </div>

            </div>

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
                <h3 className="text-[15px] sm:text-base font-black text-slate-900 dark:text-[#F5F5F7] tracking-tight">
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
                <h4 className="text-[15px] sm:text-base font-black text-slate-900 dark:text-[#F5F5F7] tracking-tight">
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
                <h3 className="text-[15px] sm:text-base font-black text-slate-900 dark:text-[#F5F5F7] tracking-tight">
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
                <h3 className="text-[15px] sm:text-base font-black text-slate-900 dark:text-[#F5F5F7] tracking-tight">
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
