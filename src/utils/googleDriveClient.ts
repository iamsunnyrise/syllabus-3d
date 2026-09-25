/**
 * Google Drive Cloud Integration Client for Syllabus 3D
 * Handles Google Identity Services (GIS) OAuth 2.0 token flow and Google Drive REST API v3.
 * Uses restricted scope 'https://www.googleapis.com/auth/drive.file' for maximum user privacy.
 * Supports both Live Google Drive Cloud OAuth and Instant Local Cloud Vault Mode.
 */

export interface GoogleDriveUser {
  email: string;
  name?: string;
  picture?: string;
}

export interface GoogleDriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  createdTime: string;
  webViewLink?: string;
}

export interface GoogleDriveFolderHierarchy {
  rootFolderId: string;
  databaseFolderId: string;
  pdfsFolderId: string;
  photosFolderId: string;
}

const GIS_SCRIPT_URL = 'https://accounts.google.com/gsi/client';
const DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.file';

const STORAGE_KEYS = {
  CLIENT_ID: 'syllabus3d_gdrive_client_id',
  ACCESS_TOKEN: 'syllabus3d_gdrive_token',
  TOKEN_EXPIRES_AT: 'syllabus3d_gdrive_token_expires',
  USER_INFO: 'syllabus3d_gdrive_user',
  LOCAL_MODE: 'syllabus3d_gdrive_local_mode'
};

// Production Google OAuth Web Client ID for Syllabus 3D
export const DEFAULT_GOOGLE_CLIENT_ID = '387868887008-2tt3jmojcgguqrp6mbkkmkn9br7pm68o.apps.googleusercontent.com';

// Known obsolete placeholder IDs that should never be sent to Google
const OBSOLETE_CLIENT_IDS = [
  '388657788421-m5c88k5938n0u72vdv4u799q92i56b2s.apps.googleusercontent.com'
];

/**
 * Gets currently configured Google OAuth Client ID across all storage keys & env
 */
export function getGoogleClientId(): string {
  if (typeof window === 'undefined') return DEFAULT_GOOGLE_CLIENT_ID;
  const gdriveId = localStorage.getItem(STORAGE_KEYS.CLIENT_ID);
  if (gdriveId && gdriveId.trim() && !OBSOLETE_CLIENT_IDS.includes(gdriveId.trim())) {
    return gdriveId.trim();
  }
  const authServiceId = localStorage.getItem('syllabus3d_google_client_id');
  if (authServiceId && authServiceId.trim() && !OBSOLETE_CLIENT_IDS.includes(authServiceId.trim())) {
    return authServiceId.trim();
  }
  const envId = (import.meta as any).env?.VITE_GOOGLE_CLIENT_ID || '';
  if (envId && envId.trim() && !OBSOLETE_CLIENT_IDS.includes(envId.trim())) {
    return envId.trim();
  }
  return DEFAULT_GOOGLE_CLIENT_ID;
}

/**
 * Sets custom Google OAuth Client ID and keeps all services in sync
 */
export function setGoogleClientId(clientId: string): void {
  if (typeof window === 'undefined') return;
  const cleanId = clientId.trim();
  if (cleanId) {
    localStorage.setItem(STORAGE_KEYS.CLIENT_ID, cleanId);
    localStorage.setItem('syllabus3d_google_client_id', cleanId);
  } else {
    localStorage.removeItem(STORAGE_KEYS.CLIENT_ID);
    localStorage.removeItem('syllabus3d_google_client_id');
  }
}

/**
 * Checks if Local Cloud Vault mode is currently active
 */
export function isLocalVaultMode(): boolean {
  if (typeof window === 'undefined') return false;
  const token = sessionStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN) || localStorage.getItem('syllabus3d_gdrive_access_token');
  const isLocalFlag = localStorage.getItem(STORAGE_KEYS.LOCAL_MODE) === 'true';
  return isLocalFlag || Boolean(token && (token.startsWith('local_vault_') || token.startsWith('simulated_')));
}

/**
 * Dynamically loads Google Identity Services script if not already present
 */
export function loadGoogleIdentityServices(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      return reject(new Error('Window is not defined'));
    }

    if ((window as any).google?.accounts?.oauth2) {
      return resolve();
    }

    const existingScript = document.querySelector(`script[src="${GIS_SCRIPT_URL}"]`);
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve());
      existingScript.addEventListener('error', () => reject(new Error('Failed to load Google Identity Services')));
      return;
    }

    const script = document.createElement('script');
    script.src = GIS_SCRIPT_URL;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Google Identity Services SDK'));
    document.head.appendChild(script);
  });
}

/**
 * Checks if a valid cached Google Drive or Local Vault access token exists
 */
export function getValidAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  const token = sessionStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN) || localStorage.getItem('syllabus3d_gdrive_access_token');
  if (!token) return null;

  // Local/simulated vault token is always valid
  if (token.startsWith('local_vault_') || token.startsWith('simulated_')) {
    return token;
  }

  const expiresAt = Number(
    sessionStorage.getItem(STORAGE_KEYS.TOKEN_EXPIRES_AT) ||
    localStorage.getItem('syllabus3d_gdrive_token_expires_at') ||
    0
  );

  // Return token if valid with at least 60 seconds remaining
  if (expiresAt > 0 && Date.now() < expiresAt - 60000) {
    return token;
  }

  // If no expiresAt timestamp was stored, token is assumed valid for current session
  return expiresAt === 0 ? token : null;
}

/**
 * Stores Google token with expiry
 */
export function storeAccessToken(token: string, expiresInSeconds: number): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
  sessionStorage.setItem(STORAGE_KEYS.TOKEN_EXPIRES_AT, String(Date.now() + expiresInSeconds * 1000));
}

/**
 * Gets cached Google user info
 */
export function getCachedGoogleUser(): GoogleDriveUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_INFO);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Connects Instant Local Cloud Vault mode without requiring Google Cloud Console credentials
 */
export function connectLocalGoogleDrive(email = 'itosunnyrise@gmail.com', name = 'Sunny Rise (Cloud Vault)'): GoogleDriveUser {
  const user: GoogleDriveUser = {
    email,
    name,
    picture: undefined
  };
  const token = 'local_vault_token_' + Date.now();
  storeAccessToken(token, 86400 * 365);
  localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(user));
  localStorage.setItem(STORAGE_KEYS.LOCAL_MODE, 'true');
  return user;
}

/**
 * Requests a Google Drive OAuth access token via Google Identity Services popup
 */
export async function requestGoogleDriveToken(customClientId?: string): Promise<string> {
  const clientId = (customClientId || getGoogleClientId()).trim();

  // If no client ID configured or it's the dead placeholder, reject immediately to avoid Google 401 popup
  if (!clientId || OBSOLETE_CLIENT_IDS.includes(clientId)) {
    throw new Error('GOOGLE_CLIENT_ID_REQUIRED');
  }

  await loadGoogleIdentityServices();

  const google = (window as any).google;
  if (!google?.accounts?.oauth2) {
    throw new Error('Google Identity Services not initialized. Check your internet connection.');
  }

  return new Promise((resolve, reject) => {
    try {
      const tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: DRIVE_SCOPE,
        callback: async (response: any) => {
          if (response.error) {
            reject(new Error(response.error_description || response.error));
            return;
          }

          if (response.access_token) {
            const expiresIn = response.expires_in ? Number(response.expires_in) : 3600;
            storeAccessToken(response.access_token, expiresIn);
            localStorage.removeItem(STORAGE_KEYS.LOCAL_MODE);

            // Fetch user profile info
            try {
              const userInfo = await fetchGoogleUserInfo(response.access_token);
              if (userInfo) {
                localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(userInfo));
              }
            } catch (err) {
              console.warn('Could not fetch Google user info:', err);
            }

            resolve(response.access_token);
          } else {
            reject(new Error('No access token received from Google'));
          }
        },
        error_callback: (err: any) => {
          const msg = err?.message || 'Google Authentication cancelled or failed';
          if (msg.includes('invalid_client') || msg.includes('401')) {
            reject(new Error('GOOGLE_INVALID_CLIENT: The OAuth client was not found or is misconfigured in Google Cloud Console.'));
          } else {
            reject(new Error(msg));
          }
        }
      });

      tokenClient.requestAccessToken({ prompt: '' });
    } catch (err: any) {
      reject(new Error(err.message || 'Failed to initialize Google token client'));
    }
  });
}

/**
 * Fetches basic Google user profile details using the access token
 */
export async function fetchGoogleUserInfo(accessToken: string): Promise<GoogleDriveUser | null> {
  try {
    const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (!res.ok) return null;
    const data = await res.json();
    return {
      email: data.email,
      name: data.name,
      picture: data.picture
    };
  } catch {
    return null;
  }
}

/**
 * Disconnects Google Drive / Local Vault and clears cached tokens
 */
export function disconnectGoogleDrive(): void {
  if (typeof window === 'undefined') return;
  const token = sessionStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN) || localStorage.getItem('syllabus3d_gdrive_access_token');
  if (token && !token.startsWith('local_vault_') && !token.startsWith('simulated_') && (window as any).google?.accounts?.oauth2?.revoke) {
    try {
      (window as any).google.accounts.oauth2.revoke(token, () => {});
    } catch {}
  }
  sessionStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  sessionStorage.removeItem(STORAGE_KEYS.TOKEN_EXPIRES_AT);
  localStorage.removeItem(STORAGE_KEYS.USER_INFO);
  localStorage.removeItem(STORAGE_KEYS.LOCAL_MODE);
  localStorage.removeItem('syllabus3d_gdrive_access_token');
  localStorage.removeItem('syllabus3d_gdrive_token_expires_at');
}

// ═══════════════════════════════════════════════════════════════
// LOCAL CLOUD VAULT STORAGE (IndexedDB backing for offline/no-GCP)
// ═══════════════════════════════════════════════════════════════

const LOCAL_VAULT_DB_NAME = 'syllabus3d_local_drive_vault';
const LOCAL_VAULT_STORE = 'vault_files';

interface StoredLocalVaultFile {
  id: string;
  name: string;
  mimeType: string;
  size: string;
  createdTime: string;
  parentFolderId: string;
  blob: Blob;
}

function openLocalVaultDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return reject(new Error('IndexedDB is not supported in this browser'));
    }
    const req = indexedDB.open(LOCAL_VAULT_DB_NAME, 1);
    req.onupgradeneeded = (e: any) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(LOCAL_VAULT_STORE)) {
        db.createObjectStore(LOCAL_VAULT_STORE, { keyPath: 'id' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error || new Error('Failed to open Local Vault storage'));
  });
}

async function saveLocalVaultFile(record: StoredLocalVaultFile): Promise<void> {
  const db = await openLocalVaultDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(LOCAL_VAULT_STORE, 'readwrite');
    const store = tx.objectStore(LOCAL_VAULT_STORE);
    const req = store.put(record);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

async function getLocalVaultFilesByFolder(folderId: string): Promise<GoogleDriveFile[]> {
  try {
    const db = await openLocalVaultDB();
    return new Promise((resolve) => {
      const tx = db.transaction(LOCAL_VAULT_STORE, 'readonly');
      const store = tx.objectStore(LOCAL_VAULT_STORE);
      const req = store.getAll();
      req.onsuccess = () => {
        const all: StoredLocalVaultFile[] = req.result || [];
        const filtered = all
          .filter(f => f.parentFolderId === folderId)
          .sort((a, b) => new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime())
          .map(f => ({
            id: f.id,
            name: f.name,
            mimeType: f.mimeType,
            size: f.size,
            createdTime: f.createdTime,
            webViewLink: undefined
          }));
        resolve(filtered);
      };
      req.onerror = () => resolve([]);
    });
  } catch {
    return [];
  }
}

async function getLocalVaultFileById(fileId: string): Promise<StoredLocalVaultFile | null> {
  const db = await openLocalVaultDB();
  return new Promise((resolve) => {
    const tx = db.transaction(LOCAL_VAULT_STORE, 'readonly');
    const store = tx.objectStore(LOCAL_VAULT_STORE);
    const req = store.get(fileId);
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => resolve(null);
  });
}

// ═══════════════════════════════════════════════════════════════
// DRIVE & VAULT OPERATIONS (Universal for Google Drive & Local Vault)
// ═══════════════════════════════════════════════════════════════

/**
 * Finds or creates a folder on Google Drive or Local Vault
 */
export async function findOrCreateFolder(
  folderName: string,
  parentFolderId?: string,
  token?: string
): Promise<string> {
  if (isLocalVaultMode()) {
    return `local_folder_${folderName.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
  }

  const accessToken = token || getValidAccessToken();
  if (!accessToken) throw new Error('Not connected to Google Drive. Please authorize first.');

  const parentQuery = parentFolderId
    ? `'${parentFolderId}' in parents`
    : `'root' in parents`;

  const query = `mimeType = 'application/vnd.google-apps.folder' and trashed = false and name = '${folderName.replace(/'/g, "\\'")}' and ${parentQuery}`;

  // Search existing
  const searchUrl = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id,name)`;
  const searchRes = await fetch(searchUrl, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (!searchRes.ok) {
    const errData = await searchRes.json().catch(() => ({}));
    throw new Error(errData.error?.message || `Failed to search Google Drive folders (${searchRes.status})`);
  }

  const searchData = await searchRes.json();
  if (searchData.files && searchData.files.length > 0) {
    return searchData.files[0].id;
  }

  // Create folder if not found
  const createRes = await fetch('https://www.googleapis.com/drive/v3/files', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: parentFolderId ? [parentFolderId] : []
    })
  });

  if (!createRes.ok) {
    const errData = await createRes.json().catch(() => ({}));
    throw new Error(errData.error?.message || `Failed to create folder on Google Drive (${createRes.status})`);
  }

  const createdFolder = await createRes.json();
  return createdFolder.id;
}

/**
 * Ensures the standard 3-tier folder hierarchy exists in Google Drive or Local Vault:
 * Syllabus 3D Cloud Backups/
 *   ├── Database/
 *   ├── PDFs/
 *   └── Photos & Diagrams/
 */
export async function ensureFolderHierarchy(token?: string): Promise<GoogleDriveFolderHierarchy> {
  if (isLocalVaultMode()) {
    return {
      rootFolderId: 'local_folder_root',
      databaseFolderId: 'local_folder_database',
      pdfsFolderId: 'local_folder_pdfs',
      photosFolderId: 'local_folder_photos'
    };
  }

  const accessToken = token || getValidAccessToken();
  if (!accessToken) throw new Error('Not connected to Google Drive');

  // 1. Root folder
  const rootFolderId = await findOrCreateFolder('Syllabus 3D Cloud Backups', undefined, accessToken);

  // 2. Subfolders
  const [databaseFolderId, pdfsFolderId, photosFolderId] = await Promise.all([
    findOrCreateFolder('Database', rootFolderId, accessToken),
    findOrCreateFolder('PDFs', rootFolderId, accessToken),
    findOrCreateFolder('Photos & Diagrams', rootFolderId, accessToken)
  ]);

  return {
    rootFolderId,
    databaseFolderId,
    pdfsFolderId,
    photosFolderId
  };
}

/**
 * Uploads a file to Google Drive or Local Vault
 */
export async function uploadFileToDrive(options: {
  fileBlob: Blob;
  fileName: string;
  mimeType: string;
  parentFolderId: string;
  token?: string;
}): Promise<GoogleDriveFile> {
  // If in Local Vault Mode, persist to local indexed vault
  if (isLocalVaultMode()) {
    const fileId = 'local_file_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
    const now = new Date().toISOString();
    await saveLocalVaultFile({
      id: fileId,
      name: options.fileName,
      mimeType: options.mimeType,
      size: String(options.fileBlob.size),
      createdTime: now,
      parentFolderId: options.parentFolderId,
      blob: options.fileBlob
    });
    return {
      id: fileId,
      name: options.fileName,
      mimeType: options.mimeType,
      size: String(options.fileBlob.size),
      createdTime: now,
      webViewLink: undefined
    };
  }

  const accessToken = options.token || getValidAccessToken();
  if (!accessToken) throw new Error('Not connected to Google Drive');

  const boundary = '-------314159265358979323846';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const metadata = {
    name: options.fileName,
    mimeType: options.mimeType,
    parents: [options.parentFolderId]
  };

  const multipartRequestBody = new Blob([
    delimiter,
    'Content-Type: application/json; charset=UTF-8\r\n\r\n',
    JSON.stringify(metadata),
    delimiter,
    `Content-Type: ${options.mimeType}\r\n\r\n`,
    options.fileBlob,
    closeDelimiter
  ], { type: `multipart/related; boundary=${boundary}` });

  const uploadUrl = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,size,createdTime,webViewLink';

  const res = await fetch(uploadUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': `multipart/related; boundary=${boundary}`
    },
    body: multipartRequestBody
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error?.message || `Failed to upload file to Google Drive (${res.status})`);
  }

  return await res.json();
}

/**
 * Lists files from a specific folder on Google Drive or Local Vault
 */
export async function listFilesFromDriveFolder(folderId: string, token?: string): Promise<GoogleDriveFile[]> {
  if (isLocalVaultMode()) {
    return await getLocalVaultFilesByFolder(folderId);
  }

  const accessToken = token || getValidAccessToken();
  if (!accessToken) throw new Error('Not connected to Google Drive');

  const query = `'${folderId}' in parents and trashed = false`;
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id,name,mimeType,size,createdTime,webViewLink)&orderBy=createdTime desc&pageSize=100`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (!searchCheckOk(res)) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error?.message || `Failed to list files from Google Drive (${res.status})`);
  }

  const data = await res.json();
  return data.files || [];
}

function searchCheckOk(res: Response): boolean {
  return res.ok;
}

/**
 * Downloads a file binary Blob from Google Drive or Local Vault by file ID
 */
export async function downloadFileBlobFromDrive(fileId: string, token?: string): Promise<Blob> {
  if (isLocalVaultMode() || fileId.startsWith('local_file_')) {
    const file = await getLocalVaultFileById(fileId);
    if (!file || !file.blob) {
      throw new Error(`File with ID ${fileId} was not found in Local Cloud Vault`);
    }
    return file.blob;
  }

  const accessToken = token || getValidAccessToken();
  if (!accessToken) throw new Error('Not connected to Google Drive');

  const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (!res.ok) {
    throw new Error(`Failed to download file from Google Drive (${res.status})`);
  }

  return await res.blob();
}

/**
 * Downloads and parses a JSON file from Google Drive or Local Vault
 */
export async function downloadJsonFromDrive<T = any>(fileId: string, token?: string): Promise<T> {
  const blob = await downloadFileBlobFromDrive(fileId, token);
  const text = await blob.text();
  return JSON.parse(text) as T;
}
