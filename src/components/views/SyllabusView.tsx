import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useSyllabus } from '../../context/SyllabusContext';
import { Topic, TopicStatus, Chapter, Subject } from '../../types/syllabus';
import {
  Search,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  Plus,
  Calculator,
  BrainCircuit,
  BookOpen,
  Globe,
  Edit2,
  Trash2,
  FileText,
  AlertTriangle,
  Layers,
  X,
  CheckCircle2,
  Zap,
  Circle,
  Clock,
  RotateCw,
  Target,
  Sparkles,
  Calendar,
  Trophy,
  FolderOpen,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { EditSubjectModal } from '../modals/EditSubjectModal';
import { EditChapterModal } from '../modals/EditChapterModal';
import { soundManager } from '../../utils/soundEffects';
import { calculatePacingForecast } from '../../utils/pacingCalculator';

interface SyllabusViewProps {
  onOpenTopicDrawer: (topic: Topic, subName: string, chName: string) => void;
  onOpenAddTopic: (subjectId?: string, chapterId?: string) => void;
  onOpenAiArchitect?: () => void;
  onOpenFocus?: (topicId?: string) => void;
  initialSubjectId?: string;
  onSelectSubjectId?: (id: string) => void;
  onBackToDashboard?: () => void;
  onRegisterBackHandler?: (handler: (() => boolean) | null) => void;
}

export const SyllabusView: React.FC<SyllabusViewProps> = ({
  onOpenTopicDrawer,
  onOpenAddTopic,
  onOpenAiArchitect,
  onOpenFocus,
  initialSubjectId,
  onSelectSubjectId,
  onBackToDashboard,
  onRegisterBackHandler
}) => {
  const { currentExam, deleteTopic, updateTopicStatus, overallStats, activityHistory } = useSyllabus();

  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(initialSubjectId || null);
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<TopicStatus | 'all'>('all');
  const [activeTab, setActiveTab] = useState<'content'>('content');

  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false);
  const [editingChapter, setEditingChapter] = useState<{ subjectId: string; chapter: Chapter } | null>(null);

  // 150ms Debounce for 60 FPS typing and filtering across massive syllabus hierarchies
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(searchInput);
    }, 150);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const clearSearch = useCallback(() => {
    setSearchInput('');
    setSearchTerm('');
  }, []);

  const lastInitialSubjectRef = useRef<string | null>(initialSubjectId || null);

  useEffect(() => {
    if (initialSubjectId && initialSubjectId !== lastInitialSubjectRef.current) {
      lastInitialSubjectRef.current = initialSubjectId;
      if (currentExam?.subjects.some(s => s.id === initialSubjectId)) {
        setSelectedSubjectId(initialSubjectId);
        setSelectedChapterId(null);
      }
    }
  }, [initialSubjectId, currentExam]);

  // Master Step-by-Step Back Handler for Syllabus Hierarchy
  const handleSyllabusBack = useCallback(() => {
    clearSearch();
    if (selectedChapterId) {
      setSelectedChapterId(null);
      return true; // handled Level 3 -> Level 2
    }
    if (selectedSubjectId) {
      setSelectedSubjectId(null);
      lastInitialSubjectRef.current = null;
      if (onSelectSubjectId) onSelectSubjectId('');
      return true; // handled Level 2 -> Level 1
    }
    return false; // at Level 1, allow parent to navigate to previous view / overview
  }, [selectedChapterId, selectedSubjectId, clearSearch, onSelectSubjectId]);

  // Register with Parent App for unified popstate and Header back button
  useEffect(() => {
    if (onRegisterBackHandler) {
      onRegisterBackHandler(handleSyllabusBack);
      return () => onRegisterBackHandler(null);
    }
  }, [onRegisterBackHandler, handleSyllabusBack]);

  if (!currentExam) return null;

  // Active Subject (Level 2 & 3)
  const activeSubject = useMemo(() => {
    if (!selectedSubjectId) return null;
    return currentExam.subjects.find(s => s.id === selectedSubjectId) || null;
  }, [currentExam, selectedSubjectId]);

  // Active Chapter (Level 3)
  const activeChapter = useMemo(() => {
    if (!activeSubject || !selectedChapterId) return null;
    return activeSubject.chapters.find(c => c.id === selectedChapterId) || null;
  }, [activeSubject, selectedChapterId]);

  // Current Chapter Navigation Index
  const currentChapterIndex = useMemo(() => {
    if (!activeSubject || !selectedChapterId) return -1;
    return activeSubject.chapters.findIndex(c => c.id === selectedChapterId);
  }, [activeSubject, selectedChapterId]);

  const prevChapter = currentChapterIndex > 0 ? activeSubject?.chapters[currentChapterIndex - 1] : null;
  const nextChapter = currentChapterIndex >= 0 && currentChapterIndex < (activeSubject?.chapters.length || 0) - 1
    ? activeSubject?.chapters[currentChapterIndex + 1]
    : null;

  // Navigation Handlers
  const handleSelectSubject = (subjectId: string) => {
    soundManager.playClick();
    setSelectedSubjectId(subjectId);
    setSelectedChapterId(null);
    lastInitialSubjectRef.current = subjectId;
    clearSearch();
    if (onSelectSubjectId) onSelectSubjectId(subjectId);
    window.history.pushState({ subjectId }, '');
  };

  const handleBackToSubjects = () => {
    soundManager.playClick();
    setSelectedSubjectId(null);
    setSelectedChapterId(null);
    lastInitialSubjectRef.current = null;
    clearSearch();
    if (onSelectSubjectId) onSelectSubjectId('');
  };

  const handleSelectChapter = (chapterId: string) => {
    soundManager.playClick();
    setSelectedChapterId(chapterId);
    clearSearch();
    window.history.pushState({ chapterId }, '');
  };

  const handleBackToChapters = () => {
    soundManager.playClick();
    setSelectedChapterId(null);
    clearSearch();
  };

  // Overall Exam Stats
  const allTopicsInExam = currentExam.subjects.flatMap(s => s.chapters.flatMap(c => c.topics));
  const totalTopicsCount = allTopicsInExam.length;
  const completedTopicsCount = allTopicsInExam.filter(t => t.status === 'completed').length;
  const overallPercentage = totalTopicsCount > 0 ? Math.round((completedTopicsCount / totalTopicsCount) * 100) : 0;

  // Formatted Date (e.g. Sep 28, 2026) matching reference aesthetic
  const formattedExamDate = (() => {
    if (!currentExam.examDate) return 'Sep 28, 2026';
    try {
      const parts = currentExam.examDate.split('-');
      if (parts.length === 3) {
        const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      }
      const d = new Date(currentExam.examDate);
      return isNaN(d.getTime()) ? currentExam.examDate : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return currentExam.examDate;
    }
  })();

  // Live remaining days
  const daysRemaining = (() => {
    if (!currentExam.examDate) return 0;
    const target = new Date(currentExam.examDate).getTime();
    const now = new Date().getTime();
    const diff = target - now;
    return diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0;
  })();

  // Smart Syllabus Pacing & Finish Forecast for Level 1 header
  const pacingForecast = useMemo(() => {
    if (!currentExam) return null;
    return calculatePacingForecast({
      examDateStr: currentExam.examDate || '2026-10-15',
      totalTopics: overallStats.totalTopics,
      completedTopics: overallStats.completedCount,
      inProgressTopics: overallStats.inProgressCount,
      activityHistory
    });
  }, [currentExam, overallStats, activityHistory]);

  // Filtered Subjects for Level 1
  const filteredSubjects = useMemo(() => {
    if (!searchTerm.trim()) return currentExam.subjects;
    const term = searchTerm.toLowerCase();
    return currentExam.subjects.filter(s =>
      s.name.toLowerCase().includes(term) ||
      s.chapters.some(c => c.name.toLowerCase().includes(term) || c.topics.some(t => t.name.toLowerCase().includes(term)))
    );
  }, [currentExam, searchTerm]);

  // Filtered Chapters for Level 2
  const filteredChapters = useMemo(() => {
    if (!activeSubject) return [];
    if (!searchTerm.trim()) return activeSubject.chapters;
    const term = searchTerm.toLowerCase();
    return activeSubject.chapters.filter(c =>
      c.name.toLowerCase().includes(term) ||
      c.topics.some(t => t.name.toLowerCase().includes(term) || t.subtopics.some(st => st.toLowerCase().includes(term)))
    );
  }, [activeSubject, searchTerm]);

  // Filtered Topics for Level 3
  const filteredChapterTopics = useMemo(() => {
    if (!activeChapter) return [];
    return activeChapter.topics.filter(t => {
      const matchesSearch =
        searchTerm.trim() === '' ||
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.subtopics.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [activeChapter, searchTerm, statusFilter]);

  // Status counts for active view
  const statusCounts = useMemo(() => {
    const list = activeChapter
      ? activeChapter.topics
      : activeSubject
      ? activeSubject.chapters.flatMap(c => c.topics)
      : allTopicsInExam;

    return {
      all: list.length,
      completed: list.filter(t => t.status === 'completed').length,
      in_progress: list.filter(t => t.status === 'in_progress').length,
      weak: list.filter(t => t.status === 'weak').length,
      not_started: list.filter(t => t.status === 'not_started' || !t.status).length,
    };
  }, [activeChapter, activeSubject, allTopicsInExam]);

  // Smart Title Case Formatter for High-End Typography
  const formatTitleCase = (str: string) => {
    if (!str) return '';
    const minorWords = new Set(['and', 'or', 'of', 'in', 'to', 'for', 'with', 'the', 'a', 'an']);
    const acronyms = new Set(['gk', 'gs', 'gk/gs', 'ai', 'pdf', 'ssc', 'cgl', 'chsl', 'mts', 'cpo', 'ch', 'pyq', 'mcq']);
    const words = str.trim().split(/\s+/);
    return words
      .map((word, idx) => {
        if (word === '&') return '&';
        const lower = word.toLowerCase();
        if (acronyms.has(lower)) return lower.toUpperCase();
        if (idx > 0 && minorWords.has(lower)) return lower;
        return lower.charAt(0).toUpperCase() + lower.slice(1);
      })
      .join(' ');
  };

  // 1. Subject Badge Helper (Level 1)
  const getSubjectBadgeStyle = (subjectName: string) => {
    const lower = subjectName.toLowerCase();
    if (lower.includes('quant') || lower.includes('math') || lower.includes('arithmetic')) {
      return {
        badgeText: 'MATH',
        icon: Calculator,
        containerClass: 'bg-blue-50 dark:bg-blue-500/10 border border-blue-200/80 dark:border-blue-500/25 text-[#2563EB] dark:text-[#7AA2F7]',
        accentColor: '#2563EB',
        accentBg: 'bg-blue-500/10 dark:bg-blue-500/20 text-[#2563EB] dark:text-[#7AA2F7]'
      };
    }
    if (lower.includes('reasoning') || lower.includes('intelligence')) {
      return {
        badgeText: 'REAS',
        icon: BrainCircuit,
        containerClass: 'bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200/80 dark:border-indigo-500/25 text-[#6366F1] dark:text-[#818CF8]',
        accentColor: '#6366F1',
        accentBg: 'bg-indigo-500/10 dark:bg-indigo-500/20 text-[#6366F1] dark:text-[#818CF8]'
      };
    }
    if (lower.includes('english') || lower.includes('comprehension')) {
      return {
        badgeText: 'ENG',
        icon: BookOpen,
        containerClass: 'bg-purple-50 dark:bg-purple-500/10 border border-purple-200/80 dark:border-purple-500/25 text-[#8B5CF6] dark:text-[#A78BFA]',
        accentColor: '#8B5CF6',
        accentBg: 'bg-purple-500/10 dark:bg-purple-500/20 text-[#8B5CF6] dark:text-[#A78BFA]'
      };
    }
    if (lower.includes('gk') || lower.includes('general awareness') || lower.includes('general knowledge') || lower.includes('gs') || lower.includes('awareness')) {
      return {
        badgeText: 'GK/GS',
        icon: Globe,
        containerClass: 'bg-teal-50 dark:bg-teal-500/10 border border-teal-200/80 dark:border-teal-500/25 text-[#0D9488] dark:text-[#2DD4BF]',
        accentColor: '#0D9488',
        accentBg: 'bg-teal-500/10 dark:bg-teal-500/20 text-[#0D9488] dark:text-[#2DD4BF]'
      };
    }
    return {
      badgeText: subjectName.slice(0, 4).toUpperCase(),
      icon: Layers,
      containerClass: 'bg-blue-50 dark:bg-blue-500/10 border border-blue-200/80 dark:border-blue-500/25 text-blue-600 dark:text-blue-400',
      accentColor: '#2563EB',
      accentBg: 'bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400'
    };
  };

  // 2. Chapter Badge Helper (Level 2)
  const getChapterBadgeStyle = (subjectName: string, chapterIndex: number) => {
    const formattedNum = (chapterIndex + 1).toString().padStart(2, '0');
    const badgeText = `CH ${formattedNum}`;
    const lower = subjectName.toLowerCase();

    if (lower.includes('quant') || lower.includes('math') || lower.includes('arithmetic')) {
      return {
        badgeText,
        icon: Calculator,
        containerClass: 'bg-blue-50 dark:bg-blue-500/10 border border-blue-200/80 dark:border-blue-500/25 text-[#2563EB] dark:text-[#7AA2F7]',
        accentColor: '#2563EB'
      };
    }
    if (lower.includes('reasoning') || lower.includes('intelligence')) {
      return {
        badgeText,
        icon: BrainCircuit,
        containerClass: 'bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200/80 dark:border-indigo-500/25 text-[#6366F1] dark:text-[#818CF8]',
        accentColor: '#6366F1'
      };
    }
    if (lower.includes('english') || lower.includes('comprehension')) {
      return {
        badgeText,
        icon: BookOpen,
        containerClass: 'bg-purple-50 dark:bg-purple-500/10 border border-purple-200/80 dark:border-purple-500/25 text-[#8B5CF6] dark:text-[#A78BFA]',
        accentColor: '#8B5CF6'
      };
    }
    if (lower.includes('gk') || lower.includes('general awareness') || lower.includes('general knowledge') || lower.includes('gs') || lower.includes('awareness')) {
      return {
        badgeText,
        icon: Globe,
        containerClass: 'bg-teal-50 dark:bg-teal-500/10 border border-teal-200/80 dark:border-teal-500/25 text-[#0D9488] dark:text-[#2DD4BF]',
        accentColor: '#0D9488'
      };
    }
    return {
      badgeText,
      icon: FolderOpen,
      containerClass: 'bg-blue-50 dark:bg-blue-500/10 border border-blue-200/80 dark:border-blue-500/25 text-blue-600 dark:text-blue-400',
      accentColor: '#2563EB'
    };
  };

  // 3. Topic Card & Badge Styling Helper (Level 3)
  const getTopicCardDesign = (status: TopicStatus, topicIndex: number) => {
    const formattedNum = (topicIndex + 1).toString().padStart(2, '0');
    switch (status) {
      case 'completed':
        return {
          badgeNum: formattedNum,
          badgeLabel: 'MASTERED',
          badgeIcon: CheckCircle2,
          boxClass: 'bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200/80 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400',
          cardBorderClass: 'bg-white dark:bg-[#1A1B29] hover:bg-slate-50/70 dark:hover:bg-[#1E2032] border border-slate-200/80 dark:border-white/[0.08] hover:border-emerald-500/60 shadow-2xs hover:shadow-sm',
          accentColor: '#10B981',
          titleColor: 'text-slate-900 dark:text-white',
          statusPillClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-bold uppercase',
          btnClasses: 'bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xs uppercase',
          btnLabel: 'MASTERED ✓'
        };
      case 'in_progress':
        return {
          badgeNum: formattedNum,
          badgeLabel: 'IN PROGRESS',
          badgeIcon: Zap,
          boxClass: 'bg-amber-50 dark:bg-amber-500/15 border border-amber-200/80 dark:border-amber-500/30 text-amber-600 dark:text-amber-400',
          cardBorderClass: 'bg-white dark:bg-[#1A1B29] hover:bg-slate-50/70 dark:hover:bg-[#1E2032] border border-slate-200/80 dark:border-white/[0.08] hover:border-amber-500/60 shadow-2xs hover:shadow-sm',
          accentColor: '#F59E0B',
          titleColor: 'text-slate-900 dark:text-white',
          statusPillClass: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 font-bold uppercase',
          btnClasses: 'bg-amber-500 hover:bg-amber-600 text-white font-bold shadow-xs uppercase',
          btnLabel: 'MARK DONE ✓'
        };
      case 'weak':
        return {
          badgeNum: formattedNum,
          badgeLabel: 'WEAK FOCUS',
          badgeIcon: AlertTriangle,
          boxClass: 'bg-rose-50 dark:bg-rose-500/15 border border-rose-200/80 dark:border-rose-500/30 text-rose-600 dark:text-rose-400',
          cardBorderClass: 'bg-white dark:bg-[#1A1B29] hover:bg-slate-50/70 dark:hover:bg-[#1E2032] border border-slate-200/80 dark:border-white/[0.08] hover:border-rose-500/60 shadow-2xs hover:shadow-sm',
          accentColor: '#F43F5E',
          titleColor: 'text-slate-900 dark:text-white',
          statusPillClass: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30 font-bold uppercase',
          btnClasses: 'bg-rose-600 hover:bg-rose-700 text-white font-bold shadow-xs uppercase',
          btnLabel: 'FIX WEAK'
        };
      case 'revision_due':
        return {
          badgeNum: formattedNum,
          badgeLabel: 'REVISE DUE',
          badgeIcon: Clock,
          boxClass: 'bg-purple-50 dark:bg-purple-500/15 border border-purple-200/80 dark:border-purple-500/30 text-purple-600 dark:text-purple-400',
          cardBorderClass: 'bg-white dark:bg-[#1A1B29] hover:bg-slate-50/70 dark:hover:bg-[#1E2032] border border-slate-200/80 dark:border-white/[0.08] hover:border-purple-500/60 shadow-2xs hover:shadow-sm',
          accentColor: '#A855F7',
          titleColor: 'text-slate-900 dark:text-white',
          statusPillClass: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/30 font-bold uppercase',
          btnClasses: 'bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-xs uppercase',
          btnLabel: 'REVISE NOW'
        };
      default: // not_started
        return {
          badgeNum: formattedNum,
          badgeLabel: 'NOT STARTED',
          badgeIcon: BookOpen,
          boxClass: 'bg-slate-50 dark:bg-white/[0.06] border border-slate-200/80 dark:border-white/[0.08] text-slate-600 dark:text-slate-400',
          cardBorderClass: 'bg-white dark:bg-[#1A1B29] hover:bg-slate-50/70 dark:hover:bg-[#1E2032] border border-slate-200/80 dark:border-white/[0.08] hover:border-[#2563EB] dark:hover:border-[#7AA2F7] shadow-2xs hover:shadow-sm',
          accentColor: '#2563EB',
          titleColor: 'text-slate-900 dark:text-white',
          statusPillClass: 'bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/[0.08] font-semibold uppercase',
          btnClasses: 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-blue-600 dark:hover:bg-blue-400 font-bold shadow-xs uppercase',
          btnLabel: 'START TOPIC →'
        };
    }
  };

  // ═══════════════════════════════════════════════════════════════════
  // LEVEL 3: CHAPTER TOPICS & STUDY VIEW (Polished Mobile-First Layout)
  // ═══════════════════════════════════════════════════════════════════
  if (activeSubject && activeChapter) {
    const totalInActiveChapter = activeChapter.topics.length;
    const completedInActiveChapter = activeChapter.topics.filter(t => t.status === 'completed').length;
    const inProgressInActiveChapter = activeChapter.topics.filter(t => t.status === 'in_progress').length;
    const weakInActiveChapter = activeChapter.topics.filter(t => t.status === 'weak').length;
    const chapterPercent = totalInActiveChapter > 0 ? Math.round((completedInActiveChapter / totalInActiveChapter) * 100) : 0;
    const chapterBadge = getChapterBadgeStyle(activeSubject.name, currentChapterIndex >= 0 ? currentChapterIndex : 0);
    const ChapterBadgeIcon = chapterBadge.icon;

    return (
      <div className="space-y-3.5 sm:space-y-5 pb-8 sm:pb-12 animate-fade-in max-w-full overflow-x-hidden font-sans">
        
        {/* 🖨️ PRINT-ONLY CHAPTER REVISION CHEATSHEET HEADER */}
        <div className="hidden print:block mb-6 pb-4 border-b-2 border-black">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-gray-700 block">
                {activeSubject.name} • CHAPTER REVISION CHECKLIST
              </span>
              <h1 className="text-2xl font-black uppercase tracking-tight text-black mt-1">
                📖 {activeChapter.name}
              </h1>
              <div className="flex items-center gap-3 text-xs font-mono text-gray-700 mt-2">
                <span>Progress: <strong>{chapterPercent}% ({completedInActiveChapter}/{totalInActiveChapter} Topics Mastered)</strong></span>
                <span>• Total Topics: <strong>{totalInActiveChapter}</strong></span>
              </div>
            </div>
            <div className="text-right text-xs font-mono">
              <div className="font-bold text-black uppercase">Study Desk Revision Sheet</div>
              <div className="text-gray-600 mt-1">Printed: {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
              <div className="text-[10px] text-gray-500 mt-0.5">Syllabus 3D Precision Desk Tracker</div>
            </div>
          </div>
        </div>

        {/* 1. TOP CHAPTER HERO BANNER & ACTIONS */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden">
          <div className="flex items-center gap-3 min-w-0">
            {/* Visual Badge Thumbnail */}
            <div className={`w-12 sm:w-14 h-12 sm:h-14 rounded-2xl flex flex-col items-center justify-center text-center p-1.5 shrink-0 shadow-2xs relative overflow-hidden ${chapterBadge.containerClass}`}>
              <ChapterBadgeIcon className="w-6 sm:w-7 h-6 sm:h-7 stroke-[2.2] mb-0.5" />
              <span className="text-[9px] sm:text-[10px] font-black tracking-wider uppercase font-mono leading-none truncate max-w-full">
                {chapterBadge.badgeText}
              </span>
            </div>

            <div className="min-w-0 space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={handleBackToChapters}
                  className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{formatTitleCase(activeSubject.name)}</span>
                </button>
                <span className="text-slate-300 dark:text-slate-600">•</span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Chapter {currentChapterIndex + 1} of {activeSubject.chapters.length}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight truncate leading-tight">
                {formatTitleCase(activeChapter.name)}
              </h1>
            </div>
          </div>

          {/* Quick Actions (Previous / Next Chapter & Edit Chapter) */}
          <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
            <button
              onClick={handleBackToChapters}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.08] dark:hover:bg-white/[0.12] text-slate-800 dark:text-white text-xs font-bold transition-all cursor-pointer shadow-2xs active:scale-95"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Chapters</span>
            </button>

            {prevChapter && (
              <button
                onClick={() => handleSelectChapter(prevChapter.id)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.08] dark:hover:bg-white/[0.12] text-slate-800 dark:text-white transition-colors cursor-pointer active:scale-95"
                title={`Previous: ${prevChapter.name}`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}

            {nextChapter && (
              <button
                onClick={() => handleSelectChapter(nextChapter.id)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.08] dark:hover:bg-white/[0.12] text-slate-800 dark:text-white transition-colors cursor-pointer active:scale-95"
                title={`Next: ${nextChapter.name}`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => setEditingChapter({ subjectId: activeSubject.id, chapter: activeChapter })}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.08] dark:hover:bg-white/[0.12] transition-colors cursor-pointer active:scale-95"
              title="Edit Chapter"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2. 4 VIBRANT HIGH-CONTRAST METRIC CARDS FOR CHAPTER */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 print:hidden">
          {/* Card 1: Purple Gradient -> Total Topics */}
          <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-gradient-to-br from-[#7C3AED] via-[#6D28D9] to-[#5B21B6] text-white flex flex-col justify-between shadow-md shadow-purple-500/20">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-bold text-white/90">Topics</span>
              <div className="p-2 rounded-xl bg-white/20">
                <FileText className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="mt-3 sm:mt-4">
              <div className="text-2xl sm:text-3xl font-black font-mono leading-none tabular-nums">
                {totalInActiveChapter}
              </div>
              <div className="text-[11px] sm:text-xs text-white/80 font-medium mt-1 truncate">
                In this Chapter
              </div>
            </div>
          </div>

          {/* Card 2: Hot Coral / Pink Gradient -> Mastered Topics */}
          <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-gradient-to-br from-[#F43F5E] via-[#E11D48] to-[#BE123C] text-white flex flex-col justify-between shadow-md shadow-rose-500/20">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-bold text-white/90">Mastered Topics</span>
              <div className="p-2 rounded-xl bg-white/20">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="mt-3 sm:mt-4">
              <div className="text-2xl sm:text-3xl font-black font-mono leading-none tabular-nums">
                {completedInActiveChapter}
              </div>
              <div className="text-[11px] sm:text-xs text-white/80 font-medium mt-1 truncate">
                {totalInActiveChapter - completedInActiveChapter} Remaining
              </div>
            </div>
          </div>

          {/* Card 3: Cyan / Sky Blue Gradient -> Active Topics */}
          <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-gradient-to-br from-[#0284C7] via-[#0369A1] to-[#075985] text-white flex flex-col justify-between shadow-md shadow-sky-500/20">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-bold text-white/90">In Progress</span>
              <div className="p-2 rounded-xl bg-white/20">
                <Zap className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="mt-3 sm:mt-4">
              <div className="text-2xl sm:text-3xl font-black font-mono leading-none tabular-nums truncate">
                {inProgressInActiveChapter}
              </div>
              <div className="text-[11px] sm:text-xs text-white/80 font-medium mt-1 truncate">
                {weakInActiveChapter > 0 ? `${weakInActiveChapter} Weak Focus` : 'Active Study'}
              </div>
            </div>
          </div>

          {/* Card 4: Emerald / Mint Gradient -> Chapter Mastery Rate */}
          <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-gradient-to-br from-[#10B981] via-[#059669] to-[#047857] text-white flex flex-col justify-between shadow-md shadow-emerald-500/20">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-bold text-white/90">Chapter Mastery</span>
              <div className="p-2 rounded-xl bg-white/20">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="mt-3 sm:mt-4">
              <div className="text-2xl sm:text-3xl font-black font-mono leading-none tabular-nums">
                {chapterPercent}%
              </div>
              <div className="text-[11px] sm:text-xs text-white/80 font-medium mt-1 truncate">
                {completedInActiveChapter}/{totalInActiveChapter} Topics Done
              </div>
            </div>
          </div>
        </div>

        {/* 3. TOPICS CONTENT CONTAINER */}
        <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121424] border border-slate-200/90 dark:border-white/10 shadow-xs space-y-4 print:p-0 print:border-none print:shadow-none">
          
          {/* Header Bar: Tab, Search & Add Topic */}
          <div className="space-y-3 sm:space-y-3.5 pb-3 sm:pb-3.5 border-b border-slate-100 dark:border-white/[0.06] no-print">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 min-w-0">
                  <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-[#F5F5F7] tracking-tight truncate">
                    Topics Content
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/15 border border-indigo-200/70 dark:border-indigo-500/30 text-[11px] font-mono font-bold text-indigo-700 dark:text-indigo-300">
                    {filteredChapterTopics.length} of {totalInActiveChapter} Topics
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-[#CBD5E1] font-medium">
                  Click a topic to launch full study details, notes, revision, and questions
                </p>
              </div>

              <button
                type="button"
                onClick={() => onOpenAddTopic(activeSubject.id, activeChapter.id)}
                className="px-3.5 sm:px-4 py-2 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs sm:text-[13px] font-bold shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                title="Add new topic to this chapter"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Add Topic</span>
              </button>
            </div>

            {/* Clean Bounded Search Input */}
            <div className="relative w-full max-w-md sm:max-w-lg">
              <Search className="w-4 h-4 text-slate-400 dark:text-slate-300 absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search topics in this chapter..."
                className="w-full pl-9 pr-8 py-2 sm:py-2.5 rounded-xl bg-slate-50 dark:bg-[#161828] border border-slate-200/80 dark:border-white/[0.08] text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-[#94A3B8] focus:outline-none focus:border-[#4F46E5] dark:focus:border-indigo-400 focus:ring-2 focus:ring-[#4F46E5]/15 dark:focus:ring-indigo-400/20 shadow-2xs transition-all"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 dark:hover:text-white p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer transition-colors"
                  title="Clear search"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Status Filter Pills (Clean Pure Text with Icons, Zero Emojis) */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 -mx-1 px-1 no-print">
            {[
              { id: 'all', label: 'All', count: statusCounts.all, icon: Layers },
              { id: 'completed', label: 'Mastered', count: statusCounts.completed, icon: CheckCircle2 },
              { id: 'in_progress', label: 'In Progress', count: statusCounts.in_progress, icon: Zap },
              { id: 'weak', label: 'Weak Focus', count: statusCounts.weak, icon: AlertTriangle },
              { id: 'not_started', label: 'Not Started', count: statusCounts.not_started, icon: Circle },
            ].map(st => {
              const Icon = st.icon;
              const isSelected = statusFilter === st.id;
              return (
                <button
                  key={st.id}
                  onClick={() => {
                    setStatusFilter(st.id as any);
                    soundManager.playClick();
                  }}
                  className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer border shrink-0 active:scale-[0.97] ${
                    isSelected
                      ? 'bg-[#4F46E5] text-white border-transparent shadow-sm shadow-indigo-500/20 font-black'
                      : 'bg-slate-50 dark:bg-[#161828] text-slate-700 dark:text-[#E2E8F0] border-slate-200/70 dark:border-white/[0.06] hover:border-indigo-500/40 dark:hover:border-indigo-400/40 dark:hover:bg-[#1c1f33]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{st.label}</span>
                  <span className={`px-1.5 py-0.2 rounded-md text-[10px] font-mono tabular-nums ${
                    isSelected ? 'bg-white/20 dark:bg-black/20 text-white dark:text-black' : 'bg-slate-200/70 dark:bg-white/[0.08] text-slate-600 dark:text-slate-200'
                  }`}>
                    {st.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 3. TOPIC CARDS LIST (Executive Modern Study Cards) */}
          <div className="space-y-2.5 sm:space-y-3">
            {filteredChapterTopics.length === 0 ? (
              <div className="py-10 sm:py-14 px-4 text-center rounded-2xl bg-slate-50/70 dark:bg-[#151622] border border-dashed border-slate-200 dark:border-white/[0.08] space-y-3.5">
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-[#1E2030] border border-slate-200 dark:border-white/[0.08] flex items-center justify-center mx-auto text-[#2563EB] dark:text-[#7AA2F7] shadow-2xs">
                  {searchTerm.trim() || statusFilter !== 'all' ? (
                    <FileText className="w-7 h-7 stroke-[1.8]" />
                  ) : (
                    <Sparkles className="w-7 h-7 stroke-[1.8]" />
                  )}
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-slate-900 dark:text-[#F5F5F7]">
                    {searchTerm.trim() || statusFilter !== 'all'
                      ? 'No topics match your filter'
                      : 'Chapter Runway Ready'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-[#94A3B8] max-w-sm mx-auto font-medium">
                    {searchTerm.trim() || statusFilter !== 'all'
                      ? 'Try clearing your search query or selecting a different status pill.'
                      : 'This chapter has no study topics yet. Add syllabus topics to begin mastery tracking.'}
                  </p>
                </div>

                <div className="pt-1 flex items-center justify-center gap-2">
                  {searchTerm.trim() || statusFilter !== 'all' ? (
                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        clearSearch();
                        setStatusFilter('all');
                      }}
                      className="btn-secondary py-2 px-4 text-xs font-bold inline-flex items-center gap-1.5"
                    >
                      Clear Search & Filters
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onOpenAddTopic(activeSubject.id, activeChapter.id)}
                      className="btn-primary py-2 px-4 text-xs font-bold inline-flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                      <span>Add First Topic</span>
                    </button>
                  )}
                </div>
              </div>
            ) : (
              filteredChapterTopics.map((topic, tIdx) => {
                const design = getTopicCardDesign(topic.status, tIdx);
                const BadgeIcon = design.badgeIcon;
                const unresolvedMistakes = topic.mistakes ? topic.mistakes.filter(m => !m.resolved).length : 0;
                const hasNotes = Boolean(topic.notes && topic.notes.trim()) || Boolean(topic.noteItems && topic.noteItems.length > 0);
                const hasPdf = Boolean(topic.pdfUrl) || Boolean(topic.pdfAttachments && topic.pdfAttachments.length > 0);
                const mobileBadgeLabel =
                  topic.status === 'completed'
                    ? 'DONE'
                    : topic.status === 'in_progress'
                    ? 'ACTIVE'
                    : topic.status === 'weak'
                    ? 'WEAK'
                    : topic.status === 'revision_due'
                    ? 'DUE'
                    : 'TODO';

                return (
                  <div
                    key={topic.id}
                    onClick={() => onOpenTopicDrawer(topic, activeSubject.name, activeChapter.name)}
                    className="group relative p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-white via-white to-violet-50/25 dark:from-[#11131F] dark:via-[#11131F] dark:to-[#171A2E]/40 hover:bg-slate-50/70 dark:hover:bg-[#151726] border border-slate-200/80 dark:border-white/[0.08] hover:border-violet-500/60 dark:hover:border-violet-400/50 shadow-xs hover:shadow-[0_14px_30px_-6px_rgba(124,58,237,0.16)] dark:hover:shadow-[0_14px_32px_-6px_rgba(124,58,237,0.28)] transition-all duration-300 ease-out transform-gpu hover:scale-[1.015] hover:-translate-y-0.5 cursor-pointer active:scale-[0.99] space-y-2.5 sm:space-y-3 overflow-hidden print-avoid-break print:border print:border-black print:rounded-lg print:p-3 tap-bounce"
                  >
                    {/* Subtle Top Glow Accent */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${design.accentColor}, transparent)`
                      }}
                    />

                    {/* Top Row: Squircle Thumbnail + Topic Title + Right Action */}
                    <div className="flex items-center justify-between gap-2 sm:gap-3">
                      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                        {/* Squircle Thumbnail Badge */}
                        <div className={`w-10 sm:w-12 h-10 sm:h-12 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center text-center p-1 shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-2xs relative overflow-hidden print:hidden ${design.boxClass}`}>
                          <BadgeIcon className="w-4 sm:w-5 h-4 sm:h-5 stroke-[2.2] mb-0.5" />
                          <span className="text-[8px] sm:text-[10px] font-black tracking-wider uppercase font-mono leading-none">
                            {design.badgeNum}
                          </span>
                        </div>

                        {/* Title in Natural Case & Semantic H3 */}
                        <div className="min-w-0 flex-1">
                          <h3 className={`text-[13px] sm:text-[15px] font-bold normal-case ${design.titleColor} group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors leading-snug break-words line-clamp-2 tracking-tight`}>
                            <span className={`hidden print:inline-block desk-checkbox ${topic.status === 'completed' ? 'is-checked' : ''}`} />
                            {topic.name}
                          </h3>
                        </div>
                      </div>

                      {/* Right: Status Pill & Action Chevron (Hidden in print) */}
                      <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0 no-print">
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            const nextStatus: TopicStatus = topic.status === 'completed' ? 'in_progress' : 'completed';
                            updateTopicStatus(topic.id, nextStatus);
                            if (nextStatus === 'completed') {
                              soundManager.playCompleteChime();
                            } else {
                              soundManager.playClick();
                            }
                          }}
                          className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-mono font-bold flex items-center gap-1 sm:gap-1.5 transition-transform active:scale-[0.95] cursor-pointer select-none hover:opacity-90 shrink-0 ${design.statusPillClass}`}
                          title="Click to toggle status"
                        >
                          <BadgeIcon className="w-3 sm:w-3.5 h-3 sm:h-3.5 stroke-[2.5]" />
                          <span className="sm:hidden">{mobileBadgeLabel}</span>
                          <span className="hidden sm:inline">{design.badgeLabel}</span>
                        </div>

                        {/* Action Chevron */}
                        <div className="w-6 sm:w-8 h-6 sm:h-8 rounded-lg sm:rounded-xl bg-white dark:bg-[#151622] border border-slate-200/70 dark:border-white/[0.06] flex items-center justify-center text-slate-500 dark:text-[#CBD5E1] group-hover:bg-violet-600 group-hover:text-white dark:group-hover:bg-violet-500 dark:group-hover:text-white group-hover:border-violet-600 dark:group-hover:border-violet-500 transition-all duration-300 group-hover:translate-x-1 shadow-2xs shrink-0">
                          <ChevronRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 stroke-[2.5]" />
                        </div>
                      </div>
                    </div>

                    {/* Dedicated Meta Chips Row (Horizontal scroll on mobile, zero clumsy wrapping) */}
                    <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-mono text-slate-500 dark:text-[#CBD5E1] overflow-x-auto no-scrollbar pt-0.5">
                      <span className="flex items-center gap-1 bg-white dark:bg-[#151622] px-1.5 sm:px-2 py-0.5 rounded-md border border-slate-200/70 dark:border-white/[0.06] text-slate-800 dark:text-[#E2E8F0] shrink-0 whitespace-nowrap">
                        <Layers className="w-3 h-3 text-indigo-500 dark:text-indigo-400" />
                        <span>{topic.subtopics && topic.subtopics.length > 0 ? `${topic.subtopics.length} Subtopics` : 'Core Concept'}</span>
                      </span>

                      {(topic.studyTimeMinutes || 0) > 0 && (
                        <span className="flex items-center gap-1 bg-white dark:bg-[#151622] px-1.5 sm:px-2 py-0.5 rounded-md border border-slate-200/70 dark:border-white/[0.06] text-slate-800 dark:text-[#E2E8F0] shrink-0 whitespace-nowrap">
                          <Clock className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                          <span>{topic.studyTimeMinutes}m Study</span>
                        </span>
                      )}

                      {topic.status !== 'not_started' && topic.accuracy !== undefined && topic.accuracy > 0 && (
                        <span className="flex items-center gap-1 bg-white dark:bg-[#151622] px-1.5 sm:px-2 py-0.5 rounded-md border border-slate-200/70 dark:border-white/[0.06] text-slate-800 dark:text-[#E2E8F0] shrink-0 whitespace-nowrap">
                          <Target className="w-3 h-3 text-rose-500 dark:text-rose-400" />
                          <span>{topic.accuracy}% Accuracy</span>
                        </span>
                      )}

                      {topic.difficulty && (
                        <span className="flex items-center gap-1 bg-white dark:bg-[#151622] px-1.5 sm:px-2 py-0.5 rounded-md border border-slate-200/70 dark:border-white/[0.06] text-slate-600 dark:text-[#CBD5E1] shrink-0 whitespace-nowrap">
                          <span className={`w-1.5 h-1.5 rounded-full ${topic.difficulty === 'Hard' ? 'bg-rose-500' : topic.difficulty === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                          <span>{topic.difficulty}</span>
                        </span>
                      )}

                      {unresolvedMistakes > 0 && (
                        <span className="flex items-center gap-1 bg-rose-500/10 text-rose-600 dark:text-rose-400 px-1.5 sm:px-2 py-0.5 rounded-md sm:rounded-lg border border-rose-500/20 font-bold shrink-0 whitespace-nowrap">
                          <AlertTriangle className="w-3 h-3" />
                          <span>{unresolvedMistakes} {unresolvedMistakes === 1 ? 'Mistake' : 'Mistakes'}</span>
                        </span>
                      )}

                      {hasNotes && (
                        <span className="flex items-center gap-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 px-1.5 sm:px-2 py-0.5 rounded-md sm:rounded-lg border border-blue-500/20 font-bold shrink-0 whitespace-nowrap">
                          <FileText className="w-3 h-3" />
                          <span>Notes</span>
                        </span>
                      )}

                      {hasPdf && (
                        <span className="flex items-center gap-1 bg-purple-500/10 text-purple-600 dark:text-purple-400 px-1.5 sm:px-2 py-0.5 rounded-md sm:rounded-lg border border-purple-500/20 font-bold shrink-0 whitespace-nowrap">
                          <BookOpen className="w-3 h-3" />
                          <span>PDF</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Edit Chapter Modal */}
        {editingChapter && (
          <EditChapterModal
            isOpen={Boolean(editingChapter)}
            subjectId={editingChapter.subjectId}
            chapter={editingChapter.chapter}
            onClose={() => setEditingChapter(null)}
          />
        )}
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════
  // LEVEL 2: SUBJECT CHAPTERS DIRECTORY (Matching Reference Hierarchy)
  // ═══════════════════════════════════════════════════════════════════
  if (activeSubject && (!selectedChapterId || !activeChapter)) {
    const totalSubjectTopics = activeSubject.chapters.reduce((a, c) => a + c.topics.length, 0);
    const completedSubjectTopics = activeSubject.chapters.reduce((a, c) => a + c.topics.filter(t => t.status === 'completed').length, 0);
    const subjectPercent = totalSubjectTopics > 0 ? Math.round((completedSubjectTopics / totalSubjectTopics) * 100) : 0;
    const subjectBadge = getSubjectBadgeStyle(activeSubject.name);
    const SubjectBadgeIcon = subjectBadge.icon;

    return (
      <div className="space-y-3.5 sm:space-y-5 pb-8 sm:pb-12 animate-fade-in max-w-full overflow-x-hidden font-sans">
        
        {/* 🖨️ PRINT-ONLY SUBJECT REVISION CHEATSHEET HEADER */}
        <div className="hidden print:block mb-6 pb-4 border-b-2 border-black">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-gray-700 block">
                {currentExam.name} • SUBJECT CHAPTER DIRECTORY
              </span>
              <h1 className="text-2xl font-black uppercase tracking-tight text-black mt-1">
                📚 {activeSubject.name} REVISION PLAN
              </h1>
              <div className="flex items-center gap-3 text-xs font-mono text-gray-700 mt-2">
                <span>Progress: <strong>{subjectPercent}% ({completedSubjectTopics}/{totalSubjectTopics} Topics Mastered)</strong></span>
                <span>• Chapters: <strong>{activeSubject.chapters.length}</strong></span>
              </div>
            </div>
            <div className="text-right text-xs font-mono">
              <div className="font-bold text-black uppercase">Study Desk Revision Sheet</div>
              <div className="text-gray-600 mt-1">Printed: {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
              <div className="text-[10px] text-gray-500 mt-0.5">Syllabus 3D Precision Desk Tracker</div>
            </div>
          </div>
        </div>

        {/* 1. TOP SUBJECT HERO BANNER & ACTIONS */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden">
          <div className="flex items-center gap-3 min-w-0">
            {/* Visual Badge Thumbnail */}
            <div className={`w-12 sm:w-14 h-12 sm:h-14 rounded-2xl flex flex-col items-center justify-center text-center p-1.5 shrink-0 shadow-2xs relative overflow-hidden ${subjectBadge.containerClass}`}>
              <SubjectBadgeIcon className="w-6 sm:w-7 h-6 sm:h-7 stroke-[2.2] mb-0.5" />
              <span className="text-[9px] sm:text-[10px] font-black tracking-wider uppercase font-mono leading-none truncate max-w-full">
                {subjectBadge.badgeText}
              </span>
            </div>

            <div className="min-w-0 space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={handleBackToSubjects}
                  className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>All Subjects</span>
                </button>
                <span className="text-slate-300 dark:text-slate-600">•</span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{currentExam.name}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight truncate leading-tight">
                {formatTitleCase(activeSubject.name)}
              </h1>
            </div>
          </div>

          {/* Quick Actions (Back Button & Edit Subject) */}
          <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
            <button
              onClick={handleBackToSubjects}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.08] dark:hover:bg-white/[0.12] text-slate-800 dark:text-white text-xs font-bold transition-all cursor-pointer shadow-2xs active:scale-95"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setEditingSubject(activeSubject)}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.08] dark:hover:bg-white/[0.12] transition-colors cursor-pointer active:scale-95"
              title="Edit Subject"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2. 4 VIBRANT HIGH-CONTRAST METRIC CARDS FOR SUBJECT */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 print:hidden">
          {/* Card 1: Purple Gradient -> Total Chapters */}
          <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-gradient-to-br from-[#7C3AED] via-[#6D28D9] to-[#5B21B6] text-white flex flex-col justify-between shadow-md shadow-purple-500/20">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-bold text-white/90">Chapters</span>
              <div className="p-2 rounded-xl bg-white/20">
                <Layers className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="mt-3 sm:mt-4">
              <div className="text-2xl sm:text-3xl font-black font-mono leading-none tabular-nums">
                {activeSubject.chapters.length}
              </div>
              <div className="text-[11px] sm:text-xs text-white/80 font-medium mt-1 truncate">
                In {activeSubject.name}
              </div>
            </div>
          </div>

          {/* Card 2: Hot Coral / Pink Gradient -> Mastered Topics */}
          <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-gradient-to-br from-[#F43F5E] via-[#E11D48] to-[#BE123C] text-white flex flex-col justify-between shadow-md shadow-rose-500/20">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-bold text-white/90">Mastered Topics</span>
              <div className="p-2 rounded-xl bg-white/20">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="mt-3 sm:mt-4">
              <div className="text-2xl sm:text-3xl font-black font-mono leading-none tabular-nums">
                {completedSubjectTopics}
              </div>
              <div className="text-[11px] sm:text-xs text-white/80 font-medium mt-1 truncate">
                {totalSubjectTopics - completedSubjectTopics} Remaining
              </div>
            </div>
          </div>

          {/* Card 3: Cyan / Sky Blue Gradient -> Total Topics */}
          <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-gradient-to-br from-[#0284C7] via-[#0369A1] to-[#075985] text-white flex flex-col justify-between shadow-md shadow-sky-500/20">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-bold text-white/90">Total Topics</span>
              <div className="p-2 rounded-xl bg-white/20">
                <FileText className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="mt-3 sm:mt-4">
              <div className="text-2xl sm:text-3xl font-black font-mono leading-none tabular-nums truncate">
                {totalSubjectTopics}
              </div>
              <div className="text-[11px] sm:text-xs text-white/80 font-medium mt-1 truncate">
                Subject Syllabus Scope
              </div>
            </div>
          </div>

          {/* Card 4: Emerald / Mint Gradient -> Subject Mastery Rate */}
          <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-gradient-to-br from-[#10B981] via-[#059669] to-[#047857] text-white flex flex-col justify-between shadow-md shadow-emerald-500/20">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-bold text-white/90">Subject Mastery</span>
              <div className="p-2 rounded-xl bg-white/20">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="mt-3 sm:mt-4">
              <div className="text-2xl sm:text-3xl font-black font-mono leading-none tabular-nums">
                {subjectPercent}%
              </div>
              <div className="text-[11px] sm:text-xs text-white/80 font-medium mt-1 truncate">
                {completedSubjectTopics}/{totalSubjectTopics} Topics Done
              </div>
            </div>
          </div>
        </div>

        {/* 3. CHAPTERS CONTENT CONTAINER */}
        <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121424] border border-slate-200/90 dark:border-white/10 shadow-xs space-y-4 print:p-0 print:border-none print:shadow-none">
          
          {/* Executive Header & Search Toolbar */}
          <div className="space-y-3 sm:space-y-3.5 pb-3 sm:pb-3.5 border-b border-slate-100 dark:border-white/[0.06] no-print">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-[#F5F5F7] tracking-tight">
                    Chapters &amp; Syllabus Modules
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/15 border border-indigo-200/70 dark:border-indigo-500/30 text-[11px] font-mono font-bold text-indigo-700 dark:text-indigo-300">
                    {filteredChapters.length} of {activeSubject.chapters.length} Chapters
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-[#94A3B8] font-medium mt-0.5">
                  Select a chapter to study topics, monitor completion, and track revisions
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onOpenAddTopic(activeSubject.id)}
                  className="px-3.5 sm:px-4 py-2 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs sm:text-[13px] font-bold shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  title={`Add new topic to ${activeSubject.name}`}
                >
                  <Plus className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Add Topic</span>
                </button>
              </div>
            </div>

            {/* Clean Bounded Search Input */}
            <div className="relative w-full max-w-md sm:max-w-lg">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={`Search chapters in ${activeSubject.name}...`}
                className="w-full pl-9 sm:pl-10 pr-9 py-2 sm:py-2.5 rounded-xl bg-slate-50 dark:bg-[#161828] border border-slate-200/80 dark:border-white/[0.08] text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#4F46E5] dark:focus:border-indigo-400 focus:ring-2 focus:ring-[#4F46E5]/15 dark:focus:ring-indigo-400/20 shadow-2xs transition-all"
              />
              {searchInput && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 dark:hover:text-white p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer transition-colors"
                  title="Clear search"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* 3. CHAPTER CARDS LIST (2-Column Modern Responsive Bento Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
            {filteredChapters.length === 0 ? (
              <div className="col-span-full py-10 sm:py-14 px-4 text-center rounded-2xl bg-slate-50/70 dark:bg-[#1A1B29] border border-dashed border-slate-200/80 dark:border-white/[0.08] space-y-3.5">
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-[#202234] border border-slate-200/80 dark:border-white/[0.08] flex items-center justify-center mx-auto text-[#2563EB] dark:text-[#7AA2F7] shadow-2xs">
                  <FolderOpen className="w-7 h-7 stroke-[1.8]" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-slate-900 dark:text-[#F5F5F7]">No chapters match your search</h4>
                  <p className="text-xs text-slate-500 dark:text-[#94A3B8] max-w-sm mx-auto font-medium">Try searching with a different keyword or view all syllabus modules.</p>
                </div>
                {searchInput && (
                  <div className="pt-1">
                    <button
                      onClick={clearSearch}
                      className="px-4 py-2 rounded-xl bg-white dark:bg-[#202234] hover:bg-[#2563EB] hover:text-white dark:hover:bg-[#7AA2F7] dark:hover:text-black text-[#2563EB] dark:text-[#7AA2F7] border border-blue-200 dark:border-[#7AA2F7]/30 text-xs font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer active:scale-95 shadow-2xs tap-bounce"
                    >
                      Clear Search
                    </button>
                  </div>
                )}
              </div>
            ) : (
              filteredChapters.map((chapter, idx) => {
                const totalInChapter = chapter.topics.length;
                const completedInChapter = chapter.topics.filter(t => t.status === 'completed').length;
                const inProgressInChapter = chapter.topics.filter(t => t.status === 'in_progress').length;
                const weakInChapter = chapter.topics.filter(t => t.status === 'weak').length;
                const chapterPercent = totalInChapter > 0 ? Math.round((completedInChapter / totalInChapter) * 100) : 0;
                const isChapterMastered = chapterPercent === 100;
                const hasChapterStarted = chapterPercent > 0 || inProgressInChapter > 0;
                const chapterBadge = getChapterBadgeStyle(activeSubject.name, idx);
                const ChapterIcon = chapterBadge.icon;
                const accentColor = activeSubject.color || chapterBadge.accentColor || '#2563EB';

                return (
                  <div
                    key={chapter.id}
                    onClick={() => handleSelectChapter(chapter.id)}
                    className="group p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#151728] hover:bg-slate-50/90 dark:hover:bg-[#1a1d33] border border-slate-200/90 dark:border-white/10 hover:border-indigo-500/50 dark:hover:border-indigo-400/50 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer active:scale-[0.99] flex flex-col justify-between gap-3.5 overflow-hidden select-none tap-bounce"
                  >
                    {/* Row 1: Left (Icon Squircle + Chapter Name + Details) | Right (Percentage %) */}
                    <div className="flex items-center justify-between gap-3 min-w-0">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className={`w-10 sm:w-11 h-10 sm:h-11 rounded-2xl border flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 shadow-2xs ${chapterBadge.containerClass}`}>
                          <ChapterIcon className="w-5 sm:w-5.5 h-5 sm:h-5.5 stroke-[2]" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight truncate leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {chapter.name}
                          </h3>
                          <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate mt-0.5">
                            {totalInChapter} {totalInChapter === 1 ? 'Topic' : 'Topics'} • {completedInChapter} Mastered
                          </p>
                        </div>
                      </div>

                      <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-mono tabular-nums shrink-0">
                        {chapterPercent}%
                      </span>
                    </div>

                    {/* Row 2: Left (Progress Bar) | Right (Fraction e.g. 3/5) */}
                    <div className="flex items-center justify-between gap-3 sm:gap-4">
                      <div className="flex-1 h-2 sm:h-2.5 rounded-full bg-slate-100 dark:bg-white/[0.08] overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${chapterPercent}%`,
                            backgroundColor: accentColor
                          }}
                        />
                      </div>

                      <span className="text-xs sm:text-[13px] font-bold text-slate-600 dark:text-slate-400 font-mono tracking-tight shrink-0 tabular-nums">
                        {completedInChapter}/{totalInChapter} Done
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Modals */}
        {editingSubject && (
          <EditSubjectModal
            isOpen={Boolean(editingSubject)}
            subject={editingSubject}
            onClose={() => setEditingSubject(null)}
          />
        )}
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════
  // LEVEL 1: COURSE / BATCH PORTAL & SUBJECTS LIST (Mobile-First Polish)
  // ═══════════════════════════════════════════════════════════════════
  return (
    <div className="space-y-3.5 sm:space-y-5 pb-8 sm:pb-12 animate-fade-in max-w-full overflow-x-hidden font-sans">
      
      {/* 🖨️ PRINT-ONLY CLEAN DESK REVISION CHEATSHEET HEADER */}
      <div className="hidden print:block mb-6 pb-4 border-b-2 border-black">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-gray-700 block">
              STUDY DESK REVISION CHEATSHEET
            </span>
            <h1 className="text-2xl font-black uppercase tracking-tight text-black mt-1">
              🎯 {currentExam.name ? currentExam.name.toUpperCase() : 'SSC CGL'} SYLLABUS TRACKER
            </h1>
            <div className="flex items-center gap-3 text-xs font-mono text-gray-700 mt-2">
              <span>Exam Date: <strong>{formattedExamDate}</strong></span>
              {daysRemaining > 0 && <span>• Days Left: <strong>{daysRemaining}d</strong></span>}
              <span>• Progress: <strong>{overallPercentage}% ({completedTopicsCount}/{totalTopicsCount} Topics Mastered)</strong></span>
            </div>
          </div>
          <div className="text-right text-xs font-mono">
            <div className="font-bold text-black uppercase">Desk Wall Planner</div>
            <div className="text-gray-600 mt-1">Printed: {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
            <div className="text-[10px] text-gray-500 mt-0.5">Syllabus 3D Precision Study System</div>
          </div>
        </div>
      </div>

      {/* 1. SYLLABUS EXPLORER HEADER & ACTION BAR */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Syllabus Explorer
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/15 border border-indigo-200/70 dark:border-indigo-500/30 text-[11px] font-bold text-indigo-700 dark:text-indigo-300 font-mono">
              {currentExam.targetYear ? `${currentExam.targetYear}` : '2026'}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/[0.08] text-[11px] font-bold text-slate-700 dark:text-slate-300">
              {currentExam.name ? formatTitleCase(currentExam.name) : 'SSC CGL'}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Master every subject, chapter, and topic with structured multi-tier precision.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex items-center gap-2.5 self-stretch sm:self-auto justify-end flex-wrap">
          {onOpenAiArchitect && (
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onOpenAiArchitect();
              }}
              className="flex-1 sm:flex-initial px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-xs sm:text-[13px] font-bold shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              title="Extract complete syllabus from PDF or text using AI"
            >
              <Sparkles className="w-4 h-4 stroke-[2.2]" />
              <span>AI Architect</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setIsAddSubjectOpen(true);
            }}
            className="flex-1 sm:flex-initial px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs sm:text-[13px] font-bold shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add Subject</span>
          </button>
        </div>
      </div>

      {/* 2. GOLDEN AMBER PACING & TARGET BANNER (Matching Mockup) */}
      <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-gradient-to-r from-[#FFC72C] via-[#FFB703] to-[#FB8500] text-slate-950 flex items-center justify-between shadow-md shadow-amber-500/15 print:hidden">
        <div className="flex items-center gap-3.5 min-w-0">
          <span className="text-3xl sm:text-4xl select-none leading-none shrink-0">🎯</span>
          <div className="min-w-0">
            <div className="text-base sm:text-lg font-black leading-tight truncate">
              {pacingForecast ? `Pacing Target: ${pacingForecast.requiredDailyPace} Topics / Day` : 'Syllabus Preparation Rhythm on Track'}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-900/85 mt-0.5 truncate">
              {pacingForecast?.finishLineForecastDate ? `Estimated Completion: ${pacingForecast.finishLineForecastDate}` : `Target Exam Date: ${formattedExamDate} (${daysRemaining} Days Runway)`}
            </div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/10 text-xs font-bold text-slate-900 shrink-0">
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>{daysRemaining > 0 ? `${daysRemaining} Days Left` : 'Exam Today'}</span>
        </div>
      </div>

      {/* 3. 4 VIBRANT HIGH-CONTRAST METRIC CARDS (Matching Mockup) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 print:hidden">
        {/* Card 1: Purple Gradient -> Total Topics */}
        <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-gradient-to-br from-[#7C3AED] via-[#6D28D9] to-[#5B21B6] text-white flex flex-col justify-between shadow-md shadow-purple-500/20">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-bold text-white/90">Total Topics</span>
            <div className="p-2 rounded-xl bg-white/20">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="mt-3 sm:mt-4">
            <div className="text-2xl sm:text-3xl font-black font-mono leading-none tabular-nums">
              {totalTopicsCount}
            </div>
            <div className="text-[11px] sm:text-xs text-white/80 font-medium mt-1 truncate">
              Across {currentExam.subjects.length} Subjects
            </div>
          </div>
        </div>

        {/* Card 2: Hot Coral / Pink Gradient -> Mastered Topics */}
        <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-gradient-to-br from-[#F43F5E] via-[#E11D48] to-[#BE123C] text-white flex flex-col justify-between shadow-md shadow-rose-500/20">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-bold text-white/90">Mastered Topics</span>
            <div className="p-2 rounded-xl bg-white/20">
              <CheckCircle2 className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="mt-3 sm:mt-4">
            <div className="text-2xl sm:text-3xl font-black font-mono leading-none tabular-nums">
              {completedTopicsCount}
            </div>
            <div className="text-[11px] sm:text-xs text-white/80 font-medium mt-1 truncate">
              {totalTopicsCount - completedTopicsCount} Remaining
            </div>
          </div>
        </div>

        {/* Card 3: Cyan / Sky Blue Gradient -> Exam Runway */}
        <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-gradient-to-br from-[#0284C7] via-[#0369A1] to-[#075985] text-white flex flex-col justify-between shadow-md shadow-sky-500/20">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-bold text-white/90">Exam Runway</span>
            <div className="p-2 rounded-xl bg-white/20">
              <Clock className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="mt-3 sm:mt-4">
            <div className="text-2xl sm:text-3xl font-black font-mono leading-none tabular-nums truncate">
              {daysRemaining > 0 ? `${daysRemaining} Days` : 'Exam Today'}
            </div>
            <div className="text-[11px] sm:text-xs text-white/80 font-medium mt-1 truncate">
              Target: {formattedExamDate}
            </div>
          </div>
        </div>

        {/* Card 4: Emerald / Mint Gradient -> Completion Rate */}
        <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-gradient-to-br from-[#10B981] via-[#059669] to-[#047857] text-white flex flex-col justify-between shadow-md shadow-emerald-500/20">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-bold text-white/90">Completion Rate</span>
            <div className="p-2 rounded-xl bg-white/20">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="mt-3 sm:mt-4">
            <div className="text-2xl sm:text-3xl font-black font-mono leading-none tabular-nums">
              {overallPercentage}%
            </div>
            <div className="text-[11px] sm:text-xs text-white/80 font-medium mt-1 truncate">
              {currentExam.subjects.reduce((sum, s) => sum + s.chapters.length, 0)} Chapters Total
            </div>
          </div>
        </div>
      </div>

      {/* 4. PORTAL CONTENT CONTAINER */}
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121424] border border-slate-200/90 dark:border-white/10 shadow-xs space-y-4 print:p-0 print:border-none print:shadow-none">
        
        {/* Executive Header & Search Toolbar */}
        <div className="space-y-3 sm:space-y-3.5 pb-3 sm:pb-3.5 border-b border-slate-100 dark:border-white/[0.06] no-print">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-[#F5F5F7] tracking-tight">
                  Exam Subjects &amp; Syllabus Modules
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/15 border border-indigo-200/70 dark:border-indigo-500/30 text-[11px] font-mono font-bold text-indigo-700 dark:text-indigo-300">
                  {filteredSubjects.length} of {currentExam.subjects.length} Subjects
                </span>
              </div>
            </div>
          </div>

          {/* Bounded Search Input for Visual Balance */}
          <div className="relative w-full max-w-md sm:max-w-lg">
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-300 absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search subjects, chapters, topics..."
              className="w-full pl-9 sm:pl-10 pr-9 py-2 sm:py-2.5 rounded-xl bg-slate-50 dark:bg-[#161828] border border-slate-200/80 dark:border-white/[0.08] text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-[#94A3B8] focus:outline-none focus:border-[#4F46E5] dark:focus:border-indigo-400 focus:ring-2 focus:ring-[#4F46E5]/15 dark:focus:ring-indigo-400/20 shadow-2xs transition-all"
            />
            {searchInput && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 dark:hover:text-white p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer transition-colors"
                title="Clear search"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* 3. DYNAMIC SUBJECT CARDS LIST (2-Column Modern Responsive Bento Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
          {currentExam.subjects.length === 0 ? (
            <div className="col-span-full py-12 sm:py-16 px-4 text-center rounded-2xl bg-slate-50/80 dark:bg-[#1A1B29] border-2 border-dashed border-slate-200/80 dark:border-white/[0.08] shadow-xs space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-500/15 to-indigo-500/15 border border-blue-500/30 flex items-center justify-center mx-auto text-[#2563EB] dark:text-[#7AA2F7] shadow-sm">
                <Sparkles className="w-8 h-8 stroke-[2]" />
              </div>
              <div className="space-y-1.5 max-w-md mx-auto">
                <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-[#F5F5F7] tracking-tight">
                  Blank Canvas • No Subjects Yet
                </h4>
                <p className="text-xs sm:text-[13px] text-slate-500 dark:text-[#94A3B8] font-medium leading-relaxed">
                  Start building your custom exam curriculum. Add your first subject like Mathematics, General Studies, or English.
                </p>
              </div>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5 max-w-md mx-auto flex-wrap">
                {onOpenAiArchitect && (
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      onOpenAiArchitect();
                    }}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs sm:text-[13px] font-black shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <Sparkles className="w-4 h-4 stroke-[2.5]" />
                    <span>Upload Syllabus (PDF / AI)</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setIsAddSubjectOpen(true);
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-600 dark:bg-[#7AA2F7] dark:hover:bg-[#6894f6] text-white dark:text-[#0B0C15] text-xs sm:text-[13px] font-black shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Add Subject</span>
                </button>
                {onOpenAddTopic && (
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      onOpenAddTopic();
                    }}
                    className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl bg-slate-200/80 dark:bg-[#25283D] text-slate-800 dark:text-[#E2E8F0] border border-slate-300/80 dark:border-white/[0.08] hover:border-[#2563EB] text-xs sm:text-[13px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <span>Bulk Paste</span>
                  </button>
                )}
              </div>
            </div>
          ) : filteredSubjects.length === 0 ? (
            <div className="col-span-full py-10 sm:py-14 px-4 text-center rounded-2xl bg-slate-50/70 dark:bg-[#1A1B29] border border-dashed border-slate-200/80 dark:border-white/[0.08] space-y-3.5">
              <div className="w-14 h-14 rounded-2xl bg-white dark:bg-[#202234] border border-slate-200/80 dark:border-white/[0.08] flex items-center justify-center mx-auto text-[#2563EB] dark:text-[#7AA2F7] shadow-2xs">
                <BookOpen className="w-7 h-7 stroke-[1.8]" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900 dark:text-[#F5F5F7]">No subjects match your search</h4>
                <p className="text-xs text-slate-500 dark:text-[#94A3B8] max-w-sm mx-auto font-medium">Try searching with a different keyword or clear your filter.</p>
              </div>
              {searchInput && (
                <div className="pt-1">
                  <button
                    onClick={clearSearch}
                    className="px-4 py-2 rounded-xl bg-white dark:bg-[#202234] hover:bg-[#2563EB] hover:text-white dark:hover:bg-[#7AA2F7] dark:hover:text-black text-[#2563EB] dark:text-[#7AA2F7] border border-blue-200 dark:border-[#7AA2F7]/30 text-xs font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer active:scale-95 shadow-2xs tap-bounce"
                  >
                    Clear Search
                  </button>
                </div>
              )}
            </div>
          ) : (
            filteredSubjects.map(subject => {
              const badgeStyle = getSubjectBadgeStyle(subject.name);
              const BadgeIcon = badgeStyle.icon;
              const subjectTotalTopics = subject.chapters.reduce((a, c) => a + c.topics.length, 0);
              const subjectCompletedTopics = subject.chapters.reduce((a, c) => a + c.topics.filter(t => t.status === 'completed').length, 0);
              const totalChapters = subject.chapters.length;
              const completedChapters = subject.chapters.filter(ch => ch.topics.length > 0 && ch.topics.every(t => t.status === 'completed')).length;

              const percent = subjectTotalTopics > 0
                ? Math.round((subjectCompletedTopics / subjectTotalTopics) * 100)
                : (totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 0);

              const accentColor = subject.color || badgeStyle.accentColor;

              return (
                <div
                  key={subject.id}
                  onClick={() => handleSelectSubject(subject.id)}
                  className="group p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#151728] hover:bg-slate-50/90 dark:hover:bg-[#1a1d33] border border-slate-200/90 dark:border-white/10 hover:border-indigo-500/50 dark:hover:border-indigo-400/50 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer active:scale-[0.99] flex flex-col justify-between gap-3.5 overflow-hidden select-none tap-bounce"
                >
                  {/* Row 1: Left (Icon Squircle + Subject Name + Details) | Right (Percentage %) */}
                  <div className="flex items-center justify-between gap-3 min-w-0">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className={`w-10 sm:w-11 h-10 sm:h-11 rounded-2xl border flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 shadow-2xs ${badgeStyle.containerClass}`}>
                        <BadgeIcon className="w-5 sm:w-5.5 h-5 sm:h-5.5 stroke-[2]" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight truncate leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {subject.name}
                        </h3>
                        <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate mt-0.5">
                          {totalChapters} {totalChapters === 1 ? 'Chapter' : 'Chapters'} • {subjectTotalTopics} Topics
                        </p>
                      </div>
                    </div>

                    <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-mono tabular-nums shrink-0">
                      {percent}%
                    </span>
                  </div>

                  {/* Row 2: Left (Progress Bar) | Right (Fraction e.g. 6/7) */}
                  <div className="flex items-center justify-between gap-3 sm:gap-4">
                    <div className="flex-1 h-2 sm:h-2.5 rounded-full bg-slate-100 dark:bg-white/[0.08] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${percent}%`,
                          backgroundColor: accentColor
                        }}
                      />
                    </div>

                    <span className="text-xs sm:text-[13px] font-bold text-slate-600 dark:text-slate-400 font-mono tracking-tight shrink-0 tabular-nums">
                      {completedChapters}/{totalChapters} Done
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Edit / Add Subject Modal */}
      {(editingSubject || isAddSubjectOpen) && (
        <EditSubjectModal
          isOpen={Boolean(editingSubject || isAddSubjectOpen)}
          subject={editingSubject}
          onClose={() => {
            setEditingSubject(null);
            setIsAddSubjectOpen(false);
          }}
        />
      )}
    </div>
  );
};

