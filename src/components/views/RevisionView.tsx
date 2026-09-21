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
  AlertTriangle
} from 'lucide-react';
import { getTodayDateString, formatDateReadable, isDatePastOrToday } from '../../utils/dateUtils';
import { RevisionRecord, Topic } from '../../types/syllabus';
import { soundManager } from '../../utils/soundEffects';

interface RevisionViewProps {
  onOpenRevisionSession: () => void;
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
        gradient: 'from-[#3b0b11] to-[#25070b]',
        border: 'border-red-500/30',
        text: 'text-red-400',
        bg: 'bg-red-500/10'
      };
    }
    if (lower.includes('gk') || lower.includes('general awareness') || lower.includes('knowledge') || lower.includes('gs') || lower.includes('pyq')) {
      return {
        icon: Globe,
        color: fallbackColor || '#0EA5E9',
        gradient: 'from-[#0c2340] to-[#08172c]',
        border: 'border-sky-500/30',
        text: 'text-sky-400',
        bg: 'bg-sky-500/10'
      };
    }
    if (lower.includes('reasoning') || lower.includes('intelligence')) {
      return {
        icon: BrainCircuit,
        color: fallbackColor || '#A855F7',
        gradient: 'from-[#2a134a] to-[#1a0c2e]',
        border: 'border-purple-500/30',
        text: 'text-purple-400',
        bg: 'bg-purple-500/10'
      };
    }
    if (lower.includes('english') || lower.includes('editorial') || lower.includes('comprehension')) {
      return {
        icon: BookOpen,
        color: fallbackColor || '#10B981',
        gradient: 'from-[#0a3225] to-[#062017]',
        border: 'border-emerald-500/30',
        text: 'text-emerald-400',
        bg: 'bg-emerald-500/10'
      };
    }
    return {
      icon: Layers,
      color: fallbackColor || '#7AA2F7',
      gradient: 'from-[#181926] to-[#12131d]',
      border: 'border-[#3b3d56]',
      text: 'text-indigo-400',
      bg: 'bg-indigo-500/10'
    };
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

  return (
    <div className="space-y-4 sm:space-y-6 pb-8 sm:pb-12 max-w-4xl mx-auto font-sans animate-fade-in">
      
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

      {/* 1. EXECUTIVE HERO BANNER (Issues 1, 2, 3, 4, 5, 10) */}
      <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-[#151622] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 sm:space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          
          {/* Title and Icon Capsule */}
          <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
            <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl bg-primary-500/10 border border-primary-500/20 text-primary-600 dark:text-primary-400 flex items-center justify-center shrink-0">
              <RotateCw className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.3] animate-spin-slow" />
            </div>

            <div className="min-w-0 space-y-1">
              {/* Issue 3: Text size >= 12px */}
              <div className="flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-primary-600 dark:text-primary-400">
                <span className="truncate">Ebbinghaus Spaced Repetition</span>
                <span className="hidden xs:inline text-slate-300 dark:text-slate-600">•</span>
                <span className="hidden xs:inline truncate text-slate-500 dark:text-slate-400 font-medium">Memory Retention Engine</span>
              </div>
              
              {/* Issue 4: Removed uppercase */}
              <h1 className="text-base xs:text-lg sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight truncate">
                Spaced Repetition & Revision
              </h1>
              
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 font-normal hidden sm:block">
                  Lock concepts into permanent memory with active recall intervals (1d → 3d → 7d → 21d+).
                </p>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Reactive Sync
                </span>
              </div>
            </div>
          </div>

          {/* Right Action Cluster: Live Sync (Issue 10) + Start Session (Issue 5) */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 pt-0.5 sm:pt-0">
            {/* Issue 10: Subdued secondary button for Live Resync */}
            <button
              onClick={() => {
                soundManager.playClick();
                resyncAllRevisions();
                setJustSynced(true);
                setTimeout(() => setJustSynced(false), 2200);
              }}
              title="Instantly re-verify and align spaced revision intervals with your syllabus topics"
              className={`btn-secondary flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold ${
                justSynced
                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-bold'
                  : ''
              }`}
            >
              <Zap className={`w-3.5 h-3.5 ${justSynced ? 'text-emerald-500 fill-emerald-500 animate-pulse' : 'text-slate-400'}`} />
              <span>{justSynced ? '✓ Synced Topics!' : 'Live Resync'}</span>
            </button>

            {/* Issue 5: Undisputed primary CTA without uppercase */}
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenRevisionSession();
              }}
              disabled={dueRevisions.length === 0}
              className={`btn-primary flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-[13px] font-bold transition-all active:scale-95 cursor-pointer shrink-0 shadow-sm ${
                dueRevisions.length > 0
                  ? ''
                  : 'opacity-50 cursor-not-allowed pointer-events-none'
              }`}
            >
              <Play className={`w-3.5 h-3.5 ${dueRevisions.length > 0 ? 'fill-current' : ''}`} />
              <span>
                {dueRevisions.length > 0
                  ? `Start Due Revision (${dueRevisions.length})`
                  : 'All Revisions Cleared ✓'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. 4-STAGE RETENTION PIPELINE BENTO CARDS (Issues 1, 2) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
        
        {/* Stage 1 */}
        <div className="group relative p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#151622] border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 shadow-xs space-y-2 transition-all duration-200 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-60 group-hover:opacity-100" />
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 text-xs font-mono font-bold rounded-lg bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/25">
              Stage 1 • 1d
            </span>
            <span className="text-xs font-mono text-slate-400 hidden xs:inline">Day 1</span>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black font-mono tabular-nums text-slate-900 dark:text-white">
              {stage1Count} <span className="text-xs font-sans font-medium text-slate-400">cards</span>
            </div>
            <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-1">Initial Recall</p>
            <p className="text-xs text-slate-400 truncate font-normal">Fresh concepts</p>
          </div>
        </div>

        {/* Stage 2 */}
        <div className="group relative p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#151622] border border-slate-200 dark:border-slate-800 hover:border-amber-500/40 shadow-xs space-y-2 transition-all duration-200 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-60 group-hover:opacity-100" />
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 text-xs font-mono font-bold rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/25">
              Stage 2 • 3d
            </span>
            <span className="text-xs font-mono text-slate-400 hidden xs:inline">Day 3</span>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black font-mono tabular-nums text-slate-900 dark:text-white">
              {stage2Count} <span className="text-xs font-sans font-medium text-slate-400">cards</span>
            </div>
            <p className="text-xs font-bold text-amber-600 dark:text-amber-400 mt-1">Consolidation</p>
            <p className="text-xs text-slate-400 truncate font-normal">Reinforcing</p>
          </div>
        </div>

        {/* Stage 3 */}
        <div className="group relative p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#151622] border border-slate-200 dark:border-slate-800 hover:border-purple-500/40 shadow-xs space-y-2 transition-all duration-200 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-60 group-hover:opacity-100" />
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 text-xs font-mono font-bold rounded-lg bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/25">
              Stage 3 • 7d
            </span>
            <span className="text-xs font-mono text-slate-400 hidden xs:inline">Day 7</span>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black font-mono tabular-nums text-slate-900 dark:text-white">
              {stage3Count} <span className="text-xs font-sans font-medium text-slate-400">cards</span>
            </div>
            <p className="text-xs font-bold text-purple-600 dark:text-purple-400 mt-1">Long-Term Sync</p>
            <p className="text-xs text-slate-400 truncate font-normal">Core memory</p>
          </div>
        </div>

        {/* Stage 4 / Mastered */}
        <div className="group relative p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#151622] border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 shadow-xs space-y-2 transition-all duration-200 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-60 group-hover:opacity-100" />
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 text-xs font-mono font-bold rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25">
              Stage 4 • 21d+
            </span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-0.5">
              <ShieldCheck className="w-3 h-3" />
              <span>Mastered</span>
            </span>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black font-mono tabular-nums text-emerald-600 dark:text-emerald-400">
              {stage4Count} <span className="text-xs font-sans font-medium text-slate-400">cards</span>
            </div>
            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1">Permanently Locked</p>
            <p className="text-xs text-slate-400 truncate font-normal">Exam-ready</p>
          </div>
        </div>
      </div>

      {/* 3. SEARCH & QUEUE FILTER TOOLBAR (Issues 1, 2, 11) */}
      <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-[#151622] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        
        {/* Search & Tabs Row (Issue 6: Ergonomic bounded search & priority for tabs) */}
        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
          
          {/* Queue Tab Switchers (Primary Filter) */}
          <div
            role="tablist"
            aria-label="Revision Queue Tabs"
            className="flex items-center gap-1 p-1 rounded-xl bg-slate-50 dark:bg-[#1B1C28] border border-slate-200 dark:border-slate-700 overflow-x-auto no-scrollbar shrink-0"
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
                      ? 'bg-primary-600 dark:bg-primary-500 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/60'
                  }`}
                >
                  <TabIcon className="w-3.5 h-3.5 shrink-0" />
                  <span>{tab.label}</span>
                  <span className={`px-1.5 py-0.5 rounded-lg text-[10px] font-mono tabular-nums ${
                    isSel
                      ? 'bg-white/20 text-white font-bold'
                      : 'bg-slate-200 dark:bg-slate-700/60 text-slate-600 dark:text-slate-400'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Clean Bounded Search Input (Issue 6: ~320px width on desktop) */}
          <div className="relative w-full sm:w-72 md:w-80 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search queue..."
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-slate-50 dark:bg-[#1B1C28] border border-slate-200 dark:border-slate-700 text-xs sm:text-[13px] font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-primary-500 dark:focus:border-primary-400 shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="btn-ghost absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 dark:hover:text-white p-1 rounded-lg cursor-pointer"
                title="Clear search"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Subject Filter Pills (Issue 4: Differentiated secondary facet styling) */}
        {currentExam && currentExam.subjects.length > 0 && (
          <div
            role="group"
            aria-label="Filter queue by subject"
            className="flex items-center gap-1.5 overflow-x-auto pt-2.5 border-t border-slate-100 dark:border-slate-800 no-scrollbar"
          >
            <button
              onClick={() => {
                soundManager.playClick();
                setSelectedSubjectFilter('all');
              }}
              aria-pressed={selectedSubjectFilter === 'all'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer shrink-0 active:scale-95 ${
                selectedSubjectFilter === 'all'
                  ? 'bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 border-primary-500/50 shadow-2xs font-bold ring-1 ring-primary-500/30'
                  : 'bg-slate-50 dark:bg-[#1B1C28] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300 hover:text-slate-900 dark:hover:text-white'
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
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer shrink-0 active:scale-95 ${
                    isSelected
                      ? 'bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 border-primary-500/50 shadow-2xs font-bold ring-1 ring-primary-500/30'
                      : 'bg-slate-50 dark:bg-[#1B1C28] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <SubjIcon className="w-3.5 h-3.5 shrink-0" style={{ color: isSelected ? undefined : meta.color }} />
                  <span>{toNaturalCase(s.name)}</span>
                  <span className={`px-1.5 py-0.5 rounded-lg text-[10px] font-mono tabular-nums ${
                    isSelected ? 'bg-primary-500/20 text-primary-700 dark:text-primary-300 font-bold' : 'bg-slate-200 dark:bg-slate-700/60 text-slate-600 dark:text-slate-400'
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
            displayedDue.map(rev => {
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
                  className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#151622] border border-slate-200 dark:border-slate-800 hover:border-primary-500/50 shadow-sm transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group relative overflow-hidden"
                >
                  {/* Subtle Left Accent Line */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1 opacity-80 group-hover:opacity-100"
                    style={{ backgroundColor: stageMeta.accent }}
                  />

                  <div
                    onClick={() => {
                      if (onOpenTopicDrawer && topicObj) {
                        onOpenTopicDrawer(topicObj.topic, rev.subjectName, rev.chapterName);
                      }
                    }}
                    className={`flex items-start sm:items-center gap-3 min-w-0 flex-1 pl-1 ${onOpenTopicDrawer && topicObj ? 'cursor-pointer' : ''}`}
                  >
                    {/* Subject Icon */}
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${meta.gradient} border ${meta.border} ${meta.text} flex items-center justify-center shadow-xs shrink-0 mt-0.5 sm:mt-0`}
                    >
                      <SubjIcon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
                    </div>

                    <div className="space-y-1 min-w-0 flex-1">
                      {/* Issue 8: Reduced badge wall, high-priority status only + clean inline text (Issue 6 font size) */}
                      <div className="flex items-center gap-2 flex-wrap text-xs">
                        <span className={`px-2 py-0.5 text-xs font-mono font-bold rounded-lg border ${stageMeta.badgeClass}`}>
                          {stageMeta.label}
                        </span>

                        {isOverdue ? (
                          <span className="px-2 py-0.5 text-xs font-mono font-bold rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                            Overdue ({formatDateReadable(rev.scheduledDate)})
                          </span>
                        ) : isWeak ? (
                          <span className="px-2 py-0.5 text-xs font-mono font-semibold rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            <span>Weak</span>
                          </span>
                        ) : null}

                        {/* Secondary Metadata with clear hierarchy (Issues 3 & 7) */}
                        <div className="flex items-center gap-1.5 flex-wrap text-xs text-slate-500 dark:text-slate-400">
                          <span className="font-semibold text-slate-700 dark:text-slate-200">
                            {toNaturalCase(rev.subjectName)}
                          </span>
                          <span className="text-slate-300 dark:text-slate-600">•</span>
                          <span>{toNaturalCase(rev.chapterName)}</span>
                          <span className="text-slate-300 dark:text-slate-600">•</span>
                          <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[11px] font-medium ${
                            difficulty.toLowerCase() === 'hard'
                              ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                              : difficulty.toLowerCase() === 'easy'
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                              : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                          }`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                            <span className="capitalize">{difficulty}</span>
                          </span>
                          {accuracy !== undefined && accuracy > 0 && (
                            <>
                              <span className="text-slate-300 dark:text-slate-600">•</span>
                              <span className="font-mono text-[11px] font-bold text-slate-600 dark:text-slate-300">
                                {accuracy}% acc
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Heading with Chapter breadcrumb to eliminate identical title ambiguity (Issue 5) */}
                      <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors truncate flex items-center gap-1.5">
                        <span className="text-slate-400 dark:text-slate-500 font-normal text-xs sm:text-sm shrink-0">
                          {toNaturalCase(rev.chapterName)} <span className="opacity-60">›</span>
                        </span>
                        <span className="truncate">{toNaturalCase(rev.topicName)}</span>
                      </h2>
                    </div>
                  </div>

                  {/* Actions (Inspect + Review Card) (Issues 2 & 8) */}
                  <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end pt-1.5 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                    {onOpenTopicDrawer && topicObj && (
                      <button
                        onClick={() => onOpenTopicDrawer(topicObj.topic, rev.subjectName, rev.chapterName)}
                        className="btn-secondary px-3 py-1.5 text-xs font-semibold shrink-0"
                        title="View Topic Details"
                        aria-label={`Inspect ${rev.topicName}`}
                      >
                        Inspect
                      </button>
                    )}

                    <button
                      onClick={onOpenRevisionSession}
                      className="btn-secondary px-3 py-1.5 rounded-xl text-xs font-semibold text-primary-700 dark:text-primary-300 border-primary-200/70 dark:border-primary-800/60 hover:bg-primary-50 dark:hover:bg-primary-950/30 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all shrink-0"
                      aria-label={`Review card for ${rev.topicName}`}
                    >
                      <RotateCw className="w-3.5 h-3.5 stroke-[2.2] text-primary-600 dark:text-primary-400" />
                      <span>Review</span>
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            /* Motivating Empty State */
            <div className="py-8 sm:py-14 px-4 sm:px-8 text-center rounded-2xl bg-white dark:bg-[#151622] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 sm:space-y-4 max-w-xl mx-auto">
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
            displayedUpcoming.map(rev => {
              const topicObj = allTopics.find(t => t.topic.id === rev.topicId);
              const meta = getSubjectMeta(rev.subjectName);
              const SubjIcon = meta.icon;
              const stageMeta = getStageMeta(rev.stage);
              const difficulty = topicObj?.topic.difficulty || 'Medium';
              const isWeak = topicObj?.topic.isWeak || topicObj?.topic.status === 'weak';
              const accuracy = topicObj?.topic.accuracy;

              return (
                <div
                  key={rev.id}
                  className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#151622] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group hover:border-primary-500/40 transition-all"
                >
                  <div
                    onClick={() => {
                      if (onOpenTopicDrawer && topicObj) {
                        onOpenTopicDrawer(topicObj.topic, rev.subjectName, rev.chapterName);
                      }
                    }}
                    className={`flex items-start sm:items-center gap-3 min-w-0 flex-1 ${onOpenTopicDrawer && topicObj ? 'cursor-pointer' : ''}`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${meta.gradient} border ${meta.border} ${meta.text} flex items-center justify-center shrink-0 mt-0.5 sm:mt-0`}
                    >
                      <SubjIcon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
                    </div>

                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap text-xs">
                        <span className={`px-2 py-0.5 text-xs font-mono font-bold rounded-lg border ${stageMeta.badgeClass}`}>
                          {stageMeta.label}
                        </span>

                        {isWeak && (
                          <span className="px-2 py-0.5 text-xs font-mono font-semibold rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            <span>Weak</span>
                          </span>
                        )}

                        {/* Secondary Metadata with clear hierarchy (Issues 3 & 7) */}
                        <div className="flex items-center gap-1.5 flex-wrap text-xs text-slate-500 dark:text-slate-400">
                          <span className="font-semibold text-slate-700 dark:text-slate-200">
                            {toNaturalCase(rev.subjectName)}
                          </span>
                          <span className="text-slate-300 dark:text-slate-600">•</span>
                          <span>{toNaturalCase(rev.chapterName)}</span>
                          <span className="text-slate-300 dark:text-slate-600">•</span>
                          <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[11px] font-medium ${
                            difficulty.toLowerCase() === 'hard'
                              ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                              : difficulty.toLowerCase() === 'easy'
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                              : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                          }`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                            <span className="capitalize">{difficulty}</span>
                          </span>
                          {accuracy !== undefined && accuracy > 0 && (
                            <>
                              <span className="text-slate-300 dark:text-slate-600">•</span>
                              <span className="font-mono text-[11px] font-bold text-slate-600 dark:text-slate-300">
                                {accuracy}% acc
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Heading with Chapter breadcrumb to eliminate identical title ambiguity (Issue 5) */}
                      <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors truncate flex items-center gap-1.5">
                        <span className="text-slate-400 dark:text-slate-500 font-normal text-xs sm:text-sm shrink-0">
                          {toNaturalCase(rev.chapterName)} <span className="opacity-60">›</span>
                        </span>
                        <span className="truncate">{toNaturalCase(rev.topicName)}</span>
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end pt-1.5 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                    {onOpenTopicDrawer && topicObj && (
                      <button
                        onClick={() => onOpenTopicDrawer(topicObj.topic, rev.subjectName, rev.chapterName)}
                        className="btn-secondary px-3 py-1.5 text-xs font-semibold shrink-0"
                        title="View Topic Details"
                        aria-label={`Inspect ${rev.topicName}`}
                      >
                        Inspect
                      </button>
                    )}

                    <span className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-mono font-semibold text-primary-600 dark:text-primary-400 flex items-center gap-1.5 shrink-0">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDateReadable(rev.scheduledDate)}</span>
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-8 sm:py-14 px-4 text-center rounded-2xl bg-white dark:bg-[#151622] border border-dashed border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20 flex items-center justify-center mx-auto shadow-xs">
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
            displayedHistory.map(rev => {
              const topicObj = allTopics.find(t => t.topic.id === rev.topicId);
              const meta = getSubjectMeta(rev.subjectName);
              const SubjIcon = meta.icon;

              return (
                <div
                  key={rev.id}
                  className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#151622] border border-emerald-500/30 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group hover:border-emerald-500/60 transition-all"
                >
                  <div
                    onClick={() => {
                      if (onOpenTopicDrawer && topicObj) {
                        onOpenTopicDrawer(topicObj.topic, rev.subjectName, rev.chapterName);
                      }
                    }}
                    className={`flex items-start sm:items-center gap-3 min-w-0 flex-1 ${onOpenTopicDrawer && topicObj ? 'cursor-pointer' : ''}`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${meta.gradient} border ${meta.border} ${meta.text} flex items-center justify-center shrink-0 mt-0.5 sm:mt-0`}
                    >
                      <SubjIcon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
                    </div>

                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 text-xs font-mono font-bold rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          ✓ Mastered
                        </span>
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate">
                          <span className="font-semibold text-slate-700 dark:text-slate-200">{toNaturalCase(rev.subjectName)}</span>
                          <span className="mx-1 text-slate-300 dark:text-slate-600">•</span>
                          <span>{toNaturalCase(rev.chapterName)}</span>
                        </span>
                      </div>
                      {/* Heading with Chapter breadcrumb */}
                      <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate flex items-center gap-1.5">
                        <span className="text-slate-400 dark:text-slate-500 font-normal text-xs sm:text-sm shrink-0">
                          {toNaturalCase(rev.chapterName)} <span className="opacity-60">›</span>
                        </span>
                        <span className="truncate">{toNaturalCase(rev.topicName)}</span>
                      </h2>
                    </div>
                  </div>

                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono shrink-0 pl-1 sm:pl-0">
                    {rev.completedDate ? `Mastered on ${rev.completedDate}` : 'Retained'}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="py-8 sm:py-14 px-4 text-center rounded-2xl bg-white dark:bg-[#151622] border border-dashed border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
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


