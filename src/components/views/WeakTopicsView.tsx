import React, { useState, useMemo } from 'react';
import { useSyllabus } from '../../context/SyllabusContext';
import {
  ShieldAlert,
  Brain,
  Calculator,
  Compass,
  Eye,
  Clock,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Search,
  Filter,
  ChevronRight,
  Check,
  Zap,
  Sparkles,
  RotateCcw,
  BookOpen
} from 'lucide-react';
import { Topic, MistakeType } from '../../types/syllabus';
import { SectionBadgeIcon } from '../common/SectionBadgeIcon';
import { soundManager } from '../../utils/soundEffects';

interface WeakTopicsViewProps {
  onOpenTopicDrawer: (topic: Topic, subName: string, chName: string) => void;
  onOpenFocus?: (topicId?: string) => void;
  onNavigate?: (view: any) => void;
}

type SeverityFilter = 'all' | 'critical' | 'moderate' | 'traps_only';

export const WeakTopicsView: React.FC<WeakTopicsViewProps> = ({
  onOpenTopicDrawer,
  onOpenFocus,
  onNavigate
}) => {
  const { weakTopics, currentExam, updateTopicStatus } = useSyllabus();

  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedFallacy, setSelectedFallacy] = useState<MistakeType | 'all'>('all');
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Fallacy breakdown metrics
  const fallacyStats = useMemo(() => {
    let conceptual = 0;
    let calculation = 0;
    let formula = 0;
    let silly = 0;
    let timePressure = 0;
    let totalTraps = 0;

    weakTopics.forEach(item => {
      item.topic.mistakes?.forEach(m => {
        totalTraps++;
        if (m.mistakeType === 'conceptual') conceptual++;
        else if (m.mistakeType === 'calculation') calculation++;
        else if (m.mistakeType === 'formula') formula++;
        else if (m.mistakeType === 'silly') silly++;
        else if (m.mistakeType === 'time_pressure') timePressure++;
      });
    });

    return { conceptual, calculation, formula, silly, timePressure, totalTraps };
  }, [weakTopics]);

  // Filtered Weak Topics
  const filteredWeakTopics = useMemo(() => {
    return weakTopics.filter(wt => {
      // 1. Subject Filter
      if (selectedSubject !== 'all' && wt.subjectName !== selectedSubject) {
        return false;
      }

      // 2. Fallacy Filter
      if (selectedFallacy !== 'all') {
        const hasFallacy = wt.topic.mistakes?.some(m => m.mistakeType === selectedFallacy);
        if (!hasFallacy) return false;
      }

      // 3. Severity Filter
      if (severityFilter === 'critical' && wt.topic.accuracy >= 50) return false;
      if (severityFilter === 'moderate' && (wt.topic.accuracy < 50 || wt.topic.accuracy >= 75)) return false;
      if (severityFilter === 'traps_only' && (!wt.topic.mistakes || wt.topic.mistakes.length === 0)) return false;

      // 4. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = wt.topic.name.toLowerCase().includes(q);
        const matchesChapter = wt.chapterName.toLowerCase().includes(q);
        const matchesSubject = wt.subjectName.toLowerCase().includes(q);
        const matchesTrap = wt.topic.mistakes?.some(m =>
          (m.examinerTrap && m.examinerTrap.toLowerCase().includes(q)) ||
          (m.questionDescription && m.questionDescription.toLowerCase().includes(q)) ||
          (m.wrongLogic && m.wrongLogic.toLowerCase().includes(q))
        );
        if (!matchesName && !matchesChapter && !matchesSubject && !matchesTrap) return false;
      }

      return true;
    });
  }, [weakTopics, selectedSubject, selectedFallacy, severityFilter, searchQuery]);

  const handleMarkMastered = (e: React.MouseEvent, topicId: string) => {
    e.stopPropagation();
    soundManager.playCompleteChime();
    updateTopicStatus(topicId, 'completed');
  };

  return (
    <div className="space-y-3.5 sm:space-y-6 pb-36 sm:pb-24 max-w-5xl mx-auto font-sans animate-fade-in">
      
      {/* 1. TOP HEADER DIAGNOSTICS BANNER WITH 3D CYBER CHESS TRAP MAZE BACKGROUND */}
      <div className="weak-traps-hero-banner p-3.5 sm:p-7 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#0B0F19] via-[#0F1424] to-[#0A0C16] border border-white/[0.12] ring-1 ring-white/[0.06] shadow-2xl relative overflow-hidden text-white space-y-3 sm:space-y-4">
        
        {/* Full Uncropped High-Fidelity 3D Strategy & Diagnostics Artwork */}
        <div className="absolute right-0 top-0 bottom-0 w-full sm:w-3/4 md:w-3/5 lg:w-1/2 pointer-events-none overflow-hidden flex items-center justify-end z-0">
          <img
            src="/weak_traps_banner.png"
            alt="Weak Areas & Examiner Traps Diagnostics 3D"
            className="h-full w-auto max-w-none object-contain object-right opacity-35 sm:opacity-80 select-none"
            loading="eager"
            decoding="async"
            width={600}
            height={320}
          />
        </div>

        {/* Multi-layered High-Contrast Protection Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19] via-[#0B0F19]/95 sm:via-[#0B0F19]/85 md:via-[#0B0F19]/60 to-transparent pointer-events-none z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/90 via-transparent to-transparent pointer-events-none z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none z-0" />
        
        {/* Subtle Ambient Glow Orbs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Row */}
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
            <SectionBadgeIcon section="weak" size="lg" />
            <div className="min-w-0">
              <h1 className="weak-banner-title text-base sm:text-xl font-black text-white font-sans tracking-tight drop-shadow-xs">
                Weak Areas & Examiner Traps
              </h1>
              <p className="weak-banner-subtitle text-xs sm:text-[13px] text-slate-300 font-medium leading-relaxed mt-0.5">
                Targeted mistake analytics to eliminate blindspots and convert errors into marks.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 pt-0.5 sm:pt-0 font-sans font-bold text-[11px] sm:text-xs">
            <div className="weak-pill-rose px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl backdrop-blur-md shadow-xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
              <span>{weakTopics.length} Weak Topics</span>
            </div>
            <div className="weak-pill-amber px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl backdrop-blur-md shadow-xs flex items-center gap-1.5">
              <span>⚠️</span>
              <span>{fallacyStats.totalTraps} Logged Traps</span>
            </div>
          </div>
        </div>

        {/* 2. ROOT-CAUSE FALLACY INTERACTIVE TILES */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <span className="weak-section-label text-[11px] sm:text-xs font-bold uppercase tracking-wider font-sans">
              Root-Cause Fallacy Breakdown
            </span>
            {selectedFallacy !== 'all' && (
              <button
                onClick={() => {
                  soundManager.playClick();
                  setSelectedFallacy('all');
                }}
                className="text-[11px] sm:text-xs font-bold text-sky-400 hover:text-sky-300 hover:underline cursor-pointer font-sans"
              >
                Clear Filter
              </button>
            )}
          </div>

          <div className="flex sm:grid sm:grid-cols-5 gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar pb-1 -mx-0.5 px-0.5">
            {[
              { id: 'conceptual' as MistakeType, label: 'Conceptual', count: fallacyStats.conceptual, color: 'text-rose-300 bg-rose-500/15 border-rose-500/30 hover:bg-rose-500/25', icon: Brain },
              { id: 'calculation' as MistakeType, label: 'Calculation', count: fallacyStats.calculation, color: 'text-amber-300 bg-amber-500/15 border-amber-500/30 hover:bg-amber-500/25', icon: Calculator },
              { id: 'formula' as MistakeType, label: 'Formula', count: fallacyStats.formula, color: 'text-purple-300 bg-purple-500/15 border-purple-500/30 hover:bg-purple-500/25', icon: Compass },
              { id: 'silly' as MistakeType, label: 'Silly Traps', count: fallacyStats.silly, color: 'text-sky-300 bg-sky-500/15 border-sky-500/30 hover:bg-sky-500/25', icon: Eye },
              { id: 'time_pressure' as MistakeType, label: 'Time Crunch', count: fallacyStats.timePressure, color: 'text-emerald-300 bg-emerald-500/15 border-emerald-500/30 hover:bg-emerald-500/25', icon: Clock }
            ].map(tile => {
              const Icon = tile.icon;
              const isSelected = selectedFallacy === tile.id;
              return (
                <button
                  type="button"
                  key={tile.id}
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedFallacy(prev => (prev === tile.id ? 'all' : tile.id));
                  }}
                  aria-pressed={isSelected}
                  className={`weak-tile-btn min-w-[108px] sm:min-w-0 flex-1 shrink-0 px-2.5 py-2.5 sm:p-3 rounded-xl sm:rounded-2xl border backdrop-blur-xl transition-all cursor-pointer text-center relative active:scale-95 ${tile.color} ${
                    isSelected ? 'ring-2 ring-white/80 shadow-lg scale-[1.02] bg-white/20' : 'shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="text-[11px] sm:text-xs font-bold font-sans tracking-tight whitespace-nowrap">
                      {tile.label}
                    </span>
                  </div>
                  <h4 className="weak-tile-count text-xl sm:text-2xl font-black font-sans tracking-tight text-white tabular-nums">
                    {tile.count}
                  </h4>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. SEARCH & SMART FILTERS */}
      <div className="space-y-2 sm:space-y-2.5">
        
        {/* Search Bar + Severity Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          
          <div className="relative flex-1">
            <Search className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Search weak topics, chapters, or trap keywords..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-white dark:bg-[#151622] border border-slate-200/90 dark:border-white/10 text-xs sm:text-[13px] font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 shadow-xs transition-all"
            />
          </div>

          {/* Severity Pills */}
          <div className="flex items-center gap-1 p-1 rounded-xl sm:rounded-2xl bg-slate-100/80 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 shadow-xs shrink-0 overflow-x-auto no-scrollbar">
            {[
              { id: 'all' as SeverityFilter, label: 'All Weak' },
              { id: 'critical' as SeverityFilter, label: '🔴 Critical (<50%)' },
              { id: 'moderate' as SeverityFilter, label: '🟡 Moderate (50-70%)' },
              { id: 'traps_only' as SeverityFilter, label: '⚡ Has Traps' }
            ].map(sev => (
              <button
                key={sev.id}
                onClick={() => {
                  soundManager.playClick();
                  setSeverityFilter(sev.id);
                }}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold whitespace-nowrap transition-all cursor-pointer active:scale-95 ${
                  severityFilter === sev.id
                    ? 'bg-slate-900 dark:bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/10'
                }`}
              >
                {sev.label}
              </button>
            ))}
          </div>
        </div>

        {/* Subject Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <button
            onClick={() => {
              soundManager.playClick();
              setSelectedSubject('all');
            }}
            className={`px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold whitespace-nowrap transition-all border cursor-pointer active:scale-95 ${
              selectedSubject === 'all'
                ? 'bg-blue-600 dark:bg-blue-600 text-white border-transparent shadow-xs'
                : 'bg-white dark:bg-[#151622] text-slate-600 dark:text-slate-400 border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
            }`}
          >
            All Subjects ({weakTopics.length})
          </button>

          {currentExam?.subjects.map(s => {
            const count = weakTopics.filter(w => w.subjectName === s.name).length;
            const isSelected = selectedSubject === s.name;
            return (
              <button
                key={s.id}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedSubject(s.name);
                }}
                className={`px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold whitespace-nowrap transition-all border cursor-pointer active:scale-95 ${
                  isSelected
                    ? 'bg-blue-600 dark:bg-blue-600 text-white border-transparent shadow-xs'
                    : 'bg-white dark:bg-[#151622] text-slate-600 dark:text-slate-400 border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
                }`}
              >
                {s.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. WEAK TOPICS & TRAPS CARDS LIST */}
      <div className="space-y-3">
        {filteredWeakTopics.length === 0 ? (
          <div className="p-6 sm:p-12 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#151622] border border-dashed border-slate-200 dark:border-white/10 text-center space-y-3 sm:space-y-4 shadow-xs">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto shadow-sm">
              {searchQuery.trim() || severityFilter !== 'all' || selectedSubject !== 'all' ? (
                <Filter className="w-6 h-6 sm:w-8 sm:h-8 stroke-[1.8]" />
              ) : (
                <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2.2]" />
              )}
            </div>
            <div className="space-y-1">
              <h4 className="text-sm xs:text-base sm:text-lg font-black text-slate-900 dark:text-white">
                {searchQuery.trim() || severityFilter !== 'all' || selectedSubject !== 'all'
                  ? 'No Matching Vulnerabilities Found'
                  : 'Zero Weak Vulnerabilities Detected! 🎉'}
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto font-medium leading-relaxed">
                {searchQuery.trim() || severityFilter !== 'all' || selectedSubject !== 'all'
                  ? 'No weak topics match your active search or severity filters. Try resetting to view all detected traps.'
                  : 'All topics in your syllabus maintain high accuracy scores and zero unresolved examiner trap notes.'}
              </p>
            </div>

            {(searchQuery.trim() || severityFilter !== 'all' || selectedSubject !== 'all') ? (
              <div className="pt-1">
                <button
                  onClick={() => {
                    soundManager.playClick();
                    setSearchQuery('');
                    setSeverityFilter('all');
                    setSelectedSubject('all');
                    setSelectedFallacy('all');
                  }}
                  className="w-full xs:w-auto px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-400/30 text-[11px] sm:text-xs font-bold transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shadow-xs tap-bounce"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Filters & Search</span>
                </button>
              </div>
            ) : (
              <div className="pt-2 flex items-center justify-center gap-2 sm:gap-2.5 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[11px] sm:text-xs font-sans font-bold border border-emerald-500/25">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>100% Trap Free • High Retention Strength</span>
                </span>
                {onNavigate && (
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      onNavigate('syllabus');
                    }}
                    className="w-full xs:w-auto px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white text-[11px] sm:text-xs font-black transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shadow-xs tap-bounce"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Explore Full Syllabus</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}
          </div>
        ) : (
          filteredWeakTopics.map(({ topic, subjectName, chapterName }) => {
            const accuracy = topic.accuracy || 0;
            const isCritical = accuracy < 50;
            const mistakes = topic.mistakes || [];
            const activeMistakes = mistakes.filter(m => !m.resolved);

            return (
              <div
                key={topic.id}
                onClick={() => onOpenTopicDrawer(topic, subjectName, chapterName)}
                className="p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#151622] border border-slate-200/90 dark:border-white/10 hover:border-blue-500/70 dark:hover:border-blue-400/60 transition-all shadow-xs hover:shadow-md space-y-3 cursor-pointer group active:scale-[0.99]"
              >
                {/* Top Row: Subject/Chapter Badge + Accuracy Pill + Mastered Action */}
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-white/5 pb-2.5">
                  <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                    <span className="px-2.5 py-0.5 rounded-lg text-[11px] sm:text-xs font-bold font-sans bg-blue-50 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30 whitespace-nowrap shrink-0">
                      {subjectName}
                    </span>
                    <span className="text-[11px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 truncate">
                      {chapterName}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                    {/* Accuracy Badge */}
                    <div className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold font-sans flex items-center gap-1 sm:gap-1.5 whitespace-nowrap ${
                      isCritical
                        ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/25'
                        : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/25'
                    }`}>
                      <AlertTriangle className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                      <span className="tabular-nums font-black">{accuracy}%</span>
                      <span>Accuracy</span>
                    </div>

                    {/* Quick Mark Mastered Button */}
                    <button
                      onClick={e => handleMarkMastered(e, topic.id)}
                      className="flex items-center gap-1 px-2.5 py-0.5 sm:py-1 rounded-lg sm:rounded-xl bg-emerald-500/10 hover:bg-emerald-500 hover:text-white text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[11px] sm:text-xs font-bold transition-all cursor-pointer active:scale-95 whitespace-nowrap"
                      title="Mark as Mastered"
                    >
                      <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5]" />
                      <span>Mastered</span>
                    </button>
                  </div>
                </div>

                {/* Topic Title & Traps Count */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="space-y-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                      {topic.name}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 flex-wrap font-medium">
                      <span>Diff: <strong className="text-slate-700 dark:text-slate-200">{topic.difficulty || 'Medium'}</strong></span>
                      <span>•</span>
                      <span>Weight: <strong className="text-slate-700 dark:text-slate-200">{topic.weightage || 'High'}</strong></span>
                      <span>•</span>
                      <span className="text-amber-600 dark:text-amber-400 font-bold inline-flex items-center gap-1">
                        ⚠️ {mistakes.length} Traps ({activeMistakes.length} Active)
                      </span>
                    </p>
                  </div>

                  {/* Action Shortcuts */}
                  <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-white/5">
                    {onOpenFocus && (
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          soundManager.playClick();
                          onOpenFocus(topic.id);
                        }}
                        className="flex-1 sm:flex-none h-9 sm:h-9.5 flex items-center justify-center gap-1.5 px-3.5 rounded-xl bg-slate-900 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-[11px] sm:text-xs font-bold shadow-xs transition-all cursor-pointer active:scale-95 tap-bounce"
                        title="Start Deep Study Timer on this Topic"
                      >
                        <Zap className="w-3.5 h-3.5 fill-current" />
                        <span>Focus Drill</span>
                      </button>
                    )}

                    <div className="h-9 sm:h-9.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 flex items-center justify-center gap-1 text-[11px] sm:text-xs font-bold text-blue-600 dark:text-blue-400 transition-all cursor-pointer">
                      <span>Inspect</span>
                      <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Logged Traps Snippet Box (if any) */}
                {mistakes.length > 0 && (
                  <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-[#11121a] border border-slate-200/80 dark:border-white/10 space-y-2">
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase font-sans tracking-wider flex items-center gap-1.5">
                      <span>⚠️</span> Active Examiner Trap Notes:
                    </span>
                    {mistakes.slice(0, 2).map((m, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-800 dark:text-slate-200">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-sans font-bold uppercase shrink-0 mt-0.5 ${
                          m.mistakeType === 'conceptual' ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/20' :
                          m.mistakeType === 'calculation' ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20' :
                          m.mistakeType === 'formula' ? 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/20' :
                          'bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                        }`}>
                          {m.mistakeType}
                        </span>
                        <p className="line-clamp-2 sm:line-clamp-none italic text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                          "{m.examinerTrap || m.questionDescription || m.wrongLogic || 'Examiner trap logged during mock'}"
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

