import React, { useState, useEffect } from 'react';
import { useSyllabus } from '../../context/SyllabusContext';
import { useAuth } from '../../context/AuthContext';
import { UserProfileItem } from '../../types/syllabus';
import { X, Sparkles, User, Calendar, Target, Plus, Check, Camera, Trash2, ShieldCheck, Smile } from 'lucide-react';
import { soundManager } from '../../utils/soundEffects';
import { haptics } from '../../utils/haptics';

interface CreateProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingProfile?: UserProfileItem | null;
  onSuccess?: (profileId: string) => void;
}

const EMOJI_PRESETS = ['🦁', '🚀', '🦅', '⚡', '🎯', '👑', '🔥', '🦉', '🐺', '🐅', '🌟', '💎', '🎓', '⚔️', '🏆', '💡'];

const GRADIENT_PRESETS = [
  { label: 'Royal Indigo', class: 'from-[#7C3AED] to-[#6366F1]', border: 'border-[#7C3AED]' },
  { label: 'Electric Cyan', class: 'from-[#0284C7] to-[#22D3EE]', border: 'border-[#22D3EE]' },
  { label: 'Amber Fire', class: 'from-amber-500 to-orange-600', border: 'border-amber-500' },
  { label: 'Emerald Forest', class: 'from-emerald-500 to-teal-600', border: 'border-emerald-500' },
  { label: 'Crimson Rose', class: 'from-rose-500 to-pink-600', border: 'border-rose-500' },
  { label: 'Sunset Magenta', class: 'from-fuchsia-500 to-purple-700', border: 'border-fuchsia-500' },
  { label: 'Royal Blue', class: 'from-blue-600 to-indigo-700', border: 'border-blue-600' },
  { label: 'Dark Stealth', class: 'from-slate-700 to-slate-900', border: 'border-slate-600' },
];

const PRESET_EXAMS = [
  { id: 'exam_ssc_cgl_2026', name: 'SSC CGL 2026', date: '2026-10-15' },
  { id: 'exam_upsc_cse_2026', name: 'UPSC CSE 2026', date: '2026-05-24' },
  { id: 'exam_ibps_po_2026', name: 'IBPS PO / Banking 2026', date: '2026-11-10' },
  { id: 'exam_rrb_ntpc_2026', name: 'Railway RRB NTPC 2026', date: '2026-09-18' },
  { id: 'exam_state_pcs_2026', name: 'State PCS 2026', date: '2026-12-05' },
];

const ASPIRANT_AVATARS = [
  {
    id: 'avatar_officer',
    label: 'Civil Servant',
    svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%231E1B4B"/><stop offset="100%" stop-color="%234338CA"/></linearGradient></defs><rect width="100" height="100" rx="28" fill="url(%23g1)"/><circle cx="50" cy="38" r="18" fill="%23FED7AA"/><path d="M50 20 C40 20 34 26 34 32 C36 32 38 30 42 29 C46 28 54 28 58 29 C62 30 64 32 66 32 C66 26 60 20 50 20 Z" fill="%231E293B"/><rect x="42" y="34" width="6" height="5" rx="2" fill="none" stroke="%23334155" stroke-width="1.5"/><rect x="52" y="34" width="6" height="5" rx="2" fill="none" stroke="%23334155" stroke-width="1.5"/><line x1="48" y1="36" x2="52" y2="36" stroke="%23334155" stroke-width="1.5"/><path d="M46 47 Q50 51 54 47" stroke="%23EA580C" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M22 92 C22 72 32 62 50 62 C68 62 78 72 78 92 Z" fill="%230F172A"/><polygon points="50,62 45,78 50,92 55,78" fill="%23DC2626"/><polygon points="46,62 50,72 54,62" fill="%23FFFFFF"/></svg>`
  },
  {
    id: 'avatar_tech',
    label: 'Tech Aspirant',
    svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%230E7490"/><stop offset="100%" stop-color="%230284C7"/></linearGradient></defs><rect width="100" height="100" rx="28" fill="url(%23g2)"/><circle cx="50" cy="38" r="18" fill="%23FDE68A"/><path d="M34 30 C36 22 44 18 50 18 C58 18 64 22 66 30 C64 30 60 26 50 26 C40 26 36 30 34 30 Z" fill="%230F172A"/><rect x="39" y="34" width="9" height="6" rx="2" fill="%230284C7" fill-opacity="0.3" stroke="%2322D3EE" stroke-width="1.5"/><rect x="52" y="34" width="9" height="6" rx="2" fill="%230284C7" fill-opacity="0.3" stroke="%2322D3EE" stroke-width="1.5"/><line x1="48" y1="37" x2="52" y2="37" stroke="%2322D3EE" stroke-width="1.5"/><path d="M46 47 Q50 51 54 47" stroke="%23D97706" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M22 92 C22 70 34 60 50 60 C66 60 78 70 78 92 Z" fill="%231E293B"/><polygon points="50,60 45,74 55,74" fill="%2322D3EE"/></svg>`
  },
  {
    id: 'avatar_doctor',
    label: 'Medical Scholar',
    svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23047857"/><stop offset="100%" stop-color="%230D9488"/></linearGradient></defs><rect width="100" height="100" rx="28" fill="url(%23g3)"/><circle cx="50" cy="38" r="18" fill="%23FED7AA"/><path d="M32 30 C34 20 44 18 50 18 C56 18 66 20 68 30 C65 28 58 26 50 26 C42 26 35 28 32 30 Z" fill="%23374151"/><circle cx="44" cy="37" r="2.5" fill="%231F2937"/><circle cx="56" cy="37" r="2.5" fill="%231F2937"/><path d="M46 47 Q50 51 54 47" stroke="%23EA580C" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M22 92 C22 70 34 60 50 60 C66 60 78 70 78 92 Z" fill="%23065F46"/><path d="M40 60 C40 76 60 76 60 60" fill="none" stroke="%23E2E8F0" stroke-width="3" stroke-linecap="round"/><circle cx="50" cy="78" r="4" fill="%2338BDF8"/></svg>`
  },
  {
    id: 'avatar_topper',
    label: 'Topper Rank 1',
    svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g4" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23B45309"/><stop offset="100%" stop-color="%23F59E0B"/></linearGradient></defs><rect width="100" height="100" rx="28" fill="url(%23g4)"/><circle cx="50" cy="40" r="18" fill="%23FED7AA"/><polygon points="50,14 44,22 36,20 40,28 36,36 44,34 50,42 56,34 64,36 60,28 64,20 56,22" fill="%23FBBF24" stroke="%23D97706" stroke-width="1.5"/><circle cx="44" cy="39" r="2.5" fill="%231F2937"/><circle cx="56" cy="39" r="2.5" fill="%231F2937"/><path d="M46 48 Q50 53 54 48" stroke="%23EA580C" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M22 92 C22 72 34 62 50 62 C66 62 78 72 78 92 Z" fill="%2378350F"/><polygon points="50,62 43,80 50,92 57,80" fill="%23FBBF24"/></svg>`
  },
  {
    id: 'avatar_scholar',
    label: 'Master Scholar',
    svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g5" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%236D28D9"/><stop offset="100%" stop-color="%237C3AED"/></linearGradient></defs><rect width="100" height="100" rx="28" fill="url(%23g5)"/><polygon points="50,16 26,26 50,36 74,26" fill="%231E1B4B"/><rect x="47" y="32" width="6" height="8" fill="%231E1B4B"/><circle cx="50" cy="46" r="16" fill="%23FDE68A"/><rect x="42" y="42" width="6" height="5" rx="2" fill="none" stroke="%231E1B4B" stroke-width="1.5"/><rect x="52" y="42" width="6" height="5" rx="2" fill="none" stroke="%231E1B4B" stroke-width="1.5"/><line x1="48" y1="44" x2="52" y2="44" stroke="%231E1B4B" stroke-width="1.5"/><path d="M46 54 Q50 58 54 54" stroke="%23D97706" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M24 94 C24 76 34 66 50 66 C66 66 76 76 76 94 Z" fill="%232E1065"/></svg>`
  },
  {
    id: 'avatar_strategist',
    label: 'Strategist',
    svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g6" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%230F172A"/><stop offset="100%" stop-color="%23334155"/></linearGradient></defs><rect width="100" height="100" rx="28" fill="url(%23g6)"/><circle cx="50" cy="38" r="18" fill="%23FED7AA"/><path d="M34 28 C38 18 50 16 54 18 C64 20 68 28 66 32 C60 28 52 26 44 26 C38 26 35 28 34 28 Z" fill="%2318181B"/><circle cx="44" cy="37" r="2.5" fill="%231F2937"/><circle cx="56" cy="37" r="2.5" fill="%231F2937"/><path d="M46 47 Q50 50 54 47" stroke="%23C2410C" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M22 92 C22 70 34 60 50 60 C66 60 78 70 78 92 Z" fill="%231E293B"/><circle cx="50" cy="74" r="7" fill="none" stroke="%2338BDF8" stroke-width="2"/><circle cx="50" cy="74" r="2" fill="%2338BDF8"/></svg>`
  }
];

export const CreateProfileModal: React.FC<CreateProfileModalProps> = ({
  isOpen,
  onClose,
  editingProfile,
  onSuccess
}) => {
  const { createProfile, updateProfileById, activeProfileId, exams } = useSyllabus();
  const { updateUserSession } = useAuth();

  const [name, setName] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🦁');
  const [selectedColor, setSelectedColor] = useState('from-[#7C3AED] to-[#6366F1]');
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
  const [targetExamId, setTargetExamId] = useState('exam_ssc_cgl_2026');
  const [targetExamDate, setTargetExamDate] = useState('2026-10-15');
  const [avatarTab, setAvatarTab] = useState<'character' | 'upload' | 'emoji'>('character');

  useEffect(() => {
    if (editingProfile) {
      setName(editingProfile.name || '');
      setSelectedEmoji(editingProfile.avatarEmoji || '🦁');
      setSelectedColor(editingProfile.avatarColor || 'from-[#7C3AED] to-[#6366F1]');
      setAvatarUrl(editingProfile.avatarUrl);
      setTargetExamId(editingProfile.targetExamId || 'exam_ssc_cgl_2026');
      setTargetExamDate(editingProfile.targetExamDate || '2026-10-15');
      if (editingProfile.avatarUrl) {
        setAvatarTab(editingProfile.avatarUrl.startsWith('data:image/svg+xml') ? 'character' : 'upload');
      } else {
        setAvatarTab('emoji');
      }
    } else {
      setName('');
      setSelectedEmoji('🦁');
      setSelectedColor('from-[#7C3AED] to-[#6366F1]');
      setAvatarUrl(ASPIRANT_AVATARS[0].svg);
      setTargetExamId(exams[0]?.id || 'exam_ssc_cgl_2026');
      setTargetExamDate('2026-10-15');
      setAvatarTab('character');
    }
  }, [editingProfile, isOpen, exams]);

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Photo is too large. Please choose an image under 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setAvatarUrl(result);
      soundManager.playClick();
      haptics.light();
    };
    reader.readAsDataURL(file);
  };

  const handleSelectExamPreset = (preset: typeof PRESET_EXAMS[0]) => {
    setTargetExamId(preset.id);
    setTargetExamDate(preset.date);
    soundManager.playClick();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) return;

    const resolvedAvatarUrl = avatarTab === 'emoji' ? undefined : avatarUrl;

    if (editingProfile) {
      updateProfileById(editingProfile.id, {
        name: trimmedName,
        avatarEmoji: selectedEmoji,
        avatarColor: selectedColor,
        avatarUrl: resolvedAvatarUrl,
        targetExamId,
        targetExamDate
      });
      if (editingProfile.id === activeProfileId) {
        updateUserSession({
          name: trimmedName,
          avatarUrl: resolvedAvatarUrl
        });
      }
      soundManager.playCompleteChime();
      haptics.success();
      onSuccess?.(editingProfile.id);
      onClose();
    } else {
      const newId = createProfile({
        name: trimmedName,
        avatarEmoji: selectedEmoji,
        avatarColor: selectedColor,
        avatarUrl: resolvedAvatarUrl,
        targetExamId,
        targetExamDate
      });
      onSuccess?.(newId);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-[#0F172A] border border-[#DDD6FE] dark:border-[#334155] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#DDD6FE] dark:border-[#334155] flex items-center justify-between bg-[#F5F3FF]/70 dark:bg-[#1E293B]/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 min-w-12 min-h-12 max-w-12 max-h-12 aspect-square rounded-2xl bg-gradient-to-tr ${selectedColor} flex items-center justify-center text-white shadow-md text-xl border-2 border-white dark:border-[#334155] overflow-hidden shrink-0`}>
              {avatarTab !== 'emoji' && avatarUrl ? (
                <img src={avatarUrl} alt="Avatar Preview" className="w-full h-full object-cover aspect-square block rounded-xl" />
              ) : (
                <span className="leading-none drop-shadow">{selectedEmoji}</span>
              )}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>{editingProfile ? 'Edit Profile' : 'Create New Profile'}</span>
                {!editingProfile && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-black bg-[#EDE9FE] dark:bg-[#334155] text-[#7C3AED] dark:text-[#A78BFA] border border-[#DDD6FE] dark:border-[#475569]">
                    NEW
                  </span>
                )}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {editingProfile
                  ? 'Update your name, avatar, and target exam'
                  : 'Start a clean aspirant profile with dedicated progress'}
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

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-5 overflow-y-auto custom-scrollbar flex-1">
          {/* Profile Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#7C3AED] dark:text-[#A78BFA]" />
              <span>Aspirant / Profile Name</span>
              <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Rahul Sharma, SSC CGL Track, UPSC 2026"
              required
              maxLength={40}
              className="w-full p-3 rounded-2xl bg-[#F5F3FF]/50 dark:bg-[#1E293B] border border-[#DDD6FE] dark:border-[#334155] text-[13px] font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED] placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all"
            />
          </div>

          {/* 3-Tab Avatar Selector */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
                Profile Avatar Style:
              </label>
              <div className="flex items-center p-1 bg-slate-100 dark:bg-[#1E293B] rounded-xl border border-slate-200/80 dark:border-[#334155]">
                <button
                  type="button"
                  onClick={() => {
                    setAvatarTab('character');
                    if (!avatarUrl || !avatarUrl.startsWith('data:image/svg+xml')) {
                      setAvatarUrl(ASPIRANT_AVATARS[0].svg);
                    }
                    soundManager.playClick();
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    avatarTab === 'character'
                      ? 'bg-white dark:bg-[#0F172A] text-[#7C3AED] dark:text-[#A78BFA] shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                  }`}
                >
                  Characters
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAvatarTab('upload');
                    soundManager.playClick();
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    avatarTab === 'upload'
                      ? 'bg-white dark:bg-[#0F172A] text-[#7C3AED] dark:text-[#A78BFA] shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                  }`}
                >
                  Upload Photo
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAvatarTab('emoji');
                    soundManager.playClick();
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    avatarTab === 'emoji'
                      ? 'bg-white dark:bg-[#0F172A] text-[#7C3AED] dark:text-[#A78BFA] shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                  }`}
                >
                  Emoji
                </button>
              </div>
            </div>

            {/* Tab 1: Characters */}
            {avatarTab === 'character' && (
              <div className="bg-[#F5F3FF]/60 dark:bg-[#1E293B]/70 p-3.5 rounded-2xl border border-[#DDD6FE]/80 dark:border-[#334155]">
                <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Select Aspirant Character:
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {ASPIRANT_AVATARS.map(c => {
                    const isSelected = avatarUrl === c.svg;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => {
                          setAvatarUrl(c.svg);
                          soundManager.playClick();
                        }}
                        className={`p-1.5 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-white dark:bg-[#0F172A] border-[#7C3AED] ring-2 ring-[#7C3AED]/40 shadow-xs scale-105'
                            : 'bg-white/60 dark:bg-[#0F172A]/60 border-slate-200 dark:border-slate-700/60 hover:border-[#7C3AED]/50'
                        }`}
                        title={c.label}
                      >
                        <div className="w-11 h-11 rounded-lg overflow-hidden shrink-0">
                          <img src={c.svg} alt={c.label} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-[9px] font-bold text-slate-600 dark:text-slate-300 truncate w-full text-center">
                          {c.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 2: Custom Photo Upload */}
            {avatarTab === 'upload' && (
              <div className="bg-[#F5F3FF]/60 dark:bg-[#1E293B]/70 p-4 rounded-2xl border border-[#DDD6FE]/80 dark:border-[#334155] text-center space-y-3">
                {avatarUrl && !avatarUrl.startsWith('data:image/svg+xml') ? (
                  <div className="flex flex-col items-center gap-2.5">
                    <img
                      src={avatarUrl}
                      alt="Uploaded Avatar"
                      className="w-20 h-20 rounded-2xl object-cover border-2 border-[#7C3AED] shadow-md"
                    />
                    <button
                      type="button"
                      onClick={() => setAvatarUrl(undefined)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 text-xs font-bold hover:bg-rose-500/25 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove Photo</span>
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#DDD6FE] dark:border-[#334155] rounded-2xl hover:border-[#7C3AED] transition-colors cursor-pointer group bg-white/50 dark:bg-[#0F172A]/50">
                    <Camera className="w-8 h-8 text-slate-400 group-hover:text-[#7C3AED] transition-colors mb-2" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                      Upload Custom Photo
                    </span>
                    <span className="text-[11px] text-slate-400 mt-0.5">
                      PNG, JPG or WebP up to 5MB
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            )}

            {/* Tab 3: Emoji & Colors */}
            {avatarTab === 'emoji' && (
              <div className="space-y-3 bg-[#F5F3FF]/60 dark:bg-[#1E293B]/70 p-3.5 rounded-2xl border border-[#DDD6FE]/80 dark:border-[#334155]">
                <div>
                  <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Select Avatar Mascot:
                  </span>
                  <div className="grid grid-cols-8 gap-1.5">
                    {EMOJI_PRESETS.map(em => (
                      <button
                        key={em}
                        type="button"
                        onClick={() => {
                          setSelectedEmoji(em);
                          soundManager.playClick();
                        }}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-transform active:scale-90 cursor-pointer ${
                          selectedEmoji === em
                            ? 'bg-[#7C3AED]/20 ring-2 ring-[#7C3AED] scale-110 shadow-xs'
                            : 'hover:bg-slate-200 dark:hover:bg-[#25283C]'
                        }`}
                      >
                        {em}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Profile Gradient Theme:
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {GRADIENT_PRESETS.map(g => (
                      <button
                        key={g.class}
                        type="button"
                        onClick={() => {
                          setSelectedColor(g.class);
                          soundManager.playClick();
                        }}
                        className={`h-8 rounded-xl bg-gradient-to-r ${g.class} flex items-center justify-center transition-all cursor-pointer ${
                          selectedColor === g.class ? 'ring-2 ring-white dark:ring-slate-300 scale-105 shadow-md' : 'opacity-85 hover:opacity-100'
                        }`}
                        title={g.label}
                      >
                        {selectedColor === g.class && <Check className="w-4 h-4 text-white drop-shadow" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Target Exam Presets */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-2 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-[#7C3AED] dark:text-[#A78BFA]" />
              <span>Target Exam Curriculum:</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {PRESET_EXAMS.map(p => {
                const isSelected = targetExamId === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleSelectExamPreset(p)}
                    className={`p-2.5 rounded-2xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#7C3AED]/15 border-[#7C3AED] text-[#7C3AED] dark:text-[#A78BFA] shadow-xs ring-1 ring-[#7C3AED]/40'
                        : 'bg-white dark:bg-[#1E293B] border-[#DDD6FE]/80 dark:border-[#334155] text-slate-600 dark:text-slate-300 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <span className="block text-xs font-bold">{p.name}</span>
                      <span className="block text-[10px] font-mono text-slate-400 mt-0.5">{p.date}</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#7C3AED] dark:text-[#A78BFA] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Target Exam Date */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#7C3AED] dark:text-[#A78BFA]" />
              <span>Target Exam Date:</span>
            </label>
            <input
              type="date"
              value={targetExamDate}
              onChange={e => setTargetExamDate(e.target.value)}
              required
              className="w-full p-3 rounded-2xl bg-[#F5F3FF]/50 dark:bg-[#1E293B] border border-[#DDD6FE] dark:border-[#334155] text-[13px] font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
            />
          </div>

          {/* Zero Data Leak Guarantee Notice (Only when creating) */}
          {!editingProfile && (
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-start gap-2.5 text-xs text-emerald-800 dark:text-emerald-300">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">100% Clean Slate Guarantee</span>
                <span className="text-[11px] opacity-90 block leading-tight mt-0.5">
                  Initializes with the official curriculum at 0% progress, 0 XP, and empty history. No topics, notes, or streak are copied from other profiles.
                </span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#DDD6FE] dark:border-[#334155] shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-[#334155] text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1E293B] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#6366F1] hover:from-[#6D28D9] hover:to-[#4F46E5] text-white text-xs font-black shadow-lg shadow-[#7C3AED]/25 transition-all cursor-pointer active:scale-95"
            >
              {editingProfile ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Create Profile</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

