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
      className={`rounded-xl sm:rounded-2xl p-3 sm:py-3.5 sm:px-4.5 bg-white dark:bg-[#151728] border border-slate-200/90 dark:border-white/10 shadow-xs print:hidden select-none transition-colors ${className}`}
    >
      {/* Top Header: Title & Completion Fraction (Compact) */}
      <div className="flex items-center justify-between gap-2 pb-2 sm:pb-2.5 mb-2 sm:mb-2.5 border-b border-slate-100 dark:border-white/[0.06]">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span className="text-[11px] sm:text-xs font-black tracking-wider text-slate-700 dark:text-slate-300 uppercase font-sans truncate">
            {title}
          </span>
        </div>
        {completionText && (
          <span className="text-[10px] sm:text-xs font-bold text-slate-800 dark:text-slate-200 font-mono tabular-nums bg-slate-100 dark:bg-white/[0.08] px-2.5 py-0.5 rounded-full border border-slate-200/80 dark:border-white/10 shrink-0 whitespace-nowrap">
            {completionText}
          </span>
        )}
      </div>

      {/* Circular Ring Gauges (Compact & Space-Efficient) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3.5 py-0.5 items-start justify-items-center">
        {items.map((item) => {
          const theme = getThemeClasses(item.colorTheme);
          return (
            <div
              key={item.id}
              onClick={item.onClick}
              className={`flex flex-col items-center group w-full max-w-[170px] py-0.5 rounded-xl hover:bg-slate-50/80 dark:hover:bg-white/[0.03] transition-colors ${
                item.onClick ? 'cursor-pointer' : ''
              }`}
            >
              {/* The Circular Shape Gauge */}
              <div
                className={`w-12 h-12 sm:w-13.5 sm:h-13.5 md:w-14 md:h-14 rounded-full border-[1.8px] sm:border-2 ${theme.border} ${theme.bg} flex flex-col items-center justify-center transition-transform group-hover:scale-105 relative shrink-0 shadow-2xs`}
              >
                <span
                  className={`text-sm sm:text-base font-black ${theme.text} tabular-nums leading-none tracking-tight`}
                >
                  {item.topValue}
                </span>
                <div className={`w-4 sm:w-5 h-[1px] ${theme.divider} my-0.5`} />
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-600 dark:text-slate-300 tabular-nums leading-none">
                  {item.bottomValue}
                </span>
              </div>

              {/* Title below circle */}
              <span className="text-[11px] sm:text-xs font-bold text-slate-900 dark:text-white mt-1.5 font-sans text-center tracking-tight leading-tight truncate max-w-full">
                {item.label}
              </span>

              {/* Subtitle / Context below title */}
              {item.subtext && (
                <span className="text-[9.5px] sm:text-[10px] text-slate-500 dark:text-slate-400 font-medium font-sans text-center truncate max-w-full mt-0.5 leading-tight">
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
