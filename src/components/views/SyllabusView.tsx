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
  TrendingUp,
  Star
} from 'lucide-react';
import { EditSubjectModal } from '../modals/EditSubjectModal';
import { EditChapterModal } from '../modals/EditChapterModal';
import { soundManager } from '../../utils/soundEffects';
import { calculatePacingForecast } from '../../utils/pacingCalculator';
import { SectionBadgeIcon } from '../common/SectionBadgeIcon';

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
  const [editingChapter, setEditingChapter] = useState<{ subjectId: string; chapter: Chapter | null } | null>(null);
  const [isAddChapterOpen, setIsAddChapterOpen] = useState(false);

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
      if (currentExam?.subjects?.some(s => s.id === initialSubjectId)) {
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
  const allTopicsInExam = (currentExam.subjects || []).flatMap(s => (s.chapters || []).flatMap(c => c.topics || []));
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
    if (!searchTerm.trim()) return currentExam.subjects || [];
    const term = searchTerm.toLowerCase();
    return (currentExam.subjects || []).filter(s =>
      s.name.toLowerCase().includes(term) ||
      (s.chapters || []).some(c => c.name.toLowerCase().includes(term) || (c.topics || []).some(t => t.name.toLowerCase().includes(term)))
    );
  }, [currentExam, searchTerm]);

  // Filtered Chapters for Level 2
  const filteredChapters = useMemo(() => {
    if (!activeSubject) return [];
    if (!searchTerm.trim()) return activeSubject.chapters || [];
    const term = searchTerm.toLowerCase();
    return (activeSubject.chapters || []).filter(c =>
      c.name.toLowerCase().includes(term) ||
      (c.topics || []).some(t => t.name.toLowerCase().includes(term) || (t.subtopics || []).some(st => st.toLowerCase().includes(term)))
    );
  }, [activeSubject, searchTerm]);

  // Filtered Topics for Level 3
  const filteredChapterTopics = useMemo(() => {
    if (!activeChapter) return [];
    return (activeChapter.topics || []).filter(t => {
      const matchesSearch =
        searchTerm.trim() === '' ||
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (t.subtopics || []).some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

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

  // 3. Topic Card & Badge Styling Helper (Level 3 - Matching Mockup with Angled Colored Block & Bottom Accent)
  const TOPIC_PALETTES = [
    {
      accentColor: '#1D70B8', // Mockup Card 1 Blue
      gradient: 'from-[#1D70B8] via-[#1E6BB3] to-[#155E9E]',
      shadowColor: 'rgba(29, 112, 184, 0.25)',
    },
    {
      accentColor: '#4E3188', // Mockup Card 2 Purple / Violet
      gradient: 'from-[#5632EA] via-[#4A26DE] to-[#3917C4]',
      shadowColor: 'rgba(78, 49, 136, 0.25)',
    },
    {
      accentColor: '#EA580C', // Mockup Card 3 Orange
      gradient: 'from-[#EA580C] via-[#F97316] to-[#C2410C]',
      shadowColor: 'rgba(234, 88, 12, 0.25)',
    },
    {
      accentColor: '#059669', // Emerald
      gradient: 'from-[#059669] via-[#10B981] to-[#047857]',
      shadowColor: 'rgba(5, 150, 105, 0.25)',
    },
    {
      accentColor: '#E11D48', // Hot Rose / Coral
      gradient: 'from-[#E11D48] via-[#F43F5E] to-[#9F1239]',
      shadowColor: 'rgba(225, 29, 72, 0.25)',
    },
    {
      accentColor: '#0284C7', // Sky Blue
      gradient: 'from-[#0284C7] via-[#0EA5E9] to-[#0369A1]',
      shadowColor: 'rgba(2, 132, 199, 0.25)',
    }
  ];

  const getTopicCardDesign = (status: TopicStatus, topicIndex: number) => {
    const formattedNum = (topicIndex + 1).toString().padStart(2, '0');
    const palette = TOPIC_PALETTES[topicIndex % TOPIC_PALETTES.length];

    switch (status) {
      case 'completed':
        return {
          formattedNum,
          palette,
          badgeLabel: 'MASTERED ✓',
          mobileLabel: 'DONE',
          badgeIcon: CheckCircle2,
          iconRingClass: 'border-emerald-500/60 text-emerald-600 dark:text-emerald-400 bg-emerald-50/80 dark:bg-emerald-500/10',
          statusPillClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
        };
      case 'in_progress':
        return {
          formattedNum,
          palette,
          badgeLabel: 'IN PROGRESS',
          mobileLabel: 'ACTIVE',
          badgeIcon: Zap,
          iconRingClass: 'border-amber-500/60 text-amber-600 dark:text-amber-400 bg-amber-50/80 dark:bg-amber-500/10',
          statusPillClass: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
        };
      case 'weak':
        return {
          formattedNum,
          palette,
          badgeLabel: 'WEAK FOCUS',
          mobileLabel: 'WEAK',
          badgeIcon: AlertTriangle,
          iconRingClass: 'border-rose-500/60 text-rose-600 dark:text-rose-400 bg-rose-50/80 dark:bg-rose-500/10',
          statusPillClass: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30',
        };
      case 'revision_due':
        return {
          formattedNum,
          palette,
          badgeLabel: 'REVISE DUE',
          mobileLabel: 'REVISE',
          badgeIcon: Clock,
          iconRingClass: 'border-purple-500/60 text-purple-600 dark:text-purple-400 bg-purple-50/80 dark:bg-purple-500/10',
          statusPillClass: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30',
        };
      default: // not_started
        return {
          formattedNum,
          palette,
          badgeLabel: 'START TOPIC',
          mobileLabel: 'START',
          badgeIcon: Star,
          iconRingClass: 'border-slate-300 dark:border-white/20 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-white/[0.04]',
          statusPillClass: 'bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-white/10',
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
        <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/90 dark:bg-[#121424]/90 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 shadow-xs sm:shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden">
          <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
            {/* Visual Badge Thumbnail */}
            <div className={`w-13 sm:w-15 h-13 sm:h-15 rounded-2xl flex flex-col items-center justify-center text-center p-2 shrink-0 shadow-xs sm:shadow-sm relative overflow-hidden border ${chapterBadge.containerClass}`}>
              <ChapterBadgeIcon className="w-6 sm:w-7 h-6 sm:h-7 stroke-[2.2] mb-0.5" />
              <span className="text-[10px] sm:text-[11px] font-black tracking-wider uppercase font-mono leading-none truncate max-w-full">
                {chapterBadge.badgeText}
              </span>
            </div>

            <div className="min-w-0 space-y-1 sm:space-y-1.5">
              {/* Breadcrumb Navigation Bar */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={handleBackToChapters}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-500/15 dark:hover:bg-indigo-500/25 text-indigo-700 dark:text-indigo-300 text-xs font-bold transition-all cursor-pointer shadow-2xs group"
                >
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                  <span>{formatTitleCase(activeSubject.name)}</span>
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/[0.06] border border-slate-200/60 dark:border-white/10 text-slate-600 dark:text-slate-300 text-xs font-mono font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Chapter {currentChapterIndex + 1} of {activeSubject.chapters.length}</span>
                </span>
              </div>

              {/* Title & Micro Summary */}
              <div>
                <h1 className="text-xl sm:text-2xl font-black font-grotesk text-slate-900 dark:text-white tracking-tight truncate leading-tight">
                  {formatTitleCase(activeChapter.name)}
                </h1>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  <span className="font-mono">{totalInActiveChapter} Topics · {completedInActiveChapter} Mastered</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Control Bar */}
          <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end flex-wrap shrink-0">
            {/* Segmented Chapter Switcher: [ <  1/2  > ] */}
            <div className="flex items-center rounded-xl bg-slate-100 dark:bg-white/[0.06] border border-slate-200/80 dark:border-white/10 p-0.5 shadow-2xs">
              <button
                type="button"
                onClick={() => prevChapter && handleSelectChapter(prevChapter.id)}
                disabled={!prevChapter}
                className="p-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                title={prevChapter ? `Previous Chapter: ${prevChapter.name}` : 'First Chapter'}
                aria-label="Previous Chapter"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-2.5 text-xs font-mono font-bold text-slate-600 dark:text-slate-300 select-none">
                {currentChapterIndex + 1} / {activeSubject.chapters.length}
              </span>
              <button
                type="button"
                onClick={() => nextChapter && handleSelectChapter(nextChapter.id)}
                disabled={!nextChapter}
                className="p-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                title={nextChapter ? `Next Chapter: ${nextChapter.name}` : 'Last Chapter'}
                aria-label="Next Chapter"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Edit Chapter Button */}
            <button
              type="button"
              onClick={() => setEditingChapter({ subjectId: activeSubject.id, chapter: activeChapter })}
              className="p-2 sm:px-3 sm:py-2 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.08] dark:hover:bg-white/[0.12] border border-slate-200/60 dark:border-white/10 transition-colors cursor-pointer active:scale-95 shadow-2xs flex items-center gap-1.5 text-xs font-bold"
              title="Edit Chapter"
              aria-label="Edit Chapter"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Edit</span>
            </button>
          </div>
        </div>

        {/* 2. 4 MODERN EXECUTIVE METRIC BENTO CARDS FOR CHAPTER */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 print:hidden">
          {/* Card 1: Total Topics */}
          <div className="group relative rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-white/95 dark:bg-[#121424]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 hover:border-indigo-500/40 dark:hover:border-indigo-400/40 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between overflow-hidden select-none">
            {/* Top Row: Icon Squircle + Context Pill Badge */}
            <div className="flex items-center justify-between gap-2">
              <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl sm:rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/25 text-indigo-600 dark:text-indigo-400 flex items-center justify-center transition-transform group-hover:scale-105 shadow-2xs shrink-0">
                <FileText className="w-4.5 sm:w-5 h-4.5 sm:h-5 stroke-[2.2]" />
              </div>

              <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-[11px] font-bold tracking-wide border shrink-0 bg-slate-50 dark:bg-white/[0.04] text-slate-600 dark:text-slate-300 border-slate-200/70 dark:border-white/10 font-sans">
                {completedInActiveChapter}/{totalInActiveChapter} Done
              </span>
            </div>

            {/* Middle Section: Hero Metric Value & Label */}
            <div className="my-3 sm:my-3.5 space-y-0.5">
              <div className="text-2xl sm:text-3xl font-black font-sans tracking-tight text-slate-900 dark:text-white tabular-nums leading-none">
                {totalInActiveChapter}
              </div>
              <div className="text-xs sm:text-[13px] font-bold text-slate-500 dark:text-slate-400 pt-1 font-sans">
                Chapter Topics
              </div>
            </div>

            {/* Bottom Section: Smooth Progress Track & Context Subtext */}
            <div className="space-y-2 mt-auto">
              <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden">
                {chapterPercent > 0 ? (
                  <div
                    className="bg-[#6366F1] rounded-full h-full transition-all duration-500"
                    style={{ width: `${chapterPercent}%` }}
                  />
                ) : null}
              </div>

              <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium font-sans">
                <span className="truncate">
                  {completedInActiveChapter} of {totalInActiveChapter} mastered
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Mastered Topics */}
          <div className="group relative rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-white/95 dark:bg-[#121424]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 hover:border-rose-500/40 dark:hover:border-rose-400/40 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between overflow-hidden select-none">
            {/* Top Row: Icon Squircle + Context Pill Badge */}
            <div className="flex items-center justify-between gap-2">
              <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl sm:rounded-2xl bg-rose-500/10 dark:bg-rose-500/15 border border-rose-500/25 text-rose-600 dark:text-rose-400 flex items-center justify-center transition-transform group-hover:scale-105 shadow-2xs shrink-0">
                <CheckCircle2 className="w-4.5 sm:w-5 h-4.5 sm:h-5 stroke-[2.2]" />
              </div>

              <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-[11px] font-bold tracking-wide border shrink-0 bg-slate-50 dark:bg-white/[0.04] text-slate-600 dark:text-slate-300 border-slate-200/70 dark:border-white/10 font-sans">
                {totalInActiveChapter > 0 ? Math.round((completedInActiveChapter / totalInActiveChapter) * 100) : 0}% Done
              </span>
            </div>

            {/* Middle Section: Hero Metric Value & Label */}
            <div className="my-3 sm:my-3.5 space-y-0.5">
              <div className="flex items-baseline gap-1.5 text-slate-900 dark:text-white leading-none">
                <span className="text-2xl sm:text-3xl font-black font-sans tracking-tight tabular-nums">
                  {completedInActiveChapter}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-400 dark:text-slate-500 font-sans">
                  / {totalInActiveChapter}
                </span>
              </div>
              <div className="text-xs sm:text-[13px] font-bold text-slate-500 dark:text-slate-400 pt-1 font-sans">
                Mastered Topics
              </div>
            </div>

            {/* Bottom Section: Smooth Progress Track & Context Subtext */}
            <div className="space-y-2 mt-auto">
              <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden">
                {totalInActiveChapter > 0 && completedInActiveChapter > 0 ? (
                  <div
                    className="bg-[#F43F5E] rounded-full h-full transition-all duration-500"
                    style={{ width: `${(completedInActiveChapter / totalInActiveChapter) * 100}%` }}
                  />
                ) : null}
              </div>

              <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium font-sans">
                <span className="truncate">
                  {totalInActiveChapter - completedInActiveChapter === 0 && totalInActiveChapter > 0
                    ? 'All Completed! 🎉'
                    : `${Math.max(0, totalInActiveChapter - completedInActiveChapter)} topics remaining`}
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: In Progress / Active */}
          <div className="group relative rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-white/95 dark:bg-[#121424]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 hover:border-sky-500/40 dark:hover:border-sky-400/40 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between overflow-hidden select-none">
            {/* Top Row: Icon Squircle + Context Pill Badge */}
            <div className="flex items-center justify-between gap-2">
              <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl sm:rounded-2xl bg-sky-500/10 dark:bg-sky-500/15 border border-sky-500/25 text-sky-600 dark:text-sky-400 flex items-center justify-center transition-transform group-hover:scale-105 shadow-2xs shrink-0">
                <Zap className="w-4.5 sm:w-5 h-4.5 sm:h-5 stroke-[2.2]" />
              </div>

              <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-[11px] font-bold tracking-wide border shrink-0 bg-slate-50 dark:bg-white/[0.04] text-slate-600 dark:text-slate-300 border-slate-200/70 dark:border-white/10 font-sans">
                {inProgressInActiveChapter > 0 ? 'Active' : 'Idle'}
              </span>
            </div>

            {/* Middle Section: Hero Metric Value & Label */}
            <div className="my-3 sm:my-3.5 space-y-0.5">
              <div className="text-2xl sm:text-3xl font-black font-sans tracking-tight text-slate-900 dark:text-white tabular-nums leading-none">
                {inProgressInActiveChapter}
              </div>
              <div className="text-xs sm:text-[13px] font-bold text-slate-500 dark:text-slate-400 pt-1 font-sans">
                In Progress
              </div>
            </div>

            {/* Bottom Section: Smooth Progress Track & Context Subtext */}
            <div className="space-y-2 mt-auto">
              <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden">
                {totalInActiveChapter > 0 && inProgressInActiveChapter > 0 ? (
                  <div
                    className="bg-[#0284C7] rounded-full h-full transition-all duration-500"
                    style={{ width: `${(inProgressInActiveChapter / totalInActiveChapter) * 100}%` }}
                  />
                ) : null}
              </div>

              <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium font-sans">
                <span className="truncate">
                  {inProgressInActiveChapter > 0 ? 'Currently studying' : 'Ready to start'}
                </span>
              </div>
            </div>
          </div>

          {/* Card 4: Chapter Mastery */}
          <div className="group relative rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-white/95 dark:bg-[#121424]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 hover:border-emerald-500/40 dark:hover:border-emerald-400/40 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between overflow-hidden select-none">
            {/* Top Row: Icon Squircle + Context Pill Badge */}
            <div className="flex items-center justify-between gap-2">
              <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl sm:rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 flex items-center justify-center transition-transform group-hover:scale-105 shadow-2xs shrink-0">
                <TrendingUp className="w-4.5 sm:w-5 h-4.5 sm:h-5 stroke-[2.2]" />
              </div>

              <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-[11px] font-bold tracking-wide border shrink-0 bg-slate-50 dark:bg-white/[0.04] text-slate-600 dark:text-slate-300 border-slate-200/70 dark:border-white/10 font-sans">
                {Math.max(0, totalInActiveChapter - completedInActiveChapter)} Left
              </span>
            </div>

            {/* Middle Section: Hero Metric Value & Label */}
            <div className="my-3 sm:my-3.5 space-y-0.5">
              <div className="text-2xl sm:text-3xl font-black font-sans tracking-tight text-slate-900 dark:text-white tabular-nums leading-none">
                {chapterPercent}%
              </div>
              <div className="text-xs sm:text-[13px] font-bold text-slate-500 dark:text-slate-400 pt-1 font-sans">
                Chapter Mastery
              </div>
            </div>

            {/* Bottom Section: Smooth Progress Track & Context Subtext */}
            <div className="space-y-2 mt-auto">
              <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden">
                {chapterPercent > 0 ? (
                  <div
                    className="bg-[#10B981] rounded-full h-full transition-all duration-500"
                    style={{ width: `${chapterPercent}%` }}
                  />
                ) : null}
              </div>

              <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium font-sans">
                <span className="truncate">Overall chapter progress</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. TOPICS CONTENT CONTAINER */}
        <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121424] border border-slate-200/90 dark:border-white/10 shadow-xs space-y-4 print:p-0 print:border-none print:shadow-none">
          
          {/* Header Bar: Tab, Search & Add Topic */}
          <div className="space-y-3 sm:space-y-3.5 pb-3 sm:pb-3.5 border-b border-slate-100 dark:border-white/[0.06] no-print">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div>
                <div className="flex items-center gap-2 min-w-0">
                  <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-[#F5F5F7] tracking-tight truncate">
                    Topics
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/15 border border-indigo-200/70 dark:border-indigo-500/30 text-[11px] font-mono font-bold text-indigo-700 dark:text-indigo-300">
                    {filteredChapterTopics.length} of {totalInActiveChapter} Topics
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onOpenAddTopic(activeSubject.id, activeChapter.id)}
                className="px-3.5 sm:px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-[13px] font-bold shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
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
                placeholder="Search topics..."
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

                return (
                  <div
                    key={topic.id}
                    onClick={() => onOpenTopicDrawer(topic, activeSubject.name, activeChapter.name)}
                    className="group relative rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121424] border border-slate-200/90 dark:border-white/10 p-4 sm:p-5 shadow-xs hover:shadow-md hover:-translate-y-0.5 hover:border-indigo-500/40 dark:hover:border-indigo-400/30 transition-all duration-200 cursor-pointer select-none overflow-hidden"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      {/* Left & Middle: Emblem + Title & Meta */}
                      <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 min-w-0 flex-1">
                        {/* Integrated Luxury Topic Emblem with Quick Status Toggle */}
                        <div className="relative shrink-0">
                          <button
                            type="button"
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
                            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${design.palette.gradient} text-white flex items-center justify-center shadow-md shadow-black/10 group-hover:scale-105 transition-transform duration-200 cursor-pointer active:scale-95`}
                            title={topic.status === 'completed' ? 'Mark in progress' : 'Mark completed'}
                          >
                            <BadgeIcon className="w-6 h-6 stroke-[2.2] drop-shadow-xs" />
                          </button>
                          {/* Index Badge Tag */}
                          <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-md bg-white dark:bg-[#1A1C2E] border border-slate-200/80 dark:border-white/15 text-[10px] font-black font-mono shadow-2xs text-slate-700 dark:text-slate-200">
                            {design.formattedNum}
                          </span>
                        </div>

                        {/* Title & Stats */}
                        <div className="min-w-0 flex-1 space-y-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-sm sm:text-base font-black tracking-tight text-slate-900 dark:text-white leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate font-grotesk">
                              {topic.name}
                            </h3>
                          </div>

                          {/* In-Card Topic Mastery Track */}
                          <div className="w-full max-w-md h-1.5 sm:h-2 rounded-full bg-slate-100 dark:bg-slate-800/80 overflow-hidden shadow-inner">
                            <div
                              className="h-full rounded-full transition-all duration-500 shadow-xs"
                              style={{
                                width: topic.status === 'completed' ? '100%' : topic.status === 'in_progress' ? '50%' : topic.status === 'weak' ? '25%' : '0%',
                                backgroundColor: design.palette.accentColor
                              }}
                            />
                          </div>

                          {/* Meta Pills Row */}
                          <div className="flex items-center gap-2 sm:gap-2.5 text-[10px] sm:text-[11px] font-mono text-slate-500 dark:text-slate-400 flex-wrap pt-0.5">
                            {(topic.studyTimeMinutes || 0) > 0 && (
                              <span className="flex items-center gap-1 bg-slate-100 dark:bg-white/[0.06] px-2 py-0.5 rounded-md border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300 shrink-0">
                                <Clock className="w-3 h-3 text-amber-500" />
                                <span>{topic.studyTimeMinutes}m</span>
                              </span>
                            )}

                            {topic.status !== 'not_started' && topic.accuracy !== undefined && !isNaN(topic.accuracy) && topic.accuracy > 0 && (
                              <span className="flex items-center gap-1 bg-slate-100 dark:bg-white/[0.06] px-2 py-0.5 rounded-md border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300 shrink-0">
                                <Target className="w-3 h-3 text-rose-500" />
                                <span>{topic.accuracy}%</span>
                              </span>
                            )}

                            {topic.difficulty && (
                              <span className="flex items-center gap-1 bg-slate-100 dark:bg-white/[0.06] px-2 py-0.5 rounded-md border border-slate-200/80 dark:border-white/10 text-slate-600 dark:text-slate-300 shrink-0">
                                <span className={`w-1.5 h-1.5 rounded-full ${topic.difficulty === 'Hard' ? 'bg-rose-500' : topic.difficulty === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                                <span>{topic.difficulty}</span>
                              </span>
                            )}

                            {unresolvedMistakes > 0 && (
                              <span className="flex items-center gap-1 bg-rose-500/10 text-rose-600 dark:text-rose-400 px-2 py-0.5 rounded-md border border-rose-500/20 font-bold shrink-0">
                                <AlertTriangle className="w-3 h-3" />
                                <span>{unresolvedMistakes} {unresolvedMistakes === 1 ? 'Trap' : 'Traps'}</span>
                              </span>
                            )}

                            {hasNotes && (
                              <span className="flex items-center gap-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-md border border-blue-500/20 font-bold shrink-0">
                                <FileText className="w-3 h-3" />
                                <span>Notes</span>
                              </span>
                            )}

                            {hasPdf && (
                              <span className="flex items-center gap-1 bg-purple-500/10 text-purple-600 dark:text-purple-400 px-2 py-0.5 rounded-md border border-purple-500/20 font-bold shrink-0">
                                <BookOpen className="w-3 h-3" />
                                <span>PDF</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right: Status Pill & Action Chevron */}
                      <div className="flex items-center gap-2 sm:gap-3 shrink-0 self-end sm:self-center">
                        <button
                          type="button"
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
                          className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer shadow-2xs border select-none hover:opacity-90 ${design.statusPillClass}`}
                          title="Click to toggle status"
                        >
                          <BadgeIcon className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span className="sm:hidden">{design.mobileLabel}</span>
                          <span className="hidden sm:inline">{design.badgeLabel}</span>
                        </button>

                        <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-xl bg-slate-50 dark:bg-white/[0.06] border border-slate-200/80 dark:border-white/10 flex items-center justify-center text-slate-400 dark:text-slate-300 group-hover:bg-[#4F46E5] group-hover:text-white group-hover:border-[#4F46E5] transition-all duration-200 group-hover:translate-x-0.5 shadow-2xs shrink-0">
                          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                        </div>
                      </div>
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
    const totalSubjectTopics = (activeSubject.chapters || []).reduce((a, c) => a + (c.topics || []).length, 0);
    const completedSubjectTopics = (activeSubject.chapters || []).reduce((a, c) => a + (c.topics || []).filter(t => t.status === 'completed').length, 0);
    const subjectPercent = totalSubjectTopics > 0 ? Math.round((completedSubjectTopics / totalSubjectTopics) * 100) : 0;
    const completedSubjectChapters = (activeSubject.chapters || []).filter(c => (c.topics || []).length > 0 && c.topics.every(t => t.status === 'completed')).length;
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
        <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/90 dark:bg-[#121424]/90 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 shadow-xs sm:shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden">
          <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
            {/* Visual Badge Thumbnail */}
            <div className={`w-13 sm:w-15 h-13 sm:h-15 rounded-2xl flex flex-col items-center justify-center text-center p-2 shrink-0 shadow-xs sm:shadow-sm relative overflow-hidden border ${subjectBadge.containerClass}`}>
              <SubjectBadgeIcon className="w-6 sm:w-7 h-6 sm:h-7 stroke-[2.2] mb-0.5" />
              <span className="text-[10px] sm:text-[11px] font-black tracking-wider uppercase font-mono leading-none truncate max-w-full">
                {subjectBadge.badgeText}
              </span>
            </div>

            <div className="min-w-0 space-y-1 sm:space-y-1.5">
              {/* Breadcrumb Navigation Bar */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={handleBackToSubjects}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-500/15 dark:hover:bg-indigo-500/25 text-indigo-700 dark:text-indigo-300 text-xs font-bold transition-all cursor-pointer shadow-2xs group"
                >
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                  <span>All Subjects</span>
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/[0.06] border border-slate-200/60 dark:border-white/10 text-slate-600 dark:text-slate-300 text-xs font-mono font-bold">
                  {currentExam.name}
                </span>
              </div>

              {/* Title & Micro Summary */}
              <div>
                <h1 className="text-xl sm:text-2xl font-black font-grotesk text-slate-900 dark:text-white tracking-tight truncate leading-tight">
                  {formatTitleCase(activeSubject.name)}
                </h1>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  <span className="font-mono">{activeSubject.chapters.length} Chapters · {totalSubjectTopics} Topics</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions (Edit Subject) */}
          <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end shrink-0">
            <button
              type="button"
              onClick={() => setEditingSubject(activeSubject)}
              className="p-2 sm:px-3 sm:py-2 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.08] dark:hover:bg-white/[0.12] border border-slate-200/60 dark:border-white/10 transition-colors cursor-pointer active:scale-95 shadow-2xs flex items-center gap-1.5 text-xs font-bold"
              title="Edit Subject"
              aria-label="Edit Subject"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Edit</span>
            </button>
          </div>
        </div>

        {/* 2. 4 MODERN EXECUTIVE METRIC BENTO CARDS FOR SUBJECT */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 print:hidden">
          {/* Card 1: Chapters */}
          <div className="group relative rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-white/95 dark:bg-[#121424]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 hover:border-indigo-500/40 dark:hover:border-indigo-400/40 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between overflow-hidden select-none">
            {/* Top Row: Icon Squircle + Context Pill Badge */}
            <div className="flex items-center justify-between gap-2">
              <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl sm:rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/25 text-indigo-600 dark:text-indigo-400 flex items-center justify-center transition-transform group-hover:scale-105 shadow-2xs shrink-0">
                <Layers className="w-4.5 sm:w-5 h-4.5 sm:h-5 stroke-[2.2]" />
              </div>

              <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-[11px] font-bold tracking-wide border shrink-0 bg-slate-50 dark:bg-white/[0.04] text-slate-600 dark:text-slate-300 border-slate-200/70 dark:border-white/10 font-sans">
                {completedSubjectChapters}/{activeSubject.chapters.length} Done
              </span>
            </div>

            {/* Middle Section: Hero Metric Value & Label */}
            <div className="my-3 sm:my-3.5 space-y-0.5">
              <div className="text-2xl sm:text-3xl font-black font-sans tracking-tight text-slate-900 dark:text-white tabular-nums leading-none">
                {activeSubject.chapters.length}
              </div>
              <div className="text-xs sm:text-[13px] font-bold text-slate-500 dark:text-slate-400 pt-1 font-sans">
                Total Chapters
              </div>
            </div>

            {/* Bottom Section: Smooth Progress Track & Context Subtext */}
            <div className="space-y-2 mt-auto">
              <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden">
                {subjectPercent > 0 ? (
                  <div
                    className="bg-[#6366F1] rounded-full h-full transition-all duration-500"
                    style={{ width: `${subjectPercent}%` }}
                  />
                ) : null}
              </div>

              <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium font-sans">
                <span className="truncate">
                  {completedSubjectChapters} of {activeSubject.chapters.length} completed
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Mastered Topics */}
          <div className="group relative rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-white/95 dark:bg-[#121424]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 hover:border-rose-500/40 dark:hover:border-rose-400/40 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between overflow-hidden select-none">
            {/* Top Row: Icon Squircle + Context Pill Badge */}
            <div className="flex items-center justify-between gap-2">
              <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl sm:rounded-2xl bg-rose-500/10 dark:bg-rose-500/15 border border-rose-500/25 text-rose-600 dark:text-rose-400 flex items-center justify-center transition-transform group-hover:scale-105 shadow-2xs shrink-0">
                <CheckCircle2 className="w-4.5 sm:w-5 h-4.5 sm:h-5 stroke-[2.2]" />
              </div>

              <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-[11px] font-bold tracking-wide border shrink-0 bg-slate-50 dark:bg-white/[0.04] text-slate-600 dark:text-slate-300 border-slate-200/70 dark:border-white/10 font-sans">
                {totalSubjectTopics > 0 ? Math.round((completedSubjectTopics / totalSubjectTopics) * 100) : 0}% Done
              </span>
            </div>

            {/* Middle Section: Hero Metric Value & Label */}
            <div className="my-3 sm:my-3.5 space-y-0.5">
              <div className="flex items-baseline gap-1.5 text-slate-900 dark:text-white leading-none">
                <span className="text-2xl sm:text-3xl font-black font-sans tracking-tight tabular-nums">
                  {completedSubjectTopics}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-400 dark:text-slate-500 font-sans">
                  / {totalSubjectTopics}
                </span>
              </div>
              <div className="text-xs sm:text-[13px] font-bold text-slate-500 dark:text-slate-400 pt-1 font-sans">
                Mastered Topics
              </div>
            </div>

            {/* Bottom Section: Smooth Progress Track & Context Subtext */}
            <div className="space-y-2 mt-auto">
              <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden">
                {totalSubjectTopics > 0 && completedSubjectTopics > 0 ? (
                  <div
                    className="bg-[#F43F5E] rounded-full h-full transition-all duration-500"
                    style={{ width: `${(completedSubjectTopics / totalSubjectTopics) * 100}%` }}
                  />
                ) : null}
              </div>

              <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium font-sans">
                <span className="truncate">
                  {totalSubjectTopics - completedSubjectTopics === 0 && totalSubjectTopics > 0
                    ? 'All Completed! 🎉'
                    : `${Math.max(0, totalSubjectTopics - completedSubjectTopics)} topics remaining`}
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Total Topics */}
          <div className="group relative rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-white/95 dark:bg-[#121424]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 hover:border-sky-500/40 dark:hover:border-sky-400/40 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between overflow-hidden select-none">
            {/* Top Row: Icon Squircle + Context Pill Badge */}
            <div className="flex items-center justify-between gap-2">
              <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl sm:rounded-2xl bg-sky-500/10 dark:bg-sky-500/15 border border-sky-500/25 text-sky-600 dark:text-sky-400 flex items-center justify-center transition-transform group-hover:scale-105 shadow-2xs shrink-0">
                <FileText className="w-4.5 sm:w-5 h-4.5 sm:h-5 stroke-[2.2]" />
              </div>

              <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-[11px] font-bold tracking-wide border shrink-0 bg-slate-50 dark:bg-white/[0.04] text-slate-600 dark:text-slate-300 border-slate-200/70 dark:border-white/10 font-sans">
                {activeSubject.name}
              </span>
            </div>

            {/* Middle Section: Hero Metric Value & Label */}
            <div className="my-3 sm:my-3.5 space-y-0.5">
              <div className="text-2xl sm:text-3xl font-black font-sans tracking-tight text-slate-900 dark:text-white tabular-nums leading-none">
                {totalSubjectTopics}
              </div>
              <div className="text-xs sm:text-[13px] font-bold text-slate-500 dark:text-slate-400 pt-1 font-sans">
                Subject Topics
              </div>
            </div>

            {/* Bottom Section: Smooth Progress Track & Context Subtext */}
            <div className="space-y-2 mt-auto">
              <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden">
                {subjectPercent > 0 ? (
                  <div
                    className="bg-[#0284C7] rounded-full h-full transition-all duration-500"
                    style={{ width: `${subjectPercent}%` }}
                  />
                ) : null}
              </div>

              <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium font-sans">
                <span className="truncate">Across {activeSubject.chapters.length} chapters</span>
              </div>
            </div>
          </div>

          {/* Card 4: Subject Mastery */}
          <div className="group relative rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-white/95 dark:bg-[#121424]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 hover:border-emerald-500/40 dark:hover:border-emerald-400/40 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between overflow-hidden select-none">
            {/* Top Row: Icon Squircle + Context Pill Badge */}
            <div className="flex items-center justify-between gap-2">
              <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl sm:rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 flex items-center justify-center transition-transform group-hover:scale-105 shadow-2xs shrink-0">
                <TrendingUp className="w-4.5 sm:w-5 h-4.5 sm:h-5 stroke-[2.2]" />
              </div>

              <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-[11px] font-bold tracking-wide border shrink-0 bg-slate-50 dark:bg-white/[0.04] text-slate-600 dark:text-slate-300 border-slate-200/70 dark:border-white/10 font-sans">
                {Math.max(0, totalSubjectTopics - completedSubjectTopics)} Left
              </span>
            </div>

            {/* Middle Section: Hero Metric Value & Label */}
            <div className="my-3 sm:my-3.5 space-y-0.5">
              <div className="text-2xl sm:text-3xl font-black font-sans tracking-tight text-slate-900 dark:text-white tabular-nums leading-none">
                {subjectPercent}%
              </div>
              <div className="text-xs sm:text-[13px] font-bold text-slate-500 dark:text-slate-400 pt-1 font-sans">
                Subject Mastery
              </div>
            </div>

            {/* Bottom Section: Smooth Progress Track & Context Subtext */}
            <div className="space-y-2 mt-auto">
              <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden">
                {subjectPercent > 0 ? (
                  <div
                    className="bg-[#10B981] rounded-full h-full transition-all duration-500"
                    style={{ width: `${subjectPercent}%` }}
                  />
                ) : null}
              </div>

              <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium font-sans">
                <span className="truncate">Overall subject progress</span>
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
                    Chapters
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/15 border border-indigo-200/70 dark:border-indigo-500/30 text-[11px] font-mono font-bold text-indigo-700 dark:text-indigo-300">
                    {filteredChapters.length} of {activeSubject.chapters.length} Chapters
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddChapterOpen(true)}
                  className="px-3.5 sm:px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-[13px] font-bold shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                  title={`Add new chapter to ${activeSubject.name}`}
                >
                  <Plus className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Add Chapter</span>
                </button>
                <button
                  type="button"
                  onClick={() => onOpenAddTopic(activeSubject.id)}
                  className="px-3.5 sm:px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-[13px] font-bold shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
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
                placeholder="Search chapters..."
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

          {/* 3. DYNAMIC CHAPTER CARDS LIST (Executive Modern Step Cards Matching Mockup) */}
          <div className="space-y-2.5 sm:space-y-3">
            {filteredChapters.length === 0 ? (
              <div className="py-10 sm:py-14 px-4 text-center rounded-2xl bg-slate-50/70 dark:bg-[#1A1B29] border border-dashed border-slate-200/80 dark:border-white/[0.08] space-y-3.5">
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
                const totalInChapter = (chapter.topics || []).length;
                const completedInChapter = (chapter.topics || []).filter(t => t.status === 'completed').length;
                const inProgressInChapter = (chapter.topics || []).filter(t => t.status === 'in_progress').length;
                const weakInChapter = (chapter.topics || []).filter(t => t.status === 'weak').length;
                const chapterPercent = totalInChapter > 0 ? Math.round((completedInChapter / totalInChapter) * 100) : 0;
                const isChapterMastered = chapterPercent === 100 && totalInChapter > 0;
                const hasChapterStarted = chapterPercent > 0 || inProgressInChapter > 0;
                const formattedNum = (idx + 1).toString().padStart(2, '0');
                const palette = TOPIC_PALETTES[idx % TOPIC_PALETTES.length];
                const chapterBadge = getChapterBadgeStyle(activeSubject.name, idx);
                const ChapterIcon = isChapterMastered ? CheckCircle2 : chapterBadge.icon;

                return (
                <div
                  key={chapter.id}
                  onClick={() => handleSelectChapter(chapter.id)}
                  className="group relative rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121424] border border-slate-200/90 dark:border-white/10 p-4 sm:p-5 shadow-xs hover:shadow-md hover:-translate-y-0.5 hover:border-indigo-500/40 dark:hover:border-indigo-400/30 transition-all duration-200 cursor-pointer select-none overflow-hidden"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 sm:gap-4">
                    {/* Left: Emblem + Title & Meta */}
                    <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 flex-1">
                      {/* Integrated Luxury Chapter Emblem */}
                      <div className="relative shrink-0">
                        <div
                          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${palette.gradient} text-white flex items-center justify-center shadow-md shadow-black/10 group-hover:scale-105 transition-transform duration-200`}
                        >
                          <ChapterIcon className="w-6 h-6 stroke-[2.2] drop-shadow-xs" />
                        </div>
                        <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-md bg-white dark:bg-[#1A1C2E] border border-slate-200/80 dark:border-white/15 text-[10px] font-bold font-sans shadow-2xs text-slate-700 dark:text-slate-200">
                          {formattedNum}
                        </span>
                      </div>

                      {/* Title & Metadata */}
                      <div className="min-w-0 flex-1 space-y-1 sm:space-y-1.5">
                        <h3 className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate font-sans">
                          {chapter.name}
                        </h3>

                        {/* Meta Tags Row */}
                        <div className="flex items-center gap-2.5 sm:gap-3 text-xs text-slate-500 dark:text-slate-400 font-semibold font-sans flex-wrap">
                          <span className="flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                            <span>{totalInChapter} {totalInChapter === 1 ? 'Topic' : 'Topics'}</span>
                          </span>
                          <span className="text-slate-300 dark:text-slate-600">•</span>
                          <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span>{completedInChapter}/{totalInChapter} Mastered</span>
                          </span>
                          {weakInChapter > 0 && (
                            <>
                              <span className="text-slate-300 dark:text-slate-600">•</span>
                              <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400 font-bold">
                                <AlertTriangle className="w-3.5 h-3.5" />
                                <span>{weakInChapter} Weak</span>
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right: Progress Metric + Continue Action */}
                    <div className="flex items-center gap-3.5 sm:gap-5 shrink-0 self-end sm:self-center justify-between sm:justify-end w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-white/[0.06]">
                      {/* Progress Bar & Percentage */}
                      <div className="flex flex-col items-start sm:items-end gap-1.5 min-w-[110px] sm:min-w-[130px]">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs sm:text-sm font-black font-sans text-slate-900 dark:text-white tabular-nums">
                            {chapterPercent}%
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-sans border ${
                            isChapterMastered
                              ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                              : hasChapterStarted
                              ? 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/30'
                              : 'bg-slate-100 dark:bg-white/[0.08] text-slate-500 dark:text-slate-400 border-slate-200/80 dark:border-white/10'
                          }`}>
                            {isChapterMastered ? 'Mastered' : hasChapterStarted ? 'In Progress' : 'Not Started'}
                          </span>
                        </div>

                        {/* Sleek Progress Track */}
                        <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-white/[0.08] overflow-hidden">
                          {chapterPercent > 0 ? (
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${chapterPercent}%`,
                                backgroundColor: palette.accentColor
                              }}
                            />
                          ) : null}
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="flex items-center gap-1 px-3 sm:px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.06] border border-slate-200/80 dark:border-white/10 text-xs sm:text-[13px] font-bold font-sans text-slate-700 dark:text-slate-200 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all duration-200 shadow-2xs shrink-0">
                        <span>View Topics</span>
                        <ChevronRight className="w-3.5 h-3.5 stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
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

        {(editingChapter || isAddChapterOpen) && (
          <EditChapterModal
            isOpen={Boolean(editingChapter || isAddChapterOpen)}
            subjectId={activeSubject.id}
            chapter={editingChapter?.chapter || null}
            onClose={() => {
              setEditingChapter(null);
              setIsAddChapterOpen(false);
            }}
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
      <div className="relative overflow-hidden p-4 sm:p-5 sm:py-6 rounded-2xl sm:rounded-3xl bg-white/90 dark:bg-[#121424]/90 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 shadow-xs sm:shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
        {/* Specular Edge Highlight */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300/40 dark:via-white/15 to-transparent pointer-events-none" />

        <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 min-w-0">
          <SectionBadgeIcon section="syllabus" size="md" />
          <div className="min-w-0 space-y-1 sm:space-y-1.5">
            <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black font-grotesk text-slate-900 dark:text-white tracking-tight leading-tight">
                Syllabus Explorer
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/15 border border-indigo-200/70 dark:border-indigo-500/30 text-[11px] font-bold text-indigo-700 dark:text-indigo-300 font-mono">
                {currentExam.targetYear ? `${currentExam.targetYear}` : '2026'}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/[0.08] border border-slate-200/60 dark:border-white/10 text-[11px] font-bold text-slate-700 dark:text-slate-300">
                {currentExam.name ? formatTitleCase(currentExam.name) : 'SSC CGL'}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200/70 dark:border-emerald-500/30 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{overallPercentage}% Mastered</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <span className="text-slate-600 dark:text-slate-300 font-mono text-xs font-semibold">
                {currentExam.subjects.length} {currentExam.subjects.length === 1 ? 'Subject' : 'Subjects'} · {totalTopicsCount} Topics
              </span>
            </p>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex items-center gap-2.5 self-stretch md:self-auto justify-end flex-wrap shrink-0">
          {onOpenAiArchitect && (
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onOpenAiArchitect();
              }}
              className="flex-1 sm:flex-initial px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-xs sm:text-[13px] font-bold shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
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
            className="flex-1 sm:flex-initial px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-[13px] font-bold shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add Subject</span>
          </button>
        </div>
      </div>

      {/* 2. REFINED EXECUTIVE PACING & TARGET BANNER */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-gradient-to-r from-amber-500/[0.08] via-orange-500/[0.06] to-amber-500/[0.03] dark:from-amber-950/40 dark:via-orange-950/25 dark:to-[#121424]/80 backdrop-blur-xl border border-amber-300/80 dark:border-amber-500/30 shadow-xs sm:shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        {/* Specular Top Line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 dark:via-amber-400/30 to-transparent pointer-events-none" />
        {/* Ambient Warm Glow */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-amber-400/15 dark:bg-amber-400/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex items-center gap-3.5 min-w-0">
          {/* Executive Target Squircle */}
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 dark:from-amber-500/30 dark:to-orange-500/25 border border-amber-400/50 dark:border-amber-400/35 flex items-center justify-center text-amber-700 dark:text-amber-300 shadow-xs shrink-0">
            <Target className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.3]" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
                Daily Pacing:
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-amber-500/15 dark:bg-amber-400/20 border border-amber-400/40 text-xs sm:text-sm font-black text-amber-800 dark:text-amber-200 font-mono tabular-nums">
                {pacingForecast ? `${pacingForecast.requiredDailyPace} Topics / Day` : 'On Track'}
              </span>
              {pacingForecast?.statusLabel && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/[0.08] border border-slate-200/60 dark:border-white/10 text-[10px] sm:text-[11px] font-bold text-slate-600 dark:text-slate-300">
                  {pacingForecast.statusLabel}
                </span>
              )}
            </div>

            <div className="text-xs sm:text-[13px] font-medium text-slate-600 dark:text-slate-300 mt-1 flex items-center gap-2 flex-wrap">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>
                  {pacingForecast?.finishLineForecastDate
                    ? `Estimated Finish: ${pacingForecast.finishLineForecastDate}`
                    : `Target Exam: ${formattedExamDate}`}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Right Side Status Badge */}
        <div className="relative z-10 flex items-center gap-2 self-start sm:self-auto shrink-0">
          <div className="flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-amber-500/15 dark:bg-amber-400/15 border border-amber-400/40 dark:border-amber-400/30 text-amber-900 dark:text-amber-200 text-xs sm:text-[13px] font-bold font-mono shadow-2xs">
            <Zap className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span>{daysRemaining > 0 ? `${daysRemaining} Days Left` : 'Exam Today'}</span>
          </div>
        </div>
      </div>

      {/* 3. 4 MODERN EXECUTIVE METRIC BENTO CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 print:hidden">
        {/* Card 1: Total Topics */}
        <div className="group relative rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-white/95 dark:bg-[#121424]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 hover:border-indigo-500/40 dark:hover:border-indigo-400/40 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between overflow-hidden select-none">
          {/* Top Row: Icon Squircle + Context Pill Badge */}
          <div className="flex items-center justify-between gap-2">
            <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl sm:rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/25 text-indigo-600 dark:text-indigo-400 flex items-center justify-center transition-transform group-hover:scale-105 shadow-2xs shrink-0">
              <BookOpen className="w-4.5 sm:w-5 h-4.5 sm:h-5 stroke-[2.2]" />
            </div>

            <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-[11px] font-bold tracking-wide border shrink-0 bg-slate-50 dark:bg-white/[0.04] text-slate-600 dark:text-slate-300 border-slate-200/70 dark:border-white/10 font-sans">
              {currentExam.subjects.length} {currentExam.subjects.length === 1 ? 'Subject' : 'Subjects'}
            </span>
          </div>

          {/* Middle Section: Hero Metric Value & Label */}
          <div className="my-3 sm:my-3.5 space-y-0.5">
            <div className="text-2xl sm:text-3xl font-black font-sans tracking-tight text-slate-900 dark:text-white tabular-nums leading-none">
              {totalTopicsCount}
            </div>
            <div className="text-xs sm:text-[13px] font-bold text-slate-500 dark:text-slate-400 pt-1 font-sans">
              Total Topics
            </div>
          </div>

          {/* Bottom Section: Smooth Progress Track & Context Subtext */}
          <div className="space-y-2 mt-auto">
            <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden">
              {overallPercentage > 0 ? (
                <div
                  className="bg-[#6366F1] rounded-full h-full transition-all duration-500"
                  style={{ width: `${overallPercentage}%` }}
                />
              ) : null}
            </div>

            <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium font-sans">
              <span className="truncate">
                {currentExam.subjects.reduce((sum, s) => sum + s.chapters.length, 0)} Chapters in track
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Mastered Topics */}
        <div className="group relative rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-white/95 dark:bg-[#121424]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 hover:border-rose-500/40 dark:hover:border-rose-400/40 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between overflow-hidden select-none">
          {/* Top Row: Icon Squircle + Context Pill Badge */}
          <div className="flex items-center justify-between gap-2">
            <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl sm:rounded-2xl bg-rose-500/10 dark:bg-rose-500/15 border border-rose-500/25 text-rose-600 dark:text-rose-400 flex items-center justify-center transition-transform group-hover:scale-105 shadow-2xs shrink-0">
              <CheckCircle2 className="w-4.5 sm:w-5 h-4.5 sm:h-5 stroke-[2.2]" />
            </div>

            <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-[11px] font-bold tracking-wide border shrink-0 bg-slate-50 dark:bg-white/[0.04] text-slate-600 dark:text-slate-300 border-slate-200/70 dark:border-white/10 font-sans">
              {overallPercentage}% Done
            </span>
          </div>

          {/* Middle Section: Hero Metric Value & Label */}
          <div className="my-3 sm:my-3.5 space-y-0.5">
            <div className="flex items-baseline gap-1.5 text-slate-900 dark:text-white leading-none">
              <span className="text-2xl sm:text-3xl font-black font-sans tracking-tight tabular-nums">
                {completedTopicsCount}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-400 dark:text-slate-500 font-sans">
                / {totalTopicsCount}
              </span>
            </div>
            <div className="text-xs sm:text-[13px] font-bold text-slate-500 dark:text-slate-400 pt-1 font-sans">
              Mastered Topics
            </div>
          </div>

          {/* Bottom Section: Smooth Progress Track & Context Subtext */}
          <div className="space-y-2 mt-auto">
            <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden">
              {totalTopicsCount > 0 && completedTopicsCount > 0 ? (
                <div
                  className="bg-[#F43F5E] rounded-full h-full transition-all duration-500"
                  style={{ width: `${(completedTopicsCount / totalTopicsCount) * 100}%` }}
                />
              ) : null}
            </div>

            <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium font-sans">
              <span className="truncate">
                {totalTopicsCount - completedTopicsCount === 0 && totalTopicsCount > 0
                  ? 'All Completed! 🎉'
                  : `${Math.max(0, totalTopicsCount - completedTopicsCount)} topics remaining`}
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Exam Runway */}
        <div className="group relative rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-white/95 dark:bg-[#121424]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 hover:border-sky-500/40 dark:hover:border-sky-400/40 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between overflow-hidden select-none">
          {/* Top Row: Icon Squircle + Context Pill Badge */}
          <div className="flex items-center justify-between gap-2">
            <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl sm:rounded-2xl bg-sky-500/10 dark:bg-sky-500/15 border border-sky-500/25 text-sky-600 dark:text-sky-400 flex items-center justify-center transition-transform group-hover:scale-105 shadow-2xs shrink-0">
              <Clock className="w-4.5 sm:w-5 h-4.5 sm:h-5 stroke-[2.2]" />
            </div>

            <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-[11px] font-bold tracking-wide border shrink-0 bg-slate-50 dark:bg-white/[0.04] text-slate-600 dark:text-slate-300 border-slate-200/70 dark:border-white/10 font-sans">
              {daysRemaining > 0 ? `${Math.ceil(daysRemaining / 7)}w Left` : 'Exam Today'}
            </span>
          </div>

          {/* Middle Section: Hero Metric Value & Label */}
          <div className="my-3 sm:my-3.5 space-y-0.5">
            <div className="flex items-baseline gap-1.5 text-slate-900 dark:text-white leading-none">
              <span className="text-2xl sm:text-3xl font-black font-sans tracking-tight tabular-nums">
                {daysRemaining > 0 ? daysRemaining : 0}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-400 dark:text-slate-500 font-sans">
                {daysRemaining === 1 ? 'day left' : 'days left'}
              </span>
            </div>
            <div className="text-xs sm:text-[13px] font-bold text-slate-500 dark:text-slate-400 pt-1 font-sans">
              Exam Runway
            </div>
          </div>

          {/* Bottom Section: Smooth Progress Track & Context Subtext */}
          <div className="space-y-2 mt-auto">
            <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden">
              {daysRemaining > 0 ? (
                <div
                  className="bg-[#0284C7] rounded-full h-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(5, 100 - (daysRemaining / 60) * 100))}%` }}
                />
              ) : null}
            </div>

            <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium font-sans">
              <span className="truncate">{formattedExamDate}</span>
            </div>
          </div>
        </div>

        {/* Card 4: Completion Rate */}
        <div className="group relative rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-white/95 dark:bg-[#121424]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 hover:border-emerald-500/40 dark:hover:border-emerald-400/40 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between overflow-hidden select-none">
          {/* Top Row: Icon Squircle + Context Pill Badge */}
          <div className="flex items-center justify-between gap-2">
            <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl sm:rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 flex items-center justify-center transition-transform group-hover:scale-105 shadow-2xs shrink-0">
              <TrendingUp className="w-4.5 sm:w-5 h-4.5 sm:h-5 stroke-[2.2]" />
            </div>

            <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-[11px] font-bold tracking-wide border shrink-0 bg-slate-50 dark:bg-white/[0.04] text-slate-600 dark:text-slate-300 border-slate-200/70 dark:border-white/10 font-sans">
              {Math.max(0, totalTopicsCount - completedTopicsCount)} Left
            </span>
          </div>

          {/* Middle Section: Hero Metric Value & Label */}
          <div className="my-3 sm:my-3.5 space-y-0.5">
            <div className="text-2xl sm:text-3xl font-black font-sans tracking-tight text-slate-900 dark:text-white tabular-nums leading-none">
              {overallPercentage}%
            </div>
            <div className="text-xs sm:text-[13px] font-bold text-slate-500 dark:text-slate-400 pt-1 font-sans">
              Completion Rate
            </div>
          </div>

          {/* Bottom Section: Smooth Progress Track & Context Subtext */}
          <div className="space-y-2 mt-auto">
            <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden">
              {overallPercentage > 0 ? (
                <div
                  className="bg-[#10B981] rounded-full h-full transition-all duration-500"
                  style={{ width: `${overallPercentage}%` }}
                />
              ) : null}
            </div>

            <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium font-sans">
              <span className="truncate">Overall syllabus progress</span>
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
                  Subjects
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

        {/* 3. DYNAMIC SUBJECT CARDS LIST (Executive Modern Step Cards Matching Mockup) */}
        <div className="space-y-2.5 sm:space-y-3">
          {currentExam.subjects.length === 0 ? (
            <div className="py-12 sm:py-16 px-4 text-center rounded-2xl bg-slate-50/80 dark:bg-[#1A1B29] border-2 border-dashed border-slate-200/80 dark:border-white/[0.08] shadow-xs space-y-4">
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
            <div className="py-10 sm:py-14 px-4 text-center rounded-2xl bg-slate-50/70 dark:bg-[#1A1B29] border border-dashed border-slate-200/80 dark:border-white/[0.08] space-y-3.5">
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
            filteredSubjects.map((subject, sIdx) => {
              const badgeStyle = getSubjectBadgeStyle(subject.name);
              const BadgeIcon = badgeStyle.icon;
              const subjectTotalTopics = (subject.chapters || []).reduce((a, c) => a + (c.topics || []).length, 0);
              const subjectCompletedTopics = (subject.chapters || []).reduce((a, c) => a + (c.topics || []).filter(t => t.status === 'completed').length, 0);
              const totalChapters = (subject.chapters || []).length;
              const completedChapters = (subject.chapters || []).filter(ch => (ch.topics || []).length > 0 && ch.topics.every(t => t.status === 'completed')).length;

              const percent = subjectTotalTopics > 0
                ? Math.round((subjectCompletedTopics / subjectTotalTopics) * 100)
                : (totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 0);

              const isSubjectMastered = percent === 100 && subjectTotalTopics > 0;
              const hasSubjectStarted = percent > 0;
              const formattedNum = (sIdx + 1).toString().padStart(2, '0');
              const palette = TOPIC_PALETTES[sIdx % TOPIC_PALETTES.length];

              return (
                <div
                  key={subject.id}
                  onClick={() => handleSelectSubject(subject.id)}
                  className="group relative rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121424] border border-slate-200/90 dark:border-white/10 p-4 sm:p-5 shadow-xs hover:shadow-md hover:-translate-y-0.5 hover:border-indigo-500/40 dark:hover:border-indigo-400/30 transition-all duration-200 cursor-pointer select-none overflow-hidden"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 sm:gap-4">
                    {/* Left: Emblem + Title & Meta */}
                    <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 flex-1">
                      {/* Integrated Luxury Subject Emblem */}
                      <div className="relative shrink-0">
                        <div
                          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${palette.gradient} text-white flex items-center justify-center shadow-md shadow-black/10 group-hover:scale-105 transition-transform duration-200`}
                        >
                          <BadgeIcon className="w-6 h-6 stroke-[2.2] drop-shadow-xs" />
                        </div>
                        {/* Index Badge Tag */}
                        <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-md bg-white dark:bg-[#1A1C2E] border border-slate-200/80 dark:border-white/15 text-[10px] font-bold font-sans shadow-2xs text-slate-700 dark:text-slate-200">
                          {formattedNum}
                        </span>
                      </div>

                      {/* Title & Metadata */}
                      <div className="min-w-0 flex-1 space-y-1 sm:space-y-1.5">
                        <h3 className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white uppercase leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate font-sans">
                          {subject.name}
                        </h3>

                        {/* Meta Tags Row */}
                        <div className="flex items-center gap-2.5 sm:gap-3 text-xs text-slate-500 dark:text-slate-400 font-semibold font-sans flex-wrap">
                          <span className="flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                            <span>{totalChapters} {totalChapters === 1 ? 'Chapter' : 'Chapters'}</span>
                          </span>
                          <span className="text-slate-300 dark:text-slate-600">•</span>
                          <span className="flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                            <span>{subjectTotalTopics} Topics</span>
                          </span>
                          <span className="text-slate-300 dark:text-slate-600">•</span>
                          <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span>{completedChapters}/{totalChapters} Mastered</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Progress Metric + Continue Action */}
                    <div className="flex items-center gap-3.5 sm:gap-5 shrink-0 self-end sm:self-center justify-between sm:justify-end w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-white/[0.06]">
                      {/* Progress Bar & Percentage */}
                      <div className="flex flex-col items-start sm:items-end gap-1.5 min-w-[110px] sm:min-w-[130px]">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs sm:text-sm font-black font-sans text-slate-900 dark:text-white tabular-nums">
                            {percent}%
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-sans border ${
                            isSubjectMastered
                              ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                              : hasSubjectStarted
                              ? 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/30'
                              : 'bg-slate-100 dark:bg-white/[0.08] text-slate-500 dark:text-slate-400 border-slate-200/80 dark:border-white/10'
                          }`}>
                            {isSubjectMastered ? 'Mastered' : hasSubjectStarted ? 'In Progress' : 'Not Started'}
                          </span>
                        </div>

                        {/* Sleek Progress Track */}
                        <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-white/[0.08] overflow-hidden">
                          {percent > 0 ? (
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${percent}%`,
                                backgroundColor: palette.accentColor
                              }}
                            />
                          ) : null}
                        </div>
                      </div>

                      {/* Continue CTA Button */}
                      <div className="flex items-center gap-1 px-3 sm:px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.06] border border-slate-200/80 dark:border-white/10 text-xs sm:text-[13px] font-bold font-sans text-slate-700 dark:text-slate-200 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all duration-200 shadow-2xs shrink-0">
                        <span>{hasSubjectStarted ? 'Continue' : 'Explore'}</span>
                        <ChevronRight className="w-3.5 h-3.5 stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
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

