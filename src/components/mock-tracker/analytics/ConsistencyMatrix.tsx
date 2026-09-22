import React from 'react';
import { ShieldCheck, Activity, Gauge, TrendingUp, Zap } from 'lucide-react';
import { useMocks } from '../../../context/MockContext';
import { calculateScoreVariance } from '../../../utils/mockAnalyticsEngine';
import { Card3DTilt } from '../3d/Card3DTilt';

export const ConsistencyMatrix: React.FC = () => {
  const { mocks } = useMocks();
  const matrix = calculateScoreVariance(mocks);

  return (
    <Card3DTilt
      maxTilt={2}
      className="p-6 rounded-3xl border border-slate-200 dark:border-white/5 bg-white dark:bg-darkSurface shadow-sm dark:shadow-3d-dark space-y-6"
    >
      <div>
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-mint">
          <Activity className="w-4 h-4" />
          <span>Performance Stability & Consistency</span>
        </div>
        <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-1">
          Variance & Standard Deviation Across Attempts
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-medium">
          Measures how reliably you reproduce your peak scores across consecutive tests
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-darkContainer/50 border border-slate-200/70 dark:border-white/5 space-y-1">
          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase">Stability Index</div>
          <div className="text-2xl font-black text-emerald-700 dark:text-mint">
            {matrix.stabilityIndex} <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">/ 100</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Higher = Rock solid consistency</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-darkContainer/50 border border-slate-200/70 dark:border-white/5 space-y-1">
          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase">Score Std Dev (σ)</div>
          <div className="text-2xl font-black text-blue-600 dark:text-electric-blue">
            ±{matrix.scoreStdDev}
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Average score fluctuation margin</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-darkContainer/50 border border-slate-200/70 dark:border-white/5 space-y-1">
          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase">Score Variance (σ²)</div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {matrix.scoreVariance}
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Statistical dispersion</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-darkContainer/50 border border-slate-200/70 dark:border-white/5 space-y-1">
          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase">%ile Std Dev</div>
          <div className="text-2xl font-black text-purple-700 dark:text-lavender">
            ±{matrix.percentileStdDev}%
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Rank band stability</p>
        </div>
      </div>
    </Card3DTilt>
  );
};
