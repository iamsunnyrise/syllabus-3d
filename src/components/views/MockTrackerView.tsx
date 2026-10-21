import React, { lazy, Suspense } from 'react';
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

// Fast synchronous core views
import { HomeView } from '../mock-tracker/views/HomeView';
import { MocksView } from '../mock-tracker/views/MocksView';
import { ToastContainer } from '../mock-tracker/common/ToastContainer';

// Lazy-loaded heavy sub-views (charts & analytics)
const FullLengthView = lazy(() => import('../mock-tracker/views/FullLengthView').then(m => ({ default: m.FullLengthView })));
const SectionalView = lazy(() => import('../mock-tracker/views/SectionalView').then(m => ({ default: m.SectionalView })));
const ChapterWiseView = lazy(() => import('../mock-tracker/views/ChapterWiseView').then(m => ({ default: m.ChapterWiseView })));
const AnalyticsView = lazy(() => import('../mock-tracker/views/AnalyticsView').then(m => ({ default: m.AnalyticsView })));
const PercentileView = lazy(() => import('../mock-tracker/views/PercentileView').then(m => ({ default: m.PercentileView })));
const SettingsView = lazy(() => import('../mock-tracker/views/SettingsView').then(m => ({ default: m.SettingsView })));

// Lazy-loaded modals (100KB+ deferred until user clicks)
const AddEditMockModal = lazy(() => import('../mock-tracker/forms/AddEditMockModal').then(m => ({ default: m.AddEditMockModal })));
const GlobalSearchModal = lazy(() => import('../mock-tracker/common/GlobalSearchModal').then(m => ({ default: m.GlobalSearchModal })));

const MockTrackerContent: React.FC = () => {
  const { 
    activeView, 
    setActiveView, 
    isAddModalOpen,
    editingMock,
    isSearchModalOpen,
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
    { id: 'full-length', label: 'Full Length', icon: <Target className="w-4 h-4 shrink-0" /> },
    { id: 'sectional', label: 'Sectionals', icon: <Zap className="w-4 h-4 shrink-0" /> },
    { id: 'chapter-wise', label: 'Chapter-Wise', icon: <BookOpen className="w-4 h-4 shrink-0" /> },
    { id: 'mocks', label: 'All Mocks', icon: <Layers className="w-4 h-4 shrink-0" /> },
    { id: 'percentile', label: 'Percentile', icon: <TrendingUp className="w-4 h-4 shrink-0" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart2 className="w-4 h-4 shrink-0" /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon className="w-4 h-4 shrink-0" /> },
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
    <div className="space-y-6 animate-fade-in font-sans pb-36 sm:pb-24">
      
      {/* 1. MOCK TRACKER HEADER BAR WITH METRICS & QUICK ACTIONS */}
      <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-white dark:bg-[#121424] border border-slate-200/90 dark:border-white/10 shadow-sm transition-colors">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Brand & Target Info */}
          <div className="flex items-center gap-3 min-w-0">
            {canNavigateBack && (
              <button
                type="button"
                onClick={navigateBack}
                title="Go Back"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-800 dark:text-white transition-all cursor-pointer select-none active:scale-95 shadow-sm shrink-0"
              >
                <ArrowLeft className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="hidden sm:inline">Back</span>
              </button>
            )}

            <SectionBadgeIcon section="mock-tracker" size="lg" />

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-white">
                  Mock Tracker
                </h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-[11px] font-bold">
                  {settings.selectedExam || 'SSC CGL'}
                </span>
                <span className="text-slate-300 dark:text-slate-600">•</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Target: <span className="text-indigo-600 dark:text-indigo-400 font-bold tabular-nums">{settings.targetPercentile || 90}%ile</span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Metrics & Actions Strip */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            
            {/* Streak Badge */}
            <div 
              title={`${gamification.streakDays} Day Active Mock Streak!`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-600 dark:text-amber-400 text-xs font-bold font-sans tabular-nums"
            >
              <Flame className="w-3.5 h-3.5 fill-amber-500" />
              <span>{gamification.streakDays}d Streak</span>
            </div>

            {/* XP Level Badge */}
            <div 
              title={`Level ${gamification.level} (${gamification.levelTitle})`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/25 text-indigo-700 dark:text-indigo-300 text-xs font-extrabold font-sans tabular-nums"
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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors text-xs font-semibold cursor-pointer active:scale-95"
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
              className="w-8 h-8 flex items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer active:scale-95"
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
              className="px-3.5 sm:px-4 py-2 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs sm:text-[13px] font-bold shadow-md shadow-indigo-500/20 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
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

      {/* 2. DYNAMIC SUB-VIEW CONTENT */}
      <div className="w-full">
        {activeView === 'home' && <HomeView />}
        {activeView === 'mocks' && <MocksView />}
        <Suspense fallback={
          <div className="w-full h-72 flex flex-col items-center justify-center rounded-2xl bg-slate-100/60 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/5 animate-pulse">
            <BarChart2 className="w-8 h-8 text-blue-500 animate-spin mb-3" />
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Loading Analytics...</span>
          </div>
        }>
          {activeView === 'full-length' && <FullLengthView />}
          {activeView === 'sectional' && <SectionalView />}
          {activeView === 'chapter-wise' && <ChapterWiseView />}
          {activeView === 'percentile' && <PercentileView />}
          {activeView === 'analytics' && <AnalyticsView />}
          {activeView === 'settings' && <SettingsView />}
        </Suspense>
      </div>

      {/* 4. MODALS & NOTIFICATIONS */}
      <Suspense fallback={null}>
        {(isAddModalOpen || editingMock) && <AddEditMockModal />}
        {isSearchModalOpen && <GlobalSearchModal />}
      </Suspense>
      <ToastContainer />

    </div>
  );
};

export const MockTrackerView: React.FC = () => (
  <MockProvider>
    <MockTrackerContent />
  </MockProvider>
);
