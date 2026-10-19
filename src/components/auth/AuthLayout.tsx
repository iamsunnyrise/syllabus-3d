import React from 'react';
import { X, Sparkles } from 'lucide-react';
import { soundManager } from '../../utils/soundEffects';
import { useAuth } from '../../context/AuthContext';
import { AuthViewMode } from '../../types/auth';

interface AuthLayoutProps {
  children: React.ReactNode;
  onBackToLanding?: () => void;
  authView?: AuthViewMode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, onBackToLanding, authView: propAuthView }) => {
  const { authView: contextAuthView } = useAuth();
  const currentAuthView = propAuthView || contextAuthView;
  const isSignup = currentAuthView === 'signup';
  const isForgotPassword = currentAuthView === 'forgot_password';

  // Dynamic Headline & Short Subtitle for Syllabus 3D
  const headline = isSignup 
    ? 'Welcome, aspirant.' 
    : isForgotPassword 
      ? 'Account recovery' 
      : 'Welcome back, aspirant.';

  const subtitle = isSignup
    ? 'Start tracking your syllabus in 3D and master every topic.'
    : isForgotPassword
      ? 'Reset your password and get back to your study tracker.'
      : 'Continue tracking your syllabus in 3D and master every topic.';

  // Interactive 3D Parallax & Spotlight state
  const [tilt, setTilt] = React.useState({ x: 0, y: 0, active: false });
  const [spotlight, setSpotlight] = React.useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    const yPct = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlight({ x: xPct, y: yPct });

    // Subtle 3D tilt calculation relative to center
    const tiltX = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const tiltY = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
    setTilt({ x: tiltX, y: tiltY, active: true });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, active: false });
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#000000] text-white selection:bg-[#F5C518]/30 overflow-x-hidden">
      
      {/* ── LEFT HALF: DEEP NAVY WITH ANIMATED GOLDEN CREST & DOT MATRIX (Desktop Only, lg+) ── */}
      <div 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-10 xl:p-14 bg-[#070B16] relative overflow-hidden border-r border-white/5 select-none"
      >
        
        {/* Amber/Gold Dot Matrix Pattern */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `radial-gradient(#F5C518 1.2px, transparent 1.2px)`,
            backgroundSize: '28px 28px'
          }}
        />

        {/* Dynamic Interactive Spotlight following cursor */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-700"
          style={{
            background: `radial-gradient(600px circle at ${spotlight.x}% ${spotlight.y}%, rgba(245, 197, 24, 0.08), transparent 70%)`
          }}
        />

        {/* Subtle radial ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#F5C518]/[0.05] rounded-full blur-[140px] pointer-events-none" />

        {/* Top-Left Brand Logo Badge */}
        <div className="relative z-10 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#F5C518] text-slate-950 flex items-center justify-center p-1.5 shadow-md">
            <img src="/logo.png" alt="Syllabus 3D" className="w-full h-full object-contain" />
          </div>
          <span className="text-sm font-black tracking-wider text-white uppercase font-sans">
            SYLLABUS 3D
          </span>
        </div>

        {/* Center: High-Impact Animated 3D Golden Crest */}
        <div className="relative z-10 flex flex-col items-center justify-center my-auto py-8 select-none">
          
          {/* Continuous Floating / Levitation Wrapper */}
          <div className="relative animate-auth-crest-float" style={{ perspective: '1200px' }}>
            
            {/* Ambient Multi-Layer Radial Glow Aura */}
            <div className="absolute -inset-10 rounded-full bg-gradient-to-tr from-[#F5C518]/30 via-amber-500/20 to-yellow-600/10 blur-3xl pointer-events-none animate-auth-crest-aura" />
            <div className="absolute -inset-4 rounded-full bg-[#F5C518]/15 blur-xl pointer-events-none" />

            {/* Interactive 3D Perspective Tilt Badge */}
            <div
              style={{
                transform: tilt.active
                  ? `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale3d(1.03, 1.03, 1.03)`
                  : 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)',
                transition: tilt.active
                  ? 'transform 0.15s cubic-bezier(0.2, 0.8, 0.4, 1)'
                  : 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                transformStyle: 'preserve-3d',
              }}
              className="relative w-64 h-64 xl:w-72 xl:h-72 rounded-[2.5rem] bg-gradient-to-b from-[#181B26] via-[#0F121C] to-[#0A0D15] p-2.5 animate-auth-border-pulse border border-amber-400/30 cursor-pointer transition-all duration-300"
            >
              {/* Inner Bevel & High-Res Crest Image */}
              <div className="w-full h-full rounded-[2rem] overflow-hidden flex items-center justify-center bg-[#07090F] relative shadow-inner">
                <img
                  src="/auth-crest.jpg"
                  alt="Syllabus 3D Official 3D Crest"
                  className="w-full h-full object-cover object-center drop-shadow-2xl select-none"
                  draggable={false}
                />

                {/* Specular Light Sweep / Shimmer Reflection */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2rem]">
                  <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-auth-crest-shine" />
                </div>

                {/* Glass Refraction Top Rim */}
                <div className="absolute top-0 inset-x-0 h-1/3 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-[2rem]" />
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Left: Aspirant Headline & Subtitle */}
        <div className="relative z-10 space-y-2 transition-all duration-300">
          <h2 className="text-2xl xl:text-3xl font-black text-white tracking-tight leading-tight">
            {headline}
          </h2>
          <p className="text-xs xl:text-sm text-slate-400 max-w-md leading-relaxed font-medium">
            {subtitle}
          </p>
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
