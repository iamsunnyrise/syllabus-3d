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
    { label: 'DAYS', value: timeLeft.days, color: 'text-amber-500 dark:text-amber-400' },
    { label: 'HOURS', value: timeLeft.hours, color: 'text-sky-500 dark:text-sky-400' },
    { label: 'MINS', value: timeLeft.minutes, color: 'text-emerald-500 dark:text-emerald-400' },
    { label: 'SECS', value: timeLeft.seconds, color: 'text-rose-500 dark:text-rose-400' }
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

  return (
    <>
      <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121420] border border-slate-200/90 dark:border-white/[0.08] shadow-sm p-3.5 sm:p-5 space-y-3.5 sm:space-y-4">
        {/* Header: Identity & Target Details */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            {/* Target Icon */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-500/10 dark:bg-blue-500/15 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <Target className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[2.2]" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight truncate">
                  {currentExam.name} Countdown
                </h2>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Live
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                <span className="truncate">Exam Date: <strong className="text-slate-700 dark:text-slate-200 font-semibold">{formattedDate}</strong></span>
                {timeLeft.isProjected && (
                  <span className="text-amber-500 dark:text-amber-400 text-[10px] font-semibold shrink-0">
                    (Next Cycle)
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Minimal, elegant Edit Target button */}
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              haptics.light();
              setIsEditModalOpen(true);
            }}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] border border-transparent hover:border-slate-200 dark:hover:border-white/[0.08] transition-all flex items-center gap-1.5 shrink-0"
            title="Edit Exam Date & Target"
            aria-label="Edit Exam Date & Target"
          >
            <Edit2 className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span className="hidden sm:inline text-xs font-medium">Edit</span>
          </button>
        </div>

        {/* 4 Clean, Uniform Countdown Cards */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {cards.map(c => (
            <div
              key={c.label}
              className="py-3 sm:py-4 px-1 sm:px-2 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-[#181B2B] border border-slate-200/80 dark:border-white/[0.06] text-center flex flex-col items-center justify-center transition-all duration-150 select-none shadow-xs"
            >
              <span className={`text-2xl sm:text-3xl md:text-4xl font-black font-mono tabular-nums tracking-tight leading-none ${c.color}`}>
                {String(c.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest font-mono mt-1.5">
                {c.label}
              </span>
            </div>
          ))}
        </div>

        {/* Footer: Runway Status & Motivation */}
        <div className="pt-2.5 sm:pt-3 flex items-center justify-between gap-2 text-xs font-mono border-t border-slate-100 dark:border-white/[0.06]">
          <div className="flex items-center gap-1.5 min-w-0">
            <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
            <span className="truncate text-slate-600 dark:text-slate-300">
              Runway: <strong className="text-slate-900 dark:text-white font-bold">{timeLeft.days} Days</strong> to exam
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 shrink-0">
            <span>Keep Consistent</span>
            <span>🔥</span>
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
