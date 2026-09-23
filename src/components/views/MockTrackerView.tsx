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
import { SectionBadgeIcon } from '../common/SectionBadgeIcon';
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
      <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-white dark:bg-[#121424] border border-slate-200/90 dark:border-white/10 shadow-sm transition-colors">
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
                <ArrowLeft className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="hidden sm:inline">Back</span>
              </button>
            )}

            <SectionBadgeIcon section="mock-tracker" size="lg" />

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-white">
                  Mock Tracker 3D
                </h1>
                <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30 uppercase tracking-wide">
                  Percentile Pro
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                {settings.selectedExam || 'SSC CGL'} • Target: <span className="text-indigo-600 dark:text-indigo-400 font-bold">{settings.targetPercentile || 90}%ile</span>
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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/25 text-indigo-700 dark:text-indigo-300 text-xs font-extrabold"
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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors text-xs font-semibold cursor-pointer"
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
              className="w-8 h-8 flex items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              {isSoundEnabled ? (
                <Volume2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {/* Add Mock CTA */}
            <button
              onClick={handleOpenAddMock}
              className="px-3.5 sm:px-4 py-2 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs sm:text-[13px] font-bold shadow-md shadow-indigo-500/20 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
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
                    ? 'bg-[#4F46E5] text-white shadow-sm shadow-indigo-500/20 font-black'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-white/10'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-black ${
                    isActive ? 'bg-white/25 text-white' : 'bg-[#F43F5E] text-white'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. GOLDEN AMBER MOCK STREAK & PERCENTILE BANNER */}
      <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-gradient-to-r from-[#FFC72C] via-[#FFB703] to-[#FB8500] text-slate-950 flex items-center justify-between shadow-md shadow-amber-500/15">
        <div className="flex items-center gap-3.5 min-w-0">
          <span className="text-3xl sm:text-4xl select-none leading-none shrink-0">🔥</span>
          <div className="min-w-0">
            <div className="text-2xl sm:text-3xl font-black font-mono leading-none">
              {gamification.streakDays || 1} Day Mock Streak
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-900/85 mt-1 truncate">
              Target: {settings.targetPercentile || 90}%ile • Level {gamification.level} ({gamification.levelTitle}) • {gamification.totalXp} XP Earned
            </div>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/10 text-xs font-bold text-slate-900 shrink-0">
          <Target className="w-3.5 h-3.5 fill-current" />
          <span>{settings.selectedExam || 'SSC CGL'} Prep Track</span>
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
