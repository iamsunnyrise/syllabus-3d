import React, { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Smartphone,
  CheckCircle2,
  Download,
  Share2,
  PlusSquare,
  Monitor,
  MoreVertical,
  Zap,
  Sparkles
} from 'lucide-react';
import { usePWA } from '../../hooks/usePWA';
import { haptics } from '../../utils/haptics';
import { soundManager } from '../../utils/soundEffects';
import { fireCelebration } from '../../utils/confettiHelper';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, triggerInstall, markAsInstalled } = usePWA();

  const isIOS = useMemo(() => {
    if (typeof navigator === 'undefined') return false;
    return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  }, []);

  const isAndroid = useMemo(() => {
    if (typeof navigator === 'undefined') return false;
    return /Android/i.test(navigator.userAgent);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  if (typeof document === 'undefined') return null;

  const handleInstallClick = async () => {
    haptics.medium();
    soundManager.playClick();
    if (isInstallable) {
      const success = await triggerInstall();
      if (success) {
        fireCelebration();
        markAsInstalled();
        onClose();
      }
    }
  };

  const handleMarkInstalled = () => {
    soundManager.playSuccess();
    haptics.success();
    fireCelebration();
    markAsInstalled();
    onClose();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in select-none overflow-y-auto"
      onClick={() => {
        haptics.light();
        onClose();
      }}
    >
      <div
        className="relative w-full max-w-md my-auto rounded-3xl bg-white dark:bg-[#131522] border border-slate-200/90 dark:border-white/10 shadow-2xl p-5 sm:p-6 overflow-hidden overscroll-contain animate-scale-up text-slate-900 dark:text-white"
        onClick={e => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-blue-500/15 dark:bg-blue-500/25 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-44 h-44 rounded-full bg-purple-500/15 dark:bg-purple-500/20 blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="relative flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src="/logo.png" alt="SYLLABUS 3D" className="w-11 h-11 rounded-2xl object-cover shadow-md" />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-[#131522] flex items-center justify-center text-[9px] text-white font-bold">
                ✓
              </span>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>Install SYLLABUS 3D</span>
                <span className="px-1.5 py-0.2 rounded-md bg-blue-500/15 text-blue-600 dark:text-blue-400 text-[10px] font-mono font-bold uppercase">
                  App
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                100% Offline & Native Full-Screen App
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              haptics.light();
              onClose();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-all cursor-pointer active:scale-90"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Benefits Grid */}
        <div className="space-y-2.5 mb-4">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.06]">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div className="min-w-0">
              <h5 className="text-xs font-bold text-slate-900 dark:text-white">Works 100% Offline</h5>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                Study anywhere without internet or cellular data.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.06]">
            <div className="w-8 h-8 rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <Smartphone className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div className="min-w-0">
              <h5 className="text-xs font-bold text-slate-900 dark:text-white">Full-Screen Native Experience</h5>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                Launches directly from your Home Screen with zero lag.
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Action: 1-Click Browser Installer vs Step-by-Step Platform Guidance */}
        <div className="space-y-2.5">
          {isInstallable && (
            <button
              type="button"
              onClick={handleInstallClick}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 cursor-pointer active:scale-95 transition-all"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>Install App on this Device</span>
            </button>
          )}

          {/* Platform Specific Guidance */}
          {isIOS ? (
            <div className="p-3.5 rounded-2xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/40 text-xs space-y-2 text-slate-700 dark:text-slate-300">
              <span className="font-bold flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                <Share2 className="w-4 h-4" />
                <span>iPhone / iPad (Safari) Instructions:</span>
              </span>
              <ol className="list-decimal list-inside space-y-1.5 text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                <li>Tap the <span className="font-bold text-slate-900 dark:text-white">Share button ( <Share2 className="inline w-3 h-3 text-blue-500" /> )</span> at bottom of Safari.</li>
                <li>Scroll down and tap <span className="font-bold text-slate-900 dark:text-white">"Add to Home Screen" ( <PlusSquare className="inline w-3 h-3 text-blue-500" /> )</span>.</li>
                <li>Tap <span className="font-bold text-slate-900 dark:text-white">Add</span> in top right. SYLLABUS 3D will appear on your screen!</li>
              </ol>
            </div>
          ) : isAndroid ? (
            <div className="p-3.5 rounded-2xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/40 text-xs space-y-2 text-slate-700 dark:text-slate-300">
              <span className="font-bold flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                <MoreVertical className="w-4 h-4" />
                <span>Android Chrome Instructions:</span>
              </span>
              <ol className="list-decimal list-inside space-y-1.5 text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                <li>Tap the <span className="font-bold text-slate-900 dark:text-white">3 Dots Menu ( <MoreVertical className="inline w-3 h-3 text-blue-500" /> )</span> at top right of Chrome.</li>
                <li>Tap <span className="font-bold text-slate-900 dark:text-white">"Install app"</span> or <span className="font-bold text-slate-900 dark:text-white">"Add to Home screen"</span>.</li>
                <li>Tap <span className="font-bold text-slate-900 dark:text-white">Install</span>. The app icon will be added to your home screen!</li>
              </ol>
            </div>
          ) : (
            <div className="p-3.5 rounded-2xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/40 text-xs space-y-2 text-slate-700 dark:text-slate-300">
              <span className="font-bold flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                <Monitor className="w-4 h-4" />
                <span>Desktop (Chrome / Edge / Brave):</span>
              </span>
              <ol className="list-decimal list-inside space-y-1.5 text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                <li>Look at the right end of your browser's address bar (URL bar).</li>
                <li>Click the <span className="font-bold text-slate-900 dark:text-white">Install icon ( <Download className="inline w-3 h-3 text-blue-500" /> )</span>.</li>
                <li>Click <span className="font-bold text-slate-900 dark:text-white">Install</span> to launch in its own standalone window!</li>
              </ol>
            </div>
          )}

          {/* User Confirmation Button to remove the Install button */}
          <button
            type="button"
            onClick={handleMarkInstalled}
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>✓ I've Added the App (Remove Button)</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="w-full mt-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer text-center"
        >
          Maybe Later
        </button>
      </div>
    </div>,
    document.body
  );
};
