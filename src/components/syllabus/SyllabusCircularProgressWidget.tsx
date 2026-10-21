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
          border: 'border-rose-500 dark:border-rose-400',
          bg: 'bg-rose-500/10 dark:bg-rose-500/10',
          text: 'text-rose-600 dark:text-rose-300 font-black',
          divider: 'bg-rose-300 dark:bg-rose-500/50',
        };
      case 'sky':
        return {
          border: 'border-sky-500 dark:border-sky-400',
          bg: 'bg-sky-500/10 dark:bg-sky-500/10',
          text: 'text-sky-600 dark:text-sky-300 font-black',
          divider: 'bg-sky-300 dark:bg-sky-500/50',
        };
      case 'emerald':
        return {
          border: 'border-emerald-500 dark:border-emerald-400',
          bg: 'bg-emerald-500/10 dark:bg-emerald-500/10',
          text: 'text-emerald-600 dark:text-emerald-300 font-black',
          divider: 'bg-emerald-300 dark:bg-emerald-500/50',
        };
      case 'amber':
        return {
          border: 'border-amber-500 dark:border-amber-400',
          bg: 'bg-amber-500/10 dark:bg-amber-500/10',
          text: 'text-amber-600 dark:text-amber-300 font-black',
          divider: 'bg-amber-300 dark:bg-amber-500/50',
        };
      case 'indigo':
        return {
          border: 'border-indigo-500 dark:border-indigo-400',
          bg: 'bg-indigo-500/10 dark:bg-indigo-500/10',
          text: 'text-indigo-600 dark:text-indigo-300 font-black',
          divider: 'bg-indigo-300 dark:bg-indigo-500/50',
        };
      case 'slate':
      default:
        return {
          border: 'border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500',
          bg: 'bg-slate-100/50 dark:bg-white/[0.05]',
          text: 'text-slate-900 dark:text-white font-black',
          divider: 'bg-slate-300 dark:bg-slate-600',
        };
    }
  };

  return (
    <div
      className={`rounded-2xl sm:rounded-3xl p-4 sm:p-7 bg-white dark:bg-[#151728] border border-slate-200/90 dark:border-white/15 shadow-sm print:hidden select-none transition-colors ${className}`}
    >
      {/* Top Header: Title & Completion Fraction */}
      <div className="flex items-center justify-between gap-2 pb-4 sm:pb-7">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span className="text-[12px] sm:text-[13px] font-black tracking-wider text-slate-700 dark:text-slate-200 uppercase font-sans truncate">
            {title}
          </span>
        </div>
        {completionText && (
          <span className="text-[11px] sm:text-sm font-black text-slate-900 dark:text-white font-sans tabular-nums bg-slate-100 dark:bg-white/10 px-3 py-1 rounded-full border border-slate-300 dark:border-white/20 shadow-xs shrink-0 whitespace-nowrap">
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
                <span className="text-xs sm:text-sm font-extrabold text-slate-700 dark:text-slate-200 tabular-nums leading-none">
                  {item.bottomValue}
                </span>
              </div>

              {/* Title below circle */}
              <span className="text-xs sm:text-[13.5px] font-black text-slate-900 dark:text-white mt-2.5 sm:mt-3 font-sans text-center tracking-tight">
                {item.label}
              </span>

              {/* Subtitle / Context below title */}
              {item.subtext && (
                <span className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 font-bold font-sans text-center truncate max-w-full mt-0.5">
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
