// Utilities to persist and retrieve student's reading progress per PDF document

const STORAGE_PREFIX = 'syllabus3d_pdf_progress_';

export interface PdfReadingProgress {
  pageNum: number;
  totalPages?: number;
  updatedAt: number;
}

/**
 * Save reading progress for a given PDF document
 */
export const savePdfReadingProgress = (
  docId: string,
  pageNum: number,
  totalPages?: number
): void => {
  if (!docId || typeof window === 'undefined') return;
  if (!pageNum || pageNum < 1 || isNaN(pageNum)) return;

  try {
    const validTotal = totalPages && totalPages > 0 && !isNaN(totalPages) ? Math.floor(totalPages) : undefined;
    const clampedPage = validTotal ? Math.min(Math.floor(pageNum), validTotal) : Math.floor(pageNum);

    const data: PdfReadingProgress = {
      pageNum: clampedPage,
      totalPages: validTotal,
      updatedAt: Date.now()
    };
    localStorage.setItem(`${STORAGE_PREFIX}${docId}`, JSON.stringify(data));
  } catch (err) {
    console.warn('Failed to save PDF reading progress to localStorage:', err);
  }
};

/**
 * Retrieve saved reading progress for a given PDF document
 */
export const getPdfReadingProgress = (docId?: string | null): PdfReadingProgress | null => {
  if (!docId || typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${docId}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.pageNum === 'number' && parsed.pageNum >= 1 && !isNaN(parsed.pageNum)) {
      return {
        pageNum: Math.floor(parsed.pageNum),
        totalPages: parsed.totalPages ? Math.floor(parsed.totalPages) : undefined,
        updatedAt: parsed.updatedAt || 0
      };
    }
    return null;
  } catch {
    return null;
  }
};

/**
 * Clear reading progress for a given PDF document
 */
export const clearPdfReadingProgress = (docId: string): void => {
  if (!docId || typeof window === 'undefined') return;
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}${docId}`);
  } catch {}
};
