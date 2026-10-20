import React from 'react';

export interface CircularMetricItem {
  id: string;
  label: string;
  subtext?: string;
  topValue: string | number;
  bottomValue: string | number;
  colorTheme: 'slate' | 'indigo' | 'amber' | 'rose' | 'sky' | 'emerald';
  badgeTag?: string;
  onClick?: () => void;
}

export interface SyllabusCircularProgressWidgetProps {
  title?: string;
  completionText?: string;
  items: CircularMetricItem[];
  className?: string;
}

export const SyllabusCircularProgressWidget: React.FC<SyllabusCircularProgressWidgetProps> = ({
  title = 'SYLLABUS PROGRESS',
  completionText,
  items,
  className = '',
}) => {
  const getThemeClasses = (theme: CircularMetricItem['colorTheme']) => {
    switch (theme) {
      case 'rose':
        return {
          border: 'border-[#EF4444]',
          bg: 'bg-red-500/5 dark:bg-red-500/[0.03]',
          text: 'text-[#EF4444] dark:text-[#F87171]',
          divider: 'bg-red-200 dark:bg-red-900/60',
        };
      case 'sky':
        return {
          border: 'border-[#00B4D8] dark:border-[#38BDF8]',
          bg: 'bg-sky-500/5 dark:bg-sky-500/[0.03]',
          text: 'text-[#00B4D8] dark:text-[#38BDF8]',
          divider: 'bg-cyan-200 dark:bg-cyan-900/60',
        };
      case 'emerald':
        return {
          border: 'border-[#10B981] dark:border-[#34D399]',
          bg: 'bg-emerald-500/5 dark:bg-emerald-500/[0.03]',
          text: 'text-[#10B981] dark:text-[#34D399]',
          divider: 'bg-emerald-200 dark:bg-emerald-900/60',
        };
      case 'amber':
        return {
          border: 'border-[#F59E0B] dark:border-[#FBBF24]',
          bg: 'bg-amber-500/5 dark:bg-amber-500/[0.03]',
          text: 'text-amber-600 dark:text-amber-400',
          divider: 'bg-amber-200 dark:bg-amber-900/60',
        };
      case 'indigo':
        return {
          border: 'border-[#6366F1] dark:border-[#818CF8]',
          bg: 'bg-indigo-500/5 dark:bg-indigo-500/[0.03]',
          text: 'text-[#6366F1] dark:text-[#818CF8]',
          divider: 'bg-indigo-200 dark:bg-indigo-900/60',
        };
      case 'slate':
      default:
        return {
          border: 'border-slate-300 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700',
          bg: 'bg-slate-50 dark:bg-white/[0.02]',
          text: 'text-slate-800 dark:text-white',
          divider: 'bg-slate-300 dark:bg-slate-700/80',
        };
    }
  };

  return (
    <div
      className={`rounded-2xl sm:rounded-3xl p-4 sm:p-7 bg-white dark:bg-[#12131C] border border-slate-200/90 dark:border-white/10 shadow-xs print:hidden select-none transition-colors ${className}`}
    >
      {/* Top Header: Title & Completion Fraction */}
      <div className="flex items-center justify-between gap-2 pb-4 sm:pb-7">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span className="text-[11px] sm:text-[13px] font-black tracking-wider text-slate-500 dark:text-slate-400 uppercase font-sans truncate">
            {title}
          </span>
        </div>
        {completionText && (
          <span className="text-[11px] sm:text-sm font-black text-slate-900 dark:text-white font-sans tabular-nums bg-slate-100 dark:bg-white/[0.04] px-2.5 sm:px-3 py-1 rounded-full border border-slate-200/70 dark:border-white/10 shrink-0 whitespace-nowrap">
            {completionText}
          </span>
        )}
      </div>

      {/* Circular Ring Gauges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-8 py-1 sm:py-3 items-start justify-items-center">
        {items.map((item) => {
          const theme = getThemeClasses(item.colorTheme);
          return (
            <div
              key={item.id}
              onClick={item.onClick}
              className={`flex flex-col items-center group w-full max-w-[190px] ${
                item.onClick ? 'cursor-pointer' : ''
              }`}
            >
              {/* The Circular Shape Gauge */}
              <div
                className={`w-20 h-20 sm:w-24 sm:h-24 md:w-26 md:h-26 rounded-full border-2 sm:border-[2.5px] ${theme.border} ${theme.bg} flex flex-col items-center justify-center shadow-inner transition-transform group-hover:scale-105 relative`}
              >
                <span
                  className={`text-lg sm:text-2xl font-black ${theme.text} tabular-nums leading-none tracking-tight`}
                >
                  {item.topValue}
                </span>
                <div className={`w-7 sm:w-8 h-[1px] ${theme.divider} my-1 sm:my-1.5`} />
                <span className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 tabular-nums leading-none">
                  {item.bottomValue}
                </span>
              </div>

              {/* Title below circle */}
              <span className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white mt-2.5 sm:mt-3 font-sans text-center">
                {item.label}
              </span>

              {/* Subtitle / Context below title */}
              {item.subtext && (
                <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium font-sans text-center truncate max-w-full mt-0.5">
                  {item.subtext}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
