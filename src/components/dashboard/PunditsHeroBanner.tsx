import React, { useState, useMemo } from 'react';
import {
  Play,
  Timer,
  CalendarDays,
  CalendarClock
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

export const PunditsHeroBanner: React.FC<PunditsHeroBannerProps> = ({
  onNavigate,
  onOpenPricing,
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
    <div className="relative w-full rounded-3xl bg-gradient-to-br from-[#1A1806] via-[#38370D] to-[#121104] text-[#FAEED9] border border-[#8D7A02]/40 shadow-2xl dark:shadow-[0_12px_45px_rgba(0,0,0,0.65)] overflow-hidden select-none">
      {/* 🌟 Atmospheric Golden Background Lighting */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-b from-[#E1A837]/20 via-[#8D7A02]/10 to-transparent rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-20 left-10 w-72 h-72 bg-[#E1A837]/15 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-72 h-72 bg-[#8D7A02]/20 rounded-full blur-[80px] pointer-events-none" />

      {/* Subtle Golden Geometric Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#E1A837_0.75px,transparent_0.75px)] [background-size:20px_20px]" />

      {/* Main Banner Content Area */}
      <div className="relative z-10 px-4 sm:px-8 pt-7 sm:pt-9 pb-6 sm:pb-7 flex flex-col items-center justify-center">
        
        {/* Center: Brand Typography & 4 Feature Pillars */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto w-full">
          
          {/* Top Badge: "WELCOME to" */}
          <div className="flex items-center justify-center mb-1">
            {/* Antique Bronze Pill with Warm Amber Gold Border */}
            <div className="px-5 sm:px-7 py-1 sm:py-1.5 rounded-full bg-[#8D7A02] border-2 border-[#E1A837] shadow-[0_2px_12px_rgba(141,122,2,0.6)] flex items-center justify-center">
              <span className="font-serif font-black text-[#FAEED9] text-xs sm:text-sm md:text-base tracking-wide select-none">
                WELCOME to
              </span>
            </div>
          </div>

          {/* Main Title: Massive Bold Serif Typography with High Visibility Luxury Colors */}
          <h1 className="relative font-serif font-black tracking-tight text-4xl sm:text-6xl leading-none select-none my-2 sm:my-3 drop-shadow-[0_4px_14px_rgba(0,0,0,0.95)] flex items-center justify-center gap-3 sm:gap-5 flex-wrap">
            <span className="text-[#FAEED9]">SYLLABUS</span>
            <span className="text-[#E1A837]">3D</span>
          </h1>

          {/* Exam Target Capsule: Solid Obsidian Pill with 2px Warm Amber Gold Border & Gold Pipes */}
          <div className="mt-2.5 sm:mt-3.5 inline-flex items-center flex-wrap justify-center rounded-full border-2 border-[#E1A837] bg-[#121104]/90 px-4 sm:px-7 py-1.5 sm:py-2 shadow-xl">
            <span className="text-[#FAEED9] font-serif font-bold text-xs sm:text-sm md:text-base tracking-wider">SSC</span>
            <span className="text-[#E1A837] font-black text-xs sm:text-sm md:text-base mx-2 sm:mx-3">|</span>
            <span className="text-[#FAEED9] font-serif font-bold text-xs sm:text-sm md:text-base tracking-wider">BANK</span>
            <span className="text-[#E1A837] font-black text-xs sm:text-sm md:text-base mx-2 sm:mx-3">|</span>
            <span className="text-[#FAEED9] font-serif font-bold text-xs sm:text-sm md:text-base tracking-wider">UPSC</span>
            <span className="text-[#E1A837] font-black text-xs sm:text-sm md:text-base mx-2 sm:mx-3">|</span>
            <span className="text-[#FAEED9] font-serif font-bold text-xs sm:text-sm md:text-base tracking-wider">ANY EXAM</span>
          </div>

          {/* 4 Feature Columns inside Banner */}
          <div className="mt-5 sm:mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5 w-full">
            
            {/* 1. Continue Study (Jump Back In) */}
            <div
              onClick={() => {
                soundManager.playClick();
                haptics.selection();
                setIsContinueStudyModalOpen(true);
              }}
              title="Continue Study - Jump Back In"
              className="p-2.5 sm:p-3 rounded-xl bg-[#121104]/70 border border-[#8D7A02]/40 hover:border-[#E1A837] transition-all cursor-pointer flex flex-col items-center justify-center text-center group hover:bg-[#E1A837]/15 active:scale-95 shadow-xs"
            >
              <div className="w-7 h-7 rounded-lg bg-[#E1A837]/15 text-[#E1A837] flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-[#FAEED9] leading-tight">
                Continue Study
              </span>
              <span className="text-[10px] text-[#E1A837] font-medium truncate max-w-full px-1">
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
              className="p-2.5 sm:p-3 rounded-xl bg-[#121104]/70 border border-[#8D7A02]/40 hover:border-[#E1A837] transition-all cursor-pointer flex flex-col items-center justify-center text-center group hover:bg-[#E1A837]/15 active:scale-95 shadow-xs"
            >
              <div className="w-7 h-7 rounded-lg bg-[#E1A837]/15 text-[#E1A837] flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                <Timer className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-[#FAEED9] leading-tight">
                Focus Mode
              </span>
              <span className="text-[10px] text-[#E1A837] font-medium">
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
              className="p-2.5 sm:p-3 rounded-xl bg-[#121104]/70 border border-[#8D7A02]/40 hover:border-[#E1A837] transition-all cursor-pointer flex flex-col items-center justify-center text-center group hover:bg-[#E1A837]/15 active:scale-95 shadow-xs"
            >
              <div className="w-7 h-7 rounded-lg bg-[#E1A837]/15 text-[#E1A837] flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                <CalendarDays className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-[#FAEED9] leading-tight">
                Daily Schedule
              </span>
              <span className="text-[10px] text-[#E1A837] font-medium">
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
              className="p-2.5 sm:p-3 rounded-xl bg-[#121104]/70 border border-[#8D7A02]/40 hover:border-[#E1A837] transition-all cursor-pointer flex flex-col items-center justify-center text-center group hover:bg-[#E1A837]/15 active:scale-95 shadow-xs"
            >
              <div className="w-7 h-7 rounded-lg bg-[#E1A837]/15 text-[#E1A837] flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                <CalendarClock className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-[#FAEED9] leading-tight">
                Exam Date
              </span>
              <span className="text-[10px] text-[#E1A837] font-medium">
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
