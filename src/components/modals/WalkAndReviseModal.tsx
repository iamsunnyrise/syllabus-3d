import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  X,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  RotateCcw,
  CheckCircle2,
  Lock,
  Unlock,
  FastForward,
  Flame,
  Radio,
  Sparkles,
  Layers,
  ChevronRight,
  Headphones,
  Footprints,
  BookOpen
} from 'lucide-react';
import { useSyllabus } from '../../context/SyllabusContext';
import { getAudioBlobUrl, revokeAudioBlobUrl } from '../../utils/audioStorage';
import { soundManager } from '../../utils/soundEffects';
import { haptics } from '../../utils/haptics';
import { Topic, TopicAudioMemo } from '../../types/syllabus';

interface WalkAndReviseModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSubjectName?: string;
  initialTopicId?: string;
}

type PlaylistFilter = 'due' | 'weak' | 'all';

export const WalkAndReviseModal: React.FC<WalkAndReviseModalProps> = ({
  isOpen,
  onClose,
  initialSubjectName,
  initialTopicId
}) => {
  const {
    allTopics,
    dueRevisions,
    weakTopics,
    completeRevisionCard,
    updateTopicStatus
  } = useSyllabus();

  // Playlist Filter State
  const [filterMode, setFilterMode] = useState<PlaylistFilter>(
    dueRevisions.length > 0 ? 'due' : 'all'
  );
  const [selectedSubject, setSelectedSubject] = useState<string>(initialSubjectName || 'all');

  // Player State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [autoAdvance, setAutoAdvance] = useState<boolean>(true);
  const [isPocketMode, setIsPocketMode] = useState<boolean>(false);
  const [pocketUnlockTaps, setPocketUnlockTaps] = useState<number>(0);
  const [audioSourceType, setAudioSourceType] = useState<'memo' | 'tts'>('tts');
  const [activeMemoUrl, setActiveMemoUrl] = useState<string | null>(null);
  const [progressPercent, setProgressPercent] = useState<number>(0);

  // Audio & Speech Synthesis References
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const progressTimerRef = useRef<number | null>(null);

  // 1. Build the Active Walk & Revise Playlist
  const playlist = useMemo(() => {
    let pool = allTopics;

    if (filterMode === 'due') {
      const dueIds = new Set(dueRevisions.map(dr => dr.topicId));
      pool = allTopics.filter(at => dueIds.has(at.topic.id));
    } else if (filterMode === 'weak') {
      const weakIds = new Set(weakTopics.map(wt => wt.topic.id));
      pool = allTopics.filter(at => weakIds.has(at.topic.id) || at.topic.isWeak);
    }

    if (selectedSubject !== 'all') {
      pool = pool.filter(at => at.subjectName === selectedSubject);
    }

    // Fallback if filter has 0 results
    if (pool.length === 0) {
      pool = allTopics.slice(0, 20);
    }

    return pool;
  }, [allTopics, dueRevisions, weakTopics, filterMode, selectedSubject]);

  // Set initial topic if provided
  useEffect(() => {
    if (initialTopicId && playlist.length > 0) {
      const idx = playlist.findIndex(p => p.topic.id === initialTopicId);
      if (idx !== -1) {
        setCurrentIndex(idx);
      }
    }
  }, [initialTopicId, playlist]);

  const currentItem = playlist[currentIndex] || playlist[0];

  // Subjects for filtering
  const availableSubjects = useMemo(() => {
    const set = new Set<string>();
    allTopics.forEach(at => {
      if (at.subjectName) set.add(at.subjectName);
    });
    return Array.from(set);
  }, [allTopics]);

  // Clean narration text helper (strips markdown formatting)
  const getNarrationText = useCallback((topic: Topic, subject: string, chapter: string) => {
    let script = `Subject: ${subject}. Chapter: ${chapter}. Topic: ${topic.name}. `;
    if (topic.subtopics && topic.subtopics.length > 0) {
      script += `Key points to master: ${topic.subtopics.join(', ')}. `;
    }
    if (topic.notes && topic.notes.trim()) {
      const plainNotes = topic.notes
        .replace(/#+\s/g, '')
        .replace(/\*\*|\*/g, '')
        .replace(/`{1,3}[^`]*`{1,3}/g, '')
        .slice(0, 500);
      script += `Summary notes: ${plainNotes}`;
    }
    return script;
  }, []);

  // Stop any active audio or speech
  const stopCurrentAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
    setProgressPercent(0);
  }, []);

  // Handle Playback for Current Track
  const playTrack = useCallback(async (index: number) => {
    stopCurrentAudio();
    const item = playlist[index];
    if (!item) return;

    // Check if topic has a student-recorded audio memo
    const hasVoiceMemo = item.topic.audioMemos && item.topic.audioMemos.length > 0;
    const memo: TopicAudioMemo | undefined = hasVoiceMemo ? item.topic.audioMemos![0] : undefined;

    if (memo && (memo.storageKey || memo.audioDataUrl)) {
      setAudioSourceType('memo');
      let url = memo.audioDataUrl || null;
      if (!url && memo.storageKey) {
        url = await getAudioBlobUrl(memo.storageKey);
      }

      if (url) {
        setActiveMemoUrl(url);
        if (!audioRef.current) {
          audioRef.current = new Audio();
        }
        audioRef.current.src = url;
        audioRef.current.playbackRate = playbackSpeed;

        audioRef.current.onended = () => {
          if (autoAdvance && index + 1 < playlist.length) {
            setCurrentIndex(prev => prev + 1);
          } else {
            setIsPlaying(false);
          }
        };

        audioRef.current.ontimeupdate = () => {
          if (audioRef.current && audioRef.current.duration) {
            setProgressPercent((audioRef.current.currentTime / audioRef.current.duration) * 100);
          }
        };

        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (err) {
          console.warn('Audio play failed, falling back to speech synthesis', err);
          playWithSpeechSynthesis(item, index);
        }
        return;
      }
    }

    // Fallback to Native Speech Synthesis
    playWithSpeechSynthesis(item, index);
  }, [playlist, playbackSpeed, autoAdvance, stopCurrentAudio]);

  // Play using Web Speech Synthesis API
  const playWithSpeechSynthesis = (item: typeof playlist[0], index: number) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported');
      return;
    }

    setAudioSourceType('tts');
    const text = getNarrationText(item.topic, item.subjectName, item.chapterName);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = playbackSpeed;
    utterance.pitch = 1.0;

    // Pick best available voice (English/Hindi preferred)
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang.startsWith('en') || v.lang.startsWith('hi'));
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onend = () => {
      setIsPlaying(false);
      setProgressPercent(100);
      if (autoAdvance && index + 1 < playlist.length) {
        setTimeout(() => {
          setCurrentIndex(prev => prev + 1);
        }, 800);
      }
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis error:', e);
      setIsPlaying(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);

    // Approximate speech progress bar
    const estimatedDurationMs = (text.length / 15) * (1000 / playbackSpeed);
    const startTime = Date.now();
    progressTimerRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(95, (elapsed / estimatedDurationMs) * 100);
      setProgressPercent(pct);
    }, 500);
  };

  // 2. Lock-Screen & Headphone Hardware Controls (MediaSession API)
  useEffect(() => {
    if (typeof window !== 'undefined' && 'mediaSession' in navigator && currentItem) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentItem.topic.name,
        artist: `${currentItem.subjectName} · ${currentItem.chapterName}`,
        album: 'Syllabus 3D Walk & Revise',
        artwork: [
          { src: '/logo.png', sizes: '192x192', type: 'image/png' }
        ]
      });

      navigator.mediaSession.setActionHandler('play', () => {
        setIsPlaying(true);
        if (audioRef.current && audioSourceType === 'memo') {
          audioRef.current.play();
        } else {
          playTrack(currentIndex);
        }
      });

      navigator.mediaSession.setActionHandler('pause', () => {
        setIsPlaying(false);
        if (audioRef.current && audioSourceType === 'memo') {
          audioRef.current.pause();
        }
        if (window.speechSynthesis) {
          window.speechSynthesis.pause();
        }
      });

      navigator.mediaSession.setActionHandler('previoustrack', () => {
        handlePrev();
      });

      navigator.mediaSession.setActionHandler('nexttrack', () => {
        handleNext();
      });
    }
  }, [currentItem, audioSourceType, currentIndex]);

  // Track changes trigger auto-play when modal is active
  useEffect(() => {
    if (isOpen && playlist.length > 0) {
      playTrack(currentIndex);
    }
    return () => {
      stopCurrentAudio();
    };
  }, [currentIndex, isOpen]);

  // Toggle Play / Pause
  const handleTogglePlay = () => {
    soundManager.playClick();
    haptics.light();

    if (isPlaying) {
      setIsPlaying(false);
      if (audioRef.current && audioSourceType === 'memo') {
        audioRef.current.pause();
      }
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.pause();
      }
    } else {
      setIsPlaying(true);
      if (audioRef.current && audioSourceType === 'memo' && audioRef.current.src) {
        audioRef.current.play();
      } else if (typeof window !== 'undefined' && window.speechSynthesis && window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      } else {
        playTrack(currentIndex);
      }
    }
  };

  const handleNext = () => {
    soundManager.playClick();
    haptics.light();
    if (currentIndex + 1 < playlist.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0); // loop
    }
  };

  const handlePrev = () => {
    soundManager.playClick();
    haptics.light();
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      setCurrentIndex(playlist.length - 1);
    }
  };

  const handleSpeedChange = () => {
    soundManager.playClick();
    haptics.selection();
    const speeds = [0.75, 1.0, 1.25, 1.5, 2.0];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    const nextSpeed = speeds[nextIdx];
    setPlaybackSpeed(nextSpeed);

    if (audioRef.current) {
      audioRef.current.playbackRate = nextSpeed;
    }
    // If TTS is playing, restart with new speed
    if (isPlaying && audioSourceType === 'tts') {
      playTrack(currentIndex);
    }
  };

  // 1-Tap "Mark as Revised" while walking
  const handleMarkRevised = () => {
    soundManager.playCompleteChime();
    haptics.success();

    if (currentItem) {
      // Find matching revision record if due
      const rev = dueRevisions.find(dr => dr.topicId === currentItem.topic.id);
      if (rev) {
        completeRevisionCard(rev.id, 'good');
      } else {
        updateTopicStatus(currentItem.topic.id, 'completed');
      }
    }

    // Auto advance to next topic
    handleNext();
  };

  // Clean up on unmount or close
  const handleClose = () => {
    stopCurrentAudio();
    if (activeMemoUrl) {
      revokeAudioBlobUrl(activeMemoUrl);
    }
    onClose();
  };

  if (!isOpen) return null;

  // 3. OLED / Pocket Mode View (Pure Black, Anti-Pocket Touch, Minimal Battery Use)
  if (isPocketMode) {
    return (
      <div className="fixed inset-0 z-50 bg-black text-white flex flex-col justify-between p-6 select-none animate-fade-in">
        {/* Top Status */}
        <div className="flex items-center justify-between opacity-50">
          <div className="flex items-center gap-2 text-xs font-mono">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>Pocket Mode Active</span>
          </div>
          <span className="text-xs font-mono">{currentItem?.subjectName}</span>
        </div>

        {/* Center Minimal Topic HUD */}
        <div className="text-center space-y-4 max-w-sm mx-auto">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-500">
            Now Revise Hands-Free ({currentIndex + 1}/{playlist.length})
          </p>
          <h2 className="text-2xl font-black tracking-tight leading-snug">
            {currentItem?.topic.name}
          </h2>
          <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
            <span>{currentItem?.chapterName}</span>
          </div>

          {/* Simple Big Touch Zones for Pocket */}
          <div className="flex items-center justify-center gap-6 pt-6">
            <button
              onClick={handlePrev}
              className="p-5 rounded-3xl bg-white/10 active:bg-white/20 transition-colors cursor-pointer"
            >
              <SkipBack className="w-7 h-7" />
            </button>

            <button
              onClick={handleTogglePlay}
              className="p-7 rounded-full bg-emerald-500 text-black active:scale-95 transition-transform cursor-pointer"
            >
              {isPlaying ? <Pause className="w-8 h-8 fill-black" /> : <Play className="w-8 h-8 fill-black ml-1" />}
            </button>

            <button
              onClick={handleNext}
              className="p-5 rounded-3xl bg-white/10 active:bg-white/20 transition-colors cursor-pointer"
            >
              <SkipForward className="w-7 h-7" />
            </button>
          </div>
        </div>

        {/* Bottom Unlock Trigger (Double tap to prevent pocket unlock) */}
        <div className="text-center pb-4">
          <button
            onClick={() => {
              soundManager.playClick();
              haptics.light();
              if (pocketUnlockTaps >= 1) {
                setIsPocketMode(false);
                setPocketUnlockTaps(0);
              } else {
                setPocketUnlockTaps(prev => prev + 1);
                setTimeout(() => setPocketUnlockTaps(0), 1500);
              }
            }}
            className="px-5 py-3 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-slate-300 active:scale-95 transition-all"
          >
            {pocketUnlockTaps >= 1 ? '🔓 Tap once more to Unlock' : '🔒 Double-Tap to Exit Pocket Mode'}
          </button>
        </div>
      </div>
    );
  }

  // 4. Standard Rich Walk & Revise Player Modal
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 select-none animate-fade-in">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-xl transition-opacity"
      />

      {/* Main Glass Shell */}
      <div className="relative w-full max-w-lg bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/[0.08] rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-white/[0.06] bg-slate-50/50 dark:bg-white/[0.02]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/25 flex items-center justify-center shrink-0">
              <Footprints className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-black text-slate-900 dark:text-white tracking-tight">
                  Walk & Revise Mode
                </h3>
                <span className="px-1.5 py-0.2 rounded-md text-[9px] font-mono font-black bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/30">
                  Hands-Free
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                Audio revision for terrace walks & commuting
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Pocket Mode Trigger */}
            <button
              onClick={() => {
                soundManager.playClick();
                haptics.light();
                setIsPocketMode(true);
              }}
              className="h-8 px-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.1] text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/[0.08] text-xs font-bold flex items-center gap-1 cursor-pointer active:scale-95 transition-all"
              title="Activate OLED Battery-Saving Pocket Mode"
            >
              <Lock className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Pocket Mode</span>
            </button>

            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Playlist Filter Selector */}
        <div className="px-4 pt-3 pb-2 border-b border-slate-100 dark:border-white/[0.04] space-y-2">
          <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar no-scrollbar">
            <button
              onClick={() => setFilterMode('due')}
              className={`px-3 py-1 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                filterMode === 'due'
                  ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                  : 'bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 border border-transparent'
              }`}
            >
              Due Revisions ({dueRevisions.length})
            </button>

            <button
              onClick={() => setFilterMode('weak')}
              className={`px-3 py-1 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                filterMode === 'weak'
                  ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                  : 'bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 border border-transparent'
              }`}
            >
              Weak Topics ({weakTopics.length})
            </button>

            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                filterMode === 'all'
                  ? 'bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30'
                  : 'bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 border border-transparent'
              }`}
            >
              All Topics ({allTopics.length})
            </button>
          </div>
        </div>

        {/* Central Audio Player Deck */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto custom-scrollbar flex-1">
          
          {/* Animated Waveform / Ambient Badge */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-500/10 via-indigo-500/5 to-cyan-500/10 border border-purple-500/20 text-center space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold flex items-center gap-1.5 ${
                audioSourceType === 'memo'
                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                  : 'bg-blue-500/15 text-blue-600 dark:text-[#7AA2F7] border border-blue-500/30'
              }`}>
                {audioSourceType === 'memo' ? (
                  <>
                    <Volume2 className="w-3 h-3" />
                    <span>Your Voice Memo</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3 h-3" />
                    <span>AI Speech Narration</span>
                  </>
                )}
              </span>

              <span className="text-[10px] font-mono font-bold text-slate-400">
                {currentIndex + 1} of {playlist.length}
              </span>
            </div>

            {/* Topic Info */}
            <div className="space-y-1 min-w-0">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                {currentItem?.subjectName} · {currentItem?.chapterName}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight line-clamp-2">
                {currentItem?.topic.name}
              </h2>
            </div>

            {/* Audio Progress Bar */}
            <div className="w-full bg-slate-200 dark:bg-white/[0.08] h-1.5 rounded-full overflow-hidden mt-3">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Player Controls */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 pt-2">
            <button
              onClick={handlePrev}
              className="p-3 rounded-2xl bg-slate-100 dark:bg-[#191C2C] text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-white/[0.1] border border-slate-200/80 dark:border-white/[0.08] active:scale-95 transition-all cursor-pointer"
              title="Previous Topic"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              onClick={handleTogglePlay}
              className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-purple-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-7 h-7 fill-white" />
              ) : (
                <Play className="w-7 h-7 fill-white ml-1" />
              )}
            </button>

            <button
              onClick={handleNext}
              className="p-3 rounded-2xl bg-slate-100 dark:bg-[#191C2C] text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-white/[0.1] border border-slate-200/80 dark:border-white/[0.08] active:scale-95 transition-all cursor-pointer"
              title="Next Topic"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          {/* Auxiliary Controls: Speed, Auto-advance, 1-Tap Revise */}
          <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-white/[0.06]">
            {/* Speed Multiplier */}
            <button
              type="button"
              onClick={handleSpeedChange}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#191C2C] border border-slate-200/80 dark:border-white/[0.08] text-xs font-mono font-bold text-slate-700 dark:text-slate-300 active:scale-95 cursor-pointer"
              title="Change Speed"
            >
              {playbackSpeed}x Speed
            </button>

            {/* Auto Advance Toggle */}
            <button
              type="button"
              onClick={() => setAutoAdvance(prev => !prev)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                autoAdvance
                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                  : 'bg-slate-100 dark:bg-[#191C2C] text-slate-500 border-slate-200/80 dark:border-white/[0.08]'
              }`}
            >
              Auto-Next: {autoAdvance ? 'ON' : 'OFF'}
            </button>

            {/* 1-Tap Mark Revised */}
            <button
              type="button"
              onClick={handleMarkRevised}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black flex items-center gap-1.5 shadow-xs active:scale-95 cursor-pointer"
              title="Mark this topic as reviewed and advance"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Mark Revised</span>
            </button>
          </div>
        </div>

        {/* Lock Screen Earphone Tip Footer */}
        <div className="p-3 border-t border-slate-100 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.01] text-center text-[10.5px] font-mono text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2">
          <Headphones className="w-3.5 h-3.5 text-purple-500 shrink-0" />
          <span>Lock screen & earphone hardware buttons (play/next) fully supported</span>
        </div>
      </div>
    </div>
  );
};
