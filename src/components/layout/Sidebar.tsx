import React, { useState, useEffect } from 'react';
import {
  Home,
  Target,
  RotateCw,
  BrainCircuit,
  BookOpen,
  Timer,
  Globe,
  Keyboard,
  PanelLeftClose,
  PanelLeftOpen,
  Sparkles,
  Video,
  ChevronDown,
  User,
  LogOut,
  Gauge,
  BarChart3,
  AlertTriangle,
  Trophy,
  ShoppingCart
} from 'lucide-react';
import { useSyllabus } from '../../context/SyllabusContext';
import { useAuth } from '../../context/AuthContext';
import { soundManager } from '../../utils/soundEffects';
import { haptics } from '../../utils/haptics';
import { BrandEmblemLogo } from '../common/BrandEmblemLogo';

export type AppView =
  | 'overview'
  | 'targets'
  | 'planner'
  | 'routine'
  | 'platforms'
  | 'syllabus'
  | 'subjects'
  | 'revision'
  | 'weak'
  | 'mindmap'
  | 'analytics'
  | 'heatmap'
  | 'pacing'
  | 'settings'
  | 'youtube-notes'
  | 'mock-tracker'
  | 'landing';

interface NavItem {
  id: AppView;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: React.ReactNode;
  badgeColor?: string;
  shortcut?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

interface SidebarProps {
  activeView: AppView;
  onSelectView: (view: AppView) => void;
  onOpenAddTopic?: () => void;
  onOpenAiArchitect?: () => void;
  onOpenFocus?: () => void;
  onOpenShortcuts?: () => void;
  onOpenPricing?: () => void;
  onOpenNightJournal?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onSelectView,
  onOpenAddTopic: _onOpenAddTopic,
  onOpenAiArchitect,
  onOpenFocus,
  onOpenShortcuts,
  onOpenPricing,
  onOpenNightJournal: _onOpenNightJournal,
  isCollapsed = false,
  onToggleCollapse
}) => {
  const { dueRevisions, weakTopics, currentExam } = useSyllabus();
  const { user, logout } = useAuth();

  const dueRevisionsSafe = Array.isArray(dueRevisions) ? dueRevisions : [];
  const weakTopicsSafe = Array.isArray(weakTopics) ? weakTopics : [];

  // Collapsible Groups State (Expanded mode only)
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('syllabus3d_sidebar_collapsed_sections');
        return saved ? JSON.parse(saved) : {};
      } catch {}
    }
    return {};
  });

  const toggleSection = (title: string) => {
    soundManager.playClick();
    haptics.selection();
    setCollapsedSections(prev => {
      const next = {
        ...prev,
        [title]: !prev[title]
      };
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('syllabus3d_sidebar_collapsed_sections', JSON.stringify(next));
        } catch {}
      }
      return next;
    });
  };

  // ⌨️ Power-User Keyboard Shortcuts (Alt+1 through Alt+6)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.isContentEditable
      ) {
        return;
      }

      if (e.altKey && ['1', '2', '3', '4', '5', '6'].includes(e.key)) {
        e.preventDefault();
        const shortcutMap: Record<string, AppView> = {
          '1': 'overview',
          '2': 'syllabus',
          '3': 'targets',
          '4': 'pacing',
          '5': 'youtube-notes',
          '6': 'mock-tracker'
        };
        const dest = shortcutMap[e.key];
        if (dest) {
          soundManager.playClick();
          haptics.light();
          onSelectView(dest);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSelectView]);

  // Structured Navigation Groups for Syllabus 3D
  const coreItems: NavItem[] = [
    {
      id: 'overview',
      label: 'Home',
      icon: Home,
      shortcut: '1'
    },
    {
      id: 'syllabus',
      label: 'Syllabus Explorer',
      icon: BookOpen,
      shortcut: '2'
    }
  ];

  const practiceItems: NavItem[] = [
    {
      id: 'targets',
      label: 'Daily Targets',
      icon: Target,
      shortcut: '3'
    },
    {
      id: 'revision',
      label: 'Spaced Revision',
      icon: RotateCw,
      badge: dueRevisionsSafe.length ? `${dueRevisionsSafe.length}` : null,
      badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
    },
    {
      id: 'weak',
      label: 'Weak Topics',
      icon: AlertTriangle,
      badge: weakTopicsSafe.length ? `${weakTopicsSafe.length}` : null,
      badgeColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
    },
    {
      id: 'mock-tracker',
      label: 'Mock Tracker',
      icon: Trophy,
      shortcut: '6'
    }
  ];

  const toolsItems: NavItem[] = [
    {
      id: 'pacing',
      label: 'Target Pacing',
      icon: Gauge,
      shortcut: '4'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3
    },
    {
      id: 'youtube-notes',
      label: 'YouTube Notes',
      icon: Video,
      shortcut: '5'
    },
    {
      id: 'mindmap',
      label: 'Mindmap',
      icon: BrainCircuit
    },
    {
      id: 'platforms',
      label: 'Study Platforms',
      icon: Globe
    }
  ];

  const navSections: NavSection[] = [
    {
      title: 'CORE',
      items: coreItems
    },
    {
      title: 'PRACTICE & TESTS',
      items: practiceItems
    },
    {
      title: 'STUDY TOOLS',
      items: toolsItems
    }
  ];

  return (
    <aside
      className={`hidden md:flex flex-col h-screen fixed top-0 left-0 bg-[#F8FAFC] dark:bg-[#090A12] text-slate-800 dark:text-slate-200 justify-between transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] z-40 select-none border-r border-slate-200/80 dark:border-white/[0.08] shadow-xs ${
        isCollapsed ? 'w-[70px]' : 'w-[260px]'
      }`}
    >
      {/* 🌟 Iconic Floating Sidebar Toggle Handle (Overlapping Right Border Only When Collapsed) */}
      {onToggleCollapse && isCollapsed && (
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            haptics.light();
            onToggleCollapse();
          }}
          className="absolute -right-3.5 top-7 -translate-y-1/2 z-50 w-7 h-7 rounded-full bg-white dark:bg-[#090A12] border border-slate-300 dark:border-white/20 text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 hover:border-amber-500/50 flex items-center justify-center shadow-md cursor-pointer hover:scale-110 active:scale-95 transition-all"
          title="Expand sidebar (Ctrl+B)"
          aria-label="Expand sidebar"
        >
          <PanelLeftOpen className="w-4 h-4 stroke-[2.2]" />
        </button>
      )}

      {/* =========================================================================
          STATE A: COLLAPSED SLIM ICON-ONLY SIDEBAR (70px Width)
          Matches the reference screenshot with circular logo, golden active pill,
          sleek outline icons, and coral-red logout at bottom.
          ========================================================================= */}
      {isCollapsed ? (
        <div className="flex flex-col h-full justify-between items-center w-full">
          {/* Top Section: Exactly h-14 (56px) baseline aligned with Header */}
          <div className="h-14 w-full flex items-center justify-center border-b border-slate-200/80 dark:border-white/[0.08] shrink-0">
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onSelectView('overview');
              }}
              className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500/20 via-amber-400/10 to-transparent border border-amber-500/30 flex items-center justify-center p-1 hover:scale-105 active:scale-95 transition-transform cursor-pointer shadow-sm group"
              title="Syllabus 3D Home"
              aria-label="Syllabus 3D Home"
            >
              <BrandEmblemLogo size="sm" />
            </button>
          </div>

          {/* Scrollable Middle Navigation Rail */}
          <div className="flex-1 py-3 px-2 overflow-y-auto no-scrollbar flex flex-col items-center space-y-2 w-full">
            {/* 1. Core Section (Home & Syllabus) */}
            {coreItems.map(item => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <div key={item.id} className="relative group flex items-center justify-center w-full">
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      onSelectView(item.id);
                    }}
                    className={`flex items-center justify-center transition-all duration-150 cursor-pointer select-none active:scale-95 ${
                      isActive
                        ? 'w-11 h-11 rounded-2xl bg-[#FFF4D2] text-[#8C6B00] border border-[#FDE68A] shadow-xs dark:bg-[#251E0E] dark:text-[#FBBF24] dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] font-bold'
                        : 'w-10 h-10 rounded-xl text-slate-500 dark:text-neutral-400 hover:bg-slate-200/60 dark:hover:bg-white/[0.06] hover:text-slate-900 dark:hover:text-white'
                    }`}
                    aria-label={item.label}
                  >
                    <Icon className="w-5 h-5 stroke-[2.2]" />
                  </button>

                  <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-xl bg-slate-900/95 dark:bg-[#181C30]/95 text-white text-xs font-bold whitespace-nowrap shadow-xl border border-slate-700/80 dark:border-white/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-150 z-50 flex items-center gap-1.5 backdrop-blur-md">
                    <span>{item.label}</span>
                    {item.shortcut && (
                      <span className="text-slate-400 font-mono text-[10px]">
                        Alt+{item.shortcut}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Divider */}
            <div className="w-7 h-px bg-slate-200/80 dark:bg-white/[0.08] my-1 shrink-0" />

            {/* 3. Practice & Routine Section (Targets, Revision, Weak, Mock) */}
            {practiceItems.map(item => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <div key={item.id} className="relative group flex items-center justify-center w-full">
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      onSelectView(item.id);
                    }}
                    className={`relative flex items-center justify-center transition-all duration-150 cursor-pointer select-none active:scale-95 ${
                      isActive
                        ? 'w-11 h-11 rounded-2xl bg-[#FFF4D2] text-[#8C6B00] border border-[#FDE68A] shadow-xs dark:bg-[#251E0E] dark:text-[#FBBF24] dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] font-bold'
                        : 'w-10 h-10 rounded-xl text-slate-500 dark:text-neutral-400 hover:bg-slate-200/60 dark:hover:bg-white/[0.06] hover:text-slate-900 dark:hover:text-white'
                    }`}
                    aria-label={item.label}
                  >
                    <Icon className="w-5 h-5 stroke-[2]" />
                    {item.badge && (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-[#090A12]" />
                    )}
                  </button>

                  <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-xl bg-slate-900/95 dark:bg-[#181C30]/95 text-white text-xs font-bold whitespace-nowrap shadow-xl border border-slate-700/80 dark:border-white/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-150 z-50 flex items-center gap-1.5 backdrop-blur-md">
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono">
                        {item.badge}
                      </span>
                    )}
                    {item.shortcut && (
                      <span className="text-slate-400 font-mono text-[10px]">
                        Alt+{item.shortcut}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Divider */}
            <div className="w-7 h-px bg-slate-200/80 dark:bg-white/[0.08] my-1 shrink-0" />

            {/* 4. Study Tools Section (Pacing, Analytics, YouTube, Mindmap, Platforms) */}
            {toolsItems.map(item => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <div key={item.id} className="relative group flex items-center justify-center w-full">
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      onSelectView(item.id);
                    }}
                    className={`flex items-center justify-center transition-all duration-150 cursor-pointer select-none active:scale-95 ${
                      isActive
                        ? 'w-11 h-11 rounded-2xl bg-[#FFF4D2] text-[#8C6B00] border border-[#FDE68A] shadow-xs dark:bg-[#251E0E] dark:text-[#FBBF24] dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] font-bold'
                        : 'w-10 h-10 rounded-xl text-slate-500 dark:text-neutral-400 hover:bg-slate-200/60 dark:hover:bg-white/[0.06] hover:text-slate-900 dark:hover:text-white'
                    }`}
                    aria-label={item.label}
                  >
                    <Icon className="w-5 h-5 stroke-[2]" />
                  </button>

                  <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-xl bg-slate-900/95 dark:bg-[#181C30]/95 text-white text-xs font-bold whitespace-nowrap shadow-xl border border-slate-700/80 dark:border-white/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-150 z-50 flex items-center gap-1.5 backdrop-blur-md">
                    <span>{item.label}</span>
                    {item.shortcut && (
                      <span className="text-slate-400 font-mono text-[10px]">
                        Alt+{item.shortcut}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Divider */}
            <div className="w-7 h-px bg-slate-200/80 dark:bg-white/[0.08] my-1 shrink-0" />

            {/* 5. Account & Utility Icons (Profile, Pricing, Shortcuts, AI Studio, Focus) */}
            <div className="relative group flex items-center justify-center w-full">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onSelectView('settings');
                }}
                className={`flex items-center justify-center transition-all duration-150 cursor-pointer select-none active:scale-95 ${
                  activeView === 'settings'
                    ? 'w-11 h-11 rounded-2xl bg-[#FFF4D2] text-[#8C6B00] border border-[#FDE68A] shadow-xs dark:bg-[#251E0E] dark:text-[#FBBF24] dark:border-amber-500/40 font-bold'
                    : 'w-10 h-10 rounded-xl text-slate-500 dark:text-neutral-400 hover:bg-slate-200/60 dark:hover:bg-white/[0.06] hover:text-slate-900 dark:hover:text-white'
                }`}
                aria-label="My Profile"
              >
                <User className="w-5 h-5 stroke-[2]" />
              </button>
              <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-xl bg-slate-900/95 dark:bg-[#181C30]/95 text-white text-xs font-bold whitespace-nowrap shadow-xl border border-slate-700/80 dark:border-white/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-150 z-50 flex flex-col backdrop-blur-md">
                <span className="text-white font-bold">{user?.name || 'Aspirant'}</span>
                <span className="text-[10px] text-slate-400 font-normal">My profile & settings</span>
              </div>
            </div>

            {onOpenPricing && (
              <div className="relative group flex items-center justify-center w-full">
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    onOpenPricing();
                  }}
                  className="w-10 h-10 rounded-xl text-slate-500 dark:text-neutral-400 hover:bg-slate-200/60 dark:hover:bg-white/[0.06] hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
                  aria-label="Pricing & Plans"
                >
                  <ShoppingCart className="w-5 h-5 stroke-[2]" />
                </button>
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-xl bg-slate-900/95 text-white text-xs font-bold whitespace-nowrap shadow-xl border border-slate-700 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-150 z-50">
                  Pricing & Plans
                </div>
              </div>
            )}

            {onOpenShortcuts && (
              <div className="relative group flex items-center justify-center w-full">
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    onOpenShortcuts();
                  }}
                  className="w-10 h-10 rounded-xl text-slate-500 dark:text-neutral-400 hover:bg-slate-200/60 dark:hover:bg-white/[0.06] hover:text-amber-500 flex items-center justify-center transition-all cursor-pointer active:scale-95"
                  aria-label="Shortcuts Cheatsheet"
                >
                  <Keyboard className="w-5 h-5 stroke-[2]" />
                </button>
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-xl bg-slate-900/95 text-white text-xs font-bold whitespace-nowrap shadow-xl border border-slate-700 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-150 z-50">
                  Shortcuts Cheatsheet
                </div>
              </div>
            )}

            {onOpenAiArchitect && (
              <div className="relative group flex items-center justify-center w-full">
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    onOpenAiArchitect();
                  }}
                  className="w-10 h-10 rounded-xl text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 flex items-center justify-center transition-all cursor-pointer active:scale-95"
                  aria-label="AI Studio"
                >
                  <Sparkles className="w-5 h-5 stroke-[2]" />
                </button>
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-xl bg-slate-900/95 text-white text-xs font-bold whitespace-nowrap shadow-xl border border-slate-700 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-150 z-50">
                  AI Studio
                </div>
              </div>
            )}

            {onOpenFocus && (
              <div className="relative group flex items-center justify-center w-full">
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    onOpenFocus();
                  }}
                  className="w-10 h-10 rounded-xl text-orange-400 hover:text-orange-300 hover:bg-orange-500/10 flex items-center justify-center transition-all cursor-pointer active:scale-95"
                  aria-label="Focus Mode"
                >
                  <Timer className="w-5 h-5 stroke-[2]" />
                </button>
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-xl bg-slate-900/95 text-white text-xs font-bold whitespace-nowrap shadow-xl border border-slate-700 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-150 z-50">
                  Focus Mode
                </div>
              </div>
            )}

            {/* Divider */}
            <div className="w-7 h-px bg-slate-200/80 dark:bg-white/[0.08] my-1 shrink-0" />

            {/* 6. Logout in Coral-Red (Exact Bottom Item in Screenshot) */}
            <div className="relative group flex items-center justify-center w-full">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  if (window.confirm('Are you sure you want to log out of your session?')) {
                    logout?.();
                  }
                }}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors cursor-pointer active:scale-95"
                aria-label="Logout"
              >
                <LogOut className="w-5 h-5 stroke-[2]" />
              </button>

              <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-xl bg-slate-900/95 dark:bg-[#181C30]/95 text-rose-300 text-xs font-bold whitespace-nowrap shadow-xl border border-rose-500/30 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-150 z-50 backdrop-blur-md">
                Logout
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* =========================================================================
           STATE B: EXPANDED FULL-WIDTH SIDEBAR (260px Width with Icons + Names)
           Same dark theme and golden highlights, showing website logo, exam badge,
           organized category headers, and page names with clean typography.
           ========================================================================= */
        <div className="flex flex-col h-full justify-between w-full">
          <div className="flex flex-col w-full min-h-0 flex-1">
            {/* 1. Header Branding: Exactly h-14 (56px) baseline aligned with Header */}
            <div className="h-14 px-3.5 flex items-center justify-between border-b border-slate-200/80 dark:border-white/[0.08] shrink-0">
              <div
                className="flex items-center gap-2.5 min-w-0 flex-1 group cursor-pointer"
                onClick={() => {
                  soundManager.playClick();
                  onSelectView('overview');
                }}
                title="Go to Home"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500/20 via-amber-400/10 to-transparent border border-amber-500/30 flex items-center justify-center p-1 shadow-sm shrink-0">
                  <BrandEmblemLogo size="sm" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-sm font-black tracking-tight text-slate-900 dark:text-white uppercase font-serif block leading-none">
                    SYLLABUS 3D
                  </span>
                  <p className="text-[10px] font-bold text-amber-600 dark:text-amber-400 tracking-wider font-mono truncate mt-0.5">
                    {currentExam?.name || 'TARGET EXAM'}
                  </p>
                </div>
              </div>

              {onToggleCollapse && (
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    haptics.light();
                    onToggleCollapse();
                  }}
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-white/10 transition-colors cursor-pointer shrink-0 active:scale-95 ml-2"
                  title="Collapse sidebar (Ctrl+B)"
                  aria-label="Collapse sidebar"
                >
                  <PanelLeftClose className="w-4 h-4 stroke-[2.2]" />
                </button>
              )}
            </div>

            {/* Scrollable Navigation Body */}
            <div className="p-3 space-y-3 overflow-y-auto no-scrollbar flex-1 min-h-0">
              {/* 2. Categorized Sections (CORE, PRACTICE & TESTS, STUDY TOOLS) */}
              <div className="space-y-3">
                {navSections.map(section => {
                  const isCollapsedSection = Boolean(collapsedSections[section.title]);
                  return (
                    <div key={section.title} className="space-y-0.5">
                      <button
                        type="button"
                        onClick={() => toggleSection(section.title)}
                        className="w-full flex items-center justify-between px-2 pt-1 pb-1 text-[11px] font-black tracking-wider text-slate-400 dark:text-slate-500 uppercase hover:text-slate-700 dark:hover:text-slate-300 transition-colors cursor-pointer select-none"
                      >
                        <span>{section.title}</span>
                        <ChevronDown
                          className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${
                            isCollapsedSection ? '-rotate-90' : 'rotate-0'
                          }`}
                        />
                      </button>

                      {!isCollapsedSection && (
                        <nav className="space-y-1 pt-0.5">
                          {section.items.map(item => {
                            const Icon = item.icon;
                            const isActive = activeView === item.id;
                            return (
                              <button
                                key={`${section.title}-${item.label}`}
                                type="button"
                                onClick={() => {
                                  soundManager.playClick();
                                  onSelectView(item.id);
                                }}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-2xl text-xs sm:text-sm transition-all duration-150 cursor-pointer select-none font-bold ${
                                  isActive
                                    ? 'bg-[#FFF4D2] text-[#8C6B00] border border-[#FDE68A] shadow-xs dark:bg-[#251E0E] dark:text-[#FBBF24] dark:border-amber-500/40 dark:shadow-[0_0_12px_rgba(245,158,11,0.15)]'
                                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-white/[0.06] hover:text-slate-900 dark:hover:text-white'
                                }`}
                              >
                                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-500 dark:text-amber-400' : 'text-slate-500 dark:text-slate-400'}`} />
                                  <span className="truncate">{item.label}</span>
                                </div>

                                {item.badge && (
                                  <span className={`px-1.5 py-0.2 rounded-md text-[11px] font-mono font-bold ${item.badgeColor || 'bg-slate-200 text-slate-700'}`}>
                                    {item.badge}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </nav>
                      )}
                    </div>
                  );
                })}

                {/* 4. My Profile & Red Logout Button */}
                <div className="pt-2 border-t border-slate-200/80 dark:border-white/[0.08] space-y-1">
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      onSelectView('settings');
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      activeView === 'settings'
                        ? 'bg-[#FFF4D2] text-[#8C6B00] border border-[#FDE68A] dark:bg-[#251E0E] dark:text-[#FBBF24] dark:border-amber-500/40'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-white/[0.06]'
                    }`}
                  >
                    <User className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    <span className="truncate">My Profile ({user?.name || 'Aspirant'})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      if (window.confirm('Are you sure you want to log out of your session?')) {
                        logout?.();
                      }
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-2xl text-xs sm:text-sm font-bold text-rose-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 stroke-[2.2]" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Area: Quick Utility Tools */}
          <div className="p-3 pt-2 border-t border-slate-200/80 dark:border-white/[0.08] text-slate-800 dark:text-white space-y-1.5 shrink-0">
            <div className="grid grid-cols-2 gap-1.5">
              {onOpenAiArchitect && (
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    onOpenAiArchitect();
                  }}
                  className="py-1 px-2 rounded-xl bg-slate-100/70 hover:bg-slate-200/70 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 border border-slate-200/80 dark:border-white/[0.07] transition-all cursor-pointer truncate"
                  title="AI Syllabus Architect"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#992BFF]" />
                  <span className="truncate">AI Studio</span>
                </button>
              )}

              {onOpenFocus && (
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    onOpenFocus();
                  }}
                  className="py-1 px-2 rounded-xl bg-slate-100/70 hover:bg-slate-200/70 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 border border-slate-200/80 dark:border-white/[0.07] transition-all cursor-pointer truncate"
                  title="Focus Mode"
                >
                  <Timer className="w-3.5 h-3.5 text-[#FF6105]" />
                  <span className="truncate">Focus</span>
                </button>
              )}
            </div>

            {onOpenShortcuts && (
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  haptics.selection();
                  onOpenShortcuts();
                }}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-100/70 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.07] hover:border-amber-500 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-all cursor-pointer text-xs font-semibold"
                title="Keyboard Shortcuts Cheatsheet"
              >
                <Keyboard className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-xs font-semibold">Shortcuts Cheatsheet</span>
              </button>
            )}
          </div>
        </div>
      )}
    </aside>
  );
};
