import React, { useState, useMemo, useCallback } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  Search,
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  Plus,
  Trash2,
  Brain,
  Zap,
  BookOpen,
  Activity,
  Lightbulb,
  Clock,
  Filter,
  Bot,
  Send,
  X,
  Share2
} from 'lucide-react';
import { soundManager } from '../../utils/soundEffects';
import { haptics } from '../../utils/haptics';
import { SectionBadgeIcon } from '../common/SectionBadgeIcon';

export type PromptCategory =
  | 'all'
  | 'concept'
  | 'maths'
  | 'english'
  | 'mocks'
  | 'memory'
  | 'strategy'
  | 'saved';

export interface StudyPrompt {
  id: string;
  title: string;
  description: string;
  category: 'concept' | 'maths' | 'english' | 'mocks' | 'memory' | 'strategy';
  examTarget: string; // e.g. "SSC CGL / CHSL", "UPSC / State PCS", "All Exams"
  bestModel: 'Google Gemini' | 'ChatGPT' | 'Claude 3.5' | 'Any Model';
  template: string;
  defaultVariables: Record<string, string>;
  isCustom?: boolean;
}

const INITIAL_PROMPTS: StudyPrompt[] = [
  // ─── CATEGORY 1: CONCEPT MASTERY & DEEP LEARNING ───
  {
    id: 'prompt-feynman',
    title: 'Feynman Technique: Explain to a 12-Year-Old',
    description: 'Breaks down any complex or dry exam concept using simple real-life analogies, zero jargon, and intuitive daily examples.',
    category: 'concept',
    examTarget: 'All Competitive Exams',
    bestModel: 'Google Gemini',
    template: `Act as a world-class teacher specializing in competitive exams. Explain the concept of [TOPIC] from [SUBJECT] using the Feynman Technique.

Guidelines:
1. Explain it like I am a 12-year-old student with zero background knowledge.
2. Use a relatable, visual, real-world Indian daily-life analogy.
3. Highlight the 3 core principles I must remember for [EXAM].
4. Conclude with 2 common misconceptions or traps students fall into during exams.`,
    defaultVariables: {
      TOPIC: 'Preamble of the Constitution',
      SUBJECT: 'Polity',
      EXAM: 'SSC CGL & UPSC'
    }
  },
  {
    id: 'prompt-socratic-viva',
    title: 'The Strict Socratic Examiner (Oral Viva & Doubt Drill)',
    description: 'AI acts as a senior UPSC/SSC interview board member testing your depth with 1 question at a time and evaluating gaps.',
    category: 'concept',
    examTarget: 'UPSC / SSC / State PCS',
    bestModel: 'Claude 3.5',
    template: `Act as a strict and highly knowledgeable exam examiner for [EXAM]. Your goal is to test my mastery of [TOPIC].

Rules of our conversation:
1. Ask me only ONE thought-provoking, conceptual question at a time. Do NOT give me the answer.
2. Wait for my response.
3. When I reply, rate my answer on a scale of 1 to 10.
4. Point out exactly what I missed or where my understanding is shallow.
5. Then ask the next, slightly harder follow-up question.
6. Start by introducing the drill and asking the first question now.`,
    defaultVariables: {
      TOPIC: 'Judicial Review vs Judicial Activism',
      EXAM: 'UPSC CSE & State PCS'
    }
  },
  {
    id: 'prompt-counter-intuitive-traps',
    title: 'Counter-Intuitive Trap Detector',
    description: 'Finds the exact points where 90% of students make negative marking mistakes due to false assumptions.',
    category: 'concept',
    examTarget: 'SSC CGL / Banking',
    bestModel: 'Google Gemini',
    template: `In competitive exams, examiners love testing exceptions and counter-intuitive facts. For the topic of [TOPIC] in [SUBJECT]:

1. List the 5 most common counter-intuitive facts or false assumptions students make.
2. For each trap, write the typical examiner trick question with 4 options, showing which option looks right but is actually WRONG.
3. Explain the golden rule to spot this trap in 5 seconds in [EXAM].`,
    defaultVariables: {
      TOPIC: 'Vice-President of India Removal & Chairman Duties',
      SUBJECT: 'Indian Polity',
      EXAM: 'SSC CGL 2026'
    }
  },
  {
    id: 'prompt-first-principles',
    title: 'First Principles Derivation & Law Genesis',
    description: 'Explains why a law/formula was invented, what fundamental problem it solves, and how to derive it in 30 seconds.',
    category: 'concept',
    examTarget: 'All Exams',
    bestModel: 'ChatGPT',
    template: `Explain [FORMULA_OR_CONCEPT] from first principles.

1. What fundamental human or mathematical problem led to the invention of this concept?
2. Step-by-step logical derivation without skipping intuitive steps.
3. What happens if the primary condition fails? (Boundary cases).
4. A 10-second mental visualization shortcut for exam conditions.`,
    defaultVariables: {
      FORMULA_OR_CONCEPT: 'Compound Interest vs Simple Interest (Effective Rate Method)'
    }
  },

  // ─── CATEGORY 2: MATHS, CALCULATIONS & SPEED TRICKS ───
  {
    id: 'prompt-maths-speed-solver',
    title: 'Dual-Method Solver: Standard vs 10-Sec Shortcut',
    description: 'Solves any arithmetic or algebra question via basic method and then provides the 10-second SSC elimination trick.',
    category: 'maths',
    examTarget: 'SSC CGL / CHSL / Railways',
    bestModel: 'Google Gemini',
    template: `I want to solve the following Maths question for [EXAM]:

Question: "[QUESTION_TEXT]"

Please provide:
1. Method 1 (Basic Conceptual Approach): Step-by-step textbook method with clean algebraic steps.
2. Method 2 (SSC Speed Hack / Shortcut): Can this be solved in under 15 seconds using:
   - Digital Sum / Unit Digit method?
   - Ratio / Percentage proportionality?
   - Option elimination / Smart value substitution (e.g. θ = 45° or x = 0)?
3. Key takeaway formula to note down in my formula diary.`,
    defaultVariables: {
      EXAM: 'SSC CGL Tier-1',
      QUESTION_TEXT: 'A sum of money doubles itself in 4 years at compound interest. In how many years will it become 8 times itself?'
    }
  },
  {
    id: 'prompt-maths-formula-sheet',
    title: 'Ultra-Dense 1-Page Formula & Trap Matrix',
    description: 'Extracts every essential formula, failure condition, and Pyq shortcut for a complete mathematics chapter.',
    category: 'maths',
    examTarget: 'SSC CGL / CPO / CDS',
    bestModel: 'Google Gemini',
    template: `Generate an ultra-dense, comprehensive revision formula sheet for the chapter [CHAPTER] for [EXAM].

Organize the output into a markdown table with 4 columns:
1. Formula Name & Identity
2. Mathematical Formula (LaTeX format)
3. Direct Shortcut / Ratio Trick
4. "Beware Trap": When does this formula NOT apply or when do students make sign errors?

Include all standard cases and the top 3 most repeated theorem types from last 5 years' papers.`,
    defaultVariables: {
      CHAPTER: 'Trigonometry & Heights and Distances',
      EXAM: 'SSC CGL'
    }
  },
  {
    id: 'prompt-word-problem-decoder',
    title: 'Arithmetic Word Problem Dissector',
    description: 'Translates confusing multi-sentence arithmetic word problems into a crystal-clear 2-step ratio equation.',
    category: 'maths',
    examTarget: 'Banking / SSC / State Exams',
    bestModel: 'ChatGPT',
    template: `Dissect this arithmetic word problem:
"[PROBLEM_TEXT]"

Breakdown:
1. Translate English sentences into raw mathematical proportions.
2. Identify the fixed constant (e.g. Distance is constant, Total Work is constant, or Age difference is constant).
3. Set up the fastest ratio equation.
4. Solve and state the final answer with units clearly.`,
    defaultVariables: {
      PROBLEM_TEXT: 'Two trains running in opposite directions cross a man standing on the platform in 27 seconds and 17 seconds respectively and they cross each other in 23 seconds. The ratio of their speeds is?'
    }
  },

  // ─── CATEGORY 3: ENGLISH COMPREHENSION, VOCAB & GRAMMAR ───
  {
    id: 'prompt-root-word-multiplier',
    title: 'Root Word Etymology Multiplier (1 Root = 10 Words)',
    description: 'Teaches a Latin/Greek root word and derives 8-10 high-frequency exam words with funny desi memory hooks.',
    category: 'english',
    examTarget: 'SSC CGL / Bank PO / NDA',
    bestModel: 'Google Gemini',
    template: `Analyze the root word "[ROOT_WORD]".

1. Origin & Core Meaning (Latin/Greek/Sanskrit).
2. 8 high-frequency vocabulary words in [EXAM] containing this root word.
3. For each word:
   - Part of speech & precise meaning
   - A memorable Hindi-English memory hook / desi mnemonic trick
   - An illustrative sentence suitable for SSC/Bank Cloze Tests
   - 2 exact synonyms & 2 antonyms`,
    defaultVariables: {
      ROOT_WORD: 'BEN / BENE (Good, Well)',
      EXAM: 'SSC CGL & CHSL'
    }
  },
  {
    id: 'prompt-grammar-rule-doctor',
    title: 'Error Spotting Grammar Rule Doctor',
    description: 'Explains complex English grammar rules with 5 high-difficulty error spotting questions from recent exams.',
    category: 'english',
    examTarget: 'SSC / Banking / CDS',
    bestModel: 'Claude 3.5',
    template: `Act as a master English language faculty for [EXAM].

Topic: [GRAMMAR_TOPIC]

1. Explain the underlying grammatical rule in 3 bullet points with crystal clarity.
2. Provide 5 realistic "Spotting the Error" sentences based on this rule:
   - 3 sentences where the error is subtle and difficult to spot.
   - 2 sentences that LOOK wrong but are actually grammatically CORRECT (no error traps).
3. Provide the step-by-step correction and rationale for each.`,
    defaultVariables: {
      GRAMMAR_TOPIC: 'Subject-Verb Inversion with Negative Adverbs (Hardly, Scarcely, Seldom, Little)',
      EXAM: 'SSC CGL Tier-2'
    }
  },
  {
    id: 'prompt-reading-comprehension-maker',
    title: 'The Hindu Style RC Passage & Inference Drill',
    description: 'Generates a 250-word editorial passage with 3 inferential, tone-based, and central-idea MCQs.',
    category: 'english',
    examTarget: 'Bank PO / SSC CGL Tier-2 / CAT',
    bestModel: 'Claude 3.5',
    template: `Create a high-quality 250-word Reading Comprehension passage on the theme of [THEME], matching the prose style and vocabulary of The Hindu or The Indian Express editorial page.

After the passage, provide 3 challenging questions:
1. Question 1: What is the primary tone / central thesis of the author? (4 options)
2. Question 2: Inferential Question (cannot be answered by direct keyword matching). (4 options)
3. Question 3: Contextual vocabulary question testing a nuanced word from the passage. (4 options)

Include answer keys with comprehensive rationale for why the other 3 options are incorrect.`,
    defaultVariables: {
      THEME: 'Artificial Intelligence Regulation and Global Tech Sovereignty'
    }
  },

  // ─── CATEGORY 4: MOCK TEST DIAGNOSTICS & ERROR ANALYSIS ───
  {
    id: 'prompt-mock-autopsy',
    title: 'Post-Mock Diagnostic Autopsy & 7-Day Prescription',
    description: 'Analyzes your mock test scores, negative marking, and timing bottlenecks to generate a high-yield recovery roadmap.',
    category: 'mocks',
    examTarget: 'All Mock Test Takers',
    bestModel: 'Google Gemini',
    template: `Act as a senior exam mentor. Here is my diagnostic breakdown from my recent mock test for [EXAM]:

- Overall Score: [OVERALL_SCORE]
- Section Scores:
  * Quantitative Aptitude: [MATHS_SCORE] (Accuracy: [MATHS_ACCURACY])
  * General Intelligence & Reasoning: [REASONING_SCORE]
  * English Comprehension: [ENGLISH_SCORE]
  * General Awareness: [GA_SCORE]
- Key Problem: [CHIEF_COMPLAINT]

Please provide:
1. Root Cause Diagnosis: Why did my score plateau?
2. Negative Marking Audit: 3 concrete rules to stop silly mistakes in my next mock.
3. 7-Day Tactical Study Prescription: Exactly which 3 chapters I must revise this week to gain +15 marks.
4. Time Allocation Plan: Optimal minute-by-minute strategy for the 60-minute test.`,
    defaultVariables: {
      EXAM: 'SSC CGL 2026 Tier-1',
      OVERALL_SCORE: '118 / 200',
      MATHS_SCORE: '32 / 50',
      MATHS_ACCURACY: '72%',
      REASONING_SCORE: '42 / 50',
      ENGLISH_SCORE: '36 / 50',
      GA_SCORE: '8 / 50',
      CHIEF_COMPLAINT: 'Ran out of time in Maths; lost 14 marks in GA due to random guesswork.'
    }
  },
  {
    id: 'prompt-skip-or-attempt-framework',
    title: 'The 50-50 Guesswork & Question Skipping Matrix',
    description: 'Builds a mathematical framework on when to attempt a 50-50 question vs when to skip it to maximize net score.',
    category: 'mocks',
    examTarget: 'Exams with 0.50 or 0.25 Negative Marking',
    bestModel: 'ChatGPT',
    template: `For [EXAM] with [NEGATIVE_MARKING_RATIO] negative marking:

1. Calculate the statistical expected value (EV) of guessing between 2 eliminated options vs skipping.
2. Outline the "3-Second Decision Matrix" to decide whether to attempt, mark for review, or instantly skip a question.
3. What are the 3 emotional biases that cause students to over-attempt and lose marks?
4. Write 3 affirmations to build the psychological discipline of skipping time-trap questions.`,
    defaultVariables: {
      EXAM: 'SSC CGL (2 marks correct, -0.50 wrong)',
      NEGATIVE_MARKING_RATIO: '1/4th negative marking (-0.50 per 2 marks)'
    }
  },

  // ─── CATEGORY 5: MEMORY, MNEMONICS & ACTIVE RECALL ───
  {
    id: 'prompt-desi-mnemonic',
    title: 'Desi Mnemonic (Funny Hindi-English Memory Hook)',
    description: 'Creates hilarious, unforgettable Hindi-English memory hooks to memorize dry lists, dates, and constitutional articles.',
    category: 'memory',
    examTarget: 'Polity / History / Geography / Science',
    bestModel: 'Google Gemini',
    template: `I need to memorize the following facts for [EXAM]:
"[FACTS_LIST]"

Create:
1. A hilarious, catchy, unforgettable Hindi-English (Hinglish) mnemonic acronym or short story trick.
2. A visual absurd scene that my brain can imagine in 2 seconds.
3. A 2-line rhyming couplet (shayari style or Bollywood dialogue style) that permanently cements the order in memory.`,
    defaultVariables: {
      EXAM: 'SSC CGL & State PCS',
      FACTS_LIST: '6 Bicameral States of India: Andhra Pradesh, Bihar, Karnataka, Maharashtra, Telangana, Uttar Pradesh'
    }
  },
  {
    id: 'prompt-anki-flashcards-extractor',
    title: 'Active Recall Flashcard Extractor (Anki/Spaced Style)',
    description: 'Converts raw study notes into 10 high-impact question-answer flashcard pairs with zero passive recognition fluff.',
    category: 'memory',
    examTarget: 'Active Recall Study',
    bestModel: 'Claude 3.5',
    template: `Convert the following study notes into 10 active recall flashcard pairs for [EXAM]:

Notes:
"[PASTE_NOTES]"

Format each flashcard as:
---
Front (Trigger Question): [A concise, unambiguous prompt that forces memory retrieval]
Back (Active Answer): [Short 1-2 line punchy answer with the exact keyword in bold + 1 trap warning]
---

Rules:
- Do NOT use true/false or yes/no questions.
- Focus strictly on numbers, constitutional articles, scientific units, or cause-and-effect relationships.`,
    defaultVariables: {
      EXAM: 'SSC CGL',
      PASTE_NOTES: 'Governor holds office during the pleasure of President (Article 156). Normal tenure is 5 years. Minimum age is 35 years. Oath is administered by Chief Justice of High Court (Article 159). Governor cannot pardon death sentence (Article 161).'
    }
  },
  {
    id: 'prompt-chronology-timeline-builder',
    title: 'Historical Chronology & Governor-General Linker',
    description: 'Arranges historical events in chronological order with exact dates, Governor-General in power, and exam relevance.',
    category: 'memory',
    examTarget: 'Modern Indian History',
    bestModel: 'Google Gemini',
    template: `Arrange the following historical events in strict chronological order for [EXAM]:
[EVENTS_LIST]

For each event:
1. Exact year and month
2. Governor-General / Viceroy of India at the time
3. One key treaty, commission, or slogan associated with it
4. One-sentence memory trick to remember its placement relative to the preceding event.`,
    defaultVariables: {
      EXAM: 'SSC CGL Modern History',
      EVENTS_LIST: 'Rowlatt Act, Jallianwala Bagh, Non-Cooperation Movement, Chauri Chaura incident, Simon Commission, Swaraj Party formation'
    }
  },

  // ─── CATEGORY 6: EXAM STRATEGY, ROUTINE & TIME MANAGEMENT ───
  {
    id: 'prompt-last-30-days-routine',
    title: 'War Room 30-Day Routine & Triage Protocol',
    description: 'Designs an intense, realistic daily timetable with 3 balanced blocks (Weak topics, Mock test, Spaced revision).',
    category: 'strategy',
    examTarget: 'Final Revision Sprint',
    bestModel: 'ChatGPT',
    template: `I have exactly [DAYS_LEFT] days left before [EXAM].
- Current preparation status: [PREPARATION_STATUS]
- Target score: [TARGET_SCORE]
- Weakest subject: [WEAKEST_SUBJECT]
- Strongest subject: [STRONGEST_SUBJECT]

Design a battle-tested daily study plan:
1. Split my day into 3 distinct study blocks:
   - Block 1 (High Energy Morning): Core topic mastery
   - Block 2 (Afternoon): Mock test or high-speed practice
   - Block 3 (Evening): Spaced repetition & error notebook review
2. Weekly mock test schedule (how many mocks per week and when to analyze them).
3. "What to STOP doing": 3 low-yield activities I must immediately abandon to save time.`,
    defaultVariables: {
      DAYS_LEFT: '45',
      EXAM: 'SSC CGL 2026',
      PREPARATION_STATUS: 'Syllabus 65% complete; scoring 115-125 in mocks.',
      TARGET_SCORE: '150+ in Tier-1',
      WEAKEST_SUBJECT: 'General Awareness (Polity & Static GK)',
      STRONGEST_SUBJECT: 'Reasoning & English'
    }
  },
  {
    id: 'prompt-pomodoro-session-planner',
    title: '2-Hour Deep Focus Sprint Structurer',
    description: 'Structures a single 2-hour study block into 4 micro-tasks with zero cognitive fatigue.',
    category: 'strategy',
    examTarget: 'Deep Work Sessions',
    bestModel: 'Any Model',
    template: `I am sitting down for a 2-hour deep focus study session on the chapter: [CHAPTER_NAME].

Structure this session into 4 specific 25-minute Pomodoro sprints with 5-minute active recovery breaks:
- Sprint 1 (25m): Theoretical concept assimilation
- Sprint 2 (25m): 15-20 textbook question drill
- Sprint 3 (25m): 10 previous year tough questions under timed pressure
- Sprint 4 (25m): Formula compilation & mistake notebook documentation

Give me clear success criteria for each sprint so I do not drift or check my phone.`,
    defaultVariables: {
      CHAPTER_NAME: 'Time, Speed and Distance (Train & Relative Speed Problems)'
    }
  }
];

const STORAGE_FAVORITES_KEY = 'syllabus3d_favorite_prompts';
const STORAGE_CUSTOM_PROMPTS_KEY = 'syllabus3d_custom_prompts';

export const StudyPromptsView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<PromptCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);

  // Favorites state
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_FAVORITES_KEY);
      return stored ? JSON.parse(stored) : ['prompt-feynman', 'prompt-maths-speed-solver'];
    } catch {
      return ['prompt-feynman', 'prompt-maths-speed-solver'];
    }
  });

  // Custom User Prompts
  const [customPrompts, setCustomPrompts] = useState<StudyPrompt[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_CUSTOM_PROMPTS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Active variable inputs state: { promptId: { varName: value } }
  const [variableOverrides, setVariableOverrides] = useState<Record<string, Record<string, string>>>({});

  // Custom Prompt Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [customDesc, setCustomDesc] = useState('');
  const [customCategory, setCustomCategory] = useState<StudyPrompt['category']>('concept');
  const [customExam, setCustomExam] = useState('All Exams');
  const [customTemplate, setCustomTemplate] = useState('');

  // Combine built-in + custom
  const allPrompts = useMemo(() => {
    return [...customPrompts, ...INITIAL_PROMPTS];
  }, [customPrompts]);

  const toggleFavorite = (id: string) => {
    haptics.light();
    soundManager.playClick();
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      try {
        localStorage.setItem(STORAGE_FAVORITES_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleVariableChange = (promptId: string, varName: string, value: string) => {
    setVariableOverrides(prev => ({
      ...prev,
      [promptId]: {
        ...(prev[promptId] || {}),
        [varName]: value
      }
    }));
  };

  const getResolvedPromptText = useCallback((prompt: StudyPrompt) => {
    let text = prompt.template;
    const overrides = variableOverrides[prompt.id] || {};
    const effectiveVars = { ...prompt.defaultVariables, ...overrides };

    Object.entries(effectiveVars).forEach(([key, val]) => {
      const regex = new RegExp(`\\[${key}\\]`, 'g');
      text = text.replace(regex, val || `[${key}]`);
    });

    return text;
  }, [variableOverrides]);

  const handleCopyPrompt = (prompt: StudyPrompt) => {
    haptics.success();
    soundManager.playSuccess();
    const resolvedText = getResolvedPromptText(prompt);

    navigator.clipboard.writeText(resolvedText);
    setCopiedPromptId(prompt.id);
    setTimeout(() => {
      setCopiedPromptId(null);
    }, 2000);
  };

  const handleOpenGemini = (prompt: StudyPrompt) => {
    haptics.medium();
    soundManager.playClick();
    const resolvedText = getResolvedPromptText(prompt);
    navigator.clipboard.writeText(resolvedText);
    window.open('https://gemini.google.com/app', '_blank', 'noopener,noreferrer');
  };

  const handleOpenChatGPT = (prompt: StudyPrompt) => {
    haptics.medium();
    soundManager.playClick();
    const resolvedText = getResolvedPromptText(prompt);
    navigator.clipboard.writeText(resolvedText);
    window.open('https://chatgpt.com/', '_blank', 'noopener,noreferrer');
  };

  const handleSaveCustomPrompt = () => {
    if (!customTitle.trim() || !customTemplate.trim()) return;
    haptics.success();
    soundManager.playSuccess();

    const newPrompt: StudyPrompt = {
      id: `custom_${Date.now()}`,
      title: customTitle.trim(),
      description: customDesc.trim() || 'Custom student-created study prompt template.',
      category: customCategory,
      examTarget: customExam.trim() || 'All Exams',
      bestModel: 'Google Gemini',
      template: customTemplate.trim(),
      defaultVariables: {},
      isCustom: true
    };

    const next = [newPrompt, ...customPrompts];
    setCustomPrompts(next);
    try {
      localStorage.setItem(STORAGE_CUSTOM_PROMPTS_KEY, JSON.stringify(next));
    } catch {}

    setCustomTitle('');
    setCustomDesc('');
    setCustomTemplate('');
    setIsAddModalOpen(false);
  };

  const handleDeleteCustomPrompt = (id: string) => {
    if (!window.confirm('Delete this custom study prompt?')) return;
    haptics.light();
    soundManager.playClick();
    const next = customPrompts.filter(p => p.id !== id);
    setCustomPrompts(next);
    try {
      localStorage.setItem(STORAGE_CUSTOM_PROMPTS_KEY, JSON.stringify(next));
    } catch {}
  };

  // Filtered list
  const filteredPrompts = useMemo(() => {
    return allPrompts.filter(p => {
      // Category filter
      if (selectedCategory === 'saved') {
        if (!favorites.includes(p.id)) return false;
      } else if (selectedCategory !== 'all') {
        if (p.category !== selectedCategory) return false;
      }

      // Search query filter
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.template.toLowerCase().includes(q) ||
        p.examTarget.toLowerCase().includes(q)
      );
    });
  }, [allPrompts, selectedCategory, searchQuery, favorites]);

  const categories = [
    { id: 'all', label: 'All Prompts', icon: Filter, count: allPrompts.length },
    { id: 'saved', label: 'Bookmarked', icon: Bookmark, count: favorites.length },
    { id: 'concept', label: 'Deep Concepts', icon: Brain, count: allPrompts.filter(p => p.category === 'concept').length },
    { id: 'maths', label: 'Maths & Speed', icon: Zap, count: allPrompts.filter(p => p.category === 'maths').length },
    { id: 'english', label: 'English & Vocab', icon: BookOpen, count: allPrompts.filter(p => p.category === 'english').length },
    { id: 'mocks', label: 'Mock Autopsy', icon: Activity, count: allPrompts.filter(p => p.category === 'mocks').length },
    { id: 'memory', label: 'Desi Mnemonics', icon: Lightbulb, count: allPrompts.filter(p => p.category === 'memory').length },
    { id: 'strategy', label: 'War Room Strategy', icon: Clock, count: allPrompts.filter(p => p.category === 'strategy').length }
  ];

  return (
    <div className="w-full space-y-6 pb-20 select-none animate-view-fade">
      {/* 🌟 1. HERO SHOWCASE BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#121422] via-[#1a1c30] to-[#0f111d] p-6 sm:p-8 border border-white/10 shadow-2xl text-white">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-purple-600/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-16 w-64 h-64 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex items-start sm:items-center gap-3">
            <SectionBadgeIcon section="study-prompts" size="lg" className="shrink-0 mt-1 sm:mt-0" showGlow />
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-bold uppercase tracking-wider mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>AI Study Prompt Studio • Battle-Tested Templates</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                Professional AI Study Prompts Library
              </h1>
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
            Supercharge your exam preparation with engineered prompts for <strong>Google Gemini, ChatGPT & Claude</strong>. Fill topic variables, copy in 1-click, or launch directly in Gemini to get instant conceptual mastery, speed shortcuts, and mock diagnostics!
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Custom Prompt</span>
            </button>

            <a
              href="https://gemini.google.com/app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-slate-200 text-xs sm:text-sm font-semibold transition"
            >
              <Bot className="w-4 h-4 text-amber-300" />
              <span>Open Google Gemini ↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* 🔍 2. SEARCH & CATEGORY SELECTOR */}
      <div className="space-y-3">
        {/* Search input */}
        <div className="relative w-full max-w-xl">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search prompts by topic (e.g. Feynman, Compound Interest, Error Spotting, Mnemonic, Mock)..."
            className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-white dark:bg-[#131522] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/40 shadow-xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  haptics.light();
                  soundManager.playClick();
                  setSelectedCategory(cat.id as PromptCategory);
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-purple-600 text-white shadow-sm shadow-purple-500/30'
                    : 'bg-white/80 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-black/5 dark:bg-white/10 text-slate-500 dark:text-slate-400'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 📚 3. PROMPT CARDS GRID */}
      {filteredPrompts.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-[#131522] rounded-3xl border border-dashed border-slate-300 dark:border-white/10 space-y-3">
          <Bot className="w-12 h-12 text-slate-400 mx-auto opacity-50" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No prompts found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try searching for another keyword or switch category filter to view all study prompts.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filteredPrompts.map((prompt) => {
            const isFav = favorites.includes(prompt.id);
            const isCopied = copiedPromptId === prompt.id;
            const variables = prompt.defaultVariables || {};
            const hasVariables = Object.keys(variables).length > 0;
            const currentOverrides = variableOverrides[prompt.id] || {};
            const resolvedText = getResolvedPromptText(prompt);

            return (
              <div
                key={prompt.id}
                className="group relative rounded-3xl bg-white dark:bg-[#131522] border border-slate-200/90 dark:border-white/10 p-5 sm:p-6 shadow-xs hover:shadow-xl hover:border-purple-500/40 transition-all flex flex-col justify-between space-y-4"
              >
                {/* Header Row */}
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                          {prompt.category.toUpperCase()}
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400">
                          🎯 {prompt.examTarget}
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                          ✨ {prompt.bestModel}
                        </span>
                        {prompt.isCustom && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                            Custom Prompt
                          </span>
                        )}
                      </div>

                      <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {prompt.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => toggleFavorite(prompt.id)}
                        className={`p-2 rounded-xl transition ${
                          isFav
                            ? 'text-amber-500 bg-amber-500/10'
                            : 'text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                        }`}
                        title={isFav ? 'Remove bookmark' : 'Bookmark this prompt'}
                      >
                        {isFav ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                      </button>

                      {prompt.isCustom && (
                        <button
                          type="button"
                          onClick={() => handleDeleteCustomPrompt(prompt.id)}
                          className="p-2 rounded-xl text-rose-500 hover:bg-rose-500/10 transition"
                          title="Delete custom prompt"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    {prompt.description}
                  </p>
                </div>

                {/* Variable Customizer Fields */}
                {hasVariables && (
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-purple-500" />
                      <span>Customize Your Topic Variables:</span>
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {Object.entries(variables).map(([key, defaultVal]) => {
                        const currentVal = currentOverrides[key] ?? defaultVal;
                        return (
                          <div key={key} className="space-y-1">
                            <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-tight block truncate">
                              [{key}]
                            </label>
                            <input
                              type="text"
                              value={currentVal}
                              onChange={(e) => handleVariableChange(prompt.id, key, e.target.value)}
                              placeholder={defaultVal}
                              className="w-full px-2.5 py-1.5 rounded-xl bg-white dark:bg-[#0c0e17] border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-purple-500"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Prompt Preview Block */}
                <div className="relative rounded-2xl bg-slate-900 text-slate-100 p-3.5 font-mono text-xs leading-relaxed max-h-36 overflow-y-auto scrollbar-thin border border-slate-800">
                  <pre className="whitespace-pre-wrap font-sans text-xs text-slate-300">
                    {resolvedText}
                  </pre>
                </div>

                {/* Footer Action Bar */}
                <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100 dark:border-white/5">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopyPrompt(prompt)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer ${
                        isCopied
                          ? 'bg-emerald-600 text-white'
                          : 'bg-purple-600 hover:bg-purple-700 text-white shadow-xs shadow-purple-500/25'
                      }`}
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopied ? 'Copied Prompt!' : 'Copy Prompt'}</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleOpenGemini(prompt)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-amber-500/15 border border-slate-200 dark:border-white/10 text-[11px] font-bold text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-300 transition"
                      title="Copy prompt & open Google Gemini"
                    >
                      <span>Gemini</span>
                      <ExternalLink className="w-3 h-3 opacity-70" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenChatGPT(prompt)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-emerald-500/15 border border-slate-200 dark:border-white/10 text-[11px] font-bold text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-300 transition"
                      title="Copy prompt & open ChatGPT"
                    >
                      <span>ChatGPT</span>
                      <ExternalLink className="w-3 h-3 opacity-70" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ➕ 4. CREATE CUSTOM PROMPT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-[#131522] border border-slate-200 dark:border-white/15 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-black text-slate-900 dark:text-white">Create Custom Study Prompt</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Prompt Title *
                </label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="e.g. Current Affairs Monthly Summary Extractor"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Category
                  </label>
                  <select
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value as StudyPrompt['category'])}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option value="concept">Deep Concepts</option>
                    <option value="maths">Maths & Speed</option>
                    <option value="english">English & Vocab</option>
                    <option value="mocks">Mock Autopsy</option>
                    <option value="memory">Desi Mnemonics</option>
                    <option value="strategy">War Room Strategy</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Target Exam
                  </label>
                  <input
                    type="text"
                    value={customExam}
                    onChange={(e) => setCustomExam(e.target.value)}
                    placeholder="e.g. SSC CGL / All Exams"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Description / Purpose
                </label>
                <input
                  type="text"
                  value={customDesc}
                  onChange={(e) => setCustomDesc(e.target.value)}
                  placeholder="What does this prompt do and when should students use it?"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Full AI Prompt Template * (Use [VARIABLES] for dynamic fields)
                </label>
                <textarea
                  rows={6}
                  value={customTemplate}
                  onChange={(e) => setCustomTemplate(e.target.value)}
                  placeholder="Act as a mentor. Explain [TOPIC] with 3 exam traps..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200 dark:border-white/10">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveCustomPrompt}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md"
              >
                Save Prompt to My Library
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyPromptsView;
