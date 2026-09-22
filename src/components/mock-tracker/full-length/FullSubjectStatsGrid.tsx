import React from 'react';
import { Clock, CheckCircle2, Award, Zap, BookOpen } from 'lucide-react';
import { useMocks } from '../../../context/MockContext';
import { calculateSubjectStats } from '../../../utils/mockAnalyticsEngine';
import { Card3DTilt } from '../3d/Card3DTilt';
import { Badge } from '../common/Badge';

export const FullSubjectStatsGrid: React.FC = () => {
  const { fullLengthMocks } = useMocks();
  const subjectStats = calculateSubjectStats(fullLengthMocks);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            Subject-Wise Aggregate Performance
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-medium">
            Average accuracy, marks scored, and time allocation across full exam simulations
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {subjectStats.map((sub, idx) => (
          <Card3DTilt
            key={idx}
            maxTilt={4}
            className="p-5 border border-slate-200 dark:border-white/5 rounded-2xl bg-white dark:bg-darkSurface shadow-sm dark:shadow-3d-dark space-y-4"
          >
            {/* Subject Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">{sub.icon}</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                  {sub.label}
                </span>
              </div>

              <Badge
                variant={sub.status === 'Mastered' ? 'success' : sub.status === 'Strong' ? 'primary' : 'alert'}
                size="sm"
              >
                {sub.status}
              </Badge>
            </div>

            {/* Score & Accuracy Progress */}
            <div>
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Avg Score</span>
                <div className="text-lg font-black text-slate-900 dark:text-white">
                  {sub.averageScore} <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">/ {sub.maxMarks} M</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-darkContainer mt-1.5 overflow-hidden">
                <div
                  style={{ width: `${(sub.averageScore / (sub.maxMarks || 50)) * 100}%`, backgroundColor: sub.color }}
                  className="h-full rounded-full transition-all duration-500"
                />
              </div>
            </div>

            {/* Metric Row */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-white/5 text-xs">
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-darkContainer/50 border border-slate-200/60 dark:border-transparent">
                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase">Accuracy</div>
                <div className="text-sm font-black text-emerald-700 dark:text-mint mt-0.5">
                  {sub.averageAccuracy}%
                </div>
              </div>

              <div className="p-2 rounded-xl bg-slate-50 dark:bg-darkContainer/50 border border-slate-200/60 dark:border-transparent">
                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase">Avg Time</div>
                <div className="text-sm font-black text-blue-600 dark:text-electric-blue mt-0.5 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{sub.averageTimeMinutes}m</span>
                </div>
              </div>
            </div>
          </Card3DTilt>
        ))}
      </div>
    </div>
  );
};
