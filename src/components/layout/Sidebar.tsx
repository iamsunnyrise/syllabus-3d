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
  Sparkles,
  Video,
  ChevronDown,
  User,
  LogOut,
  Gauge,
  BarChart3,
  AlertTriangle,
  Trophy,
  ShoppingCart,
  Calculator,
  Compass,
  Languages,
  Wrench,
  Zap
} from 'lucide-react';
import { useSyllabus } from '../../context/SyllabusContext';
import { useAuth } from '../../context/AuthContext';
import { soundManager } from '../../utils/soundEffects';
import { haptics } from '../../utils/haptics';
import { BrandEmblemLogo } from '../common/BrandEmblemLogo';
import { preloadView } from '../../utils/viewPreloader';

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
  | 'landing'
  | 'study-tools'
  | 'study-tools-vocab'
  | 'study-tools-vocab-ssc'
  | 'study-tools-maths'
  | 'study-tools-calc-booster'
  | 'study-tools-ga';

export interface SubNavItem {
  id: AppView;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: React.ReactNode;
  badgeColor?: string;
}

export interface NavItem {
  id: AppView;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: React.ReactNode;
  badgeColor?: string;
  shortcut?: string;
  subItems?: SubNavItem[];
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
  const { dueRevisions, weakTopics, currentExam, overallStats } = useSyllabus();
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

  // Collapsible Sub-menus State (e.g. Study Tools dropdown)
  const [expandedSubMenus, setExpandedSubMenus] = useState<Record<string, boolean>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('syllabus3d_sidebar_expanded_submenus');
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return { 'study-tools': true };
  });

  // Automatically keep sub-menu open if activeView is one of its children
  useEffect(() => {
    if (activeView.startsWith('study-tools')) {
      setExpandedSubMenus(prev => {
        if (prev['study-tools']) return prev;
        return { ...prev, 'study-tools': true };
      });
    }
  }, [activeView]);

  const toggleSubMenu = (itemId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    soundManager.playClick();
    haptics.selection();
    setExpandedSubMenus(prev => {
      const next = {
        ...prev,
        [itemId]: !prev[itemId]
      };
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('syllabus3d_sidebar_expanded_submenus', JSON.stringify(next));
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
      id: 'study-tools',
      label: 'Study Tools',
      icon: Sparkles,
      badge: 'New',
      badgeColor: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30',
      subItems: [
        {
          id: 'study-tools-vocab',
          label: 'Vocabulary',
          icon: Languages,
          badge: '150+'
        },
        {
          id: 'study-tools-vocab-ssc',
          label: 'SSC Special Vocab',
          icon: Sparkles,
          badge: '7 Notes'
        },
        {
          id: 'study-tools-maths',
          label: 'Maths Formulas',
          icon: Calculator
        },
        {
          id: 'study-tools-calc-booster',
          label: 'Calculation Booster',
          icon: Zap,
          badge: 'Speed'
        },
        {
          id: 'study-tools-ga',
          label: 'General Awareness',
          icon: Compass
        }
      ]
    },
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
      title: 'Core',
      items: coreItems
    },
    {
      title: 'Practice & Mocks',
      items: practiceItems
    },
    {
      title: 'Study Tools',
      items: toolsItems
    }
  ];

  return (
    <aside
      className={`sidebar-container hidden md:flex flex-col h-screen fixed top-0 left-0 bg-[#FFFDF8] dark:bg-black text-[#38370D] dark:text-white justify-between transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] z-40 select-none border-r border-[#E2D1B3] dark:border-white/[0.08] shadow-xs ${
        isCollapsed ? 'w-[70px]' : 'w-[260px]'
      }`}
    >

      {/* =========================================================================
          STATE A: COLLAPSED SLIM ICON-ONLY SIDEBAR (70px Width)
          Matches the reference screenshot with circular logo, golden active pill,
          sleek outline icons, and coral-red logout at bottom.
          ========================================================================= */}
      {isCollapsed ? (
        <div className="sidebar-inner-container flex flex-col h-full justify-between items-center w-full bg-[#FFFDF8] dark:bg-black text-[#38370D] dark:text-white">
          {/* Top Section: Exactly h-14 (56px) baseline aligned with Header */}
          <div className="sidebar-header-bar h-14 w-full flex items-center justify-center border-b border-[#E2D1B3] dark:border-white/[0.08] shrink-0 bg-[#FFFDF8] dark:bg-black">
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
          <div className="sidebar-scroll-rail flex-1 py-3 px-2 overflow-y-auto no-scrollbar flex flex-col items-center space-y-2 w-full bg-[#FFFDF8] dark:bg-black">
            {/* 1. Core Section (Home & Syllabus) */}
            {coreItems.map(item => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <div key={item.id} className="relative group flex items-center justify-center w-full">
                  <button
                    type="button"
                    data-sidebar-item="true"
                    data-sidebar-active={isActive ? 'true' : 'false'}
                    onMouseEnter={() => preloadView(item.id)}
                    onTouchStart={() => preloadView(item.id)}
                    onFocus={() => preloadView(item.id)}
                    onClick={() => {
                      soundManager.playClick();
                      onSelectView(item.id);
                    }}
                    className={`flex items-center justify-center transition-all duration-150 cursor-pointer select-none active:scale-95 ${
                      isActive
                        ? 'w-11 h-11 rounded-2xl bg-[#F5E8CF] text-[#38370D] border border-[#D8C6A5] shadow-xs font-bold dark:bg-[#241F0A] dark:text-[#FBBF24] dark:border-amber-500/30 dark:shadow-[0_2px_12px_rgba(225,168,55,0.15)]'
                        : 'w-10 h-10 rounded-xl text-[#7D6C02] hover:text-[#1C1B05] hover:bg-[#FAF0DC] dark:text-zinc-400 dark:hover:text-white'
                    }`}
                    title={item.label}
                    aria-label={item.label}
                  >
                    <Icon className="w-5 h-5 stroke-[2.2]" />
                  </button>

                  <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-xl bg-zinc-900/95 text-white text-xs font-bold whitespace-nowrap shadow-xl border border-white/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-150 z-50 flex items-center gap-1.5 backdrop-blur-md">
                    <span>{item.label}</span>
                  </div>
                </div>
              );
            })}

            {/* Divider */}
            <div className="w-7 h-px bg-[#E2D1B3] dark:bg-white/[0.08] my-1 shrink-0" />

            {/* 3. Practice & Routine Section (Targets, Revision, Weak, Mock) */}
            {practiceItems.map(item => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <div key={item.id} className="relative group flex items-center justify-center w-full">
                  <button
                    type="button"
                    data-sidebar-item="true"
                    data-sidebar-active={isActive ? 'true' : 'false'}
                    onMouseEnter={() => preloadView(item.id)}
                    onTouchStart={() => preloadView(item.id)}
                    onFocus={() => preloadView(item.id)}
                    onClick={() => {
                      soundManager.playClick();
                      onSelectView(item.id);
                    }}
                    className={`relative flex items-center justify-center transition-all duration-150 cursor-pointer select-none active:scale-95 ${
                      isActive
                        ? 'w-11 h-11 rounded-2xl bg-[#F5E8CF] text-[#38370D] border border-[#D8C6A5] shadow-xs font-bold dark:bg-[#241F0A] dark:text-[#FBBF24] dark:border-amber-500/30 dark:shadow-[0_2px_12px_rgba(225,168,55,0.15)]'
                        : 'w-10 h-10 rounded-xl text-[#7D6C02] hover:text-[#1C1B05] hover:bg-[#FAF0DC] dark:text-zinc-400 dark:hover:text-white'
                    }`}
                    title={item.label}
                    aria-label={item.label}
                  >
                    <Icon className="w-5 h-5 stroke-[2]" />
                    {item.badge && (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-black" />
                    )}
                  </button>

                  <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-xl bg-zinc-900/95 text-white text-xs font-bold whitespace-nowrap shadow-xl border border-white/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-150 z-50 flex items-center gap-1.5 backdrop-blur-md">
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-xs font-mono">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Divider */}
            <div className="w-7 h-px bg-[#E2D1B3] dark:bg-white/[0.08] my-1 shrink-0" />

            {/* 4. Study Tools Section (Pacing, Analytics, YouTube, Mindmap, Platforms) */}
            {toolsItems.map(item => {
              const Icon = item.icon;
              const isActive = activeView === item.id || Boolean(item.subItems?.some(s => s.id === activeView));
              return (
                <div key={item.id} className="relative group flex items-center justify-center w-full">
                  <button
                    type="button"
                    data-sidebar-item="true"
                    data-sidebar-active={isActive ? 'true' : 'false'}
                    onMouseEnter={() => preloadView(item.id)}
                    onTouchStart={() => preloadView(item.id)}
                    onFocus={() => preloadView(item.id)}
                    onClick={() => {
                      soundManager.playClick();
                      onSelectView(item.id);
                    }}
                    className={`flex items-center justify-center transition-all duration-150 cursor-pointer select-none active:scale-95 ${
                      isActive
                        ? 'w-11 h-11 rounded-2xl bg-[#F5E8CF] text-[#38370D] border border-[#D8C6A5] shadow-xs font-bold dark:bg-[#241F0A] dark:text-[#FBBF24] dark:border-amber-500/30 dark:shadow-[0_2px_12px_rgba(225,168,55,0.15)]'
                        : 'w-10 h-10 rounded-xl text-[#7D6C02] hover:text-[#1C1B05] hover:bg-[#FAF0DC] dark:text-zinc-400 dark:hover:text-white'
                    }`}
                    title={item.subItems ? `${item.label} (Vocabulary, Maths, GA)` : item.label}
                    aria-label={item.label}
                  >
                    <Icon className="w-5 h-5 stroke-[2]" />
                  </button>

                  <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-xl bg-zinc-900/95 text-white text-xs font-bold whitespace-nowrap shadow-xl border border-white/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-150 z-50 flex items-center gap-1.5 backdrop-blur-md">
                    <span>{item.subItems ? `${item.label} (Vocab, Maths, GA)` : item.label}</span>
                  </div>
                </div>
              );
            })}

            {/* Divider */}
            <div className="w-7 h-px bg-[#E2D1B3] dark:bg-white/[0.08] my-1 shrink-0" />

            {/* 5. Account & Utility Icons (Profile, Pricing, Shortcuts, AI Studio, Focus) */}
            <div className="relative group flex items-center justify-center w-full">
              <button
                type="button"
                data-sidebar-item="true"
                data-sidebar-active={activeView === 'settings' ? 'true' : 'false'}
                onMouseEnter={() => preloadView('settings')}
                onTouchStart={() => preloadView('settings')}
                onFocus={() => preloadView('settings')}
                onClick={() => {
                  soundManager.playClick();
                  onSelectView('settings');
                }}
                className={`flex items-center justify-center transition-all duration-150 cursor-pointer select-none active:scale-95 ${
                  activeView === 'settings'
                    ? 'w-11 h-11 rounded-2xl bg-[#F5E8CF] text-[#38370D] border border-[#D8C6A5] shadow-xs font-bold dark:bg-[#241F0A] dark:text-[#FBBF24] dark:border-amber-500/30'
                    : 'w-10 h-10 rounded-xl text-[#7D6C02] hover:text-[#1C1B05] hover:bg-[#FAF0DC] dark:text-zinc-400 dark:hover:text-white'
                }`}
                aria-label="My Profile"
              >
                <User className="w-5 h-5 stroke-[2]" />
              </button>
              <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-xl bg-zinc-900/95 text-white text-xs font-bold whitespace-nowrap shadow-xl border border-white/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-150 z-50 flex flex-col backdrop-blur-md">
                <span className="text-white font-bold">{user?.name || 'Aspirant'}</span>
                <span className="text-[10px] text-zinc-400 font-normal">My profile & settings</span>
              </div>
            </div>

            {onOpenShortcuts && (
              <div className="relative group flex items-center justify-center w-full">
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    onOpenShortcuts();
                  }}
                  className="w-10 h-10 rounded-xl text-[#7D6C02] hover:text-[#1C1B05] hover:bg-[#FAF0DC] dark:text-zinc-400 dark:hover:text-amber-400 flex items-center justify-center transition-all cursor-pointer active:scale-95"
                  aria-label="Shortcuts Cheatsheet"
                >
                  <Keyboard className="w-5 h-5 stroke-[2]" />
                </button>
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-xl bg-zinc-900/95 text-white text-xs font-bold whitespace-nowrap shadow-xl border border-white/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-150 z-50">
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
                  className="w-10 h-10 rounded-xl text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-500/10 flex items-center justify-center transition-all cursor-pointer active:scale-95"
                  aria-label="AI Studio"
                >
                  <Sparkles className="w-5 h-5 stroke-[2]" />
                </button>
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-xl bg-zinc-900/95 text-white text-xs font-bold whitespace-nowrap shadow-xl border border-white/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-150 z-50">
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
                  className="w-10 h-10 rounded-xl text-[#8D7A02] dark:text-orange-400 hover:text-[#5A4E03] dark:hover:text-orange-300 hover:bg-[#FAF0DC] dark:hover:bg-orange-500/10 flex items-center justify-center transition-all cursor-pointer active:scale-95"
                  aria-label="Focus Mode"
                >
                  <Timer className="w-5 h-5 stroke-[2]" />
                </button>
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-xl bg-zinc-900/95 text-white text-xs font-bold whitespace-nowrap shadow-xl border border-white/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-150 z-50">
                  Focus Mode
                </div>
              </div>
            )}

            {/* Divider */}
            <div className="w-7 h-px bg-[#E2D1B3] dark:bg-white/[0.08] my-1 shrink-0" />

            {/* 6. Logout in Coral-Red (Exact Bottom Item in Screenshot) */}
            <div className="relative group flex items-center justify-center w-full">
              <button
                type="button"
                data-sidebar-logout="true"
                onClick={() => {
                  soundManager.playClick();
                  if (window.confirm('Are you sure you want to log out of your session?')) {
                    logout?.();
                  }
                }}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-red-600 hover:text-red-700 hover:bg-rose-50 dark:text-[#F87171] dark:hover:text-rose-300 dark:hover:bg-rose-500/10 transition-colors cursor-pointer active:scale-95"
                aria-label="Logout"
              >
                <LogOut className="w-5 h-5 stroke-[2] text-red-600 dark:text-[#F87171]" />
              </button>

              <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-xl bg-zinc-900/95 text-rose-300 text-xs font-bold whitespace-nowrap shadow-xl border border-rose-500/30 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-150 z-50 backdrop-blur-md">
                Logout
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* =========================================================================
           STATE B: EXPANDED FULL-WIDTH SIDEBAR (260px Width with Icons + Names)
           Matches reference screenshot: Pitch black background, golden capsule
           active highlights, crisp text, and coral-red logout.
           ========================================================================= */
        <div className="sidebar-inner-container flex flex-col h-full justify-between w-full bg-[#FFFDF8] dark:bg-black text-[#38370D] dark:text-white">
          <div className="flex flex-col w-full min-h-0 flex-1">
            {/* 1. Header Branding: Exactly h-14 (56px) baseline aligned with Header */}
            <div className="sidebar-header-bar h-14 px-3.5 flex items-center justify-between border-b border-[#E2D1B3] dark:border-white/[0.08] shrink-0 bg-[#FFFDF8] dark:bg-black">
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
                  <span className="sidebar-title text-sm font-black tracking-tight text-[#1C1B05] dark:text-white uppercase font-serif block leading-none">
                    SYLLABUS 3D
                  </span>
                  <p className="sidebar-subtitle text-xs font-bold text-[#8D7A02] dark:text-amber-400 tracking-wider font-mono truncate mt-0.5">
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
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-[#7D6C02] hover:text-[#1C1B05] hover:bg-[#FAF0DC] dark:text-zinc-400 dark:hover:text-white dark:hover:bg-white/10 transition-colors cursor-pointer shrink-0 active:scale-95 ml-2"
                  title="Collapse sidebar (Ctrl+B)"
                  aria-label="Collapse sidebar"
                >
                  <PanelLeftClose className="w-4 h-4 stroke-[2.2]" />
                </button>
              )}
            </div>

            {/* Sidebar Progress Track with smooth #8D7A02 -> #E1A837 -> #FAEED9 gradient */}
            <div className="h-[2px] w-full bg-[#8D7A02]/20 overflow-hidden shrink-0">
              <div 
                className="h-full bg-gradient-to-r from-[#8D7A02] via-[#E1A837] to-[#FAEED9] transition-all duration-700 ease-out shadow-[0_0_8px_rgba(225,168,55,0.6)]" 
                style={{ width: `${Math.max(5, overallStats?.completionPercentage || 0)}%` }} 
              />
            </div>

            {/* Scrollable Navigation Body */}
            <div className="sidebar-scroll-rail p-3 space-y-3 overflow-y-auto no-scrollbar flex-1 min-h-0 bg-[#FFFDF8] dark:bg-black">
              {/* 2. Categorized Sections (CORE, PRACTICE & TESTS, STUDY TOOLS) */}
              <div className="space-y-3">
                {navSections.map(section => {
                  const isCollapsedSection = Boolean(collapsedSections[section.title] || collapsedSections[section.title.toUpperCase()]);
                  return (
                    <div key={section.title} className="space-y-1">
                      <button
                        type="button"
                        onClick={() => toggleSection(section.title)}
                        className="sidebar-section-header w-full flex items-center justify-between px-3 pt-3 pb-1 text-[11px] font-bold tracking-wider text-[#8D7A02] dark:text-zinc-500 uppercase hover:text-[#5A4E03] dark:hover:text-zinc-300 transition-colors cursor-pointer select-none"
                      >
                        <span>{section.title}</span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 text-[#8D7A02] dark:text-zinc-500 transition-transform duration-200 ${
                            isCollapsedSection ? '-rotate-90' : 'rotate-0'
                          }`}
                        />
                      </button>

                      {!isCollapsedSection && (
                        <div role="navigation" aria-label={section.title} className="space-y-1 pt-0.5">
                          {section.items.map(item => {
                            const Icon = item.icon;
                            const isDirectActive = activeView === item.id;
                            const isChildActive = Boolean(item.subItems?.some(s => s.id === activeView));
                            const isParentActive = isDirectActive || isChildActive;
                            const hasSubItems = Boolean(item.subItems && item.subItems.length > 0);
                            const isSubExpanded = hasSubItems && Boolean(expandedSubMenus[item.id]);

                            return (
                              <div key={`${section.title}-${item.label}`} className="space-y-1">
                                <div className="flex items-center gap-1 w-full">
                                  <button
                                    type="button"
                                    data-sidebar-item="true"
                                    data-sidebar-active={isDirectActive ? 'true' : 'false'}
                                    onMouseEnter={() => preloadView(item.id)}
                                    onTouchStart={() => preloadView(item.id)}
                                    onFocus={() => preloadView(item.id)}
                                    onClick={() => {
                                      soundManager.playClick();
                                      if (hasSubItems && !isSubExpanded) {
                                        toggleSubMenu(item.id);
                                      }
                                      onSelectView(item.id);
                                    }}
                                    className={`flex-1 flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm transition-all duration-150 cursor-pointer select-none active:scale-[0.98] ${
                                      isDirectActive
                                        ? 'bg-[#F5E8CF] text-[#38370D] border border-[#D8C6A5] font-bold shadow-xs dark:bg-[#241F0A] dark:text-[#FBBF24] dark:border-amber-500/25 dark:shadow-[0_2px_12px_rgba(225,168,55,0.12)]'
                                        : isChildActive
                                        ? 'bg-[#FAF0DC] text-[#38370D] font-semibold dark:bg-[#241F0A]/50 dark:text-[#FBBF24]'
                                        : 'bg-transparent text-[#38370D] hover:text-[#1C1B05] hover:bg-[#FAF0DC] dark:text-zinc-300 dark:hover:text-white font-medium border-0'
                                    }`}
                                  >
                                    <div className="flex items-center gap-3 min-w-0 flex-1">
                                      <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                                        isParentActive
                                          ? 'text-[#8D7A02] dark:text-[#FBBF24]'
                                          : 'text-[#7D6C02] group-hover:text-[#1C1B05] dark:text-zinc-400 dark:group-hover:text-white'
                                      }`} />
                                      <span className="truncate">{item.label}</span>
                                    </div>

                                    <div className="flex items-center gap-1.5 shrink-0">
                                      {item.badge && (
                                        <span className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded-md ${
                                          isParentActive
                                            ? 'bg-amber-500/20 text-[#8D7A02] dark:text-[#FBBF24]'
                                            : 'bg-[#FAF0DC] text-[#7D6C02] dark:bg-zinc-800 dark:text-zinc-400'
                                        }`}>
                                          {item.badge}
                                        </span>
                                      )}
                                    </div>
                                  </button>

                                  {hasSubItems && (
                                    <button
                                      type="button"
                                      onClick={(e) => toggleSubMenu(item.id, e)}
                                      className="w-8 h-8 flex items-center justify-center text-[#7D6C02] hover:text-[#1C1B05] dark:text-zinc-400 dark:hover:text-white rounded-xl transition-colors cursor-pointer shrink-0 bg-transparent border-0"
                                      title={isSubExpanded ? "Collapse sub-menu" : "Expand sub-menu"}
                                      aria-label={isSubExpanded ? "Collapse sub-menu" : "Expand sub-menu"}
                                    >
                                      <ChevronDown
                                        className={`w-3.5 h-3.5 transition-transform duration-200 ease-out ${
                                          isSubExpanded ? 'rotate-0 text-[#8D7A02] dark:text-[#FBBF24]' : '-rotate-90'
                                        }`}
                                      />
                                    </button>
                                  )}
                                </div>

                                {/* Nested Sub-Items */}
                                {hasSubItems && isSubExpanded && (
                                  <div className="pl-6 space-y-1 pt-0.5 transition-all duration-200">
                                    {item.subItems!.map(sub => {
                                      const SubIcon = sub.icon;
                                      const isSubActive = activeView === sub.id;
                                      return (
                                        <button
                                          key={sub.id}
                                          type="button"
                                          data-sidebar-item="true"
                                          data-sidebar-active={isSubActive ? 'true' : 'false'}
                                          onMouseEnter={() => preloadView(sub.id)}
                                          onTouchStart={() => preloadView(sub.id)}
                                          onFocus={() => preloadView(sub.id)}
                                          onClick={() => {
                                            soundManager.playClick();
                                            haptics.selection();
                                            onSelectView(sub.id);
                                          }}
                                          className={`group w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all duration-150 cursor-pointer select-none active:scale-[0.98] ${
                                            isSubActive
                                              ? 'bg-[#F5E8CF] text-[#38370D] border border-[#D8C6A5] font-bold shadow-xs dark:bg-[#241F0A] dark:text-[#FBBF24] dark:border-amber-500/25 dark:shadow-[0_2px_10px_rgba(225,168,55,0.1)]'
                                              : 'bg-transparent text-[#5A4E03] hover:text-[#1C1B05] hover:bg-[#FAF0DC] dark:text-zinc-400 dark:hover:text-white font-medium border-0'
                                          }`}
                                        >
                                          <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                            {SubIcon && (
                                              <SubIcon className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                                                isSubActive
                                                  ? 'text-[#8D7A02] dark:text-[#FBBF24]'
                                                  : 'text-[#8D7A02]/70 dark:text-zinc-500 group-hover:text-[#1C1B05] dark:group-hover:text-zinc-300'
                                              }`} />
                                            )}
                                            <span className="truncate">{sub.label}</span>
                                          </div>

                                          <div className="flex items-center gap-1.5 shrink-0 ml-1.5">
                                            {sub.badge && (
                                              <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                                                isSubActive
                                                  ? 'bg-amber-500/20 text-[#8D7A02] dark:text-[#FBBF24]'
                                                  : 'bg-[#FAF0DC] text-[#7D6C02] dark:bg-zinc-800 dark:text-zinc-400'
                                              }`}>
                                                {sub.badge}
                                              </span>
                                            )}
                                          </div>
                                        </button>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* 4. My Profile & Red Logout Button */}
                <div className="pt-3 mt-2 border-t border-[#E2D1B3] dark:border-white/[0.08] space-y-1">
                  <button
                    type="button"
                    data-sidebar-item="true"
                    data-sidebar-active={activeView === 'settings' ? 'true' : 'false'}
                    onMouseEnter={() => preloadView('settings')}
                    onTouchStart={() => preloadView('settings')}
                    onFocus={() => preloadView('settings')}
                    onClick={() => {
                      soundManager.playClick();
                      onSelectView('settings');
                    }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm transition-all cursor-pointer select-none active:scale-[0.98] ${
                      activeView === 'settings'
                        ? 'bg-[#F5E8CF] text-[#38370D] border border-[#D8C6A5] font-bold shadow-xs dark:bg-[#241F0A] dark:text-[#FBBF24] dark:border-amber-500/25 dark:shadow-[0_2px_12px_rgba(225,168,55,0.12)]'
                        : 'bg-transparent text-[#38370D] hover:text-[#1C1B05] hover:bg-[#FAF0DC] dark:text-zinc-300 dark:hover:text-white font-medium border-0'
                    }`}
                  >
                    <User className={`w-4 h-4 shrink-0 ${activeView === 'settings' ? 'text-[#8D7A02] dark:text-[#FBBF24]' : 'text-[#7D6C02] dark:text-zinc-400'}`} />
                    <span className="truncate">My Profile ({user?.name || 'Aspirant'})</span>
                  </button>

                  <button
                    type="button"
                    data-sidebar-logout="true"
                    onClick={() => {
                      soundManager.playClick();
                      if (window.confirm('Are you sure you want to log out of your session?')) {
                        logout?.();
                      }
                    }}
                    className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm font-medium text-red-600 hover:text-red-700 hover:bg-rose-50 dark:text-[#F87171] dark:hover:text-rose-300 dark:hover:bg-rose-500/10 transition-colors cursor-pointer select-none bg-transparent border-0"
                  >
                    <LogOut className="w-4 h-4 stroke-[2.2] shrink-0 text-red-600 dark:text-[#F87171]" />
                    <span className="text-red-600 dark:text-[#F87171]">Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Area: Quick Utility Tools */}
          <div className="sidebar-bottom-bar p-3 pt-2 border-t border-[#E2D1B3] dark:border-white/[0.08] bg-[#FFFDF8] dark:bg-black text-[#38370D] dark:text-white space-y-1.5 shrink-0">
            <div className="grid grid-cols-2 gap-1.5">
              {onOpenAiArchitect && (
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    onOpenAiArchitect();
                  }}
                  className="sidebar-utility-btn py-1.5 px-2 rounded-xl bg-[#FAF4E6] dark:bg-white/[0.04] text-[#38370D] dark:text-zinc-300 border border-[#E2D1B3] dark:border-white/[0.08] hover:bg-[#F7EBD3] dark:hover:bg-white/[0.08] font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer truncate"
                  title="AI Syllabus Architect"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400" />
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
                  className="sidebar-utility-btn py-1.5 px-2 rounded-xl bg-[#FAF4E6] dark:bg-white/[0.04] text-[#38370D] dark:text-zinc-300 border border-[#E2D1B3] dark:border-white/[0.08] hover:bg-[#F7EBD3] dark:hover:bg-white/[0.08] font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer truncate"
                  title="Focus Mode"
                >
                  <Timer className="w-3.5 h-3.5 text-[#8D7A02] dark:text-amber-400" />
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
                className="sidebar-utility-btn w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-[#FAF4E6] dark:bg-white/[0.04] text-[#38370D] dark:text-zinc-300 border border-[#E2D1B3] dark:border-white/[0.08] hover:bg-[#F7EBD3] dark:hover:bg-white/[0.08] transition-all cursor-pointer text-xs font-semibold"
                title="Keyboard Shortcuts Cheatsheet"
              >
                <Keyboard className="w-3.5 h-3.5 text-[#8D7A02] dark:text-amber-400" />
                <span className="text-xs font-semibold">Shortcuts Cheatsheet</span>
              </button>
            )}
          </div>
        </div>
      )}
    </aside>
  );
};
