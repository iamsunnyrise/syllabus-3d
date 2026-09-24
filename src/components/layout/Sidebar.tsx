import React, { useState, useEffect } from 'react';
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
  Video,
  Trophy,
  ChevronDown
} from 'lucide-react';
import { useSyllabus } from '../../context/SyllabusContext';
import { useAuth } from '../../context/AuthContext';
import { soundManager } from '../../utils/soundEffects';
import { haptics } from '../../utils/haptics';
import { SectionBadgeIcon } from '../common/SectionBadgeIcon';

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
  const { profile, dueRevisions, weakTopics, plannerTasks, platforms, currentExam } = useSyllabus();
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

  // Collapsible Groups State
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
          badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20',
          shortcut: '3'
        },
        {
          id: 'pacing' as AppView,
          label: 'Target Pacing',
          icon: Clock,
          badge: 'Live',
          badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
          shortcut: '4'
        },
        {
          id: 'youtube-notes' as AppView,
          label: 'AI YouTube Notes',
          icon: Video,
          badge: 'AI',
          badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20',
          shortcut: '5'
        },
        {
          id: 'mock-tracker' as AppView,
          label: 'Mock Test Tracker',
          icon: Trophy,
          badge: '3D Pro',
          badgeColor: 'bg-indigo-500/10 text-indigo-600 dark:text-cyan-400 border border-indigo-500/20',
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
          badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
        },
        {
          id: 'weak' as AppView,
          label: 'Weak Topics',
          icon: AlertTriangle,
          badge: weakTopicsSafe.length || null,
          badgeColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
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
          badgeColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20'
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

  return (
    <aside
      className={`hidden md:flex flex-col w-[272px] h-screen fixed top-0 left-0 bg-white dark:bg-[#0E101B] text-slate-800 dark:text-slate-200 p-3 justify-between transition-colors duration-300 ease-[cubic-bezier(0.2,0,0,1)] z-30 select-none overflow-y-auto custom-scrollbar border-r border-slate-200/80 dark:border-white/[0.08] shadow-sm dark:shadow-[2px_0_24px_rgba(0,0,0,0.5)] ${
        isCollapsed ? '-translate-x-full opacity-0 pointer-events-none' : 'translate-x-0 opacity-100'
      }`}
    >
      <div className="space-y-2">
        {/* Study Planner Header Branding */}
        <div className="flex items-center justify-between gap-1.5 px-1 pt-0.5 pb-2.5 border-b border-slate-200/80 dark:border-white/10">
          <div
            className="flex items-center gap-2.5 min-w-0 flex-1 group cursor-pointer"
            onClick={() => {
              soundManager.playClick();
              onSelectView('overview');
            }}
            title="Go to Dashboard"
          >
            <div className="w-9 h-9 min-w-[36px] min-h-[36px] rounded-xl overflow-hidden flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-sm shadow-indigo-500/20 bg-black border border-indigo-500/30">
              <img src="/logo.png" alt="Study Planner Logo" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span
                  role="presentation"
                  className="text-[13px] font-black tracking-tight text-slate-900 dark:text-white uppercase leading-none shrink-0"
                >
                  Study Planner
                </span>
                <span className="px-1.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/80 text-indigo-600 dark:text-indigo-400 text-[9px] font-black tracking-wider font-mono shrink-0">
                  PRO
                </span>
              </div>
              <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-1 truncate leading-tight">
                {currentExam?.name ? currentExam.name : 'Personal Study Plan'}
              </p>
              <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400 dark:text-slate-500 tracking-wider mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span>Learn • Note • Revise</span>
              </div>
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
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer shrink-0 active:scale-95 group"
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
              className="w-full py-2 px-3 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] active:scale-[0.98] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm shadow-indigo-500/20 transition-all cursor-pointer"
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
                className="py-1.5 px-2 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 border border-slate-200/80 dark:border-white/[0.08] transition-all cursor-pointer truncate active:scale-[0.98]"
                title="AI Syllabus Architect (PDF & Text)"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
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
                className="py-1.5 px-2 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 border border-slate-200/80 dark:border-white/[0.08] transition-all cursor-pointer truncate active:scale-[0.98]"
                title="3D Focus Chamber"
              >
                <Timer className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 shrink-0" />
                <span className="truncate">Chamber</span>
              </button>
            )}
          </div>
        </div>

        {/* Categorized Navigation List */}
        <div className="space-y-1.5 pt-1.5 border-t border-slate-200/80 dark:border-white/10">
          {navSections.map(section => {
            const isCollapsedSection = Boolean(collapsedSections[section.title]);
            return (
              <div key={section.title} className="space-y-0.5">
                <button
                  type="button"
                  onClick={() => toggleSection(section.title)}
                  className="w-full flex items-center justify-between px-2 pt-2 pb-0.5 text-[10px] font-mono font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase group/sec cursor-pointer select-none hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>{section.title}</span>
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400">
                      {section.items.length}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-3 h-3 text-slate-400 dark:text-slate-500 group-hover/sec:text-slate-700 dark:group-hover/sec:text-slate-300 transition-transform duration-200 ${
                      isCollapsedSection ? '-rotate-90' : 'rotate-0'
                    }`}
                  />
                </button>

                {!isCollapsedSection && (
                    <nav className="space-y-0.5 animate-fade-in pt-0.5">
                      {section.items.map(item => {
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
                            className={`group relative w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-[13px] transition-all duration-150 cursor-pointer select-none ${
                              isActive
                                ? 'bg-[#4F46E5] text-white font-bold shadow-sm shadow-indigo-500/25'
                                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-white/[0.06] hover:text-slate-900 dark:hover:text-white font-medium'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0 flex-1">
                              <SectionBadgeIcon
                                section={item.id}
                                size="sm"
                                isActive={isActive}
                              />
                              <span className="truncate text-[13px] leading-tight">
                                {item.label}
                              </span>
                            </div>

                            {/* Badge / Pill / Keyboard Hint */}
                            <div className="flex items-center gap-1.5 ml-2 shrink-0">
                              {item.badge !== null && (
                                <span
                                  className={`px-1.5 py-0.5 rounded-md text-[9.5px] font-mono font-bold shrink-0 ${
                                    isActive
                                      ? 'bg-white/20 text-white border border-white/25'
                                      : item.badgeColor
                                  }`}
                                >
                                  {item.badge}
                                </span>
                              )}

                              {item.shortcut && !item.badge && (
                                <kbd className="opacity-0 group-hover:opacity-100 text-[9px] font-mono font-medium px-1.5 py-0.2 rounded bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400 transition-opacity border border-slate-200 dark:border-white/15">
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
            })}
        </div>
      </div>

      {/* Bottom Cards Area */}
      <div className="space-y-1.5 pt-2 border-t border-slate-200/80 dark:border-white/10 text-slate-800 dark:text-white">
        {/* User Profile & Level Card */}
        <div className="p-2 px-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.08] space-y-1 shadow-2xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <div
                className={`w-7 h-7 rounded-xl bg-gradient-to-br ${
                  profileSafe.avatarColor || 'from-[#2563EB] to-indigo-600'
                } text-white font-black flex items-center justify-center text-xs shrink-0 shadow-xs overflow-hidden border border-slate-200 dark:border-white/20`}
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
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate leading-tight">
                  {profileSafe.levelTitle || 'Novice Scholar'}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-white/60 leading-none truncate mt-0.5">
                  {profileSafe.name || 'Active Profile'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-lg bg-slate-200/80 dark:bg-white/15 text-slate-700 dark:text-white font-mono border border-slate-300/80 dark:border-white/20 leading-none">
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
                  className="p-1 rounded-md text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-200/60 dark:hover:bg-white/[0.08] transition-colors cursor-pointer"
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
            className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-[#131522] border border-slate-200/80 dark:border-white/[0.08] hover:border-indigo-500 dark:hover:border-indigo-400 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-all cursor-pointer text-xs font-semibold active:scale-[0.98] tap-bounce shadow-2xs"
            title="Keyboard Shortcuts Cheatsheet"
            aria-label="Keyboard Shortcuts Cheatsheet"
          >
            <Keyboard className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span className="text-[11.5px] font-semibold">Keyboard Shortcuts</span>
          </button>
        )}
      </div>
    </aside>
  );
};

