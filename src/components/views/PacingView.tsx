import React, { useState } from 'react';
import { SyllabusPacingCard } from '../dashboard/SyllabusPacingCard';
import { EditExamTargetModal } from '../modals/EditExamTargetModal';
import { AppView } from '../layout/Sidebar';

interface PacingViewProps {
  onNavigate: (view: AppView) => void;
  onNavigateToSubject?: (subjectId: string) => void;
}

export const PacingView: React.FC<PacingViewProps> = ({
  onNavigate
}) => {
  const [isEditExamModalOpen, setIsEditExamModalOpen] = useState(false);

  return (
    <div className="space-y-4 sm:space-y-6 pb-40 sm:pb-24 font-sans w-full max-w-7xl mx-auto px-1 sm:px-2 animate-fade-in">
      <SyllabusPacingCard
        onOpenEditExamTarget={() => setIsEditExamModalOpen(true)}
        onNavigateToSyllabus={() => onNavigate('syllabus')}
        onPrint={() => window.print()}
      />

      {/* Target Exam Date Customizer Modal */}
      <EditExamTargetModal
        isOpen={isEditExamModalOpen}
        onClose={() => setIsEditExamModalOpen(false)}
      />
    </div>
  );
};
