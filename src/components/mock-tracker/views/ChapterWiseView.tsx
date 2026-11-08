import React, { useState, useMemo, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Layers, 
  Filter, 
  BookOpen, 
  Sparkles,
  Trophy,
  CheckCircle2,
  AlertTriangle,
  LayoutGrid,
  Table as TableIcon,
  ArrowUpDown,
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart2,
  Target,
  Zap,
  Clock
} from 'lucide-react';
import { useMocks } from '../../../context/MockContext';
import { ChapterWiseDashboard } from '../chapter-wise/ChapterWiseDashboard';
import { SubjectChapterNavTabs } from '../chapter-wise/SubjectChapterNavTabs';
import { ChapterCard } from '../chapter-wise/ChapterCard';
import { AddChapterModal } from '../chapter-wise/AddChapterModal';
import { ChapterDetailAnalysisModal } from '../chapter-wise/ChapterDetailAnalysisModal';
import { Modal } from '../common/Modal';
import { SectionName } from '../../../types/mockTracker';

export const ChapterWiseView: React.FC = () => {
  const { 
    subjectsWithChapters, 
    getChapterMasterySummary, 
    addCustomSubject,
    openAddModalWithPrefill
  } = useMocks();

  const [selectedSubject, setSelectedSubject] = useState<string>(
    subjectsWithChapters[0]?.name || 'Quantitative Aptitude'
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'Mastered' | 'Strong' | 'Needs Practice' | 'Not Started'>('ALL');
  const [activityFilter, setActivityFilter] = useState<'ALL' | 'TESTED' | 'MULTI_TESTED' | 'UNTESTED'>('ALL');
  const [sortBy, setSortBy] = useState<'syllabus' | 'most_tests' | 'lowest_accuracy' | 'highest_accuracy' | 'growth'>('syllabus');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Sync selected subject if active syllabus subjects change
  useEffect(() => {
    if (subjectsWithChapters.length > 0 && !subjectsWithChapters.some(s => s.name.toLowerCase() === selectedSubject.toLowerCase())) {
      setSelectedSubject(subjectsWithChapters[0].name);
    }
  }, [subjectsWithChapters, selectedSubject]);

  // Modals
  const [isAddChapterModalOpen, setIsAddChapterModalOpen] = useState(false);
  const [isAddSubjectModalOpen, setIsAddSubjectModalOpen] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState('');
  const [newSubjectIcon, setNewSubjectIcon] = useState('📚');
  const [analyzingChapter, setAnalyzingChapter] = useState<string | null>(null);

  // Active Subject
  const activeSubjectObj = useMemo(() => {
    return subjectsWithChapters.find(
      s => s.name.toLowerCase() === selectedSubject.toLowerCase()
    ) || subjectsWithChapters[0];
  }, [subjectsWithChapters, selectedSubject]);

  // Filtered Chapters in Active Subject
  const chaptersWithSummaries = useMemo(() => {
    if (!activeSubjectObj) return [];
    
    return activeSubjectObj.chapters.map(ch => ({
      chapter: ch,
      summary: getChapterMasterySummary(activeSubjectObj.name, ch.chapterName)
    }));
  }, [activeSubjectObj, getChapterMasterySummary]);

  // Active Subject Stats (Coverage, Tests Count, Top Performer, Needs Focus)
  const subjectStats = useMemo(() => {
    if (!chaptersWithSummaries.length) {
      return { totalChapters: 0, testedCount: 0, totalTests: 0, avgAccuracy: 0, topChapter: null, weakChapter: null };
    }

    const totalChapters = chaptersWithSummaries.length;
    const tested = chaptersWithSummaries.filter(item => item.summary.totalTests > 0);
    const testedCount = tested.length;
    const totalTests = tested.reduce((sum, item) => sum + item.summary.totalTests, 0);
    const avgAccuracy = tested.length > 0
      ? Math.round(tested.reduce((sum, item) => sum + item.summary.avgAccuracy, 0) / tested.length)
      : 0;

    // Top Performed Chapter
    const sortedByAcc = [...tested].sort((a, b) => b.summary.avgAccuracy - a.summary.avgAccuracy);
    const topChapter = sortedByAcc[0] || null;

    // Weak Chapter (Tested with lowest accuracy)
    const weakChapter = sortedByAcc.length > 1 ? sortedByAcc[sortedByAcc.length - 1] : null;

    return { totalChapters, testedCount, totalTests, avgAccuracy, topChapter, weakChapter };
  }, [chaptersWithSummaries]);

  // Filter and sort chapters
  const filteredChapters = useMemo(() => {
    let result = chaptersWithSummaries.filter(({ chapter, summary }) => {
      // Search
      const matchesSearch = 
        chapter.chapterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chapter.subtopics?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      // Status
      if (statusFilter !== 'ALL' && summary.masteryStatus !== statusFilter) {
        return false;
      }

      // Activity
      if (activityFilter === 'TESTED' && summary.totalTests === 0) return false;
      if (activityFilter === 'MULTI_TESTED' && summary.totalTests < 2) return false;
      if (activityFilter === 'UNTESTED' && summary.totalTests > 0) return false;

      return true;
    });

    // Sorting
    switch (sortBy) {
      case 'most_tests':
        result.sort((a, b) => b.summary.totalTests - a.summary.totalTests);
        break;
      case 'lowest_accuracy':
        result.sort((a, b) => {
          if (a.summary.totalTests === 0 && b.summary.totalTests > 0) return 1;
          if (b.summary.totalTests === 0 && a.summary.totalTests > 0) return -1;
          return a.summary.avgAccuracy - b.summary.avgAccuracy;
        });
        break;
      case 'highest_accuracy':
        result.sort((a, b) => b.summary.avgAccuracy - a.summary.avgAccuracy);
        break;
      case 'growth':
        result.sort((a, b) => (b.summary.scoreGrowthPercent || 0) - (a.summary.scoreGrowthPercent || 0));
        break;
      case 'syllabus':
      default:
        // maintain syllabus order
        break;
    }

    return result;
  }, [chaptersWithSummaries, searchQuery, statusFilter, activityFilter, sortBy]);

  // Log Chapter Test with smart prefill (sets next test number automatically!)
  const handleLogTestForChapter = (subjectName: string, chapterName: string) => {
    const summary = getChapterMasterySummary(subjectName, chapterName);
    const nextTestNum = summary.totalTests + 1;

    openAddModalWithPrefill({
      mockType: 'CHAPTER_WISE',
      subjectName: subjectName as SectionName,
      chapterName: chapterName,
      testName: `${chapterName} Drill #${nextTestNum}`,
      totalQuestions: 15,
      maxMarks: 30,
      totalTimeMinutes: 15,
      timeTakenMinutes: 12,
      attempted: 15,
      correct: 13,
      wrong: 2,
      cutoffMarks: 22,
      percentile: 94.0
    });
  };

  const handleAddSubjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSubjectName.trim()) {
      const created = addCustomSubject(newSubjectName.trim(), newSubjectIcon);
      setSelectedSubject(created.name);
      setNewSubjectName('');
      setIsAddSubjectModalOpen(false);
    }
  };

  const activeChapterSummary = useMemo(() => {
    if (!analyzingChapter || !activeSubjectObj) return null;
    return getChapterMasterySummary(activeSubjectObj.name, analyzingChapter);
  }, [analyzingChapter, activeSubjectObj, getChapterMasterySummary]);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* 1. Header & Syllabus Overview KPIs */}
      <ChapterWiseDashboard 
        onAddChapterClick={() => setIsAddChapterModalOpen(true)}
      />

      {/* 2. Subject Filter Navigation Tabs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>{activeSubjectObj?.icon}</span>
            <span>{activeSubjectObj?.name} Chapters</span>
            <span className="text-xs font-bold text-slate-500">
              ({activeSubjectObj?.chapters.length} Chapters)
            </span>
          </h2>

          <button
            onClick={() => setIsAddChapterModalOpen(true)}
            className="text-xs font-black text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>+ Add Chapter</span>
          </button>
        </div>

        <SubjectChapterNavTabs
          selectedSubject={selectedSubject}
          onSelectSubject={setSelectedSubject}
          onAddSubjectClick={() => setIsAddSubjectModalOpen(true)}
        />
      </div>

      {/* 3. ACTIVE SUBJECT PERFORMANCE SPOTLIGHT STRIP */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-slate-50 to-amber-500/10 dark:from-emerald-500/10 dark:via-[#131628] dark:to-amber-500/10 border border-slate-200 dark:border-white/10 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-6 flex-wrap">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Chapter Coverage
            </span>
            <span className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
              {subjectStats.testedCount} / {subjectStats.totalChapters} Tested
              <span className="text-xs font-normal text-slate-500 ml-1">
                ({subjectStats.totalChapters > 0 ? Math.round((subjectStats.testedCount / subjectStats.totalChapters) * 100) : 0}%)
              </span>
            </span>
          </div>

          <div className="h-8 w-px bg-slate-200 dark:bg-white/10 hidden sm:block" />

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Subject Tests Given
            </span>
            <span className="text-sm sm:text-base font-black text-emerald-700 dark:text-emerald-400">
              {subjectStats.totalTests} Drills Logged
            </span>
          </div>

          <div className="h-8 w-px bg-slate-200 dark:bg-white/10 hidden sm:block" />

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Average Accuracy
            </span>
            <span className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
              {subjectStats.avgAccuracy > 0 ? `${subjectStats.avgAccuracy}%` : 'Not Started'}
            </span>
          </div>
        </div>

        {/* Top Performer Badge */}
        {subjectStats.topChapter && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs">
            <Trophy className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-500 block font-bold">Top Chapter</span>
              <span className="font-black text-slate-900 dark:text-white line-clamp-1">
                {subjectStats.topChapter.chapter.chapterName} ({subjectStats.topChapter.summary.avgAccuracy}%)
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 4. ADVANCED TOOLBAR: SEARCH, SORT & VIEW SWITCHER */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-darkSurface border border-slate-200 dark:border-white/10 space-y-3.5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chapters or subtopics (e.g. Percentage, Syllogism)..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-darkContainer border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:border-emerald-500 outline-none"
            />
          </div>

          {/* Sort Selector & View Mode Switcher */}
          <div className="flex items-center gap-2 shrink-0 flex-wrap sm:flex-nowrap">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-darkContainer border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-700 dark:text-slate-300">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort chapters by"
                className="bg-transparent border-none text-xs font-bold text-slate-800 dark:text-slate-200 outline-none cursor-pointer"
              >
                <option value="syllabus">Syllabus Order</option>
                <option value="most_tests">Most Tests Attempted</option>
                <option value="lowest_accuracy">Lowest Accuracy (Weakest)</option>
                <option value="highest_accuracy">Highest Accuracy (Mastered)</option>
                <option value="growth">Highest Score Growth</option>
              </select>
            </div>

            {/* View Mode Toggle: Grid vs Matrix Table */}
            <div className="flex items-center gap-0.5 p-1 rounded-xl bg-slate-100 dark:bg-darkContainer border border-slate-200 dark:border-white/10">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-white/15 text-emerald-700 dark:text-emerald-400 shadow-2xs'
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-white'
                }`}
                title="Cards Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-white dark:bg-white/15 text-emerald-700 dark:text-emerald-400 shadow-2xs'
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-white'
                }`}
                title="Performance Matrix Table View"
              >
                <TableIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Dual Filter Tracks: Status Filter + Activity Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-2 border-t border-slate-100 dark:border-white/[0.06]">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0 mr-1">Status:</span>
            {(['ALL', 'Mastered', 'Strong', 'Needs Practice', 'Not Started'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  statusFilter === status
                    ? 'bg-emerald-600 dark:bg-emerald-500 text-white dark:text-darkBg shadow-2xs'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {status === 'ALL' ? 'All Status' : status}
              </button>
            ))}
          </div>

          {/* Activity Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0 mr-1">Activity:</span>
            {[
              { id: 'ALL', label: 'All Chapters' },
              { id: 'TESTED', label: 'Tested (1+)' },
              { id: 'MULTI_TESTED', label: 'Multi-Tested (2+)' },
              { id: 'UNTESTED', label: 'Untested' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActivityFilter(f.id as any)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activityFilter === f.id
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 5. MAIN CHAPTER VIEW: GRID VS PERFORMANCE MATRIX TABLE */}
      {filteredChapters.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-darkSurface border border-slate-200 dark:border-white/10 space-y-3">
          <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No chapters match your criteria</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {searchQuery || statusFilter !== 'ALL' || activityFilter !== 'ALL'
              ? 'Try changing your search keywords or resetting status/activity filters.'
              : 'No chapters added to this subject yet. Click below to add your first chapter!'}
          </p>
          <button
            onClick={() => setIsAddChapterModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-sm hover:opacity-90 cursor-pointer"
          >
            + Add First Chapter
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredChapters.map(({ chapter, summary }) => (
            <ChapterCard
              key={chapter.id}
              chapter={chapter}
              summary={summary}
              onOpenAnalysis={(chName) => setAnalyzingChapter(chName)}
              onLogTestForChapter={handleLogTestForChapter}
            />
          ))}
        </div>
      ) : (
        /* MATRIX TABLE VIEW */
        <div className="overflow-hidden rounded-2xl bg-white dark:bg-darkSurface border border-slate-200 dark:border-white/10 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 dark:bg-white/[0.04] border-b border-slate-200 dark:border-white/10 text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <th className="py-3 px-4">Chapter Name</th>
                  <th className="py-3 px-3">Tests Logged</th>
                  <th className="py-3 px-3">Latest Attempt</th>
                  <th className="py-3 px-3">Best Score</th>
                  <th className="py-3 px-3">Avg Accuracy</th>
                  <th className="py-3 px-3">Trend</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/[0.06]">
                {filteredChapters.map(({ chapter, summary }) => (
                  <tr 
                    key={chapter.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-white/[0.02] transition-colors"
                  >
                    {/* Chapter Name */}
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                      <div className="flex items-center gap-2">
                        <span className="truncate max-w-xs">{chapter.chapterName}</span>
                        {chapter.isCustom && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-100 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-400">
                            Custom
                          </span>
                        )}
                      </div>
                      {chapter.subtopics && chapter.subtopics.length > 0 && (
                        <div className="text-[10px] text-slate-400 font-medium truncate max-w-xs mt-0.5">
                          {chapter.subtopics.join(', ')}
                        </div>
                      )}
                    </td>

                    {/* Tests Logged */}
                    <td className="py-3.5 px-3">
                      <span className={`px-2 py-0.5 rounded-md font-mono font-bold text-[11px] ${
                        summary.totalTests > 0
                          ? 'bg-blue-50 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300'
                          : 'bg-slate-100 dark:bg-white/5 text-slate-500'
                      }`}>
                        {summary.totalTests} {summary.totalTests === 1 ? 'Test' : 'Tests'}
                      </span>
                    </td>

                    {/* Latest Attempt */}
                    <td className="py-3.5 px-3 font-mono font-bold text-slate-800 dark:text-slate-200">
                      {summary.latestScore !== undefined ? (
                        <div>
                          <span>{summary.latestScore} / {summary.maxMarks} M</span>
                          {summary.latestTestDate && (
                            <span className="block text-[10px] text-slate-400 font-sans font-normal">
                              {summary.latestTestDate}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>

                    {/* Best Score */}
                    <td className="py-3.5 px-3 font-mono font-black text-emerald-700 dark:text-emerald-400">
                      {summary.bestScore > 0 ? `${summary.bestScore} M` : '—'}
                    </td>

                    {/* Avg Accuracy */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2">
                        <span className={`font-mono font-black text-xs ${
                          summary.avgAccuracy >= 85
                            ? 'text-emerald-700 dark:text-emerald-400'
                            : summary.avgAccuracy >= 70
                              ? 'text-amber-600 dark:text-amber-400'
                              : summary.totalTests > 0
                                ? 'text-rose-600'
                                : 'text-slate-400'
                        }`}>
                          {summary.totalTests > 0 ? `${summary.avgAccuracy}%` : '—'}
                        </span>
                        {summary.totalTests > 0 && (
                          <div className="w-12 h-1.5 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden hidden sm:block">
                            <div 
                              style={{ width: `${summary.avgAccuracy}%` }} 
                              className={`h-full ${
                                summary.avgAccuracy >= 85 ? 'bg-emerald-500' : summary.avgAccuracy >= 70 ? 'bg-amber-500' : 'bg-rose-500'
                              }`} 
                            />
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Trend */}
                    <td className="py-3.5 px-3">
                      {summary.scoreTrend === 'improving' ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-bold text-[11px]">
                          <TrendingUp className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>+{summary.scoreGrowthPercent}%</span>
                        </span>
                      ) : summary.scoreTrend === 'declining' ? (
                        <span className="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400 font-bold text-[11px]">
                          <TrendingDown className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>Dip</span>
                        </span>
                      ) : summary.scoreTrend === 'stable' ? (
                        <span className="text-slate-500 font-bold text-[11px]">Stable</span>
                      ) : summary.scoreTrend === 'single' ? (
                        <span className="text-blue-500 font-bold text-[11px]">1st Test</span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-3">
                      <span className={`px-2 py-0.5 rounded-md text-[10.5px] font-black ${
                        summary.masteryStatus === 'Mastered'
                          ? 'bg-emerald-100 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-400'
                          : summary.masteryStatus === 'Strong'
                            ? 'bg-amber-100 dark:bg-amber-500/15 text-amber-800 dark:text-amber-400'
                            : summary.masteryStatus === 'Needs Practice'
                              ? 'bg-rose-100 dark:bg-rose-500/15 text-rose-800 dark:text-rose-400'
                              : 'bg-slate-100 dark:bg-white/5 text-slate-500'
                      }`}>
                        {summary.masteryStatus}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleLogTestForChapter(chapter.subject, chapter.chapterName)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-black transition-all cursor-pointer active:scale-95"
                          title="Log next test for this chapter"
                        >
                          + Log Test #{summary.totalTests + 1}
                        </button>

                        {summary.totalTests > 0 && (
                          <button
                            onClick={() => setAnalyzingChapter(chapter.chapterName)}
                            className="p-1 rounded-lg border border-slate-200 dark:border-white/10 hover:border-emerald-500/40 text-slate-600 dark:text-slate-300 hover:text-emerald-600 cursor-pointer"
                            title="Diagnosis and test history"
                          >
                            <BarChart2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Chapter Modal */}
      <AddChapterModal
        isOpen={isAddChapterModalOpen}
        onClose={() => setIsAddChapterModalOpen(false)}
        defaultSubject={selectedSubject}
      />

      {/* Add Custom Subject Modal */}
      <Modal
        isOpen={isAddSubjectModalOpen}
        onClose={() => setIsAddSubjectModalOpen(false)}
        title="Add Custom Subject"
        maxWidth="max-w-sm"
      >
        <form onSubmit={handleAddSubjectSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Subject Name *
            </label>
            <input
              type="text"
              required
              autoFocus
              value={newSubjectName}
              onChange={(e) => setNewSubjectName(e.target.value)}
              placeholder="e.g. Hindi Language, Banking Awareness..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-darkContainer border border-slate-300 dark:border-white/10 text-sm text-slate-900 dark:text-white focus:border-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Subject Icon Emoji
            </label>
            <div className="flex items-center gap-2">
              {['📚', '⚡', '🎯', '🏛️', '💼', '🧪', '⚖️'].map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setNewSubjectIcon(emoji)}
                  className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center border transition-all ${
                    newSubjectIcon === emoji
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/20'
                      : 'border-slate-200 dark:border-white/10'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 dark:border-white/10">
            <button
              type="button"
              onClick={() => setIsAddSubjectModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-glow-blue"
            >
              Create Subject
            </button>
          </div>
        </form>
      </Modal>

      {/* Chapter Detail Analysis Modal */}
      <ChapterDetailAnalysisModal
        summary={activeChapterSummary}
        onClose={() => setAnalyzingChapter(null)}
        onLogTestForChapter={handleLogTestForChapter}
      />
    </div>
  );
};
