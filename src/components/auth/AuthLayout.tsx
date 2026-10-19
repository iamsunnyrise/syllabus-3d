import React from 'react';
import { 
  ArrowLeft, 
  Sun, 
  Moon, 
  Zap, 
  ShieldCheck, 
  Target, 
  TrendingUp, 
  Sparkles, 
  Layers,
  Lock,
  Award
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { soundManager } from '../../utils/soundEffects';

interface AuthLayoutProps {
  children: React.ReactNode;
  onBackToLanding?: () => void;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, onBackToLanding }) => {
  const { toggleTheme, isDark, activeTheme } = useTheme();
  const { loginWithDemoGoogle } = useAuth();
  const [isDemoLaunching, setIsDemoLaunching] = React.useState(false);

  const handleInstantDemo = async () => {
    try {
      setIsDemoLaunching(true);
      await loginWithDemoGoogle('scholar@syllabus3d.app', 'Guest Scholar');
      soundManager.playCompleteChime();
    } catch {
      // Ignore or let view handle
    } finally {
      setIsDemoLaunching(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF8F5] dark:bg-[#0A0B14] warm-cream:bg-[#FAEED9] text-slate-900 dark:text-[#F8FAFC] warm-cream:text-[#38370D] flex flex-col justify-between p-4 sm:p-6 lg:p-8 relative overflow-x-hidden selection:bg-amber-500/30 transition-colors duration-300">
      
      {/* 1. Atmospheric Ambient Background Canvas */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
        {/* Subtle geometric dot grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(#D4AF37 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Ambient Top Radiant Glows */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] sm:w-[950px] h-[450px] bg-gradient-to-b from-amber-500/15 via-amber-600/5 to-transparent rounded-full blur-[140px]" />
        <div className="hidden dark:block absolute top-1/3 -left-40 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[160px]" />
        <div className="hidden dark:block absolute bottom-10 -right-40 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[160px]" />
      </div>

      {/* 2. Top Header Navigation Bar */}
      <header className="relative z-20 w-full max-w-6xl mx-auto flex items-center justify-between pb-4">
        {/* Left: Back to Home Button */}
        {onBackToLanding ? (
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onBackToLanding();
            }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-white/5 warm-cream:bg-white/80 hover:bg-white dark:hover:bg-white/10 border border-slate-200/80 dark:border-white/10 warm-cream:border-[#DFCFA8] text-xs font-bold text-slate-700 dark:text-slate-300 warm-cream:text-[#5E5211] shadow-xs hover:shadow-sm transition-all cursor-pointer group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-amber-600 dark:text-amber-400" />
            <span>Back to Home</span>
          </button>
        ) : (
          <div />
        )}

        {/* Right: Quick Demo & Theme Toggle */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleInstantDemo}
            disabled={isDemoLaunching}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-900 dark:text-amber-300 warm-cream:text-[#654E00] text-xs font-bold transition-all shadow-xs cursor-pointer disabled:opacity-50"
            title="Explore full platform instantly without entering credentials"
          >
            <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>{isDemoLaunching ? 'Loading Demo...' : 'Instant Demo'}</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              toggleTheme();
            }}
            type="button"
            className="p-2 rounded-full bg-white/80 dark:bg-white/5 warm-cream:bg-white/80 hover:bg-white dark:hover:bg-white/10 border border-slate-200/80 dark:border-white/10 warm-cream:border-[#DFCFA8] text-slate-700 dark:text-slate-300 warm-cream:text-[#5E5211] shadow-xs hover:shadow-sm transition-all cursor-pointer"
            title={isDark ? 'Switch to Warm Cream' : 'Switch to Dark Mode'}
            aria-label="Toggle visual theme"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600 warm-cream:text-[#7A6100]" />
            )}
          </button>
        </div>
      </header>

      {/* 3. Main Centerpiece (Split Hero Showcase on Desktop + Focused Card on Mobile) */}
      <main className="relative z-10 w-full max-w-6xl mx-auto my-auto py-2 sm:py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Column: Brand Hero Showcase (Desktop Only, lg+) */}
          <div className="hidden lg:flex lg:col-span-6 flex-col justify-between min-h-[580px] p-8 xl:p-10 rounded-3xl bg-gradient-to-br from-[#121424] via-[#16182C] to-[#0D0F1B] border border-amber-500/25 text-white shadow-2xl relative overflow-hidden">
            {/* Ambient Nebula Glows inside Showcase */}
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              {/* Badge & Brand */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#0D0F1A] border border-amber-500/40 p-2 flex items-center justify-center shadow-lg">
                  <img src="/logo.png" alt="Syllabus 3D" className="w-full h-full object-contain drop-shadow" />
                </div>
                <div>
                  <div className="text-sm font-black tracking-wider uppercase text-amber-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Syllabus 3D</span>
                  </div>
                  <div className="text-[11px] font-semibold text-slate-400">
                    Aspirant Intelligence Ecosystem
                  </div>
                </div>
              </div>

              {/* Punchy Heading */}
              <div>
                <h2 className="text-2xl xl:text-3xl font-black text-white leading-tight tracking-tight">
                  Master Your Entire Syllabus. Predict Your Rank.
                </h2>
                <p className="mt-2 text-xs xl:text-sm text-slate-300 leading-relaxed font-medium">
                  The precision 3D preparation hub designed for high-scoring aspirants targeting 98%+ percentile in competitive exams.
                </p>
              </div>

              {/* 3 High-Impact Feature Highlights */}
              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-amber-500/30 transition-all flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Tier-1 Full Exam Simulation</h4>
                    <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                      100-Question mock diagnostics with real-time cutoff clearances and percentile trends.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-amber-500/30 transition-all flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Spaced Repetition & Mindmap</h4>
                    <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                      Scientific revision schedules that keep high-weightage topics crystal clear until exam day.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-amber-500/30 transition-all flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Smart Backlog Rescue</h4>
                    <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                      Instantly reorganize overdue syllabus topics into realistic, stress-free micro-sprints.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Trust & Student Achievement Strip */}
            <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2 text-slate-300">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-semibold">Avg +28.5 Marks Score Boost</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400 font-semibold text-[10px]">
                <span className="flex items-center gap-1">
                  <Lock className="w-3 h-3 text-emerald-400" /> 256-Bit SSL
                </span>
                <span>•</span>
                <span>📱 PWA Ready</span>
              </div>
            </div>
          </div>

          {/* Right Column: Active Auth Form Card */}
          <div className="col-span-12 lg:col-span-6 flex items-center justify-center">
            <div className="w-full max-w-[460px] p-6 sm:p-8 rounded-3xl bg-white/95 dark:bg-[#151624]/95 warm-cream:bg-[#FFFDF9]/95 border border-slate-200/90 dark:border-white/10 warm-cream:border-[#EBD3A0] shadow-2xl backdrop-blur-xl animate-fade-in">
              {children}
            </div>
          </div>

        </div>
      </main>

      {/* 4. Footer Branding & Security Note */}
      <footer className="relative z-10 text-center pt-4 pb-2 text-[11px] font-semibold text-slate-400 dark:text-slate-500 warm-cream:text-[#8D7A02]/80 flex flex-wrap items-center justify-center gap-3">
        <span>SYLLABUS 3D · Smart Exam Mastery Platform</span>
        <span className="hidden sm:inline">•</span>
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Encrypted Cloud Sync</span>
        </span>
      </footer>

    </div>
  );
};
