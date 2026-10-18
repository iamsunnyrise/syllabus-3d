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
interface VocabItem {
  id: string;
  word: string;
  phonetic: string;
  hindi: string;
  type: 'word' | 'ows' | 'idiom' | 'root';
  partOfSpeech: string;
  meaning: string;
  synonyms: string[];
  antonyms: string[];
  example: string;
  mnemonic: string;
  frequency: 'High' | 'Very High' | 'Repeated';
  examTags: string[];
  collocation?: string;
  derivatives?: string;
}

const DEFAULT_VOCAB_DATA: VocabItem[] = [
  {
    id: 'v1',
    word: 'Ephemeral',
    phonetic: '/ɪˈfem.ər.əl/',
    hindi: 'अल्पकालिक / क्षणभंगुर',
    type: 'word',
    partOfSpeech: 'Adjective',
    meaning: 'Lasting for a very short time; transitory.',
    synonyms: ['Transient', 'Fleeting', 'Evanescent', 'Momentary'],
    antonyms: ['Eternal', 'Perpetual', 'Everlasting', 'Permanent'],
    example: 'Fame in modern social media is often ephemeral and fades rapidly.',
    mnemonic: 'Sounds like "e-flower" -> A flower blooms for a very short, ephemeral time.',
    frequency: 'Repeated',
    examTags: ['SSC CGL', 'CHSL', 'NDA'],
    collocation: 'Ephemeral pleasure / fame / beauty',
    derivatives: 'Ephemerality (noun), Ephemerally (adverb)'
  },
  {
    id: 'v2',
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
    id: 'v3',
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
    id: 'v4',
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
    id: 'v5',
    word: 'Meticulous',
    phonetic: '/məˈtɪk.jə.ləs/',
    hindi: 'अति सावधान / सूक्ष्म ग्राही',
    type: 'word',
    partOfSpeech: 'Adjective',
    meaning: 'Showing great attention to detail; very careful and precise.',
    synonyms: ['Fastidious', 'Scrupulous', 'Punctilious', 'Painstaking'],
    antonyms: ['Careless', 'Sloppy', 'Negligent', 'Slipshod'],
    example: 'The auditor was meticulous in cross-verifying every single receipt.',
    mnemonic: 'Meticulous = "Matters tick closely" -> Checking every small tick-mark carefully.',
    frequency: 'Very High',
    examTags: ['SSC CGL', 'CHSL', 'IBPS PO'],
    collocation: 'Meticulous in / about doing research',
    derivatives: 'Meticulously (adverb), Meticulousness (noun)'
  },
  {
    id: 'v6',
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
    id: 'v7',
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
    id: 'v8',
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
    id: 'v9',
    word: 'Sagacious',
    phonetic: '/səˈɡeɪ.ʃəs/',
    hindi: 'बुद्धिमान / दूरदर्शी',
    type: 'word',
    partOfSpeech: 'Adjective',
    meaning: 'Having or showing keen mental discernment and good judgment; wise.',
    synonyms: ['Prudent', 'Judicious', 'Astute', 'Shrewd'],
    antonyms: ['Foolish', 'Naive', 'Fatuitous', 'Imprudent'],
    example: 'The sagacious counsel of the elder saved the community from a catastrophic conflict.',
    mnemonic: 'Sage means a wise saint -> Sagacious means sage-like wisdom.',
    frequency: 'Very High',
    examTags: ['SSC CGL', 'CPO', 'Banking'],
    collocation: 'Sagacious advice / leader / decision',
    derivatives: 'Sagacity (noun), Sagaciously (adverb)'
  },
  {
    id: 'v10',
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
  },
  {
    id: 'v11',
    word: 'Mitigate',
    phonetic: '/ˈmɪt.ɪ.ɡeɪt/',
    hindi: 'कम करना / शांत करना / गंभीरता घटाना',
    type: 'word',
    partOfSpeech: 'Verb',
    meaning: 'Make something bad less severe, serious, or painful.',
    synonyms: ['Alleviate', 'Assuage', 'Palliate', 'Mollify', 'Abate'],
    antonyms: ['Aggravate', 'Exacerbate', 'Intensify', 'Worsen'],
    example: 'The government planted mangrove belts along the coast to mitigate flood devastation.',
    mnemonic: 'Miti (Mitti / Mud) daal kar aag bujhana -> Fire intensity kam karna.',
    frequency: 'Repeated',
    examTags: ['SSC CGL', 'CHSL', 'Banking', 'CDS'],
    collocation: 'Mitigate risks / disaster / losses / impact',
    derivatives: 'Mitigation (noun), Unmitigated (adjective)'
  },
  {
    id: 'v12',
    word: 'Alacrity',
    phonetic: '/əˈlæk.rə.ti/',
    hindi: 'तत्परता / उत्साह / फुर्ती',
    type: 'word',
    partOfSpeech: 'Noun',
    meaning: 'Brisk and cheerful readiness; promptness in response.',
    synonyms: ['Eagerness', 'Promptness', 'Celerity', 'Briskness', 'Zeal'],
    antonyms: ['Lethargy', 'Reluctance', 'Apathy', 'Sluggishness'],
    example: 'She accepted the prestigious fellowship with alacrity and packed her bags within hours.',
    mnemonic: 'Sound like "All-Creativity" or "Electricity" -> High speed and energetic readiness.',
    frequency: 'Very High',
    examTags: ['SSC CGL', 'IBPS PO', 'CAT'],
    collocation: 'Accept / Respond with alacrity',
    derivatives: 'Alacritous (adjective)'
  },
  {
    id: 'v13',
    word: 'Castigate',
    phonetic: '/ˈkæs.tɪ.ɡeɪt/',
    hindi: 'कड़ी आलोचना करना / फटकारना',
    type: 'word',
    partOfSpeech: 'Verb',
    meaning: 'Reprimand or chastise someone severely.',
    synonyms: ['Chastise', 'Rebuke', 'Censure', 'Reprimand', 'Berate'],
    antonyms: ['Praise', 'Commend', 'Laud', 'Extol'],
    example: 'The parliamentary committee castigated the contractor for gross safety violations.',
    mnemonic: 'Castigate sounds like "Caste gate" -> Gatekeeper scolded/punished strictly.',
    frequency: 'Repeated',
    examTags: ['SSC CGL', 'CPO', 'NDA'],
    collocation: 'Castigate someone for negligence / misconduct',
    derivatives: 'Castigation (noun)'
  },
  {
    id: 'v14',
    word: 'Fastidious',
    phonetic: '/fæˈstɪd.i.əs/',
    hindi: 'तुनकमिज़ाज / जिसे खुश करना कठिन हो',
    type: 'word',
    partOfSpeech: 'Adjective',
    meaning: 'Very attentive to and concerned about accuracy and detail; hard to please.',
    synonyms: ['Punctilious', 'Fussy', 'Finicky', 'Meticulous', 'Overcritical'],
    antonyms: ['Carefree', 'Easygoing', 'Lenient', 'Undemanding'],
    example: 'The chef was fastidious about the temperature of the ovens and presentation.',
    mnemonic: 'Fastidious = Fast (Upwaas) + Tedious -> Making everyone fast because you are hard to please.',
    frequency: 'Repeated',
    examTags: ['SSC CGL', 'CHSL', 'Steno'],
    collocation: 'Fastidious about cleanliness / appearance',
    derivatives: 'Fastidiously (adverb), Fastidiousness (noun)'
  },
  {
    id: 'v15',
    word: 'Plethora',
    phonetic: '/ˈpleθ.ər.ə/',
    hindi: 'प्रचुरता / आधिक्य (ज़रूरत से ज़्यादा)',
    type: 'word',
    partOfSpeech: 'Noun',
    meaning: 'A large or excessive amount of something.',
    synonyms: ['Surfeit', 'Superabundance', 'Glut', 'Profusion', 'Excess'],
    antonyms: ['Paucity', 'Scarcity', 'Dearth', 'Shortage'],
    example: 'The online store provides a plethora of study resources, confusing new learners.',
    mnemonic: 'Plethora sounds like "Plate-thoda" -> Plate bhar ke khana (excess food).',
    frequency: 'Very High',
    examTags: ['SSC CGL', 'Banking', 'CDS'],
    collocation: 'A plethora of options / choices / complaints',
    derivatives: 'Plethoric (adjective)'
  },
  {
    id: 'v16',
    word: 'Ubiquitous',
    phonetic: '/juːˈbɪk.wɪ.təs/',
    hindi: 'सर्वव्यापी / जो हर जगह उपस्थित हो',
    type: 'word',
    partOfSpeech: 'Adjective',
    meaning: 'Present, appearing, or found everywhere at the same time.',
    synonyms: ['Omnipresent', 'Pervasive', 'Universal', 'Prevalent'],
    antonyms: ['Rare', 'Scarce', 'Infrequent', 'Localized'],
    example: 'Smartphones and digital QR codes have become ubiquitous across Indian markets.',
    mnemonic: 'Ubiquitous -> "You-be-everywhere" -> Present in every corner.',
    frequency: 'Repeated',
    examTags: ['SSC CGL', 'CHSL', 'IBPS PO'],
    collocation: 'Ubiquitous presence / influence',
    derivatives: 'Ubiquity (noun), Ubiquitously (adverb)'
  },
  {
    id: 'v17',
    word: 'Paucity',
    phonetic: '/ˈpɔː.sə.ti/',
    hindi: 'अभाव / कमी / न्यूनता',
    type: 'word',
    partOfSpeech: 'Noun',
    meaning: 'The presence of something only in small or insufficient quantities or amounts.',
    synonyms: ['Scarcity', 'Dearth', 'Shortage', 'Deficiency', 'Deficit'],
    antonyms: ['Abundance', 'Surplus', 'Plethora', 'Plenty'],
    example: 'The prosecution collapsed due to a severe paucity of verifiable evidence.',
    mnemonic: 'Paucity sounds like "Pau" (1/4th kg in Hindi) -> Bahut thodi maatra (very low quantity).',
    frequency: 'Repeated',
    examTags: ['SSC CGL', 'CPO', 'Banking'],
    collocation: 'Paucity of funds / evidence / talent',
    derivatives: 'Paucity (noun)'
  },
  {
    id: 'v18',
    word: 'Venerate',
    phonetic: '/ˈven.ər.eɪt/',
    hindi: 'आदर करना / सम्मान करना / पूजना',
    type: 'word',
    partOfSpeech: 'Verb',
    meaning: 'Regard with great respect; revere deeply.',
    synonyms: ['Revere', 'Worship', 'Hallow', 'Adore', 'Exalt'],
    antonyms: ['Despise', 'Disdain', 'Scorn', 'Degrade'],
    example: 'Citizens venerate the freedom fighters who sacrificed their youth for independence.',
    mnemonic: 'Venerate sounds like "Van-naari" or "Venerable" (Respected old sages).',
    frequency: 'Very High',
    examTags: ['SSC CGL', 'CHSL', 'NDA'],
    collocation: 'Venerated as a hero / saint',
    derivatives: 'Veneration (noun), Venerable (adjective)'
  },
  {
    id: 'v19',
    word: 'Inadvertently',
    phonetic: '/ˌɪn.ədˈvɜː.tənt.li/',
    hindi: 'अनजाने में / भूलवश / बिना इरादे के',
    type: 'word',
    partOfSpeech: 'Adverb',
    meaning: 'Without intention; accidentally or casually.',
    synonyms: ['Unintentionally', 'Accidentally', 'Unwittingly', 'Involuntarily'],
    antonyms: ['Deliberately', 'Intentionally', 'Purposely', 'Knowingly'],
    example: 'He inadvertently deleted the essential backup files while cleaning his hard drive.',
    mnemonic: 'In (Not) + Advertisement (Focus/Notice) -> Bina dhyan diye galti se ho jaana.',
    frequency: 'Repeated',
    examTags: ['SSC CGL', 'CHSL', 'Banking'],
    collocation: 'Inadvertently reveal / disclose / delete / overlook',
    derivatives: 'Inadvertent (adjective), Inadvertence (noun)'
  },
  {
    id: 'v20',
    word: 'Pragmatic',
    phonetic: '/præɡˈmæt.ɪk/',
    hindi: 'व्यावहारिक / यथार्थवादी',
    type: 'word',
    partOfSpeech: 'Adjective',
    meaning: 'Dealing with things sensibly and realistically in a way based on practical considerations.',
    synonyms: ['Practical', 'Realistic', 'Sensible', 'Hard-headed', 'Rational'],
    antonyms: ['Idealistic', 'Impractical', 'Quixotic', 'Visionary'],
    example: 'A pragmatic revision timetable focuses on high-weightage topics rather than finishing everything.',
    mnemonic: 'Pragmatic = "Practical + Automatic" -> Ground reality par chalna.',
    frequency: 'Repeated',
    examTags: ['SSC CGL', 'IBPS PO', 'CDS'],
    collocation: 'Pragmatic approach / solution / compromise',
    derivatives: 'Pragmatically (adverb), Pragmatism (noun)'
  },
  {
    id: 'v21',
    word: 'Vacillate',
    phonetic: '/ˈvæs.ɪ.leɪt/',
    hindi: 'डगमगाना / हिचकिचाना / अनिर्णय की स्थिति',
    type: 'word',
    partOfSpeech: 'Verb',
    meaning: 'Waver between different opinions or actions; be indecisive.',
    synonyms: ['Waver', 'Hesitate', 'Fluctuate', 'Dither', 'Oscillate'],
    antonyms: ['Resolute', 'Decide', 'Determine', 'Persevere'],
    example: 'Do not vacillate between optional subjects once your preparation begins.',
    mnemonic: 'Sounds like "Oscillate" (Pendulum ki tarah idhar-udhar hilna).',
    frequency: 'Very High',
    examTags: ['SSC CGL', 'CPO', 'Banking'],
    collocation: 'Vacillate between two choices / opinions',
    derivatives: 'Vacillation (noun), Vacillating (adjective)'
  },
  {
    id: 'v22',
    word: 'Equanimity',
    phonetic: '/ˌek.wəˈnɪm.ə.ti/',
    hindi: 'मानसिक संतुलन / धैर्य / समचित्तता',
    type: 'word',
    partOfSpeech: 'Noun',
    meaning: 'Mental calmness, composure, and evenness of temper, especially in a difficult situation.',
    synonyms: ['Composure', 'Serenity', 'Poise', 'Tranquility', 'Self-possession'],
    antonyms: ['Agitation', 'Perturbation', 'Anxiety', 'Frenzy'],
    example: 'The captain maintained calm equanimity despite conceding two quick goals.',
    mnemonic: 'Equal + Animated -> Keeping emotional level equal in both victory and defeat.',
    frequency: 'Repeated',
    examTags: ['SSC CGL', 'CDS', 'CAT'],
    collocation: 'Accept / Bear with equanimity',
    derivatives: 'Equanimous (adjective)'
  },
  {
    id: 'v23',
    word: 'Resilient',
    phonetic: '/rɪˈzɪl.i.ənt/',
    hindi: 'लचीला / संकट से शीघ्र उबरने वाला',
    type: 'word',
    partOfSpeech: 'Adjective',
    meaning: 'Able to withstand or recover quickly from difficult conditions.',
    synonyms: ['Tough', 'Hardy', 'Adaptable', 'Buoyant', 'Tenacious'],
    antonyms: ['Fragile', 'Vulnerable', 'Delicate', 'Brittle'],
    example: 'Resilient candidates learn from failed mock tests instead of losing confidence.',
    mnemonic: 'Spring coils re-bound (resile) after heavy pressure.',
    frequency: 'Repeated',
    examTags: ['SSC CGL', 'Banking', 'CHSL'],
    collocation: 'Resilient against economic shocks / adversity',
    derivatives: 'Resilience (noun), Resiliently (adverb)'
  },
  {
    id: 'v24',
    word: 'Vilify',
    phonetic: '/ˈvɪl.ɪ.faɪ/',
    hindi: 'बदनामी करना / निंदा करना / गाली देना',
    type: 'word',
    partOfSpeech: 'Verb',
    meaning: 'Speak or write about in an abusively disparaging manner.',
    synonyms: ['Defame', 'Malign', 'Slander', 'Disparage', 'Denigrate'],
    antonyms: ['Commend', 'Extol', 'Praise', 'Glorify'],
    example: 'It is unethical to vilify honest public servants for political leverage.',
    mnemonic: 'Vilify sounds like "Villain banadena" -> Kisi ko villain bana kar badnaam karna.',
    frequency: 'Very High',
    examTags: ['SSC CGL', 'CPO', 'Steno'],
    collocation: 'Vilify someone in the media / press',
    derivatives: 'Vilification (noun)'
  },
  {
    id: 'v25',
    word: 'Reticent',
    phonetic: '/ˈret.ɪ.sənt/',
    hindi: 'अल्पभाषी / मौन / संकोची',
    type: 'word',
    partOfSpeech: 'Adjective',
    meaning: 'Not revealing one\'s thoughts or feelings readily; reserved.',
    synonyms: ['Reserved', 'Taciturn', 'Withdrawn', 'Introverted', 'Secretive'],
    antonyms: ['Loquacious', 'Garrulous', 'Voluble', 'Talkative'],
    example: 'The witness was noticeably reticent about the identity of the mastermind.',
    mnemonic: 'Re + Silent -> Staying silent repeatedly.',
    frequency: 'Repeated',
    examTags: ['SSC CGL', 'CHSL', 'Banking'],
    collocation: 'Reticent about past events / personal feelings',
    derivatives: 'Reticence (noun), Reticently (adverb)'
  },
  {
    id: 'v26',
    word: 'Vociferously',
    phonetic: '/vəˈsɪf.ər.əs.li/',
    hindi: 'ज़ोर-शोर से / मुखरता से / चिल्लाकर',
    type: 'word',
    partOfSpeech: 'Adverb',
    meaning: 'In a loud, forceful, or clamorous manner.',
    synonyms: ['Clamorously', 'Vehemently', 'Stridently', 'Loudly'],
    antonyms: ['Quietly', 'Silently', 'Mildly', 'Faintly'],
    example: 'The students vociferously protested against the unfair delay in exam results.',
    mnemonic: 'Vocal + Ferocious -> Bahut loud aur forceful aawaz me bolna.',
    frequency: 'Very High',
    examTags: ['SSC CGL', 'IBPS PO', 'CDS'],
    collocation: 'Protest / Object / Deny vociferously',
    derivatives: 'Vociferous (adjective), Vociferousness (noun)'
  },
  {
    id: 'v27',
    word: 'Exonerate',
    phonetic: '/ɪɡˈzɒn.ə.reɪt/',
    hindi: 'दोषमुक्त करना / बेगुनाह साबित करना',
    type: 'word',
    partOfSpeech: 'Verb',
    meaning: 'Absolve someone from blame for a fault or wrongdoing.',
    synonyms: ['Acquit', 'Absolve', 'Vindicate', 'Exculpate', 'Clear'],
    antonyms: ['Inculpate', 'Convict', 'Blame', 'Criminate'],
    example: 'Fresh DNA evidence emerged to exonerate the man after five years in prison.',
    mnemonic: 'Ex (Exit/Out) + Onus (Burden of blame) -> Blame ke bojh se mukt karna.',
    frequency: 'Repeated',
    examTags: ['SSC CGL', 'CHSL', 'CPO'],
    collocation: 'Exonerate someone from all charges / blame',
    derivatives: 'Exoneration (noun)'
  },
  {
    id: 'v28',
    word: 'Aberration',
    phonetic: '/ˌæb.əˈreɪ.ʃən/',
    hindi: 'विचलन / असामान्यता / सामान्य पथ से भटकाव',
    type: 'word',
    partOfSpeech: 'Noun',
    meaning: 'A departure from what is normal, usual, or expected, typically an unwelcome one.',
    synonyms: ['Anomaly', 'Deviation', 'Divergence', 'Eccentricity', 'Peculiarity'],
    antonyms: ['Normality', 'Conformity', 'Regularity', 'Standard'],
    example: 'The sudden spike in inflation was deemed a seasonal aberration by economists.',
    mnemonic: 'Ab + Err (Error) + ation -> Error or deviation from normal pattern.',
    frequency: 'Very High',
    examTags: ['SSC CGL', 'Banking', 'CAT'],
    collocation: 'Temporary aberration, Mental aberration',
    derivatives: 'Aberrant (adjective)'
  },
  {
    id: 'v29',
    word: 'Scrupulously',
    phonetic: '/ˈskruː.pjə.ləs.li/',
    hindi: 'अत्यंत ईमानदारी व सावधानी से',
    type: 'word',
    partOfSpeech: 'Adverb',
    meaning: 'In a very careful, thorough, and conscientious manner; with moral integrity.',
    synonyms: ['Conscientiously', 'Meticulously', 'Punctiliously', 'Painstakingly'],
    antonyms: ['Dishonestly', 'Carelessly', 'Negligently', 'Corruptly'],
    example: 'The election commission scrupulously followed every security protocol during voting.',
    mnemonic: 'Scruple means moral doubt -> Scrupulous person never acts dishonestly.',
    frequency: 'Repeated',
    examTags: ['SSC CGL', 'Banking', 'CHSL'],
    collocation: 'Scrupulously honest / fair / clean / observed',
    derivatives: 'Scrupulous (adjective), Scrupulousness (noun)'
  },
  {
    id: 'v30',
    word: 'Cacophony',
    phonetic: '/kəˈkɒf.ə.ni/',
    hindi: 'कर्णकटु ध्वनि / भारी कोलाहल',
    type: 'word',
    partOfSpeech: 'Noun',
    meaning: 'A harsh, discordant mixture of sounds.',
    synonyms: ['Dissonance', 'Din', 'Clamor', 'Racket', 'Discord'],
    antonyms: ['Euphony', 'Harmony', 'Melody', 'Symphony'],
    example: 'As soon as the factory siren sounded, a cacophony of engines filled the air.',
    mnemonic: 'Caco (Harsh/Bad) + Phone (Sound) -> Bad, jarring noise.',
    frequency: 'Very High',
    examTags: ['SSC CGL', 'CHSL', 'NDA'],
    collocation: 'A cacophony of car horns / alarms',
    derivatives: 'Cacophonous (adjective)'
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
  const [vocabTypeFilter, setVocabTypeFilter] = useState<'all' | 'word' | 'ows' | 'idiom' | 'root'>('all');
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

  const filteredVocab = useMemo(() => {
    return DEFAULT_VOCAB_DATA.filter(item => {
      const matchesType = vocabTypeFilter === 'all' || item.type === vocabTypeFilter;
      const q = vocabSearch.toLowerCase().trim();
      const matchesSearch = !q ||
        item.word.toLowerCase().includes(q) ||
        item.hindi.toLowerCase().includes(q) ||
        item.meaning.toLowerCase().includes(q) ||
        item.partOfSpeech.toLowerCase().includes(q) ||
        (item.collocation && item.collocation.toLowerCase().includes(q)) ||
        (item.derivatives && item.derivatives.toLowerCase().includes(q)) ||
        item.synonyms.some(s => s.toLowerCase().includes(q));
      return matchesType && matchesSearch;
    });
  }, [vocabSearch, vocabTypeFilter]);

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
                { id: 'all', label: 'All Words' },
                { id: 'word', label: 'High-Yield' },
                { id: 'ows', label: 'OWS (One Word)' },
                { id: 'idiom', label: 'Idioms & Phrases' },
                { id: 'root', label: 'Root Words' }
              ].map(f => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setVocabTypeFilter(f.id as any);
                    setActiveCardIndex(0);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    vocabTypeFilter === f.id
                      ? 'bg-amber-500 text-slate-950 shadow-xs font-black'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/[0.05] border border-transparent'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Mastered Counter */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold shrink-0">
              <CheckCircle2 className="w-4 h-4" />
              <span>{masteredVocabIds.size} Mastered</span>
            </div>
          </div>

          {/* Flashcard Active Recall Spotlight */}
          {currentFlashcard ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              
              {/* Left 7 Columns: Interactive 3D Flashcard */}
              <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0E101B] border-2 border-amber-500/30 dark:border-amber-500/20 shadow-md relative overflow-hidden min-h-[360px]">
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-slate-100 dark:bg-white/[0.08] text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 font-mono">
                      Card {activeCardIndex + 1} of {filteredVocab.length}
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full bg-amber-500/10">
                      {currentFlashcard.frequency} Frequency
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleMastered(currentFlashcard.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
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
                <div className="py-6 space-y-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                        {currentFlashcard.word}
                      </h2>
                      {/* Part of Speech attached directly to the Word */}
                      <span className={`px-2.5 py-1 rounded-xl text-xs font-bold uppercase tracking-wider border font-mono ${getPosBadgeColor(currentFlashcard.partOfSpeech)}`}>
                        {currentFlashcard.partOfSpeech}
                      </span>
                      <button
                        type="button"
                        onClick={() => speakWord(currentFlashcard.word)}
                        title="Pronounce word"
                        className="p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30 transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-2xs"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm font-mono text-amber-600 dark:text-amber-400 mt-1">
                      {currentFlashcard.phonetic} • <span className="font-sans font-bold">{currentFlashcard.hindi}</span>
                    </p>
                  </div>

                  {/* Toggle Flip to Reveal Meaning / Example */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#151726] border border-slate-200/80 dark:border-white/[0.08] space-y-3">
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
                        <RotateCw className="w-3 h-3" />
                        <span>{isCardFlipped ? 'Hide Details' : 'Flip to Reveal'}</span>
                      </button>
                    </div>

                    <p className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                      {currentFlashcard.meaning}
                    </p>

                    {isCardFlipped && (
                      <div className="space-y-3 pt-3 border-t border-slate-200/70 dark:border-white/10 animate-fade-in text-xs sm:text-sm">
                        {/* Synonyms & Antonyms */}
                        <div className="space-y-1.5">
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
                        <div className="p-2.5 rounded-xl bg-amber-500/5 dark:bg-amber-500/[0.04] border-l-2 border-amber-500 text-xs italic text-slate-700 dark:text-slate-300">
                          "{currentFlashcard.example}"
                        </div>

                        {/* Mnemonic Trick */}
                        <div className="text-xs text-purple-700 dark:text-purple-300 font-medium bg-purple-500/10 p-2.5 rounded-xl">
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

                  <div className="flex items-center gap-1">
                    {currentFlashcard.examTags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-200/80 dark:bg-white/10 text-slate-700 dark:text-slate-300">
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

              {/* Right 5 Columns: Word Bank Quick Browser */}
              <div className="lg:col-span-5 p-5 rounded-3xl bg-white dark:bg-[#0E101B] border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/10">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Layers className="w-4 h-4 text-amber-500" />
                      <span>Vocabulary Explorer</span>
                    </h3>
                    <span className="text-xs text-slate-400 font-mono">
                      {filteredVocab.length} Available
                    </span>
                  </div>

                  <div className="divide-y divide-slate-100 dark:divide-white/[0.06] overflow-y-auto max-h-[380px] no-scrollbar mt-2">
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
                          className={`p-3 rounded-xl transition-all cursor-pointer flex items-center justify-between gap-3 ${
                            isSelected
                              ? 'bg-amber-500/10 dark:bg-amber-500/15 border-l-4 border-amber-500'
                              : 'hover:bg-slate-50 dark:hover:bg-white/[0.03]'
                          }`}
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-slate-900 dark:text-white truncate">
                                {item.word}
                              </span>
                              {isMastered && (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              )}
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                              {item.hindi}
                            </p>
                          </div>

                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border shrink-0 uppercase ${getPosBadgeColor(item.partOfSpeech)}`}>
                            {item.partOfSpeech.replace(' (OWS)', '').replace(' / Root', '').replace(' / Adj', '')}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-800 dark:text-amber-300 text-xs leading-relaxed border border-amber-500/20">
                  🎯 <strong>Pro Tip:</strong> Active recall by guessing the meaning before clicking "Flip" increases long-term memory retention by 300%.
                </div>
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
