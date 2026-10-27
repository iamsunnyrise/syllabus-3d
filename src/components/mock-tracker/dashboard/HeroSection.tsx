import React from 'react';
import { Sparkles, TrendingUp, Target, Award, ArrowUpRight, Zap, BookOpen } from 'lucide-react';
import { useMocks } from '../../../context/MockContext';
import { Hero3DCanvas } from '../3d/Hero3DCanvas';
import { audioFX } from '../../../utils/mockAudioFX';

export const HeroSection: React.FC = () => {
  const { kpis, settings, setIsAddModalOpen, setEditingMock, setActiveView } = useMocks();

  const isAheadOfCutoff = kpis.averageScore >= 135;

  return (
    <div className="mock-hero-banner relative rounded-2xl sm:rounded-3xl overflow-hidden p-6 sm:p-8 border border-slate-200/90 dark:border-white/10 bg-white dark:bg-[#0D1022] shadow-xl transition-all duration-300">
      {/* Background Radial Glow */}
      <div className="absolute -top-20 right-1/4 w-96 h-96 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-1/4 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Greeting, Goal & Motivational Summary */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Top Status Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/15 to-cyan-500/15 border border-indigo-400/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold font-sans shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400 shrink-0 animate-spin-slow" />
            <span>{settings.selectedExam || 'Exam'} Performance</span>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Mock Analysis &amp; Trajectory
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed mt-1">
              {kpis.totalMocks > 0 ? (
                <>
                  <strong className="text-slate-900 dark:text-white">{kpis.totalMocks} tests logged</strong> · Current average:{' '}
                  <strong className="text-sky-600 dark:text-sky-400">{kpis.averagePercentile}%ile</strong> ({kpis.averageScore} marks).
                </>
              ) : (
                'Log tests to track score trends, sectional accuracy, and percentile goals.'
              )}
            </p>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 pt-2">
            {/* 1. Cutoff Status */}
            <div className="metric-plate p-3 sm:p-3.5 rounded-2xl bg-slate-100/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 backdrop-blur-md shadow-2xs hover:border-indigo-500/40 transition-all">
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 text-[11px] sm:text-xs font-bold">
                <div className="w-5 h-5 rounded-md bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <Target className="w-3.5 h-3.5" />
                </div>
                <span className="truncate">Cutoff Status</span>
              </div>
              <div className="mt-1.5 text-sm sm:text-base font-black font-sans text-slate-900 dark:text-white">
                {kpis.totalFullLengthMocks > 0 ? (
                  <span className={isAheadOfCutoff ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-500 dark:text-amber-400'}>
                    {isAheadOfCutoff ? 'Cleared ✓' : 'In Progress'}
                  </span>
                ) : 'N/A'}
              </div>
            </div>

            {/* 2. Best Score */}
            <div className="metric-plate p-3 sm:p-3.5 rounded-2xl bg-slate-100/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 backdrop-blur-md shadow-2xs hover:border-sky-500/40 transition-all">
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 text-[11px] sm:text-xs font-bold">
                <div className="w-5 h-5 rounded-md bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-3.5 h-3.5" />
                </div>
                <span className="truncate">Best Score</span>
              </div>
              <div className="mt-1.5 text-sm sm:text-base font-black font-sans tabular-nums text-sky-600 dark:text-sky-400">
                {kpis.bestScore > 0 ? kpis.bestScore : '0'}
              </div>
            </div>

            {/* 3. Peak %ile */}
            <div className="metric-plate p-3 sm:p-3.5 rounded-2xl bg-slate-100/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 backdrop-blur-md shadow-2xs hover:border-purple-500/40 transition-all">
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 text-[11px] sm:text-xs font-bold">
                <div className="w-5 h-5 rounded-md bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                  <Award className="w-3.5 h-3.5" />
                </div>
                <span className="truncate">Peak %ile</span>
              </div>
              <div className="mt-1.5 text-sm sm:text-base font-black font-sans tabular-nums text-purple-600 dark:text-purple-300">
                {kpis.bestPercentile > 0 ? `${kpis.bestPercentile}%` : '0%'}
              </div>
            </div>
          </div>

          {/* Action CTAs: Direct Section Navigation */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 pt-2">
            <button
              onClick={() => {
                audioFX.playClickSound();
                setActiveView('full-length');
              }}
              className="btn-3d-mocks flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-black text-xs sm:text-sm shadow-lg shadow-indigo-500/30 ring-1 ring-white/25 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
            >
              <Target className="w-4 h-4 shrink-0" />
              <span>Full Length Mocks</span>
            </button>

            <button
              onClick={() => {
                audioFX.playClickSound();
                setActiveView('sectional');
              }}
              className="btn-glass-sub flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/12 bg-white/80 dark:bg-white/[0.05] hover:bg-slate-100 dark:hover:bg-white/[0.1] hover:border-cyan-400/50 text-slate-800 dark:text-white font-bold text-xs sm:text-sm transition-all active:scale-95 shadow-xs cursor-pointer"
            >
              <Zap className="w-4 h-4 text-cyan-500 dark:text-cyan-400 shrink-0" />
              <span>Sectionals</span>
            </button>

            <button
              onClick={() => {
                audioFX.playClickSound();
                setActiveView('chapter-wise');
              }}
              className="btn-glass-sub flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/12 bg-white/80 dark:bg-white/[0.05] hover:bg-slate-100 dark:hover:bg-white/[0.1] hover:border-pink-400/50 text-slate-800 dark:text-white font-bold text-xs sm:text-sm transition-all active:scale-95 shadow-xs cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-pink-500 dark:text-pink-400 shrink-0" />
              <span>Chapter Hub</span>
            </button>

            <button
              onClick={() => {
                audioFX.playClickSound();
                setActiveView('analytics');
              }}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] font-bold text-xs sm:text-sm transition-all cursor-pointer"
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
