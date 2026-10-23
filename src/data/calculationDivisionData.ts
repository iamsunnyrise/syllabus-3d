/**
 * ═════════════════════════════════════════════════════════════════════
 * CALCULATION BOOSTER — DIVISION MASTERY DATA & GENERATORS
 * ═════════════════════════════════════════════════════════════════════
 * Comprehensive dataset & algorithmic question generators for mental
 * division mastery: from Single-Digit rapid fire to Left-to-Right Chunking,
 * Double-and-Shift rule, Vedic Dhwajank (Flag method), and DI Decimals
 * for SSC CGL, CHSL, CPO, MTS & Banking exams.
 * ═════════════════════════════════════════════════════════════════════
 */

export interface DivisionStageConfig {
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

export interface DivisionTechnique {
  id: string;
  title: string;
  hindiTitle: string;
  category: 'Vedic Math' | 'Chunking' | 'Double & Shift' | 'Divisibility' | 'DI Approximation' | 'Decimals';
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

export interface DivisionQuestion {
  id: string;
  stageId?: number;
  operands: number[]; // [dividend, divisor]
  displayExpression: string;
  answer: number;
  options: number[];
  mentalBreakdown: string;
  isDecimal?: boolean;
}

export interface DivisionStats {
  totalAnswered: number;
  totalCorrect: number;
  bestStreak: number;
  blitzHighScore: number;
  totalXp: number;
  fastestAnswerSec: number;
  stageStars: Record<number, number>; // stageId -> 1..3 stars
  unlockedStage: number; // 1 to 10
  weakPairs: Record<string, number>; // "168÷24" -> count of mistakes
}

export const STORAGE_KEY_DIVISION_STATS = 'syllabus3d_division_stats_v1';
export const STORAGE_KEY_DIVISION_WEAK = 'syllabus3d_division_weak_v1';

export const DEFAULT_DIVISION_STATS: DivisionStats = {
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
export const DIVISION_STAGES: DivisionStageConfig[] = [
  {
    id: 1,
    name: 'Stage 1: Single-Digit Direct Division & Tables Reflex',
    hindiName: 'एक अंक सीधा भाग (Tables 2–9 Reverse Reflex)',
    category: 'Foundation',
    description: 'Instant reflex for basic division (e.g. 56 ÷ 8 = 7, 72 ÷ 9 = 8, 54 ÷ 6 = 9) without reciting tables.',
    targetTimeSec: 25,
    questionCount: 10,
    techniqueTip: 'Zero table recitation! Memorize 56 ÷ 8 = 7 and 72 ÷ 9 = 8 as instant visual anchors.',
    sampleProblem: '56 ÷ 8 = 7',
    badge: '⚡ Instant Reflex',
    accentColor: 'from-emerald-500 to-teal-500'
  },
  {
    id: 2,
    name: 'Stage 2: 2-Digit & 3-Digit Chunking (Left-to-Right Split)',
    hindiName: 'दो व तीन अंक विभाजन (Left-to-Right मानसिक स्प्लिट)',
    category: 'Foundation',
    description: 'Split the dividend into convenient chunks from left to right (e.g. 276 ÷ 6 = (240 + 36) ÷ 6 = 40 + 6 = 46).',
    targetTimeSec: 35,
    questionCount: 10,
    techniqueTip: 'Break into comfortable multiples: 432 ÷ 6 = (420 ÷ 6) + (12 ÷ 6) = 70 + 2 = 72.',
    sampleProblem: '276 ÷ 6 = 46',
    badge: '🧱 Chunking Split',
    accentColor: 'from-teal-500 to-emerald-600'
  },
  {
    id: 3,
    name: 'Stage 3: Divide by 5, 25, 50 (Double & Shift Rule)',
    hindiName: '5, 25, 50 से भाग (दोगुना और दशमलव शिफ्ट ट्रिक)',
    category: 'Core Speed',
    description: 'Never divide by 5 or 25 manually: double and divide by 10 for 5; quadruple and divide by 100 for 25.',
    targetTimeSec: 30,
    questionCount: 10,
    techniqueTip: 'For ÷5: Double the number and remove a 0 (145 ÷ 5 = 290 ÷ 10 = 29). For ÷25: Multiply by 4 and divide by 100.',
    sampleProblem: '145 ÷ 5 = 29',
    badge: '🎯 Double & Shift',
    accentColor: 'from-cyan-500 to-teal-600'
  },
  {
    id: 4,
    name: 'Stage 4: Common Factor Cancellation (Cancel Down)',
    hindiName: 'उभयनिष्ठ गुणनखंड काटना (Cancel Down Rule)',
    category: 'Core Speed',
    description: 'Reduce both dividend and divisor by common factors (4, 6, 8, 9) before solving (e.g. 192 ÷ 24 = 24 ÷ 3 = 8).',
    targetTimeSec: 35,
    questionCount: 10,
    techniqueTip: 'Simplify first: 192 ÷ 24 → divide both by 8 to get 24 ÷ 3 = 8 in 1 second.',
    sampleProblem: '192 ÷ 24 = 8',
    badge: '✂️ Factor Reduction',
    accentColor: 'from-sky-500 to-blue-600'
  },
  {
    id: 5,
    name: 'Stage 5: Vedic Division by 9 & 99 (Paravartya Yojayet)',
    hindiName: '9 और 99 से वैदिक भाग (परावर्त्य योजयेत् सूत्र)',
    category: 'Vedic Split',
    description: 'Special Vedic shortcut to divide any number by 9 or 99 using running digit sums.',
    targetTimeSec: 40,
    questionCount: 10,
    techniqueTip: 'For ÷9: Keep first digit, add to next to find quotient. (234 ÷ 9 = 26).',
    sampleProblem: '234 ÷ 9 = 26',
    badge: '🔥 Paravartya Vedic',
    accentColor: 'from-emerald-600 to-teal-700'
  },
  {
    id: 6,
    name: 'Stage 6: Vedic Dhwajank / Flag Method (2-Digit Divisor)',
    hindiName: 'ध्वजांक सूत्र (2-अंक भाजक से 1 लाइन भाग)',
    category: 'Vedic Split',
    description: 'The master Vedic method to divide large numbers by 2-digit divisors mentally in a single pass.',
    targetTimeSec: 45,
    questionCount: 10,
    techniqueTip: 'Split divisor into Base + Flag: Divide by base, mentally subtract flag × current quotient.',
    sampleProblem: '736 ÷ 23 = 32',
    badge: '⚡ Dhwajank Flag Method',
    accentColor: 'from-teal-600 to-cyan-600'
  },
  {
    id: 7,
    name: 'Stage 7: Remainder & Modulo Reflex (शेषफल व विभाज्यता)',
    hindiName: 'शेषफल और विभाज्यता (Digital Root & Modulo)',
    category: 'Vedic Split',
    description: 'Find remainders instantly for 3, 7, 8, 9, 11 using digital root and alternating sums without full division.',
    targetTimeSec: 35,
    questionCount: 10,
    techniqueTip: 'Remainder for 9 = Digital sum (257 mod 9 = 2+5+7 = 14 → 1+4 = 5). For 11 = Alternating difference.',
    sampleProblem: '257 mod 9 = 5',
    badge: '🛡️ Remainder Ninja',
    accentColor: 'from-emerald-500 to-green-600'
  },
  {
    id: 8,
    name: 'Stage 8: Reciprocal Decimals (1/4, 1/8, 1/7, 1/12, 1/16)',
    hindiName: 'व्युत्क्रम भिन्न से दशमलव (Reciprocal Conversion)',
    category: 'DI Master',
    description: 'Instant conversion of fraction quotients to decimals essential for exam Data Interpretation.',
    targetTimeSec: 40,
    questionCount: 10,
    techniqueTip: 'Memorize base units: 1/8 = 0.125 (so 3/8 = 0.375, 5/8 = 0.625); 1/7 ≈ 0.1428; 1/12 ≈ 0.0833.',
    sampleProblem: '5 ÷ 8 = 0.625',
    badge: '📊 Reciprocal Fractions',
    accentColor: 'from-teal-500 to-indigo-600'
  },
  {
    id: 9,
    name: 'Stage 9: Decimal Division & Power of 10 Shifts',
    hindiName: 'दशमलव भाग (DI Revenue & Ratio Master)',
    category: 'DI Master',
    description: 'Master fast decimal division with trailing zeros and varying decimal places (e.g. 4.32 ÷ 0.6, 1.44 ÷ 0.12).',
    targetTimeSec: 45,
    questionCount: 10,
    techniqueTip: 'Shift decimal places equally: 4.32 ÷ 0.6 = 43.2 ÷ 6 = 7.2.',
    sampleProblem: '4.32 ÷ 0.6 = 7.2',
    badge: '👑 Decimal Mastery',
    accentColor: 'from-cyan-600 to-blue-700'
  },
  {
    id: 10,
    name: 'Stage 10: High-Speed DI Approximation (Percentage & Ratio Estimations)',
    hindiName: 'डीआई प्रतिशत और अनुपात सन्निकटन (10% & 1% Slicing)',
    category: 'DI Master',
    description: 'Fast approximate division for Data Interpretation tables and pie charts without lengthy calculations.',
    targetTimeSec: 50,
    questionCount: 10,
    techniqueTip: 'The 10% & 1% rule: 348 ÷ 560 → 10% = 56, 60% = 336, remaining 12 is ~2% → ≈ 62.1%.',
    sampleProblem: '348 ÷ 560 ≈ 62.1%',
    badge: '🌟 Division Grandmaster',
    accentColor: 'from-emerald-400 via-teal-500 to-cyan-600'
  }
];

// ---------------------------------------------------------------------
// VEDIC & MENTAL TECHNIQUES (LESSONS & TRICKS)
// ---------------------------------------------------------------------
export const DIVISION_TECHNIQUES: DivisionTechnique[] = [
  {
    id: 'double-and-shift-div',
    title: 'Divide by 5, 25, 50 (The Double & Shift Method)',
    hindiTitle: '5, 25, 50 से भाग — दोगुना और दशमलव शिफ्ट',
    category: 'Double & Shift',
    badge: '⭐ The Core Speed Booster',
    summary: '5, 25 ya 50 se kabhi bhi lamba bhag mat kijiye. Sankhya ko dugna karke 10 ya 100 se divide karein.',
    explanation: 'Kyuki 5 = 10 / 2, kisi bhi sankhya ko 5 se divide karna matlab use 2 se multiply karna aur 10 se divide karna hai. Same way 25 = 100 / 4, toh 4 se multiply karke 100 se divide karein.',
    formula: 'N ÷ 5 = (N × 2) ÷ 10 | N ÷ 25 = (N × 4) ÷ 100',
    steps: [
      'Step 1 (Divide by 5): Diye gaye number ka double karein: 145 × 2 = 290',
      'Step 2: Aakhri se ek decimal place shift karein: 290 ÷ 10 = 29',
      'Step 3 (Divide by 25): Diye gaye number ko 4 se guna karein: 350 × 4 = 1400',
      'Step 4: Do decimal place shift karein: 1400 ÷ 100 = 14'
    ],
    example: {
      problem: '145 ÷ 5',
      thoughtProcess: '145 × 2 = 290. Ek zero hataya → 29. Instant answer without pen!',
      answer: '29'
    },
    sampleQuiz: {
      problem: '235 ÷ 5',
      mentalTip: 'Double of 235 is 470. Remove zero → 47.',
      options: [47, 45, 49, 43],
      answer: 47
    }
  },
  {
    id: 'left-to-right-chunking',
    title: 'Left-to-Right Mental Chunking (विभाजन स्प्लिट विधि)',
    hindiTitle: 'सुविधाजनक टुकड़ों में तोड़कर तुरंत भाग',
    category: 'Chunking',
    badge: '🧱 Foundation Strategy',
    summary: 'Badi sankhya ko aise do tukdo me todein jo divisor ke table me turant aate hon.',
    explanation: '432 ÷ 6 ko traditional long division ki jagah 420 aur 12 me todein. 420 ÷ 6 = 70, aur 12 ÷ 6 = 2. Dono ko jodein: 70 + 2 = 72. 100% mental calculation!',
    formula: '(A + B) ÷ D = (A ÷ D) + (B ÷ D)',
    steps: [
      'Step 1: Dividend me divisor ka sabse bada comfortable round multiple dekhein: 276 ÷ 6 me 240',
      'Step 2: Bachha hua hissa dekhein: 276 - 240 = 36',
      'Step 3: Dono ko alag alag divide karein: 240 ÷ 6 = 40, aur 36 ÷ 6 = 6',
      'Step 4: Dono quotients ko jodein: 40 + 6 = 46'
    ],
    example: {
      problem: '276 ÷ 6',
      thoughtProcess: '276 = 240 + 36. 240 ÷ 6 = 40. 36 ÷ 6 = 6. 40 + 6 = 46.',
      answer: '46'
    },
    sampleQuiz: {
      problem: '378 ÷ 6',
      mentalTip: '378 = 360 + 18. 360/6 = 60. 18/6 = 3 → 63.',
      options: [63, 61, 65, 59],
      answer: 63
    }
  },
  {
    id: 'cancel-down-factors',
    title: 'Common Factor Reduction (Cancel Down Rule)',
    hindiTitle: 'भाजक व भाज्य को छोटा करना (सरलीकरण)',
    category: 'Chunking',
    badge: '✂️ Simplification Hack',
    summary: 'Jab divisor 2-digit ho (jaise 18, 24, 28, 36), pehle dono ko kisi common factor se kaat kar aasan banayein.',
    explanation: '192 ÷ 24 dekhne me mushkil lagta hai, lekin dono 8 se katate hain: 192 ÷ 8 = 24 aur 24 ÷ 8 = 3. Ab sawal ban gaya 24 ÷ 3 = 8! Pura calculation 1 second me solve.',
    formula: '(A ÷ k) ÷ (B ÷ k) = A ÷ B',
    steps: [
      'Step 1: Check karein kya dono numbers kisi common number (4, 6, 8, 9) se divisible hain',
      'Step 2: Dono ko divide karke chhota karein: 252 ÷ 28 → divide both by 7 → 36 ÷ 4',
      'Step 3: Direct quotient nikalein: 36 ÷ 4 = 9'
    ],
    example: {
      problem: '252 ÷ 28',
      thoughtProcess: 'Dono 7 ke table me aate hain: 252 ÷ 7 = 36, 28 ÷ 7 = 4. Ab 36 ÷ 4 = 9.',
      answer: '9'
    },
    sampleQuiz: {
      problem: '216 ÷ 24',
      mentalTip: 'Divide both by 8: 27 ÷ 3 = 9.',
      options: [9, 8, 11, 7],
      answer: 9
    }
  },
  {
    id: 'vedic-dhwajank-flag',
    title: 'Vedic Dhwajank Sutra (ध्वजांक सूत्र — The Flag Method)',
    hindiTitle: 'वैदिक ध्वजांक विधि — 1 लाइन में बड़ा भाग',
    category: 'Vedic Math',
    badge: '🔥 Universal Vedic Master',
    summary: 'Vedic Maths ka sabse prasiddh sutra jo kisi bhi 2 ya 3 digit divisor se mental division sambhav banata hai.',
    explanation: 'Divisor ke pehle digit ko "Base" mante hain aur aakhri digit ko "Flag" (Dhwaj). Har step me Base se divide karke quotient likhte hain aur agle step me Flag × Quotient ko minus kar dete hain.',
    formula: 'Adjusted Dividend = Current Remainder - (Flag × Current Quotient)',
    steps: [
      'Step 1: Divisor 23 me Base = 2 aur Flag = 3',
      'Step 2: 736 me pehle digit 7 ko 2 se divide karein: Quotient = 3, Remainder = 1',
      'Step 3: Remainder 1 aur agla digit 3 milkar bana 13. Isme se Flag × Quotient (3 × 3 = 9) minus karein: 13 - 9 = 4',
      'Step 4: Ab 4 ko Base 2 se divide karein: Quotient = 2, Remainder = 0. Answer = 32!'
    ],
    example: {
      problem: '736 ÷ 23',
      thoughtProcess: 'Base 2, Flag 3. 7/2 = 3 rem 1. (13 - 3×3) = 4. 4/2 = 2 rem 0. Final = 32.',
      answer: '32'
    },
    sampleQuiz: {
      problem: '943 ÷ 41',
      mentalTip: 'Base 4, Flag 1. 9/4 = 2 rem 1. (14 - 1×2) = 12. 12/4 = 3 rem 0 → 23.',
      options: [23, 21, 24, 22],
      answer: 23
    }
  },
  {
    id: 'remainder-digital-root',
    title: 'Digital Sum & Alternating Sum for Remainders (शेषफल सूत्र)',
    hindiTitle: 'बिना भाग दिए शेषफल (9 और 11 का शेषफल जादू)',
    category: 'Divisibility',
    badge: '🛡️ Modulo & Remainder',
    summary: '9 ya 11 se kisi bhi sankhya ko divide karne par remainder bina actual division ke 1 second me nikalein.',
    explanation: 'Kisi number ko 9 se divide karne par vahi remainder aata hai jo uske digits ka sum hota hai. 11 ke liye alternate digits ka difference nikalein.',
    formula: 'N mod 9 = Digital Root of N | N mod 11 = (Odd places sum) - (Even places sum)',
    steps: [
      'Step 1 (For 9): Digits ko add karein: 257 → 2 + 5 + 7 = 14',
      'Step 2: Phir se add karein jab tak single digit na mile: 1 + 4 = 5. Remainder = 5!',
      'Step 3 (For 11): 348 me (8 + 3) - 4 = 11 - 4 = 7. Remainder = 7!'
    ],
    example: {
      problem: '358 mod 9',
      thoughtProcess: '3 + 5 + 8 = 16 → 1 + 6 = 7. Remainder is 7.',
      answer: '7'
    },
    sampleQuiz: {
      problem: '467 mod 9',
      mentalTip: '4 + 6 + 7 = 17 → 1 + 7 = 8.',
      options: [8, 6, 7, 5],
      answer: 8
    }
  },
  {
    id: 'di-10-percent-slicing',
    title: 'DI Approximation: The 10% & 1% Slicing Method',
    hindiTitle: 'डीआई में 10% और 1% स्लाइसिंग से तुरंत प्रतिशत व भाग',
    category: 'DI Approximation',
    badge: '📊 Exam DI Super Weapon',
    summary: 'SSC aur Banking DI questions me actual division karne ki jagah base ke 10% aur 1% se answer estimate karein.',
    explanation: 'Agar pucha jaye 348 / 560 kitna percent hai: 560 ka 10% = 56. 60% = 56 × 6 = 336. Ab bacha 348 - 336 = 12. 1% = 5.6, toh 12 lagbhag 2% hua. Total = 60% + 2% ≈ 62.1%. Options me 62% turant mark karein!',
    formula: 'Quotient ≈ (Anchor% × Base + Remainder) / Base',
    steps: [
      'Step 1: Denominator ka 10% aur 1% mentally note karein (560 me 10% = 56, 1% = 5.6)',
      'Step 2: Dekhein numerator 10% ke kitne multiple ke paas hai: 56 × 6 = 336 (60%)',
      'Step 3: Gap dekhein: 348 - 336 = 12',
      'Step 4: Gap ko 1% (5.6) se divide karein: 12 / 5.6 ≈ 2.1% → Total ≈ 62.1%'
    ],
    example: {
      problem: '252 ÷ 400 (as %)',
      thoughtProcess: '10% of 400 = 40. 40 × 6 = 240 (60%). Remaining 12 is 3% of 400 (4 × 3 = 12). 60 + 3 = 63%.',
      answer: '63%'
    },
    sampleQuiz: {
      problem: '180 ÷ 300 (as %)',
      mentalTip: '10% = 30. 30 × 6 = 180 → exactly 60%.',
      options: [60, 55, 65, 50],
      answer: 60
    }
  }
];

// ---------------------------------------------------------------------
// DISTRACTORS & QUESTION GENERATORS
// ---------------------------------------------------------------------

/**
 * Generates 3 smart believable wrong options (distractors)
 */
export function generateDivisionDistractors(answer: number, isDecimal = false): number[] {
  const distractors = new Set<number>();
  const step = isDecimal ? 0.1 : 1;

  const offsets = isDecimal
    ? [0.1, -0.1, 0.2, -0.2, 0.05, -0.05, 1, -1]
    : [1, -1, 2, -2, 5, -5, 10, -10, 3, -3];

  let attempts = 0;
  while (distractors.size < 3 && attempts < 25) {
    attempts++;
    const offset = offsets[Math.floor(Math.random() * offsets.length)];
    const candidate = isDecimal ? Number((answer + offset).toFixed(3)) : answer + offset;
    if (candidate > 0 && candidate !== answer) {
      distractors.add(candidate);
    }
  }

  // Fallback if needed
  let fallbackStep = step;
  while (distractors.size < 3) {
    const candidate = isDecimal ? Number((answer + fallbackStep).toFixed(3)) : answer + fallbackStep;
    if (candidate > 0 && candidate !== answer) distractors.add(candidate);
    fallbackStep += step;
  }

  return [...distractors];
}

/**
 * Generates a clean random question for a specific division stage
 */
export function generateDivisionStageQuestion(stageId: number): DivisionQuestion {
  let operands: number[] = [];
  let answer = 0;
  let breakdown = '';
  let isDecimal = false;

  switch (stageId) {
    case 1: {
      // Single-Digit Rapid Fire & Tables Reflex (e.g. 56 ÷ 8, 72 ÷ 9, 63 ÷ 7)
      const divisor = Math.floor(Math.random() * 8) + 2; // 2..9
      const quotient = Math.floor(Math.random() * 8) + 2; // 2..9
      const dividend = divisor * quotient;
      operands = [dividend, divisor];
      answer = quotient;
      breakdown = `Table Reflex: ${dividend} ÷ ${divisor} = ${quotient} (since ${divisor} × ${quotient} = ${dividend})`;
      break;
    }

    case 2: {
      // 2-digit & 3-digit chunking (e.g. 276 ÷ 6 = 46, 432 ÷ 6 = 72)
      const divisor = Math.floor(Math.random() * 6) + 3; // 3..8
      const chunkTens = (Math.floor(Math.random() * 6) + 3) * 10; // 30, 40, ... 80
      const chunkUnits = Math.floor(Math.random() * 8) + 2; // 2..9
      const quotient = chunkTens + chunkUnits;
      const dividend = divisor * quotient;
      operands = [dividend, divisor];
      answer = quotient;
      const part1 = divisor * chunkTens;
      const part2 = divisor * chunkUnits;
      breakdown = `Mental Chunking: (${part1} ÷ ${divisor} = ${chunkTens}) + (${part2} ÷ ${divisor} = ${chunkUnits}) = ${quotient}`;
      break;
    }

    case 3: {
      // Divide by 5, 25, 50 (Double & Shift rule)
      const divisors = [5, 25, 50];
      const divisor = divisors[Math.floor(Math.random() * divisors.length)];
      let quotient = Math.floor(Math.random() * 40) + 12; // 12..51
      if (divisor === 25) quotient = Math.floor(Math.random() * 25) + 6;
      const dividend = divisor * quotient;
      operands = [dividend, divisor];
      answer = quotient;

      if (divisor === 5) {
        breakdown = `Double & Shift: (${dividend} × 2 = ${dividend * 2}) ÷ 10 = ${quotient}`;
      } else if (divisor === 25) {
        breakdown = `Quadruple & Shift: (${dividend} × 4 = ${dividend * 4}) ÷ 100 = ${quotient}`;
      } else {
        breakdown = `Double & 100: (${dividend} × 2 = ${dividend * 2}) ÷ 100 = ${quotient}`;
      }
      break;
    }

    case 4: {
      // Common Factor Reduction (Cancel Down) (e.g. 192 ÷ 24 = 8, 252 ÷ 28 = 9)
      const commonFactor = [4, 6, 7, 8, 9][Math.floor(Math.random() * 5)];
      const smallDivisor = Math.floor(Math.random() * 5) + 2; // 2..6
      const quotient = Math.floor(Math.random() * 8) + 3; // 3..10
      const divisor = smallDivisor * commonFactor;
      const dividend = divisor * quotient;
      operands = [dividend, divisor];
      answer = quotient;
      const redDividend = dividend / commonFactor;
      const redDivisor = divisor / commonFactor;
      breakdown = `Factor Reduction: Divide both by ${commonFactor} → ${redDividend} ÷ ${redDivisor} = ${quotient}`;
      break;
    }

    case 5: {
      // Vedic Division by 9 & 99 (Paravartya Yojayet)
      const is99 = Math.random() > 0.6;
      if (is99) {
        const quotient = Math.floor(Math.random() * 8) + 2; // 2..9
        const dividend = quotient * 99;
        operands = [dividend, 99];
        answer = quotient;
        breakdown = `Vedic Base 99: ${dividend} ÷ 99 = ${quotient} (since 99 = 100 - 1)`;
      } else {
        const quotient = Math.floor(Math.random() * 40) + 12; // 12..51
        const dividend = quotient * 9;
        operands = [dividend, 9];
        answer = quotient;
        breakdown = `Vedic 9 Rule: Running sum of digits yields quotient ${quotient}`;
      }
      break;
    }

    case 6: {
      // Vedic Dhwajank / Flag Method (2-digit divisor) (e.g. 736 ÷ 23 = 32, 943 ÷ 41 = 23)
      const divisorTens = Math.floor(Math.random() * 4) + 2; // 2..5
      const divisorUnits = Math.floor(Math.random() * 4) + 1; // 1..4
      const divisor = divisorTens * 10 + divisorUnits;
      const quotient = Math.floor(Math.random() * 30) + 15; // 15..44
      const dividend = divisor * quotient;
      operands = [dividend, divisor];
      answer = quotient;
      breakdown = `Dhwajank Flag Method: Base = ${divisorTens}, Flag = ${divisorUnits} → 1-Line Quotient = ${quotient}`;
      break;
    }

    case 7: {
      // Remainder & Modulo Reflex (e.g. 257 mod 9, 348 mod 11)
      const modBases = [9, 11, 7];
      const modBase = modBases[Math.floor(Math.random() * modBases.length)];
      const num = Math.floor(Math.random() * 300) + 120;
      const rem = num % modBase;
      operands = [num, modBase];
      answer = rem;
      if (modBase === 9) {
        breakdown = `Digital Root for 9: Sum of digits of ${num} mod 9 = ${rem}`;
      } else if (modBase === 11) {
        breakdown = `Alternating Sum for 11: Odd sum - Even sum mod 11 = ${rem}`;
      } else {
        breakdown = `Remainder: Nearest multiple of 7 is ${num - rem} → Remainder = ${rem}`;
      }
      break;
    }

    case 8: {
      // Reciprocal Decimals (e.g. 3/8 = 0.375, 5/8 = 0.625, 3/4 = 0.75, 4/5 = 0.8)
      isDecimal = true;
      const fractionPairs: [number, number, number][] = [
        [1, 2, 0.5],
        [1, 4, 0.25],
        [3, 4, 0.75],
        [1, 5, 0.2],
        [2, 5, 0.4],
        [3, 5, 0.6],
        [4, 5, 0.8],
        [1, 8, 0.125],
        [3, 8, 0.375],
        [5, 8, 0.625],
        [7, 8, 0.875],
        [1, 10, 0.1],
        [3, 10, 0.3],
        [7, 10, 0.7],
        [9, 10, 0.9]
      ];
      const pick = fractionPairs[Math.floor(Math.random() * fractionPairs.length)];
      operands = [pick[0], pick[1]];
      answer = pick[2];
      breakdown = `Reciprocal Anchor: ${pick[0]} ÷ ${pick[1]} = ${pick[2]}`;
      break;
    }

    case 9: {
      // Decimal Division & Power of 10 Shifts (e.g. 4.32 ÷ 0.6 = 7.2)
      isDecimal = true;
      const intDivisor = (Math.floor(Math.random() * 7) + 2); // 2..8
      const intQuotient = (Math.floor(Math.random() * 40) + 12); // 12..51
      const intDividend = intDivisor * intQuotient;

      // Make divisor a decimal (e.g. 0.6) and dividend corresponding decimal (e.g. 4.32 or 43.2)
      const divisor = Number((intDivisor / 10).toFixed(1));
      const quotient = Number((intQuotient / 10).toFixed(1));
      const dividend = Number((divisor * quotient).toFixed(2));

      operands = [dividend, divisor];
      answer = quotient;
      breakdown = `Decimal Shift: ${dividend} ÷ ${divisor} = (${dividend * 10} ÷ ${divisor * 10}) = ${dividend * 10} ÷ ${intDivisor} = ${quotient}`;
      break;
    }

    case 10:
    default: {
      // High-Speed DI Approximation (Percentage & Ratio Estimations)
      // e.g. 252 ÷ 400 = 63%
      const base = [200, 300, 400, 500, 600, 800][Math.floor(Math.random() * 6)];
      const percent = Math.floor(Math.random() * 60) + 25; // 25..84%
      const numerator = Math.round((base * percent) / 100);
      operands = [numerator, base];
      answer = percent;
      breakdown = `DI Slicing: 10% of ${base} = ${base / 10}. ${numerator} is exactly ${percent}% of ${base}`;
      break;
    }
  }

  // Display expression
  const isPercentStage = stageId === 10;
  const displayExpression = isPercentStage
    ? `${operands[0]} ÷ ${operands[1]} (as %) = ?`
    : stageId === 7
    ? `${operands[0]} mod ${operands[1]} = ?`
    : `${operands[0]} ÷ ${operands[1]} = ?`;

  // Options generation with smart distractors
  const distractors = generateDivisionDistractors(answer, isDecimal);
  const options = [...distractors, answer].sort(() => Math.random() - 0.5);

  return {
    id: `q_div_st${stageId}_${Date.now()}_${Math.random()}`,
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
 * Returns player title & rank badge based on Division XP points
 */
export function getDivisionRank(xp: number): {
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
      title: 'Division Novice',
      hindiTitle: 'आरंभिक शिक्षार्थी',
      nextThreshold: 100,
      prevThreshold: 0,
      badge: '🌱 Level 1'
    };
  }
  if (xp < 300) {
    return {
      level: 2,
      title: 'Mental Chunking Pro',
      hindiTitle: 'माइंड कैलकुलेटर',
      nextThreshold: 300,
      prevThreshold: 100,
      badge: '⚡ Level 2'
    };
  }
  if (xp < 700) {
    return {
      level: 3,
      title: 'Vedic Dhwajank Master',
      hindiTitle: 'ध्वजांक मास्टर',
      nextThreshold: 700,
      prevThreshold: 300,
      badge: '🔥 Level 3'
    };
  }
  if (xp < 1500) {
    return {
      level: 4,
      title: 'DI Ratio & Division Ninja',
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
