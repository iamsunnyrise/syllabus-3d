import React, { useState } from 'react';
import { useSyllabus } from '../../context/SyllabusContext';
import { UserProfileItem } from '../../types/syllabus';
import { X, Users, UserPlus, Check, Flame, Trophy, Calendar, Trash2, Edit2, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { soundManager } from '../../utils/soundEffects';
import { haptics } from '../../utils/haptics';

interface ProfileSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCreate: () => void;
  onOpenEdit?: (profile: UserProfileItem) => void;
}

export const ProfileSwitcherModal: React.FC<ProfileSwitcherModalProps> = ({
  isOpen,
  onClose,
  onOpenCreate,
  onOpenEdit
}) => {
  const { profiles, activeProfileId, switchProfile, deleteProfile, exams } = useSyllabus();
  const [profileToDelete, setProfileToDelete] = useState<UserProfileItem | null>(null);

  if (!isOpen) return null;

  const handleSwitch = (profileId: string) => {
    if (profileId === activeProfileId) return;
    soundManager.playClick();
    haptics.selection();
    switchProfile(profileId);
    onClose();
  };

  const handleConfirmDelete = () => {
    if (!profileToDelete) return;
    deleteProfile(profileToDelete.id);
    haptics.success();
    setProfileToDelete(null);
  };

  const getExamName = (examId: string) => {
    const found = exams.find(e => e.id === examId);
    return found ? found.name : 'Target Exam';
  };

  return (
    <div className="fixed inset-0 z-[105] flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-xl rounded-3xl bg-white dark:bg-[#0F172A] border border-[#DDD6FE] dark:border-[#334155] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#DDD6FE] dark:border-[#334155] flex items-center justify-between bg-[#F5F3FF]/70 dark:bg-[#1E293B]/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#7C3AED]/20 to-[#22D3EE]/20 border border-[#7C3AED]/30 flex items-center justify-center text-[#7C3AED] dark:text-[#A78BFA] shadow-xs">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
                  Profiles & Aspirants
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#EDE9FE] dark:bg-[#334155] text-[#7C3AED] dark:text-[#A78BFA] border border-[#DDD6FE] dark:border-[#475569]">
                  {profiles.length} {profiles.length === 1 ? 'Profile' : 'Profiles'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Switch between study profiles with separate syllabus progress, streaks & planner
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1E293B] transition-colors cursor-pointer active:scale-95"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Delete Confirmation Alert Banner */}
        {profileToDelete && (
          <div className="p-4 bg-rose-500/10 border-b border-rose-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shrink-0 animate-fade-in">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
              <div>
                <span className="text-xs font-bold text-rose-700 dark:text-rose-400 block">
                  Delete &quot;{profileToDelete.name}&quot;?
                </span>
                <span className="text-[11px] text-rose-600/90 dark:text-rose-400/90 block">
                  All syllabus topics, revisions, and task history for this profile will be permanently removed.
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
              <button
                onClick={() => setProfileToDelete(null)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-[#1E293B] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-rose-600 text-white shadow-xs hover:bg-rose-700 transition-colors cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        )}

        {/* Profiles List */}
        <div className="p-4 sm:p-5 space-y-3 overflow-y-auto custom-scrollbar flex-1">
          {profiles.map(p => {
            const isActive = p.id === activeProfileId;
            const examLabel = getExamName(p.targetExamId);

            return (
              <div
                key={p.id}
                onClick={() => {
                  if (!isActive) handleSwitch(p.id);
                }}
                className={`group relative p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#7C3AED]/[0.08] dark:bg-[#7C3AED]/[0.15] border-[#7C3AED] shadow-md shadow-[#7C3AED]/15 ring-2 ring-[#7C3AED]/30'
                    : 'bg-white dark:bg-[#1E293B]/70 border-[#DDD6FE]/80 dark:border-[#334155] hover:border-[#7C3AED]/60 dark:hover:border-[#7C3AED]/60 hover:shadow-md'
                }`}
              >
                <div className="flex items-start sm:items-center justify-between gap-3">
                  {/* Left: Avatar & Profile Details */}
                  <div className="flex items-center gap-3.5 min-w-0 flex-1">
                    <div
                      className={`w-13 h-13 min-w-[52px] min-h-[52px] rounded-2xl bg-gradient-to-tr ${
                        p.avatarColor || 'from-[#7C3AED] to-[#22D3EE]'
                      } flex items-center justify-center text-white shadow-md text-2xl border-2 border-white dark:border-[#334155] shrink-0 overflow-hidden relative`}
                    >
                      {p.avatarUrl ? (
                        <img src={p.avatarUrl} alt={p.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="leading-none drop-shadow">{p.avatarEmoji || '🦁'}</span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white truncate">
                          {p.name}
                        </h4>
                        {isActive && (
                          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shadow-2xs">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            ACTIVE
                          </span>
                        )}
                      </div>

                      {/* Meta Pills: Level, Streak, Exam */}
                      <div className="flex items-center gap-2 sm:gap-2.5 mt-1.5 flex-wrap text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        <span className="inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-[#0F172A] text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80">
                          <Trophy className="w-3 h-3 text-amber-500" />
                          <span>Lvl {p.level || 1}</span>
                        </span>

                        <span className="inline-flex items-center gap-1 font-mono font-bold px-2 py-0.5 rounded-lg bg-orange-500/10 dark:bg-orange-500/15 text-orange-600 dark:text-orange-400 border border-orange-500/25">
                          <Flame className="w-3 h-3 fill-current text-orange-500" />
                          <span>{p.currentStreak || 0}d streak</span>
                        </span>

                        <span className="inline-flex items-center gap-1 font-semibold truncate px-2 py-0.5 rounded-lg bg-[#EDE9FE]/70 dark:bg-[#0F172A] text-[#7C3AED] dark:text-[#A78BFA] border border-[#DDD6FE] dark:border-slate-700/80">
                          <Calendar className="w-3 h-3 text-[#7C3AED] dark:text-[#A78BFA] shrink-0" />
                          <span className="truncate">{examLabel}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-1.5 sm:gap-2 shrink-0" onClick={e => e.stopPropagation()}>
                    {onOpenEdit && (
                      <button
                        type="button"
                        onClick={() => {
                          soundManager.playClick();
                          onClose();
                          onOpenEdit(p);
                        }}
                        className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#0F172A] transition-colors cursor-pointer"
                        title="Edit Profile Details"
                        aria-label="Edit Profile Details"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    )}

                    {profiles.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          soundManager.playClick();
                          setProfileToDelete(p);
                        }}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                        title="Delete Profile"
                        aria-label="Delete Profile"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}

                    {isActive ? (
                      <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs font-black flex items-center gap-1.5 shadow-2xs">
                        <Check className="w-3.5 h-3.5" />
                        <span>Active</span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSwitch(p.id)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F172A] hover:bg-[#7C3AED] dark:bg-[#0F172A] dark:hover:bg-[#7C3AED] text-white text-xs font-black shadow-xs transition-all cursor-pointer active:scale-95 group-hover:bg-[#7C3AED]"
                      >
                        <span>Switch</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-[#DDD6FE] dark:border-[#334155] bg-[#F5F3FF]/50 dark:bg-[#1E293B]/40 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>100% Isolated data per profile • Zero cross-leaks</span>
          </div>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              haptics.selection();
              onClose();
              onOpenCreate();
            }}
            className="flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#6366F1] hover:from-[#6D28D9] hover:to-[#4F46E5] text-white text-xs font-black shadow-md shadow-[#7C3AED]/25 transition-all cursor-pointer active:scale-95"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add New Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};
