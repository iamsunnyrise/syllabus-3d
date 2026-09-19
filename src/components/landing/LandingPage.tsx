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
  Lock
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { soundManager } from '../../utils/soundEffects';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onGetStarted,
  onLogin
}) => {
  const { isDark, toggleTheme } = useTheme();
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);

  const handleCtaClick = (type: 'signup' | 'login') => {
    soundManager.playClick();
    if (type === 'signup') {
      onGetStarted();
    } else {
      onLogin();
    }
  };

  const faqs = [
    {
      q: 'Is Syllabus 3D completely free to use?',
      a: 'Yes! Syllabus 3D is 100% free for individual learners and competitive exam aspirants. All core features including syllabus tracking, scientific spaced repetition, in-app PDF reader with night mode, and the MS Word-grade document notes studio are fully accessible.'
    },
    {
      q: 'Does it work offline without an active internet connection?',
      a: 'Absolutely. Syllabus 3D is engineered as an offline-first Progressive Web App (PWA). Your syllabus progress, notes, attachments, and revision schedules are cached locally on your device and auto-heal automatically.'
    },
    {
      q: 'How does the Spaced Repetition engine work?',
      a: 'It uses an intelligent adaptation of the Ebbinghaus forgetting curve with 4 distinct mastery stages (Stage 1: 1 day, Stage 2: 4 days, Stage 3: 9 days, Stage 4: 27 days). Whenever you study a topic, it automatically schedules your future revisions and queues them on the exact day knowledge decay begins.'
    },
    {
      q: 'What is the Eye-Care PDF Night Mode?',
      a: 'Standard PDF readers invert colors into blinding neon blues and purples. Syllabus 3D uses a calibrated GPU shader with hue-rotation so that dark backgrounds are soothing charcoal (#18181D) or OLED pure black, while questions, answers, and colored diagrams retain their natural red, green, and blue colors without eye strain.'
    },
    {
      q: 'Can I import notes and syllabuses for any exam?',
      a: 'Yes! You can choose from pre-loaded major competitive exams (UPSC, GATE, JEE, NEET, SSC) or create completely custom subjects and chapters. You can also paste notes from Gemini, ChatGPT, or Claude and use the one-click Notion AI Studio normalizer.'
    },
    {
      q: 'Can I install Syllabus 3D on my mobile, tablet, or desktop?',
      a: 'Yes! Syllabus 3D is responsive and installable as a native standalone app across Windows, macOS, Android, iPhone, and iPad with zero app store downloads required.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0D14] text-[#0F172A] dark:text-[#F1F5F9] font-sans selection:bg-blue-600/30 selection:text-blue-200 overflow-x-hidden transition-colors duration-300">
      {/* BACKGROUND ATMOSPHERIC GLOWS */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-blue-600/15 via-indigo-600/10 to-transparent rounded-full blur-[140px]" />
        <div className="absolute top-[35%] -left-64 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[160px]" />
        <div className="absolute top-[65%] -right-64 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[160px]" />
      </div>

      {/* 1. STICKY GLASSMORPHIC NAVBAR */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-white/[0.08] bg-white/80 dark:bg-[#0B0D14]/80 backdrop-blur-xl transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative w-9 h-9 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <img src="/logo.png" alt="Syllabus 3D" className="w-full h-full object-contain drop-shadow-md" />
            </div>
            <div>
              <span className="text-base font-black tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-sky-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                Syllabus 3D
              </span>
              <span className="hidden sm:inline-block text-[10px] font-bold text-slate-400 dark:text-slate-500 ml-2 uppercase tracking-widest">
                Mastery Engine
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <a href="#features" className="hover:text-blue-600 dark:hover:text-sky-400 transition-colors">Features</a>
            <a href="#spaced-repetition" className="hover:text-blue-600 dark:hover:text-sky-400 transition-colors">Spaced Repetition</a>
            <a href="#study-suite" className="hover:text-blue-600 dark:hover:text-sky-400 transition-colors">PDF & Notes Suite</a>
            <a href="#comparison" className="hover:text-blue-600 dark:hover:text-sky-400 transition-colors">Why Syllabus 3D</a>
            <a href="#faq" className="hover:text-blue-600 dark:hover:text-sky-400 transition-colors">FAQ</a>
          </nav>

          {/* Header Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                toggleTheme();
              }}
              className="p-2 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white transition-all cursor-pointer"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Sign In Button */}
            <button
              type="button"
              onClick={() => handleCtaClick('login')}
              className="hidden sm:inline-flex px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-all cursor-pointer"
            >
              Sign In
            </button>

            {/* Launch App / Get Started CTA */}
            <button
              type="button"
              onClick={() => handleCtaClick('signup')}
              className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Launch App</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative z-10 pt-12 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Top Product Announcement Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-500/15 border border-blue-500/30 text-blue-700 dark:text-blue-300 text-xs font-bold mb-6 shadow-sm animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
          <span>The Next-Generation Exam Operating System</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-600 text-white font-mono uppercase tracking-widest">
            Free & Offline
          </span>
        </div>

        {/* Main Hero Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-[1.12] mb-6">
          Master Your Entire Syllabus. <br />
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-[#38BDF8] dark:via-[#818CF8] dark:to-[#C084FC] bg-clip-text text-transparent">
            Retain Every Single Concept
          </span>{' '}
          on Exam Day.
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
          Syllabus 3D transforms overwhelming study loads into a precision-engineered daily mastery routine.
          Visual 3D progress tracking, science-backed Spaced Repetition, in-app PDF annotations with Eye-Care Night Mode, and MS Word-grade structured notes.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto mb-12">
          <button
            type="button"
            onClick={() => handleCtaClick('signup')}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Start Tracking Free</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleCtaClick('login')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white dark:bg-white/[0.08] hover:bg-slate-50 dark:hover:bg-white/15 text-slate-800 dark:text-white font-bold text-sm border border-slate-200 dark:border-white/15 shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Lock className="w-4 h-4 text-blue-500" />
            <span>Login to Existing Account</span>
          </button>
        </div>

        {/* Trust Badges Bar */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-semibold text-slate-500 dark:text-slate-400 max-w-3xl mx-auto mb-16 pt-4 border-t border-slate-200/80 dark:border-white/10">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>100% Free Forever</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-500" />
            <span>Works 100% Offline (PWA)</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span>Science-Backed Spaced Repetition</span>
          </div>
          <div className="flex items-center gap-2">
            <Moon className="w-4 h-4 text-amber-500" />
            <span>Eye-Care Night Mode PDFs</span>
          </div>
        </div>

        {/* 3D INTERACTIVE HERO MOCKUP CANVAS */}
        <div className="relative max-w-5xl mx-auto rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-slate-200/80 via-slate-100 to-transparent dark:from-white/15 dark:via-white/5 dark:to-transparent shadow-2xl border border-slate-200 dark:border-white/15">
          <div className="relative rounded-2xl overflow-hidden bg-[#0F111A] border border-slate-800 shadow-2xl">
            {/* Window Top Controls */}
            <div className="px-4 py-2.5 bg-[#161824] border-b border-white/10 flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-[11px] font-mono text-slate-400 ml-2 font-bold">
                  Syllabus 3D • Daily Mastery Dashboard
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                <span>● Live Pacing: On Track</span>
              </div>
            </div>

            {/* Showcase Visual Content */}
            <div className="relative aspect-[16/9] w-full bg-[#0A0C14] overflow-hidden flex items-center justify-center">
              <img
                src="/dashboard-hero.png"
                alt="Syllabus 3D Dashboard Preview"
                className="w-full h-full object-cover object-top opacity-95 hover:scale-[1.01] transition-transform duration-700"
              />

              {/* Floating Pill Highlights over Preview */}
              <div className="absolute bottom-6 left-6 hidden sm:flex items-center gap-3 p-3 rounded-2xl bg-[#131522]/90 backdrop-blur-md border border-white/15 shadow-xl text-left">
                <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                  <RotateCw className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Stage 3 Revision Due Today</div>
                  <div className="text-[11px] text-slate-400 font-mono">Modern Indian History • 14 Topics</div>
                </div>
              </div>

              <div className="absolute top-6 right-6 hidden sm:flex items-center gap-3 p-3 rounded-2xl bg-[#131522]/90 backdrop-blur-md border border-white/15 shadow-xl text-left">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">68.4% Syllabus Completed</div>
                  <div className="text-[11px] text-slate-400 font-mono">+12 Topics this week</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BENTO GRID FEATURES SECTION */}
      <section id="features" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-sky-400 mb-2 block font-mono">
            ENGINEERED FOR ASPIRANTS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Everything You Need to Conquer Any Competitive Exam
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Say goodbye to scattered notes, forgotten revisions, and unpredictable pacing. Syllabus 3D unifies your entire preparation lifecycle into one seamless platform.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: 3D Syllabus Explorer (Large 2-column) */}
          <div className="md:col-span-2 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#121422] border border-slate-200/80 dark:border-white/10 shadow-lg relative overflow-hidden group hover:border-blue-500/40 transition-all">
            <div className="relative z-10 max-w-md">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-sky-400 flex items-center justify-center mb-5 shadow-sm">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight mb-3">
                Visual 3D Syllabus Architecture
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Break down immense syllabuses into structured subjects, chapters, and granular subtopics. Track completion with 3D depth indicators, mastery percentages, and dynamic progress rings.
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-semibold">
                <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-white/5 border border-blue-200 dark:border-white/10 text-blue-700 dark:text-blue-300">
                  Micro-Subtopic Granularity
                </span>
                <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-white/5 border border-indigo-200 dark:border-white/10 text-indigo-700 dark:text-indigo-300">
                  Subject Weightage Filters
                </span>
                <span className="px-3 py-1 rounded-full bg-purple-50 dark:bg-white/5 border border-purple-200 dark:border-white/10 text-purple-700 dark:text-purple-300">
                  Bulk Subtopics Importer
                </span>
              </div>
            </div>
            <div className="mt-6 md:mt-0 md:absolute -right-8 bottom-0 w-full md:w-80 h-48 md:h-64 rounded-2xl overflow-hidden opacity-90 group-hover:scale-105 transition-transform duration-500">
              <img src="/syllabus_explorer_banner.png" alt="Syllabus Architecture" className="w-full h-full object-cover object-left-top rounded-2xl shadow-xl" />
            </div>
          </div>

          {/* Card 2: Scientific Spaced Repetition */}
          <div id="spaced-repetition" className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#121422] border border-slate-200/80 dark:border-white/10 shadow-lg relative overflow-hidden group hover:border-purple-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-5 shadow-sm">
              <RotateCw className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black tracking-tight mb-3">
              Spaced Repetition Engine
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Never forget what you read. Built-in SuperMemo / Ebbinghaus intervals (1d, 4d, 9d, 27d) queue topics right before memory decay sets in.
            </p>
            <div className="space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                <span className="font-bold text-emerald-600 dark:text-emerald-400">Stage 1 (Day 1)</span>
                <span className="text-slate-400">Fresh Recall</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                <span className="font-bold text-blue-600 dark:text-blue-400">Stage 2 (Day 4)</span>
                <span className="text-slate-400">Consolidation</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                <span className="font-bold text-purple-600 dark:text-purple-400">Stage 3 & 4 (Day 9/27)</span>
                <span className="text-slate-400">Long-Term Storage</span>
              </div>
            </div>
          </div>

          {/* Card 3: Eye-Care PDF Study Suite */}
          <div id="study-suite" className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#121422] border border-slate-200/80 dark:border-white/10 shadow-lg relative overflow-hidden group hover:border-amber-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-5 shadow-sm">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black tracking-tight mb-3">
              In-App PDF & Eye-Care Themes
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Zero eye-burn during night study. Read any PDF in soft dark mode, OLED black, or warm Kindle sepia with hue preservation, box area & freehand highlighting, and sticky notes.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-300">
              <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30">🌙 Night Mode</span>
              <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30">🌌 OLED Black</span>
              <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30">📜 Sepia</span>
            </div>
          </div>

          {/* Card 4: MS Word-Grade Document Studio (Large 2-column) */}
          <div className="md:col-span-2 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#121422] border border-slate-200/80 dark:border-white/10 shadow-lg relative overflow-hidden group hover:border-blue-500/40 transition-all">
            <div className="relative z-10 max-w-lg">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-5 shadow-sm">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight mb-3">
                MS Word-Grade Document Notes Studio
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Take high-yield notes inside an intuitive Office Ribbon environment with realistic A4 document paper canvas, LaTeX math rendering, YouTube lecture timestamp sync, table repairs, and Notion AI Studio normalizer.
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Office Ribbon Bar Tabs</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>LaTeX Math Formulas</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Voice Dictation (Speech-to-Text)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>One-Click Clean PDF Export</span>
                </div>
              </div>
            </div>
            <div className="mt-6 md:mt-0 md:absolute -right-10 bottom-0 w-full md:w-80 h-48 md:h-64 rounded-2xl overflow-hidden opacity-90 group-hover:scale-105 transition-transform duration-500">
              <img src="/study_hub_banner.png" alt="Study Hub Notes Studio" className="w-full h-full object-cover object-left-top rounded-2xl shadow-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS (3-STEP MASTERY WORKFLOW) */}
      <section className="py-20 bg-slate-100/60 dark:bg-[#0E101B]/60 border-y border-slate-200/80 dark:border-white/10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-2 block font-mono">
              THE 3-STEP FORMULA
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
              How Top Rankers Use Syllabus 3D
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Transform random, disorganized studying into a streamlined daily habit that guarantees results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="p-8 rounded-3xl bg-white dark:bg-[#141624] border border-slate-200 dark:border-white/10 shadow-lg relative text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white font-black text-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
                1
              </div>
              <h3 className="text-lg font-bold mb-2">Architect Your Syllabus</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Choose your target exam or input custom subjects. The engine automatically maps weightage, pacing requirements, and days remaining.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-3xl bg-white dark:bg-[#141624] border border-slate-200 dark:border-white/10 shadow-lg relative text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white font-black text-xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/30">
                2
              </div>
              <h3 className="text-lg font-bold mb-2">Deep Work & Notes</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Split-screen reading alongside question banks and lectures. Create high-yield formula cards, bookmark traps, and take structured notes.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-3xl bg-white dark:bg-[#141624] border border-slate-200 dark:border-white/10 shadow-lg relative text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-purple-600 text-white font-black text-xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/30">
                3
              </div>
              <h3 className="text-lg font-bold mb-2">Automated Revision Mastery</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Log in each morning to see your precision revision queue. Complete Stages 1 through 4 to ensure zero concept fading before exam day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. COMPARISON SECTION */}
      <section id="comparison" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-2 block font-mono">
            UNMATCHED EFFICIENCY
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Traditional Prep vs Syllabus 3D
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Why spreadsheets, wall charts, and loose PDF notes hold aspirants back.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 shadow-xl bg-white dark:bg-[#121422]">
          <div className="grid grid-cols-3 bg-slate-100 dark:bg-white/5 p-4 border-b border-slate-200 dark:border-white/10 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
            <div>Feature</div>
            <div className="text-center">Spreadsheets / Notebooks</div>
            <div className="text-center text-blue-600 dark:text-sky-400 font-black">Syllabus 3D</div>
          </div>

          {[
            { feature: 'Granular Subtopic Tracking', bad: 'Tedious manual rows', good: 'Visual 3D cards & auto-progress' },
            { feature: 'Spaced Repetition (Ebbinghaus)', bad: 'Forgotten / No reminders', good: 'Automated 4-Stage queue' },
            { feature: 'PDF Night Mode & Eye Care', bad: 'Harsh white glare', good: 'Hue-preserved charcoal & OLED' },
            { feature: 'Notes & Formula Formatting', bad: 'Unorganized files', good: 'MS Word-grade studio + LaTeX' },
            { feature: 'Video Timestamps Sync', bad: 'Lost bookmarks', good: 'In-app 1-click video jump' },
            { feature: 'Offline Support (PWA)', bad: 'Needs desktop / cloud sync', good: '100% Offline & Auto-Heal' },
            { feature: 'Exam Trap & Mistake Log', bad: 'Lost in rough copies', good: 'Dedicated active trap ledger' }
          ].map((row, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-3 p-4 text-xs sm:text-sm items-center border-b border-slate-200/60 dark:border-white/5 last:border-0 ${
                idx % 2 === 0 ? 'bg-transparent' : 'bg-slate-50/50 dark:bg-white/[0.02]'
              }`}
            >
              <div className="font-semibold text-slate-800 dark:text-slate-200">{row.feature}</div>
              <div className="text-center text-rose-500/80 flex items-center justify-center gap-1.5 font-medium">
                <X className="w-4 h-4 text-rose-500 shrink-0" />
                <span className="hidden sm:inline">{row.bad}</span>
              </div>
              <div className="text-center text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 stroke-[3]" />
                <span>{row.good}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. INTERACTIVE FAQ SECTION */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-sky-400 mb-2 block font-mono">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Everything You Need to Know
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Have questions about Syllabus 3D? We have answers.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = activeFaqIndex === i;
            return (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#121422] overflow-hidden transition-all shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setActiveFaqIndex(isOpen ? null : i);
                  }}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 dark:text-white cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform text-slate-400 ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-6 pb-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-white/5 pt-3 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. HIGH-CONVERSION BOTTOM CTA BANNER */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl p-8 sm:p-14 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white text-center shadow-2xl overflow-hidden">
          {/* Ambient circles */}
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-black/20 blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              ⚡ Get Started in Under 30 Seconds
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Ready to Master Your Syllabus and Clear Your Exam?
            </h2>
            <p className="text-sm sm:text-base text-blue-100 max-w-xl mx-auto leading-relaxed">
              Join thousands of serious aspirants who have eliminated study chaos and automated their revision schedules with Syllabus 3D.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                type="button"
                onClick={() => handleCtaClick('signup')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-blue-700 hover:bg-blue-50 font-black text-sm uppercase tracking-wider shadow-xl hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Launch App Free Now</span>
                <ArrowRight className="w-4 h-4 text-blue-700" />
              </button>
              <button
                type="button"
                onClick={() => handleCtaClick('login')}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 backdrop-blur-md active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Sign In to Account</span>
              </button>
            </div>
            <div className="text-[11px] text-blue-200 font-medium">
              No credit card required • Offline supported • Instant access
            </div>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#07090F] py-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 dark:text-slate-400 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center shrink-0">
              <img src="/logo.png" alt="Syllabus 3D" className="w-full h-full object-contain drop-shadow-sm" />
            </div>
            <div>
              <span className="font-bold text-slate-900 dark:text-white">Syllabus 3D</span>
              <span className="ml-2 text-[10px] text-slate-400">Syllabus Mastery & Revision Engine</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <a href="#features" className="hover:text-blue-600 dark:hover:text-white transition-colors">Features</a>
            <a href="#spaced-repetition" className="hover:text-blue-600 dark:hover:text-white transition-colors">Spaced Repetition</a>
            <a href="#study-suite" className="hover:text-blue-600 dark:hover:text-white transition-colors">PDF & Notes</a>
            <a href="#faq" className="hover:text-blue-600 dark:hover:text-white transition-colors">FAQ</a>
            <button
              type="button"
              onClick={() => handleCtaClick('login')}
              className="hover:text-blue-600 dark:hover:text-white transition-colors font-bold cursor-pointer"
            >
              Sign In
            </button>
          </div>

          <div className="text-center md:text-right text-[11px]">
            <div>© {new Date().getFullYear()} Syllabus 3D. Crafted for competitive aspirants.</div>
            <div className="text-slate-400 mt-0.5">Press <span className="font-mono bg-slate-100 dark:bg-white/10 px-1 py-0.5 rounded">?</span> anywhere inside the app for keyboard shortcuts.</div>
          </div>
        </div>
      </footer>
    </div>
  );
};
