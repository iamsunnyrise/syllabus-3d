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

/**
 * 🖥️ Modern White All-in-One PC Frame Component
 * Precision vector model inspired by modern high-end desktop AIO PCs:
 * - Sleek ultra-thin white chassis with top camera notch & lens
 * - Edge-to-edge display with brushed white chin bar & center silver emblem
 * - Vertical fluted/ribbed architectural column stand (from reference image)
 * - Flat rectangular white pedestal base with rubber pad & ambient drop shadow
 */
const ModernAioPcFrame: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => (
  <svg viewBox="0 0 240 160" className="w-48 sm:w-56 h-auto drop-shadow-md" fill="none">
    <defs>
      {/* Subtle screen shadow */}
      <filter id="aioScreenShadow" x="-5%" y="-5%" width="110%" height="115%" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#0F172A" floodOpacity="0.12" />
      </filter>
      {/* Stand ambient shadow */}
      <filter id="aioStandShadow" x="-10%" y="-10%" width="120%" height="130%" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#0F172A" floodOpacity="0.18" />
      </filter>
      {/* Chin gradient */}
      <linearGradient id="aioChinGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#E2E8F0" />
      </linearGradient>
      {/* Base gradient */}
      <linearGradient id="aioBaseGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#F1F5F9" />
      </linearGradient>
    </defs>

    {/* Ambient desk contact shadow */}
    <ellipse cx="120" cy="155" rx="44" ry="2.5" fill="#000000" opacity="0.18" />

    {/* Stand: Modern Vertical Ribbed Column (From Reference PC) */}
    <g filter="url(#aioStandShadow)">
      {/* Pedestal Base (Flat Rectangular Foot) */}
      <rect x="88" y="148" width="64" height="4.5" rx="2" fill="url(#aioBaseGrad)" stroke="#CBD5E1" strokeWidth="1" />
      {/* Dark rubber foot pad */}
      <rect x="91" y="152" width="58" height="1.2" rx="0.6" fill="#475569" opacity="0.7" />

      {/* Vertical Column with Ribbed Fluting */}
      <rect x="103" y="123" width="34" height="26" rx="1.5" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
      {/* Vertical ribbed groove lines - Architectural Fluting */}
      <line x1="107" y1="123" x2="107" y2="148" stroke="#FFFFFF" strokeWidth="1" />
      <line x1="108" y1="123" x2="108" y2="148" stroke="#CBD5E1" strokeWidth="0.7" />
      <line x1="111" y1="123" x2="111" y2="148" stroke="#FFFFFF" strokeWidth="1" />
      <line x1="112" y1="123" x2="112" y2="148" stroke="#CBD5E1" strokeWidth="0.7" />
      <line x1="115" y1="123" x2="115" y2="148" stroke="#FFFFFF" strokeWidth="1" />
      <line x1="116" y1="123" x2="116" y2="148" stroke="#CBD5E1" strokeWidth="0.7" />
      <line x1="119" y1="123" x2="119" y2="148" stroke="#FFFFFF" strokeWidth="1" />
      <line x1="120" y1="123" x2="120" y2="148" stroke="#CBD5E1" strokeWidth="0.7" />
      <line x1="123" y1="123" x2="123" y2="148" stroke="#FFFFFF" strokeWidth="1" />
      <line x1="124" y1="123" x2="124" y2="148" stroke="#CBD5E1" strokeWidth="0.7" />
      <line x1="127" y1="123" x2="127" y2="148" stroke="#FFFFFF" strokeWidth="1" />
      <line x1="128" y1="123" x2="128" y2="148" stroke="#CBD5E1" strokeWidth="0.7" />
      <line x1="131" y1="123" x2="131" y2="148" stroke="#FFFFFF" strokeWidth="1" />
      <line x1="132" y1="123" x2="132" y2="148" stroke="#CBD5E1" strokeWidth="0.7" />
    </g>

    {/* Top Center Raised Webcam Module (Signature of Reference PC) */}
    <path d="M 108 8 C 108 5.8 110 4.2 113 4.2 L 127 4.2 C 130 4.2 132 5.8 132 8 L 132 10.5 L 108 10.5 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="0.8" />
    <circle cx="120" cy="7.5" r="1.3" fill="#0EA5E9" />
    <circle cx="120" cy="7.5" r="0.5" fill="#38BDF8" />
    <circle cx="124" cy="7.5" r="0.6" fill="#10B981" />

    {/* Monitor Chassis (White Slim All-In-One Bezel) */}
    <g filter="url(#aioScreenShadow)">
      <rect x="18" y="10" width="204" height="115" rx="7" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
      {/* Active Screen Display Area */}
      <rect x="22" y="14" width="196" height="101" rx="3" fill="#F8FAFC" />
      <rect x="22" y="14" width="196" height="101" rx="3" fill="none" stroke="#E2E8F0" strokeWidth="0.8" />

      {/* Screen Content Rendered Inside Display */}
      {children}

      {/* Bottom White Chin Bar with subtle branding badge */}
      <path d="M 18 115 L 222 115 L 222 120.5 C 222 123.2 219.8 125 217 125 L 23 125 C 20.2 125 18 123.2 18 120.5 Z" fill="url(#aioChinGrad)" stroke="#E2E8F0" strokeWidth="0.8" />
      <rect x="114" y="119" width="12" height="2" rx="1" fill="#94A3B8" opacity="0.7" />
    </g>
  </svg>
);

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
          <ModernAioPcFrame>
            {/* Top Bar with SYLLABUS Badge */}
            <rect x="22" y="14" width="196" height="20" fill="#EEF2F6" />
            <circle cx="32" cy="24" r="2.5" fill="#EF4444" />
            <circle cx="39" cy="24" r="2.5" fill="#F59E0B" />
            <circle cx="46" cy="24" r="2.5" fill="#10B981" />

            {/* SYLLABUS Badge in Header */}
            <rect x="75" y="18" width="90" height="12" rx="6" fill="#2563EB" />
            <circle cx="84" cy="24" r="2" fill="#10B981" className="animate-pulse" />
            <text x="120" y="27" fill="#FFFFFF" fontSize="6.5" fontWeight="bold" textAnchor="middle" letterSpacing="0.5">
              SYLLABUS 3D
            </text>

            {/* Syllabus Screen Content (Curriculum Tree + Mastery Ring) */}
            <g transform="translate(32, 40)">
              {/* Subject 1: Quant */}
              <rect x="0" y="0" width="86" height="18" rx="5" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1" />
              <rect x="4" y="4" width="10" height="10" rx="3" fill="#3B82F6" />
              <text x="9" y="11.5" fill="#FFFFFF" fontSize="6" fontWeight="bold" textAnchor="middle">∑</text>
              <rect x="18" y="5" width="46" height="3" rx="1.5" fill="#1E40AF" />
              <rect x="18" y="10" width="30" height="2" rx="1" fill="#93C5FD" />
              <circle cx="78" cy="9" r="3" fill="#DBEAFE" />
              <polyline points="76.5,9 77.5,10 79.5,8" stroke="#1E40AF" strokeWidth="0.8" fill="none" />

              {/* Subject 2: Reasoning */}
              <rect x="0" y="22" width="86" height="18" rx="5" fill="#F5F3FF" stroke="#DDD6FE" strokeWidth="1" />
              <rect x="4" y="26" width="10" height="10" rx="3" fill="#8B5CF6" />
              <text x="9" y="33.5" fill="#FFFFFF" fontSize="6" fontWeight="bold" textAnchor="middle">⚡</text>
              <rect x="18" y="27" width="42" height="3" rx="1.5" fill="#5B21B6" />
              <rect x="18" y="32" width="28" height="2" rx="1" fill="#C4B5FD" />
              <circle cx="78" cy="31" r="3" fill="#EDE9FE" />
              <polyline points="76.5,31 77.5,32 79.5,30" stroke="#5B21B6" strokeWidth="0.8" fill="none" />

              {/* Subject 3: General Studies */}
              <rect x="0" y="44" width="86" height="18" rx="5" fill="#ECFDF5" stroke="#A7F3D0" strokeWidth="1" />
              <rect x="4" y="48" width="10" height="10" rx="3" fill="#10B981" />
              <text x="9" y="55.5" fill="#FFFFFF" fontSize="6" fontWeight="bold" textAnchor="middle">✓</text>
              <rect x="18" y="49" width="40" height="3" rx="1.5" fill="#047857" />
              <rect x="18" y="54" width="25" height="2" rx="1" fill="#6EE7B7" />
              <circle cx="78" cy="53" r="3" fill="#D1FAE5" />
              <polyline points="76.5,53 77.5,54 79.5,52" stroke="#047857" strokeWidth="0.8" fill="none" />
            </g>

            {/* Right: Circular Mastery Gauge */}
            <g transform="translate(165, 72)">
              <circle cx="0" cy="0" r="22" fill="#EFF6FF" stroke="#DBEAFE" strokeWidth="3" />
              <circle cx="0" cy="0" r="22" fill="none" stroke="#2563EB" strokeWidth="3" strokeDasharray="138" strokeDashoffset="40" strokeLinecap="round" transform="rotate(-90)" />
              
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
              <circle cx="15" cy="-15" r="3.5" fill="#F59E0B" className="animate-pulse" />
              <polygon points="15,-18 16,-16 18,-15 16,-14 15,-12 14,-14 12,-15 14,-16" fill="#FFFFFF" />
            </g>
          </ModernAioPcFrame>
        </div>

        {/* Title & Description */}
        <div className="mt-4 flex flex-col items-center gap-1.5 w-full">
          <h2 className="text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors font-sans">
            Syllabus Explorer
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300 font-medium leading-relaxed max-w-xs text-center line-clamp-2">
            Interactive 3D topic tracking, spaced repetition & chapter mastery roadmap.
          </p>

          {/* High-Contrast Primary CTA Button */}
          <div className="w-full mt-3.5 sm:mt-4 py-2.5 sm:py-3 px-4 sm:px-5 rounded-xl font-black text-xs sm:text-sm bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md hover:shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
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
          <ModernAioPcFrame>
            {/* Top Bar with MOCK TESTS Badge */}
            <rect x="22" y="14" width="196" height="20" fill="#EEF2F6" />
            <circle cx="32" cy="24" r="2.5" fill="#EF4444" />
            <circle cx="39" cy="24" r="2.5" fill="#F59E0B" />
            <circle cx="46" cy="24" r="2.5" fill="#10B981" />

            {/* MOCK TESTS Badge in Header */}
            <rect x="124" y="18" width="80" height="12" rx="6" fill="#F59E0B" />
            <circle cx="134" cy="24" r="2" fill="#FFFFFF" className="animate-pulse" />
            <text x="164" y="27" fill="#FFFFFF" fontSize="6.5" fontWeight="bold" textAnchor="middle" letterSpacing="0.5">
              MOCK TESTS
            </text>

            {/* Golden 3D Trophy in Screen Center */}
            <g transform="translate(120, 68)">
              {/* Radial Sparkles / Rays */}
              <circle cx="0" cy="-2" r="26" fill="#FEF3C7" opacity="0.6" />
              <g stroke="#F59E0B" strokeWidth="1" opacity="0.4">
                <line x1="0" y1="-24" x2="0" y2="-28" />
                <line x1="18" y1="-18" x2="22" y2="-22" />
                <line x1="-18" y1="-18" x2="-22" y2="-22" />
                <line x1="23" y1="0" x2="27" y2="0" />
                <line x1="-23" y1="0" x2="-27" y2="0" />
              </g>

              {/* Laurel Wreath Leaves (Left & Right) */}
              <path d="M -20 9 C -24 -4 -17 -16 -7 -20 C -11 -11 -13 0 -7 9 Z" fill="#10B981" opacity="0.8" />
              <path d="M 20 9 C 24 -4 17 -16 7 -20 C 11 -11 13 0 7 9 Z" fill="#10B981" opacity="0.8" />

              {/* Trophy Cup */}
              <path
                d="M -15 -16 L 15 -16 C 15 0 9 11 0 13 C -9 11 -15 0 -15 -16 Z"
                fill="url(#aioTrophyGold)"
              />
              <defs>
                <linearGradient id="aioTrophyGold" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="50%" stopColor="#FDE047" />
                  <stop offset="100%" stopColor="#D97706" />
                </linearGradient>
              </defs>

              {/* Trophy Handles */}
              <path
                d="M -15 -11 C -22 -11 -22 0 -14 2"
                stroke="#D97706"
                strokeWidth="2.2"
                fill="none"
              />
              <path
                d="M 15 -11 C 22 -11 22 0 14 2"
                stroke="#D97706"
                strokeWidth="2.2"
                fill="none"
              />

              {/* Trophy Stem & Base */}
              <rect x="-3" y="13" width="6" height="7" fill="#D97706" />
              <rect x="-11" y="20" width="22" height="5" rx="2" fill="#B45309" />
              <rect x="-9" y="22" width="18" height="1.5" fill="#FDE047" />

              {/* Center Star on Cup */}
              <polygon
                points="0,-7 2,-2 7,-2 3,2 5,7 0,4 -5,7 -3,2 -7,-2 -2,-2"
                fill="#FFFBEB"
              />
            </g>
          </ModernAioPcFrame>
        </div>

        {/* Title & Description */}
        <div className="mt-4 flex flex-col items-center gap-1.5 w-full">
          <h2 className="text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-white group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors font-sans">
            Mock Test Tracker
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300 font-medium leading-relaxed max-w-xs text-center line-clamp-2">
            Sectional percentiles, test series logs, accuracy diagnosis & mistake traps.
          </p>

          {/* High-Contrast Golden CTA Button */}
          <div className="syllabus-start-btn w-full mt-3.5 sm:mt-4 py-2.5 sm:py-3 px-4 sm:px-5 rounded-xl font-black text-xs sm:text-sm bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:from-amber-400 hover:to-yellow-300 text-slate-950 shadow-md hover:shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98] border border-amber-300/40">
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
          <ModernAioPcFrame>
            {/* Top Bar with STUDY PORTALS Badge */}
            <rect x="22" y="14" width="196" height="20" fill="#EEF2F6" />
            <circle cx="32" cy="24" r="2.5" fill="#EF4444" />
            <circle cx="39" cy="24" r="2.5" fill="#F59E0B" />
            <circle cx="46" cy="24" r="2.5" fill="#10B981" />

            {/* URL address pill in header */}
            <rect x="70" y="18" width="100" height="12" rx="6" fill="#0D9488" />
            <circle cx="79" cy="24" r="2" fill="#5EEAD4" className="animate-pulse" />
            <text x="120" y="27" fill="#FFFFFF" fontSize="6.5" fontWeight="bold" textAnchor="middle" letterSpacing="0.4">
              STUDY PORTALS
            </text>

            {/* Portal Cards Inside Screen */}
            <g transform="translate(29, 39)">
              {/* Portal 1: Testbook */}
              <rect x="0" y="0" width="86" height="25" rx="5" fill="#F0FDFA" stroke="#99F6E4" strokeWidth="1" />
              <rect x="5" y="5" width="15" height="15" rx="3" fill="#0D9488" />
              <text x="12.5" y="15.5" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle">TB</text>
              <text x="25" y="12.5" fill="#134E4A" fontSize="6.5" fontWeight="bold">Testbook</text>
              <text x="25" y="19" fill="#0D9488" fontSize="5" fontWeight="bold">Live Mocks</text>
              <polyline points="76,10 79,10 79,13" stroke="#0D9488" strokeWidth="0.8" fill="none" />
              <line x1="79" y1="10" x2="74" y2="15" stroke="#0D9488" strokeWidth="0.8" />

              {/* Portal 2: Oliveboard */}
              <rect x="94" y="0" width="86" height="25" rx="5" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1" />
              <rect x="99" y="5" width="15" height="15" rx="3" fill="#2563EB" />
              <text x="106.5" y="15.5" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle">OB</text>
              <text x="119" y="12.5" fill="#1E3A8A" fontSize="6.5" fontWeight="bold">Oliveboard</text>
              <text x="119" y="19" fill="#2563EB" fontSize="5" fontWeight="bold">All-India Rank</text>
              <polyline points="170,10 173,10 173,13" stroke="#2563EB" strokeWidth="0.8" fill="none" />
              <line x1="173" y1="10" x2="168" y2="15" stroke="#2563EB" strokeWidth="0.8" />

              {/* Portal 3: Practice Mock */}
              <rect x="0" y="31" width="86" height="25" rx="5" fill="#FFFBEB" stroke="#FDE68A" strokeWidth="1" />
              <rect x="5" y="36" width="15" height="15" rx="3" fill="#D97706" />
              <text x="12.5" y="46.5" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle">PM</text>
              <text x="25" y="43.5" fill="#78350F" fontSize="6.5" fontWeight="bold">PracticeMock</text>
              <text x="25" y="50" fill="#D97706" fontSize="5" fontWeight="bold">Quizzes & Tests</text>
              <polyline points="76,41 79,41 79,44" stroke="#D97706" strokeWidth="0.8" fill="none" />
              <line x1="79" y1="41" x2="74" y2="46" stroke="#D97706" strokeWidth="0.8" />

              {/* Portal 4: Official Portal */}
              <rect x="94" y="31" width="86" height="25" rx="5" fill="#FDF2F8" stroke="#FBCFE8" strokeWidth="1" />
              <rect x="99" y="36" width="15" height="15" rx="3" fill="#DB2777" />
              <text x="106.5" y="46.5" fill="#FFFFFF" fontSize="7" fontWeight="bold" textAnchor="middle">SSC</text>
              <text x="119" y="43.5" fill="#831843" fontSize="6.5" fontWeight="bold">Official Portal</text>
              <text x="119" y="50" fill="#DB2777" fontSize="5" fontWeight="bold">Updates & PYQ</text>
              <polyline points="170,41 173,41 173,44" stroke="#DB2777" strokeWidth="0.8" fill="none" />
              <line x1="173" y1="41" x2="168" y2="46" stroke="#DB2777" strokeWidth="0.8" />
            </g>
          </ModernAioPcFrame>
        </div>

        {/* Title & Description */}
        <div className="mt-4 flex flex-col items-center gap-1.5 w-full">
          <h2 className="text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-white group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors font-sans">
            Mock & Study Portals
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300 font-medium leading-relaxed max-w-xs text-center line-clamp-2">
            Direct single-click gateway to Testbook, Oliveboard, PYQs & official updates.
          </p>

          {/* High-Contrast Emerald/Teal CTA Button */}
          <div className="w-full mt-3.5 sm:mt-4 py-2.5 sm:py-3 px-4 sm:px-5 rounded-xl font-black text-xs sm:text-sm bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-md hover:shadow-lg shadow-teal-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
            <span>Open Study Portals</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        </div>
      </div>

    </div>
  );
};
