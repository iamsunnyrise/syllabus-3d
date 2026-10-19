import React from 'react';
import { Target, Award, CheckCircle2, TrendingUp, Zap, Flame, ShieldCheck } from 'lucide-react';
import { useMocks } from '../../../context/MockContext';
import { StatCard } from '../common/StatCard';

export const FullLengthDashboard: React.FC = () => {
  const { fullLengthKPIs } = useMocks();

  return (
    <div className="space-y-4">
      {/* Top Full Length Highlights Banner */}
      <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-darkElevated border border-slate-200/90 dark:border-white/10 shadow-sm dark:shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-sky-500/10 dark:bg-electric-blue/15 border border-sky-500/20 text-sky-600 dark:text-electric-blue flex items-center justify-center shrink-0">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Full Length Performance
            </h2>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
              100Q • 200 Marks Tier-1 Exam Simulations
            </p>
          </div>
        </div>

        {/* Clearance Streak & Cutoff Success Badges */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-3 rounded-2xl bg-slate-50 dark:bg-darkSurface/80 border border-emerald-200/80 dark:border-mint/30 shadow-xs text-center min-w-[110px]">
            <div className="flex items-center justify-center gap-1 text-emerald-700 dark:text-mint text-[11px] font-bold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 fill-emerald-600 dark:fill-mint" />
              <span>Clear Streak</span>
            </div>
            <div className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
              {fullLengthKPIs.consecutiveClearanceStreak} <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Mocks</span>
            </div>
          </div>

          <div className="px-4 py-3 rounded-2xl bg-slate-50 dark:bg-darkSurface/80 border border-sky-200/80 dark:border-electric-blue/30 shadow-xs text-center min-w-[110px]">
            <div className="flex items-center justify-center gap-1 text-sky-700 dark:text-electric-blue text-[11px] font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Cutoff Rate</span>
            </div>
            <div className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
              {fullLengthKPIs.fullLengthCutoffRate}%
            </div>
          </div>
        </div>
      </div>

      {/* 6 Full Length Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <StatCard
          title="Full Mocks"
          value={fullLengthKPIs.totalMocks}
          icon={<Target className="w-4 h-4" />}
          accentColor="#6EC2FD"
        />

        <StatCard
          title="Avg Score"
          value={fullLengthKPIs.averageScore > 0 ? `${fullLengthKPIs.averageScore}` : '0'}
          icon={<Award className="w-4 h-4" />}
          accentColor="#38BDF8"
        />

        <StatCard
          title="Peak Score"
          value={fullLengthKPIs.bestScore > 0 ? `${fullLengthKPIs.bestScore}` : '0'}
          icon={<Zap className="w-4 h-4" />}
          accentColor="#BEFFCC"
          trend={fullLengthKPIs.bestScore >= 160 ? { value: '98th %ile', isPositive: true } : undefined}
        />

        <StatCard
          title="Avg Accuracy"
          value={fullLengthKPIs.averageAccuracy > 0 ? `${fullLengthKPIs.averageAccuracy}%` : '0%'}
          icon={<CheckCircle2 className="w-4 h-4" />}
          accentColor="#5EE88A"
        />

        <StatCard
          title="Avg Percentile"
          value={fullLengthKPIs.averagePercentile > 0 ? `${fullLengthKPIs.averagePercentile}%` : '0%'}
          icon={<TrendingUp className="w-4 h-4" />}
          accentColor="#A78BFA"
        />

        <StatCard
          title="Best Percentile"
          value={fullLengthKPIs.bestPercentile > 0 ? `${fullLengthKPIs.bestPercentile}%` : '0%'}
          icon={<Award className="w-4 h-4" />}
          accentColor="#F472B6"
          trend={fullLengthKPIs.bestPercentile >= 98 ? { value: 'Top 2%', isPositive: true } : undefined}
        />
      </div>
    </div>
  );
};
