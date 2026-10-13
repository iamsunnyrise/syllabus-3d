import React, { useState, useEffect, useMemo } from 'react';
import { useSyllabus } from '../../context/SyllabusContext';
import { Calendar, Target, Clock, Zap, Flame } from 'lucide-react';

export const ExamCountdown3D: React.FC = React.memo(() => {
  const { currentExam, overallStats } = useSyllabus();

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

  // Daily Pace Target calculation (topics per day)
  const paceTarget = useMemo(() => {
    const total = overallStats?.totalTopics || 0;
    const done = overallStats?.completedCount || 0;
    const remaining = Math.max(0, total - done);
    const days = Math.max(1, timeLeft.days);

    if (remaining === 0) return { text: 'Syllabus Completed', isComplete: true };
    const perDay = (remaining / days).toFixed(1);
    return {
      text: `~${perDay} topics/day pace`,
      isComplete: false
    };
  }, [overallStats?.totalTopics, overallStats?.completedCount, timeLeft.days]);

  const examName = currentExam?.name || 'Target Exam';

  return (
    <div className="group relative rounded-2xl bg-white dark:bg-[#0E111D]/90 dark:backdrop-blur-xl border border-slate-200/80 dark:border-white/[0.08] shadow-xs hover:shadow-md dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all duration-300 p-4 sm:p-5.5 space-y-4 overflow-hidden exam-countdown-card">
      {/* Subtle Top Accent Glow */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${phaseConfig.barGradient} opacity-75 pointer-events-none`} />
      <div className={`absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl pointer-events-none transition-all ${phaseConfig.glowColor}`} />

      {/* Header: Identity, Exam Date, & Dynamic Pace */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {/* Target Icon with Dynamic Urgency Theme */}
          <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl border flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-all duration-200 ${
            timeLeft.days <= 30
              ? 'bg-amber-500/10 dark:bg-amber-500/15 border-amber-500/30 text-amber-600 dark:text-amber-400'
              : 'bg-blue-500/10 dark:bg-blue-500/15 border-blue-500/30 text-blue-600 dark:text-blue-400'
          }`}>
            <Target className="w-5 h-5 stroke-[2.3]" />
          </div>

          <div className="min-w-0">
            <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white tracking-tight truncate font-grotesk">
              {examName} Countdown
            </h2>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
              <span className="truncate">Exam Date: <strong className="text-slate-800 dark:text-slate-200 font-semibold">{formattedDate}</strong></span>
              {timeLeft.isProjected && (
                <span className="text-amber-600 dark:text-amber-400 text-xs font-semibold shrink-0">
                  (Projected)
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Pace Requirement HUD */}
        <div className="flex items-center gap-1.5 text-xs font-mono self-start sm:self-auto px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 dark:from-amber-950/40 dark:to-orange-950/30 border border-amber-500/25 dark:border-amber-500/30 text-amber-800 dark:text-amber-300 shadow-2xs">
          <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0 animate-pulse" />
          <span className="truncate font-bold">{paceTarget.text}</span>
        </div>
      </div>

      {/* 4 Unified, Mission-Clock Split-Flap Digit Cards */}
      <div className="relative z-10 grid grid-cols-4 gap-2 sm:gap-3.5">
        {cards.map(c => (
          <div
            key={c.label}
            className={`relative py-3.5 sm:py-5 px-1.5 sm:px-3 rounded-2xl border text-center flex flex-col items-center justify-center transition-all duration-300 select-none shadow-xs hover:shadow-md hover:-translate-y-0.5 group/card overflow-hidden ${
              c.isPrimary
                ? 'bg-gradient-to-b from-amber-50/90 via-amber-100/40 to-amber-50/60 dark:from-amber-950/40 dark:via-amber-900/10 dark:to-transparent border-amber-400/60 dark:border-amber-500/40 shadow-amber-500/5'
                : 'bg-gradient-to-b from-slate-50/90 via-white to-slate-50/50 dark:from-white/[0.06] dark:via-white/[0.03] dark:to-transparent border-slate-200/90 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/20'
            }`}
          >
            {/* Split-Flap Center Crease Line */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-px h-px bg-slate-300/50 dark:bg-black/40 pointer-events-none" />

            {/* Precision Notch Side Cutouts */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-2 rounded-r-full bg-slate-300/60 dark:bg-slate-700/70 pointer-events-none" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-2 rounded-l-full bg-slate-300/60 dark:bg-slate-700/70 pointer-events-none" />

            {/* Digits Display */}
            <div className="relative z-10 flex items-baseline justify-center">
              <span className={`text-3xl sm:text-4xl md:text-5xl font-black font-mono tabular-nums tracking-tight leading-none drop-shadow-xs ${
                c.isPrimary
                  ? 'text-amber-600 dark:text-amber-400'
                  : 'text-slate-900 dark:text-white'
              }`}>
                {String(c.value).padStart(2, '0')}
              </span>
            </div>

            {/* Unit Label with Precision Dot for SECS */}
            <div className="relative z-10 flex items-center gap-1.5 mt-2">
              <span className={`text-[10px] sm:text-xs font-black uppercase tracking-widest font-mono ${
                c.isPrimary ? 'text-amber-700 dark:text-amber-400/90' : 'text-slate-400 dark:text-slate-500'
              }`}>
                {c.label}
              </span>
              {c.label === 'SECS' && (
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping inline-block" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer: Dynamic Runway Timeline Track & Motivational Target */}
      <div className="relative z-10 pt-3 border-t border-slate-100 dark:border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs font-mono">
        <div className="flex items-center gap-2 min-w-0">
          <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
          <span className="truncate text-slate-600 dark:text-slate-300">
            Runway: <strong className="text-slate-900 dark:text-white font-bold">{timeLeft.days} Days {timeLeft.hours}h</strong> remaining
          </span>
          <span className="text-slate-300 dark:text-slate-600 hidden sm:inline">•</span>
          <span className="text-slate-500 dark:text-slate-400 hidden sm:inline truncate">{phaseConfig.sub}</span>
        </div>

        <div className="flex items-center gap-1.5 font-bold text-amber-600 dark:text-amber-400 self-end sm:self-auto shrink-0">
          <Flame className="w-3.5 h-3.5 fill-current animate-bounce" />
          <span>Keep Consistent & Focused</span>
        </div>
      </div>
    </div>
  );
});
