export interface PowerItem {
  id: string;
  base: number;
  exponent: number;
  result: number;
  formattedResult: string;
  category: '2' | '3-4' | '5-9' | 'extended';
  categoryLabel: string;
  unitDigit: number;
  tip?: string;
  examUsage?: string;
}

export type PowerCategoryTab = 'all' | '2' | '3-4' | '5-9' | 'extended' | 'weak';

export const POWER_CATEGORIES: { id: PowerCategoryTab; label: string; count?: number }[] = [
  { id: 'all', label: 'All Powers' },
  { id: '2', label: 'Powers of 2' },
  { id: '3-4', label: '3 & 4' },
  { id: '5-9', label: '5 & 9' },
  { id: 'extended', label: '6, 7, 8, 11' },
  { id: 'weak', label: 'Needs Review ⚠️' }
];

export const HIGHER_POWERS: PowerItem[] = [
  // ── POWERS OF 2 (1 to 12) ──────────────────────────────────────────
  {
    id: '2^1',
    base: 2,
    exponent: 1,
    result: 2,
    formattedResult: '2',
    category: '2',
    categoryLabel: 'Powers of 2',
    unitDigit: 2,
    tip: '2¹ = 2',
    examUsage: 'Base binary digit.'
  },
  {
    id: '2^2',
    base: 2,
    exponent: 2,
    result: 4,
    formattedResult: '4',
    category: '2',
    categoryLabel: 'Powers of 2',
    unitDigit: 4,
    tip: '2² = 4',
    examUsage: 'Square of 2.'
  },
  {
    id: '2^3',
    base: 2,
    exponent: 3,
    result: 8,
    formattedResult: '8',
    category: '2',
    categoryLabel: 'Powers of 2',
    unitDigit: 8,
    tip: '2³ = 8',
    examUsage: 'Cube of 2.'
  },
  {
    id: '2^4',
    base: 2,
    exponent: 4,
    result: 16,
    formattedResult: '16',
    category: '2',
    categoryLabel: 'Powers of 2',
    unitDigit: 6,
    tip: '2⁴ = 16 (also 4²)',
    examUsage: 'Divisibility rule by 16: check last 4 digits.'
  },
  {
    id: '2^5',
    base: 2,
    exponent: 5,
    result: 32,
    formattedResult: '32',
    category: '2',
    categoryLabel: 'Powers of 2',
    unitDigit: 2,
    tip: '2⁵ = 32 (unit digit restarts cycle: 2, 4, 8, 6)',
    examUsage: 'Divisibility rule by 32: check last 5 digits.'
  },
  {
    id: '2^6',
    base: 2,
    exponent: 6,
    result: 64,
    formattedResult: '64',
    category: '2',
    categoryLabel: 'Powers of 2',
    unitDigit: 4,
    tip: '2⁶ = 64 = 4³ = 8²',
    examUsage: 'Unique number that is both a perfect square (8²) and a perfect cube (4³).'
  },
  {
    id: '2^7',
    base: 2,
    exponent: 7,
    result: 128,
    formattedResult: '128',
    category: '2',
    categoryLabel: 'Powers of 2',
    unitDigit: 8,
    tip: '2⁷ = 128',
    examUsage: 'ASCII table length (128 characters).'
  },
  {
    id: '2^8',
    base: 2,
    exponent: 8,
    result: 256,
    formattedResult: '256',
    category: '2',
    categoryLabel: 'Powers of 2',
    unitDigit: 6,
    tip: '2⁸ = 256 = 16² = 4⁴',
    examUsage: '1 Byte range (0-255). Very frequent in Algebra & Number Systems.'
  },
  {
    id: '2^9',
    base: 2,
    exponent: 9,
    result: 512,
    formattedResult: '512',
    category: '2',
    categoryLabel: 'Powers of 2',
    unitDigit: 2,
    tip: '2⁹ = 512 = 8³',
    examUsage: 'Cube of 8. Essential for simplification problems.'
  },
  {
    id: '2^10',
    base: 2,
    exponent: 10,
    result: 1024,
    formattedResult: '1,024',
    category: '2',
    categoryLabel: 'Powers of 2',
    unitDigit: 4,
    tip: '2¹⁰ = 1024 = 32² = 4⁵',
    examUsage: '1 KiloByte (1 KB) in computing. Key benchmark in indices questions.'
  },
  {
    id: '2^11',
    base: 2,
    exponent: 11,
    result: 2048,
    formattedResult: '2,048',
    category: '2',
    categoryLabel: 'Powers of 2',
    unitDigit: 8,
    tip: '2¹¹ = 2048 (Double of 1024)',
    examUsage: 'Famous 2048 game; memory limits.'
  },
  {
    id: '2^12',
    base: 2,
    exponent: 12,
    result: 4096,
    formattedResult: '4,096',
    category: '2',
    categoryLabel: 'Powers of 2',
    unitDigit: 6,
    tip: '2¹² = 4096 = 64² = 16³',
    examUsage: 'Super-number: both a square (64²) and a cube (16³).'
  },

  // ── POWERS OF 3 ────────────────────────────────────────────────────
  {
    id: '3^1',
    base: 3,
    exponent: 1,
    result: 3,
    formattedResult: '3',
    category: '3-4',
    categoryLabel: 'Powers of 3 & 4',
    unitDigit: 3,
    tip: '3¹ = 3',
    examUsage: 'Prime baseline.'
  },
  {
    id: '3^2',
    base: 3,
    exponent: 2,
    result: 9,
    formattedResult: '9',
    category: '3-4',
    categoryLabel: 'Powers of 3 & 4',
    unitDigit: 9,
    tip: '3² = 9',
    examUsage: 'Square of 3.'
  },
  {
    id: '3^3',
    base: 3,
    exponent: 3,
    result: 27,
    formattedResult: '27',
    category: '3-4',
    categoryLabel: 'Powers of 3 & 4',
    unitDigit: 7,
    tip: '3³ = 27',
    examUsage: 'Cube of 3. Recurring in CI & Algebra.'
  },
  {
    id: '3^4',
    base: 3,
    exponent: 4,
    result: 81,
    formattedResult: '81',
    category: '3-4',
    categoryLabel: 'Powers of 3 & 4',
    unitDigit: 1,
    tip: '3⁴ = 81 = 9²',
    examUsage: 'Unit digit is 1! Crucial for remainder theorem (modulo arithmetic).'
  },
  {
    id: '3^5',
    base: 3,
    exponent: 5,
    result: 243,
    formattedResult: '243',
    category: '3-4',
    categoryLabel: 'Powers of 3 & 4',
    unitDigit: 3,
    tip: '3⁵ = 243 (Unit digit repeats cycle: 3, 9, 7, 1)',
    examUsage: 'Often tested in surds & indices simplification.'
  },
  {
    id: '3^6',
    base: 3,
    exponent: 6,
    result: 729,
    formattedResult: '729',
    category: '3-4',
    categoryLabel: 'Powers of 3 & 4',
    unitDigit: 9,
    tip: '3⁶ = 729 = 27² = 9³',
    examUsage: 'Both a perfect square (27²) and a perfect cube (9³). Very popular in SSC CGL.'
  },

  // ── POWERS OF 4 ────────────────────────────────────────────────────
  {
    id: '4^1',
    base: 4,
    exponent: 1,
    result: 4,
    formattedResult: '4',
    category: '3-4',
    categoryLabel: 'Powers of 3 & 4',
    unitDigit: 4,
    tip: '4¹ = 4 (Odd power ends in 4)',
    examUsage: 'Cyclicity of 4 is 2: 4, 6, 4, 6.'
  },
  {
    id: '4^2',
    base: 4,
    exponent: 2,
    result: 16,
    formattedResult: '16',
    category: '3-4',
    categoryLabel: 'Powers of 3 & 4',
    unitDigit: 6,
    tip: '4² = 16 = 2⁴ (Even power ends in 6)',
    examUsage: 'Square of 4.'
  },
  {
    id: '4^3',
    base: 4,
    exponent: 3,
    result: 64,
    formattedResult: '64',
    category: '3-4',
    categoryLabel: 'Powers of 3 & 4',
    unitDigit: 4,
    tip: '4³ = 64 = 8² = 2⁶',
    examUsage: 'Cube of 4.'
  },
  {
    id: '4^4',
    base: 4,
    exponent: 4,
    result: 256,
    formattedResult: '256',
    category: '3-4',
    categoryLabel: 'Powers of 3 & 4',
    unitDigit: 6,
    tip: '4⁴ = 256 = 16² = 2⁸',
    examUsage: 'Even power ends in 6.'
  },
  {
    id: '4^5',
    base: 4,
    exponent: 5,
    result: 1024,
    formattedResult: '1,024',
    category: '3-4',
    categoryLabel: 'Powers of 3 & 4',
    unitDigit: 4,
    tip: '4⁵ = 1024 = 2¹⁰ = 32²',
    examUsage: 'Same as 2¹⁰. Extremely important in indices.'
  },

  // ── POWERS OF 5 ────────────────────────────────────────────────────
  {
    id: '5^1',
    base: 5,
    exponent: 1,
    result: 5,
    formattedResult: '5',
    category: '5-9',
    categoryLabel: 'Powers of 5 & 9',
    unitDigit: 5,
    tip: 'Any power of 5 ALWAYS ends in 5!',
    examUsage: 'Cyclicity is 1. Last two digits for power ≥ 2 is always 25.'
  },
  {
    id: '5^2',
    base: 5,
    exponent: 2,
    result: 25,
    formattedResult: '25',
    category: '5-9',
    categoryLabel: 'Powers of 5 & 9',
    unitDigit: 5,
    tip: '5² = 25',
    examUsage: 'Square of 5. Divisibility by 25: last two digits 00, 25, 50, 75.'
  },
  {
    id: '5^3',
    base: 5,
    exponent: 3,
    result: 125,
    formattedResult: '125',
    category: '5-9',
    categoryLabel: 'Powers of 5 & 9',
    unitDigit: 5,
    tip: '5³ = 125',
    examUsage: 'Cube of 5. Divisibility by 125: check last three digits.'
  },
  {
    id: '5^4',
    base: 5,
    exponent: 4,
    result: 625,
    formattedResult: '625',
    category: '5-9',
    categoryLabel: 'Powers of 5 & 9',
    unitDigit: 5,
    tip: '5⁴ = 625 = 25²',
    examUsage: 'Compound Interest with rate 20% over 4 years: (6/5)⁴ uses 625 denominator.'
  },
  {
    id: '5^5',
    base: 5,
    exponent: 5,
    result: 3125,
    formattedResult: '3,125',
    category: '5-9',
    categoryLabel: 'Powers of 5 & 9',
    unitDigit: 5,
    tip: '5⁵ = 3125',
    examUsage: 'High-level number theory questions.'
  },
  {
    id: '5^6',
    base: 5,
    exponent: 6,
    result: 15625,
    formattedResult: '15,625',
    category: '5-9',
    categoryLabel: 'Powers of 5 & 9',
    unitDigit: 5,
    tip: '5⁶ = 15625 = 125² = 25³',
    examUsage: 'Both a square (125²) and a cube (25³).'
  },

  // ── POWERS OF 9 ────────────────────────────────────────────────────
  {
    id: '9^1',
    base: 9,
    exponent: 1,
    result: 9,
    formattedResult: '9',
    category: '5-9',
    categoryLabel: 'Powers of 5 & 9',
    unitDigit: 9,
    tip: '9¹ = 9 (Odd power of 9 ends in 9)',
    examUsage: 'Cyclicity of 9 is 2: 9, 1, 9, 1.'
  },
  {
    id: '9^2',
    base: 9,
    exponent: 2,
    result: 81,
    formattedResult: '81',
    category: '5-9',
    categoryLabel: 'Powers of 5 & 9',
    unitDigit: 1,
    tip: '9² = 81 (Even power of 9 ends in 1)',
    examUsage: 'Square of 9.'
  },
  {
    id: '9^3',
    base: 9,
    exponent: 3,
    result: 729,
    formattedResult: '729',
    category: '5-9',
    categoryLabel: 'Powers of 5 & 9',
    unitDigit: 9,
    tip: '9³ = 729 = 27² = 3⁶',
    examUsage: 'Cube of 9. Ramanujan-Hardy taxicab number component (1729 = 10³ + 9³ = 12³ + 1³).'
  },
  {
    id: '9^4',
    base: 9,
    exponent: 4,
    result: 6561,
    formattedResult: '6,561',
    category: '5-9',
    categoryLabel: 'Powers of 5 & 9',
    unitDigit: 1,
    tip: '9⁴ = 6561 = 81² = 3⁸',
    examUsage: 'Square of 81. Very common in SSC CGL Tier 2 simplification.'
  },

  // ── EXTENDED HIGH-YIELD POWERS (6, 7, 8, 11) ─────────────────────────
  {
    id: '6^3',
    base: 6,
    exponent: 3,
    result: 216,
    formattedResult: '216',
    category: 'extended',
    categoryLabel: 'Extended (6, 7, 8, 11)',
    unitDigit: 6,
    tip: '6³ = 216. Any power of 6 always ends in 6!',
    examUsage: 'Three dice probability questions (total outcomes = 216).'
  },
  {
    id: '6^4',
    base: 6,
    exponent: 4,
    result: 1296,
    formattedResult: '1,296',
    category: 'extended',
    categoryLabel: 'Extended (6, 7, 8, 11)',
    unitDigit: 6,
    tip: '6⁴ = 1296 = 36²',
    examUsage: 'Square of 36.'
  },
  {
    id: '7^3',
    base: 7,
    exponent: 3,
    result: 343,
    formattedResult: '343',
    category: 'extended',
    categoryLabel: 'Extended (6, 7, 8, 11)',
    unitDigit: 3,
    tip: '7³ = 343',
    examUsage: 'Compound interest with rate 14 2/7% (fraction 1/7). Principal 343 ratio.'
  },
  {
    id: '7^4',
    base: 7,
    exponent: 4,
    result: 2401,
    formattedResult: '2,401',
    category: 'extended',
    categoryLabel: 'Extended (6, 7, 8, 11)',
    unitDigit: 1,
    tip: '7⁴ = 2401 = 49². Unit digit is 1!',
    examUsage: 'Remainder theorem: 7⁴ ≡ 1 (mod 10).'
  },
  {
    id: '8^4',
    base: 8,
    exponent: 4,
    result: 4096,
    formattedResult: '4,096',
    category: 'extended',
    categoryLabel: 'Extended (6, 7, 8, 11)',
    unitDigit: 6,
    tip: '8⁴ = 4096 = 64² = 2¹²',
    examUsage: 'Equal to 2¹² and 64².'
  },
  {
    id: '11^3',
    base: 11,
    exponent: 3,
    result: 1331,
    formattedResult: '1,331',
    category: 'extended',
    categoryLabel: 'Extended (6, 7, 8, 11)',
    unitDigit: 1,
    tip: '11³ = 1331. Pascal triangle 1-3-3-1.',
    examUsage: '10% Compound Interest for 3 years: Amount = Principal × 1331/1000.'
  },
  {
    id: '11^4',
    base: 11,
    exponent: 4,
    result: 14641,
    formattedResult: '14,641',
    category: 'extended',
    categoryLabel: 'Extended (6, 7, 8, 11)',
    unitDigit: 1,
    tip: '11⁴ = 14641 = 121². Pascal triangle 1-4-6-4-1.',
    examUsage: '10% Compound Interest for 4 years: Amount = Principal × 14641/10000.'
  }
];

export const CYCLICITY_RULES = [
  {
    digits: '0, 1, 5, 6',
    cyclicity: 1,
    rule: 'Always end in the exact same unit digit regardless of any positive power!',
    example: '5¹=5, 5²=25, 5⁶=15625 (all end in 5). 6⁴=1296 (ends in 6).'
  },
  {
    digits: '4, 9',
    cyclicity: 2,
    rule: 'Depends only on whether exponent is ODD or EVEN.',
    example: '4^odd → 4, 4^even → 6. | 9^odd → 9, 9^even → 1.'
  },
  {
    digits: '2, 3, 7, 8',
    cyclicity: 4,
    rule: 'Cycles through 4 distinct unit digits. Divide exponent by 4 and check remainder (r). If remainder is 0, use power 4.',
    example: '2¹=2, 2²=4, 2³=8, 2⁴=6. | 3¹=3, 3²=9, 3³=7, 3⁴=1. | 7¹=7, 7²=9, 7³=3, 7⁴=1.'
  }
];

export const EXPONENT_LAWS = [
  { law: 'Product Rule', formula: 'a^m \\times a^n = a^{m+n}', example: '2³ × 2⁵ = 2⁸ = 256' },
  { law: 'Quotient Rule', formula: '\\frac{a^m}{a^n} = a^{m-n}', example: '3⁶ ÷ 3² = 3⁴ = 81' },
  { law: 'Power of a Power', formula: '(a^m)^n = a^{m \\times n}', example: '(2³)² = 2⁶ = 64' },
  { law: 'Zero Exponent', formula: 'a^0 = 1 \\ (a \\neq 0)', example: '5⁰ = 1, 9⁰ = 1' },
  { law: 'Negative Exponent', formula: 'a^{-n} = \\frac{1}{a^n}', example: '2⁻⁴ = 1/16 = 0.0625' }
];
