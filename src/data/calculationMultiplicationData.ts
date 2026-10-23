/**
 * ═════════════════════════════════════════════════════════════════════
 * CALCULATION BOOSTER — MULTIPLICATION MASTERY DATA & GENERATORS
 * ═════════════════════════════════════════════════════════════════════
 * Comprehensive dataset & algorithmic question generators for mental
 * multiplication mastery from Single-Digit rapid fire to Vedic Crosswise
 * and DI Decimal multiplications for SSC CGL, CHSL, CPO, MTS & Banking exams.
 * ═════════════════════════════════════════════════════════════════════
 */

export interface MultiplicationStageConfig {
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

export interface MultiplicationTechnique {
  id: string;
  title: string;
  hindiTitle: string;
  category: 'Vedic Math' | 'Base 100' | '11-Magic' | 'Half & Double' | 'Special Patterns' | 'Decimals' | 'Rounding';
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

export interface MultiplicationQuestion {
  id: string;
  stageId?: number;
  operands: number[];
  displayExpression: string;
  answer: number;
  options: number[];
  mentalBreakdown: string;
  isDecimal?: boolean;
}

export interface MultiplicationStats {
  totalAnswered: number;
  totalCorrect: number;
  bestStreak: number;
  blitzHighScore: number;
  totalXp: number;
  fastestAnswerSec: number;
  stageStars: Record<number, number>; // stageId -> 1..3 stars
  unlockedStage: number; // 1 to 10
  weakPairs: Record<string, number>; // "23×47" -> count of mistakes
}

export const STORAGE_KEY_MULTIPLICATION_STATS = 'syllabus3d_multiplication_stats_v1';
export const STORAGE_KEY_MULTIPLICATION_WEAK = 'syllabus3d_multiplication_weak_v1';

export const DEFAULT_MULTIPLICATION_STATS: MultiplicationStats = {
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
export const MULTIPLICATION_STAGES: MultiplicationStageConfig[] = [
  {
    id: 1,
    name: 'Stage 1: Single-Digit Rapid Fire & Tables Reflex',
    hindiName: 'एक अंक तीव्र पहाड़ा (Tables 2–9 Reflex)',
    category: 'Foundation',
    description: 'Build instantaneous brain reflexes for single digits (e.g. 7 × 8 = 56, 9 × 6 = 54, 8 × 7 = 56) without reciting tables.',
    targetTimeSec: 25,
    questionCount: 10,
    techniqueTip: 'Zero table recitation! Memorize 7×8=56 and 8×9=72 as instant visual anchors.',
    sampleProblem: '7 × 8 = 56',
    badge: '⚡ Instant Reflex',
    accentColor: 'from-amber-500 to-yellow-500'
  },
  {
    id: 2,
    name: 'Stage 2: 2-Digit × 1-Digit Mental Split',
    hindiName: 'दो अंक × एक अंक (वैदिक स्प्लिट गुणा)',
    category: 'Foundation',
    description: 'Split tens and units mentally from left to right (e.g. 46 × 7 = 280 + 42 = 322).',
    targetTimeSec: 35,
    questionCount: 10,
    techniqueTip: 'Left-to-Right Split: 46 × 7 = (40 × 7) + (6 × 7) = 280 + 42 = 322.',
    sampleProblem: '46 × 7 = 322',
    badge: '🧱 Left-to-Right Split',
    accentColor: 'from-yellow-500 to-amber-600'
  },
  {
    id: 3,
    name: 'Stage 3: Multiply by 5, 25, 50 (Half & Double Rule)',
    hindiName: '5, 25, 50 से गुणा (आधा और शून्य ट्रिक)',
    category: 'Core Speed',
    description: 'Avoid tedious multiplication: ×5 means half and add 0; ×25 means quarter and add 00.',
    targetTimeSec: 30,
    questionCount: 10,
    techniqueTip: 'For ×5: Half the number and multiply by 10 (48 × 5 = 24 × 10 = 240). For ×25: Divide by 4 and multiply by 100.',
    sampleProblem: '48 × 5 = 240',
    badge: '🎯 Half & Double',
    accentColor: 'from-emerald-500 to-teal-500'
  },
  {
    id: 4,
    name: 'Stage 4: Multiply by 11 & 111 (Sandwich Rule)',
    hindiName: '11 और 111 से गुणा (सैंडविच सूत्र)',
    category: 'Core Speed',
    description: 'The famous sandwich trick: put the sum of digits in the middle (e.g. 43 × 11 = 473, 58 × 11 = 638).',
    targetTimeSec: 35,
    questionCount: 10,
    techniqueTip: 'For AB × 11: Write A, (A+B), B. If A+B has a carry, add it to A. (58 × 11: 5 | 13 | 8 → 638).',
    sampleProblem: '58 × 11 = 638',
    badge: '🥪 11-Sandwich Magic',
    accentColor: 'from-cyan-500 to-blue-500'
  },
  {
    id: 5,
    name: 'Stage 5: Base Method (Numbers Near 100)',
    hindiName: '100 के निकट संख्याओं का गुणा (निखिलं सूत्र)',
    category: 'Vedic Split',
    description: 'Instant 2-second multiplication for numbers close to 100 (e.g. 104 × 107 = 11128, 96 × 94 = 9024).',
    targetTimeSec: 40,
    questionCount: 10,
    techniqueTip: 'For 104 × 107: (+4) and (+7). Left part: 104 + 7 = 111. Right part: 4 × 7 = 28 → 11128.',
    sampleProblem: '104 × 107 = 11128',
    badge: '🔥 Base 100 Miracle',
    accentColor: 'from-indigo-500 to-purple-600'
  },
  {
    id: 6,
    name: 'Stage 6: Vedic Cross-Multiplication (Urdhva Tiryagbhyam 2×2)',
    hindiName: 'ऊर्ध्व-तिर्यग्भ्याम् (2-अंक × 2-अंक यूनिवर्सल विधि)',
    category: 'Vedic Split',
    description: 'The universal Vedic method to multiply any two 2-digit numbers mentally in 1 step.',
    targetTimeSec: 45,
    questionCount: 10,
    techniqueTip: 'Pattern I X I: Units×Units → Cross-multiply & sum → Tens×Tens. (32 × 41: 3×4=12 | 3×1+2×4=11 | 2×1=2 → 1312).',
    sampleProblem: '32 × 41 = 1312',
    badge: '⚡ Urdhva Crosswise',
    accentColor: 'from-purple-500 to-pink-600'
  },
  {
    id: 7,
    name: 'Stage 7: Rounding & Compensation (Multiply by 19, 29, 39, 49)',
    hindiName: 'निकटतम दहाई विधि (Round & Subtract)',
    category: 'Vedic Split',
    description: 'When multiplying by 19, 29, 39, multiply by 20, 30, 40 and subtract the original number once.',
    targetTimeSec: 40,
    questionCount: 10,
    techniqueTip: 'For 35 × 19: Calculate 35 × 20 = 700. Then subtract 35 = 665.',
    sampleProblem: '35 × 19 = 665',
    badge: '🛡️ Round & Compensate',
    accentColor: 'from-rose-500 to-red-500'
  },
  {
    id: 8,
    name: 'Stage 8: Same Tens & Units Sum = 10 (Antyayor Dashakepi)',
    hindiName: 'इकाई योग 10 और दहाई समान (अन्त्ययोर्दशकेऽपि)',
    category: 'DI Master',
    description: 'Direct 1-second Vedic rule when tens digits match and units add to 10 (e.g. 43 × 47 = 2021, 62 × 68 = 4216).',
    targetTimeSec: 35,
    questionCount: 10,
    techniqueTip: 'Tens × (Tens + 1) on the left, Units × Units on the right. 43 × 47 = 4 × 5 | 3 × 7 = 2021.',
    sampleProblem: '43 × 47 = 2021',
    badge: '🧱 Antyayo 10 Rule',
    accentColor: 'from-orange-500 to-amber-600'
  },
  {
    id: 9,
    name: 'Stage 9: 3-Digit × 1-Digit & Fast DI Percentages',
    hindiName: 'तीन अंक × एक अंक और डीआई प्रतिशत',
    category: 'DI Master',
    description: 'Essential for Data Interpretation percentage calculations (e.g. 342 × 6 = 2052, 18% of 450 = 81).',
    targetTimeSec: 45,
    questionCount: 10,
    techniqueTip: 'Expand from Hundreds: 342 × 6 = (300 × 6 = 1800) + (40 × 6 = 240) + (2 × 6 = 12) = 2052.',
    sampleProblem: '342 × 6 = 2052',
    badge: '📊 DI Percentage Ninja',
    accentColor: 'from-violet-600 to-indigo-600'
  },
  {
    id: 10,
    name: 'Stage 10: Decimal Multiplications (DI Revenue & Ratio Master)',
    hindiName: 'दशमलव गुणा (Exam DI Decimals Round)',
    category: 'DI Master',
    description: 'Master fast decimal multiplications for DI revenue, compound growth & inflation (e.g. 14.5 × 1.2, 2.4 × 3.5).',
    targetTimeSec: 50,
    questionCount: 10,
    techniqueTip: 'Multiply as integers, then count decimal places: 2.4 × 3.5 = (24 × 35) / 100 = 840 / 100 = 8.4.',
    sampleProblem: '2.4 × 3.5 = 8.4',
    badge: '👑 Multiplication Grandmaster',
    accentColor: 'from-amber-400 via-rose-500 to-purple-600'
  }
];

// ---------------------------------------------------------------------
// VEDIC & MENTAL TECHNIQUES (LESSONS & TRICKS)
// ---------------------------------------------------------------------
export const MULTIPLICATION_TECHNIQUES: MultiplicationTechnique[] = [
  {
    id: 'urdhva-tiryagbhyam',
    title: 'Urdhva Tiryagbhyam 2×2 (ऊर्ध्व-तिर्यग्भ्याम् — Vertical & Crosswise)',
    hindiTitle: 'वैदिक क्रॉस मल्टिप्लिकेशन — 1 लाइन में 2-अंक गुणा',
    category: 'Vedic Math',
    badge: '⭐ The Universal Vedic Sutra',
    summary: 'Ye Vedic Maths ka sabse powerful sutra hai jo kisi bhi do 2-digit numbers ko 1 line me multiply kar deta hai.',
    explanation: 'School me 3 lines likhne ki zaroorat nahi hai. Pattern yaad rakhein: I X I (Vertical, Crosswise, Vertical). Har step me units digit likhein aur tens digit ko carry aage forward karein.',
    formula: 'Step 1: U₁×U₂ | Step 2: (T₁×U₂ + T₂×U₁) | Step 3: T₁×T₂',
    steps: [
      'Step 1 (Vertical Right): Dono numbers ke Units ko multiply karein (2 × 1 = 2)',
      'Step 2 (Crosswise Middle): Cross multiply karke jodein: (3 × 1) + (4 × 2) = 3 + 8 = 11 (1 likhein, 1 carry)',
      'Step 3 (Vertical Left): Tens ko multiply karein: 3 × 4 = 12 + 1 (carry) = 13 → Answer = 1312'
    ],
    example: {
      problem: '32 × 41',
      thoughtProcess: 'Right: 2×1=2. Middle: (3×1)+(4×2)=11 (carry 1). Left: 3×4=12 + 1=13. Total = 1312.',
      answer: '1312'
    },
    sampleQuiz: {
      problem: '23 × 31',
      mentalTip: 'Right: 3×1=3. Cross: (2×1)+(3×3)=11 (carry 1). Left: 2×3=6 + 1=7 → 713.',
      options: [713, 613, 723, 703],
      answer: 713
    }
  },
  {
    id: 'base-100-nikhilam',
    title: 'Base Method Near 100 (100 के करीब संख्याओं का गुणा)',
    hindiTitle: 'निखिलं नवतश्चरमं दशतः — 100 बेस ट्रिक',
    category: 'Base 100',
    badge: '⚡ 2-Second Exam Magic',
    summary: 'Agar dono numbers 100 ke kareeb hain (jaise 104 × 107 ya 96 × 93), to pen chhuwe bina 2 second me answer nikalein.',
    explanation: '100 se deviation dekhein: 104 (+4) aur 107 (+7). Left side me kisi ek me doosre ka deviation add karein: 104 + 7 = 111. Right side me dono deviations ko multiply karein: 4 × 7 = 28. Merge karein: 11128!',
    formula: 'Left: A + dev(B) | Right: dev(A) × dev(B) [2 digits]',
    steps: [
      '100 se difference dekhein: 104 (+4), 107 (+7)',
      'Left part: 104 + 7 (ya 107 + 4) = 111',
      'Right part: 4 × 7 = 28 (hamesha 2 digits me likhein)',
      'Dono parts ko jod kar likhein: 11128'
    ],
    example: {
      problem: '106 × 108',
      thoughtProcess: 'Left: 106 + 8 = 114. Right: 6 × 8 = 48. Total = 11448.',
      answer: '11448'
    },
    sampleQuiz: {
      problem: '103 × 109',
      mentalTip: 'Left: 103 + 9 = 112. Right: 3 × 9 = 27 → 11227.',
      options: [11227, 11127, 11327, 11217],
      answer: 11227
    }
  },
  {
    id: 'sandwich-11-magic',
    title: 'The 11 & 111 Sandwich Rule (11 से गुणा का सैंडविच सूत्र)',
    hindiTitle: '11 से गुणा करने का 1-सेकंड सैंडविच नियम',
    category: '11-Magic',
    badge: '🥪 1-Second Reflex',
    summary: 'Kisi bhi number ko 11 se multiply karne ke liye first aur last digit ko baahar rakhein aur beech me aapas me jodte jayein.',
    explanation: '43 × 11 me 4 aur 3 ko baahar rakhein, beech me 4 + 3 = 7 daalein: 473. Agar beech me carry aaye (jaise 58 × 11 me 5 + 8 = 13), to 1 ko left digit me add karein: (5+1) 3 8 = 638.',
    formula: 'A | (A + B) | B',
    steps: [
      'Pehle Units digit ko waise hi likhein: 8',
      'Ab dono digits ko jodein: 5 + 8 = 13 (3 likhein, 1 carry)',
      'Left digit me carry add karein: 5 + 1 = 6 → Result: 638'
    ],
    example: {
      problem: '72 × 11',
      thoughtProcess: '7 aur 2 ke beech me (7 + 2 = 9) daalein: 792.',
      answer: '792'
    },
    sampleQuiz: {
      problem: '67 × 11',
      mentalTip: '6 | (6+7=13) | 7 → 737.',
      options: [737, 637, 747, 727],
      answer: 737
    }
  },
  {
    id: 'half-and-double-5-25',
    title: 'Half & Double Rule (5, 25, 50 से गुणा)',
    hindiTitle: 'एक को आधा करो, दूसरे को दोगुना करो',
    category: 'Half & Double',
    badge: '🎯 Zero Calculation',
    summary: '5, 25, ya 50 se multiply karne ke bajaye number ko 2 ya 4 se divide karein aur 10 ya 100 se multiply karein.',
    explanation: '5 = 10/2 aur 25 = 100/4. Isliye 48 × 5 nikalne ke liye 48 ka half karein (24) aur aage 0 laga dein: 240! 64 × 25 ke liye 64 ko 4 se divide karein (16) aur do zero laga dein: 1600!',
    formula: 'N × 5 = (N / 2) × 10  |  N × 25 = (N / 4) × 100',
    steps: [
      'Dekhein multiplier kya hai: 5 hai to divide by 2, 25 hai to divide by 4',
      'Even number ko aasaani se divide karein: 84 / 2 = 42',
      'Aage ek zero jod dein: 420'
    ],
    example: {
      problem: '84 × 25',
      thoughtProcess: '84 ko 4 se divide karo: 84 / 4 = 21. Do zero lagao: 2100.',
      answer: '2100'
    },
    sampleQuiz: {
      problem: '68 × 5',
      mentalTip: '68 / 2 = 34, fir 0 lagao → 340.',
      options: [340, 320, 350, 330],
      answer: 340
    }
  },
  {
    id: 'antyayo-dashakepi',
    title: 'Antyayor Dashakepi (इकाई योग 10 और दहाई समान)',
    hindiTitle: 'एकाधिकेन पूर्वेण — 43×47 और 75² ट्रिक',
    category: 'Special Patterns',
    badge: '👑 Vedic Super Hack',
    summary: 'Jab do numbers ke Tens digit same hon aur Units digit ka sum 10 ho (jaise 43 × 47, 62 × 68, 75 × 75).',
    explanation: 'Left side me Tens ko uske agle number se multiply karein: 4 × 5 = 20. Right side me dono Units ko multiply karein: 3 × 7 = 21. Dono ko mila dein: 2021!',
    formula: 'Left: T × (T + 1) | Right: U₁ × U₂ [2 digits]',
    steps: [
      'Pehle check karein: Tens same hain (4) aur Units sum 10 hai (3 + 7 = 10)',
      'Left part: 4 × (4 + 1) = 4 × 5 = 20',
      'Right part: 3 × 7 = 21 (2 digits)',
      'Answer combine karein: 2021'
    ],
    example: {
      problem: '62 × 68',
      thoughtProcess: 'Left: 6 × 7 = 42. Right: 2 × 8 = 16. Total = 4216.',
      answer: '4216'
    },
    sampleQuiz: {
      problem: '83 × 87',
      mentalTip: 'Left: 8 × 9 = 72. Right: 3 × 7 = 21 → 7221.',
      options: [7221, 7121, 7321, 7231],
      answer: 7221
    }
  },
  {
    id: 'round-and-compensate-mul',
    title: 'Round & Compensate for 19, 29, 49, 99 (निकटतम गुणा)',
    hindiTitle: '19, 29, 99 से गुणा — राउंड-अप और घटाव',
    category: 'Rounding',
    badge: '⚡ Lightning Fast for .9',
    summary: '19 ya 29 se multiply karte waqt 20 ya 30 se multiply karein aur aakhri me ek baar original number minus kar dein.',
    explanation: '35 × 19 ko aise sochiye: 35 × 20 = 700. Ab ek extra 35 minus kar dein: 700 - 35 = 665. Zero pen-paper, 100% mental!',
    formula: 'A × (Round - 1) = (A × Round) - A',
    steps: [
      'Near round number se multiply karein: 35 × 20 = 700',
      'Original number ko ek baar minus karein: 700 - 35 = 665',
      'Result turant confirm karein: 665'
    ],
    example: {
      problem: '42 × 19',
      thoughtProcess: '42 × 20 = 840. 840 - 42 = 798.',
      answer: '798'
    },
    sampleQuiz: {
      problem: '25 × 29',
      mentalTip: '25 × 30 = 750. 750 - 25 = 725.',
      options: [725, 715, 735, 745],
      answer: 725
    }
  }
];

// ---------------------------------------------------------------------
// DYNAMIC QUESTION GENERATORS WITH REALISTIC DISTRACTORS
// ---------------------------------------------------------------------

/**
 * Generate 3 smart distractors for a multiplication answer:
 * - Off by 10 or 100 (carry calculation error)
 * - Off by original multiplier (missed/extra single count)
 * - Reversed / near unit digit error
 */
export function generateMultiplicationDistractors(answer: number, isDecimal: boolean = false): number[] {
  const distractors = new Set<number>();
  const step = isDecimal ? 0.1 : 1;

  const offsets = isDecimal
    ? [1, -1, 0.1, -0.1, 0.2, -0.2, 1.1, -0.9]
    : [10, -10, 100, -100, 2, -2, 5, -5, 12, -12, 20, -20];

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
 * Generates a clean random question for a specific multiplication stage
 */
export function generateMultiplicationStageQuestion(stageId: number): MultiplicationQuestion {
  let operands: number[] = [];
  let answer = 0;
  let breakdown = '';
  let isDecimal = false;

  switch (stageId) {
    case 1: {
      // Single-Digit Rapid Fire & Tables Reflex (e.g. 7 × 8, 9 × 6, 8 × 7)
      const a = Math.floor(Math.random() * 8) + 2; // 2..9
      const b = Math.floor(Math.random() * 8) + 2; // 2..9
      operands = [a, b];
      answer = a * b;
      breakdown = `Table Reflex: ${a} × ${b} = ${answer}`;
      break;
    }

    case 2: {
      // 2-digit × 1-digit mental split (e.g. 46 × 7)
      const tens = (Math.floor(Math.random() * 7) + 2) * 10; // 20..80
      const unitA = Math.floor(Math.random() * 8) + 2; // 2..9
      const a = tens + unitA;
      const b = Math.floor(Math.random() * 7) + 3; // 3..9
      operands = [a, b];
      answer = a * b;
      breakdown = `Mental Split: (${tens} × ${b} = ${tens * b}) + (${unitA} × ${b} = ${unitA * b}) = ${answer}`;
      break;
    }

    case 3: {
      // Multiply by 5, 25, 50 (Half & Double rule)
      const multipliers = [5, 25, 50];
      const b = multipliers[Math.floor(Math.random() * multipliers.length)];
      // Choose an even number
      const evenBase = (Math.floor(Math.random() * 30) + 12) * 2; // 24..82 even
      const a = b === 25 ? (Math.floor(Math.random() * 20) + 4) * 4 : evenBase; // div by 4 for 25
      operands = [a, b];
      answer = a * b;
      if (b === 5) {
        breakdown = `Half & Zero: (${a} / 2 = ${a / 2}) × 10 = ${answer}`;
      } else if (b === 25) {
        breakdown = `Quarter & 100: (${a} / 4 = ${a / 4}) × 100 = ${answer}`;
      } else {
        breakdown = `Half & 100: (${a} / 2 = ${a / 2}) × 100 = ${answer}`;
      }
      break;
    }

    case 4: {
      // Multiply by 11 & 111 (Sandwich rule)
      const a = Math.floor(Math.random() * 70) + 15; // 15..84
      operands = [a, 11];
      answer = a * 11;
      const tensA = Math.floor(a / 10);
      const unitsA = a % 10;
      const sum = tensA + unitsA;
      breakdown = `11 Sandwich: ${tensA} | (${tensA} + ${unitsA} = ${sum}) | ${unitsA} → ${answer}`;
      break;
    }

    case 5: {
      // Base Method Near 100 (e.g. 104 × 107, 96 × 94)
      const isAbove = Math.random() > 0.4;
      if (isAbove) {
        const devA = Math.floor(Math.random() * 8) + 2; // 2..9
        const devB = Math.floor(Math.random() * 8) + 2; // 2..9
        const a = 100 + devA;
        const b = 100 + devB;
        operands = [a, b];
        answer = a * b;
        breakdown = `Base 100 (+${devA}, +${devB}): Left = ${a} + ${devB} = ${a + devB}, Right = ${devA} × ${devB} = ${devA * devB < 10 ? '0' + (devA * devB) : devA * devB} → ${answer}`;
      } else {
        const devA = Math.floor(Math.random() * 7) + 2; // 2..8
        const devB = Math.floor(Math.random() * 7) + 2; // 2..8
        const a = 100 - devA;
        const b = 100 - devB;
        operands = [a, b];
        answer = a * b;
        breakdown = `Base 100 (-${devA}, -${devB}): Left = ${a} - ${devB} = ${a - devB}, Right = (-${devA}) × (-${devB}) = ${devA * devB < 10 ? '0' + (devA * devB) : devA * devB} → ${answer}`;
      }
      break;
    }

    case 6: {
      // Vedic Cross-Multiplication (Urdhva Tiryagbhyam 2×2)
      const a = Math.floor(Math.random() * 40) + 21; // 21..60
      const b = Math.floor(Math.random() * 40) + 21;
      operands = [a, b];
      answer = a * b;
      const t1 = Math.floor(a / 10), u1 = a % 10;
      const t2 = Math.floor(b / 10), u2 = b % 10;
      breakdown = `Vedic Crosswise: (${t1}×${t2}) | (${t1}×${u2} + ${t2}×${u1}) | (${u1}×${u2}) → ${answer}`;
      break;
    }

    case 7: {
      // Rounding & Compensation (Multiply by 19, 29, 39, 49)
      const roundBases = [20, 30, 40, 50];
      const roundTen = roundBases[Math.floor(Math.random() * roundBases.length)];
      const b = roundTen - 1; // 19, 29, 39, 49
      const a = Math.floor(Math.random() * 35) + 15; // 15..49
      operands = [a, b];
      answer = a * b;
      breakdown = `Round & Subtract: (${a} × ${roundTen} = ${a * roundTen}) - ${a} = ${answer}`;
      break;
    }

    case 8: {
      // Same Tens & Units Sum = 10 (Antyayor Dashakepi)
      const tens = Math.floor(Math.random() * 7) + 3; // 3..9
      const u1 = Math.floor(Math.random() * 8) + 1; // 1..8
      const u2 = 10 - u1;
      const a = tens * 10 + u1;
      const b = tens * 10 + u2;
      operands = [a, b];
      answer = a * b;
      const rightStr = u1 * u2 < 10 ? '0' + (u1 * u2) : (u1 * u2).toString();
      breakdown = `Antyayor 10: Left = ${tens} × ${tens + 1} = ${tens * (tens + 1)}, Right = ${u1} × ${u2} = ${rightStr} → ${answer}`;
      break;
    }

    case 9: {
      // 3-Digit × 1-Digit & Fast DI Percentages (e.g. 342 × 6)
      const hundreds = (Math.floor(Math.random() * 5) + 2) * 100; // 200..600
      const twoDigit = Math.floor(Math.random() * 60) + 15; // 15..74
      const a = hundreds + twoDigit;
      const b = Math.floor(Math.random() * 6) + 3; // 3..8
      operands = [a, b];
      answer = a * b;
      breakdown = `Hundreds Expand: (${hundreds} × ${b} = ${hundreds * b}) + (${twoDigit} × ${b} = ${twoDigit * b}) = ${answer}`;
      break;
    }

    case 10:
    default: {
      // Decimal Multiplications (e.g. 2.4 × 3.5, 14.5 × 1.2)
      isDecimal = true;
      const intA = Math.floor(Math.random() * 20) + 10; // 10..29
      const a = Number((intA / 10).toFixed(1)); // 1.0..2.9
      const intB = Math.floor(Math.random() * 30) + 12; // 12..41
      const b = Number((intB / 10).toFixed(1)); // 1.2..4.1

      operands = [a, b];
      answer = Number((a * b).toFixed(2));
      breakdown = `Decimal Shift: (${intA} × ${intB} = ${intA * intB}) / 100 = ${answer}`;
      break;
    }
  }

  // Display expression
  const displayExpression = `${operands[0]} × ${operands[1]} = ?`;

  // Options generation with smart distractors
  const distractors = generateMultiplicationDistractors(answer, isDecimal);
  const options = [...distractors, answer].sort(() => Math.random() - 0.5);

  return {
    id: `q_mul_st${stageId}_${Date.now()}_${Math.random()}`,
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
 * Returns player title & rank badge based on Multiplication XP points
 */
export function getMultiplicationRank(xp: number): {
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
      title: 'Multiplication Novice',
      hindiTitle: 'आरंभिक शिक्षार्थी',
      nextThreshold: 100,
      prevThreshold: 0,
      badge: '🌱 Level 1'
    };
  }
  if (xp < 300) {
    return {
      level: 2,
      title: 'Mental Multiplier',
      hindiTitle: 'माइंड कैलकुलेटर',
      nextThreshold: 300,
      prevThreshold: 100,
      badge: '⚡ Level 2'
    };
  }
  if (xp < 700) {
    return {
      level: 3,
      title: 'Vedic Crosswise Pro',
      hindiTitle: 'स्पीड मास्टर',
      nextThreshold: 700,
      prevThreshold: 300,
      badge: '🔥 Level 3'
    };
  }
  if (xp < 1500) {
    return {
      level: 4,
      title: 'DI Multiplication Ninja',
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
