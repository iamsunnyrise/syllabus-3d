import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useSyllabus } from '../../context/SyllabusContext';
import { useTimer } from '../../context/TimerContext';
import { useTheme } from '../../context/ThemeContext';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Square,
  GraduationCap,
  Coffee,
  TreePine,
  Settings,
  Target,
  Check,
  CheckCircle2,
  Circle,
  Music,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flame,
  Waves,
  CloudRain,
  Brain,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  PictureInPicture2,
  Sun,
  Moon,
  Plus,
  ExternalLink,
  BarChart3,
  Search,
  Sparkles,
  Zap,
  Timer as StopwatchIcon,
  Hourglass
} from 'lucide-react';
import { ambientEngine, AmbientSoundType } from '../../utils/ambientSounds';
import { soundManager } from '../../utils/soundEffects';
import { haptics } from '../../utils/haptics';
import { mediaSessionManager } from '../../utils/mediaSession';
import { TimerMode } from '../../types/timer';

interface PomodoroFocusModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTopicId?: string;
}

const SOUND_TRACKS: { id: AmbientSoundType; label: string; tag: string }[] = [
  { id: 'binaural', label: 'Lo-Fi Study', tag: 'Alpha 432Hz Waves' },
  { id: 'rain', label: 'Rain Ambience', tag: 'Gentle Downpour' },
  { id: 'ocean', label: 'Ocean Waves', tag: 'Pacific Surf' },
  { id: 'fireplace', label: 'Campfire', tag: 'Cozy Crackle' },
  { id: 'none', label: 'Mute Audio', tag: 'Silent Study' }
];

export const PomodoroFocusModal: React.FC<PomodoroFocusModalProps> = ({
  isOpen,
  onClose,
  defaultTopicId
}) => {
  const { allTopics, plannerTasks, togglePlannerTask, profile, activityHistory } = useSyllabus();
  const { toggleTheme, isDark } = useTheme();
  const {
    session,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    setSessionMode,
    setSessionTopic,
    requestPictureInPicture,
    exitPictureInPicture,
    isPiPActive,
    showFloatingOverlay,
    openPermissionModal
  } = useTimer();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isBrowserFullscreen, setIsBrowserFullscreen] = useState(false);

  const [focusDurationMinutes, setFocusDurationMinutes] = useState<number>(() => {
    return session.mode === 'pomodoro' ? Math.max(1, Math.round(session.totalDurationSec / 60)) : 25;
  });
  const [breakDurationMinutes, setBreakDurationMinutes] = useState<number>(() => {
    return session.mode === 'break' ? Math.max(1, Math.round(session.totalDurationSec / 60)) : 5;
  });
  const [customTimerMinutes, setCustomTimerMinutes] = useState<number>(() => {
    return session.mode === 'timer' ? Math.max(1, Math.round(session.totalDurationSec / 60)) : 45;
  });

  const [selectedTopicId, setSelectedTopicId] = useState<string>(defaultTopicId || session.topicId || '');
  const [isTopicSearchOpen, setIsTopicSearchOpen] = useState(false);
  const [topicSearchTerm, setTopicSearchTerm] = useState('');

  const [activeSound, setActiveSound] = useState<AmbientSoundType>('binaural');
  const [soundVolume, setSoundVolume] = useState<number>(0.5);

  // Sync default topic
  useEffect(() => {
    if (defaultTopicId) {
      setSelectedTopicId(defaultTopicId);
      const top = allTopics.find(t => t.topic.id === defaultTopicId);
      if (top) setSessionTopic(top.topic.id, top.topic.name, top.subjectName);
    } else if (allTopics.length > 0 && !selectedTopicId) {
      setSelectedTopicId(allTopics[0].topic.id);
      setSessionTopic(allTopics[0].topic.id, allTopics[0].topic.name, allTopics[0].subjectName);
    }
  }, [defaultTopicId, allTopics]);

  // Track browser native fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsBrowserFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleToggleFullscreen = useCallback(() => {
    soundManager.playClick();
    haptics.light();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  // Ambient Audio Engine Control (Continuous background playback)
  useEffect(() => {
    if (session.status === 'running' && activeSound !== 'none') {
      ambientEngine.play(activeSound);
      ambientEngine.setVolume(soundVolume);
    } else {
      ambientEngine.stop();
    }
  }, [session.status, activeSound, soundVolume]);

  const isRunning = session.status === 'running';
  const isPaused = session.status === 'paused';
  const isIdle = session.status === 'idle';

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleTogglePlay = useCallback(() => {
    haptics.medium();
    if (isRunning) {
      soundManager.playClick();
      pauseTimer();
    } else if (isPaused) {
      soundManager.playPomodoroBell();
      resumeTimer();
    } else {
      soundManager.playPomodoroBell();
      if (
        window.AndroidFloatingTimer &&
        window.AndroidFloatingTimer.isOverlayPermissionGranted &&
        !window.AndroidFloatingTimer.isOverlayPermissionGranted()
      ) {
        openPermissionModal();
      }
      const top = allTopics.find(t => t.topic.id === selectedTopicId);
      let dur = focusDurationMinutes;
      if (session.mode === 'break') dur = breakDurationMinutes;
      else if (session.mode === 'timer') dur = customTimerMinutes;

      startTimer({
        mode: session.mode,
        durationMinutes: dur,
        topicId: top?.topic.id,
        topicName: top?.topic.name,
        subjectName: top?.subjectName,
        currentLoop: session.currentLoop || 1,
        targetLoops: session.targetLoops || 4,
        isLoopActive: session.isLoopActive
      });
    }
  }, [isRunning, isPaused, session.mode, session.currentLoop, session.targetLoops, session.isLoopActive, allTopics, selectedTopicId, focusDurationMinutes, breakDurationMinutes, customTimerMinutes, pauseTimer, resumeTimer, startTimer, openPermissionModal]);

  const handleResetOrStop = useCallback(() => {
    soundManager.playClick();
    haptics.medium();
    resetTimer();
  }, [resetTimer]);

  // MediaSession API Integration for Lock-Screen and Earbud Controls
  useEffect(() => {
    if (!isOpen && session.status === 'idle') {
      mediaSessionManager.clear();
      return;
    }

    const top = allTopics.find(t => t.topic.id === selectedTopicId);
    const minsLeft = Math.ceil(session.remainingSec / 60);
    const track = SOUND_TRACKS.find(s => s.id === activeSound);

    mediaSessionManager.updateMetadata({
      title: session.mode === 'stopwatch'
        ? `Stopwatch (${formatTime(session.stopwatchElapsedSec)})`
        : `${session.mode.toUpperCase()} • ${minsLeft}m left`,
      artist: top ? `${top.topic.name} • ${top.subjectName}` : 'Deep Study Mode',
      album: track ? `Music: ${track.label}` : 'Deep Focus Chamber'
    });

    mediaSessionManager.setPlaybackState(
      isRunning ? 'playing' : isPaused ? 'paused' : 'none'
    );

    mediaSessionManager.setActionHandlers({
      onPlay: () => {
        if (!isRunning) handleTogglePlay();
      },
      onPause: () => {
        if (isRunning) handleTogglePlay();
      },
      onStop: () => {
        resetTimer();
      }
    });
  }, [isOpen, session.status, session.remainingSec, session.stopwatchElapsedSec, session.mode, activeSound, selectedTopicId, isRunning, isPaused, handleTogglePlay, resetTimer, allTopics]);

  // Keyboard shortcut listener (Space = Play/Pause, Esc = Close, F = Fullscreen, D = Theme)
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.code === 'Space') {
        e.preventDefault();
        handleTogglePlay();
      } else if (e.code === 'Escape') {
        if (isTopicSearchOpen) {
          setIsTopicSearchOpen(false);
        } else if (isSettingsOpen) {
          setIsSettingsOpen(false);
        } else {
          onClose();
        }
      } else if (e.key === 'f' || e.key === 'F') {
        handleToggleFullscreen();
      } else if (e.key === 'd' || e.key === 'D') {
        toggleTheme();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleTogglePlay, handleToggleFullscreen, toggleTheme, isTopicSearchOpen, isSettingsOpen, onClose]);

  // Today's Focus Checklist from Planner or Syllabus
  const todayTasks = useMemo(() => {
    const list = plannerTasks.filter(t => t.status === 'today' || t.status === 'in_progress' || t.status === 'completed');
    if (list.length > 0) return list.slice(0, 5);
    return allTopics.slice(0, 5).map(t => ({
      id: t.topic.id,
      title: t.topic.name,
      status: t.topic.status === 'completed' ? ('completed' as const) : ('today' as const),
      topicId: t.topic.id,
      subjectName: t.subjectName
    }));
  }, [plannerTasks, allTopics]);

  const completedCount = todayTasks.filter(t => t.status === 'completed').length;
  const totalTasksCount = Math.max(1, todayTasks.length);
  const taskProgressPercent = Math.round((completedCount / totalTasksCount) * 100);

  // Session Statistics Calculation
  const statsMetrics = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const todayAct = activityHistory?.find(a => a.date === todayStr);
    const studiedMinutes = (todayAct?.studyMinutes || 0) + Math.floor((session.totalDurationSec - session.remainingSec) / 60);
    const h = Math.floor(studiedMinutes / 60);
    const m = studiedMinutes % 60;
    const goalHours = 3;
    const goalMins = 0;

    return {
      focusTime: `${h}h ${m < 10 ? '0' : ''}${m}m`,
      sessionsCount: session.currentLoop || 4,
      focusRate: `${todayTasks.length > 0 ? Math.max(60, taskProgressPercent) : 75}%`,
      dailyGoal: `${goalHours}h ${goalMins < 10 ? '0' : ''}${goalMins}m`
    };
  }, [activityHistory, session.totalDurationSec, session.remainingSec, session.currentLoop, todayTasks, taskProgressPercent]);

  // Music Selector Handlers
  const currentSoundTrack = SOUND_TRACKS.find(s => s.id === activeSound) || SOUND_TRACKS[0];

  const handlePrevSound = () => {
    soundManager.playClick();
    haptics.selection();
    const curIdx = SOUND_TRACKS.findIndex(s => s.id === activeSound);
    const prevIdx = (curIdx - 1 + SOUND_TRACKS.length) % SOUND_TRACKS.length;
    setActiveSound(SOUND_TRACKS[prevIdx].id);
  };

  const handleNextSound = () => {
    soundManager.playClick();
    haptics.selection();
    const curIdx = SOUND_TRACKS.findIndex(s => s.id === activeSound);
    const nextIdx = (curIdx + 1) % SOUND_TRACKS.length;
    setActiveSound(SOUND_TRACKS[nextIdx].id);
  };

  const progressPercent = useMemo(() => {
    if (session.mode === 'stopwatch') return (session.stopwatchElapsedSec % 60) / 60;
    if (session.totalDurationSec === 0) return 0;
    return Math.min(1, Math.max(0, (session.totalDurationSec - session.remainingSec) / session.totalDurationSec));
  }, [session.mode, session.stopwatchElapsedSec, session.remainingSec, session.totalDurationSec]);

  const selectedTopic = allTopics.find(t => t.topic.id === selectedTopicId);

  const filteredTopics = useMemo(() => {
    if (!topicSearchTerm.trim()) return allTopics;
    const q = topicSearchTerm.toLowerCase();
    return allTopics.filter(t =>
      t.topic.name.toLowerCase().includes(q) ||
      t.subjectName.toLowerCase().includes(q)
    );
  }, [allTopics, topicSearchTerm]);

  if (!isOpen) return null;

  // Dial Geometry (Radius 112, Center 150, 150)
  const radius = 112;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent * circumference);
  const tipAngle = (progressPercent * 360 - 90) * (Math.PI / 180);
  const tipX = 150 + radius * Math.cos(tipAngle);
  const tipY = 150 + radius * Math.sin(tipAngle);

  // Render 60 Precision Chronograph Ticks
  const renderDialTicks = () => {
    const ticks = [];
    const cx = 150;
    const cy = 150;
    for (let i = 0; i < 60; i++) {
      const angleDeg = i * 6 - 90;
      const angleRad = (angleDeg * Math.PI) / 180;
      const isMajor = i % 5 === 0;
      const innerR = isMajor ? 122 : 126;
      const outerR = 133;
      const x1 = cx + innerR * Math.cos(angleRad);
      const y1 = cy + innerR * Math.sin(angleRad);
      const x2 = cx + outerR * Math.cos(angleRad);
      const y2 = cy + outerR * Math.sin(angleRad);

      ticks.push(
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="currentColor"
          strokeWidth={isMajor ? 2.2 : 1.1}
          className={
            isMajor
              ? 'text-slate-400/80 dark:text-white/40'
              : 'text-slate-300/60 dark:text-white/15'
          }
        />
      );
    }
    return ticks;
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] w-screen h-screen min-h-screen bg-[#F8FAFC] dark:bg-[#090A12] text-slate-900 dark:text-white flex flex-col justify-between overflow-y-auto no-scrollbar font-sans select-none animate-fade-in transition-colors duration-300"
      onClick={e => e.stopPropagation()}
    >
      {/* 🌌 Luminous Cosmic Background Auras Matching Website Palette */}
      <div
        className="fixed inset-0 pointer-events-none transition-all duration-1000 opacity-40 dark:opacity-75"
        style={{
          background: 'radial-gradient(circle at 50% 45%, rgba(124, 58, 237, 0.22) 0%, rgba(34, 211, 238, 0.08) 35%, transparent 70%)'
        }}
      />
      <div className="fixed -bottom-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-20 dark:opacity-30 pointer-events-none bg-gradient-to-br from-[#7C3AED] to-[#22D3EE]" />
      <div className="fixed -top-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-20 dark:opacity-30 pointer-events-none bg-gradient-to-br from-[#4F46E5] to-[#7C3AED]" />

      {/* Subtle Tech Grid Texture */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(rgba(0,0,0,0.04)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:28px_28px] opacity-70" />

      {/* 1. TOP UTILITY HEADER (Minimal, Sleek) */}
      <header className="relative z-30 shrink-0 h-14 sm:h-16 px-4 sm:px-8 border-b border-slate-200/80 dark:border-white/[0.06] bg-white/70 dark:bg-black/30 backdrop-blur-xl flex items-center justify-between gap-3">
        {/* Left Branding */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-white shadow-md bg-gradient-to-br from-[#7C3AED] to-[#22D3EE]">
            <GraduationCap className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-black tracking-tight text-slate-900 dark:text-white uppercase">
              Deep Focus Chamber
            </h1>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
              Distraction-Free Study Sanctum
            </p>
          </div>
        </div>

        {/* Right Tools & Navigation */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Theme Toggle */}
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              haptics.light();
              toggleTheme();
            }}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95 border border-slate-200 dark:border-white/10"
            title={isDark ? "Switch to Light Mode (D)" : "Switch to Dark Mode (D)"}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={handleToggleFullscreen}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95 border ${
              isBrowserFullscreen
                ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                : 'bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10'
            }`}
            title={isBrowserFullscreen ? 'Exit Fullscreen (F)' : 'Enter Fullscreen (F)'}
            aria-label="Toggle Fullscreen"
          >
            {isBrowserFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Picture-in-Picture */}
          <button
            type="button"
            onClick={async () => {
              soundManager.playClick();
              if (isPiPActive) {
                await exitPictureInPicture();
              } else {
                await requestPictureInPicture();
              }
            }}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95 border ${
              isPiPActive
                ? 'bg-[#7C3AED] text-white'
                : 'bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10'
            }`}
            title="Popout Floating Window"
            aria-label="Picture-in-Picture"
          >
            <PictureInPicture2 className="w-4 h-4" />
          </button>

          {/* Minimize to In-App Capsule */}
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              showFloatingOverlay();
              onClose();
            }}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-xs"
            title="Minimize to In-App Capsule"
            aria-label="Minimize"
          >
            <Minimize2 className="w-4 h-4" />
          </button>

          {/* Settings */}
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setIsSettingsOpen(prev => !prev);
            }}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer active:scale-95 border ${
              isSettingsOpen
                ? 'bg-[#7C3AED] text-white shadow-md'
                : 'bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10'
            }`}
            title="Timer Settings"
            aria-label="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Close / Exit */}
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              if (isRunning || isPaused) {
                showFloatingOverlay();
              }
              onClose();
            }}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 flex items-center justify-center cursor-pointer transition-all active:scale-95 ml-1 shadow-xs"
            title="Exit Focus Chamber (Esc)"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* 2. MAIN COCKPIT WORKSPACE (Exact 3-Column Layout from Reference Image) */}
      <main className="flex-1 max-w-7xl mx-auto w-full flex flex-col justify-between py-2 sm:py-5 px-4 sm:px-6 relative z-20">
        
        {/* TOP SEGMENTED CAPSULE BAR (Matching Reference Image) */}
        <div className="flex items-center justify-center mb-3 sm:mb-5">
          <div className="inline-flex items-center p-1 rounded-full bg-slate-200/70 dark:bg-[#16192B]/90 border border-slate-300/80 dark:border-white/[0.08] backdrop-blur-2xl shadow-md">
            {[
              { id: 'focus', label: 'Focus', icon: GraduationCap, mins: focusDurationMinutes, mode: 'pomodoro' as TimerMode },
              { id: 'short', label: 'Short Break', icon: Coffee, mins: 5, mode: 'break' as TimerMode },
              { id: 'long', label: 'Long Break', icon: TreePine, mins: 15, mode: 'break' as TimerMode },
              { id: 'custom', label: 'Custom', icon: Settings, mins: customTimerMinutes, mode: 'timer' as TimerMode }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = (tab.id === 'focus' && session.mode === 'pomodoro') ||
                (tab.id === 'short' && session.mode === 'break' && session.totalDurationSec <= 10 * 60) ||
                (tab.id === 'long' && session.mode === 'break' && session.totalDurationSec > 10 * 60) ||
                (tab.id === 'custom' && session.mode === 'timer');

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    haptics.selection();
                    if (tab.id === 'custom') {
                      setIsSettingsOpen(true);
                    } else {
                      setSessionMode(tab.mode, tab.mins);
                    }
                  }}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-2 rounded-full text-xs font-bold transition-all cursor-pointer active:scale-95 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#7C3AED] via-[#6366F1] to-[#22D3EE] text-white font-black shadow-lg shadow-indigo-500/30'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/80 dark:hover:bg-white/[0.06]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3-COLUMN STUDIO STAGE (Matching Reference Image) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center my-auto">
          
          {/* ◀️ LEFT COLUMN: Today's Focus Checklist & Focus Music */}
          <div className="lg:col-span-3 space-y-4 order-2 lg:order-1">
            
            {/* CARD 1: "Today's Focus" */}
            <div className="rounded-3xl bg-white/90 dark:bg-[#131522]/90 border border-slate-200/90 dark:border-white/[0.08] backdrop-blur-2xl p-5 shadow-lg shadow-indigo-500/5 dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)] space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#7C3AED]/10 text-[#7C3AED] dark:text-[#A78BFA] flex items-center justify-center">
                    <Target className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">Today's Focus</span>
                </div>
                <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                  {completedCount}/{totalTasksCount}
                </span>
              </div>

              {/* Gradient Progress Bar */}
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] via-[#6366F1] to-[#22D3EE] transition-all duration-500"
                  style={{ width: `${taskProgressPercent}%` }}
                />
              </div>

              {/* Task Checklist Items */}
              <div className="space-y-2 pt-1 max-h-48 overflow-y-auto no-scrollbar">
                {todayTasks.map((t, idx) => {
                  const isDone = t.status === 'completed';
                  return (
                    <div
                      key={t.id || idx}
                      className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/[0.04] transition-colors cursor-pointer group"
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePlannerTask(t.id);
                        }}
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-transform active:scale-90 ${
                          isDone
                            ? 'bg-gradient-to-br from-[#7C3AED] to-[#22D3EE] text-white shadow-xs'
                            : 'border-2 border-slate-300 dark:border-white/30 group-hover:border-[#22D3EE]'
                        }`}
                        title={isDone ? "Mark as in-progress" : "Mark as completed"}
                      >
                        {isDone && <Check className="w-3 h-3 stroke-[3]" />}
                      </button>

                      <span
                        onClick={() => {
                          setSelectedTopicId(t.topicId || t.id);
                          setSessionTopic(t.topicId || t.id, t.title, t.subjectName);
                          soundManager.playClick();
                        }}
                        className={`text-xs font-semibold truncate select-none ${
                          isDone
                            ? 'line-through text-slate-400 dark:text-slate-500'
                            : selectedTopicId === (t.topicId || t.id)
                            ? 'text-[#7C3AED] dark:text-[#22D3EE] font-bold'
                            : 'text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        {t.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CARD 2: "Focus Music" with Lo-Fi & Live Equalizer */}
            <div className="rounded-3xl bg-white/90 dark:bg-[#131522]/90 border border-slate-200/90 dark:border-white/[0.08] backdrop-blur-2xl p-5 shadow-lg shadow-indigo-500/5 dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#22D3EE]/10 text-[#0891B2] dark:text-[#22D3EE] flex items-center justify-center">
                    <Music className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-tight">Focus Music</h3>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{currentSoundTrack.label}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={handlePrevSound}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer active:scale-95"
                    title="Previous Track"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextSound}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer active:scale-95"
                    title="Next Track"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 16-Bar Animated Live Equalizer Waveform */}
              <div className="h-10 flex items-center justify-center gap-1 px-3 py-1.5 rounded-2xl bg-slate-50 dark:bg-black/30 border border-slate-200/60 dark:border-white/5">
                {[40, 75, 50, 90, 100, 45, 65, 85, 95, 55, 70, 80, 60, 90, 50, 75].map((h, idx) => (
                  <span
                    key={idx}
                    className={`w-1 rounded-full bg-gradient-to-t from-[#22D3EE] to-[#7C3AED] transition-all duration-300 ${
                      isRunning && activeSound !== 'none' ? 'animate-bounce' : 'h-2 opacity-30'
                    }`}
                    style={{
                      height: isRunning && activeSound !== 'none' ? `${h}%` : '6px',
                      animationDelay: `${(idx % 5) * 0.12}s`,
                      animationDuration: '0.9s'
                    }}
                  />
                ))}
              </div>

              {/* Volume Slider */}
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-0.5">
                <div className="flex items-center gap-1.5 w-full">
                  <Volume2 className="w-3.5 h-3.5 shrink-0" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={soundVolume}
                    onChange={e => setSoundVolume(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 dark:bg-white/15 rounded-lg appearance-none cursor-pointer accent-[#22D3EE]"
                    title={`Volume: ${Math.round(soundVolume * 100)}%`}
                  />
                  <span className="text-[10px] font-mono shrink-0 w-7 text-right">
                    {Math.round(soundVolume * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 🎯 CENTER COLUMN: The Magnificent Chronograph Dial & Controls */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center order-1 lg:order-2">
            
            {/* Luxury Chronograph Dial */}
            <div className="relative w-72 h-72 sm:w-88 sm:h-88 flex items-center justify-center">
              
              {/* SVG Gauge */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 300 300">
                <defs>
                  <linearGradient id="focusCyanVioletGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22D3EE" />
                    <stop offset="100%" stopColor="#9D4EDD" />
                  </linearGradient>

                  <filter id="focusDialGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* 60 Precision Ticks */}
                {renderDialTicks()}

                {/* Track Circle */}
                <circle
                  cx="150"
                  cy="150"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="11"
                  className="text-slate-200/90 dark:text-white/[0.07]"
                  fill="transparent"
                />

                {/* Active Progress Arc */}
                <circle
                  cx="150"
                  cy="150"
                  r={radius}
                  stroke="url(#focusCyanVioletGrad)"
                  strokeWidth="12"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  filter="url(#focusDialGlow)"
                  fill="transparent"
                  className="transition-all duration-300 ease-out"
                />

                {/* Luminous Glowing Orbit Thumb Orb */}
                {progressPercent > 0.005 && (
                  <circle
                    cx={tipX}
                    cy={tipY}
                    r="8.5"
                    fill="#FFFFFF"
                    className="animate-pulse"
                    style={{ filter: 'drop-shadow(0 0 10px #22D3EE)' }}
                  />
                )}
              </svg>

              {/* Inside Dial Display (Matching Reference Image) */}
              <div className="absolute flex flex-col items-center justify-center text-center px-4">
                
                {/* Graduation Cap Icon */}
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-[#22D3EE] mb-1">
                  <GraduationCap className="w-7 h-7 drop-shadow-[0_0_12px_rgba(34,211,238,0.5)]" />
                </div>

                {/* Subtitle */}
                <span className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 tracking-tight">
                  {session.mode === 'pomodoro' ? 'Deep Study Mode' : session.mode === 'break' ? 'Rest & Recharge' : 'Live Chronometer'}
                </span>

                {/* Giant Bold Digits (25:00) */}
                <span className="text-5xl sm:text-6xl lg:text-7xl font-black font-mono tracking-tight tabular-nums text-slate-900 dark:text-white drop-shadow-sm dark:drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)] my-1">
                  {session.mode === 'stopwatch'
                    ? formatTime(session.stopwatchElapsedSec)
                    : formatTime(session.remainingSec)}
                </span>

                {/* Status Badge Pill (Stay Focused) */}
                <div className="flex items-center gap-1.5 px-4 py-1 rounded-full bg-slate-100 dark:bg-white/[0.08] border border-slate-200/90 dark:border-white/10 mt-1 shadow-xs">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isRunning
                        ? 'bg-[#22D3EE] animate-ping'
                        : isPaused
                        ? 'bg-amber-400'
                        : 'bg-slate-400'
                    }`}
                  />
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    {isRunning ? 'Stay Focused' : isPaused ? 'Session Paused' : 'Ready to Launch'}
                  </span>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS (Reset, Big Glowing Play/Pause, Stop/Next) */}
            <div className="flex items-center justify-center gap-5 mt-4 sm:mt-6">
              
              {/* Reset Button */}
              <button
                type="button"
                onClick={handleResetOrStop}
                className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white dark:bg-white/[0.05] hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-95 group"
                title="Reset Timer"
              >
                <RotateCcw className="w-5 h-5 group-hover:-rotate-90 transition-transform duration-300" />
              </button>

              {/* HERO PLAY/PAUSE BUTTON */}
              <button
                type="button"
                onClick={handleTogglePlay}
                className="w-18 h-18 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-white transition-all cursor-pointer active:scale-95 shadow-2xl"
                style={{
                  background: isRunning
                    ? 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)'
                    : 'linear-gradient(135deg, #7C3AED 0%, #22D3EE 100%)',
                  boxShadow: isRunning
                    ? '0 0 35px rgba(239, 68, 68, 0.55)'
                    : '0 0 35px rgba(124, 58, 237, 0.6), 0 0 70px rgba(34, 211, 238, 0.25)'
                }}
                title={isRunning ? "Pause (Space)" : "Start (Space)"}
              >
                {isRunning ? (
                  <Pause className="w-7 h-7 sm:w-8 sm:h-8 fill-current" />
                ) : (
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
                )}
              </button>

              {/* Stop / Skip Button */}
              <button
                type="button"
                onClick={handleResetOrStop}
                className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white dark:bg-white/[0.05] hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-95"
                title="Stop Session"
              >
                <Square className="w-5 h-5 fill-current" />
              </button>
            </div>
          </div>

          {/* ▶️ RIGHT COLUMN: Session Stats & Current Task */}
          <div className="lg:col-span-3 space-y-4 order-3">
            
            {/* CARD 1: "Session Stats" (2x2 Bento Metric Grid) */}
            <div className="rounded-3xl bg-white/90 dark:bg-[#131522]/90 border border-slate-200/90 dark:border-white/[0.08] backdrop-blur-2xl p-5 shadow-lg shadow-indigo-500/5 dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)] space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#6366F1]/10 text-[#6366F1] dark:text-[#818CF8] flex items-center justify-center">
                    <BarChart3 className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">Session Stats</span>
                </div>
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded-lg border border-slate-200 dark:border-white/5">
                  Today ⌵
                </span>
              </div>

              {/* 2x2 Bento Metrics */}
              <div className="grid grid-cols-2 gap-2.5">
                {/* Metric 1: Focus Time */}
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-black/30 border border-slate-200/60 dark:border-white/5 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-[#22D3EE]" />
                  </div>
                  <div className="text-sm sm:text-base font-black font-mono text-slate-900 dark:text-white">
                    {statsMetrics.focusTime}
                  </div>
                  <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                    Focus Time
                  </div>
                </div>

                {/* Metric 2: Sessions */}
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-black/30 border border-slate-200/60 dark:border-white/5 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Target className="w-3.5 h-3.5 text-[#A855F7]" />
                  </div>
                  <div className="text-sm sm:text-base font-black font-mono text-slate-900 dark:text-white">
                    {statsMetrics.sessionsCount}
                  </div>
                  <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                    Sessions
                  </div>
                </div>

                {/* Metric 3: Focus Rate */}
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-black/30 border border-slate-200/60 dark:border-white/5 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Flame className="w-3.5 h-3.5 text-amber-500" />
                  </div>
                  <div className="text-sm sm:text-base font-black font-mono text-slate-900 dark:text-white">
                    {statsMetrics.focusRate}
                  </div>
                  <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                    Focus Rate
                  </div>
                </div>

                {/* Metric 4: Daily Goal */}
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-black/30 border border-slate-200/60 dark:border-white/5 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <BarChart3 className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <div className="text-sm sm:text-base font-black font-mono text-slate-900 dark:text-white">
                    {statsMetrics.dailyGoal}
                  </div>
                  <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                    Daily Goal
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 2: "Current Task" */}
            <div className="rounded-3xl bg-white/90 dark:bg-[#131522]/90 border border-slate-200/90 dark:border-white/[0.08] backdrop-blur-2xl p-5 shadow-lg shadow-indigo-500/5 dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                    <Target className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">Current Task</span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsTopicSearchOpen(true)}
                  className="w-7 h-7 rounded-full bg-[#F59E0B] text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  title="Change Study Task"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Active Task Banner */}
              <div
                onClick={() => setIsTopicSearchOpen(true)}
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-black/30 border border-slate-200/80 dark:border-white/10 hover:border-[#7C3AED]/40 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5 truncate min-w-0">
                  <span className="w-3 h-3 rounded-full bg-[#A855F7] shrink-0" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {selectedTopic ? selectedTopic.topic.name : 'Polity - FR Notes'}
                  </span>
                </div>

                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors shrink-0 ml-2" />
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SEGMENTED TOOL CAPSULE BAR (Matching Reference Image) */}
        <div className="flex items-center justify-center mt-3 sm:mt-5">
          <div className="inline-flex items-center p-1 rounded-full bg-slate-200/70 dark:bg-[#16192B]/90 border border-slate-300/80 dark:border-white/[0.08] backdrop-blur-2xl shadow-md">
            {[
              { id: 'pomodoro', label: 'Pomodoro', icon: Zap, mode: 'pomodoro' as TimerMode },
              { id: 'countdown', label: 'Countdown', icon: Hourglass, mode: 'timer' as TimerMode },
              { id: 'stopwatch', label: 'Stopwatch', icon: StopwatchIcon, mode: 'stopwatch' as TimerMode },
              { id: 'whitenoise', label: 'White Noise', icon: Waves, mode: 'pomodoro' as TimerMode }
            ].map(tool => {
              const Icon = tool.icon;
              const isActive = (tool.id === 'pomodoro' && session.mode === 'pomodoro') ||
                (tool.id === 'countdown' && session.mode === 'timer') ||
                (tool.id === 'stopwatch' && session.mode === 'stopwatch') ||
                (tool.id === 'whitenoise' && activeSound !== 'none');

              return (
                <button
                  key={tool.id}
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    haptics.selection();
                    if (tool.id === 'whitenoise') {
                      handleNextSound();
                    } else if (tool.id === 'countdown') {
                      setSessionMode('timer', customTimerMinutes);
                    } else if (tool.id === 'stopwatch') {
                      setSessionMode('stopwatch', 0);
                    } else {
                      setSessionMode('pomodoro', focusDurationMinutes);
                    }
                  }}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-2 rounded-full text-xs font-bold transition-all cursor-pointer active:scale-95 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#7C3AED] via-[#6366F1] to-[#22D3EE] text-white font-black shadow-lg shadow-indigo-500/30'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/80 dark:hover:bg-white/[0.06]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tool.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </main>

      {/* TOPIC SEARCH MODAL OVERLAY */}
      {isTopicSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-[#131522] border border-slate-200 dark:border-white/15 shadow-2xl p-5 space-y-3 animate-scale-up text-slate-900 dark:text-white">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-white/10">
              <h3 className="text-sm font-black">Choose Study Target Topic</h3>
              <button
                type="button"
                onClick={() => setIsTopicSearchOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/10">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search topic or subject..."
                value={topicSearchTerm}
                onChange={e => setTopicSearchTerm(e.target.value)}
                autoFocus
                className="w-full bg-transparent text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
              />
            </div>

            <div className="max-h-60 overflow-y-auto space-y-1 no-scrollbar">
              {filteredTopics.length === 0 ? (
                <div className="p-3 text-center text-xs text-slate-400">No matching topics found</div>
              ) : (
                filteredTopics.map(t => (
                  <button
                    key={t.topic.id}
                    type="button"
                    onClick={() => {
                      setSelectedTopicId(t.topic.id);
                      setSessionTopic(t.topic.id, t.topic.name, t.subjectName);
                      setIsTopicSearchOpen(false);
                      soundManager.playClick();
                    }}
                    className={`w-full p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/[0.08] flex items-center justify-between text-left text-xs transition-colors cursor-pointer ${
                      selectedTopicId === t.topic.id ? 'bg-[#7C3AED]/15 text-[#7C3AED] dark:text-[#22D3EE] font-bold' : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="truncate">{t.topic.name}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono ml-2 shrink-0">{t.subjectName}</span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* PROTOCOL SETTINGS MODAL */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-[#131522] border border-slate-200 dark:border-white/15 shadow-2xl p-6 space-y-4 animate-scale-up text-slate-900 dark:text-white">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-[#7C3AED]" />
                <h3 className="text-sm font-black">Focus Protocols</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsSettingsOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Focus Duration</span>
                  <span className="font-mono text-[#7C3AED] dark:text-[#22D3EE]">{focusDurationMinutes} min</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="120"
                  step="5"
                  value={focusDurationMinutes}
                  onChange={e => setFocusDurationMinutes(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-white/15 rounded-lg appearance-none cursor-pointer accent-[#7C3AED]"
                />
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Break Duration</span>
                  <span className="font-mono text-amber-500">{breakDurationMinutes} min</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="30"
                  step="1"
                  value={breakDurationMinutes}
                  onChange={e => setBreakDurationMinutes(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-white/15 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setSessionMode('pomodoro', focusDurationMinutes);
                setIsSettingsOpen(false);
                soundManager.playClick();
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#22D3EE] text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
            >
              Apply Protocols
            </button>
          </div>
        </div>
      )}
    </div>,
    document.body
  );
};
