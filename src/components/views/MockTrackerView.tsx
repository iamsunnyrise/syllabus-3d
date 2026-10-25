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
      
      {/* 1. MOCK TRACKER HEADER BAR WITH STREAMLINED CONTROLS */}
      <div className="rounded-2xl sm:rounded-3xl p-3.5 sm:p-4.5 bg-white dark:bg-[#121424] border border-slate-200/90 dark:border-white/10 shadow-xs transition-colors space-y-3">
        <div className="flex items-center justify-between gap-3">
          
          {/* Left: Brand, Exam & Target Info */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            {canNavigateBack && (
              <button
                type="button"
                onClick={navigateBack}
                title="Go Back"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-800 dark:text-white transition-all cursor-pointer select-none active:scale-95 shadow-2xs shrink-0"
              >
                <ArrowLeft className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="hidden sm:inline">Back</span>
              </button>
            )}

            <SectionBadgeIcon section="mock-tracker" size="md" />

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base sm:text-lg md:text-xl font-black tracking-tight text-slate-900 dark:text-white font-sans">
                  Mock Tracker
                </h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-[11px] font-bold font-mono">
                  {settings.selectedExam || 'SSC CGL'}
                </span>
                <span className="text-slate-300 dark:text-slate-600">•</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium inline-flex items-center gap-1">
                  Target: <span className="text-indigo-600 dark:text-indigo-400 font-bold tabular-nums">{settings.targetPercentile || 90}%ile</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right: Primary Log Mock CTA */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleOpenAddMock}
              className="px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs sm:text-[13px] font-extrabold shadow-sm hover:shadow-md hover:shadow-indigo-500/25 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Log Mock</span>
            </button>
          </div>
        </div>

        {/* 2. SUB-NAVIGATION PILL TABS (Clean, Compact Segmented Track) */}
        <div className="pt-2.5 border-t border-slate-100 dark:border-white/[0.06] flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar scroll-smooth">
          {navTabs.map(tab => {
            const isActive = activeView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 sm:gap-2 select-none cursor-pointer active:scale-95 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs shadow-indigo-500/25 font-black'
                    : 'bg-slate-100/90 dark:bg-white/[0.05] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-white/10 border border-slate-200/60 dark:border-white/[0.06]'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-black ${
                    isActive ? 'bg-white/25 text-white' : 'bg-rose-500 text-white'
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
