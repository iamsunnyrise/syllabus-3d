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
import { LEVEL_1_SET_01_IDIOMS } from '../../data/highYieldIdiomsData';

interface ThemeBasedIdiomsViewProps {
  onBackToSets?: () => void;
}

const LOCAL_STORAGE_THEME_IDIOMS_KEY = 'custom_theme_idioms_store_v1';

// Seed some initial mappings from existing idioms to themes
const INITIAL_THEME_IDIOM_MAPPINGS: Record<number, Partial<VocabItem>[]> = {
  1: [
    {
      id: 'theme-1-1',
      word: 'Burn the midnight oil',
      phonetic: '/bɜːn ðə ˈmɪd.naɪt ɔɪl/',
      hindi: 'देर रात तक कड़ी मेहनत / पढ़ाई करना',
      type: 'idiom',
      partOfSpeech: 'Idiom / Phrase',
      meaning: 'To work or study late into the night with intense dedication.',
      example: 'Aspirants often burn the midnight oil during the final revision month.',
      mnemonic: 'Before electricity, late night study required keeping oil lamps burning past midnight.',
      frequency: 'Repeated',
      examTags: ['SSC CGL', 'CHSL', 'CPO', 'Theme 01']
    },
    {
      id: 'theme-1-2',
      word: 'A Ball of Fire',
      phonetic: '/ə bɔːl əv ˈfaɪər/',
      hindi: 'अत्यंत ऊर्जावान और कर्मठ व्यक्ति',
      type: 'idiom',
      partOfSpeech: 'Idiom / Phrase',
      meaning: 'A person who has a huge amount of energy, drive, and relentless work ethic.',
      example: 'The new manager is a ball of fire; she revamped the entire production within a week.',
      mnemonic: 'Imagine a sphere of raging fire—uncontainable energy that drives everything forward.',
      frequency: 'Repeated',
      examTags: ['SSC CGL', 'Theme 01']
    }
  ],
  4: [
    {
      id: 'theme-4-1',
      word: 'A Bad Egg',
      phonetic: '/ə bæd eɡ/',
      hindi: 'परिवार या समूह का बदनाम / धोखेबाज़ सदस्य',
      type: 'idiom',
      partOfSpeech: 'Idiom / Phrase',
      meaning: 'Someone who is dishonest, unreliable, or brings disgrace to their group.',
      example: 'The entire family consists of respected academics, but the youngest son turned out to be a bad egg.',
      mnemonic: 'Anda bahar se safed dikhta hai par todne par sada hua nikalta hai—theek waise hi dhokhebaaz log.',
      frequency: 'Repeated',
      examTags: ['SSC CGL', 'CHSL', 'Theme 04']
    }
  ],
  10: [
    {
      id: 'theme-10-1',
      word: 'Through thick and thin',
      phonetic: '/θruː θɪk ænd θɪn/',
      hindi: 'हर अच्छे और बुरे समय में साथ निभाना',
      type: 'idiom',
      partOfSpeech: 'Idiom / Phrase',
      meaning: 'Under all conditions, no matter how difficult or challenging the circumstances are.',
      example: 'True friends stand by each other through thick and thin.',
      mnemonic: 'Chahe jangal ghana (thick) ho ya patla (thin), raste par sath chalna.',
      frequency: 'Repeated',
      examTags: ['SSC CGL', 'CHSL', 'Theme 10']
    }
  ],
  17: [
    {
      id: 'theme-17-1',
      word: 'A blessing in disguise',
      phonetic: '/ə ˈbles.ɪŋ ɪn dɪsˈɡaɪz/',
      hindi: 'शुरुआत में बुरा लगने वाला पर अंततः लाभकारी साबित होने वाला अवसर',
      type: 'idiom',
      partOfSpeech: 'Idiom / Phrase',
      meaning: 'Something that seems bad or unlucky at first, but results in something good later.',
      example: 'Losing that job was a blessing in disguise as it forced him to prepare and clear SSC CGL.',
      mnemonic: 'Ek vardan (blessing) jo bhes badalkar (disguise) mushkil roop me aaye.',
      frequency: 'Repeated',
      examTags: ['SSC CGL', 'CHSL', 'MTS', 'Theme 17']
    }
  ],
  53: [
    {
      id: 'theme-53-1',
      word: 'A Backseat Driver',
      phonetic: '/ə ˈbæk.siːt ˈdraɪ.vər/',
      hindi: 'बेवजह निर्देश देने वाला व्यक्ति',
      type: 'idiom',
      partOfSpeech: 'Idiom / Phrase',
      meaning: 'Someone who gives unwanted advice and tries to control things without having real responsibility.',
      example: 'I have been managing this project for five years, so please do not be a backseat driver.',
      mnemonic: 'Pichli seat par baithkar driver ko tokna—koyi asal zimmedari na hona.',
      frequency: 'Repeated',
      examTags: ['SSC CGL', 'CHSL', 'Theme 53']
    }
  ]
};

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

  // Custom User Idioms Storage for all 89 themes
  const [customThemeIdioms, setCustomThemeIdioms] = useState<Record<number, Partial<VocabItem>[]>>(() => {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_THEME_IDIOMS_KEY);
      return raw ? JSON.parse(raw) : INITIAL_THEME_IDIOM_MAPPINGS;
    } catch {
      return INITIAL_THEME_IDIOM_MAPPINGS;
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

  // Save to LocalStorage whenever customThemeIdioms changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_THEME_IDIOMS_KEY, JSON.stringify(customThemeIdioms));
    } catch (e) {
      console.warn('Failed to save custom theme idioms', e);
    }
  }, [customThemeIdioms]);

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

  // Idioms list in current theme
  const currentThemeIdioms = useMemo(() => {
    return customThemeIdioms[selectedThemeId] || [];
  }, [customThemeIdioms, selectedThemeId]);

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

    setCustomThemeIdioms(prev => {
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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredThemes.map(theme => {
              const isSelected = selectedThemeId === theme.id;
              const count = (customThemeIdioms[theme.id] || []).length;
              return (
                <div
                  key={theme.id}
                  onClick={() => handleSelectTheme(theme.id)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer group flex flex-col justify-between space-y-3 relative overflow-hidden ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-500 dark:border-amber-400 ring-2 ring-amber-500/40 shadow-md'
                      : 'bg-white dark:bg-[#0E101B] border-slate-200/90 dark:border-white/10 hover:border-amber-500/50 hover:bg-slate-50 dark:hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-1">
                      <span className="px-2 py-0.5 rounded-lg text-[10px] font-mono font-black bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-slate-200">
                        #{String(theme.id).padStart(2, '0')}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 truncate max-w-[140px]">
                        {theme.category}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors flex items-center justify-between">
                        <span>{theme.title}</span>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                      </h3>
                      <p className="text-xs text-amber-700 dark:text-amber-300/80 font-medium mt-0.5">
                        {theme.hindiTitle}
                      </p>
                    </div>

                    <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {theme.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-white/5 text-[11px]">
                    <span className={`px-2 py-0.5 rounded-full font-bold ${
                      count > 0
                        ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                        : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                    }`}>
                      {count > 0 ? `${count} Idioms` : 'Ready for Idioms'}
                    </span>
                    <span className="text-slate-400 group-hover:text-amber-500 font-bold transition-colors">
                      Open Theme →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
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
                        Idiom / Phrase
                      </span>
                      {currentIdiom?.phonetic && (
                        <span className="text-xs font-mono text-slate-400">
                          {currentIdiom.phonetic}
                        </span>
                      )}
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
                      <div className="pt-3 border-t border-slate-200 dark:border-white/10 space-y-2.5 animate-fade-in text-xs sm:text-sm">
                        {currentIdiom?.example && (
                          <div className="p-3 rounded-xl bg-white dark:bg-[#0E101B] border border-slate-200 dark:border-white/10">
                            <strong className="text-amber-700 dark:text-amber-300 block mb-1">📖 Exam Sentence:</strong>
                            <p className="text-slate-700 dark:text-slate-300 italic">"{currentIdiom.example}"</p>
                          </div>
                        )}
                        {currentIdiom?.mnemonic && (
                          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-slate-800 dark:text-amber-100">
                            <strong className="text-amber-800 dark:text-amber-300 block mb-1">🧠 Desi Trick / Mnemonic:</strong>
                            <p className="leading-relaxed">{currentIdiom.mnemonic}</p>
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
