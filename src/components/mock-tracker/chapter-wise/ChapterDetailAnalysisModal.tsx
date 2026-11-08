import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  Line,
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  ReferenceLine 
} from 'recharts';
import { 
  Trophy, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Sparkles, 
  Calendar, 
  Tag, 
  Edit3, 
  Trash2, 
  Plus,
  TrendingUp,
  TrendingDown,
  Eye,
  Zap,
  Target,
  Minus,
  Check,
  X
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { ChapterMasterySummary, MockTest } from '../../../types/mockTracker';
import { useMocks } from '../../../context/MockContext';
import { useTheme } from '../../../context/ThemeContext';

interface ChapterDetailAnalysisModalProps {
  summary: ChapterMasterySummary | null;
  onClose: () => void;
  onLogTestForChapter: (subject: string, chapter: string) => void;
}

export const ChapterDetailAnalysisModal: React.FC<ChapterDetailAnalysisModalProps> = ({
  summary,
  onClose,
  onLogTestForChapter
}) => {
  const { setEditingMock, setIsAddModalOpen, deleteMock, setViewingMockDetail } = useMocks();
  const { activeTheme } = useTheme();
  const [activeChartTab, setActiveChartTab] = useState<'accuracy' | 'score'>('accuracy');

  if (!summary) return null;

  const isDark = activeTheme === 'dark';

  // Chronological progression list
  const attempts = summary.testAttempts || [];

  // Chart data
  const chartData = attempts.map((att) => ({
    testLabel: `Test #${att.testIndex}`,
    date: att.date,
    accuracy: att.accuracy,
    score: att.score,
    maxMarks: att.maxMarks,
    pace: att.paceSecondsPerQuestion,
    name: att.testName,
    platform: att.platform
  }));

  const getPaceDiagnosis = () => {
    if (summary.avgPaceSeconds <= 45 && summary.avgAccuracy >= 85) {
      return {
        title: 'Mastery Level Speed & Precision 🔥',
        desc: 'You solve questions with high cognitive recall and minimal negative traps. You are ready for high-difficulty mock simulations in this chapter!',
        color: 'text-emerald-700 dark:text-emerald-400'
      };
    }
    if (summary.avgAccuracy < 70) {
      return {
        title: 'Conceptual Gaps Identified ⚠️',
        desc: `Accuracy is ${summary.avgAccuracy}%. Avoid guessing in negative-marking tests and review fundamental formulas before the next drill.`,
        color: 'text-rose-600 dark:text-rose-400'
      };
    }
    return {
      title: 'Solid Core Mechanics 🟢',
      desc: 'Consistent accuracy across tests. Work on mental shortcut calculations to bring average solve time below 45 seconds per question.',
      color: 'text-amber-600 dark:text-amber-400'
    };
  };

  const diagnosis = getPaceDiagnosis();

  return (
    <Modal
      isOpen={Boolean(summary)}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="px-2.5 py-0.5 rounded-lg text-xs font-black bg-emerald-100 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30">
            {summary.subject}
          </span>
          <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white truncate">
            {summary.chapterName}
          </span>
          <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
            ({summary.totalTests} {summary.totalTests === 1 ? 'Test Attempt' : 'Test Attempts'})
          </span>
        </div>
      }
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6">
        
        {/* 1. TOP EXECUTIVE PERFORMANCE SCORECARD */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-darkElevated dark:via-[#13172C] dark:to-darkElevated border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Chapter Performance Summary
                </span>
                {summary.scoreTrend === 'improving' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                    <TrendingUp className="w-3 h-3 stroke-[2.5]" />
                    <span>+{summary.scoreGrowthPercent}% Score Growth</span>
                  </span>
                )}
                {summary.scoreTrend === 'declining' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30">
                    <TrendingDown className="w-3 h-3 stroke-[2.5]" />
                    <span>Score Dip</span>
                  </span>
                )}
              </div>

              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tabular-nums">
                  {summary.avgAccuracy}%
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
                  Avg Accuracy
                </span>
                <span className="text-base sm:text-lg font-black text-emerald-700 dark:text-emerald-400 ml-1">
                  Peak: {summary.bestScore} M
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onLogTestForChapter(summary.subject, summary.chapterName);
              }}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white dark:text-darkBg font-black text-xs shadow-md transition-all self-start sm:self-auto flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Log Test #{summary.totalTests + 1}</span>
            </button>
          </div>

          {/* Key Metrics 4-Box Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center pt-2 border-t border-slate-200/70 dark:border-white/[0.08]">
            <div className="p-3 rounded-xl bg-white dark:bg-darkContainer/50 border border-slate-200/80 dark:border-white/5">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase block">
                Latest Test Score
              </span>
              <span className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-0.5 block tabular-nums">
                {summary.latestScore !== undefined ? `${summary.latestScore}M` : `${summary.avgScore}M`}
                <span className="text-xs font-normal text-slate-400"> / {summary.maxMarks}</span>
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-darkContainer/50 border border-slate-200/80 dark:border-white/5">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase block">
                Average Speed
              </span>
              <span className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-0.5 block tabular-nums">
                {summary.avgPaceSeconds}s <span className="text-xs font-normal text-slate-400">/ Q</span>
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-darkContainer/50 border border-slate-200/80 dark:border-white/5">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase block">
                Correct vs Wrong
              </span>
              <span className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-0.5 block tabular-nums">
                <span className="text-emerald-700 dark:text-emerald-400">{summary.correct}C</span>
                <span className="text-slate-400 font-normal"> / </span>
                <span className="text-rose-600 dark:text-rose-400">{summary.wrong}W</span>
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-darkContainer/50 border border-slate-200/80 dark:border-white/5">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase block">
                Negative Penalty
              </span>
              <span className="text-lg sm:text-xl font-black text-rose-600 dark:text-rose-400 mt-0.5 block tabular-nums">
                -{summary.totalNegativeMarks || 0} <span className="text-xs font-normal text-slate-400">Marks</span>
              </span>
            </div>
          </div>
        </div>

        {/* 2. SPEED & CONCEPT DIAGNOSIS ALERT */}
        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 space-y-1">
          <div className={`flex items-center gap-1.5 text-xs font-black uppercase tracking-wider ${diagnosis.color}`}>
            <Sparkles className="w-4 h-4" />
            <span>{diagnosis.title}</span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            {diagnosis.desc}
          </p>
        </div>

        {/* 3. MULTI-TEST PROGRESSION CHART */}
        {chartData.length > 1 && (
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-darkContainer/40 border border-slate-200 dark:border-white/10 space-y-3">
            <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-bold">
              <div className="flex items-center gap-2">
                <span className="text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  Test-by-Test Trajectory ({chartData.length} Tests)
                </span>
              </div>

              {/* Chart Tabs: Accuracy vs Score */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-white/10 p-0.5 rounded-lg">
                <button
                  type="button"
                  onClick={() => setActiveChartTab('accuracy')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-black transition-all ${
                    activeChartTab === 'accuracy'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Accuracy (%)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveChartTab('score')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-black transition-all ${
                    activeChartTab === 'score'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Score (Marks)
                </button>
              </div>
            </div>

            <div className="h-48 sm:h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="chGradMetric" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.07)' : '#E2E8F0'} />
                  <XAxis 
                    dataKey="testLabel" 
                    stroke={isDark ? '#888' : '#64748b'} 
                    tick={{ fontSize: 11, fontWeight: 'bold' }} 
                  />
                  <YAxis 
                    domain={activeChartTab === 'accuracy' ? [40, 100] : [0, 'auto']} 
                    stroke={isDark ? '#888' : '#64748b'} 
                    tick={{ fontSize: 11 }} 
                    unit={activeChartTab === 'accuracy' ? '%' : ''} 
                  />
                  {activeChartTab === 'accuracy' && (
                    <ReferenceLine 
                      y={85} 
                      stroke="#10B981" 
                      strokeDasharray="4 4" 
                      label={{ value: '85% Mastery', fill: '#10B981', fontSize: 10, position: 'insideTopRight' }} 
                    />
                  )}
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="p-3 rounded-xl bg-white dark:bg-darkSurface border border-slate-200 dark:border-white/10 shadow-xl text-xs space-y-1">
                            <div className="font-black text-slate-900 dark:text-white">{data.name}</div>
                            <div className="text-[11px] text-slate-500">{data.date} • {data.platform}</div>
                            <div className="text-emerald-700 dark:text-emerald-400 font-black">
                              Accuracy: {data.accuracy}%
                            </div>
                            <div className="text-slate-700 dark:text-slate-300 font-bold">
                              Score: {data.score} / {data.maxMarks} M
                            </div>
                            <div className="text-slate-500 font-medium text-[11px]">
                              Pace: {data.pace}s / question
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey={activeChartTab}
                    stroke="#10B981"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#chGradMetric)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* 4. ATTEMPT-BY-ATTEMPT DETAILED COMPARISON TABLE */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
              All Chapter Test Attempts ({attempts.length})
            </h4>
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
              Comparing test scores, accuracy and attempt speed
            </span>
          </div>

          <div className="space-y-2.5">
            {attempts.map((att) => {
              const originalTest = summary.recentTests.find(t => t.id === att.testId);

              return (
                <div
                  key={att.testId}
                  className="p-3.5 sm:p-4 rounded-xl bg-slate-50/80 dark:bg-white/[0.03] border border-slate-200/90 dark:border-white/[0.07] hover:border-emerald-500/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
                >
                  {/* Left: Test Number, Name, Date, Platform */}
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-black bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-slate-200">
                        Test #{att.testIndex}
                      </span>
                      <h5 className="font-black text-slate-900 dark:text-white truncate">
                        {att.testName}
                      </h5>
                      {att.difficulty && (
                        <span className="px-1.5 py-0.5 rounded text-[9.5px] font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                          {att.difficulty}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium text-[11px] flex-wrap">
                      <span>{att.platform}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {att.date}
                      </span>
                      <span>•</span>
                      <span>Time: {att.timeTakenMinutes} mins ({att.paceSecondsPerQuestion}s/Q)</span>
                    </div>

                    {att.notes && (
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 italic pt-0.5">
                        "{att.notes}"
                      </p>
                    )}
                  </div>

                  {/* Middle: Score, Accuracy & Attempt Delta */}
                  <div className="flex items-center gap-4 shrink-0 flex-wrap sm:flex-nowrap">
                    {/* Score & Delta vs Prev */}
                    <div className="text-left sm:text-right">
                      <div className="flex items-baseline gap-1.5 sm:justify-end">
                        <span className="text-sm sm:text-base font-black text-slate-900 dark:text-white tabular-nums">
                          {att.score} / {att.maxMarks} M
                        </span>

                        {att.scoreDeltaVsPrev !== undefined && (
                          <span
                            className={`inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[10px] font-mono font-black ${
                              att.scoreDeltaVsPrev > 0
                                ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                                : att.scoreDeltaVsPrev < 0
                                  ? 'bg-rose-500/15 text-rose-700 dark:text-rose-300'
                                  : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {att.scoreDeltaVsPrev > 0 ? `+${att.scoreDeltaVsPrev}` : `${att.scoreDeltaVsPrev}`}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600 dark:text-slate-400 mt-0.5">
                        <span className={`font-black ${
                          att.accuracy >= 85
                            ? 'text-emerald-700 dark:text-emerald-400'
                            : att.accuracy >= 70
                              ? 'text-amber-600 dark:text-amber-400'
                              : 'text-rose-600'
                        }`}>
                          {att.accuracy}% Acc
                        </span>
                        <span>•</span>
                        <span className="tabular-nums">
                          {att.correct}C / {att.wrong}W / {att.unattempted}U
                        </span>
                      </div>
                    </div>

                    {/* Actions: View Detail, Edit, Delete */}
                    <div className="flex items-center gap-1 border-t sm:border-t-0 sm:border-l border-slate-200 dark:border-white/10 pt-2 sm:pt-0 sm:pl-3">
                      {originalTest && (
                        <button
                          onClick={() => {
                            onClose();
                            setViewingMockDetail(originalTest);
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-200 dark:hover:bg-white/10 cursor-pointer"
                          title="View Full Test Breakdown Drawer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {originalTest && (
                        <button
                          onClick={() => {
                            setEditingMock(originalTest);
                            onClose();
                            setIsAddModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-slate-200 dark:hover:bg-white/10 cursor-pointer"
                          title="Edit Test Result"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <button
                        onClick={() => {
                          if (confirm(`Delete test "${att.testName}"?`)) {
                            deleteMock(att.testId);
                          }
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-500/10 cursor-pointer"
                        title="Delete Test"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </Modal>
  );
};
