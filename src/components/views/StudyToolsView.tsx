import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
  Volume2,
  Percent,
  Triangle,
  ShieldCheck,
  Maximize2,
  Minimize2,
  ExternalLink,
  X
} from 'lucide-react';
import { AppView } from '../layout/Sidebar';
import { soundManager } from '../../utils/soundEffects';
import { haptics } from '../../utils/haptics';
import { CalculationBoosterTables } from './CalculationBoosterTables';
import { CalculationBoosterSquares } from './CalculationBoosterSquares';
import { CalculationBoosterCubes } from './CalculationBoosterCubes';
import { CalculationBoosterFractions } from './CalculationBoosterFractions';
import { CalculationBoosterTriplets } from './CalculationBoosterTriplets';
import { CalculationBoosterPowers } from './CalculationBoosterPowers';
import { CalculationBoosterPrimes } from './CalculationBoosterPrimes';
import { SscSpecialVocabView } from './SscSpecialVocabView';
import { 
  LEVEL_1_SET_01_WORDS, 
  LEVEL_1_SET_02_WORDS, 
  LEVEL_1_SET_03_WORDS, 
  LEVEL_1_SET_04_WORDS, 
  LEVEL_1_SET_05_WORDS,
  LEVEL_1_SET_06_WORDS,
  LEVEL_1_SET_07_WORDS,
  LEVEL_1_SET_08_WORDS,
  LEVEL_1_SET_09_WORDS,
  LEVEL_1_SET_10_WORDS,
  VocabItem, 
  VocabLevel 
} from '../../data/highYieldVocabData';
import { 
  LEVEL_1_SET_01_IDIOMS, 
  LEVEL_1_SET_02_IDIOMS 
} from '../../data/highYieldIdiomsData';
import { LEVEL_1_SET_01_OWS } from '../../data/highYieldOwsData';
import { HIGH_YIELD_ROOT_WORDS } from '../../data/highYieldRootData';

export type { VocabItem, VocabLevel };

export type StudyToolTab = 'vocab' | 'maths' | 'ga';
export type VocabSubTab = 'core' | 'ssc-special';
export type MathsSubTab = 'overview' | 'calc-booster';
export type CalcBoosterTool = 'tables' | 'squares' | 'cubes' | 'fractions' | 'triplets' | 'powers' | 'primes';

interface StudyToolsViewProps {
  initialTab?: StudyToolTab;
  initialVocabTab?: VocabSubTab;
  initialMathsTab?: MathsSubTab;
  initialCalcBoosterTool?: CalcBoosterTool;
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
      { id: 'set-05', label: 'Set 05' },
      { id: 'set-06', label: 'Set 06' },
      { id: 'set-07', label: 'Set 07' },
      { id: 'set-08', label: 'Set 08' },
      { id: 'set-09', label: 'Set 09' },
      { id: 'set-10', label: 'Set 10' }
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
      { id: 'set-05', label: 'Set 05' },
      { id: 'set-06', label: 'Set 06' },
      { id: 'set-07', label: 'Set 07' },
      { id: 'set-08', label: 'Set 08' },
      { id: 'set-09', label: 'Set 09' },
      { id: 'set-10', label: 'Set 10' }
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
      { id: 'set-05', label: 'Set 05' },
      { id: 'set-06', label: 'Set 06' },
      { id: 'set-07', label: 'Set 07' },
      { id: 'set-08', label: 'Set 08' },
      { id: 'set-09', label: 'Set 09' },
      { id: 'set-10', label: 'Set 10' }
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
      { id: 'set-05', label: 'Set 05' },
      { id: 'set-06', label: 'Set 06' },
      { id: 'set-07', label: 'Set 07' },
      { id: 'set-08', label: 'Set 08' },
      { id: 'set-09', label: 'Set 09' },
      { id: 'set-10', label: 'Set 10' }
    ]
  }
];

const DEFAULT_VOCAB_DATA: VocabItem[] = [
  ...LEVEL_1_SET_01_WORDS,
  ...LEVEL_1_SET_02_WORDS,
  ...LEVEL_1_SET_03_WORDS,
  ...LEVEL_1_SET_04_WORDS,
  ...LEVEL_1_SET_05_WORDS,
  ...LEVEL_1_SET_06_WORDS,
  ...LEVEL_1_SET_07_WORDS,
  ...LEVEL_1_SET_08_WORDS,
  ...LEVEL_1_SET_09_WORDS,
  ...LEVEL_1_SET_10_WORDS,
  ...LEVEL_1_SET_01_IDIOMS,
  ...LEVEL_1_SET_02_IDIOMS,
  ...LEVEL_1_SET_01_OWS,
  ...HIGH_YIELD_ROOT_WORDS,
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
    examTags: ['SSC CGL', 'CPO', 'Banking', 'Level 1', 'Set 02', 'OWS'],
    collocation: 'Generous / Renowned philanthropist',
    derivatives: 'Philanthropy (noun), Philanthropic (adjective)',
    level: 'level-1',
    set: 'set-02'
  },
  {
    id: 'v-idiom-1',
    word: 'Spill the beans',
    phonetic: '/spɪl ðə biːnz/',
    hindi: 'भेद खोलना / रहस्य उजागर करना',
    type: 'idiom',
    partOfSpeech: 'Idiom / Phrase',
    meaning: 'To disclose a secret prematurely or indiscreetly.',
    synonyms: ['Let the cat out of the bag', 'Divulge', 'Disclose', 'Reveal'],
    antonyms: ['Keep under wraps', 'Clam up', 'Conceal'],
    example: 'Trust him with your surprise party plan and he is sure to spill the beans.',
    mnemonic: 'Imagine dropping a jar of beans -> All hidden beans scatter in the open!',
    frequency: 'Repeated',
    examTags: ['SSC CGL', 'CHSL', 'MTS', 'Level 1', 'Set 03', 'Idioms & Phrases'],
    collocation: 'Spill the beans to the press / police',
    level: 'level-1',
    set: 'set-03'
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
    examTags: ['SSC CGL', 'CPO', 'Steno', 'Level 1', 'Set 02', 'OWS'],
    collocation: 'Omniscient narrator / deity',
    derivatives: 'Omniscience (noun), Omnisciently (adverb)',
    level: 'level-1',
    set: 'set-02'
  },
  {
    id: 'v-idiom-2',
    word: 'Burn the midnight oil',
    phonetic: '/bɜːn ðə ˈmɪd.naɪt ɔɪl/',
    hindi: 'देर रात तक कड़ी मेहनत / पढ़ाई करना',
    type: 'idiom',
    partOfSpeech: 'Idiom / Phrase',
    meaning: 'To work or study late into the night.',
    synonyms: ['Work overtime', 'Burn the candle at both ends', 'Toil'],
    antonyms: ['Slack off', 'Idleness', 'Procrastinate'],
    example: 'Aspirants often burn the midnight oil during the final revision month.',
    mnemonic: 'Before electricity, studying late required keeping the oil lamp burning until midnight.',
    frequency: 'Repeated',
    examTags: ['SSC CGL', 'CHSL', 'Railway', 'Level 1', 'Set 03', 'Idioms & Phrases'],
    collocation: 'Burn the midnight oil to crack exam',
    level: 'level-1',
    set: 'set-03'
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
// GENERAL AWARENESS (GA) DATA
// -------------------------------------------------------------
interface GaTopic {
  id: string;
  subject: 'Polity' | 'History' | 'Geography' | 'Science' | 'Static GK';
  title: string;
  badge: string;
  keyPoints: { label: string; detail: string }[];
  summaryNote: string;
  htmlFile?: string;
  chapterTag?: string;
  isInteractiveMasterChapter?: boolean;
}

const GA_TOPICS: GaTopic[] = [
  {
    id: 'ga-polity-making-constitution',
    subject: 'Polity',
    title: 'Making of Indian Constitution',
    badge: 'Chapter 01 • Master Notes',
    chapterTag: 'Polity Masterclass',
    htmlFile: '/study-tools-ga/polity/making_of_indian_constitution.html',
    isInteractiveMasterChapter: true,
    keyPoints: [
      { label: '01. Basics & Forms of Govt', detail: 'Tradition started in USA (1787). Partly rigid & partly flexible. Communist (State owns means of production), Monarchic (King), Totalitarian (North Korea), Oligarchic (Rule of few).' },
      { label: '02. Early Demand (1928-1935)', detail: '1928: Nehru Report (Motilal Nehru at Lucknow). 1934: M.N. Roy proposed idea of Constituent Assembly. 1935: INC officially demanded Constituent Assembly.' },
      { label: '03. British Offers Rejected', detail: 'August Offer (1940, Linlithgow), Cripps Proposal (1942), Wavell Plan (1945). All offered Dominion Status, rejected for Purna Swaraj ("Dominion status is dead as a door nail" - Nehru).' },
      { label: '04. Cabinet Mission & 389 Seats', detail: 'Accepted 1946 Plan (Pethick-Lawrence, Stafford Cripps, A.V. Alexander). 389 Seats (292 Provinces + 4 Chief Commissioners ABCD + 93 Princely States). 1 Seat per 10 Lakh. INC won 208, ML 73.' },
      { label: '05. Interim Govt (2 Sept 1946)', detail: 'All 13 Portfolios: Nehru (Ext. Affairs), Patel (Home/IB), Rajendra Prasad (Food/Agri), Liaquat Ali Khan (Finance), Baldev Singh (Defence), Jagjivan Ram (Labour).' },
      { label: '06. Objective Resolution & Committees', detail: 'Moved 13 Dec 1946 by Nehru, accepted 22 Jan 1947 (became Preamble). 8 Major Committees (Union/States = Nehru, Steering/Rules = Prasad, Provinces/FR = Patel).' },
      { label: '07. Drafting Committee (29 Aug 1947)', detail: '7 Members chaired by Dr. B.R. Ambedkar ("Modern Manu"). Mitter replaced by Madhava Rau, Khaitan replaced by Krishnamachari. Ambedkar elected from Bengal then Bombay.' },
      { label: '08. Sessions & Commencements', detail: '11 Sessions (165 Days), 2 Yrs 11 Mos 18 Days, ₹64 Lakhs. Adopted 26 Nov 1949 (Constitution Day). Enforced 26 Jan 1950 (Republic Day, 20 yrs after 1930 Purna Swaraj Day).' },
      { label: '09. Working & Dual Role of Assembly', detail: '1st meeting 9 Dec 1946 (Sinha temp, Prasad permanent). Dual Role: Constitution Making (Rajendra Prasad) vs Law Making (G.V. Mavalankar, 1st Speaker of Lok Sabha).' },
      { label: '10. Significant Facts & 15 Women', detail: 'B.N. Rau (Legal Advisor), S.N. Mukherjee (Chief Draftsman), Raizada (English Calligraphy), Vaidya (Hindi Calligraphy), 284 Signers including 15 Women (Amrit Kaur, Sucheta Kripalani, Sarojini Naidu).' }
    ],
    summaryNote: 'Trick for 4 Chief Commissioner Provinces: "ABCD" (Ajmer-Marwar, Baluchistan, Coorg, Delhi). After Partition, seats reduced from 389 to 299.'
  },
  {
    id: 'ga-polity-salient-features-constitution',
    subject: 'Polity',
    title: 'Salient Features of Constitution',
    badge: 'Chapter 02 • Master Notes',
    chapterTag: 'Polity Masterclass',
    htmlFile: '/study-tools-ga/polity/salient_features_of_constitution.html',
    isInteractiveMasterChapter: true,
    keyPoints: [
      { label: '01. Lengthiest Written Constitution', detail: '395 Articles, 22 Parts, 8 Schedules (1950) -> 448 Articles, 25 Parts, 12 Schedules. Part VII deleted (7th CAA); 4 Parts added: IV-A (Duties), IX-A (Municipalities), IX-B (Co-operatives), XIV-A (Tribunals).' },
      { label: '02. Parliamentary System & Amendment', detail: 'Party winning majority forms government (borrowed from UK). Formal change to law/document = Amendment. Written (India/USA, rigid) vs Unwritten (UK, flexible).' },
      { label: '03. Federation with Strong Centre', detail: '3 Tiers (Union, State, Local Bodies). States derive authority directly from Constitution, not merely agents of Centre.' },
      { label: '04. Federal vs Unitary Features', detail: 'Federal: Written/Supreme/Rigid Constitution, Independent Judiciary, Bicameralism, Dual Govt. Unitary: Single Constitution/Citizenship, Integrated Judiciary, All India Services, Emergency, Governor appointment.' },
      { label: '05. Scholar Quotes on Federalism', detail: 'K.C. Wheare: "Quasi Federal". Ivor Jennings: "Federalism with centralising tendency". Granville Austin: "Cooperative Federalism". Morris Jones: "Bargaining Federalism".' },
      { label: '06. Separation of Powers', detail: 'Legislative (Makes Laws - Parliament & Assemblies), Executive (Carries Out Laws - President/PM/Ministers/Bureaucracy), Judiciary (Evaluates Laws - Supreme Court & High Courts).' },
      { label: '07. Master Trick: "TEARS OF OLD PM"', detail: 'T-Territory (1), E-Emoluments (2), A-Affirmation/Oath (3), R-Rajya Sabha seats (4), S-Scheduled Areas 10 States (5), O-Other Tribal 4 States (6), F-Federal 3 Lists (7), O-Official Languages (8), L-Land (9), D-Defection (10), P-Panchayat (11), M-Municipality (12).' },
      { label: '08. Schedule 5 & 6 (Ladakh Demands)', detail: 'Sch 5: 10 States. Sch 6: 4 NE States (ATM² - Assam, Tripura, Meghalaya, Mizoram) with Autonomous District Councils (ADCs). Ladakh protests demanding 6th Schedule extension & statehood.' },
      { label: '09. Schedule 7: Three Lists & 42nd CAA', detail: 'Union List (97->100), State List (66->61), Concurrent List (47->52). 42nd CAA 1976 transferred 5 subjects: Education, Forests, Weights/Measures, Wild Animals/Birds, Admin of Justice. Residuary powers with Parliament (Canada).' },
      { label: '10. Schedule 8 & 11 Classical Languages', detail: '14->22 Languages (21st Sindhi, 71st NAMAK, 92nd BDSM, 96th Odia). 11 Classical Languages: 6 earlier (Tamil, Sanskrit, Telugu, Kannada, Malayalam, Odia) + 5 added in 2024 (Marathi, Pali, Prakrit, Assamese, Bengali).' }
    ],
    summaryNote: 'Trick for 12 Schedules: "TEARS OF OLD PM". 42nd CAA 1976 transferred 5 subjects from State to Concurrent List. Classical Languages updated to 11 in 2024.'
  },
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
  initialVocabTab = 'core',
  initialMathsTab = 'overview',
  initialCalcBoosterTool = 'tables',
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<StudyToolTab>(initialTab);
  const [vocabSubTab, setVocabSubTab] = useState<VocabSubTab>(initialVocabTab);
  const [mathsSubTab, setMathsSubTab] = useState<MathsSubTab>(initialMathsTab);
  const [calcBoosterTool, setCalcBoosterTool] = useState<CalcBoosterTool>(initialCalcBoosterTool);

  // Sync when initialTab prop updates
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Sync when initialVocabTab prop updates
  useEffect(() => {
    if (initialVocabTab) {
      setVocabSubTab(initialVocabTab);
    }
  }, [initialVocabTab]);

  // Sync when initialMathsTab prop updates
  useEffect(() => {
    if (initialMathsTab) {
      setMathsSubTab(initialMathsTab);
    }
  }, [initialMathsTab]);

  // Sync when initialCalcBoosterTool prop updates
  useEffect(() => {
    if (initialCalcBoosterTool) {
      setCalcBoosterTool(initialCalcBoosterTool);
    }
  }, [initialCalcBoosterTool]);

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
      if (vocabTypeFilter === 'word' || vocabTypeFilter === 'idiom' || vocabTypeFilter === 'ows' || vocabTypeFilter === 'root') {
        if (item.type !== vocabTypeFilter) return false;
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
  // GA STATE
  // -------------------------------------------------------------
  const [gaSearch, setGaSearch] = useState('');
  const [gaSubject, setGaSubject] = useState<string>('All');
  const [expandedGaId, setExpandedGaId] = useState<string | null>('ga-polity-making-constitution');
  const [interactiveGaModal, setInteractiveGaModal] = useState<{ url: string; title: string } | null>(null);
  const [iframeLoading, setIframeLoading] = useState(true);

  // Background prefetch for instant 0.01s opening of current & future GA interactive capsules
  useEffect(() => {
    if (activeTab === 'ga') {
      GA_TOPICS.forEach(topic => {
        if (topic.htmlFile) {
          const prefetchLink = document.createElement('link');
          prefetchLink.rel = 'prefetch';
          prefetchLink.href = topic.htmlFile;
          prefetchLink.as = 'document';
          document.head.appendChild(prefetchLink);
        }
      });
    }
  }, [activeTab]);

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
    <div className="w-full max-w-[1650px] mx-auto space-y-5 sm:space-y-6 pb-32 sm:pb-16 pt-1 sm:pt-2 px-2.5 sm:px-4 animate-view-fade">
      
      {/* 🌟 Top Hero Portal Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/90 dark:border-white/10 p-4 sm:p-8 shadow-xs">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-72 h-72 bg-gradient-to-br from-amber-500/10 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2.5 max-w-3xl">
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
          <div className="grid grid-cols-3 w-full md:flex md:w-auto p-1 sm:p-1.5 rounded-2xl bg-slate-100 dark:bg-[#141624] border border-slate-200/80 dark:border-white/10 shadow-xs gap-1 sm:gap-1.5">
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                haptics.selection();
                setActiveTab('vocab');
                onNavigate?.('study-tools-vocab');
              }}
              className={`flex items-center justify-center gap-1.5 px-2 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer text-center ${
                activeTab === 'vocab'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-sm ring-1 ring-amber-400/50'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-white dark:hover:bg-white/[0.06]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="hidden sm:inline">Vocabulary</span>
              <span className="sm:hidden">Vocab</span>
              <span className={`hidden xs:inline-block px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-bold ${
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
                onNavigate?.('study-tools-calc-booster');
              }}
              className={`flex items-center justify-center gap-1.5 px-2 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer text-center ${
                activeTab === 'maths'
                  ? 'bg-blue-600 text-white font-black shadow-sm ring-1 ring-blue-400/50'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-white dark:hover:bg-white/[0.06]'
              }`}
            >
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 shrink-0" />
              <span className="hidden sm:inline">Calculation Booster</span>
              <span className="sm:hidden">Math Booster</span>
              <span className={`hidden md:inline-block px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                activeTab === 'maths' ? 'bg-white/20 text-white' : 'bg-white dark:bg-white/15 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-white/5'
              }`}>
                7 Tools
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
              className={`flex items-center justify-center gap-1.5 px-2 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer text-center ${
                activeTab === 'ga'
                  ? 'bg-purple-600 text-white font-black shadow-sm ring-1 ring-purple-400/50'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-white dark:hover:bg-white/[0.06]'
              }`}
            >
              <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="hidden sm:inline">General Awareness</span>
              <span className="sm:hidden">GA Notes</span>
              <span className={`hidden md:inline-block px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
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
          
          {/* Sub Navigation: Core Vocabulary vs SSC Special */}
          <div className="grid grid-cols-2 w-full sm:flex sm:w-auto items-center gap-2 border-b border-slate-200/80 dark:border-white/10 pb-3">
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                haptics.selection();
                setVocabSubTab('core');
              }}
              className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer text-center whitespace-nowrap w-full sm:w-auto ${
                vocabSubTab === 'core'
                  ? 'bg-amber-500 text-slate-950 shadow-xs font-black'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.05]'
              }`}
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>Core Vocabulary</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                haptics.selection();
                setVocabSubTab('ssc-special');
              }}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer text-center whitespace-nowrap w-full sm:w-auto ${
                vocabSubTab === 'ssc-special'
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-xs font-black ring-1 ring-pink-400/40'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.05]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-pink-400 shrink-0" />
              <span>SSC Special</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                vocabSubTab === 'ssc-special'
                  ? 'bg-white/20 text-white'
                  : 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20'
              }`}>
                7 Modules
              </span>
            </button>
          </div>

          {vocabSubTab === 'ssc-special' ? (
            <SscSpecialVocabView />
          ) : (
            <>
              {/* Top Control Bar: Search + Category Pills + Mastered Counter */}
              <div className="flex flex-col gap-3 p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs">
                {/* Search Input */}
                <div className="relative w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={vocabSearch}
                    onChange={e => {
                      setVocabSearch(e.target.value);
                      setActiveCardIndex(0);
                    }}
                    placeholder="Search words, hindi meaning, roots..."
                    className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-[#161826] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 shadow-2xs"
                  />
                  {vocabSearch && (
                    <button
                      type="button"
                      onClick={() => setVocabSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white text-xs p-1"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Filter Pills Row */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 -mx-1 px-1 min-w-0">
                  {[
                    { id: 'all', label: 'All Words', shortLabel: 'All', count: DEFAULT_VOCAB_DATA.length },
                    { id: 'word', label: 'High-Yield', shortLabel: 'Words', count: DEFAULT_VOCAB_DATA.filter(w => w.type === 'word').length },
                    { id: 'ows', label: 'OWS (One Word)', shortLabel: 'OWS', count: DEFAULT_VOCAB_DATA.filter(w => w.type === 'ows').length },
                    { id: 'idiom', label: 'Idioms & Phrases', shortLabel: 'Idioms', count: DEFAULT_VOCAB_DATA.filter(w => w.type === 'idiom').length },
                    { id: 'root', label: 'Root Words', shortLabel: 'Roots', count: DEFAULT_VOCAB_DATA.filter(w => w.type === 'root').length }
                  ].map(f => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        setVocabTypeFilter(f.id as any);
                        setActiveCardIndex(0);
                        if (f.id === 'idiom' || f.id === 'word' || f.id === 'ows' || f.id === 'root') {
                          setActiveSet('set-01');
                          if ((f.id === 'ows' || f.id === 'root') && activeLevel === 'advanced') {
                            setActiveLevel('level-1');
                          }
                        }
                      }}
                      className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                        vocabTypeFilter === f.id
                          ? 'bg-amber-500 text-slate-950 shadow-xs font-black'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/[0.05] border border-transparent'
                      }`}
                    >
                      <span className="hidden sm:inline">{f.label}</span>
                      <span className="sm:hidden">{f.shortLabel}</span>
                      <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                        vocabTypeFilter === f.id ? 'bg-black/15 text-slate-950 font-bold' : 'bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400'
                      }`}>
                        {f.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

          {/* =========================================================
              LEVEL & SUBPAGE SET NAVIGATION (Words, Idioms, OWS & Root Words)
              ========================================================= */}
          {(vocabTypeFilter === 'word' || vocabTypeFilter === 'idiom' || vocabTypeFilter === 'ows' || vocabTypeFilter === 'root') && (
            <div className="space-y-3 animate-fade-in">
              {/* Levels Navigation Bar: 3 Levels for OWS & Root Words, 4 Levels for Word/Idiom */}
              <div className={`grid gap-2.5 sm:gap-3 ${(vocabTypeFilter === 'ows' || vocabTypeFilter === 'root') ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-2 sm:grid-cols-4'}`}>
                {((vocabTypeFilter === 'ows' || vocabTypeFilter === 'root') ? HIGH_YIELD_LEVELS.filter(l => l.id !== 'advanced') : HIGH_YIELD_LEVELS).map(lvl => {
                  const isSelected = activeLevel === lvl.id;
                  const totalLevelWords = DEFAULT_VOCAB_DATA.filter(
                    w => w.type === vocabTypeFilter && w.level === lvl.id
                  ).length;
                  const levelBadgeLabel = vocabTypeFilter === 'root'
                    ? (lvl.id === 'level-1' ? 'Human Nature & Actions'
                       : lvl.id === 'level-2' ? 'Science, Time & Body'
                       : 'Power, Society & Beliefs')
                    : lvl.badge;

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
                      className={`flex flex-col justify-between p-3 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 font-black shadow-md border-amber-400 ring-2 ring-amber-400/40'
                          : 'bg-white dark:bg-[#0E101B] border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-amber-500/40 hover:bg-slate-50 dark:hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-2 min-w-0">
                        <span className={`px-1.5 sm:px-2 py-0.5 rounded-lg text-[9.5px] sm:text-[10px] font-mono font-bold uppercase tracking-wider truncate ${
                          isSelected ? 'bg-black/15 text-slate-950 font-black' : 'bg-amber-500/10 text-amber-600 dark:text-amber-300 border border-amber-500/20'
                        }`}>
                          {levelBadgeLabel}
                        </span>
                        <span className={`text-[10px] sm:text-[11px] font-mono font-bold px-1.5 sm:px-2 py-0.5 rounded-full shrink-0 whitespace-nowrap ${
                          isSelected ? 'bg-black/15 text-slate-950 font-black' : 'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-200'
                        }`}>
                          {totalLevelWords} {vocabTypeFilter === 'root' ? 'roots' : vocabTypeFilter === 'ows' ? 'OWS' : vocabTypeFilter === 'idiom' ? 'idioms' : 'words'}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <h4 className={`text-sm sm:text-base font-black tracking-tight leading-snug break-words ${
                          isSelected ? 'text-slate-950' : 'text-slate-900 dark:text-white'
                        }`}>
                          {lvl.label}
                        </h4>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Subpage Sets Selector */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar p-2 rounded-2xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-200 px-2 shrink-0 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-amber-500" />
                  <span>Subpages:</span>
                </span>
                <div className="flex items-center gap-1.5 shrink-0">
                  {currentLevelConfig.sets.map(s => {
                    const isSetSelected = activeSet === s.id;
                    const countInSet = DEFAULT_VOCAB_DATA.filter(
                      w => w.type === vocabTypeFilter && w.level === activeLevel && w.set === s.id
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
                            : 'bg-slate-100 dark:bg-white/[0.08] text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-white/15'
                        }`}
                      >
                        <span>{s.label}</span>
                        <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                          isSetSelected
                            ? 'bg-white/20 dark:bg-black/20 text-white dark:text-slate-900 font-bold'
                            : 'bg-slate-200/80 dark:bg-white/15 text-slate-700 dark:text-slate-200 font-bold'
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
              
              {/* Left: Interactive Word Flashcard (Wider: col-span-9 lg, col-span-10 xl) */}
              <div className="lg:col-span-9 xl:col-span-10 flex flex-col justify-between p-4 sm:p-8 md:p-9 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#0E101B] border-2 border-amber-500/30 dark:border-amber-500/20 shadow-md relative overflow-hidden min-h-[420px] sm:min-h-[480px] lg:min-h-[520px]">
                
                {/* 1. Top Card Meta Bar */}
                <div className="flex items-center justify-between gap-1.5 sm:gap-2 border-b border-slate-100 dark:border-white/10 pb-3 sm:pb-4 min-w-0">
                  <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0 flex-1">
                    <span className="px-2.5 sm:px-3.5 py-1 rounded-xl text-[11px] sm:text-sm font-mono font-black tracking-wider bg-slate-100 dark:bg-white/[0.12] text-slate-900 dark:text-white border border-slate-200/90 dark:border-white/20 shadow-2xs shrink-0 whitespace-nowrap">
                      CARD {String(activeCardIndex + 1).padStart(2, '0')}/{String(filteredVocab.length).padStart(2, '0')}
                    </span>
                    <span className="text-[11px] sm:text-sm font-bold text-amber-900 dark:text-amber-300 px-2 sm:px-3.5 py-1 rounded-xl bg-amber-500/15 dark:bg-amber-400/20 border border-amber-500/30 dark:border-amber-400/30 flex items-center gap-1 shadow-2xs shrink-0 whitespace-nowrap">
                      <Flame className="w-3.5 h-3.5 text-amber-600 dark:text-amber-300 shrink-0" />
                      <span>{currentFlashcard.frequency}</span>
                      <span className="hidden xs:inline">Freq</span>
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleMastered(currentFlashcard.id)}
                    className={`flex items-center gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-sm font-black transition-all cursor-pointer shadow-2xs shrink-0 whitespace-nowrap ${
                      masteredVocabIds.has(currentFlashcard.id)
                        ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-white/[0.10] text-slate-900 dark:text-white hover:bg-slate-200/80 dark:hover:bg-white/20 border border-slate-200 dark:border-white/15'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-300 shrink-0" />
                    <span>{masteredVocabIds.has(currentFlashcard.id) ? 'Mastered' : 'Master'}</span>
                    <span className="hidden sm:inline">{!masteredVocabIds.has(currentFlashcard.id) && 'ed'}</span>
                  </button>
                </div>

                {/* 2. Central Word, Pronunciation & Meaning Area */}
                <div className="py-3.5 sm:py-6 space-y-4 sm:space-y-6 flex-1 flex flex-col justify-center">
                  
                  {/* Word Header Block */}
                  <div className="space-y-2.5 sm:space-y-3">
                    {/* Row 1: Word + Part of Speech + Audio Speaker + Phonetic Badge */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3.5">
                      <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
                        {currentFlashcard.word}
                      </h2>
                      {/* Part of Speech attached directly to the Word */}
                      <span className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl text-[11px] sm:text-sm font-black uppercase tracking-wider border font-mono shadow-xs ${getPosBadgeColor(currentFlashcard.partOfSpeech)}`}>
                        {currentFlashcard.partOfSpeech}
                      </span>
                      <button
                        type="button"
                        onClick={() => speakWord(currentFlashcard.word)}
                        title="Pronounce word"
                        className="p-2 sm:p-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-700 dark:text-amber-300 border border-amber-500/30 dark:border-amber-400/30 transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-xs"
                      >
                        <Volume2 className="w-4 h-4 text-amber-700 dark:text-amber-300" />
                      </button>
                      {currentFlashcard.phonetic && (
                        <span className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl text-xs sm:text-base font-mono font-bold bg-slate-100 dark:bg-white/[0.08] text-amber-800 dark:text-amber-200 border border-slate-200/90 dark:border-white/15 shadow-2xs">
                          {currentFlashcard.phonetic}
                        </span>
                      )}
                    </div>

                    {/* Row 2: Clean Hindi Translation with Dedicated Tag */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 pt-0.5">
                      <span className="self-start px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-mono font-black uppercase tracking-wider bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/30 dark:border-amber-400/30 shrink-0">
                        हिंदी अर्थ
                      </span>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-black font-sans text-slate-950 dark:text-white tracking-wide break-words leading-snug">
                        {currentFlashcard.hindi}
                      </h3>
                    </div>
                  </div>

                  {/* 3. Exam Definition & Synonyms Panel */}
                  <div className="p-3.5 sm:p-6 md:p-7 rounded-2xl sm:rounded-3xl bg-slate-50/90 dark:bg-[#121528] border-2 border-slate-200/90 dark:border-white/10 shadow-xs space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between pb-1 gap-2 flex-wrap sm:flex-nowrap">
                      <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-amber-500/15 dark:bg-amber-400/20 border border-amber-500/30 dark:border-amber-400/35 text-[11px] sm:text-sm font-black uppercase tracking-wider text-amber-950 dark:text-amber-200 font-mono min-w-0">
                        <BookOpen className="w-3.5 h-3.5 text-amber-700 dark:text-amber-300 shrink-0" />
                        <span className="truncate">{currentFlashcard.type === 'idiom' ? 'Exam Meaning' : currentFlashcard.type === 'ows' ? 'OWS Definition' : currentFlashcard.type === 'root' ? 'Root Meaning' : 'Exam Meaning & Synonyms'}</span>
                      </div>
                      
                      {/* High-Contrast Interactive Toggle Button */}
                      <button
                        type="button"
                        onClick={() => {
                          soundManager.playClick();
                          setIsCardFlipped(prev => !prev);
                        }}
                        className="px-3 sm:px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-xs flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95 shrink-0 ml-auto"
                      >
                        <RotateCw className="w-3.5 h-3.5 text-slate-950 stroke-[2.5]" />
                        <span>{isCardFlipped ? 'Hide' : 'Flip to Reveal'}</span>
                      </button>
                    </div>

                    <div className="space-y-1">
                      {!isCardFlipped && (
                        <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 block">
                          Primary Exam Meaning
                        </span>
                      )}
                      <p className="text-lg sm:text-2xl md:text-3xl font-extrabold text-slate-950 dark:text-white leading-snug tracking-tight break-words">
                        {currentFlashcard.meaning}
                      </p>
                    </div>

                    {/* Root Word Quick Badges (Origin & Counter Root) */}
                    {currentFlashcard.type === 'root' && currentFlashcard.rootFamily && (
                      <div className="flex items-center gap-2 flex-wrap pt-1">
                        {currentFlashcard.rootFamily.origin && (
                          <span className="px-3 py-1 rounded-xl text-xs font-mono font-black uppercase bg-amber-500/20 text-amber-950 dark:text-amber-200 border border-amber-500/35 shadow-2xs">
                            🏛️ {currentFlashcard.rootFamily.origin} Origin
                          </span>
                        )}
                        <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-emerald-500/15 text-emerald-950 dark:text-emerald-200 border border-emerald-500/30">
                          🌳 Root Stem: <strong className="font-black">{currentFlashcard.rootFamily.coreMeaning}</strong>
                        </span>
                        {currentFlashcard.rootFamily.counterRoot && (
                          <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-rose-500/15 text-rose-900 dark:text-rose-200 border border-rose-500/30">
                            ⚔️ Antonym Stem: <strong className="font-black">{currentFlashcard.rootFamily.counterRoot.root}</strong> ({currentFlashcard.rootFamily.counterRoot.meaning})
                          </span>
                        )}
                      </div>
                    )}

                    {isCardFlipped ? (
                      <div className="space-y-4 pt-4 border-t border-slate-200/80 dark:border-white/10 animate-fade-in text-sm sm:text-base">
                        {/* 🌳 Interactive Word Family Tree (एक रूट, अनेक शब्द Matrix) */}
                        {currentFlashcard.rootFamily && (
                          <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-emerald-500/[0.08] dark:bg-emerald-950/25 border-2 border-emerald-500/30 dark:border-emerald-500/30 shadow-xs space-y-4">
                            {/* Family Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-emerald-500/20">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-lg shadow-xs shrink-0">
                                  🌳
                                </div>
                                <div>
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <h4 className="text-base sm:text-lg font-black text-slate-950 dark:text-white">
                                      Word Family Tree <span className="text-emerald-700 dark:text-emerald-400 font-sans font-bold">(एक रूट, अनेक शब्द Matrix)</span>
                                    </h4>
                                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-black bg-emerald-500 text-slate-950 shadow-xs">
                                      {currentFlashcard.rootFamily.derivatives.length} Exam Words
                                    </span>
                                  </div>
                                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                                    Iss ek root stem se derived sabhi high-frequency exam words aur unka morphology formula
                                  </p>
                                </div>
                              </div>

                              {/* Origin & Counter Root Badges */}
                              <div className="flex items-center gap-2 flex-wrap">
                                {currentFlashcard.rootFamily.origin && (
                                  <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-white dark:bg-[#121528] text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-white/10 shadow-2xs">
                                    🏛️ {currentFlashcard.rootFamily.origin} Origin
                                  </span>
                                )}
                                {currentFlashcard.rootFamily.counterRoot && (
                                  <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-rose-500/15 text-rose-800 dark:text-rose-300 border border-rose-500/30 shadow-2xs">
                                    ⚔️ Antonym Stem: <strong className="font-black">{currentFlashcard.rootFamily.counterRoot.root}</strong>
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Interactive Derivative Cards Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                              {currentFlashcard.rootFamily.derivatives.map((deriv, dIdx) => (
                                <div
                                  key={deriv.word}
                                  className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#0E101B] border-2 border-emerald-500/20 hover:border-emerald-500/60 dark:border-white/10 dark:hover:border-emerald-500/50 shadow-2xs hover:shadow-md transition-all space-y-2.5 group"
                                >
                                  {/* Top Row: Word Name + Speaker Button + Grammar Tag + Exam Tag */}
                                  <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                      <span className="w-6 h-6 rounded-lg bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-black flex items-center justify-center shrink-0">
                                        {dIdx + 1}
                                      </span>
                                      <h5 className="text-base sm:text-lg font-black text-slate-950 dark:text-white tracking-tight group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                                        {deriv.word}
                                      </h5>
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          soundManager.playClick();
                                          speakWord(deriv.word);
                                        }}
                                        title={`Pronounce ${deriv.word}`}
                                        className="p-1.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-emerald-500/20 text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all cursor-pointer hover:scale-110 active:scale-95"
                                      >
                                        <Volume2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                    
                                    <div className="flex items-center gap-1.5 shrink-0">
                                      <span className="px-2 py-0.5 rounded-lg text-[10px] font-mono font-black uppercase bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                                        {deriv.partOfSpeech}
                                      </span>
                                      {deriv.examTag && (
                                        <span className="px-2 py-0.5 rounded-lg text-[9px] font-mono font-bold uppercase bg-amber-500/15 text-amber-900 dark:text-amber-300 border border-amber-500/30">
                                          {deriv.examTag}
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  {/* Morphology Formula Breakdown */}
                                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-950 dark:text-emerald-200 text-xs font-mono font-bold border border-emerald-500/25 flex-wrap">
                                    <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-sans uppercase tracking-wider font-black">Formula:</span>
                                    <span>{deriv.breakdown}</span>
                                  </div>

                                  {/* Hindi Translation */}
                                  <div className="flex items-center gap-2 pt-0.5">
                                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-black uppercase bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/30 shrink-0">
                                      हिंदी अर्थ
                                    </span>
                                    <span className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                                      {deriv.hindi}
                                    </span>
                                  </div>

                                  {/* Meaning */}
                                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                                    {deriv.meaning}
                                  </p>

                                  {/* Real Exam Example Sentence */}
                                  <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border-l-4 border-emerald-500 text-xs sm:text-sm text-slate-800 dark:text-slate-200 italic leading-relaxed">
                                    "{deriv.example}"
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {/* Synonyms & Antonyms */}
                        <div className="space-y-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono font-black text-xs sm:text-sm uppercase tracking-wider text-emerald-700 dark:text-emerald-400 shrink-0">
                              Synonyms:
                            </span>
                            {currentFlashcard.synonyms.map(syn => (
                              <span key={syn} className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-900 dark:text-emerald-200 font-bold text-xs sm:text-sm md:text-base border border-emerald-500/30 hover:scale-105 transition-transform shadow-2xs">
                                {syn}
                              </span>
                            ))}
                          </div>

                          {currentFlashcard.antonyms.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2 pt-1">
                              <span className="font-mono font-black text-xs sm:text-sm uppercase tracking-wider text-rose-700 dark:text-rose-400 shrink-0">
                                Antonyms:
                              </span>
                              {currentFlashcard.antonyms.map(ant => (
                                <span key={ant} className="px-3.5 py-1.5 rounded-xl bg-rose-500/15 dark:bg-rose-500/20 text-rose-900 dark:text-rose-200 font-bold text-xs sm:text-sm md:text-base border border-rose-500/30 hover:scale-105 transition-transform shadow-2xs">
                                  {ant}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Collocation & Word Family */}
                        {(currentFlashcard.collocation || currentFlashcard.derivatives) && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs sm:text-sm">
                            {currentFlashcard.collocation && (
                              <div className="p-3 rounded-xl bg-blue-500/10 dark:bg-blue-500/15 border border-blue-500/25 text-blue-900 dark:text-blue-300">
                                📌 <strong>Collocation / Prep:</strong> {currentFlashcard.collocation}
                              </div>
                            )}
                            {currentFlashcard.derivatives && (
                              <div className="p-3 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/25 text-emerald-900 dark:text-emerald-300">
                                🌳 <strong>Word Family:</strong> {currentFlashcard.derivatives}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Example Sentence */}
                        <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 dark:bg-amber-500/[0.08] border-l-4 border-amber-500 shadow-2xs space-y-1">
                          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block">
                            Usage Example
                          </span>
                          <p className="text-base sm:text-lg md:text-xl font-medium text-slate-800 dark:text-slate-100 italic leading-relaxed">
                            "{currentFlashcard.example}"
                          </p>
                        </div>

                        {/* Mnemonic Trick / Origin Story */}
                        {currentFlashcard.mnemonic && (
                          <div className="p-4 sm:p-5 rounded-2xl bg-purple-500/15 dark:bg-purple-500/20 border border-purple-500/30 shadow-2xs flex items-start gap-3.5">
                            <span className="text-xl shrink-0">{currentFlashcard.type === 'idiom' ? '🏛️' : currentFlashcard.type === 'ows' ? '🎯' : '💡'}</span>
                            <div className="text-sm sm:text-base md:text-lg font-medium text-purple-950 dark:text-purple-100 leading-relaxed">
                              <strong className="font-bold text-purple-900 dark:text-purple-300">
                                {currentFlashcard.type === 'idiom' ? 'Origin & Memory Trick:' : currentFlashcard.type === 'ows' ? 'OWS Memory Trick:' : currentFlashcard.type === 'root' ? 'Root Origin & Trick:' : 'Memory Trick:'}
                              </strong>{' '}
                              {currentFlashcard.mnemonic}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      /* 🌟 UN-FLIPPED ACTIVE RECALL PROMPT & DRILL TEASER */
                      <div
                        onClick={() => {
                          soundManager.playClick();
                          setIsCardFlipped(true);
                        }}
                        className="group mt-3 p-3 sm:p-5 rounded-2xl bg-amber-500/10 dark:bg-white/[0.04] hover:bg-amber-500/15 dark:hover:bg-white/[0.07] border-2 border-dashed border-amber-500/40 dark:border-amber-400/50 transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs hover:shadow-sm"
                      >
                        <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 flex-1">
                          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-xs group-hover:scale-105 transition-transform shrink-0">
                            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 sm:gap-2">
                              <span className="text-xs sm:text-base font-black text-slate-900 dark:text-white">
                                Active Recall Drill
                              </span>
                              <span className="px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500 text-slate-950 shrink-0">
                                Tap to Reveal
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-[10.5px] sm:text-sm text-slate-600 dark:text-slate-300 mt-0.5 flex-wrap font-medium">
                              {currentFlashcard.type === 'root' && currentFlashcard.rootFamily ? (
                                <span className="font-bold text-emerald-700 dark:text-emerald-300">
                                  🌳 {currentFlashcard.rootFamily.derivatives.length} Words
                                </span>
                              ) : (
                                <span className="font-bold text-emerald-700 dark:text-emerald-300">
                                  ✓ {currentFlashcard.synonyms.length} Synonyms
                                </span>
                              )}
                              {currentFlashcard.antonyms.length > 0 && (
                                <>
                                  <span className="text-slate-400">•</span>
                                  <span className="font-bold text-rose-700 dark:text-rose-300">
                                    ✕ {currentFlashcard.antonyms.length} Antonyms
                                  </span>
                                </>
                              )}
                              {currentFlashcard.mnemonic && (
                                <>
                                  <span className="text-slate-400">•</span>
                                  <span className="font-bold text-purple-700 dark:text-purple-300">
                                    💡 Trick
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-xs transition-transform shrink-0 w-full sm:w-auto text-center">
                          <span>Reveal All</span>
                          <RotateCw className="w-3.5 h-3.5 text-slate-950" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 4. Bottom Navigation Bar */}
                <div className="flex items-center justify-between gap-3 pt-3.5 sm:pt-5 border-t border-slate-100 dark:border-white/10">
                  <button
                    type="button"
                    onClick={handlePrevCard}
                    className="px-4 sm:px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.12] hover:bg-slate-200 dark:hover:bg-white/20 text-slate-900 dark:text-white text-xs sm:text-sm font-black transition-all cursor-pointer shadow-2xs hover:-translate-x-0.5 active:translate-x-0 border border-slate-200/80 dark:border-white/15 shrink-0 whitespace-nowrap"
                  >
                    ← Previous
                  </button>

                  <button
                    type="button"
                    onClick={handleNextCard}
                    className="px-5 sm:px-7 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 text-xs sm:text-sm font-black tracking-wide transition-all cursor-pointer shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] shrink-0 whitespace-nowrap ml-auto"
                  >
                    Next Card →
                  </button>
                </div>
              </div>

              {/* Right: Vocabulary Explorer (Compact & Word-Only: col-span-3 lg, col-span-2 xl) */}
              <div className="lg:col-span-3 xl:col-span-2 p-3 sm:p-3.5 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col justify-between space-y-3 min-h-[300px] sm:min-h-[480px] lg:min-h-[520px]">
                <div className="min-w-0 flex-1 flex flex-col">
                  <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 dark:border-white/10 gap-1 shrink-0">
                    <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5 min-w-0">
                      <Layers className="w-4 h-4 text-amber-500 shrink-0" />
                      <span className="truncate">Vocabulary Explorer</span>
                    </h3>
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 shrink-0">
                      {filteredVocab.length}
                    </span>
                  </div>

                  <div className="divide-y divide-slate-100 dark:divide-white/[0.06] overflow-y-auto max-h-[320px] sm:max-h-[500px] lg:max-h-[520px] flex-1 no-scrollbar mt-1 space-y-0.5">
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
                          className={`px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center justify-between gap-1.5 ${
                            isSelected
                              ? 'bg-amber-500/15 text-amber-800 dark:text-amber-300 font-black border-l-4 border-amber-500 shadow-2xs'
                              : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-white/[0.04]'
                          }`}
                        >
                          <span className={`text-xs sm:text-sm truncate flex items-center gap-1.5 ${isSelected ? 'font-black' : 'font-semibold'}`}>
                            {item.type === 'root' && <span className="text-[11px] shrink-0">🌳</span>}
                            <span className="truncate">{item.word}</span>
                          </span>
                          <div className="flex items-center gap-1 shrink-0">
                            {item.type === 'root' && item.rootFamily && (
                              <span className="px-1.5 py-0.2 rounded-md text-[9px] font-mono font-bold bg-emerald-500/15 text-emerald-800 dark:text-emerald-300">
                                {item.rootFamily.derivatives.length}w
                              </span>
                            )}
                            {isMastered && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="p-2.5 sm:p-3 rounded-2xl bg-amber-500/10 text-amber-900 dark:text-amber-300 text-xs leading-relaxed border border-amber-500/20 shrink-0 font-medium">
                  🎯 <strong>Pro Tip:</strong> Active recall by guessing the meaning before clicking "Flip" increases retention by 300%.
                </div>
              </div>
            </div>
          ) : (
            (vocabTypeFilter === 'word' || vocabTypeFilter === 'idiom' || vocabTypeFilter === 'ows' || vocabTypeFilter === 'root') ? (
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
                    {vocabTypeFilter === 'idiom' ? 'Ready for Idioms Integration' : vocabTypeFilter === 'ows' ? 'Ready for OWS Integration' : vocabTypeFilter === 'root' ? 'Ready for Root Words Integration' : 'Ready for Words Integration'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {vocabTypeFilter === 'idiom'
                      ? 'Is Set me abhi koi idiom nahi hai. Aap apne idioms provide karein, hum unhe turant is Set me live add kar denge!'
                      : vocabTypeFilter === 'ows'
                      ? 'Is Set me abhi koi OWS nahi hai. Aap apne one word substitutions provide karein, hum unhe turant is Set me live add kar denge!'
                      : vocabTypeFilter === 'root'
                      ? 'Is Set me abhi koi root word nahi hai. Agle sets ke root words jald hi live integrate kiye jayenge!'
                      : 'Is Set me abhi koi word nahi hai. Aap apne words provide karein, hum unhe turant is Set me live add kar denge!'}
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
            </>
          )}
        </div>
      )}

      {/* =========================================================
          MODULE 2: CALCULATION BOOSTER (7 SPEED MATHS TOOLS)
          ========================================================= */}
      {activeTab === 'maths' && (
        <div className="space-y-6 animate-fade-in">
              {/* Calculation Booster Tool Sub-Navigation */}
              <div className="flex items-center p-1.5 rounded-2xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs gap-1.5 self-start max-w-full overflow-x-auto no-scrollbar scrollbar-none">
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    haptics.selection();
                    setCalcBoosterTool('tables');
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
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
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
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
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                    calcBoosterTool === 'cubes'
                      ? 'bg-cyan-600 text-white shadow-xs font-black ring-1 ring-cyan-400/40'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.04]'
                  }`}
                >
                  <Boxes className="w-4 h-4" />
                  <span>Cubes & Roots (1 to 30)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    haptics.selection();
                    setCalcBoosterTool('fractions');
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                    calcBoosterTool === 'fractions'
                      ? 'bg-emerald-600 text-white shadow-xs font-black ring-1 ring-emerald-400/40'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.04]'
                  }`}
                >
                  <Percent className="w-4 h-4" />
                  <span>Percentage to Fraction</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    haptics.selection();
                    setCalcBoosterTool('triplets');
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                    calcBoosterTool === 'triplets'
                      ? 'bg-indigo-600 text-white shadow-xs font-black ring-1 ring-indigo-400/40'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.04]'
                  }`}
                >
                  <Triangle className="w-4 h-4 rotate-90" />
                  <span>Pythagorean Triplets</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    haptics.selection();
                    setCalcBoosterTool('powers');
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                    calcBoosterTool === 'powers'
                      ? 'bg-violet-600 text-white shadow-xs font-black ring-1 ring-violet-400/40'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.04]'
                  }`}
                >
                  <span className="font-mono font-black text-xs">xʸ</span>
                  <span>Higher Powers</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    haptics.selection();
                    setCalcBoosterTool('primes');
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                    calcBoosterTool === 'primes'
                      ? 'bg-purple-600 text-white shadow-xs font-black ring-1 ring-purple-400/40'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.04]'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Prime Numbers</span>
                </button>
              </div>

              {calcBoosterTool === 'tables' ? (
                <CalculationBoosterTables />
              ) : calcBoosterTool === 'squares' ? (
                <CalculationBoosterSquares />
              ) : calcBoosterTool === 'cubes' ? (
                <CalculationBoosterCubes />
              ) : calcBoosterTool === 'fractions' ? (
                <CalculationBoosterFractions />
              ) : calcBoosterTool === 'triplets' ? (
                <CalculationBoosterTriplets />
              ) : calcBoosterTool === 'powers' ? (
                <CalculationBoosterPowers />
              ) : (
                <CalculationBoosterPrimes />
              )}
        </div>
      )}

      {/* =========================================================
          MODULE 3: GENERAL AWARENESS (GA) REVISION HUB
          ========================================================= */}
      {activeTab === 'ga' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Controls: Search + Subject Pills */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs">
            <div className="relative flex-1 max-w-lg">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={gaSearch}
                onChange={e => setGaSearch(e.target.value)}
                placeholder="Search polity, history, geography, science..."
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-[#161826] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 shadow-2xs"
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
                  <div
                    onClick={() => {
                      soundManager.playClick();
                      setExpandedGaId(isExpanded ? null : topic.id);
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        soundManager.playClick();
                        setExpandedGaId(isExpanded ? null : topic.id);
                      }
                    }}
                    className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-slate-50/50 dark:hover:bg-white/[0.02] cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 flex items-center justify-center font-bold shrink-0">
                        <Compass className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-700 dark:text-purple-300">
                            {topic.subject}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">
                            {topic.badge}
                          </span>
                          {topic.htmlFile && (
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                              ⚡ Interactive Masterclass
                            </span>
                          )}
                        </div>
                        <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                          {topic.title}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {topic.htmlFile && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            soundManager.playClick();
                            setIframeLoading(true);
                            setInteractiveGaModal({ url: topic.htmlFile!, title: topic.title });
                          }}
                          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Open Master Notes</span>
                        </button>
                      )}
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180' : 'rotate-0'
                      }`} />
                    </div>
                  </div>

                  {/* Expanded Capsule Details */}
                  {isExpanded && (
                    <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 dark:border-white/10 space-y-4 animate-fade-in">
                      {/* Masterclass Banner for interactive HTML capsule */}
                      {topic.htmlFile && (
                        <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-purple-900/30 via-indigo-900/20 to-purple-900/30 border border-purple-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-slate-950 uppercase tracking-wider">
                                Interactive Master Chapter
                              </span>
                              <span className="text-xs text-purple-600 dark:text-purple-300 font-medium">10 Modules • PYQ Quiz • Self-Test Mode</span>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-300">
                              Complete high-yield Hinglish notes with interactive self-testing, PYQ practice quiz, and student note taking.
                            </p>
                          </div>
                          <div className="flex items-center gap-2 w-full sm:w-auto">
                            <button
                              type="button"
                              onClick={() => {
                                soundManager.playClick();
                                setIframeLoading(true);
                                setInteractiveGaModal({ url: topic.htmlFile!, title: topic.title });
                              }}
                              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-purple-900/30 transition-all cursor-pointer shrink-0"
                            >
                              <BookOpen className="w-4 h-4" />
                              <span>Launch Master Notes</span>
                            </button>
                            <a
                              href={topic.htmlFile}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
                              title="Open in new tab"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">New Tab</span>
                            </a>
                          </div>
                        </div>
                      )}

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

      {/* Interactive GA Document Fullscreen Modal */}
      {interactiveGaModal && createPortal(
        <div className="fixed inset-0 z-[9999] flex flex-col bg-slate-950/95 backdrop-blur-md animate-fade-in">
          {/* Header Bar */}
          <div className="h-14 px-4 sm:px-6 bg-slate-900/90 border-b border-white/10 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm sm:text-base font-bold text-white truncate">
                  {interactiveGaModal.title}
                </h3>
                <span className="text-[11px] text-purple-300 font-medium hidden sm:inline">
                  Interactive Study Capsule • Complete Hinglish Notes
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={interactiveGaModal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-medium transition-colors"
                title="Open in new tab"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">New Tab</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setInteractiveGaModal(null);
                }}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-red-500/20 text-slate-300 hover:text-red-400 transition-colors cursor-pointer"
                aria-label="Close reader"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Iframe Viewport */}
          <div className="flex-1 w-full h-full relative bg-[#FAEED9]">
            {iframeLoading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#FAEED9] text-[#38370D] transition-opacity duration-200">
                <div className="w-12 h-12 rounded-2xl bg-[#38370D] text-[#E1A837] border-2 border-[#8D7A02] flex items-center justify-center shadow-lg animate-pulse mb-3">
                  <BookOpen className="w-6 h-6 animate-spin text-[#E1A837]" />
                </div>
                <p className="text-sm font-extrabold text-[#38370D]">Loading Master Notes...</p>
                <span className="text-[11px] text-[#8D7A02] font-semibold mt-1">Instant Pre-cached Engine</span>
              </div>
            )}
            <iframe
              src={interactiveGaModal.url}
              title={interactiveGaModal.title}
              onLoad={() => setIframeLoading(false)}
              className="w-full h-full border-none"
            />
          </div>
        </div>,
        document.body
      )}

    </div>
  );
};
