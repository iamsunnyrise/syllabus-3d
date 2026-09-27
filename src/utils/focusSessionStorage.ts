import { FocusSessionLog, TimerMode } from '../types/timer';

export type { FocusSessionLog };
export const FOCUS_SESSIONS_STORAGE_KEY = 'syllabus3d_focus_sessions_history';

/**
 * Returns date in YYYY-MM-DD using user's local timezone.
 */
export const getLocalDateString = (d: Date = new Date()): string => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Formats ms timestamp to user-friendly local time, e.g. "10:15 AM".
 */
export const formatTimeOfDay = (timestamp: number): string => {
  if (!timestamp) return '--:--';
  const d = new Date(timestamp);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
};

/**
 * Formats YYYY-MM-DD into a human-friendly short label, e.g. "Today", "Yesterday", or "27 Sep".
 */
export const formatDateLabel = (dateStr: string): string => {
  const today = getLocalDateString(new Date());
  if (dateStr === today) return 'Today';

  const yestDate = new Date();
  yestDate.setDate(yestDate.getDate() - 1);
  const yesterday = getLocalDateString(yestDate);
  if (dateStr === yesterday) return 'Yesterday';

  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
  }
  return dateStr;
};

/**
 * Formats YYYY-MM-DD into a full readable date, e.g. "Sunday, September 27, 2026".
 */
export const formatDetailedDate = (dateStr: string): string => {
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    return d.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  }
  return dateStr;
};

/**
 * Formats minutes into human-readable hours and minutes (e.g. "1h 45m" or "25m").
 */
export const formatMinutesToDisplay = (totalMins: number): string => {
  const h = Math.floor(totalMins / 60);
  const m = totalMins % 60;
  return `${h}h ${m < 10 ? '0' : ''}${m}m`;
};

/**
 * Generate initial mock/seed sessions if user doesn't have any saved yet.
 * Uses real syllabus topics from SSC CGL / standard syllabus.
 */
const generateSeedSessions = (): FocusSessionLog[] => {
  const today = getLocalDateString();
  const yestDate = new Date();
  yestDate.setDate(yestDate.getDate() - 1);
  const yesterday = getLocalDateString(yestDate);

  const now = Date.now();
  // 35 minutes ago
  const t1End = now - 15 * 60 * 1000;
  const t1Start = t1End - 25 * 60 * 1000;

  // 3 hours ago
  const t2End = now - 3 * 3600 * 1000;
  const t2Start = t2End - 45 * 60 * 1000;

  // Yesterday morning
  const yestEnd = Date.now() - 26 * 3600 * 1000;
  const yestStart = yestEnd - 50 * 60 * 1000;

  return [
    {
      id: 'session_seed_1',
      date: today,
      startTime: t1Start,
      endTime: t1End,
      formattedStartTime: formatTimeOfDay(t1Start),
      formattedEndTime: formatTimeOfDay(t1End),
      durationMinutes: 25,
      durationSeconds: 25 * 60,
      mode: 'pomodoro',
      topicId: 'top_qa_percentage_1',
      topicName: 'Percentage & Fractional Values',
      chapterName: 'Percentages & Applications',
      subjectName: 'Quantitative Aptitude',
      subjectColor: '#3B82F6',
      status: 'completed',
      loopsCompleted: 1
    },
    {
      id: 'session_seed_2',
      date: today,
      startTime: t2Start,
      endTime: t2End,
      formattedStartTime: formatTimeOfDay(t2Start),
      formattedEndTime: formatTimeOfDay(t2End),
      durationMinutes: 45,
      durationSeconds: 45 * 60,
      mode: 'timer',
      topicId: 'top_ga_mod_hist_1',
      topicName: 'Revolt of 1857 & Freedom Movement',
      chapterName: 'Modern Indian History',
      subjectName: 'General Awareness',
      subjectColor: '#10B981',
      status: 'completed',
      loopsCompleted: 1
    },
    {
      id: 'session_seed_3',
      date: yesterday,
      startTime: yestStart,
      endTime: yestEnd,
      formattedStartTime: formatTimeOfDay(yestStart),
      formattedEndTime: formatTimeOfDay(yestEnd),
      durationMinutes: 50,
      durationSeconds: 50 * 60,
      mode: 'stopwatch',
      topicId: 'top_eng_gram_rules',
      topicName: 'Subject-Verb Agreement Rules',
      chapterName: 'Grammar Mastery',
      subjectName: 'English Comprehension',
      subjectColor: '#8B5CF6',
      status: 'completed',
      loopsCompleted: 2
    }
  ];
};

/**
 * Retrieve all focus session logs safely from localStorage.
 */
export const getFocusSessionLogs = (): FocusSessionLog[] => {
  try {
    const raw = localStorage.getItem(FOCUS_SESSIONS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.sort((a, b) => b.startTime - a.startTime);
      }
    }
    // Initialize with seeds if completely new
    const seeds = generateSeedSessions();
    localStorage.setItem(FOCUS_SESSIONS_STORAGE_KEY, JSON.stringify(seeds));
    return seeds;
  } catch (e) {
    console.warn('Failed to load focus session logs:', e);
    return [];
  }
};

/**
 * Persist or append a new focus session log.
 */
export const saveFocusSessionLog = (
  entry: Omit<FocusSessionLog, 'id'> | FocusSessionLog
): FocusSessionLog => {
  try {
    const current = getFocusSessionLogs();
    const id = 'id' in entry && entry.id ? entry.id : `session_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const fullLog: FocusSessionLog = {
      ...entry,
      id
    };

    const updated = [fullLog, ...current.filter(item => item.id !== id)].sort((a, b) => b.startTime - a.startTime);
    localStorage.setItem(FOCUS_SESSIONS_STORAGE_KEY, JSON.stringify(updated));

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('syllabus3d_focus_session_logged'));
    }

    return fullLog;
  } catch (e) {
    console.error('Failed to save focus session log:', e);
    return entry as FocusSessionLog;
  }
};

/**
 * Delete a specific focus session log by ID.
 */
export const deleteFocusSessionLog = (id: string): void => {
  try {
    const current = getFocusSessionLogs();
    const updated = current.filter(s => s.id !== id);
    localStorage.setItem(FOCUS_SESSIONS_STORAGE_KEY, JSON.stringify(updated));

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('syllabus3d_focus_session_logged'));
    }
  } catch (e) {
    console.error('Failed to delete focus session log:', e);
  }
};

/**
 * Clear all focus session logs.
 */
export const clearAllFocusSessionLogs = (): void => {
  try {
    localStorage.setItem(FOCUS_SESSIONS_STORAGE_KEY, JSON.stringify([]));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('syllabus3d_focus_session_logged'));
    }
  } catch (e) {
    console.error('Failed to clear focus session logs:', e);
  }
};

export interface SessionFilterOptions {
  dateFilter?: 'today' | 'yesterday' | 'week' | 'month' | 'all' | string;
  subjectName?: string;
  searchQuery?: string;
}

/**
 * Filter sessions by date range, specific date, subject, or search term.
 */
export const filterFocusSessions = (
  logs: FocusSessionLog[],
  options: SessionFilterOptions
): FocusSessionLog[] => {
  const { dateFilter = 'today', subjectName, searchQuery } = options;
  const today = getLocalDateString(new Date());

  const yestDate = new Date();
  yestDate.setDate(yestDate.getDate() - 1);
  const yesterday = getLocalDateString(yestDate);

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const sevenDaysAgoStr = getLocalDateString(sevenDaysAgo);

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const thirtyDaysAgoStr = getLocalDateString(thirtyDaysAgo);

  return logs.filter(log => {
    // 1. Date filter
    if (dateFilter === 'today') {
      if (log.date !== today) return false;
    } else if (dateFilter === 'yesterday') {
      if (log.date !== yesterday) return false;
    } else if (dateFilter === 'week') {
      if (log.date < sevenDaysAgoStr) return false;
    } else if (dateFilter === 'month') {
      if (log.date < thirtyDaysAgoStr) return false;
    } else if (dateFilter !== 'all') {
      // Specific date string matching (YYYY-MM-DD)
      if (log.date !== dateFilter) return false;
    }

    // 2. Subject filter
    if (subjectName && subjectName !== 'All') {
      if (log.subjectName !== subjectName) return false;
    }

    // 3. Search query (topic name, chapter name, or notes)
    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTopic = log.topicName?.toLowerCase().includes(q);
      const matchChap = log.chapterName?.toLowerCase().includes(q);
      const matchSubj = log.subjectName?.toLowerCase().includes(q);
      const matchNotes = log.notes?.toLowerCase().includes(q);
      if (!matchTopic && !matchChap && !matchSubj && !matchNotes) return false;
    }

    return true;
  });
};

export interface SessionStatsSummary {
  totalMinutes: number;
  formattedTotalTime: string;
  sessionsCount: number;
  completedCount: number;
  focusRate: string;
  uniqueTopicsCount: number;
  dailyGoal: string;
  subjectBreakdown: Array<{
    subjectName: string;
    subjectColor: string;
    minutes: number;
    sessionsCount: number;
    percentage: number;
  }>;
}

/**
 * Calculate full statistical metrics for a set of sessions.
 */
export const calculateSessionStats = (
  logs: FocusSessionLog[],
  dailyGoalHours: number = 3
): SessionStatsSummary => {
  const totalMinutes = logs.reduce((acc, curr) => acc + (curr.durationMinutes || 0), 0);
  const sessionsCount = logs.length;
  const completedCount = logs.filter(s => s.status === 'completed').length;

  const focusRate = sessionsCount > 0
    ? `${Math.round((completedCount / sessionsCount) * 100)}%`
    : '0%';

  const uniqueTopics = new Set<string>();
  logs.forEach(s => {
    if (s.topicId) uniqueTopics.add(s.topicId);
    else if (s.topicName) uniqueTopics.add(s.topicName);
  });

  // Subject breakdown
  const subjMap: Record<string, { minutes: number; count: number; color: string }> = {};
  logs.forEach(s => {
    const subj = s.subjectName || 'General Focus';
    const color = s.subjectColor || '#3B82F6';
    if (!subjMap[subj]) {
      subjMap[subj] = { minutes: 0, count: 0, color };
    }
    subjMap[subj].minutes += s.durationMinutes || 0;
    subjMap[subj].count += 1;
  });

  const subjectBreakdown = Object.entries(subjMap).map(([subjectName, data]) => ({
    subjectName,
    subjectColor: data.color,
    minutes: data.minutes,
    sessionsCount: data.count,
    percentage: totalMinutes > 0 ? Math.round((data.minutes / totalMinutes) * 100) : 0
  })).sort((a, b) => b.minutes - a.minutes);

  return {
    totalMinutes,
    formattedTotalTime: formatMinutesToDisplay(totalMinutes),
    sessionsCount,
    completedCount,
    focusRate,
    uniqueTopicsCount: uniqueTopics.size,
    dailyGoal: `${dailyGoalHours}h 00m`,
    subjectBreakdown
  };
};

/**
 * Group sessions chronologically by date.
 */
export const groupSessionsByDate = (logs: FocusSessionLog[]) => {
  const groups: Record<string, FocusSessionLog[]> = {};

  logs.forEach(log => {
    if (!groups[log.date]) {
      groups[log.date] = [];
    }
    groups[log.date].push(log);
  });

  return Object.keys(groups)
    .sort((a, b) => (b > a ? 1 : -1))
    .map(date => {
      const dayLogs = groups[date].sort((a, b) => b.startTime - a.startTime);
      const totalMinutes = dayLogs.reduce((acc, curr) => acc + (curr.durationMinutes || 0), 0);
      return {
        date,
        dateLabel: formatDateLabel(date),
        detailedDate: formatDetailedDate(date),
        totalMinutes,
        logs: dayLogs
      };
    });
};

/**
 * Export sessions as a downloadable CSV file.
 */
export const exportFocusSessionsCSV = (logs: FocusSessionLog[], filename = 'focus_sessions_history.csv'): void => {
  if (logs.length === 0) return;

  const headers = [
    'Date',
    'Start Time',
    'End Time',
    'Duration (Minutes)',
    'Timer Mode',
    'Subject',
    'Chapter',
    'Topic',
    'Status',
    'Notes'
  ];

  const escapeCSV = (val: string | number | undefined) => {
    if (val === undefined || val === null) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = logs.map(s => [
    escapeCSV(s.date),
    escapeCSV(s.formattedStartTime),
    escapeCSV(s.formattedEndTime),
    escapeCSV(s.durationMinutes),
    escapeCSV(s.mode),
    escapeCSV(s.subjectName || 'General Focus'),
    escapeCSV(s.chapterName || 'General Chapter'),
    escapeCSV(s.topicName || 'General Topic'),
    escapeCSV(s.status),
    escapeCSV(s.notes || '')
  ].join(','));

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
