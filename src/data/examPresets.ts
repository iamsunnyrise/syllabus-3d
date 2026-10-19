import { ExamType, ExamTier, SectionName, NegativeMarkingRatio } from '../types/mockTracker';

export interface SectionPreset {
  sectionName: SectionName;
  customName?: string;
  totalQuestions: number;
  maxMarks: number;
  marksPerCorrect: number;
  negativeMarksPerWrong: number;
  timeLimitMinutes?: number;
  cutoffMarks?: number;
  isQualifying?: boolean;
}

export interface ExamTierPreset {
  tier: ExamTier;
  tierLabel: string;
  totalQuestions: number;
  maxMarks: number;
  totalTimeMinutes: number;
  negativeRatio: NegativeMarkingRatio;
  marksPerCorrect: number;
  negativeMarksPerWrong: number;
  customNegativeMarks?: number;
  hasSectionalTimers?: boolean;
  hasDescriptive?: boolean;
  hasTypingTest?: boolean;
  sections: SectionPreset[];
  description?: string;
  badge?: string;
}

export interface ExamPreset {
  id: string;
  exam: ExamType;
  category: 'SSC' | 'Banking' | 'Railways' | 'Defence' | 'Custom';
  title: string;
  icon: string;
  popularPlatforms: string[];
  tiers: ExamTierPreset[];
}

export const EXAM_PRESETS: ExamPreset[] = [
  // -------------------------------------------------------------
  // 1. SSC CGL
  // -------------------------------------------------------------
  {
    id: 'ssc-cgl',
    exam: 'SSC CGL',
    category: 'SSC',
    title: 'SSC CGL (Combined Graduate Level)',
    icon: '🏛️',
    popularPlatforms: ['Testbook', 'Oliveboard', 'RBE (Shubham Sir)', 'SuperCoaching', 'Parcham Classes'],
    tiers: [
      {
        tier: 'Tier 1',
        tierLabel: 'Tier 1 (Prelims Qualifying)',
        totalQuestions: 100,
        maxMarks: 200,
        totalTimeMinutes: 60,
        marksPerCorrect: 2.0,
        negativeRatio: '1/4',
        negativeMarksPerWrong: 0.50,
        hasSectionalTimers: false,
        badge: '100 Qs • 200 M • 60m • -0.50',
        description: '4 Sections (25 Qs each), 60 mins composite time. +2 for correct, -0.50 for wrong.',
        sections: [
          { sectionName: 'General Intelligence & Reasoning', totalQuestions: 25, maxMarks: 50, marksPerCorrect: 2, negativeMarksPerWrong: 0.5, timeLimitMinutes: 15 },
          { sectionName: 'General Awareness', totalQuestions: 25, maxMarks: 50, marksPerCorrect: 2, negativeMarksPerWrong: 0.5, timeLimitMinutes: 7 },
          { sectionName: 'Quantitative Aptitude', totalQuestions: 25, maxMarks: 50, marksPerCorrect: 2, negativeMarksPerWrong: 0.5, timeLimitMinutes: 25 },
          { sectionName: 'English Comprehension', totalQuestions: 25, maxMarks: 50, marksPerCorrect: 2, negativeMarksPerWrong: 0.5, timeLimitMinutes: 13 }
        ]
      },
      {
        tier: 'Tier 2',
        tierLabel: 'Tier 2 (Mains Final Merit)',
        totalQuestions: 150,
        maxMarks: 450,
        totalTimeMinutes: 135,
        marksPerCorrect: 3.0,
        negativeRatio: '1/3',
        negativeMarksPerWrong: 1.00,
        hasSectionalTimers: true,
        hasTypingTest: true,
        badge: '150 Qs • 390 Merit + 60 Qual • 135m',
        description: 'Paper 1: Section 1 (Math+Reasoning 180M), Section 2 (English+GA 210M), Section 3 (Computer 60M Qualifying) + DEST Typing.',
        sections: [
          { sectionName: 'Quantitative Aptitude', customName: 'Sec 1: Mathematical Abilities', totalQuestions: 30, maxMarks: 90, marksPerCorrect: 3, negativeMarksPerWrong: 1.0, timeLimitMinutes: 30 },
          { sectionName: 'General Intelligence & Reasoning', customName: 'Sec 1: Reasoning & General Intelligence', totalQuestions: 30, maxMarks: 90, marksPerCorrect: 3, negativeMarksPerWrong: 1.0, timeLimitMinutes: 30 },
          { sectionName: 'English Comprehension', customName: 'Sec 2: English Language & Comprehension', totalQuestions: 45, maxMarks: 135, marksPerCorrect: 3, negativeMarksPerWrong: 1.0, timeLimitMinutes: 35 },
          { sectionName: 'General Awareness', customName: 'Sec 2: General Awareness', totalQuestions: 25, maxMarks: 75, marksPerCorrect: 3, negativeMarksPerWrong: 1.0, timeLimitMinutes: 25 },
          { sectionName: 'Computer Knowledge', customName: 'Sec 3: Computer Knowledge (Qualifying)', totalQuestions: 20, maxMarks: 60, marksPerCorrect: 3, negativeMarksPerWrong: 1.0, timeLimitMinutes: 15, isQualifying: true, cutoffMarks: 18 }
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // 2. SSC CHSL
  // -------------------------------------------------------------
  {
    id: 'ssc-chsl',
    exam: 'SSC CHSL',
    category: 'SSC',
    title: 'SSC CHSL (10+2 Level)',
    icon: '📑',
    popularPlatforms: ['Testbook', 'Oliveboard', 'Adda247', 'Careerwill'],
    tiers: [
      {
        tier: 'Tier 1',
        tierLabel: 'Tier 1 (Prelims Qualifying)',
        totalQuestions: 100,
        maxMarks: 200,
        totalTimeMinutes: 60,
        marksPerCorrect: 2.0,
        negativeRatio: '1/4',
        negativeMarksPerWrong: 0.50,
        badge: '100 Qs • 200 M • 60m • -0.50',
        sections: [
          { sectionName: 'General Intelligence & Reasoning', totalQuestions: 25, maxMarks: 50, marksPerCorrect: 2, negativeMarksPerWrong: 0.5, timeLimitMinutes: 15 },
          { sectionName: 'General Awareness', totalQuestions: 25, maxMarks: 50, marksPerCorrect: 2, negativeMarksPerWrong: 0.5, timeLimitMinutes: 7 },
          { sectionName: 'Quantitative Aptitude', totalQuestions: 25, maxMarks: 50, marksPerCorrect: 2, negativeMarksPerWrong: 0.5, timeLimitMinutes: 25 },
          { sectionName: 'English Comprehension', totalQuestions: 25, maxMarks: 50, marksPerCorrect: 2, negativeMarksPerWrong: 0.5, timeLimitMinutes: 13 }
        ]
      },
      {
        tier: 'Tier 2',
        tierLabel: 'Tier 2 (Mains Final Merit)',
        totalQuestions: 135,
        maxMarks: 405,
        totalTimeMinutes: 135,
        marksPerCorrect: 3.0,
        negativeRatio: '1/3',
        negativeMarksPerWrong: 1.00,
        hasTypingTest: true,
        badge: '135 Qs • 360 Merit + 45 Qual',
        sections: [
          { sectionName: 'Quantitative Aptitude', customName: 'Sec 1: Mathematical Abilities', totalQuestions: 30, maxMarks: 90, marksPerCorrect: 3, negativeMarksPerWrong: 1.0, timeLimitMinutes: 30 },
          { sectionName: 'General Intelligence & Reasoning', customName: 'Sec 1: Reasoning & GI', totalQuestions: 30, maxMarks: 90, marksPerCorrect: 3, negativeMarksPerWrong: 1.0, timeLimitMinutes: 30 },
          { sectionName: 'English Comprehension', customName: 'Sec 2: English Language', totalQuestions: 40, maxMarks: 120, marksPerCorrect: 3, negativeMarksPerWrong: 1.0, timeLimitMinutes: 35 },
          { sectionName: 'General Awareness', customName: 'Sec 2: General Awareness', totalQuestions: 20, maxMarks: 60, marksPerCorrect: 3, negativeMarksPerWrong: 1.0, timeLimitMinutes: 25 },
          { sectionName: 'Computer Knowledge', customName: 'Sec 3: Computer Knowledge (Qualifying)', totalQuestions: 15, maxMarks: 45, marksPerCorrect: 3, negativeMarksPerWrong: 1.0, timeLimitMinutes: 15, isQualifying: true, cutoffMarks: 14 }
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // 3. SSC CPO
  // -------------------------------------------------------------
  {
    id: 'ssc-cpo',
    exam: 'SSC CPO',
    category: 'SSC',
    title: 'SSC CPO (Sub-Inspector SI in DP/CAPF)',
    icon: '👮',
    popularPlatforms: ['Testbook', 'Oliveboard', 'Adda247'],
    tiers: [
      {
        tier: 'Paper 1',
        tierLabel: 'Paper 1 (Computer Based Exam)',
        totalQuestions: 200,
        maxMarks: 200,
        totalTimeMinutes: 120,
        marksPerCorrect: 1.0,
        negativeRatio: '1/4',
        negativeMarksPerWrong: 0.25,
        badge: '200 Qs • 200 M • 120m • -0.25',
        sections: [
          { sectionName: 'General Intelligence & Reasoning', totalQuestions: 50, maxMarks: 50, marksPerCorrect: 1, negativeMarksPerWrong: 0.25, timeLimitMinutes: 35 },
          { sectionName: 'General Awareness', totalQuestions: 50, maxMarks: 50, marksPerCorrect: 1, negativeMarksPerWrong: 0.25, timeLimitMinutes: 15 },
          { sectionName: 'Quantitative Aptitude', totalQuestions: 50, maxMarks: 50, marksPerCorrect: 1, negativeMarksPerWrong: 0.25, timeLimitMinutes: 45 },
          { sectionName: 'English Comprehension', totalQuestions: 50, maxMarks: 50, marksPerCorrect: 1, negativeMarksPerWrong: 0.25, timeLimitMinutes: 25 }
        ]
      },
      {
        tier: 'Paper 2',
        tierLabel: 'Paper 2 (English Language & Comprehension)',
        totalQuestions: 200,
        maxMarks: 200,
        totalTimeMinutes: 120,
        marksPerCorrect: 1.0,
        negativeRatio: '1/4',
        negativeMarksPerWrong: 0.25,
        badge: '200 Qs • 200 M • 120m English Only',
        sections: [
          { sectionName: 'English Comprehension', customName: 'English Language & Comprehension Complete', totalQuestions: 200, maxMarks: 200, marksPerCorrect: 1, negativeMarksPerWrong: 0.25, timeLimitMinutes: 120 }
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // 4. SSC MTS
  // -------------------------------------------------------------
  {
    id: 'ssc-mts',
    exam: 'SSC MTS',
    category: 'SSC',
    title: 'SSC MTS & Havaldar',
    icon: '📝',
    popularPlatforms: ['Testbook', 'Adda247', 'Careerwill'],
    tiers: [
      {
        tier: 'Session 1',
        tierLabel: 'Session 1 (Math & Reasoning - Qualifying)',
        totalQuestions: 40,
        maxMarks: 120,
        totalTimeMinutes: 45,
        marksPerCorrect: 3.0,
        negativeRatio: 'NONE',
        negativeMarksPerWrong: 0.0,
        badge: '40 Qs • 120 M • No Negative',
        description: 'Qualifying only. Numerical Math (20 Qs) + Reasoning (20 Qs). No negative marking.',
        sections: [
          { sectionName: 'Quantitative Aptitude', customName: 'Numerical and Mathematical Ability', totalQuestions: 20, maxMarks: 60, marksPerCorrect: 3, negativeMarksPerWrong: 0, timeLimitMinutes: 25 },
          { sectionName: 'General Intelligence & Reasoning', customName: 'Reasoning Ability & Problem Solving', totalQuestions: 20, maxMarks: 60, marksPerCorrect: 3, negativeMarksPerWrong: 0, timeLimitMinutes: 20 }
        ]
      },
      {
        tier: 'Session 2',
        tierLabel: 'Session 2 (General Awareness & English - Merit)',
        totalQuestions: 50,
        maxMarks: 150,
        totalTimeMinutes: 45,
        marksPerCorrect: 3.0,
        negativeRatio: '1/3',
        negativeMarksPerWrong: 1.0,
        badge: '50 Qs • 150 M • -1.00 Negative (Merit)',
        description: 'Decides final merit list! General Awareness (25 Qs) + English (25 Qs). -1 mark per wrong answer.',
        sections: [
          { sectionName: 'General Awareness', totalQuestions: 25, maxMarks: 75, marksPerCorrect: 3, negativeMarksPerWrong: 1.0, timeLimitMinutes: 20 },
          { sectionName: 'English Comprehension', totalQuestions: 25, maxMarks: 75, marksPerCorrect: 3, negativeMarksPerWrong: 1.0, timeLimitMinutes: 25 }
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // 5. BANKING: SBI PO / IBPS PO
  // -------------------------------------------------------------
  {
    id: 'sbi-po',
    exam: 'SBI PO',
    category: 'Banking',
    title: 'SBI PO / IBPS PO',
    icon: '🏦',
    popularPlatforms: ['Oliveboard', 'PracticeMock', 'Guidely', 'Testbook', 'Adda247'],
    tiers: [
      {
        tier: 'Prelims',
        tierLabel: 'Prelims (Sectional Timing 20m Each)',
        totalQuestions: 100,
        maxMarks: 100,
        totalTimeMinutes: 60,
        marksPerCorrect: 1.0,
        negativeRatio: '1/4',
        negativeMarksPerWrong: 0.25,
        hasSectionalTimers: true,
        badge: '100 Qs • 100 M • 20m Sectional Timers',
        description: 'English (30 Qs / 20m), Quant (35 Qs / 20m), Reasoning (35 Qs / 20m). Strict Sectional Timers & Cutoffs.',
        sections: [
          { sectionName: 'English Comprehension', customName: 'English Language', totalQuestions: 30, maxMarks: 30, marksPerCorrect: 1, negativeMarksPerWrong: 0.25, timeLimitMinutes: 20, cutoffMarks: 9.5 },
          { sectionName: 'Quantitative Aptitude', customName: 'Quantitative Aptitude', totalQuestions: 35, maxMarks: 35, marksPerCorrect: 1, negativeMarksPerWrong: 0.25, timeLimitMinutes: 20, cutoffMarks: 10.0 },
          { sectionName: 'General Intelligence & Reasoning', customName: 'Reasoning Ability', totalQuestions: 35, maxMarks: 35, marksPerCorrect: 1, negativeMarksPerWrong: 0.25, timeLimitMinutes: 20, cutoffMarks: 11.0 }
        ]
      },
      {
        tier: 'Mains',
        tierLabel: 'Mains (Objective + Descriptive)',
        totalQuestions: 155,
        maxMarks: 200,
        totalTimeMinutes: 180,
        marksPerCorrect: 1.29,
        negativeRatio: '1/4',
        negativeMarksPerWrong: 0.32,
        hasSectionalTimers: true,
        hasDescriptive: true,
        badge: '155 Qs • 200 M + 25 M Descriptive • 180m',
        description: 'Reasoning & Computer (50M, 50m), Data Analysis (50M, 45m), General/Banking GA (60M, 45m), English (40M, 40m) + Letter/Essay (25M).',
        sections: [
          { sectionName: 'General Intelligence & Reasoning', customName: 'Reasoning & Computer Aptitude', totalQuestions: 40, maxMarks: 50, marksPerCorrect: 1.25, negativeMarksPerWrong: 0.31, timeLimitMinutes: 50 },
          { sectionName: 'Quantitative Aptitude', customName: 'Data Analysis & Interpretation', totalQuestions: 30, maxMarks: 50, marksPerCorrect: 1.66, negativeMarksPerWrong: 0.41, timeLimitMinutes: 45 },
          { sectionName: 'General Awareness', customName: 'General / Economy / Banking Awareness', totalQuestions: 50, maxMarks: 60, marksPerCorrect: 1.2, negativeMarksPerWrong: 0.30, timeLimitMinutes: 45 },
          { sectionName: 'English Comprehension', customName: 'English Language (Mains)', totalQuestions: 35, maxMarks: 40, marksPerCorrect: 1.14, negativeMarksPerWrong: 0.28, timeLimitMinutes: 40 }
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // 6. BANKING: SBI Clerk / IBPS Clerk
  // -------------------------------------------------------------
  {
    id: 'sbi-clerk',
    exam: 'SBI Clerk',
    category: 'Banking',
    title: 'SBI Clerk / IBPS Clerk',
    icon: '💳',
    popularPlatforms: ['PracticeMock', 'Oliveboard', 'Guidely', 'Testbook'],
    tiers: [
      {
        tier: 'Prelims',
        tierLabel: 'Prelims (Sectional Timing 20m Each)',
        totalQuestions: 100,
        maxMarks: 100,
        totalTimeMinutes: 60,
        marksPerCorrect: 1.0,
        negativeRatio: '1/4',
        negativeMarksPerWrong: 0.25,
        hasSectionalTimers: true,
        badge: '100 Qs • 100 M • 20m Sectional',
        sections: [
          { sectionName: 'English Comprehension', customName: 'English Language', totalQuestions: 30, maxMarks: 30, marksPerCorrect: 1, negativeMarksPerWrong: 0.25, timeLimitMinutes: 20 },
          { sectionName: 'Quantitative Aptitude', customName: 'Numerical Ability', totalQuestions: 35, maxMarks: 35, marksPerCorrect: 1, negativeMarksPerWrong: 0.25, timeLimitMinutes: 20 },
          { sectionName: 'General Intelligence & Reasoning', customName: 'Reasoning Ability', totalQuestions: 35, maxMarks: 35, marksPerCorrect: 1, negativeMarksPerWrong: 0.25, timeLimitMinutes: 20 }
        ]
      },
      {
        tier: 'Mains',
        tierLabel: 'Mains (Final Selection)',
        totalQuestions: 190,
        maxMarks: 200,
        totalTimeMinutes: 160,
        marksPerCorrect: 1.05,
        negativeRatio: '1/4',
        negativeMarksPerWrong: 0.26,
        hasSectionalTimers: true,
        badge: '190 Qs • 200 M • 160m',
        sections: [
          { sectionName: 'General Awareness', customName: 'General / Financial Awareness', totalQuestions: 50, maxMarks: 50, marksPerCorrect: 1, negativeMarksPerWrong: 0.25, timeLimitMinutes: 35 },
          { sectionName: 'English Comprehension', customName: 'General English', totalQuestions: 40, maxMarks: 40, marksPerCorrect: 1, negativeMarksPerWrong: 0.25, timeLimitMinutes: 35 },
          { sectionName: 'Quantitative Aptitude', customName: 'Quantitative Aptitude', totalQuestions: 50, maxMarks: 50, marksPerCorrect: 1, negativeMarksPerWrong: 0.25, timeLimitMinutes: 45 },
          { sectionName: 'General Intelligence & Reasoning', customName: 'Reasoning Ability & Computer Aptitude', totalQuestions: 50, maxMarks: 60, marksPerCorrect: 1.2, negativeMarksPerWrong: 0.3, timeLimitMinutes: 45 }
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // 7. BANKING: IBPS RRB PO / Clerk (Gramin Bank)
  // -------------------------------------------------------------
  {
    id: 'rrb-bank',
    exam: 'RRB PO/Clerk',
    category: 'Banking',
    title: 'IBPS RRB Officer & Office Assistant',
    icon: '🌾',
    popularPlatforms: ['PracticeMock', 'Oliveboard', 'Guidely', 'Testbook'],
    tiers: [
      {
        tier: 'Prelims',
        tierLabel: 'Prelims (Only 2 Sections: Reasoning + Quant)',
        totalQuestions: 80,
        maxMarks: 80,
        totalTimeMinutes: 45,
        marksPerCorrect: 1.0,
        negativeRatio: '1/4',
        negativeMarksPerWrong: 0.25,
        badge: '80 Qs • 80 M • 45m Composite',
        description: 'No English/Hindi in Prelims! Reasoning (40 Qs) + Quantitative Aptitude (40 Qs). 45 min combined.',
        sections: [
          { sectionName: 'General Intelligence & Reasoning', customName: 'Reasoning', totalQuestions: 40, maxMarks: 40, marksPerCorrect: 1, negativeMarksPerWrong: 0.25, timeLimitMinutes: 22 },
          { sectionName: 'Quantitative Aptitude', customName: 'Quantitative Aptitude', totalQuestions: 40, maxMarks: 40, marksPerCorrect: 1, negativeMarksPerWrong: 0.25, timeLimitMinutes: 23 }
        ]
      },
      {
        tier: 'Mains',
        tierLabel: 'Mains Exam',
        totalQuestions: 200,
        maxMarks: 200,
        totalTimeMinutes: 120,
        marksPerCorrect: 1.0,
        negativeRatio: '1/4',
        negativeMarksPerWrong: 0.25,
        badge: '200 Qs • 200 M • 120m',
        sections: [
          { sectionName: 'General Intelligence & Reasoning', totalQuestions: 40, maxMarks: 50, marksPerCorrect: 1.25, negativeMarksPerWrong: 0.31, timeLimitMinutes: 30 },
          { sectionName: 'Computer Knowledge', totalQuestions: 40, maxMarks: 20, marksPerCorrect: 0.5, negativeMarksPerWrong: 0.125, timeLimitMinutes: 15 },
          { sectionName: 'General Awareness', totalQuestions: 40, maxMarks: 40, marksPerCorrect: 1, negativeMarksPerWrong: 0.25, timeLimitMinutes: 20 },
          { sectionName: 'English Comprehension', customName: 'English or Hindi Language', totalQuestions: 40, maxMarks: 40, marksPerCorrect: 1, negativeMarksPerWrong: 0.25, timeLimitMinutes: 25 },
          { sectionName: 'Quantitative Aptitude', totalQuestions: 40, maxMarks: 50, marksPerCorrect: 1.25, negativeMarksPerWrong: 0.31, timeLimitMinutes: 30 }
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // 8. RAILWAYS: RRB NTPC
  // -------------------------------------------------------------
  {
    id: 'rrb-ntpc',
    exam: 'RRB NTPC',
    category: 'Railways',
    title: 'RRB NTPC (Non-Technical Popular Categories)',
    icon: '🚆',
    popularPlatforms: ['Testbook', 'Oliveboard', 'Adda247', 'Careerwill'],
    tiers: [
      {
        tier: 'CBT 1',
        tierLabel: 'CBT 1 (Screening Test)',
        totalQuestions: 100,
        maxMarks: 100,
        totalTimeMinutes: 90,
        marksPerCorrect: 1.0,
        negativeRatio: '1/3',
        negativeMarksPerWrong: 0.333,
        badge: '100 Qs • 100 M • 90m • -1/3rd',
        description: 'GA (40 Qs), Mathematics (30 Qs), Reasoning (30 Qs). -1/3 negative marking. 90 minutes composite.',
        sections: [
          { sectionName: 'General Awareness', totalQuestions: 40, maxMarks: 40, marksPerCorrect: 1, negativeMarksPerWrong: 0.333, timeLimitMinutes: 25 },
          { sectionName: 'Quantitative Aptitude', customName: 'Mathematics', totalQuestions: 30, maxMarks: 30, marksPerCorrect: 1, negativeMarksPerWrong: 0.333, timeLimitMinutes: 35 },
          { sectionName: 'General Intelligence & Reasoning', customName: 'General Intelligence & Reasoning', totalQuestions: 30, maxMarks: 30, marksPerCorrect: 1, negativeMarksPerWrong: 0.333, timeLimitMinutes: 30 }
        ]
      },
      {
        tier: 'CBT 2',
        tierLabel: 'CBT 2 (Final Merit Test)',
        totalQuestions: 120,
        maxMarks: 120,
        totalTimeMinutes: 90,
        marksPerCorrect: 1.0,
        negativeRatio: '1/3',
        negativeMarksPerWrong: 0.333,
        badge: '120 Qs • 120 M • 90m • -1/3rd',
        description: 'GA (50 Qs), Mathematics (35 Qs), Reasoning (35 Qs). 120 questions in 90 minutes.',
        sections: [
          { sectionName: 'General Awareness', totalQuestions: 50, maxMarks: 50, marksPerCorrect: 1, negativeMarksPerWrong: 0.333, timeLimitMinutes: 25 },
          { sectionName: 'Quantitative Aptitude', customName: 'Mathematics', totalQuestions: 35, maxMarks: 35, marksPerCorrect: 1, negativeMarksPerWrong: 0.333, timeLimitMinutes: 35 },
          { sectionName: 'General Intelligence & Reasoning', customName: 'General Intelligence & Reasoning', totalQuestions: 35, maxMarks: 35, marksPerCorrect: 1, negativeMarksPerWrong: 0.333, timeLimitMinutes: 30 }
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // 9. RAILWAYS: RRB Group D
  // -------------------------------------------------------------
  {
    id: 'rrb-group-d',
    exam: 'RRB Group D',
    category: 'Railways',
    title: 'RRB Group D (RRC Level 1)',
    icon: '🚂',
    popularPlatforms: ['Testbook', 'Adda247', 'Careerwill'],
    tiers: [
      {
        tier: 'CBT 1',
        tierLabel: 'CBT Written Exam',
        totalQuestions: 100,
        maxMarks: 100,
        totalTimeMinutes: 90,
        marksPerCorrect: 1.0,
        negativeRatio: '1/3',
        negativeMarksPerWrong: 0.333,
        badge: '100 Qs • 100 M • 90m • -1/3rd',
        sections: [
          { sectionName: 'General Awareness', customName: 'General Science', totalQuestions: 25, maxMarks: 25, marksPerCorrect: 1, negativeMarksPerWrong: 0.333, timeLimitMinutes: 20 },
          { sectionName: 'Quantitative Aptitude', customName: 'Mathematics', totalQuestions: 25, maxMarks: 25, marksPerCorrect: 1, negativeMarksPerWrong: 0.333, timeLimitMinutes: 30 },
          { sectionName: 'General Intelligence & Reasoning', customName: 'General Intelligence and Reasoning', totalQuestions: 30, maxMarks: 30, marksPerCorrect: 1, negativeMarksPerWrong: 0.333, timeLimitMinutes: 25 },
          { sectionName: 'General Awareness', customName: 'General Awareness and Current Affairs', totalQuestions: 20, maxMarks: 20, marksPerCorrect: 1, negativeMarksPerWrong: 0.333, timeLimitMinutes: 15 }
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // 10. DEFENCE: UPSC NDA
  // -------------------------------------------------------------
  {
    id: 'upsc-nda',
    exam: 'UPSC NDA',
    category: 'Defence',
    title: 'UPSC NDA & NA Examination',
    icon: '⚔️',
    popularPlatforms: ['Testbook', 'Oliveboard', 'Unacademy', 'SSBCrackExams'],
    tiers: [
      {
        tier: 'Paper 1',
        tierLabel: 'Paper 1 - Mathematics',
        totalQuestions: 120,
        maxMarks: 300,
        totalTimeMinutes: 150,
        marksPerCorrect: 2.5,
        negativeRatio: '1/3',
        negativeMarksPerWrong: 0.833,
        badge: '120 Qs • 300 M • +2.5 / -0.833 • 2.5 hrs',
        description: 'Pure 11th & 12th Mathematics. 120 Qs, 300 Marks. +2.5 correct, -0.833 wrong.',
        sections: [
          { sectionName: 'Quantitative Aptitude', customName: 'Mathematics (11th & 12th)', totalQuestions: 120, maxMarks: 300, marksPerCorrect: 2.5, negativeMarksPerWrong: 0.833, timeLimitMinutes: 150 }
        ]
      },
      {
        tier: 'Paper 2',
        tierLabel: 'Paper 2 - General Ability Test (GAT)',
        totalQuestions: 150,
        maxMarks: 600,
        totalTimeMinutes: 150,
        marksPerCorrect: 4.0,
        negativeRatio: '1/3',
        negativeMarksPerWrong: 1.333,
        badge: '150 Qs • 600 M • +4 / -1.33 • 2.5 hrs',
        description: 'Part A English (50 Qs = 200M) + Part B General Knowledge (100 Qs = 400M [Physics, Chem, Bio, History, Geo, CA]).',
        sections: [
          { sectionName: 'English Comprehension', customName: 'Part A: English', totalQuestions: 50, maxMarks: 200, marksPerCorrect: 4.0, negativeMarksPerWrong: 1.333, timeLimitMinutes: 50 },
          { sectionName: 'General Awareness', customName: 'Part B: General Knowledge & Science', totalQuestions: 100, maxMarks: 400, marksPerCorrect: 4.0, negativeMarksPerWrong: 1.333, timeLimitMinutes: 100 }
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // 11. DEFENCE: UPSC CDS
  // -------------------------------------------------------------
  {
    id: 'upsc-cds',
    exam: 'UPSC CDS',
    category: 'Defence',
    title: 'UPSC Combined Defence Services (CDS)',
    icon: '🎖️',
    popularPlatforms: ['Testbook', 'Oliveboard', 'SSBCrackExams'],
    tiers: [
      {
        tier: 'Paper 1',
        tierLabel: 'English Paper (Paper 1)',
        totalQuestions: 120,
        maxMarks: 100,
        totalTimeMinutes: 120,
        marksPerCorrect: 0.833,
        negativeRatio: '1/3',
        negativeMarksPerWrong: 0.277,
        badge: '120 Qs • 100 M • 2 hrs • -1/3rd',
        sections: [
          { sectionName: 'English Comprehension', customName: 'English Language', totalQuestions: 120, maxMarks: 100, marksPerCorrect: 0.833, negativeMarksPerWrong: 0.277, timeLimitMinutes: 120 }
        ]
      },
      {
        tier: 'Paper 2',
        tierLabel: 'General Knowledge (Paper 2)',
        totalQuestions: 120,
        maxMarks: 100,
        totalTimeMinutes: 120,
        marksPerCorrect: 0.833,
        negativeRatio: '1/3',
        negativeMarksPerWrong: 0.277,
        badge: '120 Qs • 100 M • 2 hrs • -1/3rd',
        sections: [
          { sectionName: 'General Awareness', customName: 'General Knowledge', totalQuestions: 120, maxMarks: 100, marksPerCorrect: 0.833, negativeMarksPerWrong: 0.277, timeLimitMinutes: 120 }
        ]
      },
      {
        tier: 'General',
        tierLabel: 'Elementary Mathematics (Paper 3 - IMA/INA/AFA)',
        totalQuestions: 100,
        maxMarks: 100,
        totalTimeMinutes: 120,
        marksPerCorrect: 1.0,
        negativeRatio: '1/3',
        negativeMarksPerWrong: 0.333,
        badge: '100 Qs • 100 M • 2 hrs • -1/3rd',
        sections: [
          { sectionName: 'Quantitative Aptitude', customName: 'Elementary Mathematics', totalQuestions: 100, maxMarks: 100, marksPerCorrect: 1.0, negativeMarksPerWrong: 0.333, timeLimitMinutes: 120 }
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // 12. DEFENCE: AFCAT
  // -------------------------------------------------------------
  {
    id: 'afcat',
    exam: 'AFCAT',
    category: 'Defence',
    title: 'AFCAT (Air Force Common Admission Test)',
    icon: '✈️',
    popularPlatforms: ['Testbook', 'Oliveboard', 'SSBCrackExams'],
    tiers: [
      {
        tier: 'General',
        tierLabel: 'AFCAT Online Written Exam',
        totalQuestions: 100,
        maxMarks: 300,
        totalTimeMinutes: 120,
        marksPerCorrect: 3.0,
        negativeRatio: '1/3',
        negativeMarksPerWrong: 1.0,
        badge: '100 Qs • 300 M • +3 / -1 • 2 hrs',
        sections: [
          { sectionName: 'English Comprehension', customName: 'Verbal Ability in English', totalQuestions: 30, maxMarks: 90, marksPerCorrect: 3, negativeMarksPerWrong: 1.0, timeLimitMinutes: 30 },
          { sectionName: 'General Awareness', customName: 'General Awareness', totalQuestions: 25, maxMarks: 75, marksPerCorrect: 3, negativeMarksPerWrong: 1.0, timeLimitMinutes: 20 },
          { sectionName: 'Quantitative Aptitude', customName: 'Numerical Ability', totalQuestions: 20, maxMarks: 60, marksPerCorrect: 3, negativeMarksPerWrong: 1.0, timeLimitMinutes: 35 },
          { sectionName: 'General Intelligence & Reasoning', customName: 'Reasoning and Military Aptitude', totalQuestions: 25, maxMarks: 75, marksPerCorrect: 3, negativeMarksPerWrong: 1.0, timeLimitMinutes: 35 }
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // 13. CUSTOM EXAM PRESET
  // -------------------------------------------------------------
  {
    id: 'custom-exam',
    exam: 'Custom',
    category: 'Custom',
    title: 'Custom Competitive Exam',
    icon: '🎯',
    popularPlatforms: ['Testbook', 'Coaching Test Series', 'Offline Mock', 'Custom'],
    tiers: [
      {
        tier: 'General',
        tierLabel: 'Custom Exam Pattern',
        totalQuestions: 100,
        maxMarks: 100,
        totalTimeMinutes: 60,
        marksPerCorrect: 1.0,
        negativeRatio: '1/4',
        negativeMarksPerWrong: 0.25,
        badge: 'Customizable Subjects & Marking',
        sections: [
          { sectionName: 'Quantitative Aptitude', totalQuestions: 25, maxMarks: 25, marksPerCorrect: 1, negativeMarksPerWrong: 0.25, timeLimitMinutes: 15 },
          { sectionName: 'General Intelligence & Reasoning', totalQuestions: 25, maxMarks: 25, marksPerCorrect: 1, negativeMarksPerWrong: 0.25, timeLimitMinutes: 15 },
          { sectionName: 'English Comprehension', totalQuestions: 25, maxMarks: 25, marksPerCorrect: 1, negativeMarksPerWrong: 0.25, timeLimitMinutes: 15 },
          { sectionName: 'General Awareness', totalQuestions: 25, maxMarks: 25, marksPerCorrect: 1, negativeMarksPerWrong: 0.25, timeLimitMinutes: 15 }
        ]
      }
    ]
  }
];

export function findExamPreset(examName: string): ExamPreset | undefined {
  return EXAM_PRESETS.find(p => p.exam.toLowerCase() === examName.toLowerCase() || p.id === examName.toLowerCase());
}

export function findTierPreset(examPreset: ExamPreset, tierName: string): ExamTierPreset {
  const match = examPreset.tiers.find(t => t.tier.toLowerCase() === tierName.toLowerCase() || t.tierLabel.toLowerCase().includes(tierName.toLowerCase()));
  return match || examPreset.tiers[0];
}
