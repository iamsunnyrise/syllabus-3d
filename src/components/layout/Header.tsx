import React, { useState, useEffect, useRef } from 'react';
import { useSyllabus } from '../../context/SyllabusContext';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { usePWA } from '../../hooks/usePWA';
import { haptics } from '../../utils/haptics';
import {
  Search,
  Flame,
  Sun,
  Moon,
  ChevronDown,
  Menu,
  GraduationCap,
  WifiOff,
  Download,
  Settings2,
  PanelLeftOpen,
  Sparkles,
  Lock,
  Plus,
  Trash2,
  Check,
  Target,
  BookOpen,
  CalendarDays,
  Timer,
  RotateCw,
  BrainCircuit,
  AlertTriangle,
  Clock,
  BarChart3,
  Video,
  Trophy,
  Compass,
  ArrowRight,
  LayoutGrid,
  User
} from 'lucide-react';
import { BrandEmblemLogo } from '../common/BrandEmblemLogo';
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
  const [isStudyHubOpen, setIsStudyHubOpen] = useState(false);
  const studyHubRef = useRef<HTMLDivElement>(null);
  const [isOnline, setIsOnline] = useState<boolean>(() => typeof navigator !== 'undefined' ? navigator.onLine : true);

  const plannerTasksSafe = Array.isArray(plannerTasks) ? plannerTasks : [];
  const todayTasksCount = plannerTasksSafe.filter(t => t.status === 'today').length;
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

  const studyHubViews: AppView[] = [
    'revision',
    'weak',
    'mindmap',
    'pacing',
    'analytics',
    'heatmap',
    'youtube-notes',
    'mock-tracker',
    'platforms'
  ];
  const isStudyHubActive = currentView ? studyHubViews.includes(currentView) : false;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (studyHubRef.current && !studyHubRef.current.contains(target)) {
        setIsStudyHubOpen(false);
      }
      if (examMenuRef.current && !examMenuRef.current.contains(target)) {
        setIsExamMenuOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isStudyHubOpen) setIsStudyHubOpen(false);
        if (isExamMenuOpen) setIsExamMenuOpen(false);
      }
    };
    if (isStudyHubOpen || isExamMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isStudyHubOpen, isExamMenuOpen]);

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

          {/* Desktop Sidebar Toggle (>= md): Appears when sidebar is collapsed */}
          {isSidebarCollapsed && onToggleDesktopSidebar && (
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                haptics.light();
                onToggleDesktopSidebar();
              }}
              className="hidden md:flex items-center gap-1.5 h-9 px-3 rounded-xl bg-white dark:bg-[#131522] border border-slate-200/80 dark:border-white/[0.08] text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/[0.06] hover:border-amber-500 transition-all cursor-pointer shrink-0 shadow-subtle-depth active:scale-95 group animate-fade-in"
              title="Open sidebar (Ctrl+B)"
              aria-label="Open sidebar"
            >
              <PanelLeftOpen className="w-4 h-4 text-slate-800 dark:text-slate-200 group-hover:text-amber-500 transition-colors group-hover:scale-110" />
              <span className="text-xs font-bold hidden lg:inline">Sidebar</span>
            </button>
          )}

          {/* Brand Seal + "THE PUNDITS" Title */}
          <div
            onClick={() => onNavigate?.('overview')}
            className="flex items-center gap-2 cursor-pointer group select-none shrink-0"
            title="THE PUNDITS • Home"
          >
            <BrandEmblemLogo size="sm" />
            <span className="text-sm sm:text-base font-black tracking-tight text-slate-900 dark:text-white uppercase font-serif hidden sm:inline">
              THE PUNDITS
            </span>
          </div>

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
              : currentView === 'planner'
              ? 'Daily Practice Schedule'
              : currentView === 'mock-tracker'
              ? 'ProMocks'
              : currentView === 'syllabus'
              ? 'Syllabus Explorer'
              : currentView === 'revision'
              ? 'Spaced Revision'
              : currentView === 'weak'
              ? 'Saved Question'
              : currentView === 'analytics'
              ? 'Performance'
              : currentView === 'youtube-notes'
              ? 'YouTube Notes'
              : currentView === 'platforms'
              ? 'Study Platforms'
              : currentView === 'settings'
              ? 'My Profile'
              : currentViewTitle}
          </h1>
        </div>

        {/* Desktop Quick Navigation Hub (Syllabus, Planner, Study Station Hub) */}
        <nav
          aria-label="Quick Navigation"
          className="hidden xl:flex items-center gap-1 p-1 rounded-2xl bg-slate-100/90 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.08] backdrop-blur-md shadow-2xs shrink-0 select-none"
        >
          {/* 1. Syllabus Pill */}
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              haptics.selection();
              onNavigate?.('syllabus');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              currentView === 'syllabus'
                ? 'bg-white dark:bg-[#1E2138] text-blue-600 dark:text-[#7AA2F7] shadow-xs border border-slate-200/60 dark:border-white/10'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/[0.04]'
            }`}
            title="Open Syllabus Explorer"
            aria-label="Open Syllabus Explorer"
            aria-current={currentView === 'syllabus' ? 'page' : undefined}
          >
            <BookOpen className={`w-3.5 h-3.5 transition-transform group-hover:scale-110 ${
              currentView === 'syllabus' ? 'text-blue-600 dark:text-[#7AA2F7]' : 'text-slate-400 dark:text-slate-500'
            }`} />
            <span>Syllabus</span>
          </button>

          {/* 2. Planner Pill */}
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              haptics.selection();
              onNavigate?.('planner');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              currentView === 'planner'
                ? 'bg-white dark:bg-[#1E2138] text-blue-600 dark:text-[#7AA2F7] shadow-xs border border-slate-200/60 dark:border-white/10'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/[0.04]'
            }`}
            title="Open Study Planner"
            aria-label="Open Study Planner"
            aria-current={currentView === 'planner' ? 'page' : undefined}
          >
            <CalendarDays className={`w-3.5 h-3.5 ${
              currentView === 'planner' ? 'text-blue-600 dark:text-[#7AA2F7]' : 'text-slate-400 dark:text-slate-500'
            }`} />
            <span>Planner</span>
            {todayTasksCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-xs font-mono font-bold bg-blue-500/15 text-blue-600 dark:text-blue-300 border border-blue-500/30 tabular-nums">
                {todayTasksCount}
              </span>
            )}
          </button>

          <div className="w-[1px] h-4 bg-slate-200 dark:bg-white/10 mx-0.5" />

          {/* 3. Study Station Hub Popover */}
          <div className="relative" ref={studyHubRef}>
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                haptics.light();
                setIsStudyHubOpen(prev => !prev);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isStudyHubActive || isStudyHubOpen
                  ? 'bg-white dark:bg-[#1E2138] text-indigo-600 dark:text-blue-300 shadow-xs border border-indigo-200/60 dark:border-blue-700/50'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/[0.04]'
              }`}
              title="Study Station Hub: Focus Timer, Spaced Revision, Mind Map, Weak Topics & More"
              aria-label="Open Study Station Hub"
              aria-expanded={isStudyHubOpen}
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-500 dark:text-blue-400" />
              <span>Study Station Hub</span>
              <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${isStudyHubOpen ? 'rotate-180 text-indigo-600 dark:text-blue-400' : ''}`} />
            </button>

            {/* Dropdown Card */}
            {isStudyHubOpen && (
              <div className="study-station-popover absolute top-full left-1/2 -translate-x-1/2 mt-2.5 w-84 sm:w-[410px] rounded-2xl bg-white/95 dark:bg-[#111322]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.18)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.45)] p-3 z-50 animate-fade-in space-y-2.5">
                {/* Header Bar */}
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                      <Compass className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold font-sans text-slate-800 dark:text-white tracking-tight">
                      Study Station Hub
                    </span>
                  </div>
                  <span className="text-[11px] font-sans font-medium text-slate-400 dark:text-slate-500">
                    Engines & Tools
                  </span>
                </div>

                {/* Primary Focus Button (Luxury Pomodoro) */}
                <button
                  type="button"
                  onClick={() => {
                    setIsStudyHubOpen(false);
                    soundManager.playClick();
                    onOpenFocusModal?.();
                  }}
                  className="study-hub-hero-card w-full flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white shadow-md hover:shadow-indigo-500/20 transition-all active:scale-[0.98] group cursor-pointer border border-white/10"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                      <Timer className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="min-w-0 text-left">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="hero-title text-xs sm:text-sm font-bold font-sans tracking-tight">Focus Timer (Pomodoro)</span>
                        <span className="px-1.5 py-0.5 rounded-md text-[10px] font-sans font-extrabold uppercase tracking-wide bg-white/20 text-white border border-white/20">
                          3D Dial
                        </span>
                      </div>
                      <p className="hero-desc text-[11px] text-white/80 font-sans truncate mt-0.5">
                        Chronometer sprint with binaural audio
                      </p>
                    </div>
                  </div>
                  <div className="hero-action-pill shrink-0 hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/15 group-hover:bg-white/25 text-white transition-all">
                    <span>Launch</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/80 group-hover:text-white sm:hidden group-hover:translate-x-0.5 transition-transform shrink-0" />
                </button>

                {/* Section 1: Practice & AI Learning */}
                <div className="space-y-1.5">
                  <div className="px-1 flex items-center justify-between">
                    <span className="text-[10px] font-bold font-sans tracking-wider uppercase text-slate-400 dark:text-slate-500">
                      Practice & AI Learning
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {/* Spaced Revision */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsStudyHubOpen(false);
                        soundManager.playClick();
                        haptics.selection();
                        onNavigate?.('revision');
                      }}
                      className={`study-tool-btn group flex items-center gap-2 sm:gap-2.5 p-2 rounded-xl text-left transition-all cursor-pointer border ${
                        currentView === 'revision'
                          ? 'active-tool bg-amber-500/10 text-amber-900 dark:text-amber-200 border-amber-500/30 shadow-2xs'
                          : 'bg-slate-50/70 hover:bg-slate-100/90 dark:bg-white/[0.03] dark:hover:bg-white/[0.07] border-slate-200/50 dark:border-white/[0.05] hover:border-slate-300 dark:hover:border-white/10 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <RotateCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="tool-title text-xs font-bold truncate font-sans">Revision</span>
                          {dueRevisionCount > 0 && (
                            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold font-sans bg-amber-500 text-white shrink-0 shadow-2xs">
                              {dueRevisionCount}
                            </span>
                          )}
                        </div>
                        <span className="tool-subtitle text-[11px] text-slate-400 dark:text-slate-500 truncate block font-sans font-normal mt-0.5">Spaced Recall</span>
                      </div>
                    </button>

                    {/* Weak Topics */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsStudyHubOpen(false);
                        soundManager.playClick();
                        haptics.selection();
                        onNavigate?.('weak');
                      }}
                      className={`study-tool-btn group flex items-center gap-2 sm:gap-2.5 p-2 rounded-xl text-left transition-all cursor-pointer border ${
                        currentView === 'weak'
                          ? 'active-tool bg-rose-500/10 text-rose-900 dark:text-rose-200 border-rose-500/30 shadow-2xs'
                          : 'bg-slate-50/70 hover:bg-slate-100/90 dark:bg-white/[0.03] dark:hover:bg-white/[0.07] border-slate-200/50 dark:border-white/[0.05] hover:border-slate-300 dark:hover:border-white/10 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="tool-title text-xs font-bold truncate font-sans">Weak Topics</span>
                          {weakTopicsCount > 0 && (
                            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold font-sans bg-rose-500 text-white shrink-0 shadow-2xs">
                              {weakTopicsCount}
                            </span>
                          )}
                        </div>
                        <span className="tool-subtitle text-[11px] text-slate-400 dark:text-slate-500 truncate block font-sans font-normal mt-0.5">Diagnostic Matrix</span>
                      </div>
                    </button>

                    {/* AI YouTube Notes */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsStudyHubOpen(false);
                        soundManager.playClick();
                        haptics.selection();
                        onNavigate?.('youtube-notes');
                      }}
                      className={`study-tool-btn group flex items-center gap-2 sm:gap-2.5 p-2 rounded-xl text-left transition-all cursor-pointer border ${
                        currentView === 'youtube-notes'
                          ? 'active-tool bg-purple-500/10 text-purple-900 dark:text-purple-200 border-purple-500/30 shadow-2xs'
                          : 'bg-slate-50/70 hover:bg-slate-100/90 dark:bg-white/[0.03] dark:hover:bg-white/[0.07] border-slate-200/50 dark:border-white/[0.05] hover:border-slate-300 dark:hover:border-white/10 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <Video className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="tool-title text-xs font-bold truncate font-sans">YouTube AI</span>
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-extrabold font-sans bg-purple-600 text-white shrink-0 shadow-2xs">
                            AI
                          </span>
                        </div>
                        <span className="tool-subtitle text-[11px] text-slate-400 dark:text-slate-500 truncate block font-sans font-normal mt-0.5">Lecture Notes</span>
                      </div>
                    </button>

                    {/* Syllabus Mindmap */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsStudyHubOpen(false);
                        soundManager.playClick();
                        haptics.selection();
                        onNavigate?.('mindmap');
                      }}
                      className={`study-tool-btn group flex items-center gap-2 sm:gap-2.5 p-2 rounded-xl text-left transition-all cursor-pointer border ${
                        currentView === 'mindmap'
                          ? 'active-tool bg-indigo-500/10 text-indigo-900 dark:text-blue-200 border-indigo-500/30 shadow-2xs'
                          : 'bg-slate-50/70 hover:bg-slate-100/90 dark:bg-white/[0.03] dark:hover:bg-white/[0.07] border-slate-200/50 dark:border-white/[0.05] hover:border-slate-300 dark:hover:border-white/10 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-indigo-500/15 text-indigo-600 dark:text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <BrainCircuit className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="tool-title text-xs font-bold truncate block font-sans">Mindmap</span>
                        <span className="tool-subtitle text-[11px] text-slate-400 dark:text-slate-500 truncate block font-sans font-normal mt-0.5">Visual Graph</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Section 2: Velocity & Tracking */}
                <div className="space-y-1.5">
                  <div className="px-1 flex items-center justify-between">
                    <span className="text-[10px] font-bold font-sans tracking-wider uppercase text-slate-400 dark:text-slate-500">
                      Velocity & Analytics
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {/* Target Pacing */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsStudyHubOpen(false);
                        soundManager.playClick();
                        haptics.selection();
                        onNavigate?.('pacing');
                      }}
                      className={`study-tool-btn group flex items-center gap-2 sm:gap-2.5 p-2 rounded-xl text-left transition-all cursor-pointer border ${
                        currentView === 'pacing'
                          ? 'active-tool bg-emerald-500/10 text-emerald-900 dark:text-emerald-200 border-emerald-500/30 shadow-2xs'
                          : 'bg-slate-50/70 hover:bg-slate-100/90 dark:bg-white/[0.03] dark:hover:bg-white/[0.07] border-slate-200/50 dark:border-white/[0.05] hover:border-slate-300 dark:hover:border-white/10 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="tool-title text-xs font-bold truncate block font-sans">Target Pacing</span>
                        <span className="tool-subtitle text-[11px] text-slate-400 dark:text-slate-500 truncate block font-sans font-normal mt-0.5">Exam Velocity</span>
                      </div>
                    </button>

                    {/* Mock Test Tracker */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsStudyHubOpen(false);
                        soundManager.playClick();
                        haptics.selection();
                        onNavigate?.('mock-tracker');
                      }}
                      className={`study-tool-btn group flex items-center gap-2 sm:gap-2.5 p-2 rounded-xl text-left transition-all cursor-pointer border ${
                        currentView === 'mock-tracker'
                          ? 'active-tool bg-cyan-500/10 text-cyan-900 dark:text-cyan-200 border-cyan-500/30 shadow-2xs'
                          : 'bg-slate-50/70 hover:bg-slate-100/90 dark:bg-white/[0.03] dark:hover:bg-white/[0.07] border-slate-200/50 dark:border-white/[0.05] hover:border-slate-300 dark:hover:border-white/10 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="tool-title text-xs font-bold truncate block font-sans">Mock Tracker</span>
                        <span className="tool-subtitle text-[11px] text-slate-400 dark:text-slate-500 truncate block font-sans font-normal mt-0.5">Scores & Ranks</span>
                      </div>
                    </button>

                    {/* Analytics & Heatmap */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsStudyHubOpen(false);
                        soundManager.playClick();
                        haptics.selection();
                        onNavigate?.('analytics');
                      }}
                      className={`study-tool-btn group flex items-center gap-2 sm:gap-2.5 p-2 rounded-xl text-left transition-all cursor-pointer border ${
                        currentView === 'analytics'
                          ? 'active-tool bg-blue-500/10 text-blue-900 dark:text-blue-200 border-blue-500/30 shadow-2xs'
                          : 'bg-slate-50/70 hover:bg-slate-100/90 dark:bg-white/[0.03] dark:hover:bg-white/[0.07] border-slate-200/50 dark:border-white/[0.05] hover:border-slate-300 dark:hover:border-white/10 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <BarChart3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="tool-title text-xs font-bold truncate block font-sans">Analytics</span>
                        <span className="tool-subtitle text-[11px] text-slate-400 dark:text-slate-500 truncate block font-sans font-normal mt-0.5">Heatmap & XP</span>
                      </div>
                    </button>

                    {/* Platforms & Resources */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsStudyHubOpen(false);
                        soundManager.playClick();
                        haptics.selection();
                        onNavigate?.('platforms');
                      }}
                      className={`study-tool-btn group flex items-center gap-2 sm:gap-2.5 p-2 rounded-xl text-left transition-all cursor-pointer border ${
                        currentView === 'platforms'
                          ? 'active-tool bg-slate-500/10 text-slate-900 dark:text-white border-slate-500/30 shadow-2xs'
                          : 'bg-slate-50/70 hover:bg-slate-100/90 dark:bg-white/[0.03] dark:hover:bg-white/[0.07] border-slate-200/50 dark:border-white/[0.05] hover:border-slate-300 dark:hover:border-white/10 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-slate-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <LayoutGrid className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="tool-title text-xs font-bold truncate block font-sans">Platforms</span>
                        <span className="tool-subtitle text-[11px] text-slate-400 dark:text-slate-500 truncate block font-sans font-normal mt-0.5">Study Portals</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Footer: Link to Dashboard Overview */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setIsStudyHubOpen(false);
                      soundManager.playClick();
                      haptics.selection();
                      onNavigate?.('overview');
                    }}
                    className="study-hub-footer-btn w-full text-center py-2 px-3 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 bg-slate-50/80 hover:bg-indigo-50/60 dark:bg-white/[0.03] dark:hover:bg-indigo-950/30 border border-slate-200/70 dark:border-white/[0.06] hover:border-indigo-200 dark:hover:border-indigo-800/40 transition-all cursor-pointer flex items-center justify-center gap-1.5 font-sans group shadow-2xs"
                  >
                    <span>Go to Complete Study Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>

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
            className="h-9 w-9 md:w-auto p-0 md:px-3 rounded-xl bg-white dark:bg-[#131522] border border-slate-200/80 dark:border-white/[0.08] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-blue-500/50 dark:hover:border-blue-400/50 transition-all flex items-center justify-center md:justify-start gap-1.5 cursor-pointer shadow-subtle-depth text-xs font-medium shrink-0 active:scale-95"
            title="Search Topics (Cmd + K)"
            aria-label="Search topics"
          >
            <Search className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <span className="hidden md:inline">Search...</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-xs font-mono bg-slate-100 dark:bg-white/[0.06] rounded-lg text-slate-500 dark:text-slate-300 font-bold border border-slate-200/60 dark:border-white/[0.06]">⌘K</kbd>
          </button>

          {/* Streak Indicator (Hidden on mobile < sm to keep header clean and spacious) */}
          <div className="hidden sm:flex h-9 items-center gap-1 px-2.5 rounded-xl bg-white dark:bg-[#131522] border border-slate-200/80 dark:border-white/[0.08] shadow-subtle-depth shrink-0">
            <Flame className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-amber-500 fill-amber-500 shrink-0" />
            <span className="text-xs tabular-nums font-black text-slate-900 dark:text-white font-mono">
              {profileSafe.currentStreak ?? 0}d
            </span>
          </div>

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

