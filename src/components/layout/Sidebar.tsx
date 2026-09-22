import React, { useState, useEffect, useMemo } from 'react';
import {
  LayoutDashboard,
  CalendarCheck,
  RotateCw,
  AlertTriangle,
  BrainCircuit,
  BookOpen,
  Settings,
  Plus,
  BarChart3,
  Timer,
  ExternalLink,
  Globe,
  Keyboard,
  Clock,
  Users,
  PanelLeftClose,
  Sparkles,
  ArrowRight,
  Video,
  Trophy,
  ChevronDown,
  Search,
  X
} from 'lucide-react';
import { useSyllabus } from '../../context/SyllabusContext';
import { useAuth } from '../../context/AuthContext';
import { soundManager } from '../../utils/soundEffects';
import { haptics } from '../../utils/haptics';

export type AppView =
  | 'overview'
  | 'planner'
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
  isDashboard?: boolean;
  badge: React.ReactNode;
  badgeColor: string;
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
  onOpenProfileSwitcher?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onSelectView,
  onOpenAddTopic,
  onOpenAiArchitect,
  onOpenFocus,
  onOpenShortcuts,
  onOpenProfileSwitcher,
  isCollapsed = false,
  onToggleCollapse
}) => {
  const { profile, dueRevisions, weakTopics, plannerTasks, platforms, overallStats } = useSyllabus();
  const { user } = useAuth();

  // 🛡️ Comprehensive Defensive Guards (Prevent any null/undefined crash)
  const profileSafe = profile || {
    name: 'Aspirant',
    level: 1,
    levelTitle: 'Novice Scholar',
    avatarColor: 'from-[#2563EB] to-indigo-600',
    avatarUrl: '',
    avatarEmoji: '🦁'
  };
  const plannerTasksSafe = Array.isArray(plannerTasks) ? plannerTasks : [];
  const dueRevisionsSafe = Array.isArray(dueRevisions) ? dueRevisions : [];
  const weakTopicsSafe = Array.isArray(weakTopics) ? weakTopics : [];
  const platformsSafe = Array.isArray(platforms) ? platforms : [];
  const overallStatsSafe = overallStats || { completionPercentage: 0 };

  // 🧭 Raycast-style Nav Search & Collapsible Groups State
  const [navQuery, setNavQuery] = useState('');
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (title: string) => {
    soundManager.playClick();
    haptics.selection();
    setCollapsedSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
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
          '3': 'planner',
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

  const navSections: NavSection[] = [
    {
      title: 'CORE MODULES',
      items: [
        {
          id: 'overview' as AppView,
          label: 'Dashboard',
          icon: LayoutDashboard,
          isDashboard: true,
          badge: null,
          badgeColor: '',
          shortcut: '1'
        },
        {
          id: 'syllabus' as AppView,
          label: 'Syllabus Explorer',
          icon: BookOpen,
          badge: null,
          badgeColor: '',
          shortcut: '2'
        },
        {
          id: 'planner' as AppView,
          label: 'Study Planner',
          icon: CalendarCheck,
          badge: plannerTasksSafe.filter(t => t.status === 'today').length || null,
          badgeColor: 'bg-[#2563EB] text-white shadow-[0_0_8px_rgba(37,99,235,0.4)]',
          shortcut: '3'
        },
        {
          id: 'pacing' as AppView,
          label: 'Target Pacing',
          icon: Clock,
          badge: 'Live',
          badgeColor: 'bg-emerald-500/15 dark:bg-emerald-500/25 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30',
          shortcut: '4'
        },
        {
          id: 'youtube-notes' as AppView,
          label: 'AI YouTube Notes',
          icon: Video,
          badge: 'AI',
          badgeColor: 'bg-purple-500/15 dark:bg-purple-500/25 text-purple-600 dark:text-purple-400 border border-purple-500/30',
          shortcut: '5'
        },
        {
          id: 'mock-tracker' as AppView,
          label: 'Mock Test Tracker',
          icon: Trophy,
          badge: '3D Pro',
          badgeColor: 'bg-gradient-to-r from-[#00d2ff] to-[#7c3aed] text-white shadow-glow-cyan',
          shortcut: '6'
        }
      ]
    },
    {
      title: 'MASTERY & REVISION',
      items: [
        {
          id: 'revision' as AppView,
          label: 'Spaced Revision',
          icon: RotateCw,
          badge: dueRevisionsSafe.length ? `${dueRevisionsSafe.length} due` : null,
          badgeColor: 'bg-amber-500 text-white shadow-xs'
        },
        {
          id: 'weak' as AppView,
          label: 'Weak Topics',
          icon: AlertTriangle,
          badge: weakTopicsSafe.length || null,
          badgeColor: 'bg-rose-500 text-white shadow-xs'
        },
        {
          id: 'mindmap' as AppView,
          label: 'Concept Mind Map',
          icon: BrainCircuit,
          badge: null,
          badgeColor: ''
        },
        {
          id: 'analytics' as AppView,
          label: 'Analytics & Heatmap',
          icon: BarChart3,
          badge: null,
          badgeColor: ''
        }
      ]
    },
    {
      title: 'SYSTEM',
      items: [
        {
          id: 'platforms' as AppView,
          label: 'Study Station & Hub',
          icon: Globe,
          badge: platformsSafe.length || null,
          badgeColor: 'bg-indigo-500 text-white shadow-xs'
        },
        {
          id: 'settings' as AppView,
          label: 'Settings',
          icon: Settings,
          badge: null,
          badgeColor: ''
        }
      ]
    }
  ];

  // 🔍 Real-Time Raycast Navigation Filter
  const filteredSections = useMemo(() => {
    const query = navQuery.trim().toLowerCase();
    if (!query) return navSections;

    return navSections
      .map(section => ({
        ...section,
        items: section.items.filter(
          item =>
            item.label.toLowerCase().includes(query) ||
            item.id.toLowerCase().includes(query)
        )
      }))
      .filter(section => section.items.length > 0);
  }, [navSections, navQuery]);

  return (
    <aside
      className={`hidden md:flex flex-col w-[250px] h-screen fixed top-0 left-0 bg-white/90 dark:bg-[#0E101B]/90 backdrop-blur-2xl border-r border-slate-200/80 dark:border-white/[0.08] p-2.5 justify-between transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] z-30 select-none overflow-y-auto custom-scrollbar ${
        isCollapsed ? '-translate-x-full opacity-0 pointer-events-none' : 'translate-x-0 opacity-100 shadow-[1px_0_20px_rgba(15,23,42,0.04)]'
      }`}
    >

      <div className="space-y-1.5">
        {/* Tradewise-Style Header Branding & Collapse Button */}
        <div className="flex items-center justify-between gap-1.5 px-0.5 py-0.5">
          <div
            className="flex items-center gap-2 min-w-0 group cursor-pointer"
            onClick={() => {
              soundManager.playClick();
              onSelectView('overview');
            }}
            title="Go to Dashboard"
          >
            <div className="w-9 h-9 min-w-[36px] min-h-[36px] rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <img src="/logo.png" alt="Syllabus 3D Logo" className="w-full h-full object-contain drop-shadow-sm" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span
                  role="presentation"
                  className="text-[13px] font-black tracking-tight text-[#11120F] dark:text-[#F5F5F7] uppercase group-hover:text-[#2563EB] dark:group-hover:text-[#7AA2F7] transition-colors leading-none shrink-0"
                >
                  SYLLABUS 3D
                </span>
                <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/15 dark:bg-emerald-500/25 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-black tracking-widest font-mono shrink-0">
                  PRO
                </span>
              </div>
              <p className="text-xs font-medium text-slate-500 dark:text-[#94A3B8] mt-0.5 truncate">
                Discipline & Mastery
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
              className="p-1.5 rounded-xl text-[#65675F] dark:text-[#CBD5E1] hover:text-[#11120F] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] border border-transparent hover:border-[#E2E8F0] dark:hover:border-white/[0.08] transition-all cursor-pointer shrink-0 active:scale-95 group"
              title="Close sidebar (Ctrl+B)"
              aria-label="Close sidebar"
            >
              <PanelLeftClose className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
          )}
        </div>

        {/* Action Buttons: Primary Add Custom Topic + Compact Tools Row */}
        <div className="space-y-1.5">
          {onOpenAddTopic && (
            <button
              type="button"
              onClick={onOpenAddTopic}
              className="btn-primary w-full py-1.5 px-2.5 text-xs justify-center"
              title="Add Topic"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Add Topic</span>
            </button>
          )}

          <div className="grid grid-cols-2 gap-1.5">
            {onOpenAiArchitect && (
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onOpenAiArchitect();
                }}
                className="btn-secondary py-1.5 px-2 text-xs justify-center"
                title="AI Syllabus Architect (PDF & Text)"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-[#7AA2F7] shrink-0" />
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
                className="btn-secondary py-1.5 px-2 text-xs justify-center"
                title="3D Focus Chamber"
              >
                <Timer className="w-3.5 h-3.5 text-blue-600 dark:text-[#7AA2F7] shrink-0" />
                <span className="truncate">Chamber</span>
              </button>
            )}
          </div>
        </div>

        {/* Raycast-Style Quick Filter Bar */}
        <div className="relative pt-0.5">
          <div className="relative flex items-center">
            <Search className="w-3.5 h-3.5 absolute left-2.5 text-slate-400 dark:text-slate-500 pointer-events-none" />
            <input
              type="text"
              value={navQuery}
              onChange={e => setNavQuery(e.target.value)}
              placeholder="Filter views... (Alt+1..6)"
              className="w-full h-7.5 pl-8 pr-7 rounded-lg text-xs bg-slate-100/90 dark:bg-white/[0.05] border border-slate-200/80 dark:border-white/[0.08] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 dark:focus:border-purple-400/50 focus:ring-1 focus:ring-purple-500/30 transition-all font-medium"
            />
            {navQuery && (
              <button
                type="button"
                onClick={() => setNavQuery('')}
                className="absolute right-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
                title="Clear filter"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Categorized Navigation List (Raycast / Linear Pro Aesthetic) */}
        <div className="space-y-2 pt-1 border-t border-slate-200/80 dark:border-white/[0.08]">
          {filteredSections.length === 0 ? (
            <div className="py-4 text-center">
              <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">No matching views</p>
              <button
                type="button"
                onClick={() => setNavQuery('')}
                className="text-[11px] text-purple-600 dark:text-purple-400 font-bold mt-1 hover:underline cursor-pointer"
              >
                Clear filter
              </button>
            </div>
          ) : (
            filteredSections.map(section => {
              const isCollapsedSection = Boolean(collapsedSections[section.title]);
              return (
                <div key={section.title} className="space-y-0.5">
                  <button
                    type="button"
                    onClick={() => toggleSection(section.title)}
                    className="w-full flex items-center justify-between px-2 pt-1 pb-0.5 text-[10px] font-mono font-extrabold tracking-wider text-slate-400 dark:text-slate-400 uppercase group/sec cursor-pointer select-none hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{section.title}</span>
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-slate-200/70 dark:bg-white/[0.08] text-slate-600 dark:text-slate-300">
                        {section.items.length}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-3 h-3 text-slate-400 group-hover/sec:text-slate-600 dark:group-hover/sec:text-slate-300 transition-transform duration-200 ${
                        isCollapsedSection ? '-rotate-90' : 'rotate-0'
                      }`}
                    />
                  </button>

                  {!isCollapsedSection && (
                    <nav className="space-y-0.5 animate-fade-in">
                      {section.items.map(item => {
                        const Icon = item.icon;
                        const isActive = activeView === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              soundManager.playClick();
                              onSelectView(item.id);
                            }}
                            aria-current={isActive ? 'page' : undefined}
                            className={`group relative w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer select-none ${
                              isActive
                                ? 'bg-purple-500/15 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 font-black border border-purple-500/30 shadow-xs'
                                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06] hover:text-slate-900 dark:hover:text-white border border-transparent'
                            }`}
                          >
                            {/* Active Left Indicator Bar */}
                            {isActive && (
                              <div className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full bg-gradient-to-b from-purple-500 to-indigo-600 dark:from-purple-400 dark:to-cyan-400 shadow-[0_0_8px_rgba(167,139,250,0.6)]" />
                            )}

                            <div className="flex items-center gap-2.5 min-w-0">
                              {item.isDashboard ? (
                                <img
                                  src="/dashboard_icon_3d.png"
                                  alt="Dashboard"
                                  className={`w-4 h-4 object-contain shrink-0 transition-transform ${
                                    isActive ? 'scale-110 drop-shadow-sm' : 'opacity-80 group-hover:scale-110'
                                  }`}
                                />
                              ) : (
                                <Icon
                                  className={`w-4 h-4 stroke-[2.2] shrink-0 transition-transform ${
                                      isActive
                                        ? 'text-purple-600 dark:text-purple-400'
                                        : 'text-slate-400 dark:text-slate-400 group-hover:scale-110 group-hover:text-slate-700 dark:group-hover:text-white'
                                  }`}
                                />
                              )}
                              <span className="truncate text-[13px] font-bold mr-2">{item.label}</span>
                            </div>

                            {/* Badge / Pill / Keyboard Hint */}
                            <div className="flex items-center gap-1.5 ml-auto shrink-0">
                              {item.badge !== null && (
                                <span
                                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold shrink-0 ${
                                    isActive
                                      ? 'bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30'
                                      : item.badgeColor
                                  }`}
                                >
                                  {item.badge}
                                </span>
                              )}

                              {item.shortcut && !item.badge && (
                                <kbd className="opacity-0 group-hover:opacity-100 text-[9.5px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-200/70 dark:bg-white/[0.08] text-slate-500 dark:text-slate-400 transition-opacity border border-slate-300/40 dark:border-white/[0.06] shadow-2xs">
                                  ⌥{item.shortcut}
                                </kbd>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </nav>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Bottom Cards Area */}
      <div className="space-y-1.5 pt-1.5 border-t border-slate-200/80 dark:border-white/[0.08]">
        {/* Tradewise-Style Discipline Score Progress Card */}
        <div className="p-2 rounded-xl bg-slate-50/80 dark:bg-[#131522] border border-slate-200/80 dark:border-white/[0.08] space-y-1 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-bold text-slate-700 dark:text-slate-200">
              Discipline Score
            </span>
            <span className="text-[11px] font-black font-mono text-emerald-600 dark:text-emerald-400">
              {overallStatsSafe.completionPercentage}/100
            </span>
          </div>
          <div className="w-full h-1 rounded-full bg-slate-200 dark:bg-white/[0.08] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 dark:from-emerald-400 dark:to-lime-400 rounded-full transition-all duration-500"
              style={{ width: `${Math.max(5, overallStatsSafe.completionPercentage || 0)}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed break-words">
            Keep pushing — consistency beats intensity.
          </p>
        </div>

        {/* Mock Tracker Direct View Button */}
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            haptics.light();
            onSelectView('mock-tracker');
          }}
          className={`group w-full flex items-center justify-between p-1.5 px-2 rounded-xl transition-all shadow-2xs active:scale-98 cursor-pointer ${
            activeView === 'mock-tracker'
              ? 'bg-gradient-to-r from-[#00D2FF]/20 to-[#7C3AED]/20 text-[#7C3AED] dark:text-[#00D2FF] border border-[#00D2FF]/40 font-bold'
              : 'bg-white dark:bg-[#131522] border border-slate-200/80 dark:border-white/[0.08] hover:border-[#2563EB] dark:hover:border-[#7AA2F7]'
          }`}
        >
          <div className="flex items-center gap-1.5 min-w-0">
            <div className="w-5 h-5 rounded-lg bg-gradient-to-tr from-[#00D2FF] to-[#7C3AED] flex items-center justify-center text-white text-[11px] shadow-xs shrink-0">
              🏆
            </div>
            <div className="min-w-0 text-left">
              <span className={`text-[12px] font-bold block leading-tight truncate ${
                activeView === 'mock-tracker' ? 'text-[#7C3AED] dark:text-[#00D2FF]' : 'text-[#191A17] dark:text-white group-hover:text-[#2563EB] dark:group-hover:text-[#93C5FD]'
              }`}>
                Mock Tracker
              </span>
              <span className="text-[10px] text-[#65675F] dark:text-slate-300 block leading-none truncate">Score & Percentiles</span>
            </div>
          </div>
          <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full bg-[#00D2FF]/15 text-[#0284c7] dark:text-[#00D2FF] border border-[#00D2FF]/30 shrink-0">
            3D Pro
          </span>
        </button>

        {/* Product Tour & Landing Page */}
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            haptics.light();
            onSelectView('landing');
          }}
          className={`group w-full flex items-center justify-between p-1.5 px-2 rounded-xl transition-all shadow-2xs active:scale-98 cursor-pointer ${
            activeView === 'landing'
              ? 'bg-blue-600 text-white border border-blue-500 font-bold'
              : 'bg-white dark:bg-[#131522] border border-slate-200/80 dark:border-white/[0.08] hover:border-[#2563EB] dark:hover:border-[#7AA2F7]'
          }`}
        >
          <div className="flex items-center gap-1.5 min-w-0">
            <Sparkles className={`w-4 h-4 shrink-0 ${activeView === 'landing' ? 'text-white' : 'text-blue-500'}`} />
            <div className="min-w-0 text-left">
              <span className={`text-[12px] font-bold block leading-tight truncate ${activeView === 'landing' ? 'text-white' : 'text-[#191A17] dark:text-white group-hover:text-[#2563EB] dark:group-hover:text-[#93C5FD]'}`}>
                Product Overview
              </span>
              <span className={`text-[10px] block leading-none truncate ${activeView === 'landing' ? 'text-blue-100' : 'text-[#65675F] dark:text-slate-300'}`}>
                Features & Landing
              </span>
            </div>
          </div>
          <ArrowRight className={`w-3 h-3 shrink-0 ${activeView === 'landing' ? 'text-white' : 'text-slate-400'}`} />
        </button>

        {/* User Profile & Level Card */}
        <div className="p-1.5 px-2 rounded-xl bg-white dark:bg-[#131522] border border-slate-200/80 dark:border-white/[0.08] space-y-1 shadow-2xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 min-w-0">
              <div
                className={`w-6 h-6 rounded-lg bg-gradient-to-br ${
                  profileSafe.avatarColor || 'from-[#2563EB] to-indigo-600'
                } text-white dark:text-black font-black flex items-center justify-center text-[11px] shrink-0 shadow-2xs overflow-hidden`}
              >
                {profileSafe.avatarUrl ? (
                  <img
                    src={profileSafe.avatarUrl}
                    alt={profileSafe.name || 'Aspirant'}
                    className="w-full h-full object-cover"
                  />
                ) : profileSafe.avatarEmoji ? (
                  <span className="text-[11px] leading-none drop-shadow">{profileSafe.avatarEmoji}</span>
                ) : (
                  (profileSafe.name ? profileSafe.name.charAt(0).toUpperCase() : 'A')
                )}
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-[#191A17] dark:text-white truncate leading-tight">
                  {profileSafe.levelTitle || 'Novice Scholar'}
                </p>
                <p className="text-[11px] text-[#65675F] dark:text-slate-300 leading-none truncate">
                  {profileSafe.name || 'Active Profile'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <span className="px-1 py-0.5 text-[10px] font-bold rounded-md bg-[#EFF6FF] dark:bg-[#7AA2F7]/20 text-[#1D4ED8] dark:text-[#7AA2F7] font-mono border border-[#BFDBFE] dark:border-[#7AA2F7]/30 leading-none">
                Lvl {profileSafe.level || 1}
              </span>

              {onOpenProfileSwitcher && (
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    haptics.light();
                    onOpenProfileSwitcher();
                  }}
                  className="p-1 rounded-md text-slate-400 hover:text-[#2563EB] dark:hover:text-[#7AA2F7] hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
                  title="Switch Study Profile"
                  aria-label="Switch Study Profile"
                >
                  <Users className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Keyboard Shortcuts Trigger */}
        {onOpenShortcuts && (
          <button
            onClick={() => {
              soundManager.playClick();
              haptics.selection();
              onOpenShortcuts();
            }}
            className="w-full flex items-center gap-2 px-2 py-1 rounded-xl bg-white dark:bg-[#131522] border border-slate-200/80 dark:border-white/[0.08] hover:border-[#2563EB] dark:hover:border-[#7AA2F7] text-[#65675F] hover:text-[#0F172A] dark:text-[#CBD5E1] dark:hover:text-white transition-all cursor-pointer text-xs font-semibold active:scale-98 tap-bounce shadow-2xs"
            title="Keyboard Shortcuts Cheatsheet"
            aria-label="Keyboard Shortcuts Cheatsheet"
          >
            <Keyboard className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#7AA2F7]" />
            <span className="text-[11.5px] font-semibold">Keyboard Shortcuts</span>
          </button>
        )}
      </div>
    </aside>
  );
};

