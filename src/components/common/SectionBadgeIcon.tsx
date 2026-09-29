import React from 'react';
import { AppView } from '../layout/Sidebar';

interface SectionBadgeIconProps {
  section: AppView | string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  className?: string;
  isActive?: boolean;
  showGlow?: boolean;
  alt?: string;
}

export const SectionBadgeIcon: React.FC<SectionBadgeIconProps> = ({
  section,
  size = 'md',
  className = '',
  isActive = false,
  showGlow = false
}) => {
  // Normalize size to pixel dimensions
  const pixelSize = typeof size === 'number'
    ? size
    : {
        xs: 20,
        sm: 26,
        md: 34,
        lg: 44,
        xl: 56
      }[size];

  // Unique ID prefix to prevent SVG gradient/filter ID collisions
  const uid = React.useId().replace(/:/g, '');

  // Gradient & Glow Color by Section
  const { gradientId, glowColor } = getSectionTheme(section, uid);

  return (
    <div
      style={{ width: pixelSize, height: pixelSize }}
      className={`relative inline-flex items-center justify-center shrink-0 transition-all duration-200 select-none ${
        isActive ? 'scale-105' : 'group-hover:scale-105'
      } ${className}`}
    >
      {/* Dynamic Active Glow Halo */}
      {(isActive || showGlow) && (
        <div
          style={{
            width: pixelSize * 1.1,
            height: pixelSize * 1.1,
            backgroundColor: glowColor
          }}
          className="absolute inset-0 m-auto rounded-xl opacity-45 blur-md -z-10 animate-pulse pointer-events-none"
        />
      )}

      <svg
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xs overflow-visible"
      >
        <defs>
          {/* Subtle Squircle Drop Shadow */}
          <filter id={`shadow-${uid}`} x="-20%" y="-15%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="3.5" floodColor="#0F172A" floodOpacity="0.22" />
          </filter>

          {/* Top Glass Specular Overlay */}
          <linearGradient id={`sheen-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.32" />
            <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          {/* 1. Dashboard: Royal Sapphire Blue */}
          <linearGradient id={`bg-overview-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>

          {/* 2. Syllabus Explorer: Royal Purple / Violet */}
          <linearGradient id={`bg-syllabus-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="50%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#5B21B6" />
          </linearGradient>

          {/* 3. Study Planner: Electric Cerulean Sky */}
          <linearGradient id={`bg-planner-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0EA5E9" />
            <stop offset="55%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0369A1" />
          </linearGradient>

          {/* 4. Target Pacing: Vivid Mint & Emerald */}
          <linearGradient id={`bg-pacing-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="55%" stopColor="#059669" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>

          {/* 5. AI YouTube Notes: Ruby Crimson */}
          <linearGradient id={`bg-youtube-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F43F5E" />
            <stop offset="55%" stopColor="#E11D48" />
            <stop offset="100%" stopColor="#9F1239" />
          </linearGradient>

          {/* 6. Digital Notes: Teal & Jade Forest */}
          <linearGradient id={`bg-digital-notes-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14B8A6" />
            <stop offset="55%" stopColor="#0D9488" />
            <stop offset="100%" stopColor="#115E59" />
          </linearGradient>

          {/* 7. Mock Test Tracker: Radiant Amber Gold */}
          <linearGradient id={`bg-mock-tracker-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="55%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>

          {/* 8. Spaced Revision: Tangerine Orange */}
          <linearGradient id={`bg-revision-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FB923C" />
            <stop offset="55%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#C2410C" />
          </linearGradient>

          {/* 9. Weak Topics: Crimson Fire Alert */}
          <linearGradient id={`bg-weak-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FB7185" />
            <stop offset="55%" stopColor="#E11D48" />
            <stop offset="100%" stopColor="#881337" />
          </linearGradient>

          {/* 10. Concept Mind Map: Cosmic Violet & Magenta */}
          <linearGradient id={`bg-mindmap-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C084FC" />
            <stop offset="55%" stopColor="#9333EA" />
            <stop offset="100%" stopColor="#6B21A8" />
          </linearGradient>

          {/* 11. Analytics & Heatmap: Cyan Oceanic */}
          <linearGradient id={`bg-analytics-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="55%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>

          {/* 12. Study Station & Hub: Royal Indigo */}
          <linearGradient id={`bg-platforms-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="55%" stopColor="#4F46E5" />
            <stop offset="100%" stopColor="#3730A3" />
          </linearGradient>

          {/* 13. Settings: Titanium Carbon Slate */}
          <linearGradient id={`bg-settings-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#64748B" />
            <stop offset="55%" stopColor="#475569" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>

          {/* Squircle Clip Path for Inner Artwork */}
          <clipPath id={`squircle-clip-${uid}`}>
            <rect x="6" y="6" width="88" height="88" rx="26" ry="26" />
          </clipPath>
        </defs>

        {/* Base Squircle with Smooth Rounded Geometry & Soft Bevel */}
        <rect
          x="6"
          y="6"
          width="88"
          height="88"
          rx="26"
          ry="26"
          fill={`url(#${gradientId})`}
          stroke="rgba(255, 255, 255, 0.28)"
          strokeWidth="1.8"
          filter={`url(#shadow-${uid})`}
        />

        {/* Top Glass Specular Overlay */}
        <rect
          x="6"
          y="6"
          width="88"
          height="44"
          rx="26"
          fill={`url(#sheen-${uid})`}
          clipPath={`url(#squircle-clip-${uid})`}
        />

        {/* Section Glyphs */}
        <g clipPath={`url(#squircle-clip-${uid})`}>
          {renderSectionGlyph(section)}
        </g>
      </svg>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Theme Configuration
// ─────────────────────────────────────────────────────────────────────────────
function getSectionTheme(section: string, uid: string): { gradientId: string; glowColor: string } {
  switch (section) {
    case 'overview':
    case 'landing':
      return { gradientId: `bg-overview-${uid}`, glowColor: '#3B82F6' };
    case 'syllabus':
    case 'subjects':
      return { gradientId: `bg-syllabus-${uid}`, glowColor: '#8B5CF6' };
    case 'planner':
      return { gradientId: `bg-planner-${uid}`, glowColor: '#0EA5E9' };
    case 'pacing':
      return { gradientId: `bg-pacing-${uid}`, glowColor: '#10B981' };
    case 'youtube-notes':
      return { gradientId: `bg-youtube-${uid}`, glowColor: '#F43F5E' };
    case 'digital-notes':
      return { gradientId: `bg-digital-notes-${uid}`, glowColor: '#14B8A6' };
    case 'mock-tracker':
      return { gradientId: `bg-mock-tracker-${uid}`, glowColor: '#F59E0B' };
    case 'revision':
      return { gradientId: `bg-revision-${uid}`, glowColor: '#FB923C' };
    case 'weak':
      return { gradientId: `bg-weak-${uid}`, glowColor: '#E11D48' };
    case 'mindmap':
      return { gradientId: `bg-mindmap-${uid}`, glowColor: '#C084FC' };
    case 'analytics':
    case 'heatmap':
      return { gradientId: `bg-analytics-${uid}`, glowColor: '#06B6D4' };
    case 'platforms':
      return { gradientId: `bg-platforms-${uid}`, glowColor: '#6366F1' };
    case 'settings':
    default:
      return { gradientId: `bg-settings-${uid}`, glowColor: '#64748B' };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// High-Definition, Executive Vector Glyphs
// ─────────────────────────────────────────────────────────────────────────────
function renderSectionGlyph(section: string): React.ReactNode {
  switch (section) {
    // ═════════════════════════════════════════════════════════════════════════
    // 1. DASHBOARD: Executive Bento Grid with Live Sparkline
    // ═════════════════════════════════════════════════════════════════════════
    case 'overview':
    case 'landing':
      return (
        <g>
          {/* Top-Left Metric Card with Sparkline */}
          <rect x="22" y="22" width="24" height="24" rx="6" fill="#FFFFFF" />
          <path
            d="M 27 34 L 32 30 L 37 35 L 42 27"
            stroke="#2563EB"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Top-Right KPI Card with 3 Columns */}
          <rect x="52" y="22" width="26" height="24" rx="6" fill="rgba(255,255,255,0.2)" stroke="#FFFFFF" strokeWidth="2" />
          <rect x="58" y="32" width="3" height="9" rx="1.5" fill="#FFFFFF" />
          <rect x="64" y="28" width="3" height="13" rx="1.5" fill="#FFFFFF" />
          <rect x="70" y="26" width="3" height="15" rx="1.5" fill="#FDE047" />

          {/* Bottom Card with Progress Track */}
          <rect x="22" y="52" width="56" height="26" rx="6" fill="#FFFFFF" />
          <rect x="28" y="62" width="44" height="6" rx="3" fill="#DBEAFE" />
          <rect x="28" y="62" width="28" height="6" rx="3" fill="#2563EB" />
          <circle cx="63" cy="65" r="4.5" fill="#10B981" />
          <path
            d="M 61 65 L 62.5 66.5 L 65.5 63.5"
            stroke="#FFFFFF"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      );

    // ═════════════════════════════════════════════════════════════════════════
    // 2. SYLLABUS EXPLORER: Master Book + Golden 4-Point Compass Star
    // ═════════════════════════════════════════════════════════════════════════
    case 'syllabus':
    case 'subjects':
      return (
        <g>
          {/* Open Book Left Page */}
          <path d="M 22 72 C 32 68, 44 69, 48 74 L 48 40 C 44 36, 32 35, 22 38 Z" fill="#FFFFFF" />
          {/* Open Book Right Page */}
          <path d="M 78 72 C 68 68, 56 69, 52 74 L 52 40 C 56 36, 68 35, 78 38 Z" fill="#FFFFFF" />
          {/* Spine Depth */}
          <rect x="48" y="39" width="4" height="34" rx="2" fill="#5B21B6" opacity="0.35" />

          {/* Left Page Text Lines */}
          <line x1="28" y1="46" x2="42" y2="46" stroke="#DDD6FE" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="28" y1="53" x2="40" y2="53" stroke="#DDD6FE" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="28" y1="60" x2="42" y2="60" stroke="#DDD6FE" strokeWidth="2.5" strokeLinecap="round" />

          {/* Right Page Text Lines */}
          <line x1="58" y1="46" x2="72" y2="46" stroke="#DDD6FE" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="58" y1="53" x2="70" y2="53" stroke="#DDD6FE" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="58" y1="60" x2="68" y2="60" stroke="#DDD6FE" strokeWidth="2.5" strokeLinecap="round" />

          {/* Floating Golden Compass Star */}
          <path d="M 50 16 L 53 25 L 62 28 L 53 31 L 50 40 L 47 31 L 38 28 L 47 25 Z" fill="#FBBF24" />
          <circle cx="50" cy="28" r="2.2" fill="#FFFFFF" />
        </g>
      );

    // ═════════════════════════════════════════════════════════════════════════
    // 3. STUDY PLANNER: Calendar with Emerald Checkmark Completion
    // ═════════════════════════════════════════════════════════════════════════
    case 'planner':
      return (
        <g>
          {/* Calendar Body */}
          <rect x="22" y="24" width="56" height="56" rx="10" fill="#FFFFFF" />
          {/* Header Strip */}
          <path
            d="M 22 34 C 22 28.5 26.5 24 32 24 L 68 24 C 73.5 24 78 28.5 78 34 L 78 38 L 22 38 Z"
            fill="#0284C7"
          />
          {/* Metallic Top Binder Rings */}
          <rect x="33" y="18" width="5" height="11" rx="2.5" fill="#E2E8F0" stroke="#0369A1" strokeWidth="1.2" />
          <rect x="62" y="18" width="5" height="11" rx="2.5" fill="#E2E8F0" stroke="#0369A1" strokeWidth="1.2" />

          {/* Date Dots */}
          <circle cx="33" cy="48" r="3.5" fill="#E0F2FE" />
          <circle cx="45" cy="48" r="3.5" fill="#E0F2FE" />
          <circle cx="57" cy="48" r="3.5" fill="#E0F2FE" />
          <circle cx="69" cy="48" r="3.5" fill="#E0F2FE" />
          <circle cx="33" cy="62" r="3.5" fill="#E0F2FE" />
          <circle cx="45" cy="62" r="3.5" fill="#E0F2FE" />

          {/* Active Completed Day with Checkmark */}
          <circle cx="57" cy="62" r="9" fill="#10B981" />
          <path
            d="M 53 62 L 56 65 L 61 59"
            stroke="#FFFFFF"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      );

    // ═════════════════════════════════════════════════════════════════════════
    // 4. TARGET PACING: Precision Velocity Tachometer & Arrow
    // ═════════════════════════════════════════════════════════════════════════
    case 'pacing':
      return (
        <g>
          {/* Gauge Background Track */}
          <path
            d="M 24 70 A 32 32 0 1 1 76 70"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          {/* Active Target Zone Arc */}
          <path
            d="M 24 70 A 32 32 0 0 1 66 26"
            stroke="#FDE047"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          {/* Central Hub */}
          <circle cx="50" cy="56" r="7" fill="#FFFFFF" />
          <circle cx="50" cy="56" r="3.5" fill="#059669" />
          {/* Velocity Needle pointing to Peak Zone */}
          <line x1="50" y1="56" x2="68" y2="35" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
          {/* Spark Arrow */}
          <polygon points="72,62 76,54 72,54 75,46 68,55 72,55" fill="#FDE047" />
        </g>
      );

    // ═════════════════════════════════════════════════════════════════════════
    // 5. AI YOUTUBE NOTES: Video Player Screen + Golden AI Sparkles
    // ═════════════════════════════════════════════════════════════════════════
    case 'youtube-notes':
      return (
        <g>
          {/* Video Player Card */}
          <rect x="20" y="27" width="60" height="44" rx="12" fill="#FFFFFF" />
          <rect x="23" y="30" width="54" height="38" rx="9" fill="#FFF1F2" />
          {/* Pure Play Triangle */}
          <polygon points="44,38 44,60 62,49" fill="#E11D48" />

          {/* AI Sparkle Star (Top Right) */}
          <path
            d="M 72 15 L 74 21 L 80 23 L 74 25 L 72 31 L 70 25 L 64 23 L 70 21 Z"
            fill="#FBBF24"
          />
          <circle cx="80" cy="33" r="2" fill="#FDE047" />
        </g>
      );

    // ═════════════════════════════════════════════════════════════════════════
    // 6. DIGITAL NOTES: Spiral Study Notebook + Golden Writing Pen
    // ═════════════════════════════════════════════════════════════════════════
    case 'digital-notes':
      return (
        <g>
          {/* Notebook Base Card */}
          <rect x="26" y="20" width="48" height="60" rx="8" fill="#FFFFFF" />

          {/* Spiral Binder Rings */}
          <line x1="22" y1="28" x2="28" y2="28" stroke="#0F766E" strokeWidth="3" strokeLinecap="round" />
          <line x1="22" y1="38" x2="28" y2="38" stroke="#0F766E" strokeWidth="3" strokeLinecap="round" />
          <line x1="22" y1="48" x2="28" y2="48" stroke="#0F766E" strokeWidth="3" strokeLinecap="round" />
          <line x1="22" y1="58" x2="28" y2="58" stroke="#0F766E" strokeWidth="3" strokeLinecap="round" />
          <line x1="22" y1="68" x2="28" y2="68" stroke="#0F766E" strokeWidth="3" strokeLinecap="round" />

          {/* Notebook Red Margin Line */}
          <line x1="34" y1="24" x2="34" y2="76" stroke="#FB7185" strokeWidth="1.2" opacity="0.75" />

          {/* Study Note Lines */}
          <line x1="38" y1="32" x2="66" y2="32" stroke="#CCFBF1" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="38" y1="41" x2="64" y2="41" stroke="#CCFBF1" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="38" y1="50" x2="66" y2="50" stroke="#CCFBF1" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="38" y1="59" x2="58" y2="59" stroke="#CCFBF1" strokeWidth="2.5" strokeLinecap="round" />

          {/* Golden Writing Pen at Bottom Right */}
          <g transform="rotate(-35 66 64)">
            <rect x="64" y="44" width="4.5" height="22" rx="2" fill="#F59E0B" />
            <polygon points="64,66 68.5,66 66.25,72" fill="#1E293B" />
            <rect x="64" y="44" width="4.5" height="5" rx="1" fill="#D97706" />
          </g>
        </g>
      );

    // ═════════════════════════════════════════════════════════════════════════
    // 7. MOCK TEST TRACKER: Winner's Trophy with Achievement Star
    // ═════════════════════════════════════════════════════════════════════════
    case 'mock-tracker':
      return (
        <g>
          {/* Trophy Cup */}
          <path
            d="M 32 25 L 68 25 C 68 45, 57 54, 50 55 C 43 54, 32 45, 32 25 Z"
            fill="#FFFFFF"
          />
          {/* Dual Trophy Handles */}
          <path
            d="M 32 30 C 22 30, 22 46, 35 47"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 68 30 C 78 30, 78 46, 65 47"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Stem & Base */}
          <rect x="46.5" y="55" width="7" height="10" fill="#FFFFFF" />
          <path d="M 36 67 L 64 67 L 68 76 L 32 76 Z" fill="#FFFFFF" />

          {/* Golden 3D Star on Trophy Cup */}
          <path
            d="M 50 32 L 52 38 L 58 39 L 53.5 43.5 L 55 49 L 50 46 L 45 49 L 46.5 43.5 L 42 39 L 48 38 Z"
            fill="#D97706"
          />
        </g>
      );

    // ═════════════════════════════════════════════════════════════════════════
    // 8. SPACED REVISION: Dual Continuous Memory Orbit & Clock
    // ═════════════════════════════════════════════════════════════════════════
    case 'revision':
      return (
        <g>
          {/* Clockwise Orbit Top Arc */}
          <path
            d="M 28 46 A 25 25 0 0 1 73 37"
            stroke="#FFFFFF"
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
          />
          <polygon points="73,28 82,39 70,39" fill="#FFFFFF" />

          {/* Clockwise Orbit Bottom Arc */}
          <path
            d="M 72 54 A 25 25 0 0 1 27 63"
            stroke="#FFFFFF"
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
          />
          <polygon points="27,72 18,61 30,61" fill="#FFFFFF" />

          {/* Center Memory Recall Clock */}
          <circle cx="50" cy="50" r="10" fill="#FFFFFF" />
          <circle cx="50" cy="50" r="7.5" fill="#EA580C" />
          <polyline points="50,45 50,50 54,50" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>
      );

    // ═════════════════════════════════════════════════════════════════════════
    // 9. WEAK TOPICS: Diagnostic Hazard Shield with Electric Attention
    // ═════════════════════════════════════════════════════════════════════════
    case 'weak':
      return (
        <g>
          {/* Outer Protective Shield */}
          <path
            d="M 50 18 C 68 18, 76 24, 76 36 C 76 60, 60 76, 50 82 C 40 76, 24 60, 24 36 C 24 24, 32 18, 50 18 Z"
            fill="#FFFFFF"
          />
          {/* Inner Red Alert Shield */}
          <path
            d="M 50 24 C 64 24, 70 29, 70 38 C 70 56, 57 69, 50 74 C 43 69, 30 56, 30 38 C 30 29, 36 24, 50 24 Z"
            fill="#E11D48"
          />
          {/* Electric Lightning Focus Bolt */}
          <polygon points="53,30 43,46 50,46 47,62 59,44 51,44" fill="#FDE047" />
        </g>
      );

    // ═════════════════════════════════════════════════════════════════════════
    // 10. CONCEPT MIND MAP: Synaptic Neural Network Constellation
    // ═════════════════════════════════════════════════════════════════════════
    case 'mindmap':
      return (
        <g>
          {/* Synaptic Beams */}
          <line x1="50" y1="50" x2="30" y2="30" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          <line x1="50" y1="50" x2="70" y2="30" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          <line x1="50" y1="50" x2="28" y2="70" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          <line x1="50" y1="50" x2="72" y2="70" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />

          {/* Master Hub Node */}
          <circle cx="50" cy="50" r="12" fill="#FFFFFF" />
          <circle cx="50" cy="50" r="8" fill="#7E22CE" />
          <circle cx="50" cy="50" r="3.5" fill="#FDE047" />

          {/* Satellite Topic Nodes */}
          <circle cx="30" cy="30" r="7.5" fill="#FFFFFF" />
          <circle cx="30" cy="30" r="5" fill="#38BDF8" />

          <circle cx="70" cy="30" r="7.5" fill="#FFFFFF" />
          <circle cx="70" cy="30" r="5" fill="#F472B6" />

          <circle cx="28" cy="70" r="7" fill="#FFFFFF" />
          <circle cx="28" cy="70" r="4.5" fill="#34D399" />

          <circle cx="72" cy="70" r="7" fill="#FFFFFF" />
          <circle cx="72" cy="70" r="4.5" fill="#FBBF24" />
        </g>
      );

    // ═════════════════════════════════════════════════════════════════════════
    // 11. ANALYTICS & HEATMAP: Ascending 3D Bars & Upward Trend Arrow
    // ═════════════════════════════════════════════════════════════════════════
    case 'analytics':
    case 'heatmap':
      return (
        <g>
          {/* Ascending Metric Bars */}
          <rect x="25" y="56" width="10" height="22" rx="3.5" fill="#FFFFFF" opacity="0.85" />
          <rect x="41" y="44" width="10" height="34" rx="3.5" fill="#FFFFFF" opacity="0.9" />
          <rect x="57" y="30" width="10" height="48" rx="3.5" fill="#FFFFFF" />

          {/* Upward Breakthrough Trendline */}
          <path
            d="M 23 52 Q 40 38, 56 34 T 78 18"
            stroke="#FDE047"
            strokeWidth="3.8"
            strokeLinecap="round"
            fill="none"
          />
          <polygon points="76,14 83,21 71,22" fill="#FDE047" />
        </g>
      );

    // ═════════════════════════════════════════════════════════════════════════
    // 12. STUDY STATION & HUB: Layered Platforms & Orbital Ring
    // ═════════════════════════════════════════════════════════════════════════
    case 'platforms':
      return (
        <g>
          {/* Isometric Floating Platforms */}
          <polygon points="50,66 76,53 50,40 24,53" fill="#FFFFFF" opacity="0.35" />
          <polygon points="50,56 76,43 50,30 24,43" fill="#FFFFFF" opacity="0.7" />
          <polygon points="50,46 76,33 50,20 24,33" fill="#FFFFFF" />

          {/* Central Station Core with Orbital Ring */}
          <circle cx="50" cy="33" r="8" fill="#4F46E5" />
          <circle cx="50" cy="33" r="4" fill="#22D3EE" />
          <ellipse
            cx="50"
            cy="33"
            rx="14"
            ry="4.5"
            stroke="#FDE047"
            strokeWidth="1.8"
            fill="none"
            transform="rotate(-15 50 33)"
          />
        </g>
      );

    // ═════════════════════════════════════════════════════════════════════════
    // 13. SETTINGS: Precision Engineered Toggle Sliders & Tuning Knobs
    // ═════════════════════════════════════════════════════════════════════════
    case 'settings':
    default:
      return (
        <g>
          {/* Upper Slider Track */}
          <rect x="22" y="32" width="56" height="6" rx="3" fill="#FFFFFF" opacity="0.3" />
          <rect x="22" y="32" width="34" height="6" rx="3" fill="#FFFFFF" />
          <circle cx="56" cy="35" r="7.5" fill="#FFFFFF" />
          <circle cx="56" cy="35" r="3.5" fill="#0284C7" />

          {/* Lower Slider Track */}
          <rect x="22" y="58" width="56" height="6" rx="3" fill="#FFFFFF" opacity="0.3" />
          <rect x="22" y="58" width="22" height="6" rx="3" fill="#FFFFFF" />
          <circle cx="44" cy="61" r="7.5" fill="#FFFFFF" />
          <circle cx="44" cy="61" r="3.5" fill="#38BDF8" />
        </g>
      );
  }
}
