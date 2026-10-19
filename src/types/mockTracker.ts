export type ExamType = 
  | 'SSC CGL' 
  | 'SSC CHSL' 
  | 'SSC CPO' 
  | 'SSC MTS' 
  | 'RRB NTPC' 
  | 'RRB Group D' 
  | 'IBPS PO' 
  | 'IBPS Clerk' 
  | 'SBI PO' 
  | 'SBI Clerk' 
  | 'RRB PO/Clerk' 
  | 'UPSC NDA' 
  | 'UPSC CDS' 
  | 'AFCAT' 
  | 'Custom' 
  | (string & {});

export type ExamTier = 
  | 'Tier 1' 
  | 'Tier 2' 
  | 'Prelims' 
  | 'Mains' 
  | 'CBT 1' 
  | 'CBT 2' 
  | 'Paper 1' 
  | 'Paper 2' 
  | 'Session 1' 
  | 'Session 2' 
  | 'General' 
  | (string & {});

export type NegativeMarkingRatio = '1/4' | '1/3' | '1/2' | 'NONE' | 'CUSTOM';

export interface MarkingSchemeConfig {
  marksPerCorrect: number;
  negativeRatio: NegativeMarkingRatio;
  customNegativeMarks?: number;
}

export type MockTestType = 'FULL_LENGTH' | 'SECTIONAL' | 'CHAPTER_WISE' | 'SUBJECT' | 'PYQ' | 'CUSTOM';

export type SectionName = 
  | 'Quantitative Aptitude'
  | 'General Intelligence & Reasoning'
  | 'English Comprehension'
  | 'General Awareness'
  | 'Computer Knowledge'
  | 'Custom'
  | (string & {});

export interface ChapterDefinition {
  id: string;
  subject: string;
  chapterName: string;
  targetAccuracy: number; // e.g. 85
  subtopics?: string[];
  isCustom?: boolean;
  topicIds?: string[];
  syllabusChapterId?: string;
}

export interface SubjectDefinition {
  id: string;
  name: string;
  icon: string;
  color: string;
  chapters: ChapterDefinition[];
  isCustom?: boolean;
}

export interface ChapterMasterySummary {
  subject: string;
  chapterName: string;
  totalTests: number;
  totalQuestions: number;
  attempted: number;
  correct: number;
  wrong: number;
  avgAccuracy: number;
  avgScore: number;
  avgPaceSeconds: number;
  bestScore: number;
  maxMarks: number;
  masteryStatus: 'Mastered' | 'Strong' | 'Needs Practice' | 'Not Started';
  recentTests: MockTest[];
}

export interface SectionPerformance {
  id: string;
  mockId: string;
  sectionName: SectionName;
  customName?: string;
  totalQuestions: number;
  attempted: number;
  correct: number;
  wrong: number;
  unattempted: number;
  maxMarks: number;
  score: number;
  accuracy: number; // 0 to 100
  timeTakenMinutes: number;
  timeLimitMinutes?: number;
  marksPerCorrect?: number;
  negativeMarksPerWrong?: number;
  cutoffMarks?: number;
  isClearedCutoff?: boolean;
  isQualifying?: boolean;
  status: 'Mastered' | 'Strong' | 'Average' | 'Needs Improvement' | 'Critical';
}

export interface MockTest {
  id: string;
  testName: string;
  exam: ExamType;
  customExamName?: string;
  tier: ExamTier;
  mockType: MockTestType;
  testPlatform: string;
  date: string; // YYYY-MM-DD
  createdAt: number; // timestamp
  totalQuestions: number;
  maxMarks: number;
  totalTimeMinutes: number;
  timeTakenMinutes: number;
  attempted: number;
  correct: number;
  wrong: number;
  unattempted: number;
  score: number;
  negativeMarks: number;
  accuracy: number;
  attemptRate: number;
  percentile: number;
  rank?: number;
  totalStudents?: number;
  cutoffMarks: number;
  isClearedCutoff: boolean;
  subjectName?: SectionName;
  topicFocus?: string;
  chapterName?: string;
  difficulty?: 'Easy' | 'Moderate' | 'Hard' | 'Mixed';
  sections: SectionPerformance[];
  weakAreas: string[];
  analysisNotes?: string;
  isDemo?: boolean;

  // Multi-exam & Marking Extensions
  negativeRatio?: NegativeMarkingRatio;
  marksPerCorrect?: number;
  customNegativeMarks?: number;
  hasSectionalTimers?: boolean;
  typingSpeedWpm?: number;
  typingAccuracy?: number;
  typingKeystrokes?: number;
  descriptiveScore?: number;
  descriptiveMaxMarks?: number;
}

export interface MockFilters {
  search: string;
  exam: ExamType | 'ALL';
  platform?: string | 'ALL';
  subject?: SectionName | 'ALL';
  chapter?: string | 'ALL';
  tier: ExamTier | 'ALL';
  mockType: MockTestType | 'ALL';
  cutoffStatus: 'ALL' | 'CLEARED' | 'NOT_CLEARED';
  dateRange: 'ALL' | '7_DAYS' | '30_DAYS' | '90_DAYS';
  sortBy: 'date' | 'score' | 'percentile' | 'accuracy' | 'time';
  sortOrder: 'asc' | 'desc';
}

export interface AspirantGamification {
  totalXp: number;
  level: number;
  levelTitle: string;
  nextLevelXp: number;
  progressPercent: number;
  streakDays: number;
}
