import React, { useState, useEffect, useCallback, useRef, lazy, Suspense } from 'react';
import { Sidebar, AppView } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { MobileNav } from './components/layout/MobileNav';
import { MobileDrawer } from './components/layout/MobileDrawer';
import { OverviewView } from './components/views/OverviewView';
import { FloatingTimerOverlay } from './components/focus/FloatingTimerOverlay';
import { useTimer } from './context/TimerContext';
import { AnimatedLogoIntro } from './components/intro/AnimatedLogoIntro';
import { Topic } from './types/syllabus';
import { useAuth } from './context/AuthContext';
import { AuthLayout } from './components/auth/AuthLayout';
import { LoginView } from './components/auth/LoginView';
import { SignUpView } from './components/auth/SignUpView';
import { ForgotPasswordView } from './components/auth/ForgotPasswordView';
import { InitialAuthLoading } from './components/auth/InitialAuthLoading';
import { soundManager } from './utils/soundEffects';
import { haptics } from './utils/haptics';
import { PWAInstallBanner } from './components/common/PWAInstallBanner';
import { OfflineStatusIndicator } from './components/common/OfflineStatusIndicator';
import { ViewErrorBoundary } from './components/common/ViewErrorBoundary';
import { storageManager } from './services/storageManager';
import { useTheme } from './context/ThemeContext';
import { PinLockScreen } from './components/security/PinLockScreen';
import { useInactivityLock } from './hooks/useInactivityLock';
import { Sparkles } from 'lucide-react';
import { preloadHighPriorityViews, preloadRemainingViews } from './utils/viewPreloader';

// ⚡ Lazy Loaded Secondary Views (Code Splitting for Lightning-Fast Initial Load)
const SyllabusView = lazy(() => import('./components/views/SyllabusView').then(m => ({ default: m.SyllabusView })));
const SubjectsView = lazy(() => import('./components/views/SubjectsView').then(m => ({ default: m.SubjectsView })));
const PlannerView = lazy(() => import('./components/views/PlannerView').then(m => ({ default: m.PlannerView })));
const MindMapView = lazy(() => import('./components/views/MindMapView').then(m => ({ default: m.MindMapView })));
const RevisionView = lazy(() => import('./components/views/RevisionView').then(m => ({ default: m.RevisionView })));
const WeakTopicsView = lazy(() => import('./components/views/WeakTopicsView').then(m => ({ default: m.WeakTopicsView })));
const AnalyticsView = lazy(() => import('./components/views/AnalyticsView').then(m => ({ default: m.AnalyticsView })));
const HeatmapView = lazy(() => import('./components/views/HeatmapView').then(m => ({ default: m.HeatmapView })));
const SettingsView = lazy(() => import('./components/views/SettingsView').then(m => ({ default: m.SettingsView })));
const PlatformsView = lazy(() => import('./components/views/PlatformsView').then(m => ({ default: m.PlatformsView })));
const PacingView = lazy(() => import('./components/views/PacingView').then(m => ({ default: m.PacingView })));
const LandingPage = lazy(() => import('./components/landing/LandingPage').then(m => ({ default: m.LandingPage })));
const YouTubeNotesView = lazy(() => import('./components/views/YouTubeNotesView').then(m => ({ default: m.YouTubeNotesView })));
const MockTrackerView = lazy(() => import('./components/views/MockTrackerView').then(m => ({ default: m.MockTrackerView })));
const DailyTargetsView = lazy(() => import('./components/views/DailyTargetsView').then(m => ({ default: m.DailyTargetsView })));
const StudyToolsView = lazy(() => import('./components/views/StudyToolsView').then(m => ({ default: m.StudyToolsView })));

// ⚡ Lazy Loaded Heavy Modals & Drawers
const TopicDetailDrawer = lazy(() => import('./components/modals/TopicDetailDrawer').then(m => ({ default: m.TopicDetailDrawer })));
const RevisionSessionModal = lazy(() => import('./components/modals/RevisionSessionModal').then(m => ({ default: m.RevisionSessionModal })));
const PomodoroFocusModal = lazy(() => import('./components/focus/PomodoroFocusModal').then(m => ({ default: m.PomodoroFocusModal })));
const CommandSearchModal = lazy(() => import('./components/modals/CommandSearchModal').then(m => ({ default: m.CommandSearchModal })));
const AddTopicModal = lazy(() => import('./components/modals/AddTopicModal').then(m => ({ default: m.AddTopicModal })));
const AiSyllabusArchitectModal = lazy(() => import('./components/modals/AiSyllabusArchitectModal').then(m => ({ default: m.AiSyllabusArchitectModal })));
const FloatingTimerPermissionModal = lazy(() => import('./components/modals/FloatingTimerPermissionModal').then(m => ({ default: m.FloatingTimerPermissionModal })));
const KeyboardShortcutsModal = lazy(() => import('./components/modals/KeyboardShortcutsModal').then(m => ({ default: m.KeyboardShortcutsModal })));
const WalkAndReviseModal = lazy(() => import('./components/modals/WalkAndReviseModal').then(m => ({ default: m.WalkAndReviseModal })));
const SmartBacklogRescueModal = lazy(() => import('./components/modals/SmartBacklogRescueModal').then(m => ({ default: m.SmartBacklogRescueModal })));
const PricingSubscriptionModal = lazy(() => import('./components/modals/PricingSubscriptionModal').then(m => ({ default: m.PricingSubscriptionModal })));
const DailyReflectionModal = lazy(() => import('./components/modals/DailyReflectionModal').then(m => ({ default: m.DailyReflectionModal })));
const ReflectionHistoryModal = lazy(() => import('./components/modals/ReflectionHistoryModal').then(m => ({ default: m.ReflectionHistoryModal })));

const ViewLoadingFallback: React.FC = () => (
  <div className="w-full space-y-5 animate-view-fade select-none pb-12">
    {/* Banner Skeleton */}
    <div className="w-full h-44 sm:h-56 rounded-3xl skeleton-shimmer bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5 shadow-2xs" />

    {/* Bento Cards 3-Grid Skeleton */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
      <div className="h-32 rounded-2xl skeleton-shimmer bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5" />
      <div className="h-32 rounded-2xl skeleton-shimmer bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5" />
      <div className="h-32 rounded-2xl skeleton-shimmer bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5" />
    </div>

    {/* Content Table/List Skeleton */}
    <div className="w-full h-64 rounded-2xl skeleton-shimmer bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5" />
  </div>
);

const VALID_VIEWS = new Set<AppView>([
  'overview',
  'targets',
  'planner',
  'routine',
  'platforms',
  'syllabus',
  'subjects',
  'revision',
  'weak',
  'mindmap',
  'analytics',
  'heatmap',
  'pacing',
  'settings',
  'youtube-notes',
  'mock-tracker',
  'landing',
  'study-tools',
  'study-tools-vocab',
  'study-tools-vocab-ssc',
  'study-tools-maths',
  'study-tools-calc-booster',
  'study-tools-ga'
]);

export const App: React.FC = () => {
  const { isAuthenticated, isLoading, authView, setAuthView } = useAuth();
  const { isFullModalOpen, openFullModal, closeFullModal, setSessionTopic } = useTimer();
  useInactivityLock();
  const [currentView, setCurrentView] = useState<AppView>(() => {
    try {
      const hasVisited = localStorage.getItem('syllabus3d_has_visited');
      if (!hasVisited) {
        return 'landing';
      }
    } catch {}
    return 'overview';
  });
  const [viewHistory, setViewHistory] = useState<AppView[]>([]);
  const [targetSubjectId, setTargetSubjectId] = useState<string>('');

  // 🚀 Keep-Alive Visited Views Tracking for Instant 0ms Page Switching
  const [visitedViews, setVisitedViews] = useState<Set<AppView>>(() => new Set([currentView]));

  useEffect(() => {
    setVisitedViews(prev => {
      if (prev.has(currentView)) return prev;
      const next = new Set(prev);
      next.add(currentView);
      return next;
    });
  }, [currentView]);

  // 🚀 Intelligent Non-Blocking Background Preloader
  useEffect(() => {
    const idleCallback = window.requestIdleCallback || ((cb: () => void) => setTimeout(cb, 600));
    const handle = idleCallback(() => {
      preloadHighPriorityViews();
      preloadRemainingViews();
    });
    return () => {
      if (window.cancelIdleCallback && typeof handle === 'number') {
        window.cancelIdleCallback(handle);
      }
    };
  }, []);

  // 3D Animated Startup Logo Experience (Shown only once on first visit, never blocks return visits)
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    try {
      return !localStorage.getItem('syllabus3d_intro_seen');
    } catch {
      return false;
    }
  });

  // Mobile Drawer State
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Desktop Sidebar Collapse State (Gemini-Style with LocalStorage Persistence)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('syllabus3d_sidebar_collapsed') === 'true';
    } catch {
      return false;
    }
  });

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAddTopicOpen, setIsAddTopicOpen] = useState(false);
  const [isAiArchitectOpen, setIsAiArchitectOpen] = useState(false);
  const [addTopicTarget, setAddTopicTarget] = useState<{ subjectId?: string; chapterId?: string } | null>(null);
  const [isRevisionSessionOpen, setIsRevisionSessionOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isNightJournalOpen, setIsNightJournalOpen] = useState(false);
  const [isReflectionHistoryOpen, setIsReflectionHistoryOpen] = useState(false);
  const [shortcutToast, setShortcutToast] = useState<string | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [focusTopicId, setFocusTopicId] = useState<string | undefined>(undefined);

  const { toggleTheme } = useTheme();

  const handleOpenAddTopic = useCallback((subjectId?: string, chapterId?: string) => {
    setAddTopicTarget(subjectId ? { subjectId, chapterId } : null);
    setIsAddTopicOpen(true);
    window.history.pushState({ modal: 'add_topic' }, '');
  }, []);

  const handleCloseAddTopic = useCallback(() => {
    setIsAddTopicOpen(false);
    setAddTopicTarget(null);
  }, []);

  const handleOpenAiArchitect = useCallback(() => {
    setIsAiArchitectOpen(true);
    window.history.pushState({ modal: 'ai_architect' }, '');
  }, []);

  const handleCloseAiArchitect = useCallback(() => {
    setIsAiArchitectOpen(false);
  }, []);

  // 🚶 Walk & Revise Modal State & Handlers
  const [isWalkAndReviseOpen, setIsWalkAndReviseOpen] = useState(false);
  const handleOpenWalkAndRevise = useCallback(() => {
    setIsWalkAndReviseOpen(true);
    window.history.pushState({ modal: 'walk_and_revise' }, '');
  }, []);
  const handleCloseWalkAndRevise = useCallback(() => {
    setIsWalkAndReviseOpen(false);
  }, []);

  // ⚡ Smart Backlog Rescue Modal State & Handlers
  const [isBacklogRescueOpen, setIsBacklogRescueOpen] = useState(false);
  const handleOpenBacklogRescue = useCallback(() => {
    setIsBacklogRescueOpen(true);
    window.history.pushState({ modal: 'backlog_rescue' }, '');
  }, []);
  const handleCloseBacklogRescue = useCallback(() => {
    setIsBacklogRescueOpen(false);
  }, []);

  const showShortcutToast = useCallback((msg: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setShortcutToast(msg);
    toastTimeoutRef.current = setTimeout(() => {
      setShortcutToast(null);
    }, 1800);
  }, []);

  const toggleDesktopSidebar = useCallback(() => {
    setIsSidebarCollapsed(prev => {
      const next = !prev;
      try {
        localStorage.setItem('syllabus3d_sidebar_collapsed', String(next));
      } catch {}
      soundManager.playClick();
      haptics.light();
      showShortcutToast(next ? 'Sidebar collapsed [Ctrl+B]' : 'Sidebar expanded [Ctrl+B]');
      return next;
    });
  }, [showShortcutToast]);

  // Topic Drawer
  const [selectedTopic, setSelectedTopic] = useState<{
    topic: Topic;
    subjectName: string;
    chapterName: string;
  } | null>(null);

  const syllabusBackHandlerRef = useRef<(() => boolean) | null>(null);

  // Cleanup toast timer on unmount
  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  // 🛡️ Proactive Storage Health Check & Auto-Healing on Startup
  useEffect(() => {
    storageManager.checkStorageHealthAndAutoHeal();
  }, []);

  // 🔒 Lock Home/Overview Screen to Viewport without scrollbar
  useEffect(() => {
    if (currentView === 'overview') {
      document.documentElement.classList.add('overview-screen');
      document.body.classList.add('overview-screen');
    } else {
      document.documentElement.classList.remove('overview-screen');
      document.body.classList.remove('overview-screen');
    }
    return () => {
      document.documentElement.classList.remove('overview-screen');
      document.body.classList.remove('overview-screen');
    };
  }, [currentView]);

  // Navigate with History Push
  const handleNavigate = useCallback((newView: AppView) => {
    const targetView: AppView = newView && VALID_VIEWS.has(newView) ? newView : 'overview';
    if (targetView === currentView) return;
    if (targetView !== 'syllabus') {
      setTargetSubjectId('');
    }
    if (targetView === 'overview') {
      setViewHistory([]);
    } else {
      setViewHistory(prev => [...prev, currentView]);
    }
    window.history.pushState({ view: targetView }, '');
    setCurrentView(targetView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    soundManager.playClick();
  }, [currentView]);

  // Navigate directly to a specific subject in Syllabus view
  const handleNavigateToSubject = useCallback((subjectId: string) => {
    setTargetSubjectId(subjectId);
    handleNavigate('syllabus');
  }, [handleNavigate]);

  // Global Back Handler
  const handleBack = useCallback(() => {
    if (isMobileDrawerOpen) {
      setIsMobileDrawerOpen(false);
      return;
    }
    if (selectedTopic) {
      setSelectedTopic(null);
      return;
    }
    if (isSearchOpen) {
      setIsSearchOpen(false);
      return;
    }
    if (isAiArchitectOpen) {
      setIsAiArchitectOpen(false);
      return;
    }
    if (isAddTopicOpen) {
      handleCloseAddTopic();
      return;
    }
    if (isRevisionSessionOpen) {
      setIsRevisionSessionOpen(false);
      return;
    }
    if (isWalkAndReviseOpen) {
      setIsWalkAndReviseOpen(false);
      return;
    }
    if (isBacklogRescueOpen) {
      setIsBacklogRescueOpen(false);
      return;
    }
    if (isFullModalOpen) {
      closeFullModal();
      return;
    }

    if (currentView === 'syllabus' && syllabusBackHandlerRef.current) {
      const handled = syllabusBackHandlerRef.current();
      if (handled) return;
    }

    if (viewHistory.length > 0) {
      const previousView = viewHistory[viewHistory.length - 1];
      setViewHistory(prev => prev.slice(0, -1));
      setCurrentView(previousView && VALID_VIEWS.has(previousView) ? previousView : 'overview');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      soundManager.playClick();
    } else if (currentView !== 'overview') {
      setCurrentView('overview');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      soundManager.playClick();
    }
  }, [
    isMobileDrawerOpen,
    selectedTopic,
    isSearchOpen,
    isAiArchitectOpen,
    isAddTopicOpen,
    isRevisionSessionOpen,
    isWalkAndReviseOpen,
    isBacklogRescueOpen,
    isFullModalOpen,
    currentView,
    viewHistory,
    closeFullModal,
    handleCloseAddTopic
  ]);

  // Browser History / Android Back Button Support
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (isMobileDrawerOpen) {
        setIsMobileDrawerOpen(false);
        return;
      }
      if (selectedTopic) {
        setSelectedTopic(null);
        return;
      }
      if (isSearchOpen) {
        setIsSearchOpen(false);
        return;
      }
      if (isAiArchitectOpen) {
        setIsAiArchitectOpen(false);
        return;
      }
      if (isAddTopicOpen) {
        handleCloseAddTopic();
        return;
      }
      if (isRevisionSessionOpen) {
        setIsRevisionSessionOpen(false);
        return;
      }
      if (isWalkAndReviseOpen) {
        setIsWalkAndReviseOpen(false);
        return;
      }
      if (isBacklogRescueOpen) {
        setIsBacklogRescueOpen(false);
        return;
      }
      if (isNightJournalOpen) {
        setIsNightJournalOpen(false);
        return;
      }
      if (isReflectionHistoryOpen) {
        setIsReflectionHistoryOpen(false);
        return;
      }
      if (isFullModalOpen) {
        closeFullModal();
        return;
      }

      if (currentView === 'syllabus' && syllabusBackHandlerRef.current) {
        const handled = syllabusBackHandlerRef.current();
        if (handled) return;
      }

      if (e.state && e.state.view && VALID_VIEWS.has(e.state.view)) {
        setCurrentView(e.state.view);
      } else if (viewHistory.length > 0) {
        const previousView = viewHistory[viewHistory.length - 1];
        setViewHistory(prev => prev.slice(0, -1));
        setCurrentView(previousView && VALID_VIEWS.has(previousView) ? previousView : 'overview');
      } else {
        setCurrentView('overview');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [
    isMobileDrawerOpen,
    selectedTopic,
    isSearchOpen,
    isAiArchitectOpen,
    isAddTopicOpen,
    isRevisionSessionOpen,
    isWalkAndReviseOpen,
    isBacklogRescueOpen,
    isFullModalOpen,
    currentView,
    viewHistory,
    closeFullModal,
    handleCloseAddTopic
  ]);

  const handleOpenTopicDrawer = (topic: Topic, subjectName: string, chapterName: string) => {
    haptics.medium();
    setSelectedTopic({ topic, subjectName, chapterName });
    window.history.pushState({ modal: 'topic_drawer', topicId: topic.id }, '');
  };

  const handleCloseTopicDrawer = () => {
    haptics.light();
    setSelectedTopic(null);
  };

  // Launch Focus Chamber for a specific topic
  const handleLaunchFocus = (topicId?: string) => {
    haptics.medium();
    if (topicId) {
      setFocusTopicId(topicId);
      setSessionTopic(topicId);
    } else {
      setFocusTopicId(undefined);
    }
    openFullModal();
  };

  // ♿ Power User Keyboard Shortcuts & Quick Navigation Engine
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command Search Palette: Ctrl+K or Cmd+K (allowed everywhere)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
        return;
      }

      // Gemini-Style Sidebar Toggle: Ctrl+B or Cmd+B
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        toggleDesktopSidebar();
        return;
      }

      // Allow native browser print: Ctrl+P / Cmd+P
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
        return;
      }

      // Hierarchical Escape Handler
      if (e.key === 'Escape') {
        if (isShortcutsOpen) {
          setIsShortcutsOpen(false);
          return;
        }
        if (isSearchOpen) {
          setIsSearchOpen(false);
          return;
        }
        if (isAiArchitectOpen) {
          setIsAiArchitectOpen(false);
          return;
        }
        if (isAddTopicOpen) {
          setIsAddTopicOpen(false);
          return;
        }
        if (selectedTopic) {
          setSelectedTopic(null);
          return;
        }
        if (isRevisionSessionOpen) {
          setIsRevisionSessionOpen(false);
          return;
        }
        if (isWalkAndReviseOpen) {
          setIsWalkAndReviseOpen(false);
          return;
        }
        if (isBacklogRescueOpen) {
          setIsBacklogRescueOpen(false);
          return;
        }
        if (isFullModalOpen) {
          closeFullModal();
          return;
        }
        if (isMobileDrawerOpen) {
          setIsMobileDrawerOpen(false);
          return;
        }
      }

      // Check if user is actively typing in an input, textarea, or contenteditable
      const activeEl = document.activeElement;
      const isTyping = Boolean(
        activeEl && (
          activeEl.tagName === 'INPUT' ||
          activeEl.tagName === 'TEXTAREA' ||
          activeEl.tagName === 'SELECT' ||
          activeEl.getAttribute('contenteditable') === 'true'
        )
      );

      if (isTyping) return;

      // ? or Shift + / -> Toggle Keyboard Shortcuts Modal (Web / Desktop Only)
      if ((e.key === '?' || (e.shiftKey && e.key === '/')) && window.innerWidth >= 768) {
        e.preventDefault();
        setIsShortcutsOpen(prev => !prev);
        return;
      }

      // / -> Open Command Search Palette
      if (e.key === '/') {
        e.preventDefault();
        setIsSearchOpen(true);
        return;
      }

      // Single-Key Direct View Navigation:
      if (e.key === '1') {
        e.preventDefault();
        handleNavigate('overview');
        showShortcutToast('Jumped to Dashboard [1]');
        return;
      }
      if (e.key === '2') {
        e.preventDefault();
        handleNavigate('syllabus');
        showShortcutToast('Jumped to Syllabus Explorer [2]');
        return;
      }
      if (e.key === '3') {
        e.preventDefault();
        handleNavigate('planner');
        showShortcutToast('Jumped to Study Planner [3]');
        return;
      }
      if (e.key === '4') {
        e.preventDefault();
        handleNavigate('revision');
        showShortcutToast('Jumped to Spaced Revision [4]');
        return;
      }
      if (e.key === '5') {
        e.preventDefault();
        handleNavigate('weak');
        showShortcutToast('Jumped to Weak Topics & Traps [5]');
        return;
      }
      if (e.key === '6') {
        e.preventDefault();
        handleNavigate('mindmap');
        showShortcutToast('Jumped to Syllabus Mindmap [6]');
        return;
      }
      if (e.key === '7') {
        e.preventDefault();
        handleNavigate('analytics');
        showShortcutToast('Jumped to Analytics & Heatmap [7]');
        return;
      }
      if (e.key === '8') {
        e.preventDefault();
        handleNavigate('platforms');
        showShortcutToast('Jumped to Study Station & Hub [8]');
        return;
      }
      if (e.key === '9') {
        e.preventDefault();
        handleNavigate('settings');
        showShortcutToast('Jumped to App Settings [9]');
        return;
      }

      // Single-Key Action Shortcuts:
      // F -> 3D Focus Chamber
      if (e.key.toLowerCase() === 'f' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        handleLaunchFocus(undefined);
        showShortcutToast('Opened 3D Focus Chamber [F]');
        return;
      }

      // N -> Add Custom Topic
      if (e.key.toLowerCase() === 'n' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        setIsAddTopicOpen(true);
        showShortcutToast('Opened Add Custom Topic [N]');
        return;
      }

      // D -> Toggle Dark / Light Theme
      if (e.key.toLowerCase() === 'd' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        toggleTheme();
        showShortcutToast('Theme Toggled [D]');
        return;
      }

      // P -> Clean Desk Print Mode
      if (e.key.toLowerCase() === 'p' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        soundManager.playClick();
        haptics.selection();
        window.print();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isShortcutsOpen,
    isSearchOpen,
    isAiArchitectOpen,
    isAddTopicOpen,
    isRevisionSessionOpen,
    isWalkAndReviseOpen,
    isBacklogRescueOpen,
    selectedTopic,
    isFullModalOpen,
    isMobileDrawerOpen,
    handleNavigate,
    showShortcutToast,
    toggleTheme,
    closeFullModal,
    handleLaunchFocus,
    toggleDesktopSidebar
  ]);

  // 📱 Mobile Top-Level Horizontal View Swiping (Overview ⇄ Syllabus ⇄ Planner)
  const viewSwipeStartX = useRef<number | null>(null);
  const viewSwipeStartY = useRef<number | null>(null);
  const viewSwipeStartTime = useRef<number>(0);
  const isHorizontalViewSwipe = useRef<boolean | null>(null);

  const isInteractiveSwipeTarget = (target: EventTarget | null): boolean => {
    if (!(target instanceof HTMLElement)) return false;
    return Boolean(
      target.closest(
        'input, textarea, select, button, a, [contenteditable="true"], [role="slider"], .no-swipe, [data-no-swipe], audio, video, iframe, canvas, table, .overflow-x-auto, [data-canvas]'
      )
    );
  };

  const handleMainTouchStart = (e: React.TouchEvent) => {
    if (
      isMobileDrawerOpen ||
      selectedTopic ||
      isSearchOpen ||
      isAddTopicOpen ||
      isRevisionSessionOpen ||
      isFullModalOpen
    ) {
      viewSwipeStartX.current = null;
      return;
    }

    if (isInteractiveSwipeTarget(e.target)) {
      viewSwipeStartX.current = null;
      return;
    }

    viewSwipeStartX.current = e.touches[0].clientX;
    viewSwipeStartY.current = e.touches[0].clientY;
    viewSwipeStartTime.current = Date.now();
    isHorizontalViewSwipe.current = null;
  };

  const handleMainTouchMove = (e: React.TouchEvent) => {
    if (viewSwipeStartX.current === null || viewSwipeStartY.current === null) return;

    const diffX = e.touches[0].clientX - viewSwipeStartX.current;
    const diffY = e.touches[0].clientY - viewSwipeStartY.current;

    if (isHorizontalViewSwipe.current === null) {
      if (Math.abs(diffX) > 12 || Math.abs(diffY) > 12) {
        if (Math.abs(diffX) > Math.abs(diffY) * 1.5) {
          isHorizontalViewSwipe.current = true;
        } else {
          isHorizontalViewSwipe.current = false;
        }
      }
    }
  };

  const handleMainTouchEnd = (e: React.TouchEvent) => {
    if (
      isHorizontalViewSwipe.current === true &&
      viewSwipeStartX.current !== null &&
      e.changedTouches.length > 0
    ) {
      const diffX = e.changedTouches[0].clientX - viewSwipeStartX.current;
      const duration = Date.now() - viewSwipeStartTime.current;

      const isFastFlick = duration < 350 && Math.abs(diffX) > 40;
      const isNormalSwipe = Math.abs(diffX) > 70;

      if (isFastFlick || isNormalSwipe) {
        if (diffX < 0) {
          // Swiped Left -> Move forward
          if (currentView === 'overview') {
            haptics.light();
            handleNavigate('syllabus');
          } else if (currentView === 'syllabus') {
            haptics.light();
            handleNavigate('planner');
          }
        } else if (diffX > 0) {
          // Swiped Right -> Move backward
          if (currentView === 'planner') {
            haptics.light();
            handleNavigate('syllabus');
          } else if (currentView === 'syllabus') {
            haptics.light();
            handleNavigate('overview');
          }
        }
      }
    }

    viewSwipeStartX.current = null;
    viewSwipeStartY.current = null;
    isHorizontalViewSwipe.current = null;
  };

  if (isLoading) {
    return <InitialAuthLoading />;
  }

  // 🌟 FIRST VISIT & PRODUCT OVERVIEW LANDING PAGE VIEW
  // When user visits for the first time (or clicks "Product Overview" in sidebar):
  // Renders the clean standalone Landing Page matching Picture 1 with top showcase banner.
  // The Dashboard Header (Picture 2) and Sidebar are completely hidden on first visit!
  if (currentView === 'landing') {
    return (
      <div className="min-h-screen flex flex-col transition-colors duration-300 relative bg-[#EDE9FE] dark:bg-[#0F172A] text-[#0F172A] dark:text-[#F8FAFC]">
        {/* Top Product Overview banner */}
        <div className="p-3 sm:px-6 max-w-7xl w-full mx-auto animate-fade-in">
          <div className="flex items-center justify-center p-3 rounded-2xl bg-gradient-to-r from-[#7C3AED] via-[#6D28D9] to-[#7C3AED] text-white shadow-md">
            <div className="flex items-center gap-2 text-xs font-bold">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Syllabus 3D • Public Product Overview & Feature Showcase</span>
            </div>
          </div>
        </div>

        <Suspense fallback={<InitialAuthLoading />}>
          <LandingPage
            onGetStarted={() => {
              soundManager.playClick();
              try {
                localStorage.setItem('syllabus3d_has_visited', 'true');
              } catch {}
              if (!isAuthenticated) {
                setAuthView('signup');
                setCurrentView('overview');
              } else {
                handleNavigate('overview');
              }
            }}
            onLogin={() => {
              soundManager.playClick();
              try {
                localStorage.setItem('syllabus3d_has_visited', 'true');
              } catch {}
              if (!isAuthenticated) {
                setAuthView('login');
                setCurrentView('overview');
              } else {
                handleNavigate('overview');
              }
            }}
          />
        </Suspense>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <AuthLayout onBackToLanding={() => setCurrentView('landing')} authView={authView}>
        {authView === 'login' && <LoginView />}
        {authView === 'signup' && <SignUpView />}
        {authView === 'forgot_password' && <ForgotPasswordView />}
      </AuthLayout>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 relative bg-[#F8FAFC] dark:bg-[#090A12] warm-cream:bg-[#FAEED9] text-slate-900 dark:text-[#F8FAFC] warm-cream:text-[#38370D] ${
      currentView === 'overview' ? 'h-screen overflow-hidden' : ''
    }`}>
      {/* 🌑 Clean Obsidian Ambient Canvas (Dark Mode, GPU-Accelerated) */}
      <div className="hidden dark:block fixed inset-0 pointer-events-none z-0 overflow-hidden select-none print:hidden bg-[#090A12]">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-purple-500/[0.07] via-blue-500/[0.04] to-transparent rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -left-48 w-[500px] h-[500px] bg-cyan-500/[0.03] rounded-full blur-[160px]" />
      </div>

      {/* ☀️ Pristine Atmospheric Ambient Mesh (Light Mode Only, GPU-Accelerated) */}
      <div className="block dark:hidden warm-cream:hidden fixed inset-0 pointer-events-none z-0 overflow-hidden select-none print:hidden bg-[#F8FAFC]">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-indigo-500/[0.04] via-purple-500/[0.02] to-transparent rounded-full blur-[140px]" />
      </div>

      {/* 📜 Royal Warm Parchment Ambient Canvas (Warm Cream Mode, GPU-Accelerated) */}
      <div className="hidden warm-cream:block fixed inset-0 pointer-events-none z-0 overflow-hidden select-none print:hidden bg-[#FAEED9]">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-amber-500/[0.14] via-[#8D7A02]/[0.08] to-transparent rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -left-48 w-[500px] h-[500px] bg-amber-500/[0.08] rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-[#E1A837]/[0.06] rounded-full blur-[140px]" />
      </div>

      {/* ♿ Skip to Main Content Link for Keyboard & Screen Reader Users */}
      <a href="#main-content" className="skip-link">
        Skip to main content (Press Enter)
      </a>

      {/* 3D Animated Startup Intro */}
      {showIntro && (
        <AnimatedLogoIntro onComplete={() => {
          try {
            localStorage.setItem('syllabus3d_intro_seen', '1');
          } catch {}
          setShowIntro(false);
        }} />
      )}

      {/* Desktop Sidebar Navigation */}
      <ViewErrorBoundary sectionName="Desktop Sidebar Navigation" onReset={() => window.location.reload()}>
        <Sidebar
          activeView={currentView}
          onSelectView={handleNavigate}
          onOpenAddTopic={() => handleOpenAddTopic()}
          onOpenAiArchitect={handleOpenAiArchitect}
          onOpenFocus={() => handleLaunchFocus(undefined)}
          onOpenShortcuts={() => setIsShortcutsOpen(true)}
          onOpenPricing={() => setIsPricingOpen(true)}
          onOpenNightJournal={() => setIsNightJournalOpen(true)}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={toggleDesktopSidebar}
        />
      </ViewErrorBoundary>

      {/* Mobile Drawer (Left Hamburger Sheet) */}
      <ViewErrorBoundary sectionName="Mobile Drawer Navigation" onReset={() => setIsMobileDrawerOpen(false)}>
        <MobileDrawer
          isOpen={isMobileDrawerOpen}
          onClose={() => setIsMobileDrawerOpen(false)}
          activeView={currentView}
          onSelectView={(view) => {
            setIsMobileDrawerOpen(false);
            handleNavigate(view);
          }}
          onOpenAddTopic={() => {
            setIsMobileDrawerOpen(false);
            handleOpenAddTopic();
          }}
          onOpenAiArchitect={() => {
            setIsMobileDrawerOpen(false);
            handleOpenAiArchitect();
          }}
          onOpenFocus={() => {
            setIsMobileDrawerOpen(false);
            handleLaunchFocus(undefined);
          }}
          onOpenNightJournal={() => {
            setIsMobileDrawerOpen(false);
            setIsNightJournalOpen(true);
          }}
          onOpenSearch={() => {
            setIsMobileDrawerOpen(false);
            setIsSearchOpen(true);
          }}
        />
      </ViewErrorBoundary>

      {/* Main Workspace Frame (Gemini-Style Smooth Width Transition) */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
        isSidebarCollapsed ? 'md:pl-[70px]' : 'md:pl-[260px]'
      }`}>
        <Header
          currentView={currentView}
          onNavigate={handleNavigate}
          onOpenFocusModal={() => handleLaunchFocus(undefined)}
          onOpenSearch={() => {
            setIsSearchOpen(true);
            window.history.pushState({ modal: 'search' }, '');
          }}
          onOpenSettings={() => handleNavigate('settings')}
          onOpenMobileMenu={() => setIsMobileDrawerOpen(true)}
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleDesktopSidebar={toggleDesktopSidebar}
        />

        <main
          id="main-content"
          tabIndex={-1}
          onTouchStart={handleMainTouchStart}
          onTouchMove={handleMainTouchMove}
          onTouchEnd={handleMainTouchEnd}
          className={`flex-1 w-full touch-pan-y overscroll-contain focus:outline-none ${
            currentView === 'overview'
              ? 'p-3 sm:p-4 md:px-6 md:pt-4 md:pb-2 overflow-y-auto no-scrollbar'
              : 'p-3 sm:p-4 md:px-6 md:py-5 pb-24 md:pb-10'
          }`}
        >
          <div className="w-full relative">
            {/* Initial Dashboard View (Instant, Non-Lazy, Preserved in DOM) */}
            <div className={currentView === 'overview' ? 'block animate-view-fade' : 'hidden'}>
              <ViewErrorBoundary sectionName="Overview Dashboard" onNavigateHome={() => handleNavigate('overview')}>
                <OverviewView
                  onNavigate={handleNavigate}
                  onNavigateToSubject={handleNavigateToSubject}
                  onOpenTopicDrawer={handleOpenTopicDrawer}
                  onOpenRevisionSession={() => {
                    setIsRevisionSessionOpen(true);
                    window.history.pushState({ modal: 'revision' }, '');
                  }}
                  onOpenAddTopic={() => handleOpenAddTopic()}
                  onOpenFocus={() => handleLaunchFocus(undefined)}
                  onOpenWalkAndRevise={handleOpenWalkAndRevise}
                  onOpenBacklogRescue={handleOpenBacklogRescue}
                  onOpenPricing={() => setIsPricingOpen(true)}
                />
              </ViewErrorBoundary>
            </div>

            {/* Lazy-Loaded Secondary Views with Suspense Fallback & Per-View Crash Protection */}
            <Suspense fallback={<ViewLoadingFallback />}>
              {visitedViews.has('targets') && (
                <div className={currentView === 'targets' ? 'block animate-view-fade' : 'hidden'}>
                  <ViewErrorBoundary sectionName="Top 3 Daily Targets" showHomeButton onNavigateHome={() => handleNavigate('overview')}>
                    <DailyTargetsView
                      onOpenTopicDrawer={handleOpenTopicDrawer}
                      onOpenFocus={handleLaunchFocus}
                      onNavigate={handleNavigate}
                      onOpenNightJournal={() => setIsNightJournalOpen(true)}
                      onOpenHistory={() => setIsReflectionHistoryOpen(true)}
                    />
                  </ViewErrorBoundary>
                </div>
              )}

              {(visitedViews.has('planner') || visitedViews.has('routine')) && (
                <div className={(currentView === 'planner' || currentView === 'routine') ? 'block animate-view-fade' : 'hidden'}>
                  <ViewErrorBoundary sectionName={currentView === 'routine' ? "Daily Routine" : "Study Planner"} showHomeButton onNavigateHome={() => handleNavigate('overview')}>
                    <PlannerView
                      initialTab={currentView === 'routine' ? 'routine' : 'kanban'}
                      onOpenFocusChamber={handleLaunchFocus}
                      onOpenTopicDrawer={handleOpenTopicDrawer}
                      onOpenBacklogRescue={handleOpenBacklogRescue}
                    />
                  </ViewErrorBoundary>
                </div>
              )}

              {visitedViews.has('mindmap') && (
                <div className={currentView === 'mindmap' ? 'block animate-view-fade' : 'hidden'}>
                  <ViewErrorBoundary sectionName="Syllabus Mindmap" showHomeButton onNavigateHome={() => handleNavigate('overview')}>
                    <MindMapView onOpenTopicDrawer={handleOpenTopicDrawer} />
                  </ViewErrorBoundary>
                </div>
              )}

              {visitedViews.has('syllabus') && (
                <div className={currentView === 'syllabus' ? 'block animate-view-fade' : 'hidden'}>
                  <ViewErrorBoundary sectionName="Syllabus Browser" showHomeButton onNavigateHome={() => handleNavigate('overview')}>
                    <SyllabusView
                      onOpenTopicDrawer={handleOpenTopicDrawer}
                      onOpenAddTopic={handleOpenAddTopic}
                      onOpenAiArchitect={handleOpenAiArchitect}
                      initialSubjectId={targetSubjectId}
                      onSelectSubjectId={setTargetSubjectId}
                      onBackToDashboard={() => handleNavigate('overview')}
                      onRegisterBackHandler={(handler) => {
                        syllabusBackHandlerRef.current = handler;
                      }}
                    />
                  </ViewErrorBoundary>
                </div>
              )}

              {visitedViews.has('subjects') && (
                <div className={currentView === 'subjects' ? 'block animate-view-fade' : 'hidden'}>
                  <ViewErrorBoundary sectionName="Subjects Directory" showHomeButton onNavigateHome={() => handleNavigate('overview')}>
                    <SubjectsView
                      onNavigate={handleNavigate}
                      onOpenTopicDrawer={handleOpenTopicDrawer}
                      onNavigateToSubject={handleNavigateToSubject}
                    />
                  </ViewErrorBoundary>
                </div>
              )}

              {visitedViews.has('revision') && (
                <div className={currentView === 'revision' ? 'block animate-view-fade' : 'hidden'}>
                  <ViewErrorBoundary sectionName="Revision Hub" showHomeButton onNavigateHome={() => handleNavigate('overview')}>
                    <RevisionView
                      onOpenRevisionSession={() => {
                        setIsRevisionSessionOpen(true);
                        window.history.pushState({ modal: 'revision' }, '');
                      }}
                      onOpenWalkAndRevise={handleOpenWalkAndRevise}
                      onOpenTopicDrawer={handleOpenTopicDrawer}
                      onOpenFocus={handleLaunchFocus}
                      onNavigate={handleNavigate}
                    />
                  </ViewErrorBoundary>
                </div>
              )}

              {visitedViews.has('weak') && (
                <div className={currentView === 'weak' ? 'block animate-view-fade' : 'hidden'}>
                  <ViewErrorBoundary sectionName="Weak Traps Diagnostic" showHomeButton onNavigateHome={() => handleNavigate('overview')}>
                    <WeakTopicsView
                      onOpenTopicDrawer={handleOpenTopicDrawer}
                      onOpenFocus={handleLaunchFocus}
                      onNavigate={handleNavigate}
                    />
                  </ViewErrorBoundary>
                </div>
              )}

              {visitedViews.has('analytics') && (
                <div className={currentView === 'analytics' ? 'block animate-view-fade' : 'hidden'}>
                  <ViewErrorBoundary sectionName="Study Analytics" showHomeButton onNavigateHome={() => handleNavigate('overview')}>
                    <AnalyticsView />
                  </ViewErrorBoundary>
                </div>
              )}

              {visitedViews.has('heatmap') && (
                <div className={currentView === 'heatmap' ? 'block animate-view-fade' : 'hidden'}>
                  <ViewErrorBoundary sectionName="Consistency Heatmap" showHomeButton onNavigateHome={() => handleNavigate('overview')}>
                    <HeatmapView />
                  </ViewErrorBoundary>
                </div>
              )}

              {visitedViews.has('platforms') && (
                <div className={currentView === 'platforms' ? 'block animate-view-fade' : 'hidden'}>
                  <ViewErrorBoundary sectionName="Learning Resources" showHomeButton onNavigateHome={() => handleNavigate('overview')}>
                    <PlatformsView />
                  </ViewErrorBoundary>
                </div>
              )}

              {visitedViews.has('pacing') && (
                <div className={currentView === 'pacing' ? 'block animate-view-fade' : 'hidden'}>
                  <ViewErrorBoundary sectionName="Target Pacing & Forecast" showHomeButton onNavigateHome={() => handleNavigate('overview')}>
                    <PacingView
                      onNavigate={handleNavigate}
                      onNavigateToSubject={handleNavigateToSubject}
                    />
                  </ViewErrorBoundary>
                </div>
              )}

              {visitedViews.has('youtube-notes') && (
                <div className={currentView === 'youtube-notes' ? 'block animate-view-fade' : 'hidden'}>
                  <ViewErrorBoundary sectionName="AI YouTube Notes" showHomeButton onNavigateHome={() => handleNavigate('overview')}>
                    <YouTubeNotesView
                      onNavigateToSubject={handleNavigateToSubject}
                      onOpenTopicDrawer={handleOpenTopicDrawer}
                    />
                  </ViewErrorBoundary>
                </div>
              )}

              {visitedViews.has('mock-tracker') && (
                <div className={currentView === 'mock-tracker' ? 'block animate-view-fade' : 'hidden'}>
                  <ViewErrorBoundary sectionName="Mock Test Tracker" showHomeButton onNavigateHome={() => handleNavigate('overview')}>
                    <MockTrackerView />
                  </ViewErrorBoundary>
                </div>
              )}

              {Boolean(
                visitedViews.has('study-tools') ||
                visitedViews.has('study-tools-vocab') ||
                visitedViews.has('study-tools-vocab-ssc') ||
                visitedViews.has('study-tools-maths') ||
                visitedViews.has('study-tools-calc-booster') ||
                visitedViews.has('study-tools-ga')
              ) && (
                <div className={
                  (currentView === 'study-tools' ||
                   currentView === 'study-tools-vocab' ||
                   currentView === 'study-tools-vocab-ssc' ||
                   currentView === 'study-tools-maths' ||
                   currentView === 'study-tools-calc-booster' ||
                   currentView === 'study-tools-ga')
                    ? 'block animate-view-fade'
                    : 'hidden'
                }>
                  <ViewErrorBoundary sectionName="Study Tools" showHomeButton onNavigateHome={() => handleNavigate('overview')}>
                    <StudyToolsView
                      initialTab={
                        currentView === 'study-tools-vocab' || currentView === 'study-tools-vocab-ssc'
                          ? 'vocab'
                          : currentView === 'study-tools-maths' || currentView === 'study-tools-calc-booster'
                          ? 'maths'
                          : currentView === 'study-tools-ga'
                          ? 'ga'
                          : 'vocab'
                      }
                      initialVocabTab={
                        currentView === 'study-tools-vocab-ssc'
                          ? 'ssc-special'
                          : 'core'
                      }
                      initialMathsTab={
                        currentView === 'study-tools-calc-booster'
                          ? 'calc-booster'
                          : 'overview'
                      }
                      onNavigate={handleNavigate}
                    />
                  </ViewErrorBoundary>
                </div>
              )}

              {visitedViews.has('settings') && (
                <div className={currentView === 'settings' ? 'block animate-view-fade' : 'hidden'}>
                  <ViewErrorBoundary sectionName="App Settings" showHomeButton onNavigateHome={() => handleNavigate('overview')}>
                    <SettingsView onOpenPricing={() => setIsPricingOpen(true)} />
                  </ViewErrorBoundary>
                </div>
              )}
            </Suspense>
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav
        activeView={currentView}
        onSelectView={handleNavigate}
        onOpenAddTopic={() => handleOpenAddTopic()}
        onOpenFocus={() => handleLaunchFocus(undefined)}
        onOpenMobileMenu={() => setIsMobileDrawerOpen(true)}
      />

      {/* Real-Time Network Offline Status Indicator */}
      <OfflineStatusIndicator />

      {/* Floating Smart PWA Install Banner */}
      <PWAInstallBanner />

      {/* Floating Background Timer Overlay */}
      <FloatingTimerOverlay />

      {/* Lazy Loaded Heavy Modals & Drawers with Crash Isolation */}
      <Suspense fallback={null}>
        <FloatingTimerPermissionModal />

        {isFullModalOpen && (
          <ViewErrorBoundary sectionName="Pomodoro Focus Chamber" onReset={closeFullModal}>
            <PomodoroFocusModal
              isOpen={isFullModalOpen}
              onClose={closeFullModal}
              defaultTopicId={focusTopicId || selectedTopic?.topic.id}
            />
          </ViewErrorBoundary>
        )}

        {selectedTopic && (
          <ViewErrorBoundary sectionName="Topic Details Drawer" onReset={handleCloseTopicDrawer}>
            <TopicDetailDrawer
              topic={selectedTopic.topic}
              subjectName={selectedTopic.subjectName}
              chapterName={selectedTopic.chapterName}
              onClose={handleCloseTopicDrawer}
            />
          </ViewErrorBoundary>
        )}

        {isSearchOpen && (
          <ViewErrorBoundary sectionName="Search Palette" onReset={() => setIsSearchOpen(false)}>
            <CommandSearchModal
              isOpen={isSearchOpen}
              onClose={() => setIsSearchOpen(false)}
              onSelectTopic={(topic, subjectName, chapterName) => handleOpenTopicDrawer(topic, subjectName || '', chapterName || '')}
            />
          </ViewErrorBoundary>
        )}

        {isAddTopicOpen && (
          <ViewErrorBoundary sectionName="Add Topic Modal" onReset={handleCloseAddTopic}>
            <AddTopicModal
              isOpen={isAddTopicOpen}
              onClose={handleCloseAddTopic}
              onOpenAiArchitect={handleOpenAiArchitect}
              initialSubjectId={addTopicTarget?.subjectId}
              initialChapterId={addTopicTarget?.chapterId}
            />
          </ViewErrorBoundary>
        )}

        {isAiArchitectOpen && (
          <ViewErrorBoundary sectionName="AI Syllabus Architect Modal" onReset={handleCloseAiArchitect}>
            <AiSyllabusArchitectModal
              isOpen={isAiArchitectOpen}
              onClose={handleCloseAiArchitect}
            />
          </ViewErrorBoundary>
        )}

        {isRevisionSessionOpen && (
          <ViewErrorBoundary sectionName="Revision Session Modal" onReset={() => setIsRevisionSessionOpen(false)}>
            <RevisionSessionModal
              isOpen={isRevisionSessionOpen}
              onClose={() => setIsRevisionSessionOpen(false)}
              onOpenTopic={handleOpenTopicDrawer}
            />
          </ViewErrorBoundary>
        )}

        {isWalkAndReviseOpen && (
          <ViewErrorBoundary sectionName="Walk & Revise Audio Player" onReset={handleCloseWalkAndRevise}>
            <WalkAndReviseModal
              isOpen={isWalkAndReviseOpen}
              onClose={handleCloseWalkAndRevise}
            />
          </ViewErrorBoundary>
        )}

        {isBacklogRescueOpen && (
          <ViewErrorBoundary sectionName="Smart Backlog Rescue Modal" onReset={handleCloseBacklogRescue}>
            <SmartBacklogRescueModal
              isOpen={isBacklogRescueOpen}
              onClose={handleCloseBacklogRescue}
              onNavigateToPlanner={() => {
                handleCloseBacklogRescue();
                handleNavigate('planner');
              }}
            />
          </ViewErrorBoundary>
        )}

        {isShortcutsOpen && (
          <ViewErrorBoundary sectionName="Keyboard Shortcuts Modal" onReset={() => setIsShortcutsOpen(false)}>
            <KeyboardShortcutsModal
              isOpen={isShortcutsOpen}
              onClose={() => setIsShortcutsOpen(false)}
              onNavigate={handleNavigate}
              onOpenSearch={() => {
                setIsShortcutsOpen(false);
                setTimeout(() => setIsSearchOpen(true), 50);
              }}
              onOpenAddTopic={() => {
                setIsShortcutsOpen(false);
                setTimeout(() => handleOpenAddTopic(), 50);
              }}
              onOpenFocus={() => {
                setIsShortcutsOpen(false);
                setTimeout(() => handleLaunchFocus(undefined), 50);
              }}
              onToggleTheme={toggleTheme}
              onTriggerPrint={() => {
                setIsShortcutsOpen(false);
                setTimeout(() => window.print(), 100);
              }}
            />
          </ViewErrorBoundary>
        )}
        {isPricingOpen && (
          <ViewErrorBoundary sectionName="Pricing Subscription Modal" onReset={() => setIsPricingOpen(false)}>
            <PricingSubscriptionModal
              isOpen={isPricingOpen}
              onClose={() => setIsPricingOpen(false)}
            />
          </ViewErrorBoundary>
        )}
        {isNightJournalOpen && (
          <ViewErrorBoundary sectionName="Night Reflection Journal Modal" onReset={() => setIsNightJournalOpen(false)}>
            <DailyReflectionModal
              isOpen={isNightJournalOpen}
              onClose={() => setIsNightJournalOpen(false)}
              onOpenHistory={() => {
                setIsNightJournalOpen(false);
                setIsReflectionHistoryOpen(true);
              }}
            />
          </ViewErrorBoundary>
        )}
        {isReflectionHistoryOpen && (
          <ViewErrorBoundary sectionName="Reflection History Modal" onReset={() => setIsReflectionHistoryOpen(false)}>
            <ReflectionHistoryModal
              isOpen={isReflectionHistoryOpen}
              onClose={() => setIsReflectionHistoryOpen(false)}
              onOpenNewReflection={() => {
                setIsReflectionHistoryOpen(false);
                setIsNightJournalOpen(true);
              }}
            />
          </ViewErrorBoundary>
        )}
      </Suspense>

      {/* ⚡ Power User Keyboard Shortcut Toast Banner (Web / Desktop Only) */}
      {shortcutToast && (
        <div
          role="status"
          aria-live="polite"
          className="hidden md:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-[120] px-4 py-2 rounded-2xl bg-[#0F172A]/90 dark:bg-[#1E293B]/95 text-white border border-[#334155]/60 dark:border-[#334155] shadow-2xl backdrop-blur-md items-center gap-2.5 animate-fade-in pointer-events-none select-none"
        >
          <div className="w-5 h-5 rounded-lg bg-[#7C3AED]/25 dark:bg-[#A78BFA]/25 text-[#22D3EE] dark:text-[#A78BFA] flex items-center justify-center font-bold text-xs">
            ⌨️
          </div>
          <span className="text-xs sm:text-[13px] font-bold tracking-tight">
            {shortcutToast}
          </span>
        </div>
      )}

      {/* 🔒 Safety PIN Lock Screen Fullscreen Guard */}
      <PinLockScreen />
    </div>
  );
};
