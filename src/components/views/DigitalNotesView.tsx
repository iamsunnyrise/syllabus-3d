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
  Type,
  Navigation,
  Scale,
  Zap,
  Globe,
  Landmark,
  Activity,
  TrendingUp,
  Lock,
  Unlock,
  ShieldCheck,
  Key,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Upload,
  Wand2,
  RefreshCw,
  Info
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
  coverImage?: string;
  createdAt: string;
  updatedAt: string;
}

// 📚 Pre-seeded High-Yield Bilingual & Monolingual Sample Notes
const INITIAL_DIGITAL_NOTES: DigitalNote[] = [
  {
    id: 'note-polity-making-constitution-en',
    title: 'Indian Polity: Making of the Constitution (Complete Exam Notes)',
    language: 'en',
    subject: 'Indian Polity (राजव्यवस्था)',
    category: 'concept',
    tags: ['Polity', 'Making of Constitution', 'Constituent Assembly', 'Drafting Committee', 'SSC CGL', 'UPSC'],
    summary: 'Comprehensive notes covering historical timeline, Cabinet Mission Plan, committees, Drafting Committee, readings, and key facts.',
    readingTimeMinutes: 5,
    isStarred: true,
    coverImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    createdAt: '2026-09-27T18:00:00Z',
    updatedAt: '2026-09-27T20:15:00Z',
    content: `# Making of the Indian Constitution: Comprehensive Exam Notes

The Constitution lays down the fundamental political principles, establishes the structure, procedures, powers, and duties of government institutions, and sets out fundamental rights, directive principles, and the duties of citizens.

---

## 🏛️ 1. Conceptual Foundation & Forms of Government

- **Historical Origin:** The modern tradition of a written Constitution began in the **USA (1787)** following the American Declaration of Independence on **4th July 1776**.
- **Nature of Indian Constitution:** A harmonious blend of **Rigidity** (special amendment procedures for federal provisions under Art. 368) and **Flexibility** (simple majority amendments for ordinary provisions).
- **Core Concept Alert:** While all democratic countries are likely to have a Constitution, it is not mandatory that every country having a Constitution is democratic.

### Comparison: Forms of Government

| Form of Government | Meaning / Definition | Examples |
| :--- | :--- | :--- |
| **Democracy** | Government of the people, by the people, for the people | India, USA, UK |
| **Communist** | Means and sources of production controlled by the state | China, North Korea, Cuba, Vietnam, Laos |
| **Monarchic** | Absolute rule concentrated in a single monarch/king | Saudi Arabia, Brunei |
| **Totalitarian** | Total autocratic control over all public and private aspects of citizens' lives | North Korea |
| **Oligarchic** | Power rests with a small, elite, privileged ruling segment | Iran, Russia |

---

## ⏳ 2. Historical Evolution & Timeline of Demands

- **1928 (Nehru Report):** The earliest draft of an indigenous Indian Constitution was submitted at the All-Parties Conference in Lucknow, chaired by **Motilal Nehru**.
- **1934 (First Proposal):** **M. N. Roy** (pioneer of the communist movement in India) officially put forward the idea of an independent Constituent Assembly for the first time.
- **1935 (Official Demand):** The **Indian National Congress (INC)** formally demanded a Constituent Assembly to frame the Constitution of India.

### British Offers & Indian Responses
1. **August Offer (1940):** 
   - Proposed by Viceroy **Lord Linlithgow** on August 8, 1940, to secure Indian cooperation in World War II.
   - Promised post-war **Dominion Status**. (*Rejected by INC: demanded Purna Swaraj*).
2. **Cripps Mission (1942):**
   - Headed by **Sir Stafford Cripps**.
   - Proposed a Constituent Assembly and Dominion Status after WWII.
   - *Rejected:* J.L. Nehru remarked: *"Dominion status is dead as a door nail."* Mahatma Gandhi called it a *"Post-dated cheque on a crashing bank."*
3. **Wavell Plan & Shimla Conference (1945):**
   - Proposed by Viceroy **Lord Wavell** to resolve the constitutional deadlock by restructuring the Governor-General's Executive Council with equal Hindu-Muslim representation. (*Failed due to Muslim League's insistence on being the sole representative of Muslims*).
4. **Cabinet Mission Plan (1946) — The Master Blueprint:**
   - Sent by British PM Clement Attlee with 3 Cabinet Ministers:
     1. **Lord Pethick-Lawrence** (Secretary of State for India & Chairman)
     2. **Sir Stafford Cripps** (President of the Board of Trade)
     3. **A. V. Alexander** (First Lord of the Admiralty)
   - **Outcome:** Accepted by both INC and Muslim League; the Constituent Assembly was officially constituted under this plan.

---

## 📊 3. Composition & Seat Allocation (Cabinet Mission)

- **Total Strength:** **389 Members**
  - **British India (296 Seats - Elected):**
    - 292 from 11 Governor's Provinces.
    - 4 from Chief Commissioner's Provinces: **Delhi, Ajmer-Merwara, Coorg, and British Baluchistan** (*Memory Tip: ABCD*).
  - **Princely States (93 Seats - Nominated):** Nominated by rulers of princely states.
- **Ratio:** 1 seat per **1 Million (10 Lakh)** population.
- **Nature of Assembly:** Partly elected and partly nominated.
- **Election Method:** Indirect election by members of Provincial Legislative Assemblies via **Proportional Representation by means of Single Transferable Vote (STV)**.
- **Communities:** Divided into 3 categories: **Muslim, Sikh, and General** (all except Muslims & Sikhs).

### July–August 1946 Election Results:
- **INC (Congress):** 208 seats
- **Muslim League:** 73 seats
- **Others / Independents:** 15 seats
- **Post-Partition Strength (After Boycott):** Total seats reduced to **299** (229 British India + 70 Princely States).

---

## ⚖️ 4. Interim Government of India (Formed 2nd Sept 1946)

- Headed by Viceroy / Governor-General (**Lord Wavell** until Feb 1947; **Lord Mountbatten** from Feb 1947).

| Portfolio / Ministry | Member Assigned | Party |
| :--- | :--- | :--- |
| **Vice President, External Affairs & Commonwealth** | Jawaharlal Nehru | INC |
| **Home Affairs, Information & Broadcasting** | Sardar Vallabhbhai Patel | INC |
| **Food & Agriculture** | Dr. Rajendra Prasad | INC |
| **Defence** | Sardar Baldev Singh | INC |
| **Finance** | Liaquat Ali Khan | Muslim League |
| **Health** | Ghazanfar Ali Khan | Muslim League |
| **Labour** | Babu Jagjivan Ram | INC |
| **Law** | Jogendra Nath Mandal | Muslim League |
| **Education & Arts** | C. Rajagopalachari | INC |
| **Railways, Post & Air** | Abdur Rab Nishtar | Muslim League |
| **Industries & Supplies** | Dr. John Mathai | INC |
| **Commerce** | Ibrahim Ismail Chundrigar | Muslim League |
| **Commander-in-Chief** | Sir Claude Auchinleck | British |

---

## 🎯 5. Crucial Assembly Dates & Milestones

- **9th December 1946 (First Meeting):** 
  - Attended by 211 members; Muslim League boycotted.
  - **Dr. Sachchidananda Sinha** was elected as Temporary / Interim President (following the French convention of electing the oldest member).
- **11th December 1946:**
  - **Dr. Rajendra Prasad** elected as Permanent President.
  - **H. C. Mukherjee** & **V. T. Krishnamachari** elected as two Vice Presidents.
  - **Sir B. N. Rau** appointed as Constitutional Advisor.
- **13th December 1946 (Objective Resolution):**
  - Moved by **Jawaharlal Nehru**. Defined the guiding philosophy and constitutional structure.
  - Unanimously adopted on **22nd January 1947** (later modified to form the **Preamble**).
- **22nd July 1947:** National Flag of India adopted (Length to breadth ratio: 3:2; designed by Pingali Venkayya).
- **14th–15th August 1947:** Independence of India; Nehru delivered the iconic *"Tryst with Destiny"* speech before the Constituent Assembly.
- **May 1949:** India ratified its membership in the Commonwealth.
- **26th November 1949 (Constitution Day):** 
  - Constitution was formally **adopted and enacted**; signed by 284 members.
  - Articles enforced immediately: **Citizenship (Arts. 5–9)**, **Elections (Art. 324)**, and Provisional Parliament.
- **24th January 1950 (Last Official Session):**
  - National Anthem (*"Jana Gana Mana"* by Rabindranath Tagore) adopted.
  - National Song (*"Vande Mataram"* by Bankim Chandra Chatterjee) adopted.
  - Dr. Rajendra Prasad elected as the first President of India.
- **26th January 1950 (Republic Day):**
  - The Constitution officially came into full force / commencement.
  - *Why this date?* To commemorate **26th January 1930**, when *Purna Swaraj Day* was celebrated following the 1929 Lahore INC Session.

---

## ✒️ 6. The Drafting Committee (Set Up: 29 August 1947)

- **Chairman:** **Dr. B. R. Ambedkar** (*"Father of the Indian Constitution"*, *"Modern Manu"*).
- **Total Members:** 7 Members

### The 7 Illustrious Members:
1. **Dr. B. R. Ambedkar** (Chairman)
2. **Alladi Krishnaswamy Ayyar**
3. **N. Gopalaswami Ayyangar**
4. **Dr. K. M. Munshi**
5. **Syed Muhammad Saadullah**
6. **N. Madhava Rau** (*Replaced B. L. Mitter who resigned due to ill health*)
7. **T. T. Krishnamachari** (*Replaced D. P. Khaitan who passed away in 1948*)

> ⚠️ **Exam Trap:** Dr. B.R. Ambedkar was initially elected to the Constituent Assembly in July 1946 from **Bengal (East Bengal)**. After the partition of Bengal, that territory became East Pakistan. Hence, he was re-elected from **Bombay Presidency (Pune seat)** after M.R. Jayakar resigned.

### Readings of the Draft:
- **1st Draft Published:** 21st February 1948 (public was given 8 months to review).
- **1st Reading:** 4th Nov 1948 – 9th Nov 1948 (5 days).
- **2nd Reading (Clause-by-Clause):** 15th Nov 1948 – 17th Oct 1949 (10 months, 3 days).
- **3rd Reading:** Completed on 26th November 1949.

---

## 📂 7. Major & Minor Committees

The Assembly appointed **8 Major Committees** and **13 Minor Committees**:

### The 8 Major Committees:

| Committee Name | Chairman |
| :--- | :--- |
| **Union Powers Committee** | Jawaharlal Nehru |
| **Union Constitution Committee** | Jawaharlal Nehru |
| **States Committee (Negotiating with States)** | Jawaharlal Nehru |
| **Provincial Constitution Committee** | Sardar Vallabhbhai Patel |
| **Advisory Committee on FRs, Minorities & Tribal Areas** | Sardar Vallabhbhai Patel |
| **Rules of Procedure Committee** | Dr. Rajendra Prasad |
| **Steering Committee** | Dr. Rajendra Prasad |
| **Drafting Committee** | Dr. B. R. Ambedkar |

### Key Minor Committees:
- **Ad-hoc Committee on the National Flag:** Dr. Rajendra Prasad
- **Committee on Functions of Constituent Assembly:** G. V. Mavalankar
- **Order of Business Committee:** Dr. K. M. Munshi
- **House Committee:** B. Pattabhi Sitaramayya
- **Committee on Chief Commissioners' Provinces:** B. Pattabhi Sitaramayya
- **Ad-hoc Committee on Supreme Court:** S. Varadachariar
- **Linguistic Provinces Commission:** S. K. Dhar

---

## ⚡ 8. Dual Role of the Constituent Assembly

The Constituent Assembly had two distinct roles and met on separate days:
1. **As a Constitution-Making Body:** Chaired by **Dr. Rajendra Prasad**.
2. **As a Legislative Body (First Dominion Parliament):** Chaired by **G. V. Mavalankar** (who later became the first Speaker of the Lok Sabha).

---

## 💎 9. Significant One-Liner Facts & Trivia

- **Total Sessions:** 11 sessions spanning **165 days**.
- **Total Duration:** **2 Years, 11 Months, 18 Days**.
- **Total Expenditure:** Approximately **₹64 Lakhs**.
- **Original Document:** Consisted of **395 Articles**, **22 Parts**, and **8 Schedules** (plus Preamble).
- **Seal / Emblem of the Assembly:** **Elephant** (symbolizing colossal strength and vastness).
- **Constitutional Advisor:** **Sir B. N. Rau** (who prepared the initial raw draft).
- **Chief Draftsman:** **S. N. Mukherjee**.
- **Secretary to Assembly:** **H. V. R. Iengar**.
- **English Calligrapher:** **Prem Behari Narain Raizada** (wrote the original manuscript by hand in flowing italic calligraphy with a No. 303 nib).
- **Hindi Calligrapher:** **Vasant Krishan Vaidya**.
- **Artistic Illumination:** Hand-decorated by artists of Kala Bhavan, Shantiniketan, led by **Nandalal Bose** and **Beohar Rammanohar Sinha** (who designed the Preamble page).
- **Women Members (Total 15):** Key prominent figures included:
  - **Rajkumari Amrit Kaur:** India's first Health Minister.
  - **Sucheta Kripalani:** India's first woman Chief Minister (Uttar Pradesh).
  - **Sarojini Naidu:** India's first woman Governor (Uttar Pradesh).`
  },
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

// Helper functions for responsive markdown tables
const extractCells = (row: string): string[] => {
  let trimmed = row.trim();
  if (trimmed.startsWith('|')) trimmed = trimmed.substring(1);
  if (trimmed.endsWith('|')) trimmed = trimmed.substring(0, trimmed.length - 1);
  return trimmed.split('|').map(c => c.trim());
};

const isSeparatorRow = (row: string): boolean => {
  const clean = row.replace(/[|\s]/g, '');
  return clean.length > 0 && /^[:-]+$/.test(clean);
};

const getAlignments = (sepRow: string): ('left' | 'center' | 'right')[] => {
  const cells = extractCells(sepRow);
  return cells.map(col => {
    if (col.startsWith(':') && col.endsWith(':')) return 'center';
    if (col.endsWith(':')) return 'right';
    return 'left';
  });
};

// Rich Inline Markdown Parser for bold, italic, code badge, highlights, and links
export const parseInlineMarkdown = (text: string, keyPrefix: string = 'inline'): React.ReactNode[] => {
  if (!text) return [];

  // Match bold (**text**), italic (*text*), code (`text`), highlight (==text==), and link ([text](url))
  const tokenRegex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|==[^=]+==|\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, index) => {
    const k = `${keyPrefix}-${index}`;
    if (!part) return null;

    // Bold (**text**)
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      return (
        <strong key={k} className="font-extrabold text-slate-900 dark:text-white">
          {parseInlineMarkdown(part.slice(2, -2), `${k}-b`)}
        </strong>
      );
    }

    // Italic (*text*)
    if (part.startsWith('*') && part.endsWith('*') && part.length >= 2) {
      return (
        <em key={k} className="italic text-slate-700 dark:text-slate-300">
          {parseInlineMarkdown(part.slice(1, -1), `${k}-i`)}
        </em>
      );
    }

    // Inline Code / Badge (`code`)
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      return (
        <code
          key={k}
          className="px-1.5 py-0.5 mx-0.5 rounded-md bg-indigo-500/10 dark:bg-indigo-400/15 text-indigo-700 dark:text-indigo-300 font-mono text-xs font-bold border border-indigo-500/20"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    // Highlight (==text==)
    if (part.startsWith('==') && part.endsWith('==') && part.length >= 4) {
      return (
        <mark
          key={k}
          className="px-1.5 py-0.5 mx-0.5 rounded bg-amber-300/80 dark:bg-amber-400/30 text-slate-950 dark:text-amber-100 font-bold"
        >
          {parseInlineMarkdown(part.slice(2, -2), `${k}-hl`)}
        </mark>
      );
    }

    // Markdown link ([text](url))
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <a
          key={k}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium inline-flex items-center gap-0.5"
        >
          {linkMatch[1]}
        </a>
      );
    }

    return <React.Fragment key={k}>{part}</React.Fragment>;
  });
};

// Executive Publication-Grade Markdown Content Renderer for Study Notes
export const renderProfessionalNotesContent = (
  content: string,
  fontSize: 'base' | 'lg' | 'xl' = 'base'
): React.ReactNode => {
  if (!content) return null;

  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  const textSizeClass =
    fontSize === 'xl'
      ? 'text-base sm:text-lg leading-relaxed'
      : fontSize === 'lg'
      ? 'text-sm sm:text-base leading-relaxed'
      : 'text-xs sm:text-sm leading-relaxed';

  while (i < lines.length) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // 1. Skip completely empty lines
    if (!trimmed) {
      i++;
      continue;
    }

    // 2. Skip top-level Title (# Title) since modal displays title prominently
    if (trimmed.startsWith('# ')) {
      i++;
      continue;
    }

    // 3. Heading 2 (## Major Section)
    if (trimmed.startsWith('## ')) {
      const headingText = trimmed.replace(/^##\s+/, '').trim();
      elements.push(
        <div
          key={`h2-${i}`}
          className="flex items-center gap-3 mt-8 mb-4 pb-2 border-b border-slate-200/80 dark:border-white/10"
        >
          <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-indigo-500 via-indigo-600 to-purple-600 shrink-0 shadow-2xs" />
          <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
            {parseInlineMarkdown(headingText, `h2-${i}`)}
          </h3>
        </div>
      );
      i++;
      continue;
    }

    // 4. Heading 3 (### Sub-section)
    if (trimmed.startsWith('### ')) {
      const headingText = trimmed.replace(/^###\s+/, '').trim();
      elements.push(
        <h4
          key={`h3-${i}`}
          className="text-base sm:text-lg font-extrabold text-indigo-700 dark:text-indigo-300 mt-6 mb-3 flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
          <span>{parseInlineMarkdown(headingText, `h3-${i}`)}</span>
        </h4>
      );
      i++;
      continue;
    }

    // 5. Divider (--- or ***)
    if (trimmed === '---' || trimmed === '***') {
      elements.push(
        <div key={`hr-${i}`} className="flex items-center justify-center gap-3 my-8 select-none" aria-hidden="true">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent" />
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/50" />
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent" />
        </div>
      );
      i++;
      continue;
    }

    // 6. Code Block (``` ... ```)
    if (trimmed.startsWith('```')) {
      const lang = trimmed.replace(/^```/, '').trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      if (i < lines.length && lines[i].trim().startsWith('```')) {
        i++;
      }
      elements.push(
        <div
          key={`code-${i}`}
          className="my-5 rounded-2xl overflow-hidden border border-slate-800 bg-[#0D1117] text-[#E6EDF3] text-xs font-mono shadow-sm"
        >
          {lang && (
            <div className="px-4 py-1.5 bg-[#161B22] text-[11px] text-slate-400 font-bold border-b border-slate-800 uppercase tracking-wider">
              {lang}
            </div>
          )}
          <pre className="p-4 overflow-x-auto leading-relaxed custom-scrollbar font-mono">
            <code>{codeLines.join('\n')}</code>
          </pre>
        </div>
      );
      continue;
    }

    // 7. Math / Formula ($$ ... $$)
    if (trimmed.startsWith('$$') && trimmed.endsWith('$$') && trimmed.length > 4) {
      const formula = trimmed.slice(2, -2).trim();
      elements.push(
        <div
          key={`math-${i}`}
          className="my-5 p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/20 border border-indigo-200/60 dark:border-indigo-800/40 text-indigo-900 dark:text-indigo-200 font-mono text-xs sm:text-sm text-center shadow-2xs overflow-x-auto custom-scrollbar"
        >
          {formula}
        </div>
      );
      i++;
      continue;
    }

    // 8. Markdown Table (| Col 1 | Col 2 |)
    if (trimmed.startsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }

      if (tableLines.length >= 2) {
        const headerLine = tableLines[0];
        let sepLine = '';
        const bodyLines: string[] = [];

        for (let t = 1; t < tableLines.length; t++) {
          if (!sepLine && isSeparatorRow(tableLines[t])) {
            sepLine = tableLines[t];
          } else {
            bodyLines.push(tableLines[t]);
          }
        }

        const alignments = sepLine ? getAlignments(sepLine) : [];
        const headerCells = extractCells(headerLine);

        elements.push(
          <div
            key={`table-${i}`}
            className="my-6 overflow-hidden rounded-2xl border border-slate-200/90 dark:border-white/10 shadow-sm bg-white dark:bg-[#121526]"
          >
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-100 to-slate-50 dark:from-[#181B2E] dark:to-[#161829] border-b border-slate-200/80 dark:border-white/10">
                    {headerCells.map((h, hIdx) => {
                      const align = alignments[hIdx] || 'left';
                      return (
                        <th
                          key={hIdx}
                          className={`py-3.5 px-4 text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 border-r border-slate-200/60 dark:border-white/5 last:border-r-0 ${
                            align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'
                          }`}
                        >
                          {parseInlineMarkdown(h, `th-${i}-${hIdx}`)}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
                  {bodyLines.map((rowStr, rIdx) => {
                    const cells = extractCells(rowStr);
                    return (
                      <tr
                        key={rIdx}
                        className={`transition-colors hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 ${
                          rIdx % 2 === 0 ? 'bg-transparent' : 'bg-slate-50/60 dark:bg-white/[0.02]'
                        }`}
                      >
                        {cells.map((cell, cIdx) => {
                          const align = alignments[cIdx] || 'left';
                          return (
                            <td
                              key={cIdx}
                              className={`py-3 px-4 text-xs sm:text-[13px] text-slate-700 dark:text-slate-300 border-r border-slate-100 dark:border-white/5 last:border-r-0 leading-relaxed font-normal ${
                                align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'
                              }`}
                            >
                              {parseInlineMarkdown(cell, `td-${i}-${rIdx}-${cIdx}`)}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
        continue;
      } else {
        elements.push(
          <p key={`p-${i}`} className={`my-3 text-slate-800 dark:text-slate-200 ${textSizeClass} font-normal`}>
            {parseInlineMarkdown(tableLines[0], `p-${i}`)}
          </p>
        );
        continue;
      }
    }

    // 9. Callout / Exam Trap / Note Block (> ...)
    if (trimmed.startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s*/, ''));
        i++;
      }
      const quoteText = quoteLines.join('\n');
      const isTrap = /⚠️|trap|warning|alert|danger|caution/i.test(quoteText);
      const isTip = /💡|tip|trick|shortcut|remember/i.test(quoteText);
      const isKey = /🔑|key|crucial|concept|highlight/i.test(quoteText);

      let cardBorder = 'border-indigo-500/40 border-l-4';
      let cardBg = 'bg-indigo-50/70 dark:bg-indigo-950/25';
      let titleColor = 'text-indigo-700 dark:text-indigo-300';
      let textColor = 'text-slate-800 dark:text-slate-200';
      let iconColor = 'text-indigo-600 dark:text-indigo-400';
      let calloutTitle = 'Important Note';
      let IconComponent = BookOpen;

      if (isTrap) {
        cardBorder = 'border-amber-500/60 border-l-4';
        cardBg = 'bg-amber-50/80 dark:bg-amber-950/25';
        titleColor = 'text-amber-800 dark:text-amber-300';
        textColor = 'text-amber-950 dark:text-amber-100';
        iconColor = 'text-amber-600 dark:text-amber-400';
        calloutTitle = 'Exam Trap & High-Yield Alert';
        IconComponent = AlertCircle;
      } else if (isTip) {
        cardBorder = 'border-emerald-500/60 border-l-4';
        cardBg = 'bg-emerald-50/80 dark:bg-emerald-950/25';
        titleColor = 'text-emerald-800 dark:text-emerald-300';
        textColor = 'text-emerald-950 dark:text-emerald-100';
        iconColor = 'text-emerald-600 dark:text-emerald-400';
        calloutTitle = 'Exam Shortcut & Pro Tip';
        IconComponent = Lightbulb;
      } else if (isKey) {
        cardBorder = 'border-purple-500/60 border-l-4';
        cardBg = 'bg-purple-50/80 dark:bg-purple-950/25';
        titleColor = 'text-purple-800 dark:text-purple-300';
        textColor = 'text-purple-950 dark:text-purple-100';
        iconColor = 'text-purple-600 dark:text-purple-400';
        calloutTitle = 'Core Concept';
        IconComponent = Zap;
      }

      elements.push(
        <div
          key={`callout-${i}`}
          className={`my-5 p-4 sm:p-5 rounded-r-2xl rounded-l-md border ${cardBorder} ${cardBg} shadow-2xs transition-all`}
        >
          <div className="flex items-center gap-2 mb-2 font-black text-xs uppercase tracking-wider">
            <IconComponent className={`w-4 h-4 shrink-0 ${iconColor}`} />
            <span className={titleColor}>{calloutTitle}</span>
          </div>
          <div className={`text-xs sm:text-sm leading-relaxed ${textColor} font-medium`}>
            {parseInlineMarkdown(quoteText, `callout-${i}`)}
          </div>
        </div>
      );
      continue;
    }

    // 10. Checkbox item (- [ ] or - [x])
    const checkMatch = rawLine.match(/^(\s*)([-*])\s+\[([ xX])\]\s+(.*)/);
    if (checkMatch) {
      const indent = checkMatch[1].length;
      const isChecked = checkMatch[3].toLowerCase() === 'x';
      const text = checkMatch[4];
      const isNested = indent >= 2;
      elements.push(
        <div
          key={`check-${i}`}
          className={`flex items-start gap-2.5 my-2 ${isNested ? 'ml-6 sm:ml-8 my-1.5' : ''}`}
        >
          <span
            className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
              isChecked
                ? 'bg-indigo-600 border-indigo-600 text-white'
                : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
            }`}
          >
            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
          </span>
          <div
            className={`flex-1 ${textSizeClass} ${
              isChecked ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-200'
            }`}
          >
            {parseInlineMarkdown(text, `check-${i}`)}
          </div>
        </div>
      );
      i++;
      continue;
    }

    // 11. Unordered List Item (- or *)
    const ulMatch = rawLine.match(/^(\s*)([-*])\s+(.*)/);
    if (ulMatch) {
      const indent = ulMatch[1].length;
      const itemText = ulMatch[3];
      const isDeepNested = indent >= 4;
      const isNested = indent >= 2;

      elements.push(
        <div
          key={`ul-${i}`}
          className={`flex items-start gap-3 my-2 ${
            isDeepNested ? 'ml-10 sm:ml-12 my-1' : isNested ? 'ml-5 sm:ml-7 my-1.5' : 'my-2'
          }`}
        >
          {isNested ? (
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 mt-2 shrink-0" />
          ) : (
            <span className="w-2 h-2 rounded-full bg-indigo-500 dark:bg-indigo-400 mt-2 shrink-0 ring-4 ring-indigo-500/15" />
          )}
          <div
            className={`flex-1 ${
              isNested ? 'text-xs sm:text-[13px] text-slate-600 dark:text-slate-300' : textSizeClass
            } text-slate-800 dark:text-slate-200`}
          >
            {parseInlineMarkdown(itemText, `ul-${i}`)}
          </div>
        </div>
      );
      i++;
      continue;
    }

    // 12. Ordered List Item (1. , 2. )
    const olMatch = rawLine.match(/^(\s*)(\d+)\.\s+(.*)/);
    if (olMatch) {
      const indent = olMatch[1].length;
      const num = olMatch[2];
      const itemText = olMatch[3];
      const isNested = indent >= 2;

      elements.push(
        <div
          key={`ol-${i}`}
          className={`flex items-start gap-3 my-2.5 ${isNested ? 'ml-6 sm:ml-8 my-1.5' : ''}`}
        >
          <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/80 dark:border-indigo-800/60 text-xs font-mono font-black flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
            {num}
          </span>
          <div className={`flex-1 ${textSizeClass} text-slate-800 dark:text-slate-200`}>
            {parseInlineMarkdown(itemText, `ol-${i}`)}
          </div>
        </div>
      );
      i++;
      continue;
    }

    // 13. Regular Paragraph
    elements.push(
      <p key={`p-${i}`} className={`my-3 text-slate-800 dark:text-slate-200 ${textSizeClass} font-normal`}>
        {parseInlineMarkdown(trimmed, `p-${i}`)}
      </p>
    );
    i++;
  }

  return <div className="space-y-1">{elements}</div>;
};

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
        if (Array.isArray(parsed) && parsed.length > 0) {
          const seedMap = new Map(INITIAL_DIGITAL_NOTES.map(s => [s.id, s]));
          const updatedNotes = parsed.map((n: DigitalNote) => {
            const seed = seedMap.get(n.id);
            if (seed && seed.updatedAt > n.updatedAt) {
              return { ...seed, isStarred: n.isStarred ?? seed.isStarred };
            }
            return n;
          });
          const existingIds = new Set(updatedNotes.map((n: DigitalNote) => n.id));
          const missingSeeds = INITIAL_DIGITAL_NOTES.filter(seed => !existingIds.has(seed.id));
          return [...missingSeeds, ...updatedNotes];
        }
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

  // 🛡️ Admin & Creator Mode States (Restricts Create, Edit, Delete to Admin only)
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem('syllabus3d_notes_admin_auth') === 'true';
    } catch {
      return false;
    }
  });
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [adminPasscodeInput, setAdminPasscodeInput] = useState('');
  const [adminPasscodeError, setAdminPasscodeError] = useState('');
  const [showAdminPasscode, setShowAdminPasscode] = useState(false);
  const [isChangingPasscode, setIsChangingPasscode] = useState(false);
  const [newPasscodeInput, setNewPasscodeInput] = useState('');
  const [passcodeSuccessMessage, setPasscodeSuccessMessage] = useState('');

  // Unlock Admin Mode
  const handleVerifyAdminPasscode = useCallback(() => {
    const currentSecret = localStorage.getItem('syllabus3d_notes_admin_passcode') || 'admin123';
    if (adminPasscodeInput.trim() === currentSecret) {
      soundManager.playCompleteChime();
      haptics.success();
      setIsAdmin(true);
      try {
        localStorage.setItem('syllabus3d_notes_admin_auth', 'true');
      } catch {}
      setIsAdminModalOpen(false);
      setAdminPasscodeInput('');
      setAdminPasscodeError('');
    } else {
      soundManager.playWarning();
      haptics.error();
      setAdminPasscodeError('Incorrect passcode. Default is "admin123" unless modified.');
    }
  }, [adminPasscodeInput]);

  // Lock / Exit Admin Mode (View as Student)
  const handleExitAdminMode = useCallback(() => {
    soundManager.playClick();
    haptics.light();
    setIsAdmin(false);
    try {
      localStorage.removeItem('syllabus3d_notes_admin_auth');
    } catch {}
  }, []);

  // Update Admin Passcode
  const handleUpdatePasscode = useCallback(() => {
    const currentSecret = localStorage.getItem('syllabus3d_notes_admin_passcode') || 'admin123';
    if (adminPasscodeInput.trim() !== currentSecret) {
      soundManager.playWarning();
      setAdminPasscodeError('Current passcode is incorrect.');
      return;
    }
    if (newPasscodeInput.trim().length < 4) {
      soundManager.playWarning();
      setAdminPasscodeError('New passcode must be at least 4 characters.');
      return;
    }

    try {
      localStorage.setItem('syllabus3d_notes_admin_passcode', newPasscodeInput.trim());
      soundManager.playCompleteChime();
      haptics.success();
      setPasscodeSuccessMessage('Admin passcode updated successfully!');
      setTimeout(() => {
        setPasscodeSuccessMessage('');
        setIsChangingPasscode(false);
        setAdminPasscodeInput('');
        setNewPasscodeInput('');
        setAdminPasscodeError('');
      }, 1500);
    } catch {
      setAdminPasscodeError('Could not save passcode to local storage.');
    }
  }, [adminPasscodeInput, newPasscodeInput]);

  // Optional Cloud sync to Firestore public collection if Firebase is configured
  const syncNotesToCloudIfConfigured = async (updatedNotes: DigitalNote[]) => {
    try {
      const { initFirebase } = await import('../../services/firebase');
      const { db, isConfigured } = initFirebase();
      if (isConfigured && db) {
        const { doc, setDoc } = await import('firebase/firestore');
        const docRef = doc(db, 'public_notes', 'digital_notes_library');
        await setDoc(docRef, {
          notes: updatedNotes,
          updatedAt: new Date().toISOString(),
          version: '1.0'
        }, { merge: true });
      }
    } catch (err) {
      console.warn('Optional Firestore notes sync skipped:', err);
    }
  };

  // Sync official notes from Firestore public collection on mount if available
  useEffect(() => {
    let isMounted = true;
    import('../../services/firebase').then(({ initFirebase }) => {
      const { db, isConfigured } = initFirebase();
      if (isConfigured && db) {
        import('firebase/firestore').then(({ doc, getDoc }) => {
          const docRef = doc(db, 'public_notes', 'digital_notes_library');
          getDoc(docRef).then(snap => {
            if (!isMounted) return;
            if (snap.exists()) {
              const data = snap.data();
              if (Array.isArray(data?.notes) && data.notes.length > 0) {
                setNotes(data.notes);
              }
            }
          }).catch(() => {});
        });
      }
    }).catch(() => {});
    return () => { isMounted = false; };
  }, []);

  // New/Edit Note Form States
  const [formTitle, setFormTitle] = useState('');
  const [formLanguage, setFormLanguage] = useState<NoteLanguage>('en');
  const [formSubject, setFormSubject] = useState('');
  const [formCategory, setFormCategory] = useState<NoteCategory>('concept');
  const [formTags, setFormTags] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formSummary, setFormSummary] = useState('');
  const [formCoverImage, setFormCoverImage] = useState('');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [promptStyle, setPromptStyle] = useState<'cinematic' | 'heritage' | 'nature' | 'science' | 'abstract'>('cinematic');
  const [promptCopied, setPromptCopied] = useState(false);

  // Curated Preset Card Visuals for Instant Selection
  const PRESET_CARD_COVERS = [
    { label: '🏰 Ancient Fort & History', url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80' },
    { label: '🌲 Mountains & Nature', url: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=800&q=80' },
    { label: '🏛️ Law & Constitution', url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80' },
    { label: '📐 Math & Equations', url: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80' },
    { label: '🔬 Biology & Anatomy', url: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80' },
    { label: '📈 Economy & RBI', url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80' },
    { label: '🌌 Space & Cosmos', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80' },
    { label: '📖 Library & Books', url: 'https://images.unsplash.com/photo-1507842229451-7f01beff9c0d?auto=format&fit=crop&w=800&q=80' }
  ];

  // Upload custom photo from device/mobile gallery
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) {
      alert('Please select an image smaller than 3MB for smooth mobile loading.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setFormCoverImage(result);
        soundManager.playClick();
        haptics.success();
      }
    };
    reader.readAsDataURL(file);
  };

  // Generate mobile-optimized 16:9 AI Image Prompt tailored to Topic Name
  const generateAiImagePrompt = useCallback((topicTitle: string, subjectName: string, style: 'cinematic' | 'heritage' | 'nature' | 'science' | 'abstract') => {
    const topic = topicTitle.trim() || subjectName.trim() || 'Education and Knowledge';
    switch (style) {
      case 'heritage':
        return `${topic}, majestic historical architecture, cinematic wide shot, golden hour sunlight, intricate stone craftsmanship, authentic ancient palace aesthetic, shot on 35mm lens, photorealistic 8k, National Geographic photography --ar 16:9 --no text, typography, watermark, logo, blurry, people faces`;
      case 'nature':
        return `${topic}, breathtaking atmospheric mountain valley, lush pristine wilderness, morning golden rays, volumetric lighting, photorealistic landscape, 8k resolution, award-winning travel photograph --ar 16:9 --no text, letters, watermark, distortion`;
      case 'science':
        return `${topic}, ultra-detailed 3D scientific visualization, elegant dark studio background, glowing cinematic accent lights, medical and technological render, octane render, 8k UHD, crisp macro details --ar 16:9 --no text, labels, numbers, watermark`;
      case 'abstract':
        return `${topic}, vintage scholarly still life, premium leather journal, antique brass compass and magnifying glass on aged rustic dark wooden table, warm candle illumination, cinematic depth of field, 8k --ar 16:9 --no text, writing, watermark`;
      case 'cinematic':
      default:
        return `${topic}, cinematic photography, majestic wide angle composition, warm dramatic lighting, clean background, award-winning photograph, 8k resolution, ultra-detailed --ar 16:9 --no text, typography, watermark, logo, blur`;
    }
  }, []);

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

  // Delete Note Handler (Restricted to Admin)
  const handleDeleteNote = useCallback((noteId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAdmin) {
      soundManager.playWarning();
      setAdminPasscodeError('Only Admin can delete digital notes.');
      setIsAdminModalOpen(true);
      return;
    }
    if (window.confirm('Are you sure you want to delete this digital note?')) {
      soundManager.playClick();
      haptics.warning();
      setNotes(prev => {
        const next = prev.filter(n => n.id !== noteId);
        syncNotesToCloudIfConfigured(next);
        return next;
      });
      if (activeReadingNote?.id === noteId) {
        setActiveReadingNote(null);
      }
    }
  }, [activeReadingNote, isAdmin]);

  // Open Create Modal (Restricted to Admin)
  const handleOpenCreateModal = useCallback(() => {
    if (!isAdmin) {
      soundManager.playWarning();
      setAdminPasscodeError('Only Admin can create new digital notes.');
      setIsAdminModalOpen(true);
      return;
    }
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
    setFormCoverImage('');
    setIsPreviewMode(false);
    setIsCreateModalOpen(true);
  }, [availableSubjects, isAdmin]);

  // Open Edit Modal (Restricted to Admin)
  const handleOpenEditModal = useCallback((note: DigitalNote, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAdmin) {
      soundManager.playWarning();
      setAdminPasscodeError('Only Admin can edit digital notes.');
      setIsAdminModalOpen(true);
      return;
    }
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
    setFormCoverImage(note.coverImage || '');
    setIsPreviewMode(false);
    setIsCreateModalOpen(true);
  }, [isAdmin]);

  // Save Note (Create or Update, Restricted to Admin)
  const handleSaveNote = useCallback(() => {
    if (!isAdmin) {
      alert('Security violation: Only Admin is permitted to save digital notes.');
      return;
    }
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
      setNotes(prev => {
        const next = prev.map(n =>
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
                coverImage: formCoverImage.trim() || undefined,
                readingTimeMinutes: estReadingTime,
                updatedAt: new Date().toISOString()
              }
            : n
        );
        syncNotesToCloudIfConfigured(next);
        return next;
      });
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
          coverImage: formCoverImage.trim() || undefined,
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
        coverImage: formCoverImage.trim() || undefined,
        readingTimeMinutes: estReadingTime,
        isStarred: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setNotes(prev => {
        const next = [newNote, ...prev];
        syncNotesToCloudIfConfigured(next);
        return next;
      });
    }

    setIsCreateModalOpen(false);
    setEditingNote(null);
  }, [formTitle, formLanguage, formSubject, formCategory, formTags, formContent, formSummary, formCoverImage, editingNote, activeReadingNote, isAdmin]);

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

  // 🏔️ Soft UI Neumorphic Card Configuration (matching user's reference travel/exploration card design)
  interface NoteCardVisual {
    coverImage: string;
    gradientFallback: string;
    accentColor: string;
    accentBg: string;
    shortSubject: string;
    subtitle: string;
  }

  const CURATED_NOTE_VISUALS: Record<string, NoteCardVisual> = {
    // Ecology & Environment (Mountains, forests, lush landscape — just like Mount Rainier in user's image!)
    ecology: {
      coverImage: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=800&q=80',
      gradientFallback: 'from-emerald-900 via-teal-950 to-slate-950',
      accentColor: 'text-emerald-500 dark:text-emerald-400',
      accentBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
      shortSubject: 'Ecology & Environment',
      subtitle: 'Trophic Cascades & Pyramids'
    },
    // Polity & Constitution (Supreme court, majestic pillars, law & justice)
    polity: {
      coverImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
      gradientFallback: 'from-rose-950 via-slate-900 to-slate-950',
      accentColor: 'text-rose-500 dark:text-rose-400',
      accentBg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
      shortSubject: 'भारतीय राजव्यवस्था (Polity)',
      subtitle: 'Part III • अनुच्छेद 12 से 35 (Fundamental Rights)'
    },
    // Quantitative Aptitude (Abstract math, formulas, chalk, geometry)
    aptitude: {
      coverImage: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80',
      gradientFallback: 'from-indigo-950 via-purple-950 to-slate-950',
      accentColor: 'text-indigo-500 dark:text-indigo-400',
      accentBg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
      shortSubject: 'Quantitative Aptitude',
      subtitle: 'Speed, Relative Velocity & Train Crossings'
    },
    // History & Heritage (Indian fortress, ancient architecture, 1857 Revolt)
    history: {
      coverImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
      gradientFallback: 'from-amber-950 via-stone-900 to-slate-950',
      accentColor: 'text-amber-500 dark:text-amber-400',
      accentBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
      shortSubject: 'आधुनिक भारत का इतिहास',
      subtitle: '1857 का प्रथम स्वतंत्रता संग्राम (Major Centers)'
    },
    // Biology & Science (Cardiology, anatomy, glowing medical science)
    biology: {
      coverImage: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80',
      gradientFallback: 'from-red-950 via-rose-900 to-slate-950',
      accentColor: 'text-rose-500 dark:text-rose-400',
      accentBg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
      shortSubject: 'General Science (Biology)',
      subtitle: 'Heart Anatomy & Double Circulatory System'
    },
    // Economics & Monetary Policy (Financial markets, RBI, banking)
    economy: {
      coverImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
      gradientFallback: 'from-blue-950 via-slate-900 to-slate-950',
      accentColor: 'text-blue-500 dark:text-blue-400',
      accentBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
      shortSubject: 'भारतीय अर्थव्यवस्था (Economy)',
      subtitle: 'RBI मौद्रिक नीति (Repo, CRR, SLR Tools)'
    }
  };

  const getNoteCardVisual = (note: DigitalNote, index: number): NoteCardVisual => {
    // If the note has a custom image added by the user
    if (note.coverImage && note.coverImage.trim()) {
      return {
        coverImage: note.coverImage.trim(),
        gradientFallback: 'from-slate-900 via-indigo-950 to-slate-950',
        accentColor: 'text-indigo-400',
        accentBg: 'bg-indigo-500/10 text-indigo-400',
        shortSubject: note.subject,
        subtitle: note.summary || note.title
      };
    }

    const s = `${note.subject} ${note.category} ${note.title}`.toLowerCase();
    if (s.includes('polity') || s.includes('संविधान') || s.includes('राजव्यवस्था') || s.includes('right')) {
      return CURATED_NOTE_VISUALS.polity;
    }
    if (s.includes('aptitude') || s.includes('math') || s.includes('formula') || s.includes('speed') || s.includes('distance')) {
      return CURATED_NOTE_VISUALS.aptitude;
    }
    if (s.includes('ecology') || s.includes('environment') || s.includes('पर्यावरण') || s.includes('पारिस्थितिकी')) {
      return CURATED_NOTE_VISUALS.ecology;
    }
    if (s.includes('history') || s.includes('इतिहास') || s.includes('1857') || s.includes('क्रांति')) {
      return CURATED_NOTE_VISUALS.history;
    }
    if (s.includes('biology') || s.includes('जीव विज्ञान') || s.includes('circulatory') || s.includes('heart') || s.includes('science')) {
      return CURATED_NOTE_VISUALS.biology;
    }
    if (s.includes('economy') || s.includes('economics') || s.includes('अर्थव्यवस्था') || s.includes('monetary') || s.includes('rbi')) {
      return CURATED_NOTE_VISUALS.economy;
    }

    const keys = Object.keys(CURATED_NOTE_VISUALS);
    const fallback = CURATED_NOTE_VISUALS[keys[index % keys.length]];
    return {
      ...fallback,
      shortSubject: note.subject,
      subtitle: note.summary || note.title
    };
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

          {/* Role-Based Controls: Admin vs Student View */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0">
            {isAdmin ? (
              <>
                {/* Admin Mode Status Badge */}
                <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-400/15 border border-amber-400/30 text-amber-300 font-bold text-xs shadow-xs select-none">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Admin / Creator Mode</span>
                </div>

                {/* Create New Note Button (Admin Only) */}
                <button
                  type="button"
                  onClick={handleOpenCreateModal}
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer border border-white/20"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Create New Note</span>
                </button>

                {/* Exit Admin Mode / Lock Button */}
                <button
                  type="button"
                  onClick={handleExitAdminMode}
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 text-xs font-semibold transition-all cursor-pointer"
                  title="Lock Admin Mode & View as Student"
                >
                  <Lock className="w-3.5 h-3.5 text-slate-300" />
                  <span className="hidden sm:inline">Student View</span>
                </button>
              </>
            ) : (
              <>
                {/* Student Read-Only Mode Badge */}
                <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-slate-200 font-semibold text-xs select-none">
                  <Lock className="w-3.5 h-3.5 text-indigo-300" />
                  <span>Student Mode (Read-Only)</span>
                </div>

                {/* Discreet Admin Login Button */}
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setAdminPasscodeError('');
                    setAdminPasscodeInput('');
                    setIsAdminModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-400/30 text-indigo-200 hover:text-white font-bold text-xs transition-all cursor-pointer shadow-xs"
                  title="Login as Admin to create or edit notes"
                >
                  <Key className="w-3.5 h-3.5 text-amber-400" />
                  <span>Admin Login</span>
                </button>
              </>
            )}
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
              : isAdmin
              ? 'You have not added any notes under this category yet. Click "Create New Note" to start your bilingual collection!'
              : 'No digital notes have been published in this section yet. When admin publishes notes, they will appear here.'}
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
            {isAdmin && (
              <button
                type="button"
                onClick={handleOpenCreateModal}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
              >
                + Create Note Now
              </button>
            )}
          </div>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW: Soft UI Neumorphic Travel/Exploration Cards (Image 1 Style) */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredNotes.map((note, index) => {
            const langBadge = getLanguageBadge(note.language);
            const visual = getNoteCardVisual(note, index);

            return (
              <div
                key={note.id}
                onClick={() => {
                  soundManager.playClick();
                  setActiveReadingNote(note);
                }}
                className="group relative bg-[#EEF1F6] dark:bg-[#121626] rounded-[32px] p-3.5 sm:p-4 border border-white/80 dark:border-white/[0.08] shadow-[14px_14px_28px_#c8ced8,-14px_-14px_28px_#ffffff] dark:shadow-[12px_12px_32px_rgba(0,0,0,0.65),-6px_-6px_22px_rgba(255,255,255,0.03)] hover:shadow-[18px_18px_36px_#bec5d0,-18px_-18px_36px_#ffffff] dark:hover:shadow-[16px_16px_40px_rgba(0,0,0,0.8),-8px_-8px_26px_rgba(255,255,255,0.04)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col gap-3.5 sm:gap-4 cursor-pointer"
              >
                {/* 1. Upper Photographic/Artistic Banner */}
                <div className="h-48 sm:h-52 relative rounded-[22px] overflow-hidden select-none shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)] bg-slate-900 flex flex-col justify-between p-3.5">
                  {/* Photo Cover Image with Smooth Scale */}
                  <img
                    src={visual.coverImage}
                    alt={note.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Atmospheric Vignette & Contrast Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />

                  {/* Banner Top Row: Language Badge & Action Controls */}
                  <div className="relative z-10 flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-black/40 backdrop-blur-md border border-white/20 text-white shadow-xs flex items-center gap-1.5 select-none">
                      <span>{langBadge.flag}</span>
                      <span>{langBadge.label}</span>
                    </span>

                    <div className="flex items-center gap-1.5" onClick={e => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={e => handleToggleStar(note.id, e)}
                        className={`w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-md border transition-all cursor-pointer ${
                          note.isStarred
                            ? 'bg-amber-500 text-white border-amber-400 shadow-sm'
                            : 'bg-black/35 text-white/80 hover:text-white border-white/20 hover:bg-black/60'
                        }`}
                        title={note.isStarred ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        <Star className={`w-3.5 h-3.5 ${note.isStarred ? 'fill-white' : ''}`} />
                      </button>
                      <button
                        type="button"
                        onClick={e => handleCopyNote(note, e)}
                        className="w-7 h-7 rounded-full flex items-center justify-center bg-black/35 hover:bg-black/60 backdrop-blur-md border border-white/20 text-white/80 hover:text-white transition-all cursor-pointer"
                        title="Copy note text"
                      >
                        {copyFeedbackId === note.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      {isAdmin && (
                        <>
                          <button
                            type="button"
                            onClick={e => handleOpenEditModal(note, e)}
                            className="w-7 h-7 rounded-full flex items-center justify-center bg-black/35 hover:bg-black/60 backdrop-blur-md border border-white/20 text-white/80 hover:text-white transition-all cursor-pointer"
                            title="Edit note"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={e => handleDeleteNote(note.id, e)}
                            className="w-7 h-7 rounded-full flex items-center justify-center bg-black/35 hover:bg-rose-600/80 backdrop-blur-md border border-white/20 text-white/80 hover:text-white transition-all cursor-pointer"
                            title="Delete note"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Banner Bottom Row: Clean Frosted Reading Time Pill only (No topic title on photo) */}
                  <div className="relative z-10 flex items-center justify-end">
                    <span className="px-3 py-1 rounded-full text-xs font-black tracking-wide bg-black/40 dark:bg-black/60 backdrop-blur-md border border-white/30 text-white shadow-sm shrink-0 whitespace-nowrap flex items-center gap-1.5 select-none">
                      <Clock className="w-3.5 h-3.5 text-amber-300" />
                      <span>{note.readingTimeMinutes || 3} min</span>
                    </span>
                  </div>
                </div>

                {/* 2. Lower Inset Beveled Tray with Floating Neumorphic Button */}
                <div className="bg-[#E5E9F1] dark:bg-[#0C0F1D] shadow-[inset_3px_3px_6px_#c2c8d4,inset_-3px_-3px_6px_#ffffff] dark:shadow-[inset_3px_3px_7px_rgba(0,0,0,0.65),inset_-1.5px_-1.5px_5px_rgba(255,255,255,0.03)] dark:border dark:border-white/[0.04] rounded-[22px] p-3.5 sm:p-4 flex items-center justify-between gap-3">
                  {/* Left Column: Metadata, Note Title & 3-Column Stats */}
                  <div className="flex flex-col gap-2 flex-1 min-w-0">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5 text-[11px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                        <span>{note.subject}</span>
                        <span className="text-slate-300 dark:text-slate-600">•</span>
                        <span className="text-slate-500 dark:text-slate-400 capitalize font-medium">{note.category}</span>
                      </div>
                      <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white line-clamp-1 mt-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                        {note.title}
                      </h3>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {note.summary || note.content.slice(0, 90).replace(/[#*`$]/g, '')}
                      </div>
                    </div>

                    {/* 3-Column Stats Row (Distance, Elevation, Duration style) */}
                    <div className="flex items-center gap-4 sm:gap-6 pt-1">
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-slate-800 dark:text-white tabular-nums">
                          {note.readingTimeMinutes || 3}m
                        </span>
                        <span className="text-[9px] sm:text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                          Duration
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-slate-800 dark:text-white capitalize truncate max-w-[85px]">
                          {langBadge.label}
                        </span>
                        <span className="text-[9px] sm:text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                          Language
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 capitalize">
                          {note.category}
                        </span>
                        <span className="text-[9px] sm:text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                          Type
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Floating Embossed Circular Button */}
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setActiveReadingNote(note);
                    }}
                    className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#EEF1F6] dark:bg-[#181C2E] border border-white/80 dark:border-white/10 shadow-[4px_4px_10px_#c2c8d4,-4px_-4px_10px_#ffffff] dark:shadow-[4px_4px_12px_rgba(0,0,0,0.6),-3px_-3px_8px_rgba(255,255,255,0.05)] hover:scale-106 active:scale-95 transition-all duration-200 flex items-center justify-center shrink-0 cursor-pointer group-hover:border-indigo-400/40"
                    title="Open Digital Note"
                  >
                    <Navigation className="w-5 h-5 fill-slate-700 dark:fill-indigo-300 stroke-none transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* LIST VIEW: Soft UI Neumorphic Rows */
        <div className="space-y-4 pb-2">
          {filteredNotes.map((note, index) => {
            const langBadge = getLanguageBadge(note.language);
            const visual = getNoteCardVisual(note, index);

            return (
              <div
                key={note.id}
                onClick={() => {
                  soundManager.playClick();
                  setActiveReadingNote(note);
                }}
                className="group relative bg-[#EEF1F6] dark:bg-[#121626] rounded-2xl p-3 sm:p-4 border border-white/80 dark:border-white/[0.08] shadow-[8px_8px_20px_#cad0db,-8px_-8px_20px_#ffffff] dark:shadow-[8px_8px_24px_rgba(0,0,0,0.6),-4px_-4px_16px_rgba(255,255,255,0.03)] hover:shadow-[12px_12px_28px_#bec5d0,-12px_-12px_28px_#ffffff] transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:-translate-y-0.5"
              >
                {/* Left Thumbnail Banner */}
                <div className="w-full sm:w-36 h-28 sm:h-24 rounded-xl overflow-hidden relative shrink-0 shadow-sm bg-slate-900">
                  <img
                    src={visual.coverImage}
                    alt={note.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute bottom-1.5 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/40 backdrop-blur-md text-white border border-white/20">
                    {langBadge.flag} {langBadge.label}
                  </span>
                  <span className="absolute top-1.5 right-2 px-2 py-0.5 rounded-full text-[10px] font-black bg-white/30 backdrop-blur-md text-white border border-white/30">
                    {note.readingTimeMinutes || 3}m
                  </span>
                </div>

                {/* Content Info */}
                <div className="space-y-1.5 flex-1 min-w-0 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                      {note.subject}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 capitalize">
                      {note.category}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                    {note.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                    {note.summary || note.content.slice(0, 140).replace(/[#*`$]/g, '')}
                  </p>

                  <div className="flex items-center gap-4 pt-1 text-[11px] text-slate-500 dark:text-slate-400 font-semibold">
                    <span>⏱️ {note.readingTimeMinutes || 3} min duration</span>
                    <span>•</span>
                    <span>🏷️ {note.tags.length} tags</span>
                  </div>
                </div>

                {/* Right Action Controls & Embossed Circular Button */}
                <div className="flex items-center gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/60 dark:border-white/5" onClick={e => e.stopPropagation()}>
                  <button
                    type="button"
                    onClick={e => handleToggleStar(note.id, e)}
                    className={`p-2 rounded-xl transition-all cursor-pointer ${
                      note.isStarred
                        ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/30'
                        : 'text-slate-400 hover:text-amber-500 hover:bg-slate-200/60 dark:hover:bg-slate-800'
                    }`}
                    title={note.isStarred ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Star className={`w-4 h-4 ${note.isStarred ? 'fill-amber-500' : ''}`} />
                  </button>

                  <button
                    type="button"
                    onClick={e => handleCopyNote(note, e)}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    title="Copy note text"
                  >
                    {copyFeedbackId === note.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>

                  {isAdmin && (
                    <>
                      <button
                        type="button"
                        onClick={e => handleOpenEditModal(note, e)}
                        className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
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
                    </>
                  )}

                  {/* Floating Circle Button */}
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setActiveReadingNote(note);
                    }}
                    className="w-10 h-10 rounded-full bg-[#EEF1F6] dark:bg-[#181C2E] border border-white/80 dark:border-white/10 shadow-[3px_3px_8px_#c2c8d4,-3px_-3px_8px_#ffffff] dark:shadow-[3px_3px_10px_rgba(0,0,0,0.6),-2px_-2px_6px_rgba(255,255,255,0.05)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
                    title="Open Note"
                  >
                    <Navigation className="w-4 h-4 fill-slate-700 dark:fill-indigo-300 stroke-none" />
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
              {/* Optional Cover Banner */}
              {activeReadingNote.coverImage && (
                <div className="relative w-full h-44 sm:h-64 rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 dark:border-white/10 shrink-0">
                  <img
                    src={activeReadingNote.coverImage}
                    alt={activeReadingNote.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-bold">
                    <span className="px-3 py-1 rounded-lg bg-black/50 backdrop-blur-md border border-white/20">
                      {activeReadingNote.subject}
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-black/50 backdrop-blur-md border border-white/20 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{activeReadingNote.readingTimeMinutes || 3} min read</span>
                    </span>
                  </div>
                </div>
              )}

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
                <span className="capitalize font-semibold text-indigo-600 dark:text-indigo-400">
                  {activeReadingNote.category}
                </span>
                {activeReadingNote.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-medium">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Formatted Markdown Reader Area */}
              <div className="text-slate-800 dark:text-slate-200 font-sans pb-8">
                {renderProfessionalNotesContent(activeReadingNote.content, readerFontSize)}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-[#141728] text-xs">
              <span className="text-slate-400">
                Created: {new Date(activeReadingNote.createdAt).toLocaleDateString()}
              </span>

              <div className="flex items-center gap-2">
                {isAdmin && (
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
                )}
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

              {/* 🖼️ Card Cover Picture & AI Prompt Generator Section */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#131628] border border-slate-200 dark:border-white/10 space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-indigo-500/15 text-indigo-500 flex items-center justify-center font-bold">
                      <ImageIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span>Card Cover Picture (कवर फोटो)</span>
                        <span className="text-[10px] text-slate-400 font-normal">• Optional</span>
                      </h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">
                        Upload custom picture, paste image URL, or choose from HD presets
                      </p>
                    </div>
                  </div>

                  {formCoverImage && (
                    <button
                      type="button"
                      onClick={() => setFormCoverImage('')}
                      className="text-[11px] font-bold text-rose-500 hover:text-rose-600 transition-colors cursor-pointer"
                    >
                      Remove Picture
                    </button>
                  )}
                </div>

                {/* Input Method: URL & Device Upload */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* Option 1: Direct Image URL */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      Paste Image URL (Direct Link)
                    </label>
                    <input
                      type="url"
                      value={formCoverImage.startsWith('data:') ? '' : formCoverImage}
                      onChange={e => setFormCoverImage(e.target.value)}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#181B2E] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  {/* Option 2: Upload from Device */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      Upload from Device / Gallery
                    </label>
                    <label className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-xl bg-white dark:bg-[#181B2E] border border-dashed border-slate-300 dark:border-white/20 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-all">
                      <Upload className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{formCoverImage.startsWith('data:') ? 'Change Selected Photo' : 'Select Photo from Device'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Live Card Header Preview if Picture Selected */}
                {formCoverImage && (
                  <div className="relative h-28 sm:h-32 rounded-xl overflow-hidden border border-white/20 shadow-inner bg-slate-900 flex items-center justify-center">
                    <img
                      src={formCoverImage}
                      alt="Cover preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    <span className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-black/60 backdrop-blur-md text-white border border-white/20">
                      ✓ Card Cover Preview (16:9 Aspect)
                    </span>
                  </div>
                )}

                {/* Quick 1-Click HD Presets */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                    Or Pick from Curated HD Presets (1-Click)
                  </label>
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
                    {PRESET_CARD_COVERS.map(preset => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => {
                          soundManager.playClick();
                          setFormCoverImage(preset.url);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 border ${
                          formCoverImage === preset.url
                            ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs'
                            : 'bg-white dark:bg-[#181B2E] border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#20243C]'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ✨ AI Image Prompt Generator Tool */}
                <div className="pt-2.5 border-t border-slate-200/80 dark:border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400">
                      <Wand2 className="w-3.5 h-3.5" />
                      <span>AI Image Prompt Generator (Midjourney / DALL-E / ChatGPT)</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const prompt = generateAiImagePrompt(formTitle, formSubject, promptStyle);
                        navigator.clipboard.writeText(prompt);
                        soundManager.playClick();
                        haptics.light();
                        setPromptCopied(true);
                        setTimeout(() => setPromptCopied(false), 2000);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer shadow-xs"
                      title="Copy prompt to clipboard"
                    >
                      {promptCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{promptCopied ? 'Copied!' : 'Copy Prompt'}</span>
                    </button>
                  </div>

                  <p className="text-[10.5px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    Neeche diye gaye prompt ko ChatGPT (DALL-E 3), Midjourney ya Leonardo.ai me paste karein. Yeh prompt mobile card ke liye bina text wali 16:9 cinematic photo generate karega:
                  </p>

                  {/* Style Pills for Prompt */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
                    {[
                      { id: 'cinematic', label: '📸 Cinematic Real' },
                      { id: 'heritage', label: '🏛️ Architecture/History' },
                      { id: 'nature', label: '🌿 Nature/Landscape' },
                      { id: 'science', label: '🔬 3D Science Render' },
                      { id: 'abstract', label: '📖 Classic Study' }
                    ].map(st => (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => setPromptStyle(st.id as any)}
                        className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold cursor-pointer transition-all shrink-0 ${
                          promptStyle === st.id
                            ? 'bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/40'
                            : 'bg-white/60 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-800'
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>

                  {/* Generated Prompt Box */}
                  <div className="p-2.5 rounded-xl bg-slate-900 text-amber-200/90 font-mono text-[10.5px] leading-relaxed select-all break-words border border-amber-500/20">
                    {generateAiImagePrompt(formTitle, formSubject, promptStyle)}
                  </div>
                </div>
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
      {/* 🔐 7. ADMIN PASSCODE VERIFICATION & SECURITY MODAL */}
      {isAdminModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md bg-white dark:bg-[#0E101B] rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden animate-scale-up">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/80 dark:border-white/10 bg-slate-50/80 dark:bg-[#141728]/80 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-500 flex items-center justify-center font-bold">
                  {isAdmin ? <ShieldCheck className="w-5 h-5 text-amber-500" /> : <Lock className="w-5 h-5 text-amber-500" />}
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>{isChangingPasscode ? 'Change Admin Passcode' : isAdmin ? 'Admin Security Hub' : 'Admin Passcode Verification'}</span>
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {isChangingPasscode
                      ? 'Update the secret creator passcode'
                      : isAdmin
                      ? 'Admin / Creator privileges active'
                      : 'Restricted area for content creator & admin'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsAdminModalOpen(false);
                  setIsChangingPasscode(false);
                  setAdminPasscodeInput('');
                  setNewPasscodeInput('');
                  setAdminPasscodeError('');
                  setPasscodeSuccessMessage('');
                }}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5 transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Alert message if student tried to edit */}
              {adminPasscodeError && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{adminPasscodeError}</span>
                </div>
              )}

              {/* Success message */}
              {passcodeSuccessMessage && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>{passcodeSuccessMessage}</span>
                </div>
              )}

              {!isChangingPasscode ? (
                <>
                  {!isAdmin ? (
                    <div className="space-y-3">
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        To protect your digital notes from unauthorized edits by other users, enter your admin passcode. Non-admin students will have <strong>read-only access</strong>.
                      </p>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          Admin Passcode
                        </label>
                        <div className="relative">
                          <input
                            type={showAdminPasscode ? 'text' : 'password'}
                            value={adminPasscodeInput}
                            onChange={e => {
                              setAdminPasscodeInput(e.target.value);
                              if (adminPasscodeError) setAdminPasscodeError('');
                            }}
                            onKeyDown={e => {
                              if (e.key === 'Enter') handleVerifyAdminPasscode();
                            }}
                            placeholder="Enter admin passcode (default: admin123)"
                            className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-[#181B2E] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                            autoFocus
                          />
                          <button
                            type="button"
                            onClick={() => setShowAdminPasscode(prev => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                            tabIndex={-1}
                          >
                            {showAdminPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        <p className="text-[11px] text-slate-400">
                          Default secret passcode is <code className="text-amber-500 font-mono font-bold">admin123</code>
                        </p>
                      </div>

                      <div className="pt-2 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleVerifyAdminPasscode}
                          className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-bold text-xs shadow-md shadow-amber-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                        >
                          <Key className="w-4 h-4" />
                          <span>Unlock Admin Mode</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-300 space-y-1">
                        <div className="font-bold flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-amber-500" />
                          <span>Admin Access Active</span>
                        </div>
                        <p className="text-[11px] opacity-90">
                          You have full control to create, edit, and delete digital notes. Other users will only see the read-only version.
                        </p>
                      </div>

                      <div className="space-y-2 pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            setIsChangingPasscode(true);
                            setAdminPasscodeInput('');
                            setNewPasscodeInput('');
                            setAdminPasscodeError('');
                          }}
                          className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-2"
                        >
                          <Key className="w-4 h-4 text-indigo-500" />
                          <span>Change Admin Passcode</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            handleExitAdminMode();
                            setIsAdminModalOpen(false);
                          }}
                          className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-2"
                        >
                          <Lock className="w-4 h-4 text-slate-400" />
                          <span>Lock & Switch to Student View</span>
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Current Passcode
                    </label>
                    <input
                      type="password"
                      value={adminPasscodeInput}
                      onChange={e => {
                        setAdminPasscodeInput(e.target.value);
                        if (adminPasscodeError) setAdminPasscodeError('');
                      }}
                      placeholder="Enter current passcode"
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#181B2E] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      New Passcode (Min 4 chars)
                    </label>
                    <input
                      type="password"
                      value={newPasscodeInput}
                      onChange={e => {
                        setNewPasscodeInput(e.target.value);
                        if (adminPasscodeError) setAdminPasscodeError('');
                      }}
                      onKeyDown={e => {
                        if (e.key === 'Enter') handleUpdatePasscode();
                      }}
                      placeholder="Enter new secret passcode"
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#181B2E] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsChangingPasscode(false);
                        setAdminPasscodeInput('');
                        setNewPasscodeInput('');
                        setAdminPasscodeError('');
                      }}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition-all cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleUpdatePasscode}
                      className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      <span>Save New Passcode</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Note */}
            <div className="px-6 py-3 border-t border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-[#141728] text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>Only Admin can create, edit, or delete notes. All other users have read-only access.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
