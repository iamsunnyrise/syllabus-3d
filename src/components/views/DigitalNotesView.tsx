import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  NotebookPen,
  Search,
  Plus,
  Star,
  BookOpen,
  Languages,
  Sparkles,
  Clock,
  Copy,
  Check,
  Trash2,
  Edit3,
  Printer,
  X,
  ChevronDown,
  LayoutGrid,
  List,
  Filter,
  Tag,
  Share2,
  FileText,
  AlertCircle,
  Lightbulb,
  ExternalLink,
  BookMarked,
  ArrowUpDown,
  Maximize2,
  Minimize2,
  Type
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useSyllabus } from '../../context/SyllabusContext';
import { soundManager } from '../../utils/soundEffects';
import { haptics } from '../../utils/haptics';
import { Topic } from '../../types/syllabus';

export type NoteLanguage = 'hi' | 'en' | 'bilingual';
export type NoteCategory = 'concept' | 'formula' | 'revision' | 'practice';

export interface DigitalNote {
  id: string;
  title: string;
  language: NoteLanguage;
  subject: string;
  category: NoteCategory;
  tags: string[];
  content: string;
  summary?: string;
  readingTimeMinutes?: number;
  isStarred?: boolean;
  createdAt: string;
  updatedAt: string;
}

// 📚 Pre-seeded High-Yield Bilingual & Monolingual Sample Notes
const INITIAL_DIGITAL_NOTES: DigitalNote[] = [
  {
    id: 'note-polity-fr-hi',
    title: 'भारतीय संविधान: मूल अधिकार (Fundamental Rights - अनुच्छेद 12 से 35)',
    language: 'hi',
    subject: 'भारतीय राजव्यवस्था (Polity)',
    category: 'concept',
    tags: ['संविधान', 'मूल अधिकार', 'अनुच्छेद 12-35', 'UPSC/SSC'],
    summary: 'संविधान के भाग III में उल्लिखित 6 मौलिक अधिकारों और अनुच्छेद 32 के तहत संवैधानिक उपचारों का विस्तृत विवरण।',
    readingTimeMinutes: 4,
    isStarred: true,
    createdAt: '2026-09-20T10:00:00Z',
    updatedAt: '2026-09-25T14:30:00Z',
    content: `# भारतीय संविधान के मूल अधिकार (भाग III: अनुच्छेद 12 से 35)

संविधान के **भाग III** को **"भारत का मैग्ना कार्टा"** कहा जाता है। यह संयुक्त राज्य अमेरिका के संविधान (Bill of Rights) से प्रेरित है।

---

## 📌 6 मौलिक अधिकार (वर्गीकरण)

1. **समानता का अधिकार (Right to Equality)** - *अनुच्छेद 14 से 18*
   - **अनुच्छेद 14:** विधि के समक्ष समता एवं विधियों का समान संरक्षण।
   - **अनुच्छेद 15:** धर्म, मूलवंश, जाति, लिंग या जन्मस्थान के आधार पर विभेद का प्रतिषेध।
   - **अनुच्छेद 16:** लोक नियोजन के विषय में अवसर की समता।
   - **अनुच्छेद 17:** अस्पृश्यता का अंत (Abolition of Untouchability)।
   - **अनुच्छेद 18:** उपाधियों का अंत (सैन्य एवं शैक्षिक उपाधियों को छोड़कर)।

2. **स्वतंत्रता का अधिकार (Right to Freedom)** - *अनुच्छेद 19 से 22*
   - **अनुच्छेद 19:** 6 प्रकार की स्वतंत्रताओं का संरक्षण (वाक् एवं अभिव्यक्ति, शांतिपूर्ण सम्मेलन, संघ निर्माण, संचरण, निवास, व्यवसाय)।
   - **अनुच्छेद 20:** अपराधों के लिए दोषसिद्धि के संबंध में संरक्षण।
   - **अनुच्छेद 21:** प्राण एवं दैहिक स्वतंत्रता का संरक्षण (Right to Life & Personal Liberty)।
   - **अनुच्छेद 21A:** 6 से 14 वर्ष के बच्चों के लिए निःशुल्क व अनिवार्य शिक्षा (86वां संविधान संशोधन, 2002)।
   - **अनुच्छेद 22:** कुछ दशाओं में गिरफ्तारी और निरोध से संरक्षण।

3. **शोषण के विरुद्ध अधिकार (Right against Exploitation)** - *अनुच्छेद 23-24*
   - **अनुच्छेद 23:** मानव दुर्व्यापार एवं बलात् श्रम का प्रतिषेध।
   - **अनुच्छेद 24:** कारखानों आदि में बालकों के नियोजन का प्रतिषेध (14 वर्ष से कम)।

4. **धर्म की स्वतंत्रता का अधिकार (Right to Freedom of Religion)** - *अनुच्छेद 25-28*
5. **संस्कृति और शिक्षा संबंधी अधिकार** - *अनुच्छेद 29-30*
6. **संवैधानिक उपचारों का अधिकार (Right to Constitutional Remedies)** - *अनुच्छेद 32*
   - डॉ. बी.आर. आंबेडकर ने अनुच्छेद 32 को **"संविधान की आत्मा एवं हृदय"** कहा था।
   - इसके तहत सुप्रीम कोर्ट 5 प्रकार की रिट (Writs) जारी करता है:
     1. **बन्दी प्रत्यक्षीकरण (Habeas Corpus)** - "शरीर प्रस्तुत किया जाए"
     2. **परमादेश (Mandamus)** - "हम आज्ञा देते हैं"
     3. **प्रतिषेध (Prohibition)** - अधीनस्थ न्यायालय को कार्यवाही रोकने का आदेश
     4. **उत्प्रेषण (Certiorari)** - मामलों को वरिष्ठ न्यायालय भेजने का आदेश
     5. **अधिकार-पृच्छा (Quo-Warranto)** - किस अधिकार या प्राधिकार से पद ग्रहण किया`
  },
  {
    id: 'note-math-speed-en',
    title: 'Quantitative Aptitude: Time, Speed & Distance Formula Cheatsheet',
    language: 'en',
    subject: 'Quantitative Aptitude',
    category: 'formula',
    tags: ['Aptitude', 'Speed & Distance', 'Relative Speed', 'Shortcuts'],
    summary: 'Master key equations for relative speed, train crossings, average velocity, and stream currents with exam shortcuts.',
    readingTimeMinutes: 3,
    isStarred: true,
    createdAt: '2026-09-22T08:15:00Z',
    updatedAt: '2026-09-26T11:20:00Z',
    content: `# Time, Speed & Distance: Master Formula Sheet

Fundamental relation:
$$\\text{Speed} = \\frac{\\text{Distance}}{\\text{Time}} \\quad \\Longleftrightarrow \\quad \\text{Distance} = \\text{Speed} \\times \\text{Time}$$

---

## ⚡ 1. Unit Conversions (Instant Shortcuts)
- **km/h to m/s:** Multiply by $\\frac{5}{18}$
  - Example: $72\\text{ km/h} = 72 \\times \\frac{5}{18} = 20\\text{ m/s}$
- **m/s to km/h:** Multiply by $\\frac{18}{5}$
  - Example: $25\\text{ m/s} = 25 \\times \\frac{18}{5} = 90\\text{ km/h}$

---

## 🚀 2. Average Speed (Harmonic Mean)
When distance traveled in both halves is equal:
$$\\text{Average Speed} = \\frac{2xy}{x + y}$$
*(where $x$ is speed while going and $y$ is speed while returning)*

*Trap Alert:* Never take simple arithmetic mean $\\frac{x+y}{2}$ unless time intervals are identical!

---

## 🚆 3. Relative Speed Principles
- **Opposite Direction (Towards or Away from each other):**
  $$\\text{Relative Speed} = u + v$$
- **Same Direction (Chase Scenario):**
  $$\\text{Relative Speed} = |u - v|$$

---

## 🚢 4. Boats and Streams Formulas
Let Speed of Boat in Still Water = $B\\text{ km/h}$
Let Speed of Water Current / Stream = $S\\text{ km/h}$

- **Downstream Speed ($D$):** $D = B + S$
- **Upstream Speed ($U$):** $U = B - S$
- **Speed of Boat in Still Water ($B$):** $B = \\frac{D + U}{2}$
- **Speed of Current ($S$):** $S = \\frac{D - U}{2}$`
  },
  {
    id: 'note-env-ecology-bi',
    title: 'Ecology & Environment: Trophic Levels & Biodiversity (पारिस्थितिकी एवं जैव विविधता)',
    language: 'bilingual',
    subject: 'Environment & Ecology',
    category: 'concept',
    tags: ['Ecology', 'पारिस्थितिकी', 'Food Web', 'जैव विविधता', 'Bilingual'],
    summary: 'Bilingual comparative breakdown of food chains, trophic cascades, and ecological pyramids in Hindi and English.',
    readingTimeMinutes: 5,
    isStarred: false,
    createdAt: '2026-09-23T11:45:00Z',
    updatedAt: '2026-09-26T16:00:00Z',
    content: `# Ecology & Environment (पर्यावरण एवं पारिस्थितिकी)
*Dual-Language High Yield Notes (द्विभाषी अध्ययन सामग्री)*

---

## 🌿 1. Key Terminology (प्रमुख पारिभाषिक शब्दावली)

| English Term | हिन्दी अनुवाद | Definition / मुख्य तथ्य |
|---|---|---|
| **Ecosystem** | पारिस्थितिकी तंत्र | जैविक (Biotic) व अजैविक (Abiotic) घटकों की अंतर्क्रिया। |
| **Producers (Autotrophs)** | प्राथमिक उत्पादक | हरे पौधे जो प्रकाश संश्लेषण (Photosynthesis) द्वारा भोजन बनाते हैं। |
| **Primary Consumers** | प्राथमिक उपभोक्ता | शाकाहारी जीव (Herbivores) जैसे हिरण, खरगोश, टिड्डा। |
| **Secondary Consumers** | द्वितीयक उपभोक्ता | मांसाहारी जीव (Carnivores) जो शाकाहारियों का भक्षण करते हैं। |
| **Decomposers** | अपघटक (कवक/जीवाणु) | मृत कार्बनिक पदार्थों को सरल खनिजों में विखंडित करते हैं। |

---

## 🔋 2. Lindeman's 10% Energy Rule (लिंडेमान का 10% ऊर्जा नियम)
- **Concept:** Only approximately **10% of the energy** is transferred from one trophic level to the next higher trophic level. The remaining 90% is lost as metabolic heat or respiration.
- **हिन्दी:** एक पोषण स्तर (Trophic Level) से अगले पोषण स्तर तक केवल **10% ऊर्जा** का ही स्थानांतरण होता है। शेष 90% ऊर्जा श्वसन एवं जैविक क्रियाओं में व्यय हो जाती है।

---

## 📐 3. Ecological Pyramids (पारिस्थितिक पिरामिड)
1. **Pyramid of Energy (ऊर्जा का पिरामिड):**
   - **Always Upright (सदैव सीधा):** In all ecosystems without exception.
2. **Pyramid of Biomass in Aquatic Ecosystems (जलीय तंत्र में जैवभार का पिरामिड):**
   - **Inverted (उल्टा):** Phytoplankton biomass is smaller than zooplankton and fishes at any given instant.`
  },
  {
    id: 'note-history-1857-hi',
    title: 'आधुनिक भारत का इतिहास: 1857 की क्रांति के प्रमुख केंद्र, नेतृत्वकर्ता एवं दमनकर्ता',
    language: 'hi',
    subject: 'इतिहास (Modern History)',
    category: 'revision',
    tags: ['इतिहास', '1857 क्रांति', 'झांसी', 'तात्या टोपे', 'कुंवर सिंह'],
    summary: '1857 के प्रथम स्वतंत्रता संग्राम के सभी प्रमुख शहरों के विद्रोही नेता और ब्रिटिश सैन्य अधिकारियों की त्वरित रिवीज़न तालिका।',
    readingTimeMinutes: 3,
    isStarred: false,
    createdAt: '2026-09-21T14:20:00Z',
    updatedAt: '2026-09-24T09:10:00Z',
    content: `# 1857 का प्रथम स्वतंत्रता संग्राम: प्रमुख केंद्र एवं नेतृत्व

1857 की क्रांति का प्रारंभ **10 मई 1857** को **मेरठ** से हुआ था। इस समय भारत का गवर्नर जनरल **लॉर्ड कैनिंग** तथा ब्रिटिश प्रधानमंत्री **पामर्स्टन** थे।

---

## 🏛️ प्रमुख केंद्र एवं नेतृत्वकर्ता तालिका

| केंद्र (Center) | भारतीय नेतृत्वकर्ता (Indian Leader) | ब्रिटिश दमनकर्ता (British Officer) |
|---|---|---|
| **दिल्ली (Delhi)** | बहादुर शाह ज़फ़र एवं जनरल बख्त खान | जॉन निकोलसन, हडसन |
| **कानपुर (Kanpur)** | नाना साहेब (धोंधू पंत) एवं तात्या टोपे | कॉलिन कैंपबेल |
| **लखनऊ (Lucknow)** | बेगम हज़रत महल एवं बृजिस कादिर | कॉलिन कैंपबेल, हेनरी लॉरेंस |
| **झांसी (Jhansi)** | रानी लक्ष्मीबाई (मणिकर्णिका) | सर ह्यू रोज (Sir Hugh Rose) |
| **ग्वालियर (Gwalior)** | तात्या टोपे (रामचंद्र पांडुरंग) | सर ह्यू रोज |
| **बिहार / जगदीशपुर** | वीर कुंवर सिंह एवं अमर सिंह | विलियम टेलर एवं विंसेंट आयर |
| **फैजाबाद (Faizabad)** | मौलवी अहमदुल्लाह | जनरल रेनॉल्ड |
| **इलाहाबाद (Prayagraj)**| लियाकत अली | कर्नल नील |
| **बरेली (Bareilly)** | खान बहादुर खान | विंसेंट आयर |

---

## ⚠️ महत्वपूर्ण परीक्षा बिंदु (Exam Facts)
- **मंगल पांडे:** 34वीं बंगाल नेटिव इन्फैंट्री (बैरकपुर छावनी) के सिपाही थे। उन्होंने 29 मार्च 1857 को चर्बी वाले कारतूसों के विरोध में सार्जेंट मेजर ह्यूसन पर गोली चलाई थी।
- **प्रतीक चिन्ह:** 1857 की क्रांति का प्रतीक **"कमल और रोटी"** था।
- **सर ह्यू रोज का कथन:** झांसी की रानी की वीरता पर सर ह्यू रोज ने कहा था: *"यहाँ वह औरत सोई हुई है, जो भारतीय विद्रोहियों में एकमात्र मर्द थी।"*`
  },
  {
    id: 'note-science-heart-en',
    title: 'Human Circulatory System: Cardiac Cycle, Blood Groups & Vessels',
    language: 'en',
    subject: 'General Science (Biology)',
    category: 'concept',
    tags: ['Biology', 'Circulation', 'Heart', 'Blood Groups', 'Physiology'],
    summary: 'Comprehensive exam notes on the 4-chambered human heart, systemic vs pulmonary loops, ABO Rh groups, and blood pressure.',
    readingTimeMinutes: 4,
    isStarred: true,
    createdAt: '2026-09-24T12:00:00Z',
    updatedAt: '2026-09-27T08:30:00Z',
    content: `# Human Circulatory System & Cardiac Physiology

Humans possess a **closed, double circulatory system** consisting of systemic and pulmonary circulations.

---

## ❤️ 1. Structure of Human Heart
- **Chambers:** 4 Chambers (2 Atria, 2 Ventricles).
- **Valves:**
  - **Tricuspid Valve:** Between Right Atrium and Right Ventricle.
  - **Bicuspid (Mitral) Valve:** Between Left Atrium and Left Ventricle.
  - **Semilunar Valves:** Guarding pulmonary artery and aorta.
- **Natural Pacemaker:** **SA Node (Sinoatrial Node)** situated in the upper right atrium. It initiates heartbeat impulses (~72 times/min).

---

## 🩸 2. ABO & Rh Blood Grouping System
Discovered by **Karl Landsteiner** (Nobel Prize in 1930).

| Blood Group | Antigen on RBC | Antibody in Plasma | Can Donate To | Can Receive From |
|---|---|---|---|---|
| **A** | A | Anti-B | A, AB | A, O |
| **B** | B | Anti-A | B, AB | B, O |
| **AB** | A and B | None | AB only | **Universal Recipient (AB+)** |
| **O** | None | Anti-A and Anti-B | **Universal Donor (O-)** | O only |

*High-Yield Note:* **O-negative (O-)** is true universal donor because it lacks A, B, and Rh antigens. **AB-positive (AB+)** is true universal recipient.

---

## 🩺 3. Blood Pressure Values
- **Normal Healthy BP:** $120 / 80\\text{ mmHg}$
  - **Systolic (Contraction):** $120\\text{ mmHg}$
  - **Diastolic (Relaxation):** $80\\text{ mmHg}$
- **Instrument used:** Sphygmomanometer.`
  },
  {
    id: 'note-eco-rbi-bi',
    title: 'Monetary Policy Tools: RBI Repo Rate, CRR, SLR & Inflation (मौद्रिक नीति एवं मुद्रास्फीति)',
    language: 'bilingual',
    subject: 'Economics (अर्थशास्त्र)',
    category: 'formula',
    tags: ['Economics', 'RBI', 'Repo Rate', 'मुद्रास्फीति', 'Bilingual'],
    summary: 'Bilingual summary explaining quantitative credit control mechanisms of the Reserve Bank of India and their impact on market liquidity.',
    readingTimeMinutes: 4,
    isStarred: false,
    createdAt: '2026-09-25T15:30:00Z',
    updatedAt: '2026-09-27T10:15:00Z',
    content: `# RBI Monetary Policy & Inflation Control (आरबीआई मौद्रिक नीति)

The **Monetary Policy Committee (MPC)** of RBI consists of 6 members and meets bimonthly to determine benchmark interest rates.

---

## 🏦 1. Quantitative Instruments (मात्रात्मक उपकरण)

### A. Repo Rate (रेपो दर)
- **English:** The rate at which the central bank (RBI) lends short-term money to commercial banks against government securities.
- **हिन्दी:** वह ब्याज दर जिस पर भारतीय रिजर्व बैंक (RBI) वाणिज्यिक बैंकों को अल्पकालिक ऋण प्रदान करता है।
- **Impact on Inflation:** 
  $$\\text{Repo Rate} \\uparrow \\implies \\text{Bank Lending Rates} \\uparrow \\implies \\text{Money Supply} \\downarrow \\implies \\text{Inflation} \\downarrow$$

### B. Reverse Repo Rate (रिवर्स रेपो दर)
- **English:** The rate at which RBI absorbs excess liquidity from commercial banks by borrowing funds.
- **हिन्दी:** वह दर जिस पर आरबीआई बैंकों से अधिशेष नकदी स्वीकार करके उन्हें ब्याज देता है।

### C. Cash Reserve Ratio (CRR - नकद आरक्षित अनुपात)
- **Concept:** Fraction of total Net Demand and Time Liabilities (NDTL) that commercial banks must keep parked with the RBI **in liquid cash**.
- **Important:** RBI pays **no interest** on CRR deposits!

### D. Statutory Liquidity Ratio (SLR - सांविधिक तरलता अनुपात)
- **Concept:** Fraction of NDTL that commercial banks must maintain with **themselves** in safe liquid assets like Gold, Cash, or approved Government Securities (G-Secs).`
  }
];

interface DigitalNotesViewProps {
  onNavigateToSubject?: (subjectId: string) => void;
  onOpenTopicDrawer?: (topic: Topic, subjectName: string, chapterName: string) => void;
}

export const DigitalNotesView: React.FC<DigitalNotesViewProps> = () => {
  const { isDark } = useTheme();
  const { currentExam } = useSyllabus();

  // Load saved notes from LocalStorage or initialize with seed notes
  const [notes, setNotes] = useState<DigitalNote[]>(() => {
    try {
      const stored = localStorage.getItem('syllabus3d_digital_notes');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading digital notes:', e);
    }
    return INITIAL_DIGITAL_NOTES;
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('syllabus3d_digital_notes', JSON.stringify(notes));
    } catch (e) {
      console.error('Error saving digital notes:', e);
    }
  }, [notes]);

  // Filters & Controls
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<NoteLanguage | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<NoteCategory | 'all'>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterStarredOnly, setFilterStarredOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'recent' | 'title' | 'starred'>('recent');

  // Modal States
  const [activeReadingNote, setActiveReadingNote] = useState<DigitalNote | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<DigitalNote | null>(null);
  const [readerFontSize, setReaderFontSize] = useState<'base' | 'lg' | 'xl'>('base');
  const [copyFeedbackId, setCopyFeedbackId] = useState<string | null>(null);

  // New/Edit Note Form States
  const [formTitle, setFormTitle] = useState('');
  const [formLanguage, setFormLanguage] = useState<NoteLanguage>('en');
  const [formSubject, setFormSubject] = useState('');
  const [formCategory, setFormCategory] = useState<NoteCategory>('concept');
  const [formTags, setFormTags] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formSummary, setFormSummary] = useState('');
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Collect unique subjects from existing notes
  const availableSubjects = useMemo(() => {
    const subs = new Set<string>();
    notes.forEach(n => {
      if (n.subject) subs.add(n.subject);
    });
    return Array.from(subs);
  }, [notes]);

  // Note Counts by Language
  const stats = useMemo(() => {
    const total = notes.length;
    const hiCount = notes.filter(n => n.language === 'hi').length;
    const enCount = notes.filter(n => n.language === 'en').length;
    const biCount = notes.filter(n => n.language === 'bilingual').length;
    const starredCount = notes.filter(n => n.isStarred).length;
    return { total, hiCount, enCount, biCount, starredCount };
  }, [notes]);

  // Filter & Sort Logic
  const filteredNotes = useMemo(() => {
    return notes
      .filter(note => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = note.title.toLowerCase().includes(q);
          const matchContent = note.content.toLowerCase().includes(q);
          const matchSubject = note.subject.toLowerCase().includes(q);
          const matchTags = note.tags.some(t => t.toLowerCase().includes(q));
          if (!matchTitle && !matchContent && !matchSubject && !matchTags) return false;
        }

        // Language
        if (selectedLanguage !== 'all' && note.language !== selectedLanguage) return false;

        // Category
        if (selectedCategory !== 'all' && note.category !== selectedCategory) return false;

        // Subject
        if (selectedSubject !== 'all' && note.subject !== selectedSubject) return false;

        // Starred
        if (filterStarredOnly && !note.isStarred) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        if (sortBy === 'starred') {
          return (b.isStarred ? 1 : 0) - (a.isStarred ? 1 : 0);
        }
        // recent
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      });
  }, [notes, searchQuery, selectedLanguage, selectedCategory, selectedSubject, filterStarredOnly, sortBy]);

  // Star Toggle Handler
  const handleToggleStar = useCallback((noteId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playClick();
    haptics.light();
    setNotes(prev =>
      prev.map(n => (n.id === noteId ? { ...n, isStarred: !n.isStarred } : n))
    );
  }, []);

  // Copy Note Handler
  const handleCopyNote = useCallback((note: DigitalNote, e?: React.MouseEvent) => {
    e?.stopPropagation();
    soundManager.playClick();
    haptics.light();
    navigator.clipboard.writeText(`${note.title}\n\n${note.content}`);
    setCopyFeedbackId(note.id);
    setTimeout(() => setCopyFeedbackId(null), 2000);
  }, []);

  // Delete Note Handler
  const handleDeleteNote = useCallback((noteId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this digital note?')) {
      soundManager.playClick();
      haptics.warning();
      setNotes(prev => prev.filter(n => n.id !== noteId));
      if (activeReadingNote?.id === noteId) {
        setActiveReadingNote(null);
      }
    }
  }, [activeReadingNote]);

  // Open Create Modal
  const handleOpenCreateModal = useCallback(() => {
    soundManager.playClick();
    haptics.light();
    setEditingNote(null);
    setFormTitle('');
    setFormLanguage('en');
    setFormSubject(availableSubjects[0] || 'General');
    setFormCategory('concept');
    setFormTags('');
    setFormContent('');
    setFormSummary('');
    setIsPreviewMode(false);
    setIsCreateModalOpen(true);
  }, [availableSubjects]);

  // Open Edit Modal
  const handleOpenEditModal = useCallback((note: DigitalNote, e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playClick();
    haptics.light();
    setEditingNote(note);
    setFormTitle(note.title);
    setFormLanguage(note.language);
    setFormSubject(note.subject);
    setFormCategory(note.category);
    setFormTags(note.tags.join(', '));
    setFormContent(note.content);
    setFormSummary(note.summary || '');
    setIsPreviewMode(false);
    setIsCreateModalOpen(true);
  }, []);

  // Save Note (Create or Update)
  const handleSaveNote = useCallback(() => {
    if (!formTitle.trim()) {
      alert('Please enter a note title.');
      return;
    }

    soundManager.playCompleteChime();
    haptics.success();

    const tagsArray = formTags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const wordCount = formContent.trim().split(/\s+/).length;
    const estReadingTime = Math.max(1, Math.round(wordCount / 160));

    if (editingNote) {
      // Update existing
      setNotes(prev =>
        prev.map(n =>
          n.id === editingNote.id
            ? {
                ...n,
                title: formTitle.trim(),
                language: formLanguage,
                subject: formSubject.trim() || 'General',
                category: formCategory,
                tags: tagsArray,
                content: formContent,
                summary: formSummary.trim(),
                readingTimeMinutes: estReadingTime,
                updatedAt: new Date().toISOString()
              }
            : n
        )
      );
      if (activeReadingNote?.id === editingNote.id) {
        setActiveReadingNote({
          ...editingNote,
          title: formTitle.trim(),
          language: formLanguage,
          subject: formSubject.trim() || 'General',
          category: formCategory,
          tags: tagsArray,
          content: formContent,
          summary: formSummary.trim(),
          readingTimeMinutes: estReadingTime,
          updatedAt: new Date().toISOString()
        });
      }
    } else {
      // Create new
      const newNote: DigitalNote = {
        id: `note-${Date.now()}`,
        title: formTitle.trim(),
        language: formLanguage,
        subject: formSubject.trim() || 'General',
        category: formCategory,
        tags: tagsArray,
        content: formContent || '# ' + formTitle + '\n\nAdd your content here...',
        summary: formSummary.trim(),
        readingTimeMinutes: estReadingTime,
        isStarred: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setNotes(prev => [newNote, ...prev]);
    }

    setIsCreateModalOpen(false);
    setEditingNote(null);
  }, [formTitle, formLanguage, formSubject, formCategory, formTags, formContent, formSummary, editingNote, activeReadingNote]);

  // Insert Template Helpers for Editor
  const handleInsertTemplate = (type: 'hindi' | 'formula' | 'table') => {
    soundManager.playClick();
    if (type === 'hindi') {
      const template = `\n\n## 📌 मुख्य बिंदु (Key Highlights)\n- बिंदु 1: महत्वपूर्ण तथ्य यहाँ लिखें...\n- बिंदु 2: परीक्षा की दृष्टि से उपयोगी बिंदु...\n\n### ⚠️ सावधानियां (Exam Traps)\n- इस नियम में यह अपवाद शामिल है...\n`;
      setFormContent(prev => prev + template);
    } else if (type === 'formula') {
      const template = `\n\n## ⚡ महत्वपूर्ण सूत्र (Core Formulas)\n$$Formula = \\frac{A \\times B}{C}$$\n\n- **शॉर्टकट ट्रिक:** समय बचाने के लिए यह विधि अपनाएं...\n`;
      setFormContent(prev => prev + template);
    } else if (type === 'table') {
      const template = `\n\n| क्रम (No.) | विषय / अवधारणा | विवरण (Explanation) |\n|---|---|---|\n| 1 | अवधारणा A | संक्षिप्त विवरण यहाँ... |\n| 2 | अवधारणा B | संक्षिप्त विवरण यहाँ... |\n`;
      setFormContent(prev => prev + template);
    }
  };

  // Helper for language badge styling
  const getLanguageBadge = (lang: NoteLanguage) => {
    switch (lang) {
      case 'hi':
        return {
          label: 'हिन्दी',
          flag: '🇮🇳',
          className: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20'
        };
      case 'en':
        return {
          label: 'English',
          flag: '🇬🇧',
          className: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
        };
      case 'bilingual':
      default:
        return {
          label: 'Bilingual (द्विभाषी)',
          flag: '🌐',
          className: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
        };
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8 space-y-6 pb-28 sm:pb-24 animate-fade-in font-sans">
      {/* 🌟 1. HERO HEADER WITH STATS & ACTION BUTTONS */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white p-5 sm:p-8 shadow-2xl border border-indigo-500/20">
        {/* Ambient Glow Orbs */}
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold tracking-wide text-indigo-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Bilingual Knowledge Vault • डिजिटल अध्ययन सामग्री</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-3">
              <NotebookPen className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-400 shrink-0" />
              <span>Digital Notes</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Curate, organize, and study your high-yield concepts, formula cheatsheets, and rapid revision notes in{' '}
              <strong className="text-amber-300 font-bold">हिन्दी (Devanagari)</strong> and{' '}
              <strong className="text-sky-300 font-bold">English</strong>.
            </p>
          </div>

          {/* Quick Create Action Button */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleOpenCreateModal}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer border border-white/20"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Create New Note</span>
            </button>
          </div>
        </div>

        {/* Quick KPI Stat Counter Pills */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 mt-6 pt-6 border-t border-white/10">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-3 border border-white/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] text-slate-400 font-medium">Total Notes</div>
              <div className="text-lg sm:text-xl font-black text-white tabular-nums">{stats.total}</div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-3 border border-white/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-sm">
              🇮🇳
            </div>
            <div>
              <div className="text-[11px] text-slate-400 font-medium">हिन्दी नोट्स</div>
              <div className="text-lg sm:text-xl font-black text-white tabular-nums">{stats.hiCount}</div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-3 border border-white/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-sm">
              🇬🇧
            </div>
            <div>
              <div className="text-[11px] text-slate-400 font-medium">English Notes</div>
              <div className="text-lg sm:text-xl font-black text-white tabular-nums">{stats.enCount}</div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-3 border border-white/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
              🌐
            </div>
            <div>
              <div className="text-[11px] text-slate-400 font-medium">द्विभाषी (Bilingual)</div>
              <div className="text-lg sm:text-xl font-black text-white tabular-nums">{stats.biCount}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 🔍 2. SEARCH, LANGUAGE CHIPS & FILTER BAR */}
      <div className="bg-white dark:bg-[#121526] rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-white/[0.08] shadow-sm space-y-4">
        {/* Search Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search notes by title, Hindi/English keywords, formulas, or tags..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-50 dark:bg-[#181B2E] border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* View Mode & Sort Dropdowns */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            {/* Starred Toggle */}
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setFilterStarredOnly(prev => !prev);
              }}
              className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                filterStarredOnly
                  ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                  : 'bg-slate-50 dark:bg-[#181B2E] border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#20243C]'
              }`}
              title="Filter Starred Notes"
            >
              <Star className={`w-3.5 h-3.5 ${filterStarredOnly ? 'fill-white' : ''}`} />
              <span className="hidden sm:inline">Favorites</span>
            </button>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="appearance-none pl-3 pr-8 py-2.5 rounded-xl bg-slate-50 dark:bg-[#181B2E] border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="recent">Recently Updated</option>
                <option value="title">Alphabetical (A-Z)</option>
                <option value="starred">Starred First</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Layout Toggle (Grid vs List) */}
            <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-[#181B2E] border border-slate-200/80 dark:border-white/10">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setViewMode('grid');
                }}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setViewMode('list');
                }}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Language Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar text-xs">
          <span className="text-slate-400 font-semibold shrink-0 flex items-center gap-1 mr-1">
            <Languages className="w-3.5 h-3.5 text-indigo-500" />
            <span>Language:</span>
          </span>

          {[
            { id: 'all', label: 'All Languages (सभी भाषाएँ)' },
            { id: 'hi', label: '🇮🇳 हिन्दी (Devanagari)' },
            { id: 'en', label: '🇬🇧 English' },
            { id: 'bilingual', label: '🌐 Bilingual (द्विभाषी)' }
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                soundManager.playClick();
                setSelectedLanguage(tab.id as any);
              }}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                selectedLanguage === tab.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-[#181B2E] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#20243C]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Category & Subject Secondary Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-white/5 text-xs">
          <span className="text-slate-400 font-semibold shrink-0">Type:</span>

          {[
            { id: 'all', label: 'All Types' },
            { id: 'concept', label: '💡 Concepts' },
            { id: 'formula', label: '⚡ Formulas' },
            { id: 'revision', label: '🎯 Rapid Revision' },
            { id: 'practice', label: '📝 Practice' }
          ].map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                soundManager.playClick();
                setSelectedCategory(cat.id as any);
              }}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}

          {/* Subject Dropdown Filter */}
          {availableSubjects.length > 0 && (
            <div className="ml-auto flex items-center gap-1.5 text-xs">
              <span className="text-slate-400 font-semibold">Subject:</span>
              <select
                value={selectedSubject}
                onChange={e => setSelectedSubject(e.target.value)}
                className="py-1 px-2.5 rounded-lg bg-slate-50 dark:bg-[#181B2E] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 font-medium focus:outline-none cursor-pointer"
              >
                <option value="all">All Subjects</option>
                {availableSubjects.map(sub => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* 📋 3. NOTES LIST / GRID PRESENTATION */}
      {filteredNotes.length === 0 ? (
        <div className="bg-white dark:bg-[#121526] rounded-3xl p-12 text-center border border-dashed border-slate-300 dark:border-slate-800 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-500 mx-auto flex items-center justify-center">
            <BookMarked className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Digital Notes Found</h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            {searchQuery
              ? `No notes matched your search query "${searchQuery}". Try clearing filters or searching for different keywords.`
              : 'You have not added any notes under this category yet. Click "Create New Note" to start your bilingual collection!'}
          </p>
          <div className="pt-2 flex items-center justify-center gap-3">
            {searchQuery || selectedLanguage !== 'all' || selectedCategory !== 'all' || selectedSubject !== 'all' || filterStarredOnly ? (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedLanguage('all');
                  setSelectedCategory('all');
                  setSelectedSubject('all');
                  setFilterStarredOnly(false);
                }}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition-all cursor-pointer"
              >
                Reset All Filters
              </button>
            ) : null}
            <button
              type="button"
              onClick={handleOpenCreateModal}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
            >
              + Create Note Now
            </button>
          </div>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredNotes.map(note => {
            const langBadge = getLanguageBadge(note.language);
            return (
              <div
                key={note.id}
                onClick={() => {
                  soundManager.playClick();
                  setActiveReadingNote(note);
                }}
                className="group relative bg-white dark:bg-[#121526] hover:bg-slate-50/50 dark:hover:bg-[#161A2E] rounded-2xl p-5 border border-slate-200/80 dark:border-white/[0.08] hover:border-indigo-500/40 dark:hover:border-indigo-500/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div className="space-y-3">
                  {/* Top Bar: Language & Star */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${langBadge.className}`}>
                      <span>{langBadge.flag}</span>
                      <span>{langBadge.label}</span>
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={e => handleToggleStar(note.id, e)}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          note.isStarred
                            ? 'text-amber-500 hover:text-amber-600'
                            : 'text-slate-300 dark:text-slate-600 hover:text-amber-400'
                        }`}
                        title={note.isStarred ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        <Star className={`w-4 h-4 ${note.isStarred ? 'fill-amber-500' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Subject & Category */}
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 font-semibold">
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold">{note.subject}</span>
                    <span>•</span>
                    <span className="capitalize">{note.category}</span>
                  </div>

                  {/* Note Title */}
                  <h3 className="text-[15px] sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug">
                    {note.title}
                  </h3>

                  {/* Note Summary / Snippet */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                    {note.summary || note.content.slice(0, 160).replace(/[#*`$]/g, '') + '...'}
                  </p>

                  {/* Tags */}
                  {note.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {note.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-medium text-slate-600 dark:text-slate-400"
                        >
                          #{tag}
                        </span>
                      ))}
                      {note.tags.length > 3 && (
                        <span className="text-[10px] text-slate-400 self-center">+{note.tags.length - 3}</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Bottom Card Footer */}
                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{note.readingTimeMinutes || 3} min read</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={e => handleCopyNote(note, e)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Copy note text"
                    >
                      {copyFeedbackId === note.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={e => handleOpenEditModal(note, e)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Edit note"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={e => handleDeleteNote(note.id, e)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                      title="Delete note"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="space-y-3">
          {filteredNotes.map(note => {
            const langBadge = getLanguageBadge(note.language);
            return (
              <div
                key={note.id}
                onClick={() => {
                  soundManager.playClick();
                  setActiveReadingNote(note);
                }}
                className="group bg-white dark:bg-[#121526] hover:bg-slate-50/50 dark:hover:bg-[#161A2E] rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-white/[0.08] hover:border-indigo-500/40 dark:hover:border-indigo-500/40 shadow-xs hover:shadow-lg transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2.5">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold ${langBadge.className}`}>
                      <span>{langBadge.flag}</span>
                      <span>{langBadge.label}</span>
                    </span>
                    <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                      {note.subject}
                    </span>
                    <span className="text-[10px] text-slate-400 capitalize">• {note.category}</span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                    {note.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                    {note.summary || note.content.slice(0, 140).replace(/[#*`$]/g, '')}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-white/5">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{note.readingTimeMinutes || 3}m</span>
                  </span>

                  <button
                    type="button"
                    onClick={e => handleToggleStar(note.id, e)}
                    className={`p-2 rounded-xl transition-colors cursor-pointer ${
                      note.isStarred
                        ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/30'
                        : 'text-slate-300 dark:text-slate-600 hover:text-amber-500'
                    }`}
                  >
                    <Star className={`w-4 h-4 ${note.isStarred ? 'fill-amber-500' : ''}`} />
                  </button>

                  <button
                    type="button"
                    onClick={e => handleCopyNote(note, e)}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    title="Copy note text"
                  >
                    {copyFeedbackId === note.id ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={e => handleOpenEditModal(note, e)}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    title="Edit note"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={e => handleDeleteNote(note.id, e)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                    title="Delete note"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 💡 4. PRO TIPS BANNER FOR BILINGUAL STUDYING */}
      <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-transparent border border-amber-500/20 flex items-start sm:items-center gap-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
        <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
          <Lightbulb className="w-5 h-5 stroke-[2.2]" />
        </div>
        <div className="space-y-1">
          <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>द्विभाषी अध्ययन युक्ति (Bilingual Dual-Coding Tip)</span>
            <span className="px-2 py-0.2 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 text-[10px] font-black uppercase">
              Study Smart
            </span>
          </div>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs">
            जब आप तकनीकी शब्दों को हिन्दी और अंग्रेजी दोनों में एक साथ लिखते हैं, तो मस्तिष्क में <strong>Dual-Coding Memory</strong> सक्रिय होती है। 
            यह परीक्षा में कठिन शब्दावली को 40% तेजी से याद रखने में मदद करती है।
          </p>
        </div>
      </div>

      {/* 📖 5. MODAL NOTE READER (Full Distraction-Free Study View) */}
      {activeReadingNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white dark:bg-[#0E101B] rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden animate-scale-up">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200/80 dark:border-white/10 bg-slate-50/80 dark:bg-[#141728]/80 backdrop-blur-md">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${getLanguageBadge(activeReadingNote.language).className}`}>
                  <span>{getLanguageBadge(activeReadingNote.language).flag}</span>
                  <span>{getLanguageBadge(activeReadingNote.language).label}</span>
                </span>
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 truncate">
                  {activeReadingNote.subject}
                </span>
              </div>

              {/* Reader Controls */}
              <div className="flex items-center gap-1.5">
                {/* Font Size Adjuster */}
                <div className="flex items-center p-1 rounded-xl bg-slate-200/60 dark:bg-slate-800 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setReaderFontSize('base')}
                    className={`px-2 py-1 rounded-lg ${readerFontSize === 'base' ? 'bg-white dark:bg-slate-700 shadow-xs' : 'text-slate-500'}`}
                    title="Normal Font"
                  >
                    A
                  </button>
                  <button
                    type="button"
                    onClick={() => setReaderFontSize('lg')}
                    className={`px-2 py-1 rounded-lg text-sm ${readerFontSize === 'lg' ? 'bg-white dark:bg-slate-700 shadow-xs' : 'text-slate-500'}`}
                    title="Medium Font"
                  >
                    A+
                  </button>
                  <button
                    type="button"
                    onClick={() => setReaderFontSize('xl')}
                    className={`px-2 py-1 rounded-lg text-base ${readerFontSize === 'xl' ? 'bg-white dark:bg-slate-700 shadow-xs' : 'text-slate-500'}`}
                    title="Large Font"
                  >
                    A++
                  </button>
                </div>

                {/* Copy Button */}
                <button
                  type="button"
                  onClick={() => handleCopyNote(activeReadingNote)}
                  className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5 transition-colors cursor-pointer"
                  title="Copy full note"
                >
                  {copyFeedbackId === activeReadingNote.id ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>

                {/* Print Button */}
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5 transition-colors cursor-pointer"
                  title="Print note"
                >
                  <Printer className="w-4 h-4" />
                </button>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setActiveReadingNote(null);
                  }}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5 transition-colors cursor-pointer ml-1"
                  title="Close reader"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body / Markdown Content View */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-10 custom-scrollbar space-y-6">
              <h2 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
                {activeReadingNote.title}
              </h2>

              {/* Tags & Meta */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pb-4 border-b border-slate-200 dark:border-white/10">
                <span className="flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{activeReadingNote.readingTimeMinutes || 3} min read</span>
                </span>
                <span>•</span>
                <span className="capitalize">{activeReadingNote.category}</span>
                {activeReadingNote.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-medium">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Formatted Markdown Reader Area */}
              <div
                className={`prose dark:prose-invert max-w-none leading-relaxed text-slate-800 dark:text-slate-200 font-sans ${
                  readerFontSize === 'xl' ? 'text-lg' : readerFontSize === 'lg' ? 'text-base' : 'text-sm'
                }`}
              >
                {activeReadingNote.content.split('\n\n').map((block, idx) => {
                  if (block.startsWith('# ')) {
                    return null; // Title already displayed prominently above
                  }
                  if (block.startsWith('## ')) {
                    return (
                      <h3 key={idx} className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-6 mb-3 pb-1 border-b border-slate-200 dark:border-slate-800">
                        {block.replace('## ', '')}
                      </h3>
                    );
                  }
                  if (block.startsWith('### ')) {
                    return (
                      <h4 key={idx} className="text-base sm:text-lg font-bold text-indigo-600 dark:text-indigo-400 mt-4 mb-2">
                        {block.replace('### ', '')}
                      </h4>
                    );
                  }
                  if (block.startsWith('---')) {
                    return <hr key={idx} className="my-6 border-slate-200 dark:border-slate-800" />;
                  }
                  if (block.includes('|') && block.includes('---')) {
                    // Render simple markdown table
                    const rows = block.trim().split('\n').filter(r => !r.includes('---'));
                    if (rows.length > 0) {
                      const headerCells = rows[0].split('|').map(c => c.trim()).filter(Boolean);
                      const bodyRows = rows.slice(1);
                      return (
                        <div key={idx} className="overflow-x-auto my-4 rounded-xl border border-slate-200 dark:border-slate-800">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead>
                              <tr className="bg-slate-100 dark:bg-[#181B2E] text-slate-700 dark:text-slate-300 font-bold">
                                {headerCells.map((h, i) => (
                                  <th key={i} className="p-3 border-b border-slate-200 dark:border-slate-800">{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {bodyRows.map((r, ri) => {
                                const cells = r.split('|').map(c => c.trim()).filter(Boolean);
                                return (
                                  <tr key={ri} className="border-b border-slate-100 dark:border-slate-800/60 hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                                    {cells.map((cell, ci) => (
                                      <td key={ci} className="p-3 text-slate-700 dark:text-slate-300">{cell}</td>
                                    ))}
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      );
                    }
                  }

                  // Standard paragraphs or lists
                  return (
                    <p key={idx} className="whitespace-pre-line text-slate-700 dark:text-slate-300 my-2.5">
                      {block}
                    </p>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-[#141728] text-xs">
              <span className="text-slate-400">
                Created: {new Date(activeReadingNote.createdAt).toLocaleDateString()}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={e => {
                    handleOpenEditModal(activeReadingNote, e);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Note</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveReadingNote(null)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all cursor-pointer shadow-xs"
                >
                  Done Reading
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✏️ 6. CREATE & EDIT NOTE MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-3xl max-h-[92vh] flex flex-col bg-white dark:bg-[#0E101B] rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden animate-scale-up">
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-[#141728]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-500 flex items-center justify-center font-bold">
                  <NotebookPen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                    {editingNote ? 'Edit Digital Note' : 'Create New Digital Note'}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Draft high-yield study material in हिन्दी or English
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Content */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-4 text-xs sm:text-sm">
              {/* Note Title */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Note Title (शीर्षक) *
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={e => setFormTitle(e.target.value)}
                  placeholder="e.g. भारतीय संविधान के मूल अधिकार / Arithmetic Speed Formulas"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#181B2E] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Language Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Select Language (भाषा)
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'hi', label: '🇮🇳 हिन्दी (Hindi)', desc: 'Devanagari script' },
                    { id: 'en', label: '🇬🇧 English', desc: 'Standard English' },
                    { id: 'bilingual', label: '🌐 Bilingual (द्विभाषी)', desc: 'Mixed dual language' }
                  ].map(l => (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => setFormLanguage(l.id as any)}
                      className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                        formLanguage === l.id
                          ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 text-indigo-600 dark:text-indigo-400 font-bold shadow-xs'
                          : 'bg-slate-50 dark:bg-[#181B2E] border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <div className="font-bold text-xs">{l.label}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{l.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Subject & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Subject (विषय)
                  </label>
                  <input
                    type="text"
                    value={formSubject}
                    onChange={e => setFormSubject(e.target.value)}
                    placeholder="e.g. Indian Polity, Quantitative, History"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#181B2E] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Category (प्रकार)
                  </label>
                  <select
                    value={formCategory}
                    onChange={e => setFormCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#181B2E] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    <option value="concept">💡 Core Concept (अवधारणा)</option>
                    <option value="formula">⚡ Formula & Rules (सूत्र)</option>
                    <option value="revision">🎯 Rapid Revision (पुनरीक्षण)</option>
                    <option value="practice">📝 Practice & Examples (अभ्यास)</option>
                  </select>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Tags / Keywords (टैग्स - comma separated)
                </label>
                <input
                  type="text"
                  value={formTags}
                  onChange={e => setFormTags(e.target.value)}
                  placeholder="e.g. संविधान, अनुच्छेद 14, UPSC, Shortcuts"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#181B2E] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Note Content Editor */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Content (Markdown Supported)
                  </label>

                  {/* Formatting Shortcuts */}
                  <div className="flex items-center gap-1.5 text-xs">
                    <button
                      type="button"
                      onClick={() => handleInsertTemplate('hindi')}
                      className="px-2 py-0.5 rounded-md bg-orange-500/10 text-orange-600 dark:text-orange-400 hover:bg-orange-500/20 text-[10.5px] font-bold cursor-pointer"
                    >
                      + हिन्दी बिंदु
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInsertTemplate('formula')}
                      className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 text-[10.5px] font-bold cursor-pointer"
                    >
                      + Formula
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInsertTemplate('table')}
                      className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20 text-[10.5px] font-bold cursor-pointer"
                    >
                      + Table
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsPreviewMode(prev => !prev)}
                      className={`px-2.5 py-0.5 rounded-md font-bold text-[10.5px] cursor-pointer ml-1 ${
                        isPreviewMode
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {isPreviewMode ? '✏️ Edit' : '👁️ Preview'}
                    </button>
                  </div>
                </div>

                {isPreviewMode ? (
                  <div className="w-full min-h-[220px] max-h-[350px] overflow-y-auto p-4 rounded-xl bg-slate-50 dark:bg-[#181B2E] border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-800 dark:text-slate-200 whitespace-pre-line custom-scrollbar">
                    {formContent || 'Nothing to preview yet. Start typing!'}
                  </div>
                ) : (
                  <textarea
                    rows={9}
                    value={formContent}
                    onChange={e => setFormContent(e.target.value)}
                    placeholder="Write your study notes here in Hindi or English... Supports # Headings, - Bullets, | Tables |, and $$Formulas$$"
                    className="w-full p-4 rounded-xl bg-slate-50 dark:bg-[#181B2E] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 custom-scrollbar leading-relaxed"
                  />
                )}
              </div>
            </div>

            {/* Modal Bottom Save Bar */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-[#141728]">
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveNote}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
              >
                {editingNote ? 'Save Changes' : 'Create Note'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
