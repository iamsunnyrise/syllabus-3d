import React, { useState, useEffect } from 'react';
import {
  Home,
  CalendarCheck,
  RotateCw,
  AlertTriangle,
  BrainCircuit,
  BookOpen,
  Settings,
  Plus,
  BarChart3,
  Timer,
  Globe,
  Keyboard,
  Clock,
  PanelLeftClose,
  Sparkles,
  Video,
  Trophy,
  ChevronDown,
  User,
  FileText,
  Radio,
  Bookmark,
  LogOut,
  Folder
} from 'lucide-react';
import { useSyllabus } from '../../context/SyllabusContext';
import { useAuth } from '../../context/AuthContext';
import { soundManager } from '../../utils/soundEffects';
import { haptics } from '../../utils/haptics';
import { BrandEmblemLogo } from '../common/BrandEmblemLogo';

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
  onOpenPricing,
  isCollapsed = false,
  onToggleCollapse
}) => {
  const { profile, dueRevisions, weakTopics, plannerTasks, platforms, currentExam } = useSyllabus();
  const { user, logout } = useAuth();

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
      title: 'TESTS',
      items: [
        {
          id: 'mock-tracker',
          label: 'ProMocks',
          icon: FileText,
          shortcut: '6'
        },
        {
          id: 'mock-tracker',
          label: 'FREE Live Mock',
          icon: Radio
        },
        {
          id: 'syllabus',
          label: 'Syllabus Explorer',
          icon: BookOpen,
          shortcut: '2'
        },
        {
          id: 'revision',
          label: 'Spaced Revision',
          icon: RotateCw,
          badge: dueRevisionsSafe.length ? `${dueRevisionsSafe.length}` : null,
          badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
        }
      ]
    },
    {
      title: 'MY ACCOUNT',
      items: [
        {
          id: 'settings',
          label: 'My profile',
          icon: User
        },
        {
          id: 'analytics',
          label: 'Performance',
          icon: BarChart3
        },
        {
          id: 'weak',
          label: 'Saved Question',
          icon: Bookmark,
          badge: weakTopicsSafe.length || null,
          badgeColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
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
      ]
    }
  ];

  return (
    <aside
      className={`hidden md:flex flex-col w-[260px] h-screen fixed top-0 left-0 bg-white dark:bg-[#0E101B] text-slate-800 dark:text-slate-200 p-3.5 justify-between transition-colors duration-300 ease-[cubic-bezier(0.2,0,0,1)] z-30 select-none overflow-y-auto custom-scrollbar border-r border-slate-200/80 dark:border-white/[0.08] shadow-sm dark:shadow-[2px_0_24px_rgba(0,0,0,0.5)] ${
        isCollapsed ? '-translate-x-full opacity-0 pointer-events-none' : 'translate-x-0 opacity-100'
      }`}
    >
      <div className="space-y-3">
        {/* 1. Header Branding: Golden Crest Logo + "THE PUNDITS" */}
        <div className="flex items-center justify-between gap-2 px-1 pt-0.5 pb-2 border-b border-slate-200/70 dark:border-white/10">
          <div
            className="flex items-center gap-2.5 min-w-0 flex-1 group cursor-pointer"
            onClick={() => {
              soundManager.playClick();
              onSelectView('overview');
            }}
            title="Go to Home"
          >
            <BrandEmblemLogo size="sm" />
            <div className="min-w-0 flex-1">
              <span className="text-sm font-black tracking-tight text-slate-900 dark:text-white uppercase font-serif block leading-none">
                THE PUNDITS
              </span>
              <p className="text-[10px] font-bold text-amber-600 dark:text-amber-400 tracking-wider font-mono truncate mt-0.5">
                {currentExam?.name || 'SSC CGL 2026'}
              </p>
            </div>
          </div>
        </div>

        {/* 2. User Profile Box (Exact Match with Reference Image) */}
        <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0 overflow-hidden font-bold text-xs border border-slate-300/60 dark:border-white/15">
              {profileSafe.avatarUrl ? (
                <img src={profileSafe.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : profileSafe.avatarEmoji ? (
                <span>{profileSafe.avatarEmoji}</span>
              ) : (
                <User className="w-5 h-5 text-slate-500 dark:text-slate-400" />
              )}
            </div>
            <div className="truncate min-w-0">
              <p className="text-xs font-bold text-slate-900 dark:text-white truncate leading-tight">
                {user?.name || profileSafe.name || 'Guest User'}
              </p>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate leading-none mt-0.5">
                Signed in
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
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-white/10 transition-colors cursor-pointer shrink-0 active:scale-95"
              title="Collapse sidebar (Ctrl+B)"
              aria-label="Collapse sidebar"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* 3. Primary Top Navigation (Home & Daily Practice Schedule) */}
        <div className="space-y-1">
          {/* Home Link */}
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onSelectView('overview');
            }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-2xl text-xs sm:text-sm transition-all duration-150 cursor-pointer select-none font-bold ${
              activeView === 'overview'
                ? 'bg-[#FFF4D2] text-[#8C6B00] border border-[#FDE68A] shadow-xs dark:bg-[#F59E0B]/20 dark:text-[#FCD34D] dark:border-[#F59E0B]/30'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-white/[0.06] hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Home className="w-4 h-4 stroke-[2.2]" />
            <span className="truncate">Home</span>
          </button>

          {/* Daily Practice Schedule Link */}
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onSelectView('planner');
            }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-2xl text-xs sm:text-sm transition-all duration-150 cursor-pointer select-none font-semibold ${
              activeView === 'planner'
                ? 'bg-[#FFF4D2] text-[#8C6B00] border border-[#FDE68A] shadow-xs dark:bg-[#F59E0B]/20 dark:text-[#FCD34D] dark:border-[#F59E0B]/30 font-bold'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-white/[0.06] hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <Folder className="w-4 h-4 stroke-[2.2]" />
              <span className="truncate">Daily Practice Schedule</span>
            </div>
            {plannerTasksSafe.filter(t => t.status === 'today').length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[11px] font-mono font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300">
                {plannerTasksSafe.filter(t => t.status === 'today').length}
              </span>
            )}
          </button>
        </div>

        {/* 4. Categorized Sections (TESTS & MY ACCOUNT) */}
        <div className="space-y-3 pt-1 border-t border-slate-200/70 dark:border-white/10">
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
                  <nav className="space-y-0.5 pt-0.5">
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
                          className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs sm:text-sm transition-all duration-150 cursor-pointer select-none font-medium ${
                            isActive
                              ? 'bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white font-bold'
                              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100/70 dark:hover:bg-white/[0.05] hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0 flex-1">
                            <Icon className="w-4 h-4 shrink-0 text-slate-500 dark:text-slate-400" />
                            <span className="truncate">{item.label}</span>
                          </div>

                          {/* Badge or Shortcut */}
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

          {/* 5. Red Logout Button */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                if (window.confirm('Are you sure you want to log out of your session?')) {
                  logout?.();
                }
              }}
              className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4 stroke-[2.2]" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Area: Keyboard Shortcuts & Quick Tools */}
      <div className="space-y-1.5 pt-2 border-t border-slate-200/80 dark:border-white/10 text-slate-800 dark:text-white">
        <div className="grid grid-cols-2 gap-1.5">
          {onOpenAiArchitect && (
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onOpenAiArchitect();
              }}
              className="py-1 px-2 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 border border-slate-200/80 dark:border-white/[0.08] transition-all cursor-pointer truncate"
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
              className="py-1 px-2 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 border border-slate-200/80 dark:border-white/[0.08] transition-all cursor-pointer truncate"
              title="Focus Mode"
            >
              <Timer className="w-3.5 h-3.5 text-[#FF6105]" />
              <span className="truncate">Focus</span>
            </button>
          )}
        </div>

        {onOpenShortcuts && (
          <button
            onClick={() => {
              soundManager.playClick();
              haptics.selection();
              onOpenShortcuts();
            }}
            className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-[#131522] border border-slate-200/80 dark:border-white/[0.08] hover:border-amber-500 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-all cursor-pointer text-xs font-semibold"
            title="Keyboard Shortcuts Cheatsheet"
          >
            <Keyboard className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-xs font-semibold">Shortcuts Cheatsheet</span>
          </button>
        )}
      </div>
    </aside>
  );
};
