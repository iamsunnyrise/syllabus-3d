import React, { useState, useMemo } from 'react';
import {
  Clock,
  Plus,
  Sparkles,
  Printer,
  RotateCcw,
  CheckCircle2,
  Check,
  Calendar,
  Layers,
  Flame,
  ChevronRight,
  Play,
  Pencil,
  Trash2,
  Sun,
  Sunrise,
  Sunset,
  Moon,
  Coffee,
  BookOpen,
  CheckSquare,
  Square,
  AlertCircle,
  ExternalLink,
  Target
} from 'lucide-react';
import {
  RoutineSlot,
  RoutineDay,
  ALL_ROUTINE_DAYS,
  CATEGORY_CONFIG,
  RoutineSlotCategory
} from '../../types/routine';
import {
  useRoutine,
  formatSlotDuration,
  format12Hour,
  timeToMinutes
} from '../../context/RoutineContext';
import { RoutineSlotModal } from './RoutineSlotModal';
import { RoutineTemplatesModal } from './RoutineTemplatesModal';
import { soundManager } from '../../utils/soundEffects';
import { haptics } from '../../utils/haptics';

interface RoutineMakerViewProps {
  onOpenFocusChamber?: (topicId?: string) => void;
}

const CATEGORY_ACCENT_CLASSES: Record<RoutineSlotCategory, {
  border: string;
  badge: string;
}> = {
  concept: {
    border: 'border-l-blue-500 dark:border-l-blue-400',
    badge: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20'
  },
  practice: {
    border: 'border-l-emerald-500 dark:border-l-emerald-400',
    badge: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20'
  },
  revision: {
    border: 'border-l-amber-500 dark:border-l-amber-400',
    badge: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20'
  },
  mock: {
    border: 'border-l-rose-500 dark:border-l-rose-400',
    badge: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20'
  },
  reading: {
    border: 'border-l-purple-500 dark:border-l-purple-400',
    badge: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20'
  },
  break: {
    border: 'border-l-cyan-500 dark:border-l-cyan-400',
    badge: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/20'
  },
  sleep: {
    border: 'border-l-indigo-400 dark:border-l-indigo-400',
    badge: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/20'
  },
  custom: {
    border: 'border-l-violet-500 dark:border-l-violet-400',
    badge: 'bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-500/20'
  }
};

export const RoutineMakerView: React.FC<RoutineMakerViewProps> = ({
  onOpenFocusChamber
}) => {
  const {
    routineSlots,
    activeSlot,
    nextSlot,
    currentDay,
    currentTimeString,
    todayCompletedSlotIds,
    todayStudySlotsCount,
    todayCompletedStudySlotsCount,
    todayAdherencePercent,
    totalPlannedStudyHours,
    addSlot,
    updateSlot,
    deleteSlot,
    toggleSlotCompleteToday,
    applyTemplate,
    resetTodayRoutine,
    clearAllSlots
  } = useRoutine();

  const [selectedDayFilter, setSelectedDayFilter] = useState<RoutineDay | 'all'>('all');
  const [isSlotModalOpen, setIsSlotModalOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState<RoutineSlot | null>(null);
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState(false);

  // Filter slots by selected day and sort chronologically by startTime
  const filteredSortedSlots = useMemo(() => {
    let slots = [...routineSlots];
    if (selectedDayFilter !== 'all') {
      slots = slots.filter(s => s.days.includes(selectedDayFilter));
    }
    return slots.sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));
  }, [routineSlots, selectedDayFilter]);

  // Group slots into 4 day phases
  const phaseGroups = useMemo(() => {
    const morning: RoutineSlot[] = [];
    const afternoon: RoutineSlot[] = [];
    const evening: RoutineSlot[] = [];
    const night: RoutineSlot[] = [];

    filteredSortedSlots.forEach(slot => {
      const mins = timeToMinutes(slot.startTime);
      if (mins >= 300 && mins < 720) {
        // 05:00 - 11:59
        morning.push(slot);
      } else if (mins >= 720 && mins < 1020) {
        // 12:00 - 16:59
        afternoon.push(slot);
      } else if (mins >= 1020 && mins < 1260) {
        // 17:00 - 20:59
        evening.push(slot);
      } else {
        // 21:00 - 04:59
        night.push(slot);
      }
    });

    return [
      {
        id: 'morning',
        title: 'Morning Focus & Concept Blocks',
        timeRange: '05:00 AM - 12:00 PM',
        icon: Sunrise,
        iconColor: 'text-amber-500 bg-amber-500/15 border-amber-500/30',
        slots: morning
      },
      {
        id: 'afternoon',
        title: 'Afternoon Practice & Speed Sprints',
        timeRange: '12:00 PM - 05:00 PM',
        icon: Sun,
        iconColor: 'text-orange-500 bg-orange-500/15 border-orange-500/30',
        slots: afternoon
      },
      {
        id: 'evening',
        title: 'Evening Deep Work & Subject Mastery',
        timeRange: '05:00 PM - 09:00 PM',
        icon: Sunset,
        iconColor: 'text-indigo-500 bg-indigo-500/15 border-indigo-500/30',
        slots: evening
      },
      {
        id: 'night',
        title: 'Night Recall, Reflection & Rest',
        timeRange: '09:00 PM - 05:00 AM',
        icon: Moon,
        iconColor: 'text-purple-400 bg-purple-500/15 border-purple-500/30',
        slots: night
      }
    ];
  }, [filteredSortedSlots]);

  // Calculate remaining minutes in current active slot
  const activeRemainingMins = useMemo(() => {
    if (!activeSlot) return 0;
    let endMins = timeToMinutes(activeSlot.endTime);
    const currMins = timeToMinutes(currentTimeString);
    if (endMins < timeToMinutes(activeSlot.startTime)) endMins += 24 * 60;
    return Math.max(0, endMins - currMins);
  }, [activeSlot, currentTimeString]);

  // Calculate percentage elapsed for active slot progress bar
  const activeSlotProgress = useMemo(() => {
    if (!activeSlot) return 0;
    const startMins = timeToMinutes(activeSlot.startTime);
    let endMins = timeToMinutes(activeSlot.endTime);
    if (endMins < startMins) endMins += 24 * 60;
    let currMins = timeToMinutes(currentTimeString);
    if (currMins < startMins && endMins >= 24 * 60) currMins += 24 * 60;
    const total = endMins - startMins;
    if (total <= 0) return 0;
    const elapsed = currMins - startMins;
    return Math.min(100, Math.max(0, Math.round((elapsed / total) * 100)));
  }, [activeSlot, currentTimeString]);

  const handlePrint = () => {
    soundManager.playClick();
    window.print();
  };

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in print:space-y-2">
      
      {/* ═════════════════ 1. EXECUTIVE ROUTINE HEADER ═════════════════ */}
      <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-[#11131F] border border-slate-200/80 dark:border-white/10 shadow-subtle-depth relative overflow-hidden print:border-none print:shadow-none print:p-0">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-3xl pointer-events-none print:hidden" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-amber-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl pointer-events-none print:hidden" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5 sm:gap-4 min-w-0">
            <div className="w-11 sm:w-12 h-11 sm:h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/25 shrink-0 print:hidden">
              <Clock className="w-6 h-6 stroke-[2.2]" />
            </div>

            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Master Daily Routine &amp; Timetable
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/20 shrink-0">
                  {routineSlots.length} Blocks Configured
                </span>
              </div>

              <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 font-medium line-clamp-1">
                Time-blocked daily schedule for uninterrupted focus, revision sprints, and maximum retention
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 flex-wrap shrink-0 print:hidden">
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setIsTemplatesModalOpen(true);
              }}
              className="btn-secondary py-2 px-3.5 text-xs font-bold hover:border-amber-400/50 dark:hover:border-amber-400/40 transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Proven Templates</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="btn-secondary py-2 px-3 text-xs font-bold"
              title="Print Desk Routine Cheatsheet"
            >
              <Printer className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span className="hidden sm:inline">Print</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setEditingSlot(null);
                setIsSlotModalOpen(true);
              }}
              className="btn-primary py-2 px-4 text-xs font-bold shadow-sm shadow-blue-500/20"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Add Custom Slot</span>
            </button>
          </div>
        </div>

        {/* ═════════ Bento Metric Strip ═════════ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 mt-5 pt-5 border-t border-slate-100 dark:border-white/10 relative z-10 print:hidden">
          {/* Card 1: Discipline Score */}
          <div className="p-3.5 rounded-2xl bg-slate-50/90 dark:bg-[#161828] border border-slate-200/70 dark:border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Discipline Score
              </span>
              <div className="w-7 h-7 rounded-lg bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4 stroke-[2.2]" />
              </div>
            </div>
            <div className="mt-2 space-y-1.5">
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl sm:text-2xl font-black font-mono text-blue-600 dark:text-blue-400 tabular-nums">
                  {todayAdherencePercent}%
                </span>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                  ({todayCompletedStudySlotsCount}/{todayStudySlotsCount} Done)
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-200/80 dark:bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(0, todayAdherencePercent))}%` }}
                />
              </div>
            </div>
          </div>

          {/* Card 2: Today's Study Load */}
          <div className="p-3.5 rounded-2xl bg-slate-50/90 dark:bg-[#161828] border border-slate-200/70 dark:border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Today's Study Load
              </span>
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <BookOpen className="w-4 h-4 stroke-[2.2]" />
              </div>
            </div>
            <div className="mt-2">
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl sm:text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
                  {totalPlannedStudyHours}h
                </span>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                  Deep Work
                </span>
              </div>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 font-mono">
                {todayStudySlotsCount} focus sessions planned
              </p>
            </div>
          </div>

          {/* Card 3: Today's Live Clock */}
          <div className="p-3.5 rounded-2xl bg-slate-50/90 dark:bg-[#161828] border border-slate-200/70 dark:border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Today ({currentDay})
              </span>
              <div className="w-7 h-7 rounded-lg bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 stroke-[2.2]" />
              </div>
            </div>
            <div className="mt-2">
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-black font-mono text-slate-900 dark:text-white tabular-nums">
                  {currentTimeString}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live time sync</span>
              </div>
            </div>
          </div>

          {/* Card 4: Daily Momentum / Reset */}
          <div className="p-3.5 rounded-2xl bg-slate-50/90 dark:bg-[#161828] border border-slate-200/70 dark:border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Daily Momentum
              </span>
              <div className="w-7 h-7 rounded-lg bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
                <Flame className="w-4 h-4 stroke-[2.2]" />
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between gap-2">
              <div>
                <p className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-200">
                  {todayCompletedStudySlotsCount > 0 ? `${todayCompletedStudySlotsCount} Completed` : 'Ready to Start'}
                </p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                  {todayCompletedStudySlotsCount > 0 ? 'Keep the streak alive!' : 'Track off your slots'}
                </p>
              </div>
              {todayCompletedStudySlotsCount > 0 && (
                <button
                  type="button"
                  onClick={resetTodayRoutine}
                  className="px-2 py-1 rounded-lg text-[11px] font-bold text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 border border-slate-200/70 dark:border-white/10 transition-colors cursor-pointer flex items-center gap-1 shrink-0"
                  title="Reset completed checkmarks for today"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ═════════════════ 2. LIVE ACTIVE SLOT SPOTLIGHT HUD ═════════════════ */}
      {activeSlot ? (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50/80 via-indigo-50/50 to-purple-50/60 dark:from-[#13172E] dark:via-[#191933] dark:to-[#16152B] border-2 border-blue-500/40 dark:border-indigo-500/40 shadow-lg shadow-blue-500/5 dark:shadow-indigo-500/10 relative overflow-hidden animate-fade-in print:hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2 min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-600 text-white shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  LIVE NOW
                </span>

                <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-200">
                  {format12Hour(activeSlot.startTime)} - {format12Hour(activeSlot.endTime)} ({formatSlotDuration(activeSlot.startTime, activeSlot.endTime)})
                </span>

                <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/25 font-mono">
                  ⏳ {activeRemainingMins} mins remaining
                </span>
              </div>

              <h3 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight truncate">
                {activeSlot.title}
              </h3>

              {/* Progress Bar */}
              <div className="space-y-1 max-w-xl">
                <div className="w-full h-2 bg-slate-200/80 dark:bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full transition-all duration-700"
                    style={{ width: `${activeSlotProgress}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] sm:text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  <span>{activeSlotProgress}% time elapsed</span>
                  <span>Ends at {format12Hour(activeSlot.endTime)}</span>
                </div>
              </div>

              {activeSlot.notes && (
                <div className="p-2.5 rounded-xl bg-white/70 dark:bg-white/[0.04] border border-blue-200/50 dark:border-white/10 max-w-xl">
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium line-clamp-2">
                    💡 <span className="font-bold">Strategy:</span> {activeSlot.notes}
                  </p>
                </div>
              )}
            </div>

            {/* Quick Actions for Active Slot */}
            <div className="flex items-center gap-2 shrink-0 self-start md:self-center">
              <button
                type="button"
                onClick={() => toggleSlotCompleteToday(activeSlot.id)}
                className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                  todayCompletedSlotIds.includes(activeSlot.id)
                    ? 'bg-emerald-600 text-white font-black hover:bg-emerald-700 border-emerald-600 shadow-xs'
                    : 'bg-white dark:bg-[#1E202E] border-slate-200 dark:border-white/15 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5'
                }`}
              >
                <CheckCircle2 className={`w-4 h-4 ${todayCompletedSlotIds.includes(activeSlot.id) ? 'text-white' : 'text-emerald-500'}`} />
                <span>{todayCompletedSlotIds.includes(activeSlot.id) ? 'Done Today! ✨' : 'Mark Done'}</span>
              </button>

              {onOpenFocusChamber && activeSlot.category !== 'sleep' && activeSlot.category !== 'break' && (
                <button
                  type="button"
                  onClick={() => onOpenFocusChamber(activeSlot.topicName || activeSlot.title)}
                  className="btn-primary py-2 px-4 text-xs font-bold shadow-sm shadow-blue-500/20"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Start Focus Chamber</span>
                </button>
              )}
            </div>
          </div>
        </div>
      ) : nextSlot ? (
        <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-[#151726] border border-slate-200/80 dark:border-white/10 flex items-center justify-between gap-3 animate-fade-in print:hidden">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/25 shrink-0">
              NEXT UP
            </span>
            <span className="font-mono font-bold text-xs text-slate-600 dark:text-slate-300 shrink-0">
              {format12Hour(nextSlot.startTime)}
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 truncate">
              {nextSlot.title}
            </span>
          </div>

          <span className="text-[11px] font-mono font-semibold text-slate-400 shrink-0">
            Duration: {formatSlotDuration(nextSlot.startTime, nextSlot.endTime)}
          </span>
        </div>
      ) : null}

      {/* ═════════════════ 3. DAY SELECTOR FILTER STRIP ═════════════════ */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 no-scrollbar print:hidden">
        <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-100/90 dark:bg-white/[0.05] border border-slate-200/70 dark:border-white/[0.06] shadow-2xs shrink-0">
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setSelectedDayFilter('all');
            }}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              selectedDayFilter === 'all'
                ? 'bg-white dark:bg-[#1E202E] text-slate-900 dark:text-white shadow-xs font-black'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All Days ({routineSlots.length})
          </button>

          {ALL_ROUTINE_DAYS.map(day => {
            const isToday = day === currentDay;
            const isSelected = selectedDayFilter === day;
            return (
              <button
                key={day}
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setSelectedDayFilter(day);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white dark:bg-[#1E202E] text-slate-900 dark:text-white shadow-xs font-black'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>{day}</span>
                {isToday && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 ring-2 ring-emerald-500/30 animate-pulse" title="Today" />
                )}
              </button>
            );
          })}
        </div>

        {routineSlots.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to clear all routine slots?')) {
                clearAllSlots();
              }
            }}
            className="px-2.5 py-1 text-[11px] font-bold text-slate-400 hover:text-rose-500 transition-colors cursor-pointer shrink-0 flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* ═════════════════ 4. PHASE-WISE TIMELINE & SLOTS ═════════════════ */}
      {filteredSortedSlots.length === 0 ? (
        /* Empty State */
        <div className="p-8 sm:p-12 text-center rounded-2xl border border-dashed border-slate-300 dark:border-white/10 bg-slate-50/50 dark:bg-[#12141F]/50 space-y-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center text-3xl">
            ⏰
          </div>
          <div className="space-y-1 max-w-md mx-auto">
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              No Routine Slots for {selectedDayFilter === 'all' ? 'Your Schedule' : selectedDayFilter}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Build your customized study routine or start with one of our 5 battle-tested aspirant routines.
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsTemplatesModalOpen(true)}
              className="btn-secondary py-2 px-4 text-xs font-bold"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Choose a Proven Template</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setEditingSlot(null);
                setIsSlotModalOpen(true);
              }}
              className="btn-primary py-2 px-4 text-xs font-bold"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Create First Slot</span>
            </button>
          </div>
        </div>
      ) : (
        /* Phase Groups */
        <div className="space-y-6 print:space-y-4">
          {phaseGroups.map(group => {
            if (group.slots.length === 0) return null;
            const Icon = group.icon;
            return (
              <div key={group.id} className="space-y-3">
                {/* Phase Header */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-1.5 rounded-lg border ${group.iconColor}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white tracking-tight">
                      {group.title}
                    </h3>
                  </div>

                  <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 tabular-nums px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200/70 dark:border-white/10">
                    {group.timeRange} • {group.slots.length} Blocks
                  </span>
                </div>

                {/* Slots Grid */}
                <div className="grid grid-cols-1 gap-2.5">
                  {group.slots.map(slot => {
                    const cfg = CATEGORY_CONFIG[slot.category];
                    const accent = CATEGORY_ACCENT_CLASSES[slot.category] || CATEGORY_ACCENT_CLASSES.custom;
                    const isCompleted = todayCompletedSlotIds.includes(slot.id);
                    const isCurrentlyActive = activeSlot?.id === slot.id;

                    return (
                      <div
                        key={slot.id}
                        className={`p-3.5 sm:p-4 rounded-2xl border border-l-4 transition-all duration-150 ${accent.border} ${
                          isCurrentlyActive
                            ? 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-400 dark:border-blue-500/40 ring-1 ring-blue-500/30 shadow-xs'
                            : isCompleted
                            ? 'bg-slate-50/70 dark:bg-[#131522] border-slate-200/70 dark:border-white/5 opacity-85'
                            : 'bg-white dark:bg-[#141624] border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 shadow-2xs hover:shadow-xs'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          
                          {/* Left: Timing & Details */}
                          <div className="flex items-start gap-3 min-w-0 flex-1">
                            {/* Checkbox for Today */}
                            <button
                              type="button"
                              role="checkbox"
                              aria-checked={isCompleted}
                              aria-label={`Mark "${slot.title}" as completed today`}
                              onClick={() => toggleSlotCompleteToday(slot.id)}
                              className={`w-5 h-5 rounded-lg border-2 transition-all cursor-pointer shrink-0 mt-0.5 flex items-center justify-center active:scale-95 ${
                                isCompleted
                                  ? 'bg-emerald-600 border-emerald-600 text-white shadow-2xs'
                                  : 'border-slate-300 dark:border-slate-600 hover:border-blue-500 bg-white dark:bg-[#1E202E]'
                              }`}
                              title={isCompleted ? 'Completed today! Click to uncheck' : 'Mark as completed today'}
                            >
                              {isCompleted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </button>

                            <div className="space-y-1.5 min-w-0 flex-1">
                              {/* Meta Row: Time, Category & Subject */}
                              <div className="flex items-center gap-2 flex-wrap text-xs">
                                <span className="font-mono font-black text-slate-900 dark:text-white text-xs sm:text-sm">
                                  {format12Hour(slot.startTime)} - {format12Hour(slot.endTime)}
                                </span>

                                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/5">
                                  {formatSlotDuration(slot.startTime, slot.endTime)}
                                </span>

                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold border ${accent.badge}`}>
                                  <span>{cfg.icon}</span>
                                  <span>{cfg.label}</span>
                                </span>

                                {slot.subjectName && (
                                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 dark:bg-white/5 border border-slate-200/70 dark:border-white/10 text-slate-700 dark:text-slate-300">
                                    <span
                                      className="w-2 h-2 rounded-full shrink-0"
                                      style={{ backgroundColor: slot.subjectColor || '#3B82F6' }}
                                    />
                                    <span>{slot.subjectName}</span>
                                  </span>
                                )}

                                {isCurrentlyActive && (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-black bg-blue-600 text-white animate-pulse">
                                    CURRENT
                                  </span>
                                )}
                              </div>

                              {/* Slot Title */}
                              <h4 className={`text-sm sm:text-[15px] font-bold text-slate-900 dark:text-white ${isCompleted ? 'line-through text-slate-400 dark:text-slate-500' : ''}`}>
                                {slot.title}
                              </h4>

                              {/* Strategy / Notes */}
                              {slot.notes && (
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-relaxed">
                                  💡 {slot.notes}
                                </p>
                              )}

                              {/* Sub-goals / Checklists */}
                              {slot.checklists && slot.checklists.length > 0 && (
                                <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                                  {slot.checklists.map((target, tIdx) => (
                                    <span
                                      key={tIdx}
                                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 text-[10px] font-medium text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 flex items-center gap-1"
                                    >
                                      <Check className="w-2.5 h-2.5 text-emerald-500" />
                                      <span>{target}</span>
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Right: Days Pills & Actions */}
                          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-slate-100 dark:border-white/5">
                            {/* Days Pills */}
                            <div className="flex items-center gap-1">
                              {ALL_ROUTINE_DAYS.map(day => {
                                const isDayActive = slot.days.includes(day);
                                return (
                                  <span
                                    key={day}
                                    className={`w-5 h-5 text-[10px] font-mono font-bold rounded flex items-center justify-center transition-colors ${
                                      isDayActive
                                        ? 'bg-blue-600/10 dark:bg-blue-400/15 text-blue-600 dark:text-blue-400 font-black'
                                        : 'text-slate-300 dark:text-slate-700'
                                    }`}
                                    title={`${day}: ${isDayActive ? 'Scheduled' : 'Off'}`}
                                  >
                                    {day[0]}
                                  </span>
                                );
                              })}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-1">
                              {onOpenFocusChamber && slot.category !== 'sleep' && slot.category !== 'break' && (
                                <button
                                  type="button"
                                  onClick={() => onOpenFocusChamber(slot.title)}
                                  className="p-1.5 rounded-lg text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 transition-colors cursor-pointer"
                                  title="Launch Focus Chamber"
                                >
                                  <Play className="w-4 h-4 fill-current" />
                                </button>
                              )}

                              <button
                                type="button"
                                onClick={() => {
                                  soundManager.playClick();
                                  setEditingSlot(slot);
                                  setIsSlotModalOpen(true);
                                }}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                                title="Edit Slot"
                              >
                                <Pencil className="w-4 h-4" />
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  if (window.confirm(`Delete "${slot.title}"?`)) {
                                    deleteSlot(slot.id);
                                  }
                                }}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                                title="Delete Slot"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ═════════════════ MODALS ═════════════════ */}
      <RoutineSlotModal
        isOpen={isSlotModalOpen}
        onClose={() => setIsSlotModalOpen(false)}
        onSave={slotData => {
          if (editingSlot) {
            updateSlot(editingSlot.id, slotData);
          } else {
            addSlot(slotData);
          }
        }}
        editingSlot={editingSlot}
      />

      <RoutineTemplatesModal
        isOpen={isTemplatesModalOpen}
        onClose={() => setIsTemplatesModalOpen(false)}
        onApplyTemplate={tplId => applyTemplate(tplId)}
        currentSlotsCount={routineSlots.length}
      />

    </div>
  );
};
