import React from 'react';
import {
  Home,
  BookOpen,
  Trophy,
  Video,
  CalendarCheck
} from 'lucide-react';
import { AppView } from './Sidebar';
import { soundManager } from '../../utils/soundEffects';
import { haptics } from '../../utils/haptics';
import { useTheme } from '../../context/ThemeContext';
import { useSyllabus } from '../../context/SyllabusContext';

interface MobileNavProps {
  activeView: AppView;
  onSelectView: (view: AppView) => void;
  onOpenAddTopic?: () => void;
  onOpenFocus?: () => void;
  onOpenMobileMenu?: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeView,
  onSelectView,
}) => {
  const { isDark, theme } = useTheme();
  const { plannerTasks } = useSyllabus();

  const plannerTasksSafe = Array.isArray(plannerTasks) ? plannerTasks : [];
  const todayTasksCount = plannerTasksSafe.filter(t => t.status === 'today').length;

  const isSyllabusActive = activeView === 'syllabus' || activeView === 'subjects';

  // 5 Signature Navigation Modules matching Magic Navigation Menu
  const navItems = [
    {
      id: 'overview' as AppView,
      label: 'Home',
      icon: Home,
      isActive: activeView === 'overview',
      accentColor: '#6366F1', // Indigo
      darkAccentColor: '#818CF8',
      glowColor: 'rgba(99, 102, 241, 0.45)',
      lightCircleBg: '#FFFFFF',
      darkCircleBg: '#181B2E',
      lightRing: '#6366F1',
      darkRing: '#818CF8'
    },
    {
      id: 'syllabus' as AppView,
      label: 'Syllabus',
      icon: BookOpen,
      isActive: isSyllabusActive,
      accentColor: '#2563EB', // Blue
      darkAccentColor: '#60A5FA',
      glowColor: 'rgba(37, 99, 235, 0.45)',
      lightCircleBg: '#FFFFFF',
      darkCircleBg: '#152238',
      lightRing: '#2563EB',
      darkRing: '#60A5FA'
    },
    {
      id: 'mock-tracker' as AppView,
      label: 'Mocks',
      icon: Trophy,
      isActive: activeView === 'mock-tracker',
      accentColor: '#059669', // Emerald
      darkAccentColor: '#34D399',
      glowColor: 'rgba(16, 185, 129, 0.45)',
      lightCircleBg: '#FFFFFF',
      darkCircleBg: '#12261E',
      lightRing: '#059669',
      darkRing: '#34D399',
      hasPing: true
    },
    {
      id: 'youtube-notes' as AppView,
      label: 'Notes',
      icon: Video,
      isActive: activeView === 'youtube-notes',
      accentColor: '#E11D48', // Rose / Red
      darkAccentColor: '#FB7185',
      glowColor: 'rgba(244, 63, 94, 0.45)',
      lightCircleBg: '#FFFFFF',
      darkCircleBg: '#2C1722',
      lightRing: '#E11D48',
      darkRing: '#FB7185',
      badgeText: 'AI'
    },
    {
      id: 'planner' as AppView,
      label: 'Planner',
      icon: CalendarCheck,
      isActive: activeView === 'planner',
      accentColor: '#D97706', // Amber
      darkAccentColor: '#FBBF24',
      glowColor: 'rgba(245, 158, 11, 0.45)',
      lightCircleBg: '#FFFFFF',
      darkCircleBg: '#2B2114',
      lightRing: '#D97706',
      darkRing: '#FBBF24',
      count: todayTasksCount
    }
  ];

  const activeIndex = navItems.findIndex(item => item.isActive);
  const activeItem = activeIndex >= 0 ? navItems[activeIndex] : null;

  // Seamless background adaptation for the dock in Dark / Light / Warm-Cream modes
  const isWarmCream = theme === 'warm-cream';
  const pageBgColor = isWarmCream ? '#FAF3E7' : isDark ? '#090A12' : '#F8FAFC';
  const navBgColor = isWarmCream ? '#FFFDF8' : isDark ? '#121422' : '#FFFFFF';

  return (
    <nav
      aria-label="Mobile Magic Navigation Dock"
      className="md:hidden fixed bottom-3 left-3 right-3 sm:left-6 sm:right-6 max-w-[420px] mx-auto z-40 select-none pb-[env(safe-area-inset-bottom,0px)] pointer-events-none animate-slide-up"
    >
      <div
        style={{
          '--nav-page-bg': pageBgColor,
          '--nav-bar-bg': navBgColor,
          '--active-color': activeItem ? (isDark ? activeItem.darkAccentColor : activeItem.accentColor) : '#6366F1',
          '--active-glow': activeItem?.glowColor || 'rgba(99, 102, 241, 0.45)',
          '--active-circle-bg': activeItem ? (isWarmCream ? '#FFFDF8' : isDark ? activeItem.darkCircleBg : activeItem.lightCircleBg) : (isWarmCream ? '#FFFDF8' : '#181B2E'),
          '--active-ring': activeItem ? (isDark ? activeItem.darkRing : activeItem.lightRing) : '#818CF8',
        } as React.CSSProperties}
        className={`pointer-events-auto relative w-full h-[64px] rounded-[24px] px-1 transition-all duration-300 ${
          isWarmCream
            ? 'bg-[#FFFDF8] border border-[#E2D1B3] shadow-[0_14px_36px_rgba(74,53,30,0.12),0_2px_8px_rgba(74,53,30,0.04)]'
            : isDark
            ? 'bg-[#121422] border border-white/[0.08] shadow-[0_16px_40px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.06)]'
            : 'bg-white border border-slate-200/90 shadow-[0_14px_36px_rgba(15,23,42,0.12),0_2px_8px_rgba(15,23,42,0.04)]'
        }`}
      >
        {/* Top Ambient Subtle Glass Bevel */}
        <div className={`absolute top-0 left-6 right-6 h-[1px] pointer-events-none ${
          isWarmCream
            ? 'bg-gradient-to-r from-transparent via-[#E1A837]/35 to-transparent'
            : 'bg-gradient-to-r from-transparent via-purple-500/30 dark:via-purple-400/30 to-transparent'
        }`} />

        {/* Sliding Magic Indicator Track & Notch Scoop Circle */}
        <div
          className="magic-nav-track"
          style={{
            transform: activeIndex >= 0 ? `translateX(${activeIndex * 100}%)` : undefined,
            opacity: activeIndex >= 0 ? 1 : 0
          }}
        >
          <div className="magic-nav-circle" />
        </div>

        {/* Nav Items List */}
        <ul className="flex items-center justify-between w-full h-full relative z-10 m-0 p-0 list-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id} className="flex-1 h-full relative">
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    haptics.light();
                    onSelectView(item.id);
                  }}
                  className="w-full h-full flex flex-col items-center justify-center cursor-pointer relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-2xl tap-bounce"
                  title={item.label}
                  aria-label={item.label}
                  aria-current={item.isActive ? 'page' : undefined}
                >
                  {/* Elevated Icon floating into the circle */}
                  <div
                    className={`relative z-20 flex items-center justify-center transition-all duration-[420ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] ${
                      item.isActive
                        ? '-translate-y-[22px] scale-110'
                        : 'translate-y-0 scale-100 text-slate-400 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                    }`}
                    style={{
                      color: item.isActive ? (isDark ? item.darkAccentColor : item.accentColor) : undefined
                    }}
                  >
                    <Icon className="w-5 h-5 stroke-[2.2]" />

                    {/* Live Ping Indicator for Mocks */}
                    {item.hasPing && item.isActive && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping opacity-75" />
                    )}

                    {/* AI Badge for Notes */}
                    {item.badgeText && (
                      <span className="absolute -top-1.5 -right-2 px-1 py-0.2 rounded-full bg-rose-500 text-white text-xs font-mono font-black shadow-xs">
                        {item.badgeText}
                      </span>
                    )}

                    {/* Tasks Count Badge for Planner */}
                    {item.count !== undefined && item.count > 0 && (
                      <span className="absolute -top-1.5 -right-2.5 min-w-[15px] h-3.5 px-1 rounded-full bg-amber-500 text-white text-xs font-mono font-black flex items-center justify-center shadow-xs">
                        {item.count > 9 ? '9+' : item.count}
                      </span>
                    )}
                  </div>

                  {/* Animated Text Label below the Scoop */}
                  <span
                    className={`absolute bottom-2 text-xs font-bold tracking-tight transition-all duration-[380ms] ease-[cubic-bezier(0.34,1.4,0.64,1)] select-none pointer-events-none ${
                      item.isActive
                        ? 'opacity-100 translate-y-0 font-black'
                        : 'opacity-0 translate-y-2 pointer-events-none'
                    }`}
                    style={{
                      color: isDark ? item.darkAccentColor : item.accentColor
                    }}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};
