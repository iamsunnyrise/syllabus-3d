import React, { useState, useMemo, useEffect } from 'react';
import {
  X,
  Calendar,
  Clock,
  Target,
  Flame,
  BarChart3,
  BookOpen,
  Folder,
  Download,
  Trash2,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Timer,
  Hourglass,
  Zap,
  RotateCcw
} from 'lucide-react';
import {
  FocusSessionLog,
  getFocusSessionLogs,
  deleteFocusSessionLog,
  clearAllFocusSessionLogs,
  exportFocusSessionsCSV,
  filterFocusSessions,
  calculateSessionStats,
  groupSessionsByDate,
  getLocalDateString,
  formatDateLabel
} from '../../utils/focusSessionStorage';
import { soundManager } from '../../utils/soundEffects';

interface SessionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableSubjects?: string[];
}

export const SessionHistoryModal: React.FC<SessionHistoryModalProps> = ({
  isOpen,
  onClose,
  availableSubjects = []
}) => {
  const [sessions, setSessions] = useState<FocusSessionLog[]>([]);
  const [dateFilter, setDateFilter] = useState<'today' | 'yesterday' | 'week' | 'month' | 'all' | string>('today');
  const [customDate, setCustomDate] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [isClearingAll, setIsClearingAll] = useState(false);

  // Load sessions from storage
  const loadSessions = () => {
    const logs = getFocusSessionLogs();
    setSessions(logs);
  };

  useEffect(() => {
    if (isOpen) {
      loadSessions();
    }
  }, [isOpen]);

  // Listen to cross-component session logged events
  useEffect(() => {
    const handleUpdate = () => loadSessions();
    window.addEventListener('syllabus3d_focus_session_logged', handleUpdate);
    return () => window.removeEventListener('syllabus3d_focus_session_logged', handleUpdate);
  }, []);

  // Compute list of subjects from actual session logs + props
  const allSubjectOptions = useMemo(() => {
    const set = new Set<string>();
    availableSubjects.forEach(s => set.add(s));
    sessions.forEach(s => {
      if (s.subjectName) set.add(s.subjectName);
    });
    return ['All', ...Array.from(set).filter(Boolean)];
  }, [sessions, availableSubjects]);

  // Filtered session records
  const activeDateFilter = customDate ? customDate : dateFilter;
  const filteredSessions = useMemo(() => {
    return filterFocusSessions(sessions, {
      dateFilter: activeDateFilter,
      subjectName: selectedSubject,
      searchQuery
    });
  }, [sessions, activeDateFilter, selectedSubject, searchQuery]);

  // Grouped by date
  const groupedSessions = useMemo(() => {
    return groupSessionsByDate(filteredSessions);
  }, [filteredSessions]);

  // Overall stats for the filtered dataset
  const stats = useMemo(() => {
    return calculateSessionStats(filteredSessions);
  }, [filteredSessions]);

  if (!isOpen) return null;

  const handleDeleteSession = (id: string) => {
    soundManager.playClick();
    deleteFocusSessionLog(id);
    loadSessions();
    setConfirmDeleteId(null);
  };

  const handleClearAll = () => {
    soundManager.playClick();
    clearAllFocusSessionLogs();
    loadSessions();
    setIsClearingAll(false);
  };

  const handleExportCSV = () => {
    soundManager.playClick();
    exportFocusSessionsCSV(filteredSessions, `focus_sessions_${activeDateFilter}.csv`);
  };

  const getModeBadge = (mode: string) => {
    switch (mode) {
      case 'pomodoro':
        return {
          label: 'Pomodoro',
          icon: Zap,
          className: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
        };
      case 'timer':
        return {
          label: 'Countdown',
          icon: Hourglass,
          className: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
        };
      case 'stopwatch':
        return {
          label: 'Stopwatch',
          icon: Timer,
          className: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20'
        };
      default:
        return {
          label: 'Focus',
          icon: Target,
          className: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
        };
    }
  };

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl animate-fade-in select-none"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="w-full max-w-4xl max-h-[92vh] sm:max-h-[88vh] rounded-3xl bg-white dark:bg-[#0E101D] border border-slate-200 dark:border-white/10 shadow-2xl flex flex-col overflow-hidden text-slate-900 dark:text-white animate-scale-up"
        onClick={e => e.stopPropagation()}
      >
        {/* 1. MODAL HEADER */}
        <header className="px-5 sm:px-7 py-4 sm:py-5 border-b border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-white/[0.02] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0066FF] to-[#7C3AED] text-white flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white truncate">
                  Session Stats & Deep Work Audit
                </h2>
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#0066FF]/10 text-[#0066FF] dark:text-[#38BDF8] border border-[#0066FF]/20">
                  {filteredSessions.length} sessions
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 truncate">
                Detailed date-wise breakdown of time, subjects, chapters, and topics
              </p>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleExportCSV}
              disabled={filteredSessions.length === 0}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
              title="Download Session History as CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            {sessions.length > 0 && (
              <button
                type="button"
                onClick={() => setIsClearingAll(true)}
                className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all cursor-pointer active:scale-95"
                title="Clear All History"
              >
                <Trash2 className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                <span className="hidden sm:inline ml-1">Clear</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="p-2 sm:p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 transition-all cursor-pointer active:scale-95"
              aria-label="Close"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </header>

        {/* 2. DYNAMIC CONTROLS & FILTER BAR */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-white/[0.08] bg-white/60 dark:bg-black/20 space-y-3.5 shrink-0">
          {/* Row 1: Date Filter Quick Pills + Custom Date Picker */}
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {[
                { id: 'today', label: 'Today' },
                { id: 'yesterday', label: 'Yesterday' },
                { id: 'week', label: 'Last 7 Days' },
                { id: 'month', label: 'Last 30 Days' },
                { id: 'all', label: 'All Time' }
              ].map(tab => {
                const isActive = !customDate && dateFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setCustomDate('');
                      setDateFilter(tab.id);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-95 ${
                      isActive
                        ? 'bg-[#0066FF] text-white shadow-md shadow-blue-500/25 ring-1 ring-white/20'
                        : 'bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-white/5'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Custom Date Input */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-200">
                <Calendar className="w-3.5 h-3.5 text-[#0066FF] dark:text-[#38BDF8]" />
                <input
                  type="date"
                  value={customDate}
                  onChange={e => {
                    setCustomDate(e.target.value);
                  }}
                  className="bg-transparent border-none outline-none text-xs font-mono font-bold text-slate-800 dark:text-slate-200 cursor-pointer"
                  title="Filter by specific date"
                />
              </div>
              {customDate && (
                <button
                  type="button"
                  onClick={() => setCustomDate('')}
                  className="text-[11px] font-bold text-slate-400 hover:text-slate-600 dark:hover:text-white"
                  title="Clear custom date"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Row 2: Search Input & Subject Filter */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
            {/* Search Bar */}
            <div className="sm:col-span-8 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by topic, chapter, or subject..."
                className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/50"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Subject Selector */}
            <div className="sm:col-span-4 relative">
              <select
                value={selectedSubject}
                onChange={e => setSelectedSubject(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#161826] border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/50 cursor-pointer appearance-none"
              >
                {allSubjectOptions.map(subj => (
                  <option key={subj} value={subj}>
                    {subj === 'All' ? '📚 All Subjects' : subj}
                  </option>
                ))}
              </select>
              <Filter className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* 3. SCROLLABLE CONTENT BODY */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 space-y-6">
          {/* A. 4-KPI SUMMARY BENTO GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Metric 1: Total Focus Time */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                <Clock className="w-4 h-4 text-[#0066FF]" />
                <span className="font-semibold text-slate-500 dark:text-slate-400">Total Focus Time</span>
              </div>
              <div className="text-lg sm:text-xl font-black font-mono text-slate-900 dark:text-white">
                {stats.formattedTotalTime}
              </div>
              <div className="text-[10px] font-semibold text-slate-400">
                {stats.totalMinutes} total minutes
              </div>
            </div>

            {/* Metric 2: Completed Sessions */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                <Target className="w-4 h-4 text-[#8B5CF6]" />
                <span className="font-semibold text-slate-500 dark:text-slate-400">Sessions</span>
              </div>
              <div className="text-lg sm:text-xl font-black font-mono text-slate-900 dark:text-white">
                {stats.sessionsCount}
              </div>
              <div className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                {stats.completedCount} completed
              </div>
            </div>

            {/* Metric 3: Focus Rate */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                <Flame className="w-4 h-4 text-amber-500" />
                <span className="font-semibold text-slate-500 dark:text-slate-400">Focus Rate</span>
              </div>
              <div className="text-lg sm:text-xl font-black font-mono text-slate-900 dark:text-white">
                {stats.focusRate}
              </div>
              <div className="text-[10px] font-semibold text-slate-400">
                Completion efficiency
              </div>
            </div>

            {/* Metric 4: Unique Topics Covered */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                <BookOpen className="w-4 h-4 text-emerald-500" />
                <span className="font-semibold text-slate-500 dark:text-slate-400">Topics Studied</span>
              </div>
              <div className="text-lg sm:text-xl font-black font-mono text-slate-900 dark:text-white">
                {stats.uniqueTopicsCount}
              </div>
              <div className="text-[10px] font-semibold text-slate-400">
                Distinct syllabus targets
              </div>
            </div>
          </div>

          {/* B. SUBJECT DISTRIBUTION PROGRESS BAR */}
          {stats.subjectBreakdown.length > 0 && (
            <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-white/[0.02] border border-slate-200/70 dark:border-white/5 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300">Subject Distribution</span>
                <span className="text-[11px] font-mono text-slate-400">{stats.subjectBreakdown.length} Subjects</span>
              </div>

              {/* Stacked Colored Bar */}
              <div className="h-2.5 w-full rounded-full overflow-hidden flex bg-slate-200 dark:bg-white/5">
                {stats.subjectBreakdown.map((subj, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: `${Math.max(4, subj.percentage)}%`,
                      backgroundColor: subj.subjectColor || '#3B82F6'
                    }}
                    title={`${subj.subjectName}: ${subj.minutes}m (${subj.percentage}%)`}
                    className="h-full transition-all"
                  />
                ))}
              </div>

              {/* Legend Tags */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {stats.subjectBreakdown.map((subj, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10"
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: subj.subjectColor || '#3B82F6' }}
                    />
                    <span className="text-slate-700 dark:text-slate-200">{subj.subjectName}</span>
                    <span className="text-slate-400 font-mono text-[10px]">
                      {subj.minutes}m ({subj.percentage}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* C. CHRONOLOGICAL DATE-WISE SESSIONS LIST */}
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <span>Timeline of Study Sessions</span>
              </h3>
              <span className="text-[11px] font-semibold text-slate-400">
                Latest sessions first
              </span>
            </div>

            {groupedSessions.length === 0 ? (
              <div className="py-12 px-4 rounded-3xl bg-slate-50 dark:bg-white/[0.02] border border-dashed border-slate-300 dark:border-white/10 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#0066FF]/10 text-[#0066FF] dark:text-[#38BDF8] flex items-center justify-center mx-auto">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    No sessions recorded for this selection
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                    Try picking another date filter or start a Pomodoro/Stopwatch session from the Focus Chamber to log your deep work.
                  </p>
                </div>
                {(dateFilter !== 'all' || customDate || selectedSubject !== 'All' || searchQuery) && (
                  <button
                    type="button"
                    onClick={() => {
                      setDateFilter('all');
                      setCustomDate('');
                      setSelectedSubject('All');
                      setSearchQuery('');
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-[#0066FF] dark:text-[#38BDF8] hover:underline cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset all filters
                  </button>
                )}
              </div>
            ) : (
              groupedSessions.map(group => (
                <div key={group.date} className="space-y-3">
                  {/* Date Group Header */}
                  <div className="flex items-center justify-between sticky top-0 z-10 py-1.5 px-3 rounded-xl bg-slate-100/90 dark:bg-[#161826]/90 backdrop-blur-md border border-slate-200/80 dark:border-white/5">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#0066FF] dark:text-[#38BDF8]" />
                      <span className="text-xs font-black text-slate-900 dark:text-white">
                        {group.dateLabel}
                      </span>
                      <span className="text-[11px] text-slate-400 hidden sm:inline">
                        • {group.detailedDate}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-600 dark:text-slate-300">
                      <span>{group.logs.length} session{group.logs.length > 1 ? 's' : ''}</span>
                      <span>·</span>
                      <span className="text-[#0066FF] dark:text-[#38BDF8]">{group.totalMinutes}m total</span>
                    </div>
                  </div>

                  {/* Sessions within this date */}
                  <div className="space-y-2.5">
                    {group.logs.map(session => {
                      const modeBadge = getModeBadge(session.mode);
                      const ModeIcon = modeBadge.icon;
                      const isCompleted = session.status === 'completed';

                      return (
                        <div
                          key={session.id}
                          className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#121422] border border-slate-200/90 dark:border-white/[0.07] hover:border-slate-300 dark:hover:border-white/15 transition-all shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                        >
                          {/* Left: Time & Hierarchy info */}
                          <div className="space-y-2 min-w-0 flex-1">
                            {/* Row 1: Time Interval & Mode */}
                            <div className="flex flex-wrap items-center gap-2">
                              {/* Time Range */}
                              <div className="flex items-center gap-1.5 text-xs font-mono font-black text-slate-900 dark:text-white bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded-lg border border-slate-200/60 dark:border-white/5">
                                <Clock className="w-3 h-3 text-[#0066FF] dark:text-[#38BDF8]" />
                                <span>{session.formattedStartTime} → {session.formattedEndTime}</span>
                              </div>

                              {/* Duration Pill */}
                              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                                {session.durationMinutes} mins
                              </span>

                              {/* Timer Mode Badge */}
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border flex items-center gap-1 ${modeBadge.className}`}
                              >
                                <ModeIcon className="w-3 h-3" />
                                <span>{modeBadge.label}</span>
                              </span>

                              {/* Status Badge */}
                              {isCompleted ? (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3" />
                                  <span>Completed</span>
                                </span>
                              ) : (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1">
                                  <AlertCircle className="w-3 h-3" />
                                  <span>Stopped</span>
                                </span>
                              )}
                            </div>

                            {/* Row 2: Subject, Chapter, Topic Breadcrumb */}
                            <div className="space-y-1">
                              {/* Topic Name */}
                              <div className="text-xs sm:text-sm font-black text-slate-900 dark:text-white flex items-center gap-2 truncate">
                                <Target className="w-3.5 h-3.5 text-[#0066FF] dark:text-[#38BDF8] shrink-0" />
                                <span className="truncate">{session.topicName || 'General Deep Study'}</span>
                              </div>

                              {/* Subject & Chapter tags */}
                              <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                                {session.subjectName && (
                                  <span
                                    className="px-2 py-0.5 rounded-md font-bold text-[10px] border shrink-0"
                                    style={{
                                      backgroundColor: `${session.subjectColor || '#3B82F6'}15`,
                                      color: session.subjectColor || '#3B82F6',
                                      borderColor: `${session.subjectColor || '#3B82F6'}35`
                                    }}
                                  >
                                    {session.subjectName}
                                  </span>
                                )}

                                {session.chapterName && (
                                  <span className="flex items-center gap-1 truncate font-medium">
                                    <Folder className="w-3 h-3 text-slate-400 shrink-0" />
                                    <span className="truncate">{session.chapterName}</span>
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Right: Delete Action Button */}
                          <div className="flex items-center justify-end sm:self-center shrink-0">
                            {confirmDeleteId === session.id ? (
                              <div className="flex items-center gap-1.5 animate-scale-up">
                                <button
                                  type="button"
                                  onClick={() => handleDeleteSession(session.id)}
                                  className="px-2.5 py-1 rounded-lg text-xs font-bold bg-rose-600 text-white hover:bg-rose-700 shadow-sm cursor-pointer"
                                >
                                  Delete
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setConfirmDeleteId(null)}
                                  className="px-2 py-1 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-600 dark:hover:text-white"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setConfirmDeleteId(session.id)}
                                className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 dark:hover:bg-rose-500/20 transition-all opacity-80 sm:opacity-0 group-hover:opacity-100 cursor-pointer"
                                title="Delete this session record"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 4. MODAL FOOTER */}
        <footer className="px-5 sm:px-7 py-3 sm:py-4 border-t border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-white/[0.02] flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-semibold">Local Storage Synced & Active</span>
          </div>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 text-xs font-bold transition-all cursor-pointer active:scale-95 shadow-sm"
          >
            Done
          </button>
        </footer>
      </div>

      {/* CONFIRM CLEAR ALL MODAL */}
      {isClearingAll && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-[#131522] border border-rose-500/30 p-5 space-y-4 shadow-2xl text-slate-900 dark:text-white animate-scale-up">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
              <Trash2 className="w-5 h-5" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-sm font-black">Clear All Focus Sessions?</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                This will permanently delete all session logs. Your overall study minutes in syllabus will remain intact.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsClearingAll(false)}
                className="flex-1 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-700 dark:text-slate-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleClearAll}
                className="flex-1 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-md cursor-pointer"
              >
                Yes, Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
