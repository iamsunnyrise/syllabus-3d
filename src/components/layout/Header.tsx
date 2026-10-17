import React, { useState, useEffect, useRef } from 'react';
import { useSyllabus } from '../../context/SyllabusContext';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { usePWA } from '../../hooks/usePWA';
import { haptics } from '../../utils/haptics';
import {
  Search,
  Sun,
  Moon,
  ChevronDown,
  Menu,
  GraduationCap,
  WifiOff,
  Download,
  Settings2,
  Sparkles,
  Lock,
  Plus,
  Trash2,
  Check,
  Target,
  User
} from 'lucide-react';
import { usePinLock } from '../../context/PinLockContext';
import { soundManager } from '../../utils/soundEffects';
import { EditExamTargetModal } from '../modals/EditExamTargetModal';
import { AddExamTargetModal } from '../modals/AddExamTargetModal';
import { PWAInstallModal } from '../modals/PWAInstallModal';
import type { AppView } from './Sidebar';

export interface HeaderProps {
  onOpenSearch: () => void;
  onOpenSettings: () => void;
  onOpenMobileMenu?: () => void;
  isSidebarCollapsed?: boolean;
  onToggleDesktopSidebar?: () => void;
  currentViewTitle?: string;
  currentView?: AppView;
  onNavigate?: (view: AppView) => void;
  onOpenFocusModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenSettings,
  onOpenMobileMenu,
  isSidebarCollapsed = false,
  onToggleDesktopSidebar,
  currentViewTitle = 'SYLLABUS 3D',
  currentView,
  onNavigate,
  onOpenFocusModal
}) => {
  const {
    currentExam,
    exams,
    setSelectedExamId,
    deleteExam,
    profile,
    plannerTasks,
    dueRevisions,
    weakTopics
  } = useSyllabus();
  const { user } = useAuth();
  const { isConfigured, lockApp } = usePinLock();
  const {
    isDark,
    theme,
    toggleTheme: handleThemeToggle,
  } = useTheme();
  const { isInstallable, isInstalled, triggerInstall } = usePWA();
  const [isExamMenuOpen, setIsExamMenuOpen] = useState(false);
  const examMenuRef = useRef<HTMLDivElement>(null);
  const [isEditExamModalOpen, setIsEditExamModalOpen] = useState(false);
  const [isAddExamModalOpen, setIsAddExamModalOpen] = useState(false);
  const [isPwaModalOpen, setIsPwaModalOpen] = useState(false);
  const [isOnline, setIsOnline] = useState<boolean>(() => typeof navigator !== 'undefined' ? navigator.onLine : true);

  const dueRevisionsSafe = Array.isArray(dueRevisions) ? dueRevisions : [];
  const dueRevisionCount = dueRevisionsSafe.length;
  const weakTopicsSafe = Array.isArray(weakTopics) ? weakTopics : [];
  const weakTopicsCount = weakTopicsSafe.length;
  const examsSafe = Array.isArray(exams) ? exams : [];
  const profileSafe = profile || {
    currentStreak: 0,
    avatarColor: 'from-blue-600 to-indigo-600',
    avatarUrl: '',
    avatarEmoji: '',
    name: 'Aspirant'
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (examMenuRef.current && !examMenuRef.current.contains(target)) {
        setIsExamMenuOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isExamMenuOpen) setIsExamMenuOpen(false);
      }
    };
    if (isExamMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isExamMenuOpen]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const toggleTheme = () => {
    soundManager.playClick();
    haptics.light();
    handleThemeToggle();
  };

  const getExamDaysRemaining = (examDateStr?: string, targetYr?: number) => {
    if (!examDateStr) return null;
    const now = new Date().getTime();
    let y = targetYr || 2026;
    let m = 9;
    let d = 15;
    if (examDateStr.includes('-')) {
      const parts = examDateStr.split('-').map(Number);
      if (parts.length >= 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
        y = parts[0];
        m = parts[1] - 1;
        d = parts[2];
      }
    }
    const targetTime = new Date(y, m, d, 9, 0, 0).getTime();
    if (isNaN(targetTime)) return null;
    const diff = targetTime - now;
    if (diff <= 0) return 0;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const rawExamName = currentExam?.name || 'Syllabus Exam';
  const hasTrailingYear = /\s+(20\d{2})$/.test(rawExamName);
  const trailingYearMatch = rawExamName.match(/\s+(20\d{2})$/)?.[1];
  const targetYear = currentExam?.targetYear || (trailingYearMatch ? Number(trailingYearMatch) : (currentExam?.examDate && !isNaN(new Date(currentExam.examDate).getTime()) ? new Date(currentExam.examDate).getFullYear() : 2026));
  const examDisplayName = hasTrailingYear ? rawExamName.replace(/\s+20\d{2}$/, '') : rawExamName;
  const activeDaysRemaining = getExamDaysRemaining(currentExam?.examDate, targetYear);

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-[#0E101B]/85 backdrop-blur-2xl border-b border-slate-200/80 dark:border-white/[0.08] shadow-[0_1px_3px_rgba(15,23,42,0.04),0_4px_12px_-2px_rgba(15,23,42,0.03)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] px-2 sm:px-6 py-2 sm:py-2.5 pt-safe pl-safe pr-safe transition-colors print:hidden">
      <div className="flex items-center justify-between gap-1 sm:gap-3 w-full min-w-0">
        
        {/* Left Side: Mobile Menu Button, Desktop Sidebar Toggle & Brand Seal */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0 flex-initial">
          {/* Mobile Drawer Button (< md) */}
          <button
            onClick={() => {
              soundManager.playClick();
              haptics.light();
              onOpenMobileMenu?.();
            }}
            className="md:hidden h-9 w-9 rounded-xl bg-white dark:bg-[#131522] border border-slate-200/80 dark:border-white/[0.08] text-slate-800 dark:text-[#F5F5F7] hover:bg-slate-50 dark:hover:bg-white/[0.06] transition-all cursor-pointer shrink-0 tap-bounce shadow-subtle-depth active:scale-95 flex items-center justify-center"
            title="Open Navigation Menu"
            aria-label="Open navigation menu"
          >
            <Menu className="w-4 h-4" />
          </button>


          {/* Responsive Exam Selector (Mobile & Desktop) with Target Year & Live Countdown */}
          <div className="relative min-w-0 flex-1 sm:flex-initial" ref={examMenuRef}>
            <button
              onClick={() => setIsExamMenuOpen(prev => !prev)}
              className="flex items-center gap-1.5 sm:gap-2 h-9 px-2 sm:px-3 rounded-xl bg-white dark:bg-[#131522] border border-slate-200/80 dark:border-white/[0.08] hover:border-blue-500 dark:hover:border-blue-400 transition-all cursor-pointer text-xs sm:text-sm font-bold text-slate-900 dark:text-white shadow-subtle-depth active:scale-95 group min-w-0"
              title={`Switch Exam Target: ${rawExamName} (${targetYear})`}
            >
              <GraduationCap className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-blue-600 dark:text-blue-400 shrink-0 group-hover:scale-110 transition-transform" />
              <div className="flex items-center gap-1 sm:gap-1.5 min-w-0">
                <span className="truncate max-w-[120px] min-[360px]:max-w-[145px] min-[390px]:max-w-[170px] sm:max-w-[220px] font-bold tracking-tight">
                  {examDisplayName}
                </span>
                <span className="px-1.5 py-0.5 rounded-lg text-xs font-mono font-black bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200/80 dark:border-blue-700/50 shrink-0 tabular-nums leading-none">
                  {targetYear}
                </span>
                {activeDaysRemaining !== null && activeDaysRemaining > 0 && (
                  <span className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded-lg text-xs font-mono font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/25 shrink-0 tabular-nums">
                    ⏳ {activeDaysRemaining}d
                  </span>
                )}
              </div>
              <ChevronDown className={`w-3 sm:w-3.5 h-3 sm:h-3.5 text-slate-400 shrink-0 transition-transform duration-200 ${isExamMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {isExamMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-[#131522] border border-slate-200/80 dark:border-white/[0.08] shadow-2xl p-2 z-50 animate-fade-in divide-y divide-slate-100 dark:divide-white/[0.06]">
                {/* Header */}
                <div className="px-3 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-sans">
                      Target Exams ({examsSafe.length})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setIsExamMenuOpen(false);
                      setIsAddExamModalOpen(true);
                    }}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 flex items-center gap-1 transition-colors cursor-pointer font-sans"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Exam</span>
                  </button>
                </div>

                {/* Enrolled Exams List */}
                <div className="py-1.5 space-y-1 max-h-64 overflow-y-auto">
                  {examsSafe.map(ex => {
                    const isCurrent = ex.id === currentExam?.id;
                    const exHasYear = /\s+(20\d{2})$/.test(ex.name);
                    const exYearMatch = ex.name.match(/\s+(20\d{2})$/)?.[1];
                    const exTargetYear = ex.targetYear || (exYearMatch ? Number(exYearMatch) : (ex.examDate && !isNaN(new Date(ex.examDate).getTime()) ? new Date(ex.examDate).getFullYear() : 2026));
                    const exDisplayName = exHasYear ? ex.name.replace(/\s+20\d{2}$/, '') : ex.name;
                    const daysLeft = getExamDaysRemaining(ex.examDate, exTargetYear);
                    const totalSubjs = ex.subjects?.length || 0;

                    return (
                      <div
                        key={ex.id}
                        className={`w-full group rounded-xl p-2.5 transition-all flex items-center justify-between gap-3 cursor-pointer ${
                          isCurrent
                            ? 'bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-500/20 text-slate-900 dark:text-white shadow-2xs'
                            : 'hover:bg-slate-50 dark:hover:bg-white/[0.04] border border-transparent text-slate-700 dark:text-slate-300'
                        }`}
                        onClick={() => {
                          soundManager.playClick();
                          setSelectedExamId(ex.id);
                          setIsExamMenuOpen(false);
                        }}
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-2xs ${
                            isCurrent
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-100 dark:bg-white/[0.06] text-slate-500 dark:text-slate-400'
                          }`}>
                            {isCurrent ? (
                              <Check className="w-4 h-4 stroke-[2.5]" />
                            ) : (
                              <GraduationCap className="w-4 h-4" />
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-xs sm:text-sm font-bold truncate font-sans text-slate-900 dark:text-white">
                                {exDisplayName}
                              </span>
                              <span className="px-1.5 py-0.5 rounded-md text-[11px] font-sans font-semibold bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-white/10 shrink-0 tabular-nums">
                                {exTargetYear}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-sans mt-0.5 whitespace-nowrap">
                              {daysLeft !== null && (
                                <span className={`inline-flex items-center gap-1 ${daysLeft <= 30 ? 'text-amber-600 dark:text-amber-400 font-semibold' : 'text-slate-600 dark:text-slate-300 font-medium'}`}>
                                  ⏳ {daysLeft}d left
                                </span>
                              )}
                              <span className="text-slate-300 dark:text-slate-600">•</span>
                              <span>{totalSubjs} {totalSubjs === 1 ? 'Subject' : 'Subjects'}</span>
                            </div>
                          </div>
                        </div>

                        {/* Quick Actions for this Exam */}
                        <div className="flex items-center gap-1 shrink-0" onClick={e => e.stopPropagation()}>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedExamId(ex.id);
                              setIsExamMenuOpen(false);
                              setIsEditExamModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                            title="Edit Target Date & Countdown"
                          >
                            <Settings2 className="w-3.5 h-3.5" />
                          </button>
                          {examsSafe.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Remove "${ex.name}" from your active exam targets?`)) {
                                  deleteExam(ex.id);
                                }
                              }}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                              title="Remove this exam"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Footer Quick Actions */}
                <div className="p-1.5 space-y-1">
                  <button
                    type="button"
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 flex items-center gap-2 transition-colors cursor-pointer font-sans"
                    onClick={() => {
                      soundManager.playClick();
                      setIsExamMenuOpen(false);
                      setIsAddExamModalOpen(true);
                    }}
                  >
                    <Plus className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>Enroll New Exam Target...</span>
                  </button>

                  <button
                    type="button"
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06] flex items-center gap-2 transition-colors cursor-pointer font-sans"
                    onClick={() => {
                      soundManager.playClick();
                      setIsExamMenuOpen(false);
                      setIsEditExamModalOpen(true);
                    }}
                  >
                    <Settings2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Customize Active Exam & Timer...</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center: Clean Portal Title ("Home", "Daily Practice Schedule", etc.) matching Reference */}
        <div className="flex items-center justify-center flex-1 min-w-0 px-2 sm:px-4">
          <h1 className="text-sm sm:text-base md:text-lg font-black tracking-tight text-slate-900 dark:text-white font-serif truncate">
            {currentView === 'overview'
              ? 'Home'
              : currentView === 'targets'
              ? 'Top 3 Daily Targets'
              : (currentView === 'planner' || currentView === 'routine')
              ? (currentView === 'routine' ? 'Daily Routine' : 'Daily Practice Schedule')
              : currentView === 'mock-tracker'
              ? 'ProMocks'
              : currentView === 'syllabus'
              ? 'Syllabus Explorer'
              : currentView === 'revision'
              ? 'Spaced Revision'
              : currentView === 'weak'
              ? 'Weak Topics'
              : currentView === 'analytics'
              ? 'Analytics'
              : currentView === 'pacing'
              ? 'Target Pacing'
              : currentView === 'youtube-notes'
              ? 'YouTube Notes'
              : currentView === 'platforms'
              ? 'Study Platforms'
              : currentView === 'settings'
              ? 'My Profile'
              : currentViewTitle}
          </h1>
        </div>


        {/* Right Side Tools */}
        <div className="flex items-center gap-2 shrink-0">
          {!isOnline && (
            <div
              className="h-9 flex items-center gap-1 px-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-mono font-bold animate-pulse cursor-help shrink-0"
              title="100% Offline Ready: All syllabus topics, notes, PDF highlights, and flashcards are cached locally."
            >
              <WifiOff className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Offline</span>
            </div>
          )}

          {/* Quick Search */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="group h-9 w-9 md:w-auto p-0 md:px-3.5 rounded-full bg-slate-100/70 hover:bg-slate-200/60 dark:bg-white/[0.04] dark:hover:bg-white/[0.07] border border-slate-200/80 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/15 transition-all flex items-center justify-center md:justify-start gap-2.5 cursor-pointer text-xs shrink-0 active:scale-95"
            title="Search Topics (Cmd + K)"
            aria-label="Search topics"
          >
            <Search className="w-3.5 h-3.5 text-slate-400 dark:text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors shrink-0" strokeWidth={2} />
            <span className="hidden md:inline text-xs text-slate-400 dark:text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors font-medium">Search...</span>
            <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-[10px] font-sans font-medium text-slate-400/80 dark:text-white/40 bg-slate-200/50 dark:bg-white/[0.04] rounded-md border border-slate-300/30 dark:border-white/[0.06] leading-none select-none tracking-tight">⌘K</kbd>
          </button>

          {/* Quick Safety PIN Lock Trigger */}
          {isConfigured && (
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                haptics.medium();
                lockApp();
              }}
              className="hidden md:flex h-9 w-9 rounded-xl bg-white dark:bg-[#131522] border border-slate-200/80 dark:border-white/[0.08] text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all cursor-pointer shadow-subtle-depth active:scale-90 shrink-0 items-center justify-center"
              title="Lock App Now (Safety PIN)"
              aria-label="Lock app now"
            >
              <Lock className="w-4 h-4" />
            </button>
          )}

          {/* Install App Trigger (PWA) */}
          {!isInstalled && (
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                haptics.medium();
                setIsPwaModalOpen(true);
              }}
              className="h-9 px-2 sm:px-2.5 rounded-xl bg-blue-50/80 dark:bg-blue-950/30 hover:bg-blue-100/80 dark:hover:bg-blue-900/40 border border-blue-500/25 dark:border-blue-400/20 text-blue-600 dark:text-blue-400 transition-all cursor-pointer shadow-subtle-depth active:scale-95 shrink-0 flex items-center gap-1.5 text-xs font-bold"
              title="Install Syllabus 3D App on Device"
              aria-label="Install App"
            >
              <Download className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span className="hidden sm:inline">Install App</span>
            </button>
          )}

          {/* Theme Toggle (Light <-> Dark) - Styled matching Reference Screenshot */}
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              haptics.light();
              handleThemeToggle();
            }}
            className="h-9 w-9 rounded-full bg-white dark:bg-[#131522] border border-slate-200/90 dark:border-white/10 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-all cursor-pointer shadow-2xs active:scale-90 shrink-0 flex items-center justify-center hover:border-amber-400"
            title={
              theme === 'dark'
                ? "Switch to Pure Pro Light"
                : theme === 'light'
                ? "Switch to Warm Parchment Gold (#FAEED9)"
                : "Switch to Tokyo Night Dark"
            }
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-[#FF6105]" />
            ) : theme === 'warm-cream' ? (
              <Sparkles className="w-4 h-4 text-[#E1A837]" />
            ) : (
              <Sun className="w-4 h-4 text-[#E5A800]" />
            )}
          </button>

          {/* User Profile Pill Capsule - Matching Reference Screenshot */}
          <button
            type="button"
            onClick={onOpenSettings}
            className="h-9 px-2.5 sm:px-3 rounded-full bg-slate-100/90 hover:bg-slate-200/80 dark:bg-white/[0.06] dark:hover:bg-white/10 border border-slate-200/90 dark:border-white/10 flex items-center gap-2 cursor-pointer transition-all active:scale-95 shadow-2xs"
            title={`Profile: ${user?.name || profileSafe.name || 'Guest User'}`}
            aria-label="Open profile settings"
          >
            <div className="w-5 h-5 rounded-full bg-slate-300 dark:bg-slate-600 flex items-center justify-center overflow-hidden shrink-0">
              {profileSafe.avatarUrl ? (
                <img
                  src={profileSafe.avatarUrl}
                  alt={profileSafe.name || 'User'}
                  className="w-full h-full object-cover"
                />
              ) : profileSafe.avatarEmoji ? (
                <span className="text-[11px] leading-none">{profileSafe.avatarEmoji}</span>
              ) : (
                <User className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
              )}
            </div>
            <span className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[85px] sm:max-w-[120px]">
              {user?.name || profileSafe.name || 'Guest User'}
            </span>
          </button>
        </div>
      </div>

      {/* Edit Target Exam Modal */}
      <EditExamTargetModal
        isOpen={isEditExamModalOpen}
        onClose={() => setIsEditExamModalOpen(false)}
        onOpenAddModal={() => setIsAddExamModalOpen(true)}
      />

      {/* Add Target Exam Modal */}
      <AddExamTargetModal
        isOpen={isAddExamModalOpen}
        onClose={() => setIsAddExamModalOpen(false)}
      />

      {/* PWA Install Modal */}
      <PWAInstallModal
        isOpen={isPwaModalOpen}
        onClose={() => setIsPwaModalOpen(false)}
      />
    </header>
  );
};

