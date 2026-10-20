import React, { useMemo } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ReferenceLine 
} from 'recharts';
import { Zap } from 'lucide-react';
import { MockTest } from '../../../types/mockTracker';
import { useTheme } from '../../../context/ThemeContext';
import { Card3DTilt } from '../3d/Card3DTilt';

interface SectionalTrendChartProps {
  mocks: MockTest[];
  subjectTitle: string;
}

export const SectionalTrendChart: React.FC<SectionalTrendChartProps> = ({ mocks, subjectTitle }) => {
  const { activeTheme } = useTheme();

  const chartData = useMemo(() => {
    const sorted = [...mocks].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    return sorted.map((m, idx) => ({
      index: idx + 1,
      name: `Drill #${idx + 1}`,
      fullName: m.testName,
      date: m.date,
      score: m.score,
      maxMarks: m.maxMarks || 50,
      accuracy: m.accuracy,
      percentile: m.percentile,
      subject: m.subjectName || m.sections[0]?.sectionName || 'Subject',
      platform: m.testPlatform
    }));
  }, [mocks]);

  // Dynamic max score benchmark calculation (adapts to Banking 35M, Railways 30M, SSC 50M, NDA 300M, etc.)
  const maxPossibleScore = useMemo(() => {
    if (chartData.length === 0) return 50;
    const maxVal = Math.max(...chartData.map(d => Math.max(d.score, d.maxMarks)));
    return Math.max(20, maxVal);
  }, [chartData]);

  const target70 = Math.round(maxPossibleScore * 0.70);
  const elite90 = Math.round(maxPossibleScore * 0.90);

  const isDark = activeTheme === 'dark';

  return (
    <Card3DTilt
      maxTilt={2}
      className={`p-6 border rounded-3xl transition-colors shadow-sm dark:shadow-3d-dark ${
        isDark ? 'bg-darkSurface border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-emerald-600 dark:text-mint" />
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
              {subjectTitle} Drill Trajectory
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-medium">
            Score and accuracy progression across {chartData.length} sectional drills ({maxPossibleScore} Marks benchmark)
          </p>
        </div>
      </div>

      {chartData.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-slate-500 dark:text-slate-400 text-sm font-medium">
          No sectional drills recorded for this subject filter.
        </div>
      ) : (
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 12, right: 15, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="sectionalScoreGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#BEFFCC" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="#BEFFCC" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(15, 23, 42, 0.06)"} 
              />

              <XAxis 
                dataKey="index" 
                tickFormatter={(v) => `D#${v}`}
                stroke={isDark ? "#64748B" : "#94A3B8"}
                fontSize={11}
                tickLine={false}
              />

              <YAxis 
                domain={[0, Math.ceil(maxPossibleScore * 1.08)]}
                stroke={isDark ? "#64748B" : "#94A3B8"}
                fontSize={11}
                tickLine={false}
              />

              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="p-3.5 rounded-xl bg-white/95 dark:bg-darkSurface/95 border border-slate-200/90 dark:border-white/10 shadow-2xl backdrop-blur-md text-xs space-y-1.5">
                        <div className="font-bold text-slate-900 dark:text-white">{data.fullName}</div>
                        <div className="text-slate-500 dark:text-slate-400 text-[11px]">
                          {data.platform} • {data.date} • {data.subject}
                        </div>
                        <div className="pt-1 flex items-center justify-between gap-4 font-bold text-sm">
                          <span className="text-slate-500 dark:text-slate-400">Score:</span>
                          <span className="text-emerald-700 dark:text-mint">{data.score} / {data.maxMarks} M</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                          <span>Accuracy:</span>
                          <span className="text-sky-700 dark:text-electric-blue font-bold">{data.accuracy}%</span>
                        </div>
                        {data.percentile !== undefined && data.percentile >= 0 && (
                          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                            <span>Percentile:</span>
                            <span className="text-purple-700 dark:text-lavender font-bold">{data.percentile}%ile</span>
                          </div>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />

              {/* Dynamic 70% Target Benchmark */}
              <ReferenceLine 
                y={target70} 
                stroke="#6EC2FD" 
                strokeDasharray="4 4" 
                label={{ 
                  value: `Target 70% (${target70} M)`, 
                  fill: '#6EC2FD', 
                  fontSize: 10, 
                  position: 'insideTopLeft' 
                }} 
              />

              {/* Dynamic 90% Elite Benchmark */}
              <ReferenceLine 
                y={elite90} 
                stroke="#34D399" 
                strokeDasharray="3 3" 
                label={{ 
                  value: `Elite 90% (${elite90} M)`, 
                  fill: '#34D399', 
                  fontSize: 10, 
                  position: 'insideTopRight' 
                }} 
              />

              <Area
                type="monotone"
                dataKey="score"
                stroke="#BEFFCC"
                strokeWidth={3}
                fill="url(#sectionalScoreGradient)"
                activeDot={{ r: 6, fill: '#BEFFCC', stroke: '#FFFFFF', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card3DTilt>
  );
};
