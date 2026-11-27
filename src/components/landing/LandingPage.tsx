import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  Target,
  RotateCw,
  BookOpen,
  FileText,
  CheckCircle2,
  Moon,
  Sun,
  ShieldCheck,
  ChevronDown,
  Check,
  X,
  Lock,
  BarChart3,
  Flame,
  Clock,
  Zap,
  Cloud,
  Trophy,
  Play,
  Pause,
  FolderTree,
  Timer,
  Languages,
  Calculator,
  WifiOff,
  Monitor,
  Volume2,
  Layers
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { soundManager } from '../../utils/soundEffects';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

type FeatureCategory = 'all' | 'planning' | 'vocab-maths' | 'study-recall' | 'analytics';
type HeroPreviewTab = 'command' | 'vocab' | 'focus';

interface FeatureItem {
  id: string;
  category: Exclude<FeatureCategory, 'all'>;
  title: string;
  badge: string;
  accent: 'amber' | 'emerald' | 'blue' | 'rose' | 'orange' | 'teal';
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  bullets: string[];
}

const ACCENT_MAP: Record<
  FeatureItem['accent'],
  { iconBg: string; iconText: string; badge: string }
> = {
  amber: {
    iconBg: 'bg-amber-500/12 border-amber-500/30',
    iconText: 'text-amber-600 dark:text-amber-400',
    badge: 'bg-amber-500/12 text-amber-700 dark:text-amber-300 border-amber-500/30'
  },
  emerald: {
    iconBg: 'bg-emerald-500/12 border-emerald-500/30',
    iconText: 'text-emerald-600 dark:text-emerald-400',
    badge: 'bg-emerald-500/12 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
  },
  blue: {
    iconBg: 'bg-sky-500/12 border-sky-500/30',
    iconText: 'text-sky-600 dark:text-sky-400',
    badge: 'bg-sky-500/12 text-sky-700 dark:text-sky-300 border-sky-500/30'
  },
  rose: {
    iconBg: 'bg-rose-500/12 border-rose-500/30',
    iconText: 'text-rose-600 dark:text-rose-400',
    badge: 'bg-rose-500/12 text-rose-700 dark:text-rose-300 border-rose-500/30'
  },
  orange: {
    iconBg: 'bg-orange-500/12 border-orange-500/30',
    iconText: 'text-orange-600 dark:text-orange-400',
    badge: 'bg-orange-500/12 text-orange-700 dark:text-orange-300 border-orange-500/30'
  },
  teal: {
    iconBg: 'bg-teal-500/12 border-teal-500/30',
    iconText: 'text-teal-600 dark:text-teal-400',
    badge: 'bg-teal-500/12 text-teal-700 dark:text-teal-300 border-teal-500/30'
  }
};

const FEATURE_ITEMS: FeatureItem[] = [
  {
    id: 'syllabus-explorer',
    category: 'planning',
    title: '3D Hierarchical Syllabus Explorer',
    badge: 'Core OS',
    accent: 'amber',
    icon: FolderTree,
    description:
      'Break massive exam syllabuses into Subjects, Chapters, Topics, and Micro-Subtopics with instant progress telemetry and weightage priority.',
    bullets: [
      'Exam templates for SSC, UPSC, Banking, Railways, Defence & Custom',
      'Live subject-by-subject completion bars & Backlog Rescue',
      'Interactive 3D Mind Map to visualize topic connections'
    ]
  },
  {
    id: 'offline-vocab',
    category: 'vocab-maths',
    title: '100% Offline Vocabulary & Grammar Suite',
    badge: 'Offline Cached',
    accent: 'emerald',
    icon: Languages,
    description:
      'Full SSC & competitive English library bundled directly in your browser cache: Core Vocab, Root Words, OWS, Idioms, Homophones, 603 Homographs, and 295+ Fixed Prepositions.',
    bullets: [
      'Works seamlessly in libraries, hostels & flights without internet',
      'Clean exam-meaning flashcards with synonyms, antonyms & usage',
      'Theme-Based Idioms, SSC Special Vocab & quick revision filters'
    ]
  },
  {
    id: 'calc-booster',
    category: 'vocab-maths',
    title: 'Calculation Booster Lab (11 Speed Drills)',
    badge: 'Quant Speed',
    accent: 'orange',
    icon: Calculator,
    description:
      'Build reflex-fast mental math accuracy for SSC, Banking & CSAT with 11 dedicated drill trainers engineered for daily timed sprints.',
    bullets: [
      'Addition, Subtraction, Multiplication & Division drills',
      'Tables, Squares, Cubes, Fractions, Triplets, Powers & Primes',
      'Live accuracy, speed tracking & instant mastery reinforcement'
    ]
  },
  {
    id: 'focus-studio',
    category: 'study-recall',
    title: 'Focus Mode Studio & Zen Chamber',
    badge: 'Deep Work',
    accent: 'amber',
    icon: Timer,
    description:
      'Distraction-free glassmorphic study studio featuring Pomodoro presets, Countdown & Stopwatch modes, daily target linking, and ambient soundscapes.',
    bullets: [
      'Curated Lo-Fi, Rain, Ocean & Campfire ambience channels',
      'Link live timer sessions directly to syllabus topics',
      'Zen View fullscreen mode with session history & streak XP'
    ]
  },
  {
    id: 'spaced-recall',
    category: 'study-recall',
    title: 'Scientific 4-Stage Spaced Repetition',
    badge: 'Ebbinghaus Engine',
    accent: 'teal',
    icon: RotateCw,
    description:
      'Automated 1 → 4 → 9 → 27 day revision queues surface topics right before forgetting curves drop, turning short-term study into permanent recall.',
    bullets: [
      'Daily overdue & due revision counters inside the workspace',
      'One-tap stage advancement with full mastery verification',
      'Pairs with Walk & Revise hands-free audio playback'
    ]
  },
  {
    id: 'exam-countdown',
    category: 'planning',
    title: 'Live Exam Date Counter & Target Pacing',
    badge: 'Runway Planner',
    accent: 'orange',
    icon: Clock,
    description:
      'Precision Days, Hours, Minutes & Seconds countdown paired with a pacing calculator that tells you the exact daily speed needed to finish on time.',
    bullets: [
      'One-click exam presets (SSC CGL, CHSL, CPO, RRB NTPC, UPSC)',
      'Instant Ahead / On-Track / Behind Schedule diagnostic alerts',
      'Daily Top-3 Non-Negotiable Targets & habit streak calendar'
    ]
  },
  {
    id: 'pdf-notes-suite',
    category: 'study-recall',
    title: 'Eye-Care PDF Reader & Office Notes Studio',
    badge: 'Zero Glare',
    accent: 'blue',
    icon: BookOpen,
    description:
      'Annotate coaching PDFs in warm Sepia, Charcoal, or OLED Black without hurting your eyes, alongside an MS Word-style document editor with LaTeX math.',
    bullets: [
      'Split-screen PDF study paired with structured topic notes',
      'KaTeX math equation rendering for Quant & Science formulas',
      'AI YouTube Lecture Notes with clickable video timestamps'
    ]
  },
  {
    id: 'mock-tracker',
    category: 'analytics',
    title: 'Mock Test Series & Trap Journal',
    badge: 'Score Analytics',
    accent: 'rose',
    icon: BarChart3,
    description:
      'Track full-length and sectional mocks, analyze percentile growth, and capture recurring silly errors inside a dedicated Weak Topics & Trap Ledger.',
    bullets: [
      'Accuracy trends, speed vs attempt logs & subject ROI breakdown',
      'Diagnose concept gaps vs time traps before the next mock',
      'One-click Study Station portals for Testbook, Oliveboard & PYQs'
    ]
  },
  {
    id: 'offline-pwa',
    category: 'analytics',
    title: 'Offline-First PWA & Cloud Precision Sync',
    badge: 'Zero Data Loss',
    accent: 'emerald',
    icon: Cloud,
    description:
      'Installable on Windows, Mac, Android & iOS in one click. Every topic tick, note, and vocabulary deck persists offline in IndexedDB with cloud backup.',
    bullets: [
      '3 Eye-Care Themes: Warm Parchment Gold, Classic Light & Obsidian Dark',
      'Full keyboard navigation & JSON / Google Drive backup exports',
      'Private by design — 100% free with zero ads or subscriptions'
    ]
  }
];

const EXAM_LOGOS = [
  { name: 'SSC CGL / CHSL / CPO', tag: 'Tier I & II', logo: '/exam-logos/ssc.png' },
  { name: 'UPSC CSE', tag: 'Prelims & Mains', logo: '/exam-logos/upsc.png' },
  { name: 'IBPS / SBI Banking', tag: 'PO & Clerk', logo: '/exam-logos/ibps.png' },
  { name: 'Railways RRB', tag: 'NTPC & Group D', logo: '/exam-logos/railways.png' },
  { name: 'Defence CDS / NDA', tag: 'Written & SSB', logo: '/exam-logos/defence.webp' }
];

const COMPARISON_ROWS = [
  { feature: '3D Syllabus & Micro-Subtopic Tree', traditional: 'Static Excel / Paper Lists', ours: 'Live hierarchical progress + weightage' },
  { feature: 'Vocabulary & Grammar Offline Pack', traditional: 'Heavy PDFs / Requires internet', ours: '100% Offline Vocab, 603 Homographs, 295+ Rules' },
  { feature: 'Mental Maths Speed Drills', traditional: 'Random YouTube videos', ours: '11 Interactive Calculation Booster Trainers' },
  { feature: 'Spaced Repetition Scheduling', traditional: 'Manual guesses & forgetting', ours: 'Automated 4-Stage (1, 4, 9, 27d) queue' },
  { feature: 'Focus Timer & Ambience', traditional: 'Distracting phone timers', ours: 'Focus Studio with Lo-Fi, Rain & Session Logs' },
  { feature: 'Eye-Care PDF & Math Notes', traditional: 'Blinding white glare viewers', ours: 'Warm Parchment / Charcoal PDFs + LaTeX Notes' },
  { feature: 'Mock Test & Mistake Tracking', traditional: 'Scattered rough notebooks', ours: 'Percentile analytics + Weak Trap Journal' },
  { feature: 'Cost & Offline Reliability', traditional: 'Paid subscriptions / Cloud-only', ours: '100% Free Forever + Offline PWA' }
];

const FAQS = [
  {
    q: 'Is Syllabus 3D really 100% free with no hidden membership?',
    a: 'Yes — every single feature in Syllabus 3D is completely free for all aspirants. There are no paywalls, locked tools, or membership tiers. You get full access to the 3D Syllabus Explorer, Offline Vocabulary & Prepositions, all 11 Calculation Booster tools, Focus Mode Studio, Mock Tracker, PDF Reader, and Cloud Backup.'
  },
  {
    q: 'Does all Vocabulary and Study data work without internet?',
    a: 'Yes! Once loaded, Vocabulary decks (Core Vocab, Roots, OWS, Idioms, Homophones, Homographs, Fixed Prepositions, SSC Special Vocab), Calculation Booster drills, your syllabus progress, and notes are cached locally so you can study completely offline in any library or commute.'
  },
  {
    q: 'Which themes are included for long study hours?',
    a: 'Syllabus 3D includes three curated themes tuned for eye comfort: Warm Parchment Gold (default paper-like warm tone for zero harsh glare), Classic Daylight Light, and Obsidian Gold Dark mode for late-night study marathons.'
  },
  {
    q: 'How does the 4-Stage Spaced Repetition system help me retain more?',
    a: 'Instead of passive rereading, marking a topic completed schedules revisions at scientifically spaced 1, 4, 9, and 27-day intervals. Each morning you see exactly which high-yield concepts need recall before memory decay hits.'
  },
  {
    q: 'Can I customize my own syllabus or use it for SSC, UPSC, and Banking?',
    a: 'Both! Pick one-click exam presets (SSC CGL, CHSL, CPO, RRB NTPC, SBI PO, UPSC CSE) or build custom subjects, chapters, and targets tailored to State PCS, GATE, JEE, NEET, or university coursework.'
  },
  {
    q: 'How do I install Syllabus 3D on desktop or mobile?',
    a: 'Syllabus 3D is a modern Progressive Web App (PWA). Click the install icon in Chrome/Edge on Windows or Mac, or use "Add to Home Screen" on Android/iOS Safari for an instant full-screen native experience.'
  }
];

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onLogin }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const isWarmCream = theme === 'warm-cream';

  const [selectedCategory, setSelectedCategory] = useState<FeatureCategory>('all');
  const [heroTab, setHeroTab] = useState<HeroPreviewTab>('command');
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);
  const [demoTargets, setDemoTargets] = useState([true, false, false]);
  const [focusRunning, setFocusRunning] = useState(false);
  const [focusSeconds, setFocusSeconds] = useState(45 * 60);

  useEffect(() => {
    if (!focusRunning) return;
    const id = window.setInterval(() => {
      setFocusSeconds(prev => (prev > 0 ? prev - 1 : 45 * 60));
    }, 1000);
    return () => window.clearInterval(id);
  }, [focusRunning]);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleCtaClick = (type: 'signup' | 'login') => {
    soundManager.playClick();
    if (type === 'signup') {
      onGetStarted();
    } else {
      onLogin();
    }
  };

  const filteredFeatures =
    selectedCategory === 'all'
      ? FEATURE_ITEMS
      : FEATURE_ITEMS.filter(item => item.category === selectedCategory);

  // Surface helper classes tuned cleanly for all 3 real website themes
  const pageBg = isDark
    ? 'bg-[#080A10] text-slate-100'
    : isWarmCream
    ? 'bg-[#F8EED8] text-[#2A2608]'
    : 'bg-[#F8FAFC] text-slate-900';

  const cardSurface = isDark
    ? 'bg-[#111420]/95 border-white/10'
    : isWarmCream
    ? 'bg-[#FFFDF8] border-[#E2D1B3]'
    : 'bg-white border-slate-200/90';

  const subtleSurface = isDark
    ? 'bg-[#171B2B] border-white/10'
    : isWarmCream
    ? 'bg-[#FBF3E2] border-[#E5D5B8]'
    : 'bg-slate-50 border-slate-200/80';

  const mutedText = isDark
    ? 'text-slate-400'
    : isWarmCream
    ? 'text-[#6D5B14]'
    : 'text-slate-600';

  const sectionBandBg = isDark
    ? 'bg-[#0D101B]/90 border-white/10'
    : isWarmCream
    ? 'bg-[#F3E5CA]/65 border-[#DFCCA8]'
    : 'bg-slate-100/70 border-slate-200/80';

  const themeLabel = isDark ? 'Obsidian' : isWarmCream ? 'Parchment' : 'Daylight';

  return (
    <div
      className={`min-h-screen font-sans selection:bg-amber-500/30 overflow-x-hidden transition-colors duration-300 relative ${pageBg}`}
    >
      {/* ── ATMOSPHERIC WARM GOLD GLOW ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className={`absolute -top-44 left-1/2 -translate-x-1/2 w-[1050px] h-[540px] rounded-full blur-[140px] ${
            isDark
              ? 'bg-gradient-to-b from-amber-500/12 via-orange-500/8 to-transparent'
              : isWarmCream
              ? 'bg-gradient-to-b from-amber-400/20 via-orange-300/10 to-transparent'
              : 'bg-gradient-to-b from-amber-400/18 via-orange-300/10 to-transparent'
          }`}
        />
        <div
          className={`absolute top-[42%] -left-56 w-[520px] h-[520px] rounded-full blur-[160px] ${
            isDark ? 'bg-amber-600/8' : 'bg-amber-400/12'
          }`}
        />
        <div
          className={`absolute bottom-12 -right-56 w-[520px] h-[520px] rounded-full blur-[160px] ${
            isDark ? 'bg-emerald-500/8' : 'bg-orange-400/10'
          }`}
        />
      </div>

      {/* ── 1. INTEGRATED ANNOUNCEMENT RIBBON ── */}
      <div
        className={`relative z-20 border-b text-[11px] font-bold py-2 px-4 text-center ${
          isDark
            ? 'bg-[#10131E] border-white/10 text-amber-300'
            : isWarmCream
            ? 'bg-[#EFE0C1] border-[#DEC9A4] text-[#5C4904]'
            : 'bg-amber-50 border-amber-200/80 text-amber-900'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <span className="inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>Syllabus 3D • All-in-One Competitive Exam Operating System</span>
          </span>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
              isDark
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'bg-amber-500/20 text-amber-900 border border-amber-600/25'
            }`}
          >
            100% Free & Offline PWA
          </span>
        </div>
      </div>

      {/* ── 2. STICKY GLASS NAVIGATION HEADER ── */}
      <header
        className={`sticky top-0 z-50 w-full border-b backdrop-blur-xl transition-colors ${
          isDark
            ? 'bg-[#080A10]/85 border-white/[0.08]'
            : isWarmCream
            ? 'bg-[#FFFDF8]/88 border-[#E2D1B3]'
            : 'bg-white/85 border-slate-200/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-3">
          {/* Brand */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group text-left"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <img
                src="/logo.png"
                alt="Syllabus 3D"
                className="w-full h-full object-contain drop-shadow-[0_3px_10px_rgba(245,158,11,0.35)]"
              />
            </div>
            <div>
              <span className="text-base sm:text-lg font-black tracking-tight block leading-tight">
                Syllabus{' '}
                <span className="bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                  3D
                </span>
              </span>
              <span className={`hidden sm:block text-[10px] font-bold uppercase tracking-widest ${mutedText}`}>
                Exam Operating System
              </span>
            </div>
          </button>

          {/* Navigation Anchors */}
          <nav className={`hidden lg:flex items-center gap-6 xl:gap-7 text-xs font-bold ${mutedText}`}>
            <a href="#study-suite" className="hover:text-amber-500 transition-colors">
              Live Preview
            </a>
            <a href="#features" className="hover:text-amber-500 transition-colors">
              All Modules
            </a>
            <a href="#workflow" className="hover:text-amber-500 transition-colors">
              Daily System
            </a>
            <a href="#comparison" className="hover:text-amber-500 transition-colors">
              Why Syllabus 3D
            </a>
            <a href="#faq" className="hover:text-amber-500 transition-colors">
              FAQ
            </a>
          </nav>

          {/* Header Actions */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* 3-Theme Switcher (Parchment / Light / Dark) */}
            <button
              type="button"
              onClick={e => {
                soundManager.playClick();
                toggleTheme(e);
              }}
              className={`h-9 sm:h-10 px-3 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 ${subtleSurface}`}
              title={`Current theme: ${themeLabel}. Click to switch theme.`}
              aria-label="Switch theme"
            >
              {isDark ? (
                <Moon className="w-3.5 h-3.5 text-amber-400" />
              ) : isWarmCream ? (
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              ) : (
                <Sun className="w-3.5 h-3.5 text-amber-500" />
              )}
              <span className="hidden md:inline">{themeLabel}</span>
            </button>

            <button
              type="button"
              onClick={() => handleCtaClick('login')}
              className={`hidden sm:inline-flex h-9 sm:h-10 px-4 rounded-xl border text-xs font-bold items-center transition-all cursor-pointer active:scale-95 ${subtleSurface}`}
            >
              Sign In
            </button>

            <button
              type="button"
              onClick={() => handleCtaClick('signup')}
              className="h-9 sm:h-10 px-4 sm:px-5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Launch App Free</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.75]" />
            </button>
          </div>
        </div>
      </header>

      {/* ── 3. HERO SECTION WITH INTERACTIVE LIVE WORKSPACE PREVIEW ── */}
      <section className="relative z-10 pt-10 sm:pt-14 lg:pt-18 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">
          {/* Left Column: Core Positioning */}
          <div className="lg:col-span-6 text-center lg:text-left">
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold mb-5 shadow-xs ${
                isDark
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                  : isWarmCream
                  ? 'bg-[#FFFDF8] border-[#DFCCA6] text-[#6E5603]'
                  : 'bg-amber-50 border-amber-200 text-amber-800'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Engineered for SSC, UPSC, Banking & Competitive Exams</span>
            </div>

            <h1 className="text-3xl sm:text-5xl xl:text-[54px] font-black tracking-tight leading-[1.1] mb-5">
              Track Every Topic.{' '}
              <span className="bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                Drill Offline & Retain More
              </span>{' '}
              on Exam Day.
            </h1>

            <p className={`text-sm sm:text-base lg:text-[17px] leading-relaxed mb-7 max-w-2xl mx-auto lg:mx-0 ${mutedText}`}>
              Syllabus 3D brings your <strong className="font-bold text-current">3D Syllabus Tree</strong>,{' '}
              <strong className="font-bold text-current">100% Offline Vocabulary &amp; Prepositions</strong>,{' '}
              <strong className="font-bold text-current">11 Calculation Booster Drills</strong>,{' '}
              <strong className="font-bold text-current">Focus Mode Studio</strong>, and{' '}
              <strong className="font-bold text-current">Mock Test Analytics</strong> into one eye-care workspace.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 mb-8">
              <button
                type="button"
                onClick={() => handleCtaClick('signup')}
                className="w-full sm:w-auto h-13 px-8 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-amber-500/25 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span>Start Tracking Free</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>

              <button
                type="button"
                onClick={() => handleCtaClick('login')}
                className={`w-full sm:w-auto h-13 px-7 rounded-2xl border font-bold text-sm shadow-xs active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer ${cardSurface}`}
              >
                <Lock className="w-4 h-4 text-amber-500" />
                <span>Sign In to Workspace</span>
              </button>
            </div>

            {/* Real Platform Guarantees */}
            <div
              className={`grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bold pt-6 border-t ${
                isDark ? 'border-white/10' : isWarmCream ? 'border-[#DFCCA8]' : 'border-slate-200'
              }`}
            >
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>100% Free Forever</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <WifiOff className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Offline Vocab &amp; PWA</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <Calculator className="w-4 h-4 text-orange-500 shrink-0" />
                <span>11 Calc Speed Drills</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <RotateCw className="w-4 h-4 text-sky-500 shrink-0" />
                <span>4-Stage Recall</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Live Product Preview */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-xl lg:max-w-none">
              <div
                className={`absolute -inset-3 rounded-[28px] blur-2xl -z-10 ${
                  isDark
                    ? 'bg-gradient-to-tr from-amber-500/20 via-orange-500/10 to-emerald-500/15'
                    : 'bg-gradient-to-tr from-amber-400/30 via-orange-300/20 to-amber-200/25'
                }`}
              />

              <div className={`rounded-3xl border shadow-2xl overflow-hidden ${cardSurface}`}>
                {/* Browser Frame Header */}
                <div
                  className={`px-4 py-3 border-b flex flex-wrap items-center justify-between gap-2 ${
                    isDark
                      ? 'bg-[#161A29] border-white/10'
                      : isWarmCream
                      ? 'bg-[#F7EAD0] border-[#DFCCA8]'
                      : 'bg-slate-100 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/85" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/85" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/85" />
                    </div>
                    <span className={`text-[11px] font-mono font-bold ml-1 ${mutedText}`}>
                      syllabus3d.app
                    </span>
                  </div>

                  {/* Interactive Preview Switcher */}
                  <div className="flex items-center gap-1">
                    {(
                      [
                        { id: 'command', label: 'Command Hub' },
                        { id: 'vocab', label: 'Vocab & Maths' },
                        { id: 'focus', label: 'Focus Studio' }
                      ] as const
                    ).map(tab => {
                      const active = heroTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => {
                            soundManager.playClick();
                            setHeroTab(tab.id);
                          }}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                            active
                              ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black shadow-xs'
                              : `${mutedText} hover:opacity-80`
                          }`}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Live Interactive Screen Body */}
                <div className="p-4 sm:p-5 space-y-4">
                  {heroTab === 'command' && (
                    <div className="space-y-4 animate-fade-in">
                      {/* Exam Date Counter Mini Bar */}
                      <div className={`p-3.5 rounded-2xl border ${subtleSurface}`}>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-500">
                              <Target className="w-3.5 h-3.5" />
                            </span>
                            <div>
                              <div className="text-xs font-black">SSC CGL 2027 • Exam Runway</div>
                              <div className={`text-[10px] font-semibold ${mutedText}`}>
                                Target: Jun 25, 2027 • Ahead of Pace
                              </div>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[10px] font-black">
                            ON TRACK
                          </span>
                        </div>

                        <div className="grid grid-cols-4 gap-2">
                          {[
                            { val: '209', label: 'DAYS', accent: 'border-t-orange-500' },
                            { val: '22', label: 'HOURS', accent: 'border-t-sky-500' },
                            { val: '23', label: 'MINS', accent: 'border-t-emerald-500' },
                            { val: '16', label: 'SECS', accent: 'border-t-amber-500' }
                          ].map(unit => (
                            <div
                              key={unit.label}
                              className={`p-2.5 rounded-xl border border-t-[3px] text-center ${cardSurface} ${unit.accent}`}
                            >
                              <div className="text-lg sm:text-xl font-black font-mono tabular-nums leading-none">
                                {unit.val}
                              </div>
                              <div className={`text-[9px] font-black tracking-wider mt-1 ${mutedText}`}>
                                {unit.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Interactive Top 3 Daily Targets + Syllabus Stats */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                        <div className={`sm:col-span-7 p-3.5 rounded-2xl border ${subtleSurface} space-y-2`}>
                          <div className="flex items-center justify-between text-[11px] font-black">
                            <span>Today&apos;s Non-Negotiable Targets</span>
                            <span className="text-amber-500 font-mono">
                              {demoTargets.filter(Boolean).length}/3 Done
                            </span>
                          </div>
                          {[
                            'Trigonometry Triplets + 25 PYQs',
                            'Indian Polity: Fundamental Rights',
                            '50 SSC Synonyms & Fixed Prepositions'
                          ].map((task, idx) => {
                            const done = demoTargets[idx];
                            return (
                              <button
                                key={task}
                                type="button"
                                onClick={() => {
                                  soundManager.playClick();
                                  setDemoTargets(prev => prev.map((v, i) => (i === idx ? !v : v)));
                                }}
                                className={`w-full px-2.5 py-2 rounded-xl border text-left text-[11px] font-bold flex items-center gap-2 transition-all cursor-pointer ${
                                  done
                                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300 line-through'
                                    : `${cardSurface} hover:border-amber-500/40`
                                }`}
                              >
                                <span
                                  className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 border ${
                                    done
                                      ? 'bg-emerald-500 border-emerald-500 text-white'
                                      : 'border-amber-500/50'
                                  }`}
                                >
                                  {done && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                </span>
                                <span className="truncate">{task}</span>
                              </button>
                            );
                          })}
                        </div>

                        <div className={`sm:col-span-5 p-3.5 rounded-2xl border ${subtleSurface} flex flex-col justify-between gap-2.5`}>
                          <div className="flex items-center justify-between">
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${mutedText}`}>
                              Streak
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs font-black text-amber-500">
                              <Flame className="w-3.5 h-3.5 fill-amber-500" />
                              42 Days
                            </span>
                          </div>
                          <div>
                            <div className="flex items-baseline justify-between mb-1">
                              <span className="text-2xl font-black font-mono">68.4%</span>
                              <span className={`text-[10px] font-bold ${mutedText}`}>248/362</span>
                            </div>
                            <div className="h-2 rounded-full bg-amber-500/15 overflow-hidden">
                              <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-amber-400 to-orange-500" />
                            </div>
                          </div>
                          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/25 text-[10px] font-bold flex items-center justify-between">
                            <span>Stage 3 Due</span>
                            <span className="text-amber-600 dark:text-amber-300 font-black">14 Topics</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {heroTab === 'vocab' && (
                    <div className="space-y-3.5 animate-fade-in">
                      {/* Offline Word Card Showcase (clean pills, no dots) */}
                      <div className={`p-4 rounded-2xl border ${subtleSurface} space-y-3`}>
                        <div className="flex items-center justify-between gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-[10px] font-black uppercase">
                            Exam Meaning • Offline Ready
                          </span>
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            Synced in Browser Cache
                          </span>
                        </div>

                        <div>
                          <div className="text-lg font-black tracking-tight">Winsome — मनमोहक / आकर्षक</div>
                          <div className={`text-xs font-medium ${mutedText}`}>Good-looking; appealing in manner or appearance</div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <div className="p-2.5 rounded-xl bg-emerald-500/[0.08] border border-emerald-500/25 space-y-1.5">
                            <div className="text-[10px] font-black text-emerald-700 dark:text-emerald-300 uppercase">
                              Synonyms (समानार्थक)
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {['Appealing', 'Charming', 'Alluring', 'Pleasing'].map(w => (
                                <span
                                  key={w}
                                  className={`px-2 py-0.5 rounded-lg border text-[11px] font-bold ${cardSurface}`}
                                >
                                  {w}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="p-2.5 rounded-xl bg-rose-500/[0.08] border border-rose-500/25 space-y-1.5">
                            <div className="text-[10px] font-black text-rose-700 dark:text-rose-300 uppercase">
                              Antonyms (विलोम)
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {['Unattractive', 'Repulsive', 'Plain'].map(w => (
                                <span
                                  key={w}
                                  className={`px-2 py-0.5 rounded-lg border text-[11px] font-bold ${cardSurface}`}
                                >
                                  {w}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 11 Calculation Booster Strip */}
                      <div className={`p-3.5 rounded-2xl border ${subtleSurface}`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-black flex items-center gap-1.5">
                            <Zap className="w-3.5 h-3.5 text-amber-500" />
                            11 Calculation Booster Trainers
                          </span>
                          <span className="text-[10px] font-bold text-amber-600 dark:text-amber-300">
                            603 Homographs • 295+ Prepositions
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {['Squares', 'Cubes', 'Fractions', 'Triplets', 'Powers', 'Primes', 'Tables', 'Multiply'].map(
                            drill => (
                              <span
                                key={drill}
                                className={`px-2.5 py-1 rounded-lg border text-[10px] font-bold ${cardSurface}`}
                              >
                                {drill}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {heroTab === 'focus' && (
                    <div className="space-y-3.5 animate-fade-in">
                      <div className={`p-4 rounded-2xl border ${subtleSurface} flex flex-col sm:flex-row items-center justify-between gap-4`}>
                        {/* Interactive Circular Timer Preview */}
                        <div className="flex items-center gap-4">
                          <div className="w-24 h-24 rounded-full border-4 border-amber-500/80 bg-amber-500/10 flex flex-col items-center justify-center shrink-0 shadow-inner">
                            <span className="text-[9px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-300">
                              Countdown
                            </span>
                            <span className="text-xl font-black font-mono tabular-nums">
                              {formatTimer(focusSeconds)}
                            </span>
                            <span className="text-[9px] font-bold text-emerald-500">
                              {focusRunning ? 'Focusing' : 'Ready'}
                            </span>
                          </div>
                          <div className="space-y-2">
                            <div className="text-xs font-black">Focus Mode Studio • Zen View</div>
                            <div className="flex flex-wrap gap-1.5">
                              {['Lo-Fi', 'Rain', 'Ocean', 'Campfire'].map((snd, idx) => (
                                <span
                                  key={snd}
                                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold inline-flex items-center gap-1 border ${
                                    idx === 0
                                      ? 'bg-amber-500 text-slate-950 border-transparent font-black'
                                      : cardSurface
                                  }`}
                                >
                                  <Volume2 className="w-2.5 h-2.5" />
                                  {snd}
                                </span>
                              ))}
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                soundManager.playClick();
                                setFocusRunning(r => !r);
                              }}
                              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 text-[11px] font-black inline-flex items-center gap-1.5 cursor-pointer active:scale-95 transition-transform"
                            >
                              {focusRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                              <span>{focusRunning ? 'Pause Demo' : 'Test Timer'}</span>
                            </button>
                          </div>
                        </div>

                        {/* Mock Tracker Card */}
                        <div className={`w-full sm:w-44 p-3 rounded-xl border ${cardSurface} space-y-1.5`}>
                          <div className="flex items-center justify-between text-[10px] font-bold">
                            <span className={mutedText}>Latest Mock</span>
                            <span className="text-emerald-500 font-black">+14% Boost</span>
                          </div>
                          <div className="text-base font-black font-mono">98.4%ile</div>
                          <div className={`text-[10px] ${mutedText}`}>Accuracy 94% • 0 Silly Traps</div>
                        </div>
                      </div>

                      <div className={`p-3 rounded-2xl border ${subtleSurface} flex items-center justify-between text-xs font-bold`}>
                        <span className="flex items-center gap-2">
                          <Monitor className="w-4 h-4 text-amber-500" />
                          <span>Study Station: Testbook, Oliveboard &amp; Official Portals</span>
                        </span>
                        <span className="text-amber-500 text-[11px] font-black">1-Click Launch</span>
                      </div>
                    </div>
                  )}

                  {/* Bottom KPI Strip */}
                  <div className={`grid grid-cols-3 gap-2 text-center py-2.5 px-3 rounded-2xl border text-xs ${subtleSurface}`}>
                    <div>
                      <span className={`text-[10px] font-bold block uppercase ${mutedText}`}>Offline Modules</span>
                      <span className="font-mono font-black">Vocab + Calc Lab</span>
                    </div>
                    <div className={`border-x ${isDark ? 'border-white/10' : isWarmCream ? 'border-[#DFCCA8]' : 'border-slate-200'}`}>
                      <span className={`text-[10px] font-bold block uppercase ${mutedText}`}>Eye-Care Themes</span>
                      <span className="font-mono font-black text-amber-500">Parchment / Dark</span>
                    </div>
                    <div>
                      <span className={`text-[10px] font-bold block uppercase ${mutedText}`}>Subscription</span>
                      <span className="font-mono font-black text-emerald-500">₹0 Forever</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. SUPPORTED EXAMS STRIP ── */}
      <section className={`relative z-10 border-y py-6 px-4 sm:px-6 lg:px-8 ${sectionBandBg}`}>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-5">
          <div className="text-center lg:text-left shrink-0">
            <span className="text-[11px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400 block">
              READY OUT OF THE BOX
            </span>
            <h2 className="text-sm sm:text-base font-black">
              Built for India&apos;s Premier Competitive Exams &amp; Custom Goals
            </h2>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {EXAM_LOGOS.map(exam => (
              <div
                key={exam.name}
                className={`px-3 py-2 rounded-2xl border flex items-center gap-2.5 shadow-2xs ${cardSurface}`}
              >
                <img src={exam.logo} alt={exam.name} className="w-7 h-7 object-contain rounded-lg shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-black leading-tight">{exam.name}</div>
                  <div className={`text-[10px] font-semibold ${mutedText}`}>{exam.tag}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. BENTO SPOTLIGHT: WHAT MAKES SYLLABUS 3D DIFFERENT ── */}
      <section id="study-suite" className="relative z-10 py-18 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-2 block font-mono">
            THE REAL SYLLABUS 3D EXPERIENCE
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
            Designed Around How Top Aspirants Actually Study
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed ${mutedText}`}>
            No fluff or fragmented apps. Switch cleanly between vocabulary flashcards, speed calculation drills, eye-care PDF reading, and mock analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Bento 1: Offline Vocab & Calc Booster */}
          <div className={`lg:col-span-7 p-6 sm:p-7 rounded-3xl border shadow-sm flex flex-col justify-between gap-6 ${cardSurface}`}>
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-emerald-500/12 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-[11px] font-black uppercase tracking-wider inline-flex items-center gap-1.5">
                  <WifiOff className="w-3.5 h-3.5" />
                  100% Offline Cached Study Lab
                </span>
                <span className={`text-xs font-mono font-bold ${mutedText}`}>Vocab + Quant</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight mb-2">
                Offline Vocabulary Arsenal &amp; 11 Calculation Drills
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${mutedText}`}>
                Practice Core Vocabulary, Root Words, One-Word Substitutions, Theme-Based Idioms, 603 Homographs, Homophones, and 295+ Fixed Prepositions — plus 11 interactive mental maths drills — without needing Wi-Fi or mobile data.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { label: 'Homographs', count: '603 Groups' },
                { label: 'Prepositions', count: '295+ Rules' },
                { label: 'Calc Booster', count: '11 Trainers' },
                { label: 'Offline Sync', count: 'Zero Net Needed' }
              ].map(stat => (
                <div key={stat.label} className={`p-3 rounded-2xl border ${subtleSurface}`}>
                  <div className={`text-[10px] font-bold uppercase ${mutedText}`}>{stat.label}</div>
                  <div className="text-xs sm:text-sm font-black mt-0.5">{stat.count}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bento 2: Scientific 4-Stage Spaced Recall */}
          <div className={`lg:col-span-5 p-6 sm:p-7 rounded-3xl border shadow-sm flex flex-col justify-between gap-6 ${cardSurface}`}>
            <div>
              <span className="px-3 py-1 rounded-full bg-amber-500/12 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-[11px] font-black uppercase tracking-wider inline-flex items-center gap-1.5 mb-4">
                <RotateCw className="w-3.5 h-3.5" />
                Ebbinghaus Memory Protocol
              </span>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight mb-2">
                4-Stage Spaced Recall + Trap Journal
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${mutedText}`}>
                Every completed topic enters an automated 1, 4, 9, and 27-day revision queue, while silly errors get locked into your Weak Topics ledger.
              </p>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center">
              {[
                { stage: 'Stage 1', day: 'Day 1' },
                { stage: 'Stage 2', day: 'Day 4' },
                { stage: 'Stage 3', day: 'Day 9' },
                { stage: 'Stage 4', day: 'Day 27' }
              ].map((s, idx) => (
                <div
                  key={s.stage}
                  className={`p-2.5 rounded-2xl border ${
                    idx === 3
                      ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 border-transparent font-black'
                      : subtleSurface
                  }`}
                >
                  <div className="text-[10px] font-bold uppercase opacity-80">{s.stage}</div>
                  <div className="text-xs font-black mt-0.5">{s.day}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bento 3: Focus Studio & Exam Countdown */}
          <div className={`lg:col-span-5 p-6 sm:p-7 rounded-3xl border shadow-sm flex flex-col justify-between gap-5 ${cardSurface}`}>
            <div>
              <span className="px-3 py-1 rounded-full bg-orange-500/12 border border-orange-500/30 text-orange-700 dark:text-orange-300 text-[11px] font-black uppercase tracking-wider inline-flex items-center gap-1.5 mb-4">
                <Timer className="w-3.5 h-3.5" />
                Focus Studio &amp; Pacing
              </span>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight mb-2">
                Deep Work Timer &amp; Live Exam Countdown
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${mutedText}`}>
                Study inside an atmospheric Pomodoro / Stopwatch studio with Lo-Fi, Rain, and Campfire sounds while tracking your exact days, hours, and target pace.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {['Pomodoro 25m', 'Countdown 45m', 'Zen Fullscreen', 'Daily Streak XP'].map(chip => (
                <span key={chip} className={`px-3 py-1.5 rounded-xl border text-xs font-bold ${subtleSurface}`}>
                  {chip}
                </span>
              ))}
            </div>
          </div>

          {/* Bento 4: Eye-Care PDFs, Notes Studio & Study Station */}
          <div className={`lg:col-span-7 p-6 sm:p-7 rounded-3xl border shadow-sm flex flex-col justify-between gap-5 ${cardSurface}`}>
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-sky-500/12 border border-sky-500/30 text-sky-700 dark:text-sky-300 text-[11px] font-black uppercase tracking-wider inline-flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  PDF, Office Notes &amp; Portals
                </span>
                <span className={`text-xs font-mono font-bold ${mutedText}`}>Zero Eye Strain</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight mb-2">
                Eye-Care PDF Reader, KaTeX Notes Studio &amp; Study Station
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${mutedText}`}>
                Read coaching PDFs in calibrated Warm Sepia, Charcoal, or OLED Black side-by-side with rich formula notes, summarize YouTube lectures with timestamp jumps, and launch Testbook or Oliveboard directly from Study Station.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {['Warm Parchment Gold', 'Charcoal Night PDFs', 'KaTeX Math Formulas', 'YouTube Timestamps', 'Study Station Hub'].map(
                tag => (
                  <span key={tag} className={`px-3 py-1.5 rounded-xl border text-xs font-bold ${subtleSurface}`}>
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. COMPLETE MODULES ARSENAL ── */}
      <section id="features" className={`relative z-10 py-18 sm:py-24 border-y px-4 sm:px-6 lg:px-8 ${sectionBandBg}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-2 block font-mono">
              COMPLETE STUDY OPERATING SYSTEM
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
              Every Tool You Need Inside One Workspace
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed ${mutedText}`}>
              Explore the complete module suite built into Syllabus 3D — everything unlocked and ready offline.
            </p>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-7">
              {(
                [
                  { id: 'all', label: 'All Modules', icon: Layers },
                  { id: 'planning', label: 'Syllabus & Pacing', icon: FolderTree },
                  { id: 'vocab-maths', label: 'Vocab & Calc Lab', icon: Languages },
                  { id: 'study-recall', label: 'Focus, PDFs & Recall', icon: RotateCw },
                  { id: 'analytics', label: 'Mocks & Offline', icon: BarChart3 }
                ] as const
              ).map(tab => {
                const IconComp = tab.icon;
                const active = selectedCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedCategory(tab.id);
                    }}
                    className={`h-10 px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                      active
                        ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 border-transparent font-black shadow-md shadow-amber-500/20'
                        : `${cardSurface} ${mutedText} hover:border-amber-500/40`
                    }`}
                  >
                    <IconComp className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredFeatures.map(feat => {
              const Icon = feat.icon;
              const palette = ACCENT_MAP[feat.accent];
              return (
                <div
                  key={feat.id}
                  className={`p-6 rounded-3xl border shadow-xs hover:shadow-lg hover:border-amber-500/45 transition-all flex flex-col justify-between group ${cardSurface}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-11 h-11 rounded-2xl border flex items-center justify-center ${palette.iconBg} ${palette.iconText} group-hover:scale-105 transition-transform`}
                      >
                        <Icon className="w-5 h-5 stroke-[2.2]" />
                      </div>
                      <span
                        className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${palette.badge}`}
                      >
                        {feat.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-black tracking-tight mb-2">{feat.title}</h3>
                    <p className={`text-xs sm:text-sm leading-relaxed mb-5 ${mutedText}`}>
                      {feat.description}
                    </p>
                  </div>

                  <div
                    className={`space-y-2 pt-4 border-t ${
                      isDark ? 'border-white/5' : isWarmCream ? 'border-[#EFE0C2]' : 'border-slate-100'
                    }`}
                  >
                    {feat.bullets.map(bullet => (
                      <div key={bullet} className="flex items-start gap-2 text-xs font-semibold">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5 stroke-[3]" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 7. DAILY WORKFLOW BLUEPRINT ── */}
      <section id="workflow" className="relative z-10 py-18 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-2 block font-mono">
            THE DAILY SYSTEM
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
            A Disciplined 3-Phase Daily Routine
          </h2>
          <p className={`text-sm sm:text-base ${mutedText}`}>
            Turn scattered study hours into predictable exam readiness every single day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: '01',
              phase: 'Morning Sprint • Recall & Maths Speed',
              title: 'Clear Spaced Revisions & 10-Min Calc Drills',
              desc: 'Open your overdue Ebbinghaus revision queue, drill offline SSC Vocabulary & Fixed Prepositions, and warm up mental agility inside Calculation Booster.',
              icon: RotateCw
            },
            {
              step: '02',
              phase: 'Core Hours • Focus Studio & Notes',
              title: 'Master Topics in Eye-Care Workspace',
              desc: 'Pick your Top 3 Daily Targets, launch Focus Mode Studio with calming ambience, annotate PDFs in Parchment/Charcoal mode, and capture LaTeX formulas.',
              icon: BookOpen
            },
            {
              step: '03',
              phase: 'Evening Audit • Mocks & Trap Defense',
              title: 'Log Mock Scores & Eliminate Weak Traps',
              desc: 'Record test accuracy inside Mock Tracker, tag conceptual gaps in Weak Topics, check your Exam Date Pacing runway, and keep your streak unbroken.',
              icon: Trophy
            }
          ].map(item => {
            const StepIcon = item.icon;
            return (
              <div
                key={item.step}
                className={`p-7 rounded-3xl border shadow-sm hover:border-amber-500/45 transition-all flex flex-col justify-between ${cardSurface}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 font-black text-base flex items-center justify-center shadow-md shadow-amber-500/20">
                      {item.step}
                    </span>
                    <StepIcon className="w-5 h-5 text-amber-500" />
                  </div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block mb-1.5">
                    {item.phase}
                  </span>
                  <h3 className="text-lg font-black mb-2">{item.title}</h3>
                  <p className={`text-xs sm:text-sm leading-relaxed ${mutedText}`}>{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 8. COMPARISON MATRIX ── */}
      <section id="comparison" className={`relative z-10 py-18 sm:py-24 border-y px-4 sm:px-6 lg:px-8 ${sectionBandBg}`}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-2 block font-mono">
              BUILT FOR SERIOUS ASPIRANTS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
              Generic Checklists vs Syllabus 3D OS
            </h2>
            <p className={`text-xs sm:text-sm ${mutedText}`}>
              See why spreadsheets and disconnected study apps slow down long-term exam prep.
            </p>
          </div>

          <div className={`overflow-hidden rounded-3xl border shadow-xl ${cardSurface}`}>
            <div
              className={`grid grid-cols-3 p-4 sm:p-5 border-b text-[11px] font-black uppercase tracking-wider font-mono ${subtleSurface}`}
            >
              <div>Capability</div>
              <div className="text-center">Spreadsheets / Paper</div>
              <div className="text-center text-amber-600 dark:text-amber-400">Syllabus 3D OS</div>
            </div>

            {COMPARISON_ROWS.map((row, idx) => (
              <div
                key={row.feature}
                className={`grid grid-cols-3 p-4 text-xs sm:text-sm items-center border-b last:border-0 ${
                  isDark ? 'border-white/5' : isWarmCream ? 'border-[#EFE0C2]' : 'border-slate-100'
                } ${idx % 2 === 1 ? (isDark ? 'bg-white/[0.02]' : isWarmCream ? 'bg-[#FAF0D9]/60' : 'bg-slate-50/70') : ''}`}
              >
                <div className="font-bold pr-2">{row.feature}</div>
                <div className={`text-center flex items-center justify-center gap-1.5 font-medium ${mutedText}`}>
                  <X className="w-4 h-4 text-rose-500 shrink-0" />
                  <span className="hidden sm:inline">{row.traditional}</span>
                </div>
                <div className="text-center text-emerald-600 dark:text-emerald-400 font-black flex items-center justify-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 stroke-[3]" />
                  <span>{row.ours}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. FAQ ACCORDION ── */}
      <section id="faq" className="relative z-10 py-18 sm:py-22 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-2 block font-mono">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
            Everything Answered Clearly
          </h2>
          <p className={`text-xs sm:text-sm ${mutedText}`}>
            Clear details about offline access, themes, and exam compatibility.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = activeFaqIndex === i;
            return (
              <div
                key={faq.q}
                className={`rounded-2xl border overflow-hidden transition-all shadow-2xs ${
                  isOpen ? 'border-amber-500/50' : ''
                } ${cardSurface}`}
              >
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setActiveFaqIndex(isOpen ? null : i);
                  }}
                  className="w-full px-5 sm:px-6 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-amber-500' : mutedText
                    }`}
                  />
                </button>
                {isOpen && (
                  <div
                    className={`px-5 sm:px-6 pb-5 pt-3.5 text-xs sm:text-sm leading-relaxed border-t animate-fade-in ${
                      isDark ? 'border-white/5' : isWarmCream ? 'border-[#EFE0C2]' : 'border-slate-100'
                    } ${mutedText}`}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 10. FINAL CONVERSION CTA ── */}
      <section className="relative z-10 py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div
          className={`relative rounded-3xl p-8 sm:p-14 border text-center shadow-2xl overflow-hidden ${
            isDark
              ? 'bg-gradient-to-br from-[#141724] via-[#1B1D2C] to-[#0D0F18] border-amber-500/35 text-white'
              : isWarmCream
              ? 'bg-gradient-to-br from-[#2B2407] via-[#3B2E08] to-[#1D1805] border-amber-500/45 text-[#FFFDF8]'
              : 'bg-gradient-to-br from-[#121521] via-[#1B2032] to-[#0B0D16] border-amber-500/35 text-white'
          }`}
        >
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-orange-500/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-5">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/35 text-amber-300 font-mono text-xs font-black uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" />
              Ready in Under 30 Seconds
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Start Preparing With Precision, Not Guesswork.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Launch Syllabus 3D to organize your entire exam syllabus, drill vocabulary &amp; mental maths offline, stay calm in Focus Mode, and track every mock score cleanly.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                type="button"
                onClick={() => handleCtaClick('signup')}
                className="w-full sm:w-auto h-13 px-8 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-amber-500/25 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Launch App Free</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>

              <button
                type="button"
                onClick={() => handleCtaClick('login')}
                className="w-full sm:w-auto h-13 px-7 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/20 backdrop-blur-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-4 h-4 text-amber-400" />
                <span>Sign In to Account</span>
              </button>
            </div>

            <div className="text-xs text-slate-400 font-medium pt-1">
              No credit card required • Offline-First PWA • Warm Parchment, Light &amp; Obsidian Dark modes
            </div>
          </div>
        </div>
      </section>

      {/* ── 11. FOOTER ── */}
      <footer
        className={`relative z-10 border-t py-10 px-4 sm:px-6 lg:px-8 text-xs transition-colors ${
          isDark
            ? 'bg-[#06080D] border-white/10 text-slate-400'
            : isWarmCream
            ? 'bg-[#F4E6CA] border-[#DFCCA8] text-[#5E4E10]'
            : 'bg-white border-slate-200 text-slate-600'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Syllabus 3D" className="w-8 h-8 object-contain" />
            <div>
              <span className="font-black text-sm block leading-tight">Syllabus 3D</span>
              <span className="text-[10px] font-mono opacity-80">The Exam Operating System</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6 font-bold">
            <a href="#study-suite" className="hover:text-amber-500 transition-colors">
              Live Preview
            </a>
            <a href="#features" className="hover:text-amber-500 transition-colors">
              Modules
            </a>
            <a href="#workflow" className="hover:text-amber-500 transition-colors">
              Daily System
            </a>
            <a href="#comparison" className="hover:text-amber-500 transition-colors">
              Comparison
            </a>
            <a href="#faq" className="hover:text-amber-500 transition-colors">
              FAQ
            </a>
            <button
              type="button"
              onClick={() => handleCtaClick('login')}
              className="hover:text-amber-500 transition-colors cursor-pointer"
            >
              Sign In
            </button>
          </div>

          <div className="text-center md:text-right text-[11px]">
            <div>© {new Date().getFullYear()} Syllabus 3D. Built for competitive exam aspirants.</div>
            <div className="opacity-80 mt-0.5">
              Press{' '}
              <span className={`font-mono px-1.5 py-0.5 rounded border text-[10px] font-bold ${subtleSurface}`}>
                ?
              </span>{' '}
              inside the app for keyboard shortcuts.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
