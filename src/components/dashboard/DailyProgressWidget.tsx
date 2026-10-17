import React from 'react';

export interface DailyProgressWidgetProps {
  completed?: number;
  total?: number;
  dayRankText?: string;
  dayRankTotal?: string | number;
  dayRankLabel?: string;
  attemptedTotal?: number;
  accuracyPercentage?: number;
  className?: string;
}

export const DailyProgressWidget: React.FC<DailyProgressWidgetProps> = ({
  completed = 0,
  total = 5,
  dayRankText = '—',
  dayRankTotal = '4833',
  dayRankLabel = 'Day 10 rank',
  attemptedTotal = 127,
  accuracyPercentage = 0,
  className = '',
}) => {
  return (
    <div
      className={`rounded-2xl sm:rounded-3xl p-5 sm:p-7 bg-white dark:bg-[#12131C] border border-slate-200/90 dark:border-white/10 shadow-xs print:hidden select-none transition-colors ${className}`}
    >
      {/* Top Header: DAILY PROGRESS & Progress Fraction */}
      <div className="flex items-center justify-between pb-5 sm:pb-7">
        <span className="text-xs sm:text-[13px] font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase font-sans">
          DAILY PROGRESS
        </span>
        <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white font-sans tabular-nums">
          {completed}/{total} completed
        </span>
      </div>

      {/* 3 Circular Ring Gauges */}
      <div className="flex items-center justify-around sm:justify-center sm:gap-20 md:gap-32 py-2 sm:py-3">
        {/* Ring 1: Day 10 rank */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 sm:border-[2.5px] border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-white/[0.02] flex flex-col items-center justify-center shadow-inner transition-transform hover:scale-105">
            <span className="text-lg sm:text-2xl font-black text-slate-800 dark:text-white tabular-nums leading-none">
              {dayRankText}
            </span>
            <div className="w-7 sm:w-8 h-[1px] bg-slate-300 dark:bg-slate-700/80 my-1 sm:my-1.5" />
            <span className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 tabular-nums leading-none">
              {dayRankTotal}
            </span>
          </div>
          <span className="text-xs sm:text-[13px] font-bold text-slate-500 dark:text-slate-400 mt-2.5 sm:mt-3 font-sans text-center">
            {dayRankLabel}
          </span>
        </div>

        {/* Ring 2: Attempted (Vivid Red Ring) */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 sm:border-[2.5px] border-[#EF4444] bg-red-500/5 dark:bg-red-500/[0.03] flex flex-col items-center justify-center shadow-inner transition-transform hover:scale-105">
            <span className="text-lg sm:text-2xl font-black text-[#EF4444] dark:text-[#F87171] tabular-nums leading-none">
              {completed}
            </span>
            <div className="w-7 sm:w-8 h-[1px] bg-red-200 dark:bg-red-900/60 my-1 sm:my-1.5" />
            <span className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 tabular-nums leading-none">
              {attemptedTotal}
            </span>
          </div>
          <span className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white mt-2.5 sm:mt-3 font-sans text-center">
            Attempted
          </span>
        </div>

        {/* Ring 3: Accuracy (Vivid Cyan Ring) */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 sm:border-[2.5px] border-[#00B4D8] dark:border-[#38BDF8] bg-sky-500/5 dark:bg-sky-500/[0.03] flex flex-col items-center justify-center shadow-inner transition-transform hover:scale-105">
            <span className="text-lg sm:text-2xl font-black text-[#00B4D8] dark:text-[#38BDF8] tabular-nums leading-none">
              {accuracyPercentage}
            </span>
            <div className="w-7 sm:w-8 h-[1px] bg-cyan-200 dark:bg-cyan-900/60 my-1 sm:my-1.5" />
            <span className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 tabular-nums leading-none">
              100
            </span>
          </div>
          <span className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white mt-2.5 sm:mt-3 font-sans text-center">
            Accuracy
          </span>
        </div>
      </div>
    </div>
  );
};
