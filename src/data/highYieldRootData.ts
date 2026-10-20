// HIGH-YIELD ROOT WORDS - INTERACTIVE WORD FAMILY MATRIX
// Curated for SSC CGL, CHSL, CPO, CDS, NDA, Bank PO, and CAT
// Each Root Word includes its Origin, Core Meaning, Antonym Counterpart, and a rich Word Family Tree

import { VocabItem } from './highYieldVocabData';

export const HIGH_YIELD_ROOT_WORDS: VocabItem[] = [
  {
    id: 'v-root-1',
    word: 'Bene- / Ben-',
    phonetic: '/bɛn/',
    hindi: 'अच्छा / शुभ / लाभकारी',
    type: 'root',
    partOfSpeech: 'Prefix / Root',
    meaning: 'Latin root meaning "Good", "Well", or "Favorable". It forms words representing acts of kindness, wellness, and advantage.',
    synonyms: ['Kindness', 'Favorable', 'Well-being', 'Advantageous'],
    antonyms: ['Mal- (Bad / Evil)', 'Malevolent', 'Malignant'],
    example: 'A benevolent person actively works to produce beneficial outcomes for the community.',
    mnemonic: 'Bene is the direct opposite of Mal (Malnutrition / Malpractice). Think of "Benefit" and "Bonus".',
    frequency: 'Repeated',
    examTags: ['SSC CGL', 'CHSL', 'CDS', 'CAT', 'Root Words'],
    collocation: 'Root in Benediction, Benefactor, Benevolent, Benign',
    derivatives: 'Benediction, Benefactor, Beneficent, Beneficial, Beneficiary, Benevolent, Benign',
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
    id: 'v-root-2',
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
    examTags: ['SSC CGL', 'CHSL', 'CPO', 'CDS', 'Root Words'],
    collocation: 'Root in Malice, Malignant, Malevolent, Malediction',
    derivatives: 'Malediction, Malefactor, Malevolent, Malignant, Malice, Malpractice, Malnutrition',
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
          meaning: 'A magical word or phrase uttered with the intention of bringing about evil or destruction; a curse.',
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
    id: 'v-root-3',
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
    examTags: ['SSC CGL', 'NDA', 'CDS', 'Root Words'],
    collocation: 'Root in Chronic illness, Synchronize clocks, Chronology',
    derivatives: 'Chronology, Synchronize, Chronic, Chronicle, Anachronism, Chronometer',
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
    id: 'v-root-4',
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
    examTags: ['SSC CGL', 'CHSL', 'CPO', 'CDS', 'Root Words'],
    collocation: 'Root in Philanthropy, Bibliophile, Philosophy',
    derivatives: 'Philanthropist, Bibliophile, Philosopher, Philology, Philharmonic, Philhellene',
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
          meaning: 'The branch of knowledge that deals with the structure, historical development, and relationships of languages.',
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
    id: 'v-root-5',
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
    examTags: ['SSC CGL', 'CHSL', 'CPO', 'Root Words'],
    collocation: 'Root in Misanthrope, Misogynist, Misogamist',
    derivatives: 'Misanthrope, Misogynist, Misogamist, Misology, Misoneism',
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
    id: 'v-root-6',
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
    examTags: ['SSC CGL', 'CHSL', 'CPO', 'CDS', 'Root Words'],
    collocation: 'Root in Loquacious, Eloquent, Soliloquy, Circumlocution',
    derivatives: 'Loquacious, Eloquent, Soliloquy, Colloquial, Circumlocution, Grandiloquent, Interlocutor',
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
          meaning: 'The use of many words where fewer would do, especially in a deliberate attempt to be vague.',
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
    id: 'v-root-7',
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
    examTags: ['SSC CGL', 'CHSL', 'CPO', 'Root Words'],
    collocation: 'Root in Ambidextrous, Ambiguous, Ambivalent, Amphibian',
    derivatives: 'Ambidextrous, Ambiguous, Ambivalent, Amphibian, Amphitheater',
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
          meaning: 'A cold-blooded vertebrate animal of a class comprising frogs, toads, and newts that live on land and in water.',
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
    id: 'v-root-8',
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
    examTags: ['SSC CGL', 'CHSL', 'CPO', 'Root Words'],
    collocation: 'Root in Omniscient, Omnipotent, Omnipresent, Omnivorous',
    derivatives: 'Omniscient, Omnipotent, Omnipresent, Omnivorous, Omnibus',
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
    id: 'v-root-9',
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
    examTags: ['SSC CGL', 'CHSL', 'CPO', 'CDS', 'Root Words'],
    collocation: 'Root in Sympathy, Empathy, Apathy, Antipathy, Pathology',
    derivatives: 'Sympathy, Empathy, Apathy, Antipathy, Telepathy, Pathology, Pathological',
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
    id: 'v-root-10',
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
    examTags: ['SSC CGL', 'CHSL', 'CDS', 'Root Words'],
    collocation: 'Root in Lucid, Elucidate, Luminous, Translucent',
    derivatives: 'Lucid, Elucidate, Luminous, Translucent, Pellucid, Illuminate',
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
    id: 'v-root-11',
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
    examTags: ['SSC CGL', 'CHSL', 'CPO', 'Root Words'],
    collocation: 'Root in Bellicose, Belligerent, Rebellion, Antebellum',
    derivatives: 'Bellicose, Belligerent, Rebellion, Antebellum, Postbellum',
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
    id: 'v-root-12',
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
    examTags: ['SSC CGL', 'CHSL', 'CPO', 'Root Words'],
    collocation: 'Root in Theist, Atheist, Theocracy, Theology, Pantheist',
    derivatives: 'Theist, Atheist, Theocracy, Theology, Pantheist, Monotheism, Polytheism',
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
  }
];
