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
    <div className="relative w-full rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#121626] via-[#0E111E] to-[#0A0C16] text-[#F8FAFC] border border-amber-400/25 shadow-xl dark:shadow-[0_14px_40px_rgba(0,0,0,0.55)] overflow-hidden select-none">
      {/* 🌟 Atmospheric Golden Background Lighting */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-gradient-to-b from-amber-400/15 via-amber-500/5 to-transparent rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute -bottom-16 -left-10 w-48 h-48 bg-blue-500/10 rounded-full blur-[70px] pointer-events-none" />
      <div className="absolute -bottom-16 -right-10 w-48 h-48 bg-amber-500/10 rounded-full blur-[70px] pointer-events-none" />

      {/* Modern Radial Dot Matrix Accent */}
      <div className="absolute inset-0 pointer-events-none opacity-15 bg-[radial-gradient(#F59E0B_0.75px,transparent_0.75px)] [background-size:24px_24px]" />

      {/* Main Banner Content Area */}
      <div className="relative z-10 px-4 sm:px-6 pt-5 sm:pt-6 pb-4 sm:pb-5 flex flex-col items-center justify-center">
        
        {/* Center: Brand Typography & 4 Feature Pillars */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto w-full">
          
          {/* Top Badge: "WELCOME to" */}
          <div className="flex items-center justify-center mb-1.5 sm:mb-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 sm:px-4 sm:py-1 rounded-full bg-amber-500/15 border border-amber-400/40 shadow-[0_0_16px_rgba(245,158,11,0.2)] backdrop-blur-md group cursor-default">
              <NamasteIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 drop-shadow-[0_0_6px_rgba(245,158,11,0.4)] animate-pulse-slow" />
              <span className="text-[10.5px] sm:text-xs font-black tracking-[0.2em] uppercase text-amber-300 font-sans">
                WELCOME to
              </span>
            </div>
          </div>

          {/* Main Title: Compact Bold Sans Typography with Platinum & 3D Gold Sheen */}
          <div className="relative my-2 sm:my-2.5 flex items-center justify-center">
            {/* Ambient Breathing Background Glow Disc behind Title */}
            <div className="absolute -inset-x-10 -inset-y-5 bg-gradient-to-r from-blue-500/0 via-amber-400/15 to-orange-500/15 rounded-full blur-2xl pointer-events-none animate-pulse-slow opacity-80" />

            <h1 className="relative font-sans font-black tracking-tight text-4xl sm:text-5xl md:text-6xl leading-none select-none flex items-center justify-center gap-3 sm:gap-4 flex-wrap group cursor-default transition-transform duration-300 hover:scale-[1.02]">
              {/* "SYLLABUS" with Liquid Platinum Shimmer Sweep */}
              <span className="relative animate-syllabus-shimmer drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
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
          <div className="mt-1.5 sm:mt-2 inline-flex items-center flex-wrap justify-center gap-1.5 sm:gap-2.5 rounded-full border border-amber-400/35 bg-[#0C0F1D]/90 px-3.5 sm:px-4.5 py-1.5 shadow-md backdrop-blur-md text-xs sm:text-[13px]">
            <span className="px-2.5 py-0.5 rounded-full font-black bg-amber-500/20 text-amber-300 border border-amber-400/30">
              {examName.split(' ')[0] || 'SSC'}
            </span>
            <span className="w-1 h-1 rounded-full bg-amber-400/50" />
            <span className="px-1.5 py-0.5 font-bold text-slate-200 hover:text-white transition-colors">
              BANK
            </span>
            <span className="w-1 h-1 rounded-full bg-amber-400/50" />
            <span className="px-1.5 py-0.5 font-bold text-slate-200 hover:text-white transition-colors">
              UPSC
            </span>
            <span className="w-1 h-1 rounded-full bg-amber-400/50" />
            <span className="px-1.5 py-0.5 font-extrabold text-amber-200/90 tracking-wide">
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
              className="p-3 sm:p-4 rounded-2xl bg-[#141829]/80 hover:bg-[#1A2035] border border-white/10 hover:border-amber-400/60 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center text-center group active:scale-95 shadow-sm hover:shadow-lg hover:shadow-amber-500/10"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center mb-2 shadow-[0_0_16px_rgba(245,158,11,0.35)] group-hover:scale-110 transition-transform">
                <Play className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-current ml-0.5" />
              </div>
              <span className="text-xs sm:text-[13px] font-black text-white group-hover:text-amber-300 transition-colors leading-tight">
                Continue Study
              </span>
              <span className="text-[10.5px] sm:text-[11px] text-amber-300 font-semibold truncate max-w-full px-1 mt-0.5">
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
              className="p-3 sm:p-4 rounded-2xl bg-[#141829]/80 hover:bg-[#1A2035] border border-white/10 hover:border-sky-400/60 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center text-center group active:scale-95 shadow-sm hover:shadow-lg hover:shadow-sky-500/10"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 text-white flex items-center justify-center mb-2 shadow-[0_0_16px_rgba(56,189,248,0.35)] group-hover:scale-110 transition-transform">
                <Timer className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </div>
              <span className="text-xs sm:text-[13px] font-black text-white group-hover:text-sky-300 transition-colors leading-tight">
                Focus Mode
              </span>
              <span className="text-[10.5px] sm:text-[11px] text-sky-300 font-semibold mt-0.5">
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
              className="p-3 sm:p-4 rounded-2xl bg-[#141829]/80 hover:bg-[#1A2035] border border-white/10 hover:border-indigo-400/60 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center text-center group active:scale-95 shadow-sm hover:shadow-lg hover:shadow-indigo-500/10"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-600 text-white flex items-center justify-center mb-2 shadow-[0_0_16px_rgba(99,102,241,0.35)] group-hover:scale-110 transition-transform">
                <CalendarDays className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </div>
              <span className="text-xs sm:text-[13px] font-black text-white group-hover:text-indigo-300 transition-colors leading-tight">
                Daily Schedule
              </span>
              <span className="text-[10.5px] sm:text-[11px] text-indigo-300 font-semibold mt-0.5">
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
              className="p-3 sm:p-4 rounded-2xl bg-[#141829]/80 hover:bg-[#1A2035] border border-white/10 hover:border-rose-400/60 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center text-center group active:scale-95 shadow-sm hover:shadow-lg hover:shadow-rose-500/10"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-rose-400 to-orange-500 text-white flex items-center justify-center mb-2 shadow-[0_0_16px_rgba(244,63,94,0.35)] group-hover:scale-110 transition-transform">
                <CalendarClock className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </div>
              <span className="text-xs sm:text-[13px] font-black text-white group-hover:text-rose-300 transition-colors leading-tight">
                Exam Date
              </span>
              <span className="text-[10.5px] sm:text-[11px] text-rose-300 font-semibold mt-0.5">
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
