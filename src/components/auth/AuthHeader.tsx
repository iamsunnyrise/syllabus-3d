import React from 'react';

interface AuthHeaderProps {
  title: string;
  subtitle: string;
  badge?: string;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ title, subtitle, badge }) => {
  return (
    <div className="flex flex-col items-start text-left mb-6">
      {/* Brand Header with 3D Crest Badge & Metallic Dual-Tone Typography */}
      <div className="flex items-center gap-3 mb-5 select-none group cursor-default">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-b from-[#1A1D29] to-[#0A0D15] p-1 shadow-md shadow-amber-500/20 border border-amber-400/40 flex items-center justify-center overflow-hidden shrink-0 transition-transform group-hover:scale-105 duration-300">
          <img
            src="/auth-crest.jpg"
            alt="SYLLABUS 3D"
            className="w-full h-full object-cover rounded-lg drop-shadow"
          />
        </div>
        <div className="flex items-center gap-1.5 font-sans">
          <span className="text-sm font-black tracking-[0.2em] uppercase text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
            SYLLABUS
          </span>
          <span className="text-sm font-black tracking-widest uppercase bg-gradient-to-r from-[#FDE047] via-[#F5C518] to-[#D97706] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(245,197,24,0.55)]">
            3D
          </span>
        </div>
      </div>

      {badge && (
        <span className="mb-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F5C518]/15 border border-[#F5C518]/30 text-[#F5C518] text-[10px] font-black uppercase tracking-wider">
          {badge}
        </span>
      )}

      {/* Heading & Subtitle */}
      <h1 className="auth-heading text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
        {title}
      </h1>
      <p className="auth-subtitle text-xs sm:text-sm text-slate-300 mt-1.5 max-w-sm font-medium leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
};
