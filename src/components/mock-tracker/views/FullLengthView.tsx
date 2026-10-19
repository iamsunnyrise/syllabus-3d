import React, { useState, useMemo } from 'react';
import { useMocks } from '../../../context/MockContext';
import { FullLengthDashboard } from '../full-length/FullLengthDashboard';
import { FullLengthTrendSection } from '../full-length/FullLengthTrendSection';
import { FullSubjectStatsGrid } from '../full-length/FullSubjectStatsGrid';
import { MockCard } from '../mocks/MockCard';
import { EmptyState } from '../common/EmptyState';
import { FullMockAnalysisView } from '../full-length/FullMockAnalysisView';
import { MockTest } from '../../../types/mockTracker';
import { Target, Plus, Search, Filter, ArrowUpDown, CheckCircle2, XCircle, Award, Sparkles } from 'lucide-react';

export const FullLengthView: React.FC = () => {
  const { fullLengthMocks, setIsAddModalOpen, setEditingMock } = useMocks();
  const [selectedFullMock, setSelectedFullMock] = useState<MockTest | null>(null);

  // Filter & Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [cutoffFilter, setCutoffFilter] = useState<'ALL' | 'CLEARED' | 'BELOW'>('ALL');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'date' | 'score' | 'percentile' | 'accuracy'>('date');

  // Available Platforms
  const availablePlatforms = useMemo(() => {
    const set = new Set<string>();
    fullLengthMocks.forEach(m => {
      if (m.testPlatform) set.add(m.testPlatform);
    });
    return Array.from(set);
  }, [fullLengthMocks]);

  // Filtered & Sorted Mocks
  const displayedMocks = useMemo(() => {
    let list = fullLengthMocks.filter(m => {
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = m.testName.toLowerCase().includes(q);
        const matchPlatform = m.testPlatform.toLowerCase().includes(q);
        const matchExam = m.exam.toLowerCase().includes(q);
        if (!matchName && !matchPlatform && !matchExam) return false;
      }
      // Cutoff filter
      if (cutoffFilter === 'CLEARED' && !m.isClearedCutoff) return false;
      if (cutoffFilter === 'BELOW' && m.isClearedCutoff) return false;
      // Platform filter
      if (selectedPlatform !== 'ALL' && m.testPlatform !== selectedPlatform) return false;
      return true;
    });

    // Sort
    list.sort((a, b) => {
      if (sortBy === 'score') return b.score - a.score;
      if (sortBy === 'percentile') return b.percentile - a.percentile;
      if (sortBy === 'accuracy') return b.accuracy - a.accuracy;
      // Default date desc
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return list;
  }, [fullLengthMocks, searchQuery, cutoffFilter, selectedPlatform, sortBy]);

  const clearedCount = useMemo(() => fullLengthMocks.filter(m => m.isClearedCutoff).length, [fullLengthMocks]);
  const belowCount = fullLengthMocks.length - clearedCount;
  const bestScore = useMemo(() => Math.max(...fullLengthMocks.map(m => m.score), 0), [fullLengthMocks]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Full Length Dedicated Dashboard Header */}
      <FullLengthDashboard />

      {/* 2. Full Length Trend Progression Chart */}
      <FullLengthTrendSection />

      {/* 3. Subject-wise Aggregate Matrix */}
      <FullSubjectStatsGrid />

      {/* 4. Complete Full Length Mocks Grid Section */}
      <div className="space-y-4">
        {/* Section Header with Quick Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-white font-sans">
                All Full Length Mock Tests
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30 tabular-nums">
                {fullLengthMocks.length} Tests
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-normal">
              Click any mock card to open deep section-by-section analysis and time verdict
            </p>
          </div>

          <button
            onClick={() => {
              setEditingMock(null);
              setIsAddModalOpen(true);
            }}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-xs sm:text-[13px] shadow-md shadow-blue-500/20 active:scale-95 transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Full Mock</span>
          </button>
        </div>

        {/* Filter and Search Bar Controls */}
        <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-[#121424] border border-slate-200/90 dark:border-white/10 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Left: Cutoff Quick Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            <button
              onClick={() => setCutoffFilter('ALL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                cutoffFilter === 'ALL'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                  : 'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/15'
              }`}
            >
              All ({fullLengthMocks.length})
            </button>
            <button
              onClick={() => setCutoffFilter('CLEARED')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                cutoffFilter === 'CLEARED'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 hover:bg-emerald-500/20'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Cleared ({clearedCount})</span>
            </button>
            <button
              onClick={() => setCutoffFilter('BELOW')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                cutoffFilter === 'BELOW'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20 hover:bg-rose-500/20'
              }`}
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Below ({belowCount})</span>
            </button>
            {bestScore > 0 && (
              <span className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/25 ml-1">
                <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Peak: {bestScore}</span>
              </span>
            )}
          </div>

          {/* Right: Search, Platform & Sort Controls */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-48 md:w-56">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search mock name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#181A28] border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Platform Dropdown */}
            {availablePlatforms.length > 1 && (
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-[#181A28] border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer"
              >
                <option value="ALL">All Platforms</option>
                {availablePlatforms.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            )}

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-[#181A28] border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer"
            >
              <option value="date">Latest Date</option>
              <option value="score">Highest Score</option>
              <option value="percentile">Top Percentile</option>
              <option value="accuracy">Top Accuracy</option>
            </select>
          </div>
        </div>

        {/* Empty State */}
        {displayedMocks.length === 0 ? (
          <EmptyState
            title={fullLengthMocks.length === 0 ? "No Full Length Mocks Yet" : "No Matching Mock Tests"}
            description={
              fullLengthMocks.length === 0 
                ? "Attempt and log your first complete 100-question mock test to activate full exam simulations."
                : "No mock tests match your current search and filters. Try clearing your search query or switching filters."
            }
            actionText={fullLengthMocks.length === 0 ? "Log Full Length Mock" : "Clear Filters"}
            onAction={() => {
              if (fullLengthMocks.length === 0) {
                setEditingMock(null);
                setIsAddModalOpen(true);
              } else {
                setSearchQuery('');
                setCutoffFilter('ALL');
                setSelectedPlatform('ALL');
              }
            }}
            icon="🎯"
          />
        ) : (
          /* Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {displayedMocks.map((mock) => (
              <MockCard 
                key={mock.id} 
                mock={mock} 
                onOpenAnalysis={(m) => setSelectedFullMock(m)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Deep Individual Full Length Mock Modal */}
      {selectedFullMock && (
        <FullMockAnalysisView
          mock={selectedFullMock}
          onClose={() => setSelectedFullMock(null)}
        />
      )}
    </div>
  );
};
