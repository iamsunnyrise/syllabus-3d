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
      className={`hidden md:flex flex-col w-[250px] h-screen fixed top-0 left-0 bg-gradient-to-b from-[#5632EA] via-[#4A26DE] to-[#3917C4] text-white p-3 justify-between transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] z-30 select-none overflow-y-auto custom-scrollbar border-r border-indigo-400/20 shadow-2xl ${
        isCollapsed ? '-translate-x-full opacity-0 pointer-events-none' : 'translate-x-0 opacity-100 shadow-[2px_0_24px_rgba(86,50,234,0.15)]'
      }`}
    >

      <div className="space-y-2">
        {/* Study Planner Header Branding */}
        <div className="flex items-center justify-between gap-1.5 px-1 pt-1 pb-2 border-b border-white/15">
          <div
            className="flex items-center gap-2.5 min-w-0 group cursor-pointer"
            onClick={() => {
              soundManager.playClick();
              onSelectView('overview');
            }}
            title="Go to Dashboard"
          >
            <div className="w-9 h-9 min-w-[36px] min-h-[36px] rounded-2xl bg-white/20 backdrop-blur-md border border-white/25 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-inner">
              <span className="text-xl">📊</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span
                  role="presentation"
                  className="text-[13px] font-black tracking-tight text-white uppercase leading-none truncate"
                >
                  Study Planner
                </span>
                <span className="px-1.5 py-0.5 rounded-full bg-white/20 border border-white/30 text-white text-[9px] font-black tracking-widest font-mono shrink-0">
                  PRO
                </span>
              </div>
              <p className="text-[11px] font-bold text-white/80 mt-0.5 truncate leading-tight">
                -- My Study Plan
              </p>
              <p className="text-[10px] font-medium text-white/60 tracking-wider mt-0.5">
                Learn. Note. Review.
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
              className="p-1.5 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all cursor-pointer shrink-0 active:scale-95 group"
              title="Close sidebar (Ctrl+B)"
              aria-label="Close sidebar"
            >
              <PanelLeftClose className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
          )}
        </div>

        {/* Action Buttons: Primary Add Custom Topic + Compact Tools Row */}
        <div className="space-y-1.5 pt-0.5">
          {onOpenAddTopic && (
            <button
              type="button"
              onClick={onOpenAddTopic}
              className="w-full py-2 px-3 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-white/25 shadow-xs transition-all active:scale-95 cursor-pointer"
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
                className="py-1.5 px-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center justify-center gap-1 border border-white/15 transition-all cursor-pointer truncate"
                title="AI Syllabus Architect (PDF & Text)"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
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
                className="py-1.5 px-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center justify-center gap-1 border border-white/15 transition-all cursor-pointer truncate"
                title="3D Focus Chamber"
              >
                <Timer className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span className="truncate">Chamber</span>
              </button>
            )}
          </div>
        </div>

        {/* Raycast-Style Quick Filter Bar */}
        <div className="relative pt-0.5">
          <div className="relative flex items-center">
            <Search className="w-3.5 h-3.5 absolute left-2.5 text-white/50 pointer-events-none" />
            <input
              type="text"
              value={navQuery}
              onChange={e => setNavQuery(e.target.value)}
              placeholder="Filter views... (Alt+1..6)"
              className="w-full h-8 pl-8 pr-7 rounded-xl text-xs bg-white/15 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:bg-white/20 focus:border-white/40 transition-all font-medium"
            />
            {navQuery && (
              <button
                type="button"
                onClick={() => setNavQuery('')}
                className="absolute right-2 text-white/60 hover:text-white p-0.5"
                title="Clear filter"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Categorized Navigation List */}
        <div className="space-y-2 pt-1 border-t border-white/15">
          {filteredSections.length === 0 ? (
            <div className="py-4 text-center">
              <p className="text-xs text-white/60 font-medium">No matching views</p>
              <button
                type="button"
                onClick={() => setNavQuery('')}
                className="text-[11px] text-cyan-300 font-bold mt-1 hover:underline cursor-pointer"
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
                    className="w-full flex items-center justify-between px-2 pt-1.5 pb-0.5 text-[10px] font-mono font-extrabold tracking-wider text-white/50 uppercase group/sec cursor-pointer select-none hover:text-white/90 transition-colors"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{section.title}</span>
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-white/15 text-white/80">
                        {section.items.length}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-3 h-3 text-white/50 group-hover/sec:text-white transition-transform duration-200 ${
                        isCollapsedSection ? '-rotate-90' : 'rotate-0'
                      }`}
                    />
                  </button>

                  {!isCollapsedSection && (
                    <nav className="space-y-1 animate-fade-in pt-0.5">
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
                            className={`group relative w-full flex items-center justify-between px-3 py-2 rounded-2xl text-[13px] font-bold transition-all duration-150 cursor-pointer select-none ${
                              isActive
                                ? 'bg-white/25 backdrop-blur-md text-white font-black border border-white/30 shadow-inner'
                                : 'text-white/80 hover:bg-white/10 hover:text-white border border-transparent'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              {item.isDashboard ? (
                                <span className="text-base leading-none shrink-0 drop-shadow-sm">📊</span>
                              ) : item.id === 'syllabus' ? (
                                <span className="text-base leading-none shrink-0 drop-shadow-sm">📚</span>
                              ) : item.id === 'planner' ? (
                                <span className="text-base leading-none shrink-0 drop-shadow-sm">📅</span>
                              ) : item.id === 'revision' ? (
                                <span className="text-base leading-none shrink-0 drop-shadow-sm">🔄</span>
                              ) : item.id === 'analytics' || item.id === 'mock-tracker' ? (
                                <span className="text-base leading-none shrink-0 drop-shadow-sm">📈</span>
                              ) : item.id === 'youtube-notes' ? (
                                <span className="text-base leading-none shrink-0 drop-shadow-sm">📝</span>
                              ) : (
                                <Icon
                                  className={`w-4 h-4 stroke-[2.2] shrink-0 transition-transform ${
                                    isActive
                                      ? 'text-white'
                                      : 'text-white/70 group-hover:scale-110 group-hover:text-white'
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
                                      ? 'bg-white/30 text-white border border-white/40'
                                      : 'bg-white/15 text-white/90 border border-white/20'
                                  }`}
                                >
                                  {item.badge}
                                </span>
                              )}

                              {item.shortcut && !item.badge && (
                                <kbd className="opacity-0 group-hover:opacity-100 text-[9.5px] font-mono font-bold px-1.5 py-0.2 rounded bg-white/20 text-white transition-opacity border border-white/20 shadow-2xs">
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
      <div className="space-y-1.5 pt-2 border-t border-white/15 text-white">
        {/* Discipline Score Progress Card */}
        <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-1 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-white/90">
              Discipline Score
            </span>
            <span className="text-xs font-black font-mono text-emerald-300">
              {overallStatsSafe.completionPercentage}/100
            </span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-white/20 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full transition-all duration-500"
              style={{ width: `${Math.max(5, overallStatsSafe.completionPercentage || 0)}%` }}
            />
          </div>
          <p className="text-[11px] text-white/70 leading-relaxed break-words">
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
          className={`group w-full flex items-center justify-between p-2 px-2.5 rounded-2xl transition-all shadow-xs active:scale-98 cursor-pointer ${
            activeView === 'mock-tracker'
              ? 'bg-white/30 text-white border border-white/40 font-black'
              : 'bg-white/10 border border-white/15 text-white/90 hover:bg-white/20'
          }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-sm">🏆</span>
            <span className="text-xs font-bold truncate">Mock Tracker 3D</span>
          </div>
          <span className="text-[10px] font-bold text-white/70 group-hover:text-white">Open →</span>
        </button>

        {/* Product Tour & Landing Page */}
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            haptics.light();
            onSelectView('landing');
          }}
          className={`group w-full flex items-center justify-between p-2 px-2.5 rounded-2xl transition-all shadow-xs active:scale-98 cursor-pointer ${
            activeView === 'landing'
              ? 'bg-white/30 text-white border border-white/40 font-black'
              : 'bg-white/10 border border-white/15 text-white/90 hover:bg-white/20'
          }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
            <span className="text-xs font-bold truncate">Features Tour</span>
          </div>
          <ArrowRight className="w-3 h-3 text-white/70 group-hover:text-white" />
        </button>

        {/* User Profile & Level Card */}
        <div className="p-2 px-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-1 shadow-sm text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <div
                className={`w-7 h-7 rounded-xl bg-gradient-to-br ${
                  profileSafe.avatarColor || 'from-[#2563EB] to-indigo-600'
                } text-white font-black flex items-center justify-center text-xs shrink-0 shadow-xs overflow-hidden border border-white/20`}
              >
                {profileSafe.avatarUrl ? (
                  <img
                    src={profileSafe.avatarUrl}
                    alt={profileSafe.name || 'Aspirant'}
                    className="w-full h-full object-cover"
                  />
                ) : profileSafe.avatarEmoji ? (
                  <span className="text-xs leading-none drop-shadow">{profileSafe.avatarEmoji}</span>
                ) : (
                  (profileSafe.name ? profileSafe.name.charAt(0).toUpperCase() : 'A')
                )}
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-white truncate leading-tight">
                  {profileSafe.levelTitle || 'Novice Scholar'}
                </p>
                <p className="text-[10px] text-white/70 leading-none truncate">
                  {profileSafe.name || 'Active Profile'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-lg bg-white/20 text-white font-mono border border-white/25 leading-none">
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

