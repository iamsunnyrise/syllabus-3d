export interface PrimeItem {
  id: string;
  n: number;
  order: number; // 1st prime, 2nd prime, etc.
  range: '1-100' | '101-200' | '201-300';
  form6k?: string; // e.g. "6(1) - 1" or "6(1) + 1"
  isTwinPrime: boolean;
  twinPair?: number;
  tip?: string;
  examTrap?: string;
}

export type PrimeCategoryTab = '1-100' | '101-200' | '201-300' | 'all' | 'twin' | 'weak';

export const PRIME_CATEGORIES: { id: PrimeCategoryTab; label: string; count?: number }[] = [
  { id: '1-100', label: '1 - 100' },
  { id: '101-200', label: '101 - 200' },
  { id: '201-300', label: '201 - 300' },
  { id: 'all', label: 'All (1 - 300)' },
  { id: 'twin', label: 'Twin Primes' },
  { id: 'weak', label: 'Needs Review ⚠️' }
];

export const PRIME_NUMBERS: PrimeItem[] = [
  // ── 1 - 100 (Total 25 Primes) ──────────────────────────────────────────
  {
    id: 'prime-2',
    n: 2,
    order: 1,
    range: '1-100',
    isTwinPrime: false,
    tip: 'The smallest prime and the ONLY EVEN prime number in existence.',
    examTrap: '1 is NEITHER prime nor composite. 2 is the first prime!'
  },
  {
    id: 'prime-3',
    n: 3,
    order: 2,
    range: '1-100',
    isTwinPrime: true,
    twinPair: 5,
    tip: 'Smallest odd prime. (3, 5, 7) is the ONLY prime triplet of form (p, p+2, p+4).'
  },
  {
    id: 'prime-5',
    n: 5,
    order: 3,
    range: '1-100',
    form6k: '6(1) - 1',
    isTwinPrime: true,
    twinPair: 3,
    tip: 'Only prime ending in 5. All other numbers ending in 5 are divisible by 5.'
  },
  {
    id: 'prime-7',
    n: 7,
    order: 4,
    range: '1-100',
    form6k: '6(1) + 1',
    isTwinPrime: true,
    twinPair: 5,
    tip: 'Twin pair with 5.'
  },
  {
    id: 'prime-11',
    n: 11,
    order: 5,
    range: '1-100',
    form6k: '6(2) - 1',
    isTwinPrime: true,
    twinPair: 13,
    tip: 'First 2-digit prime. Divisibility rule: alternating sum of digits difference is 0 or multiple of 11.'
  },
  {
    id: 'prime-13',
    n: 13,
    order: 6,
    range: '1-100',
    form6k: '6(2) + 1',
    isTwinPrime: true,
    twinPair: 11,
    tip: 'Twin pair with 11.'
  },
  {
    id: 'prime-17',
    n: 17,
    order: 7,
    range: '1-100',
    form6k: '6(3) - 1',
    isTwinPrime: true,
    twinPair: 19,
    tip: 'Twin pair with 19. Sum of first 7 primes = 58.'
  },
  {
    id: 'prime-19',
    n: 19,
    order: 8,
    range: '1-100',
    form6k: '6(3) + 1',
    isTwinPrime: true,
    twinPair: 17,
    tip: 'Twin pair with 17.'
  },
  {
    id: 'prime-23',
    n: 23,
    order: 9,
    range: '1-100',
    form6k: '6(4) - 1',
    isTwinPrime: false,
    tip: 'Prime in 20s. Notice 27 is 3³ and 29 is prime.'
  },
  {
    id: 'prime-29',
    n: 29,
    order: 10,
    range: '1-100',
    form6k: '6(5) - 1',
    isTwinPrime: true,
    twinPair: 31,
    tip: 'Twin pair with 31.'
  },
  {
    id: 'prime-31',
    n: 31,
    order: 11,
    range: '1-100',
    form6k: '6(5) + 1',
    isTwinPrime: true,
    twinPair: 29,
    tip: 'Twin pair with 29.'
  },
  {
    id: 'prime-37',
    n: 37,
    order: 12,
    range: '1-100',
    form6k: '6(6) + 1',
    isTwinPrime: false,
    tip: '37 × 3 = 111 (Repdigit factor rule!). 37 × 27 = 999.'
  },
  {
    id: 'prime-41',
    n: 41,
    order: 13,
    range: '1-100',
    form6k: '6(7) - 1',
    isTwinPrime: true,
    twinPair: 43,
    tip: 'Euler prime formula: n² + n + 41 generates primes for n = 0 to 39.'
  },
  {
    id: 'prime-43',
    n: 43,
    order: 14,
    range: '1-100',
    form6k: '6(7) + 1',
    isTwinPrime: true,
    twinPair: 41,
    tip: 'Twin pair with 41.'
  },
  {
    id: 'prime-47',
    n: 47,
    order: 15,
    range: '1-100',
    form6k: '6(8) - 1',
    isTwinPrime: false,
    tip: '15th Prime. Exactly 15 primes between 1 and 50!'
  },
  {
    id: 'prime-53',
    n: 53,
    order: 16,
    range: '1-100',
    form6k: '6(9) - 1',
    isTwinPrime: false,
    tip: 'First prime above 50.'
  },
  {
    id: 'prime-59',
    n: 59,
    order: 17,
    range: '1-100',
    form6k: '6(10) - 1',
    isTwinPrime: true,
    twinPair: 61,
    tip: 'Twin pair with 61.'
  },
  {
    id: 'prime-61',
    n: 61,
    order: 18,
    range: '1-100',
    form6k: '6(10) + 1',
    isTwinPrime: true,
    twinPair: 59,
    tip: 'Twin pair with 59.'
  },
  {
    id: 'prime-67',
    n: 67,
    order: 19,
    range: '1-100',
    form6k: '6(11) + 1',
    isTwinPrime: false,
    tip: 'Prime in 60s.'
  },
  {
    id: 'prime-71',
    n: 71,
    order: 20,
    range: '1-100',
    form6k: '6(12) - 1',
    isTwinPrime: true,
    twinPair: 73,
    tip: 'Twin pair with 73.'
  },
  {
    id: 'prime-73',
    n: 73,
    order: 21,
    range: '1-100',
    form6k: '6(12) + 1',
    isTwinPrime: true,
    twinPair: 71,
    tip: '21st prime. Binary 1001001 palindrome.'
  },
  {
    id: 'prime-79',
    n: 79,
    order: 22,
    range: '1-100',
    form6k: '6(13) + 1',
    isTwinPrime: false,
    tip: 'Prime in 70s.'
  },
  {
    id: 'prime-83',
    n: 83,
    order: 23,
    range: '1-100',
    form6k: '6(14) - 1',
    isTwinPrime: false,
    tip: 'Prime in 80s.'
  },
  {
    id: 'prime-89',
    n: 89,
    order: 24,
    range: '1-100',
    form6k: '6(15) - 1',
    isTwinPrime: false,
    tip: 'Fibonacci number and prime!'
  },
  {
    id: 'prime-97',
    n: 97,
    order: 25,
    range: '1-100',
    form6k: '6(16) + 1',
    isTwinPrime: false,
    tip: 'Largest 2-digit prime number! Total primes from 1 to 100 = 25.'
  },

  // ── 101 - 200 (Total 21 Primes) ────────────────────────────────────────
  {
    id: 'prime-101',
    n: 101,
    order: 26,
    range: '101-200',
    form6k: '6(17) - 1',
    isTwinPrime: true,
    twinPair: 103,
    tip: 'Smallest 3-digit prime number! Palindrome prime.'
  },
  {
    id: 'prime-103',
    n: 103,
    order: 27,
    range: '101-200',
    form6k: '6(17) + 1',
    isTwinPrime: true,
    twinPair: 101,
    tip: 'Twin pair with 101.'
  },
  {
    id: 'prime-107',
    n: 107,
    order: 28,
    range: '101-200',
    form6k: '6(18) - 1',
    isTwinPrime: true,
    twinPair: 109,
    tip: 'Twin pair with 109.'
  },
  {
    id: 'prime-109',
    n: 109,
    order: 29,
    range: '101-200',
    form6k: '6(18) + 1',
    isTwinPrime: true,
    twinPair: 107,
    tip: 'Twin pair with 107.'
  },
  {
    id: 'prime-113',
    n: 113,
    order: 30,
    range: '101-200',
    form6k: '6(19) - 1',
    isTwinPrime: false,
    tip: '355/113 is Zu Chongzhi’s famous high-precision approximation for π (accurate to 6 decimal places).'
  },
  {
    id: 'prime-127',
    n: 127,
    order: 31,
    range: '101-200',
    form6k: '6(21) + 1',
    isTwinPrime: false,
    tip: 'Mersenne prime: 2⁷ - 1 = 127.'
  },
  {
    id: 'prime-131',
    n: 131,
    order: 32,
    range: '101-200',
    form6k: '6(22) - 1',
    isTwinPrime: false,
    tip: 'Palindrome prime.'
  },
  {
    id: 'prime-137',
    n: 137,
    order: 33,
    range: '101-200',
    form6k: '6(23) - 1',
    isTwinPrime: true,
    twinPair: 139,
    tip: 'Twin pair with 139. Fine-structure constant in physics is approx 1/137.'
  },
  {
    id: 'prime-139',
    n: 139,
    order: 34,
    range: '101-200',
    form6k: '6(23) + 1',
    isTwinPrime: true,
    twinPair: 137,
    tip: 'Twin pair with 137.'
  },
  {
    id: 'prime-149',
    n: 149,
    order: 35,
    range: '101-200',
    form6k: '6(25) - 1',
    isTwinPrime: true,
    twinPair: 151,
    tip: 'Twin pair with 151.'
  },
  {
    id: 'prime-151',
    n: 151,
    order: 36,
    range: '101-200',
    form6k: '6(25) + 1',
    isTwinPrime: true,
    twinPair: 149,
    tip: 'Twin pair with 149. Palindrome prime.'
  },
  {
    id: 'prime-157',
    n: 157,
    order: 37,
    range: '101-200',
    form6k: '6(26) + 1',
    isTwinPrime: false,
    tip: 'Prime in 150s.'
  },
  {
    id: 'prime-163',
    n: 163,
    order: 38,
    range: '101-200',
    form6k: '6(27) + 1',
    isTwinPrime: false,
    tip: 'Heegner number in advanced number theory.'
  },
  {
    id: 'prime-167',
    n: 167,
    order: 39,
    range: '101-200',
    form6k: '6(28) - 1',
    isTwinPrime: false,
    tip: 'Prime in 160s.'
  },
  {
    id: 'prime-173',
    n: 173,
    order: 40,
    range: '101-200',
    form6k: '6(29) - 1',
    isTwinPrime: false,
    tip: 'Prime in 170s.'
  },
  {
    id: 'prime-179',
    n: 179,
    order: 41,
    range: '101-200',
    form6k: '6(30) - 1',
    isTwinPrime: true,
    twinPair: 181,
    tip: 'Twin pair with 181.'
  },
  {
    id: 'prime-181',
    n: 181,
    order: 42,
    range: '101-200',
    form6k: '6(30) + 1',
    isTwinPrime: true,
    twinPair: 179,
    tip: 'Twin pair with 179. Palindrome prime.'
  },
  {
    id: 'prime-191',
    n: 191,
    order: 43,
    range: '101-200',
    form6k: '6(32) - 1',
    isTwinPrime: true,
    twinPair: 193,
    tip: 'Twin pair with 193. Palindrome prime.'
  },
  {
    id: 'prime-193',
    n: 193,
    order: 44,
    range: '101-200',
    form6k: '6(32) + 1',
    isTwinPrime: true,
    twinPair: 191,
    tip: 'Twin pair with 191.'
  },
  {
    id: 'prime-197',
    n: 197,
    order: 45,
    range: '101-200',
    form6k: '6(33) - 1',
    isTwinPrime: true,
    twinPair: 199,
    tip: 'Twin pair with 199.'
  },
  {
    id: 'prime-199',
    n: 199,
    order: 46,
    range: '101-200',
    form6k: '6(33) + 1',
    isTwinPrime: true,
    twinPair: 197,
    tip: 'Largest prime under 200. Total primes from 1 to 200 = 46.'
  },

  // ── 201 - 300 (Total 16 Primes) ────────────────────────────────────────
  {
    id: 'prime-211',
    n: 211,
    order: 47,
    range: '201-300',
    form6k: '6(35) + 1',
    isTwinPrime: false,
    tip: 'First prime above 200.'
  },
  {
    id: 'prime-223',
    n: 223,
    order: 48,
    range: '201-300',
    form6k: '6(37) + 1',
    isTwinPrime: false,
    tip: 'Notice 221 is NOT prime (13 × 17 = 221, famous exam trap!). 223 is prime.'
  },
  {
    id: 'prime-227',
    n: 227,
    order: 49,
    range: '201-300',
    form6k: '6(38) - 1',
    isTwinPrime: true,
    twinPair: 229,
    tip: 'Twin pair with 229.'
  },
  {
    id: 'prime-229',
    n: 229,
    order: 50,
    range: '201-300',
    form6k: '6(38) + 1',
    isTwinPrime: true,
    twinPair: 227,
    tip: 'Twin pair with 227. 50th Prime Number!'
  },
  {
    id: 'prime-233',
    n: 233,
    order: 51,
    range: '201-300',
    form6k: '6(39) - 1',
    isTwinPrime: false,
    tip: 'Fibonacci number and prime!'
  },
  {
    id: 'prime-239',
    n: 239,
    order: 52,
    range: '201-300',
    form6k: '6(40) - 1',
    isTwinPrime: true,
    twinPair: 241,
    tip: 'Twin pair with 241.'
  },
  {
    id: 'prime-241',
    n: 241,
    order: 53,
    range: '201-300',
    form6k: '6(40) + 1',
    isTwinPrime: true,
    twinPair: 239,
    tip: 'Twin pair with 239. Notice 247 is NOT prime (13 × 19 = 247).'
  },
  {
    id: 'prime-251',
    n: 251,
    order: 54,
    range: '201-300',
    form6k: '6(42) - 1',
    isTwinPrime: false,
    tip: 'Prime in 250s.'
  },
  {
    id: 'prime-257',
    n: 257,
    order: 55,
    range: '201-300',
    form6k: '6(43) - 1',
    isTwinPrime: false,
    tip: 'Fermat prime: 2⁸ + 1 = 257.'
  },
  {
    id: 'prime-263',
    n: 263,
    order: 56,
    range: '201-300',
    form6k: '6(44) - 1',
    isTwinPrime: false,
    tip: 'Prime in 260s.'
  },
  {
    id: 'prime-269',
    n: 269,
    order: 57,
    range: '201-300',
    form6k: '6(45) - 1',
    isTwinPrime: true,
    twinPair: 271,
    tip: 'Twin pair with 271.'
  },
  {
    id: 'prime-271',
    n: 271,
    order: 58,
    range: '201-300',
    form6k: '6(45) + 1',
    isTwinPrime: true,
    twinPair: 269,
    tip: 'Twin pair with 269.'
  },
  {
    id: 'prime-277',
    n: 277,
    order: 59,
    range: '201-300',
    form6k: '6(46) + 1',
    isTwinPrime: false,
    tip: 'Prime in 270s.'
  },
  {
    id: 'prime-281',
    n: 281,
    order: 60,
    range: '201-300',
    form6k: '6(47) - 1',
    isTwinPrime: true,
    twinPair: 283,
    tip: 'Twin pair with 283.'
  },
  {
    id: 'prime-283',
    n: 283,
    order: 61,
    range: '201-300',
    form6k: '6(47) + 1',
    isTwinPrime: true,
    twinPair: 281,
    tip: 'Twin pair with 281.'
  },
  {
    id: 'prime-293',
    n: 293,
    order: 62,
    range: '201-300',
    form6k: '6(49) - 1',
    isTwinPrime: false,
    tip: 'Largest prime under 300. Total primes from 1 to 300 = 62.'
  }
];

// Famous composite numbers examiners love to test because students mistake them for primes!
export const FAMOUS_COMPOSITE_TRAPS = [
  { num: 91, factors: '7 × 13', note: 'Top #1 trap number in SSC exams! Looks prime but is divisible by 7 and 13.' },
  { num: 119, factors: '7 × 17', note: 'Divisible by 7 and 17. Ends in 9, tricking students.' },
  { num: 133, factors: '7 × 19', note: 'Divisible by 7 and 19. Often tested in divisibility.' },
  { num: 143, factors: '11 × 13', note: 'Product of two consecutive primes 11 and 13.' },
  { num: 161, factors: '7 × 23', note: 'Divisible by 7 and 23.' },
  { num: 209, factors: '11 × 19', note: 'Divisible by 11 and 19.' },
  { num: 221, factors: '13 × 17', note: 'Product of twin-like primes 13 and 17.' },
  { num: 247, factors: '13 × 19', note: 'Divisible by 13 and 19.' },
  { num: 289, factors: '17 × 17 (17²)', note: 'Perfect square of 17.' },
  { num: 299, factors: '13 × 23', note: 'Divisible by 13 and 23.' }
];

export const PRIME_BENCHMARKS = [
  { range: '1 to 50', count: 15, note: '2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47' },
  { range: '51 to 100', count: 10, note: '53, 59, 61, 67, 71, 73, 79, 83, 89, 97' },
  { range: '1 to 100 (Total)', count: 25, note: 'Sum of all primes up to 100 is 1060.' },
  { range: '101 to 200', count: 21, note: 'Smallest 3-digit prime is 101; largest under 200 is 199.' },
  { range: '1 to 200 (Total)', count: 46, note: '25 + 21 = 46 primes total.' },
  { range: '201 to 300', count: 16, note: 'Smallest is 211, largest is 293.' },
  { range: '1 to 300 (Total)', count: 62, note: '25 + 21 + 16 = 62 primes total.' }
];

// Helper to test primality on-the-fly for any integer
export const checkPrimality = (num: number): { isPrime: boolean; factor?: number; steps: string[] } => {
  if (num <= 1) {
    return { isPrime: false, steps: [`${num} is neither prime nor composite by definition.`] };
  }
  if (num === 2) {
    return { isPrime: true, steps: ['2 is prime (the only even prime).'] };
  }
  if (num === 3) {
    return { isPrime: true, steps: ['3 is prime.'] };
  }
  if (num % 2 === 0) {
    return { isPrime: false, factor: 2, steps: [`${num} is even, so it is divisible by 2.`] };
  }
  if (num % 3 === 0) {
    return { isPrime: false, factor: 3, steps: [`Sum of digits is divisible by 3, so ${num} is divisible by 3.`] };
  }

  const limit = Math.floor(Math.sqrt(num));
  const steps: string[] = [`Check primes up to √${num} ≈ ${limit}:`];

  for (let i = 5; i <= limit; i += 6) {
    if (num % i === 0) {
      steps.push(`${num} is divisible by ${i} (${i} × ${num / i} = ${num})`);
      return { isPrime: false, factor: i, steps };
    }
    if (num % (i + 2) === 0) {
      steps.push(`${num} is divisible by ${i + 2} (${i + 2} × ${num / (i + 2)} = ${num})`);
      return { isPrime: false, factor: i + 2, steps };
    }
  }

  steps.push(`No prime divisor ≤ ${limit} divides ${num}. Hence, ${num} is a PRIME NUMBER!`);
  return { isPrime: true, steps };
};
