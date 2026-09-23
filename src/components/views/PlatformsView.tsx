import React, { useState, useMemo } from 'react';
import {
  Search,
  Plus,
  ExternalLink,
  Bookmark,
  Sparkles,
  GraduationCap,
  FileCheck2,
  BookOpen,
  Globe,
  Copy,
  Check,
  Trash2,
  Edit2,
  KeyRound,
  ArrowUpRight,
  PenTool,
  Filter,
  X
} from 'lucide-react';
import { ExternalPlatform, PlatformCategory } from '../../types/syllabus';
import { useSyllabus } from '../../context/SyllabusContext';
import { AddPlatformModal } from '../modals/AddPlatformModal';
import { SectionBadgeIcon } from '../common/SectionBadgeIcon';
import { soundManager } from '../../utils/soundEffects';

export const stripEmojis = (str: string): string => {
  if (!str) return '';
  return str
    .replace(/[\p{Extended_Pictographic}\p{Emoji_Presentation}\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}✨⭐📚📝🔍🔥🎓🏛️📖📊▶️🏆💻🔬📐🧠🌐🚀✈️]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
};

export const PlatformsView: React.FC = () => {
  const { platforms, togglePinPlatform, deletePlatform } = useSyllabus();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPlatform, setEditingPlatform] = useState<ExternalPlatform | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Dynamic custom categories from existing platforms (Cleaned from emojis)
  const customCategoriesList = useMemo(() => {
    const list = new Set<string>();
    platforms.forEach(p => {
      if (p.customCategoryName && p.customCategoryName.trim()) {
        const clean = stripEmojis(p.customCategoryName.trim());
        if (clean) list.add(clean);
      }
    });
    return Array.from(list);
  }, [platforms]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: platforms.length,
      course: 0,
      test_series: 0,
      reference: 0,
      custom: 0,
      pinned: 0
    };

    platforms.forEach(p => {
      if (p.pinned) counts.pinned++;
      if (p.category === 'course') counts.course++;
      if (p.category === 'test_series') counts.test_series++;
      if (p.category === 'reference') counts.reference++;
      if (p.category === 'custom' || Boolean(p.customCategoryName)) counts.custom++;

      if (p.customCategoryName && p.customCategoryName.trim()) {
        const cat = stripEmojis(p.customCategoryName.trim());
        if (cat) {
          counts[cat] = (counts[cat] || 0) + 1;
        }
      }
    });

    return counts;
  }, [platforms]);

  // Filtered Platforms
  const filteredPlatforms = useMemo(() => {
    return platforms.filter(p => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.customCategoryName && p.customCategoryName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.url.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (selectedCategory === 'all') return true;
      if (selectedCategory === 'pinned') return p.pinned;
      if (selectedCategory === 'course') return p.category === 'course';
      if (selectedCategory === 'test_series') return p.category === 'test_series';
      if (selectedCategory === 'reference') return p.category === 'reference';
      if (selectedCategory === 'custom') return p.category === 'custom' || Boolean(p.customCategoryName);
      
      // Match by custom category name
      if (p.customCategoryName && stripEmojis(p.customCategoryName).toLowerCase() === selectedCategory.toLowerCase()) return true;

      return p.category === selectedCategory;
    });
  }, [platforms, searchQuery, selectedCategory]);

  // Statistics
  const coursesCount = categoryCounts.course;
  const testsCount = categoryCounts.test_series;
  const customCount = categoryCounts.custom;
  const pinnedCount = categoryCounts.pinned;

  const handleCopyHint = (e: React.MouseEvent, platformId: string, hint: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(hint);
    setCopiedId(platformId);
    soundManager.playClick();
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleOpenAdd = () => {
    setEditingPlatform(null);
    setIsAddModalOpen(true);
    soundManager.playClick();
  };

  const handleEdit = (e: React.MouseEvent, p: ExternalPlatform) => {
    e.stopPropagation();
    setEditingPlatform(p);
    setIsAddModalOpen(true);
    soundManager.playClick();
  };

  const handleDelete = (e: React.MouseEvent, p: ExternalPlatform) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to remove "${p.name}" from your Study Station?`)) {
      deletePlatform(p.id);
    }
  };

  const handleTogglePin = (e: React.MouseEvent, platformId: string) => {
    e.stopPropagation();
    togglePinPlatform(platformId);
  };

  const handleDirectLaunch = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    soundManager.playClick();
  };

  const formatCleanDomain = (url: string) => {
    try {
      const parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
      return parsed.hostname.replace(/^www\./, '');
    } catch (e) {
      return url.replace(/^https?:\/\//, '').split('/')[0];
    }
  };

  const formatReadableText = (text?: string): string => {
    if (!text) return '';
    // Normalize long all-caps text entered by users into readable sentence case (Issue 6)
    if (text.length > 10 && text === text.toUpperCase() && !/^\d+$/.test(text)) {
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }
    return text;
  };

  // Toggle KPI filter
  const handleKpiFilter = (catKey: string) => {
    soundManager.playClick();
    setSelectedCategory(prev => prev === catKey ? 'all' : catKey);
  };

  return (
    <div className="space-y-3.5 sm:space-y-4 animate-fade-in pb-8 sm:pb-12">
      
      {/* 1. HERO BENTO BANNER WITH 3D AMBIENT NODES (Compact & Unified - Issues 4, 10, 11) */}
      <div className="study-hub-hero-banner p-4 sm:p-5 md:p-6 rounded-2xl bg-[#080911] border border-white/[0.12] shadow-xl relative overflow-hidden text-white">
        
        {/* Full High-Fidelity 3D Portal Artwork (Right-aligned with natural depth, constrained height) */}
        <div className="absolute right-0 top-0 bottom-0 w-full sm:w-4/5 md:w-3/5 lg:w-[50%] pointer-events-none overflow-hidden flex items-center justify-end z-0">
          <img
            src="/study_hub_banner.png"
            alt="Connected Study Portals"
            className="h-[110%] sm:h-[120%] w-auto max-w-none object-contain object-right-bottom sm:object-right translate-y-1 sm:translate-y-0 opacity-30 sm:opacity-85 select-none"
            loading="eager"
            decoding="async"
            width={600}
            height={320}
          />
        </div>

        {/* Multi-layered Vignette & Legibility Protection Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080911] via-[#080911]/90 md:via-[#080911]/60 to-transparent pointer-events-none z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080911]/80 via-transparent to-transparent pointer-events-none z-0" />
        
        {/* Ambient Glow Accents */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-3.5 sm:gap-5">
          <div className="space-y-1.5 sm:space-y-2 max-w-xl">
            <div className="flex items-center gap-2 flex-wrap">
              {/* Removed uppercase (Issue 4) */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/15 text-cyan-200 border border-cyan-500/30 backdrop-blur-md shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                Connected Study Hub
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium text-slate-300 bg-white/[0.06] border border-white/10 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span><strong className="text-white font-bold tabular-nums">{platforms.length}</strong> Platforms Linked</span>
              </span>
            </div>

            {/* Page title aligned with Sidebar navigation (Issue 10) */}
            <div className="flex items-center gap-3">
              <SectionBadgeIcon section="platforms" size="md" />
              <h1 className="study-hub-banner-title text-xl sm:text-2xl md:text-3xl font-black text-white font-sans tracking-tight leading-tight">
                Study Station &amp; Hub
              </h1>
            </div>
            <p className="study-hub-banner-subtitle text-xs sm:text-[13px] text-slate-300 font-normal leading-relaxed">
              Course batches, mock test portals, and connected study resources.
            </p>
          </div>

          <div className="flex items-center shrink-0">
            {/* Standard Primary CTA button (Issue 3) */}
            <button
              onClick={handleOpenAdd}
              className="btn-primary py-2 px-3.5 sm:px-4 text-xs sm:text-[13px] rounded-xl font-bold shadow-md active:scale-95 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Add Platform / Batch</span>
            </button>
          </div>
        </div>

        {/* Interactive KPI Filter Tiles (Compact - Issue 11) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 mt-3 sm:mt-4 pt-3 sm:pt-3.5 border-t border-white/10 relative z-10">
          
          {/* Courses */}
          <div
            onClick={() => handleKpiFilter('course')}
            title="Filter by Courses"
            className={`study-hub-bento-tile p-2.5 sm:p-3 rounded-xl transition-all duration-200 flex items-center gap-2.5 cursor-pointer shadow-sm group active:scale-95 border ${
              selectedCategory === 'course'
                ? 'bg-purple-500/25 border-purple-400 ring-2 ring-purple-400/50 shadow-purple-500/20 shadow-lg'
                : 'bg-[#121320]/75 hover:bg-[#18192a]/90 border-purple-500/20 hover:border-purple-500/45'
            }`}
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform border border-purple-500/30">
              <GraduationCap className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <span className="study-hub-tile-count text-base sm:text-lg font-mono font-black tabular-nums text-white block leading-tight">
                {coursesCount}
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-purple-200/80 block truncate">
                Courses
              </span>
            </div>
          </div>

          {/* Mock Series */}
          <div
            onClick={() => handleKpiFilter('test_series')}
            title="Filter by Mock Series"
            className={`study-hub-bento-tile p-2.5 sm:p-3 rounded-xl transition-all duration-200 flex items-center gap-2.5 cursor-pointer shadow-sm group active:scale-95 border ${
              selectedCategory === 'test_series'
                ? 'bg-sky-500/25 border-sky-400 ring-2 ring-sky-400/50 shadow-sky-500/20 shadow-lg'
                : 'bg-[#121320]/75 hover:bg-[#18192a]/90 border-sky-500/20 hover:border-sky-500/45'
            }`}
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-sky-500/20 text-sky-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform border border-sky-500/30">
              <FileCheck2 className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <span className="study-hub-tile-count text-base sm:text-lg font-mono font-black tabular-nums text-white block leading-tight">
                {testsCount}
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-sky-200/80 block truncate">
                Mock Series
              </span>
            </div>
          </div>

          {/* Pinned Links */}
          <div
            onClick={() => handleKpiFilter('pinned')}
            title="Filter by Pinned Platforms"
            className={`study-hub-bento-tile p-2.5 sm:p-3 rounded-xl transition-all duration-200 flex items-center gap-2.5 cursor-pointer shadow-sm group active:scale-95 border ${
              selectedCategory === 'pinned'
                ? 'bg-amber-500/25 border-amber-400 ring-2 ring-amber-400/50 shadow-amber-500/20 shadow-lg'
                : 'bg-[#121320]/75 hover:bg-[#18192a]/90 border-amber-500/20 hover:border-amber-500/45'
            }`}
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform border border-amber-500/30">
              <Bookmark className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <span className="study-hub-tile-count text-base sm:text-lg font-mono font-black tabular-nums text-white block leading-tight">
                {pinnedCount}
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-amber-200/80 block truncate">
                Pinned
              </span>
            </div>
          </div>

          {/* Custom Portals */}
          <div
            onClick={() => handleKpiFilter('custom')}
            title="Filter by Custom Portals"
            className={`study-hub-bento-tile p-2.5 sm:p-3 rounded-xl transition-all duration-200 flex items-center gap-2.5 cursor-pointer shadow-sm group active:scale-95 border ${
              selectedCategory === 'custom'
                ? 'bg-emerald-500/25 border-emerald-400 ring-2 ring-emerald-400/50 shadow-emerald-500/20 shadow-lg'
                : 'bg-[#121320]/75 hover:bg-[#18192a]/90 border-emerald-500/20 hover:border-emerald-500/45'
            }`}
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform border border-emerald-500/30">
              <PenTool className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <span className="study-hub-tile-count text-base sm:text-lg font-mono font-black tabular-nums text-white block leading-tight">
                {customCount}
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-200/80 block truncate">
                Custom
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* 2. ADVANCED TOOLBAR: PROMINENT SEARCH & SEGMENTED CATEGORY TRACK (Issues 1, 2, 3, 9) */}
      <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-[#151622] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        
        {/* Row 1: Search Bar + Live Portals Count */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
          {/* Prominent Search Bar (Full Width / Never Hidden) */}
          <div className="relative flex-1 max-w-xl">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by platform name, subject, batch, or URL..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-50 dark:bg-[#1B1C28] border border-slate-200 dark:border-slate-700 text-xs sm:text-[13px] font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-500/15 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors cursor-pointer"
                title="Clear search"
                aria-label="Clear search query"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Metrics & Reset Filter */}
          <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
            <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-[#1B1C28] px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
              <strong className="text-slate-900 dark:text-white font-black tabular-nums">{filteredPlatforms.length}</strong>
              <span className="text-slate-400"> of {platforms.length} Portals</span>
            </span>

            {selectedCategory !== 'all' && (
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  soundManager.playClick();
                }}
                className="text-xs font-bold text-primary-600 dark:text-primary-400 hover:underline cursor-pointer px-2 py-1 active:scale-95 transition-transform"
              >
                Reset Filter
              </button>
            )}
          </div>
        </div>

        {/* Row 2: Category Filter Pills Track with Visible Scroll Cues (Issue 9) */}
        <div className="relative">
          <div
            className="flex items-center gap-1.5 overflow-x-auto pb-1.5 pt-0.5 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700"
            role="tablist"
            aria-label="Filter study portals by category"
          >
            {[
              { id: 'all', label: 'All Portals', count: categoryCounts.all },
              { id: 'course', label: 'Courses', count: categoryCounts.course },
              { id: 'test_series', label: 'Mock Tests', count: categoryCounts.test_series },
              { id: 'reference', label: 'Tools & Reference', count: categoryCounts.reference },
              ...customCategoriesList.map(cat => ({ 
                id: cat, 
                label: cat,
                count: categoryCounts[cat] || 0
              })),
              { id: 'pinned', label: 'Pinned', count: categoryCounts.pinned },
            ].map(tab => {
              const isSelected = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => {
                    setSelectedCategory(tab.id);
                    soundManager.playClick();
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer whitespace-nowrap active:scale-95 flex items-center gap-1.5 shrink-0 ${
                    isSelected
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm font-bold'
                      : 'bg-slate-50 dark:bg-[#1B1C28] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.count > 0 && (
                    <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono tabular-nums ${
                      isSelected
                        ? 'bg-white/20 dark:bg-slate-900/15 text-white dark:text-slate-900 font-bold'
                        : 'bg-slate-200 dark:bg-slate-700/60 text-slate-500 dark:text-slate-400'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* 3. PLATFORM CARDS GRID (Issues 1, 2, 3, 5, 6, 7, 8, 12) */}
      {filteredPlatforms.length === 0 ? (
        <div className="p-8 sm:p-14 rounded-2xl bg-white dark:bg-[#151622] border border-slate-200 dark:border-slate-800 text-center space-y-4 shadow-sm">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20 flex items-center justify-center mx-auto shadow-xs">
            <Globe className="w-7 h-7 stroke-[1.8]" />
          </div>
          <div className="space-y-1">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-sans">
              {searchQuery.trim() || selectedCategory !== 'all' ? 'No study platforms found' : 'No Study Platforms Linked'}
            </h2>
            <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 max-w-sm mx-auto font-normal">
              {searchQuery.trim() || selectedCategory !== 'all'
                ? `No portals match "${searchQuery || selectedCategory}". Try resetting your filter.`
                : 'Link your coaching batches, mock test series, and study portals for 1-click launch.'}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-1 w-full sm:w-auto">
            {(searchQuery.trim() || selectedCategory !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  soundManager.playClick();
                }}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-primary-600 dark:text-primary-400 hover:bg-slate-200/70 dark:hover:bg-slate-700 cursor-pointer active:scale-95 transition-all"
              >
                Clear Search & Filter
              </button>
            )}
            <button
              onClick={handleOpenAdd}
              className="btn-primary w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold shadow-sm cursor-pointer inline-flex items-center justify-center gap-1.5 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add Platform / Batch</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {filteredPlatforms.map((platform) => {
            const hasLoginHint = Boolean(platform.loginHint);
            const isCopied = copiedId === platform.id;
            const cleanDomain = formatCleanDomain(platform.url);

            const categoryBadgeLabel = stripEmojis(platform.customCategoryName || '') || (
              platform.category === 'course'
                ? 'Course Batch'
                : platform.category === 'test_series'
                ? 'Mock Series'
                : platform.category === 'reference'
                ? 'Reference Tool'
                : 'Custom Portal'
            );

            return (
              <div
                key={platform.id}
                className="group relative rounded-2xl bg-white dark:bg-[#151622] border border-slate-200 dark:border-slate-800 hover:border-primary-500/50 dark:hover:border-primary-400/50 shadow-sm hover:shadow-md transition-all duration-200 p-4 sm:p-5 flex flex-col justify-between space-y-3.5 overflow-hidden"
              >
                {/* Brand Color Top Accent Bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 transition-all group-hover:h-1.5"
                  style={{ backgroundColor: platform.color || '#6366F1' }}
                />

                {/* Top Section: Icon, Header, Action Controls */}
                <div className="space-y-2.5 pt-0.5">
                  <div className="flex items-start justify-between gap-2.5">
                    
                    {/* Brand Icon & Platform Meta */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center text-lg sm:text-xl shadow-xs border border-white/20 shrink-0 group-hover:scale-105 transition-transform"
                        style={{
                          backgroundColor: platform.color || '#6366F1',
                          boxShadow: `0 4px 12px ${(platform.color || '#6366F1')}30`
                        }}
                      >
                        {platform.icon || '⚡'}
                      </div>

                      <div className="min-w-0 space-y-0.5">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-mono font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          <span className="truncate max-w-[120px] sm:max-w-[160px]">{categoryBadgeLabel}</span>
                        </span>
                        
                        {/* Heading Level 2 (Issue 7 - replaces H3) */}
                        <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-sans tracking-tight truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {platform.name}
                        </h2>
                      </div>
                    </div>

                    {/* Quick Card Tool Controls (Issue 3) */}
                    <div className="flex items-center gap-0.5 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => handleTogglePin(e, platform.id)}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer active:scale-90 ${
                          platform.pinned
                            ? 'text-amber-500 bg-amber-500/10'
                            : 'text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                        title={platform.pinned ? 'Unpin portal' : 'Pin to top'}
                        aria-label={platform.pinned ? 'Unpin portal' : 'Pin portal to top'}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${platform.pinned ? 'fill-current' : ''}`} />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleEdit(e, platform)}
                        className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors active:scale-90"
                        title="Edit portal"
                        aria-label={`Edit ${platform.name}`}
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleDelete(e, platform)}
                        className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-500/10 cursor-pointer transition-colors active:scale-90"
                        title="Delete portal"
                        aria-label={`Delete ${platform.name}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Normalized Description (Issue 6) */}
                  <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed min-h-[32px]">
                    {formatReadableText(platform.description) || `Direct access to ${cleanDomain} resources and tests.`}
                  </p>
                </div>

                {/* Bottom Row: Accessible URL Link (Issue 12, 5) & Primary Action (Issue 8) */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  
                  {/* Interactive Hyperlink with proper contrast & size (Issues 5, 12) */}
                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800/80 text-xs sm:text-[13px] font-mono text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 hover:underline border border-slate-200 dark:border-slate-700/60 truncate transition-colors max-w-[55%]"
                    title={`Visit ${cleanDomain}`}
                  >
                    <Globe className="w-3 h-3 text-primary-500 shrink-0" />
                    <span className="truncate">{cleanDomain}</span>
                  </a>

                  {/* Actions Right Side: Credential Copy Chip + Prominent Open Button (Issue 8) */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {hasLoginHint && (
                      <button
                        type="button"
                        onClick={(e) => handleCopyHint(e, platform.id, platform.loginHint!)}
                        className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-primary-50 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 text-xs font-mono font-medium text-slate-700 dark:text-slate-200 transition-all cursor-pointer active:scale-95"
                        title={`Copy credentials: ${platform.loginHint}`}
                        aria-label={`Copy credentials: ${platform.loginHint}`}
                      >
                        <KeyRound className="w-3 h-3 text-slate-400" />
                        <span className="max-w-[70px] truncate">{isCopied ? 'Copied!' : platform.loginHint}</span>
                        {isCopied ? <Check className="w-3 h-3 text-emerald-500 stroke-[3]" /> : <Copy className="w-3 h-3 text-slate-400" />}
                      </button>
                    )}

                    {/* Prominent Primary Launch Button (Issue 8) */}
                    <a
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation();
                        soundManager.playClick();
                      }}
                      className="btn-primary py-1.5 px-3 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
                      aria-label={`Open ${platform.name}`}
                    >
                      <span>Open</span>
                      <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Platform Modal */}
      {isAddModalOpen && (
        <AddPlatformModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          editPlatformData={editingPlatform}
        />
      )}
    </div>
  );
};

