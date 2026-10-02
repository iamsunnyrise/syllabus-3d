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

    if (remaining === 0) return { text: 'Syllabus 100% Completed', isComplete: true };
    const perDay = (remaining / days).toFixed(1);
    return {
      text: `~${perDay} topics/day needed (${remaining} remaining)`,
      isComplete: false
    };
  }, [overallStats?.totalTopics, overallStats?.completedCount, timeLeft.days]);

  const examName = currentExam?.name || 'Target Exam';

  return (
    <div className="group relative rounded-2xl bg-white dark:bg-[#141624] border border-slate-200/80 dark:border-white/[0.08] shadow-xs hover:shadow-md transition-all duration-300 p-4 sm:p-5.5 space-y-4 overflow-hidden exam-countdown-card">
      {/* Subtle Top Accent Glow */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${phaseConfig.barGradient} opacity-75 pointer-events-none`} />
      <div className={`absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl pointer-events-none transition-all ${phaseConfig.glowColor}`} />

      {/* Header: Identity, Exam Date, & Dynamic Phase Urgency */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {/* Target Icon with Dynamic Glow */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/70 dark:border-white/10 text-slate-800 dark:text-slate-100 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform duration-200">
            <Target className="w-5 h-5 text-indigo-600 dark:text-indigo-400 stroke-[2.2]" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white tracking-tight truncate">
                {examName} Countdown
              </h2>
              <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider border ${phaseConfig.badgeClass} shrink-0`}>
                <span className={`w-1.5 h-1.5 rounded-full ${phaseConfig.dotColor} animate-pulse`} />
                {phaseConfig.label}
              </span>
            </div>

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
        <div className="flex items-center gap-1.5 text-xs font-mono self-start sm:self-auto px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-white/[0.06] text-slate-700 dark:text-slate-300">
          <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
          <span className="truncate font-semibold">{paceTarget.text}</span>
        </div>
      </div>

      {/* 4 Unified, Mission-Clock Digit Cards */}
      <div className="relative z-10 grid grid-cols-4 gap-2 sm:gap-3.5">
        {cards.map(c => (
          <div
            key={c.label}
            className={`py-3 sm:py-4 px-1 sm:px-2 rounded-xl sm:rounded-2xl border text-center flex flex-col items-center justify-center transition-all duration-200 select-none shadow-2xs group/card ${
              c.isPrimary
                ? 'bg-gradient-to-b from-amber-50/70 to-amber-100/30 dark:from-amber-950/20 dark:to-transparent border-amber-300/80 dark:border-amber-500/30'
                : 'bg-slate-50/80 dark:bg-[#161828] border-slate-200/80 dark:border-white/[0.06] hover:border-slate-300 dark:hover:border-white/15'
            }`}
          >
            <div className="flex items-baseline justify-center gap-0.5">
              <span className={`text-2xl sm:text-3xl md:text-4xl font-black font-mono tabular-nums tracking-tight leading-none ${
                c.isPrimary
                  ? 'text-amber-600 dark:text-amber-400'
                  : 'text-slate-900 dark:text-white'
              }`}>
                {String(c.value).padStart(2, '0')}
              </span>
              {c.label === 'SECS' && (
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse ml-0.5 self-center hidden sm:inline-block" />
              )}
            </div>
            <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest font-mono mt-1.5 ${
              c.isPrimary ? 'text-amber-700 dark:text-amber-400/90' : 'text-slate-400 dark:text-slate-500'
            }`}>
              {c.label}
            </span>
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
          <Flame className="w-3.5 h-3.5 fill-current" />
          <span>Keep Consistent & Focused</span>
        </div>
      </div>
    </div>
  );
});
