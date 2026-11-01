export interface FixedPrepPartAItem {
  id: string;
  word: string;
  preposition: string;
  phrase: string;
  category: 'verb' | 'adjective' | 'noun';
  hindiMeaning: string;
  subMeaningEng?: string;
  subMeaningHindi?: string;
  example: string;
}

export interface FixedPrepPartACluster {
  id: string;
  preposition: 'FROM' | 'OF' | 'WITH' | 'TO' | 'AT';
  title: string;
  hindiTitle: string;
  conceptRule: string;
  colorScheme: {
    badge: string;
    border: string;
    bg: string;
    accent: string;
  };
  items: FixedPrepPartAItem[];
}

export interface FixedPrepPartBItem {
  id: string;
  word: string;
  preposition: string;
  category: 'verb' | 'adjective' | 'noun';
  hindiMeaning: string;
  englishMeaning: string;
  example: string;
  note?: string;
}

export interface FixedPrepPartBGroup {
  preposition: 'TO' | 'OF' | 'FOR' | 'FROM' | 'ON' | 'IN' | 'WITH';
  title: string;
  hindiTitle: string;
  description: string;
  items: FixedPrepPartBItem[];
}

// ═══════════════════════════════════════════════════════════════════
// PART - A: COLLECTION OF FIXED PREPOSITIONS BASED ON MEANING
// ═══════════════════════════════════════════════════════════════════
export const PART_A_CLUSTERS: FixedPrepPartACluster[] = [
  // ── 1. 'FROM' CLUSTER ──────────────────────────────────────────
  {
    id: 'cluster-from-prevention',
    preposition: 'FROM',
    title: 'Prevention, Prohibition, Restraint & Release',
    hindiTitle: 'रोकने, परहेज करने, मुक्ति व बरी करने वाले शब्द',
    conceptRule: 'किसी कार्य से रोकना (Prevent, Prohibit, Deter, Abstain) या किसी दायित्व/कैद से मुक्त करना (Release, Discharge, Absolve, Exempt) हमेशा "FROM" लेता है।',
    colorScheme: {
      badge: 'bg-rose-500 text-white',
      border: 'border-rose-500/30',
      bg: 'bg-rose-500/10 dark:bg-rose-500/15',
      accent: 'text-rose-600 dark:text-rose-400'
    },
    items: [
      {
        id: 'pa-prevent-from',
        word: 'Prevent',
        preposition: 'from',
        phrase: 'Prevent from',
        category: 'verb',
        hindiMeaning: 'रोकना / बाधा डालना',
        subMeaningEng: 'To stop something from happening or someone from doing something',
        example: 'The police tried to prevent him from running away.'
      },
      {
        id: 'pa-refrain-from',
        word: 'Refrain',
        preposition: 'from',
        phrase: 'Refrain from',
        category: 'verb',
        hindiMeaning: 'परहेज करना / बचना (विशेषतः आदत या व्यवहार से)',
        subMeaningEng: 'Please stop yourself from doing something',
        example: 'Please refrain from talking during the lecture.'
      },
      {
        id: 'pa-prohibit-from',
        word: 'Prohibit',
        preposition: 'from',
        phrase: 'Prohibit from',
        category: 'verb',
        hindiMeaning: 'कानूनन निषेध करना / पाबंदी लगाना',
        subMeaningEng: 'Officially forbid something by law or regulation',
        example: 'Heavy vehicles are prohibited from entering the city before 11pm.'
      },
      {
        id: 'pa-abstain-from',
        word: 'Abstain',
        preposition: 'from',
        phrase: 'Abstain from',
        category: 'verb',
        hindiMeaning: 'परहेज करना / दूर रहना (शराब, मतदान या बुरी लत से)',
        subMeaningEng: 'Formally choose not to do or consume something',
        example: 'He took a vow to abstain from alcohol.'
      },
      {
        id: 'pa-deter-from',
        word: 'Deter',
        preposition: 'from',
        phrase: 'Deter from',
        category: 'verb',
        hindiMeaning: 'हतोत्साहित करके रोकना',
        subMeaningEng: 'Discourage someone from taking a specific course of action',
        example: 'High prices are deterring many young people from buying houses.'
      },
      {
        id: 'pa-debar-from',
        word: 'Debar',
        preposition: 'from',
        phrase: 'Debar from',
        category: 'verb',
        hindiMeaning: 'बेदखल करना / निष्कासित करना',
        subMeaningEng: 'Officially exclude someone from participating or entering',
        example: 'He was debarred from the club for his unacceptable behaviour.'
      },
      {
        id: 'pa-desist-from',
        word: 'Desist',
        preposition: 'from',
        phrase: 'Desist from',
        category: 'verb',
        hindiMeaning: 'बाज आना / बंद कर देना',
        subMeaningEng: 'Stop doing an objectionable activity, often by court order',
        example: 'The document from the court orders the magazine to desist from publishing false stories about the actor.'
      },
      {
        id: 'pa-stop-from',
        word: 'Stop',
        preposition: 'from',
        phrase: 'Stop from',
        category: 'verb',
        hindiMeaning: 'रोकना / आगे बढ़ने से रोकना',
        subMeaningEng: 'Prevent progress or passage',
        example: "They've put the barriers up to stop people from getting through."
      },
      {
        id: 'pa-absolve-from',
        word: 'Absolve',
        preposition: 'from',
        phrase: 'Absolve from/of',
        category: 'verb',
        hindiMeaning: 'दोषमुक्त करना / पाप या जिम्मेदारी से मुक्त करना',
        subMeaningEng: 'Declare someone free from blame, guilt, or obligation',
        example: 'The report absolved her from/of the blame for the accident.'
      },
      {
        id: 'pa-exonerate-from',
        word: 'Exonerate',
        preposition: 'from',
        phrase: 'Exonerate from',
        category: 'verb',
        hindiMeaning: 'आरोपमुक्त करना / बरी करना',
        subMeaningEng: 'Officially absolve from blame or criminal charge',
        example: 'The report exonerated the crew from the responsibility for the collision.'
      },
      {
        id: 'pa-emancipate-from',
        word: 'Emancipate',
        preposition: 'from',
        phrase: 'Emancipate from',
        category: 'verb',
        hindiMeaning: 'बंधनमुक्त करना / गुलामी से आज़ाद करना',
        subMeaningEng: 'Free from legal, social, or political restraint',
        example: 'They felt that they had been emancipated from their father’s control.'
      },
      {
        id: 'pa-discharge-from',
        word: 'Discharge',
        preposition: 'from',
        phrase: 'Discharge from',
        category: 'verb',
        hindiMeaning: 'छुट्टी देना (अस्पताल, सेना या ड्यूटी से)',
        subMeaningEng: 'Allow someone officially to leave hospital or duty',
        example: 'He was discharged from the hospital after treatment.'
      },
      {
        id: 'pa-dismiss-from',
        word: 'Dismiss',
        preposition: 'from',
        phrase: 'Dismiss from',
        category: 'verb',
        hindiMeaning: 'नौकरी से बर्खास्त करना / पद से हटाना',
        subMeaningEng: 'Remove someone from employment or office',
        example: 'He has been dismissed from his job for incompetence.'
      },
      {
        id: 'pa-liberate-from',
        word: 'Liberate',
        preposition: 'from',
        phrase: 'Liberate from',
        category: 'verb',
        hindiMeaning: 'स्वतंत्र करना / दमनकारी सत्ता से आज़ाद करना',
        subMeaningEng: 'Set free from enemy occupation or autocratic dictator',
        example: 'They said they would send the troops to liberate the people from the dictator.'
      },
      {
        id: 'pa-release-from',
        word: 'Release',
        preposition: 'from',
        phrase: 'Release from',
        category: 'verb',
        hindiMeaning: 'जेल या कैद से रिहा करना',
        subMeaningEng: 'Set free from prison or custody',
        example: 'He was released from prison after serving a five year sentence.'
      },
      {
        id: 'pa-exculpate-from',
        word: 'Exculpate',
        preposition: 'from',
        phrase: 'Exculpate from',
        category: 'verb',
        hindiMeaning: 'निर्दोष सिद्ध करना / दायित्व से मुक्त करना',
        subMeaningEng: 'Show that someone is innocent or free of legal liability',
        example: 'The defendant was able to exculpate himself from liability.'
      },
      {
        id: 'pa-exempt-from',
        word: 'Exempt',
        preposition: 'from',
        phrase: 'Exempt from',
        category: 'adjective',
        hindiMeaning: 'छूट प्राप्त / कर या नियम से मुक्त',
        subMeaningEng: 'Free from an obligation or liability imposed on others',
        example: 'Small businesses have been exempted from the tax increase.'
      },
      {
        id: 'pa-exclude-from',
        word: 'Exclude',
        preposition: 'from',
        phrase: 'Exclude from',
        category: 'verb',
        hindiMeaning: 'बाहर रखना / शामिल न करना',
        subMeaningEng: 'Deny access or membership to someone',
        example: 'Women are still excluded from the club.'
      },
      {
        id: 'pa-protect-from',
        word: 'Protect',
        preposition: 'from',
        phrase: 'Protect from',
        category: 'verb',
        hindiMeaning: 'हानि या खतरे से सुरक्षा करना',
        subMeaningEng: 'Keep safe from damage, harm, or danger',
        example: "It's important to protect your skin from the harmful rays of the sun."
      }
    ]
  },

  // ── 2. 'OF' CLUSTERS (Awareness & Deprivation) ─────────────────
  {
    id: 'cluster-of-awareness',
    preposition: 'OF',
    title: 'Awareness, Knowledge & Certainty',
    hindiTitle: 'जागरूकता, संज्ञान, जानकारी व निश्चितता',
    conceptRule: 'सचेत होने (Conscious, Mindful, Cognizant) या अवगत कराने (Apprise, Inform, Abreast) वाले शब्द हमेशा "OF" लेते हैं।',
    colorScheme: {
      badge: 'bg-amber-500 text-slate-950 font-bold',
      border: 'border-amber-500/30',
      bg: 'bg-amber-500/10 dark:bg-amber-500/15',
      accent: 'text-amber-600 dark:text-amber-400'
    },
    items: [
      {
        id: 'pa-abreast-of',
        word: 'Abreast',
        preposition: 'of',
        phrase: 'Abreast of',
        category: 'adjective',
        hindiMeaning: 'ताज़ा जानकारी से अवगत रहना',
        subMeaningEng: 'To keep up to date with new developments',
        example: 'I like to keep abreast of current affairs daily.'
      },
      {
        id: 'pa-apprise-of',
        word: 'Apprise',
        preposition: 'of',
        phrase: 'Apprise of',
        category: 'verb',
        hindiMeaning: 'अवगत कराना / सूचित करना',
        subMeaningEng: 'To officially notify or inform someone',
        example: 'We were fully apprised of the situation.'
      },
      {
        id: 'pa-inform-of',
        word: 'Inform',
        preposition: 'of',
        phrase: 'Inform of/about',
        category: 'verb',
        hindiMeaning: 'जानकारी देना / सूचना देना',
        subMeaningEng: 'To give facts or notification',
        example: 'The school promised to keep parents informed of/about the situation.'
      },
      {
        id: 'pa-cognizant-of',
        word: 'Cognizant',
        preposition: 'of',
        phrase: 'Cognizant of',
        category: 'adjective',
        hindiMeaning: 'संज्ञान में होना / अवगत होना',
        subMeaningEng: 'Having clear knowledge or awareness',
        example: 'We should be cognizant of the fact that every complaint is not a justified complaint.'
      },
      {
        id: 'pa-conscious-of',
        word: 'Conscious',
        preposition: 'of',
        phrase: 'Conscious of',
        category: 'adjective',
        hindiMeaning: 'सचेत / जागरूक होना',
        subMeaningEng: 'Aware of and responding to reality',
        example: 'Eventually he became conscious of the fact that his friends were making fun of him.'
      },
      {
        id: 'pa-mindful-of',
        word: 'Mindful',
        preposition: 'of',
        phrase: 'Mindful of',
        category: 'adjective',
        hindiMeaning: 'ध्यान में रखते हुए / सतर्क',
        subMeaningEng: 'Keeping something in mind before acting',
        example: 'Mindful of the poor road conditions, Sonali reduced her speed to 30 mph.'
      },
      {
        id: 'pa-observant-of',
        word: 'Observant',
        preposition: 'of',
        phrase: 'Observant of',
        category: 'adjective',
        hindiMeaning: 'पैनी नज़र रखने वाला / सूक्ष्मदर्शी',
        subMeaningEng: 'Quick to notice surrounding conditions',
        example: 'He was acutely observant of the poverty around him.'
      },
      {
        id: 'pa-sure-of',
        word: 'Sure',
        preposition: 'of',
        phrase: 'Sure of/about',
        category: 'adjective',
        hindiMeaning: 'पक्का यकीन होना / आश्वस्त होना',
        subMeaningEng: 'Completely confident without doubt',
        example: 'We arrive early to be sure of getting a good seat.'
      },
      {
        id: 'pa-certain-of',
        word: 'Certain',
        preposition: 'of',
        phrase: 'Certain of/about',
        category: 'adjective',
        hindiMeaning: 'निश्चित होना / पक्का ज्ञात होना',
        subMeaningEng: 'Firmly convinced of the truth',
        example: "He was quite certain about/of his attacker's identity."
      },
      {
        id: 'pa-hopeful-of',
        word: 'Hopeful',
        preposition: 'of',
        phrase: 'Hopeful of',
        category: 'adjective',
        hindiMeaning: 'आशावान / उम्मीद रखने वाला',
        subMeaningEng: 'Feeling positive expectation (of doing sth)',
        example: "His audition went well and he's fairly hopeful of getting the part."
      },
      {
        id: 'pa-assure-of',
        word: 'Assure',
        preposition: 'of',
        phrase: 'Assure of',
        category: 'verb',
        hindiMeaning: 'भरोसा दिलाना / आश्वस्त करना',
        subMeaningEng: 'To dispel doubt and guarantee loyalty or success',
        example: 'The union assured the new owners of the workers’ loyalty to the company.'
      }
    ]
  },
  {
    id: 'cluster-of-deprivation',
    preposition: 'OF',
    title: 'Deprivation, Lack, Shortage & Loss',
    hindiTitle: 'कमी, अभाव, वंचित करने व लूटने वाले शब्द',
    conceptRule: 'किसी वस्तु, अधिकार या भावना की कमी (Lack, Void, Dearth, Paucity) या उसे छीन लेने (Deprive, Divest, Rob, Strip) वाले शब्द "OF" लेते हैं।',
    colorScheme: {
      badge: 'bg-amber-600 text-white font-bold',
      border: 'border-amber-600/30',
      bg: 'bg-amber-600/10 dark:bg-amber-600/15',
      accent: 'text-amber-700 dark:text-amber-300'
    },
    items: [
      {
        id: 'pa-bereft-of',
        word: 'Bereft',
        preposition: 'of',
        phrase: 'Bereft of',
        category: 'adjective',
        hindiMeaning: 'वंचित / विहीन (उम्मीद या भावना से खाली)',
        subMeaningEng: 'Completely lacking or denied hope or feeling',
        example: 'He was bereft of hope when he got fired from his job.'
      },
      {
        id: 'pa-deprive-of',
        word: 'Deprive',
        preposition: 'of',
        phrase: 'Deprive of',
        category: 'verb',
        hindiMeaning: 'अधिकारों या स्वतंत्रता से वंचित करना',
        subMeaningEng: 'To deny possession or rights',
        example: 'He claimed that he had been deprived of his freedom/rights.'
      },
      {
        id: 'pa-devoid-of',
        word: 'Devoid',
        preposition: 'of',
        phrase: 'Devoid of',
        category: 'adjective',
        hindiMeaning: 'बिल्कुल शून्य / पूर्णतः रहित',
        subMeaningEng: 'Entirely without or empty of feeling',
        example: 'He seems to be devoid of any feeling for his ex girlfriend.'
      },
      {
        id: 'pa-divest-of',
        word: 'Divest',
        preposition: 'of',
        phrase: 'Divest of',
        category: 'verb',
        hindiMeaning: 'पद, अधिकार या जिम्मेदारी से मुक्त/वंचित करना',
        subMeaningEng: 'To strip someone of powers or obligations',
        example: 'Owing to her careless behaviour, she was divested of her responsibilities.'
      },
      {
        id: 'pa-destitute-of',
        word: 'Destitute',
        preposition: 'of',
        phrase: 'Destitute of',
        category: 'adjective',
        hindiMeaning: 'नितांत अभावग्रस्त / भावना से विहीन',
        subMeaningEng: 'Completely lacking moral or financial support',
        example: 'They seem destitute of ordinary human feelings.'
      },
      {
        id: 'pa-empty-of',
        word: 'Empty',
        preposition: 'of',
        phrase: 'Empty of',
        category: 'adjective',
        hindiMeaning: 'सामान या लोगों से खाली',
        subMeaningEng: 'Containing nothing inside',
        example: 'Our newly bought house is empty of furniture.'
      },
      {
        id: 'pa-lack-of',
        word: 'Lack',
        preposition: 'of',
        phrase: 'Lack of',
        category: 'noun',
        hindiMeaning: 'कमी / अभाव',
        subMeaningEng: 'Absence or insufficiency of a quality',
        example: 'He was suffering from a complete lack of confidence.'
      },
      {
        id: 'pa-short-of',
        word: 'Short',
        preposition: 'of',
        phrase: 'Short of',
        category: 'adjective',
        hindiMeaning: 'कम पड़ना / कमी होना',
        subMeaningEng: 'Not having enough of excuses or resources',
        example: 'She is not short of excuses when things go wrong.'
      },
      {
        id: 'pa-void-of',
        word: 'Void',
        preposition: 'of',
        phrase: 'Void of',
        category: 'adjective',
        hindiMeaning: 'शून्य / रहित',
        subMeaningEng: 'Completely empty of substance',
        example: 'The sky was void of stars yesterday.'
      },
      {
        id: 'pa-deficiency-of',
        word: 'Deficiency',
        preposition: 'of',
        phrase: 'Deficiency of',
        category: 'noun',
        hindiMeaning: 'पोषक तत्व या विटामिन की कमी',
        subMeaningEng: 'Inadequate supply of necessary substance',
        example: 'There is a deficiency of vitamin B12 in your body.'
      },
      {
        id: 'pa-shortage-of',
        word: 'Shortage',
        preposition: 'of',
        phrase: 'Shortage of',
        category: 'noun',
        hindiMeaning: 'किल्लत / भारी कमी',
        subMeaningEng: 'Deficit in available quantity',
        example: 'There is no shortage of books in our library for a diligent student.'
      },
      {
        id: 'pa-paucity-of',
        word: 'Paucity',
        preposition: 'of',
        phrase: 'Paucity of',
        category: 'noun',
        hindiMeaning: 'अल्पता / अपर्याप्तता',
        subMeaningEng: 'Presence in extremely small, insufficient amounts',
        example: 'There is a paucity of medicines in most of the government hospitals.'
      },
      {
        id: 'pa-despoil-of',
        word: 'Despoil',
        preposition: 'of',
        phrase: 'Despoil of',
        category: 'verb',
        hindiMeaning: 'लूट लेना / सब कुछ छीन लेना',
        subMeaningEng: 'Violently rob and strip someone of possessions',
        example: 'The thief despoiled the old man of his belongings.'
      },
      {
        id: 'pa-rob-of',
        word: 'Rob',
        preposition: 'of',
        phrase: 'Rob of',
        category: 'verb',
        hindiMeaning: 'धन या संपत्ति लूट लेना',
        subMeaningEng: 'Take property unlawfully with force',
        example: 'They robbed the company of $2 million.'
      },
      {
        id: 'pa-strip-of',
        word: 'Strip',
        preposition: 'of',
        phrase: 'Strip of',
        category: 'verb',
        hindiMeaning: 'अधिकार या पद पूरी तरह छीन लेना',
        subMeaningEng: 'Divest of authority, title, or clothes',
        example: 'The corrupt IAS officer has been completely stripped of power.'
      },
      {
        id: 'pa-dearth-of',
        word: 'Dearth',
        preposition: 'of',
        phrase: 'Dearth of',
        category: 'noun',
        hindiMeaning: 'अकाल / प्रतिभा या आपूर्ति की भारी कमी',
        subMeaningEng: 'Severe scarcity or lack of something',
        example: 'Human Resources managers complain that there is a dearth of talented candidates.'
      }
    ]
  },

  // ── 3. 'WITH' CLUSTERS (Full, Crowded & Endowed) ───────────────
  {
    id: 'cluster-with-fullness',
    preposition: 'WITH',
    title: 'Full, Crowded, Overwhelmed & Endowed',
    hindiTitle: 'भरा हुआ, खचाखच, बोझिल व संपन्न होने वाले शब्द',
    conceptRule: 'किसी वस्तु या भावना से भरपूर होना (Filled, Loaded, Replete), भीड़ या बाधाओं से भरा होना (Crowded, Thronged, Infested, Beset), अथवा प्राकृतिक वरदान पाना (Endowed, Gifted) हमेशा "WITH" लेता है।',
    colorScheme: {
      badge: 'bg-purple-500 text-white',
      border: 'border-purple-500/30',
      bg: 'bg-purple-500/10 dark:bg-purple-500/15',
      accent: 'text-purple-600 dark:text-purple-400'
    },
    items: [
      {
        id: 'pa-loaded-with',
        word: 'Loaded',
        preposition: 'with',
        phrase: 'Loaded with',
        category: 'adjective',
        hindiMeaning: 'लदा हुआ / भारी मात्रा में भरा',
        example: 'The truck was loaded with potatoes.'
      },
      {
        id: 'pa-overwhelmed-with',
        word: 'Overwhelmed',
        preposition: 'with',
        phrase: 'Overwhelmed with',
        category: 'adjective',
        hindiMeaning: 'भावनाओं या दुख से अत्यधिक प्रभावित',
        example: 'They were overwhelmed with grief when their baby died.'
      },
      {
        id: 'pa-replete-with',
        word: 'Replete',
        preposition: 'with',
        phrase: 'Replete with',
        category: 'adjective',
        hindiMeaning: 'परिपूर्ण / अच्छी तरह भरा हुआ',
        example: 'The harbor was replete with boats.'
      },
      {
        id: 'pa-beset-with',
        word: 'Beset',
        preposition: 'with',
        phrase: 'Beset with/by',
        category: 'adjective',
        hindiMeaning: 'कठिनाइयों या समस्याओं से घिरा हुआ',
        example: 'The plan was beset with/by difficulties from the beginning.'
      },
      {
        id: 'pa-filled-with',
        word: 'Filled',
        preposition: 'with',
        phrase: 'Filled with',
        category: 'adjective',
        hindiMeaning: 'से भरा हुआ',
        example: 'The bags were filled with household waste.'
      },
      {
        id: 'pa-infested-with',
        word: 'Infested',
        preposition: 'with',
        phrase: 'Infested with',
        category: 'adjective',
        hindiMeaning: 'कीड़े-मकोड़ों या परजीवियों से भरा हुआ',
        example: 'When we first moved in, the apartment was infested with cockroaches.'
      },
      {
        id: 'pa-thronged-with',
        word: 'Thronged',
        preposition: 'with',
        phrase: 'Thronged with',
        category: 'adjective',
        hindiMeaning: 'भीड़ से खचाखच भरा हुआ',
        example: 'The streets were thronged with tourists on the new year eve.'
      },
      {
        id: 'pa-crowded-with',
        word: 'Crowded',
        preposition: 'with',
        phrase: 'Crowded with',
        category: 'adjective',
        hindiMeaning: 'सामान या लोगों से भरा हुआ',
        example: 'The room was crowded with small pieces of furniture, cupboards, and little tables.'
      },
      {
        id: 'pa-congested-with',
        word: 'Congested',
        preposition: 'with',
        phrase: 'Congested with',
        category: 'adjective',
        hindiMeaning: 'वाहनों के जाम से भरा हुआ',
        example: 'The city streets were congested with vehicles.'
      },
      {
        id: 'pa-occupied-with',
        word: 'Occupied',
        preposition: 'with',
        phrase: 'Occupied with',
        category: 'adjective',
        hindiMeaning: 'काम में पूरी तरह व्यस्त / मग्न',
        example: "She was occupied with her work and didn't notice the time."
      },
      {
        id: 'pa-deluged-with',
        word: 'Deluged',
        preposition: 'with',
        phrase: 'Deluged with',
        category: 'adjective',
        hindiMeaning: 'आवेदनों या पत्रों की बाढ़ आ जाना',
        example: 'Our office was deluged with applications as soon as we posted a job vacany.'
      },
      {
        id: 'pa-swamped-with',
        word: 'Swamped',
        preposition: 'with',
        phrase: 'Swamped with',
        category: 'adjective',
        hindiMeaning: 'काम या दावों के नीचे दब जाना',
        example: 'After the severe storms, insurance companies were swamped with claims.'
      },
      {
        id: 'pa-inundated-with',
        word: 'Inundated',
        preposition: 'with',
        phrase: 'Inundated with',
        category: 'adjective',
        hindiMeaning: 'प्रश्नों या संदेशों की बाढ़ आ जाना',
        example: 'I have been inundated with queries regarding Error Pro.'
      },
      {
        id: 'pa-brimmed-with',
        word: 'Brimmed',
        preposition: 'with',
        phrase: 'Brimmed with',
        category: 'verb',
        hindiMeaning: 'आँसुओं या खुशी से लबालब भर जाना',
        example: 'Her eyes brimmed with tears when she heard that he was alive.'
      },
      {
        id: 'pa-teeming-with',
        word: 'Teeming',
        preposition: 'with',
        phrase: 'Teeming with',
        category: 'adjective',
        hindiMeaning: 'उमड़ता हुआ / भारी संख्या में भरा',
        example: 'The mall was teeming with shoppers yesterday.'
      },
      {
        id: 'pa-endowed-with',
        word: 'Endowed',
        preposition: 'with',
        phrase: 'Endowed with',
        category: 'adjective',
        hindiMeaning: 'बुद्धि, ज्ञान या प्राकृतिक गुणों से संपन्न',
        example: 'Dr. Kalam was endowed with great wisdom.'
      },
      {
        id: 'pa-gifted-with',
        word: 'Gifted',
        preposition: 'with',
        phrase: 'Gifted with',
        category: 'adjective',
        hindiMeaning: 'जन्मजात प्रतिभा या मुस्कान से युक्त',
        example: 'Nora fatehi is gifted with a charming smile.'
      },
      {
        id: 'pa-burdened-with',
        word: 'Burdened',
        preposition: 'with',
        phrase: 'Burdened with',
        category: 'adjective',
        hindiMeaning: 'जिम्मेदारियों के बोझ से दबा हुआ',
        example: 'They were not yet burdened with adult responsibility'
      }
    ]
  },

  // ── 4. 'TO' CLUSTERS (Similarity, Harm, Benefit, Devotion) ─────
  {
    id: 'cluster-to-meanings',
    preposition: 'TO',
    title: 'Similarity, Harm, Benefit, Consent & Loyalty',
    hindiTitle: 'समानता, हानिकारक, लाभदायक, सहमति व समर्पण',
    conceptRule: 'समानता (Equal, Similar, Akin, Tantamount), नुकसान (Harmful, Injurious, Detrimental), लाभ (Beneficial, Conducive), सहमति (Agree, Assent, Accede), व निष्ठा (Devoted, Loyal, Dedicated) हमेशा "TO" लेते हैं।',
    colorScheme: {
      badge: 'bg-sky-500 text-white',
      border: 'border-sky-500/30',
      bg: 'bg-sky-500/10 dark:bg-sky-500/15',
      accent: 'text-sky-600 dark:text-sky-400'
    },
    items: [
      // 4A: Equality & Similarity
      {
        id: 'pa-equivalent-to',
        word: 'Equivalent',
        preposition: 'to',
        phrase: 'Equivalent to',
        category: 'adjective',
        hindiMeaning: 'के बराबर / समकक्ष',
        example: 'One mile is equivalent to about 1.6 kilometers.'
      },
      {
        id: 'pa-equal-to',
        word: 'Equal',
        preposition: 'to',
        phrase: 'Equal to',
        category: 'adjective',
        hindiMeaning: 'समान / बराबरी का',
        example: 'She received a bonus of 12000 Rs which is equal to 40% of her salary.'
      },
      {
        id: 'pa-akin-to',
        word: 'Akin',
        preposition: 'to',
        phrase: 'Akin to',
        category: 'adjective',
        hindiMeaning: 'के समान / सदृश',
        example: 'For Shruti the death of her beloved dog was akin to the death of a dear relative.'
      },
      {
        id: 'pa-likeness-to',
        word: 'Likeness',
        preposition: 'to',
        phrase: 'Likeness to',
        category: 'noun',
        hindiMeaning: 'समानता / हमशक्ल होना',
        example: 'Rajni bears a strong likeness to her father.'
      },
      {
        id: 'pa-similar-to',
        word: 'Similar',
        preposition: 'to',
        phrase: 'Similar to',
        category: 'adjective',
        hindiMeaning: 'एक जैसा / समरूप',
        example: 'I bought some new shoes which are very similar to a pair I had before.'
      },
      {
        id: 'pa-homologous-to',
        word: 'Homologous',
        preposition: 'to',
        phrase: 'Homologous to',
        category: 'adjective',
        hindiMeaning: 'सजातीय / रचना में समान',
        example: 'Because of advances in medical technology, Mohan’s artificial leg is almost homologous to his natural limb.'
      },
      {
        id: 'pa-analogous-to',
        word: 'Analogous',
        preposition: 'to',
        phrase: 'Analogous to',
        category: 'adjective',
        hindiMeaning: 'अनुरूप / सदृश',
        example: 'Sleep has often been thought of as being in some way analogous to death.'
      },
      {
        id: 'pa-identical-to',
        word: 'Identical',
        preposition: 'to',
        phrase: 'Identical to',
        category: 'adjective',
        hindiMeaning: 'हूबहू एक जैसा',
        example: 'These tests are identical to those carried out last year.'
      },
      {
        id: 'pa-close-to',
        word: 'Close',
        preposition: 'to',
        phrase: 'Close to',
        category: 'adjective',
        hindiMeaning: 'के करीब / निकट',
        example: 'Your performance is pretty close to the national record.'
      },
      {
        id: 'pa-tantamount-to',
        word: 'Tantamount',
        preposition: 'to',
        phrase: 'Tantamount to',
        category: 'adjective',
        hindiMeaning: 'के समान प्रभाव वाला / समतुल्य',
        example: 'Her refusal to answer was tantamount to an admission of guilt.'
      },
      {
        id: 'pa-related-to',
        word: 'Related',
        preposition: 'to',
        phrase: 'Related to',
        category: 'adjective',
        hindiMeaning: 'से संबंधित',
        example: 'Because diabetes is a disease related to obesity, losing weight can help you avoid insulin issues.'
      },
      {
        id: 'pa-corresponding-to',
        word: 'Corresponding',
        preposition: 'to',
        phrase: 'Corresponding to',
        category: 'adjective',
        hindiMeaning: 'के अनुरूप / मेल खाता हुआ',
        example: 'The new software update includes features corresponding to the ones you requested.'
      },
      {
        id: 'pa-allied-to',
        word: 'Allied',
        preposition: 'to',
        phrase: 'Allied with/to',
        category: 'adjective',
        hindiMeaning: 'से जुड़ा हुआ / संबद्ध',
        example: 'In this job you will need social skills allied with technical knowledge.'
      },

      // 4B: Harmful & Threatening
      {
        id: 'pa-harmful-to',
        word: 'Harmful',
        preposition: 'to',
        phrase: 'Harmful to',
        category: 'adjective',
        hindiMeaning: 'हानिकारक',
        example: 'These chemicals are harmful to people with asthma.'
      },
      {
        id: 'pa-injurious-to',
        word: 'Injurious',
        preposition: 'to',
        phrase: 'Injurious to',
        category: 'adjective',
        hindiMeaning: 'स्वास्थ्य के लिए हानिकारक',
        example: 'Too much alcohol is injurious to your health.'
      },
      {
        id: 'pa-pernicious-to',
        word: 'Pernicious',
        preposition: 'to',
        phrase: 'Pernicious to',
        category: 'adjective',
        hindiMeaning: 'घातक / विनाशकारी',
        example: 'Pollution of the water supply reached a level pernicious to the health of the population.'
      },
      {
        id: 'pa-baneful-to',
        word: 'Baneful',
        preposition: 'to',
        phrase: 'Baneful to',
        category: 'adjective',
        hindiMeaning: 'विषाक्त / प्राणघातक',
        example: 'If not cooked properly, this vegetable can be baneful to humans.'
      },
      {
        id: 'pa-detrimental-to',
        word: 'Detrimental',
        preposition: 'to',
        phrase: 'Detrimental to',
        category: 'adjective',
        hindiMeaning: 'हानिकर / नुकसानदेह',
        example: 'Their decision could be detrimental to the future of the company.'
      },
      {
        id: 'pa-threat-to',
        word: 'Threat',
        preposition: 'to',
        phrase: 'Threat to',
        category: 'noun',
        hindiMeaning: 'के लिए खतरा',
        example: 'Drunk drivers pose a serious threat to other road users.'
      },
      {
        id: 'pa-menace-to',
        word: 'Menace',
        preposition: 'to',
        phrase: 'Menace to',
        category: 'noun',
        hindiMeaning: 'उपद्रव / भारी खतरा',
        example: 'That boy is a menace to himself and his friends.'
      },
      {
        id: 'pa-inimical-to',
        word: 'Inimical',
        preposition: 'to',
        phrase: 'Inimical to',
        category: 'adjective',
        hindiMeaning: 'विरोधी / बाधक',
        example: 'Excessive managerial control is inimical to creativity.'
      },
      {
        id: 'pa-hazardous-to',
        word: 'Hazardous',
        preposition: 'to',
        phrase: 'Hazardous to',
        category: 'adjective',
        hindiMeaning: 'पर्यावरण या सेहत के लिए खतरनाक',
        example: 'Certain pesticides should be banned since they are hazardous to the environment.'
      },

      // 4C: Beneficial & Favorable
      {
        id: 'pa-beneficial-to',
        word: 'Beneficial',
        preposition: 'to',
        phrase: 'Beneficial to',
        category: 'adjective',
        hindiMeaning: 'स्वास्थ्य या कार्य के लिए लाभदायक',
        example: 'A change of place will be beneficial to his health.'
      },
      {
        id: 'pa-favorable-to',
        word: 'Favorable',
        preposition: 'to',
        phrase: 'Favorable to',
        category: 'adjective',
        hindiMeaning: 'पक्ष में / अनुकूल',
        example: 'The terms of the agreement were favourable to both the parties.'
      },
      {
        id: 'pa-essential-to',
        word: 'Essential',
        preposition: 'to',
        phrase: 'Essential for/to',
        category: 'adjective',
        hindiMeaning: 'अति आवश्यक',
        example: 'Water is essential for/to all living beings.'
      },
      {
        id: 'pa-conducive-to',
        word: 'Conducive',
        preposition: 'to',
        phrase: 'Conducive to',
        category: 'adjective',
        hindiMeaning: 'सहायक / फलदायी',
        example: 'Black soil is conducive to growing cotton.'
      },
      {
        id: 'pa-profitable-to',
        word: 'Profitable',
        preposition: 'to',
        phrase: 'Profitable to',
        category: 'adjective',
        hindiMeaning: 'फायदेमंद / लाभदायक',
        example: 'The deal was profitable to all of us.'
      },
      {
        id: 'pa-advantageous-to',
        word: 'Advantageous',
        preposition: 'to',
        phrase: 'Advantageous to',
        category: 'adjective',
        hindiMeaning: 'फायदेमंद / लाभप्रद',
        example: 'The lower tax rate is advantageous to middle class families.'
      },

      // 4D: Assent & Agreement
      {
        id: 'pa-assent-to',
        word: 'Assent',
        preposition: 'to',
        phrase: 'Assent to',
        category: 'noun',
        hindiMeaning: 'प्रस्ताव को औपचारिक सहमति',
        example: 'Once the directors give their assent to the proposal we can begin.'
      },
      {
        id: 'pa-consent-to',
        word: 'Consent',
        preposition: 'to',
        phrase: 'Consent to',
        category: 'verb',
        hindiMeaning: 'विवाह या निर्णय की अनुमति देना',
        example: "My aunt never got married because her father wouldn't consent to her marriage."
      },
      {
        id: 'pa-accede-to',
        word: 'Accede',
        preposition: 'to',
        phrase: 'Accede to',
        category: 'verb',
        hindiMeaning: 'मांगों को स्वीकार करना',
        example: 'The government acceded to the demands of the farmers.'
      },
      {
        id: 'pa-amenable-to',
        word: 'Amenable',
        preposition: 'to',
        phrase: 'Amenable to',
        category: 'adjective',
        hindiMeaning: 'बात मानने को तैयार / सहमत',
        example: 'She might be more amenable to the idea if you explained how much money it would save.'
      },
      {
        id: 'pa-agree-to',
        word: 'Agree',
        preposition: 'to',
        phrase: 'Agree to',
        category: 'verb',
        hindiMeaning: 'प्रस्ताव या योजना से सहमत होना',
        example: 'Do you think he will agree to their proposal?'
      },

      // 4E: Devotion & Loyalty
      {
        id: 'pa-true-to',
        word: 'True',
        preposition: 'to',
        phrase: 'True to',
        category: 'adjective',
        hindiMeaning: 'वफादार रहना / वचन का पक्का',
        example: 'She has vowed to remain true to the president whatever happens.'
      },
      {
        id: 'pa-obedient-to',
        word: 'Obedient',
        preposition: 'to',
        phrase: 'Obedient to',
        category: 'adjective',
        hindiMeaning: 'आज्ञाकारी',
        example: 'Citizens during ancient history were required to be obedient to the king.'
      },
      {
        id: 'pa-committed-to',
        word: 'Committed',
        preposition: 'to',
        phrase: 'Committed to',
        category: 'adjective',
        hindiMeaning: 'नेक कार्य के प्रति समर्पित',
        example: 'We are committed to this noble cause.'
      },
      {
        id: 'pa-devoted-to',
        word: 'Devoted',
        preposition: 'to',
        phrase: 'Devoted to',
        category: 'adjective',
        hindiMeaning: 'शोध या कार्य में समर्पित',
        example: 'The scientist has devoted himself to his research, and rarely comes out of his lab.'
      },
      {
        id: 'pa-faithful-to',
        word: 'Faithful',
        preposition: 'to',
        phrase: 'Faithful to',
        category: 'adjective',
        hindiMeaning: 'जीवनभर वफादार',
        example: 'He was faithful to his wife throughout their 30- year marriage.'
      },
      {
        id: 'pa-loyal-to',
        word: 'Loyal',
        preposition: 'to',
        phrase: 'Loyal to',
        category: 'adjective',
        hindiMeaning: 'नियोक्ता के प्रति निष्ठावान',
        example: 'Training programmes encourage workers to remain loyal to their employers.'
      },
      {
        id: 'pa-dutiful-to',
        word: 'Dutiful',
        preposition: 'to',
        phrase: 'Dutiful to',
        category: 'adjective',
        hindiMeaning: 'कर्तव्यपरायण',
        example: 'She was chiding her son for not being dutiful to her.'
      },
      {
        id: 'pa-dedicated-to',
        word: 'Dedicated',
        preposition: 'to',
        phrase: 'Dedicated to',
        category: 'adjective',
        hindiMeaning: 'समर्पित',
        example: 'The Green Party is dedicated to protecting the environment.'
      },

      // 4F: Vulnerability & Proneness
      {
        id: 'pa-prone-to',
        word: 'Prone',
        preposition: 'to',
        phrase: 'Prone to',
        category: 'adjective',
        hindiMeaning: 'की संभावना होना / प्रवृत्त होना (चोट आदि)',
        example: 'Fast bowlers are prone to injuries.'
      },
      {
        id: 'pa-susceptible-to',
        word: 'Susceptible',
        preposition: 'to',
        phrase: 'Susceptible to',
        category: 'adjective',
        hindiMeaning: 'रोगों के प्रति संवेदनशील / अतिसंवेदनशील',
        example: 'Owing to his high obesity level, He is Susceptible to many diseases.'
      },
      {
        id: 'pa-vulnerable-to',
        word: 'Vulnerable',
        preposition: 'to',
        phrase: 'Vulnerable to',
        category: 'adjective',
        hindiMeaning: 'असुरक्षित / शीघ्र प्रभावित होने वाला',
        example: 'People with low immunity are vulnerable to covid19.'
      },
      {
        id: 'pa-liable-to',
        word: 'Liable',
        preposition: 'to',
        phrase: 'Liable to',
        category: 'adjective',
        hindiMeaning: 'की आशंका होना',
        example: 'You are more liable to injuries if you don’t exercise.'
      },
      {
        id: 'pa-sensitive-to',
        word: 'Sensitive',
        preposition: 'to',
        phrase: 'Sensitive to',
        category: 'adjective',
        hindiMeaning: 'आलोचना के प्रति संवेदनशील',
        example: 'Her reply shows that she is very sensitive to criticism.'
      },
      {
        id: 'pa-allergic-to',
        word: 'Allergic',
        preposition: 'to',
        phrase: 'Allergic to',
        category: 'adjective',
        hindiMeaning: 'एलर्जी होना',
        example: 'Radhika is allergic to most animals, so she isn’t able to breathe well around dogs or cats'
      },
      {
        id: 'pa-immune-to',
        word: 'Immune',
        preposition: 'to',
        phrase: 'Immune to',
        category: 'adjective',
        hindiMeaning: 'रोग प्रतिरोधक क्षमता होना / असर न होना',
        example: "Most people who've had chickenpox once are immune to it for the rest of their lives."
      },

      // 4G: Introductory & Preliminary
      {
        id: 'pa-preface-to',
        word: 'Preface',
        preposition: 'to',
        phrase: 'Preface to',
        category: 'noun',
        hindiMeaning: 'पुस्तक की प्रस्तावना / भूमिका',
        example: "We're hoping these talks could be a preface to peace."
      },
      {
        id: 'pa-prelude-to',
        word: 'Prelude',
        preposition: 'to',
        phrase: 'Prelude to',
        category: 'noun',
        hindiMeaning: 'बड़े सुधारों की पूर्वपीठिका',
        example: 'The changes are seen as a prelude to wide-ranging reforms'
      },
      {
        id: 'pa-prologue-to',
        word: 'Prologue',
        preposition: 'to',
        phrase: 'Prologue to',
        category: 'noun',
        hindiMeaning: 'गृहयुद्ध की प्रस्तावना / भूमिका',
        example: 'A series of internal struggles was the prologue to full-scale civil war.'
      },
      {
        id: 'pa-introduction-to',
        word: 'Introduction',
        preposition: 'to',
        phrase: 'Introduction to',
        category: 'noun',
        hindiMeaning: 'लेख का परिचय / प्रस्तावना',
        example: 'Can you write a brief introduction to this article?'
      },

      // 4H: Relevance & Appropriateness
      {
        id: 'pa-appropriate-to',
        word: 'Appropriate',
        preposition: 'to',
        phrase: 'Appropriate to/for',
        category: 'adjective',
        hindiMeaning: 'के अनुकूल / उपयुक्त',
        example: 'The book was written in a style appropriate to the age of the children.'
      },
      {
        id: 'pa-apposite-to',
        word: 'Apposite',
        preposition: 'to',
        phrase: 'Apposite to',
        category: 'adjective',
        hindiMeaning: 'चर्चा के लिए सर्वथा उपयुक्त / प्रासंगिक',
        example: 'Her remarks are extremely apposite to the present discussion.'
      },
      {
        id: 'pa-applicable-to',
        word: 'Applicable',
        preposition: 'to',
        phrase: 'Applicable to',
        category: 'adjective',
        hindiMeaning: 'पर लागू होने वाला',
        example: 'This part of the law is only applicable to companies employing more than five people.'
      },
      {
        id: 'pa-relevant-to',
        word: 'Relevant',
        preposition: 'to',
        phrase: 'Relevant to',
        category: 'adjective',
        hindiMeaning: 'समस्या से संबंधित / प्रासंगिक',
        example: 'What you are saying is not relevant to our problem.'
      },
      {
        id: 'pa-pertinent-to',
        word: 'Pertinent',
        preposition: 'to',
        phrase: 'Pertinent to',
        category: 'adjective',
        hindiMeaning: 'मुद्दे से सटीक जुड़ा हुआ',
        example: 'This chapter is pertinent to the post 1857 revolt period.'
      },
      {
        id: 'pa-appertain-to',
        word: 'Appertain',
        preposition: 'to',
        phrase: 'Appertain to',
        category: 'verb',
        hindiMeaning: 'से संबंध रखना',
        example: 'These figures appertain to last year’s sale.'
      },
      {
        id: 'pa-germane-to',
        word: 'Germane',
        preposition: 'to',
        phrase: 'Germane to',
        category: 'adjective',
        hindiMeaning: 'विषय से पूर्णतः प्रासंगिक',
        example: 'Her remarks could not have been more germane to the discussion.'
      },
      {
        id: 'pa-pertaining-to',
        word: 'Pertaining',
        preposition: 'to',
        phrase: 'Pertaining to',
        category: 'adjective',
        hindiMeaning: 'से संबंधित',
        example: 'I need some information pertaining to adoption laws.'
      },
      {
        id: 'pa-belong-to',
        word: 'Belong',
        preposition: 'to',
        phrase: 'Belong to',
        category: 'verb',
        hindiMeaning: 'का होना / से संबंध रखना',
        example: 'Does this book belong to you or to Sarah?'
      },
      {
        id: 'pa-linked-to',
        word: 'Linked',
        preposition: 'to',
        phrase: 'Linked to',
        category: 'adjective',
        hindiMeaning: 'से जुड़ा हुआ',
        example: 'The use of CFCs is linked to the depletion of the ozone layer.'
      },
      {
        id: 'pa-accustomed-to',
        word: 'Accustomed',
        preposition: 'to',
        phrase: 'Accustomed to',
        category: 'adjective',
        hindiMeaning: 'अभ्यस्त / आदी होना',
        example: 'The wealthy woman wasn’t accustomed to preparing her own food.'
      }
    ]
  },

  // ── 5. 'AT' CLUSTERS (Surprise, Laughter, Mockery & Staring) ───
  {
    id: 'cluster-at-meanings',
    preposition: 'AT',
    title: 'Surprise, Anger, Laughter, Sneer & Stare',
    hindiTitle: 'चौंकने, हंसने, मुस्कुराने, ताकने व घूरने वाले शब्द',
    conceptRule: 'आश्चर्य (Surprised, Amazed, Shocked, Aghast), विभिन्न प्रकार की हंसी (Laugh, Chuckle, Giggle, Guffaw, Smirk, Sneer), तथा किसी दिशा में देखना या घूरना (Look, Glance, Stare, Glare, Gaze, Gape, Scowl) हमेशा "AT" लेता है।',
    colorScheme: {
      badge: 'bg-orange-500 text-white',
      border: 'border-orange-500/30',
      bg: 'bg-orange-500/10 dark:bg-orange-500/15',
      accent: 'text-orange-600 dark:text-orange-400'
    },
    items: [
      // 5A: Surprise & Shock
      {
        id: 'pa-amazed-at',
        word: 'Amazed',
        preposition: 'at',
        phrase: 'Amazed at',
        category: 'adjective',
        hindiMeaning: 'अत्यंत चकित / हैरान',
        subMeaningEng: 'Being extremely surprised or shocked',
        example: 'She was amazed at how calmly the man behaved after the accident.'
      },
      {
        id: 'pa-astonished-at',
        word: 'Astonished',
        preposition: 'at',
        phrase: 'Astonished at',
        category: 'adjective',
        hindiMeaning: 'दवा या गति पर भौचक्का होना',
        subMeaningEng: 'Greatly surprised or impressed',
        example: 'The doctors were astonished at the speed of her recovery.'
      },
      {
        id: 'pa-astounded-at',
        word: 'Astounded',
        preposition: 'at',
        phrase: 'Astounded at',
        category: 'adjective',
        hindiMeaning: 'स्तब्ध / हक्का-बक्का',
        subMeaningEng: 'Shocked or greatly surprised',
        example: 'She looked astounded at the news of her topping the exam.'
      },
      {
        id: 'pa-aghast-at',
        word: 'Aghast',
        preposition: 'at',
        phrase: 'Aghast at',
        category: 'adjective',
        hindiMeaning: 'दहशत या सदमे में',
        subMeaningEng: 'Filled with horror or shock',
        example: 'Workers and union officials were aghast at the layoffs.'
      },
      {
        id: 'pa-surprised-at',
        word: 'Surprised',
        preposition: 'at',
        phrase: 'Surprised at',
        category: 'adjective',
        hindiMeaning: 'अजीब व्यवहार पर हैरान होना',
        subMeaningEng: 'Feeling or showing surprise',
        example: 'We were very surprised at her strange behaviour.'
      },
      {
        id: 'pa-shocked-at',
        word: 'Shocked',
        preposition: 'at',
        phrase: 'Shocked at',
        category: 'adjective',
        hindiMeaning: 'भाषा या व्यवहार से स्तब्ध होना',
        subMeaningEng: 'Badly surprised or dismayed',
        example: 'She was shocked at the language they used.'
      },
      {
        id: 'pa-staggered-at',
        word: 'Staggered',
        preposition: 'at',
        phrase: 'Staggered at',
        category: 'adjective',
        hindiMeaning: 'अक्षमता देखकर चकित रह जाना',
        subMeaningEng: 'Deeply shocked or astonished',
        example: 'I was staggered at level of incompetence among my colleagues.'
      },
      {
        id: 'pa-appalled-at',
        word: 'Appalled',
        preposition: 'at',
        phrase: 'Appalled at',
        category: 'adjective',
        hindiMeaning: 'अस्पतालों की दुर्दशा पर भयभीत/दुखी',
        subMeaningEng: 'Greatly dismayed or horrified',
        example: 'I am absolutely appalled at the state of these government hospitals.'
      },
      {
        id: 'pa-alarmed-at',
        word: 'Alarmed',
        preposition: 'at',
        phrase: 'Alarmed at',
        category: 'adjective',
        hindiMeaning: 'अकेले सफर के विचार से भयभीत',
        subMeaningEng: 'Frightened or worried',
        example: 'She was a bit alarmed at the idea of travelling alone.'
      },

      // 5B: Anger & Dismay
      {
        id: 'pa-enraged-at',
        word: 'Enraged',
        preposition: 'at',
        phrase: 'Enraged at',
        category: 'adjective',
        hindiMeaning: 'मूर्खता पर अत्यधिक क्रोधित',
        subMeaningEng: 'To make somebody very angry',
        example: 'She was enraged at his stupidity.'
      },
      {
        id: 'pa-dismayed-at',
        word: 'Dismayed',
        preposition: 'at',
        phrase: 'Dismayed at',
        category: 'adjective',
        hindiMeaning: 'मित्र के बदले व्यवहार से निराश',
        subMeaningEng: 'Distressed and disheartened',
        example: 'He was dismayed at the change in his old friend’s behaviour.'
      },

      // 5C: Types of Laughter & Smiles
      {
        id: 'pa-laugh-at',
        word: 'Laugh',
        preposition: 'at',
        phrase: 'Laugh at',
        category: 'verb',
        hindiMeaning: 'हंसना (कार्टून आदि पर)',
        example: 'The children were laughing at the cartoons.'
      },
      {
        id: 'pa-smile-at',
        word: 'Smile',
        preposition: 'at',
        phrase: 'Smile at',
        category: 'verb',
        hindiMeaning: 'मुस्कुराना',
        example: 'When he smiled at me I knew everything was all right.'
      },
      {
        id: 'pa-chuckle-at',
        word: 'Chuckle',
        preposition: 'at',
        phrase: 'Chuckle at',
        category: 'verb',
        hindiMeaning: 'दबी हंसी हंसना',
        subMeaningEng: 'Meaning: to laugh quietly',
        example: 'He chuckled at the thought of the two of them stuck in the snow.'
      },
      {
        id: 'pa-giggle-at',
        word: 'Giggle',
        preposition: 'at',
        phrase: 'Giggle at',
        category: 'verb',
        hindiMeaning: 'खी-खी कर बचकाना हंसना',
        subMeaningEng: 'Meaning: laugh in a silly way (not loud)',
        example: 'All the girls giggled at jokes that the teacher cracked.'
      },
      {
        id: 'pa-cackle-at',
        word: 'Cackle',
        preposition: 'at',
        phrase: 'Cackle at',
        category: 'verb',
        hindiMeaning: 'कर्कश ठहाका लगाना',
        subMeaningEng: 'Meaning: to laugh in a loud unpleasant way',
        example: 'He cackled wildly at the thought.'
      },
      {
        id: 'pa-guffaw-at',
        word: 'Guffaw',
        preposition: 'at',
        phrase: 'Guffaw at',
        category: 'verb',
        hindiMeaning: 'जोरदार ठहाका मारकर हंसना',
        subMeaningEng: 'Meaning: to laugh noisily',
        example: 'The man guffawed at her remarks.'
      },
      {
        id: 'pa-chortle-at',
        word: 'Chortle',
        preposition: 'at',
        phrase: 'Chortle at',
        category: 'verb',
        hindiMeaning: 'खुशी से खिलखिलाना',
        subMeaningEng: 'Meaning: to laugh loudly with pleasure',
        example: 'She chortled with glee at the news.'
      },
      {
        id: 'pa-grin-at',
        word: 'Grin',
        preposition: 'at',
        phrase: 'Grin at',
        category: 'verb',
        hindiMeaning: 'मुंह फाड़कर मुस्कुराना',
        subMeaningEng: 'Meaning: to smile widely',
        example: 'He grinned at me from the doorway.'
      },
      {
        id: 'pa-beam-at',
        word: 'Beam',
        preposition: 'at',
        phrase: 'Beam at',
        category: 'verb',
        hindiMeaning: 'चेहरे पर बड़ी खुशी की मुस्कान होना',
        subMeaningEng: 'Meaning: to have a big happy smile on your face',
        example: 'The child beamed at his teacher as he received the award.'
      },

      // 5D: Mockery, Sneering & Scoffing
      {
        id: 'pa-jeer-at',
        word: 'Jeer',
        preposition: 'at',
        phrase: 'Jeer at',
        category: 'verb',
        hindiMeaning: 'खिल्ली उड़ाना / फब्तियां कसना',
        subMeaningEng: 'Meaning: to laugh at somebody or shout rude remarks at them',
        example: 'Striking workers jeered at those who crossed the picket line.'
      },
      {
        id: 'pa-smirk-at',
        word: 'Smirk',
        preposition: 'at',
        phrase: 'Smirk at',
        category: 'verb',
        hindiMeaning: 'बनावटी या कुटिल मुस्कान देना',
        subMeaningEng: 'Meaning: to smile in a silly or unpleasant way that shows that you are pleased with yourself',
        example: "I don't like the way he winks and smirks at me whenever he sees me."
      },
      {
        id: 'pa-snicker-at',
        word: 'Snicker',
        preposition: 'at',
        phrase: 'Snicker at',
        category: 'verb',
        hindiMeaning: 'दबी जुबान से किसी की गलती पर हंसना',
        subMeaningEng: 'Meaning: to laugh in a quiet unpleasant way, especially at somebody’s problems or mistakes',
        example: 'Stop snickering at that rude joke and get back to your class room.'
      },
      {
        id: 'pa-snigger-at',
        word: 'Snigger',
        preposition: 'at',
        phrase: 'Snigger at',
        category: 'verb',
        hindiMeaning: 'कपड़ों आदि पर दबी हंसी उड़ाना',
        subMeaningEng: 'Meaning: same as snicker',
        example: 'They spent half the time sniggering at the clothes people were wearing.'
      },
      {
        id: 'pa-sneer-at',
        word: 'Sneer',
        preposition: 'at',
        phrase: 'Sneer at',
        category: 'verb',
        hindiMeaning: 'नाक-भौं सिकोड़ना / घृणा से देखना',
        subMeaningEng: 'Meaning: to show that you have no respect for somebody by the expression on your face',
        example: "She'll probably sneer at my new shoes because they're not expensive."
      },
      {
        id: 'pa-scoff-at',
        word: 'Scoff',
        preposition: 'at',
        phrase: 'Scoff at',
        category: 'verb',
        hindiMeaning: 'हंसी उड़ाना / बकवास समझना',
        subMeaningEng: 'Meaning: to talk about somebody/something in a way that makes it clear that you think they are stupid or silly',
        example: 'The critics scoffed at his paintings.'
      },

      // 5E: Ways of Looking, Glancing & Staring
      {
        id: 'pa-look-at',
        word: 'Look',
        preposition: 'at',
        phrase: 'Look at',
        category: 'verb',
        hindiMeaning: 'देखना',
        example: 'They looked at the picture and laughed.'
      },
      {
        id: 'pa-glance-at',
        word: 'Glance',
        preposition: 'at',
        phrase: 'Glance at',
        category: 'verb',
        hindiMeaning: 'सरसरी नज़र डालना',
        subMeaningEng: 'Meaning: to look quickly at something/somebody',
        example: 'I only had time to glance at my emails.'
      },
      {
        id: 'pa-gape-at',
        word: 'Gape',
        preposition: 'at',
        phrase: 'Gape at',
        category: 'verb',
        hindiMeaning: 'मुंह फाड़कर हैरत से देखना',
        subMeaningEng: 'Meaning: to stare at somebody/something with your mouth open because you are shocked or surprised',
        example: 'They stood gaping at the pig in the kitchen.'
      },
      {
        id: 'pa-gawk-at',
        word: 'Gawk',
        preposition: 'at',
        phrase: 'Gawk at',
        category: 'verb',
        hindiMeaning: 'अजीब या बेवकूफी भरे अंदाज में ताकना',
        subMeaningEng: 'Meaning: to stare at somebody/something in a rude or stupid way',
        example: 'Don’t stand there gawking at her, give her a hand.'
      },
      {
        id: 'pa-gaze-at',
        word: 'Gaze',
        preposition: 'at',
        phrase: 'Gaze at',
        category: 'verb',
        hindiMeaning: 'प्रशंसा से एकटक देखना / निहारना',
        subMeaningEng: 'Meaning: to look steadily at somebody/something for a long time',
        example: 'Anjli gazed admiringly at Rahul as he spoke.'
      },
      {
        id: 'pa-stare-at',
        word: 'Stare',
        preposition: 'at',
        phrase: 'Stare at',
        category: 'verb',
        hindiMeaning: 'घूरना / लगातार देखना',
        subMeaningEng: 'Meaning: to look at somebody/something for a long time',
        example: "Don't stare at people like that, it's rude."
      },
      {
        id: 'pa-glare-at',
        word: 'Glare',
        preposition: 'at',
        phrase: 'Glare at',
        category: 'verb',
        hindiMeaning: 'क्रोध से घूरना / तरेरना',
        subMeaningEng: 'Meaning: to look at somebody/something in an angry way',
        example: 'She glared angrily at everyone and stormed out of the room.'
      },
      {
        id: 'pa-glower-at',
        word: 'Glower',
        preposition: 'at',
        phrase: 'Glower at',
        category: 'verb',
        hindiMeaning: 'आक्रामक तेवर से घूरना',
        subMeaningEng: 'Meaning: to look in an angry, aggressive way',
        example: "There's no point glowering at me like that - you know the rules."
      },
      {
        id: 'pa-frown-at',
        word: 'Frown',
        preposition: 'at',
        phrase: 'Frown at',
        category: 'verb',
        hindiMeaning: 'भौंहें सिकोड़कर नाराजगी जताना',
        subMeaningEng: 'Meaning: to make a serious, angry or worried expression by bringing your eyebrows closer together so that lines appear on your forehead',
        example: 'She frowned at me, clearly annoyed.'
      },
      {
        id: 'pa-scowl-at',
        word: 'Scowl',
        preposition: 'at',
        phrase: 'Scowl at',
        category: 'verb',
        hindiMeaning: 'गुस्से या चिढ़ में मुंह बनाना / तेवर चढ़ाना',
        subMeaningEng: 'Meaning: to look at somebody/something in an angry or annoyed way',
        example: 'The boy scowled at her and reluctantly followed her back into school'
      }
    ]
  }
];

// ═══════════════════════════════════════════════════════════════════
// PART - B: MISCELLANEOUS FIXED PREPOSITIONS (WORD-WISE BY PREP)
// ═══════════════════════════════════════════════════════════════════
export const PART_B_GROUPS: FixedPrepPartBGroup[] = [
  // ── 1. WORDS TAKING 'TO' ────────────────────────────────────────
  {
    preposition: 'TO',
    title: 'Generally "TO" preposition is used with these words',
    hindiTitle: 'सामान्यतः "TO" लेने वाले महत्वपूर्ण शब्द',
    description: '42 सर्वाधिक पूछे जाने वाले शब्द जो परीक्षा में केवल "TO" लेते हैं।',
    items: [
      {
        id: 'pb-to-abhorrent',
        word: 'Abhorrent',
        preposition: 'to',
        category: 'adjective',
        hindiMeaning: 'घिनौना / अत्यंत अप्रिय',
        englishMeaning: 'Causing or deserving strong dislike',
        example: 'The idea of being stuck in an office all day is abhorrent to a nature lover like myself.'
      },
      {
        id: 'pb-to-access',
        word: 'Access',
        preposition: 'to',
        category: 'noun',
        hindiMeaning: 'पहुँच / प्रवेश',
        englishMeaning: 'The means or opportunity to approach or enter a place/system',
        example: 'You need a password to get access to the computer system.'
      },
      {
        id: 'pb-to-accountable-to',
        word: 'Accountable (to sb)',
        preposition: 'to',
        category: 'adjective',
        hindiMeaning: 'के प्रति उत्तरदायी / जवाबदेह',
        englishMeaning: 'Obliged to accept responsibility to somebody',
        example: 'Politicians are ultimately accountable to the voters.',
        note: 'Trap: Accountable TO a person, but Accountable FOR an action/cost.'
      },
      {
        id: 'pb-to-accountable-for',
        word: 'Accountable (for sth)',
        preposition: 'for',
        category: 'adjective',
        hindiMeaning: 'किसी गलती या खर्चे के लिए जिम्मेदार',
        englishMeaning: 'Responsible for something',
        example: 'Because my dog bit the little boy, I’m being held accountable for all of the child’s medical expenses.'
      },
      {
        id: 'pb-to-adhere',
        word: 'Adhere',
        preposition: 'to',
        category: 'verb',
        hindiMeaning: 'पालन करना / सिद्धांतों से जुड़े रहना',
        englishMeaning: 'To cause to stick fast, follow rules faithfully',
        example: 'She adhered to her principles/ideals throughout her life.'
      },
      {
        id: 'pb-to-adjacent',
        word: 'Adjacent',
        preposition: 'to',
        category: 'adjective',
        hindiMeaning: 'सटा हुआ / सीमा से लगा हुआ',
        englishMeaning: 'Next to or adjoining something else; sharing a border',
        example: 'They lived in a house adjacent to the railway.'
      },
      {
        id: 'pb-to-affectionate',
        word: 'Affectionate',
        preposition: 'to',
        category: 'adjective',
        hindiMeaning: 'स्नेही / प्रेमभाव रखने वाला',
        englishMeaning: 'Feeling or showing love and affection',
        example: 'God will not be affectionate to that man who is not affectionate to Gods creatures.'
      },
      {
        id: 'pb-to-agreeable',
        word: 'Agreeable',
        preposition: 'to',
        category: 'adjective',
        hindiMeaning: 'सहमत / प्रस्ताव स्वीकार करने को तैयार',
        englishMeaning: 'Ready or willing to agree',
        example: 'Do you think they will be agreeable to our proposal?'
      },
      {
        id: 'pb-to-allegiance',
        word: 'Allegiance',
        preposition: 'to',
        category: 'noun',
        hindiMeaning: 'निष्ठा / वफादारी',
        englishMeaning: 'Loyalty or commitment to a superior or group',
        example: 'He affirmed his allegiance to the president.'
      },
      {
        id: 'pb-to-alternative-to',
        word: 'Alternative (to sth)',
        preposition: 'to',
        category: 'noun',
        hindiMeaning: 'विकल्प / स्थानापन्न',
        englishMeaning: 'One of two or more available possibilities',
        example: 'Fruit juice is provided as an alternative to alcoholic drinks.'
      },
      {
        id: 'pb-to-alternative-for',
        word: 'Alternative (for sb)',
        preposition: 'for',
        category: 'noun',
        hindiMeaning: 'मरीजों या व्यक्तियों के लिए विकल्प',
        englishMeaning: 'Only available option for a person',
        example: 'This treatment is the only alternative for some patients.'
      },
      {
        id: 'pb-to-antidote',
        word: 'Antidote',
        preposition: 'to',
        category: 'noun',
        hindiMeaning: 'विष नाशक / विष की काट',
        englishMeaning: 'A medicine that counteracts poison',
        example: 'There is no known antidote to the poison.'
      },
      {
        id: 'pb-to-attention',
        word: 'Attention',
        preposition: 'to',
        category: 'noun',
        hindiMeaning: 'चेतावनी या बात पर ध्यान देना',
        englishMeaning: 'Notice, interest, or awareness',
        example: 'He paid no attention to her warning.'
      },
      {
        id: 'pb-to-attuned',
        word: 'Attuned',
        preposition: 'to',
        category: 'adjective',
        hindiMeaning: 'पहचानना / अनुकूल व अभ्यस्त होना',
        englishMeaning: 'Familiar with somebody/something so that you can understand or recognize them',
        example: "She wasn't yet attuned to her baby's needs."
      },
      {
        id: 'pb-to-averse',
        word: 'Averse',
        preposition: 'to',
        category: 'adjective',
        hindiMeaning: 'प्रतिकूल / नापसंद करने वाला / अनिच्छुक',
        englishMeaning: 'Having a strong feeling of dislike or opposition',
        example: 'If your pet is averse to full outfits, consider a festive collar instead'
      },
      {
        id: 'pb-to-blind',
        word: 'Blind (to fault)',
        preposition: 'to',
        category: 'adjective',
        hindiMeaning: 'गलतियों के प्रति अंधा / अनदेखा करने वाला',
        englishMeaning: 'Unable or unwilling to see reality or fault',
        example: 'The politician was blind to the fact that no one was interested in anything he had to say.',
        note: 'Blind in (eye) e.g., blind in the left eye; Blind to (fault) e.g., blind to his son’s mistakes.'
      },
      {
        id: 'pb-to-comparable',
        word: 'Comparable',
        preposition: 'to',
        category: 'adjective',
        hindiMeaning: 'तुलनीय / समान स्तर का',
        englishMeaning: 'Being similar or about the same (to/with)',
        example: 'Its brain is closely comparable to the brain of a chimpanzee.'
      },
      {
        id: 'pb-to-complement',
        word: 'Complement',
        preposition: 'to',
        category: 'noun',
        hindiMeaning: 'पूरक / शोभा या पूर्णता बढ़ाने वाला',
        englishMeaning: 'Thing that completes or makes something else better',
        example: 'A swim skirt is the perfect complement to most types of swimwear.'
      },
      {
        id: 'pb-to-due',
        word: 'Due',
        preposition: 'to',
        category: 'adjective',
        hindiMeaning: 'के कारण / की वजह से',
        englishMeaning: 'Caused by or because of',
        example: 'He argues that climate change is mainly due to the actions of industrialized countries.'
      },
      {
        id: 'pb-to-equal',
        word: 'Equal',
        preposition: 'to',
        category: 'adjective',
        hindiMeaning: 'बराबरी का / समान क्षेत्रफल वाला',
        englishMeaning: 'Being the same in quantity, size, or value',
        example: 'An area of forest equal to the size of Wales has been destroyed.'
      },
      {
        id: 'pb-to-exception',
        word: 'Exception',
        preposition: 'to',
        category: 'noun',
        hindiMeaning: 'नियम का अपवाद',
        englishMeaning: 'A case where a rule does not apply',
        example: 'We laughed when Sue said that there is an exception to every rule.'
      },
      {
        id: 'pb-to-given',
        word: 'Given',
        preposition: 'to',
        category: 'adjective',
        hindiMeaning: 'आदी होना / लत होना',
        englishMeaning: 'Habitually inclined to do something',
        example: 'He’s given to going for long walks on his own.'
      },
      {
        id: 'pb-to-heir',
        word: 'Heir',
        preposition: 'to',
        category: 'noun',
        hindiMeaning: 'जायदाद या धन का वारिस',
        englishMeaning: 'Person legally entitled to receive property of someone who dies',
        example: 'Rajan was the reluctant heir to an enormous amount of land and money.'
      },
      {
        id: 'pb-to-indebted',
        word: 'Indebted',
        preposition: 'to',
        category: 'adjective',
        hindiMeaning: 'सहायता के लिए ऋणी / आभारी',
        englishMeaning: 'Owing gratitude or money to someone',
        example: 'I am deeply indebted to my family for all their help.'
      },
      {
        id: 'pb-to-indifferent',
        word: 'Indifferent',
        preposition: 'to',
        category: 'adjective',
        hindiMeaning: 'उदासीन / बेपरवाह',
        englishMeaning: 'Not interested in or concerned about something',
        example: 'The government cannot afford to be indifferent to public opinion.'
      },
      {
        id: 'pb-to-indigenous',
        word: 'Indigenous',
        preposition: 'to',
        category: 'adjective',
        hindiMeaning: 'क्षेत्र विशेष का स्वदेशी / स्थानीय',
        englishMeaning: 'Originating or occurring naturally in a particular place',
        example: 'Since the native tribes had no means of travelling, all of the food they ate was indigenous to their own communities.'
      },
      {
        id: 'pb-to-key',
        word: 'Key',
        preposition: 'to',
        category: 'noun',
        hindiMeaning: 'सफलता की कुंजी / मौलिक साधन',
        englishMeaning: 'A thing that enables you to achieve or understand something',
        example: 'Persistence is the key if you want to get a job.'
      },
      {
        id: 'pb-to-look-forward',
        word: 'Look forward',
        preposition: 'to',
        category: 'verb',
        hindiMeaning: 'संतुष्टि के साथ उत्सुकता से प्रतीक्षा करना',
        englishMeaning: 'Anticipated with satisfaction (takes V1+ing)',
        example: "We're really looking forward to seeing you again."
      },
      {
        id: 'pb-to-opposite',
        word: 'Opposite',
        preposition: 'to',
        category: 'adjective',
        hindiMeaning: 'के बिल्कुल विपरीत',
        englishMeaning: 'Completely different or contrary to each other',
        example: 'You’d never know they’re sisters - they’re completely opposite to each other in every way.'
      },
      {
        id: 'pb-to-postscript',
        word: 'Postscript',
        preposition: 'to',
        category: 'noun',
        hindiMeaning: 'पत्र या कहानी का परिशिष्ट भाग',
        englishMeaning: 'A note added at the end of a letter, article, or book',
        example: 'As a postscript to that story I told you last week, it turned out that the woman was his sister-in-law.'
      },
      {
        id: 'pb-to-preface',
        word: 'Preface',
        preposition: 'to',
        category: 'noun',
        hindiMeaning: 'पुस्तक की प्रस्तावना / भूमिका',
        englishMeaning: 'An introduction to a book or speech',
        example: 'I read it in the preface to her new book.'
      },
      {
        id: 'pb-to-prefer',
        word: 'Prefer',
        preposition: 'to',
        category: 'verb',
        hindiMeaning: 'की तुलना में ज्यादा पसंद करना',
        englishMeaning: 'To like one thing better than another (never takes than)',
        example: 'I would have preferred a trip to the beach, but my family decided we should go to the mountains.'
      },
      {
        id: 'pb-to-preferable',
        word: 'Preferable',
        preposition: 'to',
        category: 'adjective',
        hindiMeaning: 'अधिक वांछनीय / बेहतर',
        englishMeaning: 'More desirable or suitable',
        example: 'Online shopping is preferable to consumers like myself who hate the idea of going into crowded stores.'
      },
      {
        id: 'pb-to-repugnant',
        word: 'Repugnant',
        preposition: 'to',
        category: 'adjective',
        hindiMeaning: 'घृणास्पद / मन को न भाने वाला',
        englishMeaning: 'Extremely distasteful; unacceptable',
        example: 'The idea of eating meat was repugnant to her.'
      },
      {
        id: 'pb-to-resign',
        word: 'Resign (oneself)',
        preposition: 'to',
        category: 'verb',
        hindiMeaning: 'समस्याओं या भाग्य के आगे झुक जाना / स्वीकार करना',
        englishMeaning: 'Accept something unpleasant that cannot be avoided',
        example: 'She resigned herself to her fate.'
      },
      {
        id: 'pb-to-sequel',
        word: 'Sequel',
        preposition: 'to',
        category: 'noun',
        hindiMeaning: 'फिल्म या किताब का अगला भाग',
        englishMeaning: 'A published work that continues the story of an earlier one',
        example: 'The new movie is a direct sequel to the first, picking up the story where the original left off.'
      },
      {
        id: 'pb-to-similar',
        word: 'Similar',
        preposition: 'to',
        category: 'adjective',
        hindiMeaning: 'शैली या रूप में समान',
        englishMeaning: 'Almost the same',
        example: 'My teaching style is similar to that of most other teachers'
      },
      {
        id: 'pb-to-submission',
        word: 'Submission',
        preposition: 'to',
        category: 'noun',
        hindiMeaning: 'परिषद के समक्ष रिपोर्ट प्रस्तुत करना',
        englishMeaning: 'The action of presenting something for consideration or judgment',
        example: 'They prepared a report for submission to the council.'
      },
      {
        id: 'pb-to-submit',
        word: 'Submit',
        preposition: 'to',
        category: 'verb',
        hindiMeaning: 'शक्तिशाली शत्रु के आगे झुकना / आत्मसमर्पण',
        englishMeaning: 'Yield or accept to a superior force',
        example: 'They abandoned their town rather than submit to the Persians.'
      },
      {
        id: 'pb-to-subscribe',
        word: 'Subscribe',
        preposition: 'to',
        category: 'verb',
        hindiMeaning: 'चैनल या सेवा की सदस्यता लेना',
        englishMeaning: 'Pay money to receive a service regularly',
        example: 'We subscribe to several sports channels TV.'
      },
      {
        id: 'pb-to-succumb',
        word: 'Succumb',
        preposition: 'to',
        category: 'verb',
        hindiMeaning: 'दबाव के आगे घुटने टेक देना / झुक जाना',
        englishMeaning: 'Fail to resist pressure, temptation, or illness',
        example: 'Even good leaders eventually succumb to the pressure of the ruling class.'
      },
      {
        id: 'pb-to-supplement',
        word: 'Supplement',
        preposition: 'to',
        category: 'noun',
        hindiMeaning: 'सरकारी फंडिंग का पूरक अंश',
        englishMeaning: 'A thing added to complete or enhance something',
        example: 'Industrial sponsorship is a supplement to government funding.'
      },
      {
        id: 'pb-to-surrender',
        word: 'Surrender',
        preposition: 'to',
        category: 'verb',
        hindiMeaning: 'पुलिस या कानून के सामने आत्मसमर्पण करना',
        englishMeaning: 'To give up control or oneself to an authority',
        example: 'The hijackers eventually surrendered themselves to the police.'
      },
      {
        id: 'pb-to-temptation',
        word: 'Temptation',
        preposition: 'to',
        category: 'noun',
        hindiMeaning: 'चोरों के लिए प्रलोभन / लालच',
        englishMeaning: 'A strong urge or desire to have something',
        example: 'An expensive bicycle is a temptation to thieves'
      }
    ]
  },

  // ── 2. WORDS TAKING 'OF' ────────────────────────────────────────
  {
    preposition: 'OF',
    title: 'Generally "OF" preposition is used with these words',
    hindiTitle: 'सामान्यतः "OF" लेने वाले महत्वपूर्ण शब्द',
    description: '24 सर्वाधिक पूछे जाने वाले शब्द जो परीक्षा में "OF" लेते हैं।',
    items: [
      {
        id: 'pb-of-abhorrence',
        word: 'Abhorrence',
        preposition: 'of',
        category: 'noun',
        hindiMeaning: 'अपव्यय या गंदगी से घृणा',
        englishMeaning: 'Strong hatred or disgust',
        example: 'He had an abhorrence of waste of any kind.'
      },
      {
        id: 'pb-of-accused',
        word: 'Accused',
        preposition: 'of',
        category: 'adjective',
        hindiMeaning: 'अपराध का अभियुक्त / आरोपी',
        englishMeaning: 'One charged with an offence',
        example: 'I was accused of abducting her.'
      },
      {
        id: 'pb-of-afraid',
        word: 'Afraid',
        preposition: 'of',
        category: 'adjective',
        hindiMeaning: 'डरा हुआ / भयभीत',
        englishMeaning: 'Filled with fear',
        example: 'It’s all over. There’s nothing to be afraid of now.'
      },
      {
        id: 'pb-of-ashamed',
        word: 'Ashamed',
        preposition: 'of',
        category: 'adjective',
        hindiMeaning: 'आदत या गलती पर शर्मिंदा',
        englishMeaning: 'Feeling shame, guilt, or disgrace',
        example: 'Ashamed of her tendency to overeat, the woman refused to dine in public or eat in front of others.'
      },
      {
        id: 'pb-of-beware',
        word: 'Beware',
        preposition: 'of',
        category: 'verb',
        hindiMeaning: 'बर्फीली सड़कों से सावधान रहना',
        englishMeaning: 'To be alert or careful',
        example: 'Motorists have been warned to beware of icy roads.'
      },
      {
        id: 'pb-of-boast',
        word: 'Boast',
        preposition: 'of',
        category: 'verb',
        hindiMeaning: 'कौशल की डींग मारना / शेखी बघारना',
        englishMeaning: 'Talk with excessive pride about achievements',
        example: 'He openly boasted of his skill as a stuntman.'
      },
      {
        id: 'pb-of-capable',
        word: 'Capable',
        preposition: 'of',
        category: 'adjective',
        hindiMeaning: 'कार्य करने में सक्षम',
        englishMeaning: 'Having the ability, fitness, or quality necessary to do something',
        example: 'I knew he was capable of something like this.'
      },
      {
        id: 'pb-of-composed',
        word: 'Composed',
        preposition: 'of',
        category: 'adjective',
        hindiMeaning: 'प्रोटीन या तत्वों से मिलकर बना होना',
        englishMeaning: 'Made or formed from several parts or things',
        example: 'Around 15 per cent of our diet is composed of protein.'
      },
      {
        id: 'pb-of-consist',
        word: 'Consist',
        preposition: 'of',
        category: 'verb',
        hindiMeaning: 'तस्वीरों की श्रृंखला से बना होना',
        englishMeaning: 'To be made up of something',
        example: 'The exhibition consists of a series of photographs that he took between 1915 and 1939.'
      },
      {
        id: 'pb-of-confident',
        word: 'Confident',
        preposition: 'of',
        category: 'adjective',
        hindiMeaning: 'जीत के प्रति आश्वस्त होना',
        englishMeaning: 'Feeling or showing certainty about something',
        example: 'I’m fully confident of winning the title.'
      },
      {
        id: 'pb-of-convicted',
        word: 'Convicted',
        preposition: 'of',
        category: 'adjective',
        hindiMeaning: 'हत्या का दोषी सिद्ध / ठहराया हुआ',
        englishMeaning: 'Formally declared guilty of a criminal offence',
        example: 'He was convicted of the murder of two teenagers.'
      },
      {
        id: 'pb-of-convinced',
        word: 'Convinced',
        preposition: 'of',
        category: 'adjective',
        hindiMeaning: 'बातों पर यकीन होना / आश्वस्त',
        englishMeaning: 'Completely certain about something',
        example: 'She didn’t seem convinced of his words.'
      },
      {
        id: 'pb-of-disapprove',
        word: 'Disapprove',
        preposition: 'of',
        category: 'verb',
        hindiMeaning: 'बदलावों को अस्वीकार / नापसंद करना',
        englishMeaning: 'Officially refuse to approve or accept',
        example: 'He strongly disapproved of the changes that had been made.'
      },
      {
        id: 'pb-of-dispose',
        word: 'Dispose',
        preposition: 'of',
        category: 'verb',
        hindiMeaning: 'कचरे का निस्तारण करना / छुटकारा पाना',
        englishMeaning: 'Get rid of by throwing away or destroying (single f, not off)',
        example: 'Radioactive waste must be disposed of safely.',
        note: 'Super-Important Trap: Dispose takes OF (single f), never OFF.'
      },
      {
        id: 'pb-of-envious',
        word: 'Envious',
        preposition: 'of',
        category: 'adjective',
        hindiMeaning: 'अवसर देखकर ईर्ष्यालु होना',
        englishMeaning: 'Feeling or showing a desire to have what someone else has',
        example: 'Everyone is so envious of her having the chance to study abroad.'
      },
      {
        id: 'pb-of-fond',
        word: 'Fond',
        preposition: 'of',
        category: 'adjective',
        hindiMeaning: 'हुक्म चलाने का शौकीन होना',
        englishMeaning: 'Having an affection or liking for',
        example: 'Sheila’s very fond of telling other people what to do.'
      },
      {
        id: 'pb-of-get-rid',
        word: 'Get rid',
        preposition: 'of',
        category: 'verb',
        hindiMeaning: 'मेहमानों से छुटकारा पाना',
        englishMeaning: 'To become free from unwanted people or things',
        example: 'Try and get rid of your visitors before I get there.'
      },
      {
        id: 'pb-of-guilty',
        word: 'Guilty',
        preposition: 'of',
        category: 'adjective',
        hindiMeaning: 'अपराध का दोषी',
        englishMeaning: 'Responsible for committing a specified offense',
        example: 'The jury found the defendant not guilty of the offence.'
      },
      {
        id: 'pb-of-proof',
        word: 'Proof',
        preposition: 'of',
        category: 'noun',
        hindiMeaning: 'प्रतिभा का ठोस प्रमाण होना',
        englishMeaning: 'Evidence establishing a fact or truth',
        example: 'These results are a further proof of his outstanding ability.'
      },
      {
        id: 'pb-of-scared',
        word: 'Scared',
        preposition: 'of',
        category: 'adjective',
        hindiMeaning: 'अकेले जाने से डरा हुआ',
        englishMeaning: 'Fearful or frightened',
        example: 'She is scared of going out alone.'
      },
      {
        id: 'pb-of-sure',
        word: 'Sure',
        preposition: 'of',
        category: 'adjective',
        hindiMeaning: 'तथ्यों के प्रति निश्चित होना',
        englishMeaning: 'Ascertain with no uncertainty',
        example: 'I hope you are sure of your facts.'
      },
      {
        id: 'pb-of-want',
        word: 'Want of',
        preposition: 'of',
        category: 'noun',
        hindiMeaning: 'चिकित्सा सुविधाओं का अभाव / ज़रूरत',
        englishMeaning: 'State of lacking or needing something essential',
        example: 'There is a want of adequate medical facilities.'
      },
      {
        id: 'pb-of-wary',
        word: 'Wary',
        preposition: 'of',
        category: 'adjective',
        hindiMeaning: 'संदिग्ध लोगों से सावधान / सतर्क',
        englishMeaning: 'Feeling or showing caution about possible dangers',
        example: 'You should be very wary of people offering free ride of Highways.'
      },
      {
        id: 'pb-of-worthy',
        word: 'Worthy',
        preposition: 'of',
        category: 'adjective',
        hindiMeaning: 'ध्यान या सम्मान के योग्य',
        englishMeaning: 'Deserving respect, attention, or value',
        example: 'Very few of his ideas are worthy of further attention.'
      }
    ]
  },

  // ── 3. WORDS TAKING 'FOR' ───────────────────────────────────────
  {
    preposition: 'FOR',
    title: 'Generally "FOR" preposition is used with these words',
    hindiTitle: 'सामान्यतः "FOR" लेने वाले महत्वपूर्ण शब्द',
    description: '14 सर्वाधिक पूछे जाने वाले शब्द जो इच्छा, क्षमता व भरपाई के लिए "FOR" लेते हैं।',
    items: [
      {
        id: 'pb-for-affection',
        word: 'Affection',
        preposition: 'for',
        category: 'noun',
        hindiMeaning: 'पत्नी के लिए गहरा स्नेह / प्रेम',
        englishMeaning: 'A feeling of fondness or liking for someone',
        example: 'Rajesh expressed deep affection for his wife at their third anniversary party.'
      },
      {
        id: 'pb-for-appetite',
        word: 'Appetite',
        preposition: 'for',
        category: 'noun',
        hindiMeaning: 'ज्ञान की तीव्र भूख / लालसा',
        englishMeaning: 'A strong desire or craving for something',
        example: 'My little brother has an insatiable appetite for knowledge, learning anything and everything he can all the time.'
      },
      {
        id: 'pb-for-aptitude',
        word: 'Aptitude',
        preposition: 'for',
        category: 'noun',
        hindiMeaning: 'पियानो या कला में जन्मजात योग्यता',
        englishMeaning: 'A natural ability or skill to do something',
        example: 'Even as a toddler, Kamal showed a remarkable aptitude for the piano and played music even professionals could not perform.'
      },
      {
        id: 'pb-for-atone',
        word: 'Atone',
        preposition: 'for',
        category: 'verb',
        hindiMeaning: 'खराब सेवा का प्रायश्चित / पश्चाताप करना',
        englishMeaning: 'Make amends or reparation for bad behavior',
        example: 'The manager tried to atone for the bad service by offering me a complimentary dessert.'
      },
      {
        id: 'pb-for-capacity',
        word: 'Capacity',
        preposition: 'for',
        category: 'noun',
        hindiMeaning: 'कठिन परिश्रम करने की अपार क्षमता',
        englishMeaning: 'The ability to hold, endure, or perform',
        example: 'She has an enormous capacity for hard work.'
      },
      {
        id: 'pb-for-compassion',
        word: 'Compassion',
        preposition: 'for',
        category: 'noun',
        hindiMeaning: 'पीड़ितों के प्रति गहरी सहानुभूति / करुणा',
        englishMeaning: 'Sympathetic pity and concern for the sufferings of others',
        example: 'He was filled with overwhelming love and compassion for his wife.'
      },
      {
        id: 'pb-for-compensation',
        word: 'Compensation',
        preposition: 'for',
        category: 'noun',
        hindiMeaning: 'चोट या नुकसान का मुआवजा / हरजाना',
        englishMeaning: 'Payment made to make up for damage or injury',
        example: 'The employer has a duty to pay full compensation for injuries received at work.'
      },
      {
        id: 'pb-for-contempt',
        word: 'Contempt',
        preposition: 'for',
        category: 'noun',
        hindiMeaning: 'मूल्यों के प्रति तिरस्कार / अवमानना',
        englishMeaning: 'The feeling that something is worthless or beneath consideration',
        example: 'They had shown a contempt for the values she thought important.'
      },
      {
        id: 'pb-for-canvass',
        word: 'Canvass',
        preposition: 'for',
        category: 'verb',
        hindiMeaning: 'उम्मीदवार या वोटों के लिए प्रचार करना',
        englishMeaning: 'To solicit votes or opinions from people in an area',
        example: 'He spent the whole month canvassing for votes.'
      },
      {
        id: 'pb-for-craving',
        word: 'Craving',
        preposition: 'for',
        category: 'noun',
        hindiMeaning: 'चॉकलेट की तीव्र लालसा / तृष्णा',
        englishMeaning: 'A powerful, intense desire for something',
        example: 'Rajni skipped meals to satisfy her craving for chocolate.'
      },
      {
        id: 'pb-for-desire',
        word: 'Desire',
        preposition: 'for',
        category: 'noun',
        hindiMeaning: 'जीवन में स्थिरता की इच्छा',
        englishMeaning: 'A strong feeling of wanting to have something',
        example: 'His childhood had created a desire for stability in his life.'
      },
      {
        id: 'pb-for-hope',
        word: 'Hope',
        preposition: 'for',
        category: 'verb',
        hindiMeaning: 'अच्छे मौसम की आशा करना',
        englishMeaning: 'Expect with confidence and desire',
        example: 'The parents hope for a dry weekend even though the forecast calls for rain.'
      },
      {
        id: 'pb-for-liking',
        word: 'Liking',
        preposition: 'for',
        category: 'noun',
        hindiMeaning: 'पड़ोसी के प्रति पसंद / चाहत',
        englishMeaning: 'A feeling of regard or fondness',
        example: 'Kunal has a liking for his next door neighbor Kamini, but he has yet to confess his feelings to her in any way.'
      },
      {
        id: 'pb-for-yearn',
        word: 'Yearn',
        preposition: 'for',
        category: 'verb',
        hindiMeaning: 'आइसक्रीम के लिए तीव्र लालसा करना',
        englishMeaning: 'To have an intense longing for something',
        example: 'When my sister was ill, she yearned for chocolate ice cream and French fries.'
      }
    ]
  },

  // ── 4. WORDS TAKING 'FROM' ──────────────────────────────────────
  {
    preposition: 'FROM',
    title: 'Generally "FROM" preposition is used with these words',
    hindiTitle: 'सामान्यतः "FROM" लेने वाले महत्वपूर्ण शब्द',
    description: '8 प्रमुख शब्द जो उत्पत्ति, विचलन, राहत व बीमारी से उबरने में "FROM" लेते हैं।',
    items: [
      {
        id: 'pb-from-abstinence',
        word: 'Abstinence',
        preposition: 'from',
        category: 'noun',
        hindiMeaning: 'धूम्रपान से पूर्ण परहेज़ करना',
        englishMeaning: 'The practice of not doing or having something that is wanted',
        example: 'Abstinence from smoking is now mandatory on commercial airlines.'
      },
      {
        id: 'pb-from-derive',
        word: 'Derive',
        preposition: 'from',
        category: 'verb',
        hindiMeaning: 'ज़मीन से संपत्ति प्राप्त करना / हासिल करना',
        englishMeaning: 'To obtain or get something from a specified source',
        example: 'Wealth and position in society derived largely from land ownership.'
      },
      {
        id: 'pb-from-descent',
        word: 'Descent',
        preposition: 'from',
        category: 'noun',
        hindiMeaning: 'पूर्वज से वंशानुगत उत्पत्ति होना',
        englishMeaning: "A person's origin or ancestral background",
        example: 'Humans and other apes followed separate lines of descent from a common ancestor.'
      },
      {
        id: 'pb-from-deviate',
        word: 'Deviate',
        preposition: 'from',
        category: 'verb',
        hindiMeaning: 'सामान्य रास्ते या नियम से विचलित होना / हटना',
        englishMeaning: 'To depart from an established course or route',
        example: 'The bus had to deviate from its usual route because of a road closure.'
      },
      {
        id: 'pb-from-escape',
        word: 'Escape',
        preposition: 'from',
        category: 'verb',
        hindiMeaning: 'जलती हुई कार से सुरक्षित निकल जाना',
        englishMeaning: 'To break free from confinement or dangerous situation',
        example: 'She managed to escape from the burning car.'
      },
      {
        id: 'pb-from-exemption',
        word: 'Exemption',
        preposition: 'from',
        category: 'noun',
        hindiMeaning: 'कस्टम ड्यूटी से कानूनी छूट पाना',
        englishMeaning: 'The process of being freed from an obligation or liability',
        example: 'They enjoyed exemption from customs duties on goods to be used by themselves.'
      },
      {
        id: 'pb-from-recover',
        word: 'Recover',
        preposition: 'from',
        category: 'verb',
        hindiMeaning: 'गंभीर चोट या बीमारी से स्वस्थ होना',
        englishMeaning: 'To return to health after illness or injury',
        example: 'She spent many weeks in hospital recovering from her injuries.'
      },
      {
        id: 'pb-from-respite',
        word: 'Respite',
        preposition: 'from',
        category: 'noun',
        hindiMeaning: 'असहनीय दर्द से अस्थायी राहत पाना',
        englishMeaning: 'A short period of rest or relief from pain/difficulty',
        example: 'The tablets brought temporary respite from the excruciating pain.'
      }
    ]
  },

  // ── 5. WORDS TAKING 'ON' ────────────────────────────────────────
  {
    preposition: 'ON',
    title: 'Generally "ON" preposition is used with these words',
    hindiTitle: 'सामान्यतः "ON" लेने वाले महत्वपूर्ण शब्द',
    description: '9 प्रमुख शब्द जो विचार करने, निर्भर रहने, यात्रा शुरू करने व ज़ोर देने में "ON" लेते हैं।',
    items: [
      {
        id: 'pb-on-comment',
        word: 'Comment',
        preposition: 'on',
        category: 'verb',
        hindiMeaning: 'आरोपों पर कोई टिप्पणी करना',
        englishMeaning: 'To express an opinion or reaction about something',
        example: 'He said nothing when asked to comment on the allegations.'
      },
      {
        id: 'pb-on-deliberate',
        word: 'Deliberate',
        preposition: 'on',
        category: 'verb',
        hindiMeaning: 'मुद्दे पर गहराई से विचार-विमर्श करना',
        englishMeaning: 'To engage in long, careful consideration',
        example: 'They deliberated on whether to continue with the talks.'
      },
      {
        id: 'pb-on-depend',
        word: 'Depend',
        preposition: 'on',
        category: 'verb',
        hindiMeaning: 'उद्योग पर आजीविका हेतु निर्भर रहना',
        englishMeaning: 'To be contingent on or rely upon',
        example: 'The community depends on the shipping industry for its survival.'
      },
      {
        id: 'pb-on-dwell',
        word: 'Dwell',
        preposition: 'on',
        category: 'verb',
        hindiMeaning: 'गलती पर लगातार सोचते/बोलते रहना',
        englishMeaning: 'To think, speak, or write at length about a subject',
        example: "So you made a mistake, but there's no need to dwell on it."
      },
      {
        id: 'pb-on-embark',
        word: 'Embark',
        preposition: 'on',
        category: 'verb',
        hindiMeaning: 'परीक्षा की तैयारी की यात्रा शुरू करना',
        englishMeaning: 'To begin a course of action, study, or journey',
        example: 'She has already embarked on her studies for SSC Mains.'
      },
      {
        id: 'pb-on-encroach',
        word: 'Encroach',
        preposition: 'on',
        category: 'verb',
        hindiMeaning: 'आसपास की ज़मीन पर अतिक्रमण करना',
        englishMeaning: 'To intrude gradually on person’s territory or rights',
        example: 'The growing town soon encroached on the surrounding countryside.'
      },
      {
        id: 'pb-on-impose',
        word: 'Impose',
        preposition: 'on',
        category: 'verb',
        hindiMeaning: 'दोषियों पर 25 साल की सजा लागू करना / थोपना',
        englishMeaning: 'Force an unwelcome decision or law on someone',
        example: 'A prison sentence of 25 years was imposed on each of the defendants.'
      },
      {
        id: 'pb-on-insist',
        word: 'Insist',
        preposition: 'on',
        category: 'verb',
        hindiMeaning: 'सूट पहनने का आग्रह करना / ज़ोर देना',
        englishMeaning: 'Demand something forcefully, not accepting refusal',
        example: 'She insisted on him wearing a suit.'
      },
      {
        id: 'pb-on-intrude',
        word: 'Intrude',
        preposition: 'on',
        category: 'verb',
        hindiMeaning: 'निजी मामलों में अनाधिकार प्रवेश / दखल देना',
        englishMeaning: 'Enter without invitation into private space (on/upon)',
        example: 'We should not intrude on their private affair.'
      }
    ]
  },

  // ── 6. WORDS TAKING 'IN' ────────────────────────────────────────
  {
    preposition: 'IN',
    title: 'Generally "IN" preposition is used with these words',
    hindiTitle: 'सामान्यतः "IN" लेने वाले महत्वपूर्ण शब्द',
    description: '14 प्रमुख शब्द जो मग्न होने, निपुण होने, कमी व लगातार जुटे रहने में "IN" लेते हैं।',
    items: [
      {
        id: 'pb-in-absorbed',
        word: 'Absorbed',
        preposition: 'in',
        category: 'adjective',
        hindiMeaning: 'खेल देखने में पूरी तरह मग्न / तल्लीन',
        englishMeaning: "Having one's attention wholly engaged or occupied",
        example: 'He was too absorbed in watching the game to notice.'
      },
      {
        id: 'pb-in-dabble',
        word: 'Dabble',
        preposition: 'in',
        category: 'verb',
        hindiMeaning: 'खेल को केवल शौकिया तौर पर करना',
        englishMeaning: 'Take part in an activity in a casual, non-serious way',
        example: 'The man touted his professional bowling skills but his wife revealed that he only dabbles in the sport occasionally.'
      },
      {
        id: 'pb-in-deficient',
        word: 'Deficient',
        preposition: 'in',
        category: 'adjective',
        hindiMeaning: 'विटामिन डी में अपूर्ण / कमी होना',
        englishMeaning: 'Not having enough of a specified quality or ingredient',
        example: 'A diet deficient in vitamin D may cause the disease rickets.'
      },
      {
        id: 'pb-in-diligent',
        word: 'Diligent',
        preposition: 'in',
        category: 'adjective',
        hindiMeaning: 'केस की तैयारी में अत्यंत मेहनती / कर्मठ',
        englishMeaning: 'Showing steady and earnest care and hard work',
        example: 'Their lawyer was extremely diligent in preparing their case.'
      },
      {
        id: 'pb-in-excel',
        word: 'Excel',
        preposition: 'in',
        category: 'verb',
        hindiMeaning: 'विदेशी भाषाओं में श्रेष्ठ / अव्वल होना',
        englishMeaning: 'To be exceptionally good at something',
        example: 'She has always excelled in foreign languages.'
      },
      {
        id: 'pb-in-experienced',
        word: 'Experienced',
        preposition: 'in',
        category: 'adjective',
        hindiMeaning: 'सॉफ्टवेयर विकास में अत्यधिक अनुभवी',
        englishMeaning: 'Possessing skills or knowledge from practice',
        example: "She's highly experienced in software development."
      },
      {
        id: 'pb-in-indulge',
        word: 'Indulge',
        preposition: 'in',
        category: 'verb',
        hindiMeaning: 'शॉपिंग के विशेष आनंद में लिप्त होना',
        englishMeaning: 'Allow oneself to enjoy the pleasure of something',
        example: 'They went into town to indulge in some serious shopping.'
      },
      {
        id: 'pb-in-interested',
        word: 'Interested',
        preposition: 'in',
        category: 'adjective',
        hindiMeaning: 'कृषि सुधारों में गहरी रुचि रखना',
        englishMeaning: 'Showing curiosity or concern about something',
        example: 'As a landowner, he was actively interested in agricultural improvements.'
      },
      {
        id: 'pb-in-involved',
        word: 'Involved',
        preposition: 'in',
        category: 'adjective',
        hindiMeaning: 'परियोजना की लागत में शामिल होना',
        englishMeaning: 'Connected with or participating in something',
        example: 'We need to examine all the costs involved in the project first.'
      },
      {
        id: 'pb-in-persist',
        word: 'Persist',
        preposition: 'in',
        category: 'verb',
        hindiMeaning: 'परेशान करने में लगातार लगे रहना',
        englishMeaning: 'Continue firmly in an opinion or course of action',
        example: 'If you persist in upsetting her, I will have to punish you.'
      },
      {
        id: 'pb-in-persevere',
        word: 'Persevere',
        preposition: 'in',
        category: 'verb',
        hindiMeaning: 'कठिनाइयों के बावजूद कोशिश में डटे रहना',
        englishMeaning: 'Continue in a course of action despite difficulty',
        example: 'Despite a number of setbacks, they persevered in their attempts to fly around the world in a balloon.'
      },
      {
        id: 'pb-in-proficient',
        word: 'Proficient',
        preposition: 'in',
        category: 'adjective',
        hindiMeaning: 'कई भाषाओं में कुशल / प्रवीण',
        englishMeaning: 'Competent or skilled in doing or using something',
        example: "She's proficient in several languages."
      },
      {
        id: 'pb-in-remiss',
        word: 'Remiss',
        preposition: 'in',
        category: 'adjective',
        hindiMeaning: 'कर्तव्य में लापरवाह / बेपरवाह होना',
        englishMeaning: 'Lacking care or attention to duty; negligent',
        example: 'He was remiss in his duty to inspect the safety equipment properly.'
      },
      {
        id: 'pb-in-versed',
        word: 'Versed',
        preposition: 'in',
        category: 'adjective',
        hindiMeaning: 'भाषा या विषय में निपुण / मर्मज्ञ',
        englishMeaning: 'Experienced or skilled in; knowledgeable about',
        example: "I'm not sufficiently versed in your language to understand what you're saying."
      }
    ]
  },

  // ── 7. WORDS TAKING 'WITH' ──────────────────────────────────────
  {
    preposition: 'WITH',
    title: 'Generally "WITH" preposition is used with these words',
    hindiTitle: 'सामान्यतः "WITH" लेने वाले महत्वपूर्ण शब्द',
    description: '19 प्रमुख शब्द जो तालमेल, संघर्ष, जान-पहचान व समझौते में "WITH" लेते हैं।',
    items: [
      {
        id: 'pb-with-acquaintance',
        word: 'Acquaintance',
        preposition: 'with',
        category: 'noun',
        hindiMeaning: 'सिमरन से जान-पहचान होना',
        englishMeaning: 'Knowledge or familiarity with a person',
        example: 'I first met Simran in 2008 and struck up an acquaintance with her.'
      },
      {
        id: 'pb-with-afflicted',
        word: 'Afflicted',
        preposition: 'with',
        category: 'adjective',
        hindiMeaning: 'गंभीर बीमारी से पीड़ित / ग्रसित',
        englishMeaning: 'Cause pain or suffering to; affect or trouble',
        example: "About 40 per cent of the country's population is afflicted with the disease."
      },
      {
        id: 'pb-with-alliance',
        word: 'Alliance',
        preposition: 'with',
        category: 'noun',
        hindiMeaning: 'अन्य कंपनियों के साथ व्यापारिक संधि / गठबंधन',
        englishMeaning: 'A union or association formed for mutual benefit',
        example: 'They have alliances with other companies.'
      },
      {
        id: 'pb-with-associated',
        word: 'Associated',
        preposition: 'with',
        category: 'adjective',
        hindiMeaning: 'ई-कॉमर्स से जुड़े हुए व्यापक मुद्दे',
        englishMeaning: 'Connected with something in the mind or in business',
        example: 'The conference will address the broad issues associated with E-commerce.'
      },
      {
        id: 'pb-with-busy',
        word: 'Busy',
        preposition: 'with',
        category: 'adjective',
        hindiMeaning: 'गृहकार्य में व्यस्त रहना',
        englishMeaning: 'Actively having a great deal to do',
        example: 'The kids are busy with their homework.'
      },
      {
        id: 'pb-with-clash',
        word: 'Clash',
        preposition: 'with',
        category: 'verb',
        hindiMeaning: 'प्रदर्शनकारियों की पुलिस से झड़प / टकराव होना',
        englishMeaning: 'Meet and come into violent conflict',
        example: 'Students clashed with police after demonstrations at five universities.'
      },
      {
        id: 'pb-with-coincide',
        word: 'Coincide',
        preposition: 'with',
        category: 'verb',
        hindiMeaning: 'भारी बारिश का ज्वार के साथ एक समय पर होना',
        englishMeaning: 'Occur at or during the same time',
        example: 'If the heavy rain had coincided with an extreme high tide, serious flooding would have resulted.'
      },
      {
        id: 'pb-with-compatible',
        word: 'Compatible',
        preposition: 'with',
        category: 'adjective',
        hindiMeaning: 'लोकतांत्रिक सरकार के अनुकूल / सामंजस्यपूर्ण',
        englishMeaning: 'Able to exist or occur together without conflict',
        example: 'Such policies are not compatible with democratic government.'
      },
      {
        id: 'pb-with-compliant',
        word: 'Compliant',
        preposition: 'with',
        category: 'adjective',
        hindiMeaning: 'पत्नी की इच्छाओं का अनुपालन करने वाला / आज्ञाकारी',
        englishMeaning: 'Inclined to agree or obey with others',
        example: "By then, Rajan seemed less compliant with his wife's wishes than he had six months before."
      },
      {
        id: 'pb-with-conformity',
        word: 'Conformity',
        preposition: 'with',
        category: 'noun',
        hindiMeaning: 'अंतरराष्ट्रीय मानकों के साथ अनुपालन',
        englishMeaning: 'Compliance with standards, rules, or laws',
        example: 'The procedure is in strict conformity with standard international practices.'
      },
      {
        id: 'pb-with-contrast',
        word: 'Contrast A with B',
        preposition: 'with',
        category: 'verb',
        hindiMeaning: 'वादों और कार्यों में अंतर स्पष्ट करना / वैषम्य',
        englishMeaning: 'Differ strikingly in an obvious way',
        example: 'Her actions contrasted sharply with her promises.'
      },
      {
        id: 'pb-with-conversant',
        word: 'Conversant',
        preposition: 'with',
        category: 'adjective',
        hindiMeaning: 'कंपनी की प्रक्रियाओं से भलीभांति परिचित होना',
        englishMeaning: 'Familiar with or knowledgeable about something',
        example: "You need to become fully conversant with the company's procedures."
      },
      {
        id: 'pb-with-cope',
        word: 'Cope',
        preposition: 'with',
        category: 'verb',
        hindiMeaning: 'काम के तनाव का सामना करना / निबटना',
        englishMeaning: 'Deal effectively with something difficult (never say cope up with)',
        example: "He wasn't able to cope with the stresses and strains of the job.",
        note: 'High-Frequency Exam Trap: In exams, "cope up with" is commonly given in error spotting. Always use "COPE WITH".'
      },
      {
        id: 'pb-with-correspond',
        word: 'Correspond',
        preposition: 'with',
        category: 'verb',
        hindiMeaning: 'घटनाक्रम का विवरण मेल खाना / अनुरूप होना',
        englishMeaning: 'Be similar, equivalent, or in agreement with',
        example: 'Your account of events does not correspond with hers.'
      },
      {
        id: 'pb-with-disgusted',
        word: 'Disgusted',
        preposition: 'with',
        category: 'adjective',
        hindiMeaning: 'घमंडी व्यवहार से घृणा महसूस करना',
        englishMeaning: 'A feeling of revulsion or profound disapproval',
        example: 'She was disgusted with his arrogant behaviour.'
      },
      {
        id: 'pb-with-intimacy',
        word: 'Intimacy',
        preposition: 'with',
        category: 'noun',
        hindiMeaning: 'राष्ट्रपति के साथ घनिष्ठता / आत्मीयता',
        englishMeaning: 'Close familiarity or emotional friendship',
        example: 'He enjoys an intimacy with the president.'
      },
      {
        id: 'pb-with-quarrel',
        word: 'Quarrel',
        preposition: 'with',
        category: 'noun',
        hindiMeaning: 'भाई के साथ लड़ाई / झगड़ा करना',
        englishMeaning: 'An angry argument or disagreement',
        example: 'He had had a quarrel with his brother.'
      },
      {
        id: 'pb-with-remonstrate',
        word: 'Remonstrate',
        preposition: 'with',
        category: 'verb',
        hindiMeaning: 'गलतियों पर विरोध जताना / प्रतिवाद करना',
        englishMeaning: 'Make a forcefully reproachful protest to somebody',
        example: 'The editor remonstrated with him about the inaccuracies in the story.'
      },
      {
        id: 'pb-with-sympathize',
        word: 'Sympathize',
        preposition: 'with',
        category: 'verb',
        hindiMeaning: 'मुसीबत में पड़े व्यक्ति से सहानुभूति रखना',
        englishMeaning: 'Feel or express compassion for someone',
        example: 'I find it very hard to sympathize with him.'
      }
    ]
  }
];

// Helper to assemble all PDF items for unified search, cards, and quiz
export function getAllPdfFixedPrepositions() {
  const map = new Map<string, any>();

  // Add Part A items
  PART_A_CLUSTERS.forEach(cluster => {
    cluster.items.forEach(item => {
      map.set(item.id, {
        id: item.id,
        word: item.word,
        preposition: item.preposition.toLowerCase(),
        phrase: item.phrase,
        hindiMeaning: item.hindiMeaning,
        englishMeaning: item.subMeaningEng || cluster.title,
        category: item.category,
        example: item.example,
        examFrequency: 'essential',
        repeatedIn: ['SSC CGL', 'CHSL', 'CPO', 'CDS', 'Bank PO'],
        sourcePart: 'part-a',
        clusterTitle: cluster.title
      });
    });
  });

  // Add Part B items
  PART_B_GROUPS.forEach(group => {
    group.items.forEach(item => {
      if (!map.has(item.id)) {
        map.set(item.id, {
          id: item.id,
          word: item.word,
          preposition: item.preposition.toLowerCase(),
          phrase: `${item.word.split(' ')[0]} ${item.preposition.toLowerCase()}`,
          hindiMeaning: item.hindiMeaning,
          englishMeaning: item.englishMeaning,
          category: item.category,
          example: item.example,
          examFrequency: 'very-high',
          repeatedIn: ['SSC CGL', 'CHSL', 'MTS', 'CPO', 'Stenographer'],
          sourcePart: 'part-b',
          examTrapTip: item.note
        });
      }
    });
  });

  return Array.from(map.values());
}
