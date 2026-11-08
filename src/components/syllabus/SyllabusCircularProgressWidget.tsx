import React, { useMemo } from 'react';
import {
  Sparkles,
  Layers,
  Award,
  Timer,
  Target,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  Flame,
  Calendar
} from 'lucide-react';

export interface CircularMetricItem {
  id: string;
  label: string;
  subtext?: string;
  topValue: string | number;
  bottomValue: string | number;
  colorTheme: 'slate' | 'indigo' | 'amber' | 'rose' | 'sky' | 'emerald';
  badgeTag?: string;
  progressPercent?: number; // 0 to 100 for SVG circular progress meter
  icon?: React.ReactNode;
  interactiveHint?: string;
  onClick?: () => void;
}

export interface SyllabusCircularProgressWidgetProps {
  title?: string;
  subtitle?: string;
  completionText?: string;
  completionPercentage?: number;
  items: CircularMetricItem[];
  className?: string;
  onOverallClick?: () => void;
}

export const SyllabusCircularProgressWidget: React.FC<SyllabusCircularProgressWidgetProps> = ({
  title = 'SYLLABUS PROGRESS',
  subtitle,
  completionText,
  completionPercentage,
  items,
  className = '',
  onOverallClick,
}) => {
  // Theme color maps with gradients, glows, and badges
  const getThemeConfig = (theme: CircularMetricItem['colorTheme']) => {
    switch (theme) {
      case 'amber':
        return {
          gradient: ['#F59E0B', '#D97706'],
          glow: 'rgba(245, 158, 11, 0.45)',
          trackColor: 'text-amber-500/15 dark:text-amber-500/20',
          accentText: 'text-amber-600 dark:text-amber-400',
          accentBg: 'bg-amber-500/10 dark:bg-amber-500/15',
          accentBorder: 'border-amber-500/30 dark:border-amber-500/30',
          badge: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/25',
          cardHover: 'hover:border-amber-500/40 hover:shadow-amber-500/5',
          glowRing: 'ring-amber-400/20',
          defaultIcon: <Layers className="w-3.5 h-3.5 text-amber-500" />,
        };
      case 'rose':
        return {
          gradient: ['#F43F5E', '#BE123C'],
          glow: 'rgba(244, 63, 94, 0.45)',
          trackColor: 'text-rose-500/15 dark:text-rose-500/20',
          accentText: 'text-rose-600 dark:text-rose-400',
          accentBg: 'bg-rose-500/10 dark:bg-rose-500/15',
          accentBorder: 'border-rose-500/30 dark:border-rose-500/30',
          badge: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/25',
          cardHover: 'hover:border-rose-500/40 hover:shadow-rose-500/5',
          glowRing: 'ring-rose-400/20',
          defaultIcon: <Award className="w-3.5 h-3.5 text-rose-500" />,
        };
      case 'sky':
        return {
          gradient: ['#0EA5E9', '#0284C7'],
          glow: 'rgba(14, 165, 233, 0.45)',
          trackColor: 'text-sky-500/15 dark:text-sky-500/20',
          accentText: 'text-sky-600 dark:text-sky-400',
          accentBg: 'bg-sky-500/10 dark:bg-sky-500/15',
          accentBorder: 'border-sky-500/30 dark:border-sky-500/30',
          badge: 'bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/25',
          cardHover: 'hover:border-sky-500/40 hover:shadow-sky-500/5',
          glowRing: 'ring-sky-400/20',
          defaultIcon: <Timer className="w-3.5 h-3.5 text-sky-500" />,
        };
      case 'emerald':
        return {
          gradient: ['#10B981', '#047857'],
          glow: 'rgba(16, 185, 129, 0.45)',
          trackColor: 'text-emerald-500/15 dark:text-emerald-500/20',
          accentText: 'text-emerald-600 dark:text-emerald-400',
          accentBg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
          accentBorder: 'border-emerald-500/30 dark:border-emerald-500/30',
          badge: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/25',
          cardHover: 'hover:border-emerald-500/40 hover:shadow-emerald-500/5',
          glowRing: 'ring-emerald-400/20',
          defaultIcon: <Target className="w-3.5 h-3.5 text-emerald-500" />,
        };
      case 'indigo':
        return {
          gradient: ['#6366F1', '#4338CA'],
          glow: 'rgba(99, 102, 241, 0.45)',
          trackColor: 'text-indigo-500/15 dark:text-indigo-500/20',
          accentText: 'text-indigo-600 dark:text-indigo-400',
          accentBg: 'bg-indigo-500/10 dark:bg-indigo-500/15',
          accentBorder: 'border-indigo-500/30 dark:border-indigo-500/30',
          badge: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/25',
          cardHover: 'hover:border-indigo-500/40 hover:shadow-indigo-500/5',
          glowRing: 'ring-indigo-400/20',
          defaultIcon: <TrendingUp className="w-3.5 h-3.5 text-indigo-500" />,
        };
      case 'slate':
      default:
        return {
          gradient: ['#64748B', '#334155'],
          glow: 'rgba(100, 116, 139, 0.35)',
          trackColor: 'text-slate-500/15 dark:text-slate-500/20',
          accentText: 'text-slate-900 dark:text-white',
          accentBg: 'bg-slate-500/10 dark:bg-slate-500/15',
          accentBorder: 'border-slate-500/30 dark:border-slate-500/30',
          badge: 'bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/25',
          cardHover: 'hover:border-slate-400 dark:hover:border-slate-600 hover:shadow-slate-500/5',
          glowRing: 'ring-slate-400/20',
          defaultIcon: <Sparkles className="w-3.5 h-3.5 text-slate-500" />,
        };
    }
  };

  // Derive overall completion percentage if not explicitly passed
  const calculatedPercentage = useMemo(() => {
    if (typeof completionPercentage === 'number') return completionPercentage;
    const rateItem = items.find((i) => i.id === 'completion-rate');
    if (rateItem) {
      const parsed = parseFloat(String(rateItem.topValue).replace('%', ''));
      if (!isNaN(parsed)) return parsed;
    }
    const masteredItem = items.find((i) => i.id === 'mastered-topics');
    if (masteredItem) {
      const top = Number(masteredItem.topValue) || 0;
      const bottom = Number(masteredItem.bottomValue) || 0;
      return bottom > 0 ? Math.round((top / bottom) * 100) : 0;
    }
    return 0;
  }, [completionPercentage, items]);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 bg-white/95 dark:bg-[#131525]/95 border border-slate-200/90 dark:border-white/10 shadow-sm dark:shadow-2xl backdrop-blur-xl select-none transition-all duration-300 print:hidden ${className}`}
    >
      {/* 1. TOP AMBIENT AURORA STRIP */}
      <div className="absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-amber-400 via-rose-500 via-sky-400 to-emerald-400 opacity-90 shadow-xs" />

      {/* 2. SUBTLE MESH LIGHTING ACCENTS IN BACKGROUND */}
      <div className="absolute -top-16 -left-16 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -top-16 -right-16 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* 3. EXECUTIVE HEADER: TITLE, LIVE STATUS & COMPLETION BADGE */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-slate-100 dark:border-white/[0.07]">
        {/* Left: Indicator & Title */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-xs" />
          </div>
          <div className="flex items-baseline gap-2 min-w-0">
            <h3 className="text-xs sm:text-[13px] font-black tracking-wider text-slate-900 dark:text-white uppercase font-sans truncate">
              {title}
            </h3>
            <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-mono">
              Live Tracker
            </span>
          </div>
        </div>

        {/* Right: Completion Pill with Progress Indicator */}
        <div className="flex items-center gap-2 shrink-0">
          {completionText && (
            <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-slate-100/90 dark:bg-white/[0.07] border border-slate-200/80 dark:border-white/10 shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span className="text-[10.5px] sm:text-xs font-bold text-slate-800 dark:text-slate-200 font-mono tabular-nums">
                {completionText}
              </span>
            </div>
          )}

          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-mono font-black text-[10.5px] sm:text-xs shadow-xs">
            <span>{calculatedPercentage}%</span>
          </div>
        </div>

        {/* Integrated Linear Micro-Progress Bar */}
        <div className="w-full mt-1.5">
          <div className="h-1.5 w-full bg-slate-100 dark:bg-white/[0.06] rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-amber-400 via-rose-500 via-sky-400 to-emerald-400 rounded-full transition-all duration-1000 ease-out relative"
              style={{ width: `${Math.min(100, Math.max(calculatedPercentage > 0 ? calculatedPercentage : 2, 2))}%` }}
            >
              <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/60 rounded-full blur-[1px] animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* 4. RADIAL SVG PROGRESS GAUGES (4 INTERACTIVE CARDS) */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5 pt-3.5 items-stretch">
        {items.map((item, index) => {
          const theme = getThemeConfig(item.colorTheme);

          // Calculate SVG circular arc values
          // Radius = 27, Circumference ≈ 169.64
          const radius = 27;
          const circumference = 2 * Math.PI * radius;

          // Compute percent for this card
          let percent = 0;
          if (typeof item.progressPercent === 'number') {
            percent = item.progressPercent;
          } else if (item.id === 'completion-rate') {
            percent = calculatedPercentage;
          } else if (item.id === 'mastered-topics') {
            const top = Number(item.topValue) || 0;
            const bottom = Number(item.bottomValue) || 0;
            percent = bottom > 0 ? (top / bottom) * 100 : 0;
          } else if (item.id === 'total-topics') {
            percent = Number(item.topValue) > 0 ? 100 : 0;
          } else if (item.id === 'exam-runway') {
            const days = Number(item.topValue) || 0;
            // Visual countdown ratio: 100 days scale
            percent = days > 0 ? Math.min(100, Math.max(15, (days / 180) * 100)) : 0;
          }
          const clampedPercent = Math.min(100, Math.max(0, percent));
          const strokeDashoffset = circumference - (clampedPercent / 100) * circumference;

          const gradientId = `svg-gauge-grad-${item.id}-${index}`;

          return (
            <div
              key={item.id}
              onClick={item.onClick}
              className={`relative flex flex-col items-center justify-between p-3 sm:p-3.5 rounded-2xl bg-slate-50/70 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/[0.06] transition-all duration-200 group ${
                theme.cardHover
              } ${item.onClick ? 'cursor-pointer active:scale-[0.98]' : ''}`}
            >
              {/* Floating Mini Badge / Category Pill */}
              <div className="w-full flex items-center justify-between mb-2">
                <span
                  className={`text-[9.5px] font-black uppercase font-mono tracking-wider px-2 py-0.5 rounded-md border ${theme.badge}`}
                >
                  {item.badgeTag || (index === 0 ? 'Curriculum' : index === 1 ? 'Mastery' : index === 2 ? 'Runway' : 'Overall')}
                </span>
                <div
                  className={`w-6 h-6 rounded-lg ${theme.accentBg} ${theme.accentBorder} border flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 transition-transform duration-200`}
                >
                  {item.icon || theme.defaultIcon}
                </div>
              </div>

              {/* High-Fidelity Circular Radial SVG Gauge */}
              <div className="relative my-1 shrink-0 flex items-center justify-center">
                <svg
                  className="w-16 h-16 sm:w-18 sm:h-18 transform -rotate-90"
                  viewBox="0 0 72 72"
                >
                  <defs>
                    <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={theme.gradient[0]} />
                      <stop offset="100%" stopColor={theme.gradient[1]} />
                    </linearGradient>
                  </defs>

                  {/* Background Track Circle */}
                  <circle
                    cx="36"
                    cy="36"
                    r={radius}
                    strokeWidth="4.5"
                    fill="none"
                    stroke="currentColor"
                    className={theme.trackColor}
                  />

                  {/* Active Foreground Progress Arc */}
                  <circle
                    cx="36"
                    cy="36"
                    r={radius}
                    strokeWidth="4.8"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="none"
                    stroke={`url(#${gradientId})`}
                    style={{
                      transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                      filter: `drop-shadow(0 2px 4px ${theme.glow})`,
                    }}
                  />
                </svg>

                {/* Center Content Inside Radial Gauge */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span
                    className={`text-base sm:text-[17px] font-black tracking-tight leading-none ${theme.accentText} tabular-nums`}
                  >
                    {item.topValue}
                  </span>
                  <div className="w-3.5 h-[1.5px] bg-slate-300 dark:bg-white/20 my-0.5 rounded-full" />
                  <span className="text-[9.5px] sm:text-[10px] font-bold font-mono tracking-tight text-slate-500 dark:text-slate-400 leading-none tabular-nums">
                    {item.bottomValue}
                  </span>
                </div>
              </div>

              {/* Title & Context Information */}
              <div className="w-full text-center mt-2 min-w-0">
                <h4 className="text-xs sm:text-[13px] font-black text-slate-900 dark:text-white tracking-tight truncate leading-tight group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                  {item.label}
                </h4>
                {item.subtext && (
                  <p className="text-[10px] sm:text-[10.5px] font-medium text-slate-500 dark:text-slate-400 truncate mt-0.5 leading-tight">
                    {item.subtext}
                  </p>
                )}
              </div>

              {/* Interactive Click Cue if applicable */}
              {item.onClick && (
                <div className="mt-1.5 flex items-center gap-0.5 text-[9px] font-bold text-slate-400 dark:text-slate-500 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  <span>{item.interactiveHint || 'Tap to manage'}</span>
                  <ChevronRight className="w-2.5 h-2.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
