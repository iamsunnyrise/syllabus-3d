import React, { useState, useMemo } from 'react';
import {
  X,
  Zap,
  Clock,
  CheckCircle2,
  AlertTriangle,
  RotateCw,
  BookOpen,
  Trophy,
  ArrowRight,
  Flame,
  Sparkles,
  Calendar,
  Layers,
  Check
} from 'lucide-react';
import { useSyllabus } from '../../context/SyllabusContext';
import { soundManager } from '../../utils/soundEffects';
import { haptics } from '../../utils/haptics';
import { fireCelebration as confetti } from '../../utils/confettiHelper';
import { getTodayDateString } from '../../utils/dateUtils';
import { TaskCategory, TaskPriority, Topic } from '../../types/syllabus';

interface SmartBacklogRescueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToPlanner?: () => void;
}

interface RescueTaskPlan {
  id: string;
  topicId?: string;
  topicName: string;
  subjectName: string;
  chapterName?: string;
  subjectColor: string;
  allocatedMinutes: number;
  pillarTag: string;
  pillarColor: string;
  priority: TaskPriority;
  category: TaskCategory;
  rationale: string;
  selected: boolean;
}

const TIME_PRESETS = [
  { hours: 2, label: '2 Hours', sublabel: 'Quick Fix' },
  { hours: 3.5, label: '3.5 Hours', sublabel: 'Standard', default: true },
  { hours: 5, label: '5 Hours', sublabel: 'Deep Focus' },
  { hours: 8, label: '8 Hours', sublabel: 'Marathon' }
];

export const SmartBacklogRescueModal: React.FC<SmartBacklogRescueModalProps> = ({
  isOpen,
  onClose,
  onNavigateToPlanner
}) => {
  const {
    allTopics,
    weakTopics,
    dueRevisions,
    addPlannerTask,
    currentExam
  } = useSyllabus();

  const [availableHours, setAvailableHours] = useState<number>(3.5);
  const [selectedTaskIds, setSelectedTaskIds] = useState<Record<string, boolean>>({});
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  // 1. Audit Backlog State
  const backlogStats = useMemo(() => {
    // Backlogged topics: incomplete topics
    const pendingTopics = allTopics.filter(
      at => at.topic.status === 'not_started' || at.topic.status === 'in_progress' || at.topic.isWeak
    );
    const weakCount = weakTopics.length;
    const dueRevCount = dueRevisions.length;

    return {
      totalPending: pendingTopics.length,
      weakCount,
      dueRevCount,
      pendingTopics
    };
  }, [allTopics, weakTopics, dueRevisions]);

  // 2. Dynamic Adaptive Routine Algorithm
  const rescuePlan = useMemo(() => {
    const totalMinutes = Math.round(availableHours * 60);
    const tasks: RescueTaskPlan[] = [];

    // Helper to get non-duplicate topics
    const usedTopicIds = new Set<string>();

    // Pillar 1: High-ROI Weak Topic Rescue (approx 25-30% of time)
    const weakCandidates = weakTopics
      .filter(wt => !usedTopicIds.has(wt.topic.id))
      .sort((a, b) => (b.topic.weightage || 0) - (a.topic.weightage || 0));

    const topWeak = weakCandidates[0] || backlogStats.pendingTopics.find(p => p.topic.isWeak);
    if (topWeak) {
      usedTopicIds.add(topWeak.topic.id);
      const weakTime = Math.min(60, Math.max(30, Math.round(totalMinutes * 0.28)));
      tasks.push({
        id: `rescue_weak_${topWeak.topic.id}`,
        topicId: topWeak.topic.id,
        topicName: topWeak.topic.name,
        subjectName: topWeak.subjectName,
        chapterName: topWeak.chapterName,
        subjectColor: topWeak.subjectColor || '#EF4444',
        allocatedMinutes: weakTime,
        pillarTag: 'High-Weightage Weak Area',
        pillarColor: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30',
        priority: 'high',
        category: 'concept',
        rationale: `Weightage ${topWeak.topic.weightage || 3}★ · Stop losing repeated marks in ${topWeak.subjectName}`,
        selected: true
      });
    }

    // Pillar 2: Overdue Spaced Repetition (approx 20% of time)
    const revCandidate = dueRevisions.find(dr => !usedTopicIds.has(dr.topicId));
    if (revCandidate) {
      usedTopicIds.add(revCandidate.topicId);
      const revTopic = allTopics.find(at => at.topic.id === revCandidate.topicId);
      const revTime = Math.min(45, Math.max(25, Math.round(totalMinutes * 0.20)));
      tasks.push({
        id: `rescue_rev_${revCandidate.topicId}`,
        topicId: revCandidate.topicId,
        topicName: revCandidate.topicName,
        subjectName: revTopic?.subjectName || revCandidate.subjectName,
        chapterName: revTopic?.chapterName || revCandidate.chapterName,
        subjectColor: revTopic?.subjectColor || '#F59E0B',
        allocatedMinutes: revTime,
        pillarTag: 'Due Spaced Repetition',
        pillarColor: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
        priority: 'high',
        category: 'revision',
        rationale: 'Prevent memory decay · Keeps previously learned chapters permanent',
        selected: true
      });
    }

    // Pillar 3: Core Syllabus Forward Step (approx 30% of time)
    const freshCandidate = backlogStats.pendingTopics.find(
      p => !usedTopicIds.has(p.topic.id) && p.topic.status === 'not_started'
    ) || backlogStats.pendingTopics.find(p => !usedTopicIds.has(p.topic.id));

    if (freshCandidate) {
      usedTopicIds.add(freshCandidate.topic.id);
      const freshTime = Math.min(75, Math.max(40, Math.round(totalMinutes * 0.30)));
      tasks.push({
        id: `rescue_fresh_${freshCandidate.topic.id}`,
        topicId: freshCandidate.topic.id,
        topicName: freshCandidate.topic.name,
        subjectName: freshCandidate.subjectName,
        chapterName: freshCandidate.chapterName,
        subjectColor: freshCandidate.subjectColor || '#3B82F6',
        allocatedMinutes: freshTime,
        pillarTag: 'Fresh Syllabus Progress',
        pillarColor: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30',
        priority: 'high',
        category: 'concept',
        rationale: 'Maintains forward syllabus momentum · Prevents falling behind exam calendar',
        selected: true
      });
    }

    // Pillar 4: Active Question Practice / Sectional Speed Drill (approx 15% of time)
    const drillTime = Math.min(45, Math.max(20, Math.round(totalMinutes * 0.15)));
    tasks.push({
      id: 'rescue_drill_speed',
      topicName: `${topWeak ? topWeak.subjectName : 'Sectional'} Speed PYQ Drill (20 Qs)`,
      subjectName: topWeak?.subjectName || 'Mock Practice',
      subjectColor: '#10B981',
      allocatedMinutes: drillTime,
      pillarTag: 'Active Recall & Speed',
      pillarColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      priority: 'medium',
      category: 'practice',
      rationale: 'Test speed under timer · Converts passive theory into instant exam accuracy',
      selected: true
    });

    // Pillar 5: Daily Error Log & Formula Consolidation (Remainder ~ 15m)
    if (totalMinutes >= 180) {
      tasks.push({
        id: 'rescue_mistake_review',
        topicName: 'Mistake Journal & Formula Capsule Wrap-up',
        subjectName: 'Revision & Mastery',
        subjectColor: '#8B5CF6',
        allocatedMinutes: 20,
        pillarTag: 'Error Consolidation',
        pillarColor: 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30',
        priority: 'medium',
        category: 'revision',
        rationale: 'Zero unforced errors · Review today\'s mistakes so they never repeat',
        selected: true
      });
    }

    return tasks;
  }, [availableHours, weakTopics, dueRevisions, backlogStats.pendingTopics, allTopics]);

  // Handle Checkbox Toggles
  const isTaskSelected = (id: string) => {
    return selectedTaskIds[id] !== false; // default true
  };

  const toggleTaskSelection = (id: string) => {
    soundManager.playClick();
    haptics.selection();
    setSelectedTaskIds(prev => ({
      ...prev,
      [id]: prev[id] === false ? true : false
    }));
  };

  // 3. Backlog Recovery Days Projection
  const clearanceProjection = useMemo(() => {
    const topicsPerDay = Math.max(1, availableHours >= 5 ? 3 : availableHours >= 3.5 ? 2 : 1);
    const daysNeeded = Math.ceil(backlogStats.totalPending / topicsPerDay);
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + daysNeeded);

    const formattedDate = targetDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });

    return {
      daysNeeded,
      formattedDate,
      topicsPerDay
    };
  }, [backlogStats.totalPending, availableHours]);

  // 4. One-Click Apply to Planner Action
  const handleApplyToPlanner = () => {
    soundManager.playCompleteChime();
    haptics.success();
    confetti();

    const selectedTasks = rescuePlan.filter(t => isTaskSelected(t.id));
    const todayStr = getTodayDateString();

    selectedTasks.forEach(t => {
      addPlannerTask({
        topicId: t.topicId,
        topicName: t.topicName,
        subjectName: t.subjectName,
        subjectColor: t.subjectColor,
        status: 'today',
        scheduledDate: todayStr,
        estimatedMinutes: t.allocatedMinutes,
        isCustom: !t.topicId,
        priority: t.priority,
        category: t.category
      });
    });

    setAppliedSuccess(true);
    setTimeout(() => {
      onClose();
      if (onNavigateToPlanner) {
        onNavigateToPlanner();
      }
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 select-none animate-fade-in">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Surface */}
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/[0.08] rounded-3xl shadow-2xl overflow-hidden z-10">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100 dark:border-white/[0.06] bg-slate-50/50 dark:bg-white/[0.02]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-500 shadow-xs shrink-0">
              <Zap className="w-5 h-5 fill-amber-500" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
                  Smart Backlog Rescue
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-black bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                  AI Adaptive
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                Zero overwhelm · Converts pending backlog into realistic daily action blocks
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-all cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 custom-scrollbar">
          
          {/* 1. Backlog Diagnostics Bento */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="p-3 rounded-2xl bg-slate-50/90 dark:bg-[#131522] border border-slate-200/80 dark:border-white/[0.08] text-center">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block truncate">
                Pending Topics
              </span>
              <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono mt-0.5 block tabular-nums">
                {backlogStats.totalPending}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-rose-500/[0.06] dark:bg-rose-500/[0.08] border border-rose-500/20 text-center">
              <span className="text-xs font-bold text-rose-600 dark:text-rose-400 block truncate">
                Weak Traps
              </span>
              <span className="text-xl sm:text-2xl font-black text-rose-600 dark:text-rose-400 font-mono mt-0.5 block tabular-nums">
                {backlogStats.weakCount}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-amber-500/[0.06] dark:bg-amber-500/[0.08] border border-amber-500/20 text-center">
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 block truncate">
                Due Revisions
              </span>
              <span className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400 font-mono mt-0.5 block tabular-nums">
                {backlogStats.dueRevCount}
              </span>
            </div>
          </div>

          {/* 2. Available Hours Selector */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                <span>Select Available Time Today</span>
              </label>
              <span className="text-xs font-mono font-black text-blue-600 dark:text-[#7AA2F7]">
                {availableHours} Hours ({Math.round(availableHours * 60)} mins)
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {TIME_PRESETS.map(p => {
                const isSelected = availableHours === p.hours;
                return (
                  <button
                    key={p.hours}
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      haptics.light();
                      setAvailableHours(p.hours);
                    }}
                    className={`p-2.5 rounded-2xl border transition-all cursor-pointer text-left active:scale-95 ${
                      isSelected
                        ? 'bg-blue-500/15 dark:bg-blue-500/20 border-blue-500/40 text-blue-700 dark:text-[#7AA2F7] shadow-xs'
                        : 'bg-slate-50/80 dark:bg-[#131522] border-slate-200/80 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-white/20'
                    }`}
                  >
                    <span className="text-xs font-black block">{p.label}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5 font-medium">
                      {p.sublabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Generated Action Blocks for Today */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                Today's High-Yield Rescue Plan ({rescuePlan.length} Pillars)
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Click checkmarks to include/exclude
              </span>
            </div>

            <div className="space-y-2">
              {rescuePlan.map((task) => {
                const selected = isTaskSelected(task.id);
                return (
                  <div
                    key={task.id}
                    onClick={() => toggleTaskSelection(task.id)}
                    className={`p-3 sm:p-3.5 rounded-2xl border transition-all cursor-pointer select-none flex items-start gap-3 group ${
                      selected
                        ? 'bg-white dark:bg-[#131522] border-slate-200/90 dark:border-white/[0.08] shadow-xs hover:border-blue-500/40'
                        : 'bg-slate-50/60 dark:bg-white/[0.02] border-dashed border-slate-200 dark:border-white/[0.06] opacity-60'
                    }`}
                  >
                    {/* Checkbox Icon */}
                    <div
                      className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                        selected
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'border border-slate-300 dark:border-white/20 text-transparent'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>

                    {/* Task Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className={`px-2 py-0.5 rounded-md text-[9.5px] font-mono font-bold border ${task.pillarColor}`}>
                          {task.pillarTag}
                        </span>
                        <span
                          className="px-1.5 py-0.5 rounded-md text-[9.5px] font-bold text-white shrink-0"
                          style={{ backgroundColor: task.subjectColor }}
                        >
                          {task.subjectName}
                        </span>
                      </div>

                      <h4 className="text-xs sm:text-[13px] font-black text-slate-900 dark:text-white tracking-tight truncate">
                        {task.topicName}
                      </h4>

                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                        {task.rationale}
                      </p>
                    </div>

                    {/* Allocated Time Badge */}
                    <div className="shrink-0 text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-[#191C2C] border border-slate-200/80 dark:border-white/[0.08] text-xs font-mono font-black text-slate-800 dark:text-slate-200">
                        <Clock className="w-3 h-3 text-blue-500" />
                        <span>{task.allocatedMinutes}m</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. Clearance Projection Banner */}
          <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-blue-500/10 border border-emerald-500/30 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-[13px] font-bold text-emerald-900 dark:text-emerald-200">
                Backlog Clearance Projection: <strong>{clearanceProjection.daysNeeded} Days</strong>
              </p>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-0.5">
                At {availableHours} hrs/day (~{clearanceProjection.topicsPerDay} topics daily), all pending topics will be fully cleared by <strong>{clearanceProjection.formattedDate}</strong>!
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-white/[0.06] bg-slate-50/50 dark:bg-white/[0.02] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={appliedSuccess}
            onClick={handleApplyToPlanner}
            className="btn-primary py-2.5 px-5 text-xs sm:text-sm font-black flex items-center gap-2 shadow-md hover:shadow-lg active:scale-95 cursor-pointer disabled:opacity-80"
          >
            {appliedSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Applied to Today's Tasks!</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 fill-white" />
                <span>Apply to Today's Planner</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
