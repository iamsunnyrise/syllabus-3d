import React from 'react';

interface BrandEmblemLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
}

export const BrandEmblemLogo: React.FC<BrandEmblemLogoProps> = ({
  size = 'md',
  className = '',
  showText = false
}) => {
  const sizeMap = {
    sm: { dimension: 32, ring: 2 },
    md: { dimension: 42, ring: 2.5 },
    lg: { dimension: 72, ring: 3.5 },
    xl: { dimension: 108, ring: 4 }
  };

  const { dimension } = sizeMap[size] || sizeMap.md;

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* 🌟 Circular Golden Knowledge Seal */}
      <div
        className="relative shrink-0 flex items-center justify-center rounded-full shadow-md"
        style={{ width: dimension, height: dimension }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-[0_2px_8px_rgba(234,179,8,0.4)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Outer Golden Gradient Ring */}
            <linearGradient id="punditsGoldRing" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2A3" />
              <stop offset="30%" stopColor="#F59E0B" />
              <stop offset="70%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#845305" />
            </linearGradient>

            {/* Inner Vibrant Gold Canvas */}
            <radialGradient id="punditsGoldBg" cx="50%" cy="45%" r="50%">
              <stop offset="0%" stopColor="#FFF6B8" />
              <stop offset="45%" stopColor="#FBBF24" />
              <stop offset="85%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </radialGradient>

            {/* Slogan Ribbon Gradient */}
            <linearGradient id="ribbonBlack" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1E1E1E" />
              <stop offset="50%" stopColor="#0B0B0B" />
              <stop offset="100%" stopColor="#1E1E1E" />
            </linearGradient>
          </defs>

          {/* Outer Border with Double Ring */}
          <circle cx="50" cy="50" r="48" fill="url(#punditsGoldRing)" />
          <circle cx="50" cy="50" r="45" fill="#0A0A0A" />
          <circle cx="50" cy="50" r="43" fill="url(#punditsGoldBg)" />

          {/* Inner Dotted / Sun Rays Ring */}
          <circle cx="50" cy="50" r="40" stroke="#845305" strokeWidth="0.8" strokeDasharray="2 1.5" />

          {/* Symmetrical Knowledge Sun Rays */}
          <g stroke="#92400E" strokeWidth="0.75" opacity="0.35">
            <line x1="50" y1="12" x2="50" y2="20" />
            <line x1="28" y1="20" x2="34" y2="26" />
            <line x1="72" y1="20" x2="66" y2="26" />
            <line x1="18" y1="36" x2="26" y2="38" />
            <line x1="82" y1="36" x2="74" y2="38" />
          </g>

          {/* Central Open Book Graphic */}
          <g transform="translate(25, 23) scale(0.5)">
            {/* Left Page */}
            <path
              d="M 50 15 C 32 10 15 12 5 18 L 5 72 C 15 66 32 64 50 69 Z"
              fill="#18181B"
              stroke="#0A0A0A"
              strokeWidth="2.5"
            />
            {/* Left Page Inner Gold Highlight */}
            <path
              d="M 47 21 C 32 17 18 19 10 24 L 10 65 C 18 60 32 58 47 62 Z"
              fill="#27272A"
            />
            {/* Left Page Text Lines */}
            <line x1="16" y1="32" x2="40" y2="28" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="16" y1="42" x2="38" y2="39" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="16" y1="52" x2="35" y2="50" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" />

            {/* Right Page */}
            <path
              d="M 50 15 C 68 10 85 12 95 18 L 95 72 C 85 66 68 64 50 69 Z"
              fill="#18181B"
              stroke="#0A0A0A"
              strokeWidth="2.5"
            />
            {/* Right Page Inner Gold Highlight */}
            <path
              d="M 53 21 C 68 17 82 19 90 24 L 90 65 C 82 60 68 58 53 62 Z"
              fill="#27272A"
            />
            {/* Right Page Text Lines */}
            <line x1="60" y1="28" x2="84" y2="32" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="62" y1="39" x2="84" y2="42" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="65" y1="50" x2="84" y2="52" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" />

            {/* Book Spine */}
            <path d="M 50 15 L 50 70" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
          </g>

          {/* Central Title Inscription: THE PUNDITS */}
          <text
            x="50"
            y="65"
            textAnchor="middle"
            fill="#09090B"
            fontSize="7.5"
            fontWeight="900"
            fontFamily="Arial Black, Impact, sans-serif"
            letterSpacing="0.4"
          >
            THE PUNDITS
          </text>

          {/* Sanskrit Motto Ribbon at Bottom */}
          <path
            d="M 18 78 L 26 73 L 74 73 L 82 78 L 76 84 L 50 82 L 24 84 Z"
            fill="url(#ribbonBlack)"
            stroke="#D97706"
            strokeWidth="0.8"
          />
          <text
            x="50"
            y="80"
            textAnchor="middle"
            fill="#FBBF24"
            fontSize="4.5"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            ज्ञानं परमं बलम्
          </text>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-tight min-w-0">
          <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white uppercase font-sans">
            THE PUNDITS
          </span>
          <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 font-mono tracking-widest uppercase">
            SYLLABUS 3D • PREP
          </span>
        </div>
      )}
    </div>
  );
};
