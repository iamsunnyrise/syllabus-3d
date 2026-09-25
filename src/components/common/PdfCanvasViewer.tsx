import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
  Maximize,
  Minimize,
  Expand,
  Shrink,
  Check,
  MessageSquare,
  MessageSquarePlus,
  StickyNote,
  Trash2,
  Copy,
  ChevronDown,
  GripVertical,
  Minus,
  Sparkles,
  Tag,
  Bookmark,
  X as CloseIcon
} from 'lucide-react';
import { soundManager } from '../../utils/soundEffects';
import {
  savePdfReadingProgress,
  getPdfReadingProgress
} from '../../utils/pdfProgressStorage';
import {
  PdfHighlight,
  HighlightColor,
  HIGHLIGHT_COLORS
} from '../../utils/pdfHighlightStorage';
import {
  PdfComment,
  CommentColor,
  CommentCategory,
  COMMENT_COLORS,
  COMMENT_CATEGORIES,
  createPdfComment
} from '../../utils/pdfCommentStorage';
import { PdfStickyNotePin } from './PdfStickyNotePin';
import {
  PdfColorTheme,
  PDF_THEMES,
  loadPdfColorTheme,
  savePdfColorTheme
} from '../../utils/pdfThemeStorage';
export type { PdfColorTheme };

// Set up PDF.js worker
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || '3.11.174'}/pdf.worker.min.js`;
}

export type PdfFitMode = 'fit-width' | 'fit-page' | 'custom';
export type HighlightToolType = 'area' | 'freehand' | 'eraser';

interface PdfCanvasViewerProps {
  pdfUrl: string | null;
  docId?: string;
  initialPage?: number;
  onLoadSuccess?: (totalPages: number) => void;
  className?: string;
  showInlineControls?: boolean;
  onPageChange?: (page: number, total: number) => void;
  scale?: number;
  onScaleChange?: (newScale: number) => void;
  fitMode?: PdfFitMode;
  onFitModeChange?: (mode: PdfFitMode) => void;
  rotation?: number;
  onRotationChange?: (newRotation: number) => void;
  isAutoRotate?: boolean;
  onAutoRotateChange?: (autoRotate: boolean) => void;
  // Highlighter props
  isHighlightMode?: boolean;
  highlightColor?: HighlightColor;
  highlightTool?: HighlightToolType;
  highlights?: PdfHighlight[];
  onAddHighlight?: (highlight: PdfHighlight) => void;
  onDeleteHighlight?: (highlightId: string) => void;
  // Sticky Notes / Comment props
  isCommentMode?: boolean;
  comments?: PdfComment[];
  onAddComment?: (comment: PdfComment) => void;
  onUpdateComment?: (commentId: string, updates: Partial<PdfComment>) => void;
  onDeleteComment?: (commentId: string) => void;
  activeCommentId?: string | null;
  onSelectComment?: (commentId: string | null) => void;
  onPushCommentToNotes?: (comment: PdfComment) => void;
  // Eye-Care Reading Themes (Day, Night Mode, OLED, Sepia)
  colorTheme?: PdfColorTheme;
  onColorThemeChange?: (theme: PdfColorTheme) => void;
}

export const PdfCanvasViewer: React.FC<PdfCanvasViewerProps> = ({
  pdfUrl,
  docId,
  initialPage: propInitialPage,
  onLoadSuccess,
  className = '',
  showInlineControls = false,
  onPageChange,
  scale: propScale,
  onScaleChange,
  fitMode = 'fit-width',
  onFitModeChange,
  rotation: propRotation,
  onRotationChange,
  isAutoRotate: propIsAutoRotate,
  onAutoRotateChange,
  isHighlightMode = false,
  highlightColor = 'yellow',
  highlightTool = 'area',
  highlights = [],
  onAddHighlight,
  onDeleteHighlight,
  isCommentMode = false,
  comments = [],
  onAddComment,
  onUpdateComment,
  onDeleteComment,
  activeCommentId = null,
  onSelectComment,
  onPushCommentToNotes,
  colorTheme: propColorTheme,
  onColorThemeChange
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [internalColorTheme, setInternalColorTheme] = useState<PdfColorTheme>(() => loadPdfColorTheme());
  const activeColorTheme = propColorTheme || internalColorTheme;

  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [resumeToast, setResumeToast] = useState<{ pageNum: number; totalPages?: number } | null>(null);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const targetInitialPageRef = useRef<number>(1);
  const hasRestoredPageRef = useRef<boolean>(false);
  const currentPageRef = useRef<number>(1);
  currentPageRef.current = currentPage;
  const numPagesRef = useRef<number>(0);
  numPagesRef.current = numPages;
  const docIdRef = useRef<string | undefined>(docId);
  docIdRef.current = docId;

  const [internalScale, setInternalScale] = useState<number>(1.0);
  const [internalRotation, setInternalRotation] = useState<number>(0);
  const [internalAutoRotate, setInternalAutoRotate] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(() => typeof window !== 'undefined' ? window.innerWidth : 800);
  const [containerHeight, setContainerHeight] = useState<number>(() => typeof window !== 'undefined' ? window.innerHeight : 600);
  const [defaultAspect, setDefaultAspect] = useState<number>(1.414); // Standard A4 ratio fallback

  // Controlled or uncontrolled rotation & auto-rotate
  const rotation = propRotation !== undefined ? propRotation : internalRotation;
  const isAutoRotate = propIsAutoRotate !== undefined ? propIsAutoRotate : internalAutoRotate;

  const setRotation = (newRot: number | ((prev: number) => number)) => {
    const nextVal = typeof newRot === 'function' ? newRot(rotation) : newRot;
    const normalized = ((nextVal % 360) + 360) % 360;
    if (onRotationChange) {
      onRotationChange(normalized);
    } else {
      setInternalRotation(normalized);
    }
  };

  const setIsAutoRotate = (val: boolean | ((prev: boolean) => boolean)) => {
    const nextVal = typeof val === 'function' ? val(isAutoRotate) : val;
    if (onAutoRotateChange) {
      onAutoRotateChange(nextVal);
    } else {
      setInternalAutoRotate(nextVal);
    }
  };

  // Scroll tracking and debounced parent page notification
  const scrollRafRef = useRef<number | null>(null);
  const pageChangeTimeoutRef = useRef<any>(null);
  const lastScrollTopRef = useRef<number>(0);
  const isInitialLoadRef = useRef<boolean>(true);

  // Touch Pinch-to-zoom & double tap state
  const touchPinchRef = useRef<{
    startDist: number;
    startScale: number;
    isPinching: boolean;
  }>({
    startDist: 0,
    startScale: 1.0,
    isPinching: false
  });
  const lastTapRef = useRef<{ time: number; x: number; y: number }>({ time: 0, x: 0, y: 0 });
  const pinchRafRef = useRef<number | null>(null);

  const scale = propScale !== undefined ? propScale : internalScale;
  const setScale = (newScale: number | ((prev: number) => number)) => {
    if (onScaleChange && typeof newScale === 'number') {
      onScaleChange(newScale);
    } else if (onScaleChange && typeof newScale === 'function') {
      onScaleChange(newScale(scale));
    } else if (typeof newScale === 'function') {
      setInternalScale(newScale);
    } else {
      setInternalScale(newScale);
    }
  };

  // Auto-rotate logic based on mobile orientation & PDF page aspect ratio
  useEffect(() => {
    if (!isAutoRotate || !pdfDoc) return;

    const isLandscapeDevice = containerWidth > containerHeight;
    const isLandscapePage = defaultAspect < 0.95; // Page is wider than tall (slides/tables)

    if (isLandscapeDevice && isLandscapePage) {
      // Landscape slides on landscape device -> standard upright 0°
      if (rotation !== 0) setRotation(0);
    } else if (!isLandscapeDevice && isLandscapePage) {
      // Landscape slides on portrait phone -> auto-rotate 90° so it fills screen vertically!
      if (rotation !== 90) setRotation(90);
    } else if (!isLandscapeDevice && !isLandscapePage) {
      // Portrait page on portrait phone -> standard upright 0°
      if (rotation !== 0) setRotation(0);
    }
  }, [isAutoRotate, containerWidth, containerHeight, defaultAspect, pdfDoc]);

  // Screen orientation change listener for fast, seamless adaptation
  useEffect(() => {
    const handleOrientationChange = () => {
      if (!containerRef.current) return;
      const measuredW = containerRef.current.clientWidth || window.innerWidth;
      const measuredH = containerRef.current.clientHeight || window.innerHeight;
      setContainerWidth(measuredW);
      setContainerHeight(measuredH);
    };

    window.addEventListener('orientationchange', handleOrientationChange);
    if (typeof window !== 'undefined' && window.screen?.orientation) {
      window.screen.orientation.addEventListener('change', handleOrientationChange);
    }

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      if (typeof window !== 'undefined' && window.screen?.orientation) {
        window.screen.orientation.removeEventListener('change', handleOrientationChange);
      }
    };
  }, []);

  // Pinch-to-zoom and double-tap touch event handlers on container
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        // Multi-touch pinch start
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
        touchPinchRef.current = {
          startDist: dist,
          startScale: scale,
          isPinching: true
        };
        if (e.cancelable) e.preventDefault();
      } else if (e.touches.length === 1 && !isHighlightMode && !isCommentMode) {
        // Double-tap zoom toggle
        const now = Date.now();
        const t = e.touches[0];
        const timeDiff = now - lastTapRef.current.time;
        const distDiff = Math.hypot(t.clientX - lastTapRef.current.x, t.clientY - lastTapRef.current.y);

        if (timeDiff > 50 && timeDiff < 320 && distDiff < 40) {
          if (e.cancelable) e.preventDefault();
          soundManager.playClick();
          if (scale > 1.25) {
            // Reset to 1.0 fit width
            setScale(1.0);
            if (onFitModeChange) onFitModeChange('fit-width');
          } else {
            // Zoom into 1.8x
            setScale(1.8);
            if (onFitModeChange) onFitModeChange('custom');
          }
          lastTapRef.current = { time: 0, x: 0, y: 0 };
        } else {
          lastTapRef.current = { time: now, x: t.clientX, y: t.clientY };
        }
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && touchPinchRef.current.isPinching) {
        if (e.cancelable) e.preventDefault();
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
        const ratio = dist / (touchPinchRef.current.startDist || 1);
        const newScale = Math.min(Math.max(touchPinchRef.current.startScale * ratio, 0.4), 4.0);

        if (pinchRafRef.current) cancelAnimationFrame(pinchRafRef.current);
        pinchRafRef.current = requestAnimationFrame(() => {
          setScale(Math.round(newScale * 100) / 100);
          if (fitMode !== 'custom' && onFitModeChange) {
            onFitModeChange('custom');
          }
        });
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (touchPinchRef.current.isPinching && e.touches.length < 2) {
        touchPinchRef.current.isPinching = false;
        soundManager.playClick();
      }
    };

    container.addEventListener('touchstart', onTouchStart, { passive: false });
    container.addEventListener('touchmove', onTouchMove, { passive: false });
    container.addEventListener('touchend', onTouchEnd);
    container.addEventListener('touchcancel', onTouchEnd);

    return () => {
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);
      container.removeEventListener('touchcancel', onTouchEnd);
      if (pinchRafRef.current) cancelAnimationFrame(pinchRafRef.current);
    };
  }, [scale, fitMode, isHighlightMode, isCommentMode, onFitModeChange]);

  // Debounced ResizeObserver to avoid canvas destruction when vertical scrollbar appears/disappears
  useEffect(() => {
    if (!containerRef.current) return;
    let resizeTimer: any = null;

    const updateSize = () => {
      if (!containerRef.current) return;
      // Using offsetWidth avoids micro 15px shifts when scrollbar toggles
      const measuredW = containerRef.current.clientWidth || window.innerWidth;
      const measuredH = containerRef.current.clientHeight || window.innerHeight;

      setContainerWidth(prev => {
        // 20px threshold: Ignore vertical scrollbar width (15-17px) changes to prevent redraw loops
        if (Math.abs(prev - measuredW) >= 20) {
          return measuredW;
        }
        return prev;
      });

      setContainerHeight(prev => {
        if (Math.abs(prev - measuredH) >= 20) {
          return measuredH;
        }
        return prev;
      });
    };

    updateSize();

    const resizeObserver = new ResizeObserver(() => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateSize, 120);
    });
    resizeObserver.observe(containerRef.current);

    const handleWindowResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateSize, 120);
    };
    window.addEventListener('resize', handleWindowResize);

    return () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  // 1. Load PDF Document FAST
  useEffect(() => {
    let isCancelled = false;

    if (!pdfUrl) {
      setPdfDoc(null);
      setNumPages(0);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    const loadDocument = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument({
          url: pdfUrl,
          cMapUrl: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || '3.11.174'}/cmaps/`,
          cMapPacked: true
        });

        const doc = await loadingTask.promise;
        if (isCancelled) return;

        setPdfDoc(doc);
        setNumPages(doc.numPages);
        numPagesRef.current = doc.numPages;

        // Retrieve saved reading progress for this document
        const savedProgress = docId ? getPdfReadingProgress(docId) : null;
        const targetPage = (propInitialPage && propInitialPage >= 1 && propInitialPage <= doc.numPages)
          ? propInitialPage
          : (savedProgress && savedProgress.pageNum >= 1 && savedProgress.pageNum <= doc.numPages)
            ? savedProgress.pageNum
            : 1;

        setCurrentPage(targetPage);
        currentPageRef.current = targetPage;
        targetInitialPageRef.current = targetPage;
        hasRestoredPageRef.current = false;
        isInitialLoadRef.current = true;

        // Instantly get page 1 aspect ratio to set placeholder heights accurately
        try {
          const page1 = await doc.getPage(1);
          const vp = page1.getViewport({ scale: 1 });
          if (vp.width > 0 && vp.height > 0) {
            setDefaultAspect(vp.height / vp.width);
          }
        } catch {}

        setIsLoading(false);
        onLoadSuccess?.(doc.numPages);
        onPageChange?.(targetPage, doc.numPages);
      } catch (err: any) {
        console.error('Error loading PDF document:', err);
        if (!isCancelled) {
          setError(err?.message || 'Failed to parse and load PDF document.');
          setIsLoading(false);
        }
      }
    };

    loadDocument();

    return () => {
      isCancelled = true;
      if (pageChangeTimeoutRef.current) {
        clearTimeout(pageChangeTimeoutRef.current);
      }
      if (scrollRafRef.current) {
        cancelAnimationFrame(scrollRafRef.current);
      }
    };
  }, [pdfUrl, docId, propInitialPage]);

  // Auto-scroll to saved/target page once PDF document and page containers are mounted
  useEffect(() => {
    if (isLoading || !pdfDoc || numPages <= 0 || hasRestoredPageRef.current) return;
    const targetPage = targetInitialPageRef.current;
    if (targetPage > 1) {
      let attempts = 0;
      const maxAttempts = 25;

      const performScroll = () => {
        if (!containerRef.current) return;
        const targetEl = containerRef.current.querySelector<HTMLDivElement>(`[data-page-number="${targetPage}"]`);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'auto', block: 'start' });
          lastScrollTopRef.current = containerRef.current.scrollTop;
          hasRestoredPageRef.current = true;
          setCurrentPage(targetPage);
          currentPageRef.current = targetPage;
          onPageChange?.(targetPage, numPages);
          setResumeToast({ pageNum: targetPage, totalPages: numPages });
          if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
          resumeTimeoutRef.current = setTimeout(() => {
            setResumeToast(null);
          }, 4500);
        } else if (attempts < maxAttempts) {
          attempts++;
          requestAnimationFrame(performScroll);
        }
      };

      const timer = setTimeout(performScroll, 60);
      return () => clearTimeout(timer);
    } else {
      hasRestoredPageRef.current = true;
    }
  }, [isLoading, pdfDoc, numPages, docId]);

  // Save progress on unmount
  useEffect(() => {
    return () => {
      if (docIdRef.current && currentPageRef.current >= 1) {
        savePdfReadingProgress(docIdRef.current, currentPageRef.current, numPagesRef.current);
      }
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  // Restore scroll position across parent re-renders
  useEffect(() => {
    if (isInitialLoadRef.current) {
      isInitialLoadRef.current = false;
      return;
    }
    if (containerRef.current && lastScrollTopRef.current > 0) {
      // If scrollTop was unintentionally wiped back to 0 while container still has scroll height
      if (containerRef.current.scrollTop === 0 && containerRef.current.scrollHeight > containerRef.current.clientHeight + 100) {
        containerRef.current.scrollTop = lastScrollTopRef.current;
      }
    }
  });

  // Throttled scroll listener using requestAnimationFrame to track current page smoothly
  const handleScroll = () => {
    if (!containerRef.current || numPages === 0) return;
    const container = containerRef.current;
    lastScrollTopRef.current = container.scrollTop;

    if (scrollRafRef.current !== null) return;

    scrollRafRef.current = requestAnimationFrame(() => {
      scrollRafRef.current = null;
      if (!containerRef.current) return;
      const currentContainer = containerRef.current;
      const scrollTop = currentContainer.scrollTop;
      const pageEls = currentContainer.querySelectorAll<HTMLDivElement>('[data-page-number]');

      for (let i = 0; i < pageEls.length; i++) {
        const el = pageEls[i];
        // el.offsetTop is relative to containerRef (container has relative position)
        const offsetTop = el.offsetTop;
        const elHeight = el.offsetHeight || 800;

        if (scrollTop >= offsetTop - 120 && scrollTop < offsetTop + elHeight - 120) {
          const pNum = Number(el.getAttribute('data-page-number'));
          if (pNum && pNum !== currentPage) {
            setCurrentPage(pNum);
            currentPageRef.current = pNum;
            // Debounce parent onPageChange so rapid scrolling does not trigger high-frequency parent re-renders
            if (pageChangeTimeoutRef.current) {
              clearTimeout(pageChangeTimeoutRef.current);
            }
            pageChangeTimeoutRef.current = setTimeout(() => {
              onPageChange?.(pNum, numPages);
              if (docId) {
                savePdfReadingProgress(docId, pNum, numPages);
              }
            }, 80);
          }
          break;
        }
      }
    });
  };

  const scrollToPage = (pageNum: number, behavior: ScrollBehavior = 'smooth') => {
    soundManager.playClick();
    if (!containerRef.current) return;
    const el = containerRef.current.querySelector<HTMLDivElement>(`[data-page-number="${pageNum}"]`);
    if (el) {
      el.scrollIntoView({ behavior, block: 'start' });
      setCurrentPage(pageNum);
      currentPageRef.current = pageNum;
      if (docId) {
        savePdfReadingProgress(docId, pageNum, numPages);
      }
    }
  };

  return (
    <div
      className={`flex flex-col h-full select-none ${className}`}
      style={{
        backgroundColor: activeColorTheme === 'oled' ? '#000000' : '#16161E'
      }}
    >
      
      {/* Optional Inline Floating Toolbar */}
      {showInlineControls && (
        <div className="px-3 py-1.5 bg-[#1F2335]/95 backdrop-blur-md border-b border-[#292E42] flex items-center justify-between gap-2 shrink-0 z-20">
          <div className="flex items-center gap-1 text-xs">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => scrollToPage(currentPage - 1)}
              className="p-1 rounded-lg bg-[#24283B] hover:bg-[#2F354D] disabled:opacity-40 text-white cursor-pointer"
              title="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="px-2 py-0.5 rounded-lg bg-[#16161E] border border-[#292E42] font-mono text-[11px] font-bold text-[#C0CAF5] min-w-[70px] text-center">
              {numPages > 0 ? `${currentPage} / ${numPages}` : '...'}
            </span>

            <button
              type="button"
              disabled={currentPage >= numPages}
              onClick={() => scrollToPage(currentPage + 1)}
              className="p-1 rounded-lg bg-[#24283B] hover:bg-[#2F354D] disabled:opacity-40 text-white cursor-pointer"
              title="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Fit to Page / Fit to Width Buttons */}
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                if (onFitModeChange) {
                  onFitModeChange(fitMode === 'fit-page' ? 'fit-width' : 'fit-page');
                }
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                fitMode === 'fit-page'
                  ? 'bg-[#7AA2F7] text-[#1A1B26] shadow-sm'
                  : 'bg-[#24283B] hover:bg-[#2F354D] text-[#A9B1D6] hover:text-white'
              }`}
              title={fitMode === 'fit-page' ? 'Switch to Fit Width' : 'Fit Entire Page to Screen'}
            >
              {fitMode === 'fit-page' ? <Shrink className="w-3.5 h-3.5" /> : <Expand className="w-3.5 h-3.5" />}
              <span>{fitMode === 'fit-page' ? 'Fit Page' : 'Fit Width'}</span>
            </button>

            <button
              type="button"
              onClick={() => setScale((s: number) => Math.max(s - 0.2, 0.5))}
              className="p-1.5 rounded-lg bg-[#24283B] hover:bg-[#2F354D] text-[#A9B1D6] hover:text-white cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => setScale(1.0)}
              className="px-2 py-0.5 rounded-lg bg-[#24283B] text-[11px] font-mono font-bold text-[#7AA2F7] cursor-pointer"
              title="100% Zoom"
            >
              {Math.round(scale * 100)}%
            </button>

            <button
              type="button"
              onClick={() => setScale((s: number) => Math.min(s + 0.2, 3.0))}
              className="p-1.5 rounded-lg bg-[#24283B] hover:bg-[#2F354D] text-[#A9B1D6] hover:text-white cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => setRotation(r => (r + 90) % 360)}
              className="p-1.5 rounded-lg bg-[#24283B] hover:bg-[#2F354D] text-[#A9B1D6] hover:text-white cursor-pointer"
              title="Rotate 90°"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Pages Container - Fast Virtualized Smooth Vertical Flow */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className={`flex-1 overflow-y-auto overflow-x-auto p-0 m-0 w-full flex flex-col items-center relative ${
          fitMode === 'fit-page' ? 'py-4 gap-4' : 'gap-0'
        }`}
        style={{
          backgroundColor: activeColorTheme === 'oled' ? '#000000' : '#16161E'
        }}
      >
        {/* Sleek Floating Resume Notification */}
        {resumeToast && (
          <div className="sticky top-3 z-30 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F2335]/95 backdrop-blur-md border border-[#7AA2F7]/50 text-white shadow-xl text-xs animate-fade-in pointer-events-auto shrink-0 mb-2">
            <Bookmark className="w-3.5 h-3.5 text-[#7AA2F7] fill-[#7AA2F7]" />
            <span className="font-semibold text-slate-100">
              Resumed from <strong>Page {resumeToast.pageNum}</strong>
              {resumeToast.totalPages ? ` of ${resumeToast.totalPages}` : ''}
            </span>
            <button
              type="button"
              onClick={() => {
                scrollToPage(1);
                setResumeToast(null);
              }}
              className="ml-1 text-[11px] font-bold text-[#7AA2F7] hover:text-white underline cursor-pointer"
            >
              Start (Page 1)
            </button>
            <button
              type="button"
              onClick={() => setResumeToast(null)}
              className="p-0.5 rounded-full text-slate-400 hover:text-white cursor-pointer ml-0.5"
              title="Dismiss"
            >
              <CloseIcon className="w-3 h-3" />
            </button>
          </div>
        )}

        {isLoading && (
          <div className="m-auto flex flex-col items-center justify-center gap-3 py-20 text-center">
            <Loader2 className="w-10 h-10 text-[#7AA2F7] animate-spin" />
            <span className="text-sm text-[#C0CAF5] font-bold">Fast Loading PDF Document...</span>
            <span className="text-xs text-[#787C99]">Rendering high-definition view</span>
          </div>
        )}

        {error && (
          <div className="m-auto text-center p-6 max-w-sm space-y-3">
            <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
            <h4 className="text-sm font-bold text-white">Could not display PDF</h4>
            <p className="text-xs text-[#A9B1D6] leading-relaxed">{error}</p>
          </div>
        )}

        {!isLoading && !error && numPages > 0 && (
          <div className={`w-full mx-auto flex flex-col items-center ${scale > 1.05 ? 'min-w-max' : ''} ${
            fitMode === 'fit-page' ? 'max-w-5xl' : 'max-w-none w-full'
          }`}>
            {Array.from({ length: numPages }, (_, idx) => idx + 1).map((pageNum, idx) => {
              const isNearby = Math.abs(pageNum - currentPage) <= 3;
              return (
                <React.Fragment key={`${pageNum}_${rotation}`}>
                  <PdfPageItem
                    pageNum={pageNum}
                    targetPage={targetInitialPageRef.current}
                    isNearby={isNearby}
                    scrollContainerRef={containerRef}
                    docId={docId}
                    pdfDoc={pdfDoc}
                    scale={scale}
                    fitMode={fitMode}
                    rotation={rotation}
                    containerWidth={containerWidth}
                    containerHeight={containerHeight}
                    defaultAspect={defaultAspect}
                    isHighlightMode={isHighlightMode}
                    highlightColor={highlightColor}
                    highlightTool={highlightTool}
                    pageHighlights={highlights.filter(h => h.pageNum === pageNum)}
                    onAddHighlight={onAddHighlight}
                    onDeleteHighlight={onDeleteHighlight}
                    isCommentMode={isCommentMode}
                    pageComments={comments.filter(c => c.pageNum === pageNum)}
                    onAddComment={onAddComment}
                    onUpdateComment={onUpdateComment}
                    onDeleteComment={onDeleteComment}
                    activeCommentId={activeCommentId}
                    onSelectComment={onSelectComment}
                    onPushCommentToNotes={onPushCommentToNotes}
                    colorTheme={activeColorTheme}
                  />
                  {fitMode === 'fit-width' && idx < numPages - 1 && (
                    <div
                      className="w-full h-1 border-y shrink-0"
                      style={{
                        backgroundColor: activeColorTheme === 'oled' ? '#0a0a0a' : '#1A1B26',
                        borderColor: activeColorTheme === 'oled' ? '#181818' : 'rgba(41, 46, 66, 0.5)'
                      }}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

interface PdfPageItemProps {
  pageNum: number;
  targetPage?: number;
  isNearby?: boolean;
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>;
  docId?: string;
  pdfDoc: any;
  scale: number;
  fitMode: PdfFitMode;
  rotation: number;
  containerWidth: number;
  containerHeight: number;
  defaultAspect: number;
  isHighlightMode?: boolean;
  highlightColor?: HighlightColor;
  highlightTool?: HighlightToolType;
  pageHighlights: PdfHighlight[];
  onAddHighlight?: (highlight: PdfHighlight) => void;
  onDeleteHighlight?: (highlightId: string) => void;
  isCommentMode?: boolean;
  pageComments: PdfComment[];
  onAddComment?: (comment: PdfComment) => void;
  onUpdateComment?: (commentId: string, updates: Partial<PdfComment>) => void;
  onDeleteComment?: (commentId: string) => void;
  activeCommentId?: string | null;
  onSelectComment?: (commentId: string | null) => void;
  onPushCommentToNotes?: (comment: PdfComment) => void;
  colorTheme?: PdfColorTheme;
}

const PdfPageItem: React.FC<PdfPageItemProps> = React.memo(({
  pageNum,
  targetPage,
  isNearby = false,
  scrollContainerRef,
  docId,
  pdfDoc,
  scale,
  fitMode,
  rotation,
  containerWidth,
  containerHeight,
  defaultAspect,
  isHighlightMode = false,
  highlightColor = 'yellow',
  highlightTool = 'area',
  pageHighlights = [],
  onAddHighlight,
  onDeleteHighlight,
  isCommentMode = false,
  pageComments = [],
  onAddComment,
  onUpdateComment,
  onDeleteComment,
  activeCommentId = null,
  onSelectComment,
  onPushCommentToNotes,
  colorTheme = 'light'
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const renderTaskRef = useRef<any>(null);
  // Page 1, targetPage, or nearby pages are immediately visible
  const [isVisible, setIsVisible] = useState<boolean>(
    pageNum === 1 || pageNum === targetPage || isNearby
  );
  const [isRendering, setIsRendering] = useState<boolean>(true);
  const [pageAspect, setPageAspect] = useState<number>(defaultAspect);
  const [renderedWidth, setRenderedWidth] = useState<number>(0);
  const [renderedHeight, setRenderedHeight] = useState<number>(0);

  // Sync aspect ratio when defaultAspect is computed from page 1
  useEffect(() => {
    if (defaultAspect > 0 && renderedHeight === 0) {
      setPageAspect(defaultAspect);
    }
  }, [defaultAspect, renderedHeight]);

  // Active Drawing State
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null);
  const [currentPoint, setCurrentPoint] = useState<{ x: number; y: number } | null>(null);
  const [freehandPoints, setFreehandPoints] = useState<Array<{ x: number; y: number }>>([]);

  // 1. Predictive Lookahead: Nearby pages (around active scroll viewport) are pre-rendered immediately
  useEffect(() => {
    if (isNearby || pageNum === 1 || (targetPage && Math.abs(pageNum - targetPage) <= 1)) {
      setIsVisible(true);
    }
  }, [isNearby, pageNum, targetPage]);

  // 2. IntersectionObserver lookahead:
  // Rooted to scrollContainerRef with 2000px lookahead margin to seamlessly render ~3 pages ahead of scroll
  useEffect(() => {
    if (isVisible) return;

    const el = wrapperRef.current;
    if (!el) return;

    const rootEl = scrollContainerRef?.current || null;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        root: rootEl,
        rootMargin: '2000px 0px',
        threshold: 0.01
      }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, [isVisible, scrollContainerRef]);

  // Render Page onto Canvas with Offscreen Double-Buffering (Chrome/Adobe Acrobat Grade)
  useEffect(() => {
    if (!isVisible || !pdfDoc) return;

    let isCancelled = false;

    const executeRender = async () => {
      try {
        if (renderTaskRef.current) {
          try {
            renderTaskRef.current.cancel();
          } catch {}
          renderTaskRef.current = null;
        }

        setIsRendering(true);
        const page = await pdfDoc.getPage(pageNum);
        if (isCancelled) return;

        const unscaledViewport = page.getViewport({ scale: 1, rotation });
        const aspect = unscaledViewport.height / unscaledViewport.width;
        setPageAspect(aspect);

        // Compute exact fit scale
        let finalScale = 1.0;
        if (fitMode === 'fit-page') {
          // Fit entire page height on screen (minus header margin)
          const targetH = Math.max(containerHeight - 32, 300);
          const targetW = Math.max(containerWidth - 32, 300);
          const scaleY = targetH / unscaledViewport.height;
          const scaleX = targetW / unscaledViewport.width;
          const baseFit = Math.min(scaleX, scaleY);
          finalScale = baseFit * scale;
        } else {
          // Fit width 100%
          const baseFit = containerWidth / unscaledViewport.width;
          finalScale = baseFit * scale;
        }

        const viewport = page.getViewport({ scale: finalScale, rotation });

        const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
        const displayW = Math.floor(viewport.width);
        const displayH = Math.floor(viewport.height);
        const pixelW = Math.floor(viewport.width * dpr);
        const pixelH = Math.floor(viewport.height * dpr);

        if (displayW <= 0 || displayH <= 0 || pixelW <= 0 || pixelH <= 0) {
          setIsRendering(false);
          return;
        }

        // 1. Offscreen Double-Buffering:
        // Render onto an in-memory detached canvas so the visible screen NEVER flashes black or clears!
        const offscreenCanvas = document.createElement('canvas');
        offscreenCanvas.width = pixelW;
        offscreenCanvas.height = pixelH;

        const offCtx = offscreenCanvas.getContext('2d');
        if (!offCtx || isCancelled) return;

        // Guarantee a solid crisp pure white base before PDF drawing.
        // PDF documents are authored on white paper. By guaranteeing #FFFFFF background on the canvas,
        // PDF glyphs/vectors have solid contrast, and CSS inversion filters (OLED/Night) work cleanly
        // without transparent artifacts or dark flashes!
        offCtx.fillStyle = '#FFFFFF';
        offCtx.fillRect(0, 0, pixelW, pixelH);

        offCtx.imageSmoothingEnabled = true;
        offCtx.imageSmoothingQuality = 'high';
        offCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const renderContext = {
          canvasContext: offCtx,
          viewport: viewport
        };

        const renderTask = page.render(renderContext);
        renderTaskRef.current = renderTask;

        await renderTask.promise;
        if (isCancelled) return;

        // 2. Atomic Blit:
        // Now that offscreen canvas is completely finished, blit onto visible canvas in a single instant tick.
        const visibleCanvas = canvasRef.current;
        if (!visibleCanvas) return;

        visibleCanvas.width = pixelW;
        visibleCanvas.height = pixelH;
        visibleCanvas.style.width = `${displayW}px`;
        visibleCanvas.style.height = `${displayH}px`;

        const visibleCtx = visibleCanvas.getContext('2d');
        if (visibleCtx) {
          visibleCtx.drawImage(offscreenCanvas, 0, 0);
        }

        setRenderedWidth(displayW);
        setRenderedHeight(displayH);
        setIsRendering(false);
      } catch (err: any) {
        if (err?.name !== 'RenderingCancelledException') {
          console.warn(`Error rendering page ${pageNum}:`, err);
        }
        if (!isCancelled) {
          setIsRendering(false);
        }
      }
    };

    executeRender();

    return () => {
      isCancelled = true;
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch {}
      }
    };
  }, [isVisible, pdfDoc, pageNum, scale, fitMode, rotation, containerWidth, containerHeight]);

  // Coordinate helper relative to page
  const getRelativeCoords = (clientX: number, clientY: number) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const rect = svgRef.current.getBoundingClientRect();
    const x = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    const y = Math.min(Math.max((clientY - rect.top) / rect.height, 0), 1);
    return { x, y };
  };

  // Mouse / Touch Event Handlers for Highlighting
  const handlePointerDown = (clientX: number, clientY: number) => {
    if (!isHighlightMode) return;
    const pt = getRelativeCoords(clientX, clientY);

    if (highlightTool === 'eraser') return;

    setIsDrawing(true);
    if (highlightTool === 'area') {
      setStartPoint(pt);
      setCurrentPoint(pt);
    } else if (highlightTool === 'freehand') {
      setFreehandPoints([pt]);
    }
  };

  const handlePointerMove = (clientX: number, clientY: number) => {
    if (!isDrawing || !isHighlightMode) return;
    const pt = getRelativeCoords(clientX, clientY);

    if (highlightTool === 'area') {
      setCurrentPoint(pt);
    } else if (highlightTool === 'freehand') {
      setFreehandPoints(prev => [...prev, pt]);
    }
  };

  const handlePointerUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    if (highlightTool === 'area' && startPoint && currentPoint) {
      const minX = Math.min(startPoint.x, currentPoint.x);
      const minY = Math.min(startPoint.y, currentPoint.y);
      const width = Math.abs(currentPoint.x - startPoint.x);
      const height = Math.abs(currentPoint.y - startPoint.y);

      // Only save if meaningful size (not accidental micro click)
      if (width > 0.015 && height > 0.008) {
        const newHighlight: PdfHighlight = {
          id: `hl_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          pageNum,
          color: highlightColor,
          type: 'rect',
          rect: { x: minX, y: minY, width, height },
          createdAt: new Date().toISOString()
        };
        onAddHighlight?.(newHighlight);
        soundManager.playClick();
      }
    } else if (highlightTool === 'freehand' && freehandPoints.length > 2) {
      const newHighlight: PdfHighlight = {
        id: `hl_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        pageNum,
        color: highlightColor,
        type: 'freehand',
        points: freehandPoints,
        createdAt: new Date().toISOString()
      };
      onAddHighlight?.(newHighlight);
      soundManager.playClick();
    }

    setStartPoint(null);
    setCurrentPoint(null);
    setFreehandPoints([]);
  };

  // Handle Click in Comment Mode to add a new sticky note
  const handlePageClick = (e: React.MouseEvent) => {
    if (!isCommentMode || isHighlightMode) return;
    if ((e.target as HTMLElement)?.closest('[data-pdf-comment]')) return;
    const pt = getRelativeCoords(e.clientX, e.clientY);
    const newComment = createPdfComment({
      docId: docId || 'default',
      pageNum,
      x: pt.x,
      y: pt.y,
      text: '',
      color: 'yellow',
      category: 'note'
    });
    onAddComment?.(newComment);
    onSelectComment?.(newComment.id);
    soundManager.playClick();
  };

  // Estimate placeholder height
  const effectiveWidth = Math.max(containerWidth, 320);
  const placeholderHeight = fitMode === 'fit-page'
    ? Math.min(containerHeight - 40, (effectiveWidth - 32) * pageAspect) * scale
    : effectiveWidth * pageAspect * scale;
  const finalItemHeight = renderedHeight > 0 ? renderedHeight : Math.max(200, Math.floor(placeholderHeight));

  const activeColorMeta = HIGHLIGHT_COLORS[highlightColor] || HIGHLIGHT_COLORS.yellow;
  const themeConfig = PDF_THEMES[colorTheme] || PDF_THEMES.light;

  return (
    <div
      ref={wrapperRef}
      data-page-number={pageNum}
      className={`relative flex justify-center items-center shadow-lg ${scale > 1.05 ? 'overflow-visible' : 'overflow-hidden'} transition-colors duration-200 ${
        fitMode === 'fit-page' ? 'rounded-lg border' : 'w-full'
      }`}
      style={{
        minHeight: `${finalItemHeight}px`,
        height: `${finalItemHeight}px`,
        width: fitMode === 'fit-page' ? 'auto' : (renderedWidth > containerWidth ? `${renderedWidth}px` : '100%'),
        minWidth: renderedWidth > containerWidth ? `${renderedWidth}px` : (fitMode === 'fit-page' ? 'auto' : '100%'),
        backgroundColor: themeConfig.pageBgColor,
        borderColor: themeConfig.pageBorderColor,
        contain: 'layout'
      }}
    >
      {/* Sleek Skeleton Placeholder while page renders in background (Zero jarring black flashes) */}
      {renderedHeight === 0 && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center select-none z-10 pointer-events-none"
          style={{
            backgroundColor: themeConfig.pageBgColor
          }}
        >
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-500/10 dark:bg-white/5 border border-slate-500/20 text-slate-400 text-xs font-mono shadow-xs">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-[#7AA2F7] opacity-80" />
            <span>Page {pageNum}</span>
          </div>
        </div>
      )}

      {/* Page Canvas Container with Synchronized Highlight Layer */}
      <div
        className={`relative mx-auto ${scale > 1.05 ? 'max-w-none' : 'max-w-full'}`}
        onClick={handlePageClick}
        style={{
          width: renderedWidth > 0 ? `${renderedWidth}px` : (fitMode === 'fit-page' ? 'auto' : '100%'),
          height: `${finalItemHeight}px`
        }}
      >
        <canvas
          ref={canvasRef}
          className={`block ${scale > 1.05 ? 'max-w-none' : 'max-w-full'} transition-[filter,opacity] duration-200 ${
            renderedHeight > 0 ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'
          }`}
          style={{
            filter: themeConfig.canvasFilter
          }}
        />

        {/* Interactive SVG Highlight & Annotation Layer */}
        {renderedWidth > 0 && renderedHeight > 0 && (
          <svg
            ref={svgRef}
            className={`absolute inset-0 w-full h-full ${
              isCommentMode
                ? 'cursor-crosshair pointer-events-auto'
                : isHighlightMode
                ? highlightTool === 'eraser'
                  ? 'cursor-pointer pointer-events-auto'
                  : 'cursor-crosshair pointer-events-auto'
                : 'pointer-events-auto'
            }`}
            onClick={handlePageClick}
            onMouseDown={e => handlePointerDown(e.clientX, e.clientY)}
            onMouseMove={e => handlePointerMove(e.clientX, e.clientY)}
            onMouseUp={handlePointerUp}
            onMouseLeave={handlePointerUp}
            onTouchStart={e => {
              if (e.touches.length === 1 && isHighlightMode) {
                handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
              }
            }}
            onTouchMove={e => {
              if (e.touches.length === 1 && isDrawing && isHighlightMode) {
                handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
              }
            }}
            onTouchEnd={handlePointerUp}
          >
            {/* 1. Saved Highlights on this Page */}
            {pageHighlights.map(h => {
              const colorInfo = HIGHLIGHT_COLORS[h.color] || HIGHLIGHT_COLORS.yellow;
              return (
                <g
                  key={h.id}
                  onClick={(e) => {
                    if (highlightTool === 'eraser' || isHighlightMode) {
                      e.stopPropagation();
                      onDeleteHighlight?.(h.id);
                      soundManager.playClick();
                    }
                  }}
                  className={`group transition-opacity ${
                    isHighlightMode ? 'cursor-pointer hover:opacity-70' : 'pointer-events-none'
                  }`}
                >
                  {h.type === 'rect' && h.rect && (
                    <rect
                      x={`${h.rect.x * 100}%`}
                      y={`${h.rect.y * 100}%`}
                      width={`${h.rect.width * 100}%`}
                      height={`${h.rect.height * 100}%`}
                      fill={colorInfo.hex}
                      fillOpacity={themeConfig.highlightOpacity}
                      stroke={colorInfo.border}
                      strokeWidth={1}
                      rx={3}
                      style={{ mixBlendMode: themeConfig.blendMode }}
                    />
                  )}
                  {h.type === 'freehand' && h.points && (
                    <polyline
                      points={h.points.map(p => `${p.x * renderedWidth},${p.y * renderedHeight}`).join(' ')}
                      fill="none"
                      stroke={colorInfo.hex}
                      strokeWidth={Math.max(14, 18 * scale)}
                      strokeOpacity={themeConfig.highlightOpacity + 0.08}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ mixBlendMode: themeConfig.blendMode }}
                    />
                  )}
                </g>
              );
            })}

            {/* 2. Active Highlight Drawing Preview */}
            {isDrawing && highlightTool === 'area' && startPoint && currentPoint && (
              <rect
                x={`${Math.min(startPoint.x, currentPoint.x) * 100}%`}
                y={`${Math.min(startPoint.y, currentPoint.y) * 100}%`}
                width={`${Math.abs(currentPoint.x - startPoint.x) * 100}%`}
                height={`${Math.abs(currentPoint.y - startPoint.y) * 100}%`}
                fill={activeColorMeta.hex}
                fillOpacity={themeConfig.highlightOpacity + 0.05}
                stroke={activeColorMeta.border}
                strokeWidth={1.5}
                strokeDasharray="3 3"
                rx={3}
                style={{ mixBlendMode: themeConfig.blendMode }}
              />
            )}

            {isDrawing && highlightTool === 'freehand' && freehandPoints.length > 1 && (
              <polyline
                points={freehandPoints.map(p => `${p.x * renderedWidth},${p.y * renderedHeight}`).join(' ')}
                fill="none"
                stroke={activeColorMeta.hex}
                strokeWidth={Math.max(14, 18 * scale)}
                strokeOpacity={themeConfig.highlightOpacity + 0.1}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ mixBlendMode: themeConfig.blendMode }}
              />
            )}
          </svg>
        )}

        {/* Interactive Sticky Notes / Comments Layer */}
        {renderedWidth > 0 && renderedHeight > 0 && pageComments.length > 0 && (
          <div className="absolute inset-0 pointer-events-none z-20">
            {pageComments.map(comment => (
              <PdfStickyNotePin
                key={comment.id}
                comment={comment}
                isActive={activeCommentId === comment.id}
                onSelect={() => onSelectComment?.(comment.id)}
                onUpdate={updates => onUpdateComment?.(comment.id, updates)}
                onDelete={() => onDeleteComment?.(comment.id)}
                onPushToNotes={() => onPushCommentToNotes?.(comment)}
                renderedWidth={renderedWidth}
                renderedHeight={renderedHeight}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

