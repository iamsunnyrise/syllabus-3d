import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import {
  ArrowLeft,
  X,
  FileText,
  Download,
  Maximize2,
  Minimize2,
  ChevronDown,
  Columns,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Expand,
  Shrink,
  Check,
  Highlighter,
  Square,
  PenTool,
  Eraser,
  RotateCcw,
  RotateCw,
  Trash2,
  Sparkles,
  Palette,
  MessageSquare,
  MessageSquarePlus,
  StickyNote,
  Search,
  Copy,
  PanelLeft,
  Rows
} from 'lucide-react';
import { TopicPdfAttachment } from '../../types/syllabus';
import { getPdfBlobUrl } from '../../utils/pdfStorage';
import { soundManager } from '../../utils/soundEffects';
import type { PdfFitMode, HighlightToolType, PdfViewMode } from './PdfCanvasViewer';
import {
  PdfColorTheme,
  PDF_THEMES,
  loadPdfColorTheme,
  savePdfColorTheme
} from '../../utils/pdfThemeStorage';
import {
  savePdfReadingProgress,
  getPdfReadingProgress
} from '../../utils/pdfProgressStorage';

const PdfCanvasViewer = React.lazy(() => import('./PdfCanvasViewer').then(m => ({ default: m.PdfCanvasViewer })));
import {
  PdfHighlight,
  HighlightColor,
  HIGHLIGHT_COLORS,
  loadPdfHighlights,
  savePdfHighlights,
  clearPdfHighlights
} from '../../utils/pdfHighlightStorage';
import {
  PdfComment,
  CommentColor,
  CommentCategory,
  COMMENT_COLORS,
  COMMENT_CATEGORIES,
  loadPdfComments,
  savePdfComments,
  updatePdfCommentInList,
  deletePdfCommentFromList
} from '../../utils/pdfCommentStorage';
import { useSyllabus } from '../../context/SyllabusContext';

// Fast, Lightweight Thumbnail Preview for Left Navigation Sidebar
const ThumbnailPreview: React.FC<{
  pdfDoc: any;
  pageNum: number;
  colorTheme: PdfColorTheme;
}> = React.memo(({ pdfDoc, pageNum, colorTheme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    if (!pdfDoc) return;
    let isCancelled = false;

    const renderThumb = async () => {
      try {
        const page = await pdfDoc.getPage(pageNum);
        if (isCancelled) return;
        const unscaledVp = page.getViewport({ scale: 1 });
        const thumbScale = 140 / unscaledVp.width;
        const vp = page.getViewport({ scale: thumbScale });

        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = Math.floor(vp.width);
        canvas.height = Math.floor(vp.height);
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvasContext: ctx, viewport: vp }).promise;
        if (!isCancelled) setRendered(true);
      } catch {}
    };

    renderThumb();
    return () => { isCancelled = true; };
  }, [pdfDoc, pageNum]);

  return (
    <div className="w-full aspect-[1/1.41] rounded-lg bg-slate-900 border border-slate-700/60 overflow-hidden flex items-center justify-center relative shadow-2xs">
      <canvas
        ref={canvasRef}
        className={`w-full h-full object-contain transition-opacity duration-200 ${rendered ? 'opacity-100' : 'opacity-0'}`}
        style={{
          filter: PDF_THEMES[colorTheme]?.canvasFilter || 'none'
        }}
      />
      {!rendered && (
        <div className="absolute inset-0 flex items-center justify-center text-[10px] text-slate-500 font-mono">
          ...
        </div>
      )}
    </div>
  );
});

interface InAppPdfReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  topicId?: string;
  topicName: string;
  subjectName?: string;
  chapterName?: string;
  attachments: TopicPdfAttachment[];
  initialAttachmentId?: string;
  onOpenSplitStudy?: (attachmentId: string) => void;
}

export const InAppPdfReaderModal: React.FC<InAppPdfReaderModalProps> = ({
  isOpen,
  onClose,
  topicId,
  topicName,
  subjectName,
  chapterName,
  attachments = [],
  initialAttachmentId,
  onOpenSplitStudy
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [selectedAttachmentId, setSelectedAttachmentId] = useState<string>(
    initialAttachmentId || (attachments.length > 0 ? attachments[0].id : '')
  );
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(() => {
    const initId = initialAttachmentId || (attachments.length > 0 ? attachments[0].id : '');
    const saved = initId ? getPdfReadingProgress(initId) : null;
    return saved && saved.pageNum >= 1 ? saved.pageNum : 1;
  });
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [showThumbnailSidebar, setShowThumbnailSidebar] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<PdfViewMode>('flow');
  const [pageInputValue, setPageInputValue] = useState<string>(() => {
    const initId = initialAttachmentId || (attachments.length > 0 ? attachments[0].id : '');
    const saved = initId ? getPdfReadingProgress(initId) : null;
    return saved && saved.pageNum >= 1 ? String(saved.pageNum) : '1';
  });

  // Keep page input text synced with live page scroll
  useEffect(() => {
    setPageInputValue(String(currentPage));
  }, [currentPage]);

  const [scale, setScale] = useState<number>(1.0);
  const [fitMode, setFitMode] = useState<PdfFitMode>('fit-width');
  const [rotation, setRotation] = useState<number>(0);
  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(true);
  const [showZoomDropdown, setShowZoomDropdown] = useState<boolean>(false);
  const [pdfColorTheme, setPdfColorTheme] = useState<PdfColorTheme>(() => loadPdfColorTheme());
  const [showThemeDropdown, setShowThemeDropdown] = useState<boolean>(false);

  const handleSetPdfColorTheme = (theme: PdfColorTheme) => {
    soundManager.playClick();
    setPdfColorTheme(theme);
    savePdfColorTheme(theme);
    setShowThemeDropdown(false);
  };

  const handleQuickThemeToggle = () => {
    soundManager.playClick();
    const next: PdfColorTheme = pdfColorTheme === 'light' ? 'dark' : 'light';
    setPdfColorTheme(next);
    savePdfColorTheme(next);
  };

  // Floating HUD auto-dim in fullscreen
  const [isHudVisible, setIsHudVisible] = useState(true);
  const hudTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetHudTimer = () => {
    setIsHudVisible(true);
    if (hudTimeoutRef.current) clearTimeout(hudTimeoutRef.current);
    hudTimeoutRef.current = setTimeout(() => {
      setIsHudVisible(false);
    }, 2500);
  };

  const handleMouseMove = () => {
    if (isFullscreen) {
      resetHudTimer();
    }
  };

  // Highlighter State
  const [isHighlightMode, setIsHighlightMode] = useState<boolean>(false);
  const [highlightColor, setHighlightColor] = useState<HighlightColor>('yellow');
  const [highlightTool, setHighlightTool] = useState<HighlightToolType>('area');
  const [highlights, setHighlights] = useState<PdfHighlight[]>([]);
  const [showColorPalette, setShowColorPalette] = useState<boolean>(false);

  const { exams, updateTopicNotes, updateTopicPdfProgress } = useSyllabus();

  // Sticky Notes / Comment Annotations State
  const [isCommentMode, setIsCommentMode] = useState<boolean>(false);
  const [comments, setComments] = useState<PdfComment[]>([]);
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
  const [showCommentsSidebar, setShowCommentsSidebar] = useState<boolean>(false);
  const [commentSearchQuery, setCommentSearchQuery] = useState<string>('');
  const [commentCategoryFilter, setCommentCategoryFilter] = useState<CommentCategory | 'all'>('all');

  // Cache blob URLs to avoid regenerating object URLs and destroying viewer during scroll or re-renders
  const blobUrlCacheRef = useRef<Map<string, string>>(new Map());

  // Stable active attachment resolution
  const currentAttachment = useMemo(() => {
    return attachments.find(a => a.id === selectedAttachmentId) || attachments[0];
  }, [attachments, selectedAttachmentId]);

  const currentAttachmentId = currentAttachment?.id;
  const currentAttachmentStorageKey = currentAttachment?.storageKey;
  const currentAttachmentUrl = currentAttachment?.url;

  const prevAttachmentIdRef = useRef<string>(selectedAttachmentId);

  // Sync selected attachment when initialAttachmentId changes
  useEffect(() => {
    if (initialAttachmentId) {
      setSelectedAttachmentId(initialAttachmentId);
    } else if (attachments.length > 0 && !selectedAttachmentId) {
      setSelectedAttachmentId(attachments[0].id);
    }
  }, [initialAttachmentId, attachments.length]);

  // Handle switching between attachments (save old, load new)
  useEffect(() => {
    if (selectedAttachmentId && selectedAttachmentId !== prevAttachmentIdRef.current) {
      if (prevAttachmentIdRef.current && currentPage >= 1) {
        savePdfReadingProgress(prevAttachmentIdRef.current, currentPage, totalPages);
        if (topicId && updateTopicPdfProgress) {
          updateTopicPdfProgress(topicId, prevAttachmentIdRef.current, currentPage, totalPages);
        }
      }
      prevAttachmentIdRef.current = selectedAttachmentId;

      const saved = getPdfReadingProgress(selectedAttachmentId);
      if (saved && saved.pageNum >= 1) {
        setCurrentPage(saved.pageNum);
        if (saved.totalPages) setTotalPages(saved.totalPages);
      } else {
        setCurrentPage(1);
      }
    }
  }, [selectedAttachmentId, topicId, updateTopicPdfProgress]);

  // Keep latest progress in ref for unmount cleanup
  const progressRef = useRef({ selectedAttachmentId, currentPage, totalPages, topicId });
  progressRef.current = { selectedAttachmentId, currentPage, totalPages, topicId };

  // Save progress on unmount
  useEffect(() => {
    return () => {
      const { selectedAttachmentId: id, currentPage: p, totalPages: t, topicId: tid } = progressRef.current;
      if (id && p >= 1) {
        savePdfReadingProgress(id, p, t);
        if (tid && updateTopicPdfProgress) {
          updateTopicPdfProgress(tid, id, p, t);
        }
      }
    };
  }, [updateTopicPdfProgress]);

  // Close handler that saves progress before closing
  const handleCloseReader = useCallback(() => {
    if (selectedAttachmentId && currentPage >= 1) {
      savePdfReadingProgress(selectedAttachmentId, currentPage, totalPages);
      if (topicId && updateTopicPdfProgress) {
        updateTopicPdfProgress(topicId, selectedAttachmentId, currentPage, totalPages);
      }
    }
    onClose();
  }, [selectedAttachmentId, currentPage, totalPages, topicId, updateTopicPdfProgress, onClose]);

  // Memoized page navigation callbacks to prevent child prop reference changes
  const handlePageChange = useCallback((page: number, total: number) => {
    setCurrentPage(page);
    setTotalPages(total);
    if (selectedAttachmentId) {
      savePdfReadingProgress(selectedAttachmentId, page, total);
      if (topicId && updateTopicPdfProgress) {
        updateTopicPdfProgress(topicId, selectedAttachmentId, page, total);
      }
    }
  }, [selectedAttachmentId, topicId, updateTopicPdfProgress]);

  const handleLoadSuccess = useCallback((total: number, doc?: any) => {
    setTotalPages(total);
    if (doc) setPdfDoc(doc);
  }, []);

  // Fast jump or scroll to specific page with performance optimization
  const scrollToPage = useCallback((pageNum: number) => {
    if (pageNum < 1 || (totalPages > 0 && pageNum > totalPages)) return;
    soundManager.playClick();
    setCurrentPage(pageNum);
    setPageInputValue(String(pageNum));

    if (selectedAttachmentId) {
      savePdfReadingProgress(selectedAttachmentId, pageNum, totalPages);
      if (topicId && updateTopicPdfProgress) {
        updateTopicPdfProgress(topicId, selectedAttachmentId, pageNum, totalPages);
      }
    }

    if (viewMode === 'single') {
      return;
    }

    const el = modalRef.current?.querySelector<HTMLDivElement>(`[data-page-number="${pageNum}"]`);
    if (el) {
      // For jumps > 2 pages, jump instantly ('auto') to prevent rendering storms across all intermediate pages
      const behavior = Math.abs(pageNum - currentPage) > 2 ? 'auto' : 'smooth';
      el.scrollIntoView({ behavior, block: 'start' });
    }
  }, [totalPages, viewMode, selectedAttachmentId, topicId, updateTopicPdfProgress, currentPage]);

  // Load Saved Highlights & Comments when attachment changes
  useEffect(() => {
    if (selectedAttachmentId) {
      const loadedHl = loadPdfHighlights(selectedAttachmentId);
      setHighlights(loadedHl);
      const loadedCmt = loadPdfComments(selectedAttachmentId);
      setComments(loadedCmt);
    }
  }, [selectedAttachmentId]);

  // Load PDF Blob when selected attachment changes (cached to prevent scroll reset)
  useEffect(() => {
    let isMounted = true;
    if (!isOpen) return;

    if (!currentAttachment) {
      setPdfBlobUrl(null);
      return;
    }

    const key = currentAttachmentStorageKey || currentAttachmentId;
    if (!key && !currentAttachmentUrl) {
      setPdfBlobUrl(null);
      return;
    }

    // 1. Direct Web/Online URL
    if (currentAttachmentUrl) {
      setPdfBlobUrl(currentAttachmentUrl);
      return;
    }

    // 2. Check memory cache first (instant & zero reload)
    if (key && blobUrlCacheRef.current.has(key)) {
      const cached = blobUrlCacheRef.current.get(key)!;
      setPdfBlobUrl(cached);
      return;
    }

    // 3. Load from IndexedDB only if not cached
    const loadPdfData = async () => {
      setIsLoading(true);
      setLoadError(null);

      try {
        const blobUrl = await getPdfBlobUrl(key);

        if (isMounted) {
          if (blobUrl) {
            blobUrlCacheRef.current.set(key, blobUrl);
            setPdfBlobUrl(blobUrl);
          } else {
            setLoadError('Unable to load PDF from storage. The file may need to be re-uploaded.');
          }
        }
      } catch (err) {
        console.error('Error loading PDF in in-app reader:', err);
        if (isMounted) {
          setLoadError('Failed to load PDF document.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadPdfData();

    return () => {
      isMounted = false;
    };
  }, [isOpen, selectedAttachmentId, currentAttachmentId, currentAttachmentStorageKey, currentAttachmentUrl]);

  // Fullscreen Change Listener to keep isFullscreen state synced
  useEffect(() => {
    const handleFsChange = () => {
      const isFs = Boolean(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      );
      setIsFullscreen(isFs);
      if (isFs) {
        setIsHudVisible(true);
        resetHudTimer();
      }
    };

    document.addEventListener('fullscreenchange', handleFsChange);
    document.addEventListener('webkitfullscreenchange', handleFsChange);
    document.addEventListener('mozfullscreenchange', handleFsChange);
    document.addEventListener('MSFullscreenChange', handleFsChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFsChange);
      document.removeEventListener('webkitfullscreenchange', handleFsChange);
      document.removeEventListener('mozfullscreenchange', handleFsChange);
      document.removeEventListener('MSFullscreenChange', handleFsChange);
      if (hudTimeoutRef.current) clearTimeout(hudTimeoutRef.current);
    };
  }, []);

  // Keyboard shortcut listener (ESC to exit fullscreen or close, H to toggle highlighter, Ctrl+Z to undo)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundManager.playClick();
        if (isFullscreen || document.fullscreenElement) {
          if (document.fullscreenElement) {
            document.exitFullscreen?.().catch(() => {});
          } else if ((document as any).webkitExitFullscreen) {
            (document as any).webkitExitFullscreen();
          }
          setIsFullscreen(false);
        } else {
          handleCloseReader();
        }
      } else if (e.key === 'h' || e.key === 'H') {
        // Toggle highlight mode if not focusing an input
        if (document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
          soundManager.playClick();
          setIsHighlightMode(prev => {
            const next = !prev;
            if (next) setIsCommentMode(false);
            return next;
          });
        }
      } else if (e.key === 'n' || e.key === 'N') {
        // Toggle sticky notes / comment mode
        if (document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
          soundManager.playClick();
          setIsCommentMode(prev => {
            const next = !prev;
            if (next) setIsHighlightMode(false);
            return next;
          });
        }
      } else if (e.key === 'r' || e.key === 'R') {
        // Rotate PDF 90 degrees clockwise
        if (document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
          soundManager.playClick();
          setRotation(r => (r + 90) % 360);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        if (document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
          e.preventDefault();
          scrollToPage(currentPage - 1);
        }
      } else if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        if (document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
          e.preventDefault();
          scrollToPage(currentPage + 1);
        }
      } else if (e.key === 'Home') {
        if (document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
          e.preventDefault();
          scrollToPage(1);
        }
      } else if (e.key === 'End') {
        if (document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
          e.preventDefault();
          scrollToPage(totalPages);
        }
      } else if (e.key === 't' || e.key === 'T') {
        if (document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
          soundManager.playClick();
          setShowThumbnailSidebar(prev => !prev);
        }
      } else if (e.key === 'v' || e.key === 'V') {
        if (document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
          soundManager.playClick();
          setViewMode(prev => prev === 'flow' ? 'single' : 'flow');
        }
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'z' || e.key === 'Z')) {
        // Undo last highlight
        handleUndoHighlight();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, isFullscreen, highlights, selectedAttachmentId, currentPage, totalPages, scrollToPage]);

  // Sticky Notes Handlers
  const handleAddComment = (newComment: PdfComment) => {
    setComments(prev => {
      const updated = [...prev, newComment];
      savePdfComments(selectedAttachmentId, updated);
      return updated;
    });
    setActiveCommentId(newComment.id);
  };

  const handleUpdateComment = (commentId: string, updates: Partial<PdfComment>) => {
    setComments(prev => {
      const updated = updatePdfCommentInList(prev, commentId, updates);
      savePdfComments(selectedAttachmentId, updated);
      return updated;
    });
  };

  const handleDeleteComment = (commentId: string) => {
    soundManager.playClick();
    setComments(prev => {
      const updated = deletePdfCommentFromList(prev, commentId);
      savePdfComments(selectedAttachmentId, updated);
      return updated;
    });
    if (activeCommentId === commentId) {
      setActiveCommentId(null);
    }
  };

  const handlePushCommentToNotes = (comment: PdfComment) => {
    if (!comment.text) return;
    const catLabel = COMMENT_CATEGORIES[comment.category]?.label || 'Study Note';
    const catIcon = COMMENT_CATEGORIES[comment.category]?.icon || '📌';
    const citation = `\n\n> ${catIcon} **[PDF Page ${comment.pageNum} - ${catLabel}]:**\n> ${comment.text.split('\n').join('\n> ')}\n`;

    const targetTopicId = topicId || (attachments.length > 0 ? (attachments[0] as any).topicId : undefined);

    let updated = false;
    for (const exam of exams) {
      for (const subj of exam.subjects) {
        for (const chap of subj.chapters) {
          const found = chap.topics.find(
            t => (targetTopicId && t.id === targetTopicId) || (topicName && t.name.toLowerCase() === topicName.toLowerCase())
          );
          if (found) {
            const currentNotes = found.notes || '';
            updateTopicNotes(found.id, currentNotes + citation);
            soundManager.playClick();
            updated = true;
            break;
          }
        }
        if (updated) break;
      }
      if (updated) break;
    }
  };

  // Filtered comments for sidebar drawer
  const filteredComments = comments.filter(c => {
    const matchesSearch =
      !commentSearchQuery ||
      c.text.toLowerCase().includes(commentSearchQuery.toLowerCase()) ||
      COMMENT_CATEGORIES[c.category]?.label.toLowerCase().includes(commentSearchQuery.toLowerCase()) ||
      `page ${c.pageNum}`.includes(commentSearchQuery.toLowerCase());

    const matchesCategory =
      commentCategoryFilter === 'all' || c.category === commentCategoryFilter;

    return matchesSearch && matchesCategory;
  }).sort((a, b) => a.pageNum - b.pageNum);

  // Highlighter Handlers
  const handleAddHighlight = (newHighlight: PdfHighlight) => {
    setHighlights(prev => {
      const updated = [...prev, newHighlight];
      savePdfHighlights(selectedAttachmentId, updated);
      return updated;
    });
  };

  const handleDeleteHighlight = (highlightId: string) => {
    setHighlights(prev => {
      const updated = prev.filter(h => h.id !== highlightId);
      savePdfHighlights(selectedAttachmentId, updated);
      return updated;
    });
  };

  const handleUndoHighlight = () => {
    if (highlights.length === 0) return;
    soundManager.playClick();
    setHighlights(prev => {
      const updated = prev.slice(0, -1);
      savePdfHighlights(selectedAttachmentId, updated);
      return updated;
    });
  };

  const handleClearAllHighlights = () => {
    if (highlights.length === 0) return;
    if (confirm('Clear all highlights on this document?')) {
      soundManager.playClick();
      clearPdfHighlights(selectedAttachmentId);
      setHighlights([]);
    }
  };

  // Fullscreen API toggle - Targets modalRef directly for pure PDF view
  const toggleFullscreen = () => {
    soundManager.playClick();
    const el = modalRef.current;

    const isCurrentlyFs = Boolean(
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement
    );

    if (!isCurrentlyFs && !isFullscreen) {
      setIsFullscreen(true);
      setIsHudVisible(true);
      resetHudTimer();
      if (el?.requestFullscreen) {
        el.requestFullscreen().catch(() => {});
      } else if ((el as any)?.webkitRequestFullscreen) {
        try { (el as any).webkitRequestFullscreen(); } catch {}
      }
    } else {
      setIsFullscreen(false);
      if (document.fullscreenElement) {
        document.exitFullscreen?.().catch(() => {});
      } else if ((document as any)?.webkitExitFullscreen) {
        try { (document as any).webkitExitFullscreen(); } catch {}
      }
    }
  };


  const handlePageInputSubmit = () => {
    const p = parseInt(pageInputValue, 10);
    if (!isNaN(p) && p >= 1 && (totalPages === 0 || p <= totalPages)) {
      if (p !== currentPage) {
        scrollToPage(p);
      }
    } else {
      setPageInputValue(String(currentPage));
    }
  };

  if (!isOpen) return null;

  const handleDownload = () => {
    if (!currentAttachment) return;
    soundManager.playCompleteChime();
    const fileName = currentAttachment.name.endsWith('.pdf') ? currentAttachment.name : `${currentAttachment.name}.pdf`;

    if (pdfBlobUrl) {
      const a = document.createElement('a');
      a.href = pdfBlobUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return createPortal(
    <div
      ref={modalRef}
      onMouseMove={handleMouseMove}
      onClick={e => e.stopPropagation()}
      onMouseDown={e => e.stopPropagation()}
      onTouchStart={e => e.stopPropagation()}
      className={`fixed inset-0 z-[9999] flex flex-col bg-[#16161E] text-[#C0CAF5] animate-fade-in select-none overflow-hidden font-sans ${
        isFullscreen ? 'w-screen h-screen' : ''
      }`}
    >
      
      {/* 1. SINGLE SLEEK COMPACT TOP HEADER BAR (HIDDEN IN FULLSCREEN) */}
      {!isFullscreen && (
        <div className="px-3 sm:px-5 py-2 bg-[#1F2335]/95 backdrop-blur-md border-b border-[#292E42] flex items-center justify-between gap-2 shrink-0 z-30 shadow-md">
          
          {/* Left: Back Arrow, Thumbnails Drawer Toggle & Document Info */}
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                handleCloseReader();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#24283B] hover:bg-[#7AA2F7] hover:text-[#1A1B26] text-white text-xs font-bold transition-all border border-[#292E42] hover:border-[#7AA2F7] cursor-pointer shadow-sm active:scale-95 group shrink-0"
              title="Go back to Topic Notes (Esc)"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span className="hidden sm:inline">Back</span>
            </button>

            {/* THUMBNAILS SIDEBAR TOGGLE */}
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setShowThumbnailSidebar(prev => !prev);
              }}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95 shrink-0 ${
                showThumbnailSidebar
                  ? 'bg-[#7AA2F7] text-[#1A1B26] border-[#7AA2F7] font-black shadow-[0_0_12px_rgba(122,162,247,0.4)]'
                  : 'bg-[#24283B] hover:bg-[#2F354D] text-[#A9B1D6] hover:text-white border-[#292E42]'
              }`}
              title="Toggle Thumbnails Sidebar (Shortcut: T)"
            >
              <PanelLeft className="w-4 h-4" />
              <span className="hidden md:inline">Thumbnails</span>
            </button>

            <div className="min-w-0 flex items-center gap-2">
              {attachments.length > 1 ? (
                <div className="relative max-w-[150px] sm:max-w-xs">
                  <select
                    value={selectedAttachmentId}
                    onChange={e => {
                      soundManager.playClick();
                      setSelectedAttachmentId(e.target.value);
                    }}
                    className="w-full pl-2.5 pr-7 py-1 rounded-xl bg-[#24283B] border border-[#292E42] text-xs font-bold text-white focus:outline-none focus:border-[#7AA2F7] appearance-none cursor-pointer truncate"
                  >
                    {attachments.map(att => (
                      <option key={att.id} value={att.id}>
                        📑 {att.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-[#A9B1D6] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              ) : (
                <div className="truncate flex items-center gap-2">
                  <img src="/pdf_icon_3d.png" alt="PDF" className="w-5 h-5 object-contain shrink-0 drop-shadow-sm" />
                  <span className="text-xs sm:text-sm font-bold text-white truncate max-w-[120px] sm:max-w-sm">
                    {currentAttachment?.name || topicName}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Center: Interactive Page Jumper & View Mode Switcher */}
          {totalPages > 0 && (
            <div className="flex items-center gap-2">
              {/* Stepper with Direct Numeric Page Input */}
              <div className="flex items-center gap-1 sm:gap-1.5 px-2 py-1 rounded-xl bg-[#24283B] border border-[#292E42] text-xs font-mono font-bold text-[#A9B1D6]">
                <button
                  type="button"
                  disabled={currentPage <= 1}
                  onClick={() => scrollToPage(currentPage - 1)}
                  className="p-1 hover:text-white disabled:opacity-30 cursor-pointer rounded-lg hover:bg-white/5 active:scale-95 transition-all"
                  title="Previous Page (Left Arrow / Page Up)"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span className="hidden sm:inline text-slate-400 font-sans text-[11px] font-semibold">Page</span>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handlePageInputSubmit();
                  }}
                  className="inline-flex items-center"
                >
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={pageInputValue}
                    onChange={(e) => setPageInputValue(e.target.value.replace(/[^0-9]/g, ''))}
                    onFocus={(e) => e.target.select()}
                    onBlur={handlePageInputSubmit}
                    className="w-10 sm:w-12 text-center py-0.5 px-1 rounded-lg bg-[#16161E] text-white font-bold font-mono border border-slate-700/60 focus:border-[#7AA2F7] focus:ring-1 focus:ring-[#7AA2F7] outline-none text-xs transition-all"
                    title="Click to jump to any page number (Press Enter)"
                  />
                </form>
                <span className="text-slate-500">/</span>
                <span className="text-[#7AA2F7] font-mono">{totalPages}</span>
                <button
                  type="button"
                  disabled={currentPage >= totalPages}
                  onClick={() => scrollToPage(currentPage + 1)}
                  className="p-1 hover:text-white disabled:opacity-30 cursor-pointer rounded-lg hover:bg-white/5 active:scale-95 transition-all"
                  title="Next Page (Right Arrow / Page Down / Space)"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* View Mode Switcher: Flow vs Single */}
              <div className="hidden lg:flex items-center bg-[#24283B] p-0.5 rounded-xl border border-[#292E42]">
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setViewMode('flow');
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    viewMode === 'flow'
                      ? 'bg-[#7AA2F7] text-[#1A1B26] font-black shadow-2xs'
                      : 'text-[#A9B1D6] hover:text-white hover:bg-white/5'
                  }`}
                  title="Continuous Scroll Mode: Read entire document vertically"
                >
                  <Rows className="w-3.5 h-3.5" />
                  <span>Scroll</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setViewMode('single');
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    viewMode === 'single'
                      ? 'bg-[#7AA2F7] text-[#1A1B26] font-black shadow-2xs'
                      : 'text-[#A9B1D6] hover:text-white hover:bg-white/5'
                  }`}
                  title="Single Page Mode: Flip page-by-page like slides/presentation (Instant 0ms flip)"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Single</span>
                </button>
              </div>
            </div>
          )}

          {/* Right Action Tools: Highlighter, Chrome Fit Mode, Zoom, Split Study, Download & Fullscreen */}
          <div className="flex items-center gap-1.5 shrink-0">
            
            {/* HIGHLIGHTER MAIN TOGGLE */}
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setIsHighlightMode(prev => {
                  const next = !prev;
                  if (next) setIsCommentMode(false);
                  return next;
                });
              }}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95 ${
                isHighlightMode
                  ? 'bg-amber-400 text-[#12131A] border-amber-300 font-black shadow-[0_0_18px_rgba(251,191,36,0.5)]'
                  : 'bg-[#24283B] hover:bg-[#2F354D] text-[#A9B1D6] hover:text-white border-[#292E42]'
              }`}
              title="Toggle PDF Highlighter (Shortcut: H)"
            >
              <Highlighter className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
              <span className="hidden sm:inline">Highlight</span>
              {highlights.length > 0 && (
                <span className={`px-1.5 py-0.2 rounded-full text-[11px] font-mono font-bold ${
                  isHighlightMode ? 'bg-[#12131A] text-amber-300' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}>
                  {highlights.length}
                </span>
              )}
            </button>

            {/* STICKY NOTE / COMMENT MAIN TOGGLE */}
            <button
              type="button"
              data-testid="pdf-note-tool-btn"
              onClick={() => {
                soundManager.playClick();
                setIsCommentMode(prev => {
                  const next = !prev;
                  if (next) setIsHighlightMode(false);
                  return next;
                });
              }}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95 ${
                isCommentMode
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-blue-400 font-black shadow-[0_0_18px_rgba(59,130,246,0.5)]'
                  : 'bg-[#24283B] hover:bg-[#2F354D] text-[#A9B1D6] hover:text-white border-[#292E42]'
              }`}
              title="Add Sticky Note or Comment anywhere on PDF (Shortcut: N)"
            >
              <MessageSquarePlus className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
              <span className="hidden sm:inline">Note</span>
              {comments.length > 0 && (
                <span className={`px-1.5 py-0.2 rounded-full text-[11px] font-mono font-bold ${
                  isCommentMode ? 'bg-white text-blue-700' : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                }`}>
                  {comments.length}
                </span>
              )}
            </button>

            {/* ALL NOTES SIDEBAR DRAWER TOGGLE */}
            <button
              type="button"
              data-testid="pdf-all-notes-btn"
              onClick={() => {
                soundManager.playClick();
                setShowCommentsSidebar(prev => !prev);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95 ${
                showCommentsSidebar
                  ? 'bg-blue-600/30 text-[#93C5FD] border-blue-500/50'
                  : 'bg-[#24283B] hover:bg-[#2F354D] text-[#A9B1D6] hover:text-white border-[#292E42]'
              }`}
              title="View all sticky notes & comments across pages"
            >
              <StickyNote className="w-3.5 h-3.5" />
              <span className="hidden md:inline">All Notes</span>
              {comments.length > 0 && (
                <span className="text-[10px] font-mono text-blue-300">({comments.length})</span>
              )}
            </button>

            {/* CHROME-STYLE FIT TO PAGE / FIT TO WIDTH TOGGLE */}
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                if (fitMode === 'fit-page') {
                  setFitMode('fit-width');
                } else {
                  setFitMode('fit-page');
                  setScale(1.0);
                }
              }}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95 ${
                fitMode === 'fit-page'
                  ? 'bg-[#7AA2F7] text-[#1A1B26] border-[#7AA2F7] font-black'
                  : 'bg-[#24283B] hover:bg-[#2F354D] text-[#A9B1D6] hover:text-white border-[#292E42]'
              }`}
              title={fitMode === 'fit-page' ? 'Switch to Fit Width (100% full-width view)' : 'Fit Entire Page to Screen (Chrome style full page view)'}
            >
              {fitMode === 'fit-page' ? <Shrink className="w-3.5 h-3.5" /> : <Expand className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{fitMode === 'fit-page' ? 'Fit Page' : 'Fit to Page'}</span>
            </button>

            {/* Zoom Controls with Presets Dropdown */}
            <div className="relative flex items-center bg-[#24283B] p-0.5 rounded-xl border border-[#292E42]">
              <button
                type="button"
                onClick={() => {
                  setFitMode('custom');
                  setScale(s => Math.max(s - 0.2, 0.4));
                }}
                className="p-1.5 rounded-lg hover:bg-[#2F354D] text-[#A9B1D6] hover:text-white cursor-pointer"
                title="Zoom Out (-)"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setShowZoomDropdown(p => !p)}
                className="px-2 py-0.5 text-[11px] font-mono font-bold text-[#7AA2F7] hover:bg-[#2F354D] rounded-md cursor-pointer flex items-center gap-0.5"
                title="Zoom Presets"
              >
                <span>{Math.round(scale * 100)}%</span>
                <ChevronDown className="w-2.5 h-2.5 opacity-70" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setFitMode('custom');
                  setScale(s => Math.min(s + 0.2, 3.0));
                }}
                className="p-1.5 rounded-lg hover:bg-[#2F354D] text-[#A9B1D6] hover:text-white cursor-pointer"
                title="Zoom In (+)"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>

              {/* Zoom Presets Menu */}
              {showZoomDropdown && (
                <div className="absolute right-0 top-full mt-2 w-36 rounded-xl bg-[#1F2335] border border-[#292E42] shadow-2xl p-1.5 space-y-1 z-50 animate-fade-in">
                  {[
                    { label: 'Fit to Width (↔)', mode: 'fit-width' as PdfFitMode, scale: 1.0 },
                    { label: 'Fit to Page (↕)', mode: 'fit-page' as PdfFitMode, scale: 1.0 },
                    { label: '50%', mode: 'custom' as PdfFitMode, scale: 0.5 },
                    { label: '75%', mode: 'custom' as PdfFitMode, scale: 0.75 },
                    { label: '100% (Actual)', mode: 'custom' as PdfFitMode, scale: 1.0 },
                    { label: '125%', mode: 'custom' as PdfFitMode, scale: 1.25 },
                    { label: '150%', mode: 'custom' as PdfFitMode, scale: 1.5 },
                    { label: '200%', mode: 'custom' as PdfFitMode, scale: 2.0 },
                  ].map(opt => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        setFitMode(opt.mode);
                        setScale(opt.scale);
                        setShowZoomDropdown(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#24283B] text-xs font-semibold text-[#A9B1D6] hover:text-white flex items-center justify-between cursor-pointer"
                    >
                      <span>{opt.label}</span>
                      {((opt.mode === 'fit-page' && fitMode === 'fit-page') ||
                        (opt.mode === 'fit-width' && fitMode === 'fit-width') ||
                        (opt.mode === 'custom' && fitMode === 'custom' && Math.abs(scale - opt.scale) < 0.05)) && (
                        <Check className="w-3.5 h-3.5 text-[#7AA2F7]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ROTATE 90° CLOCKWISE */}
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setRotation(r => (r + 90) % 360);
              }}
              className="flex items-center gap-1 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-[#24283B] hover:bg-[#2F354D] text-[#A9B1D6] hover:text-white border border-[#292E42] transition-colors cursor-pointer active:scale-95 shadow-sm"
              title={`Rotate 90° clockwise (Shortcut: R)${rotation > 0 ? ` - Current: ${rotation}°` : ''}`}
            >
              <RotateCw className="w-3.5 h-3.5" />
              {rotation > 0 && (
                <span className="text-[10px] font-mono font-bold text-[#7AA2F7]">{rotation}°</span>
              )}
            </button>

            {/* AUTO-ROTATE TO MATCH PHONE ORIENTATION */}
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setIsAutoRotate(prev => !prev);
              }}
              className={`hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95 ${
                isAutoRotate
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.25)] font-black'
                  : 'bg-[#24283B] hover:bg-[#2F354D] text-[#A9B1D6] hover:text-white border-[#292E42]'
              }`}
              title={isAutoRotate ? 'Auto-Rotate ON: Automatically matches PDF orientation to device tilt' : 'Auto-Rotate OFF: Manual orientation'}
            >
              <span className="text-[11px] font-mono">Auto</span>
            </button>

            {/* EYE-CARE / NIGHT READING THEMES */}
            <div className="relative flex items-center">
              <button
                type="button"
                onClick={handleQuickThemeToggle}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-l-xl border-y border-l text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95 ${
                  pdfColorTheme !== 'light'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                    : 'bg-[#24283B] hover:bg-[#2F354D] text-[#A9B1D6] hover:text-white border-[#292E42]'
                }`}
                title={pdfColorTheme === 'light' ? 'Switch to Night Mode (Glare-free dark background)' : 'Switch to Day Mode (Original white)'}
              >
                <span className="text-sm leading-none">{PDF_THEMES[pdfColorTheme].badge}</span>
                <span className="hidden sm:inline font-medium">
                  {pdfColorTheme === 'light' ? 'Night Mode' : PDF_THEMES[pdfColorTheme].shortLabel}
                </span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowZoomDropdown(false);
                  setShowThemeDropdown(prev => !prev);
                }}
                className={`px-1.5 py-1.5 rounded-r-xl border text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95 ${
                  pdfColorTheme !== 'light'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-[#24283B] hover:bg-[#2F354D] text-[#A9B1D6] hover:text-white border-[#292E42]'
                }`}
                title="Choose Eye-Care Reading Mode: Night, OLED Pure Black, Sepia, Day"
              >
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showThemeDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* Reading Themes Menu */}
              {showThemeDropdown && (
                <div className="absolute right-0 top-full mt-2 w-64 rounded-xl bg-[#1F2335] border border-[#292E42] shadow-2xl p-1.5 space-y-1 z-50 animate-fade-in">
                  <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Eye-Care Reading Themes
                  </div>
                  {(['dark', 'oled', 'sepia', 'light'] as PdfColorTheme[]).map(themeKey => {
                    const item = PDF_THEMES[themeKey];
                    const isSelected = pdfColorTheme === themeKey;
                    return (
                      <button
                        key={themeKey}
                        type="button"
                        onClick={() => handleSetPdfColorTheme(themeKey)}
                        className={`w-full text-left px-2.5 py-2 rounded-lg transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-blue-600/30 text-white font-bold border border-blue-500/30'
                            : 'hover:bg-[#24283B] text-[#A9B1D6] hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-base">{item.badge}</span>
                          <div>
                            <div className="text-xs font-semibold flex items-center gap-1.5">
                              <span>{item.name}</span>
                              {themeKey === 'dark' && (
                                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 font-bold">
                                  Recommended
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-slate-400 font-normal leading-tight mt-0.5">
                              {item.description}
                            </div>
                          </div>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#7AA2F7] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Split Study Quick Switch */}
            {onOpenSplitStudy && (
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  handleCloseReader();
                  onOpenSplitStudy(selectedAttachmentId);
                }}
                title="Open Split-Screen to read this PDF and take notes side-by-side"
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#7AA2F7]/15 hover:bg-[#7AA2F7]/25 border border-[#7AA2F7]/30 text-[#7AA2F7] text-xs font-bold transition-all cursor-pointer shadow-sm"
              >
                <Columns className="w-3.5 h-3.5" />
                <span>Split Study</span>
              </button>
            )}

            {/* Download PDF Button */}
            {currentAttachment && (
              <button
                type="button"
                onClick={handleDownload}
                title={`Download ${currentAttachment.name}`}
                className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1 cursor-pointer transition-all shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Download</span>
              </button>
            )}

            {/* Fullscreen Toggle Button */}
            <button
              type="button"
              data-testid="pdf-fullscreen-btn"
              onClick={toggleFullscreen}
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter 100% Fullscreen PDF (Only PDF)'}
              className="p-1.5 rounded-xl bg-[#24283B] hover:bg-[#2F354D] text-[#A9B1D6] hover:text-white border border-[#292E42] transition-colors cursor-pointer flex items-center justify-center active:scale-95"
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="p-1.5 rounded-xl bg-[#24283B] hover:bg-rose-500/20 text-[#A9B1D6] hover:text-rose-400 border border-[#292E42] transition-colors cursor-pointer"
              title="Close PDF View (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 2. DEDICATED HIGHLIGHTER PALETTE SUB-TOOLBAR (HIDDEN IN FULLSCREEN) */}
      {!isFullscreen && isHighlightMode && (
        <div className="px-3 sm:px-5 py-2 bg-gradient-to-r from-[#181A28] via-[#1F2335] to-[#181A28] border-b border-amber-500/30 flex items-center justify-between gap-3 shrink-0 z-25 shadow-lg animate-fade-in flex-wrap">
          
          {/* Left: Color Palette Picker */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Color:</span>
            </span>

            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#141520] border border-[#2E3147]">
              {(['yellow', 'green', 'pink', 'cyan', 'purple'] as HighlightColor[]).map(c => {
                const colorMeta = HIGHLIGHT_COLORS[c];
                const isSelected = highlightColor === c;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setHighlightColor(c);
                    }}
                    style={{ backgroundColor: colorMeta.hex }}
                    className={`w-6 h-6 rounded-lg transition-all cursor-pointer relative flex items-center justify-center ${
                      isSelected
                        ? 'scale-115 ring-2 ring-white ring-offset-2 ring-offset-[#141520] shadow-[0_0_12px_rgba(255,255,255,0.4)]'
                        : 'opacity-70 hover:opacity-100 hover:scale-105'
                    }`}
                    title={colorMeta.label}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#141520] stroke-[3]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Center: Highlight Tool Selector (Box Area vs Freehand vs Eraser) */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-[#141520] border border-[#2E3147]">
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setHighlightTool('area');
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                highlightTool === 'area'
                  ? 'bg-amber-400 text-[#12131A] shadow-sm font-black'
                  : 'text-[#A9B1D6] hover:text-white hover:bg-white/5'
              }`}
              title="Box / Area Highlighter (Click & drag over formulas, paragraphs, questions)"
            >
              <Square className="w-3.5 h-3.5" />
              <span>Box Area</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setHighlightTool('freehand');
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                highlightTool === 'freehand'
                  ? 'bg-amber-400 text-[#12131A] shadow-sm font-black'
                  : 'text-[#A9B1D6] hover:text-white hover:bg-white/5'
              }`}
              title="Freehand Pen (Draw smooth highlight strokes or circles)"
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>Freehand</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setHighlightTool('eraser');
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                highlightTool === 'eraser'
                  ? 'bg-rose-500 text-white shadow-sm font-black'
                  : 'text-[#A9B1D6] hover:text-rose-300 hover:bg-white/5'
              }`}
              title="Eraser Mode (Click any highlight to remove it)"
            >
              <Eraser className="w-3.5 h-3.5" />
              <span>Eraser</span>
            </button>
          </div>

          {/* Right: Undo, Clear All & Stats */}
          <div className="flex items-center gap-1.5 text-xs">
            <button
              type="button"
              disabled={highlights.length === 0}
              onClick={handleUndoHighlight}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#24283B] hover:bg-[#2F354D] disabled:opacity-40 text-[#A9B1D6] hover:text-white border border-[#292E42] cursor-pointer transition-all active:scale-95"
              title="Undo last highlight (Ctrl+Z)"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Undo</span>
            </button>

            <button
              type="button"
              disabled={highlights.length === 0}
              onClick={handleClearAllHighlights}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 disabled:opacity-40 text-rose-400 border border-rose-500/20 cursor-pointer transition-all active:scale-95"
              title="Clear all highlights"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Clear All</span>
            </button>

            <span className="px-2 py-0.5 rounded-lg bg-amber-500/15 border border-amber-500/25 font-mono text-[11px] font-bold text-amber-300">
              {highlights.length} Highlights
            </span>
          </div>
        </div>
      )}

      {/* 2.5 DEDICATED STICKY NOTE COMMENT MODE BANNER (HIDDEN IN FULLSCREEN) */}
      {!isFullscreen && isCommentMode && (
        <div className="px-3 sm:px-5 py-2 bg-gradient-to-r from-blue-950/90 via-[#1F2335] to-indigo-950/90 border-b border-blue-500/30 flex items-center justify-between gap-3 shrink-0 z-25 shadow-lg animate-fade-in flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
            <span className="text-xs font-bold text-blue-200 flex items-center gap-1.5">
              <span>💬 Click anywhere on any page to drop a sticky note pin</span>
            </span>
            <span className="hidden sm:inline text-[11px] text-blue-300/80 bg-blue-500/10 px-2 py-0.5 rounded-md border border-blue-500/20">
              Drag pins to move · 5 High-yield tags · 1-click Push to Notes
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowCommentsSidebar(true)}
              className="text-xs font-bold text-blue-300 hover:text-white px-2.5 py-1 rounded-lg bg-blue-600/25 hover:bg-blue-600/40 border border-blue-500/30 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <StickyNote className="w-3.5 h-3.5" />
              <span>All Notes ({comments.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setIsCommentMode(false)}
              className="text-xs font-semibold text-slate-400 hover:text-white px-2 py-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              Exit Mode
            </button>
          </div>
        </div>
      )}

      {/* 3. SLEEK FLOATING ZEN CONTROLS HUD (ONLY VISIBLE IN FULLSCREEN) */}
      {isFullscreen && (
        <div
          className={`fixed top-4 right-4 sm:top-5 sm:right-6 z-50 flex items-center gap-1.5 p-1.5 rounded-full bg-[#16161E]/85 backdrop-blur-xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.7)] text-white transition-all duration-300 ${
            isHudVisible ? 'opacity-100 translate-y-0' : 'opacity-20 hover:opacity-100 translate-y-0'
          }`}
          onMouseEnter={() => setIsHudVisible(true)}
        >
          {/* Document Title Tag */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-white/90 max-w-[180px] truncate">
            <FileText className="w-3.5 h-3.5 text-[#7AA2F7] shrink-0" />
            <span className="truncate">{currentAttachment?.name || topicName}</span>
          </div>

          {/* Page Counter & Quick Navigation */}
          {totalPages > 0 && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 text-xs font-mono font-bold">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => scrollToPage(currentPage - 1)}
                className="p-0.5 hover:text-white disabled:opacity-30 cursor-pointer"
                title="Previous Page"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span>{currentPage}</span>
              <span className="text-white/40">/</span>
              <span className="text-[#7AA2F7]">{totalPages}</span>
              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => scrollToPage(currentPage + 1)}
                className="p-0.5 hover:text-white disabled:opacity-30 cursor-pointer"
                title="Next Page"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Chrome Fit Mode Toggle */}
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              if (fitMode === 'fit-page') {
                setFitMode('fit-width');
              } else {
                setFitMode('fit-page');
                setScale(1.0);
              }
            }}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
              fitMode === 'fit-page'
                ? 'bg-[#7AA2F7] text-[#1A1B26] font-black'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
            title={fitMode === 'fit-page' ? 'Switch to Fit Width' : 'Fit Entire Page to Screen'}
          >
            {fitMode === 'fit-page' ? <Shrink className="w-3.5 h-3.5" /> : <Expand className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{fitMode === 'fit-page' ? 'Fit Page' : 'Fit'}</span>
          </button>

          {/* Zoom Controls */}
          <div className="flex items-center gap-0.5 bg-white/10 px-1 py-0.5 rounded-full">
            <button
              type="button"
              onClick={() => {
                setFitMode('custom');
                setScale(s => Math.max(s - 0.2, 0.4));
              }}
              className="p-1 rounded-full hover:bg-white/20 text-white/80 hover:text-white cursor-pointer"
              title="Zoom Out (-)"
            >
              <ZoomOut className="w-3 h-3" />
            </button>

            <span className="text-[11px] font-mono font-bold text-[#7AA2F7] px-1">
              {Math.round(scale * 100)}%
            </span>

            <button
              type="button"
              onClick={() => {
                setFitMode('custom');
                setScale(s => Math.min(s + 0.2, 3.0));
              }}
              className="p-1 rounded-full hover:bg-white/20 text-white/80 hover:text-white cursor-pointer"
              title="Zoom In (+)"
            >
              <ZoomIn className="w-3 h-3" />
            </button>
          </div>

          {/* Rotate 90° Clockwise in Fullscreen HUD */}
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setRotation(r => (r + 90) % 360);
            }}
            className="flex items-center gap-1 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white cursor-pointer active:scale-95"
            title={`Rotate 90° (Shortcut: R)${rotation > 0 ? ` (${rotation}°)` : ''}`}
          >
            <RotateCw className="w-3 h-3" />
            {rotation > 0 && (
              <span className="text-[10px] font-mono font-bold text-[#7AA2F7]">{rotation}°</span>
            )}
          </button>

          {/* Auto-Rotate Toggle in Fullscreen HUD */}
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setIsAutoRotate(prev => !prev);
            }}
            className={`hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
              isAutoRotate ? 'bg-emerald-500/30 text-emerald-300 font-bold' : 'bg-white/10 text-white/70 hover:text-white'
            }`}
            title={isAutoRotate ? 'Auto-Rotate ON' : 'Auto-Rotate OFF'}
          >
            Auto
          </button>

          {/* Eye-Care Night Mode Quick Toggle in Fullscreen HUD */}
          <button
            type="button"
            onClick={handleQuickThemeToggle}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
              pdfColorTheme !== 'light'
                ? 'bg-amber-400 text-slate-950 font-black shadow-[0_0_12px_rgba(251,191,36,0.5)]'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
            title={pdfColorTheme === 'light' ? 'Turn ON Eye-Care Night Mode' : `Reading Theme: ${PDF_THEMES[pdfColorTheme].name} (Click to toggle)`}
          >
            <span>{PDF_THEMES[pdfColorTheme].badge}</span>
            <span className="hidden sm:inline">{PDF_THEMES[pdfColorTheme].shortLabel}</span>
          </button>

          {/* Note Mode Toggle in Fullscreen HUD */}
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setIsCommentMode(prev => {
                const next = !prev;
                if (next) setIsHighlightMode(false);
                return next;
              });
            }}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
              isCommentMode
                ? 'bg-blue-500 text-white font-black shadow-[0_0_12px_rgba(59,130,246,0.6)]'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
            title="Toggle PDF Sticky Notes (Shortcut: N - Click anywhere on page)"
          >
            <MessageSquarePlus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Note</span>
            {comments.length > 0 && (
              <span className="text-[10px] font-mono opacity-90 font-bold bg-white/20 px-1.5 py-0.2 rounded-full">
                {comments.length}
              </span>
            )}
          </button>

          {/* All Notes Sidebar Toggle in Fullscreen HUD */}
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setShowCommentsSidebar(prev => !prev);
            }}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
              showCommentsSidebar
                ? 'bg-blue-600/60 text-white border border-blue-400'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
            title="All Notes Drawer"
          >
            <StickyNote className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Notes</span>
          </button>

          <div className="w-[1px] h-4 bg-white/20 mx-0.5" />

          {/* Exit Fullscreen Button */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7AA2F7] hover:bg-[#6090F5] text-[#1A1B26] text-xs font-black transition-all cursor-pointer shadow-md active:scale-95"
            title="Exit Fullscreen (Esc)"
          >
            <Minimize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exit Fullscreen</span>
          </button>

          {/* Close Entire Modal */}
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              if (document.fullscreenElement) {
                document.exitFullscreen?.().catch(() => {});
              }
              setIsFullscreen(false);
              handleCloseReader();
            }}
            className="p-1.5 rounded-full hover:bg-rose-500/20 text-white/70 hover:text-rose-400 transition-all cursor-pointer"
            title="Close PDF View (Esc)"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 4. MAIN WORKSPACE WITH OPTIONAL THUMBNAIL SIDEBAR */}
      <div className="flex-1 relative min-h-0 w-full h-full bg-[#16161E] flex flex-row overflow-hidden" onClick={() => setShowZoomDropdown(false)}>
        {/* Left Thumbnails Sidebar Drawer */}
        {showThumbnailSidebar && !isFullscreen && totalPages > 0 && (
          <div className="w-48 sm:w-56 md:w-60 bg-[#141624] border-r border-[#292E42] flex flex-col shrink-0 z-20 shadow-2xl animate-fade-in select-none">
            {/* Sidebar Header */}
            <div className="px-3.5 py-3 bg-[#1A1D2D] border-b border-[#292E42] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PanelLeft className="w-4 h-4 text-[#7AA2F7]" />
                <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">Pages</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#24283B] text-[#7AA2F7] font-bold">
                  {totalPages}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowThumbnailSidebar(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Close thumbnails (T)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>

            {/* Thumbnails Scrollable List */}
            <div className="flex-1 overflow-y-auto p-2.5 space-y-2.5 custom-scrollbar">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pNum) => {
                const isActive = pNum === currentPage;
                const hCount = highlights.filter(h => h.pageNum === pNum).length;
                const cCount = comments.filter(c => c.pageNum === pNum).length;

                return (
                  <button
                    key={pNum}
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      scrollToPage(pNum);
                    }}
                    className={`w-full text-left rounded-xl p-2 transition-all cursor-pointer flex flex-col items-center gap-1.5 group ${
                      isActive
                        ? 'bg-blue-600/25 border-2 border-[#7AA2F7] shadow-[0_0_15px_rgba(122,162,247,0.3)] ring-1 ring-[#7AA2F7]'
                        : 'bg-[#1F2335]/70 hover:bg-[#24283B] border border-[#292E42] hover:border-slate-600'
                    }`}
                  >
                    {/* Thumbnail Header Row */}
                    <div className="w-full flex items-center justify-between px-1 text-[11px] font-mono">
                      <span className={`font-bold ${isActive ? 'text-[#7AA2F7]' : 'text-slate-400 group-hover:text-white'}`}>
                        Page {pNum}
                      </span>
                      <div className="flex items-center gap-1">
                        {hCount > 0 && (
                          <span className="px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                            {hCount}
                          </span>
                        )}
                        {cCount > 0 && (
                          <span className="px-1.5 py-0.2 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold">
                            {cCount}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Miniature Page Snapshot */}
                    <ThumbnailPreview
                      pdfDoc={pdfDoc}
                      pageNum={pNum}
                      colorTheme={pdfColorTheme}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Right Canvas Workspace Container */}
        <div className="flex-1 relative min-h-0 w-full h-full flex flex-col overflow-hidden">
          {isLoading ? (
            <div className="m-auto flex flex-col items-center gap-3.5 text-center p-6">
              <div className="w-10 h-10 rounded-full border-3 border-[#7AA2F7] border-t-transparent animate-spin" />
              <div>
                <h4 className="text-sm font-bold text-white">Opening PDF Viewer...</h4>
                <p className="text-xs text-[#A9B1D6] mt-1 font-mono">Loading high-resolution pages</p>
              </div>
            </div>
          ) : loadError ? (
            <div className="m-auto text-center p-8 max-w-md space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h4 className="text-sm sm:text-base font-bold text-white">Unable to Display PDF</h4>
              <p className="text-xs text-[#A9B1D6] leading-relaxed">{loadError}</p>
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  handleCloseReader();
                }}
                className="px-4 py-2 rounded-xl bg-[#24283B] hover:bg-[#2F354D] text-white text-xs font-bold border border-[#292E42] transition-all cursor-pointer"
              >
                ← Return to Notes
              </button>
            </div>
          ) : pdfBlobUrl ? (
            <React.Suspense
              fallback={
                <div className="m-auto flex flex-col items-center gap-3.5 text-center p-6">
                  <div className="w-10 h-10 rounded-full border-3 border-[#7AA2F7] border-t-transparent animate-spin" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Opening PDF Viewer...</h4>
                    <p className="text-xs text-[#A9B1D6] mt-1 font-mono">Initializing viewer engine</p>
                  </div>
                </div>
              }
            >
              <PdfCanvasViewer
                pdfUrl={pdfBlobUrl}
                docId={selectedAttachmentId}
                initialPage={currentPage}
                currentPage={currentPage}
                targetPage={currentPage}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                scale={scale}
                onScaleChange={setScale}
                fitMode={fitMode}
                onFitModeChange={setFitMode}
                rotation={rotation}
                onRotationChange={setRotation}
                isAutoRotate={isAutoRotate}
                onAutoRotateChange={setIsAutoRotate}
                onLoadSuccess={handleLoadSuccess}
                onPageChange={handlePageChange}
                colorTheme={pdfColorTheme}
                onColorThemeChange={setPdfColorTheme}
                isHighlightMode={isHighlightMode}
                highlightColor={highlightColor}
                highlightTool={highlightTool}
                highlights={highlights}
                onAddHighlight={handleAddHighlight}
                onDeleteHighlight={handleDeleteHighlight}
                isCommentMode={isCommentMode}
                comments={comments}
                onAddComment={handleAddComment}
                onUpdateComment={handleUpdateComment}
                onDeleteComment={handleDeleteComment}
                activeCommentId={activeCommentId}
                onSelectComment={setActiveCommentId}
                onPushCommentToNotes={handlePushCommentToNotes}
                showInlineControls={false}
                className="flex-1 min-h-0 w-full h-full"
              />
            </React.Suspense>
          ) : (
            <div className="m-auto text-center p-6 space-y-2">
              <FileText className="w-10 h-10 text-[#383842] mx-auto" />
              <p className="text-xs text-[#A9B1D6]">No PDF document is available to view.</p>
            </div>
          )}

          {/* Bottom Quick-Scrub Page Bar */}
          {!isFullscreen && totalPages > 1 && (
            <div className="px-4 py-2 bg-[#1A1D2E]/95 backdrop-blur-md border-t border-[#292E42] flex items-center justify-between gap-3 text-xs z-20 shrink-0 select-none">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => scrollToPage(currentPage - 1)}
                className="p-1 rounded-lg bg-[#24283B] hover:bg-[#2F354D] text-[#A9B1D6] hover:text-white disabled:opacity-30 cursor-pointer transition-all active:scale-95"
                title="Previous Page (Left Arrow / Page Up)"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <div className="flex-1 max-w-xl mx-auto flex items-center gap-3">
                <span className="font-mono text-[11px] text-slate-400 font-bold shrink-0">1</span>
                <input
                  type="range"
                  min={1}
                  max={totalPages}
                  value={currentPage}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    scrollToPage(val);
                  }}
                  className="w-full h-1.5 bg-[#292E42] rounded-lg appearance-none cursor-pointer accent-[#7AA2F7]"
                  title={`Scrub through pages (Current: ${currentPage}/${totalPages})`}
                />
                <span className="font-mono text-[11px] text-[#7AA2F7] font-bold shrink-0">{totalPages}</span>
              </div>

              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => scrollToPage(currentPage + 1)}
                className="p-1 rounded-lg bg-[#24283B] hover:bg-[#2F354D] text-[#A9B1D6] hover:text-white disabled:opacity-30 cursor-pointer transition-all active:scale-95"
                title="Next Page (Right Arrow / Page Down / Space)"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 5. SLIDE-OVER ALL NOTES SIDEBAR DRAWER */}
      {showCommentsSidebar && (
        <div
          className="fixed inset-y-0 right-0 z-50 w-full max-w-sm sm:max-w-md bg-[#161927] border-l border-[#292E42] shadow-[0_0_50px_rgba(0,0,0,0.85)] flex flex-col animate-fade-in"
          onClick={e => e.stopPropagation()}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#1A1D2D] border-b border-[#292E42]">
            <div className="flex items-center gap-2">
              <StickyNote className="w-4 h-4 text-blue-400" />
              <h3 className="text-sm font-bold text-white">All Sticky Notes</h3>
              <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                {comments.length}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setIsCommentMode(true);
                  setIsHighlightMode(false);
                }}
                className={`text-xs px-2.5 py-1 rounded-lg font-bold border transition-colors flex items-center gap-1 cursor-pointer ${
                  isCommentMode
                    ? 'bg-blue-600 text-white border-blue-500'
                    : 'bg-[#24283B] text-slate-300 hover:text-white border-[#2E334D]'
                }`}
                title="Toggle Drop Note Mode"
              >
                <MessageSquarePlus className="w-3.5 h-3.5" />
                <span>Add Note</span>
              </button>
              <button
                type="button"
                onClick={() => setShowCommentsSidebar(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Close Notes Sidebar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="p-3 border-b border-[#24283B] space-y-2 bg-[#141622]">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={commentSearchQuery}
                onChange={e => setCommentSearchQuery(e.target.value)}
                placeholder="Search notes, formulas, traps..."
                className="w-full pl-8 pr-8 py-1.5 rounded-xl bg-[#1D2032] border border-[#2B304A] text-xs text-white placeholder-slate-400 focus:outline-hidden focus:border-blue-500"
              />
              {commentSearchQuery && (
                <button
                  type="button"
                  onClick={() => setCommentSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[11px]">
              <button
                type="button"
                onClick={() => setCommentCategoryFilter('all')}
                className={`px-2 py-0.5 rounded-full font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  commentCategoryFilter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-[#1F2336] text-slate-400 hover:text-white'
                }`}
              >
                All ({comments.length})
              </button>
              {(Object.keys(COMMENT_CATEGORIES) as CommentCategory[]).map(catKey => {
                const cat = COMMENT_CATEGORIES[catKey];
                const count = comments.filter(c => c.category === catKey).length;
                const isSelected = commentCategoryFilter === catKey;
                return (
                  <button
                    key={catKey}
                    type="button"
                    onClick={() => setCommentCategoryFilter(catKey)}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded-full font-bold whitespace-nowrap border transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-500'
                        : `${cat.badgeClass} ${cat.badgeBorder} opacity-80 hover:opacity-100`
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                    {count > 0 && <span className="text-[10px] opacity-75">({count})</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notes List Container */}
          <div className="flex-1 min-h-0 overflow-y-auto p-3 space-y-2.5">
            {filteredComments.length === 0 ? (
              <div className="text-center py-12 px-4 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mx-auto">
                  <StickyNote className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {commentSearchQuery || commentCategoryFilter !== 'all'
                      ? 'No matching notes found'
                      : 'No sticky notes yet'}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {commentSearchQuery || commentCategoryFilter !== 'all'
                      ? 'Try clearing your search query or tag filter.'
                      : 'Click anywhere on the PDF pages in Note mode to drop interactive notes, trap alerts, and doubt tags!'}
                  </p>
                </div>
                {comments.length === 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsCommentMode(true);
                      setIsHighlightMode(false);
                      setShowCommentsSidebar(false);
                      soundManager.playClick();
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg transition-all cursor-pointer"
                  >
                    💬 Start Adding Notes
                  </button>
                )}
              </div>
            ) : (
              filteredComments.map(c => {
                const colorMeta = COMMENT_COLORS[c.color] || COMMENT_COLORS.yellow;
                const catMeta = COMMENT_CATEGORIES[c.category] || COMMENT_CATEGORIES.note;
                const isActive = activeCommentId === c.id;

                return (
                  <div
                    key={c.id}
                    className={`group rounded-xl border transition-all p-3 space-y-2 ${
                      isActive
                        ? 'bg-[#1F2338] border-blue-500 shadow-lg ring-1 ring-blue-500/50'
                        : 'bg-[#1B1E2E] hover:bg-[#222538] border-[#292E45]'
                    }`}
                  >
                    {/* Note Card Top Info */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: colorMeta.hex }}
                        />
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${catMeta.badgeClass} ${catMeta.badgeBorder}`}>
                          {catMeta.icon} {catMeta.label}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            scrollToPage(c.pageNum);
                            setActiveCommentId(c.id);
                            handleUpdateComment(c.id, { isOpen: true });
                          }}
                          className="px-1.5 py-0.5 rounded bg-blue-500/15 hover:bg-blue-500/30 text-blue-300 font-mono text-[10px] font-bold flex items-center gap-0.5 transition-colors cursor-pointer"
                          title="Scroll to page in PDF"
                        >
                          Pg {c.pageNum} ↗
                        </button>
                      </div>

                      {/* Actions: Copy, Push, Delete */}
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            if (!c.text) return;
                            navigator.clipboard.writeText(c.text);
                            soundManager.playClick();
                          }}
                          className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
                          title="Copy text"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handlePushCommentToNotes(c)}
                          className="p-1 rounded text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 cursor-pointer"
                          title="Push note to Topic Notes"
                        >
                          <Sparkles className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteComment(c.id)}
                          className="p-1 rounded text-rose-400 hover:text-rose-300 hover:bg-rose-500/20 cursor-pointer"
                          title="Delete note"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Note Content */}
                    <div
                      onClick={() => {
                        scrollToPage(c.pageNum);
                        setActiveCommentId(c.id);
                        handleUpdateComment(c.id, { isOpen: true });
                      }}
                      className="text-xs text-slate-200 leading-relaxed cursor-pointer font-sans whitespace-pre-wrap hover:text-white"
                    >
                      {c.text || <span className="text-slate-500 italic">Empty sticky note</span>}
                    </div>

                    {/* Footer Date / Time */}
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1 border-t border-white/5">
                      <span>{new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      <button
                        type="button"
                        onClick={() => {
                          scrollToPage(c.pageNum);
                          setActiveCommentId(c.id);
                          handleUpdateComment(c.id, { isOpen: true });
                        }}
                        className="text-blue-400 hover:underline font-sans font-medium cursor-pointer"
                      >
                        View on page →
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* 5. MOBILE FLOATING QUICK ZOOM & ORIENTATION DOCK */}
      <div className="sm:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#16161E]/95 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.65)] text-white select-none">
        {/* Zoom Out */}
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            setFitMode('custom');
            setScale(s => Math.max(s - 0.2, 0.4));
          }}
          className="p-1.5 rounded-full hover:bg-white/10 active:scale-90 text-[#A9B1D6]"
          title="Zoom Out (-)"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>

        {/* Scale Indicator / Reset to 100% */}
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            if (scale !== 1.0 || fitMode !== 'fit-width') {
              setScale(1.0);
              setFitMode('fit-width');
            } else {
              setScale(1.6);
              setFitMode('custom');
            }
          }}
          className="px-2 py-0.5 rounded-md bg-white/10 text-[11px] font-mono font-bold text-[#7AA2F7] active:scale-95"
          title="Tap to Reset Zoom (100% Fit Width)"
        >
          {Math.round(scale * 100)}%
        </button>

        {/* Zoom In */}
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            setFitMode('custom');
            setScale(s => Math.min(s + 0.2, 3.5));
          }}
          className="p-1.5 rounded-full hover:bg-white/10 active:scale-90 text-[#A9B1D6]"
          title="Zoom In (+)"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>

        <div className="w-[1px] h-3.5 bg-white/20 mx-0.5" />

        {/* Fit Mode Toggle */}
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            setFitMode(prev => (prev === 'fit-page' ? 'fit-width' : 'fit-page'));
          }}
          className={`p-1.5 rounded-full transition-all active:scale-90 ${
            fitMode === 'fit-page' ? 'bg-[#7AA2F7] text-[#16161E]' : 'text-[#A9B1D6] hover:bg-white/10'
          }`}
          title={fitMode === 'fit-page' ? 'Fit Page' : 'Fit Width'}
        >
          {fitMode === 'fit-page' ? <Shrink className="w-3.5 h-3.5" /> : <Expand className="w-3.5 h-3.5" />}
        </button>

        {/* Rotate 90° Clockwise */}
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            setRotation(r => (r + 90) % 360);
          }}
          className="p-1.5 rounded-full hover:bg-white/10 active:scale-90 text-[#A9B1D6] flex items-center gap-0.5"
          title="Rotate 90°"
        >
          <RotateCw className="w-3.5 h-3.5" />
          {rotation > 0 && <span className="text-[10px] font-mono font-bold text-[#7AA2F7]">{rotation}°</span>}
        </button>

        {/* Auto-Rotate Toggle */}
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            setIsAutoRotate(prev => !prev);
          }}
          className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-all active:scale-90 flex items-center gap-1 ${
            isAutoRotate
              ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/40'
              : 'text-[#A9B1D6] hover:bg-white/10'
          }`}
          title={isAutoRotate ? 'Auto-Rotate ON (matches device tilt)' : 'Auto-Rotate OFF'}
        >
          <span>Auto</span>
        </button>
      </div>

      {/* 6. FLOATING QUICK-BACK PILL FOR MOBILE (HIDDEN IN FULLSCREEN) */}
      {!isFullscreen && (
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="fixed bottom-16 right-4 sm:hidden px-3.5 py-2 rounded-full bg-[#7AA2F7] hover:bg-[#6090F5] text-[#1A1B26] text-xs font-bold shadow-2xl flex items-center gap-1.5 z-40 active:scale-95 cursor-pointer border border-white/20"
          title="Back to Topic"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      )}
    </div>,
    document.body
  );
};

