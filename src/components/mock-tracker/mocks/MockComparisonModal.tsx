import React from 'react';
import { 
  GitCompare, 
  ArrowUpRight, 
  ArrowDownRight, 
  Minus, 
  CheckCircle2, 
  XCircle,
  Calendar,
  Clock,
  Target
} from 'lucide-react';
import { useMocks } from '../../../context/MockContext';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';

export const MockComparisonModal: React.FC = () => {
  const { 
    isComparisonModalOpen, 
    setIsComparisonModalOpen, 
    selectedMockIds, 
    mocks,
    toggleMockSelection 
  } = useMocks();

  const selectedMocks = mocks.filter(m => selectedMockIds.includes(m.id));

  if (!isComparisonModalOpen || selectedMocks.length < 2) return null;

  const baseMock = selectedMocks[0];
  const targetMock = selectedMocks[1];

  const scoreDiff = targetMock.score - baseMock.score;
  const accDiff = targetMock.accuracy - baseMock.accuracy;
  const percDiff = targetMock.percentile - baseMock.percentile;
  const timeDiff = targetMock.timeTakenMinutes - baseMock.timeTakenMinutes;

  const getDeltaBadge = (diff: number, unit: string = '') => {
    if (diff > 0) {
      return (
        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[11px] font-bold bg-mint/20 text-mint-dark dark:text-mint">
          <ArrowUpRight className="w-3 h-3" />
          +{diff.toFixed(1)}{unit} Improved
        </span>
      );
    }
    if (diff < 0) {
      return (
        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[11px] font-bold bg-alert-red/20 text-alert-red">
          <ArrowDownRight className="w-3 h-3" />
          {diff.toFixed(1)}{unit} Declined
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-500/20 text-slate-400">
        <Minus className="w-3 h-3" />
        No Change
      </span>
    );
  };

  return (
    <Modal
      isOpen={isComparisonModalOpen}
      onClose={() => setIsComparisonModalOpen(false)}
      title={
        <div className="flex items-center gap-2">
          <GitCompare className="w-5 h-5 text-electric-blue" />
          <span>Side-by-Side Mock Test Comparison ({selectedMocks.length} Selected)</span>
        </div>
      }
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6">
        
        {/* Comparison Summary Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-500/10 via-slate-50 to-emerald-500/10 dark:from-electric-blue/15 dark:via-darkContainer dark:to-mint/15 border border-blue-200 dark:border-electric-blue/20 flex flex-wrap items-center justify-between gap-4 shadow-xs">
          <div>
            <div className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Performance Evolution</div>
            <div className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white mt-1">
              Comparing &quot;{baseMock.testName}&quot; vs &quot;{targetMock.testName}&quot;
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {getDeltaBadge(scoreDiff, 'M')}
            {getDeltaBadge(accDiff, '% Acc')}
            {getDeltaBadge(percDiff, '%ile')}
          </div>
        </div>

        {/* Primary Metric Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3 px-3">Metric</th>
                {selectedMocks.map(m => (
                  <th key={m.id} className="py-3 px-3">
                    <div className="text-slate-900 dark:text-white font-bold line-clamp-1">{m.testName}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal font-mono tabular-nums">{m.date} • {m.testPlatform}</div>
                  </th>
                ))}
                {selectedMocks.length === 2 && <th className="py-3 px-3">Net Delta</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {/* Score */}
              <tr>
                <td className="py-3 px-3 font-semibold text-slate-600 dark:text-slate-400">Total Score</td>
                {selectedMocks.map(m => (
                  <td key={m.id} className="py-3 px-3 font-black text-sm text-blue-600 dark:text-electric-blue font-mono tabular-nums">
                    {m.score} / {m.maxMarks}
                  </td>
                ))}
                {selectedMocks.length === 2 && (
                  <td className="py-3 px-3">{getDeltaBadge(scoreDiff, ' Marks')}</td>
                )}
              </tr>

              {/* Percentile */}
              <tr>
                <td className="py-3 px-3 font-semibold text-slate-600 dark:text-slate-400">Percentile</td>
                {selectedMocks.map(m => (
                  <td key={m.id} className="py-3 px-3 font-extrabold text-sm text-purple-600 dark:text-lavender font-mono tabular-nums">
                    {m.percentile}%ile
                  </td>
                ))}
                {selectedMocks.length === 2 && (
                  <td className="py-3 px-3">{getDeltaBadge(percDiff, '%')}</td>
                )}
              </tr>

              {/* Accuracy */}
              <tr>
                <td className="py-3 px-3 font-semibold text-slate-600 dark:text-slate-400">Accuracy</td>
                {selectedMocks.map(m => (
                  <td key={m.id} className="py-3 px-3 font-bold text-emerald-600 dark:text-mint font-mono tabular-nums">
                    {m.accuracy}%
                  </td>
                ))}
                {selectedMocks.length === 2 && (
                  <td className="py-3 px-3">{getDeltaBadge(accDiff, '%')}</td>
                )}
              </tr>

              {/* Attempt Rate */}
              <tr>
                <td className="py-3 px-3 font-semibold text-slate-600 dark:text-slate-400">Attempt Rate</td>
                {selectedMocks.map(m => (
                  <td key={m.id} className="py-3 px-3 font-bold text-slate-800 dark:text-slate-200 font-mono tabular-nums">
                    {m.attemptRate}% ({m.attempted}/{m.totalQuestions} Qs)
                  </td>
                ))}
                {selectedMocks.length === 2 && (
                  <td className="py-3 px-3">{getDeltaBadge(targetMock.attemptRate - baseMock.attemptRate, '%')}</td>
                )}
              </tr>

              {/* Negative Marks */}
              <tr>
                <td className="py-3 px-3 font-semibold text-slate-600 dark:text-slate-400">Negative Loss</td>
                {selectedMocks.map(m => (
                  <td key={m.id} className="py-3 px-3 font-bold text-rose-600 dark:text-alert-red font-mono tabular-nums">
                    -{m.negativeMarks} Marks ({m.wrong} wrong)
                  </td>
                ))}
                {selectedMocks.length === 2 && (
                  <td className="py-3 px-3">{getDeltaBadge(-(targetMock.negativeMarks - baseMock.negativeMarks), 'M')}</td>
                )}
              </tr>

              {/* Time Taken */}
              <tr>
                <td className="py-3 px-3 font-semibold text-slate-600 dark:text-slate-400">Time Taken</td>
                {selectedMocks.map(m => (
                  <td key={m.id} className="py-3 px-3 font-medium text-slate-700 dark:text-slate-300 font-mono tabular-nums">
                    {m.timeTakenMinutes} min / {m.totalTimeMinutes}m
                  </td>
                ))}
                {selectedMocks.length === 2 && (
                  <td className="py-3 px-3">{getDeltaBadge(-timeDiff, 'm')}</td>
                )}
              </tr>

              {/* Cutoff Status */}
              <tr>
                <td className="py-3 px-3 font-semibold text-slate-600 dark:text-slate-400">Cutoff Status</td>
                {selectedMocks.map(m => (
                  <td key={m.id} className="py-3 px-3">
                    <Badge variant={m.isClearedCutoff ? 'success' : 'alert'} size="sm">
                      {m.isClearedCutoff ? 'Cleared ✓' : 'Below ✗'}
                    </Badge>
                  </td>
                ))}
                {selectedMocks.length === 2 && (
                  <td className="py-3 px-3 text-slate-500 dark:text-slate-400 font-medium">
                    {baseMock.isClearedCutoff === targetMock.isClearedCutoff ? 'Consistent' : 'Status Changed'}
                  </td>
                )}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section Comparison Cards */}
        {baseMock.sections.length > 0 && targetMock.sections.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Section Performance Comparison
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {baseMock.sections.map((baseSec) => {
                const targetSec = targetMock.sections.find(s => s.sectionName === baseSec.sectionName);
                if (!targetSec) return null;
                const secScoreDiff = targetSec.score - baseSec.score;

                return (
                  <div
                    key={baseSec.id}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-darkContainer/50 border border-slate-200 dark:border-white/5 space-y-2 shadow-2xs"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                      <span>{baseSec.sectionName}</span>
                      {getDeltaBadge(secScoreDiff, 'M')}
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                      <div className="p-2 rounded-lg bg-white dark:bg-darkSurface border border-slate-200/80 dark:border-white/5 shadow-2xs">
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold truncate">Mock 1</div>
                        <div className="font-black font-mono tabular-nums text-blue-600 dark:text-electric-blue">{baseSec.score} M</div>
                        <div className="text-[10px] font-mono tabular-nums text-emerald-600 dark:text-mint">{baseSec.accuracy}% Acc</div>
                      </div>

                      <div className="p-2 rounded-lg bg-white dark:bg-darkSurface border border-slate-200/80 dark:border-white/5 shadow-2xs">
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold truncate">Mock 2</div>
                        <div className="font-black font-mono tabular-nums text-blue-600 dark:text-electric-blue">{targetSec.score} M</div>
                        <div className="text-[10px] font-mono tabular-nums text-emerald-600 dark:text-mint">{targetSec.accuracy}% Acc</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </Modal>
  );
};
