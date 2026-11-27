import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { useSyllabus } from '../../context/SyllabusContext';
import {
  CalendarCheck,
  Plus,
  CheckCircle2,
  Clock,
  Trash2,
  Zap,
  Target,
  Sparkles,
  ArrowRight,
  Check,
  Flame,
  Layers,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  BookOpen,
  Search,
  X,
  Tag,
  Filter,
  CheckSquare,
  Play,
  RotateCcw,
  Calendar,
  LayoutGrid,
  CalendarDays,
  Star,
  TrendingUp,
  Sunrise,
  Sun,
  Coffee,
  Moon,
  ShieldCheck,
  Award,
  ListPlus,
  Trophy,
  Calculator,
  BrainCircuit,
  Globe
} from 'lucide-react';
import { PlannerColumnStatus, PlannerTask, Topic, TaskPriority, TaskCategory } from '../../types/syllabus';
import { getTodayDateString } from '../../utils/dateUtils';
import { soundManager } from '../../utils/soundEffects';
import { haptics } from '../../utils/haptics';
import { Top3TargetsWidget } from '../dashboard/Top3TargetsWidget';
import { RoutineMakerView } from '../routine/RoutineMakerView';
import { SectionBadgeIcon } from '../common/SectionBadgeIcon';
import confetti from 'canvas-confetti';

interface PlannerViewProps {
  initialTab?: 'kanban' | 'calendar' | 'routine';
  onOpenFocusChamber?: (topicId?: string) => void;
  onOpenTopicDrawer?: (topic: Topic, subName: string, chName: string) => void;
  onOpenBacklogRescue?: () => void;
}

const formatYMD = (d: Date) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatTitleCase = (str: string): string => {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map(word => {
      if (['and', '&', 'of', 'in', 'the', 'for', 'to', 'a', 'an'].includes(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
};

export const PlannerView: React.FC<PlannerViewProps> = ({
  initialTab = 'kanban',
  onOpenFocusChamber,
  onOpenTopicDrawer,
  onOpenBacklogRescue
}) => {
  const {
    plannerTasks,
    allTopics,
    currentExam,
    profile,
    activityHistory,
    dueRevisions,
    weakTopics,
    top3Targets,
    addPlannerTask,
    togglePlannerTask,
    movePlannerTask,
    deletePlannerTask,
    clearCompletedPlannerTasks
  } = useSyllabus();

  // View Mode
  const [viewMode, setViewMode] = useState<'kanban' | 'calendar' | 'routine'>(initialTab);

  useEffect(() => {
    if (initialTab) {
      setViewMode(initialTab);
    }
  }, [initialTab]);
  const [mobileActiveColumn, setMobileActiveColumn] = useState<PlannerColumnStatus | 'all'>('all');
  const [showTop3Section, setShowTop3Section] = useState(false);
  const top3CompletedCount = useMemo(() => top3Targets ? top3Targets.filter(t => t.text && t.text.trim() && t.completed).length : 0, [top3Targets]);

  // Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSyllabusTopicId, setSelectedSyllabusTopicId] = useState('');
  const [topicSearchQuery, setTopicSearchQuery] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [targetColumn, setTargetColumn] = useState<PlannerColumnStatus>('today');
  const [targetDate, setTargetDate] = useState<string>(getTodayDateString());
  const [estimatedMins, setEstimatedMins] = useState(45);
  const [priority, setPriority] = useState<TaskPriority>('high');
  const [category, setCategory] = useState<TaskCategory>('concept');

  // Filters & Calendar
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');
  const [weekOffset, setWeekOffset] = useState(0);
  const [calendarSubMode, setCalendarSubMode] = useState<'week' | 'month' | 'timeline'>('week');
  const [monthOffset, setMonthOffset] = useState(0);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<string>(getTodayDateString());

  const calendarScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewMode === 'calendar' && calendarScrollRef.current) {
      const todayEl = calendarScrollRef.current.querySelector('[data-today="true"]');
      if (todayEl) {
        todayEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [viewMode]);

  /* ──── COMPUTED DATA ──── */

  const weekDays = useMemo(() => {
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const distanceToMonday = (currentDayOfWeek + 6) % 7;
    const monday = new Date(today);
    monday.setDate(today.getDate() - distanceToMonday + (weekOffset * 7));

    const days: Array<{
      dateStr: string; dayName: string; dayNum: number; monthName: string;
      isToday: boolean; dateObj: Date;
    }> = [];
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const todayStr = getTodayDateString();

    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const dateStr = formatYMD(d);
      days.push({
        dateStr, dayName: dayNames[i], dayNum: d.getDate(),
        monthName: monthNames[d.getMonth()], isToday: dateStr === todayStr, dateObj: d
      });
    }
    return days;
  }, [weekOffset]);

  // Full Month Matrix Computation
  const monthData = useMemo(() => {
    const today = new Date();
    const d = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
    const year = d.getFullYear();
    const month = d.getMonth();
    const monthName = d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const firstDayIndex = (d.getDay() + 6) % 7; // Monday = 0
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    const cells: Array<{
      dateStr: string;
      dayNum: number;
      isCurrentMonth: boolean;
      isToday: boolean;
      dateObj: Date;
    }> = [];

    const todayStr = getTodayDateString();

    // Previous month padding
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const dayNum = prevMonthDays - i;
      const prevDate = new Date(year, month - 1, dayNum);
      cells.push({
        dateStr: formatYMD(prevDate),
        dayNum,
        isCurrentMonth: false,
        isToday: formatYMD(prevDate) === todayStr,
        dateObj: prevDate
      });
    }

    // Current month days
    for (let i = 1; i <= totalDaysInMonth; i++) {
      const curDate = new Date(year, month, i);
      const dateStr = formatYMD(curDate);
      cells.push({
        dateStr,
        dayNum: i,
        isCurrentMonth: true,
        isToday: dateStr === todayStr,
        dateObj: curDate
      });
    }

    // Next month padding (up to 35 or 42 slots)
    const totalSlots = cells.length > 35 ? 42 : 35;
    const remaining = totalSlots - cells.length;
    for (let i = 1; i <= remaining; i++) {
      const nextDate = new Date(year, month + 1, i);
      cells.push({
        dateStr: formatYMD(nextDate),
        dayNum: i,
        isCurrentMonth: false,
        isToday: formatYMD(nextDate) === todayStr,
        dateObj: nextDate
      });
    }

    return { year, month, monthName, cells };
  }, [monthOffset]);

  const filteredTasks = useMemo(() => {
    const tasks = plannerTasks || [];
    if (selectedSubjectFilter === 'all') return tasks;
    return tasks.filter(t => t.subjectName === selectedSubjectFilter);
  }, [plannerTasks, selectedSubjectFilter]);

  const todayTasks = useMemo(() => filteredTasks.filter(t => t.status === 'today'), [filteredTasks]);
  const inProgressTasks = useMemo(() => filteredTasks.filter(t => t.status === 'in_progress'), [filteredTasks]);
  const upcomingTasks = useMemo(() => filteredTasks.filter(t => t.status === 'upcoming'), [filteredTasks]);
  const completedTasks = useMemo(() => filteredTasks.filter(t => t.status === 'completed'), [filteredTasks]);

  const totalTodayCount = todayTasks.length + inProgressTasks.length + completedTasks.length;
  const completedTodayCount = completedTasks.length;
  const todayProgressPercent = totalTodayCount > 0 ? Math.round((completedTodayCount / totalTodayCount) * 100) : 0;

  const totalPlannedMinutes = useMemo(() => (plannerTasks || []).reduce((acc, t) => acc + (t.estimatedMinutes || 0), 0), [plannerTasks]);
  const completedMinutes = useMemo(() => (plannerTasks || []).filter(t => t.status === 'completed').reduce((acc, t) => acc + (t.estimatedMinutes || 0), 0), [plannerTasks]);

  // Month-level statistics
  const monthStats = useMemo(() => {
    const monthDates = new Set(monthData.cells.filter(c => c.isCurrentMonth).map(c => c.dateStr));
    const monthTasks = filteredTasks.filter(t => monthDates.has(t.scheduledDate || ''));
    const total = monthTasks.length;
    const done = monthTasks.filter(t => t.status === 'completed').length;
    const rate = total > 0 ? Math.round((done / total) * 100) : 0;
    const activeDaysCount = new Set(monthTasks.map(t => t.scheduledDate)).size;
    return { total, done, rate, activeDaysCount };
  }, [monthData, filteredTasks]);

  // Selected Date Computed Tasks
  const selectedDateTasks = useMemo(() => {
    return filteredTasks.filter(t => t.scheduledDate === selectedCalendarDate);
  }, [filteredTasks, selectedCalendarDate]);

  const selectedDateTotalMinutes = useMemo(() => {
    return selectedDateTasks.reduce((acc, t) => acc + (t.estimatedMinutes || 0), 0);
  }, [selectedDateTasks]);

  const selectedDateCompletedCount = useMemo(() => {
    return selectedDateTasks.filter(t => t.status === 'completed').length;
  }, [selectedDateTasks]);

  // Energy Rhythm 3-Zone Partitioning for Selected Date
  const morningTasks = useMemo(() => {
    return selectedDateTasks.filter(t => t.category === 'concept' || (!t.category && !t.isCustom));
  }, [selectedDateTasks]);

  const afternoonTasks = useMemo(() => {
    return selectedDateTasks.filter(t => t.category === 'practice' || t.category === 'mock' || (!t.category && t.isCustom));
  }, [selectedDateTasks]);

  const eveningTasks = useMemo(() => {
    return selectedDateTasks.filter(t => t.category === 'revision');
  }, [selectedDateTasks]);

  // Smart suggestions
  const smartSuggestions = useMemo(() => {
    const suggestions: Array<{ type: 'revision' | 'weak'; label: string; topicName: string; subjectName: string; subjectColor: string; topicId?: string }> = [];
    const plannerTopicNames = new Set((plannerTasks || []).map(t => t.topicName));

    (dueRevisions || []).slice(0, 2).forEach(rev => {
      if (rev && !plannerTopicNames.has(rev.topicName)) {
        suggestions.push({
          type: 'revision',
          label: '🔄 Revision Due',
          topicName: rev.topicName,
          subjectName: rev.subjectName,
          subjectColor: '#f59e0b',
          topicId: rev.topicId
        });
      }
    });

    (weakTopics || []).slice(0, 2).forEach(wt => {
      if (wt?.topic && !plannerTopicNames.has(wt.topic.name)) {
        suggestions.push({
          type: 'weak',
          label: '⚠️ Weak Topic',
          topicName: wt.topic.name,
          subjectName: wt.subjectName,
          subjectColor: wt.subjectColor,
          topicId: wt.topic.id
        });
      }
    });

    return suggestions;
  }, [dueRevisions, weakTopics, plannerTasks]);

  const filteredTopicsForModal = useMemo(() => {
    if (!topicSearchQuery.trim()) return allTopics || [];
    const q = topicSearchQuery.toLowerCase();
    return (allTopics || []).filter(t =>
      t.topic?.name?.toLowerCase().includes(q) ||
      t.subjectName?.toLowerCase().includes(q) ||
      t.chapterName?.toLowerCase().includes(q)
    );
  }, [allTopics, topicSearchQuery]);

  /* ──── HANDLERS ──── */

  const handleToggleWithConfetti = useCallback((taskId: string) => {
    const task = (plannerTasks || []).find(t => t.id === taskId);
    togglePlannerTask(taskId);

    if (task && task.status !== 'completed') {
      soundManager.playCompleteChime();
      haptics.success();
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#2563EB', '#7AA2F7', '#10B981', '#FACC15'],
        scalar: 0.8,
        gravity: 1.2,
        ticks: 120
      });
    } else {
      soundManager.playClick();
      haptics.light();
    }
  }, [plannerTasks, togglePlannerTask]);

  const handleAddSuggestion = (topicName: string, subjectName: string, subjectColor: string, topicId?: string) => {
    addPlannerTask({
      topicId,
      topicName,
      subjectName,
      subjectColor,
      status: 'today',
      scheduledDate: getTodayDateString(),
      estimatedMinutes: 45,
      isCustom: false,
      priority: 'high',
      category: 'revision'
    });
    soundManager.playClick();
  };

  const handleAddPresetTarget = (title: string, duration: number, cat: TaskCategory, p: TaskPriority) => {
    addPlannerTask({
      topicName: title,
      subjectName: selectedSubjectFilter !== 'all' ? selectedSubjectFilter : (currentExam?.subjects?.[0]?.name || 'Study Sprint'),
      subjectColor: currentExam?.subjects?.[0]?.color || '#4F46E5',
      status: selectedCalendarDate === getTodayDateString() ? 'today' : 'upcoming',
      scheduledDate: selectedCalendarDate || getTodayDateString(),
      estimatedMinutes: duration,
      isCustom: true,
      priority: p,
      category: cat
    });
    soundManager.playCompleteChime();
    haptics.success();
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim() && !selectedSyllabusTopicId) return;

    if (selectedSyllabusTopicId) {
      const topicObj = (allTopics || []).find(t => t.topic?.id === selectedSyllabusTopicId);
      if (topicObj) {
        addPlannerTask({
          topicId: topicObj.topic.id,
          topicName: topicObj.topic.name,
          subjectName: topicObj.subjectName,
          subjectColor: topicObj.subjectColor,
          status: targetColumn,
          scheduledDate: targetDate || getTodayDateString(),
          estimatedMinutes: Number(estimatedMins) || 30,
          isCustom: false,
          priority,
          category
        });
      }
    } else {
      addPlannerTask({
        topicName: customTitle.trim(),
        subjectName: 'Daily Goal',
        subjectColor: '#2563EB',
        status: targetColumn,
        scheduledDate: targetDate || getTodayDateString(),
        estimatedMinutes: Number(estimatedMins) || 30,
        isCustom: true,
        priority,
        category
      });
    }

    setCustomTitle('');
    setSelectedSyllabusTopicId('');
    setTopicSearchQuery('');
    setShowAddModal(false);
    soundManager.playClick();
  };

  const getPriorityBadge = (p?: TaskPriority) => {
    switch (p) {
      case 'high': return { label: 'High', classes: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200/60 dark:border-rose-500/20' };
      case 'medium': return { label: 'Medium', classes: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200/60 dark:border-amber-500/20' };
      case 'low': return { label: 'Low', classes: 'bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-slate-400 border-slate-200/70 dark:border-white/[0.06]' };
      default: return { label: 'Medium', classes: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200/60 dark:border-amber-500/20' };
    }
  };

  const getCategoryBadge = (c?: TaskCategory) => {
    switch (c) {
      case 'concept': return { label: 'Theory', color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border-indigo-200/60 dark:border-indigo-500/20' };
      case 'practice': return { label: 'Practice', color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-200/60 dark:border-emerald-500/20' };
      case 'mock': return { label: 'Mock', color: 'text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-200/60 dark:border-purple-500/20' };
      case 'revision': return { label: 'Revision', color: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-200/60 dark:border-amber-500/20' };
      default: return { label: 'Theory', color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border-indigo-200/60 dark:border-indigo-500/20' };
    }
  };

  const formatSelectedDateReadable = (dStr: string) => {
    if (!dStr) return '';
    try {
      const parts = dStr.split('-').map(Number);
      if (parts.length === 3 && parts.every(n => !isNaN(n))) {
        const dt = new Date(parts[0], parts[1] - 1, parts[2]);
        if (!isNaN(dt.getTime())) {
          return dt.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
        }
      }
      const dt = new Date(dStr);
      if (!isNaN(dt.getTime())) {
        return dt.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
      }
      return dStr;
    } catch {
      return dStr;
    }
  };

  const columns: Array<{
    id: PlannerColumnStatus; title: string; icon: React.ElementType;
    badgeCol: string; accentBar: string; tasks: PlannerTask[];
  }> = [
    { id: 'today', title: "Today's Targets", icon: Target, badgeCol: 'bg-amber-100/90 text-amber-900 border border-amber-300 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/30', accentBar: 'from-amber-400 to-orange-500', tasks: todayTasks },
    { id: 'in_progress', title: 'Deep Focus', icon: Zap, badgeCol: 'bg-orange-100/90 text-orange-900 border border-orange-300 dark:bg-orange-500/15 dark:text-orange-300 dark:border-orange-500/30', accentBar: 'from-orange-400 to-rose-500', tasks: inProgressTasks },
    { id: 'upcoming', title: 'This Week', icon: Layers, badgeCol: 'bg-sky-100/90 text-sky-900 border border-sky-300 dark:bg-sky-500/15 dark:text-sky-300 dark:border-sky-500/30', accentBar: 'from-sky-400 to-blue-500', tasks: upcomingTasks },
    { id: 'completed', title: 'Completed', icon: CheckCircle2, badgeCol: 'bg-emerald-100/90 text-emerald-900 border border-emerald-300 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/30', accentBar: 'from-emerald-400 to-teal-500', tasks: completedTasks }
  ];

  const getSubjectIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('quant') || lower.includes('math')) return Calculator;
    if (lower.includes('gk') || lower.includes('general awareness') || lower.includes('knowledge') || lower.includes('gs') || lower.includes('pyq')) return Globe;
    if (lower.includes('reasoning') || lower.includes('intelligence')) return BrainCircuit;
    if (lower.includes('english') || lower.includes('editorial') || lower.includes('comprehension')) return BookOpen;
    return Layers;
  };

  return (
    <div className="space-y-4 sm:space-y-6 pb-40 sm:pb-28 w-full max-w-7xl mx-auto font-sans animate-fade-in px-1 sm:px-2">
      
      {/* 🖨️ PRINT-ONLY DAILY STUDY TARGETS CHECKLIST */}
      <div className="hidden print:block mb-6 pb-4 border-b-2 border-black">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-gray-700 block">
              DAILY STUDY PLANNER • PHYSICAL DESK CHECKLIST
            </span>
            <h1 className="text-2xl font-black uppercase tracking-tight text-black mt-1">
              📅 DAILY TARGET SPRINT &amp; STUDY QUEUE
            </h1>
          </div>
          <div className="text-right text-xs font-mono text-gray-600">
            <div>DATE: {getTodayDateString()}</div>
            <div>COMPLETED: {completedTasks.length}/{plannerTasks.length} TARGETS</div>
          </div>
        </div>
      </div>

      {/* ═══════════════ 1. STUDY PLANNER EXECUTIVE HERO HEADER ═══════════════ */}
      <div className="relative p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#121424]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 shadow-xs sm:shadow-sm overflow-hidden print:hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500/60 dark:via-amber-400/60 to-transparent pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-amber-500/[0.06] dark:bg-amber-500/[0.09] blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 min-w-0">
            <SectionBadgeIcon section="planner" size="lg" className="shrink-0 mt-0.5 sm:mt-0" />
            <div className="min-w-0 space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/12 dark:bg-amber-500/15 border border-amber-500/25 text-amber-800 dark:text-amber-300 text-[11px] font-bold">
                  <Calendar className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                  <span className="font-mono tabular-nums">{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </span>
                {currentExam && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/[0.07] text-[11px] font-bold text-slate-700 dark:text-slate-200 border border-slate-200/70 dark:border-white/10">
                    <Target className="w-3 h-3 text-amber-500" />
                    <span>{currentExam.name}</span>
                  </span>
                )}
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                Study Planner
              </h1>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex items-center gap-2.5 w-full lg:w-auto self-stretch lg:self-auto justify-stretch sm:justify-end shrink-0">
            {onOpenBacklogRescue && (
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onOpenBacklogRescue();
                }}
                className="flex-1 lg:flex-initial h-10 sm:h-11 px-3.5 sm:px-4 rounded-xl sm:rounded-2xl text-xs sm:text-[13px] font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 dark:bg-amber-500/15 dark:hover:bg-amber-500/25 dark:text-amber-300 border border-amber-500/35 transition-all active:scale-[0.98] cursor-pointer shadow-xs flex items-center justify-center gap-2 shrink-0"
                title="Backlog Rescue - Rebalance overdue targets"
              >
                <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Backlog Rescue</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setTargetDate(getTodayDateString());
                setShowAddModal(true);
              }}
              className="flex-1 lg:flex-initial h-10 sm:h-11 px-4 sm:px-5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 text-xs sm:text-[13px] font-black shadow-md shadow-amber-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              title="Add Target"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add Target</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. STREAK & MOMENTUM COMMAND BANNER */}
      <div className="planner-streak-banner rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-white/95 dark:bg-[#121424]/95 backdrop-blur-xl text-slate-900 dark:text-white border border-amber-300/80 dark:border-amber-500/30 shadow-xs sm:shadow-sm relative overflow-hidden group print:hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-80 pointer-events-none" />
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-amber-500/10 dark:bg-amber-500/20 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/15 dark:group-hover:bg-amber-500/25 transition-all duration-700" />
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-orange-500/10 dark:bg-orange-500/15 rounded-full blur-3xl pointer-events-none group-hover:bg-orange-500/15 dark:group-hover:bg-orange-500/20 transition-all duration-700" />

        <div className="relative z-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Left: Flame Emblem + Streak Stat */}
          <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
            <div className="relative shrink-0">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-amber-500/20 via-orange-500/15 to-amber-400/30 dark:from-amber-500/25 dark:via-orange-500/20 dark:to-amber-400/35 border border-amber-400/50 backdrop-blur-md flex items-center justify-center shadow-md shadow-amber-500/15 group-hover:scale-105 transition-transform">
                <Flame className="w-6 h-6 sm:w-7 sm:h-7 text-amber-500 fill-amber-500" />
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                  {profile.currentStreak || 7} Day Study Streak
                </h2>
                <span className="streak-conquered-badge px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-400/20 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-400/40 text-[11px] font-black font-mono tabular-nums flex items-center gap-1 shadow-2xs">
                  <Sparkles className="w-3 h-3 text-amber-700 dark:text-amber-300" />
                  <span>{todayProgressPercent}% Today</span>
                </span>
              </div>
              <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 font-medium mt-1 leading-snug">
                Personal best:{' '}
                <span className="streak-record-val text-amber-900 dark:text-amber-300 font-bold tabular-nums whitespace-nowrap">{profile.longestStreak || 24} days</span>
              </p>
            </div>
          </div>

          {/* Center: Interactive 7-Day Consistency Week Strip */}
          <div className="streak-week-strip flex items-center gap-1.5 sm:gap-2 px-3 py-2 rounded-2xl bg-white/90 dark:bg-black/40 border border-amber-300/80 dark:border-white/15 backdrop-blur-md self-center lg:self-auto overflow-x-auto no-scrollbar shadow-inner">
            {weekDays.map((wd) => {
              const isCurrentDay = wd.isToday;
              const dayTasksList = filteredTasks.filter(t => t.scheduledDate === wd.dateStr);
              const dayDone = dayTasksList.some(t => t.status === 'completed');
              const dayTotal = dayTasksList.length;
              const allDone = dayTotal > 0 && dayTasksList.every(t => t.status === 'completed');

              return (
                <div
                  key={wd.dateStr}
                  className={`streak-day-card flex flex-col items-center justify-center w-8 sm:w-9 py-1 rounded-xl transition-all cursor-pointer ${
                    isCurrentDay
                      ? 'bg-gradient-to-b from-amber-400 to-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/40 ring-2 ring-amber-400 scale-105'
                      : allDone
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 dark:bg-emerald-500/30 dark:text-emerald-200 dark:border-emerald-400/40 shadow-2xs'
                      : dayDone
                      ? 'bg-amber-100 text-amber-900 border border-amber-300 dark:bg-amber-500/30 dark:text-amber-200 dark:border-amber-400/40 shadow-2xs'
                      : 'bg-slate-100/90 hover:bg-slate-200 text-slate-800 border border-slate-200/90 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white dark:border-white/15 shadow-2xs'
                  }`}
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedCalendarDate(wd.dateStr);
                    if (viewMode !== 'calendar') setViewMode('calendar');
                  }}
                  title={`${wd.dayName} (${wd.dateStr}): ${dayTotal} targets`}
                >
                  <span
                    className={`streak-day-name text-[9.5px] font-mono uppercase font-black ${
                      isCurrentDay ? 'text-slate-950' : 'text-slate-600 dark:text-amber-300'
                    }`}
                  >
                    {wd.dayName.slice(0, 2)}
                  </span>
                  <span
                    className={`streak-day-num text-[12px] font-mono font-black mt-0.5 tabular-nums ${
                      isCurrentDay ? 'text-slate-950' : 'text-slate-900 dark:text-white'
                    }`}
                  >
                    {wd.dayNum}
                  </span>
                  <span
                    className={`streak-day-dot text-[10px] mt-0.5 font-black ${
                      isCurrentDay ? 'text-slate-950' : 'text-amber-700 dark:text-amber-400'
                    }`}
                  >
                    {isCurrentDay ? '●' : allDone ? '✓' : dayDone ? '★' : '·'}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Right: Quick Target Status & Action */}
          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
            <div className="text-right hidden sm:block">
              <div
                className="streak-target-status text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5 justify-end"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                <span>{completedTodayCount} of {totalTodayCount} Done</span>
              </div>
            </div>

            {onOpenFocusChamber && (
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  haptics.medium();
                  onOpenFocusChamber();
                }}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/25 flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shrink-0"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Quick Sprint</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. FOUR CLEAN METRIC SUMMARY CARDS */}
      {(() => {
        const studyProgressPercent = totalPlannedMinutes > 0 ? Math.min(100, Math.round((completedMinutes / totalPlannedMinutes) * 100)) : 0;
        const targetsCompletedRate = plannerTasks.length > 0 ? Math.round((completedTasks.length / plannerTasks.length) * 100) : 0;
        const xpCurrent = (profile.xp || 0) % 300;
        const xpPercent = Math.min(100, Math.round((xpCurrent / 300) * 100));

        return (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 print:hidden">
            {/* Card 1: Daily Progress */}
            <div className="group relative rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-white/95 dark:bg-[#121424]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 hover:border-amber-500/45 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between overflow-hidden select-none">
              <div className="flex items-center justify-between gap-2">
                <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl sm:rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/25 text-amber-600 dark:text-amber-400 flex items-center justify-center transition-transform group-hover:scale-105 shrink-0">
                  <TrendingUp className="w-4.5 sm:w-5 h-4.5 sm:h-5 stroke-[2.2]" />
                </div>

                <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-[11px] font-bold tracking-wide border shrink-0 bg-slate-50 dark:bg-white/[0.04] text-slate-600 dark:text-slate-300 border-slate-200/70 dark:border-white/10">
                  {todayProgressPercent === 100
                    ? '100% Done'
                    : totalTodayCount > 0
                    ? `${completedTodayCount}/${totalTodayCount} Done`
                    : '0 Active'}
                </span>
              </div>

              <div className="my-3 sm:my-3.5 space-y-0.5">
                <div className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white tabular-nums leading-none">
                  {todayProgressPercent}%
                </div>
                <div className="text-xs sm:text-[13px] font-bold text-slate-500 dark:text-slate-400 pt-1">
                  Daily Progress
                </div>
              </div>

              <div className="space-y-2 mt-auto">
                <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden">
                  {todayProgressPercent > 0 && (
                    <div
                      className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-full h-full transition-all duration-500"
                      style={{ width: `${todayProgressPercent}%` }}
                    />
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] sm:text-xs font-semibold text-slate-600 dark:text-slate-400">
                  <span className="truncate">{completedTodayCount} of {totalTodayCount} completed</span>
                  <span className={`shrink-0 ${todayProgressPercent === 100 ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-500 dark:text-slate-400'}`}>
                    {todayProgressPercent === 100 ? 'Complete' : `${Math.max(0, totalTodayCount - completedTodayCount)} left`}
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2: Planned Study */}
            <div className="group relative rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-white/95 dark:bg-[#121424]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 hover:border-orange-500/45 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between overflow-hidden select-none">
              <div className="flex items-center justify-between gap-2">
                <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl sm:rounded-2xl bg-orange-500/10 dark:bg-orange-500/15 border border-orange-500/25 text-orange-600 dark:text-orange-400 flex items-center justify-center transition-transform group-hover:scale-105 shrink-0">
                  <Clock className="w-4.5 sm:w-5 h-4.5 sm:h-5 stroke-[2.2]" />
                </div>

                <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-[11px] font-bold tracking-wide border shrink-0 bg-slate-50 dark:bg-white/[0.04] text-slate-600 dark:text-slate-300 border-slate-200/70 dark:border-white/10">
                  {(completedMinutes / 60).toFixed(1)}h done
                </span>
              </div>

              <div className="my-3 sm:my-3.5 space-y-0.5">
                <div className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white tabular-nums leading-none">
                  {(totalPlannedMinutes / 60).toFixed(1)}
                  <span className="text-lg sm:text-xl font-bold text-slate-400 dark:text-slate-500 ml-0.5">h</span>
                </div>
                <div className="text-xs sm:text-[13px] font-bold text-slate-500 dark:text-slate-400 pt-1">
                  Planned Study
                </div>
              </div>

              <div className="space-y-2 mt-auto">
                <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden">
                  {studyProgressPercent > 0 && (
                    <div
                      className="bg-orange-500 rounded-full h-full transition-all duration-500"
                      style={{ width: `${studyProgressPercent}%` }}
                    />
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] sm:text-xs font-semibold text-slate-600 dark:text-slate-400">
                  <span className="truncate">Remaining study</span>
                  <span className="font-bold text-slate-900 dark:text-white shrink-0">
                    {Math.max(0, (totalPlannedMinutes - completedMinutes) / 60).toFixed(1)}h left
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3: Targets */}
            <div className="group relative rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-white/95 dark:bg-[#121424]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 hover:border-sky-500/45 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between overflow-hidden select-none">
              <div className="flex items-center justify-between gap-2">
                <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl sm:rounded-2xl bg-sky-500/10 dark:bg-sky-500/15 border border-sky-500/25 text-sky-600 dark:text-sky-400 flex items-center justify-center transition-transform group-hover:scale-105 shrink-0">
                  <Target className="w-4.5 sm:w-5 h-4.5 sm:h-5 stroke-[2.2]" />
                </div>

                <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-[11px] font-bold tracking-wide border shrink-0 bg-slate-50 dark:bg-white/[0.04] text-slate-600 dark:text-slate-300 border-slate-200/70 dark:border-white/10">
                  {todayTasks.length} Today
                </span>
              </div>

              <div className="my-3 sm:my-3.5 space-y-0.5">
                <div className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white tabular-nums leading-none">
                  {plannerTasks.length}
                </div>
                <div className="text-xs sm:text-[13px] font-bold text-slate-500 dark:text-slate-400 pt-1">
                  Active Targets
                </div>
              </div>

              <div className="space-y-2 mt-auto">
                <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden">
                  {targetsCompletedRate > 0 && (
                    <div
                      className="bg-sky-500 rounded-full h-full transition-all duration-500"
                      style={{ width: `${targetsCompletedRate}%` }}
                    />
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] sm:text-xs font-semibold text-slate-600 dark:text-slate-400">
                  <span className="truncate">{inProgressTasks.length} in focus</span>
                  <span className="font-bold text-slate-900 dark:text-white shrink-0">
                    {upcomingTasks.length} scheduled
                  </span>
                </div>
              </div>
            </div>

            {/* Card 4: Academic Level & XP */}
            <div className="group relative rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-white/95 dark:bg-[#121424]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 hover:border-emerald-500/45 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between overflow-hidden select-none">
              <div className="flex items-center justify-between gap-2">
                <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl sm:rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 flex items-center justify-center transition-transform group-hover:scale-105 shrink-0">
                  <Award className="w-4.5 sm:w-5 h-4.5 sm:h-5 stroke-[2.2]" />
                </div>

                <span
                  className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-[11px] font-bold tracking-wide border shrink-0 bg-slate-50 dark:bg-white/[0.04] text-slate-600 dark:text-slate-300 border-slate-200/70 dark:border-white/10 truncate max-w-[120px] sm:max-w-[140px]"
                  title={profile.levelTitle || 'Novice Scholar'}
                >
                  {profile.levelTitle || 'Novice Scholar'}
                </span>
              </div>

              <div className="my-3 sm:my-3.5 space-y-0.5">
                <div className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white tabular-nums leading-none">
                  Lvl {profile.level}
                </div>
                <div className="text-xs sm:text-[13px] font-bold text-slate-500 dark:text-slate-400 pt-1">
                  Scholar Rank
                </div>
              </div>

              <div className="space-y-2 mt-auto">
                <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden">
                  {xpPercent > 0 && (
                    <div
                      className="bg-emerald-500 rounded-full h-full transition-all duration-500"
                      style={{ width: `${xpPercent}%` }}
                    />
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] sm:text-xs font-semibold text-slate-600 dark:text-slate-400">
                  <span className="truncate">{profile.xp} XP</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                    +25 XP / target
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 4. SMART SUGGESTIONS STRIP (If any) */}
      {smartSuggestions.length > 0 && (
        <div className="p-2.5 sm:p-3 rounded-2xl bg-amber-500/[0.06] border border-amber-500/25 flex items-center gap-2 overflow-x-auto no-scrollbar shadow-2xs print:hidden">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 shrink-0 flex items-center gap-1.5 pl-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="hidden xs:inline">Suggested:</span>
          </span>
          {smartSuggestions.map((sug, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#161828] border border-slate-200/80 dark:border-white/10 text-xs shrink-0 shadow-2xs"
            >
              <div className="flex items-center gap-1.5 min-w-0">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: sug.subjectColor || '#F59E0B' }}
                />
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[150px] sm:max-w-[200px]">
                  {sug.topicName}
                </span>
                <span className="text-[10.5px] font-mono text-slate-500 dark:text-slate-400 hidden sm:inline">
                  • {sug.subjectName}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleAddSuggestion(sug.topicName, sug.subjectName, sug.subjectColor, sug.topicId)}
                className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 text-[11px] font-black cursor-pointer transition-all active:scale-95 shrink-0 flex items-center gap-1 shadow-xs"
              >
                <Plus className="w-3 h-3 stroke-[2.5]" />
                <span>Add</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ═══════════════ 2. CONSOLIDATED VIEW CONTROLS & SUBJECT FILTER TOOLBAR ═══════════════ */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-1">
        {/* Left: View Mode Segmented Switch & Clear Conquered Button */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0 justify-between sm:justify-start w-full sm:w-auto">
          <div className="flex-1 sm:flex-initial flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-white/[0.06] border border-slate-200/80 dark:border-white/[0.08] shadow-inner">
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setViewMode('kanban');
              }}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                viewMode === 'kanban'
                  ? 'bg-white dark:bg-[#1E2032] text-slate-900 dark:text-white shadow-xs font-black'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5 text-amber-500" />
              <span>Target Board</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setViewMode('calendar');
              }}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                viewMode === 'calendar'
                  ? 'bg-white dark:bg-[#1E2032] text-slate-900 dark:text-white shadow-xs font-black'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <CalendarDays className="w-3.5 h-3.5 text-orange-500" />
              <span>Calendar</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setViewMode('routine');
              }}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                viewMode === 'routine'
                  ? 'bg-white dark:bg-[#1E2032] text-slate-900 dark:text-white shadow-xs font-black'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>Routine</span>
            </button>
          </div>

          {/* Clear Done Button */}
          {viewMode !== 'routine' && completedTasks.length > 0 && (
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                clearCompletedPlannerTasks();
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/70 dark:border-white/[0.06] text-xs font-bold text-slate-600 hover:text-rose-500 dark:text-slate-400 hover:border-rose-500/30 transition-all cursor-pointer active:scale-95 shadow-2xs shrink-0"
              title="Clear completed tasks"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Done (<span className="tabular-nums font-mono">{completedTasks.length}</span>)</span>
            </button>
          )}
        </div>

        {/* Right: Subject Filter Pills */}
        {viewMode !== 'routine' && currentExam && (currentExam.subjects?.length || 0) > 0 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar min-w-0">
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setSelectedSubjectFilter('all');
              }}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold whitespace-nowrap transition-all border cursor-pointer shrink-0 active:scale-95 ${
                selectedSubjectFilter === 'all'
                  ? 'bg-amber-500/12 text-amber-900 dark:bg-amber-500/20 dark:text-amber-300 border-amber-500/35 shadow-xs font-black'
                  : 'bg-white dark:bg-[#121424] text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-white/[0.08] hover:border-amber-400/50'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-amber-500" />
              <span>All</span>
              <span className={`px-1.5 py-0.2 rounded-md text-[10px] font-mono tabular-nums font-bold ${
                selectedSubjectFilter === 'all' ? 'bg-amber-500/20 text-amber-900 dark:text-amber-200' : 'bg-slate-200/80 dark:bg-white/10 text-slate-800 dark:text-slate-200'
              }`}>
                {(plannerTasks || []).length}
              </span>
            </button>
            {(currentExam.subjects || []).map(s => {
              const count = (plannerTasks || []).filter(t => t.subjectName === s.name).length;
              const isSelected = selectedSubjectFilter === s.name;
              const SubjIcon = getSubjectIcon(s.name);
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedSubjectFilter(s.name);
                  }}
                  className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold whitespace-nowrap transition-all border cursor-pointer shrink-0 active:scale-95 ${
                    isSelected
                      ? 'bg-amber-500/12 text-amber-900 dark:bg-amber-500/20 dark:text-amber-300 border-amber-500/35 shadow-xs font-black'
                      : 'bg-white dark:bg-[#121424] text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-white/[0.08] hover:border-amber-400/50'
                  }`}
                >
                  <SubjIcon className="w-3.5 h-3.5" style={{ color: isSelected ? undefined : s.color }} />
                  <span>{formatTitleCase(s.name)}</span>
                  <span className={`px-1.5 py-0.2 rounded-md text-[10px] font-mono tabular-nums font-bold ${
                    isSelected ? 'bg-amber-500/20 text-amber-900 dark:text-amber-200' : 'bg-slate-200/80 dark:bg-white/10 text-slate-800 dark:text-slate-200'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ═══════════════ 4. MAIN WORKSPACE VIEW (KANBAN / CALENDAR / ROUTINE) ═══════════════ */}
      {viewMode === 'routine' ? (
        <RoutineMakerView onOpenFocusChamber={onOpenFocusChamber} />
      ) : viewMode === 'kanban' ? (
        <div className="space-y-3.5">
          {/* Collapsible Top 3 Non-Negotiables Core Strip */}
          <div className="rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white/95 dark:bg-[#121424]/95 backdrop-blur-xl shadow-xs overflow-hidden transition-all">
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setShowTop3Section(prev => !prev);
              }}
              className="w-full flex items-center justify-between px-3.5 sm:px-4 py-2.5 hover:bg-slate-50/80 dark:hover:bg-white/[0.02] cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold shrink-0">
                  <Target className="w-3.5 h-3.5 stroke-[2.4]" />
                </div>
                <span className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white truncate">
                  Daily Core Targets
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10.5px] font-mono font-black bg-amber-100 text-amber-900 border border-amber-300 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/20 shrink-0">
                  {top3CompletedCount}/3 Done
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 text-xs font-bold shrink-0">
                <span className="hidden sm:inline">{showTop3Section ? 'Hide' : 'Show'}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showTop3Section ? 'rotate-180' : ''}`} />
              </div>
            </button>
            {showTop3Section && (
              <div className="p-3 sm:p-4 border-t border-slate-100 dark:border-white/[0.06] bg-slate-50/40 dark:bg-black/20">
                <Top3TargetsWidget />
              </div>
            )}
          </div>
          {/* Mobile Column Segmented Filter (Hidden on Desktop) */}
          <div className="sm:hidden flex items-center gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-white/[0.06] border border-slate-200/80 dark:border-white/[0.08] overflow-x-auto no-scrollbar shadow-inner">
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                haptics.light();
                setMobileActiveColumn('all');
              }}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all active:scale-[0.97] ${
                mobileActiveColumn === 'all'
                  ? 'bg-white dark:bg-[#1E2032] text-slate-900 dark:text-white shadow-xs font-black'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              <span>All</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono tabular-nums ${
                mobileActiveColumn === 'all' ? 'bg-amber-500/15 text-amber-800 dark:text-amber-300 font-bold' : 'bg-slate-200/70 dark:bg-white/10'
              }`}>
                {filteredTasks.length}
              </span>
            </button>

            {columns.map(col => {
              const isActive = mobileActiveColumn === col.id;
              const ColIcon = col.icon;
              return (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    haptics.light();
                    setMobileActiveColumn(col.id);
                  }}
                  className={`flex-1 flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all active:scale-[0.97] ${
                    isActive
                      ? 'bg-white dark:bg-[#1E2032] text-slate-900 dark:text-white shadow-xs font-black'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  <ColIcon className={`w-3.5 h-3.5 ${
                    col.id === 'today' ? 'text-amber-500' :
                    col.id === 'in_progress' ? 'text-orange-500' :
                    col.id === 'upcoming' ? 'text-sky-500' : 'text-emerald-500'
                  }`} />
                  <span>{col.title.replace("'s Targets", '').replace(' Targets', '').replace('This ', '')}</span>
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono tabular-nums ${
                    isActive ? 'bg-amber-500/15 text-amber-800 dark:text-amber-300 font-bold' : 'bg-slate-200/70 dark:bg-white/10'
                  }`}>
                    {col.tasks.length}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            {columns.map(col => {
              const ColIcon = col.icon;
              const isHiddenOnMobile = mobileActiveColumn !== 'all' && mobileActiveColumn !== col.id;
              return (
                <div
                  key={col.id}
                  className={`${isHiddenOnMobile ? 'hidden sm:flex' : 'flex'} relative overflow-hidden flex-col rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#121424]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 shadow-xs sm:shadow-sm p-3.5 sm:p-4 space-y-3 min-h-[160px] sm:min-h-[420px]`}
                >
                  <div className={`absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r ${col.accentBar} opacity-75 pointer-events-none`} />

                  {/* Column Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200/70 dark:border-white/[0.06]">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-xl ${col.badgeCol}`}>
                        <ColIcon className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                      </div>
                      <h2 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                        {col.title}
                      </h2>
                    </div>
                    <span className={`px-2 py-0.5 text-[10.5px] font-bold rounded-full font-mono tabular-nums ${col.badgeCol}`}>
                      {col.tasks.length}
                    </span>
                  </div>

                  {/* Task Cards */}
                  <div className="flex-1 space-y-2.5 overflow-y-auto max-h-[520px] no-scrollbar">
                    {col.tasks.length === 0 ? (
                      <div className="py-7 px-3 flex flex-col items-center justify-center text-center border border-dashed border-slate-200/80 dark:border-white/10 rounded-2xl bg-slate-50/50 dark:bg-white/[0.02] space-y-2.5">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#1A1B29] border border-slate-200/60 dark:border-white/[0.06] flex items-center justify-center text-slate-500 dark:text-slate-400">
                          {col.id === 'upcoming' && <ListPlus className="w-4 h-4 text-sky-500" />}
                          {col.id === 'today' && <Target className="w-4 h-4 text-amber-500" />}
                          {col.id === 'in_progress' && <Zap className="w-4 h-4 text-orange-500 fill-current" />}
                          {col.id === 'completed' && <Trophy className="w-4 h-4 text-emerald-500" />}
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                            {col.id === 'upcoming' && 'No Upcoming Targets'}
                            {col.id === 'today' && 'No Targets Today'}
                            {col.id === 'in_progress' && 'No Active Tasks'}
                            {col.id === 'completed' && 'No Completed Tasks'}
                          </p>
                          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 max-w-[180px] leading-snug mx-auto">
                            {col.id === 'upcoming' && 'Schedule targets for upcoming days.'}
                            {col.id === 'today' && 'Add targets for today to get started.'}
                            {col.id === 'in_progress' && 'Start a focus sprint on any target.'}
                            {col.id === 'completed' && 'Completed tasks will appear here.'}
                          </p>
                        </div>
                        {(col.id === 'upcoming' || col.id === 'today') && (
                          <button
                            type="button"
                            onClick={() => {
                              soundManager.playClick();
                              setTargetColumn(col.id as any);
                              setTargetDate(getTodayDateString());
                              setShowAddModal(true);
                            }}
                            className="mt-1 px-3.5 py-1.5 rounded-xl bg-amber-500/12 hover:bg-amber-500 text-amber-800 dark:text-amber-300 hover:text-slate-950 border border-amber-500/30 text-xs font-bold transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-1.5 shadow-2xs"
                          >
                            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                            <span>Add Target</span>
                          </button>
                        )}
                      </div>
                    ) : (
                      col.tasks.map(task => {
                        const pBadge = getPriorityBadge(task.priority);
                        const cBadge = getCategoryBadge(task.category);
                        const isDone = task.status === 'completed';

                        return (
                          <div
                            key={task.id}
                            className={`relative p-3 sm:p-3.5 rounded-2xl border transition-all space-y-2.5 group ${
                              isDone
                                ? 'bg-emerald-500/5 dark:bg-emerald-500/[0.03] border-emerald-500/20 opacity-80'
                                : 'bg-slate-50/75 dark:bg-[#161828] border-slate-200/80 dark:border-white/[0.08] hover:border-amber-500/45 shadow-2xs hover:shadow-xs'
                            }`}
                          >
                            {/* Subtle Left Accent Indicator Bar */}
                            {!isDone && (
                              <div
                                className="absolute left-0 top-3 bottom-3 w-[3.5px] rounded-r-full"
                                style={{ backgroundColor: task.subjectColor || '#F59E0B' }}
                              />
                            )}

                            {/* Title & Checkbox */}
                            <div className="flex items-start justify-between gap-2.5 pl-1">
                              <div className="flex items-start gap-2.5 min-w-0">
                                <button
                                  onClick={() => handleToggleWithConfetti(task.id)}
                                  className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all shrink-0 cursor-pointer mt-0.5 ${
                                    isDone
                                      ? 'bg-emerald-500 border-emerald-500 text-white'
                                      : 'border-slate-300 dark:border-white/20 hover:border-emerald-500 hover:bg-emerald-500/10'
                                  }`}
                                  aria-label={isDone ? 'Mark target as incomplete' : 'Mark target as completed'}
                                >
                                  {isDone && <Check className="w-3 h-3 stroke-[3]" />}
                                </button>
                                <span className={`text-[13px] font-semibold leading-snug line-clamp-2 ${
                                  isDone ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-slate-100'
                                }`}>
                                  {task.topicName}
                                </span>
                              </div>

                              <button
                                onClick={() => {
                                  soundManager.playClick();
                                  deletePlannerTask(task.id);
                                }}
                                className="opacity-70 sm:opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-500 transition-all cursor-pointer shrink-0 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-500/10"
                                title="Delete Target"
                                aria-label="Delete Target"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Subject, Category & Priority Chips */}
                            <div className="flex items-center flex-wrap gap-1.5 text-[10px] sm:text-[10.5px] pl-1">
                              <span className="px-2 py-0.5 rounded-lg font-bold truncate max-w-[100px] bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-white/[0.06]">
                                {formatTitleCase(task.subjectName)}
                              </span>
                              {task.category && (
                                <span className={`px-1.5 py-0.5 rounded-lg font-bold border ${cBadge.color}`}>
                                  {cBadge.label}
                                </span>
                              )}
                              <span className={`px-1.5 py-0.5 rounded-lg font-mono font-bold border ${pBadge.classes}`}>
                                {pBadge.label}
                              </span>
                              <span className="font-mono text-slate-500 dark:text-slate-400 ml-auto flex items-center gap-1 tabular-nums font-semibold">
                                <Clock className="w-3 h-3" />
                                <span>{task.estimatedMinutes}m</span>
                              </span>
                            </div>

                            {/* Quick Focus Sprint & Move Chips */}
                            <div className="pt-2 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between gap-2 pl-1">
                              {onOpenFocusChamber && !isDone ? (
                                <button
                                  onClick={() => {
                                    soundManager.playClick();
                                    onOpenFocusChamber(task.topicId);
                                  }}
                                  className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 text-[11px] font-black flex items-center gap-1 cursor-pointer transition-all active:scale-95 shadow-xs"
                                >
                                  <Play className="w-2.5 h-2.5 fill-current" />
                                  <span>Focus</span>
                                </button>
                              ) : <div />}

                              <div className="flex items-center gap-1 ml-auto text-[11px] font-bold">
                                {col.id !== 'today' && (
                                  <button
                                    onClick={() => { soundManager.playClick(); movePlannerTask(task.id, 'today'); }}
                                    className="px-2 py-1 rounded-md bg-slate-100 dark:bg-white/[0.06] hover:bg-amber-500/15 hover:text-amber-700 dark:hover:text-amber-300 text-slate-600 dark:text-slate-400 transition-all cursor-pointer font-semibold active:scale-95"
                                  >
                                    Today
                                  </button>
                                )}
                                {col.id !== 'in_progress' && (
                                  <button
                                    onClick={() => { soundManager.playClick(); movePlannerTask(task.id, 'in_progress'); }}
                                    className="px-2 py-1 rounded-md bg-slate-100 dark:bg-white/[0.06] hover:bg-orange-500/15 hover:text-orange-700 dark:hover:text-orange-300 text-slate-600 dark:text-slate-400 transition-all cursor-pointer font-semibold active:scale-95"
                                  >
                                    Focus
                                  </button>
                                )}
                                {col.id !== 'upcoming' && (
                                  <button
                                    onClick={() => { soundManager.playClick(); movePlannerTask(task.id, 'upcoming'); }}
                                    className="px-2 py-1 rounded-md bg-slate-100 dark:bg-white/[0.06] hover:bg-sky-500/15 hover:text-sky-700 dark:hover:text-sky-300 text-slate-600 dark:text-slate-400 transition-all cursor-pointer font-semibold active:scale-95"
                                  >
                                    Week
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* ═══════════════ 5. STUDY CALENDAR HUB ═══════════════ */
        <div className="space-y-4 animate-fade-in">
          {/* Calendar Master Command Toolbar */}
          <div className="p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#121424]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 shadow-xs sm:shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Left: Connected Navigation Segment & Current Date Range Display */}
            <div className="flex items-center justify-between md:justify-start gap-3 min-w-0">
              <div className="inline-flex items-center p-1 rounded-xl bg-slate-100/90 dark:bg-white/[0.05] border border-slate-200/70 dark:border-white/[0.08] shadow-inner shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    if (calendarSubMode === 'month') {
                      setMonthOffset(m => m - 1);
                    } else {
                      setWeekOffset(w => w - 1);
                    }
                  }}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-white dark:hover:bg-white/[0.08] transition-all cursor-pointer active:scale-95"
                  title="Previous Period"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    if (calendarSubMode === 'month') {
                      setMonthOffset(0);
                    } else {
                      setWeekOffset(0);
                    }
                    setSelectedCalendarDate(getTodayDateString());
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    (calendarSubMode === 'month' ? monthOffset === 0 : weekOffset === 0)
                      ? 'bg-white dark:bg-[#1E2032] text-amber-700 dark:text-amber-300 shadow-xs font-black'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Today
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    if (calendarSubMode === 'month') {
                      setMonthOffset(m => m + 1);
                    } else {
                      setWeekOffset(w => w + 1);
                    }
                  }}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-white dark:hover:bg-white/[0.08] transition-all cursor-pointer active:scale-95"
                  title="Next Period"
                  aria-label="Next"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Date Title with Calendar Dot */}
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-2 h-2 rounded-full bg-amber-500 ring-4 ring-amber-500/20 shrink-0" />
                <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white font-mono tracking-tight truncate">
                  {calendarSubMode === 'month'
                    ? monthData.monthName
                    : `${weekDays[0]?.monthName} ${weekDays[0]?.dayNum} – ${weekDays[6]?.monthName} ${weekDays[6]?.dayNum}, ${weekDays[0]?.dateObj?.getFullYear() || ''}`}
                </h3>
              </div>
            </div>

            {/* Right: Tri-Mode View Switcher & Action Button */}
            <div className="flex items-center gap-2 justify-between md:justify-end">
              <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-white/[0.06] border border-slate-200/80 dark:border-white/[0.08] shadow-inner text-xs font-bold">
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setCalendarSubMode('week');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    calendarSubMode === 'week'
                      ? 'bg-white dark:bg-[#1E2032] text-slate-900 dark:text-white shadow-xs font-black'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <CalendarDays className="w-3.5 h-3.5 text-amber-500" />
                  <span>Week Sprint</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setCalendarSubMode('month');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    calendarSubMode === 'month'
                      ? 'bg-white dark:bg-[#1E2032] text-slate-900 dark:text-white shadow-xs font-black'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5 text-orange-500" />
                  <span>Month View</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setCalendarSubMode('timeline');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    calendarSubMode === 'timeline'
                      ? 'bg-white dark:bg-[#1E2032] text-slate-900 dark:text-white shadow-xs font-black'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Sunrise className="w-3.5 h-3.5 text-amber-500" />
                  <span>Day Rhythm</span>
                </button>
              </div>

              {/* Quick Add Button */}
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setTargetDate(selectedCalendarDate || getTodayDateString());
                  setShowAddModal(true);
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 text-xs font-black transition-all shadow-xs shadow-amber-500/20 active:scale-95 cursor-pointer shrink-0"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span className="hidden xs:inline">Schedule</span>
              </button>
            </div>
          </div>

          {/* SUBMODE 1: WEEK SPRINT MATRIX */}
          {calendarSubMode === 'week' && (
            <div className="space-y-3.5">
              {/* 7-Day Sprint Cards */}
              <div
                ref={calendarScrollRef}
                className="flex md:grid md:grid-cols-7 gap-2.5 sm:gap-3 overflow-x-auto pb-2 no-scrollbar snap-x"
              >
                {weekDays.map(day => {
                  const dayTasks = filteredTasks.filter(t => t.scheduledDate === day.dateStr);
                  const dayTotal = dayTasks.length;
                  const dayDone = dayTasks.filter(t => t.status === 'completed').length;
                  const dayMinutes = dayTasks.reduce((acc, t) => acc + (t.estimatedMinutes || 0), 0);
                  const dayProgress = dayTotal > 0 ? Math.round((dayDone / dayTotal) * 100) : 0;
                  const isSelected = selectedCalendarDate === day.dateStr;

                  const intensityBadge = dayMinutes === 0
                    ? null
                    : dayMinutes <= 60
                    ? { label: `${dayMinutes}m Light`, col: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20' }
                    : dayMinutes <= 120
                    ? { label: `${(dayMinutes / 60).toFixed(1)}h Balanced`, col: 'text-sky-600 dark:text-sky-400 bg-sky-500/10 border-sky-500/20' }
                    : { label: `${(dayMinutes / 60).toFixed(1)}h Heavy`, col: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20' };

                  return (
                    <div
                      key={day.dateStr}
                      data-today={day.isToday}
                      onClick={() => setSelectedCalendarDate(day.dateStr)}
                      className={`min-w-[195px] md:min-w-0 flex-1 p-3.5 rounded-2xl border transition-all duration-200 flex flex-col justify-between space-y-3 snap-start cursor-pointer relative overflow-hidden group min-h-[300px] ${
                        day.isToday
                          ? 'bg-gradient-to-b from-amber-50/70 via-white to-white dark:from-[#1B1810] dark:via-[#141422] dark:to-[#121424] border-amber-400/80 dark:border-amber-500/60 shadow-md ring-1 ring-amber-500/20'
                          : isSelected
                          ? 'bg-slate-50/80 dark:bg-[#161828] border-amber-400/70 dark:border-amber-500/50 shadow-sm ring-1 ring-amber-400/20'
                          : 'bg-white dark:bg-[#121424] border-slate-200/80 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/20 hover:shadow-xs'
                      }`}
                    >
                      {day.isToday && (
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500" />
                      )}

                      {/* Top Day Header */}
                      <div>
                        {day.isToday && (
                          <div className="mb-2 flex items-center justify-between">
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-mono font-black uppercase tracking-wider bg-amber-500 text-slate-950 shadow-xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-pulse" />
                              <span>TODAY</span>
                            </span>
                            {dayTotal > 0 && (
                              <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400">
                                {dayProgress}% Done
                              </span>
                            )}
                          </div>
                        )}

                        <div className="flex items-center justify-between gap-1">
                          <div>
                            <span className={`text-[10px] font-mono font-black uppercase tracking-wider block ${
                              day.isToday ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400 dark:text-slate-500'
                            }`}>
                              {day.dayName}
                            </span>
                            <div className="text-xl sm:text-2xl font-black font-mono tracking-tight text-slate-900 dark:text-white leading-tight mt-0.5">
                              {day.dayNum}
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {dayTotal > 0 && (
                              <div className="relative w-7 h-7 flex items-center justify-center shrink-0">
                                <svg className="w-full h-full -rotate-90" viewBox="0 0 32 32">
                                  <circle cx="16" cy="16" r="13" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-200 dark:text-white/10" />
                                  <circle
                                    cx="16" cy="16" r="13" fill="none"
                                    stroke="currentColor" strokeWidth="2.5"
                                    strokeDasharray="81.68"
                                    strokeDashoffset={81.68 - (81.68 * dayProgress) / 100}
                                    strokeLinecap="round"
                                    className={`${dayProgress === 100 ? 'text-emerald-500' : 'text-amber-500 dark:text-amber-400'} transition-all duration-500`}
                                  />
                                </svg>
                                <span className="absolute text-[8.5px] font-mono font-bold text-slate-700 dark:text-slate-300">
                                  {dayProgress === 100 ? '✓' : `${dayDone}/${dayTotal}`}
                                </span>
                              </div>
                            )}

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                soundManager.playClick();
                                setTargetDate(day.dateStr);
                                setShowAddModal(true);
                              }}
                              className="w-6 h-6 rounded-lg bg-slate-100/90 dark:bg-white/[0.06] hover:bg-amber-500 hover:text-slate-950 flex items-center justify-center text-slate-400 transition-all cursor-pointer opacity-80 group-hover:opacity-100"
                              title="Add target on this date"
                              aria-label="Add target on this date"
                            >
                              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                            </button>
                          </div>
                        </div>

                        {intensityBadge && (
                          <div className="mt-2">
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold border inline-block ${intensityBadge.col}`}>
                              {intensityBadge.label}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Day Tasks List */}
                      <div className="space-y-1.5 max-h-[230px] overflow-y-auto no-scrollbar flex-1 py-1">
                        {dayTasks.length === 0 ? (
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              soundManager.playClick();
                              setTargetDate(day.dateStr);
                              setShowAddModal(true);
                            }}
                            className="h-full min-h-[140px] rounded-xl border border-dashed border-slate-200/90 dark:border-white/[0.08] hover:border-amber-400/80 dark:hover:border-amber-500/60 bg-slate-50/40 hover:bg-amber-50/30 dark:bg-white/[0.01] dark:hover:bg-amber-500/[0.06] transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 p-3 group/empty text-center"
                          >
                            <div className="w-7 h-7 rounded-lg bg-white dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/[0.08] group-hover/empty:border-amber-400/60 group-hover/empty:bg-amber-500 group-hover/empty:text-slate-950 text-slate-400 flex items-center justify-center transition-all shadow-2xs">
                              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                            </div>
                            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 group-hover/empty:text-amber-700 dark:group-hover/empty:text-amber-300 transition-colors">
                              Plan Target
                            </span>
                          </div>
                        ) : (
                          dayTasks.map(t => {
                            const isDone = t.status === 'completed';
                            return (
                              <div
                                key={t.id}
                                className={`p-2.5 rounded-xl border text-[11px] font-medium transition-all group/task relative ${
                                  isDone
                                    ? 'bg-emerald-500/[0.04] dark:bg-emerald-500/[0.03] border-emerald-500/20 text-slate-400 dark:text-slate-500'
                                    : 'bg-white dark:bg-[#181A2B] border-slate-200/80 dark:border-white/[0.08] text-slate-900 dark:text-slate-100 hover:border-amber-400/60 shadow-2xs'
                                }`}
                              >
                                <div className="flex items-start gap-2 min-w-0">
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleToggleWithConfetti(t.id);
                                    }}
                                    className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 cursor-pointer mt-0.5 transition-colors ${
                                      isDone
                                        ? 'bg-emerald-500 border-emerald-500 text-white'
                                        : 'border-slate-300 dark:border-white/30 hover:border-emerald-500 hover:bg-emerald-500/10 text-transparent'
                                    }`}
                                    title={isDone ? 'Mark as incomplete' : 'Mark as complete'}
                                  >
                                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                                  </button>
                                  <div className="min-w-0 flex-1">
                                    <p className={`line-clamp-2 leading-snug font-semibold text-xs ${isDone ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-100'}`}>
                                      {t.topicName}
                                    </p>
                                    <div className="flex items-center gap-1.5 text-[9.5px] font-mono text-slate-400 mt-1">
                                      <span className="inline-flex items-center gap-0.5 font-medium">
                                        <Clock className="w-2.5 h-2.5" />
                                        {t.estimatedMinutes}m
                                      </span>
                                      {t.category && (
                                        <span className="uppercase font-bold text-amber-600 dark:text-amber-400">• {t.category}</span>
                                      )}
                                    </div>
                                  </div>

                                  {onOpenFocusChamber && !isDone && (
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        soundManager.playClick();
                                        onOpenFocusChamber(t.topicId);
                                      }}
                                      className="opacity-0 group-hover/task:opacity-100 p-1 rounded-md bg-amber-500/15 text-amber-700 dark:text-amber-300 hover:bg-amber-500 hover:text-slate-950 transition-all cursor-pointer shrink-0"
                                      title="Launch Pomodoro Focus"
                                    >
                                      <Zap className="w-3 h-3 fill-current" />
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>

                      {dayTotal > 0 && (
                        <div className="pt-2 border-t border-slate-100 dark:border-white/[0.06] mt-auto">
                          <div className="w-full h-1 rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                dayProgress === 100 ? 'bg-emerald-500' : 'bg-amber-500'
                              }`}
                              style={{ width: `${dayProgress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Weekly Sprint Summary Bar & 1-Click Quick Presets */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#121424] border border-slate-200/90 dark:border-white/10 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                {(() => {
                  const weekTasks = filteredTasks.filter(t => weekDays.some(d => d.dateStr === t.scheduledDate));
                  const weekTotal = weekTasks.length;
                  const weekDone = weekTasks.filter(t => t.status === 'completed').length;
                  const weekMinutes = weekTasks.reduce((acc, t) => acc + (t.estimatedMinutes || 0), 0);
                  const weekRate = weekTotal > 0 ? Math.round((weekDone / weekTotal) * 100) : 0;

                  return (
                    <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 flex-wrap">
                      <span className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5 pr-1">
                        <CalendarCheck className="w-4 h-4 text-amber-500" />
                        <span>Week Overview:</span>
                      </span>
                      <span className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-white/[0.06] border border-slate-200/60 dark:border-white/[0.06] font-mono font-bold tabular-nums">
                        {weekTotal} {weekTotal === 1 ? 'Target' : 'Targets'}
                      </span>
                      <span className="px-2.5 py-1 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-mono font-bold tabular-nums">
                        {weekDone} Done ({weekRate}%)
                      </span>
                      {weekMinutes > 0 && (
                        <span className="px-2.5 py-1 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/25 font-mono font-bold tabular-nums inline-flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {Math.round((weekMinutes / 60) * 10) / 10}h Planned
                        </span>
                      )}
                    </div>
                  );
                })()}

                {/* 1-Click Quick Study Sprint Presets */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                  <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider shrink-0 hidden lg:inline">
                    Quick Add:
                  </span>
                  <button
                    type="button"
                    onClick={() => handleAddPresetTarget('50 MCQ Problem Sprint', 45, 'practice', 'high')}
                    className="px-3 py-1.5 rounded-xl bg-slate-100/90 dark:bg-white/[0.06] hover:bg-amber-500/15 hover:text-amber-800 dark:hover:text-amber-300 border border-slate-200/70 dark:border-white/[0.06] hover:border-amber-500/35 text-xs font-bold transition-all cursor-pointer shrink-0 active:scale-95 flex items-center gap-1.5"
                  >
                    <Target className="w-3.5 h-3.5 text-emerald-500" />
                    <span>50 MCQs (45m)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddPresetTarget('Core Chapter Theory Deep Dive', 60, 'concept', 'high')}
                    className="px-3 py-1.5 rounded-xl bg-slate-100/90 dark:bg-white/[0.06] hover:bg-amber-500/15 hover:text-amber-800 dark:hover:text-amber-300 border border-slate-200/70 dark:border-white/[0.06] hover:border-amber-500/35 text-xs font-bold transition-all cursor-pointer shrink-0 active:scale-95 flex items-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-sky-500" />
                    <span>Theory (60m)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddPresetTarget('High-Yield Formula Recall', 30, 'revision', 'medium')}
                    className="px-3 py-1.5 rounded-xl bg-slate-100/90 dark:bg-white/[0.06] hover:bg-amber-500/15 hover:text-amber-800 dark:hover:text-amber-300 border border-slate-200/70 dark:border-white/[0.06] hover:border-amber-500/35 text-xs font-bold transition-all cursor-pointer shrink-0 active:scale-95 flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-amber-500" />
                    <span>Formulas (30m)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddPresetTarget('Full Mock Test Exam Review', 60, 'mock', 'high')}
                    className="px-3 py-1.5 rounded-xl bg-slate-100/90 dark:bg-white/[0.06] hover:bg-amber-500/15 hover:text-amber-800 dark:hover:text-amber-300 border border-slate-200/70 dark:border-white/[0.06] hover:border-amber-500/35 text-xs font-bold transition-all cursor-pointer shrink-0 active:scale-95 flex items-center gap-1.5"
                  >
                    <Zap className="w-3.5 h-3.5 text-orange-500" />
                    <span>Mock (60m)</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SUBMODE 2: FULL MONTH MATRIX */}
          {calendarSubMode === 'month' && (
            <div className="space-y-4">
              {/* Month Statistics Banner */}
              <div className="p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#121424]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 shadow-xs sm:shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100/90 dark:bg-white/[0.05] border border-slate-200/70 dark:border-white/[0.08]">
                    <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Targets
                    </span>
                    <span className="text-sm font-black font-mono text-slate-900 dark:text-white tabular-nums">
                      {monthStats.total}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                    <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider">
                      Completed
                    </span>
                    <span className="text-sm font-black font-mono tabular-nums">
                      {monthStats.done} ({monthStats.rate}%)
                    </span>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-700 dark:text-amber-300">
                    <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider">
                      Active Days
                    </span>
                    <span className="text-sm font-black font-mono tabular-nums">
                      {monthStats.activeDaysCount} Days
                    </span>
                  </div>
                </div>

                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  <span>Click any date below to inspect &amp; schedule</span>
                </div>
              </div>

              {/* 7-Column Month Matrix */}
              <div className="rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#121424]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 shadow-xs sm:shadow-sm overflow-hidden">
                <div className="grid grid-cols-7 border-b border-slate-200/80 dark:border-white/[0.08] bg-slate-50/80 dark:bg-white/[0.02]">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((dn, idx) => (
                    <div
                      key={dn}
                      className={`py-2.5 text-center text-[11px] font-mono font-black uppercase tracking-wider ${
                        idx >= 5 ? 'text-slate-400 dark:text-slate-500' : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {dn}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-px bg-slate-200/70 dark:bg-white/[0.08]">
                  {monthData.cells.map(cell => {
                    const dayTasks = filteredTasks.filter(t => t.scheduledDate === cell.dateStr);
                    const isSelected = selectedCalendarDate === cell.dateStr;
                    const allCompleted = dayTasks.length > 0 && dayTasks.every(t => t.status === 'completed');

                    return (
                      <div
                        key={cell.dateStr}
                        onClick={() => {
                          soundManager.playClick();
                          setSelectedCalendarDate(cell.dateStr);
                        }}
                        className={`min-h-[78px] sm:min-h-[96px] p-2 sm:p-2.5 transition-all flex flex-col justify-between cursor-pointer group relative ${
                          isSelected
                            ? 'bg-amber-50/90 dark:bg-amber-500/15 ring-2 ring-inset ring-amber-500 z-10'
                            : cell.isToday
                            ? 'bg-amber-50/40 dark:bg-amber-500/10 hover:bg-amber-50/70 dark:hover:bg-amber-500/15'
                            : cell.isCurrentMonth
                            ? 'bg-white dark:bg-[#121424] hover:bg-slate-50/80 dark:hover:bg-white/[0.03]'
                            : 'bg-slate-50/40 dark:bg-black/20 hover:bg-slate-50 dark:hover:bg-white/[0.02]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          {cell.isToday ? (
                            <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-mono font-black text-xs shadow-xs">
                              {cell.dayNum}
                            </span>
                          ) : (
                            <span className={`text-xs font-mono font-bold ${
                              isSelected
                                ? 'text-amber-700 dark:text-amber-300 font-black'
                                : cell.isCurrentMonth
                                ? 'text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white'
                                : 'text-slate-300 dark:text-slate-600'
                            }`}>
                              {cell.dayNum}
                            </span>
                          )}

                          <div className="flex items-center gap-1">
                            {allCompleted && (
                              <span className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-500/20" title="All targets completed" />
                            )}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                soundManager.playClick();
                                setTargetDate(cell.dateStr);
                                setShowAddModal(true);
                              }}
                              className="w-5 h-5 rounded-md bg-slate-100 hover:bg-amber-500 hover:text-slate-950 dark:bg-white/[0.06] text-slate-400 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center cursor-pointer"
                              title="Add target on this date"
                            >
                              <Plus className="w-3 h-3 stroke-[2.5]" />
                            </button>
                          </div>
                        </div>

                        <div className="space-y-1 mt-1 overflow-hidden">
                          {dayTasks.slice(0, 2).map(t => {
                            const isDone = t.status === 'completed';
                            return (
                              <div
                                key={t.id}
                                className={`px-1.5 py-0.5 rounded-md text-[9.5px] truncate font-medium flex items-center gap-1.5 border transition-all ${
                                  isDone
                                    ? 'bg-emerald-500/10 border-emerald-500/20 text-slate-400 dark:text-slate-500 line-through'
                                    : 'bg-white/90 dark:bg-black/30 border-slate-200/70 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 shadow-2xs'
                                }`}
                              >
                                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: t.subjectColor || '#F59E0B' }} />
                                <span className="truncate">{t.topicName}</span>
                              </div>
                            );
                          })}
                          {dayTasks.length > 2 && (
                            <span className="text-[9px] font-mono font-bold text-amber-600 dark:text-amber-400 block px-1">
                              +{dayTasks.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Day Focus Inspector Card for Selected Date */}
              <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#121424]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 shadow-xs sm:shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-white/[0.06]">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="w-7 h-7 rounded-lg bg-amber-500/12 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                        <CalendarCheck className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                        {formatSelectedDateReadable(selectedCalendarDate)}
                      </h3>
                      {selectedCalendarDate === getTodayDateString() && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-black uppercase tracking-wider bg-amber-500 text-slate-950 shadow-xs">
                          Today
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 pl-9">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/[0.06] font-mono tabular-nums">
                        {selectedDateTasks.length} {selectedDateTasks.length === 1 ? 'Target' : 'Targets'}
                      </span>
                      <span>•</span>
                      <span className="font-mono tabular-nums inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {Math.round(selectedDateTotalMinutes / 60 * 10) / 10}h Planned
                      </span>
                      <span>•</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-mono tabular-nums">
                        ✓ {selectedDateCompletedCount} Done
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setTargetDate(selectedCalendarDate);
                      setShowAddModal(true);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 shadow-xs shadow-amber-500/20 shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Schedule Target</span>
                  </button>
                </div>

                {/* Selected Date Tasks List */}
                <div className="space-y-2">
                  {selectedDateTasks.length === 0 ? (
                    <div className="py-7 px-4 text-center rounded-2xl border border-dashed border-slate-200/90 dark:border-white/10 bg-slate-50/40 dark:bg-white/[0.01] space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/12 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                          No study targets scheduled for this date
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Pick a quick study block below or add a custom topic.
                        </p>
                      </div>

                      <div className="flex items-center justify-center gap-2 pt-1 flex-wrap">
                        <button
                          type="button"
                          onClick={() => handleAddPresetTarget('50 MCQ Problem Sprint', 45, 'practice', 'high')}
                          className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#161828] hover:bg-amber-500/15 hover:text-amber-800 dark:hover:text-amber-300 border border-slate-200/80 dark:border-white/10 text-xs font-bold transition-all cursor-pointer shadow-2xs active:scale-95 flex items-center gap-1.5"
                        >
                          <Target className="w-3.5 h-3.5 text-emerald-500" />
                          <span>50 MCQs (45m)</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAddPresetTarget('Core Chapter Theory Deep Dive', 60, 'concept', 'high')}
                          className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#161828] hover:bg-amber-500/15 hover:text-amber-800 dark:hover:text-amber-300 border border-slate-200/80 dark:border-white/10 text-xs font-bold transition-all cursor-pointer shadow-2xs active:scale-95 flex items-center gap-1.5"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-sky-500" />
                          <span>Theory (60m)</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAddPresetTarget('High-Yield Formula Recall', 30, 'revision', 'medium')}
                          className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#161828] hover:bg-amber-500/15 hover:text-amber-800 dark:hover:text-amber-300 border border-slate-200/80 dark:border-white/10 text-xs font-bold transition-all cursor-pointer shadow-2xs active:scale-95 flex items-center gap-1.5"
                        >
                          <RotateCcw className="w-3.5 h-3.5 text-amber-500" />
                          <span>Formulas (30m)</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAddPresetTarget('Full Mock Test Exam Review', 60, 'mock', 'high')}
                          className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#161828] hover:bg-amber-500/15 hover:text-amber-800 dark:hover:text-amber-300 border border-slate-200/80 dark:border-white/10 text-xs font-bold transition-all cursor-pointer shadow-2xs active:scale-95 flex items-center gap-1.5"
                        >
                          <Zap className="w-3.5 h-3.5 text-orange-500" />
                          <span>Mock (60m)</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    selectedDateTasks.map(t => {
                      const isDone = t.status === 'completed';
                      return (
                        <div
                          key={t.id}
                          className={`p-3 rounded-2xl border flex items-center justify-between gap-3 transition-all ${
                            isDone
                              ? 'bg-emerald-500/5 dark:bg-emerald-500/[0.03] border-emerald-500/20 text-slate-400 line-through'
                              : 'bg-white dark:bg-[#161828] border-slate-200/80 dark:border-white/[0.08] text-slate-900 dark:text-slate-100 shadow-2xs hover:border-amber-400/50'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <button
                              type="button"
                              onClick={() => handleToggleWithConfetti(t.id)}
                              className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 cursor-pointer transition-colors ${
                                isDone
                                  ? 'bg-emerald-500 border-emerald-500 text-white'
                                  : 'border-slate-300 dark:border-white/30 hover:border-emerald-500 hover:bg-emerald-500/10'
                              }`}
                            >
                              {isDone && <Check className="w-3 h-3 stroke-[3]" />}
                            </button>
                            <div className="min-w-0">
                              <span className="text-xs sm:text-[13px] font-bold block truncate">{t.topicName}</span>
                              <div className="flex items-center gap-2 text-[10.5px] font-mono text-slate-400 mt-0.5">
                                <span>{formatTitleCase(t.subjectName)}</span>
                                <span>•</span>
                                <span className="inline-flex items-center gap-0.5">
                                  <Clock className="w-2.5 h-2.5" />
                                  {t.estimatedMinutes}m
                                </span>
                                {t.category && <span>• {t.category}</span>}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {onOpenFocusChamber && !isDone && (
                              <button
                                type="button"
                                onClick={() => {
                                  soundManager.playClick();
                                  onOpenFocusChamber(t.topicId);
                                }}
                                className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 text-xs font-black flex items-center gap-1 cursor-pointer transition-all active:scale-95 shadow-xs"
                              >
                                <Play className="w-3 h-3 fill-current" />
                                <span className="hidden sm:inline">Focus</span>
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => {
                                soundManager.playClick();
                                deletePlannerTask(t.id);
                              }}
                              className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                              title="Delete task"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          )}

          {/* SUBMODE 3: DAY ENERGY RHYTHM */}
          {calendarSubMode === 'timeline' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-500/[0.07] border border-amber-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <Sunrise className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Daily Energy Schedule ({formatSelectedDateReadable(selectedCalendarDate)})
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Match heavy study, practice drills, and revision to your best hours.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedCalendarDate(getTodayDateString());
                    }}
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#1A1D30] border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-amber-400 cursor-pointer"
                  >
                    View Today
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
                {/* Zone 1: Morning Focus */}
                <div className="p-4 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121424] border border-amber-500/30 shadow-xs flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/[0.06]">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                          <Sunrise className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-[13px] font-black text-slate-900 dark:text-white leading-none">
                            Morning Block
                          </h4>
                          <span className="text-[10px] font-mono text-slate-400 mt-0.5 block">06:00 – 12:00</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[9.5px] font-mono font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300">
                        Peak Focus
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400 py-2 leading-relaxed">
                      Best for heavy theory, concepts, and new chapters.
                    </p>

                    <div className="space-y-1.5 mt-1">
                      {morningTasks.length === 0 ? (
                        <p className="text-[11px] text-slate-400 italic py-3 text-center">No theory tasks assigned</p>
                      ) : (
                        morningTasks.map(t => (
                          <div
                            key={t.id}
                            className="p-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/[0.06] text-xs flex items-center justify-between gap-2"
                          >
                            <div className="min-w-0">
                              <span className="font-bold truncate block">{t.topicName}</span>
                              <span className="text-[10px] text-slate-400 font-mono inline-flex items-center gap-0.5">
                                <Clock className="w-2.5 h-2.5" />
                                {t.estimatedMinutes}m
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleToggleWithConfetti(t.id)}
                              className="w-5 h-5 rounded-md border flex items-center justify-center shrink-0 cursor-pointer"
                            >
                              {t.status === 'completed' && <Check className="w-3 h-3 text-emerald-500 stroke-[3]" />}
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setCategory('concept');
                      setTargetDate(selectedCalendarDate);
                      setShowAddModal(true);
                    }}
                    className="w-full py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Concept Target</span>
                  </button>
                </div>

                {/* Zone 2: Afternoon Sprint */}
                <div className="p-4 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121424] border border-sky-500/30 shadow-xs flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/[0.06]">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-sky-500/15 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                          <Sun className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-[13px] font-black text-slate-900 dark:text-white leading-none">
                            Afternoon Block
                          </h4>
                          <span className="text-[10px] font-mono text-slate-400 mt-0.5 block">12:00 – 17:00</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[9.5px] font-mono font-bold bg-sky-500/15 text-sky-700 dark:text-sky-300">
                        Practice &amp; Mocks
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400 py-2 leading-relaxed">
                      Best for question sets, calculation drills, and timed tests.
                    </p>

                    <div className="space-y-1.5 mt-1">
                      {afternoonTasks.length === 0 ? (
                        <p className="text-[11px] text-slate-400 italic py-3 text-center">No practice tasks assigned</p>
                      ) : (
                        afternoonTasks.map(t => (
                          <div
                            key={t.id}
                            className="p-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/[0.06] text-xs flex items-center justify-between gap-2"
                          >
                            <div className="min-w-0">
                              <span className="font-bold truncate block">{t.topicName}</span>
                              <span className="text-[10px] text-slate-400 font-mono inline-flex items-center gap-0.5">
                                <Clock className="w-2.5 h-2.5" />
                                {t.estimatedMinutes}m
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleToggleWithConfetti(t.id)}
                              className="w-5 h-5 rounded-md border flex items-center justify-center shrink-0 cursor-pointer"
                            >
                              {t.status === 'completed' && <Check className="w-3 h-3 text-emerald-500 stroke-[3]" />}
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setCategory('practice');
                      setTargetDate(selectedCalendarDate);
                      setShowAddModal(true);
                    }}
                    className="w-full py-2 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-700 dark:text-sky-300 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Practice Sprint</span>
                  </button>
                </div>

                {/* Zone 3: Evening Revision */}
                <div className="p-4 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121424] border border-emerald-500/30 shadow-xs flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/[0.06]">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                          <Moon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-[13px] font-black text-slate-900 dark:text-white leading-none">
                            Evening Block
                          </h4>
                          <span className="text-[10px] font-mono text-slate-400 mt-0.5 block">17:00 – 22:00</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[9.5px] font-mono font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                        Daily Recall
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400 py-2 leading-relaxed">
                      Best for vocabulary flashcards, formulas, and mistake review.
                    </p>

                    <div className="space-y-1.5 mt-1">
                      {eveningTasks.length === 0 ? (
                        <p className="text-[11px] text-slate-400 italic py-3 text-center">No revision tasks assigned</p>
                      ) : (
                        eveningTasks.map(t => (
                          <div
                            key={t.id}
                            className="p-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/[0.06] text-xs flex items-center justify-between gap-2"
                          >
                            <div className="min-w-0">
                              <span className="font-bold truncate block">{t.topicName}</span>
                              <span className="text-[10px] text-slate-400 font-mono inline-flex items-center gap-0.5">
                                <Clock className="w-2.5 h-2.5" />
                                {t.estimatedMinutes}m
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleToggleWithConfetti(t.id)}
                              className="w-5 h-5 rounded-md border flex items-center justify-center shrink-0 cursor-pointer"
                            >
                              {t.status === 'completed' && <Check className="w-3 h-3 text-emerald-500 stroke-[3]" />}
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setCategory('revision');
                      setTargetDate(selectedCalendarDate);
                      setShowAddModal(true);
                    }}
                    className="w-full py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Revision Target</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══════════════ 6. STREAMLINED ADD TARGET MODAL ═══════════════ */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in font-sans">
          <div className="w-full max-w-lg rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121424] border border-slate-200/90 dark:border-white/10 shadow-2xl p-5 sm:p-6 space-y-4 animate-scale-in max-h-[92vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center font-bold shadow-xs">
                  <Plus className="w-4 h-4 stroke-[3]" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900 dark:text-white tracking-tight">
                    Schedule Study Target
                  </h3>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">
                    {formatSelectedDateReadable(targetDate || getTodayDateString())}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 dark:bg-[#1A1B29] flex items-center justify-center text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-3.5">
              
              {/* Option A: Search Syllabus Topics */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Pick from Syllabus (Optional)
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search topics or chapters..."
                    value={topicSearchQuery}
                    onChange={e => setTopicSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#12131D] border border-slate-200 dark:border-white/[0.08] text-xs font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>

                {topicSearchQuery.trim() && (
                  <div className="max-h-36 overflow-y-auto rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-[#12131D] divide-y divide-slate-100 dark:divide-white/[0.06]">
                    {filteredTopicsForModal.slice(0, 6).map(t => (
                      <div
                        key={t.topic.id}
                        onClick={() => {
                          setSelectedSyllabusTopicId(t.topic.id);
                          setCustomTitle(t.topic.name);
                          setTopicSearchQuery('');
                        }}
                        className="p-2.5 text-xs font-semibold text-slate-900 dark:text-[#C0CAF5] hover:bg-amber-500/10 cursor-pointer flex items-center justify-between"
                      >
                        <span>{t.topic.name}</span>
                        <span className="text-[11px] text-slate-400">{formatTitleCase(t.subjectName)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Option B: Custom Title */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Target Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. 50 Quantitative Mock Questions..."
                  value={customTitle}
                  onChange={e => {
                    setCustomTitle(e.target.value);
                    if (selectedSyllabusTopicId) setSelectedSyllabusTopicId('');
                  }}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#12131D] border border-slate-200 dark:border-white/[0.08] text-xs font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              {/* Category Quick Pills */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Study Type
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {(
                    [
                      { id: 'concept', label: 'Theory' },
                      { id: 'practice', label: 'Practice' },
                      { id: 'revision', label: 'Revision' },
                      { id: 'mock', label: 'Mock' }
                    ] as const
                  ).map(c => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCategory(c.id)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        category === c.id
                          ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 border-transparent font-black shadow-xs'
                          : 'bg-slate-50 dark:bg-white/[0.04] border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Priority & Estimated Minutes */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={e => setPriority(e.target.value as TaskPriority)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#12131D] border border-slate-200 dark:border-white/[0.08] text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Duration (Minutes)
                  </label>
                  <input
                    type="number"
                    min={10}
                    max={240}
                    step={5}
                    value={estimatedMins === 0 ? '' : estimatedMins}
                    onChange={e => setEstimatedMins(e.target.value === '' ? 0 : Math.max(0, parseInt(e.target.value, 10) || 0))}
                    onFocus={e => e.target.select()}
                    placeholder="30"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#12131D] border border-slate-200 dark:border-white/[0.08] text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!customTitle.trim() && !selectedSyllabusTopicId}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md shadow-amber-500/25 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
              >
                Schedule Target
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

