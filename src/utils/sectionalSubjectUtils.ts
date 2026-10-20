import { MockTest, SectionName, SubjectDefinition } from '../types/mockTracker';

export interface SubjectMeta {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  bgLight: string;
  bgDark: string;
  textColorLight: string;
  textColorDark: string;
  borderColorLight: string;
  borderColorDark: string;
  accentHex: string;
}

export interface SubjectTabItem {
  id: string;
  label: string;
  shortLabel: string;
  icon: string;
  count: number;
  meta: SubjectMeta;
}

/**
 * Returns metadata, icon, and colors for any subject (preset or custom)
 */
export function getSubjectMeta(subjectName: string): SubjectMeta {
  const norm = (subjectName || '').toLowerCase().trim();

  // 1. Quantitative Aptitude / Mathematics
  if (
    norm.includes('quant') ||
    norm.includes('math') ||
    norm.includes('numerical') ||
    norm.includes('arithmetic') ||
    norm.includes('algebra')
  ) {
    return {
      id: subjectName,
      name: subjectName,
      shortName: 'Quant',
      icon: '📐',
      bgLight: 'bg-sky-50',
      bgDark: 'dark:bg-sky/15',
      textColorLight: 'text-sky-800',
      textColorDark: 'dark:text-sky',
      borderColorLight: 'border-sky-300',
      borderColorDark: 'dark:border-sky/30',
      accentHex: '#38BDF8'
    };
  }

  // 2. Reasoning & Intelligence
  if (
    norm.includes('reason') ||
    norm.includes('intelligence') ||
    norm.includes('logic') ||
    norm.includes('mental ability')
  ) {
    return {
      id: subjectName,
      name: subjectName,
      shortName: 'Reasoning',
      icon: '🧠',
      bgLight: 'bg-emerald-50',
      bgDark: 'dark:bg-mint/15',
      textColorLight: 'text-emerald-800',
      textColorDark: 'dark:text-mint',
      borderColorLight: 'border-emerald-300',
      borderColorDark: 'dark:border-mint/30',
      accentHex: '#34D399'
    };
  }

  // 3. English Comprehension / Language
  if (
    norm.includes('english') ||
    norm.includes('comprehension') ||
    norm.includes('verbal') ||
    norm.includes('vocab')
  ) {
    return {
      id: subjectName,
      name: subjectName,
      shortName: 'English',
      icon: '📖',
      bgLight: 'bg-purple-50',
      bgDark: 'dark:bg-lavender/15',
      textColorLight: 'text-purple-800',
      textColorDark: 'dark:text-lavender',
      borderColorLight: 'border-purple-300',
      borderColorDark: 'dark:border-lavender/30',
      accentHex: '#A78BFA'
    };
  }

  // 4. General Awareness / GK / GS
  if (
    norm.includes('awareness') ||
    norm.includes('gk') ||
    norm.includes('gs') ||
    norm.includes('general studies') ||
    norm.includes('current affair')
  ) {
    return {
      id: subjectName,
      name: subjectName,
      shortName: 'GA / GK',
      icon: '🌍',
      bgLight: 'bg-amber-50',
      bgDark: 'dark:bg-amberAccent/15',
      textColorLight: 'text-amber-800',
      textColorDark: 'dark:text-amberAccent',
      borderColorLight: 'border-amber-300',
      borderColorDark: 'dark:border-amberAccent/30',
      accentHex: '#FBBF24'
    };
  }

  // 5. General Science (Railways, NDA, CDS)
  if (
    norm.includes('science') ||
    norm.includes('physics') ||
    norm.includes('chem') ||
    norm.includes('bio')
  ) {
    return {
      id: subjectName,
      name: subjectName,
      shortName: 'Gen Science',
      icon: '🔬',
      bgLight: 'bg-teal-50',
      bgDark: 'dark:bg-teal-500/15',
      textColorLight: 'text-teal-800',
      textColorDark: 'dark:text-teal-300',
      borderColorLight: 'border-teal-300',
      borderColorDark: 'dark:border-teal-500/30',
      accentHex: '#2DD4BF'
    };
  }

  // 6. Computer Knowledge
  if (
    norm.includes('computer') ||
    norm.includes('it aptitude') ||
    norm.includes('information tech')
  ) {
    return {
      id: subjectName,
      name: subjectName,
      shortName: 'Computer',
      icon: '💻',
      bgLight: 'bg-indigo-50',
      bgDark: 'dark:bg-indigo-500/15',
      textColorLight: 'text-indigo-800',
      textColorDark: 'dark:text-indigo-300',
      borderColorLight: 'border-indigo-300',
      borderColorDark: 'dark:border-indigo-500/30',
      accentHex: '#818CF8'
    };
  }

  // 7. Banking Awareness / Financial / Economy
  if (
    norm.includes('banking') ||
    norm.includes('financial') ||
    norm.includes('finance') ||
    norm.includes('economy') ||
    norm.includes('economic')
  ) {
    return {
      id: subjectName,
      name: subjectName,
      shortName: 'Banking & Fin',
      icon: '🏦',
      bgLight: 'bg-emerald-50',
      bgDark: 'dark:bg-emerald-500/15',
      textColorLight: 'text-emerald-800',
      textColorDark: 'dark:text-emerald-300',
      borderColorLight: 'border-emerald-300',
      borderColorDark: 'dark:border-emerald-500/30',
      accentHex: '#10B981'
    };
  }

  // 8. Data Interpretation & Analysis
  if (
    norm.includes('data interpretation') ||
    norm.includes('di') ||
    norm.includes('data analysis')
  ) {
    return {
      id: subjectName,
      name: subjectName,
      shortName: 'Data Interp (DI)',
      icon: '📊',
      bgLight: 'bg-orange-50',
      bgDark: 'dark:bg-orange-500/15',
      textColorLight: 'text-orange-800',
      textColorDark: 'dark:text-orange-300',
      borderColorLight: 'border-orange-300',
      borderColorDark: 'dark:border-orange-500/30',
      accentHex: '#FB923C'
    };
  }

  // 9. Defence GAT / General Ability
  if (norm.includes('gat') || norm.includes('general ability') || norm.includes('defence')) {
    return {
      id: subjectName,
      name: subjectName,
      shortName: 'GAT',
      icon: '🎖️',
      bgLight: 'bg-rose-50',
      bgDark: 'dark:bg-rose-500/15',
      textColorLight: 'text-rose-800',
      textColorDark: 'dark:text-rose-300',
      borderColorLight: 'border-rose-300',
      borderColorDark: 'dark:border-rose-500/30',
      accentHex: '#F43F5E'
    };
  }

  // 10. Hindi / Regional Language
  if (norm.includes('hindi')) {
    return {
      id: subjectName,
      name: subjectName,
      shortName: 'Hindi',
      icon: '🇮🇳',
      bgLight: 'bg-amber-50',
      bgDark: 'dark:bg-amber-600/15',
      textColorLight: 'text-amber-900',
      textColorDark: 'dark:text-amber-300',
      borderColorLight: 'border-amber-300',
      borderColorDark: 'dark:border-amber-600/30',
      accentHex: '#D97706'
    };
  }

  // Fallback for custom subjects
  const fallbackShort = subjectName.length > 15 ? `${subjectName.slice(0, 14)}…` : subjectName;
  return {
    id: subjectName,
    name: subjectName,
    shortName: fallbackShort || 'Subject',
    icon: '⚡',
    bgLight: 'bg-cyan-50',
    bgDark: 'dark:bg-electric-blue/15',
    textColorLight: 'text-cyan-800',
    textColorDark: 'dark:text-electric-blue',
    borderColorLight: 'border-cyan-300',
    borderColorDark: 'dark:border-electric-blue/30',
    accentHex: '#00d2ff'
  };
}

/**
 * Checks if a mock matches a selected subject filter
 */
export function isMockMatchingSubject(mock: MockTest, targetSubject: string): boolean {
  if (!targetSubject || targetSubject === 'ALL') return true;

  // 1. Direct equality on subjectName or sectionName
  if (mock.subjectName && mock.subjectName.toLowerCase() === targetSubject.toLowerCase()) {
    return true;
  }
  if (mock.sections && mock.sections.some(s => s.sectionName.toLowerCase() === targetSubject.toLowerCase())) {
    return true;
  }

  // 2. Cross-alias keyword matching for exams with different subject titles
  const targetNorm = targetSubject.toLowerCase();
  const testName = (mock.testName || '').toLowerCase();
  const mockSub = (mock.subjectName || (mock.sections && mock.sections[0]?.sectionName) || '').toLowerCase();
  const combined = `${testName} ${mockSub}`;

  if (targetNorm.includes('quant') || targetNorm.includes('math')) {
    if (combined.includes('quant') || combined.includes('math') || combined.includes('numerical') || combined.includes('arithmetic')) {
      return true;
    }
  }

  if (targetNorm.includes('reason') || targetNorm.includes('intelligence')) {
    if (combined.includes('reason') || combined.includes('intelligence') || combined.includes('logical') || combined.includes('mental ability')) {
      return true;
    }
  }

  if (targetNorm.includes('english') || targetNorm.includes('comprehension')) {
    if (combined.includes('english') || combined.includes('comprehension') || combined.includes('verbal') || combined.includes('vocab')) {
      return true;
    }
  }

  if (targetNorm.includes('awareness') || targetNorm.includes('gk') || targetNorm.includes('general studies')) {
    if (combined.includes('awareness') || combined.includes('gk') || combined.includes('gs') || combined.includes('current affairs')) {
      return true;
    }
  }

  if (targetNorm.includes('science')) {
    if (combined.includes('science') || combined.includes('physics') || combined.includes('chem') || combined.includes('bio')) {
      return true;
    }
  }

  if (targetNorm.includes('computer')) {
    if (combined.includes('computer') || combined.includes('it aptitude')) {
      return true;
    }
  }

  if (targetNorm.includes('banking') || targetNorm.includes('financial')) {
    if (combined.includes('banking') || combined.includes('financial') || combined.includes('economy')) {
      return true;
    }
  }

  if (targetNorm.includes('data interpretation') || targetNorm.includes('di')) {
    if (combined.includes('data interpretation') || combined.includes('di') || combined.includes('data analysis')) {
      return true;
    }
  }

  if (targetNorm.includes('gat') || targetNorm.includes('general ability')) {
    if (combined.includes('gat') || combined.includes('general ability')) {
      return true;
    }
  }

  // If targetSubject is part of the test name
  if (testName.includes(targetNorm)) {
    return true;
  }

  return false;
}

/**
 * Dynamically discovers all unique subjects from logged sectional mocks + active syllabus definitions
 */
export function discoverSectionalSubjects(
  sectionalMocks: MockTest[],
  availableSubjects: SubjectDefinition[] = []
): SubjectTabItem[] {
  // 1. Gather all candidates
  const subjectSet = new Set<string>();

  // From mocks
  sectionalMocks.forEach(m => {
    if (m.subjectName) subjectSet.add(m.subjectName);
    if (m.sections && m.sections.length > 0) {
      m.sections.forEach(s => subjectSet.add(s.sectionName));
    }
  });

  // From available syllabus
  availableSubjects.forEach(s => {
    if (s.name) subjectSet.add(s.name);
  });

  // Core defaults if set is sparse
  const coreDefaults = [
    'Quantitative Aptitude',
    'General Intelligence & Reasoning',
    'English Comprehension',
    'General Awareness',
    'Computer Knowledge'
  ];
  coreDefaults.forEach(def => subjectSet.add(def));

  // 2. Count mocks for each subject
  const subjectCounts: Record<string, number> = {};
  subjectSet.forEach(sub => {
    subjectCounts[sub] = sectionalMocks.filter(m => isMockMatchingSubject(m, sub)).length;
  });

  // 3. Sort: subjects with tests first (descending by count), then remaining subjects
  const sortedSubjects = Array.from(subjectSet).sort((a, b) => {
    const countA = subjectCounts[a] || 0;
    const countB = subjectCounts[b] || 0;
    if (countB !== countA) return countB - countA;
    return a.localeCompare(b);
  });

  // 4. Construct tab items
  const tabs: SubjectTabItem[] = [
    {
      id: 'ALL',
      label: 'All Subjects',
      shortLabel: 'All',
      icon: '⚡',
      count: sectionalMocks.length,
      meta: {
        id: 'ALL',
        name: 'All Subjects',
        shortName: 'All',
        icon: '⚡',
        bgLight: 'bg-slate-100',
        bgDark: 'dark:bg-white/10',
        textColorLight: 'text-slate-800',
        textColorDark: 'dark:text-white',
        borderColorLight: 'border-slate-300',
        borderColorDark: 'dark:border-white/20',
        accentHex: '#00d2ff'
      }
    },
    ...sortedSubjects.map(sub => {
      const meta = getSubjectMeta(sub);
      return {
        id: sub,
        label: sub,
        shortLabel: meta.shortName,
        icon: meta.icon,
        count: subjectCounts[sub] || 0,
        meta
      };
    })
  ];

  return tabs;
}
