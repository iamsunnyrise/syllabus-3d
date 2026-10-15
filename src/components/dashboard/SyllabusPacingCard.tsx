import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Flag,
  Sparkles,
  Zap,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Sliders,
  ShieldCheck,
  ArrowRight,
  Printer
} from 'lucide-react';
import { useSyllabus } from '../../context/SyllabusContext';
import { SectionBadgeIcon } from '../common/SectionBadgeIcon';
import {
  calculatePacingForecast,
  simulateWhatIfPaces,
  getStoredRevisionBuffer,
  saveStoredRevisionBuffer,
  PacingForecastResult
} from '../../utils/pacingCalculator';
import { soundManager } from '../../utils/soundEffects';

interface SyllabusPacingCardProps {
  onOpenEditExamTarget?: () => void;
  onNavigateToSyllabus?: () => void;
  onPrint?: () => void;
}

export const SyllabusPacingCard: React.FC<SyllabusPacingCardProps> = ({
  onOpenEditExamTarget,
  onNavigateToSyllabus,
  onPrint
}) => {
  const {
    currentExam,
    overallStats,
    activityHistory
  } = useSyllabus();

  // Revision buffer state (stored in localStorage)
  const [revisionBufferDays, setRevisionBufferDays] = useState<number>(() => getStoredRevisionBuffer());
  const [isWhatIfOpen, setIsWhatIfOpen] = useState<boolean>(false);

  const examDateStr = currentExam?.examDate || '2026-10-15';
  const examName = currentExam?.name || 'Target Exam';

  // Calculate live pacing forecast
  const forecast: PacingForecastResult = useMemo(() => {
    return calculatePacingForecast({
      examDateStr,
      totalTopics: overallStats.totalTopics,
      completedTopics: overallStats.completedCount,
      inProgressTopics: overallStats.inProgressCount,
      activityHistory,
      revisionBufferDays
    });
  }, [examDateStr, overallStats, activityHistory, revisionBufferDays]);

  // What-If Simulations
  const simulations = useMemo(() => {
    return simulateWhatIfPaces(forecast.topicsRemaining, forecast.totalDaysLeft, revisionBufferDays);
  }, [forecast.topicsRemaining, forecast.totalDaysLeft, revisionBufferDays]);

  const handleBufferChange = (days: number) => {
    soundManager.playClick();
    setRevisionBufferDays(days);
    saveStoredRevisionBuffer(days);
  };

  const handlePrint = () => {
    soundManager.playClick();
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  const bufferOptions = [7, 14, 21, 30];

  return (
    <div className="relative rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#121424]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 shadow-xs sm:shadow-sm p-4 sm:p-6 overflow-hidden space-y-4 sm:space-y-5 select-none transition-all print:p-4 print:border print:border-black print:shadow-none">
      
      {/* Subtle Specular Highlight */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/40 dark:via-indigo-400/50 to-transparent pointer-events-none" />

      {/* 🖨️ PRINT-ONLY DESK REVISION SUMMARY HEADER */}
      <div className="hidden print:block mb-6 pb-4 border-b-2 border-black">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-gray-700 block">
              TARGET PACING &amp; FINISH-LINE CHEATSHEET
            </span>
            <h1 className="text-2xl font-black uppercase tracking-tight text-black mt-1">
              🎯 {examName.toUpperCase()}
            </h1>
            <div className="flex items-center gap-3 text-xs font-mono text-gray-700 mt-2">
              <span>Exam Date: <strong>{forecast.examDateFormatted}</strong></span>
              <span>• Progress: <strong>{forecast.completionPercentage}% ({forecast.topicsCompleted}/{forecast.topicsTotal} Topics)</strong></span>
            </div>
          </div>
          <div className="text-right text-xs font-mono">
            <div className="font-bold text-black uppercase">Study Desk Target Sheet</div>
            <div className="text-gray-600 mt-1">Printed: {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
          </div>
        </div>
      </div>

      {/* 1. TOP HEADER ROW */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-white/[0.06]">
        <div className="flex items-center gap-3">
          <SectionBadgeIcon section="pacing" size="lg" className="shrink-0" />
          <div className="min-w-0 space-y-0.5">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
                Target Pacing
              </h2>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wide border shadow-2xs ${forecast.statusTheme.badgeBg} ${forecast.statusTheme.badgeBorder} ${forecast.statusTheme.badgeText}`}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-current" />
                <span>{forecast.statusLabel}</span>
              </span>
            </div>
            <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5 flex-wrap">
              <span className="font-semibold text-slate-700 dark:text-slate-200">{examName}</span>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <span>Exam on {forecast.examDateFormatted}</span>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <span className="font-bold text-indigo-600 dark:text-indigo-400">{forecast.totalDaysLeft} days left</span>
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2 shrink-0 self-stretch md:self-auto no-print">
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setIsWhatIfOpen(prev => !prev);
            }}
            className={`flex-1 md:flex-initial h-9 sm:h-10 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs active:scale-95 ${
              isWhatIfOpen
                ? 'bg-indigo-600 text-white border-transparent shadow-xs'
                : 'bg-slate-50 hover:bg-slate-100 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200'
            }`}
            title="Toggle What-If pace simulator"
          >
            <Sliders className="w-3.5 h-3.5 shrink-0" />
            <span>What-If Pace</span>
            {isWhatIfOpen ? <ChevronUp className="w-3.5 h-3.5 shrink-0" /> : <ChevronDown className="w-3.5 h-3.5 shrink-0" />}
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="h-9 sm:h-10 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs active:scale-95"
            title="Print cheatsheet (Ctrl + P)"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 shrink-0" />
            <span className="hidden sm:inline">Print</span>
          </button>

          {onOpenEditExamTarget && (
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onOpenEditExamTarget();
              }}
              className="flex-1 md:flex-initial h-9 sm:h-10 px-3.5 sm:px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm shadow-indigo-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              title="Change target exam date"
            >
              <Calendar className="w-3.5 h-3.5 shrink-0 text-white" />
              <span>Change Target</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. TIMELINE STEPPER & PROGRESS */}
      <div className="relative z-10 space-y-3">
        {/* 3 Milestone Steppers */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
          {/* Today */}
          <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 flex flex-col justify-center shadow-2xs">
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span>Today</span>
            </span>
            <span className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-100 tabular-nums truncate mt-0.5">
              {forecast.todayFormatted}
            </span>
          </div>

          {/* Forecast Finish */}
          <div className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border flex flex-col justify-center shadow-2xs ${
            forecast.status === 'ahead' || forecast.status === 'on_track'
              ? 'bg-emerald-500/10 dark:bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
              : forecast.status === 'behind_mild'
              ? 'bg-amber-500/10 dark:bg-amber-500/15 border-amber-500/30 text-amber-600 dark:text-amber-400'
              : 'bg-rose-500/10 dark:bg-rose-500/15 border-rose-500/30 text-rose-600 dark:text-rose-400'
          }`}>
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5">
              <Flag className="w-3 h-3" />
              <span>Forecast Finish</span>
            </span>
            <span className="text-xs sm:text-sm font-black tabular-nums truncate mt-0.5">
              {forecast.finishLineForecastDate}
            </span>
          </div>

          {/* Target Exam */}
          <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/20 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400 flex flex-col justify-center shadow-2xs">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5">
              <span>Target Exam</span>
            </span>
            <span className="text-xs sm:text-sm font-black tabular-nums truncate mt-0.5">
              {forecast.examDateFormatted}
            </span>
          </div>
        </div>

        {/* Progress Bar & Indicators */}
        <div className="space-y-1.5">
          <div className="relative h-2.5 sm:h-3 w-full rounded-full bg-slate-100 dark:bg-white/[0.06] border border-slate-200/80 dark:border-white/10 overflow-hidden flex shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-500 dark:via-indigo-500 dark:to-purple-500 transition-all duration-700 shadow-sm"
              style={{ width: `${Math.max(4, forecast.completionPercentage)}%` }}
            />
          </div>

          <div className="flex items-center justify-between gap-2 text-[11px] sm:text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800 dark:text-slate-200">
                {forecast.topicsCompleted} of {forecast.topicsTotal} completed ({forecast.completionPercentage}%)
              </span>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <span className="text-slate-500 dark:text-slate-400 font-medium">
                {forecast.topicsRemaining} remaining
              </span>
            </div>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{forecast.bufferDays}d Buffer</span>
            </span>
          </div>
        </div>
      </div>

      {/* 3. 4 CORE KPI BENTO TILES */}
      <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {/* Card 1: Finish Line */}
        <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 shadow-2xs flex flex-col justify-between hover:border-purple-400/50 transition-colors">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Finish Line
            </span>
            <div className="w-6 h-6 rounded-lg bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
              <Flag className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-base sm:text-xl font-black text-slate-900 dark:text-white tabular-nums truncate">
              {forecast.finishLineForecastDate}
            </div>
            <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5 truncate">
              {forecast.daysUntilFinish} study days needed
            </div>
          </div>
        </div>

        {/* Card 2: Required Pace */}
        <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 shadow-2xs flex flex-col justify-between hover:border-rose-400/50 transition-colors">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Required Pace
            </span>
            <div className="w-6 h-6 rounded-lg bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
              <Zap className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-base sm:text-xl font-black text-rose-600 dark:text-rose-400 tabular-nums truncate">
              {forecast.requiredDailyPace} <span className="text-xs font-bold text-slate-400">topics/day</span>
            </div>
            <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5 truncate">
              ~{forecast.requiredWeeklyPace}/wk • ~{forecast.requiredDailyStudyMinutes}m/day
            </div>
          </div>
        </div>

        {/* Card 3: Current Pace */}
        <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 shadow-2xs flex flex-col justify-between hover:border-blue-400/50 transition-colors">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Current Pace
            </span>
            <div className="w-6 h-6 rounded-lg bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-base sm:text-xl font-black text-blue-600 dark:text-blue-400 tabular-nums truncate">
              {forecast.actualDailyVelocity} <span className="text-xs font-bold text-slate-400">topics/day</span>
            </div>
            <div className="text-[11px] font-semibold mt-0.5 truncate">
              {forecast.actualDailyVelocity >= forecast.requiredDailyPace ? (
                <span className="text-emerald-600 dark:text-emerald-400">
                  +{(forecast.actualDailyVelocity - forecast.requiredDailyPace).toFixed(1)} ahead of target
                </span>
              ) : (
                <span className="text-amber-600 dark:text-amber-400">
                  -{(forecast.requiredDailyPace - forecast.actualDailyVelocity).toFixed(1)} behind target
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Card 4: Revision Buffer */}
        <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 shadow-2xs flex flex-col justify-between hover:border-emerald-400/50 transition-colors">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Revision Buffer
            </span>
            <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
              forecast.bufferMarginDays >= forecast.bufferDays
                ? 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                : forecast.bufferMarginDays > 0
                ? 'bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400'
                : 'bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400'
            }`}>
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className={`text-base sm:text-xl font-black tabular-nums truncate ${
              forecast.bufferMarginDays >= forecast.bufferDays
                ? 'text-emerald-600 dark:text-emerald-400'
                : forecast.bufferMarginDays > 0
                ? 'text-amber-600 dark:text-amber-400'
                : 'text-rose-600 dark:text-rose-400'
            }`}>
              {forecast.bufferDays} <span className="text-xs font-bold text-slate-400">Days</span>
            </div>
            <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5 truncate">
              {forecast.bufferMarginDays >= 0 ? `+${forecast.bufferMarginDays}d safe runway` : `${forecast.bufferMarginDays}d buffer overrun`}
            </div>
          </div>
        </div>
      </div>

      {/* 4. REVISION BUFFER SELECTOR */}
      <div className="relative z-10 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-50/90 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shadow-2xs">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
            Target Revision Buffer
          </span>
        </div>

        {/* Segmented Control */}
        <div className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-slate-200/70 dark:bg-white/[0.06] border border-slate-200/60 dark:border-white/5 w-full sm:w-auto sm:min-w-[280px]">
          {bufferOptions.map(bDays => {
            const isSelected = revisionBufferDays === bDays;
            return (
              <button
                key={bDays}
                type="button"
                onClick={() => handleBufferChange(bDays)}
                className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer active:scale-95 text-center flex items-center justify-center gap-1 ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-xs font-black'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title={`Reserve ${bDays} days before exam for revision`}
              >
                <span>{bDays}d</span>
                {bDays === 14 && (
                  <span className="text-[9px] text-amber-300 font-black">★</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. ACTIONABLE COACHING BANNER */}
      <div className={`relative z-10 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs ${
        forecast.status === 'ahead' || forecast.status === 'on_track'
          ? 'bg-emerald-500/10 dark:bg-emerald-500/15 border-emerald-500/30'
          : forecast.status === 'behind_mild'
          ? 'bg-amber-500/10 dark:bg-amber-500/15 border-amber-500/30'
          : 'bg-rose-500/10 dark:bg-rose-500/15 border-rose-500/30'
      }`}>
        <div className="space-y-0.5 min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-base">{forecast.statusTheme.icon}</span>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
              {forecast.catchUpAdvice.title}
            </h4>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${forecast.statusTheme.badgeBg} ${forecast.statusTheme.badgeText} border ${forecast.statusTheme.badgeBorder}`}>
              {forecast.catchUpAdvice.actionBadge}
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
            {forecast.catchUpAdvice.detail}
          </p>
        </div>

        {onNavigateToSyllabus && (
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onNavigateToSyllabus();
            }}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm shadow-indigo-500/20 transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer active:scale-95"
          >
            <span>Study Next Topic</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* 6. "WHAT-IF" PACE SIMULATOR DRAWER */}
      {isWhatIfOpen && (
        <div className="relative z-10 p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-indigo-200/80 dark:border-indigo-500/30 space-y-3 animate-fade-in no-print">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                What-If Pace Simulator
              </h4>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {forecast.topicsRemaining} topics remaining
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5">
            {simulations.map(sim => {
              const isCurrent = Math.abs(sim.dailyPace - forecast.actualDailyVelocity) < 0.25;
              return (
                <div
                  key={sim.dailyPace}
                  className={`p-2.5 sm:p-3 rounded-xl border transition-all ${
                    sim.isSafe
                      ? 'bg-white dark:bg-white/[0.04] border-slate-200 dark:border-white/10'
                      : 'bg-amber-500/5 dark:bg-amber-500/10 border-amber-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {sim.dailyPace} {sim.dailyPace === 1 ? 'topic' : 'topics'}/day
                    </span>
                    {isCurrent && (
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold uppercase bg-blue-500/15 text-blue-600 dark:text-blue-400">
                        Current
                      </span>
                    )}
                  </div>

                  <div className="mt-1 space-y-0.5 text-[11px]">
                    <div className="font-bold text-slate-800 dark:text-slate-200 truncate">
                      🏁 {sim.forecastDateFormatted}
                    </div>
                    <div className="text-slate-500 dark:text-slate-400">
                      {sim.daysNeeded} study days
                    </div>
                    <div className="font-bold text-emerald-600 dark:text-emerald-400">
                      {sim.statusText}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 7. DESK CHEATSHEET PRINT SECTION (Ctrl + P) */}
      <div className="hidden print:block pt-3 border-t-2 border-black text-black">
        <h4 className="text-xs font-black uppercase tracking-wider mb-2">
          📋 TARGET PACING &amp; FINISH-LINE SPECIFICATION
        </h4>
        <table className="w-full text-xs font-mono border-collapse border border-black">
          <tbody>
            <tr className="border-b border-black">
              <td className="p-1.5 font-bold border-r border-black w-1/2">Target Exam &amp; Date:</td>
              <td className="p-1.5">{examName} • {forecast.examDateFormatted} ({forecast.totalDaysLeft} Days Left)</td>
            </tr>
            <tr className="border-b border-black">
              <td className="p-1.5 font-bold border-r border-black">Syllabus Progress:</td>
              <td className="p-1.5">{forecast.topicsCompleted} of {forecast.topicsTotal} Topics Mastered ({forecast.completionPercentage}%) • {forecast.topicsRemaining} Remaining</td>
            </tr>
            <tr className="border-b border-black">
              <td className="p-1.5 font-bold border-r border-black">Finish-Line Forecast Date:</td>
              <td className="p-1.5 font-bold">{forecast.finishLineForecastDate} ({forecast.daysUntilFinish} Study Days Required)</td>
            </tr>
            <tr className="border-b border-black">
              <td className="p-1.5 font-bold border-r border-black">Required Completion Velocity:</td>
              <td className="p-1.5 font-bold">{forecast.requiredDailyPace} Topics/Day (~{forecast.requiredWeeklyPace} Topics/Week)</td>
            </tr>
            <tr className="border-b border-black">
              <td className="p-1.5 font-bold border-r border-black">Student's Current Velocity:</td>
              <td className="p-1.5">{forecast.actualDailyVelocity} Topics/Day ({forecast.statusLabel})</td>
            </tr>
            <tr>
              <td className="p-1.5 font-bold border-r border-black">Reserved Revision Buffer:</td>
              <td className="p-1.5 font-bold">{forecast.bufferDays} Days Reserved Prior to Exam Day</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};
