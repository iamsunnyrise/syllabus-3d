// HIGH-YIELD ROOT WORDS - THEMATIC 3-LEVEL ARCHITECTURE
// Level 1: Human Nature, Emotions, Quality & Action Roots (Foundation / Tier-1)
// Level 2: Science, Perception, Time, Body & Physical World Roots (Intermediate / Cloze & RC)
// Level 3: Society, Power, Governance, Beliefs & Cosmos Roots (Exam Hard / Mains & Advanced Reading)

import { VocabItem } from './highYieldVocabData';

export const HIGH_YIELD_ROOT_WORDS: VocabItem[] = [
  // =========================================================================
  // LEVEL 1: HUMAN NATURE, EMOTIONS, QUALITY & ACTION ROOTS (10 ROOT WORDS)
  // =========================================================================
  {
    id: 'v-root-l1-s1-1',
    word: 'Bene- / Ben-',
    phonetic: '/bɛn/',
    hindi: 'अच्छा / शुभ / लाभकारी',
    type: 'root',
    partOfSpeech: 'Prefix / Root',
    meaning: 'Latin root meaning "Good", "Well", or "Favorable". It forms words representing acts of kindness, wellness, and advantage.',
    synonyms: ['Kindness', 'Favorable', 'Well-being', 'Advantageous'],
    antonyms: ['Mal- (Bad / Evil)', 'Malevolent', 'Malignant'],
    example: 'A benevolent leader actively works to produce beneficial outcomes for the community.',
    mnemonic: 'Bene is the direct opposite of Mal (Malnutrition / Malpractice). Think of "Benefit" and "Bonus".',
    frequency: 'Repeated',
    examTags: ['SSC CGL', 'CHSL', 'CDS', 'Level 1', 'Set 01', 'Root Words'],
    collocation: 'Root in Benediction, Benefactor, Benevolent, Benign',
    derivatives: 'Benediction, Benefactor, Beneficent, Beneficial, Beneficiary, Benevolent, Benign',
    level: 'level-1',
    set: 'set-01',
    rootFamily: {
      origin: 'Latin',
      coreMeaning: 'Good / Well (अच्छा / शुभ)',
      counterRoot: {
        root: 'Mal- / Male-',
        meaning: 'Bad / Evil / Harsh (बुरा / अशुभ)'
      },
      derivatives: [
        {
          word: 'Benediction',
          partOfSpeech: 'Noun',
          breakdown: 'Bene (Good) + Dict (Speak) + ion (Noun)',
          hindi: 'आशीर्वाद / मंगलकामना',
          meaning: 'The utterance of a blessing, especially at the end of a religious service.',
          example: 'The priest raised his hands to deliver a final benediction upon the worshippers.',
          examTag: 'SSC CGL / CHSL'
        },
        {
          word: 'Benefactor',
          partOfSpeech: 'Noun',
          breakdown: 'Bene (Good) + Fact (Doer) + or (Person)',
          hindi: 'परोपकारी / गुप्त दानदाता',
          meaning: 'A person who gives money or other help to a person or institution in need.',
          example: 'An anonymous benefactor donated five lakh rupees to rebuild the village school.',
          examTag: 'SSC CGL'
        },
        {
          word: 'Benevolent',
          partOfSpeech: 'Adjective',
          breakdown: 'Bene (Good) + Vol (Wish) + ent (Adjective)',
          hindi: 'दयालु / परोपकारी / शुभचिंतक',
          meaning: 'Well-meaning, kindly, and motivated by a desire to do good.',
          example: 'The benevolent emperor built free rest houses and water wells across the kingdom.',
          examTag: 'SSC CGL / CPO'
        },
        {
          word: 'Beneficial',
          partOfSpeech: 'Adjective',
          breakdown: 'Bene (Good) + Fic (Make) + ial (Relating to)',
          hindi: 'लाभदायक / गुणकारी',
          meaning: 'Resulting in good; having a helpful or advantageous effect.',
          example: 'Regular aerobic exercise is exceptionally beneficial for cardiovascular health.',
          examTag: 'SSC CGL / MTS'
        },
        {
          word: 'Beneficiary',
          partOfSpeech: 'Noun',
          breakdown: 'Bene (Good) + Fic + iary (Receiver)',
          hindi: 'लाभार्थी / लाभ पाने वाला',
          meaning: 'A person or group that receives benefits, profits, or inheritance from something.',
          example: 'She was named the sole beneficiary of her grandfather’s extensive estate.',
          examTag: 'SSC CHSL'
        },
        {
          word: 'Benign',
          partOfSpeech: 'Adjective',
          breakdown: 'Bene (Good) + Gen (Birth / Nature)',
          hindi: 'सौम्य / हानिरहित / कृपालु',
          meaning: 'Gentle and kindly in nature; in medicine, not harmful or cancerous.',
          example: 'The biopsy confirmed that the tumor was benign and posed no long-term threat.',
          examTag: 'SSC CGL / CDS'
        }
      ]
    }
  },
  {
    id: 'v-root-l1-s1-2',
    word: 'Mal- / Male-',
    phonetic: '/mæl/',
    hindi: 'बुरा / दुष्ट / हानिकारक',
    type: 'root',
    partOfSpeech: 'Prefix / Root',
    meaning: 'Latin root meaning "Bad", "Evil", "Ill", or "Harmful". It forms words describing malice, faults, and damage.',
    synonyms: ['Evil', 'Harmful', 'Corrupt', 'Defective', 'Ill-intentioned'],
    antonyms: ['Bene- (Good / Well)', 'Benefactor', 'Benevolent'],
    example: 'Malevolent forces attempted to disrupt the peace by spreading malicious lies.',
    mnemonic: 'Mal = Maila / Bura (Malnutrition = Bura poshan, Malpractice = Bura aacharan).',
    frequency: 'Repeated',
    examTags: ['SSC CGL', 'CHSL', 'CPO', 'Level 1', 'Set 01', 'Root Words'],
    collocation: 'Root in Malice, Malignant, Malevolent, Malediction',
    derivatives: 'Malediction, Malefactor, Malevolent, Malignant, Malice, Malpractice, Malnutrition',
    level: 'level-1',
    set: 'set-01',
    rootFamily: {
      origin: 'Latin',
      coreMeaning: 'Bad / Evil / Ill (बुरा / अशुद्ध / हानिकर)',
      counterRoot: {
        root: 'Bene- / Ben-',
        meaning: 'Good / Well (अच्छा / कल्याणकारी)'
      },
      derivatives: [
        {
          word: 'Malediction',
          partOfSpeech: 'Noun',
          breakdown: 'Male (Bad) + Dict (Speak) + ion (Noun)',
          hindi: 'शाप / अभिशाप / बददुआ',
          meaning: 'A curse uttered with the intention of bringing about evil or destruction.',
          example: 'The betrayed sorcerer hissed a horrifying malediction upon the castle.',
          examTag: 'SSC CGL'
        },
        {
          word: 'Malefactor',
          partOfSpeech: 'Noun',
          breakdown: 'Male (Bad) + Fact (Doer) + or (Person)',
          hindi: 'अपराधी / कुकर्मी / दोषी',
          meaning: 'A person who commits a crime or some other wrong action.',
          example: 'The local police apprehended the notorious malefactor after a midnight chase.',
          examTag: 'SSC CGL / CPO'
        },
        {
          word: 'Malevolent',
          partOfSpeech: 'Adjective',
          breakdown: 'Male (Bad) + Vol (Wish) + ent (Adjective)',
          hindi: 'दुर्भावनापूर्ण / ईर्ष्यालु / द्वेषी',
          meaning: 'Having or showing a wish to cause harm, unhappiness, or malice to others.',
          example: 'The villain in the epic glared at the hero with pure malevolent hatred.',
          examTag: 'SSC CGL'
        },
        {
          word: 'Malignant',
          partOfSpeech: 'Adjective',
          breakdown: 'Mal (Bad) + Gen (Nature) + ant',
          hindi: 'घातक / प्राणघातक / जानलेवा',
          meaning: 'Very virulent or infectious; cancerous and likely to cause severe harm.',
          example: 'Early chemotherapy was initiated to eradicate the malignant cells.',
          examTag: 'SSC CHSL / CGL'
        },
        {
          word: 'Malice',
          partOfSpeech: 'Noun',
          breakdown: 'Mal (Bad) + ice (Quality)',
          hindi: 'द्वेष / कपट / दुर्भावना',
          meaning: 'The desire to inflict harm, injury, or suffering on another person.',
          example: 'He bore no personal malice toward his opponent despite the intense rivalry.',
          examTag: 'SSC CGL'
        },
        {
          word: 'Malpractice',
          partOfSpeech: 'Noun',
          breakdown: 'Mal (Bad) + Practice',
          hindi: 'कदाचार / अनुचित आचरण',
          meaning: 'Improper, illegal, or negligent professional conduct or treatment.',
          example: 'The surgeon was sued for gross medical malpractice following the failed operation.',
          examTag: 'SSC CPO'
        }
      ]
    }
  },
  {
    id: 'v-root-l1-s1-3',
    word: 'Phil- / Philo-',
    phonetic: '/fɪl/',
    hindi: 'प्रेम / पसंद / अनुराग',
    type: 'root',
    partOfSpeech: 'Prefix / Root',
    meaning: 'Greek root "Philein" meaning "To love" or "Affinity for". It forms words describing love of humanity, books, wisdom, and arts.',
    synonyms: ['Love', 'Adoration', 'Affinity', 'Fondness'],
    antonyms: ['Mis- / Miso- (Hate / Aversion)', 'Phobia (Fear)'],
    example: 'A true philanthropist demonstrates an enduring love for humanity through generous deeds.',
    mnemonic: 'Phil = Pyar / Love (Philadelphia = City of brotherly love, Bibliophile = Book lover).',
    frequency: 'Repeated',
    examTags: ['SSC CGL', 'CHSL', 'CPO', 'Level 1', 'Set 01', 'Root Words'],
    collocation: 'Root in Philanthropy, Bibliophile, Philosophy',
    derivatives: 'Philanthropist, Bibliophile, Philosopher, Philology, Philharmonic, Philhellene',
    level: 'level-1',
    set: 'set-01',
    rootFamily: {
      origin: 'Greek',
      coreMeaning: 'Love / Friendship / Affinity (प्रेम / अनुराग)',
      counterRoot: {
        root: 'Mis- / Miso-',
        meaning: 'Hate / Aversion (घृणा / नफ़रत)'
      },
      derivatives: [
        {
          word: 'Philanthropist',
          partOfSpeech: 'Noun',
          breakdown: 'Phil (Love) + Anthrop (Mankind) + ist (Person)',
          hindi: 'जनहितैषी / परोपकारी',
          meaning: 'A person who seeks to promote the welfare of others, especially by donating funds.',
          example: 'The billionaire philanthropist funded scholarship programs for underprivileged students.',
          examTag: 'SSC CGL (Repeated OWS)'
        },
        {
          word: 'Bibliophile',
          partOfSpeech: 'Noun',
          breakdown: 'Biblio (Book) + Phil (Love) + e',
          hindi: 'पुस्तक प्रेमी / किताबों का शौकीन',
          meaning: 'A person who collects or has a great love for books.',
          example: 'As a passionate bibliophile, his personal library housed over ten thousand antique volumes.',
          examTag: 'SSC CGL / CHSL'
        },
        {
          word: 'Philosopher',
          partOfSpeech: 'Noun',
          breakdown: 'Phil (Love) + Soph (Wisdom) + er (Person)',
          hindi: 'दार्शनिक / तत्वज्ञानी',
          meaning: 'A person engaged in or learned in philosophy, seeking wisdom and truth.',
          example: 'Ancient Greek philosophers like Socrates debated the true essence of justice.',
          examTag: 'SSC CPO'
        },
        {
          word: 'Philology',
          partOfSpeech: 'Noun',
          breakdown: 'Phil (Love) + Log (Word / Speech) + y',
          hindi: 'भाषाशास्त्र / भाषा-साहित्य का अध्ययन',
          meaning: 'The branch of knowledge that deals with the structure and historical development of languages.',
          example: 'His scholarly research in Indo-European philology uncovered ancient linguistic roots.',
          examTag: 'SSC CGL'
        },
        {
          word: 'Philharmonic',
          partOfSpeech: 'Adjective / Noun',
          breakdown: 'Phil (Love) + Harmonic (Music harmony)',
          hindi: 'संगीत-प्रेमी / वाद्यवृंद',
          meaning: 'Devoted to music; frequently used in the name of symphonic orchestras.',
          example: 'The Vienna Philharmonic Orchestra performed Beethoven’s Ninth Symphony brilliantly.',
          examTag: 'SSC CHSL'
        }
      ]
    }
  },
  {
    id: 'v-root-l1-s1-4',
    word: 'Mis- / Miso-',
    phonetic: '/mɪs/',
    hindi: 'घृणा / द्वेष / नफ़रत',
    type: 'root',
    partOfSpeech: 'Prefix / Root',
    meaning: 'Greek root "Misein" meaning "To hate" or "Strong aversion". It forms words describing hatred toward people, women, marriage, or ideas.',
    synonyms: ['Hatred', 'Aversion', 'Contempt', 'Dislike'],
    antonyms: ['Phil- (Love)', 'Affectionate', 'Sympathetic'],
    example: 'The reclusive misanthrope lived atop the isolated hill to avoid dealing with people.',
    mnemonic: 'Miso = Miss ho gaya pyar, bachi sirf Nafrat! (Misanthrope = Hates mankind).',
    frequency: 'Repeated',
    examTags: ['SSC CGL', 'CHSL', 'CPO', 'Level 1', 'Set 01', 'Root Words'],
    collocation: 'Root in Misanthrope, Misogynist, Misogamist',
    derivatives: 'Misanthrope, Misogynist, Misogamist, Misology, Misoneism',
    level: 'level-1',
    set: 'set-01',
    rootFamily: {
      origin: 'Greek',
      coreMeaning: 'Hate / Aversion (घृणा / द्वेष / नफ़रत)',
      counterRoot: {
        root: 'Phil- / Philo-',
        meaning: 'Love / Fondness (प्रेम / लगाव)'
      },
      derivatives: [
        {
          word: 'Misanthrope',
          partOfSpeech: 'Noun',
          breakdown: 'Mis (Hate) + Anthrop (Mankind) + e',
          hindi: 'मानवद्वेषी / समाज से नफ़रत करने वाला',
          meaning: 'A person who dislikes mankind and avoids human society.',
          example: 'Disillusioned by betrayal, the old hermit turned into a bitter misanthrope.',
          examTag: 'SSC CGL (Top OWS)'
        },
        {
          word: 'Misogynist',
          partOfSpeech: 'Noun',
          breakdown: 'Miso (Hate) + Gyn (Woman) + ist (Person)',
          hindi: 'महिलाद्वेषी / नारी-विरोधी',
          meaning: 'A person who dislikes, despises, or is strongly prejudiced against women.',
          example: 'The critic condemned the novel for featuring deeply misogynist stereotypes.',
          examTag: 'SSC CGL / CHSL'
        },
        {
          word: 'Misogamist',
          partOfSpeech: 'Noun',
          breakdown: 'Miso (Hate) + Gam (Marriage) + ist (Person)',
          hindi: 'विवाह-द्वेषी / विवाह से नफ़रत करने वाला',
          meaning: 'A person who hates or strongly opposes the institution of marriage.',
          example: 'Declaring himself a confirmed bachelor and committed misogamist, he refused all proposals.',
          examTag: 'SSC CPO'
        },
        {
          word: 'Misology',
          partOfSpeech: 'Noun',
          breakdown: 'Miso (Hate) + Logy (Reason / Argument)',
          hindi: 'तर्क या ज्ञान से घृणा',
          meaning: 'A hatred or distrust of reasoning, logical argument, or knowledge.',
          example: 'Socrates warned his disciples against falling into misology when debates became frustrating.',
          examTag: 'SSC CGL'
        },
        {
          word: 'Misoneism',
          partOfSpeech: 'Noun',
          breakdown: 'Miso (Hate) + Neo (New) + ism (Belief)',
          hindi: 'नए विचारों या बदलाव से नफ़रत',
          meaning: 'An unreasonable hatred, fear, or intolerance of innovation and change.',
          example: 'The bureaucratic committee’s stubborn misoneism prevented the adoption of digital tools.',
          examTag: 'SSC CGL Mains'
        }
      ]
    }
  },
  {
    id: 'v-root-l1-s1-5',
    word: 'Loqu- / Locu-',
    phonetic: '/lɒk/',
    hindi: 'बोलना / वार्तालाप / भाषण',
    type: 'root',
    partOfSpeech: 'Root Word',
    meaning: 'Latin root "Loqui" meaning "To speak" or "Talk". It forms words relating to speech, eloquence, and conversation.',
    synonyms: ['Speech', 'Conversation', 'Dialogue', 'Oratory'],
    antonyms: ['Taciturn', 'Reticent', 'Silent'],
    example: 'The eloquent statesman delivered an inspiring speech that moved listeners to tears.',
    mnemonic: 'Loqu = Locket khol kar bolna (Loquacious = bahut bolne wala talkative).',
    frequency: 'Repeated',
    examTags: ['SSC CGL', 'CHSL', 'CPO', 'Level 1', 'Set 01', 'Root Words'],
    collocation: 'Root in Loquacious, Eloquent, Soliloquy, Circumlocution',
    derivatives: 'Loquacious, Eloquent, Soliloquy, Colloquial, Circumlocution, Grandiloquent, Interlocutor',
    level: 'level-1',
    set: 'set-01',
    rootFamily: {
      origin: 'Latin',
      coreMeaning: 'Speak / Talk / Words (बोलना / कथन)',
      counterRoot: {
        root: 'Tac- / Tace-',
        meaning: 'Silent (मौन / चुप रहना)'
      },
      derivatives: [
        {
          word: 'Loquacious',
          partOfSpeech: 'Adjective',
          breakdown: 'Loqu (Speak) + acious (Tending to / Full of)',
          hindi: 'बातूनी / वाचाल / गप्पी',
          meaning: 'Tending to talk a great deal; talkative.',
          example: 'The loquacious tour guide kept tourists entertained with endless anecdotes.',
          examTag: 'SSC CGL (Top Repeated)'
        },
        {
          word: 'Eloquent',
          partOfSpeech: 'Adjective',
          breakdown: 'E (Out) + Loqu (Speak) + ent',
          hindi: 'सुवक्ता / प्रभावोत्पादक बोलने वाला',
          meaning: 'Fluent or persuasive in speaking or writing clearly and beautifully.',
          example: 'Her eloquent defense convinced the jury of the defendant’s innocence.',
          examTag: 'SSC CGL / CHSL'
        },
        {
          word: 'Soliloquy',
          partOfSpeech: 'Noun',
          breakdown: 'Soli (Alone) + Loqu (Speak) + y',
          hindi: 'स्वभाषण / अकेले में खुद से बातचीत',
          meaning: 'An act of speaking one’s thoughts aloud when by oneself, especially in a drama.',
          example: 'Hamlet’s famous "To be or not to be" is the most celebrated soliloquy in English theatre.',
          examTag: 'SSC CGL (Repeated OWS)'
        },
        {
          word: 'Circumlocution',
          partOfSpeech: 'Noun',
          breakdown: 'Circum (Around) + Locu (Speak) + tion',
          hindi: 'घुमा-फिराकर बात करना / कपटपूर्ण वक्तव्य',
          meaning: 'The use of many words where fewer would do, especially in an attempt to be vague.',
          example: 'The politician avoided direct answers through clever circumlocution.',
          examTag: 'SSC CGL / CPO'
        },
        {
          word: 'Colloquial',
          partOfSpeech: 'Adjective',
          breakdown: 'Col (Together) + Loqu (Speak) + ial',
          hindi: 'बोलचाल का / अनौपचारिक भाषा',
          meaning: 'Used in ordinary or familiar conversation; not formal or literary.',
          example: 'Idioms and slang words are characteristic features of colloquial English.',
          examTag: 'SSC CHSL'
        },
        {
          word: 'Grandiloquent',
          partOfSpeech: 'Adjective',
          breakdown: 'Grandi (Grand / Pompous) + Loqu (Speak) + ent',
          hindi: 'आडंबरपूर्ण / शेखी बघारने वाली भाषा',
          meaning: 'Pompous or extravagant in language, style, or manner, intended to impress.',
          example: 'His grandiloquent rhetoric could not conceal the lack of real substance in his proposals.',
          examTag: 'SSC CGL Mains'
        }
      ]
    }
  },
  {
    id: 'v-root-l1-s1-6',
    word: 'Bell- / Belli-',
    phonetic: '/bɛl/',
    hindi: 'युद्ध / झगड़ा / आक्रामकता',
    type: 'root',
    partOfSpeech: 'Root Word',
    meaning: 'Latin root "Bellum" meaning "War" or "Fighting". It forms words describing aggressive, combative, and warlike tendencies.',
    synonyms: ['War', 'Fight', 'Aggression', 'Combat'],
    antonyms: ['Pac- (Peace)', 'Pacific', 'Peaceable'],
    example: 'The belligerent general rejected all diplomatic overtures in favor of military action.',
    mnemonic: 'Bell = War / Ladaai (Bellicose = ladaaku, Rebellion = bagawat).',
    frequency: 'Repeated',
    examTags: ['SSC CGL', 'CHSL', 'CPO', 'Level 1', 'Set 01', 'Root Words'],
    collocation: 'Root in Bellicose, Belligerent, Rebellion, Antebellum',
    derivatives: 'Bellicose, Belligerent, Rebellion, Antebellum, Postbellum',
    level: 'level-1',
    set: 'set-01',
    rootFamily: {
      origin: 'Latin',
      coreMeaning: 'War / Fight / Hostility (युद्ध / संघर्ष)',
      counterRoot: {
        root: 'Pac- / Pax',
        meaning: 'Peace / Calm (शांति)'
      },
      derivatives: [
        {
          word: 'Bellicose',
          partOfSpeech: 'Adjective',
          breakdown: 'Belli (War) + cose (Prone to)',
          hindi: 'लड़ाकू / युद्धप्रिय / झगड़ालू',
          meaning: 'Demonstrating aggression and willingness to fight.',
          example: 'The dictator delivered a bellicose speech threatening cross-border military strikes.',
          examTag: 'SSC CGL'
        },
        {
          word: 'Belligerent',
          partOfSpeech: 'Adjective / Noun',
          breakdown: 'Belli (War) + Ger (Carry / Wage) + ent',
          hindi: 'युद्धरत राष्ट्र / आक्रामक व्यक्ति',
          meaning: 'Hostile and aggressive; engaged in a recognized war or conflict.',
          example: 'United Nations envoys urged both belligerent states to sign an immediate ceasefire.',
          examTag: 'SSC CGL / CHSL'
        },
        {
          word: 'Rebellion',
          partOfSpeech: 'Noun',
          breakdown: 'Re (Again / Against) + Belli (War) + on',
          hindi: 'विद्रोह / बगावत',
          meaning: 'An act of violent or open resistance to an established government or ruler.',
          example: 'The oppressed peasants united in armed rebellion against tyrannical landlords.',
          examTag: 'SSC CGL'
        },
        {
          word: 'Antebellum',
          partOfSpeech: 'Adjective',
          breakdown: 'Ante (Before) + Bellum (War)',
          hindi: 'युद्ध से पूर्व का काल (विशेषकर गृहयुद्ध)',
          meaning: 'Occurring or existing before a particular war, especially the American Civil War.',
          example: 'The historical drama captured the opulent architecture of the antebellum American South.',
          examTag: 'SSC CGL Mains'
        }
      ]
    }
  },
  {
    id: 'v-root-l1-s1-7',
    word: 'Ambi- / Amphi-',
    phonetic: '/ˈæm.bi/',
    hindi: 'दोनों / चारों ओर / दो तरफा',
    type: 'root',
    partOfSpeech: 'Prefix / Root',
    meaning: 'Latin/Greek roots meaning "Both", "Around", or "On two sides". It forms words describing dual abilities, double meanings, or environments.',
    synonyms: ['Both', 'Dual', 'Two-fold', 'Surrounding'],
    antonyms: ['Mono- (Single)', 'Uni- (One)'],
    example: 'An ambidextrous artist can paint with effortless skill using either hand.',
    mnemonic: 'Ambi = Both sides (Ambidextrous = Dono haath se likhne wala, Ambiguous = Do arth nikalne wala).',
    frequency: 'Repeated',
    examTags: ['SSC CGL', 'CHSL', 'CPO', 'Level 1', 'Set 01', 'Root Words'],
    collocation: 'Root in Ambidextrous, Ambiguous, Ambivalent, Amphibian',
    derivatives: 'Ambidextrous, Ambiguous, Ambivalent, Amphibian, Amphitheater',
    level: 'level-1',
    set: 'set-01',
    rootFamily: {
      origin: 'Latin / Greek',
      coreMeaning: 'Both / Around / Dual (दोनों / दोतरफा)',
      counterRoot: {
        root: 'Uni- / Mono-',
        meaning: 'One / Single (एक / एकल)'
      },
      derivatives: [
        {
          word: 'Ambidextrous',
          partOfSpeech: 'Adjective',
          breakdown: 'Ambi (Both) + Dextr (Right hand / Skilled) + ous',
          hindi: 'सव्यसाची / दोनों हाथों से समान कुशल',
          meaning: 'Able to use the right and left hands equally well.',
          example: 'The famous surgeon was ambidextrous, allowing him to operate effortlessly from either angle.',
          examTag: 'SSC CGL (Top OWS)'
        },
        {
          word: 'Ambiguous',
          partOfSpeech: 'Adjective',
          breakdown: 'Ambi (Both / Two paths) + Agere (To drive) + ous',
          hindi: 'अस्पष्ट / द्वयर्थी / संदिग्ध',
          meaning: 'Open to more than one interpretation; having a double meaning; not clear.',
          example: 'The wording of the legal clause was ambiguous, sparking disputes between the parties.',
          examTag: 'SSC CGL / CHSL'
        },
        {
          word: 'Ambivalent',
          partOfSpeech: 'Adjective',
          breakdown: 'Ambi (Both) + Valent (Strength / Valence)',
          hindi: 'असमंजस / विरोधाभासी भावनाएँ रखने वाला',
          meaning: 'Having mixed feelings or contradictory ideas about something or someone.',
          example: 'He remained ambivalent about accepting the promotion because it required relocating abroad.',
          examTag: 'SSC CGL / CDS'
        },
        {
          word: 'Amphibian',
          partOfSpeech: 'Noun / Adjective',
          breakdown: 'Amphi (Both) + Bios (Life) + an',
          hindi: 'उभयचर प्राणी (जल व थल दोनों पर रहने वाला)',
          meaning: 'A cold-blooded vertebrate animal capable of living both on land and in water.',
          example: 'Frogs and salamanders are classic examples of amphibians.',
          examTag: 'SSC CGL OWS'
        },
        {
          word: 'Amphitheater',
          partOfSpeech: 'Noun',
          breakdown: 'Amphi (Around / Both sides) + Theater (Viewing place)',
          hindi: 'गोलाकार खुला रंगमंच',
          meaning: 'A circular or oval open-air venue with tiers of seats rising around a central arena.',
          example: 'The Roman Colosseum is the most legendary amphitheater of the ancient world.',
          examTag: 'SSC CHSL'
        }
      ]
    }
  },
  {
    id: 'v-root-l1-s1-8',
    word: 'Plac- / Pac-',
    phonetic: '/plæk/',
    hindi: 'शांत करना / सुलह / प्रसन्न करना',
    type: 'root',
    partOfSpeech: 'Root Word',
    meaning: 'Latin roots "Placere" (to please) and "Pax" (peace). It forms words associated with soothing, calmness, and appeasement.',
    synonyms: ['Calm', 'Peace', 'Soothe', 'Appease'],
    antonyms: ['Bell- (War)', 'Pugn- (Fight)', 'Agitate'],
    example: 'The diplomat made concessions to placate the protesting workers.',
    mnemonic: 'Plac = Please karna / shant karna (Placate = shant karna, Placid = shant swabhav).',
    frequency: 'Repeated',
    examTags: ['SSC CGL', 'CHSL', 'Level 1', 'Set 01', 'Root Words'],
    collocation: 'Root in Placate, Placid, Implacable, Pacify, Pacifist',
    derivatives: 'Placid, Placate, Implacable, Pacify, Pacifist, Complacent',
    level: 'level-1',
    set: 'set-01',
    rootFamily: {
      origin: 'Latin',
      coreMeaning: 'Calm / Peace / Appease (शांत / सुलह / प्रसन्न)',
      counterRoot: {
        root: 'Bell- / Pugn-',
        meaning: 'War / Fight / Hostility (युद्ध / आक्रामकता)'
      },
      derivatives: [
        {
          word: 'Placate',
          partOfSpeech: 'Verb',
          breakdown: 'Plac (Please / Calm) + ate (Verb)',
          hindi: 'मनाना / शांत करना / तुष्ट करना',
          meaning: 'To make someone less angry or hostile; appease.',
          example: 'They offered financial compensation to placate the furious consumers.',
          examTag: 'SSC CGL'
        },
        {
          word: 'Placid',
          partOfSpeech: 'Adjective',
          breakdown: 'Plac (Calm) + id',
          hindi: 'शांत / सौम्य / स्थिर',
          meaning: 'Not easily upset or excited; calm and peaceful with little movement.',
          example: 'The placid surface of the early morning lake mirrored the blue sky.',
          examTag: 'SSC CGL / CHSL'
        },
        {
          word: 'Implacable',
          partOfSpeech: 'Adjective',
          breakdown: 'Im (Not) + Plac (Calm) + able',
          hindi: 'कठोर / जिसे शांत न किया जा सके',
          meaning: 'Unable to be appeased, placated, or calmed down; relentless.',
          example: 'The detective was an implacable pursuer of organized crime bosses.',
          examTag: 'SSC CGL Mains'
        },
        {
          word: 'Pacify',
          partOfSpeech: 'Verb',
          breakdown: 'Pac (Peace) + ify (To make)',
          hindi: 'शांत करना / सुलह कराना',
          meaning: 'Quell the anger, agitation, or excitement of; bring peace to.',
          example: 'Government officials intervened to pacify the rioting crowds.',
          examTag: 'SSC CHSL'
        },
        {
          word: 'Pacifist',
          partOfSpeech: 'Noun',
          breakdown: 'Pac (Peace) + ist (Believer)',
          hindi: 'शांतिवादी / युद्ध-विरोधी',
          meaning: 'A person who believes that war and violence are unjustifiable.',
          example: 'Mahatma Gandhi was a revered pacifist who championed nonviolent resistance.',
          examTag: 'SSC CGL OWS'
        }
      ]
    }
  },
  {
    id: 'v-root-l1-s1-9',
    word: 'Grat- / Grac-',
    phonetic: '/ɡræt/',
    hindi: 'आभार / कृपा / प्रसन्नता / निःशुल्क',
    type: 'root',
    partOfSpeech: 'Root Word',
    meaning: 'Latin root "Gratus" meaning "Pleasing", "Thankful", or "Favored". It forms words describing appreciation, blessings, and kindness.',
    synonyms: ['Thankful', 'Pleasing', 'Graceful', 'Appreciative'],
    antonyms: ['Ingrate', 'Ungrateful'],
    example: 'He expressed profound gratitude for the scholarship that funded his degree.',
    mnemonic: 'Gratitude = Dhanyawad / shukrana. Gratis = Free / muft.',
    frequency: 'Repeated',
    examTags: ['SSC CGL', 'CHSL', 'Level 1', 'Set 01', 'Root Words'],
    collocation: 'Root in Gratitude, Ingrate, Gratuitous, Gratis, Congratulate',
    derivatives: 'Gratitude, Ingrate, Gratuitous, Gratis, Congratulate, Ingratiate',
    level: 'level-1',
    set: 'set-01',
    rootFamily: {
      origin: 'Latin',
      coreMeaning: 'Thankful / Pleasing / Grace (आभार / कृपा / प्रसन्नता)',
      derivatives: [
        {
          word: 'Gratitude',
          partOfSpeech: 'Noun',
          breakdown: 'Grat (Thankful) + itude (State)',
          hindi: 'कृतज्ञता / आभार / धन्यवाद',
          meaning: 'The quality of being thankful; readiness to show appreciation.',
          example: 'She wrote a letter of deep gratitude to the doctors who saved her father.',
          examTag: 'SSC CHSL'
        },
        {
          word: 'Ingrate',
          partOfSpeech: 'Noun',
          breakdown: 'In (Not) + Grate (Thankful)',
          hindi: 'एहसान फरामोश / अकृतज्ञ व्यक्ति',
          meaning: 'An ungrateful person who fails to appreciate acts of kindness.',
          example: 'Only an ingrate would insult the mentors who guided him to success.',
          examTag: 'SSC CGL OWS'
        },
        {
          word: 'Gratuitous',
          partOfSpeech: 'Adjective',
          breakdown: 'Grat (Free / Uncalled for) + itous',
          hindi: 'अकारण / अनावश्यक / बिना बात का',
          meaning: 'Done without good reason; uncalled for; given or done free of charge.',
          example: 'The action movie faced heavy criticism for excessive and gratuitous violence.',
          examTag: 'SSC CGL Mains'
        },
        {
          word: 'Gratis',
          partOfSpeech: 'Adverb / Adjective',
          breakdown: 'Gratis (For favor / Free)',
          hindi: 'निःशुल्क / मुफ्त',
          meaning: 'Given or done without charge; free.',
          example: 'All festival attendees received complimentary drinking water and snacks gratis.',
          examTag: 'SSC CGL'
        },
        {
          word: 'Ingratiate',
          partOfSpeech: 'Verb',
          breakdown: 'In (Into) + Grati (Favor) + ate',
          hindi: 'खुशामद करके कृपापात्र बनना',
          meaning: 'Bring oneself into favor with someone by flattering or trying to please them.',
          example: 'The cunning clerk attempted to ingratiate himself with the new managing director.',
          examTag: 'SSC CGL'
        }
      ]
    }
  },
  {
    id: 'v-root-l1-s1-10',
    word: 'Vol- / Velle-',
    phonetic: '/vɒl/',
    hindi: 'इच्छा / संकल्प / मर्जी',
    type: 'root',
    partOfSpeech: 'Root Word',
    meaning: 'Latin root "Volere / Velle" meaning "To wish", "To will", or "Choose freely". It forms words describing intentional action and choice.',
    synonyms: ['Will', 'Wish', 'Desire', 'Choice'],
    antonyms: ['Involuntary', 'Coerced', 'Compulsory'],
    example: 'He stepped forward of his own free volition to assist the rescue workers.',
    mnemonic: 'Vol = Voluntary (apni marzi se kaam karna). Benevolent = achhi marzi wala.',
    frequency: 'Repeated',
    examTags: ['SSC CGL', 'CHSL', 'Level 1', 'Set 01', 'Root Words'],
    collocation: 'Root in Volition, Voluntary, Benevolent, Malevolent',
    derivatives: 'Volition, Voluntary, Volunteer, Benevolent, Malevolent',
    level: 'level-1',
    set: 'set-01',
    rootFamily: {
      origin: 'Latin',
      coreMeaning: 'Wish / Will / Choice (इच्छा / संकल्प / मर्जी)',
      derivatives: [
        {
          word: 'Volition',
          partOfSpeech: 'Noun',
          breakdown: 'Vol (Will) + ition (Noun act)',
          hindi: 'इच्छा-शक्ति / स्वेच्छा / संकल्प',
          meaning: 'The faculty or power of using one’s own will to make decisions.',
          example: 'Nobody compelled him; he resigned from the prestigious committee of his own volition.',
          examTag: 'SSC CGL'
        },
        {
          word: 'Voluntary',
          partOfSpeech: 'Adjective',
          breakdown: 'Vol (Will) + untary (Relating to)',
          hindi: 'स्वैच्छिक / अपनी इच्छा से किया गया',
          meaning: 'Done, given, or acting of one’s own free will, without coercion.',
          example: 'Participation in the after-school art club was entirely voluntary.',
          examTag: 'SSC CHSL'
        },
        {
          word: 'Involuntary',
          partOfSpeech: 'Adjective',
          breakdown: 'In (Not) + Vol (Will) + untary',
          hindi: 'अनैच्छिक / बिना मर्जी के स्वत: होना',
          meaning: 'Done without will or conscious control, such as a reflex.',
          example: 'Shivering in freezing temperatures is an involuntary biological reflex to generate warmth.',
          examTag: 'SSC CHSL'
        }
      ]
    }
  },

  // =========================================================================
  // LEVEL 2: SCIENCE, PERCEPTION, TIME, BODY & PHYSICAL WORLD (10 ROOT WORDS)
  // =========================================================================
  {
    id: 'v-root-l2-s1-1',
    word: 'Chron- / Chrono-',
    phonetic: '/krɒn/',
    hindi: 'समय (Time) संबंधित',
    type: 'root',
    partOfSpeech: 'Root Word',
    meaning: 'Greek root "Chronos" meaning "Time". It forms words describing the sequence, duration, and records of events.',
    synonyms: ['Temporal', 'Time-based', 'Historical', 'Sequential'],
    antonyms: ['Anachronistic', 'Timeless'],
    example: 'Historians compiled a chronological record of the empire’s greatest achievements.',
    mnemonic: 'Chronometer is a precision clock used by navigators at sea to tell exact time.',
    frequency: 'Repeated',
    examTags: ['SSC CGL', 'NDA', 'CDS', 'Level 2', 'Set 01', 'Root Words'],
    collocation: 'Root in Chronic illness, Synchronize clocks, Chronology',
    derivatives: 'Chronology, Synchronize, Chronic, Chronicle, Anachronism, Chronometer',
    level: 'level-2',
    set: 'set-01',
    rootFamily: {
      origin: 'Greek',
      coreMeaning: 'Time (समय / काल)',
      derivatives: [
        {
          word: 'Chronology',
          partOfSpeech: 'Noun',
          breakdown: 'Chron (Time) + Logy (Study / Science)',
          hindi: 'कालक्रम / घटनाओं का समयानुसार क्रम',
          meaning: 'The arrangement of events or dates in the order of their occurrence in time.',
          example: 'The documentary outlined the chronology of the independence movement.',
          examTag: 'SSC CGL'
        },
        {
          word: 'Synchronize',
          partOfSpeech: 'Verb',
          breakdown: 'Syn (Together) + Chron (Time) + ize (Verb)',
          hindi: 'एक ही समय पर होना / तालमेल बैठाना',
          meaning: 'To cause to occur or operate at the same exact time or rate.',
          example: 'The commando team synchronized their digital watches before starting the raid.',
          examTag: 'SSC CGL / CHSL'
        },
        {
          word: 'Chronic',
          partOfSpeech: 'Adjective',
          breakdown: 'Chron (Time) + ic (Adjective)',
          hindi: 'दीर्घकालिक / पुराना (रोग)',
          meaning: 'Persisting for a long period of time or recurring constantly.',
          example: 'She suffered from chronic back pain that worsened during cold weather.',
          examTag: 'SSC CGL'
        },
        {
          word: 'Chronicle',
          partOfSpeech: 'Noun / Verb',
          breakdown: 'Chron (Time) + icle (Record)',
          hindi: 'ऐतिहासिक अभिलेख / कालक्रम वृत्तांत',
          meaning: 'A factual written account of historical events presented in chronological order.',
          example: 'The royal court scribe produced a vivid chronicle of the monarch’s twenty-year reign.',
          examTag: 'SSC CPO'
        },
        {
          word: 'Anachronism',
          partOfSpeech: 'Noun',
          breakdown: 'Ana (Back / Against) + Chron (Time) + ism',
          hindi: 'कालदोष / समय से बेमेल चीज़',
          meaning: 'A thing belonging or appropriate to a period other than that in which it exists.',
          example: 'Seeing a wristwatch on an actor in a movie set in ancient Rome is a blatant anachronism.',
          examTag: 'SSC CGL (Repeated OWS)'
        },
        {
          word: 'Chronometer',
          partOfSpeech: 'Noun',
          breakdown: 'Chron (Time) + Meter (Measure)',
          hindi: 'परिशुद्ध समय-मापक यंत्र',
          meaning: 'An instrument for measuring time accurately, especially despite motion or variation.',
          example: 'Naval officers relied on a marine chronometer to calculate longitude accurately.',
          examTag: 'SSC CGL'
        }
      ]
    }
  },
  {
    id: 'v-root-l2-s1-2',
    word: 'Temp- / Tempor-',
    phonetic: '/tɛmp/',
    hindi: 'अस्थायी समय / समकालीन / काल',
    type: 'root',
    partOfSpeech: 'Root Word',
    meaning: 'Latin root "Tempus / Temporis" meaning "Time" or "Season". It forms words describing limited durations and worldly existence.',
    synonyms: ['Temporal', 'Passing', 'Contemporary', 'Transitory'],
    antonyms: ['Permanent', 'Eternal'],
    example: 'Temporary housing was built for families displaced by the flood.',
    mnemonic: 'Temp = Temporary (kuch samay ke liye chalne wala). Contemporary = Usi samay ka.',
    frequency: 'Repeated',
    examTags: ['SSC CGL', 'CHSL', 'Level 2', 'Set 01', 'Root Words'],
    collocation: 'Root in Contemporary, Extempore, Temporary, Temporal',
    derivatives: 'Temporary, Contemporary, Temporal, Extempore, Temporize',
    level: 'level-2',
    set: 'set-01',
    rootFamily: {
      origin: 'Latin',
      coreMeaning: 'Time / Season / Transience (समय / काल / अस्थायी)',
      derivatives: [
        {
          word: 'Contemporary',
          partOfSpeech: 'Adjective / Noun',
          breakdown: 'Con (With / Together) + Tempor (Time) + ary',
          hindi: 'समकालीन / उसी युग का व्यक्ति',
          meaning: 'Living or occurring at the same time; belonging to or occurring in the present.',
          example: 'Shakespeare and Francis Bacon were prominent contemporary figures of Elizabethan England.',
          examTag: 'SSC CGL OWS'
        },
        {
          word: 'Extempore',
          partOfSpeech: 'Adverb / Adjective',
          breakdown: 'Ex (Out of) + Tempore (The moment / Time)',
          hindi: 'बिना पूर्व तैयारी के / आशुभाषण',
          meaning: 'Spoken or done without preparation; improvised.',
          example: 'The student delivered an inspiring extempore speech on environmental protection.',
          examTag: 'SSC CGL (Top OWS)'
        },
        {
          word: 'Temporal',
          partOfSpeech: 'Adjective',
          breakdown: 'Tempor (Time) + al',
          hindi: 'लौकिक / सांसारिक / समय संबंधी',
          meaning: 'Relating to worldly as opposed to spiritual affairs; of or relating to time.',
          example: 'Kings exercised temporal power while religious leaders exercised spiritual authority.',
          examTag: 'SSC CGL'
        },
        {
          word: 'Temporize',
          partOfSpeech: 'Verb',
          breakdown: 'Tempor (Time) + ize (Verb)',
          hindi: 'टालमटोल करना / समय व्यतीत करना',
          meaning: 'Avoid making a decision or committing oneself in order to gain time.',
          example: 'The defense attorney attempted to temporize until the key witness could be located.',
          examTag: 'SSC CGL Mains'
        }
      ]
    }
  },
  {
    id: 'v-root-l2-s1-3',
    word: 'Path- / Pathy-',
    phonetic: '/pæθ/',
    hindi: 'अनुभूति / भावना / रोग / पीड़ा',
    type: 'root',
    partOfSpeech: 'Root Word',
    meaning: 'Greek root "Pathos" meaning "Feeling", "Suffering", or "Disease". It forms words describing emotional connection or medical disorders.',
    synonyms: ['Feeling', 'Emotion', 'Suffering', 'Disease'],
    antonyms: ['Insensible', 'Emotionless'],
    example: 'Cultivating true empathy allows healthcare workers to comprehend a patient’s unspoken distress.',
    mnemonic: 'Path = Pathos (Dard / Feeling / Bimari) -> Pathology is study of diseases; Sympathy is sharing feelings.',
    frequency: 'Repeated',
    examTags: ['SSC CGL', 'CHSL', 'CPO', 'CDS', 'Level 2', 'Set 01', 'Root Words'],
    collocation: 'Root in Sympathy, Empathy, Apathy, Antipathy, Pathology',
    derivatives: 'Sympathy, Empathy, Apathy, Antipathy, Telepathy, Pathology, Pathological',
    level: 'level-2',
    set: 'set-01',
    rootFamily: {
      origin: 'Greek',
      coreMeaning: 'Feeling / Suffering / Disease (भावना / पीड़ा / रोग)',
      derivatives: [
        {
          word: 'Empathy',
          partOfSpeech: 'Noun',
          breakdown: 'Em (In) + Pathy (Feeling)',
          hindi: 'समानुभूति / दूसरों की पीड़ा महसूस करना',
          meaning: 'The ability to understand and share the feelings and emotions of another person.',
          example: 'Effective counselors possess deep empathy, making clients feel heard and supported.',
          examTag: 'SSC CGL'
        },
        {
          word: 'Sympathy',
          partOfSpeech: 'Noun',
          breakdown: 'Syn (Together) + Pathy (Feeling)',
          hindi: 'सहानुभूति / हमदर्दी',
          meaning: 'Feelings of pity and sorrow for someone else’s misfortune.',
          example: 'Neighbors expressed heartfelt sympathy to the grieving family.',
          examTag: 'SSC CHSL'
        },
        {
          word: 'Apathy',
          partOfSpeech: 'Noun',
          breakdown: 'A (Without) + Pathy (Feeling)',
          hindi: 'उदासीनता / बेपरवाही / अनिच्छा',
          meaning: 'Lack of interest, enthusiasm, or concern toward important issues.',
          example: 'Widespread voter apathy led to a record-low turnout in the municipal elections.',
          examTag: 'SSC CGL / CPO'
        },
        {
          word: 'Antipathy',
          partOfSpeech: 'Noun',
          breakdown: 'Anti (Against) + Pathy (Feeling)',
          hindi: 'तीव्र घृणा / शत्रुता / वैर',
          meaning: 'A deep-seated feeling of aversion, dislike, or hostility.',
          example: 'There was historic antipathy between the two rival football clubs.',
          examTag: 'SSC CGL'
        },
        {
          word: 'Pathology',
          partOfSpeech: 'Noun',
          breakdown: 'Path (Disease) + Logy (Study)',
          hindi: 'रोग विज्ञान / विकृति विज्ञान',
          meaning: 'The scientific study of the causes and effects of diseases.',
          example: 'Blood samples were sent to the pathology laboratory for diagnostic testing.',
          examTag: 'SSC CHSL'
        },
        {
          word: 'Telepathy',
          partOfSpeech: 'Noun',
          breakdown: 'Tele (Far / Distance) + Pathy (Feeling)',
          hindi: 'दूरसंवेदन / मन के विचारों का आदान-प्रदान',
          meaning: 'The supposed communication of thoughts or ideas by means other than known senses.',
          example: 'Sci-fi thrillers often portray twins who communicate silently through telepathy.',
          examTag: 'SSC CGL'
        }
      ]
    }
  },
  {
    id: 'v-root-l2-s1-4',
    word: 'Luc- / Lum-',
    phonetic: '/luːk/',
    hindi: 'प्रकाश / चमक / स्पष्टता',
    type: 'root',
    partOfSpeech: 'Root Word',
    meaning: 'Latin roots "Lux / Lucere / Lumen" meaning "Light" or "Clarity". It forms words describing brightness and mental clarity.',
    synonyms: ['Bright', 'Clear', 'Intelligible', 'Luminous'],
    antonyms: ['Obscure', 'Opaque', 'Dim', 'Murky'],
    example: 'The professor provided a lucid explanation that illuminated the intricate theory.',
    mnemonic: 'Luc = Light / Chamak (Lucid = bilkul saaf / clear, Luminous = chamakdar).',
    frequency: 'Repeated',
    examTags: ['SSC CGL', 'CHSL', 'CDS', 'Level 2', 'Set 01', 'Root Words'],
    collocation: 'Root in Lucid, Elucidate, Luminous, Translucent',
    derivatives: 'Lucid, Elucidate, Luminous, Translucent, Pellucid, Illuminate',
    level: 'level-2',
    set: 'set-01',
    rootFamily: {
      origin: 'Latin',
      coreMeaning: 'Light / Clarity / Brightness (प्रकाश / स्पष्टता)',
      counterRoot: {
        root: 'Ob- / Umbr-',
        meaning: 'Shadow / Dark (अंधकार / छाया)'
      },
      derivatives: [
        {
          word: 'Lucid',
          partOfSpeech: 'Adjective',
          breakdown: 'Luc (Light) + id',
          hindi: 'स्पष्ट / सुबोध / समझने में सरल',
          meaning: 'Expressed clearly; easy to understand; showing ability to think clearly.',
          example: 'His lucid presentation helped even novice students grasp quantum physics concepts.',
          examTag: 'SSC CGL / CHSL'
        },
        {
          word: 'Elucidate',
          partOfSpeech: 'Verb',
          breakdown: 'E (Out) + Luc (Light) + id + ate (Verb)',
          hindi: 'स्पष्ट करना / व्याख्या करना',
          meaning: 'To make something clear; explain in detail.',
          example: 'The research paper helped elucidate the mysterious causes of coral bleaching.',
          examTag: 'SSC CGL'
        },
        {
          word: 'Luminous',
          partOfSpeech: 'Adjective',
          breakdown: 'Lum (Light) + in + ous',
          hindi: 'प्रकाशमान / चमकदार / दीप्तिमान',
          meaning: 'Full of or shedding light; bright or shining, especially in the dark.',
          example: 'The diver admired the luminous jellyfish glowing in the deep ocean depths.',
          examTag: 'SSC CGL'
        },
        {
          word: 'Translucent',
          partOfSpeech: 'Adjective',
          breakdown: 'Trans (Through) + Luc (Light) + ent',
          hindi: 'अर्धपारदर्शी / धुंधला प्रकाश पार करने वाला',
          meaning: 'Allowing light, but not detailed shapes, to pass through; semi-transparent.',
          example: 'Frosted bathroom glass is translucent, preserving privacy while admitting sunlight.',
          examTag: 'SSC CHSL (OWS)'
        },
        {
          word: 'Pellucid',
          partOfSpeech: 'Adjective',
          breakdown: 'Pel (Through) + Luc (Light) + id',
          hindi: 'निर्मल / अत्यंत स्वच्छ व पारदर्शी',
          meaning: 'Translucently clear; easily understood in meaning and style.',
          example: 'Swimmers could see schools of fish swimming in the pellucid mountain lake.',
          examTag: 'SSC CGL Mains'
        },
        {
          word: 'Illuminate',
          partOfSpeech: 'Verb',
          breakdown: 'Il (In / Upon) + Lum (Light) + in + ate',
          hindi: 'रोशनी डालना / प्रदीप्त करना / ज्ञानवर्धन करना',
          meaning: 'Light up; help to clarify or explain a subject thoroughly.',
          example: 'Bright festive lanterns illuminated the entire temple complex during Diwali.',
          examTag: 'SSC CPO'
        }
      ]
    }
  },
  {
    id: 'v-root-l2-s1-5',
    word: 'Spec- / Spect- / Spic-',
    phonetic: '/spɛk/',
    hindi: 'देखना / निरीक्षण करना / झांकना',
    type: 'root',
    partOfSpeech: 'Root Word',
    meaning: 'Latin root "Specere / Spectare" meaning "To look", "See", or "Watch". It forms words describing observation, perspective, and inspection.',
    synonyms: ['Observe', 'Watch', 'Examine', 'Survey'],
    antonyms: ['Overlook', 'Ignore', 'Blind'],
    example: 'A circumspect person carefully considers all angles before making an investment.',
    mnemonic: 'Spectacles = chashma dekhne ke liye. Spectator = dekhne wala darshak.',
    frequency: 'Repeated',
    examTags: ['SSC CGL', 'CHSL', 'CPO', 'Level 2', 'Set 01', 'Root Words'],
    collocation: 'Root in Spectator, Inspect, Circumspect, Conspicuous',
    derivatives: 'Spectator, Inspect, Retrospect, Circumspect, Conspicuous, Introspection',
    level: 'level-2',
    set: 'set-01',
    rootFamily: {
      origin: 'Latin',
      coreMeaning: 'Look / See / Examine (देखना / निरीक्षण)',
      derivatives: [
        {
          word: 'Circumspect',
          partOfSpeech: 'Adjective',
          breakdown: 'Circum (Around) + Spect (Look)',
          hindi: 'सतर्क / चौकन्ना / सावधान',
          meaning: 'Wary and unwilling to take risks; looking all around carefully.',
          example: 'The CEO was circumspect when discussing the sensitive corporate merger with reporters.',
          examTag: 'SSC CGL (Top Repeated)'
        },
        {
          word: 'Conspicuous',
          partOfSpeech: 'Adjective',
          breakdown: 'Con (Thoroughly) + Spic (See) + uous',
          hindi: 'सुस्पष्ट / जो आसानी से नज़र आ जाए',
          meaning: 'Standing out so as to be clearly visible; attracting notice or attention.',
          example: 'His bright neon jacket made him conspicuous even in the densely packed crowd.',
          examTag: 'SSC CGL / CHSL'
        },
        {
          word: 'Retrospect',
          partOfSpeech: 'Noun',
          breakdown: 'Retro (Backward) + Spect (Look)',
          hindi: 'सिंहावलोकन / बीती बातों पर पुनर्विचार',
          meaning: 'A survey or review of a past course of events or period of time.',
          example: 'In retrospect, choosing that difficult career path was the best decision of his life.',
          examTag: 'SSC CPO'
        },
        {
          word: 'Introspection',
          partOfSpeech: 'Noun',
          breakdown: 'Intro (Within) + Spect (Look) + ion',
          hindi: 'आत्मनिरीक्षण / अपने विचारों का विश्लेषण',
          meaning: 'The examination or observation of one’s own mental and emotional processes.',
          example: 'Quiet meditation provides an opportunity for deep personal introspection.',
          examTag: 'SSC CGL OWS'
        },
        {
          word: 'Spectator',
          partOfSpeech: 'Noun',
          breakdown: 'Spect (Watch) + ator (Person)',
          hindi: 'दर्शक / मैच देखने वाला',
          meaning: 'A person who watches at a show, game, or other public event.',
          example: 'Over sixty thousand excited spectators packed the stadium for the cricket final.',
          examTag: 'SSC MTS OWS'
        }
      ]
    }
  },
  {
    id: 'v-root-l2-s1-6',
    word: 'Somn- / Sopor- vs Hypno-',
    phonetic: '/sɒmn/',
    hindi: 'नींद / शयन / सम्मोहन',
    type: 'root',
    partOfSpeech: 'Root Word',
    meaning: 'Latin "Somnus" and Greek "Hypnos" meaning "Sleep". It forms words describing sleep disorders, drowsiness, and hypnotic trances.',
    synonyms: ['Sleep', 'Slumber', 'Drowsiness', 'Trance'],
    antonyms: ['Wakeful', 'Alert', 'Vigilant'],
    example: 'The doctor diagnosed the exhausted student with chronic insomnia.',
    mnemonic: 'Somnambulist = neend me chalne wala. Hypnotic = neend jaisi behoshi.',
    frequency: 'Repeated',
    examTags: ['SSC CGL', 'CHSL', 'CPO', 'Level 2', 'Set 01', 'Root Words'],
    collocation: 'Root in Somnambulist, Insomnia, Soporific, Hypnotic',
    derivatives: 'Somnambulist, Somniloquist, Insomnia, Soporific, Hypnotic',
    level: 'level-2',
    set: 'set-01',
    rootFamily: {
      origin: 'Latin / Greek',
      coreMeaning: 'Sleep / Drowsiness (नींद / शयन)',
      derivatives: [
        {
          word: 'Somnambulist',
          partOfSpeech: 'Noun',
          breakdown: 'Somn (Sleep) + Ambul (Walk) + ist (Person)',
          hindi: 'नींद में चलने वाला व्यक्ति',
          meaning: 'A person who walks around while asleep; a sleepwalker.',
          example: 'The locked balcony door was installed to protect the young somnambulist from injury.',
          examTag: 'SSC CGL (Top OWS)'
        },
        {
          word: 'Somniloquist',
          partOfSpeech: 'Noun',
          breakdown: 'Somn (Sleep) + Loqu (Speak) + ist',
          hindi: 'नींद में बोलने वाला व्यक्ति',
          meaning: 'A person who talks in their sleep.',
          example: 'His roommate was a chronic somniloquist who muttered entire speeches at night.',
          examTag: 'SSC CGL (Top OWS)'
        },
        {
          word: 'Insomnia',
          partOfSpeech: 'Noun',
          breakdown: 'In (Not / Without) + Somn (Sleep) + ia',
          hindi: 'अनिद्रा / नींद न आने की बीमारी',
          meaning: 'Habitual sleeplessness; inability to fall or stay asleep.',
          example: 'Excessive caffeine consumption late at night aggravated his painful insomnia.',
          examTag: 'SSC CHSL OWS'
        },
        {
          word: 'Soporific',
          partOfSpeech: 'Adjective / Noun',
          breakdown: 'Sopor (Deep sleep) + fic (Making)',
          hindi: 'नींद लाने वाली दवा या प्रभाव',
          meaning: 'Tending to induce drowsiness or deep sleep; a sleep-inducing drug.',
          example: 'The soothing motion of the long train journey had an immediate soporific effect.',
          examTag: 'SSC CGL Mains'
        },
        {
          word: 'Hypnotic',
          partOfSpeech: 'Adjective',
          breakdown: 'Hypno (Sleep) + tic',
          hindi: 'सम्मोहक / निद्राजनक',
          meaning: 'Exerting a compelling, fascinating, or sleep-inducing effect.',
          example: 'The rhythmic ticking of the antique clock had a hypnotic, soothing influence.',
          examTag: 'SSC CPO'
        }
      ]
    }
  },
  {
    id: 'v-root-l2-s1-7',
    word: 'Mort- / Mor- vs Necr-',
    phonetic: '/mɔːt/',
    hindi: 'मृत्यु / मरणशीलता / नाशवान',
    type: 'root',
    partOfSpeech: 'Root Word',
    meaning: 'Latin "Mors / Mortis" and Greek "Nekros" meaning "Death" or "Dead body". It forms words describing mortality and funeral customs.',
    synonyms: ['Death', 'Fatal', 'Decay', 'Perishable'],
    antonyms: ['Immortal', 'Vivacious', 'Living'],
    example: 'Ancient philosophers frequently reminded themselves that all mortals must perish.',
    mnemonic: 'Mortal = marne wala. Immortal = amar. Postmortem = maut ke baad shav-pariksha.',
    frequency: 'Repeated',
    examTags: ['SSC CGL', 'CHSL', 'Level 2', 'Set 01', 'Root Words'],
    collocation: 'Root in Mortal, Immortal, Mortuary, Moribund, Necrology',
    derivatives: 'Mortal, Immortal, Mortuary, Moribund, Postmortem, Necrology',
    level: 'level-2',
    set: 'set-01',
    rootFamily: {
      origin: 'Latin / Greek',
      coreMeaning: 'Death / Dying (मृत्यु / मरणशीलता)',
      counterRoot: {
        root: 'Viv- / Vita-',
        meaning: 'Life / Alive (जीवन / सजीव)'
      },
      derivatives: [
        {
          word: 'Mortal',
          partOfSpeech: 'Adjective / Noun',
          breakdown: 'Mort (Death) + al',
          hindi: 'मरणशील / नश्वर',
          meaning: 'Subject to death; fatal; causing death.',
          example: 'Humans are mortal beings whose lives are defined by the passage of time.',
          examTag: 'SSC CGL'
        },
        {
          word: 'Moribund',
          partOfSpeech: 'Adjective',
          breakdown: 'Mori (Die) + bund (At the point of)',
          hindi: 'मरणासन्न / अंत के करीब',
          meaning: 'At the point of death; in terminal decline; lacking vitality or vigor.',
          example: 'Heavy governmental stimulus was needed to revive the moribund textile industry.',
          examTag: 'SSC CGL Mains'
        },
        {
          word: 'Mortuary',
          partOfSpeech: 'Noun',
          breakdown: 'Mort (Dead) + uary (Place)',
          hindi: 'शवगृह / मुर्दाघर',
          meaning: 'A room or building in which dead bodies are kept, for examination or until burial.',
          example: 'The forensic investigator examined the recovered body at the city hospital mortuary.',
          examTag: 'SSC CHSL OWS'
        },
        {
          word: 'Postmortem',
          partOfSpeech: 'Noun / Adjective',
          breakdown: 'Post (After) + Mortem (Death)',
          hindi: 'शव-परीक्षा / मरणोपरांत जांच',
          meaning: 'An examination of a dead body to determine the cause of death; an autopsy.',
          example: 'The postmortem report revealed that poison was the exact cause of death.',
          examTag: 'SSC CGL OWS'
        }
      ]
    }
  },
  {
    id: 'v-root-l2-s1-8',
    word: 'Aud- / Audit-',
    phonetic: '/ɔːd/',
    hindi: 'सुनना / श्रवण / ध्वनि',
    type: 'root',
    partOfSpeech: 'Root Word',
    meaning: 'Latin root "Audire" meaning "To hear" or "Listen". It forms words describing hearing abilities, halls, and listener gatherings.',
    synonyms: ['Hear', 'Listen', 'Sound', 'Acoustic'],
    antonyms: ['Inaudible', 'Deaf'],
    example: 'The speaker checked the microphone to ensure his voice was completely audible.',
    mnemonic: 'Audio = sunne wali recording. Audience = sunne wale shrota.',
    frequency: 'Repeated',
    examTags: ['SSC CGL', 'CHSL', 'Level 2', 'Set 01', 'Root Words'],
    collocation: 'Root in Audible, Audience, Auditorium, Audit',
    derivatives: 'Audible, Inaudible, Audience, Auditorium, Audit, Audition',
    level: 'level-2',
    set: 'set-01',
    rootFamily: {
      origin: 'Latin',
      coreMeaning: 'Hear / Listen (सुनना / श्रवण)',
      derivatives: [
        {
          word: 'Audible',
          partOfSpeech: 'Adjective',
          breakdown: 'Aud (Hear) + ible (Able to be)',
          hindi: 'श्रव्य / जो सुना जा सके',
          meaning: 'Able to be heard distinctly.',
          example: 'His whisper was barely audible over the roaring thunder outside.',
          examTag: 'SSC CGL OWS'
        },
        {
          word: 'Audience',
          partOfSpeech: 'Noun',
          breakdown: 'Audi (Hear) + ence (Group)',
          hindi: 'श्रोतागण / दर्शक',
          meaning: 'The assembled spectators or listeners at a public event.',
          example: 'The audience gave a standing ovation as the maestro struck the final chord.',
          examTag: 'SSC CHSL OWS'
        },
        {
          word: 'Auditorium',
          partOfSpeech: 'Noun',
          breakdown: 'Audi (Listen) + torium (Place)',
          hindi: 'सभागार / प्रेक्षागृह',
          meaning: 'The part of a theater, concert hall, or other public building in which the audience sits.',
          example: 'The convocation ceremony took place in the grand university auditorium.',
          examTag: 'SSC CGL OWS'
        },
        {
          word: 'Audit',
          partOfSpeech: 'Noun / Verb',
          breakdown: 'Audit (Heard / Examined)',
          hindi: 'लेखा-परीक्षा / हिसाब की जांच',
          meaning: 'An official inspection of an individual’s or organization’s accounts.',
          example: 'An independent financial firm was hired to conduct an annual tax audit.',
          examTag: 'SSC CGL OWS'
        }
      ]
    }
  },
  {
    id: 'v-root-l2-s1-9',
    word: 'Phon- / Phono-',
    phonetic: '/fɒn/',
    hindi: 'ध्वनि / स्वर / आवाज',
    type: 'root',
    partOfSpeech: 'Root Word',
    meaning: 'Greek root "Phone" meaning "Voice" or "Sound". It forms words describing vocal harmonies, harsh sounds, and speech studies.',
    synonyms: ['Sound', 'Voice', 'Acoustic', 'Harmony'],
    antonyms: ['Silence', 'Muteness'],
    example: 'The baby cried when startled by the loud cacophony of car horns outside.',
    mnemonic: 'Phone = aawaz se baat karna. Cacophony = bura sound. Euphony = pyara sound.',
    frequency: 'Repeated',
    examTags: ['SSC CGL', 'CHSL', 'CPO', 'Level 2', 'Set 01', 'Root Words'],
    collocation: 'Root in Cacophony, Euphony, Symphony, Phonetics',
    derivatives: 'Cacophony, Euphony, Symphony, Phonetics, Megaphone',
    level: 'level-2',
    set: 'set-01',
    rootFamily: {
      origin: 'Greek',
      coreMeaning: 'Sound / Voice (ध्वनि / स्वर / आवाज)',
      derivatives: [
        {
          word: 'Cacophony',
          partOfSpeech: 'Noun',
          breakdown: 'Cacos (Bad / Harsh) + Phon (Sound) + y',
          hindi: 'कर्कश ध्वनि / शोरगुल',
          meaning: 'A harsh, discordant mixture of sounds.',
          example: 'A cacophony of blaring horns and drilling machines filled the construction zone.',
          examTag: 'SSC CGL (Top OWS)'
        },
        {
          word: 'Euphony',
          partOfSpeech: 'Noun',
          breakdown: 'Eu (Good / Pleasant) + Phon (Sound) + y',
          hindi: 'श्रुतिमधुरता / कर्णप्रिय ध्वनि',
          meaning: 'The quality of being pleasing to the ear, especially through harmonious sounds.',
          example: 'The poet selected words deliberately for their lilting musical euphony.',
          examTag: 'SSC CGL OWS'
        },
        {
          word: 'Phonetics',
          partOfSpeech: 'Noun',
          breakdown: 'Phon (Sound) + etics (Study)',
          hindi: 'ध्वनि विज्ञान / स्वर-उच्चारण शास्त्र',
          meaning: 'The study and classification of speech sounds in languages.',
          example: 'Linguistics students practice phonetic transcription using IPA symbols.',
          examTag: 'SSC CHSL'
        },
        {
          word: 'Symphony',
          partOfSpeech: 'Noun',
          breakdown: 'Syn (Together) + Phon (Sound) + y',
          hindi: 'स्वर-संगति / समस्वरता',
          meaning: 'An elaborate musical composition for full orchestra; harmony of sounds.',
          example: 'The orchestra practiced tirelessly to perform Beethoven’s Fifth Symphony.',
          examTag: 'SSC CPO'
        }
      ]
    }
  },
  {
    id: 'v-root-l2-s1-10',
    word: 'Corp- / Corpor-',
    phonetic: '/kɔːp/',
    hindi: 'शरीर / देह / समूह',
    type: 'root',
    partOfSpeech: 'Root Word',
    meaning: 'Latin root "Corpus / Corporis" meaning "Body" or "Physical substance". It forms words describing biological bodies, corporate legal bodies, and obesity.',
    synonyms: ['Body', 'Physical', 'Flesh', 'Entity'],
    antonyms: ['Incorporeal', 'Spiritual', 'Ghostly'],
    example: 'The corporation was legally recognized as an independent corporate entity.',
    mnemonic: 'Corpse = mara hua shareer (Dead body). Corpulent = mota shareer wala.',
    frequency: 'Repeated',
    examTags: ['SSC CGL', 'CHSL', 'Level 2', 'Set 01', 'Root Words'],
    collocation: 'Root in Corpse, Corpulent, Corporation, Incorporeal',
    derivatives: 'Corpse, Corpulent, Corporation, Incorporeal, Habeas Corpus',
    level: 'level-2',
    set: 'set-01',
    rootFamily: {
      origin: 'Latin',
      coreMeaning: 'Body / Physical Entity (शरीर / देह / समूह)',
      derivatives: [
        {
          word: 'Corpse',
          partOfSpeech: 'Noun',
          breakdown: 'Corp (Body)',
          hindi: 'शव / मुर्दा शरीर',
          meaning: 'A dead body, especially of a human being.',
          example: 'The autopsy was performed on the unidentified corpse found in the river.',
          examTag: 'SSC CGL OWS'
        },
        {
          word: 'Corpulent',
          partOfSpeech: 'Adjective',
          breakdown: 'Corp (Body) + ulent (Full of)',
          hindi: 'मोटा / स्थूलकाय / चर्बीयुक्त',
          meaning: 'Fat; having a large, bulky body.',
          example: 'The corpulent nobleman struggled to mount his horse without assistance.',
          examTag: 'SSC CGL (Top Repeated)'
        },
        {
          word: 'Corporation',
          partOfSpeech: 'Noun',
          breakdown: 'Corpor (Body) + ation (Noun)',
          hindi: 'निगम / संयुक्त व्यापारिक संस्था',
          meaning: 'A company or group of people authorized to act as a single body and recognized as such in law.',
          example: 'Multinational corporations invest billions in renewable energy research.',
          examTag: 'SSC CHSL'
        },
        {
          word: 'Incorporeal',
          partOfSpeech: 'Adjective',
          breakdown: 'In (Not) + Corpor (Body) + eal',
          hindi: 'अशरीरी / अभौतिक / निराकार',
          meaning: 'Not composed of matter; having no material body or form.',
          example: 'Spirits and theoretical concepts are intangible and incorporeal.',
          examTag: 'SSC CGL Mains'
        }
      ]
    }
  },

  // =========================================================================
  // LEVEL 3: POWER, SOCIETY, GOVERNANCE, BELIEFS & NATURE (10 ROOT WORDS)
  // =========================================================================
  {
    id: 'v-root-l3-s1-1',
    word: 'Omni-',
    phonetic: '/ˈɒm.ni/',
    hindi: 'सर्व / सब / समस्त',
    type: 'root',
    partOfSpeech: 'Prefix / Root',
    meaning: 'Latin root "Omnis" meaning "All" or "Every". It forms words describing infinite capacities, total reach, and universal presence.',
    synonyms: ['All', 'Universal', 'Everywhere', 'All-encompassing'],
    antonyms: ['Micro-', 'Partial', 'Limited'],
    example: 'The doctrine proclaims God as omniscient, omnipotent, and omnipresent.',
    mnemonic: 'Omni = All (Omni van me sab log baith sakte hain -> Omni means All!).',
    frequency: 'Repeated',
    examTags: ['SSC CGL', 'CHSL', 'CPO', 'Level 3', 'Set 01', 'Root Words'],
    collocation: 'Root in Omniscient, Omnipotent, Omnipresent, Omnivorous',
    derivatives: 'Omniscient, Omnipotent, Omnipresent, Omnivorous, Omnibus',
    level: 'level-3',
    set: 'set-01',
    rootFamily: {
      origin: 'Latin',
      coreMeaning: 'All / Everything / Entire (सर्व / सब कुछ)',
      derivatives: [
        {
          word: 'Omniscient',
          partOfSpeech: 'Adjective',
          breakdown: 'Omni (All) + Scient (Knowing / Sci-)',
          hindi: 'सर्वज्ञानी / सब कुछ जानने वाला',
          meaning: 'Knowing everything; having infinite knowledge and insight.',
          example: 'The novel features an omniscient narrator who knows the private thoughts of every character.',
          examTag: 'SSC CGL (Top OWS)'
        },
        {
          word: 'Omnipotent',
          partOfSpeech: 'Adjective',
          breakdown: 'Omni (All) + Potent (Power / Strength)',
          hindi: 'सर्वशक्तिमान / असीम शक्तिशाली',
          meaning: 'Having unlimited power; able to do anything.',
          example: 'Ancient myths depicted Zeus as an omnipotent ruler of the heavens.',
          examTag: 'SSC CGL (Top OWS)'
        },
        {
          word: 'Omnipresent',
          partOfSpeech: 'Adjective',
          breakdown: 'Omni (All) + Present (Existing here)',
          hindi: 'सर्वव्यापी / हर जगह विद्यमान',
          meaning: 'Widely or constantly encountered; widespread; present everywhere at once.',
          example: 'Smartphones have become an omnipresent feature of modern urban existence.',
          examTag: 'SSC CGL / CHSL'
        },
        {
          word: 'Omnivorous',
          partOfSpeech: 'Adjective',
          breakdown: 'Omni (All) + Vor (Eat) + ous',
          hindi: 'सर्वाहारी (पौधे व मांस दोनों खाने वाला)',
          meaning: 'Feeding on food of both plant and animal origin.',
          example: 'Bears and humans possess omnivorous diets that adapt readily to changing seasons.',
          examTag: 'SSC CGL / MTS'
        },
        {
          word: 'Omnibus',
          partOfSpeech: 'Noun',
          breakdown: 'Omni (For all) + bus',
          hindi: 'सर्वसंग्रह / कई कृतियों का संकलन',
          meaning: 'A volume containing several novels or other items previously published separately.',
          example: 'The publisher released a single hardcover omnibus featuring all three fantasy trilogies.',
          examTag: 'SSC CPO'
        }
      ]
    }
  },
  {
    id: 'v-root-l3-s1-2',
    word: 'Pan- / Panto-',
    phonetic: '/pæn/',
    hindi: 'सम्पूर्ण / अखिल / सर्व',
    type: 'root',
    partOfSpeech: 'Root Word',
    meaning: 'Greek root "Pan" meaning "All", "Every", or "Whole". It forms words describing universal solutions, sweeping views, and all-encompassing assemblies.',
    synonyms: ['All', 'Universal', 'Worldwide', 'Entire'],
    antonyms: ['Local', 'Particular', 'Specific'],
    example: 'Health agencies worked together to contain the dangerous worldwide pandemic.',
    mnemonic: 'Panacea = ram-baan sabhi bimariyon ka ilaj. Panorama = charo taraf ka drishya.',
    frequency: 'Repeated',
    examTags: ['SSC CGL', 'CHSL', 'CPO', 'Level 3', 'Set 01', 'Root Words'],
    collocation: 'Root in Panacea, Pandemic, Panorama, Pandemonium',
    derivatives: 'Panacea, Pandemic, Panorama, Pandemonium, Pantheon',
    level: 'level-3',
    set: 'set-01',
    rootFamily: {
      origin: 'Greek',
      coreMeaning: 'All / Whole / Universal (सम्पूर्ण / अखिल / सर्व)',
      derivatives: [
        {
          word: 'Panacea',
          partOfSpeech: 'Noun',
          breakdown: 'Pan (All) + Akeisthai (Heal / Cure)',
          hindi: 'रामबाण / सब रोगों की अचूक दवा',
          meaning: 'A solution or remedy for all difficulties or diseases.',
          example: 'Education is considered the greatest panacea for socioeconomic poverty.',
          examTag: 'SSC CGL (Top Repeated OWS)'
        },
        {
          word: 'Pandemic',
          partOfSpeech: 'Noun / Adjective',
          breakdown: 'Pan (All) + Demos (People / World)',
          hindi: 'महामारी / विश्वव्यापी रोग',
          meaning: 'An outbreak of a disease prevalent over a whole country or the world.',
          example: 'The 1918 influenza pandemic infected roughly one-third of the global population.',
          examTag: 'SSC CGL / CHSL'
        },
        {
          word: 'Panorama',
          partOfSpeech: 'Noun',
          breakdown: 'Pan (All) + Horama (View / Sight)',
          hindi: 'विहंगम दृश्य / चारों ओर का परिदृश्य',
          meaning: 'An unbroken view of the whole region surrounding an observer.',
          example: 'Standing atop the peak, hikers enjoyed a breathtaking panorama of the snowy mountain range.',
          examTag: 'SSC CGL OWS'
        },
        {
          word: 'Pandemonium',
          partOfSpeech: 'Noun',
          breakdown: 'Pan (All) + Daimon (Demons)',
          hindi: 'भारी कोलाहल / अफरा-तफरी / हाहाकार',
          meaning: 'Wild and noisy disorder or confusion; uproar.',
          example: 'Pandemonium erupted in the trading hall when the stock exchange crashed.',
          examTag: 'SSC CGL (Top Repeated)'
        },
        {
          word: 'Pantheon',
          partOfSpeech: 'Noun',
          breakdown: 'Pan (All) + Theos (Gods)',
          hindi: 'सर्वदेव मंदिर / पूज्य विभूतियों का समूह',
          meaning: 'All the gods of a people or religion; a building dedicated to all gods.',
          example: 'Albert Einstein holds a permanent place in the pantheon of scientific giants.',
          examTag: 'SSC CGL OWS'
        }
      ]
    }
  },
  {
    id: 'v-root-l3-s1-3',
    word: 'The- / Theo-',
    phonetic: '/θiː/',
    hindi: 'ईश्वर / धर्म / आस्था',
    type: 'root',
    partOfSpeech: 'Root Word',
    meaning: 'Greek root "Theos" meaning "God" or "Deity". It forms words describing religious belief systems, theology, and forms of government based on faith.',
    synonyms: ['Divine', 'Godly', 'Spiritual', 'Religious'],
    antonyms: ['Secular', 'Non-religious'],
    example: 'Scholars of theology study sacred texts to understand the nature of the divine.',
    mnemonic: 'Theo = Bhagwan / God (Theist = Astik, Atheist = Nastik, Theocracy = Dharam-tantra).',
    frequency: 'Repeated',
    examTags: ['SSC CGL', 'CHSL', 'CPO', 'Level 3', 'Set 01', 'Root Words'],
    collocation: 'Root in Theist, Atheist, Theocracy, Theology, Pantheist',
    derivatives: 'Theist, Atheist, Theocracy, Theology, Pantheist, Monotheism, Polytheism',
    level: 'level-3',
    set: 'set-01',
    rootFamily: {
      origin: 'Greek',
      coreMeaning: 'God / Religion / Divinity (ईश्वर / धर्म)',
      derivatives: [
        {
          word: 'Theist',
          partOfSpeech: 'Noun',
          breakdown: 'The (God) + ist (Believer)',
          hindi: 'आस्तिक / ईश्वर में विश्वास रखने वाला',
          meaning: 'A person who believes in the existence of a god or gods.',
          example: 'As a devout theist, he began every morning with prayers of gratitude.',
          examTag: 'SSC CGL OWS'
        },
        {
          word: 'Atheist',
          partOfSpeech: 'Noun',
          breakdown: 'A (Without) + The (God) + ist',
          hindi: 'नास्तिक / ईश्वर को न मानने वाला',
          meaning: 'A person who disbelieves or lacks belief in the existence of God or gods.',
          example: 'The rationalist stated he was an atheist who relied solely on scientific empirical evidence.',
          examTag: 'SSC CGL (Top OWS)'
        },
        {
          word: 'Theocracy',
          partOfSpeech: 'Noun',
          breakdown: 'Theo (God / Priests) + Cracy (Rule)',
          hindi: 'धर्मतंत्र / पादरी-शासन',
          meaning: 'A system of government in which priests rule in the name of God or a god.',
          example: 'Ancient Egypt was effectively a theocracy where the Pharaoh was revered as a living deity.',
          examTag: 'SSC CGL OWS'
        },
        {
          word: 'Theology',
          partOfSpeech: 'Noun',
          breakdown: 'Theo (God) + Logy (Study)',
          hindi: 'धर्मशास्त्र / ईश्वरीय अध्ययन',
          meaning: 'The study of the nature of God and religious belief.',
          example: 'She completed a master’s degree in comparative Christian and Islamic theology.',
          examTag: 'SSC CHSL OWS'
        },
        {
          word: 'Pantheist',
          partOfSpeech: 'Noun',
          breakdown: 'Pan (All) + The (God) + ist',
          hindi: 'सर्वेश्वरवादी (जो प्रकृति को ही ईश्वर माने)',
          meaning: 'A person who believes that God is synonymous with the entire universe and nature.',
          example: 'Spinoza was considered a classical pantheist who viewed nature and divinity as identical.',
          examTag: 'SSC CGL Mains'
        },
        {
          word: 'Monotheism',
          partOfSpeech: 'Noun',
          breakdown: 'Mono (One) + The (God) + ism (Belief)',
          hindi: 'एकेश्वरवाद / एक ही ईश्वर में विश्वास',
          meaning: 'The doctrine or belief that there is only one God.',
          example: 'Judaism and Islam are foundational examples of strict monotheism.',
          examTag: 'SSC CGL'
        }
      ]
    }
  },
  {
    id: 'v-root-l3-s1-4',
    word: 'Cracy- / Crat-',
    phonetic: '/kræ.si/',
    hindi: 'शासन / व्यवस्था / तंत्र',
    type: 'root',
    partOfSpeech: 'Root Word',
    meaning: 'Greek root "Kratos" meaning "Rule", "Power", or "Sovereignty". It forms words describing systems of government and authority.',
    synonyms: ['Rule', 'Government', 'Authority', 'Regime'],
    antonyms: ['Anarchy', 'Disorder'],
    example: 'India is the world’s largest thriving democracy with vibrant voter participation.',
    mnemonic: 'Democracy = janta ka shasan. Plutocracy = ameer logon ka shasan.',
    frequency: 'Repeated',
    examTags: ['SSC CGL', 'CHSL', 'CPO', 'Level 3', 'Set 01', 'Root Words'],
    collocation: 'Root in Democracy, Plutocracy, Aristocracy, Bureaucracy',
    derivatives: 'Democracy, Autocracy, Aristocracy, Bureaucracy, Plutocracy, Oligarchy',
    level: 'level-3',
    set: 'set-01',
    rootFamily: {
      origin: 'Greek',
      coreMeaning: 'Rule / Governance / Power (शासन / तंत्र / सत्ता)',
      derivatives: [
        {
          word: 'Democracy',
          partOfSpeech: 'Noun',
          breakdown: 'Demo (People) + Cracy (Rule)',
          hindi: 'लोकतंत्र / प्रजातंत्र',
          meaning: 'A system of government by the whole population, typically through elected representatives.',
          example: 'Free and fair elections are the cornerstone of a genuine democracy.',
          examTag: 'SSC CGL OWS'
        },
        {
          word: 'Plutocracy',
          partOfSpeech: 'Noun',
          breakdown: 'Ploutos (Wealth) + Cracy (Rule)',
          hindi: 'धनिकतंत्र / अमीरों का शासन',
          meaning: 'Government by the wealthy class of society.',
          example: 'Critics argued that campaign deregulation turned the political system into a plutocracy.',
          examTag: 'SSC CGL (Top OWS)'
        },
        {
          word: 'Aristocracy',
          partOfSpeech: 'Noun',
          breakdown: 'Aristos (Best / Noble) + Cracy (Rule)',
          hindi: 'कुलीनतंत्र / उच्च वर्ग का शासन',
          meaning: 'The highest class in certain societies, especially those holding hereditary titles.',
          example: 'In pre-revolutionary France, the hereditary aristocracy paid virtually no taxes.',
          examTag: 'SSC CGL OWS'
        },
        {
          word: 'Bureaucracy',
          partOfSpeech: 'Noun',
          breakdown: 'Bureau (Office desk) + Cracy (Rule)',
          hindi: 'नौकरशाही / लालफीताशाही',
          meaning: 'A system of government in which most decisions are made by state officials rather than elected reps.',
          example: 'Entrepreneurs often complain about excessive bureaucratic paperwork delaying project permits.',
          examTag: 'SSC CHSL OWS'
        },
        {
          word: 'Autocracy',
          partOfSpeech: 'Noun',
          breakdown: 'Auto (Self / Single) + Cracy (Rule)',
          hindi: 'एकतंत्र / निरंकुश तानाशाही',
          meaning: 'A system of government by one person with absolute power.',
          example: 'Tsarist Russia functioned as an autocracy with no legislative checks on the monarch.',
          examTag: 'SSC CGL OWS'
        }
      ]
    }
  },
  {
    id: 'v-root-l3-s1-5',
    word: 'Arch- / Archy-',
    phonetic: '/ɑːk/',
    hindi: 'शासक / प्रधान / व्यवस्था / प्रमुख',
    type: 'root',
    partOfSpeech: 'Root Word',
    meaning: 'Greek root "Archein / Arkhos" meaning "To rule", "First", or "Chief". It forms words describing leadership, political structures, and disorder.',
    synonyms: ['Chief', 'Ruler', 'Hierarchy', 'Origin'],
    antonyms: ['Subordinate', 'Follower'],
    example: 'The kingdom transitioned peacefully from an absolute monarchy to a constitutional republic.',
    mnemonic: 'Monarchy = Raja ka raj (Mono=1). Anarchy = Bina raj (A=without).',
    frequency: 'Repeated',
    examTags: ['SSC CGL', 'CHSL', 'CPO', 'Level 3', 'Set 01', 'Root Words'],
    collocation: 'Root in Monarchy, Anarchy, Hierarchy, Matriarchy, Patriarchy',
    derivatives: 'Monarchy, Anarchy, Hierarchy, Matriarchy, Patriarchy, Oligarchy',
    level: 'level-3',
    set: 'set-01',
    rootFamily: {
      origin: 'Greek',
      coreMeaning: 'Rule / Chief / Origin (शासक / प्रधान / सत्ता)',
      derivatives: [
        {
          word: 'Monarchy',
          partOfSpeech: 'Noun',
          breakdown: 'Mono (One) + Archy (Rule)',
          hindi: 'राजतंत्र / एक राजा का शासन',
          meaning: 'A form of government with a monarch (king or queen) at the head.',
          example: 'Britain operates as a constitutional monarchy with an elected parliament.',
          examTag: 'SSC CGL OWS'
        },
        {
          word: 'Anarchy',
          partOfSpeech: 'Noun',
          breakdown: 'An (Without) + Archy (Ruler / Law)',
          hindi: 'अराजकता / अव्यवस्था / कानूनहीनता',
          meaning: 'A state of disorder due to absence or non-recognition of authority or other controlling systems.',
          example: 'Following the overthrow of the dictator, the nation plunged into lawless anarchy.',
          examTag: 'SSC CGL (Top Repeated OWS)'
        },
        {
          word: 'Hierarchy',
          partOfSpeech: 'Noun',
          breakdown: 'Hieros (Sacred) + Archy (Rule)',
          hindi: 'पदानुक्रम / श्रेणीबद्ध व्यवस्था',
          meaning: 'A system in which members of an organization are ranked according to relative status or authority.',
          example: 'Military commands adhere to a rigid chain of hierarchy.',
          examTag: 'SSC CHSL OWS'
        },
        {
          word: 'Matriarchy',
          partOfSpeech: 'Noun',
          breakdown: 'Mater (Mother) + Archy (Rule)',
          hindi: 'मातृसत्ता / महिला-प्रधान व्यवस्था',
          meaning: 'A system of society or government ruled by a woman or women.',
          example: 'Certain tribal societies in Northeast India practice traditional matriarchy.',
          examTag: 'SSC CGL OWS'
        },
        {
          word: 'Patriarchy',
          partOfSpeech: 'Noun',
          breakdown: 'Pater (Father) + Archy (Rule)',
          hindi: 'पितृसत्ता / पुरुष-प्रधान व्यवस्था',
          meaning: 'A system of society or government in which men hold primary power.',
          example: 'Feminist movements have fought for generations to dismantle entrenched patriarchy.',
          examTag: 'SSC CGL OWS'
        }
      ]
    }
  },
  {
    id: 'v-root-l3-s1-6',
    word: 'Dem- / Demo-',
    phonetic: '/dɛm/',
    hindi: 'जनता / जनसमूह / लोग',
    type: 'root',
    partOfSpeech: 'Root Word',
    meaning: 'Greek root "Demos" meaning "The people" or "Population". It forms words describing populations, mass leadership, and civic diseases.',
    synonyms: ['People', 'Population', 'Public', 'Citizens'],
    antonyms: ['Individual', 'Solitary'],
    example: 'The political activist was accused of being a demagogue who manipulated public fears.',
    mnemonic: 'Democracy = janta ka shasan. Demography = janta/aabadi ka aakda.',
    frequency: 'Repeated',
    examTags: ['SSC CGL', 'CHSL', 'Level 3', 'Set 01', 'Root Words'],
    collocation: 'Root in Democracy, Demography, Demagogue, Epidemic',
    derivatives: 'Democracy, Demography, Demagogue, Epidemic, Endemic',
    level: 'level-3',
    set: 'set-01',
    rootFamily: {
      origin: 'Greek',
      coreMeaning: 'People / Population (जनता / जनसमूह)',
      derivatives: [
        {
          word: 'Demagogue',
          partOfSpeech: 'Noun',
          breakdown: 'Demo (People) + Agogos (Leader)',
          hindi: 'जनोत्तेजक नेता / भड़काऊ भाषण देने वाला नेता',
          meaning: 'A political leader who seeks support by appealing to popular desires and prejudices rather than rational argument.',
          example: 'The demagogue whipped the stadium crowd into a frenzy with fiery nationalist slogans.',
          examTag: 'SSC CGL (Top Repeated OWS)'
        },
        {
          word: 'Demography',
          partOfSpeech: 'Noun',
          breakdown: 'Demo (People) + Graphy (Writing / Statistics)',
          hindi: 'जनसांख्यिकी / जनसंख्या का सांख्यिकीय अध्ययन',
          meaning: 'The study of statistics such as births, deaths, income, or incidence of disease.',
          example: 'Demography indicates that developing economies possess an advantageous youthful workforce.',
          examTag: 'SSC CGL OWS'
        },
        {
          word: 'Epidemic',
          partOfSpeech: 'Noun / Adjective',
          breakdown: 'Epi (Upon) + Demos (People)',
          hindi: 'महामारी / जनपदिक रोग',
          meaning: 'A widespread occurrence of an infectious disease in a community at a particular time.',
          example: 'Public health authorities took aggressive steps to arrest the cholera epidemic.',
          examTag: 'SSC CHSL OWS'
        },
        {
          word: 'Endemic',
          partOfSpeech: 'Adjective',
          breakdown: 'En (In) + Demos (People)',
          hindi: 'स्थानिक / किसी विशेष क्षेत्र में निरंतर पाया जाने वाला',
          meaning: 'Regularly found among particular people or in a certain area.',
          example: 'Malaria is endemic to warm, humid tropical rainforest regions.',
          examTag: 'SSC CGL OWS'
        }
      ]
    }
  },
  {
    id: 'v-root-l3-s1-7',
    word: 'Anthro- / Anthrop-',
    phonetic: '/ænˈθrɒp/',
    hindi: 'मानव / मनुष्य / इंसानियत',
    type: 'root',
    partOfSpeech: 'Root Word',
    meaning: 'Greek root "Anthropos" meaning "Man", "Human", or "Mankind". It forms words describing the study, love, and hatred of human beings.',
    synonyms: ['Human', 'Mankind', 'Humanity', 'Person'],
    antonyms: ['Animal', 'Inanimate'],
    example: 'Anthropology provides deep insight into early hunter-gatherer societal habits.',
    mnemonic: 'Anthropology = manav ka adhyayan. Philanthropist = manavta se pyar karne wala.',
    frequency: 'Repeated',
    examTags: ['SSC CGL', 'CHSL', 'CPO', 'Level 3', 'Set 01', 'Root Words'],
    collocation: 'Root in Anthropology, Philanthropy, Misanthrope',
    derivatives: 'Anthropology, Philanthropy, Misanthrope, Anthropomorphic, Anthropoid',
    level: 'level-3',
    set: 'set-01',
    rootFamily: {
      origin: 'Greek',
      coreMeaning: 'Human / Mankind (मानव / इंसानियत)',
      derivatives: [
        {
          word: 'Anthropology',
          partOfSpeech: 'Noun',
          breakdown: 'Anthrop (Human) + Logy (Study)',
          hindi: 'मानव विज्ञान / नृविज्ञान',
          meaning: 'The study of human societies and cultures and their development.',
          example: 'He conducted fieldwork in Amazonian villages to complete his doctoral thesis in anthropology.',
          examTag: 'SSC CGL (Top OWS)'
        },
        {
          word: 'Anthropomorphic',
          partOfSpeech: 'Adjective',
          breakdown: 'Anthrop (Human) + Morph (Shape / Form) + ic',
          hindi: 'मानवरूपी / मानवीय गुणों से युक्त',
          meaning: 'Having human characteristics, form, or personality attributed to a god, animal, or object.',
          example: 'Cartoon stories frequently star anthropomorphic animals like talking rabbits and bears.',
          examTag: 'SSC CGL Mains'
        },
        {
          word: 'Anthropoid',
          partOfSpeech: 'Adjective / Noun',
          breakdown: 'Anthrop (Human) + Oid (Resembling)',
          hindi: 'मानव सदृश / कपि सदृश',
          meaning: 'Resembling a human being in form, such as higher primates (apes).',
          example: 'Chimpanzees and gorillas belong to the anthropoid family of primates.',
          examTag: 'SSC CHSL'
        }
      ]
    }
  },
  {
    id: 'v-root-l3-s1-8',
    word: 'Vor- / Vorous- vs Phag-',
    phonetic: '/vɔː/',
    hindi: 'खाना / भक्षण करना / निगलना',
    type: 'root',
    partOfSpeech: 'Root Word',
    meaning: 'Latin "Vorare" (to devour) and Greek "Phagein" (to eat). It forms words describing dietary categories, eating habits, and ravenous appetite.',
    synonyms: ['Eat', 'Devour', 'Consume', 'Swallow'],
    antonyms: ['Abstain', 'Fast', 'Starve'],
    example: 'He is an exceptionally voracious reader who finishes three books every weekend.',
    mnemonic: 'Herbivorous = ghaas khane wala. Carnivorous = maans khane wala. Voracious = bhukkad.',
    frequency: 'Repeated',
    examTags: ['SSC CGL', 'CHSL', 'Level 3', 'Set 01', 'Root Words'],
    collocation: 'Root in Voracious, Herbivorous, Carnivorous, Omnivorous',
    derivatives: 'Herbivorous, Carnivorous, Omnivorous, Voracious, Sarcophagus',
    level: 'level-3',
    set: 'set-01',
    rootFamily: {
      origin: 'Latin / Greek',
      coreMeaning: 'Eat / Devour / Consume (खाना / भक्षण / निगलना)',
      derivatives: [
        {
          word: 'Voracious',
          partOfSpeech: 'Adjective',
          breakdown: 'Vor (Devour) + acious (Full of)',
          hindi: 'पेटू / भुक्खड़ / अत्यंत उत्साही',
          meaning: 'Wanting or devouring great quantities of food; having a very eager approach to an activity.',
          example: 'After the grueling marathon, the athletes possessed a voracious appetite.',
          examTag: 'SSC CGL (Top Repeated)'
        },
        {
          word: 'Herbivorous',
          partOfSpeech: 'Adjective',
          breakdown: 'Herba (Plant) + Vor (Eat) + ous',
          hindi: 'शाकाहारी (पेड़-पौधे खाने वाला)',
          meaning: 'Feeding on plants and vegetation only.',
          example: 'Elephants, deer, and cows are prominent herbivorous mammals.',
          examTag: 'SSC CHSL OWS'
        },
        {
          word: 'Carnivorous',
          partOfSpeech: 'Adjective',
          breakdown: 'Carn (Flesh) + Vor (Eat) + ous',
          hindi: 'मांसाहारी (मांस खाने वाला)',
          meaning: 'Feeding on other animals; flesh-eating.',
          example: 'Tigers and lions are ferocious carnivorous apex predators.',
          examTag: 'SSC CHSL OWS'
        },
        {
          word: 'Sarcophagus',
          partOfSpeech: 'Noun',
          breakdown: 'Sarc (Flesh) + Phag (Eat)',
          hindi: 'पत्थर का प्राचीन ताबूत (शव-भक्षक)',
          meaning: 'A stone coffin, typically adorned with a sculpture or inscription.',
          example: 'Archaeologists unearthed the gold-leafed limestone sarcophagus of an Egyptian prince.',
          examTag: 'SSC CGL OWS'
        }
      ]
    }
  },
  {
    id: 'v-root-l3-s1-9',
    word: 'Gen- / Gener-',
    phonetic: '/dʒɛn/',
    hindi: 'उत्पत्ति / जन्म / प्रजाति / वंश',
    type: 'root',
    partOfSpeech: 'Root Word',
    meaning: 'Latin/Greek roots "Genus / Gignere / Genesis" meaning "Birth", "Kind", "Origin", or "Produce". It forms words describing origins, heredity, and diversity.',
    synonyms: ['Birth', 'Origin', 'Creation', 'Kind'],
    antonyms: ['Extinction', 'Destruction'],
    example: 'The genesis of the dispute started over a minor misunderstanding years ago.',
    mnemonic: 'Generation = naya janam. Genesis = shuruat/utpatti. Genocide = poore vansh ko maarna.',
    frequency: 'Repeated',
    examTags: ['SSC CGL', 'CHSL', 'Level 3', 'Set 01', 'Root Words'],
    collocation: 'Root in Genesis, Genocide, Heterogeneous, Homogeneous, Progeny',
    derivatives: 'Genesis, Genocide, Heterogeneous, Homogeneous, Progeny, Indigenous',
    level: 'level-3',
    set: 'set-01',
    rootFamily: {
      origin: 'Latin / Greek',
      coreMeaning: 'Birth / Origin / Kind / Class (जन्म / उत्पत्ति / वंश)',
      derivatives: [
        {
          word: 'Genesis',
          partOfSpeech: 'Noun',
          breakdown: 'Gen (Origin / Birth) + esis',
          hindi: 'उत्पत्ति / आरंभ / प्रारंभ',
          meaning: 'The origin or mode of formation of something.',
          example: 'Scientists are researching the cosmic genesis of the universe post-Big Bang.',
          examTag: 'SSC CGL'
        },
        {
          word: 'Genocide',
          partOfSpeech: 'Noun',
          breakdown: 'Gen (Race / Clan) + Cide (Kill)',
          hindi: 'नरसंहार / पूरी जाति का विनाश',
          meaning: 'The deliberate killing of a large number of people from a particular nation or ethnic group.',
          example: 'The international criminal court tried war criminals accused of orchestrating genocide.',
          examTag: 'SSC CGL (Top OWS)'
        },
        {
          word: 'Homogeneous',
          partOfSpeech: 'Adjective',
          breakdown: 'Homo (Same) + Gen (Kind) + eous',
          hindi: 'समांगी / एक समान प्रकृति का',
          meaning: 'Of the same kind; alike; consisting of parts all of the same kind.',
          example: 'The island nation had a largely homogeneous population with shared cultural values.',
          examTag: 'SSC CGL / CHSL'
        },
        {
          word: 'Heterogeneous',
          partOfSpeech: 'Adjective',
          breakdown: 'Hetero (Different) + Gen (Kind) + eous',
          hindi: 'विषमांगी / विविध प्रकार का',
          meaning: 'Diverse in character or content; composed of parts of different kinds.',
          example: 'The metropolis is a heterogeneous mosaic of ethnicities, cuisines, and languages.',
          examTag: 'SSC CGL / CHSL'
        },
        {
          word: 'Progeny',
          partOfSpeech: 'Noun',
          breakdown: 'Pro (Forward) + Gen (Birth) + y',
          hindi: 'संतान / वंशज',
          meaning: 'A descendant or the descendants of a person, animal, or plant; offspring.',
          example: 'The proud stallion produced prize-winning athletic progeny across the racing circuit.',
          examTag: 'SSC CPO OWS'
        }
      ]
    }
  },
  {
    id: 'v-root-l3-s1-10',
    word: 'Cogn- / Gno-',
    phonetic: '/kɒɡn/',
    hindi: 'जानना / पहचानना / बोध',
    type: 'root',
    partOfSpeech: 'Root Word',
    meaning: 'Latin "Cognoscere" and Greek "Gnosis" meaning "To know", "Recognize", or "Knowledge". It forms words describing awareness, diagnosis, and disguised identities.',
    synonyms: ['Know', 'Aware', 'Recognize', 'Perceive'],
    antonyms: ['Ignorant', 'Unaware'],
    example: 'Court authorities must take formal cognizance of the presented evidence.',
    mnemonic: 'Recognize = pehchanna. Incognito = bina pehchan ke ghumna. Diagnosis = bimari ko jaan-na.',
    frequency: 'Repeated',
    examTags: ['SSC CGL', 'CHSL', 'Level 3', 'Set 01', 'Root Words'],
    collocation: 'Root in Recognize, Cognizant, Incognito, Diagnosis, Agnostic',
    derivatives: 'Recognize, Cognizant, Incognito, Diagnosis, Prognosis, Agnostic',
    level: 'level-3',
    set: 'set-01',
    rootFamily: {
      origin: 'Latin / Greek',
      coreMeaning: 'Know / Recognize / Perceive (जानना / बोध / पहचान)',
      derivatives: [
        {
          word: 'Cognizant',
          partOfSpeech: 'Adjective',
          breakdown: 'Cogn (Know) + izant',
          hindi: 'अवगत / जानकार / संज्ञान में रखने वाला',
          meaning: 'Having knowledge or being aware of something.',
          example: 'Statesmen must remain fully cognizant of shifting geopolitical alignments.',
          examTag: 'SSC CGL'
        },
        {
          word: 'Incognito',
          partOfSpeech: 'Adjective / Adverb',
          breakdown: 'In (Not) + Cogn (Known) + ito',
          hindi: 'गुप्त वेश में / अपनी पहचान छिपाकर',
          meaning: 'Having one’s true identity concealed, especially to avoid notice.',
          example: 'The movie superstar traveled incognito wearing a dark hoodie and sunglasses.',
          examTag: 'SSC CGL (Top OWS)'
        },
        {
          word: 'Diagnosis',
          partOfSpeech: 'Noun',
          breakdown: 'Dia (Through) + Gnosis (Knowledge)',
          hindi: 'रोग-पहचान / निदान',
          meaning: 'The identification of the nature of an illness or problem by examination.',
          example: 'Accurate and timely diagnosis is critical for prescribing effective chemotherapy.',
          examTag: 'SSC CHSL OWS'
        },
        {
          word: 'Prognosis',
          partOfSpeech: 'Noun',
          breakdown: 'Pro (Before) + Gnosis (Knowledge)',
          hindi: 'रोग-पूर्वानुमान / भविष्य की संभावना',
          meaning: 'The likely course of a medical condition; a forecast of the future.',
          example: 'Doctors gave an optimistic prognosis regarding the patient’s full recovery.',
          examTag: 'SSC CGL OWS'
        },
        {
          word: 'Agnostic',
          partOfSpeech: 'Noun',
          breakdown: 'A (Without) + Gnost (Knowledge) + ic',
          hindi: 'अज्ञेयवादी (जो ईश्वर के अस्तित्व को अज्ञात माने)',
          meaning: 'A person who believes that nothing is known or can be known of the existence or nature of God.',
          example: 'While an atheist denies God’s existence, an agnostic claims it is fundamentally unknowable.',
          examTag: 'SSC CGL (Top Repeated OWS)'
        }
      ]
    }
  }
];
