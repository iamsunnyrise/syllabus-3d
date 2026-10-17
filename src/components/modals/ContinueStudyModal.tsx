import React, { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Play,
  Clock,
  ArrowRight,
  BookOpen,
  Sparkles,
  Layers,
  Flame,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { Topic } from '../../types/syllabus';
import { useSyllabus } from '../../context/SyllabusContext';
import { useTimer } from '../../context/TimerContext';
import { soundManager } from '../../utils/soundEffects';
import { haptics } from '../../utils/haptics';
import { AppView } from '../layout/Sidebar';

interface ContinueStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTopicDrawer?: (topic: Topic, subjectName: string, chapterName: string) => void;
  onOpenFocus?: () => void;
  onNavigate?: (view: AppView) => void;
}

const toNaturalCase = (text: string) => {
  if (!text) return '';
  if (text === text.toUpperCase() && text.length > 3) {
    return text
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  return text;
};

export const ContinueStudyModal: React.FC<ContinueStudyModalProps> = ({
  isOpen,
  onClose,
  onOpenTopicDrawer,
  onOpenFocus,
  onNavigate
}) => {
  const { currentExam } = useSyllabus();
  const { openFullModal } = useTimer();

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Primary topic to resume (weak/due, in_progress, or not_started)
  const primaryTopic = useMemo(() => {
    if (!currentExam?.subjects) return null;
    let weakOrDue: { topic: Topic; subjectName: string; chapterName: string; badge: string; badgeClass: string } | null = null;
    let inProgress: { topic: Topic; subjectName: string; chapterName: string; badge: string; badgeClass: string } | null = null;
    let notStarted: { topic: Topic; subjectName: string; chapterName: string; badge: string; badgeClass: string } | null = null;

    for (const subject of currentExam.subjects || []) {
      for (const chapter of subject.chapters || []) {
        for (const topic of chapter.topics || []) {
          if (!weakOrDue && (topic.status === 'weak' || topic.isWeak)) {
            weakOrDue = {
              topic,
              subjectName: subject.name,
              chapterName: chapter.name,
              badge: 'Weak Area',
              badgeClass: 'text-rose-600 bg-rose-50 border-rose-200 dark:text-rose-400 dark:bg-rose-950/40 dark:border-rose-900/50'
            };
          } else if (!weakOrDue && topic.status === 'revision_due') {
            weakOrDue = {
              topic,
              subjectName: subject.name,
              chapterName: chapter.name,
              badge: 'Revision Due',
              badgeClass: 'text-amber-600 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-950/40 dark:border-amber-900/50'
            };
          } else if (!inProgress && topic.status === 'in_progress') {
            inProgress = {
              topic,
              subjectName: subject.name,
              chapterName: chapter.name,
              badge: 'In Progress',
              badgeClass: 'text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-950/40 dark:border-blue-900/50'
            };
          } else if (!notStarted && topic.status === 'not_started') {
            notStarted = {
              topic,
              subjectName: subject.name,
              chapterName: chapter.name,
              badge: 'Up Next',
              badgeClass: 'text-purple-600 bg-purple-50 border-purple-200 dark:text-purple-400 dark:bg-purple-950/40 dark:border-purple-900/50'
            };
          }
        }
      }
    }

    return weakOrDue || inProgress || notStarted || null;
  }, [currentExam]);

  // List of other active or pending topics
  const otherActiveTopics = useMemo(() => {
    if (!currentExam?.subjects) return [];
    const list: Array<{ topic: Topic; subjectName: string; chapterName: string; badge: string; badgeClass: string }> = [];

    for (const subject of currentExam.subjects || []) {
      for (const chapter of subject.chapters || []) {
        for (const topic of chapter.topics || []) {
          if (primaryTopic && topic.id === primaryTopic.topic.id) continue;
          if (topic.status === 'in_progress') {
            list.push({
              topic,
              subjectName: subject.name,
              chapterName: chapter.name,
              badge: 'In Progress',
              badgeClass: 'text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-950/40 dark:border-blue-900/50'
            });
          } else if (topic.status === 'weak' || topic.isWeak) {
            list.push({
              topic,
              subjectName: subject.name,
              chapterName: chapter.name,
              badge: 'Weak Area',
              badgeClass: 'text-rose-600 bg-rose-50 border-rose-200 dark:text-rose-400 dark:bg-rose-950/40 dark:border-rose-900/50'
            });
          } else if (topic.status === 'revision_due') {
            list.push({
              topic,
              subjectName: subject.name,
              chapterName: chapter.name,
              badge: 'Revision Due',
              badgeClass: 'text-amber-600 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-950/40 dark:border-amber-900/50'
            });
          }
          if (list.length >= 4) break;
        }
        if (list.length >= 4) break;
      }
      if (list.length >= 4) break;
    }

    return list;
  }, [currentExam, primaryTopic]);

  if (!isOpen) return null;
  if (typeof document === 'undefined') return null;

  const handleResumePrimary = () => {
    soundManager.playClick();
    haptics.selection();
    if (primaryTopic && onOpenTopicDrawer) {
      onOpenTopicDrawer(primaryTopic.topic, primaryTopic.subjectName, primaryTopic.chapterName);
    } else if (onNavigate) {
      onNavigate('syllabus');
    }
    onClose();
  };

  const handleStartFocus = () => {
    soundManager.playClick();
    haptics.selection();
    if (onOpenFocus) {
      onOpenFocus();
    } else {
      openFullModal();
    }
    onClose();
  };

  const handleSelectTopic = (item: { topic: Topic; subjectName: string; chapterName: string }) => {
    soundManager.playClick();
    haptics.selection();
    if (onOpenTopicDrawer) {
      onOpenTopicDrawer(item.topic, item.subjectName, item.chapterName);
    } else if (onNavigate) {
      onNavigate('syllabus');
    }
    onClose();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl max-h-[92vh] bg-white dark:bg-[#0E111D] border border-slate-200/90 dark:border-white/10 rounded-3xl shadow-2xl dark:shadow-[0_12px_50px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col text-slate-900 dark:text-white my-auto animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Subtle Ambient Radial Highlight */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-blue-500/10 dark:bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-amber-500/10 dark:bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="relative z-10 px-5 sm:px-6 py-4 sm:py-5 border-b border-slate-200/80 dark:border-white/[0.08] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 flex items-center justify-center shrink-0 shadow-2xs">
              <Play className="w-5 h-5 fill-current ml-0.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                  Continue Study
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 uppercase tracking-wider">
                  Active
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Jump back in and pick up right where you left off
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="relative z-10 p-5 sm:p-6 overflow-y-auto space-y-5">
          {primaryTopic ? (
            /* 🎯 PRIMARY JUMP BACK IN CARD (Exact reference layout & styling) */
            <div className="relative rounded-2xl bg-slate-50/90 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] p-4 sm:p-5 shadow-xs transition-all overflow-hidden group jump-back-in-hub">
              {/* Subtle ambient blur */}
              <div className="absolute -top-8 -right-8 w-36 h-36 bg-blue-500/15 dark:bg-blue-400/15 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 flex flex-col gap-4">
                {/* Meta Header */}
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-sans font-semibold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Jump Back In
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate">
                      {toNaturalCase(primaryTopic.subjectName)} • {toNaturalCase(primaryTopic.chapterName)}
                    </span>
                  </div>

                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${primaryTopic.badgeClass}`}>
                    {primaryTopic.badge}
                  </span>
                </div>

                {/* Topic Title */}
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {primaryTopic.topic.name}
                  </h3>

                  {/* Progress Summary */}
                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-sans mt-2">
                    {primaryTopic.topic.subtopics && primaryTopic.topic.subtopics.length > 0 ? (
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <div className="w-24 sm:w-28 h-2 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                            style={{ width: `${primaryTopic.topic.completionPercentage || 0}%` }}
                          />
                        </div>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums">
                          {primaryTopic.topic.completionPercentage || 0}% Mastered
                        </span>
                        <span className="text-slate-300 dark:text-slate-600">•</span>
                        <span>{primaryTopic.topic.subtopics.length} Subtopics</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>Ready for study & notes</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="flex items-center gap-2.5 pt-2 border-t border-slate-200/60 dark:border-white/[0.06] flex-wrap sm:flex-nowrap">
                  <button
                    type="button"
                    onClick={handleStartFocus}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-white dark:bg-white/[0.05] hover:bg-slate-100 dark:hover:bg-white/[0.1] text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer border border-slate-200/80 dark:border-white/10 shadow-2xs hover:shadow-xs"
                    title="Start 25-minute Pomodoro Focus session"
                  >
                    <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>25m Focus</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleResumePrimary}
                    className="flex-1 sm:flex-[1.5] px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all group/btn"
                  >
                    <span>Resume Study</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 px-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06]">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                All caught up!
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                No pending or weak topics found. Pick any topic from your Syllabus to start studying.
              </p>
            </div>
          )}

          {/* 📚 OTHER TOPICS IN PROGRESS (Quick Switcher) */}
          {otherActiveTopics.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Other Topics in Progress
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {otherActiveTopics.length} Topics
                </span>
              </div>

              <div className="space-y-2">
                {otherActiveTopics.map(item => (
                  <div
                    key={item.topic.id}
                    onClick={() => handleSelectTopic(item)}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-white/[0.03] dark:hover:bg-white/[0.06] border border-slate-200/70 dark:border-white/[0.06] flex items-center justify-between gap-3 cursor-pointer transition-all group active:scale-[0.99]"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">
                          {toNaturalCase(item.subjectName)}
                        </span>
                        <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold border ${item.badgeClass}`}>
                          {item.badge}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate mt-0.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {item.topic.name}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 hidden sm:inline">
                        Study
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="relative z-10 px-5 sm:px-6 py-3.5 bg-slate-50/80 dark:bg-white/[0.02] border-t border-slate-200/80 dark:border-white/[0.08] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              if (onNavigate) {
                onNavigate('syllabus');
              }
              onClose();
            }}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Open Syllabus Explorer</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="px-4 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
