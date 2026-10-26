export interface FixedPrepositionItem {
  id: string;
  word: string;
  preposition: string;
  phrase: string;
  hindiMeaning: string;
  englishMeaning: string;
  category: 'verb' | 'adjective' | 'noun';
  example: string;
  examFrequency: 'essential' | 'very-high' | 'high';
  repeatedIn: string[];
  examTrapTip?: string;
  confusingPairId?: string;
}

export interface ConfusingPairGroup {
  id: string;
  title: string;
  coreRule: string;
  items: {
    phrase: string;
    condition: string;
    hindiMeaning: string;
    example: string;
    trapWarning?: string;
  }[];
}

export interface FixedPrepositionQuizQuestion {
  id: string;
  sentence: string; // Contains _____
  correctPreposition: string;
  options: string[];
  phrase: string;
  hindiMeaning: string;
  explanation: string;
  examTag: string;
}

// ═══════════════════════════════════════════════════════════════════
// 1. MASTER HIGH-YIELD FIXED PREPOSITIONS DATA (170+ Items)
// ═══════════════════════════════════════════════════════════════════
export const HIGH_YIELD_FIXED_PREPOSITIONS: FixedPrepositionItem[] = [
  // ── BY ──────────────────────────────────────────────────────────
  {
    id: 'fp-abide-by',
    word: 'Abide',
    preposition: 'by',
    phrase: 'Abide by',
    hindiMeaning: 'नियम या फैसले का पालन करना',
    englishMeaning: 'To accept, obey or conform to a rule or decision',
    category: 'verb',
    example: 'Every citizen must abide by the rules of the constitution.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'CHSL', 'CPO', 'NDA', 'Bank PO'],
    examTrapTip: "Never say 'abide with' or 'abide to'. 'Abide' always takes 'by' when meaning to obey."
  },
  {
    id: 'fp-accompanied-by',
    word: 'Accompanied',
    preposition: 'by',
    phrase: 'Accompanied by',
    hindiMeaning: 'साथ में होना (व्यक्ति या ध्वनि के साथ)',
    englishMeaning: 'Together with a person or supporting sound',
    category: 'adjective',
    example: 'The Prime Minister was accompanied by his diplomatic advisors.',
    examFrequency: 'very-high',
    repeatedIn: ['SSC CGL', 'MTS', 'CDS'],
    examTrapTip: "Accompanied by (person/sound), Accompanied with (disease/symptom e.g., fever accompanied with cold)."
  },
  {
    id: 'fp-bound-by',
    word: 'Bound',
    preposition: 'by',
    phrase: 'Bound by',
    hindiMeaning: 'कानून या वचन से बंधा होना',
    englishMeaning: 'Legally or morally obliged to follow',
    category: 'adjective',
    example: 'The judge is bound by law to deliver an impartial verdict.',
    examFrequency: 'high',
    repeatedIn: ['SSC CHSL', 'Bank Clerk']
  },
  {
    id: 'fp-judge-by',
    word: 'Judge',
    preposition: 'by',
    phrase: 'Judge by',
    hindiMeaning: 'किसी आधार पर राय बनाना / आंकना',
    englishMeaning: 'To form an opinion from given evidence or appearance',
    category: 'verb',
    example: 'Never judge a book by its cover.',
    examFrequency: 'high',
    repeatedIn: ['SSC CGL', 'State PSC']
  },
  {
    id: 'fp-swear-by',
    word: 'Swear',
    preposition: 'by',
    phrase: 'Swear by',
    hindiMeaning: 'कसम खाना / अत्यधिक विश्वास करना',
    englishMeaning: 'To have complete trust in something or take an oath',
    category: 'verb',
    example: 'Athletes swear by this nutritious training regimen.',
    examFrequency: 'high',
    repeatedIn: ['SSC CPO', 'NDA']
  },

  // ── OF ──────────────────────────────────────────────────────────
  {
    id: 'fp-accuse-of',
    word: 'Accuse',
    preposition: 'of',
    phrase: 'Accuse of',
    hindiMeaning: 'आरोप लगाना',
    englishMeaning: 'To charge someone with an offense or wrongdoing',
    category: 'verb',
    example: 'He was accused of stealing company trade secrets.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'CHSL', 'Bank PO', 'CDS'],
    examTrapTip: "Accused OF a crime, but Charged WITH a crime. Don't interchange 'of' and 'with'!"
  },
  {
    id: 'fp-afraid-of',
    word: 'Afraid',
    preposition: 'of',
    phrase: 'Afraid of',
    hindiMeaning: 'डरना / भयभीत होना',
    englishMeaning: 'Feeling fear or anxiety about something',
    category: 'adjective',
    example: 'She is afraid of stray dogs at night.',
    examFrequency: 'high',
    repeatedIn: ['SSC MTS', 'CHSL']
  },
  {
    id: 'fp-approve-of',
    word: 'Approve',
    preposition: 'of',
    phrase: 'Approve of',
    hindiMeaning: 'सहमति देना / उचित समझना',
    englishMeaning: 'To accept or consider something as right or good',
    category: 'verb',
    example: 'Her parents did not approve of her reckless decision.',
    examFrequency: 'very-high',
    repeatedIn: ['SSC CGL', 'Bank PO']
  },
  {
    id: 'fp-ashamed-of',
    word: 'Ashamed',
    preposition: 'of',
    phrase: 'Ashamed of',
    hindiMeaning: 'शर्मिंदा होना',
    englishMeaning: 'Feeling shame or guilt',
    category: 'adjective',
    example: 'You should be ashamed of your discourteous behavior.',
    examFrequency: 'high',
    repeatedIn: ['SSC CHSL', 'Steno']
  },
  {
    id: 'fp-assure-of',
    word: 'Assure',
    preposition: 'of',
    phrase: 'Assure of',
    hindiMeaning: 'भरोसा या आश्वासन देना',
    englishMeaning: 'To guarantee or give confidence about something',
    category: 'verb',
    example: 'The officer assured the villagers of complete safety.',
    examFrequency: 'very-high',
    repeatedIn: ['SSC CGL', 'CPO', 'CDS']
  },
  {
    id: 'fp-avail-of',
    word: 'Avail',
    preposition: 'of',
    phrase: 'Avail of',
    hindiMeaning: 'लाभ उठाना (सदा Reflexive Pronoun लेता है)',
    englishMeaning: 'To take advantage of an opportunity',
    category: 'verb',
    example: 'You must avail yourself of this golden opportunity.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'Bank PO', 'NDA'],
    examTrapTip: "Crucial rule: 'Avail' takes a reflexive pronoun (myself, yourself) + OF. e.g. 'avail himself of'."
  },
  {
    id: 'fp-aware-of',
    word: 'Aware',
    preposition: 'of',
    phrase: 'Aware of',
    hindiMeaning: 'सचेत / जानकार होना',
    englishMeaning: 'Having knowledge or perception of a situation',
    category: 'adjective',
    example: 'Students must be aware of the negative marking scheme.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'CHSL', 'MTS']
  },
  {
    id: 'fp-beware-of',
    word: 'Beware',
    preposition: 'of',
    phrase: 'Beware of',
    hindiMeaning: 'सावधान रहना',
    englishMeaning: 'Be cautious and alert towards danger',
    category: 'verb',
    example: 'Beware of pickpockets in crowded railway stations.',
    examFrequency: 'very-high',
    repeatedIn: ['SSC MTS', 'CHSL']
  },
  {
    id: 'fp-boast-of',
    word: 'Boast',
    preposition: 'of',
    phrase: 'Boast of',
    hindiMeaning: 'डींग हांकना / शेखी बघारना',
    englishMeaning: 'To brag excessively about achievements',
    category: 'verb',
    example: 'A modest scholar never boasts of his accomplishments.',
    examFrequency: 'very-high',
    repeatedIn: ['SSC CGL', 'CPO']
  },
  {
    id: 'fp-capable-of',
    word: 'Capable',
    preposition: 'of',
    phrase: 'Capable of',
    hindiMeaning: 'सक्षम / समर्थ होना (आगे V-ing आता है)',
    englishMeaning: 'Having the ability, fitness, or quality to do something',
    category: 'adjective',
    example: 'She is capable of solving the toughest reasoning puzzles.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'CHSL', 'Bank PO'],
    examTrapTip: "Capable takes 'of' + V-ing. (Able takes 'to' + V1: 'able to solve', but 'capable of solving')."
  },
  {
    id: 'fp-certain-of',
    word: 'Certain',
    preposition: 'of',
    phrase: 'Certain of',
    hindiMeaning: 'निश्चित होना',
    englishMeaning: 'Having no doubt; fully convinced',
    category: 'adjective',
    example: 'After rigorous practice, he was certain of his selection.',
    examFrequency: 'high',
    repeatedIn: ['SSC CHSL', 'CDS']
  },
  {
    id: 'fp-consist-of',
    word: 'Consist',
    preposition: 'of',
    phrase: 'Consist of',
    hindiMeaning: 'से मिलकर बना होना',
    englishMeaning: 'To be composed or made up of',
    category: 'verb',
    example: 'The committee consists of five independent members.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'CHSL', 'Bank PO', 'NDA'],
    examTrapTip: "'Consist of' equals 'Comprise'. 'Comprise' never takes 'of' in active voice! 'The team comprises five members' (correct)."
  },
  {
    id: 'fp-convict-of',
    word: 'Convict',
    preposition: 'of',
    phrase: 'Convict of',
    hindiMeaning: 'दोषी ठहराना',
    englishMeaning: 'To declare guilty of a criminal offense',
    category: 'verb',
    example: 'The accused was convicted of forgery and fraud.',
    examFrequency: 'very-high',
    repeatedIn: ['SSC CGL', 'CPO']
  },
  {
    id: 'fp-cure-of',
    word: 'Cure',
    preposition: 'of',
    phrase: 'Cure of',
    hindiMeaning: 'बीमारी से मुक्त करना',
    englishMeaning: 'To relieve of a disease or undesirable habit',
    category: 'verb',
    example: 'The doctor cured the patient of chronic asthma.',
    examFrequency: 'high',
    repeatedIn: ['SSC CHSL', 'MTS']
  },
  {
    id: 'fp-deprive-of',
    word: 'Deprive',
    preposition: 'of',
    phrase: 'Deprive of',
    hindiMeaning: 'वंचित करना / छीन लेना',
    englishMeaning: 'To deny possession or enjoyment of rights/goods',
    category: 'verb',
    example: 'You cannot deprive a citizen of fundamental rights.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'CDS', 'Bank PO']
  },
  {
    id: 'fp-desirous-of',
    word: 'Desirous',
    preposition: 'of',
    phrase: 'Desirous of',
    hindiMeaning: 'इच्छुक होना (+ V-ing)',
    englishMeaning: 'Having or expressing desire for something',
    category: 'adjective',
    example: 'He is desirous of joining the armed forces.',
    examFrequency: 'very-high',
    repeatedIn: ['SSC CGL', 'CPO', 'NDA'],
    examTrapTip: "'Desire' (Noun/Verb) takes 'for', but 'Desirous' (Adjective) takes 'of'."
  },
  {
    id: 'fp-devoid-of',
    word: 'Devoid',
    preposition: 'of',
    phrase: 'Devoid of',
    hindiMeaning: 'पूर्णतः रहित / विहीन होना',
    englishMeaning: 'Entirely empty or lacking of something',
    category: 'adjective',
    example: 'His written essay was totally devoid of logic and facts.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'Bank PO', 'CDS']
  },
  {
    id: 'fp-die-of',
    word: 'Die',
    preposition: 'of',
    phrase: 'Die of',
    hindiMeaning: 'बीमारी / भूख / प्यास से मरना',
    englishMeaning: 'To die as a direct result of disease, hunger or thirst',
    category: 'verb',
    example: 'Millions once died of tuberculosis before antibiotics.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'CHSL', 'CPO', 'Bank PO', 'CDS'],
    confusingPairId: 'cp-die',
    examTrapTip: "Die OF disease/hunger/thirst. Die FROM overwork/wound/poison. Die FOR motherland/cause. Die IN harness/accident."
  },
  {
    id: 'fp-dispose-of',
    word: 'Dispose',
    preposition: 'of',
    phrase: 'Dispose of',
    hindiMeaning: 'निपटाना / बेच देना (एकल f)',
    englishMeaning: 'To get rid of or settle an issue',
    category: 'verb',
    example: 'He disposed of his ancestral property to settle debts.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'CHSL', 'Bank PO'],
    examTrapTip: "Frequent spelling trap: Examiners write 'dispose off' (double 'f') which is WRONG! Always 'dispose of' (single 'f')."
  },
  {
    id: 'fp-envious-of',
    word: 'Envious',
    preposition: 'of',
    phrase: 'Envious of',
    hindiMeaning: 'ईर्ष्या रखना',
    englishMeaning: 'Feeling or showing envy towards someone',
    category: 'adjective',
    example: 'He was envious of his colleague’s rapid promotion.',
    examFrequency: 'very-high',
    repeatedIn: ['SSC CGL', 'MTS']
  },
  {
    id: 'fp-fond-of',
    word: 'Fond',
    preposition: 'of',
    phrase: 'Fond of',
    hindiMeaning: 'शौकीन होना / पसंद करना',
    englishMeaning: 'Having an affection or liking for',
    category: 'adjective',
    example: 'The little girl is fond of classical music.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CHSL', 'MTS', 'Steno']
  },
  {
    id: 'fp-guilty-of',
    word: 'Guilty',
    preposition: 'of',
    phrase: 'Guilty of',
    hindiMeaning: 'दोषी होना',
    englishMeaning: 'Culpable of or responsible for a specified wrongdoing',
    category: 'adjective',
    example: 'The jury found the cashier guilty of embezzlement.',
    examFrequency: 'very-high',
    repeatedIn: ['SSC CGL', 'Bank PO']
  },
  {
    id: 'fp-ignorant-of',
    word: 'Ignorant',
    preposition: 'of',
    phrase: 'Ignorant of',
    hindiMeaning: 'अनजान होना',
    englishMeaning: 'Lacking knowledge or awareness',
    category: 'adjective',
    example: 'He was ignorant of the strict rules of civil service conduct.',
    examFrequency: 'very-high',
    repeatedIn: ['SSC CGL', 'CPO']
  },
  {
    id: 'fp-jealous-of',
    word: 'Jealous',
    preposition: 'of',
    phrase: 'Jealous of',
    hindiMeaning: 'जलन / ईर्ष्या महसूस करना',
    englishMeaning: 'Feeling envious of someone else’s success',
    category: 'adjective',
    example: 'Never be jealous of the accomplishments of others.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CHSL', 'MTS']
  },
  {
    id: 'fp-proud-of',
    word: 'Proud',
    preposition: 'of',
    phrase: 'Proud of',
    hindiMeaning: 'गर्व महसूस करना',
    englishMeaning: 'Feeling deep pleasure or satisfaction as a result of achievements',
    category: 'adjective',
    example: 'The mentor was proud of the student’s top percentile.',
    examFrequency: 'high',
    repeatedIn: ['SSC MTS', 'Steno']
  },
  {
    id: 'fp-remind-of',
    word: 'Remind',
    preposition: 'of',
    phrase: 'Remind of',
    hindiMeaning: 'याद दिलाना',
    englishMeaning: 'To cause someone to remember something or someone',
    category: 'verb',
    example: 'This melody reminds me of my peaceful hometown.',
    examFrequency: 'very-high',
    repeatedIn: ['SSC CGL', 'Bank Clerk']
  },
  {
    id: 'fp-short-of',
    word: 'Short',
    preposition: 'of',
    phrase: 'Short of',
    hindiMeaning: 'कमी होना',
    englishMeaning: 'Lacking sufficient quantity of something',
    category: 'adjective',
    example: 'The small startup is running short of working capital.',
    examFrequency: 'high',
    repeatedIn: ['SSC CHSL', 'State PSC']
  },
  {
    id: 'fp-sure-of',
    word: 'Sure',
    preposition: 'of',
    phrase: 'Sure of',
    hindiMeaning: 'आश्वस्त होना',
    englishMeaning: 'Confident in knowledge or expectation',
    category: 'adjective',
    example: 'Are you absolutely sure of these financial calculations?',
    examFrequency: 'high',
    repeatedIn: ['SSC CPO', 'Bank PO']
  },
  {
    id: 'fp-tired-of',
    word: 'Tired',
    preposition: 'of',
    phrase: 'Tired of',
    hindiMeaning: 'ऊब जाना / तंग आ जाना',
    englishMeaning: 'Bored or impatient with something recurring',
    category: 'adjective',
    example: 'He is tired of making repeated excuses for tardiness.',
    examFrequency: 'very-high',
    repeatedIn: ['SSC CHSL', 'MTS']
  },
  {
    id: 'fp-worthy-of',
    word: 'Worthy',
    preposition: 'of',
    phrase: 'Worthy of',
    hindiMeaning: 'योग्य / पात्र होना',
    englishMeaning: 'Deserving respect, praise, or consideration',
    category: 'adjective',
    example: 'His selfless sacrifice is worthy of highest national praise.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'NDA', 'CDS']
  },

  // ── TO ──────────────────────────────────────────────────────────
  {
    id: 'fp-accustomed-to',
    word: 'Accustomed',
    preposition: 'to',
    phrase: 'Accustomed to',
    hindiMeaning: 'अभ्यस्त / आदी होना (+ V-ing)',
    englishMeaning: 'Customary or habitual to something',
    category: 'adjective',
    example: 'He is accustomed to waking up before dawn.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'Bank PO', 'CDS'],
    examTrapTip: "'Accustomed to' is followed by a Gerund (V-ing), NOT base verb! e.g., 'accustomed to waking up' (not wake up)."
  },
  {
    id: 'fp-addicted-to',
    word: 'Addicted',
    preposition: 'to',
    phrase: 'Addicted to',
    hindiMeaning: 'बुरी लत लगना (+ V-ing)',
    englishMeaning: 'Physically or mentally dependent on something harmful',
    category: 'adjective',
    example: 'The youngster was addicted to playing mobile games all night.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'CHSL', 'MTS'],
    examTrapTip: "Takes Gerund (V-ing). 'addicted to gambling' (not gamble)."
  },
  {
    id: 'fp-adhere-to',
    word: 'Adhere',
    preposition: 'to',
    phrase: 'Adhere to',
    hindiMeaning: 'नियमों या सिद्धांतों पर दृढ़ रहना',
    englishMeaning: 'To stick firmly to a belief, rule, or agreement',
    category: 'verb',
    example: 'All staff members must adhere to workplace safety protocols.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'Bank PO', 'NDA', 'CDS']
  },
  {
    id: 'fp-agree-to',
    word: 'Agree',
    preposition: 'to',
    phrase: 'Agree to',
    hindiMeaning: 'योजना / प्रस्ताव पर सहमत होना',
    englishMeaning: 'To consent to a proposal, scheme, or conditions',
    category: 'verb',
    example: 'The board finally agreed to the revised merger terms.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'CHSL', 'Bank PO'],
    confusingPairId: 'cp-agree',
    examTrapTip: "Agree WITH a person (I agree with you). Agree TO a proposal/terms (She agreed to my plan). Agree ON a topic (They agreed on the price)."
  },
  {
    id: 'fp-allude-to',
    word: 'Allude',
    preposition: 'to',
    phrase: 'Allude to',
    hindiMeaning: 'अप्रत्यक्ष रूप से संकेत करना',
    englishMeaning: 'To suggest or call attention to indirectly',
    category: 'verb',
    example: 'The poet frequently alludes to ancient Roman mythology.',
    examFrequency: 'high',
    repeatedIn: ['SSC CGL', 'CDS']
  },
  {
    id: 'fp-attend-to',
    word: 'Attend',
    preposition: 'to',
    phrase: 'Attend to',
    hindiMeaning: 'ध्यान देना / कार्य निपटाना',
    englishMeaning: 'To pay attention to or deal with something',
    category: 'verb',
    example: 'Please attend to the urgent complaints of the customers.',
    examFrequency: 'very-high',
    repeatedIn: ['SSC CHSL', 'Bank Clerk']
  },
  {
    id: 'fp-blind-to',
    word: 'Blind',
    preposition: 'to',
    phrase: 'Blind to',
    hindiMeaning: 'कमियों या गलतियों के प्रति अनदेखा होना',
    englishMeaning: 'Unwilling or unable to perceive faults or flaws',
    category: 'adjective',
    example: 'Parents are often blind to the shortcomings of their children.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'CPO', 'CDS'],
    confusingPairId: 'cp-blind',
    examTrapTip: "Blind IN an eye (physical impairment: 'blind in the left eye'). Blind TO faults/errors (figurative: 'blind to one's mistakes')."
  },
  {
    id: 'fp-conducive-to',
    word: 'Conducive',
    preposition: 'to',
    phrase: 'Conducive to',
    hindiMeaning: 'सहायक / अनुकूल होना',
    englishMeaning: 'Making a certain situation or outcome likely or possible',
    category: 'adjective',
    example: 'A calm environment is conducive to deep learning.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'Bank PO', 'NDA']
  },
  {
    id: 'fp-conform-to',
    word: 'Conform',
    preposition: 'to',
    phrase: 'Conform to',
    hindiMeaning: 'मानकों या नियमों के अनुरूप होना',
    englishMeaning: 'To comply with rules, standards, or laws',
    category: 'verb',
    example: 'Every building blueprint must conform to fire safety norms.',
    examFrequency: 'very-high',
    repeatedIn: ['SSC CGL', 'CDS']
  },
  {
    id: 'fp-contrary-to',
    word: 'Contrary',
    preposition: 'to',
    phrase: 'Contrary to',
    hindiMeaning: 'के विपरीत',
    englishMeaning: 'Opposite to or in conflict with',
    category: 'adjective',
    example: 'Contrary to popular expectations, the underdog won the election.',
    examFrequency: 'very-high',
    repeatedIn: ['SSC CHSL', 'Bank PO']
  },
  {
    id: 'fp-deaf-to',
    word: 'Deaf',
    preposition: 'to',
    phrase: 'Deaf to',
    hindiMeaning: 'सुझाव या प्रार्थना की अनसुनी करना',
    englishMeaning: 'Unwilling to listen to advice or requests',
    category: 'adjective',
    example: 'The cruel dictator turned deaf to the cries of his people.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'CHSL', 'CPO']
  },
  {
    id: 'fp-dedicated-to',
    word: 'Dedicated',
    preposition: 'to',
    phrase: 'Dedicated to',
    hindiMeaning: 'समर्पित होना (+ V-ing)',
    englishMeaning: 'Devoted to a task or purpose',
    category: 'adjective',
    example: 'Dr. Kalam was dedicated to inspiring youth through science.',
    examFrequency: 'high',
    repeatedIn: ['SSC MTS', 'Bank Clerk']
  },
  {
    id: 'fp-detrimental-to',
    word: 'Detrimental',
    preposition: 'to',
    phrase: 'Detrimental to',
    hindiMeaning: 'हानिकारक / नुकसानदेह',
    englishMeaning: 'Tending to cause harm or damage',
    category: 'adjective',
    example: 'Excessive sugar consumption is detrimental to health.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'Bank PO', 'CDS']
  },
  {
    id: 'fp-due-to',
    word: 'Due',
    preposition: 'to',
    phrase: 'Due to',
    hindiMeaning: 'के कारण (विशेषण के रूप में प्रयुक्त)',
    englishMeaning: 'Attributable to or caused by',
    category: 'adjective',
    example: 'His absence from class was due to high fever.',
    examFrequency: 'high',
    repeatedIn: ['SSC CHSL', 'Steno']
  },
  {
    id: 'fp-engaged-to',
    word: 'Engaged',
    preposition: 'to',
    phrase: 'Engaged to',
    hindiMeaning: 'सगाई होना (विवाह हेतु)',
    englishMeaning: 'Having agreed to marry someone',
    category: 'adjective',
    example: 'Priya is engaged to a promising software engineer.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'CPO'],
    confusingPairId: 'cp-engaged',
    examTrapTip: "Engaged TO a person (for marriage). Engaged IN a business/work (busy doing something)."
  },
  {
    id: 'fp-equal-to',
    word: 'Equal',
    preposition: 'to',
    phrase: 'Equal to',
    hindiMeaning: 'बराबर / सक्षम होना',
    englishMeaning: 'The same in number, size, or quality; up to the task',
    category: 'adjective',
    example: 'He proved equal to the daunting administrative challenge.',
    examFrequency: 'high',
    repeatedIn: ['SSC CHSL', 'MTS']
  },
  {
    id: 'fp-essential-to',
    word: 'Essential',
    preposition: 'to',
    phrase: 'Essential to',
    hindiMeaning: 'अत्यंत आवश्यक',
    englishMeaning: 'Fundamental or necessary for an outcome',
    category: 'adjective',
    example: 'Consistent revision is essential to scoring high percentiles.',
    examFrequency: 'very-high',
    repeatedIn: ['SSC CGL', 'Bank PO']
  },
  {
    id: 'fp-indifferent-to',
    word: 'Indifferent',
    preposition: 'to',
    phrase: 'Indifferent to',
    hindiMeaning: 'उदासीन / बेपरवाह होना',
    englishMeaning: 'Having no particular interest or sympathy; unconcerned',
    category: 'adjective',
    example: 'A stoic person remains indifferent to pain and pleasure.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'CHSL', 'Bank PO', 'NDA', 'CDS']
  },
  {
    id: 'fp-injurious-to',
    word: 'Injurious',
    preposition: 'to',
    phrase: 'Injurious to',
    hindiMeaning: 'स्वास्थ्य के लिए हानिकारक',
    englishMeaning: 'Causing or likely to cause damage or harm',
    category: 'adjective',
    example: 'Smoking cigarettes is injurious to health.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'MTS', 'Steno']
  },
  {
    id: 'fp-junior-to',
    word: 'Junior',
    preposition: 'to',
    phrase: 'Junior to',
    hindiMeaning: 'पद या उम्र में छोटा होना',
    englishMeaning: 'Lower in rank or status than someone else',
    category: 'adjective',
    example: 'Rohan is two years junior to me in the bank.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'CHSL', 'CPO', 'Bank PO'],
    confusingPairId: 'cp-latin-comparatives',
    examTrapTip: "Crucial rule: Latin comparatives (Junior, Senior, Superior, Inferior, Prior, Preferable) take 'TO', never 'THAN'!"
  },
  {
    id: 'fp-senior-to',
    word: 'Senior',
    preposition: 'to',
    phrase: 'Senior to',
    hindiMeaning: 'पद या उम्र में बड़ा होना',
    englishMeaning: 'Higher in rank, status, or age',
    category: 'adjective',
    example: 'She is senior to most officers in the district division.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'CHSL', 'Bank PO'],
    confusingPairId: 'cp-latin-comparatives'
  },
  {
    id: 'fp-superior-to',
    word: 'Superior',
    preposition: 'to',
    phrase: 'Superior to',
    hindiMeaning: 'गुणवत्ता में बेहतर होना',
    englishMeaning: 'Higher in quality, quantity, or capability',
    category: 'adjective',
    example: 'This cotton fabric is far superior to synthetic polyester.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'CDS', 'NDA'],
    confusingPairId: 'cp-latin-comparatives'
  },
  {
    id: 'fp-inferior-to',
    word: 'Inferior',
    preposition: 'to',
    phrase: 'Inferior to',
    hindiMeaning: 'गुणवत्ता में घटिया होना',
    englishMeaning: 'Lower in quality or value',
    category: 'adjective',
    example: 'Adulterated milk is inferior to farm-fresh milk.',
    examFrequency: 'very-high',
    repeatedIn: ['SSC CHSL', 'MTS'],
    confusingPairId: 'cp-latin-comparatives'
  },
  {
    id: 'fp-prior-to',
    word: 'Prior',
    preposition: 'to',
    phrase: 'Prior to',
    hindiMeaning: 'से पूर्व / पहले',
    englishMeaning: 'Existing or coming before in time, order, or importance',
    category: 'adjective',
    example: 'Prior to joining the academy, he worked in software consulting.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'Bank PO'],
    confusingPairId: 'cp-latin-comparatives'
  },
  {
    id: 'fp-preferable-to',
    word: 'Preferable',
    preposition: 'to',
    phrase: 'Preferable to',
    hindiMeaning: 'अधिक वांछनीय / बेहतर',
    englishMeaning: 'More desirable or suitable',
    category: 'adjective',
    example: 'In hot summer, tender coconut water is preferable to soft drinks.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'CHSL', 'Bank PO'],
    confusingPairId: 'cp-latin-comparatives',
    examTrapTip: "'Preferable' takes 'to', never 'than'. Also, 'more preferable' is a double comparative error!"
  },
  {
    id: 'fp-key-to',
    word: 'Key',
    preposition: 'to',
    phrase: 'Key to',
    hindiMeaning: 'सफलता की कुंजी / चाबी',
    englishMeaning: 'Crucial means of achieving a result',
    category: 'noun',
    example: 'Perseverance and timed mock tests are the key to success.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'MTS', 'CDS']
  },
  {
    id: 'fp-listen-to',
    word: 'Listen',
    preposition: 'to',
    phrase: 'Listen to',
    hindiMeaning: 'ध्यानपूर्वक सुनना',
    englishMeaning: 'To give one’s attention to a sound or speech',
    category: 'verb',
    example: 'Please listen to the examiner’s instructions carefully.',
    examFrequency: 'high',
    repeatedIn: ['SSC CHSL', 'Steno']
  },
  {
    id: 'fp-looking-forward-to',
    word: 'Looking forward',
    preposition: 'to',
    phrase: 'Looking forward to',
    hindiMeaning: 'उत्सुकता से प्रतीक्षा करना (+ V-ing)',
    englishMeaning: 'To await with eagerness and anticipation',
    category: 'verb',
    example: 'I am looking forward to meeting the director tomorrow.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'Bank PO', 'CDS'],
    examTrapTip: "'Looking forward to' must take a Gerund (V-ing), NOT base V1! e.g., 'looking forward to hearing' (not hear)."
  },
  {
    id: 'fp-loyal-to',
    word: 'Loyal',
    preposition: 'to',
    phrase: 'Loyal to',
    hindiMeaning: 'वफादार होना',
    englishMeaning: 'Giving or showing firm and constant support',
    category: 'adjective',
    example: 'A true soldier remains loyal to his country until the end.',
    examFrequency: 'high',
    repeatedIn: ['SSC MTS', 'NDA']
  },
  {
    id: 'fp-married-to',
    word: 'Married',
    preposition: 'to',
    phrase: 'Married to',
    hindiMeaning: 'विवाहित होना (Passive voice में)',
    englishMeaning: 'Joined in marriage to someone',
    category: 'adjective',
    example: 'She is married to a distinguished naval officer.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'CHSL', 'Bank PO'],
    examTrapTip: "In passive voice: 'married TO someone' (never 'married with'). In active voice: 'He married her' (no preposition)."
  },
  {
    id: 'fp-object-to',
    word: 'Object',
    preposition: 'to',
    phrase: 'Object to',
    hindiMeaning: 'आपत्ति जताना (+ V-ing)',
    englishMeaning: 'To express opposition, reluctance, or disapproval',
    category: 'verb',
    example: 'The lawyer objected to the misleading question.',
    examFrequency: 'very-high',
    repeatedIn: ['SSC CGL', 'Bank PO']
  },
  {
    id: 'fp-obliged-to',
    word: 'Obliged',
    preposition: 'to',
    phrase: 'Obliged to',
    hindiMeaning: 'आभारी / कृतज्ञ होना (व्यक्ति के प्रति)',
    englishMeaning: 'Indebted or grateful to a person for a favor',
    category: 'adjective',
    example: 'I am highly obliged to my teacher for his guidance.',
    examFrequency: 'very-high',
    repeatedIn: ['SSC CHSL', 'Steno']
  },
  {
    id: 'fp-opposed-to',
    word: 'Opposed',
    preposition: 'to',
    phrase: 'Opposed to',
    hindiMeaning: 'विरोधी होना (+ V-ing)',
    englishMeaning: 'Resistant or hostile to a policy or concept',
    category: 'adjective',
    example: 'The environmentalist was strongly opposed to cutting forest trees.',
    examFrequency: 'high',
    repeatedIn: ['SSC CGL', 'Bank Clerk']
  },
  {
    id: 'fp-prone-to',
    word: 'Prone',
    preposition: 'to',
    phrase: 'Prone to',
    hindiMeaning: 'प्रवृत्त / की आशंका होना (+ V-ing/noun)',
    englishMeaning: 'Likely to suffer from, do, or experience something regrettable',
    category: 'adjective',
    example: 'Careless riders are prone to highway accidents.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'Bank PO', 'CDS']
  },
  {
    id: 'fp-similar-to',
    word: 'Similar',
    preposition: 'to',
    phrase: 'Similar to',
    hindiMeaning: 'के समान होना',
    englishMeaning: 'Having a resemblance in appearance, character, or quantity',
    category: 'adjective',
    example: 'Her analytical approach is very similar to mine.',
    examFrequency: 'high',
    repeatedIn: ['SSC MTS', 'CHSL']
  },
  {
    id: 'fp-subordinate-to',
    word: 'Subordinate',
    preposition: 'to',
    phrase: 'Subordinate to',
    hindiMeaning: 'अधीनस्थ होना',
    englishMeaning: 'Lower in rank, authority, or importance',
    category: 'adjective',
    example: 'A deputy commissioner is subordinate to the commissioner.',
    examFrequency: 'high',
    repeatedIn: ['SSC CPO', 'CDS']
  },
  {
    id: 'fp-vulnerable-to',
    word: 'Vulnerable',
    preposition: 'to',
    phrase: 'Vulnerable to',
    hindiMeaning: 'असुरक्षित / सुभेद्य होना',
    englishMeaning: 'Exposed to the possibility of being attacked or harmed',
    category: 'adjective',
    example: 'Infants are particularly vulnerable to viral infections.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'Bank PO']
  },
  {
    id: 'fp-with-a-view-to',
    word: 'With a view',
    preposition: 'to',
    phrase: 'With a view to',
    hindiMeaning: 'के उद्देश्य से (+ V-ing)',
    englishMeaning: 'With the hope, aim, or intention of doing something',
    category: 'noun',
    example: 'He shifted to Delhi with a view to preparing for civil services.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'CPO', 'Bank PO', 'CDS'],
    examTrapTip: "'With a view to' always takes a Gerund (V-ing), NOT base verb! e.g., 'with a view to preparing' (not prepare)."
  },
  {
    id: 'fp-yield-to',
    word: 'Yield',
    preposition: 'to',
    phrase: 'Yield to',
    hindiMeaning: 'दबाव या शत्रु के सामने झुकना / समर्पण करना',
    englishMeaning: 'To give way to arguments, demands, or pressure',
    category: 'verb',
    example: 'The principled freedom fighter refused to yield to British pressure.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'NDA', 'CDS']
  },

  // ── FOR ─────────────────────────────────────────────────────────
  {
    id: 'fp-apologize-for',
    word: 'Apologize',
    preposition: 'for',
    phrase: 'Apologize for',
    hindiMeaning: 'गलती के लिए क्षमा मांगना',
    englishMeaning: 'To express regret for something done wrong',
    category: 'verb',
    example: 'He sincerely apologized for his unpunctual behavior.',
    examFrequency: 'very-high',
    repeatedIn: ['SSC CHSL', 'Bank Clerk'],
    examTrapTip: "Apologize TO a person FOR a mistake. e.g. 'I apologized TO the teacher FOR my delay'."
  },
  {
    id: 'fp-ask-for',
    word: 'Ask',
    preposition: 'for',
    phrase: 'Ask for',
    hindiMeaning: 'मांग करना / निवेदन करना',
    englishMeaning: 'To make a request for something',
    category: 'verb',
    example: 'The striking workers asked for a fair salary revision.',
    examFrequency: 'high',
    repeatedIn: ['SSC MTS', 'Steno']
  },
  {
    id: 'fp-crave-for',
    word: 'Crave',
    preposition: 'for',
    phrase: 'Crave for',
    hindiMeaning: 'तीव्र इच्छा होना',
    englishMeaning: 'To feel a powerful desire for something',
    category: 'verb',
    example: 'Solitary thinkers often crave for peace and tranquility.',
    examFrequency: 'very-high',
    repeatedIn: ['SSC CGL', 'CDS']
  },
  {
    id: 'fp-eligible-for',
    word: 'Eligible',
    preposition: 'for',
    phrase: 'Eligible for',
    hindiMeaning: 'पात्र / योग्य होना',
    englishMeaning: 'Meeting the necessary requirements or conditions',
    category: 'adjective',
    example: 'Graduates above 20 years are eligible for the inspector post.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'CHSL', 'MTS', 'Bank PO']
  },
  {
    id: 'fp-famous-for',
    word: 'Famous',
    preposition: 'for',
    phrase: 'Famous for',
    hindiMeaning: 'के लिए प्रसिद्ध होना',
    englishMeaning: 'Known about by many people for a specified attribute',
    category: 'adjective',
    example: 'Jaipur is famous for its majestic historic palaces.',
    examFrequency: 'high',
    repeatedIn: ['SSC MTS', 'CHSL']
  },
  {
    id: 'fp-fit-for',
    word: 'Fit',
    preposition: 'for',
    phrase: 'Fit for',
    hindiMeaning: 'उपयुक्त होना',
    englishMeaning: 'Suitable of the required standard',
    category: 'adjective',
    example: 'This contaminated water is not fit for drinking.',
    examFrequency: 'high',
    repeatedIn: ['SSC CHSL', 'State PSC']
  },
  {
    id: 'fp-grateful-for',
    word: 'Grateful',
    preposition: 'for',
    phrase: 'Grateful for',
    hindiMeaning: 'कृपा या मदद के लिए आभारी होना',
    englishMeaning: 'Feeling or showing an appreciation of kindness',
    category: 'adjective',
    example: 'I am grateful to my uncle for his financial backing.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'Bank PO', 'CDS'],
    examTrapTip: "Grateful TO a person FOR help/favor. e.g. 'Grateful TO God FOR blessings'."
  },
  {
    id: 'fp-hope-for',
    word: 'Hope',
    preposition: 'for',
    phrase: 'Hope for',
    hindiMeaning: 'अच्छे की आशा करना',
    englishMeaning: 'To desire with expectation of fulfillment',
    category: 'verb',
    example: 'We must prepare for the worst while hoping for the best.',
    examFrequency: 'high',
    repeatedIn: ['SSC MTS', 'CHSL']
  },
  {
    id: 'fp-notorious-for',
    word: 'Notorious',
    preposition: 'for',
    phrase: 'Notorious for',
    hindiMeaning: 'बुरे काम के लिए कुख्यात होना',
    englishMeaning: 'Widely known for some bad quality or crime',
    category: 'adjective',
    example: 'The highway crossing was notorious for reckless collisions.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'CPO', 'NDA']
  },
  {
    id: 'fp-qualified-for',
    word: 'Qualified',
    preposition: 'for',
    phrase: 'Qualified for',
    hindiMeaning: 'योग्यता प्राप्त होना',
    englishMeaning: 'Having the required qualifications or capacity',
    category: 'adjective',
    example: 'Only certified chartered accountants are qualified for this audit.',
    examFrequency: 'high',
    repeatedIn: ['SSC CGL', 'Bank PO']
  },
  {
    id: 'fp-responsible-for',
    word: 'Responsible',
    preposition: 'for',
    phrase: 'Responsible for',
    hindiMeaning: 'कार्य या परिणाम के लिए जिम्मेदार होना',
    englishMeaning: 'Having an obligation to do something, or having control over or care for someone',
    category: 'adjective',
    example: 'The site contractor is responsible for structural safety.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'CHSL', 'Bank PO'],
    examTrapTip: "Responsible TO an authority (person/boss). Responsible FOR an action/duty."
  },
  {
    id: 'fp-taste-for',
    word: 'Taste',
    preposition: 'for',
    phrase: 'Taste for',
    hindiMeaning: 'रुचि या शौक होना',
    englishMeaning: 'A person’s liking for or interest in something',
    category: 'noun',
    example: 'He developed a discerning taste for classical Sanskrit poetry.',
    examFrequency: 'very-high',
    repeatedIn: ['SSC CGL', 'CDS']
  },
  {
    id: 'fp-wait-for',
    word: 'Wait',
    preposition: 'for',
    phrase: 'Wait for',
    hindiMeaning: 'प्रतीक्षा करना',
    englishMeaning: 'To stay where one is or delay action until a particular time or event',
    category: 'verb',
    example: 'The candidates waited for the final merit list anxiously.',
    examFrequency: 'high',
    repeatedIn: ['SSC MTS', 'CHSL'],
    examTrapTip: "'Wait for' equals 'Await'. 'Await' never takes 'for'! e.g., 'awaiting the results' (not awaiting for)."
  },
  {
    id: 'fp-yearn-for',
    word: 'Yearn',
    preposition: 'for',
    phrase: 'Yearn for',
    hindiMeaning: 'तीव्र तड़प या लालसा होना',
    englishMeaning: 'To have an intense feeling of longing for something',
    category: 'verb',
    example: 'Expatriates often yearn for the familiar festivals of home.',
    examFrequency: 'very-high',
    repeatedIn: ['SSC CGL', 'Bank PO']
  },

  // ── WITH ────────────────────────────────────────────────────────
  {
    id: 'fp-acquaint-with',
    word: 'Acquaint',
    preposition: 'with',
    phrase: 'Acquaint with',
    hindiMeaning: 'परिचित कराना',
    englishMeaning: 'To make someone aware of or familiar with',
    category: 'verb',
    example: 'New recruits must acquaint themselves with banking regulations.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'Bank PO', 'CDS']
  },
  {
    id: 'fp-agree-with',
    word: 'Agree',
    preposition: 'with',
    phrase: 'Agree with',
    hindiMeaning: 'किसी व्यक्ति से सहमत होना',
    englishMeaning: 'To have the same opinion as another person',
    category: 'verb',
    example: 'I fully agree with the professor on this macroeconomic issue.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'CHSL', 'Bank PO', 'CDS'],
    confusingPairId: 'cp-agree'
  },
  {
    id: 'fp-angry-with',
    word: 'Angry',
    preposition: 'with',
    phrase: 'Angry with',
    hindiMeaning: 'किसी व्यक्ति से नाराज होना',
    englishMeaning: 'Feeling or showing strong annoyance towards a person',
    category: 'adjective',
    example: 'The manager was deeply angry with the careless cashier.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'CHSL', 'CPO', 'Bank PO', 'NDA'],
    confusingPairId: 'cp-angry',
    examTrapTip: "Angry WITH a person (e.g. angry with Mohan). Angry AT an action, situation, or thing (e.g. angry at his insolence)."
  },
  {
    id: 'fp-busy-with',
    word: 'Busy',
    preposition: 'with',
    phrase: 'Busy with',
    hindiMeaning: 'काम में व्यस्त होना',
    englishMeaning: 'Having a great deal to do; occupied',
    category: 'adjective',
    example: 'The accountant is busy with financial year-end closing.',
    examFrequency: 'high',
    repeatedIn: ['SSC CHSL', 'MTS']
  },
  {
    id: 'fp-charge-with',
    word: 'Charge',
    preposition: 'with',
    phrase: 'Charge with',
    hindiMeaning: 'अपराध का आरोप लगाना',
    englishMeaning: 'To officially accuse someone of a crime',
    category: 'verb',
    example: 'The suspect was formally charged with armed burglary.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'CPO', 'CDS'],
    examTrapTip: "Charged WITH a crime, but Accused OF a crime."
  },
  {
    id: 'fp-comply-with',
    word: 'Comply',
    preposition: 'with',
    phrase: 'Comply with',
    hindiMeaning: 'नियमों / आदेशों का पालन करना',
    englishMeaning: 'To act in accordance with a wish or command',
    category: 'verb',
    example: 'All factories must comply with environmental emissions norms.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'CHSL', 'Bank PO', 'NDA']
  },
  {
    id: 'fp-cope-with',
    word: 'Cope',
    preposition: 'with',
    phrase: 'Cope with',
    hindiMeaning: 'सफलतापूर्वक सामना करना / निपटना',
    englishMeaning: 'To deal effectively with something difficult',
    category: 'verb',
    example: 'He found it challenging to cope with the rigorous training regime.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'CHSL', 'CPO', 'Bank PO', 'NDA', 'CDS'],
    confusingPairId: 'cp-cope',
    examTrapTip: "SUPER FREQUENT EXAM TRAP: 'Cope up with' is 100% INCORRECT! The correct idiom is always 'Cope with'."
  },
  {
    id: 'fp-deal-with',
    word: 'Deal',
    preposition: 'with',
    phrase: 'Deal with',
    hindiMeaning: 'किसी व्यक्ति या विषय से निपटना',
    englishMeaning: 'To take action on, handle a person or subject',
    category: 'verb',
    example: 'An administrator must know how to deal with stubborn protestors.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'CHSL', 'CPO', 'Bank PO'],
    confusingPairId: 'cp-deal',
    examTrapTip: "Deal IN a trade or business ('He deals in textiles'). Deal WITH a person or problem ('He dealt with the crisis calmly')."
  },
  {
    id: 'fp-differ-with',
    word: 'Differ',
    preposition: 'with',
    phrase: 'Differ with',
    hindiMeaning: 'किसी व्यक्ति से मतभेद होना',
    englishMeaning: 'To disagree with a person in opinion',
    category: 'verb',
    example: 'I respect your perspective, but I differ with you on this policy.',
    examFrequency: 'very-high',
    repeatedIn: ['SSC CGL', 'Bank PO', 'CDS'],
    confusingPairId: 'cp-differ',
    examTrapTip: "Differ WITH a person in opinion. Differ FROM a thing in quality or characteristics."
  },
  {
    id: 'fp-endowed-with',
    word: 'Endowed',
    preposition: 'with',
    phrase: 'Endowed with',
    hindiMeaning: 'जन्मजात प्रतिभा या गुणों से सम्पन्न',
    englishMeaning: 'Naturally provided with a quality or ability',
    category: 'adjective',
    example: 'She is endowed with extraordinary mathematical acumen.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'Bank PO', 'CDS']
  },
  {
    id: 'fp-familiar-with',
    word: 'Familiar',
    preposition: 'with',
    phrase: 'Familiar with',
    hindiMeaning: 'विषय या कार्य की जानकारी होना',
    englishMeaning: 'Well acquainted with a topic or person',
    category: 'adjective',
    example: 'Are you familiar with the latest income tax filing software?',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'CHSL', 'MTS'],
    confusingPairId: 'cp-familiar',
    examTrapTip: "A person is familiar WITH a subject/language. A subject/voice is familiar TO a person."
  },
  {
    id: 'fp-part-with',
    word: 'Part',
    preposition: 'with',
    phrase: 'Part with',
    hindiMeaning: 'वस्तु या धन का त्याग करना',
    englishMeaning: 'To give up possession of something reluctantly',
    category: 'verb',
    example: 'The miser refused to part with a single rupee for charity.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'CPO', 'Bank PO', 'CDS'],
    confusingPairId: 'cp-part',
    examTrapTip: "Part WITH a thing or money ('He cannot part with his vintage watch'). Part FROM a person ('She parted from her friends with tears')."
  },
  {
    id: 'fp-pleased-with',
    word: 'Pleased',
    preposition: 'with',
    phrase: 'Pleased with',
    hindiMeaning: 'किसी व्यक्ति से प्रसन्न होना',
    englishMeaning: 'Feeling satisfaction about someone’s work or behavior',
    category: 'adjective',
    example: 'The commanding officer was pleased with the cadets’ discipline.',
    examFrequency: 'very-high',
    repeatedIn: ['SSC CHSL', 'MTS']
  },
  {
    id: 'fp-reconcile-with',
    word: 'Reconcile',
    preposition: 'with',
    phrase: 'Reconcile with',
    hindiMeaning: 'सुलह करना (किसी व्यक्ति से)',
    englishMeaning: 'To restore friendly relations with someone',
    category: 'verb',
    example: 'After a prolonged quarrel, the brothers reconciled with each other.',
    examFrequency: 'very-high',
    repeatedIn: ['SSC CGL', 'CDS'],
    examTrapTip: "Reconcile WITH a person (make peace). Reconcile oneself TO a situation/fate (accept reluctantly)."
  },
  {
    id: 'fp-satisfied-with',
    word: 'Satisfied',
    preposition: 'with',
    phrase: 'Satisfied with',
    hindiMeaning: 'संतुष्ट होना',
    englishMeaning: 'Contented or pleased because of accepted standards',
    category: 'adjective',
    example: 'The examiner was completely satisfied with her concise answers.',
    examFrequency: 'high',
    repeatedIn: ['SSC CHSL', 'Steno']
  },
  {
    id: 'fp-sympathize-with',
    word: 'Sympathize',
    preposition: 'with',
    phrase: 'Sympathize with',
    hindiMeaning: 'सहानुभूति रखना',
    englishMeaning: 'To feel compassion and sorrow for someone in distress',
    category: 'verb',
    example: 'We all sympathize with the flood-affected families.',
    examFrequency: 'very-high',
    repeatedIn: ['SSC CGL', 'Bank Clerk']
  },
  {
    id: 'fp-teem-with',
    word: 'Teem',
    preposition: 'with',
    phrase: 'Teem with',
    hindiMeaning: 'से भरपूर या खचाखच भरा होना',
    englishMeaning: 'To be full of or swarming with life/objects',
    category: 'verb',
    example: 'The tropical ocean reefs teem with colorful marine life.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'CPO', 'NDA']
  },

  // ── FROM ────────────────────────────────────────────────────────
  {
    id: 'fp-abstain-from',
    word: 'Abstain',
    preposition: 'from',
    phrase: 'Abstain from',
    hindiMeaning: 'बचना / परहेज करना (+ V-ing)',
    englishMeaning: 'To restrain oneself from indulging in something',
    category: 'verb',
    example: 'A doctor advised the diabetic patient to abstain from sugar.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'CHSL', 'CPO', 'Bank PO', 'CDS'],
    examTrapTip: "Abstain FROM + V-ing. (Refrain also takes 'from'. Abstain usually relates to food/drink/voting; Refrain relates to actions/habits)."
  },
  {
    id: 'fp-debar-from',
    word: 'Debar',
    preposition: 'from',
    phrase: 'Debar from',
    hindiMeaning: 'वंचित / निष्कासित करना (+ V-ing)',
    englishMeaning: 'To officially exclude someone from a right or competition',
    category: 'verb',
    example: 'The student was debarred from sitting in the examination.',
    examFrequency: 'very-high',
    repeatedIn: ['SSC CGL', 'CPO']
  },
  {
    id: 'fp-differ-from',
    word: 'Differ',
    preposition: 'from',
    phrase: 'Differ from',
    hindiMeaning: 'वस्तु या विशेषता में भिन्न होना',
    englishMeaning: 'To be unlike or dissimilar in nature or form',
    category: 'verb',
    example: 'Indian constitutional federalism differs from American federalism.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'CHSL', 'Bank PO'],
    confusingPairId: 'cp-differ'
  },
  {
    id: 'fp-different-from',
    word: 'Different',
    preposition: 'from',
    phrase: 'Different from',
    hindiMeaning: 'से अलग या भिन्न',
    englishMeaning: 'Not the same as another or each other',
    category: 'adjective',
    example: 'His spoken English dialect is quite different from mine.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'CHSL', 'MTS'],
    examTrapTip: "Always use 'different FROM'. 'Different than' is widely tested and flagged as an error in SSC/Bank exams."
  },
  {
    id: 'fp-die-from',
    word: 'Die',
    preposition: 'from',
    phrase: 'Die from',
    hindiMeaning: 'घाव / अत्यधिक काम / बाहरी कारण से मरना',
    englishMeaning: 'To die because of an external injury, wound or cause',
    category: 'verb',
    example: 'The soldier died from fatal bullet wounds on the battlefield.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'Bank PO', 'CDS'],
    confusingPairId: 'cp-die'
  },
  {
    id: 'fp-escape-from',
    word: 'Escape',
    preposition: 'from',
    phrase: 'Escape from',
    hindiMeaning: 'भाग निकलना / बच निकलना',
    englishMeaning: 'To break free from confinement or danger',
    category: 'verb',
    example: 'The notorious convicts escaped from high-security jail.',
    examFrequency: 'high',
    repeatedIn: ['SSC MTS', 'CHSL']
  },
  {
    id: 'fp-exempt-from',
    word: 'Exempt',
    preposition: 'from',
    phrase: 'Exempt from',
    hindiMeaning: 'छूट प्राप्त होना',
    englishMeaning: 'Free from an obligation or liability imposed on others',
    category: 'adjective',
    example: 'Charitable trusts are exempt from certain municipal taxes.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'Bank PO', 'CDS']
  },
  {
    id: 'fp-part-from',
    word: 'Part',
    preposition: 'from',
    phrase: 'Part from',
    hindiMeaning: 'किसी व्यक्ति से विदा लेना / अलग होना',
    englishMeaning: 'To leave or separate from a person',
    category: 'verb',
    example: 'He parted from his childhood companions at the railway station.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'CHSL', 'CPO'],
    confusingPairId: 'cp-part'
  },
  {
    id: 'fp-prevent-from',
    word: 'Prevent',
    preposition: 'from',
    phrase: 'Prevent from',
    hindiMeaning: 'रोकना / बाधा डालना (+ V-ing)',
    englishMeaning: 'To stop something from happening or someone from doing something',
    category: 'verb',
    example: 'Heavy police deployment prevented the mob from rioting.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'CHSL', 'MTS', 'Bank PO'],
    examTrapTip: "'Prevent' is followed by 'from' + Gerund (V-ing). e.g., 'prevented him from entering' (not to enter)."
  },
  {
    id: 'fp-prohibit-from',
    word: 'Prohibit',
    preposition: 'from',
    phrase: 'Prohibit from',
    hindiMeaning: 'निषेध करना (+ V-ing)',
    englishMeaning: 'Formally forbid someone from doing something by law',
    category: 'verb',
    example: 'Citizens are prohibited from parking inside the security zone.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'CPO', 'NDA'],
    examTrapTip: "Prohibit takes 'from' + V-ing ('prohibited from parking'). Forbid takes 'to' + V1 ('forbade him to park')."
  },
  {
    id: 'fp-refrain-from',
    word: 'Refrain',
    preposition: 'from',
    phrase: 'Refrain from',
    hindiMeaning: 'बचना / संयम रखना (+ V-ing)',
    englishMeaning: 'To stop oneself from doing something',
    category: 'verb',
    example: 'Please refrain from smoking inside public transport.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'CHSL', 'Bank PO', 'CDS'],
    examTrapTip: "'Refrain from' takes V-ing. (Used for temporary or moral self-control in actions, e.g. refraining from speech/smoking)."
  },
  {
    id: 'fp-suffer-from',
    word: 'Suffer',
    preposition: 'from',
    phrase: 'Suffer from',
    hindiMeaning: 'बीमारी या पीड़ा से ग्रस्त होना',
    englishMeaning: 'To experience illness or distressing condition',
    category: 'verb',
    example: 'The patient was suffering from acute viral hepatitis.',
    examFrequency: 'essential',
    repeatedIn: ['SSC MTS', 'CHSL']
  },

  // ── IN ──────────────────────────────────────────────────────────
  {
    id: 'fp-absorbed-in',
    word: 'Absorbed',
    preposition: 'in',
    phrase: 'Absorbed in',
    hindiMeaning: 'पूरी तरह लीन / मग्न होना',
    englishMeaning: 'Having one’s attention wholly engaged or engrossed',
    category: 'adjective',
    example: 'The scholar was deeply absorbed in reading ancient manuscripts.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'CHSL', 'Bank PO']
  },
  {
    id: 'fp-accomplished-in',
    word: 'Accomplished',
    preposition: 'in',
    phrase: 'Accomplished in',
    hindiMeaning: 'निपुण / दक्ष होना',
    englishMeaning: 'Highly skilled or trained in an art or skill',
    category: 'adjective',
    example: 'She is an accomplished artist in oil painting and sculpture.',
    examFrequency: 'very-high',
    repeatedIn: ['SSC CGL', 'CDS']
  },
  {
    id: 'fp-believe-in',
    word: 'Believe',
    preposition: 'in',
    phrase: 'Believe in',
    hindiMeaning: 'विश्वास रखना',
    englishMeaning: 'To have faith in the truth or existence of something',
    category: 'verb',
    example: 'Always believe in your hard work and consistent preparation.',
    examFrequency: 'high',
    repeatedIn: ['SSC MTS', 'CHSL']
  },
  {
    id: 'fp-deal-in',
    word: 'Deal',
    preposition: 'in',
    phrase: 'Deal in',
    hindiMeaning: 'व्यापार करना / माल बेचना',
    englishMeaning: 'To buy and sell a particular product or commodity',
    category: 'verb',
    example: 'His family has dealt in precious gems for three generations.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'CHSL', 'CPO', 'Bank PO'],
    confusingPairId: 'cp-deal'
  },
  {
    id: 'fp-deficient-in',
    word: 'Deficient',
    preposition: 'in',
    phrase: 'Deficient in',
    hindiMeaning: 'कमी होना',
    englishMeaning: 'Not having enough of a specified quality or ingredient',
    category: 'adjective',
    example: 'This soil sample is deficient in nitrogen and phosphorus.',
    examFrequency: 'very-high',
    repeatedIn: ['SSC CGL', 'CDS']
  },
  {
    id: 'fp-excel-in',
    word: 'Excel',
    preposition: 'in',
    phrase: 'Excel in',
    hindiMeaning: 'उत्कृष्ट प्रदर्शन करना',
    englishMeaning: 'To be exceptionally good at or proficient in an activity',
    category: 'verb',
    example: 'With continuous practice, she excelled in quantitative aptitude.',
    examFrequency: 'very-high',
    repeatedIn: ['SSC CGL', 'Bank PO']
  },
  {
    id: 'fp-indulge-in',
    word: 'Indulge',
    preposition: 'in',
    phrase: 'Indulge in',
    hindiMeaning: 'संलग्न होना / लिप्त होना',
    englishMeaning: 'To allow oneself to enjoy or participate in something',
    category: 'verb',
    example: 'A serious aspirant should never indulge in fruitless arguments.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'CHSL', 'Bank PO']
  },
  {
    id: 'fp-interested-in',
    word: 'Interested',
    preposition: 'in',
    phrase: 'Interested in',
    hindiMeaning: 'रुचि रखना (+ V-ing)',
    englishMeaning: 'Showing curiosity or concern about something',
    category: 'adjective',
    example: 'Are you interested in pursuing advanced data analytics?',
    examFrequency: 'high',
    repeatedIn: ['SSC MTS', 'CHSL']
  },
  {
    id: 'fp-interfere-in',
    word: 'Interfere',
    preposition: 'in',
    phrase: 'Interfere in',
    hindiMeaning: 'दूसरों के मामलों में दखलंदाजी करना',
    englishMeaning: 'To meddle in other people’s affairs uninvited',
    category: 'verb',
    example: 'You should not interfere in the personal disputes of others.',
    examFrequency: 'very-high',
    repeatedIn: ['SSC CGL', 'CPO'],
    examTrapTip: "Interfere IN a matter/dispute. Interfere WITH a process/work ('Heavy rain interfered with the match')."
  },
  {
    id: 'fp-persist-in',
    word: 'Persist',
    preposition: 'in',
    phrase: 'Persist in',
    hindiMeaning: 'हठपूर्वक जारी रखना (+ V-ing)',
    englishMeaning: 'To continue firmly in an opinion or course of action',
    category: 'verb',
    example: 'If you persist in breaking traffic rules, your license will be suspended.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'Bank PO', 'CDS']
  },
  {
    id: 'fp-rich-in',
    word: 'Rich',
    preposition: 'in',
    phrase: 'Rich in',
    hindiMeaning: 'प्रचुर मात्रा में होना',
    englishMeaning: 'Containing large amounts of a valuable substance',
    category: 'adjective',
    example: 'Fresh citrus fruits are exceptionally rich in Vitamin C.',
    examFrequency: 'high',
    repeatedIn: ['SSC CHSL', 'MTS']
  },
  {
    id: 'fp-succeed-in',
    word: 'Succeed',
    preposition: 'in',
    phrase: 'Succeed in',
    hindiMeaning: 'सफल होना (+ V-ing)',
    englishMeaning: 'To achieve the desired aim or result',
    category: 'verb',
    example: 'After three years of relentless toil, he succeeded in clearing UPSC.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'Bank PO', 'NDA'],
    examTrapTip: "'Succeed in' takes Gerund (V-ing): 'succeeded in passing' (NOT succeeded to pass)."
  },
  {
    id: 'fp-versed-in',
    word: 'Versed',
    preposition: 'in',
    phrase: 'Versed in',
    hindiMeaning: 'दक्ष / निपुण होना',
    englishMeaning: 'Experienced or skilled in a subject',
    category: 'adjective',
    example: 'The senior advocate is well versed in constitutional jurisprudence.',
    examFrequency: 'very-high',
    repeatedIn: ['SSC CGL', 'Bank PO']
  },

  // ── ON / UPON ───────────────────────────────────────────────────
  {
    id: 'fp-act-on',
    word: 'Act',
    preposition: 'on',
    phrase: 'Act on',
    hindiMeaning: 'सलाह के अनुसार काम करना',
    englishMeaning: 'To take action as a result of advice or information',
    category: 'verb',
    example: 'The detective acted on a confidential tip from an informant.',
    examFrequency: 'high',
    repeatedIn: ['SSC CHSL', 'CPO']
  },
  {
    id: 'fp-agree-on',
    word: 'Agree',
    preposition: 'on',
    phrase: 'Agree on',
    hindiMeaning: 'विचार-विमर्श के बाद सहमति पर पहुंचना',
    englishMeaning: 'To reach a mutual decision on a topic or terms',
    category: 'verb',
    example: 'Both political parties agreed on the clauses of the anti-corruption bill.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'Bank PO'],
    confusingPairId: 'cp-agree'
  },
  {
    id: 'fp-bank-on',
    word: 'Bank',
    preposition: 'on',
    phrase: 'Bank on',
    hindiMeaning: 'भरोसा करना',
    englishMeaning: 'To rely or depend on with certainty',
    category: 'verb',
    example: 'You can always bank on his unwavering loyalty in hard times.',
    examFrequency: 'very-high',
    repeatedIn: ['SSC CGL', 'Bank Clerk']
  },
  {
    id: 'fp-congratulate-on',
    word: 'Congratulate',
    preposition: 'on',
    phrase: 'Congratulate on',
    hindiMeaning: 'बधाई देना',
    englishMeaning: 'To praise someone for a particular achievement',
    category: 'verb',
    example: 'The principal congratulated the students on their academic excellence.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'CHSL', 'CPO', 'Bank PO', 'NDA', 'CDS'],
    confusingPairId: 'cp-congratulate',
    examTrapTip: "CRITICAL EXAM TRAP: Examiners frequently write 'congratulated for his success' which is INCORRECT. Always use 'congratulate ON'!"
  },
  {
    id: 'fp-depend-on',
    word: 'Depend',
    preposition: 'on',
    phrase: 'Depend on',
    hindiMeaning: 'निर्भर होना',
    englishMeaning: 'To be determined by or reliant upon something',
    category: 'verb',
    example: 'Your exam ranking depends on your accuracy and consistency.',
    examFrequency: 'essential',
    repeatedIn: ['SSC MTS', 'CHSL']
  },
  {
    id: 'fp-encroach-on',
    word: 'Encroach',
    preposition: 'on',
    phrase: 'Encroach on',
    hindiMeaning: 'अतिक्रमण करना / सीमा लांघना',
    englishMeaning: 'To intrude gradually on a person’s rights or territory',
    category: 'verb',
    example: 'Illegal builders had encroached on the municipal lake land.',
    examFrequency: 'very-high',
    repeatedIn: ['SSC CGL', 'CDS']
  },
  {
    id: 'fp-insist-on',
    word: 'Insist',
    preposition: 'on',
    phrase: 'Insist on',
    hindiMeaning: 'जोर देना / आग्रह करना (+ V-ing)',
    englishMeaning: 'To demand something forcefully without accepting refusal',
    category: 'verb',
    example: 'The auditor insisted on inspecting all transaction vouchers.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'CHSL', 'Bank PO', 'NDA'],
    examTrapTip: "'Insist on' is followed by Gerund (V-ing), e.g. 'insisted on going' (not insisted to go)."
  },
  {
    id: 'fp-rely-on',
    word: 'Rely',
    preposition: 'on',
    phrase: 'Rely on',
    hindiMeaning: 'भरोसा या निर्भर करना',
    englishMeaning: 'To trust with confidence',
    category: 'verb',
    example: 'Never rely solely on unreliable social media rumors.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CHSL', 'MTS']
  },

  // ── AT ──────────────────────────────────────────────────────────
  {
    id: 'fp-aim-at',
    word: 'Aim',
    preposition: 'at',
    phrase: 'Aim at',
    hindiMeaning: 'निशाना साधना / लक्ष्य रखना',
    englishMeaning: 'To point or direct towards a specific target',
    category: 'verb',
    example: 'The archer aimed at the center bullseye with precision.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'CHSL', 'NDA']
  },
  {
    id: 'fp-alarmed-at',
    word: 'Alarmed',
    preposition: 'at',
    phrase: 'Alarmed at',
    hindiMeaning: 'घटना या खबर से घबरा जाना',
    englishMeaning: 'Frightened or disturbed by an event',
    category: 'adjective',
    example: 'The investors were alarmed at the sudden stock market slump.',
    examFrequency: 'high',
    repeatedIn: ['SSC CGL', 'Bank PO']
  },
  {
    id: 'fp-angry-at',
    word: 'Angry',
    preposition: 'at',
    phrase: 'Angry at',
    hindiMeaning: 'किसी स्थिति / व्यवहार पर नाराज होना',
    englishMeaning: 'Feeling anger directed towards a situation or deed',
    category: 'adjective',
    example: 'The supervisor was angry at his unprovoked negligence.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'CHSL', 'CPO'],
    confusingPairId: 'cp-angry'
  },
  {
    id: 'fp-astonished-at',
    word: 'Astonished',
    preposition: 'at',
    phrase: 'Astonished at',
    hindiMeaning: 'हैरान / चकित होना',
    englishMeaning: 'Greatly surprised or impressed',
    category: 'adjective',
    example: 'The tourists were astonished at the grandeur of the Taj Mahal.',
    examFrequency: 'very-high',
    repeatedIn: ['SSC CGL', 'CDS', 'MTS']
  },
  {
    id: 'fp-glance-at',
    word: 'Glance',
    preposition: 'at',
    phrase: 'Glance at',
    hindiMeaning: 'एक नजर देखना',
    englishMeaning: 'To take a brief or hurried look',
    category: 'verb',
    example: 'He glanced at his wristwatch during the competitive interview.',
    examFrequency: 'high',
    repeatedIn: ['SSC CHSL', 'Steno']
  },
  {
    id: 'fp-good-at',
    word: 'Good',
    preposition: 'at',
    phrase: 'Good at',
    hindiMeaning: 'किसी विषय या कार्य में निपुण होना',
    englishMeaning: 'Possessing skill or aptitude in a specific subject',
    category: 'adjective',
    example: 'Pooja is exceptionally good at solving mental arithmetic.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'CHSL', 'MTS', 'Bank PO'],
    examTrapTip: "COMMON ERROR: Saying 'good in English' or 'good in Maths' is WRONG! Always say 'Good AT Mathematics'."
  },
  {
    id: 'fp-laugh-at',
    word: 'Laugh',
    preposition: 'at',
    phrase: 'Laugh at',
    hindiMeaning: 'हंसी उड़ाना / उपहास करना',
    englishMeaning: 'To mock or express ridicule towards someone',
    category: 'verb',
    example: 'It is unkind to laugh at the physical infirmities of others.',
    examFrequency: 'very-high',
    repeatedIn: ['SSC CHSL', 'MTS']
  },
  {
    id: 'fp-look-at',
    word: 'Look',
    preposition: 'at',
    phrase: 'Look at',
    hindiMeaning: 'की ओर देखना',
    englishMeaning: 'To direct one’s gaze towards someone or something',
    category: 'verb',
    example: 'Look at the blackboard to note down the algebraic formula.',
    examFrequency: 'high',
    repeatedIn: ['SSC MTS', 'CHSL']
  },
  {
    id: 'fp-stare-at',
    word: 'Stare',
    preposition: 'at',
    phrase: 'Stare at',
    hindiMeaning: 'घूरना / टकटकी लगाना',
    englishMeaning: 'To gaze fixedly with eyes wide open',
    category: 'verb',
    example: 'It is impolite to stare at strangers in the metro.',
    examFrequency: 'high',
    repeatedIn: ['SSC CHSL', 'Steno']
  },

  // ── INTO ────────────────────────────────────────────────────────
  {
    id: 'fp-break-into',
    word: 'Break',
    preposition: 'into',
    phrase: 'Break into',
    hindiMeaning: 'जबरन या चोरी से घुसना',
    englishMeaning: 'To enter a building by force or stealth',
    category: 'verb',
    example: 'Thieves broke into the jewelry shop through the back window.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'CHSL', 'Bank Clerk']
  },
  {
    id: 'fp-change-into',
    word: 'Change',
    preposition: 'into',
    phrase: 'Change into',
    hindiMeaning: 'परिवर्तित होना',
    englishMeaning: 'To turn or transform from one state to another',
    category: 'verb',
    example: 'Upon heating, solid ice immediately changes into liquid water.',
    examFrequency: 'high',
    repeatedIn: ['SSC MTS', 'CHSL']
  },
  {
    id: 'fp-look-into',
    word: 'Look',
    preposition: 'into',
    phrase: 'Look into',
    hindiMeaning: 'मामले की जांच-पड़ताल करना',
    englishMeaning: 'To investigate a case or problem thoroughly',
    category: 'verb',
    example: 'The police commissioner promised to look into the corruption case.',
    examFrequency: 'essential',
    repeatedIn: ['SSC CGL', 'CHSL', 'CPO', 'Bank PO'],
    examTrapTip: "'Look into' = investigate. Notice: 'Investigate' does NOT take 'into' (e.g. 'police investigated the case', not investigated into)."
  },
  {
    id: 'fp-translate-into',
    word: 'Translate',
    preposition: 'into',
    phrase: 'Translate into',
    hindiMeaning: 'दूसरी भाषा में अनुवाद करना',
    englishMeaning: 'To express the sense of words in another language',
    category: 'verb',
    example: 'Please translate this official circular from English into Hindi.',
    examFrequency: 'high',
    repeatedIn: ['SSC Steno', 'MTS']
  }
];

// ═══════════════════════════════════════════════════════════════════
// 2. CONFUSING PAIRS & EXAM TRAPS DATA (Top 10 High Frequency)
// ═══════════════════════════════════════════════════════════════════
export const CONFUSING_PREPOSITION_PAIRS: ConfusingPairGroup[] = [
  {
    id: 'cp-die',
    title: 'Die OF vs Die FROM vs Die FOR',
    coreRule: 'Exam Rule: Die OF is used for internal diseases or hunger/thirst. Die FROM is used for external causes like wounds or overwork. Die FOR is used for a noble cause/country.',
    items: [
      {
        phrase: 'Die OF',
        condition: 'Used for Disease, Hunger, Thirst, Starvation, Cancer, Cholera',
        hindiMeaning: 'बीमारी या भूख से मरना',
        example: 'He died of cholera. (NOT died from cholera)',
        trapWarning: 'Never write "died from disease" in exam papers.'
      },
      {
        phrase: 'Die FROM',
        condition: 'Used for External Causes: Wound, Overwork, Loss of blood, Poison',
        hindiMeaning: 'घाव या अधिक काम के प्रभाव से मरना',
        example: 'The soldier died from loss of blood. (External consequence)'
      },
      {
        phrase: 'Die FOR',
        condition: 'Used for a noble cause, beliefs or motherland',
        hindiMeaning: 'देश या नेक काम के लिए शहीद होना',
        example: 'Freedom fighters died for their country.'
      }
    ]
  },
  {
    id: 'cp-agree',
    title: 'Agree WITH vs Agree TO vs Agree ON',
    coreRule: 'Exam Rule: Agree WITH a person. Agree TO a proposal, plan, or view. Agree ON a point or topic after discussion.',
    items: [
      {
        phrase: 'Agree WITH',
        condition: 'Used when agreeing with a Person',
        hindiMeaning: 'किसी व्यक्ति से सहमत होना',
        example: 'I agree with you completely on this subject.'
      },
      {
        phrase: 'Agree TO',
        condition: 'Used when agreeing to a Proposal, Suggestion, Terms or Plan',
        hindiMeaning: 'किसी प्रस्ताव या योजना को स्वीकारना',
        example: 'The management agreed to the workers’ demands. (NOT agreed with proposal)'
      },
      {
        phrase: 'Agree ON',
        condition: 'Used when coming to a consensus on a Topic or Price',
        hindiMeaning: 'किसी मुद्दे या मूल्य पर सहमति बनना',
        example: 'Both delegates agreed on the draft treaty.'
      }
    ]
  },
  {
    id: 'cp-deal',
    title: 'Deal IN vs Deal WITH',
    coreRule: 'Exam Rule: Deal IN means to trade or buy/sell goods. Deal WITH means to handle a person, problem, or subject.',
    items: [
      {
        phrase: 'Deal IN',
        condition: 'To trade, conduct commerce or sell commodities',
        hindiMeaning: 'किसी वस्तु का व्यापार करना',
        example: 'His grandfather deals in antique furniture. (Trade)',
        trapWarning: 'Writing "He deals with rice" when talking about trade is WRONG. Say "deals in rice".'
      },
      {
        phrase: 'Deal WITH',
        condition: 'To handle a person, client, dispute or topic',
        hindiMeaning: 'किसी व्यक्ति या समस्या को संभालना',
        example: 'This book deals with the history of Indian independence.'
      }
    ]
  },
  {
    id: 'cp-angry',
    title: 'Angry WITH vs Angry AT',
    coreRule: 'Exam Rule: Angry WITH is used for a Person. Angry AT is used for an Action, Situation, or Inanimate object.',
    items: [
      {
        phrase: 'Angry WITH',
        condition: 'Used when expressing anger towards a Person',
        hindiMeaning: 'किसी व्यक्ति पर क्रोधित होना',
        example: 'The teacher was angry with Rohit for coming late.'
      },
      {
        phrase: 'Angry AT',
        condition: 'Used when angry at an Action, Behavior, or Situation',
        hindiMeaning: 'किसी हरकत या परिस्थिति पर क्रोधित होना',
        example: 'She was angry at the unfair evaluation of her answer sheet.'
      }
    ]
  },
  {
    id: 'cp-blind',
    title: 'Blind IN vs Blind TO',
    coreRule: 'Exam Rule: Blind IN refers to physical sight defect in one or both eyes. Blind TO refers to ignoring someone’s faults or vices.',
    items: [
      {
        phrase: 'Blind IN',
        condition: 'Physical loss of sight in left/right eye',
        hindiMeaning: 'आंख से अंधा होना (शारीरिक दोष)',
        example: 'The veteran is blind in his left eye due to shrapnel.'
      },
      {
        phrase: 'Blind TO',
        condition: 'Figurative: Intentionally or naively ignoring flaws',
        hindiMeaning: 'दोषों या कमियों के प्रति आंखें मूंदना',
        example: 'A prudent leader should never be blind to economic warnings.'
      }
    ]
  },
  {
    id: 'cp-part',
    title: 'Part FROM vs Part WITH',
    coreRule: 'Exam Rule: Part FROM is used when separating from a person. Part WITH is used when giving away or parting with a possession or money.',
    items: [
      {
        phrase: 'Part FROM',
        condition: 'Leaving or separating from a Person',
        hindiMeaning: 'किसी व्यक्ति से बिछुड़ना / अलग होना',
        example: 'She parted from her mother with a heavy heart.'
      },
      {
        phrase: 'Part WITH',
        condition: 'Giving up a Thing, Property, or Money',
        hindiMeaning: 'किसी वस्तु या धन का त्याग करना',
        example: 'A miser finds it agonizing to part with his wealth.'
      }
    ]
  },
  {
    id: 'cp-cope',
    title: 'Cope WITH (Never "Cope up with")',
    coreRule: 'THE #1 ERROR SPOT RULE: "Cope up with" is non-standard and rejected by all competitive exam boards. The correct grammatical phrase is always "Cope with".',
    items: [
      {
        phrase: 'Cope WITH',
        condition: 'Correct standard English for managing difficulties',
        hindiMeaning: 'मुश्किलों का सफलतापूर्वक सामना करना',
        example: 'She was unable to cope with the mounting exam stress. (CORRECT)',
        trapWarning: 'ERROR IN EXAMS: "She could not cope up with the workload." (INCORRECT - remove "up")'
      }
    ]
  },
  {
    id: 'cp-latin-comparatives',
    title: 'Latin Comparatives take "TO" (Not "THAN")',
    coreRule: 'Exam Rule: Adjectives ending in -ior (Senior, Junior, Superior, Inferior, Prior) and "Preferable" always take "TO", never "THAN".',
    items: [
      {
        phrase: 'Senior / Junior / Superior TO',
        condition: 'Used for comparisons of rank, age, or quality',
        hindiMeaning: 'पद, उम्र या गुणवत्ता में तुलना',
        example: 'Suresh is senior to me by three years. (NOT senior than me)',
        trapWarning: 'Saying "he is senior than me" is the most repeated error in SSC CGL.'
      },
      {
        phrase: 'Preferable TO',
        condition: 'Takes "TO" and never takes "more" (double comparative error)',
        hindiMeaning: 'अधिक पसंद या बेहतर होना',
        example: 'Fresh fruit juice is preferable to packaged soda. (CORRECT)'
      }
    ]
  },
  {
    id: 'cp-congratulate',
    title: 'Congratulate ON (Never "Congratulate for")',
    coreRule: 'Exam Rule: One is congratulated ON success, achievement, or birthday. Using "congratulate for" is a standard error spotting trap.',
    items: [
      {
        phrase: 'Congratulate ON',
        condition: 'Congratulate a person ON an achievement',
        hindiMeaning: 'सफलता या उपलब्धि पर बधाई देना',
        example: 'I congratulated him on securing Rank 1 in SSC CGL. (CORRECT)',
        trapWarning: 'INCORRECT: "I congratulated him for his success." Always change "for" to "on".'
      }
    ]
  },
  {
    id: 'cp-familiar',
    title: 'Familiar WITH vs Familiar TO',
    coreRule: 'Exam Rule: A person is familiar WITH a subject or language. A voice, face or topic is familiar TO a person.',
    items: [
      {
        phrase: 'Familiar WITH',
        condition: 'Person is the subject: Person is familiar WITH topic/place',
        hindiMeaning: 'व्यक्ति किसी विषय का जानकार है',
        example: 'He is familiar with every shortcut in this city.'
      },
      {
        phrase: 'Familiar TO',
        condition: 'Thing is the subject: Voice/name is familiar TO a person',
        hindiMeaning: 'कोई चीज किसी व्यक्ति को जानी-पहचानी लगती है',
        example: 'That stranger’s voice sounded very familiar to me.'
      }
    ]
  }
];

// ═══════════════════════════════════════════════════════════════════
// 3. RAPID-FIRE QUIZ QUESTIONS (30 High Yield PYQ-based MCQs)
// ═══════════════════════════════════════════════════════════════════
export const FIXED_PREPOSITION_QUIZ_QUESTIONS: FixedPrepositionQuizQuestion[] = [
  {
    id: 'fpq-1',
    sentence: 'The candidate was accused _____ forging his caste certificate.',
    correctPreposition: 'of',
    options: ['with', 'of', 'for', 'about'],
    phrase: 'Accused of',
    hindiMeaning: 'आरोप लगाना',
    explanation: "'Accuse' is always followed by the preposition 'of'. (Charged takes 'with').",
    examTag: 'SSC CGL 2023 Tier-1'
  },
  {
    id: 'fpq-2',
    sentence: 'The student could not cope _____ the heavy study workload.',
    correctPreposition: 'with',
    options: ['up with', 'with', 'about', 'from'],
    phrase: 'Cope with',
    hindiMeaning: 'सामना करना / निपटना',
    explanation: "'Cope up with' is grammatically INCORRECT in formal exams. The correct phrase is 'Cope with'.",
    examTag: 'SSC CHSL 2022'
  },
  {
    id: 'fpq-3',
    sentence: 'The principal congratulated the national toppers _____ their outstanding merit.',
    correctPreposition: 'on',
    options: ['for', 'on', 'at', 'about'],
    phrase: 'Congratulate on',
    hindiMeaning: 'बधाई देना',
    explanation: "'Congratulate' always takes the preposition 'on' when referring to success or an achievement.",
    examTag: 'SSC CGL 2021 Tier-2'
  },
  {
    id: 'fpq-4',
    sentence: 'His grandfather sadly died _____ malaria during the monsoon outbreak.',
    correctPreposition: 'of',
    options: ['from', 'with', 'of', 'by'],
    phrase: 'Die of',
    hindiMeaning: 'बीमारी से मरना',
    explanation: "When death is caused by an internal disease (malaria, cholera, cancer), we use 'die of'.",
    examTag: 'SSC CPO 2020'
  },
  {
    id: 'fpq-5',
    sentence: 'Fresh tender coconut water is preferable _____ synthetic carbonated drinks.',
    correctPreposition: 'to',
    options: ['than', 'to', 'over', 'against'],
    phrase: 'Preferable to',
    hindiMeaning: 'अधिक वांछनीय / बेहतर',
    explanation: "Words like 'preferable', 'senior', 'junior', and 'superior' always take 'to', never 'than'.",
    examTag: 'SSC CGL 2022 Tier-1'
  },
  {
    id: 'fpq-6',
    sentence: 'The honest merchant deals solely _____ organic handloom silk.',
    correctPreposition: 'in',
    options: ['with', 'in', 'at', 'for'],
    phrase: 'Deal in',
    hindiMeaning: 'व्यापार करना',
    explanation: "'Deal in' means to trade or buy/sell commodities. 'Deal with' means to handle a person or issue.",
    examTag: 'Bank PO 2021'
  },
  {
    id: 'fpq-7',
    sentence: 'Rohan is three years senior _____ me in the regional banking cadre.',
    correctPreposition: 'to',
    options: ['than', 'to', 'from', 'above'],
    phrase: 'Senior to',
    hindiMeaning: 'पद या उम्र में बड़ा होना',
    explanation: "Latin comparative adjectives ending in -ior (senior, junior, superior, inferior) take 'to', not 'than'.",
    examTag: 'SSC MTS 2023'
  },
  {
    id: 'fpq-8',
    sentence: 'A doting grandmother is often blind _____ the misbehavior of her grandson.',
    correctPreposition: 'to',
    options: ['in', 'to', 'with', 'from'],
    phrase: 'Blind to',
    hindiMeaning: 'दोषों की अनदेखी करना',
    explanation: "'Blind to' means ignoring faults or shortcomings. ('Blind in' is used for physical loss of sight).",
    examTag: 'SSC CGL 2020 Tier-1'
  },
  {
    id: 'fpq-9',
    sentence: 'He was looking forward _____ his favorite author in the Delhi literature fest.',
    correctPreposition: 'to meeting',
    options: ['to meet', 'to meeting', 'for meeting', 'for meet'],
    phrase: 'Looking forward to + V-ing',
    hindiMeaning: 'उत्सुकता से प्रतीक्षा करना',
    explanation: "'Looking forward to' is a phrasal verb that must be followed by a Gerund (V-ing), so 'to meeting' is correct.",
    examTag: 'SSC CGL 2023 Tier-2'
  },
  {
    id: 'fpq-10',
    sentence: 'The miserly landlord refused to part _____ even ten rupees for the relief fund.',
    correctPreposition: 'with',
    options: ['from', 'with', 'to', 'by'],
    phrase: 'Part with',
    hindiMeaning: 'वस्तु या धन का त्याग करना',
    explanation: "One parts 'from' a person, but parts 'with' money, property, or belongings.",
    examTag: 'CDS 2022'
  },
  {
    id: 'fpq-11',
    sentence: 'Regular physical exercise is conducive _____ mental peace and cardiovascular fitness.',
    correctPreposition: 'to',
    options: ['for', 'to', 'in', 'with'],
    phrase: 'Conducive to',
    hindiMeaning: 'अनुकूल या सहायक होना',
    explanation: "'Conducive' is always followed by the fixed preposition 'to'.",
    examTag: 'SSC CGL 2021'
  },
  {
    id: 'fpq-12',
    sentence: 'The strict officer was completely devoid _____ any sympathy for chronic slackers.',
    correctPreposition: 'of',
    options: ['from', 'with', 'of', 'in'],
    phrase: 'Devoid of',
    hindiMeaning: 'विहीन / रहित होना',
    explanation: "'Devoid' always takes the preposition 'of'.",
    examTag: 'SSC CPO 2022'
  },
  {
    id: 'fpq-13',
    sentence: 'The team captain was angry _____ the umpire for the dubious dismissal.',
    correctPreposition: 'with',
    options: ['at', 'with', 'upon', 'against'],
    phrase: 'Angry with',
    hindiMeaning: 'किसी व्यक्ति पर नाराज होना',
    explanation: "We are angry 'with' a person (umpire), but angry 'at' a thing or decision.",
    examTag: 'SSC CHSL 2023'
  },
  {
    id: 'fpq-14',
    sentence: 'Smoking cigarettes in public places is prohibited _____ law.',
    correctPreposition: 'by',
    options: ['with', 'by', 'from', 'in'],
    phrase: 'Prohibited by',
    hindiMeaning: 'कानून द्वारा प्रतिबंधित',
    explanation: "Something is prohibited 'by' law, but someone is prohibited 'from doing' an action.",
    examTag: 'SSC MTS 2021'
  },
  {
    id: 'fpq-15',
    sentence: 'The ambitious student is remarkably good _____ advanced trigonometry.',
    correctPreposition: 'at',
    options: ['in', 'at', 'with', 'for'],
    phrase: 'Good at',
    hindiMeaning: 'विषय में निपुण होना',
    explanation: "We use 'good at' when referring to skills, sports, or subjects. 'Good in' is non-standard in examinations.",
    examTag: 'SSC CGL 2022 Tier-1'
  },
  {
    id: 'fpq-16',
    sentence: 'The doctor advised the patient to abstain _____ fatty and fried foodstuffs.',
    correctPreposition: 'from',
    options: ['with', 'to', 'from', 'at'],
    phrase: 'Abstain from',
    hindiMeaning: 'परहेज करना',
    explanation: "'Abstain' and 'Refrain' are always followed by 'from' + noun/gerund.",
    examTag: 'Bank PO 2020'
  },
  {
    id: 'fpq-17',
    sentence: 'She insists _____ completing her daily quota of 100 vocab flashcards.',
    correctPreposition: 'on',
    options: ['to', 'for', 'on', 'at'],
    phrase: 'Insist on',
    hindiMeaning: 'जोर देना / दृढ़ रहना',
    explanation: "'Insist' takes 'on' followed by a Gerund (V-ing).",
    examTag: 'SSC CGL 2023 Tier-1'
  },
  {
    id: 'fpq-18',
    sentence: 'He went to the coaching library with a view _____ revising Indian Polity notes.',
    correctPreposition: 'to',
    options: ['to', 'of', 'for', 'at'],
    phrase: 'With a view to',
    hindiMeaning: 'के उद्देश्य से (+ V-ing)',
    explanation: "'With a view to' is followed by 'to' and a Gerund: 'with a view to revising'.",
    examTag: 'SSC CGL 2020 Tier-2'
  },
  {
    id: 'fpq-19',
    sentence: 'The high-level commission will look _____ the allegations of paper leak.',
    correctPreposition: 'into',
    options: ['at', 'for', 'into', 'after'],
    phrase: 'Look into',
    hindiMeaning: 'मामले की जांच करना',
    explanation: "'Look into' means to investigate thoroughly.",
    examTag: 'SSC CHSL 2021'
  },
  {
    id: 'fpq-20',
    sentence: 'A soldier should never yield _____ cowardice or despair in battle.',
    correctPreposition: 'to',
    options: ['at', 'to', 'before', 'with'],
    phrase: 'Yield to',
    hindiMeaning: 'समर्पण करना / झुकना',
    explanation: "'Yield' takes 'to' when meaning to surrender or give way to pressure.",
    examTag: 'NDA 2022'
  }
];

export const FIXED_PREPOSITIONS_QUIZ_DATA = FIXED_PREPOSITION_QUIZ_QUESTIONS;
