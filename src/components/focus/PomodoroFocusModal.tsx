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
  Music,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flame,
  Waves,
  Volume2,
  Maximize2,
  Minimize2,
  PictureInPicture2,
  Sun,
  Moon,
  Sparkles,
  Plus,
  ExternalLink,
  BarChart3,
  Search,
  Zap,
  Timer as StopwatchIcon,
  Hourglass,
  Type
} from 'lucide-react';
import { ambientEngine, AmbientSoundType } from '../../utils/ambientSounds';
import { soundManager } from '../../utils/soundEffects';
import { haptics } from '../../utils/haptics';
import { mediaSessionManager } from '../../utils/mediaSession';
import { TimerMode, TimerFontFamily } from '../../types/timer';

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
  const { allTopics, plannerTasks, togglePlannerTask, activityHistory } = useSyllabus();
  const { toggleTheme, isDark, theme } = useTheme();
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

  // Timer Typography Font Selection
  const [timerFont, setTimerFont] = useState<TimerFontFamily>(() => {
    return (localStorage.getItem('syllabus3d_timer_font') as TimerFontFamily) || 'roboto-mono';
  });

  const handleSelectTimerFont = useCallback((font: TimerFontFamily) => {
    setTimerFont(font);
    try {
      localStorage.setItem('syllabus3d_timer_font', font);
      window.dispatchEvent(new Event('syllabus3d_timer_font_change'));
    } catch {}
  }, []);

  useEffect(() => {
    const handleFontSync = () => {
      const saved = localStorage.getItem('syllabus3d_timer_font') as TimerFontFamily;
      if (saved && (saved === 'jetbrains' || saved === 'roboto-mono' || saved === 'orbitron')) {
        setTimerFont(saved);
      }
    };
    window.addEventListener('storage', handleFontSync);
    window.addEventListener('syllabus3d_timer_font_change', handleFontSync);
    return () => {
      window.removeEventListener('storage', handleFontSync);
      window.removeEventListener('syllabus3d_timer_font_change', handleFontSync);
    };
  }, []);

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

  // Format 3-part timer digits matching Image 2 (00:20:28)
  const formatTimerParts = (secs: number) => {
    const totalSecs = Math.max(0, Math.floor(secs));
    const h = Math.floor(totalSecs / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = totalSecs % 60;
    return {
      hStr: String(h).padStart(2, '0'),
      mStr: String(m).padStart(2, '0'),
      sStr: String(s).padStart(2, '0')
    };
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
      else if (session.mode === 'stopwatch') dur = 0;

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

  const handleAddMinutes = useCallback((deltaMins: number) => {
    soundManager.playClick();
    haptics.selection();
    if (session.status === 'idle') {
      const curMins = Math.max(1, Math.round(session.totalDurationSec / 60));
      const nextMins = Math.max(1, Math.min(180, curMins + deltaMins));
      if (session.mode === 'pomodoro') setFocusDurationMinutes(nextMins);
      else if (session.mode === 'break') setBreakDurationMinutes(nextMins);
      else if (session.mode === 'timer') setCustomTimerMinutes(nextMins);
      setSessionMode(session.mode, nextMins);
    } else {
      const addSec = deltaMins * 60;
      const nextRemainingSec = Math.max(1, session.remainingSec + addSec);
      const top = allTopics.find(t => t.topic.id === selectedTopicId);
      startTimer({
        mode: session.mode,
        durationMinutes: Math.round(nextRemainingSec / 60),
        topicId: top?.topic.id,
        topicName: top?.topic.name,
        subjectName: top?.subjectName,
        currentLoop: session.currentLoop,
        targetLoops: session.targetLoops,
        isLoopActive: session.isLoopActive
      });
    }
  }, [session, allTopics, selectedTopicId, setSessionMode, startTimer]);

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
        ? `Stopwatch (${formatTimerParts(session.stopwatchElapsedSec).mStr}:${formatTimerParts(session.stopwatchElapsedSec).sStr})`
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
      } else if (e.key === 'r' || e.key === 'R') {
        handleResetOrStop();
      } else if (e.key === 'f' || e.key === 'F') {
        handleToggleFullscreen();
      } else if (e.key === 'd' || e.key === 'D') {
        toggleTheme();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleTogglePlay, handleResetOrStop, handleToggleFullscreen, toggleTheme, isTopicSearchOpen, isSettingsOpen, onClose]);

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

  // Progress Percent (0 to 1) for Radial Gauge
  const progressPercent = useMemo(() => {
    if (session.mode === 'stopwatch') {
      // In stopwatch mode, loop progress smoothly each minute (0-60s)
      return (session.stopwatchElapsedSec % 60) / 60;
    }
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

  // Active seconds for digital display
  const activeDisplaySeconds = session.mode === 'stopwatch'
    ? session.stopwatchElapsedSec
    : session.remainingSec;

  const { hStr, mStr, sStr } = formatTimerParts(activeDisplaySeconds);

  // Mode-specific visual identity, ambient aura & palette
  const modeTheme = useMemo(() => {
    switch (session.mode) {
      case 'break':
        return {
          name: 'break',
          label: session.totalDurationSec > 10 * 60 ? 'Long Break' : 'Break Timer',
          subLabel: 'Recharge & Breathe',
          icon: Coffee,
          primary: '#10B981',
          accent: '#34D399',
          glow: 'rgba(16, 185, 129, 0.45)',
          gradient: 'from-emerald-400 via-teal-400 to-cyan-400',
          badgeBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25',
          ringColor: '#10B981',
          pulseColor: 'bg-emerald-400',
          tickActiveGrad: 'activeTickGreenGrad',
          btnGrad: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
          btnGlow: '0 0 35px rgba(16, 185, 129, 0.55), 0 0 60px rgba(5, 150, 105, 0.3)'
        };
      case 'timer':
        return {
          name: 'timer',
          label: 'Countdown',
          subLabel: 'Timed Sprint',
          icon: Hourglass,
          primary: '#F59E0B',
          accent: '#FBBF24',
          glow: 'rgba(245, 158, 11, 0.45)',
          gradient: 'from-amber-400 via-orange-400 to-yellow-300',
          badgeBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25',
          ringColor: '#F59E0B',
          pulseColor: 'bg-amber-400',
          tickActiveGrad: 'activeTickAmberGrad',
          btnGrad: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
          btnGlow: '0 0 35px rgba(245, 158, 11, 0.55), 0 0 60px rgba(217, 119, 6, 0.3)'
        };
      case 'stopwatch':
        return {
          name: 'stopwatch',
          label: 'Stopwatch',
          subLabel: 'Open Focus Flow',
          icon: StopwatchIcon,
          primary: '#8B5CF6',
          accent: '#D946EF',
          glow: 'rgba(139, 92, 246, 0.45)',
          gradient: 'from-violet-400 via-purple-400 to-fuchsia-400',
          badgeBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/25',
          ringColor: '#8B5CF6',
          pulseColor: 'bg-purple-400',
          tickActiveGrad: 'activeTickPurpleGrad',
          btnGrad: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
          btnGlow: '0 0 35px rgba(139, 92, 246, 0.55), 0 0 60px rgba(124, 58, 237, 0.3)'
        };
      case 'pomodoro':
      default:
        return {
          name: 'pomodoro',
          label: 'Deep Focus',
          subLabel: 'Zero Distraction Flow',
          icon: GraduationCap,
          primary: '#0066FF',
          accent: '#38BDF8',
          glow: 'rgba(0, 102, 255, 0.45)',
          gradient: 'from-blue-500 via-indigo-500 to-cyan-400',
          badgeBg: 'bg-blue-500/10 text-blue-600 dark:text-[#38BDF8] border-blue-500/25',
          ringColor: '#0066FF',
          pulseColor: 'bg-[#38BDF8]',
          tickActiveGrad: 'activeTickBlueGrad',
          btnGrad: 'linear-gradient(135deg, #0066FF 0%, #2563EB 100%)',
          btnGlow: '0 0 35px rgba(0, 102, 255, 0.55), 0 0 60px rgba(37, 99, 235, 0.3)'
        };
    }
  }, [session.mode, session.totalDurationSec]);

  const hasHours = Number(hStr) > 0 || session.mode === 'stopwatch';

  const getTimerFontClass = () => {
    if (timerFont === 'orbitron') return 'font-orbitron tracking-wider';
    if (timerFont === 'jetbrains') return 'font-mono [font-feature-settings:"zero"_0] tracking-tight';
    return 'font-roboto-mono tracking-tight';
  };

  // 60-Division Watchmaker Precision Chronometer Ticks (ViewBox 360 x 360, cx=180, cy=180)
  const renderDialTicks = () => {
    const ticks = [];
    const cx = 180;
    const cy = 180;
    const totalTicks = 60;
    const activeCount = Math.round(progressPercent * totalTicks);

    for (let i = 0; i < totalTicks; i++) {
      const angleDeg = -90 + i * (360 / totalTicks);
      const angleRad = (angleDeg * Math.PI) / 180;

      const isCardinal = i % 15 === 0;
      const isFiveMin = i % 5 === 0;

      const outerR = isCardinal ? 164 : isFiveMin ? 162 : 158;
      const innerR = isCardinal ? 144 : isFiveMin ? 148 : 152;

      const x1 = cx + innerR * Math.cos(angleRad);
      const y1 = cy + innerR * Math.sin(angleRad);
      const x2 = cx + outerR * Math.cos(angleRad);
      const y2 = cy + outerR * Math.sin(angleRad);

      const isActive = i <= activeCount && progressPercent > 0;

      ticks.push(
        <line
          key={`tick_${i}`}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={isActive ? `url(#${modeTheme.tickActiveGrad})` : 'currentColor'}
          strokeWidth={isCardinal ? 2.8 : isFiveMin ? 2.2 : 1.2}
          strokeLinecap="round"
          className={
            isActive
              ? 'transition-all duration-200'
              : 'text-slate-300 dark:text-white/[0.12] transition-colors'
          }
        />
      );
    }
    return ticks;
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] w-full h-[100dvh] min-h-[100dvh] bg-[#F8FAFC] dark:bg-[#090A12] text-slate-900 dark:text-white flex flex-col overflow-hidden font-sans select-none animate-fade-in transition-colors duration-300"
      onClick={e => e.stopPropagation()}
    >
      {/* 🌌 Luminous Cosmic Background Auras Matching Website Palette */}
      <div
        className="fixed inset-0 pointer-events-none transition-all duration-1000 opacity-30 dark:opacity-75"
        style={{
          background: 'radial-gradient(circle at 50% 45%, rgba(124, 58, 237, 0.18) 0%, rgba(34, 211, 238, 0.06) 35%, transparent 70%)'
        }}
      />
      <div className="fixed -bottom-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-20 dark:opacity-30 pointer-events-none bg-gradient-to-br from-[#7C3AED] to-[#22D3EE]" />
      <div className="fixed -top-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-20 dark:opacity-30 pointer-events-none bg-gradient-to-br from-[#4F46E5] to-[#7C3AED]" />

      {/* Subtle Tech Grid Texture */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:28px_28px] opacity-70" />

      {/* 1. TOP UTILITY HEADER (Clean, Responsive, Mobile-Stable) */}
      <header className="relative z-30 shrink-0 h-14 sm:h-16 px-3.5 sm:px-8 border-b border-slate-200/80 dark:border-white/[0.06] bg-white/80 dark:bg-black/40 backdrop-blur-xl flex items-center justify-between gap-2 sm:gap-4">
        {/* Left Branding */}
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-white shadow-md bg-gradient-to-br from-[#7C3AED] to-[#0066FF] shrink-0">
            <GraduationCap className="w-4 h-4 text-white" />
          </div>
          <div className="truncate">
            <h1 className="text-xs sm:text-sm font-black tracking-wider text-slate-900 dark:text-white uppercase truncate">
              Chamber
            </h1>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block truncate">
              Distraction-Free Study Sanctum
            </p>
          </div>
        </div>

        {/* Right Tools & Navigation */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Theme Toggle */}
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              haptics.light();
              toggleTheme();
            }}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95 border border-slate-200 dark:border-white/10"
            title={
              theme === 'dark'
                ? "Switch to Light Mode (D)"
                : theme === 'light'
                ? "Switch to Warm Parchment Gold (D)"
                : "Switch to Dark Mode (D)"
            }
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : theme === 'warm-cream' ? (
              <Sparkles className="w-4 h-4 text-[#E1A837]" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600" />
            )}
          </button>

          {/* Fullscreen Toggle (Hidden on small mobile screens to keep header stable) */}
          <button
            type="button"
            onClick={handleToggleFullscreen}
            className={`hidden sm:flex w-8 h-8 sm:w-9 sm:h-9 rounded-xl items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95 border ${
              isBrowserFullscreen
                ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                : 'bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10'
            }`}
            title={isBrowserFullscreen ? 'Exit Fullscreen (F)' : 'Enter Fullscreen (F)'}
            aria-label="Toggle Fullscreen"
          >
            {isBrowserFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Picture-in-Picture (Hidden on small mobile screens) */}
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
            className={`hidden sm:flex w-8 h-8 sm:w-9 sm:h-9 rounded-xl items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95 border ${
              isPiPActive
                ? 'bg-[#0066FF] text-white'
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

          {/* Quick Timer Font Switcher */}
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              haptics.selection();
              const next: TimerFontFamily = timerFont === 'roboto-mono' ? 'orbitron' : timerFont === 'orbitron' ? 'jetbrains' : 'roboto-mono';
              handleSelectTimerFont(next);
            }}
            className="h-8 sm:h-9 px-2 sm:px-2.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 border bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 text-[11px] font-bold"
            title={`Timer Font: ${timerFont === 'roboto-mono' ? 'Roboto Mono (Clean Digital)' : timerFont === 'orbitron' ? 'Orbitron (Futuristic Sci-Fi)' : 'JetBrains Mono (Code Mono)'}. Click to switch.`}
            aria-label="Switch Timer Font"
          >
            <Type className="w-3.5 h-3.5 text-[#0066FF] dark:text-[#38BDF8]" />
            <span className="hidden sm:inline font-mono text-[10px]">
              {timerFont === 'roboto-mono' ? 'Roboto Mono' : timerFont === 'orbitron' ? 'Orbitron' : 'JetBrains'}
            </span>
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
                ? 'bg-[#0066FF] text-white shadow-md'
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
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 flex items-center justify-center cursor-pointer transition-all active:scale-95 shadow-xs"
            title="Exit Focus Chamber (Esc)"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* 2. MAIN SCROLLABLE CONTENT (Mobile-Friendly, Rock-Solid Stability) */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-3.5 sm:px-6 py-4 sm:py-6 space-y-6 max-w-7xl mx-auto w-full relative z-20 pb-28 sm:pb-24">
        
        {/* TOP SEGMENTED CAPSULE BAR (Aerospace Grade Segmented Control) */}
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center p-1 sm:p-1.5 rounded-full bg-slate-200/80 dark:bg-[#141628]/90 border border-slate-300/80 dark:border-white/[0.08] backdrop-blur-2xl shadow-sm max-w-full overflow-x-auto no-scrollbar gap-1 sm:gap-1.5">
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
                  className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-bold transition-all cursor-pointer active:scale-95 shrink-0 whitespace-nowrap ${
                    isActive
                      ? 'text-white font-black shadow-md'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/80 dark:hover:bg-white/[0.06]'
                  }`}
                  style={{
                    background: isActive ? modeTheme.btnGrad : undefined,
                    boxShadow: isActive ? `0 4px 15px ${modeTheme.glow}` : undefined
                  }}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{tab.label}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-300/60 dark:bg-white/10 text-slate-500 dark:text-slate-400'
                  }`}>
                    {tab.mins}m
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3-COLUMN STUDIO LAYOUT ON DESKTOP / STABLE STACK ON MOBILE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-center">
          
          {/* 🎯 CENTER COLUMN: HERO 3D CHRONOMETER DIAL */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center order-1 lg:order-2 my-2 sm:my-4">
            
            {/* 3D Elevated Chronograph Chassis */}
            <div
              className={`relative w-76 h-76 sm:w-88 sm:h-88 md:w-96 md:h-96 rounded-full bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-[#121424] dark:via-[#0E101D] dark:to-[#080912] shadow-[0_20px_50px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.05),inset_0_1px_2px_rgba(255,255,255,0.8)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.08),inset_0_1px_2px_rgba(255,255,255,0.12)] flex items-center justify-center p-3 sm:p-5 transition-all duration-500 ${
                isRunning ? 'ring-2 sm:ring-4 ring-offset-2 dark:ring-offset-black' : ''
              }`}
              style={{
                borderColor: isRunning ? modeTheme.primary : undefined,
                boxShadow: isRunning ? `0 0 50px ${modeTheme.glow}` : undefined
              }}
            >
              {/* SVG 360x360 Chronometer Gauge */}
              <svg className="w-full h-full overflow-visible" viewBox="0 0 360 360">
                <defs>
                  {/* Mode Gradients */}
                  <linearGradient id="activeTickBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00D2FF" />
                    <stop offset="50%" stopColor="#0066FF" />
                    <stop offset="100%" stopColor="#2563EB" />
                  </linearGradient>

                  <linearGradient id="activeTickGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#34D399" />
                    <stop offset="50%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>

                  <linearGradient id="activeTickAmberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FCD34D" />
                    <stop offset="50%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#EA580C" />
                  </linearGradient>

                  <linearGradient id="activeTickPurpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F472B6" />
                    <stop offset="50%" stopColor="#A855F7" />
                    <stop offset="100%" stopColor="#7C3AED" />
                  </linearGradient>

                  {/* Glass Specular Reflection Gradient */}
                  <linearGradient id="sapphireGlassSheen" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.10" />
                    <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0.01" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                  </linearGradient>

                  <filter id="dialSoftGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>

                  <filter id="laserHalo" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Outer Micro-Bezel Circle */}
                <circle
                  cx="180"
                  cy="180"
                  r="170"
                  fill="none"
                  className="stroke-slate-200/60 dark:stroke-white/[0.05]"
                  strokeWidth="1.2"
                />

                {/* 60 Precision Radial Watchmaking Ticks */}
                {renderDialTicks()}

                {/* Cardinal Numeral Markers (60, 15, 30, 45) */}
                <text x="180" y="44" textAnchor="middle" className="text-[10px] font-mono font-bold fill-slate-400 dark:fill-white/30 select-none">60</text>
                <text x="324" y="184" textAnchor="middle" className="text-[10px] font-mono font-bold fill-slate-400 dark:fill-white/30 select-none">15</text>
                <text x="180" y="324" textAnchor="middle" className="text-[10px] font-mono font-bold fill-slate-400 dark:fill-white/30 select-none">30</text>
                <text x="36" y="184" textAnchor="middle" className="text-[10px] font-mono font-bold fill-slate-400 dark:fill-white/30 select-none">45</text>

                {/* Concentric Lathe Sunburst Rings (Swiss Chronometer Texture) */}
                <circle cx="180" cy="180" r="116" fill="none" className="stroke-slate-200/40 dark:stroke-white/[0.03]" strokeWidth="0.8" />
                <circle cx="180" cy="180" r="94" fill="none" className="stroke-slate-200/40 dark:stroke-white/[0.03]" strokeWidth="0.8" />
                <circle cx="180" cy="180" r="72" fill="none" className="stroke-slate-200/40 dark:stroke-white/[0.03]" strokeWidth="0.8" />

                {/* Continuous Liquid-Laser Progress Track (Radius = 134, Circumference = 841.95) */}
                <circle
                  cx="180"
                  cy="180"
                  r="134"
                  fill="none"
                  className="stroke-slate-100 dark:stroke-white/[0.05]"
                  strokeWidth="3.5"
                />

                {/* Active Dynamic Progress Arc */}
                <circle
                  cx="180"
                  cy="180"
                  r="134"
                  fill="none"
                  stroke={`url(#${modeTheme.tickActiveGrad})`}
                  strokeWidth="4.5"
                  strokeDasharray={841.95}
                  strokeDashoffset={841.95 * (1 - progressPercent)}
                  strokeLinecap="round"
                  transform="rotate(-90 180 180)"
                  className="transition-all duration-300"
                  filter="url(#laserHalo)"
                />

                {/* Glowing Laser Comet Head */}
                {progressPercent > 0.003 && (
                  <g className="transition-all duration-150">
                    <circle
                      cx={180 + 134 * Math.cos((-90 + progressPercent * 360) * (Math.PI / 180))}
                      cy={180 + 134 * Math.sin((-90 + progressPercent * 360) * (Math.PI / 180))}
                      r="7.5"
                      fill={modeTheme.primary}
                      opacity="0.6"
                      filter="url(#dialSoftGlow)"
                    />
                    <circle
                      cx={180 + 134 * Math.cos((-90 + progressPercent * 360) * (Math.PI / 180))}
                      cy={180 + 134 * Math.sin((-90 + progressPercent * 360) * (Math.PI / 180))}
                      r="3.2"
                      fill="#FFFFFF"
                    />
                  </g>
                )}

                {/* Sapphire Glass Specular Sheen Arc */}
                <path
                  d="M 50 160 A 130 130 0 0 1 310 160 Z"
                  fill="url(#sapphireGlassSheen)"
                  className="pointer-events-none select-none"
                />
              </svg>

              {/* Inside Disc Typography & Status Display */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none select-none px-4">
                
                {/* Header Mode Pill */}
                <div className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider mb-1 sm:mb-2 border shadow-2xs ${modeTheme.badgeBg}`}>
                  <modeTheme.icon className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>{modeTheme.label}</span>
                </div>

                {/* Giant Bold Digits (Dynamic Typography) */}
                <div className={`my-1 sm:my-1.5 flex items-baseline justify-center ${getTimerFontClass()} tabular-nums`}>
                  {hasHours ? (
                    <div className="flex items-baseline justify-center gap-0.5">
                      <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold opacity-40 text-slate-700 dark:text-slate-300">
                        {hStr}:
                      </span>
                      <span className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white drop-shadow-xs">
                        {mStr}
                      </span>
                      <span className={`text-3xl sm:text-4xl md:text-5xl font-black px-0.5 ${isRunning ? 'animate-pulse' : ''}`} style={{ color: modeTheme.primary }}>
                        :
                      </span>
                      <span className="text-4xl sm:text-5xl md:text-6xl font-black drop-shadow-xs" style={{ color: modeTheme.accent }}>
                        {sStr}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-baseline justify-center gap-0.5">
                      <span className="text-5xl sm:text-6xl md:text-7xl font-black text-slate-900 dark:text-white drop-shadow-xs">
                        {mStr}
                      </span>
                      <span className={`text-4xl sm:text-5xl md:text-6xl font-black px-0.5 ${isRunning ? 'animate-pulse' : ''}`} style={{ color: modeTheme.primary }}>
                        :
                      </span>
                      <span className="text-5xl sm:text-6xl md:text-7xl font-black drop-shadow-xs" style={{ color: modeTheme.accent }}>
                        {sStr}
                      </span>
                    </div>
                  )}
                </div>

                {/* Live Status Badge Pill */}
                <div className="flex items-center gap-1.5 px-3.5 sm:px-4 py-1 rounded-full bg-slate-100/90 dark:bg-white/[0.06] border border-slate-200/90 dark:border-white/10 mt-1.5 sm:mt-2 shadow-xs">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isRunning
                        ? `${modeTheme.pulseColor} animate-ping`
                        : isPaused
                        ? 'bg-amber-400'
                        : 'bg-slate-400'
                    }`}
                  />
                  <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
                    {isRunning
                      ? session.mode === 'stopwatch'
                        ? 'Elapsed Time Running'
                        : `${Math.round(progressPercent * 100)}% Complete • In Flow`
                      : isPaused
                      ? 'Paused • Ready to Resume'
                      : 'Ready to Launch'}
                  </span>
                </div>
              </div>
            </div>

            {/* TACTILE HARDWARE DOCK */}
            <div className="flex flex-col items-center gap-2.5 mt-5 sm:mt-6">
              <div className="inline-flex items-center gap-2.5 sm:gap-4 p-2 sm:p-2.5 rounded-full bg-white/90 dark:bg-[#121528]/90 border border-slate-200/90 dark:border-white/[0.08] backdrop-blur-2xl shadow-[0_12px_36px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1)]">
                
                {/* Reset / Rewind */}
                <button
                  type="button"
                  onClick={handleResetOrStop}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.12] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 group border border-slate-200/60 dark:border-white/5"
                  title="Reset Timer (R)"
                  aria-label="Reset Timer"
                >
                  <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-rotate-90 transition-transform duration-300" />
                </button>

                {/* Quick -1m (when idle) */}
                {session.status === 'idle' && (
                  <button
                    type="button"
                    onClick={() => handleAddMinutes(-1)}
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-white/10 text-[11px] font-mono font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-90"
                    title="Subtract 1 minute"
                  >
                    -1m
                  </button>
                )}

                {/* HERO PLAY/PAUSE TRIGGER BUTTON */}
                <button
                  type="button"
                  onClick={handleTogglePlay}
                  className="relative group w-16 h-16 sm:w-18 sm:h-18 rounded-full flex items-center justify-center text-white transition-all cursor-pointer active:scale-92 active:translate-y-0.5 shadow-2xl p-1"
                  style={{
                    background: isRunning
                      ? 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)'
                      : modeTheme.btnGrad,
                    boxShadow: isRunning
                      ? '0 0 30px rgba(239, 68, 68, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.35)'
                      : `${modeTheme.btnGlow}, inset 0 1px 1px rgba(255, 255, 255, 0.35)`
                  }}
                  title={isRunning ? "Pause (Space)" : "Start (Space)"}
                  aria-label={isRunning ? "Pause Timer" : "Start Timer"}
                >
                  <span className="absolute inset-1 rounded-full border border-white/25 pointer-events-none" />
                  
                  {isRunning ? (
                    <Pause className="w-7 h-7 sm:w-8 sm:h-8 fill-current drop-shadow-sm" />
                  ) : (
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1 drop-shadow-sm" />
                  )}
                </button>

                {/* Quick +5m Nudge */}
                <button
                  type="button"
                  onClick={() => handleAddMinutes(5)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-white/10 text-[11px] font-mono font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-90"
                  title="Add 5 minutes"
                >
                  +5m
                </button>

                {/* Stop / End Session */}
                <button
                  type="button"
                  onClick={handleResetOrStop}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.12] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 border border-slate-200/60 dark:border-white/5"
                  title="Stop Session"
                  aria-label="Stop Session"
                >
                  <Square className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                </button>
              </div>

              {/* Keyboard Shortcut Hint */}
              <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                Press <kbd className="px-1.5 py-0.5 rounded bg-slate-200/80 dark:bg-white/10 text-slate-700 dark:text-slate-300 font-mono text-[10px]">Space</kbd> to {isRunning ? 'pause' : 'start'} · <kbd className="px-1.5 py-0.5 rounded bg-slate-200/80 dark:bg-white/10 text-slate-700 dark:text-slate-300 font-mono text-[10px]">R</kbd> to reset
              </span>
            </div>
          </div>

          {/* ◀️ LEFT COLUMN: Today's Focus Checklist & Focus Music (Order 2 on mobile, Order 1 on desktop) */}
          <div className="lg:col-span-3 space-y-4 order-2 lg:order-1">
            
            {/* CARD 1: "Today's Focus" */}
            <div className="rounded-3xl bg-white/90 dark:bg-[#131522]/90 border border-slate-200/90 dark:border-white/[0.08] backdrop-blur-2xl p-4 sm:p-5 shadow-sm space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#0066FF]/10 text-[#0066FF] dark:text-[#38BDF8] flex items-center justify-center">
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
                  className="h-full rounded-full bg-gradient-to-r from-[#0066FF] to-[#2563EB] transition-all duration-500"
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
                            ? 'bg-gradient-to-br from-[#0066FF] to-[#2563EB] text-white shadow-xs'
                            : 'border-2 border-slate-300 dark:border-white/30 group-hover:border-[#0066FF]'
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
                            ? 'text-[#0066FF] dark:text-[#38BDF8] font-bold'
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
            <div className="rounded-3xl bg-white/90 dark:bg-[#131522]/90 border border-slate-200/90 dark:border-white/[0.08] backdrop-blur-2xl p-4 sm:p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#0066FF]/10 text-[#0066FF] dark:text-[#38BDF8] flex items-center justify-center">
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
              <div className="h-9 flex items-center justify-center gap-1 px-3 py-1 rounded-2xl bg-slate-50 dark:bg-black/30 border border-slate-200/60 dark:border-white/5">
                {[40, 75, 50, 90, 100, 45, 65, 85, 95, 55, 70, 80, 60, 90, 50, 75].map((h, idx) => (
                  <span
                    key={idx}
                    className={`w-1 rounded-full bg-gradient-to-t from-[#0066FF] to-[#38BDF8] transition-all duration-300 ${
                      isRunning && activeSound !== 'none' ? 'animate-bounce' : 'h-2 opacity-30'
                    }`}
                    style={{
                      height: isRunning && activeSound !== 'none' ? `${h}%` : '5px',
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
                    className="w-full h-1.5 bg-slate-200 dark:bg-white/15 rounded-lg appearance-none cursor-pointer accent-[#0066FF]"
                    title={`Volume: ${Math.round(soundVolume * 100)}%`}
                  />
                  <span className="text-[10px] font-mono shrink-0 w-7 text-right">
                    {Math.round(soundVolume * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ▶️ RIGHT COLUMN: Session Stats & Current Task (Order 3) */}
          <div className="lg:col-span-3 space-y-4 order-3">
            
            {/* CARD 1: "Session Stats" (2x2 Bento Metric Grid) */}
            <div className="rounded-3xl bg-white/90 dark:bg-[#131522]/90 border border-slate-200/90 dark:border-white/[0.08] backdrop-blur-2xl p-4 sm:p-5 shadow-sm space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#0066FF]/10 text-[#0066FF] dark:text-[#38BDF8] flex items-center justify-center">
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
                    <Clock className="w-3.5 h-3.5 text-[#0066FF]" />
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
                    <Target className="w-3.5 h-3.5 text-[#8B5CF6]" />
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
            <div className="rounded-3xl bg-white/90 dark:bg-[#131522]/90 border border-slate-200/90 dark:border-white/[0.08] backdrop-blur-2xl p-4 sm:p-5 shadow-sm space-y-3">
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
                  className="w-7 h-7 rounded-full bg-[#0066FF] text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  title="Change Study Task"
                  aria-label="Change Topic"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Active Task Banner */}
              <div
                onClick={() => setIsTopicSearchOpen(true)}
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-black/30 border border-slate-200/80 dark:border-white/10 hover:border-[#0066FF]/40 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5 truncate min-w-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0066FF] shrink-0" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {selectedTopic ? selectedTopic.topic.name : 'Choose Topic to Focus'}
                  </span>
                </div>

                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 transition-colors shrink-0 ml-2" />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 3. FLOATING BOTTOM SEGMENTED TIMER SELECTOR CAPSULE (Always Accessible On Mobile & Desktop) */}
      <div className="fixed bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-40 max-w-[95vw] pointer-events-auto">
        <div className="inline-flex items-center p-1 rounded-full bg-white/95 dark:bg-[#131522]/95 border border-slate-300/80 dark:border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_15px_45px_rgba(0,0,0,0.8)] backdrop-blur-2xl overflow-x-auto no-scrollbar gap-1">
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
                className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-bold transition-all cursor-pointer active:scale-95 shrink-0 whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-[#0066FF] to-[#2563EB] text-white font-black shadow-md shadow-blue-500/30'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06]'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{tool.label}</span>
              </button>
            );
          })}
        </div>
      </div>

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
                      selectedTopicId === t.topic.id ? 'bg-[#0066FF]/15 text-[#0066FF] dark:text-[#38BDF8] font-bold' : 'text-slate-700 dark:text-slate-300'
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
                <Settings className="w-4 h-4 text-[#0066FF]" />
                <h3 className="text-sm font-black">Timer Protocols</h3>
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
                  <span className="font-mono text-[#0066FF] dark:text-[#38BDF8]">{focusDurationMinutes} min</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="120"
                  step="5"
                  value={focusDurationMinutes}
                  onChange={e => setFocusDurationMinutes(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-white/15 rounded-lg appearance-none cursor-pointer accent-[#0066FF]"
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

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Custom Countdown Duration</span>
                  <span className="font-mono text-emerald-500">{customTimerMinutes} min</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="180"
                  step="5"
                  value={customTimerMinutes}
                  onChange={e => setCustomTimerMinutes(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-white/15 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Timer Digits Typography
                </label>
                <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/10">
                  {[
                    { id: 'jetbrains', label: 'JetBrains', sub: 'Practical', fontClass: 'font-mono' },
                    { id: 'roboto-mono', label: 'Roboto', sub: 'Clean Digital', fontClass: 'font-roboto-mono' },
                    { id: 'orbitron', label: 'Orbitron', sub: 'Futuristic', fontClass: 'font-orbitron' }
                  ].map(f => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => {
                        handleSelectTimerFont(f.id as TimerFontFamily);
                        soundManager.playClick();
                        haptics.selection();
                      }}
                      className={`px-1.5 py-1.5 rounded-lg text-center transition-all cursor-pointer ${
                        timerFont === f.id
                          ? 'bg-white dark:bg-[#1E2235] text-[#0066FF] dark:text-[#38BDF8] shadow-xs font-black border border-blue-500/30'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <span className={`block text-xs ${f.fontClass} font-bold leading-tight`}>{f.label}</span>
                      <span className="block text-[9px] text-slate-400 dark:text-slate-500 leading-tight mt-0.5">{f.sub}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                if (session.mode === 'timer') {
                  setSessionMode('timer', customTimerMinutes);
                } else if (session.mode === 'break') {
                  setSessionMode('break', breakDurationMinutes);
                } else {
                  setSessionMode('pomodoro', focusDurationMinutes);
                }
                setIsSettingsOpen(false);
                soundManager.playClick();
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#2563EB] text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
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
