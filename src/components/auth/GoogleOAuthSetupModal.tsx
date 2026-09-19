import React, { useState } from 'react';
import { X, Key, ExternalLink, ShieldCheck, Sparkles, Check, Copy } from 'lucide-react';
import { getSavedGoogleClientId, saveGoogleClientId } from '../../services/googleAuthService';
import { soundManager } from '../../utils/soundEffects';

interface GoogleOAuthSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onContinueDemo: () => void;
}

export const GoogleOAuthSetupModal: React.FC<GoogleOAuthSetupModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onContinueDemo
}) => {
  const [clientId, setClientId] = useState<string>(() => getSavedGoogleClientId());
  const [copiedOrigin, setCopiedOrigin] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';

  const handleCopyOrigin = () => {
    navigator.clipboard.writeText(currentOrigin);
    setCopiedOrigin(true);
    soundManager.playClick();
    setTimeout(() => setCopiedOrigin(false), 2000);
  };

  const handleSaveAndConnect = () => {
    const trimmed = clientId.trim();
    if (!trimmed) {
      setError('Please paste your Google Client ID.');
      return;
    }
    if (!trimmed.includes('.apps.googleusercontent.com') && !trimmed.startsWith('AIza')) {
      setError('A standard Google OAuth Web Client ID ends with ".apps.googleusercontent.com"');
      return;
    }

    saveGoogleClientId(trimmed);
    soundManager.playCompleteChime();
    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-[#161828] border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden animate-scale-up">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
                Connect Google 1-Click Login
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Link real Gmail accounts &amp; unlock zero-cost Google Drive sync
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Quick Info Box */}
          <div className="p-3.5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-800/40 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-700 dark:text-blue-300">
              <Key className="w-4 h-4" />
              <span>Google Cloud Client ID Required for Real Gmail OAuth</span>
            </div>
            <p className="text-[11px] text-blue-600/90 dark:text-blue-300/80 leading-relaxed">
              To let students log in with their real Gmail and connect their 15GB Google Drive, add a free Web Client ID from Google Cloud Console.
            </p>
          </div>

          {/* Quick Setup Instructions */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700 dark:text-slate-300">
                1. Authorized JavaScript Origin:
              </span>
              <button
                type="button"
                onClick={handleCopyOrigin}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors cursor-pointer"
              >
                {copiedOrigin ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                <span>{copiedOrigin ? 'Copied!' : 'Copy URL'}</span>
              </button>
            </div>
            <code className="block p-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200/70 dark:border-white/10 text-[11px] font-mono text-slate-800 dark:text-slate-200 break-all">
              {currentOrigin}
            </code>
          </div>

          {/* Client ID Input Field */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              2. Paste Your Google Client ID:
            </label>
            <input
              type="text"
              value={clientId}
              onChange={(e) => {
                setClientId(e.target.value);
                if (error) setError(null);
              }}
              placeholder="e.g. 1029384756-xxxxxxxx.apps.googleusercontent.com"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#1C1E30] text-slate-900 dark:text-white text-xs font-mono placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
            {error && (
              <p className="text-[11px] font-bold text-rose-500">{error}</p>
            )}
          </div>

          {/* Links to Google Cloud */}
          <div className="flex items-center justify-between text-[11px] pt-1">
            <a
              href="https://console.cloud.google.com/apis/credentials"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline font-bold"
            >
              <span>Open Google Cloud Credentials</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-[#121422] border-t border-slate-100 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={onContinueDemo}
            className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Continue with Demo Scholar</span>
          </button>

          <button
            type="button"
            onClick={handleSaveAndConnect}
            className="w-full sm:w-auto btn-primary py-2 px-5 text-xs font-bold shadow-md shadow-blue-500/20"
          >
            <span>Save &amp; Connect Google</span>
          </button>
        </div>

      </div>
    </div>
  );
};
