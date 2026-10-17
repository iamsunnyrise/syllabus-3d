import React from 'react';
import {
  Target,
  Moon,
  History,
  Sparkles,
  CheckCircle2,
  Flame,
  Clock,
  ArrowRight,
  ShieldCheck,
  Zap,
  BookOpen
} from 'lucide-react';
import { useSyllabus } from '../../context/SyllabusContext';
import { Top3TargetsWidget } from '../dashboard/Top3TargetsWidget';
import { soundManager } from '../../utils/soundEffects';
import { haptics } from '../../utils/haptics';
import { Topic } from '../../types/syllabus';
import { getTodayDateKey } from '../../utils/dailyProductivityStorage';

interface DailyTargetsViewProps {
  onOpenTopicDrawer?: (topic: Topic, subjectName: string, chapterName: string) => void;
  onOpenFocus?: (topicId?: string) => void;
  onNavigate?: (view: any) => void;
  onOpenNightJournal?: () => void;
  onOpenHistory?: () => void;
}

export const DailyTargetsView: React.FC<DailyTargetsViewProps> = ({
  onOpenTopicDrawer,
  onOpenFocus,
  onNavigate,
  onOpenNightJournal,
  onOpenHistory
}) => {
  const { top3Targets, reflectionsHistory, allTopics } = useSyllabus();

  const filledTargets = (top3Targets || []).filter(t => t.text && t.text.trim());
  const completedTargets = filledTargets.filter(t => t.completed);
  const completionPct = filledTargets.length > 0
    ? Math.round((completedTargets.length / 3) * 100)
    : 0;

  const todayKey = getTodayDateKey();
  const todayReflection = (reflectionsHistory || []).find(r => r.date === todayKey);

  const handleTopicNav = (topicId: string) => {
    if (!onOpenTopicDrawer) return;
    const found = allTopics.find(t => t.topic.id === topicId);
    if (found) {
      onOpenTopicDrawer(found.topic, found.subjectName, found.chapterName);
    }
  };

  return (
    <div className="space-y-5 pb-24 sm:pb-12 max-w-7xl mx-auto animate-fade-in">
      {/* 1. HERO HEADER BANNER */}
      <div className="relative rounded-3xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-purple-500/10 dark:from-amber-500/15 dark:via-transparent dark:to-purple-500/15 border border-amber-500/20 dark:border-white/10 p-5 sm:p-7 shadow-sm overflow-hidden">
        {/* Ambient Glow Orbs */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Daily Focus Engine</span>
              <span className="text-amber-400">•</span>
              <span className="font-mono">{completedTargets.length}/3 Completed</span>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Top 3 Daily Targets
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              Define your 3 non-negotiables every morning. Execute them with undivided focus, and close your day with a calm 1-minute night reflection.
            </p>
          </div>

          {/* Quick Action Badges */}
          <div className="flex items-center gap-2 flex-wrap shrink-0">
            {onOpenNightJournal && (
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  haptics.selection();
                  onOpenNightJournal();
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer active:scale-95 border shadow-xs ${
                  todayReflection
                    ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                    : 'bg-purple-600 text-white border-purple-500/30 hover:bg-purple-700'
                }`}
                title="Open Night Reflection Journal"
              >
                <Moon className="w-4 h-4 fill-current" />
                <span>{todayReflection ? 'Night Journal (Logged)' : '1-Min Night Journal'}</span>
              </button>
            )}

            {onOpenHistory && (
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  haptics.selection();
                  onOpenHistory();
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white/80 dark:bg-white/[0.06] hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 text-xs font-semibold border border-slate-200/90 dark:border-white/10 transition-all cursor-pointer shadow-xs active:scale-95"
                title="View Past Reflection History"
              >
                <History className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>History</span>
                {reflectionsHistory.length > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold bg-purple-500/20 text-purple-700 dark:text-purple-300">
                    {reflectionsHistory.length}
                  </span>
                )}
              </button>
            )}

            {onOpenFocus && (
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  haptics.selection();
                  onOpenFocus();
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold border border-amber-600/30 transition-all cursor-pointer shadow-xs active:scale-95"
                title="Launch 25m Focus Chamber"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Focus Chamber</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. THE MAIN TOP 3 TARGETS INTERACTIVE ENGINE */}
      <Top3TargetsWidget onNavigateToTopic={handleTopicNav} />

      {/* 3. PRODUCTIVITY COMPANION MODULES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {/* Card A: The Rule of 3 Protocol */}
        <div className="rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 p-5 space-y-3 shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center justify-center font-bold">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                The Rule of 3 Protocol
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                Why 3 targets work 10x better than 20-item to-do lists
              </p>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            <div className="flex items-start gap-2 p-2 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/5">
              <span className="font-mono font-bold text-amber-600 dark:text-amber-400">#01</span>
              <p><strong>Priority Target:</strong> Your single hardest or highest-scoring syllabus topic for the day.</p>
            </div>
            <div className="flex items-start gap-2 p-2 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/5">
              <span className="font-mono font-bold text-sky-600 dark:text-sky-400">#02</span>
              <p><strong>Practice & Problems:</strong> Active numericals, previous year questions, or speed drill questions.</p>
            </div>
            <div className="flex items-start gap-2 p-2 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/5">
              <span className="font-mono font-bold text-purple-600 dark:text-purple-400">#03</span>
              <p><strong>Revision & Review:</strong> Spaced review of past topics or formula sheet refresh before bed.</p>
            </div>
          </div>
        </div>

        {/* Card B: Night Reflection Log Status */}
        <div className="rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 p-5 space-y-3 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 flex items-center justify-center font-bold">
                  <Moon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Night Reflection Journal
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    1-minute evening review to close your mental loops
                  </p>
                </div>
              </div>

              {todayReflection && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Done</span>
                </span>
              )}
            </div>

            {todayReflection ? (
              <div className="p-3 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/60 dark:border-purple-800/30 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-700 dark:text-slate-200">Today's Win:</span>
                  <span className="font-mono text-purple-600 dark:text-purple-400 font-bold">★ {todayReflection.rating}/5</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 italic line-clamp-2">
                  "{todayReflection.biggestWin || 'Completed targets with determination.'}"
                </p>
                {todayReflection.tomorrowPriority && (
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    <strong>Tomorrow:</strong> {todayReflection.tomorrowPriority}
                  </p>
                )}
              </div>
            ) : (
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Take 60 seconds before sleeping to log what went well, acknowledge any distractions, and set your mindset for tomorrow.
              </div>
            )}
          </div>

          <div className="pt-2">
            {onOpenNightJournal && (
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  haptics.selection();
                  onOpenNightJournal();
                }}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <Moon className="w-3.5 h-3.5 fill-current" />
                <span>{todayReflection ? 'Update Night Journal' : 'Write Tonight\'s Reflection (1 Min)'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
