import React from 'react';
import { AppView } from '../layout/Sidebar';
import { soundManager } from '../../utils/soundEffects';
import { haptics } from '../../utils/haptics';

interface PortalFeatureCardsProps {
  onNavigate: (view: AppView) => void;
  onOpenPricing?: () => void;
}

export const PortalFeatureCards: React.FC<PortalFeatureCardsProps> = ({
  onNavigate,
  onOpenPricing
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full select-none">
      
      {/* 🖥️ Card 1: FREE Live Mock */}
      <div
        onClick={() => {
          soundManager.playClick();
          haptics.medium();
          onNavigate('mock-tracker');
        }}
        className="group relative rounded-3xl bg-white dark:bg-[#121424] border border-slate-200/90 dark:border-white/[0.08] p-5 sm:p-6 shadow-sm hover:shadow-xl dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col items-center justify-between text-center overflow-hidden"
        title="Open FREE Live Mock Tests & Analysis"
      >
        {/* Subtle Ambient Hover Glow */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all pointer-events-none" />

        {/* Monitor Graphic */}
        <div className="w-full h-36 sm:h-40 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          <svg viewBox="0 0 240 160" className="w-48 sm:w-56 h-auto drop-shadow-md" fill="none">
            {/* Monitor Bezel */}
            <rect x="25" y="15" width="190" height="115" rx="10" fill="#1E293B" stroke="#334155" strokeWidth="2.5" />
            <rect x="30" y="20" width="180" height="100" rx="6" fill="#F8FAFC" />

            {/* Top Bar with LIVE TEST Badge */}
            <rect x="30" y="20" width="180" height="22" fill="#EEF2F6" />
            <circle cx="42" cy="31" r="3" fill="#EF4444" />
            <circle cx="50" cy="31" r="3" fill="#F59E0B" />
            <circle cx="58" cy="31" r="3" fill="#10B981" />

            {/* LIVE TEST Badge in Header */}
            <rect x="85" y="24" width="70" height="14" rx="7" fill="#1E40AF" />
            <circle cx="93" cy="31" r="2.5" fill="#EF4444" className="animate-pulse" />
            <text x="122" y="34.5" fill="#FFFFFF" fontSize="7" fontWeight="bold" textAnchor="middle" letterSpacing="0.5">
              LIVE TEST
            </text>

            {/* Live Test Screen Content (Stopwatch Dial + Questions) */}
            <g transform="translate(45, 52)">
              {/* Question Checklist Lines */}
              <rect x="0" y="2" width="12" height="12" rx="3" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.2" />
              <polyline points="3,8 5,10 9,5" stroke="#1D4ED8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="18" y="4" width="45" height="3" rx="1.5" fill="#94A3B8" />
              <rect x="18" y="10" width="35" height="2.5" rx="1.2" fill="#CBD5E1" />

              <rect x="0" y="20" width="12" height="12" rx="3" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.2" />
              <polyline points="3,26 5,28 9,23" stroke="#1D4ED8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="18" y="22" width="50" height="3" rx="1.5" fill="#94A3B8" />
              <rect x="18" y="28" width="40" height="2.5" rx="1.2" fill="#CBD5E1" />

              <rect x="0" y="38" width="12" height="12" rx="3" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.2" />
              <rect x="18" y="40" width="42" height="3" rx="1.5" fill="#94A3B8" />
              <rect x="18" y="46" width="30" height="2.5" rx="1.2" fill="#CBD5E1" />
            </g>

            {/* Stopwatch Timer Dial on Right */}
            <g transform="translate(160, 78)">
              <circle cx="0" cy="0" r="22" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2.5" />
              <circle cx="0" cy="0" r="18" stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="3 2" />
              {/* Stopwatch Tick marks */}
              <line x1="0" y1="-18" x2="0" y2="-15" stroke="#1D4ED8" strokeWidth="1.5" />
              <line x1="18" y1="0" x2="15" y2="0" stroke="#1D4ED8" strokeWidth="1.5" />
              <line x1="0" y1="18" x2="0" y2="15" stroke="#1D4ED8" strokeWidth="1.5" />
              <line x1="-18" y1="0" x2="-15" y2="0" stroke="#1D4ED8" strokeWidth="1.5" />
              {/* Needle Pointer */}
              <line x1="0" y1="0" x2="8" y2="-10" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
              <circle cx="0" cy="0" r="2.5" fill="#1E293B" />
              {/* Pulsing Signal Wave */}
              <circle cx="16" cy="-16" r="4" fill="#A855F7" opacity="0.8" className="animate-ping" />
              <circle cx="16" cy="-16" r="3" fill="#A855F7" />
            </g>

            {/* Monitor Stand Base */}
            <path d="M 110 130 L 130 130 L 135 146 L 105 146 Z" fill="#475569" />
            <rect x="90" y="146" width="60" height="5" rx="2.5" fill="#334155" />
          </svg>
        </div>

        {/* Title & Micro Action */}
        <div className="mt-3 space-y-1">
          <h3 className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            FREE Live Mock
          </h3>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Weekly Live Mocks • All-India Rank Percentile
          </p>
        </div>

        {/* Bottom Action Pill */}
        <div className="mt-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200/80 dark:border-blue-700/50 group-hover:bg-blue-600 group-hover:text-white transition-all">
          <span>Start Live Test</span>
          <span>→</span>
        </div>
      </div>

      {/* 🖥️ Card 2: Pro Mocks / Paid Mocks */}
      <div
        onClick={() => {
          soundManager.playClick();
          haptics.medium();
          if (onOpenPricing) {
            onOpenPricing();
          } else {
            onNavigate('mock-tracker');
          }
        }}
        className="group relative rounded-3xl bg-white dark:bg-[#121424] border border-slate-200/90 dark:border-white/[0.08] p-5 sm:p-6 shadow-sm hover:shadow-xl dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col items-center justify-between text-center overflow-hidden"
        title="Explore Pro Mocks & Full Test Series"
      >
        {/* Subtle Ambient Hover Glow */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all pointer-events-none" />

        {/* Monitor Graphic */}
        <div className="w-full h-36 sm:h-40 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          <svg viewBox="0 0 240 160" className="w-48 sm:w-56 h-auto drop-shadow-md" fill="none">
            {/* Monitor Bezel */}
            <rect x="25" y="15" width="190" height="115" rx="10" fill="#1E293B" stroke="#334155" strokeWidth="2.5" />
            <rect x="30" y="20" width="180" height="100" rx="6" fill="#F8FAFC" />

            {/* Top Bar with PAID Badge */}
            <rect x="30" y="20" width="180" height="22" fill="#EEF2F6" />
            <circle cx="42" cy="31" r="3" fill="#EF4444" />
            <circle cx="50" cy="31" r="3" fill="#F59E0B" />
            <circle cx="58" cy="31" r="3" fill="#10B981" />

            {/* PAID Badge in Header */}
            <rect x="165" y="24" width="35" height="14" rx="4" fill="#F59E0B" />
            <text x="182.5" y="34.5" fill="#FFFFFF" fontSize="7" fontWeight="bold" textAnchor="middle" letterSpacing="0.5">
              PAID
            </text>

            {/* Golden 3D Trophy in Screen Center */}
            <g transform="translate(120, 75)">
              {/* Radial Sparkles / Rays */}
              <circle cx="0" cy="-2" r="28" fill="#FEF3C7" opacity="0.6" />
              <g stroke="#F59E0B" strokeWidth="1" opacity="0.4">
                <line x1="0" y1="-26" x2="0" y2="-30" />
                <line x1="20" y1="-20" x2="24" y2="-24" />
                <line x1="-20" y1="-20" x2="-24" y2="-24" />
                <line x1="25" y1="0" x2="29" y2="0" />
                <line x1="-25" y1="0" x2="-29" y2="0" />
              </g>

              {/* Laurel Wreath Leaves (Left & Right) */}
              <path d="M -22 10 C -26 -5 -18 -18 -8 -22 C -12 -12 -14 0 -8 10 Z" fill="#10B981" opacity="0.8" />
              <path d="M 22 10 C 26 -5 18 -18 8 -22 C 12 -12 14 0 8 10 Z" fill="#10B981" opacity="0.8" />

              {/* Trophy Cup */}
              <path
                d="M -16 -18 L 16 -18 C 16 0 10 12 0 14 C -10 12 -16 0 -16 -18 Z"
                fill="url(#trophyGold)"
              />
              <defs>
                <linearGradient id="trophyGold" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="50%" stopColor="#FDE047" />
                  <stop offset="100%" stopColor="#D97706" />
                </linearGradient>
              </defs>

              {/* Trophy Handles */}
              <path
                d="M -16 -12 C -24 -12 -24 0 -15 2"
                stroke="#D97706"
                strokeWidth="2.5"
                fill="none"
              />
              <path
                d="M 16 -12 C 24 -12 24 0 15 2"
                stroke="#D97706"
                strokeWidth="2.5"
                fill="none"
              />

              {/* Trophy Stem & Base */}
              <rect x="-3" y="14" width="6" height="8" fill="#D97706" />
              <rect x="-12" y="22" width="24" height="6" rx="2" fill="#B45309" />
              <rect x="-10" y="24" width="20" height="2" fill="#FDE047" />

              {/* Center Star on Cup */}
              <polygon
                points="0,-8 2,-2 8,-2 3,2 5,8 0,4 -5,8 -3,2 -8,-2 -2,-2"
                fill="#FFFBEB"
              />
            </g>

            {/* Monitor Stand Base */}
            <path d="M 110 130 L 130 130 L 135 146 L 105 146 Z" fill="#475569" />
            <rect x="90" y="146" width="60" height="5" rx="2.5" fill="#334155" />
          </svg>
        </div>

        {/* Title & Micro Action */}
        <div className="mt-3 space-y-1">
          <h3 className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            Pro Mocks / Paid Mocks
          </h3>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Full Test Series • TCS Pattern & Topic-Wise Mocks
          </p>
        </div>

        {/* Bottom Action Pill */}
        <div className="mt-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-700/50 group-hover:bg-amber-600 group-hover:text-white transition-all">
          <span>View Test Series</span>
          <span>→</span>
        </div>
      </div>

      {/* 🖥️ Card 3: Daily Practice Schedule */}
      <div
        onClick={() => {
          soundManager.playClick();
          haptics.medium();
          onNavigate('planner');
        }}
        className="group relative rounded-3xl bg-white dark:bg-[#121424] border border-slate-200/90 dark:border-white/[0.08] p-5 sm:p-6 shadow-sm hover:shadow-xl dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col items-center justify-between text-center overflow-hidden"
        title="Open Daily Practice Schedule & Routine"
      >
        {/* Subtle Ambient Hover Glow */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all pointer-events-none" />

        {/* Monitor Graphic */}
        <div className="w-full h-36 sm:h-40 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          <svg viewBox="0 0 240 160" className="w-48 sm:w-56 h-auto drop-shadow-md" fill="none">
            {/* Monitor Bezel */}
            <rect x="25" y="15" width="190" height="115" rx="10" fill="#1E293B" stroke="#334155" strokeWidth="2.5" />
            <rect x="30" y="20" width="180" height="100" rx="6" fill="#F8FAFC" />

            {/* Top Bar with DAILY SCHEDULE Badge */}
            <rect x="30" y="20" width="180" height="22" fill="#EEF2F6" />
            <circle cx="42" cy="31" r="3" fill="#EF4444" />
            <circle cx="50" cy="31" r="3" fill="#F59E0B" />
            <circle cx="58" cy="31" r="3" fill="#10B981" />

            {/* Calendar Mini Icon + Title */}
            <rect x="75" y="24" width="90" height="14" rx="4" fill="#0284C7" />
            <text x="120" y="34.5" fill="#FFFFFF" fontSize="7" fontWeight="bold" textAnchor="middle" letterSpacing="0.4">
              DAILY SCHEDULE
            </text>

            {/* Checklist Subjects Inside Screen */}
            <g transform="translate(42, 50)">
              {/* Row 1: Maths */}
              <circle cx="6" cy="6" r="3" fill="#3B82F6" />
              <text x="15" y="8" fill="#1E293B" fontSize="6.5" fontWeight="bold">MATHS</text>
              <circle cx="140" cy="6" r="4.5" fill="#DCFCE7" stroke="#16A34A" strokeWidth="1" />
              <polyline points="138,6 139.5,7.5 142.5,4.5" stroke="#16A34A" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />

              {/* Row 2: English */}
              <circle cx="6" cy="18" r="3" fill="#8B5CF6" />
              <text x="15" y="20" fill="#1E293B" fontSize="6.5" fontWeight="bold">ENGLISH</text>
              <circle cx="140" cy="18" r="4.5" fill="#DCFCE7" stroke="#16A34A" strokeWidth="1" />
              <polyline points="138,18 139.5,19.5 142.5,16.5" stroke="#16A34A" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />

              {/* Row 3: Reasoning */}
              <circle cx="6" cy="30" r="3" fill="#F59E0B" />
              <text x="15" y="32" fill="#1E293B" fontSize="6.5" fontWeight="bold">REASONING</text>
              <circle cx="140" cy="30" r="4.5" fill="#DCFCE7" stroke="#16A34A" strokeWidth="1" />
              <polyline points="138,30 139.5,31.5 142.5,28.5" stroke="#16A34A" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />

              {/* Row 4: General Awareness */}
              <circle cx="6" cy="42" r="3" fill="#10B981" />
              <text x="15" y="44" fill="#1E293B" fontSize="6.5" fontWeight="bold">GENERAL AWARENESS</text>
              <circle cx="140" cy="42" r="4.5" fill="#DCFCE7" stroke="#16A34A" strokeWidth="1" />
              <polyline points="138,42 139.5,43.5 142.5,40.5" stroke="#16A34A" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />

              {/* Bottom Progress Bar */}
              <rect x="0" y="54" width="146" height="4" rx="2" fill="#E2E8F0" />
              <rect x="0" y="54" width="112" height="4" rx="2" fill="#0284C7" />
              <text x="0" y="64" fill="#64748B" fontSize="5.5" fontWeight="bold">Daily Progress</text>
              <text x="146" y="64" fill="#0284C7" fontSize="5.5" fontWeight="bold" textAnchor="end">78%</text>
            </g>

            {/* Monitor Stand Base */}
            <path d="M 110 130 L 130 130 L 135 146 L 105 146 Z" fill="#475569" />
            <rect x="90" y="146" width="60" height="5" rx="2.5" fill="#334155" />
          </svg>
        </div>

        {/* Title & Micro Action */}
        <div className="mt-3 space-y-1">
          <h3 className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
            Daily Practice Schedule
          </h3>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Day-by-Day Targets • Routine & Subject Checklists
          </p>
        </div>

        {/* Bottom Action Pill */}
        <div className="mt-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 border border-sky-200/80 dark:border-sky-700/50 group-hover:bg-sky-600 group-hover:text-white transition-all">
          <span>Open Schedule</span>
          <span>→</span>
        </div>
      </div>

    </div>
  );
};
