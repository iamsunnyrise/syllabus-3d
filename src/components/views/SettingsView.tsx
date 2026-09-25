import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useSyllabus } from '../../context/SyllabusContext';
import { useAuth } from '../../context/AuthContext';
import { useTimer } from '../../context/TimerContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Download,
  Upload,
  RotateCcw,
  Smartphone,
  CheckCircle2,
  Trash2,
  LogOut,
  Target,
  Clock,
  Check,
  Palette,
  Play,
  Flame,
  Moon,
  Sun,
  Database,
  Edit2,
  Save,
  Volume2,
  VolumeX,
  Bell,
  Sparkles,
  Sliders,
  Award,
  Camera,
  User,
  Image as ImageIcon,
  HardDrive,
  FileCheck2,
  RefreshCw,
  BookOpen,
  Zap,
  ShieldCheck,
  Users,
  UserPlus,
  ArrowRight,
  AlertCircle,
  Lock,
  KeyRound,
  Cloud,
  Eye,
  EyeOff,
  ExternalLink,
  Loader2,
  Video,
  Search
} from 'lucide-react';
import { soundManager, AudioSettings } from '../../utils/soundEffects';
import { haptics } from '../../utils/haptics';
import { usePWA } from '../../hooks/usePWA';
import { PWAInstallModal } from '../modals/PWAInstallModal';
import { SetPinModal } from '../security/SetPinModal';
import { usePinLock } from '../../context/PinLockContext';
import { TimerFontFamily } from '../../types/timer';
import { GoogleDriveBackupModal } from '../modals/GoogleDriveBackupModal';
import { GoogleAuthSettingsCard } from '../settings/GoogleAuthSettingsCard';
import { SectionBadgeIcon } from '../common/SectionBadgeIcon';
import { getValidAccessToken } from '../../utils/googleDriveClient';
import {
  getStoredGeminiApiKey,
  setStoredGeminiApiKey,
  clearStoredGeminiApiKey
} from '../../utils/youtubeNotesGenerator';

export type SettingsTab =
  | 'account'
  | 'exam'
  | 'notification'
  | 'sound'
  | 'membership'
  | 'security'
  | 'ai'
  | 'appearance'
  | 'timer'
  | 'data';

interface SettingsViewProps {
  onOpenPricing?: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onOpenPricing }) => {
  const {
    profile,
    updateProfile,
    currentExam,
    updateCurrentExamDetails,
    overallStats,
    exportData,
    importData,
    restoreSafetySnapshot,
    getStorageMetrics,
    resetToDemo,
    clearAllDemoData,
    exams,
    plannerTasks,
    revisions,
    top3Targets,
    reflectionsHistory,
    lastSavedAt,
    isAutoSaving
  } = useSyllabus();

  const { user, logout, updateUserSession } = useAuth();
  const { updateSettings, showFloatingOverlay, settings } = useTimer();
  const { theme, setTheme } = useTheme();
  const { isInstalled } = usePWA();
  const [showPwaModal, setShowPwaModal] = useState(false);

  const [activeTab, setActiveTab] = useState<SettingsTab>('account');
  const [searchQuery, setSearchQuery] = useState('');
  const [accountSaved, setAccountSaved] = useState(false);
  const [soundSaved, setSoundSaved] = useState(false);
  const [timerSaved, setTimerSaved] = useState(false);

  // Safety PIN Lock State
  const { config: pinConfig, isConfigured: isPinConfigured, updateConfig: updatePinConfig, disablePin } = usePinLock();
  const [isSetPinModalOpen, setIsSetPinModalOpen] = useState(false);
  const [setPinModalMode, setSetPinModalMode] = useState<'enable' | 'change'>('enable');
  const [showDisablePinDialog, setShowDisablePinDialog] = useState(false);
  const [disablePinInput, setDisablePinInput] = useState('');
  const [disablePinError, setDisablePinError] = useState<string | null>(null);
  const [isDisablingPin, setIsDisablingPin] = useState(false);

  // Profile Edit State
  const [name, setName] = useState(profile.name || user?.name || '');
  const [isEditingName, setIsEditingName] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);

  useEffect(() => {
    setName(profile.name || user?.name || '');
  }, [profile.name, user?.name]);

  // Timer Typography Font Selection
  const [timerFont, setTimerFont] = useState<TimerFontFamily>(() => {
    return (localStorage.getItem('syllabus3d_timer_font') as TimerFontFamily) || 'jetbrains';
  });

  const handleSelectTimerFont = (font: TimerFontFamily) => {
    setTimerFont(font);
    try {
      localStorage.setItem('syllabus3d_timer_font', font);
      window.dispatchEvent(new Event('syllabus3d_timer_font_change'));
    } catch {}
  };

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

  // Exam Countdown Settings state
  const [examName, setExamName] = useState(currentExam?.name || 'SSC CGL 2026');
  const [examDate, setExamDate] = useState(currentExam?.examDate || '2026-09-15');
  const [targetYear, setTargetYear] = useState<number>(currentExam?.targetYear || 2026);
  const [examSaved, setExamSaved] = useState(false);
  const [themeSaved, setThemeSaved] = useState(false);

  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [testLaunched, setTestLaunched] = useState(false);

  // Live Storage Health & Snapshot Telemetry
  const [storageMetrics, setStorageMetrics] = useState(() => getStorageMetrics());
  const [isRestoringSnapshot, setIsRestoringSnapshot] = useState(false);
  const [snapshotStatus, setSnapshotStatus] = useState<'idle' | 'success' | 'empty' | 'error'>('idle');

  // Google Drive Cloud Backup Hub State
  const [showGoogleDriveModal, setShowGoogleDriveModal] = useState(false);
  const [gdriveConnected, setGdriveConnected] = useState(() => Boolean(getValidAccessToken()));

  // Gemini AI Engine Configuration State
  const [geminiApiKey, setGeminiApiKey] = useState(() => getStoredGeminiApiKey());
  const [tempAiKey, setTempAiKey] = useState(() => getStoredGeminiApiKey());
  const [showAiKeySecret, setShowAiKeySecret] = useState(false);
  const [aiKeySaveSuccess, setAiKeySaveSuccess] = useState(false);
  const [isTestingAiKey, setIsTestingAiKey] = useState(false);
  const [aiTestResult, setAiTestResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSaveGeminiKey = (e?: React.FormEvent) => {
    e?.preventDefault();
    const cleanKey = tempAiKey.trim();
    if (!cleanKey) {
      clearStoredGeminiApiKey();
      setGeminiApiKey('');
      setTempAiKey('');
      setAiTestResult(null);
      soundManager.playClick();
      return;
    }
    setStoredGeminiApiKey(cleanKey);
    setGeminiApiKey(cleanKey);
    setAiKeySaveSuccess(true);
    setAiTestResult(null);
    soundManager.playCompleteChime();
    haptics.success();
    setTimeout(() => setAiKeySaveSuccess(false), 3000);
  };

  const handleRemoveGeminiKey = () => {
    clearStoredGeminiApiKey();
    setGeminiApiKey('');
    setTempAiKey('');
    setAiTestResult(null);
    soundManager.playClick();
    haptics.selection();
  };

  const handleTestGeminiKey = async () => {
    const keyToTest = tempAiKey.trim() || geminiApiKey;
    if (!keyToTest) {
      setAiTestResult({ success: false, message: 'Please enter a valid API key first.' });
      soundManager.playError();
      return;
    }
    setIsTestingAiKey(true);
    setAiTestResult(null);
    try {
      let resp = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${keyToTest}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: 'Hello, respond with OK.' }] }],
            generationConfig: { maxOutputTokens: 5 }
          })
        }
      );
      if (!resp.ok) {
        resp = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${keyToTest}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: 'Hello, respond with OK.' }] }],
              generationConfig: { maxOutputTokens: 5 }
            })
          }
        );
      }
      if (resp.ok) {
        setAiTestResult({ success: true, message: 'Connection verified! Google Gemini AI is operational and ready.' });
        soundManager.playCompleteChime();
        haptics.success();
      } else {
        const data = await resp.json().catch(() => ({}));
        const msg = data?.error?.message || `HTTP ${resp.status} - Invalid or unauthorized API key.`;
        setAiTestResult({ success: false, message: msg });
        soundManager.playError();
      }
    } catch (err: any) {
      setAiTestResult({ success: false, message: err?.message || 'Network error connecting to Google Gemini API.' });
      soundManager.playError();
    } finally {
      setIsTestingAiKey(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'data') {
      setStorageMetrics(getStorageMetrics());
      setGdriveConnected(Boolean(getValidAccessToken()));
    }
  }, [activeTab, lastSavedAt, exams, profile, plannerTasks, revisions, top3Targets, reflectionsHistory]);

  const handleRestoreSnapshot = async () => {
    if (!window.confirm('Restore your latest automated safety snapshot from IndexedDB? This will restore your data to the last verified safe state.')) {
      return;
    }
    setIsRestoringSnapshot(true);
    setSnapshotStatus('idle');
    try {
      const ok = await restoreSafetySnapshot();
      if (ok) {
        setSnapshotStatus('success');
        setStorageMetrics(getStorageMetrics());
        haptics.success();
        setTimeout(() => setSnapshotStatus('idle'), 4000);
      } else {
        setSnapshotStatus('empty');
      }
    } catch {
      setSnapshotStatus('error');
    } finally {
      setIsRestoringSnapshot(false);
    }
  };

  // Approximate local storage usage in KB
  const storageUsageKb = useMemo(() => {
    return Math.max(1, Math.round(storageMetrics.usedBytes / 1024));
  }, [storageMetrics]);

  // Sound & Motivation Audio state
  const [audioConfig, setAudioConfig] = useState<AudioSettings>(() => soundManager.getSettings());
  const [hapticsEnabled, setHapticsEnabled] = useState<boolean>(() => haptics.isEnabled());

  const handleUpdateAudio = (partial: Partial<AudioSettings>) => {
    soundManager.updateSettings(partial);
    const updated = soundManager.getSettings();
    setAudioConfig(updated);
  };

  const handleToggleHaptics = (val: boolean) => {
    haptics.setEnabled(val);
    setHapticsEnabled(val);
    if (val) haptics.success();
  };

  // Avatar Upload State & Handlers
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarNotice, setAvatarNotice] = useState(false);

  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        // High quality client-side resize to 256x256 WebP/JPEG
        const canvas = document.createElement('canvas');
        const maxDim = 256;
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.88);
          updateProfile({ avatarUrl: compressedDataUrl });
          updateUserSession({ avatarUrl: compressedDataUrl });
          soundManager.playCompleteChime();
          setAvatarNotice(true);
          setTimeout(() => setAvatarNotice(false), 3000);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleRemoveAvatar = () => {
    soundManager.playClick();
    updateProfile({ avatarUrl: undefined });
    updateUserSession({ avatarUrl: undefined });
    setAvatarNotice(true);
    setTimeout(() => setAvatarNotice(false), 3000);
  };

  useEffect(() => {
    if (currentExam) {
      setExamName(currentExam.name);
      setExamDate(currentExam.examDate);
      setTargetYear(currentExam.targetYear);
    }
  }, [currentExam]);

  // Calculate live remaining days
  const daysRemaining = (() => {
    const target = new Date(examDate).getTime();
    const now = new Date().getTime();
    const diff = target - now;
    return diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0;
  })();

  const handleSaveExamSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentExamDetails({ name: examName, examDate: examDate, targetYear: Number(targetYear) });
    soundManager.playCompleteChime();
    setExamSaved(true);
    setTimeout(() => setExamSaved(false), 3000);
  };

  const handleApplyPresetExam = (namePreset: string, yearPreset: number, offsetDays: number) => {
    soundManager.playClick();
    setExamName(namePreset);
    setTargetYear(yearPreset);
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + offsetDays);
    setExamDate(futureDate.toISOString().split('T')[0]);
  };

  const handleAddDays = (days: number) => {
    soundManager.playClick();
    const current = new Date(examDate);
    current.setDate(current.getDate() + days);
    setExamDate(current.toISOString().split('T')[0]);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name });
    updateUserSession({ name });
    soundManager.playClick();
    setIsEditingName(false);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handleExport = () => {
    const dataStr = exportData();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `syllabus_3d_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    soundManager.playCompleteChime();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = evt => {
      const content = evt.target?.result as string;
      if (content) {
        const success = importData(content);
        if (success) {
          setImportStatus('success');
          soundManager.playCompleteChime();
        } else {
          setImportStatus('error');
        }
      }
    };
    reader.readAsText(file);
  };

  const handleLogout = async () => {
    soundManager.playClick();
    await logout();
  };

  const ToggleSwitch: React.FC<{ checked: boolean; onChange: (val: boolean) => void }> = ({ checked, onChange }) => (
    <label className="relative inline-flex items-center cursor-pointer shrink-0">
      <input
        type="checkbox"
        checked={checked}
        onChange={e => {
          soundManager.playClick();
          onChange(e.target.checked);
        }}
        className="sr-only peer"
      />
      <div className="w-10 h-5 bg-[#E2E8F0] dark:bg-[#292E42] rounded-full peer peer-checked:bg-[#2563EB] dark:peer-checked:bg-[#7AA2F7] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white dark:after:bg-[#0B0B0D] after:rounded-full after:h-4 after:w-4 after:transition-all after:shadow-xs transition-colors" />
    </label>
  );

  const SETTINGS_TABS = useMemo(() => [
    {
      id: 'account' as SettingsTab,
      title: 'Account Setting',
      subtitle: 'Details about your Personal information',
      icon: User,
      keywords: ['name', 'exam', 'profile', 'photo', 'avatar', 'target', 'date', 'year']
    },
    {
      id: 'notification' as SettingsTab,
      title: 'Notification',
      subtitle: 'Details about your Personal information',
      icon: Bell,
      keywords: ['sound', 'audio', 'volume', 'chime', 'tick', 'haptics', 'vibration']
    },
    {
      id: 'membership' as SettingsTab,
      title: 'Membership Plan',
      subtitle: 'Details about your Personal information',
      icon: Award,
      badge: 'PRO',
      keywords: ['plan', 'pro', 'price', 'pricing', 'subscription', 'upgrade', 'premium']
    },
    {
      id: 'security' as SettingsTab,
      title: 'Password & Security',
      subtitle: 'Details about your Personal information',
      icon: Lock,
      keywords: ['pin', 'lock', 'password', 'security', 'timeout', 'auto-lock']
    },
    {
      id: 'ai' as SettingsTab,
      title: 'AI & Intelligence',
      subtitle: 'Details about your Personal information',
      icon: Sparkles,
      keywords: ['ai', 'gemini', 'api', 'key', 'notes', 'youtube', 'model']
    },
    {
      id: 'appearance' as SettingsTab,
      title: 'Appearance',
      subtitle: 'Details about your Personal information',
      icon: Palette,
      keywords: ['theme', 'dark', 'light', 'oled', 'font', 'jetbrains', 'orbitron', 'pwa']
    },
    {
      id: 'timer' as SettingsTab,
      title: 'Focus & Timer',
      subtitle: 'Details about your Personal information',
      icon: Clock,
      keywords: ['timer', 'pomodoro', 'break', 'interval', 'focus', 'overlay']
    },
    {
      id: 'data' as SettingsTab,
      title: 'Data & Backup',
      subtitle: 'Details about your Personal information',
      icon: Database,
      keywords: ['data', 'backup', 'drive', 'google', 'export', 'import', 'restore', 'snapshot']
    }
  ], []);

  const filteredTabs = useMemo(() => {
    if (!searchQuery.trim()) return SETTINGS_TABS;
    const q = searchQuery.toLowerCase().trim();
    return SETTINGS_TABS.filter(t =>
      t.title.toLowerCase().includes(q) ||
      t.subtitle.toLowerCase().includes(q) ||
      t.keywords.some(k => k.toLowerCase().includes(q))
    );
  }, [SETTINGS_TABS, searchQuery]);

  const handleSaveAccountInfo = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name });
    updateUserSession({ name });
    updateCurrentExamDetails({ name: examName, examDate, targetYear: Number(targetYear) });
    soundManager.playCompleteChime();
    haptics.success();
    setAccountSaved(true);
    setIsEditingName(false);
    setTimeout(() => setAccountSaved(false), 3500);
  };

  return (
    <div className="space-y-5 sm:space-y-6 pb-36 sm:pb-24 max-w-6xl mx-auto font-sans animate-fade-in">
      
      {/* Hidden File Input for Avatar Photo */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/jpg"
        className="hidden"
        onChange={handleAvatarFileChange}
      />

      {/* ═══════════════════════════════════════════════════
          0. TOP EXECUTIVE SEARCH & HEADER BAR (Matching media_1790328428745.png)
          ═══════════════════════════════════════════════════ */}
      <div className="p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121424] border border-slate-200/90 dark:border-white/10 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
        {/* Search Input Bar (Matching media_1790328428745.png search bar) */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Anything in Settings..."
            className="w-full h-11 pl-4 pr-10 rounded-2xl bg-slate-50 dark:bg-[#181A28] border border-slate-200 dark:border-white/10 text-xs sm:text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-xs"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Right Header Controls: Notification Bell, User Pill, Logout */}
        <div className="flex items-center justify-end gap-2.5 sm:gap-3">
          {/* Audio / Notification Bell with Active Indicator */}
          <button
            type="button"
            onClick={() => handleUpdateAudio({ masterEnabled: !audioConfig.masterEnabled })}
            className={`p-2.5 rounded-2xl border transition-all cursor-pointer active:scale-95 relative ${
              audioConfig.masterEnabled
                ? 'bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-400'
                : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-400'
            }`}
            title={audioConfig.masterEnabled ? 'Audio Chimes Active' : 'Sound Effects Muted'}
            aria-label="Toggle sound effects"
          >
            <Bell className="w-4 h-4" />
            {audioConfig.masterEnabled && (
              <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 absolute top-2 right-2 ring-2 ring-white dark:ring-[#121424]" />
            )}
          </button>

          {/* User Profile Pill (Matching media_1790328428745.png user info) */}
          <div className="flex items-center gap-2.5 pl-2 pr-3.5 py-1.5 rounded-2xl bg-slate-50 dark:bg-[#181A28] border border-slate-200/80 dark:border-white/10 shadow-xs">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center overflow-hidden shrink-0 cursor-pointer shadow-xs"
              title="Click to change avatar"
            >
              {profile.avatarUrl ? (
                <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
              ) : (
                <span>{(profile.name || 'A').charAt(0).toUpperCase()}</span>
              )}
            </div>
            <div className="text-left">
              <span className="text-xs font-bold text-slate-900 dark:text-white block leading-tight max-w-[130px] truncate">
                {profile.name || 'Aspirant'}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium block leading-tight">
                Lvl {profile.level} • {profile.levelTitle}
              </span>
            </div>
          </div>

          {/* Logout Action */}
          {showLogoutConfirm ? (
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleLogout}
                className="h-10 px-3 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-black shadow-xs cursor-pointer"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="h-10 px-2.5 rounded-xl bg-slate-100 dark:bg-white/10 text-xs font-bold text-slate-600 dark:text-slate-300 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="h-10 px-3.5 rounded-2xl bg-slate-100 hover:bg-rose-500 hover:text-white dark:bg-white/5 dark:hover:bg-rose-500/20 dark:hover:text-rose-400 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 text-xs font-bold transition-all cursor-pointer active:scale-95 flex items-center gap-1.5 shadow-xs"
              title="Log Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          )}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          1. MAIN 2-COLUMN DASHBOARD (Matching media_1790328428745.png)
          ═══════════════════════════════════════════════════ */}
      <div className="flex flex-col lg:flex-row gap-5 sm:gap-6 items-start">
        
        {/* LEFT COLUMN: The Card-Style Navigation Tabs (Matching media_1790328428745.png) */}
        <div className="w-full lg:w-[310px] shrink-0 space-y-2.5 sm:space-y-3">
          <div className="flex lg:flex-col gap-2.5 sm:gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 no-scrollbar">
            {filteredTabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id || (tab.id === 'account' && activeTab === 'exam') || (tab.id === 'notification' && activeTab === 'sound');
              return (
                <button
                  type="button"
                  key={tab.id}
                  onClick={() => {
                    soundManager.playClick();
                    setActiveTab(tab.id);
                  }}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-2xl transition-all cursor-pointer flex items-start gap-3.5 min-w-[240px] lg:min-w-0 ${
                    isActive
                      ? 'bg-white dark:bg-[#181B2B] border-2 border-blue-600 dark:border-blue-500 shadow-md shadow-blue-600/10 text-slate-900 dark:text-white'
                      : 'bg-white/90 dark:bg-[#121422] border border-slate-200/90 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-[#151728] shadow-xs'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <h3 className={`text-sm font-bold truncate ${isActive ? 'text-slate-900 dark:text-white font-black' : 'text-slate-800 dark:text-slate-200'}`}>
                        {tab.title}
                      </h3>
                      {tab.badge && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs">
                          {tab.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-normal line-clamp-1 mt-0.5">
                      {tab.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Top Summary Card + Main Form Card (Matching media_1790328428745.png) */}
        <div className="flex-1 min-w-0 w-full space-y-4 sm:space-y-5">

          {/* TAB 1: ACCOUNT SETTING & EXAM CONFIG (Matching media_1790328428745.png) */}
          {(activeTab === 'account' || activeTab === 'exam') && (
            <div className="space-y-4 sm:space-y-5 animate-fade-in">
              {/* Top Card: Upload a New Photo (Matching media_1790328428745.png) */}
              <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121424] border border-slate-200/90 dark:border-white/10 shadow-xs flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="relative w-15 h-15 sm:w-18 sm:h-18 rounded-full overflow-hidden border-2 border-slate-200/90 dark:border-white/15 bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xl sm:text-2xl font-bold cursor-pointer group shrink-0 shadow-xs hover:scale-105 transition-transform"
                    title="Click to Upload Profile Photo"
                  >
                    {profile.avatarUrl ? (
                      <img
                        src={profile.avatarUrl}
                        alt={profile.name || 'User'}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>{(profile.name || 'A').charAt(0).toUpperCase()}</span>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <Camera className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  <div className="min-w-0 space-y-0.5">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">
                      Upload a New Photo
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {profile.avatarUrl ? 'Profile-pic.jpg • Custom avatar active' : 'profile-pic.jpg • PNG, JPG or WebP (Max 5MB)'}
                    </p>
                    {avatarNotice && (
                      <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 animate-fade-in">
                        <Check className="w-3 h-3 stroke-[3]" />
                        <span>Profile picture updated successfully!</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {profile.avatarUrl && (
                    <button
                      type="button"
                      onClick={handleRemoveAvatar}
                      className="px-3 py-1.5 sm:py-2 rounded-xl text-xs font-bold text-rose-500 hover:bg-rose-500/10 border border-rose-500/20 cursor-pointer transition-colors"
                    >
                      Remove
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 sm:px-5 py-2 rounded-xl bg-white dark:bg-[#1C1E2E] border border-slate-300 dark:border-white/20 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/10 text-xs sm:text-[13px] font-bold shadow-xs cursor-pointer active:scale-95 transition-all"
                  >
                    Update
                  </button>
                </div>
              </div>

              {/* Main Card: Change User Information here (Matching media_1790328428745.png) */}
              <div className="p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121424] border border-slate-200/90 dark:border-white/10 shadow-xs space-y-5 sm:space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-white/5 pb-4">
                  <div>
                    <h2 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                      Change User Information here
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-normal mt-0.5">
                      Personal aspirant profile details and target examination schedule.
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold font-sans bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 shrink-0 self-start sm:self-auto tabular-nums">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{daysRemaining} Days Left</span>
                  </span>
                </div>

                <form onSubmit={handleSaveAccountInfo} className="space-y-4 sm:space-y-5">
                  {/* Row 1: Full Name & Email Address */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs sm:text-[13px] font-semibold text-slate-700 dark:text-slate-300 block">
                        Full Name*
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Tonmoy Karmoker"
                        className="w-full h-11 sm:h-12 px-4 rounded-xl bg-slate-50 dark:bg-[#181A28] border border-slate-200 dark:border-white/10 text-xs sm:text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-2xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs sm:text-[13px] font-semibold text-slate-700 dark:text-slate-300 block">
                        Email Address*
                      </label>
                      <input
                        type="email"
                        value={user?.email || 'aspirant@syllabus3d.app'}
                        disabled
                        className="w-full h-11 sm:h-12 px-4 rounded-xl bg-slate-100/70 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 cursor-not-allowed shadow-2xs"
                      />
                    </div>
                  </div>

                  {/* Row 2: Target Exam Title (Full width address-style field) */}
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-[13px] font-semibold text-slate-700 dark:text-slate-300 block">
                      Target Examination Title*
                    </label>
                    <input
                      type="text"
                      value={examName}
                      onChange={(e) => setExamName(e.target.value)}
                      placeholder="e.g. SSC CGL 2026 / UPSC CSE 2026"
                      className="w-full h-11 sm:h-12 px-4 rounded-xl bg-slate-50 dark:bg-[#181A28] border border-slate-200 dark:border-white/10 text-xs sm:text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-2xs"
                    />
                  </div>

                  {/* Row 3: Exam Date & Target Year */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs sm:text-[13px] font-semibold text-slate-700 dark:text-slate-300 block">
                        Exam Date*
                      </label>
                      <input
                        type="date"
                        value={examDate}
                        onChange={(e) => setExamDate(e.target.value)}
                        className="w-full h-11 sm:h-12 px-4 rounded-xl bg-slate-50 dark:bg-[#181A28] border border-slate-200 dark:border-white/10 text-xs sm:text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer shadow-2xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs sm:text-[13px] font-semibold text-slate-700 dark:text-slate-300 block">
                        Target Year*
                      </label>
                      <input
                        type="number"
                        value={targetYear}
                        onChange={(e) => setTargetYear(Number(e.target.value))}
                        min={2025}
                        max={2035}
                        className="w-full h-11 sm:h-12 px-4 rounded-xl bg-slate-50 dark:bg-[#181A28] border border-slate-200 dark:border-white/10 text-xs sm:text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-2xs"
                      />
                    </div>
                  </div>

                  {/* Quick Date Shortcuts */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                      Date Shortcuts
                    </span>
                    <div className="flex items-center gap-2 flex-wrap">
                      {[{ label: '+30 Days', days: 30 }, { label: '+60 Days', days: 60 }, { label: '+90 Days', days: 90 }, { label: '+180 Days', days: 180 }].map(b => (
                        <button
                          type="button"
                          key={b.label}
                          onClick={() => handleAddDays(b.days)}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold font-sans bg-slate-100 dark:bg-white/10 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 transition-colors cursor-pointer active:scale-95"
                        >
                          {b.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quick Exam Presets */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>One-Click Exam Presets</span>
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { label: 'SSC CGL 2026', year: 2026, days: 90 },
                        { label: 'SSC CHSL 2026', year: 2026, days: 120 },
                        { label: 'SSC CPO 2026', year: 2026, days: 75 },
                        { label: 'RRB NTPC 2026', year: 2026, days: 100 },
                        { label: 'SBI PO 2026', year: 2026, days: 60 },
                        { label: 'UPSC CSE 2026', year: 2026, days: 180 }
                      ].map(p => {
                        const isSelected = examName.toLowerCase() === p.label.toLowerCase();
                        return (
                          <button
                            type="button"
                            key={p.label}
                            onClick={() => handleApplyPresetExam(p.label, p.year, p.days)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border active:scale-95 ${
                              isSelected
                                ? 'bg-blue-600 text-white border-transparent shadow-xs font-black'
                                : 'bg-slate-50 dark:bg-[#1A1B28] text-slate-600 dark:text-slate-400 border-slate-200/80 dark:border-white/10 hover:border-slate-300'
                            }`}
                          >
                            {p.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Success Notification Banner */}
                  {accountSaved && (
                    <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2 animate-fade-in">
                      <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                      <span>User information and exam target successfully updated and synchronized!</span>
                    </div>
                  )}

                  {/* Primary CTA Button (Matching "Update Information" in media_1790328428745.png) */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full h-12 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-bold shadow-md shadow-blue-500/25 transition-all cursor-pointer active:scale-[0.99] flex items-center justify-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Update Information</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* TAB: MEMBERSHIP PLAN & PRO MODULES */}
          {activeTab === 'membership' && (
            <div className="space-y-4 sm:space-y-5 animate-fade-in">
              {/* Top Card: Membership Status */}
              <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 border border-blue-500/30 shadow-xs flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Award className="w-6 h-6" />
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">
                        Active Tier: Free Aspirant
                      </h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-blue-600 text-white">
                        Standard
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      Upgrade to PRO Scholar for AI Lecture Notes &amp; Cloud Precision
                    </p>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <span className="text-sm sm:text-base font-extrabold text-blue-600 dark:text-cyan-400 block font-sora">
                    ₹499<span className="text-xs font-medium text-slate-400">/yr</span>
                  </span>
                </div>
              </div>

              {/* Main Card: Feature Comparison & Upgrade */}
              <div className="p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121424] border border-slate-200/90 dark:border-white/10 shadow-xs space-y-6">
                <div>
                  <h2 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                    Membership Plan &amp; Precision Modules
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-normal mt-0.5">
                    Full access to elite preparation tools engineered for serious competitive exam candidates.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Free Tier Card */}
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#181A28] border border-slate-200/80 dark:border-white/10 space-y-4">
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">Free Aspirant Tier</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Essential foundation tools</p>
                    </div>
                    <div className="text-xl font-bold text-slate-900 dark:text-white">₹0 <span className="text-xs font-normal text-slate-400">/ Lifetime</span></div>
                    <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                      <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 stroke-[3]" /><span>Interactive 3D Mind Map &amp; Syllabus</span></li>
                      <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 stroke-[3]" /><span>Mistake Journal &amp; Revision Pipeline</span></li>
                      <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 stroke-[3]" /><span>Standard Study Timer &amp; Streak Tracking</span></li>
                    </ul>
                  </div>

                  {/* PRO Tier Card */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20 border-2 border-blue-500/40 shadow-xs space-y-4 relative overflow-hidden">
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider">
                      Recommended
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-black text-slate-900 dark:text-white">PRO Scholar Tier</h4>
                      <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Unlocks all precision AI engines</p>
                    </div>
                    <div className="text-xl font-extrabold text-blue-600 dark:text-cyan-400 font-sora">
                      ₹499 <span className="text-xs font-normal text-slate-500">/ 1 Year Pass</span>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-200">
                      <li className="flex items-center gap-2"><Zap className="w-3.5 h-3.5 text-amber-500 shrink-0 fill-current" /><span>AI YouTube Lecture Notes Instant Generation</span></li>
                      <li className="flex items-center gap-2"><Zap className="w-3.5 h-3.5 text-amber-500 shrink-0 fill-current" /><span>Multi-Device Google Drive Cloud Sync</span></li>
                      <li className="flex items-center gap-2"><Zap className="w-3.5 h-3.5 text-amber-500 shrink-0 fill-current" /><span>Voice &amp; Audio Study Memos Studio</span></li>
                      <li className="flex items-center gap-2"><Zap className="w-3.5 h-3.5 text-amber-500 shrink-0 fill-current" /><span>Futuristic Timer HUD (JetBrains, Orbitron)</span></li>
                    </ul>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    haptics.selection();
                    if (onOpenPricing) onOpenPricing();
                  }}
                  className="w-full h-12 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-bold shadow-md shadow-blue-500/25 transition-all cursor-pointer active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  <span>Upgrade to PRO Scholar</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

      {/* TAB 5: AI & INTELLIGENCE ENGINE (Matching media_1790328428745.png) */}
      {activeTab === 'ai' && (
        <div className="space-y-4 sm:space-y-5 animate-fade-in">
          {/* Top Summary Card */}
          <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121424] border border-slate-200/90 dark:border-white/10 shadow-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white flex items-center justify-center text-xl font-bold shrink-0 shadow-xs">
                <Sparkles className="w-7 h-7" />
              </div>
              <div className="min-w-0 space-y-0.5">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">
                    Google Gemini AI Engine
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r from-violet-600 to-cyan-500 text-white shrink-0">
                    Gemini 2.5 / 3.6
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {geminiApiKey ? 'API Key Active • AI YouTube Notes & Summaries operational' : 'API Key missing • Add your free Google Gemini key below'}
                </p>
                {aiKeySaveSuccess && (
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 animate-fade-in">
                    <Check className="w-3 h-3 stroke-[3]" />
                    <span>API Key saved &amp; synchronized across app!</span>
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="px-4 sm:px-5 py-2 rounded-xl bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/30 text-violet-600 dark:text-violet-400 hover:bg-violet-100 text-xs sm:text-[13px] font-bold shadow-xs cursor-pointer active:scale-95 transition-all flex items-center gap-1.5"
              >
                <span>Free Key</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Main Form Card: Configure Gemini AI */}
          <div className="p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121424] border border-slate-200/90 dark:border-white/10 shadow-xs space-y-5 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-white/5 pb-4">
              <div>
                <h2 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Configure Google Gemini API Key
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-normal mt-0.5">
                  Personal key for AI YouTube Lecture Notes, Smart Syllabus Decomposition, and Formula Tables.
                </p>
              </div>

              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold font-sans ${
                geminiApiKey
                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25'
                  : 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/25'
              }`}>
                <span className={`w-2 h-2 rounded-full ${geminiApiKey ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
                <span>{geminiApiKey ? 'Connected & Active' : 'API Key Missing'}</span>
              </span>
            </div>

            <form onSubmit={handleSaveGeminiKey} className="space-y-4 sm:space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs sm:text-[13px] font-semibold text-slate-700 dark:text-slate-300 block">
                  Google Gemini API Key*
                </label>
                <div className="relative">
                  <input
                    type={showAiKeySecret ? 'text' : 'password'}
                    value={tempAiKey}
                    onChange={(e) => setTempAiKey(e.target.value)}
                    placeholder="AIzaSy..."
                    className="w-full h-11 sm:h-12 px-4 pr-12 rounded-xl bg-slate-50 dark:bg-[#181A28] border border-slate-200 dark:border-white/10 text-xs sm:text-sm font-bold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-2xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowAiKeySecret(!showAiKeySecret)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer p-1"
                  >
                    {showAiKeySecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  disabled={isTestingAiKey || (!tempAiKey.trim() && !geminiApiKey)}
                  onClick={handleTestGeminiKey}
                  className="h-10 px-4 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-800 dark:text-white border border-slate-200/80 dark:border-white/10 text-xs font-bold transition-all cursor-pointer active:scale-95 disabled:opacity-50 flex items-center gap-2"
                >
                  {isTestingAiKey ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-violet-500" />}
                  <span>{isTestingAiKey ? 'Testing Connection...' : 'Test Connection'}</span>
                </button>

                {geminiApiKey && (
                  <button
                    type="button"
                    onClick={handleRemoveGeminiKey}
                    className="h-10 px-3.5 rounded-xl text-xs font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 transition-colors cursor-pointer"
                  >
                    Remove Key
                  </button>
                )}
              </div>

              {aiTestResult && (
                <div className={`p-3.5 rounded-xl border text-xs font-medium flex items-start gap-2.5 animate-fade-in ${
                  aiTestResult.success
                    ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-700 dark:text-emerald-400'
                    : 'bg-rose-500/10 border-rose-500/25 text-rose-700 dark:text-rose-400'
                }`}>
                  {aiTestResult.success ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  )}
                  <span>{aiTestResult.message}</span>
                </div>
              )}

              {/* Free Key Guide */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-violet-500/5 to-cyan-500/5 border border-violet-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <span>💡 Free Google Gemini API Key Guide</span>
                  </h4>
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-1"
                  >
                    <span>Google AI Studio</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Google Gemini API is <strong>100% Free</strong>. No credit card is required. Free tier offers 15 requests per minute, which is more than enough for regular study notes generation and syllabus parsing.
                </p>
                <ol className="list-decimal pl-4 space-y-1 text-xs text-slate-600 dark:text-slate-400">
                  <li>Open <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-violet-600 dark:text-violet-400 underline font-semibold">Google AI Studio (aistudio.google.com)</a>.</li>
                  <li>Sign in with your Google account.</li>
                  <li>Click <strong>&quot;Create API Key&quot;</strong> and copy the generated key (starts with <code className="font-mono bg-violet-100 dark:bg-violet-900/30 px-1 py-0.5 rounded">AIzaSy...</code>).</li>
                  <li>Paste the key in the field above and click <strong>&quot;Save AI Configuration&quot;</strong>.</li>
                </ol>
              </div>

              {/* Feature Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-4 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-[#181A28] border border-slate-200/80 dark:border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-bold text-xs uppercase tracking-wider">
                    <Video className="w-4 h-4" />
                    <span>AI YouTube Notes</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Paste any educational YouTube URL to generate structured notes with headings, KaTeX math equations, timestamps, and exam-focused questions.
                  </p>
                </div>

                <div className="p-4 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-[#181A28] border border-slate-200/80 dark:border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold text-xs uppercase tracking-wider">
                    <BookOpen className="w-4 h-4" />
                    <span>AI Syllabus Architect</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Convert raw PDF notifications or syllabus text into organized 4-level subject, chapter, topic, and subtopic study tracks.
                  </p>
                </div>
              </div>

              {/* Primary CTA Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-bold shadow-md shadow-blue-500/25 transition-all cursor-pointer active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save AI Configuration</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB 6: APPEARANCE & THEME (Matching media_1790328428745.png) */}
      {activeTab === 'appearance' && (
        <div className="space-y-4 sm:space-y-5 animate-fade-in">
          {/* Top Summary Card */}
          <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121424] border border-slate-200/90 dark:border-white/10 shadow-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-amber-500 to-indigo-600 text-white flex items-center justify-center text-xl font-bold shrink-0 shadow-xs">
                <Palette className="w-7 h-7" />
              </div>
              <div className="min-w-0 space-y-0.5">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">
                  Workspace Appearance &amp; Theme
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {theme === 'dark'
                    ? 'Tokyo Night Dark mode active • High contrast dark glass'
                    : theme === 'warm-cream'
                    ? 'Warm Parchment Gold active • Scholarly ivory, golden amber & antique olive'
                    : 'Pure Pro Alabaster light mode active • Daytime focus clarity'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setTheme(theme === 'dark' ? 'light' : theme === 'light' ? 'warm-cream' : 'dark');
                }}
                className="px-4 sm:px-5 py-2 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-800 dark:text-white text-xs sm:text-[13px] font-bold shadow-xs cursor-pointer active:scale-95 transition-all flex items-center gap-1.5"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-500" />
                ) : theme === 'warm-cream' ? (
                  <Sparkles className="w-4 h-4 text-[#E1A837]" />
                ) : (
                  <Moon className="w-4 h-4 text-blue-600" />
                )}
                <span>Switch Mode</span>
              </button>
            </div>
          </div>

          {/* Main Form Card */}
          <div className="p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121424] border border-slate-200/90 dark:border-white/10 shadow-xs space-y-5 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-white/5 pb-4">
              <div>
                <h2 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Color Theme &amp; Display Settings
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-normal mt-0.5">
                  Choose your visual study environment and install the offline desktop/mobile web app.
                </p>
              </div>

              <span className="px-3 py-1 rounded-xl text-xs font-bold font-sans bg-slate-100 dark:bg-white/10 border border-slate-200/80 dark:border-white/10 text-slate-800 dark:text-white capitalize shrink-0 self-start sm:self-auto">
                {theme === 'dark' ? 'Tokyo Night Dark' : theme === 'warm-cream' ? 'Warm Parchment Gold' : 'Pure Pro Alabaster'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Tokyo Night Dark */}
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setTheme('dark');
                }}
                className={`p-4 sm:p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                  theme === 'dark'
                    ? 'bg-[#181A28] border-blue-500 ring-2 ring-blue-500/20 shadow-md'
                    : 'bg-slate-50 dark:bg-[#151622] border-slate-200 dark:border-white/10 opacity-70 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="w-10 h-10 rounded-xl bg-[#121424] border border-[#292E42] flex items-center justify-center text-[#7AA2F7] shrink-0">
                    <Moon className="w-5 h-5" />
                  </div>
                  {theme === 'dark' && <Check className="w-4 h-4 text-blue-500 stroke-[3]" />}
                </div>
                <div>
                  <span className="text-xs sm:text-[14px] font-extrabold text-slate-900 dark:text-white block">
                    Tokyo Night Dark
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                    Deep dark glassmorphism for focused night study and reduced eye fatigue
                  </span>
                </div>
              </button>

              {/* Pure Pro Alabaster (Light) */}
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setTheme('light');
                }}
                className={`p-4 sm:p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                  theme === 'light'
                    ? 'bg-white border-blue-600 ring-2 ring-blue-500/20 shadow-md'
                    : 'bg-white dark:bg-[#151622] border-slate-200 dark:border-white/10 opacity-70 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
                    <Sun className="w-5 h-5" />
                  </div>
                  {theme === 'light' && <Check className="w-4 h-4 text-blue-600 stroke-[3]" />}
                </div>
                <div>
                  <span className="text-xs sm:text-[14px] font-extrabold text-slate-900 dark:text-white block">
                    Pure Pro Alabaster (Light)
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                    Ultra-crisp, high-contrast alabaster workspace with daylight clarity
                  </span>
                </div>
              </button>

              {/* Warm Parchment Gold (Royal Amber) */}
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setTheme('warm-cream');
                }}
                className={`p-4 sm:p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                  theme === 'warm-cream'
                    ? 'bg-[#FFFDF8] border-[#E1A837] ring-2 ring-[#E1A837]/35 shadow-md'
                    : 'bg-[#FAF4E8] dark:bg-[#1C1812] border-[#E2D1B3] dark:border-[#584820]/40 opacity-70 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF0DC] border border-[#E1A837]/50 flex items-center justify-center text-[#8D7A02] shrink-0 shadow-2xs">
                    <Sparkles className="w-5 h-5 text-[#E1A837]" />
                  </div>
                  {theme === 'warm-cream' && <Check className="w-4 h-4 text-[#8D7A02] stroke-[3]" />}
                </div>
                <div>
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs sm:text-[14px] font-extrabold text-slate-900 dark:text-white block">
                      Warm Parchment Gold
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[9.5px] font-mono font-bold bg-[#E1A837]/15 text-[#8D7A02] border border-[#E1A837]/30">
                      NEW
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                    Ivory cream, golden amber &amp; antique olive for scholarly elegance &amp; zero eye fatigue
                  </span>
                  {/* Color Palette Swatch Preview */}
                  <div className="flex items-center gap-1.5 mt-2.5 pt-2 border-t border-slate-200/60 dark:border-white/5">
                    <span className="w-3.5 h-3.5 rounded-full border border-black/15 shadow-2xs shrink-0" style={{ backgroundColor: '#FAEED9' }} title="#FAEED9 - Parchment Cream" />
                    <span className="w-3.5 h-3.5 rounded-full border border-black/15 shadow-2xs shrink-0" style={{ backgroundColor: '#E1A837' }} title="#E1A837 - Amber Gold" />
                    <span className="w-3.5 h-3.5 rounded-full border border-black/15 shadow-2xs shrink-0" style={{ backgroundColor: '#8D7A02' }} title="#8D7A02 - Antique Olive" />
                    <span className="w-3.5 h-3.5 rounded-full border border-black/15 shadow-2xs shrink-0" style={{ backgroundColor: '#38370D' }} title="#38370D - Deep Espresso" />
                    <span className="text-[10px] font-mono font-bold text-[#8D7A02] dark:text-[#E1A837] ml-auto">
                      #FAEED9
                    </span>
                  </div>
                </div>
              </button>
            </div>

            {/* PWA App Install Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 border border-blue-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    Syllabus 3D Progressive Web App (PWA)
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {isInstalled ? 'App is installed and running natively with offline storage.' : 'Install on Windows, Android, or iOS for full-screen zero-distraction study.'}
                  </p>
                </div>
              </div>

              {!isInstalled && (
                <button
                  type="button"
                  onClick={() => setShowPwaModal(true)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95 shrink-0"
                >
                  Install App
                </button>
              )}
            </div>

            {/* Primary CTA Button */}
            <div className="pt-2 space-y-3">
              <button
                type="button"
                onClick={() => {
                  soundManager.playCompleteChime();
                  haptics.success();
                  setThemeSaved(true);
                  setTimeout(() => setThemeSaved(false), 2500);
                }}
                className="w-full h-12 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-bold shadow-md shadow-blue-500/25 transition-all cursor-pointer active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Apply Theme Settings</span>
              </button>
              {themeSaved && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-semibold animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Theme preferences successfully applied and saved!</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: NOTIFICATION & AUDIO EFFECTS (Matching media_1790328428745.png) */}
      {(activeTab === 'notification' || activeTab === 'sound') && (
        <div className="space-y-4 sm:space-y-5 animate-fade-in">
          {/* Top Summary Card */}
          <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121424] border border-slate-200/90 dark:border-white/10 shadow-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xl font-bold shrink-0 shadow-xs">
                <Bell className="w-7 h-7" />
              </div>
              <div className="min-w-0 space-y-0.5">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">
                  Audio &amp; Notification Alerts
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {audioConfig.masterEnabled
                    ? 'Sound feedback active • Tibetan focus bell & tactile chimes enabled'
                    : 'Library Silent Mode active • All audio chimes and cues muted'}
                </p>
                {soundSaved && (
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 animate-fade-in">
                    <Check className="w-3 h-3 stroke-[3]" />
                    <span>Notification preferences saved and synced!</span>
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  handleUpdateAudio({ masterEnabled: !audioConfig.masterEnabled });
                }}
                className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-[13px] font-bold shadow-xs cursor-pointer active:scale-95 transition-all flex items-center gap-1.5 ${
                  audioConfig.masterEnabled
                    ? 'bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-white hover:bg-slate-200'
                    : 'bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-black'
                }`}
              >
                {audioConfig.masterEnabled ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Library Mode</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>Unmute Audio</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Main Form Card: Notification & Audio Preferences */}
          <div className="p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121424] border border-slate-200/90 dark:border-white/10 shadow-xs space-y-5 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-white/5 pb-4">
              <div>
                <h2 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Notification &amp; Audio Preferences
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-normal mt-0.5">
                  Configure sensory feedback, volume intensity, and test individual study chimes.
                </p>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold font-sans bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 shrink-0 self-start sm:self-auto tabular-nums">
                <Volume2 className="w-3.5 h-3.5" />
                <span>{Math.round(audioConfig.masterVolume * 100)}% Volume</span>
              </span>
            </div>

            {/* Master Volume Slider */}
            <div className="p-4 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-[#181A28] border border-slate-200 dark:border-white/10 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white">
                  <Sliders className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Master Sound Output Volume</span>
                </div>
                <span className="text-xs font-bold font-sans tabular-nums text-blue-600 dark:text-blue-400">
                  {Math.round(audioConfig.masterVolume * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                disabled={!audioConfig.masterEnabled}
                value={audioConfig.masterVolume}
                onChange={e => handleUpdateAudio({ masterVolume: parseFloat(e.target.value) })}
                className="w-full accent-blue-600 dark:accent-blue-400 cursor-pointer disabled:opacity-40"
              />
            </div>

            {/* Individual Audio Channels */}
            <div className="space-y-3 pt-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-sans">
                Tactile Audio &amp; Alert Channels
              </h4>

              {/* Channel 1: UI Clicks */}
              <div className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50/70 dark:bg-[#181A28] border border-slate-200/80 dark:border-white/10">
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-white/5 border border-blue-200 dark:border-white/10 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                    <Sliders className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white block truncate">
                      UI Click &amp; Navigation Taps
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 sm:line-clamp-none">
                      Tactile audio feedback when switching tabs, selecting topics, and clicking buttons
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => soundManager.playClick()}
                    className="px-2.5 py-1 rounded-lg text-xs font-bold font-sans bg-slate-100 dark:bg-white/10 hover:bg-blue-600 hover:text-white text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 transition-colors cursor-pointer"
                  >
                    ▶ Test
                  </button>
                  <ToggleSwitch
                    checked={audioConfig.clickSound && audioConfig.masterEnabled}
                    onChange={val => handleUpdateAudio({ clickSound: val })}
                  />
                </div>
              </div>

              {/* Channel 2: Pomodoro Bell */}
              <div className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50/70 dark:bg-[#181A28] border border-slate-200/80 dark:border-white/10">
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-white/5 border border-amber-200 dark:border-white/10 flex items-center justify-center text-amber-500 shrink-0">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white block truncate">
                      Pomodoro Session Alert Bell
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 sm:line-clamp-none">
                      Gentle Tibetan singing bell when focus session starts, pauses &amp; completes
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => soundManager.playPomodoroBell()}
                    className="px-2.5 py-1 rounded-lg text-xs font-bold font-sans bg-slate-100 dark:bg-white/10 hover:bg-blue-600 hover:text-white text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 transition-colors cursor-pointer"
                  >
                    ▶ Test
                  </button>
                  <ToggleSwitch
                    checked={audioConfig.pomodoroBell && audioConfig.masterEnabled}
                    onChange={val => handleUpdateAudio({ pomodoroBell: val })}
                  />
                </div>
              </div>

              {/* Channel 3: Target Completion Chime */}
              <div className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50/70 dark:bg-[#181A28] border border-slate-200/80 dark:border-white/10">
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-white/5 border border-emerald-200 dark:border-white/10 flex items-center justify-center text-emerald-500 shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white block truncate">
                      Target Mastery Celebration Chime
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 sm:line-clamp-none">
                      Harmonic celebration chime when checking off a topic or daily study task
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => soundManager.playCompleteChime()}
                    className="px-2.5 py-1 rounded-lg text-xs font-bold font-sans bg-slate-100 dark:bg-white/10 hover:bg-blue-600 hover:text-white text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 transition-colors cursor-pointer"
                  >
                    ▶ Test
                  </button>
                  <ToggleSwitch
                    checked={audioConfig.chimeSound && audioConfig.masterEnabled}
                    onChange={val => handleUpdateAudio({ chimeSound: val })}
                  />
                </div>
              </div>

              {/* Channel 4: Level Up Fanfare */}
              <div className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50/70 dark:bg-[#181A28] border border-slate-200/80 dark:border-white/10">
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-white/5 border border-purple-200 dark:border-white/10 flex items-center justify-center text-purple-500 shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white block truncate">
                      Level Up &amp; Streak Fanfare
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 sm:line-clamp-none">
                      Special victory fanfare on leveling up or reaching streak milestones
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => soundManager.playLevelUp()}
                    className="px-2.5 py-1 rounded-lg text-xs font-bold font-sans bg-slate-100 dark:bg-white/10 hover:bg-blue-600 hover:text-white text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 transition-colors cursor-pointer"
                  >
                    ▶ Test
                  </button>
                  <ToggleSwitch
                    checked={audioConfig.levelUpSound && audioConfig.masterEnabled}
                    onChange={val => handleUpdateAudio({ levelUpSound: val })}
                  />
                </div>
              </div>

              {/* Channel 5: Mobile Haptic Feedback */}
              <div className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50/70 dark:bg-[#181A28] border border-slate-200/80 dark:border-white/10">
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-white/5 border border-blue-200 dark:border-white/10 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white block truncate">
                      Mobile Tactile Haptics (Vibration)
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 sm:line-clamp-none">
                      Physical vibration pulses when checking off topics, starting timers &amp; switching tabs
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => haptics.success()}
                    className="px-2.5 py-1 rounded-lg text-xs font-bold font-sans bg-slate-100 dark:bg-white/10 hover:bg-blue-600 hover:text-white text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 transition-colors cursor-pointer"
                  >
                    ▶ Test
                  </button>
                  <ToggleSwitch
                    checked={hapticsEnabled}
                    onChange={handleToggleHaptics}
                  />
                </div>
              </div>
            </div>

            {/* Success Banner */}
            {soundSaved && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2 animate-fade-in">
                <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                <span>Notification and audio preferences successfully saved and synchronized!</span>
              </div>
            )}

            {/* Primary CTA Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  soundManager.playCompleteChime();
                  haptics.success();
                  setSoundSaved(true);
                  setTimeout(() => setSoundSaved(false), 3000);
                }}
                className="w-full h-12 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-bold shadow-md shadow-blue-500/25 transition-all cursor-pointer active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Notification Preferences</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: FOCUS CHAMBER & FLOATING TIMER (Matching media_1790328428745.png) */}
      {activeTab === 'timer' && (
        <div className="space-y-4 sm:space-y-5 animate-fade-in">
          {/* Top Summary Card */}
          <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121424] border border-slate-200/90 dark:border-white/10 shadow-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center text-xl font-bold shrink-0 shadow-xs">
                <Clock className="w-7 h-7" />
              </div>
              <div className="min-w-0 space-y-0.5">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">
                  Focus Chamber &amp; Floating Timer
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {settings.enabled ? `Floating timer active • Font: ${timerFont.toUpperCase()}` : 'Floating timer overlay minimized'}
                </p>
                {timerSaved && (
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 animate-fade-in">
                    <Check className="w-3 h-3 stroke-[3]" />
                    <span>Timer preferences saved successfully!</span>
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  showFloatingOverlay();
                  setTestLaunched(true);
                  setTimeout(() => setTestLaunched(false), 2500);
                }}
                className="px-4 sm:px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-[13px] font-bold shadow-xs cursor-pointer active:scale-95 transition-all flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{testLaunched ? 'Visible!' : 'Preview Pill'}</span>
              </button>
            </div>
          </div>

          {/* Main Form Card */}
          <div className="p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121424] border border-slate-200/90 dark:border-white/10 shadow-xs space-y-5 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-white/5 pb-4">
              <div>
                <h2 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Floating Timer &amp; HUD Configuration
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-normal mt-0.5">
                  Control the draggable overlay that stays active while studying notes, and customize digit fonts.
                </p>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold font-sans bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 shrink-0 self-start sm:self-auto tabular-nums">
                <Sliders className="w-3.5 h-3.5" />
                <span>{Math.round((settings.opacity || 0.95) * 100)}% Opacity</span>
              </span>
            </div>

            <div className="space-y-3">
              {[
                { label: 'Floating Timer Enabled', desc: 'Show compact draggable pill when focus timer is active', checked: settings.enabled, key: 'enabled' as const },
                { label: 'Auto-launch on Background', desc: 'Minimize to Picture-in-Picture when switching browser tabs', checked: settings.showWhenBackgrounded, key: 'showWhenBackgrounded' as const },
                { label: 'Quick Pause / Resume Controls', desc: '1-tap control button directly on the floating pill', checked: settings.showPauseButton, key: 'showPauseButton' as const },
                { label: 'Remember Draggable Position', desc: 'Keep the floating timer at the exact spot you placed it', checked: settings.rememberPosition, key: 'rememberPosition' as const }
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50/70 dark:bg-[#181A28] border border-slate-200/80 dark:border-white/10">
                  <div className="pr-3">
                    <span className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white block">{item.label}</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 sm:line-clamp-none">{item.desc}</span>
                  </div>
                  <ToggleSwitch
                    checked={item.checked}
                    onChange={val => updateSettings({ [item.key]: val })}
                  />
                </div>
              ))}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50/70 dark:bg-[#181A28] border border-slate-200/80 dark:border-white/10 space-y-2">
                  <span className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white block">Widget Width</span>
                  <div className="flex gap-2">
                    {(['standard', 'compact'] as const).map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => {
                          soundManager.playClick();
                          updateSettings({ size: s });
                        }}
                        className={`flex-1 py-2 rounded-xl text-xs sm:text-[13px] font-bold transition-all cursor-pointer ${
                          settings.size === s
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-white dark:bg-[#151622] text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-white/10'
                        }`}
                      >
                        {s === 'standard' ? 'Standard (360px)' : 'Compact (320px)'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50/70 dark:bg-[#181A28] border border-slate-200/80 dark:border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white">Overlay Opacity</span>
                    <span className="text-xs font-bold font-sans tabular-nums text-blue-600 dark:text-blue-400">
                      {Math.round((settings.opacity || 0.95) * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={Math.round((settings.opacity || 0.95) * 100)}
                    onChange={e => updateSettings({ opacity: Number(e.target.value) / 100 })}
                    className="w-full accent-blue-600 dark:accent-blue-400 cursor-pointer"
                  />
                </div>
              </div>

              {/* Timer Typography Selection */}
              <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50/70 dark:bg-[#181A28] border border-slate-200/80 dark:border-white/10 space-y-3 pt-2">
                <div>
                  <span className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white block">
                    Timer Digits Typography
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Choose the display font for Pomodoro, Countdown, Stopwatch, and Floating Pill.
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    {
                      id: 'jetbrains',
                      name: 'JetBrains Mono',
                      tag: 'Practical',
                      desc: 'Developer precision & balanced monospace glyphs',
                      preview: '25:00',
                      fontClass: 'font-mono'
                    },
                    {
                      id: 'roboto-mono',
                      name: 'Roboto Mono',
                      tag: 'Clean Digital',
                      desc: 'Minimalist geometric curves & razor-sharp legibility',
                      preview: '25:00',
                      fontClass: 'font-roboto-mono'
                    },
                    {
                      id: 'orbitron',
                      name: 'Orbitron',
                      tag: 'Futuristic',
                      desc: 'Sci-Fi HUD aesthetic for intense focus sprints',
                      preview: '25:00',
                      fontClass: 'font-orbitron'
                    }
                  ].map(item => {
                    const isSelected = timerFont === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          handleSelectTimerFont(item.id as TimerFontFamily);
                          soundManager.playClick();
                          haptics.selection();
                        }}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                          isSelected
                            ? 'bg-blue-500/10 border-blue-500 text-blue-700 dark:text-blue-300 ring-2 ring-blue-500/20 shadow-xs'
                            : 'bg-white dark:bg-[#151622] border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            {item.name}
                          </span>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                            isSelected
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400'
                          }`}>
                            {item.tag}
                          </span>
                        </div>
                        <div className={`text-xl sm:text-2xl font-black ${item.fontClass} my-1.5 ${
                          isSelected ? 'text-blue-600 dark:text-cyan-400' : 'text-slate-800 dark:text-white'
                        }`}>
                          {item.preview}
                        </div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2">
                          {item.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Success Banner */}
            {timerSaved && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2 animate-fade-in">
                <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                <span>Timer settings and typography preferences successfully saved!</span>
              </div>
            )}

            {/* Primary CTA Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  soundManager.playCompleteChime();
                  haptics.success();
                  setTimerSaved(true);
                  setTimeout(() => setTimerSaved(false), 3000);
                }}
                className="w-full h-12 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-bold shadow-md shadow-blue-500/25 transition-all cursor-pointer active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Timer Preferences</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: BACKUP, RESTORE & STORAGE SAFETY (Matching media_1790328428745.png) */}
      {activeTab === 'data' && (
        <div className="space-y-4 sm:space-y-5 animate-fade-in">
          {/* Top Summary Card */}
          <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121424] border border-slate-200/90 dark:border-white/10 shadow-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-emerald-600 to-teal-500 text-white flex items-center justify-center text-xl font-bold shrink-0 shadow-xs">
                <Database className="w-7 h-7" />
              </div>
              <div className="min-w-0 space-y-0.5">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">
                    Storage Safety &amp; Dual-Tier Engine
                  </h3>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-sans font-bold ${
                    gdriveConnected
                      ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                      : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                  }`}>
                    {gdriveConnected ? 'Cloud Active' : 'Offline Safe'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {`Local Storage: ~${storageUsageKb} KB used • Dual-tier IndexedDB active`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setShowGoogleDriveModal(true)}
                className="px-4 sm:px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-[13px] font-bold shadow-xs cursor-pointer active:scale-95 transition-all flex items-center gap-1.5"
              >
                <Cloud className="w-3.5 h-3.5" />
                <span>Google Drive Hub</span>
              </button>
            </div>
          </div>

          {/* Main Form Card */}
          <div className="p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121424] border border-slate-200/90 dark:border-white/10 shadow-xs space-y-5 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-white/5 pb-4">
              <div>
                <h2 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Cloud Vault &amp; Local Backup Management
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-normal mt-0.5">
                  Real-time debounced persistence with dual-tier IndexedDB safety snapshots and Google Drive sync.
                </p>
              </div>

              <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 font-sans text-xs font-bold shrink-0 self-start sm:self-auto tabular-nums">
                <Check className="w-3 h-3 stroke-[2.5]" />
                <span>Saved: {lastSavedAt}</span>
              </div>
            </div>

            {/* ☁️ Google Drive Cloud Vault & Dedicated Media Sync Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5 border border-blue-500/25 space-y-3.5 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white dark:bg-[#1A1B2E] border border-blue-200 dark:border-blue-800 shadow-xs flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg">
                      <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H0c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/>
                      <path d="M43.65 25 29.9 1.2c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44A8.9 8.9 0 0 0 0 53h27.5z" fill="#00ac47"/>
                      <path d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5H59.8l5.85 10.15z" fill="#ea4335"/>
                      <path d="M43.65 25 57.4 1.2C56.05.4 54.5 0 52.9 0H34.4c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d"/>
                      <path d="M59.8 53H87.3c0-1.55-.4-3.1-1.2-4.5l-25.4-44c-.8-1.4-1.95-2.5-3.3-3.3L43.65 25z" fill="#ffba00"/>
                      <path d="M27.5 53h46.05l-13.75 23.8c-1.35.8-2.9 1.2-4.5 1.2h-18.5c-1.6 0-3.15-.45-4.5-1.2z" fill="#2684fc"/>
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs sm:text-[14px] font-black text-slate-900 dark:text-white">
                        Google Drive Cloud Vault &amp; Media Sync
                      </h4>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-sans font-bold ${
                        gdriveConnected
                          ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                          : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                      }`}>
                        {gdriveConnected ? 'Connected ✓' : 'Cloud Sync'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-normal">
                      1-Click backup &amp; restore for your full Syllabus database, attached PDF notes, and study diagram photos directly into your personal Google Drive.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowGoogleDriveModal(true)}
                  className="h-10 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer active:scale-95 shrink-0 flex items-center justify-center gap-2"
                >
                  <Cloud className="w-4 h-4" />
                  <span>Open Drive Hub</span>
                </button>
              </div>

              {/* Extra Backup Perks Badges */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-blue-200/50 dark:border-blue-900/40 text-[11px] sm:text-xs font-sans font-semibold">
                <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span>Exams &amp; Notes Vault</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  <span>Extra PDF Docs Backup</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                  <span>Photos &amp; Diagrams</span>
                </div>
              </div>
            </div>

            {/* Visual Storage Health & Quota Bar */}
            <div className="p-4 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-[#181A28] border border-slate-200/80 dark:border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <HardDrive className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Browser Storage Quota</span>
                </span>
                <div className="flex items-center gap-2 font-sans font-bold tabular-nums">
                  <span className={`px-2 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                    storageMetrics.status === 'critical'
                      ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
                      : storageMetrics.status === 'moderate'
                      ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                      : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                  }`}>
                    {storageMetrics.status} ({storageMetrics.percentage}%)
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 text-xs">
                    {storageMetrics.usedFormatted} / {storageMetrics.totalFormatted}
                  </span>
                </div>
              </div>

              <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    storageMetrics.status === 'critical'
                      ? 'bg-rose-500'
                      : storageMetrics.status === 'moderate'
                      ? 'bg-amber-500'
                      : 'bg-blue-600'
                  }`}
                  style={{ width: `${Math.max(2, storageMetrics.percentage)}%` }}
                />
              </div>

              {/* Storage Entity Breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-200/80 dark:border-white/10 text-center font-sans">
                <div className="p-2.5 rounded-xl bg-white dark:bg-[#121424] border border-slate-200/80 dark:border-white/10">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-bold">Topics &amp; Exams</span>
                  <span className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white tabular-nums">
                    {overallStats.totalTopics} Topics (~{(storageMetrics.breakdown.exams / 1024).toFixed(1)} KB)
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-[#121424] border border-slate-200/80 dark:border-white/10">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-bold">SRS Flashcards</span>
                  <span className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white tabular-nums">
                    {revisions.length} Cards (~{(storageMetrics.breakdown.revisions / 1024).toFixed(1)} KB)
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-[#121424] border border-slate-200/80 dark:border-white/10">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-bold">Planner Tasks</span>
                  <span className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white tabular-nums">
                    {plannerTasks.length} Tasks (~{(storageMetrics.breakdown.planner / 1024).toFixed(1)} KB)
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-[#121424] border border-slate-200/80 dark:border-white/10">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-bold">Targets &amp; Habits</span>
                  <span className="text-xs sm:text-[13px] font-bold text-blue-600 dark:text-blue-400 tabular-nums">
                    {top3Targets.length + reflectionsHistory.length} Entries (~{((storageMetrics.breakdown.activity + storageMetrics.breakdown.other) / 1024).toFixed(1)} KB)
                  </span>
                </div>
              </div>
            </div>

            {/* Google 1-Click Identity & Cloud Auth Card */}
            <GoogleAuthSettingsCard />

            {/* Dual-Tier IndexedDB Safety Snapshot Card */}
            <div className="p-4 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-[#181A28] border border-slate-200/80 dark:border-white/10 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <h4 className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white">
                      IndexedDB Automated Safety Net (Quota Overflow Proof)
                    </h4>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                    Full rolling state snapshots are asynchronously safeguarded in browser IndexedDB (50MB+ capacity).
                  </p>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
                    Latest Snapshot: {storageMetrics.lastSnapshotAt ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">{storageMetrics.lastSnapshotAt}</span>
                    ) : (
                      <span>Auto-saves continuously during study sessions</span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleRestoreSnapshot}
                  disabled={isRestoringSnapshot}
                  className="h-10 px-4 rounded-xl bg-white dark:bg-[#121424] hover:bg-slate-100 dark:hover:bg-white/10 text-slate-900 dark:text-white border border-slate-200/80 dark:border-white/10 text-xs font-bold transition-all cursor-pointer disabled:opacity-50 shrink-0 flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-blue-600 dark:text-blue-400 ${isRestoringSnapshot ? 'animate-spin' : ''}`} />
                  <span>{isRestoringSnapshot ? 'Restoring...' : 'Restore Safety Snapshot'}</span>
                </button>
              </div>

              {snapshotStatus === 'success' && (
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>✓ Verified IndexedDB safety snapshot restored successfully! All data and progress re-synced.</span>
                </div>
              )}

              {snapshotStatus === 'empty' && (
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-bold animate-fade-in">
                  <FileCheck2 className="w-4 h-4 shrink-0" />
                  <span>No automated safety snapshot found in this browser yet. Continue using the app and it will snapshot automatically!</span>
                </div>
              )}

              {snapshotStatus === 'error' && (
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold animate-fade-in">
                  <Trash2 className="w-4 h-4 shrink-0" />
                  <span>Failed to restore snapshot. Please try restoring via a manual JSON backup file below.</span>
                </div>
              )}
            </div>

            {/* Backup Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              <button
                type="button"
                onClick={handleExport}
                className="h-11 flex items-center justify-center gap-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Export Full Backup (.json)</span>
              </button>

              <label className="h-11 flex items-center justify-center gap-2 px-4 rounded-xl bg-white dark:bg-[#181A28] hover:bg-slate-100 dark:hover:bg-white/10 text-slate-900 dark:text-white text-xs font-bold border border-slate-200/80 dark:border-white/10 transition-all cursor-pointer active:scale-95">
                <Upload className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Restore Backup File</span>
                <input type="file" accept=".json" onChange={handleImport} className="hidden" />
              </label>

              <button
                type="button"
                onClick={() => setShowPwaModal(true)}
                className="h-11 flex items-center justify-center gap-2 px-4 rounded-xl bg-white dark:bg-[#181A28] hover:bg-slate-100 dark:hover:bg-white/10 text-slate-900 dark:text-white text-xs font-bold border border-slate-200/80 dark:border-white/10 transition-all cursor-pointer active:scale-95"
              >
                <Smartphone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>{isInstalled ? 'App Installed ✓' : 'Install PWA App 📲'}</span>
              </button>
            </div>

            {importStatus === 'success' && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 animate-fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  ✓ Full backup restored successfully! All topics, notes, PDF highlights, reflections &amp; settings synced.
                </span>
              </div>
            )}

            {importStatus === 'error' && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 animate-fade-in">
                <Trash2 className="w-4 h-4 text-rose-500 shrink-0" />
                <span className="text-xs font-bold text-rose-600 dark:text-rose-400">
                  Invalid backup format. Please select a valid Syllabus 3D backup JSON file.
                </span>
              </div>
            )}

            {/* Danger Zone */}
            <div className="pt-3 border-t border-slate-100 dark:border-white/5 space-y-2.5">
              <span className="text-xs font-bold text-rose-500 uppercase tracking-wider block font-sans">
                ⚠ Danger Zone
              </span>
              <div className="flex flex-wrap gap-2">
                {showResetConfirm ? (
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => {
                        resetToDemo();
                        setShowResetConfirm(false);
                      }}
                      className="flex-1 sm:flex-initial h-10 px-4 rounded-xl bg-rose-500 text-white text-xs font-bold cursor-pointer shadow-xs"
                    >
                      Yes, Reset Demo
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowResetConfirm(false)}
                      className="h-10 px-4 rounded-xl bg-slate-100 dark:bg-white/10 text-xs font-bold text-slate-600 dark:text-slate-300 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowResetConfirm(true)}
                    className="h-10 flex items-center gap-1.5 px-4 rounded-xl bg-white dark:bg-[#181A28] hover:bg-rose-500/15 hover:text-rose-500 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Demo Data</span>
                  </button>
                )}

                {showClearConfirm ? (
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => {
                        clearAllDemoData();
                        setShowClearConfirm(false);
                      }}
                      className="flex-1 sm:flex-initial h-10 px-4 rounded-xl bg-rose-600 text-white text-xs font-bold cursor-pointer shadow-xs"
                    >
                      Yes, Delete Everything
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowClearConfirm(false)}
                      className="h-10 px-4 rounded-xl bg-slate-100 dark:bg-white/10 text-xs font-bold text-slate-600 dark:text-slate-300 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowClearConfirm(true)}
                    className="h-10 flex items-center gap-1.5 px-4 rounded-xl bg-white dark:bg-[#181A28] hover:bg-rose-500/15 hover:text-rose-500 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Start Fresh (Blank Canvas)</span>
                  </button>
                )}
              </div>
            </div>

            {/* Primary CTA Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleExport}
                className="w-full h-12 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-bold shadow-md shadow-blue-500/25 transition-all cursor-pointer active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Export &amp; Secure Workspace Data</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════
          TAB 6: APP SAFETY & PIN SECURITY
          ═══════════════════════════════════════════════════ */}
      {/* TAB 4: APP SAFETY & PIN SECURITY (Matching media_1790328428745.png) */}
      {activeTab === 'security' && (
        <div className="space-y-4 sm:space-y-5 animate-fade-in">
          {/* Top Summary Card */}
          <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121424] border border-slate-200/90 dark:border-white/10 shadow-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-cyan-600 to-blue-600 text-white flex items-center justify-center text-xl font-bold shrink-0 shadow-xs">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div className="min-w-0 space-y-0.5">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">
                    App Lock &amp; Security PIN
                  </h3>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-sans font-bold ${
                    isPinConfigured
                      ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                      : 'bg-slate-100 dark:bg-white/10 text-slate-500 border border-slate-200 dark:border-white/10'
                  }`}>
                    {isPinConfigured ? `Active (${pinConfig.pinLength}-Digit)` : 'Disabled'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {isPinConfigured
                    ? 'Client-side salted SHA-256 hash protection active • Inactivity auto-lock enabled'
                    : 'Workspace unlocked • Set up a 4 or 6 digit PIN to protect notes & syllabus'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {isPinConfigured ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setSetPinModalMode('change');
                      setIsSetPinModalOpen(true);
                    }}
                    className="px-3.5 sm:px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-800 dark:text-white text-xs sm:text-[13px] font-bold shadow-xs cursor-pointer active:scale-95 transition-all flex items-center gap-1.5"
                  >
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>Change PIN</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setDisablePinError(null);
                      setDisablePinInput('');
                      setShowDisablePinDialog(true);
                    }}
                    className="px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold text-rose-500 hover:bg-rose-500/10 border border-rose-500/20 cursor-pointer transition-colors"
                  >
                    Turn Off
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setSetPinModalMode('enable');
                    setIsSetPinModalOpen(true);
                  }}
                  className="px-4 sm:px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-[13px] font-bold shadow-xs cursor-pointer active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Set Up PIN</span>
                </button>
              )}
            </div>
          </div>

          {/* Main Form Card */}
          <div className="p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121424] border border-slate-200/90 dark:border-white/10 shadow-xs space-y-5 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-white/5 pb-4">
              <div>
                <h2 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Auto-Lock &amp; Inactivity Defense
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-normal mt-0.5">
                  Automatically lock the workspace when left unattended or when minimizing browser tabs.
                </p>
              </div>

              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold font-sans ${
                isPinConfigured
                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25'
                  : 'bg-slate-100 dark:bg-white/10 text-slate-500 border border-slate-200 dark:border-white/10'
              }`}>
                <Lock className="w-3.5 h-3.5" />
                <span>{isPinConfigured ? 'Workspace Secured' : 'Lock Disabled'}</span>
              </span>
            </div>

            <div className="space-y-4">
              {/* Timeout Duration Selector */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-[#181A28] border border-slate-200/80 dark:border-white/10">
                <div>
                  <span className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white block">
                    Inactivity Auto-Lock Interval
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-normal">
                    How long before the lock screen appears after no keyboard or mouse activity.
                  </span>
                </div>

                <select
                  value={pinConfig.autoLockTimeout}
                  disabled={!isPinConfigured}
                  onChange={(e) => {
                    soundManager.playClick();
                    updatePinConfig({ autoLockTimeout: Number(e.target.value) });
                  }}
                  className="px-3.5 py-2 rounded-xl bg-white dark:bg-[#121424] border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 disabled:opacity-40 cursor-pointer shadow-2xs"
                >
                  <option value={0}>Immediately when idle</option>
                  <option value={1}>After 1 Minute</option>
                  <option value={5}>After 5 Minutes (Recommended)</option>
                  <option value={15}>After 15 Minutes</option>
                  <option value={30}>After 30 Minutes</option>
                  <option value={-1}>Never (Manual Lock Only)</option>
                </select>
              </div>

              {/* Tab Switch Lock Toggle */}
              <div className="flex items-center justify-between gap-3 p-4 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-[#181A28] border border-slate-200/80 dark:border-white/10">
                <div className="pr-3">
                  <span className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white block">
                    Immediate Lock on Tab Switch
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-normal">
                    Instantly triggers the lock screen whenever you minimize or switch to another browser window or tab.
                  </span>
                </div>

                <ToggleSwitch
                  checked={Boolean(pinConfig.lockOnTabSwitch && isPinConfigured)}
                  onChange={(checked) => {
                    if (!isPinConfigured) return;
                    updatePinConfig({ lockOnTabSwitch: checked });
                  }}
                />
              </div>

              {/* Recovery & Cryptographic Info */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-[#181A28] border border-slate-200/80 dark:border-white/10 space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white">
                      Zero-Knowledge Recovery Architecture
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Client-side salted SHA-256 hash protection using the native Web Crypto API.
                    </p>
                  </div>
                </div>

                {isPinConfigured && (
                  <div className="p-3 rounded-xl bg-white dark:bg-[#121424] border border-slate-200/80 dark:border-white/10 space-y-1">
                    <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      Active Recovery Question
                    </span>
                    <p className="text-xs font-semibold text-slate-900 dark:text-white">
                      {pinConfig.securityQuestion || 'What is your target exam or dream post?'}
                    </p>
                  </div>
                )}

                <div className="p-3 rounded-xl bg-blue-500/[0.06] border border-blue-500/20 space-y-1 text-xs text-slate-600 dark:text-slate-300">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    🛡️ Zero Plaintext Storage Guarantee
                  </p>
                  <p className="text-[11px] leading-relaxed">
                    Your PIN and emergency security answers are never stored in plaintext and never transmitted to any remote servers. Only one-way cryptographic hashes are verified in browser memory.
                  </p>
                </div>
              </div>
            </div>

            {/* Primary CTA Button */}
            <div className="pt-2">
              {isPinConfigured ? (
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    window.dispatchEvent(new Event('syllabus3d_lock_now'));
                  }}
                  className="w-full h-12 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-bold shadow-md shadow-blue-500/25 transition-all cursor-pointer active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Lock Workspace Now</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setSetPinModalMode('enable');
                    setIsSetPinModalOpen(true);
                  }}
                  className="w-full h-12 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-bold shadow-md shadow-blue-500/25 transition-all cursor-pointer active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Set Up Safety PIN Protection</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

        </div> {/* END RIGHT COLUMN (flex-1 min-w-0 w-full space-y-4 sm:space-y-5) */}
      </div> {/* END 2-COLUMN LAYOUT (flex flex-col lg:flex-row gap-5 sm:gap-6 items-start) */}

      {/* Disable PIN Confirmation Dialog */}
      {showDisablePinDialog && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in select-none">
          <div className="w-full max-w-sm bg-[#0F111A] border border-white/15 rounded-3xl shadow-2xl p-6 text-white space-y-4">
            <div>
              <h3 className="text-lg font-black tracking-tight text-white">Disable Safety PIN</h3>
              <p className="text-xs text-slate-400 mt-1">
                Please enter your current PIN to turn off safety protection.
              </p>
            </div>

            <div className="space-y-1">
              <input
                type="password"
                maxLength={pinConfig.pinLength || 4}
                inputMode="numeric"
                value={disablePinInput}
                autoFocus
                onChange={(e) => {
                  setDisablePinInput(e.target.value.replace(/\D/g, ''));
                  setDisablePinError(null);
                }}
                placeholder={`Current ${pinConfig.pinLength || 4} digits`}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 text-center font-mono text-base tracking-widest focus:outline-none focus:border-rose-400"
              />
            </div>

            {disablePinError && (
              <div className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 p-2.5 rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{disablePinError}</span>
              </div>
            )}

            <div className="flex items-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setShowDisablePinDialog(false)}
                className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-slate-300 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDisablingPin || disablePinInput.length !== (pinConfig.pinLength || 4)}
                onClick={async () => {
                  setIsDisablingPin(true);
                  const ok = await disablePin(disablePinInput);
                  setIsDisablingPin(false);
                  if (ok) {
                    setShowDisablePinDialog(false);
                  } else {
                    setDisablePinError('Incorrect PIN. Please try again.');
                  }
                }}
                className="flex-1 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-xs font-bold text-white transition-all disabled:opacity-50 cursor-pointer"
              >
                Confirm Turn Off
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Set / Change PIN Modal */}
      <SetPinModal
        isOpen={isSetPinModalOpen}
        onClose={() => setIsSetPinModalOpen(false)}
        mode={setPinModalMode}
      />

      {/* PWA Install Modal */}
      <PWAInstallModal isOpen={showPwaModal} onClose={() => setShowPwaModal(false)} />


      {/* Google Drive Cloud Vault & Media Sync Modal */}
      <GoogleDriveBackupModal
        isOpen={showGoogleDriveModal}
        onClose={() => {
          setShowGoogleDriveModal(false);
          setGdriveConnected(Boolean(getValidAccessToken()));
        }}
        onRestoreSuccess={() => {
          setStorageMetrics(getStorageMetrics());
        }}
      />
    </div>
  );
};

