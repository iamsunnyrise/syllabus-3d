import React, { useState, useEffect, useMemo } from 'react';
import { useSyllabus } from '../../context/SyllabusContext';
import { Calendar, Target, Pencil } from 'lucide-react';

interface ExamCountdown3DProps {
  onEditDate?: () => void;
  className?: string;
}

export const ExamCountdown3D: React.FC<ExamCountdown3DProps> = React.memo(({ onEditDate, className = '' }) => {
  const { currentExam } = useSyllabus();

  // Calculate dynamic countdown with automatic smart rollover if date has passed
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isProjected: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isProjected: false });

  useEffect(() => {
    if (!currentExam) return;

    const calculateTime = () => {
      const now = new Date().getTime();
      const rawDateStr = currentExam.examDate || '2026-10-15';
      
      let targetYr = currentExam.targetYear || 2026;
      let month = 9; // Oct default (0-indexed)
      let day = 15;

      if (rawDateStr.includes('-')) {
        const parts = rawDateStr.split('-').map(Number);
        if (parts.length >= 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
          targetYr = parts[0];
          month = parts[1] - 1;
          day = parts[2];
        }
      }

      const parsedDate = new Date(targetYr, month, day, 9, 0, 0);
      let examTime = parsedDate.getTime();
      let projected = false;

      // If exam date has passed in the past, roll over to the exact same month/day in the next upcoming cycle
      if (isNaN(examTime) || examTime <= now) {
        projected = true;
        const currentYear = new Date().getFullYear();
        let nextCycleDate = new Date(Math.max(targetYr, currentYear), month, day, 9, 0, 0);
        if (nextCycleDate.getTime() <= now) {
          nextCycleDate = new Date(Math.max(targetYr, currentYear) + 1, month, day, 9, 0, 0);
        }
        examTime = nextCycleDate.getTime();
      }

      const difference = Math.max(0, examTime - now);
      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const m = Math.floor((difference / 1000 / 60) % 60);
      const s = Math.floor((difference / 1000) % 60);

      setTimeLeft(prev => {
        if (prev.seconds === s && prev.minutes === m && prev.hours === h && prev.days === d && prev.isProjected === projected) {
          return prev;
        }
        return { days: d, hours: h, minutes: m, seconds: s, isProjected: projected };
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [currentExam?.examDate, currentExam?.targetYear, currentExam?.name]);

  // Unified, High-Contrast Mission-Clock Cards
  const cards = useMemo(() => [
    { label: 'DAYS', value: timeLeft.days, isPrimary: true },
    { label: 'HOURS', value: timeLeft.hours, isPrimary: false },
    { label: 'MINS', value: timeLeft.minutes, isPrimary: false },
    { label: 'SECS', value: timeLeft.seconds, isPrimary: false }
  ], [timeLeft]);

  const formattedDate = useMemo(() => {
    try {
      if (!currentExam?.examDate) return 'Oct 15, 2026';
      if (currentExam.examDate.includes('-')) {
        const parts = currentExam.examDate.split('-').map(Number);
        if (parts.length >= 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
          const d = new Date(parts[0], parts[1] - 1, parts[2]);
          return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
        }
      }
      const d = new Date(currentExam.examDate);
      if (isNaN(d.getTime())) return currentExam.examDate;
      return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch {
      return currentExam?.examDate || 'Oct 15, 2026';
    }
  }, [currentExam?.examDate]);

  // Dynamic Phase Urgency Configuration
  const phaseConfig = useMemo(() => {
    const days = timeLeft.days;
    if (days <= 7) {
      return {
        label: 'Final Sprint Mode',
        sub: 'High Stakes • Precision Revision',
        badgeClass: 'bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30',
        dotColor: 'bg-rose-500',
        barGradient: 'from-amber-500 via-rose-500 to-red-600',
        glowColor: 'bg-rose-500/10'
      };
    }
    if (days <= 30) {
      return {
        label: 'Peak Revision Phase',
        sub: 'Intensive Practice & Mock Tests',
        badgeClass: 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30',
        dotColor: 'bg-amber-500',
        barGradient: 'from-amber-400 via-amber-500 to-orange-500',
        glowColor: 'bg-amber-500/10'
      };
    }
    return {
      label: 'Strategic Build Phase',
      sub: 'Concept Mastery & Consistency',
      badgeClass: 'bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30',
      dotColor: 'bg-blue-500',
      barGradient: 'from-blue-500 via-indigo-500 to-violet-600',
      glowColor: 'bg-blue-500/10'
    };
  }, [timeLeft.days]);

  const examName = currentExam?.name || 'Target Exam';

  return (
    <div className={`group relative rounded-2xl bg-white dark:bg-[#0E111D]/90 dark:backdrop-blur-xl border border-slate-200/80 dark:border-white/[0.08] shadow-xs hover:shadow-md dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all duration-300 p-4 sm:p-5.5 space-y-4 overflow-hidden exam-countdown-card ${className}`}>
      {/* Subtle Top Accent Glow */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${phaseConfig.barGradient} opacity-75 pointer-events-none`} />
      <div className={`absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl pointer-events-none transition-all ${phaseConfig.glowColor}`} />

      {/* Header: Identity, Exam Date, & Dynamic Pace */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {/* Target Icon with Dynamic Urgency Theme */}
          <div className={`w-9 sm:w-10 h-9 sm:h-10 rounded-xl border flex items-center justify-center shrink-0 shadow-2xs transition-all duration-200 ${
            timeLeft.days <= 30
              ? 'bg-amber-500/10 dark:bg-amber-500/15 border-amber-500/30 text-amber-600 dark:text-amber-400'
              : 'bg-blue-500/10 dark:bg-blue-500/15 border-blue-500/30 text-blue-600 dark:text-blue-400'
          }`}>
            <Target className="w-4 sm:w-4.5 h-4 sm:h-4.5 stroke-[2.3]" />
          </div>

          <div className="min-w-0">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight truncate font-sans">
              {examName} Countdown
            </h2>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-sans mt-0.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
              <span className="truncate">Exam Date: <strong className="text-slate-800 dark:text-slate-200 font-semibold">{formattedDate}</strong></span>
              {timeLeft.isProjected && (
                <span className="text-amber-600 dark:text-amber-400 text-xs font-semibold shrink-0">
                  (Projected)
                </span>
              )}
              {onEditDate && (
                <button
                  type="button"
                  onClick={onEditDate}
                  className="ml-1 p-0.5 rounded hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors cursor-pointer"
                  title="Change Exam Date"
                >
                  <Pencil className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 4 Clean Modern Executive Countdown Cards */}
      <div className="relative z-10 grid grid-cols-4 gap-2 sm:gap-3.5">
        {cards.map(c => (
          <div
            key={c.label}
            className={`relative py-3.5 sm:py-5 px-1.5 sm:px-3 rounded-xl sm:rounded-2xl border text-center flex flex-col items-center justify-center transition-all duration-200 select-none shadow-2xs hover:shadow-xs group/card overflow-hidden ${
              c.isPrimary
                ? 'bg-amber-500/[0.07] dark:bg-amber-500/[0.08] border-amber-400/50 dark:border-amber-500/35'
                : 'bg-slate-50/70 dark:bg-white/[0.03] border-slate-200/80 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/20'
            }`}
          >
            {/* Digits Display */}
            <div className="relative z-10 flex items-baseline justify-center">
              <span className={`text-2xl sm:text-4xl md:text-5xl font-black font-sans tabular-nums tracking-tight leading-none ${
                c.isPrimary
                  ? 'text-amber-600 dark:text-amber-400'
                  : 'text-slate-900 dark:text-white'
              }`}>
                {String(c.value).padStart(2, '0')}
              </span>
            </div>

            {/* Unit Label */}
            <div className="relative z-10 mt-1.5 sm:mt-2">
              <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider font-sans ${
                c.isPrimary ? 'text-amber-700 dark:text-amber-400' : 'text-slate-400 dark:text-slate-500'
              }`}>
                {c.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
