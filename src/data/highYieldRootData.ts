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
    // =========================================================================
  // LEVEL 1 - SET 2: MIND, BELIEF, TRUTH, EMOTIONS & ACTION ROOTS (10 ROOT WORDS)
  // =========================================================================
  {
  "id": "v-root-l1-s2-1",
  "word": "Cred- / Credit-",
  "phonetic": "/krɛd/",
  "hindi": "विश्वास / भरोसा / साख",
  "type": "root",
  "partOfSpeech": "Verb Base / Root",
  "meaning": "Latin root \"Credere\" meaning \"To believe\", \"To trust\", or \"To have faith in\". It forms words describing trust, credibility, acceptance, and religious doctrines.",
  "synonyms": [
    "Belief",
    "Trust",
    "Faith",
    "Confidence",
    "Reliance"
  ],
  "antonyms": [
    "Skepticism",
    "Disbelief",
    "Incredulity",
    "Doubt"
  ],
  "example": "A credible witness provided compelling evidence that gave immediate credence to the claim.",
  "mnemonic": "Cred = Credit card (bank apko vishwas/bharose par paisa deta hai). Credulous = aasani se vishwas karne wala.",
  "frequency": "Repeated",
  "examTags": [
    "SSC CGL",
    "CHSL",
    "CPO",
    "Level 1",
    "Set 02",
    "Root Words"
  ],
  "collocation": "Root in Credence, Credible, Credulous, Incredulous, Creed",
  "derivatives": "Credulous, Incredulous, Credible, Incredible, Credence, Creed, Credentials, Accredit",
  "level": "level-1",
  "set": "set-02",
  "rootFamily": {
    "origin": "Latin",
    "coreMeaning": "Believe / Trust / Faith (विश्वास / भरोसा / साख)",
    "counterRoot": {
      "root": "Skept- / Incred-",
      "meaning": "Doubt / Disbelief (संदेह / अविश्वास)"
    },
    "derivatives": [
      {
        "word": "Credulous",
        "partOfSpeech": "Adjective",
        "breakdown": "Cred (Believe) + ulous (Tendency to)",
        "hindi": "कान का कच्चा / सहज विश्वासी / भोला-भाला",
        "meaning": "Having or showing too great a readiness to believe things without proper evidence.",
        "example": "Credulous investors fell into the fraudulent scheme and lost their lifetime savings.",
        "examTag": "SSC Repeated OWS"
      },
      {
        "word": "Incredulous",
        "partOfSpeech": "Adjective",
        "breakdown": "In (Not) + Cred (Believe) + ulous",
        "hindi": "संदेही / अविश्वासी / जिसे विश्वास न हो",
        "meaning": "Unwilling or unable to believe something; feeling or showing disbelief.",
        "example": "The detective listened to the suspect’s improbable alibi with an incredulous smile.",
        "examTag": "SSC CGL"
      },
      {
        "word": "Credible",
        "partOfSpeech": "Adjective",
        "breakdown": "Cred (Believe) + ible (Able to be)",
        "hindi": "विश्वसनीय / भरोसेमंद / प्रमाणिक",
        "meaning": "Able to be believed; convincing and trustworthy.",
        "example": "The intelligence agency gathered credible reports regarding the border infiltration.",
        "examTag": "SSC CHSL"
      },
      {
        "word": "Incredible",
        "partOfSpeech": "Adjective",
        "breakdown": "In (Not) + Cred (Believe) + ible",
        "hindi": "अविश्वसनीय / अद्भुत / असाधारण",
        "meaning": "Impossible or very difficult to believe; extraordinary in quality.",
        "example": "The athlete staged an incredible comeback in the final moments of the tournament.",
        "examTag": "SSC MTS"
      },
      {
        "word": "Credence",
        "partOfSpeech": "Noun",
        "breakdown": "Cred (Believe) + ence (State of)",
        "hindi": "विश्वास / साख / प्रमाणिकता",
        "meaning": "Belief in or acceptance of something as true and valid.",
        "example": "Recent scientific discoveries have lent substantial credence to the alternate hypothesis.",
        "examTag": "SSC CGL / CPO"
      },
      {
        "word": "Creed",
        "partOfSpeech": "Noun",
        "breakdown": "Cred (Belief)",
        "hindi": "धर्मसिद्धांत / मत / आस्था",
        "meaning": "A system of Christian or other religious belief; a formal statement of basic principles.",
        "example": "The constitution guarantees equal fundamental rights to all citizens irrespective of creed.",
        "examTag": "SSC CPO"
      },
      {
        "word": "Credentials",
        "partOfSpeech": "Noun",
        "breakdown": "Cred (Trust) + entials (Qualifications)",
        "hindi": "योग्यता प्रमाण-पत्र / साख / परिचय-पत्र",
        "meaning": "Qualifications, achievements, or personal quality used to indicate suitability for a role.",
        "example": "The ambassador presented his official diplomatic credentials to the President.",
        "examTag": "SSC CGL"
      }
    ]
  }
},

  {
  "id": "v-root-l1-s2-2",
  "word": "Fid- / Fide-",
  "phonetic": "/fɪd/",
  "hindi": "निष्ठा / वफादारी / विश्वास",
  "type": "root",
  "partOfSpeech": "Root Word",
  "meaning": "Latin root \"Fidere / Fides\" meaning \"To trust\" or \"Faith / Loyalty\". It forms words relating to honesty, betrayal, confidence, and sworn loyalty.",
  "synonyms": [
    "Faith",
    "Loyalty",
    "Trust",
    "Allegiance",
    "Constancy"
  ],
  "antonyms": [
    "Perfidy",
    "Treachery",
    "Betrayal",
    "Disloyalty"
  ],
  "example": "High fidelity audio equipment reproduces the exact recorded sound with absolute precision.",
  "mnemonic": "Fid = Fida / Vafadar (Dog is famous for fidelity = wafaadari). Perfidious = bura/dhokhebaaz (paraya kar de jo faith).",
  "frequency": "Repeated",
  "examTags": [
    "SSC CGL",
    "CHSL",
    "CPO",
    "Level 1",
    "Set 02",
    "Root Words"
  ],
  "collocation": "Root in Fidelity, Perfidious, Diffident, Confident, Affidavit",
  "derivatives": "Fidelity, Perfidious, Diffident, Confident, Bona fide, Affidavit, Infidelity",
  "level": "level-1",
  "set": "set-02",
  "rootFamily": {
    "origin": "Latin",
    "coreMeaning": "Faith / Trust / Loyalty (निष्ठा / वफादारी / विश्वास)",
    "counterRoot": {
      "root": "Perfidy / Diffid-",
      "meaning": "Treachery / Lack of Confidence (विश्वासघात / संकोच)"
    },
    "derivatives": [
      {
        "word": "Fidelity",
        "partOfSpeech": "Noun",
        "breakdown": "Fid (Faith) + elity (State)",
        "hindi": "सत्यनिष्ठा / वफादारी / निष्ठा",
        "meaning": "Faithfulness to a person, cause, or belief, demonstrated by continuing loyalty and support.",
        "example": "The devoted bodyguard served the royal family with unswerving fidelity for forty years.",
        "examTag": "SSC CGL"
      },
      {
        "word": "Perfidious",
        "partOfSpeech": "Adjective",
        "breakdown": "Per (Away/Through) + Fid (Faith) + ious",
        "hindi": "विश्वासघाती / धोखेबाज / नमकहराम",
        "meaning": "Deceitful and untrustworthy; deliberately breaking faith or trust.",
        "example": "History condemns the perfidious general who sold defense blueprints to foreign adversaries.",
        "examTag": "SSC Repeated Syn/Ant"
      },
      {
        "word": "Diffident",
        "partOfSpeech": "Adjective",
        "breakdown": "Dif (Away/Not) + Fid (Trust/Confidence) + ent",
        "hindi": "संकोची / आत्मसंशयग्रस्त / शर्मीला",
        "meaning": "Modest or shy because of a lack of self-confidence; hesitating to assert oneself.",
        "example": "Though exceptionally brilliant, the young scholar remained diffident during public presentations.",
        "examTag": "SSC CGL / CHSL"
      },
      {
        "word": "Confident",
        "partOfSpeech": "Adjective",
        "breakdown": "Con (Thoroughly) + Fid (Trust) + ent",
        "hindi": "आत्मविश्वासी / आश्वस्त / निडर",
        "meaning": "Feeling or showing certainty about something; sure of one’s ability or successful outcome.",
        "example": "Rigorous preparation made him completely confident of securing a top rank in the exam.",
        "examTag": "SSC MTS"
      },
      {
        "word": "Bona fide",
        "partOfSpeech": "Adjective",
        "breakdown": "Bona (Good) + Fide (Faith)",
        "hindi": "वास्तविक / प्रामाणिक / नेकनीयत",
        "meaning": "Genuine, real, and undertaken in good faith without intent to deceive.",
        "example": "Only bona fide members holding valid photo identity cards were admitted into the symposium.",
        "examTag": "SSC CPO"
      },
      {
        "word": "Affidavit",
        "partOfSpeech": "Noun",
        "breakdown": "Ad (To) + Fid (Faith / Sworn trust)",
        "hindi": "शपथ-पत्र / हलफनामा",
        "meaning": "A written statement confirmed by oath or affirmation, used as official evidence in court.",
        "example": "The witness submitted a notarized affidavit detailing the exact sequence of the collision.",
        "examTag": "SSC CGL"
      },
      {
        "word": "Infidelity",
        "partOfSpeech": "Noun",
        "breakdown": "In (Not) + Fid (Faith) + elity",
        "hindi": "बेवफाई / विश्वासघात / अविश्वास",
        "meaning": "The action or state of being unfaithful to a partner, pledge, or sworn moral duty.",
        "example": "Marital infidelity and prolonged deception ultimately led to their legal separation.",
        "examTag": "SSC CHSL"
      }
    ]
  }
},

  {
  "id": "v-root-l1-s2-3",
  "word": "Ver- / Veri-",
  "phonetic": "/vɛr/",
  "hindi": "सत्य / यथार्थ / सच्चाई",
  "type": "root",
  "partOfSpeech": "Root Word",
  "meaning": "Latin root \"Verus\" meaning \"True\" or \"Truth\". It forms words describing genuine facts, honesty, verification, and realistic depiction.",
  "synonyms": [
    "Truth",
    "Accuracy",
    "Fact",
    "Genuineness",
    "Authenticity"
  ],
  "antonyms": [
    "Falsity",
    "Deception",
    "Fabrication",
    "Fallacy"
  ],
  "example": "The court scrutinized the document to ensure the absolute veracity of the claims.",
  "mnemonic": "Ver = Very True (Sach / Satya). Verify = sachhai jaanch-na. Veracity = sach bolne ki aadat.",
  "frequency": "Repeated",
  "examTags": [
    "SSC CGL",
    "CHSL",
    "CPO",
    "Level 1",
    "Set 02",
    "Root Words"
  ],
  "collocation": "Root in Veracity, Veracious, Verify, Verdict, Verisimilitude",
  "derivatives": "Veracity, Veracious, Verify, Verisimilitude, Verdict, Aver, Veritable",
  "level": "level-1",
  "set": "set-02",
  "rootFamily": {
    "origin": "Latin",
    "coreMeaning": "Truth / True / Genuine (सत्य / यथार्थ / सच्चाई)",
    "counterRoot": {
      "root": "Fall- / Fals-",
      "meaning": "False / Deceptive (असत्य / भ्रामक)"
    },
    "derivatives": [
      {
        "word": "Veracity",
        "partOfSpeech": "Noun",
        "breakdown": "Ver (Truth) + acity (Quality of)",
        "hindi": "सत्यवादिता / यथार्थता / सच्चाई",
        "meaning": "Conformity to facts; habitual truthfulness and precision of reporting.",
        "example": "The committee cross-examined officials to verify the veracity of the viral allegations.",
        "examTag": "SSC Repeated OWS"
      },
      {
        "word": "Veracious",
        "partOfSpeech": "Adjective",
        "breakdown": "Ver (Truth) + acious (Full of)",
        "hindi": "सत्यवादी / सच्चा / निष्कपट",
        "meaning": "Habitually speaking or representing the truth; honest and factual.",
        "example": "A veracious historian documents events objectively without romanticizing political figures.",
        "examTag": "SSC CGL"
      },
      {
        "word": "Verisimilitude",
        "partOfSpeech": "Noun",
        "breakdown": "Veri (True) + Similis (Similar / Like) + tude",
        "hindi": "सत्य जैसा आभास / वास्तविकता की प्रतीति",
        "meaning": "The appearance or semblance of truth; realism in art, theatre, or literature.",
        "example": "The director added authentic street sounds and costumes to impart total verisimilitude to the period film.",
        "examTag": "SSC CGL Mains"
      },
      {
        "word": "Verify",
        "partOfSpeech": "Verb",
        "breakdown": "Veri (True) + fy (To make / Prove)",
        "hindi": "सत्यापित करना / जांच करना / पुष्ट करना",
        "meaning": "Make sure or demonstrate that something is true, accurate, or justified.",
        "example": "Users must enter a one-time passcode to verify their login identity securely.",
        "examTag": "SSC CHSL"
      },
      {
        "word": "Verdict",
        "partOfSpeech": "Noun",
        "breakdown": "Ver (True) + Dict (Speak / State)",
        "hindi": "फैसला / निर्णय / सर्वसम्मत राय",
        "meaning": "A decision on an issue of fact in a civil or criminal case, delivered by a judge or jury.",
        "example": "The jury deliberated for eight hours before returning a unanimous verdict of not guilty.",
        "examTag": "SSC MTS"
      },
      {
        "word": "Aver",
        "partOfSpeech": "Verb",
        "breakdown": "Ad (To) + Ver (True)",
        "hindi": "दृढ़तापूर्वक सच बताना / दावा करना",
        "meaning": "State or assert to be the case firmly and positively.",
        "example": "The lead scientist averred that the newly synthesized vaccine would prevent viral transmission.",
        "examTag": "SSC CPO"
      },
      {
        "word": "Veritable",
        "partOfSpeech": "Adjective",
        "breakdown": "Ver (True) + itable (Fit to be)",
        "hindi": "वास्तविक / यथार्थ / असली",
        "meaning": "Used as an intensifier, often to qualify a metaphor (meaning real or genuine).",
        "example": "The city library was a veritable treasure trove of ancient manuscripts and rare folios.",
        "examTag": "SSC CGL"
      }
    ]
  }
},

  {
  "id": "v-root-l1-s2-4",
  "word": "Anim-",
  "phonetic": "/ænɪm/",
  "hindi": "मन / चेतना / प्राण / साहस",
  "type": "root",
  "partOfSpeech": "Root Word",
  "meaning": "Latin roots \"Animus\" (mind, soul, spirit, courage) and \"Anima\" (breath, life). It forms words representing mental state, boldness, living breath, and forgiveness.",
  "synonyms": [
    "Spirit",
    "Mind",
    "Soul",
    "Life",
    "Courage"
  ],
  "antonyms": [
    "Inanimate",
    "Pusillanimity",
    "Lifelessness"
  ],
  "example": "She faced the daunting tragedy with extraordinary fortitude and equanimity.",
  "mnemonic": "Anim = Animal (jisme jeev/jaan ho). Magnanimous = bada dil/mann wala. Animosity = dushmani ka mann.",
  "frequency": "Repeated",
  "examTags": [
    "SSC CGL",
    "CHSL",
    "CPO",
    "Level 1",
    "Set 02",
    "Root Words"
  ],
  "collocation": "Root in Magnanimous, Pusillanimous, Equanimity, Animosity, Unanimous",
  "derivatives": "Magnanimous, Pusillanimous, Equanimity, Animosity, Unanimous, Animated",
  "level": "level-1",
  "set": "set-02",
  "rootFamily": {
    "origin": "Latin",
    "coreMeaning": "Mind / Soul / Spirit / Courage (मन / चेतना / प्राण / साहस)",
    "counterRoot": {
      "root": "Pusill- / Inanim-",
      "meaning": "Cowardly / Small-spirited / Lifeless (कायर / निर्जीव)"
    },
    "derivatives": [
      {
        "word": "Magnanimous",
        "partOfSpeech": "Adjective",
        "breakdown": "Magn (Great / Large) + Anim (Mind / Spirit) + ous",
        "hindi": "उदार / बड़े दिल वाला / क्षमाशील",
        "meaning": "Generous or forgiving, especially toward a rival, vanquished foe, or subordinate.",
        "example": "In a magnanimous gesture, the victorious captain praised the defeated squad’s heroic defense.",
        "examTag": "SSC Repeated Syn/Ant"
      },
      {
        "word": "Pusillanimous",
        "partOfSpeech": "Adjective",
        "breakdown": "Pusill (Tiny / Weak) + Anim (Spirit) + ous",
        "hindi": "कायर / डरपोक / क्षुद्रहृदय",
        "meaning": "Showing a lack of courage, resolve, or determination; timid and cowardly.",
        "example": "The cowardly minister was criticized for his pusillanimous refusal to confront corrupt officials.",
        "examTag": "SSC CGL Mains"
      },
      {
        "word": "Equanimity",
        "partOfSpeech": "Noun",
        "breakdown": "Equ (Equal / Even) + Anim (Mind) + ity",
        "hindi": "समभाव / धैर्य / मानसिक संतुलन",
        "meaning": "Mental calmness, composure, and evenness of temper, especially in difficult circumstances.",
        "example": "The seasoned pilot handled the engine emergency with exceptional poise and equanimity.",
        "examTag": "SSC CGL"
      },
      {
        "word": "Animosity",
        "partOfSpeech": "Noun",
        "breakdown": "Anim (Hostile spirit) + osity (State of)",
        "hindi": "शत्रुता / बैर / दुर्भावना",
        "meaning": "Strong hostility, bitter antipathy, and ill will between rivals.",
        "example": "Generations of boundary disputes fueled bitter animosity between the two clan elders.",
        "examTag": "SSC CPO"
      },
      {
        "word": "Unanimous",
        "partOfSpeech": "Adjective",
        "breakdown": "Un (One) + Anim (Mind) + ous",
        "hindi": "सर्वसम्मत / एकमत / सभी की सहमति से",
        "meaning": "Fully in agreement; held or decided with the collective approval of all participants.",
        "example": "The committee passed the welfare resolution by an enthusiastic and unanimous vote.",
        "examTag": "SSC CHSL"
      },
      {
        "word": "Animated",
        "partOfSpeech": "Adjective",
        "breakdown": "Anim (Life / Spirit) + ated",
        "hindi": "जीवंत / उत्साहित / फुर्तीला",
        "meaning": "Full of life, vigor, or excitement; lively and spirited in conversation.",
        "example": "The discussion grew lively and animated as students exchanged innovative startup concepts.",
        "examTag": "SSC MTS"
      }
    ]
  }
},

  {
  "id": "v-root-l1-s2-5",
  "word": "Cord- / Card- / Cour-",
  "phonetic": "/kɔːrd/",
  "hindi": "हृदय / आत्मीयता / सद्भाव / साहस",
  "type": "root",
  "partOfSpeech": "Root Word",
  "meaning": "Latin root \"Cor / Cordis\" meaning \"Heart\". It forms words describing warmth, mutual affection, harmony of spirits, agreement, and brave conviction.",
  "synonyms": [
    "Heart",
    "Harmony",
    "Sincerity",
    "Affection",
    "Agreement"
  ],
  "antonyms": [
    "Discord",
    "Strife",
    "Hostility",
    "Dissension"
  ],
  "example": "The summit concluded in a cordial atmosphere of mutual trust and peaceful concord.",
  "mnemonic": "Cord = Heart (Dil). Cordial invitation = dil se nimantran. Discord = dilon ki doori/kalah.",
  "frequency": "Repeated",
  "examTags": [
    "SSC CGL",
    "CHSL",
    "CPO",
    "Level 1",
    "Set 02",
    "Root Words"
  ],
  "collocation": "Root in Cordial, Discord, Concord, Accord, Courage",
  "derivatives": "Cordial, Discord, Concord, Courage, Accord, Discordant",
  "level": "level-1",
  "set": "set-02",
  "rootFamily": {
    "origin": "Latin",
    "coreMeaning": "Heart / Harmony / Sincerity (हृदय / आत्मीयता / सद्भाव)",
    "counterRoot": {
      "root": "Discord-",
      "meaning": "Conflict / Strife (कलह / अनबन)"
    },
    "derivatives": [
      {
        "word": "Cordial",
        "partOfSpeech": "Adjective",
        "breakdown": "Cord (Heart) + ial (Relating to)",
        "hindi": "सौहार्दपूर्ण / आत्मीय / हार्दिक",
        "meaning": "Warm and friendly; deeply sincere and coming straight from the heart.",
        "example": "The diplomats shared a cordial handshake and exchanged gifts before bilateral trade talks began.",
        "examTag": "SSC CGL"
      },
      {
        "word": "Discord",
        "partOfSpeech": "Noun",
        "breakdown": "Dis (Apart / Not) + Cord (Heart)",
        "hindi": "कलह / अनबन / असहमति",
        "meaning": "Disagreement, lack of harmony, and friction between people or factions.",
        "example": "Petty disagreements over inheritance sowed bitter seeds of discord among the siblings.",
        "examTag": "SSC CHSL"
      },
      {
        "word": "Concord",
        "partOfSpeech": "Noun",
        "breakdown": "Con (Together) + Cord (Heart)",
        "hindi": "सामंजस्य / मेल-जोल / सहमति",
        "meaning": "Agreement or harmony between people, states, or groups.",
        "example": "The historic treaty ushered in an era of mutual concord and economic cooperation.",
        "examTag": "SSC CPO"
      },
      {
        "word": "Courage",
        "partOfSpeech": "Noun",
        "breakdown": "Cour (Heart) + age (State)",
        "hindi": "साहस / हिम्मत / शौर्य",
        "meaning": "The ability to confront danger, pain, or intimidation without losing heart.",
        "example": "The brave firefighter showed exemplary courage while rescuing victims from the inferno.",
        "examTag": "SSC MTS"
      },
      {
        "word": "Accord",
        "partOfSpeech": "Noun / Verb",
        "breakdown": "Ac (To) + Cord (Heart)",
        "hindi": "समझौता / सहमति / प्रदान करना",
        "meaning": "An official agreement or treaty; to give or grant someone power, respect, or recognition.",
        "example": "The two prime ministers signed a historic peace accord in front of global media delegates.",
        "examTag": "SSC CGL"
      },
      {
        "word": "Discordant",
        "partOfSpeech": "Adjective",
        "breakdown": "Dis + Cord + ant",
        "hindi": "बेसुरा / असंगत / कलहकारी",
        "meaning": "Disagreeing or incongruous; harsh and jarring due to a lack of musical or social harmony.",
        "example": "A series of discordant violin notes interrupted the orchestra’s peaceful melody.",
        "examTag": "SSC CGL"
      }
    ]
  }
},

  {
  "id": "v-root-l1-s2-6",
  "word": "Culp-",
  "phonetic": "/kʌlp/",
  "hindi": "दोष / कसूर / अपराध",
  "type": "root",
  "partOfSpeech": "Root Word",
  "meaning": "Latin root \"Culpa\" meaning \"Blame\", \"Fault\", or \"Crime\". It forms words relating to legal culpability, criminal liability, and exoneration.",
  "synonyms": [
    "Blame",
    "Fault",
    "Guilt",
    "Crime",
    "Liability"
  ],
  "antonyms": [
    "Innocence",
    "Exoneration",
    "Acquittal",
    "Absolution"
  ],
  "example": "The special investigation team determined that both contractors were culpable for the bridge failure.",
  "mnemonic": "Culp = Culprit (aprādhī). Exculpate = ex (baahar) + culp (dosh se baahar nikaalna / doshmukt karna).",
  "frequency": "Repeated",
  "examTags": [
    "SSC CGL",
    "CHSL",
    "CPO",
    "Level 1",
    "Set 02",
    "Root Words"
  ],
  "collocation": "Root in Culpable, Exculpate, Inculpate, Culprit, Mea culpa",
  "derivatives": "Culpable, Exculpate, Inculpate, Culprit, Mea culpa",
  "level": "level-1",
  "set": "set-02",
  "rootFamily": {
    "origin": "Latin",
    "coreMeaning": "Blame / Fault / Guilt (दोष / कसूर / अपराध)",
    "counterRoot": {
      "root": "Innoc- / Exculp-",
      "meaning": "Harmless / Absolved of Guilt (निर्दोष / दोषमुक्त)"
    },
    "derivatives": [
      {
        "word": "Culpable",
        "partOfSpeech": "Adjective",
        "breakdown": "Culp (Blame) + able (Worthy of)",
        "hindi": "दोषी / दंडनीय / कसूरवार",
        "meaning": "Deserving blame; responsible for a wrongdoing, offense, or fatal negligence.",
        "example": "The reckless motorist was charged with culpable homicide not amounting to murder.",
        "examTag": "SSC Repeated OWS"
      },
      {
        "word": "Exculpate",
        "partOfSpeech": "Verb",
        "breakdown": "Ex (Out of) + Culp (Blame) + ate (Make)",
        "hindi": "दोषमुक्त करना / बेकसूर साबित करना / बरी करना",
        "meaning": "Show or officially declare that someone is not guilty of wrongdoing.",
        "example": "Unassailable surveillance footage completely exculpated the security guard of all theft accusations.",
        "examTag": "SSC CGL Syn/Ant"
      },
      {
        "word": "Inculpate",
        "partOfSpeech": "Verb",
        "breakdown": "In (Into / Upon) + Culp (Blame) + ate",
        "hindi": "आरोप लगाना / दोषी ठहराना / फंसाना",
        "meaning": "Accuse or blame; incriminate and suggest that someone is involved in an illegal act.",
        "example": "The co-conspirator turned state approver to inculpate the syndicate’s masterminds.",
        "examTag": "SSC CGL Mains"
      },
      {
        "word": "Culprit",
        "partOfSpeech": "Noun",
        "breakdown": "Culp (Guilt) + prit (Ready for trial)",
        "hindi": "अपराधी / कसूरवार व्यक्ति / दोषी",
        "meaning": "A person who is responsible for a crime, offense, or damaging mishap.",
        "example": "Forensic investigators dusted the safe for fingerprints to track down the culprit.",
        "examTag": "SSC CHSL"
      },
      {
        "word": "Mea culpa",
        "partOfSpeech": "Noun / Phrase",
        "breakdown": "Mea (My) + Culpa (Fault)",
        "hindi": "अपनी गलती मानना / अपराध-स्वीकृति",
        "meaning": "An acknowledgment of one’s own fault, error, or professional mistake.",
        "example": "The chief editor issued a public mea culpa for running the unverified sensational report.",
        "examTag": "SSC CPO"
      }
    ]
  }
},

  {
  "id": "v-root-l1-s2-7",
  "word": "Pugn- / Pugil-",
  "phonetic": "/pʌɡn/",
  "hindi": "लड़ना / मुक्का / कलह / युद्ध",
  "type": "root",
  "partOfSpeech": "Root Word",
  "meaning": "Latin root \"Pugnare\" (to fight) and \"Pugnus\" (fist). It forms words describing aggressive quarrels, boxing, challenges to integrity, and resistance.",
  "synonyms": [
    "Fight",
    "Combat",
    "Hostility",
    "Aggression",
    "Belligerence"
  ],
  "antonyms": [
    "Peaceful",
    "Pacifist",
    "Conciliatory",
    "Submissive"
  ],
  "example": "His pugnacious demeanor frequently provoked bitter shouting matches during council debates.",
  "mnemonic": "Pugn = Panga lena (ladai karna / jhagda karna). Pugilist = jo fist/ghoonse se lade (boxer).",
  "frequency": "Repeated",
  "examTags": [
    "SSC CGL",
    "CHSL",
    "CPO",
    "Level 1",
    "Set 02",
    "Root Words"
  ],
  "collocation": "Root in Pugnacious, Impugn, Repugnant, Pugilist, Inexpugnable",
  "derivatives": "Pugnacious, Impugn, Repugnant, Pugilist, Inexpugnable",
  "level": "level-1",
  "set": "set-02",
  "rootFamily": {
    "origin": "Latin",
    "coreMeaning": "Fight / Fist / Aggression (लड़ना / मुक्का / कलह)",
    "counterRoot": {
      "root": "Pac- / Plac-",
      "meaning": "Peace / Calm (शांति / सुलह)"
    },
    "derivatives": [
      {
        "word": "Pugnacious",
        "partOfSpeech": "Adjective",
        "breakdown": "Pugn (Fight) + acious (Tendency)",
        "hindi": "झगड़ालू / लड़ाकू / कलहप्रिय",
        "meaning": "Eager or quick to argue, quarrel, or physically fight; aggressively combative.",
        "example": "The pugnacious boy repeatedly picked fights with neighborhood kids over small disputes.",
        "examTag": "SSC Repeated Syn/Ant"
      },
      {
        "word": "Impugn",
        "partOfSpeech": "Verb",
        "breakdown": "Im (Against) + Pugn (Fight / Challenge)",
        "hindi": "सत्यता पर सवाल उठाना / आक्षेप लगाना / चुनौती देना",
        "meaning": "Dispute the truth, validity, or integrity of a statement or person’s character.",
        "example": "The defense attorney sought to impugn the credibility of the prosecution witness.",
        "examTag": "SSC CGL"
      },
      {
        "word": "Repugnant",
        "partOfSpeech": "Adjective",
        "breakdown": "Re (Back) + Pugn (Fight) + ant",
        "hindi": "घृणास्पद / अत्यंत अरुचिकर / प्रतिकूल",
        "meaning": "Extremely distasteful and unacceptable; completely in conflict with moral principles.",
        "example": "The notion of racial discrimination is utterly repugnant to any civilized democratic society.",
        "examTag": "SSC CGL"
      },
      {
        "word": "Pugilist",
        "partOfSpeech": "Noun",
        "breakdown": "Pugil (Fist) + ist (Practitioner)",
        "hindi": "मुक्केबाज / बॉक्सर",
        "meaning": "A professional boxer or fighter skilled in fist combat.",
        "example": "The legendary pugilist knocked out his challenger in the third round with a devastating hook.",
        "examTag": "SSC OWS"
      },
      {
        "word": "Inexpugnable",
        "partOfSpeech": "Adjective",
        "breakdown": "In (Not) + Ex (Out) + Pugn (Fight) + able",
        "hindi": "अजेय / जिसे जीता न जा सके / अभेद्य",
        "meaning": "Incapable of being taken by force, overthrown, or defeated; impregnable.",
        "example": "Perched on high cliffs, the ancient fortress proved completely inexpugnable to enemy invaders.",
        "examTag": "SSC CGL Mains"
      }
    ]
  }
},

  {
  "id": "v-root-l1-s2-8",
  "word": "Lev- / Levi-",
  "phonetic": "/lɛv/",
  "hindi": "हल्का / शांत करना / ऊपर उठाना",
  "type": "root",
  "partOfSpeech": "Root Word",
  "meaning": "Latin root \"Levis\" (light in weight) and \"Levare\" (to raise or lift). It forms words describing the reduction of pain, upward movement, lighthearted humor, and elevation.",
  "synonyms": [
    "Light",
    "Lift",
    "Relieve",
    "Alleviate",
    "Float"
  ],
  "antonyms": [
    "Aggravate",
    "Gravity",
    "Heaviness",
    "Weigh down"
  ],
  "example": "Doctors prescribed analgesics to alleviate the severe postoperative pain.",
  "mnemonic": "Lev = Lever (bhaari cheez ko halka karke uthana). Alleviate = dard ko halka karna.",
  "frequency": "Repeated",
  "examTags": [
    "SSC CGL",
    "CHSL",
    "CPO",
    "Level 1",
    "Set 02",
    "Root Words"
  ],
  "collocation": "Root in Alleviate, Levity, Levitate, Elevate, Relevant",
  "derivatives": "Alleviate, Levity, Levitate, Elevate, Relevant",
  "level": "level-1",
  "set": "set-02",
  "rootFamily": {
    "origin": "Latin",
    "coreMeaning": "Light / Lift / Relieve (हल्का / ऊपर उठाना / शांत करना)",
    "counterRoot": {
      "root": "Grav- / Griev-",
      "meaning": "Heavy / Severe (भारी / गंभीर / कष्टकारी)"
    },
    "derivatives": [
      {
        "word": "Alleviate",
        "partOfSpeech": "Verb",
        "breakdown": "Ad (To) + Lev (Light) + ate (Make)",
        "hindi": "कम करना / पीड़ा शांत करना / हल्का करना / राहत देना",
        "meaning": "Make suffering, distress, or a deficiency less severe and more bearable.",
        "example": "Government relief camps distributed food and clean water to alleviate rural drought distress.",
        "examTag": "SSC Repeated Syn/Ant"
      },
      {
        "word": "Levity",
        "partOfSpeech": "Noun",
        "breakdown": "Lev (Light) + ity (State)",
        "hindi": "छिछोरापन / गंभीरता का अभाव / चंचलता",
        "meaning": "The treatment of a serious matter with humor or in a manner lacking due respect.",
        "example": "The solemn magistrate reprimanded the young intern for introducing inappropriate levity into the courtroom.",
        "examTag": "SSC CGL"
      },
      {
        "word": "Levitate",
        "partOfSpeech": "Verb",
        "breakdown": "Lev (Light) + itate (Act)",
        "hindi": "हवा में उड़ना / अधर में तैरना",
        "meaning": "Rise or cause to rise and hover in the air, especially in apparent defiance of gravity.",
        "example": "The magician astonished the audience by appearing to levitate three feet above the stage floor.",
        "examTag": "SSC CHSL"
      },
      {
        "word": "Elevate",
        "partOfSpeech": "Verb",
        "breakdown": "E (Up / Out) + Lev (Lift) + ate",
        "hindi": "ऊपर उठाना / पदोन्नति करना / बढ़ावा देना",
        "meaning": "Raise to a more important or higher cultural, intellectual, or professional level.",
        "example": "Her exceptional leadership skills elevated her to the rank of managing partner within five years.",
        "examTag": "SSC MTS"
      },
      {
        "word": "Relevant",
        "partOfSpeech": "Adjective",
        "breakdown": "Re (Again) + Lev (Lift / Bear upon) + ant",
        "hindi": "प्रासंगिक / उपयुक्त / सुसंगत",
        "meaning": "Closely connected or appropriate to what is being done or currently considered.",
        "example": "Only candidate details strictly relevant to job qualifications should be reviewed during screening.",
        "examTag": "SSC CHSL"
      }
    ]
  }
},

  {
  "id": "v-root-l1-s2-9",
  "word": "Grav- / Griev-",
  "phonetic": "/ɡræv/",
  "hindi": "गंभीर / भारी / गहरा / कष्टदायी",
  "type": "root",
  "partOfSpeech": "Root Word",
  "meaning": "Latin root \"Gravis\" meaning \"Heavy\", \"Severe\", or \"Weighty\". It forms words describing extreme seriousness, worsening conditions, deep grief, and planetary attraction.",
  "synonyms": [
    "Heavy",
    "Serious",
    "Severe",
    "Weighty",
    "Solemn"
  ],
  "antonyms": [
    "Alleviate",
    "Levity",
    "Lighthearted",
    "Trivial"
  ],
  "example": "The minister warned that retaliatory sanctions would aggravate the already delicate economic crisis.",
  "mnemonic": "Grav = Gravity / Grave (kabra/gambhir). Aggravate = aag me ghee daal kar sthiti aur gambhir karna.",
  "frequency": "Repeated",
  "examTags": [
    "SSC CGL",
    "CHSL",
    "CPO",
    "Level 1",
    "Set 02",
    "Root Words"
  ],
  "collocation": "Root in Aggravate, Grievous, Gravity, Grave, Grievance, Gravitate",
  "derivatives": "Aggravate, Grievous, Gravity, Grave, Grievance, Gravitate",
  "level": "level-1",
  "set": "set-02",
  "rootFamily": {
    "origin": "Latin",
    "coreMeaning": "Heavy / Serious / Burden (गंभीर / भारी / कष्टदायी)",
    "counterRoot": {
      "root": "Lev- / Levi-",
      "meaning": "Light / Relieve (हल्का / राहत देना)"
    },
    "derivatives": [
      {
        "word": "Aggravate",
        "partOfSpeech": "Verb",
        "breakdown": "Ad (To) + Grav (Heavy) + ate (Make)",
        "hindi": "बदतर करना / स्थिति बिगाड़ना / भड़काना",
        "meaning": "Make a problem, injury, or offense worse or more serious.",
        "example": "Walking on the sprained ankle without support will only aggravate the ligament inflammation.",
        "examTag": "SSC Repeated Syn/Ant"
      },
      {
        "word": "Grievous",
        "partOfSpeech": "Adjective",
        "breakdown": "Griev (Heavy / Sorrow) + ous",
        "hindi": "अत्यंत गंभीर / कष्टदायी / दारुण / घातक",
        "meaning": "Very severe, painful, or causing deep sorrow (e.g., grievous bodily injury or grievous loss).",
        "example": "The soldiers suffered grievous casualties during the midnight ambush on the valley post.",
        "examTag": "SSC CGL"
      },
      {
        "word": "Gravity",
        "partOfSpeech": "Noun",
        "breakdown": "Grav (Heavy) + ity (State)",
        "hindi": "गंभीरता / गुरुत्वाकर्षण / महत्व",
        "meaning": "Extreme importance or seriousness; also the natural physical force that pulls objects toward earth.",
        "example": "The prime minister reminded citizens of the profound gravity of the national emergency.",
        "examTag": "SSC CHSL"
      },
      {
        "word": "Grave",
        "partOfSpeech": "Adjective",
        "breakdown": "Grav (Heavy / Serious)",
        "hindi": "अत्यंत गंभीर / चिंताजनक / विचारणीय",
        "meaning": "Giving cause for alarm; serious, solemn, and fraught with danger.",
        "example": "The doctor’s grave expression signaled to the anxious family that the patient was in critical condition.",
        "examTag": "SSC MTS"
      },
      {
        "word": "Grievance",
        "partOfSpeech": "Noun",
        "breakdown": "Griev (Heavy sorrow / Hurt) + ance",
        "hindi": "शिकायत / व्यथा / कष्ट / परिवाद",
        "meaning": "A real or imagined wrong or cause for official complaint, protest, or resentment.",
        "example": "The employee union submitted a formal list of wage grievances to the company management.",
        "examTag": "SSC CPO"
      },
      {
        "word": "Gravitate",
        "partOfSpeech": "Verb",
        "breakdown": "Grav (Heavy) + itate",
        "hindi": "आकर्षित होना / खिंचे चले आना",
        "meaning": "Move toward or be powerfully attracted to a person, place, or pursuit.",
        "example": "Young tech entrepreneurs naturally gravitate toward metropolitan innovation hubs.",
        "examTag": "SSC CGL"
      }
    ]
  }
},

  {
  "id": "v-root-l1-s2-10",
  "word": "Tract-",
  "phonetic": "/trækt/",
  "hindi": "खींचना / आकर्षित करना / संभालना",
  "type": "root",
  "partOfSpeech": "Root Word",
  "meaning": "Latin root \"Trahere / Tractus\" meaning \"To pull, draw, or drag\". It forms words describing pulling in attention, withdrawing statements, lingering delays, and manageable behavior.",
  "synonyms": [
    "Pull",
    "Draw",
    "Drag",
    "Traction",
    "Haul"
  ],
  "antonyms": [
    "Repel",
    "Push",
    "Expel",
    "Release"
  ],
  "example": "The stubborn negotiator refused to retract his controversial terms during the protracted dispute.",
  "mnemonic": "Tract = Tractor (jo bhaari bojh kheenche). Retract = re (peeche) + tract (kheenchna / bayaan wapas lena).",
  "frequency": "Repeated",
  "examTags": [
    "SSC CGL",
    "CHSL",
    "CPO",
    "Level 1",
    "Set 02",
    "Root Words"
  ],
  "collocation": "Root in Intractable, Retract, Protracted, Tractable, Attract",
  "derivatives": "Intractable, Retract, Protracted, Tractable, Attract, Distract, Abstract",
  "level": "level-1",
  "set": "set-02",
  "rootFamily": {
    "origin": "Latin",
    "coreMeaning": "Pull / Draw / Drag / Handle (खींचना / आकर्षित करना / संभालना)",
    "counterRoot": {
      "root": "Pell- / Puls-",
      "meaning": "Drive / Push Away (धकेलना / भगाना)"
    },
    "derivatives": [
      {
        "word": "Intractable",
        "partOfSpeech": "Adjective",
        "breakdown": "In (Not) + Tract (Handle / Pull) + able",
        "hindi": "अड़ियल / हठी / जिसका समाधान कठिन हो",
        "meaning": "Hard to control, manage, deal with, or solve; obstinate and unyielding.",
        "example": "Chronic fiscal deficit has proven to be an intractable macroeconomic challenge for developing states.",
        "examTag": "SSC Repeated Syn/Ant"
      },
      {
        "word": "Retract",
        "partOfSpeech": "Verb",
        "breakdown": "Re (Back) + Tract (Pull)",
        "hindi": "बयान वापस लेना / मुकरना / पीछे खींचना",
        "meaning": "Draw back or withdraw a public statement, accusation, or promise.",
        "example": "Faced with legal libel notices, the magazine was forced to retract the defamatory article.",
        "examTag": "SSC CGL"
      },
      {
        "word": "Protracted",
        "partOfSpeech": "Adjective",
        "breakdown": "Pro (Forward) + Tract (Draw) + ed",
        "hindi": "लंबा खिंचा हुआ / दीर्घकालिक / बहुत समय लेने वाला",
        "meaning": "Lasting for an unusually long time or longer than expected; prolonged.",
        "example": "Following protracted negotiations lasting six months, the warring factions signed an armistice.",
        "examTag": "SSC CGL Mains"
      },
      {
        "word": "Tractable",
        "partOfSpeech": "Adjective",
        "breakdown": "Tract (Handle) + able (Capable)",
        "hindi": "सीधा-साधा / विनीत / वश में आने योग्य",
        "meaning": "Easy to control, direct, or influence; docile and manageable.",
        "example": "Unlike his temperamental predecessor, the new committee chairman is amiable and tractable.",
        "examTag": "SSC CPO"
      },
      {
        "word": "Attract",
        "partOfSpeech": "Verb",
        "breakdown": "Ad (To) + Tract (Pull)",
        "hindi": "आकर्षित करना / लुभाना / खींचना",
        "meaning": "Cause to come to a place or participate in a venture by offering something desirable.",
        "example": "The cultural carnival attracted thousands of domestic and international visitors.",
        "examTag": "SSC MTS"
      },
      {
        "word": "Distract",
        "partOfSpeech": "Verb",
        "breakdown": "Dis (Away) + Tract (Pull)",
        "hindi": "ध्यान भटकाना / विचलित करना",
        "meaning": "Prevent someone from giving full attention to something; draw mind away.",
        "example": "Constant smartphone notifications can severely distract aspirants during revision hours.",
        "examTag": "SSC CHSL"
      },
      {
        "word": "Abstract",
        "partOfSpeech": "Adjective / Verb",
        "breakdown": "Abs (Away) + Tract (Draw)",
        "hindi": "अमूर्त / सार निकालना / सैद्धांतिक",
        "meaning": "Existing in thought or as an idea but having no physical or concrete existence.",
        "example": "Concepts like justice and freedom are abstract values that require concrete civic safeguards.",
        "examTag": "SSC CGL"
      }
    ]
  }
},

    // =========================================================================
  // LEVEL 1 - SET 3: SENSES, PERCEPTION, MOTION, HARSHNESS & VOICE (10 ROOT WORDS)
  // =========================================================================
  {
  "id": "v-root-l1-s3-1",
  "word": "Sens- / Sent-",
  "phonetic": "/sɛns/",
  "hindi": "संवेदना / भावना / महसूस करना",
  "type": "root",
  "partOfSpeech": "Verb Base / Root",
  "meaning": "Latin root \"Sentire / Sensus\" meaning \"To feel\", \"To perceive\", or \"To think / judge\". It forms words describing sensory awareness, emotional feelings, agreement, and deep resentment.",
  "synonyms": [
    "Feel",
    "Perceive",
    "Emotion",
    "Awareness",
    "Sentiment"
  ],
  "antonyms": [
    "Apathy",
    "Insensitivity",
    "Numbness",
    "Insensate"
  ],
  "example": "The moral debate centers on whether non-human animals are sentient beings capable of suffering.",
  "mnemonic": "Sens = Sense / Sensation (jo feel kiya ja sake). Dissent = dis (alag) + sent (feeling / asahmat hona).",
  "frequency": "Repeated",
  "examTags": [
    "SSC CGL",
    "CHSL",
    "CPO",
    "Level 1",
    "Set 03",
    "Root Words"
  ],
  "collocation": "Root in Sentient, Sentiment, Resent, Dissent, Assent, Sensuous",
  "derivatives": "Sentient, Sentiment, Resent, Dissent, Assent, Sensuous, Insensate, Sensitive",
  "level": "level-1",
  "set": "set-03",
  "rootFamily": {
    "origin": "Latin",
    "coreMeaning": "Feel / Perceive / Emotion (संवेदना / भावना / महसूस करना)",
    "counterRoot": {
      "root": "Apathy / Insens-",
      "meaning": "Lack of feeling / Callous (संवेदनहीनता / बेरुखी)"
    },
    "derivatives": [
      {
        "word": "Sentient",
        "partOfSpeech": "Adjective",
        "breakdown": "Sent (Feel) + ient (Having quality)",
        "hindi": "चेतन / संवेदनशील / जिसमें संवेदना हो",
        "meaning": "Able to perceive or feel things; conscious and responsive to sensations.",
        "example": "Philosophers argue that all sentient creatures deserve humane treatment and legal protection.",
        "examTag": "SSC Repeated OWS"
      },
      {
        "word": "Dissent",
        "partOfSpeech": "Noun / Verb",
        "breakdown": "Dis (Apart / Differ) + Sent (Feel)",
        "hindi": "असमर्थन / असहमति / मतभेद व्यक्त करना",
        "meaning": "The expression or holding of opinions at variance with those previously, commonly, or officially held.",
        "example": "Justice Khanna registered a courageous note of dissent against the executive emergency decree.",
        "examTag": "SSC CGL"
      },
      {
        "word": "Assent",
        "partOfSpeech": "Noun / Verb",
        "breakdown": "Ad (To / Toward) + Sent (Feel / Agree)",
        "hindi": "सहमति / औपचारिक स्वीकृति देना",
        "meaning": "The expression of formal approval or agreement to a proposal or bill.",
        "example": "The bill became enforceable law immediately after receiving the President’s official assent.",
        "examTag": "SSC CHSL"
      },
      {
        "word": "Resent",
        "partOfSpeech": "Verb",
        "breakdown": "Re (Again) + Sent (Feel bitter)",
        "hindi": "बुरा मानना / क्रोधित होना / मनमुटाव रखना",
        "meaning": "Feel bitterness or indignation at a circumstance, action, or unfair treatment.",
        "example": "He bitterly resented being passed over for promotion in favor of the chairman’s nephew.",
        "examTag": "SSC CPO"
      },
      {
        "word": "Sensuous",
        "partOfSpeech": "Adjective",
        "breakdown": "Sens (Senses) + uous (Full of)",
        "hindi": "इंद्रियसुख देने वाला / मनमोहक / सौंदर्यपूर्ण",
        "meaning": "Relating to or affecting the physical senses rather than the intellect; aesthetically pleasing.",
        "example": "Keats is renowned for his richly sensuous poetry that vividly evokes tactile and visual imagery.",
        "examTag": "SSC CGL Mains"
      },
      {
        "word": "Insensate",
        "partOfSpeech": "Adjective",
        "breakdown": "In (Not) + Sens (Feel) + ate",
        "hindi": "संवेदनहीन / जड़ / मूर्खतापूर्ण / निर्दयी",
        "meaning": "Lacking physical sensation; devoid of feeling, compassion, or rational judgment.",
        "example": "The tyrant ordered an insensate bombardment of civilian residential quarters.",
        "examTag": "SSC CGL"
      }
    ]
  }
},

  {
  "id": "v-root-l1-s3-2",
  "word": "Tort- / Tors-",
  "phonetic": "/tɔːrt/",
  "hindi": "मरोड़ना / घुमाना / कष्ट देना",
  "type": "root",
  "partOfSpeech": "Root Word",
  "meaning": "Latin root \"Torquere / Tortus\" meaning \"To twist, bend, wring, or distort\". It forms words describing winding paths, distorted speech, cruel extortion, and physical agony.",
  "synonyms": [
    "Twist",
    "Wring",
    "Distort",
    "Bend",
    "Agony"
  ],
  "antonyms": [
    "Straight",
    "Direct",
    "Rectify",
    "Untwist"
  ],
  "example": "The witness gave a distorted version of events, deliberately contorting the simple facts.",
  "mnemonic": "Tort = Twist (Tor-maror kar pesh karna). Tortuous = twisty/ghoomawdaar rasta. Extort = twist karke paise nikaalna.",
  "frequency": "Repeated",
  "examTags": [
    "SSC CGL",
    "CHSL",
    "CPO",
    "Level 1",
    "Set 03",
    "Root Words"
  ],
  "collocation": "Root in Tortuous, Extort, Retort, Contort, Distort",
  "derivatives": "Tortuous, Contort, Extort, Retort, Distort, Torture",
  "level": "level-1",
  "set": "set-03",
  "rootFamily": {
    "origin": "Latin",
    "coreMeaning": "Twist / Wring / Distort (मरोड़ना / घुमाना / ऐंठना)",
    "counterRoot": {
      "root": "Rect- / Direct-",
      "meaning": "Straight / Upright (सीधा / खरा)"
    },
    "derivatives": [
      {
        "word": "Tortuous",
        "partOfSpeech": "Adjective",
        "breakdown": "Tort (Twist) + uous (Full of)",
        "hindi": "घुमावदार / पेचीदा / जटिल / टेढ़ा-मेढ़ा",
        "meaning": "Full of twists and turns; excessively lengthy, devious, and complex.",
        "example": "The convoy navigated a tortuous mountain pass shrouded in heavy monsoon fog.",
        "examTag": "SSC Repeated Syn/Ant"
      },
      {
        "word": "Contort",
        "partOfSpeech": "Verb",
        "breakdown": "Con (Together) + Tort (Twist)",
        "hindi": "ऐंठना / विकृत रूप में मरोड़ना",
        "meaning": "Twist or bend out of its normal natural shape.",
        "example": "His face contorted in agony as the orthopedic surgeon realigned the fractured bone.",
        "examTag": "SSC CGL"
      },
      {
        "word": "Extort",
        "partOfSpeech": "Verb",
        "breakdown": "Ex (Out) + Tort (Twist / Wring)",
        "hindi": "जबरन वसूली करना / धमका कर ऐंठना",
        "meaning": "Obtain money or favor from someone by using threats, force, or intimidation.",
        "example": "The gangsters attempted to extort protection money from local shopkeepers.",
        "examTag": "SSC CHSL"
      },
      {
        "word": "Retort",
        "partOfSpeech": "Noun / Verb",
        "breakdown": "Re (Back) + Tort (Twist / Turn)",
        "hindi": "करारा जवाब देना / मुंहतोड़ उत्तर",
        "meaning": "Say something in answer to a remark or accusation, typically in a sharp, witty manner.",
        "example": "“I may be slow, but at least I am thorough,” she retorted with a composed smile.",
        "examTag": "SSC MTS"
      },
      {
        "word": "Distort",
        "partOfSpeech": "Verb",
        "breakdown": "Dis (Away) + Tort (Twist)",
        "hindi": "विकृत करना / तोड़-मरोड़ कर पेश करना",
        "meaning": "Pull or twist out of shape; misrepresent facts to mislead others.",
        "example": "Yellow journalism sensationalized and distorted the politician’s original statement.",
        "examTag": "SSC CPO"
      }
    ]
  }
},

  {
  "id": "v-root-l1-s3-3",
  "word": "Gred- / Gress-",
  "phonetic": "/ɡrɛs/",
  "hindi": "कदम बढ़ाना / चलना / आगे बढ़ना",
  "type": "root",
  "partOfSpeech": "Root Word",
  "meaning": "Latin root \"Gradi / Gressus\" meaning \"To step, walk, or go\". It forms words describing movement forward, wandering off-topic, crossing boundaries into sin, and entry/exit passages.",
  "synonyms": [
    "Step",
    "Walk",
    "Move",
    "Advance",
    "Passage"
  ],
  "antonyms": [
    "Stagnant",
    "Stationary",
    "Halt",
    "Motionless"
  ],
  "example": "He cautioned the speaker not to digress too far from the central theme of the symposium.",
  "mnemonic": "Gress = Progress / Congress (aage badhna ya kadam rakhna). Transgress = paar karna boundary (kanoon todna).",
  "frequency": "Repeated",
  "examTags": [
    "SSC CGL",
    "CHSL",
    "CPO",
    "Level 1",
    "Set 03",
    "Root Words"
  ],
  "collocation": "Root in Transgress, Digress, Regress, Aggressive, Egress, Ingress",
  "derivatives": "Transgress, Digress, Regress, Progress, Aggressive, Egress, Ingress",
  "level": "level-1",
  "set": "set-03",
  "rootFamily": {
    "origin": "Latin",
    "coreMeaning": "Step / Walk / Move (कदम बढ़ाना / चलना / गति)",
    "counterRoot": {
      "root": "Stagn- / Static",
      "meaning": "Stationary / Unmoving (स्थिर / ठहरा हुआ)"
    },
    "derivatives": [
      {
        "word": "Transgress",
        "partOfSpeech": "Verb",
        "breakdown": "Trans (Across / Beyond) + Gress (Step)",
        "hindi": "मर्यादा लांघना / उल्लंघन करना / पाप करना",
        "meaning": "Go beyond the limits of what is morally, socially, or legally acceptable.",
        "example": "Citizens who deliberately transgress environmental regulations face severe administrative fines.",
        "examTag": "SSC Repeated OWS"
      },
      {
        "word": "Digress",
        "partOfSpeech": "Verb",
        "breakdown": "Di (Away / Aside) + Gress (Step)",
        "hindi": "विषय से भटकना / विषयांतर करना",
        "meaning": "Leave the main subject temporarily in speech or writing; wander off topic.",
        "example": "The professor digressed into an amusing anecdote about his student days in Oxford.",
        "examTag": "SSC CGL"
      },
      {
        "word": "Regress",
        "partOfSpeech": "Verb",
        "breakdown": "Re (Back) + Gress (Step)",
        "hindi": "पीछे लौटना / पतन होना / पुरानी स्थिति में जाना",
        "meaning": "Return to a former or less developed, worse state.",
        "example": "Without continuous rehabilitation exercises, the patient’s knee mobility may regress.",
        "examTag": "SSC CHSL"
      },
      {
        "word": "Egress",
        "partOfSpeech": "Noun / Verb",
        "breakdown": "E (Out) + Gress (Step)",
        "hindi": "निकास / बाहर निकलने का मार्ग",
        "meaning": "The action of going out of or leaving a place; a way out.",
        "example": "Fire safety inspectors mandated three clear points of emergency egress in the theatre.",
        "examTag": "SSC CPO"
      },
      {
        "word": "Ingress",
        "partOfSpeech": "Noun",
        "breakdown": "In (Into) + Gress (Step)",
        "hindi": "प्रवेश / अंदर आने का मार्ग / अधिकार",
        "meaning": "The action or right of entering; an entrance or means of access.",
        "example": "Heavy military blockades barred all unauthorized vehicular ingress into the cantonment.",
        "examTag": "SSC CGL"
      }
    ]
  }
},

  {
  "id": "v-root-l1-s3-4",
  "word": "Dol- / Dolo-",
  "phonetic": "/dɒl/",
  "hindi": "शोक / दुख / पीड़ा / वेदना",
  "type": "root",
  "partOfSpeech": "Root Word",
  "meaning": "Latin root \"Dolere\" (to feel pain / grieve) and \"Dolor\" (pain, sorrow, distress). It forms words describing melancholy, deep grief, indolent avoidance of effort, and sympathy.",
  "synonyms": [
    "Pain",
    "Sorrow",
    "Grief",
    "Melancholy",
    "Suffering"
  ],
  "antonyms": [
    "Joy",
    "Cheerfulness",
    "Jocund",
    "Ecstasy"
  ],
  "example": "Neighbors visited the bereaved family to extend their heartfelt condolences.",
  "mnemonic": "Dol = Dil me dard (dard/dukh). Indolent = jo dard/kasht na uthana chahe (aalsi). Condolence = dukh me shamil hona.",
  "frequency": "Repeated",
  "examTags": [
    "SSC CGL",
    "CHSL",
    "CPO",
    "Level 1",
    "Set 03",
    "Root Words"
  ],
  "collocation": "Root in Indolent, Dolorous, Doleful, Condolence, Dolor",
  "derivatives": "Indolent, Dolorous, Doleful, Condolence, Dolor",
  "level": "level-1",
  "set": "set-03",
  "rootFamily": {
    "origin": "Latin",
    "coreMeaning": "Pain / Grief / Sorrow (शोक / दुख / पीड़ा / वेदना)",
    "counterRoot": {
      "root": "Joc- / Gaud-",
      "meaning": "Joy / Delight (हर्ष / उल्लास)"
    },
    "derivatives": [
      {
        "word": "Indolent",
        "partOfSpeech": "Adjective",
        "breakdown": "In (Not) + Dol (Pain / Exertion) + ent",
        "hindi": "आलसी / अकर्मण्य / कामचोर",
        "meaning": "Wanting to avoid activity or exertion; habitually lazy (originally: not feeling pain).",
        "example": "The indolent heir spent his afternoons lounging beside the pool while his estate decayed.",
        "examTag": "SSC Repeated Syn/Ant"
      },
      {
        "word": "Dolorous",
        "partOfSpeech": "Adjective",
        "breakdown": "Dolor (Pain / Grief) + ous (Full of)",
        "hindi": "शोकग्रस्त / दुखद / उदास / गमगीन",
        "meaning": "Feeling or expressing great sorrow or distress; mournful.",
        "example": "The church bell tolled in a slow, dolorous rhythm during the state funeral procession.",
        "examTag": "SSC CGL"
      },
      {
        "word": "Doleful",
        "partOfSpeech": "Adjective",
        "breakdown": "Dole (Pain) + ful (Full of)",
        "hindi": "उदासीन / विषादपूर्ण / शोकपूर्ण",
        "meaning": "Expressing sorrow; mournful and melancholy.",
        "example": "The abandoned puppy looked up at the rescuer with doleful, beseeching eyes.",
        "examTag": "SSC CHSL"
      },
      {
        "word": "Condolence",
        "partOfSpeech": "Noun",
        "breakdown": "Con (Together) + Dol (Grieve) + ence",
        "hindi": "शोक-संवेदना / सांत्वना",
        "meaning": "An expression of sympathy, especially on the occasion of the death of someone’s relative.",
        "example": "The Prime Minister sent a message of deep condolence to the earthquake victims.",
        "examTag": "SSC MTS"
      },
      {
        "word": "Dolor",
        "partOfSpeech": "Noun",
        "breakdown": "Dolor (Sorrow)",
        "hindi": "गहरा शोक / मानसिक या शारीरिक वेदना",
        "meaning": "A state of great sorrow, physical suffering, or deep mental distress.",
        "example": "Ancient Greek tragedy explored the inescapable themes of mortal fate and cosmic dolor.",
        "examTag": "SSC CPO"
      }
    ]
  }
},

  {
  "id": "v-root-l1-s3-5",
  "word": "Viv- / Vit-",
  "phonetic": "/vɪv/",
  "hindi": "जीवन / प्राण / ऊर्जा / जिंदादिली",
  "type": "root",
  "partOfSpeech": "Root Word",
  "meaning": "Latin root \"Vivere\" (to live) and \"Vita\" (life). It forms words describing exuberant energy, striking clarity, survival, essential requirements for health, and sociable warmth.",
  "synonyms": [
    "Life",
    "Vitality",
    "Energy",
    "Liveliness",
    "Vigor"
  ],
  "antonyms": [
    "Mort- (Death)",
    "Lifeless",
    "Inanimate",
    "Moribund"
  ],
  "example": "Her vivacious personality illuminated the room and instantly put everyone at ease.",
  "mnemonic": "Viv = Vivaah / Jeevan (Zinda). Vivacious = Zindadil. Vitamin = Jo jeevan ke liye zaroori ho.",
  "frequency": "Repeated",
  "examTags": [
    "SSC CGL",
    "CHSL",
    "CPO",
    "Level 1",
    "Set 03",
    "Root Words"
  ],
  "collocation": "Root in Vivacious, Vivid, Vital, Convivial, Revive, Bon vivant",
  "derivatives": "Vivacious, Vivid, Vital, Convivial, Revive, Bon vivant, Vitality",
  "level": "level-1",
  "set": "set-03",
  "rootFamily": {
    "origin": "Latin",
    "coreMeaning": "Live / Life / Vitality (जीवन / प्राण / ऊर्जा / जिंदादिली)",
    "counterRoot": {
      "root": "Mort- / Moribund",
      "meaning": "Death / Dying (मृत्यु / मरणासन्न)"
    },
    "derivatives": [
      {
        "word": "Vivacious",
        "partOfSpeech": "Adjective",
        "breakdown": "Viv (Life) + acious (Full of)",
        "hindi": "जिंदादिल / हंसमुख / ऊर्जावान / फुर्तीला",
        "meaning": "Attractively lively and animated; full of high spirits and vitality.",
        "example": "The vivacious host captivated the audience with humorous stories and boundless enthusiasm.",
        "examTag": "SSC Repeated Syn/Ant"
      },
      {
        "word": "Convivial",
        "partOfSpeech": "Adjective",
        "breakdown": "Con (Together) + Viv (Live / Feast) + ial",
        "hindi": "मिलनसार / खुशनुमा / दावत-प्रेमी",
        "meaning": "Friendly, lively, and enjoyable; fond of feasting, drinking, and good company.",
        "example": "The reunion dinner was celebrated in a warm and convivial atmosphere among childhood friends.",
        "examTag": "SSC CGL OWS"
      },
      {
        "word": "Vivid",
        "partOfSpeech": "Adjective",
        "breakdown": "Viv (Life) + id",
        "hindi": "सजीव / सुस्पष्ट / चमकीला",
        "meaning": "Producing powerful feelings or strong, clear images in the mind.",
        "example": "Even after fifty years, the veteran retained a vivid recollection of the historic landing.",
        "examTag": "SSC CHSL"
      },
      {
        "word": "Revive",
        "partOfSpeech": "Verb",
        "breakdown": "Re (Again) + Viv (Live)",
        "hindi": "पुनर्जीवित करना / फिर से होश में लाना",
        "meaning": "Restore to life, consciousness, vigor, or active use.",
        "example": "Paramedics applied CPR and oxygen to revive the collapsed marathon runner.",
        "examTag": "SSC MTS"
      },
      {
        "word": "Bon vivant",
        "partOfSpeech": "Noun",
        "breakdown": "Bon (Good) + Vivant (Living [French/Latin])",
        "hindi": "विलासी / ऐशो-आराम और अच्छे भोजन का शौकीन",
        "meaning": "A person who enjoys a sociable and luxurious lifestyle, especially good food and wine.",
        "example": "As a renowned culinary critic and bon vivant, he frequented Europe’s finest Michelin restaurants.",
        "examTag": "SSC CGL Mains"
      }
    ]
  }
},

  {
  "id": "v-root-l1-s3-6",
  "word": "Acri- / Acer- / Ac-",
  "phonetic": "/ˈækrɪ/",
  "hindi": "तीखा / कड़वा / तीक्ष्ण / उग्र",
  "type": "root",
  "partOfSpeech": "Root Word",
  "meaning": "Latin root \"Acer / Acris\" meaning \"Sharp\", \"Sour\", \"Piercing\", or \"Bitter\". It forms words describing bitter speech, caustic remarks, intellectual sharpness, and intensifying pain.",
  "synonyms": [
    "Bitter",
    "Sharp",
    "Caustic",
    "Pungent",
    "Severe"
  ],
  "antonyms": [
    "Dulcet",
    "Mellifluous",
    "Sweet",
    "Soothing"
  ],
  "example": "The bitter board meeting descended into an acrimonious exchange of accusations.",
  "mnemonic": "Acri = Acid (jo teekha/kadwa aur kaatne wala ho). Acumen = sharp dimaag. Acrimonious = kadwahat se bhara.",
  "frequency": "Repeated",
  "examTags": [
    "SSC CGL",
    "CHSL",
    "CPO",
    "Level 1",
    "Set 03",
    "Root Words"
  ],
  "collocation": "Root in Acrimonious, Acerbic, Acrid, Acumen, Acute, Exacerbate",
  "derivatives": "Acrimonious, Acerbic, Acrid, Acumen, Acute, Exacerbate",
  "level": "level-1",
  "set": "set-03",
  "rootFamily": {
    "origin": "Latin",
    "coreMeaning": "Sharp / Bitter / Harsh (तीखा / कड़वा / तीक्ष्ण / उग्र)",
    "counterRoot": {
      "root": "Dulce- / Melli-",
      "meaning": "Sweet / Gentle (मधुर / कोमल)"
    },
    "derivatives": [
      {
        "word": "Acrimonious",
        "partOfSpeech": "Adjective",
        "breakdown": "Acri (Bitter) + mony (State) + ous",
        "hindi": "कटुतापूर्ण / उग्र / झगड़ालू / तल्ख",
        "meaning": "Angry and bitter in tone, speech, or debate.",
        "example": "The acrimonious divorce proceedings dragged on in court for more than three years.",
        "examTag": "SSC Repeated Syn/Ant"
      },
      {
        "word": "Acerbic",
        "partOfSpeech": "Adjective",
        "breakdown": "Acer (Sharp / Sour) + bic",
        "hindi": "कड़वा / तीखा / व्यंग्यपूर्ण",
        "meaning": "Sharp and forthright in expression; tasting sour or bitter.",
        "example": "The literary critic was notorious for her acerbic wit and merciless book reviews.",
        "examTag": "SSC CGL"
      },
      {
        "word": "Acrid",
        "partOfSpeech": "Adjective",
        "breakdown": "Acr (Sharp) + id",
        "hindi": "तीखा / दुर्गंधयुक्त / नाक में चुभने वाला",
        "meaning": "Having an irritatingly strong and unpleasantly pungent taste or smell.",
        "example": "Thick, acrid smoke from the burning chemical factory filled the entire industrial zone.",
        "examTag": "SSC CHSL"
      },
      {
        "word": "Acumen",
        "partOfSpeech": "Noun",
        "breakdown": "Acu (Sharp) + men (Mental ability)",
        "hindi": "कुशाग्र बुद्धि / तीक्ष्ण समझ / सूक्ष्मदर्शिता",
        "meaning": "The ability to make good judgments and quick decisions, especially in a particular domain.",
        "example": "Her exceptional financial acumen allowed the startup to achieve profitability in its first quarter.",
        "examTag": "SSC Repeated OWS"
      },
      {
        "word": "Exacerbate",
        "partOfSpeech": "Verb",
        "breakdown": "Ex (Thoroughly) + Acerb (Bitter / Harsh) + ate",
        "hindi": "बदतर करना / स्थिति को और भड़काना / तीव्र करना",
        "meaning": "Make a problem, bad situation, or negative feeling worse.",
        "example": "Cutting fuel subsidies in winter will inevitably exacerbate public discontent.",
        "examTag": "SSC CGL Mains"
      }
    ]
  }
},

  {
  "id": "v-root-l1-s3-7",
  "word": "Cap- / Cept- / Cip-",
  "phonetic": "/kæp/",
  "hindi": "पकड़ना / ग्रहण करना / स्वीकारना / वश में करना",
  "type": "root",
  "partOfSpeech": "Root Word",
  "meaning": "Latin root \"Capere / Captus\" meaning \"To take, seize, catch, or hold\". It forms words describing seizing control, nitpicking criticism, setting slaves free, and mental receptivity.",
  "synonyms": [
    "Seize",
    "Take",
    "Hold",
    "Grasp",
    "Catch"
  ],
  "antonyms": [
    "Release",
    "Relinquish",
    "Surrender",
    "Let go"
  ],
  "example": "The captivating performance held the audience spellbound until the final curtain call.",
  "mnemonic": "Cap = Capture (giraftaar karna / pakadna). Captious = jo galtiyan pakadne me laga rahe (nuktaacheen).",
  "frequency": "Repeated",
  "examTags": [
    "SSC CGL",
    "CHSL",
    "CPO",
    "Level 1",
    "Set 03",
    "Root Words"
  ],
  "collocation": "Root in Captious, Emancipate, Susceptible, Inception, Precept, Captivate",
  "derivatives": "Captious, Emancipate, Susceptible, Inception, Precept, Captivate, Receptive",
  "level": "level-1",
  "set": "set-03",
  "rootFamily": {
    "origin": "Latin",
    "coreMeaning": "Take / Seize / Hold (पकड़ना / ग्रहण करना / वश में करना)",
    "counterRoot": {
      "root": "Relinquish",
      "meaning": "Surrender / Give up (त्यागना / छोड़ना)"
    },
    "derivatives": [
      {
        "word": "Captious",
        "partOfSpeech": "Adjective",
        "breakdown": "Cap (Catch / Seize) + tious (Inclined to)",
        "hindi": "छिद्रान्वेषी / नुक्ताचीनी करने वाला / दोष निकालने वाला",
        "meaning": "Tending to find fault or raise petty objections; hypercritical.",
        "example": "The captious reviewer ignored the brilliant acting and obsessed over minor historical inaccuracies.",
        "examTag": "SSC Repeated Syn/Ant"
      },
      {
        "word": "Emancipate",
        "partOfSpeech": "Verb",
        "breakdown": "E (Out) + Manus (Hand) + Cip (Take / Seize) + ate",
        "hindi": "मुक्त करना / बंधनों से आजाद करना",
        "meaning": "Set free, especially from legal, social, or political restrictions and enslavement.",
        "example": "Abraham Lincoln issued the historic proclamation to emancipate millions of enslaved people.",
        "examTag": "SSC Repeated OWS"
      },
      {
        "word": "Susceptible",
        "partOfSpeech": "Adjective",
        "breakdown": "Sus (Under) + Cept (Take / Receive) + ible",
        "hindi": "अतिसंवेदनशील / सहज प्रभावित होने वाला / vulnerable",
        "meaning": "Likely or liable to be influenced or harmed by a particular disease or emotional appeal.",
        "example": "Elderly patients with weakened immune systems are highly susceptible to respiratory viruses.",
        "examTag": "SSC CGL"
      },
      {
        "word": "Inception",
        "partOfSpeech": "Noun",
        "breakdown": "In (In) + Cept (Take / Seize) + ion",
        "hindi": "आरंभ / शुरुआत / सूत्रपात",
        "meaning": "The establishment or starting point of an institution, era, or activity.",
        "example": "Since its inception in 2010, the non-profit organization has planted two million saplings.",
        "examTag": "SSC CHSL"
      },
      {
        "word": "Precept",
        "partOfSpeech": "Noun",
        "breakdown": "Pre (Before) + Cept (Take / Grasp)",
        "hindi": "नियम / उपदेश / आचार-सिद्धांत",
        "meaning": "A general rule intended to regulate behavior or thought; a guiding moral tenet.",
        "example": "Ancient sages taught that personal example influences youth far more effectively than verbal precept.",
        "examTag": "SSC CPO"
      }
    ]
  }
},

  {
  "id": "v-root-l1-s3-8",
  "word": "Mand- / Mandat-",
  "phonetic": "/mænd/",
  "hindi": "आदेश / आज्ञा / अधिकार सौंपना",
  "type": "root",
  "partOfSpeech": "Root Word",
  "meaning": "Latin root \"Mandare\" (from Manus [hand] + Dare [to give/entrust]). It forms words describing official orders, compulsory rules, revoking commands, and high judicial writs.",
  "synonyms": [
    "Command",
    "Order",
    "Authorize",
    "Decree",
    "Obligate"
  ],
  "antonyms": [
    "Prohibit",
    "Revoke",
    "Optional",
    "Voluntary"
  ],
  "example": "Wearing helmets while riding two-wheelers is mandatory under national motor vehicle statutes.",
  "mnemonic": "Mand = Command / Demand (aadesh dena). Countermand = counter (ulta) + mand (aadesh radd karna).",
  "frequency": "Repeated",
  "examTags": [
    "SSC CGL",
    "CHSL",
    "CPO",
    "Level 1",
    "Set 03",
    "Root Words"
  ],
  "collocation": "Root in Mandatory, Countermand, Remand, Mandate, Commend",
  "derivatives": "Mandatory, Countermand, Remand, Mandate, Commend, Mandamus",
  "level": "level-1",
  "set": "set-03",
  "rootFamily": {
    "origin": "Latin",
    "coreMeaning": "Command / Order / Entrust (आदेश / आज्ञा / अधिकार सौंपना)",
    "counterRoot": {
      "root": "Revoke / Prohibit",
      "meaning": "Cancel / Forbid (रद्द करना / मना करना)"
    },
    "derivatives": [
      {
        "word": "Mandatory",
        "partOfSpeech": "Adjective",
        "breakdown": "Mandat (Command) + ory (Obligatory)",
        "hindi": "अनिवार्य / बाध्यकारी / लाजिमी",
        "meaning": "Required by law or rules; compulsory and not optional.",
        "example": "Bio-metric attendance is mandatory for all central government employees.",
        "examTag": "SSC CHSL"
      },
      {
        "word": "Countermand",
        "partOfSpeech": "Verb",
        "breakdown": "Counter (Against / Opposite) + Mand (Command)",
        "hindi": "आदेश रद्द करना / पिछला हुक्म वापस लेना",
        "meaning": "Revoke or cancel a previous order or command, typically by issuing an opposite one.",
        "example": "The general countermanded the order to advance after intelligence warned of enemy minefields.",
        "examTag": "SSC Repeated OWS"
      },
      {
        "word": "Remand",
        "partOfSpeech": "Verb / Noun",
        "breakdown": "Re (Back) + Mand (Command / Entrust)",
        "hindi": "न्यायिक हिरासत में भेजना / हवालात में भेजना",
        "meaning": "Send back a prisoner into custody, especially while awaiting further investigation or trial.",
        "example": "The magistrate remanded the cyber-crime suspect to police custody for seven days.",
        "examTag": "SSC CGL"
      },
      {
        "word": "Mandate",
        "partOfSpeech": "Noun / Verb",
        "breakdown": "Mandat (Command / Authorization)",
        "hindi": "जनादेश / आधिकारिक आज्ञा",
        "meaning": "An official order or commission to do something; authority granted by a constituency.",
        "example": "Winning a landslide majority gave the ruling coalition a clear democratic mandate to enact tax reforms.",
        "examTag": "SSC CPO"
      },
      {
        "word": "Commend",
        "partOfSpeech": "Verb",
        "breakdown": "Com (Thoroughly) + Mend/Mand (Entrust / Praise)",
        "hindi": "सराहना करना / प्रशंसा करना / सुपुर्द करना",
        "meaning": "Praise formally or officially; present as suitable for approval.",
        "example": "The police commissioner commended the brave constable for disarming the armed burglar.",
        "examTag": "SSC MTS"
      }
    ]
  }
},

  {
  "id": "v-root-l1-s3-9",
  "word": "Noc- / Nox-",
  "phonetic": "/nɒks/",
  "hindi": "हानि / नुकसान / विषैला / घातक",
  "type": "root",
  "partOfSpeech": "Root Word",
  "meaning": "Latin root \"Nocere\" (to harm, hurt, or injure) and \"Noxius\" (harmful, poisonous). It forms words describing toxic fumes, innocent harmlessness, destructive rivalry, and offensive conduct.",
  "synonyms": [
    "Harm",
    "Damage",
    "Poison",
    "Injure",
    "Toxicity"
  ],
  "antonyms": [
    "Innocuous",
    "Harmless",
    "Benign",
    "Safe"
  ],
  "example": "The lab reported that the chemical reaction released noxious chlorine fumes.",
  "mnemonic": "Nox = Noxious / Poison (jo nuksan kare). Innocuous = in (nahi) + noc (nuksan) -> behad seedha-saadha/a-hanikarak.",
  "frequency": "Repeated",
  "examTags": [
    "SSC CGL",
    "CHSL",
    "CPO",
    "Level 1",
    "Set 03",
    "Root Words"
  ],
  "collocation": "Root in Innocuous, Noxious, Pernicious, Obnoxious, Innocent",
  "derivatives": "Innocuous, Noxious, Pernicious, Obnoxious, Innocent",
  "level": "level-1",
  "set": "set-03",
  "rootFamily": {
    "origin": "Latin",
    "coreMeaning": "Harm / Hurt / Poison (हानि / नुकसान / विषैला / घातक)",
    "counterRoot": {
      "root": "Innoc- / Benign",
      "meaning": "Harmless / Gentle (हानिरहित / सौम्य)"
    },
    "derivatives": [
      {
        "word": "Innocuous",
        "partOfSpeech": "Adjective",
        "breakdown": "In (Not) + Noc (Harm) + uous",
        "hindi": "हानिरहित / सीधा-साधा / अहानिकर / जिससे कोई चोट न पहुंचे",
        "meaning": "Not harmful or offensive; innocuous remarks or benign substances.",
        "example": "What seemed like an innocuous software bug actually exposed sensitive encrypted passwords.",
        "examTag": "SSC Repeated Syn/Ant"
      },
      {
        "word": "Noxious",
        "partOfSpeech": "Adjective",
        "breakdown": "Nox (Harm / Poison) + ious",
        "hindi": "हानिकारक / विषैला / जानलेवा / सड़ांध भरा",
        "meaning": "Harmful, poisonous, or very unpleasant to physical health or moral well-being.",
        "example": "Wearing gas masks is mandatory inside tunnels where noxious fumes accumulate.",
        "examTag": "SSC CGL"
      },
      {
        "word": "Pernicious",
        "partOfSpeech": "Adjective",
        "breakdown": "Per (Thoroughly) + Nic/Noc (Harm) + ious",
        "hindi": "घातक / विनाशकारी / अत्यंत हानिकर (धीरे-धीरे नुकसान करने वाला)",
        "meaning": "Having a harmful effect, especially in a gradual or subtle, insidious way.",
        "example": "Unregulated gambling has a pernicious influence on vulnerable low-income households.",
        "examTag": "SSC Repeated OWS"
      },
      {
        "word": "Obnoxious",
        "partOfSpeech": "Adjective",
        "breakdown": "Ob (Toward) + Nox (Harm / Offense) + ious",
        "hindi": "अप्रिय / घिनौना / आपत्तिजनक / असभ्य",
        "meaning": "Extremely unpleasant, objectionable, and highly offensive to others.",
        "example": "Security escorted the obnoxious, intoxicated patron out of the dining lounge.",
        "examTag": "SSC CHSL"
      },
      {
        "word": "Innocent",
        "partOfSpeech": "Adjective",
        "breakdown": "In (Not) + Noc (Harm) + ent",
        "hindi": "निर्दोष / बेकसूर / निष्पाप",
        "meaning": "Not guilty of a crime or other misdeed; not intended to cause harm.",
        "example": "The appellate bench overturned the wrongful conviction and declared the defendant innocent.",
        "examTag": "SSC MTS"
      }
    ]
  }
},

  {
  "id": "v-root-l1-s3-10",
  "word": "Voc- / Vok-",
  "phonetic": "/vɒk/",
  "hindi": "पुकारना / वाणी / आवाज / आह्वान करना",
  "type": "root",
  "partOfSpeech": "Root Word",
  "meaning": "Latin root \"Vocare\" (to call, name, summon) and \"Vox\" (voice). It forms words describing loud outspokenness, ambiguous double-talk, provoking wrath, and irreversible decisions.",
  "synonyms": [
    "Call",
    "Voice",
    "Speak",
    "Summon",
    "Utter"
  ],
  "antonyms": [
    "Taciturn",
    "Silent",
    "Mute",
    "Reticent"
  ],
  "example": "The leader issued an unequivocal commitment to uphold fundamental constitutional guarantees.",
  "mnemonic": "Voc = Voice / Vocal (awaaz nikaalna ya pukaarna). Vociferous = aawaz buland karne wala. Provoke = uksana.",
  "frequency": "Repeated",
  "examTags": [
    "SSC CGL",
    "CHSL",
    "CPO",
    "Level 1",
    "Set 03",
    "Root Words"
  ],
  "collocation": "Root in Equivocal, Unequivocal, Vociferous, Irrevocable, Provoke, Evoke",
  "derivatives": "Equivocal, Unequivocal, Vociferous, Irrevocable, Provoke, Evoke, Revoke, Advocate",
  "level": "level-1",
  "set": "set-03",
  "rootFamily": {
    "origin": "Latin",
    "coreMeaning": "Call / Voice / Speak (पुकारना / वाणी / आवाज / आह्वान करना)",
    "counterRoot": {
      "root": "Tac- / Tacit-",
      "meaning": "Silent / Unspoken (मौन / शांत)"
    },
    "derivatives": [
      {
        "word": "Equivocal",
        "partOfSpeech": "Adjective",
        "breakdown": "Equi (Equal) + Voc (Voice) + al",
        "hindi": "द्व्यर्थी / संदिग्ध / गोलमोल / अस्पष्ट",
        "meaning": "Open to more than one interpretation; ambiguous; deliberately vague.",
        "example": "The politician gave an equivocal response when questioned directly about election funding.",
        "examTag": "SSC Repeated Syn/Ant"
      },
      {
        "word": "Unequivocal",
        "partOfSpeech": "Adjective",
        "breakdown": "Un (Not) + Equivocal (Ambiguous)",
        "hindi": "स्पष्ट / असंदिग्ध / साफ-साफ",
        "meaning": "Leaving no doubt; completely clear and unambiguous.",
        "example": "The chief scientist provided unequivocal evidence proving the groundwater was contaminated.",
        "examTag": "SSC CGL"
      },
      {
        "word": "Vociferous",
        "partOfSpeech": "Adjective",
        "breakdown": "Voc (Voice) + Fer (Carry / Bring) + ous",
        "hindi": "मुखर / शोरगुल मचाने वाला / जोरदार आवाज में विरोध करने वाला",
        "meaning": "Expressing feelings or opinions in a very loud, forceful, or clamorous way.",
        "example": "Vociferous protests erupted outside the city hall against the proposed utility fee hike.",
        "examTag": "SSC Repeated OWS"
      },
      {
        "word": "Irrevocable",
        "partOfSpeech": "Adjective",
        "breakdown": "Ir (Not) + Re (Back) + Voc (Call) + able",
        "hindi": "अटल / जिसे बदला न जा सके / अपरिवर्तनीय",
        "meaning": "Not able to be changed, reversed, or recovered; final and permanent.",
        "example": "Signing the deed made the transfer of property irrevocable under commercial law.",
        "examTag": "SSC CGL Mains"
      },
      {
        "word": "Provoke",
        "partOfSpeech": "Verb",
        "breakdown": "Pro (Forward) + Voke/Voc (Call)",
        "hindi": "उकसाना / भड़काना / उत्तेजित करना",
        "meaning": "Stimulate or incite someone to do or feel something, especially anger or violence.",
        "example": "Do not allow political rhetoric to provoke communal friction in our peaceful community.",
        "examTag": "SSC MTS"
      },
      {
        "word": "Evoke",
        "partOfSpeech": "Verb",
        "breakdown": "E (Out) + Voke/Voc (Call)",
        "hindi": "याद दिलाना / जाग्रत करना / भावना उत्पन्न करना",
        "meaning": "Bring or recall a feeling, memory, or image to the conscious mind.",
        "example": "The classical melody evoked nostalgic memories of golden childhood summers in the village.",
        "examTag": "SSC CHSL"
      }
    ]
  }
},

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
