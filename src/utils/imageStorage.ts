/**
 * IndexedDB storage utility for Topic Picture Notes & Diagrams.
 * Preserves 100% original image quality, original file size, and full resolution.
 * Allows storing multi-megabyte raw photos safely in IndexedDB without overflowing localStorage.
 */

const DB_NAME = 'syllabus3d_image_store';
const STORE_NAME = 'topic_images';
const DB_VERSION = 1;

export interface StoredImageRecord {
  id: string;
  blob: Blob;
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
}

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB is not supported in this browser.'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error || new Error('Failed to open IndexedDB'));
    };
  });
}

/**
 * Saves an original uncompressed Image File or Blob to IndexedDB
 */
export async function saveImageToStorage(id: string, file: File | Blob, name: string): Promise<string> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    const record: StoredImageRecord = {
      id,
      blob: file,
      name,
      type: file.type || 'image/jpeg',
      size: file.size,
      uploadedAt: new Date().toISOString()
    };

    const req = store.put(record);

    req.onsuccess = () => {
      resolve(id);
    };

    req.onerror = () => {
      reject(req.error || new Error('Failed to save image to storage'));
    };
  });
}

/**
 * Retrieves an Image Blob URL from IndexedDB
 */
export async function getImageBlobUrl(id: string): Promise<string | null> {
  try {
    const db = await openDatabase();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(id);

      req.onsuccess = () => {
        const record = req.result as StoredImageRecord | undefined;
        if (record && record.blob) {
          const blobUrl = URL.createObjectURL(record.blob);
          resolve(blobUrl);
        } else {
          resolve(null);
        }
      };

      req.onerror = () => {
        resolve(null);
      };
    });
  } catch {
    return null;
  }
}

/**
 * Retrieves the raw original Image Blob from IndexedDB
 */
export async function getImageBlob(id: string): Promise<Blob | null> {
  try {
    const db = await openDatabase();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(id);

      req.onsuccess = () => {
        const record = req.result as StoredImageRecord | undefined;
        resolve(record ? record.blob : null);
      };

      req.onerror = () => {
        resolve(null);
      };
    });
  } catch {
    return null;
  }
}

/**
 * Deletes an Image from IndexedDB
 */
export async function deleteImageFromStorage(id: string): Promise<boolean> {
  try {
    const db = await openDatabase();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(id);

      req.onsuccess = () => {
        resolve(true);
      };

      req.onerror = () => {
        resolve(false);
      };
    });
  } catch {
    return false;
  }
}

/**
 * Retrieves all stored image records (useful for cloud backup & sync)
 */
export async function getAllStoredImageRecords(): Promise<StoredImageRecord[]> {
  try {
    const db = await openDatabase();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();

      req.onsuccess = () => {
        resolve((req.result as StoredImageRecord[]) || []);
      };

      req.onerror = () => {
        resolve([]);
      };
    });
  } catch {
    return [];
  }
}
