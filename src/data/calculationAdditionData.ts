/**
 * ═════════════════════════════════════════════════════════════════════
 * CALCULATION BOOSTER — ADDITION MASTERY DATA & GENERATORS
 * ═════════════════════════════════════════════════════════════════════
 * Comprehensive dataset & algorithmic question generators for mental
 * addition mastery from Basic Single Digits to Advanced DI Multi-Number
 * and Decimal additions for SSC CGL, CHSL, CPO, MTS & Banking exams.
 * ═════════════════════════════════════════════════════════════════════
 */

export interface AdditionStageConfig {
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

export interface AdditionTechnique {
  id: string;
  title: string;
  hindiTitle: string;
  category: 'Vedic Math' | 'Left-to-Right' | 'Rounding' | 'DI Column Scan' | 'Decimals';
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

export interface AdditionQuestion {
  id: string;
  stageId?: number;
  operands: number[];
  displayExpression: string;
  answer: number;
  options: number[];
  mentalBreakdown: string;
  isDecimal?: boolean;
}

export interface AdditionStats {
  totalAnswered: number;
  totalCorrect: number;
  bestStreak: number;
  blitzHighScore: number;
  totalXp: number;
  fastestAnswerSec: number;
  stageStars: Record<number, number>; // stageId -> 1..3 stars
  unlockedStage: number; // 1 to 10
  weakPairs: Record<string, number>; // "47+38" -> count of mistakes
}

export const STORAGE_KEY_ADDITION_STATS = 'syllabus3d_addition_stats_v1';
export const STORAGE_KEY_ADDITION_WEAK = 'syllabus3d_addition_weak_v1';

export const DEFAULT_ADDITION_STATS: AdditionStats = {
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
export const ADDITION_STAGES: AdditionStageConfig[] = [
  {
    id: 1,
    name: 'Stage 1: Single-Digit Reflex & Tens Pairs',
    hindiName: 'एक अंक और दहाई जोड़ (1-Digit)',
    category: 'Foundation',
    description: 'Build instantaneous brain reflexes for single digits (e.g. 7+8, 9+6) and making 10 (3+7, 4+6).',
    targetTimeSec: 30,
    questionCount: 10,
    techniqueTip: 'Pair numbers to 10 first. Never count on fingers; memorize 8+7=15 and 9+6=15 as visual anchors.',
    sampleProblem: '8 + 7 = 15',
    badge: '⚡ Instant Reflex',
    accentColor: 'from-blue-500 to-cyan-500'
  },
  {
    id: 2,
    name: 'Stage 2: 2-Digit + 1-Digit Rapid Fire',
    hindiName: 'दो अंक + एक अंक जोड़ (Carry Speed)',
    category: 'Foundation',
    description: 'Bridge across tens boundaries without hesitation (e.g. 47+8, 68+7, 89+5).',
    targetTimeSec: 35,
    questionCount: 10,
    techniqueTip: 'Break the 1-digit into making the next ten: 47 + 8 = (47 + 3) + 5 = 50 + 5 = 55.',
    sampleProblem: '47 + 8 = 55',
    badge: '🧱 Bridge Tens',
    accentColor: 'from-cyan-500 to-teal-500'
  },
  {
    id: 3,
    name: 'Stage 3: Making 100 (Complement Reflex)',
    hindiName: 'सैकड़ा पूरक जोड़ (Friends of 100)',
    category: 'Core Speed',
    description: 'Find what makes 100 instantly (e.g. 64 + ? = 100, 100 - 37). Crucial for Percentages and Profit & Loss.',
    targetTimeSec: 35,
    questionCount: 10,
    techniqueTip: 'Vedic rule: "All from 9, last from 10". For 64: (9-6=3) and (10-4=6) → 36.',
    sampleProblem: '64 + 36 = 100',
    badge: '🎯 100 Complements',
    accentColor: 'from-emerald-500 to-green-500'
  },
  {
    id: 4,
    name: 'Stage 4: 2-Digit + 2-Digit (Simple / No Carry)',
    hindiName: 'दो अंक + दो अंक (सरल जोड़ - No Carry)',
    category: 'Core Speed',
    description: 'Add tens and units cleanly from left to right (e.g. 34 + 52, 61 + 27).',
    targetTimeSec: 40,
    questionCount: 10,
    techniqueTip: 'Left-to-Right: (30 + 50 = 80) then (4 + 2 = 6) → 86.',
    sampleProblem: '34 + 52 = 86',
    badge: '🚀 Left-to-Right Base',
    accentColor: 'from-green-500 to-emerald-600'
  },
  {
    id: 5,
    name: 'Stage 5: 2-Digit + 2-Digit (Vedic Split & Carry)',
    hindiName: 'दो अंक + दो अंक (वैदिक स्प्लिट - With Carry)',
    category: 'Vedic Split',
    description: 'The core exam speed skill: add two 2-digit numbers with carries mentally (e.g. 68 + 77, 85 + 49).',
    targetTimeSec: 45,
    questionCount: 10,
    techniqueTip: 'Split Tens & Units: 68 + 77 = (60+70) + (8+7) = 130 + 15 = 145.',
    sampleProblem: '68 + 77 = 145',
    badge: '🔥 Vedic Split Master',
    accentColor: 'from-amber-500 to-orange-500'
  },
  {
    id: 6,
    name: 'Stage 6: Rounding / Compensation Method',
    hindiName: 'निकटतम दहाई विधि (Rounding Strategy)',
    category: 'Vedic Split',
    description: 'When adding numbers ending in 8 or 9 (e.g. +49, +88, +97), round up then subtract the overshoot.',
    targetTimeSec: 45,
    questionCount: 10,
    techniqueTip: 'To add 49, add 50 and subtract 1. 67 + 49 = 67 + 50 - 1 = 117 - 1 = 116.',
    sampleProblem: '76 + 49 = 125',
    badge: '⚡ Round & Adjust',
    accentColor: 'from-orange-500 to-red-500'
  },
  {
    id: 7,
    name: 'Stage 7: 3-Digit + 2-Digit Speed Adds',
    hindiName: 'तीन अंक + दो अंक जोड़ (3-Digit + 2-Digit)',
    category: 'Vedic Split',
    description: 'Add 2-digit numbers to 3-digit totals effortlessly without pen (e.g. 348 + 76, 582 + 69).',
    targetTimeSec: 50,
    questionCount: 10,
    techniqueTip: 'Combine hundreds first: 348 + 76 = 300 + (48 + 76) = 300 + 124 = 424.',
    sampleProblem: '348 + 76 = 424',
    badge: '🛡️ 3-Digit Transition',
    accentColor: 'from-purple-500 to-indigo-500'
  },
  {
    id: 8,
    name: 'Stage 8: 3 Numbers Chain Addition',
    hindiName: 'तीन संख्याओं का लगातार जोड़ (Chain Adds)',
    category: 'DI Master',
    description: 'Add three 2-digit numbers in a row as seen in averages & DI tables (e.g. 24 + 38 + 19).',
    targetTimeSec: 55,
    questionCount: 10,
    techniqueTip: 'Group pairs that make round 10s or add continuously: 24+38=62, 62+19=81.',
    sampleProblem: '24 + 38 + 19 = 81',
    badge: '⛓️ Chain Adder',
    accentColor: 'from-indigo-500 to-violet-600'
  },
  {
    id: 9,
    name: 'Stage 9: 4 Numbers DI Series Summation',
    hindiName: 'चार संख्याओं का कॉलम योग (DI Table Sum)',
    category: 'DI Master',
    description: 'Direct SSC CGL & Bank PO Data Interpretation table style 4-number column addition.',
    targetTimeSec: 65,
    questionCount: 10,
    techniqueTip: 'Add tens column first: 40+70+50+30=190, then units: 3+6+8+4=21 → 190+21=211.',
    sampleProblem: '43 + 76 + 58 + 34 = 211',
    badge: '📊 DI Table Ninja',
    accentColor: 'from-violet-600 to-purple-600'
  },
  {
    id: 10,
    name: 'Stage 10: Decimal Additions (Exam DI Level)',
    hindiName: 'दशमलव जोड़ (Decimals Speed Round)',
    category: 'DI Master',
    description: 'Master fast decimal sums for Data Interpretation percentages & revenue tables (e.g. 14.6 + 28.75).',
    targetTimeSec: 60,
    questionCount: 10,
    techniqueTip: 'Treat like rupees & paise: 14.6 + 28.7 = (14+28) + (0.6+0.7) = 42 + 1.3 = 43.3.',
    sampleProblem: '14.6 + 28.7 = 43.3',
    badge: '👑 Addition Grandmaster',
    accentColor: 'from-amber-400 via-pink-500 to-purple-600'
  }
];

// ---------------------------------------------------------------------
// VEDIC & MENTAL TECHNIQUES (LESSONS & TRICKS)
// ---------------------------------------------------------------------
export const ADDITION_TECHNIQUES: AdditionTechnique[] = [
  {
    id: 'left-to-right',
    title: 'Left-to-Right Split Method (बाएं से दाएं जोड़)',
    hindiTitle: 'वैदिक स्प्लिट मेथड — बिना पेन पेपर के जोड़ें',
    category: 'Left-to-Right',
    badge: '⭐ The #1 Exam Secret',
    summary: 'School teaches right-to-left with carry. Competitive toppers add from Left to Right by breaking into Tens and Units.',
    explanation: 'Jab aap school me right-to-left jodte hain, to carry ko yaad rakhna padta hai jo dimag par load dalta hai. Left-to-Right me aap direct badi value se shuru karte hain aur turant exact total bol sakte hain.',
    formula: '(T₁ + T₂) + (U₁ + U₂)',
    steps: [
      'Pehle dono numbers ke Tens (दहाई) ko jodein: 60 + 50 = 110',
      'Fir Units (इकाई) ko jodein: 8 + 7 = 15',
      'Dono ko merge kar dein: 110 + 15 = 125'
    ],
    example: {
      problem: '68 + 57',
      thoughtProcess: 'Mind me bolo: 60 + 50 = 110. Ab 8 + 7 = 15. So 110 + 15 = 125.',
      answer: '125'
    },
    sampleQuiz: {
      problem: '59 + 78',
      mentalTip: '(50 + 70 = 120) aur (9 + 8 = 17) → 120 + 17 = 137',
      options: [127, 137, 147, 135],
      answer: 137
    }
  },
  {
    id: 'rounding-compensation',
    title: 'Rounding & Compensation Method (निकटतम दहाई विधि)',
    hindiTitle: 'राउंड-अप करो फिर घटाओ — 8 aur 9 ending numbers ke liye',
    category: 'Rounding',
    badge: '⚡ Lightning Fast for .8 / .9',
    summary: 'Agar koi number 9, 8 ya 7 par end ho raha hai (jaise 49, 78, 98), to use round figure me badal kar add karein, fir extra minus kar dein.',
    explanation: '49 jodna mushkil lag sakta hai, lekin 50 jodna bohot aasan hai! Isliye +49 ki jagah (+50 - 1) karein.',
    formula: 'A + (Round - Offset)',
    steps: [
      'Near round number pehchano: 49 → 50 - 1, 38 → 40 - 2, 98 → 100 - 2',
      'Pehle aasaani se round number add karo: 67 + 50 = 117',
      'Offset minus karo: 117 - 1 = 116'
    ],
    example: {
      problem: '76 + 49',
      thoughtProcess: '76 + 50 = 126. Ab 1 minus karo → 125.',
      answer: '125'
    },
    sampleQuiz: {
      problem: '84 + 39',
      mentalTip: '84 + 40 = 124. Minus 1 = 123.',
      options: [121, 123, 125, 113],
      answer: 123
    }
  },
  {
    id: 'making-tens-friends',
    title: 'Ten-Pairs & Friends of 100 (दहाई और सैकड़ा मित्र)',
    hindiTitle: '10 aur 100 ke jode — DI me scan karein',
    category: 'Vedic Math',
    badge: '🎯 DI Special Scanner',
    summary: 'Vedic Sutra "Nikhilam Navatashcharamam Dashatah" — All from 9, last from 10.',
    explanation: 'Data Interpretation tables me jab 4-5 numbers add karne hon, to pehle un numbers ko jodi banaiye jinka sum 10 ya 100 banta hai (jaise 37 aur 63, 24 aur 76).',
    formula: 'Tens = 9 - d₁, Units = 10 - d₂',
    steps: [
      'Friends of 10: (1,9), (2,8), (3,7), (4,6), (5,5)',
      '100 ka complement nikalne ke liye: Pehla digit 9 se ghatao, aakhiri digit 10 se ghatao',
      'Example: 100 - 43 → 9 - 4 = 5, 10 - 3 = 7 → 57'
    ],
    example: {
      problem: 'Complement of 72 to 100',
      thoughtProcess: '9 - 7 = 2, 10 - 2 = 8 → 28.',
      answer: '28'
    },
    sampleQuiz: {
      problem: '100 - 67 = ? (or 67 + ? = 100)',
      mentalTip: '9 - 6 = 3, 10 - 7 = 3 → 33.',
      options: [43, 33, 37, 23],
      answer: 33
    }
  },
  {
    id: 'di-column-sum',
    title: 'DI Column Scan (कॉलम योग विधि)',
    hindiTitle: 'डीआई टेबल का योग — बिना कॉलम लिखे',
    category: 'DI Column Scan',
    badge: '📊 SSC CGL & Bank PO Master',
    summary: 'Data Interpretation me har question me total nikalna padta hai. Tens column ko pehle ek flow me jodein.',
    explanation: 'Exams me 42 + 67 + 38 + 53 ko rough sheet par upar-neeche likhne me 15 seconds waste hote hain. Direct screen par tens jodiye: 40+60=100, +30=130, +50=180. Fir units: 2+7=9, +8=17, +3=20. Total: 180+20=200!',
    formula: 'Σ(Tens) + Σ(Units)',
    steps: [
      'Pehle saare numbers ke Tens ko scan karke ek running total banayein',
      'Fir units ko scan karein (ya jahan 10 pair dikhe unhe pehle merge karein)',
      'Tens total aur Units total ko aapas me jodein'
    ],
    example: {
      problem: '42 + 67 + 38 + 53',
      thoughtProcess: 'Notice (42 + 38 = 80) and (67 + 53 = 120). 80 + 120 = 200!',
      answer: '200'
    },
    sampleQuiz: {
      problem: '35 + 48 + 25 + 52',
      mentalTip: 'Pairs: (35 + 25 = 60) aur (48 + 52 = 100) → 60 + 100 = 160!',
      options: [150, 160, 170, 158],
      answer: 160
    }
  },
  {
    id: 'decimal-speed-add',
    title: 'Decimal Rupee-Paise Split (दशमलव जोड़ विधि)',
    hindiTitle: 'दशमलव को रुपए-पैसे समझकर तुरंत जोड़ें',
    category: 'Decimals',
    badge: '🪙 No Confusion with Points',
    summary: 'Decimals se darna nahi hai — integer part ko alag jodein aur point ke baad wale ko alag.',
    explanation: '14.6 + 28.7 ko aise sochiye: 14 rupaye aur 28 rupaye = 42 rupaye. 60 paise aur 70 paise = 1 rupaya 30 paise (1.3). Total = 42 + 1.3 = 43.3.',
    formula: '(Int₁ + Int₂) + (Dec₁ + Dec₂)',
    steps: [
      'Whole numbers (पूर्णांक) ko jodein: 14 + 28 = 42',
      'Decimals ko jodein: 0.6 + 0.7 = 1.3',
      'Combine karein: 42 + 1.3 = 43.3'
    ],
    example: {
      problem: '23.8 + 35.5',
      thoughtProcess: '(23 + 35 = 58) + (0.8 + 0.5 = 1.3) = 59.3',
      answer: '59.3'
    },
    sampleQuiz: {
      problem: '18.7 + 24.6',
      mentalTip: '(18 + 24 = 42) aur (0.7 + 0.6 = 1.3) → 43.3',
      options: [42.3, 43.3, 44.3, 43.1],
      answer: 43.3
    }
  }
];

// ---------------------------------------------------------------------
// DYNAMIC QUESTION GENERATORS WITH REALISTIC DISTRACTORS
// ---------------------------------------------------------------------

/**
 * Generate 3 smart distractors for an addition answer:
 * - Off by 10 (missed carry or extra carry)
 * - Off by 1 or 2 (unit digit calculation error)
 * - Reversed / near round number
 */
export function generateDistractors(answer: number, isDecimal: boolean = false): number[] {
  const distractors = new Set<number>();
  const step = isDecimal ? 0.1 : 1;

  const offsets = isDecimal
    ? [1, -1, 0.1, -0.1, 0.2, -0.2, 1.1, -0.9]
    : [10, -10, 1, -1, 2, -2, 9, -9, 11, -11];

  let attempts = 0;
  while (distractors.size < 3 && attempts < 25) {
    attempts++;
    const offset = offsets[Math.floor(Math.random() * offsets.length)];
    let candidate = isDecimal ? Number((answer + offset).toFixed(2)) : answer + offset;
    if (candidate > 0 && candidate !== answer) {
      distractors.add(candidate);
    }
  }

  // Fallback if needed
  let fallbackStep = step;
  while (distractors.size < 3) {
    const candidate = isDecimal ? Number((answer + fallbackStep).toFixed(2)) : answer + fallbackStep;
    if (candidate !== answer) distractors.add(candidate);
    fallbackStep += step;
  }

  return [...distractors];
}

/**
 * Generates a clean random question for a specific stage
 */
export function generateStageQuestion(stageId: number): AdditionQuestion {
  let operands: number[] = [];
  let answer = 0;
  let breakdown = '';
  let isDecimal = false;

  switch (stageId) {
    case 1: {
      // Single Digits & Tens (e.g. 7+8, 9+6, 4+6)
      const a = Math.floor(Math.random() * 8) + 2; // 2..9
      const b = Math.floor(Math.random() * 8) + 2; // 2..9
      operands = [a, b];
      answer = a + b;
      breakdown = `Reflex: ${a} + ${b} = ${answer}`;
      break;
    }

    case 2: {
      // 2-digit + 1-digit with carry (e.g. 47 + 8)
      const tens = (Math.floor(Math.random() * 7) + 2) * 10; // 20..80
      const unitA = Math.floor(Math.random() * 5) + 5; // 5..9
      const a = tens + unitA;
      const b = Math.floor(Math.random() * 6) + 4; // 4..9 (ensures carry)
      operands = [a, b];
      answer = a + b;
      const nextTen = tens + 10;
      const needed = nextTen - a;
      const remainder = b - needed;
      breakdown = `Bridge Ten: (${a} + ${needed} = ${nextTen}) + ${remainder} = ${answer}`;
      break;
    }

    case 3: {
      // Make 100 (e.g. 64 + ? = 100)
      const a = Math.floor(Math.random() * 75) + 15; // 15..89
      answer = 100 - a;
      operands = [a, answer];
      // Display format: a + ? = 100
      const tensDiff = 9 - Math.floor(a / 10);
      const unitsDiff = 10 - (a % 10);
      breakdown = `Friends of 100: (9 - ${Math.floor(a / 10)} = ${tensDiff}) and (10 - ${a % 10} = ${unitsDiff}) → ${answer}`;
      break;
    }

    case 4: {
      // 2-Digit + 2-Digit (Simple / No Carry)
      const t1 = Math.floor(Math.random() * 4) + 2; // 2..5
      const u1 = Math.floor(Math.random() * 4) + 1; // 1..4
      const t2 = Math.floor(Math.random() * 3) + 1; // 1..3
      const u2 = Math.floor(Math.random() * (9 - u1)); // ensures u1+u2 <= 9
      const a = t1 * 10 + u1;
      const b = t2 * 10 + u2;
      operands = [a, b];
      answer = a + b;
      breakdown = `Left-to-Right: (${t1 * 10} + ${t2 * 10} = ${(t1 + t2) * 10}) + (${u1} + ${u2} = ${u1 + u2}) = ${answer}`;
      break;
    }

    case 5: {
      // 2-Digit + 2-Digit (Vedic Split with Carry)
      const a = Math.floor(Math.random() * 65) + 25; // 25..89
      const b = Math.floor(Math.random() * 65) + 25;
      operands = [a, b];
      answer = a + b;
      const tensA = Math.floor(a / 10) * 10;
      const tensB = Math.floor(b / 10) * 10;
      const unitA = a % 10;
      const unitB = b % 10;
      breakdown = `Vedic Split: (${tensA} + ${tensB} = ${tensA + tensB}) + (${unitA} + ${unitB} = ${unitA + unitB}) = ${answer}`;
      break;
    }

    case 6: {
      // Rounding / Compensation (one operand ends in 8 or 9)
      const base = Math.floor(Math.random() * 60) + 30; // 30..89
      const nearTen = (Math.floor(Math.random() * 4) + 2) * 10; // 20, 30, 40, 50
      const offset = Math.random() > 0.5 ? 1 : 2; // ends in 9 or 8
      const roundedAdd = nearTen - offset;
      operands = [base, roundedAdd];
      answer = base + roundedAdd;
      breakdown = `Rounding: ${base} + ${nearTen} = ${base + nearTen}, then minus ${offset} = ${answer}`;
      break;
    }

    case 7: {
      // 3-Digit + 2-Digit
      const hundreds = (Math.floor(Math.random() * 6) + 1) * 100; // 100..600
      const twoDigit1 = Math.floor(Math.random() * 70) + 25; // 25..94
      const a = hundreds + twoDigit1;
      const b = Math.floor(Math.random() * 70) + 25;
      operands = [a, b];
      answer = a + b;
      breakdown = `Keep Hundreds: ${hundreds} + (${twoDigit1} + ${b} = ${twoDigit1 + b}) = ${answer}`;
      break;
    }

    case 8: {
      // 3 Numbers Chain Addition (e.g. 24 + 38 + 19)
      const a = Math.floor(Math.random() * 40) + 15;
      const b = Math.floor(Math.random() * 40) + 15;
      const c = Math.floor(Math.random() * 30) + 12;
      operands = [a, b, c];
      answer = a + b + c;
      breakdown = `Chain: (${a} + ${b} = ${a + b}) + ${c} = ${answer}`;
      break;
    }

    case 9: {
      // 4 Numbers DI Table Series (e.g. 43 + 76 + 58 + 34)
      const a = Math.floor(Math.random() * 50) + 20;
      const b = Math.floor(Math.random() * 50) + 20;
      const c = Math.floor(Math.random() * 50) + 20;
      const d = Math.floor(Math.random() * 50) + 20;
      operands = [a, b, c, d];
      answer = a + b + c + d;
      const tensSum = (Math.floor(a / 10) + Math.floor(b / 10) + Math.floor(c / 10) + Math.floor(d / 10)) * 10;
      const unitsSum = (a % 10) + (b % 10) + (c % 10) + (d % 10);
      breakdown = `DI Column: Tens sum = ${tensSum}, Units sum = ${unitsSum} → ${tensSum} + ${unitsSum} = ${answer}`;
      break;
    }

    case 10:
    default: {
      // Decimal Additions (e.g. 14.6 + 28.7)
      isDecimal = true;
      const intA = Math.floor(Math.random() * 45) + 12;
      const decA = (Math.floor(Math.random() * 9) + 1) / 10;
      const a = Number((intA + decA).toFixed(1));

      const intB = Math.floor(Math.random() * 45) + 12;
      const decB = (Math.floor(Math.random() * 9) + 1) / 10;
      const b = Number((intB + decB).toFixed(1));

      operands = [a, b];
      answer = Number((a + b).toFixed(1));
      breakdown = `Decimal Split: (${intA} + ${intB} = ${intA + intB}) + (${decA} + ${decB} = ${(decA + decB).toFixed(1)}) = ${answer}`;
      break;
    }
  }

  // Display expression
  let displayExpression = '';
  if (stageId === 3) {
    displayExpression = `${operands[0]} + [ ? ] = 100`;
  } else {
    displayExpression = operands.join(' + ') + ' = ?';
  }

  // Options generation with smart distractors
  const distractors = generateDistractors(answer, isDecimal);
  const options = [...distractors, answer].sort(() => Math.random() - 0.5);

  return {
    id: `q_st${stageId}_${Date.now()}_${Math.random()}`,
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
 * Returns player title & rank badge based on XP points
 */
export function getAdditionRank(xp: number): {
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
      title: 'Addition Novice',
      hindiTitle: 'आरंभिक शिक्षार्थी',
      nextThreshold: 100,
      prevThreshold: 0,
      badge: '🌱 Level 1'
    };
  }
  if (xp < 300) {
    return {
      level: 2,
      title: 'Mental Adder',
      hindiTitle: 'माइंड कैलकुलेटर',
      nextThreshold: 300,
      prevThreshold: 100,
      badge: '⚡ Level 2'
    };
  }
  if (xp < 700) {
    return {
      level: 3,
      title: 'Split-Add Pro',
      hindiTitle: 'स्पीड मास्टर',
      nextThreshold: 700,
      prevThreshold: 300,
      badge: '🔥 Level 3'
    };
  }
  if (xp < 1500) {
    return {
      level: 4,
      title: 'DI Addition Ninja',
      hindiTitle: 'डीआई विशेषज्ञ',
      nextThreshold: 1500,
      prevThreshold: 700,
      badge: '🛡️ Level 4'
    };
  }
  return {
    level: 5,
    title: 'Human Calculator',
    hindiTitle: 'मानव कंप्यूटर (Grandmaster)',
    nextThreshold: 3000,
    prevThreshold: 1500,
    badge: '👑 Grandmaster'
  };
}
