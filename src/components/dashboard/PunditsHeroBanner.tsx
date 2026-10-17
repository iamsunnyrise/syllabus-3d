import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Tv,
  FileText,
  CalendarDays,
  LineChart,
  Brain
} from 'lucide-react';
import { BrandEmblemLogo } from '../common/BrandEmblemLogo';
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

      {/* Top Bar inside Banner: View Plans Button */}
      <div className="relative z-10 flex items-center justify-end p-4 sm:p-5 pb-0">
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            haptics.medium();
            if (onOpenPricing) onOpenPricing();
          }}
          className="group inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#E5A800] hover:bg-[#F59E0B] text-black font-extrabold text-xs transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span>View plans</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Main Banner Content Area */}
      <div className="relative z-10 px-4 sm:px-8 py-4 sm:py-6 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
        
        {/* Left Side: Circular Golden Crest Seal */}
        <div className="hidden md:flex flex-col items-center shrink-0">
          <div className="p-1 rounded-full bg-gradient-to-tr from-[#B45309] via-[#F59E0B] to-[#FEF3C7] shadow-xl">
            <BrandEmblemLogo size="xl" />
          </div>
        </div>

        {/* Center: Brand Typography & 4 Feature Pillars */}
        <div className="flex-1 flex flex-col items-center text-center max-w-2xl mx-auto w-full">
          
          {/* "WELCOME to" Red Banner Ribbon */}
          <div className="inline-flex items-center justify-center px-4 py-0.5 rounded-full bg-gradient-to-r from-[#DC2626] via-[#B91C1C] to-[#991B1B] text-white text-[11px] sm:text-xs font-serif font-black tracking-wider uppercase border border-[#FCA5A5]/40 shadow-sm mb-2.5">
            WELCOME to
          </div>

          {/* Huge Golden Brand Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase font-serif text-transparent bg-clip-text bg-gradient-to-b from-[#FFFBEB] via-[#FBBF24] to-[#D97706] drop-shadow-[0_2px_14px_rgba(245,158,11,0.4)]">
            THE PUNDITS
          </h1>

          {/* Exam Target Badges Capsule */}
          <div className="mt-2.5 inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 rounded-full border border-[#F59E0B]/50 bg-black/40 backdrop-blur-md text-[11px] sm:text-xs font-bold text-amber-200 tracking-wide font-sans">
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

          {/* Subtitle */}
          <p className="mt-3 text-xs sm:text-sm font-serif font-medium text-amber-100/90 tracking-wide">
            Join us for -
          </p>

          {/* 4 Feature Columns inside Banner */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 w-full">
            
            {/* 1. Weekly FREE Live Mocks */}
            <div
              onClick={() => {
                soundManager.playClick();
                onNavigate('mock-tracker');
              }}
              className="p-2 sm:p-2.5 rounded-xl bg-black/50 border border-[#F59E0B]/30 hover:border-[#F59E0B] transition-all cursor-pointer flex flex-col items-center justify-center text-center group hover:bg-[#F59E0B]/10"
            >
              <div className="w-7 h-7 rounded-lg bg-[#F59E0B]/15 text-[#FBBF24] flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                <Tv className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] font-bold text-white leading-tight">
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
                onNavigate('syllabus');
              }}
              className="p-2 sm:p-2.5 rounded-xl bg-black/50 border border-[#F59E0B]/30 hover:border-[#F59E0B] transition-all cursor-pointer flex flex-col items-center justify-center text-center group hover:bg-[#F59E0B]/10"
            >
              <div className="w-7 h-7 rounded-lg bg-[#F59E0B]/15 text-[#FBBF24] flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                <FileText className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] font-bold text-white leading-tight">
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
                onNavigate('planner');
              }}
              className="p-2 sm:p-2.5 rounded-xl bg-black/50 border border-[#F59E0B]/30 hover:border-[#F59E0B] transition-all cursor-pointer flex flex-col items-center justify-center text-center group hover:bg-[#F59E0B]/10"
            >
              <div className="w-7 h-7 rounded-lg bg-[#F59E0B]/15 text-[#FBBF24] flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                <CalendarDays className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] font-bold text-white leading-tight">
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
                onNavigate('analytics');
              }}
              className="p-2 sm:p-2.5 rounded-xl bg-black/50 border border-[#F59E0B]/30 hover:border-[#F59E0B] transition-all cursor-pointer flex flex-col items-center justify-center text-center group hover:bg-[#F59E0B]/10"
            >
              <div className="w-7 h-7 rounded-lg bg-[#F59E0B]/15 text-[#FBBF24] flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                <LineChart className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] font-bold text-white leading-tight">
                Strategy &
              </span>
              <span className="text-[10px] text-amber-300 font-medium">
                Guidance
              </span>
            </div>

          </div>

        </div>

        {/* Right Side: ProMocks Mascot Emblem */}
        <div className="hidden lg:flex flex-col items-center shrink-0">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#F59E0B] to-[#FEF3C7] p-1 shadow-xl flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#0A0A0A] flex flex-col items-center justify-center text-center p-2 border border-[#F59E0B]/40">
              <div className="w-7 h-7 rounded-full bg-[#F59E0B] text-black flex items-center justify-center mb-0.5">
                <Brain className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-xs font-black text-[#FBBF24] font-serif leading-none">
                ProMocks
              </span>
              <span className="text-[7.5px] font-bold text-amber-200 uppercase font-mono mt-0.5">
                BY - THE PUNDITS
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
