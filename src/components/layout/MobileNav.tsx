import React from 'react';
import {
  CalendarCheck,
  BookOpen,
  Plus,
  Compass
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
  onOpenAddTopic,
  onOpenFocus,
  onOpenMobileMenu
}) => {
  const { isDark } = useTheme();
  const { dueRevisions } = useSyllabus();

  const isHubActive = ['platforms', 'revision', 'weak', 'mindmap', 'analytics', 'settings', 'youtube-notes'].includes(activeView);
  const dueCount = Array.isArray(dueRevisions) ? dueRevisions.length : 0;

  return (
    <nav className="md:hidden fixed bottom-3 left-3 right-3 sm:left-6 sm:right-6 max-w-md mx-auto z-40 select-none pb-[calc(env(safe-area-inset-bottom,0px))] pointer-events-none animate-slide-up">
      <div
        className={`pointer-events-auto flex items-center justify-between px-2 py-1.5 rounded-[26px] backdrop-blur-2xl border transition-all duration-300 relative ${
          isDark
            ? 'bg-[#1E293B]/95 border-[#334155] shadow-[0_16px_40px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.06)]'
            : 'bg-white/96 border-slate-200/90 shadow-[0_16px_40px_rgba(15,23,42,0.12),0_4px_12px_rgba(15,23,42,0.06)]'
        }`}
      >
        {/* Top Subtle Ambient Glass Shine Bevel */}
        <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 dark:via-[#7AA2F7]/35 to-transparent pointer-events-none" />

        {/* Item 1: Home Dashboard */}
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            haptics.light();
            onSelectView('overview');
          }}
          className={`flex-1 min-h-[46px] flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl tap-bounce cursor-pointer relative group transition-all duration-200 ${
            activeView === 'overview'
              ? 'text-blue-600 dark:text-[#7AA2F7] font-black'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white font-medium'
          }`}
          title="Home Dashboard"
          aria-label="Home Dashboard"
          aria-current={activeView === 'overview' ? 'page' : undefined}
        >
          {activeView === 'overview' && (
            <span className="absolute inset-x-1 inset-y-1 bg-blue-600/[0.08] dark:bg-[#7AA2F7]/[0.14] border border-blue-500/15 dark:border-[#7AA2F7]/25 rounded-xl -z-10 shadow-2xs transition-all duration-300" />
          )}
          <img
            src="/dashboard_icon_3d.png"
            alt="Dashboard"
            className={`w-5 h-5 object-contain transition-all duration-200 ${
              activeView === 'overview' ? 'scale-110 -translate-y-0.5 drop-shadow-sm' : 'opacity-75 group-hover:opacity-100 group-hover:scale-105'
            }`}
          />
          <span className="text-[10.5px] mt-1 tracking-tight font-sans leading-none">Home</span>
          {activeView === 'overview' ? (
            <div className="w-3.5 h-1 rounded-full bg-blue-600 dark:bg-[#7AA2F7] mt-1 shadow-[0_0_6px_rgba(37,99,235,0.6)] dark:shadow-[0_0_6px_rgba(122,162,247,0.6)]" />
          ) : (
            <div className="w-3.5 h-1 mt-1" />
          )}
        </button>

        {/* Item 2: Syllabus Explorer */}
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            haptics.light();
            onSelectView('syllabus');
          }}
          className={`flex-1 min-h-[46px] flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl tap-bounce cursor-pointer relative group transition-all duration-200 ${
            activeView === 'syllabus'
              ? 'text-blue-600 dark:text-[#7AA2F7] font-black'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white font-medium'
          }`}
          title="Syllabus Explorer"
          aria-label="Syllabus Explorer"
          aria-current={activeView === 'syllabus' ? 'page' : undefined}
        >
          {activeView === 'syllabus' && (
            <span className="absolute inset-x-1 inset-y-1 bg-blue-600/[0.08] dark:bg-[#7AA2F7]/[0.14] border border-blue-500/15 dark:border-[#7AA2F7]/25 rounded-xl -z-10 shadow-2xs transition-all duration-300" />
          )}
          <BookOpen
            className={`w-5 h-5 transition-all duration-200 ${
              activeView === 'syllabus' ? 'scale-110 -translate-y-0.5 stroke-[2.5]' : 'stroke-[2] opacity-75 group-hover:opacity-100 group-hover:scale-105'
            }`}
          />
          <span className="text-[10.5px] mt-1 tracking-tight font-sans leading-none">Syllabus</span>
          {activeView === 'syllabus' ? (
            <div className="w-3.5 h-1 rounded-full bg-blue-600 dark:bg-[#7AA2F7] mt-1 shadow-[0_0_6px_rgba(37,99,235,0.6)] dark:shadow-[0_0_6px_rgba(122,162,247,0.6)]" />
          ) : (
            <div className="w-3.5 h-1 mt-1" />
          )}
        </button>

        {/* Center Primary Floating Action Orb (Add Target) */}
        <div className="flex items-center justify-center px-1.5">
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              haptics.medium();
              if (onOpenAddTopic) onOpenAddTopic();
            }}
            className="relative w-12 h-12 -translate-y-2.5 rounded-full bg-gradient-to-tr from-[#2563EB] via-indigo-600 to-purple-600 text-white shadow-[0_8px_20px_rgba(37,99,235,0.45),0_2px_6px_rgba(0,0,0,0.1)] border-2 border-white dark:border-slate-800 flex items-center justify-center tap-bounce cursor-pointer group active:scale-90 active:translate-y-0 transition-all duration-200"
            title="Add Custom Study Target"
            aria-label="Add Target"
          >
            {/* Ambient Pulse Ring */}
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-30 blur-sm group-hover:opacity-60 transition-opacity -z-10 animate-pulse" />
            <Plus className="w-6 h-6 stroke-[3] transition-transform duration-300 group-hover:rotate-90" />
          </button>
        </div>

        {/* Item 3: Planner */}
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            haptics.light();
            onSelectView('planner');
          }}
          className={`flex-1 min-h-[46px] flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl tap-bounce cursor-pointer relative group transition-all duration-200 ${
            activeView === 'planner'
              ? 'text-blue-600 dark:text-[#7AA2F7] font-black'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white font-medium'
          }`}
          title="Daily Planner"
          aria-label="Study Planner"
          aria-current={activeView === 'planner' ? 'page' : undefined}
        >
          {activeView === 'planner' && (
            <span className="absolute inset-x-1 inset-y-1 bg-blue-600/[0.08] dark:bg-[#7AA2F7]/[0.14] border border-blue-500/15 dark:border-[#7AA2F7]/25 rounded-xl -z-10 shadow-2xs transition-all duration-300" />
          )}
          <CalendarCheck
            className={`w-5 h-5 transition-all duration-200 ${
              activeView === 'planner' ? 'scale-110 -translate-y-0.5 stroke-[2.5]' : 'stroke-[2] opacity-75 group-hover:opacity-100 group-hover:scale-105'
            }`}
          />
          <span className="text-[10.5px] mt-1 tracking-tight font-sans leading-none">Planner</span>
          {activeView === 'planner' ? (
            <div className="w-3.5 h-1 rounded-full bg-blue-600 dark:bg-[#7AA2F7] mt-1 shadow-[0_0_6px_rgba(37,99,235,0.6)] dark:shadow-[0_0_6px_rgba(122,162,247,0.6)]" />
          ) : (
            <div className="w-3.5 h-1 mt-1" />
          )}
        </button>

        {/* Item 4: More / Hub Drawer */}
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            haptics.light();
            if (onOpenMobileMenu) {
              onOpenMobileMenu();
            } else if (onOpenFocus) {
              onOpenFocus();
            }
          }}
          className={`flex-1 min-h-[46px] flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl tap-bounce cursor-pointer relative group transition-all duration-200 ${
            isHubActive
              ? 'text-blue-600 dark:text-[#7AA2F7] font-black'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white font-medium'
          }`}
          title="More Sections & Tools"
          aria-label="Navigation Hub"
          aria-current={(activeView === 'analytics' || isHubActive) ? 'page' : undefined}
        >
          {isHubActive && (
            <span className="absolute inset-x-1 inset-y-1 bg-blue-600/[0.08] dark:bg-[#7AA2F7]/[0.14] border border-blue-500/15 dark:border-[#7AA2F7]/25 rounded-xl -z-10 shadow-2xs transition-all duration-300" />
          )}
          <div className="relative">
            <Compass
              className={`w-5 h-5 transition-all duration-200 ${
                isHubActive ? 'scale-110 -translate-y-0.5 stroke-[2.5]' : 'stroke-[2] opacity-75 group-hover:opacity-100 group-hover:scale-105'
              }`}
            />
            {dueCount > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-[15px] h-3.5 px-1 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 text-white text-[8.5px] font-mono font-black flex items-center justify-center shadow-xs border border-white dark:border-[#1E293B]">
                {dueCount > 9 ? '9+' : dueCount}
              </span>
            )}
          </div>
          <span className="text-[10.5px] mt-1 tracking-tight font-sans leading-none">Hub</span>
          {isHubActive ? (
            <div className="w-3.5 h-1 rounded-full bg-blue-600 dark:bg-[#7AA2F7] mt-1 shadow-[0_0_6px_rgba(37,99,235,0.6)] dark:shadow-[0_0_6px_rgba(122,162,247,0.6)]" />
          ) : (
            <div className="w-3.5 h-1 mt-1" />
          )}
        </button>
      </div>
    </nav>
  );
};

