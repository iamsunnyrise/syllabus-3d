import React from 'react';
import { 
  LayoutDashboard, 
  Target, 
  Zap, 
  BookOpen, 
  Layers, 
  TrendingUp, 
  BarChart2, 
  Settings as SettingsIcon,
  Plus,
  Search,
  Volume2,
  VolumeX,
  Flame,
  ArrowLeft
} from 'lucide-react';
import { MockProvider, useMocks, NavView } from '../../context/MockContext';
import { audioFX } from '../../utils/mockAudioFX';

// Sub-views
import { HomeView } from '../mock-tracker/views/HomeView';
import { MocksView } from '../mock-tracker/views/MocksView';
import { FullLengthView } from '../mock-tracker/views/FullLengthView';
import { SectionalView } from '../mock-tracker/views/SectionalView';
import { ChapterWiseView } from '../mock-tracker/views/ChapterWiseView';
import { AnalyticsView } from '../mock-tracker/views/AnalyticsView';
import { PercentileView } from '../mock-tracker/views/PercentileView';
import { SettingsView } from '../mock-tracker/views/SettingsView';

// Modals
import { AddEditMockModal } from '../mock-tracker/forms/AddEditMockModal';
import { GlobalSearchModal } from '../mock-tracker/common/GlobalSearchModal';
import { ToastContainer } from '../mock-tracker/common/ToastContainer';

const MockTrackerContent: React.FC = () => {
  const { 
    activeView, 
    setActiveView, 
    setIsAddModalOpen, 
    setEditingMock,
    setIsSearchModalOpen,
    isSoundEnabled,
    toggleSound,
    gamification,
    settings,
    navigateBack,
    canNavigateBack
  } = useMocks();

  const navTabs: { id: NavView; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4 shrink-0" /> },
    { id: 'full-length', label: 'Full Length Mocks', icon: <Target className="w-4 h-4 shrink-0" /> },
    { id: 'sectional', label: 'Sectional Drills', icon: <Zap className="w-4 h-4 shrink-0" /> },
    { id: 'chapter-wise', label: 'Chapter-Wise Hub', icon: <BookOpen className="w-4 h-4 shrink-0" />, badge: 'New' },
    { id: 'mocks', label: 'All Mock Tests', icon: <Layers className="w-4 h-4 shrink-0" /> },
    { id: 'percentile', label: 'Percentile Tracker', icon: <TrendingUp className="w-4 h-4 shrink-0" /> },
    { id: 'analytics', label: 'Analytics & Insights', icon: <BarChart2 className="w-4 h-4 shrink-0" /> },
    { id: 'settings', label: 'Settings & Data', icon: <SettingsIcon className="w-4 h-4 shrink-0" /> },
  ];

  const handleTabClick = (id: NavView) => {
    audioFX.playClickSound();
    setActiveView(id);
  };

  const handleOpenAddMock = () => {
    audioFX.playClickSound();
    setEditingMock(null);
    setIsAddModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans pb-16">
      
      {/* 1. MOCK TRACKER HEADER BAR WITH METRICS & QUICK ACTIONS */}
      <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-white dark:bg-[#0C1228] border border-[#DDD6FE]/80 dark:border-white/10 shadow-xs sm:shadow-subtle-depth transition-colors">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Brand & Target Info */}
          <div className="flex items-center gap-3">
            {canNavigateBack && (
              <button
                type="button"
                onClick={navigateBack}
                title="Go Back"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-800 dark:text-white transition-all cursor-pointer select-none active:scale-95 shadow-sm"
              >
                <ArrowLeft className="w-4 h-4 text-[#7C3AED] dark:text-[#00D2FF]" />
                <span className="hidden sm:inline">Back</span>
              </button>
            )}

            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-[#00D2FF] via-[#7C3AED] to-[#EC4899] p-0.5 shadow-glow-cyan shrink-0 flex items-center justify-center text-white">
              <span className="text-xl">🏆</span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-white">
                  Mock Tracker 3D
                </h1>
                <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-gradient-to-r from-[#00D2FF]/20 to-[#7C3AED]/20 text-[#7C3AED] dark:text-[#00D2FF] border border-[#7C3AED]/30 dark:border-[#00D2FF]/30 uppercase tracking-wide">
                  Percentile Pro
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {settings.selectedExam || 'SSC CGL'} • Target: <span className="text-[#7C3AED] dark:text-[#00D2FF] font-bold">{settings.targetPercentile || 90}%ile</span>
              </p>
            </div>
          </div>

          {/* Quick Metrics & Actions Strip */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            
            {/* Streak Badge */}
            <div 
              title={`${gamification.streakDays} Day Active Mock Streak!`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-600 dark:text-amber-400 text-xs font-bold"
            >
              <Flame className="w-3.5 h-3.5 fill-amber-500" />
              <span>{gamification.streakDays}d Streak</span>
            </div>

            {/* XP Level Badge */}
            <div 
              title={`Level ${gamification.level} (${gamification.levelTitle})`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#00D2FF]/10 border border-[#00D2FF]/25 text-[#0284c7] dark:text-[#00D2FF] text-xs font-extrabold"
            >
              <span className="text-xs">⚡</span>
              <span>Lvl {gamification.level} • {gamification.totalXp} XP</span>
            </div>

            {/* Quick Search */}
            <button
              onClick={() => {
                audioFX.playClickSound();
                setIsSearchModalOpen(true);
              }}
              title="Search Mocks (Ctrl+K)"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors text-xs font-semibold"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 rounded text-[9px] font-mono bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400">
                Ctrl+K
              </kbd>
            </button>

            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              title={isSoundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
              className="w-8 h-8 flex items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
            >
              {isSoundEnabled ? (
                <Volume2 className="w-4 h-4 text-[#00D2FF]" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {/* Add Mock CTA */}
            <button
              onClick={handleOpenAddMock}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#0F172A] to-[#7C3AED] dark:from-[#0066FF] dark:to-[#8B5CF6] text-white text-xs font-bold shadow-glow-cyan hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Log Mock</span>
            </button>

          </div>
        </div>

        {/* 2. SUB-NAVIGATION PILL TABS */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth">
          {navTabs.map(tab => {
            const isActive = activeView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 select-none cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#7C3AED] to-[#00D2FF] text-white shadow-glow-cyan font-black'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-white/10'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-black ${
                    isActive ? 'bg-white/25 text-white' : 'bg-[#EC4899] text-white shadow-glow-magenta'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. DYNAMIC SUB-VIEW CONTENT */}
      <div className="w-full">
        {activeView === 'home' && <HomeView />}
        {activeView === 'full-length' && <FullLengthView />}
        {activeView === 'sectional' && <SectionalView />}
        {activeView === 'chapter-wise' && <ChapterWiseView />}
        {activeView === 'mocks' && <MocksView />}
        {activeView === 'percentile' && <PercentileView />}
        {activeView === 'analytics' && <AnalyticsView />}
        {activeView === 'settings' && <SettingsView />}
      </div>

      {/* 4. MODALS & NOTIFICATIONS */}
      <AddEditMockModal />
      <GlobalSearchModal />
      <ToastContainer />

    </div>
  );
};

export const MockTrackerView: React.FC = () => (
  <MockProvider>
    <MockTrackerContent />
  </MockProvider>
);
