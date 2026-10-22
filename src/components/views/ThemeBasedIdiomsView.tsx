import React, { useState, useMemo, useEffect } from 'react';
import {
  BookOpen,
  Search,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  RotateCw,
  Plus,
  Volume2,
  CheckCircle2,
  Check,
  Flame,
  Tag,
  Copy,
  Layers,
  LayoutGrid,
  Bookmark,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  X,
  FileText,
  SlidersHorizontal,
  FolderOpen
} from 'lucide-react';
import { soundManager } from '../../utils/soundEffects';
import { haptics } from '../../utils/haptics';
import {
  IDIOM_THEMES_DATA,
  IDIOM_THEME_CATEGORIES,
  IdiomTheme
} from '../../data/idiomThemesData';
import { VocabItem } from '../../data/highYieldVocabData';
import { MASTER_THEME_IDIOMS } from '../../data/themeIdiomsData';

interface ThemeBasedIdiomsViewProps {
  onBackToSets?: () => void;
}

const LOCAL_STORAGE_USER_IDIOMS_KEY = 'custom_user_theme_idioms_v1';

export const ThemeBasedIdiomsView: React.FC<ThemeBasedIdiomsViewProps> = ({
  onBackToSets
}) => {
  const [selectedThemeId, setSelectedThemeId] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'study' | 'grid'>('study');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [masteredIds, setMasteredIds] = useState<Set<string>>(() => new Set());

  // Custom User Idioms Storage for all 89 themes (User additions on top of built-in master curriculum)
  const [userCustomIdioms, setUserCustomIdioms] = useState<Record<number, Partial<VocabItem>[]>>(() => {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_USER_IDIOMS_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  // Modal State for adding an idiom
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newIdiomWord, setNewIdiomWord] = useState('');
  const [newIdiomHindi, setNewIdiomHindi] = useState('');
  const [newIdiomMeaning, setNewIdiomMeaning] = useState('');
  const [newIdiomExample, setNewIdiomExample] = useState('');
  const [newIdiomMnemonic, setNewIdiomMnemonic] = useState('');
  const [newIdiomFrequency, setNewIdiomFrequency] = useState<'Repeated' | 'High' | 'Very High'>('Repeated');

  // Save user-added idioms to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_USER_IDIOMS_KEY, JSON.stringify(userCustomIdioms));
    } catch (e) {
      console.warn('Failed to save user custom theme idioms', e);
    }
  }, [userCustomIdioms]);

  // Current Theme Object
  const currentTheme = useMemo(() => {
    return IDIOM_THEMES_DATA.find(t => t.id === selectedThemeId) || IDIOM_THEMES_DATA[0];
  }, [selectedThemeId]);

  // Filtered Themes for Catalog Grid
  const filteredThemes = useMemo(() => {
    return IDIOM_THEMES_DATA.filter(t => {
      const matchesCat = selectedCategory === 'All' || t.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesQ = !q ||
        t.title.toLowerCase().includes(q) ||
        t.hindiTitle.toLowerCase().includes(q) ||
        String(t.id) === q ||
        String(t.id).padStart(2, '0') === q ||
        t.sampleKeywords.some(k => k.toLowerCase().includes(q));
      return matchesCat && matchesQ;
    });
  }, [searchQuery, selectedCategory]);

  // Combined Idioms list in current theme (Built-in Master Curriculum + User Additions)
  const currentThemeIdioms = useMemo(() => {
    const builtIn = MASTER_THEME_IDIOMS[selectedThemeId] || [];
    const userAdded = userCustomIdioms[selectedThemeId] || [];
    return [...builtIn, ...userAdded];
  }, [userCustomIdioms, selectedThemeId]);

  const currentIdiom = currentThemeIdioms[activeCardIndex] || currentThemeIdioms[0];

  const handleSelectTheme = (themeId: number) => {
    soundManager.playClick();
    haptics.selection();
    setSelectedThemeId(themeId);
    setActiveCardIndex(0);
    setIsFlipped(false);
    setViewMode('study');
  };

  const handlePrevTheme = () => {
    soundManager.playClick();
    haptics.light();
    const prevId = selectedThemeId === 1 ? 89 : selectedThemeId - 1;
    setSelectedThemeId(prevId);
    setActiveCardIndex(0);
    setIsFlipped(false);
  };

  const handleNextTheme = () => {
    soundManager.playClick();
    haptics.light();
    const nextId = selectedThemeId === 89 ? 1 : selectedThemeId + 1;
    setSelectedThemeId(nextId);
    setActiveCardIndex(0);
    setIsFlipped(false);
  };

  const handleCopyCard = (text: string) => {
    soundManager.playClick();
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSaveNewIdiom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIdiomWord.trim() || !newIdiomMeaning.trim()) {
      alert('Please enter at least the Idiom name and its exam meaning.');
      return;
    }

    soundManager.playClick();
    haptics.success();

    const newItem: Partial<VocabItem> = {
      id: `custom-t${selectedThemeId}-${Date.now()}`,
      word: newIdiomWord.trim(),
      hindi: newIdiomHindi.trim() || 'मुहावरा / लोकोक्ति',
      meaning: newIdiomMeaning.trim(),
      example: newIdiomExample.trim() || 'This idiom is frequently tested in SSC CGL examinations.',
      mnemonic: newIdiomMnemonic.trim() || 'Theme association: ' + currentTheme.title,
      frequency: newIdiomFrequency,
      type: 'idiom',
      partOfSpeech: 'Idiom / Phrase',
      examTags: ['SSC CGL', `Theme ${String(selectedThemeId).padStart(2, '0')}`, currentTheme.title]
    };

    setUserCustomIdioms(prev => {
      const existing = prev[selectedThemeId] || [];
      return {
        ...prev,
        [selectedThemeId]: [...existing, newItem]
      };
    });

    // Reset Form
    setNewIdiomWord('');
    setNewIdiomHindi('');
    setNewIdiomMeaning('');
    setNewIdiomExample('');
    setNewIdiomMnemonic('');
    setIsAddModalOpen(false);
    setActiveCardIndex(currentThemeIdioms.length);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* 1. TOP HEADER & SWITCHER BAR */}
      <div className="p-4 sm:p-6 rounded-3xl bg-white dark:bg-[#0E101B] border border-amber-500/30 dark:border-amber-500/20 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-amber-500 text-slate-950 uppercase tracking-wider">
                89 Master Topics
              </span>
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Theme-Based Idioms & Phrases Curriculum
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              SSC Theme-Based Idioms Hub
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Explore idioms categorized by 89 psychological, behavioral & exam-repeated thematic topics. Click any theme to study or add future idioms!
            </p>
          </div>

          {/* Controls: View Switcher & Back to Sets */}
          <div className="flex items-center gap-2 flex-wrap shrink-0">
            {onBackToSets && (
              <button
                type="button"
                onClick={() => { soundManager.playClick(); onBackToSets(); }}
                className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Level Sets Mode</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setViewMode(viewMode === 'grid' ? 'study' : 'grid');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shadow-xs ${
                viewMode === 'grid'
                  ? 'bg-amber-500 text-slate-950 font-black'
                  : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
              }`}
            >
              {viewMode === 'grid' ? (
                <>
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Open Active Theme</span>
                </>
              ) : (
                <>
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Browse All 89 Themes</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/10 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 px-1 shrink-0 flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Category:</span>
          </span>
          {IDIOM_THEME_CATEGORIES.map(cat => {
            const isCatActive = selectedCategory === cat;
            const count = cat === 'All'
              ? IDIOM_THEMES_DATA.length
              : IDIOM_THEMES_DATA.filter(t => t.category === cat).length;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setSelectedCategory(cat);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  isCatActive
                    ? 'bg-amber-500 text-slate-950 shadow-2xs font-black'
                    : 'bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  isCatActive ? 'bg-black/20 text-slate-950' : 'bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-slate-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. MAIN VIEW AREA (GRID OR ACTIVE THEME STUDY) */}
      {viewMode === 'grid' ? (
        /* ========================================================
           MODE A: ALL 89 THEMES CATALOG GRID
           ======================================================== */
        <div className="space-y-4 animate-fade-in">
          {/* Search bar inside Catalog */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by theme name, number (#1 to #89), or keywords (e.g., Money, Effort, Anger)..."
              className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm rounded-2xl bg-white dark:bg-[#0E101B] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 shadow-xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white text-xs p-1"
              >
                ✕
              </button>
            )}
          </div>

          {/* Results Summary Bar */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
            <span>Showing <strong className="text-slate-800 dark:text-slate-200">{filteredThemes.length}</strong> of 89 Thematic Topics</span>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-amber-600 dark:text-amber-400 font-bold hover:underline cursor-pointer"
              >
                Clear search
              </button>
            )}
          </div>

          {/* Single-Row Theme Cards List (1 Card per Row) */}
          {filteredThemes.length > 0 ? (
            <div className="flex flex-col gap-3">
              {filteredThemes.map(theme => {
                const isSelected = selectedThemeId === theme.id;
                const count = (MASTER_THEME_IDIOMS[theme.id]?.length || 0) + (userCustomIdioms[theme.id]?.length || 0);
                const hasIdioms = count > 0;

                return (
                  <div
                    key={theme.id}
                    onClick={() => handleSelectTheme(theme.id)}
                    className={`group p-4 sm:p-5 rounded-2xl sm:rounded-3xl border text-left transition-all duration-200 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden ${
                      isSelected
                        ? 'bg-amber-500/[0.12] dark:bg-amber-500/[0.08] border-amber-500/80 dark:border-amber-400 ring-2 ring-amber-500/40 shadow-md'
                        : 'bg-white dark:bg-[#0E101B] border-slate-200/90 dark:border-white/[0.08] hover:border-amber-500/50 hover:bg-slate-50/90 dark:hover:bg-[#141727] hover:shadow-md'
                    }`}
                  >
                    {/* Left Side: Number Badge + Theme Content Info */}
                    <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 min-w-0 flex-1">
                      {/* Number Squircle Badge */}
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex flex-col items-center justify-center shrink-0 border transition-transform duration-200 group-hover:scale-105 ${
                        hasIdioms
                          ? 'bg-gradient-to-br from-amber-500 to-orange-500 text-slate-950 font-black border-amber-400/50 shadow-xs'
                          : 'bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-white/10'
                      }`}>
                        <span className="text-[9.5px] sm:text-[10px] font-mono uppercase tracking-wider opacity-80 font-bold leading-tight">Theme</span>
                        <span className="text-sm sm:text-base font-black leading-none font-mono">
                          #{String(theme.id).padStart(2, '0')}
                        </span>
                      </div>

                      {/* Core Text & Details */}
                      <div className="min-w-0 flex-1 space-y-1 sm:space-y-1.5">
                        {/* Top Meta Line: Category Badge + Hindi Meaning */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2.5 py-0.5 rounded-lg text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                            {theme.category}
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-amber-700 dark:text-amber-300/90 bg-amber-500/5 dark:bg-amber-400/10 px-2 py-0.5 rounded-md">
                            {theme.hindiTitle}
                          </span>
                          {hasIdioms && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                              <Flame className="w-3 h-3 fill-emerald-500 text-emerald-500" />
                              Active Master Deck
                            </span>
                          )}
                        </div>

                        {/* Title Line */}
                        <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors tracking-tight flex items-center gap-2">
                          <span>{theme.title}</span>
                        </h3>

                        {/* Theme Description */}
                        <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl line-clamp-2 md:line-clamp-none">
                          {theme.description}
                        </p>

                        {/* Sample Idioms / Keyword Chips Preview */}
                        {theme.sampleKeywords && theme.sampleKeywords.length > 0 && (
                          <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                              Key Idioms:
                            </span>
                            {theme.sampleKeywords.slice(0, 4).map((kw, kwIdx) => (
                              <span
                                key={kwIdx}
                                className="px-2 py-0.5 rounded-md text-[10.5px] font-medium bg-slate-100 dark:bg-white/[0.05] text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-white/10"
                              >
                                • {kw}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right Side: Stats & Open Button */}
                    <div className="flex items-center justify-between md:justify-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-white/5 shrink-0 self-stretch md:self-center">
                      <div className="flex flex-col items-start md:items-end">
                        <span className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 border shadow-2xs ${
                          hasIdioms
                            ? 'bg-emerald-500/15 dark:bg-emerald-400/20 text-emerald-800 dark:text-emerald-300 border-emerald-500/30'
                            : 'bg-slate-100 dark:bg-white/[0.06] text-slate-500 dark:text-slate-400 border-slate-200/80 dark:border-white/10'
                        }`}>
                          {hasIdioms ? (
                            <>
                              <Flame className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                              <span>{count} Idioms</span>
                            </>
                          ) : (
                            <>
                              <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                              <span>Ready for Idioms</span>
                            </>
                          )}
                        </span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 hidden md:block">
                          {hasIdioms ? 'Study Flashcards' : 'Click to preview / add'}
                        </span>
                      </div>

                      <button
                        type="button"
                        className={`px-4 py-2 sm:py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0 ${
                          isSelected
                            ? 'bg-amber-500 text-slate-950 font-black'
                            : 'bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-slate-200 group-hover:bg-amber-500 group-hover:text-slate-950'
                        }`}
                      >
                        <span>Open Theme</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-10 text-center rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 space-y-3">
              <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
              <h4 className="text-base font-bold text-slate-800 dark:text-slate-200">No themes match your search</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Try searching with a different keyword, category, or theme number.</p>
              <button
                type="button"
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 cursor-pointer"
              >
                Reset all filters
              </button>
            </div>
          )}
        </div>
      ) : (
        /* ========================================================
           MODE B: ACTIVE THEME STUDY DECK (INTERACTIVE FLASHCARD OR BLUEPRINT)
           ======================================================== */
        <div className="space-y-4 animate-fade-in">

          {/* Theme Stepper Navigation Header */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0E101B] border border-slate-200/90 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center justify-center font-black text-sm shrink-0">
                #{String(currentTheme.id).padStart(2, '0')}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                    {currentTheme.category} • Theme {currentTheme.id} of 89
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    currentThemeIdioms.length > 0
                      ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                      : 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                  }`}>
                    {currentThemeIdioms.length} Idioms Available
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-0.5">
                  {currentTheme.title} <span className="text-sm font-semibold text-amber-700 dark:text-amber-300">({currentTheme.hindiTitle})</span>
                </h3>
              </div>
            </div>

            {/* Stepper Buttons & Add Idiom Button */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
              <button
                type="button"
                onClick={handlePrevTheme}
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 text-xs font-bold text-slate-700 dark:text-slate-200 transition-all flex items-center gap-1 cursor-pointer"
                title="Previous Theme"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden xs:inline">Prev Theme</span>
              </button>

              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Idiom</span>
              </button>

              <button
                type="button"
                onClick={handleNextTheme}
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 text-xs font-bold text-slate-700 dark:text-slate-200 transition-all flex items-center gap-1 cursor-pointer"
                title="Next Theme"
              >
                <span className="hidden xs:inline">Next Theme</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Flashcard Area or Pristine Future Blueprint */}
          {currentThemeIdioms.length > 0 ? (
            /* HAS IDIOMS: Render Flashcard + List View */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
              
              {/* Left: Active Flashcard */}
              <div className="lg:col-span-8 xl:col-span-9 flex flex-col justify-between p-4 sm:p-7 rounded-3xl bg-white dark:bg-[#0E101B] border-2 border-amber-500/30 dark:border-amber-500/20 shadow-md relative min-h-[440px]">
                
                {/* Meta Top Bar */}
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-white/10 pb-3 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-xl text-xs font-mono font-black bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white">
                      CARD {String(activeCardIndex + 1).padStart(2, '0')}/{String(currentThemeIdioms.length).padStart(2, '0')}
                    </span>
                    <span className="px-2.5 py-1 rounded-xl text-xs font-bold bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/20 flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5" />
                      <span>{currentIdiom?.frequency || 'Repeated'}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (!currentIdiom?.id) return;
                        soundManager.playClick();
                        setMasteredIds(prev => {
                          const n = new Set(prev);
                          if (n.has(currentIdiom.id!)) n.delete(currentIdiom.id!);
                          else n.add(currentIdiom.id!);
                          return n;
                        });
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        currentIdiom?.id && masteredIds.has(currentIdiom.id)
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{currentIdiom?.id && masteredIds.has(currentIdiom.id) ? 'Mastered' : 'Mark Mastered'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCopyCard(`${currentIdiom?.word} - ${currentIdiom?.meaning} (${currentIdiom?.hindi})`)}
                      className="p-2 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors"
                      title="Copy Card"
                    >
                      {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Core Idiom Display */}
                <div className="my-5 space-y-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 uppercase">
                        {currentIdiom?.partOfSpeech || 'Idiom / Phrase'}
                      </span>
                      {currentIdiom?.phonetic && (
                        <span className="text-xs font-mono text-slate-400">
                          {currentIdiom.phonetic}
                        </span>
                      )}
                      {currentIdiom?.examTags && currentIdiom.examTags.map((t, idx) => (
                        <span key={idx} className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300">
                          {t}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                      {currentIdiom?.word}
                    </h2>
                    {currentIdiom?.hindi && (
                      <div className="mt-2 text-base sm:text-lg font-bold text-amber-800 dark:text-amber-300 bg-amber-500/10 px-3 py-1.5 rounded-xl inline-block border border-amber-500/20">
                        {currentIdiom.hindi}
                      </div>
                    )}
                  </div>

                  {/* Meaning & Reveal Box */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-[#151726] border border-slate-200/80 dark:border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Exam Meaning
                      </span>
                      <button
                        type="button"
                        onClick={() => { soundManager.playClick(); setIsFlipped(!isFlipped); }}
                        className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>{isFlipped ? 'Hide Details' : 'Flip to Reveal'}</span>
                      </button>
                    </div>
                    <p className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                      {currentIdiom?.meaning}
                    </p>

                    {isFlipped && (
                      <div className="pt-3 border-t border-slate-200 dark:border-white/10 space-y-3 animate-fade-in text-xs sm:text-sm">
                        {currentIdiom?.example && (
                          <div className="p-3.5 rounded-xl bg-white dark:bg-[#0E101B] border border-slate-200 dark:border-white/10 shadow-2xs">
                            <strong className="text-amber-700 dark:text-amber-300 block mb-1">📖 SSC Exam Sentence:</strong>
                            <p className="text-slate-700 dark:text-slate-300 italic">"{currentIdiom.example}"</p>
                          </div>
                        )}
                        {currentIdiom?.mnemonic && (
                          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-slate-800 dark:text-amber-100 shadow-2xs">
                            <strong className="text-amber-800 dark:text-amber-300 block mb-1">🧠 Desi Trick & Origin Mnemonic:</strong>
                            <p className="leading-relaxed">{currentIdiom.mnemonic}</p>
                          </div>
                        )}
                        {currentIdiom?.synonyms && currentIdiom.synonyms.length > 0 && (
                          <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 flex items-center gap-2 flex-wrap">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 shrink-0">
                              ⚡ Equivalent Idioms:
                            </span>
                            {currentIdiom.synonyms.map((s, idx) => (
                              <span key={idx} className="px-2 py-0.5 rounded-md text-xs font-semibold bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20">
                                {s}
                              </span>
                            ))}
                          </div>
                        )}
                        {currentIdiom?.antonyms && currentIdiom.antonyms.length > 0 && (
                          <div className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/20 flex items-center gap-2 flex-wrap">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 shrink-0">
                              ⚡ Opposite / Contrast:
                            </span>
                            {currentIdiom.antonyms.map((a, idx) => (
                              <span key={idx} className="px-2 py-0.5 rounded-md text-xs font-semibold bg-rose-500/15 text-rose-800 dark:text-rose-300 border border-rose-500/20">
                                {a}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Navigation Controls */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      haptics.light();
                      setActiveCardIndex(prev => (prev === 0 ? currentThemeIdioms.length - 1 : prev - 1));
                      setIsFlipped(false);
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      haptics.light();
                      setActiveCardIndex(prev => (prev === currentThemeIdioms.length - 1 ? 0 : prev + 1));
                      setIsFlipped(false);
                    }}
                    className="px-5 py-2 rounded-xl text-xs font-black bg-amber-500 hover:bg-amber-400 text-slate-950 transition flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <span>Next Card</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right: Idioms in this theme list */}
              <div className="lg:col-span-4 xl:col-span-3 p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/90 dark:border-white/10 flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="text-xs font-extrabold uppercase text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-white/10 pb-2 flex items-center justify-between">
                    <span>Idioms in Theme ({currentThemeIdioms.length})</span>
                    <span className="font-mono text-amber-500">#{currentTheme.id}</span>
                  </h4>
                  <div className="mt-3 space-y-1.5 max-h-[380px] overflow-y-auto no-scrollbar">
                    {currentThemeIdioms.map((item, idx) => {
                      const isCurrent = idx === activeCardIndex;
                      return (
                        <button
                          key={item.id || idx}
                          type="button"
                          onClick={() => {
                            soundManager.playClick();
                            setActiveCardIndex(idx);
                            setIsFlipped(false);
                          }}
                          className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-center justify-between gap-2 cursor-pointer ${
                            isCurrent
                              ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                              : 'hover:bg-slate-100 dark:hover:bg-white/[0.05] text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <span className="truncate">{item.word}</span>
                          <span className="text-[10px] font-mono opacity-60">#{idx + 1}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(true)}
                  className="w-full py-2.5 rounded-xl border-2 border-dashed border-amber-500/40 hover:border-amber-500 text-amber-600 dark:text-amber-400 text-xs font-extrabold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Another Idiom</span>
                </button>
              </div>
            </div>
          ) : (
            /* NO IDIOMS YET: RENDER PRISTINE MASTER BLUEPRINT */
            <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#0E101B] border-2 border-dashed border-amber-500/40 dark:border-amber-500/30 space-y-6 text-center">
              
              <div className="max-w-xl mx-auto space-y-3">
                <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center justify-center">
                  <FolderOpen className="w-8 h-8" />
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-bold border border-amber-500/20">
                  <Sparkles className="w-3.5 h-3.5" />
                  Theme #{String(currentTheme.id).padStart(2, '0')} Master Blueprint Ready
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  Ready for Future Idioms Addition
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Is topic (<strong>{currentTheme.title} — {currentTheme.hindiTitle}</strong>) ka interactive layout, flashcard engine aur test preview bilkul tayyar hai. Future me jab aap is topic ke idioms provide karenge, wo turant is theme me live show hone lagenge!
                </p>

                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(true)}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all flex items-center gap-2 shadow-md cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add 1st Idiom to This Theme</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNextTheme}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 text-xs font-bold text-slate-700 dark:text-slate-200 transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>Check Next Theme</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Sample Blueprint Card Preview (How added idioms will appear) */}
              <div className="max-w-2xl mx-auto p-5 rounded-2xl bg-slate-50/70 dark:bg-[#141624] border border-slate-200/80 dark:border-white/10 text-left space-y-3 opacity-90">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-slate-200/60 dark:border-white/5 pb-2">
                  <span className="font-bold text-amber-500">SAMPLE CARD PREVIEW</span>
                  <span>CARD 01/XX</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-700 dark:text-amber-300 uppercase">
                    Idiom / Phrase
                  </span>
                  <h4 className="text-lg font-black text-slate-900 dark:text-white mt-1">
                    {currentTheme.sampleKeywords[0] || 'Sample Idiom Phrase'}
                  </h4>
                  <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mt-0.5">
                    हिंदी अनुवाद यहाँ दिखेगा
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-[#0E101B] border border-slate-200 dark:border-white/5 text-xs text-slate-600 dark:text-slate-300">
                  <strong>Exam Meaning:</strong> Comprehensive English meaning tested in SSC CGL / CHSL papers will appear here.
                </div>
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200">
                  <strong>Mnemonic Trick:</strong> Origin story & desi memory hook for 100% long-term recall.
                </div>
              </div>

            </div>
          )}
        </div>
      )}

      {/* 3. MODAL: ADD CUSTOM IDIOM TO ACTIVE THEME */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-[#0E101B] border-2 border-amber-500/40 p-6 space-y-4 shadow-2xl relative">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-wider">
                  Theme #{String(currentTheme.id).padStart(2, '0')} • {currentTheme.title}
                </span>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
                  ➕ Add Idiom to Theme
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 text-xs"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNewIdiom} className="space-y-3.5 text-xs sm:text-sm">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Idiom / Phrase Word <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newIdiomWord}
                  onChange={e => setNewIdiomWord(e.target.value)}
                  placeholder="e.g., Hit the nail on the head"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#161826] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Hindi Meaning (हिंदी अर्थ)
                </label>
                <input
                  type="text"
                  value={newIdiomHindi}
                  onChange={e => setNewIdiomHindi(e.target.value)}
                  placeholder="e.g., सटीक बात कहना / सही समय पर सही कदम उठाना"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#161826] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Primary Exam Meaning <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  value={newIdiomMeaning}
                  onChange={e => setNewIdiomMeaning(e.target.value)}
                  placeholder="e.g., To say or do something exactly right."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#161826] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 leading-relaxed"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Example Sentence
                </label>
                <input
                  type="text"
                  value={newIdiomExample}
                  onChange={e => setNewIdiomExample(e.target.value)}
                  placeholder="e.g., Her analysis hit the nail on the head."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#161826] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Mnemonic Trick / Origin Story
                </label>
                <input
                  type="text"
                  value={newIdiomMnemonic}
                  onChange={e => setNewIdiomMnemonic(e.target.value)}
                  placeholder="e.g., Carpenter ke hathode ka nishana theek keel par lagna..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#161826] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Exam Frequency
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Repeated', 'High', 'Very High'] as const).map(freq => (
                    <button
                      key={freq}
                      type="button"
                      onClick={() => setNewIdiomFrequency(freq)}
                      className={`py-1.5 rounded-xl text-xs font-bold transition-all border ${
                        newIdiomFrequency === freq
                          ? 'bg-amber-500 text-slate-950 font-black border-amber-400'
                          : 'bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 border-transparent'
                      }`}
                    >
                      {freq}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all shadow-md cursor-pointer"
                >
                  Save to Theme #{currentTheme.id}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
