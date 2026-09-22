import React from 'react';
import { AlertTriangle, TrendingDown, Clock, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { useMocks } from '../../../context/MockContext';
import { Card3DTilt } from '../3d/Card3DTilt';
import { Badge } from '../common/Badge';

export const WeakSectionDiagnostic: React.FC = () => {
  const { weakSections, subjectStats } = useMocks();

  const strongestSubject = subjectStats.length > 0
    ? [...subjectStats].sort((a, b) => b.averageAccuracy - a.averageAccuracy)[0]
    : null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-alert-red">
            <AlertTriangle className="w-4 h-4" />
            <span>Algorithmic Diagnosis & Weak-Area Detection</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1">
            Weak Section & Negative Mark Leak Detection
          </h3>
        </div>
      </div>

      {/* Strongest vs Weakest Summary Card */}
      {strongestSubject && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Strongest Section */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-mint/10 to-transparent border border-mint/20 flex items-center justify-between gap-4">
            <div>
              <div className="text-[10px] font-bold text-mint-dark dark:text-mint uppercase tracking-wider flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Strongest Subject Pillar</span>
              </div>
              <div className="text-base font-extrabold text-slate-900 dark:text-white mt-1">
                {strongestSubject.label}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-medium font-mono">
                <span className="tabular-nums">{strongestSubject.averageAccuracy}%</span> Accuracy • <span className="tabular-nums">{strongestSubject.averageScore} / {strongestSubject.maxMarks}</span> M avg
              </p>
            </div>
            <div className="text-2xl font-black text-mint-dark dark:text-mint">
              {strongestSubject.icon}
            </div>
          </div>

          {/* Weakest Section */}
          {weakSections.length > 0 ? (
            <div className="p-4 rounded-2xl bg-gradient-to-br from-alert-red/10 to-transparent border border-alert-red/20 flex items-center justify-between gap-4">
              <div>
                <div className="text-[10px] font-bold text-alert-red uppercase tracking-wider flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Primary Bottleneck Section</span>
                </div>
                <div className="text-base font-extrabold text-slate-900 dark:text-white mt-1">
                  {weakSections[0].sectionName}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-medium font-mono">
                  <span className="tabular-nums">{weakSections[0].averageAccuracy}%</span> Accuracy • <span className="tabular-nums">{weakSections[0].averageAttemptRate}%</span> Attempt Rate
                </p>
              </div>
              <div className="text-2xl font-black text-alert-red">
                ⚠️
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-darkContainer/40 border border-emerald-200 dark:border-white/5 flex items-center justify-between gap-4">
              <div>
                <div className="text-[11px] font-black text-emerald-700 dark:text-mint uppercase tracking-wider">
                  No Critical Weaknesses
                </div>
                <div className="text-sm font-black text-slate-900 dark:text-white mt-1">Balanced Performance</div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-medium">All sections maintain &gt;75% accuracy</p>
              </div>
              <div className="text-2xl">🎉</div>
            </div>
          )}
        </div>
      )}

      {/* Detailed Weak Section Diagnosis Cards */}
      {weakSections.length > 0 && (
        <div className="space-y-3">
          {weakSections.map((diag, idx) => (
            <Card3DTilt
              key={idx}
              maxTilt={3}
              className="p-5 border border-alert-red/30 rounded-2xl bg-white dark:bg-darkSurface shadow-sm dark:shadow-3d-dark space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-alert-red animate-pulse" />
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {diag.sectionName}
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="alert" size="sm">
                    {diag.averageAccuracy}% Accuracy
                  </Badge>
                  <Badge variant="warning" size="sm">
                    Time Drag: {diag.timeInefficiency}
                  </Badge>
                </div>
              </div>

              {/* Specific Diagnosis Reasons */}
              <div className="space-y-1.5 pt-1 text-xs">
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Identified Bottlenecks:
                </div>
                <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 text-xs space-y-1 font-medium">
                  {diag.reasons.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>

              {/* Actionable Remedy */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-darkContainer/60 border border-slate-200 dark:border-white/5 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2 font-medium">
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-electric-blue shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-blue-600 dark:text-electric-blue">Remedy Action: </span>
                  {diag.recommendation}
                </div>
              </div>
            </Card3DTilt>
          ))}
        </div>
      )}
    </div>
  );
};
