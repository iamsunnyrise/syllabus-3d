import React, { useMemo } from 'react';
import { useSyllabus } from '../../context/SyllabusContext';
import { useAuth } from '../../context/AuthContext';
import {
  Target,
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowUpRight,
  Globe,
  Sparkles,
  Flame,
  TrendingUp,
  BookOpen,
  Play,
  Plus,
  Zap,
  Calculator,
  BrainCircuit,
  BookMarked,
  ShieldCheck,
  Award,
  Layers
} from 'lucide-react';
import { AppView } from '../layout/Sidebar';
import { Topic } from '../../types/syllabus';
import { ExamCountdown3D } from '../3d/ExamCountdown3D';
import { Top3TargetsWidget } from '../dashboard/Top3TargetsWidget';
import { ExamTargetMissionBanner } from '../dashboard/ExamTargetMissionBanner';
import { AppFooter } from '../common/AppFooter';
import { SectionBadgeIcon } from '../common/SectionBadgeIcon';
import { PunditsHeroBanner } from '../dashboard/PunditsHeroBanner';
import { PortalFeatureCards } from '../dashboard/PortalFeatureCards';
import { soundManager } from '../../utils/soundEffects';

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
  onOpenPricing?: () => void;
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
  onOpenPricing,
}) => {
  const {
    overallStats,
    subjectStats,
    profile,
    currentExam
  } = useSyllabus();
  const { user } = useAuth();

  // Subject Mastery Breakdown
  const subjectProgressList = useMemo(() => {
    if (!currentExam?.subjects || currentExam.subjects.length === 0) return [];
    return currentExam.subjects.map(subject => {
      const stat = (subjectStats || []).find(s => s.subjectId === subject.id) || {
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
  }, [currentExam, subjectStats]);

  // Smart Next Recommended Target HUD
  const nextRecommendedTopic = useMemo(() => {
    if (!currentExam?.subjects) return null;
    let weakOrDue: { topic: Topic; subjectName: string; chapterName: string; badge: string; badgeColor: string } | null = null;
    let inProgress: { topic: Topic; subjectName: string; chapterName: string; badge: string; badgeColor: string } | null = null;
    let notStarted: { topic: Topic; subjectName: string; chapterName: string; badge: string; badgeColor: string } | null = null;

    for (const subject of currentExam.subjects || []) {
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
  }, [currentExam]);

  // Circular Progress calculations
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const completionPct = overallStats?.completionPercentage || 0;
  const strokeDashoffset = Number.isFinite(completionPct)
    ? circumference - (completionPct / 100) * circumference
    : circumference;

  const examName = currentExam?.name || 'SSC CGL 2026';
  const examYear = currentExam?.targetYear || 2026;
  const examYearStr = String(examYear);
  const baseExamName = examName.includes(examYearStr)
    ? examName.replace(examYearStr, '').trim()
    : examName;

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
            <div className="text-xs text-gray-500 mt-0.5">Syllabus 3D Precision Study System</div>
          </div>
        </div>
      </div>

      {/* 🌟 1. ICONIC PUNDITS WELCOME HERO BANNER (Matches Reference Screenshot) */}
      <PunditsHeroBanner
        onNavigate={onNavigate}
        onOpenPricing={onOpenPricing}
        examName={examName}
      />

      {/* 🖥️ 2. THREE LARGE MONITOR FEATURE CARDS (Syllabus Explorer, Mock Test Tracker, Mock & Study Portals) */}
      <PortalFeatureCards
        onNavigate={onNavigate}
        onOpenPricing={onOpenPricing}
      />

      {/* 3. EXAM TARGET MISSION BANNER (Countdown & Official Exam Badge) */}
      <ExamTargetMissionBanner onOpenFocus={onOpenFocus} onNavigate={onNavigate} />

      {/* 🎯 OPTION 1: QUICK RESUME & IMMEDIATE ACTION HUB */}
      {nextRecommendedTopic ? (
        <div className="relative rounded-2xl bg-white dark:bg-[#0E111D]/90 dark:backdrop-blur-xl border border-slate-200/80 dark:border-white/[0.08] p-4 sm:p-5 shadow-xs hover:shadow-md dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all duration-300 overflow-hidden group jump-back-in-hub">
          {/* Subtle Ambient Radial Highlight */}
          <div className="absolute -top-10 -right-10 w-44 h-44 bg-blue-500/10 dark:bg-blue-400/10 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/15 transition-all" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Left: Icon & Topic Meta */}
            <div className="flex items-start sm:items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-all">
                <Play className="w-4 sm:w-4.5 h-4 sm:h-4.5 fill-current ml-0.5" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-sans font-semibold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Jump Back In
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium font-sans truncate">
                    {toNaturalCase(nextRecommendedTopic.subjectName)} • {toNaturalCase(nextRecommendedTopic.chapterName)}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight mt-1 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors font-sans">
                  {nextRecommendedTopic.topic.name}
                </h3>

                {/* Subtopics / Readiness Status Summary with Progress Indicator */}
                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-sans mt-1">
                  {nextRecommendedTopic.topic.subtopics && nextRecommendedTopic.topic.subtopics.length > 0 ? (
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <div className="w-20 sm:w-24 h-1.5 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                          style={{ width: `${nextRecommendedTopic.topic.completionPercentage || 0}%` }}
                        />
                      </div>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums">
                        {nextRecommendedTopic.topic.completionPercentage || 0}% Mastered
                      </span>
                      <span className="text-slate-300 dark:text-slate-600">•</span>
                      <span>{nextRecommendedTopic.topic.subtopics.length} Subtopics</span>
                    </div>
                  ) : (
                    <span>Ready for study & notes</span>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Interactive Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 self-stretch sm:self-auto justify-end">
              {onOpenFocus && (
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    onOpenFocus();
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-50/80 dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.08] text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer border border-slate-200/80 dark:border-white/10 shadow-2xs hover:shadow-xs"
                  title="Quick 25m Focus Sprint"
                >
                  <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>25m Focus</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  if (onOpenTopicDrawer) {
                    onOpenTopicDrawer(nextRecommendedTopic.topic, nextRecommendedTopic.subjectName, nextRecommendedTopic.chapterName);
                  } else {
                    onNavigate('syllabus');
                  }
                }}
                className="px-4 sm:px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold shadow-xs flex items-center gap-2 cursor-pointer active:scale-95 transition-all"
              >
                <span>Resume Study</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* 💎 4 MODERN EXECUTIVE METRIC BENTO CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          {
            id: 'topics',
            title: 'Total Topics',
            value: overallStats.totalTopics || 0,
            icon: BookOpen,
            accentColor: '#10B981',
            iconBg: 'bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/25',
            hoverBorder: 'hover:border-emerald-500/40 dark:hover:border-emerald-400/40',
            badge: `${currentExam?.subjects?.length || 0} Subjects`,
            subtext: `${currentExam?.subjects?.length || 0} active subjects in track`,
            progressPercent: overallStats.totalTopics > 0 ? Math.round((overallStats.completedCount / overallStats.totalTopics) * 100) : 0
          },
          {
            id: 'completed',
            title: 'Completed',
            value: overallStats.completedCount || 0,
            icon: CheckCircle2,
            accentColor: '#0284C7',
            iconBg: 'bg-sky-500/10 dark:bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/25',
            hoverBorder: 'hover:border-sky-500/40 dark:hover:border-sky-400/40',
            badge: `${overallStats.totalTopics > 0 ? Math.round((overallStats.completedCount / overallStats.totalTopics) * 100) : 0}% Done`,
            subtext: `${overallStats.completedCount || 0} of ${overallStats.totalTopics || 0} topics mastered`,
            progressPercent: overallStats.totalTopics > 0 ? Math.round((overallStats.completedCount / overallStats.totalTopics) * 100) : 0
          },
          {
            id: 'hours',
            title: 'Study Hours',
            value: `${totalStudyHours > 0 ? totalStudyHours.toFixed(1) : '0.0'}h`,
            icon: Clock,
            accentColor: '#F59E0B',
            iconBg: 'bg-amber-500/10 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/25',
            hoverBorder: 'hover:border-amber-500/40 dark:hover:border-amber-400/40',
            badge: 'Goal: 15h',
            subtext: `${totalStudyHours > 0 ? totalStudyHours.toFixed(1) : '0.0'}h of 15h weekly pace`,
            progressPercent: Math.min(100, Math.round((totalStudyHours / 15) * 100))
          },
          {
            id: 'rate',
            title: 'Completion Rate',
            value: `${overallStats.completionPercentage || 0}%`,
            icon: Target,
            accentColor: '#8B5CF6',
            iconBg: 'bg-violet-500/10 dark:bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/25',
            hoverBorder: 'hover:border-violet-500/40 dark:hover:border-violet-400/40',
            badge: `${Math.max(0, (overallStats.totalTopics || 0) - (overallStats.completedCount || 0))} Left`,
            subtext: 'Overall syllabus progress',
            progressPercent: overallStats.completionPercentage || 0
          }
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className={`group relative rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#121424]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 ${card.hoverBorder} p-4 sm:p-5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 select-none flex flex-col justify-between overflow-hidden`}
            >
              {/* Top Row: Icon Squircle + Micro Context Pill Badge */}
              <div className="flex items-center justify-between gap-2">
                <div className={`w-9 sm:w-10 h-9 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 border transition-transform duration-200 group-hover:scale-105 shadow-2xs ${card.iconBg}`}>
                  <Icon className="w-4.5 sm:w-5 h-4.5 sm:h-5 stroke-[2.2]" />
                </div>

                <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-[11px] font-bold tracking-wide border shrink-0 bg-slate-50 dark:bg-white/[0.04] text-slate-600 dark:text-slate-300 border-slate-200/70 dark:border-white/10 font-sans">
                  {card.badge}
                </span>
              </div>

              {/* Middle Section: Hero Metric Value & Label */}
              <div className="my-3 sm:my-3.5 space-y-0.5">
                <div className="text-2xl sm:text-3xl font-black font-grotesk tracking-tight text-slate-900 dark:text-white tabular-nums leading-none">
                  {card.value}
                </div>
                <div className="text-xs sm:text-[13px] font-bold text-slate-500 dark:text-slate-400 pt-1">
                  {card.title}
                </div>
              </div>

              {/* Bottom Section: Smooth Progress Track & Context Subtext */}
              <div className="space-y-2 mt-auto">
                <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden">
                  {card.progressPercent > 0 ? (
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(100, card.progressPercent)}%`,
                        backgroundColor: card.accentColor
                      }}
                    />
                  ) : null}
                </div>

                <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium font-sans">
                  <span className="truncate">{card.subtext}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>



      {/* 2. Clean Target Countdown Flip Clock */}
      <ExamCountdown3D />

      {/* 4. TOP 3 NON-NEGOTIABLES & NIGHT REFLECTION WIDGET */}
      <Top3TargetsWidget />

      {/* 5. SYLLABUS MASTERY ENGINE */}
      <div className="w-full p-4 sm:p-5.5 rounded-2xl bg-white dark:bg-[#0E111D]/90 dark:backdrop-blur-xl border border-slate-200/80 dark:border-white/[0.08] shadow-xs hover:shadow-md dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all duration-300 flex flex-col justify-between relative overflow-hidden space-y-4">
        
        {/* Header Row */}
        <div className="relative z-10 flex items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 flex items-center justify-center font-bold shrink-0 shadow-2xs">
              <Target className="w-4 sm:w-4.5 h-4 sm:h-4.5 stroke-[2.3]" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight font-sans">
                Syllabus Mastery
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-sans font-medium">
                {baseExamName} • {examYear}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200/70 dark:border-blue-500/20 shadow-2xs shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
              <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 font-sans">
                {profile.levelTitle || `Level ${profile.level}`}
              </span>
            </div>
            <button
              onClick={() => {
                soundManager.playClick();
                onNavigate('syllabus');
              }}
              className="flex items-center gap-1 px-3 py-1 rounded-xl bg-slate-50/80 dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.08] text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-white/[0.08] text-xs font-semibold transition-all cursor-pointer shadow-2xs active:scale-[0.98]"
              title="Explore Full Syllabus"
            >
              <span>Syllabus</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Radial Progress + KPI Metrics Grid */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          {/* Circular Progress Gauge */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
              <defs>
                <linearGradient id="masteryGaugeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="1" />
                  <stop offset="100%" stopColor="#7C3AED" stopOpacity="1" />
                </linearGradient>
              </defs>

              {/* Clean Track */}
              <circle
                cx="70" cy="70" r={radius}
                stroke="currentColor" strokeWidth="10"
                className="text-slate-100 dark:text-white/[0.06]"
                fill="transparent"
              />

              {/* Progress Arc */}
              <circle
                cx="70" cy="70" r={radius}
                stroke="url(#masteryGaugeGrad)"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
                fill="transparent"
                opacity={overallStats.completionPercentage > 0 ? 1 : 0}
              />
            </svg>

            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-2xl sm:text-3xl font-black tabular-nums tracking-tight text-slate-900 dark:text-white font-sans">
                {overallStats.completionPercentage}%
              </span>
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-sans mt-0.5">
                Mastered
              </span>
            </div>
          </div>

          {/* KPI Cards & Status Distribution */}
          <div className="w-full space-y-2.5 flex-1">
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {/* Completed Topics */}
              <div className="p-3 rounded-xl sm:rounded-2xl bg-slate-50/70 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.08] shadow-2xs space-y-1">
                <div className="flex items-center text-xs font-semibold text-slate-500 dark:text-slate-400 font-sans uppercase tracking-wider">
                  <span className="flex items-center gap-1.5 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    Completed
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg sm:text-xl font-black tabular-nums text-slate-900 dark:text-white font-sans">
                    {overallStats.completedCount}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium font-sans">
                    / {overallStats.totalTopics} Topics
                  </span>
                </div>
              </div>

              {/* Study Time */}
              <div className="p-3 rounded-xl sm:rounded-2xl bg-slate-50/70 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.08] shadow-2xs space-y-1">
                <div className="flex items-center text-xs font-semibold text-slate-500 dark:text-slate-400 font-sans uppercase tracking-wider">
                  <span className="flex items-center gap-1.5 text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                    Study Time
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg sm:text-xl font-black tabular-nums text-blue-600 dark:text-blue-400 font-sans">
                    {overallStats.totalStudyHours}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium font-sans">
                    Hours
                  </span>
                </div>
              </div>
            </div>

            {/* Status Segment Meter */}
            <div className="p-3 rounded-xl sm:rounded-2xl bg-slate-50/70 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.08] space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold font-sans">
                <span className="text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                  In Progress ({overallStats.inProgressCount})
                </span>
                <span className="text-rose-500 dark:text-rose-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  Needs Revision ({overallStats.weakCount})
                </span>
              </div>

              <div className="w-full h-2 rounded-full bg-slate-200/70 dark:bg-white/[0.08] overflow-hidden flex">
                <div
                  className="h-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${overallStats.totalTopics > 0 ? ((overallStats.completedCount || 0) / overallStats.totalTopics) * 100 : 0}%` }}
                  title="Completed"
                />
                <div
                  className="h-full bg-blue-600 dark:bg-blue-400 transition-all duration-500"
                  style={{ width: `${overallStats.totalTopics > 0 ? ((overallStats.inProgressCount || 0) / overallStats.totalTopics) * 100 : 0}%` }}
                  title="In Progress"
                />
                <div
                  className="h-full bg-rose-500 transition-all duration-500"
                  style={{ width: `${overallStats.totalTopics > 0 ? ((overallStats.weakCount || 0) / overallStats.totalTopics) * 100 : 0}%` }}
                  title="Needs Revision"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Subject Mastery Breakdown */}
        <div className="relative z-10 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200 font-sans flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Subject Mastery Breakdown</span>
            </span>
            {subjectProgressList.length > 0 && (
              <button
                onClick={() => {
                  soundManager.playClick();
                  onNavigate('syllabus');
                }}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.08] text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-white/[0.08] text-xs font-semibold transition-all cursor-pointer shadow-2xs"
                title="View all subjects in syllabus"
              >
                <span>View All</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>

          {subjectProgressList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
              {subjectProgressList.map((sub) => (
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
                  className="p-3 rounded-xl sm:rounded-2xl bg-slate-50/70 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.08] hover:border-blue-500/40 hover:bg-slate-100/70 dark:hover:bg-white/[0.06] transition-all duration-200 group cursor-pointer shadow-2xs flex flex-col justify-between gap-2 active:scale-[0.98]"
                >
                  <div className="flex items-center justify-between gap-2 min-w-0">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <span className="w-6 h-6 rounded-lg bg-white dark:bg-white/[0.08] flex items-center justify-center border border-slate-200/60 dark:border-white/[0.08] shadow-2xs shrink-0 overflow-hidden">
                        {renderSubjectIcon(sub.icon, sub.color)}
                      </span>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors font-sans">
                        {sub.name}
                      </span>
                    </div>
                    <span className="text-xs font-sans font-bold tabular-nums text-slate-900 dark:text-white shrink-0">
                      {sub.percentage}%
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-slate-200/80 dark:bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(100, Math.max(sub.percentage, 2))}%`,
                          backgroundColor: sub.color || '#2563EB'
                        }}
                      />
                    </div>
                    <span className="text-[11px] font-sans font-medium text-slate-500 dark:text-slate-400 tabular-nums shrink-0">
                      {sub.completedTopics}/{sub.totalTopics}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/[0.08] text-center">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">No subjects configured yet.</p>
            </div>
          )}
        </div>

        {/* Smart Next Recommended Target HUD */}
        {nextRecommendedTopic ? (
          <div className="relative z-10 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/70 dark:border-blue-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                <Zap className="w-4 h-4 fill-current" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-sans block">
                  Recommended Focus
                </span>
                <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate font-sans">
                  {nextRecommendedTopic.topic.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate font-sans">
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
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs flex items-center justify-center gap-2 shrink-0 transition-all active:scale-[0.98] cursor-pointer"
              aria-label={`Start studying recommended topic: ${nextRecommendedTopic.topic.name}`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Start Study</span>
            </button>
          </div>
        ) : null}
      </div>

      {/* 8. PROFESSIONAL & ADVANCED HOMEPAGE FOOTER */}
      <AppFooter onNavigate={onNavigate} />
    </div>
  );
};
