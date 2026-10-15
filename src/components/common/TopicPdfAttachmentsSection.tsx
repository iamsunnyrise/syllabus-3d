import React, { useState } from 'react';
import {
  FileText,
  Upload,
  ExternalLink,
  Eye,
  Trash2,
  Download,
  Plus,
  Link as LinkIcon,
  Check,
  AlertCircle,
  Clock,
  HardDrive,
  Columns,
  Bookmark
} from 'lucide-react';
import { TopicPdfAttachment } from '../../types/syllabus';
import { savePdfToStorage, getPdfBlobUrl, deletePdfFromStorage } from '../../utils/pdfStorage';
import { getPdfReadingProgress } from '../../utils/pdfProgressStorage';
import { TelegramIcon, isTelegramUrl, cleanTelegramUrl, parseTelegramDetails } from '../../utils/telegramUtils';
import { soundManager } from '../../utils/soundEffects';
import { InAppPdfReaderModal } from './InAppPdfReaderModal';

interface TopicPdfAttachmentsSectionProps {
  topicId: string;
  topicName: string;
  subjectName?: string;
  chapterName?: string;
  attachments?: TopicPdfAttachment[];
  onAddAttachment: (attachment: TopicPdfAttachment) => void;
  onDeleteAttachment: (attachmentId: string) => void;
  onOpenSplitStudy?: (attachmentId: string) => void;
}

export const TopicPdfAttachmentsSection: React.FC<TopicPdfAttachmentsSectionProps> = ({
  topicId,
  topicName,
  subjectName,
  chapterName,
  attachments = [],
  onAddAttachment,
  onDeleteAttachment,
  onOpenSplitStudy
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [showTelegramInput, setShowTelegramInput] = useState(false);
  const [urlName, setUrlName] = useState('');
  const [urlLink, setUrlLink] = useState('');
  const [tgName, setTgName] = useState('');
  const [tgUrl, setTgUrl] = useState('');
  const [tgChannel, setTgChannel] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);
  const [viewingAttachmentId, setViewingAttachmentId] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes?: number) => {
    if (!bytes || bytes === 0) return 'PDF Document';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes('pdf') && !file.name.toLowerCase().endsWith('.pdf')) {
      setErrorMessage('Please select a valid PDF file (.pdf).');
      setTimeout(() => setErrorMessage(null), 3000);
      return;
    }

    try {
      setIsUploading(true);
      const attachmentId = 'pdf_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);

      // Save file to IndexedDB
      await savePdfToStorage(attachmentId, file, file.name);

      const newAttachment: TopicPdfAttachment = {
        id: attachmentId,
        name: file.name,
        fileSize: file.size,
        uploadedAt: new Date().toISOString(),
        storageKey: attachmentId
      };

      onAddAttachment(newAttachment);
      soundManager.playCompleteChime();
      setSuccessNotice(`Added "${file.name}" to topic PDF notes!`);
      setTimeout(() => setSuccessNotice(null), 3000);

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      console.error('Failed to upload PDF:', err);
      setErrorMessage('Failed to save PDF. Please try again.');
      setTimeout(() => setErrorMessage(null), 3000);
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddUrlLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlLink.trim()) return;

    const isTg = isTelegramUrl(urlLink);
    const attachmentId = (isTg ? 'tg_note_' : 'pdf_link_') + Date.now();
    const cleanUrl = isTg ? cleanTelegramUrl(urlLink.trim()) : urlLink.trim();
    const tgDetails = isTg ? parseTelegramDetails(cleanUrl) : null;

    const newAttachment: TopicPdfAttachment = {
      id: attachmentId,
      name: urlName.trim() || (isTg ? `${topicName} Telegram Notes` : `${topicName} Study PDF`),
      fileSize: 0,
      uploadedAt: new Date().toISOString(),
      url: cleanUrl,
      type: isTg ? 'telegram' : 'link',
      telegramUrl: isTg ? cleanUrl : undefined,
      channelName: isTg ? tgDetails?.channelOrGroup : undefined
    };

    onAddAttachment(newAttachment);
    soundManager.playCompleteChime();
    setUrlName('');
    setUrlLink('');
    setShowUrlInput(false);
    setSuccessNotice(isTg ? 'Telegram notes link attached successfully! ✈️' : 'PDF link attached successfully!');
    setTimeout(() => setSuccessNotice(null), 3000);
  };

  const handleAddTelegramLink = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = tgUrl.trim();
    if (!raw) return;

    const clean = cleanTelegramUrl(raw);
    const details = parseTelegramDetails(raw);
    const attachmentId = 'tg_note_' + Date.now();
    const newAttachment: TopicPdfAttachment = {
      id: attachmentId,
      name: tgName.trim() || `${topicName} Telegram Notes`,
      fileSize: 0,
      uploadedAt: new Date().toISOString(),
      type: 'telegram',
      telegramUrl: clean,
      url: clean,
      channelName: tgChannel.trim() || details.channelOrGroup
    };

    onAddAttachment(newAttachment);
    soundManager.playCompleteChime();
    setTgName('');
    setTgUrl('');
    setTgChannel('');
    setShowTelegramInput(false);
    setSuccessNotice('Telegram notes attached successfully! ✈️');
    setTimeout(() => setSuccessNotice(null), 3000);
  };

  const handleOpenPdf = (attachment: TopicPdfAttachment) => {
    soundManager.playClick();
    setViewingAttachmentId(attachment.id);
  };

  const handleDownloadPdf = async (attachment: TopicPdfAttachment) => {
    soundManager.playCompleteChime();
    const fileName = attachment.name.endsWith('.pdf') ? attachment.name : `${attachment.name}.pdf`;

    if (attachment.url) {
      const a = document.createElement('a');
      a.href = attachment.url;
      a.download = fileName;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }

    if (attachment.storageKey || attachment.id) {
      const id = attachment.storageKey || attachment.id;
      const blobUrl = await getPdfBlobUrl(id);
      if (blobUrl) {
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        setErrorMessage('PDF file not found in local storage.');
        setTimeout(() => setErrorMessage(null), 3000);
      }
    }
  };

  const handleDelete = async (attachment: TopicPdfAttachment) => {
    soundManager.playClick();
    if (attachment.storageKey || attachment.id) {
      await deletePdfFromStorage(attachment.storageKey || attachment.id);
    }
    onDeleteAttachment(attachment.id);
  };

  return (
    <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-[#181822] border border-slate-200/80 dark:border-white/[0.08] shadow-xs overflow-hidden">
      {/* Executive Top Accent Gradient */}
      <div className="h-1 w-full bg-gradient-to-r from-rose-500 via-amber-500 to-indigo-500 opacity-90" />

      <div className="p-4 sm:p-5 space-y-4">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-100 dark:border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 flex items-center justify-center shrink-0 shadow-xs">
              <FileText className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm sm:text-base font-bold font-sans text-slate-900 dark:text-slate-100 tracking-tight">
                  Attached Topic PDFs & Materials
                </h4>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold tabular-nums bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                  {attachments.length}
                </span>
              </div>
              <p className="text-[11px] font-sans text-slate-400 dark:text-slate-500">
                Study notes, lecture slides & split-screen reader
              </p>
            </div>
          </div>

          {/* Action Buttons Toolbar */}
          <div className="flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto shrink-0 flex-wrap">
            <input
              type="file"
              ref={fileInputRef}
              accept="application/pdf,.pdf"
              onChange={handleFileUpload}
              className="hidden"
            />

            <button
              type="button"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs shadow-rose-600/20 transition-all cursor-pointer disabled:opacity-50 active:scale-95 whitespace-nowrap"
            >
              <Upload className="w-3.5 h-3.5 shrink-0 stroke-[2.2]" />
              <span>{isUploading ? 'Saving...' : '+ Upload PDF'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setShowTelegramInput(p => !p);
                setShowUrlInput(false);
              }}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#229ED9]/15 hover:bg-[#229ED9]/25 text-[#0088cc] dark:text-[#64B5F6] border border-[#229ED9]/30 text-xs font-bold transition-all cursor-pointer active:scale-95 whitespace-nowrap"
              title="Attach Telegram notes or PDF link"
            >
              <TelegramIcon className="w-3.5 h-3.5 fill-current shrink-0" />
              <span className="hidden sm:inline">+ Telegram Notes</span>
              <span className="sm:hidden">+ Telegram</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setShowUrlInput(p => !p);
                setShowTelegramInput(false);
              }}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/[0.08] text-xs font-semibold transition-all cursor-pointer active:scale-95 whitespace-nowrap"
              title="Attach PDF via link"
            >
              <LinkIcon className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Link URL</span>
              <span className="sm:hidden">URL</span>
            </button>
          </div>
        </div>

      {/* Notifications */}
      {successNotice && (
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
          <Check className="w-4 h-4 stroke-[3] shrink-0" />
          <span>{successNotice}</span>
        </div>
      )}

      {errorMessage && (
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-semibold">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Telegram Input Form (when toggled) */}
      {showTelegramInput && (
        <form onSubmit={handleAddTelegramLink} className="p-3.5 sm:p-4 rounded-2xl bg-[#229ED9]/5 border border-[#229ED9]/30 space-y-3 animate-fade-in shadow-xs">
          <div className="flex items-center justify-between pb-1.5 border-b border-[#229ED9]/20">
            <span className="text-xs font-bold text-[#0088cc] dark:text-[#64B5F6] flex items-center gap-1.5 font-mono uppercase">
              <TelegramIcon className="w-4 h-4 fill-current" />
              <span>Attach Telegram Notes / PDF Channel Link</span>
            </span>
            <button
              type="button"
              onClick={() => setShowTelegramInput(false)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-white text-xs cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
                Notes Title
              </label>
              <input
                type="text"
                value={tgName}
                onChange={e => setTgName(e.target.value)}
                placeholder="e.g. Handwritten Class Notes & Formulas"
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-[#229ED9]/30 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-[#229ED9]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
                Telegram Link / Handle <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={tgUrl}
                onChange={e => {
                  const val = e.target.value;
                  setTgUrl(val);
                  if (!tgChannel) {
                    const d = parseTelegramDetails(val);
                    if (d.channelOrGroup) setTgChannel(d.channelOrGroup);
                  }
                }}
                placeholder="e.g. https://t.me/channel/123 or @channel"
                required
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-[#229ED9]/30 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-[#229ED9]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
                Channel / Instructor Source (Optional)
              </label>
              <input
                type="text"
                value={tgChannel}
                onChange={e => setTgChannel(e.target.value)}
                placeholder="e.g. @SSC_Maths_Notes / Gagan Sir"
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-[#229ED9]/30 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-[#229ED9]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowTelegramInput(false)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#229ED9] hover:bg-[#1E88C7] text-white text-xs font-bold cursor-pointer active:scale-95 shadow-xs transition-all"
            >
              <TelegramIcon className="w-3.5 h-3.5 fill-white" />
              <span>Attach Telegram Notes</span>
            </button>
          </div>
        </form>
      )}

      {/* URL Input Form (when toggled) */}
      {showUrlInput && (
        <form onSubmit={handleAddUrlLink} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2.5">
          <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase font-mono block">
            Attach PDF via Web Link (Google Drive / Telegram / Web URL)
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input
              type="text"
              value={urlName}
              onChange={e => setUrlName(e.target.value)}
              placeholder="PDF Name (e.g. Percentage Class Notes)"
              className="px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:outline-none focus:border-rose-500"
            />
            <input
              type="url"
              value={urlLink}
              onChange={e => setUrlLink(e.target.value)}
              placeholder="https://.../notes.pdf"
              required
              className="px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:outline-none focus:border-rose-500"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowUrlInput(false)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold cursor-pointer"
            >
              Attach Link
            </button>
          </div>
        </form>
      )}

      {/* PDF & Notes List */}
      {attachments.length === 0 ? (
        <div className="py-8 px-4 text-center rounded-2xl bg-slate-50/60 dark:bg-white/[0.02] border border-dashed border-slate-200 dark:border-white/[0.08] space-y-3">
          <div className="flex items-center justify-center -space-x-1">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 border border-rose-500/20 flex items-center justify-center shadow-xs">
              <FileText className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="w-9 h-9 rounded-xl bg-[#229ED9] text-white flex items-center justify-center shadow-md">
              <TelegramIcon className="w-4 h-4 fill-white" />
            </div>
          </div>
          <div className="space-y-1 max-w-sm mx-auto">
            <h5 className="text-xs sm:text-sm font-bold font-sans text-slate-800 dark:text-slate-200">
              No PDFs or Notes Attached Yet
            </h5>
            <p className="text-[11px] font-sans text-slate-400 dark:text-slate-500 leading-relaxed">
              Upload local lecture PDFs, or link study resources directly from your Telegram channels.
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 flex-wrap pt-1">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer active:scale-95 shadow-xs"
            >
              + Upload PDF
            </button>
            <button
              type="button"
              onClick={() => {
                setShowTelegramInput(true);
                setShowUrlInput(false);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-[#229ED9] hover:bg-[#1E88C7] text-white text-xs font-bold cursor-pointer active:scale-95 shadow-xs flex items-center gap-1.5"
            >
              <TelegramIcon className="w-3.5 h-3.5 fill-white" />
              <span>+ Telegram Notes</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2.5">
          {attachments.map(att => {
            const isTg = att.type === 'telegram' || isTelegramUrl(att.url || att.telegramUrl);
            const tgDetails = isTg ? parseTelegramDetails(att.telegramUrl || att.url) : null;
            const progress = att.lastReadPage
              ? { pageNum: att.lastReadPage, totalPages: att.totalPages }
              : getPdfReadingProgress(att.id);

            return (
              <div
                key={att.id}
                className="group flex flex-col sm:flex-row sm:items-center justify-between p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50/70 hover:bg-white dark:bg-white/[0.03] dark:hover:bg-white/[0.06] border border-slate-200/80 hover:border-slate-300 dark:border-white/[0.08] dark:hover:border-white/20 transition-all duration-200 shadow-xs hover:shadow-sm gap-3"
              >
                {/* File Details */}
                <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
                  {isTg ? (
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#229ED9] to-[#0088cc] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                      <TelegramIcon className="w-5 h-5 fill-white" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-rose-500/10 dark:bg-rose-500/15 border border-rose-500/20 text-rose-600 dark:text-rose-400 flex flex-col items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                      <FileText className="w-5 h-5 stroke-[2.2]" />
                      <span className="text-[8px] font-black font-mono tracking-wider -mt-0.5 uppercase">PDF</span>
                    </div>
                  )}

                  <div className="min-w-0 flex-1 space-y-1">
                    <h5 className="text-xs sm:text-sm font-bold font-sans text-slate-800 dark:text-slate-100 truncate group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                      {att.name}
                    </h5>

                    <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] text-slate-400 dark:text-slate-500 font-mono flex-wrap">
                      {isTg ? (
                        <span className="px-2 py-0.5 rounded-md bg-[#229ED9]/15 text-[10px] sm:text-[11px] font-bold text-[#0088cc] dark:text-[#64B5F6] flex items-center gap-1">
                          <TelegramIcon className="w-3 h-3 fill-current" />
                          <span>Telegram Notes</span>
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-md bg-slate-200/60 dark:bg-white/[0.08] text-[10px] sm:text-[11px] font-bold text-slate-600 dark:text-slate-300">
                          {formatFileSize(att.fileSize)}
                        </span>
                      )}

                      {(att.channelName || tgDetails?.channelOrGroup) && (
                        <>
                          <span>•</span>
                          <span className="text-[#229ED9] dark:text-[#64B5F6] font-medium truncate max-w-[140px]">
                            {att.channelName || tgDetails?.channelOrGroup}
                          </span>
                        </>
                      )}

                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{new Date(att.uploadedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                      </span>

                      {att.url && !isTg && <span className="text-blue-500 dark:text-blue-400 font-semibold">(Web Link)</span>}

                      {progress && progress.pageNum > 1 && (
                        <>
                          <span>•</span>
                          <div className="flex items-center gap-1.5">
                            <span className="px-2 py-0.5 rounded-md bg-blue-500/15 text-[10px] sm:text-[11px] font-bold text-blue-600 dark:text-blue-400 border border-blue-500/20 flex items-center gap-1">
                              <Bookmark className="w-2.5 h-2.5 fill-current" />
                              <span>Page {progress.pageNum}{progress.totalPages ? ` / ${progress.totalPages}` : ''}</span>
                              {progress.totalPages && (
                                <span className="font-normal opacity-80">
                                  ({Math.round((progress.pageNum / progress.totalPages) * 100)}%)
                                </span>
                              )}
                            </span>
                            {progress.totalPages && (
                              <div className="hidden sm:block w-16 h-1.5 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                                <div
                                  className="h-full bg-blue-500 rounded-full"
                                  style={{ width: `${Math.min(100, Math.round((progress.pageNum / progress.totalPages) * 100))}%` }}
                                />
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Executive Action Toolbar */}
                <div className="flex items-center gap-1.5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/80 dark:border-white/[0.08] justify-end">
                  {/* Split-Screen Study Mode Button */}
                  {onOpenSplitStudy && (
                    <button
                      type="button"
                      onClick={() => onOpenSplitStudy(att.id)}
                      className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-500/25 text-xs font-semibold transition-all cursor-pointer active:scale-95"
                      title="Open PDF and Notes side-by-side in Split Study Mode"
                    >
                      <Columns className="w-3.5 h-3.5" />
                      <span className="font-sans">Split Study</span>
                    </button>
                  )}

                  {/* Primary Action Button (View / Resume / Open Telegram) */}
                  {isTg ? (
                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        const targetUrl = cleanTelegramUrl(att.telegramUrl || att.url);
                        window.open(targetUrl, '_blank');
                      }}
                      className="flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#229ED9] hover:bg-[#1E88C7] text-white text-xs font-bold transition-all cursor-pointer active:scale-95 shadow-xs"
                      title="Open Telegram resource in app or browser"
                    >
                      <TelegramIcon className="w-3.5 h-3.5 fill-white" />
                      <span className="font-sans">Open Telegram</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleOpenPdf(att)}
                      className={`flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-95 shadow-xs ${
                        progress && progress.pageNum > 1
                          ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'
                          : 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900'
                      }`}
                      title={progress && progress.pageNum > 1 ? `Resume PDF from Page ${progress.pageNum}` : 'Read PDF in distraction-free viewer'}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span className="font-sans">
                        {progress && progress.pageNum > 1 ? `Resume (p. ${progress.pageNum})` : 'View PDF'}
                      </span>
                    </button>
                  )}

                  {/* Download Button */}
                  {!isTg && (
                    <button
                      type="button"
                      onClick={() => handleDownloadPdf(att)}
                      className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-500/10 border border-transparent hover:border-emerald-500/20 transition-all cursor-pointer active:scale-95"
                      title="Download PDF to device"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() => handleDelete(att)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all cursor-pointer active:scale-95"
                    title="Remove Attachment"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* FULLSCREEN IN-APP PDF READER MODAL */}
      {viewingAttachmentId && (
        <InAppPdfReaderModal
          isOpen={Boolean(viewingAttachmentId)}
          onClose={() => setViewingAttachmentId(null)}
          topicId={topicId}
          topicName={topicName}
          subjectName={subjectName}
          chapterName={chapterName}
          attachments={attachments}
          initialAttachmentId={viewingAttachmentId}
          onOpenSplitStudy={onOpenSplitStudy}
        />
      )}
      </div>
    </div>
  );
};

