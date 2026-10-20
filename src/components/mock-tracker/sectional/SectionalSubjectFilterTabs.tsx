import React, { useRef } from 'react';
import { SectionName } from '../../../types/mockTracker';
import { SubjectTabItem, getSubjectMeta } from '../../../utils/sectionalSubjectUtils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SectionalSubjectFilterTabsProps {
  selectedSubject: SectionName | 'ALL';
  onSelectSubject: (subject: SectionName | 'ALL') => void;
  tabs?: SubjectTabItem[];
  counts?: Record<string, number>;
}

export const SectionalSubjectFilterTabs: React.FC<SectionalSubjectFilterTabsProps> = ({
  selectedSubject,
  onSelectSubject,
  tabs: customTabs,
  counts = {}
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Fallback if tabs not passed directly
  const tabs: SubjectTabItem[] = customTabs || [
    {
      id: 'ALL',
      label: 'All Subjects',
      shortLabel: 'All',
      icon: '⚡',
      count: counts['ALL'] || 0,
      meta: getSubjectMeta('ALL')
    },
    {
      id: 'Quantitative Aptitude',
      label: 'Quantitative Aptitude',
      shortLabel: 'Quant',
      icon: '📐',
      count: counts['Quantitative Aptitude'] || 0,
      meta: getSubjectMeta('Quantitative Aptitude')
    },
    {
      id: 'General Intelligence & Reasoning',
      label: 'Reasoning',
      shortLabel: 'Reasoning',
      icon: '🧠',
      count: counts['General Intelligence & Reasoning'] || 0,
      meta: getSubjectMeta('General Intelligence & Reasoning')
    },
    {
      id: 'English Comprehension',
      label: 'English',
      shortLabel: 'English',
      icon: '📖',
      count: counts['English Comprehension'] || 0,
      meta: getSubjectMeta('English Comprehension')
    },
    {
      id: 'General Awareness',
      label: 'General Awareness',
      shortLabel: 'GA / GK',
      icon: '🌍',
      count: counts['General Awareness'] || 0,
      meta: getSubjectMeta('General Awareness')
    },
    {
      id: 'Computer Knowledge',
      label: 'Computer',
      shortLabel: 'Computer',
      icon: '💻',
      count: counts['Computer Knowledge'] || 0,
      meta: getSubjectMeta('Computer Knowledge')
    }
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group/tabs flex items-center">
      {/* Optional Left Scroll Arrow for long lists */}
      {tabs.length > 5 && (
        <button
          type="button"
          onClick={() => scroll('left')}
          className="hidden md:flex absolute left-0 z-10 w-7 h-7 -ml-3 items-center justify-center rounded-full bg-white dark:bg-darkSurface border border-slate-200 dark:border-white/10 shadow-md text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-opacity opacity-0 group-hover/tabs:opacity-100"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}

      {/* Tabs Container */}
      <div 
        ref={scrollContainerRef}
        className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none w-full scroll-smooth"
      >
        {tabs.map((tab) => {
          const isActive = selectedSubject.toLowerCase() === tab.id.toLowerCase();
          const count = tab.count !== undefined ? tab.count : counts[tab.id] || 0;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectSubject(tab.id as SectionName | 'ALL')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all duration-200 border cursor-pointer ${
                isActive
                  ? 'bg-electric-blue text-darkBg border-electric-blue shadow-glow-blue scale-[1.02]'
                  : 'bg-white dark:bg-darkSurface text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border-slate-200 dark:border-white/10 shadow-sm hover:border-slate-300 dark:hover:border-white/20'
              }`}
            >
              <span className="text-sm">{tab.icon}</span>
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.5 text-[10px] rounded-md font-black transition-colors ${
                  isActive
                    ? 'bg-darkBg/25 text-darkBg'
                    : count > 0 
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-mint/20 dark:text-mint' 
                      : 'bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Optional Right Scroll Arrow */}
      {tabs.length > 5 && (
        <button
          type="button"
          onClick={() => scroll('right')}
          className="hidden md:flex absolute right-0 z-10 w-7 h-7 -mr-3 items-center justify-center rounded-full bg-white dark:bg-darkSurface border border-slate-200 dark:border-white/10 shadow-md text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-opacity opacity-0 group-hover/tabs:opacity-100"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
