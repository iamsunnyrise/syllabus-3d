import React, { useState, useMemo } from 'react';
import {
  Clock,
  Calendar,
  Printer,
  Flag,
  Zap,
  TrendingUp,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useSyllabus } from '../../context/SyllabusContext';
import { SyllabusPacingCard } from '../dashboard/SyllabusPacingCard';
import { EditExamTargetModal } from '../modals/EditExamTargetModal';
import { AppView } from '../layout/Sidebar';
import { SectionBadgeIcon } from '../common/SectionBadgeIcon';
import { soundManager } from '../../utils/soundEffects';
import {
  calculatePacingForecast,
  getStoredRevisionBuffer,
  PacingForecastResult
} from '../../utils/pacingCalculator';

interface PacingViewProps {
  onNavigate: (view: AppView) => void;
  onNavigateToSubject?: (subjectId: string) => void;
}

export const PacingView: React.FC<PacingViewProps> = ({
  onNavigate
}) => {
  const { currentExam, overallStats, activityHistory } = useSyllabus();
  const [isEditExamModalOpen, setIsEditExamModalOpen] = useState(false);

  const examName = currentExam?.name || 'Target Exam';
  const examDate = currentExam?.examDate || '2026-10-15';

  const formattedExamDate = (() => {
    try {
      const d = new Date(examDate);
      return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch {
      return examDate;
    }
  })();

  // Calculate live pacing forecast for top-level banner & cards
  const forecast: PacingForecastResult = useMemo(() => {
    return calculatePacingForecast({
      examDateStr: examDate,
      totalTopics: overallStats.totalTopics,
      completedTopics: overallStats.completedCount,
      inProgressTopics: overallStats.inProgressCount,
      activityHistory,
      revisionBufferDays: getStoredRevisionBuffer()
    });
  }, [examDate, overallStats, activityHistory]);

  return (
    <div className="space-y-4 sm:space-y-6 pb-36 sm:pb-24 font-sans max-w-5xl mx-auto px-1 sm:px-0 animate-fade-in">
      
      {/* 🖨️ PRINT-ONLY DESK REVISION SUMMARY HEADER */}
      <div className="hidden print:block mb-6 pb-4 border-b-2 border-black">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-gray-700 block">
              TARGET PACING &amp; FINISH-LINE FORECAST CHEATSHEET
            </span>
            <h1 className="text-2xl font-black uppercase tracking-tight text-black mt-1">
              🎯 {examName.toUpperCase()} • TARGET DATE CALCULATOR
            </h1>
            <div className="flex items-center gap-3 text-xs font-mono text-gray-700 mt-2">
              <span>Target Exam Date: <strong>{formattedExamDate}</strong></span>
              <span>• Overall Progress: <strong>{overallStats.completionPercentage}% Mastered ({overallStats.completedCount}/{overallStats.totalTopics} Topics)</strong></span>
            </div>
          </div>
          <div className="text-right text-xs font-mono">
            <div className="font-bold text-black uppercase">Study Desk Target Sheet</div>
            <div className="text-gray-600 mt-1">Printed: {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
            <div className="text-[10px] text-gray-500 mt-0.5">Syllabus 3D Precision Study System</div>
          </div>
        </div>
      </div>

      {/* ═══════════════ 1. EXECUTIVE PAGE HERO HEADER ═══════════════ */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 print:hidden">
        <div>
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
            <SectionBadgeIcon section="pacing" size="md" className="shrink-0" />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Target Pacing
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/25 text-blue-700 dark:text-blue-300 text-[11px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span>Target Calculator</span>
            </span>
            {currentExam && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/[0.08] text-[11px] font-bold text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-white/10">
                <span>🎯</span>
                <span>{currentExam.name}</span>
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
            Real velocity pacing, finish-line forecast date, and active recall buffer protection.
          </p>
        </div>

        {/* Quick Header Actions: Balanced Mobile Row */}
        <div className="flex items-center gap-2 w-full sm:w-auto self-stretch sm:self-auto justify-stretch sm:justify-end">
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              window.print();
            }}
            className="flex-1 sm:flex-initial h-10 sm:h-11 px-3.5 sm:px-4 rounded-xl sm:rounded-2xl bg-white dark:bg-[#121424] border border-slate-200/90 dark:border-white/10 text-slate-700 dark:text-slate-200 text-xs sm:text-[13px] font-bold shadow-xs hover:border-indigo-500 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            title="Print pacing study table cheatsheet (Ctrl + P)"
          >
            <Printer className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span>Print Cheatsheet</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setIsEditExamModalOpen(true);
            }}
            className="flex-1 sm:flex-initial h-10 sm:h-11 px-4 sm:px-5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs sm:text-[13px] font-bold shadow-md shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            title="Change target exam date"
          >
            <Calendar className="w-4 h-4 shrink-0" />
            <span>Change Target Date</span>
          </button>
        </div>
      </div>

      {/* ═══════════════ 2. GOLDEN AMBER PACING & MOMENTUM BANNER ═══════════════ */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-gradient-to-r from-[#FFC72C] via-[#FFB703] to-[#FB8500] dark:from-[#E5A000] dark:via-[#D97706] dark:to-[#B45309] text-slate-950 flex flex-col md:flex-row md:items-center justify-between gap-3.5 shadow-md shadow-amber-500/15 border border-amber-300/40 dark:border-amber-400/30 print:hidden">
        {/* Ambient Subtle Accent Glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/20 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex items-center gap-3 sm:gap-4 min-w-0">
          <div className="w-11 sm:w-13 h-11 sm:h-13 rounded-2xl bg-black/10 dark:bg-black/20 backdrop-blur-xs border border-black/10 flex items-center justify-center shrink-0 text-2xl sm:text-3xl select-none shadow-inner">
            🎯
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xl sm:text-3xl font-black font-sans tracking-tight text-slate-950 leading-tight">
                <span className="text-2xl sm:text-4xl font-black tabular-nums">{forecast.requiredDailyPace}</span> Topics / Day
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-black/15 text-slate-950 text-[11px] sm:text-xs font-black uppercase tracking-wider">
                Target Pace
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-[13px] font-bold text-slate-950/90 mt-1">
              <span className="inline-flex items-center gap-1">
                <span>Finish Line:</span>
                <strong className="font-black underline decoration-black/25 decoration-2 underline-offset-2">{forecast.finishLineForecastDate}</strong>
              </span>
              <span className="text-black/40">•</span>
              <span>{forecast.totalDaysLeft} Days Remaining</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/10 text-[11px] font-black text-slate-950">
                🛡️ {forecast.bufferDays}d Buffer Protected
              </span>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/10 dark:bg-black/20 text-xs font-bold text-slate-950 shrink-0 self-start md:self-center">
          <Zap className="w-3.5 h-3.5 fill-current text-slate-950 shrink-0" />
          <span>{forecast.topicsCompleted} of {forecast.topicsTotal} Topics Mastered ({forecast.completionPercentage}%)</span>
        </div>
      </div>

      {/* ═══════════════ 3. 4 VIBRANT HIGH-CONTRAST METRIC CARDS ═══════════════ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 print:hidden">
        {/* Card 1: Purple Gradient -> Finish-Line Date */}
        <div className="rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 bg-gradient-to-br from-[#7C3AED] via-[#6D28D9] to-[#5B21B6] border border-white/20 dark:border-white/15 text-white flex flex-col justify-between shadow-md shadow-purple-500/20 transition-all hover:scale-[1.01]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-sm font-bold text-white/90">Finish-Line Date</span>
            <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-lg sm:rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0">
              <Flag className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-white" />
            </div>
          </div>
          <div className="mt-3 sm:mt-4">
            <div className="text-base sm:text-2xl font-black font-sans leading-none tracking-tight tabular-nums">
              {forecast.finishLineForecastDate}
            </div>
            <div className="text-[11px] sm:text-xs text-white/80 font-medium mt-1.5 truncate">
              {forecast.daysUntilFinish} study days needed
            </div>
          </div>
        </div>

        {/* Card 2: Hot Coral Gradient -> Required Pace */}
        <div className="rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 bg-gradient-to-br from-[#F43F5E] via-[#E11D48] to-[#BE123C] border border-white/20 dark:border-white/15 text-white flex flex-col justify-between shadow-md shadow-rose-500/20 transition-all hover:scale-[1.01]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-sm font-bold text-white/90">Required Pace</span>
            <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-lg sm:rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0">
              <Zap className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-white" />
            </div>
          </div>
          <div className="mt-3 sm:mt-4">
            <div className="text-base sm:text-2xl font-black font-sans leading-none tracking-tight tabular-nums">
              {forecast.requiredDailyPace} <span className="text-xs sm:text-sm font-bold font-sans opacity-90">topics/d</span>
            </div>
            <div className="text-[11px] sm:text-xs text-white/80 font-medium mt-1.5 truncate">
              ~{forecast.requiredWeeklyPace}/wk • ~{forecast.requiredDailyStudyMinutes}m/d
            </div>
          </div>
        </div>

        {/* Card 3: Sky Blue Gradient -> Actual Velocity */}
        <div className="rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 bg-gradient-to-br from-[#0284C7] via-[#0369A1] to-[#075985] border border-white/20 dark:border-white/15 text-white flex flex-col justify-between shadow-md shadow-sky-500/20 transition-all hover:scale-[1.01]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-sm font-bold text-white/90">Actual Pace (14d)</span>
            <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-lg sm:rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0">
              <TrendingUp className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-white" />
            </div>
          </div>
          <div className="mt-3 sm:mt-4">
            <div className="text-base sm:text-2xl font-black font-sans leading-none tracking-tight tabular-nums">
              {forecast.actualDailyVelocity} <span className="text-xs sm:text-sm font-bold font-sans opacity-90">topics/d</span>
            </div>
            <div className="text-[11px] sm:text-xs font-semibold mt-1.5 truncate">
              {forecast.actualDailyVelocity >= forecast.requiredDailyPace ? (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-emerald-400/25 text-emerald-100 font-bold">
                  +{(forecast.actualDailyVelocity - forecast.requiredDailyPace).toFixed(1)} ahead
                </span>
              ) : (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-amber-400/25 text-amber-100 font-bold">
                  -{(forecast.requiredDailyPace - forecast.actualDailyVelocity).toFixed(1)} behind
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Card 4: Emerald Gradient -> Buffer Runway */}
        <div className="rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 bg-gradient-to-br from-[#10B981] via-[#059669] to-[#047857] border border-white/20 dark:border-white/15 text-white flex flex-col justify-between shadow-md shadow-emerald-500/20 transition-all hover:scale-[1.01]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-sm font-bold text-white/90">Buffer Health</span>
            <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-lg sm:rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0">
              <ShieldCheck className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-white" />
            </div>
          </div>
          <div className="mt-3 sm:mt-4">
            <div className="text-base sm:text-2xl font-black font-sans leading-none tracking-tight tabular-nums">
              {forecast.bufferDays} Days Protected
            </div>
            <div className="text-[11px] sm:text-xs text-white/90 font-medium mt-1.5 truncate">
              {forecast.bufferMarginDays >= 0 ? `+${forecast.bufferMarginDays}d safe runway` : `${forecast.bufferMarginDays}d buffer overrun`}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════ 4. PRIMARY PACING FORECAST HERO CARD ═══════════════ */}
      <SyllabusPacingCard
        onOpenEditExamTarget={() => setIsEditExamModalOpen(true)}
        onNavigateToSyllabus={() => onNavigate('syllabus')}
      />

      {/* Target Exam Date Customizer Modal */}
      <EditExamTargetModal
        isOpen={isEditExamModalOpen}
        onClose={() => setIsEditExamModalOpen(false)}
      />

    </div>
  );
};
