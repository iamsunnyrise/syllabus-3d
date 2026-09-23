import React, { useState } from 'react';
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
  Headphones,
  Footprints,
  BrainCircuit,
  BarChart3,
  Flame,
  Clock,
  Calendar,
  Zap,
  Cloud,
  Layers,
  Compass,
  Trophy,
  Play,
  TrendingUp,
  FolderTree,
  AlertTriangle,
  Radio,
  Sliders,
  Laptop
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { soundManager } from '../../utils/soundEffects';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

type FeatureCategory = 'all' | 'planning' | 'recall' | 'study' | 'analytics';

interface FeatureItem {
  id: string;
  category: 'planning' | 'recall' | 'study' | 'analytics';
  title: string;
  badge: string;
  badgeColor: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
  description: string;
  bullets: string[];
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onGetStarted,
  onLogin
}) => {
  const { isDark, toggleTheme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<FeatureCategory>('all');
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);

  const handleCtaClick = (type: 'signup' | 'login') => {
    soundManager.playClick();
    if (type === 'signup') {
      onGetStarted();
    } else {
      onLogin();
    }
  };

  const featureItems: FeatureItem[] = [
    {
      id: 'syllabus-tree',
      category: 'planning',
      title: '3D Hierarchical Syllabus Explorer',
      badge: 'Core Engine',
      badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-sky-400 border-blue-500/30',
      icon: FolderTree,
      iconBg: 'bg-blue-500/10 border-blue-500/30',
      iconColor: 'text-blue-600 dark:text-sky-400',
      description: 'Deconstruct massive exam syllabuses into a clear 3D structure: Subjects → Chapters → Topics → Micro-Subtopics with real-time percentage indicators.',
      bullets: [
        'Multi-level depth tracking with instant visual progress',
        'Pre-loaded exam templates (UPSC, GATE, JEE, NEET, SSC) + custom subjects',
        'Bulk topic importer and subject exam weightage tags'
      ]
    },
    {
      id: 'spaced-repetition',
      category: 'recall',
      title: 'Scientific Spaced Repetition (Ebbinghaus)',
      badge: 'Cognitive Science',
      badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30',
      icon: RotateCw,
      iconBg: 'bg-purple-500/10 border-purple-500/30',
      iconColor: 'text-purple-600 dark:text-purple-400',
      description: 'Never let learned concepts decay. Automated 4-Stage SuperMemo intervals (1 Day → 4 Days → 9 Days → 27 Days) trigger revisions right at the optimal recall window.',
      bullets: [
        'Automated daily revision queue mapped to forgetting curve',
        'Stage 1 to 4 mastery verification with one-tap completion',
        'Eliminates last-minute cramming and builds permanent memory'
      ]
    },
    {
      id: 'pdf-reader',
      category: 'study',
      title: 'In-App Eye-Care PDF Reader Suite',
      badge: 'Zero Eye Strain',
      badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
      icon: BookOpen,
      iconBg: 'bg-amber-500/10 border-amber-500/30',
      iconColor: 'text-amber-600 dark:text-amber-400',
      description: 'Read heavyweight coaching modules, standard textbooks, and pyqs without blinding glare. Powered by calibrated GPU shaders that protect colored diagrams.',
      bullets: [
        'Calibrated Charcoal Night, OLED Pure Black & Kindle Sepia modes',
        'Freehand pen drawing, box highlighting & sticky comment annotations',
        'Split-screen study mode: read PDFs side-by-side with notes'
      ]
    },
    {
      id: 'word-notes',
      category: 'study',
      title: 'MS Word-Grade Document Notes Studio',
      badge: 'Office Ribbon',
      badgeColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30',
      icon: FileText,
      iconBg: 'bg-indigo-500/10 border-indigo-500/30',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      description: 'A desktop-caliber rich document workspace. Type comprehensive notes with realistic A4 paper views, rich typography, LaTeX formulas, and table repairs.',
      bullets: [
        'Full Microsoft Office-style Ribbon interface with tabbed toolbars',
        'Real-time KaTeX LaTeX math equation rendering for formulas',
        'Voice dictation (speech-to-text), table repair tools & clean PDF export'
      ]
    },
    {
      id: 'youtube-ai',
      category: 'study',
      title: 'AI YouTube Lecture Notes & Video Sync',
      badge: 'Smart Learning',
      badgeColor: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30',
      icon: Play,
      iconBg: 'bg-red-500/10 border-red-500/30',
      iconColor: 'text-red-600 dark:text-red-400',
      description: 'Turn passive video watching into active high-yield study material. Generate structured notes from YouTube video lectures with interactive timestamp bookmarks.',
      bullets: [
        'Instant AI key-takeaways, formula extractions & summaries',
        'Interactive timestamp bookmarks that jump to exact video moments',
        'Save notes directly to relevant syllabus topics in one click'
      ]
    },
    {
      id: 'mock-tracker',
      category: 'analytics',
      title: 'Mock Test Series & Percentile Tracker',
      badge: 'Score Booster',
      badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      icon: BarChart3,
      iconBg: 'bg-emerald-500/10 border-emerald-500/30',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      description: 'Comprehensive test analytics dashboard. Log full-length and sectional test scores, track percentile trajectories, and eliminate negative marks.',
      bullets: [
        'Score trends, accuracy %, speed vs attempt charts across test series',
        'Categorized mistake logging: silly errors, concept gaps, time traps',
        'Compare performance across subjects to identify high-ROI areas'
      ]
    },
    {
      id: 'task-planner',
      category: 'planning',
      title: 'Smart Daily & Weekly Task Planner',
      badge: 'Productivity OS',
      badgeColor: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30',
      icon: Calendar,
      iconBg: 'bg-cyan-500/10 border-cyan-500/30',
      iconColor: 'text-cyan-600 dark:text-cyan-400',
      description: 'Dynamic daily study schedule synced directly with your syllabus. Assign topic targets to time blocks with high, medium, and low urgency tags.',
      bullets: [
        'Daily checklist with time estimates and auto-streak counter',
        'Drag-and-drop prioritization & backlog auto-roll to next morning',
        'Visual target progress bar celebrating daily mission completion'
      ]
    },
    {
      id: 'pacing-runway',
      category: 'analytics',
      title: 'Exam Runway & Pacing Calculator',
      badge: 'Target Forecaster',
      badgeColor: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30',
      icon: Clock,
      iconBg: 'bg-orange-500/10 border-orange-500/30',
      iconColor: 'text-orange-600 dark:text-orange-400',
      description: 'Mathematical forecast of your exam trajectory. Calculates the required daily study velocity (topics and hours per day) to complete syllabus with buffer time.',
      bullets: [
        'Live countdown clock with runway days remaining until D-Day',
        'Dynamic pace status: Ahead, On-Track, or Behind Schedule alert',
        'Calculates exact revision rounds feasible before final exam'
      ]
    },
    {
      id: 'weak-traps',
      category: 'recall',
      title: 'Weak Topics & Exam Trap Diagnostic',
      badge: 'Mistake Journal',
      badgeColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30',
      icon: AlertTriangle,
      iconBg: 'bg-rose-500/10 border-rose-500/30',
      iconColor: 'text-rose-600 dark:text-rose-400',
      description: 'Convert past exam errors into guaranteed marks. Maintain an active trap ledger of tricky concepts, negative marking triggers, and confusing formulas.',
      bullets: [
        'Automated diagnosis of topics with low quiz or mock accuracy',
        'Active mistake journal with "Why I Failed & How to Fix It" fields',
        'Priority filter for focused weekend remediation sprints'
      ]
    },
    {
      id: 'walk-revise',
      category: 'recall',
      title: 'Walk & Revise Hands-Free Audio Mode',
      badge: 'Passive to Active',
      badgeColor: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/30',
      icon: Headphones,
      iconBg: 'bg-pink-500/10 border-pink-500/30',
      iconColor: 'text-pink-600 dark:text-pink-400',
      description: 'Turn outdoor walks, daily commutes, and gym workouts into productive revision sessions. High-fidelity text-to-speech audio reader plays your syllabus notes.',
      bullets: [
        'Hands-free audio player with playback speed (1x, 1.25x, 1.5x, 2x)',
        'Topic-by-topic audio summaries, voice memos & audio cards',
        'Keeps brain engaged during low-energy hours without screen glare'
      ]
    },
    {
      id: 'focus-chamber',
      category: 'recall',
      title: 'Focus Chamber & Pomodoro Stopwatch',
      badge: 'Deep Work',
      badgeColor: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/30',
      icon: Flame,
      iconBg: 'bg-violet-500/10 border-violet-500/30',
      iconColor: 'text-violet-600 dark:text-violet-400',
      description: 'Enter a distraction-free deep work zone. Calibrated 25/50-minute Pomodoro timers with ambient background soundscapes (binaural beats, rain, library murmur).',
      bullets: [
        'Floating PIP study stopwatch that stays on screen during PDF reading',
        'Curated ambient audio tracks designed to induce alpha brainwave focus',
        'Detailed session logs contributing to daily XP and study streak'
      ]
    },
    {
      id: 'mindmap',
      category: 'planning',
      title: 'Interactive Visual Knowledge Mind Map',
      badge: 'Visual Thinking',
      badgeColor: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/30',
      icon: BrainCircuit,
      iconBg: 'bg-teal-500/10 border-teal-500/30',
      iconColor: 'text-teal-600 dark:text-teal-400',
      description: 'Visualize the interconnected architecture of your entire subject. Zoom, pan, and branch topics to see how high-yield concepts connect.',
      bullets: [
        'Dynamic interactive canvas with collapsible node trees',
        'Color-coded completion status across interrelated topics',
        'Great for multi-disciplinary exams like UPSC, GATE, and CSE'
      ]
    },
    {
      id: 'backlog-rescue',
      category: 'planning',
      title: 'Smart Backlog Rescue Engine',
      badge: 'Emergency Recovery',
      badgeColor: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/30',
      icon: Zap,
      iconBg: 'bg-yellow-500/10 border-yellow-500/30',
      iconColor: 'text-yellow-600 dark:text-yellow-400',
      description: 'Fell sick or took a break? Do not panic. The Backlog Rescue algorithm redistributes pending topics into realistic daily micro-doses without burnout.',
      bullets: [
        'One-click schedule rebalancing based on remaining exam runway',
        'Separates high-weightage priority topics from secondary topics',
        'Eliminates anxiety and restores structured momentum instantly'
      ]
    },
    {
      id: 'offline-cloud',
      category: 'analytics',
      title: '100% Offline PWA & Cloud Backup',
      badge: 'Zero Data Loss',
      badgeColor: 'bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/30',
      icon: Cloud,
      iconBg: 'bg-slate-500/10 border-slate-500/30',
      iconColor: 'text-slate-700 dark:text-slate-300',
      description: 'Works seamlessly in remote study locations, library basements, or airplanes without internet. Your data is stored locally in IndexedDB with cloud sync options.',
      bullets: [
        'Installable Progressive Web App (PWA) on Android, iOS, Windows, Mac',
        'One-click Google Drive automated backup & encrypted JSON exports',
        'Private and secure: your notes and data belong 100% to you'
      ]
    }
  ];

  const filteredFeatures = selectedCategory === 'all'
    ? featureItems
    : featureItems.filter(item => item.category === selectedCategory);

  const faqs = [
    {
      q: 'Is Syllabus 3D really 100% free to use?',
      a: 'Yes! Syllabus 3D is completely free for all individual aspirants and students. All 14+ core tools—including 3D syllabus tracking, 4-stage spaced repetition, in-app eye-care PDF reader, MS Word-grade document notes studio, mock test tracker, and Walk & Revise—are fully unlocked with no paywalls or trial periods.'
    },
    {
      q: 'Does it work offline without an active internet connection?',
      a: 'Yes, 100%! Syllabus 3D is engineered with an offline-first architecture as a Progressive Web App (PWA). All your syllabus completion ticks, notes, PDF comments, and revision queues are safely cached on your device. Whenever you are connected, you can optionally backup to your private Google Drive in one click.'
    },
    {
      q: 'How does the Spaced Repetition engine work?',
      a: 'It uses an intelligent adaptation of the Ebbinghaus forgetting curve. When you mark a topic as learned, the system queues automated revisions at optimal memory intervals: Stage 1 (1 day), Stage 2 (4 days), Stage 3 (9 days), and Stage 4 (27 days). Revising at these precise intervals transfers concepts from short-term to permanent long-term memory.'
    },
    {
      q: 'What is the Eye-Care PDF Night Mode and how does it protect my eyes?',
      a: 'Standard PDF viewers simply invert colors, turning diagrams and text into blinding neon blues and harsh purples. Syllabus 3D uses calibrated GPU shaders with color hue preservation. White pages become soothing dark charcoal (#18181D) or OLED pure black, while red, blue, and green diagrams retain their natural colors without causing retinal fatigue during late-night study marathons.'
    },
    {
      q: 'Which exams can I prepare for with Syllabus 3D?',
      a: 'Syllabus 3D supports ANY competitive exam or academic curriculum! You can select pre-built structured templates for major competitive exams (UPSC CSE, GATE, JEE Mains & Advanced, NEET, SSC CGL, Banking, CAT) or create completely custom subjects, chapters, and micro-subtopics tailored to your university or state exam.'
    },
    {
      q: 'How do I install Syllabus 3D on my mobile, tablet, or laptop?',
      a: 'Since Syllabus 3D is a modern PWA, you can install it instantly without visiting an app store. On Google Chrome, Edge, or Brave, tap the install icon in the address bar. On Safari (iPhone/iPad), tap "Share" and select "Add to Home Screen". It opens in full-screen native mode just like a native app.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#070913] text-[#0F172A] dark:text-[#F1F5F9] font-sans selection:bg-blue-600/30 selection:text-blue-200 overflow-x-hidden transition-colors duration-300">
      
      {/* ── ATMOSPHERIC LIGHTING & GLOW EFFECTS ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] bg-gradient-to-b from-blue-600/15 via-indigo-600/10 to-transparent rounded-full blur-[140px]" />
        <div className="absolute top-[30%] -left-64 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[160px]" />
        <div className="absolute top-[60%] -right-64 w-[650px] h-[650px] bg-sky-500/10 rounded-full blur-[170px]" />
        <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[150px]" />
      </div>

      {/* ── 1. STICKY GLASSMORPHIC NAVIGATION BAR ── */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-white/[0.08] bg-white/85 dark:bg-[#070913]/85 backdrop-blur-xl transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
          
          {/* Brand Logo & Name */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
              <img src="/logo.png" alt="Syllabus 3D" className="w-full h-full object-contain drop-shadow-md" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-black tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-sky-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Syllabus 3D
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-sky-300 border border-blue-500/30 font-bold uppercase tracking-wider">
                  Pro
                </span>
              </div>
              <p className="hidden sm:block text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">
                Exam Operating System
              </p>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-bold text-slate-600 dark:text-slate-300">
            <a href="#features" className="hover:text-blue-600 dark:hover:text-sky-400 transition-colors">All Features</a>
            <a href="#spaced-repetition" className="hover:text-blue-600 dark:hover:text-sky-400 transition-colors">Spaced Repetition</a>
            <a href="#study-suite" className="hover:text-blue-600 dark:hover:text-sky-400 transition-colors">PDF & Notes Suite</a>
            <a href="#workflow" className="hover:text-blue-600 dark:hover:text-sky-400 transition-colors">Daily Routine</a>
            <a href="#comparison" className="hover:text-blue-600 dark:hover:text-sky-400 transition-colors">Comparison</a>
            <a href="#faq" className="hover:text-blue-600 dark:hover:text-sky-400 transition-colors">FAQ</a>
          </nav>

          {/* Action CTAs & Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                toggleTheme();
              }}
              className="p-2 sm:p-2.5 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-white/15 transition-all cursor-pointer"
              title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Sign In Button */}
            <button
              type="button"
              onClick={() => handleCtaClick('login')}
              className="hidden sm:inline-flex px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-all cursor-pointer"
            >
              Sign In
            </button>

            {/* Launch App Free */}
            <button
              type="button"
              onClick={() => handleCtaClick('signup')}
              className="h-10 sm:h-11 px-4 sm:px-5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 active:scale-95 transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer"
            >
              <span>Launch App Free</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </header>

      {/* ── 2. HERO SECTION WITH HIGH-IMPACT STUDENT VISUAL ── */}
      <section className="relative z-10 pt-10 sm:pt-16 lg:pt-20 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-6 xl:col-span-7 text-center lg:text-left">
            {/* Top Pill Announcement */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-500/15 border border-blue-500/30 text-blue-700 dark:text-blue-300 text-xs font-black mb-6 shadow-xs animate-fade-in">
              <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
              <span>The Complete Operating System for Competitive Exams</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-600 text-white font-mono uppercase tracking-widest">
                100% Free & Offline
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl xl:text-6xl font-black tracking-tight leading-[1.12] mb-5 text-slate-900 dark:text-white">
              Master Your Entire Syllabus.{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-[#38BDF8] dark:via-[#818CF8] dark:to-[#C084FC] bg-clip-text text-transparent">
                Retain Every Single Concept
              </span>{' '}
              on Exam Day.
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-[17px] text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
              Transform study overwhelm into a precision daily mastery routine. Syllabus 3D unifies 
              <strong className="text-slate-900 dark:text-white font-bold"> 3D syllabus hierarchy</strong>, 
              <strong className="text-slate-900 dark:text-white font-bold"> 4-stage scientific spaced repetition</strong>, 
              <strong className="text-slate-900 dark:text-white font-bold"> in-app eye-care PDF annotations</strong>, and 
              <strong className="text-slate-900 dark:text-white font-bold"> MS Word-grade formula notes</strong> into one seamless workspace.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 mb-10">
              <button
                type="button"
                onClick={() => handleCtaClick('signup')}
                className="w-full sm:w-auto h-13 px-8 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span>Start Tracking Free</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
              
              <button
                type="button"
                onClick={() => handleCtaClick('login')}
                className="w-full sm:w-auto h-13 px-7 rounded-2xl bg-white dark:bg-white/[0.08] hover:bg-slate-50 dark:hover:bg-white/15 text-slate-800 dark:text-white font-bold text-sm border border-slate-200/90 dark:border-white/15 shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-4 h-4 text-blue-500" />
                <span>Sign In to Existing Account</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bold text-slate-600 dark:text-slate-300 pt-6 border-t border-slate-200/80 dark:border-white/10">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>100% Free Forever</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Offline-First (PWA)</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCw className="w-4 h-4 text-purple-500 shrink-0" />
                <span>4-Stage Recall</span>
              </div>
              <div className="flex items-center gap-2">
                <Moon className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Eye-Care PDFs</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Real Student Photo & Live Telemetry Overlay */}
          <div className="lg:col-span-6 xl:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative Ambient Background Halo */}
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-blue-600/30 via-indigo-600/20 to-purple-600/30 blur-2xl opacity-70 -z-10" />

              {/* Main Card Frame */}
              <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-[#121424] border border-slate-200/90 dark:border-white/15 shadow-2xl p-2 sm:p-2.5">
                
                {/* Browser/Device Header */}
                <div className="px-3.5 py-2.5 bg-slate-100 dark:bg-[#181B2E] rounded-2xl flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 ml-2 font-bold">
                      syllabus3d.app • Active Study Session
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    <span>Focus Chamber Active</span>
                  </div>
                </div>

                {/* Professional Student Study Photo */}
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-900 group">
                  <img
                    src="/student_studying_laptop.jpg"
                    alt="Focused student studying with Syllabus 3D analytics dashboard"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Subtle Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                  {/* Floating Overlay Badge: Streak */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 p-2.5 rounded-2xl bg-[#0E111F]/90 backdrop-blur-md border border-white/20 shadow-xl flex items-center gap-2.5 text-left animate-fade-in">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                      <Flame className="w-5 h-5 fill-amber-400" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Consistency</div>
                      <div className="text-xs sm:text-sm font-black text-white font-mono">42-Day Streak 🔥</div>
                    </div>
                  </div>

                  {/* Floating Overlay Badge: Spaced Repetition */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3 rounded-2xl bg-[#0E111F]/95 backdrop-blur-md border border-white/20 shadow-xl flex items-center justify-between text-left">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shrink-0">
                        <RotateCw className="w-4 h-4 stroke-[2.5]" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-black text-white truncate">Stage 3 Revision Due Today</div>
                        <div className="text-[11px] text-purple-300 font-medium truncate">Modern Indian History • 14 Subtopics</div>
                      </div>
                    </div>
                    <span className="shrink-0 px-2.5 py-1 rounded-lg bg-purple-500 text-white font-black text-[11px] uppercase tracking-wider">
                      Optimal
                    </span>
                  </div>

                  {/* Floating Overlay Badge: Completion */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2.5 rounded-2xl bg-[#0E111F]/90 backdrop-blur-md border border-white/20 shadow-xl flex items-center gap-2 text-left">
                    <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                      <Target className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold">Syllabus</div>
                      <div className="text-xs sm:text-sm font-black text-white font-mono">68.4% Done</div>
                    </div>
                  </div>
                </div>

                {/* Sub-bar KPI Telemetry */}
                <div className="mt-2.5 grid grid-cols-3 gap-2 text-center py-2 px-3 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Topics Mastered</span>
                    <span className="font-mono font-black text-slate-900 dark:text-white">248 / 362</span>
                  </div>
                  <div className="border-x border-slate-200 dark:border-white/10">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Exam Runway</span>
                    <span className="font-mono font-black text-blue-600 dark:text-sky-400">114 Days</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Speed Target</span>
                    <span className="font-mono font-black text-emerald-600 dark:text-emerald-400">3.2 hrs/day</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 3. COMPLETE 14-FEATURE STUDY ARSENAL (HIGHLIGHTING ALL FEATURES) ── */}
      <section id="features" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-sky-400 mb-2 block font-mono">
            COMPREHENSIVE 14-IN-1 STUDY ARSENAL
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 text-slate-900 dark:text-white">
            Every Single Tool Required to Clear Your Exam
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Eliminate fragmented tools. No more juggling separate spreadsheets, PDF viewers, flashcard apps, test trackers, and notebooks. Syllabus 3D houses your entire academic ecosystem in one cohesive platform.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              { id: 'all', label: 'All 14 Features', icon: Sparkles },
              { id: 'planning', label: 'Syllabus & Planning', icon: FolderTree },
              { id: 'recall', label: 'Spaced Recall & Focus', icon: RotateCw },
              { id: 'study', label: 'PDF & Notes Studio', icon: BookOpen },
              { id: 'analytics', label: 'Tests & Runway Analytics', icon: BarChart3 }
            ].map(tab => {
              const IconComp = tab.icon;
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedCategory(tab.id as FeatureCategory);
                  }}
                  className={`h-9 sm:h-10 px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                      : 'bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 14 Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFeatures.map(feat => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#111322] border border-slate-200/90 dark:border-white/10 shadow-sm hover:shadow-xl hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Top Icon & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl ${feat.iconBg} border flex items-center justify-center ${feat.iconColor} shadow-xs group-hover:scale-105 transition-transform`}>
                      <Icon className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${feat.badgeColor}`}>
                      {feat.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight mb-2.5">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                    {feat.description}
                  </p>
                </div>

                {/* Bullets */}
                <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-white/5">
                  {feat.bullets.map((b, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5 stroke-[3]" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 4. DEEP DIVE SHOWCASE 1: ACTIVE RECALL & AUDIO REVISION (STUDENT PHOTO 2) ── */}
      <section id="spaced-repetition" className="py-20 bg-slate-100/70 dark:bg-[#0C0E1B]/80 border-y border-slate-200/90 dark:border-white/10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Visual Column: Student with Headphones & Tablet */}
            <div className="lg:col-span-6 xl:col-span-5 order-2 lg:order-1">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-purple-600/30 via-pink-600/20 to-indigo-600/30 blur-2xl opacity-70 -z-10" />

                <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-[#121424] border border-slate-200/90 dark:border-white/15 shadow-2xl p-2 sm:p-2.5">
                  <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-900 group">
                    <img
                      src="/student_audio_revision.jpg"
                      alt="Student practicing active recall and hands-free audio revision in library"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                    {/* Overlay Tag: Walk & Revise Audio Engine */}
                    <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-[#0E111F]/90 backdrop-blur-md border border-white/20 shadow-xl flex items-center justify-between text-white">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-400 shrink-0">
                          <Headphones className="w-5 h-5 stroke-[2.4]" />
                        </div>
                        <div>
                          <div className="text-xs font-black text-white">Walk & Revise Mode Active</div>
                          <div className="text-[11px] text-pink-200 font-mono">1.25x Speed • Natural Voice Engine</div>
                        </div>
                      </div>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Column: The Science of Active Recall */}
            <div className="lg:col-span-6 xl:col-span-7 order-1 lg:order-2">
              <span className="text-xs font-black uppercase tracking-widest text-purple-600 dark:text-purple-400 mb-2 block font-mono">
                SCIENTIFIC RETENTION PROTOCOL
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-4">
                Active Recall Without Mental Fatigue. Never Forget What You Read.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Most aspirants make the mistake of rereading thick books repeatedly. Scientific research proves that memory fades exponentially unless active recall is triggered right before memory decay sets in.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-white dark:bg-[#121422] border border-slate-200/90 dark:border-white/10 shadow-xs">
                  <div className="flex items-center gap-2 font-bold text-sm text-purple-700 dark:text-purple-400 mb-1">
                    <RotateCw className="w-4 h-4 stroke-[2.5]" />
                    <span>4-Stage Spaced Intervals</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Automated queues trigger revisions at 1, 4, 9, and 27 days to lock concepts into long-term memory.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-[#121422] border border-slate-200/90 dark:border-white/10 shadow-xs">
                  <div className="flex items-center gap-2 font-bold text-sm text-pink-700 dark:text-pink-400 mb-1">
                    <Headphones className="w-4 h-4 stroke-[2.5]" />
                    <span>Walk & Revise Audio</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Listen to high-yield summaries on your walks, workouts, or commutes without screen glare.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-[#121422] border border-slate-200/90 dark:border-white/10 shadow-xs">
                  <div className="flex items-center gap-2 font-bold text-sm text-amber-700 dark:text-amber-400 mb-1">
                    <Moon className="w-4 h-4 stroke-[2.5]" />
                    <span>Eye-Care Night PDFs</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    GPU-calibrated dark and OLED modes reduce eye strain while preserving diagrams and charts.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-[#121422] border border-slate-200/90 dark:border-white/10 shadow-xs">
                  <div className="flex items-center gap-2 font-bold text-sm text-blue-700 dark:text-blue-400 mb-1">
                    <Flame className="w-4 h-4 stroke-[2.5]" />
                    <span>Focus Chamber Binaural</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Alpha brainwave soundscapes and a floating study timer eliminate phone distractions.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleCtaClick('signup')}
                className="h-11 px-6 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-purple-500/25 active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Try Spaced Repetition Free</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ── 5. DEEP DIVE SHOWCASE 2: EXAM RUNWAY & MOCK TEST ANALYTICS (STUDENT PHOTO 3) ── */}
      <section id="study-suite" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Content Column: Data-Driven Preparation */}
          <div className="lg:col-span-6 xl:col-span-7">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-2 block font-mono">
              PRECISION TEST ANALYTICS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-4">
              From Study Anxiety to Confident Ranker. Know Exactly Where You Stand.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Competitive exams aren’t won by studying 16 hours blindly; they are won by precision feedback loops. Syllabus 3D provides real-time velocity calculations, mock test score trends, and an active trap ledger so you never repeat the same mistake twice.
            </p>

            <div className="space-y-3.5 mb-8">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white dark:bg-[#121422] border border-slate-200/90 dark:border-white/10 shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Mock Test Series Percentile Tracker</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug">
                    Log test scores across coaching test series, measure accuracy vs speed, and uncover subject-wise scoring traps.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white dark:bg-[#121422] border border-slate-200/90 dark:border-white/10 shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-600 dark:text-orange-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Exam Pacing Runway Calculator</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug">
                    Dynamically forecasts if you are Ahead, On-Track, or Behind schedule based on remaining days and required study velocity.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white dark:bg-[#121422] border border-slate-200/90 dark:border-white/10 shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-600 dark:text-rose-400 shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Dedicated Exam Trap & Mistake Journal</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug">
                    Tag recurring conceptual traps and silly errors into a focused review list before every mock test.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleCtaClick('signup')}
              className="h-11 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/25 active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Track Your Mock Scores</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Visual Column: Confident Student in Bright Campus Lounge */}
          <div className="lg:col-span-6 xl:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-emerald-600/30 via-teal-600/20 to-blue-600/30 blur-2xl opacity-70 -z-10" />

              <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-[#121424] border border-slate-200/90 dark:border-white/15 shadow-2xl p-2 sm:p-2.5">
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-900 group">
                  <img
                    src="/student_exam_success.jpg"
                    alt="Confident student celebrating high exam milestone scores and consistent preparation"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                  {/* Overlay Milestone Chip */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-[#0E111F]/90 backdrop-blur-md border border-white/20 shadow-xl flex items-center justify-between text-white">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                        <Trophy className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-black text-white">Full Mock Test #12 Completed</div>
                        <div className="text-[11px] text-emerald-300 font-mono">98.4 Percentile • 0 Negative Traps</div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500 text-white font-mono font-black text-xs">
                      +14%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 6. THE RANKER'S 3-STEP DAILY WORKFLOW ── */}
      <section id="workflow" className="py-20 bg-slate-100/60 dark:bg-[#0E101B]/60 border-y border-slate-200/90 dark:border-white/10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-2 block font-mono">
              THE DAILY BLUEPRINT
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-4">
              How High Rankers Structure Every Study Day
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Replace random study sessions with a disciplined, high-velocity daily system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            {/* Step 1 */}
            <div className="p-8 rounded-3xl bg-white dark:bg-[#141624] border border-slate-200/90 dark:border-white/10 shadow-lg relative flex flex-col items-center text-center group hover:border-blue-500/40 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white font-black text-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                1
              </div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-sky-400 mb-1">
                Morning: 07:00 AM - 09:00 AM
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">Review Spaced Repetition Queue</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Start your freshest hours by knocking out Stage 1 to 4 topics in your automated revision queue. Solidify memory before touching new content.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-3xl bg-white dark:bg-[#141624] border border-slate-200/90 dark:border-white/10 shadow-lg relative flex flex-col items-center text-center group hover:border-indigo-500/40 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white font-black text-xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform">
                2
              </div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
                Daytime: 10:00 AM - 05:00 PM
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">Deep Work in Focus Chamber</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Read syllabus modules inside the Eye-Care PDF reader, watch video lectures with AI notes, and draft formula summaries in the Office Ribbon editor.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-3xl bg-white dark:bg-[#141624] border border-slate-200/90 dark:border-white/10 shadow-lg relative flex flex-col items-center text-center group hover:border-purple-500/40 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-purple-600 text-white font-black text-xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform">
                3
              </div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-1">
                Evening: 07:00 PM - 09:30 PM
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">Mock Logging & Trap Defense</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Attempt chapter tests, document silly mistakes in your Weak Trap journal, check pacing velocity, and back up your progress in 1 click.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── 7. TRADITIONAL PREP VS SYLLABUS 3D COMPARISON MATRIX ── */}
      <section id="comparison" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-2 block font-mono">
            UNMATCHED EFFICIENCY
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-4">
            Traditional Preparation vs Syllabus 3D
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Why spreadsheets, paper wall charts, and loose PDF notes hold serious aspirants back.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200/90 dark:border-white/10 shadow-xl bg-white dark:bg-[#121422]">
          <div className="grid grid-cols-3 bg-slate-100 dark:bg-white/5 p-4 sm:p-5 border-b border-slate-200 dark:border-white/10 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
            <div>Feature</div>
            <div className="text-center">Spreadsheets / Notebooks</div>
            <div className="text-center text-blue-600 dark:text-sky-400 font-black">Syllabus 3D OS</div>
          </div>

          {[
            { feature: 'Granular Subtopic Tracking', bad: 'Tedious manual rows', good: 'Visual 3D cards & auto-progress' },
            { feature: 'Spaced Repetition (Ebbinghaus)', bad: 'Forgotten / No reminders', good: 'Automated 4-Stage recall queue' },
            { feature: 'PDF Night Mode & Eye Care', bad: 'Harsh white glare / inverted mess', good: 'Calibrated charcoal & OLED black' },
            { feature: 'Notes & Formula Formatting', bad: 'Unorganized files / messy docs', good: 'MS Word Ribbon + LaTeX formulas' },
            { feature: 'Hands-Free Audio Revision', bad: 'Not possible', good: 'Walk & Revise audio mode player' },
            { feature: 'YouTube Lecture Note Sync', bad: 'Lost bookmarks & timestamps', good: '1-click timestamp jumps & summaries' },
            { feature: 'Mock Test Series Analytics', bad: 'Rough notebooks / Excel graphs', good: 'Percentile tracking & accuracy trends' },
            { feature: 'Exam Traps & Mistake Log', bad: 'Lost in rough copies', good: 'Dedicated active trap remediation' },
            { feature: 'Exam Runway & Pacing Forecast', bad: 'Guesswork until the end', good: 'Calculates exact daily velocity' },
            { feature: 'Offline Operation & Privacy', bad: 'Needs active internet / desktop', good: '100% Offline PWA + Drive sync' }
          ].map((row, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-3 p-4 sm:p-4.5 text-xs sm:text-sm items-center border-b border-slate-200/60 dark:border-white/5 last:border-0 ${
                idx % 2 === 0 ? 'bg-transparent' : 'bg-slate-50/50 dark:bg-white/[0.02]'
              }`}
            >
              <div className="font-bold text-slate-800 dark:text-slate-200">{row.feature}</div>
              <div className="text-center text-rose-500/80 flex items-center justify-center gap-1.5 font-medium">
                <X className="w-4 h-4 text-rose-500 shrink-0" />
                <span className="hidden sm:inline">{row.bad}</span>
              </div>
              <div className="text-center text-emerald-600 dark:text-emerald-400 font-black flex items-center justify-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 stroke-[3]" />
                <span>{row.good}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. INTERACTIVE FAQ SECTION ── */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-sky-400 mb-2 block font-mono">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-4">
            Everything You Need to Know
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Have questions about Syllabus 3D? We have straightforward answers.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, i) => {
            const isOpen = activeFaqIndex === i;
            return (
              <div
                key={i}
                className="rounded-2xl border border-slate-200/90 dark:border-white/10 bg-white dark:bg-[#121422] overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setActiveFaqIndex(isOpen ? null : i);
                  }}
                  className="w-full px-6 py-4 sm:py-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 dark:text-white cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-300 text-slate-400 ${isOpen ? 'rotate-180 text-blue-600 dark:text-sky-400' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-white/5 pt-3.5 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 9. HIGH-CONVERSION BOTTOM CALL TO ACTION ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl p-8 sm:p-14 lg:p-16 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white text-center shadow-2xl overflow-hidden">
          
          {/* Ambient Lighting Circles */}
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-black/25 blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="inline-block px-3.5 py-1 rounded-full bg-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              ⚡ Instant Setup in Under 30 Seconds
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Ready to Conquer Your Exam with Absolute Confidence?
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Join thousands of serious aspirants who have eliminated study chaos, automated their revision schedules, and boosted their mock scores with Syllabus 3D.
            </p>
            
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => handleCtaClick('signup')}
                className="w-full sm:w-auto h-14 px-9 rounded-2xl bg-white text-blue-700 hover:bg-blue-50 font-black text-sm uppercase tracking-wider shadow-2xl hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Launch App Free Now</span>
                <ArrowRight className="w-4 h-4 text-blue-700 stroke-[3]" />
              </button>
              
              <button
                type="button"
                onClick={() => handleCtaClick('login')}
                className="w-full sm:w-auto h-14 px-7 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/25 backdrop-blur-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>Sign In to Account</span>
              </button>
            </div>
            
            <div className="text-xs text-blue-200/90 font-medium pt-2">
              No credit card required • Works 100% Offline • Instant access
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. MODERN FOOTER ── */}
      <footer className="border-t border-slate-200/90 dark:border-white/10 bg-white dark:bg-[#05070D] py-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 dark:text-slate-400 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center shrink-0">
              <img src="/logo.png" alt="Syllabus 3D" className="w-full h-full object-contain drop-shadow-sm" />
            </div>
            <div>
              <span className="font-black text-slate-900 dark:text-white text-sm">Syllabus 3D</span>
              <span className="ml-2 text-[10px] text-slate-400 font-mono">v3.0 • The Exam Operating System</span>
            </div>
          </div>

          {/* Footer Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 font-bold">
            <a href="#features" className="hover:text-blue-600 dark:hover:text-white transition-colors">All Features</a>
            <a href="#spaced-repetition" className="hover:text-blue-600 dark:hover:text-white transition-colors">Spaced Repetition</a>
            <a href="#study-suite" className="hover:text-blue-600 dark:hover:text-white transition-colors">PDF & Notes Suite</a>
            <a href="#workflow" className="hover:text-blue-600 dark:hover:text-white transition-colors">Daily Routine</a>
            <a href="#comparison" className="hover:text-blue-600 dark:hover:text-white transition-colors">Comparison</a>
            <a href="#faq" className="hover:text-blue-600 dark:hover:text-white transition-colors">FAQ</a>
            <button
              type="button"
              onClick={() => handleCtaClick('login')}
              className="hover:text-blue-600 dark:hover:text-white transition-colors cursor-pointer"
            >
              Sign In
            </button>
          </div>

          {/* Copyright & Keyboard Shortcut Tip */}
          <div className="text-center md:text-right text-[11px]">
            <div>© {new Date().getFullYear()} Syllabus 3D. Engineered for serious competitive exam aspirants.</div>
            <div className="text-slate-400 mt-1">
              Press <span className="font-mono bg-slate-100 dark:bg-white/10 px-1.5 py-0.5 rounded text-[10px] font-bold">?</span> anywhere inside the app for keyboard shortcuts.
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};
