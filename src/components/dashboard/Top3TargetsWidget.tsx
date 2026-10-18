import React, { useState } from 'react';
import {
  Target,
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Sparkles,
  Flame,
  BookOpen,
  Edit2,
  Check,
  X,
  ChevronDown,
  Search,
  Zap
} from 'lucide-react';
import { useSyllabus } from '../../context/SyllabusContext';
import { soundManager } from '../../utils/soundEffects';

interface Top3TargetsWidgetProps {
  onNavigateToTopic?: (topicId: string) => void;
}

export const Top3TargetsWidget: React.FC<Top3TargetsWidgetProps> = ({ onNavigateToTopic }) => {
  const {
    top3Targets,
    updateTop3Target,
    toggleTop3Target,
    clearTop3Target,
    allTopics
  } = useSyllabus();

  const [editingTargetId, setEditingTargetId] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>('');
  const [isPickerOpen, setIsPickerOpen] = useState<string | null>(null);
  const [pickerSearch, setPickerSearch] = useState<string>('');

  const filledTargets = top3Targets.filter(t => t.text.trim());
  const completedTargets = filledTargets.filter(t => t.completed);
  const completionPercentage = filledTargets.length > 0
    ? Math.round((completedTargets.length / 3) * 100)
    : 0;

  const handleStartEdit = (targetId: string, currentText: string) => {
    setEditingTargetId(targetId);
    setEditText(currentText);
    setIsPickerOpen(null);
  };

  const handleSaveEdit = (targetId: string) => {
    if (editText.trim()) {
      updateTop3Target(targetId, editText.trim());
    }
    setEditingTargetId(null);
    setEditText('');
    soundManager.playClick();
  };

  const handleSelectTopicFromSyllabus = (targetId: string, topicObj: { topic: { id: string; name: string }; subjectName: string; subjectColor: string }) => {
    updateTop3Target(targetId, topicObj.topic.name, {
      topicId: topicObj.topic.id,
      subjectName: topicObj.subjectName,
      subjectColor: topicObj.subjectColor
    });
    setIsPickerOpen(null);
    setEditingTargetId(null);
    setPickerSearch('');
    soundManager.playClick();
  };

  const targetSlotMeta = [
    {
      num: '01',
      title: 'Priority Target',
      badge: 'Priority',
      badgeClass: 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/25',
      accentGlow: 'hover:border-amber-500/40'
    },
    {
      num: '02',
      title: 'Practice & Problems',
      badge: 'Practice',
      badgeClass: 'bg-sky-500/15 text-sky-700 dark:text-sky-400 border-sky-500/25',
      accentGlow: 'hover:border-sky-500/40'
    },
    {
      num: '03',
      title: 'Revision & Review',
      badge: 'Revision',
      badgeClass: 'bg-purple-500/15 text-purple-700 dark:text-purple-400 border-purple-500/25',
      accentGlow: 'hover:border-purple-500/40'
    }
  ];

  const filteredTopics = allTopics.filter(t => {
    if (!pickerSearch.trim()) return true;
    const q = pickerSearch.toLowerCase();
    return (
      t.topic.name.toLowerCase().includes(q) ||
      t.subjectName.toLowerCase().includes(q) ||
      t.chapterName.toLowerCase().includes(q)
    );
  }).slice(0, 15);

  return (
    <div className="group relative rounded-2xl bg-white dark:bg-[#0E111D]/90 dark:backdrop-blur-xl border border-slate-200/80 dark:border-white/[0.08] shadow-xs hover:shadow-md dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all duration-300 p-4 sm:p-5.5 space-y-4 overflow-hidden">
      
      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0 shadow-2xs">
              <Target className="w-4 sm:w-4.5 h-4 sm:h-4.5 stroke-[2.3]" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight font-sans">
                  Top 3 Daily Targets
                </h3>
                {completedTargets.length === 3 ? (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-sans font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/25">
                    3/3 Done
                  </span>
                ) : completedTargets.length > 0 ? (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-sans font-bold bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/25">
                    {completedTargets.length}/3 Done
                  </span>
                ) : null}
              </div>
            </div>
          </div>

        </div>

        {/* 3 Non-Negotiable Slots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3.5 relative z-10">
          {top3Targets.map((target, idx) => {
            const meta = targetSlotMeta[idx] || {
              num: `0${idx + 1}`,
              title: `Target #${idx + 1}`,
              badge: 'Sprint Target',
              badgeClass: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
              accentGlow: 'hover:border-amber-500/40'
            };
            const isEditing = editingTargetId === target.id;
            const isPicker = isPickerOpen === target.id;
            const hasText = Boolean(target.text.trim());

            return (
              <div
                key={target.id}
                className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-200 relative flex flex-col justify-between space-y-3 group shadow-2xs ${
                  target.completed
                    ? 'bg-emerald-500/[0.04] dark:bg-emerald-500/[0.06] border-emerald-500/35'
                    : hasText
                    ? `bg-white dark:bg-white/[0.03] border-slate-200/90 dark:border-white/[0.08] ${meta.accentGlow}`
                    : 'bg-slate-50/60 dark:bg-white/[0.02] border-slate-200/80 dark:border-white/[0.07] hover:border-slate-300 dark:hover:border-white/15'
                }`}
              >
                {/* Slot Header */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`px-2 py-0.5 rounded-md text-[11px] font-sans font-bold border ${meta.badgeClass}`}>
                      #{meta.num}
                    </span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate font-sans">
                      {meta.title}
                    </span>
                  </div>

                  {hasText && (
                    <div className="flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleStartEdit(target.id, target.text)}
                        className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all cursor-pointer"
                        title="Edit target name"
                        aria-label="Edit target name"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => clearTop3Target(target.id)}
                        className="p-1 rounded-md text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-all cursor-pointer"
                        title="Clear slot"
                        aria-label="Clear slot"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Slot Body: Active Target Text OR Empty Input State */}
                <div className="min-h-[52px] flex flex-col justify-center">
                  {isEditing ? (
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        autoFocus
                        value={editText}
                        onChange={e => setEditText(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === 'Enter') handleSaveEdit(target.id);
                          if (e.key === 'Escape') setEditingTargetId(null);
                        }}
                        placeholder="Enter target name..."
                        className="flex-1 px-3 py-1.5 rounded-lg bg-white dark:bg-[#12131C] border border-amber-500 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none shadow-2xs font-sans"
                      />
                      <button
                        onClick={() => handleSaveEdit(target.id)}
                        className="p-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold cursor-pointer transition-all shadow-2xs active:scale-95"
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </button>
                      <button
                        onClick={() => setEditingTargetId(null)}
                        className="p-1.5 rounded-lg bg-slate-200 dark:bg-[#28293D] text-slate-600 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : hasText ? (
                    <div
                      onClick={() => toggleTop3Target(target.id)}
                      className="flex items-start gap-2.5 cursor-pointer"
                    >
                      {/* Tactile Squircle Checkbox */}
                      <button
                        type="button"
                        className={`mt-0.5 w-5 h-5 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200 active:scale-90 ${
                          target.completed
                            ? 'bg-emerald-500 text-white shadow-2xs ring-2 ring-emerald-500/20'
                            : 'border-2 border-slate-300 dark:border-white/20 group-hover:border-amber-500 dark:group-hover:border-amber-400 bg-white/70 dark:bg-black/20'
                        }`}
                      >
                        {target.completed && <Check className="w-3 h-3 stroke-[3]" />}
                      </button>

                      <div className="min-w-0 flex-1">
                        <p
                          className={`text-xs sm:text-sm font-semibold leading-snug transition-colors font-sans ${
                            target.completed
                              ? 'line-through text-slate-400 dark:text-slate-500'
                              : 'text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400'
                          }`}
                        >
                          {target.text}
                        </p>
                        {target.subjectName && (
                          <div className="inline-flex items-center gap-1.5 mt-1 px-2 py-0.5 rounded-md bg-slate-100/80 dark:bg-white/[0.06] border border-slate-200/60 dark:border-white/[0.06] text-[11px] font-sans font-medium text-slate-700 dark:text-slate-300">
                            <span
                              className="w-1.5 h-1.5 rounded-full shrink-0"
                              style={{ backgroundColor: target.subjectColor || '#2563EB' }}
                            />
                            <span className="truncate max-w-[140px]">{target.subjectName}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* Clean Minimalist Empty State Action Row */
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleStartEdit(target.id, '')}
                          className="flex-1 py-1.5 px-2.5 rounded-lg bg-white dark:bg-white/[0.04] hover:bg-slate-50 dark:hover:bg-white/[0.08] text-slate-700 dark:text-slate-200 border border-slate-200/90 dark:border-white/[0.08] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-2xs hover:border-slate-300 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5 text-slate-400" />
                          <span>Custom Target</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setIsPickerOpen(isPicker ? null : target.id);
                            setPickerSearch('');
                          }}
                          className="flex-1 py-1.5 px-2.5 rounded-lg bg-amber-50/80 dark:bg-amber-500/[0.08] hover:bg-amber-100/70 dark:hover:bg-amber-500/[0.14] text-amber-800 dark:text-amber-300 border border-amber-300/60 dark:border-amber-500/25 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer"
                          title="Choose from Syllabus"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                          <span>From Syllabus</span>
                        </button>
                      </div>

                      {/* Dropdown Topic Picker */}
                      {isPicker && (
                        <div className="p-3 rounded-xl bg-white dark:bg-[#1A1B29] border border-slate-200/90 dark:border-white/[0.1] shadow-2xl space-y-2 mt-1 z-30 animate-fade-in">
                          <div className="relative">
                            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input
                              type="text"
                              placeholder="Search syllabus topics..."
                              value={pickerSearch}
                              onChange={e => setPickerSearch(e.target.value)}
                              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-50 dark:bg-[#12131D] border border-slate-200 dark:border-white/[0.08] text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
                            />
                          </div>
                          <div className="max-h-44 overflow-y-auto space-y-1 custom-scrollbar">
                            {filteredTopics.length === 0 ? (
                              <p className="text-center py-4 text-xs text-slate-400 font-sans">No matching topics found</p>
                            ) : (
                              filteredTopics.map(t => (
                                <div
                                  key={t.topic.id}
                                  onClick={() => handleSelectTopicFromSyllabus(target.id, t)}
                                  className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer flex items-center justify-between text-xs transition-colors"
                                >
                                  <span className="font-semibold text-slate-900 dark:text-white truncate font-sans">
                                    {t.topic.name}
                                  </span>
                                  <span className="text-[10px] text-slate-400 shrink-0 ml-2 font-sans font-medium">
                                    {t.subjectName}
                                  </span>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Subdued Progress / Status Cue */}
                {hasText && (
                  <div className="pt-2 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-sans">
                    <span className="text-[10px] font-bold tracking-wider">
                      {target.completed ? 'COMPLETED' : 'IN PROGRESS'}
                    </span>
                    {target.completed ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 text-xs">
                        <Check className="w-3 h-3 stroke-[3]" />
                        <span>Done</span>
                      </span>
                    ) : (
                      <span className="text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1 text-xs">
                        <Zap className="w-3 h-3 fill-current" />
                        <span>Active</span>
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Velocity Sprint Meter - Clean Integrated Footer */}
        <div className="relative z-10 pt-3 border-t border-slate-100 dark:border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs font-sans">
          <div className="flex items-center gap-2.5 w-full sm:w-auto min-w-0">
            <div className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-200 shrink-0">
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-current" />
              <span>Sprint Velocity:</span>
            </div>
            <div className="flex-1 sm:w-36 h-2 rounded-full bg-slate-100 dark:bg-white/[0.08] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-500 rounded-full transition-all duration-500"
                style={{
                  width: `${completionPercentage}%`
                }}
              />
            </div>
            <span className="font-semibold text-xs text-slate-800 dark:text-slate-200 tabular-nums shrink-0">
              {completedTargets.length}/3 Done ({completionPercentage}%)
            </span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 text-left sm:text-right truncate">
            {completedTargets.length === 3
              ? '🎉 Outstanding! All 3 core targets crushed today.'
              : completedTargets.length === 2
              ? '🔥 2 crushed! Just 1 remaining.'
              : completedTargets.length === 1
              ? '🎯 1 done! Momentum is building.'
              : 'Complete these 3 priority targets today.'}
          </p>
        </div>

      </div>
  );
};

