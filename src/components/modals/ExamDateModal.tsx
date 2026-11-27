import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { X, Calendar, ArrowLeft, Pencil, Target, Zap, CheckCircle2 } from 'lucide-react';
import { EditExamTargetModal } from './EditExamTargetModal';
import { useSyllabus } from '../../context/SyllabusContext';
import { useTheme } from '../../context/ThemeContext';
import { soundManager } from '../../utils/soundEffects';

interface ExamDateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExamDateModal: React.FC<ExamDateModalProps> = ({ isOpen, onClose }) => {
  const { currentExam, overallStats, dueRevisions } = useSyllabus();
  const { theme, isDark } = useTheme();
  const isWarmCream = theme === 'warm-cream';
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

  // Dynamic Phase Configuration based on remaining days
  const phaseConfig = useMemo(() => {
    const days = timeLeft.days;
    if (days <= 7) {
      return {
        label: 'Final Sprint Mode',
        dotColor: 'bg-rose-500',
        pillClass: isWarmCream
          ? 'bg-rose-500/12 border-rose-500/35 text-rose-800'
          : isDark
          ? 'bg-rose-500/15 border-rose-500/35 text-rose-300'
          : 'bg-rose-500/10 border-rose-500/30 text-rose-700'
      };
    }
    if (days <= 30) {
      return {
        label: 'Peak Revision Phase',
        dotColor: 'bg-orange-500',
        pillClass: isWarmCream
          ? 'bg-orange-500/12 border-orange-500/35 text-orange-900'
          : isDark
          ? 'bg-orange-500/15 border-orange-500/35 text-orange-300'
          : 'bg-orange-500/10 border-orange-500/30 text-orange-800'
      };
    }
    return {
      label: 'Strategic Build Phase',
      dotColor: 'bg-amber-500',
      pillClass: isWarmCream
        ? 'bg-amber-500/12 border-amber-600/30 text-[#92400E]'
        : isDark
        ? 'bg-amber-500/12 border-amber-500/30 text-[#FCD34D]'
        : 'bg-amber-500/10 border-amber-500/30 text-[#B45309]'
    };
  }, [timeLeft.days, isWarmCream, isDark]);

  // Tactical preparation calculations
  const tacticalStats = useMemo(() => {
    const totalTopics = overallStats?.totalTopics || 0;
    const completedCount = overallStats?.completedCount || 0;
    const completionPct = Math.round(overallStats?.completionPercentage || 0);
    const remainingTopics = Math.max(0, totalTopics - completedCount);
    const weeksLeft = Math.max(1, Math.round(timeLeft.days / 7));
    const estimatedStudyHours = (timeLeft.days * 6).toLocaleString();
    const dueCount = Array.isArray(dueRevisions) ? dueRevisions.length : 0;

    const isLastMonth = timeLeft.days <= 30;
    const effectiveBuildDays = Math.max(1, timeLeft.days - 30);
    const dailyTopicPace =
      remainingTopics > 0
        ? Math.max(0.1, remainingTopics / effectiveBuildDays).toFixed(1)
        : '0';

    return {
      totalTopics,
      completedCount,
      completionPct,
      remainingTopics,
      weeksLeft,
      estimatedStudyHours,
      dueCount,
      isLastMonth,
      dailyTopicPace
    };
  }, [overallStats, timeLeft.days, dueRevisions]);

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

  // Theme-coherent styling tokens matching the approved Warm Cream / Dark Obsidian / Clean Light design
  const rootBgStyle: React.CSSProperties = isWarmCream
    ? { background: 'linear-gradient(160deg, #FDF6E7 0%, #F7EAD2 55%, #F4E3C3 100%)', color: '#2D2414' }
    : isDark
    ? { background: 'radial-gradient(circle at top center, #13182B 0%, #090B14 60%, #06070D 100%)', color: '#F8FAFC' }
    : { background: 'linear-gradient(160deg, #F8FAFC 0%, #EFF6FF 55%, #F1F5F9 100%)', color: '#0F172A' };

  const secondaryCardClass = isWarmCream
    ? 'bg-[#FFFDF8] border-[#E2D1B3] shadow-[0_12px_28px_-10px_rgba(74,53,30,0.09)]'
    : isDark
    ? 'bg-[#101424] border-white/[0.09] shadow-[0_18px_36px_-10px_rgba(0,0,0,0.65)]'
    : 'bg-white border-slate-200 shadow-[0_10px_25px_-8px_rgba(15,23,42,0.06)]';

  const statBoxClass = isWarmCream
    ? 'bg-[#FFFDF8]/90 border-[#E2D1B3]'
    : isDark
    ? 'bg-white/[0.03] border-white/[0.08]'
    : 'bg-white/90 border-slate-200';

  const splitDividerClass = isWarmCream
    ? 'bg-[#E2D1B3]'
    : isDark
    ? 'bg-white/[0.09]'
    : 'bg-slate-200';

  const secondaryLabelClass = isWarmCream
    ? 'text-[#8D7A02]'
    : isDark
    ? 'text-slate-400'
    : 'text-slate-500';

  const secondaryDigitClass = isWarmCream
    ? 'text-[#1C1B05]'
    : isDark
    ? 'text-white'
    : 'text-slate-900';

  const statSubClass = isWarmCream
    ? 'text-[#6B5B3E]'
    : isDark
    ? 'text-slate-400'
    : 'text-slate-500';

  const secondaryUnits = [
    {
      label: 'HOURS',
      value: timeLeft.hours,
      percent: Math.min(100, (timeLeft.hours / 24) * 100),
      barColor: 'bg-amber-500/75',
      hasLiveDot: false
    },
    {
      label: 'MINS',
      value: timeLeft.minutes,
      percent: Math.min(100, (timeLeft.minutes / 60) * 100),
      barColor: 'bg-amber-500/75',
      hasLiveDot: false
    },
    {
      label: 'SECS',
      value: timeLeft.seconds,
      percent: Math.min(100, (timeLeft.seconds / 60) * 100),
      barColor: 'bg-emerald-500',
      hasLiveDot: true
    }
  ];

  const daysProgressPct = Math.max(8, Math.min(100, Math.round(100 - (timeLeft.days / 365) * 100)));

  return createPortal(
    <div
      style={rootBgStyle}
      className="fixed inset-0 z-[100] w-screen h-screen min-h-screen flex flex-col overflow-y-auto animate-fade-in select-none transition-colors duration-300"
    >
      {/* 🌟 Full-Bleed Atmospheric Ambient Glows */}
      <div
        className={`fixed -top-24 left-1/2 -translate-x-1/2 w-[720px] h-[360px] rounded-full blur-[120px] pointer-events-none ${
          isWarmCream ? 'bg-amber-500/[0.16]' : isDark ? 'bg-amber-500/[0.13]' : 'bg-amber-500/[0.11]'
        }`}
      />
      <div
        className={`fixed -bottom-24 left-1/4 w-[460px] h-[280px] rounded-full blur-[110px] pointer-events-none ${
          isWarmCream ? 'bg-orange-600/[0.10]' : isDark ? 'bg-blue-500/[0.10]' : 'bg-blue-500/[0.09]'
        }`}
      />

      {/* 🌟 Top Navigation Bar */}
      <header
        className={`relative z-20 w-full px-4 sm:px-8 py-3.5 flex items-center justify-between border-b backdrop-blur-md shrink-0 ${
          isWarmCream
            ? 'bg-[#FFFBF2]/85 border-[#E2D1B3]'
            : isDark
            ? 'bg-[#0B0E18]/80 border-white/[0.08]'
            : 'bg-white/85 border-slate-200'
        }`}
      >
        {/* Left: Back button */}
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer shadow-2xs active:scale-95 ${
            isWarmCream
              ? 'bg-white hover:bg-[#FAF0DC] border-[#E2D1B3] text-[#4A3B22]'
              : isDark
              ? 'bg-white/[0.06] hover:bg-white/[0.12] border-white/10 text-slate-200'
              : 'bg-white hover:bg-slate-50 border-slate-300 text-slate-700'
          }`}
        >
          <ArrowLeft className="w-4 h-4 text-amber-500" />
          <span>Back</span>
        </button>

        {/* Center: Exam Target Name + Dynamic Phase Pill */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-slate-950 flex items-center justify-center shadow-md shrink-0">
            <Target className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div className="flex items-center gap-2.5 min-w-0">
            <h1 className="text-sm sm:text-lg font-black tracking-tight uppercase truncate">
              {examName}
            </h1>
            <span
              className={`hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border shrink-0 ${phaseConfig.pillClass}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${phaseConfig.dotColor} animate-pulse`} />
              {phaseConfig.label}
            </span>
          </div>
        </div>

        {/* Right: Edit Date & Close (X) */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setIsEditModalOpen(true);
            }}
            className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer shadow-2xs active:scale-95 ${
              isWarmCream
                ? 'bg-amber-500/15 hover:bg-amber-500/25 border-amber-600/35 text-[#92400E]'
                : isDark
                ? 'bg-amber-500/15 hover:bg-amber-500/25 border-amber-500/35 text-[#FCD34D]'
                : 'bg-amber-500/12 hover:bg-amber-500/20 border-amber-500/35 text-[#B45309]'
            }`}
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
            className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-colors cursor-pointer ${
              isWarmCream
                ? 'bg-white hover:bg-[#FAF0DC] border-[#E2D1B3] text-[#6B5B3E]'
                : isDark
                ? 'bg-white/[0.06] hover:bg-white/[0.12] border-white/10 text-slate-400 hover:text-white'
                : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-600'
            }`}
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* 🎯 Main Full-Screen Center Area */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-8 py-8 sm:py-10 max-w-4xl mx-auto w-full">
        
        {/* Exam Date Capsule with Whiskers & Weeks Chip */}
        <div className="flex items-center justify-center gap-4 w-full mb-7 sm:mb-9">
          <div className="hidden sm:block flex-1 max-w-[110px] h-px bg-gradient-to-r from-transparent to-amber-500/60" />

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setIsEditModalOpen(true);
            }}
            title="Click to edit target exam date"
            className={`group inline-flex items-center gap-2.5 sm:gap-3 px-5 py-2.5 rounded-full border transition-all cursor-pointer shadow-md hover:scale-[1.02] active:scale-95 ${
              isWarmCream
                ? 'bg-[#FFFDF8] border-[#E2D1B3] text-[#2D2414]'
                : isDark
                ? 'bg-[#111526]/90 border-amber-500/35 text-slate-100'
                : 'bg-white border-slate-300 text-slate-800'
            }`}
          >
            <span className="flex items-center gap-2 text-xs sm:text-sm font-bold">
              <Calendar className="w-4 h-4 text-amber-500 shrink-0 stroke-[2.3]" />
              <span>Target Date:</span>
              <strong className="text-amber-500 font-black">{formattedDate}</strong>
            </span>
            <span
              className={`px-2 py-0.5 rounded-full text-[11px] font-mono font-bold ${
                isWarmCream
                  ? 'bg-[#FAF0DC] text-[#92400E]'
                  : isDark
                  ? 'bg-amber-500/15 text-amber-400'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              ~{tacticalStats.weeksLeft} {tacticalStats.weeksLeft === 1 ? 'Week' : 'Weeks'}
            </span>
            <Pencil className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:text-amber-500 transition-all" />
          </button>

          <div className="hidden sm:block flex-1 max-w-[110px] h-px bg-gradient-to-l from-transparent to-amber-500/60" />
        </div>

        {/* 4 UNIFIED PRECISION CHRONOMETER CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 w-full mb-7 sm:mb-9">
          
          {/* Card 1: DAYS LEFT (Primary Hero Card) */}
          <div
            className={`relative rounded-3xl border p-5 sm:p-6 flex flex-col items-center justify-center overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
              isWarmCream
                ? 'bg-[#FFFDF8] border-amber-500/55 shadow-[0_18px_40px_-12px_rgba(217,119,6,0.18)]'
                : isDark
                ? 'bg-gradient-to-b from-amber-500/[0.11] to-[#101424] border-amber-500/45 shadow-[0_20px_45px_-10px_rgba(0,0,0,0.7),0_0_28px_rgba(245,158,11,0.10)]'
                : 'bg-white border-amber-500/55 shadow-[0_18px_36px_-10px_rgba(245,158,11,0.16)]'
            }`}
          >
            {/* Top Amber Accent Hairline */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500" />
            {/* Split-Flap Center Line */}
            <div className={`absolute inset-x-3 top-1/2 -translate-y-1/2 h-px pointer-events-none opacity-40 ${splitDividerClass}`} />

            <div className="flex items-center gap-1.5 mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-[11px] font-mono font-black uppercase tracking-[0.2em] text-amber-500">
                DAYS LEFT
              </span>
            </div>

            <div className="relative z-10 my-1">
              <span className="text-5xl sm:text-6xl font-black tabular-nums tracking-tight leading-none bg-gradient-to-b from-amber-400 to-orange-600 bg-clip-text text-transparent">
                {timeLeft.days < 10 ? `0${timeLeft.days}` : timeLeft.days}
              </span>
            </div>

            {/* Horizon Progress Bar */}
            <div className="w-16 h-1 rounded-full bg-amber-500/20 mt-3 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-500"
                style={{ width: `${daysProgressPct}%` }}
              />
            </div>
          </div>

          {/* Cards 2, 3, 4: HOURS, MINS, SECS */}
          {secondaryUnits.map(unit => (
            <div
              key={unit.label}
              className={`relative rounded-3xl border p-5 sm:p-6 flex flex-col items-center justify-center overflow-hidden transition-all duration-300 hover:-translate-y-1 ${secondaryCardClass}`}
            >
              <div className={`absolute inset-x-3 top-1/2 -translate-y-1/2 h-px pointer-events-none opacity-35 ${splitDividerClass}`} />

              <div className="flex items-center gap-1.5 mb-2">
                {unit.hasLiveDot && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                )}
                <span className={`text-[11px] font-mono font-bold uppercase tracking-[0.2em] ${secondaryLabelClass}`}>
                  {unit.label}
                </span>
              </div>

              <div className="relative z-10 my-1">
                <span className={`text-5xl sm:text-6xl font-black tabular-nums tracking-tight leading-none ${secondaryDigitClass}`}>
                  {String(unit.value).padStart(2, '0')}
                </span>
              </div>

              <div className="w-14 h-1 rounded-full bg-slate-500/15 mt-3 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${unit.barColor}`}
                  style={{ width: `${Math.max(4, unit.percent)}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* 📊 TACTICAL PREPARATION INSIGHTS STRIP */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
          
          {/* Insight 1: Syllabus Mastery */}
          <div className={`rounded-2xl border p-4 flex items-center justify-between gap-3 ${statBoxClass}`}>
            <div className="min-w-0 flex-1">
              <span className={`text-[11px] font-mono font-bold uppercase tracking-wider block ${secondaryLabelClass}`}>
                Syllabus Mastery
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className={`text-lg font-black ${secondaryDigitClass}`}>
                  {tacticalStats.completionPct}%
                </span>
                <span className={`text-xs font-medium truncate ${statSubClass}`}>
                  {tacticalStats.completedCount} / {tacticalStats.totalTopics} topics
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-amber-500/15 mt-2 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-500"
                  style={{ width: `${Math.min(100, tacticalStats.completionPct)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Insight 2: Study Runway */}
          <div className={`rounded-2xl border p-4 flex items-center justify-between gap-3 ${statBoxClass}`}>
            <div className="min-w-0">
              <span className={`text-[11px] font-mono font-bold uppercase tracking-wider block ${secondaryLabelClass}`}>
                Study Runway
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className={`text-lg font-black ${secondaryDigitClass}`}>
                  ~{tacticalStats.estimatedStudyHours} hrs
                </span>
              </div>
              <span className={`text-xs font-medium block mt-1 truncate ${statSubClass}`}>
                Estimated at 6 hrs/day pace
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 stroke-[2.2]" />
            </div>
          </div>

          {/* Insight 3: Finish 30d Early / Revision Pace */}
          <div className={`rounded-2xl border p-4 flex items-center justify-between gap-3 ${statBoxClass}`}>
            <div className="min-w-0">
              <span className={`text-[11px] font-mono font-bold uppercase tracking-wider block ${secondaryLabelClass}`}>
                {tacticalStats.isLastMonth ? 'Final Sprint Focus' : 'Finish 30d Early'}
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className={`text-lg font-black ${secondaryDigitClass}`}>
                  {tacticalStats.isLastMonth
                    ? `${tacticalStats.dueCount} revisions due`
                    : `${tacticalStats.dailyTopicPace} topics/day`}
                </span>
              </div>
              <span className={`text-xs font-medium block mt-1 truncate ${statSubClass}`}>
                {tacticalStats.isLastMonth
                  ? 'Prioritize full mocks & revision'
                  : 'Leaves 30 days for full mocks'}
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 stroke-[2.2]" />
            </div>
          </div>

        </div>

        {/* Subtle Motivational Cue */}
        <p className={`mt-6 text-xs font-medium text-center italic opacity-80 ${statSubClass}`}>
          "Consistency beats intensity. Win today&apos;s target, and the exam day takes care of itself."
        </p>

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
