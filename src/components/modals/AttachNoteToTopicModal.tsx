import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  X,
  BookOpen,
  Layers,
  FileText,
  Video,
  CheckCircle2,
  Sparkles,
  Search,
  Plus,
  ChevronDown,
  BookmarkPlus,
  ArrowRight,
  ExternalLink,
  Check,
  AlertCircle
} from 'lucide-react';
import { useSyllabus } from '../../context/SyllabusContext';
import { Topic, TopicNoteItem } from '../../types/syllabus';
import { soundManager } from '../../utils/soundEffects';
import { haptics } from '../../utils/haptics';

interface AttachNoteToTopicModalProps {
  isOpen: boolean;
  onClose: () => void;
  noteTitle: string;
  notesContent: string;
  youtubeUrl?: string;
  videoTitle?: string;
  channelName?: string;
  thumbnailUrl?: string;
  onSuccess?: (topic: Topic, subjectName: string, chapterName: string) => void;
}

export const AttachNoteToTopicModal: React.FC<AttachNoteToTopicModalProps> = ({
  isOpen,
  onClose,
  noteTitle,
  notesContent,
  youtubeUrl,
  videoTitle,
  channelName,
  thumbnailUrl,
  onSuccess
}) => {
  const { currentExam, updateTopicNotes, addTopicLecture, addTopic } = useSyllabus();

  // Search state for instant topic jump
  const [searchQuery, setSearchQuery] = useState('');
  
  // Structured Selection state
  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  const [selectedChapterId, setSelectedChapterId] = useState('');
  const [selectedTopicId, setSelectedTopicId] = useState('');

  // New Topic Inline state
  const [isCreatingNewTopic, setIsCreatingNewTopic] = useState(false);
  const [newTopicName, setNewTopicName] = useState('');

  // Customization state
  const [noteCustomTitle, setNoteCustomTitle] = useState(noteTitle || 'YouTube Notes');
  const [placementMode, setPlacementMode] = useState<'new_tab' | 'append'>('new_tab');
  const [attachVideoLecture, setAttachVideoLecture] = useState(Boolean(youtubeUrl));

  // Success / Feedback state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successInfo, setSuccessInfo] = useState<{
    topicName: string;
    subjectName: string;
    chapterName: string;
  } | null>(null);

  // Sync custom title when noteTitle changes
  useEffect(() => {
    if (noteTitle) {
      setNoteCustomTitle(noteTitle);
    }
  }, [noteTitle]);

  // Sync attachVideoLecture when youtubeUrl changes
  useEffect(() => {
    setAttachVideoLecture(Boolean(youtubeUrl));
  }, [youtubeUrl]);

  // Flatten all topics for quick search across entire syllabus
  const allFlattenedTopics = useMemo(() => {
    if (!currentExam?.subjects) return [];
    const list: Array<{
      subjectId: string;
      subjectName: string;
      chapterId: string;
      chapterName: string;
      topic: Topic;
    }> = [];

    for (const subj of currentExam.subjects) {
      for (const chap of subj.chapters) {
        for (const top of chap.topics) {
          list.push({
            subjectId: subj.id,
            subjectName: subj.name,
            chapterId: chap.id,
            chapterName: chap.name,
            topic: top
          });
        }
      }
    }
    return list;
  }, [currentExam]);

  // Filtered search results
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return allFlattenedTopics
      .filter(item => 
        item.topic.name.toLowerCase().includes(q) ||
        item.chapterName.toLowerCase().includes(q) ||
        item.subjectName.toLowerCase().includes(q)
      )
      .slice(0, 10);
  }, [allFlattenedTopics, searchQuery]);

  // Current Subject Match
  const currentSubject = useMemo(() => {
    if (!currentExam?.subjects) return null;
    return currentExam.subjects.find(s => s.id === selectedSubjectId) || null;
  }, [currentExam, selectedSubjectId]);

  // Current Chapter Match
  const currentChapter = useMemo(() => {
    if (!currentSubject?.chapters) return null;
    return currentSubject.chapters.find(c => c.id === selectedChapterId) || null;
  }, [currentSubject, selectedChapterId]);

  // Current Topic Match
  const currentTopic = useMemo(() => {
    if (!currentChapter?.topics) return null;
    return currentChapter.topics.find(t => t.id === selectedTopicId) || null;
  }, [currentChapter, selectedTopicId]);

  // Initialize selection when modal opens
  useEffect(() => {
    if (!isOpen || !currentExam?.subjects || currentExam.subjects.length === 0) return;

    setSuccessInfo(null);
    setIsSubmitting(false);
    setSearchQuery('');
    setIsCreatingNewTopic(false);
    setNewTopicName('');

    // If no subject selected yet, pick the first subject
    if (!selectedSubjectId || !currentExam.subjects.some(s => s.id === selectedSubjectId)) {
      const firstSub = currentExam.subjects[0];
      setSelectedSubjectId(firstSub.id);

      if (firstSub.chapters && firstSub.chapters.length > 0) {
        const firstChap = firstSub.chapters[0];
        setSelectedChapterId(firstChap.id);

        if (firstChap.topics && firstChap.topics.length > 0) {
          setSelectedTopicId(firstChap.topics[0].id);
        } else {
          setSelectedTopicId('');
        }
      } else {
        setSelectedChapterId('');
        setSelectedTopicId('');
      }
    }
  }, [isOpen, currentExam]);

  // Handle changing subject
  const handleSelectSubject = useCallback((subId: string) => {
    setSelectedSubjectId(subId);
    setSearchQuery('');
    setIsCreatingNewTopic(false);
    const sub = currentExam?.subjects.find(s => s.id === subId);
    if (sub && sub.chapters.length > 0) {
      const firstChap = sub.chapters[0];
      setSelectedChapterId(firstChap.id);
      if (firstChap.topics.length > 0) {
        setSelectedTopicId(firstChap.topics[0].id);
      } else {
        setSelectedTopicId('');
      }
    } else {
      setSelectedChapterId('');
      setSelectedTopicId('');
    }
  }, [currentExam]);

  // Handle changing chapter
  const handleSelectChapter = useCallback((chapId: string) => {
    setSelectedChapterId(chapId);
    setSearchQuery('');
    setIsCreatingNewTopic(false);
    const chap = currentSubject?.chapters.find(c => c.id === chapId);
    if (chap && chap.topics.length > 0) {
      setSelectedTopicId(chap.topics[0].id);
    } else {
      setSelectedTopicId('');
    }
  }, [currentSubject]);

  // Handle picking from instant search results
  const handlePickSearchResult = useCallback((item: typeof allFlattenedTopics[0]) => {
    soundManager.playClick();
    haptics.selection();
    setSelectedSubjectId(item.subjectId);
    setSelectedChapterId(item.chapterId);
    setSelectedTopicId(item.topic.id);
    setIsCreatingNewTopic(false);
    setSearchQuery('');
  }, []);

  // Submit and Attach Note
  const handleAttachNote = async () => {
    if (!currentSubject || !currentChapter) {
      return;
    }

    let targetTopicId = selectedTopicId;
    let targetTopicName = currentTopic?.name || '';

    // Handle new topic creation if selected
    if (isCreatingNewTopic) {
      const trimmedName = newTopicName.trim();
      if (!trimmedName) return;

      const generatedId = `top_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
      targetTopicId = generatedId;
      targetTopicName = trimmedName;

      // Create topic
      addTopic(currentSubject.id, currentChapter.id, {
        id: generatedId,
        name: trimmedName,
        status: 'in_progress',
        notes: notesContent,
        noteItems: [
          {
            id: `yt_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
            title: noteCustomTitle.trim() || 'YouTube Study Notes',
            content: notesContent,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ],
        subtopics: [],
        completionPercentage: 0,
        studyTimeMinutes: 0,
        lastStudied: new Date().toISOString(),
        nextRevision: null,
        accuracy: 0,
        mockAttempts: 0,
        difficulty: 'Medium',
        isWeak: false,
        weightage: 5,
        mistakes: []
      });
    } else {
      if (!currentTopic) return;
      targetTopicName = currentTopic.name;

      const cleanCustomTitle = noteCustomTitle.trim() || (videoTitle ? `YouTube: ${videoTitle.slice(0, 35)}` : 'YouTube Notes');

      if (placementMode === 'new_tab') {
        const newNoteItem: TopicNoteItem = {
          id: `yt_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
          title: cleanCustomTitle,
          content: notesContent,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        let updatedNoteItems: TopicNoteItem[];
        if (currentTopic.noteItems && currentTopic.noteItems.length > 0) {
          updatedNoteItems = [...currentTopic.noteItems, newNoteItem];
        } else {
          const existingPrimary = (currentTopic.notes || '').trim();
          updatedNoteItems = [
            ...(existingPrimary ? [{
              id: 'note_1',
              title: 'Main Notes',
              content: existingPrimary,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            }] : []),
            newNoteItem
          ];
        }

        // Keep topic notes or set if empty
        const finalPrimaryNotes = currentTopic.notes && currentTopic.notes.trim() ? currentTopic.notes : notesContent;
        updateTopicNotes(currentTopic.id, finalPrimaryNotes, updatedNoteItems);
      } else {
        // Append mode
        const separator = currentTopic.notes && currentTopic.notes.trim() ? '\n\n---\n\n' : '';
        const heading = `## 🎬 YouTube Note: ${videoTitle || cleanCustomTitle}\n\n`;
        const finalNotes = (currentTopic.notes || '') + separator + heading + notesContent;
        updateTopicNotes(currentTopic.id, finalNotes, currentTopic.noteItems);
      }
    }

    // Also attach YouTube Video Lecture if opted
    if (attachVideoLecture && youtubeUrl && addTopicLecture) {
      addTopicLecture(targetTopicId, {
        title: videoTitle || noteCustomTitle || 'YouTube Study Lecture',
        youtubeUrl: youtubeUrl,
        channelName: channelName || undefined,
        notes: `Linked with AI YouTube Note: "${noteCustomTitle.trim() || 'Study Notes'}"`
      });
    }

    // Success chime and state
    soundManager.playCompleteChime();
    haptics.success();

    const info = {
      topicName: targetTopicName,
      subjectName: currentSubject.name,
      chapterName: currentChapter.name
    };
    setSuccessInfo(info);

    if (onSuccess && currentTopic) {
      onSuccess(currentTopic, currentSubject.name, currentChapter.name);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full sm:max-w-xl max-h-[92vh] sm:max-h-[85vh] flex flex-col rounded-t-3xl sm:rounded-3xl bg-white dark:bg-[#12131A] border border-slate-200/80 dark:border-[#252636] shadow-2xl overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Handle */}
        <div className="sm:hidden pt-3 pb-1 flex items-center justify-center bg-white dark:bg-[#12131A]">
          <div className="w-12 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
        </div>

        {/* Modal Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-slate-100 dark:border-[#20212E] flex items-center justify-between bg-white dark:bg-[#12131A] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <BookmarkPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
                Add to Syllabus Topic
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Attach this YouTube study note to your syllabus curriculum
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              haptics.light();
              onClose();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-5 sm:px-6 py-4 overflow-y-auto space-y-4 flex-1">
          {successInfo ? (
            /* ── SUCCESS SCREEN ── */
            <div className="py-8 text-center space-y-4 animate-scale-in">
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-black text-slate-900 dark:text-white">
                  Successfully Attached!
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                  Your YouTube study note has been saved into:
                </p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-50 dark:bg-violet-500/10 border border-violet-200/80 dark:border-violet-500/20 text-xs font-bold text-violet-700 dark:text-violet-300 mt-2">
                  <span>{successInfo.subjectName}</span>
                  <span className="text-slate-400">›</span>
                  <span>{successInfo.chapterName}</span>
                  <span className="text-slate-400">›</span>
                  <span className="text-slate-900 dark:text-white">{successInfo.topicName}</span>
                </div>
              </div>

              {attachVideoLecture && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-left flex items-start gap-2.5 max-w-md mx-auto">
                  <Video className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-emerald-800 dark:text-emerald-300">
                    Video link was also linked to the topic&apos;s <strong>Lectures &amp; Videos</strong> tab.
                  </p>
                </div>
              )}

              <div className="pt-2 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    onClose();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold shadow-sm hover:opacity-90 transition-all cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* ── FORM ── */
            <>
              {/* Note Preview Banner */}
              <div className="p-3 rounded-2xl bg-gradient-to-r from-violet-500/10 via-indigo-500/10 to-blue-500/10 border border-violet-200/70 dark:border-violet-500/20 flex items-center gap-3">
                {thumbnailUrl ? (
                  <img
                    src={thumbnailUrl}
                    alt="Thumbnail"
                    className="w-14 h-10 object-cover rounded-lg border border-white/20 shrink-0 shadow-2xs"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-violet-600 text-white flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                    {videoTitle || noteTitle || 'YouTube Study Notes'}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {channelName ? `${channelName} • ` : ''}
                    {Math.round(notesContent.length / 5)} words
                  </p>
                </div>
              </div>

              {/* Instant Search Bar */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5 text-violet-500" />
                  <span>Quick Search Any Topic</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search across all subjects &amp; chapters..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-[#181924] border border-slate-200/80 dark:border-[#2A2B3D] text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="p-1 rounded-md text-slate-400 hover:text-slate-600 absolute right-2.5 top-1/2 -translate-y-1/2"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Search Results Dropdown */}
                {searchQuery.trim() && (
                  <div className="rounded-xl border border-violet-200/80 dark:border-violet-500/30 bg-white dark:bg-[#181924] shadow-lg max-h-48 overflow-y-auto divide-y divide-slate-100 dark:divide-white/[0.06] animate-fade-in">
                    {searchResults.length === 0 ? (
                      <div className="p-3 text-center text-xs text-slate-400">
                        No matching topics found in syllabus
                      </div>
                    ) : (
                      searchResults.map((item) => (
                        <button
                          key={item.topic.id}
                          type="button"
                          onClick={() => handlePickSearchResult(item)}
                          className="w-full text-left p-2.5 hover:bg-violet-50 dark:hover:bg-violet-500/10 transition-colors flex items-center justify-between gap-2 group cursor-pointer"
                        >
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate group-hover:text-violet-600 dark:group-hover:text-violet-400">
                              {item.topic.name}
                            </p>
                            <p className="text-[10px] text-slate-400 truncate">
                              {item.subjectName} › {item.chapterName}
                            </p>
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/[0.08] text-slate-600 dark:text-slate-300 shrink-0">
                            Select
                          </span>
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>

              {/* CURRICULUM SELECTION (Subject -> Chapter -> Topic) */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50/80 dark:bg-[#171823] border border-slate-200/70 dark:border-[#252636] space-y-3">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center justify-between">
                  <span>Target Curriculum Location</span>
                  {currentExam?.name && (
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold lowercase">
                      {currentExam.name}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* SUBJECT SELECTOR */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-violet-500" />
                      <span>Subject</span>
                    </label>
                    <div className="relative">
                      <select
                        value={selectedSubjectId}
                        onChange={(e) => handleSelectSubject(e.target.value)}
                        className="w-full appearance-none pl-3 pr-8 py-2 rounded-xl bg-white dark:bg-[#101117] border border-slate-200 dark:border-[#2A2B3D] text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-violet-500 cursor-pointer shadow-2xs truncate"
                      >
                        {currentExam?.subjects?.map((sub) => (
                          <option key={sub.id} value={sub.id}>
                            {sub.name} ({sub.chapters.length} ch)
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* CHAPTER SELECTOR */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Chapter</span>
                    </label>
                    <div className="relative">
                      <select
                        value={selectedChapterId}
                        onChange={(e) => handleSelectChapter(e.target.value)}
                        disabled={!currentSubject || currentSubject.chapters.length === 0}
                        className="w-full appearance-none pl-3 pr-8 py-2 rounded-xl bg-white dark:bg-[#101117] border border-slate-200 dark:border-[#2A2B3D] text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-violet-500 cursor-pointer shadow-2xs truncate disabled:opacity-50"
                      >
                        {currentSubject?.chapters?.map((ch) => (
                          <option key={ch.id} value={ch.id}>
                            {ch.name} ({ch.topics.length} topics)
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* TOPIC SELECTOR / NEW TOPIC TOGGLE */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Topic</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setIsCreatingNewTopic(!isCreatingNewTopic);
                        if (!isCreatingNewTopic) {
                          setNewTopicName(videoTitle || noteTitle || '');
                        }
                      }}
                      className="text-[11px] font-semibold text-violet-600 dark:text-violet-400 hover:underline cursor-pointer flex items-center gap-1"
                    >
                      {isCreatingNewTopic ? 'Select Existing Topic' : '+ New Topic in this Chapter'}
                    </button>
                  </div>

                  {isCreatingNewTopic ? (
                    <div className="space-y-1 animate-fade-in">
                      <input
                        type="text"
                        value={newTopicName}
                        onChange={(e) => setNewTopicName(e.target.value)}
                        placeholder="Enter new topic name..."
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#101117] border border-violet-400 dark:border-violet-500 text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 shadow-2xs"
                        autoFocus
                      />
                      <p className="text-[10px] text-slate-400">
                        A new topic will be created in <strong>{currentChapter?.name}</strong> with this note attached.
                      </p>
                    </div>
                  ) : (
                    <div className="relative">
                      <select
                        value={selectedTopicId}
                        onChange={(e) => setSelectedTopicId(e.target.value)}
                        disabled={!currentChapter || currentChapter.topics.length === 0}
                        className="w-full appearance-none pl-3 pr-8 py-2 rounded-xl bg-white dark:bg-[#101117] border border-slate-200 dark:border-[#2A2B3D] text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-violet-500 cursor-pointer shadow-2xs truncate disabled:opacity-50"
                      >
                        {currentChapter?.topics && currentChapter.topics.length > 0 ? (
                          currentChapter.topics.map((t) => (
                            <option key={t.id} value={t.id}>
                              {t.name} ({t.noteItems?.length || (t.notes ? 1 : 0)} notes)
                            </option>
                          ))
                        ) : (
                          <option value="">No topics in this chapter (Click &quot;+ New Topic&quot; above)</option>
                        )}
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  )}
                </div>
              </div>

              {/* NOTE TITLE IN TOPIC */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  Note Tab Title in Topic
                </label>
                <input
                  type="text"
                  value={noteCustomTitle}
                  onChange={(e) => setNoteCustomTitle(e.target.value)}
                  placeholder="e.g. YouTube: Complete Revision Notes"
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#101117] border border-slate-200 dark:border-[#2A2B3D] text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-violet-500"
                />
              </div>

              {/* PLACEMENT OPTIONS */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  How to Save Inside Topic:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPlacementMode('new_tab')}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      placementMode === 'new_tab'
                        ? 'border-violet-500 bg-violet-50/70 dark:bg-violet-500/10 text-violet-900 dark:text-violet-200 shadow-2xs ring-1 ring-violet-500/30'
                        : 'border-slate-200 dark:border-[#2A2B3D] bg-white dark:bg-[#101117] text-slate-700 dark:text-slate-300 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs">
                      <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                        placementMode === 'new_tab' ? 'border-violet-600 bg-violet-600 text-white' : 'border-slate-400'
                      }`}>
                        {placementMode === 'new_tab' && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </span>
                      <span>Separate Note Tab</span>
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-violet-200 dark:bg-violet-800/40 text-violet-700 dark:text-violet-300 font-bold ml-auto">
                        Recommended
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 pl-5 leading-tight">
                      Creates a dedicated note page inside the topic, keeping other notes intact.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPlacementMode('append')}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      placementMode === 'append'
                        ? 'border-violet-500 bg-violet-50/70 dark:bg-violet-500/10 text-violet-900 dark:text-violet-200 shadow-2xs ring-1 ring-violet-500/30'
                        : 'border-slate-200 dark:border-[#2A2B3D] bg-white dark:bg-[#101117] text-slate-700 dark:text-slate-300 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs">
                      <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                        placementMode === 'append' ? 'border-violet-600 bg-violet-600 text-white' : 'border-slate-400'
                      }`}>
                        {placementMode === 'append' && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </span>
                      <span>Append to Primary</span>
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 pl-5 leading-tight">
                      Adds text to the end of the topic&apos;s main markdown document.
                    </p>
                  </button>
                </div>
              </div>

              {/* ATTACH VIDEO CHECKBOX */}
              {youtubeUrl && (
                <label className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-[#171823] border border-slate-200/70 dark:border-[#252636] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={attachVideoLecture}
                    onChange={(e) => setAttachVideoLecture(e.target.checked)}
                    className="rounded text-violet-600 focus:ring-violet-500 mt-0.5"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-slate-800 dark:text-slate-200 block">
                      Also link YouTube Video to Topic&apos;s Lectures &amp; Videos
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block leading-tight">
                      Adds the video player link so you can watch while reviewing syllabus topics.
                    </span>
                  </div>
                </label>
              )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        {!successInfo && (
          <div className="px-5 sm:px-6 py-3.5 border-t border-slate-100 dark:border-[#20212E] flex items-center justify-between gap-2 bg-white dark:bg-[#12131A] shrink-0">
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleAttachNote}
              disabled={isSubmitting || (!isCreatingNewTopic && !selectedTopicId) || (isCreatingNewTopic && !newTopicName.trim())}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white text-xs font-bold shadow-sm hover:shadow transition-all cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
            >
              <BookmarkPlus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Attach to Topic</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
