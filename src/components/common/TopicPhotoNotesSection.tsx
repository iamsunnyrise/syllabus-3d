import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Image as ImageIcon,
  Camera,
  Upload,
  Plus,
  Trash2,
  Maximize2,
  Download,
  Edit2,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  FileText,
  Sparkles,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';
import { TopicImageAttachment } from '../../types/syllabus';
import { soundManager } from '../../utils/soundEffects';
import {
  saveImageToStorage,
  getImageBlobUrl,
  getImageBlob,
  deleteImageFromStorage
} from '../../utils/imageStorage';

interface TopicPhotoNotesSectionProps {
  topicId: string;
  topicName: string;
  images?: TopicImageAttachment[];
  onAddImage: (image: {
    id?: string;
    title?: string;
    dataUrl: string;
    fileSize?: number;
    storageKey?: string;
    originalFileName?: string;
  }) => void;
  onDeleteImage: (imageId: string) => void;
  onUpdateImageTitle?: (imageId: string, newTitle: string) => void;
  onInsertIntoNotes?: (markdown: string) => void;
}

/**
 * Format exact byte size to readable string (e.g. 2.1 MB, 450 KB, 85 B)
 */
function formatFileSize(bytes?: number): string {
  if (!bytes || bytes <= 0) return 'Picture Note';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Creates a high-fidelity display data URL.
 * If the file is <= 800 KB, reads it directly as full original DataURL.
 * If larger, creates a sharp preview (up to 1600px, 0.88 quality) for localStorage/offline caching,
 * while the 100% untouched original file is safely preserved in IndexedDB.
 */
function generateDisplayDataUrl(file: File): Promise<string> {
  return new Promise((resolve) => {
    if (file.size <= 800 * 1024) {
      const reader = new FileReader();
      reader.onload = (e) => resolve((e.target?.result as string) || '');
      reader.onerror = () => resolve('');
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => resolve('');
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => resolve((e.target?.result as string) || '');
      img.onload = () => {
        const maxDim = 1600;
        let width = img.naturalWidth || img.width;
        let height = img.naturalHeight || img.height;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve((e.target?.result as string) || '');
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.88));
      };
      img.src = (e.target?.result as string) || '';
    };
    reader.readAsDataURL(file);
  });
}

export const TopicPhotoNotesSection: React.FC<TopicPhotoNotesSectionProps> = ({
  topicId,
  topicName,
  images = [],
  onAddImage,
  onDeleteImage,
  onUpdateImageTitle,
  onInsertIntoNotes
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStatus, setProcessStatus] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  // Cached original Blob URLs from IndexedDB for 100% full-resolution display
  const [originalBlobUrls, setOriginalBlobUrls] = useState<Record<string, string>>({});

  // Lightbox / Fullscreen Viewer State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [scale, setScale] = useState<number>(1);
  const [translate, setTranslate] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [rotation, setRotation] = useState<number>(0);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);

  // Drag & Swipe gesture tracking refs
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const translateStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isDraggingRef = useRef<boolean>(false);
  const hasMovedRef = useRef<boolean>(false);
  const lastTapTimeRef = useRef<number>(0);
  const initialPinchDistRef = useRef<number>(0);
  const initialScaleRef = useRef<number>(1);

  // Inline Title Editing State
  const [editingImageId, setEditingImageId] = useState<string | null>(null);
  const [editingTitleText, setEditingTitleText] = useState<string>('');

  // Delete Confirmation State
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageViewportRef = useRef<HTMLDivElement>(null);

  // Load 100% original full-resolution blobs from IndexedDB
  useEffect(() => {
    let isMounted = true;
    const loadOriginals = async () => {
      const urls: Record<string, string> = {};
      for (const img of images) {
        const key = img.storageKey || img.id;
        try {
          const blobUrl = await getImageBlobUrl(key);
          if (blobUrl && isMounted) {
            urls[img.id] = blobUrl;
          }
        } catch {
          // fallback to dataUrl
        }
      }
      if (isMounted && Object.keys(urls).length > 0) {
        setOriginalBlobUrls((prev) => ({ ...prev, ...urls }));
      }
    };

    loadOriginals();
    return () => {
      isMounted = false;
    };
  }, [images]);

  const triggerSuccess = (msg: string) => {
    setSuccessNotice(msg);
    soundManager.playCompleteChime();
    setTimeout(() => setSuccessNotice(null), 3500);
  };

  const triggerError = (msg: string) => {
    setErrorMessage(msg);
    setTimeout(() => setErrorMessage(null), 4000);
  };

  // Process and upload images with 100% original size and quality
  const processImageFiles = async (files: FileList | File[]) => {
    const validFiles: File[] = [];
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      if (f.type.startsWith('image/') || /\.(jpg|jpeg|png|webp|gif|bmp|heic)$/i.test(f.name)) {
        validFiles.push(f);
      }
    }

    if (validFiles.length === 0) {
      triggerError('Please select valid image files (JPG, PNG, WebP, etc.).');
      return;
    }

    setIsProcessing(true);
    let successCount = 0;

    try {
      for (let i = 0; i < validFiles.length; i++) {
        const file = validFiles[i];
        setProcessStatus(`Uploading photo ${i + 1} of ${validFiles.length} (${formatFileSize(file.size)})...`);

        const attachmentId = `img_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

        // 1. Save 100% ORIGINAL untouched file to IndexedDB
        await saveImageToStorage(attachmentId, file, file.name);

        // 2. Generate display dataUrl (original if <=800KB, or sharp preview if larger)
        const displayDataUrl = await generateDisplayDataUrl(file);

        // 3. Clean readable title
        const cleanName = file.name
          .replace(/\.[^/.]+$/, '')
          .replace(/[-_]/g, ' ')
          .trim();

        // 4. Save metadata with EXACT original file.size
        onAddImage({
          id: attachmentId,
          title: cleanName || `Picture Note ${images.length + i + 1}`,
          dataUrl: displayDataUrl,
          fileSize: file.size,
          storageKey: attachmentId,
          originalFileName: file.name
        });

        // 5. Pre-cache direct blob URL for 0ms full-res rendering
        const directBlobUrl = URL.createObjectURL(file);
        setOriginalBlobUrls((prev) => ({ ...prev, [attachmentId]: directBlobUrl }));

        successCount++;
      }

      if (successCount > 0) {
        triggerSuccess(`Added ${successCount} picture${successCount > 1 ? 's' : ''}!`);
      } else {
        triggerError('Failed to process the uploaded images.');
      }
    } catch (err) {
      console.error('Image upload error:', err);
      triggerError('An error occurred while uploading picture notes.');
    } finally {
      setIsProcessing(false);
      setProcessStatus(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      if (cameraInputRef.current) cameraInputRef.current.value = '';
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processImageFiles(e.target.files);
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processImageFiles(e.dataTransfer.files);
    }
  };

  // Clipboard paste support (Ctrl+V)
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      const pastedFiles: File[] = [];
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const blob = items[i].getAsFile();
          if (blob) {
            pastedFiles.push(
              new File([blob], `Screenshot_${new Date().toISOString().slice(0, 10)}.png`, {
                type: blob.type
              })
            );
          }
        }
      }

      if (pastedFiles.length > 0) {
        processImageFiles(pastedFiles);
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [images.length]);

  // Lightbox keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowRight') handleNextImage();
      else if (e.key === 'ArrowLeft') handlePrevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, images.length]);

  // Lightbox actions
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setScale(1);
    setTranslate({ x: 0, y: 0 });
    setRotation(0);
    setShowControls(true);
    soundManager.playClick();
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setScale(1);
    setTranslate({ x: 0, y: 0 });
    setRotation(0);
  };

  const handleNextImage = () => {
    if (lightboxIndex === null || images.length === 0) return;
    setLightboxIndex((lightboxIndex + 1) % images.length);
    setScale(1);
    setTranslate({ x: 0, y: 0 });
    setRotation(0);
    soundManager.playClick();
  };

  const handlePrevImage = () => {
    if (lightboxIndex === null || images.length === 0) return;
    setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
    setScale(1);
    setTranslate({ x: 0, y: 0 });
    setRotation(0);
    soundManager.playClick();
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
    soundManager.playClick();
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.5, 4));
    soundManager.playClick();
  };

  const handleZoomOut = () => {
    setScale((prev) => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) setTranslate({ x: 0, y: 0 });
      return next;
    });
    soundManager.playClick();
  };

  const handleResetZoom = () => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
    setRotation(0);
    soundManager.playClick();
  };

  // Double tap / double click to toggle zoom (1x -> 2.5x -> 1x)
  const handleDoubleTap = (clientX: number, clientY: number) => {
    if (scale > 1.05) {
      setScale(1);
      setTranslate({ x: 0, y: 0 });
    } else {
      // Zoom in towards the tap point
      const rect = imageViewportRef.current?.getBoundingClientRect();
      if (rect) {
        const offsetX = (clientX - (rect.left + rect.width / 2)) * -1;
        const offsetY = (clientY - (rect.top + rect.height / 2)) * -1;
        setTranslate({ x: Math.max(Math.min(offsetX, 200), -200), y: Math.max(Math.min(offsetY, 200), -200) });
      }
      setScale(2.5);
    }
    soundManager.playClick();
  };

  // Mouse wheel zoom support
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const delta = e.deltaY > 0 ? -0.25 : 0.25;
    setScale((prev) => {
      const next = Math.min(Math.max(prev + delta, 1), 4);
      if (next === 1) setTranslate({ x: 0, y: 0 });
      return next;
    });
  };

  // Touch gesture handlers for mobile pinch-to-zoom, pan & swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const now = Date.now();
      if (now - lastTapTimeRef.current < 300) {
        // Double tap detected
        handleDoubleTap(e.touches[0].clientX, e.touches[0].clientY);
        lastTapTimeRef.current = 0;
        return;
      }
      lastTapTimeRef.current = now;

      // Single touch start (pan or swipe)
      dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      translateStartRef.current = { ...translate };
      isDraggingRef.current = true;
      hasMovedRef.current = false;
      setIsInteracting(true);
    } else if (e.touches.length === 2) {
      // Multi-touch pinch-to-zoom
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      initialPinchDistRef.current = dist;
      initialScaleRef.current = scale;
      isDraggingRef.current = false;
      setIsInteracting(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDraggingRef.current) {
      const dx = e.touches[0].clientX - dragStartRef.current.x;
      const dy = e.touches[0].clientY - dragStartRef.current.y;

      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        hasMovedRef.current = true;
      }

      if (scale > 1.05) {
        // Pan image when zoomed in
        const maxPanX = (scale - 1) * 220;
        const maxPanY = (scale - 1) * 320;
        setTranslate({
          x: Math.max(Math.min(translateStartRef.current.x + dx, maxPanX), -maxPanX),
          y: Math.max(Math.min(translateStartRef.current.y + dy, maxPanY), -maxPanY)
        });
      }
    } else if (e.touches.length === 2 && initialPinchDistRef.current > 0) {
      // Pinch to zoom
      const currentDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const ratio = currentDist / initialPinchDistRef.current;
      const nextScale = Math.min(Math.max(initialScaleRef.current * ratio, 1), 4);
      setScale(nextScale);
      hasMovedRef.current = true;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsInteracting(false);

    if (e.touches.length === 0) {
      if (scale <= 1.05 && hasMovedRef.current && isDraggingRef.current) {
        const dx = (e.changedTouches[0]?.clientX || 0) - dragStartRef.current.x;
        const dy = (e.changedTouches[0]?.clientY || 0) - dragStartRef.current.y;

        // Horizontal swipe to next/prev image
        if (dx < -60) handleNextImage();
        else if (dx > 60) handlePrevImage();
        // Swipe down to dismiss
        else if (dy > 120 && Math.abs(dx) < 60) closeLightbox();
      }

      // If user tapped without moving, toggle controls visibility
      if (!hasMovedRef.current && Date.now() - lastTapTimeRef.current >= 280) {
        setShowControls((prev) => !prev);
      }

      isDraggingRef.current = false;
      initialPinchDistRef.current = 0;

      // Snap back if scaled down below 1x
      if (scale < 1.05) {
        setScale(1);
        setTranslate({ x: 0, y: 0 });
      }
    }
  };

  // Mouse pan handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    translateStartRef.current = { ...translate };
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    setIsInteracting(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;

    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      hasMovedRef.current = true;
    }

    if (scale > 1.05) {
      const maxPanX = (scale - 1) * 300;
      const maxPanY = (scale - 1) * 350;
      setTranslate({
        x: Math.max(Math.min(translateStartRef.current.x + dx, maxPanX), -maxPanX),
        y: Math.max(Math.min(translateStartRef.current.y + dy, maxPanY), -maxPanY)
      });
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    setIsInteracting(false);
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    // Single click toggles controls if not moved
    if (!hasMovedRef.current) {
      setShowControls((prev) => !prev);
    }
  };

  // Download exact original uncompressed file from IndexedDB
  const handleDownload = async (img: TopicImageAttachment) => {
    try {
      const blob = await getImageBlob(img.storageKey || img.id);
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const ext = img.originalFileName ? img.originalFileName.split('.').pop() : 'jpg';
        a.download = `${img.title || 'picture-note'}.${ext}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        soundManager.playClick();
        return;
      }
    } catch (err) {
      console.warn('Could not load blob from IndexedDB for download:', err);
    }

    // Fallback to dataUrl
    const a = document.createElement('a');
    a.href = img.dataUrl;
    a.download = `${img.title || 'picture-note'}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    soundManager.playClick();
  };

  // Delete image and purge from IndexedDB
  const handleDeleteImage = async (imageId: string, storageKey?: string) => {
    onDeleteImage(imageId);
    await deleteImageFromStorage(storageKey || imageId).catch(() => {});
    setConfirmDeleteId(null);
    soundManager.playClick();
  };

  // Insert markdown into notes helper
  const handleInsertIntoNotes = (img: TopicImageAttachment) => {
    if (!onInsertIntoNotes) return;
    const title = img.title || 'Diagram Note';
    const markdown = `\n\n### 🖼️ ${title}\n![${title}](${img.dataUrl})\n*Captured on ${img.addedAt || 'today'} (${formatFileSize(img.fileSize)})*\n`;
    onInsertIntoNotes(markdown);
    triggerSuccess(`Inserted "${title}" into Study Notes!`);
  };

  // Inline title editing
  const startEditingTitle = (img: TopicImageAttachment) => {
    setEditingImageId(img.id);
    setEditingTitleText(img.title || '');
  };

  const saveEditingTitle = (imageId: string) => {
    if (onUpdateImageTitle && editingTitleText.trim()) {
      onUpdateImageTitle(imageId, editingTitleText.trim());
      soundManager.playClick();
    }
    setEditingImageId(null);
    setEditingTitleText('');
  };

  const currentLightboxImage = lightboxIndex !== null ? images[lightboxIndex] : null;
  const currentLightboxSrc = currentLightboxImage
    ? originalBlobUrls[currentLightboxImage.id] || currentLightboxImage.dataUrl
    : '';

  return (
    <div
      ref={sectionRef}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 relative ${
        isDragOver
          ? 'border-indigo-500 bg-indigo-500/10 shadow-lg scale-[1.005]'
          : 'border-slate-200/90 dark:border-white/10 bg-white dark:bg-[#121424] shadow-sm'
      }`}
    >
      {/* Hidden File & Camera Inputs */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={cameraInputRef}
        onChange={handleFileChange}
        accept="image/*"
        capture="environment"
        className="hidden"
      />

      {/* SECTION HEADER - Clean & Minimalist */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-sm shrink-0">
            <ImageIcon className="w-5 h-5" />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-[15px] sm:text-base font-bold text-slate-800 dark:text-white">
              Picture Notes & Diagrams
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 tabular-nums">
              {images.length} {images.length === 1 ? 'Picture' : 'Pictures'}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 flex-wrap">
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              cameraInputRef.current?.click();
            }}
            disabled={isProcessing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-white/10 text-xs font-bold transition-all cursor-pointer active:scale-95 disabled:opacity-50"
            title="Take photo directly using camera"
          >
            <Camera className="w-3.5 h-3.5 text-indigo-500" />
            <span>Camera</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              fileInputRef.current?.click();
            }}
            disabled={isProcessing}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-sm hover:shadow-indigo-500/25 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
            title="Upload pictures"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Pictures</span>
          </button>
        </div>
      </div>

      {/* Processing & Notification Alerts */}
      {processStatus && (
        <div className="mt-3 p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/50 flex items-center gap-2 text-xs text-indigo-700 dark:text-indigo-300 animate-pulse">
          <div className="w-3.5 h-3.5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin shrink-0" />
          <span className="font-semibold">{processStatus}</span>
        </div>
      )}

      {errorMessage && (
        <div className="mt-3 p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/50 flex items-center gap-2 text-xs text-rose-700 dark:text-rose-300 animate-fade-in">
          <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {successNotice && (
        <div className="mt-3 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-300 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-500 shrink-0" />
          <span className="font-semibold">{successNotice}</span>
        </div>
      )}

      {/* EMPTY STATE */}
      {images.length === 0 && !isProcessing && (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="mt-4 p-6 sm:p-8 rounded-2xl border-2 border-dashed border-slate-300 dark:border-white/10 hover:border-indigo-400 dark:hover:border-indigo-500/50 bg-slate-50/60 dark:bg-white/[0.02] flex flex-col items-center justify-center text-center cursor-pointer transition-all group"
        >
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/60 transition-all shadow-inner">
            <ImageIcon className="w-7 h-7" />
          </div>
          <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-1">
            No picture notes added yet
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mb-4">
            Upload photos of textbook diagrams, blackboard work, or formula sheets.
            <span className="hidden sm:inline"> Drag & drop or paste with Ctrl+V.</span>
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Select Pictures</span>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                cameraInputRef.current?.click();
              }}
              className="px-3.5 py-2 rounded-xl bg-slate-200/80 hover:bg-slate-300 dark:bg-white/10 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <Camera className="w-3.5 h-3.5 text-indigo-500" />
              <span>Take Photo</span>
            </button>
          </div>
        </div>
      )}

      {/* PICTURE GALLERY GRID */}
      {images.length > 0 && (
        <div className="mt-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-3.5">
            {images.map((img, index) => {
              const isEditing = editingImageId === img.id;
              const isConfirmingDelete = confirmDeleteId === img.id;
              const imageSrc = originalBlobUrls[img.id] || img.dataUrl;

              return (
                <div
                  key={img.id}
                  className="group relative rounded-2xl border border-slate-200/90 dark:border-white/10 bg-slate-50/70 dark:bg-[#181a2e] overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                >
                  {/* Image Thumbnail Container */}
                  <div
                    className="relative aspect-[4/3] w-full bg-slate-900/10 dark:bg-black/30 overflow-hidden cursor-pointer"
                    onClick={() => openLightbox(index)}
                  >
                    <img
                      src={imageSrc}
                      alt={img.title || `Picture note ${index + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-2">
                      <div className="flex items-center justify-between">
                        <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-black/60 text-white backdrop-blur-sm">
                          #{index + 1}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(img);
                          }}
                          className="p-1 rounded-md bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition-all"
                          title="Download original file"
                        >
                          <Download className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="flex items-center justify-center">
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/60 text-white text-[11px] font-bold backdrop-blur-sm shadow-sm">
                          <Maximize2 className="w-3 h-3 text-indigo-400" />
                          <span>View Full</span>
                        </span>
                      </div>
                    </div>

                    {/* Index Badge */}
                    <div className="absolute top-1.5 left-1.5 group-hover:opacity-0 transition-opacity">
                      <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-black/60 text-white/90 backdrop-blur-sm">
                        #{index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Card Content & Metadata */}
                  <div className="p-2.5 flex-1 flex flex-col justify-between gap-1.5 bg-white dark:bg-[#121424]">
                    {/* Title or Edit Input */}
                    {isEditing ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="text"
                          value={editingTitleText}
                          onChange={(e) => setEditingTitleText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveEditingTitle(img.id);
                            if (e.key === 'Escape') setEditingImageId(null);
                          }}
                          autoFocus
                          className="w-full text-xs px-1.5 py-1 rounded-md border border-indigo-500 bg-white dark:bg-slate-900 text-slate-800 dark:text-white outline-none"
                          placeholder="Image title..."
                        />
                        <button
                          type="button"
                          onClick={() => saveEditingTitle(img.id)}
                          className="p-1 rounded-md bg-emerald-500 text-white text-xs hover:bg-emerald-600 shrink-0"
                          title="Save title"
                        >
                          <Check className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between gap-1">
                        <h4
                          onClick={() => startEditingTitle(img)}
                          className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                          title={img.title || `Picture ${index + 1}`}
                        >
                          {img.title || `Picture ${index + 1}`}
                        </h4>
                        <button
                          type="button"
                          onClick={() => startEditingTitle(img)}
                          className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-opacity shrink-0 p-0.5"
                          title="Rename picture note"
                        >
                          <Edit2 className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    )}

                    {/* Metadata: Date & Exact Original File Size */}
                    <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500">
                      <span>{img.addedAt || 'Added'}</span>
                      <span className="font-mono font-bold text-slate-600 dark:text-slate-300 tabular-nums">
                        {formatFileSize(img.fileSize)}
                      </span>
                    </div>

                    {/* Action Buttons Row */}
                    <div className="pt-1.5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between gap-1">
                      {onInsertIntoNotes && (
                        <button
                          type="button"
                          onClick={() => handleInsertIntoNotes(img)}
                          className="flex items-center gap-1 px-2 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer active:scale-95"
                          title="Insert image into your Study Notes"
                        >
                          <FileText className="w-3 h-3" />
                          <span>Insert</span>
                        </button>
                      )}

                      {/* Delete / Confirm Delete button */}
                      {isConfirmingDelete ? (
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleDeleteImage(img.id, img.storageKey)}
                            className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-600 text-white hover:bg-rose-700"
                            title="Confirm delete"
                          >
                            Delete
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(null)}
                            className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(img.id)}
                          className="p-1 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all cursor-pointer"
                          title="Delete picture note"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* FULLSCREEN LIGHTBOX / HIGH-END MOBILE GALLERY VIEWER */}
      {currentLightboxImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[250] bg-black/96 flex items-center justify-center overflow-hidden touch-none select-none animate-fade-in"
          onWheel={handleWheel}
        >
          {/* Top Floating Control Scrim */}
          <div
            className={`absolute top-0 inset-x-0 z-30 pointer-events-auto bg-gradient-to-b from-black/85 via-black/45 to-transparent pt-3 pb-8 px-3 sm:px-5 flex items-center justify-between text-white transition-opacity duration-300 ${
              showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Back Button & Title */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <button
                type="button"
                onClick={closeLightbox}
                className="p-2 -ml-1 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white transition-all cursor-pointer shrink-0"
                title="Back / Close"
              >
                <ArrowLeft className="w-5 h-5 sm:w-5 sm:h-5" />
              </button>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-[150px] sm:max-w-md">
                    {currentLightboxImage.title || `Picture ${(lightboxIndex ?? 0) + 1}`}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-mono font-bold bg-white/15 text-indigo-300 border border-white/15 tabular-nums shrink-0">
                    {(lightboxIndex ?? 0) + 1} / {images.length}
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs text-slate-400">
                  {formatFileSize(currentLightboxImage.fileSize)}
                </p>
              </div>
            </div>

            {/* Top Right Action Buttons */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              {onInsertIntoNotes && (
                <button
                  type="button"
                  onClick={() => handleInsertIntoNotes(currentLightboxImage)}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                  title="Insert this image into Study Notes"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Insert to Notes</span>
                </button>
              )}

              {/* Rotate button */}
              <button
                type="button"
                onClick={handleRotate}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white transition-all cursor-pointer"
                title="Rotate 90° clockwise"
              >
                <RotateCw className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </button>

              {/* Reset Zoom button (if zoomed or rotated) */}
              {(scale !== 1 || rotation !== 0) && (
                <button
                  type="button"
                  onClick={handleResetZoom}
                  className="p-2 rounded-xl bg-indigo-600/80 hover:bg-indigo-600 active:scale-95 text-white transition-all cursor-pointer"
                  title="Reset zoom to 100%"
                >
                  <RotateCcw className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </button>
              )}

              {/* Download original */}
              <button
                type="button"
                onClick={() => handleDownload(currentLightboxImage)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white transition-all cursor-pointer"
                title="Download original image file"
              >
                <Download className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={closeLightbox}
                className="p-2 rounded-xl bg-white/10 hover:bg-rose-600 active:scale-95 text-white transition-all cursor-pointer"
                title="Close (Esc)"
              >
                <X className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </button>
            </div>
          </div>

          {/* Central Image Viewport (Full Bleed - No Top/Bottom Blank Padding) */}
          <div
            ref={imageViewportRef}
            className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden touch-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onDoubleClick={(e) => handleDoubleTap(e.clientX, e.clientY)}
            style={{
              cursor: scale > 1.05 ? (isInteracting ? 'grabbing' : 'grab') : 'default'
            }}
          >
            {/* The Image Container with Butter-Smooth Hardware-Accelerated Transforms */}
            <div
              className="w-full h-full flex items-center justify-center pointer-events-none"
              style={{
                transform: `translate3d(${translate.x}px, ${translate.y}px, 0) scale(${scale}) rotate(${rotation}deg)`,
                transition: isInteracting ? 'none' : 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
                transformOrigin: 'center center',
                willChange: 'transform'
              }}
            >
              <img
                src={currentLightboxSrc}
                alt={currentLightboxImage.title || 'Fullscreen picture note'}
                draggable={false}
                className="max-h-full max-w-full w-auto h-auto object-contain select-none shadow-2xl pointer-events-auto"
                style={{
                  maxHeight: '100vh',
                  maxWidth: '100vw'
                }}
              />
            </div>

            {/* Desktop Left/Right Arrows */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevImage();
                  }}
                  className={`hidden sm:flex absolute left-4 z-20 p-3 rounded-full bg-black/60 hover:bg-black/85 active:scale-95 text-white border border-white/20 transition-all cursor-pointer shadow-xl ${
                    showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                  title="Previous (Left Arrow)"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextImage();
                  }}
                  className={`hidden sm:flex absolute right-4 z-20 p-3 rounded-full bg-black/60 hover:bg-black/85 active:scale-95 text-white border border-white/20 transition-all cursor-pointer shadow-xl ${
                    showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                  title="Next (Right Arrow)"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Bottom Floating Control Scrim */}
          <div
            className={`absolute bottom-0 inset-x-0 z-30 pointer-events-auto bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-8 pb-4 px-3 sm:px-4 flex flex-col items-center gap-2.5 transition-opacity duration-300 ${
              showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Zoom Control Pill */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-md text-white text-xs shadow-lg">
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={scale <= 1}
                className="p-1 rounded-full hover:bg-white/20 active:scale-90 disabled:opacity-30 transition-all cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span
                onClick={handleResetZoom}
                className="font-mono text-[11px] font-bold px-2 py-0.5 rounded cursor-pointer hover:bg-white/15 tabular-nums"
                title="Click to reset zoom"
              >
                {Math.round(scale * 100)}%
              </span>
              <button
                type="button"
                onClick={handleZoomIn}
                disabled={scale >= 4}
                className="p-1 rounded-full hover:bg-white/20 active:scale-90 disabled:opacity-30 transition-all cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <span className="hidden sm:inline-block text-[10px] text-slate-400 pl-1 border-l border-white/15">
                Double-tap to zoom
              </span>
            </div>

            {/* Bottom Mini Thumbnails Filmstrip (if > 1 image) */}
            {images.length > 1 && (
              <div className="w-full max-w-lg overflow-x-auto py-1 flex items-center justify-center gap-2 no-scrollbar">
                {images.map((thumb, idx) => {
                  const thumbSrc = originalBlobUrls[thumb.id] || thumb.dataUrl;
                  const isSelected = idx === lightboxIndex;
                  return (
                    <button
                      key={thumb.id}
                      type="button"
                      onClick={() => openLightbox(idx)}
                      className={`relative w-11 h-11 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                        isSelected
                          ? 'border-indigo-500 scale-105 shadow-md shadow-indigo-500/50'
                          : 'border-white/20 opacity-50 hover:opacity-100'
                      }`}
                      title={thumb.title || `Picture ${idx + 1}`}
                    >
                      <img
                        src={thumbSrc}
                        alt={thumb.title || `Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
