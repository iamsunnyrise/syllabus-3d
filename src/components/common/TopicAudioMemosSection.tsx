import React, { useState, useRef, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Play,
  Pause,
  Trash2,
  Download,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Volume2,
  Square,
  Sparkles,
  X,
  FastForward,
  RotateCcw
} from 'lucide-react';
import { TopicAudioMemo } from '../../types/syllabus';
import { saveAudioToStorage, getAudioBlobUrl, deleteAudioFromStorage, downloadAudioFile } from '../../utils/audioStorage';
import { soundManager } from '../../utils/soundEffects';

interface TopicAudioMemosSectionProps {
  topicId: string;
  topicName: string;
  audioMemos?: TopicAudioMemo[];
  onAddAudioMemo: (memo: {
    title: string;
    durationSeconds: number;
    storageKey?: string;
    audioDataUrl?: string;
    transcript?: string;
  }) => void;
  onDeleteAudioMemo: (memoId: string) => void;
  onInsertTranscriptToNotes?: (text: string) => void;
}

export const TopicAudioMemosSection: React.FC<TopicAudioMemosSectionProps> = ({
  topicId,
  topicName,
  audioMemos = [],
  onAddAudioMemo,
  onDeleteAudioMemo,
  onInsertTranscriptToNotes
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [recordingTitle, setRecordingTitle] = useState('');
  const [recordingTranscript, setRecordingTranscript] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);
  
  // Recorded Audio Review State
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [previewAudioUrl, setPreviewAudioUrl] = useState<string | null>(null);

  // Active playing memo ID & state
  const [playingMemoId, setPlayingMemoId] = useState<string | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<any>(null);
  const recognitionRef = useRef<any>(null);
  const activeAudioElementRef = useRef<HTMLAudioElement | null>(null);

  // Track Blob URLs loaded from IndexedDB for each memo
  const [loadedAudioUrls, setLoadedAudioUrls] = useState<Record<string, string>>({});

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (activeAudioElementRef.current) {
        activeAudioElementRef.current.pause();
      }
    };
  }, []);

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Start Recording Audio
  const handleStartRecording = async () => {
    try {
      soundManager.playClick();
      setErrorMessage(null);
      setRecordingTranscript('');
      setRecordingTitle(`Voice Memo #${audioMemos.length + 1} - ${topicName}`);
      audioChunksRef.current = [];

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setRecordedBlob(audioBlob);
        const previewUrl = URL.createObjectURL(audioBlob);
        setPreviewAudioUrl(previewUrl);
        // Stop media tracks
        stream.getTracks().forEach(track => track.stop());
      };

      // Optional Web Speech API for live speech-to-text transcription
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition();
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.lang = 'en-IN'; // Supports English / Hinglish

          recognition.onresult = (event: any) => {
            let currentTranscript = '';
            for (let i = 0; i < event.results.length; i++) {
              currentTranscript += event.results[i][0].transcript + ' ';
            }
            setRecordingTranscript(currentTranscript.trim());
          };

          recognition.onerror = () => {};
          recognition.start();
          recognitionRef.current = recognition;
        } catch {
          // Speech recognition optional fallback
        }
      }

      mediaRecorder.start(250);
      setIsRecording(true);
      setRecordingSeconds(0);

      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds(prev => prev + 1);
      }, 1000);

    } catch (err) {
      console.error('Microphone access denied:', err);
      setErrorMessage('Microphone access denied. Please grant microphone permissions in your browser.');
      setTimeout(() => setErrorMessage(null), 4000);
    }
  };

  // Stop Recording Audio
  const handleStopRecording = () => {
    soundManager.playClick();
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  // Cancel & Discard Recording
  const handleDiscardRecording = () => {
    soundManager.playClick();
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    setRecordedBlob(null);
    setPreviewAudioUrl(null);
    setRecordingSeconds(0);
    setRecordingTranscript('');
  };

  // Save Recorded Voice Note to IndexedDB & Context
  const handleSaveVoiceNote = async () => {
    if (!recordedBlob) return;

    try {
      const memoId = `audio_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const finalTitle = recordingTitle.trim() || `Voice Memo #${audioMemos.length + 1}`;

      // Save to IndexedDB
      await saveAudioToStorage(memoId, recordedBlob, finalTitle, recordingSeconds);

      onAddAudioMemo({
        title: finalTitle,
        durationSeconds: recordingSeconds,
        storageKey: memoId,
        transcript: recordingTranscript.trim() || undefined
      });

      soundManager.playCompleteChime();
      setSuccessNotice(`Saved voice note: "${finalTitle}"`);
      setTimeout(() => setSuccessNotice(null), 3000);

      // Reset state
      setRecordedBlob(null);
      setPreviewAudioUrl(null);
      setRecordingSeconds(0);
      setRecordingTranscript('');
    } catch (err) {
      console.error('Failed to save audio memo:', err);
      setErrorMessage('Failed to save audio memo to storage.');
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  // Play Audio Memo
  const handleTogglePlayMemo = async (memo: TopicAudioMemo) => {
    if (playingMemoId === memo.id) {
      // Pause
      if (activeAudioElementRef.current) {
        activeAudioElementRef.current.pause();
      }
      setPlayingMemoId(null);
      return;
    }

    soundManager.playClick();

    // Get Blob URL
    let url = loadedAudioUrls[memo.id];
    if (!url) {
      if (memo.audioDataUrl) {
        url = memo.audioDataUrl;
      } else if (memo.storageKey) {
        const fetchedUrl = await getAudioBlobUrl(memo.storageKey);
        if (fetchedUrl) {
          url = fetchedUrl;
          setLoadedAudioUrls(prev => ({ ...prev, [memo.id]: fetchedUrl }));
        }
      }
    }

    if (!url) {
      setErrorMessage('Audio file not found.');
      setTimeout(() => setErrorMessage(null), 2500);
      return;
    }

    if (activeAudioElementRef.current) {
      activeAudioElementRef.current.pause();
    }

    const audio = new Audio(url);
    audio.playbackRate = playbackSpeed;
    activeAudioElementRef.current = audio;

    audio.onended = () => {
      setPlayingMemoId(null);
    };

    audio.onerror = () => {
      setPlayingMemoId(null);
      setErrorMessage('Failed to play audio memo.');
      setTimeout(() => setErrorMessage(null), 2500);
    };

    audio.play();
    setPlayingMemoId(memo.id);
  };

  // Change Playback Speed
  const handleCyclePlaybackSpeed = () => {
    soundManager.playClick();
    const speeds = [1.0, 1.25, 1.5, 2.0];
    const nextIndex = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    const nextSpeed = speeds[nextIndex];
    setPlaybackSpeed(nextSpeed);
    if (activeAudioElementRef.current) {
      activeAudioElementRef.current.playbackRate = nextSpeed;
    }
  };

  // Download Memo Audio File
  const handleDownloadMemo = async (e: React.MouseEvent, memo: TopicAudioMemo) => {
    e.stopPropagation();
    let url = loadedAudioUrls[memo.id];
    if (!url && memo.storageKey) {
      url = (await getAudioBlobUrl(memo.storageKey)) || '';
    }
    if (url) {
      downloadAudioFile(url, `${memo.title}.webm`);
    }
  };

  // Delete Voice Note
  const handleDeleteMemo = async (e: React.MouseEvent, memoId: string, storageKey?: string) => {
    e.stopPropagation();
    if (storageKey) {
      await deleteAudioFromStorage(storageKey);
    }
    onDeleteAudioMemo(memoId);
    setDeletingId(null);
    if (playingMemoId === memoId && activeAudioElementRef.current) {
      activeAudioElementRef.current.pause();
      setPlayingMemoId(null);
    }
  };

  return (
    <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-[#181822] border border-slate-200/80 dark:border-white/[0.08] shadow-xs overflow-hidden">
      {/* Executive Top Accent Gradient */}
      <div className="h-1 w-full bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 opacity-90" />

      <div className="p-4 sm:p-5 space-y-4">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-100 dark:border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 flex items-center justify-center shrink-0 shadow-xs">
              <Mic className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm sm:text-base font-bold font-sans text-slate-900 dark:text-slate-100 tracking-tight">
                  Voice Notes & Audio Memos
                </h4>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold tabular-nums bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                  {audioMemos.length} {audioMemos.length === 1 ? 'Note' : 'Notes'}
                </span>
              </div>
              <p className="text-[11px] font-sans text-slate-400 dark:text-slate-500">
                Record formula tricks, quick audio summaries & voice flashcards
              </p>
            </div>
          </div>

          {!isRecording && !recordedBlob && (
            <button
              onClick={handleStartRecording}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs shadow-purple-600/20 transition-all cursor-pointer active:scale-95 shrink-0"
            >
              <Mic className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Record Voice Note</span>
            </button>
          )}
        </div>

        {/* Notifications */}
        {successNotice && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold animate-fade-in">
            <CheckCircle2 className="w-4 h-4 stroke-[2.5] shrink-0" />
            <span>{successNotice}</span>
          </div>
        )}

        {errorMessage && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-semibold animate-fade-in">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* 2. LIVE VOICE RECORDING ACTIVE STUDIO */}
        {isRecording && (
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-purple-950/40 via-[#18181D] to-rose-950/30 border-2 border-purple-500/50 shadow-xl space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider font-mono">
                  Recording Live Audio...
                </span>
              </div>
              <span className="text-lg sm:text-xl font-mono font-black text-[#F5F5F7]">
                {formatTime(recordingSeconds)}
              </span>
            </div>

            {/* Pulsing Audio Wave Animation */}
            <div className="flex items-center justify-center gap-1.5 py-4">
              {[40, 75, 55, 95, 60, 85, 45, 90, 70, 100, 65, 80, 50].map((height, i) => (
                <div
                  key={i}
                  className="w-1.5 bg-gradient-to-t from-purple-500 to-rose-400 rounded-full animate-pulse"
                  style={{
                    height: `${height * 0.4}px`,
                    animationDuration: `${0.4 + (i % 4) * 0.2}s`
                  }}
                />
              ))}
            </div>

            {/* Live Speech-to-Text Transcript Preview if available */}
            {recordingTranscript && (
              <div className="p-3 rounded-xl bg-white/5 border border-purple-500/20 text-xs text-purple-200 leading-relaxed max-h-24 overflow-y-auto">
                <span className="text-[11px] font-bold text-purple-400 uppercase block mb-0.5">
                  💬 Live Speech-to-Text:
                </span>
                "{recordingTranscript}"
              </div>
            )}

            {/* Recording Action Buttons */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleDiscardRecording}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#23232A] hover:bg-rose-500/20 text-[#A1A1AA] hover:text-rose-400 border border-[#272730] text-xs font-semibold cursor-pointer transition-all"
              >
                <X className="w-4 h-4" />
                <span>Discard</span>
              </button>

              <button
                onClick={handleStopRecording}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-lg shadow-rose-600/30 cursor-pointer active:scale-95 transition-all"
              >
                <Square className="w-4 h-4 fill-white" />
                <span>Stop & Review</span>
              </button>
            </div>
          </div>
        )}

        {/* 3. RECORDED AUDIO PREVIEW & SAVE FORM */}
        {!isRecording && recordedBlob && (
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-purple-500/40 shadow-xl space-y-4 animate-fade-in">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-white/[0.08]">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-slate-100 font-sans">
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span>Review Voice Note ({formatTime(recordingSeconds)})</span>
              </div>
              <button
                type="button"
                onClick={handleDiscardRecording}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Audio Player Preview */}
            {previewAudioUrl && (
              <div className="p-3 rounded-xl bg-white dark:bg-[#18181D] border border-slate-200 dark:border-white/[0.08]">
                <audio controls src={previewAudioUrl} className="w-full h-9" />
              </div>
            )}

            {/* Voice Memo Title */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1 font-sans">
                Voice Memo Title
              </label>
              <input
                type="text"
                value={recordingTitle}
                onChange={e => setRecordingTitle(e.target.value)}
                placeholder="e.g. Important Theorem Shortcut / Exceptions"
                className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-[#18181D] border border-slate-200 dark:border-white/[0.08] text-xs font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Speech-to-Text Transcript if captured */}
            {recordingTranscript && (
              <div>
                <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1 font-sans">
                  Captured Transcript (Speech-to-Text)
                </label>
                <textarea
                  value={recordingTranscript}
                  onChange={e => setRecordingTranscript(e.target.value)}
                  rows={2}
                  className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-[#18181D] border border-slate-200 dark:border-white/[0.08] text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-purple-500"
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200 dark:border-white/[0.08]">
              <button
                type="button"
                onClick={handleDiscardRecording}
                className="px-4 py-2 rounded-xl bg-white dark:bg-[#23232A] border border-slate-200 dark:border-white/[0.08] text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                Discard
              </button>
              <button
                type="button"
                onClick={handleSaveVoiceNote}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs shadow-purple-600/20 cursor-pointer active:scale-95 transition-all"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Save Voice Note</span>
              </button>
            </div>
          </div>
        )}

        {/* 4. SAVED VOICE NOTES LIST OR UNIFIED EMPTY STATE */}
        <div className="space-y-3">
          {audioMemos.length > 0 ? (
            audioMemos.map((memo, index) => {
              const isPlaying = playingMemoId === memo.id;

              return (
                <div
                  key={memo.id}
                  className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5 ${
                    isPlaying
                      ? 'bg-purple-500/[0.06] border-2 border-purple-500 shadow-md ring-2 ring-purple-500/10'
                      : 'bg-slate-50/70 hover:bg-white dark:bg-white/[0.03] dark:hover:bg-white/[0.06] border border-slate-200/80 hover:border-slate-300 dark:border-white/[0.08] dark:hover:border-white/20 shadow-xs'
                  }`}
                >
                  {/* Left: Play/Pause Button & Memo Title */}
                  <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                    <button
                      onClick={() => handleTogglePlayMemo(memo)}
                      className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-xs transition-all cursor-pointer active:scale-90 ${
                        isPlaying
                          ? 'bg-purple-600 text-white shadow-purple-600/30 ring-4 ring-purple-500/20 animate-pulse'
                          : 'bg-purple-500/15 hover:bg-purple-500/25 text-purple-600 dark:text-purple-400 border border-purple-500/30'
                      }`}
                      title={isPlaying ? 'Pause Audio' : 'Play Voice Memo'}
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5 fill-white" />
                      ) : (
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      )}
                    </button>

                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold font-mono bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                          🎙️ Memo #{index + 1}
                        </span>
                        <span className="text-[11px] font-bold font-mono tabular-nums text-slate-700 dark:text-slate-300">
                          {formatTime(memo.durationSeconds)}
                        </span>
                        <span className="text-slate-300 dark:text-slate-600">•</span>
                        <span className="flex items-center gap-1 text-[10px] sm:text-[11px] font-mono text-slate-400 dark:text-slate-500">
                          <Clock className="w-3 h-3" />
                          <span>{memo.recordedAt}</span>
                        </span>
                      </div>

                      <h5 className="text-xs sm:text-sm font-bold font-sans text-slate-800 dark:text-slate-100 truncate">
                        {memo.title}
                      </h5>

                      {memo.transcript && (
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 italic line-clamp-1 bg-white/60 dark:bg-white/[0.04] p-1.5 rounded-lg border border-slate-200/50 dark:border-white/[0.05]">
                          "{memo.transcript}"
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right: Actions & Tools */}
                  <div className="flex items-center gap-1.5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/80 dark:border-white/[0.08] justify-end">
                    {/* Playback Speed Controller */}
                    {isPlaying && (
                      <button
                        onClick={handleCyclePlaybackSpeed}
                        className="px-2.5 py-1 rounded-xl bg-purple-600/10 hover:bg-purple-600/20 text-purple-600 dark:text-purple-300 text-xs font-mono font-bold border border-purple-500/30 cursor-pointer transition-colors"
                        title="Cycle playback speed"
                      >
                        {playbackSpeed}x
                      </button>
                    )}

                    {/* Insert Transcript to Notes Button */}
                    {memo.transcript && onInsertTranscriptToNotes && (
                      <button
                        onClick={() => onInsertTranscriptToNotes(`\n> 🎙️ **Voice Memo (${memo.title})**:\n> ${memo.transcript}\n`)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-purple-500/15 dark:bg-white/[0.06] dark:hover:bg-purple-500/20 text-slate-700 hover:text-purple-600 dark:text-slate-300 dark:hover:text-purple-300 border border-slate-200/80 dark:border-white/[0.08] text-xs font-semibold transition-colors cursor-pointer"
                        title="Insert Transcript into Topic Notes"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline font-sans">Add to Notes</span>
                      </button>
                    )}

                    {/* Download Audio */}
                    <button
                      onClick={(e) => handleDownloadMemo(e, memo)}
                      className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-500/10 border border-transparent hover:border-emerald-500/20 transition-all cursor-pointer"
                      title="Download Audio (.webm)"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>

                    {/* Delete Button */}
                    {deletingId === memo.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => handleDeleteMemo(e, memo.id, memo.storageKey)}
                          className="px-2.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold cursor-pointer transition-colors"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setDeletingId(null)}
                          className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeletingId(memo.id)}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all cursor-pointer"
                        title="Delete Voice Memo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            /* Unified Empty State */
            !isRecording && !recordedBlob && (
              <div className="py-8 sm:py-10 px-4 text-center rounded-xl sm:rounded-2xl bg-slate-50/60 dark:bg-white/[0.02] border border-dashed border-slate-200 dark:border-white/[0.08] space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 flex items-center justify-center mx-auto shadow-xs">
                  <Mic className="w-6 h-6 stroke-[2]" />
                </div>
                <div className="space-y-1 max-w-sm mx-auto">
                  <h5 className="text-xs sm:text-sm font-bold font-sans text-slate-800 dark:text-slate-200">
                    No Voice Notes Recorded Yet
                  </h5>
                  <p className="text-[11px] font-sans text-slate-400 dark:text-slate-500 leading-relaxed">
                    Record high-yield shortcuts, mnemonics, or concept summaries to listen and revise on the go.
                  </p>
                </div>
                <div className="pt-1">
                  <button
                    onClick={handleStartRecording}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs shadow-purple-600/20 transition-all cursor-pointer active:scale-95"
                  >
                    <Mic className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Record First Voice Memo</span>
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

