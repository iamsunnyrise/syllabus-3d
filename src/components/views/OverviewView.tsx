import React from 'react';
import { useSyllabus } from '../../context/SyllabusContext';
import { useAuth } from '../../context/AuthContext';
import { AppView } from '../layout/Sidebar';
import { Topic } from '../../types/syllabus';
import { PunditsHeroBanner } from '../dashboard/PunditsHeroBanner';
import { PortalFeatureCards } from '../dashboard/PortalFeatureCards';

interface OverviewViewProps {
  onNavigate: (view: AppView) => void;
  onNavigateToSubject?: (subjectId: string) => void;
  onOpenTopicDrawer?: (topic: Topic, subName: string, chName: string) => void;
  onOpenRevisionSession?: () => void;
  onOpenAddTopic?: () => void;
  onOpenFocus?: () => void;
  onOpenWalkAndRevise?: () => void;
  onOpenBacklogRescue?: () => void;
  onOpenPricing?: () => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  onNavigate,
  onNavigateToSubject: _onNavigateToSubject,
  onOpenTopicDrawer,
  onOpenRevisionSession: _onOpenRevisionSession,
  onOpenAddTopic: _onOpenAddTopic,
  onOpenFocus,
  onOpenWalkAndRevise: _onOpenWalkAndRevise,
  onOpenBacklogRescue: _onOpenBacklogRescue,
  onOpenPricing,
}) => {
  const {
    overallStats,
    profile,
    currentExam
  } = useSyllabus();
  const { user } = useAuth();

  const examName = currentExam?.name || 'SSC CGL 2026';

  return (
    <div className="space-y-3.5 sm:space-y-4 lg:space-y-4.5 pb-28 sm:pb-24 md:pb-20">
      
      {/* 🖨️ PRINT-ONLY DESK REVISION SUMMARY HEADER */}
      <div className="hidden print:block mb-6 pb-4 border-b-2 border-black">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-gray-700 block">
              STUDY DESK REVISION CHEATSHEET
            </span>
            <h1 className="text-2xl font-black uppercase tracking-tight text-black mt-1">
              🎯 {examName.toUpperCase()} • DESK MISSION CONTROL
            </h1>
            <div className="flex items-center gap-3 text-xs font-mono text-gray-700 mt-2">
              <span>Aspirant: <strong>{profile.name || user?.name || 'Scholar'}</strong></span>
              <span>• Overall Progress: <strong>{overallStats.completionPercentage}% Mastered ({overallStats.completedCount}/{overallStats.totalTopics} Topics)</strong></span>
            </div>
          </div>
          <div className="text-right text-xs font-mono">
            <div className="font-bold text-black uppercase">Study Desk Dashboard</div>
            <div className="text-gray-600 mt-1">Printed: {new Date().toLocaleDateString()}</div>
            <div className="text-xs text-gray-500 mt-0.5">Syllabus 3D Precision Study System</div>
          </div>
        </div>
      </div>

      {/* 🌟 1. ICONIC PUNDITS WELCOME HERO BANNER */}
      <PunditsHeroBanner
        onNavigate={onNavigate}
        onOpenPricing={onOpenPricing}
        examName={examName}
        onOpenFocus={onOpenFocus}
        onOpenTopicDrawer={onOpenTopicDrawer}
      />

      {/* 🖥️ 2. THREE LARGE MONITOR FEATURE CARDS (Syllabus Explorer, Mock Test Tracker, Mock & Study Portals) */}
      <PortalFeatureCards
        onNavigate={onNavigate}
        onOpenPricing={onOpenPricing}
      />
    </div>
  );
};
