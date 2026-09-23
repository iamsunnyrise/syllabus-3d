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

  return (
    <div
      style={{ width: pixelSize, height: pixelSize }}
      className={`relative inline-flex items-center justify-center shrink-0 transition-transform duration-200 select-none ${
        isActive ? 'scale-105' : 'hover:scale-105'
      } ${className}`}
    >
      {/* Optional Active Accent Glow behind badge */}
      {(isActive || showGlow) && (
        <div
          style={{ width: pixelSize * 0.9, height: pixelSize * 0.9 }}
          className="absolute inset-0 m-auto rounded-full bg-blue-500/35 blur-md -z-10 animate-pulse pointer-events-none"
        />
      )}

      <svg
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        <defs>
          {/* Badge Drop Shadow */}
          <filter id={`shadow-${uid}`} x="-20%" y="-15%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3.5" stdDeviation="3.5" floodColor="#1e3a8a" floodOpacity="0.28" />
          </filter>

          {/* Badge Gradient 1: Classic Deep Royal Blue */}
          <linearGradient id={`bg-blue-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="60%" stopColor="#1D4ED8" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>

          {/* Badge Gradient 2: Electric Indigo / Purple */}
          <linearGradient id={`bg-indigo-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#4F46E5" />
            <stop offset="100%" stopColor="#312E81" />
          </linearGradient>

          {/* Badge Gradient 3: Cyan Sapphire */}
          <linearGradient id={`bg-cyan-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="70%" stopColor="#1E40AF" />
            <stop offset="100%" stopColor="#172554" />
          </linearGradient>

          {/* Badge Clip Path (Diamond Squircle) */}
          <clipPath id={`badge-clip-${uid}`}>
            <rect x="23.5" y="23.5" width="53" height="53" rx="16" ry="16" transform="rotate(45 50 50)" />
          </clipPath>
        </defs>

        {/* 1. Base Diamond Squircle Badge with Thick White Rim */}
        <rect
          x="22"
          y="22"
          width="56"
          height="56"
          rx="17"
          ry="17"
          transform="rotate(45 50 50)"
          fill={`url(#${
            ['analytics', 'heatmap', 'youtube-notes'].includes(section)
              ? `bg-indigo-${uid}`
              : ['pacing', 'platforms'].includes(section)
              ? `bg-cyan-${uid}`
              : `bg-blue-${uid}`
          })`}
          stroke="#FFFFFF"
          strokeWidth="4.5"
          filter={`url(#shadow-${uid})`}
        />

        {/* 2. Inner Illustration clipped strictly inside the squircle badge */}
        <g clipPath={`url(#badge-clip-${uid})`}>
          {renderSectionIllustration(section, uid)}
        </g>
      </svg>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Vector Illustrations for each section matching media_1790167224345.jpg style
// ─────────────────────────────────────────────────────────────────────────────
function renderSectionIllustration(section: string, uid: string): React.ReactNode {
  switch (section) {
    // ═════════════════════════════════════════════════════════════════════════
    // 1. DASHBOARD / OVERVIEW: 3D Blue Clipboard with Checklist & Red Tick
    // ═════════════════════════════════════════════════════════════════════════
    case 'overview':
    case 'landing':
      return (
        <g>
          {/* Clipboard Board Body */}
          <rect x="31" y="21" width="38" height="56" rx="6" fill="#172554" opacity="0.9" />
          <rect x="33" y="23" width="34" height="52" rx="5" fill="#1E3A8A" />

          {/* Top Clip Bracket */}
          <rect x="41" y="17" width="18" height="8" rx="3.5" fill="#60A5FA" />
          <rect x="43" y="19" width="14" height="4" rx="2" fill="#93C5FD" />

          {/* White Paper Sheet */}
          <rect x="36" y="27" width="28" height="44" rx="3.5" fill="#FFFFFF" />

          {/* Paper Checklist Lines */}
          <rect x="40" y="33" width="4.5" height="4.5" rx="1.2" stroke="#93C5FD" strokeWidth="1.2" fill="none" />
          <line x1="48" y1="35.5" x2="59" y2="35.5" stroke="#CBD5E1" strokeWidth="2.2" strokeLinecap="round" />

          <rect x="40" y="42" width="4.5" height="4.5" rx="1.2" stroke="#93C5FD" strokeWidth="1.2" fill="none" />
          <line x1="48" y1="44.5" x2="57" y2="44.5" stroke="#CBD5E1" strokeWidth="2.2" strokeLinecap="round" />

          <line x1="48" y1="53.5" x2="59" y2="53.5" stroke="#E2E8F0" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="40" y1="61.5" x2="55" y2="61.5" stroke="#E2E8F0" strokeWidth="2.2" strokeLinecap="round" />

          {/* Big Vibrant Red Checkmark Circle */}
          <circle cx="56" cy="54" r="8" fill="#EF4444" />
          <path
            d="M52.5 54 L55 56.5 L60 51.5"
            stroke="#FFFFFF"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      );

    // ═════════════════════════════════════════════════════════════════════════
    // 2. ANALYTICS & HEATMAP: Glowing DNA Helix / Wave with Neon Vertical Bars
    // ═════════════════════════════════════════════════════════════════════════
    case 'analytics':
    case 'heatmap':
      return (
        <g>
          {/* Luminous DNA / Wave Ribbon 1 (Cyan) */}
          <path
            d="M 15 42 Q 32 20, 50 48 T 85 36"
            stroke="#22D3EE"
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
            opacity="0.95"
          />
          {/* Luminous Wave Ribbon 2 (Violet / Magenta) */}
          <path
            d="M 15 62 Q 32 78, 50 52 T 85 64"
            stroke="#C084FC"
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
            opacity="0.95"
          />

          {/* Helical Neon Rungs */}
          <line x1="28" y1="36" x2="28" y2="68" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          <line x1="39" y1="32" x2="39" y2="66" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
          <line x1="50" y1="48" x2="50" y2="52" stroke="#E879F9" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="61" y1="38" x2="61" y2="64" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
          <line x1="72" y1="36" x2="72" y2="66" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" opacity="0.8" />

          {/* Neon Mini Data Bars on Right */}
          <rect x="62" y="62" width="2.8" height="12" rx="1.4" fill="#06B6D4" />
          <rect x="68" y="55" width="2.8" height="19" rx="1.4" fill="#22D3EE" />
          <rect x="74" y="48" width="2.8" height="26" rx="1.4" fill="#38BDF8" />
          <rect x="80" y="42" width="2.8" height="32" rx="1.4" fill="#818CF8" />

          {/* Top Left Signal Pulses */}
          <line x1="22" y1="28" x2="30" y2="28" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
          <line x1="22" y1="33" x2="27" y2="33" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        </g>
      );

    // ═════════════════════════════════════════════════════════════════════════
    // 3. STUDY STATION & PLATFORMS: 3D Isometric Box with Floating Magenta Cube
    // ═════════════════════════════════════════════════════════════════════════
    case 'platforms':
      return (
        <g>
          {/* Base Shadow */}
          <ellipse cx="50" cy="78" rx="22" ry="7" fill="#0F172A" opacity="0.45" />

          {/* Outer Box Body */}
          {/* Left Exterior Face */}
          <polygon points="26,52 50,65 50,83 26,70" fill="#312E81" />
          {/* Right Exterior Face */}
          <polygon points="50,65 74,52 74,70 50,83" fill="#4338CA" />

          {/* Folded Flaps */}
          {/* Left Flap */}
          <polygon points="26,52 14,44 38,36 50,44" fill="#3730A3" />
          {/* Right Flap */}
          <polygon points="50,44 62,36 86,44 74,52" fill="#4F46E5" />
          {/* Front Corner Bevel */}
          <polygon points="26,52 50,65 50,68 26,55" fill="#1E1B4B" opacity="0.3" />

          {/* Interior Box Depth */}
          <polygon points="26,52 50,40 74,52 50,65" fill="#1E1B4B" />

          {/* Cyan Platform Tier Inside */}
          <polygon points="36,46 50,53 50,65 36,58" fill="#0284C7" />
          <polygon points="50,53 64,46 64,58 50,65" fill="#0369A1" />
          <polygon points="50,39 64,46 50,53 36,46" fill="#38BDF8" />

          {/* Floating Magenta Cube on Top */}
          {/* Top Face */}
          <polygon points="50,22 61,28 50,34 39,28" fill="#F472B6" />
          {/* Left Face */}
          <polygon points="39,28 50,34 50,46 39,40" fill="#E11D48" />
          {/* Right Face */}
          <polygon points="50,34 61,28 61,40 50,46" fill="#BE123C" />

          {/* Magenta Core Glow highlight */}
          <circle cx="50" cy="30" r="3.5" fill="#FFFFFF" opacity="0.5" />
        </g>
      );

    // ═════════════════════════════════════════════════════════════════════════
    // 4. SYLLABUS EXPLORER: 3D Origami Folded Route Map with Pinpoint Marker
    // ═════════════════════════════════════════════════════════════════════════
    case 'syllabus':
    case 'subjects':
      return (
        <g>
          {/* Ground Shadow */}
          <ellipse cx="50" cy="80" rx="26" ry="6" fill="#0F172A" opacity="0.4" />

          {/* 3D Folded Map Panels */}
          {/* Fold 1 (Leftmost Green Terrain) */}
          <polygon points="17,66 38,50 38,76 17,88" fill="#10B981" />
          {/* Fold 2 (Center-Left Green Terrain) */}
          <polygon points="38,50 54,62 54,88 38,76" fill="#059669" />
          {/* Fold 3 (Center-Right Cyan Water Area) */}
          <polygon points="54,62 70,50 70,76 54,88" fill="#0284C7" />
          {/* Fold 4 (Rightmost Bright Cyan) */}
          <polygon points="70,50 83,63 83,86 70,76" fill="#38BDF8" />

          {/* Curving Golden Route / Road */}
          <path
            d="M 17 80 Q 38 60, 54 75 T 83 72"
            stroke="#FDE047"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 17 80 Q 38 60, 54 75 T 83 72"
            stroke="#EAB308"
            strokeWidth="1.2"
            strokeDasharray="2 3"
            strokeLinecap="round"
            fill="none"
          />

          {/* Red 3D Location Pin Marker */}
          <path
            d="M 54 36 C 48 36 44 41 44 46 C 44 54 54 66 54 66 C 54 66 64 54 64 46 C 64 41 60 36 54 36 Z"
            fill="#EF4444"
          />
          {/* Inner White Core Pin Dot */}
          <circle cx="54" cy="45" r="3.5" fill="#FFFFFF" />
          <circle cx="54" cy="45" r="1.5" fill="#DC2626" />
        </g>
      );

    // ═════════════════════════════════════════════════════════════════════════
    // 5. TARGET PACING: Mountain Summit Peak with Radiant Apex Beacon Star
    // ═════════════════════════════════════════════════════════════════════════
    case 'pacing':
      return (
        <g>
          {/* Distant Mountain Ridges (Purple / Indigo) */}
          <polygon points="16,84 34,54 52,84" fill="#6366F1" opacity="0.85" />
          <polygon points="46,84 66,50 84,84" fill="#4F46E5" opacity="0.85" />

          {/* Main Central Summit Peak */}
          {/* Left Lit Face (Cyan / Teal) */}
          <polygon points="50,38 28,84 50,84" fill="#22D3EE" />
          {/* Right Shaded Face (Deep Cyan) */}
          <polygon points="50,38 50,84 72,84" fill="#0891B2" />

          {/* Snow / Glacier Facets on Summit */}
          <polygon points="50,38 43,54 48,50 50,56 54,49 57,54" fill="#E0F2FE" />
          <polygon points="50,38 50,56 57,54" fill="#BAE6FD" />

          {/* Radiant Apex Beacon Star at Summit */}
          {/* Glow Halo */}
          <circle cx="50" cy="27" r="7" fill="#67E8F9" opacity="0.4" />
          {/* 4-Point Radiant Beacon Star */}
          <path
            d="M 50 19 L 52.5 25 L 58 27 L 52.5 29 L 50 35 L 47.5 29 L 42 27 L 47.5 25 Z"
            fill="#FFFFFF"
          />
          <circle cx="50" cy="27" r="2.5" fill="#A5F3FC" />

          {/* Star Ray Pulses */}
          <line x1="50" y1="16" x2="50" y2="18" stroke="#A5F3FC" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="60" y1="27" x2="62" y2="27" stroke="#A5F3FC" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="38" y1="27" x2="40" y2="27" stroke="#A5F3FC" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      );

    // ═════════════════════════════════════════════════════════════════════════
    // 6. MOCK TRACKER: Concentric Neon Radar Scanner Screen with Blip Targets
    // ═════════════════════════════════════════════════════════════════════════
    case 'mock-tracker':
      return (
        <g>
          {/* Dark Emerald Radar Base Screen */}
          <circle cx="50" cy="62" r="28" fill="#064E3B" />
          <circle cx="50" cy="62" r="27" fill="#059669" />

          {/* Concentric Calibration Rings */}
          <circle cx="50" cy="62" r="25" fill="none" stroke="#6EE7B7" strokeWidth="1.8" opacity="0.75" />
          <circle cx="50" cy="62" r="16" fill="none" stroke="#6EE7B7" strokeWidth="1.5" opacity="0.8" />
          <circle cx="50" cy="62" r="7" fill="none" stroke="#6EE7B7" strokeWidth="1.2" opacity="0.9" />

          {/* Radar Screen Crosshairs */}
          <line x1="22" y1="62" x2="78" y2="62" stroke="#6EE7B7" strokeWidth="1.2" opacity="0.5" />
          <line x1="50" y1="34" x2="50" y2="90" stroke="#6EE7B7" strokeWidth="1.2" opacity="0.5" />

          {/* 45-Degree Radar Sweep Beam */}
          <line x1="50" y1="62" x2="73" y2="39" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />

          {/* Radar Blip Targets (Questions / Tests detected) */}
          <circle cx="65" cy="49" r="3" fill="#FFFFFF" />
          <circle cx="65" cy="49" r="5.5" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />

          <circle cx="41" cy="72" r="2.4" fill="#A7F3D0" />
          <circle cx="37" cy="54" r="1.8" fill="#A7F3D0" opacity="0.8" />
        </g>
      );

    // ═════════════════════════════════════════════════════════════════════════
    // 7. STUDY PLANNER: 3D Calendar Pad with Golden Rings & Checkmarks
    // ═════════════════════════════════════════════════════════════════════════
    case 'planner':
      return (
        <g>
          {/* 3D Calendar Pad */}
          <rect x="29" y="24" width="42" height="52" rx="7" fill="#1E293B" />
          <rect x="31" y="26" width="38" height="48" rx="6" fill="#FFFFFF" />

          {/* Header Banner (Royal Amber/Orange) */}
          <path d="M 31 32 C 31 28.7 33.7 26 37 26 L 63 26 C 66.3 26 69 28.7 69 32 L 69 37 L 31 37 Z" fill="#F59E0B" />

          {/* 2 Top Binder Rings */}
          <rect x="38" y="21" width="4" height="9" rx="2" fill="#CBD5E1" />
          <rect x="58" y="21" width="4" height="9" rx="2" fill="#CBD5E1" />

          {/* Calendar Grid of Tasks */}
          <circle cx="40" cy="46" r="3.5" fill="#10B981" />
          <path d="M38.5 46 L40 47.5 L42 44.5" stroke="#FFFFFF" strokeWidth="1.2" fill="none" />

          <circle cx="50" cy="46" r="3.5" fill="#10B981" />
          <path d="M48.5 46 L50 47.5 L52 44.5" stroke="#FFFFFF" strokeWidth="1.2" fill="none" />

          <circle cx="60" cy="46" r="3.5" fill="#3B82F6" />

          <circle cx="40" cy="58" r="3.5" fill="#10B981" />
          <path d="M38.5 58 L40 59.5 L42 56.5" stroke="#FFFFFF" strokeWidth="1.2" fill="none" />

          <circle cx="50" cy="58" r="3.5" fill="#F59E0B" />
          <circle cx="60" cy="58" r="3.5" fill="#E2E8F0" />
        </g>
      );

    // ═════════════════════════════════════════════════════════════════════════
    // 8. AI YOUTUBE NOTES: 3D Video Play Prism with AI Spark Constellation
    // ═════════════════════════════════════════════════════════════════════════
    case 'youtube-notes':
      return (
        <g>
          {/* Shadow */}
          <ellipse cx="50" cy="76" rx="22" ry="6" fill="#0F172A" opacity="0.4" />

          {/* 3D Ruby-Red / Coral Video Screen */}
          <rect x="25" y="28" width="50" height="38" rx="10" fill="#DC2626" />
          <rect x="27" y="30" width="46" height="34" rx="8" fill="#EF4444" />

          {/* Bevel Highlight */}
          <path d="M 27 38 C 27 33.6 30.6 30 35 30 L 65 30 C 69.4 30 73 33.6 73 38 L 27 38 Z" fill="#F87171" opacity="0.5" />

          {/* White Play Button */}
          <polygon points="45,38 45,56 60,47" fill="#FFFFFF" />

          {/* AI Sparkle Stars */}
          <path d="M 68 22 L 69.5 26 L 73.5 27.5 L 69.5 29 L 68 33 L 66.5 29 L 62.5 27.5 L 66.5 26 Z" fill="#FDE047" />
          <circle cx="30" cy="24" r="2" fill="#38BDF8" />
          <circle cx="73" cy="62" r="2.5" fill="#C084FC" />
        </g>
      );

    // ═════════════════════════════════════════════════════════════════════════
    // 9. SPACED REVISION: Dual Orbit SM-2 Recall Loops with Amber & Mint
    // ═════════════════════════════════════════════════════════════════════════
    case 'revision':
      return (
        <g>
          {/* Dual Orbital Arrows (Clockwise Loop) */}
          <path
            d="M 50 25 A 25 25 0 0 1 75 50"
            stroke="#10B981"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <polygon points="75,44 80,52 70,52" fill="#10B981" />

          <path
            d="M 50 75 A 25 25 0 0 1 25 50"
            stroke="#F59E0B"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <polygon points="25,56 20,48 30,48" fill="#F59E0B" />

          {/* Center Memory Crystal Core */}
          <circle cx="50" cy="50" r="10" fill="#1E293B" />
          <circle cx="50" cy="50" r="8" fill="#3B82F6" />
          <path d="M 50 44 L 50 50 L 54 54" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>
      );

    // ═════════════════════════════════════════════════════════════════════════
    // 10. WEAK TOPICS: Diagnostic Hazard Shield with Focus Crosshair
    // ═════════════════════════════════════════════════════════════════════════
    case 'weak':
      return (
        <g>
          {/* Warning Diamond / Shield */}
          <polygon points="50,22 76,50 50,78 24,50" fill="#F43F5E" />
          <polygon points="50,26 72,50 50,74 28,50" fill="#E11D48" />

          {/* Focused Warning Triangle */}
          <polygon points="50,34 62,58 38,58" fill="#FBBF24" />
          <polygon points="50,38 59,56 41,56" fill="#F59E0B" />

          {/* Exclamation Mark */}
          <line x1="50" y1="42" x2="50" y2="49" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="50" cy="53" r="1.5" fill="#111827" />

          {/* Precision Crosshair Ticks */}
          <line x1="16" y1="50" x2="22" y2="50" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <line x1="78" y1="50" x2="84" y2="50" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <line x1="50" y1="14" x2="50" y2="20" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <line x1="50" y1="80" x2="50" y2="86" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </g>
      );

    // ═════════════════════════════════════════════════════════════════════════
    // 11. CONCEPT MIND MAP: Glowing Neural Synapse Constellation
    // ═════════════════════════════════════════════════════════════════════════
    case 'mindmap':
      return (
        <g>
          {/* Synaptic Neural Bridges */}
          <line x1="50" y1="50" x2="30" y2="34" stroke="#818CF8" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="50" y1="50" x2="70" y2="34" stroke="#818CF8" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="50" y1="50" x2="26" y2="64" stroke="#818CF8" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="50" y1="50" x2="74" y2="64" stroke="#818CF8" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="50" y1="50" x2="50" y2="76" stroke="#818CF8" strokeWidth="2.2" strokeLinecap="round" />

          {/* Satellite Nodes */}
          <circle cx="30" cy="34" r="5.5" fill="#22D3EE" />
          <circle cx="30" cy="34" r="3" fill="#FFFFFF" />

          <circle cx="70" cy="34" r="5.5" fill="#F472B6" />
          <circle cx="70" cy="34" r="3" fill="#FFFFFF" />

          <circle cx="26" cy="64" r="5" fill="#A78BFA" />
          <circle cx="74" cy="64" r="5" fill="#34D399" />
          <circle cx="50" cy="76" r="4.5" fill="#FBBF24" />

          {/* Central Master Mind Core */}
          <circle cx="50" cy="50" r="10" fill="#312E81" />
          <circle cx="50" cy="50" r="8" fill="#6366F1" />
          <circle cx="50" cy="50" r="4" fill="#FFFFFF" />
        </g>
      );

    // ═════════════════════════════════════════════════════════════════════════
    // 12. APP SETTINGS: Dual-Tone Precision Engineered Cogwheel with Core
    // ═════════════════════════════════════════════════════════════════════════
    case 'settings':
    default:
      return (
        <g>
          {/* 8-Tooth Precision Gear Wheel */}
          <g transform="rotate(22.5 50 50)">
            <circle cx="50" cy="50" r="22" fill="#334155" />
            {/* Teeth */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
              <rect
                key={idx}
                x="46"
                y="22"
                width="8"
                height="8"
                rx="2"
                fill="#475569"
                transform={`rotate(${angle} 50 50)`}
              />
            ))}
          </g>

          {/* Inner Metallic Bevel */}
          <circle cx="50" cy="50" r="16" fill="#64748B" />
          <circle cx="50" cy="50" r="14" fill="#1E293B" />

          {/* Glowing Cyan Core */}
          <circle cx="50" cy="50" r="7" fill="#06B6D4" />
          <circle cx="50" cy="50" r="3.5" fill="#FFFFFF" />
        </g>
      );
  }
}
