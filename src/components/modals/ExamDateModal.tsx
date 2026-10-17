import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { X, Calendar, ArrowLeft, Pencil, Target } from 'lucide-react';
import { EditExamTargetModal } from './EditExamTargetModal';
import { useSyllabus } from '../../context/SyllabusContext';
import { soundManager } from '../../utils/soundEffects';

interface ExamDateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExamDateModal: React.FC<ExamDateModalProps> = ({ isOpen, onClose }) => {
  const { currentExam } = useSyllabus();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Dynamic countdown calculation
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

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

      // If exam date has passed, roll over to the exact same month/day in the next upcoming cycle
      if (isNaN(examTime) || examTime <= now) {
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
        if (prev.seconds === s && prev.minutes === m && prev.hours === h && prev.days === d) {
          return prev;
        }
        return { days: d, hours: h, minutes: m, seconds: s };
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [currentExam?.examDate, currentExam?.targetYear, currentExam?.name]);

  // Formatted Exam Date
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

  // 4 Clean Countdown Cards
  const cards = useMemo(() => [
    { label: 'DAYS', value: timeLeft.days, isPrimary: true },
    { label: 'HOURS', value: timeLeft.hours, isPrimary: false },
    { label: 'MINS', value: timeLeft.minutes, isPrimary: false },
    { label: 'SECS', value: timeLeft.seconds, isPrimary: false }
  ], [timeLeft]);

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isEditModalOpen) {
          setIsEditModalOpen(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isEditModalOpen, onClose]);

  if (!isOpen) return null;
  if (typeof document === 'undefined') return null;

  const examName = currentExam?.name || 'Target Exam';

  return createPortal(
    <div className="fixed inset-0 z-[100] w-screen h-screen min-h-screen bg-[#F8FAFC] dark:bg-[#090A12] text-slate-900 dark:text-white flex flex-col overflow-y-auto animate-fade-in select-none">
      {/* 🌟 Atmospheric Golden Background Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#F59E0B]/12 via-transparent to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* 🌟 Top Navigation Bar */}
      <header className="relative z-10 w-full px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between border-b border-slate-200/80 dark:border-white/[0.08] bg-white/80 dark:bg-[#090A12]/80 backdrop-blur-md shrink-0">
        
        {/* Left: Back button */}
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 border border-slate-200/70 dark:border-white/10 transition-all cursor-pointer shadow-2xs active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        {/* Center: Exam Target Name */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-500 border border-amber-500/25 flex items-center justify-center shrink-0">
            <Target className="w-4 h-4 stroke-[2.5]" />
          </div>
          <h1 className="text-base sm:text-xl font-black tracking-tight uppercase text-slate-900 dark:text-white truncate">
            {examName}
          </h1>
        </div>

        {/* Right: Edit Date & Close (X) */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setIsEditModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/25 text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-2xs active:scale-95"
            title="Change Target Exam Date"
          >
            <Calendar className="w-4 h-4 text-amber-500" />
            <span className="hidden sm:inline">Edit Target Date</span>
            <span className="sm:hidden">Edit</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* 🎯 Main Full-Screen Center Area */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-8 py-8 sm:py-14 max-w-5xl mx-auto w-full">
        
        {/* Interactive Target Exam Date Badge */}
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            setIsEditModalOpen(true);
          }}
          title="Click to edit target exam date"
          className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white dark:bg-white/[0.04] hover:bg-slate-50 dark:hover:bg-white/[0.08] border border-slate-200/90 dark:border-white/10 text-slate-800 dark:text-slate-100 text-sm sm:text-base font-bold transition-all cursor-pointer shadow-xs active:scale-95 mb-8 sm:mb-12 group"
        >
          <Calendar className="w-4 sm:w-5 h-4 sm:h-5 text-amber-500 group-hover:scale-110 transition-transform" />
          <span>Exam Date: <strong className="text-amber-600 dark:text-amber-400 font-black">{formattedDate}</strong></span>
          <Pencil className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-500 ml-1 transition-colors" />
        </button>

        {/* 4 HUGE Countdown Digit Cards (Edge-to-Edge Responsive Grid) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-6 w-full max-w-4xl">
          {cards.map(c => (
            <div
              key={c.label}
              className={`py-8 sm:py-12 md:py-14 px-3 sm:px-6 rounded-2xl sm:rounded-3xl border text-center flex flex-col items-center justify-center transition-all select-none shadow-md ${
                c.isPrimary
                  ? 'bg-amber-500/[0.08] dark:bg-amber-500/[0.12] border-amber-400/60 dark:border-amber-500/40 shadow-amber-500/10'
                  : 'bg-white dark:bg-white/[0.03] border-slate-200/90 dark:border-white/[0.08]'
              }`}
            >
              {/* Massive Bold Digit Display */}
              <span className={`text-5xl sm:text-7xl md:text-8xl font-black font-sans tabular-nums tracking-tight leading-none ${
                c.isPrimary
                  ? 'text-amber-600 dark:text-amber-400 drop-shadow-[0_2px_12px_rgba(245,158,11,0.25)]'
                  : 'text-slate-900 dark:text-white'
              }`}>
                {String(c.value).padStart(2, '0')}
              </span>

              {/* Clean Uppercase Unit Label */}
              <span className={`text-xs sm:text-sm md:text-base font-black uppercase tracking-widest mt-3 sm:mt-4 ${
                c.isPrimary
                  ? 'text-amber-700 dark:text-amber-400'
                  : 'text-slate-400 dark:text-slate-500'
              }`}>
                {c.label}
              </span>
            </div>
          ))}
        </div>

      </main>

      {/* Embedded Edit Target Date Modal */}
      {isEditModalOpen && (
        <EditExamTargetModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>,
    document.body
  );
};
