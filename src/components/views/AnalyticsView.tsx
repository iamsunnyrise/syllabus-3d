import React, { useMemo, useState } from 'react';
import { useSyllabus } from '../../context/SyllabusContext';
import { Badge3D } from '../3d/Badge3D';
import { SectionBadgeIcon } from '../common/SectionBadgeIcon';
import { AppView } from '../layout/Sidebar';
import { soundManager } from '../../utils/soundEffects';
import {
  Target,
  Award,
  Zap,
  Sparkles,
  Flame,
  Layers,
  Calculator,
  Globe,
  BrainCircuit,
  BookOpen,
  ArrowRight,
  Clock,
  RotateCw,
  AlertTriangle,
  BarChart3
} from 'lucide-react';

interface AnalyticsViewProps {
  onNavigate?: (view: AppView) => void;
}

type BadgeFilter = 'all' | 'unlocked' | 'locked';

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ onNavigate }) => {
  const {
    profile,
    achievements,
    overallStats,
    subjectStats,
    currentExam,
    activityHistory,
    dueRevisions,
    weakTopics
  } = useSyllabus();

  const [badgeFilter, setBadgeFilter] = useState<BadgeFilter>('all');

  const unLockedBadges = useMemo(() => achievements.filter(b => b.unlocked), [achievements]);
  const lockedBadgesCount = achievements.length - unLockedBadges.length;

  const filteredBadges = useMemo(() => {
    if (badgeFilter === 'unlocked') return achievements.filter(b => b.unlocked);
    if (badgeFilter === 'locked') return achievements.filter(b => !b.unlocked);
    return achievements;
  }, [achievements, badgeFilter]);

  const readinessScore = Math.round(
    overallStats.completionPercentage * 0.5 +
      overallStats.averageAccuracy * 0.3 +
      Math.min(100, profile.currentStreak * 4) * 0.2
  );

  const readinessMeta = useMemo(() => {
    if (readinessScore >= 80) {
      return {
        label: 'Exam Ready',
        message: 'Great job! Your syllabus coverage and accuracy are in a strong zone.',
        pill: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
      };
    }
    if (readinessScore >= 50) {
      return {
        label: 'On Track',
        message: 'Good momentum! Keep finishing remaining topics and daily revisions.',
        pill: 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30'
      };
    }
    return {
      label: 'Building Base',
      message: 'Strong start! Focus on one chapter a day to build steady exam confidence.',
      pill: 'bg-orange-500/15 text-orange-800 dark:text-orange-300 border-orange-500/30'
    };
  }, [readinessScore]);

  // Level XP calculation (300 XP per level)
  const xpCurrentLevel = profile.xp % 300;
  const xpToNextLevel = 300 - xpCurrentLevel;
  const xpPercent = Math.min(100, Math.round((xpCurrentLevel / 300) * 100));

  // Find lowest-progress subject to give a clear student next step
  const focusSubject = useMemo(() => {
    if (!subjectStats || subjectStats.length === 0) return null;
    const incomplete = subjectStats.filter(s => s.percentage < 100);
    const pool = incomplete.length > 0 ? incomplete : subjectStats;
    return [...pool].sort((a, b) => a.percentage - b.percentage)[0];
  }, [subjectStats]);

  // Last 7 Days study bars from activityHistory
  const weeklyActivity = useMemo(() => {
    const historyMap = new Map((activityHistory || []).map(item => [item.date, item]));
    const days: Array<{ date: string; label: string; minutes: number; topics: number; isToday: boolean }> = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const dayNum = String(d.getDate()).padStart(2, '0');
      const dateStr = `${y}-${m}-${dayNum}`;
      const record = historyMap.get(dateStr);
      days.push({
        date: dateStr,
        label: d.toLocaleDateString('en-US', { weekday: 'short' }),
        minutes: record?.studyMinutes || 0,
        topics: (record?.topicsCompleted || 0) + (record?.revisionsCompleted || 0),
        isToday: i === 0
      });
    }

    const maxMinutes = Math.max(60, ...days.map(d => d.minutes));
    const totalWeekMinutes = days.reduce((acc, d) => acc + d.minutes, 0);
    const totalWeekTopics = days.reduce((acc, d) => acc + d.topics, 0);
    return { days, maxMinutes, totalWeekMinutes, totalWeekTopics };
  }, [activityHistory]);

  const getSubjectIconAndColor = (name: string, fallbackColor?: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('quant') || lower.includes('math')) {
      return { icon: Calculator, color: fallbackColor || '#EA580C' };
    }
    if (
      lower.includes('gk') ||
      lower.includes('general awareness') ||
      lower.includes('knowledge') ||
      lower.includes('gs') ||
      lower.includes('pyq')
    ) {
      return { icon: Globe, color: fallbackColor || '#0D9488' };
    }
    if (lower.includes('reasoning') || lower.includes('intelligence')) {
      return { icon: BrainCircuit, color: fallbackColor || '#2563EB' };
    }
    if (lower.includes('english') || lower.includes('editorial') || lower.includes('comprehension')) {
      return { icon: BookOpen, color: fallbackColor || '#10B981' };
    }
    return { icon: Layers, color: fallbackColor || '#D97706' };
  };

  const formatTitle = (str: string) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const navigateTo = (view: AppView) => {
    if (!onNavigate) return;
    soundManager.playClick();
    onNavigate(view);
  };

  return (
    <div className="space-y-4 sm:space-y-6 pb-28 sm:pb-20 w-full max-w-7xl mx-auto font-sans animate-fade-in px-1 sm:px-2">
      {/* 1. CLEAN STUDENT-FRIENDLY HEADER */}
      <div className="relative p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#121424]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 shadow-xs sm:shadow-sm overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500/60 to-transparent pointer-events-none" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 relative z-10">
          <div className="flex items-start sm:items-center gap-3.5 min-w-0">
            <SectionBadgeIcon section="analytics" size="lg" className="shrink-0 mt-0.5 sm:mt-0" />

            <div className="min-w-0 space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                {currentExam && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/12 dark:bg-amber-500/15 border border-amber-500/25 text-amber-800 dark:text-amber-300 text-[11px] font-bold">
                    <Target className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                    <span>{currentExam.name}</span>
                  </span>
                )}
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  {overallStats.completedCount} of {overallStats.totalTopics} topics done
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                Your Study Report
              </h1>
              <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 font-medium">
                See how much you&apos;ve finished, where you score best, and what to revise next.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 dark:bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/25 text-xs font-bold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Level {profile.level} • {profile.levelTitle || 'Scholar'}</span>
            </span>
            {profile.currentStreak > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500/10 dark:bg-orange-500/15 text-orange-800 dark:text-orange-300 border border-orange-500/25 text-xs font-bold shadow-2xs">
                <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                <span>{profile.currentStreak} Day Streak</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 2. AT-A-GLANCE OVERVIEW: READINESS SUMMARY + LEVEL PROGRESS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4">
        {/* Left 8 cols: Plain-English Exam Readiness Card */}
        <div className="lg:col-span-8 p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#121424]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 shadow-xs sm:shadow-sm relative overflow-hidden flex flex-col justify-between gap-4">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 via-orange-500 to-emerald-500 opacity-75" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-300">
                  Overall Exam Readiness
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${readinessMeta.pill}`}>
                  {readinessMeta.label}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
                {readinessMeta.message}
              </p>
            </div>

            <div className="flex items-baseline gap-1 shrink-0 bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/25 px-4 py-2.5 rounded-2xl self-start sm:self-auto">
              <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-mono tabular-nums leading-none">
                {readinessScore}
              </span>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-bold">/ 100</span>
            </div>
          </div>

          {/* Easy 4-part Breakdown Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 rounded-2xl bg-slate-50/90 dark:bg-white/[0.04] border border-slate-200/70 dark:border-white/10">
              <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Syllabus Done</div>
              <div className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tabular-nums mt-0.5">
                {overallStats.completionPercentage}%
              </div>
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                {overallStats.completedCount}/{overallStats.totalTopics} topics
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50/90 dark:bg-white/[0.04] border border-slate-200/70 dark:border-white/10">
              <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Quiz Accuracy</div>
              <div className="text-lg sm:text-xl font-black text-emerald-600 dark:text-emerald-400 tabular-nums mt-0.5">
                {overallStats.averageAccuracy}%
              </div>
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                {overallStats.averageAccuracy >= 75 ? 'High score rate' : 'Room to grow'}
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50/90 dark:bg-white/[0.04] border border-slate-200/70 dark:border-white/10">
              <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Study Hours</div>
              <div className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tabular-nums mt-0.5">
                {overallStats.totalStudyHours}h
              </div>
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                Total logged time
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50/90 dark:bg-white/[0.04] border border-slate-200/70 dark:border-white/10">
              <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Best Streak</div>
              <div className="text-lg sm:text-xl font-black text-amber-600 dark:text-amber-400 tabular-nums mt-0.5">
                {profile.longestStreak || profile.currentStreak || 0}d
              </div>
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                Current: {profile.currentStreak} days
              </div>
            </div>
          </div>
        </div>

        {/* Right 4 cols: Study Level & XP Card */}
        <div className="lg:col-span-4 p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#121424]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 shadow-xs sm:shadow-sm flex flex-col justify-between gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 to-orange-500 opacity-75" />

          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center font-black shadow-md shadow-amber-500/20 shrink-0">
                <Zap className="w-5 h-5 fill-current stroke-[2.2]" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400">Your Study Rank</div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
                  Level {profile.level}
                </h3>
                <span className="text-[11px] font-bold text-amber-700 dark:text-amber-300">
                  {profile.levelTitle || 'Scholar'}
                </span>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-xl bg-amber-500/12 border border-amber-500/25 text-[11px] font-mono font-bold text-amber-800 dark:text-amber-300 tabular-nums">
              {profile.xp.toLocaleString()} XP
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-600 dark:text-slate-300">Next Level Progress</span>
              <span className="font-mono text-amber-700 dark:text-amber-300 tabular-nums">
                {xpCurrentLevel} / 300 XP
              </span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden p-0.5 border border-slate-200/60 dark:border-white/10">
              <div
                className="h-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 rounded-full transition-all duration-500"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              Earn <strong className="text-slate-800 dark:text-slate-200">{xpToNextLevel} more XP</strong> by completing topics &amp; targets to reach Level {profile.level + 1}.
            </p>
          </div>
        </div>
      </div>

      {/* 3. STUDENT ACTION CARDS: WHAT TO DO NEXT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        {/* Next Step 1: Subject Needing Attention */}
        <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#121424]/95 border border-slate-200/90 dark:border-white/10 shadow-xs flex flex-col justify-between gap-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/12 border border-amber-500/25 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 block">
                  Recommended Subject
                </span>
                <h3 className="text-sm font-black text-slate-900 dark:text-white leading-snug">
                  {focusSubject ? formatTitle(focusSubject.subjectName) : 'Start Your Syllabus'}
                </h3>
              </div>
            </div>
            {focusSubject && (
              <span className="px-2 py-0.5 rounded-lg bg-amber-500/12 text-amber-800 dark:text-amber-300 text-xs font-mono font-black">
                {focusSubject.percentage}%
              </span>
            )}
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
            {focusSubject
              ? `${focusSubject.totalTopics - focusSubject.completedTopics} topics left here. Covering this next lifts your readiness score fastest.`
              : 'Add topics to your syllabus to get personalized next-step suggestions.'}
          </p>

          {onNavigate && (
            <button
              type="button"
              onClick={() => navigateTo('syllabus')}
              className="w-full py-2 px-3 rounded-xl bg-amber-500/12 hover:bg-amber-500 text-amber-900 dark:text-amber-300 hover:text-slate-950 border border-amber-500/30 text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
            >
              <span>Open Syllabus</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Next Step 2: Revisions Due */}
        <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#121424]/95 border border-slate-200/90 dark:border-white/10 shadow-xs flex flex-col justify-between gap-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-sky-500/12 border border-sky-500/25 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                <RotateCw className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300 block">
                  Memory Check-In
                </span>
                <h3 className="text-sm font-black text-slate-900 dark:text-white leading-snug">
                  {dueRevisions.length > 0
                    ? `${dueRevisions.length} Topics Due to Revise`
                    : 'All Revisions Caught Up'}
                </h3>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-lg bg-sky-500/12 text-sky-700 dark:text-sky-300 text-xs font-mono font-black">
              {dueRevisions.length}
            </span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
            {dueRevisions.length > 0
              ? 'A quick 10-minute recall session today keeps old chapters fresh for exam day.'
              : 'No overdue revisions right now — great consistency!'}
          </p>

          {onNavigate && (
            <button
              type="button"
              onClick={() => navigateTo('revision')}
              className="w-full py-2 px-3 rounded-xl bg-sky-500/10 hover:bg-sky-500 text-sky-800 dark:text-sky-300 hover:text-white border border-sky-500/25 text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
            >
              <span>{dueRevisions.length > 0 ? 'Revise Now' : 'View Revision Queue'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Next Step 3: Weak Topics */}
        <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#121424]/95 border border-slate-200/90 dark:border-white/10 shadow-xs flex flex-col justify-between gap-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-rose-500/12 border border-rose-500/25 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-rose-700 dark:text-rose-300 block">
                  Score Booster
                </span>
                <h3 className="text-sm font-black text-slate-900 dark:text-white leading-snug">
                  {weakTopics.length > 0
                    ? `${weakTopics.length} Weak Topics Flagged`
                    : 'Zero Weak Topics'}
                </h3>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-lg bg-rose-500/12 text-rose-700 dark:text-rose-300 text-xs font-mono font-black">
              {weakTopics.length}
            </span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
            {weakTopics.length > 0
              ? 'Fixing just one tricky topic helps avoid negative marking in mocks.'
              : 'Clean sheet! Log mistakes in Weak Topics whenever a mock question trips you up.'}
          </p>

          {onNavigate && (
            <button
              type="button"
              onClick={() => navigateTo('weak')}
              className="w-full py-2 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-700 dark:text-rose-300 hover:text-white border border-rose-500/25 text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
            >
              <span>Practice Weak Topics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 4. LAST 7 DAYS ACTIVITY CHART + SUBJECT BREAKDOWN */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left 5 cols: Simple 7-Day Study Activity Chart */}
        <div className="lg:col-span-5 p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#121424]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 shadow-xs sm:shadow-sm flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500/12 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <BarChart3 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white tracking-tight">
                  Last 7 Days Study
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  Daily study minutes &amp; finished items
                </p>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs font-mono font-bold text-amber-800 dark:text-amber-300">
              {(weeklyActivity.totalWeekMinutes / 60).toFixed(1)}h total
            </span>
          </div>

          <div className="grid grid-cols-7 gap-2 items-end h-36 pt-4 px-1">
            {weeklyActivity.days.map(day => {
              const barPct = day.minutes > 0 ? Math.max(12, Math.round((day.minutes / weeklyActivity.maxMinutes) * 100)) : 6;
              return (
                <div key={day.date} className="flex flex-col items-center gap-1.5 h-full justify-end group">
                  <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 opacity-80 group-hover:opacity-100 tabular-nums">
                    {day.minutes > 0 ? `${day.minutes}m` : '0m'}
                  </span>
                  <div className="w-full max-w-[32px] flex-1 flex items-end justify-center bg-slate-100/80 dark:bg-white/[0.04] rounded-xl p-1 overflow-hidden">
                    <div
                      className={`w-full rounded-lg transition-all duration-500 ${
                        day.minutes === 0
                          ? 'bg-slate-200 dark:bg-white/10'
                          : day.isToday
                          ? 'bg-gradient-to-t from-amber-500 to-orange-400'
                          : 'bg-amber-400/80 dark:bg-amber-500/75 group-hover:bg-amber-500'
                      }`}
                      style={{ height: `${barPct}%` }}
                    />
                  </div>
                  <span
                    className={`text-[10.5px] font-bold ${
                      day.isToday
                        ? 'text-amber-700 dark:text-amber-300 font-black'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {day.isToday ? 'Today' : day.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-white/[0.06]">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>{weeklyActivity.totalWeekTopics} topics/revisions this week</span>
            </span>
            {onNavigate && (
              <button
                type="button"
                onClick={() => navigateTo('targets')}
                className="text-amber-700 dark:text-amber-300 font-bold hover:underline cursor-pointer"
              >
                Daily Targets
              </button>
            )}
          </div>
        </div>

        {/* Right 7 cols: Easy Subject Progress Cards */}
        <div className="lg:col-span-7 p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#121424]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 shadow-xs sm:shadow-sm space-y-3.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500/12 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white tracking-tight">
                  Subject Progress
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  Topics completed vs remaining in each subject
                </p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/[0.06]">
              {currentExam?.subjects.length || 0} Subjects
            </span>
          </div>

          {currentExam && currentExam.subjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentExam.subjects.map(s => {
                const { icon: SubjIcon, color } = getSubjectIconAndColor(s.name, s.color);
                const totalTopics = s.chapters.reduce((acc, c) => acc + c.topics.length, 0);
                const completedTopics = s.chapters.reduce(
                  (acc, c) => acc + c.topics.filter(t => t.status === 'completed').length,
                  0
                );
                const remaining = Math.max(0, totalTopics - completedTopics);
                const percent = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

                const statusText =
                  percent === 100 ? 'Finished' : percent >= 60 ? 'Good Pace' : percent > 0 ? 'In Progress' : 'Not Started';

                return (
                  <div
                    key={s.id}
                    onClick={() => onNavigate && navigateTo('syllabus')}
                    className={`p-3.5 rounded-2xl bg-slate-50/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 space-y-2.5 hover:border-amber-500/45 transition-all shadow-2xs ${
                      onNavigate ? 'cursor-pointer' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${color}18`, color }}
                        >
                          <SubjIcon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white block truncate">
                            {formatTitle(s.name)}
                          </span>
                          <span className="text-[10.5px] font-semibold text-slate-500 dark:text-slate-400">
                            {statusText}
                          </span>
                        </div>
                      </div>
                      <span className="text-sm font-mono font-black tabular-nums" style={{ color }}>
                        {percent}%
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="w-full h-2 rounded-full bg-slate-200/80 dark:bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${percent}%`, backgroundColor: color }}
                        />
                      </div>
                      <div className="flex justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                        <span>{completedTopics} done</span>
                        <span>{remaining === 0 ? 'All complete' : `${remaining} topics left`}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-6 rounded-2xl border border-dashed border-slate-200 dark:border-white/10 text-center text-xs text-slate-500">
              No subjects added yet. Open Syllabus Explorer to add chapters and topics.
            </div>
          )}
        </div>
      </div>

      {/* 5. ACHIEVEMENT BADGES (WITH SIMPLE FILTER TABS) */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center border border-amber-500/25">
              <Award className="w-4 h-4 stroke-[2.4]" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
                Your Study Badges
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {unLockedBadges.length} of {achievements.length} earned from your study streaks and completed topics
              </p>
            </div>
          </div>

          <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-white/[0.06] border border-slate-200/80 dark:border-white/10 self-start sm:self-auto">
            {(
              [
                { id: 'all', label: `All (${achievements.length})` },
                { id: 'unlocked', label: `Unlocked (${unLockedBadges.length})` },
                { id: 'locked', label: `To Earn (${lockedBadgesCount})` }
              ] as const
            ).map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setBadgeFilter(tab.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  badgeFilter === tab.id
                    ? 'bg-white dark:bg-[#1E2032] text-slate-900 dark:text-white shadow-xs font-black'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {filteredBadges.map(badge => (
            <Badge3D key={badge.id} badge={badge} />
          ))}
        </div>
      </div>
    </div>
  );
};
