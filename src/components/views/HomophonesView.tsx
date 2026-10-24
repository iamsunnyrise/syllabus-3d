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
  HelpCircle,
  Trophy,
  Flame,
  Bookmark,
  Award,
  Zap,
  Brain
} from 'lucide-react';
import {
  HOMOPHONES_DATA,
  HOMOPHONE_QUIZ_QUESTIONS,
  HomophoneGroup,
  HomophoneWord,
  HomophoneQuizQuestion
} from '../../data/highYieldHomophonesData';
import { soundManager } from '../../utils/soundEffects';
import { haptics } from '../../utils/haptics';
import { fireCelebration } from '../../utils/confettiHelper';

export const HomophonesView: React.FC = () => {
  // Navigation & View Mode: 'compare' (Versus Cards) | 'flashcards' | 'quiz' | 'table'
  const [activeViewMode, setActiveViewMode] = useState<'compare' | 'flashcards' | 'quiz' | 'table'>('compare');

  // Search & Letter Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string>('all');
  const [onlyStarred, setOnlyStarred] = useState(false);
  const [onlyUnmastered, setOnlyUnmastered] = useState(false);

  // Starred / Bookmarked Groups (Persisted in localStorage)
  const [starredGroupIds, setStarredGroupIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('syllabus_homophones_starred_v1');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Mastered Groups (Persisted in localStorage)
  const [masteredGroupIds, setMasteredGroupIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('syllabus_homophones_mastered_v1');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Flashcards state
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Speech & Copy state
  const [playingWord, setPlayingWord] = useState<string | null>(null);
  const [copiedWord, setCopiedWord] = useState<string | null>(null);

  // Audio Speech Synthesis
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

  // Copy to clipboard
  const copyToClipboard = useCallback((text: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedWord(text);
      soundManager.playClick();
      haptics.selection();
      setTimeout(() => setCopiedWord(null), 1800);
    }
  }, []);

  // Toggle Star / Bookmark
  const toggleStar = useCallback((groupId: string) => {
    soundManager.playClick();
    haptics.selection();
    setStarredGroupIds(prev => {
      const next = new Set(prev);
      if (next.has(groupId)) {
        next.delete(groupId);
      } else {
        next.add(groupId);
      }
      try {
        localStorage.setItem('syllabus_homophones_starred_v1', JSON.stringify([...next]));
      } catch {}
      return next;
    });
  }, []);

  // Toggle Mastered
  const toggleMastered = useCallback((groupId: string) => {
    soundManager.playClick();
    haptics.selection();
    setMasteredGroupIds(prev => {
      const next = new Set(prev);
      if (next.has(groupId)) {
        next.delete(groupId);
      } else {
        next.add(groupId);
      }
      try {
        localStorage.setItem('syllabus_homophones_mastered_v1', JSON.stringify([...next]));
      } catch {}
      return next;
    });
  }, []);

  // All distinct letters in dataset
  const availableLetters = useMemo(() => {
    const letters = new Set<string>();
    HOMOPHONES_DATA.forEach(g => {
      if (g.letter) letters.add(g.letter.toUpperCase());
    });
    return Array.from(letters).sort();
  }, []);

  // Filtered Homophone Groups
  const filteredGroups = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return HOMOPHONES_DATA.filter(g => {
      // Letter filter
      if (selectedLetter !== 'all' && g.letter.toUpperCase() !== selectedLetter) {
        return false;
      }
      // Starred filter
      if (onlyStarred && !starredGroupIds.has(g.id)) {
        return false;
      }
      // Unmastered filter
      if (onlyUnmastered && masteredGroupIds.has(g.id)) {
        return false;
      }
      // Search query
      if (q) {
        const titleMatch = g.groupTitle.toLowerCase().includes(q);
        const tipMatch = g.confusableTip.toLowerCase().includes(q);
        const wordsMatch = g.words.some(
          w =>
            w.word.toLowerCase().includes(q) ||
            w.englishMeaning.toLowerCase().includes(q) ||
            w.hindiMeaning.toLowerCase().includes(q) ||
            w.englishSentence.toLowerCase().includes(q) ||
            w.hindiSentence.toLowerCase().includes(q)
        );
        return titleMatch || tipMatch || wordsMatch;
      }
      return true;
    });
  }, [searchQuery, selectedLetter, onlyStarred, onlyUnmastered, starredGroupIds, masteredGroupIds]);

  // Total words count
  const totalWordsCount = useMemo(() => {
    return HOMOPHONES_DATA.reduce((acc, g) => acc + g.words.length, 0);
  }, []);

  // Progress percentage
  const progressPercent = useMemo(() => {
    if (HOMOPHONES_DATA.length === 0) return 0;
    return Math.round((masteredGroupIds.size / HOMOPHONES_DATA.length) * 100);
  }, [masteredGroupIds]);

  // Flashcards filtered list
  const flashcardGroups = useMemo(() => {
    return filteredGroups.length > 0 ? filteredGroups : HOMOPHONES_DATA;
  }, [filteredGroups]);

  const currentFlashcard = flashcardGroups[flashcardIndex % flashcardGroups.length];

  const handleNextFlashcard = () => {
    soundManager.playClick();
    haptics.selection();
    setFlashcardFlipped(false);
    setFlashcardIndex(prev => (prev + 1) % flashcardGroups.length);
  };

  const handlePrevFlashcard = () => {
    soundManager.playClick();
    haptics.selection();
    setFlashcardFlipped(false);
    setFlashcardIndex(prev => (prev - 1 + flashcardGroups.length) % flashcardGroups.length);
  };

  // Quiz handler
  const currentQuizQ = HOMOPHONE_QUIZ_QUESTIONS[quizIndex];

  const handleQuizOption = (opt: string) => {
    if (selectedOption !== null) return;
    setSelectedOption(opt);
    const isCorrect = opt.toLowerCase() === currentQuizQ.correctWord.toLowerCase();
    if (isCorrect) {
      soundManager.playCompleteChime();
      haptics.success();
      setQuizScore(prev => prev + 1);
    } else {
      soundManager.playError();
      haptics.error();
    }
  };

  const handleNextQuiz = () => {
    soundManager.playClick();
    haptics.selection();
    setSelectedOption(null);
    if (quizIndex + 1 < HOMOPHONE_QUIZ_QUESTIONS.length) {
      setQuizIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
      fireCelebration();
      soundManager.playLevelUp();
    }
  };

  const handleRestartQuiz = () => {
    soundManager.playClick();
    haptics.selection();
    setQuizIndex(0);
    setSelectedOption(null);
    setQuizScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="space-y-6 max-w-full">
      {/* =========================================================
          HERO BANNER & PROGRESS HUD
          ========================================================= */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white p-6 sm:p-8 border border-emerald-500/30 shadow-2xl">
        <div className="absolute top-0 right-1/4 -mt-16 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 -mb-16 w-60 h-60 rounded-full bg-teal-500/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left: Branding & Description */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1.5 shadow-xs">
                <Volume2 className="w-3.5 h-3.5" />
                <span>Bilingual (E+H) Audio E-Book</span>
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-slate-200 border border-white/10 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>RBE Officer Batch Series</span>
              </span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white flex items-center gap-2">
                <span>Top Homophones Mastery</span>
                <span className="text-emerald-400 font-serif">⚡</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-300 font-medium max-w-2xl mt-1">
                Same Sound, Different Spelling Words (समान ध्वनि, भिन्न वर्तनी व अर्थ).
                Master confusing homophone pairs for SSC CGL, CHSL, CPO, MTS, Railways & Banking exams with side-by-side versus cards, memory hooks, native pronunciation, and exam fill-in-the-blank drills.
              </p>
            </div>

            {/* Learning Progress Bar */}
            <div className="pt-2 max-w-md space-y-1.5">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Mastery Progress</span>
                </span>
                <span className="text-emerald-400 font-mono font-bold">
                  {masteredGroupIds.size} / {HOMOPHONES_DATA.length} Pairs ({progressPercent}%)
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-800/80 border border-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 transition-all duration-500 shadow-sm"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Right: Quick KPIs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full lg:w-auto">
            <div className="px-4 py-3 rounded-2xl bg-slate-800/80 border border-white/10 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400">Total Pairs</div>
              <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
                {HOMOPHONES_DATA.length}
              </div>
            </div>

            <div className="px-4 py-3 rounded-2xl bg-slate-800/80 border border-white/10 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400">Total Words</div>
              <div className="text-xl sm:text-2xl font-black text-cyan-400 font-mono">
                {totalWordsCount}
              </div>
            </div>

            <div className="px-4 py-3 rounded-2xl bg-slate-800/80 border border-white/10 text-center col-span-2 sm:col-span-1">
              <div className="text-[10px] uppercase font-bold text-slate-400">Bookmarked</div>
              <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono flex items-center justify-center gap-1">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{starredGroupIds.size}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          MODE SELECTOR TABS
          ========================================================= */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 visible-pill-scrollbar-indigo max-w-full">
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            haptics.selection();
            setActiveViewMode('compare');
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeViewMode === 'compare'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs font-black ring-1 ring-emerald-400/40'
              : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.04]'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Versus Cards (A vs B) 🆚</span>
        </button>

        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            haptics.selection();
            setActiveViewMode('flashcards');
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeViewMode === 'flashcards'
              ? 'bg-teal-600 text-white shadow-xs font-black ring-1 ring-teal-400/40'
              : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.04]'
          }`}
        >
          <Brain className="w-4 h-4" />
          <span>Flashcard Recall Drill 🃏</span>
        </button>

        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            haptics.selection();
            setActiveViewMode('quiz');
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeViewMode === 'quiz'
              ? 'bg-cyan-600 text-white shadow-xs font-black ring-1 ring-cyan-400/40'
              : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.04]'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Exam Blank Quiz 🎯 ({HOMOPHONE_QUIZ_QUESTIONS.length})</span>
        </button>

        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            haptics.selection();
            setActiveViewMode('table');
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeViewMode === 'table'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-xs font-black'
              : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.04]'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Quick Lookup Table 📑</span>
        </button>
      </div>

      {/* =========================================================
          GLOBAL SEARCH & FILTER BAR (Active in Compare & Table modes)
          ========================================================= */}
      {(activeViewMode === 'compare' || activeViewMode === 'table') && (
        <div className="space-y-4">
          <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              {/* Search input */}
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search homophones by word, Hindi meaning, definition, sentence... (e.g. bail, हवा, discreet)"
                  className="w-full pl-10 pr-9 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white placeholder-slate-400"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setOnlyStarred(prev => !prev);
                    haptics.selection();
                  }}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    onlyStarred
                      ? 'bg-amber-500/10 border-amber-500/40 text-amber-600 dark:text-amber-400 font-black'
                      : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Star className={`w-3.5 h-3.5 ${onlyStarred ? 'fill-amber-500' : ''}`} />
                  <span>Starred ({starredGroupIds.size})</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setOnlyUnmastered(prev => !prev);
                    haptics.selection();
                  }}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    onlyUnmastered
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-600 dark:text-emerald-400 font-black'
                      : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span>To Learn ({HOMOPHONES_DATA.length - masteredGroupIds.size})</span>
                </button>
              </div>
            </div>

            {/* Alphabetical Letter Bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 visible-pill-scrollbar-indigo max-w-full">
              <button
                type="button"
                onClick={() => {
                  setSelectedLetter('all');
                  haptics.selection();
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedLetter === 'all'
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black shadow-xs'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                All Letters
              </button>

              {availableLetters.map(letChar => (
                <button
                  key={letChar}
                  type="button"
                  onClick={() => {
                    setSelectedLetter(letChar);
                    haptics.selection();
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer shrink-0 ${
                    selectedLetter === letChar
                      ? 'bg-emerald-600 text-white font-black shadow-xs'
                      : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {letChar}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          MODE 1: VERSUS CARDS (SIDE-BY-SIDE / A vs B COMPARISON)
          ========================================================= */}
      {activeViewMode === 'compare' && (
        <div className="space-y-6 animate-fade-in">
          {filteredGroups.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 space-y-3">
              <Search className="w-10 h-10 text-slate-400 mx-auto" />
              <h4 className="text-base font-bold text-slate-800 dark:text-slate-200">
                No matching homophone pairs found
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try searching with a different keyword or reset your letter and bookmark filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedLetter('all');
                  setOnlyStarred(false);
                  setOnlyUnmastered(false);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-md cursor-pointer inline-flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredGroups.map(group => {
                const isStarred = starredGroupIds.has(group.id);
                const isMastered = masteredGroupIds.has(group.id);

                return (
                  <div
                    key={group.id}
                    className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs hover:border-emerald-500/40 transition-all space-y-5"
                  >
                    {/* Top Group Header Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-white/5">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                          {group.groupTitle}
                        </h3>
                        <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold border border-emerald-500/20">
                          {group.phonetic}
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400">
                          {group.examFrequency} Exam Frequency
                        </span>
                      </div>

                      {/* Right Action Icons: Speaker, Star, Mastered */}
                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        <button
                          type="button"
                          onClick={() => speakWord(group.words[0].word)}
                          className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center gap-1 text-xs font-bold ${
                            playingWord === group.words[0].word
                              ? 'bg-emerald-500 text-white border-emerald-400 animate-pulse'
                              : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-emerald-500'
                          }`}
                          title="Listen to Sound"
                        >
                          <Volume2 className="w-4 h-4" />
                          <span className="hidden sm:inline">Listen</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => toggleStar(group.id)}
                          className={`p-2 rounded-xl border transition-all cursor-pointer ${
                            isStarred
                              ? 'bg-amber-500/10 border-amber-500/40 text-amber-500'
                              : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-400 hover:text-amber-500'
                          }`}
                          title={isStarred ? 'Remove Bookmark' : 'Bookmark this pair'}
                        >
                          <Star className={`w-4 h-4 ${isStarred ? 'fill-amber-500' : ''}`} />
                        </button>

                        <button
                          type="button"
                          onClick={() => toggleMastered(group.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                            isMastered
                              ? 'bg-emerald-500 text-white border-emerald-400 shadow-xs'
                              : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:border-emerald-500/40'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{isMastered ? 'Mastered' : 'Mark Learned'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Confusable Hook / Memory Tip */}
                    {group.confusableTip && (
                      <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 text-xs sm:text-sm font-semibold flex items-start gap-2.5">
                        <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-black text-amber-700 dark:text-amber-300">Memory Anchor: </span>
                          <span>{group.confusableTip}</span>
                        </div>
                      </div>
                    )}

                    {/* Side-by-Side Word Columns */}
                    <div className={`grid grid-cols-1 ${group.words.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-4`}>
                      {group.words.map((item, wIdx) => (
                        <div
                          key={item.id}
                          className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 space-y-3 relative hover:border-emerald-500/40 transition-colors"
                        >
                          {/* Word Header */}
                          <div className="flex items-start justify-between gap-2">
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-serif">
                                  {item.word}
                                </span>
                                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                  {item.partOfSpeech}
                                </span>
                              </div>
                              <span className="text-[10px] font-mono font-bold text-slate-400">
                                Entry #{item.sno}
                              </span>
                            </div>

                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => speakWord(item.word)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-500 hover:bg-slate-200 dark:hover:bg-white/10 transition-all cursor-pointer"
                                title="Listen pronunciation"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => copyToClipboard(item.word)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-all cursor-pointer"
                                title="Copy word"
                              >
                                {copiedWord === item.word ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                              </button>
                            </div>
                          </div>

                          {/* Meanings */}
                          <div className="space-y-1 pt-1 border-t border-slate-200/60 dark:border-white/5">
                            <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                              <span className="text-slate-400 font-medium">English: </span>
                              <span>{item.englishMeaning}</span>
                            </div>
                            <div className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400">
                              <span className="text-slate-400 font-normal">Hindi: </span>
                              <span>{item.hindiMeaning}</span>
                            </div>
                          </div>

                          {/* Example Sentences */}
                          <div className="p-3 rounded-xl bg-white dark:bg-[#0E101B] border border-slate-200/60 dark:border-white/5 space-y-1 text-xs">
                            <p className="font-medium text-slate-800 dark:text-slate-200 italic">
                              "{item.englishSentence}"
                            </p>
                            <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                              {item.hindiSentence}
                            </p>
                          </div>

                          {/* Memory Tip if present */}
                          {item.memoryTip && (
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium">
                              <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
                              <span>{item.memoryTip}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* =========================================================
          MODE 2: FLASHCARD RECALL DRILL
          ========================================================= */}
      {activeViewMode === 'flashcards' && currentFlashcard && (
        <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
          {/* Top Bar Indicator */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Card {flashcardIndex + 1} of {flashcardGroups.length}</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setFlashcardIndex(Math.floor(Math.random() * flashcardGroups.length));
                  setFlashcardFlipped(false);
                }}
                className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 text-slate-700 dark:text-slate-300 flex items-center gap-1 cursor-pointer"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Shuffle</span>
              </button>
            </div>
          </div>

          {/* Flashcard Card Board */}
          <div
            onClick={() => {
              setFlashcardFlipped(prev => !prev);
              haptics.selection();
            }}
            className="min-h-[360px] p-8 rounded-3xl bg-white dark:bg-[#0E101B] border-2 border-slate-200 dark:border-white/10 hover:border-teal-500/40 shadow-xl cursor-pointer flex flex-col items-center justify-center text-center transition-all select-none space-y-5"
          >
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                Sound: {currentFlashcard.phonetic}
              </span>
              <button
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  speakWord(currentFlashcard.words[0].word);
                }}
                className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-teal-500"
                title="Pronounce"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="text-3xl sm:text-4xl font-black font-serif text-slate-900 dark:text-white">
                {currentFlashcard.groupTitle}
              </h3>
              <p className="text-xs text-slate-400">
                Can you state the difference in meaning and spelling?
              </p>
            </div>

            {!flashcardFlipped ? (
              <div className="pt-4">
                <span className="px-5 py-2.5 rounded-2xl bg-teal-600 text-white font-bold text-xs sm:text-sm shadow-md inline-flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>Click Card to Flip & Reveal Meaning</span>
                </span>
              </div>
            ) : (
              <div className="w-full space-y-4 pt-2 text-left animate-fade-in border-t border-slate-100 dark:border-white/5">
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-800 dark:text-amber-200 text-xs font-semibold">
                  💡 {currentFlashcard.confusableTip}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {currentFlashcard.words.map(w => (
                    <div key={w.id} className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-sm text-slate-900 dark:text-white">{w.word}</span>
                        <span className="text-[10px] text-teal-600 dark:text-teal-400 font-bold">{w.partOfSpeech}</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 font-medium">{w.englishMeaning}</p>
                      <p className="text-emerald-600 dark:text-emerald-400 font-bold">{w.hindiMeaning}</p>
                      <p className="text-slate-500 italic text-[11px]">"{w.englishSentence}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handlePrevFlashcard}
              className="flex-1 py-3 px-4 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 font-bold text-xs sm:text-sm text-slate-700 dark:text-slate-200 transition-all cursor-pointer text-center"
            >
              Previous Card
            </button>

            <button
              type="button"
              onClick={handleNextFlashcard}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer text-center"
            >
              Next Card
            </button>
          </div>
        </div>
      )}

      {/* =========================================================
          MODE 3: EXAM FILL-IN-THE-BLANK QUIZ
          ========================================================= */}
      {activeViewMode === 'quiz' && (
        <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
          {!quizFinished && currentQuizQ ? (
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xl space-y-6">
              {/* Quiz Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                    Exam MCQ #{quizIndex + 1}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    Target: {currentQuizQ.groupTitle}
                  </span>
                </div>
                <div className="font-mono text-xs font-black text-slate-700 dark:text-slate-300">
                  Score: {quizScore} / {HOMOPHONE_QUIZ_QUESTIONS.length}
                </div>
              </div>

              {/* Progress Line */}
              <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-white/5 overflow-hidden">
                <div
                  className="h-full bg-cyan-500 transition-all duration-300"
                  style={{ width: `${((quizIndex + 1) / HOMOPHONE_QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>

              {/* Question Expression */}
              <div className="space-y-3 py-4 text-center">
                <p className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-relaxed">
                  "{currentQuizQ.sentenceWithBlank}"
                </p>
                <p className="text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  हिंदी अर्थ: {currentQuizQ.blankTranslation}
                </p>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                {currentQuizQ.options.map(opt => {
                  const isSelected = selectedOption === opt;
                  const isCorrect = opt.toLowerCase() === currentQuizQ.correctWord.toLowerCase();

                  let style = 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-cyan-500/50 text-slate-800 dark:text-slate-200';

                  if (selectedOption !== null) {
                    if (isSelected) {
                      style = isCorrect
                        ? 'bg-emerald-500 text-white border-emerald-400 ring-2 ring-emerald-300'
                        : 'bg-red-500 text-white border-red-400 ring-2 ring-red-300';
                    } else if (isCorrect) {
                      style = 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/40 font-black';
                    } else {
                      style = 'opacity-40 border-transparent';
                    }
                  }

                  return (
                    <button
                      key={opt}
                      type="button"
                      disabled={selectedOption !== null}
                      onClick={() => handleQuizOption(opt)}
                      className={`p-4 rounded-2xl text-base sm:text-lg font-black border-2 transition-all cursor-pointer shadow-xs active:scale-95 flex items-center justify-center gap-2 ${style}`}
                    >
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback and Explanation */}
              {selectedOption !== null && (
                <div className="space-y-3 pt-2 animate-fade-in">
                  <div className={`p-4 rounded-2xl text-xs sm:text-sm font-semibold ${
                    selectedOption.toLowerCase() === currentQuizQ.correctWord.toLowerCase()
                      ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20'
                      : 'bg-red-500/10 text-red-700 dark:text-red-300 border border-red-500/20'
                  }`}>
                    {selectedOption.toLowerCase() === currentQuizQ.correctWord.toLowerCase()
                      ? `🎉 Bilkul Sahi! Correct word is "${currentQuizQ.correctWord}".`
                      : `❌ Galat! Sahi word "${currentQuizQ.correctWord}" hoga.`}
                    <div className="mt-1 text-slate-600 dark:text-slate-300">
                      {currentQuizQ.explanation}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleNextQuiz}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>{quizIndex + 1 < HOMOPHONE_QUIZ_QUESTIONS.length ? 'Next Question' : 'Complete Quiz'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Quiz Completed Screen */
            <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-2xl text-center space-y-6">
              <div className="inline-flex p-4 rounded-3xl bg-gradient-to-br from-cyan-500 to-teal-600 text-white shadow-lg">
                <Trophy className="w-12 h-12" />
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  Quiz Completed!
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  You scored <span className="font-bold text-cyan-500">{quizScore}</span> out of {HOMOPHONE_QUIZ_QUESTIONS.length}
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleRestartQuiz}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-bold text-sm shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retake Quiz</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================
          MODE 4: QUICK LOOKUP TABLE
          ========================================================= */}
      {activeViewMode === 'table' && (
        <div className="space-y-4 animate-fade-in">
          <div className="rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 dark:bg-white/[0.04] text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-200/60 dark:border-white/5">
                  <tr>
                    <th className="py-3 px-4 font-bold">#</th>
                    <th className="py-3 px-4 font-bold">Word (POS)</th>
                    <th className="py-3 px-4 font-bold">Sound / Group</th>
                    <th className="py-3 px-4 font-bold">English Meaning</th>
                    <th className="py-3 px-4 font-bold">Hindi Meaning</th>
                    <th className="py-3 px-4 font-bold">Example Sentence</th>
                    <th className="py-3 px-4 font-bold text-center">Audio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {filteredGroups.flatMap(group =>
                    group.words.map(w => (
                      <tr
                        key={w.id}
                        className="hover:bg-slate-50/60 dark:hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="py-3 px-4 font-mono text-slate-400 text-xs">
                          {w.sno}
                        </td>
                        <td className="py-3 px-4 font-black text-slate-900 dark:text-white whitespace-nowrap">
                          <span>{w.word} </span>
                          <span className="text-[10px] font-semibold text-emerald-500">
                            ({w.partOfSpeech})
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                          {group.phonetic}
                        </td>
                        <td className="py-3 px-4 text-slate-700 dark:text-slate-300 max-w-xs">
                          {w.englishMeaning}
                        </td>
                        <td className="py-3 px-4 font-semibold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                          {w.hindiMeaning}
                        </td>
                        <td className="py-3 px-4 text-slate-600 dark:text-slate-400 text-xs max-w-md">
                          "{w.englishSentence}"
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button
                            type="button"
                            onClick={() => speakWord(w.word)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-500 hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer"
                            title="Pronounce"
                          >
                            <Volume2 className="w-4 h-4 mx-auto" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
