// PDF Color Themes for Glare-Free Night Reading & Eye Care

export type PdfColorTheme = 'light' | 'dark' | 'oled' | 'sepia';

export interface PdfThemeConfig {
  id: PdfColorTheme;
  name: string;
  shortLabel: string;
  badge: string;
  description: string;
  canvasFilter: string;
  pageBgColor: string;
  pageBorderColor: string;
  blendMode: 'multiply' | 'screen';
  highlightOpacity: number;
}

export const PDF_THEMES: Record<PdfColorTheme, PdfThemeConfig> = {
  light: {
    id: 'light',
    name: 'Day Mode (Original)',
    shortLabel: 'Day',
    badge: '☀️',
    description: 'Original high-brightness document',
    canvasFilter: 'none',
    pageBgColor: '#FFFFFF',
    pageBorderColor: 'rgba(41, 46, 66, 0.6)',
    blendMode: 'multiply',
    highlightOpacity: 0.38
  },
  dark: {
    id: 'dark',
    name: 'Night Mode (Soft Dark)',
    shortLabel: 'Night',
    badge: '🌙',
    description: 'Charcoal dark background, eye-soothing text',
    // Invert lightness, preserve hues (green stays green, red stays red, blue stays blue), soften glare
    canvasFilter: 'invert(0.90) hue-rotate(180deg) brightness(0.95) contrast(1.12)',
    pageBgColor: '#18181D',
    pageBorderColor: 'rgba(255, 255, 255, 0.10)',
    blendMode: 'screen',
    highlightOpacity: 0.50
  },
  oled: {
    id: 'oled',
    name: 'OLED Pure Black',
    shortLabel: 'OLED',
    badge: '🌌',
    description: '100% pure black for pitch-dark study & AMOLED screens',
    canvasFilter: 'invert(1) hue-rotate(180deg) contrast(1.22) brightness(0.90)',
    pageBgColor: '#000000',
    pageBorderColor: 'rgba(255, 255, 255, 0.14)',
    blendMode: 'screen',
    highlightOpacity: 0.55
  },
  sepia: {
    id: 'sepia',
    name: 'Warm Sepia (Book Style)',
    shortLabel: 'Sepia',
    badge: '📜',
    description: 'Kindle-like paper tone, filters harsh blue light',
    canvasFilter: 'sepia(0.42) brightness(0.95) contrast(0.96)',
    pageBgColor: '#F6EEDA',
    pageBorderColor: 'rgba(180, 150, 120, 0.4)',
    blendMode: 'multiply',
    highlightOpacity: 0.40
  }
};

const STORAGE_KEY = 'syllabus_pdf_color_theme';

export function loadPdfColorTheme(): PdfColorTheme {
  if (typeof window === 'undefined') return 'light';
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as PdfColorTheme;
    if (saved && PDF_THEMES[saved]) {
      return saved;
    }
  } catch (err) {
    console.warn('Failed to load PDF color theme:', err);
  }
  return 'light';
}

export function savePdfColorTheme(theme: PdfColorTheme): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch (err) {
    console.warn('Failed to save PDF color theme:', err);
  }
}
