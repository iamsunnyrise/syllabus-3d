import React from 'react';
import { Sparkles, TrendingUp, Target, Award, ArrowUpRight, Zap, BookOpen } from 'lucide-react';
import { useMocks } from '../../../context/MockContext';
import { Hero3DCanvas } from '../3d/Hero3DCanvas';
import { audioFX } from '../../../utils/mockAudioFX';

export const HeroSection: React.FC = () => {
  const { kpis, settings, setIsAddModalOpen, setEditingMock, setActiveView } = useMocks();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning, Aspirant';
    if (hour < 18) return 'Good Afternoon, Aspirant';
    return 'Good Evening, Aspirant';
  };

  const isAheadOfCutoff = kpis.averageScore >= 135;

  return (
    <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden p-6 sm:p-8 border border-slate-200/90 dark:border-white/10 bg-white dark:bg-[#121424] shadow-sm">
      {/* Background Radial Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Greeting, Goal & Motivational Summary */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Top Status Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-xs font-bold font-sans">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Target Exam: <span className="font-extrabold">{settings.selectedExam}</span> • Target <span className="tabular-nums font-extrabold">{settings.targetPercentile}%ile</span></span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans">
              {getGreeting()} 🎯
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed font-medium">
              {kpis.totalMocks > 0 ? (
                <>
                  You have logged <span className="text-indigo-600 dark:text-indigo-400 font-bold tabular-nums">{kpis.totalMocks} mock attempts</span>. 
                  Your current average percentile is <span className="text-emerald-600 dark:text-emerald-400 font-bold tabular-nums">{kpis.averagePercentile}%ile</span> with an average score of <span className="text-slate-900 dark:text-white font-bold tabular-nums">{kpis.averageScore} marks</span>.
                </>
              ) : (
                'Start logging your mock tests to unlock 3D trajectory tracking, section diagnostic intelligence, and automated percentile gap analysis.'
              )}
            </p>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2">
            <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-100/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/5">
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 text-[11px] sm:text-xs font-semibold">
                <Target className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span className="truncate">Cutoff Status</span>
              </div>
              <div className="mt-1 text-sm sm:text-base font-black font-sans text-slate-900 dark:text-white">
                {kpis.totalFullLengthMocks > 0 ? (
                  <span className={isAheadOfCutoff ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}>
                    {isAheadOfCutoff ? 'Cleared ✓' : 'In Progress'}
                  </span>
                ) : 'N/A'}
              </div>
            </div>

            <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-100/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/5">
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 text-[11px] sm:text-xs font-semibold">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="truncate">Best Score</span>
              </div>
              <div className="mt-1 text-sm sm:text-base font-black font-sans tabular-nums text-slate-900 dark:text-white">
                {kpis.bestScore > 0 ? `${kpis.bestScore} M` : '0'}
              </div>
            </div>

            <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-100/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/5">
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 text-[11px] sm:text-xs font-semibold">
                <Award className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0" />
                <span className="truncate">Peak %ile</span>
              </div>
              <div className="mt-1 text-sm sm:text-base font-black font-sans tabular-nums text-slate-900 dark:text-white">
                {kpis.bestPercentile > 0 ? `${kpis.bestPercentile}%` : '0%'}
              </div>
            </div>
          </div>

          {/* Action CTAs: Direct Section Navigation */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2">
            <button
              onClick={() => {
                audioFX.playClickSound();
                setActiveView('full-length');
              }}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-extrabold text-xs sm:text-sm shadow-md shadow-indigo-500/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
            >
              <Target className="w-4 h-4" />
              <span>Full Length Mocks</span>
            </button>

            <button
              onClick={() => {
                audioFX.playClickSound();
                setActiveView('sectional');
              }}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-800 dark:text-white font-bold text-xs sm:text-sm transition-all active:scale-95"
            >
              <Zap className="w-4 h-4 text-[#00d2ff]" />
              <span>Sectionals</span>
            </button>

            <button
              onClick={() => {
                audioFX.playClickSound();
                setActiveView('chapter-wise');
              }}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-800 dark:text-white font-bold text-xs sm:text-sm transition-all active:scale-95"
            >
              <BookOpen className="w-4 h-4 text-[#ec4899]" />
              <span>Chapter Hub</span>
            </button>

            <button
              onClick={() => {
                audioFX.playClickSound();
                setActiveView('analytics');
              }}
              className="flex items-center gap-1 px-3 py-2.5 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white font-bold text-xs sm:text-sm transition-all"
            >
              <span>Analytics</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Right Column: 3D Holographic Scene */}
        <div className="lg:col-span-5 relative w-full h-[260px] sm:h-[300px] flex items-center justify-center pointer-events-none">
          <Hero3DCanvas />
        </div>

      </div>
    </div>
  );
};
