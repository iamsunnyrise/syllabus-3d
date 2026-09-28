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
    id: "note-history-stone-age-en",
    title: "Ancient History: The Stone Age & Chalcolithic Cultures (Comprehensive Exam Notes)",
    language: "en",
    subject: "Ancient History (प्राचीन इतिहास)",
    category: "concept",
    tags: ["History","Ancient History","Stone Age","Palaeolithic","Mesolithic","Neolithic","Chalcolithic","Bhimbetka","SSC CGL","UPSC"],
    summary: "Comprehensive 10-section master notes on Pre-historic & Proto-historic India, covering timeline evolution, Palaeolithic to Chalcolithic phases, tool technologies, key archaeological sites, cave paintings, and exam traps.",
    readingTimeMinutes: 7,
    isStarred: true,
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    createdAt: "2026-09-28T14:15:00Z",
    updatedAt: "2026-09-28T14:15:00Z",
    content: "# Ancient History: The Stone Age & Chalcolithic Cultures\n\n> 🎯 **Exam-Ready Master Note:** A structured, high-yield guide to the Pre-historic and Proto-historic foundations of India covering the Palaeolithic, Mesolithic, Neolithic, and Chalcolithic periods, tool typologies, major excavations, Bhimbetka rock art, and key archaeological milestones tailored for SSC CGL, CHSL, CPO, State PCS, and UPSC CSE.\n\nPre-history represents the vast expanse of human existence before the invention of writing. In India, human cultural evolution transitioned across three primary stone ages into the first metal-using village cultures, documented exclusively through archaeological excavations.\n\n---\n\n## 🏛️ 1. Conceptual Foundation & Historiographical Classifications\n\nHistory is chronologically partitioned to enable systematic study based on socio-economic transitions, technology, and governance.\n\n### Traditional Periodization of Indian History\n\n| Period | Time Horizon | Pivotal Milestone / Defining Characteristic |\n| :--- | :--- | :--- |\n| **Ancient History** | Earliest times to 7th Century AD | From early hominid toolmaking, Harappa, Vedic age, through the Mauryan and Gupta golden eras up to Harsha's empire (647 AD). |\n| **Medieval History** | 8th Century AD to 18th Century AD | Commenced with early Arab and Islamic incursions (Sindh conquest, 712 AD), Delhi Sultanate, and the Mughal Empire up to Aurangzeb's death (1707 AD). |\n| **Modern History** | 18th Century AD to Present Day | Began with European colonial expansion (Battle of Plassey 1757), British Crown rule, the National Freedom Movement, and post-1947 Republic. |\n\n### Major Historiographical Classification Systems\n\n1. **James Mill's Tripartite Communal Division (1817):**\n   - In his seminal work, *'The History of British India'*, Scottish historian **James Mill** categorized Indian history into three sectarian phases:\n     1. **Hindu Period** (Ancient)\n     2. **Muslim Period** (Medieval)\n     3. **British Period** (Modern)\n   - *Exam Trap Alert:* Mill used religion as the basis for the first two periods, but switched to colonial nationality for the third.\n2. **Christian Jürgensen Thomsen's Three-Age System (1836):**\n   - **C.J. Thomsen**, curator of the National Museum of Denmark (Copenhagen), classified ancient human past on the basis of primary cutting material into:\n     1. **Stone Age**\n     2. **Bronze Age**\n     3. **Iron Age**\n\n### Three-Fold Division Based on Written Records\n\n| Category | Written Script Evidence | Decipherment Status | Cultural Equivalents in India |\n| :--- | :--- | :--- | :--- |\n| **Pre-History (प्रागैतिहासिक)** | **Absent** | No written records exist; known purely through archaeological excavations. | **Palaeolithic, Mesolithic, Neolithic, & Chalcolithic periods.** |\n| **Proto-History (आद्य-ऐतिहासिक)** | **Present** | Script exists, but remains **undeciphered** or lacks surviving literary continuity. | **Indus Valley Civilisation (Bronze Age)**; early Chalcolithic cultures. |\n| **Historical Period (ऐतिहासिक काल)** | **Present** | Written inscriptions and literary texts are **fully deciphered** and available. | **From 6th Century BC onwards** (Mahajanapadas, Mauryas, Buddhism). |\n\n### Understanding the Timeline & Planetary Scale\n\n- **BC vs AD Coordinate System:**\n  - **'0'** denotes the conventional baseline of the **Birth of Jesus Christ**.\n  - **BC (Before Christ)** or **BCE (Before Common Era):** Years are counted *backwards* (countdown style). The number decreases as we move forward toward 0 (e.g., 500 BC is older than 300 BC).\n  - **AD (Anno Domini - \"In the year of the Lord\")** or **CE (Common Era):** Years advance forward from 0.\n- **Century Terminology:** 1 Century = 100 Years.\n  - *8th Century BC* = 800 BC to 700 BC.\n  - *3rd Century AD* = 200 AD to 300 AD.\n  - *18th Century AD* = 1700 AD to 1800 AD.\n- **Geological Deep Time:**\n  - Earth's age is approximately **4.5 Billion years**.\n  - The **Quaternary Period** is the latest geological era, which commenced **2.58 Million years ago** and continues to this day.\n  - **Quaternary Division:**\n    - **Pleistocene Epoch (Ice Age):** 2.58 Mya to ~10,000 BC. Covered by bitter glacial conditions; coincided with the entire Palaeolithic Age.\n    - **Holocene Epoch (Post-Ice Age):** 10,000 BC to Present. Marked by global warming, retreat of ice sheets, expansion of tropical flora/fauna; coincided with the Mesolithic, Neolithic, and Metal ages.\n\n---\n\n## ⏳ 2. Chronological Timeline & Epochal Evolution\n\n```\n[2.58 Mya] Quaternary Era Begins (Pleistocene Ice Age)\n     │\n     ▼\n[5,00,000 BC - 50,000 BC] Lower Palaeolithic (Handaxes, Cleavers, Sohan Valley)\n     │\n     ▼\n[50,000 BC - 40,000 BC] Middle Palaeolithic (Flake Technology, Nevasan Culture)\n     │\n     ▼\n[40,000 BC - 10,000 BC] Upper Palaeolithic (Blade & Burin, Homo Sapiens, Flint Stone)\n     │\n     ▼\n[10,000 BC] Pleistocene Ends ➔ Holocene Warm Epoch Begins\n     │\n     ▼\n[9,000 BC - 7,000 BC]* Mesolithic Period (Microliths, Animal Domestication at Bagor)\n     │                  *SSC Official Key: 12,000 BC - 10,000 BC\n     ▼\n[7,000 BC - 1,000 BC] Neolithic Period (Agriculture at Mehrgarh, Polished Celts, Pottery)\n     │\n     ▼\n[3,500 BC - 1,000 BC] Chalcolithic Period (First Metal: Copper, Rural Agro-Pastoral Cultures)\n```\n\n### Human Biological Evolution Chain\n\nThe physical and cognitive evolution of humanity progressed sequentially:\n\n```\nAustralopithecus ➔ Homo Habilis ➔ Homo Erectus ➔ Homo Neanderthalensis ➔ Homo Sapiens\n```\n\n1. **Australopithecus:** Bipedal ape-human ancestor originating in Southern/Eastern Africa.\n2. **Homo Habilis (\"Handy Man\"):** First hominid toolmaker; fabricated primitive Oldowan pebble choppers.\n3. **Homo Erectus (\"Upright Man\"):** Upright walking hominid; first to master and control fire; Acheulean handaxes. Fossil skull cap found at **Hathnora (Narmada Man, MP)** by Arun Sonakia (1982) is India's only known pre-human fossil.\n4. **Homo Neanderthalensis:** Adapted to harsh glacial climates; cave dweller; first to practice intentional burial rites for the deceased.\n5. **Homo Sapiens (\"Wise / Modern Thinking Man\"):** Emerged in the **Upper Palaeolithic** (c. 40,000 BC); refined blade technology, complex speech, and rock art creation.\n\n---\n\n## 📊 3. Classification, Tool Technology & Quantitative Breakdown\n\n### Comparative Matrix of Prehistoric Ages\n\n| Dimension | Palaeolithic Age (पुरापाषाण) | Mesolithic Age (मध्यपाषाण) | Neolithic Age (नवपाषाण) | Chalcolithic Age (ताम्रपाषाण) |\n| :--- | :--- | :--- | :--- | :--- |\n| **Meaning of Root** | *Palaeo* = Old, *Lithic* = Stone | *Meso* = Middle, *Lithic* = Stone | *Neo* = New, *Lithic* = Stone | *Chalco* = Copper, *Lithic* = Stone |\n| **Broad Timeframe** | 5,00,000 BC – 10,000 BC | 9,000 BC – 7,000 BC (SSC: 12,000–10,000 BC) | 7,000 BC – 1,000 BC | 3,500 BC – 1,000 BC |\n| **Geological Epoch** | **Pleistocene (Ice Age)** | Pleistocene ➔ **Holocene transition** | **Holocene (Warm epoch)** | **Holocene (Warm epoch)** |\n| **Primary Tool Typology** | Heavy core tools, Handaxes, Cleavers, Choppers, Flakes | **Microliths** (1 to 5 cm tiny geometric tools, backed blades, lunates, trapezes) | **Polished stone celts**, ground axes, chisels, bone/antler implements | **Copper tools** (flat axes, chisels, knives) + stone blades & microliths |\n| **Raw Material Used** | **Quartzite** (hence called \"Quartzite Men\"), Chert | Chert, Chalcedony, Agate, Quartz, Jasper | Basalt, Dolerite, Granite, Jadeite, Animal bone | Copper metal + Siliceous stone |\n| **Economic Subsistence** | Pure **Hunting & Food Gathering** | **Hunting, Herding, & Fishing** (Earliest Domestication) | **Food Production (Agriculture)** & Settled Animal Husbandry | **Agro-Pastoralism**, Metallurgy, Crafts & Regional Barter |\n| **Dwelling Patterns** | Natural rock shelters, open river terraces | Temporary open-air camps, rock shelters | Permanent mud/reed huts, **pit dwellings** (Burzahom) | Wattle-and-daub circular/rectangular mud houses, fortifications |\n| **Pottery Status** | **Absent** | Mostly absent (very crude handmade pottery at Chopani Mando) | **Cord-impressed pottery**, burnished grey ware (handmade & slow wheel) | **Painted Black-and-Red Ware (BRW)**, Ochre Coloured Pottery (OCP) |\n\n### Tool Technology Evolution\n\n- **Flake Technology (फलक तकनीक):** Developed in Middle Palaeolithic. Striking a prepared stone core (quartzite/chert) with a stone hammer to detach thin, razor-sharp flakes. Used to manufacture scrapers (to skin animal hides) and borers.\n- **Microlithic Revolution:** In Mesolithic, tiny stone blades (1–5 cm) were hafted onto bone or wooden shafts using tree resin to create composite tools like sickles, spears, and the **bow and arrow**.\n\n### Exam Mnemonics\n\n- **`P-M-N-C`** (Ages in Order): **P**alaeolithic ➔ **M**esolithic ➔ **N**eolithic ➔ **C**halcolithic.\n- **`A-H-H-N-S`** (Human Evolution): **A**ustralopithecus ➔ **H**abilis ➔ **H**omo erectus ➔ **N**eanderthal ➔ **S**apiens.\n- **`B-A-G`** (Earliest Domestication): **B**agor (Rajasthan) & **A**damgarh (MP) = **G**oat, sheep, and cattle herding.\n- **`C-F-B-M-P`** (Tool Progression): **C**hopper ➔ **F**lake ➔ **B**lade ➔ **M**icrolith ➔ **P**olished Celt.\n\n---\n\n## ⚖️ 4. Core Archaeological Sites, Excavators & Artifacts Table\n\n| Archaeological Site | Modern State / Region | Cultural Horizon | Key Archaeological Finding & Exam Significance |\n| :--- | :--- | :--- | :--- |\n| **Bhimbetka Caves** | Raisen Dist., **Madhya Pradesh** (Vindhyas) | Palaeolithic to Medieval | **750+ rock shelters, 500+ paintings**; continuous habitational sequence; discovered by **Dr. V.S. Wakankar (1957)**; UNESCO World Heritage Site (2003). |\n| **Patne** | Jalgaon Dist., **Maharashtra** | Upper Palaeolithic | **Ostrich eggshell fragments** with decorative incised geometric engravings and beads; confirms ostrich presence in prehistoric India. |\n| **Attirampakkam** | Kortallayar Basin, **Tamil Nadu** | Lower & Middle Palaeolithic | Acheulean bifacial handaxes; fossilized **animal footprints** and hominid tooth. |\n| **Hathnora** | Narmada Valley, Sehore/Hoshangabad, **MP** | Middle Pleistocene | **\"Narmada Man\" skull cap** discovered by **Arun Sonakia (1982)**; only known pre-human fossil (Homo erectus) discovered in South Asia. |\n| **Sohan / Soan Valley** | Rawalpindi / Potwar Plateau, **Punjab (Pakistan)** | Lower Palaeolithic | Type-site for Pebble Chopper-Chopping tool industry (**Sohan Culture**). |\n| **Belan Valley** | Mirzapur Dist., **Uttar Pradesh** | Palaeo to Neolithic | Rock shelters; continuous stratigraphic profile from Lower Palaeolithic to Neolithic; bone mother-goddess figurine. |\n| **Didwana** | Nagaur Dist., **Rajasthan** | Lower to Upper Palaeo | Extensive desert Acheulean tool industry; seasonal lake habitations. |\n| **Hunasagi / Hungsi** | Yadgir Dist., **Karnataka** | Lower Palaeolithic | Factory / workshop site where thousands of quartzite and limestone tools were manufactured. |\n| **Pahalgam** | Lidder Valley, **Jammu & Kashmir** | Lower Palaeolithic | High-altitude handaxes found in glacial moraines. |\n| **Bagor** | Bhilwara Dist., **Rajasthan** (Kothari river) | Mesolithic to Chalcolithic | **Largest Mesolithic site in India**; earliest evidence of **animal domestication** alongside Adamgarh; excavated by V.N. Misra. |\n| **Adamgarh** | Hoshangabad Dist., **Madhya Pradesh** | Mesolithic | Animal domestication evidence (cattle, sheep, goats); rock paintings; excavated by R.V. Joshi. |\n| **Langhnaj** | Mehsana Dist., **Gujarat** | Mesolithic | Microliths, human skeletons, animal bones (rhinoceros, wild boar), dental evidence of meat consumption. |\n| **Chopani Mando** | Belan Valley, Prayagraj, **UP** | Palaeo to Mesolithic | Earliest evidence of **crude handmade pottery**; circular beehive hut foundations. |\n| **Mehrgarh** | Kacchi Plain, Bolan Pass, **Balochistan (Pakistan)** | Aceramic Neolithic to Bronze | **Oldest agricultural settlement in Indian Subcontinent (c. 7000 BC)**; wheat, barley, cotton cultivation; mud-brick rectangular houses; excavated by J.F. Jarrige. |\n| **Burzahom** | 16 km NW of Srinagar, **Kashmir** | Neolithic | **Pit dwellings (गर्त-आवास)** with ladders and hearths; unique custom of **burying domestic dogs with human masters in graves**; bone needles/antlers. |\n| **Gufkral** | 41 km SE of Srinagar, **Kashmir** | Neolithic | Literally *\"Cave of the Potter\"* (कुम्हार की गुफा); transition from aceramic to ceramic phase; sheep and goat domestication. |\n| **Koldihwa & Mahagara** | Belan Valley, Prayagraj Dist., **UP** | Neolithic | **Earliest evidence of rice cultivation (7000–6000 BC)** in the Indian subcontinent; cord-impressed pottery; cattle pens. |\n| **Chirand** | Saran Dist., **Bihar** (Ganga confluence) | Neolithic | Massive collection of **bone and deer antler tools**; polished stone celts; circular bamboo-plastered huts. |\n| **Daojali Hading** | Dima Hasao, **Assam** (Brahmaputra basin) | Neolithic | Polished stone celts, corn grinders, fossil-wood tools, and **Jadeite stone tools** (indicating contact with China/Southeast Asia). |\n| **Ganeshwar-Jodhpura** | Sikar Dist., **Rajasthan** (near Khetri) | Chalcolithic | Major copper manufacturing hub; supplied copper arrowheads, spearheads, and celts to Harappan sites. |\n| **Daimabad** | Ahmednagar Dist., **Maharashtra** (Pravara river) | Jorwe Chalcolithic | **Largest site of the Jorwe culture (approx 20 ha)**; famous for the **Daimabad Bronze Hoard** (Bronze chariot driven by man with two bulls, Rhinoceros, Elephant, and Buffalo). |\n| **Inamgaon** | Pune Dist., **Maharashtra** (Ghod river) | Late Jorwe Chalcolithic | Large fortified village; 100+ mud houses, granary, irrigation canal; houses of craftsmen (potter, goldsmith, coppersmith); urn burials. |\n| **Navdatoli** | Khargone Dist., **Madhya Pradesh** (Narmada river) | Malwa Chalcolithic | Excavated by H.D. Sankalia; largest variety of agricultural crops (wheat, rice, ber, lentils, linseed); painted Black-and-Red pottery. |\n| **Lakhudiyar** | Barechhena, Almora Dist., **Uttarakhand** | Upper Palaeo / Meso | Literally *\"One Lakh Caves\"*; rock paintings on the banks of **Suyal River** showing dancing stick humans and wavy line motifs. |\n| **Catal Huyuk** | Konya Plain, **Anatolia (Turkey)** | Neolithic (c. 7500 BC) | One of the earliest proto-cities in human history; clustered mudbrick dwellings accessed via rooftops. |\n\n---\n\n## 🎯 5. Landmark Dates & Chronological Milestones\n\n- **1817:** James Mill publishes *The History of British India*, introducing the first communal periodization (Hindu, Muslim, British).\n- **1836:** C.J. Thomsen formulates the Three-Age System (Stone, Bronze, Iron) at the Copenhagen Museum.\n- **1861:** **Sir Alexander Cunningham** founds the **Archaeological Survey of India (ASI)** as first Archaeological Surveyor / Director-General (recognized as the **\"Father of Indian Archaeology\"**).\n- **1863:** **Robert Bruce Foote** discovers the first Palaeolithic artifact (an Acheulian handaxe) in India at **Pallavaram** near Chennai (recognized as the **\"Father of Indian Prehistory\"**).\n- **1867–68:** **Archibald Carlleyle** discovers the first prehistoric rock paintings in India at **Sohagighat** in the Kaimur Hills (Mirzapur, UP).\n- **1957:** **Dr. V.S. Wakankar** discovers the **Bhimbetka Rock Caves** in Raisen district, MP (honored as the **\"Father of Indian Rock Art\"**).\n- **1974:** International excavations begin at **Mehrgarh** led by Jean-François Jarrige and Catherine Jarrige, pushing back South Asian farming origins to 7000 BC.\n- **1982:** Geological surveyor **Arun Sonakia** unearths the fossilized skull cap of **\"Narmada Man\"** (Homo erectus) at Hathnora, MP.\n- **2003:** **Bhimbetka Rock Shelters** inscribed onto the **UNESCO World Heritage List**.\n\n---\n\n## ✒️ 6. Phase-by-Phase Stage Analysis\n\n### Stage 1: Lower Palaeolithic Period (5,00,000 BC – 50,000 BC)\n- **Environment:** Deep Pleistocene glacial era (Ice Age); cold climate covered by sheets of ice.\n- **Human Species:** Homo erectus.\n- **Tool Traditions:**\n  1. *Sohan / Soan Culture:* North-Western India (Punjab). Pebble tools, single-edged Choppers, and bifacial Chopping tools.\n  2. *Madrasian / Acheulian Culture:* Southern & Central India (Attirampakkam, Pallavaram). Handaxes (*coup-de-poing*) and cleavers.\n- **Way of Life:** Nomadic band hunting of large mammals, scavenging, and gathering roots and berries.\n\n### Stage 2: Middle Palaeolithic Period (50,000 BC – 40,000 BC)\n- **Dominant Tech:** **Flake Technology (फलक उद्योग)**. Core stones were flaked down to create sharp scrapers, borers, points, and knives.\n- **Nomenclature:** Often designated the **Nevasan Industry** after the type-site Nevasa in Maharashtra.\n- **Raw Material:** Transitioned from coarse quartzite to finer siliceous minerals (Chert, Jasper, Chalcedony).\n\n### Stage 3: Upper Palaeolithic Period (40,000 BC – 10,000 BC)\n- **Milestone:** Emergence of modern human beings (**Homo Sapiens**).\n- **Tech:** Specialized **Blade and Burin** tool industry; introduction of **Flint stone** tool manufacture.\n- **Artistic Awakening:** Earliest cave paintings at Bhimbetka; engraved decorative ostrich eggshells at Patne.\n\n### Stage 4: Mesolithic Era / Middle Stone Age (9,000 BC – 7,000 BC)\n- *Note:* **Staff Selection Commission (SSC)** past exam answer keys frequently cite **12,000 BC – 10,000 BC** for the Mesolithic horizon.\n- **Climatic Shift:** Ice Age retreated; warm and humid **Holocene** epoch commenced. Flora and fauna flourished.\n- **Tool Typology:** **Microliths (सूक्ष्म पाषाण उपकरण)**. Tiny geometric stones (1–5 cm) hafted into wood/bone handles to create arrowheads, speartips, and harpoons.\n- **Socio-Economic Transition:** Humans were hunters and gatherers who initiated **pastoral herding** and animal domestication (dogs, sheep, goats, cattle) at sites like **Bagor** and **Adamgarh**.\n\n### Stage 5: Neolithic Revolution (7,000 BC – 1,000 BC)\n- Coined as the **\"Neolithic Revolution\"** by Australian archaeologist **V. Gordon Childe** due to the dramatic shift from food *gathering* to food *producing*.\n- **Three Pillar Inventions:**\n  1. **Systematic Agriculture:** Cultivation of wheat, barley, cotton (Mehrgarh), rice (Koldihwa), and millets (South India).\n  2. **Polished Stone Tools (Celts):** Finely ground stone axes with razor-sharp working edges.\n  3. **Pottery:** Invented to store excess grains, cook cereals, and hold liquids. Evolved from cord-impressed handmade pots to wheel-thrown vessels.\n- **Settlement:** Sedentary villages with circular or rectangular mud-brick houses; subterranean pit-houses in cold lacustrine Kashmir (Burzahom).\n\n### Stage 6: Chalcolithic Era / Copper-Stone Age (3,500 BC – 1,000 BC)\n- **First Metal:** **Copper (तांबा)** was the first metal discovered and extracted by human beings.\n- **Economy:** Non-urban rural agricultural village communities.\n- **Technology:** Copper flat axes, chisels, and ornaments co-existed with stone blades.\n\n---\n\n## 📂 7. Regional Cultures & Archaeological Traditions Table\n\n| Regional Culture | Geography & River Basin | Time Span | Key Characteristics & Artifacts |\n| :--- | :--- | :---: | :--- |\n| **Ahar-Banas Culture** | SE Rajasthan (Banas Basin: Ahar, Gilund, Balathal) | c. 2100 – 1500 BC | Old name **Tambavati** (place with copper); abundant copper smelting; flat axes, bangles; stone microliths virtually absent in early phase; terracotta humped bulls. |\n| **Kayatha Culture** | Chambal tributary (Kalisindh), MP (Kayatha, Eran) | c. 2000 – 1800 BC | Sturdy chocolate-slipped painted pottery; rich copper caches (29 copper bangles and 2 cast copper axes found inside storage jars). |\n| **Malwa Culture** | Western MP (Navdatoli, Nagda, Eran, Narmada) | c. 1700 – 1200 BC | **Richest and most artistic painted pottery** among all Chalcolithic cultures; extensive multi-crop cultivation (wheat, rice, pulses, lentils). |\n| **Jorwe Culture** | Western Maharashtra (Godavari/Pravara: Jorwe, Nevasa, Daimabad, Inamgaon) | c. 1400 – 700 BC | Uniform matte-finished pottery; spouted carinated bowls with flaring rims; infant urn burials under house floors; Daimabad bronze hoard. |\n| **Savalda Culture** | Tapti River Valley, Maharashtra | c. 2300 – 2000 BC | Coarse burnished pottery decorated with painted motifs of arrows, fish-hooks, and spearheads. |\n| **Copper Hoard & OCP Culture** | Ganga-Yamuna Doab & Central India (Saipai, Gungeria, Bithur) | c. 2000 – 1500 BC | Associated with **Ochre Coloured Pottery (OCP)**; anthropomorphic figures, antennae swords, harpoons; **Gungeria (MP) hoard** yielded 424 copper weapons and 102 thin silver plates. |\n\n---\n\n## ⚡ 8. Dual Role / Functional Segregation & Socio-Economic Transitions\n\n| Cultural Dimension | Palaeolithic Man | Mesolithic Man | Neolithic Man | Chalcolithic Man |\n| :--- | :--- | :--- | :--- | :--- |\n| **Economic Role** | Consumer / Predator (Hunter-Gatherer) | Transitional Hunter & Herder | **Food Producer (Agriculturalist)** | Agro-Pastoralist & Metal Smelter |\n| **Settlement Pattern** | Nomadic cave / rock shelter wanderer | Semi-nomadic open seasonal camps | **Sedentary village communities** | Clustered rural farming villages |\n| **Tool Materiality** | Coarse Quartzite core tools | Micro-flints (Chalcedony/Chert) | Polished Basalt/Dolerite & Bone | **Copper metal** + stone blade industry |\n| **Architecture** | Natural caves (Bhimbetka) | Temporary thatched reed screens | Mud-brick rectangular huts & **pit dwellings** | Mud-plastered huts, granaries, chief residences |\n| **Disposal of Dead** | No formal burial evidence | Single extended burials with grave goods | Burials inside settlements; **dog-master burial** | **Urn burials** (infants in double urns mouth-to-mouth under house floor) |\n| **Knowledge of Horse/Iron** | **No** (neither known) | **No** (neither known) | **No** (neither known) | **No** (horses & burnt bricks unknown) |\n\n---\n\n## 💎 9. Significant One-Liners, Trivia, Records & First Evidences\n\n- **Father of Indian Archaeology:** **Sir Alexander Cunningham** (first Director-General of the ASI, 1861).\n- **Father of Indian Prehistory:** **Robert Bruce Foote** (discovered the Pallavaram handaxe in 1863).\n- **Father of Indian Rock Art:** **Dr. Vishnu Shridhar (V.S.) Wakankar** (discovered Bhimbetka caves in 1957).\n- **First Metal Used by Man:** **Copper** (around 5000–3500 BC).\n- **First Animal Domesticated:** **Dog**, followed by sheep and goat.\n- **Earliest Animal Domestication in India:** **Bagor (Rajasthan)** & **Adamgarh (Madhya Pradesh)**.\n- **Earliest Agriculture Site in Indian Subcontinent:** **Mehrgarh (Balochistan, Pakistan)** — wheat, barley, and cotton dated to c. 7000 BC.\n- **Earliest Rice Cultivation in India:** **Koldihwa & Mahagara (Belan Valley, Prayagraj, UP)** dated to c. 7000–6000 BC.\n- **Only Hominid Fossil in India:** **Narmada Man (Homo erectus)** skull cap found at **Hathnora (MP)** by Arun Sonakia (1982).\n- **Ostrich Evidence in India:** Discovered for the first time at **Patne (Maharashtra)** — engraved ostrich eggshell beads.\n- **Pit Dwellings & Master-Dog Burials:** Exclusive hallmark of **Burzahom (Kashmir)**.\n- **Cave of Potters:** **Gufkral (Kashmir)**.\n- **Abundant Bone/Antler Tools:** **Chirand (Bihar)** and **Burzahom (Kashmir)**.\n- **Jadeite Stone Tools in India:** Found at **Daojali Hading (Assam)**, confirming ancient links with Yunnan/Myanmar.\n- **Largest Mesolithic Site in India:** **Bagor (Rajasthan)** on the Kothari river.\n- **Largest Jorwe Culture Settlement:** **Daimabad (Maharashtra)** covering over 20 hectares.\n- **Famous Bronze Hoard of Maharashtra:** **Daimabad Bronze Chariot** and animal sculptures.\n- **Largest Copper Hoard in India:** **Gungeria (Balaghat, MP)** — 424 copper artifacts and 102 silver sheets.\n- **Ancient Copper Mining Hubs:** **Khetri Mines (Rajasthan)** and **Malanjkhand (Madhya Pradesh)**.\n- **First Rock Art Discovery in India:** **Sohagighat (Mirzapur, UP)** by Archibald Carlleyle in 1867.\n- **Lakhudiyar Rock Paintings:** Situated on the banks of **Suyal River in Almora district, Uttarakhand**.\n- **Catal Huyuk:** Ancient proto-city in **Turkey** dating back to the Neolithic period.\n- **Burial Custom of Maharashtra Chalcolithic:** Infants buried in **Urns** (अस्थि-कलश) placed mouth-to-mouth beneath the house floor in a **North-to-South orientation**.\n- **Negative Facts to Remember (Direct SSC MCQ Killers):**\n  - Chalcolithic people did **NOT** use Iron (Iron arrived c. 1000 BC with PGW culture).\n  - Chalcolithic people did **NOT** use burnt bricks (only sun-dried or mud plaster).\n  - True domestic horse was **NOT** an established component of Stone Age or Chalcolithic life.\n\n---\n\n## 🧾 10. Last-Minute Rapid Revision Sheet\n\n### Three Sequence Timelines to Memorize\n\n1. **Human Biological Evolution:**\n   ```\n   Australopithecus ➔ Homo Habilis ➔ Homo Erectus ➔ Homo Neanderthalensis ➔ Homo Sapiens\n   ```\n2. **Technological & Material Evolution:**\n   ```\n   Core Pebble Tools ➔ Flake Scrapers ➔ Blade & Burin ➔ Microliths ➔ Polished Celts ➔ Copper Metal ➔ Bronze Alloy ➔ Iron Metal\n   ```\n3. **Subsistence Mode Evolution:**\n   ```\n   Hunting-Gathering (Palaeo) ➔ Hunting-Herding (Meso) ➔ Systematic Agriculture (Neo) ➔ Agro-Pastoral Metallurgy (Chalco)\n   ```\n\n### Golden Numbers to Remember for SSC / State Exams\n\n- **4.5 Billion Years:** Geological age of planet Earth.\n- **2.58 Million Years:** Start of Quaternary geological period.\n- **10,000 BC:** Termination of Pleistocene Ice Age and beginning of Holocene epoch.\n- **12,000 BC – 10,000 BC:** Official SSC exam question timeframe for the Mesolithic horizon.\n- **7,000 BC:** Dawn of Neolithic agriculture at Mehrgarh & rice at Koldihwa.\n- **1861:** Founding of the Archaeological Survey of India (ASI) by Alexander Cunningham.\n- **1863:** Discovery of first Indian Palaeolithic tool at Pallavaram by Robert Bruce Foote.\n- **1957:** Discovery of Bhimbetka Rock Shelters by Dr. V.S. Wakankar.\n- **750+:** Rock shelters at Bhimbetka (500+ with prehistoric paintings).\n\n### ⚠️ Three Critical Exam Traps to Never Confuse\n\n> ⚠️ **Trap 1: Burzahom vs Gufkral (Both in Kashmir Valley)**\n> - **Burzahom:** Famous for **Subterranean Pit Dwellings (गर्त-आवास)** and the unique ritual burial of **Domestic Dogs with Human Masters**.\n> - **Gufkral:** Translates to *\"Cave of the Potter\"*; famous for early **sheep/goat domestication** and the developmental transition from **aceramic to ceramic Neolithic**.\n\n> 💡 **Trap 2: Earliest Agriculture vs Earliest Domestication vs Earliest Rice**\n> - **Earliest Agriculture (General):** **Mehrgarh (Balochistan)** — wheat, barley, and cotton dated to c. 7000 BC.\n> - **Earliest Animal Domestication:** **Bagor (Rajasthan)** and **Adamgarh (MP)** — dated to the Mesolithic period.\n> - **Earliest Rice Cultivation:** **Koldihwa & Mahagara (Belan Valley, UP)** — dated to c. 7000–6000 BC.\n\n> 🔑 **Trap 3: Pre-History vs Proto-History vs Historical Period**\n> - **Pre-History:** **NO script / NO written records** at all (Stone Age & Chalcolithic).\n> - **Proto-History:** **Script exists but remains undeciphered** (Indus Valley / Harappan Civilisation).\n> - **Historical Period:** **Deciphered written inscriptions available** (From 6th Century BC Mahajanapada era onwards).\n"
  },
  {
    id: "note-history-stone-age-hi",
    title: "प्राचीन भारत का इतिहास: पाषाण काल एवं ताम्रपाषाण संस्कृतियां (विस्तृत परीक्षा नोट्स)",
    language: "hi",
    subject: "Ancient History (प्राचीन इतिहास)",
    category: "concept",
    tags: ["History","Ancient History","Stone Age","पुरापाषाण","मध्यपाषाण","नवपाषाण","ताम्रपाषाण","भीमबेटका","SSC CGL","UPSC"],
    summary: "प्रागैतिहासिक एवं आद्य-ऐतिहासिक भारत पर संपूर्ण 10-खंडीय मास्टर नोट्स, जिसमें पुरापाषाण, मध्यपाषाण, नवपाषाण व ताम्रपाषाण काल, उपकरण तकनीक, भीमबेटका शैलचित्र और परीक्षा उपयोगी तथ्य शामिल हैं।",
    readingTimeMinutes: 7,
    isStarred: true,
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    createdAt: "2026-09-28T14:15:00Z",
    updatedAt: "2026-09-28T14:15:00Z",
    content: "# प्राचीन भारत का इतिहास: पाषाण काल एवं ताम्रपाषाण संस्कृतियां\n\n> 🎯 **परीक्षा उपयोगी मास्टर नोट:** प्रागैतिहासिक और आद्य-ऐतिहासिक भारत की ठोस नींव पर आधारित एक संपूर्ण 10-खंडीय मार्गदर्शिका। इसमें पुरापाषाण, मध्यपाषाण, नवपाषाण व ताम्रपाषाण काल, उपकरण तकनीक, भीमबेटका शैलचित्रकला, और प्रमुख पुरातात्विक स्थलों का विस्तृत विश्लेषण SSC CGL, CHSL, CPO, राज्य PCS और UPSC CSE परीक्षाओं के लिए संकलित है।\n\nप्रागैतिहासिक काल (Pre-history) मानव सभ्यता के उस विशाल दौर का प्रतिनिधित्व करता है जब लिपि या लेखन कला का आविष्कार नहीं हुआ था। भारत में मानवीय सांस्कृतिक विकास तीन पाषाण युगों से गुजरते हुए प्रथम धातु-युगीन ग्रामीण संस्कृतियों तक पहुंचा, जिसकी संपूर्ण जानकारी केवल पुरातात्विक उत्खननों से प्राप्त होती है।\n\n---\n\n## 🏛️ 1. वैचारिक आधार एवं इतिहास का काल-विभाजन\n\nइतिहास को वैज्ञानिक एवं व्यवस्थित अध्ययन की सुविधा के लिए सामाजिक, आर्थिक, तकनीकी और राजनीतिक परिवर्तनों के आधार पर तीन प्रमुख युगों में बांटा जाता है।\n\n### भारतीय इतिहास का पारम्परिक काल-विभाजन\n\n| काल | समय-सीमा | प्रमुख ऐतिहासिक विशेषता व मील का पत्थर |\n| :--- | :--- | :--- |\n| **प्राचीन भारत का इतिहास** | प्रारंभिक काल से 7वीं शताब्दी ईस्वी तक | आरंभिक मानवनिर्मित औजार, हड़प्पा सभ्यता, वैदिक युग, महाजनपद, मौर्य व गुप्त साम्राज्य से लेकर राजा हर्षवर्धन (647 ईस्वी) तक। |\n| **मध्यकालीन भारत का इतिहास** | 8वीं शताब्दी ईस्वी से 18वीं शताब्दी ईस्वी तक | सिंध पर प्रारंभिक अरब आक्रमण (712 ईस्वी), दिल्ली सल्तनत और मुगल साम्राज्य से लेकर औरंगजेब की मृत्यु (1707 ईस्वी) तक। |\n| **आधुनिक भारत का इतिहास** | 18वीं शताब्दी ईस्वी से वर्तमान काल तक | यूरोपीय कंपनियों का आगमन (प्लासी का युद्ध 1757), ब्रिटिश औपनिवेशिक शासन, स्वतंत्रता संग्राम और 1947 के बाद का संप्रभु भारत। |\n\n### इतिहास-लेखन की प्रमुख वर्गीकरण प्रणालियां\n\n1. **जेम्स मिल का सांप्रदायिक त्रि-स्तरीय विभाजन (1817):**\n   - स्कॉटिश इतिहासकार **जेम्स मिल** ने अपनी प्रसिद्ध पुस्तक *'द हिस्ट्री ऑफ ब्रिटिश इंडिया'* (*History of British India*) में भारतीय इतिहास को धार्मिक आधार पर 3 भागों में विभाजित किया:\n     1. **हिंदू काल** (प्राचीन काल)\n     2. **मुस्लिम काल** (मध्य काल)\n     3. **ब्रिटिश काल** (आधुनिक काल)\n   - *परीक्षा विशेष:* मिल ने पहले दो कालों का नामकरण धर्म के आधार पर किया, लेकिन तीसरे काल को ईसाई न कहकर औपनिवेशिक 'ब्रिटिश' नाम दिया।\n2. **क्रिश्चियन जुर्गेनसन थॉमसन (C.J. Thomsen) की त्रि-युगीन पद्धति (1836):**\n   - कोपेनहेगन संग्रहालय (डेनमार्क) के संरक्षक **सी.जे. थॉमसन** ने औजारों और हथियारों के मूल पदार्थ के आधार पर प्राचीन इतिहास को तीन कालों में बांटा:\n     1. **पाषाण काल (Stone Age)**\n     2. **कांस्य काल (Bronze Age)**\n     3. **लौह काल (Iron Age)**\n\n### लिखित साक्ष्यों के आधार पर त्रि-विभाजन\n\n| श्रेणी | लिखित लिपि साक्ष्य | पढ़ने की स्थिति (Decipherment) | भारत में समकालीन उदाहरण |\n| :--- | :--- | :--- | :--- |\n| **प्रागैतिहासिक काल (Pre-History)** | **अनुपस्थित** | कोई लिखित लिपि उपलब्ध नहीं; इतिहास विशुद्ध रूप से उत्खनन और औजारों पर आधारित है। | **पुरापाषाण, मध्यपाषाण, नवपाषाण एवं ताम्रपाषाण काल** |\n| **आद्य-ऐतिहासिक काल (Proto-History)** | **उपस्थित** | लिपि मौजूद है, परंतु आज तक **पढ़ी नहीं जा सकी है** (अपठित)। | **सिंधु घाटी की सभ्यता (कांस्य काल)**; प्रारंभिक ताम्रपाषाण काल |\n| **ऐतिहासिक काल (Historical Period)** | **उपस्थित** | लिखित शिलालेख व साहित्यिक स्रोत **पढ़े जा चुके हैं** और स्पष्ट उपलब्ध हैं। | **छठी शताब्दी ईसा पूर्व से आगे** (महाजनपद, बौद्ध-जैन काल, मौर्य साम्राज्य) |\n\n### कालक्रम (Timeline) एवं भूवैज्ञानिक युग की समझ\n\n- **BC (ई.पू.) बनाम AD (ईस्वी) पैमाना:**\n  - **'0'** का बिंदु **ईसा मसीह के जन्म (Birth of Jesus Christ)** को दर्शाता है।\n  - **BC (Before Christ - ईसा पूर्व):** तिथियां पीछे की ओर उल्टी गिनी जाती हैं (जैसे 500 ई.पू., 300 ई.पू. से अधिक प्राचीन है)।\n  - **AD (Anno Domini - ईस्वी सन्):** तिथियां 0 से आगे की ओर सामान्य रूप से बढ़ती हैं।\n- **शताब्दी (Century) का अर्थ:** 1 शताब्दी = 100 वर्ष।\n  - *8वीं शताब्दी ई.पू.* = 800 ई.पू. से 700 ई.पू.\n  - *3री शताब्दी ईस्वी* = 200 ईस्वी से 300 ईस्वी\n  - *18वीं शताब्दी ईस्वी* = 1700 ईस्वी से 1800 ईस्वी\n- **भूवैज्ञानिक गहरा समय (Geological Deep Time):**\n  - पृथ्वी की अनुमानित आयु लगभग **4.5 अरब वर्ष (4.5 Billion Years)** है।\n  - मानव इतिहास का **चतुर्थक युग (Quaternary Period)** लगभग **2.58 मिलियन (25.8 लाख) वर्ष पूर्व** प्रारंभ हुआ, जो वर्तमान तक चल रहा है।\n  - **चतुर्थक युग के दो भाग:**\n    1. **प्लीस्टोसीन युग (Pleistocene - हिमयुग):** 2.58 Mya से 10,000 ई.पू. तक। इस दौरान भीषण ठंड और बर्फबारी थी; इसमें संपूर्ण पुरापाषाण काल समाहित है।\n    2. **होलोसीन युग (Holocene - हिमयुगोत्तर काल):** 10,000 ई.पू. से वर्तमान तक। इसमें जलवायु उष्ण हुई; इसी युग में मध्यपाषाण, नवपाषाण और धातु युग विकसित हुए।\n\n---\n\n## ⏳ 2. कालानुक्रमिक समयरेखा एवं मानव प्रजाति का विकास\n\n```\n[25.8 लाख वर्ष पूर्व] चतुर्थक युग प्रारंभ (प्लीस्टोसीन हिमयुग)\n     │\n     ▼\n[5,00,000 ई.पू. - 50,000 ई.पू.] निम्न पुरापाषाण काल (हस्तकुठार, विदारणी, सोहन घाटी)\n     │\n     ▼\n[50,000 ई.पू. - 40,000 ई.पू.] मध्य पुरापाषाण काल (फलक तकनीक, नेवासा संस्कृति)\n     │\n     ▼\n[40,000 ई.पू. - 10,000 ई.पू.] उच्च पुरापाषाण काल (ब्लेड एवं ब्यूरिन, होमो सेपियन्स, चकमक पत्थर)\n     │\n     ▼\n[10,000 ई.पू.] प्लीस्टोसीन हिमयुग समाप्त ➔ होलोसीन उष्ण काल प्रारंभ\n     │\n     ▼\n[9,000 ई.पू. - 7,000 ई.पू.]* मध्यपाषाण काल (माइक्रोलिथ उपकरण, बागोर में पशुपालन)\n     │                     *SSC आधिकारिक उत्तर कुंजी: 12,000 ई.पू. - 10,000 ई.पू.\n     ▼\n[7,000 ई.पू. - 1,000 ई.पू.] नवपाषाण काल (मेहरगढ़ में कृषि, पॉलिशदार कुल्हाड़ी, मृद्भांड)\n     │\n     ▼\n[3,500 ई.पू. - 1,000 ई.पू.] ताम्रपाषाण काल (प्रथम धातु: तांबा, ग्रामीण कृषक संस्कृतियां)\n```\n\n### मानव प्रजाति का क्रमिक जैविक विकास (Evolution of Man)\n\nमानव प्रजाति का शारीरिक एवं मानसिक विकास क्रमवार रूप में इस प्रकार हुआ:\n\n```\nऑस्ट्रेलोपिथेकस ➔ होमो हैबिलिस ➔ होमो इरेक्टस ➔ होमो निएंडरथल ➔ होमो सेपियन्स\n```\n\n1. **ऑस्ट्रेलोपिथेकस (Australopithecus):** दक्षिण एवं पूर्वी अफ्रीका में उत्पन्न प्रारंभिक द्विपदीय वानर-मानव पूर्वज।\n2. **होमो हैबिलिस (Homo Habilis - 'दक्ष मानव'):** पहला औजार निर्माता होमो समूह; पत्थरों को तोड़कर ओल्डोवान पेबुल औजार बनाए।\n3. **होमो इरेक्टस (Homo Erectus - 'सीधा खड़ा मानव'):** सीधा तनकर चलने वाला मानव; आग पर नियंत्रण पाने वाला पहला मानव; अचेउलियन हस्तकुठार। **हथनोरा (मध्य प्रदेश)** में मिला **\"नर्मदा मानव\"** का कपाल जीवाश्म इसी प्रजाति का है।\n4. **होमो निएंडरथल (Homo Neanderthalensis):** अत्यधिक ठंड में जीवित रहने में सक्षम; गुफा निवासी; मृतकों का विधिवत अंतिम संस्कार व समाधिकरण करने वाला पहला मानव।\n5. **होमो सेपियन्स (Homo Sapiens - 'आधुनिक प्रज्ञा मानव'):** उच्च पुरापाषाण काल (लगभग 40,000 ई.पू.) में प्रादुर्भाव; विकसित भाषा, उन्नत ब्लेड औजार और शैलचित्र निर्माण।\n\n---\n\n## 📊 3. वर्गीकरण, उपकरण प्रौद्योगिकी एवं सांख्यिकीय विश्लेषण\n\n### चारों युगों का विस्तृत तुलनात्मक विश्लेषण\n\n| आयाम | पुरापाषाण काल (Palaeolithic) | मध्यपाषाण काल (Mesolithic) | नवपाषाण काल (Neolithic) | ताम्रपाषाण काल (Chalcolithic) |\n| :--- | :--- | :--- | :--- | :--- |\n| **शाब्दिक अर्थ** | *पुरा* = पुराना, *पाषाण* = पत्थर | *मध्य* = बीच का, *पाषाण* = पत्थर | *नव* = नया, *पाषाण* = पत्थर | *ताम्र* = तांबा, *पाषाण* = पत्थर |\n| **समयावधि** | 5,00,000 ई.पू. – 10,000 ई.पू. | 9,000 ई.पू. – 7,000 ई.पू. (SSC: 12,000–10,000 ई.पू.) | 7,000 ई.पू. – 1,000 ई.पू. | 3,500 ई.पू. – 1,000 ई.पू. |\n| **भूवैज्ञानिक काल** | **प्लीस्टोसीन (हिमयुग)** | प्लीस्टोसीन से **होलोसीन में संक्रमण** | **होलोसीन (उष्ण जलवायु)** | **होलोसीन (उष्ण जलवायु)** |\n| **प्रमुख औजार** | कोर उपकरण, हस्तकुठार (Handaxe), विदारणी (Cleaver), चॉपर | **माइक्रोलिथ (1 से 5 सेमी के सूक्ष्म पाषाण औजार)** - ब्लेड, अर्धचंद्राकार, समलंब | **पॉलिशदार पाषाण सेल्ट (कुल्हाड़ियां)**, छेनी, हिरण के सींग व हड्डी के औजार | **तांबे की कुल्हाड़ियां**, छेनी, चाकू व पत्थरों के सूक्ष्म फलक |\n| **प्रयुक्त कच्चा माल** | **क्वार्टजाइट पत्थर** (अतः \"क्वार्टजाइट मानव\"), चर्ट | चर्ट, कैल्सीडोनी, एगेट, अकीक, जैस्पर | बेसाल्ट, डोलेराइट, ग्रेनाइट, जेडाइट, हड्डी | तांबा धातु + सिलिका पत्थर |\n| **जीवनयापन का साधन** | विशुद्ध रूप से **शिकार व खाद्य संग्रह** | **शिकार, मछली पकड़ना व पशुपालन (आरंभिक)** | **खाद्य उत्पादन (व्यवस्थित कृषि)** एवं स्थायी पशुपालन | **कृषि-पशुपालन**, धातु प्रगलन, शिल्प व क्षेत्रीय विनिमय |\n| **निवास व्यवस्था** | प्राकृतिक गुफाएं व शैल आश्रय | अस्थायी खुले शिविर, नदी तट | स्थायी मिट्टी व सरकंडे के घर, **गर्त-आवास (बुर्जहोम)** | मिट्टी-गारे के गोल व आयताकार मकान, चारदीवारी |\n| **मृद्भांड (Pottery)** | **अनुपस्थित** | प्रायः अनुपस्थित (चोपनी मांडो में अत्यंत अपरिष्कृत हस्तनिर्मित) | **रस्सी-छाप (Cord-impressed) मृद्भांड**, चाक पर निर्मित बर्तन | **चित्रित काले व लाल मृद्भांड (BRW)**, गेरुए रंग के मृद्भांड (OCP) |\n\n### उपकरण निर्माण तकनीक\n\n- **फलक तकनीक (Flake Technology):** मध्य पुरापाषाण काल में विकसित। किसी बड़े पत्थर (कोर) पर आघात करके उससे नुकीले व पतले छिलके (Flakes) अलग किए जाते थे, जिनसे खुरचनी (Scraper) और बेधक (Borer) बनते थे।\n- **सूक्ष्म पाषाण क्रांति (Microliths):** मध्यपाषाण काल में 1 से 5 सेमी के बहुत छोटे पत्थरों को लकड़ी या हड्डी के हत्थे पर पेड़ के गोंद/राल से चिपकाकर संयुक्त औजार जैसे हंसिया, भाला और **तीर-कमान** बनाए गए।\n\n### स्मरणीय सूत्र (Mnemonics)\n\n- **`P-M-N-C`** (कालों का क्रम): **P**alaeolithic (पुरा) ➔ **M**esolithic (मध्य) ➔ **N**eolithic (नव) ➔ **C**halcolithic (ताम्र)।\n- **`A-H-H-N-S`** (मानव विकास): **A**ustralopithecus ➔ **H**abilis ➔ **H**omo erectus ➔ **N**eanderthal ➔ **S**apiens.\n- **`B-A-G`** (पशुपालन के प्रथम साक्ष्य): **B**agor (बागोर, राजस्थान) और **A**damgarh (आदमगढ़, MP) = **G**oat/Cattle herding (पशुपालन)।\n- **`C-F-B-M-P`** (औजारों का क्रमिक विकास): **C**hopper ➔ **F**lake ➔ **B**lade ➔ **M**icrolith ➔ **P**olished Celt.\n\n---\n\n## ⚖️ 4. प्रमुख पुरातात्विक स्थल, उत्खननकर्ता एवं महत्वपूर्ण खोजें\n\n| पुरातात्विक स्थल | आधुनिक राज्य / क्षेत्र | सांस्कृतिक काल | महत्वपूर्ण खोज एवं परीक्षा उपयोगी तथ्य |\n| :--- | :--- | :--- | :--- |\n| **भीमबेटका की गुफाएं** | रायसेन जिला, **मध्य प्रदेश** (विंध्य पर्वत) | पुरापाषाण से मध्यकाल | **750+ शैल आश्रय, 500+ शैलचित्र**; भारत की सबसे प्राचीन चित्रकला; खोजकर्ता **डॉ. वी.एस. वाकणकर (1957)**; यूनेस्को विश्व धरोहर स्थल (2003)। |\n| **पाटणे (Patne)** | जलगांव जिला, **महाराष्ट्र** | उच्च पुरापाषाण काल | **शुतुरमुर्ग के अंडों के छिलके** पर नक्काशीदार आभूषण व मनके; भारत में शुतुरमुर्ग की ऐतिहासिक उपस्थिति का अकाट्य प्रमाण। |\n| **अतिरम्पक्कम** | कोर्तल्लायर बेसिन, **तमिलनाडु** | निम्न व मध्य पुरापाषाण | अचेउलियन द्विमुखीय हस्तकुठार; जीवाश्मीकृत **जानवरों के पदचिह्न**। |\n| **हथनोरा** | नर्मदा घाटी, सीहोर/होशंगाबाद, **MP** | मध्य प्लीस्टोसीन | **\"नर्मदा मानव\" की कपाल खोपड़ी** (होमो इरेक्टस); खोजकर्ता **अरुण सोनकिया (1982)**; भारत का एकमात्र प्रागैतिहासिक मानव जीवाश्म। |\n| **सोहन घाटी** | पोतवार पठार / रावलपिंडी, **पंजाब (पाकिस्तान)** | निम्न पुरापाषाण काल | पेबुल एवं चापर-चॉपिंग औजार उद्योग का मुख्य स्थल (**सोहन संस्कृति**)। |\n| **बेलन घाटी** | मिर्जापुर व प्रयागराज, **उत्तर प्रदेश** | पुरापाषाण से नवपाषाण | पुरापाषाण काल से नवपाषाण काल तक की निरंतर सांस्कृतिक परतें; हड्डी की बनी मातृदेवी की मूर्ति। |\n| **दिदवाना** | नागौर जिला, **राजस्थान** | निम्न से उच्च पुरापाषाण | थार रेगिस्तान में प्रारंभिक पाषाण युगीन हस्तकुठारों का विशाल जमावड़ा। |\n| **हुनसगी (Hunasagi)** | यादगीर जिला, **कर्नाटक** | निम्न पुरापाषाण काल | पाषाण औजारों की **निर्माण कार्यशाला (Factory site)** जहां हजारों औजार बनाए गए। |\n| **पहलगाम** | लिद्दर घाटी, **जम्मू और कश्मीर** | निम्न पुरापाषाण काल | उच्च पर्वतीय हिमानी मोरेन में हस्तकुठार की प्राप्ति। |\n| **बागोर** | भीलवाड़ा जिला, **राजस्थान** (कोठारी नदी) | मध्यपाषाण काल | **भारत का सबसे बड़ा मध्यपाषाण स्थल**; आदमगढ़ के साथ **पशुपालन के प्राचीनतम साक्ष्य**; उत्खननकर्ता वी.एन. मिश्र। |\n| **आदमगढ़** | होशंगाबाद जिला, **मध्य प्रदेश** | मध्यपाषाण काल | पशुपालन (गाय, बैल, भेड़, बकरी) के प्राचीनतम प्रमाण; शैलचित्र; उत्खननकर्ता आर.वी. जोशी। |\n| **लंगनाज** | मेहसाणा जिला, **गुजरात** | मध्यपाषाण काल | सूक्ष्म पाषाण, 14 मानव कंकाल, गैंडे व जंगली सूअर की हड्डियां। |\n| **चोपनी मांडो** | बेलन घाटी, प्रयागराज, **UP** | पुरापाषाण से मध्यपाषाण | **हस्तनिर्मित मृद्भांडों के प्राचीनतम साक्ष्य**; मधुमक्खी के छत्ते जैसी गोलाकार झोपड़ियां। |\n| **मेहरगढ़** | कच्ची मैदान, बोलन दर्रा, **बलूचिस्तान (पाकिस्तान)** | अ-मृद्भांडीय नवपाषाण | **भारतीय उपमहाद्वीप में कृषि का सबसे प्राचीन स्थल (लगभग 7000 ई.पू.)**; गेहूं, जौ और कपास की खेती; कच्ची ईंटों के आयताकार मकान। |\n| **बुर्जहोम** | श्रीनगर से 16 किमी उत्तर-पश्चिम, **कश्मीर** | नवपाषाण काल | **गर्त-आवास (जमीन खोदकर बनाए गए गड्ढे वाले घर)**; कब्रों में **मालिक के साथ पालतू कुत्ते को दफनाने के अनूठे साक्ष्य**; हड्डी की सुइयां व बाणाग्र। |\n| **गुफकराल** | पुलवामा जिला, **कश्मीर** | नवपाषाण काल | शाब्दिक अर्थ *\"कुम्हार की गुफा\"*; अ-मृद्भांडीय से मृद्भांडीय नवपाषाण में क्रमिक विकास; भेड़-बकरी पालन व कृषि। |\n| **कोल्डीहवा एवं महागड़ा** | बेलन घाटी, प्रयागराज जिला, **UP** | नवपाषाण काल | **चावल की खेती के प्राचीनतम साक्ष्य (लगभग 7000–6000 ई.पू.)**; रस्सी-छाप मिट्टी के बर्तन; मवेशियों का बाड़ा (Cattle pen)। |\n| **चिरांद** | सारण जिला, **बिहार** (गंगा संगम तट) | नवपाषाण काल | **हिरण के सींगों (Antlers) एवं हड्डियों से निर्मित औजारों का विशाल भंडार**; पॉलिशदार पाषाण कुल्हाड़ियां। |\n| **दाओजली हाडिंग** | दीमा हसाओ, **असम** (ब्रह्मपुत्र घाटी) | नवपाषाण काल | पॉलिशदार सेल्ट, सिल-बट्टे, जीवाश्म लकड़ी के उपकरण एवं **जेडाइट (Jadeite - पन्ना सदृश हरा पत्थर)** के औजार (चीन/म्यांमार से व्यापारिक संपर्क)। |\n| **गणेश्वर-जोधपुरा** | सीकर जिला, **राजस्थान** (खेतड़ी पट्टी) | ताम्रपाषाण काल | तांबा उत्पादन का प्रमुख केंद्र; हड़प्पा सभ्यता को तांबे के बाणाग्र, भाले व सेल्ट की आपूर्ति। |\n| **दायमाबाद** | अहमदनगर जिला, **महाराष्ट्र** (प्रवरा नदी) | जोर्वे ताम्रपाषाण काल | **जोर्वे संस्कृति का सबसे बड़ा स्थल (लगभग 20 हेक्टेयर)**; प्रसिद्ध **दायमाबाद कांस्य रथ व मूर्तियां** (दो बैलों को हांकता हुआ मानव, गैंडा, हाथी, भैंसा)। |\n| **इनामगांव** | पुणे जिला, **महाराष्ट्र** (घोड नदी) | उत्तर जोर्वे ताम्रपाषाण | बड़ी किलेबंद बस्ती; 100 से अधिक मकान, अन्नागार, सिंचाई नहर; कुम्हार, स्वर्णकार व ताम्रकारों के घर; कलश समाधान। |\n| **नवदाटोली** | खरगोन जिला, **मध्य प्रदेश** (नर्मदा तट) | मालवा ताम्रपाषाण काल | एच.डी. सांकलिया द्वारा उत्खनन; सबसे अधिक अनाजों की किस्में (गेहूं, चावल, मसूर, उड़द, अलसी); चित्रित काले व लाल बर्तन। |\n| **लखुडियार** | बाड़ेछीना, अल्मोड़ा जिला, **उत्तराखंड** | उच्च पुरापाषाण/मध्यपाषाण | शाब्दिक अर्थ *\"एक लाख गुफाएं\"*; **सुयाल नदी तट** पर स्थित; हाथ पकड़े नृत्य करती मानव आकृतियां व लहरदार रेखाएं। |\n| **चाताल हुयुक** | कोन्या मैदान, **अनातोलिया (तुर्की)** | नवपाषाण काल (7500 ई.पू.) | मानव इतिहास के सबसे प्रारंभिक नवपाषाण प्रोटो-शहरों में से एक; छतों के रास्ते प्रवेश वाले सटे हुए मकान। |\n\n---\n\n## 🎯 5. ऐतिहासिक तिथियां एवं प्रमुख मील के पत्थर\n\n- **1817:** जेम्स मिल द्वारा *'द हिस्ट्री ऑफ ब्रिटिश इंडिया'* का प्रकाशन; सांप्रदायिक आधार पर इतिहास का प्रथम वर्गीकरण (हिंदू, मुस्लिम, ब्रिटिश)।\n- **1836:** सी.जे. थॉमसन द्वारा कोपेनहेगन संग्रहालय में धातु व सामग्री आधारित त्रि-युगीन पद्धति (पाषाण, कांस्य, लौह) का प्रतिपादन।\n- **1861:** **सर अलेक्जेंडर कनिंघम** द्वारा **भारतीय पुरातत्व सर्वेक्षण (ASI)** की स्थापना; वे प्रथम पुरातात्विक सर्वेक्षक/महानिदेशक बने (जिन्हें **\"भारतीय पुरातत्व का जनक\"** कहा जाता है)।\n- **1863:** **रॉबर्ट ब्रूस फुट** द्वारा चेन्नई के निकट **पल्लावरम** में भारत के पहले पाषाण युगीन औजार (अचेउलियन हैंडेक्स) की खोज (जिन्हें **\"भारतीय प्रागैतिहास का जनक\"** कहा जाता है)।\n- **1867–68:** **आर्चीबाल्ड कार्लाइल** द्वारा कैमूर पहाड़ियों के **सुहागीघाट (मिर्जापुर, UP)** में भारत के पहले शैलचित्रों की खोज।\n- **1957:** **डॉ. विष्णु श्रीधर वाकणकर** द्वारा मध्य प्रदेश के रायसेन जिले में **भीमबेटका शैलचित्रों** की खोज (जिन्हें **\"भारतीय शैलकला का पितामह\"** कहा जाता है)।\n- **1974:** जीन-फ्रांस्वा जैरिज के नेतृत्व में **मेहरगढ़** का अंतर्राष्ट्रीय उत्खनन प्रारंभ, जिससे दक्षिण एशिया में कृषि का इतिहास 7000 ई.पू. सिद्ध हुआ।\n- **1982:** भूवैज्ञानिक **अरुण सोनकिया** द्वारा हथनोरा (MP) में **\"नर्मदा मानव\"** के कपाल जीवाश्म की ऐतिहासिक खोज।\n- **2003:** **भीमबेटका शैल आश्रय** को **यूनेस्को विश्व धरोहर स्थल (UNESCO World Heritage Site)** घोषित किया गया।\n\n---\n\n## ✒️ 6. चरण-दर-चरण विश्लेषण (पाषाण युग के 6 चरण)\n\n### चरण 1: निम्न पुरापाषाण काल (5,00,000 ई.पू. – 50,000 ई.पू.)\n- **पर्यावरण:** प्लीस्टोसीन हिमयुग की चरम ठंड; चारों ओर बर्फ की मोटी परतें।\n- **मानव प्रजाति:** होमो इरेक्टस।\n- **दो प्रमुख सांस्कृतिक धाराएं:**\n  1. *सोहन संस्कृति:* पश्चिमोत्तर भारत (पंजाब)। पेबुल, एकतरफा धार वाले चॉपर और द्विमुखी चॉपिंग उपकरण।\n  2. *मद्रासियन / अचेउलियन संस्कृति:* दक्षिण व मध्य भारत (अतिरम्पक्कम, पल्लावरम)। हस्तकुठार (Handaxe) और विदारणी (Cleaver)।\n- **जीवनशैली:** पूरी तरह से घुमंतू शिकारी जीवन, कंदमूल-फल संग्रह और मरे हुए बड़े जानवरों का मांस खाना।\n\n### चरण 2: मध्य पुरापाषाण काल (50,000 ई.पू. – 40,000 ई.पू.)\n- **प्रमुख तकनीक:** **फलक उद्योग (Flake Technology)**। मूल पत्थर को तोड़कर निकले नुकीले फलकों से खुरचनी (Scraper), बेधनी (Point) और छेदक (Borer) बनाए गए।\n- **नामकरण:** महाराष्ट्र के नेवासा स्थल के आधार पर इसे **नेवासा उद्योग (Nevasan Industry)** भी कहते हैं।\n- **कच्चा माल:** क्वार्टजाइट के स्थान पर उच्च कोटि के चर्ट, जैस्पर और फ्लिंट का प्रयोग।\n\n### चरण 3: उच्च पुरापाषाण काल (40,000 ई.पू. – 10,000 ई.पू.)\n- **ऐतिहासिक घटना:** आधुनिक मानव प्रजाति (**होमो सेपियन्स**) का प्रादुर्भाव।\n- **तकनीक:** पतले समांतर किनारों वाले **ब्लेड एवं ब्यूरिन (तक्षणी)** औजार; **चकमक पत्थर (Flint stone)** का प्रचुर प्रयोग।\n- **कलात्मक जागरण:** भीमबेटका में सबसे पुराने शैलचित्रों की शुरुआत; पाटणे में शुतुरमुर्ग के अंडों पर नक्काशीदार आभूषण।\n\n### चरण 4: मध्यपाषाण काल (9,000 ई.पू. – 7,000 ई.पू.)\n- *नोट:* **SSC परीक्षाओं की आधिकारिक उत्तर कुंजियों** में मध्यपाषाण काल की समय-सीमा प्रायः **12,000 ई.पू. – 10,000 ई.पू.** मानी जाती है।\n- **जलवायु परिवर्तन:** हिमयुग समाप्त हुआ; गर्म व आर्द्र **होलोसीन युग** प्रारंभ हुआ। वनस्पतियों व जीव-जंतुओं की संख्या में भारी वृद्धि हुई।\n- **उपकरण:** **माइक्रोलिथ (सूक्ष्म पाषाण उपकरण)**। 1 से 5 सेमी के ज्यामितीय पत्थर, जिन्हें लकड़ी/हड्डी में फंसाकर बाण, भाले और हंसिया बनाए गए।\n- **सामाजिक-आर्थिक बदलाव:** मानव शिकारी-खाद्य संग्राहक से आगे बढ़कर **पशुपालन** की ओर अग्रसर हुआ (**बागोर** व **आदमगढ़**)।\n\n### चरण 5: नवपाषाण क्रांति (7,00,0 ई.पू. – 1,000 ई.पू.)\n- प्रसिद्ध पुरातत्वविद् **वी. गॉर्डन चाइल्ड** ने इसे **\"नवपाषाण क्रांति\" (Neolithic Revolution)** कहा क्योंकि मानव खाद्य संग्राहक से **खाद्य उत्पादक** बन गया।\n- **तीन युगांतकारी आविष्कार:**\n  1. **व्यवस्थित कृषि:** गेहूं, जौ, कपास (मेहरगढ़), चावल (कोल्डीहवा) और बाजरा (दक्षिण भारत)।\n  2. **घर्षित व पॉलिशदार पाषाण सेल्ट (कुल्हाड़ी):** अत्यधिक तीक्ष्ण और चिकनी कार्यशील धार।\n  3. **मृद्भांड (Pottery):** अनाज के भंडारण, पकाने और दूध रखने के लिए मिट्टी के बर्तनों का निर्माण।\n- **निवास:** गांवों का उदय; मिट्टी की कच्ची ईंटों के घर; कश्मीर घाटी की ठंड से बचने हेतु जमीन के भीतर **गर्त-आवास (Pit dwellings)**।\n\n### चरण 6: ताम्रपाषाण काल (3,500 ई.पू. – 1,000 ई.पू.)\n- **प्रथम धातु:** मानव द्वारा खोजी और प्रयोग में लाई गई पहली धातु **तांबा (Copper)** थी।\n- **अर्थव्यवस्था:** गैर-नगरीय, ग्रामीण कृषक एवं पशुपालक समुदाय।\n- **तकनीक:** तांबे की कुल्हाड़ियों व छेनी के साथ-साथ पत्थरों के फलक औजारों का निरंतर सह-अस्तित्व।\n\n---\n\n## 📂 7. क्षेत्रीय संस्कृतियां एवं पुरातात्विक परंपराएं\n\n| क्षेत्रीय संस्कृति | भौगोलिक विस्तार व नदी बेसिन | कालखंड | विशिष्ट लक्षण एवं प्रमुख पुरावशेष |\n| :--- | :--- | :---: | :--- |\n| **आहाड़-बनास संस्कृति** | दक्षिण-पूर्वी राजस्थान (बनास नदी: आहाड़, गिलुंद, बालाथल) | लगभग 2100 – 1500 ई.पू. | प्राचीन नाम **तांबवती** (तांबे का स्थान); तांबा प्रगलन भट्ठियां; सपाट कुल्हाड़ियां, चूड़ियां; प्रारंभिक चरण में पत्थर के ब्लेड अनुपस्थित; टेराकोटा कूबड़ वाले बैल। |\n| **कायथा संस्कृति** | चंबल की सहायक कालीसिंध घाटी, MP (कायथा, एरण) | लगभग 2000 – 1800 ई.पू. | चॉकलेट-रंग के लेप वाले चित्रित मृद्भांड; बर्तनों में छिपाकर रखी गईं **29 तांबे की चूड़ियां और 2 कुल्हाड़ियां**। |\n| **मालवा संस्कृति** | पश्चिमी मध्य प्रदेश (नवदाटोली, नागदा, एरण, नर्मदा) | लगभग 1700 – 1200 ई.पू. | ताम्रपाषाण संस्कृतियों में **सबसे उत्कृष्ट और कलात्मक चित्रित मृद्भांड**; व्यापक बहु-फसली खेती (गेहूं, चावल, उड़द, मसूर, अलसी)। |\n| **जोर्वे संस्कृति** | पश्चिमी महाराष्ट्र (गोदावरी/प्रवरा: जोर्वे, नेवासा, दायमाबाद, इनामगांव) | लगभग 1400 – 700 ई.पू. | टोंटीदार कटोरे (Spouted carinated bowls); घरों के फर्श के नीचे बच्चों का कलश समाधान; दायमाबाद की कांस्य मूर्तियों का जखीरा। |\n| **सावलदा संस्कृति** | ताप्ती नदी घाटी, महाराष्ट्र | लगभग 2300 – 2000 ई.पू. | खुरदरे बर्तनों पर मछली के कांटे, बाणाग्र और भाले के ज्यामितीय चित्र। |\n| **ताम्र निधियां एवं OCP संस्कृति** | गंगा-यमुना दोआब व मध्य भारत (सैपई, गुंगेरिया, बिठूर) | लगभग 2000 – 1500 ई.पू. | **गेरुए मृद्भांड (OCP)** से संबंधित; मानव रूपी आकृतियां, मत्स्य-भाले; **गुंगेरिया (MP) ताम्र निधि** से 424 तांबे के औजार व 102 चांदी के पतले पत्रक प्राप्त हुए। |\n\n---\n\n## ⚡ 8. सामाजिक-आर्थिक संक्रमण एवं जीवनशैली तुलना\n\n| सांस्कृतिक आयाम | पुरापाषाण मानव | मध्यपाषाण मानव | नवपाषाण मानव | ताम्रपाषाण मानव |\n| :--- | :--- | :--- | :--- | :--- |\n| **आर्थिक भूमिका** | उपभोक्ता / परभक्षी (शिकारी-संग्राहक) | संक्रमणकालीन शिकारी व चरवाहा | **खाद्य उत्पादक (कृषक)** | कृषक-पशुपालक व धातु प्रगलक |\n| **निवास प्रतिरूप** | प्राकृतिक गुफाएं व शैल आश्रय | अस्थायी खुले मौसमी पड़ाव | **स्थायी ग्रामीण बस्तियां** | सुगठित ग्रामीण कृषक बस्तियां |\n| **औजारों का पदार्थ** | भारी क्वार्टजाइट कोर पत्थर | सूक्ष्म चर्ट व कैल्सीडोनी पत्थर | पॉलिशदार बेसाल्ट, डोलेराइट व हड्डी | **तांबा धातु** + पत्थर के सूक्ष्म ब्लेड |\n| **गृह निर्माण** | प्राकृतिक कंदराएं (भीमबेटका) | सरकंडों के अस्थायी पर्दों वाले छप्पर | कच्ची ईंटों के आयताकार घर व **गर्त-आवास** | मिट्टी-गारे के घर, अन्नागार, मुखिया का आवास |\n| **शव विसर्जन प्रथा** | कोई औपचारिक प्रमाण नहीं | एकल दफन, साथ में सूक्ष्म औजार | बस्तियों के अंदर दफन; **कुत्ता-मालिक समाधान** | **कलश समाधान (Urn burial)** - घरों के फर्श के नीचे उत्तर-दक्षिण दिशा में |\n| **घोड़े व लोहे का ज्ञान** | **नहीं** (दोनों अज्ञात) | **नहीं** (दोनों अज्ञात) | **नहीं** (दोनों अज्ञात) | **नहीं** (लोहा व पकी ईंटें पूर्णतः अज्ञात) |\n\n---\n\n## 💎 9. महत्वपूर्ण वन-लाइनर्स, परीक्षा उपयोगी तथ्य एवं प्रथम साक्ष्य\n\n- **भारतीय पुरातत्व का जनक:** **सर अलेक्जेंडर कनिंघम** (ASI के प्रथम महानिदेशक, 1861)।\n- **भारतीय प्रागैतिहास का जनक:** **रॉबर्ट ब्रूस फुट** (1863 में पल्लावरम में हस्तकुठार की खोज की)।\n- **भारतीय शैलकला का पितामह:** **डॉ. विष्णु श्रीधर (वी.एस.) वाकणकर** (1957 में भीमबेटका की खोज की)।\n- **मानव द्वारा प्रयुक्त प्रथम धातु:** **तांबा (Copper)** (लगभग 5000–3500 ई.पू.)।\n- **मानव द्वारा पालतू बनाया गया पहला पशु:** **कुत्ता (Dog)**, उसके बाद भेड़ और बकरी।\n- **भारत में पशुपालन के प्राचीनतम साक्ष्य:** **बागोर (राजस्थान)** एवं **आदमगढ़ (मध्य प्रदेश)**।\n- **भारतीय उपमहाद्वीप में कृषि का सबसे प्राचीन स्थल:** **मेहरगढ़ (बलूचिस्तान, पाकिस्तान)** — गेहूं, जौ, कपास (लगभग 7000 ई.पू.)।\n- **भारत में चावल की खेती के सबसे प्राचीन साक्ष्य:** **कोल्डीहवा एवं महागड़ा (बेलन घाटी, प्रयागराज, UP)** — लगभग 7000–6000 ई.पू.।\n- **भारत में एकमात्र मानव जीवाश्म:** **नर्मदा मानव (होमो इरेक्टस)** की खोपड़ी, **हथनोरा (MP)** में अरुण सोनकिया द्वारा (1982)।\n- **भारत में शुतुरमुर्ग के प्राचीनतम साक्ष्य:** **पाटणे (महाराष्ट्र)** में शुतुरमुर्ग के अंडों के छिलके पर नक्काशीदार मनके।\n- **गर्त-आवास (Pit dwellings) एवं मालिक के साथ कुत्ता दफन:** **बुर्जहोम (कश्मीर)** की विशिष्ट पहचान।\n- **कुम्हार की गुफा (Cave of Potters):** **गुफकराल (कश्मीर)**।\n- **हिरण के सींगों व हड्डियों के औजारों की प्रचुरता:** **चिरांद (बिहार)** एवं **बुर्जहोम (कश्मीर)**।\n- **जेडाइट (Jadeite) हरा पत्थर औजार:** **दाओजली हाडिंग (असम)**, जो चीन/म्यांमार से संपर्क दर्शाता है।\n- **भारत का सबसे बड़ा मध्यपाषाण स्थल:** **बागोर (राजस्थान)** कोठारी नदी तट पर।\n- **जोर्वे संस्कृति का सबसे बड़ा स्थल:** **दायमाबाद (महाराष्ट्र)**, लगभग 20 हेक्टेयर में फैला।\n- **महाराष्ट्र का प्रसिद्ध कांस्य जखीरा:** **दायमाबाद कांस्य रथ** और पशु मूर्तियां।\n- **भारत की सबसे बड़ी ताम्र निधि (Copper Hoard):** **गुंगेरिया (बालाघाट, MP)** — 424 तांबे के उपकरण व 102 चांदी के पत्रक।\n- **प्राचीन तांबा खनन केंद्र:** **खेतड़ी की खानें (राजस्थान)** और **मलांजखंड (मध्य प्रदेश)**।\n- **भारत में शैलकला की पहली खोज:** **सुहागीघाट (मिर्जापुर, UP)** में आर्चीबाल्ड कार्लाइल द्वारा 1867 में।\n- **लखुडियार शैलचित्र:** **सुयाल नदी तट, अल्मोड़ा जिला, उत्तराखंड** में स्थित।\n- **चाताल हुयुक:** **तुर्की** में स्थित विश्व का प्रारंभिक नवपाषाण प्रोटो-शहर।\n- **महाराष्ट्र ताम्रपाषाण में समाधान प्रथा:** बच्चों को दो **कलशों (Urns)** में रखकर घरों के फर्श के नीचे **उत्तर से दक्षिण दिशा** में गाड़ते थे।\n- **ऋणात्मक तथ्य (SSC के सीधे कन्फ्यूजन प्रश्न):**\n  - ताम्रपाषाण कालीन लोग **लोहे** से परिचित **नहीं** थे (लोहा 1000 ई.पू. में उत्तर वैदिक काल में आया)।\n  - ताम्रपाषाण कालीन लोग **पकी ईंटों** से परिचित **नहीं** थे (केवल कच्ची ईंट व गारे का प्रयोग)।\n  - पाषाण काल या ताम्रपाषाण काल में घरेलू **घोड़ा** उपस्थित **नहीं** था।\n\n---\n\n## 🧾 10. अंतिम क्षणों की त्वरित रिवीजन शीट\n\n### तीन महत्वपूर्ण क्रमवार समयरेखाएं\n\n1. **मानव जैविक विकास क्रम:**\n   ```\n   ऑस्ट्रेलोपिथेकस ➔ होमो हैबिलिस ➔ होमो इरेक्टस ➔ होमो निएंडरथल ➔ होमो सेपियन्स\n   ```\n2. **तकनीक एवं पदार्थ का विकास:**\n   ```\n   कोर पेबुल औजार ➔ फलक खुरचनी ➔ ब्लेड व ब्यूरिन ➔ माइक्रोलिथ ➔ पॉलिशदार सेल्ट ➔ तांबा धातु ➔ कांसा ➔ लोहा\n   ```\n3. **आजीविका का क्रमिक विकास:**\n   ```\n   शिकार-संग्रह (पुरापाषाण) ➔ शिकार-पशुपालन (मध्यपाषाण) ➔ व्यवस्थित कृषि (नवपाषाण) ➔ कृषक-धातुकर्म (ताम्रपाषाण)\n   ```\n\n### परीक्षा हेतु अनिवार्य स्वर्णिम संख्याएं\n\n- **4.5 अरब वर्ष:** पृथ्वी की भूवैज्ञानिक आयु।\n- **25.8 लाख वर्ष पूर्व:** चतुर्थक युग का प्रारंभ।\n- **10,000 ई.पू.:** प्लीस्टोसीन हिमयुग की समाप्ति व होलोसीन उष्ण काल का प्रारंभ।\n- **12,000 – 10,000 ई.पू.:** SSC परीक्षाओं में मध्यपाषाण काल की सामान्यतः स्वीकृत समयावधि।\n- **7,000 ई.पू.:** मेहरगढ़ में कृषि एवं कोल्डीहवा में चावल की प्राचीनतम शुरुआत।\n- **1861:** भारतीय पुरातत्व सर्वेक्षण (ASI) की स्थापना (अलेक्जेंडर कनिंघम)।\n- **1863:** भारत में पहले पाषाण औजार की खोज (रॉबर्ट ब्रूस फुट - पल्लावरम)।\n- **1957:** भीमबेटका शैलचित्रों की खोज (डॉ. वी.एस. वाकणकर)।\n- **750+:** भीमबेटका में कुल शैल आश्रय (500+ में प्रागैतिहासिक चित्र)।\n\n### ⚠️ तीन सबसे घातक परीक्षा भ्रम (Three Traps to Never Confuse)\n\n> ⚠️ **भ्रम 1: बुर्जहोम बनाम गुफकराल (दोनों कश्मीर घाटी में स्थित हैं)**\n> - **बुर्जहोम:** जमीन के भीतर **गर्त-आवास (Pit dwellings)** और कब्र में **मालिक के साथ पालतू कुत्ते को दफनाने** के लिए प्रसिद्ध है।\n> - **गुफकराल:** इसका शाब्दिक अर्थ *\"कुम्हार की गुफा\"* है; यह प्रारंभिक **पशुपालन (भेड़/बकरी)** और **मृद्भांड विहीन से मृद्भांड युक्त अवस्था** में परिवर्तन हेतु प्रसिद्ध है।\n\n> 💡 **भ्रम 2: प्राचीनतम कृषि बनाम प्राचीनतम पशुपालन बनाम प्राचीनतम चावल**\n> - **प्राचीनतम कृषि (सामान्यतः):** **मेहरगढ़ (बलूचिस्तान)** — गेहूं, जौ, कपास (लगभग 7000 ई.पू.)।\n> - **प्राचीनतम पशुपालन:** **बागोर (राजस्थान)** एवं **आदमगढ़ (MP)** — मध्यपाषाण काल।\n> - **प्राचीनतम चावल की खेती:** **कोल्डीहवा एवं महागड़ा (बेलन घाटी, UP)** — लगभग 7000–6000 ई.पू.।\n\n> 🔑 **भ्रम 3: प्रागैतिहासिक बनाम आद्य-ऐतिहासिक बनाम ऐतिहासिक काल**\n> - **प्रागैतिहासिक काल (Pre-History):** कोई लिपि नहीं, कोई लिखित साक्ष्य नहीं (पाषाण काल व ताम्रपाषाण)।\n> - **आद्य-ऐतिहासिक काल (Proto-History):** लिपि मौजूद है परंतु **अपठित** है (सिंधु घाटी की कांस्य युगीन सभ्यता)।\n> - **ऐतिहासिक काल (Historical Period):** लिखित साक्ष्य मौजूद हैं और **सफलतापूर्वक पढ़े जा चुके हैं** (छठी शताब्दी ई.पू. महाजनपद काल से आगे)।\n"
  },
  {
    id: "note-history-stone-age-bi",
    title: "Ancient History: The Stone Age & Chalcolithic Cultures (पाषाण काल एवं ताम्रपाषाण - द्विभाषी नोट्स)",
    language: "bilingual",
    subject: "Ancient History (प्राचीन इतिहास)",
    category: "concept",
    tags: ["History","Ancient History","Stone Age","Palaeolithic","Bilingual","पाषाण काल","Bhimbetka","SSC CGL","UPSC"],
    summary: "Complete bilingual (English & Hindi) 10-section study notes on Indian Prehistory covering all four stages, tool technology, major excavations, Bhimbetka cave art, and rapid revision sheets.",
    readingTimeMinutes: 7,
    isStarred: true,
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    createdAt: "2026-09-28T14:15:00Z",
    updatedAt: "2026-09-28T14:15:00Z",
    content: "# Ancient History: Stone Age & Chalcolithic Cultures (पाषाण काल एवं ताम्रपाषाण)\n\n> 🎯 **Bilingual Exam Master Note:** Complete bilingual revision guide covering prehistoric timeline, Palaeolithic to Chalcolithic periods, Bhimbetka rock art, tools classification, and top-tier SSC/UPSC exam facts.\n\n---\n\n## 🏛️ 1. Conceptual Foundation & Periodization (वैचारिक आधार एवं काल-विभाजन)\n\n### Three Historical Horizons (इतिहास के तीन कालखंड)\n- **Ancient History (प्राचीन भारत):** Earliest hominid tools to 7th Century AD (till Harsha's death in 647 AD).\n- **Medieval History (मध्यकालीन भारत):** 8th Century AD to 18th Century AD (Islamic invasion, Delhi Sultanate, Mughals till 1707 AD).\n- **Modern History (आधुनिक भारत):** 18th Century AD onwards (British colonial rule, Freedom Struggle, Republic India).\n\n### Historiographical Classifications (इतिहासकारों का वर्गीकरण)\n- **James Mill (1817 - 'The History of British India'):** Divided Indian history along communal lines:\n  1. Hindu Period (हिंदू काल)\n  2. Muslim Period (मुस्लिम काल)\n  3. British Period (ब्रिटिश काल)\n- **C.J. Thomsen (1836):** Three-Age Material System:\n  1. Stone Age (पाषाण काल)\n  2. Bronze Age (कांस्य काल)\n  3. Iron Age (लौह काल)\n\n### Three-Fold Division by Written Records (लिखित साक्ष्यों के आधार पर विभाजन)\n\n| Category | Script Evidence (लिपि साक्ष्य) | Decipherment (पठनीयता) | Indian Examples (भारतीय उदाहरण) |\n| :--- | :--- | :--- | :--- |\n| **Pre-History (प्रागैतिहासिक)** | Absent (अनुपस्थित) | None (केवल पुरातात्विक उत्खनन) | Palaeolithic, Mesolithic, Neolithic, Chalcolithic |\n| **Proto-History (आद्य-ऐतिहासिक)** | Present (उपस्थित) | **Undeciphered (अपठित)** | **Indus Valley Civilisation (हड़प्पा सभ्यता)** |\n| **Historical (ऐतिहासिक काल)** | Present (उपस्थित) | **Fully Deciphered (पठित)** | 6th Century BC onwards (Mahajanapadas, Mauryas) |\n\n### Timeline Coordinates & Geological Scale\n- **Timeline:** '0' = Birth of Jesus Christ. **BC** counts backwards (countdown); **AD** counts forward.\n- **Century:** 1 Century = 100 Years (8th Century BC = 800–700 BC; 18th Century AD = 1700–1800 AD).\n- **Geological Deep Time:** Earth age = **4.5 Billion Years**. **Quaternary Era** began **2.58 Million years ago**.\n  - **Pleistocene Epoch (Ice Age - हिमयुग):** 2.58 Mya to 10,000 BC ➔ Palaeolithic Age.\n  - **Holocene Epoch (Warm post-ice age):** 10,000 BC to Present ➔ Mesolithic, Neolithic, Metal ages.\n\n---\n\n## ⏳ 2. Chronological Timeline & Human Evolution (समयरेखा एवं मानव विकास)\n\n### Sequential Stages of Prehistory\n- **Lower Palaeolithic (निम्न पुरापाषाण):** 5,00,000 – 50,000 BC (Handaxes, Sohan Valley)\n- **Middle Palaeolithic (मध्य पुरापाषाण):** 50,000 – 40,000 BC (Flake Technology, Nevasa)\n- **Upper Palaeolithic (उच्च पुरापाषाण):** 40,000 – 10,000 BC (Blade & Burin, Homo Sapiens, Bhimbetka art)\n- **Mesolithic (मध्यपाषाण):** 9,000 – 7,000 BC *(SSC Official Key: 12,000 – 10,000 BC)* (Microliths, animal herding at Bagor)\n- **Neolithic (नवपाषाण):** 7,000 – 1,000 BC (Agriculture at Mehrgarh, polished celts, pottery, pit houses)\n- **Chalcolithic (ताम्रपाषाण):** 3,500 – 1,000 BC (First metal: Copper + stone, rural villages)\n\n### Evolution of Man (मानव का क्रमिक विकास)\n```\nAustralopithecus ➔ Homo Habilis (Toolmaker) ➔ Homo Erectus (Fire & Narmada Man) ➔ Homo Neanderthalensis (Burials) ➔ Homo Sapiens (Modern Man)\n```\n\n---\n\n## 📊 3. Comparative Tool Technology & Breakdown (उपकरण एवं तकनीक)\n\n| Feature | Palaeolithic (पुरापाषाण) | Mesolithic (मध्यपाषाण) | Neolithic (नवपाषाण) | Chalcolithic (ताम्रपाषाण) |\n| :--- | :--- | :--- | :--- | :--- |\n| **Tools (औजार)** | Handaxe, Cleaver, Chopper, Flakes | **Microliths (1–5 cm)** geometric blades | **Polished Celts**, bone tools | **Copper tools** + stone blades |\n| **Material (सामग्री)** | **Quartzite (क्वार्टजाइट)**, Chert | Chert, Chalcedony, Agate | Basalt, Dolerite, Granite, Jadeite | Copper metal + Siliceous stone |\n| **Subsistence (आजीविका)** | Pure Hunting & Gathering | Hunting & Earliest Herding | **Food Production (Agriculture)** | Agro-Pastoralism & Metallurgy |\n| **Pottery (मृद्भांड)** | Absent (अनुपस्थित) | Crude handmade (Chopani Mando) | **Cord-impressed pottery** | **Painted Black-and-Red (BRW)**, OCP |\n\n### Mnemonics for Exam\n- **`P-M-N-C`**: **P**alaeolithic ➔ **M**esolithic ➔ **N**eolithic ➔ **C**halcolithic.\n- **`A-H-H-N-S`**: **A**ustralopithecus ➔ **H**abilis ➔ **H**omo erectus ➔ **N**eanderthal ➔ **S**apiens.\n- **`B-A-G`**: **B**agor & **A**damgarh = Earliest **G**oat/cattle domestication (पशुपालन).\n\n---\n\n## ⚖️ 4. Key Archaeological Sites & Discoveries (प्रमुख पुरातात्विक स्थल)\n\n| Site (स्थल) | State / Location | Finding & Significance (महत्वपूर्ण खोज) |\n| :--- | :--- | :--- |\n| **Bhimbetka (भीमबेटका)** | Raisen, **MP** | **750+ caves, 500+ paintings**; discovered by **Dr. V.S. Wakankar (1957)**; UNESCO 2003. |\n| **Patne (पाटणे)** | Jalgaon, **Maharashtra** | **Ostrich eggshell beads** with engraved decorative designs (शुतुरमुर्ग के अंडे). |\n| **Hathnora (हथनोरा)** | Narmada Valley, **MP** | **\"Narmada Man\" skull** (Homo erectus) discovered by **Arun Sonakia (1982)**; only hominid fossil in India. |\n| **Bagor (बागोर)** | Bhilwara, **Rajasthan** | **Largest Mesolithic site** in India; earliest **animal domestication** (पशुपालन). |\n| **Mehrgarh (मेहरगढ़)** | Bolan Pass, **Balochistan** | **Oldest agricultural settlement (c. 7000 BC)**; wheat, barley, cotton; mud-brick houses. |\n| **Burzahom (बुर्जहोम)** | Srinagar, **Kashmir** | **Pit dwellings (गर्त-आवास)**; unique **domestic dogs buried with human masters**; bone tools. |\n| **Gufkral (गुफकराल)** | Pulwama, **Kashmir** | *\"Cave of Potters\" (कुम्हार की गुफा)*; transition to pottery & sheep/goat domestication. |\n| **Koldihwa (कोल्डीहवा)** | Belan Valley, **UP** | **Earliest evidence of rice cultivation (7000–6000 BC)** in India (चावल की खेती). |\n| **Chirand (चिरांद)** | Saran, **Bihar** | Rich collection of **deer antler & bone tools** (हिरण के सींग व हड्डी के औजार). |\n| **Daojali Hading** | Dima Hasao, **Assam** | **Jadeite stone tools (जेडाइट हरा पत्थर)** imported from China/Myanmar; fossil wood. |\n| **Daimabad (दायमाबाद)** | Ahmednagar, **Maharashtra** | **Largest Jorwe site**; famous **Daimabad Bronze Chariot** & animal sculptures (कांस्य रथ). |\n| **Inamgaon (इनामगांव)** | Pune, **Maharashtra** | Fortified village; 100+ mud houses, granary, craft houses; child urn burials. |\n| **Navdatoli (नवदाटोली)** | Khargone, **MP** | Highest diversity of food grains (wheat, rice, lentils); painted Black-and-Red ware. |\n| **Lakhudiyar (लखुडियार)** | Almora, **Uttarakhand** | *\"One Lakh Caves\"*; prehistoric paintings on **Suyal River** (हाथ पकड़े नृत्य करते मानव). |\n\n---\n\n## 🎯 5. Landmark Dates & Pioneers (ऐतिहासिक तिथियां व खोजकर्ता)\n\n- **1817:** James Mill publishes *The History of British India* (Communal classification).\n- **1836:** C.J. Thomsen introduces the Three-Age System (Stone, Bronze, Iron).\n- **1861:** **Sir Alexander Cunningham** founds ASI (**\"Father of Indian Archaeology\"**).\n- **1863:** **Robert Bruce Foote** finds first Palaeolithic tool at Pallavaram, Madras (**\"Father of Indian Prehistory\"**).\n- **1867:** **Archibald Carlleyle** discovers first rock art at Sohagighat, Mirzapur, UP.\n- **1957:** **Dr. V.S. Wakankar** discovers Bhimbetka Rock Caves (**\"Father of Indian Rock Art\"**).\n- **1982:** **Arun Sonakia** unearths \"Narmada Man\" fossil skull at Hathnora, MP.\n- **2003:** Bhimbetka inscribed as a **UNESCO World Heritage Site**.\n\n---\n\n## ✒️ 6. Cultural Stage Analysis (विस्तृत चरण विश्लेषण)\n- **Lower Palaeolithic:** Sohan pebble choppers (North) + Madrasian Acheulian handaxes (South). Homo erectus, Ice Age.\n- **Middle Palaeolithic:** Flake Technology (फलक उद्योग); scrapers and borers; Nevasan culture.\n- **Upper Palaeolithic:** Emergence of Homo Sapiens; Blade & Burin flint tools; first cave art.\n- **Mesolithic Era:** Holocene warming; Microliths; bow & arrow invention; animal herding at Bagor & Adamgarh.\n- **Neolithic Revolution:** V. Gordon Childe's concept; farming + polished celts + pottery + sedentary villages.\n- **Chalcolithic Period:** First metal: Copper (तांबा); rural non-urban agricultural cultures; urn burials.\n\n---\n\n## 📂 7. Regional Chalcolithic Cultures (क्षेत्रीय ताम्रपाषाण संस्कृतियां)\n- **Ahar-Banas (SE Rajasthan):** Old name *Tambavati*; abundant copper smelting, flat axes, banas terracotta bulls.\n- **Kayatha (MP):** Kalisindh river; 29 copper bangles and 2 cast axes cached in jars.\n- **Malwa (MP):** Navdatoli type site; richest painted pottery; multi-crop cultivation.\n- **Jorwe (Maharashtra):** Daimabad and Inamgaon; spouted carinated bowls; infant urn burials; bronze chariot hoard.\n- **Copper Hoard & OCP Culture:** Ganga-Yamuna Doab; anthropomorphic figures; Gungeria (MP) yielded 424 copper & 102 silver items.\n\n---\n\n## ⚡ 8. Socio-Economic Transitions Matrix (सामाजिक-आर्थिक बदलाव)\n- **Economy:** Hunter-Gatherer ➔ Hunter-Herder ➔ Food Producer (Farmer) ➔ Agro-Pastoral Metallurgist.\n- **Dwellings:** Caves ➔ Temporary open camps ➔ Permanent mud huts & pit dwellings ➔ Clustered villages with granaries.\n- **Burials:** None ➔ Single graves with microliths ➔ Master-dog burials inside settlement ➔ Infant urn burials under house floor (North-South in Maharashtra).\n- **Negative Facts (MCQ Traps):** Prehistoric & Chalcolithic people did **NOT** use Iron, burnt bricks, or domestic horses!\n\n---\n\n## 💎 9. Significant One-Liners & Trivia (महत्वपूर्ण परीक्षा तथ्य)\n- **Father of Indian Archaeology:** Alexander Cunningham (1861).\n- **Father of Indian Rock Art:** V.S. Wakankar (1957 - Bhimbetka).\n- **First Metal Used:** Copper (तांबा).\n- **First Domesticated Animal:** Dog (कुत्ता), followed by sheep/goat.\n- **Earliest Agriculture:** Mehrgarh (Balochistan) — wheat, barley, cotton (7000 BC).\n- **Earliest Animal Domestication:** Bagor (Rajasthan) & Adamgarh (MP).\n- **Earliest Rice Cultivation:** Koldihwa (Belan Valley, UP) — 7000–6000 BC.\n- **Only Hominid Fossil in India:** Hathnora (Narmada Man, MP).\n- **Ostrich Eggshells in India:** Patne (Maharashtra).\n- **Pit Dwellings & Master-Dog Burial:** Burzahom (Kashmir).\n- **Bone & Antler Tools Hub:** Chirand (Bihar).\n- **Jadeite Stone Tool:** Daojali Hading (Assam).\n- **Largest Mesolithic Site:** Bagor (Rajasthan).\n- **Largest Jorwe Culture Site:** Daimabad (Maharashtra).\n- **Ancient Copper Mining Hubs:** Khetri (Rajasthan) & Malanjkhand (MP).\n\n---\n\n## 🧾 10. Last-Minute Rapid Revision Sheet (अंतिम त्वरित रिवीजन)\n\n### Sequence Timelines\n1. **Man:** Australopithecus ➔ Homo Habilis ➔ Homo Erectus ➔ Homo Neanderthalensis ➔ Homo Sapiens\n2. **Tools:** Core Pebble ➔ Flake Scrapers ➔ Blade & Burin ➔ Microliths ➔ Polished Celts ➔ Copper Metal\n3. **Materials:** Stone Age ➔ Bronze Age ➔ Iron Age\n\n### Golden Numbers\n- **4.5 Billion Years:** Earth age.\n- **2.58 Million Years:** Quaternary era start.\n- **10,000 BC:** Pleistocene Ice Age ends, Holocene starts.\n- **12,000 – 10,000 BC:** SSC official key for Mesolithic start.\n- **7,000 BC:** Neolithic farming at Mehrgarh & rice at Koldihwa.\n- **1861:** ASI founded.\n- **1957:** Bhimbetka discovered.\n\n### ⚠️ Three Critical Exam Traps\n> ⚠️ **Trap 1: Burzahom vs Gufkral (Kashmir)**\n> - **Burzahom:** Pit dwellings & Master-Dog burials.\n> - **Gufkral:** \"Cave of Potters\", early pastoralism & pottery transition.\n\n> 💡 **Trap 2: Earliest Agriculture vs Domestication vs Rice**\n> - **Agriculture (General):** Mehrgarh (Balochistan - wheat, barley).\n> - **Animal Domestication:** Bagor (Rajasthan) & Adamgarh (MP).\n> - **Rice Cultivation:** Koldihwa (Belan Valley, UP).\n\n> 🔑 **Trap 3: Pre-History vs Proto-History vs Historical**\n> - **Pre-History:** NO script / NO records (Stone & Chalcolithic).\n> - **Proto-History:** Script exists but UNDECIPHERED (Indus Valley).\n> - **Historical Period:** Deciphered records available (6th Century BC onwards).\n"
  },
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
  theme: 'default' | 'sepia' | 'oled' = 'default',
  fontFamily: 'handwritten' | 'sans' | 'editorial' = 'handwritten'
): React.ReactNode => {
  if (!content) return null;

  const isSepia = theme === 'sepia';
  const isOled = theme === 'oled';
  const isHandwritten = fontFamily === 'handwritten';

  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  const textSizeClass =
    fontSize === 'xl'
      ? isHandwritten
        ? 'text-base sm:text-lg leading-[2] sm:leading-[2.1]'
        : 'text-base sm:text-lg leading-relaxed'
      : fontSize === 'lg'
      ? isHandwritten
        ? 'text-sm sm:text-base leading-[1.95] sm:leading-[2]'
        : 'text-sm sm:text-base leading-relaxed'
      : isHandwritten
      ? 'text-xs sm:text-sm leading-[1.9] sm:leading-[1.95]'
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
          className={`flex items-center gap-3 mt-12 sm:mt-14 mb-5 pb-3 border-b scroll-mt-24 ${
            isSepia
              ? 'border-[#DECDB5]'
              : isOled
              ? 'border-white/15'
              : 'border-slate-200/80 dark:border-white/10'
          }`}
        >
          <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-indigo-500 via-indigo-600 to-purple-600 shrink-0 shadow-2xs" />
          <h3 className={`text-xl sm:text-2xl font-black ${
            isHandwritten ? 'tracking-normal leading-[1.35] sm:leading-[1.4]' : 'tracking-tight leading-snug'
          } ${
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
          className={`text-base sm:text-lg font-extrabold mt-8 sm:mt-9 mb-3.5 flex items-center gap-2 scroll-mt-24 ${
            isHandwritten ? 'leading-[1.4]' : 'leading-snug'
          } ${
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
          className={`text-sm sm:text-base font-bold mt-6 mb-2.5 flex items-center gap-1.5 scroll-mt-24 ${
            isHandwritten ? 'leading-[1.4]' : 'leading-snug'
          } ${
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
          className={`flex items-start gap-3 ${
            isHandwritten ? 'my-2.5 sm:my-3' : 'my-2'
          } ${
            isDeepNested ? 'ml-10 sm:ml-12 my-1' : isNested ? 'ml-5 sm:ml-7 my-1.5' : ''
          }`}
        >
          {isNested ? (
            <span className={`w-1.5 h-1.5 rounded-full ${isHandwritten ? 'mt-2.5' : 'mt-2'} shrink-0 ${
              isSepia ? 'bg-[#824408]' : isOled ? 'bg-indigo-400' : 'bg-slate-400 dark:bg-slate-500'
            }`} />
          ) : (
            <span className={`w-2 h-2 rounded-full ${isHandwritten ? 'mt-2.5' : 'mt-2'} shrink-0 ring-4 ${
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
          className={`flex items-start gap-3 ${isHandwritten ? 'my-3 sm:my-3.5' : 'my-2.5'} ${isNested ? 'ml-6 sm:ml-8 my-1.5' : ''}`}
        >
          <span className={`w-5 h-5 sm:w-6 sm:h-6 rounded-lg text-xs font-mono font-black flex items-center justify-center shrink-0 ${isHandwritten ? 'mt-1' : 'mt-0.5'} shadow-2xs ${
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
      <p key={`p-${i}`} className={`${isHandwritten ? 'my-4 sm:my-5' : 'my-3.5'} font-normal ${textSizeClass} ${bodyTextColor}`}>
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
  const [readerFontFamily, setReaderFontFamily] = useState<'handwritten' | 'sans' | 'editorial'>('handwritten');
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

              {/* Font Family Selector (Handwritten / Clean Sans / Book Serif) */}
              <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300/80 dark:border-slate-700 shadow-2xs text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setReaderFontFamily('handwritten')}
                  className={`px-2 sm:px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                    readerFontFamily === 'handwritten'
                      ? 'bg-indigo-600 text-white font-black shadow-xs'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-semibold'
                  }`}
                  title="Handwritten Notes Font (Kalam / Caveat)"
                >
                  <span className="font-handwritten text-xs">✍️</span>
                  <span className="hidden sm:inline font-handwritten text-[13px]">Notes</span>
                </button>
                <button
                  type="button"
                  onClick={() => setReaderFontFamily('sans')}
                  className={`px-2 sm:px-2.5 py-1 rounded-lg transition-all ${
                    readerFontFamily === 'sans'
                      ? 'bg-indigo-600 text-white font-black shadow-xs'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-semibold'
                  }`}
                  title="Clean Modern Sans Font"
                >
                  Sans
                </button>
                <button
                  type="button"
                  onClick={() => setReaderFontFamily('editorial')}
                  className={`px-2 sm:px-2.5 py-1 rounded-lg transition-all ${
                    readerFontFamily === 'editorial'
                      ? 'bg-indigo-600 text-white font-black shadow-xs'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-semibold'
                  }`}
                  title="Classic Book Serif Font (Merriweather)"
                >
                  Serif
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
                <h1 className={`text-2xl sm:text-4xl lg:text-5xl font-black mb-5 py-1 ${
                  readerFontFamily === 'handwritten'
                    ? 'font-handwritten leading-[1.35] sm:leading-[1.4] tracking-normal'
                    : readerFontFamily === 'editorial'
                    ? 'font-editorial leading-[1.25] sm:leading-[1.3] tracking-tight'
                    : 'font-sans leading-[1.2] sm:leading-[1.25] tracking-tight'
                } ${
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
                <div className={`pb-16 transition-all ${
                  readerFontFamily === 'handwritten'
                    ? 'font-handwritten notebook-margin-accent pl-3 sm:pl-5'
                    : readerFontFamily === 'editorial'
                    ? 'font-editorial'
                    : 'font-sans'
                }`}>
                  {renderProfessionalNotesContent(activeReadingNote.content, readerFontSize, readerTheme, readerFontFamily)}
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
