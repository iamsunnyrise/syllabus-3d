/**
 * YouTube Notes Storage Layer
 * 
 * IndexedDB persistence for saved YouTube notes.
 * Uses the existing appDB pattern from db.ts.
 * 
 * Notes are stored per-profile to maintain multi-profile isolation.
 */

import { NoteLanguage, NoteType, DetailLevel } from './youtubeNotesGenerator';

// ─── Types ──────────────────────────────────────────────────────

export interface SavedYouTubeNote {
  id: string;
  videoId: string;
  youtubeUrl: string;
  videoTitle: string;
  thumbnailUrl: string;
  channelName: string;
  language: NoteLanguage;
  noteType: NoteType;
  detailLevel: DetailLevel;
  notesContent: string;
  generatedAt: string;   // ISO timestamp
  updatedAt: string;     // ISO timestamp
  customTitle?: string;   // User-renamed title
  isFavorite?: boolean;
}

// ─── Storage Key ────────────────────────────────────────────────

const STORAGE_PREFIX = 'youtube_notes';

function getStorageKey(profileId?: string): string {
  const pid = profileId || getActiveProfileId();
  return `${STORAGE_PREFIX}_${pid}`;
}

function getActiveProfileId(): string {
  try {
    const profileData = localStorage.getItem('syllabus3d_active_profile_id');
    return profileData || 'default';
  } catch {
    return 'default';
  }
}

// ─── IndexedDB Operations ───────────────────────────────────────

/**
 * Open the youtube_notes IndexedDB store
 */
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('syllabus3d_app_db', 2);
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const storeNames = ['app_state', 'exams', 'planner_tasks', 'reflections', 'mistakes', 'youtube_notes'];
      for (const name of storeNames) {
        if (!db.objectStoreNames.contains(name)) {
          db.createObjectStore(name);
        }
      }
    };
    
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function dbGet<T>(key: string): Promise<T | undefined> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('youtube_notes', 'readonly');
      const store = tx.objectStore('youtube_notes');
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result as T | undefined);
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('[YouTubeNotesStorage] dbGet error:', err);
    return undefined;
  }
}

async function dbSet<T>(key: string, value: T): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('youtube_notes', 'readwrite');
      const store = tx.objectStore('youtube_notes');
      const request = store.put(value, key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('[YouTubeNotesStorage] dbSet error:', err);
    // Fallback to localStorage
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage quota exceeded — silently fail
    }
  }
}

// ─── CRUD Operations ────────────────────────────────────────────

/**
 * Get all saved notes for the active profile
 */
export async function getAllNotes(profileId?: string): Promise<SavedYouTubeNote[]> {
  const key = getStorageKey(profileId);
  
  // Try IndexedDB first
  const notes = await dbGet<SavedYouTubeNote[]>(key);
  if (notes && Array.isArray(notes)) return notes;
  
  // Fallback to localStorage
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as SavedYouTubeNote[];
  } catch {
    // Corrupt data
  }
  
  return [];
}

/**
 * Save a new note
 */
export async function saveNote(note: SavedYouTubeNote, profileId?: string): Promise<void> {
  const notes = await getAllNotes(profileId);
  
  // Check for existing note with same ID
  const existingIndex = notes.findIndex(n => n.id === note.id);
  if (existingIndex >= 0) {
    notes[existingIndex] = { ...note, updatedAt: new Date().toISOString() };
  } else {
    notes.unshift(note); // Add to beginning (newest first)
  }
  
  const key = getStorageKey(profileId);
  await dbSet(key, notes);
}

/**
 * Get a single note by ID
 */
export async function getNote(noteId: string, profileId?: string): Promise<SavedYouTubeNote | undefined> {
  const notes = await getAllNotes(profileId);
  return notes.find(n => n.id === noteId);
}

/**
 * Update a note's content
 */
export async function updateNoteContent(
  noteId: string,
  newContent: string,
  profileId?: string
): Promise<void> {
  const notes = await getAllNotes(profileId);
  const note = notes.find(n => n.id === noteId);
  if (note) {
    note.notesContent = newContent;
    note.updatedAt = new Date().toISOString();
    const key = getStorageKey(profileId);
    await dbSet(key, notes);
  }
}

/**
 * Rename a note
 */
export async function renameNote(
  noteId: string,
  newTitle: string,
  profileId?: string
): Promise<void> {
  const notes = await getAllNotes(profileId);
  const note = notes.find(n => n.id === noteId);
  if (note) {
    note.customTitle = newTitle;
    note.updatedAt = new Date().toISOString();
    const key = getStorageKey(profileId);
    await dbSet(key, notes);
  }
}

/**
 * Delete a note
 */
export async function deleteNote(noteId: string, profileId?: string): Promise<void> {
  const notes = await getAllNotes(profileId);
  const filtered = notes.filter(n => n.id !== noteId);
  const key = getStorageKey(profileId);
  await dbSet(key, filtered);
}

/**
 * Duplicate a note
 */
export async function duplicateNote(noteId: string, profileId?: string): Promise<SavedYouTubeNote | null> {
  const notes = await getAllNotes(profileId);
  const original = notes.find(n => n.id === noteId);
  if (!original) return null;

  const duplicate: SavedYouTubeNote = {
    ...original,
    id: generateNoteId(),
    customTitle: `${original.customTitle || original.videoTitle} (Copy)`,
    generatedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  notes.unshift(duplicate);
  const key = getStorageKey(profileId);
  await dbSet(key, notes);
  return duplicate;
}

/**
 * Toggle favorite status
 */
export async function toggleFavorite(noteId: string, profileId?: string): Promise<void> {
  const notes = await getAllNotes(profileId);
  const note = notes.find(n => n.id === noteId);
  if (note) {
    note.isFavorite = !note.isFavorite;
    note.updatedAt = new Date().toISOString();
    const key = getStorageKey(profileId);
    await dbSet(key, notes);
  }
}

// ─── Utilities ──────────────────────────────────────────────────

/**
 * Generate a unique note ID
 */
export function generateNoteId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `ytn_${timestamp}_${random}`;
}

/**
 * Get formatted date string for display
 */
export function formatNoteDate(isoDate: string): string {
  try {
    const date = new Date(isoDate);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
  } catch {
    return '';
  }
}

/**
 * Get note type display label
 */
export function getNoteTypeLabel(type: NoteType): string {
  const labels: Record<NoteType, string> = {
    quick: 'Quick Notes',
    standard: 'Standard Notes',
    detailed: 'Detailed Notes',
    exam: 'Exam Notes',
  };
  return labels[type] || 'Notes';
}

/**
 * Get language display label
 */
export function getLanguageLabel(lang: NoteLanguage): string {
  return lang === 'hindi' ? 'हिन्दी' : 'English';
}
