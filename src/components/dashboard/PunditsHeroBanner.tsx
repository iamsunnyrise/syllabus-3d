import React, { useState } from 'react';
import {
  Tv,
  FileText,
  CalendarDays,
  LineChart
} from 'lucide-react';
import { soundManager } from '../../utils/soundEffects';
import { haptics } from '../../utils/haptics';
import { AppView } from '../layout/Sidebar';

interface PunditsHeroBannerProps {
  onNavigate: (view: AppView) => void;
  onOpenPricing?: () => void;
  examName?: string;
}

export const PunditsHeroBanner: React.FC<PunditsHeroBannerProps> = ({
  onNavigate,
  onOpenPricing,
  examName = 'SSC CGL'
}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div className="relative w-full rounded-3xl bg-[#090A0F] text-white border border-[#F59E0B]/30 shadow-2xl dark:shadow-[0_12px_45px_rgba(0,0,0,0.65)] overflow-hidden select-none">
      {/* 🌟 Atmospheric Golden Background Lighting */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-b from-[#F59E0B]/15 via-transparent to-transparent rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-20 left-10 w-72 h-72 bg-[#D97706]/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-72 h-72 bg-[#B45309]/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Subtle Golden Geometric Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#F59E0B_0.75px,transparent_0.75px)] [background-size:20px_20px]" />

      {/* Main Banner Content Area */}
      <div className="relative z-10 px-4 sm:px-8 pt-7 sm:pt-9 pb-5 flex flex-col items-center justify-center">
        
        {/* Center: Brand Typography & 4 Feature Pillars */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto w-full">
          
          {/* "WELCOME TO" Red Banner Ribbon */}
          <div className="inline-flex items-center justify-center px-4 py-0.5 rounded-full bg-gradient-to-r from-[#DC2626] via-[#B91C1C] to-[#991B1B] text-white text-[11px] sm:text-xs font-serif font-black tracking-wider uppercase border border-[#FCA5A5]/40 shadow-sm mb-2.5">
            WELCOME TO
          </div>

          {/* Luminous High-Visibility 3D Brand Title */}
          <div className="relative my-1">
            {/* Ambient Warm Golden Title Glow */}
            <div className="absolute -inset-x-8 -inset-y-4 bg-gradient-to-r from-amber-500/0 via-amber-400/25 to-amber-500/0 blur-xl pointer-events-none" />
            
            <h1 className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-wider uppercase font-sans text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FEF08A] to-[#F59E0B] drop-shadow-[0_4px_20px_rgba(245,158,11,0.6)]">
              SYLLABUS 3D
            </h1>
          </div>

          {/* Exam Target Badges Capsule */}
          <div className="mt-2.5 inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1 rounded-full border border-[#F59E0B]/50 bg-black/40 backdrop-blur-md text-[11px] sm:text-xs font-bold text-amber-200 tracking-wide font-sans">
            <span>SSC CGL</span>
            <span className="text-amber-500">•</span>
            <span>CHSL</span>
            <span className="text-amber-500">•</span>
            <span>CPO</span>
            <span className="text-amber-500">•</span>
            <span>MTS</span>
            <span className="text-amber-500">•</span>
            <span>RAILWAYS</span>
          </div>

          {/* 4 Feature Columns inside Banner */}
          <div className="mt-5 sm:mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5 w-full">
            
            {/* 1. Weekly FREE Live Mocks */}
            <div
              onClick={() => {
                soundManager.playClick();
                haptics.selection();
                onNavigate('mock-tracker');
              }}
              className="p-2.5 sm:p-3 rounded-xl bg-black/50 border border-[#F59E0B]/30 hover:border-[#F59E0B] transition-all cursor-pointer flex flex-col items-center justify-center text-center group hover:bg-[#F59E0B]/10 active:scale-95 shadow-xs"
            >
              <div className="w-7 h-7 rounded-lg bg-[#F59E0B]/15 text-[#FBBF24] flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                <Tv className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-white leading-tight">
                Weekly FREE
              </span>
              <span className="text-[10px] text-amber-300 font-medium">
                Live Mocks
              </span>
            </div>

            {/* 2. Test Series for SSC */}
            <div
              onClick={() => {
                soundManager.playClick();
                haptics.selection();
                onNavigate('syllabus');
              }}
              className="p-2.5 sm:p-3 rounded-xl bg-black/50 border border-[#F59E0B]/30 hover:border-[#F59E0B] transition-all cursor-pointer flex flex-col items-center justify-center text-center group hover:bg-[#F59E0B]/10 active:scale-95 shadow-xs"
            >
              <div className="w-7 h-7 rounded-lg bg-[#F59E0B]/15 text-[#FBBF24] flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                <FileText className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-white leading-tight">
                Test Series
              </span>
              <span className="text-[10px] text-amber-300 font-medium">
                for SSC Exams
              </span>
            </div>

            {/* 3. Daily Schedule & Practice */}
            <div
              onClick={() => {
                soundManager.playClick();
                haptics.selection();
                onNavigate('planner');
              }}
              className="p-2.5 sm:p-3 rounded-xl bg-black/50 border border-[#F59E0B]/30 hover:border-[#F59E0B] transition-all cursor-pointer flex flex-col items-center justify-center text-center group hover:bg-[#F59E0B]/10 active:scale-95 shadow-xs"
            >
              <div className="w-7 h-7 rounded-lg bg-[#F59E0B]/15 text-[#FBBF24] flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                <CalendarDays className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-white leading-tight">
                Daily Schedule
              </span>
              <span className="text-[10px] text-amber-300 font-medium">
                & Practice
              </span>
            </div>

            {/* 4. Strategy & Guidance */}
            <div
              onClick={() => {
                soundManager.playClick();
                haptics.selection();
                onNavigate('analytics');
              }}
              className="p-2.5 sm:p-3 rounded-xl bg-black/50 border border-[#F59E0B]/30 hover:border-[#F59E0B] transition-all cursor-pointer flex flex-col items-center justify-center text-center group hover:bg-[#F59E0B]/10 active:scale-95 shadow-xs"
            >
              <div className="w-7 h-7 rounded-lg bg-[#F59E0B]/15 text-[#FBBF24] flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                <LineChart className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-white leading-tight">
                Strategy &
              </span>
              <span className="text-[10px] text-amber-300 font-medium">
                Guidance
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* Bottom Carousel Indicator Dots */}
      <div className="relative z-10 flex items-center justify-center gap-1.5 pb-4">
        <button
          type="button"
          onClick={() => setActiveSlide(0)}
          className={`h-1.5 rounded-full transition-all cursor-pointer ${
            activeSlide === 0 ? 'w-5 bg-[#F59E0B]' : 'w-1.5 bg-neutral-600'
          }`}
          aria-label="Slide 1"
        />
        <button
          type="button"
          onClick={() => setActiveSlide(1)}
          className={`h-1.5 rounded-full transition-all cursor-pointer ${
            activeSlide === 1 ? 'w-5 bg-[#F59E0B]' : 'w-1.5 bg-neutral-600'
          }`}
          aria-label="Slide 2"
        />
      </div>

    </div>
  );
};
