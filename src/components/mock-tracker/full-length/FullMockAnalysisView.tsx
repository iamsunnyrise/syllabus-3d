import React from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  Award, 
  Target, 
  TrendingUp, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Sparkles,
  Zap,
  ArrowRight,
  Flame
} from 'lucide-react';
import { MockTest } from '../../../types/mockTracker';
import { useMocks } from '../../../context/MockContext';
import { generateIndividualMockVerdict } from '../../../utils/mockFeedbackEngine';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';

interface FullMockAnalysisViewProps {
  mock: MockTest | null;
  onClose: () => void;
}

export const FullMockAnalysisView: React.FC<FullMockAnalysisViewProps> = ({ mock, onClose }) => {
  const { mocks, setEditingMock, setIsAddModalOpen } = useMocks();

  if (!mock) return null;

  const verdict = generateIndividualMockVerdict(mock, mocks);
  const cutoffBuffer = mock.score - mock.cutoffMarks;

  // Time Analysis
  const sortedSectionsByTime = [...mock.sections].sort((a, b) => b.timeTakenMinutes - a.timeTakenMinutes);
  const slowestSec = sortedSectionsByTime[0];
  const fastestSec = sortedSectionsByTime[sortedSectionsByTime.length - 1];
  const avgSecondsPerQuestion = mock.attempted > 0 
    ? ((mock.timeTakenMinutes * 60) / mock.attempted).toFixed(0) 
    : '0';

  return (
    <Modal
      isOpen={Boolean(mock)}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <Badge variant={mock.isClearedCutoff ? 'success' : 'alert'} size="sm">
            {mock.isClearedCutoff ? 'Cutoff Cleared ✓' : 'Below Cutoff ✗'}
          </Badge>
          <span className="truncate">{mock.testName} (Full Analysis)</span>
        </div>
      }
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6">
        
        {/* Top Header Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-50 via-white to-sky-50 dark:from-darkElevated dark:via-darkSurface dark:to-darkContainer border border-slate-200 dark:border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span className="font-bold text-blue-600 dark:text-electric-blue">{mock.testPlatform}</span>
              <span>•</span>
              <span className="text-slate-700 dark:text-slate-300 font-semibold">{mock.exam} ({mock.tier})</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-mono tabular-nums">{mock.date}</span>
              </span>
            </div>

            <div className="mt-2.5 flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-mono tabular-nums">
                {mock.score}
              </span>
              <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 font-mono">
                / <span className="tabular-nums">{mock.maxMarks}</span> Marks
              </span>
              <span className="text-xl font-black text-purple-600 dark:text-lavender ml-2 font-mono tabular-nums">
                {mock.percentile}%ile
              </span>
            </div>

            <div className="mt-2 flex items-center gap-3 text-xs">
              <span className={`font-bold font-mono ${cutoffBuffer >= 0 ? 'text-emerald-600 dark:text-mint' : 'text-rose-600 dark:text-alert-red'}`}>
                {cutoffBuffer >= 0 ? `+${cutoffBuffer.toFixed(1)} Marks Above Cutoff` : `${cutoffBuffer.toFixed(1)} Below Cutoff`}
              </span>
              {mock.rank && (
                <>
                  <span className="text-slate-300 dark:text-slate-600">•</span>
                  <span className="text-slate-700 dark:text-slate-300 font-semibold font-mono">
                    AIR Rank <span className="tabular-nums font-bold text-slate-900 dark:text-white">#{mock.rank}</span> of <span className="tabular-nums">{mock.totalStudents || '15k+'}</span>
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Quick Edit */}
          <button
            onClick={() => {
              setEditingMock(mock);
              onClose();
              setIsAddModalOpen(true);
            }}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white dark:bg-electric-blue dark:text-darkBg font-bold text-xs hover:opacity-95 transition-all self-start md:self-auto shadow-xs tap-bounce active:scale-95 cursor-pointer"
          >
            Edit Record
          </button>
        </div>

        {/* 1. Algorithmic Performance Verdict */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-500/10 via-slate-50 to-emerald-500/10 dark:from-electric-blue/15 dark:via-darkContainer dark:to-mint/15 border border-blue-200 dark:border-electric-blue/30 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-electric-blue">
            <Sparkles className="w-4 h-4 fill-current" />
            <span>Automated Performance Intelligence Verdict</span>
          </div>

          <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">
            &quot;{verdict.summary}&quot;
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-3.5 rounded-xl bg-white dark:bg-darkSurface/60 border border-emerald-500/25 dark:border-mint/20 space-y-1.5 shadow-2xs">
              <div className="font-bold text-emerald-700 dark:text-mint flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Key Pillars & Strengths</span>
              </div>
              <ul className="list-disc list-inside text-slate-700 dark:text-slate-200 text-xs space-y-1 leading-snug">
                {verdict.keyStrengths.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-darkSurface/60 border border-rose-500/25 dark:border-alert-red/20 space-y-1.5 shadow-2xs">
              <div className="font-bold text-rose-700 dark:text-alert-red flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>Areas Requiring Focus</span>
              </div>
              <ul className="list-disc list-inside text-slate-700 dark:text-slate-200 text-xs space-y-1 leading-snug">
                {verdict.criticalWeaknesses.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 2. Section Performance Cards */}
        {mock.sections.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Section-by-Section Examination Breakdown
              </h4>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono font-semibold tabular-nums">{mock.sections.length} Sections</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {mock.sections.map((sec) => (
                <div
                  key={sec.id}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-darkContainer/50 border border-slate-200 dark:border-white/5 space-y-3 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                      {sec.sectionName}
                    </span>
                    <Badge
                      variant={sec.accuracy >= 85 ? 'success' : sec.accuracy >= 70 ? 'primary' : 'alert'}
                      size="sm"
                    >
                      {sec.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 rounded-lg bg-white dark:bg-darkSurface border border-slate-200/80 dark:border-white/5 shadow-2xs">
                      <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">Score</div>
                      <div className="font-black font-mono tabular-nums text-blue-600 dark:text-electric-blue mt-0.5">
                        {sec.score} <span className="text-[9px] text-slate-400 font-normal">/{sec.maxMarks}</span>
                      </div>
                    </div>

                    <div className="p-2 rounded-lg bg-white dark:bg-darkSurface border border-slate-200/80 dark:border-white/5 shadow-2xs">
                      <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">Accuracy</div>
                      <div className="font-black font-mono tabular-nums text-emerald-600 dark:text-mint mt-0.5">
                        {sec.accuracy}%
                      </div>
                    </div>

                    <div className="p-2 rounded-lg bg-white dark:bg-darkSurface border border-slate-200/80 dark:border-white/5 shadow-2xs">
                      <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">Time</div>
                      <div className="font-black font-mono tabular-nums text-slate-900 dark:text-white mt-0.5">
                        {sec.timeTakenMinutes}m
                      </div>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-600 dark:text-slate-400 flex items-center justify-between pt-1 font-mono">
                    <span>
                      <span className="tabular-nums font-semibold text-slate-800 dark:text-slate-200">{sec.correct}</span> correct • <span className="tabular-nums font-semibold text-slate-800 dark:text-slate-200">{sec.wrong}</span> wrong • <span className="tabular-nums font-semibold text-slate-800 dark:text-slate-200">{sec.unattempted}</span> skipped
                    </span>
                    <span className="font-bold text-slate-800 dark:text-slate-200 tabular-nums">
                      {sec.totalQuestions > 0 ? ((sec.attempted / sec.totalQuestions) * 100).toFixed(0) : 0}% Attempted
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Time Management Analysis */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-darkContainer/40 border border-slate-200 dark:border-white/5 space-y-4 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-400">
            <Clock className="w-4 h-4 text-blue-600 dark:text-electric-blue" />
            <span>Time Management & Efficiency</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-white dark:bg-darkSurface border border-slate-200/80 dark:border-white/5 shadow-2xs">
              <div className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold tracking-wider">Average Pace</div>
              <div className="text-base font-black font-mono tabular-nums text-slate-900 dark:text-white mt-1">
                {avgSecondsPerQuestion} seconds
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">per attempted question</p>
            </div>

            {slowestSec && (
              <div className="p-3 rounded-xl bg-white dark:bg-darkSurface border border-slate-200/80 dark:border-white/5 shadow-2xs">
                <div className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold tracking-wider">Slowest Section</div>
                <div className="text-sm font-black text-amber-600 dark:text-amberAccent mt-1 truncate">
                  {slowestSec.sectionName}
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
                  <span className="tabular-nums font-semibold">{slowestSec.timeTakenMinutes}m</span> spent total
                </p>
              </div>
            )}

            {fastestSec && (
              <div className="p-3 rounded-xl bg-white dark:bg-darkSurface border border-slate-200/80 dark:border-white/5 shadow-2xs">
                <div className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold tracking-wider">Fastest Section</div>
                <div className="text-sm font-black text-emerald-600 dark:text-mint mt-1 truncate">
                  {fastestSec.sectionName}
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
                  <span className="tabular-nums font-semibold">{fastestSec.timeTakenMinutes}m</span> spent total
                </p>
              </div>
            )}
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 italic font-medium">
            Verdict: {verdict.paceVerdict}
          </p>
        </div>

      </div>
    </Modal>
  );
};
