import React, { useState, useRef, useEffect } from 'react';
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
  AlertCircle
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
    // If small enough, keep 100% original binary string
    if (file.size <= 800 * 1024) {
      const reader = new FileReader();
      reader.onload = (e) => resolve((e.target?.result as string) || '');
      reader.onerror = () => resolve('');
      reader.readAsDataURL(file);
      return;
    }

    // For larger files, create a sharp preview to safeguard localStorage quota
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
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);

  // Inline Title Editing State
  const [editingImageId, setEditingImageId] = useState<string | null>(null);
  const [editingTitleText, setEditingTitleText] = useState<string>('');

  // Delete Confirmation State
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  // Calculate total original storage footprint
  const totalOriginalBytes = images.reduce((acc, img) => acc + (img.fileSize || 0), 0);

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
        setProcessStatus(`Uploading original photo ${i + 1} of ${validFiles.length} (${formatFileSize(file.size)})...`);

        const attachmentId = `img_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

        // 1. Save 100% ORIGINAL untouched file to IndexedDB
        await saveImageToStorage(attachmentId, file, file.name);

        // 2. Generate display dataUrl (original if <=800KB, or high-res preview if larger)
        const displayDataUrl = await generateDisplayDataUrl(file);

        // 3. Clean readable title
        const cleanName = file.name
          .replace(/\.[^/.]+$/, '')
          .replace(/[-_]/g, ' ')
          .trim();

        // 4. Save metadata with EXACT original file.size (e.g. 2.1 MB)
        onAddImage({
          id: attachmentId,
          title: cleanName || `Picture Note ${images.length + i + 1}`,
          dataUrl: displayDataUrl,
          fileSize: file.size, // Exact original bytes
          storageKey: attachmentId,
          originalFileName: file.name
        });

        // 5. Pre-cache direct blob URL for 0ms full-res rendering
        const directBlobUrl = URL.createObjectURL(file);
        setOriginalBlobUrls((prev) => ({ ...prev, [attachmentId]: directBlobUrl }));

        successCount++;
      }

      if (successCount > 0) {
        triggerSuccess(`Added ${successCount} original quality picture${successCount > 1 ? 's' : ''}!`);
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
    setZoomLevel(1);
    setRotation(0);
    soundManager.playClick();
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setZoomLevel(1);
    setRotation(0);
  };

  const handleNextImage = () => {
    if (lightboxIndex === null || images.length === 0) return;
    setLightboxIndex((lightboxIndex + 1) % images.length);
    setZoomLevel(1);
    setRotation(0);
    soundManager.playClick();
  };

  const handlePrevImage = () => {
    if (lightboxIndex === null || images.length === 0) return;
    setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
    setZoomLevel(1);
    setRotation(0);
    soundManager.playClick();
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
    soundManager.playClick();
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.3, 3));
    soundManager.playClick();
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.3, 0.6));
    soundManager.playClick();
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setRotation(0);
    soundManager.playClick();
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

      {/* SECTION HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-sm shrink-0">
            <ImageIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-[15px] sm:text-base font-bold text-slate-800 dark:text-white">
                Picture Notes & Diagrams
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 tabular-nums">
                {images.length} {images.length === 1 ? 'Picture' : 'Pictures'}
              </span>
              {images.length > 0 && totalOriginalBytes > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 tabular-nums">
                  Original {formatFileSize(totalOriginalBytes)}
                </span>
              )}
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
              Photos of textbook pages, handwritten notes, whiteboards & formula diagrams in 100% original quality
            </p>
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
            title="Upload pictures in original resolution and file size"
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
            Upload multiple photos of textbook diagrams, blackboard work, or formula sheets in full original quality.
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
                      {/* Insert into Study Notes button */}
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

          {/* Quick Tip / Hint Bar */}
          <div className="mt-3.5 p-2 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span>Full resolution preserved in local storage. Click any picture to zoom and rotate.</span>
            </span>
            <span className="hidden sm:inline font-mono text-[10px] text-slate-400">
              Ctrl+V to paste
            </span>
          </div>
        </div>
      )}

      {/* FULLSCREEN LIGHTBOX / MODAL VIEWER */}
      {currentLightboxImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[250] bg-black/92 backdrop-blur-md flex flex-col justify-between animate-fade-in select-none"
          onClick={closeLightbox}
        >
          {/* Top Control Bar */}
          <div
            className="flex items-center justify-between p-3 sm:p-4 bg-slate-900/80 border-b border-white/10 text-white shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Title & Index */}
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded-md text-xs font-mono font-bold bg-white/10 text-indigo-300 border border-white/10 tabular-nums">
                {(lightboxIndex ?? 0) + 1} / {images.length}
              </span>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-[180px] sm:max-w-md">
                  {currentLightboxImage.title || `Picture ${(lightboxIndex ?? 0) + 1}`}
                </h3>
                <p className="text-[10px] sm:text-xs text-slate-400">
                  Original: {formatFileSize(currentLightboxImage.fileSize)} • Added {currentLightboxImage.addedAt || 'today'}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1 sm:gap-2">
              {onInsertIntoNotes && (
                <button
                  type="button"
                  onClick={() => handleInsertIntoNotes(currentLightboxImage)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                  title="Insert this image into Study Notes"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Insert to Notes</span>
                </button>
              )}

              {/* Rotate button */}
              <button
                type="button"
                onClick={handleRotate}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                title="Rotate 90° clockwise"
              >
                <RotateCw className="w-4 h-4" />
              </button>

              {/* Zoom Out */}
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={zoomLevel <= 0.6}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer disabled:opacity-30"
                title="Zoom out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              {/* Zoom In */}
              <button
                type="button"
                onClick={handleZoomIn}
                disabled={zoomLevel >= 3}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer disabled:opacity-30"
                title="Zoom in"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              {/* Reset Zoom */}
              {(zoomLevel !== 1 || rotation !== 0) && (
                <button
                  type="button"
                  onClick={handleResetZoom}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-indigo-300 transition-all cursor-pointer"
                  title="Reset view"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}

              {/* Download original */}
              <button
                type="button"
                onClick={() => handleDownload(currentLightboxImage)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                title="Download original image file"
              >
                <Download className="w-4 h-4" />
              </button>

              {/* Close */}
              <button
                type="button"
                onClick={closeLightbox}
                className="p-2 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white transition-all cursor-pointer ml-1"
                title="Close lightbox (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Central Image Viewport */}
          <div
            className="flex-1 relative flex items-center justify-center overflow-hidden p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous Image Arrow */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={handlePrevImage}
                className="absolute left-3 sm:left-6 z-20 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer active:scale-95 shadow-lg"
                title="Previous image (Left Arrow)"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}

            {/* Displayed Image */}
            <div
              className="max-w-full max-h-full flex items-center justify-center transition-transform duration-200"
              style={{
                transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
                cursor: zoomLevel > 1 ? 'grab' : 'zoom-in'
              }}
              onClick={() => {
                if (zoomLevel === 1) handleZoomIn();
                else handleResetZoom();
              }}
            >
              <img
                src={currentLightboxSrc}
                alt={currentLightboxImage.title || 'Fullscreen picture note'}
                className="max-h-[75vh] max-w-[90vw] object-contain rounded-lg shadow-2xl pointer-events-auto"
              />
            </div>

            {/* Next Image Arrow */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={handleNextImage}
                className="absolute right-3 sm:right-6 z-20 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer active:scale-95 shadow-lg"
                title="Next image (Right Arrow)"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}
          </div>

          {/* Bottom Thumbnails Filmstrip */}
          {images.length > 1 && (
            <div
              className="p-3 bg-slate-900/80 border-t border-white/10 overflow-x-auto flex items-center justify-center gap-2 shrink-0 scrollbar-thin"
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((thumb, idx) => {
                const thumbSrc = originalBlobUrls[thumb.id] || thumb.dataUrl;
                return (
                  <button
                    key={thumb.id}
                    type="button"
                    onClick={() => openLightbox(idx)}
                    className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      idx === lightboxIndex
                        ? 'border-indigo-500 scale-105 shadow-md shadow-indigo-500/30'
                        : 'border-transparent opacity-60 hover:opacity-100'
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
      )}
    </div>
  );
};
