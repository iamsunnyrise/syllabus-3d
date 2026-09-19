import React from 'react';

interface StudyDeskHeroIllustrationProps {
  className?: string;
}

/**
 * 3D Isometric Study Desk Illustration matching the reference design:
 * - 3 Stacked Books: PLAN (Blue), STUDY (Purple), ACHIEVE (Orange/Gold)
 * - Yellow Sticky Note with "You Can Do It! 🧡"
 * - Potted Ceramic Desk Plant with glossy green leaves
 * - Smooth shadows and ambient lighting
 */
export const StudyDeskHeroIllustration: React.FC<StudyDeskHeroIllustrationProps> = ({
  className = 'w-48 sm:w-56 h-auto'
}) => {
  return (
    <div className={`relative select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 280 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        <defs>
          {/* Ambient Desk Glow & Surface Gradient */}
          <linearGradient id="deskTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF1E8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FED7AA" stopOpacity="0.6" />
          </linearGradient>

          {/* Book 1: Top Blue (PLAN) */}
          <linearGradient id="bookBlueSpine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
          <linearGradient id="bookBlueCover" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#93C5FD" />
            <stop offset="100%" stopColor="#60A5FA" />
          </linearGradient>

          {/* Book 2: Middle Purple (STUDY) */}
          <linearGradient id="bookPurpleSpine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A78BFA" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
          <linearGradient id="bookPurpleCover" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C4B5FD" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>

          {/* Book 3: Bottom Orange/Amber (ACHIEVE) */}
          <linearGradient id="bookOrangeSpine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id="bookOrangeCover" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>

          {/* Pages Texture Gradient */}
          <linearGradient id="bookPagesGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>

          {/* Sticky Note Gradient */}
          <linearGradient id="stickyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="100%" stopColor="#FDE047" />
          </linearGradient>

          {/* Plant Leaves Gradients */}
          <linearGradient id="leafGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ADE80" />
            <stop offset="50%" stopColor="#22C55E" />
            <stop offset="100%" stopColor="#15803D" />
          </linearGradient>
          <linearGradient id="leafGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#86EFAC" />
            <stop offset="60%" stopColor="#16A34A" />
            <stop offset="100%" stopColor="#14532D" />
          </linearGradient>

          {/* Ceramic Pot Gradient */}
          <linearGradient id="potGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#F1F5F9" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>

          {/* Soft Shadow Filter */}
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
            <feOffset dx="0" dy="6" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.18" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── DESK SURFACE / TABLE LEDGE ── */}
        <path
          d="M10 172 C 10 160, 30 156, 120 156 L 265 156 C 275 156, 280 165, 275 178 L 260 196 C 255 199, 245 200, 230 200 L 20 200 C 12 200, 8 190, 10 172 Z"
          fill="url(#deskTopGrad)"
          opacity="0.85"
        />

        {/* Shadow under books and pot */}
        <ellipse cx="120" cy="176" rx="90" ry="12" fill="#0F172A" opacity="0.12" />
        <ellipse cx="230" cy="168" rx="25" ry="8" fill="#0F172A" opacity="0.10" />

        {/* ── CERAMIC PLANT (BACKGROUND RIGHT) ── */}
        <g id="pottedPlant">
          {/* Plant Leaves */}
          {/* Left curved leaf */}
          <path
            d="M228 128 C 215 105, 195 95, 192 78 C 205 82, 222 96, 228 120 Z"
            fill="url(#leafGrad2)"
          />
          {/* Main upright leaf */}
          <path
            d="M232 125 C 235 90, 238 65, 234 48 C 248 65, 246 95, 236 125 Z"
            fill="url(#leafGrad1)"
          />
          {/* Right curved leaf */}
          <path
            d="M235 125 C 248 102, 268 92, 276 80 C 270 98, 252 118, 238 128 Z"
            fill="url(#leafGrad2)"
          />
          {/* Front small leaf */}
          <path
            d="M232 128 C 220 115, 212 110, 206 102 C 218 108, 228 118, 234 130 Z"
            fill="url(#leafGrad1)"
          />

          {/* Plant Stem / Base soil */}
          <ellipse cx="232" cy="138" rx="19" ry="6" fill="#3E2723" />

          {/* Ceramic Pot */}
          <path
            d="M213 138 C 213 135, 251 135, 251 138 L 246 168 C 245 171, 219 171, 218 168 Z"
            fill="url(#potGrad)"
            filter="url(#softShadow)"
          />
          {/* Pot Rim Highlight */}
          <ellipse cx="232" cy="138" rx="19" ry="3" fill="#F8FAFC" />
        </g>

        {/* ── BOOK 3: BOTTOM ORANGE BOOK (ACHIEVE) ── */}
        <g id="bookAchieve" filter="url(#softShadow)">
          {/* Book Spine (Left & Front) */}
          <path
            d="M26 142 C 20 142, 16 145, 16 153 C 16 161, 20 164, 26 164 L 175 164 C 178 164, 180 161, 180 153 C 180 145, 178 142, 175 142 Z"
            fill="url(#bookOrangeSpine)"
          />
          {/* Spine Highlight strip */}
          <path
            d="M22 144 C 18 147, 18 159, 22 162"
            stroke="#FEF3C7"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.6"
          />
          {/* Pages (Right edge) */}
          <path
            d="M175 144 L 196 144 C 199 144, 201 146, 201 153 C 201 160, 199 162, 196 162 L 175 162 Z"
            fill="url(#bookPagesGrad)"
          />
          {/* Spine Text: ACHIEVE */}
          <text
            x="85"
            y="157"
            fill="#FFFFFF"
            fontSize="10"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="1.8"
          >
            ACHIEVE
          </text>
        </g>

        {/* ── BOOK 2: MIDDLE PURPLE BOOK (STUDY) ── */}
        <g id="bookStudy" filter="url(#softShadow)">
          {/* Book Spine */}
          <path
            d="M28 120 C 22 120, 18 123, 18 131 C 18 139, 22 142, 28 142 L 172 142 C 175 142, 177 139, 177 131 C 177 123, 175 120, 172 120 Z"
            fill="url(#bookPurpleSpine)"
          />
          {/* Spine Highlight strip */}
          <path
            d="M24 122 C 20 125, 20 137, 24 140"
            stroke="#DDD6FE"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.6"
          />
          {/* Pages (Right edge) */}
          <path
            d="M172 122 L 192 122 C 195 122, 197 124, 197 131 C 197 138, 195 140, 192 140 L 172 140 Z"
            fill="url(#bookPagesGrad)"
          />
          {/* Spine Text: STUDY */}
          <text
            x="88"
            y="135"
            fill="#FFFFFF"
            fontSize="10"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="2"
          >
            STUDY
          </text>
        </g>

        {/* ── BOOK 1: TOP BLUE BOOK (PLAN) ── */}
        <g id="bookPlan" filter="url(#softShadow)">
          {/* Top Book Cover */}
          <path
            d="M30 98 C 24 98, 20 101, 20 109 C 20 117, 24 120, 30 120 L 168 120 C 171 120, 173 117, 173 109 C 173 101, 171 98, 168 98 Z"
            fill="url(#bookBlueSpine)"
          />
          {/* Spine Highlight strip */}
          <path
            d="M26 100 C 22 103, 22 115, 26 118"
            stroke="#BFDBFE"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.7"
          />
          {/* Pages (Right edge) */}
          <path
            d="M168 100 L 188 100 C 191 100, 193 102, 193 109 C 193 116, 191 118, 188 118 L 168 118 Z"
            fill="url(#bookPagesGrad)"
          />
          {/* Spine Text: PLAN */}
          <text
            x="92"
            y="113"
            fill="#FFFFFF"
            fontSize="10"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="2.2"
          >
            PLAN
          </text>
        </g>

        {/* ── YELLOW STICKY NOTE (FRONT RIGHT) ── */}
        <g id="stickyNote" filter="url(#softShadow)">
          {/* Sticky Note Sheet */}
          <rect
            x="192"
            y="132"
            width="42"
            height="44"
            rx="3.5"
            fill="url(#stickyGrad)"
            stroke="#FDE047"
            strokeWidth="0.8"
          />
          {/* Top adhesive shadow line */}
          <path d="M192 136 L 234 136" stroke="#EAB308" strokeWidth="0.8" opacity="0.3" />

          {/* Handwritten Style Text */}
          <text
            x="213"
            y="145"
            fill="#1E293B"
            fontSize="7.5"
            fontWeight="700"
            fontFamily="cursive, system-ui, sans-serif"
            textAnchor="middle"
          >
            You
          </text>
          <text
            x="213"
            y="154"
            fill="#1E293B"
            fontSize="7.5"
            fontWeight="700"
            fontFamily="cursive, system-ui, sans-serif"
            textAnchor="middle"
          >
            Can
          </text>
          <text
            x="213"
            y="163"
            fill="#1E293B"
            fontSize="7.5"
            fontWeight="700"
            fontFamily="cursive, system-ui, sans-serif"
            textAnchor="middle"
          >
            Do It!
          </text>
          {/* Orange Heart */}
          <text
            x="213"
            y="172"
            fill="#F97316"
            fontSize="7"
            fontWeight="bold"
            textAnchor="middle"
          >
            🧡
          </text>
        </g>
      </svg>
    </div>
  );
};
