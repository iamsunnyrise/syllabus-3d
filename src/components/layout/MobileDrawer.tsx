import React, { useRef, useState, useEffect } from 'react';
import {
  X,
  Target,
  LayoutDashboard,
  CalendarCheck,
  BrainCircuit,
  BookOpen,
  RotateCw,
  AlertTriangle,
  Settings,
  Plus,
  Globe,
  ShieldCheck,
  Timer,
  ChevronRight,
  GraduationCap,
  Clock,
  Sparkles,
  Video,
  Smartphone,
  Download,
  Home,
  User,
  LogOut,
  Gauge,
  BarChart3
} from 'lucide-react';
import { AppView } from './Sidebar';
import { useSyllabus } from '../../context/SyllabusContext';
import { useAuth } from '../../context/AuthContext';
import { usePWA } from '../../hooks/usePWA';
import { soundManager } from '../../utils/soundEffects';
import { haptics } from '../../utils/haptics';
import { SectionBadgeIcon } from '../common/SectionBadgeIcon';
import { BrandEmblemLogo } from '../common/BrandEmblemLogo';
import { preloadView } from '../../utils/viewPreloader';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeView: AppView;
  onSelectView: (view: AppView) => void;
  onOpenAddTopic?: () => void;
  onOpenAiArchitect?: () => void;
  onOpenFocus?: () => void;
  onOpenNightJournal?: () => void;
  onOpenSearch?: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  activeView,
  onSelectView,
  onOpenAddTopic,
  onOpenAiArchitect,
  onOpenFocus,
  onOpenNightJournal: _onOpenNightJournal,
  onOpenSearch
}) => {
  const { dueRevisions, weakTopics, plannerTasks, platforms, currentExam, profile, top3Targets } = useSyllabus();
  const { user, logout } = useAuth();
  const { isInstallable, isInstalled, triggerInstall } = usePWA();

  // 🛡️ Comprehensive Defensive Guards (Prevent any null/undefined crash)
  const profileSafe = profile || {
    name: 'Aspirant',
    level: 1,
    levelTitle: 'Novice Scholar',
    avatarColor: 'from-blue-600 to-indigo-600',
    avatarUrl: '',
    avatarEmoji: '🦁'
  };
  const plannerTasksSafe = Array.isArray(plannerTasks) ? plannerTasks : [];
  const dueRevisionsSafe = Array.isArray(dueRevisions) ? dueRevisions : [];
  const weakTopicsSafe = Array.isArray(weakTopics) ? weakTopics : [];
  const platformsSafe = Array.isArray(platforms) ? platforms : [];
  const top3TargetsSafe = Array.isArray(top3Targets) ? top3Targets : [];
  const completedTargets = top3TargetsSafe.filter(t => t.text && t.text.trim() && t.completed);

  // Mobile Swipe-to-Dismiss Drawer Gesture State (Direction-Aware & Jitter-Free)
  const drawerTouchStartX = useRef<number | null>(null);
  const drawerTouchStartY = useRef<number | null>(null);
  const isHorizontalDrawerSwipe = useRef<boolean | null>(null);
  const [drawerDragX, setDrawerDragX] = useState(0);

  const handleDrawerTouchStart = (e: React.TouchEvent) => {
    drawerTouchStartX.current = e.touches[0].clientX;
    drawerTouchStartY.current = e.touches[0].clientY;
    isHorizontalDrawerSwipe.current = null;
  };

  const handleDrawerTouchMove = (e: React.TouchEvent) => {
    if (drawerTouchStartX.current === null || drawerTouchStartY.current === null) return;

    const diffX = e.touches[0].clientX - drawerTouchStartX.current;
    const diffY = e.touches[0].clientY - drawerTouchStartY.current;

    // Detect direction intent once moved past a small threshold
    if (isHorizontalDrawerSwipe.current === null) {
      if (Math.abs(diffX) > 10 || Math.abs(diffY) > 10) {
        // Only trigger horizontal drawer drag if user is predominantly swiping left
        if (diffX < 0 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
          isHorizontalDrawerSwipe.current = true;
        } else {
          isHorizontalDrawerSwipe.current = false;
        }
      }
    }

    if (isHorizontalDrawerSwipe.current === true && diffX < 0) {
      setDrawerDragX(diffX);
    }
  };

  const handleDrawerTouchEnd = () => {
    if (isHorizontalDrawerSwipe.current === true && drawerDragX < -75) {
      soundManager.playClick();
      haptics.light();
      onClose();
    }
    setDrawerDragX(0);
    drawerTouchStartX.current = null;
    drawerTouchStartY.current = null;
    isHorizontalDrawerSwipe.current = null;
  };

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

  if (!isOpen) return null;

  const todayTasksCount = plannerTasksSafe.filter(t => t.status === 'today').length;

  const sections = [
    {
      title: 'TESTS',
      items: [
        {
          id: 'syllabus' as AppView,
          label: 'Syllabus Explorer',
          icon: BookOpen,
          badge: null,
          badgeStyle: '',
          iconBg: 'bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30'
        },
        {
          id: 'revision' as AppView,
          label: 'Spaced Revision',
          icon: RotateCw,
          badge: dueRevisionsSafe.length > 0 ? `${dueRevisionsSafe.length}` : null,
          badgeStyle: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30 font-bold',
          iconBg: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30'
        },
        {
          id: 'weak' as AppView,
          label: 'Weak Topics',
          icon: AlertTriangle,
          badge: weakTopicsSafe.length > 0 ? `${weakTopicsSafe.length}` : null,
          badgeStyle: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30 font-bold',
          iconBg: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30'
        }
      ]
    },
    {
      title: 'MY ACCOUNT',
      items: [
        {
          id: 'settings' as AppView,
          label: 'My profile',
          icon: User,
          badge: null,
          badgeStyle: '',
          iconBg: 'bg-slate-500/15 text-slate-600 dark:text-slate-300 border-slate-500/30'
        },
        {
          id: 'study-tools' as AppView,
          label: 'Study Tools (Vocab, Maths, GA)',
          icon: Sparkles,
          badge: null,
          badgeStyle: '',
          iconBg: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30'
        },
        {
          id: 'pacing' as AppView,
          label: 'Target Pacing',
          icon: Gauge,
          badge: null,
          badgeStyle: '',
          iconBg: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
        },
        {
          id: 'analytics' as AppView,
          label: 'Analytics',
          icon: BarChart3,
          badge: null,
          badgeStyle: '',
          iconBg: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30'
        },
        {
          id: 'study-prompts' as AppView,
          label: 'Study Prompts',
          icon: Sparkles,
          badge: 'AI',
          badgeStyle: 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30 font-bold',
          iconBg: 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30'
        },
        {
          id: 'mindmap' as AppView,
          label: 'Mindmap',
          icon: BrainCircuit,
          badge: null,
          badgeStyle: '',
          iconBg: 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30'
        },
        {
          id: 'platforms' as AppView,
          label: 'Study Platforms',
          icon: Globe,
          badge: platformsSafe.length > 0 ? `${platformsSafe.length}` : null,
          badgeStyle: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30 font-bold',
          iconBg: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30'
        }
      ]
    }
  ];

  return (
    <div className="md:hidden fixed inset-0 z-50 flex">
      {/* Smooth Backdrop with Click-to-Dismiss */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-md animate-fade-in transition-opacity"
      />

      {/* Drawer Sheet with Native Direction-Aware Swipe-Left Dismiss */}
      <div
        onTouchStart={handleDrawerTouchStart}
        onTouchMove={handleDrawerTouchMove}
        onTouchEnd={handleDrawerTouchEnd}
        onTouchCancel={handleDrawerTouchEnd}
        style={{
          transform: drawerDragX < 0 ? `translateX(${drawerDragX}px)` : undefined,
          transition: drawerDragX === 0 ? 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none'
        }}
        className="relative w-[85%] max-w-[310px] bg-[#FFFDF8] dark:bg-[#0E101B] border-r border-[#E2D1B3] dark:border-white/[0.08] flex flex-col justify-between z-10 shadow-[0_0_50px_rgba(0,0,0,0.55)] animate-slide-right overflow-y-auto overscroll-contain no-scrollbar"
      >
        <div className="p-3 space-y-2.5 pt-[max(0.75rem,env(safe-area-inset-top,0px))] pl-[max(0.75rem,env(safe-area-inset-left,0px))] pr-3">
          
          {/* 1. BRANDING & EXAM TARGET HEADER (Compact & Crisp) */}
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/80 dark:border-white/[0.08]">
            <div className="flex items-center gap-2 min-w-0">
              <BrandEmblemLogo size="sm" />
              <div className="min-w-0">
                <span className="text-xs font-black tracking-tight text-slate-900 dark:text-white uppercase font-serif block leading-none">
                  SYLLABUS 3D
                </span>
                <p className="text-[10px] font-bold text-amber-600 dark:text-amber-400 font-mono tracking-wider truncate mt-0.5">
                  {currentExam?.name || 'SSC CGL 2026'}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                soundManager.playClick();
                haptics.light();
                onClose();
              }}
              className="w-7 h-7 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 border border-slate-200/80 dark:border-white/10 flex items-center justify-center transition-all cursor-pointer active:scale-90 shrink-0"
              title="Close Navigation Drawer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 1.5 USER PROFILE CARD (Compact & High Contrast) */}
          <div className="px-2.5 py-1.5 rounded-xl bg-slate-50/90 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0 overflow-hidden font-bold text-xs border border-slate-300/60 dark:border-white/15">
                {profileSafe.avatarUrl ? (
                  <img src={profileSafe.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : profileSafe.avatarEmoji ? (
                  <span className="text-sm">{profileSafe.avatarEmoji}</span>
                ) : (
                  <User className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                )}
              </div>
              <div className="truncate min-w-0">
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate leading-tight">
                  {user?.name || profileSafe.name || 'Scholar'}
                </p>
                <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 truncate leading-none mt-0.5">
                  Signed in
                </p>
              </div>
            </div>
          </div>

          {/* 1.6 HOME & TOP 3 TARGETS (Compact Side-by-Side Grid) */}
          <div className="grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onMouseEnter={() => preloadView('overview')}
              onTouchStart={() => preloadView('overview')}
              onClick={() => {
                soundManager.playClick();
                onSelectView('overview');
                onClose();
              }}
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs transition-all duration-150 cursor-pointer select-none font-bold ${
                activeView === 'overview'
                  ? 'bg-[#FFF4D2] text-[#8C6B00] border border-[#FDE68A] shadow-xs dark:bg-[#F59E0B]/20 dark:text-[#FCD34D] dark:border-[#F59E0B]/30'
                  : 'text-slate-700 dark:text-slate-300 bg-slate-50/60 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/[0.06]'
              }`}
            >
              <Home className="w-3.5 h-3.5 stroke-[2.2] text-amber-600 dark:text-amber-400 shrink-0" />
              <span className="truncate">Home</span>
            </button>

            <button
              type="button"
              onMouseEnter={() => preloadView('targets')}
              onTouchStart={() => preloadView('targets')}
              onClick={() => {
                soundManager.playClick();
                onSelectView('targets');
                onClose();
              }}
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs transition-all duration-150 cursor-pointer select-none font-bold ${
                activeView === 'targets'
                  ? 'bg-[#FFF4D2] text-[#8C6B00] border border-[#FDE68A] shadow-xs dark:bg-[#F59E0B]/20 dark:text-[#FCD34D] dark:border-[#F59E0B]/30'
                  : 'text-slate-700 dark:text-slate-300 bg-slate-50/60 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/[0.06]'
              }`}
            >
              <Target className="w-3.5 h-3.5 stroke-[2.2] text-amber-500 shrink-0" />
              <span className="truncate">3 Targets</span>
            </button>
          </div>

          {/* 2. ACTION BUTTONS: COMPACT & CLEAN */}
          <div className="space-y-1.5 pt-0.5">
            {onOpenAiArchitect && (
              <button
                onClick={() => {
                  soundManager.playClick();
                  haptics.light();
                  onClose();
                  onOpenAiArchitect();
                }}
                className="w-full py-2 px-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 dark:from-blue-600 dark:via-indigo-600 dark:to-purple-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs active:scale-95 transition-all cursor-pointer border border-white/20 tap-bounce"
              >
                <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>AI Syllabus Architect</span>
              </button>
            )}

            <div className="grid grid-cols-2 gap-1.5">
              {onOpenAddTopic && (
                <button
                  onClick={() => {
                    soundManager.playClick();
                    haptics.light();
                    onClose();
                    onOpenAddTopic();
                  }}
                  className="py-1.5 px-2.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-blue-700 dark:from-[#7AA2F7] dark:to-[#5B8BF5] text-white dark:text-[#0B0B0D] font-bold text-xs flex items-center justify-center gap-1 shadow-xs active:scale-95 transition-all cursor-pointer border border-white/10 tap-bounce"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Add Target</span>
                </button>
              )}

              {onOpenFocus && (
                <button
                  onClick={() => {
                    soundManager.playClick();
                    haptics.light();
                    onClose();
                    onOpenFocus();
                  }}
                  className="py-1.5 px-2.5 rounded-xl bg-slate-50 dark:bg-[#131522] hover:bg-slate-100 dark:hover:bg-white/[0.08] text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1 shadow-xs border border-slate-200/80 dark:border-white/[0.08] active:scale-95 transition-all cursor-pointer tap-bounce"
                >
                  <Timer className="w-3.5 h-3.5 text-[#C49A3A]" />
                  <span>Focus Mode</span>
                </button>
              )}
            </div>
          </div>

          {/* 3. GROUPED NAVIGATION SECTIONS (Unified Card Wells for Maximum Cleanliness) */}
          <div className="space-y-2.5 pt-0.5">
            {sections.map(sec => (
              <div key={sec.title} className="space-y-1">
                <div className="flex items-center gap-1.5 px-1">
                  <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    {sec.title}
                  </h5>
                </div>

                <div className="rounded-xl bg-slate-50/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.07] overflow-hidden divide-y divide-slate-200/60 dark:divide-white/[0.04]">
                  {sec.items.map(item => {
                    const isActive = activeView === item.id;
                    return (
                      <button
                        key={item.id}
                        onMouseEnter={() => preloadView(item.id)}
                        onTouchStart={() => preloadView(item.id)}
                        onClick={() => {
                          soundManager.playClick();
                          haptics.light();
                          onSelectView(item.id);
                          onClose();
                        }}
                        aria-current={isActive ? 'page' : undefined}
                        className={`w-full min-h-[36px] flex items-center justify-between px-2.5 py-1.5 text-xs transition-colors cursor-pointer group select-none ${
                          isActive
                            ? 'bg-amber-500/15 dark:bg-amber-500/20 text-amber-900 dark:text-amber-300 font-bold'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-white/[0.06] active:bg-slate-200/60 dark:active:bg-white/[0.1]'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0 flex-1 pr-1.5">
                          {/* Compact squircle icon badge */}
                          <SectionBadgeIcon
                            section={item.id}
                            size="sm"
                            isActive={isActive}
                          />

                          {/* Clean Title */}
                          <span className="font-bold text-xs tracking-tight truncate text-slate-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
                            {item.label}
                          </span>
                        </div>

                        {/* Right Badge or Chevron */}
                        <div className="flex items-center gap-1 shrink-0">
                          {Boolean(item.badge) ? (
                            <span
                              className={`px-1.5 py-0.2 rounded-md text-[10px] font-mono font-bold border shadow-2xs ${item.badgeStyle}`}
                            >
                              {item.badge}
                            </span>
                          ) : (
                            <ChevronRight
                              className={`w-3 h-3 transition-transform group-hover:translate-x-0.5 ${
                                isActive ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400 dark:text-slate-500'
                              }`}
                            />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Logout Button */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onClose();
                  if (window.confirm('Are you sure you want to log out of your session?')) {
                    logout?.();
                  }
                }}
                className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/30 hover:bg-rose-100/80 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5 stroke-[2.2]" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* 5.5. INSTALL APP ON PHONE (PWA) */}
        {!isInstalled && (
          <div className="px-3 py-1.5 border-t border-slate-200/80 dark:border-white/[0.08] bg-slate-50/60 dark:bg-[#131522]/60">
            <button
              type="button"
              onMouseEnter={() => preloadView('settings')}
              onTouchStart={() => preloadView('settings')}
              onClick={async () => {
                soundManager.playClick();
                haptics.medium();
                if (isInstallable) {
                  const success = await triggerInstall();
                  if (success) onClose();
                } else {
                  onSelectView('settings');
                  onClose();
                }
              }}
              className="w-full flex items-center justify-between p-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 dark:from-blue-600 dark:via-indigo-600 dark:to-purple-600 text-white shadow-xs transition-all active:scale-[0.98] cursor-pointer group"
              title="Install App on Phone"
              aria-label="Install App on Phone"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/30">
                  <Smartphone className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="text-left min-w-0">
                  <div className="text-xs font-bold tracking-tight flex items-center gap-1 leading-tight">
                    <span>Install App on Phone</span>
                    <span className="px-1 py-0.2 rounded-full bg-white/20 text-[9px] font-mono leading-none">PWA</span>
                  </div>
                  <div className="text-[10px] text-amber-100/90 dark:text-blue-100/90 font-medium truncate">Offline ready & 1-tap open</div>
                </div>
              </div>
              <Download className="w-3.5 h-3.5 text-white group-hover:translate-y-0.5 transition-transform shrink-0 ml-1" />
            </button>
          </div>
        )}

        {/* 6. EXECUTIVE FOOTER WITH LIVE CLOUD RADAR */}
        <div className="py-2 px-3 pb-[max(0.6rem,env(safe-area-inset-bottom,0px))] border-t border-slate-200/80 dark:border-white/[0.08] bg-white/60 dark:bg-[#0E101B]/90 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 select-none">
          <span className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-bold text-slate-800 dark:text-slate-200">Cloud Synced</span>
          </span>

          <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
            <ShieldCheck className="w-3 h-3 text-emerald-500" />
            <span>v2.4.0 PRO</span>
          </span>
        </div>
      </div>
    </div>
  );
};

