import React from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  Edit3, 
  Copy, 
  Trash2, 
  Award, 
  Target, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  FileText
} from 'lucide-react';
import { useMocks } from '../../../context/MockContext';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';

export const MockDetailDrawer: React.FC = () => {
  const { 
    viewingMockDetail, 
    setViewingMockDetail, 
    setEditingMock, 
    setIsAddModalOpen, 
    duplicateMock, 
    deleteMock 
  } = useMocks();

  if (!viewingMockDetail) return null;

  const mock = viewingMockDetail;
  const cutoffDiff = mock.score - mock.cutoffMarks;

  return (
    <Modal
      isOpen={Boolean(viewingMockDetail)}
      onClose={() => setViewingMockDetail(null)}
      title={
        <div className="flex items-center gap-2">
          <Badge variant={mock.isClearedCutoff ? 'success' : 'alert'} size="sm">
            {mock.isClearedCutoff ? 'Cutoff Cleared ✓' : 'Below Cutoff ✗'}
          </Badge>
          <span className="truncate">{mock.testName}</span>
        </div>
      }
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6">
        
        {/* Top Header Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-500/10 via-slate-50 to-emerald-500/10 dark:from-electric-blue/10 dark:via-darkContainer dark:to-mint/10 border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-sans font-medium">
              <span className="font-bold text-blue-600 dark:text-electric-blue">{mock.testPlatform}</span>
              <span>•</span>
              <span>{mock.exam} ({mock.tier})</span>
              <span>•</span>
              <span className="flex items-center gap-1 tabular-nums">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {mock.date}
              </span>
            </div>

            <div className="mt-2 flex items-baseline gap-3">
              <span className="text-3xl font-black font-sans tabular-nums text-slate-900 dark:text-white">
                {mock.score}
              </span>
              <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 font-sans tabular-nums">
                / {mock.maxMarks} Marks
              </span>
              <span className={`text-xs font-bold font-sans tabular-nums px-2 py-0.5 rounded-full ${
                mock.isClearedCutoff ? 'bg-emerald-500/15 text-emerald-700 dark:text-mint border border-emerald-500/30' : 'bg-rose-500/15 text-rose-700 dark:text-alert-red border border-rose-500/30'
              }`}>
                {cutoffDiff >= 0 ? `+${cutoffDiff.toFixed(1)} Buffer` : `${cutoffDiff.toFixed(1)} Below Cutoff`}
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setEditingMock(mock);
                setViewingMockDetail(null);
                setIsAddModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-200/70 hover:bg-slate-300/80 dark:bg-white/10 dark:hover:bg-white/15 text-slate-800 dark:text-white font-bold text-xs transition-all cursor-pointer active:scale-95"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>

            <button
              onClick={() => {
                duplicateMock(mock.id);
                setViewingMockDetail(null);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-200/70 hover:bg-slate-300/80 dark:bg-white/10 dark:hover:bg-white/15 text-slate-800 dark:text-white font-bold text-xs transition-all cursor-pointer active:scale-95"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Duplicate</span>
            </button>

            <button
              onClick={() => {
                if (confirm(`Delete mock "${mock.testName}"?`)) {
                  deleteMock(mock.id);
                  setViewingMockDetail(null);
                }
              }}
              className="p-2 rounded-xl bg-rose-500/10 text-rose-600 dark:text-alert-red hover:bg-rose-500/20 transition-all cursor-pointer active:scale-95"
              title="Delete mock"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 6 Key Analytics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
          <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/5 text-center">
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Percentile</div>
            <div className="text-lg font-black font-sans tabular-nums text-purple-600 dark:text-lavender mt-0.5">{mock.percentile}%ile</div>
          </div>

          <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/5 text-center">
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Accuracy</div>
            <div className="text-lg font-black font-sans tabular-nums text-emerald-600 dark:text-mint mt-0.5">{mock.accuracy}%</div>
          </div>

          <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/5 text-center">
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Attempt Rate</div>
            <div className="text-lg font-black font-sans tabular-nums text-blue-600 dark:text-electric-blue mt-0.5">{mock.attemptRate}%</div>
          </div>

          <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/5 text-center">
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Time Taken</div>
            <div className="text-lg font-black font-sans tabular-nums text-slate-900 dark:text-white mt-0.5">{mock.timeTakenMinutes}/{mock.totalTimeMinutes}m</div>
          </div>

          <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/5 text-center">
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Negative Drain</div>
            <div className="text-lg font-black font-sans tabular-nums text-rose-600 dark:text-alert-red mt-0.5">-{mock.negativeMarks} M</div>
          </div>

          <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/5 text-center">
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">AIR Rank</div>
            <div className="text-lg font-black font-sans tabular-nums text-slate-900 dark:text-white mt-0.5">
              {mock.rank ? `#${mock.rank}` : 'N/A'}
            </div>
          </div>
        </div>

        {/* Question Breakdown Strip */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/5 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold font-sans">
            <span className="text-slate-500 dark:text-slate-400 uppercase tracking-wider">Question Distribution</span>
            <span className="text-slate-800 dark:text-slate-200 tabular-nums">{mock.totalQuestions} Total Questions</span>
          </div>

          {/* Layered Progress Bar */}
          <div className="w-full h-3 rounded-full bg-darkBg overflow-hidden flex">
            <div
              style={{ width: `${(mock.correct / mock.totalQuestions) * 100}%` }}
              className="h-full bg-mint-dark dark:bg-mint"
              title={`Correct: ${mock.correct}`}
            />
            <div
              style={{ width: `${(mock.wrong / mock.totalQuestions) * 100}%` }}
              className="h-full bg-alert-red"
              title={`Wrong: ${mock.wrong}`}
            />
            <div
              style={{ width: `${(mock.unattempted / mock.totalQuestions) * 100}%` }}
              className="h-full bg-slate-600"
              title={`Unattempted: ${mock.unattempted}`}
            />
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <div className="flex items-center gap-1.5 text-mint-dark dark:text-mint font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{mock.correct} Correct</span>
            </div>
            <div className="flex items-center gap-1.5 text-alert-red font-bold">
              <XCircle className="w-3.5 h-3.5" />
              <span>{mock.wrong} Wrong (-{mock.negativeMarks} marks)</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400 font-medium">
              <span>{mock.unattempted} Unattempted</span>
            </div>
          </div>
        </div>

        {/* Section-Wise Breakdown Table */}
        {mock.sections.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Section Breakdown ({mock.sections.length} Sections)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {mock.sections.map((sec) => (
                <div
                  key={sec.id}
                  className="p-3.5 sm:p-4 rounded-xl bg-slate-50 dark:bg-darkContainer/50 border border-slate-200 dark:border-white/5 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {sec.sectionName}
                    </span>
                    <Badge 
                      variant={sec.accuracy >= 85 ? 'success' : sec.accuracy >= 70 ? 'primary' : 'alert'}
                      size="sm"
                    >
                      {sec.status}
                    </Badge>
                  </div>

                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="text-lg font-black font-sans tabular-nums text-blue-600 dark:text-electric-blue">
                        {sec.score} <span className="text-xs text-slate-400 font-normal">/ {sec.maxMarks} M</span>
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
                        <span className="tabular-nums font-semibold">{sec.correct}</span> correct, <span className="tabular-nums font-semibold">{sec.wrong}</span> wrong, <span className="tabular-nums font-semibold">{sec.unattempted}</span> skipped
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-extrabold font-sans tabular-nums text-emerald-600 dark:text-mint">
                        {sec.accuracy}% Acc
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 justify-end font-sans">
                        <Clock className="w-3 h-3" />
                        <span className="tabular-nums">{sec.timeTakenMinutes}m spent</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Self Reflection & Notes */}
        {mock.analysisNotes && (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-darkContainer/30 border border-slate-200 dark:border-white/5 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-electric-blue">
              <FileText className="w-3.5 h-3.5" />
              <span>Aspirant Self Reflection & Notes</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
              {mock.analysisNotes}
            </p>
          </div>
        )}

      </div>
    </Modal>
  );
};
