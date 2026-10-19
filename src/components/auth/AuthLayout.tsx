import React from 'react';
import { X, Sparkles } from 'lucide-react';
import { soundManager } from '../../utils/soundEffects';

interface AuthLayoutProps {
  children: React.ReactNode;
  onBackToLanding?: () => void;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, onBackToLanding }) => {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#000000] text-white selection:bg-[#F5C518]/30 overflow-x-hidden">
      
      {/* ── LEFT HALF: DEEP NAVY WITH GOLDEN EMBLEM & DOT MATRIX (Desktop Only, lg+) ── */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-10 xl:p-14 bg-[#070B16] relative overflow-hidden border-r border-white/5 select-none">
        
        {/* Amber/Gold Dot Matrix Pattern */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `radial-gradient(#F5C518 1.2px, transparent 1.2px)`,
            backgroundSize: '28px 28px'
          }}
        />

        {/* Subtle radial ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#F5C518]/[0.06] rounded-full blur-[140px] pointer-events-none" />

        {/* Top-Left Brand Logo Badge */}
        <div className="relative z-10 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#F5C518] text-slate-950 flex items-center justify-center p-1.5 shadow-md">
            <img src="/logo.png" alt="Syllabus 3D" className="w-full h-full object-contain" />
          </div>
          <span className="text-sm font-black tracking-wider text-white uppercase font-sans">
            SYLLABUS 3D
          </span>
        </div>

        {/* Center: Grand Golden Circular Medallion */}
        <div className="relative z-10 flex items-center justify-center my-auto py-8">
          <div className="w-64 h-64 xl:w-72 xl:h-72 rounded-full bg-gradient-to-b from-[#F5C518] via-[#EAB308] to-[#CA8A04] text-slate-950 flex flex-col items-center justify-center p-6 shadow-2xl shadow-[#F5C518]/25 text-center transition-transform hover:scale-[1.02] duration-300">
            {/* Top sacred symbol */}
            <div className="text-[11px] font-black text-slate-950/70 mb-1 select-none">
              ॐ
            </div>

            {/* Center Book Graphic */}
            <div className="w-20 h-20 xl:w-24 xl:h-24 flex items-center justify-center mb-1">
              <svg className="w-full h-full text-slate-950 fill-current" viewBox="0 0 24 24">
                <path d="M12 4.5C10.5 3.5 8.5 3 6.5 3 4.5 3 2.5 3.5 1 4.5v15c1.5-1 3.5-1.5 5.5-1.5 2 0 4 .5 5.5 1.5 1.5-1 3.5-1.5 5.5-1.5 2 0 4 .5 5.5 1.5v-15c-1.5-1-3.5-1.5-5.5-1.5-2 0-4 .5-5.5 1.5zm0 13c-1.3-.8-3-1.2-4.5-1.2-1.8 0-3.5.5-4.5 1.2V6.2C4 5.5 5.5 5 7.5 5c1.8 0 3.5.5 4.5 1.2v11.3zm10 0c-1-.7-2.7-1.2-4.5-1.2-1.5 0-3.2.4-4.5 1.2V6.2c1-.7 2.7-1.2 4.5-1.2 2 0 3.5.5 4.5 1.2v11.3z"/>
              </svg>
            </div>

            {/* Brand Title */}
            <span className="text-xl xl:text-2xl font-black tracking-wider uppercase font-serif text-slate-950 leading-tight">
              SYLLABUS 3D
            </span>

            {/* Golden Ribbon Banner */}
            <div className="mt-2 px-3.5 py-0.5 rounded-full bg-slate-950 text-[#F5C518] text-[10px] font-black tracking-widest uppercase shadow-sm">
              ज्ञानं परमं ध्येयम्
            </div>

            {/* Bottom Subtitle */}
            <span className="text-[10px] font-bold text-slate-950/75 mt-1.5 tracking-wider font-serif">
              सीताराम
            </span>
          </div>
        </div>

        {/* Bottom Left: Aspirant Headline & Tagline */}
        <div className="relative z-10 space-y-2">
          <h2 className="text-2xl xl:text-3xl font-black text-white tracking-tight leading-tight">
            Welcome back, aspirant.
          </h2>
          <p className="text-xs xl:text-sm text-slate-400 max-w-md leading-relaxed font-medium">
            Practice on the real SSC exam interface, review every attempt, and climb the rank list.
          </p>
          <div className="pt-1 text-xs font-bold text-[#F5C518]">
            ज्ञानं परमं ध्येयम् <span className="text-slate-500 font-normal">· Knowledge is the supreme goal</span>
          </div>
        </div>

      </div>

      {/* ── RIGHT HALF: PURE BLACK WITH CLEAN FORM CONTENT (50% on lg, 100% on mobile) ── */}
      <div className="w-full lg:w-1/2 min-h-screen flex flex-col justify-between p-6 sm:p-10 xl:p-14 bg-[#000000] relative">
        
        {/* Top-Right Dismiss (X) Button (NO "Back to Home" button!) */}
        <div className="w-full flex items-center justify-between lg:justify-end pb-4">
          {/* Mobile Only Logo */}
          <div className="flex lg:hidden items-center gap-2 select-none">
            <div className="w-7 h-7 rounded-full bg-[#F5C518] text-slate-950 flex items-center justify-center p-1 shadow-md">
              <img src="/logo.png" alt="Syllabus 3D" className="w-full h-full object-contain" />
            </div>
            <span className="text-xs font-black tracking-wider text-white uppercase font-sans">
              SYLLABUS 3D
            </span>
          </div>

          {onBackToLanding && (
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onBackToLanding();
              }}
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer border border-white/10"
              title="Close and return to landing"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Center: Form Container */}
        <div className="w-full max-w-[420px] mx-auto my-auto py-4 animate-fade-in">
          {children}
        </div>

        {/* Bottom Discreet Trust Bar */}
        <div className="w-full text-center pt-6 text-[11px] font-semibold text-slate-600">
          <span>SYLLABUS 3D · Smart Exam Mastery Platform · 256-Bit SSL</span>
        </div>

      </div>

    </div>
  );
};
