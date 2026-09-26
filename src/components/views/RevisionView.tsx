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
  Footprints,
  Headphones
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

    return (
      <div
        key={rev.id}
        className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#121424] border border-slate-200/90 dark:border-white/10 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 shadow-xs hover:shadow-md transition-all group relative overflow-hidden flex flex-col justify-between gap-3"
      >
        {/* Subtle Left Accent Line showing stage/status */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1 opacity-80 group-hover:opacity-100 transition-opacity"
          style={{ backgroundColor: type === 'history' ? '#10B981' : stageMeta.accent }}
        />

        {/* Top Section: Subject Icon + Topic Details */}
        <div
          onClick={() => {
            if (onOpenTopicDrawer && topicObj) {
              onOpenTopicDrawer(topicObj.topic, rev.subjectName, rev.chapterName);
            }
          }}
          className={`flex items-start gap-3 min-w-0 pl-1 ${onOpenTopicDrawer && topicObj ? 'cursor-pointer' : ''}`}
        >
          {/* Subject Icon */}
          <div
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl ${meta.bg} border ${meta.border} ${meta.text} flex items-center justify-center shrink-0 mt-0.5 shadow-2xs`}
          >
            <SubjIcon className="w-5 h-5 stroke-[2.2]" />
          </div>

          {/* Content Block */}
          <div className="min-w-0 flex-1 space-y-1">
            {/* Row 1: Topic Title + Stage/Mastered Badge */}
            <div className="flex items-start justify-between gap-2">
              <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug line-clamp-2">
                {toNaturalCase(rev.topicName)}
              </h2>
              {type === 'history' ? (
                <span className="px-2 py-0.5 text-[10px] sm:text-[11px] font-sans font-bold rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 shrink-0 whitespace-nowrap">
                  ✓ Mastered
                </span>
              ) : (
                <span className={`px-2 py-0.5 text-[10px] sm:text-[11px] font-sans font-bold rounded-lg border shrink-0 whitespace-nowrap ${stageMeta.badgeClass}`}>
                  {stageMeta.label}
                </span>
              )}
            </div>

            {/* Row 2: Breadcrumb (Subject › Chapter) */}
            <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 min-w-0">
              <span className="font-bold text-slate-700 dark:text-slate-200 shrink-0">
                {toNaturalCase(rev.subjectName)}
              </span>
              <ChevronRight className="w-3 h-3 text-slate-400 dark:text-slate-600 shrink-0" />
              <span className="truncate font-medium">
                {toNaturalCase(rev.chapterName)}
              </span>
            </div>

            {/* Row 3: Metadata Badges (Weak, Overdue, Difficulty, Accuracy) */}
            {type !== 'history' && (
              <div className="flex items-center gap-1.5 flex-wrap pt-0.5 text-[11px]">
                {isOverdue && (
                  <span className="px-1.5 py-0.5 text-[10px] font-sans font-bold rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 whitespace-nowrap flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" />
                    <span>Overdue</span>
                  </span>
                )}

                {isWeak && (
                  <span className="px-1.5 py-0.5 text-[10px] font-sans font-bold rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1 whitespace-nowrap">
                    <AlertTriangle className="w-2.5 h-2.5" />
                    <span>Weak</span>
                  </span>
                )}

                <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
                  difficulty.toLowerCase() === 'hard'
                    ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                    : difficulty.toLowerCase() === 'easy'
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                    : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  <span className="capitalize">{difficulty}</span>
                </span>

                {accuracy !== undefined && accuracy > 0 && (
                  <span className="px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-[10px] font-sans font-bold tabular-nums text-slate-600 dark:text-slate-300">
                    {accuracy}% acc
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Row 4 (Footer): Schedule Info on Left + Action Buttons on Right */}
        <div className="flex items-center justify-between gap-2 w-full pt-2.5 pl-1 border-t border-slate-100 dark:border-white/10">
          {/* Left: Schedule Date / Status */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 min-w-0">
            <Calendar className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400 shrink-0" />
            {type === 'history' ? (
              <span className="font-semibold text-slate-700 dark:text-slate-300 truncate">
                {rev.completedDate ? `Mastered ${formatDateReadable(rev.completedDate)}` : 'Retained in Vault'}
              </span>
            ) : (
              <span className="font-semibold text-slate-700 dark:text-slate-300 truncate">
                {formatDateReadable(rev.scheduledDate)}
                <span className="ml-1.5 text-[11px] font-medium text-slate-400 dark:text-slate-500">
                  ({getRelativeScheduleText(rev.scheduledDate, today)})
                </span>
              </span>
            )}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {onOpenTopicDrawer && topicObj && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  soundManager.playClick?.();
                  onOpenTopicDrawer(topicObj.topic, rev.subjectName, rev.chapterName);
                }}
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.08] text-xs font-bold transition-all cursor-pointer active:scale-95 shrink-0"
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
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#4F46E5] hover:bg-[#4338CA] text-white flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all shrink-0 shadow-xs"
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
    <div className="space-y-4 sm:space-y-6 pb-40 sm:pb-28 max-w-4xl mx-auto font-sans animate-fade-in">
      
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
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#151622] border border-slate-200/90 dark:border-white/10 shadow-sm space-y-3.5 sm:space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3.5 sm:gap-4">
          
          {/* Title and Icon Capsule */}
          <div className="flex items-start sm:items-center gap-3 sm:gap-3.5 min-w-0">
            <SectionBadgeIcon section="revision" size="lg" className="shrink-0 mt-0.5 sm:mt-0" />

            <div className="min-w-0 space-y-1">
              <div className="flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-primary-600 dark:text-primary-400">
                <span className="truncate">Ebbinghaus Spaced Repetition</span>
                <span className="hidden xs:inline text-slate-300 dark:text-slate-600">•</span>
                <span className="hidden xs:inline truncate text-slate-500 dark:text-slate-400 font-medium">Memory Retention Engine</span>
              </div>
              
              <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                Spaced Repetition &amp; Revision
              </h1>
              
              <div className="flex items-center gap-2 flex-wrap pt-0.5">
                <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 font-normal hidden sm:block">
                  Lock concepts into permanent recall with Ebbinghaus intervals (1d → 3d → 7d → 21d+).
                </p>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Reactive Sync
                </span>
                {currentExam && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-white/[0.08] text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-white/10">
                    <span>🎯</span>
                    <span>{currentExam.name}</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right Action Cluster: Mobile-Responsive Grid (NO HORIZONTAL OVERFLOW!) */}
          <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 sm:gap-2.5 w-full lg:w-auto shrink-0 pt-1 lg:pt-0">
            {/* Live Resync */}
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                resyncAllRevisions();
                setJustSynced(true);
                setTimeout(() => setJustSynced(false), 2200);
              }}
              title="Instantly re-verify and align spaced revision intervals with your syllabus topics"
              className={`h-10 sm:h-11 px-3 sm:px-3.5 rounded-xl border text-xs sm:text-[13px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs active:scale-95 ${
                justSynced
                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                  : 'bg-white dark:bg-[#1A1B28] hover:bg-slate-50 dark:hover:bg-[#202234] border-slate-200/90 dark:border-white/10 text-slate-700 dark:text-slate-200'
              }`}
            >
              <Zap className={`w-3.5 h-3.5 ${justSynced ? 'text-emerald-500 fill-emerald-500 animate-pulse' : 'text-slate-500 dark:text-slate-400'}`} />
              <span className="truncate">{justSynced ? '✓ Synced!' : 'Live Resync'}</span>
            </button>

            {/* 🚶 Walk & Revise */}
            {onOpenWalkAndRevise && (
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onOpenWalkAndRevise();
                }}
                title="Hands-free continuous audio revision with lock screen & earphone support"
                className="h-10 sm:h-11 px-3 sm:px-3.5 rounded-xl text-xs sm:text-[13px] font-bold bg-purple-500/10 hover:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/25 hover:border-purple-500/40 transition-all active:scale-95 cursor-pointer shadow-2xs flex items-center justify-center gap-1.5"
              >
                <Footprints className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0" />
                <span className="truncate">Walk &amp; Revise</span>
                <Headphones className="w-3 h-3 opacity-70 shrink-0" />
              </button>
            )}

            {/* Primary Action: Start Due Revision */}
            <button
              type="button"
              onClick={() => {
                if (dueRevisions.length > 0) {
                  soundManager.playClick();
                  onOpenRevisionSession();
                }
              }}
              disabled={dueRevisions.length === 0}
              className={`col-span-2 sm:col-span-1 h-10 sm:h-11 px-4 sm:px-5 rounded-xl text-xs sm:text-[13px] font-bold transition-all flex items-center justify-center gap-2 ${
                dueRevisions.length > 0
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/25 cursor-pointer active:scale-95'
                  : 'bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30 shadow-2xs cursor-default'
              }`}
            >
              {dueRevisions.length > 0 ? (
                <>
                  <Play className="w-3.5 h-3.5 fill-current shrink-0 text-white" />
                  <span className="font-bold text-white">
                    Start Due Revision ({dueRevisions.length})
                  </span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="font-bold text-emerald-700 dark:text-emerald-300">
                    All Revisions Cleared ✓
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 2. 4-STAGE RETENTION PIPELINE BENTO CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
        
        {/* Stage 1 */}
        <div className="group relative p-3 sm:p-4 rounded-2xl bg-white dark:bg-[#151622] border border-slate-200/90 dark:border-white/10 hover:border-blue-500/40 shadow-xs space-y-2 transition-all duration-200 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-70 group-hover:opacity-100" />
          <div className="flex items-center justify-between gap-1">
            <span className="px-2 py-0.5 text-[11px] font-sans font-bold rounded-lg bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/25 whitespace-nowrap">
              Stage 1 • 1d
            </span>
            <div className="w-6 h-6 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <Zap className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black font-sans tabular-nums text-slate-900 dark:text-white leading-tight">
              {stage1Count} <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">cards</span>
            </div>
            <p className="text-xs sm:text-[13px] font-bold text-blue-600 dark:text-blue-400 mt-1 truncate">Initial Recall</p>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 truncate font-normal">Fresh concepts</p>
          </div>
        </div>

        {/* Stage 2 */}
        <div className="group relative p-3 sm:p-4 rounded-2xl bg-white dark:bg-[#151622] border border-slate-200/90 dark:border-white/10 hover:border-amber-500/40 shadow-xs space-y-2 transition-all duration-200 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-70 group-hover:opacity-100" />
          <div className="flex items-center justify-between gap-1">
            <span className="px-2 py-0.5 text-[11px] font-sans font-bold rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/25 whitespace-nowrap">
              Stage 2 • 3d
            </span>
            <div className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Flame className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black font-sans tabular-nums text-slate-900 dark:text-white leading-tight">
              {stage2Count} <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">cards</span>
            </div>
            <p className="text-xs sm:text-[13px] font-bold text-amber-600 dark:text-amber-400 mt-1 truncate">Consolidation</p>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 truncate font-normal">Reinforcing</p>
          </div>
        </div>

        {/* Stage 3 */}
        <div className="group relative p-3 sm:p-4 rounded-2xl bg-white dark:bg-[#151622] border border-slate-200/90 dark:border-white/10 hover:border-purple-500/40 shadow-xs space-y-2 transition-all duration-200 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-70 group-hover:opacity-100" />
          <div className="flex items-center justify-between gap-1">
            <span className="px-2 py-0.5 text-[11px] font-sans font-bold rounded-lg bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/25 whitespace-nowrap">
              Stage 3 • 7d
            </span>
            <div className="w-6 h-6 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
              <BrainCircuit className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black font-sans tabular-nums text-slate-900 dark:text-white leading-tight">
              {stage3Count} <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">cards</span>
            </div>
            <p className="text-xs sm:text-[13px] font-bold text-purple-600 dark:text-purple-400 mt-1 truncate">Long-Term Sync</p>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 truncate font-normal">Core memory</p>
          </div>
        </div>

        {/* Stage 4 / Mastered */}
        <div className="group relative p-3 sm:p-4 rounded-2xl bg-white dark:bg-[#151622] border border-slate-200/90 dark:border-white/10 hover:border-emerald-500/40 shadow-xs space-y-2 transition-all duration-200 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-70 group-hover:opacity-100" />
          <div className="flex items-center justify-between gap-1">
            <span className="px-2 py-0.5 text-[11px] font-sans font-bold rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 whitespace-nowrap">
              Stage 4 • 21d+
            </span>
            <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0" title="Mastered Vault">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black font-sans tabular-nums text-slate-900 dark:text-white leading-tight">
              {stage4Count} <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">cards</span>
            </div>
            <p className="text-xs sm:text-[13px] font-bold text-emerald-600 dark:text-emerald-400 mt-1 truncate">Permanently Locked</p>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 truncate font-normal">Exam-ready</p>
          </div>
        </div>
      </div>

      {/* 3. SEARCH & QUEUE FILTER TOOLBAR */}
      <div className="p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#151622] border border-slate-200/90 dark:border-white/10 shadow-sm space-y-3">
        
        {/* Tabs & Search Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
          
          {/* Queue Tab Switchers (Primary Filter) */}
          <div
            role="tablist"
            aria-label="Revision Queue Tabs"
            className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-[#1B1C28] border border-slate-200/80 dark:border-white/10 overflow-x-auto no-scrollbar shrink-0"
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
                      ? 'bg-[#4F46E5] text-white shadow-xs'
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
          <div className="relative w-full sm:w-72 md:w-80 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search queue topics..."
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

      {/* 4. REVISION CARDS QUEUE (Issues 1, 2, 6, 7, 8, 9) */}
      <div className="space-y-3">
        
        {/* DUE TODAY LIST */}
        {activeTab === 'today' && (
          displayedDue.length > 0 ? (
            displayedDue.map(rev => renderRevisionCard(rev, 'today'))
          ) : (
            /* Motivating Empty State */
            <div className="py-8 sm:py-14 px-4 sm:px-8 text-center rounded-2xl bg-white dark:bg-[#121424] border border-slate-200/90 dark:border-white/10 shadow-sm space-y-3 sm:space-y-4 max-w-xl mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto shadow-xs">
                <Trophy className="w-7 h-7 stroke-[2.2]" />
              </div>
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold border border-emerald-500/20">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>100% Retained Today</span>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                  All Due Revisions Cleared Today! 🎉
                </h2>
                <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                  Your spaced repetition queue is fully up to date. You can review upcoming cards early or inspect your mastered memory vault.
                </p>
              </div>

              {/* Quick Action Buttons */}
              <div className="flex items-center justify-center gap-2 flex-wrap pt-1">
                {upcomingList.length > 0 && (
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setActiveTab('upcoming');
                    }}
                    className="btn-primary px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shadow-xs"
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
                    className="btn-secondary px-4 py-2 text-xs font-semibold inline-flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shadow-2xs"
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
                    className="btn-secondary px-4 py-2 text-xs font-semibold inline-flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shadow-2xs"
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
            displayedUpcoming.map(rev => renderRevisionCard(rev, 'upcoming'))
          ) : (
            <div className="py-8 sm:py-14 px-4 text-center rounded-2xl bg-white dark:bg-[#121424] border border-dashed border-slate-200/90 dark:border-white/10 shadow-sm space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 flex items-center justify-center mx-auto shadow-xs">
                <Clock className="w-7 h-7 stroke-[1.8]" />
              </div>
              <div className="space-y-1">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                  No Upcoming Revisions Queued
                </h2>
                <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 max-w-md mx-auto font-normal">
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
                    className="btn-primary px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer active:scale-95 shadow-xs"
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
            displayedHistory.map(rev => renderRevisionCard(rev, 'history'))
          ) : (
            <div className="py-8 sm:py-14 px-4 text-center rounded-2xl bg-white dark:bg-[#121424] border border-dashed border-slate-200/90 dark:border-white/10 shadow-sm space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 dark:text-amber-400 border border-amber-500/20 flex items-center justify-center mx-auto shadow-xs">
                <Trophy className="w-7 h-7 stroke-[1.8]" />
              </div>
              <div className="space-y-1">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                  Mastered Vault is Empty
                </h2>
                <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 max-w-md mx-auto font-normal">
                  Topics reach the Mastered Vault once you complete Stage 4 (30 days retention cycle). Keep revising your active topics!
                </p>
              </div>
              <div className="pt-1">
                <button
                  onClick={() => {
                    soundManager.playClick();
                    setActiveTab('today');
                  }}
                  className="btn-primary px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer active:scale-95 shadow-xs"
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


