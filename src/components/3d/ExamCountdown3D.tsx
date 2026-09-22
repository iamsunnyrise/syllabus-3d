import React, { useState, useEffect, useMemo } from 'react';
import { useSyllabus } from '../../context/SyllabusContext';
import { Calendar, Target, Edit2, Clock } from 'lucide-react';
import { EditExamTargetModal } from '../modals/EditExamTargetModal';
import { soundManager } from '../../utils/soundEffects';
import { haptics } from '../../utils/haptics';

export const ExamCountdown3D: React.FC = React.memo(() => {
  const { currentExam } = useSyllabus();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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

  const cards = useMemo(() => [
    {
      label: 'DAYS',
      value: timeLeft.days,
      color: 'text-amber-500 dark:text-amber-400',
      bg: 'bg-amber-500/[0.04] dark:bg-gradient-to-b dark:from-amber-500/[0.12] dark:to-[#141624]',
      border: 'border-amber-500/25 dark:border-amber-500/30',
      topLine: 'bg-amber-400/90',
      shadow: 'shadow-amber-500/5'
    },
    {
      label: 'HOURS',
      value: timeLeft.hours,
      color: 'text-sky-500 dark:text-sky-400',
      bg: 'bg-sky-500/[0.04] dark:bg-gradient-to-b dark:from-sky-500/[0.12] dark:to-[#141624]',
      border: 'border-sky-500/25 dark:border-sky-500/30',
      topLine: 'bg-sky-400/90',
      shadow: 'shadow-sky-500/5'
    },
    {
      label: 'MINS',
      value: timeLeft.minutes,
      color: 'text-emerald-500 dark:text-emerald-400',
      bg: 'bg-emerald-500/[0.04] dark:bg-gradient-to-b dark:from-emerald-500/[0.12] dark:to-[#141624]',
      border: 'border-emerald-500/25 dark:border-emerald-500/30',
      topLine: 'bg-emerald-400/90',
      shadow: 'shadow-emerald-500/5'
    },
    {
      label: 'SECS',
      value: timeLeft.seconds,
      color: 'text-rose-500 dark:text-rose-400',
      bg: 'bg-rose-500/[0.04] dark:bg-gradient-to-b dark:from-rose-500/[0.12] dark:to-[#141624]',
      border: 'border-rose-500/25 dark:border-rose-500/30',
      topLine: 'bg-rose-400/90',
      shadow: 'shadow-rose-500/5'
    }
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

  const runwayPhase = useMemo(() => {
    if (timeLeft.days <= 15) return { label: 'Final Sprint', badge: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/25' };
    if (timeLeft.days <= 45) return { label: 'Peak Revision', badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25' };
    if (timeLeft.days <= 90) return { label: 'Practice & Mocks', badge: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/25' };
    return { label: 'Coverage & Base', badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25' };
  }, [timeLeft.days]);

  return (
    <>
      <div className="relative rounded-2xl sm:rounded-3xl bg-white dark:bg-[#111320] border border-slate-200/80 dark:border-white/[0.08] shadow-sm dark:shadow-2xl dark:shadow-black/40 p-3.5 sm:p-4.5 overflow-hidden space-y-3 sm:space-y-3.5">
        {/* Subtle Ambient Radial Backlight */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-72 h-36 bg-gradient-to-b from-blue-500/15 via-indigo-500/10 to-transparent dark:from-[#7AA2F7]/20 dark:via-indigo-500/10 dark:to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Ambient Top Subtle Accent Line */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-amber-500 via-sky-500 to-rose-500 opacity-70 dark:opacity-85" />

        {/* Clean Meta Header with Quick Edit Trigger */}
        <div className="relative z-10 flex items-center justify-between gap-2.5 sm:gap-3 min-w-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
            {/* Target Icon with Radar Beacon */}
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-[#2563EB] to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/25">
              <Target className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[2.4]" />
              <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-white dark:border-[#111320]" />
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <h2 className="text-[14px] sm:text-base font-black text-slate-900 dark:text-[#F5F5F7] tracking-tight truncate">
                  {currentExam.name} Countdown
                </h2>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Live</span>
                </span>
              </div>

              <p className="text-[11px] sm:text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5 font-mono flex-wrap">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>Exam Date: <strong className="text-slate-700 dark:text-slate-200 font-semibold">{formattedDate}</strong></span>
                </span>
                {timeLeft.isProjected && (
                  <span className="text-amber-500 dark:text-amber-400 text-2xs font-bold px-1.5 py-0.2 rounded bg-amber-500/10 border border-amber-500/25">
                    (Next Cycle)
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Quick Edit Target Button (Touch-optimized 32x32px squircle on mobile, pill on desktop) */}
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              haptics.light();
              setIsEditModalOpen(true);
            }}
            className="w-8 h-8 sm:w-auto sm:px-3 sm:py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-white/[0.06] dark:hover:bg-white/[0.12] text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-white/[0.08] active:scale-95 transition-all flex items-center justify-center gap-1.5 shrink-0 shadow-xs"
            title="Edit Exam Date & Target"
            aria-label="Edit Exam Date & Target"
          >
            <Edit2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span className="hidden sm:inline text-xs font-semibold">Edit Target</span>
          </button>
        </div>

        {/* 4-Digit Modern Glass Flip-Clock Cards */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2.5 relative z-10">
          {cards.map(c => (
            <div
              key={c.label}
              className={`relative py-2.5 sm:py-3.5 px-1 sm:px-2 rounded-xl sm:rounded-2xl ${c.bg} border ${c.border} text-center ${c.shadow} shadow-xs flex flex-col items-center justify-center transition-all duration-200 hover:scale-[1.02] group overflow-hidden select-none`}
            >
              {/* Top Accent Horizon Line */}
              <div className={`absolute top-0 inset-x-2 h-[2px] rounded-full ${c.topLine} opacity-80`} />

              {/* Split Horizontal Horizon Line */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-slate-900/[0.06] dark:bg-black/60 shadow-[0_1px_0_rgba(255,255,255,0.06)] pointer-events-none z-10" />

              {/* Physical Cutout Notches */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1.5 rounded-r bg-slate-200/80 dark:bg-[#111320] pointer-events-none z-20" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1.5 rounded-l bg-slate-200/80 dark:bg-[#111320] pointer-events-none z-20" />

              {/* Digits with Bold Responsive Impact */}
              <span className={`text-2xl sm:text-3xl md:text-4xl font-black font-mono tabular-nums tracking-tight leading-none block ${c.color} drop-shadow-xs transition-transform group-hover:scale-105 relative z-0`}>
                {String(c.value).padStart(2, '0')}
              </span>

              {/* Micro-label */}
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block font-mono mt-1.5">
                {c.label}
              </span>

              {/* Live Ticking Beacon on SECS */}
              {c.label === 'SECS' && (
                <span className="absolute top-1.5 right-1.5 flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-500" />
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Study Runway Status Bar */}
        <div className="pt-2 sm:pt-2.5 flex items-center justify-between gap-2 text-[11px] sm:text-xs font-mono border-t border-slate-100 dark:border-white/[0.06]">
          <div className="flex items-center gap-1.5 min-w-0">
            <Clock className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
            <span className="truncate text-slate-600 dark:text-slate-300">
              Runway: <strong className="text-slate-900 dark:text-white font-black">{timeLeft.days} Days</strong> to exam
            </span>
            <span className={`hidden xs:inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-bold border ${runwayPhase.badge}`}>
              {runwayPhase.label}
            </span>
          </div>

          <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold shrink-0">
            <span>Keep Consistent</span>
            <span className="inline-block animate-pulse">🔥</span>
          </div>
        </div>
      </div>

      {/* Target Exam Date Edit Modal */}
      {isEditModalOpen && (
        <EditExamTargetModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </>
  );
});
