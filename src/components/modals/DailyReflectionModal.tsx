import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Sparkles,
  Moon,
  Flame,
  Zap,
  Smile,
  Coffee,
  BatteryLow,
  Trophy,
  History,
  ArrowRight,
  Target,
  Sunrise,
  CheckCircle2,
  Maximize2,
  Minimize2,
  Calendar,
  Clock,
  Brain,
  Lightbulb,
  Check,
  ShieldCheck,
  Award
} from 'lucide-react';
import { useSyllabus } from '../../context/SyllabusContext';
import { DailyMood, DistractionCategory } from '../../types/syllabus';
import { getTodayDateKey } from '../../utils/dailyProductivityStorage';
import { soundManager } from '../../utils/soundEffects';

interface DailyReflectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenHistory?: () => void;
}

export const DailyReflectionModal: React.FC<DailyReflectionModalProps> = ({
  isOpen,
  onClose,
  onOpenHistory
}) => {
  const {
    top3Targets,
    toggleTop3Target,
    saveDailyReflection,
    reflectionsHistory
  } = useSyllabus();

  const todayKey = getTodayDateKey();
  const existingTodayReflection = reflectionsHistory.find(r => r.date === todayKey);

  const completedTargetsCount = top3Targets.filter(t => t.text.trim() && t.completed).length;
  const totalTargetsCount = top3Targets.filter(t => t.text.trim()).length;

  const [mood, setMood] = useState<DailyMood>(existingTodayReflection?.mood || 'fire');
  const [rating, setRating] = useState<number>(existingTodayReflection?.rating || 5);
  const [biggestWin, setBiggestWin] = useState<string>(existingTodayReflection?.biggestWin || '');
  const [distraction, setDistraction] = useState<DistractionCategory>(existingTodayReflection?.distractionReason || 'none');
  const [distractionNote, setDistractionNote] = useState<string>(existingTodayReflection?.distractionNote || '');
  const [tomorrowPriority, setTomorrowPriority] = useState<string>(existingTodayReflection?.tomorrowPriority || '');
  const [eveningGratitude, setEveningGratitude] = useState<string>('');
  const [isFullScreen, setIsFullScreen] = useState<boolean>(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!biggestWin.trim() && !tomorrowPriority.trim()) {
      alert('Please fill at least your biggest win or tomorrow priority!');
      return;
    }

    const compiledWin = eveningGratitude.trim()
      ? `${biggestWin.trim()} • [Mindset]: ${eveningGratitude.trim()}`
      : (biggestWin.trim() || 'Showed up and stayed committed!');

    saveDailyReflection({
      date: todayKey,
      rating,
      mood,
      biggestWin: compiledWin,
      distractionReason: distraction,
      distractionNote: distractionNote.trim() || undefined,
      tomorrowPriority: tomorrowPriority.trim() || 'Crush morning study session',
      targetsCompletedCount: completedTargetsCount
    });

    soundManager.playCompleteChime();
    onClose();
  };

  const moodOptions: Array<{
    id: DailyMood;
    label: string;
    shortLabel: string;
    desc: string;
    emoji: string;
    icon: any;
    color: string;
    borderActive: string;
    bgActive: string;
    glowActive: string;
  }> = [
    {
      id: 'fire',
      label: 'Unstoppable Flow',
      shortLabel: 'Fire',
      desc: 'Deep focus & maximum retention',
      emoji: '🔥',
      icon: Flame,
      color: 'text-orange-400',
      borderActive: 'border-orange-500 shadow-[0_0_25px_rgba(249,115,22,0.35)]',
      bgActive: 'bg-gradient-to-b from-orange-500/20 to-orange-950/40 text-orange-200',
      glowActive: 'from-orange-500/20 via-amber-500/10 to-transparent'
    },
    {
      id: 'lightning',
      label: 'High Momentum',
      shortLabel: 'Great',
      desc: 'Productive and proactive study',
      emoji: '⚡',
      icon: Zap,
      color: 'text-amber-400',
      borderActive: 'border-amber-500 shadow-[0_0_25px_rgba(245,158,11,0.35)]',
      bgActive: 'bg-gradient-to-b from-amber-500/20 to-amber-950/40 text-amber-200',
      glowActive: 'from-amber-500/20 via-yellow-500/10 to-transparent'
    },
    {
      id: 'happy',
      label: 'Steady Progress',
      shortLabel: 'Good',
      desc: 'Consistent & balanced output',
      emoji: '😊',
      icon: Smile,
      color: 'text-emerald-400',
      borderActive: 'border-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.35)]',
      bgActive: 'bg-gradient-to-b from-emerald-500/20 to-emerald-950/40 text-emerald-200',
      glowActive: 'from-emerald-500/20 via-teal-500/10 to-transparent'
    },
    {
      id: 'tired',
      label: 'Scattered Focus',
      shortLabel: 'Lost',
      desc: 'Distracted or interrupted sessions',
      emoji: '🥱',
      icon: Coffee,
      color: 'text-sky-400',
      borderActive: 'border-sky-500 shadow-[0_0_25px_rgba(56,189,248,0.35)]',
      bgActive: 'bg-gradient-to-b from-sky-500/20 to-sky-950/40 text-sky-200',
      glowActive: 'from-sky-500/20 via-blue-500/10 to-transparent'
    },
    {
      id: 'stressed',
      label: 'Brain Fatigue',
      shortLabel: 'Low',
      desc: 'Exhausted or exam anxiety',
      emoji: '😴',
      icon: BatteryLow,
      color: 'text-rose-400',
      borderActive: 'border-rose-500 shadow-[0_0_25px_rgba(244,63,94,0.35)]',
      bgActive: 'bg-gradient-to-b from-rose-500/20 to-rose-950/40 text-rose-200',
      glowActive: 'from-rose-500/20 via-red-500/10 to-transparent'
    }
  ];

  const distractionPills: Array<{
    id: DistractionCategory;
    label: string;
    shortLabel: string;
    emoji: string;
    activeStyle: string;
    inactiveStyle: string;
    preventionTip: string;
  }> = [
    {
      id: 'none',
      label: '100% Focused & Disciplined',
      shortLabel: '100% Focused 🏆',
      emoji: '🏆',
      activeStyle: 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] font-bold',
      inactiveStyle: 'bg-[#151828]/80 border-[#272B44] text-[#A6ADCE] hover:bg-[#1E233A] hover:text-white',
      preventionTip: 'Outstanding self-discipline! Keep this high-standard momentum rolling.'
    },
    {
      id: 'social_media',
      label: 'Social Media / Reels / Chats',
      shortLabel: 'Social Media 📱',
      emoji: '📱',
      activeStyle: 'bg-rose-500/20 border-rose-500 text-rose-300 shadow-[0_0_20px_rgba(244,63,94,0.3)] font-bold',
      inactiveStyle: 'bg-[#151828]/80 border-[#272B44] text-[#A6ADCE] hover:bg-[#1E233A] hover:text-white',
      preventionTip: 'Defense: Turn phone to Airplane mode or leave it in another room during study blocks.'
    },
    {
      id: 'youtube',
      label: 'YouTube Rabbit Hole / Shorts',
      shortLabel: 'YouTube Trap 📺',
      emoji: '📺',
      activeStyle: 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] font-bold',
      inactiveStyle: 'bg-[#151828]/80 border-[#272B44] text-[#A6ADCE] hover:bg-[#1E233A] hover:text-white',
      preventionTip: 'Defense: Only open specific saved lecture URLs in Split-Screen without clicking the feed.'
    },
    {
      id: 'overthinking',
      label: 'Overthinking & Cutoff Anxiety',
      shortLabel: 'Overthinking 🧠',
      emoji: '🧠',
      activeStyle: 'bg-purple-500/20 border-purple-500 text-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.3)] font-bold',
      inactiveStyle: 'bg-[#151828]/80 border-[#272B44] text-[#A6ADCE] hover:bg-[#1E233A] hover:text-white',
      preventionTip: 'Defense: Shift from future fear to today\'s input. One single solved question at a time.'
    },
    {
      id: 'fatigue',
      label: 'Sleepiness & Energy Slump',
      shortLabel: 'Sleepiness 🥱',
      emoji: '🥱',
      activeStyle: 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.3)] font-bold',
      inactiveStyle: 'bg-[#151828]/80 border-[#272B44] text-[#A6ADCE] hover:bg-[#1E233A] hover:text-white',
      preventionTip: 'Defense: Take a 20-min power nap after lunch and hydrate with cold water before evening session.'
    },
    {
      id: 'other',
      label: 'Other Unexpected Interruption',
      shortLabel: 'Other Interruption ⚠️',
      emoji: '⚠️',
      activeStyle: 'bg-indigo-500/20 border-indigo-500 text-indigo-300 shadow-[0_0_20px_rgba(99,102,241,0.3)] font-bold',
      inactiveStyle: 'bg-[#151828]/80 border-[#272B44] text-[#A6ADCE] hover:bg-[#1E233A] hover:text-white',
      preventionTip: 'Defense: Schedule designated buffer time in your routine for daily errands.'
    }
  ];

  const quickWinChips = [
    'Solved 50+ PYQs with speed',
    'Conquered tough chapter concepts',
    'Finished 100% of Top 3 Targets',
    'Revised all weak formula cards',
    'High score in Full Mock Drill',
    'Zero phone distractions today'
  ];

  const morningTimes = [
    { label: '5:30 AM', desc: 'Brahma Muhurta' },
    { label: '6:30 AM', desc: 'Peak Clarity' },
    { label: '7:30 AM', desc: 'Fresh Start' },
    { label: '8:30 AM', desc: 'Active Study' }
  ];

  const selectedDistractionObj = distractionPills.find(d => d.id === distraction);
  const formattedToday = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return createPortal(
    <div
      className={`fixed inset-0 z-[100] flex flex-col bg-[#070913] text-slate-100 select-none animate-fade-in font-sans overflow-hidden ${
        isFullScreen ? 'w-screen h-screen' : 'p-3 sm:p-6 items-center justify-center bg-black/85 backdrop-blur-xl'
      }`}
      onClick={isFullScreen ? undefined : onClose}
    >
      {/* Ambient Night Atmosphere Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] sm:w-[1200px] h-[340px] bg-gradient-to-b from-purple-600/20 via-indigo-600/10 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[350px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Container */}
      <div
        className={`flex flex-col overflow-hidden transition-all duration-300 ${
          isFullScreen
            ? 'w-full h-full flex-1'
            : 'relative w-full max-w-5xl max-h-[92vh] bg-[#0A0D1B] border border-[#232842] rounded-3xl shadow-2xl shadow-purple-950/40 my-auto'
        }`}
        onClick={e => e.stopPropagation()}
      >
        {/* TOP BAR / NAVIGATION */}
        <header className="px-4 sm:px-8 py-3.5 sm:py-4 bg-[#0E1122]/95 backdrop-blur-xl border-b border-[#222742] flex items-center justify-between gap-4 shrink-0 z-20">
          {/* Left: Emblem, Title & Tags */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-purple-500 via-indigo-500 to-purple-700 p-0.5 shadow-lg shadow-purple-600/30 shrink-0 flex items-center justify-center">
              <div className="w-full h-full bg-[#0E1122] rounded-[14px] flex items-center justify-center text-purple-300">
                <Moon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2] animate-pulse" />
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  DAY-END REFLECTION
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-slate-300 bg-white/5 border border-white/10 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-purple-400" />
                  {formattedToday}
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  +30 XP REWARD
                </span>
              </div>
              <h1 className="text-sm sm:text-lg font-black tracking-tight text-white mt-0.5 truncate flex items-center gap-2">
                <span>1-Minute Night Study Journal</span>
                <span className="text-[11px] font-normal text-slate-400 hidden md:inline">
                  • De-stress, celebrate wins & wake up prepared
                </span>
              </h1>
            </div>
          </div>

          {/* Right: Targets, History, Screen Toggle & Close */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Top 3 Targets Counter Badge */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#161A30] border border-[#2B3152] text-xs">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-300 text-[11px]">Top 3:</span>
              <span className="font-extrabold text-amber-300 text-[11px]">
                {completedTargetsCount} / {Math.max(3, totalTargetsCount)} Done
              </span>
            </div>

            {/* View History */}
            {onOpenHistory && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenHistory();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#161A30] hover:bg-[#202542] text-slate-300 hover:text-white border border-[#2A3050] transition-all text-xs font-bold cursor-pointer"
                title="View Reflection History"
              >
                <History className="w-3.5 h-3.5 text-purple-400" />
                <span className="hidden md:inline">History</span>
              </button>
            )}

            {/* Fullscreen Toggle */}
            <button
              type="button"
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="p-2 rounded-xl bg-[#161A30] hover:bg-[#202542] text-slate-400 hover:text-white border border-[#2A3050] transition-all cursor-pointer"
              title={isFullScreen ? 'Exit Full Screen' : 'Open Full Screen'}
            >
              {isFullScreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-[#161A30] hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 border border-[#2A3050] hover:border-rose-500/30 transition-all cursor-pointer"
              title="Close (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* SCROLLABLE BODY / COCKPIT */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto custom-scrollbar px-4 sm:px-8 py-6 space-y-6"
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* LEFT COLUMN: Momentum, Mood & Academic Win (7 cols) */}
            <div className="lg:col-span-7 space-y-6">

              {/* SECTION 1: Focus & Energy Score */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#0D1022]/90 border border-[#222844] relative overflow-hidden shadow-lg">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-lg bg-purple-500/20 border border-purple-500/40 text-purple-300 flex items-center justify-center text-xs font-mono font-black">
                      1
                    </span>
                    <h2 className="text-xs sm:text-sm font-extrabold tracking-wide uppercase text-slate-200">
                      Focus & Energy Today?
                    </h2>
                  </div>
                  <span className="text-xs font-mono font-black text-amber-300 bg-amber-500/15 px-2.5 py-1 rounded-lg border border-amber-500/30">
                    {rating} / 5 Score • {moodOptions.find(m => m.id === mood)?.label}
                  </span>
                </div>

                <p className="text-[11px] text-slate-400 mb-3">
                  Rate your mental sharpness and consistency during your study blocks.
                </p>

                {/* 5-Mood Visual Cards */}
                <div className="grid grid-cols-5 gap-2 sm:gap-2.5">
                  {moodOptions.map(m => {
                    const isSelected = mood === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          setMood(m.id);
                          if (m.id === 'fire') setRating(5);
                          else if (m.id === 'lightning') setRating(4);
                          else if (m.id === 'happy') setRating(3);
                          else if (m.id === 'tired') setRating(2);
                          else setRating(1);
                          soundManager.playClick();
                        }}
                        className={`p-2.5 sm:p-3 rounded-2xl border transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 text-center relative overflow-hidden group ${
                          isSelected
                            ? `${m.borderActive} ${m.bgActive} scale-102 font-black ring-1 ring-white/20`
                            : 'bg-[#14172B] border-[#252A47] text-slate-400 hover:border-slate-500/60 hover:text-slate-200'
                        }`}
                      >
                        <span className="text-xl sm:text-2xl select-none group-hover:scale-115 transition-transform duration-200">
                          {m.emoji}
                        </span>
                        <div className="min-w-0 w-full">
                          <span className="text-xs font-bold block truncate">
                            {m.shortLabel}
                          </span>
                          <span className="text-[9px] text-slate-400 font-mono hidden sm:block truncate opacity-80 mt-0.5">
                            {m.id === 'fire' ? '5 pts' : m.id === 'lightning' ? '4 pts' : m.id === 'happy' ? '3 pts' : m.id === 'tired' ? '2 pts' : '1 pt'}
                          </span>
                        </div>
                        {isSelected && (
                          <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 2: Today's Biggest Academic Win */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#0D1022]/90 border border-[#222844] relative overflow-hidden shadow-lg space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-center text-xs font-mono font-black">
                      2
                    </span>
                    <h2 className="text-xs sm:text-sm font-extrabold tracking-wide uppercase text-slate-200">
                      Today's Biggest Academic Win?
                    </h2>
                    <span className="text-amber-400 font-black">*</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    Celebrate Progress
                  </span>
                </div>

                <div className="relative">
                  <textarea
                    required
                    value={biggestWin}
                    onChange={e => setBiggestWin(e.target.value)}
                    rows={3}
                    placeholder="e.g. Mastered Trigonometric Identities PYQs, completed 45-min mock with 92% accuracy, and stuck to 4-hour morning routine!"
                    className="w-full p-3.5 pr-10 rounded-xl bg-[#14172B] border border-[#272D4D] text-xs sm:text-sm leading-relaxed text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 custom-scrollbar transition-all"
                  />
                  <Trophy className="w-4 h-4 text-emerald-400/60 absolute right-3.5 top-3.5 pointer-events-none" />
                </div>

                {/* Quick Inspiration Chips */}
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 flex items-center gap-1">
                    <Lightbulb className="w-3 h-3 text-amber-400" />
                    Quick Highlights:
                  </span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {quickWinChips.map((chip, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setBiggestWin(prev => (prev ? `${prev}; ${chip}` : chip));
                          soundManager.playClick();
                        }}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-[#171B32] hover:bg-[#222849] text-slate-300 hover:text-emerald-300 border border-[#2B3152] transition-colors cursor-pointer"
                      >
                        + {chip}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* SECTION 3: Top 3 Targets Accountability Checklist */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#0D1022]/90 border border-[#222844] relative overflow-hidden shadow-lg space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center text-xs font-mono font-black">
                      3
                    </span>
                    <h2 className="text-xs sm:text-sm font-extrabold tracking-wide uppercase text-slate-200">
                      Top 3 Targets Accountability
                    </h2>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/25">
                    {completedTargetsCount} of {Math.max(3, totalTargetsCount)} Completed
                  </span>
                </div>

                <div className="space-y-2">
                  {top3Targets.map((target, idx) => {
                    const hasText = Boolean(target.text.trim());
                    return (
                      <div
                        key={target.id}
                        onClick={() => {
                          if (hasText) {
                            toggleTop3Target(target.id);
                            soundManager.playClick();
                          }
                        }}
                        className={`flex items-center justify-between gap-3 p-3 rounded-xl border transition-all ${
                          hasText
                            ? target.completed
                              ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200 cursor-pointer'
                              : 'bg-[#14172B] border-[#272D4D] text-slate-200 hover:border-slate-500/60 cursor-pointer'
                            : 'bg-[#101324] border-[#1E233D] text-slate-500 opacity-60'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <button
                            type="button"
                            disabled={!hasText}
                            className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors shrink-0 ${
                              target.completed
                                ? 'bg-emerald-500 text-white'
                                : 'border border-slate-500 hover:border-slate-400'
                            }`}
                          >
                            {target.completed && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                          </button>
                          <span className={`text-xs sm:text-[13px] truncate ${target.completed ? 'line-through text-slate-400' : 'font-medium'}`}>
                            {hasText ? target.text : `Target Slot #${idx + 1} (Not set today)`}
                          </span>
                        </div>
                        {target.completed && (
                          <span className="text-[10px] font-mono font-bold text-emerald-400 shrink-0 bg-emerald-500/15 px-2 py-0.5 rounded">
                            Done ✓
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Focus Traps, Tomorrow Launchpad & Gratitude (5 cols) */}
            <div className="lg:col-span-5 space-y-6">

              {/* SECTION 4: Focus Traps & Distractions */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#0D1022]/90 border border-[#222844] relative overflow-hidden shadow-lg space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-300 flex items-center justify-center text-xs font-mono font-black">
                      4
                    </span>
                    <h2 className="text-xs sm:text-sm font-extrabold tracking-wide uppercase text-slate-200">
                      Where Did Focus Slip?
                    </h2>
                  </div>
                  <span className="text-[10px] text-rose-400 font-mono font-bold bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                    Trap Defense
                  </span>
                </div>

                <p className="text-[11px] text-slate-400">
                  Identifying traps removes their power for tomorrow.
                </p>

                {/* Distraction Selection Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {distractionPills.map(d => {
                    const isSelected = distraction === d.id;
                    return (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => {
                          setDistraction(d.id);
                          soundManager.playClick();
                        }}
                        className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                          isSelected ? d.activeStyle : d.inactiveStyle
                        }`}
                      >
                        <span className="text-xs font-semibold truncate flex items-center gap-1.5">
                          <span>{d.emoji}</span>
                          <span>{d.shortLabel}</span>
                        </span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 shrink-0 text-current" />}
                      </button>
                    );
                  })}
                </div>

                {/* Defense Insight Box */}
                {selectedDistractionObj && (
                  <div className="p-3 rounded-xl bg-[#14172B] border border-[#292F4F] space-y-2">
                    <div className="flex items-start gap-2 text-[11px] text-amber-300 leading-snug">
                      <ShieldCheck className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                      <span>{selectedDistractionObj.preventionTip}</span>
                    </div>

                    {distraction !== 'none' && (
                      <input
                        type="text"
                        value={distractionNote}
                        onChange={e => setDistractionNote(e.target.value)}
                        placeholder="Optional: What rule will protect your study tomorrow?"
                        className="w-full px-3 py-2 rounded-lg bg-[#0E1122] border border-[#2E3559] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-400 transition-all"
                      />
                    )}
                  </div>
                )}
              </div>

              {/* SECTION 5: Tomorrow Morning's #1 Launchpad Goal */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#0D1022]/90 border border-[#222844] relative overflow-hidden shadow-lg space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center text-xs font-mono font-black">
                      5
                    </span>
                    <h2 className="text-xs sm:text-sm font-extrabold tracking-wide uppercase text-slate-200">
                      Tomorrow's #1 Priority Goal
                    </h2>
                    <span className="text-amber-400 font-black">*</span>
                  </div>
                  <span className="text-[10px] text-amber-400 font-mono font-bold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                    Wake-Up Ready
                  </span>
                </div>

                <p className="text-[11px] text-slate-400">
                  Decide tonight what you will crush first tomorrow. Zero morning confusion.
                </p>

                {/* Quick Morning Target Times */}
                <div className="grid grid-cols-4 gap-1.5">
                  {morningTimes.map(mt => (
                    <button
                      key={mt.label}
                      type="button"
                      onClick={() => {
                        setTomorrowPriority(prev => {
                          const cleaned = prev.replace(/^\d{1,2}:\d{2}\s+(AM|PM):\s*/i, '');
                          return `${mt.label}: ${cleaned || 'Deep Study Session'}`;
                        });
                        soundManager.playClick();
                      }}
                      className="px-2 py-1.5 rounded-lg bg-[#14172B] hover:bg-[#1E233E] border border-[#262B47] text-center transition-colors cursor-pointer"
                    >
                      <span className="text-[11px] font-bold text-amber-300 block">{mt.label}</span>
                      <span className="text-[8px] text-slate-400 block truncate">{mt.desc}</span>
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    required
                    value={tomorrowPriority}
                    onChange={e => setTomorrowPriority(e.target.value)}
                    placeholder="e.g. 7 AM: Revision of English 100 Rules & 30 Math Drills"
                    className="w-full pl-3.5 pr-10 py-3 rounded-xl bg-[#14172B] border border-[#272D4D] text-xs sm:text-sm font-bold text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 shadow-inner transition-all"
                  />
                  <Sunrise className="w-4 h-4 text-amber-400/70 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* SECTION 6: Bedtime Mindset / Gratitude (Brain Dump) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#0D1022]/90 border border-[#222844] relative overflow-hidden shadow-lg space-y-2">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-purple-400" />
                  <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Bedtime De-Clutter / Sleep Mindset (Optional)
                  </h3>
                </div>
                <input
                  type="text"
                  value={eveningGratitude}
                  onChange={e => setEveningGratitude(e.target.value)}
                  placeholder="One thought to park or be grateful for before sleeping..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#14172B] border border-[#272D4D] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 transition-all"
                />
                <p className="text-[10px] text-slate-500 italic">
                  "Today is done. Rest well so your brain consolidates today's knowledge."
                </p>
              </div>

            </div>

          </div>

          {/* Spacer so bottom bar never obscures content */}
          <div className="h-20" />
        </form>

        {/* FIXED FOOTER BAR */}
        <footer className="px-4 sm:px-8 py-3.5 sm:py-4 bg-[#0A0D1D]/95 backdrop-blur-xl border-t border-[#222742] flex items-center justify-between gap-4 shrink-0 z-30">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-[#14182E] hover:bg-[#1E2342] text-slate-300 hover:text-white text-xs font-bold border border-[#292F50] transition-colors cursor-pointer"
            >
              Close & Sleep
            </button>
            <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              Daily reflection preserves focus streaks & awards +30 XP
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSubmit as any}
              className="group relative px-6 py-2.5 sm:px-8 sm:py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs sm:text-sm shadow-xl shadow-purple-900/40 hover:shadow-purple-700/60 transition-all active:scale-95 cursor-pointer flex items-center gap-2 overflow-hidden border border-purple-400/30"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
              <Moon className="w-4 h-4 text-purple-200" />
              <span>Log Reflection & Sleep (+30 XP)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </footer>

      </div>
    </div>,
    document.body
  );
};
