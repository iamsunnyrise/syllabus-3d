import React, { useMemo } from 'react';
import { Zap, Target, Award, CheckCircle2, Clock, Flame, Layers } from 'lucide-react';
import { MockTest, SectionName } from '../../../types/mockTracker';
import { StatCard } from '../common/StatCard';
import { SubjectTabItem, getSubjectMeta, discoverSectionalSubjects } from '../../../utils/sectionalSubjectUtils';

interface SectionalDashboardProps {
  selectedSubject: SectionName | 'ALL';
  onSelectSubject: (subject: SectionName | 'ALL') => void;
  allSectionalMocks: MockTest[];
  activeMocks: MockTest[];
  subjectTabs?: SubjectTabItem[];
}

export const SectionalDashboard: React.FC<SectionalDashboardProps> = ({
  selectedSubject,
  onSelectSubject,
  allSectionalMocks,
  activeMocks,
  subjectTabs
}) => {
  const isAll = selectedSubject === 'ALL';

  const totalDrills = activeMocks.length;
  const avgScore = totalDrills > 0
    ? Number((activeMocks.reduce((sum, m) => sum + m.score, 0) / totalDrills).toFixed(1))
    : 0;

  const avgAccuracy = totalDrills > 0
    ? Number((activeMocks.reduce((sum, m) => sum + m.accuracy, 0) / totalDrills).toFixed(1))
    : 0;

  const bestScore = totalDrills > 0
    ? Math.max(...activeMocks.map(m => m.score))
    : 0;

  const totalAttemptedQuestions = activeMocks.reduce((sum, m) => sum + m.attempted, 0);
  const totalQuestions = activeMocks.reduce((sum, m) => sum + m.totalQuestions, 0);
  const totalTimeMinutes = activeMocks.reduce((sum, m) => sum + m.timeTakenMinutes, 0);
  const avgSecondsPerQuestion = totalAttemptedQuestions > 0
    ? ((totalTimeMinutes * 60) / totalAttemptedQuestions).toFixed(0)
    : '0';

  const cutoffClearedCount = activeMocks.filter(m => m.isClearedCutoff).length;
  const cutoffRate = totalDrills > 0
    ? Number(((cutoffClearedCount / totalDrills) * 100).toFixed(0))
    : 0;

  // Dynamic Benchmark / Max Marks
  const maxMarksList = useMemo(() => activeMocks.map(m => m.maxMarks || 50), [activeMocks]);
  const benchmarkMarks = useMemo(() => {
    if (maxMarksList.length === 0) return 50;
    return Math.max(...maxMarksList);
  }, [maxMarksList]);

  const isUniformMaxMarks = useMemo(() => {
    return maxMarksList.length > 0 && maxMarksList.every(v => v === maxMarksList[0]);
  }, [maxMarksList]);

  const avgQuestionsPerDrill = totalDrills > 0 ? Math.round(totalQuestions / totalDrills) : 25;

  // Top Subject buttons dynamically gathered
  const topSubjects = useMemo(() => {
    if (subjectTabs && subjectTabs.length > 0) {
      return subjectTabs.filter(t => t.id !== 'ALL').slice(0, 4);
    }
    const discovered = discoverSectionalSubjects(allSectionalMocks);
    return discovered.filter(t => t.id !== 'ALL').slice(0, 4);
  }, [subjectTabs, allSectionalMocks]);

  const selectedMeta = useMemo(() => {
    return isAll ? null : getSubjectMeta(selectedSubject);
  }, [isAll, selectedSubject]);

  const subjectShortTitle = isAll ? 'All Sectional' : (selectedMeta?.shortName || selectedSubject);

  return (
    <div className="space-y-4">
      {/* Top Sectional Highlights Banner */}
      <div className="p-6 rounded-3xl bg-white dark:bg-darkElevated border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-mint/15 border border-emerald-300 dark:border-mint/30 text-emerald-800 dark:text-mint text-xs font-black uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" />
              <span>{isAll ? 'Single-Subject Speed & Accuracy Drills' : `${subjectShortTitle} Intelligence Center`}</span>
            </span>
            {!isAll && (
              <button
                type="button"
                onClick={() => onSelectSubject('ALL')}
                className="text-xs font-bold text-sky-700 dark:text-electric-blue hover:underline px-2.5 py-0.5 rounded-full bg-sky-100 dark:bg-electric-blue/10 border border-sky-200 dark:border-electric-blue/20 cursor-pointer"
              >
                Reset to All Subjects ↺
              </button>
            )}
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-2">
            {isAll ? 'Sectional Mocks & Subject Intelligence' : `${subjectShortTitle} Drill Analysis & Metrics`}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mt-1 font-medium">
            {isAll
              ? `Dedicated speed pacing, accuracy, and error tracking across ~${avgQuestionsPerDrill}-question drills. Select any subject tab below to isolate analytics.`
              : `Showing dedicated performance, speed pacing, accuracy, and test trajectory exclusively for ${subjectShortTitle}.`}
          </p>
        </div>

        {/* Dynamic Subject Quick-Filter Chips */}
        {topSubjects.length > 0 && (
          <div className="grid grid-cols-2 gap-2 shrink-0 text-xs font-bold min-w-[280px]">
            {topSubjects.map((subTab) => {
              const isSelected = selectedSubject.toLowerCase() === subTab.id.toLowerCase();
              return (
                <button
                  key={subTab.id}
                  type="button"
                  onClick={() => onSelectSubject(isSelected ? 'ALL' : (subTab.id as SectionName))}
                  className={`px-3 py-2 rounded-xl border flex items-center justify-between gap-2.5 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-electric-blue text-darkBg border-electric-blue shadow-glow-blue scale-[1.02]'
                      : 'bg-slate-50 dark:bg-darkSurface text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border-slate-200 dark:border-white/10 hover:border-slate-300'
                  }`}
                >
                  <span className="flex items-center gap-1.5 truncate">
                    <span>{subTab.icon}</span>
                    <span className="truncate">{subTab.shortLabel}</span>
                  </span>
                  <span
                    className={`font-black text-xs px-1.5 py-0.5 rounded-md shrink-0 ${
                      isSelected
                        ? 'bg-darkBg/25 text-darkBg'
                        : subTab.count > 0
                          ? 'bg-emerald-100 dark:bg-mint/20 text-emerald-800 dark:text-mint'
                          : 'bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {subTab.count}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 7 Sectional Metric Cards (Dynamic benchmarks & unit calculations!) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 sm:gap-4">
        <StatCard
          title={isAll ? 'Sectional Drills' : `${subjectShortTitle} Drills`}
          value={totalDrills}
          subtitle={isAll ? 'Total single tests' : `${subjectShortTitle} sessions`}
          icon={<Zap className="w-4 h-4 text-emerald-600 dark:text-mint" />}
          accentColor="#BEFFCC"
        />

        <StatCard
          title="Avg Score"
          value={avgScore > 0 ? `${avgScore}` : '0'}
          subtitle={isUniformMaxMarks ? `Average score / ${benchmarkMarks}` : `Average drill score`}
          icon={<Target className="w-4 h-4 text-sky-600 dark:text-electric-blue" />}
          accentColor="#38BDF8"
        />

        <StatCard
          title="Avg Accuracy"
          value={avgAccuracy > 0 ? `${avgAccuracy}%` : '0%'}
          subtitle={`${subjectShortTitle} accuracy`}
          icon={<CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-mint" />}
          accentColor="#5EE88A"
          trend={avgAccuracy >= 88 ? { value: 'Target', isPositive: true } : undefined}
        />

        <StatCard
          title="Avg Speed / Pace"
          value={`${avgSecondsPerQuestion}s`}
          subtitle="Seconds per question"
          icon={<Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />}
          accentColor="#6EC2FD"
        />

        <StatCard
          title="Peak Score"
          value={bestScore > 0 ? `${bestScore}` : '0'}
          subtitle={isUniformMaxMarks ? `Best drill score / ${benchmarkMarks}` : 'Peak drill score'}
          icon={<Award className="w-4 h-4 text-purple-600 dark:text-lavender" />}
          accentColor="#A78BFA"
        />

        <StatCard
          title="Total Questions"
          value={totalQuestions}
          subtitle={`~${avgQuestionsPerDrill} Qs per drill avg`}
          icon={<Layers className="w-4 h-4 text-slate-600 dark:text-slate-400" />}
          accentColor="#A78BFA"
        />

        <StatCard
          title="Cutoff Rate"
          value={`${cutoffRate}%`}
          subtitle="Benchmark clear rate"
          icon={<Flame className="w-4 h-4 text-alert-red" />}
          accentColor="#F472B6"
        />
      </div>
    </div>
  );
};
