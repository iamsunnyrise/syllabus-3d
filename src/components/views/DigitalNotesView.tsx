import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
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
  Brain,
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
  Info,
  ArrowLeft,
  CheckCircle2
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
    id: 'note-polity-salient-features-en',
    title: 'Salient Features of Indian Constitution & The 12 Schedules (Comprehensive Exam Notes)',
    language: 'en',
    subject: 'Indian Polity (राजव्यवस्था)',
    category: 'concept',
    tags: ['Polity', 'Salient Features', '12 Schedules', 'Federalism', 'TEARS OF OLD PM', 'SSC CGL', 'UPSC'],
    summary: 'Master notes covering the lengthiest written constitution, federal vs unitary features, jurists opinions, separation of powers, and deep-dive into all 12 Schedules with mnemonics and 2024 classical languages.',
    readingTimeMinutes: 6,
    isStarred: true,
    coverImage: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
    createdAt: '2026-09-28T08:15:00Z',
    updatedAt: '2026-09-28T08:45:00Z',
    content: `# Salient Features of Indian Constitution & The 12 Schedules

> 🎯 **Exam-Ready Master Note:** A structured, high-yield guide to the salient features of the Indian Constitution, federal vs unitary dynamics, jurist perspectives, separation of powers, and an in-depth breakdown of all 12 Schedules with mnemonics (TEARS OF OLD PM) and 2024 Classical Language additions for UPSC CSE, State PCS, and SSC CGL.

The Constitution of India is unique in its contents and spirit. Though borrowed from almost every constitution in the world, it possesses several salient features that distinguish it from the constitutions of other nations.

---

## 📜 1. Lengthiest Written Constitution & Structural Growth

The Indian Constitution is the **lengthiest of all written constitutions in the world**. It is a comprehensive, elaborate, and detailed document.

### Structural Evolution (Original vs Present)

| Feature | Original (1949 Adoption) | Present Day (Post-Amendments) |
| :--- | :---: | :---: |
| **Preamble** | 1 | 1 |
| **Articles** | **395 Articles** | **448+ Articles** (grouped into 395) |
| **Parts** | **22 Parts** | **25 Parts** |
| **Schedules** | **8 Schedules** | **12 Schedules** |

- **Parts Added through Amendments:**
  - **Part IV-A:** Fundamental Duties (42nd CAA, 1976)
  - **Part IX-A:** The Municipalities (74th CAA, 1992)
  - **Part IX-B:** The Co-operative Societies (97th CAA, 2011)
  - **Part XIV-A:** Tribunals (42nd CAA, 1976)
- **Part Deleted:** **Part VII** (dealing with Part B States) was repealed by the **7th Constitutional Amendment Act, 1956**.

### Written vs Unwritten Constitution

| Dimension | Written Constitution | Unwritten Constitution |
| :--- | :--- | :--- |
| **Codification** | Formally compiled and structured in a single legal code | Not compiled in a single book; derived from customs, conventions, statutes |
| **Enactment** | Formally constituted by a dedicated Constituent Assembly | Grows organically over time (evolutionary) |
| **Constitutional Supremacy** | Constitution is Supreme (Judicial Review applies) | Parliament is Supreme (*Parliamentary Sovereignty*) |
| **Rigidity** | Generally rigid or blend of rigid and flexible | Highly flexible; easy to amend like ordinary laws |
| **Global Examples** | **India, USA, Australia, Germany** | **United Kingdom (UK), New Zealand, Israel** |

> 💡 **Amendment Definition:** A formal, legal alteration, addition, or deletion made to a law, statute, contract, or the constitutional document under the framework of **Article 368**.

---

## 🏛️ 2. Parliamentary Form of Government

The Constitution establishes the **Westminster Model** of Parliamentary Government both at the Centre and in the States, borrowed primarily from the **United Kingdom**.

### Core Pillars of the Parliamentary System:
- **Presence of Nominal and Real Executives:** The President is the *De jure* (titular) head of state, while the Prime Minister is the *De facto* (real) head of government.
- **Majority Party Rule:** The political party securing the majority of seats in the Lok Sabha forms the government.
- **Collective Responsibility (Article 75(3)):** The Council of Ministers is collectively responsible to the Lok Sabha (Lower House).
- **Leadership of Prime Minister / Chief Minister:** Plays a pivotal steering role in executive policymaking.
- **Bicameral Legislature:** Lok Sabha (House of the People) and Rajya Sabha (Council of States).

---

## 🤝 3. Federation with a Strong Centre (Quasi-Federal System)

The Indian Constitution establishes a federal system of government containing all usual characteristics of a federation, but with a significant tilt toward a strong central authority.

- **Article 1 of the Constitution:** Describes India as a **"Union of States"** rather than a "Federation of States". This signifies:
  1. Indian federation is NOT the result of an agreement among states (unlike the USA).
  2. No state has the right to secede from the Union.
- **Three-Tier Governance Structure:**
  1. **Union / Centre** (Central Government)
  2. **States** (State Governments)
  3. **Local Self-Government** (Panchayats & Municipalities — 73rd & 74th Amendments, 1992)

### Federal vs Unitary Characteristics

| Federal Features (संघीय लक्षण) | Unitary / Non-Federal Features (एकात्मक लक्षण) |
| :--- | :--- |
| **Dual Polity / Two Levels of Govt** | **Single Constitution** (one constitution for Union & States) |
| **Written Constitution** | **Single Citizenship** (Indian citizenship only; no state citizenship) |
| **Supremacy of the Constitution** | **Integrated & Unified Judiciary** (SC at apex, HCs below) |
| **Rigidity of the Constitution** | **All India Services (AIS - Art. 312)** (IAS, IPS, IFoS serve states but appointed by Centre) |
| **Independent Judiciary** | **Emergency Provisions (Arts. 352, 356, 360)** (Convert federal to unitary without formal amendment) |
| **Bicameralism** (Rajya Sabha & Lok Sabha) | **Appointment of Governor by Centre (Art. 155)** |
| **Division of Powers (Schedule 7 Lists)** | **Parliament's Power to Alter State Boundaries (Article 3)** |

### Famous Jurist Opinions on Indian Federalism

| Constitutional Scholar / Jurist | Famous Description / Comment | Significance for Exams |
| :--- | :--- | :--- |
| **Prof. K. C. Wheare** | *"Quasi-Federal"* (अर्ध-संघीय) | Emphasized that India is a unitary state with subsidiary federal features. |
| **Granville Seward Austin** | *"Cooperative Federalism"* (सहकारी संघवाद) | Highlighted mutual cooperation between Centre and States. |
| **Sir Ivor Jennings** | *"Federation with a centralising tendency"* | Pointed out strong central legislative and financial gravity. |
| **Morris Jones** | *"Bargaining Federalism"* (सौदाकारी संघवाद) | Reflected political negotiations between Centre and States. |

---

## ⚖️ 4. Separation of Powers & Constitutional Organs

The Constitution maintains a functional distribution of powers among the three organs of government, fortified by a system of **Checks and Balances**:

- **Legislature (Parliament & State Assemblies):** Function: **Makes Laws** (Enacts statutes, budgets, and policies).
- **Executive (President, PM, Chief Ministers & Bureaucracy):** Function: **Enforces & Carries out Laws**.
- **Judiciary (Supreme Court & High Courts):** Function: **Evaluates & Interprets Laws** (Exercises power of Judicial Review).

---

## 📋 5. The 12 Schedules & The "TEARS OF OLD PM" Master Mnemonic

The original Constitution of 1949 contained **8 Schedules**. Through constitutional amendments, **4 new Schedules (9, 10, 11, and 12)** were added, bringing the total to **12 Schedules**.

> 🧠 **Master Mnemonic — "TEARS OF OLD PM":**
> - **T** → **T**erritories (Schedule 1)
> - **E** → **E**moluments & Salaries (Schedule 2)
> - **A** → **A**ffirmations & Oaths (Schedule 3)
> - **R** → **R**ajya Sabha Seat Allocation (Schedule 4)
> - **S** → **S**cheduled Areas Administration (Schedule 5)
> - **O** → **O**ther Tribal Areas: Assam, Meghalaya, Tripura, Mizoram (Schedule 6)
> - **F** → **F**ederal Lists — Union, State, Concurrent (Schedule 7)
> - **O** → **O**fficial Languages (Schedule 8)
> - **L** → **L**and Reforms & Zamindari Abolition (Schedule 9)
> - **D** → **D**efection / Anti-Defection Law (Schedule 10)
> - **P** → **P**anchayat Raj (Schedule 11)
> - **M** → **M**unicipalities (Schedule 12)

### Complete Master Table of All 12 Schedules

| Schedule | Subject Matter | Key Provisions & Beneficiaries | Constitutional Source |
| :---: | :--- | :--- | :---: |
| **1st** | **Territories & States** | Names of States (28) and Union Territories (8) with their territorial extents | Articles 1 & 4 |
| **2nd** | **Emoluments & Allowances** | Salaries, allowances, and perks of: President, Governors, Speaker/Deputy Speaker of LS & SLAS, Chairman/Deputy Chairman of RS & SLCs, SC & HC Judges, CAG | Articles 59, 65, 75, 97, 125, 148, 158, 164, 186, 221 |
| **3rd** | **Oaths & Affirmations** | Forms of oath for: Union/State Ministers, MP/MLA Candidates, MPs & MLAs, Supreme Court & High Court Judges, CAG | Articles 75, 84, 99, 124, 146, 173, 188, 219 |
| **4th** | **Rajya Sabha Seats** | Allocation of seats in the Council of States (Rajya Sabha) to States and UTs | Articles 4(1) & 80(2) |
| **5th** | **Scheduled Areas & STs** | Administration and control of Scheduled Areas and Scheduled Tribes in 10 States | Article 244(1) |
| **6th** | **Tribal Areas in 4 States** | Administration of Tribal Areas in **Assam, Meghalaya, Tripura, Mizoram (AMTM)** | Articles 244(2) & 275(1) |
| **7th** | **Division of Powers (3 Lists)** | **Union List** (100), **State List** (61), **Concurrent List** (52) | Article 246 |
| **8th** | **Official Languages** | **22 Recognized Languages** (Originally 14) | Articles 344(1) & 351 |
| **9th** | **Land Reforms & Acts** | Validation of land reform acts and regulations (Originally immune to judicial review) | Added by **1st CAA, 1951** (Article 31-B) |
| **10th** | **Anti-Defection Law** | Disqualification of MPs and MLAs on grounds of defection | Added by **52nd CAA, 1985** (Articles 102 & 191) |
| **11th** | **Panchayati Raj** | Powers, authority, and responsibilities of Panchayats (**29 Functional Items**) | Added by **73rd CAA, 1992** (Article 243-G) |
| **12th** | **Municipalities** | Powers, authority, and responsibilities of Urban Local Bodies (**18 Functional Items**) | Added by **74th CAA, 1992** (Article 243-W) |

> ⚠️ **Exam Trap on Schedule 3 (Oaths):** The oaths of three supreme constitutional dignitaries are **NOT included in the 3rd Schedule**:
> 1. **President's Oath:** **Article 60**
> 2. **Vice-President's Oath:** **Article 69**
> 3. **Governor's Oath:** **Article 159**
> *(Examiners frequently ask this trick question in Prelims!)*

---

## 🏔️ 6. Schedule 5 vs Schedule 6 & The Ladakh Autonomy Issue

| Dimension | Schedule 5 (Scheduled Areas) | Schedule 6 (Tribal Areas) |
| :--- | :--- | :--- |
| **Geographic Coverage** | 10 States: Andhra Pradesh, Telangana, Chhattisgarh, Gujarat, Himachal Pradesh, Jharkhand, Madhya Pradesh, Maharashtra, Odisha, Rajasthan | **4 North-Eastern States:** **Assam, Meghalaya, Tripura, Mizoram** (*Mnemonic: AMTM*) |
| **Administrative Body** | **Tribes Advisory Council (TAC)** (consisting of up to 20 members, 3/4th ST MLAs) | **Autonomous District Councils (ADCs)** & Regional Councils (up to 30 members) |
| **Legislative Autonomy** | Governor can direct an act of Parliament/State Assembly not to apply | ADCs have direct law-making powers on land, forests, village councils, inheritance |
| **Judicial Powers** | Standard state judiciary operates | ADCs can constitute village courts to try customary disputes |

> 📌 **Why Schedule 6 was in News? (Current Affairs Linkage):**
> - **Ladakh Protests:** Demands for extension of the **Sixth Schedule** to the Union Territory of Ladakh to preserve its fragile Himalayan ecology, tribal identity (over 97% indigenous tribal population), and grant legislative autonomy through Autonomous District Councils (ADCs).

---

## 📑 7. Schedule 7: Division of Powers (The Three Lists)

Article 246 provides a three-fold distribution of legislative subjects between the Union and the States:

| List | Original Subjects | Current Subjects | Key Examples of Subjects |
| :--- | :---: | :---: | :--- |
| **Union List (List I)** | 97 | **100** | Defence, Atomic Energy, Arms & Ammunition, Foreign Affairs, Citizenship, Airways, Railways, Inter-State Trade, Banking, Insurance, Census. |
| **State List (List II)** | 66 | **61** | Public Order, Police, Prisons, Local Government, Public Health & Sanitation, Agriculture, Fisheries, Liquor, Betting & Gambling. |
| **Concurrent List (List III)** | 47 | **52** | Criminal Law, Marriage & Divorce, Civil Procedure, Education, Forests, Electricity, Trade Unions, Economic & Social Planning, Price Control. |

### The 42nd Constitutional Amendment Act, 1976 (High-Yield):
Transferred **5 subjects from State List to Concurrent List**:
1. **Education**
2. **Forests**
3. **Weights and Measures**
4. **Protection of Wild Animals and Birds**
5. **Administration of Justice** (constitution and organization of all courts except the Supreme Court and High Courts)

### Residuary Powers (Article 248):
- Any subject matter not enumerated in the Union, State, or Concurrent lists vests **exclusively in the Parliament**.
- **Origin:** Borrowed from the **Canadian Constitution** (In USA and Australia, residuary powers belong to the states).

### 5 Exceptional Scenarios where Parliament Legislate on State List:
1. **National Emergency (Article 250):** While a proclamation of national emergency is in operation.
2. **President's Rule (Article 356):** When state assembly is suspended or dissolved.
3. **Resolution by Rajya Sabha (Article 249):** If Rajya Sabha passes a resolution supported by not less than **two-thirds of members present and voting** declaring a state subject of national interest.
4. **Agreement between Two or More States (Article 252):** When legislatures of two or more states pass resolutions requesting Parliament to enact laws.
5. **Enforcement of International Treaties (Article 253):** To implement any international treaty, agreement, or convention.

---

## 🗣️ 8. Schedule 8: Official Languages & Classical Languages (2024 Update)

- **Original Number of Languages:** **14 Languages** in 1950.
- **Current Number of Languages:** **22 Languages**.

### Timeline of Constitutional Amendments adding Languages:
- **21st CAA 1967:** **Sindhi** was added as the 15th language.
- **71st CAA 1992:** **Konkani, Manipuri, Nepali (KMN)** added (16th, 17th, 18th).
- **92nd CAA 2003:** **Bodo, Dogri, Maithili, Santhali (BDMS)** added (19th, 20th, 21st, 22nd).
- **96th CAA 2011:** Substituted the word *"Oriya"* with **"Odia"**.

---

### Classical Languages of India (शास्त्रीय भाषाएं)

To be declared a Classical Language, a language must possess high antiquity of early texts/recorded history (1500–2000 years), valuable ancient heritage, and original literary tradition.

| Phase | Classical Languages | Year Recognized |
| :--- | :--- | :---: |
| **Initial 6 Classical Languages** | **Tamil** | 2004 |
| | **Sanskrit** | 2005 |
| | **Telugu** | 2008 |
| | **Kannada** | 2008 |
| | **Malayalam** | 2013 |
| | **Odia** | 2014 |
| **Newly Approved in October 2024 (Latest!)** | **Marathi** | 2024 |
| | **Pali** | 2024 |
| | **Prakrit** | 2024 |
| | **Assamese** | 2024 |
| | **Bengali** | 2024 |

> 🧠 **Mnemonic for the Initial 6:** *"Tu Shuru To Kar Mai Aariya"* → **T**amil, **S**anskrit, **T**elugu, **K**annada, **M**alayalam, **O**dia.  
> 🚨 **Current Affairs Flash:** India now has a total of **11 Classical Languages** after the Union Cabinet added 5 new languages in October 2024.

---

## 🛡️ 9. Schedules 9, 10, 11 & 12: Detailed Constitutional Landmark Analysis

### Schedule 9: Land Reforms & Zamindari Abolition
- **Added by:** **1st Constitutional Amendment Act, 1951** by the Provisional Parliament.
- **Original Purpose:** Protect land reform laws from being challenged in courts on the ground of violating Fundamental Rights (Article 31-B).
- **Landmark Case (I. R. Coelho v. State of Tamil Nadu, 2007):** The Supreme Court held that laws placed in the 9th Schedule after **24 April 1973** (date of *Kesavananda Bharati* judgment) are **open to judicial review** if they violate the Basic Structure of the Constitution.

### Schedule 10: Anti-Defection Law
- **Added by:** **52nd Constitutional Amendment Act, 1985** under Rajiv Gandhi's tenure.
- **Grounds of Disqualification:** Voluntarily giving up party membership, voting or abstaining contrary to party whip, independent member joining a party, nominated member joining after 6 months.
- **91st CAA, 2003 Amendment:** Omitted the exception regarding split by 1/3rd members; now requires **merger by at least 2/3rd members**.
- **Deciding Authority:** Speaker / Chairman of the House (*Kihoto Hollohan case, 1992: Speaker's decision is subject to judicial review*).

### Schedule 11: Panchayati Raj (Rural Local Government)
- **Added by:** **73rd Constitutional Amendment Act, 1992** (Came into effect on 24 April 1993 - *National Panchayati Raj Day*).
- **Article:** **Article 243-G**
- **Functional Items:** **29 Subjects** (Agriculture, Minor Irrigation, Rural Housing, Drinking Water, Roads, Poverty Alleviation, etc.).

### Schedule 12: Municipalities (Urban Local Government)
- **Added by:** **74th Constitutional Amendment Act, 1992** (Came into effect on 1 June 1993).
- **Article:** **Article 243-W**
- **Functional Items:** **18 Subjects** (Urban Planning, Regulation of Land Use, Water Supply, Public Health, Solid Waste Management, Slum Improvement, etc.).

---

## 🧾 10. Last-Minute Rapid Revision Sheet

> 🚀 **Sequence of Added Schedules:**
> - **1951 (1st CAA)** → **9th Schedule** (Land Reforms)  
> - **1985 (52nd CAA)** → **10th Schedule** (Anti-Defection)  
> - **1992 (73rd CAA)** → **11th Schedule** (Panchayats - 29 Matters)  
> - **1992 (74th CAA)** → **12th Schedule** (Municipalities - 18 Matters)

### High-Frequency Exam Numbers

- **395 → 448+:** Articles
- **22 → 25:** Parts
- **8 → 12:** Schedules
- **100, 61, 52:** Current Subjects in Union, State, and Concurrent Lists
- **5 Subjects:** Transferred from State to Concurrent List by 42nd CAA 1976
- **22 Languages:** Recognized in Schedule 8 (14 original + 1 Sindhi + 3 KMN + 4 BDMS)
- **11 Classical Languages:** Total in India (6 old + 5 added in Oct 2024)
- **29 vs 18:** Functional items in Schedule 11 (Panchayats) vs Schedule 12 (Municipalities)

> ✅ **Key Distinctions to Never Confuse:**
> 1. **Schedule 2 vs Schedule 3:** Schedule 2 deals with *Salaries & Allowances (E)*; Schedule 3 deals with *Oaths & Affirmations (A)*. (Remember: Salary first, then work/oath!).
> 2. **Schedule 5 vs Schedule 6:** Schedule 5 applies to 10 States; Schedule 6 applies ONLY to **Assam, Meghalaya, Tripura, Mizoram (AMTM)**.
> 3. **Panchayat Items vs Municipality Items:** Schedule 11 has **29 items** $(2 + 9 = 11)$; Schedule 12 has **18 items**.`
  },
  {
    id: 'note-polity-salient-features-hi',
    title: 'भारतीय राजव्यवस्था: संविधान की प्रमुख विशेषताएं एवं 12 अनुसूचियां (संपूर्ण परीक्षा नोट्स)',
    language: 'hi',
    subject: 'भारतीय राजव्यवस्था (Polity)',
    category: 'concept',
    tags: ['संविधान की विशेषताएं', '12 अनुसूचियां', 'संघवाद', 'TEARS OF OLD PM', 'UPSC', 'State PCS'],
    summary: 'विश्व का सबसे लंबा लिखित संविधान, एकात्मक व संघीय लक्षण, विचारकों के कथन, शक्ति पृथक्करण, एवं 12 अनुसूचियों का संपूर्ण विश्लेषण (2024 की 11 शास्त्रीय भाषाओं सहित)।',
    readingTimeMinutes: 6,
    isStarred: true,
    coverImage: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
    createdAt: '2026-09-28T08:15:00Z',
    updatedAt: '2026-09-28T08:45:00Z',
    content: `# भारतीय संविधान की प्रमुख विशेषताएं एवं 12 अनुसूचियां: संपूर्ण परीक्षा नोट्स

> 🎯 **परीक्षा उपयोगी मास्टर नोट:** भारतीय संविधान की प्रमुख विशेषताएं, एकात्मक बनाम संघीय लक्षण, न्यायविदों के प्रसिद्ध कथन, शक्ति पृथक्करण, 12 अनुसूचियों का विस्तृत विश्लेषण (TEARS OF OLD PM ट्रिक के साथ) एवं अक्टूबर 2024 में जुड़ी नई 5 शास्त्रीय भाषाओं का संपूर्ण कवरेज।

भारतीय संविधान अपने रूप, विस्तार और अंतर्वस्तु में विश्व का सबसे अनूठा संविधान है। यद्यपि इसके अधिकांश उपबंध विश्व के कई देशों के संविधानों से ग्रहण किए गए हैं, फिर भी इसमें कई ऐसी मौलिक विशेषताएं हैं जो इसे अन्य देशों के संविधानों से अलग पहचान दिलाती हैं।

---

## 📜 1. विश्व का सबसे लंबा लिखित संविधान एवं संरचनात्मक विकास

भारतीय संविधान **विश्व का सबसे विस्तृत और लंबा लिखित संविधान** है।

### मूल एवं वर्तमान संरचना की तुलना

| घटक | मूल संविधान (1949) | वर्तमान स्थिति (संशोधनों के बाद) |
| :--- | :---: | :---: |
| **प्रस्तावना (Preamble)** | 1 | 1 |
| **अनुच्छेद (Articles)** | **395 अनुच्छेद** | **448+ अनुच्छेद** (गणना की दृष्टि से 470+) |
| **भाग (Parts)** | **22 भाग** | **25 भाग** |
| **अनुसूचियां (Schedules)** | **8 अनुसूचियां** | **12 अनुसूचियां** |

- **संशोधनों द्वारा जोड़े गए नए भाग:**
  - **भाग IV-A:** मूल कर्तव्य (42वां संविधान संशोधन, 1976)
  - **भाग IX-A:** नगरपालिकाएं (74वां संविधान संशोधन, 1992)
  - **भाग IX-B:** सहकारी समितियां (97वां संविधान संशोधन, 2011)
  - **भाग XIV-A:** अधिकरण / ट्रिब्यूनल (42वां संविधान संशोधन, 1976)
- **हटाया गया भाग:** **भाग VII** (पहली अनुसूची के भाग ख के राज्य) को **7वें संविधान संशोधन अधिनियम, 1956** द्वारा समाप्त कर दिया गया।

### लिखित बनाम अलिखित संविधान की तुलना

| आधार | लिखित संविधान (Written) | अलिखित संविधान (Unwritten) |
| :--- | :--- | :--- |
| **संकलन** | एक सुव्यवस्थित एकल दस्तावेज में संहिताबद्ध | किसी एकल पुस्तक में संकलित नहीं; परंपराओं और कानूनों पर आधारित |
| **निर्माण** | विशेष संविधान सभा द्वारा विधिवत निर्मित | समय के साथ क्रमिक रूप से विकसित |
| **सर्वोच्चता** | **संविधान की सर्वोच्चता** (न्यायिक समीक्षा लागू) | **संसद की सर्वोच्चता** (Parliamentary Sovereignty) |
| **नम्यता** | सामान्यतः कठोर या कठोर व लचीले का मिश्रण | अत्यधिक लचीला; साधारण कानून की भांति संशोधनीय |
| **प्रमुख उदाहरण** | **भारत, अमेरिका, ऑस्ट्रेलिया** | **ब्रिटेन (UK), न्यूजीलैंड, इज़राइल** |

> 💡 **संविधान संशोधन की परिभाषा:** **अनुच्छेद 368** के अंतर्गत संविधान के किसी उपबंध में परिवर्तन, परिवर्धन या निरसन करने की औपचारिक संवैधानिक प्रक्रिया।

---

## 🏛️ 2. सरकार का संसदीय रूप (Parliamentary Form)

भारत ने अमेरिकी अध्यक्षीय प्रणाली के स्थान पर **ब्रिटिश संसदीय प्रणाली (वेस्टमिंस्टर मॉडल)** को अपनाया है, जो केंद्र और राज्य दोनों स्तरों पर लागू है।

### संसदीय प्रणाली के मुख्य स्तंभ:
- **नाममात्र एवं वास्तविक कार्यपालिका:** राष्ट्रपति नाममात्र के प्रमुख (*De jure*) होते हैं, जबकि प्रधानमंत्री वास्तविक प्रमुख (*De facto*) होते हैं।
- **बहुमत प्राप्त दल का शासन:** लोकसभा में जिस दल का बहुमत होता है, वही सरकार बनाता है।
- **सामूहिक उत्तरदायित्व (अनुच्छेद 75(3)):** मंत्रिपरिषद सामूहिक रूप से लोकसभा के प्रति उत्तरदायी होती है।
- **प्रधानमंत्री / मुख्यमंत्री का नेतृत्व:** कार्यपालिका का मार्गदर्शन करते हैं।
- **द्विसदनीय विधायिका:** लोकसभा (निम्न सदन) एवं राज्यसभा (उच्च सदन)।

---

## 🤝 3. मजबूत केंद्र के साथ एकात्मक झुकाव वाला संघ (संघीय ढांचा)

भारतीय संविधान में सामान्य संघीय लक्षण विद्यमान हैं, किंतु इसमें एकात्मकता का प्रबल झुकाव है।
- **अनुच्छेद 1:** भारत को "राज्यों का संघ" (**Union of States**) घोषित करता है, न कि राज्यों का फेडरेशन। इसके दो अर्थ हैं:
  1. भारतीय संघ राज्यों के बीच किसी समझौते का परिणाम नहीं है।
  2. किसी भी राज्य को संघ से अलग होने (विभक्त होने) का अधिकार नहीं है।
- **त्रि-स्तरीय शासन व्यवस्था (Three-tier Government):**
  1. **केंद्र सरकार (Union)**
  2. **राज्य सरकारें (States)**
  3. **स्थानीय स्वशासन (Local Bodies — 73वां एवं 74वां संशोधन, 1992)**

### संघीय बनाम एकात्मक लक्षण

| संघीय लक्षण (Federal Features) | एकात्मक लक्षण (Unitary Features) |
| :--- | :--- |
| **दोहरा शासन (केंद्र एवं राज्य सरकारें)** | **एकल संविधान (Single Constitution)** |
| **लिखित एवं सर्वोच्च संविधान** | **एकल नागरिकता (Single Citizenship)** |
| **संविधान की कठोरता (Rigidity)** | **एकीकृत न्यायपालिका (Integrated Judiciary)** |
| **स्वतंत्र न्यायपालिका (Independent Judiciary)** | **अखिल भारतीय सेवाएं (All India Services — Art. 312)** |
| **द्विसदनीय विधायिका (Bicameralism)** | **आपातकालीन उपबंध (Emergency Provisions — Arts. 352, 356, 360)** |
| **शक्तियों का विभाजन (7वीं अनुसूची की सूचियां)** | **राज्यपाल की केंद्र द्वारा नियुक्ति (अनुच्छेद 155)** |

### भारतीय संघवाद पर प्रमुख विचारकों/न्यायविदों के कथन

| विद्वान / न्यायविद | प्रसिद्ध कथन / उपाधि | परीक्षा में महत्व |
| :--- | :--- | :--- |
| **के. सी. व्हेयर (K.C. Wheare)** | **"अर्ध-संघीय" (Quasi-Federal)** | भारत को एकात्मक राज्य माना जिसमें गौण संघीय लक्षण हैं। |
| **ग्रैनविल ऑस्टिन (Granville Austin)** | **"सहकारी संघवाद" (Cooperative Federalism)** | केंद्र और राज्यों के बीच सक्रिय सहयोग पर बल दिया। |
| **आइवर जेनिंग्स (Ivor Jennings)** | **"केंद्रीयकरण की प्रवृत्ति वाला संघ"** | केंद्र के मजबूत वित्तीय व विधायी प्रभुत्व को रेखांकित किया। |
| **मॉरिस जोन्स (Morris Jones)** | **"सौदाकारी संघवाद" (Bargaining Federalism)** | केंद्र और राज्यों के बीच राजनीतिक सौदेबाजी को दर्शाया। |

---

## ⚖️ 4. शक्तियों का पृथक्करण (Separation of Powers)

सरकार के तीनों अंगों के बीच कार्यों और शक्तियों का स्पष्ट विभाजन है, साथ ही नियंत्रण और संतुलन (**Checks and Balances**) की व्यवस्था है:

- **विधायिका (Legislature / संसद):** कानून का निर्माण करती है।
- **कार्यपालिका (Executive / राष्ट्रपति, PM एवं मंत्रिपरिषद):** कानूनों को लागू एवं प्रशासित करती है।
- **न्यायपालिका (Judiciary / सुप्रीम कोर्ट एवं हाई कोर्ट):** कानूनों की व्याख्या एवं संवैधानिकता का मूल्यांकन (न्यायिक समीक्षा) करती है।

---

## 📋 5. 12 अनुसूचियां एवं "TEARS OF OLD PM" ट्रिक

मूल संविधान (1949) में **8 अनुसूचियां** थीं। संशोधनों के माध्यम से 4 नई अनुसूचियां जोड़कर अब कुल **12 अनुसूचियां** हैं।

> 🧠 **याद रखने की अचूक ट्रिक — "TEARS OF OLD PM":**
> - **T** → **T**erritories (1. राज्य एवं संघ राज्य क्षेत्र)
> - **E** → **E**moluments (2. वेतन एवं भत्ते)
> - **A** → **A**ffirmations & Oaths (3. शपथ एवं प्रतिज्ञान)
> - **R** → **R**ajya Sabha (4. राज्यसभा में सीटों का आवंटन)
> - **S** → **S**cheduled Areas (5. अनुसूचित क्षेत्रों का प्रशासन)
> - **O** → **O**ther Tribal Areas (6. पूर्वोत्तर के 4 जनजातीय राज्य — AMTM)
> - **F** → **F**ederal Lists (7. केंद्र-राज्य शक्तियों का विभाजन — 3 सूचियां)
> - **O** → **O**fficial Languages (8. 22 मान्यता प्राप्त भाषाएं)
> - **L** → **L**and Reforms (9. भूमि सुधार एवं जमींदारी प्रथा उन्मूलन)
> - **D** → **D**efection (10. दलबदल विरोधी कानून)
> - **P** → **P**anchayats (11. पंचायती राज — 29 विषय)
> - **M** → **M**unicipalities (12. नगर पालिकाएं — 18 विषय)

### 12 अनुसूचियों का संपूर्ण विवरण तालिका

| अनुसूची | विषय-वस्तु | मुख्य प्रावधान एवं संबंधित पदाधिकारी | संबंधित अनुच्छेद |
| :---: | :--- | :--- | :---: |
| **पहली (1st)** | **राज्य एवं संघ राज्य क्षेत्र** | 28 राज्यों और 8 केंद्र शासित प्रदेशों के नाम एवं सीमाएं | अनुच्छेद 1 एवं 4 |
| **दूसरी (2nd)** | **वेतन, भत्ते एवं विशेषाधिकार** | राष्ट्रपति, राज्यपाल, लोकसभा/विधानसभा अध्यक्ष, कैग (CAG), न्यायाधीशों के वेतन | अनुच्छेद 59, 65, 75, 97, 125, 148 |
| **तीसरी (3rd)** | **शपथ एवं प्रतिज्ञान के प्रारूप** | केंद्रीय/राज्य मंत्री, सांसद, विधायक, सुप्रीम कोर्ट/हाई कोर्ट न्यायाधीश, कैग | अनुच्छेद 75, 84, 99, 124, 173, 188 |
| **चौथी (4th)** | **राज्यसभा में सीटों का आवंटन** | राज्यों एवं केंद्र शासित प्रदेशों के लिए राज्यसभा सीटों का विवरण | अनुच्छेद 4(1) एवं 80(2) |
| **पांचवीं (5th)** | **अनुसूचित क्षेत्रों का प्रशासन** | 10 राज्यों में अनुसूचित क्षेत्रों और अनुसूचित जनजातियों का नियंत्रण | अनुच्छेद 244(1) |
| **छठी (6th)** | **4 पूर्वोत्तर राज्यों के जनजातीय क्षेत्र** | **असम, मेघालय, त्रिपुरा, मिजोरम (AMTM)** के जनजातीय प्रशासन | अनुच्छेद 244(2) एवं 275(1) |
| **सातवीं (7th)** | **शक्तियों का विभाजन (3 सूचियां)** | **संघ सूची** (100), **राज्य सूची** (61), **समवर्ती सूची** (52) | अनुच्छेद 246 |
| **आठवीं (8th)** | **मान्यता प्राप्त भाषाएं** | **22 आधिकारिक भाषाएं** (मूलतः 14 भाषाएं थीं) | अनुच्छेद 344(1) एवं 351 |
| **नौवीं (9th)** | **भूमि सुधार एवं जमींदारी उन्मूलन** | न्यायिक समीक्षा से संरक्षण (प्रथम संशोधन 1951 द्वारा जोड़ी गई) | **1st CAA, 1951** (अनुच्छेद 31-B) |
| **दसवीं (10th)** | **दलबदल विरोधी कानून** | संसद व विधानसभा सदस्यों की दलबदल आधार पर अयोग्यता | **52nd CAA, 1985** (अनुच्छेद 102, 191) |
| **ग्यारहवीं (11th)**| **पंचायती राज व्यवस्था** | पंचायतों की शक्तियां, प्राधिकार एवं जिम्मेदारियां (**29 कार्यात्मक विषय**) | **73rd CAA, 1992** (अनुच्छेद 243-G) |
| **बारहवीं (12th)**| **नगर पालिकाएं (शहरी स्थानीय निकाय)** | नगर पालिकाओं की शक्तियां एवं जिम्मेदारियां (**18 कार्यात्मक विषय**) | **74th CAA, 1992** (अनुच्छेद 243-W) |

> ⚠️ **तीसरी अनुसूची पर परीक्षा का जाल (Exam Trap):** तीन सर्वोच्च संवैधानिक पदों की शपथ **तीसरी अनुसूची में शामिल नहीं है**:
> 1. **राष्ट्रपति की शपथ:** **अनुच्छेद 60**
> 2. **उपराष्ट्रपति की शपथ:** **अनुच्छेद 69**
> 3. **राज्यपाल की शपथ:** **अनुच्छेद 159**
> *(प्रतियोगी परीक्षाओं में यह प्रश्न बार-बार अभ्यर्थियों को भ्रमित करने के लिए पूछा जाता है!)*

---

## 🏔️ 6. पांचवीं अनुसूची बनाम छठी अनुसूची एवं लद्दाख मुद्दा

| आयाम | पांचवीं अनुसूची (5th Schedule) | छठी अनुसूची (6th Schedule) |
| :--- | :--- | :--- |
| **भौगोलिक क्षेत्र** | 10 राज्य: आंध्र प्रदेश, तेलंगाना, छत्तीसगढ़, गुजरात, हिमाचल प्रदेश, झारखंड, मध्य प्रदेश, महाराष्ट्र, ओडिशा, राजस्थान | **पूर्वोत्तर के केवल 4 राज्य:** **असम, मेघालय, त्रिपुरा, मिजोरम (AMTM)** |
| **प्रशासनिक निकाय** | **जनजाति सलाहकार परिषद (TAC)** (अधिकतम 20 सदस्य) | **स्वायत्त जिला परिषदें (ADCs)** (अधिकतम 30 सदस्य) |
| **विधायी शक्तियां** | राज्यपाल संसद/विधानसभा के कानूनों को लागू न करने का निर्देश दे सकते हैं | ADCs को भूमि, वन, ग्राम प्रशासन और उत्तराधिकार पर प्रत्यक्ष कानून बनाने की शक्ति है |
| **न्यायिक शक्तियां** | सामान्य राज्य न्यायपालिका लागू होती है | ADCs को पारंपरिक विवादों के निपटारे हेतु ग्राम अदालतें गठित करने का अधिकार है |

> 📌 **छठी अनुसूची चर्चा में क्यों थी? (Current Affairs Linkage):**
> - **लद्दाख में विरोध प्रदर्शन:** केंद्र शासित प्रदेश लद्दाख (जिसमें 97% से अधिक जनजातीय आबादी है) की नाजुक हिमालयी पारिस्थितिकी और सांस्कृतिक पहचान की रक्षा हेतु वहां छठी अनुसूची के विस्तार और स्वायत्त जिला परिषदों (ADCs) के गठन की मांग की जा रही है।

---

## 📑 7. सातवीं अनुसूची: शक्तियों का त्रि-स्तरीय विभाजन

अनुच्छेद 246 के तहत केंद्र और राज्यों के मध्य विधायी विषयों का तीन सूचियों में स्पष्ट विभाजन किया गया है:

| सूची | मूल विषय | वर्तमान विषय | प्रमुख उदाहरण |
| :--- | :---: | :---: | :--- |
| **संघ सूची (Union List)** | 97 | **100** | रक्षा, परमाणु ऊर्जा, युद्ध एवं शांति, विदेश मामले, नागरिकता, रेलवे, वायुमार्ग, बैंकिंग, बीमा, जनगणना। |
| **राज्य सूची (State List)** | 66 | **61** | लोक व्यवस्था, पुलिस, जेल, स्थानीय स्वशासन, लोक स्वास्थ्य एवं स्वच्छता, कृषि, मत्स्य पालन, शराब, जुआ। |
| **समवर्ती सूची (Concurrent List)**| 47 | **52** | दंड विधि, विवाह एवं तलाक, सिविल प्रक्रिया, शिक्षा, वन, विद्युत, मजदूर संघ, आर्थिक एवं सामाजिक योजना। |

### 42वां संविधान संशोधन अधिनियम, 1976 (अति-महत्वपूर्ण):
इसके द्वारा **5 विषयों को राज्य सूची से समवर्ती सूची में स्थानांतरित** किया गया:
1. **शिक्षा (Education)**
2. **वन (Forests)**
3. **नाप-तौल (Weights and Measures)**
4. **वन्य जीवों एवं पक्षियों का संरक्षण (Protection of Wild Animals and Birds)**
5. **न्याय प्रशासन (Administration of Justice)** — सुप्रीम कोर्ट और हाई कोर्ट को छोड़कर अन्य सभी अधीनस्थ न्यायालयों का गठन।

### अवशिष्ट शक्तियां (Residuary Powers — अनुच्छेद 248):
- जो विषय तीनों सूचियों में वर्णित नहीं हैं, उन पर कानून बनाने का अनन्य अधिकार **संसद को प्राप्त है**।
- **स्रोत:** **कनाडा के संविधान** से प्रेरित (अमेरिका और ऑस्ट्रेलिया में अवशिष्ट शक्तियां राज्यों के पास हैं)।

### 5 विशेष परिस्थितियां जब संसद राज्य सूची पर कानून बना सकती है:
1. **राष्ट्रीय आपातकाल के समय (अनुच्छेद 250)**
2. **राष्ट्रपति शासन लागू होने पर (अनुच्छेद 356)**
3. **राज्यसभा द्वारा विशेष बहुमत (2/3) से प्रस्ताव पारित करने पर (अनुच्छेद 249)**
4. **दो या अधिक राज्यों की सहमति/प्रस्ताव पर (अनुच्छेद 252)**
5. **अंतरराष्ट्रीय संधियों एवं समझौतों को लागू करने हेतु (अनुच्छेद 253)**

---

## 🗣️ 8. आठवीं अनुसूची: 22 आधिकारिक भाषाएं एवं 11 शास्त्रीय भाषाएं (2024 अपडेट)

- **मूल संविधान में भाषाएं:** **14 भाषाएं** (1950 में)।
- **वर्तमान में कुल भाषाएं:** **22 भाषाएं**।

### भाषाएं जोड़ने वाले संविधान संशोधन:
- **21वां संशोधन, 1967:** **सिंधी (Sindhi)** को 15वीं भाषा के रूप में जोड़ा गया।
- **71वां संशोधन, 1992:** **कोंकणी, मणिपुरी, नेपाली (KMN)** को जोड़ा गया।
- **92वां संशोधन, 2003:** **बोडो, डोगरी, मैथिली, संथाली (BDMS)** को जोड़ा गया (कुल 22 हुईं)।
- **96वां संशोधन, 2011:** 'उड़िया' (Oriya) का नाम बदलकर **'ओडिया' (Odia)** किया गया।

---

### भारत की शास्त्रीय भाषाएं (Classical Languages of India)

शास्त्रीय भाषा का दर्जा पाने हेतु भाषा का प्रारंभिक ग्रंथों/इतिहास की उच्च प्राचीनता (1500–2000 वर्ष), मूल्यवान प्राचीन साहित्य और मौलिक साहित्यिक परंपरा आवश्यक है।

| चरण | शास्त्रीय भाषा | मान्यता वर्ष |
| :--- | :--- | :---: |
| **प्रारंभिक 6 शास्त्रीय भाषाएं** | **तमिल (Tamil)** | 2004 |
| | **संस्कृत (Sanskrit)** | 2005 |
| | **तेलुगु (Telugu)** | 2008 |
| | **कन्नड़ (Kannada)** | 2008 |
| | **मलयालम (Malayalam)** | 2013 |
| | **ओडिया (Odia)** | 2014 |
| **अक्टूबर 2024 में जुड़ीं 5 नई भाषाएं (ताजा अपडेट!)** | **मराठी (Marathi)** | 2024 |
| | **पाली (Pali)** | 2024 |
| | **प्राकृत (Prakrit)** | 2024 |
| | **असमिया (Assamese)** | 2024 |
| | **बांग्ला (Bengali)** | 2024 |

> 🧠 **प्रारंभिक 6 भाषाओं को याद रखने की ट्रिक:** *"तू शुरू तो कर मैं आरिया (ओडिया)"* → **तमिल, संस्कृत, तेलुगु, कन्नड़, मलयालम, ओडिया**।  
> 🚨 **करंट अफेयर्स अलर्ट:** अक्टूबर 2024 में केंद्रीय मंत्रिमंडल द्वारा 5 नई भाषाओं को मंजूरी मिलने के बाद अब भारत में कुल **11 शास्त्रीय भाषाएं** हो गई हैं।

---

## 🛡️ 9. नौवीं, दसवीं, ग्यारहवीं एवं बारहवीं अनुसूची का विश्लेषण

### नौवीं अनुसूची: भूमि सुधार एवं जमींदारी प्रथा उन्मूलन
- **जोड़ी गई:** **प्रथम संविधान संशोधन अधिनियम, 1951** द्वारा।
- **उद्देश्य:** भूमि सुधार कानूनों को मूल अधिकारों के उल्लंघन के आधार पर न्यायालय में चुनौती दिए जाने से सुरक्षा प्रदान करना (अनुच्छेद 31-B)।
- **ऐतिहासिक निर्णय (आई. आर. कोएल्हो बनाम तमिलनाडु राज्य, 2007):** सुप्रीम कोर्ट की 9 जजों की संविधान पीठ ने फैसला दिया कि **24 अप्रैल 1973** (केशवानंद भारती निर्णय की तिथि) के बाद नौवीं अनुसूची में शामिल किए गए कानूनों की **न्यायिक समीक्षा की जा सकती है**, यदि वे संविधान के बुनियादी ढांचे का उल्लंघन करते हों।

### दसवीं अनुसूची: दलबदल विरोधी कानून (Anti-Defection Law)
- **जोड़ी गई:** **52वें संविधान संशोधन अधिनियम, 1985** द्वारा (राजीव गांधी सरकार के समय)।
- **अयोग्यता के आधार:** स्वेच्छा से दल की सदस्यता छोड़ना, पार्टी व्हिप के विरुद्ध मतदान करना या अनुपस्थित रहना, निर्दलीय सदस्य का किसी दल में शामिल होना।
- **91वां संशोधन 2003:** पहले 1/3 सदस्यों के टूटने (split) को छूट थी, जिसे समाप्त कर दिया गया; अब कम से कम **2/3 सदस्यों का विलय (merger)** अनिवार्य है।
- **निर्णयकर्ता:** सदन का अध्यक्ष / सभापति (*किहोतो होलोहन केस 1992: अध्यक्ष का निर्णय न्यायिक समीक्षा के अधीन है*)।

### ग्यारहवीं अनुसूची: पंचायती राज
- **जोड़ी गई:** **73वें संविधान संशोधन अधिनियम, 1992** द्वारा (24 अप्रैल 1993 से प्रभावी — *राष्ट्रीय पंचायती राज दिवस*)।
- **अनुच्छेद:** **अनुच्छेद 243-G**
- **कार्यात्मक विषय:** **29 विषय** (कृषि, लघु सिंचाई, ग्रामीण आवास, पेयजल, सड़कें, गरीबी उन्मूलन आदि)।

### बारहवीं अनुसूची: नगर पालिकाएं
- **जोड़ी गई:** **74वें संविधान संशोधन अधिनियम, 1992** द्वारा (1 जून 1993 से प्रभावी)।
- **अनुच्छेद:** **अनुच्छेद 243-W**
- **कार्यात्मक विषय:** **18 विषय** (नगर नियोजन, भूमि उपयोग का नियमन, जलापूर्ति, ठोस अपशिष्ट प्रबंधन, मलिन बस्ती सुधार आदि)।

---

## 🧾 10. त्वरित पुनरीक्षण शीट (Last-Minute Rapid Revision)

> 🚀 **संशोधनों द्वारा जोड़ी गई 4 अनुसूचियों का कालक्रम:**
> - **1951 (1st CAA)** → **9वीं अनुसूची** (भूमि सुधार)  
> - **1985 (52nd CAA)** → **10वीं अनुसूची** (दलबदल विरोधी कानून)  
> - **1992 (73rd CAA)** → **11वीं अनुसूची** (पंचायती राज — 29 विषय)  
> - **1992 (74th CAA)** → **12वीं अनुसूची** (नगर पालिकाएं — 18 विषय)

### परीक्षा में बार-बार पूछे जाने वाले प्रमुख आंकड़े

- **395 → 448+:** अनुच्छेद (Articles)
- **22 → 25:** भाग (Parts)
- **8 → 12:** अनुसूचियां (Schedules)
- **100, 61, 52:** संघ, राज्य और समवर्ती सूची के वर्तमान विषय
- **5 विषय:** 42वें संशोधन 1976 द्वारा राज्य से समवर्ती सूची में भेजे गए
- **22 भाषाएं:** 8वीं अनुसूची में आधिकारिक भाषाएं (14 मूल + 8 जोड़ी गईं)
- **11 शास्त्रीय भाषाएं:** भारत में कुल शास्त्रीय भाषाएं (6 पुरानी + 5 नई 2024 में)
- **29 बनाम 18:** 11वीं अनुसूची (पंचायतों के 29 विषय: $2 + 9 = 11$) बनाम 12वीं अनुसूची (नगर पालिकाओं के 18 विषय)

> ✅ **कभी भ्रमित न होने वाले 3 मुख्य अंतर:**
> 1. **दूसरी बनाम तीसरी अनुसूची:** दूसरी में *वेतन एवं भत्ते (E)* हैं; तीसरी में *शपथ (A)* है (पहले वेतन तय होता है, फिर शपथ ली जाती है)।
> 2. **पांचवीं बनाम छठी अनुसूची:** पांचवीं 10 राज्यों में लागू है; छठी केवल पूर्वोत्तर के 4 राज्यों **(असम, मेघालय, त्रिपुरा, मिजोरम — AMTM)** में लागू है।
> 3. **अवशिष्ट शक्तियां:** भारत में संसद के पास हैं (कनाडा से ली गईं), जबकि अमेरिका और ऑस्ट्रेलिया में राज्यों के पास हैं।`
  },
  {
    id: 'note-polity-salient-features-bi',
    title: 'Salient Features of Indian Constitution & The 12 Schedules (संविधान की विशेषताएं एवं 12 अनुसूचियां - Dual-Coding Notes)',
    language: 'bilingual',
    subject: 'Indian Polity (राजव्यवस्था)',
    category: 'concept',
    tags: ['Polity', 'Salient Features', '12 Schedules', 'संविधान की विशेषताएं', 'UPSC', 'State PCS'],
    summary: 'द्वि-कोडिंग शिक्षण पद्धति (Dual-Coding) पर आधारित संपूर्ण परीक्षा नोट्स — English terms और Hindi व्याख्या के साथ 40% तीव्र स्मरण शक्ति।',
    readingTimeMinutes: 7,
    isStarred: true,
    coverImage: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
    createdAt: '2026-09-28T08:15:00Z',
    updatedAt: '2026-09-28T08:45:00Z',
    content: `# Salient Features of Indian Constitution & The 12 Schedules (संविधान की विशेषताएं एवं 12 अनुसूचियां)

> 🎯 **Bilingual Master Study Note:** Engineered with the **Dual-Coding Learning Method** (द्वि-कोडिंग पद्धति) — linking English constitutional terminology with in-depth Hindi conceptual clarity for 40% faster retention across UPSC CSE, State PCS, and SSC CGL.

The Constitution of India is the supreme law of the land (देश का सर्वोच्च विधान). It represents an extraordinary synthesis of world constitutions, custom-tailored to suit India's historical, cultural, and geographic diversity.

---

## 📜 1. Lengthiest Written Constitution (विश्व का सबसे लंबा लिखित संविधान)

India's Constitution is the most detailed and comprehensive written constitution in human history.

### Structural Evolution (संरचनात्मक विकास)

| Structural Dimension | Original Constitution (1949) | Present Status (संशोधनों के बाद) |
| :--- | :---: | :---: |
| **Preamble (प्रस्तावना)** | 1 | 1 |
| **Articles (अनुच्छेद)** | **395 Articles** | **448+ Articles** (470+ by sub-clauses) |
| **Parts (भाग)** | **22 Parts** | **25 Parts** |
| **Schedules (अनुसूचियां)** | **8 Schedules** | **12 Schedules** |

- **4 New Parts Added (जोड़े गए 4 नए भाग):**
  - **Part IV-A:** Fundamental Duties (मूल कर्तव्य — 42nd CAA, 1976)
  - **Part IX-A:** Municipalities (नगर पालिकाएं — 74th CAA, 1992)
  - **Part IX-B:** Co-operative Societies (सहकारी समितियां — 97th CAA, 2011)
  - **Part XIV-A:** Tribunals (अधिकरण — 42nd CAA, 1976)
- **Part Repealed (हटाया गया भाग):** **Part VII** was removed by the **7th Constitutional Amendment Act, 1956**.

### Written vs Unwritten Constitution (लिखित बनाम अलिखित)

| Parameter | Written Constitution (लिखित संविधान) | Unwritten Constitution (अलिखित संविधान) |
| :--- | :--- | :--- |
| **Codification (संहिताबद्धता)** | Formally written in a single unified text (एकल पुस्तक में संकलित) | Enacted over centuries through conventions, precedents, statutes |
| **Supremacy (सर्वोच्चता)** | **Constitution is Supreme** (संविधान सर्वोच्च है) | **Parliament is Supreme** (संसदीय संप्रभुता) |
| **Judicial Review (न्यायिक समीक्षा)** | Judiciary can strike down unconstitutional laws | Courts cannot invalidate acts of Parliament |
| **Examples (उदाहरण)** | **India, USA, Australia** | **United Kingdom (UK), New Zealand, Israel** |

---

## 🏛️ 2. Parliamentary Form of Government (सरकार का संसदीय रूप)

Borrowed from the **United Kingdom (UK)**, establishing the Westminster Model of democracy:

- **Executive & Legislature Interdependence:** The Executive (Council of Ministers) is drawn from and directly accountable to the Legislature.
- **Collective Responsibility (Article 75(3)):** Council of Ministers is collectively responsible to the **Lok Sabha** (सामूहिक उत्तरदायित्व).
- **Nominal vs Real Head:** President is the titular/nominal executive (*De jure*), while the Prime Minister is the real working executive (*De facto*).

---

## 🤝 3. Federation with Strong Centre (केंद्राभिमुख संघवाद)

Article 1 describes India as a **"Union of States"** (राज्यों का संघ). The Indian federal structure is unique because it blends federal autonomy with unitary emergency powers:

- **3-Tier Government:** Union → States → Local Bodies (Panchayats & Municipalities).

### Federal vs Unitary Features (संघीय बनाम एकात्मक लक्षण)

| Federal Features (संघीय लक्षण) | Unitary Features (एकात्मक लक्षण) |
| :--- | :--- |
| **Dual Government (दोहरी सरकार - केंद्र व राज्य)** | **Single Constitution (एकल संविधान)** |
| **Written & Supreme Constitution** | **Single Citizenship (एकल नागरिकता)** |
| **Rigidity for Federal Provisions (Art. 368)** | **Integrated Judiciary (एकीकृत न्यायपालिका)** |
| **Independent Judiciary (स्वतंत्र न्यायपालिका)** | **All India Services (अखिल भारतीय सेवाएं — Art. 312)** |
| **Bicameralism (द्विसदनीय व्यवस्था - LS & RS)** | **Emergency Powers (आपातकालीन उपबंध — Arts. 352, 356, 360)** |
| **Division of Powers (7th Schedule Lists)** | **Governor Appointed by Centre (राज्यपाल की नियुक्ति — Art. 155)** |

### Famous Jurist Opinions on Indian Federalism (विचारकों के कथन)

| Jurist / Scholar | Description / Quotation | Core Exam Takeaway |
| :--- | :--- | :--- |
| **K. C. Wheare** | *"Quasi-Federal"* (अर्ध-संघीय) | Unitary state with subsidiary federal features |
| **Granville Austin** | *"Cooperative Federalism"* (सहकारी संघवाद) | Focus on active inter-governmental coordination |
| **Sir Ivor Jennings** | *"Federation with centralising tendency"* | Strong gravitational pull toward New Delhi |
| **Morris Jones** | *"Bargaining Federalism"* (सौदाकारी संघवाद) | Political interplay and bargaining between Centre & States |

---

## ⚖️ 4. Separation of Powers (शक्तियों का पृथक्करण)

- **Legislature (विधायिका):** **Makes Laws** (संसद एवं राज्य विधानमंडल).
- **Executive (कार्यपालिका):** **Carries out / Implements Laws** (राष्ट्रपति, प्रधानमंत्री, मंत्रिपरिषद एवं नौकरशाही).
- **Judiciary (न्यायपालिका):** **Interprets Laws & Evaluates Constitutionality** (सर्वोच्च न्यायालय एवं उच्च न्यायालय).

---

## 📋 5. The 12 Schedules (12 अनुसूचियां & "TEARS OF OLD PM" Trick)

> 🧠 **Master Mnemonic — "TEARS OF OLD PM":**
> - **T:** **T**erritories & States (1st Schedule / राज्य व संघ राज्य क्षेत्र)
> - **E:** **E**moluments & Salaries (2nd Schedule / वेतन व भत्ते)
> - **A:** **A**ffirmations & Oaths (3rd Schedule / शपथ के प्रारूप)
> - **R:** **R**ajya Sabha Seat Allocation (4th Schedule / राज्यसभा में सीटें)
> - **S:** **S**cheduled Areas (5th Schedule / 10 राज्यों में अनुसूचित क्षेत्र)
> - **O:** **O**ther Tribal Areas — AMTM (6th Schedule / असम, मेघालय, त्रिपुरा, मिजोरम)
> - **F:** **F**ederal Lists (7th Schedule / संघ, राज्य, समवर्ती सूचियां)
> - **O:** **O**fficial Languages (8th Schedule / 22 आधिकारिक भाषाएं)
> - **L:** **L**and Reforms (9th Schedule / भूमि सुधार — 1st CAA 1951)
> - **D:** **D**efection (10th Schedule / दलबदल कानून — 52nd CAA 1985)
> - **P:** **P**anchayats (11th Schedule / पंचायती राज — 73rd CAA 1992, 29 विषय)
> - **M:** **M**unicipalities (12th Schedule / नगर पालिकाएं — 74th CAA 1992, 18 विषय)

### Complete 12 Schedules Matrix (संपूर्ण तालिका)

| Schedule | Subject Matter | Key Details | Constitutional Source |
| :---: | :--- | :--- | :---: |
| **1st** | **Territory of India** | Names & extent of 28 States & 8 Union Territories | Articles 1 & 4 |
| **2nd** | **Emoluments (वेतन)** | Salary & allowances of President, Governors, Speakers, Judges, CAG | Articles 59, 65, 75, 125, 148 |
| **3rd** | **Oaths (शपथ)** | Forms of oath for Ministers, MPs, MLAs, Judges, CAG | Articles 75, 84, 99, 124, 173 |
| **4th** | **Rajya Sabha Seats** | Allocation of seats in Rajya Sabha based on population | Articles 4(1) & 80(2) |
| **5th** | **Scheduled Areas** | Administration of Scheduled Areas in 10 States | Article 244(1) |
| **6th** | **Tribal Areas (AMTM)** | Administration of Tribal Areas in **Assam, Meghalaya, Tripura, Mizoram** | Articles 244(2) & 275(1) |
| **7th** | **Three Lists (3 सूचियां)** | **Union** (100), **State** (61), **Concurrent** (52) | Article 246 |
| **8th** | **Official Languages** | **22 Languages** (Originally 14) | Articles 344(1) & 351 |
| **9th** | **Land Reforms** | Acts protected from judicial review (Immunity diluted post-1973) | **1st CAA 1951** (Art. 31-B) |
| **10th** | **Anti-Defection** | Disqualification on grounds of defection | **52nd CAA 1985** (Arts. 102 & 191) |
| **11th** | **Panchayati Raj** | Panchayats' authority & powers (**29 Functional Matters**) | **73rd CAA 1992** (Art. 243-G) |
| **12th** | **Municipalities** | Urban local bodies' powers (**18 Functional Matters**) | **74th CAA 1992** (Art. 243-W) |

> ⚠️ **Exam Trap Alert (Schedule 3):** Oaths of **President (Art. 60)**, **Vice-President (Art. 69)**, and **Governor (Art. 159)** are specified in their respective articles, **NOT in the 3rd Schedule**!

---

## 🏔️ 6. Schedule 5 vs Schedule 6 & The Ladakh Issue

| Feature | 5th Schedule (5वीं अनुसूची) | 6th Schedule (6वीं अनुसूची) |
| :--- | :--- | :--- |
| **Coverage** | 10 States (AP, Telangana, CG, Gujarat, HP, Jharkhand, MP, MH, Odisha, Rajasthan) | **Only 4 North-East States:** **Assam, Meghalaya, Tripura, Mizoram (AMTM)** |
| **Administrative Body** | **Tribes Advisory Council (TAC)** | **Autonomous District Councils (ADCs)** |
| **Autonomy Level** | Advisory role to the Governor | Substantial legislative, judicial & financial autonomy |
| **Current Context** | Standard tribal belt protection | **Ladakh Protests:** Demanding 6th Schedule inclusion to safeguard fragile ecosystem & tribal culture |

---

## 📑 7. Schedule 7: Division of Powers (शक्तियों का विभाजन)

| List | Original Count | Current Count | Key Subjects Included |
| :--- | :---: | :---: | :--- |
| **Union List (संघ सूची)** | 97 | **100** | Defence, Atomic Energy, Foreign Affairs, Railways, Banking, Census, Airways |
| **State List (राज्य सूची)** | 66 | **61** | Police, Public Order, Public Health, Agriculture, Prisons, Local Government, Liquor |
| **Concurrent List (समवर्ती सूची)** | 47 | **52** | Criminal Law, Marriage & Divorce, Electricity, Education, Forests, Trade Unions |

### 42nd Amendment Act 1976 (5 Subjects Transferred to Concurrent List):
1. **Education (शिक्षा)**
2. **Forests (वन)**
3. **Weights & Measures (नाप-तौल)**
4. **Protection of Wild Animals & Birds (वन्यजीव संरक्षण)**
5. **Administration of Justice (न्याय प्रशासन)**

### Residuary Powers (अवशिष्ट शक्तियां — Article 248):
- Any matter not listed in the 3 lists belongs to **Parliament** (Canadian model).

### 5 Exceptional Cases: Parliament Legislating on State List:
1. **National Emergency (Article 250)**
2. **President's Rule (Article 356)**
3. **Rajya Sabha 2/3rd Resolution (Article 249)**
4. **Consent of 2 or More States (Article 252)**
5. **International Treaties & Agreements (Article 253)**

---

## 🗣️ 8. Schedule 8: 22 Official Languages & 11 Classical Languages

### Addition of 8 Languages:
- **21st CAA 1967:** **Sindhi** (15th language)
- **71st CAA 1992:** **Konkani, Manipuri, Nepali (KMN)** (16th, 17th, 18th)
- **92nd CAA 2003:** **Bodo, Dogri, Maithili, Santhali (BDMS)** (19th, 20th, 21st, 22nd)
- **96th CAA 2011:** Name changed from *"Oriya"* to *"Odia"*.

---

### Classical Languages of India (शास्त्रीय भाषाएं)

| Batch | Language | Recognition Year |
| :--- | :--- | :---: |
| **Initial 6 Classical Languages** | **Tamil** | 2004 |
| | **Sanskrit** | 2005 |
| | **Telugu** | 2008 |
| | **Kannada** | 2008 |
| | **Malayalam** | 2013 |
| | **Odia** | 2014 |
| **Newly Added in October 2024 (Latest!)** | **Marathi** | 2024 |
| | **Pali** | 2024 |
| | **Prakrit** | 2024 |
| | **Assamese** | 2024 |
| | **Bengali** | 2024 |

> 🧠 **Trick for Old 6:** *"Tu Shuru To Kar Mai Aariya"* (Tamil, Sanskrit, Telugu, Kannada, Malayalam, Odia).  
> 🚨 **2024 Current Affairs Fact:** Total Classical Languages in India is now **11**!

---

## 🛡️ 9. Schedules 9, 10, 11 & 12: Landmark Constitutional Evolution

- **9th Schedule (Land Reforms):** Added by **1st CAA 1951**. In *I.R. Coelho Case (2007)*, SC held laws added after **24 April 1973** are subject to judicial review if violating Basic Structure.
- **10th Schedule (Anti-Defection Law):** Added by **52nd CAA 1985**. Amended by **91st CAA 2003** (split exception removed; 2/3rd merger required).
- **11th Schedule (Panchayati Raj):** Added by **73rd CAA 1992** (**29 Functional Matters**; Art. 243-G). Effective 24 April 1993 (*Panchayati Raj Day*).
- **12th Schedule (Municipalities):** Added by **74th CAA 1992** (**18 Functional Matters**; Art. 243-W). Effective 1 June 1993.

---

## 🧾 10. Last-Minute Rapid Revision Sheet (त्वरित पुनरीक्षण)

> 🚀 **Added Schedules Chronology:**
> - **1951 (1st CAA)** → **9th Schedule**  
> - **1985 (52nd CAA)** → **10th Schedule**  
> - **1992 (73rd CAA)** → **11th Schedule** (29 Items)  
> - **1992 (74th CAA)** → **12th Schedule** (18 Items)

### Key Numbers to Remember:
- **395 → 448+:** Articles
- **22 → 25:** Parts
- **8 → 12:** Schedules
- **100, 61, 52:** Union, State, Concurrent items
- **22:** Official Languages
- **11:** Classical Languages (5 added in 2024)
- **29 vs 18:** Panchayat vs Municipality subjects ($2 + 9 = 11$)

> ✅ **Key Distinctions to Never Confuse:**
> 1. **Schedule 2 (Salaries) vs Schedule 3 (Oaths):** First Salary/Emoluments (2), then Work/Oath (3).
> 2. **Schedule 5 (10 States) vs Schedule 6 (Only AMTM):** Assam, Meghalaya, Tripura, Mizoram.
> 3. **Residuary Powers:** With Union/Parliament in India (Canada model); with States in US & Australia.`
  },
  {
    id: 'note-polity-making-constitution-en',
    title: 'Indian Polity: Making of the Constitution (Comprehensive Exam Notes)',
    language: 'en',
    subject: 'Indian Polity (राजव्यवस्था)',
    category: 'concept',
    tags: ['Polity', 'Making of Constitution', 'Constituent Assembly', 'Drafting Committee', 'UPSC', 'SSC CGL'],
    summary: 'Master reference notes covering historical timeline, Cabinet Mission Plan, Drafting Committee, Assembly committees, landmark dates, and high-yield facts.',
    readingTimeMinutes: 6,
    isStarred: true,
    coverImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    createdAt: '2026-09-27T18:00:00Z',
    updatedAt: '2026-09-28T08:45:00Z',
    content: `# Making of the Indian Constitution: Comprehensive Exam Notes

> 🎯 **Exam-Ready Master Note:** A structured, high-yield guide to the constitutional background, Constituent Assembly, Drafting Committee, major committees, landmark dates, and crucial facts for UPSC CSE, State PCS, SSC CGL & Judiciary.

The Constitution lays down the fundamental political principles of the state; establishes the structure, procedures, powers, and duties of government institutions; and defines citizens' Fundamental Rights, Directive Principles, and Fundamental Duties.

---

## 🏛️ 1. Constitutional Foundation & Forms of Government

- **Beginning of the modern written-Constitution tradition:** The United States Constitution of **1787**, following the American Declaration of Independence on **4 July 1776**.
- **Nature of the Indian Constitution:** A harmonious blend of **rigidity** and **flexibility**.
  - Federal provisions require a special amendment procedure under **Article 368** (two-thirds majority of Parliament plus ratification by half of state legislatures).
  - Certain ordinary provisions can be amended by a simple parliamentary majority (e.g., creation of new states under Article 3).
- **Core Concept Alert:** Democratic countries generally have constitutions, but every country with a constitution is not necessarily democratic.

### Forms of Government Comparison

| Form of Government | Meaning / Mechanism | Examples |
| :--- | :--- | :--- |
| **Democratic** | Government of the people, by the people, and for the people | India, USA, UK |
| **Communist** | The state controls the principal means and sources of production | China, North Korea, Cuba, Vietnam, Laos |
| **Monarchic** | Sovereign power is concentrated in a hereditary monarch or king | Saudi Arabia, Brunei |
| **Totalitarian** | Autocratic control extends over all public and private aspects of life | North Korea |
| **Oligarchic** | Power rests with a small, elite, privileged ruling segment | Iran, Russia |

---

## ⏳ 2. Historical Evolution & Timeline of Demands

### Indian Initiatives

| Year | Milestone / Development | Constitutional Significance |
| :---: | :--- | :--- |
| **1928** | **Nehru Report**, chaired by Motilal Nehru | Earliest indigenous draft of a constitutional framework (All-Parties Conference) |
| **1934** | **M. N. Roy** proposed an independent Constituent Assembly | First formal, explicit proposal for an Indian constituent body |
| **1935** | The **Indian National Congress (INC)** officially demanded a Constituent Assembly | Demand became an official part of the national political agenda |
| **1938** | **Jawaharlal Nehru** declared Constitution must be framed on basis of Adult Franchise | Rebuffed external interference; demanded election by universal adult suffrage |

### British Offers & Indian Responses

1. **August Offer (1940):**
   - Announced by Viceroy **Lord Linlithgow** on **8 August 1940** to gain Indian cooperation during World War II.
   - Promised post-war **Dominion Status** and expansion of Governor-General's Council.
   - *Rejected by INC*, which stood firm on **Purna Swaraj** (Complete Independence).
2. **Cripps Mission (1942):**
   - Headed by **Sir Stafford Cripps** (Member of British War Cabinet).
   - Proposed post-WWII Dominion Status and a constitution-making body.
   - *Rejected by all major parties:*
     - Jawaharlal Nehru: *"Dominion status is dead as a door nail."*
     - Mahatma Gandhi: *"A post-dated cheque on a crashing bank."*
3. **Wavell Plan & Shimla Conference (1945):**
   - Proposed by Viceroy **Lord Wavell** to break constitutional deadlock.
   - Restructure Governor-General's Executive Council with parity between caste Hindus and Muslims.
   - Failed because the Muslim League insisted that it alone had the right to nominate Indian Muslims.
4. **Cabinet Mission Plan (1946) — The Master Blueprint:**

> 🔑 **Master Blueprint:** The Constituent Assembly of India was officially constituted under the provisions of the **Cabinet Mission Plan of 1946**.

- Dispatched by British Prime Minister **Clement Attlee** with three Cabinet Ministers:
  1. **Lord Pethick-Lawrence** — Secretary of State for India *(Chairman)*
  2. **Sir Stafford Cripps** — President of the Board of Trade
  3. **A. V. Alexander** — First Lord of the Admiralty
- **Outcome:** Accepted by both INC and Muslim League; rejected the two-nation theory and separate Constituent Assemblies at the time.

---

## 📊 3. Composition of the Constituent Assembly

### Seat Allocation under Cabinet Mission Plan

| Category | Seats | Selection Method |
| :--- | :---: | :--- |
| Governor's Provinces (11 provinces) | 292 | Indirectly elected by Provincial Legislative Assemblies |
| Chief Commissioners' Provinces (4 provinces) | 4 | Indirectly elected (one from each province) |
| Princely States (Indian States) | 93 | Nominated by the respective rulers / princes |
| **Total Assembly Strength** | **389** | **Partly elected and partly nominated** |

- **British India Total:** 296 seats (292 + 4).
- **Representation Ratio:** Roughly **1 seat per 1 million people** (10 Lakh population).
- **Electoral System:** Indirect election via **Proportional Representation by means of the Single Transferable Vote (STV)**.
- **Three Recognized Communities:** **Muslim, Sikh, and General** (all others).

> 🧠 **Mnemonic — ABCD:** The 4 Chief Commissioners' Provinces were:
> - **A** → **Ajmer-Merwara**
> - **B** → **British Baluchistan**
> - **C** → **Coorg**
> - **D** → **Delhi**

### July–August 1946 Election Results (296 Seats)

| Political Group | Seats Won |
| :--- | :---: |
| **Indian National Congress (INC)** | **208** |
| **Muslim League** | **73** |
| **Others & Independents** | **15** |
| **Total British Indian Seats** | **296** |

### Post-Partition Strength (3 June 1947 Mountbatten Plan)
Following the creation of Pakistan, the Assembly's strength was reduced from **389 to 299**:
- **229** members from British Indian Provinces (down from 296)
- **70** members from Princely States (down from 93)

---

## ⚖️ 4. Interim Government of India (Formed 2 September 1946)

- Formed under the Cabinet Mission provisions.
- Headed by the Governor-General (**Lord Wavell** until Feb 1947; **Lord Mountbatten** thereafter).
- **Historic Nuance:** The Muslim League initially boycotted the Interim Government on 2 September 1946, but later joined on **26 October 1946** (5 League members joined after 3 INC members stepped down).

| Portfolio / Department | Member Assigned | Party Affiliation |
| :--- | :--- | :---: |
| **Vice-President; External Affairs & Commonwealth Relations** | Jawaharlal Nehru | INC |
| **Home Affairs; Information & Broadcasting** | Sardar Vallabhbhai Patel | INC |
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

## 🎯 5. Crucial Dates & Milestones (1946–1950)

- **9 December 1946 (First Historic Meeting):**
  - Attended by **211 members** in the Constitution Hall (now Central Hall of Parliament).
  - Boycotted by the Muslim League.
  - **Dr. Sachchidananda Sinha** was elected as Temporary President, following the **French convention** of honoring the oldest member.
- **11 December 1946 (Permanent Leadership Elected):**
  - **Dr. Rajendra Prasad** elected as Permanent President of the Assembly.
  - **H. C. Mukherjee** and **V. T. Krishnamachari** elected as two Vice-Presidents.
  - **Sir B. N. Rau** appointed as Constitutional Adviser.
- **13 December 1946 (Objectives Resolution Moved):**
  - Moved by **Jawaharlal Nehru**.
  - Laid down the philosophical foundations and guiding values of the Constitution.
  - Unanimously adopted on **22 January 1947**; later served as the foundation of the **Preamble**.
- **22 July 1947 (National Flag Adopted):**
  - Flag ratio: **3:2** (length to breadth).
  - Designed by **Pingali Venkayya**.
- **14–15 August 1947 (Independence):**
  - India achieved freedom; Jawaharlal Nehru delivered his iconic *"Tryst with Destiny"* speech before the Constituent Assembly.
- **May 1949 (Commonwealth Membership):**
  - India ratified its declaration of continued membership in the Commonwealth of Nations.
- **26 November 1949 (Constitution Adopted & Enacted):**
  - The Constitution was formally adopted, enacted, and given to ourselves.
  - Signed by **284 members** present on that day.
  - Provisions enforced immediately: **Citizenship (Articles 5–9)**, **Elections (Article 324)**, Provisional Parliament, and transitional arrangements.
  - Celebrated annually as **Constitution Day (Samvidhan Diwas)**.
- **24 January 1950 (Final Sitting of the Assembly):**
  - *"Jana Gana Mana"* (Rabindranath Tagore) adopted as the **National Anthem**.
  - *"Vande Mataram"* (Bankim Chandra Chatterjee) adopted as the **National Song**.
  - **Dr. Rajendra Prasad** elected as the first President of the Republic of India.
  - Members formally signed three copies of the Constitution (two English, one Hindi).
- **26 January 1950 (Commencement of the Constitution):**
  - The Constitution came into full force and India was proclaimed a sovereign Republic.

> 📌 **Why 26 January?** 26 January was chosen to commemorate **26 January 1930**, celebrated as **Purna Swaraj Day** following the historic 1929 Lahore Session of the INC under Jawaharlal Nehru.

---

## ✒️ 6. The Drafting Committee

- **Constituted:** **29 August 1947**
- **Chairman:** **Dr. B. R. Ambedkar** (*"Chief Architect of the Constitution"*, *"Modern Manu"*)
- **Total Members:** 7 Members

### The 7 Illustrious Members:
1. **Dr. B. R. Ambedkar** *(Chairman)*
2. **Alladi Krishnaswamy Ayyar**
3. **N. Gopalaswami Ayyangar**
4. **Dr. K. M. Munshi** *(Only original Congress member)*
5. **Syed Muhammad Saadullah** *(Only Muslim League member on the Committee)*
6. **N. Madhava Rau** *(Replaced B. L. Mitter, who resigned due to ill health)*
7. **T. T. Krishnamachari** *(Replaced D. P. Khaitan, who died in 1948)*

> ⚠️ **Exam Trap:** Dr. B. R. Ambedkar was initially elected in 1946 from **Bengal (Jessore & Khulna)**. After Partition, this territory became part of East Pakistan. He was then re-elected from the **Bombay Presidency (Pune seat)** after senior Congress leader M. R. Jayakar resigned his seat.

### Readings of the Draft Constitution

| Stage | Period / Dates | Core Focus |
| :--- | :--- | :--- |
| **First Draft Published** | 21 February 1948 | Public scrutiny, press feedback, and amendments (8 months given) |
| **First Reading** | 4–9 November 1948 | General introduction and clause overview by Dr. Ambedkar |
| **Second Reading** | 15 Nov 1948 – 17 Oct 1949 | Clause-by-clause scrutiny (7,653 amendments proposed, 2,473 discussed) |
| **Third Reading** | 14–26 November 1949 | Final debate on motion *"The Constitution as settled by the Assembly be passed"* |

---

## 📂 7. Major & Minor Committees of the Assembly

The Assembly set up **8 Major Committees** and **13 Minor Committees** to draft different provisions:

### Eight Major Committees

| Major Committee | Chairperson |
| :--- | :--- |
| **Union Powers Committee** | Jawaharlal Nehru |
| **Union Constitution Committee** | Jawaharlal Nehru |
| **States Committee (Negotiating with States)** | Jawaharlal Nehru |
| **Provincial Constitution Committee** | Sardar Vallabhbhai Patel |
| **Advisory Committee on Fundamental Rights, Minorities & Tribal Areas** | Sardar Vallabhbhai Patel |
| **Rules of Procedure Committee** | Dr. Rajendra Prasad |
| **Steering Committee** | Dr. Rajendra Prasad |
| **Drafting Committee** | Dr. B. R. Ambedkar |

### 4 Key Sub-Committees under Patel's Advisory Committee

| Sub-Committee | Chairperson |
| :--- | :--- |
| **Fundamental Rights Sub-Committee** | **J. B. Kripalani** |
| **Minorities Sub-Committee** | **H. C. Mukherjee** |
| **North-East Frontier Tribal Areas & Assam Sub-Committee** | **Gopinath Bardoloi** |
| **Excluded & Partially Excluded Areas Sub-Committee** | **A. V. Thakkar** |

### Key Minor Committees & Commissions

| Minor Committee / Body | Chairperson |
| :--- | :--- |
| **Ad-hoc Committee on the National Flag** | Dr. Rajendra Prasad |
| **Committee on Functions of Constituent Assembly** | G. V. Mavalankar |
| **Order of Business Committee** | Dr. K. M. Munshi |
| **House Committee** | B. Pattabhi Sitaramayya |
| **Committee on Chief Commissioners' Provinces** | B. Pattabhi Sitaramayya |
| **Ad-hoc Committee on the Supreme Court** | S. Varadachariar |
| **Linguistic Provinces Commission** | Justice S. K. Dhar |

> 🧠 **Chairperson Pattern:**
> - **Jawaharlal Nehru:** Union and States (Union Powers, Union Constitution, States)
> - **Sardar Patel:** Provinces, Fundamental Rights, Minorities, and Tribal Areas
> - **Dr. Rajendra Prasad:** Procedure, Steering, Finance, and National Flag
> - **Dr. Ambedkar:** Drafting the Constitutional text

---

## ⚡ 8. Dual Role of the Constituent Assembly

From 15 August 1947 until 1952, the Constituent Assembly operated with a dual mandate, meeting separately for each:

| Dual Function | Role / Character | Presiding Officer |
| :--- | :--- | :--- |
| **Constitution-Making Body** | Framing the fundamental law of the land | **Dr. Rajendra Prasad** |
| **Legislative Body (Dominion Parliament)** | Enacting ordinary laws as India's first Parliament | **G. V. Mavalankar** |

*Note:* G. V. Mavalankar later served as the **first Speaker of the Lok Sabha** (1952–1956).

---

## 💎 9. High-Yield Facts, Figures & Historical Trivia

| Constitutional Metric | Authentic Fact / Figure |
| :--- | :--- |
| **Total Sessions Held** | **11 Sessions** |
| **Total Sitting Days** | **165 Days** |
| **Total Time Taken** | **2 Years, 11 Months, 18 Days** |
| **Approximate Total Expenditure** | **₹64 Lakh** |
| **Original Constitutional Structure** | **395 Articles, 22 Parts, 8 Schedules** (plus Preamble) |
| **Emblem / Seal of the Assembly** | **Elephant** (symbolizing vastness and strength) |
| **Constitutional Adviser** | **Sir B. N. Rau** |
| **Chief Draftsman of the Constitution** | **S. N. Mukherjee** |
| **Secretary to the Assembly** | **H. V. R. Iengar** |
| **Calligrapher (English Manuscript)** | **Prem Behari Narain Raizada** (wrote in flowing italic script with No. 303 pen) |
| **Calligrapher (Hindi Manuscript)** | **Vasant Krishan Vaidya** |
| **Artistic Illumination & Borders** | Shantiniketan artists led by **Nandalal Bose** |
| **Preamble Page Designer** | **Beohar Rammanohar Sinha** |
| **Total Women Members** | **15 Women** |

### Prominent Women Members of the Constituent Assembly
- **Rajkumari Amrit Kaur:** Independent India's first Health Minister.
- **Sucheta Kripalani:** First woman Chief Minister of an Indian state (Uttar Pradesh).
- **Sarojini Naidu:** First woman Governor in independent India (United Provinces / UP).
- **Dakshayani Velayudhan:** The **only Dalit (Scheduled Caste) woman** member of the Assembly.
- **Begum Aizaz Rasul:** The **only Muslim woman** member of the Assembly.
- **Hansa Jivraj Mehta:** Presented the national flag to the Assembly on behalf of the women of India.

### Signature & Manuscript Facts
- **First Signatory:** **Jawaharlal Nehru** signed the Constitution first.
- **Last Signatory:** **Dr. Rajendra Prasad** signed last (placed his signature above Nehru's).
- **Preservation:** The original handwritten and calligraphed copies of the Constitution are preserved in special **helium-filled glass cases** in the Library of the Parliament of India.

---

## 🧾 10. Last-Minute Revision Sheet & Quick Recall

> 🚀 **Sequence to Remember:**
> 1928 Nehru Report → 1934 M. N. Roy → 1935 INC Demand → 1940 August Offer → 1942 Cripps Mission → 1945 Wavell Plan → 1946 Cabinet Mission & 1st Assembly Meeting → 1947 Drafting Committee & Independence → 1949 Adoption (26 Nov) → 1950 Commencement (26 Jan).

### High-Frequency Exam Numbers

- **389:** Original strength of Constituent Assembly (Cabinet Mission)
- **299:** Strength after Partition (Mountbatten Plan)
- **296 + 93:** British India (elected) and Princely States (nominated)
- **292 + 4:** Governor's Provinces and Chief Commissioners' Provinces
- **7:** Members of the Drafting Committee
- **8 + 13:** Major and Minor Committees
- **11 sessions, 165 days:** Time devoted to framing
- **284:** Signatures on 26 November 1949
- **395, 22, 8:** Original Articles, Parts, and Schedules

### Essential Personalities & Associations

| Personality | Primary Association / Contribution |
| :--- | :--- |
| **M. N. Roy** | First proposed the idea of a Constituent Assembly (1934) |
| **Jawaharlal Nehru** | Objectives Resolution; Union Committees; First signatory |
| **Dr. Rajendra Prasad** | Permanent President of Assembly; First President of India |
| **Dr. B. R. Ambedkar** | Chairman of Drafting Committee; Architect of the Constitution |
| **Sir B. N. Rau** | Constitutional Adviser; Prepared initial raw draft |
| **S. N. Mukherjee** | Chief Draftsman; Put complex legal concepts into clear text |
| **G. V. Mavalankar** | Speaker of Legislative Wing / First Lok Sabha Speaker |
| **Prem Behari Raizada** | Handwrote the original English calligraphy without charging fees |
| **Nandalal Bose** | Led the decorative artistic illumination at Shantiniketan |

> ✅ **Three Dates to Never Confuse:**
> 1. **26 November 1949:** Constitution **Adopted & Enacted** (*Constitution Day / Samvidhan Diwas*).
> 2. **24 January 1950:** Final sitting; National Anthem & Song recognized; Dr. Rajendra Prasad elected President.
> 3. **26 January 1950:** Constitution **Commenced & Came into Full Force** (*Republic Day*).`
  },
  {
    id: 'note-polity-making-constitution-hi',
    title: 'भारतीय राजव्यवस्था: संविधान का निर्माण (संपूर्ण परीक्षा नोट्स)',
    language: 'hi',
    subject: 'भारतीय राजव्यवस्था (Polity)',
    category: 'concept',
    tags: ['संविधान सभा', 'संविधान निर्माण', 'प्रारूप समिति', 'कैबिनेट मिशन', 'UPSC', 'State PCS'],
    summary: 'संविधान सभा, कैबिनेट मिशन योजना, प्रमुख समितियां, प्रारूप समिति, ऐतिहासिक तिथियां एवं परीक्षा उपयोगी महत्वपूर्ण तथ्यों का संपूर्ण संकलन।',
    readingTimeMinutes: 6,
    isStarred: true,
    coverImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    createdAt: '2026-09-28T08:00:00Z',
    updatedAt: '2026-09-28T08:45:00Z',
    content: `# भारतीय संविधान का निर्माण: संपूर्ण परीक्षा नोट्स

> 🎯 **परीक्षा उपयोगी मास्टर नोट:** संविधान की पृष्ठभूमि, संविधान सभा, प्रारूप समिति, प्रमुख समितियां, ऐतिहासिक तिथियां और परीक्षा में बार-बार पूछे जाने वाले उच्च-उपज तथ्यों का एक संरचित गाइड।

संविधान राज्य के मौलिक राजनीतिक सिद्धांतों को निर्धारित करता है; सरकारी संस्थाओं की संरचना, प्रक्रियाओं, शक्तियों और कर्तव्यों को स्थापित करता है; और नागरिकों के मौलिक अधिकारों, नीति निदेशक तत्वों और मौलिक कर्तव्यों को परिभाषित करता है।

---

## 🏛️ 1. संवैधानिक आधार एवं शासन के रूप

- **आधुनिक लिखित संविधान की शुरुआत:** **4 जुलाई 1776** को अमेरिकी स्वतंत्रता की घोषणा के बाद **1787** का संयुक्त राज्य अमेरिका का संविधान।
- **भारतीय संविधान की प्रकृति:** **नम्यता (Flexibility)** और **अनम्यता (Rigidity)** का अनूठा सम्मिश्रण।
  - संघीय प्रावधानों में संशोधन के लिए **अनुच्छेद 368** के तहत संसद का विशेष बहुमत और आधे राज्यों के विधानमंडलों का अनुमोदन आवश्यक है।
  - कुछ साधारण प्रावधान साधारण बहुमत से भी संशोधित किए जा सकते हैं (जैसे अनुच्छेद 3 के तहत नए राज्यों का निर्माण)।
- **अवधारणात्मक बिंदु:** लोकतांत्रिक देशों में सामान्यतः संविधान होता है, किंतु यह आवश्यक नहीं कि प्रत्येक संविधान वाला देश लोकतांत्रिक ही हो।

### शासन प्रणालियों की तुलना

| शासन प्रणाली | अर्थ / कार्यप्रणाली | उदाहरण |
| :--- | :--- | :--- |
| **लोकतांत्रिक (Democratic)** | जनता का, जनता के द्वारा और जनता के लिए शासन | भारत, अमेरिका, ब्रिटेन |
| **साम्यवादी (Communist)** | उत्पादन के मुख्य साधनों और स्रोतों पर राज्य का नियंत्रण | चीन, उत्तर कोरिया, क्यूबा, वियतनाम |
| **राजतंत्रीय (Monarchic)** | संप्रभु शासन सत्ता एक वंशानुगत राजा या सम्राट में केंद्रित | सऊदी अरब, ब्रुनेई |
| **अधिनायकवादी (Totalitarian)** | नागरिकों के सार्वजनिक और व्यक्तिगत जीवन पर निरंकुश नियंत्रण | उत्तर कोरिया |
| **अल्पतंत्रीय (Oligarchic)** | एक छोटे, विशेषाधिकार प्राप्त विशिष्ट वर्ग के हाथों में सत्ता | ईरान, रूस |

---

## ⏳ 2. संविधान की मांग का ऐतिहासिक विकास

### भारतीय पहल

| वर्ष | विकास / मील का पत्थर | संवैधानिक महत्व |
| :---: | :--- | :--- |
| **1928** | मोतीलाल नेहरू की अध्यक्षता में **नेहरू रिपोर्ट** | भारतीय संविधान का प्रथम स्वदेशी खाका (सर्वदलीय सम्मेलन, लखनऊ) |
| **1934** | **एम. एन. रॉय** द्वारा संविधान सभा का विचार | भारत में एक स्वतंत्र संविधान सभा के गठन का पहला औपचारिक प्रस्ताव |
| **1935** | **भारतीय राष्ट्रीय कांग्रेस (INC)** द्वारा आधिकारिक मांग | संविधान सभा की मांग राष्ट्रीय राजनीतिक आंदोलन का आधिकारिक हिस्सा बनी |
| **1938** | **जवाहरलाल नेहरू** की वयस्क मताधिकार की घोषणा | स्वतंत्र भारत का संविधान बिना किसी बाहरी हस्तक्षेप के वयस्क मताधिकार द्वारा चुनी गई सभा द्वारा बने |

### ब्रिटिश प्रस्ताव एवं भारतीय प्रतिक्रिया

1. **अगस्त प्रस्ताव (August Offer — 1940):**
   - वायसराय **लॉर्ड लिनलिथगो** द्वारा 8 अगस्त 1940 को द्वितीय विश्व युद्ध में भारतीयों का सहयोग पाने हेतु प्रस्तुत।
   - युद्ध के बाद **डोमिनियन स्टेटस (अधिराज्य दर्जा)** देने की बात कही।
   - *कांग्रेस ने अस्वीकार किया:* कांग्रेस **पूर्ण स्वराज** पर अडिग रही।
2. **क्रिप्स मिशन (Cripps Mission — 1942):**
   - ब्रिटिश कैबिनेट मंत्री **सर स्टैफोर्ड क्रिप्स** के नेतृत्व में आया।
   - युद्धोपरांत डोमिनियन स्टेटस और संविधान निर्मात्री सभा का प्रस्ताव रखा।
   - *अस्वीकृत हुआ:*
     - जवाहरलाल नेहरू ने कहा: *"डोमिनियन स्टेटस की अवधारणा अब मृतप्राय हो चुकी है।"*
     - महात्मा गांधी ने कहा: *"यह एक डूबते हुए बैंक के नाम बाद की तारीख का चेक (Post-dated cheque on a crashing bank) है।"*
3. **वेवेल योजना एवं शिमला सम्मेलन (1945):**
   - वायसराय **लॉर्ड वेवेल** द्वारा संवैधानिक गतिरोध दूर करने हेतु प्रस्तुत।
   - गवर्नर-जनरल की कार्यकारिणी परिषद में सवर्ण हिंदुओं और मुस्लिमों को बराबर प्रतिनिधित्व देने का प्रस्ताव।
   - *विफल रहा:* मुस्लिम लीग ने जिद की कि वह ही सभी भारतीय मुसलमानों की एकमात्र प्रतिनिधि है।
4. **कैबिनेट मिशन योजना (Cabinet Mission Plan — 1946) — मुख्य आधार:**

> 🔑 **मुख्य आधार:** भारतीय संविधान सभा का गठन **कैबिनेट मिशन योजना, 1946** के प्रावधानों के अंतर्गत ही हुआ था।

- ब्रिटिश प्रधानमंत्री **क्लीमेंट एटली** द्वारा भेजे गए इस 3 सदस्यीय उच्चस्तरीय मिशन में शामिल थे:
  1. **लॉर्ड पेथिक-लॉरेंस** — भारत सचिव *(अध्यक्ष)*
  2. **सर स्टैफोर्ड क्रिप्स** — बोर्ड ऑफ ट्रेड के अध्यक्ष
  3. **ए. वी. अलेक्जेंडर** — फर्स्ट लॉर्ड ऑफ एडमिरल्टी
- **परिणाम:** कांग्रेस और मुस्लिम लीग दोनों ने प्रारंभ में इसे स्वीकार किया।

---

## 📊 3. संविधान सभा की संरचना एवं सीटों का आवंटन

### कैबिनेट मिशन योजना के तहत सीटों का बंटवारा

| वर्ग | सीटें | चयन की पद्धति |
| :--- | :---: | :--- |
| ब्रिटिश भारत के 11 गवर्नर प्रांत | 292 | प्रांतीय विधानसभाओं द्वारा अप्रत्यक्ष रूप से निर्वाचित |
| मुख्य आयुक्तों के 4 प्रांत (Chief Commissioners) | 4 | प्रत्येक आयुक्त प्रांत से 1 प्रतिनिधि निर्वाचित |
| देशी रियासतें (Princely States) | 93 | संबंधित रियासतों के शासकों द्वारा मनोनीत |
| **संविधान सभा की कुल संख्या** | **389** | **आंशिक रूप से निर्वाचित और आंशिक रूप से मनोनीत** |

- **ब्रिटिश भारत की कुल सीटें:** 296 (292 प्रांत + 4 मुख्य आयुक्त)।
- **प्रतिनिधित्व का अनुपात:** लगभग **10 लाख की जनसंख्या पर 1 सीट**।
- **चुनाव पद्धति:** **एकल संक्रमणीय मत द्वारा आनुपातिक प्रतिनिधित्व प्रणाली (STV)**।
- **तीन मुख्य समुदाय:** **मुस्लिम, सिख, एवं सामान्य** (मुस्लिम व सिख को छोड़कर शेष सभी)।

> 🧠 **स्मरण सूत्र (Mnemonic) — ABCD:** मुख्य आयुक्तों के 4 प्रांत:
> - **A** → **अजमेर-मेरवाड़ा (Ajmer-Merwara)**
> - **B** → **ब्रिटिश बलूचिस्तान (British Baluchistan)**
> - **C** → **कुर्ग (Coorg)**
> - **D** → **दिल्ली (Delhi)**

### जुलाई-अगस्त 1946 चुनाव परिणाम (296 सीटें)

| राजनीतिक दल / समूह | जीती गई सीटें |
| :--- | :---: |
| **भारतीय राष्ट्रीय कांग्रेस (INC)** | **208** |
| **मुस्लिम लीग (Muslim League)** | **73** |
| **अन्य एवं निर्दलीय** | **15** |
| **कुल ब्रिटिश भारत सीटें** | **296** |

### विभाजन के बाद स्थिति (3 जून 1947 माउंटबेटन योजना)
पाकिस्तान के अलग होने के बाद संविधान सभा की कुल सदस्य संख्या **389 से घटकर 299** रह गई:
- **229** सदस्य ब्रिटिश भारतीय प्रांतों से (पहले 296 थे)
- **70** सदस्य देशी रियासतों से (पहले 93 थे)

---

## ⚖️ 4. भारत की अंतरिम सरकार (गठन: 2 सितंबर 1946)

- कैबिनेट मिशन के तहत गठित हुई।
- अध्यक्ष: गवर्नर-जनरल (**लॉर्ड वेवेल** फरवरी 1947 तक; इसके बाद **लॉर्ड माउंटबेटन**)।
- **ऐतिहासिक तथ्य:** मुस्लिम लीग प्रारंभ में (2 सितंबर) शामिल नहीं हुई, किंतु **26 अक्टूबर 1946** को शामिल हो गई (लीग के 5 सदस्य शामिल हुए और कांग्रेस के 3 सदस्यों ने इस्तीफा दिया)।

| विभाग / मंत्रालय | नियुक्त सदस्य | दल |
| :--- | :--- | :---: |
| **उपाध्यक्ष; विदेश मामले एवं राष्ट्रमंडल संबंध** | जवाहरलाल नेहरू | कांग्रेस |
| **गृह, सूचना एवं प्रसारण** | सरदार वल्लभभाई पटेल | कांग्रेस |
| **खाद्य एवं कृषि** | डॉ. राजेन्द्र प्रसाद | कांग्रेस |
| **रक्षा** | सरदार बलदेव सिंह | कांग्रेस |
| **वित्त** | लियाकत अली खान | मुस्लिम लीग |
| **स्वास्थ्य** | गजनफर अली खान | मुस्लिम लीग |
| **श्रम** | बाबू जगजीवन राम | कांग्रेस |
| **विधि (कानून)** | जोगेंद्र नाथ मंडल | मुस्लिम लीग |
| **शिक्षा एवं कला** | सी. राजगोपालाचारी | कांग्रेस |
| **रेलवे, डाक एवं वायु** | अब्दुर रब नश्तर | मुस्लिम लीग |
| **उद्योग एवं आपूर्ति** | डॉ. जॉन मथाई | कांग्रेस |
| **वाणिज्य** | इब्राहिम इस्माइल चुंदरीगर | मुस्लिम लीग |
| **कमांडर-इन-चीफ** | सर क्लाउड ऑचिनलेक | ब्रिटिश |

---

## 🎯 5. महत्वपूर्ण तिथियां एवं ऐतिहासिक मील के पत्थर

- **9 दिसंबर 1946 (प्रथम ऐतिहासिक बैठक):**
  - कुल **211 सदस्यों** ने भाग लिया (मुस्लिम लीग ने बहिष्कार किया)।
  - वरिष्ठतम सदस्य होने के नाते **डॉ. सच्चिदानंद सिन्हा** को अस्थायी अध्यक्ष चुना गया (**फ्रांसीसी परंपरा** के अनुसार)।
- **11 दिसंबर 1946 (स्थायी नेतृत्व का चुनाव):**
  - **डॉ. राजेन्द्र प्रसाद** को संविधान सभा का स्थायी अध्यक्ष चुना गया।
  - **एच. सी. मुखर्जी** एवं **वी. टी. कृष्णामाचारी** दो उपाध्यक्ष चुने गए।
  - **सर बी. एन. राव** को संवैधानिक सलाहकार नियुक्त किया गया।
- **13 दिसंबर 1946 (उद्देश्य प्रस्ताव पेश):**
  - **पंडित जवाहरलाल नेहरू** द्वारा ऐतिहासिक उद्देश्य प्रस्ताव (Objectives Resolution) पेश किया गया।
  - **22 जनवरी 1947** को इसे सर्वसम्मति से स्वीकार किया गया, जो आगे चलकर **संविधान की प्रस्तावना (Preamble)** बना।
- **22 जुलाई 1947:** राष्ट्रीय ध्वज (तिरंगा) को अपनाया गया (लंबाई-चौड़ाई का अनुपात **3:2**; अभिकल्पना **पिंगली वेंकैया**)।
- **14-15 अगस्त 1947:** भारत स्वतंत्र हुआ; नेहरू जी का प्रसिद्ध भाषण *"Tryst with Destiny"* (भाग्य-वधू से भेंट)।
- **मई 1949:** भारत ने राष्ट्रमंडल (Commonwealth) की सदस्यता का सत्यापन किया।
- **26 नवंबर 1949 (संविधान अंगीकृत):**
  - संविधान सभा द्वारा संविधान को औपचारिक रूप से **अंगीकृत, अधिनियमित और आत्मार्पित** किया गया।
  - उपस्थित **284 सदस्यों** ने इस पर हस्ताक्षर किए।
  - नागरिकता (अनुच्छेद 5-9), निर्वाचन (अनुच्छेद 324) और अंतरिम संसद संबंधी प्रावधान तुरंत प्रभावी हुए।
  - प्रतिवर्ष **26 नवंबर को संविधान दिवस (National Law Day)** के रूप में मनाया जाता है।
- **24 जनवरी 1950 (संविधान सभा की अंतिम बैठक):**
  - *"जन गण मन"* को राष्ट्रगान और *"वन्दे मातरम्"* को राष्ट्रगीत का दर्जा मिला।
  - **डॉ. राजेन्द्र प्रसाद** भारत के प्रथम राष्ट्रपति चुने गए।
  - सदस्यों ने संविधान की तीन मूल प्रतियों पर हस्ताक्षर किए।
- **26 जनवरी 1950 (संविधान लागू):**
  - संविधान पूर्ण रूप से लागू हुआ और भारत एक संप्रभु लोकतांत्रिक गणराज्य बना।

> 📌 **26 जनवरी ही क्यों चुना गया?** **26 जनवरी 1930** को 1929 के लाहौर कांग्रेस अधिवेशन में लिए गए संकल्प के आधार पर भारत का प्रथम **पूर्ण स्वराज दिवस** मनाया गया था, उसी पावन तिथि की स्मृति में 26 जनवरी चुना गया।

---

## ✒️ 6. प्रारूप समिति (Drafting Committee)

- **गठन की तिथि:** **29 अगस्त 1947**
- **अध्यक्ष:** **डॉ. भीमराव आंबेडकर** (*"संविधान के जनक"*, *"आधुनिक मनु"*)
- **कुल सदस्य संख्या:** 7 सदस्य

### 7 महान सदस्य:
1. **डॉ. बी. आर. आंबेडकर** *(अध्यक्ष)*
2. **अल्लादि कृष्णास्वामी अय्यर**
3. **एन. गोपालस्वामी अय्यंगार**
4. **डॉ. के. एम. मुंशी** *(समिति में एकमात्र मूल कांग्रेसी सदस्य)*
5. **सैयद मोहम्मद सादुल्लाह** *(एकमात्र मुस्लिम लीग सदस्य)*
6. **एन. माधव राव** *(बी. एल. मित्तर के स्वास्थ्य कारणों से त्यागपत्र के बाद नियुक्त)*
7. **टी. टी. कृष्णामाचारी** *(1948 में डी. पी. खेतान की मृत्यु के पश्चात नियुक्त)*

> ⚠️ **परीक्षा में आने वाला जाल (Exam Trap):** डॉ. बी.आर. आंबेडकर प्रारंभ में जुलाई 1946 में **अविभाजित बंगाल (जैसोर-खुलना सीट)** से चुने गए थे। विभाजन के बाद यह क्षेत्र पूर्वी पाकिस्तान में चला गया। तत्पश्चात कांग्रेस नेता एम.आर. जयकर के त्यागपत्र देने पर आंबेडकर जी **बॉम्बे प्रेसीडेंसी (पुणे सीट)** से पुनः निर्वाचित हुए।

### प्रारूप के तीन वाचन (Readings of the Draft)

| वाचन (Reading) | अवधि / तिथियां | मुख्य विषय |
| :--- | :--- | :--- |
| **प्रारूप का प्रकाशन** | 21 फरवरी 1948 | जनता और प्रेस की समीक्षा हेतु (8 माह का समय दिया गया) |
| **प्रथम वाचन** | 4 नवंबर – 9 नवंबर 1948 | डॉ. आंबेडकर द्वारा सामान्य परिचय और चर्चा |
| **द्वितीय वाचन** | 15 नवं 1948 – 17 अक्टू 1949 | खंड-वार (Clause-by-Clause) विस्तृत विचार-विमर्श (7,653 संशोधन पेश, 2,473 स्वीकृत) |
| **तृतीय वाचन** | 14 नवंबर – 26 नवंबर 1949 | अंतिम रूप से पारित करने का प्रस्ताव और स्वीकृति |

---

## 📂 7. संविधान सभा की प्रमुख एवं उप-समितियां

संविधान सभा ने संविधान निर्माण हेतु **8 बड़ी समितियां** और **13 छोटी समितियां** गठित की थीं:

### आठ प्रमुख समितियां

| समिति का नाम | अध्यक्ष |
| :--- | :--- |
| **संघ शक्ति समिति (Union Powers Committee)** | जवाहरलाल नेहरू |
| **संघीय संविधान समिति (Union Constitution Committee)** | जवाहरलाल नेहरू |
| **राज्यों के लिए समिति (राज्यों से समझौता करने वाली)** | जवाहरलाल नेहरू |
| **प्रांतीय संविधान समिति (Provincial Constitution)** | सरदार वल्लभभाई पटेल |
| **मौलिक अधिकारों, अल्पसंख्यकों एवं जनजातीय क्षेत्रों संबंधी सलाहकार समिति** | सरदार वल्लभभाई पटेल |
| **प्रक्रिया नियम समिति (Rules of Procedure)** | डॉ. राजेन्द्र प्रसाद |
| **संचालन समिति (Steering Committee)** | डॉ. राजेन्द्र प्रसाद |
| **प्रारूप समिति (Drafting Committee)** | डॉ. बी. आर. आंबेडकर |

### पटेल की सलाहकार समिति के अंतर्गत 4 महत्वपूर्ण उप-समितियां

| उप-समिति (Sub-Committee) | अध्यक्ष |
| :--- | :--- |
| **मौलिक अधिकार उप-समिति (Fundamental Rights Sub-Committee)** | **जे. बी. कृपलानी** |
| **अल्पसंख्यक उप-समिति (Minorities Sub-Committee)** | **एच. सी. मुखर्जी** |
| **पूर्वोत्तर सीमांत जनजातीय क्षेत्र एवं असम उप-समिति** | **गोपीनाथ बारदोलोई** |
| **अपवर्जित एवं आंशिक रूप से अपवर्जित क्षेत्र उप-समिति** | **ए. वी. ठक्कर** |

### अन्य महत्वपूर्ण छोटी समितियां

| समिति | अध्यक्ष |
| :--- | :--- |
| **राष्ट्रीय ध्वज तदर्थ समिति (Ad-hoc Flag Committee)** | डॉ. राजेन्द्र प्रसाद |
| **संविधान सभा के कार्यकरण संबंधी समिति** | जी. वी. मावलंकर |
| **कार्य संचालन समिति (Order of Business)** | डॉ. के. एम. मुंशी |
| **सदन समिति (House Committee)** | बी. पट्टाभि सीतारमैया |
| **सर्वोच्च न्यायालय तदर्थ समिति** | एस. वरदाचारी |
| **भाषाई प्रांत आयोग (1948)** | एस. के. धर |

> 🧠 **अध्यक्ष याद रखने की ट्रिक (Chairperson Pattern):**
> - **नेहरू जी:** केंद्र और राज्य (संघ शक्ति, संघ संविधान, राज्य समिति)
> - **पटेल जी:** प्रांत, मौलिक अधिकार, अल्पसंख्यक एवं जनजातीय मामले
> - **डॉ. राजेन्द्र प्रसाद:** नियम, संचालन, वित्त और राष्ट्रध्वज
> - **डॉ. आंबेडकर:** प्रारूप समिति

---

## ⚡ 8. संविधान सभा की दोहरी भूमिका (Dual Role)

15 अगस्त 1947 से 1952 के आम चुनावों तक संविधान सभा ने दो अलग-अलग भूमिकाएं निभाईं और दोनों के लिए अलग-अलग दिन बैठक होती थी:

| दोहरी भूमिका | कार्य एवं स्वरूप | पीठासीन अधिकारी (अध्यक्ष) |
| :--- | :--- | :--- |
| **संविधान निर्मात्री संस्था के रूप में** | देश के सर्वोच्च कानून का निर्माण | **डॉ. राजेन्द्र प्रसाद** |
| **विधायिका / संसद के रूप में** | स्वतंत्र भारत की पहली अंतरिम संसद (साधारण कानून बनाना) | **जी. वी. मावलंकर** |

*नोट:* जी. वी. मावलंकर बाद में **लोकसभा के प्रथम अध्यक्ष (First Speaker)** बने।

---

## 💎 9. महत्वपूर्ण स्मरणीय तथ्य एवं ऐतिहासिक आंकड़े

| मानक | प्रमाणिक तथ्य / आंकड़ा |
| :--- | :--- |
| **कुल सत्र (Total Sessions)** | **11 सत्र** |
| **बैठकों के कुल दिन** | **165 दिन** |
| **संविधान निर्माण में लगा कुल समय** | **2 वर्ष, 11 माह, 18 दिन** |
| **अनुमानित कुल व्यय** | लगभग **₹64 लाख** |
| **मूल संविधान की संरचना** | **395 अनुच्छेद, 22 भाग, 8 अनुसूचियां** (तथा प्रस्तावना) |
| **संविधान सभा की मुहर (प्रतीक)** | **हाथी (Elephant)** |
| **संवैधानिक सलाहकार** | **सर बी. एन. राव (Sir B.N. Rau)** |
| **मुख्य प्रारूपकार (Chief Draftsman)** | **एस. एन. मुखर्जी** |
| **संविधान सभा के सचिव** | **एच. वी. आर. अय्यंगार** |
| **अंग्रेजी हस्तलेखक (Calligrapher)** | **प्रेम बिहारी नारायण रायजादा** (इटैलिक शैली में हस्तलिखित किया) |
| **हिंदी हस्तलेखक** | **वसंत कृष्ण वैद्य** |
| **कलात्मक साज-सज्जा** | शांतिनिकेतन के कलाकारों द्वारा, नेतृत्व **नंदलाल बोस** |
| **प्रस्तावना पृष्ठ के सज्जाकार** | **ब्योहर राममनोहर सिन्हा** |
| **महिला सदस्यों की संख्या** | **15 महिलाएं** |

### संविधान सभा की प्रमुख महिला सदस्य
- **राजकुमारी अमृत कौर:** स्वतंत्र भारत की प्रथम स्वास्थ्य मंत्री।
- **सुचेता कृपलानी:** भारत की प्रथम महिला मुख्यमंत्री (उत्तर प्रदेश)।
- **सरोजिनी नायडू:** भारत की प्रथम महिला राज्यपाल (संयुक्त प्रांत/UP)।
- **दाक्षायणी वेलायुधन:** संविधान सभा की **एकमात्र दलित (अनुसूचित जाति) महिला सदस्य**।
- **बेगम ऐजाज रसूल:** संविधान सभा की **एकमात्र मुस्लिम महिला सदस्य**।
- **हंसा जीवराज मेहता:** जिन्होंने भारतीय महिलाओं की ओर से संविधान सभा को राष्ट्रीय ध्वज भेंट किया।

### हस्ताक्षर एवं पांडुलिपि संबंधी तथ्य
- **प्रथम हस्ताक्षरकर्ता:** पंडित **जवाहरलाल नेहरू** ने सबसे पहले हस्ताक्षर किए।
- **अंतिम हस्ताक्षरकर्ता:** **डॉ. राजेन्द्र प्रसाद** ने सबसे अंत में (नेहरू जी के हस्ताक्षर के ठीक ऊपर) हस्ताक्षर किए।
- **संरक्षण:** मूल हस्तलिखित प्रतियों को संसद भवन के पुस्तकालय में **हीलियम गैस से भरे विशेष बॉक्स** में सुरक्षित रखा गया है।

---

## 🧾 10. त्वरित पुनरीक्षण शीट (Last-Minute Revision)

> 🚀 **घटनाक्रम का सही क्रम:**
> 1928 नेहरू रिपोर्ट → 1934 एम. एन. रॉय → 1935 कांग्रेस की मांग → 1940 अगस्त प्रस्ताव → 1942 क्रिप्स मिशन → 1945 वेवेल योजना → 1946 कैबिनेट मिशन एवं प्रथम बैठक → 1947 प्रारूप समिति एवं स्वतंत्रता → 1949 अंगीकरण (26 Nov) → 1950 संविधान लागू (26 Jan)।

### परीक्षा में सर्वाधिक पूछे जाने वाले महत्वपूर्ण अंक

- **389:** संविधान सभा की मूल कुल सदस्य संख्या (कैबिनेट मिशन)
- **299:** विभाजन के बाद शेष सदस्य संख्या
- **296 + 93:** ब्रिटिश भारत (निर्वाचित) एवं देशी रियासतें (मनोनीत)
- **292 + 4:** 11 गवर्नर प्रांत एवं 4 मुख्य आयुक्त प्रांत (ABCD)
- **7:** प्रारूप समिति के सदस्य
- **8 + 13:** बड़ी एवं छोटी समितियां
- **11 सत्र, 165 दिन:** संविधान निर्माण कार्य
- **284:** 26 नवंबर 1949 को हस्ताक्षर करने वाले सदस्य
- **395, 22, 8:** मूल संविधान में अनुच्छेद, भाग एवं अनुसूचियां

> ✅ **कभी भ्रमित न होने वाली 3 प्रमुख तिथियां:**
> 1. **26 नवंबर 1949:** संविधान **अंगीकृत, अधिनियमित और आत्मार्पित** हुआ (*संविधान दिवस*)।
> 2. **24 जनवरी 1950:** अंतिम बैठक; राष्ट्रगान और राष्ट्रगीत स्वीकृत; डॉ. राजेन्द्र प्रसाद राष्ट्रपति चुने गए।
> 3. **26 जनवरी 1950:** संविधान **पूर्ण रूप से प्रभावी/लागू** हुआ (*गणतंत्र दिवस*)।`
  },
  {
    id: 'note-polity-making-constitution-bi',
    title: 'Making of the Indian Constitution (भारतीय संविधान का निर्माण - Bilingual Dual-Coding Notes)',
    language: 'bilingual',
    subject: 'Indian Polity (राजव्यवस्था)',
    category: 'concept',
    tags: ['Polity', 'Making of Constitution', 'Constituent Assembly', 'संविधान निर्माण', 'UPSC', 'State PCS'],
    summary: 'द्वि-कोडिंग शिक्षण पद्धति (Dual-Coding) पर आधारित संपूर्ण परीक्षा नोट्स — English terms और Hindi व्याख्या के साथ 40% तीव्र स्मरण शक्ति।',
    readingTimeMinutes: 7,
    isStarred: true,
    coverImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    createdAt: '2026-09-28T08:00:00Z',
    updatedAt: '2026-09-28T08:45:00Z',
    content: `# Making of the Indian Constitution (भारतीय संविधान का निर्माण - Bilingual Exam Notes)

> 🎯 **Bilingual Master Study Note:** Designed with the **Dual-Coding Learning Method** (द्वि-कोडिंग शिक्षण पद्धति) — linking English terms and Hindi explanations side-by-side to boost conceptual retention by 40% for UPSC CSE, State PCS, and SSC CGL.

The Constitution of India is the supreme law of the land (देश का सर्वोच्च विधान). It defines fundamental political principles, structures of government institutions, and outlines Fundamental Rights (मूल अधिकार), Directive Principles (नीति निदेशक तत्व), and Fundamental Duties (मूल कर्तव्य).

---

## 🏛️ 1. Constitutional Foundation & Forms of Government (संवैधानिक आधार)

- **First Written Constitution:** USA in **1787** following the Declaration of Independence on **4th July 1776** (4 जुलाई 1776 अमेरिकी स्वतंत्रता की घोषणा के बाद 1787 का अमेरिकी संविधान विश्व का पहला लिखित संविधान था)।
- **Nature of Indian Constitution (संविधान की प्रकृति):**
  - **Rigidity (अनम्यता):** Federal provisions require special amendment under **Article 368** (2/3rd majority in Parliament + 50% state ratifications).
  - **Flexibility (नम्यता):** Ordinary provisions can be amended by simple parliamentary majority (संसद के साधारण बहुमत से).
- **Core Principle:** Democratic nations generally possess written constitutions, but having a constitution does not inherently guarantee democracy (संविधान होने का अर्थ यह नहीं कि देश अनिवार्य रूप से लोकतांत्रिक ही हो)।

### Comparative Forms of Government (शासन प्रणालियां)

| Form of Government | Hindi Terminology | Core Concept / Mechanism | Examples |
| :--- | :--- | :--- | :--- |
| **Democracy** | लोकतंत्र / प्रजातंत्र | Government of the people, by the people, for the people | India, USA, UK |
| **Communist State** | साम्यवादी राज्य | State controls all principal means of production | China, North Korea, Cuba, Vietnam |
| **Monarchy** | राजतंत्र | Hereditary sovereign ruler / monarch | Saudi Arabia, Brunei |
| **Totalitarianism** | सर्वाधिकारवाद | Total autocratic state control over public and private life | North Korea |
| **Oligarchy** | कुलीनतंत्र / अल्पतंत्र | Power monopolized by a small elite ruling segment | Iran, Russia |

---

## ⏳ 2. Evolution of Demand & British Offers (मांग का ऐतिहासिक विकास)

### Indian Initiatives (भारतीयों के प्रयास)

| Year | Milestone | Constitutional Significance (महत्व) |
| :---: | :--- | :--- |
| **1928** | **Nehru Report (नेहरू रिपोर्ट)** | Earliest indigenous draft constitution under Motilal Nehru |
| **1934** | **M. N. Roy's Proposal** | First formal idea for an independent Constituent Assembly (संविधान सभा) |
| **1935** | **INC Official Demand** | Congress officially adopted the demand in its national platform |
| **1938** | **Adult Franchise (वयस्क मताधिकार)** | J.L. Nehru declared Constitution must be framed without external interference |

### British Offers & Indian Responses (ब्रिटिश प्रस्ताव एवं प्रतिक्रिया)

1. **August Offer (अगस्त प्रस्ताव — 1940):** Viceroy Lord Linlithgow offered post-war Dominion Status. *Rejected by INC (demanded Purna Swaraj).*
2. **Cripps Mission (क्रिप्स मिशन — 1942):** Sir Stafford Cripps offered post-WWII Dominion status and constitution-making body.
   - Nehru: *"Dominion status is dead as a door nail."*
   - Gandhi: *"Post-dated cheque on a crashing bank." (डूबते हुए बैंक का चेक)*
3. **Wavell Plan & Shimla Conference (वेवेल योजना — 1945):** Viceroy Lord Wavell proposed equal Hindu-Muslim executive council. *Failed due to Muslim League veto.*
4. **Cabinet Mission Plan (कैबिनेट मिशन योजना — 1946):**

> 🔑 **Master Blueprint:** Constituent Assembly of India was formed under **Cabinet Mission Plan 1946** (कैबिनेट मिशन योजना).

- 3 British Cabinet Ministers:
  1. **Lord Pethick-Lawrence** (Secretary of State & Chairman / भारत सचिव)
  2. **Sir Stafford Cripps** (President of Board of Trade)
  3. **A. V. Alexander** (First Lord of Admiralty)

---

## 📊 3. Composition & Seat Allocation (सीटों का आवंटन)

| Category (श्रेणी) | Seats (सीटें) | Method of Selection (चयन विधि) |
| :--- | :---: | :--- |
| Governor's Provinces (11 गवर्नर प्रांत) | 292 | Indirectly elected by Provincial MLAs (अप्रत्यक्ष निर्वाचन) |
| Chief Commissioners' Provinces (4 आयुक्त प्रांत) | 4 | 1 from each Chief Commissioner province |
| Princely States (देशी रियासतें) | 93 | Nominated by rulers (शासकों द्वारा मनोनीत) |
| **Total Assembly Strength (कुल संख्या)** | **389** | **Partly elected & partly nominated (आंशिक निर्वाचित, आंशिक मनोनीत)** |

- **Ratio:** 1 Seat per **10 Lakh (1 Million)** population.
- **Electoral System:** Proportional representation by single transferable vote (एकल संक्रमणीय मत द्वारा आनुपातिक प्रतिनिधित्व).
- **3 Communities:** Muslim, Sikh, General.

> 🧠 **Mnemonic — ABCD:** 4 Chief Commissioners' Provinces:
> - **A:** Ajmer-Merwara (अजमेर-मेरवाड़ा)
> - **B:** British Baluchistan (ब्रिटिश बलूचिस्तान)
> - **C:** Coorg (कुर्ग)
> - **D:** Delhi (दिल्ली)

### Election Results (July–Aug 1946):
- **Congress (INC):** 208 Seats
- **Muslim League:** 73 Seats
- **Others / Independents:** 15 Seats
- **Post-Partition (विभाजनोपरांत):** Strength reduced from **389 to 299** (229 Provinces + 70 Princely States).

---

## ⚖️ 4. Interim Government of India (अंतरिम सरकार — 2 Sept 1946)

- Headed by Viceroy / Governor-General (Lord Wavell, later Lord Mountbatten).
- **Key Nuance:** Muslim League joined on **26 October 1946** (5 League members joined, 3 Congress members resigned).

| Portfolio (विभाग) | Member Assigned (नियुक्त सदस्य) | Party (दल) |
| :--- | :--- | :---: |
| **Vice President; External Affairs** | Jawaharlal Nehru (जवाहरलाल नेहरू) | INC |
| **Home, Information & Broadcasting** | Sardar Vallabhbhai Patel (सरदार पटेल) | INC |
| **Food & Agriculture** | Dr. Rajendra Prasad (डॉ. राजेन्द्र प्रसाद) | INC |
| **Defence (रक्षा)** | Sardar Baldev Singh (बलदेव सिंह) | INC |
| **Finance (वित्त)** | Liaquat Ali Khan (लियाकत अली खान) | Muslim League |
| **Health (स्वास्थ्य)** | Ghazanfar Ali Khan (गजनफर अली खान) | Muslim League |
| **Labour (श्रम)** | Babu Jagjivan Ram (बाबू जगजीवन राम) | INC |
| **Law (विधि)** | Jogendra Nath Mandal (जोगेंद्र नाथ मंडल) | Muslim League |
| **Education & Arts** | C. Rajagopalachari (सी. राजगोपालाचारी) | INC |
| **Railways, Post & Air** | Abdur Rab Nishtar (अब्दुर रब नश्तर) | Muslim League |
| **Industries & Supplies** | Dr. John Mathai (डॉ. जॉन मथाई) | INC |
| **Commerce (वाणिज्य)** | I. I. Chundrigar (आई. आई. चुंदरीगर) | Muslim League |
| **Commander-in-Chief** | Sir Claude Auchinleck | British |

---

## 🎯 5. Crucial Dates & Milestones (महत्वपूर्ण तिथियां)

- **9 Dec 1946:** First meeting (211 attended). **Dr. Sachchidananda Sinha** elected Temporary President (अस्थायी अध्यक्ष) via French convention.
- **11 Dec 1946:** **Dr. Rajendra Prasad** elected Permanent President (स्थायी अध्यक्ष); **H.C. Mukherjee** & **V.T. Krishnamachari** as 2 Vice-Presidents; **Sir B.N. Rau** as Constitutional Adviser (संवैधानिक सलाहकार).
- **13 Dec 1946:** **Objectives Resolution (उद्देश्य प्रस्ताव)** moved by Nehru; unanimously adopted on **22 Jan 1947** (later became the Preamble / प्रस्तावना).
- **22 July 1947:** National Flag (राष्ट्रीय ध्वज) adopted; 3:2 ratio; designed by **Pingali Venkayya**.
- **14–15 Aug 1947:** Indian Independence; Nehru's historic *"Tryst with Destiny"* speech.
- **26 Nov 1949:** Constitution **Adopted & Enacted (अंगीकृत एवं अधिनियमित)**; signed by **284 members** present; Citizenship & Elections enforced immediately. Celebrated as **Constitution Day (संविधान दिवस)**.
- **24 Jan 1950:** Final sitting; National Anthem (*Jana Gana Mana*) & Song (*Vande Mataram*) adopted; Dr. Rajendra Prasad elected first President of India.
- **26 Jan 1950:** Constitution **Commenced (पूर्ण रूप से लागू)**; Republic Day of India.

> 📌 **Why 26 January?** To honor **26 January 1930**, celebrated as **Purna Swaraj Day** following the 1929 Lahore Congress session.

---

## ✒️ 6. The Drafting Committee (प्रारूप समिति)

- **Setup Date:** **29 August 1947**
- **Chairman (अध्यक्ष):** **Dr. B. R. Ambedkar** (*Father of Indian Constitution / Modern Manu*)
- **Total Members:** 7 Members

### 7 Members of Drafting Committee:
1. **Dr. B. R. Ambedkar** *(Chairman)*
2. **Alladi Krishnaswamy Ayyar**
3. **N. Gopalaswami Ayyangar**
4. **Dr. K. M. Munshi** *(Only original Congress member)*
5. **Syed Muhammad Saadullah** *(Only Muslim League member)*
6. **N. Madhava Rau** *(Replaced B. L. Mitter due to ill health)*
7. **T. T. Krishnamachari** *(Replaced D. P. Khaitan after his death in 1948)*

> ⚠️ **Exam Trap (परीक्षा जाल):** Dr. Ambedkar was first elected in 1946 from **East Bengal (Jessore-Khulna)**. After partition, that territory went to Pakistan. He was then re-elected from **Bombay Presidency (Pune seat)** after M.R. Jayakar resigned.

---

## 📂 7. Major Committees & Sub-Committees (प्रमुख समितियां)

### 8 Major Committees (8 बड़ी समितियां):
- **Union Powers & Union Constitution & States Committees:** Jawaharlal Nehru
- **Provincial Constitution & Advisory Committee on FRs/Minorities:** Sardar Vallabhbhai Patel
- **Rules of Procedure & Steering Committees:** Dr. Rajendra Prasad
- **Drafting Committee:** Dr. B. R. Ambedkar

### 4 Key Sub-Committees under Patel:
- **Fundamental Rights Sub-Committee (मूल अधिकार उप-समिति):** **J. B. Kripalani**
- **Minorities Sub-Committee (अल्पसंख्यक उप-समिति):** **H. C. Mukherjee**
- **North-East Tribal Areas (पूर्वोत्तर जनजातीय क्षेत्र):** **Gopinath Bardoloi**
- **Excluded & Partially Excluded Areas:** **A. V. Thakkar**

---

## ⚡ 8. Dual Role of Constituent Assembly (दोहरी भूमिका)

1. **Constitution-Making Body (संविधान निर्माण):** Chaired by **Dr. Rajendra Prasad**.
2. **Legislative / Provisional Parliament (संसद / कानून निर्माण):** Chaired by **G. V. Mavalankar** (who later became first Speaker of Lok Sabha).

---

## 💎 9. High-Yield Facts & Historical Trivia (महत्वपूर्ण तथ्य)

- **Total Sessions (सत्र):** 11 Sessions (**165 days**).
- **Time Taken (समय):** **2 Years, 11 Months, 18 Days**.
- **Total Expense (व्यय):** Approx. **₹64 Lakh**.
- **Original Structure (मूल संरचना):** **395 Articles, 22 Parts, 8 Schedules**.
- **Assembly Emblem (मुहर):** **Elephant (हाथी)**.
- **Constitutional Adviser (सलाहकार):** **Sir B. N. Rau**.
- **Chief Draftsman (प्रारूपकार):** **S. N. Mukherjee**.
- **Secretary (सचिव):** **H. V. R. Iengar**.
- **Calligrapher (English):** **Prem Behari Narain Raizada** (wrote with No. 303 nib in italic style).
- **Calligrapher (Hindi):** **Vasant Krishan Vaidya**.
- **Art Illumination (कलात्मक सज्जा):** Shantiniketan team under **Nandalal Bose** & **Beohar Rammanohar Sinha** (Preamble page).
- **Women Members (महिला सदस्य):** 15 total (including **Rajkumari Amrit Kaur**, **Sucheta Kripalani**, **Sarojini Naidu**, **Dakshayani Velayudhan** - only Dalit woman member, and **Begum Aizaz Rasul** - only Muslim woman member).
- **Signatures (हस्ताक्षर):** First signatory: **Jawaharlal Nehru**; Last signatory: **Dr. Rajendra Prasad**. Original copies preserved in helium-filled cases in Parliament Library.

---

## 🧾 10. Last-Minute Revision Sheet (त्वरित पुनरीक्षण)

> 🚀 **Timeline Sequence:**
> 1928 Nehru Report → 1934 M. N. Roy → 1935 INC Demand → 1940 August Offer → 1942 Cripps Mission → 1945 Wavell Plan → 1946 Cabinet Mission → 1947 Drafting Committee → 1949 Adoption (26 Nov) → 1950 Commencement (26 Jan).

> ✅ **Three Dates to Never Confuse (3 प्रमुख तिथियां):**
> 1. **26 November 1949:** Constitution **Adopted** (संविधान दिवस).
> 2. **24 January 1950:** Final sitting; Anthem, Song & President elected; Signatures affixed.
> 3. **26 January 1950:** Constitution **Commenced** into full force (गणतंत्र दिवस).`
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

// Rich Inline Markdown Parser for bold, italic, code badge, highlights, links, and clean arrows
export const parseInlineMarkdown = (text: string, keyPrefix: string = 'inline'): React.ReactNode[] => {
  if (!text) return [];

  // 1. Normalize all variations of LaTeX arrow artifacts, escaped carriage returns, and raw LaTeX
  const normalizedText = text
    .replace(/\$\s*(?:\\)?r?ightarrow\s*\$/gi, ' → ')
    .replace(/\\rightarrow/g, ' → ')
    .replace(/\$\s*\\?leftarrow\s*\$/gi, ' ← ')
    .replace(/\\leftarrow/g, ' ← ')
    .replace(/\$\s*\\?Longleftrightarrow\s*\$/gi, ' ⟺ ')
    .replace(/\\Longleftrightarrow/g, ' ⟺ ')
    .replace(/(\s*)\$\s*ightarrow\s*\$(\s*)/gi, ' → ')
    .replace(/\$\s*ightarrow\s*/gi, ' → ')
    .replace(/\s*ightarrow\s*\$/gi, ' → ')
    .replace(/\s*→\s*/g, ' → ');

  // Match bold (**text**), italic (*text*), code (`text`), highlight (==text==), link ([text](url)), and arrows (→, ←, ⟺)
  const tokenRegex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|==[^=]+==|\[[^\]]+\]\([^)]+\)|→|←|⟺)/g;
  const parts = normalizedText.split(tokenRegex);

  return parts.map((part, index) => {
    const k = `${keyPrefix}-${index}`;
    if (!part) return null;

    // Arrow (→)
    if (part === '→') {
      return (
        <span
          key={k}
          className="inline-flex items-center justify-center mx-1.5 text-indigo-600 dark:text-indigo-400 font-black text-sm select-none align-middle"
          aria-hidden="true"
        >
          →
        </span>
      );
    }

    // Arrow (←)
    if (part === '←') {
      return (
        <span
          key={k}
          className="inline-flex items-center justify-center mx-1.5 text-indigo-600 dark:text-indigo-400 font-black text-sm select-none align-middle"
          aria-hidden="true"
        >
          ←
        </span>
      );
    }

    // Arrow (⟺)
    if (part === '⟺') {
      return (
        <span
          key={k}
          className="inline-flex items-center justify-center mx-1.5 text-indigo-600 dark:text-indigo-400 font-black text-sm select-none align-middle"
          aria-hidden="true"
        >
          ⟺
        </span>
      );
    }

    // Bold (**text**)
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      return (
        <strong key={k} className="font-black text-current">
          {parseInlineMarkdown(part.slice(2, -2), `${k}-b`)}
        </strong>
      );
    }

    // Italic (*text*)
    if (part.startsWith('*') && part.endsWith('*') && part.length >= 2) {
      return (
        <em key={k} className="italic text-current opacity-95">
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
  fontSize: 'base' | 'lg' | 'xl' = 'base',
  theme: 'default' | 'sepia' | 'oled' = 'default'
): React.ReactNode => {
  if (!content) return null;

  const isSepia = theme === 'sepia';
  const isOled = theme === 'oled';

  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  const textSizeClass =
    fontSize === 'xl'
      ? 'text-base sm:text-lg leading-relaxed'
      : fontSize === 'lg'
      ? 'text-sm sm:text-base leading-relaxed'
      : 'text-xs sm:text-sm leading-relaxed';

  const bodyTextColor = isSepia
    ? 'text-[#2D1F13]'
    : isOled
    ? 'text-slate-200'
    : 'text-slate-800 dark:text-slate-200';

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
          id={`sec-${i}`}
          key={`h2-${i}`}
          className={`flex items-center gap-3 mt-10 mb-4 pb-2.5 border-b scroll-mt-24 ${
            isSepia
              ? 'border-[#DECDB5]'
              : isOled
              ? 'border-white/15'
              : 'border-slate-200/80 dark:border-white/10'
          }`}
        >
          <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-indigo-500 via-indigo-600 to-purple-600 shrink-0 shadow-2xs" />
          <h3 className={`text-xl sm:text-2xl font-black tracking-tight ${
            isSepia
              ? 'text-[#180E05]'
              : isOled
              ? 'text-white'
              : 'text-slate-900 dark:text-white'
          }`}>
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
          id={`sec-${i}`}
          key={`h3-${i}`}
          className={`text-base sm:text-lg font-extrabold mt-7 mb-3 flex items-center gap-2 scroll-mt-24 ${
            isSepia
              ? 'text-[#824408]'
              : isOled
              ? 'text-sky-300'
              : 'text-indigo-700 dark:text-indigo-300'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
          <span>{parseInlineMarkdown(headingText, `h3-${i}`)}</span>
        </h4>
      );
      i++;
      continue;
    }

    // 4b. Heading 4 (#### Sub-sub-section)
    if (trimmed.startsWith('#### ')) {
      const headingText = trimmed.replace(/^####\s+/, '').trim();
      elements.push(
        <h5
          id={`sec-${i}`}
          key={`h4-${i}`}
          className={`text-sm sm:text-base font-bold mt-5 mb-2 flex items-center gap-1.5 scroll-mt-24 ${
            isSepia
              ? 'text-[#180E05]'
              : isOled
              ? 'text-slate-100'
              : 'text-slate-800 dark:text-slate-200'
          }`}
        >
          <span className="w-1 h-1 rounded-full bg-indigo-400 shrink-0" />
          <span>{parseInlineMarkdown(headingText, `h4-${i}`)}</span>
        </h5>
      );
      i++;
      continue;
    }

    // 5. Divider (--- or ***)
    if (trimmed === '---' || trimmed === '***') {
      elements.push(
        <div key={`hr-${i}`} className="flex items-center justify-center gap-3 my-8 select-none" aria-hidden="true">
          <div className={`h-px w-24 bg-gradient-to-r from-transparent ${
            isSepia ? 'via-[#DECDB5]' : isOled ? 'via-white/20' : 'via-slate-300 dark:via-slate-700'
          } to-transparent`} />
          <span className={`w-1.5 h-1.5 rounded-full ${
            isSepia ? 'bg-[#824408]/60' : 'bg-indigo-500/50'
          }`} />
          <div className={`h-px w-24 bg-gradient-to-r from-transparent ${
            isSepia ? 'via-[#DECDB5]' : isOled ? 'via-white/20' : 'via-slate-300 dark:via-slate-700'
          } to-transparent`} />
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
          className={`my-5 p-4 rounded-2xl border font-mono text-xs sm:text-sm text-center shadow-2xs overflow-x-auto custom-scrollbar ${
            isSepia
              ? 'bg-[#FAF2E4] border-[#DECDB5] text-[#180E05]'
              : isOled
              ? 'bg-[#090C16] border-indigo-900/50 text-indigo-200'
              : 'bg-indigo-50/70 dark:bg-indigo-950/20 border-indigo-200/60 dark:border-indigo-800/40 text-indigo-900 dark:text-indigo-200'
          }`}
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
            className={`my-6 overflow-hidden rounded-2xl border shadow-sm ${
              isSepia
                ? 'bg-[#FFFDF9] border-[#DECDB5]'
                : isOled
                ? 'bg-[#080A10] border-white/15'
                : 'bg-white dark:bg-[#121526] border-slate-200/90 dark:border-white/10'
            }`}
          >
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className={`border-b ${
                    isSepia
                      ? 'bg-[#EFE2CC] border-[#DECDB5] text-[#180E05]'
                      : isOled
                      ? 'bg-[#121522] border-white/15 text-white'
                      : 'bg-gradient-to-r from-slate-100 to-slate-50 dark:from-[#181B2E] dark:to-[#161829] border-slate-200/80 dark:border-white/10 text-slate-800 dark:text-slate-200'
                  }`}>
                    {headerCells.map((h, hIdx) => {
                      const align = alignments[hIdx] || 'left';
                      return (
                        <th
                          key={hIdx}
                          className={`py-3.5 px-4 text-xs font-black uppercase tracking-wider border-r last:border-r-0 ${
                            isSepia ? 'border-[#DECDB5]' : isOled ? 'border-white/10' : 'border-slate-200/60 dark:border-white/5'
                          } ${align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'}`}
                        >
                          {parseInlineMarkdown(h, `th-${i}-${hIdx}`)}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className={`divide-y ${
                  isSepia ? 'divide-[#EFE2CC]' : isOled ? 'divide-white/10' : 'divide-slate-100 dark:divide-white/[0.04]'
                }`}>
                  {bodyLines.map((rowStr, rIdx) => {
                    const cells = extractCells(rowStr);
                    return (
                      <tr
                        key={rIdx}
                        className={`transition-colors ${
                          isSepia
                            ? rIdx % 2 === 0 ? 'bg-transparent' : 'bg-[#FAF3E6]'
                            : isOled
                            ? rIdx % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.03]'
                            : rIdx % 2 === 0 ? 'bg-transparent' : 'bg-slate-50/60 dark:bg-white/[0.02]'
                        }`}
                      >
                        {cells.map((cell, cIdx) => {
                          const align = alignments[cIdx] || 'left';
                          return (
                            <td
                              key={cIdx}
                              className={`py-3 px-4 text-xs sm:text-[13px] border-r last:border-r-0 leading-relaxed font-normal ${
                                isSepia
                                  ? 'text-[#2D1F13] border-[#EFE2CC]'
                                  : isOled
                                  ? 'text-slate-200 border-white/10'
                                  : 'text-slate-700 dark:text-slate-300 border-slate-100 dark:border-white/5'
                              } ${align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'}`}
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
          <p key={`p-${i}`} className={`my-3 font-normal leading-relaxed ${textSizeClass} ${bodyTextColor}`}>
            {parseInlineMarkdown(tableLines[0], `p-${i}`)}
          </p>
        );
        continue;
      }
    }

    // 9. Callout / Exam Trap / Mnemonic / Note Block (> ...)
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
      const isMnemonic = /🧠|mnemonic|yad|yaad|trick|स्मरण/i.test(quoteText);

      let cardBorder = isSepia
        ? 'border-indigo-600/50 border-l-4'
        : isOled
        ? 'border-indigo-500/50 border-l-4'
        : 'border-indigo-500/40 border-l-4';
      let cardBg = isSepia
        ? 'bg-[#EEF3FB] border-[#D4E0F0]'
        : isOled
        ? 'bg-[#0B1220] border-indigo-900/40'
        : 'bg-indigo-50/70 dark:bg-indigo-950/25';
      let titleColor = isSepia
        ? 'text-indigo-950 font-black'
        : isOled
        ? 'text-indigo-300 font-black'
        : 'text-indigo-700 dark:text-indigo-300';
      let textColor = isSepia
        ? 'text-[#1D2939]'
        : isOled
        ? 'text-slate-100'
        : 'text-slate-800 dark:text-slate-200';
      let iconColor = isSepia
        ? 'text-indigo-700'
        : isOled
        ? 'text-indigo-400'
        : 'text-indigo-600 dark:text-indigo-400';
      let calloutTitle = 'Important Note';
      let IconComponent: React.ComponentType<{ className?: string }> = BookOpen;

      if (isTrap) {
        cardBorder = isSepia
          ? 'border-amber-700/70 border-l-4'
          : isOled
          ? 'border-amber-500/70 border-l-4'
          : 'border-amber-500/60 border-l-4';
        cardBg = isSepia
          ? 'bg-[#FAF0E1] border-[#E8D4BE]'
          : isOled
          ? 'bg-[#181106] border-amber-900/40'
          : 'bg-amber-50/80 dark:bg-amber-950/25';
        titleColor = isSepia
          ? 'text-amber-950 font-black'
          : isOled
          ? 'text-amber-300 font-black'
          : 'text-amber-800 dark:text-amber-300';
        textColor = isSepia
          ? 'text-[#2D1904]'
          : isOled
          ? 'text-amber-100'
          : 'text-amber-950 dark:text-amber-100';
        iconColor = isSepia
          ? 'text-amber-700'
          : isOled
          ? 'text-amber-400'
          : 'text-amber-600 dark:text-amber-400';
        calloutTitle = 'Exam Trap & High-Yield Alert';
        IconComponent = AlertCircle;
      } else if (isTip) {
        cardBorder = isSepia
          ? 'border-emerald-700/70 border-l-4'
          : isOled
          ? 'border-emerald-500/70 border-l-4'
          : 'border-emerald-500/60 border-l-4';
        cardBg = isSepia
          ? 'bg-[#ECF5E8] border-[#CEE4C7]'
          : isOled
          ? 'bg-[#06180E] border-emerald-900/40'
          : 'bg-emerald-50/80 dark:bg-emerald-950/25';
        titleColor = isSepia
          ? 'text-emerald-950 font-black'
          : isOled
          ? 'text-emerald-300 font-black'
          : 'text-emerald-800 dark:text-emerald-300';
        textColor = isSepia
          ? 'text-[#0E2812]'
          : isOled
          ? 'text-emerald-100'
          : 'text-emerald-950 dark:text-emerald-100';
        iconColor = isSepia
          ? 'text-emerald-700'
          : isOled
          ? 'text-emerald-400'
          : 'text-emerald-600 dark:text-emerald-400';
        calloutTitle = 'Exam Shortcut & Pro Tip';
        IconComponent = Lightbulb;
      } else if (isMnemonic) {
        cardBorder = isSepia
          ? 'border-purple-700/70 border-l-4'
          : isOled
          ? 'border-purple-400/70 border-l-4'
          : 'border-purple-500/60 border-l-4';
        cardBg = isSepia
          ? 'bg-[#F4EBF7] border-[#DFCCEB]'
          : isOled
          ? 'bg-[#150B22] border-purple-900/40'
          : 'bg-gradient-to-br from-purple-50/90 via-indigo-50/50 to-pink-50/30 dark:from-purple-950/30 dark:via-indigo-950/20 dark:to-pink-950/15';
        titleColor = isSepia
          ? 'text-purple-950 font-black'
          : isOled
          ? 'text-purple-300 font-black'
          : 'text-purple-800 dark:text-purple-300';
        textColor = isSepia
          ? 'text-[#210B2B]'
          : isOled
          ? 'text-purple-100'
          : 'text-purple-950 dark:text-purple-100';
        iconColor = isSepia
          ? 'text-purple-700'
          : isOled
          ? 'text-purple-400'
          : 'text-purple-600 dark:text-purple-400';
        calloutTitle = 'Master Mnemonic & Memory Anchor';
        IconComponent = Brain;
      } else if (isKey) {
        cardBorder = isSepia
          ? 'border-purple-700/70 border-l-4'
          : isOled
          ? 'border-purple-400/70 border-l-4'
          : 'border-purple-500/60 border-l-4';
        cardBg = isSepia
          ? 'bg-[#F4EBF7] border-[#DFCCEB]'
          : isOled
          ? 'bg-[#150B22] border-purple-900/40'
          : 'bg-purple-50/80 dark:bg-purple-950/25';
        titleColor = isSepia
          ? 'text-purple-950 font-black'
          : isOled
          ? 'text-purple-300 font-black'
          : 'text-purple-800 dark:text-purple-300';
        textColor = isSepia
          ? 'text-[#210B2B]'
          : isOled
          ? 'text-purple-100'
          : 'text-purple-950 dark:text-purple-100';
        iconColor = isSepia
          ? 'text-purple-700'
          : isOled
          ? 'text-purple-400'
          : 'text-purple-600 dark:text-purple-400';
        calloutTitle = 'Core Concept';
        IconComponent = Zap;
      }

      elements.push(
        <div
          key={`callout-${i}`}
          className={`my-5 p-4 sm:p-5 rounded-r-2xl rounded-l-md border ${cardBorder} ${cardBg} shadow-2xs transition-all`}
        >
          <div className="flex items-center gap-2 mb-3 font-black text-xs uppercase tracking-wider">
            <IconComponent className={`w-4 h-4 shrink-0 ${iconColor}`} />
            <span className={titleColor}>{calloutTitle}</span>
          </div>
          <div className={`text-xs sm:text-sm leading-relaxed ${textColor} font-medium space-y-2`}>
            {quoteLines.map((qLine, qIdx) => {
              const trimmedQ = qLine.trim();
              if (!trimmedQ) return null;

              // Bullet item inside callout (- or *)
              if (trimmedQ.startsWith('- ') || trimmedQ.startsWith('* ')) {
                const itemContent = trimmedQ.slice(2).trim();

                // Check for single-letter or short token mnemonic item, e.g. "**T** → Territories" or "**T:** Territories"
                const mnemonicMatch = itemContent.match(/^\*\*([A-Za-z0-9])\*\*\s*(?:→|:|-)\s*(.*)/);
                if (mnemonicMatch) {
                  const letter = mnemonicMatch[1];
                  const rest = mnemonicMatch[2];
                  return (
                    <div
                      key={qIdx}
                      className={`flex items-center gap-2.5 py-1.5 px-3 rounded-xl border shadow-2xs transition-all ${
                        isSepia
                          ? 'bg-[#FFFDF9] border-[#DECDB5] text-[#180E05]'
                          : isOled
                          ? 'bg-white/[0.06] border-white/10 text-white'
                          : 'bg-white/80 dark:bg-white/[0.04] border-slate-200/70 dark:border-white/[0.07] text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-mono font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                        {letter}
                      </span>
                      <span className={`font-black select-none text-xs ${
                        isSepia ? 'text-[#824408]' : isOled ? 'text-indigo-400' : 'text-indigo-500 dark:text-indigo-400'
                      }`}>→</span>
                      <span className={`flex-1 font-semibold text-xs sm:text-[13px] ${
                        isSepia ? 'text-[#180E05]' : isOled ? 'text-white' : 'text-slate-800 dark:text-slate-200'
                      }`}>
                        {parseInlineMarkdown(rest, `callout-${i}-${qIdx}`)}
                      </span>
                    </div>
                  );
                }

                // Check if it's a timeline sequence step with an arrow, e.g. "**1951 (1st CAA)** → **9th Schedule**"
                if (itemContent.includes('→')) {
                  return (
                    <div
                      key={qIdx}
                      className={`flex items-center gap-2 py-1 px-2.5 rounded-lg border ${
                        isSepia
                          ? 'bg-[#FFFDF9] border-[#DECDB5] text-[#180E05]'
                          : isOled
                          ? 'bg-white/[0.04] border-white/10 text-slate-200'
                          : 'bg-white/50 dark:bg-white/[0.02] border-slate-200/40 dark:border-white/[0.04]'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shrink-0" />
                      <div className="flex-1 leading-relaxed text-xs sm:text-[13px]">
                        {parseInlineMarkdown(itemContent, `callout-${i}-${qIdx}`)}
                      </div>
                    </div>
                  );
                }

                // Standard bullet list item
                return (
                  <div key={qIdx} className="flex items-start gap-2.5 py-0.5 pl-1">
                    <span className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${
                      isSepia ? 'bg-[#824408]' : isOled ? 'bg-indigo-400' : 'bg-indigo-500/70 dark:bg-indigo-400/70'
                    }`} />
                    <div className="flex-1 leading-relaxed text-xs sm:text-[13px]">
                      {parseInlineMarkdown(itemContent, `callout-${i}-${qIdx}`)}
                    </div>
                  </div>
                );
              }

              // Sub-heading inside callout (### or ##)
              if (trimmedQ.startsWith('### ') || trimmedQ.startsWith('## ')) {
                return (
                  <div key={qIdx} className={`font-black text-xs sm:text-sm pt-1 ${
                    isSepia ? 'text-[#180E05]' : isOled ? 'text-white' : 'text-slate-900 dark:text-white'
                  }`}>
                    {parseInlineMarkdown(trimmedQ.replace(/^#+\s*/, ''), `callout-${i}-${qIdx}`)}
                  </div>
                );
              }

              // Standard paragraph inside callout
              return (
                <p key={qIdx} className="leading-relaxed">
                  {parseInlineMarkdown(trimmedQ, `callout-${i}-${qIdx}`)}
                </p>
              );
            })}
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
                : isSepia
                ? 'border-[#DECDB5] bg-[#FAF3E6]'
                : isOled
                ? 'border-white/20 bg-white/5'
                : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
            }`}
          >
            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
          </span>
          <div
            className={`flex-1 ${textSizeClass} ${
              isChecked
                ? isSepia ? 'line-through text-[#8C7A68]' : 'line-through text-slate-400 dark:text-slate-500'
                : bodyTextColor
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
            <span className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${
              isSepia ? 'bg-[#824408]' : isOled ? 'bg-indigo-400' : 'bg-slate-400 dark:bg-slate-500'
            }`} />
          ) : (
            <span className={`w-2 h-2 rounded-full mt-2 shrink-0 ring-4 ${
              isSepia
                ? 'bg-[#824408] ring-[#824408]/15'
                : isOled
                ? 'bg-indigo-400 ring-indigo-400/20'
                : 'bg-indigo-500 dark:bg-indigo-400 ring-indigo-500/15'
            }`} />
          )}
          <div
            className={`flex-1 ${
              isNested ? 'text-xs sm:text-[13px]' : textSizeClass
            } ${bodyTextColor}`}
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
          <span className={`w-5 h-5 sm:w-6 sm:h-6 rounded-lg text-xs font-mono font-black flex items-center justify-center shrink-0 mt-0.5 shadow-2xs ${
            isSepia
              ? 'bg-[#EFE2CC] text-[#180E05] border border-[#DECDB5]'
              : isOled
              ? 'bg-white/10 text-white border border-white/20'
              : 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/80 dark:border-indigo-800/60'
          }`}>
            {num}
          </span>
          <div className={`flex-1 ${textSizeClass} ${bodyTextColor}`}>
            {parseInlineMarkdown(itemText, `ol-${i}`)}
          </div>
        </div>
      );
      i++;
      continue;
    }

    // 13. Regular Paragraph
    elements.push(
      <p key={`p-${i}`} className={`my-3.5 font-normal leading-relaxed ${textSizeClass} ${bodyTextColor}`}>
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
  const [readerTheme, setReaderTheme] = useState<'default' | 'sepia' | 'oled'>('default');
  const [readerWidth, setReaderWidth] = useState<'standard' | 'wide' | 'full'>('standard');
  const [showOutline, setShowOutline] = useState<boolean>(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copyFeedbackId, setCopyFeedbackId] = useState<string | null>(null);

  // Keyboard shortcut & Body scroll lock: Escape key closes the full page reader
  useEffect(() => {
    if (!activeReadingNote) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveReadingNote(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeReadingNote]);

  // Extract headings from active note for the Interactive Outline / Table of Contents
  const outlineHeadings = useMemo(() => {
    if (!activeReadingNote?.content) return [];
    const lines = activeReadingNote.content.split('\n');
    const list: { id: string; text: string; level: number }[] = [];
    lines.forEach((line, idx) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('## ')) {
        list.push({
          id: `sec-${idx}`,
          text: trimmed.replace(/^##\s+/, '').replace(/\*\*/g, '').trim(),
          level: 2
        });
      } else if (trimmed.startsWith('### ')) {
        list.push({
          id: `sec-${idx}`,
          text: trimmed.replace(/^###\s+/, '').replace(/\*\*/g, '').trim(),
          level: 3
        });
      }
    });
    return list;
  }, [activeReadingNote]);

  // Scroll Progress handler for sticky progress bar
  const handleReaderScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const total = el.scrollHeight - el.clientHeight;
    if (total > 0) {
      const progress = Math.min(100, Math.max(0, (el.scrollTop / total) * 100));
      setScrollProgress(progress);
    }
  };

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
  const handleToggleStar = useCallback((noteId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    soundManager.playClick();
    haptics.light();
    setNotes(prev =>
      prev.map(n => (n.id === noteId ? { ...n, isStarred: !n.isStarred } : n))
    );
    setActiveReadingNote(prev => (prev && prev.id === noteId ? { ...prev, isStarred: !prev.isStarred } : prev));
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

      {/* 📖 5. EXECUTIVE FULL-PAGE IMMERSIVE NOTE READER */}
      {activeReadingNote && typeof document !== 'undefined' && createPortal(
        <div
          className={`fixed inset-0 z-[100] flex flex-col ${
            readerTheme === 'sepia'
              ? 'reader-canvas-sepia bg-[#FAF4E6] text-[#2D1F13]'
              : readerTheme === 'oled'
              ? 'reader-canvas-oled bg-[#000000] text-slate-100'
              : 'bg-[#FDFCFB] dark:bg-[#0A0D18] text-slate-900 dark:text-slate-100'
          } animate-fade-in select-text`}
        >
          {/* Top Sticky Executive Header */}
          <header
            className={`sticky top-0 z-40 h-16 px-4 sm:px-6 border-b flex items-center justify-between transition-colors shadow-xs ${
              readerTheme === 'sepia'
                ? 'bg-[#F2E7D5] border-[#DECDB5] text-[#180E05]'
                : readerTheme === 'oled'
                ? 'bg-[#0B0B0B] border-white/20 text-white'
                : 'bg-white dark:bg-[#121626] border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white'
            }`}
          >
            {/* Left: Back to Notes & Breadcrumb */}
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setActiveReadingNote(null);
                }}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-black text-xs sm:text-sm border border-slate-300/80 dark:border-slate-700 shadow-2xs transition-all cursor-pointer shrink-0"
                title="Back to all digital notes (Esc)"
              >
                <ArrowLeft className="w-4 h-4 text-indigo-600 dark:text-indigo-400 stroke-[2.5]" />
                <span>Back to Notes</span>
              </button>

              <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-300 pl-3 border-l border-slate-300 dark:border-slate-700 truncate">
                <span>Notes</span>
                <span>/</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-black truncate max-w-[220px]">
                  {activeReadingNote.subject}
                </span>
              </div>
            </div>

            {/* Center: Language & Reading Time Badges */}
            <div className="hidden lg:flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black shadow-2xs ${getLanguageBadge(activeReadingNote.language).className}`}>
                <span>{getLanguageBadge(activeReadingNote.language).flag}</span>
                <span>{getLanguageBadge(activeReadingNote.language).label}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300/80 dark:border-slate-700 shadow-2xs">
                <Clock className="w-3.5 h-3.5 text-indigo-500 stroke-[2.5]" />
                <span>{activeReadingNote.readingTimeMinutes || 3} min read</span>
              </span>
            </div>

            {/* Right: Reader Controls & Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Outline / TOC Toggle */}
              {outlineHeadings.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowOutline(!showOutline)}
                  className={`p-2 sm:px-3 sm:py-2 rounded-xl transition-all cursor-pointer font-bold text-xs flex items-center gap-1.5 shadow-2xs border ${
                    showOutline
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300/80 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                  title={showOutline ? 'Hide Table of Contents' : 'Show Table of Contents'}
                >
                  <List className="w-4 h-4 stroke-[2.5]" />
                  <span className="hidden xl:inline">Index</span>
                </button>
              )}

              {/* Font Size Selector */}
              <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300/80 dark:border-slate-700 shadow-2xs text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setReaderFontSize('base')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    readerFontSize === 'base'
                      ? 'bg-indigo-600 text-white font-black shadow-xs'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-bold'
                  }`}
                  title="Default Font (A)"
                >
                  A
                </button>
                <button
                  type="button"
                  onClick={() => setReaderFontSize('lg')}
                  className={`px-2.5 py-1 rounded-lg text-sm transition-all ${
                    readerFontSize === 'lg'
                      ? 'bg-indigo-600 text-white font-black shadow-xs'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-bold'
                  }`}
                  title="Medium Font (A+)"
                >
                  A+
                </button>
                <button
                  type="button"
                  onClick={() => setReaderFontSize('xl')}
                  className={`px-2.5 py-1 rounded-lg text-base transition-all ${
                    readerFontSize === 'xl'
                      ? 'bg-indigo-600 text-white font-black shadow-xs'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-bold'
                  }`}
                  title="Large Font (A++)"
                >
                  A++
                </button>
              </div>

              {/* Theme Selector (Paper / Sepia / OLED) */}
              <div className="hidden xl:flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300/80 dark:border-slate-700 shadow-2xs text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setReaderTheme('default')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    readerTheme === 'default'
                      ? 'bg-indigo-600 text-white font-black shadow-xs'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-semibold'
                  }`}
                >
                  Paper
                </button>
                <button
                  type="button"
                  onClick={() => setReaderTheme('sepia')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    readerTheme === 'sepia'
                      ? 'bg-amber-700 text-white font-black shadow-xs'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-semibold'
                  }`}
                  title="Warm Sepia for Eye-Care"
                >
                  Sepia
                </button>
                <button
                  type="button"
                  onClick={() => setReaderTheme('oled')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    readerTheme === 'oled'
                      ? 'bg-black text-white font-black shadow-xs border border-white/30'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-semibold'
                  }`}
                  title="Pure Dark OLED"
                >
                  OLED
                </button>
              </div>

              {/* Width Selector */}
              <button
                type="button"
                onClick={() => setReaderWidth(w => (w === 'standard' ? 'wide' : w === 'wide' ? 'full' : 'standard'))}
                className="hidden lg:flex p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300/80 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer shadow-2xs"
                title={`Reading Canvas: ${readerWidth.toUpperCase()} (Click to toggle)`}
              >
                <Maximize2 className="w-4 h-4 stroke-[2.5]" />
              </button>

              {/* Star Button */}
              <button
                type="button"
                onClick={() => handleToggleStar(activeReadingNote.id)}
                className={`p-2 rounded-xl border transition-all cursor-pointer shadow-2xs ${
                  activeReadingNote.isStarred
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-500'
                    : 'bg-slate-100 dark:bg-slate-800 border-slate-300/80 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
                title={activeReadingNote.isStarred ? 'Starred (Click to unstar)' : 'Star this note'}
              >
                <Star className={`w-4 h-4 ${activeReadingNote.isStarred ? 'fill-amber-400 text-amber-500' : 'text-slate-700 dark:text-slate-300 stroke-[2.5]'}`} />
              </button>

              {/* Copy Button */}
              <button
                type="button"
                onClick={() => handleCopyNote(activeReadingNote)}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300/80 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer shadow-2xs"
                title="Copy note markdown"
              >
                {copyFeedbackId === activeReadingNote.id ? (
                  <Check className="w-4 h-4 text-emerald-500 stroke-[3]" />
                ) : (
                  <Copy className="w-4 h-4 stroke-[2.5]" />
                )}
              </button>

              {/* Print Button */}
              <button
                type="button"
                onClick={() => window.print()}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300/80 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer shadow-2xs"
                title="Print this revision note"
              >
                <Printer className="w-4 h-4 stroke-[2.5]" />
              </button>

              {/* Admin Edit Button */}
              {isAdmin && (
                <button
                  type="button"
                  onClick={e => {
                    handleOpenEditModal(activeReadingNote, e);
                  }}
                  className="hidden sm:flex px-3.5 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 font-black text-xs transition-all cursor-pointer items-center gap-1.5 shadow-2xs"
                >
                  <Edit3 className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Edit</span>
                </button>
              )}

              {/* Done Reading / Close Button */}
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setActiveReadingNote(null);
                }}
                className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs transition-all cursor-pointer shadow-xs flex items-center gap-1.5 ml-1 border border-rose-500"
                title="Exit full-page reader"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
                <span className="hidden sm:inline">Close</span>
              </button>
            </div>

            {/* Glowing Scroll Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-slate-200/50 dark:bg-white/5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-100"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          </header>

          {/* Main Body: Sidebar + Centered Document Canvas */}
          <div className="flex-1 flex overflow-hidden">
            {/* Left Table of Contents Sidebar (Collapsible) */}
            {showOutline && outlineHeadings.length > 0 && (
              <aside
                className={`w-72 hidden xl:flex flex-col border-r p-6 overflow-y-auto custom-scrollbar shrink-0 select-none ${
                  readerTheme === 'sepia'
                    ? 'border-[#E6DCBF] bg-[#F5EEDF]/70'
                    : readerTheme === 'oled'
                    ? 'border-white/10 bg-[#080808]'
                    : 'border-slate-200/80 dark:border-white/10 bg-slate-50/70 dark:bg-[#0E101D]/70'
                }`}
              >
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200/60 dark:border-white/10">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
                    <List className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Table of Contents</span>
                  </h4>
                  <span className="text-[10px] font-mono font-bold text-slate-400 px-1.5 py-0.5 rounded bg-slate-200/50 dark:bg-white/10">
                    {outlineHeadings.length}
                  </span>
                </div>

                <nav className="space-y-1 text-xs">
                  {outlineHeadings.map(heading => (
                    <button
                      key={heading.id}
                      type="button"
                      onClick={() => {
                        const el = document.getElementById(heading.id);
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className={`w-full text-left py-1.5 px-2.5 rounded-lg transition-colors cursor-pointer truncate ${
                        heading.level === 3
                          ? 'pl-6 text-[11px] text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20'
                          : 'font-bold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30'
                      }`}
                      title={heading.text}
                    >
                      {heading.text}
                    </button>
                  ))}
                </nav>
              </aside>
            )}

            {/* Main Reading Scroll Area */}
            <div
              onScroll={handleReaderScroll}
              className="flex-1 overflow-y-auto custom-scrollbar px-4 sm:px-10 lg:px-16 py-8 sm:py-12"
            >
              <div
                className={`mx-auto w-full transition-all duration-300 ${
                  readerWidth === 'wide'
                    ? 'max-w-6xl'
                    : readerWidth === 'full'
                    ? 'max-w-full px-2 sm:px-6'
                    : 'max-w-4xl'
                }`}
              >
                {/* Cover Image Banner */}
                {activeReadingNote.coverImage && (
                  <div className="relative w-full h-56 sm:h-80 md:h-[420px] rounded-3xl overflow-hidden shadow-lg border border-slate-200/80 dark:border-white/10 mb-8 shrink-0 group">
                    <img
                      src={activeReadingNote.coverImage}
                      alt={activeReadingNote.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-3 text-white">
                      <span className="px-4 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-bold">
                        {activeReadingNote.subject}
                      </span>
                      <span className="px-4 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-xs font-semibold flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{activeReadingNote.readingTimeMinutes || 3} min read</span>
                      </span>
                    </div>
                  </div>
                )}

                {/* Major Title */}
                <h1 className={`text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-5 ${
                  readerTheme === 'sepia'
                    ? 'text-[#180E05]'
                    : readerTheme === 'oled'
                    ? 'text-white'
                    : 'text-slate-900 dark:text-white'
                }`}>
                  {activeReadingNote.title}
                </h1>

                {/* Metadata Row */}
                <div className={`flex flex-wrap items-center gap-2.5 text-xs pb-6 border-b mb-8 ${
                  readerTheme === 'sepia'
                    ? 'text-[#5C452D] border-[#DECDB5]'
                    : readerTheme === 'oled'
                    ? 'text-slate-400 border-white/15'
                    : 'text-slate-500 dark:text-slate-400 border-slate-200/80 dark:border-white/10'
                }`}>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${getLanguageBadge(activeReadingNote.language).className}`}>
                    <span>{getLanguageBadge(activeReadingNote.language).flag}</span>
                    <span>{getLanguageBadge(activeReadingNote.language).label}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{activeReadingNote.readingTimeMinutes || 3} min read</span>
                  </span>
                  <span>•</span>
                  <span className="capitalize font-semibold text-indigo-600 dark:text-indigo-400">
                    {activeReadingNote.category}
                  </span>
                  <span>•</span>
                  <span>
                    Updated: {new Date(activeReadingNote.updatedAt || activeReadingNote.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex flex-wrap items-center gap-1.5 sm:ml-auto mt-2 sm:mt-0">
                    {activeReadingNote.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-medium text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Formatted Markdown Content */}
                <div className="font-sans pb-16">
                  {renderProfessionalNotesContent(activeReadingNote.content, readerFontSize, readerTheme)}
                </div>

                {/* End of Note Milestone Card */}
                <div className="my-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-200 dark:border-indigo-900/50 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
                  <div>
                    <div className="flex items-center justify-center sm:justify-start gap-2 mb-2 font-black text-indigo-700 dark:text-indigo-300">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      <span className="text-base sm:text-lg">You have completed this revision sheet!</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      Review your key takeaways, revise frequently, or copy notes for your personal study binder.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleCopyNote(activeReadingNote)}
                      className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-white font-bold text-xs shadow-xs hover:bg-slate-100 dark:hover:bg-slate-700 transition-all flex items-center gap-2 cursor-pointer border border-slate-200 dark:border-white/10"
                    >
                      {copyFeedbackId === activeReadingNote.id ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-500" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy Note</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playLevelUp();
                        setActiveReadingNote(null);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs shadow-md transition-all cursor-pointer flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      <span>Finish Reading</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* ✏️ 6. CREATE & EDIT NOTE MODAL */}
      {isCreateModalOpen && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-fade-in">
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
        </div>,
        document.body
      )}
      {/* 🔐 7. ADMIN PASSCODE VERIFICATION & SECURITY MODAL */}
      {isAdminModalOpen && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
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
        </div>,
        document.body
      )}
    </div>
  );
};
