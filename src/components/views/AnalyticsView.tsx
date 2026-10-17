import React from 'react';
import { useSyllabus } from '../../context/SyllabusContext';
import { Badge3D } from '../3d/Badge3D';
import { SectionBadgeIcon } from '../common/SectionBadgeIcon';
import {
  Trophy,
  Target,
  CheckCircle2,
  Award,
  Zap,
  TrendingUp,
  Sparkles,
  Flame,
  Layers,
  Calculator,
  Globe,
  BrainCircuit,
  BookOpen,
  ArrowUpRight
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const { profile, achievements, overallStats, currentExam } = useSyllabus();

  const unLockedBadges = achievements.filter(b => b.unlocked);
  const readinessScore = Math.round(
    overallStats.completionPercentage * 0.5 +
    overallStats.averageAccuracy * 0.3 +
    Math.min(100, profile.currentStreak * 4) * 0.2
  );

  // Gamified Level XP logic (300 XP per level)
  const xpCurrentLevel = profile.xp % 300;
  const xpToNextLevel = 300 - xpCurrentLevel;
  const xpPercent = Math.min(100, Math.round((xpCurrentLevel / 300) * 100));

  // Subject Icon Helper
  const getSubjectIconAndColor = (name: string, fallbackColor?: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('quant') || lower.includes('math')) {
      return { icon: Calculator, color: fallbackColor || '#EF4444' };
    }
    if (lower.includes('gk') || lower.includes('general awareness') || lower.includes('knowledge') || lower.includes('gs') || lower.includes('pyq')) {
      return { icon: Globe, color: fallbackColor || '#0EA5E9' };
    }
    if (lower.includes('reasoning') || lower.includes('intelligence')) {
      return { icon: BrainCircuit, color: fallbackColor || '#A855F7' };
    }
    if (lower.includes('english') || lower.includes('editorial') || lower.includes('comprehension')) {
      return { icon: BookOpen, color: fallbackColor || '#10B981' };
    }
    return { icon: Layers, color: fallbackColor || '#6366F1' };
  };

  const formatTitle = (str: string) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="space-y-4 sm:space-y-6 pb-28 sm:pb-20 w-full max-w-7xl mx-auto font-sans animate-fade-in px-1 sm:px-2">
      
      {/* 1. EXECUTIVE HERO HEADER */}
      <div className="relative p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#121424]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 shadow-xs sm:shadow-sm overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent pointer-events-none" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 relative z-10">
          <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
            <SectionBadgeIcon section="analytics" size="lg" />

            <div className="min-w-0 space-y-0.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400">
                <span>Analytics</span>
                <span className="text-slate-300 dark:text-slate-600">•</span>
                <span>Performance Overview</span>
                {currentExam && (
                  <>
                    <span className="text-slate-300 dark:text-slate-600">•</span>
                    <span className="text-slate-500 dark:text-slate-400 font-semibold">{currentExam.name}</span>
                  </>
                )}
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                Exam Readiness &amp; Analytics
              </h1>
              <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 font-medium">
                Track your syllabus progress, quiz accuracy, and unlocked achievements
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/25 text-xs font-mono font-bold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{profile.levelTitle || 'Scholar'}</span>
            </span>
            {profile.currentStreak > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500/10 dark:bg-orange-500/15 text-orange-700 dark:text-orange-400 border border-orange-500/25 text-xs font-mono font-bold shadow-2xs">
                <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                <span>{profile.currentStreak} Day Streak</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 2. EXECUTIVE LEVEL & XP PROGRESS BANNER */}
      <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#121424]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 shadow-xs sm:shadow-sm space-y-3 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-70" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-500 text-slate-950 flex items-center justify-center font-black shadow-md shadow-amber-500/20 shrink-0 border border-white/20">
              <Zap className="w-5 h-5 fill-current stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Level {profile.level}
                </h3>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/25">
                  {profile.levelTitle}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">
                {profile.xp.toLocaleString()} Total XP earned
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <span className="text-xs sm:text-[13px] font-mono font-bold text-amber-600 dark:text-amber-400 tabular-nums px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20">
              {xpCurrentLevel} / 300 XP to Level {profile.level + 1}
            </span>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden p-0.5 border border-slate-200/50 dark:border-white/10">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-emerald-500 rounded-full transition-all duration-500 shadow-sm"
              style={{
                width: `${xpPercent}%`,
                boxShadow: '0 0 10px rgba(245,158,11,0.35)'
              }}
            />
          </div>
          <div className="flex justify-between text-[10.5px] font-mono font-semibold text-slate-400 dark:text-slate-500">
            <span>Level {profile.level}</span>
            <span className="tabular-nums font-bold text-slate-600 dark:text-slate-400">{xpToNextLevel} XP needed for Level {profile.level + 1}</span>
          </div>
        </div>
      </div>

      {/* 3. THREE EXECUTIVE METRIC BENTO CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        
        {/* Readiness Score Card */}
        <div className="group relative p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#121424]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 hover:border-cyan-500/50 shadow-xs sm:shadow-sm space-y-3 transition-all duration-200 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-70 group-hover:opacity-100" />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/15 flex items-center justify-center border border-cyan-500/25">
                <Target className="w-4 h-4 stroke-[2.4]" />
              </div>
              <span className="text-xs font-bold font-mono uppercase tracking-wider">Readiness Score</span>
            </div>
            
            <span className={`px-2.5 py-0.5 rounded-lg text-[10.5px] font-mono font-bold border ${
              readinessScore >= 75
                ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/25'
                : readinessScore >= 50
                ? 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/25'
                : 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/25'
            }`}>
              {readinessScore >= 75 ? 'Exam Ready' : readinessScore >= 50 ? 'On Track' : 'Building'}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline gap-1">
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono tabular-nums leading-none">
                {readinessScore}
              </h3>
              <span className="text-xs font-mono text-slate-400 font-bold">/ 100</span>
            </div>

            <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden">
              <div
                className="h-full rounded-full bg-cyan-500 transition-all duration-500"
                style={{ width: `${Math.min(100, readinessScore)}%` }}
              />
            </div>

            <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
              Based on syllabus coverage, accuracy &amp; streak
            </p>
          </div>
        </div>

        {/* Practice Accuracy Card */}
        <div className="group relative p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#121424]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 hover:border-emerald-500/50 shadow-xs sm:shadow-sm space-y-3 transition-all duration-200 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-70 group-hover:opacity-100" />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/15 flex items-center justify-center border border-emerald-500/25">
                <CheckCircle2 className="w-4 h-4 stroke-[2.4]" />
              </div>
              <span className="text-xs font-bold font-mono uppercase tracking-wider">Practice Accuracy</span>
            </div>

            <span className={`px-2.5 py-0.5 rounded-lg text-[10.5px] font-mono font-bold border ${
              overallStats.averageAccuracy >= 75
                ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/25'
                : overallStats.averageAccuracy >= 50
                ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/25'
                : 'bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-slate-400 border-slate-200/60 dark:border-white/10'
            }`}>
              {overallStats.averageAccuracy >= 75 ? 'High Accuracy' : overallStats.averageAccuracy > 0 ? 'Moderate' : 'Unrated'}
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono tabular-nums leading-none">
              {overallStats.averageAccuracy}%
            </h3>

            <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${Math.min(100, overallStats.averageAccuracy)}%` }}
              />
            </div>

            <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
              Average score across all practiced quiz questions
            </p>
          </div>
        </div>

        {/* Badges Unlocked Card */}
        <div className="group relative p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#121424]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 hover:border-purple-500/50 shadow-xs sm:shadow-sm space-y-3 transition-all duration-200 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-70 group-hover:opacity-100" />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
              <div className="w-8 h-8 rounded-xl bg-purple-500/15 flex items-center justify-center border border-purple-500/25">
                <Award className="w-4 h-4 stroke-[2.4]" />
              </div>
              <span className="text-xs font-bold font-mono uppercase tracking-wider">Milestone Badges</span>
            </div>

            <span className="px-2.5 py-0.5 rounded-lg text-[10.5px] font-mono font-bold bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/25">
              {Math.round((unLockedBadges.length / (achievements.length || 1)) * 100)}%
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline gap-1">
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono tabular-nums leading-none">
                {unLockedBadges.length}
              </h3>
              <span className="text-xs font-mono text-slate-400 font-bold">/ {achievements.length}</span>
            </div>

            <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden">
              <div
                className="h-full rounded-full bg-purple-500 transition-all duration-500"
                style={{ width: `${Math.round((unLockedBadges.length / (achievements.length || 1)) * 100)}%` }}
              />
            </div>

            <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
              {achievements.length - unLockedBadges.length === 0 ? 'All badges unlocked!' : `${achievements.length - unLockedBadges.length} badges left to unlock`}
            </p>
          </div>
        </div>

      </div>

      {/* 4. SUBJECT PREPAREDNESS BREAKDOWN */}
      {currentExam && currentExam.subjects.length > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#121424]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 shadow-xs sm:shadow-sm space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
                Subject Preparedness
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-slate-400 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/[0.06]">
              {currentExam.subjects.length} Subjects Active
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {currentExam.subjects.map(s => {
              const { icon: SubjIcon, color } = getSubjectIconAndColor(s.name, s.color);
              const totalTopics = s.chapters.reduce((acc, c) => acc + c.topics.length, 0);
              const completedTopics = s.chapters.reduce((acc, c) => acc + c.topics.filter(t => t.status === 'completed').length, 0);
              const percent = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

              return (
                <div
                  key={s.id}
                  className="p-3.5 rounded-xl sm:rounded-2xl bg-slate-50/70 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 space-y-2.5 hover:border-slate-300 dark:hover:border-white/20 transition-all shadow-2xs"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${color}18`, color }}
                      >
                        <SubjIcon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white truncate">
                        {formatTitle(s.name)}
                      </span>
                    </div>
                    <span
                      className="text-xs font-mono font-black tabular-nums"
                      style={{ color }}
                    >
                      {percent}%
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${percent}%`, backgroundColor: color }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-slate-400">
                      <span>{completedTopics} / {totalTopics} Topics</span>
                      <span>{percent === 100 ? 'Mastered ✓' : `${totalTopics - completedTopics} Left`}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. ACHIEVEMENT MEDALS GRID */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center border border-amber-500/25">
              <Award className="w-4 h-4 stroke-[2.4]" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
                Achievements &amp; Milestones
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                Earn 3D badges by building study streaks and conquering topics
              </p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-xl bg-white/95 dark:bg-[#121424]/95 border border-slate-200/90 dark:border-white/10 text-xs font-mono font-bold text-amber-600 dark:text-amber-400 tabular-nums shrink-0 shadow-2xs">
            {unLockedBadges.length} of {achievements.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {achievements.map(badge => (
            <Badge3D key={badge.id} badge={badge} />
          ))}
        </div>
      </div>
    </div>
  );
};
