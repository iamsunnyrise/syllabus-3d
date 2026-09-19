/**
 * ═══════════════════════════════════════════════════════════════
 * GOOGLE OAUTH 1-CLICK AUTHENTICATION SERVICE (Google Identity Services)
 * ═══════════════════════════════════════════════════════════════
 * 1. Provides verified 1-Click Google OAuth login on the client.
 * 2. Extracts the permanent Google Subject ID ('sub') as the immutable UID.
 * 3. Bridges the OAuth access token to Google Drive service for zero-cost cloud backup.
 * 4. Supports Google Client ID from environment (VITE_GOOGLE_CLIENT_ID) or in-app settings.
 * ═══════════════════════════════════════════════════════════════
 */

import { AuthUser } from '../types/auth';

const GIS_SCRIPT_URL = 'https://accounts.google.com/gsi/client';
const GOOGLE_CLIENT_ID_KEY = 'syllabus3d_google_client_id';

const GDRIVE_KEYS = {
  ACCESS_TOKEN: 'syllabus3d_gdrive_access_token',
  TOKEN_EXPIRES_AT: 'syllabus3d_gdrive_token_expires_at',
  USER_INFO: 'syllabus3d_gdrive_user',
  CONFIG: 'syllabus3d_gdrive_config'
};

const OAUTH_SCOPES = [
  'openid',
  'email',
  'profile',
  'https://www.googleapis.com/auth/drive.file'
].join(' ');

export interface GoogleUserInfo {
  sub: string; // Permanent immutable Google UID
  name: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  email: string;
  email_verified: boolean;
}

export function getSavedGoogleClientId(): string {
  if (typeof window === 'undefined') return '';
  try {
    const saved = localStorage.getItem(GOOGLE_CLIENT_ID_KEY);
    if (saved && saved.trim()) return saved.trim();
  } catch {}
  return (import.meta as any).env?.VITE_GOOGLE_CLIENT_ID || '';
}

export function saveGoogleClientId(clientId: string): void {
  if (typeof window === 'undefined') return;
  try {
    if (!clientId.trim()) {
      localStorage.removeItem(GOOGLE_CLIENT_ID_KEY);
    } else {
      localStorage.setItem(GOOGLE_CLIENT_ID_KEY, clientId.trim());
      // Also update Drive config clientId
      const driveConfigRaw = localStorage.getItem(GDRIVE_KEYS.CONFIG);
      const driveConfig = driveConfigRaw ? JSON.parse(driveConfigRaw) : {};
      driveConfig.clientId = clientId.trim();
      localStorage.setItem(GDRIVE_KEYS.CONFIG, JSON.stringify(driveConfig));
    }
  } catch {}
}

let gisScriptLoadingPromise: Promise<boolean> | null = null;

export function loadGoogleIdentityScript(): Promise<boolean> {
  if (typeof window === 'undefined') return Promise.resolve(false);
  if ((window as any).google?.accounts?.oauth2) return Promise.resolve(true);

  if (gisScriptLoadingPromise) return gisScriptLoadingPromise;

  gisScriptLoadingPromise = new Promise<boolean>((resolve) => {
    // Check if script already on DOM
    const existing = document.querySelector(`script[src="${GIS_SCRIPT_URL}"]`);
    if (existing) {
      if ((window as any).google?.accounts?.oauth2) {
        resolve(true);
      } else {
        existing.addEventListener('load', () => resolve(true));
        existing.addEventListener('error', () => resolve(false));
      }
      return;
    }

    const script = document.createElement('script');
    script.src = GIS_SCRIPT_URL;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });

  return gisScriptLoadingPromise;
}

export async function signInWithGoogleGIS(): Promise<AuthUser> {
  const clientId = getSavedGoogleClientId();

  if (!clientId) {
    throw new Error('GOOGLE_CLIENT_ID_MISSING');
  }

  const loaded = await loadGoogleIdentityScript();
  if (!loaded || !(window as any).google?.accounts?.oauth2) {
    throw new Error('Failed to load Google Identity Services SDK. Please check your internet connection.');
  }

  const google = (window as any).google;

  return new Promise<AuthUser>((resolve, reject) => {
    try {
      const tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: OAUTH_SCOPES,
        callback: async (tokenResponse: any) => {
          if (tokenResponse.error) {
            if (tokenResponse.error === 'popup_closed_by_user' || tokenResponse.error === 'access_denied') {
              reject(new Error('Google Sign-In was cancelled.'));
              return;
            }
            reject(new Error(`Google Sign-In error: ${tokenResponse.error_description || tokenResponse.error}`));
            return;
          }

          const accessToken = tokenResponse.access_token;
          if (!accessToken) {
            reject(new Error('No access token received from Google.'));
            return;
          }

          const expiresIn = (tokenResponse.expires_in || 3600) * 1000;
          const expiresAt = Date.now() + expiresIn - 60000;

          // Save token for Google Drive integration
          try {
            localStorage.setItem(GDRIVE_KEYS.ACCESS_TOKEN, accessToken);
            localStorage.setItem(GDRIVE_KEYS.TOKEN_EXPIRES_AT, String(expiresAt));
          } catch {}

          // Fetch verified Google User Profile
          try {
            const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
              headers: { Authorization: `Bearer ${accessToken}` }
            });

            if (!userInfoRes.ok) {
              throw new Error(`Failed to fetch Google profile: ${userInfoRes.statusText}`);
            }

            const info: GoogleUserInfo = await userInfoRes.json();

            // Save to Drive user info as well
            try {
              localStorage.setItem(GDRIVE_KEYS.USER_INFO, JSON.stringify({
                email: info.email,
                name: info.name,
                picture: info.picture
              }));
            } catch {}

            const authUser: AuthUser = {
              id: `g_${info.sub}`, // Immutable permanent Google UID
              name: info.name || 'Google Scholar',
              email: info.email,
              avatarUrl: info.picture,
              provider: 'google',
              createdAt: new Date().toISOString(),
              lastLoginAt: new Date().toISOString()
            };

            resolve(authUser);
          } catch (fetchErr: any) {
            reject(new Error(`Google user verification failed: ${fetchErr?.message || 'Network error'}`));
          }
        },
        error_callback: (err: any) => {
          reject(new Error(err?.message || 'Google OAuth prompt error.'));
        }
      });

      tokenClient.requestAccessToken({ prompt: 'select_account' });
    } catch (err: any) {
      reject(new Error(err?.message || 'Failed to initialize Google Sign-In.'));
    }
  });
}
