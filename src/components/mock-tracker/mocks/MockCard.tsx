import React, { useState } from 'react';
import { 
  MoreVertical, 
  Edit3, 
  Copy, 
  Trash2, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle,
  BarChart2,
  GitCompare,
  ArrowUpRight,
  ShieldCheck,
  Award
} from 'lucide-react';
import { MockTest } from '../../../types/mockTracker';
import { useMocks } from '../../../context/MockContext';
import { useTheme } from '../../../context/ThemeContext';
import { Card3DTilt } from '../3d/Card3DTilt';

interface MockCardProps {
  mock: MockTest;
  onOpenAnalysis?: (mock: MockTest) => void;
}

export const MockCard: React.FC<MockCardProps> = ({ mock, onOpenAnalysis }) => {
  const { 
    setEditingMock, 
    setIsAddModalOpen, 
    duplicateMock, 
    deleteMock, 
    setViewingMockDetail, 
    selectedMockIds, 
    toggleMockSelection 
  } = useMocks();

  const { isDark } = useTheme();
  const [showMenu, setShowMenu] = useState(false);

  const isSelected = selectedMockIds.includes(mock.id);
  const cutoff = mock.cutoffMarks || 130;
  const scoreDelta = Math.round((mock.score - cutoff) * 10) / 10;

  const handleCardClick = () => {
    if (onOpenAnalysis) {
      onOpenAnalysis(mock);
    } else {
      setViewingMockDetail(mock);
    }
  };

  const getPlatformStyle = (platform: string) => {
    const p = (platform || '').toLowerCase();
    if (p.includes('testbook')) {
      return {
        bg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
        text: 'text-emerald-700 dark:text-emerald-300',
        border: 'border-emerald-500/25',
        label: 'Testbook'
      };
    }
    if (p.includes('oliveboard')) {
      return {
        bg: 'bg-sky-500/10 dark:bg-sky-500/15',
        text: 'text-sky-700 dark:text-sky-300',
        border: 'border-sky-500/25',
        label: 'Oliveboard'
      };
    }
    if (p.includes('practice') || p.includes('pm')) {
      return {
        bg: 'bg-indigo-500/10 dark:bg-indigo-500/15',
        text: 'text-indigo-700 dark:text-indigo-300',
        border: 'border-indigo-500/25',
        label: 'PracticeMock'
      };
    }
    if (p.includes('gradeup') || p.includes('byju')) {
      return {
        bg: 'bg-purple-500/10 dark:bg-purple-500/15',
        text: 'text-purple-700 dark:text-purple-300',
        border: 'border-purple-500/25',
        label: "BYJU'S"
      };
    }
    return {
      bg: 'bg-amber-500/10 dark:bg-amber-500/15',
      text: 'text-amber-800 dark:text-amber-300',
      border: 'border-amber-500/25',
      label: platform || 'Mock Portal'
    };
  };

  const getSectionAbbr = (name: string) => {
    const n = (name || '').toLowerCase();
    if (n.includes('quant') || n.includes('math')) return 'QA';
    if (n.includes('reason') || n.includes('intel')) return 'GI';
    if (n.includes('english')) return 'ENG';
    if (n.includes('aware') || n.includes('general') || n.includes('gk') || n.includes('ga')) return 'GA';
    if (n.includes('comput')) return 'CS';
    return name.slice(0, 3).toUpperCase();
  };

  const platformStyle = getPlatformStyle(mock.testPlatform);

  return (
    <Card3DTilt
      maxTilt={4}
      glowColor="rgba(225, 168, 55, 0.08)"
      className={`group relative p-4 sm:p-5 rounded-2xl sm:rounded-3xl border transition-all duration-300 flex flex-col justify-between select-none ${
        isSelected
          ? 'border-amber-500 bg-amber-500/[0.04] ring-2 ring-amber-500/25 shadow-md'
          : isDark
            ? 'bg-[#121424] border-white/[0.08] hover:border-white/20 shadow-xs hover:shadow-[0_12px_36px_rgba(0,0,0,0.5)] hover:-translate-y-1'
            : 'bg-[#FFFDF8] border-[#E2D1B3] hover:border-[#D4BE98] shadow-[0_2px_10px_rgba(56,55,13,0.04)] hover:shadow-[0_12px_28px_rgba(56,55,13,0.1)] hover:-translate-y-1'
      }`}
    >
      <div>
        {/* Top Header: Platform, Type, Cutoff Pill & Menu */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 min-w-0 flex-wrap">
            {/* Compare Checkbox */}
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => {
                e.stopPropagation();
                toggleMockSelection(mock.id);
              }}
              title="Select to compare"
              className="w-4 h-4 rounded-md border-slate-300 dark:border-white/20 bg-white dark:bg-[#181A28] text-amber-500 focus:ring-0 cursor-pointer accent-amber-500 shrink-0"
            />

            {/* Platform Brand Pill */}
            <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider border shrink-0 ${platformStyle.bg} ${platformStyle.text} ${platformStyle.border}`}>
              {platformStyle.label}
            </span>

            {/* Mock Type Tag */}
            <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-white/[0.07] text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 shrink-0">
              {mock.mockType.replace('_', ' ')}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
            {/* Cutoff Status Chip */}
            {mock.isClearedCutoff ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-black bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/35 shadow-2xs">
                <CheckCircle2 className="w-3 h-3 stroke-[2.5] text-emerald-600 dark:text-emerald-400" />
                <span>Cutoff Cleared</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-black bg-rose-500/15 dark:bg-rose-500/20 text-rose-700 dark:text-rose-400 border border-rose-500/35 shadow-2xs">
                <XCircle className="w-3 h-3 stroke-[2.5] text-rose-600 dark:text-rose-400" />
                <span>Below Cutoff</span>
              </span>
            )}

            {/* Options Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(!showMenu);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                title="More options"
                aria-label="More options"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {showMenu && (
                <div 
                  onClick={(e) => e.stopPropagation()}
                  className="absolute right-0 top-7 z-30 w-44 rounded-2xl bg-white dark:bg-[#181A2A] border border-slate-200 dark:border-white/10 shadow-2xl py-1.5 text-xs text-slate-700 dark:text-slate-200 animate-fadeIn backdrop-blur-xl"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setShowMenu(false);
                      handleCardClick();
                    }}
                    className="w-full text-left px-3.5 py-2 hover:bg-slate-100 dark:hover:bg-white/10 flex items-center gap-2.5 font-bold cursor-pointer"
                  >
                    <BarChart2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>Deep Analysis</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowMenu(false);
                      setEditingMock(mock);
                      setIsAddModalOpen(true);
                    }}
                    className="w-full text-left px-3.5 py-2 hover:bg-slate-100 dark:hover:bg-white/10 flex items-center gap-2.5 font-bold cursor-pointer"
                  >
                    <Edit3 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Edit Mock</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowMenu(false);
                      duplicateMock(mock.id);
                    }}
                    className="w-full text-left px-3.5 py-2 hover:bg-slate-100 dark:hover:bg-white/10 flex items-center gap-2.5 font-bold cursor-pointer"
                  >
                    <Copy className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span>Duplicate</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowMenu(false);
                      toggleMockSelection(mock.id);
                    }}
                    className="w-full text-left px-3.5 py-2 hover:bg-slate-100 dark:hover:bg-white/10 flex items-center gap-2.5 font-bold cursor-pointer"
                  >
                    <GitCompare className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                    <span>{isSelected ? 'Deselect' : 'Compare'}</span>
                  </button>
                  <div className="my-1 border-t border-slate-100 dark:border-white/10" />
                  <button
                    type="button"
                    onClick={() => {
                      setShowMenu(false);
                      if (confirm(`Delete "${mock.testName}"?`)) {
                        deleteMock(mock.id);
                      }
                    }}
                    className="w-full text-left px-3.5 py-2 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center gap-2.5 font-bold cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Attempt</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Test Title & Date Info */}
        <div onClick={handleCardClick} className="cursor-pointer space-y-1.5">
          <h3 className="text-base sm:text-[17px] font-black tracking-tight text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-1 font-sans leading-snug">
            {mock.testName}
          </h3>

          <div className="flex items-center gap-2 sm:gap-2.5 text-xs text-slate-600 dark:text-slate-400 font-sans font-medium flex-wrap">
            <span className="font-bold text-slate-800 dark:text-slate-200">
              {mock.exam} ({mock.tier})
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1 tabular-nums">
              <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {mock.date}
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1 tabular-nums">
              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {mock.timeTakenMinutes}m
            </span>
            {mock.difficulty && (
              <>
                <span>•</span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                  {mock.difficulty}
                </span>
              </>
            )}
          </div>
        </div>

        {/* High-Precision 3-Metric Bento Grid */}
        <div 
          onClick={handleCardClick}
          className="mt-3.5 p-3 sm:p-3.5 rounded-2xl bg-gradient-to-b from-slate-50/90 to-slate-100/60 dark:from-white/[0.04] dark:to-white/[0.02] border border-slate-200/80 dark:border-white/10 grid grid-cols-3 divide-x divide-slate-200/80 dark:divide-white/10 text-center shadow-2xs cursor-pointer"
        >
          {/* 1. Score Tile */}
          <div className="px-1 flex flex-col items-center justify-center">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Score
            </span>
            <div className="flex items-baseline justify-center gap-0.5 mt-0.5">
              <span className={`text-xl sm:text-2xl font-black font-sans tabular-nums ${
                mock.isClearedCutoff ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'
              }`}>
                {mock.score}
              </span>
              <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                /{mock.maxMarks}
              </span>
            </div>
            {scoreDelta >= 0 ? (
              <span className="inline-block mt-0.5 text-[9.5px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded-md tabular-nums">
                +{scoreDelta} Cutoff
              </span>
            ) : (
              <span className="inline-block mt-0.5 text-[9.5px] font-bold text-rose-700 dark:text-rose-400 bg-rose-500/10 px-1.5 py-0.2 rounded-md tabular-nums">
                {scoreDelta} Cutoff
              </span>
            )}
          </div>

          {/* 2. Accuracy Tile */}
          <div className="px-1 flex flex-col items-center justify-center">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Accuracy
            </span>
            <div className="text-xl sm:text-2xl font-black font-sans tabular-nums text-blue-600 dark:text-blue-400 mt-0.5">
              {mock.accuracy}%
            </div>
            <span className="inline-block mt-0.5 text-[9.5px] font-bold text-slate-600 dark:text-slate-300">
              {mock.accuracy >= 85 ? '🎯 Sharp' : mock.accuracy >= 75 ? '⚡ Solid' : '⚠️ Refine'}
            </span>
          </div>

          {/* 3. Percentile Tile */}
          <div className="px-1 flex flex-col items-center justify-center">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Percentile
            </span>
            <div className="text-xl sm:text-2xl font-black font-sans tabular-nums text-purple-600 dark:text-purple-400 mt-0.5">
              {mock.percentile}%
            </div>
            <span className="inline-block mt-0.5 text-[9.5px] font-bold text-purple-700 dark:text-purple-300 bg-purple-500/10 px-1.5 py-0.2 rounded-md tabular-nums">
              {mock.rank ? `#${mock.rank} Rank` : `Top ${(100 - mock.percentile).toFixed(1)}%`}
            </span>
          </div>
        </div>
      </div>

      {/* Footer Strip: Sectional Performance Preview & Analysis Pill */}
      <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-white/[0.08] flex items-center justify-between gap-2">
        {mock.sections.length > 0 ? (
          <div className="flex items-center gap-1.5 min-w-0 flex-1 overflow-hidden" title="Sectional performance breakdown">
            <span className="text-[10.5px] font-bold text-slate-500 dark:text-slate-400 shrink-0 hidden sm:inline">
              {mock.sections.length} Sec:
            </span>
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
              {mock.sections.map((s, idx) => {
                const abbr = getSectionAbbr(s.sectionName);
                const isHigh = s.accuracy >= 85;
                const isDecent = s.accuracy >= 70;
                const dotColor = isHigh ? 'bg-emerald-500' : isDecent ? 'bg-blue-500' : 'bg-rose-500';
                const chipBg = isHigh 
                  ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/25' 
                  : isDecent 
                  ? 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/25' 
                  : 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/25';

                return (
                  <span
                    key={idx}
                    title={`${s.sectionName}: ${s.score}/${s.maxMarks} marks (${s.accuracy}% accuracy)`}
                    className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[9.5px] font-black border tracking-wider shrink-0 transition-transform hover:scale-105 ${chipBg}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
                    <span>{abbr}</span>
                  </span>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex-1" />
        )}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleCardClick();
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-blue-50 hover:bg-blue-600 dark:bg-blue-950/40 text-blue-600 hover:text-white dark:text-blue-400 dark:hover:bg-blue-500 dark:hover:text-white border border-blue-200/80 dark:border-blue-500/30 transition-all shadow-2xs group-hover:border-blue-400 active:scale-95 cursor-pointer ml-auto shrink-0"
        >
          <span>Analysis</span>
          <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </Card3DTilt>
  );
};
