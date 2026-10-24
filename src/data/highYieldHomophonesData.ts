// ============================================================================
// HIGH-YIELD HOMOPHONES (समान ध्वनि, भिन्न वर्तनी व अर्थ)
// Curated for SSC CGL, CHSL, CPO, MTS, CDS, NDA, Railways & Banking Exams
// Source: RBE Top 400 Homophones Bilingual (E+H) - Shubham Jain (Ex. GST Inspector)
// Same Sound, Different Spelling, Confusable Words
// ============================================================================

export interface HomophoneWord {
  id: string;
  sno: number;
  word: string;
  partOfSpeech: string;
  posCategory: 'noun' | 'verb' | 'adj' | 'adv' | 'prep' | 'pron' | 'other';
  englishMeaning: string;
  hindiMeaning: string;
  englishSentence: string;
  hindiSentence: string;
  memoryTip?: string;
}

export interface HomophoneGroup {
  id: string;
  groupTitle: string;
  phonetic: string;
  soundKey: string;
  letter: string;
  examFrequency: 'High' | 'Very High' | 'Frequent';
  confusableTip: string;
  words: HomophoneWord[];
}

export interface HomophoneQuizQuestion {
  id: string;
  sentenceWithBlank: string;
  blankTranslation: string;
  correctWord: string;
  options: string[];
  explanation: string;
  groupTitle: string;
}

export const HOMOPHONES_DATA: HomophoneGroup[] = [
  // ─── A ───
  {
    id: 'hp-ail-ale',
    groupTitle: 'Ail vs Ale',
    phonetic: '/eɪl/',
    soundKey: 'eɪl',
    letter: 'A',
    examFrequency: 'Very High',
    confusableTip: 'Ail = बीमारी / पीड़ा में होना; Ale = माल्ट वाली बीयर (शराब)',
    words: [
      {
        id: 'hp-ail',
        sno: 1,
        word: 'Ail',
        partOfSpeech: 'Verb',
        posCategory: 'verb',
        englishMeaning: 'To suffer from illness or discomfort',
        hindiMeaning: 'पीड़ित होना / कष्ट सहना',
        englishSentence: 'He still ails from the injury.',
        hindiSentence: 'वह अभी भी उस चोट से पीड़ित है।',
        memoryTip: 'Ail rhymes with Pale (बीमारी में चेहरा pale हो जाता है)'
      },
      {
        id: 'hp-ale',
        sno: 2,
        word: 'Ale',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A type of beer',
        hindiMeaning: 'एक प्रकार की बीयर',
        englishSentence: 'He ordered a pint of ale.',
        hindiSentence: 'उसने एक गिलास एले मंगाया।',
        memoryTip: 'Ale is a drink served in taverns'
      }
    ]
  },
  {
    id: 'hp-air-heir',
    groupTitle: 'Air vs Heir',
    phonetic: '/eər/',
    soundKey: 'eər',
    letter: 'A',
    examFrequency: 'Very High',
    confusableTip: 'Air = हवा (गैस); Heir = उत्तराधिकारी (H साइलेंट होता है)',
    words: [
      {
        id: 'hp-air',
        sno: 3,
        word: 'Air',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'The invisible gaseous substance around us',
        hindiMeaning: 'हवा / वायु',
        englishSentence: 'The air feels fresh in the mountains.',
        hindiSentence: 'पहाड़ों में हवा ताज़ा लगती है।',
        memoryTip: 'Air we breathe'
      },
      {
        id: 'hp-heir',
        sno: 4,
        word: 'Heir',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A person legally entitled to property after someone\'s death',
        hindiMeaning: 'उत्तराधिकारी',
        englishSentence: 'She is the only heir to her father\'s estate.',
        hindiSentence: 'वह अपने पिता की संपत्ति की अकेली उत्तराधिकारी है।',
        memoryTip: 'Heir starts with silent H; takes article "an heir"'
      }
    ]
  },
  {
    id: 'hp-allowed-aloud',
    groupTitle: 'Allowed vs Aloud',
    phonetic: '/əˈlaʊd/',
    soundKey: 'əˈlaʊd',
    letter: 'A',
    examFrequency: 'Very High',
    confusableTip: 'Allowed = अनुमति प्राप्त; Aloud = ऊँची आवाज़ में / बोलकर',
    words: [
      {
        id: 'hp-allowed',
        sno: 5,
        word: 'Allowed',
        partOfSpeech: 'Verb',
        posCategory: 'verb',
        englishMeaning: 'Given permission',
        hindiMeaning: 'अनुमति दी गई',
        englishSentence: 'He was allowed to enter the room.',
        hindiSentence: 'उसे कमरे में प्रवेश की अनुमति दी गई।',
        memoryTip: 'Allow + ed = permission'
      },
      {
        id: 'hp-aloud',
        sno: 6,
        word: 'Aloud',
        partOfSpeech: 'Adverb',
        posCategory: 'adv',
        englishMeaning: 'In a voice that can be heard clearly',
        hindiMeaning: 'ज़ोर से / सस्वर',
        englishSentence: 'Please read the paragraph aloud.',
        hindiSentence: 'कृपया अनुच्छेद को ज़ोर से पढ़ें।',
        memoryTip: 'LOUD is inside aLOUD (loud voice)'
      }
    ]
  },
  {
    id: 'hp-ate-eight',
    groupTitle: 'Ate vs Eight',
    phonetic: '/eɪt/',
    soundKey: 'eɪt',
    letter: 'A',
    examFrequency: 'Frequent',
    confusableTip: 'Ate = खाया (Eat का Past); Eight = संख्या 8',
    words: [
      {
        id: 'hp-ate',
        sno: 7,
        word: 'Ate',
        partOfSpeech: 'Verb',
        posCategory: 'verb',
        englishMeaning: 'Past tense of "eat"',
        hindiMeaning: 'खाया',
        englishSentence: 'He ate the whole cake.',
        hindiSentence: 'उसने पूरा केक खा लिया।',
        memoryTip: 'Eat → Ate → Eaten'
      },
      {
        id: 'hp-eight',
        sno: 8,
        word: 'Eight',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'The number 8',
        hindiMeaning: 'आठ (संख्या)',
        englishSentence: 'There are eight chairs in the room.',
        hindiSentence: 'कमरे में आठ कुर्सियाँ हैं।',
        memoryTip: 'E-I-G-H-T = digit 8'
      }
    ]
  },
  {
    id: 'hp-axis-access-excess',
    groupTitle: 'Axis vs Access vs Excess',
    phonetic: '/ˈæksɪs/ - /ˈæksɛs/ - /ɪkˈsɛs/',
    soundKey: 'æksɪs',
    letter: 'A',
    examFrequency: 'Very High',
    confusableTip: 'Axis = धुरी/अक्ष; Access = पहुँच; Excess = अत्यधिक/अति',
    words: [
      {
        id: 'hp-axis',
        sno: 9,
        word: 'Axis',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'An imaginary line about which a body rotates',
        hindiMeaning: 'अक्ष / धुरी',
        englishSentence: 'The earth rotates on its axis.',
        hindiSentence: 'पृथ्वी अपने अक्ष पर घूमती है।',
        memoryTip: 'X & Y axis in geometry'
      },
      {
        id: 'hp-access',
        sno: 10,
        word: 'Access',
        partOfSpeech: 'Noun / Verb',
        posCategory: 'verb',
        englishMeaning: 'Entry or approach to a place or thing',
        hindiMeaning: 'पहुँच / प्रवेश',
        englishSentence: 'You need a password to access the file.',
        hindiSentence: 'फ़ाइल तक पहुँचने के लिए पासवर्ड चाहिए।',
        memoryTip: 'Access = Approach / Entry'
      },
      {
        id: 'hp-excess',
        sno: 11,
        word: 'Excess',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'An amount more than necessary, allowed, or usual',
        hindiMeaning: 'अधिकता / अत्यधिक मात्रा',
        englishSentence: 'The doctor warned him against excess of sugar in his diet.',
        hindiSentence: 'डॉक्टर ने उसे उसके आहार में चीनी की अधिकता के प्रति चेतावनी दी।',
        memoryTip: 'EXceed → EXcess (too much)'
      }
    ]
  },

  // ─── B ───
  {
    id: 'hp-bail-bale',
    groupTitle: 'Bail vs Bale',
    phonetic: '/beɪl/',
    soundKey: 'beɪl',
    letter: 'B',
    examFrequency: 'Very High',
    confusableTip: 'Bail = न्यायालय से ज़मानत; Bale = कपास/घास की गठरी',
    words: [
      {
        id: 'hp-bail',
        sno: 12,
        word: 'Bail',
        partOfSpeech: 'Noun / Verb',
        posCategory: 'noun',
        englishMeaning: 'Security money for temporary release',
        hindiMeaning: 'ज़मानत / मुचलका',
        englishSentence: 'He was released on bail.',
        hindiSentence: 'उसे ज़मानत पर रिहा किया गया।',
        memoryTip: 'Bail from court'
      },
      {
        id: 'hp-bale',
        sno: 13,
        word: 'Bale',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A large bundle (of hay, cotton, etc.)',
        hindiMeaning: 'गठरी / बंडल',
        englishSentence: 'They loaded a bale of cotton on the truck.',
        hindiSentence: 'उन्होंने ट्रक पर कपास की एक गठरी लादी।',
        memoryTip: 'Bale of hay/cotton'
      }
    ]
  },
  {
    id: 'hp-bait-bate',
    groupTitle: 'Bait vs Bate',
    phonetic: '/beɪt/',
    soundKey: 'beɪt',
    letter: 'B',
    examFrequency: 'High',
    confusableTip: 'Bait = चारा/प्रलोभन; Bate = गति/तीव्रता कम करना (with bated breath)',
    words: [
      {
        id: 'hp-bait',
        sno: 14,
        word: 'Bait',
        partOfSpeech: 'Noun / Verb',
        posCategory: 'noun',
        englishMeaning: 'Food or lure to catch animals/fish',
        hindiMeaning: 'चारा / प्रलोभन',
        englishSentence: 'He used bread as bait to catch fish.',
        hindiSentence: 'उसने मछली पकड़ने के लिए चारे के रूप में ब्रेड का इस्तेमाल किया।',
        memoryTip: 'Fish bait'
      },
      {
        id: 'hp-bate',
        sno: 15,
        word: 'Bate',
        partOfSpeech: 'Verb',
        posCategory: 'verb',
        englishMeaning: 'To reduce in force or intensity',
        hindiMeaning: 'घटाना / कम करना (जैसे bated breath)',
        englishSentence: 'The wind did not bate its force.',
        hindiSentence: 'हवा की गति में कोई कमी नहीं आई।',
        memoryTip: 'Idiom: With bated breath (सांस रोककर)'
      }
    ]
  },
  {
    id: 'hp-ball-bawl',
    groupTitle: 'Ball vs Bawl',
    phonetic: '/bɔːl/',
    soundKey: 'bɔːl',
    letter: 'B',
    examFrequency: 'High',
    confusableTip: 'Ball = खेलने वाली गेंद / नृत्य सभा; Bawl = ज़ोर-ज़ोर से रोना या चिल्लाना',
    words: [
      {
        id: 'hp-ball',
        sno: 16,
        word: 'Ball',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A round object used in games',
        hindiMeaning: 'गेंद',
        englishSentence: 'The boy threw the ball far.',
        hindiSentence: 'लड़के ने गेंद दूर फेंकी।',
        memoryTip: 'Football, Cricket ball'
      },
      {
        id: 'hp-bawl',
        sno: 17,
        word: 'Bawl',
        partOfSpeech: 'Verb',
        posCategory: 'verb',
        englishMeaning: 'To shout or wail noisily',
        hindiMeaning: 'चिल्लाना / चीख-चीख कर रोना',
        englishSentence: 'Don’t bawl in public.',
        hindiSentence: 'सार्वजनिक जगह पर चिल्लाओ मत।',
        memoryTip: 'Bawl = cry loudly (Wail sounds like Bawl)'
      }
    ]
  },
  {
    id: 'hp-band-banned',
    groupTitle: 'Band vs Banned',
    phonetic: '/bænd/',
    soundKey: 'bænd',
    letter: 'B',
    examFrequency: 'Very High',
    confusableTip: 'Band = संगीत समूह / फीता; Banned = प्रतिबंधित / वर्जित',
    words: [
      {
        id: 'hp-band',
        sno: 18,
        word: 'Band',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A musical group or loop',
        hindiMeaning: 'बैंड (संगीत दल) / पट्टी',
        englishSentence: 'The band played at the wedding.',
        hindiSentence: 'बैंड ने शादी में संगीत बजाया।',
        memoryTip: 'Music band, rubber band'
      },
      {
        id: 'hp-banned',
        sno: 19,
        word: 'Banned',
        partOfSpeech: 'Verb',
        posCategory: 'verb',
        englishMeaning: 'Prohibited, not allowed',
        hindiMeaning: 'प्रतिबंधित / रोका गया',
        englishSentence: 'Smoking is banned here.',
        hindiSentence: 'यहां धूम्रपान प्रतिबंधित है।',
        memoryTip: 'Ban + ned = illegal'
      }
    ]
  },
  {
    id: 'hp-bare-bear',
    groupTitle: 'Bare vs Bear',
    phonetic: '/bɛər/',
    soundKey: 'bɛər',
    letter: 'B',
    examFrequency: 'Very High',
    confusableTip: 'Bare = नग्न/खुला; Bear = भालू (Noun) या सहना/वहन करना (Verb)',
    words: [
      {
        id: 'hp-bare',
        sno: 20,
        word: 'Bare',
        partOfSpeech: 'Adjective',
        posCategory: 'adj',
        englishMeaning: 'Not covered, naked, simple',
        hindiMeaning: 'नग्न / खुला / खाली',
        englishSentence: 'He walked on the sand with bare feet.',
        hindiSentence: 'वह नंगे पैर रेत पर चला।',
        memoryTip: 'Barefoot = नंगे पैर'
      },
      {
        id: 'hp-bear',
        sno: 21,
        word: 'Bear',
        partOfSpeech: 'Noun / Verb',
        posCategory: 'verb',
        englishMeaning: 'An animal / to tolerate or carry',
        hindiMeaning: 'भालू / सहना / बर्दाश्त करना',
        englishSentence: 'I saw a bear in the forest. I can’t bear the pain.',
        hindiSentence: 'मैंने जंगल में एक भालू देखा। मैं दर्द सह नहीं सकता।',
        memoryTip: 'Bear pain / Grizzly Bear'
      }
    ]
  },
  {
    id: 'hp-be-bee',
    groupTitle: 'Be vs Bee',
    phonetic: '/biː/',
    soundKey: 'biː',
    letter: 'B',
    examFrequency: 'Frequent',
    confusableTip: 'Be = होना (क्रिया); Bee = मधुमक्खी (कीट)',
    words: [
      {
        id: 'hp-be',
        sno: 22,
        word: 'Be',
        partOfSpeech: 'Verb',
        posCategory: 'verb',
        englishMeaning: 'To exist / occur',
        hindiMeaning: 'होना / रहना',
        englishSentence: 'Try to be honest.',
        hindiSentence: 'ईमानदार बनने की कोशिश करो।',
        memoryTip: 'To be or not to be'
      },
      {
        id: 'hp-bee',
        sno: 23,
        word: 'Bee',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'Insect that makes honey',
        hindiMeaning: 'मधुमक्खी',
        englishSentence: 'A bee stung my hand.',
        hindiSentence: 'एक मधुमक्खी ने मेरे हाथ में काटा।',
        memoryTip: 'Honey bee'
      }
    ]
  },
  {
    id: 'hp-beach-beech',
    groupTitle: 'Beach vs Beech',
    phonetic: '/biːtʃ/',
    soundKey: 'biːtʃ',
    letter: 'B',
    examFrequency: 'High',
    confusableTip: 'Beach = समुद्र का किनारा (रेत); Beech = एक प्रकार का छायादार वृक्ष',
    words: [
      {
        id: 'hp-beach',
        sno: 24,
        word: 'Beach',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'Sandy shore of a sea/ocean',
        hindiMeaning: 'समुद्र किनारा / तट',
        englishSentence: 'We relaxed on the beach.',
        hindiSentence: 'हम समुद्र किनारे आराम कर रहे थे।',
        memoryTip: 'Goa beach'
      },
      {
        id: 'hp-beech',
        sno: 25,
        word: 'Beech',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A type of large forest tree',
        hindiMeaning: 'बीच का पेड़ (एक छायादार वृक्ष)',
        englishSentence: 'The beech tree gives dense shade.',
        hindiSentence: 'बीच का पेड़ घना छाया देता है।',
        memoryTip: 'Beechwood furniture'
      }
    ]
  },
  {
    id: 'hp-beat-beet',
    groupTitle: 'Beat vs Beet',
    phonetic: '/biːt/',
    soundKey: 'biːt',
    letter: 'B',
    examFrequency: 'High',
    confusableTip: 'Beat = हराना / पीटना / धड़कन; Beet = चुकंदर (सब्जी/सलाद)',
    words: [
      {
        id: 'hp-beat',
        sno: 26,
        word: 'Beat',
        partOfSpeech: 'Verb / Noun',
        posCategory: 'verb',
        englishMeaning: 'To strike repeatedly / a rhythm / defeat',
        hindiMeaning: 'पीटना / हराना / ताल',
        englishSentence: 'He beat the drum loudly.',
        hindiSentence: 'उसने ज़ोर से ढोल पीटा।',
        memoryTip: 'Heart beat / Beat the opponent'
      },
      {
        id: 'hp-beet',
        sno: 27,
        word: 'Beet',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A root vegetable (beetroot)',
        hindiMeaning: 'चुकंदर',
        englishSentence: 'She made beet salad.',
        hindiSentence: 'उसने चुकंदर का सलाद बनाया।',
        memoryTip: 'Beetroot = लाल चुकंदर'
      }
    ]
  },
  {
    id: 'hp-berry-bury',
    groupTitle: 'Berry vs Bury',
    phonetic: '/ˈbɛri/',
    soundKey: 'bɛri',
    letter: 'B',
    examFrequency: 'Very High',
    confusableTip: 'Berry = रसीला छोटा फल; Bury = दफनाना / गाड़ना (U का उच्चारण E जैसा होता है)',
    words: [
      {
        id: 'hp-berry',
        sno: 28,
        word: 'Berry',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A small juicy fruit',
        hindiMeaning: 'बेरी फल (जैसे स्ट्रॉबेरी)',
        englishSentence: 'I love strawberry and other berries.',
        hindiSentence: 'मुझे स्ट्रॉबेरी और अन्य बेरी फल पसंद हैं।',
        memoryTip: 'Blueberry, Blackberry'
      },
      {
        id: 'hp-bury',
        sno: 29,
        word: 'Bury',
        partOfSpeech: 'Verb',
        posCategory: 'verb',
        englishMeaning: 'To put underground (e.g. dead body, treasure)',
        hindiMeaning: 'दफनाना / गाड़ना',
        englishSentence: 'They buried the treasure near the tree.',
        hindiSentence: 'उन्होंने खज़ाना पेड़ के पास दफनाया।',
        memoryTip: 'Bury the hatchet (दुश्मनी खत्म करना)'
      }
    ]
  },
  {
    id: 'hp-berth-birth',
    groupTitle: 'Berth vs Birth',
    phonetic: '/bɜːrθ/',
    soundKey: 'bɜːrθ',
    letter: 'B',
    examFrequency: 'Very High',
    confusableTip: 'Berth = ट्रेन या जहाज़ में सोने की सीट; Birth = जन्म',
    words: [
      {
        id: 'hp-berth',
        sno: 30,
        word: 'Berth',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'Sleeping space in train or ship',
        hindiMeaning: 'बर्थ / ट्रेन में सोने की सीट',
        englishSentence: 'I got a lower berth on the train.',
        hindiSentence: 'मुझे ट्रेन में निचली बर्थ मिली।',
        memoryTip: 'Lower berth / Upper berth'
      },
      {
        id: 'hp-birth',
        sno: 31,
        word: 'Birth',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'The act of being born',
        hindiMeaning: 'जन्म',
        englishSentence: 'She gave birth to a baby girl.',
        hindiSentence: 'उसने एक बच्ची को जन्म दिया।',
        memoryTip: 'Date of birth (DOB)'
      }
    ]
  },
  {
    id: 'hp-bin-been',
    groupTitle: 'Bin vs Been',
    phonetic: '/bɪn/ - /biːn/',
    soundKey: 'bɪn',
    letter: 'B',
    examFrequency: 'Frequent',
    confusableTip: 'Bin = कूड़ेदान / डिब्बा; Been = Be का Past Participle (हो चुका)',
    words: [
      {
        id: 'hp-bin',
        sno: 32,
        word: 'Bin',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A container for waste',
        hindiMeaning: 'कूड़ादान / डिब्बा',
        englishSentence: 'Throw the trash in the bin.',
        hindiSentence: 'कूड़ा कूड़ेदान में डालो।',
        memoryTip: 'Dustbin'
      },
      {
        id: 'hp-been',
        sno: 33,
        word: 'Been',
        partOfSpeech: 'Verb',
        posCategory: 'verb',
        englishMeaning: 'Past form of "be"',
        hindiMeaning: 'हो चुका / गया हुआ',
        englishSentence: 'I have been to Delhi.',
        hindiSentence: 'मैं दिल्ली जा चुका हूँ।',
        memoryTip: 'Have been / Has been'
      }
    ]
  },
  {
    id: 'hp-billed-build',
    groupTitle: 'Billed vs Build',
    phonetic: '/bɪld/',
    soundKey: 'bɪld',
    letter: 'B',
    examFrequency: 'High',
    confusableTip: 'Billed = बिल बनाया / शुल्क लिया; Build = निर्माण करना / बनाना',
    words: [
      {
        id: 'hp-billed',
        sno: 34,
        word: 'Billed',
        partOfSpeech: 'Verb',
        posCategory: 'verb',
        englishMeaning: 'Charged a fee / having a beak',
        hindiMeaning: 'बिल बनाया / चोंच वाला',
        englishSentence: 'They billed me extra. The billed bird flew away.',
        hindiSentence: 'उन्होंने मुझसे ज़्यादा शुल्क लिया। चोंच वाला पक्षी उड़ गया।',
        memoryTip: 'Bill + ed'
      },
      {
        id: 'hp-build',
        sno: 35,
        word: 'Build',
        partOfSpeech: 'Verb',
        posCategory: 'verb',
        englishMeaning: 'To construct / erect',
        hindiMeaning: 'बनाना / निर्माण करना',
        englishSentence: 'They build houses with bricks.',
        hindiSentence: 'वे ईंटों से घर बनाते हैं।',
        memoryTip: 'Build a building'
      }
    ]
  },
  {
    id: 'hp-blue-blew',
    groupTitle: 'Blue vs Blew',
    phonetic: '/bluː/',
    soundKey: 'bluː',
    letter: 'B',
    examFrequency: 'Very High',
    confusableTip: 'Blue = नीला रंग; Blew = फूंका / बहा (Blow का Past)',
    words: [
      {
        id: 'hp-blue',
        sno: 36,
        word: 'Blue',
        partOfSpeech: 'Adjective',
        posCategory: 'adj',
        englishMeaning: 'A colour of the sky',
        hindiMeaning: 'नीला रंग',
        englishSentence: 'The sky is blue today.',
        hindiSentence: 'आज आसमान नीला है।',
        memoryTip: 'Blue ocean, blue sky'
      },
      {
        id: 'hp-blew',
        sno: 37,
        word: 'Blew',
        partOfSpeech: 'Verb',
        posCategory: 'verb',
        englishMeaning: 'Past tense of blow',
        hindiMeaning: 'फूंका / बहा / बजाया',
        englishSentence: 'The wind blew all night.',
        hindiSentence: 'हवा पूरी रात बहती रही।',
        memoryTip: 'Blow → Blew → Blown'
      }
    ]
  },
  {
    id: 'hp-board-bored',
    groupTitle: 'Board vs Bored',
    phonetic: '/bɔːrd/',
    soundKey: 'bɔːrd',
    letter: 'B',
    examFrequency: 'Very High',
    confusableTip: 'Board = तख्ता / समिति / सवार होना; Bored = ऊब जाना / छेद किया',
    words: [
      {
        id: 'hp-board',
        sno: 38,
        word: 'Board',
        partOfSpeech: 'Noun / Verb',
        posCategory: 'noun',
        englishMeaning: 'Flat surface / to get onto a vehicle / council',
        hindiMeaning: 'तख्ती / सवार होना / मंडल',
        englishSentence: 'He nailed the board to the wall. We boarded the train.',
        hindiSentence: 'उसने दीवार पर तख्ती ठोंकी। हम ट्रेन में सवार हुए।',
        memoryTip: 'Blackboard / Boarding pass'
      },
      {
        id: 'hp-bored',
        sno: 39,
        word: 'Bored',
        partOfSpeech: 'Adjective',
        posCategory: 'adj',
        englishMeaning: 'Feeling uninterested / made a hole',
        hindiMeaning: 'उकता गया / ऊबा हुआ',
        englishSentence: 'I was bored during the lecture.',
        hindiSentence: 'मैं व्याख्यान के दौरान ऊब गया।',
        memoryTip: 'Bore + ed = uninspired'
      }
    ]
  },
  {
    id: 'hp-bolder-boulder',
    groupTitle: 'Bolder vs Boulder',
    phonetic: '/ˈboʊldər/',
    soundKey: 'boʊldər',
    letter: 'B',
    examFrequency: 'Very High',
    confusableTip: 'Bolder = अधिक साहसी (Bold का comparative); Boulder = विशाल गोल पत्थर/चट्टान',
    words: [
      {
        id: 'hp-bolder',
        sno: 40,
        word: 'Bolder',
        partOfSpeech: 'Adjective',
        posCategory: 'adj',
        englishMeaning: 'More courageous and confident',
        hindiMeaning: 'अधिक साहसी / निडर',
        englishSentence: 'She was bolder than before.',
        hindiSentence: 'वह पहले से अधिक साहसी थी।',
        memoryTip: 'Bold → Bolder → Boldest'
      },
      {
        id: 'hp-boulder',
        sno: 41,
        word: 'Boulder',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A large, rounded rock',
        hindiMeaning: 'बड़ा पत्थर / शिलाखंड',
        englishSentence: 'A huge boulder blocked the road.',
        hindiSentence: 'एक बड़ा पत्थर रास्ता रोक रहा था।',
        memoryTip: 'Boulder has "U" like huge rock'
      }
    ]
  },
  {
    id: 'hp-boar-bore',
    groupTitle: 'Boar vs Bore',
    phonetic: '/bɔːr/',
    soundKey: 'bɔːr',
    letter: 'B',
    examFrequency: 'High',
    confusableTip: 'Boar = जंगली सूअर; Bore = उबाना / छेद करना',
    words: [
      {
        id: 'hp-boar',
        sno: 42,
        word: 'Boar',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A wild pig',
        hindiMeaning: 'जंगली सूअर',
        englishSentence: 'The hunter shot a boar.',
        hindiSentence: 'शिकारी ने एक जंगली सूअर मारा।',
        memoryTip: 'Wild boar'
      },
      {
        id: 'hp-bore',
        sno: 43,
        word: 'Bore',
        partOfSpeech: 'Verb / Noun',
        posCategory: 'verb',
        englishMeaning: 'To make bored / a hole in a wall',
        hindiMeaning: 'उबाना / छेद करना',
        englishSentence: 'His speech bore everyone. He bore a hole in the wall.',
        hindiSentence: 'उसकी बातों ने सबको उबाया। उसने दीवार में छेद किया।',
        memoryTip: 'Borewell (छेद)'
      }
    ]
  },
  {
    id: 'hp-cache-cash',
    groupTitle: 'Cache vs Cash',
    phonetic: '/kæʃ/',
    soundKey: 'kæʃ',
    letter: 'C',
    examFrequency: 'Very High',
    confusableTip: 'Cache = गुप्त छिपा हुआ भंडार / कंप्यूटर मेमोरी; Cash = नकद धन',
    words: [
      {
        id: 'hp-cache',
        sno: 45,
        word: 'Cache',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A hidden storage place / memory cache',
        hindiMeaning: 'गुप्त भंडार / छिपाने का स्थान',
        englishSentence: 'The soldiers found a weapons cache.',
        hindiSentence: 'सैनिकों को हथियारों का गुप्त भंडार मिला।',
        memoryTip: 'Browser cache / secret cache'
      },
      {
        id: 'hp-cash',
        sno: 46,
        word: 'Cash',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'Money in coins or notes',
        hindiMeaning: 'नकद रुपया / नकद राशि',
        englishSentence: 'I paid in cash.',
        hindiSentence: 'मैंने नकद भुगतान किया।',
        memoryTip: 'Cash in hand'
      }
    ]
  },

  // ─── C ───
  {
    id: 'hp-canvas-canvass',
    groupTitle: 'Canvas vs Canvass',
    phonetic: '/ˈkænvəs/',
    soundKey: 'kænvəs',
    letter: 'C',
    examFrequency: 'Very High',
    confusableTip: 'Canvas (Single S) = मोटा कपड़ा/पेंटिंग का पर्दा; Canvass (Double S) = वोट या चंदा मांगना',
    words: [
      {
        id: 'hp-canvas',
        sno: 47,
        word: 'Canvas',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A strong fabric or surface for painting',
        hindiMeaning: 'कैनवास / मोटा कपड़ा / चित्रपट',
        englishSentence: 'The artist painted on a large canvas.',
        hindiSentence: 'कलाकार ने एक बड़े कैनवास पर चित्र बनाया।',
        memoryTip: 'Canvas shoes / Canvas painting'
      },
      {
        id: 'hp-canvass',
        sno: 48,
        word: 'Canvass',
        partOfSpeech: 'Verb',
        posCategory: 'verb',
        englishMeaning: 'To seek support, votes, or opinions',
        hindiMeaning: 'जनमत लेना / वोट या चंदा मांगना',
        englishSentence: 'Volunteers canvassed the neighbourhood for donations.',
        hindiSentence: 'स्वयंसेवकों ने चंदे के लिए मोहल्ले में जनमत लिया।',
        memoryTip: 'CanvaSS has double S for Support/Seeking votes'
      }
    ]
  },
  {
    id: 'hp-capital-capitol',
    groupTitle: 'Capital vs Capitol',
    phonetic: '/ˈkæpɪtl/',
    soundKey: 'kæpɪtl',
    letter: 'C',
    examFrequency: 'Very High',
    confusableTip: 'Capital = राजधानी / पूँजी / बड़ा अक्षर; Capitol = संसद या विधान भवन (इमारत)',
    words: [
      {
        id: 'hp-capital',
        sno: 49,
        word: 'Capital',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'City / money used for investment / uppercase letter',
        hindiMeaning: 'राजधानी / पूँजी / बड़ा अक्षर',
        englishSentence: 'Delhi is the capital of India.',
        hindiSentence: 'दिल्ली भारत की राजधानी है।',
        memoryTip: 'Capital city / Capital investment'
      },
      {
        id: 'hp-capitol',
        sno: 50,
        word: 'Capitol',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A government building where legislature meets',
        hindiMeaning: 'संसद भवन / विधान भवन (इमारत)',
        englishSentence: 'The protestors marched to the capitol.',
        hindiSentence: 'प्रदर्शनकारी संसद भवन की ओर मार्च कर गए।',
        memoryTip: 'CapitOl has an "O" like the dOme of the building'
      }
    ]
  },
  {
    id: 'hp-carat-karat-caret',
    groupTitle: 'Carat vs Karat vs Caret',
    phonetic: '/ˈkærət/',
    soundKey: 'kærət',
    letter: 'C',
    examFrequency: 'Very High',
    confusableTip: 'Carat = हीरों का वजन; Karat = सोने की शुद्धता; Caret = चिह्न (^)',
    words: [
      {
        id: 'hp-carat',
        sno: 51,
        word: 'Carat',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'Unit for weighing gemstones and diamonds',
        hindiMeaning: 'कैरेट (हीरे-रत्न का वजन)',
        englishSentence: 'The diamond is 2 carats.',
        hindiSentence: 'वह हीरा 2 कैरेट का है।',
        memoryTip: 'Carat with C for Crystal/Gemstone'
      },
      {
        id: 'hp-karat',
        sno: 52,
        word: 'Karat',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'Measure of gold purity (24 karat = 100%)',
        hindiMeaning: 'कैरेट (सोने की शुद्धता)',
        englishSentence: 'The ring is 22 karat gold.',
        hindiSentence: 'अंगूठी 22 कैरेट सोने की है।',
        memoryTip: 'Karat with K is used for Gold purity'
      },
      {
        id: 'hp-caret',
        sno: 53,
        word: 'Caret',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A mark (^) used in editing or coding to insert missing text',
        hindiMeaning: 'संकेत चिह्न (^)',
        englishSentence: 'Insert a word where the caret is placed.',
        hindiSentence: 'जहाँ कैरेट है वहाँ एक शब्द जोड़ें।',
        memoryTip: 'Caret is the symbol ^ on your keyboard (Shift + 6)'
      }
    ]
  },
  {
    id: 'hp-cast-caste',
    groupTitle: 'Cast vs Caste',
    phonetic: '/kɑːst/',
    soundKey: 'kɑːst',
    letter: 'C',
    examFrequency: 'Very High',
    confusableTip: 'Cast = फेंकना / अभिनेता दल / वोट डालना; Caste = सामाजिक जाति',
    words: [
      {
        id: 'hp-cast',
        sno: 54,
        word: 'Cast',
        partOfSpeech: 'Verb / Noun',
        posCategory: 'verb',
        englishMeaning: 'To throw / group of actors / cast a vote',
        hindiMeaning: 'फेंकना / कलाकार समूह / वोट डालना',
        englishSentence: 'He cast the net into the water. The cast performed well.',
        hindiSentence: 'उसने जाल पानी में डाला। कलाकारों ने अच्छा प्रदर्शन किया।',
        memoryTip: 'Cast a vote / Movie cast'
      },
      {
        id: 'hp-caste',
        sno: 55,
        word: 'Caste',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A hereditary social class in society',
        hindiMeaning: 'जाति / सामाजिक वर्ण',
        englishSentence: 'He belongs to a different caste.',
        hindiSentence: 'वह अलग जाति से है।',
        memoryTip: 'Caste system in society'
      }
    ]
  },
  {
    id: 'hp-cede-seed',
    groupTitle: 'Cede vs Seed',
    phonetic: '/siːd/',
    soundKey: 'siːd',
    letter: 'C',
    examFrequency: 'High',
    confusableTip: 'Cede = क्षेत्र या अधिकार सौंप देना; Seed = पौधे का बीज',
    words: [
      {
        id: 'hp-cede',
        sno: 56,
        word: 'Cede',
        partOfSpeech: 'Verb',
        posCategory: 'verb',
        englishMeaning: 'To surrender or give up territory/rights',
        hindiMeaning: 'सौंप देना / अधिकार त्यागना',
        englishSentence: 'The territory was ceded to the enemy.',
        hindiSentence: 'क्षेत्र दुश्मन को सौंप दिया गया।',
        memoryTip: 'ConCEDE / Cede control'
      },
      {
        id: 'hp-seed',
        sno: 57,
        word: 'Seed',
        partOfSpeech: 'Noun / Verb',
        posCategory: 'noun',
        englishMeaning: 'Plant part for reproduction / to plant',
        hindiMeaning: 'बीज / दाना',
        englishSentence: 'Plant the seed two inches deep.',
        hindiSentence: 'बीज को दो इंच गहरा बोओ।',
        memoryTip: 'Sow a seed'
      }
    ]
  },
  {
    id: 'hp-cell-sell',
    groupTitle: 'Cell vs Sell',
    phonetic: '/sɛl/',
    soundKey: 'sɛl',
    letter: 'C',
    examFrequency: 'Frequent',
    confusableTip: 'Cell = कोठरी / बैटरी / जैविक कोशिका; Sell = बेचना',
    words: [
      {
        id: 'hp-cell',
        sno: 58,
        word: 'Cell',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'Small room / unit of life / battery',
        hindiMeaning: 'कक्ष / जेल की कोठरी / कोशिका',
        englishSentence: 'He was locked in a jail cell.',
        hindiSentence: 'उसे जेल के सेल में बंद किया गया।',
        memoryTip: 'Jail cell, Blood cell'
      },
      {
        id: 'hp-sell',
        sno: 59,
        word: 'Sell',
        partOfSpeech: 'Verb',
        posCategory: 'verb',
        englishMeaning: 'To offer something in exchange for money',
        hindiMeaning: 'बेचना / बिक्री करना',
        englishSentence: 'They sell fruits at the market.',
        hindiSentence: 'वे बाजार में फल बेचते हैं।',
        memoryTip: 'Buy and Sell'
      }
    ]
  },
  {
    id: 'hp-censor-sensor',
    groupTitle: 'Censor vs Sensor',
    phonetic: '/ˈsɛnsər/',
    soundKey: 'sɛnsər',
    letter: 'C',
    examFrequency: 'Very High',
    confusableTip: 'Censor = आपत्तिजनक सामग्री हटाना; Sensor = संकेत भांपने वाला यंत्र',
    words: [
      {
        id: 'hp-censor',
        sno: 60,
        word: 'Censor',
        partOfSpeech: 'Verb / Noun',
        posCategory: 'verb',
        englishMeaning: 'To suppress unacceptable content / an official',
        hindiMeaning: 'सेंसर करना / प्रतिबंध लगाना',
        englishSentence: 'The film was censored before release.',
        hindiSentence: 'फिल्म को रिलीज़ से पहले सेंसर किया गया।',
        memoryTip: 'Censor Board (CBFC)'
      },
      {
        id: 'hp-sensor',
        sno: 61,
        word: 'Sensor',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A device that detects signals or changes in motion/heat',
        hindiMeaning: 'संवेदक यंत्र / सेंस करने वाला उपकरण',
        englishSentence: 'The motion sensor turned on the light.',
        hindiSentence: 'गति संवेदक ने लाइट जलाई।',
        memoryTip: 'Sensor SENSES light or motion'
      }
    ]
  },
  {
    id: 'hp-cent-scent-sent',
    groupTitle: 'Cent vs Scent vs Sent',
    phonetic: '/sɛnt/',
    soundKey: 'sɛnt',
    letter: 'C',
    examFrequency: 'Very High',
    confusableTip: 'Cent = डॉलर का 100वाँ हिस्सा; Scent = खुशबू; Sent = भेजा (Send का Past)',
    words: [
      {
        id: 'hp-cent',
        sno: 62,
        word: 'Cent',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'One-hundredth of a dollar or euro',
        hindiMeaning: 'सेंट (सिक्का / सौवाँ हिस्सा)',
        englishSentence: 'It costs fifty cents.',
        hindiSentence: 'इसकी कीमत पचास सेंट है।',
        memoryTip: 'Century = 100, Cent = 1/100'
      },
      {
        id: 'hp-scent',
        sno: 63,
        word: 'Scent',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A pleasant smell or aroma',
        hindiMeaning: 'सुगंध / खुशबू / इत्र',
        englishSentence: 'The flowers gave off a sweet scent.',
        hindiSentence: 'फूलों से मीठी खुशबू आ रही थी।',
        memoryTip: 'Scent of a perfume'
      },
      {
        id: 'hp-sent',
        sno: 64,
        word: 'Sent',
        partOfSpeech: 'Verb',
        posCategory: 'verb',
        englishMeaning: 'Past tense of "send"',
        hindiMeaning: 'भेजा',
        englishSentence: 'I sent you an email.',
        hindiSentence: 'मैंने तुम्हें ईमेल भेजा।',
        memoryTip: 'Send → Sent'
      }
    ]
  },
  {
    id: 'hp-chord-cord',
    groupTitle: 'Chord vs Cord',
    phonetic: '/kɔːrd/',
    soundKey: 'kɔːrd',
    letter: 'C',
    examFrequency: 'High',
    confusableTip: 'Chord = सुरों का मेल (संगीत) या वृत्त की जीवा; Cord = पतली रस्सी या तार',
    words: [
      {
        id: 'hp-chord',
        sno: 65,
        word: 'Chord',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A combination of musical notes / line in circle',
        hindiMeaning: 'सुरों का मेल (कॉर्ड) / वृत्त की जीवा',
        englishSentence: 'She played a beautiful chord on the piano.',
        hindiSentence: 'उसने पियानो पर सुंदर कॉर्ड बजाया।',
        memoryTip: 'Piano chord / Guitar chord'
      },
      {
        id: 'hp-cord',
        sno: 66,
        word: 'Cord',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A thin rope, wire, or string',
        hindiMeaning: 'डोरी / तार / पतली रस्सी',
        englishSentence: 'He tied the bag with a cord.',
        hindiSentence: 'उसने बैग को डोरी से बांधा।',
        memoryTip: 'Power cord, spinal cord'
      }
    ]
  },
  {
    id: 'hp-cite-site-sight',
    groupTitle: 'Cite vs Site vs Sight',
    phonetic: '/saɪt/',
    soundKey: 'saɪt',
    letter: 'C',
    examFrequency: 'Very High',
    confusableTip: 'Cite = उद्धृत/उल्लेख करना; Site = स्थान/वेबसाइट; Sight = दृष्टि/नज़ारा',
    words: [
      {
        id: 'hp-cite',
        sno: 67,
        word: 'Cite',
        partOfSpeech: 'Verb',
        posCategory: 'verb',
        englishMeaning: 'To mention, quote, or refer as evidence',
        hindiMeaning: 'उल्लेख करना / प्रमाण देना',
        englishSentence: 'He cited a famous example.',
        hindiSentence: 'उसने एक प्रसिद्ध उदाहरण का उल्लेख किया।',
        memoryTip: 'Citation in research papers'
      },
      {
        id: 'hp-site',
        sno: 68,
        word: 'Site',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A location, place, or website',
        hindiMeaning: 'स्थान / जगह / वेबसाइट',
        englishSentence: 'This is the site of the new school.',
        hindiSentence: 'यह नए स्कूल का स्थान है।',
        memoryTip: 'Construction site, Website'
      },
      {
        id: 'hp-sight',
        sno: 69,
        word: 'Sight',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'The act or faculty of seeing / a view',
        hindiMeaning: 'दृष्टि / नज़ारा / दृश्य',
        englishSentence: 'The sight of the mountains was breathtaking.',
        hindiSentence: 'पहाड़ों का दृश्य मनमोहक था।',
        memoryTip: 'Eyesight / Beautiful sight'
      }
    ]
  },
  {
    id: 'hp-coarse-course',
    groupTitle: 'Coarse vs Course',
    phonetic: '/kɔːrs/',
    soundKey: 'kɔːrs',
    letter: 'C',
    examFrequency: 'Very High',
    confusableTip: 'Coarse = खुरदरा / असभ्य; Course = पाठ्यक्रम / दिशा / रास्ता',
    words: [
      {
        id: 'hp-coarse',
        sno: 70,
        word: 'Coarse',
        partOfSpeech: 'Adjective',
        posCategory: 'adj',
        englishMeaning: 'Rough in texture or rude in manner',
        hindiMeaning: 'खुरदरा / मोटा / असभ्य',
        englishSentence: 'His clothes were made of coarse fabric.',
        hindiSentence: 'उसके कपड़े खुरदरे कपड़े से बने थे।',
        memoryTip: 'Coarse sand / Coarse language'
      },
      {
        id: 'hp-course',
        sno: 71,
        word: 'Course',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A path or direction / educational subject / golf course',
        hindiMeaning: 'रास्ता / पाठ्यक्रम / दिशा',
        englishSentence: 'She took a French course.',
        hindiSentence: 'उसने फ्रेंच कोर्स किया।',
        memoryTip: 'Syllabus course / River course'
      }
    ]
  },
  {
    id: 'hp-complement-compliment',
    groupTitle: 'Complement vs Compliment',
    phonetic: '/ˈkɒmplɪmənt/',
    soundKey: 'kɒmplɪmənt',
    letter: 'C',
    examFrequency: 'Very High',
    confusableTip: 'Complement (E) = पूरक (Complete करना); Compliment (I) = तारीफ/प्रशंसा (I praise you)',
    words: [
      {
        id: 'hp-complement',
        sno: 72,
        word: 'Complement',
        partOfSpeech: 'Noun / Verb',
        posCategory: 'noun',
        englishMeaning: 'Something that completes or enhances',
        hindiMeaning: 'पूरक / पूर्ण करने वाली वस्तु',
        englishSentence: 'The sauce is a perfect complement to the dish.',
        hindiSentence: 'यह चटनी इस व्यंजन के लिए एक आदर्श पूरक है।',
        memoryTip: 'ComplEment has "E" like ComplEte'
      },
      {
        id: 'hp-compliment',
        sno: 73,
        word: 'Compliment',
        partOfSpeech: 'Noun / Verb',
        posCategory: 'noun',
        englishMeaning: 'A kind or flattering remark',
        hindiMeaning: 'प्रशंसा / तारीफ करना',
        englishSentence: 'He gave her a nice compliment.',
        hindiSentence: 'उसने उसकी अच्छी तारीफ की।',
        memoryTip: 'ComplIment has "I" like "I like you"'
      }
    ]
  },
  {
    id: 'hp-councillor-counselor',
    groupTitle: 'Councillor vs Counselor',
    phonetic: '/ˈkaʊnsələr/',
    soundKey: 'kaʊnsələr',
    letter: 'C',
    examFrequency: 'High',
    confusableTip: 'Councillor = परिषद/समिति का सदस्य (पार्षद); Counselor = मार्गदर्शन देने वाला सलाहकार',
    words: [
      {
        id: 'hp-councillor',
        sno: 74,
        word: 'Councillor',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'Elected member of a municipal council',
        hindiMeaning: 'पार्षद / नगर परिषद सदस्य',
        englishSentence: 'She is a city councillor.',
        hindiSentence: 'वह शहर की पार्षद है।',
        memoryTip: 'Councillor is from Council (नगर परिषद)'
      },
      {
        id: 'hp-counselor',
        sno: 75,
        word: 'Counselor',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A guide, adviser, or therapist',
        hindiMeaning: 'सलाहकार / परामर्शदाता',
        englishSentence: 'The counselor helped him with his career.',
        hindiSentence: 'काउंसलर ने उसके करियर में मदद की।',
        memoryTip: 'Counselor counsels students'
      }
    ]
  },
  {
    id: 'hp-currant-current',
    groupTitle: 'Currant vs Current',
    phonetic: '/ˈkʌrənt/',
    soundKey: 'kʌrənt',
    letter: 'C',
    examFrequency: 'Very High',
    confusableTip: 'Currant (A) = किशमिश/सूखा फल; Current (E) = विद्युत प्रवाह / वर्तमान समय',
    words: [
      {
        id: 'hp-currant',
        sno: 76,
        word: 'Currant',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A type of small dried grape or berry',
        hindiMeaning: 'किशमिश जैसी छोटी सूखी फलियां',
        englishSentence: 'She used currants in the cake.',
        hindiSentence: 'उसने केक में करंट्स डाले।',
        memoryTip: 'Currant is edible like raisin'
      },
      {
        id: 'hp-current',
        sno: 77,
        word: 'Current',
        partOfSpeech: 'Noun / Adjective',
        posCategory: 'noun',
        englishMeaning: 'Flowing water/electricity or present time',
        hindiMeaning: 'धारा / प्रवाह / वर्तमान',
        englishSentence: 'The river current was strong. What is the current news?',
        hindiSentence: 'नदी की धारा तेज़ थी। वर्तमान समाचार क्या है?',
        memoryTip: 'Current Affairs / Electric Current'
      }
    ]
  },

  // ─── D ───
  {
    id: 'hp-daze-days',
    groupTitle: 'Daze vs Days',
    phonetic: '/deɪz/',
    soundKey: 'deɪz',
    letter: 'D',
    examFrequency: 'Frequent',
    confusableTip: 'Daze = चकरा देना / भ्रम की स्थिति; Days = दिन (Day का Plural)',
    words: [
      {
        id: 'hp-daze',
        sno: 78,
        word: 'Daze',
        partOfSpeech: 'Verb / Noun',
        posCategory: 'noun',
        englishMeaning: 'To stun or confuse / a state of shock',
        hindiMeaning: 'चकरा देना / भ्रम / स्तब्धता',
        englishSentence: 'The blow left him in a daze.',
        hindiSentence: 'उस प्रहार ने उसे चक्कर में डाल दिया।',
        memoryTip: 'Dazed and confused'
      },
      {
        id: 'hp-days',
        sno: 79,
        word: 'Days',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'Periods of 24 hours (plural of day)',
        hindiMeaning: 'दिन (बहुवचन)',
        englishSentence: 'I will be away for three days.',
        hindiSentence: 'मैं तीन दिनों के लिए बाहर रहूंगा।',
        memoryTip: '7 days in a week'
      }
    ]
  },
  {
    id: 'hp-dear-deer',
    groupTitle: 'Dear vs Deer',
    phonetic: '/dɪər/',
    soundKey: 'dɪər',
    letter: 'D',
    examFrequency: 'Frequent',
    confusableTip: 'Dear = प्रिय / लाड़ला / महंगा; Deer = हिरण (पशु)',
    words: [
      {
        id: 'hp-dear',
        sno: 80,
        word: 'Dear',
        partOfSpeech: 'Adjective',
        posCategory: 'adj',
        englishMeaning: 'Loved, cherished, or expensive',
        hindiMeaning: 'प्रिय / लाड़ला / महंगा',
        englishSentence: 'She is very dear to me.',
        hindiSentence: 'वह मुझे बहुत प्रिय हैं।',
        memoryTip: 'Dear friend'
      },
      {
        id: 'hp-deer',
        sno: 81,
        word: 'Deer',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A hoofed forest animal with antlers',
        hindiMeaning: 'हिरण / मृग',
        englishSentence: 'We saw a deer in the forest.',
        hindiSentence: 'हमने जंगल में एक हिरण देखा।',
        memoryTip: 'Deer has antlers'
      }
    ]
  },
  {
    id: 'hp-die-dye',
    groupTitle: 'Die vs Dye',
    phonetic: '/daɪ/',
    soundKey: 'daɪ',
    letter: 'D',
    examFrequency: 'Very High',
    confusableTip: 'Die = मरना (मृत्यु होना); Dye = बालों या कपड़ों को रंगना',
    words: [
      {
        id: 'hp-die',
        sno: 82,
        word: 'Die',
        partOfSpeech: 'Verb',
        posCategory: 'verb',
        englishMeaning: 'To cease living',
        hindiMeaning: 'मरना / समाप्त होना',
        englishSentence: 'Plants die without water.',
        hindiSentence: 'पानी के बिना पौधे मर जाते हैं।',
        memoryTip: 'Die = death'
      },
      {
        id: 'hp-dye',
        sno: 83,
        word: 'Dye',
        partOfSpeech: 'Noun / Verb',
        posCategory: 'verb',
        englishMeaning: 'To colour hair or fabric / coloring substance',
        hindiMeaning: 'रंग / रंगना',
        englishSentence: 'She dyed her hair black.',
        hindiSentence: 'उसने अपने बालों को काला रंगा।',
        memoryTip: 'Hair dye / Tie and dye'
      }
    ]
  },
  {
    id: 'hp-dual-duel',
    groupTitle: 'Dual vs Duel',
    phonetic: '/ˈdjuːəl/',
    soundKey: 'djuːəl',
    letter: 'D',
    examFrequency: 'Very High',
    confusableTip: 'Dual (al) = दोहरा (दो भागों वाला); Duel (el) = दो व्यक्तियों के बीच द्वंद्व युद्ध',
    words: [
      {
        id: 'hp-dual',
        sno: 84,
        word: 'Dual',
        partOfSpeech: 'Adjective',
        posCategory: 'adj',
        englishMeaning: 'Having two parts, elements, or roles',
        hindiMeaning: 'दोहरा / दोहरी भूमिका वाला',
        englishSentence: 'He holds dual citizenship.',
        hindiSentence: 'उसके पास दोहरी नागरिकता है।',
        memoryTip: 'Dual SIM card'
      },
      {
        id: 'hp-duel',
        sno: 85,
        word: 'Duel',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A prearranged combat/fight between two people',
        hindiMeaning: 'द्वंद्व युद्ध / दो योद्धाओं की लड़ाई',
        englishSentence: 'The two warriors fought a duel.',
        hindiSentence: 'दो योद्धाओं ने द्वंद्व युद्ध किया।',
        memoryTip: 'Duel = fight with swords/guns'
      }
    ]
  },
  {
    id: 'hp-draft-draught',
    groupTitle: 'Draft vs Draught',
    phonetic: '/drɑːft/',
    soundKey: 'drɑːft',
    letter: 'D',
    examFrequency: 'High',
    confusableTip: 'Draft = प्रारूप/मसौदा; Draught = ठंडी हवा का झोंका या घूंट (ब्रिटिश स्पेलिंग)',
    words: [
      {
        id: 'hp-draft',
        sno: 86,
        word: 'Draft',
        partOfSpeech: 'Noun / Verb',
        posCategory: 'noun',
        englishMeaning: 'A preliminary version of a document / bank draft',
        hindiMeaning: 'मसौदा / प्रारूप / ड्राफ्ट',
        englishSentence: 'He wrote the first draft of the essay.',
        hindiSentence: 'उसने निबंध का पहला मसौदा लिखा।',
        memoryTip: 'Rough draft of essay'
      },
      {
        id: 'hp-draught',
        sno: 87,
        word: 'Draught',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A current of cool air in a room / a gulp of liquid',
        hindiMeaning: 'हवा का झोंका / एक घूंट',
        englishSentence: 'There was a cold draught in the room.',
        hindiSentence: 'कमरे में ठंडी हवा का झोंका था।',
        memoryTip: 'Draught beer / Cold draught of air'
      }
    ]
  },
  {
    id: 'hp-dissent-descent',
    groupTitle: 'Dissent vs Descent',
    phonetic: '/dɪˈsɛnt/',
    soundKey: 'dɪˈsɛnt',
    letter: 'D',
    examFrequency: 'Very High',
    confusableTip: 'Dissent = असहमति (Dis-agree); Descent = नीचे उतरना / वंश या कुल',
    words: [
      {
        id: 'hp-dissent',
        sno: 88,
        word: 'Dissent',
        partOfSpeech: 'Verb / Noun',
        posCategory: 'noun',
        englishMeaning: 'To express disagreement with official opinion',
        hindiMeaning: 'असहमति / मतभेद प्रकट करना',
        englishSentence: 'He dissented from the final decision.',
        hindiSentence: 'उसने अंतिम निर्णय से असहमति जताई।',
        memoryTip: 'Dissent has "SS" like diSagreement'
      },
      {
        id: 'hp-descent',
        sno: 89,
        word: 'Descent',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A downward movement or ancestral lineage',
        hindiMeaning: 'उतार / अवरोहण / कुल या वंश',
        englishSentence: 'His descent from royalty is surprising.',
        hindiSentence: 'उसका राजघराने से वंशज होना चौंकाने वाला है।',
        memoryTip: 'Descend → Descent (going DOWN)'
      }
    ]
  },
  {
    id: 'hp-discreet-discrete',
    groupTitle: 'Discreet vs Discrete',
    phonetic: '/dɪˈskriːt/',
    soundKey: 'dɪˈskriːt',
    letter: 'D',
    examFrequency: 'Very High',
    confusableTip: 'Discreet (ee) = सतर्क/सावधान; Discrete (ete) = अलग-अलग/पृथक (T ने E को अलग कर दिया)',
    words: [
      {
        id: 'hp-discreet',
        sno: 90,
        word: 'Discreet',
        partOfSpeech: 'Adjective',
        posCategory: 'adj',
        englishMeaning: 'Careful, cautious, and secretive in speech or action',
        hindiMeaning: 'सतर्क / विचारशील / रहस्य गुप्त रखने वाला',
        englishSentence: 'Be discreet with personal information.',
        hindiSentence: 'व्यक्तिगत जानकारी के साथ सतर्क रहें।',
        memoryTip: 'DiscrEEt: The two "e"s stay close together to keep secrets!'
      },
      {
        id: 'hp-discrete',
        sno: 91,
        word: 'Discrete',
        partOfSpeech: 'Adjective',
        posCategory: 'adj',
        englishMeaning: 'Separate, distinct, and unconnected',
        hindiMeaning: 'अलग-अलग / पृथक / खंडित',
        englishSentence: 'These are discrete topics.',
        hindiSentence: 'ये अलग-अलग विषय हैं।',
        memoryTip: 'DiscrEtE: The "t" separates the two "e"s into distinct parts!'
      }
    ]
  },
  {
    id: 'hp-duct-ducked',
    groupTitle: 'Duct vs Ducked',
    phonetic: '/dʌkt/',
    soundKey: 'dʌkt',
    letter: 'D',
    examFrequency: 'High',
    confusableTip: 'Duct = नली या पाइप; Ducked = झुक कर वार से बचना',
    words: [
      {
        id: 'hp-duct',
        sno: 92,
        word: 'Duct',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A tube or channel for fluids/air',
        hindiMeaning: 'नली / वायु नलिका / वाहिनी',
        englishSentence: 'The AC duct was leaking.',
        hindiSentence: 'एसी की नली लीक कर रही थी।',
        memoryTip: 'Air duct / Tear duct in eyes'
      },
      {
        id: 'hp-ducked',
        sno: 93,
        word: 'Ducked',
        partOfSpeech: 'Verb',
        posCategory: 'verb',
        englishMeaning: 'Bent quickly to avoid something',
        hindiMeaning: 'झुक गया / सिर नीचे कर लिया',
        englishSentence: 'He ducked to avoid the ball.',
        hindiSentence: 'उसने गेंद से बचने के लिए सिर झुका लिया।',
        memoryTip: 'Duck under the table'
      }
    ]
  },

  // ─── E ───
  {
    id: 'hp-elicit-illicit',
    groupTitle: 'Elicit vs Illicit',
    phonetic: '/ɪˈlɪsɪt/',
    soundKey: 'ɪlɪsɪt',
    letter: 'E',
    examFrequency: 'Very High',
    confusableTip: 'Elicit (E) = प्रतिक्रिया निकलवाना (Verb); Illicit (I) = गैरकानूनी/अवैध (Adjective)',
    words: [
      {
        id: 'hp-elicit',
        sno: 94,
        word: 'Elicit',
        partOfSpeech: 'Verb',
        posCategory: 'verb',
        englishMeaning: 'To draw out a reaction, reply, or fact',
        hindiMeaning: 'बाहर निकालना / प्रतिक्रिया प्राप्त करना',
        englishSentence: 'The question elicited no response.',
        hindiSentence: 'उस सवाल से कोई प्रतिक्रिया नहीं मिली।',
        memoryTip: 'Elicit = Extract a response'
      },
      {
        id: 'hp-illicit',
        sno: 95,
        word: 'Illicit',
        partOfSpeech: 'Adjective',
        posCategory: 'adj',
        englishMeaning: 'Forbidden by law, rules, or custom; illegal',
        hindiMeaning: 'अवैध / गैरकानूनी / निषिद्ध',
        englishSentence: 'He was arrested for illicit trade.',
        hindiSentence: 'उसे अवैध व्यापार के लिए गिरफ्तार किया गया।',
        memoryTip: 'Illicit starts with "IL" like ILlegal'
      }
    ]
  },
  {
    id: 'hp-emigrant-immigrant',
    groupTitle: 'Emigrant vs Immigrant',
    phonetic: '/ˈɛmɪɡrənt/ - /ˈɪmɪɡrənt/',
    soundKey: 'ɛmɪɡrənt',
    letter: 'E',
    examFrequency: 'Very High',
    confusableTip: 'Emigrant (E) = देश छोड़ने वाला (Exit); Immigrant (I) = दूसरे देश में आने वाला (In)',
    words: [
      {
        id: 'hp-emigrant',
        sno: 96,
        word: 'Emigrant',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A person who leaves their own country to live abroad',
        hindiMeaning: 'उत्प्रवासी (जो अपना देश छोड़कर जाता है)',
        englishSentence: 'The emigrant left for Canada.',
        hindiSentence: 'प्रवासी कनाडा चला गया।',
        memoryTip: 'Emigrant = E for EXIT'
      },
      {
        id: 'hp-immigrant',
        sno: 97,
        word: 'Immigrant',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A person who comes to live permanently in a foreign country',
        hindiMeaning: 'आप्रवासी (जो किसी देश में आकर बसता है)',
        englishSentence: 'The immigrant settled in Australia.',
        hindiSentence: 'आप्रवासी ऑस्ट्रेलिया में बस गया।',
        memoryTip: 'Immigrant = I for IN'
      }
    ]
  },
  {
    id: 'hp-exceed-accede',
    groupTitle: 'Exceed vs Accede',
    phonetic: '/ɪkˈsiːd/ - /əkˈsiːd/',
    soundKey: 'ɪksiːd',
    letter: 'E',
    examFrequency: 'High',
    confusableTip: 'Exceed = सीमा पार करना / अधिक होना; Accede = मांग या पद स्वीकार करना',
    words: [
      {
        id: 'hp-exceed',
        sno: 102,
        word: 'Exceed',
        partOfSpeech: 'Verb',
        posCategory: 'verb',
        englishMeaning: 'To go beyond a limit or amount',
        hindiMeaning: 'सीमा पार करना / बढ़ जाना',
        englishSentence: 'He exceeded the speed limit.',
        hindiSentence: 'उसने गति सीमा पार कर दी।',
        memoryTip: 'Exceed the limit'
      },
      {
        id: 'hp-accede',
        sno: 103,
        word: 'Accede',
        partOfSpeech: 'Verb',
        posCategory: 'verb',
        englishMeaning: 'To agree to a request or demand; assume office',
        hindiMeaning: 'सहमत होना / मान लेना / पद ग्रहण करना',
        englishSentence: 'The manager finally acceded to the request.',
        hindiSentence: 'प्रबंधक ने अंततः अनुरोध स्वीकार कर लिया।',
        memoryTip: 'Accede to a demand'
      }
    ]
  },

  // ─── F ───
  {
    id: 'hp-faze-phase',
    groupTitle: 'Faze vs Phase',
    phonetic: '/feɪz/',
    soundKey: 'feɪz',
    letter: 'F',
    examFrequency: 'Very High',
    confusableTip: 'Faze = विचलित या परेशान करना; Phase = चरण / दौर / अवस्था',
    words: [
      {
        id: 'hp-faze',
        sno: 104,
        word: 'Faze',
        partOfSpeech: 'Verb',
        posCategory: 'verb',
        englishMeaning: 'To disturb, fluster, or dishearten someone',
        hindiMeaning: 'विचलित करना / घबरा देना',
        englishSentence: 'His rude behaviour didn’t faze her.',
        hindiSentence: 'उसका अभद्र व्यवहार उसे विचलित नहीं कर पाया।',
        memoryTip: 'Nothing could faze his confidence'
      },
      {
        id: 'hp-phase',
        sno: 105,
        word: 'Phase',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A distinct stage in a process or development',
        hindiMeaning: 'चरण / दौर / अवस्था',
        englishSentence: 'The moon is in its waxing phase.',
        hindiSentence: 'चंद्रमा अपने बढ़ते चरण में है।',
        memoryTip: 'Phase 1, Phase 2'
      }
    ]
  },
  {
    id: 'hp-flew-flu-flue',
    groupTitle: 'Flew vs Flu vs Flue',
    phonetic: '/fluː/',
    soundKey: 'fluː',
    letter: 'F',
    examFrequency: 'Very High',
    confusableTip: 'Flew = उड़ा (Fly का Past); Flu = इन्फ्लूएंजा बुखार; Flue = चिमनी की नली',
    words: [
      {
        id: 'hp-flew',
        sno: 106,
        word: 'Flew',
        partOfSpeech: 'Verb',
        posCategory: 'verb',
        englishMeaning: 'Past tense of "fly"',
        hindiMeaning: 'उड़ा / उड़ गया',
        englishSentence: 'The bird flew across the sky.',
        hindiSentence: 'पक्षी आकाश में उड़ गया।',
        memoryTip: 'Fly → Flew → Flown'
      },
      {
        id: 'hp-flu',
        sno: 107,
        word: 'Flu',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'Viral influenza illness',
        hindiMeaning: 'फ्लू / संक्रामक जुकाम-बुखार',
        englishSentence: 'He stayed home due to the flu.',
        hindiSentence: 'वह फ्लू के कारण घर पर रहा।',
        memoryTip: 'Catch the flu'
      },
      {
        id: 'hp-flue',
        sno: 108,
        word: 'Flue',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A duct or chimney pipe for smoke',
        hindiMeaning: 'चिमनी की नली / धुआं मार्ग',
        englishSentence: 'Smoke rose through the chimney flue.',
        hindiSentence: 'धुआं चिमनी की नली से ऊपर गया।',
        memoryTip: 'Chimney flue carries smoke'
      }
    ]
  },
  {
    id: 'hp-flair-flare',
    groupTitle: 'Flair vs Flare',
    phonetic: '/flɛər/',
    soundKey: 'flɛər',
    letter: 'F',
    examFrequency: 'Very High',
    confusableTip: 'Flair = जन्मजात प्रतिभा या शैली; Flare = भड़क उठना / तेज़ रोशनी या ज्वाला',
    words: [
      {
        id: 'hp-flair',
        sno: 109,
        word: 'Flair',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A natural talent, aptitude, or stylishness',
        hindiMeaning: 'स्वाभाविक प्रतिभा / विशेष कुशलता / शैली',
        englishSentence: 'She has a flair for writing.',
        hindiSentence: 'उसे लेखन की विशेष प्रतिभा है।',
        memoryTip: 'Flair for music or design'
      },
      {
        id: 'hp-flare',
        sno: 110,
        word: 'Flare',
        partOfSpeech: 'Noun / Verb',
        posCategory: 'verb',
        englishMeaning: 'A sudden burst of bright light or flame; to burn brightly',
        hindiMeaning: 'ज्वाला / अचानक चमक उठना / भड़कना',
        englishSentence: 'The flare lit up the night.',
        hindiSentence: 'रोशनी की चमक से रात रोशन हो गई।',
        memoryTip: 'Solar flare, Flare gun'
      }
    ]
  },
  {
    id: 'hp-flea-flee',
    groupTitle: 'Flea vs Flee',
    phonetic: '/fliː/',
    soundKey: 'fliː',
    letter: 'F',
    examFrequency: 'Very High',
    confusableTip: 'Flea = पिस्सू (छोटा कीड़ा); Flee = भाग जाना / पलायन करना',
    words: [
      {
        id: 'hp-flea',
        sno: 111,
        word: 'Flea',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A small wingless jumping insect that bites',
        hindiMeaning: 'पिस्सू (कीड़ा)',
        englishSentence: 'The dog had fleas.',
        hindiSentence: 'कुत्ते को पिस्सू हो गए थे।',
        memoryTip: 'Flea market'
      },
      {
        id: 'hp-flee',
        sno: 112,
        word: 'Flee',
        partOfSpeech: 'Verb',
        posCategory: 'verb',
        englishMeaning: 'To run away from danger or pursuit',
        hindiMeaning: 'भाग जाना / पलायन करना',
        englishSentence: 'The thief tried to flee the scene.',
        hindiSentence: 'चोर मौके से भागने की कोशिश कर रहा था।',
        memoryTip: 'Flee from danger'
      }
    ]
  },
  {
    id: 'hp-flour-flower',
    groupTitle: 'Flour vs Flower',
    phonetic: '/ˈflaʊər/',
    soundKey: 'flaʊər',
    letter: 'F',
    examFrequency: 'Frequent',
    confusableTip: 'Flour = आटा (गेहूं का); Flower = फूल / पुष्प',
    words: [
      {
        id: 'hp-flour',
        sno: 113,
        word: 'Flour',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'Powder obtained by grinding grain',
        hindiMeaning: 'आटा',
        englishSentence: 'Mix flour with water.',
        hindiSentence: 'आटे को पानी में मिलाओ।',
        memoryTip: 'Wheat flour'
      },
      {
        id: 'hp-flower',
        sno: 114,
        word: 'Flower',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'The reproductive part of a plant; blossom',
        hindiMeaning: 'फूल / पुष्प',
        englishSentence: 'The garden was full of flowers.',
        hindiSentence: 'बग़ीचा फूलों से भरा हुआ था।',
        memoryTip: 'Rose is a flower'
      }
    ]
  },
  {
    id: 'hp-for-four-fore',
    groupTitle: 'For vs Four vs Fore',
    phonetic: '/fɔːr/',
    soundKey: 'fɔːr',
    letter: 'F',
    examFrequency: 'Frequent',
    confusableTip: 'For = के लिए; Four = संख्या 4; Fore = आगे / सामने का भाग',
    words: [
      {
        id: 'hp-for',
        sno: 115,
        word: 'For',
        partOfSpeech: 'Preposition',
        posCategory: 'prep',
        englishMeaning: 'Intended to be given to / regarding',
        hindiMeaning: 'के लिए',
        englishSentence: 'This gift is for you.',
        hindiSentence: 'यह उपहार तुम्हारे लिए है।',
        memoryTip: 'Wait for me'
      },
      {
        id: 'hp-four',
        sno: 116,
        word: 'Four',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'The number 4',
        hindiMeaning: 'चार (संख्या)',
        englishSentence: 'I have four apples.',
        hindiSentence: 'मेरे पास चार सेब हैं।',
        memoryTip: 'Number 4'
      },
      {
        id: 'hp-fore',
        sno: 117,
        word: 'Fore',
        partOfSpeech: 'Adverb / Prefix',
        posCategory: 'other',
        englishMeaning: 'At the front / situated in advance',
        hindiMeaning: 'आगे / सामने का हिस्सा',
        englishSentence: 'He stood at the fore of the boat.',
        hindiSentence: 'वह नाव के आगे वाले भाग में खड़ा था।',
        memoryTip: 'Forehead, Forefront'
      }
    ]
  },
  {
    id: 'hp-forth-fourth',
    groupTitle: 'Forth vs Fourth',
    phonetic: '/fɔːrθ/',
    soundKey: 'fɔːrθ',
    letter: 'F',
    examFrequency: 'Very High',
    confusableTip: 'Forth = आगे की ओर (Go forth); Fourth = चौथा (4th स्थान)',
    words: [
      {
        id: 'hp-forth',
        sno: 118,
        word: 'Forth',
        partOfSpeech: 'Adverb',
        posCategory: 'adv',
        englishMeaning: 'Forward, outward, into view',
        hindiMeaning: 'आगे / सामने',
        englishSentence: 'He stepped forth with confidence.',
        hindiSentence: 'वह आत्मविश्वास के साथ आगे बढ़ा।',
        memoryTip: 'Back and forth / Bring forth'
      },
      {
        id: 'hp-fourth',
        sno: 119,
        word: 'Fourth',
        partOfSpeech: 'Adjective / Noun',
        posCategory: 'adj',
        englishMeaning: 'Number 4th in a sequence',
        hindiMeaning: 'चौथा',
        englishSentence: 'Today is the fourth day of the month.',
        hindiSentence: 'आज महीने का चौथा दिन है।',
        memoryTip: 'Fourth has "U" from FOUR'
      }
    ]
  },
  {
    id: 'hp-foul-fowl',
    groupTitle: 'Foul vs Fowl',
    phonetic: '/faʊl/',
    soundKey: 'faʊl',
    letter: 'F',
    examFrequency: 'Very High',
    confusableTip: 'Foul = बदबूदार / गंदा / खेल में नियम तोड़ना; Fowl = खाने योग्य पक्षी (मुर्गी/बत्तख)',
    words: [
      {
        id: 'hp-foul',
        sno: 120,
        word: 'Foul',
        partOfSpeech: 'Adjective / Noun',
        posCategory: 'adj',
        englishMeaning: 'Unpleasant smell / offensive / rule violation',
        hindiMeaning: 'गंदा / बदबूदार / खेल में फाउल',
        englishSentence: 'That was a foul smell. He committed a foul in the game.',
        hindiSentence: 'वह गंध बहुत गंदी थी। उसने खेल में फाउल किया।',
        memoryTip: 'Foul smell / Foul play'
      },
      {
        id: 'hp-fowl',
        sno: 121,
        word: 'Fowl',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A bird kept for eggs or meat (poultry)',
        hindiMeaning: 'खाने योग्य पक्षी (मुर्गी आदि)',
        englishSentence: 'Chickens are a type of fowl.',
        hindiSentence: 'मुर्गियाँ एक प्रकार की पक्षी हैं।',
        memoryTip: 'Waterfowl / Wild fowl'
      }
    ]
  },
  {
    id: 'hp-freeze-frieze',
    groupTitle: 'Freeze vs Frieze',
    phonetic: '/friːz/',
    soundKey: 'friːz',
    letter: 'F',
    examFrequency: 'High',
    confusableTip: 'Freeze = बर्फ में जमना या स्थिर होना; Frieze = दीवार पर नक्काशीदार सजावटी पट्टी',
    words: [
      {
        id: 'hp-freeze',
        sno: 122,
        word: 'Freeze',
        partOfSpeech: 'Verb',
        posCategory: 'verb',
        englishMeaning: 'To turn into ice / become motionless',
        hindiMeaning: 'जमना / बर्फ बनना',
        englishSentence: 'Water freezes at 0°C.',
        hindiSentence: 'पानी 0°C पर जम जाता है।',
        memoryTip: 'Deep freeze / Freeze frame'
      },
      {
        id: 'hp-frieze',
        sno: 123,
        word: 'Frieze',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A broad horizontal band of sculpted decoration on a wall',
        hindiMeaning: 'सजावटी नक्काशीदार पट्टी',
        englishSentence: 'The ceiling had a carved frieze.',
        hindiSentence: 'छत पर नक्काशीदार पट्टी थी।',
        memoryTip: 'Architectural frieze'
      }
    ]
  },

  // ─── G ───
  {
    id: 'hp-gait-gate',
    groupTitle: 'Gait vs Gate',
    phonetic: '/ɡeɪt/',
    soundKey: 'ɡeɪt',
    letter: 'G',
    examFrequency: 'Very High',
    confusableTip: 'Gait = चाल / चलने का तरीका; Gate = फाटक / बड़ा दरवाज़ा',
    words: [
      {
        id: 'hp-gait',
        sno: 124,
        word: 'Gait',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A person\'s manner of walking',
        hindiMeaning: 'चाल / चलने का ढंग',
        englishSentence: 'His gait was slow and steady.',
        hindiSentence: 'उसकी चाल धीमी और स्थिर थी।',
        memoryTip: 'Gait analysis in athletes'
      },
      {
        id: 'hp-gate',
        sno: 125,
        word: 'Gate',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A hinged barrier used to close an opening in a wall or fence',
        hindiMeaning: 'फाटक / बड़ा दरवाज़ा',
        englishSentence: 'Please close the gate.',
        hindiSentence: 'कृपया फाटक बंद कर दें।',
        memoryTip: 'Main gate'
      }
    ]
  },
  {
    id: 'hp-gamble-gambol',
    groupTitle: 'Gamble vs Gambol',
    phonetic: '/ˈɡæmbl/',
    soundKey: 'ɡæmbl',
    letter: 'G',
    examFrequency: 'High',
    confusableTip: 'Gamble = जुआ खेलना / जोखिम लेना; Gambol = खुशी में उछल-कूद करना',
    words: [
      {
        id: 'hp-gamble',
        sno: 126,
        word: 'Gamble',
        partOfSpeech: 'Verb / Noun',
        posCategory: 'verb',
        englishMeaning: 'To play games of chance for money / take a risk',
        hindiMeaning: 'जुआ खेलना / बाजी लगाना / जोखिम लेना',
        englishSentence: 'He likes to gamble at the casino.',
        hindiSentence: 'उसे कैसीनो में जुआ खेलना पसंद है।',
        memoryTip: 'Gambling in casino'
      },
      {
        id: 'hp-gambol',
        sno: 127,
        word: 'Gambol',
        partOfSpeech: 'Verb',
        posCategory: 'verb',
        englishMeaning: 'To run or jump about playfully; frolic',
        hindiMeaning: 'उछल-कूद करना / किलोल करना',
        englishSentence: 'The lambs gambolled in the field.',
        hindiSentence: 'मेमने खेत में उछल-कूद कर रहे थे।',
        memoryTip: 'Lambs gambol like playing kids'
      }
    ]
  },
  {
    id: 'hp-gene-jean',
    groupTitle: 'Gene vs Jean',
    phonetic: '/dʒiːn/',
    soundKey: 'dʒiːn',
    letter: 'G',
    examFrequency: 'Frequent',
    confusableTip: 'Gene = आनुवंशिक इकाई; Jean = डेनिम कपड़ा या जीन्स पैंट',
    words: [
      {
        id: 'hp-gene',
        sno: 128,
        word: 'Gene',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A biological unit of heredity passed to offspring',
        hindiMeaning: 'जीन / आनुवंशिक घटक',
        englishSentence: 'Eye colour is determined by genes.',
        hindiSentence: 'आंखों का रंग जीन द्वारा तय होता है।',
        memoryTip: 'Genetics, DNA genes'
      },
      {
        id: 'hp-jean',
        sno: 129,
        word: 'Jean',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'Denim fabric or trousers',
        hindiMeaning: 'जीन्स का कपड़ा / पैंट',
        englishSentence: 'He wore blue jeans.',
        hindiSentence: 'उसने नीली जीन्स पहनी।',
        memoryTip: 'Blue jeans'
      }
    ]
  },
  {
    id: 'hp-grown-groan',
    groupTitle: 'Grown vs Groan',
    phonetic: '/ɡroʊn/',
    soundKey: 'ɡroʊn',
    letter: 'G',
    examFrequency: 'Very High',
    confusableTip: 'Grown = बड़ा हुआ (Grow का Past Participle); Groan = दर्द या हताशा में कराहना',
    words: [
      {
        id: 'hp-grown',
        sno: 132,
        word: 'Grown',
        partOfSpeech: 'Verb',
        posCategory: 'verb',
        englishMeaning: 'Past participle of "grow" (increased in size)',
        hindiMeaning: 'बढ़ा हुआ / विकसित',
        englishSentence: 'The plant has grown tall.',
        hindiSentence: 'पौधा लंबा हो गया है।',
        memoryTip: 'Fully grown adult'
      },
      {
        id: 'hp-groan',
        sno: 133,
        word: 'Groan',
        partOfSpeech: 'Verb / Noun',
        posCategory: 'verb',
        englishMeaning: 'A deep inarticulate sound of pain or despair',
        hindiMeaning: 'कराहना / पीड़ा से आह भरना',
        englishSentence: 'He let out a groan of pain.',
        hindiSentence: 'उसने दर्द से कराह उठी।',
        memoryTip: 'Groan in pain'
      }
    ]
  },
  {
    id: 'hp-guessed-guest',
    groupTitle: 'Guessed vs Guest',
    phonetic: '/ɡɛst/',
    soundKey: 'ɡɛst',
    letter: 'G',
    examFrequency: 'Very High',
    confusableTip: 'Guessed = अनुमान लगाया; Guest = अतिथि / मेहमान',
    words: [
      {
        id: 'hp-guessed',
        sno: 134,
        word: 'Guessed',
        partOfSpeech: 'Verb',
        posCategory: 'verb',
        englishMeaning: 'Formed an estimate without complete information',
        hindiMeaning: 'अनुमान लगाया / अंदाज़ा लगाया',
        englishSentence: 'She guessed the correct answer.',
        hindiSentence: 'उसने सही उत्तर का अनुमान लगाया।',
        memoryTip: 'Guess + ed'
      },
      {
        id: 'hp-guest',
        sno: 135,
        word: 'Guest',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A person invited to visit or stay',
        hindiMeaning: 'अतिथि / मेहमान',
        englishSentence: 'We have a guest for dinner.',
        hindiSentence: 'हमारे पास रात्रिभोज के लिए अतिथि है।',
        memoryTip: 'Special guest'
      }
    ]
  },
  {
    id: 'hp-gorilla-guerrilla',
    groupTitle: 'Gorilla vs Guerrilla',
    phonetic: '/ɡəˈrɪlə/',
    soundKey: 'ɡərɪlə',
    letter: 'G',
    examFrequency: 'Very High',
    confusableTip: 'Gorilla = वनमानुष (बंदर प्रजाति); Guerrilla = छापामार सैनिक या युद्ध रणनीति',
    words: [
      {
        id: 'hp-gorilla',
        sno: 136,
        word: 'Gorilla',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A powerfully built great ape found in Africa',
        hindiMeaning: 'गोरिल्ला (वनमानुष)',
        englishSentence: 'The gorilla beat its chest.',
        hindiSentence: 'गोरिल्ला ने अपनी छाती पीटी।',
        memoryTip: 'Gorilla in the jungle'
      },
      {
        id: 'hp-guerrilla',
        sno: 137,
        word: 'Guerrilla',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A member of an irregular military force fighting small battles',
        hindiMeaning: 'छापामार सैनिक / गुरिल्ला युद्ध',
        englishSentence: 'The guerrilla attacked at night.',
        hindiSentence: 'छापामार सैनिक ने रात में हमला किया।',
        memoryTip: 'Guerrilla warfare (शिवाजी महाराज की युद्धनीति)'
      }
    ]
  },

  // ─── H ───
  {
    id: 'hp-hair-hare',
    groupTitle: 'Hair vs Hare',
    phonetic: '/hɛər/',
    soundKey: 'hɛər',
    letter: 'H',
    examFrequency: 'Frequent',
    confusableTip: 'Hair = सिर या शरीर के बाल; Hare = तेज़ दौड़ने वाला बड़ा खरगोश',
    words: [
      {
        id: 'hp-hair',
        sno: 138,
        word: 'Hair',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'Fine threads growing from skin',
        hindiMeaning: 'बाल / केश',
        englishSentence: 'She has long black hair.',
        hindiSentence: 'उसके लंबे काले बाल हैं।',
        memoryTip: 'Hair cut'
      },
      {
        id: 'hp-hare',
        sno: 139,
        word: 'Hare',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A fast-running animal resembling a rabbit',
        hindiMeaning: 'खरगोश (बड़ा जंगली खरगोश)',
        englishSentence: 'The hare ran quickly into the woods.',
        hindiSentence: 'खरगोश जंगल में तेज़ दौड़ा।',
        memoryTip: 'Tortoise and the Hare fable'
      }
    ]
  },
  {
    id: 'hp-hall-haul',
    groupTitle: 'Hall vs Haul',
    phonetic: '/hɔːl/',
    soundKey: 'hɔːl',
    letter: 'H',
    examFrequency: 'High',
    confusableTip: 'Hall = बड़ा कमरा / सभागार; Haul = भारी सामान खींचना या ढोना',
    words: [
      {
        id: 'hp-hall',
        sno: 140,
        word: 'Hall',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A large room for meetings, concerts, or corridors',
        hindiMeaning: 'सभागार / बड़ा कमरा / हॉल',
        englishSentence: 'The wedding was held in a grand hall.',
        hindiSentence: 'शादी एक भव्य हॉल में हुई।',
        memoryTip: 'Town hall / Dining hall'
      },
      {
        id: 'hp-haul',
        sno: 141,
        word: 'Haul',
        partOfSpeech: 'Verb / Noun',
        posCategory: 'verb',
        englishMeaning: 'To pull or drag with effort; load transported',
        hindiMeaning: 'खींचना / ढुलाई करना / भारी बोझ',
        englishSentence: 'They hauled the boat to the shore.',
        hindiSentence: 'उन्होंने नाव को किनारे तक खींचा।',
        memoryTip: 'Long-haul flight'
      }
    ]
  },
  {
    id: 'hp-hangar-hanger',
    groupTitle: 'Hangar vs Hanger',
    phonetic: '/ˈhæŋər/',
    soundKey: 'hæŋər',
    letter: 'H',
    examFrequency: 'Very High',
    confusableTip: 'Hangar (AR) = विमान रखने का शेड; Hanger (ER) = कपड़े टांगने का हैंगर',
    words: [
      {
        id: 'hp-hangar',
        sno: 142,
        word: 'Hangar',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A large building for housing aircraft',
        hindiMeaning: 'विमान शेड (हवाई जहाज रखने का गैराज)',
        englishSentence: 'The plane was parked in the hangar.',
        hindiSentence: 'विमान हैंगर में खड़ा था।',
        memoryTip: 'HangAr has "A" for Airplane'
      },
      {
        id: 'hp-hanger',
        sno: 143,
        word: 'Hanger',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A device hung in a wardrobe for clothes',
        hindiMeaning: 'कपड़े टांगने की वस्तु',
        englishSentence: 'I hung my coat on a hanger.',
        hindiSentence: 'मैंने अपनी कोट हैंगर पर टांग दी।',
        memoryTip: 'Coat hanger'
      }
    ]
  },
  {
    id: 'hp-heal-heel',
    groupTitle: 'Heal vs Heel',
    phonetic: '/hiːl/',
    soundKey: 'hiːl',
    letter: 'H',
    examFrequency: 'Very High',
    confusableTip: 'Heal = घाव या बीमारी का ठीक होना; Heel = पैर की एड़ी या जूते की हील',
    words: [
      {
        id: 'hp-heal',
        sno: 144,
        word: 'Heal',
        partOfSpeech: 'Verb',
        posCategory: 'verb',
        englishMeaning: 'To become sound or healthy again; cure',
        hindiMeaning: 'ठीक होना / घाव भरना',
        englishSentence: 'Time will heal all wounds.',
        hindiSentence: 'समय सभी घाव भर देगा।',
        memoryTip: 'Heal has "EA" like hEAlth'
      },
      {
        id: 'hp-heel',
        sno: 145,
        word: 'Heel',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'The back part of the human foot below the ankle',
        hindiMeaning: 'एड़ी / जूते की हील',
        englishSentence: 'Her shoe’s heel broke off.',
        hindiSentence: 'उसकी जूते की एड़ी टूट गई।',
        memoryTip: 'High heels / Achilles heel'
      }
    ]
  },
  {
    id: 'hp-heard-herd',
    groupTitle: 'Heard vs Herd',
    phonetic: '/hɜːrd/',
    soundKey: 'hɜːrd',
    letter: 'H',
    examFrequency: 'Very High',
    confusableTip: 'Heard = सुना (Hear का Past); Herd = मवेशियों या पशुओं का झुंड',
    words: [
      {
        id: 'hp-heard',
        sno: 146,
        word: 'Heard',
        partOfSpeech: 'Verb',
        posCategory: 'verb',
        englishMeaning: 'Past tense of "hear"',
        hindiMeaning: 'सुना / कानों से सुना',
        englishSentence: 'I heard your voice clearly.',
        hindiSentence: 'मैंने तुम्हारी आवाज़ साफ़ सुनी।',
        memoryTip: 'hEARd has EAR inside it'
      },
      {
        id: 'hp-herd',
        sno: 147,
        word: 'Herd',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A large group of animals (cows, elephants)',
        hindiMeaning: 'जानवरों का झुंड',
        englishSentence: 'A herd of cows blocked the road.',
        hindiSentence: 'गायों का झुंड रास्ता रोक रहा था।',
        memoryTip: 'Herd of cattle / Shepherd'
      }
    ]
  },
  {
    id: 'hp-hoard-horde',
    groupTitle: 'Hoard vs Horde',
    phonetic: '/hɔːrd/',
    soundKey: 'hɔːrd',
    letter: 'H',
    examFrequency: 'Very High',
    confusableTip: 'Hoard = गुप्त रूप से जमाखोरी करना; Horde = लोगों या लुटेरों की अनियंत्रित भीड़',
    words: [
      {
        id: 'hp-hoard',
        sno: 148,
        word: 'Hoard',
        partOfSpeech: 'Verb / Noun',
        posCategory: 'verb',
        englishMeaning: 'To amass and hide a store of money or valued objects',
        hindiMeaning: 'जमाखोरी करना / गुप्त संग्रह',
        englishSentence: 'People hoarded food during the lockdown.',
        hindiSentence: 'लोगों ने लॉकडाउन के दौरान खाना जमा किया।',
        memoryTip: 'Hoard = stockpile supplies'
      },
      {
        id: 'hp-horde',
        sno: 149,
        word: 'Horde',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A large, disordered group of people or barbarians',
        hindiMeaning: 'भीड़ / झुंड / हमलावर दल',
        englishSentence: 'A horde of fans surrounded the actor.',
        hindiSentence: 'अभिनेता को प्रशंसकों की भीड़ ने घेर लिया।',
        memoryTip: 'Golden Horde / Horde of zombies'
      }
    ]
  },
  {
    id: 'hp-hole-whole',
    groupTitle: 'Hole vs Whole',
    phonetic: '/hoʊl/',
    soundKey: 'hoʊl',
    letter: 'H',
    examFrequency: 'Frequent',
    confusableTip: 'Hole = छेद या गड्ढा; Whole = सम्पूर्ण / पूरा का पूरा',
    words: [
      {
        id: 'hp-hole',
        sno: 150,
        word: 'Hole',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'An opening or hollow space into something',
        hindiMeaning: 'छेद / बिल / सुराख',
        englishSentence: 'There’s a hole in my sock.',
        hindiSentence: 'मेरी जुराब में छेद है।',
        memoryTip: 'Hole in the wall'
      },
      {
        id: 'hp-whole',
        sno: 151,
        word: 'Whole',
        partOfSpeech: 'Adjective / Noun',
        posCategory: 'adj',
        englishMeaning: 'Entire, unbroken, complete',
        hindiMeaning: 'पूरा / सम्पूर्ण',
        englishSentence: 'I read the whole book.',
        hindiSentence: 'मैंने पूरी किताब पढ़ी।',
        memoryTip: 'Whole world'
      }
    ]
  },
  {
    id: 'hp-hour-our',
    groupTitle: 'Hour vs Our',
    phonetic: '/ˈaʊər/',
    soundKey: 'aʊər',
    letter: 'H',
    examFrequency: 'Frequent',
    confusableTip: 'Hour = 60 मिनट (समय का घंटा); Our = हमारा (सर्वनाम)',
    words: [
      {
        id: 'hp-hour',
        sno: 152,
        word: 'Hour',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A period of time equal to 60 minutes',
        hindiMeaning: 'घंटा (समय की इकाई)',
        englishSentence: 'It takes an hour to get there.',
        hindiSentence: 'वहाँ पहुँचने में एक घंटा लगता है।',
        memoryTip: 'H is silent in Hour (takes "an hour")'
      },
      {
        id: 'hp-our',
        sno: 153,
        word: 'Our',
        partOfSpeech: 'Pronoun',
        posCategory: 'pron',
        englishMeaning: 'Belonging to or associated with us',
        hindiMeaning: 'हमारा / हमारी',
        englishSentence: 'This is our home.',
        hindiSentence: 'यह हमारा घर है।',
        memoryTip: 'Our country'
      }
    ]
  },
  {
    id: 'hp-idle-idol',
    groupTitle: 'Idle vs Idol',
    phonetic: '/ˈaɪdl/',
    soundKey: 'aɪdl',
    letter: 'I',
    examFrequency: 'Very High',
    confusableTip: 'Idle = आलसी / बेकार / खाली; Idol = मूर्ति / पूजनीय आदर्श व्यक्ति',
    words: [
      {
        id: 'hp-idle',
        sno: 154,
        word: 'Idle',
        partOfSpeech: 'Adjective',
        posCategory: 'adj',
        englishMeaning: 'Avoiding work, lazy, inactive, jobless',
        hindiMeaning: 'निष्क्रिय / आलसी / खाली बैठा',
        englishSentence: 'The workers sat idle all day.',
        hindiSentence: 'मजदूर पूरे दिन खाली बैठे रहे।',
        memoryTip: 'Idle mind is the devil\'s workshop'
      },
      {
        id: 'hp-idol',
        sno: 155,
        word: 'Idol',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'An image or statue of a god / person greatly admired',
        hindiMeaning: 'मूर्ति / पूज्य प्रतिमा / आदर्श व्यक्ति',
        englishSentence: 'He is a sports idol for many.',
        hindiSentence: 'वह कई लोगों के लिए खेल जगत का आदर्श है।',
        memoryTip: 'Indian Idol / Idol worship'
      }
    ]
  },
  {
    id: 'hp-incite-insight',
    groupTitle: 'Incite vs Insight',
    phonetic: '/ɪnˈsaɪt/',
    soundKey: 'ɪnsaɪt',
    letter: 'I',
    examFrequency: 'Very High',
    confusableTip: 'Incite = भड़काना या उकसाना; Insight = गहरी समझ / अंतर्दृष्टि',
    words: [
      {
        id: 'hp-incite',
        sno: 156,
        word: 'Incite',
        partOfSpeech: 'Verb',
        posCategory: 'verb',
        englishMeaning: 'To encourage or stir up violent or unlawful behaviour',
        hindiMeaning: 'भड़काना / उकसाना',
        englishSentence: 'He incited the crowd to violence.',
        hindiSentence: 'उसने भीड़ को हिंसा के लिए भड़काया।',
        memoryTip: 'Incite to riot'
      },
      {
        id: 'hp-insight',
        sno: 157,
        word: 'Insight',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'The capacity to gain an accurate and deep understanding',
        hindiMeaning: 'अंतर्दृष्टि / गहरी समझ',
        englishSentence: 'She gave valuable insight into the problem.',
        hindiSentence: 'उसने समस्या पर मूल्यवान अंतर्दृष्टि दी।',
        memoryTip: 'Insight = In-Sight (seeing inside deeply)'
      }
    ]
  },
  {
    id: 'hp-imminent-eminent',
    groupTitle: 'Imminent vs Eminent',
    phonetic: '/ˈɪmɪnənt/ - /ˈɛmɪnənt/',
    soundKey: 'ɪmɪnənt',
    letter: 'I',
    examFrequency: 'Very High',
    confusableTip: 'Imminent (Im) = तुरंत होने वाला (आसन्न खतरा); Eminent (Em) = विख्यात / प्रतिष्ठित व्यक्ति',
    words: [
      {
        id: 'hp-imminent',
        sno: 158,
        word: 'Imminent',
        partOfSpeech: 'Adjective',
        posCategory: 'adj',
        englishMeaning: 'About to happen soon; impending',
        hindiMeaning: 'आसन्न / शीघ्र होने वाला',
        englishSentence: 'A storm is imminent.',
        hindiSentence: 'तूफान आने वाला है।',
        memoryTip: 'Imminent danger'
      },
      {
        id: 'hp-eminent',
        sno: 159,
        word: 'Eminent',
        partOfSpeech: 'Adjective',
        posCategory: 'adj',
        englishMeaning: 'Famous, respected, and distinguished',
        hindiMeaning: 'प्रतिष्ठित / प्रख्यात / गणमान्य',
        englishSentence: 'She is an eminent scientist.',
        hindiSentence: 'वह एक प्रतिष्ठित वैज्ञानिक हैं।',
        memoryTip: 'Eminent personality'
      }
    ]
  },
  {
    id: 'hp-in-inn',
    groupTitle: 'In vs Inn',
    phonetic: '/ɪn/',
    soundKey: 'ɪn',
    letter: 'I',
    examFrequency: 'Frequent',
    confusableTip: 'In = अंदर / में (Preposition); Inn = धर्मशाला / सराय / छोटा होटल',
    words: [
      {
        id: 'hp-in',
        sno: 162,
        word: 'In',
        partOfSpeech: 'Preposition',
        posCategory: 'prep',
        englishMeaning: 'Expressing the situation of something enclosed or inside',
        hindiMeaning: 'में / अंदर',
        englishSentence: 'The book is in the bag.',
        hindiSentence: 'किताब बैग में है।',
        memoryTip: 'In the room'
      },
      {
        id: 'hp-inn',
        sno: 163,
        word: 'Inn',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A pub or small hotel providing food and lodging',
        hindiMeaning: 'सराय / धर्मशाला / छोटा होटल',
        englishSentence: 'We stayed at a cozy inn.',
        hindiSentence: 'हम एक आरामदायक सराय में रुके।',
        memoryTip: 'Holiday Inn'
      }
    ]
  },
  {
    id: 'hp-indict-indite',
    groupTitle: 'Indict vs Indite',
    phonetic: '/ɪnˈdaɪt/',
    soundKey: 'ɪndaɪt',
    letter: 'I',
    examFrequency: 'Very High',
    confusableTip: 'Indict (C is silent) = अपराध का अभियोग लगाना; Indite = रचना या पत्र लिखना',
    words: [
      {
        id: 'hp-indict',
        sno: 166,
        word: 'Indict',
        partOfSpeech: 'Verb',
        posCategory: 'verb',
        englishMeaning: 'To formally accuse of or charge with a serious crime',
        hindiMeaning: 'अभियोग लगाना / दोषारोपण करना',
        englishSentence: 'He was indicted for fraud.',
        hindiSentence: 'उस पर धोखाधड़ी का अभियोग लगाया गया।',
        memoryTip: 'Indict is pronounced in-DITE (silent C)'
      },
      {
        id: 'hp-indite',
        sno: 167,
        word: 'Indite',
        partOfSpeech: 'Verb',
        posCategory: 'verb',
        englishMeaning: 'To write, compose, or produce a literary work',
        hindiMeaning: 'रचना करना / पत्र आदि लिखना',
        englishSentence: 'He indited a letter to the king.',
        hindiSentence: 'उसने राजा को एक पत्र लिखा।',
        memoryTip: 'Indite = write poetry or prose'
      }
    ]
  },

  // ─── J & K ───
  {
    id: 'hp-jewel-joule',
    groupTitle: 'Jewel vs Joule',
    phonetic: '/ˈdʒuːəl/',
    soundKey: 'dʒuːəl',
    letter: 'J',
    examFrequency: 'High',
    confusableTip: 'Jewel = कीमती रत्न / आभूषण; Joule = ऊर्जा या कार्य की वैज्ञानिक इकाई',
    words: [
      {
        id: 'hp-jewel',
        sno: 170,
        word: 'Jewel',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A precious stone typically polished; gem',
        hindiMeaning: 'रत्न / मणि / बहुमूल्य पत्थर',
        englishSentence: 'That necklace has a rare jewel.',
        hindiSentence: 'उस हार में एक दुर्लभ रत्न है।',
        memoryTip: 'Jewellery'
      },
      {
        id: 'hp-joule',
        sno: 171,
        word: 'Joule',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'The SI unit of work or energy',
        hindiMeaning: 'जूल (ऊर्जा या कार्य की वैज्ञानिक इकाई)',
        englishSentence: 'One joule equals one newton-metre.',
        hindiSentence: 'एक जूल एक न्यूटन-मीटर के बराबर होता है।',
        memoryTip: 'Physics unit: Joules'
      }
    ]
  },
  {
    id: 'hp-kernel-colonel',
    groupTitle: 'Kernel vs Colonel',
    phonetic: '/ˈkɜːrnl/',
    soundKey: 'kɜːrnl',
    letter: 'K',
    examFrequency: 'Very High',
    confusableTip: 'Kernel = बीज का मुख्य भीतरी भाग / कंप्यूटर कोर; Colonel = सेना में कर्नल रैंक',
    words: [
      {
        id: 'hp-kernel',
        sno: 172,
        word: 'Kernel',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'The softer, edible part of a nut/seed, or core part',
        hindiMeaning: 'बीज का भीतरी भाग / गिरी / मुख्य केंद्र',
        englishSentence: 'The kernel of corn was soft.',
        hindiSentence: 'मक्का का दाना नरम था।',
        memoryTip: 'OS Kernel / Corn kernel'
      },
      {
        id: 'hp-colonel',
        sno: 173,
        word: 'Colonel',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'An army officer of high rank',
        hindiMeaning: 'कर्नल (सेना का उच्च पद)',
        englishSentence: 'The colonel inspected the troops.',
        hindiSentence: 'कर्नल ने सैनिकों की जांच की।',
        memoryTip: 'Colonel is pronounced "Kernel" (silent L)'
      }
    ]
  },
  {
    id: 'hp-knight-night',
    groupTitle: 'Knight vs Night',
    phonetic: '/naɪt/',
    soundKey: 'naɪt',
    letter: 'K',
    examFrequency: 'Frequent',
    confusableTip: 'Knight (K) = शूरवीर / योद्धा; Night = रात (संध्या के बाद)',
    words: [
      {
        id: 'hp-knight',
        sno: 174,
        word: 'Knight',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A medieval warrior or man granted honorary title',
        hindiMeaning: 'शूरवीर / योद्धा / नाइट उपाधि',
        englishSentence: 'The knight wore shining armour.',
        hindiSentence: 'शूरवीर ने चमकदार कवच पहना था।',
        memoryTip: 'Knight in shining armour'
      },
      {
        id: 'hp-night',
        sno: 175,
        word: 'Night',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'The period of darkness between sunset and sunrise',
        hindiMeaning: 'रात / रात्रि',
        englishSentence: 'We reached home late at night.',
        hindiSentence: 'हम रात को देर से घर पहुंचे।',
        memoryTip: 'Day and Night'
      }
    ]
  },
  {
    id: 'hp-knave-nave',
    groupTitle: 'Knave vs Nave',
    phonetic: '/neɪv/',
    soundKey: 'neɪv',
    letter: 'K',
    examFrequency: 'High',
    confusableTip: 'Knave = बेईमान / धूर्त व्यक्ति; Nave = चर्च का मुख्य केंद्रीय हॉल',
    words: [
      {
        id: 'hp-knave',
        sno: 176,
        word: 'Knave',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A dishonest, unscrupulous, or deceitful man',
        hindiMeaning: 'धूर्त / बेईमान व्यक्ति / गुलाम (ताश)',
        englishSentence: 'Only a knave would lie under oath.',
        hindiSentence: 'केवल एक धूर्त व्यक्ति शपथ के नीचे झूठ बोलेगा।',
        memoryTip: 'Knave of hearts'
      },
      {
        id: 'hp-nave',
        sno: 177,
        word: 'Nave',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'The central part of a church building',
        hindiMeaning: 'गिरिजाघर का मध्य भाग / मुख्य कक्ष',
        englishSentence: 'The bride walked down the nave.',
        hindiSentence: 'दुल्हन गिरिजाघर के मध्य भाग से चली।',
        memoryTip: 'Nave of cathedral'
      }
    ]
  },
  {
    id: 'hp-knead-need',
    groupTitle: 'Knead vs Need',
    phonetic: '/niːd/',
    soundKey: 'niːd',
    letter: 'K',
    examFrequency: 'Very High',
    confusableTip: 'Knead = आटा गूंधना या मालिश करना; Need = आवश्यकता / जरूरत होना',
    words: [
      {
        id: 'hp-knead',
        sno: 178,
        word: 'Knead',
        partOfSpeech: 'Verb',
        posCategory: 'verb',
        englishMeaning: 'To work moist flour or dough with the hands',
        hindiMeaning: 'आटा गूंधना / मलना',
        englishSentence: 'She kneaded the dough for bread.',
        hindiSentence: 'उसने रोटी के लिए आटा गूंधा।',
        memoryTip: 'Knead the dough'
      },
      {
        id: 'hp-need',
        sno: 179,
        word: 'Need',
        partOfSpeech: 'Verb / Noun',
        posCategory: 'verb',
        englishMeaning: 'To require something essential',
        hindiMeaning: 'आवश्यकता / ज़रूरत होना',
        englishSentence: 'We need more time.',
        hindiSentence: 'हमें और समय की ज़रूरत है।',
        memoryTip: 'In need of help'
      }
    ]
  },
  {
    id: 'hp-knot-not',
    groupTitle: 'Knot vs Not',
    phonetic: '/nɒt/',
    soundKey: 'nɒt',
    letter: 'K',
    examFrequency: 'Frequent',
    confusableTip: 'Knot = रस्सी की गांठ / समुद्री मील; Not = नहीं (नकारात्मक शब्द)',
    words: [
      {
        id: 'hp-knot',
        sno: 180,
        word: 'Knot',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A fastening made by tying rope or cord',
        hindiMeaning: 'गांठ / बंधन',
        englishSentence: 'He tied the knot tightly.',
        hindiSentence: 'उसने गांठ को कसकर बांधा।',
        memoryTip: 'Tie a knot'
      },
      {
        id: 'hp-not',
        sno: 181,
        word: 'Not',
        partOfSpeech: 'Adverb',
        posCategory: 'adv',
        englishMeaning: 'Used with an auxiliary verb to form negative statements',
        hindiMeaning: 'नहीं',
        englishSentence: 'She is not coming today.',
        hindiSentence: 'वह आज नहीं आ रही है।',
        memoryTip: 'Do not, is not'
      }
    ]
  },
  {
    id: 'hp-know-no',
    groupTitle: 'Know vs No',
    phonetic: '/noʊ/',
    soundKey: 'noʊ',
    letter: 'K',
    examFrequency: 'Frequent',
    confusableTip: 'Know = जानना / मालूम होना; No = नहीं / कोई नहीं',
    words: [
      {
        id: 'hp-know',
        sno: 182,
        word: 'Know',
        partOfSpeech: 'Verb',
        posCategory: 'verb',
        englishMeaning: 'To be aware of or informed about facts',
        hindiMeaning: 'जानना / परिचित होना',
        englishSentence: 'I know how to solve this.',
        hindiSentence: 'मुझे पता है कि इसे कैसे हल करें।',
        memoryTip: 'I know the answer'
      },
      {
        id: 'hp-no',
        sno: 183,
        word: 'No',
        partOfSpeech: 'Determiner / Adverb',
        posCategory: 'other',
        englishMeaning: 'Not any / negative reply',
        hindiMeaning: 'नहीं / कोई नहीं',
        englishSentence: 'No, I haven’t seen it.',
        hindiSentence: 'नहीं, मैंने उसे नहीं देखा।',
        memoryTip: 'Yes or No'
      }
    ]
  },
  {
    id: 'hp-knock-nock',
    groupTitle: 'Knock vs Nock',
    phonetic: '/nɒk/',
    soundKey: 'nɒk',
    letter: 'K',
    examFrequency: 'High',
    confusableTip: 'Knock = खटखटाना / चोट मारना; Nock = तीर का पिछला खांचा जहाँ डोरी फंसती है',
    words: [
      {
        id: 'hp-knock',
        sno: 184,
        word: 'Knock',
        partOfSpeech: 'Verb / Noun',
        posCategory: 'verb',
        englishMeaning: 'To strike a surface noisily to attract attention',
        hindiMeaning: 'खटखटाना / दस्तक देना',
        englishSentence: 'Knock before entering.',
        hindiSentence: 'अंदर आने से पहले दरवाजा खटखटाओ।',
        memoryTip: 'Knock on the door'
      },
      {
        id: 'hp-nock',
        sno: 185,
        word: 'Nock',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'The notch at the end of an arrow for fitting onto the bowstring',
        hindiMeaning: 'तीर का खांचा (जहाँ डोरी फंसती है)',
        englishSentence: 'He adjusted the nock of the arrow.',
        hindiSentence: 'उसने तीर के नॉक को ठीक किया।',
        memoryTip: 'Archer fits arrow nock on string'
      }
    ]
  },
  {
  "id": "hp-lade-laid-lain",
  "groupTitle": "Lade vs Laid vs Lain",
  "phonetic": "/leɪd/ - /leɪn/",
  "soundKey": "leɪd",
  "letter": "L",
  "examFrequency": "Very High",
  "confusableTip": "Lade = माल लादना; Laid = रखा/लिटाया (Lay का Past); Lain = लेटा हुआ (Lie का Past Participle)",
  "words": [
    {
      "id": "hp-186",
      "sno": 186,
      "word": "Lade",
      "partOfSpeech": "Verb",
      "posCategory": "verb",
      "englishMeaning": "To load cargo, goods, or burden onto a ship or cart",
      "hindiMeaning": "लादना / माल चढ़ाना",
      "englishSentence": "They laded the cart with goods.",
      "hindiSentence": "उन्होंने गाड़ी पर सामान लादा।",
      "memoryTip": "Bill of Lading (जहाज का माल पत्र)"
    },
    {
      "id": "hp-187",
      "sno": 187,
      "word": "Laid",
      "partOfSpeech": "Verb",
      "posCategory": "verb",
      "englishMeaning": "Past tense of \"lay\"; to place something down gently",
      "hindiMeaning": "रखा हुआ / लिटाया",
      "englishSentence": "He laid the book on the table.",
      "hindiSentence": "उसने किताब मेज़ पर रखी।",
      "memoryTip": "Lay → Laid"
    },
    {
      "id": "hp-188",
      "sno": 188,
      "word": "Lain",
      "partOfSpeech": "Verb",
      "posCategory": "verb",
      "englishMeaning": "Past participle of \"lie\" (to rest horizontally)",
      "hindiMeaning": "लेटा हुआ / विश्राम कर रहा",
      "englishSentence": "She has lain in bed all day.",
      "hindiSentence": "वह पूरे दिन बिस्तर पर लेटी रही है।",
      "memoryTip": "Lie → Lay → Lain"
    }
  ]
},
  {
  "id": "hp-lane-lays-laze",
  "groupTitle": "Lane vs Lays vs Laze",
  "phonetic": "/leɪn/ - /leɪz/",
  "soundKey": "leɪn",
  "letter": "L",
  "examFrequency": "High",
  "confusableTip": "Lane = संकरी सड़क/गली; Lays = रखता है/गीत; Laze = सुस्ती/आराम करना",
  "words": [
    {
      "id": "hp-189",
      "sno": 189,
      "word": "Lane",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A narrow road, path, or traffic division",
      "hindiMeaning": "गली / संकरा रास्ता",
      "englishSentence": "Walk down the quiet lane.",
      "hindiSentence": "शांत गली में चलो।",
      "memoryTip": "Traffic lane / Bowling lane"
    },
    {
      "id": "hp-190",
      "sno": 190,
      "word": "Lays",
      "partOfSpeech": "Verb / Noun",
      "posCategory": "verb",
      "englishMeaning": "Places something down / plural of \"lay\" (short narrative poems/songs)",
      "hindiMeaning": "रखता है / गीत या कविताएं",
      "englishSentence": "She lays the baby in the crib. The poet’s lays are famous.",
      "hindiSentence": "वह बच्चे को पालने में रखती है। कवि के गीत प्रसिद्ध हैं।",
      "memoryTip": "Hen lays eggs / Lays of ancient Rome"
    },
    {
      "id": "hp-191",
      "sno": 191,
      "word": "Laze",
      "partOfSpeech": "Verb",
      "posCategory": "verb",
      "englishMeaning": "To spend time idly and relaxedly",
      "hindiMeaning": "आराम करना / सुस्ती करना",
      "englishSentence": "They lazed around all day.",
      "hindiSentence": "वे पूरे दिन आराम करते रहे।",
      "memoryTip": "Laze around = be lazy"
    }
  ]
},
  {
  "id": "hp-lead-led",
  "groupTitle": "Lead vs Led",
  "phonetic": "/lɛd/ - /liːd/",
  "soundKey": "lɛd",
  "letter": "L",
  "examFrequency": "Very High",
  "confusableTip": "Lead (धातु) = सीसा; Led = नेतृत्व किया (Lead क्रिया का Past Tense)",
  "words": [
    {
      "id": "hp-192",
      "sno": 192,
      "word": "Lead",
      "partOfSpeech": "Noun / Verb",
      "posCategory": "noun",
      "englishMeaning": "A heavy metal / to guide or direct the way",
      "hindiMeaning": "सीसा (धातु) / मार्गदर्शन करना",
      "englishSentence": "Lead pipes are harmful. Please lead the way.",
      "hindiSentence": "सीसे की पाइप्स हानिकारक हैं। कृपया रास्ता दिखाएं।",
      "memoryTip": "Lead pencil / Lead the team"
    },
    {
      "id": "hp-193",
      "sno": 193,
      "word": "Led",
      "partOfSpeech": "Verb",
      "posCategory": "verb",
      "englishMeaning": "Past tense and past participle of \"lead\" (guided)",
      "hindiMeaning": "मार्गदर्शन किया / आगे बढ़ाया",
      "englishSentence": "He led the team to victory.",
      "hindiSentence": "उसने टीम को जीत की ओर मार्गदर्शित किया।",
      "memoryTip": "Lead (present) → Led (past)"
    }
  ]
},
  {
  "id": "hp-leak-leek",
  "groupTitle": "Leak vs Leek",
  "phonetic": "/liːk/",
  "soundKey": "liːk",
  "letter": "L",
  "examFrequency": "High",
  "confusableTip": "Leak = रिसाव/छेद से टपकना; Leek = हरे प्याज जैसी सब्जी",
  "words": [
    {
      "id": "hp-194",
      "sno": 194,
      "word": "Leak",
      "partOfSpeech": "Verb / Noun",
      "posCategory": "verb",
      "englishMeaning": "To let liquid or gas escape through a hole or crack",
      "hindiMeaning": "रिसाव / टपकना / भेद खुलना",
      "englishSentence": "The pipe started to leak.",
      "hindiSentence": "पाइप से रिसाव शुरू हो गया।",
      "memoryTip": "Water leak / Paper leak"
    },
    {
      "id": "hp-195",
      "sno": 195,
      "word": "Leek",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A vegetable related to the onion, with flat leaves",
      "hindiMeaning": "हरा प्याज / लीक सब्जी",
      "englishSentence": "I added leek to the soup.",
      "hindiSentence": "मैंने सूप में हरा प्याज डाला।",
      "memoryTip": "Leek soup"
    }
  ]
},
  {
  "id": "hp-loan-lone",
  "groupTitle": "Loan vs Lone",
  "phonetic": "/loʊn/",
  "soundKey": "loʊn",
  "letter": "L",
  "examFrequency": "Very High",
  "confusableTip": "Loan = बैंक ऋण या उधार; Lone = अकेला / एकाकी (Single)",
  "words": [
    {
      "id": "hp-196",
      "sno": 196,
      "word": "Loan",
      "partOfSpeech": "Noun / Verb",
      "posCategory": "noun",
      "englishMeaning": "A borrowed sum of money / to lend",
      "hindiMeaning": "ऋण / कर्ज़ / उधार देना",
      "englishSentence": "She took a loan from the bank.",
      "hindiSentence": "उसने बैंक से ऋण लिया।",
      "memoryTip": "Bank loan"
    },
    {
      "id": "hp-197",
      "sno": 197,
      "word": "Lone",
      "partOfSpeech": "Adjective",
      "posCategory": "adj",
      "englishMeaning": "Solitary, single, without companions",
      "hindiMeaning": "अकेला / एकाकी",
      "englishSentence": "He was the lone survivor.",
      "hindiSentence": "वह अकेला जीवित बचा।",
      "memoryTip": "Lone wolf / Lonely"
    }
  ]
},
  {
  "id": "hp-louder-louver",
  "groupTitle": "Louder vs Louver",
  "phonetic": "/ˈlaʊdər/ - /ˈluːvər/",
  "soundKey": "laʊdər",
  "letter": "L",
  "examFrequency": "Frequent",
  "confusableTip": "Louder = अधिक तेज़ आवाज़; Louver = खिड़की की तिरछी पट्टियां/ब्लाइंड्स",
  "words": [
    {
      "id": "hp-198",
      "sno": 198,
      "word": "Louder",
      "partOfSpeech": "Adjective",
      "posCategory": "adj",
      "englishMeaning": "Producing or communicating with greater sound volume",
      "hindiMeaning": "अधिक जोरदार / ऊँची आवाज़",
      "englishSentence": "The music is louder than before.",
      "hindiSentence": "संगीत पहले से ज्यादा तेज़ है।",
      "memoryTip": "Loud → Louder"
    },
    {
      "id": "hp-199",
      "sno": 199,
      "word": "Louver",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A window blind or shutter with angled horizontal slats",
      "hindiMeaning": "खिड़की की पट्टियां / झरोखा",
      "englishSentence": "The air came through the louver.",
      "hindiSentence": "खिड़की की पट्टियों से हवा आ रही थी।",
      "memoryTip": "Louvered doors & windows"
    }
  ]
},
  {
  "id": "hp-links-lynx",
  "groupTitle": "Links vs Lynx",
  "phonetic": "/lɪŋks/",
  "soundKey": "lɪŋks",
  "letter": "L",
  "examFrequency": "High",
  "confusableTip": "Links = कड़ियां/संबंध या गोल्फ कोर्स; Lynx = जंगली बिल्ली (कानों पर बाल वाली)",
  "words": [
    {
      "id": "hp-200",
      "sno": 200,
      "word": "Links",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "Connections / hyperlinks / coastal golf courses",
      "hindiMeaning": "जोड़ / कड़ियां / गोल्फ मैदान",
      "englishSentence": "The links between them are strong. He played on the Scottish links.",
      "hindiSentence": "उनके बीच संबंध मजबूत हैं। उसने स्कॉटलैंड के गोल्फ मैदानों में खेला।",
      "memoryTip": "Hyperlinks / Missing link"
    },
    {
      "id": "hp-201",
      "sno": 201,
      "word": "Lynx",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A wild cat with yellowish-brown coat and tufted ears",
      "hindiMeaning": "लिंक्स (एक प्रकार की जंगली बिल्ली)",
      "englishSentence": "The lynx hunted silently at night.",
      "hindiSentence": "लिंक्स रात में चुपचाप शिकार करता है।",
      "memoryTip": "Lynx is an animal with lynx eyes (sharp sight)"
    }
  ]
},
  {
  "id": "hp-literal-litteral",
  "groupTitle": "Literal vs Litteral",
  "phonetic": "/ˈlɪtərəl/",
  "soundKey": "lɪtərəl",
  "letter": "L",
  "examFrequency": "High",
  "confusableTip": "Literal = अक्षरशः / शाब्दिक अर्थ; Litteral = उपनाम (दुर्लभ व्यक्तिवाचक संज्ञा)",
  "words": [
    {
      "id": "hp-202",
      "sno": 202,
      "word": "Literal",
      "partOfSpeech": "Adjective",
      "posCategory": "adj",
      "englishMeaning": "Taking words in their usual, basic, and exact sense",
      "hindiMeaning": "शाब्दिक / अक्षरशः अर्थ",
      "englishSentence": "A literal translation may miss emotion.",
      "hindiSentence": "एक शाब्दिक अनुवाद भावना खो सकता है।",
      "memoryTip": "Literal meaning vs Figurative meaning"
    },
    {
      "id": "hp-203",
      "sno": 203,
      "word": "Litteral",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A rare surname or proper noun",
      "hindiMeaning": "उपनाम (दुर्लभ संज्ञा)",
      "englishSentence": "Mr. Litteral will join us today.",
      "hindiSentence": "मिस्टर लिटल आज हमसे जुड़ेंगे।",
      "memoryTip": "Proper name Litteral"
    }
  ]
},
  {
  "id": "hp-made-maid",
  "groupTitle": "Made vs Maid",
  "phonetic": "/meɪd/",
  "soundKey": "meɪd",
  "letter": "M",
  "examFrequency": "Frequent",
  "confusableTip": "Made = बनाया (Make का Past); Maid = घरेलू नौकरानी / कुंवारी कन्या",
  "words": [
    {
      "id": "hp-204",
      "sno": 204,
      "word": "Made",
      "partOfSpeech": "Verb",
      "posCategory": "verb",
      "englishMeaning": "Past tense of \"make\"; produced or created",
      "hindiMeaning": "बनाया / निर्मित किया",
      "englishSentence": "She made a cake for the party.",
      "hindiSentence": "उसने पार्टी के लिए केक बनाया।",
      "memoryTip": "Make → Made"
    },
    {
      "id": "hp-205",
      "sno": 205,
      "word": "Maid",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A female domestic servant / young unmarried woman",
      "hindiMeaning": "नौकरानी / दासी / कन्या",
      "englishSentence": "The maid cleaned the house.",
      "hindiSentence": "नौकरानी ने घर साफ़ किया।",
      "memoryTip": "Maid of honour"
    }
  ]
},
  {
  "id": "hp-mail-male",
  "groupTitle": "Mail vs Male",
  "phonetic": "/meɪl/",
  "soundKey": "meɪd",
  "letter": "M",
  "examFrequency": "Frequent",
  "confusableTip": "Mail = डाक या पत्र भेजना; Male = पुरुष / नर प्राणी",
  "words": [
    {
      "id": "hp-206",
      "sno": 206,
      "word": "Mail",
      "partOfSpeech": "Noun / Verb",
      "posCategory": "noun",
      "englishMeaning": "Letters and parcels sent by post / armor",
      "hindiMeaning": "डाक / पत्र भेजना / कवच",
      "englishSentence": "I received a letter in the mail.",
      "hindiSentence": "मुझे डाक में एक पत्र मिला।",
      "memoryTip": "E-mail, Voice mail"
    },
    {
      "id": "hp-207",
      "sno": 207,
      "word": "Male",
      "partOfSpeech": "Noun / Adjective",
      "posCategory": "adj",
      "englishMeaning": "A person or animal of the masculine sex",
      "hindiMeaning": "पुरुष / नर",
      "englishSentence": "The male lion protects the pride.",
      "hindiSentence": "नर शेर अपने समूह की रक्षा करता है।",
      "memoryTip": "Male vs Female"
    }
  ]
},
  {
  "id": "hp-marry-merry",
  "groupTitle": "Marry vs Merry",
  "phonetic": "/ˈmæri/ - /ˈmɛri/",
  "soundKey": "mæri",
  "letter": "M",
  "examFrequency": "Very High",
  "confusableTip": "Marry (A) = विवाह करना; Merry (E) = आनंदित/प्रसन्न (Merry Christmas)",
  "words": [
    {
      "id": "hp-208",
      "sno": 208,
      "word": "Marry",
      "partOfSpeech": "Verb",
      "posCategory": "verb",
      "englishMeaning": "To join in marriage with someone",
      "hindiMeaning": "विवाह करना / शादी करना",
      "englishSentence": "She will marry next year.",
      "hindiSentence": "वह अगले साल शादी करेगी।",
      "memoryTip": "Marriage, Married"
    },
    {
      "id": "hp-209",
      "sno": 209,
      "word": "Merry",
      "partOfSpeech": "Adjective",
      "posCategory": "adj",
      "englishMeaning": "Cheerful, lively, and full of joy",
      "hindiMeaning": "प्रसन्न / हर्षित / आनंदमय",
      "englishSentence": "We had a merry celebration.",
      "hindiSentence": "हमने आनंदित उत्सव मनाया।",
      "memoryTip": "Merry Christmas!"
    }
  ]
},
  {
  "id": "hp-meat-meet",
  "groupTitle": "Meat vs Meet",
  "phonetic": "/miːt/",
  "soundKey": "miːt",
  "letter": "M",
  "examFrequency": "Frequent",
  "confusableTip": "Meat = पशुओं का खाद्य मांस; Meet = मिलना / मुलाकात करना",
  "words": [
    {
      "id": "hp-210",
      "sno": 210,
      "word": "Meat",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "The flesh of an animal as food",
      "hindiMeaning": "मांस / खाद्य मांस",
      "englishSentence": "They don’t eat meat.",
      "hindiSentence": "वे मांस नहीं खाते।",
      "memoryTip": "Meat has EAT inside it!"
    },
    {
      "id": "hp-211",
      "sno": 211,
      "word": "Meet",
      "partOfSpeech": "Verb",
      "posCategory": "verb",
      "englishMeaning": "To come into the presence of / encounter",
      "hindiMeaning": "मिलना / भेंट करना",
      "englishSentence": "Let’s meet at 5 PM.",
      "hindiSentence": "चलो 5 बजे मिलते हैं।",
      "memoryTip": "Meet has two \"e\"s meeting each other"
    }
  ]
},
  {
  "id": "hp-medal-meddle",
  "groupTitle": "Medal vs Meddle",
  "phonetic": "/ˈmɛdl/",
  "soundKey": "mɛdl",
  "letter": "M",
  "examFrequency": "Very High",
  "confusableTip": "Medal = पदक/इनाम; Meddle = दूसरों के मामले में टांग अड़ाना/दखल देना",
  "words": [
    {
      "id": "hp-212",
      "sno": 212,
      "word": "Medal",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A metal disc awarded for distinction in sports or bravery",
      "hindiMeaning": "पदक / मेडल",
      "englishSentence": "He won a gold medal.",
      "hindiSentence": "उसने स्वर्ण पदक जीता।",
      "memoryTip": "Olympic gold medal"
    },
    {
      "id": "hp-213",
      "sno": 213,
      "word": "Meddle",
      "partOfSpeech": "Verb",
      "posCategory": "verb",
      "englishMeaning": "To interfere in something that is not one's concern",
      "hindiMeaning": "दखल देना / हस्तक्षेप करना",
      "englishSentence": "Don’t meddle in my business.",
      "hindiSentence": "मेरे काम में दखल मत दो।",
      "memoryTip": "Meddlesome neighbor"
    }
  ]
},
  {
  "id": "hp-miner-minor",
  "groupTitle": "Miner vs Minor",
  "phonetic": "/ˈmaɪnər/",
  "soundKey": "maɪnər",
  "letter": "M",
  "examFrequency": "Very High",
  "confusableTip": "Miner (er) = खदान में काम करने वाला खनिक; Minor (or) = 18 से कम उम्र का नाबालिग या गौण",
  "words": [
    {
      "id": "hp-214",
      "sno": 214,
      "word": "Miner",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A person who works in a mine extracting ore or coal",
      "hindiMeaning": "खनिक / खदान कर्मी",
      "englishSentence": "The miner found gold.",
      "hindiSentence": "खनिक को सोना मिला।",
      "memoryTip": "Coal miner"
    },
    {
      "id": "hp-215",
      "sno": 215,
      "word": "Minor",
      "partOfSpeech": "Noun / Adjective",
      "posCategory": "adj",
      "englishMeaning": "Under legal age / lesser in size, extent, or importance",
      "hindiMeaning": "नाबालिग / गौण / छोटा",
      "englishSentence": "The boy is still a minor.",
      "hindiSentence": "लड़का अभी नाबालिग है।",
      "memoryTip": "Minor injury / Major vs Minor"
    }
  ]
},
  {
  "id": "hp-missed-mist",
  "groupTitle": "Missed vs Mist",
  "phonetic": "/mɪst/",
  "soundKey": "mɪst",
  "letter": "M",
  "examFrequency": "High",
  "confusableTip": "Missed = चूक गया / छूट गया; Mist = सुबह का हल्का कोहरा/धुंध",
  "words": [
    {
      "id": "hp-216",
      "sno": 216,
      "word": "Missed",
      "partOfSpeech": "Verb",
      "posCategory": "verb",
      "englishMeaning": "Past tense of \"miss\"; failed to catch, hit, or attend",
      "hindiMeaning": "चूका / छूट गया / याद किया",
      "englishSentence": "I missed the train.",
      "hindiSentence": "मैं ट्रेन पकड़ने से चूक गया।",
      "memoryTip": "Missed opportunity"
    },
    {
      "id": "hp-217",
      "sno": 217,
      "word": "Mist",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A cloud of tiny water droplets in the atmosphere; light fog",
      "hindiMeaning": "धुंध / हल्का कोहरा",
      "englishSentence": "Morning mist covered the valley.",
      "hindiSentence": "सुबह की धुंध ने घाटी को ढक लिया।",
      "memoryTip": "Misty morning"
    }
  ]
},
  {
  "id": "hp-mute-moot",
  "groupTitle": "Mute vs Moot",
  "phonetic": "/mjuːt/ - /muːt/",
  "soundKey": "mjuːt",
  "letter": "M",
  "examFrequency": "Very High",
  "confusableTip": "Mute = मूक / शांत; Moot = विवादास्पद या अप्रासंगिक (Moot point)",
  "words": [
    {
      "id": "hp-218",
      "sno": 218,
      "word": "Mute",
      "partOfSpeech": "Adjective / Verb",
      "posCategory": "adj",
      "englishMeaning": "Refraining from speech / silent",
      "hindiMeaning": "मौन / मूक / चुप कराना",
      "englishSentence": "He remained mute in court.",
      "hindiSentence": "वह अदालत में मौन रहा।",
      "memoryTip": "Mute button on TV"
    },
    {
      "id": "hp-219",
      "sno": 219,
      "word": "Moot",
      "partOfSpeech": "Adjective",
      "posCategory": "adj",
      "englishMeaning": "Subject to debate, dispute, or having no practical significance",
      "hindiMeaning": "विवादास्पद / अप्रासंगिक / बहस योग्य",
      "englishSentence": "The point is moot now.",
      "hindiSentence": "वह बात अब अप्रासंगिक है।",
      "memoryTip": "Moot court / Moot point"
    }
  ]
},
  {
  "id": "hp-naval-navel",
  "groupTitle": "Naval vs Navel",
  "phonetic": "/ˈneɪvəl/",
  "soundKey": "neɪvəl",
  "letter": "N",
  "examFrequency": "Very High",
  "confusableTip": "Naval (al) = नौसेना/जलसेना से संबंधित; Navel (el) = पेट की नाभि (Belly button)",
  "words": [
    {
      "id": "hp-220",
      "sno": 220,
      "word": "Naval",
      "partOfSpeech": "Adjective",
      "posCategory": "adj",
      "englishMeaning": "Relating to a country's navy or warships",
      "hindiMeaning": "नौसेना से संबंधित / नौसैनिक",
      "englishSentence": "He joined the naval academy.",
      "hindiSentence": "उसने नौसेना अकादमी में प्रवेश लिया।",
      "memoryTip": "Naval fleet / Navy"
    },
    {
      "id": "hp-221",
      "sno": 221,
      "word": "Navel",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "The belly button / central point of abdomen",
      "hindiMeaning": "नाभि / तोंद का गड्ढा",
      "englishSentence": "The doctor examined the baby’s navel.",
      "hindiSentence": "डॉक्टर ने बच्चे की नाभि की जांच की।",
      "memoryTip": "Navel orange"
    }
  ]
},
  {
  "id": "hp-oar-or-ore",
  "groupTitle": "Oar vs Or vs Ore",
  "phonetic": "/ɔːr/",
  "soundKey": "ɔːr",
  "letter": "O",
  "examFrequency": "High",
  "confusableTip": "Oar = नाव का चप्पू; Or = या (Conjunction); Ore = कच्ची धातु (खनिज)",
  "words": [
    {
      "id": "hp-222",
      "sno": 222,
      "word": "Oar",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A long pole with a flat blade used to row a boat",
      "hindiMeaning": "चप्पू (नाव चलाने का डंडा)",
      "englishSentence": "He rowed the boat with an oar.",
      "hindiSentence": "उसने चप्पू से नाव चलाई।",
      "memoryTip": "Boat oar"
    },
    {
      "id": "hp-223",
      "sno": 223,
      "word": "Or",
      "partOfSpeech": "Conjunction",
      "posCategory": "other",
      "englishMeaning": "Used to link alternatives",
      "hindiMeaning": "या / अथवा",
      "englishSentence": "Would you like tea or coffee?",
      "hindiSentence": "क्या आप चाय या कॉफी लेंगे?",
      "memoryTip": "Tea OR coffee"
    },
    {
      "id": "hp-224",
      "sno": 224,
      "word": "Ore",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A naturally occurring rock from which metal is extracted",
      "hindiMeaning": "अयस्क / कच्ची धातु",
      "englishSentence": "Iron ore is found in this region.",
      "hindiSentence": "इस क्षेत्र में लौह अयस्क पाया जाता है।",
      "memoryTip": "Iron ore, Bauxite ore"
    }
  ]
},
  {
  "id": "hp-overdo-overdue",
  "groupTitle": "Overdo vs Overdue",
  "phonetic": "/ˌoʊvərˈduː/",
  "soundKey": "oʊvərduː",
  "letter": "O",
  "examFrequency": "Very High",
  "confusableTip": "Overdo = अति करना / हद से ज्यादा करना; Overdue = समय सीमा से देर / विलंबित",
  "words": [
    {
      "id": "hp-225",
      "sno": 225,
      "word": "Overdo",
      "partOfSpeech": "Verb",
      "posCategory": "verb",
      "englishMeaning": "To do, use, or carry to excess",
      "hindiMeaning": "अति करना / हद से ज्यादा करना",
      "englishSentence": "Don’t overdo the salt.",
      "hindiSentence": "नमक ज्यादा मत डालो।",
      "memoryTip": "Over + Do"
    },
    {
      "id": "hp-226",
      "sno": 226,
      "word": "Overdue",
      "partOfSpeech": "Adjective",
      "posCategory": "adj",
      "englishMeaning": "Not having arrived or occurred at the expected time; late",
      "hindiMeaning": "विलंबित / बकाया / समय से अधिक देर",
      "englishSentence": "The payment is overdue.",
      "hindiSentence": "भुगतान विलंबित है।",
      "memoryTip": "Due date passed → Overdue"
    }
  ]
},
  {
  "id": "hp-pain-pane",
  "groupTitle": "Pain vs Pane",
  "phonetic": "/peɪn/",
  "soundKey": "peɪn",
  "letter": "P",
  "examFrequency": "Frequent",
  "confusableTip": "Pain = शारीरिक या मानसिक दर्द; Pane = खिड़की या दरवाजे का कांच",
  "words": [
    {
      "id": "hp-227",
      "sno": 227,
      "word": "Pain",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "Physical or mental suffering",
      "hindiMeaning": "दर्द / पीड़ा",
      "englishSentence": "He felt sharp pain in his leg.",
      "hindiSentence": "उसे पैर में तेज़ दर्द महसूस हुआ।",
      "memoryTip": "Pain killer"
    },
    {
      "id": "hp-228",
      "sno": 228,
      "word": "Pane",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A single sheet of glass in a window or door",
      "hindiMeaning": "कांच की पट्टी / खिड़की का शीशा",
      "englishSentence": "The window pane was broken.",
      "hindiSentence": "खिड़की का कांच टूट गया था।",
      "memoryTip": "Window pane"
    }
  ]
},
  {
  "id": "hp-pair-pear-pare",
  "groupTitle": "Pair vs Pear vs Pare",
  "phonetic": "/pɛər/",
  "soundKey": "pɛər",
  "letter": "P",
  "examFrequency": "Very High",
  "confusableTip": "Pair = जोड़ा; Pear = नाशपाती (फल); Pare = छीलना या छांटकर कम करना",
  "words": [
    {
      "id": "hp-229",
      "sno": 229,
      "word": "Pair",
      "partOfSpeech": "Noun / Verb",
      "posCategory": "noun",
      "englishMeaning": "A set of two things used together",
      "hindiMeaning": "जोड़ा / युग्म",
      "englishSentence": "I bought a pair of shoes.",
      "hindiSentence": "मैंने एक जोड़ी जूते खरीदे।",
      "memoryTip": "Pair of socks"
    },
    {
      "id": "hp-230",
      "sno": 230,
      "word": "Pear",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A sweet, juicy fruit shaped like a teardrop",
      "hindiMeaning": "नाशपाती (फल)",
      "englishSentence": "I ate a ripe pear.",
      "hindiSentence": "मैंने एक पकी हुई नाशपाती खाई।",
      "memoryTip": "Pear fruit"
    },
    {
      "id": "hp-231",
      "sno": 231,
      "word": "Pare",
      "partOfSpeech": "Verb",
      "posCategory": "verb",
      "englishMeaning": "To trim by cutting away outer edges or peel",
      "hindiMeaning": "छीलना / छांटना / कम करना",
      "englishSentence": "Pare the apples before cooking.",
      "hindiSentence": "पकाने से पहले सेब छीलो।",
      "memoryTip": "Paring knife (सब्जी छीलने वाला चाकू)"
    }
  ]
},
  {
  "id": "hp-passed-past",
  "groupTitle": "Passed vs Past",
  "phonetic": "/pɑːst/ - /pæst/",
  "soundKey": "pɑːst",
  "letter": "P",
  "examFrequency": "Very High",
  "confusableTip": "Passed = परीक्षा उत्तीर्ण की / आगे से गुजरा (Verb); Past = बीता हुआ समय / भूतकाल (Noun/Adj)",
  "words": [
    {
      "id": "hp-232",
      "sno": 232,
      "word": "Passed",
      "partOfSpeech": "Verb",
      "posCategory": "verb",
      "englishMeaning": "Past tense of \"pass\"; moved beyond or succeeded",
      "hindiMeaning": "गुजरा / पार किया / उत्तीर्ण किया",
      "englishSentence": "She passed the test.",
      "hindiSentence": "उसने परीक्षा पास कर ली।",
      "memoryTip": "Pass + ed"
    },
    {
      "id": "hp-233",
      "sno": 233,
      "word": "Past",
      "partOfSpeech": "Noun / Adjective",
      "posCategory": "noun",
      "englishMeaning": "Gone by in time and no longer existing",
      "hindiMeaning": "भूतकाल / बीता हुआ समय",
      "englishSentence": "He spoke about his past life.",
      "hindiSentence": "उसने अपने पिछले जीवन के बारे में बात की।",
      "memoryTip": "Past tense / In the past"
    }
  ]
},
  {
  "id": "hp-patience-patients",
  "groupTitle": "Patience vs Patients",
  "phonetic": "/ˈpeɪʃəns/",
  "soundKey": "peɪʃəns",
  "letter": "P",
  "examFrequency": "Very High",
  "confusableTip": "Patience (CE) = धैर्य/धीरज (गुण); Patients (TS) = अस्पताल में इलाज करा रहे मरीज़",
  "words": [
    {
      "id": "hp-234",
      "sno": 234,
      "word": "Patience",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "The capacity to accept or tolerate delay and trouble calmly",
      "hindiMeaning": "धैर्य / सब्र / धीरज",
      "englishSentence": "She has great patience with kids.",
      "hindiSentence": "उसमें बच्चों के प्रति बहुत धैर्य है।",
      "memoryTip": "Have patience"
    },
    {
      "id": "hp-235",
      "sno": 235,
      "word": "Patients",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "Plural of patient (persons receiving medical treatment)",
      "hindiMeaning": "मरीज़ / रोगी (बहुवचन)",
      "englishSentence": "The doctor treated several patients.",
      "hindiSentence": "डॉक्टर ने कई मरीज़ों का इलाज किया।",
      "memoryTip": "Hospital patients"
    }
  ]
},
  {
  "id": "hp-peace-piece",
  "groupTitle": "Peace vs Piece",
  "phonetic": "/piːs/",
  "soundKey": "piːs",
  "letter": "P",
  "examFrequency": "Frequent",
  "confusableTip": "Peace = शांति / अमन; Piece = टुकड़ा / हिस्सा",
  "words": [
    {
      "id": "hp-236",
      "sno": 236,
      "word": "Peace",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "Freedom from disturbance; tranquility, absence of war",
      "hindiMeaning": "शांति / अमन",
      "englishSentence": "The country is enjoying peace.",
      "hindiSentence": "देश शांति का अनुभव कर रहा है।",
      "memoryTip": "Peace treaty"
    },
    {
      "id": "hp-237",
      "sno": 237,
      "word": "Piece",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A portion of an object / single item",
      "hindiMeaning": "टुकड़ा / भाग",
      "englishSentence": "Give me a piece of cake.",
      "hindiSentence": "मुझे केक का एक टुकड़ा दो।",
      "memoryTip": "A piece of PIE (both have \"pie\")"
    }
  ]
},
  {
  "id": "hp-peak-peek",
  "groupTitle": "Peak vs Peek",
  "phonetic": "/piːk/",
  "soundKey": "piːk",
  "letter": "P",
  "examFrequency": "Very High",
  "confusableTip": "Peak (A) = पर्वत की चोटी / शिखर; Peek (EE) = चुपके से झांकना (दो आँखें \"ee\")",
  "words": [
    {
      "id": "hp-238",
      "sno": 238,
      "word": "Peak",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "The pointed top of a mountain / highest point",
      "hindiMeaning": "शिखर / चोटी / उच्चतम स्तर",
      "englishSentence": "He climbed to the mountain’s peak.",
      "hindiSentence": "वह पहाड़ की चोटी पर चढ़ गया।",
      "memoryTip": "Peak hours / Mountain peak"
    },
    {
      "id": "hp-239",
      "sno": 239,
      "word": "Peek",
      "partOfSpeech": "Verb / Noun",
      "posCategory": "verb",
      "englishMeaning": "To look quickly or furtively",
      "hindiMeaning": "झांकना / चुपके से देखना / झलक",
      "englishSentence": "She peeked through the curtain.",
      "hindiSentence": "उसने पर्दे से झांका।",
      "memoryTip": "P-EE-k: The two \"e\"s look like eyes peeking!"
    }
  ]
},
  {
  "id": "hp-plain-plane",
  "groupTitle": "Plain vs Plane",
  "phonetic": "/pleɪn/",
  "soundKey": "pleɪn",
  "letter": "P",
  "examFrequency": "Very High",
  "confusableTip": "Plain = सादा / विस्तृत समतल मैदान; Plane = हवाई जहाज / ज्यामितीय समतल",
  "words": [
    {
      "id": "hp-240",
      "sno": 240,
      "word": "Plain",
      "partOfSpeech": "Adjective / Noun",
      "posCategory": "adj",
      "englishMeaning": "Simple, not decorated / large area of flat land",
      "hindiMeaning": "साधारण / सादा / मैदान",
      "englishSentence": "She wore a plain dress. The plains are vast.",
      "hindiSentence": "उसने एक सादा ड्रेस पहनी। मैदान बहुत विस्तृत हैं।",
      "memoryTip": "Plain paper / Indo-Gangetic plain"
    },
    {
      "id": "hp-241",
      "sno": 241,
      "word": "Plane",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "An airplane / flat surface in geometry",
      "hindiMeaning": "विमान / समतल सतह",
      "englishSentence": "The plane landed safely.",
      "hindiSentence": "विमान सुरक्षित उतरा।",
      "memoryTip": "Aeroplane"
    }
  ]
},
  {
  "id": "hp-pole-poll",
  "groupTitle": "Pole vs Poll",
  "phonetic": "/poʊl/",
  "soundKey": "poʊl",
  "letter": "P",
  "examFrequency": "High",
  "confusableTip": "Pole = खंभा या पृथ्वी का ध्रुव; Poll = चुनाव / जनमत सर्वेक्षण (वोटिंग)",
  "words": [
    {
      "id": "hp-242",
      "sno": 242,
      "word": "Pole",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A long slender rounded rod / North or South pole",
      "hindiMeaning": "खंभा / ध्रुव",
      "englishSentence": "He climbed the pole.",
      "hindiSentence": "वह खंभे पर चढ़ गया।",
      "memoryTip": "North Pole / Electric pole"
    },
    {
      "id": "hp-243",
      "sno": 243,
      "word": "Poll",
      "partOfSpeech": "Noun / Verb",
      "posCategory": "noun",
      "englishMeaning": "Voting in an election / opinion survey",
      "hindiMeaning": "चुनाव / जनमत सर्वेक्षण / वोट लेना",
      "englishSentence": "The opinion poll predicted the winner.",
      "hindiSentence": "जनमत सर्वेक्षण ने विजेता की भविष्यवाणी की।",
      "memoryTip": "Exit poll / Polling booth"
    }
  ]
},
  {
  "id": "hp-pray-prey",
  "groupTitle": "Pray vs Prey",
  "phonetic": "/preɪ/",
  "soundKey": "preɪ",
  "letter": "P",
  "examFrequency": "Very High",
  "confusableTip": "Pray (A) = भगवान से प्रार्थना करना; Prey (E) = शिकारी का शिकार",
  "words": [
    {
      "id": "hp-244",
      "sno": 244,
      "word": "Pray",
      "partOfSpeech": "Verb",
      "posCategory": "verb",
      "englishMeaning": "To address a prayer to God",
      "hindiMeaning": "प्रार्थना करना / विनती करना",
      "englishSentence": "We pray every morning.",
      "hindiSentence": "हम हर सुबह प्रार्थना करते हैं।",
      "memoryTip": "Pray to God"
    },
    {
      "id": "hp-245",
      "sno": 245,
      "word": "Prey",
      "partOfSpeech": "Noun / Verb",
      "posCategory": "noun",
      "englishMeaning": "An animal hunted and killed by another for food",
      "hindiMeaning": "शिकार / भक्ष्य",
      "englishSentence": "The lion hunted its prey silently.",
      "hindiSentence": "शेर ने अपने शिकार को चुपचाप मारा।",
      "memoryTip": "Bird of prey / Predator and prey"
    }
  ]
},
  {
  "id": "hp-principal-principle",
  "groupTitle": "Principal vs Principle",
  "phonetic": "/ˈprɪnsəpəl/",
  "soundKey": "prɪnsəpəl",
  "letter": "P",
  "examFrequency": "Very High",
  "confusableTip": "PrincipAL (Pal) = प्रधानाचार्य / मूलधन; PrincipLE (Rule) = सिद्धांत / नियम",
  "words": [
    {
      "id": "hp-246",
      "sno": 246,
      "word": "Principal",
      "partOfSpeech": "Noun / Adjective",
      "posCategory": "noun",
      "englishMeaning": "Head of a school / main amount of money / chief",
      "hindiMeaning": "प्रधानाचार्य / मुख्य / मूलधन",
      "englishSentence": "The principal gave a speech. This is the principal reason.",
      "hindiSentence": "प्रधानाचार्य ने भाषण दिया। यह मुख्य कारण है।",
      "memoryTip": "The principAL is your PAL (school head)"
    },
    {
      "id": "hp-247",
      "sno": 247,
      "word": "Principle",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A fundamental truth, moral rule, or scientific law",
      "hindiMeaning": "सिद्धांत / नैतिक नियम",
      "englishSentence": "Honesty is a good principle.",
      "hindiSentence": "ईमानदारी एक अच्छा सिद्धांत है।",
      "memoryTip": "PrincipLE ends in LE like ruLE"
    }
  ]
},
  {
  "id": "hp-quarts-quartz",
  "groupTitle": "Quarts vs Quartz",
  "phonetic": "/kwɔːrts/",
  "soundKey": "kwɔːrts",
  "letter": "Q",
  "examFrequency": "High",
  "confusableTip": "Quarts = 1/4 गैलन द्रव माप (प्लुरल); Quartz = घड़ी व गहनों का कठोर खनिज",
  "words": [
    {
      "id": "hp-248",
      "sno": 248,
      "word": "Quarts",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "Units of liquid measurement (1 quart ≈ 0.95 litre)",
      "hindiMeaning": "क्वार्ट (द्रव माप)",
      "englishSentence": "The recipe needs two quarts of milk.",
      "hindiSentence": "इस रेसिपी में दो क्वार्ट दूध चाहिए।",
      "memoryTip": "Quarter of a gallon"
    },
    {
      "id": "hp-249",
      "sno": 249,
      "word": "Quartz",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A hard, white or colourless mineral used in watches",
      "hindiMeaning": "क्वार्ट्ज (खनिज पत्थर)",
      "englishSentence": "The countertop is made of quartz.",
      "hindiSentence": "किचन की सतह क्वार्ट्ज से बनी है।",
      "memoryTip": "Quartz watch"
    }
  ]
},
  {
  "id": "hp-quean-queen",
  "groupTitle": "Quean vs Queen",
  "phonetic": "/kwiːn/",
  "soundKey": "kwiːn",
  "letter": "Q",
  "examFrequency": "High",
  "confusableTip": "Quean = बदचलन/दुश्चरित्र स्त्री (पुराना शब्द); Queen = रानी / महारानी",
  "words": [
    {
      "id": "hp-250",
      "sno": 250,
      "word": "Quean",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "An impudent or ill-behaved woman (archaic)",
      "hindiMeaning": "दुश्चरित्र स्त्री / बदचलन महिला",
      "englishSentence": "The old play had a villainous quean.",
      "hindiSentence": "पुराने नाटक में एक दुश्चरित्र स्त्री थी।",
      "memoryTip": "Quean is archaic English insult"
    },
    {
      "id": "hp-251",
      "sno": 251,
      "word": "Queen",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "The female ruler of an independent state / king's wife",
      "hindiMeaning": "रानी / महारानी",
      "englishSentence": "The queen addressed the nation.",
      "hindiSentence": "रानी ने राष्ट्र को संबोधित किया।",
      "memoryTip": "Queen Elizabeth"
    }
  ]
},
  {
  "id": "hp-quire-choir",
  "groupTitle": "Quire vs Choir",
  "phonetic": "/kwaɪər/",
  "soundKey": "kwaɪər",
  "letter": "Q",
  "examFrequency": "Very High",
  "confusableTip": "Quire = कागज़ के 24-25 पन्नों की गड्डी; Choir = चर्च के गायकों का दल",
  "words": [
    {
      "id": "hp-252",
      "sno": 252,
      "word": "Quire",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A set of 24 or 25 sheets of paper of the same size",
      "hindiMeaning": "कागज़ की गड्डी (24 पन्नों का दस्ता)",
      "englishSentence": "He bought a quire of writing paper.",
      "hindiSentence": "उसने लेखन कागज की एक गड्डी खरीदी।",
      "memoryTip": "Quire of paper"
    },
    {
      "id": "hp-253",
      "sno": 253,
      "word": "Choir",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "An organized group of singers in church",
      "hindiMeaning": "गायक दल / कोरस",
      "englishSentence": "The church choir sang beautifully.",
      "hindiSentence": "चर्च के कोरस ने सुंदर गान गाया।",
      "memoryTip": "Choir is pronounced like Quire!"
    }
  ]
},
  {
  "id": "hp-queue-cue",
  "groupTitle": "Queue vs Cue",
  "phonetic": "/kjuː/",
  "soundKey": "kjuː",
  "letter": "Q",
  "examFrequency": "Very High",
  "confusableTip": "Queue = पंक्ति/कतार; Cue = संकेत/इशारा या बिलियर्ड्स की छड़ी",
  "words": [
    {
      "id": "hp-254",
      "sno": 254,
      "word": "Queue",
      "partOfSpeech": "Noun / Verb",
      "posCategory": "noun",
      "englishMeaning": "A line or sequence of people or vehicles awaiting their turn",
      "hindiMeaning": "कतार / लाइन लगाना",
      "englishSentence": "We stood in a queue for tickets.",
      "hindiSentence": "हम टिकट के लिए कतार में खड़े थे।",
      "memoryTip": "Stand in a queue"
    },
    {
      "id": "hp-255",
      "sno": 255,
      "word": "Cue",
      "partOfSpeech": "Noun / Verb",
      "posCategory": "noun",
      "englishMeaning": "A signal to an actor to speak; a hint / billiard rod",
      "hindiMeaning": "संकेत / इशारा / बिलियर्ड्स की छड़ी",
      "englishSentence": "That was my cue to leave.",
      "hindiSentence": "वह मेरे जाने का संकेत था।",
      "memoryTip": "Cue card / Pool cue"
    }
  ]
},
  {
  "id": "hp-reign-rein-rain",
  "groupTitle": "Reign vs Rein vs Rain",
  "phonetic": "/reɪn/",
  "soundKey": "reɪn",
  "letter": "R",
  "examFrequency": "Very High",
  "confusableTip": "Reign = राजा का शासनकाल; Rein = घोड़े की लगाम; Rain = बारिश",
  "words": [
    {
      "id": "hp-256",
      "sno": 256,
      "word": "Reign",
      "partOfSpeech": "Noun / Verb",
      "posCategory": "noun",
      "englishMeaning": "The period of a monarch’s rule; to rule as king",
      "hindiMeaning": "शासन / राज करना",
      "englishSentence": "The king’s reign lasted 40 years.",
      "hindiSentence": "राजा का शासन 40 वर्षों तक चला।",
      "memoryTip": "Sovereign → Reign (King)"
    },
    {
      "id": "hp-257",
      "sno": 257,
      "word": "Rein",
      "partOfSpeech": "Noun / Verb",
      "posCategory": "noun",
      "englishMeaning": "A leather strap used to control a horse; restrain",
      "hindiMeaning": "घोड़े की लगाम / नियंत्रण करना",
      "englishSentence": "He pulled the reins of the horse.",
      "hindiSentence": "उसने घोड़े की लगाम खींची।",
      "memoryTip": "Free rein / Hold the reins"
    },
    {
      "id": "hp-368",
      "sno": 368,
      "word": "Rain",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "Water falling in drops from the atmosphere",
      "hindiMeaning": "बारिश / वर्षा",
      "englishSentence": "I love walking in the rain.",
      "hindiSentence": "मुझे बारिश में चलना पसंद है।",
      "memoryTip": "Raincoat"
    }
  ]
},
  {
  "id": "hp-raise-rays-raze",
  "groupTitle": "Raise vs Rays vs Raze",
  "phonetic": "/reɪz/",
  "soundKey": "reɪz",
  "letter": "R",
  "examFrequency": "Very High",
  "confusableTip": "Raise = ऊपर उठाना/बढ़ाना; Rays = किरणें; Raze = इमारत को पूरी तरह ध्वस्त करना",
  "words": [
    {
      "id": "hp-258",
      "sno": 258,
      "word": "Raise",
      "partOfSpeech": "Verb",
      "posCategory": "verb",
      "englishMeaning": "To lift or move upward; increase",
      "hindiMeaning": "उठाना / बढ़ाना / पालना",
      "englishSentence": "Please raise your hand.",
      "hindiSentence": "कृपया अपना हाथ उठाएं।",
      "memoryTip": "Raise your hand / Pay raise"
    },
    {
      "id": "hp-259",
      "sno": 259,
      "word": "Rays",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "Beams of light or radiation (plural)",
      "hindiMeaning": "किरणें",
      "englishSentence": "Sun rays entered the room.",
      "hindiSentence": "सूरज की किरणें कमरे में आईं।",
      "memoryTip": "Sun rays / X-rays"
    },
    {
      "id": "hp-260",
      "sno": 260,
      "word": "Raze",
      "partOfSpeech": "Verb",
      "posCategory": "verb",
      "englishMeaning": "To completely destroy a building or town to the ground",
      "hindiMeaning": "पूरी तरह से नष्ट करना / ज़मींदोज़ करना",
      "englishSentence": "The building was razed to the ground.",
      "hindiSentence": "इमारत को ज़मीन से मिला दिया गया।",
      "memoryTip": "Raze to the ground"
    }
  ]
},
  {
  "id": "hp-rest-wrest",
  "groupTitle": "Rest vs Wrest",
  "phonetic": "/rɛst/",
  "soundKey": "rɛst",
  "letter": "R",
  "examFrequency": "High",
  "confusableTip": "Rest = आराम करना / शेष भाग; Wrest = बलपूर्वक छीनना (कुश्ती जैसा)",
  "words": [
    {
      "id": "hp-261",
      "sno": 261,
      "word": "Rest",
      "partOfSpeech": "Noun / Verb",
      "posCategory": "verb",
      "englishMeaning": "Cease work or movement to relax; remainder",
      "hindiMeaning": "विश्राम / आराम करना / बाकी बचा हुआ",
      "englishSentence": "You need rest after hard work.",
      "hindiSentence": "कठिन परिश्रम के बाद आपको आराम चाहिए।",
      "memoryTip": "Rest in peace / Rest of the story"
    },
    {
      "id": "hp-262",
      "sno": 262,
      "word": "Wrest",
      "partOfSpeech": "Verb",
      "posCategory": "verb",
      "englishMeaning": "To forcibly pull or snatch something away from someone's grasp",
      "hindiMeaning": "बलपूर्वक छीनना / झटकना",
      "englishSentence": "He wrested the phone from my hand.",
      "hindiSentence": "उसने मेरे हाथ से फोन छीन लिया।",
      "memoryTip": "Wrestle → Wrest control"
    }
  ]
},
  {
  "id": "hp-right-write-rite",
  "groupTitle": "Right vs Write vs Rite",
  "phonetic": "/raɪt/",
  "soundKey": "raɪt",
  "letter": "R",
  "examFrequency": "Very High",
  "confusableTip": "Right = सही/दायाँ/अधिकार; Write = लिखना; Rite = धार्मिक रीति-रिवाज/संस्कार",
  "words": [
    {
      "id": "hp-263",
      "sno": 263,
      "word": "Right",
      "partOfSpeech": "Adjective / Noun",
      "posCategory": "adj",
      "englishMeaning": "Correct, accurate / opposite of left / moral entitlement",
      "hindiMeaning": "सही / दायाँ / अधिकार",
      "englishSentence": "You made the right decision.",
      "hindiSentence": "तुमने सही निर्णय लिया।",
      "memoryTip": "Right answer / Human rights"
    },
    {
      "id": "hp-264",
      "sno": 264,
      "word": "Write",
      "partOfSpeech": "Verb",
      "posCategory": "verb",
      "englishMeaning": "To compose text or form letters on paper",
      "hindiMeaning": "लिखना",
      "englishSentence": "Please write your name here.",
      "hindiSentence": "कृपया यहाँ अपना नाम लिखिए।",
      "memoryTip": "Read and Write"
    },
    {
      "id": "hp-265",
      "sno": 265,
      "word": "Rite",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A religious or other solemn ceremony or act",
      "hindiMeaning": "धार्मिक अनुष्ठान / रस्म / संस्कार",
      "englishSentence": "The funeral rites were performed.",
      "hindiSentence": "अंतिम संस्कार की रस्में निभाई गईं।",
      "memoryTip": "Last rites / Rituals"
    }
  ]
},
  {
  "id": "hp-rung-wrung",
  "groupTitle": "Rung vs Wrung",
  "phonetic": "/rʌŋ/",
  "soundKey": "rʌŋ",
  "letter": "R",
  "examFrequency": "High",
  "confusableTip": "Rung = सीढ़ी का डंडा / घंटी बजाई; Wrung = कपड़े से पानी निचोड़ा (Wring का Past)",
  "words": [
    {
      "id": "hp-266",
      "sno": 266,
      "word": "Rung",
      "partOfSpeech": "Noun / Verb",
      "posCategory": "noun",
      "englishMeaning": "A horizontal support on a ladder / past of \"ring\"",
      "hindiMeaning": "सीढ़ी का डंडा / घंटी बजाई",
      "englishSentence": "She stepped on the second rung. He rung the bell.",
      "hindiSentence": "वह दूसरी डंडी पर चढ़ी। उसने घंटी बजाई।",
      "memoryTip": "Ladder rung"
    },
    {
      "id": "hp-267",
      "sno": 267,
      "word": "Wrung",
      "partOfSpeech": "Verb",
      "posCategory": "verb",
      "englishMeaning": "Past tense of \"wring\" (squeezed or twisted water out)",
      "hindiMeaning": "निचोड़ा / मरोड़ा",
      "englishSentence": "She wrung the water from the cloth.",
      "hindiSentence": "उसने कपड़े से पानी निचोड़ा।",
      "memoryTip": "Wring → Wrung hands"
    }
  ]
},
  {
  "id": "hp-road-rode-rowed",
  "groupTitle": "Road vs Rode",
  "phonetic": "/roʊd/",
  "soundKey": "roʊd",
  "letter": "R",
  "examFrequency": "Frequent",
  "confusableTip": "Road = पक्की सड़क; Rode = सवारी की (Ride का Past)",
  "words": [
    {
      "id": "hp-268",
      "sno": 268,
      "word": "Road",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A wide path for vehicles to travel along",
      "hindiMeaning": "सड़क / मार्ग",
      "englishSentence": "The road is under construction.",
      "hindiSentence": "सड़क निर्माणाधीन है।",
      "memoryTip": "Highway road"
    },
    {
      "id": "hp-99-dup",
      "sno": 99,
      "word": "Rode",
      "partOfSpeech": "Verb",
      "posCategory": "verb",
      "englishMeaning": "Past tense of \"ride\" (travelled on horse/bicycle)",
      "hindiMeaning": "सवारी की / चलाई",
      "englishSentence": "He rode his bicycle to school yesterday.",
      "hindiSentence": "उसने कल साइकिल से स्कूल गया।",
      "memoryTip": "Ride → Rode"
    }
  ]
},
  {
  "id": "hp-role-roll",
  "groupTitle": "Role vs Roll",
  "phonetic": "/roʊl/",
  "soundKey": "roʊl",
  "letter": "R",
  "examFrequency": "Very High",
  "confusableTip": "Role = नाटक में भूमिका या दायित्व; Roll = लुढ़कना / हाजिरी रजिस्टर / ब्रेड रोल",
  "words": [
    {
      "id": "hp-371",
      "sno": 371,
      "word": "Role",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "An actor’s part in a play / person's function",
      "hindiMeaning": "भूमिका / पद / कर्तव्य",
      "englishSentence": "He played the lead role.",
      "hindiSentence": "उसने मुख्य भूमिका निभाई।",
      "memoryTip": "Role model / Lead role"
    },
    {
      "id": "hp-372",
      "sno": 372,
      "word": "Roll",
      "partOfSpeech": "Verb / Noun",
      "posCategory": "verb",
      "englishMeaning": "To turn over and over / a cylinder / small bread bun",
      "hindiMeaning": "लुढ़कना / रोल करना / ब्रेड रोल / हाजिरी",
      "englishSentence": "He ate a butter roll.",
      "hindiSentence": "उसने मक्खन वाला रोल खाया।",
      "memoryTip": "Roll call / Egg roll"
    }
  ]
},
  {
  "id": "hp-root-route",
  "groupTitle": "Root vs Route",
  "phonetic": "/ruːt/",
  "soundKey": "ruːt",
  "letter": "R",
  "examFrequency": "Very High",
  "confusableTip": "Root = पौधे की जड़ या मूल कारण; Route = रास्ता / मार्ग",
  "words": [
    {
      "id": "hp-373",
      "sno": 373,
      "word": "Root",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "The underground part of a plant / origin",
      "hindiMeaning": "जड़ / मूल स्त्रोत",
      "englishSentence": "The tree’s roots are deep.",
      "hindiSentence": "पेड़ की जड़ें गहरी हैं।",
      "memoryTip": "Root cause of problem"
    },
    {
      "id": "hp-374",
      "sno": 374,
      "word": "Route",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A way or course taken in getting from starting point to destination",
      "hindiMeaning": "रास्ता / मार्ग / रूट",
      "englishSentence": "This is the fastest route.",
      "hindiSentence": "यह सबसे तेज़ रास्ता है।",
      "memoryTip": "Bus route / GPS route"
    }
  ]
},
  {
  "id": "hp-sail-sale",
  "groupTitle": "Sail vs Sale",
  "phonetic": "/seɪl/",
  "soundKey": "seɪl",
  "letter": "S",
  "examFrequency": "Frequent",
  "confusableTip": "Sail = नाव चलाना / जहाज़ का पाल; Sale = बिक्री / सेल छूट",
  "words": [
    {
      "id": "hp-270",
      "sno": 270,
      "word": "Sail",
      "partOfSpeech": "Verb / Noun",
      "posCategory": "verb",
      "englishMeaning": "To travel by boat / piece of canvas to catch wind",
      "hindiMeaning": "नाव चलाना / पाल",
      "englishSentence": "We sailed across the lake.",
      "hindiSentence": "हमने झील के पार नाव चलाई।",
      "memoryTip": "Sailboat"
    },
    {
      "id": "hp-271",
      "sno": 271,
      "word": "Sale",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "The exchange of goods for money; discount period",
      "hindiMeaning": "बिक्री / सेल",
      "englishSentence": "There is a sale on shoes today.",
      "hindiSentence": "आज जूतों पर सेल है।",
      "memoryTip": "For sale / 50% off sale"
    }
  ]
},
  {
  "id": "hp-scene-seen",
  "groupTitle": "Scene vs Seen",
  "phonetic": "/siːn/",
  "soundKey": "siːn",
  "letter": "S",
  "examFrequency": "Very High",
  "confusableTip": "Scene = नाटक का दृश्य / दृश्यावली; Seen = देखा हुआ (See का Past Participle)",
  "words": [
    {
      "id": "hp-272",
      "sno": 272,
      "word": "Scene",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A sequence of action in a movie / location of incident",
      "hindiMeaning": "दृश्य / दृश्यावली / घटना स्थल",
      "englishSentence": "The opening scene was dramatic.",
      "hindiSentence": "शुरुआती दृश्य नाटकीय था।",
      "memoryTip": "Crime scene / Beautiful scenery"
    },
    {
      "id": "hp-273",
      "sno": 273,
      "word": "Seen",
      "partOfSpeech": "Verb",
      "posCategory": "verb",
      "englishMeaning": "Past participle of \"see\"",
      "hindiMeaning": "देखा हुआ",
      "englishSentence": "I have seen that movie.",
      "hindiSentence": "मैंने वह फिल्म देखी है।",
      "memoryTip": "See → Saw → Seen"
    }
  ]
},
  {
  "id": "hp-seam-seem",
  "groupTitle": "Seam vs Seem",
  "phonetic": "/siːm/",
  "soundKey": "siːm",
  "letter": "S",
  "examFrequency": "High",
  "confusableTip": "Seam = कपड़े की सिलाई का जोड़; Seem = प्रतीत होना / दिखाई देना",
  "words": [
    {
      "id": "hp-274",
      "sno": 274,
      "word": "Seam",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A line where two pieces of fabric are sewn together",
      "hindiMeaning": "सीवन / सिलाई का जोड़",
      "englishSentence": "There’s a tear at the seam.",
      "hindiSentence": "सिलाई की जगह पर कपड़ा फट गया है।",
      "memoryTip": "Cricket ball seam"
    },
    {
      "id": "hp-275",
      "sno": 275,
      "word": "Seem",
      "partOfSpeech": "Verb",
      "posCategory": "verb",
      "englishMeaning": "To give the impression of being; appear",
      "hindiMeaning": "प्रतीत होना / लगना",
      "englishSentence": "You seem tired today.",
      "hindiSentence": "तुम आज थके हुए लग रहे हो।",
      "memoryTip": "It seems to me"
    }
  ]
},
  {
  "id": "hp-serial-cereal",
  "groupTitle": "Serial vs Cereal",
  "phonetic": "/ˈsɪəriəl/",
  "soundKey": "sɪəriəl",
  "letter": "S",
  "examFrequency": "Very High",
  "confusableTip": "Serial = धारावाहिक / क्रमबद्ध; Cereal = खाने वाला अनाज (कॉर्नफ्लेक्स/गेहूं)",
  "words": [
    {
      "id": "hp-276",
      "sno": 276,
      "word": "Serial",
      "partOfSpeech": "Noun / Adjective",
      "posCategory": "noun",
      "englishMeaning": "A story or drama published in installments; sequential",
      "hindiMeaning": "धारावाहिक / क्रमिक",
      "englishSentence": "This serial airs every night.",
      "hindiSentence": "यह धारावाहिक हर रात आता है।",
      "memoryTip": "TV serial / Serial number"
    },
    {
      "id": "hp-277",
      "sno": 277,
      "word": "Cereal",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A grain used for food, such as wheat or oats; breakfast food",
      "hindiMeaning": "अनाज / दलिया",
      "englishSentence": "I had cereal for breakfast.",
      "hindiSentence": "मैंने नाश्ते में अनाज खाया।",
      "memoryTip": "Breakfast cereal"
    }
  ]
},
  {
  "id": "hp-sole-soul",
  "groupTitle": "Sole vs Soul",
  "phonetic": "/soʊl/",
  "soundKey": "soʊl",
  "letter": "S",
  "examFrequency": "Very High",
  "confusableTip": "Sole = जूते का तलवा / एकमात्र अकेला; Soul = आत्मा / रूह",
  "words": [
    {
      "id": "hp-278",
      "sno": 278,
      "word": "Sole",
      "partOfSpeech": "Noun / Adjective",
      "posCategory": "noun",
      "englishMeaning": "The underside of the foot or shoe / only; single",
      "hindiMeaning": "तलवा / एकमात्र / अकेला",
      "englishSentence": "His shoe sole is worn out. He is the sole owner.",
      "hindiSentence": "उसके जूते का तलवा घिस चुका है। वह अकेला मालिक है।",
      "memoryTip": "Sole proprietor / Shoe sole"
    },
    {
      "id": "hp-279",
      "sno": 279,
      "word": "Soul",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "The spiritual or immaterial part of a human being",
      "hindiMeaning": "आत्मा / रूह",
      "englishSentence": "May his soul rest in peace.",
      "hindiSentence": "उसकी आत्मा को शांति मिले।",
      "memoryTip": "RIP = Rest in peace soul"
    }
  ]
},
  {
  "id": "hp-stare-stair",
  "groupTitle": "Stare vs Stair",
  "phonetic": "/stɛər/",
  "soundKey": "stɛər",
  "letter": "S",
  "examFrequency": "Frequent",
  "confusableTip": "Stare = टकटकी लगाकर घूरना; Stair = सीढ़ी का पायदान",
  "words": [
    {
      "id": "hp-280",
      "sno": 280,
      "word": "Stare",
      "partOfSpeech": "Verb",
      "posCategory": "verb",
      "englishMeaning": "To look fixedly or vacantly at someone with wide open eyes",
      "hindiMeaning": "घूरना / टकटकी लगाना",
      "englishSentence": "Don’t stare at people.",
      "hindiSentence": "लोगों को घूरना मत।",
      "memoryTip": "Stare into space"
    },
    {
      "id": "hp-281",
      "sno": 281,
      "word": "Stair",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A set of steps leading from one floor of a building to another",
      "hindiMeaning": "सीढ़ी / पायदान",
      "englishSentence": "She slipped on the stair.",
      "hindiSentence": "वह सीढ़ी पर फिसल गई।",
      "memoryTip": "Staircase / Climb the stairs"
    }
  ]
},
  {
  "id": "hp-suit-suite",
  "groupTitle": "Suit vs Suite",
  "phonetic": "/suːt/ - /swiːt/",
  "soundKey": "suːt",
  "letter": "S",
  "examFrequency": "Very High",
  "confusableTip": "Suit = कोट-पैंट / अनुकूल होना; Suite (उच्चारण स्वीट) = होटल के कमरों का सेट",
  "words": [
    {
      "id": "hp-284",
      "sno": 284,
      "word": "Suit",
      "partOfSpeech": "Noun / Verb",
      "posCategory": "noun",
      "englishMeaning": "Formal matching jacket and trousers / to be convenient or appropriate",
      "hindiMeaning": "सूट / वस्त्र / अनुकूल होना",
      "englishSentence": "This colour suits you.",
      "hindiSentence": "यह रंग तुम्हारे ऊपर जंचता है।",
      "memoryTip": "Business suit"
    },
    {
      "id": "hp-285",
      "sno": 285,
      "word": "Suite",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A set of connected rooms in a hotel / musical movement",
      "hindiMeaning": "कमरों का समूह / सुइट (होटल का कमरा)",
      "englishSentence": "We booked a suite in the hotel.",
      "hindiSentence": "हमने होटल में एक सुइट बुक किया।",
      "memoryTip": "Suite is pronounced SWEET!"
    }
  ]
},
  {
  "id": "hp-tail-tale",
  "groupTitle": "Tail vs Tale",
  "phonetic": "/teɪl/",
  "soundKey": "teɪl",
  "letter": "T",
  "examFrequency": "Frequent",
  "confusableTip": "Tail = जानवर की पूंछ; Tale = काल्पनिक कहानी या किस्सा",
  "words": [
    {
      "id": "hp-286",
      "sno": 286,
      "word": "Tail",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "The rear end of an animal’s body",
      "hindiMeaning": "पूंछ",
      "englishSentence": "The dog wagged its tail.",
      "hindiSentence": "कुत्ते ने अपनी पूंछ हिलाई।",
      "memoryTip": "Heads or tails"
    },
    {
      "id": "hp-287",
      "sno": 287,
      "word": "Tale",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A fictitious or true narrative or story",
      "hindiMeaning": "कहानी / किस्सा / लोककथा",
      "englishSentence": "He told an old folk tale.",
      "hindiSentence": "उसने एक पुरानी लोककथा सुनाई।",
      "memoryTip": "Fairy tale"
    }
  ]
},
  {
  "id": "hp-team-teem",
  "groupTitle": "Team vs Teem",
  "phonetic": "/tiːm/",
  "soundKey": "tiːm",
  "letter": "T",
  "examFrequency": "Very High",
  "confusableTip": "Team = खिलाड़ियों का दल / समूह; Teem = भरा होना / उमड़ना (Teeming with life)",
  "words": [
    {
      "id": "hp-288",
      "sno": 288,
      "word": "Team",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A group of players or workers collaborating together",
      "hindiMeaning": "टीम / दल / समूह",
      "englishSentence": "Our team won the match.",
      "hindiSentence": "हमारी टीम ने मैच जीता।",
      "memoryTip": "Cricket team"
    },
    {
      "id": "hp-289",
      "sno": 289,
      "word": "Teem",
      "partOfSpeech": "Verb",
      "posCategory": "verb",
      "englishMeaning": "To be full of or swarming with",
      "hindiMeaning": "भरा होना / उमड़ना / प्रचुर मात्रा में होना",
      "englishSentence": "The river teems with fish.",
      "hindiSentence": "नदी में मछलियाँ भरी हुई हैं।",
      "memoryTip": "Teeming with crowd"
    }
  ]
},
  {
  "id": "hp-their-there",
  "groupTitle": "Their vs There",
  "phonetic": "/ðɛər/",
  "soundKey": "ðɛər",
  "letter": "T",
  "examFrequency": "Frequent",
  "confusableTip": "Their = उनका (स्वामित्व); There = वहाँ (स्थान)",
  "words": [
    {
      "id": "hp-290",
      "sno": 290,
      "word": "Their",
      "partOfSpeech": "Determiner",
      "posCategory": "other",
      "englishMeaning": "Belonging to or associated with them",
      "hindiMeaning": "उनका / उनकी",
      "englishSentence": "Their house is very big.",
      "hindiSentence": "उनका घर बहुत बड़ा है।",
      "memoryTip": "Their has HEIR (ownership)"
    },
    {
      "id": "hp-291",
      "sno": 291,
      "word": "There",
      "partOfSpeech": "Adverb",
      "posCategory": "adv",
      "englishMeaning": "In, at, or to that place",
      "hindiMeaning": "वहाँ / उस स्थान पर",
      "englishSentence": "He is standing over there.",
      "hindiSentence": "वह वहाँ खड़ा है।",
      "memoryTip": "There has HERE (place)"
    }
  ]
},
  {
  "id": "hp-threw-through",
  "groupTitle": "Threw vs Through",
  "phonetic": "/θruː/",
  "soundKey": "θruː",
  "letter": "T",
  "examFrequency": "Very High",
  "confusableTip": "Threw = फेंका (Throw का Past); Through = आर-पार / के माध्यम से (सुरंग आदि से)",
  "words": [
    {
      "id": "hp-292",
      "sno": 292,
      "word": "Threw",
      "partOfSpeech": "Verb",
      "posCategory": "verb",
      "englishMeaning": "Past tense of \"throw\"; propelled with force",
      "hindiMeaning": "फेंका / उछाला",
      "englishSentence": "He threw the ball far.",
      "hindiSentence": "उसने गेंद दूर फेंकी।",
      "memoryTip": "Throw → Threw"
    },
    {
      "id": "hp-293",
      "sno": 293,
      "word": "Through",
      "partOfSpeech": "Preposition",
      "posCategory": "prep",
      "englishMeaning": "Moving in one side and out of the other side",
      "hindiMeaning": "के माध्यम से / के आर-पार",
      "englishSentence": "We drove through the tunnel.",
      "hindiSentence": "हम सुरंग के माध्यम से गुज़रे।",
      "memoryTip": "Through the tunnel"
    }
  ]
},
  {
  "id": "hp-throne-thrown",
  "groupTitle": "Throne vs Thrown",
  "phonetic": "/θroʊn/",
  "soundKey": "θroʊn",
  "letter": "T",
  "examFrequency": "High",
  "confusableTip": "Throne = राजा का राजसिंहासन; Thrown = फेंका गया (Throw का Past Participle)",
  "words": [
    {
      "id": "hp-294",
      "sno": 294,
      "word": "Throne",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A ceremonial chair for a sovereign, bishop, or monarch",
      "hindiMeaning": "सिंहासन / राजगादी",
      "englishSentence": "The king sat on his throne.",
      "hindiSentence": "राजा अपने सिंहासन पर बैठा।",
      "memoryTip": "Game of Thrones"
    },
    {
      "id": "hp-295",
      "sno": 295,
      "word": "Thrown",
      "partOfSpeech": "Verb",
      "posCategory": "verb",
      "englishMeaning": "Past participle of \"throw\"",
      "hindiMeaning": "फेंका गया",
      "englishSentence": "The bag was thrown into the bin.",
      "hindiSentence": "बैग को कूड़ेदान में फेंक दिया गया।",
      "memoryTip": "Throw → Threw → Thrown"
    }
  ]
},
  {
  "id": "hp-tire-tyre",
  "groupTitle": "Tire vs Tyre",
  "phonetic": "/ˈtaɪər/",
  "soundKey": "taɪər",
  "letter": "T",
  "examFrequency": "Frequent",
  "confusableTip": "Tire = थक जाना (Verb) या अमेरिकी स्पेलिंग; Tyre = ब्रिटिश स्पेलिंग (गाड़ी का पहिया)",
  "words": [
    {
      "id": "hp-296",
      "sno": 296,
      "word": "Tire",
      "partOfSpeech": "Noun / Verb",
      "posCategory": "verb",
      "englishMeaning": "Rubber wheel cover (US) / to become weary",
      "hindiMeaning": "टायर / थक जाना",
      "englishSentence": "The tire burst. I tire easily.",
      "hindiSentence": "टायर फट गया। मैं जल्दी थक जाता हूँ।",
      "memoryTip": "Tired of waiting"
    },
    {
      "id": "hp-297",
      "sno": 297,
      "word": "Tyre",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "Rubber wheel covering (UK/Commonwealth spelling)",
      "hindiMeaning": "टायर (गाड़ी का पहिया)",
      "englishSentence": "The car’s rear tyre is flat.",
      "hindiSentence": "कार का पिछला टायर पंचर है।",
      "memoryTip": "Punctured tyre"
    }
  ]
},
  {
  "id": "hp-to-too-two",
  "groupTitle": "To vs Too vs Two",
  "phonetic": "/tuː/",
  "soundKey": "tuː",
  "letter": "T",
  "examFrequency": "Frequent",
  "confusableTip": "To = को/की ओर; Too = भी या अत्यधिक (Too much); Two = संख्या 2",
  "words": [
    {
      "id": "hp-298",
      "sno": 298,
      "word": "To",
      "partOfSpeech": "Preposition",
      "posCategory": "prep",
      "englishMeaning": "Expressing direction towards a point or person",
      "hindiMeaning": "को / तक / की ओर",
      "englishSentence": "I’m going to school.",
      "hindiSentence": "मैं स्कूल जा रहा हूँ।",
      "memoryTip": "Go to work"
    },
    {
      "id": "hp-299",
      "sno": 299,
      "word": "Too",
      "partOfSpeech": "Adverb",
      "posCategory": "adv",
      "englishMeaning": "To an excessive degree; also",
      "hindiMeaning": "भी / बहुत ज्यादा",
      "englishSentence": "I’m coming too. That’s too much.",
      "hindiSentence": "मैं भी आ रहा हूँ। वह बहुत ज्यादा है।",
      "memoryTip": "Too hot / Me too"
    },
    {
      "id": "hp-300",
      "sno": 300,
      "word": "Two",
      "partOfSpeech": "Noun / Adjective",
      "posCategory": "noun",
      "englishMeaning": "The number 2",
      "hindiMeaning": "दो (संख्या)",
      "englishSentence": "I have two brothers.",
      "hindiSentence": "मेरे दो भाई हैं।",
      "memoryTip": "One, Two, Three"
    }
  ]
},
  {
  "id": "hp-toe-tow",
  "groupTitle": "Toe vs Tow",
  "phonetic": "/toʊ/",
  "soundKey": "toʊ",
  "letter": "T",
  "examFrequency": "High",
  "confusableTip": "Toe = पैर की उंगली; Tow = वाहन को खींचकर ले जाना (Tow truck)",
  "words": [
    {
      "id": "hp-301",
      "sno": 301,
      "word": "Toe",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "Any of the five digits at the end of the human foot",
      "hindiMeaning": "पैर की उंगली / अंगूठा",
      "englishSentence": "I stubbed my toe on the chair.",
      "hindiSentence": "मेरा पैर की उंगली कुर्सी से टकरा गई।",
      "memoryTip": "Tip of your toes"
    },
    {
      "id": "hp-302",
      "sno": 302,
      "word": "Tow",
      "partOfSpeech": "Verb",
      "posCategory": "verb",
      "englishMeaning": "To pull another vehicle along with a rope or chain",
      "hindiMeaning": "खींचना / टो करना (गाड़ी)",
      "englishSentence": "The truck towed the car.",
      "hindiSentence": "ट्रक ने कार को खींचा।",
      "memoryTip": "Tow-truck / No parking toe zone"
    }
  ]
},
  {
  "id": "hp-vain-vein-vane",
  "groupTitle": "Vain vs Vein vs Vane",
  "phonetic": "/veɪn/",
  "soundKey": "veɪn",
  "letter": "V",
  "examFrequency": "Very High",
  "confusableTip": "Vain = घमंडी / व्यर्थ; Vein = खून की नस; Vane = पवन की दिशा बताने वाला यंत्र",
  "words": [
    {
      "id": "hp-303",
      "sno": 303,
      "word": "Vain",
      "partOfSpeech": "Adjective",
      "posCategory": "adj",
      "englishMeaning": "Having excessive pride in one’s looks / producing no result",
      "hindiMeaning": "घमंडी / व्यर्थ / निष्फल",
      "englishSentence": "He is too vain about his looks.",
      "hindiSentence": "वह अपनी शक्ल को लेकर बहुत घमंडी है।",
      "memoryTip": "All efforts went in vain (व्यर्थ)"
    },
    {
      "id": "hp-304",
      "sno": 304,
      "word": "Vein",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A blood vessel carrying blood to the heart / mineral streak",
      "hindiMeaning": "नस / रक्त वाहिनी / खनिज की धार",
      "englishSentence": "The nurse found a vein to insert the needle.",
      "hindiSentence": "नर्स ने सुई लगाने के लिए नस ढूंढी।",
      "memoryTip": "Veins and arteries"
    },
    {
      "id": "hp-305",
      "sno": 305,
      "word": "Vane",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A broad blade attached to a spire to show wind direction",
      "hindiMeaning": "पवनदर्शक / हवा का रुख बताने वाला फलक",
      "englishSentence": "The weather vane turned with the breeze.",
      "hindiSentence": "मौसम पवनदर्शक हवा के साथ घूम गया।",
      "memoryTip": "Weather vane"
    }
  ]
},
  {
  "id": "hp-vale-wail-veil",
  "groupTitle": "Vale vs Wail vs Veil",
  "phonetic": "/veɪl/ - /weɪl/",
  "soundKey": "veɪl",
  "letter": "V",
  "examFrequency": "Very High",
  "confusableTip": "Vale = घाटी (Valley); Wail = विलाप करना/रोना; Veil = घूंघट/पर्दा",
  "words": [
    {
      "id": "hp-306",
      "sno": 306,
      "word": "Vale",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A valley (used in poetic literature)",
      "hindiMeaning": "घाटी / वादी",
      "englishSentence": "The shepherd lived in a quiet vale.",
      "hindiSentence": "चरवाहा एक शांत घाटी में रहता था।",
      "memoryTip": "Vale of Kashmir"
    },
    {
      "id": "hp-307",
      "sno": 307,
      "word": "Wail",
      "partOfSpeech": "Verb / Noun",
      "posCategory": "verb",
      "englishMeaning": "To cry out or mourn loudly in grief or pain",
      "hindiMeaning": "रोना / विलाप करना",
      "englishSentence": "The baby wailed all night.",
      "hindiSentence": "बच्चा पूरी रात रोता रहा।",
      "memoryTip": "Wailing of sirens / grief"
    },
    {
      "id": "hp-308",
      "sno": 308,
      "word": "Veil",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A piece of thin fabric worn by women to protect or conceal the face",
      "hindiMeaning": "घूंघट / पर्दा / नकाब",
      "englishSentence": "She lifted her veil gently.",
      "hindiSentence": "उसने धीरे से अपना घूंघट उठाया।",
      "memoryTip": "Bridal veil"
    }
  ]
},
  {
  "id": "hp-vice-vise",
  "groupTitle": "Vice vs Vise",
  "phonetic": "/vaɪs/",
  "soundKey": "vaɪs",
  "letter": "V",
  "examFrequency": "High",
  "confusableTip": "Vice = बुरी लत या अनैतिक बुराई; Vise = कार्यशाला में वस्तु कसने का शिकंजा/वाइस",
  "words": [
    {
      "id": "hp-309",
      "sno": 309,
      "word": "Vice",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "Immoral or wicked behavior; bad habit",
      "hindiMeaning": "बुरी आदत / दोष / कुरीति",
      "englishSentence": "Gambling is a dangerous vice.",
      "hindiSentence": "जुआ एक खतरनाक बुरी आदत है।",
      "memoryTip": "Vice and Virtue (पाप और पुण्य)"
    },
    {
      "id": "hp-310",
      "sno": 310,
      "word": "Vise",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A metal tool with two jaws used to hold work firmly in place",
      "hindiMeaning": "वाइस / बेंच का शिकंजा",
      "englishSentence": "He held the pipe in a vise.",
      "hindiSentence": "उसने पाइप को वाइस में कस कर पकड़ा।",
      "memoryTip": "Carpenter vise"
    }
  ]
},
  {
  "id": "hp-waist-waste",
  "groupTitle": "Waist vs Waste",
  "phonetic": "/weɪst/",
  "soundKey": "weɪst",
  "letter": "W",
  "examFrequency": "Very High",
  "confusableTip": "Waist = शरीर की कमर; Waste = कचरा / समय व धन बर्बाद करना",
  "words": [
    {
      "id": "hp-311",
      "sno": 311,
      "word": "Waist",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "The part of the human body between the ribs and the hips",
      "hindiMeaning": "कमर",
      "englishSentence": "The belt was too tight at the waist.",
      "hindiSentence": "बेल्ट कमर पर बहुत टाइट थी।",
      "memoryTip": "Waistband / Waistline"
    },
    {
      "id": "hp-312",
      "sno": 312,
      "word": "Waste",
      "partOfSpeech": "Noun / Verb",
      "posCategory": "verb",
      "englishMeaning": "Unwanted or unusable material / to squander carelessely",
      "hindiMeaning": "कचरा / बर्बाद करना / व्यर्थ गंवाना",
      "englishSentence": "Don’t waste food.",
      "hindiSentence": "खाना बर्बाद मत करो।",
      "memoryTip": "Waste of time"
    }
  ]
},
  {
  "id": "hp-wait-weight",
  "groupTitle": "Wait vs Weight",
  "phonetic": "/weɪt/",
  "soundKey": "weɪt",
  "letter": "W",
  "examFrequency": "Frequent",
  "confusableTip": "Wait = प्रतीक्षा / इंतज़ार करना; Weight = वजन / भार",
  "words": [
    {
      "id": "hp-313",
      "sno": 313,
      "word": "Wait",
      "partOfSpeech": "Verb",
      "posCategory": "verb",
      "englishMeaning": "To stay where one is or delay action until a particular time",
      "hindiMeaning": "प्रतीक्षा करना / इंतज़ार करना",
      "englishSentence": "Please wait outside.",
      "hindiSentence": "कृपया बाहर प्रतीक्षा करें।",
      "memoryTip": "Wait for the bus"
    },
    {
      "id": "hp-314",
      "sno": 314,
      "word": "Weight",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A body's relative mass or the quantity of matter contained",
      "hindiMeaning": "वजन / भार",
      "englishSentence": "He lifted a heavy weight.",
      "hindiSentence": "उसने भारी वजन उठाया।",
      "memoryTip": "Lose weight / Heavy weight"
    }
  ]
},
  {
  "id": "hp-weak-week",
  "groupTitle": "Weak vs Week",
  "phonetic": "/wiːk/",
  "soundKey": "wiːk",
  "letter": "W",
  "examFrequency": "Frequent",
  "confusableTip": "Weak (EA) = कमजोर / निर्बल; Week (EE) = सप्ताह (7 दिन)",
  "words": [
    {
      "id": "hp-315",
      "sno": 315,
      "word": "Weak",
      "partOfSpeech": "Adjective",
      "posCategory": "adj",
      "englishMeaning": "Lacking physical strength and energy",
      "hindiMeaning": "कमजोर / निर्बल",
      "englishSentence": "He felt weak after the illness.",
      "hindiSentence": "बीमारी के बाद वह कमजोर महसूस कर रहा था।",
      "memoryTip": "Weak student / Strong vs Weak"
    },
    {
      "id": "hp-316",
      "sno": 316,
      "word": "Week",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A period of seven consecutive days",
      "hindiMeaning": "सप्ताह / हफ़्ता",
      "englishSentence": "We will meet next week.",
      "hindiSentence": "हम अगले सप्ताह मिलेंगे।",
      "memoryTip": "Weekend"
    }
  ]
},
  {
  "id": "hp-weather-whether-dup",
  "groupTitle": "Weather vs Whether",
  "phonetic": "/ˈwɛðər/",
  "soundKey": "wɛðər",
  "letter": "W",
  "examFrequency": "Very High",
  "confusableTip": "Weather = मौसम; Whether = यदि / या (Choice दर्शाना)",
  "words": [
    {
      "id": "hp-317",
      "sno": 317,
      "word": "Weather",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "The state of the atmosphere with respect to wind, temperature, rain",
      "hindiMeaning": "मौसम / जलवायु",
      "englishSentence": "The weather is very pleasant today.",
      "hindiSentence": "आज मौसम बहुत सुहावना है।",
      "memoryTip": "Rainy weather"
    },
    {
      "id": "hp-318",
      "sno": 318,
      "word": "Whether",
      "partOfSpeech": "Conjunction",
      "posCategory": "other",
      "englishMeaning": "Expressing a doubt or choice between alternatives",
      "hindiMeaning": "क्या / चाहे",
      "englishSentence": "I don’t know whether she will come.",
      "hindiSentence": "मुझे नहीं पता वह आएगी या नहीं।",
      "memoryTip": "Whether you like it or not"
    }
  ]
},
  {
  "id": "hp-which-witch",
  "groupTitle": "Which vs Witch",
  "phonetic": "/wɪtʃ/",
  "soundKey": "wɪtʃ",
  "letter": "W",
  "examFrequency": "Frequent",
  "confusableTip": "Which = कौन-सा (प्रश्नवाचक सर्वनाम); Witch = जादूगरनी / डायन",
  "words": [
    {
      "id": "hp-319",
      "sno": 319,
      "word": "Which",
      "partOfSpeech": "Pronoun",
      "posCategory": "pron",
      "englishMeaning": "Asking for information specifying one or more people or things",
      "hindiMeaning": "कौन-सा / कौन-सी",
      "englishSentence": "Which colour do you like?",
      "hindiSentence": "तुम्हें कौन-सा रंग पसंद है?",
      "memoryTip": "Which one?"
    },
    {
      "id": "hp-320",
      "sno": 320,
      "word": "Witch",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A woman thought to have magic powers, especially evil ones",
      "hindiMeaning": "जादूगरनी / डायन",
      "englishSentence": "The fairy tale had an evil witch.",
      "hindiSentence": "उस परीकथा में एक दुष्ट जादूगरनी थी।",
      "memoryTip": "Witch flies on a broom"
    }
  ]
},
  {
  "id": "hp-wood-would",
  "groupTitle": "Wood vs Would",
  "phonetic": "/wʊd/",
  "soundKey": "wʊd",
  "letter": "W",
  "examFrequency": "Frequent",
  "confusableTip": "Wood = पेड़ की लकड़ी; Would = करेगा / चाहता था (Will का Past/Modal)",
  "words": [
    {
      "id": "hp-321",
      "sno": 321,
      "word": "Wood",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "The hard fibrous material forming the trunk or branches of a tree",
      "hindiMeaning": "लकड़ी / जंगल",
      "englishSentence": "The table is made of wood.",
      "hindiSentence": "यह मेज़ लकड़ी की बनी है।",
      "memoryTip": "Wooden furniture"
    },
    {
      "id": "hp-322",
      "sno": 322,
      "word": "Would",
      "partOfSpeech": "Modal Verb",
      "posCategory": "verb",
      "englishMeaning": "Expressing a hypothetical condition, past intent or polite request",
      "hindiMeaning": "चाहता / करता / करेगा",
      "englishSentence": "I would go if I were free.",
      "hindiSentence": "अगर मैं फ्री होता तो ज़रूर जाता।",
      "memoryTip": "Would you please help me?"
    }
  ]
},
  {
  "id": "hp-war-wore-warred-warned",
  "groupTitle": "War vs Wore vs Warred vs Warned",
  "phonetic": "/wɔːr/ - /wɔːrd/",
  "soundKey": "wɔːr",
  "letter": "W",
  "examFrequency": "Very High",
  "confusableTip": "War = युद्ध; Wore = पहना (Wear का Past); Warred = युद्ध किया; Warned = चेताया (Warn का Past)",
  "words": [
    {
      "id": "hp-323",
      "sno": 323,
      "word": "War",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A state of armed conflict between different countries",
      "hindiMeaning": "युद्ध / संग्राम",
      "englishSentence": "The war lasted five years.",
      "hindiSentence": "युद्ध पाँच साल चला।",
      "memoryTip": "World War"
    },
    {
      "id": "hp-324",
      "sno": 324,
      "word": "Wore",
      "partOfSpeech": "Verb",
      "posCategory": "verb",
      "englishMeaning": "Past tense of \"wear\"; had on one’s person",
      "hindiMeaning": "पहना हुआ / पहना था",
      "englishSentence": "She wore a red dress.",
      "hindiSentence": "उसने लाल ड्रेस पहनी थी।",
      "memoryTip": "Wear → Wore → Worn"
    },
    {
      "id": "hp-325",
      "sno": 325,
      "word": "Warred",
      "partOfSpeech": "Verb",
      "posCategory": "verb",
      "englishMeaning": "Engaged in a war or conflict",
      "hindiMeaning": "युद्ध किया / लड़े",
      "englishSentence": "The two countries warred for decades.",
      "hindiSentence": "दोनों देशों ने दशकों तक युद्ध किया।",
      "memoryTip": "War + red"
    },
    {
      "id": "hp-326",
      "sno": 326,
      "word": "Warned",
      "partOfSpeech": "Verb",
      "posCategory": "verb",
      "englishMeaning": "Informed someone in advance of a possible danger or problem",
      "hindiMeaning": "चेताया / चेतावनी दी",
      "englishSentence": "I warned him about the risks.",
      "hindiSentence": "मैंने उसे जोखिमों के बारे में चेताया।",
      "memoryTip": "Warning"
    }
  ]
},
  {
  "id": "hp-affect-effect",
  "groupTitle": "Affect vs Effect",
  "phonetic": "/əˈfɛkt/ - /ɪˈfɛkt/",
  "soundKey": "əfɛkt",
  "letter": "A",
  "examFrequency": "Very High",
  "confusableTip": "Affect (Action/Verb) = प्रभाव डालना; Effect (End result/Noun) = परिणाम या असर",
  "words": [
    {
      "id": "hp-327",
      "sno": 327,
      "word": "Affect",
      "partOfSpeech": "Verb",
      "posCategory": "verb",
      "englishMeaning": "To produce an effect on / to influence",
      "hindiMeaning": "प्रभाव डालना / असर करना",
      "englishSentence": "The weather can affect your mood.",
      "hindiSentence": "मौसम आपके मूड को प्रभावित कर सकता है।",
      "memoryTip": "Affect = Action (Verb) RAVEN rule"
    },
    {
      "id": "hp-328",
      "sno": 328,
      "word": "Effect",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A change which is a result or consequence of an action",
      "hindiMeaning": "परिणाम / प्रभाव / असर",
      "englishSentence": "The medicine had no side effect.",
      "hindiSentence": "दवा का कोई साइड इफेक्ट नहीं था।",
      "memoryTip": "Side effect (Noun)"
    }
  ]
},
  {
  "id": "hp-accept-except",
  "groupTitle": "Accept vs Except",
  "phonetic": "/əkˈsɛpt/ - /ɪkˈsɛpt/",
  "soundKey": "əksɛpt",
  "letter": "A",
  "examFrequency": "Very High",
  "confusableTip": "Accept = स्वीकार करना; Except = को छोड़कर (Excluding)",
  "words": [
    {
      "id": "hp-329",
      "sno": 329,
      "word": "Accept",
      "partOfSpeech": "Verb",
      "posCategory": "verb",
      "englishMeaning": "To receive willingly something offered",
      "hindiMeaning": "स्वीकार करना / मान लेना",
      "englishSentence": "He accepted the invitation.",
      "hindiSentence": "उसने निमंत्रण स्वीकार कर लिया।",
      "memoryTip": "Accept the offer"
    },
    {
      "id": "hp-330",
      "sno": 330,
      "word": "Except",
      "partOfSpeech": "Preposition",
      "posCategory": "prep",
      "englishMeaning": "Not including; other than",
      "hindiMeaning": "को छोड़कर / के अतिरिक्त",
      "englishSentence": "Everyone was present except Meena.",
      "hindiSentence": "मीना को छोड़कर सभी उपस्थित थे।",
      "memoryTip": "Except = Exception (बाहर करना)"
    }
  ]
},
  {
  "id": "hp-advice-advise",
  "groupTitle": "Advice vs Advise",
  "phonetic": "/ədˈvaɪs/ - /ədˈvaɪz/",
  "soundKey": "ədvaɪs",
  "letter": "A",
  "examFrequency": "Very High",
  "confusableTip": "Advice (C) = सलाह (Noun); Advise (S) = सलाह देना (Verb)",
  "words": [
    {
      "id": "hp-331",
      "sno": 331,
      "word": "Advice",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "Guidance or recommendations offered with regard to prudent action",
      "hindiMeaning": "सलाह / मशविरा / उपदेश",
      "englishSentence": "His advice helped me a lot.",
      "hindiSentence": "उसकी सलाह ने मेरी बहुत मदद की।",
      "memoryTip": "Piece of advice (Noun)"
    },
    {
      "id": "hp-332",
      "sno": 332,
      "word": "Advise",
      "partOfSpeech": "Verb",
      "posCategory": "verb",
      "englishMeaning": "To offer suggestions about the best course of action",
      "hindiMeaning": "सलाह देना / राय देना",
      "englishSentence": "Doctors advise drinking water.",
      "hindiSentence": "डॉक्टर पानी पीने की सलाह देते हैं।",
      "memoryTip": "Advise has \"S\" like \"Suggest\""
    }
  ]
},
  {
  "id": "hp-break-brake",
  "groupTitle": "Break vs Brake",
  "phonetic": "/breɪk/",
  "soundKey": "breɪk",
  "letter": "B",
  "examFrequency": "Very High",
  "confusableTip": "Break = तोड़ना / अंतराल; Brake = वाहन रोकने वाला ब्रेक",
  "words": [
    {
      "id": "hp-333",
      "sno": 333,
      "word": "Break",
      "partOfSpeech": "Verb / Noun",
      "posCategory": "verb",
      "englishMeaning": "To separate into pieces as a result of a blow / an interval",
      "hindiMeaning": "तोड़ना / टूटना / विराम",
      "englishSentence": "Don’t break the mirror.",
      "hindiSentence": "आईना मत तोड़ो।",
      "memoryTip": "Lunch break / Break the glass"
    },
    {
      "id": "hp-334",
      "sno": 334,
      "word": "Brake",
      "partOfSpeech": "Noun / Verb",
      "posCategory": "noun",
      "englishMeaning": "A device for slowing or stopping a moving vehicle",
      "hindiMeaning": "ब्रेक (गति रोकने का यंत्र)",
      "englishSentence": "The bus driver applied the brake suddenly.",
      "hindiSentence": "बस चालक ने अचानक ब्रेक लगाया।",
      "memoryTip": "Car brakes"
    }
  ]
},
  {
  "id": "hp-counsel-council",
  "groupTitle": "Counsel vs Council",
  "phonetic": "/ˈkaʊnsəl/",
  "soundKey": "kaʊnsəl",
  "letter": "C",
  "examFrequency": "Very High",
  "confusableTip": "Counsel = कानूनी सलाह या वकील; Council = निर्णय लेने वाली निर्वाचित परिषद/समिति",
  "words": [
    {
      "id": "hp-335",
      "sno": 335,
      "word": "Counsel",
      "partOfSpeech": "Noun / Verb",
      "posCategory": "noun",
      "englishMeaning": "Advice given formally / legal adviser or advocate",
      "hindiMeaning": "सलाह / वकील / परामर्श देना",
      "englishSentence": "The counsel suggested a new strategy.",
      "hindiSentence": "वकील ने एक नई रणनीति सुझाई।",
      "memoryTip": "Legal counsel"
    },
    {
      "id": "hp-336",
      "sno": 336,
      "word": "Council",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "An advisory, deliberative, or legislative body of people",
      "hindiMeaning": "परिषद / समिति / सभा",
      "englishSentence": "The city council passed the new law.",
      "hindiSentence": "नगर परिषद ने नया कानून पारित किया।",
      "memoryTip": "City council / Student council"
    }
  ]
},
  {
  "id": "hp-desert-dessert",
  "groupTitle": "Desert vs Dessert",
  "phonetic": "/ˈdɛzərt/ - /dɪˈzɜːrt/",
  "soundKey": "dɛzərt",
  "letter": "D",
  "examFrequency": "Very High",
  "confusableTip": "Desert (1 S) = रेगिस्तान / त्याग देना; Dessert (2 S) = भोजन के बाद की मीठी मिठाई (Sweet Strawberry)",
  "words": [
    {
      "id": "hp-337",
      "sno": 337,
      "word": "Desert",
      "partOfSpeech": "Noun / Verb",
      "posCategory": "noun",
      "englishMeaning": "A dry barren sandy area / to abandon",
      "hindiMeaning": "रेगिस्तान / मरुस्थल / छोड़ देना",
      "englishSentence": "The camel lives in the desert.",
      "hindiSentence": "ऊंट रेगिस्तान में रहता है।",
      "memoryTip": "Sahara desert (One S for Sand)"
    },
    {
      "id": "hp-338",
      "sno": 338,
      "word": "Dessert",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "The sweet course eaten at the end of a meal",
      "hindiMeaning": "मिठाई / मीठा व्यंजन",
      "englishSentence": "We had ice cream for dessert.",
      "hindiSentence": "हमने मिठाई में आइसक्रीम खाई।",
      "memoryTip": "Dessert has \"SS\" = Sweet Stuff!"
    }
  ]
},
  {
  "id": "hp-its-it-is",
  "groupTitle": "Its vs It's",
  "phonetic": "/ɪts/",
  "soundKey": "ɪts",
  "letter": "I",
  "examFrequency": "Very High",
  "confusableTip": "Its = इसका/उसका (स्वामित्व); It's = It is का संक्षिप्त रूप (यह है)",
  "words": [
    {
      "id": "hp-339",
      "sno": 339,
      "word": "Its",
      "partOfSpeech": "Pronoun",
      "posCategory": "pron",
      "englishMeaning": "Belonging to or associated with a thing previously mentioned",
      "hindiMeaning": "इसका / अपना",
      "englishSentence": "The cat licked its paws.",
      "hindiSentence": "बिल्ली ने अपने पंजे चाटे।",
      "memoryTip": "Its is possessive like His and Her"
    },
    {
      "id": "hp-340",
      "sno": 340,
      "word": "It's",
      "partOfSpeech": "Contraction",
      "posCategory": "other",
      "englishMeaning": "Contraction of \"it is\" or \"it has\"",
      "hindiMeaning": "यह है / यह हो चुका है",
      "englishSentence": "It’s raining outside.",
      "hindiSentence": "बाहर बारिश हो रही है।",
      "memoryTip": "It's = It is"
    }
  ]
},
  {
  "id": "hp-loose-lose",
  "groupTitle": "Loose vs Lose",
  "phonetic": "/luːs/ - /luːz/",
  "soundKey": "luːs",
  "letter": "L",
  "examFrequency": "Very High",
  "confusableTip": "Loose (Double O) = ढीला / खुला; Lose (Single O) = खो देना या हार जाना",
  "words": [
    {
      "id": "hp-341",
      "sno": 341,
      "word": "Loose",
      "partOfSpeech": "Adjective",
      "posCategory": "adj",
      "englishMeaning": "Not firmly or tightly fixed in place / free",
      "hindiMeaning": "ढीला / खुला / मुक्त",
      "englishSentence": "This shirt is too loose.",
      "hindiSentence": "यह शर्ट बहुत ढीली है।",
      "memoryTip": "Loose pants / Loose knot"
    },
    {
      "id": "hp-342",
      "sno": 342,
      "word": "Lose",
      "partOfSpeech": "Verb",
      "posCategory": "verb",
      "englishMeaning": "To be deprived of / fail to win",
      "hindiMeaning": "खोना / गँवाना / हारना",
      "englishSentence": "Don’t lose your keys.",
      "hindiSentence": "अपनी चाबियाँ मत खोओ।",
      "memoryTip": "Win or Lose"
    }
  ]
},
  {
  "id": "hp-moral-morale",
  "groupTitle": "Moral vs Morale",
  "phonetic": "/ˈmɒrəl/ - /məˈrɑːl/",
  "soundKey": "mɒrəl",
  "letter": "M",
  "examFrequency": "Very High",
  "confusableTip": "Moral = नैतिक शिक्षा या सिद्धांत; Morale (उच्चारण मोराल) = आत्मविश्वास या मनोबल",
  "words": [
    {
      "id": "hp-343",
      "sno": 343,
      "word": "Moral",
      "partOfSpeech": "Noun / Adjective",
      "posCategory": "noun",
      "englishMeaning": "A lesson taught by a story / ethical values",
      "hindiMeaning": "नैतिकता / नैतिक शिक्षा",
      "englishSentence": "The story teaches a moral.",
      "hindiSentence": "कहानी एक नैतिक शिक्षा देती है।",
      "memoryTip": "Moral of the story"
    },
    {
      "id": "hp-344",
      "sno": 344,
      "word": "Morale",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "The confidence, enthusiasm, and discipline of a person or group",
      "hindiMeaning": "मनोबल / मानसिक साहस",
      "englishSentence": "The team's morale is high.",
      "hindiSentence": "टीम का मनोबल ऊँचा है।",
      "memoryTip": "High team morale"
    }
  ]
},
  {
  "id": "hp-your-you-are",
  "groupTitle": "Your vs You're",
  "phonetic": "/jɔːr/",
  "soundKey": "jɔːr",
  "letter": "Y",
  "examFrequency": "Frequent",
  "confusableTip": "Your = तुम्हारा (स्वामित्व); You're = You are का संक्षिप्त रूप (तुम हो)",
  "words": [
    {
      "id": "hp-345",
      "sno": 345,
      "word": "Your",
      "partOfSpeech": "Pronoun",
      "posCategory": "pron",
      "englishMeaning": "Belonging to or associated with the person being addressed",
      "hindiMeaning": "तुम्हारा / आपका",
      "englishSentence": "Your shoes are here.",
      "hindiSentence": "तुम्हारे जूते यहाँ हैं।",
      "memoryTip": "Your book"
    },
    {
      "id": "hp-346",
      "sno": 346,
      "word": "You’re",
      "partOfSpeech": "Contraction",
      "posCategory": "other",
      "englishMeaning": "Contraction of \"you are\"",
      "hindiMeaning": "तुम हो / आप हैं",
      "englishSentence": "You’re my best friend.",
      "hindiSentence": "तुम मेरे सबसे अच्छे दोस्त हो।",
      "memoryTip": "You're welcome"
    }
  ]
},
  {
  "id": "hp-born-borne",
  "groupTitle": "Born vs Borne",
  "phonetic": "/bɔːrn/",
  "soundKey": "bɔːrn",
  "letter": "B",
  "examFrequency": "Very High",
  "confusableTip": "Born = जन्म लेना; Borne = वहन किया गया / सहा गया (Bear का Past Participle)",
  "words": [
    {
      "id": "hp-347",
      "sno": 347,
      "word": "Born",
      "partOfSpeech": "Verb",
      "posCategory": "verb",
      "englishMeaning": "Existing as a result of birth",
      "hindiMeaning": "जन्म लेना / पैदा होना",
      "englishSentence": "He was born in March.",
      "hindiSentence": "उसका जन्म मार्च में हुआ था।",
      "memoryTip": "Born in India"
    },
    {
      "id": "hp-348",
      "sno": 348,
      "word": "Borne",
      "partOfSpeech": "Verb",
      "posCategory": "verb",
      "englishMeaning": "Past participle of \"bear\"; carried, endured, or transported",
      "hindiMeaning": "वहन किया गया / सहा गया / ढोया गया",
      "englishSentence": "The costs will be borne by the company.",
      "hindiSentence": "खर्च कंपनी द्वारा वहन किया जाएगा।",
      "memoryTip": "Airborne / Mosquito-borne disease"
    }
  ]
},
  {
  "id": "hp-bridal-bridle",
  "groupTitle": "Bridal vs Bridle",
  "phonetic": "/ˈbraɪdl/",
  "soundKey": "braɪdl",
  "letter": "B",
  "examFrequency": "Very High",
  "confusableTip": "Bridal (al) = दुल्हन से संबंधित; Bridle (le) = घोड़े की लगाम या वश में रखना",
  "words": [
    {
      "id": "hp-349",
      "sno": 349,
      "word": "Bridal",
      "partOfSpeech": "Adjective",
      "posCategory": "adj",
      "englishMeaning": "Concerning or belonging to a bride or a wedding",
      "hindiMeaning": "दुल्हन से संबंधित / वैवाहिक",
      "englishSentence": "She visited a bridal boutique.",
      "hindiSentence": "वह एक दुल्हन की दुकान पर गई।",
      "memoryTip": "Bridal gown / Bridal makeup"
    },
    {
      "id": "hp-350",
      "sno": 350,
      "word": "Bridle",
      "partOfSpeech": "Noun / Verb",
      "posCategory": "noun",
      "englishMeaning": "The headgear used to control a horse / to show resentment",
      "hindiMeaning": "घोड़े की लगाम / काबू में रखना",
      "englishSentence": "He held the horse by the bridle.",
      "hindiSentence": "उसने घोड़े की लगाम पकड़ी।",
      "memoryTip": "Bridle path / Bridle anger"
    }
  ]
},
  {
  "id": "hp-dam-damn",
  "groupTitle": "Dam vs Damn",
  "phonetic": "/dæm/",
  "soundKey": "dæm",
  "letter": "D",
  "examFrequency": "High",
  "confusableTip": "Dam = पानी रोकने वाला बाँध; Damn = धिक्कारना या शाप देना",
  "words": [
    {
      "id": "hp-351",
      "sno": 351,
      "word": "Dam",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A barrier constructed to hold back water and raise its level",
      "hindiMeaning": "बाँध / जलबंधक",
      "englishSentence": "The dam stores rainwater.",
      "hindiSentence": "बाँध बारिश का पानी संग्रहित करता है।",
      "memoryTip": "Bhakra Nangal Dam"
    },
    {
      "id": "hp-352",
      "sno": 352,
      "word": "Damn",
      "partOfSpeech": "Interjection / Verb",
      "posCategory": "other",
      "englishMeaning": "An expression of anger / to condemn",
      "hindiMeaning": "धिक्कारना / शाप देना",
      "englishSentence": "He shouted \"Damn!\" when he dropped his phone.",
      "hindiSentence": "जब उसका फोन गिरा तो उसने \"धत्त!\" चिल्लाया।",
      "memoryTip": "Damn it!"
    }
  ]
},
  {
  "id": "hp-faint-feint",
  "groupTitle": "Faint vs Feint",
  "phonetic": "/feɪnt/",
  "soundKey": "feɪnt",
  "letter": "F",
  "examFrequency": "Very High",
  "confusableTip": "Faint (AI) = बेहोश होना / धुंधला या हल्का; Feint (EI) = चकमा देना / छल की चाल (मुक्केबाजी)",
  "words": [
    {
      "id": "hp-353",
      "sno": 353,
      "word": "Faint",
      "partOfSpeech": "Adjective / Verb",
      "posCategory": "adj",
      "englishMeaning": "Barely perceptible / to lose consciousness briefly",
      "hindiMeaning": "मंद / बेहोश होना / हल्का",
      "englishSentence": "She gave a faint smile.",
      "hindiSentence": "उसने हल्की सी मुस्कान दी।",
      "memoryTip": "Faint voice / Faint from hunger"
    },
    {
      "id": "hp-354",
      "sno": 354,
      "word": "Feint",
      "partOfSpeech": "Noun / Verb",
      "posCategory": "noun",
      "englishMeaning": "A deceptive or distracting movement, especially in boxing or war",
      "hindiMeaning": "छलावा / झांसा / चकमा देने वाली चाल",
      "englishSentence": "The boxer used a clever feint.",
      "hindiSentence": "मुक्केबाज ने चालाकी से एक चाल चली।",
      "memoryTip": "Feint move in chess/boxing"
    }
  ]
},
  {
  "id": "hp-grate-great",
  "groupTitle": "Grate vs Great",
  "phonetic": "/ɡreɪt/",
  "soundKey": "ɡreɪt",
  "letter": "G",
  "examFrequency": "Frequent",
  "confusableTip": "Grate = कद्दूकस करना / जाली; Great = महान / बहुत बड़ा",
  "words": [
    {
      "id": "hp-355",
      "sno": 355,
      "word": "Grate",
      "partOfSpeech": "Verb / Noun",
      "posCategory": "verb",
      "englishMeaning": "To shred food into small pieces by rubbing / a metal framework of bars",
      "hindiMeaning": "कद्दूकस करना / चिढ़ाना / धातु की जाली",
      "englishSentence": "Grate the cheese before adding it.",
      "hindiSentence": "चीज़ को डालने से पहले कद्दूकस करें।",
      "memoryTip": "Cheese grater"
    },
    {
      "id": "hp-131-dup",
      "sno": 131,
      "word": "Great",
      "partOfSpeech": "Adjective",
      "posCategory": "adj",
      "englishMeaning": "Of an extent, amount, or intensity considerably above normal; famous",
      "hindiMeaning": "महान / बड़ा / शानदार",
      "englishSentence": "He is a great leader.",
      "hindiSentence": "वह एक महान नेता है।",
      "memoryTip": "Great Wall of China"
    }
  ]
},
  {
  "id": "hp-here-hear",
  "groupTitle": "Here vs Hear",
  "phonetic": "/hɪər/",
  "soundKey": "hɪər",
  "letter": "H",
  "examFrequency": "Frequent",
  "confusableTip": "Here = यहाँ (स्थान); Hear = कानों से सुनना (EAR अंदर है)",
  "words": [
    {
      "id": "hp-356",
      "sno": 356,
      "word": "Here",
      "partOfSpeech": "Adverb",
      "posCategory": "adv",
      "englishMeaning": "In, at, or to this place or position",
      "hindiMeaning": "यहाँ / इस स्थान पर",
      "englishSentence": "Come here quickly.",
      "hindiSentence": "जल्दी यहाँ आओ।",
      "memoryTip": "Here and there"
    },
    {
      "id": "hp-357",
      "sno": 357,
      "word": "Hear",
      "partOfSpeech": "Verb",
      "posCategory": "verb",
      "englishMeaning": "To perceive with the ear the sound made by someone or something",
      "hindiMeaning": "सुनना / कान से सुनना",
      "englishSentence": "Can you hear that noise?",
      "hindiSentence": "क्या तुम वह आवाज़ सुन सकते हो?",
      "memoryTip": "hEAR has EAR inside it!"
    }
  ]
},
  {
  "id": "hp-key-quay",
  "groupTitle": "Key vs Quay",
  "phonetic": "/kiː/",
  "soundKey": "kiː",
  "letter": "K",
  "examFrequency": "Very High",
  "confusableTip": "Key = ताले की चाबी / महत्वपूर्ण; Quay (उच्चारण की) = जहाज़ का बंदरगाह/घाट",
  "words": [
    {
      "id": "hp-358",
      "sno": 358,
      "word": "Key",
      "partOfSpeech": "Noun / Adjective",
      "posCategory": "noun",
      "englishMeaning": "A small metal tool used for opening locks / crucial element",
      "hindiMeaning": "चाबी / कुंजी / महत्वपूर्ण",
      "englishSentence": "I lost my house key.",
      "hindiSentence": "मेरे घर की चाबी खो गई।",
      "memoryTip": "Key to success"
    },
    {
      "id": "hp-359",
      "sno": 359,
      "word": "Quay",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A stone or concrete platform lying alongside or projecting into water for loading ships",
      "hindiMeaning": "घाट / जहाज़ लंगरगाह (बंदरगाह)",
      "englishSentence": "The ship docked at the quay.",
      "hindiSentence": "जहाज घाट पर रुका।",
      "memoryTip": "Quay is pronounced exactly like KEY!"
    }
  ]
},
  {
  "id": "hp-morning-mourning",
  "groupTitle": "Morning vs Mourning",
  "phonetic": "/ˈmɔːrnɪŋ/",
  "soundKey": "mɔːrnɪŋ",
  "letter": "M",
  "examFrequency": "Very High",
  "confusableTip": "Morning = प्रातःकाल / सुबह; Mourning (U) = किसी की मृत्यु पर शोक मनाना",
  "words": [
    {
      "id": "hp-360",
      "sno": 360,
      "word": "Morning",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "The period of time between midnight and noon, especially sunrise to noon",
      "hindiMeaning": "सुबह / प्रातःकाल",
      "englishSentence": "I go jogging every morning.",
      "hindiSentence": "मैं हर सुबह दौड़ने जाता हूँ।",
      "memoryTip": "Good morning"
    },
    {
      "id": "hp-361",
      "sno": 361,
      "word": "Mourning",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "The expression of deep sorrow for someone who has died",
      "hindiMeaning": "शोक / मातम मनाना",
      "englishSentence": "The family is in mourning.",
      "hindiSentence": "परिवार शोक में है।",
      "memoryTip": "National mourning"
    }
  ]
},
  {
  "id": "hp-one-won",
  "groupTitle": "One vs Won",
  "phonetic": "/wʌn/",
  "soundKey": "wʌn",
  "letter": "O",
  "examFrequency": "Frequent",
  "confusableTip": "One = संख्या 1; Won = मैच जीता (Win का Past)",
  "words": [
    {
      "id": "hp-362",
      "sno": 362,
      "word": "One",
      "partOfSpeech": "Number",
      "posCategory": "other",
      "englishMeaning": "The lowest cardinal number; 1",
      "hindiMeaning": "एक (संख्या)",
      "englishSentence": "He has one brother.",
      "hindiSentence": "उसका एक भाई है।",
      "memoryTip": "One and only"
    },
    {
      "id": "hp-363",
      "sno": 363,
      "word": "Won",
      "partOfSpeech": "Verb",
      "posCategory": "verb",
      "englishMeaning": "Past tense and past participle of \"win\"",
      "hindiMeaning": "जीता / विजय प्राप्त की",
      "englishSentence": "India won the match.",
      "hindiSentence": "भारत ने मैच जीता।",
      "memoryTip": "Win → Won"
    }
  ]
},
  {
  "id": "hp-pale-pail",
  "groupTitle": "Pale vs Pail",
  "phonetic": "/peɪl/",
  "soundKey": "peɪl",
  "letter": "P",
  "examFrequency": "Very High",
  "confusableTip": "Pale = बीमारी या डर से पीला पड़ना; Pail = पानी की बाल्टी (Bucket)",
  "words": [
    {
      "id": "hp-364",
      "sno": 364,
      "word": "Pale",
      "partOfSpeech": "Adjective",
      "posCategory": "adj",
      "englishMeaning": "Light in colour or having little color; whitish",
      "hindiMeaning": "पीला / फीका / कांतिहीन",
      "englishSentence": "Her face looked pale.",
      "hindiSentence": "उसका चेहरा पीला लग रहा था।",
      "memoryTip": "Pale with fear"
    },
    {
      "id": "hp-365",
      "sno": 365,
      "word": "Pail",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A bucket, typically a cylindrical vessel with handle",
      "hindiMeaning": "बाल्टी",
      "englishSentence": "He carried water in a pail.",
      "hindiSentence": "वह बाल्टी में पानी लाया।",
      "memoryTip": "Jack and Jill went up the hill to fetch a pail of water"
    }
  ]
},
  {
  "id": "hp-profit-prophet",
  "groupTitle": "Profit vs Prophet",
  "phonetic": "/ˈprɒfɪt/",
  "soundKey": "prɒfɪt",
  "letter": "P",
  "examFrequency": "Very High",
  "confusableTip": "Profit = व्यापार में वित्तीय लाभ/मुनाफा; Prophet = ईश्वर का पैगंबर / भविष्यवक्ता",
  "words": [
    {
      "id": "hp-366",
      "sno": 366,
      "word": "Profit",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A financial gain, especially the difference between amount earned and spent",
      "hindiMeaning": "लाभ / मुनाफा",
      "englishSentence": "He made a big profit in business.",
      "hindiSentence": "उसे व्यापार में बड़ा लाभ हुआ।",
      "memoryTip": "Profit and loss"
    },
    {
      "id": "hp-367",
      "sno": 367,
      "word": "Prophet",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A person regarded as an inspired teacher or proclaimer of the will of God",
      "hindiMeaning": "पैगंबर / नबी / भविष्यवक्ता",
      "englishSentence": "Muhammad was a prophet.",
      "hindiSentence": "मोहम्मद एक पैगंबर थे।",
      "memoryTip": "Prophet foresaw the future"
    }
  ]
},
  {
  "id": "hp-ring-wring",
  "groupTitle": "Ring vs Wring",
  "phonetic": "/rɪŋ/",
  "soundKey": "rɪŋ",
  "letter": "R",
  "examFrequency": "High",
  "confusableTip": "Ring = अंगूठी या घंटी बजना; Wring = निचोड़ना (कपड़ा या हाथ)",
  "words": [
    {
      "id": "hp-369",
      "sno": 369,
      "word": "Ring",
      "partOfSpeech": "Noun / Verb",
      "posCategory": "noun",
      "englishMeaning": "A small circular band of precious metal / to make a clear resonant sound",
      "hindiMeaning": "अंगूठी / छल्ला / बजना",
      "englishSentence": "The phone will ring soon.",
      "hindiSentence": "फोन जल्दी बजेगा।",
      "memoryTip": "Wedding ring"
    },
    {
      "id": "hp-370",
      "sno": 370,
      "word": "Wring",
      "partOfSpeech": "Verb",
      "posCategory": "verb",
      "englishMeaning": "To squeeze and twist something to extract liquid",
      "hindiMeaning": "निचोड़ना / ऐंठना",
      "englishSentence": "Wring the cloth before drying.",
      "hindiSentence": "कपड़ा सुखाने से पहले निचोड़ लो।",
      "memoryTip": "Wring out wet towel"
    }
  ]
},
  {
  "id": "hp-sense-cents",
  "groupTitle": "Sense vs Cents",
  "phonetic": "/sɛns/",
  "soundKey": "sɛns",
  "letter": "S",
  "examFrequency": "High",
  "confusableTip": "Sense = इंद्रिय / समझ या विवेक; Cents = अमेरिकी सिक्के/पैसे",
  "words": [
    {
      "id": "hp-375",
      "sno": 375,
      "word": "Sense",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "Faculty of perception / sound practical judgement",
      "hindiMeaning": "समझ / बुद्धि / इंद्रिय",
      "englishSentence": "He has a strong sense of justice.",
      "hindiSentence": "उसमें न्याय की गहरी समझ है।",
      "memoryTip": "Common sense"
    },
    {
      "id": "hp-376",
      "sno": 376,
      "word": "Cents",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "Monetary units equal to one hundredth of a dollar",
      "hindiMeaning": "सेंट (पैसे / सिक्के)",
      "englishSentence": "It costs fifty cents.",
      "hindiSentence": "इसकी कीमत पचास सेंट है।",
      "memoryTip": "50 cents"
    }
  ]
},
  {
  "id": "hp-shore-sure",
  "groupTitle": "Shore vs Sure",
  "phonetic": "/ʃɔːr/ - /ʃʊər/",
  "soundKey": "ʃɔːr",
  "letter": "S",
  "examFrequency": "High",
  "confusableTip": "Shore = समुद्र या नदी का तट; Sure = पक्का / निश्चित",
  "words": [
    {
      "id": "hp-377",
      "sno": 377,
      "word": "Shore",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "The land along the edge of a sea, lake, or large body of water",
      "hindiMeaning": "तट / किनारा",
      "englishSentence": "They walked along the shore.",
      "hindiSentence": "वे तट के किनारे चले।",
      "memoryTip": "Sea shore"
    },
    {
      "id": "hp-378",
      "sno": 378,
      "word": "Sure",
      "partOfSpeech": "Adjective",
      "posCategory": "adj",
      "englishMeaning": "Confident in what one thinks or knows; certain",
      "hindiMeaning": "निश्चित / आश्वस्त",
      "englishSentence": "Are you sure about your answer?",
      "hindiSentence": "क्या तुम्हें अपने उत्तर पर यकीन है?",
      "memoryTip": "Are you sure?"
    }
  ]
},
  {
  "id": "hp-slay-sleigh",
  "groupTitle": "Slay vs Sleigh",
  "phonetic": "/sleɪ/",
  "soundKey": "sleɪ",
  "letter": "S",
  "examFrequency": "Very High",
  "confusableTip": "Slay = वध करना / मार डालना; Sleigh = बर्फ पर चलने वाली बिना पहिए की गाड़ी",
  "words": [
    {
      "id": "hp-379",
      "sno": 379,
      "word": "Slay",
      "partOfSpeech": "Verb",
      "posCategory": "verb",
      "englishMeaning": "To kill in a violent way",
      "hindiMeaning": "वध करना / मार डालना",
      "englishSentence": "The knight slayed the dragon.",
      "hindiSentence": "योद्धा ने ड्रैगन का वध किया।",
      "memoryTip": "Slay the monster"
    },
    {
      "id": "hp-380",
      "sno": 380,
      "word": "Sleigh",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A sledge driven by horses or reindeer on snow and ice",
      "hindiMeaning": "बर्फ पर चलने वाली गाड़ी (स्लेज)",
      "englishSentence": "Santa rides a sleigh.",
      "hindiSentence": "सांता बर्फ की गाड़ी में चलते हैं।",
      "memoryTip": "Jingle bells sleigh"
    }
  ]
},
  {
  "id": "hp-son-sun",
  "groupTitle": "Son vs Sun",
  "phonetic": "/sʌn/",
  "soundKey": "sʌn",
  "letter": "S",
  "examFrequency": "Frequent",
  "confusableTip": "Son = बेटा / पुत्र; Sun = सूरज / सूर्य",
  "words": [
    {
      "id": "hp-381",
      "sno": 381,
      "word": "Son",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A boy or man in relation to his parents",
      "hindiMeaning": "बेटा / पुत्र",
      "englishSentence": "He has one son.",
      "hindiSentence": "उसका एक बेटा है।",
      "memoryTip": "Father and Son"
    },
    {
      "id": "hp-382",
      "sno": 382,
      "word": "Sun",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "The star around which the earth orbits",
      "hindiMeaning": "सूरज / सूर्य",
      "englishSentence": "The sun is shining bright.",
      "hindiSentence": "सूरज तेज चमक रहा है।",
      "memoryTip": "Sunlight"
    }
  ]
},
  {
  "id": "hp-stake-steak",
  "groupTitle": "Stake vs Steak",
  "phonetic": "/steɪk/",
  "soundKey": "steɪk",
  "letter": "S",
  "examFrequency": "Very High",
  "confusableTip": "Stake = दांव / खूँटा; Steak = भुना हुआ मांस का टुकड़ा",
  "words": [
    {
      "id": "hp-383",
      "sno": 383,
      "word": "Stake",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A strong wooden or metal post / a share or financial interest in business",
      "hindiMeaning": "दांव / खूँटा / हिस्सेदारी",
      "englishSentence": "He has a big stake in the company.",
      "hindiSentence": "कंपनी में उसका बड़ा दांव है।",
      "memoryTip": "At stake (दांव पर)"
    },
    {
      "id": "hp-384",
      "sno": 384,
      "word": "Steak",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "High-quality beef, or other meat, cut into thick slices",
      "hindiMeaning": "मांस का टुकड़ा (स्टेक)",
      "englishSentence": "He ordered a beef steak.",
      "hindiSentence": "उसने बीफ स्टेक ऑर्डर किया।",
      "memoryTip": "Steakhouse restaurant"
    }
  ]
},
  {
  "id": "hp-than-then",
  "groupTitle": "Than vs Then",
  "phonetic": "/ðæn/ - /ðɛn/",
  "soundKey": "ðæn",
  "letter": "T",
  "examFrequency": "Very High",
  "confusableTip": "Than (A) = तुलना के लिए (se); Then (E) = तब / फिर / उसके बाद (समय)",
  "words": [
    {
      "id": "hp-387",
      "sno": 387,
      "word": "Than",
      "partOfSpeech": "Conjunction",
      "posCategory": "other",
      "englishMeaning": "Introducing the second element in a comparison",
      "hindiMeaning": "की तुलना में / से",
      "englishSentence": "She is taller than me.",
      "hindiSentence": "वह मुझसे लंबी है।",
      "memoryTip": "Bigger thAn, smaller thAn"
    },
    {
      "id": "hp-388",
      "sno": 388,
      "word": "Then",
      "partOfSpeech": "Adverb",
      "posCategory": "adv",
      "englishMeaning": "At that time / after that; next",
      "hindiMeaning": "तब / फिर / उसके बाद",
      "englishSentence": "First we eat, then we go.",
      "hindiSentence": "पहले हम खाएंगे, फिर चलेंगे।",
      "memoryTip": "Then = timE"
    }
  ]
},
  {
  "id": "hp-yolk-yoke",
  "groupTitle": "Yolk vs Yoke",
  "phonetic": "/joʊk/",
  "soundKey": "joʊk",
  "letter": "Y",
  "examFrequency": "Very High",
  "confusableTip": "Yolk = अंडे की पीली ज़र्दी; Yoke = बैलों के कंधे पर रखा जाने वाला जुआ / बंधन",
  "words": [
    {
      "id": "hp-389",
      "sno": 389,
      "word": "Yolk",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "The yellow internal part of a bird’s egg",
      "hindiMeaning": "अंडे की ज़र्दी (पीला भाग)",
      "englishSentence": "The yolk is rich in protein.",
      "hindiSentence": "अंडे की ज़र्दी में प्रोटीन भरपूर होता है।",
      "memoryTip": "Egg yolk"
    },
    {
      "id": "hp-390",
      "sno": 390,
      "word": "Yoke",
      "partOfSpeech": "Noun / Verb",
      "posCategory": "noun",
      "englishMeaning": "A wooden crosspiece fastened over the necks of two animals to pull a plow",
      "hindiMeaning": "जुआ (बैलों का) / बंधन / जोड़ना",
      "englishSentence": "The farmer put a yoke on the oxen.",
      "hindiSentence": "किसान ने बैलों पर जुआ रखा।",
      "memoryTip": "Yoke of slavery / Oxen yoke"
    }
  ]
},
  {
  "id": "hp-aisle-isle",
  "groupTitle": "Aisle vs Isle",
  "phonetic": "/aɪl/",
  "soundKey": "aɪl",
  "letter": "A",
  "examFrequency": "Very High",
  "confusableTip": "Aisle = सीटों के बीच का चलने का रास्ता (गलियारा); Isle = छोटा द्वीप/टापू",
  "words": [
    {
      "id": "hp-391",
      "sno": 391,
      "word": "Aisle",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A passage between rows of seats in a plane, church, or supermarket",
      "hindiMeaning": "गलियारा / दो कतारों के बीच का रास्ता",
      "englishSentence": "She walked down the aisle slowly.",
      "hindiSentence": "वह धीरे-धीरे गलियारे में चली।",
      "memoryTip": "Aisle seat on aircraft"
    },
    {
      "id": "hp-392",
      "sno": 392,
      "word": "Isle",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "An island or peninsula, especially a small one",
      "hindiMeaning": "टापू / छोटा द्वीप",
      "englishSentence": "They spent the vacation on a remote isle.",
      "hindiSentence": "उन्होंने छुट्टियाँ एक दूर टापू पर बिताईं।",
      "memoryTip": "British Isles / Isle of Wight"
    }
  ]
},
  {
  "id": "hp-all-awl",
  "groupTitle": "All vs Awl",
  "phonetic": "/ɔːl/",
  "soundKey": "ɔːl",
  "letter": "A",
  "examFrequency": "High",
  "confusableTip": "All = सभी / संपूर्ण; Awl = मोची का चमड़े में छेद करने वाला नुकीला औजार",
  "words": [
    {
      "id": "hp-393",
      "sno": 393,
      "word": "All",
      "partOfSpeech": "Determiner",
      "posCategory": "other",
      "englishMeaning": "Used to refer to the whole quantity or extent of a group",
      "hindiMeaning": "सभी / सब",
      "englishSentence": "All students must attend.",
      "hindiSentence": "सभी छात्रों को उपस्थित होना चाहिए।",
      "memoryTip": "All of us"
    },
    {
      "id": "hp-394",
      "sno": 394,
      "word": "Awl",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A small pointed tool used for piercing holes, especially in leather",
      "hindiMeaning": "छेद करने का औज़ार / सुआ (मोची का)",
      "englishSentence": "The cobbler used an awl.",
      "hindiSentence": "मोची ने छेद करने का औज़ार इस्तेमाल किया।",
      "memoryTip": "Cobbler pierces leather with an awl"
    }
  ]
},
  {
  "id": "hp-ascent-assent",
  "groupTitle": "Ascent vs Assent",
  "phonetic": "/əˈsɛnt/",
  "soundKey": "əsɛnt",
  "letter": "A",
  "examFrequency": "Very High",
  "confusableTip": "Ascent (SC) = ऊपर चढ़ाई (Ascend); Assent (SS) = सहमति / स्वीकृति (Consent)",
  "words": [
    {
      "id": "hp-395",
      "sno": 395,
      "word": "Ascent",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A climb or walk to the summit of a mountain; upward movement",
      "hindiMeaning": "चढ़ाई / आरोहण",
      "englishSentence": "The plane began its ascent.",
      "hindiSentence": "विमान ने अपनी चढ़ाई शुरू की।",
      "memoryTip": "Ascent has SC like aSCend (going up)"
    },
    {
      "id": "hp-396",
      "sno": 396,
      "word": "Assent",
      "partOfSpeech": "Noun / Verb",
      "posCategory": "noun",
      "englishMeaning": "The expression of approval or agreement",
      "hindiMeaning": "सहमति / मंजूरी देना",
      "englishSentence": "He gave his assent to the proposal.",
      "hindiSentence": "उसने प्रस्ताव को अपनी सहमति दी।",
      "memoryTip": "Presidential assent to bill"
    }
  ]
},
  {
  "id": "hp-byte-bite",
  "groupTitle": "Byte vs Bite",
  "phonetic": "/baɪt/",
  "soundKey": "baɪt",
  "letter": "B",
  "examFrequency": "Frequent",
  "confusableTip": "Byte = 8 बिट्स की कंप्यूटर मेमोरी इकाई; Bite = दांतों से काटना या निवाला",
  "words": [
    {
      "id": "hp-397",
      "sno": 397,
      "word": "Byte",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "A unit of memory in computer storage, usually 8 bits",
      "hindiMeaning": "बाइट (कंप्यूटर डेटा इकाई)",
      "englishSentence": "The file is 4 megabytes large.",
      "hindiSentence": "फाइल 4 मेगाबाइट की है।",
      "memoryTip": "Kilobyte, Gigabyte"
    },
    {
      "id": "hp-398",
      "sno": 398,
      "word": "Bite",
      "partOfSpeech": "Verb / Noun",
      "posCategory": "verb",
      "englishMeaning": "Use teeth to cut into something / a mouthful",
      "hindiMeaning": "दांत से काटना / निवाला",
      "englishSentence": "The dog gave me a bite.",
      "hindiSentence": "कुत्ते ने मुझे काट लिया।",
      "memoryTip": "Bite an apple"
    }
  ]
},
  {
  "id": "hp-ceiling-sealing",
  "groupTitle": "Ceiling vs Sealing",
  "phonetic": "/ˈsiːlɪŋ/",
  "soundKey": "siːlɪŋ",
  "letter": "C",
  "examFrequency": "Very High",
  "confusableTip": "Ceiling = कमरे की भीतरी छत; Sealing = डिब्बा या लिफाफा चिपका कर सील करना",
  "words": [
    {
      "id": "hp-399",
      "sno": 399,
      "word": "Ceiling",
      "partOfSpeech": "Noun",
      "posCategory": "noun",
      "englishMeaning": "The upper interior surface of a room",
      "hindiMeaning": "कमरे की भीतरी छत",
      "englishSentence": "The ceiling was leaking.",
      "hindiSentence": "छत से पानी टपक रहा था।",
      "memoryTip": "Ceiling fan"
    },
    {
      "id": "hp-400",
      "sno": 400,
      "word": "Sealing",
      "partOfSpeech": "Verb",
      "posCategory": "verb",
      "englishMeaning": "Fastening or closing securely with a seal",
      "hindiMeaning": "सील करना / बंद करना",
      "englishSentence": "He is sealing the box.",
      "hindiSentence": "वह डिब्बा सील कर रहा है।",
      "memoryTip": "Sealing the envelope"
    }
  ]
}
];

// ---------------------------------------------------------------------------
// REAL SSC/EXAM PRACTICE QUIZ QUESTIONS (Fill-in-the-Blank)
// ---------------------------------------------------------------------------
export const HOMOPHONE_QUIZ_QUESTIONS: HomophoneQuizQuestion[] = [
  {
    "id": "hq-1",
    "sentenceWithBlank": "Smoking is strictly ______ inside the auditorium.",
    "blankTranslation": "सभागार के अंदर धूम्रपान पूरी तरह से प्रतिबंधित है।",
    "correctWord": "banned",
    "options": [
      "band",
      "banned"
    ],
    "explanation": "\"Banned\" means prohibited by law or rule, whereas \"band\" is a group of musicians.",
    "groupTitle": "Band vs Banned"
  },
  {
    "id": "hq-2",
    "sentenceWithBlank": "She was declared the sole ______ to her grandfather's massive estate.",
    "blankTranslation": "उसे अपने दादाजी की विशाल संपत्ति की एकमात्र उत्तराधिकारी घोषित किया गया।",
    "correctWord": "heir",
    "options": [
      "air",
      "heir"
    ],
    "explanation": "\"Heir\" (pronounced /eər/) is a person who inherits property. \"Air\" is the gaseous atmosphere.",
    "groupTitle": "Air vs Heir"
  },
  {
    "id": "hq-3",
    "sentenceWithBlank": "The doctor advised him to cut down on ______ sugar consumption.",
    "blankTranslation": "डॉक्टर ने उसे अत्यधिक चीनी के सेवन में कटौती करने की सलाह दी।",
    "correctWord": "excess",
    "options": [
      "access",
      "excess",
      "axis"
    ],
    "explanation": "\"Excess\" means more than necessary or allowed. \"Access\" means permission or entry to something.",
    "groupTitle": "Axis vs Access vs Excess"
  },
  {
    "id": "hq-4",
    "sentenceWithBlank": "The court granted him temporary release on ______ of Rs 50,000.",
    "blankTranslation": "अदालत ने उसे 50,000 रुपये की ज़मानत पर अस्थायी रिहा किया।",
    "correctWord": "bail",
    "options": [
      "bail",
      "bale"
    ],
    "explanation": "\"Bail\" is legal security money for temporary release, while \"bale\" is a large bundle of hay/cotton.",
    "groupTitle": "Bail vs Bale"
  },
  {
    "id": "hq-5",
    "sentenceWithBlank": "He could not ______ the severe cold without proper winter clothing.",
    "blankTranslation": "वह उचित सर्दियों के कपड़ों के बिना भीषण ठंड को बर्दाश्त नहीं कर सका।",
    "correctWord": "bear",
    "options": [
      "bare",
      "bear"
    ],
    "explanation": "\"Bear\" as a verb means to tolerate or endure. \"Bare\" means uncovered or naked.",
    "groupTitle": "Bare vs Bear"
  },
  {
    "id": "hq-6",
    "sentenceWithBlank": "The sauce serves as a wonderful ______ to the roast chicken.",
    "blankTranslation": "यह चटनी भुने हुए चिकन के लिए एक शानदार पूरक का काम करती है।",
    "correctWord": "complement",
    "options": [
      "complement",
      "compliment"
    ],
    "explanation": "\"Complement\" (with E) means something that completes. \"Compliment\" (with I) is praise.",
    "groupTitle": "Complement vs Compliment"
  },
  {
    "id": "hq-7",
    "sentenceWithBlank": "Please be ______ when discussing confidential office matters in public.",
    "blankTranslation": "सार्वजनिक रूप से गोपनीय कार्यालय मामलों पर चर्चा करते समय सतर्क रहें।",
    "correctWord": "discreet",
    "options": [
      "discreet",
      "discrete"
    ],
    "explanation": "\"Discreet\" means careful, prudent and keeping secrets. \"Discrete\" means separate or distinct.",
    "groupTitle": "Discreet vs Discrete"
  },
  {
    "id": "hq-8",
    "sentenceWithBlank": "The police raided the warehouse and seized a huge ______ of smuggled weapons.",
    "blankTranslation": "पुलिस ने गोदाम पर छापा मारा और तस्करी के हथियारों का एक बड़ा गुप्त भंडार जब्त किया।",
    "correctWord": "cache",
    "options": [
      "cache",
      "cash"
    ],
    "explanation": "\"Cache\" is a hidden storage space for weapons/provisions. \"Cash\" refers to physical money.",
    "groupTitle": "Cache vs Cash"
  },
  {
    "id": "hq-9",
    "sentenceWithBlank": "Volunteers went door to door to ______ support for the clean energy bill.",
    "blankTranslation": "स्वयंसेवकों ने स्वच्छ ऊर्जा विधेयक के लिए समर्थन जुटाने हेतु घर-घर जाकर जनमत मांगा।",
    "correctWord": "canvass",
    "options": [
      "canvas",
      "canvass"
    ],
    "explanation": "\"Canvass\" (with double S) means to solicit support or votes. \"Canvas\" is heavy fabric.",
    "groupTitle": "Canvas vs Canvass"
  },
  {
    "id": "hq-10",
    "sentenceWithBlank": "The car crashed into a ______ vehicle parked beside the highway.",
    "blankTranslation": "कार राजमार्ग के किनारे खड़े एक स्थिर (खड़े) वाहन से टकरा गई।",
    "correctWord": "stationary",
    "options": [
      "stationary",
      "stationery"
    ],
    "explanation": "\"Stationary\" (with A) means motionless or at rest. \"Stationery\" (with E) means writing paper/pens.",
    "groupTitle": "Stationary vs Stationery"
  },
  {
    "id": "hq-11",
    "sentenceWithBlank": "He refused to compromise on his moral ______ even under intense political pressure.",
    "blankTranslation": "उसने तीव्र राजनीतिक दबाव में भी अपने नैतिक सिद्धांतों से समझौता करने से इनकार कर दिया।",
    "correctWord": "principles",
    "options": [
      "principals",
      "principles"
    ],
    "explanation": "\"Principles\" means moral rules or fundamental truths. \"Principal\" is the head of a school or capital.",
    "groupTitle": "Principal vs Principle"
  },
  {
    "id": "hq-12",
    "sentenceWithBlank": "The defense attorney tried hard to ______ the key facts from the reluctant witness.",
    "blankTranslation": "बचाव पक्ष के वकील ने अनिच्छुक गवाह से मुख्य तथ्य निकलवाने की बहुत कोशिश की।",
    "correctWord": "elicit",
    "options": [
      "elicit",
      "illicit"
    ],
    "explanation": "\"Elicit\" means to draw out or evoke information. \"Illicit\" means unlawful or prohibited.",
    "groupTitle": "Elicit vs Illicit"
  },
  {
    "id": "hq-13",
    "sentenceWithBlank": "The harsh winter cold began to ______ the health of the elderly residents.",
    "blankTranslation": "कड़ाके की ठंड ने बुजुर्ग निवासियों के स्वास्थ्य पर प्रतिकूल प्रभाव डालना शुरू कर दिया।",
    "correctWord": "affect",
    "options": [
      "affect",
      "effect"
    ],
    "explanation": "\"Affect\" is a verb meaning to influence or produce a change. \"Effect\" is usually a noun meaning the result.",
    "groupTitle": "Affect vs Effect"
  },
  {
    "id": "hq-14",
    "sentenceWithBlank": "Everyone cleared the qualifying examination ______ Rohit.",
    "blankTranslation": "रोहित को छोड़कर बाकी सभी ने प्रारंभिक परीक्षा पास कर ली।",
    "correctWord": "except",
    "options": [
      "accept",
      "except"
    ],
    "explanation": "\"Except\" means apart from or not including. \"Accept\" means to receive or agree to.",
    "groupTitle": "Accept vs Except"
  },
  {
    "id": "hq-15",
    "sentenceWithBlank": "Make sure you tighten your belt so your trousers don't slip down your ______.",
    "blankTranslation": "अपनी बेल्ट कस लें ताकि आपकी पतलून कमर से नीचे न खिसके।",
    "correctWord": "waist",
    "options": [
      "waist",
      "waste"
    ],
    "explanation": "\"Waist\" is the human body part between the ribs and hips. \"Waste\" means rubbish or careless loss.",
    "groupTitle": "Waist vs Waste"
  },
  {
    "id": "hq-16",
    "sentenceWithBlank": "After a delicious four-course dinner, we were served chocolate lava cake for ______.",
    "blankTranslation": "स्वादिष्ट रात्रिभोज के बाद, हमें मिठाई में चॉकलेट लावा केक परोसा गया।",
    "correctWord": "dessert",
    "options": [
      "desert",
      "dessert"
    ],
    "explanation": "\"Dessert\" (with double S for Sweet Stuff) is a sweet dish eaten after a meal. \"Desert\" is dry sandy land.",
    "groupTitle": "Desert vs Dessert"
  },
  {
    "id": "hq-17",
    "sentenceWithBlank": "The airplane gradually began its steep ______ toward the cloud line.",
    "blankTranslation": "विमान ने बादलों की रेखा की ओर अपनी तीव्र चढ़ाई शुरू की।",
    "correctWord": "ascent",
    "options": [
      "ascent",
      "assent"
    ],
    "explanation": "\"Ascent\" (with SC) refers to an upward movement or climb. \"Assent\" means official approval/agreement.",
    "groupTitle": "Ascent vs Assent"
  },
  {
    "id": "hq-18",
    "sentenceWithBlank": "Due to severe torrential rains, rainwater started leaking through the old ______.",
    "blankTranslation": "मूसलाधार बारिश के कारण पुरानी छत से पानी टपकने लगा।",
    "correctWord": "ceiling",
    "options": [
      "ceiling",
      "sealing"
    ],
    "explanation": "\"Ceiling\" is the overhead upper surface of a room. \"Sealing\" is the action of closing something tightly.",
    "groupTitle": "Ceiling vs Sealing"
  }
];
