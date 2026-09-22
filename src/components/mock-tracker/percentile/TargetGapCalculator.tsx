import React from 'react';
import { Target, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { useMocks } from '../../../context/MockContext';
import { Card3DTilt } from '../3d/Card3DTilt';

export const TargetGapCalculator: React.FC = () => {
  const { kpis, settings, updateSettings, mocks } = useMocks();

  const currentPercentile = kpis.averagePercentile;
  const targetPercentile = settings.targetPercentile;
  const gap = Math.max(0, targetPercentile - currentPercentile);

  // Estimate required score based on mock data
  const estimatedTargetScore = React.useMemo(() => {
    if (mocks.length === 0) return 160;
    // Find closest mock to target percentile
    const sortedByPerc = [...mocks].sort((a, b) => a.percentile - b.percentile);
    const match = sortedByPerc.find(m => m.percentile >= targetPercentile);
    if (match) return match.score;
    const highest = sortedByPerc[sortedByPerc.length - 1];
    return Number((highest.score + (targetPercentile - highest.percentile) * 1.5).toFixed(1));
  }, [mocks, targetPercentile]);

  const scoreGap = Math.max(0, estimatedTargetScore - kpis.averageScore);

  const presets = [90, 95, 97, 98, 99];

  return (
    <Card3DTilt
      maxTilt={2}
      className="p-6 rounded-3xl border border-slate-200 dark:border-white/5 bg-white dark:bg-darkSurface shadow-sm dark:shadow-3d-dark space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-600 dark:text-electric-blue">
            <Target className="w-4 h-4" />
            <span>Target Percentile Selector & Strategy</span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-1">
            Calculate Strategy to Close Percentile Gap
          </h3>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-darkContainer/60 border border-slate-200 dark:border-white/5">
          {presets.map((preset) => (
            <button
              key={preset}
              onClick={() => updateSettings({ targetPercentile: preset })}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all duration-200 cursor-pointer ${
                targetPercentile === preset
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 dark:bg-electric-blue text-white dark:text-darkBg shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/5'
              }`}
            >
              {preset}%
            </button>
          ))}
        </div>
      </div>

      {/* Gap Analysis 3-Column Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-darkContainer/50 border border-slate-200 dark:border-white/5 space-y-1">
          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wide">Current Standing</div>
          <div className="text-xl font-black text-slate-900 dark:text-white">
            {currentPercentile > 0 ? `${currentPercentile}%ile` : '0%ile'}
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Avg Score: {kpis.averageScore} Marks</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-darkContainer/50 border border-slate-200 dark:border-white/5 space-y-1">
          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wide">Target Percentile</div>
          <div className="text-xl font-black text-blue-600 dark:text-electric-blue">
            {targetPercentile}%ile
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Estimated Score Needed: ~{estimatedTargetScore} Marks</p>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-mint/20 space-y-1">
          <div className="text-[11px] text-emerald-700 dark:text-mint font-bold uppercase tracking-wide">Gap to Close</div>
          <div className="text-xl font-black text-emerald-700 dark:text-mint">
            {gap > 0 ? `+${gap.toFixed(1)}%ile` : 'Goal Reached! 🎉'}
          </div>
          <p className="text-xs text-emerald-800/80 dark:text-slate-300 font-medium">
            {gap > 0 ? `Approx +${scoreGap.toFixed(1)} marks boost required` : 'Maintain current consistency'}
          </p>
        </div>
      </div>

      {/* Actionable Strategy Advice */}
      <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-darkContainer/30 border border-purple-200/70 dark:border-white/5 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
          <Sparkles className="w-4 h-4 text-purple-600 dark:text-lavender" />
          <span>Data-Driven Strategy to Reach {targetPercentile}th Percentile</span>
        </div>
        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          {gap > 4 ? (
            `To close the ${gap.toFixed(1)}%ile margin, prioritize eliminating negative marking in General Awareness and General Intelligence. Cutting 4 wrong guesses immediately rescues +10 marks.`
          ) : gap > 0 ? (
            `You are within striking distance of the ${targetPercentile}th percentile. Increase Quantitative Aptitude attempt coverage by 2 questions while preserving reasoning accuracy above 92%.`
          ) : (
            `You are operating at or above your ${targetPercentile}th percentile target. Focus on maintaining timing discipline under exam-day conditions.`
          )}
        </p>
      </div>
    </Card3DTilt>
  );
};
