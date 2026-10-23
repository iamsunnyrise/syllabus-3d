/**
 * ═════════════════════════════════════════════════════════════════════
 * CALCULATION BOOSTER — SUBTRACTION MASTERY DATA & GENERATORS
 * ═════════════════════════════════════════════════════════════════════
 * Comprehensive dataset & algorithmic question generators for mental
 * subtraction mastery from Basic Single Digits to Advanced DI Multi-Digit
 * Gaps and Decimal subtractions for SSC CGL, CHSL, CPO, MTS & Banking exams.
 * ═════════════════════════════════════════════════════════════════════
 */

export interface SubtractionStageConfig {
  id: number;
  name: string;
  hindiName: string;
  category: 'Foundation' | 'Core Speed' | 'Vedic Split' | 'DI Master';
  description: string;
  targetTimeSec: number;
  questionCount: number;
  techniqueTip: string;
  sampleProblem: string;
  badge: string;
  accentColor: string;
}

export interface SubtractionTechnique {
  id: string;
  title: string;
  hindiTitle: string;
  category: 'Vedic Math' | 'Left-to-Right' | 'Rounding' | 'Adding Up' | 'Equal Addition' | 'Decimals';
  badge: string;
  summary: string;
  explanation: string;
  formula: string;
  steps: string[];
  example: {
    problem: string;
    thoughtProcess: string;
    answer: string;
  };
  sampleQuiz: {
    problem: string;
    mentalTip: string;
    options: number[];
    answer: number;
  };
}

export interface SubtractionQuestion {
  id: string;
  stageId?: number;
  operands: number[];
  displayExpression: string;
  answer: number;
  options: number[];
  mentalBreakdown: string;
  isDecimal?: boolean;
}

export interface SubtractionStats {
  totalAnswered: number;
  totalCorrect: number;
  bestStreak: number;
  blitzHighScore: number;
  totalXp: number;
  fastestAnswerSec: number;
  stageStars: Record<number, number>; // stageId -> 1..3 stars
  unlockedStage: number; // 1 to 10
  weakPairs: Record<string, number>; // "83-47" -> count of mistakes
}

export const STORAGE_KEY_SUBTRACTION_STATS = 'syllabus3d_subtraction_stats_v1';
export const STORAGE_KEY_SUBTRACTION_WEAK = 'syllabus3d_subtraction_weak_v1';

export const DEFAULT_SUBTRACTION_STATS: SubtractionStats = {
  totalAnswered: 0,
  totalCorrect: 0,
  bestStreak: 0,
  blitzHighScore: 0,
  totalXp: 0,
  fastestAnswerSec: 99,
  stageStars: {},
  unlockedStage: 1,
  weakPairs: {}
};

// ---------------------------------------------------------------------
// 10 PROGRESSIVE STAGES (BASIC TO ADVANCED)
// ---------------------------------------------------------------------
export const SUBTRACTION_STAGES: SubtractionStageConfig[] = [
  {
    id: 1,
    name: 'Stage 1: Single-Digit Reflex & Tens Base',
    hindiName: 'एक अंक और दहाई घटाव (1-Digit Drops)',
    category: 'Foundation',
    description: 'Build instantaneous brain reflexes for single digits and drops from 10–18 (e.g. 15 - 7, 14 - 9, 13 - 6).',
    targetTimeSec: 30,
    questionCount: 10,
    techniqueTip: 'Never count backward on fingers! Anchor to 10: 15 - 7 = (15 - 5) - 2 = 10 - 2 = 8, or memorize 15-8=7 as a visual anchor.',
    sampleProblem: '15 - 7 = 8',
    badge: '⚡ Instant Reflex',
    accentColor: 'from-rose-500 to-pink-500'
  },
  {
    id: 2,
    name: 'Stage 2: 2-Digit - 1-Digit (Tens Boundary Bridge)',
    hindiName: 'दो अंक - एक अंक घटाव (Borrow Speed)',
    category: 'Foundation',
    description: 'Bridge across tens boundaries without hesitation (e.g. 52 - 7, 73 - 8, 84 - 6).',
    targetTimeSec: 35,
    questionCount: 10,
    techniqueTip: 'Split the 1-digit into friendly steps: 52 - 7 = (52 - 2) - 5 = 50 - 5 = 45.',
    sampleProblem: '52 - 7 = 45',
    badge: '🧱 Bridge Tens Drop',
    accentColor: 'from-pink-500 to-rose-600'
  },
  {
    id: 3,
    name: 'Stage 3: All from 9, Last from 10 (100 Complements)',
    hindiName: 'सैकड़ा पूरक घटाव (Friends of 100)',
    category: 'Core Speed',
    description: 'Instant subtractions from 100 (e.g. 100 - 37 = 63, 100 - 64 = 36). Crucial for Percentages, Profit & Loss.',
    targetTimeSec: 35,
    questionCount: 10,
    techniqueTip: 'Vedic rule: "All from 9, last from 10". For 100 - 37: (9 - 3 = 6) and (10 - 7 = 3) → 63.',
    sampleProblem: '100 - 37 = 63',
    badge: '🎯 Vedic Nikhilam 100',
    accentColor: 'from-amber-500 to-orange-500'
  },
  {
    id: 4,
    name: 'Stage 4: 2-Digit - 2-Digit (Simple / No Borrow)',
    hindiName: 'दो अंक - दो अंक (सरल घटाव - No Borrow)',
    category: 'Core Speed',
    description: 'Subtract tens and units cleanly from left to right without borrowing (e.g. 78 - 34, 96 - 42).',
    targetTimeSec: 40,
    questionCount: 10,
    techniqueTip: 'Left-to-Right: (70 - 30 = 40) then (8 - 4 = 4) → 44.',
    sampleProblem: '78 - 34 = 44',
    badge: '🚀 Left-to-Right Base',
    accentColor: 'from-emerald-500 to-teal-500'
  },
  {
    id: 5,
    name: 'Stage 5: 2-Digit - 2-Digit (Vedic Split & Borrowing)',
    hindiName: 'दो अंक - दो अंक (वैदिक स्प्लिट - With Borrow)',
    category: 'Vedic Split',
    description: 'The core exam speed skill: subtract two 2-digit numbers with borrowing mentally (e.g. 83 - 47, 72 - 38).',
    targetTimeSec: 45,
    questionCount: 10,
    techniqueTip: 'Subtract Tens first, then units: 83 - 40 = 43, then 43 - 7 = 36.',
    sampleProblem: '83 - 47 = 36',
    badge: '🔥 Vedic Split Master',
    accentColor: 'from-violet-500 to-purple-600'
  },
  {
    id: 6,
    name: 'Stage 6: Rounding / Compensation Method',
    hindiName: 'निकटतम दहाई विधि (Round & Add Back)',
    category: 'Vedic Split',
    description: 'When subtracting numbers ending in 8 or 9 (e.g. -39, -48, -79), subtract round ten then ADD the extra!',
    targetTimeSec: 45,
    questionCount: 10,
    techniqueTip: 'To subtract 39, subtract 40 and add 1! 84 - 39 = 84 - 40 + 1 = 44 + 1 = 45.',
    sampleProblem: '84 - 39 = 45',
    badge: '⚡ Round & Add Back',
    accentColor: 'from-amber-500 to-red-500'
  },
  {
    id: 7,
    name: 'Stage 7: 3-Digit - 2-Digit Speed Drops',
    hindiName: 'तीन अंक - दो अंक घटाव (3-Digit Drops)',
    category: 'Vedic Split',
    description: 'Drop 2-digit numbers from 3-digit totals effortlessly without pen (e.g. 243 - 68, 412 - 58).',
    targetTimeSec: 50,
    questionCount: 10,
    techniqueTip: 'Drop tens first: 243 - 60 = 183, then drop units: 183 - 8 = 175.',
    sampleProblem: '243 - 68 = 175',
    badge: '🛡️ 3-Digit Drop Ninja',
    accentColor: 'from-blue-500 to-indigo-600'
  },
  {
    id: 8,
    name: 'Stage 8: Subtractions from Round Base (500, 800, 1000)',
    hindiName: 'शून्य आधार घटाव (Base Zero Drops)',
    category: 'DI Master',
    description: 'Subtract from round hundreds & thousands without messy carries (e.g. 500 - 187, 800 - 345, 1000 - 468).',
    targetTimeSec: 55,
    questionCount: 10,
    techniqueTip: 'Reduce hundreds by 1, then apply Nikhilam: 500 - 187 = 400 + (100 - 187) = 300 + 13 = 313.',
    sampleProblem: '500 - 187 = 313',
    badge: '🧱 Base Zero Drop',
    accentColor: 'from-indigo-500 to-violet-600'
  },
  {
    id: 9,
    name: 'Stage 9: 3-Digit - 3-Digit Exam DI Differences',
    hindiName: 'तीन अंक - तीन अंक अंतर (DI Table Gaps)',
    category: 'DI Master',
    description: 'Direct SSC CGL & Bank PO Data Interpretation table style 3-digit comparison differences.',
    targetTimeSec: 65,
    questionCount: 10,
    techniqueTip: 'Cashier\'s Trick (Adding Up): 387 + 13 = 400; 400 + 242 = 642; Total gap = 13 + 242 = 255!',
    sampleProblem: '642 - 387 = 255',
    badge: '📊 DI Gap Ninja',
    accentColor: 'from-fuchsia-600 to-purple-600'
  },
  {
    id: 10,
    name: 'Stage 10: Decimal Subtractions (DI Revenue & Growth Gaps)',
    hindiName: 'दशमलव अंतर (Decimals Speed Round)',
    category: 'DI Master',
    description: 'Master fast decimal differences for Data Interpretation percentages, inflation & profit margins (e.g. 54.3 - 28.7).',
    targetTimeSec: 60,
    questionCount: 10,
    techniqueTip: 'Rupees-Paise Split or Add Up: 28.7 + 0.3 = 29.0; 29.0 + 25.3 = 54.3 → 0.3 + 25.3 = 25.6.',
    sampleProblem: '54.3 - 28.7 = 25.6',
    badge: '👑 Subtraction Grandmaster',
    accentColor: 'from-rose-500 via-purple-500 to-amber-500'
  }
];

// ---------------------------------------------------------------------
// VEDIC & MENTAL TECHNIQUES (LESSONS & TRICKS)
// ---------------------------------------------------------------------
export const SUBTRACTION_TECHNIQUES: SubtractionTechnique[] = [
  {
    id: 'left-to-right-sub',
    title: 'Left-to-Right Subtraction (बाएं से दाएं घटाव)',
    hindiTitle: 'वैदिक स्प्लिट मेथड — बिना पेन पेपर के घटाएं',
    category: 'Left-to-Right',
    badge: '⭐ The #1 Exam Secret',
    summary: 'School teaches right-to-left with borrow. Competitive toppers subtract from Left to Right by breaking into Tens and Units.',
    explanation: 'School me right-to-left subtract karte waqt borrow yaad rakhna mushkil hota hai. Left-to-Right me aap pehle Tens ghata kar intermediate number par aate hain, fir units ghata dete hain. Isse brain par bilkul load nahi padta.',
    formula: '(A - Tens_B) - Units_B',
    steps: [
      'Pehle pehle number me se doosre number ka Tens (दहाई) ghatayein: 83 - 40 = 43',
      'Ab jo bacha usme se Units (इकाई) ghatayein: 43 - 7 = 36',
      'Result turant confirm karein: 36!'
    ],
    example: {
      problem: '83 - 47',
      thoughtProcess: 'Mind me bolo: 83 - 40 = 43. Ab 43 - 7 = 36. Direct answer 36!',
      answer: '36'
    },
    sampleQuiz: {
      problem: '74 - 38',
      mentalTip: '74 - 30 = 44, aur 44 - 8 = 36',
      options: [36, 46, 34, 42],
      answer: 36
    }
  },
  {
    id: 'nikhilam-100-1000',
    title: 'Vedic Nikhilam Sutra (All from 9, Last from 10)',
    hindiTitle: '100, 1000, 10000 से सीधा घटाव — निखिलं नवतश्चरमं दशतः',
    category: 'Vedic Math',
    badge: '🎯 100/1000 Miracle',
    summary: 'Jab bhi 100 ya 1000 me se kisi number ko ghatana ho, to bina borrow liye: pehle sabhi digits ko 9 se aur aakhiri digit ko 10 se ghatayein.',
    explanation: '100 - 43 nikalte waqt 0 me se 3 borrow mat lijiye. Seedha formula lagaiye: 9 - 4 = 5, aur 10 - 3 = 7. Answer = 57!',
    formula: 'Tens = 9 - d₁, Units = 10 - d₂',
    steps: [
      'Sabhi digits ko 9 me se subtract karein: 9 - 3 = 6',
      'Aakhiri digit (last non-zero) ko 10 me se subtract karein: 10 - 7 = 3',
      'Dono digits ko ek saath likhein: 63'
    ],
    example: {
      problem: '1000 - 368',
      thoughtProcess: '9 - 3 = 6; 9 - 6 = 3; 10 - 8 = 2 → Answer is 632.',
      answer: '632'
    },
    sampleQuiz: {
      problem: '100 - 64',
      mentalTip: '9 - 6 = 3, 10 - 4 = 6 → 36.',
      options: [46, 36, 34, 26],
      answer: 36
    }
  },
  {
    id: 'rounding-compensation-sub',
    title: 'Rounding & Compensation (निकटतम दहाई जोड़ विधि)',
    hindiTitle: 'राउंड-अप करो फिर जोड़ो — 8 aur 9 ending numbers ke liye',
    category: 'Rounding',
    badge: '⚡ Lightning Fast for .8 / .9',
    summary: 'Agar ghatane wala number 9, 8 ya 7 par end ho raha hai (jaise 39, 48, 79), to bada round number ghatao aur extra wapas add kar lo!',
    explanation: '39 ghatana mushkil lagta hai lekin 40 ghatana bohot aasan hai! Isliye -39 ki jagah (-40 + 1) karein.',
    formula: 'A - (Round - Offset) = (A - Round) + Offset',
    steps: [
      'Near round number pehchano: 39 → 40 - 1, 48 → 50 - 2, 79 → 80 - 1',
      'Pehle aasaani se round number minus karo: 84 - 40 = 44',
      'Offset wapas add karo: 44 + 1 = 45'
    ],
    example: {
      problem: '84 - 39',
      thoughtProcess: '84 - 40 = 44. Ab 1 wapas jodo → 45.',
      answer: '45'
    },
    sampleQuiz: {
      problem: '126 - 48',
      mentalTip: '126 - 50 = 76. Add 2 = 78.',
      options: [76, 78, 88, 74],
      answer: 78
    }
  },
  {
    id: 'cashiers-adding-up',
    title: 'The Cashier\'s Trick / Adding Up Method (दुकानदार विधि)',
    hindiTitle: 'घटाव को जोड़ में बदलो — उल्टी गिनती विधि',
    category: 'Adding Up',
    badge: '🏪 Real-Life Cashier Secret',
    summary: 'Dukaandar kabhi subtract nahi karta; wo chote number se bade number tak paise jodte hue pahunchta hai.',
    explanation: 'Exams me 642 - 387 calculate karne ke liye: 387 me kya jodein ki 642 ban jaye? 387 + 13 = 400; 400 + 242 = 642. Total difference = 13 + 242 = 255!',
    formula: 'B + x₁ + x₂ = A → Gap = x₁ + x₂',
    steps: [
      'Chhote number ko nearest round hundred tak pahunchayein: 387 + 13 = 400',
      'Ab 400 se target number 642 tak direct jodein: 400 + 242 = 642',
      'Dono step ke jumps ko aapas me jodein: 13 + 242 = 255'
    ],
    example: {
      problem: '524 - 378',
      thoughtProcess: '378 + 22 = 400. 400 + 124 = 524. Difference = 22 + 124 = 146.',
      answer: '146'
    },
    sampleQuiz: {
      problem: '815 - 492',
      mentalTip: '492 + 8 = 500. 500 + 315 = 815. Total: 8 + 315 = 323.',
      options: [313, 323, 333, 325],
      answer: 323
    }
  },
  {
    id: 'equal-addition-trick',
    title: 'Equal Addition / Constant Difference Trick (समान जोड़ विधि)',
    hindiTitle: 'दोनों तरफ बराबर जोड़ें — बिना किसी Borrow के',
    category: 'Equal Addition',
    badge: '🪄 Borrowing Eliminator',
    summary: 'Agar dono numbers me same number add kar diya jaye, to unka difference bilkul change nahi hota: (A - B) = (A + k) - (B + k).',
    explanation: '83 - 47 me 47 ko round 50 banane ke liye dono me 3 add kar dein: (83 + 3) - (47 + 3) = 86 - 50 = 36! Zero borrow, instant answer!',
    formula: '(A + k) - (B + k) where B + k is round ten',
    steps: [
      'Dekhein ki subtractor ko round ten banane ke liye kya add karna hai: 47 + 3 = 50',
      'Wahi same number pehle number me bhi add karein: 83 + 3 = 86',
      'Ab seedha aasan subtraction karein: 86 - 50 = 36'
    ],
    example: {
      problem: '72 - 38',
      thoughtProcess: 'Dono me 2 jodo: (72+2) - (38+2) = 74 - 40 = 34!',
      answer: '34'
    },
    sampleQuiz: {
      problem: '91 - 56',
      mentalTip: 'Dono me 4 jodo: (91+4) - (56+4) = 95 - 60 = 35.',
      options: [35, 45, 34, 41],
      answer: 35
    }
  },
  {
    id: 'decimal-speed-sub',
    title: 'Decimal Rupee-Paise Difference (दशमलव घटाव विधि)',
    hindiTitle: 'दशमलव को रुपए-पैसे समझकर तुरंत घटाएं',
    category: 'Decimals',
    badge: '🪙 No Confusion with Points',
    summary: 'Decimals me point se darna nahi hai — integer part aur decimal part ko alag-alag handle karein ya Cashier trick lagayein.',
    explanation: '54.3 - 28.7 ko aise sochiye: 28.7 + 0.3 = 29.0. 29.0 + 25.3 = 54.3. Total gap = 0.3 + 25.3 = 25.6.',
    formula: 'Add up from B to A via round integer',
    steps: [
      'Pehle point ke baad wale ko round number tak pahunchayein: 28.7 + 0.3 = 29.0',
      'Ab 29.0 se 54.3 tak ka direct jump lein: 54.3 - 29.0 = 25.3',
      'Dono gaps ko jodein: 0.3 + 25.3 = 25.6'
    ],
    example: {
      problem: '62.4 - 37.8',
      thoughtProcess: '37.8 + 0.2 = 38.0. 38.0 + 24.4 = 62.4. Total = 0.2 + 24.4 = 24.6.',
      answer: '24.6'
    },
    sampleQuiz: {
      problem: '45.2 - 18.6',
      mentalTip: '18.6 + 0.4 = 19. 19 + 26.2 = 45.2. Total: 0.4 + 26.2 = 26.6.',
      options: [26.4, 26.6, 27.6, 25.6],
      answer: 26.6
    }
  }
];

// ---------------------------------------------------------------------
// DYNAMIC QUESTION GENERATORS WITH REALISTIC DISTRACTORS
// ---------------------------------------------------------------------

/**
 * Generate 3 smart distractors for a subtraction answer:
 * - Off by 10 (missed borrow or double borrow)
 * - Off by 1 or 2 (unit digit calculation error)
 * - Reversed / near round number
 */
export function generateSubtractionDistractors(answer: number, isDecimal: boolean = false): number[] {
  const distractors = new Set<number>();
  const step = isDecimal ? 0.1 : 1;

  const offsets = isDecimal
    ? [1, -1, 0.1, -0.1, 0.2, -0.2, 1.1, -0.9]
    : [10, -10, 1, -1, 2, -2, 9, -9, 11, -11];

  let attempts = 0;
  while (distractors.size < 3 && attempts < 25) {
    attempts++;
    const offset = offsets[Math.floor(Math.random() * offsets.length)];
    const candidate = isDecimal ? Number((answer + offset).toFixed(2)) : answer + offset;
    if (candidate > 0 && candidate !== answer) {
      distractors.add(candidate);
    }
  }

  // Fallback if needed
  let fallbackStep = step;
  while (distractors.size < 3) {
    const candidate = isDecimal ? Number((answer + fallbackStep).toFixed(2)) : answer + fallbackStep;
    if (candidate > 0 && candidate !== answer) distractors.add(candidate);
    fallbackStep += step;
  }

  return [...distractors];
}

/**
 * Generates a clean random question for a specific subtraction stage
 */
export function generateSubtractionStageQuestion(stageId: number): SubtractionQuestion {
  let operands: number[] = [];
  let answer = 0;
  let breakdown = '';
  let isDecimal = false;

  switch (stageId) {
    case 1: {
      // Single Digits & Tens Drops (e.g. 15 - 7, 14 - 9, 13 - 6, 10 - 4)
      const b = Math.floor(Math.random() * 7) + 3; // 3..9
      const a = b + (Math.floor(Math.random() * 8) + 2); // ensures a > b, result 2..9
      operands = [a, b];
      answer = a - b;
      breakdown = `Reflex: ${a} - ${b} = ${answer}`;
      break;
    }

    case 2: {
      // 2-digit - 1-digit with borrow across tens (e.g. 52 - 7, 73 - 8)
      const tens = (Math.floor(Math.random() * 7) + 2) * 10; // 20..80
      const unitA = Math.floor(Math.random() * 4) + 1; // 1..4 (small unit)
      const a = tens + unitA;
      const b = Math.floor(Math.random() * (9 - unitA)) + (unitA + 1); // ensures b > unitA
      operands = [a, b];
      answer = a - b;
      const diffToTen = unitA;
      const rem = b - diffToTen;
      breakdown = `Bridge Drop: (${a} - ${diffToTen} = ${tens}) - ${rem} = ${answer}`;
      break;
    }

    case 3: {
      // 100 Complements (e.g. 100 - 37 = 63, or 37 + ? = 100)
      const b = Math.floor(Math.random() * 75) + 15; // 15..89
      answer = 100 - b;
      operands = [100, b];
      const tensDiff = 9 - Math.floor(b / 10);
      const unitsDiff = 10 - (b % 10);
      breakdown = `All from 9, last from 10: (9 - ${Math.floor(b / 10)} = ${tensDiff}) and (10 - ${b % 10} = ${unitsDiff}) → ${answer}`;
      break;
    }

    case 4: {
      // 2-Digit - 2-Digit (Simple / No Borrow)
      const t1 = Math.floor(Math.random() * 5) + 4; // 4..8
      const u1 = Math.floor(Math.random() * 5) + 4; // 4..8
      const t2 = Math.floor(Math.random() * (t1 - 1)) + 1; // ensures t1 > t2
      const u2 = Math.floor(Math.random() * u1); // ensures u1 >= u2 (no borrow)
      const a = t1 * 10 + u1;
      const b = t2 * 10 + u2;
      operands = [a, b];
      answer = a - b;
      breakdown = `Left-to-Right: (${t1 * 10} - ${t2 * 10} = ${(t1 - t2) * 10}) + (${u1} - ${u2} = ${u1 - u2}) = ${answer}`;
      break;
    }

    case 5: {
      // 2-Digit - 2-Digit (Vedic Split with Borrow)
      const t1 = Math.floor(Math.random() * 5) + 4; // 4..8
      const u1 = Math.floor(Math.random() * 4) + 1; // 1..4
      const t2 = Math.floor(Math.random() * (t1 - 2)) + 1; // ensures t1 > t2 + 1
      const u2 = Math.floor(Math.random() * 4) + 6; // 6..9 (ensures borrow)
      const a = t1 * 10 + u1;
      const b = t2 * 10 + u2;
      operands = [a, b];
      answer = a - b;
      const step1 = a - t2 * 10;
      breakdown = `Vedic Split: (${a} - ${t2 * 10} = ${step1}) then ${step1} - ${u2} = ${answer}`;
      break;
    }

    case 6: {
      // Rounding / Compensation (Subtrahend ends in 8 or 9)
      const base = Math.floor(Math.random() * 50) + 45; // 45..94
      const nearTen = (Math.floor(Math.random() * 3) + 2) * 10; // 20, 30, 40
      const offset = Math.random() > 0.5 ? 1 : 2; // ends in 9 or 8
      const subtrahend = nearTen - offset;
      operands = [base, subtrahend];
      answer = base - subtrahend;
      breakdown = `Compensation: ${base} - ${nearTen} = ${base - nearTen}, then add back ${offset} = ${answer}`;
      break;
    }

    case 7: {
      // 3-Digit - 2-Digit Speed Drops (e.g. 243 - 68)
      const hundreds = (Math.floor(Math.random() * 5) + 2) * 100; // 200..600
      const twoDigit1 = Math.floor(Math.random() * 60) + 20; // 20..79
      const a = hundreds + twoDigit1;
      const b = Math.floor(Math.random() * 50) + 45; // 45..94
      operands = [a, b];
      answer = a - b;
      const tensB = Math.floor(b / 10) * 10;
      const unitsB = b % 10;
      breakdown = `3-Digit Drop: (${a} - ${tensB} = ${a - tensB}) then minus ${unitsB} = ${answer}`;
      break;
    }

    case 8: {
      // Subtractions from Round Hundreds & Thousands (e.g. 500 - 187, 800 - 345, 1000 - 468)
      const roundBases = [500, 600, 700, 800, 900, 1000];
      const base = roundBases[Math.floor(Math.random() * roundBases.length)];
      const subtrahend = Math.floor(Math.random() * (base - 200)) + 120;
      operands = [base, subtrahend];
      answer = base - subtrahend;
      breakdown = `Base Drop: ${base} - ${subtrahend} = ${answer} (Drop 1 from hundreds, then apply Nikhilam: 100 - ${subtrahend % 100})`;
      break;
    }

    case 9: {
      // 3-Digit - 3-Digit Exam DI Differences (e.g. 642 - 387)
      const b = Math.floor(Math.random() * 450) + 220; // 220..669
      const diff = Math.floor(Math.random() * 300) + 115; // 115..414
      const a = b + diff;
      operands = [a, b];
      answer = diff;
      const nextRound = Math.ceil(b / 100) * 100;
      const jump1 = nextRound - b;
      const jump2 = a - nextRound;
      breakdown = `Cashier's Trick (Adding Up): ${b} + ${jump1} = ${nextRound}; ${nextRound} + ${jump2} = ${a} → ${jump1} + ${jump2} = ${answer}`;
      break;
    }

    case 10:
    default: {
      // Decimal Subtractions (e.g. 54.3 - 28.7)
      isDecimal = true;
      const intB = Math.floor(Math.random() * 35) + 15;
      const decB = (Math.floor(Math.random() * 8) + 2) / 10;
      const b = Number((intB + decB).toFixed(1));

      const intDiff = Math.floor(Math.random() * 30) + 12;
      const decDiff = (Math.floor(Math.random() * 8) + 1) / 10;
      const a = Number((b + intDiff + decDiff).toFixed(1));

      operands = [a, b];
      answer = Number((a - b).toFixed(1));
      breakdown = `Decimal Gap: (${a} - ${Math.ceil(b)} = ${(a - Math.ceil(b)).toFixed(1)}) + ${(Math.ceil(b) - b).toFixed(1)} = ${answer}`;
      break;
    }
  }

  // Display expression
  let displayExpression = '';
  if (stageId === 3) {
    displayExpression = `100 - ${operands[1]} = ?`;
  } else {
    displayExpression = `${operands[0]} - ${operands[1]} = ?`;
  }

  // Options generation with smart distractors
  const distractors = generateSubtractionDistractors(answer, isDecimal);
  const options = [...distractors, answer].sort(() => Math.random() - 0.5);

  return {
    id: `q_sub_st${stageId}_${Date.now()}_${Math.random()}`,
    stageId,
    operands,
    displayExpression,
    answer,
    options,
    mentalBreakdown: breakdown,
    isDecimal
  };
}

/**
 * Returns player title & rank badge based on Subtraction XP points
 */
export function getSubtractionRank(xp: number): {
  level: number;
  title: string;
  hindiTitle: string;
  nextThreshold: number;
  prevThreshold: number;
  badge: string;
} {
  if (xp < 100) {
    return {
      level: 1,
      title: 'Subtraction Novice',
      hindiTitle: 'आरंभिक शिक्षार्थी',
      nextThreshold: 100,
      prevThreshold: 0,
      badge: '🌱 Level 1'
    };
  }
  if (xp < 300) {
    return {
      level: 2,
      title: 'Mental Subtractor',
      hindiTitle: 'माइंड कैलकुलेटर',
      nextThreshold: 300,
      prevThreshold: 100,
      badge: '⚡ Level 2'
    };
  }
  if (xp < 700) {
    return {
      level: 3,
      title: 'Vedic Nikhilam Pro',
      hindiTitle: 'स्पीड मास्टर',
      nextThreshold: 700,
      prevThreshold: 300,
      badge: '🔥 Level 3'
    };
  }
  if (xp < 1500) {
    return {
      level: 4,
      title: 'DI Gap Ninja',
      hindiTitle: 'डीआई विशेषज्ञ',
      nextThreshold: 1500,
      prevThreshold: 700,
      badge: '🛡️ Level 4'
    };
  }
  return {
    level: 5,
    title: 'Human Calculator Grandmaster',
    hindiTitle: 'मानव कंप्यूटर (Grandmaster)',
    nextThreshold: 3000,
    prevThreshold: 1500,
    badge: '👑 Grandmaster'
  };
}
