import React from 'react';
import { AppView } from '../layout/Sidebar';
import { soundManager } from '../../utils/soundEffects';
import { haptics } from '../../utils/haptics';
import { preloadView } from '../../utils/viewPreloader';
import { ArrowRight } from 'lucide-react';

interface PortalFeatureCardsProps {
  onNavigate: (view: AppView) => void;
  onOpenPricing?: () => void;
}

export const PortalFeatureCards: React.FC<PortalFeatureCardsProps> = ({
  onNavigate,
  onOpenPricing: _onOpenPricing
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full select-none">
      
      {/* 🖥️ Card 1: Syllabus Explorer */}
      <div
        onMouseEnter={() => preloadView('syllabus')}
        onTouchStart={() => preloadView('syllabus')}
        onClick={() => {
          soundManager.playClick();
          haptics.medium();
          onNavigate('syllabus');
        }}
        className="group relative rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121526] border border-slate-200/90 dark:border-white/10 hover:border-blue-500/60 dark:hover:border-blue-400/50 p-5 sm:p-6 shadow-sm hover:shadow-xl dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col items-center justify-between text-center overflow-hidden"
        title="Open Syllabus Explorer & Track Subjects"
      >
        {/* Subtle Ambient Hover Glow */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/25 transition-all pointer-events-none" />

        {/* Top Feature Tag */}
        <div className="w-full flex items-center justify-center mb-3">
          <span className="px-3 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider bg-blue-500/10 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-400/30">
            CURRICULUM ENGINE
          </span>
        </div>

        {/* Monitor Graphic */}
        <div className="w-full h-36 sm:h-40 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          <svg viewBox="0 0 240 160" className="w-48 sm:w-56 h-auto drop-shadow-md" fill="none">
            {/* Monitor Bezel */}
            <rect x="25" y="15" width="190" height="115" rx="10" fill="#1E293B" stroke="#334155" strokeWidth="2.5" />
            <rect x="30" y="20" width="180" height="100" rx="6" fill="#F8FAFC" />

            {/* Top Bar with SYLLABUS Badge */}
            <rect x="30" y="20" width="180" height="22" fill="#EEF2F6" />
            <circle cx="42" cy="31" r="3" fill="#EF4444" />
            <circle cx="50" cy="31" r="3" fill="#F59E0B" />
            <circle cx="58" cy="31" r="3" fill="#10B981" />

            {/* SYLLABUS Badge in Header */}
            <rect x="75" y="24" width="90" height="14" rx="7" fill="#2563EB" />
            <circle cx="85" cy="31" r="2.5" fill="#10B981" className="animate-pulse" />
            <text x="123" y="34.5" fill="#FFFFFF" fontSize="7" fontWeight="bold" textAnchor="middle" letterSpacing="0.5">
              SYLLABUS 3D
            </text>

            {/* Syllabus Screen Content (Curriculum Tree + Mastery Ring) */}
            <g transform="translate(40, 48)">
              {/* Subject 1: Quant */}
              <rect x="0" y="0" width="84" height="18" rx="5" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1" />
              <rect x="4" y="4" width="10" height="10" rx="3" fill="#3B82F6" />
              <text x="9" y="11.5" fill="#FFFFFF" fontSize="6" fontWeight="bold" textAnchor="middle">∑</text>
              <rect x="18" y="5" width="46" height="3" rx="1.5" fill="#1E40AF" />
              <rect x="18" y="10" width="30" height="2" rx="1" fill="#93C5FD" />
              <circle cx="76" cy="9" r="3" fill="#DBEAFE" />
              <polyline points="74.5,9 75.5,10 77.5,8" stroke="#1E40AF" strokeWidth="0.8" fill="none" />

              {/* Subject 2: Reasoning */}
              <rect x="0" y="22" width="84" height="18" rx="5" fill="#F5F3FF" stroke="#DDD6FE" strokeWidth="1" />
              <rect x="4" y="26" width="10" height="10" rx="3" fill="#8B5CF6" />
              <text x="9" y="33.5" fill="#FFFFFF" fontSize="6" fontWeight="bold" textAnchor="middle">⚡</text>
              <rect x="18" y="27" width="42" height="3" rx="1.5" fill="#5B21B6" />
              <rect x="18" y="32" width="28" height="2" rx="1" fill="#C4B5FD" />
              <circle cx="76" cy="31" r="3" fill="#EDE9FE" />
              <polyline points="74.5,31 75.5,32 77.5,30" stroke="#5B21B6" strokeWidth="0.8" fill="none" />

              {/* Subject 3: General Studies */}
              <rect x="0" y="44" width="84" height="18" rx="5" fill="#ECFDF5" stroke="#A7F3D0" strokeWidth="1" />
              <rect x="4" y="48" width="10" height="10" rx="3" fill="#10B981" />
              <text x="9" y="55.5" fill="#FFFFFF" fontSize="6" fontWeight="bold" textAnchor="middle">✓</text>
              <rect x="18" y="49" width="40" height="3" rx="1.5" fill="#047857" />
              <rect x="18" y="54" width="25" height="2" rx="1" fill="#6EE7B7" />
              <circle cx="76" cy="53" r="3" fill="#D1FAE5" />
              <polyline points="74.5,53 75.5,54 77.5,52" stroke="#047857" strokeWidth="0.8" fill="none" />
            </g>

            {/* Right: Circular Mastery Gauge */}
            <g transform="translate(165, 80)">
              <circle cx="0" cy="0" r="23" fill="#EFF6FF" stroke="#DBEAFE" strokeWidth="3" />
              <circle cx="0" cy="0" r="23" fill="none" stroke="#2563EB" strokeWidth="3" strokeDasharray="144" strokeDashoffset="42" strokeLinecap="round" transform="rotate(-90)" />
              
              {/* Inner Book Icon */}
              <g transform="translate(-8.5, -9) scale(0.75)">
                <path d="M 4 19.5 A 2.5 2.5 0 0 1 6.5 17 H 20" stroke="#1D4ED8" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M 6.5 2 H 20 V 22 H 6.5 A 2.5 2.5 0 0 1 4 19.5 V 4.5 A 2.5 2.5 0 0 1 6.5 2 Z" stroke="#1D4ED8" strokeWidth="2" fill="#DBEAFE" strokeLinecap="round" />
                <line x1="9" y1="7" x2="15" y2="7" stroke="#1E40AF" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="9" y1="11" x2="14" y2="11" stroke="#1E40AF" strokeWidth="1.5" strokeLinecap="round" />
              </g>

              <text x="0" y="15" fill="#1E40AF" fontSize="5.5" fontWeight="black" textAnchor="middle">
                TRACK
              </text>

              {/* Sparkle badge */}
              <circle cx="16" cy="-16" r="3.5" fill="#F59E0B" className="animate-pulse" />
              <polygon points="16,-19 17,-17 19,-16 17,-15 16,-13 15,-15 13,-16 15,-17" fill="#FFFFFF" />
            </g>

            {/* Monitor Stand Base */}
            <path d="M 110 130 L 130 130 L 135 146 L 105 146 Z" fill="#475569" />
            <rect x="90" y="146" width="60" height="5" rx="2.5" fill="#334155" />
          </svg>
        </div>

        {/* Title & Description */}
        <div className="mt-4 flex flex-col items-center gap-1.5 w-full">
          <h2 className="text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors font-sans">
            Syllabus Explorer
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-300 font-medium leading-relaxed max-w-xs text-center">
            Interactive 3D topic tracking, spaced repetition & chapter mastery roadmap.
          </p>

          {/* High-Contrast Primary CTA Button */}
          <div className="w-full mt-3 py-2.5 sm:py-3 px-4 rounded-xl font-black text-xs sm:text-sm bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md hover:shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
            <span>Explore Syllabus</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        </div>
      </div>

      {/* 🖥️ Card 2: Mock Test Tracker */}
      <div
        onMouseEnter={() => preloadView('mock-tracker')}
        onTouchStart={() => preloadView('mock-tracker')}
        onClick={() => {
          soundManager.playClick();
          haptics.medium();
          onNavigate('mock-tracker');
        }}
        className="group relative rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121526] border border-slate-200/90 dark:border-white/10 hover:border-amber-500/60 dark:hover:border-amber-400/50 p-5 sm:p-6 shadow-sm hover:shadow-xl dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col items-center justify-between text-center overflow-hidden"
        title="Open Mock Test Tracker & Performance Analytics"
      >
        {/* Subtle Ambient Hover Glow */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/25 transition-all pointer-events-none" />

        {/* Top Feature Tag */}
        <div className="w-full flex items-center justify-center mb-3">
          <span className="px-3 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider bg-amber-500/10 dark:bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-400/30">
            PERFORMANCE ANALYTICS
          </span>
        </div>

        {/* Monitor Graphic */}
        <div className="w-full h-36 sm:h-40 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          <svg viewBox="0 0 240 160" className="w-48 sm:w-56 h-auto drop-shadow-md" fill="none">
            {/* Monitor Bezel */}
            <rect x="25" y="15" width="190" height="115" rx="10" fill="#1E293B" stroke="#334155" strokeWidth="2.5" />
            <rect x="30" y="20" width="180" height="100" rx="6" fill="#F8FAFC" />

            {/* Top Bar with MOCK TESTS Badge */}
            <rect x="30" y="20" width="180" height="22" fill="#EEF2F6" />
            <circle cx="42" cy="31" r="3" fill="#EF4444" />
            <circle cx="50" cy="31" r="3" fill="#F59E0B" />
            <circle cx="58" cy="31" r="3" fill="#10B981" />

            {/* MOCK TESTS Badge in Header */}
            <rect x="125" y="24" width="75" height="14" rx="7" fill="#F59E0B" />
            <circle cx="135" cy="31" r="2.5" fill="#FFFFFF" className="animate-pulse" />
            <text x="165" y="34.5" fill="#FFFFFF" fontSize="7" fontWeight="bold" textAnchor="middle" letterSpacing="0.5">
              MOCK TESTS
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

        {/* Title & Description */}
        <div className="mt-4 flex flex-col items-center gap-1.5 w-full">
          <h2 className="text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-white group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors font-sans">
            Mock Test Tracker
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-300 font-medium leading-relaxed max-w-xs text-center">
            Sectional percentiles, test series logs, accuracy diagnosis & mistake traps.
          </p>

          {/* High-Contrast Golden CTA Button */}
          <div className="syllabus-start-btn w-full mt-3 py-2.5 sm:py-3 px-4 rounded-xl font-black text-xs sm:text-sm bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:from-amber-400 hover:to-yellow-300 text-slate-950 shadow-md hover:shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98] border border-amber-300/40">
            <span style={{ color: '#090A12' }} className="font-black">Open Mock Tracker</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 text-slate-950" />
          </div>
        </div>
      </div>

      {/* 🖥️ Card 3: Mock & Study Portals */}
      <div
        onMouseEnter={() => preloadView('platforms')}
        onTouchStart={() => preloadView('platforms')}
        onClick={() => {
          soundManager.playClick();
          haptics.medium();
          onNavigate('platforms');
        }}
        className="group relative rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121526] border border-slate-200/90 dark:border-white/10 hover:border-teal-500/60 dark:hover:border-teal-400/50 p-5 sm:p-6 shadow-sm hover:shadow-xl dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col items-center justify-between text-center overflow-hidden"
        title="Open Mock Study Portals & Practice Platforms"
      >
        {/* Subtle Ambient Hover Glow */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-teal-500/10 rounded-full blur-2xl group-hover:bg-teal-500/25 transition-all pointer-events-none" />

        {/* Top Feature Tag */}
        <div className="w-full flex items-center justify-center mb-3">
          <span className="px-3 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider bg-teal-500/10 dark:bg-teal-500/15 text-teal-800 dark:text-teal-300 border border-teal-400/30">
            DESK RESOURCES
          </span>
        </div>

        {/* Monitor Graphic */}
        <div className="w-full h-36 sm:h-40 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          <svg viewBox="0 0 240 160" className="w-48 sm:w-56 h-auto drop-shadow-md" fill="none">
            {/* Monitor Bezel */}
            <rect x="25" y="15" width="190" height="115" rx="10" fill="#1E293B" stroke="#334155" strokeWidth="2.5" />
            <rect x="30" y="20" width="180" height="100" rx="6" fill="#F8FAFC" />

            {/* Top Bar with STUDY PORTALS Badge */}
            <rect x="30" y="20" width="180" height="22" fill="#EEF2F6" />
            <circle cx="42" cy="31" r="3" fill="#EF4444" />
            <circle cx="50" cy="31" r="3" fill="#F59E0B" />
            <circle cx="58" cy="31" r="3" fill="#10B981" />

            {/* URL address pill in header */}
            <rect x="70" y="24" width="100" height="14" rx="7" fill="#0D9488" />
            <circle cx="80" cy="31" r="2.5" fill="#5EEAD4" className="animate-pulse" />
            <text x="122" y="34.5" fill="#FFFFFF" fontSize="7" fontWeight="bold" textAnchor="middle" letterSpacing="0.4">
              STUDY PORTALS
            </text>

            {/* Portal Cards Inside Screen */}
            <g transform="translate(40, 50)">
              {/* Portal 1: Testbook */}
              <rect x="0" y="0" width="75" height="24" rx="6" fill="#F0FDFA" stroke="#99F6E4" strokeWidth="1" />
              <rect x="5" y="5" width="14" height="14" rx="3" fill="#0D9488" />
              <text x="12" y="15" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle">TB</text>
              <text x="24" y="12" fill="#134E4A" fontSize="6.5" fontWeight="bold">Testbook</text>
              <text x="24" y="18" fill="#0D9488" fontSize="5" fontWeight="bold">Live Mocks</text>
              <polyline points="65,10 68,10 68,13" stroke="#0D9488" strokeWidth="0.8" fill="none" />
              <line x1="68" y1="10" x2="63" y2="15" stroke="#0D9488" strokeWidth="0.8" />

              {/* Portal 2: Oliveboard */}
              <rect x="85" y="0" width="75" height="24" rx="6" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1" />
              <rect x="90" y="5" width="14" height="14" rx="3" fill="#2563EB" />
              <text x="97" y="15" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle">OB</text>
              <text x="109" y="12" fill="#1E3A8A" fontSize="6.5" fontWeight="bold">Oliveboard</text>
              <text x="109" y="18" fill="#2563EB" fontSize="5" fontWeight="bold">All-India Rank</text>
              <polyline points="150,10 153,10 153,13" stroke="#2563EB" strokeWidth="0.8" fill="none" />
              <line x1="153" y1="10" x2="148" y2="15" stroke="#2563EB" strokeWidth="0.8" />

              {/* Portal 3: Practice Mock */}
              <rect x="0" y="30" width="75" height="24" rx="6" fill="#FFFBEB" stroke="#FDE68A" strokeWidth="1" />
              <rect x="5" y="35" width="14" height="14" rx="3" fill="#D97706" />
              <text x="12" y="45" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle">PM</text>
              <text x="24" y="42" fill="#78350F" fontSize="6.5" fontWeight="bold">PracticeMock</text>
              <text x="24" y="48" fill="#D97706" fontSize="5" fontWeight="bold">Quizzes & Tests</text>
              <polyline points="65,40 68,40 68,43" stroke="#D97706" strokeWidth="0.8" fill="none" />
              <line x1="68" y1="40" x2="63" y2="45" stroke="#D97706" strokeWidth="0.8" />

              {/* Portal 4: Official Portal */}
              <rect x="85" y="30" width="75" height="24" rx="6" fill="#FDF2F8" stroke="#FBCFE8" strokeWidth="1" />
              <rect x="90" y="35" width="14" height="14" rx="3" fill="#DB2777" />
              <text x="97" y="45" fill="#FFFFFF" fontSize="7" fontWeight="bold" textAnchor="middle">SSC</text>
              <text x="109" y="42" fill="#831843" fontSize="6.5" fontWeight="bold">Official Portal</text>
              <text x="109" y="48" fill="#DB2777" fontSize="5" fontWeight="bold">Updates & PYQ</text>
              <polyline points="150,40 153,40 153,43" stroke="#DB2777" strokeWidth="0.8" fill="none" />
              <line x1="153" y1="40" x2="148" y2="45" stroke="#DB2777" strokeWidth="0.8" />
            </g>

            {/* Monitor Stand Base */}
            <path d="M 110 130 L 130 130 L 135 146 L 105 146 Z" fill="#475569" />
            <rect x="90" y="146" width="60" height="5" rx="2.5" fill="#334155" />
          </svg>
        </div>

        {/* Title & Description */}
        <div className="mt-4 flex flex-col items-center gap-1.5 w-full">
          <h2 className="text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-white group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors font-sans">
            Mock & Study Portals
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-300 font-medium leading-relaxed max-w-xs text-center">
            Direct single-click gateway to Testbook, Oliveboard, PYQs & official updates.
          </p>

          {/* High-Contrast Emerald/Teal CTA Button */}
          <div className="w-full mt-3 py-2.5 sm:py-3 px-4 rounded-xl font-black text-xs sm:text-sm bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-md hover:shadow-lg shadow-teal-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
            <span>Open Study Portals</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        </div>
      </div>

    </div>
  );
};
