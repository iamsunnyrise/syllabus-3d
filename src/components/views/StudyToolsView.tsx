import React, { useState, useMemo, useEffect } from 'react';
import {
  BookOpen,
  Calculator,
  Compass,
  Search,
  Sparkles,
  RotateCw,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  ChevronRight,
  ChevronDown,
  Brain,
  Zap,
  Flame,
  Award,
  Layers,
  HelpCircle,
  BookMarked,
  Filter,
  Bookmark,
  Share2,
  Play,
  RotateCcw,
  Plus,
  ArrowRight,
  Hash,
  Boxes,
  Volume2
} from 'lucide-react';
import { AppView } from '../layout/Sidebar';
import { soundManager } from '../../utils/soundEffects';
import { haptics } from '../../utils/haptics';
import { CalculationBoosterTables } from './CalculationBoosterTables';
import { CalculationBoosterSquares } from './CalculationBoosterSquares';
import { CalculationBoosterCubes } from './CalculationBoosterCubes';
import { LEVEL_1_SET_01_WORDS, VocabItem, VocabLevel } from '../../data/highYieldVocabData';

export type { VocabItem, VocabLevel };

export type StudyToolTab = 'vocab' | 'maths' | 'ga';
export type MathsSubTab = 'overview' | 'calc-booster';

interface StudyToolsViewProps {
  initialTab?: StudyToolTab;
  initialMathsTab?: MathsSubTab;
  onNavigate?: (view: AppView) => void;
}

// -------------------------------------------------------------
// VOCABULARY DATA
// -------------------------------------------------------------

interface VocabLevelConfig {
  id: VocabLevel;
  label: string;
  shortLabel: string;
  badge: string;
  description: string;
  sets: { id: string; label: string }[];
}

const HIGH_YIELD_LEVELS: VocabLevelConfig[] = [
  {
    id: 'level-1',
    label: 'Level 1',
    shortLabel: 'L1',
    badge: 'Foundation',
    description: 'High-frequency core words essential for tier-1 exam scoring.',
    sets: [
      { id: 'set-01', label: 'Set 01' },
      { id: 'set-02', label: 'Set 02' },
      { id: 'set-03', label: 'Set 03' },
      { id: 'set-04', label: 'Set 04' },
      { id: 'set-05', label: 'Set 05' }
    ]
  },
  {
    id: 'level-2',
    label: 'Level 2',
    shortLabel: 'L2',
    badge: 'Intermediate',
    description: 'Moderate difficulty words frequently tested in Cloze tests & Error spotting.',
    sets: [
      { id: 'set-01', label: 'Set 01' },
      { id: 'set-02', label: 'Set 02' },
      { id: 'set-03', label: 'Set 03' },
      { id: 'set-04', label: 'Set 04' },
      { id: 'set-05', label: 'Set 05' }
    ]
  },
  {
    id: 'level-3',
    label: 'Level 3',
    shortLabel: 'L3',
    badge: 'Exam Hard',
    description: 'Tough, nuanced vocabulary tested in Mains and high-cutoff shifts.',
    sets: [
      { id: 'set-01', label: 'Set 01' },
      { id: 'set-02', label: 'Set 02' },
      { id: 'set-03', label: 'Set 03' },
      { id: 'set-04', label: 'Set 04' },
      { id: 'set-05', label: 'Set 05' }
    ]
  },
  {
    id: 'advanced',
    label: 'Advanced Level',
    shortLabel: 'ADV',
    badge: 'Mastery',
    description: 'Top-tier editorial & critical reading vocabulary for 100% accuracy.',
    sets: [
      { id: 'set-01', label: 'Set 01' },
      { id: 'set-02', label: 'Set 02' },
      { id: 'set-03', label: 'Set 03' },
      { id: 'set-04', label: 'Set 04' },
      { id: 'set-05', label: 'Set 05' }
    ]
  }
];

const DEFAULT_VOCAB_DATA: VocabItem[] = [
  ...LEVEL_1_SET_01_WORDS,
  // OWS, Idioms & Roots
  {
    id: 'v-ows-1',
    word: 'Philanthropist',
    phonetic: '/fɪˈlæn.θrə.pɪst/',
    hindi: 'परोपकारी / जनहितैषी',
    type: 'ows',
    partOfSpeech: 'Noun (OWS)',
    meaning: 'A person who seeks to promote the welfare of others, especially by generous donation of money to good causes.',
    synonyms: ['Altruist', 'Benefactor', 'Humanitarian', 'Patron'],
    antonyms: ['Misanthrope', 'Egoist', 'Miser', 'Malevolent'],
    example: 'The billionaire retired early to dedicate his life as a philanthropist.',
    mnemonic: 'Phil (Love) + Anthro (Human) -> One who loves humanity.',
    frequency: 'Very High',
    examTags: ['SSC CGL', 'CPO', 'Banking'],
    collocation: 'Generous / Renowned philanthropist',
    derivatives: 'Philanthropy (noun), Philanthropic (adjective)'
  },
  {
    id: 'v-idiom-1',
    word: 'Spill the beans',
    phonetic: '/spɪl ðə biːnz/',
    hindi: 'भेद खोलना / रहस्य उजागर करना',
    type: 'idiom',
    partOfSpeech: 'Idiom',
    meaning: 'To disclose a secret prematurely or indiscreetly.',
    synonyms: ['Let the cat out of the bag', 'Divulge', 'Disclose', 'Reveal'],
    antonyms: ['Keep under wraps', 'Clam up', 'Conceal'],
    example: 'Trust him with your surprise party plan and he is sure to spill the beans.',
    mnemonic: 'Imagine dropping a jar of beans -> All hidden beans scatter in the open!',
    frequency: 'Repeated',
    examTags: ['SSC CGL', 'CHSL', 'MTS'],
    collocation: 'Spill the beans to the press / police'
  },
  {
    id: 'v-root-1',
    word: 'Bene- / Ben-',
    phonetic: '/bɛn/',
    hindi: 'अच्छा / शुभ / लाभकारी (Root Word)',
    type: 'root',
    partOfSpeech: 'Prefix / Root',
    meaning: 'Root meaning "Good" or "Well". Forms words related to kindness and benefits.',
    synonyms: ['Benevolent (Kind)', 'Benefactor (Helper)', 'Beneficial (Favorable)', 'Benediction (Blessing)'],
    antonyms: ['Mal- (Bad)', 'Malevolent (Spiteful)'],
    example: 'Benevolent leaders always consider the welfare of their poorest citizens.',
    mnemonic: 'Bene is opposite of Mal (Malnutrition, Malpractice).',
    frequency: 'High',
    examTags: ['SSC CGL', 'CDS', 'CAT'],
    collocation: 'Root in Benevolence, Beneficial, Benediction'
  },
  {
    id: 'v-ows-2',
    word: 'Omniscient',
    phonetic: '/ɑːmˈnɪʃ.ənt/',
    hindi: 'सर्वज्ञानी / सब कुछ जानने वाला',
    type: 'ows',
    partOfSpeech: 'Noun / Adj (OWS)',
    meaning: 'One who knows everything; having infinite knowledge.',
    synonyms: ['All-knowing', 'All-wise', 'Pansophic'],
    antonyms: ['Ignorant', 'Unknowing', 'Uninformed'],
    example: 'In traditional theology, the Supreme Creator is believed to be omniscient.',
    mnemonic: 'Omni (All) + Scient (Science/Knowing) -> Knowing everything.',
    frequency: 'Repeated',
    examTags: ['SSC CGL', 'CPO', 'Steno'],
    collocation: 'Omniscient narrator / deity',
    derivatives: 'Omniscience (noun), Omnisciently (adverb)'
  },
  {
    id: 'v-idiom-2',
    word: 'Burn the midnight oil',
    phonetic: '/bɜːn ðə ˈmɪd.naɪt ɔɪl/',
    hindi: 'देर रात तक कड़ी मेहनत / पढ़ाई करना',
    type: 'idiom',
    partOfSpeech: 'Idiom',
    meaning: 'To work or study late into the night.',
    synonyms: ['Work overtime', 'Burn the candle at both ends', 'Toil'],
    antonyms: ['Slack off', 'Idleness', 'Procrastinate'],
    example: 'Aspirants often burn the midnight oil during the final revision month.',
    mnemonic: 'Before electricity, studying late required keeping the oil lamp burning until midnight.',
    frequency: 'Repeated',
    examTags: ['SSC CGL', 'CHSL', 'Railway'],
    collocation: 'Burn the midnight oil to crack exam'
  },
  {
    id: 'v-root-2',
    word: 'Chron-',
    phonetic: '/krɒn/',
    hindi: 'समय (Time) संबंधित Root',
    type: 'root',
    partOfSpeech: 'Root Word',
    meaning: 'Greek root meaning "Time". Forms words related to sequence and duration.',
    synonyms: ['Chronology (Time sequence)', 'Synchronize (Match time)', 'Chronic (Long duration)', 'Chronicle (Historical record)'],
    antonyms: ['Anachronism (Out of time order)'],
    example: 'Arrange the historical events in strict chronological order.',
    mnemonic: 'Chronometer is an instrument designed to measure precise time.',
    frequency: 'High',
    examTags: ['SSC CGL', 'NDA', 'CDS'],
    collocation: 'Root in Chronic illness, Synchronize clocks'
  },
  {
    id: 'v-ows-3',
    word: 'Somnambulist',
    phonetic: '/sɑːmˈnæm.bjə.lɪst/',
    hindi: 'नींद में चलने वाला व्यक्ति',
    type: 'ows',
    partOfSpeech: 'Noun (OWS)',
    meaning: 'A person who walks in their sleep.',
    synonyms: ['Sleepwalker', 'Noctambulist'],
    antonyms: ['Waker', 'Alert person'],
    example: 'The doctor diagnosed the child as a chronic somnambulist.',
    mnemonic: 'Somn (Sleep) + Ambul (Walk as in Ambulance) -> Walks while asleep.',
    frequency: 'Repeated',
    examTags: ['SSC CGL', 'CHSL', 'CPO'],
    collocation: 'Chronic somnambulist',
    derivatives: 'Somnambulism (noun)'
  }
];

// -------------------------------------------------------------
// MATHS SPEED DATA & FORMULA VAULT
// -------------------------------------------------------------
interface FractionCard {
  fraction: string;
  percentage: string;
  decimal: string;
  note?: string;
}

const FRACTION_CHART: FractionCard[] = [
  { fraction: '1/2', percentage: '50%', decimal: '0.50' },
  { fraction: '1/3', percentage: '33.33% (33⅓%)', decimal: '0.333' },
  { fraction: '1/4', percentage: '25%', decimal: '0.25' },
  { fraction: '1/5', percentage: '20%', decimal: '0.20' },
  { fraction: '1/6', percentage: '16.66% (16⅔%)', decimal: '0.166' },
  { fraction: '1/7', percentage: '14.28% (14²⁄₇%)', decimal: '0.1428', note: '2/7 = 28.56%' },
  { fraction: '1/8', percentage: '12.5% (12½%)', decimal: '0.125', note: '3/8 = 37.5%, 5/8 = 62.5%' },
  { fraction: '1/9', percentage: '11.11% (11¹⁄₉%)', decimal: '0.111' },
  { fraction: '1/10', percentage: '10%', decimal: '0.10' },
  { fraction: '1/11', percentage: '9.09% (9¹⁄₁₁%)', decimal: '0.0909' },
  { fraction: '1/12', percentage: '8.33% (8⅓%)', decimal: '0.0833' },
  { fraction: '1/13', percentage: '7.69% (7⁹⁄₁₃%)', decimal: '0.0769' },
  { fraction: '1/14', percentage: '7.14% (7¹⁄₇%)', decimal: '0.0714' },
  { fraction: '1/15', percentage: '6.66% (6⅔%)', decimal: '0.0666' },
  { fraction: '1/16', percentage: '6.25% (6¼%)', decimal: '0.0625' },
  { fraction: '1/20', percentage: '5%', decimal: '0.05' },
  { fraction: '1/25', percentage: '4%', decimal: '0.04' }
];

interface MathFormula {
  id: string;
  category: 'Arithmetic' | 'Algebra' | 'Geometry' | 'Trigonometry' | 'Mensuration';
  title: string;
  formula: string;
  explanation: string;
  shortTrick: string;
}

const MATH_FORMULAS: MathFormula[] = [
  {
    id: 'm1',
    category: 'Arithmetic',
    title: 'Successive Percentage Change',
    formula: 'Net % Change = a + b + (a × b) / 100',
    explanation: 'Used for two consecutive percentage changes a% and b%. If decrease, use negative sign.',
    shortTrick: 'For +20% and +30% -> 20 + 30 + (20×30)/100 = 56% net increase.'
  },
  {
    id: 'm2',
    category: 'Arithmetic',
    title: 'Difference between CI and SI (2 Years & 3 Years)',
    formula: '2 Yrs: D = P(R/100)²  |  3 Yrs: D = P(R/100)² × (300 + R)/100',
    explanation: 'Directly gives the difference between Compound Interest and Simple Interest on Principal P at rate R%.',
    shortTrick: 'For 2 years: D/P = (R/100)². Extreme high-frequency formula in SSC CGL Tier-1.'
  },
  {
    id: 'm3',
    category: 'Arithmetic',
    title: 'Time & Work (Efficiency Method)',
    formula: 'Total Work = LCM(Days)  |  Efficiency = Total Work / Days  |  Time = Total Work / Total Efficiency',
    explanation: 'Instead of reciprocal fractions (1/a + 1/b), assume Total Work as LCM of days.',
    shortTrick: 'A in 10d, B in 15d -> LCM = 30. Eff_A = 3, Eff_B = 2. Together time = 30/(3+2) = 6 days.'
  },
  {
    id: 'm4',
    category: 'Algebra',
    title: 'Special Algebraic Identity: a³ + b³ + c³ - 3abc',
    formula: 'a³ + b³ + c³ - 3abc = (a + b + c)(a² + b² + c² - ab - bc - ca) = ½(a + b + c)[(a - b)² + (b - c)² + (c - a)²]',
    explanation: 'If a + b + c = 0, then a³ + b³ + c³ = 3abc.',
    shortTrick: 'If x + y + z = 0, always check if expression reduces directly to 3xyz.'
  },
  {
    id: 'm5',
    category: 'Geometry',
    title: 'Tangent-Secant Theorem (Circle)',
    formula: 'PT² = PA × PB',
    explanation: 'From external point P, PT is tangent touching circle at T, and PAB is secant intersecting circle at A and B.',
    shortTrick: 'Tangent square always equals product of full secant (PB) and outer segment (PA).'
  },
  {
    id: 'm6',
    category: 'Geometry',
    title: 'Direct Common Tangent (DCT) vs Transverse (TCT)',
    formula: 'DCT = √(d² - (r₁ - r₂)²)   |   TCT = √(d² - (r₁ + r₂)²)',
    explanation: 'Where d is distance between centres, r₁ and r₂ are radii of the two circles.',
    shortTrick: 'DCT has minus between radii (r₁ - r₂); TCT has plus between radii (r₁ + r₂).'
  },
  {
    id: 'm7',
    category: 'Trigonometry',
    title: 'Maximum & Minimum of a·sin(θ) + b·cos(θ)',
    formula: 'Max Value = +√(a² + b²)   |   Min Value = -√(a² + b²)',
    explanation: 'For any linear combination of sin and cos with identical angles.',
    shortTrick: 'For 3sinθ + 4cosθ -> Max = +√(9+16) = +5, Min = -5.'
  },
  {
    id: 'm8',
    category: 'Mensuration',
    title: 'Frustum of Cone (Volume & Slant Height)',
    formula: 'Volume = ⅓πh (R² + r² + R·r)   |   Slant Height l = √(h² + (R - r)²)',
    explanation: 'Formed by slicing a right cone parallel to its base. R is base radius, r is top radius.',
    shortTrick: 'Curved Surface Area = π(R + r)·l. Total Surface Area = π[(R + r)l + R² + r²].'
  }
];

// -------------------------------------------------------------
// GENERAL AWARENESS (GA) DATA
// -------------------------------------------------------------
interface GaTopic {
  id: string;
  subject: 'Polity' | 'History' | 'Geography' | 'Science' | 'Static GK';
  title: string;
  badge: string;
  keyPoints: { label: string; detail: string }[];
  summaryNote: string;
}

const GA_TOPICS: GaTopic[] = [
  {
    id: 'ga1',
    subject: 'Polity',
    title: 'Most Repeated Constitutional Articles',
    badge: 'Articles 14-51A',
    keyPoints: [
      { label: 'Article 14', detail: 'Equality before law and equal protection of the laws.' },
      { label: 'Article 19', detail: 'Protection of 6 fundamental freedoms (Speech, Assembly, Association, Movement, Residence, Profession).' },
      { label: 'Article 21', detail: 'Protection of Life and Personal Liberty (includes Right to Privacy - Puttaswamy case).' },
      { label: 'Article 21A', detail: 'Right to Education (6 to 14 years) added by 86th Constitutional Amendment 2002.' },
      { label: 'Article 32', detail: 'Right to Constitutional Remedies (5 Writs: Habeas Corpus, Mandamus, Prohibition, Quo-Warranto, Certiorari) - Heart and Soul of Constitution.' },
      { label: 'Article 44', detail: 'Uniform Civil Code (UCC) under Directive Principles of State Policy.' },
      { label: 'Article 51A', detail: '11 Fundamental Duties (Added on recommendation of Swaran Singh Committee via 42nd Amendment 1976).' }
    ],
    summaryNote: 'Trick for 12 Schedules: "TEARS OF OLD PM" (Territories, Emoluments, Affirmations, Rajya Sabha, Scheduled areas, Other tribal areas, Federal lists, Official Languages, Land reforms, Defection, Panchayats, Municipalities).'
  },
  {
    id: 'ga2',
    subject: 'History',
    title: 'Modern Indian Freedom Struggle Milestones',
    badge: '1885 - 1947',
    keyPoints: [
      { label: '1885', detail: 'Indian National Congress formed by A.O. Hume. 1st President: W.C. Bonnerjee (Bombay, 72 delegates).' },
      { label: '1905', detail: 'Partition of Bengal announced by Lord Curzon. Swadeshi & Boycott movement launched.' },
      { label: '1907', detail: 'Surat Split between Moderates (led by Gokhale) and Extremists (Lal-Bal-Pal).' },
      { label: '1919', detail: 'Jallianwala Bagh Massacre (13 April) ordered by General Dyer. Montagu-Chelmsford Reforms.' },
      { label: '1920-22', detail: 'Non-Cooperation Movement launched by Mahatma Gandhi. Suspended after Chauri Chaura incident.' },
      { label: '1930', detail: 'Dandi March (12 March - 6 April 1930) from Sabarmati to Dandi (240 miles) launching Civil Disobedience.' },
      { label: '1931', detail: 'Gandhi-Irwin Pact signed; Bhagat Singh, Sukhdev & Rajguru martyred on 23 March 1931.' },
      { label: '1942', detail: 'Quit India Movement launched on 8 August ("Do or Die" call by Gandhi).' }
    ],
    summaryNote: 'Governor-Generals: Warren Hastings (1st GG of Bengal), William Bentinck (1st GG of India), Lord Canning (1st Viceroy of India).'
  },
  {
    id: 'ga3',
    subject: 'Geography',
    title: 'Indian Rivers & Tributaries Master Chart',
    badge: 'River Systems',
    keyPoints: [
      { label: 'Indus System', detail: 'Origin: Bokhar Chu (Tibet). Left Bank Tributaries: Jhelum, Chenab (largest), Ravi, Beas, Sutlej.' },
      { label: 'Ganga System', detail: 'Formed by confluence of Bhagirathi and Alaknanda at Devprayag. Left Bank: Ramganga, Gomti, Ghaghara, Gandak, Kosi. Right Bank: Yamuna, Son.' },
      { label: 'Brahmaputra', detail: 'Origin: Chemayungdung glacier (Tibet as Tsangpo). Enters India via Dihang gorge. Largest river island: Majuli (Assam).' },
      { label: 'Godavari (Dakshin Ganga)', detail: 'Longest peninsular river (1,465 km). Origin: Trimbakeshwar (Nashik). Tributaries: Penganga, Wainganga, Indravati, Manjira.' },
      { label: 'West-Flowing Rivers', detail: 'Narmada (Rift Valley, Dhuandhar falls, Amarkantak) and Tapti (Betul, MP) drain into Arabian Sea forming estuaries, not deltas.' }
    ],
    summaryNote: 'Highest Peak in India: Kanchenjunga (8,586 m) in Sikkim. Oldest mountain range: Aravalli.'
  },
  {
    id: 'ga4',
    subject: 'Science',
    title: 'Common Chemical Formulas & Vitamin Deficiencies',
    badge: 'General Science',
    keyPoints: [
      { label: 'Baking Soda', detail: 'Sodium Bicarbonate: NaHCO₃' },
      { label: 'Washing Soda', detail: 'Sodium Carbonate Decahydrate: Na₂CO₃·10H₂O' },
      { label: 'Bleaching Powder', detail: 'Calcium Hypochlorite / Oxychloride: CaOCl₂' },
      { label: 'Plaster of Paris', detail: 'Calcium Sulphate Hemihydrate: CaSO₄·½H₂O (Gypsum is CaSO₄·2H₂O)' },
      { label: 'Vitamin A (Retinol)', detail: 'Deficiency leads to Night Blindness (Nyctalopia) and Xerophthalmia.' },
      { label: 'Vitamin B1 (Thiamine)', detail: 'Deficiency causes Beri-Beri.' },
      { label: 'Vitamin C (Ascorbic Acid)', detail: 'Deficiency causes Scurvy (bleeding gums).' },
      { label: 'Vitamin D (Calciferol)', detail: 'Deficiency causes Rickets in children and Osteomalacia in adults.' }
    ],
    summaryNote: 'Blood Group: Karl Landsteiner discovered ABO blood groups. Universal Donor: O negative. Universal Recipient: AB positive.'
  },
  {
    id: 'ga5',
    subject: 'Static GK',
    title: '8 Classical Dances of India & State Festivals',
    badge: 'Art & Culture',
    keyPoints: [
      { label: 'Bharatnatyam', detail: 'Tamil Nadu (Oldest classical dance, associated with Devadasis).' },
      { label: 'Kathak', detail: 'Uttar Pradesh / North India (Gharanas: Lucknow, Jaipur, Banaras).' },
      { label: 'Kathakali', detail: 'Kerala (Dramatic makeup, character colors: green for noble, black for evil).' },
      { label: 'Kuchipudi', detail: 'Andhra Pradesh (Originates from Kuchelapuram village, brass plate dance).' },
      { label: 'Mohiniyattam', detail: 'Kerala (Dance of the enchantress, white and gold costume).' },
      { label: 'Odissi', detail: 'Odisha (Tribhanga posture, mentions in Natya Shastra).' },
      { label: 'Manipuri', detail: 'Manipur (Theme: Raas Leela of Radha-Krishna).' },
      { label: 'Sattriya', detail: 'Assam (Introduced by saint Srimanta Sankardev in 15th century).' }
    ],
    summaryNote: 'Key Festivals: Hornbill (Nagaland), Losar (Ladakh/Arunachal), Onam (Kerala), Chapchar Kut (Mizoram), Bihu (Assam).'
  }
];

const getPosBadgeColor = (pos: string) => {
  const p = (pos || '').toLowerCase();
  if (p.includes('noun')) return 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30';
  if (p.includes('verb') && !p.includes('adverb')) return 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30';
  if (p.includes('adjective') || p.includes('adj')) return 'bg-blue-500/15 text-blue-800 dark:text-blue-300 border-blue-500/30';
  if (p.includes('adverb') || p.includes('adv')) return 'bg-purple-500/15 text-purple-800 dark:text-purple-300 border-purple-500/30';
  if (p.includes('preposition') || p.includes('prep')) return 'bg-indigo-500/15 text-indigo-800 dark:text-indigo-300 border-indigo-500/30';
  if (p.includes('conjunction') || p.includes('conj')) return 'bg-teal-500/15 text-teal-800 dark:text-teal-300 border-teal-500/30';
  if (p.includes('pronoun') || p.includes('determiner')) return 'bg-pink-500/15 text-pink-800 dark:text-pink-300 border-pink-500/30';
  if (p.includes('idiom')) return 'bg-rose-500/15 text-rose-800 dark:text-rose-300 border-rose-500/30';
  if (p.includes('root') || p.includes('prefix')) return 'bg-cyan-500/15 text-cyan-800 dark:text-cyan-300 border-cyan-500/30';
  return 'bg-slate-500/15 text-slate-800 dark:text-slate-300 border-slate-500/30';
};

const speakWord = (text: string) => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    } catch {}
  }
};

export const StudyToolsView: React.FC<StudyToolsViewProps> = ({
  initialTab = 'vocab',
  initialMathsTab = 'overview',
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<StudyToolTab>(initialTab);
  const [mathsSubTab, setMathsSubTab] = useState<MathsSubTab>(initialMathsTab);
  const [calcBoosterTool, setCalcBoosterTool] = useState<'tables' | 'squares' | 'cubes'>('tables');

  // Sync when initialTab prop updates
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Sync when initialMathsTab prop updates
  useEffect(() => {
    if (initialMathsTab) {
      setMathsSubTab(initialMathsTab);
    }
  }, [initialMathsTab]);

  // -------------------------------------------------------------
  // VOCAB STATE
  // -------------------------------------------------------------
  const [vocabSearch, setVocabSearch] = useState('');
  const [vocabTypeFilter, setVocabTypeFilter] = useState<'all' | 'word' | 'ows' | 'idiom' | 'root'>('word');
  const [activeLevel, setActiveLevel] = useState<VocabLevel>('level-1');
  const [activeSet, setActiveSet] = useState<string>('set-01');
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [masteredVocabIds, setMasteredVocabIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('syllabus3d_mastered_vocab');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const currentLevelConfig = useMemo(() => {
    return HIGH_YIELD_LEVELS.find(lvl => lvl.id === activeLevel) || HIGH_YIELD_LEVELS[0];
  }, [activeLevel]);

  const filteredVocab = useMemo(() => {
    return DEFAULT_VOCAB_DATA.filter(item => {
      if (vocabTypeFilter === 'word') {
        if (item.type !== 'word') return false;
        if (item.level !== activeLevel || item.set !== activeSet) return false;
      } else if (vocabTypeFilter !== 'all') {
        if (item.type !== vocabTypeFilter) return false;
      }
      const q = vocabSearch.toLowerCase().trim();
      return !q ||
        item.word.toLowerCase().includes(q) ||
        item.hindi.toLowerCase().includes(q) ||
        item.meaning.toLowerCase().includes(q) ||
        item.partOfSpeech.toLowerCase().includes(q) ||
        (item.collocation && item.collocation.toLowerCase().includes(q)) ||
        (item.derivatives && item.derivatives.toLowerCase().includes(q)) ||
        item.synonyms.some(s => s.toLowerCase().includes(q));
    });
  }, [vocabSearch, vocabTypeFilter, activeLevel, activeSet]);

  const currentFlashcard = filteredVocab[activeCardIndex] || filteredVocab[0];

  const handleNextCard = () => {
    soundManager.playClick();
    setIsCardFlipped(false);
    setActiveCardIndex(prev => (prev + 1) % Math.max(1, filteredVocab.length));
  };

  const handlePrevCard = () => {
    soundManager.playClick();
    setIsCardFlipped(false);
    setActiveCardIndex(prev => (prev - 1 + filteredVocab.length) % Math.max(1, filteredVocab.length));
  };

  const toggleMastered = (id: string) => {
    soundManager.playSuccess();
    haptics.success();
    setMasteredVocabIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        localStorage.setItem('syllabus3d_mastered_vocab', JSON.stringify([...next]));
      } catch {}
      return next;
    });
  };

  // -------------------------------------------------------------
  // MATHS STATE
  // -------------------------------------------------------------
  const [mathSearch, setMathSearch] = useState('');
  const [mathCategory, setMathCategory] = useState<string>('All');
  const [copiedFormulaId, setCopiedFormulaId] = useState<string | null>(null);

  // Speed drill state
  const [drillScore, setDrillScore] = useState(0);
  const [drillQuestion, setDrillQuestion] = useState<{ q: string; a: number; opts: number[] }>({
    q: '37 × 11 = ?',
    a: 407,
    opts: [397, 407, 417, 307]
  });
  const [drillFeedback, setDrillFeedback] = useState<'correct' | 'wrong' | null>(null);

  const generateNewDrill = () => {
    const types = ['mult', 'square', 'cube'];
    const chosen = types[Math.floor(Math.random() * types.length)];
    let q = '';
    let a = 0;

    if (chosen === 'mult') {
      const n1 = Math.floor(Math.random() * 40) + 11;
      const n2 = Math.random() > 0.5 ? 11 : Math.floor(Math.random() * 9) + 2;
      q = `${n1} × ${n2} = ?`;
      a = n1 * n2;
    } else if (chosen === 'square') {
      const n = Math.floor(Math.random() * 35) + 12;
      q = `${n}² = ?`;
      a = n * n;
    } else {
      const n = Math.floor(Math.random() * 20) + 5;
      q = `${n}³ = ?`;
      a = n * n * n;
    }

    const wrongOpts = new Set<number>();
    while (wrongOpts.size < 3) {
      const offset = (Math.floor(Math.random() * 5) + 1) * (Math.random() > 0.5 ? 10 : -10);
      const val = a + offset;
      if (val > 0 && val !== a) wrongOpts.add(val);
    }
    const allOpts = [...wrongOpts, a].sort(() => Math.random() - 0.5);

    setDrillQuestion({ q, a, opts: allOpts });
    setDrillFeedback(null);
  };

  const handleAnswerDrill = (selected: number) => {
    if (selected === drillQuestion.a) {
      soundManager.playSuccess();
      haptics.success();
      setDrillScore(s => s + 1);
      setDrillFeedback('correct');
      setTimeout(generateNewDrill, 900);
    } else {
      soundManager.playError();
      haptics.error();
      setDrillFeedback('wrong');
    }
  };

  const filteredFormulas = useMemo(() => {
    return MATH_FORMULAS.filter(item => {
      const matchesCat = mathCategory === 'All' || item.category === mathCategory;
      const q = mathSearch.toLowerCase().trim();
      const matchesQ = !q ||
        item.title.toLowerCase().includes(q) ||
        item.formula.toLowerCase().includes(q) ||
        item.explanation.toLowerCase().includes(q);
      return matchesCat && matchesQ;
    });
  }, [mathCategory, mathSearch]);

  const copyFormula = (formula: MathFormula) => {
    navigator.clipboard?.writeText(`${formula.title}\n${formula.formula}\nShortcut: ${formula.shortTrick}`);
    setCopiedFormulaId(formula.id);
    soundManager.playClick();
    setTimeout(() => setCopiedFormulaId(null), 1800);
  };

  // -------------------------------------------------------------
  // GA STATE
  // -------------------------------------------------------------
  const [gaSearch, setGaSearch] = useState('');
  const [gaSubject, setGaSubject] = useState<string>('All');
  const [expandedGaId, setExpandedGaId] = useState<string | null>('ga1');

  const filteredGaTopics = useMemo(() => {
    return GA_TOPICS.filter(item => {
      const matchesSubj = gaSubject === 'All' || item.subject === gaSubject;
      const q = gaSearch.toLowerCase().trim();
      const matchesQ = !q ||
        item.title.toLowerCase().includes(q) ||
        item.summaryNote.toLowerCase().includes(q) ||
        item.keyPoints.some(kp => kp.label.toLowerCase().includes(q) || kp.detail.toLowerCase().includes(q));
      return matchesSubj && matchesQ;
    });
  }, [gaSubject, gaSearch]);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 pb-28 pt-2 px-2 sm:px-4 animate-view-fade">
      
      {/* 🌟 Top Hero Portal Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/90 dark:border-white/10 p-6 sm:p-8 shadow-xs">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-72 h-72 bg-gradient-to-br from-amber-500/10 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 dark:bg-amber-500/15 text-amber-900 dark:text-amber-300 border border-amber-500/30 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Study Tools & Exam Accelerators</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
              Study Tools
            </h1>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-medium leading-relaxed">
              High-yield mastery tools designed for competitive examinations. Drill active recall Vocabulary, speed math formulas, and high-frequency General Awareness.
            </p>
          </div>

          {/* 3 Main Tool Selector Tabs */}
          <div className="flex items-center p-1.5 rounded-2xl bg-slate-100 dark:bg-[#141624] border border-slate-200/80 dark:border-white/10 shadow-xs gap-1.5 self-start md:self-center shrink-0">
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                haptics.selection();
                setActiveTab('vocab');
                onNavigate?.('study-tools-vocab');
              }}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'vocab'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-sm ring-1 ring-amber-400/50'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-white dark:hover:bg-white/[0.06]'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Vocabulary</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                activeTab === 'vocab' ? 'bg-black/15 text-slate-950' : 'bg-white dark:bg-white/15 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-white/5'
              }`}>
                {DEFAULT_VOCAB_DATA.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                haptics.selection();
                setActiveTab('maths');
                onNavigate?.(mathsSubTab === 'calc-booster' ? 'study-tools-calc-booster' : 'study-tools-maths');
              }}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'maths'
                  ? 'bg-blue-600 text-white font-black shadow-sm ring-1 ring-blue-400/50'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-white dark:hover:bg-white/[0.06]'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>Maths</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                activeTab === 'maths' ? 'bg-white/20 text-white' : 'bg-white dark:bg-white/15 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-white/5'
              }`}>
                {MATH_FORMULAS.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                haptics.selection();
                setActiveTab('ga');
                onNavigate?.('study-tools-ga');
              }}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'ga'
                  ? 'bg-purple-600 text-white font-black shadow-sm ring-1 ring-purple-400/50'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-white dark:hover:bg-white/[0.06]'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>General Awareness</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                activeTab === 'ga' ? 'bg-white/20 text-white' : 'bg-white dark:bg-white/15 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-white/5'
              }`}>
                {GA_TOPICS.length}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================
          MODULE 1: VOCABULARY ENGINE
          ========================================================= */}
      {activeTab === 'vocab' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Top Control Bar: Search + Category Pills + Mastered Counter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={vocabSearch}
                onChange={e => {
                  setVocabSearch(e.target.value);
                  setActiveCardIndex(0);
                }}
                placeholder="Search words, hindi meaning, grammar, synonyms..."
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-[#161826] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
              {vocabSearch && (
                <button
                  type="button"
                  onClick={() => setVocabSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {[
                { id: 'all', label: 'All Words', count: DEFAULT_VOCAB_DATA.length },
                { id: 'word', label: 'High-Yield', count: DEFAULT_VOCAB_DATA.filter(w => w.type === 'word').length },
                { id: 'ows', label: 'OWS (One Word)', count: DEFAULT_VOCAB_DATA.filter(w => w.type === 'ows').length },
                { id: 'idiom', label: 'Idioms & Phrases', count: DEFAULT_VOCAB_DATA.filter(w => w.type === 'idiom').length },
                { id: 'root', label: 'Root Words', count: DEFAULT_VOCAB_DATA.filter(w => w.type === 'root').length }
              ].map(f => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setVocabTypeFilter(f.id as any);
                    setActiveCardIndex(0);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    vocabTypeFilter === f.id
                      ? 'bg-amber-500 text-slate-950 shadow-xs font-black'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/[0.05] border border-transparent'
                  }`}
                >
                  <span>{f.label}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    vocabTypeFilter === f.id ? 'bg-black/15 text-slate-950 font-bold' : 'bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400'
                  }`}>
                    {f.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Mastered Counter */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold shrink-0">
              <CheckCircle2 className="w-4 h-4" />
              <span>{masteredVocabIds.size} Mastered</span>
            </div>
          </div>

          {/* =========================================================
              LEVEL & SUBPAGE SET NAVIGATION (High-Yield Vocabulary)
              ========================================================= */}
          {vocabTypeFilter === 'word' && (
            <div className="space-y-3 animate-fade-in">
              {/* 4 Levels Navigation Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                {HIGH_YIELD_LEVELS.map(lvl => {
                  const isSelected = activeLevel === lvl.id;
                  const totalLevelWords = DEFAULT_VOCAB_DATA.filter(
                    w => w.type === 'word' && w.level === lvl.id
                  ).length;
                  return (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        haptics.selection();
                        setActiveLevel(lvl.id);
                        setActiveSet('set-01');
                        setActiveCardIndex(0);
                      }}
                      className={`flex flex-col justify-between p-3.5 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 font-black shadow-md border-amber-400 ring-2 ring-amber-400/40'
                          : 'bg-white dark:bg-[#0E101B] border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-amber-500/40 hover:bg-slate-50 dark:hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <span className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider ${
                          isSelected ? 'bg-black/15 text-slate-950' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                        }`}>
                          {lvl.badge}
                        </span>
                        <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full ${
                          isSelected ? 'bg-black/15 text-slate-950' : 'bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400'
                        }`}>
                          {totalLevelWords} words
                        </span>
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-black tracking-tight leading-snug">
                          {lvl.label}
                        </h4>
                        <p className={`text-[11px] line-clamp-1 mt-0.5 ${
                          isSelected ? 'text-slate-800 font-medium' : 'text-slate-500 dark:text-slate-400'
                        }`}>
                          {lvl.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Subpage Sets Selector */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar p-2 rounded-2xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 px-2 shrink-0 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-amber-500" />
                  <span>Subpages:</span>
                </span>
                <div className="flex items-center gap-1.5 shrink-0">
                  {currentLevelConfig.sets.map(s => {
                    const isSetSelected = activeSet === s.id;
                    const countInSet = DEFAULT_VOCAB_DATA.filter(
                      w => w.type === 'word' && w.level === activeLevel && w.set === s.id
                    ).length;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => {
                          soundManager.playClick();
                          haptics.selection();
                          setActiveSet(s.id);
                          setActiveCardIndex(0);
                        }}
                        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                          isSetSelected
                            ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-xs font-black'
                            : 'bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-white/10'
                        }`}
                      >
                        <span>{s.label}</span>
                        <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                          isSetSelected
                            ? 'bg-white/20 dark:bg-black/20 text-white dark:text-slate-900 font-bold'
                            : 'bg-slate-200/80 dark:bg-white/10 text-slate-600 dark:text-slate-400'
                        }`}>
                          {countInSet}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Flashcard Active Recall Spotlight */}
          {currentFlashcard ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
              
              {/* Left: Interactive Word Flashcard (Wider: col-span-8 lg, col-span-9 xl) */}
              <div className="lg:col-span-8 xl:col-span-9 flex flex-col justify-between p-6 sm:p-8 md:p-9 rounded-3xl bg-white dark:bg-[#0E101B] border-2 border-amber-500/30 dark:border-amber-500/20 shadow-md relative overflow-hidden min-h-[380px]">
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-slate-100 dark:bg-white/[0.08] text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 font-mono">
                      Card {activeCardIndex + 1} of {filteredVocab.length}
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 px-2.5 py-0.5 rounded-full bg-amber-500/10">
                      {currentFlashcard.frequency} Frequency
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleMastered(currentFlashcard.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      masteredVocabIds.has(currentFlashcard.id)
                        ? 'bg-emerald-500 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-slate-300 hover:border-emerald-500/40 border border-transparent'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{masteredVocabIds.has(currentFlashcard.id) ? 'Mastered' : 'Mark Mastered'}</span>
                  </button>
                </div>

                {/* Central Word and Meaning Display */}
                <div className="py-6 space-y-5">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                        {currentFlashcard.word}
                      </h2>
                      {/* Part of Speech attached directly to the Word */}
                      <span className={`px-2.5 py-1 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider border font-mono ${getPosBadgeColor(currentFlashcard.partOfSpeech)}`}>
                        {currentFlashcard.partOfSpeech}
                      </span>
                      <button
                        type="button"
                        onClick={() => speakWord(currentFlashcard.word)}
                        title="Pronounce word"
                        className="p-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30 transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-2xs"
                      >
                        <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                    <p className="text-sm sm:text-base font-mono text-amber-600 dark:text-amber-400 mt-1.5">
                      {currentFlashcard.phonetic} • <span className="font-sans font-bold text-slate-800 dark:text-slate-100">{currentFlashcard.hindi}</span>
                    </p>
                  </div>

                  {/* Toggle Flip to Reveal Meaning / Example */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-[#151726] border border-slate-200/80 dark:border-white/[0.08] space-y-3.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Exam Definition & Synonyms
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          soundManager.playClick();
                          setIsCardFlipped(prev => !prev);
                        }}
                        className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>{isCardFlipped ? 'Hide Details' : 'Flip to Reveal'}</span>
                      </button>
                    </div>

                    <p className="text-sm sm:text-base md:text-lg font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                      {currentFlashcard.meaning}
                    </p>

                    {isCardFlipped && (
                      <div className="space-y-3 pt-3.5 border-t border-slate-200/70 dark:border-white/10 animate-fade-in text-xs sm:text-sm">
                        {/* Synonyms & Antonyms */}
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="font-bold text-emerald-600 dark:text-emerald-400">Synonyms:</span>
                            {currentFlashcard.synonyms.map(syn => (
                              <span key={syn} className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-medium text-xs">
                                {syn}
                              </span>
                            ))}
                          </div>

                          {currentFlashcard.antonyms.length > 0 && (
                            <div className="flex flex-wrap items-center gap-1.5 pt-1">
                              <span className="font-bold text-rose-600 dark:text-rose-400">Antonyms:</span>
                              {currentFlashcard.antonyms.map(ant => (
                                <span key={ant} className="px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-700 dark:text-rose-300 font-medium text-xs">
                                  {ant}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Collocation & Word Family */}
                        {(currentFlashcard.collocation || currentFlashcard.derivatives) && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
                            {currentFlashcard.collocation && (
                              <div className="p-2.5 rounded-xl bg-blue-500/10 dark:bg-blue-500/15 border border-blue-500/25 text-blue-900 dark:text-blue-300">
                                📌 <strong>Collocation / Prep:</strong> {currentFlashcard.collocation}
                              </div>
                            )}
                            {currentFlashcard.derivatives && (
                              <div className="p-2.5 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/25 text-emerald-900 dark:text-emerald-300">
                                🌳 <strong>Word Family:</strong> {currentFlashcard.derivatives}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Example Sentence */}
                        <div className="p-3 rounded-xl bg-amber-500/5 dark:bg-amber-500/[0.04] border-l-2 border-amber-500 text-xs sm:text-sm italic text-slate-700 dark:text-slate-300">
                          "{currentFlashcard.example}"
                        </div>

                        {/* Mnemonic Trick */}
                        <div className="text-xs sm:text-sm text-purple-700 dark:text-purple-300 font-medium bg-purple-500/10 p-3 rounded-xl">
                          💡 <strong>Memory Trick:</strong> {currentFlashcard.mnemonic}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Navigation */}
                <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-white/10">
                  <button
                    type="button"
                    onClick={handlePrevCard}
                    className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer"
                  >
                    ← Previous
                  </button>

                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                    {currentFlashcard.examTags.map(tag => (
                      <span key={tag} className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-200/80 dark:bg-white/10 text-slate-700 dark:text-slate-300 whitespace-nowrap">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleNextCard}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition-all cursor-pointer shadow-xs"
                  >
                    Next Card →
                  </button>
                </div>
              </div>

              {/* Right: Vocabulary Explorer (Smaller & Compact: col-span-4 lg, col-span-3 xl) */}
              <div className="lg:col-span-4 xl:col-span-3 p-3.5 sm:p-4 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 dark:border-white/10">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-amber-500" />
                      <span className="truncate">Vocabulary Explorer</span>
                    </h3>
                    <span className="text-[11px] text-slate-400 font-mono shrink-0">
                      {filteredVocab.length} words
                    </span>
                  </div>

                  <div className="divide-y divide-slate-100 dark:divide-white/[0.06] overflow-y-auto max-h-[420px] no-scrollbar mt-1.5 space-y-0.5">
                    {filteredVocab.map((item, idx) => {
                      const isSelected = activeCardIndex === idx;
                      const isMastered = masteredVocabIds.has(item.id);
                      return (
                        <div
                          key={item.id}
                          onClick={() => {
                            soundManager.playClick();
                            setActiveCardIndex(idx);
                            setIsCardFlipped(false);
                          }}
                          className={`p-2 sm:p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-between gap-2 ${
                            isSelected
                              ? 'bg-amber-500/10 dark:bg-amber-500/15 border-l-4 border-amber-500'
                              : 'hover:bg-slate-50 dark:hover:bg-white/[0.03]'
                          }`}
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                                {item.word}
                              </span>
                              {isMastered && (
                                <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                              )}
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                              {item.hindi}
                            </p>
                          </div>

                          <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md border shrink-0 uppercase tracking-tight ${getPosBadgeColor(item.partOfSpeech)}`}>
                            {item.partOfSpeech.replace(' (OWS)', '').replace(' / Root', '').replace(' / Adj', '')}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-800 dark:text-amber-300 text-[11px] leading-relaxed border border-amber-500/20">
                  🎯 <strong>Pro Tip:</strong> Active recall by guessing the meaning before clicking "Flip" increases retention by 300%.
                </div>
              </div>
            </div>
          ) : (
            vocabTypeFilter === 'word' ? (
              <div className="p-10 sm:p-14 text-center rounded-3xl bg-white dark:bg-[#0E101B] border-2 border-dashed border-amber-500/30 dark:border-amber-500/20 shadow-xs space-y-4">
                <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                  <BookOpen className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="space-y-2 max-w-md mx-auto">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-900 dark:text-amber-300 font-mono border border-amber-500/30">
                    <span>{currentLevelConfig.label}</span>
                    <span>•</span>
                    <span>{currentLevelConfig.sets.find(s => s.id === activeSet)?.label || activeSet}</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                    Ready for Words Integration
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Is Set me abhi koi word nahi hai. Aap apne words provide karein, hum unhe turant is Set me live add kar denge!
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 space-y-2">
                <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No words match your search filter.</p>
                <button
                  type="button"
                  onClick={() => { setVocabSearch(''); setVocabTypeFilter('all'); }}
                  className="text-xs text-amber-600 dark:text-amber-400 font-bold underline cursor-pointer"
                >
                  Clear all filters
                </button>
              </div>
            )
          )}
        </div>
      )}

      {/* =========================================================
          MODULE 2: MATHS QUANT & FORMULA VAULT
          ========================================================= */}
      {activeTab === 'maths' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Sub Navigation: Formulas & Speed Drills vs Calculation Booster */}
          <div className="flex items-center gap-2 border-b border-slate-200/80 dark:border-white/10 pb-3">
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                haptics.selection();
                setMathsSubTab('overview');
                onNavigate?.('study-tools-maths');
              }}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                mathsSubTab === 'overview'
                  ? 'bg-blue-600 text-white shadow-xs font-black'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.05]'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>Formulas & Speed Drills</span>
            </button>
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                haptics.selection();
                setMathsSubTab('calc-booster');
                onNavigate?.('study-tools-calc-booster');
              }}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                mathsSubTab === 'calc-booster'
                  ? 'bg-blue-600 text-white shadow-xs font-black'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.05]'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Calculation Booster</span>
            </button>
          </div>

          {mathsSubTab === 'calc-booster' ? (
            <div className="space-y-6">
              {/* Calculation Booster Tool Sub-Navigation */}
              <div className="flex items-center p-1.5 rounded-2xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs gap-1.5 self-start max-w-fit">
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    haptics.selection();
                    setCalcBoosterTool('tables');
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    calcBoosterTool === 'tables'
                      ? 'bg-blue-600 text-white shadow-xs font-black ring-1 ring-blue-400/40'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.04]'
                  }`}
                >
                  <Hash className="w-4 h-4" />
                  <span>Tables (1 to 40)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    haptics.selection();
                    setCalcBoosterTool('squares');
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    calcBoosterTool === 'squares'
                      ? 'bg-purple-600 text-white shadow-xs font-black ring-1 ring-purple-400/40'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.04]'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Squares & Roots (1 to 60)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    haptics.selection();
                    setCalcBoosterTool('cubes');
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    calcBoosterTool === 'cubes'
                      ? 'bg-cyan-600 text-white shadow-xs font-black ring-1 ring-cyan-400/40'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.04]'
                  }`}
                >
                  <Boxes className="w-4 h-4" />
                  <span>Cubes & Roots (1 to 30)</span>
                </button>
              </div>

              {calcBoosterTool === 'tables' ? (
                <CalculationBoosterTables />
              ) : calcBoosterTool === 'squares' ? (
                <CalculationBoosterSquares />
              ) : (
                <CalculationBoosterCubes />
              )}
            </div>
          ) : (
            <>
              {/* Mental Calculation Speed Drill Card */}
              <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#0E101B] border border-blue-500/30 dark:border-blue-500/20 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-blue-500/20 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                  <Zap className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Speed Maths Sprint Drill
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                    Instantly calculate in mind without using pen and paper.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  Score: {drillScore}
                </span>
                <button
                  type="button"
                  onClick={generateNewDrill}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 dark:bg-white/[0.08] hover:bg-slate-200 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Next Question</span>
                </button>
              </div>
            </div>

            {/* Drill Interactive Question */}
            <div className="py-5 flex flex-col items-center justify-center space-y-4">
              <div className="text-3xl sm:text-4xl font-mono font-black text-slate-900 dark:text-white tracking-wide">
                {drillQuestion.q}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-lg">
                {drillQuestion.opts.map(opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleAnswerDrill(opt)}
                    className="p-3 rounded-2xl bg-white dark:bg-[#151726] hover:border-blue-500 dark:hover:border-blue-400 border border-slate-200/90 dark:border-white/10 text-base font-mono font-bold text-slate-900 dark:text-white hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-xs"
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {drillFeedback === 'correct' && (
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 animate-scale-in">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Excellent! Correct Answer.</span>
                </div>
              )}
              {drillFeedback === 'wrong' && (
                <div className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1 animate-scale-in">
                  <XCircle className="w-4 h-4" />
                  <span>Incorrect. Try calculating again!</span>
                </div>
              )}
            </div>
          </div>

          {/* Fraction to Percentage Conversion Chart */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-blue-500" />
                  <span>Percentage to Fraction Master Chart</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Critical for Arithmetic (Percentage, Profit & Loss, Simple & Compound Interest).
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
              {FRACTION_CHART.map(fc => (
                <div
                  key={fc.fraction}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-[#141624] border border-slate-200/80 dark:border-white/[0.06] hover:border-blue-500/40 transition-all flex flex-col justify-between space-y-1 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-mono font-black text-blue-600 dark:text-blue-400">
                      {fc.fraction}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      = {fc.decimal}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {fc.percentage}
                  </span>
                  {fc.note && (
                    <span className="text-[9px] text-amber-600 dark:text-amber-400 font-mono">
                      {fc.note}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Formula Vault Search & Filters */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={mathSearch}
                  onChange={e => setMathSearch(e.target.value)}
                  placeholder="Search formulas, theorems, shortcuts..."
                  className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-[#161826] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                {['All', 'Arithmetic', 'Algebra', 'Geometry', 'Trigonometry', 'Mensuration'].map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setMathCategory(cat);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      mathCategory === cat
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/[0.05]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Formula Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredFormulas.map(formula => {
                const isCopied = copiedFormulaId === formula.id;
                return (
                  <div
                    key={formula.id}
                    className="p-5 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 hover:border-blue-500/40 transition-all shadow-xs flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-blue-500/10 text-blue-700 dark:text-blue-300 font-mono">
                          {formula.category}
                        </span>

                        <button
                          type="button"
                          onClick={() => copyFormula(formula)}
                          className="flex items-center gap-1 text-xs text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
                          title="Copy Formula"
                        >
                          {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          <span className="text-[11px]">{isCopied ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>

                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        {formula.title}
                      </h4>

                      {/* Formula Container */}
                      <div className="p-3 rounded-2xl bg-blue-50/60 dark:bg-[#131628] border border-blue-200/80 dark:border-blue-500/20 font-mono text-xs sm:text-sm font-bold text-blue-900 dark:text-blue-300 leading-relaxed overflow-x-auto">
                        {formula.formula}
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {formula.explanation}
                      </p>
                    </div>

                    {/* Short Trick */}
                    <div className="p-3 rounded-xl bg-amber-500/10 dark:bg-amber-500/[0.06] border-l-2 border-amber-500 text-xs text-slate-800 dark:text-slate-300">
                      ⚡ <strong>Exam Shortcut:</strong> {formula.shortTrick}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
            </>
          )}
        </div>
      )}

      {/* =========================================================
          MODULE 3: GENERAL AWARENESS (GA) REVISION HUB
          ========================================================= */}
      {activeTab === 'ga' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Controls: Search + Subject Pills */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={gaSearch}
                onChange={e => setGaSearch(e.target.value)}
                placeholder="Search articles, history dates, rivers, science..."
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-[#161826] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
            </div>

            {/* Subject Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {['All', 'Polity', 'History', 'Geography', 'Science', 'Static GK'].map(subj => (
                <button
                  key={subj}
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setGaSubject(subj);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    gaSubject === subj
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/[0.05]'
                  }`}
                >
                  {subj}
                </button>
              ))}
            </div>
          </div>

          {/* GA Accordion & Knowledge Capsules */}
          <div className="space-y-4">
            {filteredGaTopics.map(topic => {
              const isExpanded = expandedGaId === topic.id;
              return (
                <div
                  key={topic.id}
                  className="rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 overflow-hidden shadow-xs transition-all"
                >
                  {/* Topic Header Toggle */}
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setExpandedGaId(isExpanded ? null : topic.id);
                    }}
                    className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-slate-50/50 dark:hover:bg-white/[0.02] cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 flex items-center justify-center font-bold shrink-0">
                        <Compass className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-700 dark:text-purple-300">
                            {topic.subject}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">
                            {topic.badge}
                          </span>
                        </div>
                        <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                          {topic.title}
                        </h4>
                      </div>
                    </div>

                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      isExpanded ? 'rotate-180' : 'rotate-0'
                    }`} />
                  </button>

                  {/* Expanded Capsule Details */}
                  {isExpanded && (
                    <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 dark:border-white/10 space-y-4 animate-fade-in">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                        {topic.keyPoints.map((kp, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#151726] border border-slate-200/70 dark:border-white/[0.06] space-y-1"
                          >
                            <span className="text-xs font-bold text-purple-700 dark:text-purple-300 block">
                              {kp.label}
                            </span>
                            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                              {kp.detail}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Summary Mnemonic Box */}
                      <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-900 dark:text-purple-200 leading-relaxed">
                        💡 <strong>Memory Mnemonic / Quick Note:</strong> {topic.summaryNote}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
