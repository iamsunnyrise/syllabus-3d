import React, { useState, useMemo } from 'react';
import { useSyllabus } from '../../context/SyllabusContext';
import {
  RotateCw,
  Play,
  Calendar,
  Search,
  X,
  Trophy,
  ArrowRight,
  Clock,
  Zap,
  BrainCircuit,
  ShieldCheck,
  Layers,
  Calculator,
  Globe,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Flame,
  AlertTriangle,
  Target,
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
  onOpenFocus: _onOpenFocus,
  onNavigate
}) => {
  const { revisions, dueRevisions, allTopics, currentExam, resyncAllRevisions } = useSyllabus();
  const [justSynced, setJustSynced] = useState(false);

  const [activeTab, setActiveTab] = useState<'today' | 'upcoming' | 'history'>('today');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');
  const [selectedStageFilter, setSelectedStageFilter] = useState<'all' | 1 | 2 | 3 | 4>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const today = getTodayDateString();

  // Filtered base queues
  const dueList = useMemo(() => {
    return revisions.filter(
      r => !r.completedDate && (isDatePastOrToday ? isDatePastOrToday(r.scheduledDate) : r.scheduledDate <= today)
    );
  }, [revisions, today]);

  const upcomingList = useMemo(() => {
    return revisions.filter(r => !r.completedDate && r.scheduledDate > today);
  }, [revisions, today]);

  const historyList = useMemo(() => {
    return revisions.filter(r => r.completedDate);
  }, [revisions]);

  // Subject Icon & Semantic Palette
  const getSubjectMeta = (name: string, fallbackColor?: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('quant') || lower.includes('math')) {
      return {
        icon: Calculator,
        color: fallbackColor || '#EA580C',
        border: 'border-orange-500/25',
        text: 'text-orange-600 dark:text-orange-400',
        bg: 'bg-orange-500/10 dark:bg-orange-500/15'
      };
    }
    if (
      lower.includes('gk') ||
      lower.includes('general awareness') ||
      lower.includes('knowledge') ||
      lower.includes('gs') ||
      lower.includes('pyq')
    ) {
      return {
        icon: Globe,
        color: fallbackColor || '#0D9488',
        border: 'border-teal-500/25',
        text: 'text-teal-600 dark:text-teal-400',
        bg: 'bg-teal-500/10 dark:bg-teal-500/15'
      };
    }
    if (lower.includes('reasoning') || lower.includes('intelligence')) {
      return {
        icon: BrainCircuit,
        color: fallbackColor || '#2563EB',
        border: 'border-sky-500/25',
        text: 'text-sky-600 dark:text-sky-400',
        bg: 'bg-sky-500/10 dark:bg-sky-500/15'
      };
    }
    if (lower.includes('english') || lower.includes('editorial') || lower.includes('comprehension')) {
      return {
        icon: BookOpen,
        color: fallbackColor || '#10B981',
        border: 'border-emerald-500/25',
        text: 'text-emerald-600 dark:text-emerald-400',
        bg: 'bg-emerald-500/10 dark:bg-emerald-500/15'
      };
    }
    return {
      icon: Layers,
      color: fallbackColor || '#D97706',
      border: 'border-amber-500/25',
      text: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-500/10 dark:bg-amber-500/15'
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
    if (diff === 0) return 'Due today';
    if (diff === 1) return 'Tomorrow';
    if (diff > 1) return `In ${diff}d`;
    if (diff === -1) return '1d overdue';
    if (diff < -1) return `${Math.abs(diff)}d overdue`;
    return 'Upcoming';
  };

  // Stage Meta & Cohesive Styling
  const getStageMeta = (stage: number) => {
    switch (stage) {
      case 1:
        return {
          label: 'Stage 1 • Day 1',
          phase: 'First Review',
          badgeClass: 'bg-amber-500/12 text-amber-800 dark:text-amber-300 border-amber-500/25',
          accent: '#F59E0B',
          icon: Zap
        };
      case 2:
        return {
          label: 'Stage 2 • Day 3',
          phase: 'Memory Check',
          badgeClass: 'bg-orange-500/12 text-orange-800 dark:text-orange-300 border-orange-500/25',
          accent: '#EA580C',
          icon: Flame
        };
      case 3:
        return {
          label: 'Stage 3 • Day 7',
          phase: 'Long-Term Lock',
          badgeClass: 'bg-sky-500/12 text-sky-800 dark:text-sky-300 border-sky-500/25',
          accent: '#0284C7',
          icon: BrainCircuit
        };
      case 4:
      default:
        return {
          label: 'Stage 4 • Day 21+',
          phase: 'Exam Ready',
          badgeClass: 'bg-emerald-500/12 text-emerald-800 dark:text-emerald-300 border-emerald-500/25',
          accent: '#10B981',
          icon: ShieldCheck
        };
    }
  };

  // Apply Subject, Stage & Search Filters
  const filterRecordList = (list: RevisionRecord[]) => {
    return list.filter(r => {
      const matchesSubject = selectedSubjectFilter === 'all' || r.subjectName === selectedSubjectFilter;
      const matchesStage =
        selectedStageFilter === 'all' ||
        (selectedStageFilter === 4 ? r.stage >= 4 || !!r.completedDate : r.stage === selectedStageFilter && !r.completedDate);
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === '' ||
        r.topicName.toLowerCase().includes(q) ||
        r.subjectName.toLowerCase().includes(q) ||
        r.chapterName.toLowerCase().includes(q);
      return matchesSubject && matchesStage && matchesSearch;
    });
  };

  const displayedDue = useMemo(
    () => filterRecordList(dueList),
    [dueList, selectedSubjectFilter, selectedStageFilter, searchQuery]
  );
  const displayedUpcoming = useMemo(
    () => filterRecordList(upcomingList),
    [upcomingList, selectedSubjectFilter, selectedStageFilter, searchQuery]
  );
  const displayedHistory = useMemo(
    () => filterRecordList(historyList),
    [historyList, selectedSubjectFilter, selectedStageFilter, searchQuery]
  );

  // 4-Stage Pipeline Counts
  const stage1Count = revisions.filter(r => r.stage === 1 && !r.completedDate).length;
  const stage2Count = revisions.filter(r => r.stage === 2 && !r.completedDate).length;
  const stage3Count = revisions.filter(r => r.stage === 3 && !r.completedDate).length;
  const stage4Count = revisions.filter(r => r.stage >= 4 || r.completedDate).length;

  const pipelineCards = [
    {
      stage: 1 as const,
      tag: 'Stage 1 • Day 1',
      title: 'First Review',
      subtitle: 'Newly learned concepts',
      count: stage1Count,
      icon: Zap,
      pillCls: 'bg-amber-500/12 text-amber-800 dark:text-amber-300 border-amber-500/25',
      textCls: 'text-amber-700 dark:text-amber-300',
      activeRing: 'border-amber-500 ring-2 ring-amber-500/20'
    },
    {
      stage: 2 as const,
      tag: 'Stage 2 • Day 3',
      title: 'Memory Check',
      subtitle: 'Reinforcing recall',
      count: stage2Count,
      icon: Flame,
      pillCls: 'bg-orange-500/12 text-orange-800 dark:text-orange-300 border-orange-500/25',
      textCls: 'text-orange-700 dark:text-orange-300',
      activeRing: 'border-orange-500 ring-2 ring-orange-500/20'
    },
    {
      stage: 3 as const,
      tag: 'Stage 3 • Day 7',
      title: 'Long-Term Lock',
      subtitle: 'Core exam retention',
      count: stage3Count,
      icon: BrainCircuit,
      pillCls: 'bg-sky-500/12 text-sky-800 dark:text-sky-300 border-sky-500/25',
      textCls: 'text-sky-700 dark:text-sky-300',
      activeRing: 'border-sky-500 ring-2 ring-sky-500/20'
    },
    {
      stage: 4 as const,
      tag: 'Stage 4 • Day 21+',
      title: 'Exam Ready',
      subtitle: 'Mastered Vault',
      count: stage4Count,
      icon: ShieldCheck,
      pillCls: 'bg-emerald-500/12 text-emerald-800 dark:text-emerald-300 border-emerald-500/25',
      textCls: 'text-emerald-700 dark:text-emerald-300',
      activeRing: 'border-emerald-500 ring-2 ring-emerald-500/20'
    }
  ];

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
        className="group relative rounded-2xl bg-white/95 dark:bg-[#121422] border border-slate-200/90 dark:border-white/[0.08] hover:border-amber-500/55 dark:hover:border-amber-400/45 p-3.5 sm:px-5 sm:py-4 transition-all duration-200 hover:shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4 w-full overflow-hidden"
      >
        {/* Left Accent Bar */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1.5 transition-all group-hover:w-2"
          style={{ backgroundColor: type === 'history' ? '#10B981' : stageMeta.accent }}
        />

        {/* Topic Info & Clean Inline Meta */}
        <div
          onClick={() => {
            if (onOpenTopicDrawer && topicObj) {
              onOpenTopicDrawer(topicObj.topic, rev.subjectName, rev.chapterName);
            }
          }}
          className={`flex items-start sm:items-center gap-3.5 min-w-0 flex-1 pl-1.5 ${
            onOpenTopicDrawer && topicObj ? 'cursor-pointer' : ''
          }`}
        >
          <div
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl ${meta.bg} border ${meta.border} ${meta.text} flex items-center justify-center shrink-0 shadow-2xs`}
          >
            <SubjIcon className="w-5 h-5 stroke-[2.2]" />
          </div>

          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-sm sm:text-[15px] font-black text-slate-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors leading-tight">
                {toNaturalCase(rev.topicName)}
              </h2>
              {isWeak && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-black rounded-lg bg-rose-500/12 text-rose-600 dark:text-rose-400 border border-rose-500/25 whitespace-nowrap">
                  <AlertTriangle className="w-3 h-3 stroke-[2.5]" />
                  <span>Weak</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 flex-wrap font-medium">
              <span className="font-bold text-slate-700 dark:text-slate-200">{toNaturalCase(rev.subjectName)}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate max-w-[220px] sm:max-w-none">{toNaturalCase(rev.chapterName)}</span>
              {type !== 'history' && (
                <>
                  <span className="text-slate-300 dark:text-slate-600">•</span>
                  <span className="capitalize">{difficulty}</span>
                </>
              )}
              {accuracy !== undefined && accuracy > 0 && (
                <>
                  <span className="text-slate-300 dark:text-slate-600">•</span>
                  <span className="inline-flex items-center gap-1 font-bold text-emerald-700 dark:text-emerald-400 tabular-nums">
                    <Target className="w-3 h-3" />
                    {accuracy}% acc
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right: Clean Stage + Schedule Status + Actions */}
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between lg:justify-end gap-2.5 sm:gap-3 shrink-0 pl-1.5 lg:pl-0 pt-2.5 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-white/[0.06]">
          <div className="flex items-center gap-2 flex-wrap">
            {type === 'history' ? (
              <span className="px-2.5 py-1 text-xs font-bold rounded-xl bg-emerald-500/12 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25 flex items-center gap-1.5 whitespace-nowrap">
                <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Mastered</span>
              </span>
            ) : (
              <span className={`px-2.5 py-1 text-xs font-bold rounded-xl border flex items-center gap-1.5 whitespace-nowrap ${stageMeta.badgeClass}`}>
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: stageMeta.accent }} />
                <span>{stageMeta.label}</span>
              </span>
            )}

            {type === 'history' ? (
              <span className="px-2.5 py-1 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 flex items-center gap-1.5 whitespace-nowrap">
                <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                <span>{rev.completedDate ? formatDateReadable(rev.completedDate) : 'Retained'}</span>
              </span>
            ) : isOverdue ? (
              <span className="px-2.5 py-1 text-xs font-bold rounded-xl bg-rose-500/12 text-rose-700 dark:text-rose-300 border border-rose-500/25 flex items-center gap-1.5 whitespace-nowrap tabular-nums">
                <Clock className="w-3.5 h-3.5" />
                <span>{getRelativeScheduleText(rev.scheduledDate, today)}</span>
              </span>
            ) : (
              <span className="px-2.5 py-1 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 flex items-center gap-1.5 whitespace-nowrap">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>{getRelativeScheduleText(rev.scheduledDate, today)}</span>
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0 sm:pl-2.5 sm:border-l sm:border-slate-200/80 sm:dark:border-white/10 ml-auto sm:ml-0">
            {onOpenTopicDrawer && topicObj && (
              <button
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  soundManager.playClick?.();
                  onOpenTopicDrawer(topicObj.topic, rev.subjectName, rev.chapterName);
                }}
                className="px-3 py-1.5 sm:py-2 rounded-xl border border-slate-200/90 dark:border-white/10 hover:border-amber-500/40 bg-slate-50 dark:bg-white/[0.05] hover:bg-amber-500/10 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer active:scale-95 shrink-0"
                title="View Topic Details"
                aria-label={`Inspect ${rev.topicName}`}
              >
                Inspect
              </button>
            )}

            {type === 'today' && (
              <button
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  soundManager.playClick?.();
                  onOpenRevisionSession();
                }}
                className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-black bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all shrink-0 shadow-sm shadow-amber-500/20"
                aria-label={`Review card for ${rev.topicName}`}
              >
                <RotateCw className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Review</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4 sm:space-y-5 pb-40 sm:pb-28 w-full max-w-7xl mx-auto font-sans animate-fade-in px-1 sm:px-2">
      {/* PRINT-ONLY CHEATSHEET */}
      <div className="hidden print:block mb-6 pb-4 border-b-2 border-black">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-gray-700 block">
              Spaced Revision • Desk Cheatsheet
            </span>
            <h1 className="text-2xl font-black uppercase tracking-tight text-black mt-1">
              Spaced Revision Queue
            </h1>
          </div>
          <div className="text-right text-xs font-mono text-gray-600">
            <div>DUE: {dueRevisions.length} TOPICS</div>
            <div>STAGES: 1d({stage1Count}) • 3d({stage2Count}) • 7d({stage3Count}) • 21d+({stage4Count})</div>
          </div>
        </div>
      </div>

      {/* 1. SIGNATURE AMBER-GOLD HERO HEADER */}
      <div className="relative rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#121424]/95 border border-slate-200/90 dark:border-white/10 shadow-xs sm:shadow-sm overflow-hidden">
        <div className="h-[2.5px] w-full bg-gradient-to-r from-amber-400 via-orange-500 to-emerald-500 opacity-85" />

        <div className="p-4 sm:p-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5 min-w-0">
              <SectionBadgeIcon section="revision" size="lg" className="shrink-0 mt-0.5 sm:mt-0" />

              <div className="min-w-0 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  {currentExam && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/12 dark:bg-amber-500/15 border border-amber-500/25 text-amber-800 dark:text-amber-300 text-[11px] font-bold">
                      {currentExam.name}
                    </span>
                  )}
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    {dueList.length} due today • {upcomingList.length} upcoming
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                  Spaced Revision
                </h1>
                <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 font-medium">
                  Revise each topic right before it fades so concepts stay fresh on exam day.
                </p>
              </div>
            </div>

            {/* Right Action Cluster */}
            <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap sm:flex-nowrap justify-end shrink-0">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  resyncAllRevisions();
                  setJustSynced(true);
                  setTimeout(() => setJustSynced(false), 2200);
                }}
                title="Resync revision queue with syllabus topics"
                className={`h-10 px-3.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs active:scale-95 ${
                  justSynced
                    ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                    : 'bg-slate-50 dark:bg-white/[0.04] hover:bg-amber-500/10 border-slate-200/90 dark:border-white/10 text-slate-700 dark:text-slate-200'
                }`}
              >
                <RotateCw className={`w-3.5 h-3.5 ${justSynced ? 'text-emerald-500 animate-spin' : 'text-slate-400'}`} />
                <span>{justSynced ? 'Synced' : 'Sync'}</span>
              </button>

              {onOpenWalkAndRevise && dueRevisions.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    onOpenWalkAndRevise();
                  }}
                  className="h-10 px-3.5 rounded-xl border border-amber-500/35 bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 dark:text-amber-300 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                  title="Hands-free audio revision"
                >
                  <Headphones className="w-3.5 h-3.5" />
                  <span>Walk &amp; Revise</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  if (dueRevisions.length > 0) {
                    soundManager.playClick();
                    onOpenRevisionSession();
                  }
                }}
                disabled={dueRevisions.length === 0}
                className={`h-10 px-4 sm:px-5 rounded-xl text-xs transition-all flex items-center justify-center gap-2 ${
                  dueRevisions.length > 0
                    ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-black shadow-md shadow-amber-500/25 cursor-pointer active:scale-95'
                    : 'bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25 font-bold cursor-default'
                }`}
              >
                {dueRevisions.length > 0 ? (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current shrink-0" />
                    <span>Start Revision ({dueRevisions.length})</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>All Caught Up</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. INTERACTIVE 4-STAGE RETENTION CARDS (CLICK TO FILTER) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {pipelineCards.map(card => {
          const StageIcon = card.icon;
          const isSelected = selectedStageFilter === card.stage;
          return (
            <button
              type="button"
              key={card.stage}
              onClick={() => {
                soundManager.playClick();
                setSelectedStageFilter(prev => (prev === card.stage ? 'all' : card.stage));
              }}
              className={`group relative p-3.5 sm:p-4 rounded-2xl bg-white/95 dark:bg-[#121424]/95 border text-left transition-all cursor-pointer overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md ${
                isSelected
                  ? card.activeRing
                  : 'border-slate-200/90 dark:border-white/[0.08] hover:border-amber-500/45'
              }`}
            >
              <div className="flex items-center justify-between gap-1 w-full">
                <span className={`px-2 py-0.5 text-[11px] font-bold rounded-lg border whitespace-nowrap ${card.pillCls}`}>
                  {card.tag}
                </span>
                <div className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 ${card.pillCls}`}>
                  <StageIcon className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="mt-3">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black font-sans tabular-nums text-slate-900 dark:text-white leading-none tracking-tight">
                    {card.count}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">topics</span>
                </div>
                <div className="flex items-center justify-between gap-1 mt-1.5">
                  <p className={`text-xs font-bold truncate ${card.textCls}`}>{card.title}</p>
                  <span className="text-[10.5px] font-medium text-slate-400 dark:text-slate-500 hidden sm:inline truncate">
                    {isSelected ? 'Active filter' : card.subtitle}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. QUEUE TABS, SEARCH & SUBJECT FILTER TOOLBAR */}
      <div className="p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#121424]/95 border border-slate-200/90 dark:border-white/[0.08] shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
          {/* Queue Tab Switchers */}
          <div className="flex items-center gap-2 flex-wrap">
            <div
              role="tablist"
              aria-label="Revision Queue Tabs"
              className="flex items-center gap-1 p-1 rounded-xl bg-slate-100/90 dark:bg-[#1B1C28] border border-slate-200/80 dark:border-white/10 overflow-x-auto no-scrollbar shrink-0"
            >
              {[
                { id: 'today', label: 'Due Today', count: dueList.length, icon: Clock },
                { id: 'upcoming', label: 'Upcoming', count: upcomingList.length, icon: Calendar },
                { id: 'history', label: 'Mastered Vault', count: historyList.length, icon: Trophy }
              ].map(tab => {
                const TabIcon = tab.icon;
                const isSel = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isSel}
                    onClick={() => {
                      soundManager.playClick();
                      setActiveTab(tab.id as any);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 active:scale-95 ${
                      isSel
                        ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/[0.06]'
                    }`}
                  >
                    <TabIcon className="w-3.5 h-3.5 shrink-0" />
                    <span>{tab.label}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded-md text-[10px] font-sans font-black tabular-nums ${
                        isSel
                          ? 'bg-slate-950/15 text-slate-950'
                          : 'bg-slate-200 dark:bg-white/[0.08] text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {selectedStageFilter !== 'all' && (
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setSelectedStageFilter('all');
                }}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-500/12 text-amber-800 dark:text-amber-300 border border-amber-500/30 text-xs font-bold cursor-pointer hover:bg-amber-500/20"
              >
                <span>Stage {selectedStageFilter} Filter</span>
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72 md:w-80 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search topics or chapters..."
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-slate-50 dark:bg-[#1B1C28] border border-slate-200 dark:border-white/10 text-xs sm:text-[13px] font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 shadow-2xs transition-all"
            />
            {searchQuery && (
              <button
                type="button"
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
              type="button"
              onClick={() => {
                soundManager.playClick();
                setSelectedSubjectFilter('all');
              }}
              aria-pressed={selectedSubjectFilter === 'all'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer shrink-0 active:scale-95 ${
                selectedSubjectFilter === 'all'
                  ? 'bg-amber-500/12 dark:bg-amber-500/20 text-amber-900 dark:text-amber-300 border-amber-500/40 shadow-2xs font-black'
                  : 'bg-slate-50 dark:bg-[#1B1C28] text-slate-600 dark:text-slate-300 border-slate-200/80 dark:border-white/10 hover:border-amber-400/50 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5 shrink-0 text-amber-500" />
              <span>All ({revisions.length})</span>
            </button>

            {currentExam.subjects.map(s => {
              const count = revisions.filter(r => r.subjectName === s.name).length;
              const isSelected = selectedSubjectFilter === s.name;
              const meta = getSubjectMeta(s.name, s.color);
              const SubjIcon = meta.icon;

              return (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedSubjectFilter(s.name);
                  }}
                  aria-pressed={isSelected}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer shrink-0 active:scale-95 ${
                    isSelected
                      ? 'bg-amber-500/12 dark:bg-amber-500/20 text-amber-900 dark:text-amber-300 border-amber-500/40 shadow-2xs font-black'
                      : 'bg-slate-50 dark:bg-[#1B1C28] text-slate-600 dark:text-slate-300 border-slate-200/80 dark:border-white/10 hover:border-amber-400/50 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <SubjIcon className="w-3.5 h-3.5 shrink-0" style={{ color: isSelected ? undefined : meta.color }} />
                  <span>{toNaturalCase(s.name)}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-md text-[10px] font-sans font-bold tabular-nums ${
                      isSelected
                        ? 'bg-amber-500/20 text-amber-900 dark:text-amber-200 font-bold'
                        : 'bg-slate-200 dark:bg-white/[0.08] text-slate-600 dark:text-slate-400'
                    }`}
                  >
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
        {activeTab === 'today' &&
          (displayedDue.length > 0 ? (
            <div className="flex flex-col gap-3 w-full">
              {displayedDue.map(rev => renderRevisionCard(rev, 'today'))}
            </div>
          ) : (
            <div className="py-10 sm:py-14 px-6 text-center rounded-2xl bg-white/95 dark:bg-[#121424]/95 border border-slate-200/90 dark:border-white/10 shadow-xs space-y-3 w-full max-w-lg mx-auto">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto">
                <Trophy className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="space-y-1">
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
                  {selectedStageFilter !== 'all' || searchQuery || selectedSubjectFilter !== 'all'
                    ? 'No matching revisions found'
                    : 'All Revisions Cleared!'}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                  {selectedStageFilter !== 'all' || searchQuery || selectedSubjectFilter !== 'all'
                    ? 'Try clearing your active stage, subject, or search filters.'
                    : 'Your queue is up to date. Check Upcoming revisions or explore the full syllabus.'}
                </p>
              </div>

              <div className="flex items-center justify-center gap-2.5 flex-wrap pt-2">
                {(selectedStageFilter !== 'all' || searchQuery || selectedSubjectFilter !== 'all') && (
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedStageFilter('all');
                      setSelectedSubjectFilter('all');
                      setSearchQuery('');
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 text-xs font-black cursor-pointer"
                  >
                    Clear Filters
                  </button>
                )}

                {upcomingList.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setActiveTab('upcoming');
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-500/12 hover:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30 text-xs font-bold inline-flex items-center gap-2 cursor-pointer"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>View Upcoming ({upcomingList.length})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                {historyList.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setActiveTab('history');
                    }}
                    className="px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-semibold inline-flex items-center gap-2 cursor-pointer"
                  >
                    <Trophy className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Mastered Vault ({historyList.length})</span>
                  </button>
                )}

                {onNavigate && (
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      onNavigate('syllabus');
                    }}
                    className="px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-semibold inline-flex items-center gap-2 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                    <span>Explore Syllabus</span>
                  </button>
                )}
              </div>
            </div>
          ))}

        {activeTab === 'upcoming' &&
          (displayedUpcoming.length > 0 ? (
            <div className="flex flex-col gap-3 w-full">
              {displayedUpcoming.map(rev => renderRevisionCard(rev, 'upcoming'))}
            </div>
          ) : (
            <div className="py-10 sm:py-16 px-6 text-center rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#121424]/95 border border-dashed border-slate-200/90 dark:border-white/10 shadow-xs space-y-4 w-full max-w-2xl mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/12 text-amber-600 dark:text-amber-400 border border-amber-500/25 flex items-center justify-center mx-auto">
                <Clock className="w-7 h-7 stroke-[1.8]" />
              </div>
              <div className="space-y-1.5">
                <h2 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                  No Upcoming Revisions Queued
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
                  As you review topics today, their next scheduled dates will appear here automatically.
                </p>
              </div>
              {dueRevisions.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setActiveTab('today');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 text-xs font-black inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>View Due Today ({dueRevisions.length})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}

        {activeTab === 'history' &&
          (displayedHistory.length > 0 ? (
            <div className="flex flex-col gap-3 w-full">
              {displayedHistory.map(rev => renderRevisionCard(rev, 'history'))}
            </div>
          ) : (
            <div className="py-10 sm:py-16 px-6 text-center rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#121424]/95 border border-dashed border-slate-200/90 dark:border-white/10 shadow-xs space-y-4 w-full max-w-2xl mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/12 text-amber-500 border border-amber-500/25 flex items-center justify-center mx-auto">
                <Trophy className="w-7 h-7 stroke-[1.8]" />
              </div>
              <div className="space-y-1.5">
                <h2 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                  Mastered Vault is Empty
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
                  Topics move into your Mastered Vault once you finish all 4 revision stages.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab('today');
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 text-xs font-black inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Go to Active Queue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};
