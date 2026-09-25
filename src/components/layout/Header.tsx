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
  LayoutGrid
} from 'lucide-react';
import { usePinLock } from '../../context/PinLockContext';
import { soundManager } from '../../utils/soundEffects';
import { EditExamTargetModal } from '../modals/EditExamTargetModal';
import { AddExamTargetModal } from '../modals/AddExamTargetModal';
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
  const [isEditExamModalOpen, setIsEditExamModalOpen] = useState(false);
  const [isAddExamModalOpen, setIsAddExamModalOpen] = useState(false);
  const [isStudyHubOpen, setIsStudyHubOpen] = useState(false);
  const studyHubRef = useRef<HTMLDivElement>(null);
  const [isOnline, setIsOnline] = useState<boolean>(() => typeof navigator !== 'undefined' ? navigator.onLine : true);

  const plannerTasksSafe = Array.isArray(plannerTasks) ? plannerTasks : [];
  const todayTasksCount = plannerTasksSafe.filter(t => t.status === 'today').length;
  const dueRevisionsSafe = Array.isArray(dueRevisions) ? dueRevisions : [];
  const dueRevisionCount = dueRevisionsSafe.length;
  const weakTopicsSafe = Array.isArray(weakTopics) ? weakTopics : [];
  const weakTopicsCount = weakTopicsSafe.length;

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
      if (studyHubRef.current && !studyHubRef.current.contains(e.target as Node)) {
        setIsStudyHubOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isStudyHubOpen) {
        setIsStudyHubOpen(false);
      }
    };
    if (isStudyHubOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isStudyHubOpen]);

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
      if (parts.length >= 3 && !isNaN(parts[0])) {
        y = parts[0];
        m = parts[1] - 1;
        d = parts[2];
      }
    }
    const targetTime = new Date(y, m, d, 9, 0, 0).getTime();
    const diff = targetTime - now;
    if (diff <= 0) return 0;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const rawExamName = currentExam?.name || 'Syllabus Exam';
  const hasTrailingYear = /\s+(20\d{2})$/.test(rawExamName);
  const trailingYearMatch = rawExamName.match(/\s+(20\d{2})$/)?.[1];
  const targetYear = currentExam?.targetYear || (trailingYearMatch ? Number(trailingYearMatch) : (currentExam?.examDate ? new Date(currentExam.examDate).getFullYear() : 2026));
  const examDisplayName = hasTrailingYear ? rawExamName.replace(/\s+20\d{2}$/, '') : rawExamName;
  const activeDaysRemaining = getExamDaysRemaining(currentExam?.examDate, targetYear);

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-[#0E101B]/85 backdrop-blur-2xl border-b border-slate-200/80 dark:border-white/[0.08] shadow-[0_1px_3px_rgba(15,23,42,0.04),0_4px_12px_-2px_rgba(15,23,42,0.03)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] px-2 sm:px-6 py-2 sm:py-2.5 pt-safe pl-safe pr-safe transition-colors print:hidden">
      <div className="flex items-center justify-between gap-1 sm:gap-3 w-full min-w-0">
        
        {/* Left Side: Mobile Menu Button, Desktop Gemini Collapse Toggle, Back Nav & Exam Selector */}
        <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-1 sm:flex-initial">
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
              className="hidden md:flex items-center gap-1.5 h-9 px-3 rounded-xl bg-white dark:bg-[#131522] border border-slate-200/80 dark:border-white/[0.08] text-slate-800 dark:text-[#F5F5F7] hover:bg-slate-50 dark:hover:bg-white/[0.06] hover:border-[#2563EB] dark:hover:border-[#7AA2F7] transition-all cursor-pointer shrink-0 shadow-subtle-depth active:scale-95 group animate-fade-in"
              title="Open sidebar (Ctrl+B)"
              aria-label="Open sidebar"
            >
              <PanelLeftOpen className="w-4 h-4 text-[#191A17] dark:text-[#F5F5F7] group-hover:text-[#2563EB] dark:group-hover:text-[#7AA2F7] transition-colors group-hover:scale-110" />
              <span className="text-[12px] font-bold hidden lg:inline">Sidebar</span>
            </button>
          )}

          {/* Responsive Exam Selector (Mobile & Desktop) with Target Year & Live Countdown */}
          <div className="relative min-w-0 flex-1 sm:flex-initial">
            <button
              onClick={() => setIsExamMenuOpen(prev => !prev)}
              className="flex items-center gap-1.5 sm:gap-2 h-9 px-2 sm:px-3 rounded-xl bg-white dark:bg-[#131522] border border-slate-200/80 dark:border-white/[0.08] hover:border-[#2563EB] dark:hover:border-[#7AA2F7] transition-all cursor-pointer text-xs sm:text-[13px] font-bold text-slate-900 dark:text-[#F5F5F7] shadow-subtle-depth active:scale-95 group min-w-0"
              title={`Switch Exam Target: ${rawExamName} (${targetYear})`}
            >
              <GraduationCap className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#2563EB] dark:text-[#7AA2F7] shrink-0 group-hover:scale-110 transition-transform" />
              <div className="flex items-center gap-1 sm:gap-1.5 min-w-0">
                <span className="truncate max-w-[120px] min-[360px]:max-w-[145px] min-[390px]:max-w-[170px] sm:max-w-[220px] font-bold tracking-tight">
                  {examDisplayName}
                </span>
                <span className="px-1.5 py-0.5 rounded-md text-[9.5px] sm:text-[10px] font-mono font-black bg-[#EFF6FF] dark:bg-[#7AA2F7]/15 text-[#2563EB] dark:text-[#7AA2F7] border border-[#BFDBFE]/60 dark:border-[#7AA2F7]/30 shrink-0 tabular-nums leading-none">
                  {targetYear}
                </span>
                {activeDaysRemaining !== null && activeDaysRemaining > 0 && (
                  <span className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/25 shrink-0 tabular-nums">
                    ⏳ {activeDaysRemaining}d
                  </span>
                )}
              </div>
              <ChevronDown className={`w-3 sm:w-3.5 h-3 sm:h-3.5 text-slate-400 shrink-0 transition-transform duration-200 ${isExamMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {isExamMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 sm:w-84 rounded-2xl bg-white dark:bg-[#131522] border border-slate-200/80 dark:border-white/[0.08] shadow-2xl p-2 z-50 animate-fade-in divide-y divide-slate-100 dark:divide-white/[0.06]">
                {/* Header */}
                <div className="px-2.5 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-blue-600 dark:text-[#7AA2F7]" />
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Target Exams ({exams.length})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setIsExamMenuOpen(false);
                      setIsAddExamModalOpen(true);
                    }}
                    className="px-2 py-1 rounded-lg text-[11px] font-bold text-blue-600 dark:text-[#7AA2F7] hover:bg-blue-50 dark:hover:bg-[#7AA2F7]/10 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Exam</span>
                  </button>
                </div>

                {/* Enrolled Exams List */}
                <div className="py-1.5 space-y-1 max-h-64 overflow-y-auto">
                  {exams.map(ex => {
                    const isCurrent = ex.id === currentExam?.id;
                    const exHasYear = /\s+(20\d{2})$/.test(ex.name);
                    const exYearMatch = ex.name.match(/\s+(20\d{2})$/)?.[1];
                    const exTargetYear = ex.targetYear || (exYearMatch ? Number(exYearMatch) : (ex.examDate ? new Date(ex.examDate).getFullYear() : 2026));
                    const exDisplayName = exHasYear ? ex.name.replace(/\s+20\d{2}$/, '') : ex.name;
                    const daysLeft = getExamDaysRemaining(ex.examDate, exTargetYear);
                    const totalSubjs = ex.subjects?.length || 0;

                    return (
                      <div
                        key={ex.id}
                        className={`w-full group rounded-xl p-2 sm:p-2.5 transition-all flex items-center justify-between gap-2 cursor-pointer ${
                          isCurrent
                            ? 'bg-blue-50/90 dark:bg-[#7AA2F7]/15 border border-blue-200 dark:border-[#7AA2F7]/30 text-blue-700 dark:text-[#93C5FD]'
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-transparent text-slate-700 dark:text-slate-300'
                        }`}
                        onClick={() => {
                          soundManager.playClick();
                          setSelectedExamId(ex.id);
                          setIsExamMenuOpen(false);
                        }}
                      >
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                            isCurrent
                              ? 'bg-blue-600 text-white shadow-xs'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                          }`}>
                            {isCurrent ? (
                              <Check className="w-4 h-4 stroke-[2.5]" />
                            ) : (
                              <GraduationCap className="w-4 h-4" />
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[13px] font-bold truncate">
                                {exDisplayName}
                              </span>
                              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-white/70 dark:bg-black/30 border border-slate-200/60 dark:border-white/10 shrink-0 tabular-nums">
                                {exTargetYear}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-0.5">
                              {daysLeft !== null && (
                                <span className={daysLeft <= 30 ? 'text-rose-500 font-bold' : ''}>
                                  📅 {daysLeft}d left
                                </span>
                              )}
                              <span>•</span>
                              <span>{totalSubjs} Subjects</span>
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
                            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-white dark:hover:bg-slate-700 transition-colors"
                            title="Edit Target Date & Countdown"
                          >
                            <Settings2 className="w-3.5 h-3.5" />
                          </button>
                          {exams.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Remove "${ex.name}" from your active exam targets?`)) {
                                  deleteExam(ex.id);
                                }
                              }}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors opacity-0 group-hover:opacity-100"
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
                    className="w-full text-left px-2.5 py-2 rounded-xl text-xs font-bold text-blue-600 dark:text-[#7AA2F7] hover:bg-blue-50 dark:hover:bg-[#7AA2F7]/10 flex items-center gap-2 transition-colors cursor-pointer"
                    onClick={() => {
                      soundManager.playClick();
                      setIsExamMenuOpen(false);
                      setIsAddExamModalOpen(true);
                    }}
                  >
                    <Plus className="w-3.5 h-3.5 shrink-0" />
                    <span>+ Enroll New Exam Target...</span>
                  </button>

                  <button
                    type="button"
                    className="w-full text-left px-2.5 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 transition-colors cursor-pointer"
                    onClick={() => {
                      soundManager.playClick();
                      setIsExamMenuOpen(false);
                      setIsEditExamModalOpen(true);
                    }}
                  >
                    <Settings2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Customize Active Exam & Timer...</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center: Desktop Quick Navigation Hub (Syllabus, Planner, Study Station Hub) */}
        <nav
          aria-label="Quick Navigation"
          className="hidden lg:flex items-center gap-1 p-1 rounded-2xl bg-slate-100/90 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.08] backdrop-blur-md shadow-2xs shrink-0 select-none"
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
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold bg-blue-500/15 text-blue-600 dark:text-[#93C5FD] border border-blue-500/30 tabular-nums">
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
                  ? 'bg-white dark:bg-[#1E2138] text-indigo-600 dark:text-[#93C5FD] shadow-xs border border-indigo-200/60 dark:border-[#7AA2F7]/30'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/[0.04]'
              }`}
              title="Study Station Hub: Focus Timer, Spaced Revision, Mind Map, Weak Topics & More"
              aria-label="Open Study Station Hub"
              aria-expanded={isStudyHubOpen}
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-500 dark:text-[#7AA2F7]" />
              <span>Study Station Hub</span>
              <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${isStudyHubOpen ? 'rotate-180 text-indigo-600 dark:text-[#7AA2F7]' : ''}`} />
            </button>

            {/* Dropdown Card */}
            {isStudyHubOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-[#121424] border border-slate-200/90 dark:border-white/[0.09] shadow-2xl p-2.5 z-50 animate-fade-in divide-y divide-slate-100 dark:divide-white/[0.06]">
                {/* Header & Luxury Focus Launcher */}
                <div className="pb-2.5">
                  <div className="flex items-center justify-between px-1 mb-2">
                    <div className="flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-indigo-600 dark:text-[#7AA2F7]" />
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Study Station Hub
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
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
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white shadow-md hover:shadow-indigo-500/20 transition-all active:scale-[0.98] group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0 shadow-inner">
                        <Timer className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold flex items-center gap-1.5">
                          <span>Focus Timer (Pomodoro)</span>
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-white/20 uppercase tracking-wider font-extrabold">
                            3D Dial
                          </span>
                        </div>
                        <p className="text-[11px] text-white/80">Chronometer dial with ambient binaural sounds</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/70 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                  </button>
                </div>

                {/* 2-Column Grid of 8 Study Station Tools */}
                <div className="py-2 grid grid-cols-2 gap-1.5 max-h-[320px] overflow-y-auto">
                  {/* Spaced Revision */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsStudyHubOpen(false);
                      soundManager.playClick();
                      haptics.selection();
                      onNavigate?.('revision');
                    }}
                    className={`flex items-center gap-2 p-2 rounded-xl text-left transition-all cursor-pointer ${
                      currentView === 'revision'
                        ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/25'
                        : 'hover:bg-slate-50 dark:hover:bg-white/[0.04] text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                      <RotateCw className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold truncate">Revision</span>
                        {dueRevisionCount > 0 && (
                          <span className="px-1 py-0.2 rounded text-[9px] font-mono font-bold bg-amber-500 text-white shrink-0">
                            {dueRevisionCount}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 truncate block">Spaced Recall</span>
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
                    className={`flex items-center gap-2 p-2 rounded-xl text-left transition-all cursor-pointer ${
                      currentView === 'weak'
                        ? 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/25'
                        : 'hover:bg-slate-50 dark:hover:bg-white/[0.04] text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold truncate">Weak Topics</span>
                        {weakTopicsCount > 0 && (
                          <span className="px-1 py-0.2 rounded text-[9px] font-mono font-bold bg-rose-500 text-white shrink-0">
                            {weakTopicsCount}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 truncate block">Diagnostic Matrix</span>
                    </div>
                  </button>

                  {/* Concept Mind Map */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsStudyHubOpen(false);
                      soundManager.playClick();
                      haptics.selection();
                      onNavigate?.('mindmap');
                    }}
                    className={`flex items-center gap-2 p-2 rounded-xl text-left transition-all cursor-pointer ${
                      currentView === 'mindmap'
                        ? 'bg-indigo-500/10 text-indigo-700 dark:text-[#93C5FD] border border-indigo-500/25'
                        : 'hover:bg-slate-50 dark:hover:bg-white/[0.04] text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-indigo-500/15 text-indigo-600 dark:text-[#7AA2F7] flex items-center justify-center shrink-0">
                      <BrainCircuit className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-bold truncate block">Mind Map</span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 truncate block">Visual Graph</span>
                    </div>
                  </button>

                  {/* Target Pacing */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsStudyHubOpen(false);
                      soundManager.playClick();
                      haptics.selection();
                      onNavigate?.('pacing');
                    }}
                    className={`flex items-center gap-2 p-2 rounded-xl text-left transition-all cursor-pointer ${
                      currentView === 'pacing'
                        ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25'
                        : 'hover:bg-slate-50 dark:hover:bg-white/[0.04] text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-bold truncate block">Target Pacing</span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 truncate block">Exam Velocity</span>
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
                    className={`flex items-center gap-2 p-2 rounded-xl text-left transition-all cursor-pointer ${
                      currentView === 'youtube-notes'
                        ? 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/25'
                        : 'hover:bg-slate-50 dark:hover:bg-white/[0.04] text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                      <Video className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold truncate">YouTube AI</span>
                        <span className="px-1 py-0.2 rounded text-[9px] font-mono font-bold bg-purple-500 text-white shrink-0">
                          AI
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 truncate block">Lecture Notes</span>
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
                    className={`flex items-center gap-2 p-2 rounded-xl text-left transition-all cursor-pointer ${
                      currentView === 'mock-tracker'
                        ? 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/25'
                        : 'hover:bg-slate-50 dark:hover:bg-white/[0.04] text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                      <Trophy className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-bold truncate block">Mock Tracker</span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 truncate block">Scores & Ranks</span>
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
                    className={`flex items-center gap-2 p-2 rounded-xl text-left transition-all cursor-pointer ${
                      currentView === 'analytics'
                        ? 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/25'
                        : 'hover:bg-slate-50 dark:hover:bg-white/[0.04] text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                      <BarChart3 className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-bold truncate block">Analytics</span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 truncate block">Heatmap & XP</span>
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
                    className={`flex items-center gap-2 p-2 rounded-xl text-left transition-all cursor-pointer ${
                      currentView === 'platforms'
                        ? 'bg-slate-500/10 text-slate-800 dark:text-white border border-slate-500/25'
                        : 'hover:bg-slate-50 dark:hover:bg-white/[0.04] text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center shrink-0">
                      <LayoutGrid className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-bold truncate block">Platforms</span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 truncate block">Study Links</span>
                    </div>
                  </button>
                </div>

                {/* Footer: Link to Dashboard Overview */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsStudyHubOpen(false);
                      soundManager.playClick();
                      haptics.selection();
                      onNavigate?.('overview');
                    }}
                    className="w-full text-center py-1.5 px-2 rounded-xl text-[11px] font-bold text-slate-500 hover:text-blue-600 dark:hover:text-[#7AA2F7] hover:bg-slate-100/60 dark:hover:bg-white/[0.04] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Go to Complete Study Dashboard</span>
                    <ArrowRight className="w-3 h-3" />
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
              className="h-9 flex items-center gap-1 px-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-[10px] sm:text-[11px] font-mono font-bold animate-pulse cursor-help shrink-0"
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
            className="h-9 w-9 md:w-auto p-0 md:px-3 rounded-xl bg-white dark:bg-[#131522] border border-slate-200/80 dark:border-white/[0.08] text-[#65675F] dark:text-slate-200 hover:text-[#191A17] dark:hover:text-white hover:border-blue-500/50 dark:hover:border-blue-400/50 transition-all flex items-center justify-center md:justify-start gap-1.5 cursor-pointer shadow-subtle-depth text-xs font-medium shrink-0 active:scale-95"
            title="Search Topics (Cmd + K)"
            aria-label="Search topics"
          >
            <Search className="w-4 h-4 text-[#2563EB] dark:text-[#93C5FD] shrink-0" />
            <span className="hidden md:inline">Search...</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[11px] font-mono bg-slate-100 dark:bg-white/[0.06] rounded text-slate-500 dark:text-slate-300 font-bold border border-slate-200/60 dark:border-white/[0.06]">⌘K</kbd>
          </button>

          {/* Streak Indicator (Hidden on mobile < sm to keep header clean and spacious) */}
          <div className="hidden sm:flex h-9 items-center gap-1 px-2.5 rounded-xl bg-white dark:bg-[#131522] border border-slate-200/80 dark:border-white/[0.08] shadow-subtle-depth shrink-0">
            <Flame className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#C49A3A] fill-[#C49A3A] shrink-0" />
            <span className="text-[11px] sm:text-xs tabular-nums font-black text-[#191A17] dark:text-white font-mono">
              {profile.currentStreak}d
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
              onClick={async () => {
                soundManager.playClick();
                haptics.medium();
                if (isInstallable) {
                  await triggerInstall();
                } else {
                  onOpenSettings();
                }
              }}
              className="h-9 px-2 sm:px-2.5 rounded-xl bg-blue-50/80 dark:bg-blue-950/30 hover:bg-blue-100/80 dark:hover:bg-blue-900/40 border border-blue-500/25 dark:border-blue-400/20 text-blue-600 dark:text-[#7AA2F7] transition-all cursor-pointer shadow-subtle-depth active:scale-95 shrink-0 flex items-center gap-1.5 text-xs font-bold"
              title="Install Syllabus 3D App on Device"
              aria-label="Install App"
            >
              <Download className="w-3.5 h-3.5 text-blue-600 dark:text-[#7AA2F7]" />
              <span className="hidden sm:inline">Install App</span>
            </button>
          )}

          {/* Theme Toggle (Light <-> Dark) */}
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              haptics.light();
              handleThemeToggle();
            }}
            className="h-9 w-9 rounded-xl bg-white dark:bg-[#131522] border border-slate-200/80 dark:border-white/[0.08] text-[#64748B] hover:text-[#0F172A] dark:text-[#A1A1AA] dark:hover:text-white transition-all cursor-pointer shadow-subtle-depth active:scale-90 shrink-0 flex items-center justify-center"
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
              <Sun className="w-4 h-4 text-[#F59E0B]" />
            ) : theme === 'warm-cream' ? (
              <Sparkles className="w-4 h-4 text-[#E1A837]" />
            ) : (
              <Moon className="w-4 h-4 text-[#2563EB]" />
            )}
          </button>

          {/* User Profile Avatar / Settings Trigger */}
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              haptics.light();
              onOpenSettings();
            }}
            className={`h-9 w-9 rounded-full bg-gradient-to-tr ${
              profile.avatarColor || 'from-[#2563EB] to-indigo-600'
            } border border-slate-200/80 dark:border-white/[0.08] text-white font-bold flex items-center justify-center text-xs shadow-sm cursor-pointer overflow-hidden active:scale-95 hover:border-[#2563EB] dark:hover:border-[#7AA2F7] transition-all shrink-0`}
            title={`Profile: ${profile.name || 'Aspirant'}`}
            aria-label="Open profile settings"
          >
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile.name || 'User'}
                className="w-full h-full object-cover"
              />
            ) : profile.avatarEmoji ? (
              <span className="text-[13px] leading-none drop-shadow">{profile.avatarEmoji}</span>
            ) : (
              (profile.name || 'A').charAt(0).toUpperCase()
            )}
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
    </header>
  );
};

