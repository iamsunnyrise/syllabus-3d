export interface TripletItem {
  id: string;
  a: number; // shorter leg
  b: number; // longer leg
  c: number; // hypotenuse (c^2 = a^2 + b^2)
  page: 'P1' | 'P2' | 'derived';
  isPrimitive: boolean;
  generator?: 'odd' | 'even' | 'twin' | 'consecutive';
  generatorDesc?: string;
  inradius: number; // r = (a + b - c) / 2
  circumradius: number; // R = c / 2
  area: number; // (a * b) / 2
  tip?: string;
  examUsage?: string;
  multiples?: [number, number, number][];
}

export type TripletCategoryTab = 'all' | 'P1' | 'P2' | 'derived' | 'weak';

export const TRIPLET_CATEGORIES: { id: TripletCategoryTab; label: string; count?: number }[] = [
  { id: 'all', label: 'All Triplets' },
  { id: 'P1', label: 'P1 (Core 16)' },
  { id: 'P2', label: 'P2 (Advanced)' },
  { id: 'derived', label: 'Multiples (Derived)' },
  { id: 'weak', label: 'Needs Review ⚠️' }
];

export const PYTHAGOREAN_TRIPLETS: TripletItem[] = [
  // ── PAGE 1 (P1) ────────────────────────────────────────────────────────
  {
    id: '3-4-5',
    a: 3,
    b: 4,
    c: 5,
    page: 'P1',
    isPrimitive: true,
    generator: 'odd',
    generatorDesc: 'Odd n=3 → (3, (3²-1)/2=4, (3²+1)/2=5)',
    inradius: 1,
    circumradius: 2.5,
    area: 6,
    tip: 'The #1 fundamental triplet. Difference between hypotenuse & longer leg is 1.',
    examUsage: 'Most frequent in Geometry, Trigonometry, Heights & Distances, and Coordinate Geometry.',
    multiples: [
      [6, 8, 10],
      [9, 12, 15],
      [12, 16, 20],
      [15, 20, 25],
      [30, 40, 50]
    ]
  },
  {
    id: '5-12-13',
    a: 5,
    b: 12,
    c: 13,
    page: 'P1',
    isPrimitive: true,
    generator: 'odd',
    generatorDesc: 'Odd n=5 → (5, (5²-1)/2=12, (5²+1)/2=13)',
    inradius: 2,
    circumradius: 6.5,
    area: 30,
    tip: 'Hypotenuse (13) and leg (12) differ by 1. Inradius is exactly 2.',
    examUsage: 'Circles (tangent-secant theorem), Cones (radius 5, height 12 → slant height 13).',
    multiples: [
      [10, 24, 26],
      [15, 36, 39],
      [20, 48, 52]
    ]
  },
  {
    id: '8-15-17',
    a: 8,
    b: 15,
    c: 17,
    page: 'P1',
    isPrimitive: true,
    generator: 'even',
    generatorDesc: 'Even n=8 → m=4 → (8, 4²-1=15, 4²+1=17)',
    inradius: 3,
    circumradius: 8.5,
    area: 60,
    tip: 'Even generator: m=4 gives 4²-1=15 and 4²+1=17. Inradius is 3.',
    examUsage: 'Right triangles inside circles; very popular in SSC CGL Tier 1 & 2.',
    multiples: [
      [16, 30, 34],
      [24, 45, 51]
    ]
  },
  {
    id: '7-24-25',
    a: 7,
    b: 24,
    c: 25,
    page: 'P1',
    isPrimitive: true,
    generator: 'odd',
    generatorDesc: 'Odd n=7 → (7, (7²-1)/2=24, (7²+1)/2=25)',
    inradius: 3,
    circumradius: 12.5,
    area: 84,
    tip: 'Difference between 25 and 24 is 1. Sum 25 + 24 = 49 = 7².',
    examUsage: 'Cone slant height problems, circles with chord distance 24.',
    multiples: [
      [14, 48, 50],
      [21, 72, 75]
    ]
  },
  {
    id: '20-21-29',
    a: 20,
    b: 21,
    c: 29,
    page: 'P1',
    isPrimitive: true,
    generator: 'consecutive',
    generatorDesc: 'Near-isosceles: Legs differ by only 1 (21 - 20 = 1)',
    inradius: 6,
    circumradius: 14.5,
    area: 210,
    tip: 'Consecutive legs (20 and 21). Hypotenuse is 29.',
    examUsage: 'Square diagonals, mensuration perimeter questions.',
    multiples: [
      [40, 42, 58]
    ]
  },
  {
    id: '12-35-37',
    a: 12,
    b: 35,
    c: 37,
    page: 'P1',
    isPrimitive: true,
    generator: 'even',
    generatorDesc: 'Even n=12 → m=6 → (12, 6²-1=35, 6²+1=37)',
    inradius: 5,
    circumradius: 18.5,
    area: 210,
    tip: 'Even generator: half of 12 is 6. 6² - 1 = 35, 6² + 1 = 37.',
    examUsage: 'Right triangle inradius problems where r = (12+35-37)/2 = 5.',
    multiples: [
      [24, 70, 74]
    ]
  },
  {
    id: '9-40-41',
    a: 9,
    b: 40,
    c: 41,
    page: 'P1',
    isPrimitive: true,
    generator: 'odd',
    generatorDesc: 'Odd n=9 → (9, (9²-1)/2=40, (9²+1)/2=41)',
    inradius: 4,
    circumradius: 20.5,
    area: 180,
    tip: '9² = 81. Split 81 into two consecutive integers: 40 and 41.',
    examUsage: 'Trigonometry identities: sec²θ - tan²θ = 1 using 41/40.',
    multiples: [
      [18, 80, 82]
    ]
  },
  {
    id: '28-45-53',
    a: 28,
    b: 45,
    c: 53,
    page: 'P1',
    isPrimitive: true,
    generator: 'even',
    generatorDesc: 'Primitive: 28² + 45² = 784 + 2025 = 2809 = 53²',
    inradius: 10,
    circumradius: 26.5,
    area: 630,
    tip: 'Inradius is a clean integer: r = (28+45-53)/2 = 10.',
    examUsage: 'Advanced geometry questions in SSC CGL Tier 2 & CDS.',
    multiples: []
  },
  {
    id: '11-60-61',
    a: 11,
    b: 60,
    c: 61,
    page: 'P1',
    isPrimitive: true,
    generator: 'odd',
    generatorDesc: 'Odd n=11 → (11, (11²-1)/2=60, (11²+1)/2=61)',
    inradius: 5,
    circumradius: 30.5,
    area: 330,
    tip: '11² = 121. Split 121 into 60 and 61.',
    examUsage: 'Circle chord distance where radius is 30.5 or chord is 120.',
    multiples: []
  },
  {
    id: '16-63-65',
    a: 16,
    b: 63,
    c: 65,
    page: 'P1',
    isPrimitive: true,
    generator: 'even',
    generatorDesc: 'Even n=16 → m=8 → (16, 8²-1=63, 8²+1=65)',
    inradius: 7,
    circumradius: 32.5,
    area: 504,
    tip: 'Twin Hypotenuse: 65 is also the hypotenuse of (33, 56, 65).',
    examUsage: 'Examiners love 65 because two different right triangles share the same hypotenuse!',
    multiples: []
  },
  {
    id: '33-56-65',
    a: 33,
    b: 56,
    c: 65,
    page: 'P1',
    isPrimitive: true,
    generator: 'twin',
    generatorDesc: 'Twin Hypotenuse: 33² + 56² = 1089 + 3136 = 4225 = 65²',
    inradius: 12,
    circumradius: 32.5,
    area: 924,
    tip: 'Paired with (16, 63, 65). Both have hypotenuse 65. Inradius is 12.',
    examUsage: 'Common in cyclic quadrilaterals with diameter 65.',
    multiples: []
  },
  {
    id: '48-55-73',
    a: 48,
    b: 55,
    c: 73,
    page: 'P1',
    isPrimitive: true,
    generator: 'even',
    generatorDesc: 'Primitive: 48² + 55² = 2304 + 3025 = 5329 = 73²',
    inradius: 15,
    circumradius: 36.5,
    area: 1320,
    tip: 'Clean inradius: r = (48 + 55 - 73) / 2 = 15.',
    examUsage: 'Tier-2 level geometry and coordinate questions.',
    multiples: []
  },
  {
    id: '13-84-85',
    a: 13,
    b: 84,
    c: 85,
    page: 'P1',
    isPrimitive: true,
    generator: 'odd',
    generatorDesc: 'Odd n=13 → (13, (13²-1)/2=84, (13²+1)/2=85)',
    inradius: 6,
    circumradius: 42.5,
    area: 546,
    tip: '13² = 169 = 84 + 85. Twin Hypotenuse with (36, 77, 85).',
    examUsage: 'Trigonometric heights & distances with slender right triangles.',
    multiples: []
  },
  {
    id: '36-77-85',
    a: 36,
    b: 77,
    c: 85,
    page: 'P1',
    isPrimitive: true,
    generator: 'twin',
    generatorDesc: 'Twin Hypotenuse: 36² + 77² = 1296 + 5929 = 7225 = 85²',
    inradius: 14,
    circumradius: 42.5,
    area: 1386,
    tip: 'Both (13, 84, 85) and (36, 77, 85) have hypotenuse 85.',
    examUsage: 'Mensuration of triangles sharing a common hypotenuse.',
    multiples: []
  },
  {
    id: '39-80-89',
    a: 39,
    b: 80,
    c: 89,
    page: 'P1',
    isPrimitive: true,
    generator: 'odd',
    generatorDesc: 'Primitive: 39² + 80² = 1521 + 6400 = 7921 = 89²',
    inradius: 15,
    circumradius: 44.5,
    area: 1560,
    tip: 'Notice 89 is prime. Inradius is exactly 15.',
    examUsage: 'Challenging questions in SSC CGL / CDS.',
    multiples: []
  },
  {
    id: '65-72-97',
    a: 65,
    b: 72,
    c: 97,
    page: 'P1',
    isPrimitive: true,
    generator: 'consecutive',
    generatorDesc: 'Primitive: 65² + 72² = 4225 + 5184 = 9409 = 97²',
    inradius: 20,
    circumradius: 48.5,
    area: 2340,
    tip: 'Inradius is a round 20: r = (65 + 72 - 97) / 2 = 20.',
    examUsage: 'Direct question in recent SSC CGL Mains geometry papers.',
    multiples: []
  },

  // ── PAGE 2 (P2) ────────────────────────────────────────────────────────
  {
    id: '20-99-101',
    a: 20,
    b: 99,
    c: 101,
    page: 'P2',
    isPrimitive: true,
    generator: 'even',
    generatorDesc: 'Even n=20 → m=10 → (20, 10²-1=99, 10²+1=101)',
    inradius: 9,
    circumradius: 50.5,
    area: 990,
    tip: 'Even generator: m = 20/2 = 10. Legs are 20 and 99, hypotenuse is 101 (diff = 2).',
    examUsage: 'Century hypotenuse (101). Frequently tested in SSC & Railway exams.',
    multiples: []
  },
  {
    id: '15-112-113',
    a: 15,
    b: 112,
    c: 113,
    page: 'P2',
    isPrimitive: true,
    generator: 'odd',
    generatorDesc: 'Odd n=15 → (15, (15²-1)/2=112, (15²+1)/2=113)',
    inradius: 7,
    circumradius: 56.5,
    area: 840,
    tip: '15² = 225. Split into 112 and 113 (diff = 1). Inradius = 7.',
    examUsage: 'High-level triangle mensuration and circle tangents.',
    multiples: []
  },
  {
    id: '17-144-145',
    a: 17,
    b: 144,
    c: 145,
    page: 'P2',
    isPrimitive: true,
    generator: 'odd',
    generatorDesc: 'Odd n=17 → (17, (17²-1)/2=144, (17²+1)/2=145)',
    inradius: 8,
    circumradius: 72.5,
    area: 1224,
    tip: '17² = 289 = 144 + 145. Notice inradius is 8.',
    examUsage: 'Slender right triangles in advanced trigonometry.',
    multiples: []
  },
  {
    id: '19-180-181',
    a: 19,
    b: 180,
    c: 181,
    page: 'P2',
    isPrimitive: true,
    generator: 'odd',
    generatorDesc: 'Odd n=19 → (19, (19²-1)/2=180, (19²+1)/2=181)',
    inradius: 9,
    circumradius: 90.5,
    area: 1710,
    tip: '19² = 361 = 180 + 181. Hypotenuse and leg differ by 1.',
    examUsage: 'High-value calculation trick for large odd numbers.',
    multiples: []
  },
  {
    id: '24-143-145',
    a: 24,
    b: 143,
    c: 145,
    page: 'P2',
    isPrimitive: true,
    generator: 'even',
    generatorDesc: 'Even n=24 → m=12 → (24, 12²-1=143, 12²+1=145)',
    inradius: 11,
    circumradius: 72.5,
    area: 1716,
    tip: 'Twin Hypotenuse with (17, 144, 145). Both have hypotenuse 145.',
    examUsage: 'Paired geometry questions testing alternative integer sides.',
    multiples: []
  },

  // ── MULTIPLES / DERIVED TRIPLETS (Extremely common in SSC CGL) ───────────
  {
    id: '6-8-10',
    a: 6,
    b: 8,
    c: 10,
    page: 'derived',
    isPrimitive: false,
    generator: 'consecutive',
    generatorDesc: 'Scaled: 2 × (3, 4, 5)',
    inradius: 2,
    circumradius: 5,
    area: 24,
    tip: 'Exact double of (3, 4, 5). Circle with radius 5 has diameter 10.',
    examUsage: 'Found in virtually every standard mensuration mock test.'
  },
  {
    id: '9-12-15',
    a: 9,
    b: 12,
    c: 15,
    page: 'derived',
    isPrimitive: false,
    generator: 'consecutive',
    generatorDesc: 'Scaled: 3 × (3, 4, 5)',
    inradius: 3,
    circumradius: 7.5,
    area: 54,
    tip: 'Exact triple of (3, 4, 5). Inradius is 3.',
    examUsage: 'Heights and distances (30°-60°-90° right triangle approximations).'
  },
  {
    id: '12-16-20',
    a: 12,
    b: 16,
    c: 20,
    page: 'derived',
    isPrimitive: false,
    generator: 'consecutive',
    generatorDesc: 'Scaled: 4 × (3, 4, 5)',
    inradius: 4,
    circumradius: 10,
    area: 96,
    tip: '4 × (3, 4, 5). Area = 96, inradius = 4.',
    examUsage: 'Rectangle diagonals (length 16, breadth 12 → diagonal 20).'
  },
  {
    id: '15-20-25',
    a: 15,
    b: 20,
    c: 25,
    page: 'derived',
    isPrimitive: false,
    generator: 'consecutive',
    generatorDesc: 'Scaled: 5 × (3, 4, 5)',
    inradius: 5,
    circumradius: 12.5,
    area: 150,
    tip: '5 × (3, 4, 5). Difference between legs is 5.',
    examUsage: 'Cone and cylinder combination questions.'
  },
  {
    id: '10-24-26',
    a: 10,
    b: 24,
    c: 26,
    page: 'derived',
    isPrimitive: false,
    generator: 'consecutive',
    generatorDesc: 'Scaled: 2 × (5, 12, 13)',
    inradius: 4,
    circumradius: 13,
    area: 120,
    tip: 'Exact double of (5, 12, 13). Inradius is 4.',
    examUsage: 'Circles with chord 24 and radius 13 (distance from center = 5, or scaled = 10).'
  },
  {
    id: '14-48-50',
    a: 14,
    b: 48,
    c: 50,
    page: 'derived',
    isPrimitive: false,
    generator: 'consecutive',
    generatorDesc: 'Scaled: 2 × (7, 24, 25)',
    inradius: 6,
    circumradius: 25,
    area: 336,
    tip: 'Exact double of (7, 24, 25). Hypotenuse is 50.',
    examUsage: 'Two concentric circles with radii 25 and 7.'
  },
  {
    id: '16-30-34',
    a: 16,
    b: 30,
    c: 34,
    page: 'derived',
    isPrimitive: false,
    generator: 'consecutive',
    generatorDesc: 'Scaled: 2 × (8, 15, 17)',
    inradius: 6,
    circumradius: 17,
    area: 240,
    tip: 'Double of (8, 15, 17). Common trap when students forget to divide by 2.',
    examUsage: 'Rhombus diagonals (30 and 16 → side = 17).'
  },
  {
    id: '30-40-50',
    a: 30,
    b: 40,
    c: 50,
    page: 'derived',
    isPrimitive: false,
    generator: 'consecutive',
    generatorDesc: 'Scaled: 10 × (3, 4, 5)',
    inradius: 10,
    circumradius: 25,
    area: 600,
    tip: '10 × (3, 4, 5). Clean round numbers for quick mental maths.',
    examUsage: 'Physics speed & displacement questions, speed-time-distance.'
  }
];

export const TRIPLET_GENERATION_RULES = [
  {
    title: 'Odd Number Triplet Rule',
    formula: 'n (odd) → (n, \\frac{n^2-1}{2}, \\frac{n^2+1}{2})',
    example: 'n = 3 → 3²=9 → (9-1)/2=4, (9+1)/2=5 → (3, 4, 5)',
    note: 'Works for ANY odd number n ≥ 3. Hypotenuse and longer leg always differ by 1!'
  },
  {
    title: 'Even Number Triplet Rule',
    formula: '2m (even) → (2m, m^2-1, m^2+1)',
    example: 'n = 8 (m=4) → 4²-1=15, 4²+1=17 → (8, 15, 17)',
    note: 'Take half of the even number (m). Then m²-1 and m²+1 form the triplet! Hypotenuse & longer leg differ by 2.'
  },
  {
    title: 'Inradius of Right Triangle',
    formula: 'r = \\frac{a + b - c}{2}',
    example: 'For (3, 4, 5): r = (3 + 4 - 5)/2 = 2/2 = 1',
    note: 'One of the top 3 most repeated geometry formulas in SSC CGL Tier 1 & 2.'
  },
  {
    title: 'Circumradius of Right Triangle',
    formula: 'R = \\frac{c}{2} = \\frac{\\text{Hypotenuse}}{2}',
    example: 'For (5, 12, 13): R = 13/2 = 6.5',
    note: 'The circumcenter of any right triangle always lies at the midpoint of its hypotenuse.'
  }
];
