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
import { DailyInspirationBanner } from '../dashboard/DailyInspirationBanner';
import { AppFooter } from '../common/AppFooter';
import { SectionBadgeIcon } from '../common/SectionBadgeIcon';
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
    currentExam
  } = useSyllabus();
  const { user } = useAuth();

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
            className="dashboard-add-task-btn group relative inline-flex items-center gap-2 h-10 sm:h-11 px-4 sm:px-5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 active:scale-95 text-white font-extrabold text-xs sm:text-sm tracking-tight shadow-[0_4px_16px_rgba(79,70,229,0.35)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.45)] border border-indigo-400/30 transition-all duration-200 cursor-pointer overflow-hidden"
          >
            <div className="task-btn-icon-chip w-5 h-5 rounded-lg bg-white/20 dark:bg-black/15 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:rotate-90">
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <span className="font-grotesk">Add Task</span>
          </button>
        )}
      </div>

      {/* 2. MOTIVATIONAL QUOTE BANNER (Interactive Daily Inspiration Hub) */}
      <DailyInspirationBanner onOpenFocus={onOpenFocus} />

      {/* 🎯 OPTION 1: QUICK RESUME & IMMEDIATE ACTION HUB */}
      {nextRecommendedTopic ? (
        <div className="relative rounded-2xl bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-violet-600/10 dark:from-blue-950/40 dark:via-indigo-950/30 dark:to-violet-950/40 border border-blue-500/25 dark:border-blue-400/25 p-4 sm:p-5 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden group jump-back-in-hub">
          {/* Subtle Ambient Radial Highlight */}
          <div className="absolute -top-10 -right-10 w-44 h-44 bg-blue-500/15 dark:bg-blue-400/10 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/25 transition-all" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Left: Icon & Topic Meta */}
            <div className="flex items-start sm:items-center gap-3.5 min-w-0">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-blue-600 dark:bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform duration-200">
                <Play className="w-5 h-5 fill-current ml-0.5" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider bg-blue-600/15 text-blue-700 dark:text-blue-300 border border-blue-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
                    Jump Back In
                  </span>
                  <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold border ${nextRecommendedTopic.badgeColor}`}>
                    {nextRecommendedTopic.badge}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {toNaturalCase(nextRecommendedTopic.subjectName)} • {toNaturalCase(nextRecommendedTopic.chapterName)}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight mt-1 truncate">
                  {nextRecommendedTopic.topic.name}
                </h3>

                {/* Subtopics / Readiness Status Summary */}
                <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300 font-medium mt-1">
                  {nextRecommendedTopic.topic.subtopics && nextRecommendedTopic.topic.subtopics.length > 0 ? (
                    <span className="flex items-center gap-1 font-mono">
                      <span>{nextRecommendedTopic.topic.subtopics.length} Subtopics</span>
                      <span className="mx-1 text-slate-300 dark:text-slate-600">•</span>
                      <span>{nextRecommendedTopic.topic.completionPercentage || 0}% Mastered</span>
                    </span>
                  ) : (
                    <span>Ready for active revision & study notes</span>
                  )}
                  {nextRecommendedTopic.topic.studyTimeMinutes ? (
                    <span className="hidden sm:inline-flex items-center gap-1 text-slate-400 dark:text-slate-500">
                      • {nextRecommendedTopic.topic.studyTimeMinutes} mins logged
                    </span>
                  ) : null}
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
                  className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer border border-slate-200/70 dark:border-white/10"
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
                className="btn-primary px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-blue-500/25 flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Resume Study</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* 💎 OPTION 2: 4 MODERN ELEVATED METRIC KPI CARDS (Linear / Apple Health Style) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          {
            id: 'topics',
            title: 'TOTAL TOPICS',
            value: overallStats.totalTopics || 0,
            icon: BookOpen,
            badge: 'CURRICULUM',
            accentColor: '#10B981',
            iconBg: 'bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
            glowColor: 'bg-emerald-500',
            footerLeft: 'Active Subjects',
            footerRight: `${currentExam?.subjects?.length || 0} In Track`,
            progressPercent: 100
          },
          {
            id: 'completed',
            title: 'COMPLETED',
            value: overallStats.completedCount || 0,
            icon: CheckCircle2,
            badge: 'MASTERED',
            accentColor: '#0284C7',
            iconBg: 'bg-sky-500/10 dark:bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/20',
            glowColor: 'bg-sky-500',
            footerLeft: 'Coverage',
            footerRight: `${overallStats.completedCount || 0} of ${overallStats.totalTopics || 0} Done`,
            progressPercent: overallStats.totalTopics > 0 ? Math.round((overallStats.completedCount / overallStats.totalTopics) * 100) : 0
          },
          {
            id: 'hours',
            title: 'STUDY HOURS',
            value: totalStudyHours > 0 ? totalStudyHours.toFixed(1) : '0.0',
            icon: Clock,
            badge: 'FOCUS TIME',
            accentColor: '#F59E0B',
            iconBg: 'bg-amber-500/10 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20',
            glowColor: 'bg-amber-500',
            footerLeft: 'Sanctum Log',
            footerRight: `${totalStudyHours > 0 ? totalStudyHours.toFixed(1) : '0.0'} hrs`,
            progressPercent: Math.min(100, Math.round((totalStudyHours / 20) * 100))
          },
          {
            id: 'rate',
            title: 'COMPLETION RATE',
            value: `${overallStats.completionPercentage || 0}%`,
            icon: Target,
            badge: 'MASTERY',
            accentColor: '#8B5CF6',
            iconBg: 'bg-violet-500/10 dark:bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/20',
            glowColor: 'bg-violet-500',
            footerLeft: 'Syllabus Pace',
            footerRight: `${overallStats.completionPercentage || 0}% Score`,
            progressPercent: overallStats.completionPercentage || 0
          }
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className="group relative rounded-2xl bg-white dark:bg-[#141624] border border-slate-200/80 dark:border-white/[0.08] p-4 sm:p-5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 select-none flex flex-col justify-between overflow-hidden"
            >
              {/* Subtle Ambient Radial Highlight */}
              <div
                className={`absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-15 dark:opacity-20 pointer-events-none group-hover:opacity-30 transition-opacity ${card.glowColor}`}
              />

              {/* Top Row: Category Title + Translucent Glowing Icon */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 truncate">
                  {card.title}
                </span>
                <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 border transition-transform duration-200 group-hover:scale-110 ${card.iconBg}`}>
                  <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.3]" />
                </div>
              </div>

              {/* Metric Value & Badge */}
              <div className="my-2 sm:my-3">
                <div className="flex items-baseline justify-between gap-1">
                  <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-900 dark:text-white tabular-nums">
                    {card.value}
                  </div>
                  <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-white/10 shrink-0">
                    {card.badge}
                  </span>
                </div>

                {/* Sleek Visual Progress Track */}
                <div className="mt-2.5">
                  <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.max(4, card.progressPercent)}%`,
                        backgroundColor: card.accentColor
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Footer Row */}
              <div className="pt-2.5 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between gap-2 mt-auto text-xs font-mono">
                <span className="text-slate-500 dark:text-slate-400 font-medium truncate">{card.footerLeft}</span>
                <span className="font-bold shrink-0 tabular-nums" style={{ color: card.accentColor }}>{card.footerRight}</span>
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
      <div className="w-full p-4 sm:p-6 rounded-2xl bg-white dark:bg-[#151622] border border-slate-200/80 dark:border-white/[0.08] shadow-subtle-depth flex flex-col justify-between relative overflow-hidden space-y-5">
        
        {/* Header Row */}
        <div className="relative z-10 flex items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-700/60">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-[#2563EB] to-indigo-600 dark:from-[#7AA2F7] dark:to-[#4D76D6] text-white flex items-center justify-center font-bold shadow-md shadow-[#2563EB]/20 dark:shadow-[#7AA2F7]/25 shrink-0">
              <Target className="w-4 sm:w-5 h-4 sm:h-5 stroke-[2.4]" />
            </div>
            <div>
              <h3 className="text-base font-bold font-grotesk text-slate-900 dark:text-white tracking-tight">
                Syllabus Mastery
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-300 font-medium font-mono">
                {baseExamName} • {examYear}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-xl bg-slate-50 dark:bg-[#1B243B] border border-slate-200/70 dark:border-slate-700/70 shadow-2xs shrink-0">
              <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
              <span className="text-xs font-black text-slate-900 dark:text-blue-300 font-mono">
                {profile.levelTitle || `Level ${profile.level}`}
              </span>
            </div>
            <button
              onClick={() => {
                soundManager.playClick();
                onNavigate('syllabus');
              }}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-50 dark:bg-[#1B243B] border border-slate-200/70 dark:border-slate-700/70 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/40 dark:hover:border-blue-400/40 text-xs font-bold transition-all cursor-pointer shadow-2xs active:scale-[0.97] tap-bounce"
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

              {/* Outer Track Rim */}
              <circle
                cx="70" cy="70" r={radius + 5.5}
                stroke="currentColor" strokeWidth="1"
                className="text-slate-300/40 dark:text-slate-700/50"
                fill="transparent"
              />

              {/* Main Gauge Track */}
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
              <span className="text-2xl sm:text-3xl font-black tabular-nums tracking-tight text-slate-900 dark:text-white font-mono">
                {overallStats.completionPercentage}%
              </span>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest font-mono mt-0.5">
                Mastered
              </span>
            </div>
          </div>

          {/* KPI Cards & Multi-Status Distribution */}
          <div className="w-full space-y-2 flex-1">
            <div className="grid grid-cols-2 gap-2">
              {/* Completed Topics */}
              <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-50/90 dark:bg-[#1B243B] border border-slate-200/70 dark:border-slate-700/60 shadow-2xs space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
                  <span className="flex items-center gap-1.5 uppercase tracking-wider text-xs">
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
                <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
                  <span className="flex items-center gap-1.5 uppercase tracking-wider text-xs">
                    <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                    Study Time
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-base sm:text-lg font-black tabular-nums text-blue-600 dark:text-blue-400 font-mono">
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
              <div className="flex justify-between items-center text-xs font-bold font-mono">
                <span className="text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />
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
                  className="h-full bg-blue-600 dark:bg-blue-400 transition-all duration-500"
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

        {/* Subject Mastery Breakdown */}
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

        {/* Smart Next Recommended Target HUD */}
        {nextRecommendedTopic ? (
          <div className="relative z-10 p-3 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 dark:from-blue-950/40 dark:via-indigo-950/30 dark:to-purple-950/30 border border-blue-200/80 dark:border-blue-800/50 flex items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-blue-600 dark:bg-blue-400 text-white dark:text-black flex items-center justify-center shrink-0 shadow-xs">
                <Zap className="w-4 h-4 fill-current" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Recommended Focus
                  </span>
                  <span className={`px-1.5 py-0.5 rounded-lg text-xs font-bold border ${nextRecommendedTopic.badgeColor}`}>
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

      {/* 8. PROFESSIONAL & ADVANCED HOMEPAGE FOOTER */}
      <AppFooter onNavigate={onNavigate} />
    </div>
  );
};
