import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useSyllabus } from '../../context/SyllabusContext';
import { useTimer } from '../../context/TimerContext';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Zap,
  Flame,
  Coffee,
  Timer as StopwatchIcon,
  Clock,
  Search,
  Settings,
  PictureInPicture2,
  Minimize2,
  Maximize2,
  Volume2,
  VolumeX,
  Sparkles,
  Target,
  Plus,
  Minus,
  CloudRain,
  Waves,
  Brain,
  SkipForward,
  Award,
  Headphones,
  Check,
  ChevronDown
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

export const PomodoroFocusModal: React.FC<PomodoroFocusModalProps> = ({
  isOpen,
  onClose,
  defaultTopicId
}) => {
  const { allTopics } = useSyllabus();
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
  const [isLoopModalOpen, setIsLoopModalOpen] = useState(false);
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

  const [targetLoops, setTargetLoops] = useState<number>(session.targetLoops || 4);
  const [selectedTopicId, setSelectedTopicId] = useState<string>(defaultTopicId || session.topicId || '');
  const [isTopicSearchOpen, setIsTopicSearchOpen] = useState(false);
  const [topicSearchTerm, setTopicSearchTerm] = useState('');

  const [activeSound, setActiveSound] = useState<AmbientSoundType>('rain');
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

  // Ambient Audio Engine Control
  useEffect(() => {
    if (isOpen && session.status === 'running' && activeSound !== 'none') {
      ambientEngine.play(activeSound);
      ambientEngine.setVolume(soundVolume);
    } else {
      ambientEngine.stop();
    }
    return () => ambientEngine.stop();
  }, [isOpen, session.status, activeSound, soundVolume]);

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
        targetLoops: session.targetLoops || targetLoops,
        isLoopActive: session.isLoopActive
      });
    }
  }, [isRunning, isPaused, session.mode, session.currentLoop, session.targetLoops, session.isLoopActive, allTopics, selectedTopicId, focusDurationMinutes, breakDurationMinutes, customTimerMinutes, targetLoops, pauseTimer, resumeTimer, startTimer, openPermissionModal]);

  const handleSkipNext = useCallback(() => {
    soundManager.playClick();
    haptics.medium();
    if (session.isLoopActive && session.mode === 'pomodoro') {
      setSessionMode('break', breakDurationMinutes);
    } else if (session.isLoopActive && session.mode === 'break') {
      setSessionMode('pomodoro', focusDurationMinutes);
    } else {
      resetTimer();
    }
  }, [session.isLoopActive, session.mode, breakDurationMinutes, focusDurationMinutes, setSessionMode, resetTimer]);

  // MediaSession API Integration for Lock-Screen and Earbud Controls
  useEffect(() => {
    if (!isOpen && session.status === 'idle') {
      mediaSessionManager.clear();
      return;
    }

    const top = allTopics.find(t => t.topic.id === selectedTopicId);
    const minsLeft = Math.ceil(session.remainingSec / 60);

    mediaSessionManager.updateMetadata({
      title: session.mode === 'stopwatch'
        ? `Stopwatch (${formatTime(session.stopwatchElapsedSec)})`
        : `${session.mode.toUpperCase()} • ${minsLeft}m left`,
      artist: top ? `${top.topic.name} • ${top.subjectName}` : 'Deep Focus Chamber',
      album: activeSound !== 'none' ? `Ambience: ${activeSound.toUpperCase()}` : 'Focus Mode'
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
      },
      onNext: () => {
        handleSkipNext();
      }
    });
  }, [isOpen, session.status, session.remainingSec, session.stopwatchElapsedSec, session.mode, activeSound, selectedTopicId, isRunning, isPaused, handleTogglePlay, handleSkipNext, resetTimer, allTopics]);

  // Keyboard shortcut listener (Space = Play/Pause, Esc = Close, F = Fullscreen)
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
        } else if (isLoopModalOpen) {
          setIsLoopModalOpen(false);
        } else {
          onClose();
        }
      } else if (e.key === 'f' || e.key === 'F') {
        handleToggleFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleTogglePlay, handleToggleFullscreen, isTopicSearchOpen, isSettingsOpen, isLoopModalOpen, onClose]);

  const handleStartLoopFlow = () => {
    setIsLoopModalOpen(false);
    setIsSettingsOpen(false);
    soundManager.playClick();
    haptics.success();

    const top = allTopics.find(t => t.topic.id === selectedTopicId);
    startTimer({
      mode: 'pomodoro',
      durationMinutes: focusDurationMinutes,
      topicId: top?.topic.id,
      topicName: top?.topic.name,
      subjectName: top?.subjectName,
      currentLoop: 1,
      targetLoops,
      isLoopActive: true
    });
  };

  // Fast on-the-fly minute adjustment
  const handleQuickAdjust = (minutesDelta: number) => {
    soundManager.playClick();
    haptics.light();
    if (session.mode === 'pomodoro' && session.status === 'idle') {
      const next = Math.max(1, Math.min(180, focusDurationMinutes + minutesDelta));
      setFocusDurationMinutes(next);
      setSessionMode('pomodoro', next);
    } else if (session.mode === 'break' && session.status === 'idle') {
      const next = Math.max(1, Math.min(60, breakDurationMinutes + minutesDelta));
      setBreakDurationMinutes(next);
      setSessionMode('break', next);
    } else if (session.mode === 'timer' && session.status === 'idle') {
      const next = Math.max(1, Math.min(180, customTimerMinutes + minutesDelta));
      setCustomTimerMinutes(next);
      setSessionMode('timer', next);
    }
  };

  const handleApplyPreset = (minutes: number) => {
    soundManager.playClick();
    haptics.light();
    if (session.mode === 'pomodoro') {
      setFocusDurationMinutes(minutes);
      if (isIdle) setSessionMode('pomodoro', minutes);
    } else if (session.mode === 'break') {
      setBreakDurationMinutes(minutes);
      if (isIdle) setSessionMode('break', minutes);
    } else if (session.mode === 'timer') {
      setCustomTimerMinutes(minutes);
      if (isIdle) setSessionMode('timer', minutes);
    }
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

  // Dynamic mode theme and styling configuration
  const modeConfig = useMemo(() => {
    switch (session.mode) {
      case 'break':
        return {
          id: 'break' as TimerMode,
          label: 'Rest & Recovery',
          shortLabel: 'Break',
          icon: Coffee,
          gradStart: '#F59E0B',
          gradEnd: '#EF4444',
          accentColor: '#F59E0B',
          accentBorder: 'border-amber-500/30',
          accentBg: 'bg-amber-500/10 text-amber-400',
          glow: 'rgba(245, 158, 11, 0.45)',
          glowSoft: 'rgba(245, 158, 11, 0.15)',
          activeTabClass: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25',
          buttonGrad: 'linear-gradient(135deg, #F59E0B 0%, #EA580C 100%)',
          presets: [
            { mins: 5, label: '5m', tag: 'Quick' },
            { mins: 10, label: '10m', tag: 'Coffee' },
            { mins: 15, label: '15m', tag: 'Walk' },
            { mins: 20, label: '20m', tag: 'Recharge' }
          ]
        };
      case 'stopwatch':
        return {
          id: 'stopwatch' as TimerMode,
          label: 'Continuous Stopwatch',
          shortLabel: 'Stopwatch',
          icon: StopwatchIcon,
          gradStart: '#0EA5E9',
          gradEnd: '#6366F1',
          accentColor: '#0EA5E9',
          accentBorder: 'border-sky-500/30',
          accentBg: 'bg-sky-500/10 text-sky-400',
          glow: 'rgba(14, 165, 233, 0.45)',
          glowSoft: 'rgba(14, 165, 233, 0.15)',
          activeTabClass: 'bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-lg shadow-sky-500/25',
          buttonGrad: 'linear-gradient(135deg, #0EA5E9 0%, #6366F1 100%)',
          presets: []
        };
      case 'timer':
        return {
          id: 'timer' as TimerMode,
          label: 'Custom Countdown',
          shortLabel: 'Custom',
          icon: Clock,
          gradStart: '#8B5CF6',
          gradEnd: '#EC4899',
          accentColor: '#8B5CF6',
          accentBorder: 'border-violet-500/30',
          accentBg: 'bg-violet-500/10 text-violet-400',
          glow: 'rgba(139, 92, 246, 0.45)',
          glowSoft: 'rgba(139, 92, 246, 0.15)',
          activeTabClass: 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/25',
          buttonGrad: 'linear-gradient(135deg, #8B5CF6 0%, #D946EF 100%)',
          presets: [
            { mins: 10, label: '10m', tag: 'Sprint' },
            { mins: 20, label: '20m', tag: 'Drill' },
            { mins: 30, label: '30m', tag: 'Quiz' },
            { mins: 45, label: '45m', tag: 'Section' },
            { mins: 60, label: '60m', tag: 'Mock' }
          ]
        };
      case 'pomodoro':
      default:
        return {
          id: 'pomodoro' as TimerMode,
          label: 'Deep Focus Chamber',
          shortLabel: 'Pomodoro',
          icon: Zap,
          gradStart: '#10B981',
          gradEnd: '#06B6D4',
          accentColor: '#10B981',
          accentBorder: 'border-emerald-500/30',
          accentBg: 'bg-emerald-500/10 text-emerald-400',
          glow: 'rgba(16, 185, 129, 0.45)',
          glowSoft: 'rgba(16, 185, 129, 0.15)',
          activeTabClass: 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25',
          buttonGrad: 'linear-gradient(135deg, #10B981 0%, #06B6D4 100%)',
          presets: [
            { mins: 15, label: '15m', tag: 'Sprint' },
            { mins: 25, label: '25m', tag: 'Classic' },
            { mins: 45, label: '45m', tag: 'Deep' },
            { mins: 60, label: '60m', tag: 'Mastery' },
            { mins: 90, label: '90m', tag: 'Marathon' }
          ]
        };
    }
  }, [session.mode]);

  const currentDurationMins =
    session.mode === 'break'
      ? breakDurationMinutes
      : session.mode === 'timer'
      ? customTimerMinutes
      : focusDurationMinutes;

  if (!isOpen) return null;

  // Dial Geometry
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent * circumference);
  const tipAngle = (progressPercent * 360 - 90) * (Math.PI / 180);
  const tipX = 140 + radius * Math.cos(tipAngle);
  const tipY = 140 + radius * Math.sin(tipAngle);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] w-screen h-screen min-h-screen bg-[#06080F] text-slate-100 flex flex-col justify-between overflow-y-auto no-scrollbar font-sans select-none animate-fade-in"
      onClick={e => e.stopPropagation()}
    >
      {/* 🌌 Atmospheric Ambient Cosmic Background Glows */}
      <div
        className="fixed inset-0 pointer-events-none transition-all duration-1000 opacity-60"
        style={{
          background: `radial-gradient(circle at 50% 25%, ${modeConfig.glowSoft} 0%, transparent 65%)`
        }}
      />
      <div
        className="fixed -bottom-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-1000"
        style={{ background: modeConfig.gradEnd }}
      />
      <div
        className="fixed -top-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-1000"
        style={{ background: modeConfig.gradStart }}
      />

      {/* Subtle Tech Matrix Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px] opacity-70" />

      {/* 1. TOP HEADER TOOLBAR (Full Width, Sleek Glassmorphism) */}
      <header className="relative z-30 shrink-0 h-16 sm:h-18 px-4 sm:px-8 border-b border-white/[0.08] bg-black/40 backdrop-blur-xl flex items-center justify-between gap-3 sm:gap-6">
        
        {/* Left: Branding & Active Topic Selector */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <div
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center font-bold text-white shadow-md shadow-emerald-500/10 shrink-0 transition-transform active:scale-95"
            style={{ background: `linear-gradient(135deg, ${modeConfig.gradStart}, ${modeConfig.gradEnd})` }}
          >
            {React.createElement(modeConfig.icon || Zap, { className: 'w-4 h-4 sm:w-5 sm:h-5' })}
          </div>

          <div className="min-w-0 flex items-center gap-2 sm:gap-3">
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-sm sm:text-base font-black text-white tracking-tight leading-none truncate">
                  {isSettingsOpen ? 'Chamber Protocols' : modeConfig.label}
                </h1>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-white/10 text-white/90 border border-white/15">
                  Zen 3D
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-400 mt-1 flex items-center gap-1.5 truncate">
                <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ background: modeConfig.accentColor }} />
                <span>{session.isLoopActive ? `Loop ${session.currentLoop || 1}/${session.targetLoops || 4} Active` : 'Deep Study Chamber • +25 XP Boost'}</span>
              </p>
            </div>

            {/* Active Topic Capsule / Switcher */}
            <div className="relative hidden lg:block">
              <button
                type="button"
                onClick={() => setIsTopicSearchOpen(prev => !prev)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 text-xs text-slate-200 transition-all cursor-pointer active:scale-95"
                title="Click to Switch Topic"
              >
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: modeConfig.accentColor }} />
                <span className="font-semibold max-w-[220px] truncate">
                  {selectedTopic ? selectedTopic.topic.name : 'Select Study Topic'}
                </span>
                {selectedTopic && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-slate-300">
                    {selectedTopic.subjectName}
                  </span>
                )}
                <Search className="w-3 h-3 text-slate-400 ml-1" />
              </button>

              {/* Topic Search Dropdown Modal */}
              {isTopicSearchOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 rounded-2xl bg-[#0F111B] border border-white/15 shadow-2xl p-2.5 z-50 max-h-72 overflow-y-auto space-y-1 animate-scale-up">
                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-white/[0.06] border border-white/10 mb-2">
                    <Search className="w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search syllabus topic..."
                      value={topicSearchTerm}
                      onChange={e => setTopicSearchTerm(e.target.value)}
                      autoFocus
                      className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>
                  {filteredTopics.length === 0 ? (
                    <div className="p-3 text-center text-xs text-slate-500">No matching topics</div>
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
                        className={`w-full p-2.5 rounded-xl hover:bg-white/[0.08] flex items-center justify-between text-left text-xs transition-colors cursor-pointer ${
                          selectedTopicId === t.topic.id ? 'bg-white/[0.1] text-emerald-400' : 'text-slate-300'
                        }`}
                      >
                        <span className="font-semibold truncate">{t.topic.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono ml-2 shrink-0">{t.subjectName}</span>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Center: Mode Switcher Tabs (Desktop) */}
        <div className="hidden md:flex items-center p-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
          {[
            { id: 'pomodoro' as TimerMode, label: 'Pomodoro', icon: Zap },
            { id: 'break' as TimerMode, label: 'Break', icon: Coffee },
            { id: 'stopwatch' as TimerMode, label: 'Stopwatch', icon: StopwatchIcon },
            { id: 'timer' as TimerMode, label: 'Custom', icon: Clock }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = session.mode === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  haptics.selection();
                  let dur = focusDurationMinutes;
                  if (tab.id === 'break') dur = breakDurationMinutes;
                  else if (tab.id === 'timer') dur = customTimerMinutes;
                  setSessionMode(tab.id, dur);
                }}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer active:scale-95 ${
                  isActive
                    ? `${modeConfig.activeTabClass} font-black`
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Quick Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          
          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={handleToggleFullscreen}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
              isBrowserFullscreen
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-white/[0.05] hover:bg-white/10 text-slate-300 hover:text-white border border-white/10'
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
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
              isPiPActive
                ? 'bg-emerald-500 text-white shadow-md'
                : 'bg-white/[0.05] hover:bg-white/10 text-slate-300 hover:text-white border border-white/10'
            }`}
            title={isPiPActive ? 'Exit Floating Picture-in-Picture' : 'Popout Picture-in-Picture'}
            aria-label="Picture-in-Picture"
          >
            <PictureInPicture2 className="w-4 h-4" />
          </button>

          {/* Minimize to In-App Floating Pill */}
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              showFloatingOverlay();
              onClose();
            }}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/[0.05] hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 flex items-center justify-center transition-all cursor-pointer active:scale-95"
            title="Minimize to In-App Floating Capsule"
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
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
              isSettingsOpen
                ? 'bg-emerald-500 text-white shadow-md'
                : 'bg-white/[0.05] hover:bg-white/10 text-slate-300 hover:text-white border border-white/10'
            }`}
            title="Configure Focus Protocols"
            aria-label="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Exit Full Page Chamber */}
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              if (isRunning || isPaused) {
                showFloatingOverlay();
              }
              onClose();
            }}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 border border-rose-500/20 flex items-center justify-center cursor-pointer transition-all active:scale-95 ml-1"
            title="Exit Deep Focus Chamber (Esc)"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Mobile Mode Switcher Bar */}
      <div className="md:hidden px-4 pt-3 shrink-0 relative z-20">
        <div className="grid grid-cols-4 gap-1 p-1 rounded-2xl bg-white/[0.04] border border-white/10">
          {[
            { id: 'pomodoro' as TimerMode, label: 'Pomodoro', icon: Zap },
            { id: 'break' as TimerMode, label: 'Break', icon: Coffee },
            { id: 'stopwatch' as TimerMode, label: 'Stopwatch', icon: StopwatchIcon },
            { id: 'timer' as TimerMode, label: 'Custom', icon: Clock }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = session.mode === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  haptics.selection();
                  let dur = focusDurationMinutes;
                  if (tab.id === 'break') dur = breakDurationMinutes;
                  else if (tab.id === 'timer') dur = customTimerMinutes;
                  setSessionMode(tab.id, dur);
                }}
                className={`flex items-center justify-center gap-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? `${modeConfig.activeTabClass} font-black`
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. MAIN WORKSPACE VIEW */}
      {isSettingsOpen ? (
        /* SETTINGS OVERLAY */
        <main className="flex-1 max-w-2xl mx-auto w-full flex flex-col justify-center py-6 px-4 sm:px-6 relative z-20 animate-fade-in text-slate-100">
          <div className="p-6 rounded-3xl bg-[#0F111B]/95 border border-white/15 backdrop-blur-2xl shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <Settings className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-black text-white">Chamber Protocols & Durations</h2>
                  <p className="text-xs text-slate-400">Configure your optimal focus session</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsSettingsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Focus Duration */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-300">Focus Session Duration</span>
                <span className="text-emerald-400 font-mono text-sm">{focusDurationMinutes} min</span>
              </div>
              <input
                type="range"
                min="5"
                max="120"
                step="5"
                value={focusDurationMinutes}
                onChange={e => {
                  const val = Number(e.target.value);
                  setFocusDurationMinutes(val);
                  if (session.mode === 'pomodoro' && isIdle) {
                    setSessionMode('pomodoro', val);
                  }
                }}
                className="w-full accent-emerald-500 cursor-pointer h-2 bg-white/10 rounded-lg appearance-none"
              />
              <div className="flex gap-1.5 pt-1">
                {[15, 25, 45, 60, 90].map(mins => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => {
                      setFocusDurationMinutes(mins);
                      if (session.mode === 'pomodoro' && isIdle) setSessionMode('pomodoro', mins);
                    }}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                      focusDurationMinutes === mins
                        ? 'bg-emerald-500 text-white font-black'
                        : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {mins}m
                  </button>
                ))}
              </div>
            </div>

            {/* Break Duration */}
            <div className="space-y-2 pt-2 border-t border-white/5">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-300">Rest & Break Duration</span>
                <span className="text-amber-400 font-mono text-sm">{breakDurationMinutes} min</span>
              </div>
              <input
                type="range"
                min="2"
                max="30"
                step="1"
                value={breakDurationMinutes}
                onChange={e => {
                  const val = Number(e.target.value);
                  setBreakDurationMinutes(val);
                  if (session.mode === 'break' && isIdle) {
                    setSessionMode('break', val);
                  }
                }}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-white/10 rounded-lg appearance-none"
              />
              <div className="flex gap-1.5 pt-1">
                {[5, 10, 15, 20].map(mins => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => {
                      setBreakDurationMinutes(mins);
                      if (session.mode === 'break' && isIdle) setSessionMode('break', mins);
                    }}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                      breakDurationMinutes === mins
                        ? 'bg-amber-500 text-white font-black'
                        : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {mins}m
                  </button>
                ))}
              </div>
            </div>

            {/* Multi-Loop Cycle Protocol Button */}
            <div className="pt-3 space-y-2">
              <button
                type="button"
                onClick={() => setIsLoopModalOpen(true)}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-xs shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <Clock className="w-4 h-4" />
                <span>Configure Multi-Loop Cycles ({targetLoops} Iterations)</span>
              </button>

              <button
                type="button"
                onClick={() => setIsSettingsOpen(false)}
                className="w-full py-2.5 px-4 rounded-2xl bg-white/10 hover:bg-white/15 text-slate-200 font-bold text-xs flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-95"
              >
                <span>Return to Focus Chamber</span>
              </button>
            </div>
          </div>
        </main>
      ) : (
        /* HERO FULL-PAGE FOCUS SANCTUM */
        <main className="flex-1 max-w-4xl mx-auto w-full flex flex-col justify-between py-3 sm:py-6 px-4 sm:px-8 relative z-20 animate-fade-in">
          
          {/* 1. TOP PRESET BUTTONS & MICRO-ADJUSTMENTS */}
          <div className="flex items-center justify-between gap-2 shrink-0 py-1">
            {/* Presets */}
            {modeConfig.presets.length > 0 && (
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                {modeConfig.presets.map(p => {
                  const isCurrent = currentDurationMins === p.mins;
                  return (
                    <button
                      key={p.mins}
                      type="button"
                      onClick={() => handleApplyPreset(p.mins)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer active:scale-95 shrink-0 ${
                        isCurrent
                          ? 'bg-white text-slate-950 font-black shadow-md shadow-white/15 scale-[1.03]'
                          : 'bg-white/[0.05] hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white'
                      }`}
                    >
                      <span>{p.label}</span>
                      <span className="text-[10px] opacity-75 font-sans font-normal hidden xs:inline">({p.tag})</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Granular Micro-adjustments when idle */}
            {isIdle && session.mode !== 'stopwatch' && (
              <div className="flex items-center gap-1 shrink-0 ml-auto">
                {[-5, -1, 1, 5].map(delta => (
                  <button
                    key={delta}
                    type="button"
                    onClick={() => handleQuickAdjust(delta)}
                    className="px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/10 border border-white/10 text-[11px] font-mono font-bold text-slate-300 hover:text-white transition-all cursor-pointer active:scale-95 shrink-0"
                  >
                    {delta > 0 ? `+${delta}m` : `${delta}m`}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 2. MAJESTIC RADIAL DIAL CHRONOMETER */}
          <div className="flex flex-col items-center justify-center my-auto py-2 sm:py-6 relative shrink-0">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-92 lg:h-92 flex items-center justify-center">
              
              {/* SVG Radial Dial */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 280 280">
                <defs>
                  <linearGradient id="activeDialGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={modeConfig.gradStart} />
                    <stop offset="100%" stopColor={modeConfig.gradEnd} />
                  </linearGradient>

                  <filter id="dialNeonGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Outer Orbit Tick Ring */}
                <circle
                  cx="140"
                  cy="140"
                  r="134"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="3, 8"
                  className="text-white/10"
                  fill="transparent"
                />

                {/* Background Track Circle */}
                <circle
                  cx="140"
                  cy="140"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="9"
                  className="text-white/[0.07]"
                  fill="transparent"
                />

                {/* Active Progress Arc */}
                <circle
                  cx="140"
                  cy="140"
                  r={radius}
                  stroke="url(#activeDialGradient)"
                  strokeWidth="10"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  filter="url(#dialNeonGlow)"
                  fill="transparent"
                  className="transition-all duration-300 ease-out"
                />

                {/* Glowing Orbit Tip Orb */}
                {progressPercent > 0.005 && (
                  <circle
                    cx={tipX}
                    cy={tipY}
                    r="6.5"
                    fill={modeConfig.gradEnd}
                    className="animate-pulse"
                    style={{ filter: `drop-shadow(0 0 10px ${modeConfig.glow})` }}
                  />
                )}
              </svg>

              {/* Centered Digital Display */}
              <div className="absolute flex flex-col items-center justify-center text-center px-4">
                
                {/* Loop or Protocol Header Pill */}
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.08] border border-white/15 mb-2">
                  <span className="text-[11px] font-extrabold uppercase font-mono tracking-wider text-slate-300">
                    {session.mode === 'pomodoro' && session.isLoopActive
                      ? `LOOP ${session.currentLoop || 1} / ${session.targetLoops || 4}`
                      : modeConfig.label}
                  </span>
                </div>

                {/* Massive Bold Countdown Timer */}
                <span className="text-5xl sm:text-6xl lg:text-7xl font-black text-white font-mono tracking-tight tabular-nums drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
                  {session.mode === 'stopwatch'
                    ? formatTime(session.stopwatchElapsedSec)
                    : formatTime(session.remainingSec)}
                </span>
                
                {/* Status Indicator Badge */}
                <div className="flex items-center gap-2 mt-2 px-3.5 py-1 rounded-full bg-white/[0.08] border border-white/10">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isRunning
                        ? 'bg-emerald-400 animate-ping'
                        : isPaused
                        ? 'bg-amber-400'
                        : 'bg-slate-400'
                    }`}
                  />
                  <span className={`text-[11px] font-extrabold uppercase tracking-wider ${
                    isRunning
                      ? 'text-emerald-400'
                      : isPaused
                      ? 'text-amber-400'
                      : 'text-slate-300'
                  }`}>
                    {isRunning
                      ? (session.mode === 'break' ? 'Resting Interval' : 'Deep Focus Active')
                      : isPaused
                      ? 'Session Paused'
                      : 'Ready to Launch'}
                  </span>
                </div>

                {/* Micro Progress Readout */}
                <span className="text-[11px] sm:text-xs font-mono font-semibold text-slate-400 mt-1.5">
                  {session.mode === 'stopwatch'
                    ? 'Live Study Chrono'
                    : `${Math.round(progressPercent * 100)}% Complete • ${Math.ceil(session.remainingSec / 60)}m left`}
                </span>
              </div>
            </div>
          </div>

          {/* 3. PRIMARY ACTION COCKPIT */}
          <div className="flex items-center justify-center gap-4 shrink-0 py-2">
            
            {/* Reset Button */}
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                resetTimer();
              }}
              className="w-13 h-13 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer shadow-lg active:scale-95 flex items-center justify-center group"
              title="Reset Timer (R)"
              aria-label="Reset timer"
            >
              <RotateCcw className="w-5 h-5 group-hover:-rotate-90 transition-transform duration-300" />
            </button>

            {/* Hero Start / Pause Button */}
            <button
              type="button"
              onClick={handleTogglePlay}
              className="h-14 sm:h-15 px-8 sm:px-12 rounded-2xl font-black text-sm sm:text-base text-white shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer min-w-[220px] sm:min-w-[260px]"
              style={{
                background: isRunning
                  ? 'linear-gradient(135deg, #EF4444, #DC2626)'
                  : isPaused
                  ? 'linear-gradient(135deg, #10B981, #059669)'
                  : modeConfig.buttonGrad,
                boxShadow: `0 8px 30px ${modeConfig.glow}`
              }}
            >
              {isRunning ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
              <span>{isRunning ? 'Pause Focus' : isPaused ? 'Resume Focus' : 'Start Focus'}</span>
              <span className="text-[10px] font-mono opacity-80 px-2 py-0.5 rounded-full bg-black/30 text-white font-normal ml-1 hidden sm:inline">
                Space
              </span>
            </button>

            {/* Skip / Next Interval Button */}
            <button
              type="button"
              onClick={handleSkipNext}
              className="w-13 h-13 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer shadow-lg active:scale-95 flex items-center justify-center"
              title={session.isLoopActive ? 'Skip to Next Interval' : 'Finish / Skip Timer'}
              aria-label="Skip interval"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          {/* 4. AMBIENT SOUNDSCAPES DECK */}
          <div className="p-3.5 sm:p-4 rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md space-y-2.5 shadow-xl shrink-0 mt-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300">
              <div className="flex items-center gap-2">
                <Headphones className="w-4 h-4 text-emerald-400" />
                <span className="text-white font-semibold">Ambience Soundscapes</span>
              </div>

              <div className="flex items-center gap-3">
                {/* Real-time Animated Equalizer Waveform */}
                {isRunning && activeSound !== 'none' && (
                  <div className="flex items-end gap-1 h-3.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                    <span className="w-1 h-3 bg-emerald-400 rounded-full animate-bounce" />
                    <span className="w-1 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.15s]" />
                    <span className="w-1 h-3 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.3s]" />
                  </div>
                )}

                {/* Volume Slider */}
                <div className="flex items-center gap-2">
                  <Volume2 className="w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={soundVolume}
                    onChange={e => setSoundVolume(Number(e.target.value))}
                    className="w-20 sm:w-28 h-1.5 bg-white/15 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                    title={`Volume: ${Math.round(soundVolume * 100)}%`}
                  />
                  <span className="text-[10px] font-mono text-slate-400 w-7 text-right">
                    {Math.round(soundVolume * 100)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Sound Chips Grid */}
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
              {[
                { id: 'rain' as AmbientSoundType, label: 'Rain', icon: CloudRain },
                { id: 'ocean' as AmbientSoundType, label: 'Ocean', icon: Waves },
                { id: 'binaural' as AmbientSoundType, label: 'Alpha', icon: Brain },
                { id: 'fireplace' as AmbientSoundType, label: 'Campfire', icon: Flame },
                { id: 'none' as AmbientSoundType, label: 'Mute', icon: VolumeX }
              ].map(snd => {
                const SndIcon = snd.icon;
                const isSndActive = activeSound === snd.id;
                return (
                  <button
                    key={snd.id}
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setActiveSound(snd.id);
                    }}
                    className={`py-2 px-1 text-xs font-bold rounded-xl cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-1.5 ${
                      isSndActive
                        ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 text-emerald-300 font-black shadow-md'
                        : 'bg-white/[0.04] border border-white/5 text-slate-400 hover:text-white hover:bg-white/[0.08]'
                    }`}
                  >
                    <SndIcon className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{snd.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. BOTTOM BENTO METRICS BAR */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 pt-2 shrink-0">
            {/* Target Card */}
            <div
              onClick={() => setIsTopicSearchOpen(true)}
              className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/20 transition-all cursor-pointer flex items-center justify-between"
              title="Click to Switch Target Topic"
            >
              <div className="min-w-0">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold flex items-center gap-1">
                  <Target className="w-3 h-3 text-emerald-400" />
                  <span>Target Study Topic</span>
                </span>
                <p className="text-xs font-bold text-white truncate mt-0.5">
                  {selectedTopic ? selectedTopic.topic.name : 'General Focus Session'}
                </p>
              </div>
              <span className="text-[10px] font-bold text-slate-400 px-2 py-1 rounded bg-white/5 shrink-0 ml-2">
                Switch
              </span>
            </div>

            {/* Cycles Protocol Card */}
            <div
              onClick={() => setIsLoopModalOpen(true)}
              className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/20 transition-all cursor-pointer flex items-center justify-between"
              title="Configure Multi-Loop Cycles"
            >
              <div className="min-w-0">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>Cycles Protocol</span>
                </span>
                <p className="text-xs font-bold text-white truncate mt-0.5">
                  {session.isLoopActive
                    ? `${session.currentLoop || 1} of ${session.targetLoops || 4} Loops Active`
                    : `${targetLoops} Loops Set`}
                </p>
              </div>
              <span className="text-[10px] font-bold text-slate-400 px-2 py-1 rounded bg-white/5 shrink-0 ml-2">
                Edit
              </span>
            </div>

            {/* Rewards & Boost Card */}
            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between">
              <div className="min-w-0">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold flex items-center gap-1">
                  <Award className="w-3 h-3 text-cyan-400" />
                  <span>Session Reward</span>
                </span>
                <p className="text-xs font-black text-emerald-400 font-mono truncate mt-0.5">
                  +25 XP Boost • Streak Multiplier
                </p>
              </div>
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            </div>
          </div>
        </main>
      )}

      {/* 3. MULTI-LOOP POMODORO PROTOCOL MODAL */}
      {isLoopModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-sm rounded-3xl bg-[#0F111B] border border-white/20 shadow-2xl p-6 space-y-4 animate-scale-up">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-white tracking-tight">Multi-Loop Study Protocol</h3>
                <p className="text-xs text-slate-400">Automatic Focus & Rest Cycles</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              How many focus + rest cycles would you like to run in this deep session?
            </p>

            {/* Counter with +/- buttons */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.04] border border-white/10">
              <button
                type="button"
                onClick={() => setTargetLoops(prev => Math.max(1, prev - 1))}
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white cursor-pointer active:scale-95 shadow-sm"
                aria-label="Decrease loops"
              >
                <Minus className="w-4 h-4" />
              </button>

              <div className="text-center">
                <span className="text-3xl font-black font-mono text-white tabular-nums">
                  {targetLoops}
                </span>
                <span className="text-[10px] text-slate-400 font-mono block font-bold uppercase tracking-wider">
                  Cycles
                </span>
              </div>

              <button
                type="button"
                onClick={() => setTargetLoops(prev => Math.min(12, prev + 1))}
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white cursor-pointer active:scale-95 shadow-sm"
                aria-label="Increase loops"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Estimated Duration Calculation */}
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300">
              Total Study Time: <strong className="font-mono text-white">{targetLoops * focusDurationMinutes}m</strong> focus + <strong className="font-mono text-white">{targetLoops * breakDurationMinutes}m</strong> rest = <strong className="font-mono text-white">{Math.round((targetLoops * (focusDurationMinutes + breakDurationMinutes)) / 60 * 10) / 10} hrs</strong>.
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setIsLoopModalOpen(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleStartLoopFlow}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white text-xs font-black shadow-lg shadow-emerald-500/25 transition-all cursor-pointer active:scale-95"
              >
                Launch Protocol
              </button>
            </div>
          </div>
        </div>
      )}
    </div>,
    document.body
  );
};
