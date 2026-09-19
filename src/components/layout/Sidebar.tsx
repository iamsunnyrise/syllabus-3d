import React from 'react';
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
  ArrowRight
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
  | 'landing';

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

  const navSections = [
    {
      title: 'CORE MODULES',
      items: [
        {
          id: 'overview' as AppView,
          label: 'Dashboard',
          icon: LayoutDashboard,
          isDashboard: true,
          badge: null,
          badgeColor: ''
        },
        {
          id: 'syllabus' as AppView,
          label: 'Syllabus Explorer',
          icon: BookOpen,
          badge: null,
          badgeColor: ''
        },
        {
          id: 'planner' as AppView,
          label: 'Study Planner',
          icon: CalendarCheck,
          badge: plannerTasksSafe.filter(t => t.status === 'today').length || null,
          badgeColor: 'bg-[#2563EB] text-white shadow-[0_0_8px_rgba(37,99,235,0.4)]'
        },
        {
          id: 'pacing' as AppView,
          label: 'Target Pacing',
          icon: Clock,
          badge: 'Live',
          badgeColor: 'bg-emerald-500/15 dark:bg-emerald-500/25 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
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

  return (
    <aside
      className={`hidden md:flex flex-col w-[250px] h-screen fixed top-0 left-0 bg-white/95 dark:bg-[#1E293B]/95 backdrop-blur-2xl border-r border-[#DDD6FE]/80 dark:border-[#334155] p-2.5 justify-between transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] z-30 select-none overflow-y-auto custom-scrollbar ${
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

        {/* Categorized Navigation List (Tradewise Pro Aesthetic) */}
        <div className="space-y-2 pt-1 border-t border-slate-200/80 dark:border-white/[0.08]">
          {navSections.map(section => (
            <div key={section.title} className="space-y-0.5">
              <div className="px-2 pt-0.5 pb-0.5 text-[10px] font-extrabold tracking-wider text-slate-400 dark:text-slate-400 uppercase">
                {section.title}
              </div>
              <nav className="space-y-0.5">
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
                          ? 'bg-[#7C3AED] text-white font-black shadow-xs shadow-[#7C3AED]/30 dark:bg-[#7C3AED] dark:text-white'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-[#EDE9FE]/70 dark:hover:bg-white/[0.06] hover:text-[#0F172A] dark:hover:text-white'
                      }`}
                    >
                      {/* Active Left Indicator Bar */}
                      {isActive && (
                        <div className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full bg-white dark:bg-white" />
                      )}

                      <div className="flex items-center gap-2.5 min-w-0">
                        {item.isDashboard ? (
                          <img
                            src="/dashboard_icon_3d.png"
                            alt="Dashboard"
                            className={`w-4 h-4 object-contain shrink-0 transition-transform ${
                              isActive ? 'scale-110 drop-shadow-sm brightness-0 invert' : 'opacity-80 group-hover:scale-110'
                            }`}
                          />
                        ) : (
                          <Icon
                            className={`w-4 h-4 stroke-[2.2] shrink-0 transition-transform ${
                                isActive
                                  ? 'text-white'
                                  : 'text-slate-400 dark:text-slate-400 group-hover:scale-110 group-hover:text-slate-700 dark:group-hover:text-white'
                            }`}
                          />
                        )}
                        <span className="truncate text-[13px] font-bold mr-2">{item.label}</span>
                      </div>

                      {/* Badge / Pill */}
                      {item.badge !== null && (
                        <span
                          className={`ml-auto px-2 py-0.5 rounded-full text-[10px] font-mono font-bold shrink-0 ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : item.badgeColor
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Cards Area */}
      <div className="space-y-1.5 pt-1.5 border-t border-[#E2E8F0] dark:border-slate-700/60">
        {/* Tradewise-Style Discipline Score Progress Card */}
        <div className="p-2 rounded-xl bg-[#F8FAFC] dark:bg-[#383838] border border-slate-200/80 dark:border-[#444444] space-y-1 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-bold text-slate-700 dark:text-slate-200">
              Discipline Score
            </span>
            <span className="text-[11px] font-black font-mono text-emerald-600 dark:text-emerald-400">
              {overallStatsSafe.completionPercentage}/100
            </span>
          </div>
          <div className="w-full h-1 rounded-full bg-slate-200 dark:bg-[#242424] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 dark:from-emerald-400 dark:to-lime-400 rounded-full transition-all duration-500"
              style={{ width: `${Math.max(5, overallStatsSafe.completionPercentage || 0)}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed break-words">
            Keep pushing — consistency beats intensity.
          </p>
        </div>

        {/* Mock Tracker Quick Link */}
        <a
          href="https://mock-percentile-tracker.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="group w-full flex items-center justify-between p-1.5 px-2 rounded-xl bg-white dark:bg-[#383838] border border-[#E2E8F0] dark:border-[#444444] hover:border-[#2563EB] dark:hover:border-[#7AA2F7] transition-all shadow-2xs active:scale-98"
        >
          <div className="flex items-center gap-1.5 min-w-0">
            <img src="/mock_tracker_logo.png" alt="Mock Tracker" className="w-4 h-4 shrink-0 object-contain rounded-md" />
            <div className="min-w-0">
              <span className="text-[12px] font-bold text-[#191A17] dark:text-white block leading-tight group-hover:text-[#2563EB] dark:group-hover:text-[#93C5FD] truncate">
                Mock Tracker
              </span>
              <span className="text-[10px] text-[#65675F] dark:text-slate-300 block leading-none truncate">Score & Percentiles</span>
            </div>
          </div>
          <ExternalLink className="w-3 h-3 text-[#2563EB] dark:text-[#93C5FD] shrink-0" />
        </a>

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
              : 'bg-white dark:bg-[#383838] border border-[#E2E8F0] dark:border-[#444444] hover:border-[#2563EB] dark:hover:border-[#7AA2F7]'
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
        <div className="p-1.5 px-2 rounded-xl bg-white dark:bg-[#383838] border border-[#E2E8F0] dark:border-[#444444] space-y-1 shadow-2xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 min-w-0">
              <div
                className={`w-6 h-6 rounded-lg bg-gradient-to-br ${
                  profileSafe.avatarColor || 'from-[#2563EB] to-indigo-600'
                } text-white dark:text-black font-black flex items-center justify-center text-[11px] shrink-0 shadow-2xs overflow-hidden`}
              >
                {(profileSafe.avatarUrl || user?.avatarUrl) ? (
                  <img
                    src={profileSafe.avatarUrl || user?.avatarUrl}
                    alt={profileSafe.name || user?.name || 'Aspirant'}
                    className="w-full h-full object-cover"
                  />
                ) : profileSafe.avatarEmoji ? (
                  <span className="text-[11px] leading-none drop-shadow">{profileSafe.avatarEmoji}</span>
                ) : (
                  (profileSafe.name || user?.name ? (profileSafe.name || user?.name).charAt(0).toUpperCase() : 'A')
                )}
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-[#191A17] dark:text-white truncate leading-tight">
                  {profileSafe.levelTitle || 'Novice Scholar'}
                </p>
                <p className="text-[11px] text-[#65675F] dark:text-slate-300 leading-none truncate">
                  {profileSafe.name || user?.name || 'Active Profile'}
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
                  className="p-1 rounded-md text-slate-400 hover:text-[#2563EB] dark:hover:text-[#7AA2F7] hover:bg-slate-100 dark:hover:bg-[#232430] transition-colors cursor-pointer"
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
            className="w-full flex items-center gap-2 px-2 py-1 rounded-xl bg-white dark:bg-[#383838] border border-[#E2E8F0] dark:border-[#444444] hover:border-[#2563EB] dark:hover:border-[#7AA2F7] text-[#65675F] hover:text-[#0F172A] dark:text-[#CBD5E1] dark:hover:text-white transition-all cursor-pointer text-xs font-semibold active:scale-98 tap-bounce shadow-2xs"
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

