import React, { useState, useMemo } from 'react';
import { useMocks } from '../../../context/MockContext';
import { SectionalDashboard } from '../sectional/SectionalDashboard';
import { SectionalSubjectFilterTabs } from '../sectional/SectionalSubjectFilterTabs';
import { SectionalTrendChart } from '../sectional/SectionalTrendChart';
import { SectionalMockCard } from '../sectional/SectionalMockCard';
import { SectionalDrillAnalysisModal } from '../sectional/SectionalDrillAnalysisModal';
import { EmptyState } from '../common/EmptyState';
import { MockTest, SectionName } from '../../../types/mockTracker';
import { discoverSectionalSubjects, isMockMatchingSubject } from '../../../utils/sectionalSubjectUtils';
import { Plus } from 'lucide-react';

export const SectionalView: React.FC = () => {
  const { sectionalMocks, setIsAddModalOpen, setEditingMock, subjectsWithChapters } = useMocks();
  const [selectedSubject, setSelectedSubject] = useState<SectionName | 'ALL'>('ALL');
  const [analyzingMock, setAnalyzingMock] = useState<MockTest | null>(null);

  // Dynamically discover all active subjects from sectional mocks & active syllabus
  const discoveredTabs = useMemo(() => {
    return discoverSectionalSubjects(sectionalMocks, subjectsWithChapters);
  }, [sectionalMocks, subjectsWithChapters]);

  // Filter sectional mocks by selected subject tab
  const filteredDrills = useMemo(() => {
    if (selectedSubject === 'ALL') return sectionalMocks;
    return sectionalMocks.filter(m => isMockMatchingSubject(m, selectedSubject));
  }, [sectionalMocks, selectedSubject]);

  const subjectTitle = selectedSubject === 'ALL' ? 'All Subjects' : selectedSubject;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Sectional Dedicated Dashboard Header with interactive dynamic subject shortcuts & filtered KPIs */}
      <SectionalDashboard
        selectedSubject={selectedSubject}
        onSelectSubject={setSelectedSubject}
        allSectionalMocks={sectionalMocks}
        activeMocks={filteredDrills}
        subjectTabs={discoveredTabs}
      />

      {/* 2. Subject Filter Tabs (Dynamic for SSC, Banking, Railways, Defence, etc.) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Subject Focus Filter
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
            Showing {filteredDrills.length} Drills
          </span>
        </div>

        <SectionalSubjectFilterTabs
          selectedSubject={selectedSubject}
          onSelectSubject={setSelectedSubject}
          tabs={discoveredTabs}
        />
      </div>

      {/* 3. Sectional Progression Trend Chart (Adaptive benchmarks & Y-Axis) */}
      <SectionalTrendChart
        mocks={filteredDrills}
        subjectTitle={subjectTitle}
      />

      {/* 4. Sectional Mock Drills Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {subjectTitle} Practice Tests ({filteredDrills.length})
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Click any drill card to open its single-subject pace diagnosis and error analysis
            </p>
          </div>

          <button
            onClick={() => {
              setEditingMock(null);
              setIsAddModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-mint to-mint-dark dark:from-mint dark:to-mint text-darkBg font-extrabold text-xs shadow-glow-mint hover:opacity-90 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add Sectional Drill</span>
          </button>
        </div>

        {filteredDrills.length === 0 ? (
          <EmptyState
            title={`No ${subjectTitle} Drills Yet`}
            description={`Log your first ${subjectTitle} speed drill to activate single-subject pacing intelligence and accuracy diagnosis.`}
            actionText={`Log ${subjectTitle} Drill`}
            onAction={() => {
              setEditingMock(null);
              setIsAddModalOpen(true);
            }}
            icon="⚡"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDrills.map((mock) => (
              <SectionalMockCard
                key={mock.id}
                mock={mock}
                onOpenAnalysis={(m) => setAnalyzingMock(m)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Deep Sectional Drill Modal */}
      {analyzingMock && (
        <SectionalDrillAnalysisModal
          mock={analyzingMock}
          onClose={() => setAnalyzingMock(null)}
        />
      )}
    </div>
  );
};
