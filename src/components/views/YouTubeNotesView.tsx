import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import {
  Video,
  Search,
  Sparkles,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  Copy,
  Download,
  Trash2,
  Star,
  Clock,
  ChevronDown,
  ChevronRight,
  X,
  Play,
  RefreshCw,
  Languages,
  FileText,
  Edit3,
  Zap,
  ArrowLeft,
  BookOpen,
  ClipboardPaste,
  ExternalLink,
  Info,
  Wand2,
  ShrinkIcon,
  Expand,
  Table as TableIcon,
  MessageSquarePlus,
  RotateCcw,
  Hash,
  Printer,
  CopyPlus,
  MoreVertical,
  ListTodo,
  Link,
  Check,
  Save,
  KeyRound,
  Eye,
  EyeOff,
  Lock
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { soundManager } from '../../utils/soundEffects';
import { haptics } from '../../utils/haptics';
import { extractYouTubeVideoId, getYouTubeThumbnailUrl } from '../../utils/youtubeUtils';
import {
  fetchVideoMetadata,
  fetchTranscript,
  parseManualTranscript,
  estimateDurationFromTranscript,
  type VideoMetadata,
  type TranscriptSegment,
} from '../../services/youtubeTranscriptService';
import {
  generateYouTubeNotes,
  getDefaultNoteSettings,
  getStoredGeminiApiKey,
  setStoredGeminiApiKey,
  clearStoredGeminiApiKey,
  executeAiAction,
  translateFullDocument,
  type NoteGenerationSettings,
  type NoteLanguage,
  type NoteType,
  type DetailLevel,
  type GenerationProgress,
  type AiActionType,
} from '../../utils/youtubeNotesGenerator';
import {
  getAllNotes,
  saveNote,
  deleteNote,
  duplicateNote,
  renameNote,
  updateNoteContent,
  toggleFavorite,
  generateNoteId,
  formatNoteDate,
  getNoteTypeLabel,
  getLanguageLabel,
  type SavedYouTubeNote,
} from '../../utils/youtubeNotesStorage';
import { generateAndOpenNotesPdf } from '../../utils/pdfGenerator';
import { MathBlock, InlineMath } from '../../utils/mathRenderer';

// ─── View States ────────────────────────────────────────────────

type ViewState = 'input' | 'progress' | 'editor';

// ─── Component ──────────────────────────────────────────────────

export const YouTubeNotesView: React.FC = () => {
  const { isDark } = useTheme();

  // ── Core State ──
  const [viewState, setViewState] = useState<ViewState>('input');
  const [url, setUrl] = useState('');
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [metadata, setMetadata] = useState<VideoMetadata | null>(null);
  const [isFetchingMeta, setIsFetchingMeta] = useState(false);
  const [segments, setSegments] = useState<TranscriptSegment[]>([]);
  const [settings, setSettings] = useState<NoteGenerationSettings>(getDefaultNoteSettings());
  const [progress, setProgress] = useState<GenerationProgress | null>(null);
  const [generatedNotes, setGeneratedNotes] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // ── Manual Transcript ──
  const [showManualPaste, setShowManualPaste] = useState(false);
  const [manualTranscript, setManualTranscript] = useState('');

  // ── Editor State ──
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [currentNoteId, setCurrentNoteId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // ── Saved Notes ──
  const [savedNotes, setSavedNotes] = useState<SavedYouTubeNote[]>([]);
  const [showSavedNotes, setShowSavedNotes] = useState(true);
  const [editingTitle, setEditingTitle] = useState<string | null>(null);
  const [tempTitle, setTempTitle] = useState('');

  // ── TOC ──
  const [tocEntries, setTocEntries] = useState<{ level: number; text: string; id: string }[]>([]);
  const [showToc, setShowToc] = useState(true);

  // ── AI Actions ──
  const [selectedText, setSelectedText] = useState('');
  const [isAiActionRunning, setIsAiActionRunning] = useState(false);
  const [showAiPanel, setShowAiPanel] = useState(false);

  // ── Gemini API Key State ──
  const [apiKey, setApiKey] = useState<string>(() => getStoredGeminiApiKey());
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [tempApiKeyInput, setTempApiKeyInput] = useState('');
  const [showKeyPassword, setShowKeyPassword] = useState(false);
  const [keySavedFeedback, setKeySavedFeedback] = useState(false);

  // ── Handlers for Gemini API Key ──
  const handleSaveApiKey = useCallback((newKey: string) => {
    const trimmed = newKey.trim();
    if (!trimmed) {
      clearStoredGeminiApiKey();
      setApiKey('');
      setKeySavedFeedback(true);
      setTimeout(() => {
        setKeySavedFeedback(false);
        setShowApiKeyModal(false);
      }, 800);
      return;
    }
    setStoredGeminiApiKey(trimmed);
    setApiKey(trimmed);
    setKeySavedFeedback(true);
    setError(null);
    soundManager.playCompleteChime?.();
    haptics.success?.();
    setTimeout(() => {
      setKeySavedFeedback(false);
      setShowApiKeyModal(false);
    }, 1000);
  }, []);

  const handleRemoveApiKey = useCallback(() => {
    clearStoredGeminiApiKey();
    setApiKey('');
    setTempApiKeyInput('');
    soundManager.playClick?.();
    haptics.selection?.();
    setShowApiKeyModal(false);
  }, []);

  // ── Refs ──
  const urlInputRef = useRef<HTMLInputElement>(null);
  const notesContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const metaFetchTimer = useRef<NodeJS.Timeout | null>(null);

  // ── Load Saved Notes on Mount ──
  useEffect(() => {
    loadSavedNotes();
  }, []);

  const loadSavedNotes = useCallback(async () => {
    const notes = await getAllNotes();
    setSavedNotes(notes);
  }, []);

  // ── URL Validation & Metadata Fetch ──
  useEffect(() => {
    const videoId = extractYouTubeVideoId(url);
    setIsValidUrl(!!videoId);

    if (metaFetchTimer.current) clearTimeout(metaFetchTimer.current);

    if (videoId) {
      setMetadata(null);
      setError(null);
      metaFetchTimer.current = setTimeout(async () => {
        setIsFetchingMeta(true);
        try {
          const meta = await fetchVideoMetadata(videoId);
          setMetadata(meta);
        } catch {
          // Metadata fetch failed — not critical
        } finally {
          setIsFetchingMeta(false);
        }
      }, 500);
    } else {
      setMetadata(null);
    }

    return () => {
      if (metaFetchTimer.current) clearTimeout(metaFetchTimer.current);
    };
  }, [url]);

  // ── Generate TOC from notes ──
  useEffect(() => {
    if (!generatedNotes) {
      setTocEntries([]);
      return;
    }
    const headings = generatedNotes.split('\n')
      .filter(l => /^#{1,3}\s/.test(l))
      .map((line, i) => {
        const match = line.match(/^(#{1,3})\s+(.*)/);
        if (!match) return null;
        const level = match[1].length;
        const text = match[2].replace(/\*\*/g, '').trim();
        const id = `heading-${i}-${text.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40)}`;
        return { level, text, id };
      })
      .filter(Boolean) as { level: number; text: string; id: string }[];
    setTocEntries(headings);
  }, [generatedNotes]);

  // ── Handle Generate ──
  const handleGenerate = useCallback(async () => {
    const activeApiKey = apiKey || getStoredGeminiApiKey();
    if (!activeApiKey) {
      setTempApiKeyInput('');
      setShowApiKeyModal(true);
      setError('Please add your free Google Gemini API key to generate notes. Click "Setup Free API Key" below.');
      soundManager.playError?.();
      return;
    }

    if (!isValidUrl && !manualTranscript.trim()) {
      setError('Please enter a valid YouTube URL.');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setViewState('progress');
    setProgress({ stage: 0, totalStages: 7, label: 'Starting...', isComplete: false });

    try {
      const videoId = extractYouTubeVideoId(url) || '';
      const videoUrl = videoId ? `https://www.youtube.com/watch?v=${videoId}` : url;

      // Fetch metadata if not already done
      let meta = metadata;
      if (!meta && videoId) {
        meta = await fetchVideoMetadata(videoId);
        setMetadata(meta);
      }

      // Fetch transcript if available
      let transcriptSegments: TranscriptSegment[] = [];

      if (manualTranscript.trim()) {
        // User pasted transcript manually
        transcriptSegments = parseManualTranscript(manualTranscript);
      } else if (videoId) {
        // Attempt to fetch caption transcript; if unavailable, Gemini will watch & analyze the video directly!
        try {
          const transcriptResult = await fetchTranscript(videoId);
          if (transcriptResult.success && transcriptResult.segments && transcriptResult.segments.length > 0) {
            transcriptSegments = transcriptResult.segments;
          }
        } catch {
          // Silent fallback: Gemini multimodal video processing will handle it directly
        }
      }

      setSegments(transcriptSegments);

      // Update metadata with duration from transcript if available
      if (meta && transcriptSegments.length > 0) {
        const duration = estimateDurationFromTranscript(transcriptSegments);
        if (duration) {
          meta = { ...meta, duration };
          setMetadata(meta);
        }
      }

      // Generate notes
      const notes = await generateYouTubeNotes({
        videoId,
        videoTitle: meta?.title || 'YouTube Video',
        channelName: meta?.channel || 'Unknown Channel',
        videoUrl,
        segments: transcriptSegments,
        settings,
        apiKey: activeApiKey,
        onProgress: (p) => setProgress(p),
      });

      setGeneratedNotes(notes);
      setEditContent(notes);
      setViewState('editor');

      // Auto-save
      const noteId = generateNoteId();
      setCurrentNoteId(noteId);
      const savedNote: SavedYouTubeNote = {
        id: noteId,
        videoId,
        youtubeUrl: videoUrl,
        videoTitle: meta?.title || 'YouTube Video',
        thumbnailUrl: meta?.thumbnailUrl || '',
        channelName: meta?.channel || '',
        language: settings.language,
        noteType: settings.noteType,
        detailLevel: settings.detailLevel,
        notesContent: notes,
        generatedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await saveNote(savedNote);
      await loadSavedNotes();

      soundManager.playCompleteChime?.();
      haptics.success?.();
    } catch (err: any) {
      console.error('[YouTubeNotes] Generation failed:', err);
      setError(err?.message || 'Failed to generate notes. Please try again.');
      setViewState('input');
    } finally {
      setIsGenerating(false);
    }
  }, [url, isValidUrl, metadata, settings, manualTranscript, loadSavedNotes, apiKey]);

  // ── Open Saved Note ──
  const handleOpenNote = useCallback((note: SavedYouTubeNote) => {
    setGeneratedNotes(note.notesContent);
    setEditContent(note.notesContent);
    setCurrentNoteId(note.id);
    setUrl(note.youtubeUrl);
    setMetadata({
      videoId: note.videoId,
      title: note.videoTitle,
      channel: note.channelName,
      thumbnailUrl: note.thumbnailUrl,
      duration: null,
      url: note.youtubeUrl,
    });
    setSettings(prev => ({
      ...prev,
      language: note.language,
      noteType: note.noteType,
      detailLevel: note.detailLevel,
    }));
    setViewState('editor');
    soundManager.playClick?.();
  }, []);

  // ── Save Edits ──
  const handleSaveEdits = useCallback(async () => {
    if (!currentNoteId) return;
    await updateNoteContent(currentNoteId, editContent);
    setGeneratedNotes(editContent);
    setIsEditing(false);
    await loadSavedNotes();
    soundManager.playClick?.();
  }, [currentNoteId, editContent, loadSavedNotes]);

  // ── Delete Note ──
  const handleDeleteNote = useCallback(async (noteId: string) => {
    await deleteNote(noteId);
    await loadSavedNotes();
    if (noteId === currentNoteId) {
      setViewState('input');
      setGeneratedNotes('');
      setCurrentNoteId(null);
    }
    soundManager.playClick?.();
  }, [currentNoteId, loadSavedNotes]);

  // ── Duplicate Note ──
  const handleDuplicateNote = useCallback(async (noteId: string) => {
    await duplicateNote(noteId);
    await loadSavedNotes();
    soundManager.playClick?.();
  }, [loadSavedNotes]);

  // ── Copy Notes ──
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(generatedNotes);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  }, [generatedNotes]);

  // ── Export PDF ──
  const handleExportPdf = useCallback(() => {
    if (!generatedNotes) return;
    generateAndOpenNotesPdf({
      topicName: metadata?.title || 'YouTube Notes',
      subjectName: metadata?.channel || '',
      notes: generatedNotes,
      autoPrint: false,
    });
  }, [generatedNotes, metadata]);

  // ── Print ──
  const handlePrint = useCallback(() => {
    if (!generatedNotes) return;
    generateAndOpenNotesPdf({
      topicName: metadata?.title || 'YouTube Notes',
      subjectName: metadata?.channel || '',
      notes: generatedNotes,
      autoPrint: true,
    });
  }, [generatedNotes, metadata]);

  // ── AI Action ──
  const handleAiAction = useCallback(async (action: AiActionType) => {
    const activeApiKey = apiKey || getStoredGeminiApiKey();
    if (!activeApiKey) {
      setTempApiKeyInput('');
      setShowApiKeyModal(true);
      setError('Please add your free Gemini API key first to use AI actions.');
      return;
    }

    const textToProcess = selectedText || generatedNotes;
    if (!textToProcess) return;

    setIsAiActionRunning(true);
    try {
      const result = await executeAiAction(action, textToProcess, activeApiKey, {
        targetLanguage: settings.language === 'hindi' ? 'english' : 'hindi',
        videoTitle: metadata?.title,
      });

      if (selectedText) {
        // Replace selected text in notes
        const updatedNotes = generatedNotes.replace(selectedText, result);
        setGeneratedNotes(updatedNotes);
        setEditContent(updatedNotes);
      } else {
        setGeneratedNotes(result);
        setEditContent(result);
      }

      // Auto-save
      if (currentNoteId) {
        await updateNoteContent(currentNoteId, selectedText ? generatedNotes.replace(selectedText, result) : result);
        await loadSavedNotes();
      }

      setSelectedText('');
      soundManager.playClick?.();
    } catch (err: any) {
      setError(err?.message || 'AI action failed.');
    } finally {
      setIsAiActionRunning(false);
    }
  }, [selectedText, generatedNotes, settings.language, metadata?.title, currentNoteId, loadSavedNotes, apiKey]);

  // ── Full Document Translation ──
  const handleTranslateDocument = useCallback(async () => {
    const activeApiKey = apiKey || getStoredGeminiApiKey();
    if (!activeApiKey || !generatedNotes) {
      if (!activeApiKey) {
        setTempApiKeyInput('');
        setShowApiKeyModal(true);
        setError('Please configure your Gemini API key to translate notes.');
      }
      return;
    }

    const targetLang: NoteLanguage = settings.language === 'hindi' ? 'english' : 'hindi';
    setIsAiActionRunning(true);

    try {
      const translated = await translateFullDocument(generatedNotes, targetLang, activeApiKey);
      setGeneratedNotes(translated);
      setEditContent(translated);
      setSettings(prev => ({ ...prev, language: targetLang }));

      if (currentNoteId) {
        await updateNoteContent(currentNoteId, translated);
        await loadSavedNotes();
      }
    } catch (err: any) {
      setError(err?.message || 'Translation failed.');
    } finally {
      setIsAiActionRunning(false);
    }
  }, [generatedNotes, settings.language, currentNoteId, loadSavedNotes, apiKey]);

  // ── Back to Input ──
  const handleBackToInput = useCallback(() => {
    setViewState('input');
    setError(null);
    setProgress(null);
    soundManager.playClick?.();
  }, []);

  // ── New Note ──
  const handleNewNote = useCallback(() => {
    setViewState('input');
    setUrl('');
    setMetadata(null);
    setSegments([]);
    setGeneratedNotes('');
    setEditContent('');
    setCurrentNoteId(null);
    setError(null);
    setProgress(null);
    setShowManualPaste(false);
    setManualTranscript('');
    setIsEditing(false);
    setSettings(getDefaultNoteSettings());
    soundManager.playClick?.();
  }, []);

  // ── Scroll to heading ──
  const scrollToHeading = useCallback((headingId: string) => {
    const el = document.getElementById(headingId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // ── Handle text selection for AI actions ──
  useEffect(() => {
    const handleSelection = () => {
      const sel = window.getSelection()?.toString().trim();
      if (sel && sel.length > 10 && notesContainerRef.current) {
        setSelectedText(sel);
        setShowAiPanel(true);
      }
    };
    document.addEventListener('mouseup', handleSelection);
    return () => document.removeEventListener('mouseup', handleSelection);
  }, []);

  // ── Render API Key Modal ──
  const renderApiKeyModal = () => {
    if (!showApiKeyModal) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-view-fade select-none">
        <div className={`w-full max-w-md rounded-3xl border p-5 sm:p-6 shadow-2xl space-y-4 relative ${
          isDark ? 'bg-[#1E293B] border-[#334155] text-white' : 'bg-white border-[#DDD6FE] text-slate-900'
        }`}>
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-violet-600/15 text-violet-500">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black tracking-tight">Google Gemini API Key</h3>
                <p className="text-[11px] text-slate-400">100% Free · No credit card required</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowApiKeyModal(false)}
              className="p-1.5 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Explanation in Hindi/English */}
          <div className={`p-3.5 rounded-xl border text-xs leading-relaxed space-y-1.5 ${
            isDark ? 'bg-[#0F172A] border-[#334155] text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-600'
          }`}>
            <p className="font-bold text-violet-600 dark:text-violet-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Free Gemini API Key kaise banayein?</span>
            </p>
            <ol className="list-decimal pl-4 space-y-1 text-[11px]">
              <li>Neeche <strong>&quot;Get Free Key at Google AI Studio&quot;</strong> button dabayein.</li>
              <li>Google account se login karke <strong>&quot;Create API Key&quot;</strong> par click karein.</li>
              <li>Key copy karke yahan paste karein aur <strong>&quot;Save API Key&quot;</strong> dabayein.</li>
            </ol>
          </div>

          {/* Quick link button */}
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/30 hover:bg-violet-100 dark:hover:bg-violet-500/20 flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <span>Get Free Key at Google AI Studio</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Input field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Paste Gemini API Key (starts with AIzaSy...)
            </label>
            <div className="relative">
              <input
                type={showKeyPassword ? 'text' : 'password'}
                value={tempApiKeyInput}
                onChange={(e) => setTempApiKeyInput(e.target.value)}
                placeholder="AIzaSy..."
                className={`w-full px-3.5 py-2.5 pr-10 rounded-xl border text-xs font-mono transition-all outline-none ${
                  isDark
                    ? 'bg-[#0F172A] border-[#334155] text-white placeholder-slate-500 focus:border-violet-500'
                    : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-violet-500'
                }`}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowKeyPassword(!showKeyPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                {showKeyPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {keySavedFeedback && (
            <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2 animate-view-fade">
              <CheckCircle2 className="w-4 h-4" />
              <span>API Key successfully saved in your browser!</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 pt-2">
            {apiKey && (
              <button
                type="button"
                onClick={handleRemoveApiKey}
                className="px-3 py-2 rounded-xl text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 border border-red-200 dark:border-red-500/20 transition-colors cursor-pointer"
              >
                Remove Key
              </button>
            )}
            <button
              type="button"
              onClick={() => setShowApiKeyModal(false)}
              className="flex-1 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!tempApiKeyInput.trim()}
              onClick={() => handleSaveApiKey(tempApiKeyInput)}
              className="flex-1 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white shadow-md disabled:opacity-50 transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save API Key</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ═════════════════════════════════════════════════════════════
  // ── RENDER: INPUT STATE ──
  // ═════════════════════════════════════════════════════════════

  if (viewState === 'input') {
    return (
      <div className="max-w-4xl mx-auto space-y-5 animate-view-fade">
        {/* Hero Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2.5 mb-2">
            <div className={`p-2.5 rounded-2xl ${isDark ? 'bg-red-500/15' : 'bg-red-50'}`}>
              <Video className="w-7 h-7 text-red-500" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              AI YouTube Notes
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-black tracking-wider bg-gradient-to-r from-violet-600 to-cyan-500 text-white rounded-full uppercase">
              AI
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-3">
            Turn any educational YouTube video into structured study notes with AI
          </p>

          {/* API Key Status Pill */}
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={() => {
                setTempApiKeyInput(apiKey);
                setShowApiKeyModal(true);
                soundManager.playClick?.();
              }}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shadow-2xs ${
                apiKey
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 hover:bg-emerald-500/20'
                  : 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 hover:bg-amber-500/25 animate-pulse'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              {apiKey ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                  <span>Gemini AI Connected (Click to change)</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-500 inline-block animate-ping" />
                  <span>Setup Free Gemini Key</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* API Key Setup Banner if not configured */}
        {!apiKey && (
          <div className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-view-fade ${
            isDark
              ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
              : 'bg-amber-50 border-amber-300 text-amber-900 shadow-sm'
          }`}>
            <div className="flex items-start sm:items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-500 shrink-0 mt-0.5 sm:mt-0">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-black">Google Gemini API Key Setup Required</p>
                <p className="text-[11px] sm:text-xs opacity-80 mt-0.5">
                  YouTube Video se structured notes generate karne ke liye Gemini API key zaroori hai. Ye Google AI Studio par <strong>100% FREE</strong> hai (koi credit card nahi chahiye).
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setTempApiKeyInput(apiKey);
                setShowApiKeyModal(true);
                soundManager.playClick?.();
              }}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md shadow-amber-500/20 transition-all shrink-0 cursor-pointer active:scale-95 flex items-center justify-center gap-1.5"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Setup Free API Key</span>
            </button>
          </div>
        )}

        {/* URL Input Card */}
        <div className={`rounded-2xl border p-4 sm:p-5 transition-all duration-300 ${
          isDark
            ? 'bg-[#1E293B]/90 border-[#334155] shadow-lg'
            : 'bg-white/95 border-[#DDD6FE] shadow-[0_8px_30px_rgba(124,58,237,0.06)]'
        }`}>
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 block">
            YouTube Video URL
          </label>
          <div className="relative">
            <input
              ref={urlInputRef}
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onPaste={(e) => {
                const pastedText = e.clipboardData.getData('text');
                if (pastedText) {
                  setUrl(pastedText.trim());
                }
              }}
              placeholder="https://www.youtube.com/watch?v=..."
              className={`w-full px-4 py-3 pr-12 rounded-xl border text-sm font-medium transition-all duration-200 outline-none ${
                isDark
                  ? 'bg-[#0F172A] border-[#334155] text-white placeholder-slate-500 focus:border-red-500/60 focus:ring-1 focus:ring-red-500/30'
                  : 'bg-slate-50 border-[#DDD6FE] text-slate-900 placeholder-slate-400 focus:border-red-400 focus:ring-1 focus:ring-red-400/30'
              }`}
            />
            {url && (
              <button
                onClick={() => setUrl('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <X className="w-4 h-4 text-slate-400" />
              </button>
            )}
          </div>

          {/* Validation indicator */}
          {url && (
            <div className={`flex items-center gap-1.5 mt-2 text-xs font-medium ${
              isValidUrl ? 'text-emerald-500' : 'text-red-400'
            }`}>
              {isValidUrl ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
              {isValidUrl ? 'Valid YouTube URL detected' : 'Please enter a valid YouTube URL'}
            </div>
          )}
        </div>

        {/* Video Preview Card */}
        {isValidUrl && (
          <div className={`rounded-2xl border overflow-hidden transition-all duration-300 animate-view-fade ${
            isDark
              ? 'bg-[#1E293B]/90 border-[#334155] shadow-lg'
              : 'bg-white/95 border-[#DDD6FE] shadow-[0_8px_30px_rgba(124,58,237,0.06)]'
          }`}>
            <div className="flex flex-col sm:flex-row gap-0">
              {/* Thumbnail */}
              <div className="relative sm:w-72 flex-shrink-0">
                <img
                  src={metadata?.thumbnailUrl || getYouTubeThumbnailUrl(url)}
                  alt="Video thumbnail"
                  className="w-full h-40 sm:h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${extractYouTubeVideoId(url)}/hqdefault.jpg`;
                  }}
                />
                {metadata?.duration && (
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 text-white text-[11px] font-bold rounded-md">
                    {metadata.duration}
                  </span>
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-red-600/90 flex items-center justify-center shadow-lg">
                    <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                  </div>
                </div>
              </div>

              {/* Video Info */}
              <div className="p-4 flex-1 min-w-0">
                {isFetchingMeta ? (
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Loader2 className="w-4 h-4 animate-spin" /> Fetching video info...
                  </div>
                ) : metadata ? (
                  <>
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white line-clamp-2 mb-1.5">
                      {metadata.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-2">
                      {metadata.channel}
                    </p>
                    <a
                      href={metadata.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-400 font-medium transition-colors"
                    >
                      Watch on YouTube <ExternalLink className="w-3 h-3" />
                    </a>
                  </>
                ) : (
                  <p className="text-sm text-slate-400">Video info will appear here...</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Generation Settings Panel */}
        {isValidUrl && (
          <div className={`rounded-2xl border p-4 sm:p-5 space-y-4 transition-all duration-300 animate-view-fade ${
            isDark
              ? 'bg-[#1E293B]/90 border-[#334155] shadow-lg'
              : 'bg-white/95 border-[#DDD6FE] shadow-[0_8px_30px_rgba(124,58,237,0.06)]'
          }`}>
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-500" /> Generation Settings
            </h3>

            {/* Language Toggle */}
            <div>
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 block">
                Notes Language
              </label>
              <div className={`inline-flex rounded-xl p-1 ${isDark ? 'bg-[#0F172A]' : 'bg-slate-100'}`}>
                {(['hindi', 'english'] as NoteLanguage[]).map(lang => (
                  <button
                    key={lang}
                    onClick={() => {
                      setSettings(s => ({ ...s, language: lang }));
                      soundManager.playClick?.();
                      haptics.light?.();
                    }}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                      settings.language === lang
                        ? isDark
                          ? 'bg-violet-600 text-white shadow-sm'
                          : 'bg-violet-600 text-white shadow-sm'
                        : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                  >
                    {lang === 'hindi' ? 'हिन्दी' : 'English'}
                  </button>
                ))}
              </div>
            </div>

            {/* Note Type */}
            <div>
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 block">
                Note Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {([
                  { key: 'quick', label: 'Quick Notes', icon: '⚡', desc: 'Fast summary' },
                  { key: 'standard', label: 'Standard', icon: '📝', desc: 'Balanced coverage' },
                  { key: 'detailed', label: 'Detailed', icon: '📖', desc: 'Comprehensive' },
                  { key: 'exam', label: 'Exam Notes', icon: '🎯', desc: 'Exam-focused' },
                ] as { key: NoteType; label: string; icon: string; desc: string }[]).map(item => (
                  <button
                    key={item.key}
                    onClick={() => {
                      setSettings(s => ({ ...s, noteType: item.key }));
                      soundManager.playClick?.();
                      haptics.light?.();
                    }}
                    className={`p-3 rounded-xl border text-left transition-all duration-200 ${
                      settings.noteType === item.key
                        ? isDark
                          ? 'bg-violet-600/20 border-violet-500/50 ring-1 ring-violet-500/30'
                          : 'bg-violet-50 border-violet-400 ring-1 ring-violet-400/30'
                        : isDark
                          ? 'bg-[#0F172A]/50 border-[#334155] hover:border-[#475569]'
                          : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-lg mb-0.5">{item.icon}</div>
                    <div className={`text-xs font-bold ${
                      settings.noteType === item.key
                        ? 'text-violet-600 dark:text-violet-400'
                        : 'text-slate-700 dark:text-slate-300'
                    }`}>
                      {item.label}
                    </div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Include Options */}
            <div>
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 block">
                Include in Notes
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {([
                  { key: 'includeImportantFacts', label: 'Important Facts' },
                  { key: 'includeFormulas', label: 'Formulas' },
                  { key: 'includeTables', label: 'Tables' },
                  { key: 'includeExamples', label: 'Examples' },
                  { key: 'includeImportantQuestions', label: 'Important Questions' },
                  { key: 'includeQuickRevision', label: 'Quick Revision' },
                  { key: 'includeTimestamps', label: 'Timestamps' },
                ] as { key: keyof NoteGenerationSettings; label: string }[]).map(item => (
                  <label
                    key={item.key}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-all duration-200 ${
                      settings[item.key]
                        ? isDark
                          ? 'bg-violet-600/10 border-violet-500/30'
                          : 'bg-violet-50/60 border-violet-300'
                        : isDark
                          ? 'bg-[#0F172A]/30 border-[#334155] hover:border-[#475569]'
                          : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={!!settings[item.key]}
                      onChange={() => {
                        setSettings(s => ({ ...s, [item.key]: !s[item.key as keyof NoteGenerationSettings] }));
                        haptics.light?.();
                      }}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      settings[item.key]
                        ? 'bg-violet-600 border-violet-600'
                        : isDark ? 'border-[#475569]' : 'border-slate-300'
                    }`}>
                      {settings[item.key] && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                    </div>
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={() => {
                handleGenerate();
                haptics.medium?.();
              }}
              disabled={!isValidUrl || isGenerating}
              className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2.5 ${
                isValidUrl && !isGenerating
                  ? 'bg-gradient-to-r from-violet-600 via-purple-600 to-violet-700 text-white shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
              }`}
            >
              {isGenerating ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Sparkles className="w-5 h-5" />
              )}
              {isGenerating ? 'Generating...' : '✨ Generate Notes'}
            </button>
          </div>
        )}

        {/* Optional Manual Transcript Toggle */}
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={() => {
              setShowManualPaste(!showManualPaste);
              soundManager.playClick?.();
            }}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium transition-colors cursor-pointer py-1 px-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ClipboardPaste className="w-3.5 h-3.5 text-violet-500" />
            <span>{showManualPaste ? 'Hide Custom Transcript' : 'Optional: Paste custom transcript / lecture text manually'}</span>
          </button>
        </div>

        {/* Manual Transcript Paste Area */}
        {showManualPaste && (
          <div className={`rounded-2xl border p-4 sm:p-5 animate-view-fade ${
            isDark
              ? 'bg-[#1E293B]/90 border-amber-500/30 shadow-lg'
              : 'bg-amber-50/50 border-amber-300 shadow-md'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <ClipboardPaste className="w-4 h-4 text-amber-500" />
                <h3 className="text-sm font-bold text-amber-600 dark:text-amber-400">Paste Transcript Manually (Optional)</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowManualPaste(false)}
                className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
              Copy the transcript from YouTube (click &quot;...&quot; → &quot;Show transcript&quot;) and paste it here if you have custom notes.
            </p>
            <textarea
              value={manualTranscript}
              onChange={(e) => setManualTranscript(e.target.value)}
              placeholder="Paste the video transcript here..."
              rows={8}
              className={`w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all outline-none resize-y ${
                isDark
                  ? 'bg-[#0F172A] border-[#334155] text-white placeholder-slate-500 focus:border-amber-500/60'
                  : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-amber-400'
              }`}
            />
            {manualTranscript.trim() && (
              <button
                onClick={() => {
                  handleGenerate();
                  haptics.medium?.();
                }}
                className="mt-3 w-full py-3 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" /> Generate from Pasted Transcript
              </button>
            )}
          </div>
        )}

        {/* Error Display */}
        {error && !showManualPaste && (
          <div className={`rounded-2xl border p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-view-fade ${
            isDark
              ? 'bg-red-500/10 border-red-500/30'
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-600 dark:text-red-400">{error}</p>
              </div>
            </div>
            {(!apiKey || error.toLowerCase().includes('api key')) && (
              <button
                type="button"
                onClick={() => {
                  setTempApiKeyInput(apiKey);
                  setShowApiKeyModal(true);
                  soundManager.playClick?.();
                }}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shrink-0 shadow-sm flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Enter Gemini API Key</span>
              </button>
            )}
          </div>
        )}

        {/* Saved Notes Library */}
        {savedNotes.length > 0 && (
          <div className="space-y-3">
            <button
              onClick={() => {
                setShowSavedNotes(!showSavedNotes);
                soundManager.playClick?.();
              }}
              className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
            >
              {showSavedNotes ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              <BookOpen className="w-4 h-4" />
              Saved Notes ({savedNotes.length})
            </button>

            {showSavedNotes && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {savedNotes.map(note => (
                  <div
                    key={note.id}
                    onClick={() => handleOpenNote(note)}
                    className={`rounded-xl border p-3 cursor-pointer transition-all duration-200 hover:scale-[1.01] group ${
                      isDark
                        ? 'bg-[#1E293B]/80 border-[#334155] hover:border-violet-500/40'
                        : 'bg-white border-[#DDD6FE] hover:border-violet-400 shadow-sm hover:shadow-md'
                    }`}
                  >
                    <div className="flex gap-3">
                      {/* Thumbnail */}
                      {note.thumbnailUrl && (
                        <div className="w-20 h-14 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={note.thumbnailUrl}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 mb-1">
                          {note.customTitle || note.videoTitle}
                        </h4>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400">
                          <span className={`px-1.5 py-0.5 rounded-md font-bold ${
                            isDark ? 'bg-violet-600/20 text-violet-400' : 'bg-violet-100 text-violet-600'
                          }`}>
                            {getNoteTypeLabel(note.noteType)}
                          </span>
                          <span>{getLanguageLabel(note.language)}</span>
                          <span className="flex items-center gap-0.5">
                            <Clock className="w-3 h-3" /> {formatNoteDate(note.updatedAt)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDuplicateNote(note.id);
                        }}
                        className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        title="Duplicate"
                      >
                        <CopyPlus className="w-3.5 h-3.5 text-slate-400" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm('Delete this note?')) handleDeleteNote(note.id);
                        }}
                        className="p-1 rounded-lg hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* API Key Modal */}
        {renderApiKeyModal()}
      </div>
    );
  }

  // ═════════════════════════════════════════════════════════════
  // ── RENDER: PROGRESS STATE ──
  // ═════════════════════════════════════════════════════════════

  if (viewState === 'progress') {
    const stages = [
      'Video detected',
      'Transcript processing',
      'Topic identification',
      'Important concepts extraction',
      'Notes structure generation',
      'Formatting notes',
      'Finalizing document',
    ];

    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-view-fade">
        {/* Video Preview (minimized) */}
        {metadata && (
          <div className={`rounded-2xl border p-3 flex items-center gap-3 ${
            isDark
              ? 'bg-[#1E293B]/90 border-[#334155]'
              : 'bg-white/95 border-[#DDD6FE]'
          }`}>
            <img
              src={metadata.thumbnailUrl}
              alt=""
              className="w-16 h-11 rounded-lg object-cover"
            />
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{metadata.title}</p>
              <p className="text-[10px] text-slate-400">{metadata.channel}</p>
            </div>
          </div>
        )}

        {/* Progress Card */}
        <div className={`rounded-2xl border p-5 sm:p-6 ${
          isDark
            ? 'bg-[#1E293B]/90 border-[#334155] shadow-xl'
            : 'bg-white/95 border-[#DDD6FE] shadow-[0_12px_40px_rgba(124,58,237,0.08)]'
        }`}>
          <div className="flex items-center gap-3 mb-5">
            <div className="relative">
              <Loader2 className="w-6 h-6 text-violet-500 animate-spin" />
              <div className="absolute inset-0 animate-ping opacity-20">
                <Sparkles className="w-6 h-6 text-violet-500" />
              </div>
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Generating Notes</h2>
              <p className="text-xs text-slate-400">AI is analyzing your video...</p>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-3">
            {stages.map((stage, i) => {
              const currentStage = progress?.stage ?? -1;
              const isComplete = i < currentStage;
              const isCurrent = i === currentStage;
              const isPending = i > currentStage;

              return (
                <div key={i} className="flex items-center gap-3">
                  {/* Icon */}
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                    isComplete
                      ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                      : isCurrent
                        ? 'bg-violet-500 shadow-[0_0_12px_rgba(139,92,246,0.4)]'
                        : isDark
                          ? 'bg-[#0F172A] border border-[#334155]'
                          : 'bg-slate-100 border border-slate-200'
                  }`}>
                    {isComplete ? (
                      <CheckCircle2 className="w-4 h-4 text-white" strokeWidth={3} />
                    ) : isCurrent ? (
                      <Loader2 className="w-4 h-4 text-white animate-spin" />
                    ) : (
                      <span className="text-[10px] font-bold text-slate-400">{i + 1}</span>
                    )}
                  </div>

                  {/* Label */}
                  <span className={`text-sm font-medium transition-all duration-300 ${
                    isComplete
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : isCurrent
                        ? 'text-violet-600 dark:text-violet-400 font-bold'
                        : 'text-slate-400 dark:text-slate-500'
                  }`}>
                    {stage}
                    {isComplete && ' ✓'}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Cancel Button */}
          <button
            onClick={() => {
              setViewState('input');
              setIsGenerating(false);
            }}
            className="mt-5 w-full py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-red-400 border border-slate-200 dark:border-[#334155] hover:border-red-300 dark:hover:border-red-500/30 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  // ═════════════════════════════════════════════════════════════
  // ── RENDER: EDITOR STATE (3-column on desktop) ──
  // ═════════════════════════════════════════════════════════════

  return (
    <div className="animate-view-fade -mx-3 sm:-mx-4 md:-mx-5 -mt-3 sm:-mt-4 md:-mt-5">
      {/* Top Toolbar */}
      <div className={`sticky top-0 z-20 px-3 sm:px-4 py-2 flex items-center justify-between gap-2 border-b backdrop-blur-2xl ${
        isDark
          ? 'bg-[#0F172A]/95 border-[#334155]'
          : 'bg-white/95 border-[#DDD6FE]'
      }`}>
        <div className="flex items-center gap-2 min-w-0">
          <button
            onClick={handleBackToInput}
            className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title="Back"
          >
            <ArrowLeft className="w-4 h-4 text-slate-500" />
          </button>
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[200px] sm:max-w-md">
              {metadata?.title || 'YouTube Notes'}
            </p>
            <p className="text-[10px] text-slate-400 truncate">
              {getNoteTypeLabel(settings.noteType)} · {getLanguageLabel(settings.language)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {isEditing ? (
            <>
              <button
                onClick={() => { setIsEditing(false); setEditContent(generatedNotes); }}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdits}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
              >
                Save
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => { setIsEditing(true); setEditContent(generatedNotes); }}
                className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                title="Edit"
              >
                <Edit3 className="w-4 h-4 text-slate-500" />
              </button>
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                title="Copy"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-slate-500" />}
              </button>
              <button
                onClick={handleExportPdf}
                className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                title="Export PDF"
              >
                <Download className="w-4 h-4 text-slate-500" />
              </button>
              <button
                onClick={handlePrint}
                className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                title="Print"
              >
                <Printer className="w-4 h-4 text-slate-500" />
              </button>
              <button
                onClick={handleNewNote}
                className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                title="New Note"
              >
                <FileText className="w-4 h-4 text-slate-500" />
              </button>
              <button
                onClick={() => {
                  setTempApiKeyInput(apiKey);
                  setShowApiKeyModal(true);
                  soundManager.playClick?.();
                }}
                className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                title={apiKey ? "Gemini API Key Connected (Click to manage)" : "Setup Free Gemini API Key"}
              >
                <KeyRound className={`w-4 h-4 ${apiKey ? 'text-emerald-500' : 'text-amber-500 animate-pulse'}`} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* 3-Column Layout */}
      <div className="flex">
        {/* Left: Table of Contents (Desktop only) */}
        {showToc && tocEntries.length > 0 && (
          <aside className={`hidden lg:block w-56 flex-shrink-0 border-r p-3 overflow-y-auto sticky top-[42px] h-[calc(100vh-42px-80px)] ${
            isDark ? 'border-[#334155] bg-[#0F172A]/50' : 'border-[#DDD6FE]/60 bg-slate-50/50'
          }`}>
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Contents</h4>
            <nav className="space-y-0.5">
              {tocEntries.map((entry, i) => (
                <button
                  key={i}
                  onClick={() => scrollToHeading(entry.id)}
                  className={`block w-full text-left text-xs font-medium py-1 px-2 rounded-lg truncate transition-colors hover:text-violet-600 dark:hover:text-violet-400 ${
                    entry.level === 1
                      ? 'text-slate-700 dark:text-slate-200 font-bold'
                      : entry.level === 2
                        ? 'pl-4 text-slate-600 dark:text-slate-300'
                        : 'pl-6 text-slate-400 dark:text-slate-500'
                  } hover:bg-violet-50 dark:hover:bg-violet-500/10`}
                  title={entry.text}
                >
                  {entry.text}
                </button>
              ))}
            </nav>
          </aside>
        )}

        {/* Center: Notes Content */}
        <main
          ref={notesContainerRef}
          className="flex-1 min-w-0 p-4 sm:p-5 md:p-6 overflow-y-auto"
          style={{ maxHeight: 'calc(100vh - 42px - 80px)' }}
        >
          {isEditing ? (
            <textarea
              ref={textareaRef}
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className={`w-full min-h-[70vh] p-4 rounded-xl border text-sm font-mono leading-relaxed resize-y outline-none transition-all ${
                isDark
                  ? 'bg-[#0F172A] border-[#334155] text-slate-200 focus:border-violet-500/50'
                  : 'bg-white border-slate-200 text-slate-800 focus:border-violet-400'
              }`}
            />
          ) : (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <MarkdownRenderer content={generatedNotes} tocEntries={tocEntries} />
            </div>
          )}

          {/* Error in editor mode */}
          {error && (
            <div className={`mt-4 rounded-xl border p-3 flex items-center gap-2 ${
              isDark ? 'bg-red-500/10 border-red-500/30' : 'bg-red-50 border-red-200'
            }`}>
              <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}
        </main>

        {/* Right: AI Actions & Tools (Desktop only) */}
        <aside className={`hidden xl:block w-60 flex-shrink-0 border-l p-3 overflow-y-auto sticky top-[42px] h-[calc(100vh-42px-80px)] ${
          isDark ? 'border-[#334155] bg-[#0F172A]/50' : 'border-[#DDD6FE]/60 bg-slate-50/50'
        }`}>
          {/* Video Info Mini */}
          {metadata && (
            <div className={`rounded-xl border p-3 mb-3 ${
              isDark ? 'bg-[#1E293B]/80 border-[#334155]' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <img
                src={metadata.thumbnailUrl}
                alt=""
                className="w-full h-24 rounded-lg object-cover mb-2"
              />
              <p className="text-[11px] font-bold text-slate-900 dark:text-white line-clamp-2">{metadata.title}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{metadata.channel}</p>
              <a
                href={metadata.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-1.5 text-[10px] text-red-500 font-medium hover:underline"
              >
                <ExternalLink className="w-3 h-3" /> Watch Video
              </a>
            </div>
          )}

          {/* AI Actions */}
          <div className="mb-3">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">AI Actions</h4>
            {selectedText && (
              <p className="text-[10px] text-violet-500 dark:text-violet-400 mb-2 font-medium">
                ✨ Selected text ready for AI action
              </p>
            )}
            <div className="space-y-1">
              {([
                { action: 'improve' as AiActionType, icon: <Wand2 className="w-3.5 h-3.5" />, label: 'Improve Clarity' },
                { action: 'expand' as AiActionType, icon: <Expand className="w-3.5 h-3.5" />, label: 'Expand Section' },
                { action: 'shorten' as AiActionType, icon: <ListTodo className="w-3.5 h-3.5" />, label: 'Shorten / Revise' },
                { action: 'make_important' as AiActionType, icon: <Zap className="w-3.5 h-3.5" />, label: 'Make Important' },
                { action: 'convert_table' as AiActionType, icon: <TableIcon className="w-3.5 h-3.5" />, label: 'Convert to Table' },
                { action: 'explain_formula' as AiActionType, icon: <Hash className="w-3.5 h-3.5" />, label: 'Explain Formula' },
                { action: 'regenerate' as AiActionType, icon: <RefreshCw className="w-3.5 h-3.5" />, label: 'Regenerate' },
              ]).map(item => (
                <button
                  key={item.action}
                  onClick={() => handleAiAction(item.action)}
                  disabled={isAiActionRunning}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all text-left ${
                    isAiActionRunning
                      ? 'opacity-50 cursor-not-allowed'
                      : isDark
                        ? 'text-slate-300 hover:bg-[#1E293B] hover:text-violet-400'
                        : 'text-slate-600 hover:bg-violet-50 hover:text-violet-600'
                  }`}
                >
                  {isAiActionRunning ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Language Toggle */}
          <div className={`rounded-xl border p-3 mb-3 ${
            isDark ? 'bg-[#1E293B]/80 border-[#334155]' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Translate</h4>
            <button
              onClick={handleTranslateDocument}
              disabled={isAiActionRunning}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                isAiActionRunning
                  ? 'opacity-50 cursor-not-allowed'
                  : 'bg-gradient-to-r from-violet-600/10 to-cyan-500/10 text-violet-600 dark:text-violet-400 hover:from-violet-600/20 hover:to-cyan-500/20'
              }`}
            >
              <Languages className="w-4 h-4" />
              {settings.language === 'hindi' ? 'Translate to English' : 'हिन्दी में अनुवाद करें'}
            </button>
          </div>

          {/* Quick Actions */}
          <div className="space-y-1">
            <button
              onClick={handleNewNote}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium ${
                isDark ? 'text-slate-300 hover:bg-[#1E293B]' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-3.5 h-3.5" /> New Note
            </button>
            {currentNoteId && (
              <>
                <button
                  onClick={() => currentNoteId && handleDuplicateNote(currentNoteId)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium ${
                    isDark ? 'text-slate-300 hover:bg-[#1E293B]' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <CopyPlus className="w-3.5 h-3.5" /> Duplicate
                </button>
                <button
                  onClick={() => {
                    if (confirm('Delete this note?') && currentNoteId) handleDeleteNote(currentNoteId);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-red-400 ${
                    isDark ? 'hover:bg-red-500/10' : 'hover:bg-red-50'
                  }`}
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete Note
                </button>
              </>
            )}
          </div>
        </aside>
      </div>

      {/* Mobile Bottom Action Bar */}
      <div className={`xl:hidden fixed bottom-16 md:bottom-0 left-0 right-0 z-30 px-3 py-2 border-t backdrop-blur-2xl flex items-center justify-around gap-1 ${
        isDark ? 'bg-[#0F172A]/95 border-[#334155]' : 'bg-white/95 border-[#DDD6FE]'
      }`}>
        <button
          onClick={() => { setIsEditing(!isEditing); if (isEditing) { setEditContent(generatedNotes); } }}
          className="flex flex-col items-center gap-0.5 p-1.5"
        >
          <Edit3 className={`w-4 h-4 ${isEditing ? 'text-violet-500' : 'text-slate-400'}`} />
          <span className="text-[9px] font-medium text-slate-400">{isEditing ? 'Preview' : 'Edit'}</span>
        </button>
        <button onClick={handleCopy} className="flex flex-col items-center gap-0.5 p-1.5">
          <Copy className={`w-4 h-4 ${copied ? 'text-emerald-500' : 'text-slate-400'}`} />
          <span className="text-[9px] font-medium text-slate-400">{copied ? 'Copied!' : 'Copy'}</span>
        </button>
        <button onClick={handleExportPdf} className="flex flex-col items-center gap-0.5 p-1.5">
          <Download className="w-4 h-4 text-slate-400" />
          <span className="text-[9px] font-medium text-slate-400">PDF</span>
        </button>
        <button onClick={handleTranslateDocument} disabled={isAiActionRunning} className="flex flex-col items-center gap-0.5 p-1.5">
          <Languages className={`w-4 h-4 ${isAiActionRunning ? 'text-slate-300 animate-pulse' : 'text-slate-400'}`} />
          <span className="text-[9px] font-medium text-slate-400">Translate</span>
        </button>
        <button
          onClick={() => setShowAiPanel(!showAiPanel)}
          className="flex flex-col items-center gap-0.5 p-1.5"
        >
          <Sparkles className={`w-4 h-4 ${showAiPanel ? 'text-violet-500' : 'text-slate-400'}`} />
          <span className="text-[9px] font-medium text-slate-400">AI</span>
        </button>
      </div>

      {/* Mobile AI Actions Slide-up Panel */}
      {showAiPanel && (
        <div className={`xl:hidden fixed bottom-28 md:bottom-12 left-3 right-3 z-40 rounded-2xl border p-4 shadow-2xl animate-view-fade ${
          isDark ? 'bg-[#1E293B] border-[#334155]' : 'bg-white border-[#DDD6FE]'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-violet-500" /> AI Actions
            </h4>
            <button onClick={() => setShowAiPanel(false)} className="p-1">
              <X className="w-4 h-4 text-slate-400" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {([
              { action: 'improve' as AiActionType, label: 'Improve' },
              { action: 'expand' as AiActionType, label: 'Expand' },
              { action: 'shorten' as AiActionType, label: 'Shorten' },
              { action: 'make_important' as AiActionType, label: 'Important' },
              { action: 'convert_table' as AiActionType, label: 'To Table' },
              { action: 'explain_formula' as AiActionType, label: 'Explain' },
              { action: 'regenerate' as AiActionType, label: 'Regenerate' },
            ]).map(item => (
              <button
                key={item.action}
                onClick={() => { handleAiAction(item.action); setShowAiPanel(false); }}
                disabled={isAiActionRunning}
                className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isDark
                    ? 'bg-[#0F172A] text-slate-300 hover:bg-violet-600/20 hover:text-violet-400'
                    : 'bg-slate-50 text-slate-600 hover:bg-violet-50 hover:text-violet-600'
                } ${isAiActionRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* API Key Modal */}
      {renderApiKeyModal()}
    </div>
  );
};

// ─── Markdown Renderer Component ────────────────────────────────

interface MarkdownRendererProps {
  content: string;
  tocEntries: { level: number; text: string; id: string }[];
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = React.memo(({ content, tocEntries }) => {
  if (!content) return null;

  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;
  let headingIndex = 0;

  while (i < lines.length) {
    const line = lines[i];

    // ── Headings ──
    const headingMatch = line.match(/^(#{1,3})\s+(.*)/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2];
      const id = tocEntries[headingIndex]?.id || `h-${i}`;
      headingIndex++;

      const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
      elements.push(
        <HeadingTag
          key={i}
          id={id}
          className={`scroll-mt-16 ${
            level === 1
              ? 'text-xl sm:text-2xl font-black mt-2 mb-4 text-slate-900 dark:text-white'
              : level === 2
                ? 'text-base sm:text-lg font-bold mt-6 mb-3 text-slate-800 dark:text-slate-100 border-b border-slate-200/60 dark:border-[#334155]/60 pb-1.5'
                : 'text-sm font-bold mt-4 mb-2 text-slate-700 dark:text-slate-200'
          }`}
        >
          <InlineFormatted text={text} />
        </HeadingTag>
      );
      i++;
      continue;
    }

    // ── Callout blocks (> [!NOTE], > [!TIP], etc.) ──
    if (/^>\s*\[!(?:NOTE|TIP|WARNING|IMPORTANT|CAUTION|FORMULA|RULE|EXAMPLE)\]/i.test(line)) {
      const calloutLines: string[] = [line];
      let j = i + 1;
      while (j < lines.length && lines[j].startsWith('>')) {
        calloutLines.push(lines[j]);
        j++;
      }
      
      const typeMatch = calloutLines[0].match(/\[!(\w+)\]/i);
      const type = (typeMatch?.[1] || 'note').toLowerCase();
      const contentText = calloutLines
        .map(l => l.replace(/^>\s*(?:\[!\w+\]\s*)?/, ''))
        .filter(l => l.trim())
        .join('\n');
      
      const colors: Record<string, string> = {
        note: 'border-blue-400 bg-blue-50/50 dark:bg-blue-500/10 dark:border-blue-500/40',
        tip: 'border-emerald-400 bg-emerald-50/50 dark:bg-emerald-500/10 dark:border-emerald-500/40',
        warning: 'border-amber-400 bg-amber-50/50 dark:bg-amber-500/10 dark:border-amber-500/40',
        important: 'border-violet-400 bg-violet-50/50 dark:bg-violet-500/10 dark:border-violet-500/40',
        caution: 'border-red-400 bg-red-50/50 dark:bg-red-500/10 dark:border-red-500/40',
        formula: 'border-cyan-400 bg-cyan-50/50 dark:bg-cyan-500/10 dark:border-cyan-500/40',
        rule: 'border-indigo-400 bg-indigo-50/50 dark:bg-indigo-500/10 dark:border-indigo-500/40',
        example: 'border-teal-400 bg-teal-50/50 dark:bg-teal-500/10 dark:border-teal-500/40',
      };

      elements.push(
        <div key={i} className={`rounded-xl border-l-4 p-3 sm:p-4 my-3 ${colors[type] || colors.note}`}>
          <div className="text-[10px] font-black uppercase tracking-wider mb-1.5 text-slate-500 dark:text-slate-400">
            {type}
          </div>
          <div className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
            <InlineFormatted text={contentText} />
          </div>
        </div>
      );
      i = j;
      continue;
    }

    // ── Code blocks ──
    if (line.startsWith('```')) {
      const lang = line.replace('```', '').trim();
      const codeLines: string[] = [];
      let j = i + 1;
      while (j < lines.length && !lines[j].startsWith('```')) {
        codeLines.push(lines[j]);
        j++;
      }
      elements.push(
        <pre key={i} className="rounded-xl bg-slate-900 text-slate-200 text-xs p-4 my-3 overflow-x-auto">
          <code>{codeLines.join('\n')}</code>
        </pre>
      );
      i = j + 1;
      continue;
    }

    // ── Math blocks ($$...$$) ──
    if (line.trim().startsWith('$$')) {
      const mathLines: string[] = [line.replace('$$', '')];
      let j = i + 1;
      while (j < lines.length && !lines[j].includes('$$')) {
        mathLines.push(lines[j]);
        j++;
      }
      if (j < lines.length) {
        mathLines.push(lines[j].replace('$$', ''));
      }
      const mathContent = mathLines.join('\n').trim();
      if (mathContent) {
        elements.push(
          <div key={i} className="my-3 flex justify-center">
            <MathBlock latex={mathContent} />
          </div>
        );
      }
      i = j + 1;
      continue;
    }

    // ── Tables ──
    if (line.includes('|') && line.trim().startsWith('|') && i + 1 < lines.length && lines[i + 1]?.includes('---')) {
      const tableLines: string[] = [line];
      let j = i + 1;
      while (j < lines.length && lines[j].includes('|')) {
        tableLines.push(lines[j]);
        j++;
      }

      const rows = tableLines
        .filter(l => !l.match(/^\s*\|[\s:-]+\|\s*$/)) // Skip separator rows
        .map(l =>
          l.split('|')
            .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1)
            .map(cell => cell.trim())
        );

      if (rows.length > 0) {
        elements.push(
          <div key={i} className="overflow-x-auto my-3 rounded-xl">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr>
                  {rows[0].map((cell, ci) => (
                    <th key={ci} className="px-3 py-2 bg-violet-50 dark:bg-violet-600/10 text-left font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-[#334155]">
                      <InlineFormatted text={cell} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.slice(1).map((row, ri) => (
                  <tr key={ri} className="even:bg-slate-50/50 dark:even:bg-[#1E293B]/30">
                    {row.map((cell, ci) => (
                      <td key={ci} className="px-3 py-2 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#334155]">
                        <InlineFormatted text={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      i = j;
      continue;
    }

    // ── Bullet/numbered lists ──
    if (/^[\s]*[-*+]\s/.test(line) || /^[\s]*\d+\.\s/.test(line)) {
      const listItems: string[] = [];
      let j = i;
      const isOrdered = /^[\s]*\d+\.\s/.test(line);
      while (j < lines.length && (/^[\s]*[-*+]\s/.test(lines[j]) || /^[\s]*\d+\.\s/.test(lines[j]))) {
        listItems.push(lines[j].replace(/^[\s]*[-*+]\s/, '').replace(/^[\s]*\d+\.\s/, '').trim());
        j++;
      }

      const ListTag = isOrdered ? 'ol' : 'ul';
      elements.push(
        <ListTag key={i} className={`my-2 space-y-1 ${isOrdered ? 'list-decimal' : 'list-disc'} pl-5`}>
          {listItems.map((item, li) => (
            <li key={li} className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <InlineFormatted text={item} />
            </li>
          ))}
        </ListTag>
      );
      i = j;
      continue;
    }

    // ── Horizontal rule ──
    if (/^[-*_]{3,}$/.test(line.trim())) {
      elements.push(<hr key={i} className="my-4 border-slate-200 dark:border-[#334155]" />);
      i++;
      continue;
    }

    // ── Empty line ──
    if (!line.trim()) {
      i++;
      continue;
    }

    // ── Normal paragraph ──
    elements.push(
      <p key={i} className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed my-2">
        <InlineFormatted text={line} />
      </p>
    );
    i++;
  }

  return <>{elements}</>;
});

MarkdownRenderer.displayName = 'MarkdownRenderer';

// ─── Inline Formatting Component ────────────────────────────────

const InlineFormatted: React.FC<{ text: string }> = React.memo(({ text }) => {
  if (!text) return null;

  // Process inline formatting: bold, italic, code, inline math, links, timestamps
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let keyIndex = 0;

  while (remaining.length > 0) {
    // ── Inline math ($...$) ──
    const mathMatch = remaining.match(/\$([^$]+)\$/);
    // ── Bold (**...**) ──
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    // ── Italic (*...*) ──
    const italicMatch = remaining.match(/(?<!\*)\*([^*]+)\*(?!\*)/);
    // ── Inline code (`...`) ──
    const codeMatch = remaining.match(/`([^`]+)`/);
    // ── Links [text](url) ──
    const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);

    // Find the earliest match
    const matches = [
      { type: 'math', match: mathMatch },
      { type: 'bold', match: boldMatch },
      { type: 'italic', match: italicMatch },
      { type: 'code', match: codeMatch },
      { type: 'link', match: linkMatch },
    ].filter(m => m.match) as { type: string; match: RegExpMatchArray }[];

    if (matches.length === 0) {
      parts.push(<span key={keyIndex++}>{remaining}</span>);
      break;
    }

    // Sort by position
    matches.sort((a, b) => (a.match.index ?? 0) - (b.match.index ?? 0));
    const first = matches[0];
    const idx = first.match.index ?? 0;

    // Text before the match
    if (idx > 0) {
      parts.push(<span key={keyIndex++}>{remaining.slice(0, idx)}</span>);
    }

    switch (first.type) {
      case 'math':
        parts.push(
          <InlineMath key={keyIndex++} latex={first.match[1]} />
        );
        break;
      case 'bold':
        parts.push(
          <strong key={keyIndex++} className="font-bold text-slate-900 dark:text-white">
            {first.match[1]}
          </strong>
        );
        break;
      case 'italic':
        parts.push(
          <em key={keyIndex++} className="italic">{first.match[1]}</em>
        );
        break;
      case 'code':
        parts.push(
          <code key={keyIndex++} className="px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-violet-600 dark:text-violet-400 text-xs font-mono">
            {first.match[1]}
          </code>
        );
        break;
      case 'link': {
        const isTimestamp = first.match[1].includes('⏱️') || /^\d{1,2}:\d{2}/.test(first.match[1]);
        parts.push(
          <a
            key={keyIndex++}
            href={first.match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-0.5 ${
              isTimestamp
                ? 'px-1.5 py-0.5 rounded-md bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold hover:bg-red-100 dark:hover:bg-red-500/20'
                : 'text-violet-600 dark:text-violet-400 hover:underline'
            } transition-colors`}
          >
            {first.match[1]}
          </a>
        );
        break;
      }
    }

    remaining = remaining.slice(idx + first.match[0].length);
  }

  return <>{parts}</>;
});

InlineFormatted.displayName = 'InlineFormatted';
