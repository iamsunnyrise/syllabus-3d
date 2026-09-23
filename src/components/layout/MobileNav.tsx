import React from 'react';
import {
  CalendarCheck,
  BookOpen,
  Trophy,
  Video
} from 'lucide-react';
import { AppView } from './Sidebar';
import { soundManager } from '../../utils/soundEffects';
import { haptics } from '../../utils/haptics';
import { useTheme } from '../../context/ThemeContext';
import { useSyllabus } from '../../context/SyllabusContext';
import { SectionBadgeIcon } from '../common/SectionBadgeIcon';

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
  const { isDark } = useTheme();
  const { plannerTasks } = useSyllabus();

  const plannerTasksSafe = Array.isArray(plannerTasks) ? plannerTasks : [];
  const todayTasksCount = plannerTasksSafe.filter(t => t.status === 'today').length;

  const isSyllabusActive = activeView === 'syllabus' || activeView === 'subjects';

  const navItems = [
    {
      id: 'overview' as AppView,
      label: 'Home',
      isActive: activeView === 'overview',
      renderIcon: (active: boolean) => (
        <SectionBadgeIcon section="overview" size={24} isActive={active} />
      ),
      activeColor: 'text-indigo-600 dark:text-[#7AA2F7]',
      indicatorColor: 'bg-indigo-600 dark:bg-[#7AA2F7] shadow-[0_0_6px_rgba(79,70,229,0.6)]'
    },
    {
      id: 'syllabus' as AppView,
      label: 'Syllabus',
      isActive: isSyllabusActive,
      renderIcon: (active: boolean) => (
        <SectionBadgeIcon section="syllabus" size={24} isActive={active} />
      ),
      activeColor: 'text-indigo-600 dark:text-[#7AA2F7]',
      indicatorColor: 'bg-indigo-600 dark:bg-[#7AA2F7] shadow-[0_0_6px_rgba(79,70,229,0.6)]'
    },
    {
      id: 'mock-tracker' as AppView,
      label: 'Mocks',
      isActive: activeView === 'mock-tracker',
      renderIcon: (active: boolean) => (
        <div className="relative">
          <SectionBadgeIcon section="mock-tracker" size={24} isActive={active} />
          {active && (
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-ping opacity-75" />
          )}
        </div>
      ),
      activeColor: 'text-emerald-600 dark:text-emerald-400',
      indicatorColor: 'bg-emerald-500 dark:bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.7)]'
    },
    {
      id: 'youtube-notes' as AppView,
      label: 'Notes',
      isActive: activeView === 'youtube-notes',
      renderIcon: (active: boolean) => (
        <SectionBadgeIcon section="youtube-notes" size={24} isActive={active} />
      ),
      activeColor: 'text-rose-600 dark:text-rose-400',
      indicatorColor: 'bg-rose-500 dark:bg-rose-400 shadow-[0_0_6px_rgba(244,63,94,0.7)]'
    },
    {
      id: 'planner' as AppView,
      label: 'Planner',
      isActive: activeView === 'planner',
      renderIcon: (active: boolean) => (
        <div className="relative">
          <SectionBadgeIcon section="planner" size={24} isActive={active} />
          {todayTasksCount > 0 && (
            <span className="absolute -top-1.5 -right-2 min-w-[15px] h-3.5 px-1 rounded-full bg-blue-600 dark:bg-[#7AA2F7] text-white dark:text-slate-900 text-[8.5px] font-mono font-black flex items-center justify-center shadow-xs">
              {todayTasksCount > 9 ? '9+' : todayTasksCount}
            </span>
          )}
        </div>
      ),
      activeColor: 'text-amber-600 dark:text-amber-400',
      indicatorColor: 'bg-amber-500 dark:bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.7)]'
    }
  ];

  return (
    <nav
      aria-label="Mobile Floating Navigation Dock"
      className="md:hidden fixed bottom-2.5 left-2.5 right-2.5 sm:left-6 sm:right-6 max-w-lg mx-auto z-40 select-none pb-[calc(env(safe-area-inset-bottom,0px))] pointer-events-none animate-slide-up"
    >
      <div
        className={`pointer-events-auto flex items-center justify-between px-1.5 py-1 rounded-[26px] backdrop-blur-2xl border transition-all duration-300 relative ${
          isDark
            ? 'bg-[#0E101B]/95 border-white/[0.08] shadow-[0_16px_40px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.06)]'
            : 'bg-white/95 border-slate-200/90 shadow-[0_16px_40px_rgba(15,23,42,0.14),0_4px_12px_rgba(15,23,42,0.06)]'
        }`}
      >
        {/* Top Subtle Ambient Glass Shine Bevel */}
        <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 dark:via-purple-400/40 to-transparent pointer-events-none" />

        {navItems.map((item) => {
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                soundManager.playClick();
                haptics.light();
                onSelectView(item.id);
              }}
              className={`flex-1 min-h-[48px] flex flex-col items-center justify-center py-1 px-1 rounded-2xl tap-bounce cursor-pointer relative group transition-all duration-200 ${
                item.isActive
                  ? `${item.activeColor} font-black`
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white font-medium'
              }`}
              title={item.label}
              aria-label={item.label}
              aria-current={item.isActive ? 'page' : undefined}
            >
              {item.isActive && (
                <span className="absolute inset-x-1 inset-y-1 bg-purple-500/10 dark:bg-purple-500/20 border border-purple-500/30 rounded-xl -z-10 shadow-2xs transition-all duration-300" />
              )}
              {item.renderIcon(item.isActive)}
              <span className="text-[10px] sm:text-[11px] mt-1 tracking-tight font-sans leading-none">
                {item.label}
              </span>
              {item.isActive ? (
                <div className={`w-3.5 h-1 rounded-full ${item.indicatorColor} mt-1 transition-all duration-300`} />
              ) : (
                <div className="w-3.5 h-1 mt-1 opacity-0" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
