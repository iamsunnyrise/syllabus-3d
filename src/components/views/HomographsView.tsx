import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  Search,
  Volume2,
  Star,
  Copy,
  Check,
  Sparkles,
  Layers,
  Eye,
  EyeOff,
  Filter,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Shuffle,
  X,
  Compass,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import {
  HOMOGRAPHS_DATA,
  HomographGroup,
  HomographSense
} from '../../data/highYieldHomographsData';
import { soundManager } from '../../utils/soundEffects';
import { haptics } from '../../utils/haptics';

export const HomographsView: React.FC = () => {
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string>('all');
  const [selectedSenseFilter, setSelectedSenseFilter] = useState<'all' | '2' | '3+'>('all');
  const [onlyStarred, setOnlyStarred] = useState(false);
  const [activeViewMode, setActiveViewMode] = useState<'comparison' | 'drill' | 'table'>('comparison');

  // Starred Homographs persisted in localStorage
  const [starredWords, setStarredWords] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('syllabus_homographs_starred');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Drill mode: Revealed card IDs
  const [revealedDrillIds, setRevealedDrillIds] = useState<Set<string>>(new Set());

  // Copied state indicator
  const [copiedWord, setCopiedWord] = useState<string | null>(null);

  // Audio speech synthesis playing indicator
  const [playingWord, setPlayingWord] = useState<string | null>(null);

  // Toggle star
  const toggleStar = useCallback((word: string) => {
    soundManager.playClick();
    haptics.selection();
    setStarredWords(prev => {
      const next = new Set(prev);
      if (next.has(word)) {
        next.delete(word);
      } else {
        next.add(word);
      }
      try {
        localStorage.setItem('syllabus_homographs_starred', JSON.stringify([...next]));
      } catch (e) {
        console.error('Failed to save starred homographs:', e);
      }
      return next;
    });
  }, []);

  // Pronounce word
  const speakWord = useCallback((word: string) => {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      setPlayingWord(word);
      utterance.onend = () => setPlayingWord(null);
      utterance.onerror = () => setPlayingWord(null);
      window.speechSynthesis.speak(utterance);
      haptics.selection();
    } catch {
      setPlayingWord(null);
    }
  }, []);

  // Copy homograph group text
  const copyGroupText = useCallback((group: HomographGroup) => {
    soundManager.playClick();
    haptics.selection();
    const text = [
      `📖 Homograph: ${group.word}`,
      ...group.senses.map((s, idx) => 
        `[${idx + 1}] (${s.partOfSpeech}) ${s.hindiMeaning}\nMeaning: ${s.englishMeaning}\nEg: ${s.englishSentence}\nHindi: ${s.hindiSentence}`
      )
    ].join('\n\n');

    navigator.clipboard.writeText(text).then(() => {
      setCopiedWord(group.word);
      setTimeout(() => setCopiedWord(null), 2000);
    });
  }, []);

  // Toggle drill reveal for single word
  const toggleDrillReveal = useCallback((wordId: string) => {
    soundManager.playClick();
    haptics.selection();
    setRevealedDrillIds(prev => {
      const next = new Set(prev);
      if (next.has(wordId)) {
        next.delete(wordId);
      } else {
        next.add(wordId);
      }
      return next;
    });
  }, []);

  // Reveal all in drill mode
  const revealAllDrills = useCallback(() => {
    soundManager.playClick();
    haptics.selection();
    setRevealedDrillIds(new Set(HOMOGRAPHS_DATA.map(g => g.id)));
  }, []);

  // Hide all in drill mode
  const hideAllDrills = useCallback(() => {
    soundManager.playClick();
    haptics.selection();
    setRevealedDrillIds(new Set());
  }, []);

  // Available initial letters
  const availableLetters = useMemo(() => {
    const letters = new Set<string>();
    HOMOGRAPHS_DATA.forEach(g => {
      letters.add(g.word.charAt(0).toUpperCase());
    });
    return Array.from(letters).sort();
  }, []);

  // Total senses count across all homographs
  const totalAllSenses = useMemo(() => {
    return HOMOGRAPHS_DATA.reduce((acc, g) => acc + g.sensesCount, 0);
  }, []);

  const twoSensesCount = useMemo(() => HOMOGRAPHS_DATA.filter(g => g.sensesCount === 2).length, []);
  const threePlusSensesCount = useMemo(() => HOMOGRAPHS_DATA.filter(g => g.sensesCount >= 3).length, []);

  // Filtered Homograph Groups
  const filteredGroups = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return HOMOGRAPHS_DATA.filter(group => {
      // Starred filter
      if (onlyStarred && !starredWords.has(group.word)) {
        return false;
      }

      // Letter filter
      if (selectedLetter !== 'all' && group.word.charAt(0).toUpperCase() !== selectedLetter) {
        return false;
      }

      // Sense count filter
      if (selectedSenseFilter === '2' && group.sensesCount !== 2) {
        return false;
      }
      if (selectedSenseFilter === '3+' && group.sensesCount < 3) {
        return false;
      }

      // Search query filter (matches headword, hindi meaning, english meaning, or sentence)
      if (q) {
        const matchesWord = group.word.toLowerCase().includes(q);
        const matchesSenses = group.senses.some(s =>
          s.hindiMeaning.toLowerCase().includes(q) ||
          s.englishMeaning.toLowerCase().includes(q) ||
          s.englishSentence.toLowerCase().includes(q) ||
          s.hindiSentence.toLowerCase().includes(q) ||
          s.partOfSpeech.toLowerCase().includes(q)
        );
        return matchesWord || matchesSenses;
      }

      return true;
    });
  }, [searchQuery, selectedLetter, selectedSenseFilter, onlyStarred, starredWords]);

  // Total senses count in current filtered view
  const totalFilteredSenses = useMemo(() => {
    return filteredGroups.reduce((acc, g) => acc + g.sensesCount, 0);
  }, [filteredGroups]);

  // Color helper for Part of Speech badges
  const getPosBadgeStyle = (category: string) => {
    switch (category) {
      case 'noun':
        return 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30';
      case 'verb':
        return 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30';
      case 'adj':
        return 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30';
      case 'adv':
        return 'bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30';
      default:
        return 'bg-violet-500/15 text-violet-700 dark:text-violet-300 border-violet-500/30';
    }
  };

  // Highlight word occurrences in example sentence
  const highlightWord = (sentence: string, targetWord: string) => {
    if (!sentence || !targetWord) return sentence;
    // Word boundary regex matching root or simple inflections (e.g. arm, arms, armed, addressing, addressed)
    const regex = new RegExp(`\\b(${targetWord}[a-zA-Z]*)\\b`, 'gi');
    const parts = sentence.split(regex);
    return parts.map((part, i) => {
      if (part.toLowerCase().startsWith(targetWord.toLowerCase().slice(0, 3))) {
        return (
          <span
            key={i}
            className="font-black text-amber-600 dark:text-amber-400 underline decoration-amber-500/40 decoration-2 underline-offset-2"
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* 1. Header Hero Card */}
      <div className="study-hub-hero-banner homographs-hero-banner preserve-color p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 text-white shadow-xl border border-indigo-500/30 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="space-y-2.5">
            {/* Top Pill Badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500/20 !text-amber-300 border border-amber-400/40 shadow-xs backdrop-blur-md preserve-color"
              style={{ color: '#FCD34D' }}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span className="font-bold tracking-wide" style={{ color: '#FCD34D' }}>
                SSC CGL • CHSL • CPO • CDS High-Yield Homographs
              </span>
            </div>

            {/* Title with Hindi Pill Tag */}
            <h2
              className="study-hub-banner-title text-2xl sm:text-3xl md:text-4xl font-black tracking-tight flex items-center flex-wrap gap-2.5 !text-white preserve-color"
              style={{ color: '#FFFFFF', textShadow: '0 2px 10px rgba(0, 0, 0, 0.75)' }}
            >
              <span style={{ color: '#FFFFFF' }}>Homographs Mastery</span>
              <span
                className="text-xs sm:text-sm font-bold px-2.5 py-0.5 rounded-lg bg-white/15 !text-amber-200 font-hindi border border-white/25 shadow-xs preserve-color"
                style={{ color: '#FDE68A' }}
              >
                समान वर्तनी, भिन्न अर्थ
              </span>
            </h2>

            {/* Subtitle / Description */}
            <p
              className="study-hub-banner-subtitle text-xs sm:text-sm !text-slate-100 max-w-2xl leading-relaxed font-normal preserve-color"
              style={{ color: '#F1F5F9', textShadow: '0 1px 4px rgba(0, 0, 0, 0.85)' }}
            >
              एक ही स्पेलिंग वाले शब्द जिनके{' '}
              <strong className="!text-amber-300 font-bold" style={{ color: '#FCD34D' }}>
                अलग-अलग अर्थ व Part of Speech
              </strong>{' '}
              होते हैं। छात्रों के भ्रम को हमेशा के लिए दूर करने के लिए प्रत्येक समूह के सभी अर्थ आमने-सामने (side-by-side) व्यवस्थित हैं।
            </p>
          </div>

          {/* Quick Metrics Bento Badges */}
          <div className="flex items-center gap-3 shrink-0 self-stretch sm:self-auto">
            <div className="homographs-metric-tile flex-1 sm:flex-initial px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-white/20 text-center shadow-lg transition-all hover:border-amber-400/40 preserve-color">
              <div
                className="text-2xl sm:text-3xl font-mono font-black !text-amber-400 drop-shadow-sm tabular-nums"
                style={{ color: '#FBBF24' }}
              >
                {HOMOGRAPHS_DATA.length}
              </div>
              <div
                className="homographs-metric-label text-[11px] font-bold !text-slate-100 uppercase tracking-wider mt-0.5 preserve-color"
                style={{ color: '#F1F5F9' }}
              >
                Word Groups
              </div>
            </div>

            <div className="homographs-metric-tile flex-1 sm:flex-initial px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-white/20 text-center shadow-lg transition-all hover:border-emerald-400/40 preserve-color">
              <div
                className="text-2xl sm:text-3xl font-mono font-black !text-emerald-400 drop-shadow-sm tabular-nums"
                style={{ color: '#34D399' }}
              >
                {totalAllSenses}
              </div>
              <div
                className="homographs-metric-label text-[11px] font-bold !text-slate-100 uppercase tracking-wider mt-0.5 preserve-color"
                style={{ color: '#F1F5F9' }}
              >
                Meanings / Senses
              </div>
            </div>

            <div className="homographs-metric-tile flex-1 sm:flex-initial px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-white/20 text-center shadow-lg transition-all hover:border-pink-400/40 preserve-color">
              <div
                className="text-2xl sm:text-3xl font-mono font-black !text-pink-400 drop-shadow-sm tabular-nums"
                style={{ color: '#F472B6' }}
              >
                {starredWords.size}
              </div>
              <div
                className="homographs-metric-label text-[11px] font-bold !text-slate-100 uppercase tracking-wider mt-0.5 preserve-color"
                style={{ color: '#F1F5F9' }}
              >
                Starred
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Search & Filters Bar */}
      <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-4">
        
        {/* Row 1: Search Bar + View Mode Toggle + Starred Filter */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search word (e.g. Address, Arm, Bear), Hindi meaning (पता, समाधान), or sentence..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.06] border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/10 shrink-0">
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                haptics.selection();
                setActiveViewMode('comparison');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeViewMode === 'comparison'
                  ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-xs font-black'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-amber-500" />
              <span>Side-by-Side</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                haptics.selection();
                setActiveViewMode('drill');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeViewMode === 'drill'
                  ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-xs font-black'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5 text-indigo-500" />
              <span>Active Drill</span>
            </button>
          </div>

          {/* Starred Only Toggle */}
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              haptics.selection();
              setOnlyStarred(prev => !prev);
            }}
            className={`flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 border ${
              onlyStarred
                ? 'bg-amber-500 text-slate-950 border-amber-600 font-black shadow-xs'
                : 'bg-slate-50 dark:bg-white/[0.06] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${onlyStarred ? 'fill-slate-950 text-slate-950' : 'text-amber-500'}`} />
            <span>Starred Only</span>
            {starredWords.size > 0 && (
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                onlyStarred ? 'bg-black/20 text-slate-950' : 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
              }`}>
                {starredWords.size}
              </span>
            )}
          </button>
        </div>

        {/* Row 2: Alphabet Quick Jump + Senses Filter */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-100 dark:border-white/5">
          
          {/* Alphabet Pills */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 mr-1 shrink-0">
              Letter:
            </span>
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setSelectedLetter('all');
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all shrink-0 ${
                selectedLetter === 'all'
                  ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-black'
                  : 'bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              All
            </button>
            {availableLetters.map(letter => (
              <button
                key={letter}
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setSelectedLetter(letter);
                }}
                className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center transition-all shrink-0 ${
                  selectedLetter === letter
                    ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-black'
                    : 'bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>

          {/* Sense Count Filter & Drill Controls */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-100 dark:bg-white/[0.06] border border-slate-200/80 dark:border-white/10 text-xs">
              <button
                type="button"
                onClick={() => setSelectedSenseFilter('all')}
                className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                  selectedSenseFilter === 'all'
                    ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-2xs font-black'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                All Senses
              </button>
              <button
                type="button"
                onClick={() => setSelectedSenseFilter('2')}
                className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                  selectedSenseFilter === '2'
                    ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-2xs font-black'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                2 Senses ({twoSensesCount})
              </button>
              <button
                type="button"
                onClick={() => setSelectedSenseFilter('3+')}
                className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                  selectedSenseFilter === '3+'
                    ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-2xs font-black'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                3+ Senses ({threePlusSensesCount})
              </button>
            </div>

            {/* In Drill Mode: Reveal All / Hide All Buttons */}
            {activeViewMode === 'drill' && (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={revealAllDrills}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/20 transition-all"
                >
                  Reveal All
                </button>
                <button
                  type="button"
                  onClick={hideAllDrills}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/20 transition-all"
                >
                  Hide All
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Results Counter */}
      <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 px-1">
        <div>
          Showing <strong className="text-slate-950 dark:text-white font-mono">{filteredGroups.length}</strong> homograph groups 
          (<strong className="text-amber-600 dark:text-amber-400 font-mono">{totalFilteredSenses}</strong> meanings)
          {searchQuery && <span> matching &ldquo;<span className="text-slate-950 dark:text-white font-bold">{searchQuery}</span>&rdquo;</span>}
        </div>
        {(searchQuery || selectedLetter !== 'all' || selectedSenseFilter !== 'all' || onlyStarred) && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedLetter('all');
              setSelectedSenseFilter('all');
              setOnlyStarred(false);
            }}
            className="flex items-center gap-1 text-amber-600 dark:text-amber-400 hover:underline cursor-pointer font-bold"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* 4. Homographs Cards Stream */}
      {filteredGroups.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#0E101B] border border-dashed border-slate-300 dark:border-white/10 space-y-3">
          <HelpCircle className="w-10 h-10 text-amber-500 mx-auto opacity-70" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            No matching homographs found
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try a different search term, switch the letter filter, or clear active filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedLetter('all');
              setSelectedSenseFilter('all');
              setOnlyStarred(false);
            }}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 transition-all cursor-pointer shadow-xs"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredGroups.map((group, groupIdx) => {
            const isStarred = starredWords.has(group.word);
            const isRevealedInDrill = activeViewMode !== 'drill' || revealedDrillIds.has(group.id);

            // Responsive grid columns based on number of senses
            const gridColsClass =
              group.sensesCount === 2
                ? 'grid-cols-1 md:grid-cols-2'
                : group.sensesCount === 3
                ? 'grid-cols-1 md:grid-cols-3'
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';

            return (
              <div
                key={group.id}
                style={{
                  // Applied via modern web guidance for smooth 60/120fps scrolling with heavy content
                  contentVisibility: groupIdx > 3 ? 'auto' : undefined,
                  containIntrinsicSize: groupIdx > 3 ? 'auto none auto 240px' : undefined
                }}
                className="rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/90 dark:border-white/10 shadow-sm hover:shadow-md transition-all overflow-hidden"
              >
                {/* Master Group Header */}
                <div className="px-5 py-3.5 sm:px-6 sm:py-4 bg-slate-50/80 dark:bg-white/[0.03] border-b border-slate-100 dark:border-white/10 flex items-center justify-between gap-3">
                  
                  {/* Left: Word + Audio + Senses Badge */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight flex items-center gap-2">
                      <span>{group.word}</span>
                    </h3>

                    {/* Audio Pronunciation Button */}
                    <button
                      type="button"
                      onClick={() => speakWord(group.word)}
                      title="Pronounce word"
                      className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                        playingWord === group.word
                          ? 'bg-amber-500 text-slate-950 border-amber-600 animate-pulse'
                          : 'bg-white dark:bg-white/10 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/15 hover:bg-slate-100 dark:hover:bg-white/20'
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>

                    {/* Senses Count Badge */}
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/25">
                      {group.sensesCount} Different Meanings
                    </span>

                    {/* Letter tag */}
                    <span className="hidden sm:inline-block px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-200/70 dark:bg-white/10 text-slate-700 dark:text-slate-300">
                      Starts with &lsquo;{group.word.charAt(0).toUpperCase()}&rsquo;
                    </span>
                  </div>

                  {/* Right Action Icons: Star & Copy & Drill Toggle */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    
                    {/* Drill Reveal Toggle Button (if in drill mode) */}
                    {activeViewMode === 'drill' && (
                      <button
                        type="button"
                        onClick={() => toggleDrillReveal(group.id)}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                          isRevealedInDrill
                            ? 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400'
                            : 'bg-indigo-600 text-white shadow-xs'
                        }`}
                      >
                        {isRevealedInDrill ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        <span>{isRevealedInDrill ? 'Hide' : 'Reveal'}</span>
                      </button>
                    )}

                    {/* Copy Button */}
                    <button
                      type="button"
                      onClick={() => copyGroupText(group)}
                      title="Copy homograph notes"
                      className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all cursor-pointer"
                    >
                      {copiedWord === group.word ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>

                    {/* Star / Bookmark Toggle */}
                    <button
                      type="button"
                      onClick={() => toggleStar(group.word)}
                      title={isStarred ? 'Remove from starred' : 'Star for revision'}
                      className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                        isStarred
                          ? 'text-amber-500 bg-amber-500/10'
                          : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-white/10'
                      }`}
                    >
                      <Star className={`w-4 h-4 ${isStarred ? 'fill-amber-500' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Senses Side-by-Side Comparison Container */}
                <div className="p-4 sm:p-6">
                  {!isRevealedInDrill ? (
                    <div className="p-8 text-center rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-dashed border-slate-200 dark:border-white/10 space-y-2">
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                        Can you recall the <span className="text-amber-600 dark:text-amber-400 font-black">{group.sensesCount}</span> different meanings and parts of speech for &ldquo;{group.word}&rdquo;?
                      </p>
                      <p className="text-xs text-slate-500">
                        Test your memory before revealing the side-by-side comparison.
                      </p>
                      <button
                        type="button"
                        onClick={() => toggleDrillReveal(group.id)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-all cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Reveal All Meanings</span>
                      </button>
                    </div>
                  ) : (
                    <div className={`grid ${gridColsClass} gap-4 items-stretch`}>
                      {group.senses.map((sense, senseIdx) => (
                        <div
                          key={sense.id}
                          className="flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-slate-50/70 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 hover:border-amber-500/40 dark:hover:border-amber-400/40 transition-all space-y-3 relative group/tile"
                        >
                          {/* Sense Top Meta: Number + POS Badge */}
                          <div className="flex items-center justify-between gap-2 border-b border-slate-200/60 dark:border-white/10 pb-2.5">
                            <span className="text-xs font-mono font-black text-slate-400 dark:text-slate-500">
                              MEANING #{senseIdx + 1}
                            </span>
                            <span className={`px-2.5 py-0.5 rounded-lg text-xs font-black font-mono border uppercase tracking-wider ${getPosBadgeStyle(sense.posCategory)}`}>
                              {sense.partOfSpeech}
                            </span>
                          </div>

                          {/* Primary Contrast: Hindi Meaning */}
                          <div className="space-y-1">
                            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                              Hindi Meaning
                            </div>
                            <div className="text-lg sm:text-xl font-black text-slate-950 dark:text-white font-hindi leading-snug">
                              {sense.hindiMeaning}
                            </div>
                          </div>

                          {/* English Definition */}
                          <div className="space-y-1 flex-1">
                            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                              English Meaning
                            </div>
                            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                              {sense.englishMeaning}
                            </p>
                          </div>

                          {/* Real-World Exam Example Box */}
                          <div className="p-3 rounded-xl bg-white dark:bg-black/20 border border-slate-200/80 dark:border-white/10 space-y-1.5 mt-auto">
                            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1">
                              <span>Example Sentence</span>
                            </div>
                            <p className="text-xs sm:text-[13px] text-slate-800 dark:text-slate-200 leading-relaxed">
                              &ldquo;{highlightWord(sense.englishSentence, group.word)}&rdquo;
                            </p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-hindi border-t border-slate-100 dark:border-white/5 pt-1 mt-1">
                              {sense.hindiSentence}
                            </p>
                          </div>

                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
