import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import {
  BookOpen,
  Award,
  Link as LinkIcon,
  MessageSquare,
  GitMerge,
  AlertCircle,
  Compass,
  ExternalLink,
  Maximize2,
  Minimize2,
  RotateCw,
  Search,
  Sparkles,
  ChevronRight,
  GraduationCap,
  LayoutDashboard,
  Sun,
  Moon,
  X
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { soundManager } from '../../utils/soundEffects';
import { haptics } from '../../utils/haptics';

export interface SscVocabModule {
  id: string;
  title: string;
  shortTitle: string;
  hindiTitle: string;
  fileName: string;
  description: string;
  badge: string;
  badgeColor: string;
  accentColor: string;
  gradient: string;
  stats: string;
  icon: React.ElementType;
}

export const SSC_VOCAB_MODULES: SscVocabModule[] = [
  {
    id: 'practice_zone',
    title: 'Practice & Quiz Zone (A-Z)',
    shortTitle: 'Practice & Quizzes',
    hindiTitle: 'अभ्यास एवं क्विज़ केंद्र',
    fileName: 'practice_zone_mastery.html',
    description: 'Letter-wise interactive word quizzes for all 457 words, plus Fixed Prepositions drills & Pronoun mock tests.',
    badge: 'A-Z Interactive',
    badgeColor: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20',
    accentColor: '#ec4899',
    gradient: 'from-pink-500/20 via-rose-500/10 to-transparent',
    stats: 'Letter Quizzes',
    icon: Award
  },
  {
    id: 'vocab_457',
    title: 'Vocabulary Mastery (457 Words)',
    shortTitle: 'Vocabulary (457)',
    hindiTitle: 'संपूर्ण 457 महत्वपूर्ण शब्द',
    fileName: 'vocabulary_mastery_457.html',
    description: 'Master 457 high-frequency words with pure Hindi meanings, mnemonics, synonyms, and exam examples.',
    badge: 'Hindi + Mnemonics',
    badgeColor: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
    accentColor: '#38bdf8',
    gradient: 'from-sky-500/20 via-blue-500/10 to-transparent',
    stats: '457 Words',
    icon: BookOpen
  },
  {
    id: 'phrasal_verbs',
    title: 'Phrasal Verbs Mastery',
    shortTitle: 'Phrasal Verbs',
    hindiTitle: 'वाक्यांश क्रियाएँ नोट्स',
    fileName: 'phrasal_verbs_mastery.html',
    description: 'Complete verb + preposition combinations with pure Hindi meanings, exam examples, and memory tricks.',
    badge: 'Exam Repeated',
    badgeColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
    accentColor: '#6366f1',
    gradient: 'from-indigo-500/20 via-purple-500/10 to-transparent',
    stats: 'High Yield',
    icon: LinkIcon
  },
  {
    id: 'idioms',
    title: 'Idioms & Phrases Mastery',
    shortTitle: 'Idioms & Phrases',
    hindiTitle: 'मुहावरे एवं लोकोक्तियाँ',
    fileName: 'idioms_mastery_notes.html',
    description: 'Most repeated SSC idioms with pure Hindi meaning, historical origins, and sentence applications.',
    badge: 'High Frequency',
    badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
    accentColor: '#a855f7',
    gradient: 'from-purple-500/20 via-fuchsia-500/10 to-transparent',
    stats: 'Repeated Idioms',
    icon: MessageSquare
  },
  {
    id: 'root_words',
    title: 'Root Words Mastery',
    shortTitle: 'Root Words',
    hindiTitle: 'मूल शब्द (Etymology)',
    fileName: 'root_words_mastery_notes.html',
    description: 'Learn prefixes, suffixes, and Latin/Greek roots to decode thousands of unfamiliar English words instantly.',
    badge: 'Vocab Multiplier',
    badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    accentColor: '#10b981',
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    stats: 'Roots & Affixes',
    icon: GitMerge
  },
  {
    id: 'confused_words',
    title: 'Commonly Confused Words',
    shortTitle: 'Confused Words',
    hindiTitle: 'होमोफ़ोन्स व समरूपी शब्द',
    fileName: 'commonly_confused_words_mastery.html',
    description: 'Tricky homophones, confusing word pairs, and subtle spelling differences tested in Fill in the Blanks.',
    badge: 'Error Detector',
    badgeColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    accentColor: '#f43f5e',
    gradient: 'from-rose-500/20 via-orange-500/10 to-transparent',
    stats: 'Homophone Pairs',
    icon: AlertCircle
  },
  {
    id: 'fixed_prepositions',
    title: 'Fixed Prepositions (335+)',
    shortTitle: 'Fixed Prepositions',
    hindiTitle: 'स्थिर पूर्वसर्ग नोट्स',
    fileName: 'fixed_prepositions_mastery.html',
    description: 'Alphabetical master list of 335+ fixed prepositions (verbs, adjectives, nouns followed by specific prepositions).',
    badge: '335+ High Yield',
    badgeColor: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20',
    accentColor: '#14b8a6',
    gradient: 'from-teal-500/20 via-emerald-500/10 to-transparent',
    stats: '335+ Fixed Pairs',
    icon: Compass
  },
  {
    id: 'hub',
    title: 'English Mastery Hub',
    shortTitle: 'All Modules Hub',
    hindiTitle: 'संपूर्ण पोर्टल डैशबोर्ड',
    fileName: 'index.html',
    description: 'Comprehensive navigation hub connecting all 7 modules with interactive sidebar & search.',
    badge: 'Master Portal',
    badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    accentColor: '#f59e0b',
    gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
    stats: '7 Modules Hub',
    icon: LayoutDashboard
  }
];

interface SscSpecialVocabViewProps {
  initialModuleId?: string;
}

export const SscSpecialVocabView: React.FC<SscSpecialVocabViewProps> = ({
  initialModuleId = 'practice_zone'
}) => {
  const { isDark, toggleTheme } = useTheme();
  const [activeModuleId, setActiveModuleId] = useState<string>(initialModuleId);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  // Cache of rendered iframes: keeps previously loaded modules in memory for 0ms instant tab switching
  const [cachedModules, setCachedModules] = useState<Record<string, boolean>>({
    [initialModuleId]: true
  });

  // Loading state per module
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({
    [initialModuleId]: true
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const fullscreenContainerRef = useRef<HTMLDivElement>(null);
  const iframeRefs = useRef<Record<string, HTMLIFrameElement | null>>({});

  const activeModule = useMemo(() => {
    return SSC_VOCAB_MODULES.find(m => m.id === activeModuleId) || SSC_VOCAB_MODULES[0];
  }, [activeModuleId]);

  // Sync theme to a specific iframe or all loaded iframes
  const syncThemeToFrames = useCallback(() => {
    const theme = isDark ? 'dark' : 'light';
    Object.keys(iframeRefs.current).forEach(modId => {
      try {
        const iframe = iframeRefs.current[modId];
        if (!iframe || !iframe.contentWindow || !iframe.contentWindow.document) return;

        const frameDoc = iframe.contentWindow.document.documentElement;
        if (
          (iframe.contentWindow as any).toggleTheme &&
          typeof (iframe.contentWindow as any).toggleTheme === 'function'
        ) {
          const frameTheme = frameDoc.getAttribute('data-theme') || 'dark';
          if (frameTheme !== theme) {
            (iframe.contentWindow as any).toggleTheme();
          }
        } else {
          frameDoc.setAttribute('data-theme', theme);
        }
      } catch {}
    });
  }, [isDark]);

  useEffect(() => {
    syncThemeToFrames();
  }, [isDark, syncThemeToFrames]);

  // Preload secondary high-yield module in background after 400ms idle
  useEffect(() => {
    const timer = setTimeout(() => {
      setCachedModules(prev => ({
        ...prev,
        vocab_457: true
      }));
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Handle module load completion
  const handleIframeLoaded = (modId: string) => {
    setLoadingMap(prev => ({ ...prev, [modId]: false }));
    syncThemeToFrames();
  };

  // Safety fallback: auto-clear spinner after 800ms if fast loaded or cache hit
  useEffect(() => {
    if (loadingMap[activeModuleId]) {
      const timer = setTimeout(() => {
        setLoadingMap(prev => ({ ...prev, [activeModuleId]: false }));
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [activeModuleId, loadingMap]);

  // Handle module selection
  const handleSelectModule = (modId: string) => {
    soundManager.playClick();
    haptics.selection();

    // Cache module if not already loaded
    if (!cachedModules[modId]) {
      setCachedModules(prev => ({ ...prev, [modId]: true }));
      setLoadingMap(prev => ({ ...prev, [modId]: true }));
    }

    setActiveModuleId(modId);
  };

  // Reload current module iframe
  const handleReloadFrame = () => {
    soundManager.playClick();
    setLoadingMap(prev => ({ ...prev, [activeModuleId]: true }));
    const iframe = iframeRefs.current[activeModuleId];
    if (iframe) {
      iframe.src = `/ssc-vocab/${activeModule.fileName}`;
    }
  };

  // Listen to postMessage from index.html (Master Hub) card clicks
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data && e.data.type === 'SELECT_SSC_MODULE' && typeof e.data.target === 'string') {
        const target = e.data.target.toLowerCase();
        let matched: SscVocabModule | undefined;

        if (target.includes('practice')) matched = SSC_VOCAB_MODULES.find(m => m.id === 'practice_zone');
        else if (target.includes('vocabulary')) matched = SSC_VOCAB_MODULES.find(m => m.id === 'vocab_457');
        else if (target.includes('phrasal')) matched = SSC_VOCAB_MODULES.find(m => m.id === 'phrasal_verbs');
        else if (target.includes('idioms')) matched = SSC_VOCAB_MODULES.find(m => m.id === 'idioms');
        else if (target.includes('root')) matched = SSC_VOCAB_MODULES.find(m => m.id === 'root_words');
        else if (target.includes('confused')) matched = SSC_VOCAB_MODULES.find(m => m.id === 'confused_words');
        else if (target.includes('prepositions')) matched = SSC_VOCAB_MODULES.find(m => m.id === 'fixed_prepositions');

        if (matched) {
          handleSelectModule(matched.id);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Listen to fullscreen changes & Escape key
  useEffect(() => {
    const handleFsChange = () => {
      const isNativeFs = Boolean(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement
      );
      if (!isNativeFs && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        handleExitFullscreen();
      }
    };

    document.addEventListener('fullscreenchange', handleFsChange);
    document.addEventListener('webkitfullscreenchange', handleFsChange);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('fullscreenchange', handleFsChange);
      document.removeEventListener('webkitfullscreenchange', handleFsChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen]);

  // Prevent background scrolling while in fullscreen
  useEffect(() => {
    if (isFullscreen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isFullscreen]);

  // Fullscreen Entry
  const handleEnterFullscreen = async () => {
    soundManager.playClick();
    haptics.selection();
    setIsFullscreen(true);

    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      } else if ((document.documentElement as any).webkitRequestFullscreen) {
        await (document.documentElement as any).webkitRequestFullscreen();
      }
    } catch {}
  };

  // Fullscreen Exit
  const handleExitFullscreen = async () => {
    soundManager.playClick();
    haptics.selection();
    setIsFullscreen(false);

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if ((document as any).webkitFullscreenElement) {
        await (document as any).webkitExitFullscreen();
      }
    } catch {}
  };

  // Filter modules for search bar
  const filteredModules = useMemo(() => {
    if (!searchFilter.trim()) return SSC_VOCAB_MODULES;
    const q = searchFilter.toLowerCase().trim();
    return SSC_VOCAB_MODULES.filter(
      m =>
        m.title.toLowerCase().includes(q) ||
        m.hindiTitle.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.shortTitle.toLowerCase().includes(q)
    );
  }, [searchFilter]);

  const CurrentIcon = activeModule.icon;
  const isCurrentLoading = loadingMap[activeModuleId] ?? false;

  // Render the iframe canvas: contains all cached iframes (active shown, inactive hidden)
  const renderIframeCanvas = (isFs: boolean) => (
    <div className={`relative w-full h-full bg-[#090D16] overflow-hidden ${isFs ? '' : 'rounded-3xl border border-slate-200/90 dark:border-white/10 shadow-lg'}`}>
      {/* Loading Overlay */}
      {isCurrentLoading && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#090D16]/95 backdrop-blur-xs space-y-3">
          <div className="w-10 h-10 border-4 border-pink-500/20 border-t-pink-500 rounded-full animate-spin" />
          <div className="text-center px-4">
            <p className="text-sm font-bold text-white tracking-wide">
              Loading {activeModule.shortTitle}...
            </p>
            <p className="text-xs text-slate-400 mt-0.5">{activeModule.hindiTitle}</p>
          </div>
        </div>
      )}

      {/* Cached Iframes Pool */}
      {Object.keys(cachedModules).map(modId => {
        const mod = SSC_VOCAB_MODULES.find(m => m.id === modId);
        if (!mod) return null;
        const isCurrent = mod.id === activeModuleId;

        return (
          <iframe
            key={mod.id}
            ref={el => {
              iframeRefs.current[mod.id] = el;
            }}
            src={`/ssc-vocab/${mod.fileName}`}
            title={mod.title}
            onLoad={() => handleIframeLoaded(mod.id)}
            className="w-full h-full border-0 bg-[#090D16]"
            style={{
              display: isCurrent ? 'block' : 'none',
              width: '100%',
              height: '100%'
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        );
      })}
    </div>
  );

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          1. NORMAL IN-PAGE VIEW
      ───────────────────────────────────────────────────────────── */}
      <div ref={containerRef} className="space-y-5 animate-fade-in">
        {/* Top Banner / Module Selector Strip */}
        <div className="flex flex-col gap-4 p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-sky-500/20 border border-pink-500/30 text-pink-600 dark:text-pink-400 flex items-center justify-center font-bold shadow-xs">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                    SSC Special English Mastery
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20">
                    EXCLUSIVE NOTES
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Search Bar */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchFilter}
                onChange={e => setSearchFilter(e.target.value)}
                placeholder="Search module..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-[#161826] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-pink-500"
              />
            </div>
          </div>

          {/* Horizontal Module Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 pt-1 -mx-2 px-2">
            {filteredModules.map(mod => {
              const isActive = activeModuleId === mod.id;
              const Icon = mod.icon;

              return (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => handleSelectModule(mod.id)}
                  className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
                    isActive
                      ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-md border-transparent font-black ring-2 ring-pink-500/40'
                      : 'bg-slate-50 dark:bg-[#151726] text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-white/10 hover:border-pink-500/40 hover:bg-slate-100 dark:hover:bg-white/[0.04]'
                  }`}
                >
                  <Icon
                    className="w-3.5 h-3.5"
                    style={{ color: isActive ? undefined : mod.accentColor }}
                  />
                  <span>{mod.shortTitle}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
                      isActive
                        ? 'bg-white/20 dark:bg-black/20 text-white dark:text-slate-950 font-bold'
                        : 'bg-slate-200/80 dark:bg-white/10 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {mod.stats}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Module Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center font-bold"
              style={{
                backgroundColor: `${activeModule.accentColor}20`,
                color: activeModule.accentColor
              }}
            >
              <CurrentIcon className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                  {activeModule.title}
                </h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${activeModule.badgeColor}`}>
                  {activeModule.badge}
                </span>
              </div>
            </div>
          </div>

          {/* Action Suite: Reload, Open in New Tab, Fullscreen */}
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <button
              type="button"
              onClick={handleReloadFrame}
              title="Reload Note"
              className="p-2 rounded-xl bg-slate-100 dark:bg-white/[0.05] hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 transition-all cursor-pointer"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            <a
              href={`/ssc-vocab/${activeModule.fileName}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Open in Standalone New Tab"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/[0.05] hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Tab</span>
            </a>

            <button
              type="button"
              onClick={handleEnterFullscreen}
              title="Fullscreen Distraction-Free Reading Mode"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Fullscreen</span>
            </button>
          </div>
        </div>

        {/* In-Page Embedded Iframe Canvas */}
        <div className="h-[80vh] min-h-[660px]">
          {renderIframeCanvas(false)}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. DEDICATED FULLSCREEN SUITE (RENDERED VIA PORTAL DIRECTLY INTO BODY)
             Completely avoids ancestor stacking context, transforms & padding bugs!
      ───────────────────────────────────────────────────────────── */}
      {isFullscreen &&
        createPortal(
          <div
            ref={fullscreenContainerRef}
            className="fixed inset-0 z-[99999] bg-[#090D16] text-white flex flex-col overflow-hidden font-sans select-none animate-fade-in"
          >
            {/* Ultra-Clean Fullscreen Header Bar */}
            <header className="h-14 px-3 sm:px-5 bg-[#0C101C]/95 backdrop-blur-md border-b border-white/10 flex items-center justify-between gap-3 shrink-0 shadow-lg z-50">
              {/* Left: Exit Fullscreen & Active Module Title */}
              <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
                <button
                  type="button"
                  onClick={handleExitFullscreen}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-pink-500/15 hover:bg-pink-500/25 border border-pink-500/30 text-pink-400 text-xs font-bold transition-all cursor-pointer active:scale-95 group"
                  title="Exit Fullscreen (Esc)"
                >
                  <Minimize2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                  <span>Exit Fullscreen</span>
                  <kbd className="hidden sm:inline-block text-[10px] font-mono bg-white/10 px-1.5 py-0.2 rounded text-pink-200">
                    Esc
                  </kbd>
                </button>

                <div className="h-5 w-px bg-white/10 hidden sm:block" />

                <div className="hidden md:flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center font-bold"
                    style={{
                      backgroundColor: `${activeModule.accentColor}25`,
                      color: activeModule.accentColor
                    }}
                  >
                    <CurrentIcon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                      {activeModule.title}
                    </h3>
                    <p className="text-[10px] text-slate-400 line-clamp-1">
                      {activeModule.hindiTitle}
                    </p>
                  </div>
                </div>
              </div>

              {/* Center: Scrollable Module Selector Pills in Fullscreen */}
              <div className="flex-1 max-w-2xl flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1 px-1">
                {SSC_VOCAB_MODULES.map(mod => {
                  const isActive = activeModuleId === mod.id;
                  const ModIcon = mod.icon;
                  return (
                    <button
                      key={mod.id}
                      type="button"
                      onClick={() => handleSelectModule(mod.id)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
                        isActive
                          ? 'bg-pink-600 text-white border-pink-500 shadow-sm font-black'
                          : 'bg-white/[0.05] hover:bg-white/10 text-slate-300 border-white/5 hover:border-white/10'
                      }`}
                      title={mod.title}
                    >
                      <ModIcon
                        className="w-3 h-3"
                        style={{ color: isActive ? '#fff' : mod.accentColor }}
                      />
                      <span>{mod.shortTitle}</span>
                    </button>
                  );
                })}
              </div>

              {/* Right: Actions Suite (Reload, Open New Tab, Close) */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={handleReloadFrame}
                  title="Reload Notes"
                  className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
                >
                  <RotateCw className="w-4 h-4" />
                </button>

                <a
                  href={`/ssc-vocab/${activeModule.fileName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open in Standalone Tab"
                  className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer hidden sm:flex items-center justify-center"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={handleExitFullscreen}
                  title="Close Fullscreen (Esc)"
                  className="p-2 rounded-xl bg-white/[0.06] hover:bg-red-500/20 text-slate-300 hover:text-red-400 transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </header>

            {/* Fullscreen Iframe Canvas: 100% full viewport height & width */}
            <main className="flex-1 w-full h-full min-h-0 relative bg-[#090D16]">
              {renderIframeCanvas(true)}
            </main>
          </div>,
          document.body
        )}
    </>
  );
};
