import { useState, useEffect, useCallback } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const STORAGE_KEYS = ['pwa_installed', 'app_installed', 'syllabus3d_app_installed'];

// Check if app is installed (either in standalone mode or previously marked as installed)
export function checkIsAppInstalled(): boolean {
  if (typeof window === 'undefined') return false;

  // 1. Check persistent localStorage flags
  try {
    for (const key of STORAGE_KEYS) {
      if (localStorage.getItem(key) === 'true') {
        return true;
      }
    }
  } catch {}

  // 2. Check if currently running inside standalone / PWA window
  try {
    const isStandaloneDisplay = window.matchMedia('(display-mode: standalone)').matches;
    const isFullscreenDisplay = window.matchMedia('(display-mode: fullscreen)').matches;
    const isMinimalUiDisplay = window.matchMedia('(display-mode: minimal-ui)').matches;
    const isNavigatorStandalone = (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    const isAndroidAppReferrer = typeof document !== 'undefined' && document.referrer.includes('android-app://');

    if (isStandaloneDisplay || isFullscreenDisplay || isMinimalUiDisplay || isNavigatorStandalone || isAndroidAppReferrer) {
      try {
        localStorage.setItem('pwa_installed', 'true');
        localStorage.setItem('app_installed', 'true');
      } catch {}
      return true;
    }
  } catch {}

  return false;
}

// Mark the app as downloaded/installed persistently
export function markAsInstalled(): void {
  try {
    localStorage.setItem('pwa_installed', 'true');
    localStorage.setItem('app_installed', 'true');
  } catch {}
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('pwa:installed-change', { detail: { isInstalled: true } }));
  }
}

// Module-level global prompt reference so it is NEVER lost across component mounts
let globalDeferredPrompt: BeforeInstallPromptEvent | null = null;

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e: Event) => {
    e.preventDefault();
    globalDeferredPrompt = e as BeforeInstallPromptEvent;
    window.dispatchEvent(new CustomEvent('pwa:prompt-ready'));
  });

  window.addEventListener('appinstalled', () => {
    globalDeferredPrompt = null;
    markAsInstalled();
  });
}

export function usePWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(() => globalDeferredPrompt);
  const [isInstalled, setIsInstalled] = useState<boolean>(() => checkIsAppInstalled());
  const [isInstallable, setIsInstallable] = useState<boolean>(() => Boolean(globalDeferredPrompt) && !checkIsAppInstalled());
  const [isOnline, setIsOnline] = useState<boolean>(() => (typeof navigator !== 'undefined' ? navigator.onLine : true));

  useEffect(() => {
    const currentInstalled = checkIsAppInstalled();
    if (currentInstalled !== isInstalled) {
      setIsInstalled(currentInstalled);
    }

    if (globalDeferredPrompt && !currentInstalled) {
      setDeferredPrompt(globalDeferredPrompt);
      setIsInstallable(true);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      globalDeferredPrompt = promptEvent;
      setDeferredPrompt(promptEvent);
      if (!checkIsAppInstalled()) {
        setIsInstallable(true);
      }
    };

    const handleAppInstalled = () => {
      globalDeferredPrompt = null;
      setDeferredPrompt(null);
      markAsInstalled();
      setIsInstalled(true);
      setIsInstallable(false);
    };

    const handleInstalledChange = () => {
      const installed = checkIsAppInstalled();
      setIsInstalled(installed);
      if (installed) {
        setIsInstallable(false);
        setDeferredPrompt(null);
      }
    };

    const handlePromptReady = () => {
      if (globalDeferredPrompt && !checkIsAppInstalled()) {
        setDeferredPrompt(globalDeferredPrompt);
        setIsInstallable(true);
      }
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key && STORAGE_KEYS.includes(e.key)) {
        setIsInstalled(checkIsAppInstalled());
      }
    };

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('pwa:installed-change', handleInstalledChange);
    window.addEventListener('pwa:prompt-ready', handlePromptReady);
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('pwa:installed-change', handleInstalledChange);
      window.removeEventListener('pwa:prompt-ready', handlePromptReady);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const triggerInstall = useCallback(async (): Promise<boolean> => {
    const promptEvent = deferredPrompt || globalDeferredPrompt;
    if (!promptEvent) return false;

    try {
      await promptEvent.prompt();
      const choice = await promptEvent.userChoice;
      if (choice.outcome === 'accepted') {
        markAsInstalled();
        setIsInstalled(true);
        setIsInstallable(false);
        setDeferredPrompt(null);
        globalDeferredPrompt = null;
        return true;
      }
    } catch (err) {
      console.warn('Install prompt error:', err);
    }
    return false;
  }, [deferredPrompt]);

  return {
    isInstallable,
    isInstalled,
    isOnline,
    triggerInstall,
    markAsInstalled
  };
}

