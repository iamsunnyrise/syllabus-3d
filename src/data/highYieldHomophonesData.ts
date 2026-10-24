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
    id: 'hp-lade-laid',
    groupTitle: 'Lade vs Laid',
    phonetic: '/leɪd/',
    soundKey: 'leɪd',
    letter: 'L',
    examFrequency: 'High',
    confusableTip: 'Lade = माल या बोझ लादना (जहाज पर); Laid = रखा / लिटाया (Lay का Past)',
    words: [
      {
        id: 'hp-lade',
        sno: 186,
        word: 'Lade',
        partOfSpeech: 'Verb',
        posCategory: 'verb',
        englishMeaning: 'To load cargo, goods, or burden onto a ship or cart',
        hindiMeaning: 'लादना / माल चढ़ाना',
        englishSentence: 'They laded the cart with goods.',
        hindiSentence: 'उन्होंने गाड़ी पर सामान लादा।',
        memoryTip: 'Bill of Lading (जहाज का माल पत्र)'
      },
      {
        id: 'hp-laid',
        sno: 187,
        word: 'Laid',
        partOfSpeech: 'Verb',
        posCategory: 'verb',
        englishMeaning: 'Past tense of "lay" (put down gently)',
        hindiMeaning: 'रखा / लिटाया',
        englishSentence: 'She laid the book on the table.',
        hindiSentence: 'उसने किताब मेज़ पर रखी।',
        memoryTip: 'Lay → Laid'
      }
    ]
  },

  // ─── P ───
  {
    id: 'hp-principal-principle',
    groupTitle: 'Principal vs Principle',
    phonetic: '/ˈprɪnsəpəl/',
    soundKey: 'prɪnsəpəl',
    letter: 'P',
    examFrequency: 'Very High',
    confusableTip: 'PrincipAL (Pal) = प्रधानाचार्य / मूलधन; PrincipLE (Rule) = सिद्धांत / नियम',
    words: [
      {
        id: 'hp-principal',
        sno: 188,
        word: 'Principal',
        partOfSpeech: 'Noun / Adjective',
        posCategory: 'noun',
        englishMeaning: 'Head of a school / main amount of money / chief',
        hindiMeaning: 'प्रधानाचार्य / मुख्य / मूलधन',
        englishSentence: 'The school principal gave a speech.',
        hindiSentence: 'स्कूल के प्रधानाचार्य ने भाषण दिया।',
        memoryTip: 'The principAL is your PAL (school head)'
      },
      {
        id: 'hp-principle',
        sno: 189,
        word: 'Principle',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A fundamental truth, moral rule, or scientific law',
        hindiMeaning: 'सिद्धांत / नैतिक नियम',
        englishSentence: 'He is a man of high principles.',
        hindiSentence: 'वह उच्च सिद्धांतों वाले व्यक्ति हैं।',
        memoryTip: 'PrincipLE ends in LE like ruLE'
      }
    ]
  },
  {
    id: 'hp-peace-piece',
    groupTitle: 'Peace vs Piece',
    phonetic: '/piːs/',
    soundKey: 'piːs',
    letter: 'P',
    examFrequency: 'Frequent',
    confusableTip: 'Peace = शांति / अमन; Piece = टुकड़ा / हिस्सा',
    words: [
      {
        id: 'hp-peace',
        sno: 190,
        word: 'Peace',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'Freedom from disturbance / tranquility',
        hindiMeaning: 'शांति / अमन',
        englishSentence: 'We all desire world peace.',
        hindiSentence: 'हम सब विश्व शांति चाहते हैं।',
        memoryTip: 'Peace treaty'
      },
      {
        id: 'hp-piece',
        sno: 191,
        word: 'Piece',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A portion of an object / single item',
        hindiMeaning: 'टुकड़ा / भाग',
        englishSentence: 'Can I have a piece of cake?',
        hindiSentence: 'क्या मुझे केक का एक टुकड़ा मिल सकता है?',
        memoryTip: 'A piece of PIE (both have "pie")'
      }
    ]
  },

  // ─── S ───
  {
    id: 'hp-stationary-stationery',
    groupTitle: 'Stationary vs Stationery',
    phonetic: '/ˈsteɪʃənɛri/',
    soundKey: 'steɪʃənɛri',
    letter: 'S',
    examFrequency: 'Very High',
    confusableTip: 'StationAry (A) = स्थिर (At rest); StationEry (E) = कलम/कॉपी (Envelope, pEn)',
    words: [
      {
        id: 'hp-stationary',
        sno: 192,
        word: 'Stationary',
        partOfSpeech: 'Adjective',
        posCategory: 'adj',
        englishMeaning: 'Not moving, staying in one place',
        hindiMeaning: 'स्थिर / अचल / गतिहीन',
        englishSentence: 'The car hit a stationary truck.',
        hindiSentence: 'कार ने एक खड़े (स्थिर) ट्रक को टक्कर मार दी।',
        memoryTip: 'StationAry has "A" for "At rest"'
      },
      {
        id: 'hp-stationery',
        sno: 193,
        word: 'Stationery',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'Writing materials such as pens, paper, and envelopes',
        hindiMeaning: 'लेखन सामग्री (कलम, कागज, पेंसिल)',
        englishSentence: 'I bought pens and notebooks from the stationery shop.',
        hindiSentence: 'मैंने स्टेशनरी की दुकान से पेन और नोटबुक खरीदे।',
        memoryTip: 'StationEry has "E" for "Envelope" and "pEn"'
      }
    ]
  },
  {
    id: 'hp-steal-steel',
    groupTitle: 'Steal vs Steel',
    phonetic: '/stiːl/',
    soundKey: 'stiːl',
    letter: 'S',
    examFrequency: 'Frequent',
    confusableTip: 'Steal = चोरी करना; Steel = इस्पात / फौलाद (धातु)',
    words: [
      {
        id: 'hp-steal',
        sno: 194,
        word: 'Steal',
        partOfSpeech: 'Verb',
        posCategory: 'verb',
        englishMeaning: 'To take someone\'s property without permission',
        hindiMeaning: 'चोरी करना / चुराना',
        englishSentence: 'Thou shalt not steal.',
        hindiSentence: 'तुम्हें चोरी नहीं करनी चाहिए।',
        memoryTip: 'Thief steals'
      },
      {
        id: 'hp-steel',
        sno: 195,
        word: 'Steel',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'A hard, strong alloy of iron and carbon',
        hindiMeaning: 'इस्पात / स्टील / फौलाद',
        englishSentence: 'The bridge is built of strong steel.',
        hindiSentence: 'पुल मज़बूत इस्पात से बना है।',
        memoryTip: 'Stainless steel'
      }
    ]
  },

  // ─── W ───
  {
    id: 'hp-weather-whether',
    groupTitle: 'Weather vs Whether',
    phonetic: '/ˈwɛðər/',
    soundKey: 'wɛðər',
    letter: 'W',
    examFrequency: 'Very High',
    confusableTip: 'Weather = मौसम (धूप/बारिश); Whether = यदि / या (संशय दर्शाने वाला संयोजक)',
    words: [
      {
        id: 'hp-weather',
        sno: 196,
        word: 'Weather',
        partOfSpeech: 'Noun',
        posCategory: 'noun',
        englishMeaning: 'Atmospheric conditions (rain, sun, wind)',
        hindiMeaning: 'मौसम / जलवायु',
        englishSentence: 'The weather is pleasant today.',
        hindiSentence: 'आज मौसम सुहावना है।',
        memoryTip: 'Sunny weather'
      },
      {
        id: 'hp-whether',
        sno: 197,
        word: 'Whether',
        partOfSpeech: 'Conjunction',
        posCategory: 'other',
        englishMeaning: 'Expressing a doubt or choice between alternatives',
        hindiMeaning: 'कि क्या / यदि / चाहे',
        englishSentence: 'I don’t know whether she will come.',
        hindiSentence: 'मुझे नहीं पता कि वह आएगी या नहीं।',
        memoryTip: 'Whether ... or not'
      }
    ]
  }
];

// ---------------------------------------------------------------------------
// REAL SSC/EXAM PRACTICE QUIZ QUESTIONS (Fill-in-the-Blank)
// ---------------------------------------------------------------------------
export const HOMOPHONE_QUIZ_QUESTIONS: HomophoneQuizQuestion[] = [
  {
    id: 'hq-1',
    sentenceWithBlank: 'Smoking is strictly ______ inside the auditorium.',
    blankTranslation: 'सभागार के अंदर धूम्रपान पूरी तरह से प्रतिबंधित है।',
    correctWord: 'banned',
    options: ['band', 'banned'],
    explanation: '"Banned" means prohibited by law or rule, whereas "band" is a group of musicians.',
    groupTitle: 'Band vs Banned'
  },
  {
    id: 'hq-2',
    sentenceWithBlank: 'She was declared the sole ______ to her grandfather\'s massive estate.',
    blankTranslation: 'उसे अपने दादाजी की विशाल संपत्ति की एकमात्र उत्तराधिकारी घोषित किया गया।',
    correctWord: 'heir',
    options: ['air', 'heir'],
    explanation: '"Heir" (pronounced /eər/) is a person who inherits property. "Air" is the gaseous atmosphere.',
    groupTitle: 'Air vs Heir'
  },
  {
    id: 'hq-3',
    sentenceWithBlank: 'The doctor advised him to cut down on ______ sugar consumption.',
    blankTranslation: 'डॉक्टर ने उसे अत्यधिक चीनी के सेवन में कटौती करने की सलाह दी।',
    correctWord: 'excess',
    options: ['access', 'excess', 'axis'],
    explanation: '"Excess" means more than necessary or allowed. "Access" means permission or entry to something.',
    groupTitle: 'Axis vs Access vs Excess'
  },
  {
    id: 'hq-4',
    sentenceWithBlank: 'The court granted him temporary release on ______ of Rs 50,000.',
    blankTranslation: 'अदालत ने उसे 50,000 रुपये की ज़मानत पर अस्थायी रिहा किया।',
    correctWord: 'bail',
    options: ['bail', 'bale'],
    explanation: '"Bail" is legal security money for temporary release, while "bale" is a large bundle of hay/cotton.',
    groupTitle: 'Bail vs Bale'
  },
  {
    id: 'hq-5',
    sentenceWithBlank: 'He could not ______ the severe cold without proper winter clothing.',
    blankTranslation: 'वह उचित सर्दियों के कपड़ों के बिना भीषण ठंड को बर्दाश्त नहीं कर सका।',
    correctWord: 'bear',
    options: ['bare', 'bear'],
    explanation: '"Bear" as a verb means to tolerate or endure. "Bare" means uncovered or naked.',
    groupTitle: 'Bare vs Bear'
  },
  {
    id: 'hq-6',
    sentenceWithBlank: 'The sauce serves as a wonderful ______ to the roast chicken.',
    blankTranslation: 'यह चटनी भुने हुए चिकन के लिए एक शानदार पूरक का काम करती है।',
    correctWord: 'complement',
    options: ['complement', 'compliment'],
    explanation: '"Complement" (with E) means something that completes. "Compliment" (with I) is praise.',
    groupTitle: 'Complement vs Compliment'
  },
  {
    id: 'hq-7',
    sentenceWithBlank: 'Please be ______ when discussing confidential office matters in public.',
    blankTranslation: 'सार्वजनिक रूप से गोपनीय कार्यालय मामलों पर चर्चा करते समय सतर्क रहें।',
    correctWord: 'discreet',
    options: ['discreet', 'discrete'],
    explanation: '"Discreet" means careful, prudent and keeping secrets. "Discrete" means separate or distinct.',
    groupTitle: 'Discreet vs Discrete'
  },
  {
    id: 'hq-8',
    sentenceWithBlank: 'The police raided the warehouse and seized a huge ______ of smuggled weapons.',
    blankTranslation: 'पुलिस ने गोदाम पर छापा मारा और तस्करी के हथियारों का एक बड़ा गुप्त भंडार जब्त किया।',
    correctWord: 'cache',
    options: ['cache', 'cash'],
    explanation: '"Cache" is a hidden storage space for weapons/provisions. "Cash" refers to physical money.',
    groupTitle: 'Cache vs Cash'
  },
  {
    id: 'hq-9',
    sentenceWithBlank: 'Volunteers went door to door to ______ support for the clean energy bill.',
    blankTranslation: 'स्वयंसेवकों ने स्वच्छ ऊर्जा विधेयक के लिए समर्थन जुटाने हेतु घर-घर जाकर जनमत मांगा।',
    correctWord: 'canvass',
    options: ['canvas', 'canvass'],
    explanation: '"Canvass" (with double S) means to solicit support or votes. "Canvas" is heavy fabric.',
    groupTitle: 'Canvas vs Canvass'
  },
  {
    id: 'hq-10',
    sentenceWithBlank: 'The car crashed into a ______ vehicle parked beside the highway.',
    blankTranslation: 'कार राजमार्ग के किनारे खड़े एक स्थिर (खड़े) वाहन से टकरा गई।',
    correctWord: 'stationary',
    options: ['stationary', 'stationery'],
    explanation: '"Stationary" (with A) means motionless or at rest. "Stationery" (with E) means writing paper/pens.',
    groupTitle: 'Stationary vs Stationery'
  },
  {
    id: 'hq-11',
    sentenceWithBlank: 'He refused to compromise on his moral ______ even under intense political pressure.',
    blankTranslation: 'उसने तीव्र राजनीतिक दबाव में भी अपने नैतिक सिद्धांतों से समझौता करने से इनकार कर दिया।',
    correctWord: 'principles',
    options: ['principals', 'principles'],
    explanation: '"Principles" means moral rules or fundamental truths. "Principal" is the head of a school or capital.',
    groupTitle: 'Principal vs Principle'
  },
  {
    id: 'hq-12',
    sentenceWithBlank: 'The defense attorney tried hard to ______ the key facts from the reluctant witness.',
    blankTranslation: 'बचाव पक्ष के वकील ने अनिच्छुक गवाह से मुख्य तथ्य निकलवाने की बहुत कोशिश की।',
    correctWord: 'elicit',
    options: ['elicit', 'illicit'],
    explanation: '"Elicit" means to draw out or evoke information. "Illicit" means unlawful or prohibited.',
    groupTitle: 'Elicit vs Illicit'
  }
];
