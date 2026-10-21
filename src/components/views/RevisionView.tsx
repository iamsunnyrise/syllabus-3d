import React, { useState, useMemo } from 'react';
import { useSyllabus } from '../../context/SyllabusContext';
import {
  RotateCw,
  Play,
  Calendar,
  Filter,
  Search,
  X,
  Trophy,
  ArrowRight,
  Clock,
  Zap,
  BrainCircuit,
  ShieldCheck,
  Layers,
  Sparkles,
  Calculator,
  Globe,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Flame,
  FileText,
  AlertTriangle,
  Target
} from 'lucide-react';
import { getTodayDateString, formatDateReadable, isDatePastOrToday } from '../../utils/dateUtils';
import { RevisionRecord, Topic } from '../../types/syllabus';
import { SectionBadgeIcon } from '../common/SectionBadgeIcon';
import { soundManager } from '../../utils/soundEffects';

interface RevisionViewProps {
  onOpenRevisionSession: () => void;
  onOpenWalkAndRevise?: () => void;
  onOpenTopicDrawer?: (topic: Topic, subName: string, chName: string) => void;
  onOpenFocus?: (topicId?: string) => void;
  onNavigate?: (view: any) => void;
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

export const RevisionView: React.FC<RevisionViewProps> = ({
  onOpenRevisionSession,
  onOpenWalkAndRevise,
  onOpenTopicDrawer,
  onOpenFocus,
  onNavigate
}) => {
  const { revisions, dueRevisions, allTopics, currentExam, resyncAllRevisions } = useSyllabus();
  const [justSynced, setJustSynced] = useState(false);

  const [activeTab, setActiveTab] = useState<'today' | 'upcoming' | 'history'>('today');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const today = getTodayDateString();

  // Filtered lists
  const dueList = useMemo(() => {
    return revisions.filter(r => !r.completedDate && (isDatePastOrToday ? isDatePastOrToday(r.scheduledDate) : r.scheduledDate <= today));
  }, [revisions, today]);

  const upcomingList = useMemo(() => {
    return revisions.filter(r => !r.completedDate && r.scheduledDate > today);
  }, [revisions, today]);

  const historyList = useMemo(() => {
    return revisions.filter(r => r.completedDate);
  }, [revisions]);

  // Subject Icon & Theme Meta
  const getSubjectMeta = (name: string, fallbackColor?: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('quant') || lower.includes('math')) {
      return {
        icon: Calculator,
        color: fallbackColor || '#EF4444',
        border: 'border-red-500/25 dark:border-red-500/30',
        text: 'text-red-600 dark:text-red-400',
        bg: 'bg-red-500/10 dark:bg-red-500/15',
        gradient: 'from-red-500/10 to-red-500/20 dark:from-[#3b0b11] dark:to-[#25070b]'
      };
    }
    if (lower.includes('gk') || lower.includes('general awareness') || lower.includes('knowledge') || lower.includes('gs') || lower.includes('pyq')) {
      return {
        icon: Globe,
        color: fallbackColor || '#0EA5E9',
        border: 'border-sky-500/25 dark:border-sky-500/30',
        text: 'text-sky-600 dark:text-sky-400',
        bg: 'bg-sky-500/10 dark:bg-sky-500/15',
        gradient: 'from-sky-500/10 to-sky-500/20 dark:from-[#0c2340] dark:to-[#08172c]'
      };
    }
    if (lower.includes('reasoning') || lower.includes('intelligence')) {
      return {
        icon: BrainCircuit,
        color: fallbackColor || '#A855F7',
        border: 'border-purple-500/25 dark:border-purple-500/30',
        text: 'text-purple-600 dark:text-purple-400',
        bg: 'bg-purple-500/10 dark:bg-purple-500/15',
        gradient: 'from-purple-500/10 to-purple-500/20 dark:from-[#2a134a] dark:to-[#1a0c2e]'
      };
    }
    if (lower.includes('english') || lower.includes('editorial') || lower.includes('comprehension')) {
      return {
        icon: BookOpen,
        color: fallbackColor || '#10B981',
        border: 'border-emerald-500/25 dark:border-emerald-500/30',
        text: 'text-emerald-600 dark:text-emerald-400',
        bg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
        gradient: 'from-emerald-500/10 to-emerald-500/20 dark:from-[#0a3225] dark:to-[#062017]'
      };
    }
    return {
      icon: Layers,
      color: fallbackColor || '#6366F1',
      border: 'border-indigo-500/25 dark:border-indigo-500/30',
      text: 'text-indigo-600 dark:text-indigo-400',
      bg: 'bg-indigo-500/10 dark:bg-indigo-500/15',
      gradient: 'from-indigo-500/10 to-indigo-500/20 dark:from-[#181926] dark:to-[#12131d]'
    };
  };

  const getDaysDiffFromToday = (dateStr: string, todayStr: string): number => {
    try {
      const t = new Date(todayStr).getTime();
      const d = new Date(dateStr).getTime();
      return Math.round((d - t) / (1000 * 60 * 60 * 24));
    } catch {
      return 0;
    }
  };

  const getRelativeScheduleText = (dateStr: string, todayStr: string): string => {
    const diff = getDaysDiffFromToday(dateStr, todayStr);
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Tomorrow';
    if (diff > 1) return `In ${diff} days`;
    if (diff === -1) return '1 day overdue';
    if (diff < -1) return `${Math.abs(diff)} days overdue`;
    return 'Upcoming';
  };

  // Stage Meta & Styling
  const getStageMeta = (stage: number) => {
    switch (stage) {
      case 1:
        return {
          label: 'Stage 1 • 1d',
          phase: 'Initial Recall',
          subtitle: 'Fresh concepts learned',
          badgeClass: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/25',
          accent: '#3B82F6',
          icon: Zap
        };
      case 2:
        return {
          label: 'Stage 2 • 3d',
          phase: 'Consolidation',
          subtitle: 'Memory reinforcing',
          badgeClass: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/25',
          accent: '#F59E0B',
          icon: Flame
        };
      case 3:
        return {
          label: 'Stage 3 • 7d',
          phase: 'Long-Term',
          subtitle: 'Core memory recall',
          badgeClass: 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/25',
          accent: '#A855F7',
          icon: BrainCircuit
        };
      case 4:
      default:
        return {
          label: 'Stage 4 • 21d+',
          phase: 'Permanently Locked',
          subtitle: 'Exam-ready recall',
          badgeClass: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/25',
          accent: '#10B981',
          icon: ShieldCheck
        };
    }
  };

  // Apply Subject & Search Filters
  const filterRecordList = (list: RevisionRecord[]) => {
    return list.filter(r => {
      const matchesSubject = selectedSubjectFilter === 'all' || r.subjectName === selectedSubjectFilter;
      const matchesSearch =
        searchQuery.trim() === '' ||
        r.topicName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.chapterName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSubject && matchesSearch;
    });
  };

  const displayedDue = useMemo(() => filterRecordList(dueList), [dueList, selectedSubjectFilter, searchQuery]);
  const displayedUpcoming = useMemo(() => filterRecordList(upcomingList), [upcomingList, selectedSubjectFilter, searchQuery]);
  const displayedHistory = useMemo(() => filterRecordList(historyList), [historyList, selectedSubjectFilter, searchQuery]);

  // 4-Stage Retention Pipeline Breakdown
  const stage1Count = revisions.filter(r => r.stage === 1 && !r.completedDate).length;
  const stage2Count = revisions.filter(r => r.stage === 2 && !r.completedDate).length;
  const stage3Count = revisions.filter(r => r.stage === 3 && !r.completedDate).length;
  const stage4Count = revisions.filter(r => r.stage >= 4 || r.completedDate).length;

  const renderRevisionCard = (rev: RevisionRecord, type: 'today' | 'upcoming' | 'history') => {
    const topicObj = allTopics.find(t => t.topic.id === rev.topicId);
    const meta = getSubjectMeta(rev.subjectName);
    const SubjIcon = meta.icon;
    const stageMeta = getStageMeta(rev.stage);
    const difficulty = topicObj?.topic.difficulty || 'Medium';
    const isWeak = topicObj?.topic.isWeak || topicObj?.topic.status === 'weak';
    const accuracy = topicObj?.topic.accuracy;
    const isOverdue = rev.scheduledDate < today;

    // High-contrast difficulty pill styling
    const diffLower = difficulty.toLowerCase();
    const diffBadgeClass = diffLower === 'hard'
      ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/25'
      : diffLower === 'easy'
      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25'
      : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25';

    return (
      <div
        key={rev.id}
        className="group relative rounded-2xl bg-white dark:bg-[#121422] border border-slate-200/90 dark:border-white/[0.08] hover:border-indigo-500/50 dark:hover:border-indigo-400/40 p-4 sm:px-5 sm:py-4 transition-all duration-200 hover:shadow-lg dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-3.5 sm:gap-4 w-full"
      >
        {/* Subtle Left Accent Line showing stage/status */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1.5 transition-all group-hover:w-2"
          style={{ backgroundColor: type === 'history' ? '#10B981' : stageMeta.accent }}
        />

        {/* Left Section: Subject Icon + Topic Details + Full Breadcrumb Path */}
        <div
          onClick={() => {
            if (onOpenTopicDrawer && topicObj) {
              onOpenTopicDrawer(topicObj.topic, rev.subjectName, rev.chapterName);
            }
          }}
          className={`flex items-start sm:items-center gap-3.5 sm:gap-4 min-w-0 flex-1 pl-1 ${
            onOpenTopicDrawer && topicObj ? 'cursor-pointer' : ''
          }`}
        >
          {/* Subject Icon Badge */}
          <div
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl ${meta.bg} border ${meta.border} ${meta.text} flex items-center justify-center shrink-0 shadow-2xs mt-0.5 sm:mt-0`}
          >
            <SubjIcon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
          </div>

          {/* Topic Title & Breadcrumbs */}
          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight">
                {toNaturalCase(rev.topicName)}
              </h2>
              {isWeak && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] sm:text-[11px] font-black rounded-lg bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 whitespace-nowrap">
                  <AlertTriangle className="w-3 h-3 stroke-[2.5]" />
                  <span>Weak Focus</span>
                </span>
              )}
            </div>

            {/* Full Breadcrumb Path: Subject › Chapter (no truncation on wide row!) */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 flex-wrap font-medium">
              <span className="font-bold text-slate-800 dark:text-slate-200">
                {toNaturalCase(rev.subjectName)}
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 shrink-0" />
              <span className="text-slate-600 dark:text-slate-300 font-semibold">
                {toNaturalCase(rev.chapterName)}
              </span>
            </div>
          </div>
        </div>

        {/* Center / Right Section: Badges Cluster & Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between lg:justify-end gap-3 sm:gap-4 shrink-0 pl-1 lg:pl-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-white/[0.06]">
          
          {/* Metadata Badges Cluster */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap shrink-0">
            {/* Stage Pill */}
            {type === 'history' ? (
              <span className="px-2.5 py-1 text-xs font-sans font-black rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 shrink-0 whitespace-nowrap">
                <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Mastered</span>
              </span>
            ) : (
              <span className={`px-2.5 py-1 text-xs font-sans font-bold rounded-xl border flex items-center gap-1.5 shrink-0 whitespace-nowrap ${stageMeta.badgeClass}`}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: stageMeta.accent }} />
                <span>{stageMeta.label}</span>
              </span>
            )}

            {/* Schedule / Overdue Badge */}
            {type === 'history' ? (
              <span className="px-2.5 py-1 text-xs font-medium rounded-xl bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 flex items-center gap-1.5 shrink-0 whitespace-nowrap">
                <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                <span>{rev.completedDate ? `Mastered ${formatDateReadable(rev.completedDate)}` : 'Retained in Vault'}</span>
              </span>
            ) : isOverdue ? (
              <span className="px-2.5 py-1 text-xs font-bold rounded-xl bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 flex items-center gap-1.5 shrink-0 whitespace-nowrap animate-pulse">
                <Clock className="w-3.5 h-3.5 stroke-[2.4]" />
                <span>Overdue ({getRelativeScheduleText(rev.scheduledDate, today)})</span>
              </span>
            ) : (
              <span className="px-2.5 py-1 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 flex items-center gap-1.5 shrink-0 whitespace-nowrap">
                <Clock className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                <span>{formatDateReadable(rev.scheduledDate)}</span>
                <span className="text-[11px] text-slate-400 dark:text-slate-500">
                  ({getRelativeScheduleText(rev.scheduledDate, today)})
                </span>
              </span>
            )}

            {/* Difficulty Badge */}
            {type !== 'history' && (
              <span className={`px-2.5 py-1 text-xs font-bold rounded-xl border flex items-center gap-1.5 shrink-0 whitespace-nowrap ${diffBadgeClass}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                <span className="capitalize">{difficulty}</span>
              </span>
            )}

            {/* Accuracy Badge */}
            {accuracy !== undefined && accuracy > 0 && (
              <span className="px-2.5 py-1 text-xs font-sans font-bold tabular-nums rounded-xl bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20 flex items-center gap-1.5 shrink-0 whitespace-nowrap">
                <Target className="w-3.5 h-3.5 text-indigo-500" />
                <span>{accuracy}% acc</span>
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0 sm:pl-2 sm:border-l sm:border-slate-200/80 sm:dark:border-white/10">
            {onOpenTopicDrawer && topicObj && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  soundManager.playClick?.();
                  onOpenTopicDrawer(topicObj.topic, rev.subjectName, rev.chapterName);
                }}
                className="px-3.5 py-2 rounded-xl border border-slate-200/90 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 bg-slate-100/80 dark:bg-white/[0.05] hover:bg-slate-200/80 dark:hover:bg-white/[0.09] text-slate-700 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer active:scale-95 shrink-0 shadow-2xs"
                title="View Topic Details"
                aria-label={`Inspect ${rev.topicName}`}
              >
                Inspect
              </button>
            )}

            {type === 'today' && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  soundManager.playClick?.();
                  onOpenRevisionSession();
                }}
                className="px-4 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-indigo-600 via-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all shrink-0 shadow-sm shadow-indigo-500/30 border border-indigo-400/30"
                aria-label={`Review card for ${rev.topicName}`}
              >
                <RotateCw className="w-3.5 h-3.5 stroke-[2.4]" />
                <span>Review</span>
              </button>
            )}
          </div>

        </div>
      </div>
    );
  };
  return (
    <div className="space-y-4 sm:space-y-6 pb-40 sm:pb-28 w-full max-w-7xl mx-auto font-sans animate-fade-in px-1 sm:px-2">
      
      {/* 🖨️ PRINT-ONLY SPACED REPETITION DESK CHEATSHEET */}
      <div className="hidden print:block mb-6 pb-4 border-b-2 border-black">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-gray-700 block">
              Ebbinghaus Retention • Physical Desk Cheatsheet
            </span>
            <h1 className="text-2xl font-black uppercase tracking-tight text-black mt-1">
              Spaced Repetition &amp; Memory Retention Queue
            </h1>
          </div>
          <div className="text-right text-xs font-mono text-gray-600">
            <div>DUE: {dueRevisions.length} TOPICS</div>
            <div>STAGES: 1d({stage1Count}) • 3d({stage2Count}) • 7d({stage3Count}) • 21d+({stage4Count})</div>
          </div>
        </div>
      </div>

      {/* 1. EXECUTIVE HERO BANNER */}
      <div className="relative rounded-2xl sm:rounded-3xl bg-white dark:bg-[#181822] border border-slate-200/80 dark:border-white/[0.08] shadow-xs overflow-hidden">
        {/* Executive Specular Top Highlight and Gradient Accent */}
        <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 opacity-90" />
        
        <div className="p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
            
            {/* Title and Icon Capsule */}
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <SectionBadgeIcon section="revision" size="lg" className="shrink-0" />

              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                  Spaced Revision
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  Review topics at smart intervals for permanent retention.
                </p>
              </div>
            </div>

            {/* Right Action Cluster */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 justify-end">
              {/* Sync Button */}
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  resyncAllRevisions();
                  setJustSynced(true);
                  setTimeout(() => setJustSynced(false), 2200);
                }}
                title="Resync revision queue with syllabus topics"
                className={`h-9 sm:h-10 px-3.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95 ${
                  justSynced
                    ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                    : 'bg-white dark:bg-white/[0.04] hover:bg-slate-50 dark:hover:bg-white/[0.08] border-slate-200/90 dark:border-white/10 text-slate-700 dark:text-slate-200'
                }`}
              >
                <RotateCw className={`w-3.5 h-3.5 ${justSynced ? 'text-emerald-500 animate-spin' : 'text-slate-400'}`} />
                <span>{justSynced ? 'Synced' : 'Sync'}</span>
              </button>

              {/* Primary Action: Start Due Revision or All Cleared */}
              <button
                type="button"
                onClick={() => {
                  if (dueRevisions.length > 0) {
                    soundManager.playClick();
                    onOpenRevisionSession();
                  }
                }}
                disabled={dueRevisions.length === 0}
                className={`h-9 sm:h-10 px-4 sm:px-5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  dueRevisions.length > 0
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/25 cursor-pointer active:scale-95'
                    : 'bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25 shadow-xs cursor-default'
                }`}
              >
                {dueRevisions.length > 0 ? (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current shrink-0 text-white" />
                    <span>Start Revision ({dueRevisions.length})</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>All Revisions Cleared</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 4-STAGE RETENTION PIPELINE BENTO CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        {/* Stage 1 */}
        <div className="group relative p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#181822] border border-slate-200/80 dark:border-white/[0.08] hover:border-blue-500/40 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between gap-1">
            <span className="px-2 py-0.5 text-xs font-sans font-bold rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 whitespace-nowrap">
              Stage 1 • 1d
            </span>
            <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 flex items-center justify-center shrink-0">
              <Zap className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black font-sans tabular-nums text-slate-900 dark:text-white leading-none tracking-tight">
                {stage1Count}
              </span>
              <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                topics
              </span>
            </div>
            <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-1 truncate">
              Initial Recall
            </p>
          </div>
        </div>

        {/* Stage 2 */}
        <div className="group relative p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#181822] border border-slate-200/80 dark:border-white/[0.08] hover:border-amber-500/40 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between gap-1">
            <span className="px-2 py-0.5 text-xs font-sans font-bold rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 whitespace-nowrap">
              Stage 2 • 3d
            </span>
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0">
              <Flame className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black font-sans tabular-nums text-slate-900 dark:text-white leading-none tracking-tight">
                {stage2Count}
              </span>
              <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                topics
              </span>
            </div>
            <p className="text-xs font-bold text-amber-600 dark:text-amber-400 mt-1 truncate">
              Consolidation
            </p>
          </div>
        </div>

        {/* Stage 3 */}
        <div className="group relative p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#181822] border border-slate-200/80 dark:border-white/[0.08] hover:border-purple-500/40 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between gap-1">
            <span className="px-2 py-0.5 text-xs font-sans font-bold rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 whitespace-nowrap">
              Stage 3 • 7d
            </span>
            <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 flex items-center justify-center shrink-0">
              <BrainCircuit className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black font-sans tabular-nums text-slate-900 dark:text-white leading-none tracking-tight">
                {stage3Count}
              </span>
              <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                topics
              </span>
            </div>
            <p className="text-xs font-bold text-purple-600 dark:text-purple-400 mt-1 truncate">
              Long-Term
            </p>
          </div>
        </div>

        {/* Stage 4 / Mastered */}
        <div className="group relative p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#181822] border border-slate-200/80 dark:border-white/[0.08] hover:border-emerald-500/40 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between gap-1">
            <span className="px-2 py-0.5 text-xs font-sans font-bold rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
              Stage 4 • 21d+
            </span>
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0" title="Mastered Vault">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black font-sans tabular-nums text-slate-900 dark:text-white leading-none tracking-tight">
                {stage4Count}
              </span>
              <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                topics
              </span>
            </div>
            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1 truncate">
              Mastered
            </p>
          </div>
        </div>
      </div>

      {/* 3. SEARCH & QUEUE FILTER TOOLBAR */}
      <div className="p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#181822] border border-slate-200/80 dark:border-white/[0.08] shadow-xs space-y-3">
        
        {/* Tabs & Search Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
          
          {/* Queue Tab Switchers (Primary Filter) */}
          <div
            role="tablist"
            aria-label="Revision Queue Tabs"
            className="flex items-center gap-1 p-1 rounded-xl bg-slate-100/90 dark:bg-[#1B1C28] border border-slate-200/80 dark:border-white/10 overflow-x-auto no-scrollbar shrink-0"
          >
            {[
              { id: 'today', label: 'Due Today', count: dueList.length, icon: Clock },
              { id: 'upcoming', label: 'Upcoming', count: upcomingList.length, icon: Calendar },
              { id: 'history', label: 'Mastered Vault', count: historyList.length, icon: Trophy },
            ].map(tab => {
              const TabIcon = tab.icon;
              const isSel = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isSel}
                  onClick={() => {
                    soundManager.playClick();
                    setActiveTab(tab.id as any);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 active:scale-95 ${
                    isSel
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/[0.06]'
                  }`}
                >
                  <TabIcon className="w-3.5 h-3.5 shrink-0" />
                  <span>{tab.label}</span>
                  <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-sans font-black tabular-nums ${
                    isSel
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-200 dark:bg-white/[0.08] text-slate-600 dark:text-slate-400'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Clean Bounded Search Input */}
          <div className="relative w-full sm:w-80 md:w-96 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search topics..."
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-slate-50 dark:bg-[#1B1C28] border border-slate-200 dark:border-white/10 text-xs sm:text-[13px] font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 shadow-2xs transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 dark:hover:text-white p-1 rounded-lg cursor-pointer"
                title="Clear search"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Subject Filter Pills */}
        {currentExam && currentExam.subjects.length > 0 && (
          <div
            role="group"
            aria-label="Filter queue by subject"
            className="flex items-center gap-1.5 overflow-x-auto pt-2.5 border-t border-slate-100 dark:border-white/10 no-scrollbar"
          >
            <button
              onClick={() => {
                soundManager.playClick();
                setSelectedSubjectFilter('all');
              }}
              aria-pressed={selectedSubjectFilter === 'all'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer shrink-0 active:scale-95 ${
                selectedSubjectFilter === 'all'
                  ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-500/50 shadow-2xs font-bold ring-1 ring-indigo-500/30'
                  : 'bg-slate-50 dark:bg-[#1B1C28] text-slate-600 dark:text-slate-300 border-slate-200/80 dark:border-white/10 hover:border-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5 shrink-0" />
              <span>All ({revisions.length})</span>
            </button>

            {currentExam.subjects.map(s => {
              const count = revisions.filter(r => r.subjectName === s.name).length;
              const isSelected = selectedSubjectFilter === s.name;
              const meta = getSubjectMeta(s.name, s.color);
              const SubjIcon = meta.icon;

              return (
                <button
                  key={s.id}
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedSubjectFilter(s.name);
                  }}
                  aria-pressed={isSelected}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer shrink-0 active:scale-95 ${
                    isSelected
                      ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-500/50 shadow-2xs font-bold ring-1 ring-indigo-500/30'
                      : 'bg-slate-50 dark:bg-[#1B1C28] text-slate-600 dark:text-slate-300 border-slate-200/80 dark:border-white/10 hover:border-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <SubjIcon className="w-3.5 h-3.5 shrink-0" style={{ color: isSelected ? undefined : meta.color }} />
                  <span>{toNaturalCase(s.name)}</span>
                  <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-sans font-bold tabular-nums ${
                    isSelected ? 'bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-bold' : 'bg-slate-200 dark:bg-white/[0.08] text-slate-600 dark:text-slate-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. REVISION CARDS QUEUE */}
      <div className="space-y-4">
        
        {/* DUE TODAY LIST */}
        {activeTab === 'today' && (
          displayedDue.length > 0 ? (
            <div className="flex flex-col gap-3 w-full">
              {displayedDue.map(rev => renderRevisionCard(rev, 'today'))}
            </div>
          ) : (
            /* Motivating Empty State */
            <div className="py-10 sm:py-14 px-6 text-center rounded-2xl bg-white/95 dark:bg-[#121424]/95 border border-slate-200/90 dark:border-white/10 shadow-xs space-y-3 w-full max-w-lg mx-auto relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto shadow-2xs">
                <Trophy className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="space-y-1">
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
                  All Revisions Cleared! 🎉
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                  Your revision queue is up to date. You can review upcoming topics early or explore the Mastered Vault.
                </p>
              </div>

              {/* Quick Action Buttons */}
              <div className="flex items-center justify-center gap-2.5 flex-wrap pt-2">
                {upcomingList.length > 0 && (
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setActiveTab('upcoming');
                    }}
                    className="btn-primary px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-[13px] font-bold inline-flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-xs"
                  >
                    <Clock className="w-3.5 h-3.5 text-amber-300" />
                    <span>Review Upcoming Early ({upcomingList.length})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                {historyList.length > 0 && (
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setActiveTab('history');
                    }}
                    className="btn-secondary px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-[13px] font-semibold inline-flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-2xs"
                  >
                    <Trophy className="w-3.5 h-3.5 text-emerald-500" />
                    <span>View Mastered Vault ({historyList.length})</span>
                  </button>
                )}

                {onNavigate && (
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      onNavigate('syllabus');
                    }}
                    className="btn-secondary px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-[13px] font-semibold inline-flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-2xs"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-sky-500" />
                    <span>Explore Full Syllabus</span>
                  </button>
                )}
              </div>
            </div>
          )
        )}

        {/* UPCOMING LIST */}
        {activeTab === 'upcoming' && (
          displayedUpcoming.length > 0 ? (
            <div className="flex flex-col gap-3 w-full">
              {displayedUpcoming.map(rev => renderRevisionCard(rev, 'upcoming'))}
            </div>
          ) : (
            <div className="py-10 sm:py-16 px-6 text-center rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#121424]/95 border border-dashed border-slate-200/90 dark:border-white/10 shadow-xs sm:shadow-sm space-y-4 w-full max-w-2xl mx-auto relative overflow-hidden">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 flex items-center justify-center mx-auto shadow-xs">
                <Clock className="w-8 h-8 stroke-[1.8]" />
              </div>
              <div className="space-y-1.5">
                <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
                  No Upcoming Revisions Queued
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto font-normal leading-relaxed">
                  You're all caught up on scheduled reviews! New spaced repetition intervals will automatically appear here as you study topics.
                </p>
              </div>
              {dueRevisions.length > 0 && (
                <div className="pt-1">
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setActiveTab('today');
                    }}
                    className="btn-primary px-5 py-2.5 rounded-xl text-xs sm:text-[13px] font-bold inline-flex items-center gap-2 cursor-pointer active:scale-95 shadow-xs"
                  >
                    <span>View Due Today ({dueRevisions.length})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )
        )}

        {/* MASTERED VAULT LIST */}
        {activeTab === 'history' && (
          displayedHistory.length > 0 ? (
            <div className="flex flex-col gap-3 w-full">
              {displayedHistory.map(rev => renderRevisionCard(rev, 'history'))}
            </div>
          ) : (
            <div className="py-10 sm:py-16 px-6 text-center rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#121424]/95 border border-dashed border-slate-200/90 dark:border-white/10 shadow-xs sm:shadow-sm space-y-4 w-full max-w-2xl mx-auto relative overflow-hidden">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 dark:text-amber-400 border border-amber-500/20 flex items-center justify-center mx-auto shadow-xs">
                <Trophy className="w-8 h-8 stroke-[1.8]" />
              </div>
              <div className="space-y-1.5">
                <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
                  Mastered Vault is Empty
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto font-normal leading-relaxed">
                  Topics reach the Mastered Vault once you complete Stage 4 (30 days retention cycle). Keep revising your active topics!
                </p>
              </div>
              <div className="pt-1">
                <button
                  onClick={() => {
                    soundManager.playClick();
                    setActiveTab('today');
                  }}
                  className="btn-primary px-5 py-2.5 rounded-xl text-xs sm:text-[13px] font-bold inline-flex items-center gap-2 cursor-pointer active:scale-95 shadow-xs"
                >
                  <span>Go to Active Queue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};


