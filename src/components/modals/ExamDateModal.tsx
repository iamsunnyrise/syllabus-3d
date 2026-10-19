import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { X, Calendar, ArrowLeft, Pencil, Target, Clock, Timer, AlarmClock } from 'lucide-react';
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

  // 4 Iconic 3D Wave Countdown Cards matching Picture 2
  const countdownCards = useMemo(() => [
    {
      label: 'DAYS',
      value: timeLeft.days,
      headerGradient: 'bg-gradient-to-r from-[#FF8C38] via-[#FF7A1A] to-[#FF5E00]',
      cardBorder: 'border-2 border-[#FF7A1A]/70 dark:border-[#FF7A1A]/50',
      cardShadow: 'shadow-[0_20px_45px_rgba(255,107,0,0.22)] hover:shadow-[0_24px_55px_rgba(255,107,0,0.32)]',
      badgeBg: 'bg-gradient-to-br from-[#FFA048] via-[#FF7A1A] to-[#EA580C]',
      badgeBorder: 'border-2 border-white/95 dark:border-white/80',
      badgeShadow: 'shadow-md shadow-orange-600/50',
      labelColor: 'text-[#FF6200]',
      dashColor: 'bg-[#FF6200]',
      icon: <Calendar className="w-5 sm:w-6 h-5 sm:h-6 text-white stroke-[2.3]" />
    },
    {
      label: 'HOURS',
      value: timeLeft.hours,
      headerGradient: 'bg-gradient-to-r from-[#5CB8FF] via-[#38A5FF] to-[#1E90FF]',
      cardBorder: 'border-2 border-[#38A5FF]/70 dark:border-[#38A5FF]/50',
      cardShadow: 'shadow-[0_20px_45px_rgba(13,132,255,0.20)] hover:shadow-[0_24px_55px_rgba(13,132,255,0.30)]',
      badgeBg: 'bg-gradient-to-br from-[#5CB8FF] via-[#2B9BFF] to-[#0D84FF]',
      badgeBorder: 'border-2 border-white/95 dark:border-white/80',
      badgeShadow: 'shadow-md shadow-blue-600/50',
      labelColor: 'text-[#0D84FF]',
      dashColor: 'bg-[#0D84FF]',
      icon: <Clock className="w-5 sm:w-6 h-5 sm:h-6 text-white stroke-[2.3]" />
    },
    {
      label: 'MINS',
      value: timeLeft.minutes,
      headerGradient: 'bg-gradient-to-r from-[#3CD5A0] via-[#1DC990] to-[#0CB980]',
      cardBorder: 'border-2 border-[#1DC990]/70 dark:border-[#1DC990]/50',
      cardShadow: 'shadow-[0_20px_45px_rgba(12,185,128,0.20)] hover:shadow-[0_24px_55px_rgba(12,185,128,0.30)]',
      badgeBg: 'bg-gradient-to-br from-[#3CD5A0] via-[#18B880] to-[#0B9B6A]',
      badgeBorder: 'border-2 border-white/95 dark:border-white/80',
      badgeShadow: 'shadow-md shadow-emerald-600/50',
      labelColor: 'text-[#0CB980]',
      dashColor: 'bg-[#0CB980]',
      icon: <Timer className="w-5 sm:w-6 h-5 sm:h-6 text-white stroke-[2.3]" />
    },
    {
      label: 'SECS',
      value: timeLeft.seconds,
      headerGradient: 'bg-gradient-to-r from-[#B088FF] via-[#9055FF] to-[#7C3AED]',
      cardBorder: 'border-2 border-[#9055FF]/70 dark:border-[#9055FF]/50',
      cardShadow: 'shadow-[0_20px_45px_rgba(139,92,246,0.22)] hover:shadow-[0_24px_55px_rgba(139,92,246,0.32)]',
      badgeBg: 'bg-gradient-to-br from-[#B088FF] via-[#8B5CF6] to-[#6D28D9]',
      badgeBorder: 'border-2 border-white/95 dark:border-white/80',
      badgeShadow: 'shadow-md shadow-purple-600/50',
      labelColor: 'text-[#8B5CF6]',
      dashColor: 'bg-[#8B5CF6]',
      icon: <AlarmClock className="w-5 sm:w-6 h-5 sm:h-6 text-white stroke-[2.3]" />
    }
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
    <div className="fixed inset-0 z-[100] w-screen h-screen min-h-screen text-slate-900 dark:text-white flex flex-col overflow-y-auto animate-fade-in select-none exam-date-modal-bg bg-[#FAF0DC] dark:bg-[#090A12]">
      {/* 🌟 Atmospheric Golden Background Lighting & Soft Desk Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDF8]/70 via-[#FFF8EB]/50 to-[#FFF2DC]/75 dark:from-[#090A12]/85 dark:via-[#090A12]/80 dark:to-[#090A12]/92 backdrop-blur-[1px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[380px] bg-gradient-to-b from-[#F59E0B]/18 via-[#F59E0B]/08 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* 🌟 Top Navigation Bar */}
      <header className="relative z-20 w-full px-4 sm:px-8 py-3.5 sm:py-4 flex items-center justify-between border-b border-slate-200/60 dark:border-white/[0.08] bg-white/75 dark:bg-[#090A12]/75 backdrop-blur-md shrink-0">
        
        {/* Left: Back button */}
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-white/90 hover:bg-white dark:bg-white/[0.08] dark:hover:bg-white/[0.14] text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-white/10 transition-all cursor-pointer shadow-xs active:scale-95"
        >
          <ArrowLeft className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>Back</span>
        </button>

        {/* Center: Exam Target Name */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/25 flex items-center justify-center shrink-0">
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
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-700 dark:text-amber-300 border border-amber-400/35 text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-2xs active:scale-95"
            title="Change Target Exam Date"
          >
            <Calendar className="w-4 h-4 text-[#EA580C]" />
            <span className="hidden sm:inline">Edit Target Date</span>
            <span className="sm:hidden">Edit</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* 🎯 Main Full-Screen Center Area */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-8 py-8 sm:py-12 max-w-5xl mx-auto w-full">
        
        {/* Top Exam Date Capsule with Tapered Decorative Gold Whiskers */}
        <div className="flex items-center justify-center gap-3 sm:gap-5 w-full mb-8 sm:mb-12">
          {/* Left decorative whisker */}
          <div className="hidden sm:block w-16 md:w-28 h-0.5 bg-gradient-to-r from-transparent via-[#F59E0B]/50 to-[#EA580C] rounded-full" />

          {/* Interactive Target Exam Date Badge */}
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setIsEditModalOpen(true);
            }}
            title="Click to edit target exam date"
            className="group inline-flex items-center gap-2.5 px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-full bg-white/95 dark:bg-[#121526]/95 hover:bg-white dark:hover:bg-[#181C30] border-2 border-amber-300/80 dark:border-amber-400/40 text-slate-800 dark:text-slate-100 text-sm sm:text-base font-bold transition-all cursor-pointer shadow-[0_8px_24px_rgba(234,88,12,0.12)] hover:shadow-[0_10px_30px_rgba(234,88,12,0.22)] active:scale-95"
          >
            <Calendar className="w-5 h-5 text-[#EA580C] group-hover:scale-110 transition-transform stroke-[2.3]" />
            <span>Exam Date: <strong className="text-[#EA580C] font-black">{formattedDate}</strong></span>
            <Pencil className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#EA580C] ml-1 transition-colors" />
          </button>

          {/* Right decorative whisker */}
          <div className="hidden sm:block w-16 md:w-28 h-0.5 bg-gradient-to-l from-transparent via-[#F59E0B]/50 to-[#EA580C] rounded-full" />
        </div>

        {/* 4 ICONIC 3D WAVE COUNTDOWN CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl">
          {countdownCards.map(c => (
            <div
              key={c.label}
              className={`group/card relative rounded-[26px] sm:rounded-[34px] bg-white dark:bg-[#121526] ${c.cardBorder} ${c.cardShadow} overflow-hidden transition-all duration-300 hover:-translate-y-1.5 select-none flex flex-col items-center pb-6 sm:pb-8`}
            >
              {/* Top Curved Wave Header Banner */}
              <div className={`relative w-full h-18 sm:h-22 ${c.headerGradient} overflow-hidden flex items-center justify-center`}>
                {/* Subtle translucent wave layer */}
                <svg
                  viewBox="0 0 400 120"
                  preserveAspectRatio="none"
                  className="absolute bottom-0 left-0 w-full h-10 sm:h-12 text-white/25 pointer-events-none"
                  fill="currentColor"
                >
                  <path d="M0,40 C140,80 260,10 400,55 L400,120 L0,120 Z" />
                </svg>
                {/* Main wave cutting to card body */}
                <svg
                  viewBox="0 0 400 120"
                  preserveAspectRatio="none"
                  className="absolute -bottom-0.5 left-0 w-full h-8 sm:h-10 text-white dark:text-[#121526] pointer-events-none"
                  fill="currentColor"
                >
                  <path d="M0,50 C120,20 280,75 400,45 L400,120 L0,120 Z" />
                </svg>

                {/* Overlapping Round Emblem Icon Badge */}
                <div className={`relative z-10 w-11 h-11 sm:w-13 sm:h-13 rounded-full ${c.badgeBg} ${c.badgeBorder} shadow-lg ${c.badgeShadow} flex items-center justify-center transition-transform duration-300 group-hover/card:scale-110`}>
                  {c.icon}
                </div>
              </div>

              {/* Big Bold Digits */}
              <div className="relative z-10 px-2 mt-2 sm:mt-4 flex items-center justify-center">
                <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-sans tabular-nums tracking-tight leading-none text-[#0B1528] dark:text-white">
                  {c.value < 10 ? `0${c.value}` : c.value}
                </span>
              </div>

              {/* Colored Unit Label */}
              <div className="relative z-10 mt-2 sm:mt-3">
                <span className={`text-xs sm:text-sm font-black uppercase tracking-[0.22em] font-sans ${c.labelColor}`}>
                  {c.label}
                </span>
              </div>

              {/* Bottom Accent Rounded Dash / Pill */}
              <div className={`w-8 sm:w-10 h-1 sm:h-1.5 rounded-full ${c.dashColor} mt-2.5 sm:mt-3.5`} />
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
