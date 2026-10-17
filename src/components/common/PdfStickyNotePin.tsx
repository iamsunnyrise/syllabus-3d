import React, { useState, useRef, useEffect } from 'react';
import {
  GripVertical,
  Minus,
  Trash2,
  Copy,
  Check,
  Sparkles,
  ChevronDown,
  Maximize2,
  Minimize2,
  Bold,
  Italic,
  Highlighter,
  List,
  CheckSquare,
  Code,
  Quote,
  Eye,
  Edit3
} from 'lucide-react';
import {
  PdfComment,
  CommentColor,
  CommentCategory,
  COMMENT_COLORS,
  COMMENT_CATEGORIES
} from '../../utils/pdfCommentStorage';
import { soundManager } from '../../utils/soundEffects';

interface PdfStickyNotePinProps {
  comment: PdfComment;
  isActive: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<PdfComment>) => void;
  onDelete: () => void;
  onPushToNotes?: () => void;
  renderedWidth: number;
  renderedHeight: number;
}

export const PdfStickyNotePin: React.FC<PdfStickyNotePinProps> = ({
  comment,
  isActive,
  onSelect,
  onUpdate,
  onDelete,
  onPushToNotes,
  renderedWidth,
  renderedHeight
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pushed, setPushed] = useState(false);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [isUltraWide, setIsUltraWide] = useState(false);

  const dragStartRef = useRef<{ clientX: number; clientY: number; initX: number; initY: number } | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const colorMeta = COMMENT_COLORS[comment.color] || COMMENT_COLORS.yellow;
  const categoryMeta = COMMENT_CATEGORIES[comment.category] || COMMENT_CATEGORIES.note;

  // Auto-resize textarea on content change
  useEffect(() => {
    if (textareaRef.current && comment.isOpen !== false && activeTab === 'edit') {
      textareaRef.current.style.height = 'auto';
      const targetH = Math.max(90, Math.min(textareaRef.current.scrollHeight, isUltraWide ? 380 : 300));
      textareaRef.current.style.height = `${targetH}px`;
    }
  }, [comment.text, comment.isOpen, activeTab, isUltraWide]);

  // Focus textarea when newly opened with empty text
  useEffect(() => {
    if (comment.isOpen !== false && (!comment.text || comment.text.trim() === '')) {
      const timer = setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [comment.isOpen]);

  // Handle Drag Repositioning across the page
  const handleDragStart = (e: React.PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = {
      clientX: e.clientX,
      clientY: e.clientY,
      initX: comment.x,
      initY: comment.y
    };
  };

  useEffect(() => {
    if (!isDragging) return;

    const handlePointerMove = (e: PointerEvent) => {
      if (!dragStartRef.current || renderedWidth <= 0 || renderedHeight <= 0) return;
      const deltaX = (e.clientX - dragStartRef.current.clientX) / renderedWidth;
      const deltaY = (e.clientY - dragStartRef.current.clientY) / renderedHeight;
      const newX = Math.min(Math.max(dragStartRef.current.initX + deltaX, 0.02), 0.98);
      const newY = Math.min(Math.max(dragStartRef.current.initY + deltaY, 0.02), 0.98);
      onUpdate({ x: newX, y: newY });
    };

    const handlePointerUp = () => {
      setIsDragging(false);
      dragStartRef.current = null;
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging, renderedWidth, renderedHeight, onUpdate]);

  // Insert markdown formatting at cursor or around selection
  const applyFormatting = (prefix: string, suffix: string = '', defaultPlaceholder: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const val = comment.text || '';
    const selected = val.substring(start, end);
    const textToWrap = selected || defaultPlaceholder;

    const newText = val.substring(0, start) + prefix + textToWrap + suffix + val.substring(end);
    onUpdate({ text: newText });

    setTimeout(() => {
      textarea.focus();
      const newCursorStart = start + prefix.length;
      const newCursorEnd = newCursorStart + textToWrap.length;
      textarea.setSelectionRange(newCursorStart, newCursorEnd);
    }, 15);
    soundManager.playClick();
  };

  // Keyboard shortcut handlers (Ctrl+Enter to save, Esc to close)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.stopPropagation();

    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onUpdate({ isOpen: false });
      soundManager.playClick();
      return;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      onUpdate({ isOpen: false });
      soundManager.playClick();
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      applyFormatting('  ');
    }
  };

  // Copy text to clipboard
  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!comment.text) return;
    navigator.clipboard.writeText(comment.text);
    setCopied(true);
    soundManager.playClick();
    setTimeout(() => setCopied(false), 1600);
  };

  // Push note to Topic Notes with page citation
  const handlePushToNotes = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPushToNotes?.();
    setPushed(true);
    soundManager.playClick();
    setTimeout(() => setPushed(false), 2000);
  };

  // Word and character count calculation
  const wordCount = (comment.text || '').trim() ? (comment.text || '').trim().split(/\s+/).length : 0;
  const charCount = (comment.text || '').length;

  // Smart horizontal & vertical positioning with edge clamping
  const alignTop = comment.y > 0.65;
  const isOpen = comment.isOpen !== false;

  // Calculate card width and positioning styles so wide card never clips outside page boundaries
  const getCardStyle = (): React.CSSProperties => {
    const isDesk = typeof window !== 'undefined' && window.innerWidth >= 640;
    const baseW = isUltraWide ? 680 : 540;
    const maxAllowed = renderedWidth > 0 ? Math.max(300, renderedWidth - 32) : baseW;
    const targetW = Math.min(isDesk ? baseW : 360, maxAllowed);

    const style: React.CSSProperties = {
      width: `${targetW}px`,
      maxWidth: 'calc(100vw - 32px)'
    };

    if (renderedWidth > 0) {
      const pinPixelX = comment.x * renderedWidth;
      const spaceRight = renderedWidth - pinPixelX;
      const spaceLeft = pinPixelX;

      if (spaceRight >= targetW + 20) {
        // Fits comfortably to the right of pin
        style.left = '16px';
      } else if (spaceLeft >= targetW + 20) {
        // Fits comfortably to the left of pin
        style.right = '16px';
      } else {
        // Center on the pin and clamp within page margins
        const idealRelLeft = -targetW / 2;
        const minRelLeft = 16 - pinPixelX;
        const maxRelLeft = (renderedWidth - 16 - targetW) - pinPixelX;
        const clamped = Math.max(minRelLeft, Math.min(idealRelLeft, maxRelLeft));
        style.left = `${clamped}px`;
      }
    } else {
      if (comment.x > 0.5) {
        style.right = '0';
        style.transform = 'translateX(-12px)';
      } else {
        style.left = '0';
        style.transform = 'translateX(12px)';
      }
    }

    return style;
  };

  // Inline markdown renderer helper for preview tab
  const renderInlineMarkdown = (line: string): React.ReactNode[] => {
    const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|==[^=]+==|`[^`]+`|#\w+)/g;
    const parts = line.split(regex);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
        return <strong key={idx} className="font-bold text-slate-900 dark:text-white">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*') && part.length >= 2) {
        return <em key={idx} className="italic text-slate-800 dark:text-slate-200">{part.slice(1, -1)}</em>;
      }
      if (part.startsWith('==') && part.endsWith('==') && part.length >= 4) {
        return (
          <mark key={idx} className="px-1 py-0.5 rounded bg-amber-200/90 dark:bg-amber-400/30 text-amber-950 dark:text-amber-200 font-medium">
            {part.slice(2, -2)}
          </mark>
        );
      }
      if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
        return (
          <code key={idx} className="px-1.5 py-0.5 mx-0.5 rounded bg-slate-200/80 dark:bg-slate-800 text-pink-600 dark:text-pink-400 font-mono text-[11px]">
            {part.slice(1, -1)}
          </code>
        );
      }
      if (part.startsWith('#') && part.length > 1) {
        return (
          <span key={idx} className="inline-flex items-center px-1.5 py-0.5 mx-0.5 rounded-full text-[10px] font-bold bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 border border-blue-200/60 dark:border-blue-700/50">
            {part}
          </span>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  // Full block markdown preview renderer with interactive task toggles
  const renderPreview = (text: string) => {
    if (!text || !text.trim()) {
      return (
        <div className="py-8 text-center text-xs text-slate-400 dark:text-slate-500 italic">
          No content yet. Click the Edit tab to write your note.
        </div>
      );
    }

    const lines = text.split('\n');
    return (
      <div className="space-y-1.5 text-xs sm:text-[13px] leading-relaxed text-slate-700 dark:text-slate-200 select-text font-sans">
        {lines.map((line, i) => {
          // Task checkbox (- [ ] or - [x])
          if (/^-\s+\[([ xX])\]\s+(.*)/.test(line)) {
            const match = line.match(/^-\s+\[([ xX])\]\s+(.*)/);
            const isChecked = match ? match[1].toLowerCase() === 'x' : false;
            const taskContent = match ? match[2] : '';
            return (
              <div
                key={i}
                className="flex items-start gap-2 py-0.5 cursor-pointer group"
                onClick={() => {
                  const newLines = [...lines];
                  newLines[i] = `- [${isChecked ? ' ' : 'x'}] ${taskContent}`;
                  onUpdate({ text: newLines.join('\n') });
                  soundManager.playClick();
                }}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  readOnly
                  className="mt-1 w-3.5 h-3.5 rounded accent-blue-600 cursor-pointer shrink-0"
                />
                <span className={`flex-1 ${isChecked ? 'line-through text-slate-400 dark:text-slate-500' : ''}`}>
                  {renderInlineMarkdown(taskContent)}
                </span>
              </div>
            );
          }

          // Bullet list
          if (/^[-*•]\s+(.*)/.test(line)) {
            const content = line.replace(/^[-*•]\s+/, '');
            return (
              <div key={i} className="flex items-start gap-2 pl-1 py-0.5">
                <span className="text-blue-500 dark:text-blue-400 font-bold leading-relaxed">•</span>
                <span className="flex-1">{renderInlineMarkdown(content)}</span>
              </div>
            );
          }

          // Callout / Blockquote
          if (/^>\s*(.*)/.test(line)) {
            const quoteText = line.replace(/^>\s*/, '');
            return (
              <div
                key={i}
                className="pl-3 py-1.5 my-1 border-l-3 border-amber-400 dark:border-amber-500 bg-amber-500/10 rounded-r-md text-amber-950 dark:text-amber-200 text-xs italic"
              >
                {renderInlineMarkdown(quoteText)}
              </div>
            );
          }

          // Headings
          if (line.startsWith('### ')) {
            return <h4 key={i} className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-slate-100 pt-1">{renderInlineMarkdown(line.slice(4))}</h4>;
          }
          if (line.startsWith('## ')) {
            return <h3 key={i} className="font-bold text-sm text-slate-900 dark:text-white pt-1">{renderInlineMarkdown(line.slice(3))}</h3>;
          }
          if (line.startsWith('# ')) {
            return <h2 key={i} className="font-extrabold text-base text-slate-900 dark:text-white pt-1.5 border-b border-slate-200 dark:border-slate-800 pb-0.5">{renderInlineMarkdown(line.slice(2))}</h2>;
          }

          // Empty line
          if (!line.trim()) {
            return <div key={i} className="h-1.5" />;
          }

          // Normal paragraph
          return <p key={i}>{renderInlineMarkdown(line)}</p>;
        })}
      </div>
    );
  };

  return (
    <div
      data-pdf-comment={comment.id}
      className="absolute pointer-events-auto select-none"
      style={{
        left: `${comment.x * 100}%`,
        top: `${comment.y * 100}%`,
        zIndex: isDragging ? 50 : isActive ? 40 : 30
      }}
      onClick={e => {
        e.stopPropagation();
        onSelect();
      }}
      onMouseDown={e => e.stopPropagation()}
    >
      {/* 1. Pin Marker Button (When Minimized) */}
      <div className="relative -translate-x-1/2 -translate-y-1/2 group">
        <button
          type="button"
          onClick={e => {
            e.stopPropagation();
            onSelect();
            onUpdate({ isOpen: !isOpen });
            soundManager.playClick();
          }}
          onPointerDown={handleDragStart}
          title={`${categoryMeta.label}: ${comment.text ? comment.text.slice(0, 40) + '...' : 'Empty Note'} (Drag to move)`}
          aria-label={`Sticky note: ${categoryMeta.label}`}
          className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold shadow-lg cursor-grab active:cursor-grabbing border-2 border-white dark:border-[#1F2335] transition-all hover:scale-115 active:scale-95 ${
            colorMeta.bg
          } ${isActive ? 'ring-3 ring-blue-500 ring-offset-2 ring-offset-white dark:ring-offset-[#1A1B26] scale-110 shadow-xl' : ''}`}
        >
          <span>{categoryMeta.icon}</span>

          {(!comment.text || isActive) && (
            <span
              className={`absolute -inset-1 rounded-full animate-ping opacity-30 pointer-events-none ${colorMeta.bg}`}
            />
          )}
        </button>

        {/* Hover Tooltip Preview */}
        {!isOpen && (
          <div
            className={`absolute pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50 whitespace-nowrap px-3 py-1.5 rounded-xl shadow-2xl text-xs bg-slate-900/95 text-white backdrop-blur-md border border-slate-700/80 ${
              comment.x > 0.5 ? 'right-full mr-2 top-0' : 'left-full ml-2 top-0'
            }`}
          >
            <div className="flex items-center gap-1.5 font-bold text-[11px] text-amber-300">
              <span>{categoryMeta.icon}</span>
              <span>{categoryMeta.label}</span>
              <span className="text-slate-400 font-normal">· Pg {comment.pageNum}</span>
            </div>
            {comment.text ? (
              <p className="max-w-[220px] truncate text-[11px] text-slate-200 mt-0.5 font-sans">
                {comment.text}
              </p>
            ) : (
              <span className="text-[10px] text-slate-400 italic">Click to write note</span>
            )}
          </div>
        )}
      </div>

      {/* 2. Interactive Wide & Advanced Sticky Note Card */}
      {isOpen && (
        <div
          ref={cardRef}
          style={getCardStyle()}
          className={`absolute rounded-2xl shadow-2xl border transition-all duration-200 bg-white/98 dark:bg-[#131624]/98 backdrop-blur-xl border-slate-200/95 dark:border-[#262B42] overflow-hidden ${
            alignTop ? 'bottom-full mb-3' : 'top-full mt-3'
          }`}
          onClick={e => e.stopPropagation()}
          onMouseDown={e => e.stopPropagation()}
        >
          {/* Top Colored Accent Stripe & Glow */}
          <div
            className="h-1.5 w-full cursor-grab active:cursor-grabbing transition-colors"
            style={{ backgroundColor: colorMeta.hex }}
            onPointerDown={handleDragStart}
          />

          {/* Card Header: Grip, Category Dropdown, Color Dots, Window Tools */}
          <div className="flex items-center justify-between px-3 py-2 bg-slate-50/90 dark:bg-[#181C30]/90 border-b border-slate-100 dark:border-[#22273D] gap-2 flex-wrap sm:flex-nowrap">
            {/* Left: Grip & Category Picker */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onPointerDown={handleDragStart}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-grab active:cursor-grabbing rounded hover:bg-slate-200/60 dark:hover:bg-slate-700/50"
                title="Drag to reposition note on page"
                aria-label="Drag note"
              >
                <GripVertical className="w-3.5 h-3.5" />
              </button>

              {/* Category Dropdown Pill */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowCategoryPicker(!showCategoryPicker)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border transition-all ${categoryMeta.badgeClass} ${categoryMeta.badgeBorder} hover:opacity-90`}
                >
                  <span>{categoryMeta.icon}</span>
                  <span className="max-w-[100px] truncate">{categoryMeta.label}</span>
                  <ChevronDown className="w-3 h-3 ml-0.5 opacity-60" />
                </button>

                {showCategoryPicker && (
                  <div className="absolute left-0 top-full mt-1.5 w-48 py-1 rounded-xl bg-white dark:bg-[#1C2035] shadow-2xl border border-slate-200 dark:border-[#2D3352] z-50 animate-fade-in">
                    <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Select Tag
                    </div>
                    {(Object.keys(COMMENT_CATEGORIES) as CommentCategory[]).map(catKey => {
                      const cat = COMMENT_CATEGORIES[catKey];
                      const isSelected = comment.category === catKey;
                      return (
                        <button
                          key={catKey}
                          type="button"
                          onClick={() => {
                            onUpdate({ category: catKey });
                            setShowCategoryPicker(false);
                            soundManager.playClick();
                          }}
                          className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs text-left transition-colors ${
                            isSelected
                              ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold'
                              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          <span>{cat.icon}</span>
                          <span className="flex-1">{cat.label}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-blue-500" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Center: Color Swatches Palette */}
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-200/50 dark:bg-slate-800/60 border border-slate-300/40 dark:border-slate-700/50">
              {(Object.keys(COMMENT_COLORS) as CommentColor[]).map(cKey => {
                const cInfo = COMMENT_COLORS[cKey];
                const isSelected = comment.color === cKey;
                return (
                  <button
                    key={cKey}
                    type="button"
                    onClick={() => {
                      onUpdate({ color: cKey });
                      soundManager.playClick();
                    }}
                    title={cInfo.label}
                    className={`w-3.5 h-3.5 rounded-full transition-transform hover:scale-130 ${
                      cInfo.bg
                    } ${
                      isSelected
                        ? 'ring-2 ring-slate-900 dark:ring-white scale-115 shadow-sm'
                        : 'opacity-75 hover:opacity-100'
                    }`}
                  />
                );
              })}
            </div>

            {/* Right: Mode Toggle (Edit / Preview), Expand Wide, Minimize, Delete */}
            <div className="flex items-center gap-1 shrink-0">
              {/* Tab: Edit vs Preview */}
              <div className="flex items-center rounded-lg bg-slate-200/60 dark:bg-slate-800/80 p-0.5 border border-slate-300/40 dark:border-slate-700/50">
                <button
                  type="button"
                  onClick={() => setActiveTab('edit')}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold transition-all ${
                    activeTab === 'edit'
                      ? 'bg-white dark:bg-[#141726] text-blue-600 dark:text-blue-400 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                  title="Edit Mode"
                >
                  <Edit3 className="w-3 h-3" />
                  <span className="hidden sm:inline">Edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold transition-all ${
                    activeTab === 'preview'
                      ? 'bg-white dark:bg-[#141726] text-purple-600 dark:text-purple-400 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                  title="Markdown Preview"
                >
                  <Eye className="w-3 h-3" />
                  <span className="hidden sm:inline">Preview</span>
                </button>
              </div>

              {/* Extra Wide Toggle */}
              <button
                type="button"
                onClick={() => {
                  setIsUltraWide(!isUltraWide);
                  soundManager.playClick();
                }}
                className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700/50"
                title={isUltraWide ? 'Comfortable Wide View' : 'Ultra-Wide Desk View'}
              >
                {isUltraWide ? (
                  <Minimize2 className="w-3.5 h-3.5" />
                ) : (
                  <Maximize2 className="w-3.5 h-3.5" />
                )}
              </button>

              {/* Minimize */}
              <button
                type="button"
                onClick={() => {
                  onUpdate({ isOpen: false });
                  soundManager.playClick();
                }}
                className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700/50"
                title="Minimize note (Esc)"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>

              {/* Delete */}
              <button
                type="button"
                onClick={() => {
                  onDelete();
                  soundManager.playClick();
                }}
                className="p-1 rounded text-rose-400 hover:text-rose-600 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                title="Delete note"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Sub-Toolbar: Advanced Formatting Tools (Active in Edit mode) */}
          {activeTab === 'edit' && (
            <div className="flex items-center justify-between px-3 py-1 bg-slate-100/60 dark:bg-[#15192C]/60 border-b border-slate-200/60 dark:border-[#20253B] text-[11px] gap-2 overflow-x-auto custom-scrollbar select-none">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => applyFormatting('**', '**', 'bold text')}
                  className="p-1 rounded text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  title="Bold (**text**)"
                >
                  <Bold className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={() => applyFormatting('*', '*', 'italic text')}
                  className="p-1 rounded text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  title="Italic (*text*)"
                >
                  <Italic className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={() => applyFormatting('==', '==', 'highlighted key point')}
                  className="p-1 rounded text-amber-600 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/40"
                  title="Highlight (==text==)"
                >
                  <Highlighter className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={() => applyFormatting('- ', '', 'Bullet item')}
                  className="p-1 rounded text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  title="Bullet List (- item)"
                >
                  <List className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={() => applyFormatting('- [ ] ', '', 'Task to complete')}
                  className="p-1 rounded text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  title="Task Checkbox (- [ ] task)"
                >
                  <CheckSquare className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={() => applyFormatting('`', '`', 'formula/code')}
                  className="p-1 rounded text-pink-600 dark:text-pink-300 hover:bg-pink-100 dark:hover:bg-pink-900/40"
                  title="Inline Formula/Code (`code`)"
                >
                  <Code className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={() => applyFormatting('> ', '', 'Trap warning or definition')}
                  className="p-1 rounded text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  title="Callout (> quote)"
                >
                  <Quote className="w-3 h-3" />
                </button>

                <div className="w-px h-3.5 bg-slate-300 dark:bg-slate-700 mx-1" />

                {/* Quick study tags */}
                <button
                  type="button"
                  onClick={() => applyFormatting('#PYQ ')}
                  className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100/70 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 hover:opacity-80"
                >
                  #PYQ
                </button>
                <button
                  type="button"
                  onClick={() => applyFormatting('#Formula ')}
                  className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100/70 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300 hover:opacity-80"
                >
                  #Formula
                </button>
                <button
                  type="button"
                  onClick={() => applyFormatting('#Trap ')}
                  className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-100/70 dark:bg-rose-900/30 text-rose-600 dark:text-rose-300 hover:opacity-80"
                >
                  #Trap
                </button>
              </div>

              {/* Character and word stats */}
              <span className="text-[10px] font-mono text-slate-400 shrink-0">
                {wordCount}w · {charCount}c
              </span>
            </div>
          )}

          {/* Card Body: Textarea (Edit Mode) OR Live Preview (Preview Mode) */}
          <div className="p-3">
            {activeTab === 'edit' ? (
              <textarea
                ref={textareaRef}
                value={comment.text}
                onChange={e => onUpdate({ text: e.target.value })}
                onKeyDown={handleKeyDown}
                placeholder="Write study concepts, trap alerts, formulas, or markdown (- [ ] todo, **bold**, ==highlight==)..."
                rows={3}
                className="w-full resize-none text-[13px] sm:text-sm leading-relaxed text-slate-800 dark:text-slate-100 bg-transparent placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-0 focus:border-0 font-sans border-0 p-0 select-text custom-scrollbar"
                style={{
                  minHeight: '100px',
                  maxHeight: isUltraWide ? '380px' : '280px'
                }}
              />
            ) : (
              <div
                className="overflow-y-auto custom-scrollbar p-1"
                style={{
                  minHeight: '100px',
                  maxHeight: isUltraWide ? '380px' : '280px'
                }}
              >
                {renderPreview(comment.text)}
              </div>
            )}
          </div>

          {/* Card Footer: Page Citation, Copy, To Notes, Done */}
          <div className="flex items-center justify-between px-3 py-2 bg-slate-50/80 dark:bg-[#16192C]/80 border-t border-slate-100 dark:border-[#22263C] text-[11px] gap-2 flex-wrap">
            {/* Left: Page Badge & Shortcut Tip */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-slate-500 dark:text-slate-400 text-[10px] font-bold bg-slate-200/50 dark:bg-slate-800/60 px-2 py-0.5 rounded-md">
                Page {comment.pageNum}
              </span>
              <span className="text-[10px] text-slate-400 hidden sm:inline">
                Ctrl+Enter to save
              </span>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex items-center gap-1.5 shrink-0">
              {/* Copy */}
              <button
                type="button"
                onClick={handleCopy}
                disabled={!comment.text}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-200/70 dark:hover:bg-slate-700/60 disabled:opacity-35 transition-colors cursor-pointer"
                title="Copy note text"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400 text-[10px]">
                      Copied!
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              {/* Push to Topic Notes */}
              {onPushToNotes && (
                <button
                  type="button"
                  onClick={handlePushToNotes}
                  disabled={!comment.text}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-black bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white disabled:opacity-35 shadow-xs transition-all cursor-pointer"
                  title="Append this note with page reference to Topic Notes"
                >
                  {pushed ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-200" />
                      <span>Saved!</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3 h-3 text-blue-200" />
                      <span>To Notes</span>
                    </>
                  )}
                </button>
              )}

              {/* Done Button */}
              <button
                type="button"
                onClick={() => {
                  onUpdate({ isOpen: false });
                  soundManager.playClick();
                }}
                className="px-3 py-1 rounded-lg text-[11px] font-black bg-slate-200/90 dark:bg-slate-700/90 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
