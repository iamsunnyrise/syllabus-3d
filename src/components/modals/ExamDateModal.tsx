import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, CalendarClock, Settings2 } from 'lucide-react';
import { ExamCountdown3D } from '../3d/ExamCountdown3D';
import { EditExamTargetModal } from './EditExamTargetModal';
import { useSyllabus } from '../../context/SyllabusContext';
import { soundManager } from '../../utils/soundEffects';

interface ExamDateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExamDateModal: React.FC<ExamDateModalProps> = ({ isOpen, onClose }) => {
  const { currentExam } = useSyllabus();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isEditModalOpen) {
          setIsEditModalOpen(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isEditModalOpen, onClose]);

  if (!isOpen) return null;
  if (typeof document === 'undefined') return null;

  const examName = currentExam?.name || 'Target Exam';

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md overflow-y-auto animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          soundManager.playClick();
          onClose();
        }
      }}
    >
      <div
        className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-[#0E111D] border border-slate-200/90 dark:border-white/10 shadow-2xl overflow-hidden my-auto pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="px-5 py-4 border-b border-slate-100 dark:border-white/[0.08] flex items-center justify-between bg-slate-50/70 dark:bg-white/[0.02]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-500 border border-amber-500/25 flex items-center justify-center shrink-0 shadow-2xs">
              <CalendarClock className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight truncate">
                Exam Date & Countdown
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                Target Runway & Daily Study Pace for <strong className="text-slate-700 dark:text-slate-300">{examName}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setIsEditModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] text-xs font-semibold text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-white/10 transition-colors shadow-2xs active:scale-95 cursor-pointer"
              title="Edit Exam Date & Target Goal"
            >
              <Settings2 className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden sm:inline">Edit Target Date</span>
              <span className="sm:hidden">Edit</span>
            </button>
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: The ExamCountdown3D component */}
        <div className="p-4 sm:p-5">
          <ExamCountdown3D onEditDate={() => setIsEditModalOpen(true)} />
        </div>
      </div>

      {/* Embedded Edit Target Date Modal */}
      {isEditModalOpen && (
        <EditExamTargetModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>,
    document.body
  );
};
