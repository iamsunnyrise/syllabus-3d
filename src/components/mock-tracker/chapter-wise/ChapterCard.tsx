import React from 'react';
import { 
  Trophy, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  BarChart2, 
  Plus, 
  Trash2, 
  Tag, 
  ArrowRight,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Minus,
  Activity,
  Zap,
  Target
} from 'lucide-react';
import { ChapterDefinition, ChapterMasterySummary } from '../../../types/mockTracker';
import { useMocks } from '../../../context/MockContext';
import { Card3DTilt } from '../3d/Card3DTilt';
import { Badge } from '../common/Badge';

interface ChapterCardProps {
  chapter: ChapterDefinition;
  summary: ChapterMasterySummary;
  onOpenAnalysis: (chapterName: string) => void;
  onLogTestForChapter: (subjectName: string, chapterName: string) => void;
}

export const ChapterCard: React.FC<ChapterCardProps> = ({
  chapter,
  summary,
  onOpenAnalysis,
  onLogTestForChapter
}) => {
  const { deleteCustomChapter } = useMocks();

  const getStatusBadge = () => {
    switch (summary.masteryStatus) {
      case 'Mastered':
        return (
          <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-emerald-100 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/30 flex items-center gap-1 shadow-2xs">
            <Trophy className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
            <span>Mastered</span>
          </span>
        );
      case 'Strong':
        return (
          <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-amber-100 dark:bg-amber-500/15 text-amber-800 dark:text-amber-400 border border-amber-300 dark:border-amber-500/30 flex items-center gap-1 shadow-2xs">
            <CheckCircle2 className="w-3 h-3 text-amber-600 dark:text-amber-400" />
            <span>Strong</span>
          </span>
        );
      case 'Needs Practice':
        return (
          <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-rose-100 dark:bg-rose-500/15 text-rose-800 dark:text-rose-400 border border-rose-300 dark:border-rose-500/30 flex items-center gap-1 shadow-2xs">
            <AlertTriangle className="w-3 h-3 text-rose-600 dark:text-rose-400" />
            <span>Needs Practice</span>
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10">
            Not Started
          </span>
        );
    }
  };

  const getTrendBadge = () => {
    if (summary.totalTests < 2) return null;

    if (summary.scoreTrend === 'improving') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-black bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
          <TrendingUp className="w-3 h-3 stroke-[2.5]" />
          <span>+{summary.scoreGrowthPercent}% Score Growth</span>
        </span>
      );
    }
    if (summary.scoreTrend === 'declining') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-black bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30">
          <TrendingDown className="w-3 h-3 stroke-[2.5]" />
          <span>Score Dip ({summary.scoreGrowthPercent}%)</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-black bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-white/15">
        <Minus className="w-3 h-3 stroke-[2.5]" />
        <span>Consistent Scores</span>
      </span>
    );
  };

  return (
    <Card3DTilt
      maxTilt={4}
      className="group relative p-4 sm:p-5 rounded-2xl bg-white dark:bg-darkSurface border border-slate-200/90 dark:border-white/10 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 shadow-sm dark:shadow-3d-dark transition-all duration-300 flex flex-col justify-between space-y-4"
    >
      {/* Top Header: Title, Custom Badge & Mastery Badge */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2.5">
          <div className="space-y-1 min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                {chapter.chapterName}
              </h3>
              {chapter.isCustom && (
                <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-emerald-100 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/30">
                  Custom
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 flex-wrap text-xs text-slate-600 dark:text-slate-400 font-medium">
              {summary.totalTests > 0 ? (
                <span className="flex items-center gap-1 font-bold text-slate-700 dark:text-slate-300">
                  <Activity className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{summary.totalTests} {summary.totalTests === 1 ? 'Test Logged' : 'Tests Logged'}</span>
                  <span className="text-slate-400">•</span>
                  <span>{summary.attempted} Qs Attempted</span>
                </span>
              ) : summary.avgAccuracy > 0 ? (
                <span>Calibrated from Syllabus Explorer</span>
              ) : (
                <span>Target: 85%+ Accuracy Mastery</span>
              )}
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-1.5">
            {getStatusBadge()}
            {chapter.isCustom && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm(`Delete custom chapter "${chapter.chapterName}"?`)) {
                    deleteCustomChapter(chapter.subject, chapter.id);
                  }
                }}
                title="Delete Chapter"
                className="p-1 rounded-lg text-slate-400 hover:text-alert-red hover:bg-alert-red/10 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Multi-Test Progress Trend Banner (When multiple tests exist) */}
        {summary.totalTests > 0 && (
          <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100 dark:border-white/[0.06] flex-wrap">
            {getTrendBadge() || (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500 dark:text-slate-400">
                <Target className="w-3 h-3 text-blue-500" />
                <span>1st Baseline Established</span>
              </span>
            )}

            {summary.latestTestDate && (
              <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">
                Latest: {summary.latestTestDate}
              </span>
            )}
          </div>
        )}

        {/* Visual Multi-Test Attempt Trail (Chips showing recent test scores & accuracies) */}
        {summary.testAttempts && summary.testAttempts.length > 0 && (
          <div className="space-y-1 pt-1">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <span>Test Progression History</span>
              <span>{summary.testAttempts.length} Attempt{summary.testAttempts.length > 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
              {summary.testAttempts.slice(-4).map((att) => (
                <div
                  key={att.testId}
                  title={`${att.testName}: ${att.score}/${att.maxMarks} M (${att.accuracy}% Accuracy)`}
                  className={`px-2 py-1 rounded-lg text-[10px] font-bold font-mono flex items-center gap-1 border shrink-0 transition-transform hover:scale-105 cursor-help ${
                    att.accuracy >= 85
                      ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-500/30'
                      : att.accuracy >= 70
                        ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/30'
                        : 'bg-rose-50 dark:bg-rose-500/10 text-rose-800 dark:text-rose-300 border-rose-500/30'
                  }`}
                >
                  <span className="font-sans opacity-60">T#{att.testIndex}:</span>
                  <span className="font-black">{att.score}M</span>
                  <span className="text-[9px] opacity-75">({att.accuracy}%)</span>
                </div>
              ))}
              {summary.testAttempts.length > 4 && (
                <span className="text-[10px] font-bold text-slate-400 shrink-0">
                  +{summary.testAttempts.length - 4} older
                </span>
              )}
            </div>
          </div>
        )}

        {/* Subtopic tags */}
        {chapter.subtopics && chapter.subtopics.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
            {chapter.subtopics.slice(0, 3).map((tag, idx) => (
              <span 
                key={idx}
                className="px-2 py-0.5 rounded-md text-[10px] font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-darkContainer border border-slate-200 dark:border-white/5 line-clamp-1"
              >
                {tag}
              </span>
            ))}
            {chapter.subtopics.length > 3 && (
              <span className="text-[10px] font-bold text-slate-500">
                +{chapter.subtopics.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Accuracy & Speed Progress Block */}
      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-darkContainer/50 border border-slate-200 dark:border-white/5 space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider text-[10px]">
            Accuracy Rate
          </span>
          <span className={`text-sm font-black ${
            summary.avgAccuracy >= 85
              ? 'text-emerald-700 dark:text-emerald-400'
              : summary.avgAccuracy >= 70
                ? 'text-amber-600 dark:text-amber-400'
                : summary.totalTests > 0
                  ? 'text-alert-red'
                  : 'text-slate-400'
          }`}>
            {summary.totalTests > 0 
              ? `${summary.avgAccuracy}%` 
              : summary.avgAccuracy > 0 
                ? `${summary.avgAccuracy}% (Syllabus)` 
                : 'No Attempts'}
          </span>
        </div>

        {/* Accuracy Bar */}
        <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-darkBg overflow-hidden">
          <div
            style={{ width: `${summary.avgAccuracy}%` }}
            className={`h-full transition-all duration-500 ${
              summary.avgAccuracy >= 85
                ? 'bg-emerald-600 dark:bg-emerald-400'
                : summary.avgAccuracy >= 70
                  ? 'bg-amber-500'
                  : 'bg-alert-red'
            }`}
          />
        </div>

        {/* Score & Speed Grid */}
        <div className="grid grid-cols-3 gap-2 pt-1 text-center border-t border-slate-200/60 dark:border-white/5">
          <div className="text-left">
            <span className="text-[9.5px] uppercase font-bold text-slate-500 dark:text-slate-400 block">
              Latest Score
            </span>
            <span className="text-xs sm:text-[13px] font-black text-slate-900 dark:text-white tabular-nums">
              {summary.latestScore !== undefined ? `${summary.latestScore}M` : summary.totalTests > 0 ? `${summary.avgScore}M` : '—'}
            </span>
          </div>

          <div className="text-center">
            <span className="text-[9.5px] uppercase font-bold text-slate-500 dark:text-slate-400 block">
              Best Score
            </span>
            <span className="text-xs sm:text-[13px] font-black text-emerald-700 dark:text-emerald-400 tabular-nums">
              {summary.bestScore > 0 ? `${summary.bestScore}M` : '—'}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[9.5px] uppercase font-bold text-slate-500 dark:text-slate-400 block">
              Avg Pace
            </span>
            <span className="text-xs sm:text-[13px] font-black text-slate-800 dark:text-slate-200 tabular-nums">
              {summary.avgPaceSeconds > 0 ? `${summary.avgPaceSeconds}s/Q` : '—'}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Actions: Log Next Test & Deep Diagnosis */}
      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={() => onLogTestForChapter(chapter.subject, chapter.chapterName)}
          className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white dark:text-darkBg text-xs font-black flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 stroke-[3]" />
          <span>{summary.totalTests > 0 ? `+ Log Test #${summary.totalTests + 1}` : 'Log First Test'}</span>
        </button>

        {summary.totalTests > 0 && (
          <button
            onClick={() => onOpenAnalysis(chapter.chapterName)}
            className="py-2 px-3 rounded-xl border border-slate-200 dark:border-white/10 hover:border-emerald-500/40 bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-white hover:text-emerald-700 dark:hover:text-emerald-400 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
            title="View multi-test comparison, progress chart and diagnosis"
          >
            <BarChart2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Diagnosis ({summary.totalTests})</span>
          </button>
        )}
      </div>
    </Card3DTilt>
  );
};
