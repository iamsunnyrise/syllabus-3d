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
    <div className="space-y-4 sm:space-y-6 pb-40 sm:pb-24 font-sans w-full max-w-7xl mx-auto px-1 sm:px-2 animate-fade-in">
      
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
      <div className="relative p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#121424]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 shadow-xs sm:shadow-sm space-y-4 overflow-hidden print:hidden">
        {/* Specular top highlight and ambient gradient */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500/50 dark:via-amber-400/50 to-transparent pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-amber-500/[0.04] dark:bg-amber-500/[0.08] blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0">
            <SectionBadgeIcon section="pacing" size="lg" className="shrink-0 mt-0.5 sm:mt-0" />
            <div className="min-w-0 space-y-1">
              <div className="flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-amber-600 dark:text-amber-400">
                <span className="truncate">Velocity Pacing &amp; Trajectory</span>
                <span className="text-slate-300 dark:text-slate-600">•</span>
                <span className="truncate text-slate-500 dark:text-slate-400 font-medium">Precision Finish-Line Forecaster</span>
                {currentExam && (
                  <>
                    <span className="hidden xs:inline text-slate-300 dark:text-slate-600">•</span>
                    <span className="hidden xs:inline px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/[0.08] text-[11px] font-bold text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-white/10">
                      🎯 {currentExam.name}
                    </span>
                  </>
                )}
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                Target Pacing &amp; Forecast
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Real velocity pacing, automated finish-line projections, and active recall buffer runway.
              </p>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2 sm:gap-2.5 w-full lg:w-auto self-stretch lg:self-auto justify-stretch sm:justify-end shrink-0">
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                window.print();
              }}
              className="flex-1 lg:flex-initial h-10 sm:h-11 px-3.5 sm:px-4 rounded-xl sm:rounded-2xl bg-slate-50 hover:bg-slate-100 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] border border-slate-200/90 dark:border-white/10 text-slate-700 dark:text-slate-200 text-xs sm:text-[13px] font-bold shadow-xs active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
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
              className="flex-1 lg:flex-initial h-10 sm:h-11 px-4 sm:px-5 rounded-xl sm:rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-[13px] font-bold shadow-md shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              title="Change target exam date"
            >
              <Calendar className="w-4 h-4 shrink-0 text-white" />
              <span>Change Target Date</span>
            </button>
          </div>
        </div>

        {/* Integrated Pacing Telemetry Strip */}
        <div className="relative z-10 pt-3 border-t border-slate-100 dark:border-white/[0.06] flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 text-xs">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/20 text-amber-700 dark:text-amber-300 font-bold">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>Target Pace: <strong className="tabular-nums font-mono">{forecast.requiredDailyPace}</strong> Topics/Day</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-slate-300 font-medium">
              <span>Finish Line:</span>
              <strong className="text-slate-900 dark:text-white tabular-nums">{forecast.finishLineForecastDate}</strong>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-slate-300 font-medium">
              <span>Remaining:</span>
              <strong className="text-slate-900 dark:text-white tabular-nums">{forecast.totalDaysLeft} Days</strong>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25 font-bold text-xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{forecast.bufferDays}d Buffer Protected</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-blue-500/10 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-500/25 font-bold text-xs">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>{forecast.topicsCompleted}/{forecast.topicsTotal} Mastered ({forecast.completionPercentage}%)</span>
            </span>
          </div>
        </div>
      </div>

      {/* ═══════════════ 2. 4 EXECUTIVE TELEMETRY BENTO CARDS ═══════════════ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 print:hidden">
        {/* Card 1: Purple Gradient Specular -> Finish-Line Date */}
        <div className="group relative p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#121424]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 hover:border-purple-500/50 shadow-xs sm:shadow-sm space-y-3 transition-all duration-200 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-70 group-hover:opacity-100" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
              <div className="w-8 h-8 rounded-xl bg-purple-500/15 flex items-center justify-center border border-purple-500/25">
                <Flag className="w-4 h-4 stroke-[2.4]" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider font-mono">Finish-Line Date</span>
            </div>
            <span className="px-2 py-0.5 rounded-lg text-[10px] font-mono font-black bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/25">
              Forecast
            </span>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono tabular-nums leading-none">
              {forecast.finishLineForecastDate}
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium pt-1.5 truncate">
              {forecast.daysUntilFinish} study days needed
            </p>
          </div>
        </div>

        {/* Card 2: Rose Gradient Specular -> Required Pace */}
        <div className="group relative p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#121424]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 hover:border-rose-500/50 shadow-xs sm:shadow-sm space-y-3 transition-all duration-200 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-rose-500 to-transparent opacity-70 group-hover:opacity-100" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
              <div className="w-8 h-8 rounded-xl bg-rose-500/15 flex items-center justify-center border border-rose-500/25">
                <Zap className="w-4 h-4 stroke-[2.4]" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider font-mono">Required Pace</span>
            </div>
            <span className="px-2 py-0.5 rounded-lg text-[10px] font-mono font-black bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/25">
              Target
            </span>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-rose-600 dark:text-rose-400 font-mono tabular-nums leading-none">
              {forecast.requiredDailyPace} <span className="text-xs font-sans text-slate-400 font-bold">topics/d</span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium pt-1.5 truncate">
              ~{forecast.requiredWeeklyPace}/wk • ~{forecast.requiredDailyStudyMinutes}m/d
            </p>
          </div>
        </div>

        {/* Card 3: Sky Gradient Specular -> Actual Pace */}
        <div className="group relative p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#121424]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 hover:border-sky-500/50 shadow-xs sm:shadow-sm space-y-3 transition-all duration-200 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sky-500 to-transparent opacity-70 group-hover:opacity-100" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400">
              <div className="w-8 h-8 rounded-xl bg-sky-500/15 flex items-center justify-center border border-sky-500/25">
                <TrendingUp className="w-4 h-4 stroke-[2.4]" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider font-mono">Actual Pace (14d)</span>
            </div>
            <span className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-black border ${
              forecast.actualDailyVelocity >= forecast.requiredDailyPace
                ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/25'
                : 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/25'
            }`}>
              {forecast.actualDailyVelocity >= forecast.requiredDailyPace ? 'Ahead' : 'Behind'}
            </span>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-sky-600 dark:text-sky-400 font-mono tabular-nums leading-none">
              {forecast.actualDailyVelocity} <span className="text-xs font-sans text-slate-400 font-bold">topics/d</span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium pt-1.5 truncate">
              {forecast.actualDailyVelocity >= forecast.requiredDailyPace ? (
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                  +{(forecast.actualDailyVelocity - forecast.requiredDailyPace).toFixed(1)} ahead of schedule
                </span>
              ) : (
                <span className="text-amber-600 dark:text-amber-400 font-bold">
                  -{(forecast.requiredDailyPace - forecast.actualDailyVelocity).toFixed(1)} behind target
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Card 4: Emerald Gradient Specular -> Buffer Health */}
        <div className="group relative p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#121424]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 hover:border-emerald-500/50 shadow-xs sm:shadow-sm space-y-3 transition-all duration-200 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-70 group-hover:opacity-100" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/15 flex items-center justify-center border border-emerald-500/25">
                <ShieldCheck className="w-4 h-4 stroke-[2.4]" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider font-mono">Buffer Health</span>
            </div>
            <span className="px-2 py-0.5 rounded-lg text-[10px] font-mono font-black bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25">
              Protected
            </span>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono tabular-nums leading-none">
              {forecast.bufferDays} <span className="text-xs font-sans text-slate-400 font-bold">Days Safe</span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium pt-1.5 truncate">
              {forecast.bufferMarginDays >= 0 ? `+${forecast.bufferMarginDays}d safe runway` : `${forecast.bufferMarginDays}d buffer overrun`}
            </p>
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
