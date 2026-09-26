import React, { useState, useMemo } from 'react';
import {
  Search,
  Plus,
  ExternalLink,
  Bookmark,
  Sparkles,
  GraduationCap,
  FileCheck2,
  BookOpen,
  Globe,
  Copy,
  Check,
  Trash2,
  Edit2,
  KeyRound,
  ArrowUpRight,
  PenTool,
  Filter,
  X
} from 'lucide-react';
import { ExternalPlatform, PlatformCategory } from '../../types/syllabus';
import { useSyllabus } from '../../context/SyllabusContext';
import { AddPlatformModal } from '../modals/AddPlatformModal';
import { SectionBadgeIcon } from '../common/SectionBadgeIcon';
import { soundManager } from '../../utils/soundEffects';

export const stripEmojis = (str: string): string => {
  if (!str) return '';
  return str
    .replace(/[\p{Extended_Pictographic}\p{Emoji_Presentation}\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}✨⭐📚📝🔍🔥🎓🏛️📖📊▶️🏆💻🔬📐🧠🌐🚀✈️]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
};

export interface BrandTheme {
  name: string;
  brandColor: string;
  bannerGradient: string;
  buttonBg?: string;
  buttonStyle?: React.CSSProperties;
  buttonTextColor: string;
  buttonShadow: string;
  renderIcon: (className?: string) => React.ReactNode;
}

export function adjustHexColor(hex: string, amount: number): string {
  try {
    let cleanHex = hex.replace('#', '');
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split('').map(c => c + c).join('');
    }
    const num = parseInt(cleanHex, 16);
    let r = (num >> 16) + amount;
    let g = ((num >> 8) & 0x00ff) + amount;
    let b = (num & 0x0000ff) + amount;
    r = Math.min(255, Math.max(0, r));
    g = Math.min(255, Math.max(0, g));
    b = Math.min(255, Math.max(0, b));
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  } catch {
    return hex;
  }
}

export interface InfographicTheme {
  gradient: string;
  color: string;
  lightBg: string;
}

export const INFOGRAPHIC_STEP_THEMES: InfographicTheme[] = [
  {
    gradient: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 55%, #D97706 100%)',
    color: '#D97706',
    lightBg: '#FEF3C7'
  },
  {
    gradient: 'linear-gradient(135deg, #FB923C 0%, #F97316 55%, #EA580C 100%)',
    color: '#EA580C',
    lightBg: '#FFEDD5'
  },
  {
    gradient: 'linear-gradient(135deg, #F472B6 0%, #EC4899 55%, #DB2777 100%)',
    color: '#DB2777',
    lightBg: '#FCE7F3'
  },
  {
    gradient: 'linear-gradient(135deg, #A3E635 0%, #84CC16 55%, #65A30D 100%)',
    color: '#65A30D',
    lightBg: '#ECFCCB'
  },
  {
    gradient: 'linear-gradient(135deg, #2DD4BF 0%, #14B8A6 55%, #0D9488 100%)',
    color: '#0D9488',
    lightBg: '#CCFBF1'
  }
];

export const getBrandTheme = (
  rawUrl: string,
  rawName: string,
  fallbackColor?: string,
  customIcon?: string
): BrandTheme => {
  const url = (rawUrl || '').toLowerCase();
  const name = (rawName || '').toLowerCase();

  // 1. Instagram
  if (url.includes('instagram.com') || name.includes('instagram') || name.includes('insta')) {
    return {
      name: 'Instagram',
      brandColor: '#E1306C',
      bannerGradient: 'linear-gradient(135deg, #833AB4 0%, #C13584 35%, #E1306C 65%, #FD1D1D 85%, #F56040 100%)',
      buttonBg: 'bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#FD1D1D] hover:opacity-90',
      buttonTextColor: 'text-white',
      buttonShadow: 'shadow-[0_4px_16px_rgba(225,48,108,0.45)]',
      renderIcon: (cls) => (
        <svg viewBox="0 0 24 24" className={cls} fill="none">
          <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="currentColor" strokeWidth="2.2" />
          <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="2.2" />
          <circle cx="17.5" cy="6.5" r="1.3" fill="currentColor" />
        </svg>
      )
    };
  }

  // 2. Pinterest
  if (url.includes('pinterest.com') || url.includes('pin.it') || name.includes('pinterest')) {
    return {
      name: 'Pinterest',
      brandColor: '#E60023',
      bannerGradient: 'linear-gradient(135deg, #990014 0%, #BD081C 50%, #E60023 100%)',
      buttonBg: 'bg-[#E60023] hover:bg-[#B80018]',
      buttonTextColor: 'text-white',
      buttonShadow: 'shadow-[0_4px_16px_rgba(230,0,35,0.45)]',
      renderIcon: (cls) => (
        <svg viewBox="0 0 24 24" className={cls} fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
        </svg>
      )
    };
  }

  // 3. LinkedIn
  if (url.includes('linkedin.com') || name.includes('linkedin')) {
    return {
      name: 'LinkedIn',
      brandColor: '#0A66C2',
      bannerGradient: 'linear-gradient(135deg, #003668 0%, #004182 45%, #0A66C2 100%)',
      buttonBg: 'bg-[#0A66C2] hover:bg-[#004182]',
      buttonTextColor: 'text-white',
      buttonShadow: 'shadow-[0_4px_16px_rgba(10,102,194,0.45)]',
      renderIcon: (cls) => (
        <svg viewBox="0 0 24 24" className={cls} fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      )
    };
  }

  // 4. X / Twitter
  if (url.includes('x.com') || url.includes('twitter.com') || name === 'x' || name.includes('twitter')) {
    return {
      name: 'X (Twitter)',
      brandColor: '#0F1419',
      bannerGradient: 'linear-gradient(135deg, #000000 0%, #0F1419 55%, #1E293B 100%)',
      buttonBg: 'bg-[#0F1419] hover:bg-black dark:bg-white dark:hover:bg-slate-200',
      buttonTextColor: 'text-white dark:text-black',
      buttonShadow: 'shadow-[0_4px_16px_rgba(0,0,0,0.5)] dark:shadow-[0_4px_16px_rgba(255,255,255,0.25)]',
      renderIcon: (cls) => (
        <svg viewBox="0 0 24 24" className={cls} fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    };
  }

  // 5. Screener (screener.in)
  if (url.includes('screener.in') || name.includes('screener')) {
    return {
      name: 'Screener',
      brandColor: '#0284C7',
      bannerGradient: 'linear-gradient(135deg, #034E7B 0%, #0284C7 60%, #38BDF8 100%)',
      buttonBg: 'bg-[#0284C7] hover:bg-[#0369A1]',
      buttonTextColor: 'text-white',
      buttonShadow: 'shadow-[0_4px_16px_rgba(2,132,199,0.45)]',
      renderIcon: (cls) => (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
          <path d="M3 13l5-5 4 4 8-8" strokeWidth="2.5" />
          <polyline points="15 4 20 4 20 9" strokeWidth="2.5" />
        </svg>
      )
    };
  }

  // 6. Tradewise (Paper Trading / Stock Terminal)
  if (url.includes('tradewise') || name.includes('tradewise')) {
    return {
      name: 'Tradewise',
      brandColor: '#6366F1',
      bannerGradient: 'linear-gradient(135deg, #3730A3 0%, #6366F1 50%, #06B6D4 100%)',
      buttonBg: 'bg-[#6366F1] hover:bg-[#4F46E5]',
      buttonTextColor: 'text-white',
      buttonShadow: 'shadow-[0_4px_16px_rgba(99,102,241,0.45)]',
      renderIcon: (cls) => (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="6" y1="3" x2="6" y2="7" />
          <rect x="4.5" y="7" width="3" height="7" rx="0.5" fill="currentColor" fillOpacity="0.4" />
          <line x1="6" y1="14" x2="6" y2="19" />
          <line x1="12" y1="2" x2="12" y2="5" />
          <rect x="10.5" y="5" width="3" height="11" rx="0.5" fill="currentColor" />
          <line x1="12" y1="16" x2="12" y2="21" />
          <line x1="18" y1="5" x2="18" y2="9" />
          <rect x="16.5" y="9" width="3" height="6" rx="0.5" fill="currentColor" fillOpacity="0.4" />
          <line x1="18" y1="15" x2="18" y2="20" />
        </svg>
      )
    };
  }

  // 7. YouTube
  if (url.includes('youtube.com') || url.includes('youtu.be') || name.includes('youtube')) {
    return {
      name: 'YouTube',
      brandColor: '#FF0000',
      bannerGradient: 'linear-gradient(135deg, #8B0000 0%, #CC0000 50%, #FF0000 100%)',
      buttonBg: 'bg-[#FF0000] hover:bg-[#CC0000]',
      buttonTextColor: 'text-white',
      buttonShadow: 'shadow-[0_4px_16px_rgba(255,0,0,0.45)]',
      renderIcon: (cls) => (
        <svg viewBox="0 0 24 24" className={cls} fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    };
  }

  // 8. TradingView
  if (url.includes('tradingview.com') || name.includes('tradingview')) {
    return {
      name: 'TradingView',
      brandColor: '#2962FF',
      bannerGradient: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 50%, #2962FF 100%)',
      buttonBg: 'bg-[#2962FF] hover:bg-[#1D4ED8]',
      buttonTextColor: 'text-white',
      buttonShadow: 'shadow-[0_4px_16px_rgba(41,98,255,0.45)]',
      renderIcon: (cls) => (
        <svg viewBox="0 0 24 24" className={cls} fill="currentColor">
          <path d="M3 4h3v16H3zm6 5h3v11H9zm6-3h3v14h-3zm6 6h3v8h-3z" />
        </svg>
      )
    };
  }

  // 9. Telegram
  if (url.includes('t.me') || url.includes('telegram.org') || name.includes('telegram')) {
    return {
      name: 'Telegram',
      brandColor: '#229ED9',
      bannerGradient: 'linear-gradient(135deg, #006699 0%, #229ED9 60%, #5BC0EB 100%)',
      buttonBg: 'bg-[#229ED9] hover:bg-[#0088CC]',
      buttonTextColor: 'text-white',
      buttonShadow: 'shadow-[0_4px_16px_rgba(34,158,217,0.45)]',
      renderIcon: (cls) => (
        <svg viewBox="0 0 24 24" className={cls} fill="currentColor">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      )
    };
  }

  // 10. Physics Wallah
  if (url.includes('pw.live') || name.includes('physics wallah') || name.includes('physicswallah') || /\bpw\b/i.test(name)) {
    return {
      name: 'Physics Wallah',
      brandColor: '#5A4FCF',
      bannerGradient: 'linear-gradient(135deg, #312E81 0%, #5A4FCF 60%, #818CF8 100%)',
      buttonBg: 'bg-[#5A4FCF] hover:bg-[#4338CA]',
      buttonTextColor: 'text-white',
      buttonShadow: 'shadow-[0_4px_16px_rgba(90,79,207,0.45)]',
      renderIcon: (cls) => (
        <svg viewBox="0 0 24 24" className={cls} fill="currentColor">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      )
    };
  }

  // 11. Careerwill
  if (url.includes('careerwill.com') || name.includes('careerwill')) {
    return {
      name: 'Careerwill',
      brandColor: '#E11D48',
      bannerGradient: 'linear-gradient(135deg, #881337 0%, #E11D48 60%, #FB7185 100%)',
      buttonBg: 'bg-[#E11D48] hover:bg-[#BE123C]',
      buttonTextColor: 'text-white',
      buttonShadow: 'shadow-[0_4px_16px_rgba(225,29,72,0.45)]',
      renderIcon: (cls) => (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
        </svg>
      )
    };
  }

  // 12. Testbook
  if (url.includes('testbook.com') || name.includes('testbook')) {
    return {
      name: 'Testbook',
      brandColor: '#0284C7',
      bannerGradient: 'linear-gradient(135deg, #075985 0%, #0284C7 60%, #38BDF8 100%)',
      buttonBg: 'bg-[#0284C7] hover:bg-[#0369A1]',
      buttonTextColor: 'text-white',
      buttonShadow: 'shadow-[0_4px_16px_rgba(2,132,199,0.45)]',
      renderIcon: (cls) => (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="M9 15l2 2 4-4" strokeWidth="2.5" />
        </svg>
      )
    };
  }

  // 13. Oliveboard
  if (url.includes('oliveboard.in') || name.includes('oliveboard')) {
    return {
      name: 'Oliveboard',
      brandColor: '#16A34A',
      bannerGradient: 'linear-gradient(135deg, #14532D 0%, #16A34A 60%, #4ADE80 100%)',
      buttonBg: 'bg-[#16A34A] hover:bg-[#15803D]',
      buttonTextColor: 'text-white',
      buttonShadow: 'shadow-[0_4px_16px_rgba(22,163,74,0.45)]',
      renderIcon: (cls) => (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      )
    };
  }

  // 14. Unacademy
  if (url.includes('unacademy.com') || name.includes('unacademy')) {
    return {
      name: 'Unacademy',
      brandColor: '#08BD80',
      bannerGradient: 'linear-gradient(135deg, #047857 0%, #08BD80 60%, #34D399 100%)',
      buttonBg: 'bg-[#08BD80] hover:bg-[#059669]',
      buttonTextColor: 'text-white',
      buttonShadow: 'shadow-[0_4px_16px_rgba(8,189,128,0.45)]',
      renderIcon: (cls) => (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19V9a8 8 0 0 1 16 0v10" />
          <path d="M8 19v-6a4 4 0 0 1 8 0v6" />
          <line x1="2" y1="21" x2="22" y2="21" strokeWidth="2.5" />
        </svg>
      )
    };
  }

  // 15. GitHub
  if (url.includes('github.com') || name.includes('github')) {
    return {
      name: 'GitHub',
      brandColor: '#24292F',
      bannerGradient: 'linear-gradient(135deg, #0D1117 0%, #161B22 50%, #24292F 100%)',
      buttonBg: 'bg-[#24292F] hover:bg-black dark:bg-white dark:hover:bg-slate-200',
      buttonTextColor: 'text-white dark:text-black',
      buttonShadow: 'shadow-[0_4px_16px_rgba(36,41,47,0.45)]',
      renderIcon: (cls) => (
        <svg viewBox="0 0 24 24" className={cls} fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
      )
    };
  }

  // 16. Google / Drive
  if (url.includes('google.com') || name.includes('google') || name.includes('drive')) {
    return {
      name: 'Google',
      brandColor: '#4285F4',
      bannerGradient: 'linear-gradient(135deg, #1A73E8 0%, #4285F4 60%, #34A853 100%)',
      buttonBg: 'bg-[#4285F4] hover:bg-[#1A73E8]',
      buttonTextColor: 'text-white',
      buttonShadow: 'shadow-[0_4px_16px_rgba(66,133,244,0.45)]',
      renderIcon: (cls) => (
        <svg viewBox="0 0 24 24" className={cls} fill="currentColor">
          <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.08 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
        </svg>
      )
    };
  }

  // Fallback: Dynamic Brand Palette based on fallbackColor
  const baseColor = fallbackColor || '#6366F1';
  const darker = adjustHexColor(baseColor, -45);
  const brighter = adjustHexColor(baseColor, 35);

  const isCustomEmoji = customIcon && /[\p{Extended_Pictographic}\u{1F300}-\u{1FAFF}]/u.test(customIcon);

  return {
    name: rawName,
    brandColor: baseColor,
    bannerGradient: `linear-gradient(135deg, ${darker} 0%, ${baseColor} 55%, ${brighter} 100%)`,
    buttonStyle: {
      backgroundColor: baseColor,
      boxShadow: `0 4px 16px ${baseColor}66`
    },
    buttonTextColor: 'text-white',
    buttonShadow: '',
    renderIcon: (cls) => {
      if (isCustomEmoji) {
        return <span className="text-2xl sm:text-3xl select-none filter drop-shadow-sm">{customIcon}</span>;
      }
      return <Globe className={cls || 'w-7 h-7 stroke-[2]'} />;
    }
  };
};

export const PlatformsView: React.FC = () => {
  const { platforms, togglePinPlatform, deletePlatform } = useSyllabus();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPlatform, setEditingPlatform] = useState<ExternalPlatform | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Dynamic custom categories from existing platforms (Cleaned from emojis)
  const customCategoriesList = useMemo(() => {
    const list = new Set<string>();
    platforms.forEach(p => {
      if (p.customCategoryName && p.customCategoryName.trim()) {
        const clean = stripEmojis(p.customCategoryName.trim());
        if (clean) list.add(clean);
      }
    });
    return Array.from(list);
  }, [platforms]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: platforms.length,
      course: 0,
      test_series: 0,
      reference: 0,
      custom: 0,
      pinned: 0
    };

    platforms.forEach(p => {
      if (p.pinned) counts.pinned++;
      if (p.category === 'course') counts.course++;
      if (p.category === 'test_series') counts.test_series++;
      if (p.category === 'reference') counts.reference++;
      if (p.category === 'custom' || Boolean(p.customCategoryName)) counts.custom++;

      if (p.customCategoryName && p.customCategoryName.trim()) {
        const cat = stripEmojis(p.customCategoryName.trim());
        if (cat) {
          counts[cat] = (counts[cat] || 0) + 1;
        }
      }
    });

    return counts;
  }, [platforms]);

  // Filtered Platforms
  const filteredPlatforms = useMemo(() => {
    return platforms.filter(p => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.customCategoryName && p.customCategoryName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.url.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (selectedCategory === 'all') return true;
      if (selectedCategory === 'pinned') return p.pinned;
      if (selectedCategory === 'course') return p.category === 'course';
      if (selectedCategory === 'test_series') return p.category === 'test_series';
      if (selectedCategory === 'reference') return p.category === 'reference';
      if (selectedCategory === 'custom') return p.category === 'custom' || Boolean(p.customCategoryName);
      
      // Match by custom category name
      if (p.customCategoryName && stripEmojis(p.customCategoryName).toLowerCase() === selectedCategory.toLowerCase()) return true;

      return p.category === selectedCategory;
    });
  }, [platforms, searchQuery, selectedCategory]);

  // Statistics
  const coursesCount = categoryCounts.course;
  const testsCount = categoryCounts.test_series;
  const customCount = categoryCounts.custom;
  const pinnedCount = categoryCounts.pinned;

  const handleCopyHint = (e: React.MouseEvent, platformId: string, hint: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(hint);
    setCopiedId(platformId);
    soundManager.playClick();
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleOpenAdd = () => {
    setEditingPlatform(null);
    setIsAddModalOpen(true);
    soundManager.playClick();
  };

  const handleEdit = (e: React.MouseEvent, p: ExternalPlatform) => {
    e.stopPropagation();
    setEditingPlatform(p);
    setIsAddModalOpen(true);
    soundManager.playClick();
  };

  const handleDelete = (e: React.MouseEvent, p: ExternalPlatform) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to remove "${p.name}" from your Study Station?`)) {
      deletePlatform(p.id);
    }
  };

  const handleTogglePin = (e: React.MouseEvent, platformId: string) => {
    e.stopPropagation();
    togglePinPlatform(platformId);
  };

  const handleDirectLaunch = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    soundManager.playClick();
  };

  const formatCleanDomain = (url: string) => {
    try {
      const parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
      return parsed.hostname.replace(/^www\./, '');
    } catch (e) {
      return url.replace(/^https?:\/\//, '').split('/')[0];
    }
  };

  const formatReadableText = (text?: string): string => {
    if (!text) return '';
    // Normalize long all-caps text entered by users into readable sentence case (Issue 6)
    if (text.length > 10 && text === text.toUpperCase() && !/^\d+$/.test(text)) {
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }
    return text;
  };

  // Toggle KPI filter
  const handleKpiFilter = (catKey: string) => {
    soundManager.playClick();
    setSelectedCategory(prev => prev === catKey ? 'all' : catKey);
  };

  return (
    <div className="space-y-3.5 sm:space-y-4 animate-fade-in pb-8 sm:pb-12">
      
      {/* 1. HERO BENTO BANNER WITH 3D AMBIENT NODES (Compact & Unified - Issues 4, 10, 11) */}
      <div className="study-hub-hero-banner p-4 sm:p-5 md:p-6 rounded-2xl bg-[#080911] border border-white/[0.12] shadow-xl relative overflow-hidden text-white">
        
        {/* Full High-Fidelity 3D Portal Artwork (Right-aligned with natural depth, constrained height) */}
        <div className="absolute right-0 top-0 bottom-0 w-full sm:w-4/5 md:w-3/5 lg:w-[50%] pointer-events-none overflow-hidden flex items-center justify-end z-0">
          <img
            src="/study_hub_banner.png"
            alt="Connected Study Portals"
            className="h-[110%] sm:h-[120%] w-auto max-w-none object-contain object-right-bottom sm:object-right translate-y-1 sm:translate-y-0 opacity-30 sm:opacity-85 select-none"
            loading="eager"
            decoding="async"
            width={600}
            height={320}
          />
        </div>

        {/* Multi-layered Vignette & Legibility Protection Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080911] via-[#080911]/90 md:via-[#080911]/60 to-transparent pointer-events-none z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080911]/80 via-transparent to-transparent pointer-events-none z-0" />
        
        {/* Ambient Glow Accents */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-3.5 sm:gap-5">
          <div className="space-y-1.5 sm:space-y-2 max-w-xl">
            <div className="flex items-center gap-2 flex-wrap">
              {/* Removed uppercase (Issue 4) */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/15 text-cyan-200 border border-cyan-500/30 backdrop-blur-md shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                Connected Study Hub
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium text-slate-300 bg-white/[0.06] border border-white/10 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span><strong className="text-white font-bold tabular-nums">{platforms.length}</strong> Platforms Linked</span>
              </span>
            </div>

            {/* Page title aligned with Sidebar navigation (Issue 10) */}
            <div className="flex items-center gap-3">
              <SectionBadgeIcon section="platforms" size="md" />
              <h1 className="study-hub-banner-title text-xl sm:text-2xl md:text-3xl font-black text-white font-sans tracking-tight leading-tight">
                Study Station &amp; Hub
              </h1>
            </div>
            <p className="study-hub-banner-subtitle text-xs sm:text-[13px] text-slate-300 font-normal leading-relaxed">
              Course batches, mock test portals, and connected study resources.
            </p>
          </div>

          <div className="flex items-center shrink-0">
            {/* Standard Primary CTA button (Issue 3) */}
            <button
              onClick={handleOpenAdd}
              className="btn-primary py-2 px-3.5 sm:px-4 text-xs sm:text-[13px] rounded-xl font-bold shadow-md active:scale-95 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Add Platform / Batch</span>
            </button>
          </div>
        </div>

        {/* Interactive KPI Filter Tiles (Compact - Issue 11) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 mt-3 sm:mt-4 pt-3 sm:pt-3.5 border-t border-white/10 relative z-10">
          
          {/* Courses */}
          <div
            onClick={() => handleKpiFilter('course')}
            title="Filter by Courses"
            className={`study-hub-bento-tile p-2.5 sm:p-3 rounded-xl transition-all duration-200 flex items-center gap-2.5 cursor-pointer shadow-sm group active:scale-95 border ${
              selectedCategory === 'course'
                ? 'bg-purple-500/25 border-purple-400 ring-2 ring-purple-400/50 shadow-purple-500/20 shadow-lg'
                : 'bg-[#121320]/75 hover:bg-[#18192a]/90 border-purple-500/20 hover:border-purple-500/45'
            }`}
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform border border-purple-500/30">
              <GraduationCap className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <span className="study-hub-tile-count text-base sm:text-lg font-mono font-black tabular-nums text-white block leading-tight">
                {coursesCount}
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-purple-200/80 block truncate">
                Courses
              </span>
            </div>
          </div>

          {/* Mock Series */}
          <div
            onClick={() => handleKpiFilter('test_series')}
            title="Filter by Mock Series"
            className={`study-hub-bento-tile p-2.5 sm:p-3 rounded-xl transition-all duration-200 flex items-center gap-2.5 cursor-pointer shadow-sm group active:scale-95 border ${
              selectedCategory === 'test_series'
                ? 'bg-sky-500/25 border-sky-400 ring-2 ring-sky-400/50 shadow-sky-500/20 shadow-lg'
                : 'bg-[#121320]/75 hover:bg-[#18192a]/90 border-sky-500/20 hover:border-sky-500/45'
            }`}
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-sky-500/20 text-sky-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform border border-sky-500/30">
              <FileCheck2 className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <span className="study-hub-tile-count text-base sm:text-lg font-mono font-black tabular-nums text-white block leading-tight">
                {testsCount}
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-sky-200/80 block truncate">
                Mock Series
              </span>
            </div>
          </div>

          {/* Pinned Links */}
          <div
            onClick={() => handleKpiFilter('pinned')}
            title="Filter by Pinned Platforms"
            className={`study-hub-bento-tile p-2.5 sm:p-3 rounded-xl transition-all duration-200 flex items-center gap-2.5 cursor-pointer shadow-sm group active:scale-95 border ${
              selectedCategory === 'pinned'
                ? 'bg-amber-500/25 border-amber-400 ring-2 ring-amber-400/50 shadow-amber-500/20 shadow-lg'
                : 'bg-[#121320]/75 hover:bg-[#18192a]/90 border-amber-500/20 hover:border-amber-500/45'
            }`}
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform border border-amber-500/30">
              <Bookmark className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <span className="study-hub-tile-count text-base sm:text-lg font-mono font-black tabular-nums text-white block leading-tight">
                {pinnedCount}
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-amber-200/80 block truncate">
                Pinned
              </span>
            </div>
          </div>

          {/* Custom Portals */}
          <div
            onClick={() => handleKpiFilter('custom')}
            title="Filter by Custom Portals"
            className={`study-hub-bento-tile p-2.5 sm:p-3 rounded-xl transition-all duration-200 flex items-center gap-2.5 cursor-pointer shadow-sm group active:scale-95 border ${
              selectedCategory === 'custom'
                ? 'bg-emerald-500/25 border-emerald-400 ring-2 ring-emerald-400/50 shadow-emerald-500/20 shadow-lg'
                : 'bg-[#121320]/75 hover:bg-[#18192a]/90 border-emerald-500/20 hover:border-emerald-500/45'
            }`}
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform border border-emerald-500/30">
              <PenTool className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <span className="study-hub-tile-count text-base sm:text-lg font-mono font-black tabular-nums text-white block leading-tight">
                {customCount}
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-200/80 block truncate">
                Custom
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* 2. ADVANCED TOOLBAR: PROMINENT SEARCH & SEGMENTED CATEGORY TRACK (Issues 1, 2, 3, 9) */}
      <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-[#151622] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        
        {/* Row 1: Search Bar + Live Portals Count */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
          {/* Prominent Search Bar (Full Width / Never Hidden) */}
          <div className="relative flex-1 max-w-xl">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by platform name, subject, batch, or URL..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-50 dark:bg-[#1B1C28] border border-slate-200 dark:border-slate-700 text-xs sm:text-[13px] font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-500/15 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors cursor-pointer"
                title="Clear search"
                aria-label="Clear search query"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Metrics & Reset Filter */}
          <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
            <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-[#1B1C28] px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
              <strong className="text-slate-900 dark:text-white font-black tabular-nums">{filteredPlatforms.length}</strong>
              <span className="text-slate-400"> of {platforms.length} Portals</span>
            </span>

            {selectedCategory !== 'all' && (
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  soundManager.playClick();
                }}
                className="text-xs font-bold text-primary-600 dark:text-primary-400 hover:underline cursor-pointer px-2 py-1 active:scale-95 transition-transform"
              >
                Reset Filter
              </button>
            )}
          </div>
        </div>

        {/* Row 2: Category Filter Pills Track with Visible Scroll Cues (Issue 9) */}
        <div className="relative">
          <div
            className="flex items-center gap-1.5 overflow-x-auto pb-1.5 pt-0.5 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700"
            role="tablist"
            aria-label="Filter study portals by category"
          >
            {[
              { id: 'all', label: 'All Portals', count: categoryCounts.all },
              { id: 'course', label: 'Courses', count: categoryCounts.course },
              { id: 'test_series', label: 'Mock Tests', count: categoryCounts.test_series },
              { id: 'reference', label: 'Tools & Reference', count: categoryCounts.reference },
              ...customCategoriesList.map(cat => ({ 
                id: cat, 
                label: cat,
                count: categoryCounts[cat] || 0
              })),
              { id: 'pinned', label: 'Pinned', count: categoryCounts.pinned },
            ].map(tab => {
              const isSelected = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => {
                    setSelectedCategory(tab.id);
                    soundManager.playClick();
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer whitespace-nowrap active:scale-95 flex items-center gap-1.5 shrink-0 ${
                    isSelected
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                      : 'bg-slate-100 dark:bg-[#1B1C28] text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.count > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono tabular-nums font-black ${
                      isSelected
                        ? 'bg-white/30 text-white dark:bg-slate-900/30 dark:text-slate-900'
                        : 'bg-slate-200 dark:bg-slate-700/80 text-slate-700 dark:text-slate-200'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* 3. PLATFORM CARDS GRID (Issues 1, 2, 3, 5, 6, 7, 8, 12) */}
      {filteredPlatforms.length === 0 ? (
        <div className="p-8 sm:p-14 rounded-2xl bg-white dark:bg-[#151622] border border-slate-200 dark:border-slate-800 text-center space-y-4 shadow-sm">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20 flex items-center justify-center mx-auto shadow-xs">
            <Globe className="w-7 h-7 stroke-[1.8]" />
          </div>
          <div className="space-y-1">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-sans">
              {searchQuery.trim() || selectedCategory !== 'all' ? 'No study platforms found' : 'No Study Platforms Linked'}
            </h2>
            <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 max-w-sm mx-auto font-normal">
              {searchQuery.trim() || selectedCategory !== 'all'
                ? `No portals match "${searchQuery || selectedCategory}". Try resetting your filter.`
                : 'Link your coaching batches, mock test series, and study portals for 1-click launch.'}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-1 w-full sm:w-auto">
            {(searchQuery.trim() || selectedCategory !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  soundManager.playClick();
                }}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-primary-600 dark:text-primary-400 hover:bg-slate-200/70 dark:hover:bg-slate-700 cursor-pointer active:scale-95 transition-all"
              >
                Clear Search & Filter
              </button>
            )}
            <button
              onClick={handleOpenAdd}
              className="btn-primary w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold shadow-sm cursor-pointer inline-flex items-center justify-center gap-1.5 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add Platform / Batch</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {filteredPlatforms.map((platform, index) => {
            const hasLoginHint = Boolean(platform.loginHint);
            const isCopied = copiedId === platform.id;
            const cleanDomain = formatCleanDomain(platform.url);
            const theme = getBrandTheme(platform.url, platform.name, platform.color, platform.icon);

            const categoryBadgeLabel = stripEmojis(platform.customCategoryName || '') || (
              platform.category === 'course'
                ? 'Course Batch'
                : platform.category === 'test_series'
                ? 'Mock Series'
                : platform.category === 'reference'
                ? 'Reference Tool'
                : 'Study Portal'
            );

            // 5-Step Infographic styling matching the reference UI
            const stepNumber = String(index + 1).padStart(2, '0');
            const stepPalette = INFOGRAPHIC_STEP_THEMES[index % INFOGRAPHIC_STEP_THEMES.length];
            const isKnownBrand = Boolean(theme.brandColor && theme.brandColor !== '#2563EB');
            const accentColor = isKnownBrand ? theme.brandColor : stepPalette.color;
            const stepGradient = isKnownBrand ? theme.bannerGradient : stepPalette.gradient;

            return (
              <div
                key={platform.id}
                className="group relative rounded-2xl sm:rounded-3xl bg-slate-100/90 dark:bg-[#121422] p-1.5 sm:p-2 border border-slate-200/90 dark:border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.05),0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 select-none flex flex-col"
              >
                {/* Inner Elevated Card Plate */}
                <div className="relative w-full rounded-xl sm:rounded-2xl bg-white dark:bg-[#181A2A] border border-slate-200/70 dark:border-white/[0.07] shadow-xs flex flex-col sm:flex-row items-stretch overflow-hidden flex-1">
                  
                  {/* LEFT STEP INFOGRAPHIC BLOCK */}
                  <div
                    className="relative w-full sm:w-28 md:w-32 shrink-0 py-4 sm:py-6 px-3 flex items-center justify-center text-center overflow-hidden select-none"
                    style={{ background: stepGradient }}
                  >
                    {/* Top Gloss Highlight Edge (Signature Infographic Detail from Reference) */}
                    <div className="absolute top-0 left-0 right-0 h-1 sm:h-1.5 bg-white/40 pointer-events-none" />
                    <div className="absolute -top-10 -left-10 w-24 h-24 bg-white/20 rounded-full blur-xl pointer-events-none" />
                    
                    {/* Pure Centered Number (Without 'STEP') */}
                    <span className="text-3xl sm:text-5xl md:text-6xl font-black font-mono text-white tracking-tighter leading-none drop-shadow-md">
                      {stepNumber}
                    </span>
                  </div>

                  {/* RIGHT MAIN CONTENT AREA */}
                  <div className="flex-1 p-3.5 sm:p-4 md:p-5 flex flex-col justify-between min-w-0 space-y-2.5">
                    
                    {/* Header Row: Title | Icon + Controls */}
                    <div className="flex items-center justify-between gap-2 min-w-0">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <h2
                          className="text-base sm:text-lg font-black uppercase tracking-tight truncate font-sans text-slate-900 dark:text-white"
                          style={{ color: isKnownBrand && theme.name !== 'X (Twitter)' ? accentColor : undefined }}
                          title={platform.name}
                        >
                          {platform.name}
                        </h2>

                        <span className="text-slate-300 dark:text-slate-600 font-light select-none text-base sm:text-lg shrink-0">
                          |
                        </span>

                        <div
                          className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                          style={{ color: accentColor }}
                          title={platform.name}
                        >
                          {theme.renderIcon('w-4 h-4 sm:w-5 sm:h-5 drop-shadow-xs')}
                        </div>
                      </div>

                      {/* Quick Card Tool Controls: Pin, Edit, Delete */}
                      <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={(e) => handleTogglePin(e, platform.id)}
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer active:scale-90 border shadow-2xs ${
                            platform.pinned
                              ? 'bg-amber-400 text-slate-950 font-bold border-amber-500 shadow-xs'
                              : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                          }`}
                          title={platform.pinned ? 'Unpin portal' : 'Pin to top'}
                          aria-label={platform.pinned ? 'Unpin portal' : 'Pin portal to top'}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${platform.pinned ? 'fill-current' : ''}`} />
                        </button>

                        <button
                          type="button"
                          onClick={(e) => handleEdit(e, platform)}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-100 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-blue-950/40 text-slate-700 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 flex items-center justify-center transition-all cursor-pointer active:scale-90 shadow-2xs"
                          title="Edit portal"
                          aria-label={`Edit ${platform.name}`}
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={(e) => handleDelete(e, platform)}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-100 hover:bg-rose-50 dark:bg-slate-800 dark:hover:bg-rose-950/40 text-slate-700 hover:text-rose-600 dark:text-slate-200 dark:hover:text-rose-400 border border-slate-200 dark:border-slate-700 hover:border-rose-300 dark:hover:border-rose-600 flex items-center justify-center transition-all cursor-pointer active:scale-90 shadow-2xs"
                          title="Delete portal"
                          aria-label={`Delete ${platform.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Middle Row: Signature 4-Dot Infographic Track + Full Category Badge */}
                    <div className="flex items-center gap-2 select-none py-0.5 flex-wrap">
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accentColor }} />
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accentColor }} />
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accentColor }} />
                        <span className="w-2.5 h-2.5 rounded-full opacity-35" style={{ backgroundColor: accentColor }} />
                      </div>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700">
                        {categoryBadgeLabel}
                      </span>
                    </div>

                    {/* Description Text (Crisp, High Contrast) */}
                    <p className="text-xs sm:text-[13px] text-slate-700 dark:text-slate-200 font-medium line-clamp-2 leading-relaxed min-h-[36px]">
                      {formatReadableText(platform.description) || `Direct access to ${cleanDomain} resources and tests.`}
                    </p>

                    {/* Bottom Row: Domain Badge, Login Hint & Open Button */}
                    <div className="pt-2.5 border-t border-slate-100 dark:border-white/[0.08] flex items-center justify-between gap-2 mt-auto">
                      <div className="flex items-center gap-1.5 min-w-0 flex-1">
                        <a
                          href={platform.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-[11px] font-mono font-bold text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 truncate transition-colors max-w-[140px] sm:max-w-[200px] shadow-2xs"
                          title={`Visit ${cleanDomain}`}
                        >
                          <Globe className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 shrink-0" />
                          <span className="truncate">{cleanDomain}</span>
                        </a>

                        {hasLoginHint && (
                          <button
                            type="button"
                            onClick={(e) => handleCopyHint(e, platform.id, platform.loginHint!)}
                            className="hidden min-[480px]:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-[10px] font-mono font-bold text-amber-800 dark:text-amber-200 transition-all cursor-pointer shadow-2xs"
                            title={`Click to copy login: ${platform.loginHint}`}
                            aria-label={`Copy credentials: ${platform.loginHint}`}
                          >
                            <KeyRound className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                            <span className="truncate max-w-[90px]">{isCopied ? 'Copied!' : platform.loginHint}</span>
                          </button>
                        )}
                      </div>

                      <a
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          soundManager.playClick();
                        }}
                        className={`py-1.5 px-3.5 rounded-xl text-xs font-black inline-flex items-center gap-1.5 active:scale-95 cursor-pointer transition-all duration-200 shrink-0 shadow-sm ${theme.buttonBg || ''} ${theme.buttonTextColor} ${theme.buttonShadow}`}
                        style={theme.buttonStyle || { backgroundColor: accentColor, color: '#FFFFFF' }}
                        aria-label={`Open ${platform.name}`}
                      >
                        <span>Open</span>
                        <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                      </a>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Platform Modal */}
      {isAddModalOpen && (
        <AddPlatformModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          editPlatformData={editingPlatform}
        />
      )}
    </div>
  );
};

