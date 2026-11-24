import React, { useState, useMemo } from 'react';
import {
  Play,
  Timer,
  CalendarDays,
  CalendarClock,
  Sparkles
} from 'lucide-react';
import { soundManager } from '../../utils/soundEffects';
import { haptics } from '../../utils/haptics';
import { AppView } from '../layout/Sidebar';
import { ExamDateModal } from '../modals/ExamDateModal';
import { ContinueStudyModal } from '../modals/ContinueStudyModal';
import { useTimer } from '../../context/TimerContext';
import { useSyllabus } from '../../context/SyllabusContext';
import { useTheme } from '../../context/ThemeContext';
import { Topic } from '../../types/syllabus';

interface PunditsHeroBannerProps {
  onNavigate: (view: AppView) => void;
  onOpenPricing?: () => void;
  examName?: string;
  onOpenExamDate?: () => void;
  onOpenFocus?: () => void;
  onOpenTopicDrawer?: (topic: Topic, subjectName: string, chapterName: string) => void;
}

// 🙏 Elegant Namaste / Pranam (Folded Hands) Vector Icon
const NamasteIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg
    viewBox="0 0 36 36"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Right Wrist / Sleeve Accent */}
    <path fill="#D97706" d="M30 22c-3 0-6.688 7.094-7 10-.421 3.915 2 4 2 4h11V26s-3.438-4-6-4z" />
    <ellipse transform="rotate(-60 27.574 28.49)" fill="#B45309" cx="27.574" cy="28.489" rx="5.848" ry="1.638" />
    {/* Right Hand Palm & Fingers */}
    <path fill="#F59E0B" d="M20.086 0c1.181 0 2.138.957 2.138 2.138 0 .789.668 10.824.668 10.824L17.948 18V2.138C17.948.957 18.905 0 20.086 0z" />
    <path fill="#FDE68A" d="M18.875 4.323c0-1.099.852-1.989 1.903-1.989 1.051 0 1.903.891 1.903 1.989 0 0 .535 5.942 1.192 9.37.878 1.866 1.369 4.682 1.261 6.248.054.398 5.625 5.006 5.625 5.006-.281 1.813-2.259 6.155-4.759 8.159l-3.521-2.924c-2.885-.404-4.458-3.331-4.458-4.264 0-2.984.854-21.595.854-21.595z" />
    {/* Left Wrist / Sleeve Accent */}
    <path fill="#D97706" d="M6 22c3 0 6.688 7.094 7 10 .421 3.915-2 4-2 4H0V26s3.438-4 6-4z" />
    <ellipse transform="rotate(-30 8.424 28.489)" fill="#B45309" cx="8.426" cy="28.489" rx="1.638" ry="5.848" />
    {/* Left Hand Palm & Fingers */}
    <path fill="#F59E0B" d="M16.061.011c-1.266-.127-2.333.864-2.333 2.103 0 .78-.184 10.319-.184 10.319L17.895 18l.062-15.765c0-1.106-.795-2.114-1.896-2.224z" />
    <path fill="#FDE68A" d="M17.125 4.323c0-1.099-.852-1.989-1.903-1.989-1.051 0-1.903.891-1.903 1.989 0 0-.535 5.942-1.192 9.37-.878 1.866-1.369 4.682-1.261 6.248-.054.398-5.625 5.006-5.625 5.006C5.522 26.76 7.5 31.102 10 33.106l3.521-2.924c2.885-.404 4.458-3.331 4.458-4.264 0-2.984-.854-21.595-.854-21.595z" />
    {/* Center Crease Dividing Line */}
    <path fill="#B45309" d="M17.958 25.823c-.414 0-.75-.336-.75-.75V2.792c0-.414.336-.75.75-.75s.75.336.75.75v22.282c.001.413-.335.749-.75.749z" />
  </svg>
);

export const PunditsHeroBanner: React.FC<PunditsHeroBannerProps> = ({
  onNavigate,
  onOpenPricing: _onOpenPricing,
  examName = 'SSC CGL',
  onOpenExamDate,
  onOpenFocus,
  onOpenTopicDrawer
}) => {
  const { openFullModal } = useTimer();
  const { currentExam } = useSyllabus();
  const { theme, isDark } = useTheme();
  const isWarmCream = theme === 'warm-cream';
  const isLight = theme === 'light' || (!isDark && !isWarmCream);
  const [isExamDateModalOpen, setIsExamDateModalOpen] = useState(false);
  const [isContinueStudyModalOpen, setIsContinueStudyModalOpen] = useState(false);

  // Active topic for dynamic subtitle
  const activeTopic = useMemo(() => {
    if (!currentExam?.subjects) return null;
    let weakOrDue: { topic: Topic; subjectName: string; chapterName: string } | null = null;
    let inProgress: { topic: Topic; subjectName: string; chapterName: string } | null = null;
    let notStarted: { topic: Topic; subjectName: string; chapterName: string } | null = null;

    for (const subject of currentExam.subjects || []) {
      for (const chapter of subject.chapters || []) {
        for (const topic of chapter.topics || []) {
          if (!weakOrDue && (topic.status === 'weak' || topic.isWeak || topic.status === 'revision_due')) {
            weakOrDue = { topic, subjectName: subject.name, chapterName: chapter.name };
          } else if (!inProgress && topic.status === 'in_progress') {
            inProgress = { topic, subjectName: subject.name, chapterName: chapter.name };
          } else if (!notStarted && topic.status === 'not_started') {
            notStarted = { topic, subjectName: subject.name, chapterName: chapter.name };
          }
        }
      }
    }
    return weakOrDue || inProgress || notStarted || null;
  }, [currentExam]);

  return (
    <div className={`relative w-full rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden select-none transition-all duration-300 ${
      isWarmCream
        ? 'bg-gradient-to-b from-[#241E06] via-[#1B1604] to-[#100D02] text-[#F8FAFC] border border-[#E1A837]/35 shadow-[0_20px_50px_rgba(56,55,13,0.22)]'
        : isLight
        ? 'bg-gradient-to-b from-white via-[#F8FAFC] to-[#EEF4FF] text-slate-800 border border-slate-200/90 shadow-[0_16px_40px_-10px_rgba(15,23,42,0.08),0_2px_8px_rgba(0,0,0,0.03)]'
        : 'bg-gradient-to-b from-[#12162A] via-[#0D101E] to-[#080A16] text-[#F8FAFC] border border-white/10 dark:border-white/[0.08] dark:shadow-[0_20px_50px_rgba(0,0,0,0.7)]'
    }`}>
      {/* 🌟 Atmospheric Golden Background Lighting */}
      <div className={`absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full blur-[90px] pointer-events-none ${
        isWarmCream
          ? 'bg-gradient-to-b from-amber-400/25 via-[#E1A837]/10 to-transparent'
          : isLight
          ? 'bg-gradient-to-b from-amber-400/20 via-sky-400/10 to-transparent'
          : 'bg-gradient-to-b from-amber-400/15 via-blue-500/5 to-transparent'
      }`} />
      <div className={`absolute -bottom-16 -left-10 w-48 h-48 rounded-full blur-[70px] pointer-events-none ${
        isWarmCream ? 'bg-[#E1A837]/15' : isLight ? 'bg-sky-400/15' : 'bg-blue-500/10'
      }`} />
      <div className={`absolute -bottom-16 -right-10 w-48 h-48 rounded-full blur-[70px] pointer-events-none ${
        isWarmCream ? 'bg-[#8D7A02]/20' : isLight ? 'bg-indigo-400/15' : 'bg-indigo-500/10'
      }`} />

      {/* Modern Radial Dot Matrix Accent */}
      <div className={`absolute inset-0 pointer-events-none ${
        isWarmCream
          ? 'opacity-35 bg-[radial-gradient(rgba(225,168,55,0.25)_1px,transparent_1px)] [background-size:24px_24px]'
          : isLight
          ? 'opacity-35 bg-[radial-gradient(rgba(15,23,42,0.07)_1px,transparent_1px)] [background-size:24px_24px]'
          : 'opacity-30 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:24px_24px]'
      }`} />

      {/* Main Banner Content Area */}
      <div className="relative z-10 px-4 sm:px-6 pt-5 sm:pt-6 pb-4 sm:pb-5 flex flex-col items-center justify-center">
        
        {/* Center: Brand Typography & 4 Feature Pillars */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto w-full">
          
          {/* Top Badge: "WELCOME TO" */}
          <div className="flex items-center justify-center mb-1.5 sm:mb-2">
            <div className={`inline-flex items-center gap-1.5 px-3.5 py-1 sm:px-4 sm:py-1 rounded-full backdrop-blur-md group cursor-default ${
              isLight
                ? 'bg-amber-500/15 border border-amber-500/35 shadow-[0_2px_10px_rgba(245,158,11,0.15)]'
                : 'bg-amber-500/15 border border-amber-400/30 shadow-[0_0_18px_rgba(245,158,11,0.2)]'
            }`}>
              <NamasteIcon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 animate-pulse-slow ${
                isLight ? 'text-amber-600 drop-shadow-[0_0_4px_rgba(245,158,11,0.3)]' : 'drop-shadow-[0_0_6px_rgba(245,158,11,0.4)]'
              }`} />
              <span className={`text-[10.5px] sm:text-xs font-black tracking-[0.22em] uppercase font-sans ${
                isLight ? 'text-amber-800' : 'text-amber-300'
              }`}>
                WELCOME TO
              </span>
            </div>
          </div>

          {/* Main Title: Compact Bold Sans Typography with Platinum & 3D Gold Sheen */}
          <div className="relative my-2 sm:my-2.5 flex items-center justify-center">
            {/* Ambient Breathing Background Glow Disc behind Title */}
            <div className="absolute -inset-x-10 -inset-y-5 bg-gradient-to-r from-blue-500/0 via-amber-400/15 to-orange-500/15 rounded-full blur-2xl pointer-events-none animate-pulse-slow opacity-80" />

            <h1 className="relative font-sans font-black tracking-tight text-4xl sm:text-5xl md:text-6xl leading-none select-none flex items-center justify-center gap-3 sm:gap-4 flex-wrap group cursor-default transition-transform duration-300 hover:scale-[1.02]">
              {/* "SYLLABUS" */}
              <span className={`relative ${
                isLight
                  ? 'bg-gradient-to-r from-slate-950 via-slate-800 to-indigo-950 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(15,23,42,0.12)]'
                  : 'animate-syllabus-shimmer drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]'
              }`}>
                SYLLABUS
              </span>

              {/* "3D" with Floating Levitation + Liquid Gold Gradient + Radiant Holographic Glow + Specular Glint */}
              <span className="relative inline-flex items-center animate-float-3d">
                <span className="relative inline-block animate-gold-flow animate-pulse-glow-3d font-black">
                  3D
                </span>

                {/* Specular Glint Twinkle Star at the Apex of 3D */}
                <span className="absolute -top-1.5 -right-3 sm:-top-2 sm:-right-3.5 pointer-events-none select-none animate-glint-twinkle">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-200 fill-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.95)]" />
                </span>
              </span>
            </h1>
          </div>

          {/* Exam Target Capsule: Clean Modern Segmented Pill */}
          <div className={`mt-1.5 sm:mt-2 inline-flex items-center flex-wrap justify-center gap-1.5 sm:gap-2.5 rounded-full px-3.5 sm:px-4.5 py-1.5 shadow-md backdrop-blur-md text-xs sm:text-[13px] ${
            isWarmCream
              ? 'border border-[#E1A837]/40 bg-[#161304]/95 text-[#F5EBD7]'
              : isLight
              ? 'border border-slate-200/90 bg-white/95 text-slate-700 shadow-sm'
              : 'border border-white/10 dark:border-white/[0.08] bg-[#0C0F1D]/90'
          }`}>
            <span className={`px-2.5 py-0.5 rounded-full font-black ${
              isWarmCream
                ? 'bg-[#E1A837]/25 text-[#FDE68A] border border-[#E1A837]/45'
                : isLight
                ? 'bg-amber-500/15 text-amber-800 border border-amber-500/30'
                : 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
            }`}>
              {examName.split(' ')[0] || 'SSC'}
            </span>
            <span className={`w-1 h-1 rounded-full ${isWarmCream ? 'bg-[#E1A837]/60' : isLight ? 'bg-slate-300' : 'bg-amber-400/50'}`} />
            <span className={`px-1.5 py-0.5 font-bold transition-colors ${isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-200 hover:text-white'}`}>
              BANK
            </span>
            <span className={`w-1 h-1 rounded-full ${isWarmCream ? 'bg-[#E1A837]/60' : isLight ? 'bg-slate-300' : 'bg-amber-400/50'}`} />
            <span className={`px-1.5 py-0.5 font-bold transition-colors ${isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-200 hover:text-white'}`}>
              UPSC
            </span>
            <span className={`w-1 h-1 rounded-full ${isWarmCream ? 'bg-[#E1A837]/60' : isLight ? 'bg-slate-300' : 'bg-amber-400/50'}`} />
            <span className={`px-1.5 py-0.5 font-extrabold tracking-wide ${isWarmCream ? 'text-[#FDE68A]' : isLight ? 'text-amber-700' : 'text-amber-200/90'}`}>
              ANY EXAM
            </span>
          </div>

          {/* 4 Feature Columns inside Banner */}
          <div className="mt-4 sm:mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5 w-full">
            
            {/* 1. Continue Study (Jump Back In) */}
            <div
              onClick={() => {
                soundManager.playClick();
                haptics.selection();
                setIsContinueStudyModalOpen(true);
              }}
              title="Continue Study - Jump Back In"
              className={`p-3 sm:p-4 rounded-2xl transition-all duration-200 cursor-pointer flex flex-col items-center justify-center text-center group active:scale-95 shadow-lg hover:-translate-y-1 ${
                isWarmCream
                  ? 'bg-[#282107]/90 hover:bg-[#362D0A] border border-[#E1A837]/30 hover:border-[#E1A837]/70 shadow-[0_6px_20px_rgba(30,25,5,0.4)] hover:shadow-[0_12px_28px_rgba(225,168,55,0.25)]'
                  : isLight
                  ? 'bg-white/95 hover:bg-white border border-slate-200/90 hover:border-amber-400/70 shadow-[0_4px_16px_rgba(15,23,42,0.05)] hover:shadow-[0_12px_28px_rgba(245,158,11,0.15)]'
                  : 'bg-[#0F1322]/90 hover:bg-[#141A30] border border-white/[0.08] hover:border-amber-400/50 hover:shadow-amber-500/10'
              }`}
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 flex items-center justify-center mb-2.5 shadow-[0_0_18px_rgba(245,158,11,0.35)] group-hover:scale-110 transition-transform">
                <Play className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-current ml-0.5" />
              </div>
              <span className={`text-xs sm:text-sm font-black transition-colors leading-tight ${
                isLight ? 'text-slate-900 group-hover:text-amber-600' : 'text-white group-hover:text-amber-300'
              }`}>
                Continue Study
              </span>
              <span className={`text-[11px] sm:text-xs font-bold truncate max-w-full px-1 mt-1 ${
                isLight ? 'text-amber-700' : 'text-amber-300/90'
              }`}>
                {activeTopic?.topic?.name || 'Resume Study'}
              </span>
            </div>

            {/* 2. Focus Mode & Pomodoro */}
            <div
              onClick={() => {
                soundManager.playClick();
                haptics.selection();
                if (onOpenFocus) {
                  onOpenFocus();
                } else {
                  openFullModal();
                }
              }}
              title="Open Focus Mode & Pomodoro Timer"
              className={`p-3 sm:p-4 rounded-2xl transition-all duration-200 cursor-pointer flex flex-col items-center justify-center text-center group active:scale-95 shadow-lg hover:-translate-y-1 ${
                isWarmCream
                  ? 'bg-[#282107]/90 hover:bg-[#362D0A] border border-[#E1A837]/30 hover:border-sky-400/70 shadow-[0_6px_20px_rgba(30,25,5,0.4)] hover:shadow-[0_12px_28px_rgba(56,189,248,0.22)]'
                  : isLight
                  ? 'bg-white/95 hover:bg-white border border-slate-200/90 hover:border-sky-400/70 shadow-[0_4px_16px_rgba(15,23,42,0.05)] hover:shadow-[0_12px_28px_rgba(14,165,233,0.15)]'
                  : 'bg-[#0F1322]/90 hover:bg-[#141A30] border border-white/[0.08] hover:border-sky-400/50 hover:shadow-sky-500/10'
              }`}
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-sky-400 to-blue-600 text-white flex items-center justify-center mb-2.5 shadow-[0_0_18px_rgba(56,189,248,0.35)] group-hover:scale-110 transition-transform">
                <Timer className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </div>
              <span className={`text-xs sm:text-sm font-black transition-colors leading-tight ${
                isLight ? 'text-slate-900 group-hover:text-sky-600' : 'text-white group-hover:text-sky-300'
              }`}>
                Focus Mode
              </span>
              <span className={`text-[11px] sm:text-xs font-bold mt-1 ${
                isLight ? 'text-sky-600' : 'text-sky-300/90'
              }`}>
                & Pomodoro
              </span>
            </div>

            {/* 3. Daily Schedule & Practice */}
            <div
              onClick={() => {
                soundManager.playClick();
                haptics.selection();
                onNavigate('routine');
              }}
              title="Open Daily Routine & Schedule"
              className={`p-3 sm:p-4 rounded-2xl transition-all duration-200 cursor-pointer flex flex-col items-center justify-center text-center group active:scale-95 shadow-lg hover:-translate-y-1 ${
                isWarmCream
                  ? 'bg-[#282107]/90 hover:bg-[#362D0A] border border-[#E1A837]/30 hover:border-indigo-400/70 shadow-[0_6px_20px_rgba(30,25,5,0.4)] hover:shadow-[0_12px_28px_rgba(99,102,241,0.22)]'
                  : isLight
                  ? 'bg-white/95 hover:bg-white border border-slate-200/90 hover:border-indigo-400/70 shadow-[0_4px_16px_rgba(15,23,42,0.05)] hover:shadow-[0_12px_28px_rgba(99,102,241,0.15)]'
                  : 'bg-[#0F1322]/90 hover:bg-[#141A30] border border-white/[0.08] hover:border-indigo-400/50 hover:shadow-indigo-500/10'
              }`}
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-indigo-400 to-purple-600 text-white flex items-center justify-center mb-2.5 shadow-[0_0_18px_rgba(99,102,241,0.35)] group-hover:scale-110 transition-transform">
                <CalendarDays className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </div>
              <span className={`text-xs sm:text-sm font-black transition-colors leading-tight ${
                isLight ? 'text-slate-900 group-hover:text-indigo-600' : 'text-white group-hover:text-indigo-300'
              }`}>
                Daily Schedule
              </span>
              <span className={`text-[11px] sm:text-xs font-bold mt-1 ${
                isLight ? 'text-indigo-600' : 'text-indigo-300/90'
              }`}>
                & Practice
              </span>
            </div>

            {/* 4. Exam Date & Live Countdown */}
            <div
              onClick={() => {
                soundManager.playClick();
                haptics.selection();
                if (onOpenExamDate) {
                  onOpenExamDate();
                } else {
                  setIsExamDateModalOpen(true);
                }
              }}
              title="Open Exam Date & Live Countdown"
              className={`p-3 sm:p-4 rounded-2xl transition-all duration-200 cursor-pointer flex flex-col items-center justify-center text-center group active:scale-95 shadow-lg hover:-translate-y-1 ${
                isWarmCream
                  ? 'bg-[#282107]/90 hover:bg-[#362D0A] border border-[#E1A837]/30 hover:border-rose-400/70 shadow-[0_6px_20px_rgba(30,25,5,0.4)] hover:shadow-[0_12px_28px_rgba(244,63,94,0.22)]'
                  : isLight
                  ? 'bg-white/95 hover:bg-white border border-slate-200/90 hover:border-rose-400/70 shadow-[0_4px_16px_rgba(15,23,42,0.05)] hover:shadow-[0_12px_28px_rgba(244,63,94,0.15)]'
                  : 'bg-[#0F1322]/90 hover:bg-[#141A30] border border-white/[0.08] hover:border-rose-400/50 hover:shadow-rose-500/10'
              }`}
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-rose-400 to-orange-500 text-white flex items-center justify-center mb-2.5 shadow-[0_0_18px_rgba(244,63,94,0.35)] group-hover:scale-110 transition-transform">
                <CalendarClock className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </div>
              <span className={`text-xs sm:text-sm font-black transition-colors leading-tight ${
                isLight ? 'text-slate-900 group-hover:text-rose-600' : 'text-white group-hover:text-rose-300'
              }`}>
                Exam Date
              </span>
              <span className={`text-[11px] sm:text-xs font-bold mt-1 ${
                isLight ? 'text-rose-600' : 'text-rose-300/90'
              }`}>
                & Countdown
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* 🎯 Exam Date & Countdown Interactive Modal */}
      {isExamDateModalOpen && (
        <ExamDateModal
          isOpen={isExamDateModalOpen}
          onClose={() => setIsExamDateModalOpen(false)}
        />
      )}

      {/* 🎯 Continue Study (Jump Back In) Interactive Modal */}
      {isContinueStudyModalOpen && (
        <ContinueStudyModal
          isOpen={isContinueStudyModalOpen}
          onClose={() => setIsContinueStudyModalOpen(false)}
          onOpenTopicDrawer={onOpenTopicDrawer}
          onOpenFocus={onOpenFocus}
          onNavigate={onNavigate}
        />
      )}

    </div>
  );
};
