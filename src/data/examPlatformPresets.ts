import { ExternalPlatform } from '../types/syllabus';

export type ExamTrackCategory =
  | 'ssc'
  | 'coding'
  | 'banking'
  | 'upsc'
  | 'railway'
  | 'defence'
  | 'general';

export interface ExamTrackMetadata {
  id: ExamTrackCategory;
  name: string;
  shortLabel: string;
  icon: string;
  color: string;
  badge: string;
  description: string;
}

export const EXAM_TRACKS: Record<ExamTrackCategory, ExamTrackMetadata> = {
  ssc: {
    id: 'ssc',
    name: 'SSC & Govt Exams',
    shortLabel: 'SSC CGL / CHSL',
    icon: '🏛️',
    color: '#0284C7',
    badge: 'Staff Selection Commission',
    description: 'Parmar SSC, Testbook, Oliveboard, Vocab Tools & Govt Portals'
  },
  coding: {
    id: 'coding',
    name: 'Coding & Software Dev',
    shortLabel: 'Coding & Tech',
    icon: '💻',
    color: '#10B981',
    badge: 'Tech & Software Engineering',
    description: 'LeetCode, GitHub, MDN, NeetCode, Roadmap.sh & Dev Tools'
  },
  banking: {
    id: 'banking',
    name: 'Banking & Insurance',
    shortLabel: 'Bank PO & Clerk',
    icon: '🏦',
    color: '#8B5CF6',
    badge: 'IBPS, SBI & RBI Cadre',
    description: 'BankersAdda, PracticeMock, Oliveboard Banking & AffairsCloud'
  },
  upsc: {
    id: 'upsc',
    name: 'UPSC & Civil Services',
    shortLabel: 'UPSC CSE & PCS',
    icon: '🇮🇳',
    color: '#F59E0B',
    badge: 'Civil Services & State PSC',
    description: 'Drishti IAS, Vision IAS, Insights on India, PIB & PRS'
  },
  railway: {
    id: 'railway',
    name: 'Indian Railways',
    shortLabel: 'RRB NTPC & ALP',
    icon: '🚆',
    color: '#EA580C',
    badge: 'Railway Recruitment Board',
    description: 'RRB CBT Mocks, TopRankers, Official Railways & PYQ Vault'
  },
  defence: {
    id: 'defence',
    name: 'Defence Services',
    shortLabel: 'NDA, CDS & AFCAT',
    icon: '🛡️',
    color: '#15803D',
    badge: 'Armed Forces Cadet',
    description: 'SSBCrack, Major Kalshi Classes & Defence Mocks'
  },
  general: {
    id: 'general',
    name: 'All Tracks / Universal',
    shortLabel: 'Universal Portals',
    icon: '🌐',
    color: '#64748B',
    badge: 'Cross-Discipline',
    description: 'Portals accessible across all exams and study streams'
  }
};

/**
 * Detect the track/category of an exam based on code, name or id
 */
export const detectExamTrack = (
  exam?: { id?: string; code?: string; name?: string } | string | null
): ExamTrackCategory => {
  if (!exam) return 'ssc';
  const query = typeof exam === 'string'
    ? exam.toLowerCase()
    : `${exam.code || ''} ${exam.name || ''} ${exam.id || ''}`.toLowerCase();

  if (/(coding|programmer|developer|software|fullstack|frontend|backend|dsa|web dev|computer|tech|python|javascript|react)/i.test(query)) {
    return 'coding';
  }
  if (/(ssc|cgl|chsl|cpo|mts|steno|selection post)/i.test(query)) {
    return 'ssc';
  }
  if (/(bank|ibps|sbi|rbi|po|clerk|nabard|insurance|lic)/i.test(query)) {
    return 'banking';
  }
  if (/(upsc|civil services|ias|ips|cse|state pcs|pcs|mppsc|bpsc|uppsc)/i.test(query)) {
    return 'upsc';
  }
  if (/(railway|rrb|ntpc|group d|alp|je)/i.test(query)) {
    return 'railway';
  }
  if (/(defence|nda|cds|afcat|navy|airforce|army)/i.test(query)) {
    return 'defence';
  }
  return 'general';
};

/**
 * Detect track/category of an external platform based on its properties & domain
 */
export const detectPlatformTrack = (
  platform: Partial<ExternalPlatform>,
  fallbackExamTrack: ExamTrackCategory = 'ssc'
): ExamTrackCategory => {
  if (platform.isUniversal) return 'general';
  if (platform.targetCategory && platform.targetCategory in EXAM_TRACKS) {
    return platform.targetCategory as ExamTrackCategory;
  }
  if (platform.targetExamId) {
    const track = detectExamTrack(platform.targetExamId);
    if (track !== 'general') return track;
  }

  const text = `${platform.name || ''} ${platform.url || ''} ${platform.description || ''} ${platform.customCategoryName || ''}`.toLowerCase();

  // 1. Coding & Tech
  if (
    /leetcode\.com|github\.com|developer\.mozilla|neetcode\.io|stackoverflow\.com|codechef\.com|hackerrank\.com|roadmap\.sh|freecodecamp\.org|w3schools\.com|replit\.com|codepen\.io|geeksforgeeks\.org|kaggle\.com|npmjs\.com|vercel\.com|codesandbox\.io/i.test(text) ||
    /leetcode|github|neetcode|dsa|coding|algorithm|javascript|typescript|python|frontend|backend|web dev|system design/i.test(text)
  ) {
    return 'coding';
  }

  // 2. SSC & Govt Exams
  if (
    /parmaracademy|parmar|smartvocab|vocabmaster|risevocab|careerwill|pinnacle|qmaths|rbeeducation|ssc\.gov\.in|shabdkosh/i.test(text) ||
    /ssc|cgl|chsl|cpo|mts|parmar|vocab power|rise vocab|shabdkosh/i.test(text)
  ) {
    return 'ssc';
  }

  // 3. UPSC
  if (
    /drishtiias|visionias|insightsonindia|pib\.gov\.in|prsindia|clearias|unacademy.*ias/i.test(text) ||
    /upsc|ias|ips|prelims|mains|drishti|vision ias/i.test(text)
  ) {
    return 'upsc';
  }

  // 4. Banking
  if (
    /bankersadda|practicemock|affairscloud|rbi\.org\.in|ibps\.in/i.test(text) ||
    /bankersadda|bank po|sbi po|ibps|practicemock/i.test(text)
  ) {
    return 'banking';
  }

  // 5. Railways
  if (
    /indianrailways\.gov\.in|rrb/i.test(text) ||
    /rrb ntpc|group d|railway/i.test(text)
  ) {
    return 'railway';
  }

  // 6. Defence
  if (
    /ssbcrack|majorkalshi/i.test(text) ||
    /nda|cds|afcat|ssb interview/i.test(text)
  ) {
    return 'defence';
  }

  return fallbackExamTrack;
};

/**
 * Curated preset platforms for each exam track
 */
export const CURATED_EXAM_PLATFORMS: Record<ExamTrackCategory, Array<Omit<ExternalPlatform, 'id' | 'createdAt'>>> = {
  coding: [
    {
      name: 'LeetCode',
      url: 'https://leetcode.com/problemset/all/',
      category: 'test_series',
      description: 'Data Structures, Algorithms & Technical Interview Problems with discussion',
      color: '#FFA116',
      icon: '💻',
      loginHint: 'LeetCode Account',
      notes: 'Practice NeetCode 150 & Daily Coding Challenges',
      pinned: true,
      targetCategory: 'coding',
      isUniversal: false
    },
    {
      name: 'GitHub',
      url: 'https://github.com/',
      category: 'reference',
      description: 'Version Control, Code Repositories, Pull Requests & Open Source projects',
      color: '#24292F',
      icon: '🐙',
      loginHint: 'GitHub Username / Email',
      notes: 'Push daily commits, track project repos and portfolio projects',
      pinned: true,
      targetCategory: 'coding',
      isUniversal: false
    },
    {
      name: 'MDN Web Docs',
      url: 'https://developer.mozilla.org/',
      category: 'reference',
      description: 'Authoritative documentation for JavaScript, CSS, HTML & Web APIs',
      color: '#1B1B1B',
      icon: '🌐',
      notes: 'Standard web API reference for modern JS & CSS',
      pinned: false,
      targetCategory: 'coding',
      isUniversal: false
    },
    {
      name: 'NeetCode.io',
      url: 'https://neetcode.io/practice',
      category: 'course',
      description: 'Blind 75 & NeetCode 150 structured roadmap with video explanations',
      color: '#22C55E',
      icon: '⚡',
      loginHint: 'NeetCode Login',
      notes: 'Follow structured DSA topic trees with step-by-step videos',
      pinned: true,
      targetCategory: 'coding',
      isUniversal: false
    },
    {
      name: 'Stack Overflow',
      url: 'https://stackoverflow.com/questions',
      category: 'reference',
      description: 'Developer community Q&A, bug debugging and code problem solving',
      color: '#F48024',
      icon: '📚',
      notes: 'Search for syntax traps, runtime exceptions and best practices',
      pinned: false,
      targetCategory: 'coding',
      isUniversal: false
    },
    {
      name: 'Roadmap.sh',
      url: 'https://roadmap.sh/',
      category: 'reference',
      description: 'Community-driven visual developer roadmaps (Frontend, Backend, DevOps, DSA)',
      color: '#9333EA',
      icon: '🗺️',
      notes: 'Follow career tracks and track missing skill prerequisites',
      pinned: false,
      targetCategory: 'coding',
      isUniversal: false
    },
    {
      name: 'FreeCodeCamp',
      url: 'https://www.freecodecamp.org/learn',
      category: 'course',
      description: 'Interactive coding exercises, full-stack certifications & guided projects',
      color: '#0A0A23',
      icon: '🔥',
      loginHint: 'freeCodeCamp Account',
      notes: 'Complete project certifications and hands-on coding drills',
      pinned: false,
      targetCategory: 'coding',
      isUniversal: false
    },
    {
      name: 'CodeChef & Contests',
      url: 'https://www.codechef.com/',
      category: 'test_series',
      description: 'Weekly rated coding contests, speed challenges and problem practice',
      color: '#5B4638',
      icon: '🏆',
      loginHint: 'CodeChef Handle',
      notes: 'Weekly Starters & Long Challenges for algorithmic speed',
      pinned: false,
      targetCategory: 'coding',
      isUniversal: false
    }
  ],

  ssc: [
    {
      name: 'Parmar SSC',
      url: 'https://parmaracademy.in/',
      category: 'course',
      description: 'Pinnacle GK, Static GK & General Science batches for SSC CGL & CHSL',
      color: '#E11D48',
      icon: '🎓',
      loginHint: 'Parmar Academy Mobile',
      notes: 'Watch daily GK series & download class summary PDFs',
      pinned: true,
      targetCategory: 'ssc',
      isUniversal: false
    },
    {
      name: 'Testbook Pass & Mock Series',
      url: 'https://testbook.com/test-series',
      category: 'test_series',
      description: 'All India Live Mocks, Previous Year Papers & Percentile Analysis',
      color: '#0284C7',
      icon: '📝',
      loginHint: 'Testbook Account Email',
      notes: 'Attempt full-length Tier 1 & Tier 2 mocks, log errors directly in Mistake Journal',
      pinned: true,
      targetCategory: 'ssc',
      isUniversal: false
    },
    {
      name: 'Oliveboard Mocks & Tests',
      url: 'https://www.oliveboard.in/',
      category: 'test_series',
      description: 'High-difficulty mock tests, sectional tests & topic speed quizzes',
      color: '#16A34A',
      icon: '🎯',
      loginHint: 'Oliveboard User Email',
      notes: 'Hard-level mock tests to test speed and accuracy under pressure',
      pinned: false,
      targetCategory: 'ssc',
      isUniversal: false
    },
    {
      name: 'Careerwill',
      url: 'https://careerwill.com/',
      category: 'course',
      description: 'SSC video batches: Maths Special (Gagan Pratap), English, Reasoning',
      color: '#E11D48',
      icon: '🎓',
      loginHint: 'Careerwill Registered Phone',
      notes: 'Maths Special, Reasoning, English & GS live classes',
      pinned: true,
      targetCategory: 'ssc',
      isUniversal: false
    },
    {
      name: 'Rise Vocab',
      url: 'https://risevocab.lovable.app/',
      category: 'reference',
      description: 'Active recall vocabulary flashcards, idioms, homophones and root words',
      color: '#5A4FCF',
      icon: '📚',
      notes: 'Master exam high-frequency vocabulary with spaced repetition',
      pinned: false,
      targetCategory: 'ssc',
      isUniversal: false
    },
    {
      name: 'ShabdKosh',
      url: 'https://smartvocab.ai.studio/',
      category: 'reference',
      description: 'Smart vocabulary AI study studio and Hindi contextual meanings',
      color: '#0284C7',
      icon: '📖',
      notes: 'Search difficult vocabulary words with exam context',
      pinned: false,
      targetCategory: 'ssc',
      isUniversal: false
    },
    {
      name: 'SSC Official Portal',
      url: 'https://ssc.gov.in/',
      category: 'reference',
      description: 'Staff Selection Commission official notifications, exam calendar & results',
      color: '#1E3A8A',
      icon: '🏛️',
      notes: 'Check official exam dates, notice releases and answer keys',
      pinned: false,
      targetCategory: 'ssc',
      isUniversal: false
    }
  ],

  banking: [
    {
      name: 'BankersAdda (Adda247)',
      url: 'https://www.bankersadda.com/',
      category: 'course',
      description: 'Banking awareness, daily sectional quizzes, quantitative aptitude & reasoning',
      color: '#DC2626',
      icon: '🏦',
      loginHint: 'Adda247 Registered Mobile',
      notes: 'Daily banking current affairs quizzes & topic-wise drills',
      pinned: true,
      targetCategory: 'banking',
      isUniversal: false
    },
    {
      name: 'Oliveboard Banking Mocks',
      url: 'https://www.oliveboard.in/banking-exam/',
      category: 'test_series',
      description: 'Industry-standard tough DI & reasoning puzzle mocks for SBI & IBPS PO',
      color: '#16A34A',
      icon: '🎯',
      loginHint: 'Oliveboard Email',
      notes: 'High-difficulty Prelims & Mains full-length tests',
      pinned: true,
      targetCategory: 'banking',
      isUniversal: false
    },
    {
      name: 'PracticeMock',
      url: 'https://www.practicemock.com/',
      category: 'test_series',
      description: 'High-speed mock tests, live rankings and exam analytics',
      color: '#0284C7',
      icon: '⚡',
      notes: 'Excellent sectional tests for numerical ability and reasoning',
      pinned: false,
      targetCategory: 'banking',
      isUniversal: false
    },
    {
      name: 'AffairsCloud',
      url: 'https://affairscloud.com/',
      category: 'reference',
      description: 'Daily banking current affairs, financial awareness PDFs & monthly capsules',
      color: '#7C3AED',
      icon: '📰',
      notes: 'Essential for General Awareness & Financial Awareness section',
      pinned: false,
      targetCategory: 'banking',
      isUniversal: false
    },
    {
      name: 'Reserve Bank of India (RBI)',
      url: 'https://www.rbi.org.in/',
      category: 'reference',
      description: 'RBI official notifications, circulars, monetary policy reports & press releases',
      color: '#1E40AF',
      icon: '🏛️',
      notes: 'Direct source for monetary policy rates and economic circulars',
      pinned: false,
      targetCategory: 'banking',
      isUniversal: false
    }
  ],

  upsc: [
    {
      name: 'Drishti IAS',
      url: 'https://www.drishtiias.com/',
      category: 'course',
      description: 'Daily current affairs, editorial analysis, and Hindi/English GS study notes',
      color: '#C2410C',
      icon: '📖',
      loginHint: 'Drishti Learning ID',
      notes: 'Read daily editorial summaries and Prelims fact sheets',
      pinned: true,
      targetCategory: 'upsc',
      isUniversal: false
    },
    {
      name: 'Insights on India',
      url: 'https://www.insightsonindia.com/',
      category: 'test_series',
      description: 'Secure initiative for Mains answer writing & daily Prelims test quizzes',
      color: '#047857',
      icon: '📝',
      notes: 'Practice daily Mains answer writing questions',
      pinned: true,
      targetCategory: 'upsc',
      isUniversal: false
    },
    {
      name: 'Vision IAS',
      url: 'https://www.visionias.in/',
      category: 'test_series',
      description: 'All India Prelims test series & PT 365 monthly current affairs magazines',
      color: '#1D4ED8',
      icon: '🎯',
      loginHint: 'Vision Student Login',
      notes: 'Solve monthly current affairs and Abhyaas test series',
      pinned: false,
      targetCategory: 'upsc',
      isUniversal: false
    },
    {
      name: 'PIB India (Gov.in)',
      url: 'https://pib.gov.in/',
      category: 'reference',
      description: 'Press Information Bureau: official Government of India press releases & policies',
      color: '#0F766E',
      icon: '🇮🇳',
      notes: 'Authentic source for government schemes and ministry announcements',
      pinned: false,
      targetCategory: 'upsc',
      isUniversal: false
    },
    {
      name: 'PRS Legislative Research',
      url: 'https://prsindia.org/',
      category: 'reference',
      description: 'Comprehensive tracking of Parliament bills, acts and policy research',
      color: '#7C2D12',
      icon: '🏛️',
      notes: 'In-depth analysis of newly tabled bills and constitutional amendments',
      pinned: false,
      targetCategory: 'upsc',
      isUniversal: false
    }
  ],

  railway: [
    {
      name: 'Testbook Railway Pass',
      url: 'https://testbook.com/railways-exams',
      category: 'test_series',
      description: 'RRB NTPC, Group D & ALP CBT mocks and previous year questions',
      color: '#0284C7',
      icon: '🚆',
      loginHint: 'Testbook Login',
      notes: 'Timed CBT 1 & CBT 2 test papers with speed percentile',
      pinned: true,
      targetCategory: 'railway',
      isUniversal: false
    },
    {
      name: 'TopRankers Railway',
      url: 'https://www.toprankers.com/railway-exams',
      category: 'course',
      description: 'Specialized CBT preparation, basic science and engineering batches',
      color: '#EA580C',
      icon: '⚡',
      notes: 'Science & technical trade theory live lectures',
      pinned: false,
      targetCategory: 'railway',
      isUniversal: false
    },
    {
      name: 'Indian Railways Official Portal',
      url: 'https://indianrailways.gov.in/',
      category: 'reference',
      description: 'Official railway recruitment board notifications and timetables',
      color: '#1E3A8A',
      icon: '🏛️',
      notes: 'Official RRB board notices and application status',
      pinned: false,
      targetCategory: 'railway',
      isUniversal: false
    }
  ],

  defence: [
    {
      name: 'SSBCrack',
      url: 'https://ssbcrackexams.com/',
      category: 'course',
      description: 'NDA, CDS, AFCAT and SSB Interview 5-day psychological testing preparation',
      color: '#15803D',
      icon: '🛡️',
      loginHint: 'SSBCrack Student ID',
      notes: 'OIR tests, PPDT practice and GTO ground task explanations',
      pinned: true,
      targetCategory: 'defence',
      isUniversal: false
    },
    {
      name: 'Major Kalshi Classes',
      url: 'https://majorkalshiclasses.com/',
      category: 'course',
      description: 'Defence written exam video batches and physical fitness guides',
      color: '#B91C1C',
      icon: '🎖️',
      notes: 'NDA Math & General Ability video sessions',
      pinned: false,
      targetCategory: 'defence',
      isUniversal: false
    }
  ],

  general: [
    {
      name: 'Google Drive Study Vault',
      url: 'https://drive.google.com/',
      category: 'reference',
      description: 'Cloud backup for class notes, handwritten summaries and study PDFs',
      color: '#34A853',
      icon: '📁',
      notes: 'Store important study materials and syllabus tracking sheets',
      pinned: false,
      targetCategory: 'general',
      isUniversal: true
    },
    {
      name: 'Notion Study Workspace',
      url: 'https://www.notion.so/',
      category: 'reference',
      description: 'Personal study notes, revision tracker and formula database',
      color: '#11120F',
      icon: '📓',
      notes: 'Document personal formulas, quick notes and error analysis',
      pinned: false,
      targetCategory: 'general',
      isUniversal: true
    }
  ]
};
