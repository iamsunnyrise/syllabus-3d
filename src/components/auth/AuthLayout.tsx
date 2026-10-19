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

        {/* Center: High-Impact 3D Golden Emblem */}
        <div className="relative z-10 flex flex-col items-center justify-center my-auto py-6 group select-none">
          {/* Ambient Multi-Layer Radial Glow */}
          <div className="absolute w-72 h-72 xl:w-80 xl:h-80 rounded-full bg-gradient-to-tr from-[#F5C518]/30 via-amber-500/20 to-transparent blur-3xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* 3D Golden Crest Badge Container */}
          <div className="relative w-64 h-64 xl:w-72 xl:h-72 rounded-[2.5rem] bg-gradient-to-b from-[#181B26] to-[#0A0D15] p-2.5 shadow-2xl shadow-amber-500/20 border border-amber-400/30 hover:border-amber-400/60 transition-all duration-300 hover:scale-[1.03]">
            {/* Inner subtle glow rim */}
            <div className="w-full h-full rounded-[2rem] overflow-hidden flex items-center justify-center bg-[#07090F] relative">
              <img
                src="/auth-crest.jpg"
                alt="Syllabus 3D Official 3D Crest"
                className="w-full h-full object-cover object-center drop-shadow-2xl select-none"
              />
            </div>
          </div>

          {/* Brand Tagline & Motto beneath the 3D Crest */}
          <div className="mt-5 flex items-center gap-2 select-none">
            <span className="text-xs font-black tracking-[0.25em] text-[#F5C518] uppercase">
              SYLLABUS 3D
            </span>
            <span className="text-slate-600">•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#F5C518]/15 border border-[#F5C518]/30 text-[#F5C518] text-[10px] font-black uppercase tracking-wider">
              ज्ञानं परमं ध्येयम्
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
