import React, { useState } from 'react';
import { ShieldCheck, Key, ExternalLink, Copy, Check, CheckCircle2, User, RefreshCw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getSavedGoogleClientId, saveGoogleClientId } from '../../services/googleAuthService';
import { soundManager } from '../../utils/soundEffects';

export const GoogleAuthSettingsCard: React.FC = () => {
  const { user, loginWithGoogle, loginWithDemoGoogle } = useAuth();

  const [clientId, setClientId] = useState<string>(() => getSavedGoogleClientId());
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedOrigin, setCopiedOrigin] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
  const isGoogleConnected = user?.provider === 'google';

  const handleCopyOrigin = () => {
    navigator.clipboard.writeText(currentOrigin);
    setCopiedOrigin(true);
    soundManager.playClick();
    setTimeout(() => setCopiedOrigin(false), 2000);
  };

  const handleSaveClientId = (e?: React.FormEvent) => {
    e?.preventDefault();
    saveGoogleClientId(clientId.trim());
    setSavedSuccess(true);
    setErrorMessage(null);
    soundManager.playCompleteChime();
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleConnectGoogle = async () => {
    setIsConnecting(true);
    setErrorMessage(null);
    try {
      await loginWithGoogle();
      soundManager.playCompleteChime();
    } catch (err: any) {
      if (err?.message === 'GOOGLE_SETUP_REQUIRED') {
        setErrorMessage('Please paste a valid Google Client ID below to connect real Gmail OAuth.');
      } else if (!err?.message?.includes('cancelled')) {
        setErrorMessage(err?.message || 'Failed to authenticate with Google.');
      }
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#161828] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white tracking-tight">
              Google 1-Click Identity &amp; Cloud Authentication
            </h4>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">
              Permanent student UID, verified Gmail identity &amp; zero-cost Google Drive sync
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div>
          {isGoogleConnected ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Verified Google Identity Active
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-400">
              Local / Email Account
            </span>
          )}
        </div>
      </div>

      {/* Account Info Details */}
      {isGoogleConnected && user && (
        <div className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-[#1C1E30] border border-slate-200/70 dark:border-white/5 space-y-2">
          <div className="flex items-center gap-3">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-11 h-11 rounded-full border-2 border-emerald-500/50 object-cover shrink-0"
              />
            ) : (
              <div className="w-11 h-11 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm shrink-0">
                <User className="w-5 h-5" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h5 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                {user.name}
              </h5>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate">
                {user.email}
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200/60 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] font-mono text-slate-500 dark:text-slate-400">
            <span>Permanent Cloud UID:</span>
            <code className="px-2 py-0.5 rounded bg-slate-200/60 dark:bg-white/5 text-slate-800 dark:text-slate-200 font-bold truncate max-w-xs">
              {user.id}
            </code>
          </div>
        </div>
      )}

      {/* Connect Button if not Google connected */}
      {!isGoogleConnected && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            type="button"
            onClick={handleConnectGoogle}
            disabled={isConnecting}
            className="btn-primary py-2 px-4 text-xs font-bold shadow-sm shadow-blue-500/20 flex items-center gap-2"
          >
            {isConnecting ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.26 21.36 7.33 24 12 24z" />
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.94 0 12s.46 3.84 1.26 5.42l4.02-3.15z" />
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
              </svg>
            )}
            <span>Connect Real Google Account</span>
          </button>

          <button
            type="button"
            onClick={async () => {
              await loginWithDemoGoogle();
              soundManager.playCompleteChime();
            }}
            className="btn-secondary py-2 px-3.5 text-xs font-bold"
          >
            <span>Test with Demo Google Scholar</span>
          </button>
        </div>
      )}

      {errorMessage && (
        <p className="text-xs font-bold text-rose-500 animate-fade-in">
          ⚠ {errorMessage}
        </p>
      )}

      {/* Google Cloud Client ID Configuration Form */}
      <form onSubmit={handleSaveClientId} className="space-y-3 pt-3 border-t border-slate-100 dark:border-white/5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Key className="w-3.5 h-3.5 text-blue-500" />
            <span>Google Cloud Client ID (Web Application)</span>
          </label>
          <button
            type="button"
            onClick={handleCopyOrigin}
            className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            {copiedOrigin ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
            <span>{copiedOrigin ? 'Origin Copied' : 'Copy JS Origin'}</span>
          </button>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            placeholder="e.g. 1029384756-xxxxxx.apps.googleusercontent.com"
            className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#1C1E30] text-slate-900 dark:text-white text-xs font-mono placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="btn-secondary py-2 px-4 text-xs font-bold shrink-0 cursor-pointer"
          >
            Save ID
          </button>
        </div>

        {savedSuccess && (
          <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 animate-fade-in">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Google Client ID saved successfully! Ready for 1-click login.</span>
          </p>
        )}

        <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1">
          <span>Authorized Origin: <code className="font-mono font-bold">{currentOrigin}</code></span>
          <a
            href="https://console.cloud.google.com/apis/credentials"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline font-bold"
          >
            <span>Google Cloud Console</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </form>
    </div>
  );
};
