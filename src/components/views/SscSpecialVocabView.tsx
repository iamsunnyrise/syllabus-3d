import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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
  CheckCircle2,
  ChevronRight,
  Layers,
  ArrowRight,
  GraduationCap,
  LayoutDashboard
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
  },
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
    stats: 'Letter-wise Quizzes',
    icon: Award
  },
  {
    id: 'vocab_457',
    title: 'Vocabulary Mastery (457 Words)',
    shortTitle: 'Vocabulary (457)',
    hindiTitle: 'संपूर्ण 457 महत्वपूर्ण शब्द',
    fileName: 'vocabulary_mastery_457.html',
    description: 'Master 457 high-frequency words with pure Hindi meanings, mnemonics, synonyms, and exam examples.',
    badge: 'Pure Hindi + Mnemonics',
    badgeColor: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
    accentColor: '#38bdf8',
    gradient: 'from-sky-500/20 via-blue-500/10 to-transparent',
    stats: '457 Core Words',
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
    stats: 'High Frequency',
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
    stats: 'Exam Repeated',
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
    stats: 'Etymology & Roots',
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
  }
];

interface SscSpecialVocabViewProps {
  initialModuleId?: string;
}

export const SscSpecialVocabView: React.FC<SscSpecialVocabViewProps> = ({
  initialModuleId = 'practice_zone'
}) => {
  const { isDark } = useTheme();
  const [activeModuleId, setActiveModuleId] = useState<string>(initialModuleId);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchFilter, setSearchFilter] = useState('');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const activeModule = useMemo(() => {
    return SSC_VOCAB_MODULES.find(m => m.id === activeModuleId) || SSC_VOCAB_MODULES[1];
  }, [activeModuleId]);

  // Sync theme to iframe
  const syncThemeToFrame = useCallback(() => {
    try {
      const iframe = iframeRef.current;
      if (!iframe || !iframe.contentWindow || !iframe.contentWindow.document) return;

      const theme = isDark ? 'dark' : 'light';
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
  }, [isDark]);

  const handleIframeLoad = () => {
    setIsLoading(false);
    syncThemeToFrame();
  };

  useEffect(() => {
    syncThemeToFrame();
  }, [isDark, syncThemeToFrame]);

  // Handle module change
  const handleSelectModule = (modId: string) => {
    soundManager.playClick();
    haptics.selection();
    setIsLoading(true);
    setActiveModuleId(modId);
  };

  // Reload iframe
  const handleReloadFrame = () => {
    soundManager.playClick();
    setIsLoading(true);
    if (iframeRef.current) {
      iframeRef.current.src = `/ssc-vocab/${activeModule.fileName}`;
    }
  };

  // Toggle fullscreen
  const handleToggleFullscreen = () => {
    soundManager.playClick();
    haptics.selection();
    setIsFullscreen(!isFullscreen);
  };

  // Filter modules for quick search
  const filteredModules = useMemo(() => {
    if (!searchFilter.trim()) return SSC_VOCAB_MODULES;
    const q = searchFilter.toLowerCase().trim();
    return SSC_VOCAB_MODULES.filter(
      m =>
        m.title.toLowerCase().includes(q) ||
        m.hindiTitle.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q)
    );
  }, [searchFilter]);

  const CurrentIcon = activeModule.icon;

  return (
    <div className={`space-y-5 animate-fade-in ${isFullscreen ? 'fixed inset-0 z-50 bg-[#090D16] p-4 flex flex-col' : ''}`}>
      {/* ─────────────────────────────────────────────────────────────
          1. TOP BANNER / MODULE SELECTOR STRIP
      ───────────────────────────────────────────────────────────── */}
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
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20">
                  Exclusive Notes
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                All 7 interactive HTML modules: Vocab 457, Phrasal Verbs, Idioms, Root Words, Confused Words, Prepositions & Quiz Zone.
              </p>
            </div>
          </div>

          {/* Quick Search */}
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

        {/* Horizontal Module Tabs (Scrollable on small screens) */}
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

      {/* ─────────────────────────────────────────────────────────────
          2. ACTIVE MODULE ACTION BAR & CONTROLS
      ───────────────────────────────────────────────────────────── */}
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
            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
              {activeModule.hindiTitle} • {activeModule.description}
            </p>
          </div>
        </div>

        {/* Action Controls: Refresh, Open in New Tab, Fullscreen */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
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
            onClick={handleToggleFullscreen}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Reading Mode'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span>{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. EMBEDDED INTERACTIVE NOTES IFRAME
      ───────────────────────────────────────────────────────────── */}
      <div
        className={`relative w-full rounded-3xl overflow-hidden border border-slate-200/90 dark:border-white/10 shadow-lg bg-[#090D16] ${
          isFullscreen ? 'flex-1 h-full min-h-0' : 'h-[78vh] min-h-[650px]'
        }`}
      >
        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#090D16]/90 backdrop-blur-xs space-y-3">
            <div className="w-10 h-10 border-4 border-pink-500/20 border-t-pink-500 rounded-full animate-spin" />
            <div className="text-center">
              <p className="text-sm font-bold text-white">Loading {activeModule.shortTitle}...</p>
              <p className="text-xs text-slate-400">{activeModule.hindiTitle}</p>
            </div>
          </div>
        )}

        <iframe
          ref={iframeRef}
          key={activeModule.id}
          src={`/ssc-vocab/${activeModule.fileName}`}
          title={activeModule.title}
          onLoad={handleIframeLoad}
          className="w-full h-full border-0 bg-[#090D16]"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};
