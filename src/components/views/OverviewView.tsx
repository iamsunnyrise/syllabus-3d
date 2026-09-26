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

      {/* 3. 4 INFOGRAPHIC METRIC KPI CARDS (Matching Website Portal Card UI) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4.5">
        {[
          {
            stepNumber: '01',
            title: 'TOTAL TOPICS',
            value: overallStats.totalTopics || 0,
            icon: BookOpen,
            badge: 'SYLLABUS',
            description: 'All curriculum topics tracked across subjects.',
            gradient: 'linear-gradient(135deg, #10B981 0%, #059669 55%, #047857 100%)',
            accentColor: '#10B981',
            footerLeft: 'Active Topics',
            footerRight: `${overallStats.totalTopics || 0} Total`
          },
          {
            stepNumber: '02',
            title: 'COMPLETED',
            value: overallStats.completedCount || 0,
            icon: CheckCircle2,
            badge: 'MASTERED',
            description: 'Topics mastered with complete revisions.',
            gradient: 'linear-gradient(135deg, #0284C7 0%, #0369A1 55%, #075985 100%)',
            accentColor: '#0284C7',
            footerLeft: 'Completed',
            footerRight: `${overallStats.completedCount || 0} Done`
          },
          {
            stepNumber: '03',
            title: 'STUDY HOURS',
            value: totalStudyHours > 0 ? totalStudyHours.toFixed(1) : '0.0',
            icon: Clock,
            badge: 'LOGGED TIME',
            description: 'Total focus hours dedicated to study sanctum.',
            gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 55%, #B45309 100%)',
            accentColor: '#F59E0B',
            footerLeft: 'Focus Hours',
            footerRight: `${totalStudyHours > 0 ? totalStudyHours.toFixed(1) : '0.0'} hrs`
          },
          {
            stepNumber: '04',
            title: 'COMPLETION RATE',
            value: `${overallStats.completionPercentage || 0}%`,
            icon: Target,
            badge: 'MASTERY',
            description: 'Cumulative progress across current syllabus.',
            gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 55%, #6D28D9 100%)',
            accentColor: '#8B5CF6',
            footerLeft: 'Overall Rate',
            footerRight: `${overallStats.completionPercentage || 0}%`
          }
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.stepNumber}
              className="group relative rounded-2xl sm:rounded-3xl bg-slate-100/90 dark:bg-[#121422] p-1.5 sm:p-2 border border-slate-200/90 dark:border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.05),0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 select-none flex flex-col"
            >
              {/* Inner Elevated Card Plate */}
              <div className="relative w-full rounded-xl sm:rounded-2xl bg-white dark:bg-[#181A2A] border border-slate-200/70 dark:border-white/[0.07] shadow-xs flex flex-col overflow-hidden flex-1">
                
                {/* TOP STEP INFOGRAPHIC BLOCK */}
                <div
                  className="relative w-full py-3 sm:py-4 px-3 flex items-center justify-center text-center overflow-hidden select-none"
                  style={{ background: card.gradient }}
                >
                  {/* Top Gloss Highlight Edge (Signature Infographic Detail from Reference) */}
                  <div className="absolute top-0 left-0 right-0 h-1 sm:h-1.5 bg-white/40 pointer-events-none" />
                  <div className="absolute -top-10 -left-10 w-24 h-24 bg-white/20 rounded-full blur-xl pointer-events-none" />
                  
                  {/* Pure Centered Number (Without 'STEP') */}
                  <span className="text-3xl sm:text-4xl md:text-5xl font-black font-mono text-white tracking-tighter leading-none drop-shadow-md">
                    {card.stepNumber}
                  </span>
                </div>

                {/* MAIN CONTENT AREA */}
                <div className="p-3 sm:p-4 flex flex-col justify-between flex-1 space-y-2.5">
                  
                  {/* Header Row: Title | Icon */}
                  <div className="flex items-center justify-between gap-1.5 min-w-0">
                    <div className="flex items-center gap-1.5 min-w-0 flex-1">
                      <h2
                        className="text-[11px] sm:text-xs font-black uppercase tracking-tight truncate font-sans text-slate-900 dark:text-white"
                        style={{ color: card.accentColor }}
                        title={card.title}
                      >
                        {card.title}
                      </h2>

                      <span className="text-slate-300 dark:text-slate-600 font-light select-none text-xs shrink-0">
                        |
                      </span>

                      <div
                        className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                        style={{ color: card.accentColor }}
                      >
                        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 drop-shadow-xs" />
                      </div>
                    </div>

                    {/* Category / Scope Pill Badge */}
                    <span className="px-1.5 sm:px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 shrink-0">
                      {card.badge}
                    </span>
                  </div>

                  {/* Middle Row: Signature 4-Dot Infographic Track + Metric Value */}
                  <div className="flex items-baseline justify-between gap-1 select-none py-0.5">
                    <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-900 dark:text-white tabular-nums">
                      {card.value}
                    </div>

                    {/* Signature 4-Dot Track */}
                    <div className="flex items-center gap-1 shrink-0">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: card.accentColor }} />
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: card.accentColor }} />
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: card.accentColor }} />
                      <span className="w-2 h-2 rounded-full opacity-35" style={{ backgroundColor: card.accentColor }} />
                    </div>
                  </div>

                  {/* Description Text (Crisp, High Contrast) */}
                  <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 font-medium line-clamp-1 leading-relaxed">
                    {card.description}
                  </p>

                  {/* Bottom Row: Metric Scope Info Line */}
                  <div className="pt-2 border-t border-slate-100 dark:border-white/[0.08] flex items-center justify-between gap-2 mt-auto text-[10px] sm:text-[11px] font-mono">
                    <span className="text-slate-500 dark:text-slate-400 font-semibold truncate">{card.footerLeft}</span>
                    <span className="font-bold shrink-0" style={{ color: card.accentColor }}>{card.footerRight}</span>
                  </div>
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
      <div className="w-full p-4 sm:p-6 rounded-2xl bg-white dark:bg-[#151622] border border-slate-200/80 dark:border-white/[0.08] shadow-subtle-depth flex flex-col justify-between relative overflow-hidden space-y-5">
        
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

      {/* 8. PROFESSIONAL & ADVANCED HOMEPAGE FOOTER */}
      <AppFooter onNavigate={onNavigate} />
    </div>
  );
};
