// ============================================================================
// HIGH-YIELD HOMOGRAPHS (समान वर्तनी, भिन्न अर्थ)
// Curated for SSC CGL, CHSL, CPO, CDS, NDA & Banking Exams
// Source: RBE Officer Batch (Shubham Jain) - Complete Parts 1 & 2 (1 to 386)
// Total Groups: 159
// Total Entries: 386
// ============================================================================

export interface HomographSense {
  id: string;
  sno: number;
  partOfSpeech: string;
  posCategory: 'noun' | 'verb' | 'adj' | 'adv' | 'other';
  englishMeaning: string;
  hindiMeaning: string;
  englishSentence: string;
  hindiSentence: string;
}

export interface HomographGroup {
  id: string;
  word: string;
  phonetic?: string;
  sensesCount: number;
  senses: HomographSense[];
}

export const HOMOGRAPHS_DATA: HomographGroup[] = [
  {
    "id": "hg-group-10",
    "word": "Abandon",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-abandon-1",
        "sno": 23,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To leave behind or give up completely",
        "hindiMeaning": "त्याग देना",
        "englishSentence": "He abandoned the project midway.",
        "hindiSentence": "उसने परियोजना को बीच में ही छोड़ दिया।"
      },
      {
        "id": "hg-abandon-2",
        "sno": 24,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "Complete lack of restraint or inhibition",
        "hindiMeaning": "पूर्ण स्वतंत्रता / स्वेच्छा",
        "englishSentence": "She danced with wild abandon.",
        "hindiSentence": "उसने पूरी स्वेच्छा से नृत्य किया।"
      }
    ]
  },
  {
    "id": "hg-group-11",
    "word": "Abstract",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-abstract-1",
        "sno": 25,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Existing in thought but not physically real",
        "hindiMeaning": "अमूर्त",
        "englishSentence": "Love is an abstract concept.",
        "hindiSentence": "प्रेम एक अमूर्त अवधारणा है।"
      },
      {
        "id": "hg-abstract-2",
        "sno": 26,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A summary of a text or article",
        "hindiMeaning": "सारांश",
        "englishSentence": "Please read the abstract of the research paper.",
        "hindiSentence": "कृपया शोध पत्र का सारांश पढ़ें।"
      },
      {
        "id": "hg-abstract-3",
        "sno": 27,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To remove or take away, often secretly",
        "hindiMeaning": "निकाल लेना / चुराना",
        "englishSentence": "He abstracted some data from the system.",
        "hindiSentence": "उसने सिस्टम से कुछ डेटा निकाल लिया।"
      }
    ]
  },
  {
    "id": "hg-group-23",
    "word": "Account",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-account-1",
        "sno": 52,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A record or statement of financial expenditure",
        "hindiMeaning": "खाता",
        "englishSentence": "I opened a new savings account.",
        "hindiSentence": "मैंने एक नया बचत खाता खोला।"
      },
      {
        "id": "hg-account-2",
        "sno": 53,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A report or description of an event",
        "hindiMeaning": "विवरण",
        "englishSentence": "The witness gave a clear account of the accident.",
        "hindiSentence": "गवाह ने दुर्घटना का स्पष्ट विवरण दिया।"
      }
    ]
  },
  {
    "id": "hg-group-1",
    "word": "Address",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-address-1",
        "sno": 1,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "Details of a person's residence or location",
        "hindiMeaning": "पता",
        "englishSentence": "Please write your address clearly.",
        "hindiSentence": "कृपया अपना पता स्पष्ट रूप से लिखें।"
      },
      {
        "id": "hg-address-2",
        "sno": 2,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To speak to or direct speech to someone",
        "hindiMeaning": "संबोधित करना",
        "englishSentence": "The teacher addressed the class.",
        "hindiSentence": "शिक्षक ने कक्षा को संबोधित किया।"
      },
      {
        "id": "hg-address-3",
        "sno": 3,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To deal with a problem or issue",
        "hindiMeaning": "समाधान करना",
        "englishSentence": "We must address the problem of pollution.",
        "hindiSentence": "हमें प्रदूषण की समस्या का समाधान करना चाहिए।"
      }
    ]
  },
  {
    "id": "hg-group-19",
    "word": "Advance",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-advance-1",
        "sno": 43,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A forward movement or progress",
        "hindiMeaning": "प्रगति / अग्रिम",
        "englishSentence": "Science has made great advances in medicine.",
        "hindiSentence": "विज्ञान ने चिकित्सा में बड़ी प्रगति की है।"
      },
      {
        "id": "hg-advance-2",
        "sno": 44,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A payment made before due time",
        "hindiMeaning": "अग्रिम भुगतान",
        "englishSentence": "He received an advance of ₹10,000.",
        "hindiSentence": "उसे ₹10,000 का अग्रिम भुगतान मिला।"
      }
    ]
  },
  {
    "id": "hg-group-22",
    "word": "Affect",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-affect-1",
        "sno": 50,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To influence or cause a change",
        "hindiMeaning": "प्रभावित करना",
        "englishSentence": "Pollution affects our health.",
        "hindiSentence": "प्रदूषण हमारे स्वास्थ्य को प्रभावित करता है।"
      },
      {
        "id": "hg-affect-2",
        "sno": 51,
        "partOfSpeech": "Noun (Psychology)",
        "posCategory": "noun",
        "englishMeaning": "A visible emotion or feeling",
        "hindiMeaning": "भाव / भावना",
        "englishSentence": "His facial affect was flat.",
        "hindiSentence": "उसके चेहरे पर कोई भाव नहीं था।"
      }
    ]
  },
  {
    "id": "hg-group-20",
    "word": "Agitate",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-agitate-1",
        "sno": 45,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To stir or shake up",
        "hindiMeaning": "हिलाना / झकझोरना",
        "englishSentence": "Agitate the mixture before using.",
        "hindiSentence": "मिश्रण को उपयोग से पहले हिलाएं।"
      },
      {
        "id": "hg-agitate-2",
        "sno": 46,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To protest or campaign for something",
        "hindiMeaning": "आंदोलन करना",
        "englishSentence": "The workers agitated for better wages.",
        "hindiSentence": "मजदूरों ने बेहतर वेतन के लिए आंदोलन किया।"
      },
      {
        "id": "hg-agitate-3",
        "sno": 47,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To upset or disturb mentally",
        "hindiMeaning": "परेशान करना",
        "englishSentence": "The news agitated him greatly.",
        "hindiSentence": "उस खबर ने उसे बहुत परेशान कर दिया।"
      }
    ]
  },
  {
    "id": "hg-group-16",
    "word": "Alarm",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-alarm-1",
        "sno": 36,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A warning signal or device",
        "hindiMeaning": "चेतावनी संकेत / अलार्म",
        "englishSentence": "The fire alarm went off.",
        "hindiSentence": "आग का अलार्म बज गया।"
      },
      {
        "id": "hg-alarm-2",
        "sno": 37,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To cause fear or anxiety",
        "hindiMeaning": "डराना",
        "englishSentence": "The news of the earthquake alarmed the people.",
        "hindiSentence": "भूकंप की खबर ने लोगों को डरा दिया।"
      },
      {
        "id": "hg-alarm-3",
        "sno": 38,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "Sudden fear or concern",
        "hindiMeaning": "घबराहट",
        "englishSentence": "She looked at me in alarm.",
        "hindiSentence": "उसने घबराकर मेरी ओर देखा।"
      }
    ]
  },
  {
    "id": "hg-group-7",
    "word": "Angle",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-angle-1",
        "sno": 16,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The space between two lines meeting at a point",
        "hindiMeaning": "कोण",
        "englishSentence": "The angle between these walls is 90°.",
        "hindiSentence": "इन दीवारों के बीच का कोण 90° है।"
      },
      {
        "id": "hg-angle-2",
        "sno": 17,
        "partOfSpeech": "Verb (Figurative)",
        "posCategory": "verb",
        "englishMeaning": "To try to get something by indirect means",
        "hindiMeaning": "चालाकी से प्राप्त करने की कोशिश करना",
        "englishSentence": "He angled for a promotion.",
        "hindiSentence": "उसने पदोन्नति पाने की चाल चली।"
      }
    ]
  },
  {
    "id": "hg-group-12",
    "word": "Appeal",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-appeal-1",
        "sno": 28,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A request for support or help",
        "hindiMeaning": "निवेदन / अपील",
        "englishSentence": "The NGO made an appeal for donations.",
        "hindiSentence": "एनजीओ ने दान के लिए अपील की।"
      },
      {
        "id": "hg-appeal-2",
        "sno": 29,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "Attractiveness or charm",
        "hindiMeaning": "आकर्षण",
        "englishSentence": "Her simplicity adds to her appeal.",
        "hindiSentence": "उसकी सादगी उसके आकर्षण को बढ़ाती है।"
      }
    ]
  },
  {
    "id": "hg-group-13",
    "word": "Apply",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-apply-1",
        "sno": 30,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To make a formal request",
        "hindiMeaning": "आवेदन करना",
        "englishSentence": "I applied for a government job.",
        "hindiSentence": "मैंने सरकारी नौकरी के लिए आवेदन किया।"
      },
      {
        "id": "hg-apply-2",
        "sno": 31,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To put something to use",
        "hindiMeaning": "लगाना / प्रयोग करना",
        "englishSentence": "Apply the cream twice daily.",
        "hindiSentence": "इस क्रीम को दिन में दो बार लगाएं।"
      }
    ]
  },
  {
    "id": "hg-group-8",
    "word": "Arch",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-arch-1",
        "sno": 18,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A curved structure over an opening",
        "hindiMeaning": "मेहराब",
        "englishSentence": "The building has a beautiful arch.",
        "hindiSentence": "इमारत में एक सुंदर मेहराब है।"
      },
      {
        "id": "hg-arch-2",
        "sno": 19,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To make a curve or bend",
        "hindiMeaning": "मेहराब बनाना / मोड़ना",
        "englishSentence": "She arched her back in pain.",
        "hindiSentence": "उसने दर्द में अपनी पीठ को मोड़ा।"
      },
      {
        "id": "hg-arch-3",
        "sno": 20,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Mischievous or playful in manner",
        "hindiMeaning": "शरारती",
        "englishSentence": "He gave an arch smile.",
        "hindiSentence": "उसने शरारती मुस्कान दी।"
      }
    ]
  },
  {
    "id": "hg-group-2",
    "word": "Arm",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-arm-1",
        "sno": 4,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A limb of the body",
        "hindiMeaning": "भुजा",
        "englishSentence": "He broke his arm in the fall.",
        "hindiSentence": "गिरने में उसकी भुजा टूट गई।"
      },
      {
        "id": "hg-arm-2",
        "sno": 5,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To provide with weapons",
        "hindiMeaning": "हथियार देना",
        "englishSentence": "The rebels were armed with rifles.",
        "hindiSentence": "विद्रोहियों को राइफल से लैस किया गया।"
      }
    ]
  },
  {
    "id": "hg-group-21",
    "word": "Arrest",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-arrest-1",
        "sno": 48,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To take into custody",
        "hindiMeaning": "गिरफ़्तार करना",
        "englishSentence": "The police arrested the thief.",
        "hindiSentence": "पुलिस ने चोर को गिरफ़्तार कर लिया।"
      },
      {
        "id": "hg-arrest-2",
        "sno": 49,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To stop or halt a process or movement",
        "hindiMeaning": "रोकना",
        "englishSentence": "Early treatment can arrest the disease.",
        "hindiSentence": "प्रारंभिक उपचार रोग को रोक सकता है।"
      }
    ]
  },
  {
    "id": "hg-group-3",
    "word": "Article",
    "sensesCount": 4,
    "senses": [
      {
        "id": "hg-article-1",
        "sno": 6,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A written piece in a newspaper or magazine",
        "hindiMeaning": "लेख",
        "englishSentence": "I read an article on climate change.",
        "hindiSentence": "मैंने जलवायु परिवर्तन पर एक लेख पढ़ा।"
      },
      {
        "id": "hg-article-2",
        "sno": 7,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A specific item or object",
        "hindiMeaning": "वस्तु",
        "englishSentence": "This article is made of pure gold.",
        "hindiSentence": "यह वस्तु शुद्ध सोने की बनी है।"
      },
      {
        "id": "hg-article-3",
        "sno": 8,
        "partOfSpeech": "Noun (Grammar)",
        "posCategory": "noun",
        "englishMeaning": "A word like 'a', 'an', or 'the' that modifies a noun",
        "hindiMeaning": "आर्टिकल",
        "englishSentence": "'An' is used before a vowel sound.",
        "hindiSentence": "'An' का प्रयोग स्वर ध्वनि से पहले होता है।"
      },
      {
        "id": "hg-article-4",
        "sno": 9,
        "partOfSpeech": "Noun (Law)",
        "posCategory": "noun",
        "englishMeaning": "A clause or section in a legal document",
        "hindiMeaning": "अनुच्छेद",
        "englishSentence": "Article 370 was abrogated.",
        "hindiSentence": "अनुच्छेद 370 को हटाया गया।"
      }
    ]
  },
  {
    "id": "hg-group-4",
    "word": "Ash",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-ash-1",
        "sno": 10,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The powdery residue left after burning",
        "hindiMeaning": "राख",
        "englishSentence": "There was ash everywhere after the fire.",
        "hindiSentence": "आग के बाद हर जगह राख फैल गई थी।"
      },
      {
        "id": "hg-ash-2",
        "sno": 11,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A type of tree",
        "hindiMeaning": "ऐश वृक्ष",
        "englishSentence": "The ash tree grows quickly in this region.",
        "hindiSentence": "इस क्षेत्र में ऐश वृक्ष तेज़ी से बढ़ता है।"
      }
    ]
  },
  {
    "id": "hg-group-5",
    "word": "Associate",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-associate-1",
        "sno": 12,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To link or connect in thought",
        "hindiMeaning": "जोड़ना",
        "englishSentence": "People associate owls with wisdom.",
        "hindiSentence": "लोग उल्लुओं को बुद्धि से जोड़ते हैं।"
      },
      {
        "id": "hg-associate-2",
        "sno": 13,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A partner or colleague in business",
        "hindiMeaning": "सहयोगी",
        "englishSentence": "He is my associate in this firm.",
        "hindiSentence": "वह इस फर्म में मेरा सहयोगी है।"
      }
    ]
  },
  {
    "id": "hg-group-14",
    "word": "Assure",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-assure-1",
        "sno": 32,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To make someone feel confident or certain",
        "hindiMeaning": "आश्वस्त करना",
        "englishSentence": "I assure you everything will be fine.",
        "hindiSentence": "मैं आपको आश्वस्त करता हूँ कि सब ठीक होगा।"
      },
      {
        "id": "hg-assure-2",
        "sno": 33,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To insure something (esp. life)",
        "hindiMeaning": "बीमा करना",
        "englishSentence": "His life was assured for ₹10 lakhs.",
        "hindiSentence": "उसका जीवन ₹10 लाख का बीमाकृत था।"
      }
    ]
  },
  {
    "id": "hg-group-18",
    "word": "Attire",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-attire-1",
        "sno": 41,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "Clothing or garments",
        "hindiMeaning": "पोशाक",
        "englishSentence": "His attire was very formal.",
        "hindiSentence": "उसकी पोशाक बहुत औपचारिक थी।"
      },
      {
        "id": "hg-attire-2",
        "sno": 42,
        "partOfSpeech": "Verb (Archaic)",
        "posCategory": "verb",
        "englishMeaning": "To dress someone in garments",
        "hindiMeaning": "वस्त्र पहनाना",
        "englishSentence": "The bride was attired in red silk.",
        "hindiSentence": "दुल्हन ने लाल रेशम की पोशाक पहनी थी।"
      }
    ]
  },
  {
    "id": "hg-group-17",
    "word": "Attribute",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-attribute-1",
        "sno": 39,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To credit something as a cause or source",
        "hindiMeaning": "कारण बताना / श्रेय देना",
        "englishSentence": "She attributes her success to hard work.",
        "hindiSentence": "वह अपनी सफलता का श्रेय मेहनत को देती है।"
      },
      {
        "id": "hg-attribute-2",
        "sno": 40,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A quality or feature of something",
        "hindiMeaning": "गुण / विशेषता",
        "englishSentence": "Honesty is an essential attribute of a good leader.",
        "hindiSentence": "ईमानदारी एक अच्छे नेता का आवश्यक गुण है।"
      }
    ]
  },
  {
    "id": "hg-group-6",
    "word": "August",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-august-1",
        "sno": 14,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The eighth month of the year",
        "hindiMeaning": "अगस्त",
        "englishSentence": "Independence Day falls in August.",
        "hindiSentence": "स्वतंत्रता दिवस अगस्त में आता है।"
      },
      {
        "id": "hg-august-2",
        "sno": 15,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Respected and dignified",
        "hindiMeaning": "प्रतिष्ठित",
        "englishSentence": "He is an august member of the committee.",
        "hindiSentence": "वह समिति के एक प्रतिष्ठित सदस्य हैं।"
      }
    ]
  },
  {
    "id": "hg-group-15",
    "word": "Awful",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-awful-1",
        "sno": 34,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Very bad or unpleasant",
        "hindiMeaning": "बहुत बुरा",
        "englishSentence": "The weather was awful yesterday.",
        "hindiSentence": "कल मौसम बहुत खराब था।"
      },
      {
        "id": "hg-awful-2",
        "sno": 35,
        "partOfSpeech": "Adjective (Archaic)",
        "posCategory": "adj",
        "englishMeaning": "Inspiring fear or respect",
        "hindiMeaning": "भयावह / भय उत्पन्न करने वाला",
        "englishSentence": "The temple had an awful grandeur.",
        "hindiSentence": "मंदिर में एक भयावह भव्यता थी।"
      }
    ]
  },
  {
    "id": "hg-group-9",
    "word": "Axe",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-axe-1",
        "sno": 21,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A tool with a heavy bladed head used for chopping",
        "hindiMeaning": "कुल्हाड़ी",
        "englishSentence": "He chopped wood with an axe.",
        "hindiSentence": "उसने लकड़ी काटने के लिए कुल्हाड़ी का उपयोग किया।"
      },
      {
        "id": "hg-axe-2",
        "sno": 22,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To cut or remove suddenly, especially jobs or expenses",
        "hindiMeaning": "अचानक हटाना या समाप्त करना",
        "englishSentence": "The company axed 200 jobs.",
        "hindiSentence": "कंपनी ने 200 नौकरियां अचानक समाप्त कर दीं।"
      }
    ]
  },
  {
    "id": "hg-group-36",
    "word": "Bail",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-bail-1",
        "sno": 88,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "Money given for temporary release from jail",
        "hindiMeaning": "ज़मानत",
        "englishSentence": "He was released on bail.",
        "hindiSentence": "उसे ज़मानत पर रिहा किया गया।"
      },
      {
        "id": "hg-bail-2",
        "sno": 89,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To remove water from a boat",
        "hindiMeaning": "नाव से पानी निकालना",
        "englishSentence": "They bailed water from the boat using buckets.",
        "hindiSentence": "उन्होंने बाल्टी से नाव से पानी निकाला।"
      },
      {
        "id": "hg-bail-3",
        "sno": 90,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To abandon or leave suddenly (informal)",
        "hindiMeaning": "अचानक छोड़ देना",
        "englishSentence": "He bailed on the meeting last minute.",
        "hindiSentence": "वह आखिरी समय में बैठक छोड़कर चला गया।"
      }
    ]
  },
  {
    "id": "hg-group-34",
    "word": "Band",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-band-1",
        "sno": 82,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A group of musicians",
        "hindiMeaning": "संगीत मंडली",
        "englishSentence": "The band played lively music.",
        "hindiSentence": "बैंड ने उत्साही संगीत बजाया।"
      },
      {
        "id": "hg-band-2",
        "sno": 83,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A flat, thin strip of material",
        "hindiMeaning": "पट्टी / बैंड",
        "englishSentence": "She wore a gold band on her wrist.",
        "hindiSentence": "उसने अपनी कलाई पर सोने की पट्टी पहनी थी।"
      },
      {
        "id": "hg-band-3",
        "sno": 84,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To unite or group together",
        "hindiMeaning": "एकजुट होना",
        "englishSentence": "The students banded together for the protest.",
        "hindiSentence": "छात्र विरोध के लिए एकजुट हो गए।"
      }
    ]
  },
  {
    "id": "hg-group-24",
    "word": "Bank",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-bank-1",
        "sno": 54,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A financial institution where money is kept",
        "hindiMeaning": "बैंक",
        "englishSentence": "She deposited the cheque in the bank.",
        "hindiSentence": "उसने चेक बैंक में जमा किया।"
      },
      {
        "id": "hg-bank-2",
        "sno": 55,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The side of a river",
        "hindiMeaning": "नदी का किनारा",
        "englishSentence": "They had a picnic on the river bank.",
        "hindiSentence": "उन्होंने नदी के किनारे पिकनिक मनाई।"
      },
      {
        "id": "hg-bank-3",
        "sno": 56,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To tilt while turning (especially an aircraft)",
        "hindiMeaning": "झुकना / झुकाकर मोड़ना",
        "englishSentence": "The plane banked sharply to the left.",
        "hindiSentence": "विमान तेज़ी से बाईं ओर झुका।"
      }
    ]
  },
  {
    "id": "hg-group-35",
    "word": "Bar",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-bar-1",
        "sno": 85,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A place that serves alcoholic drinks",
        "hindiMeaning": "शराब की दुकान / बार",
        "englishSentence": "He met his friends at the bar.",
        "hindiSentence": "वह अपने दोस्तों से बार में मिला।"
      },
      {
        "id": "hg-bar-2",
        "sno": 86,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A long rod or rigid piece of material",
        "hindiMeaning": "छड़",
        "englishSentence": "The window had iron bars for safety.",
        "hindiSentence": "खिड़की में सुरक्षा के लिए लोहे की छड़ें लगी थीं।"
      },
      {
        "id": "hg-bar-3",
        "sno": 87,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To block or prevent movement",
        "hindiMeaning": "रोकना",
        "englishSentence": "The door was barred from the inside.",
        "hindiSentence": "दरवाज़ा अंदर से बंद था।"
      }
    ]
  },
  {
    "id": "hg-group-25",
    "word": "Bark",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-bark-1",
        "sno": 57,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The outer protective layer of a tree",
        "hindiMeaning": "पेड़ की छाल",
        "englishSentence": "The bark of this tree is used in medicine.",
        "hindiSentence": "इस पेड़ की छाल दवा में उपयोग की जाती है।"
      },
      {
        "id": "hg-bark-2",
        "sno": 58,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To make a loud, rough noise like a dog",
        "hindiMeaning": "भौंकना",
        "englishSentence": "The dog barked all night.",
        "hindiSentence": "कुत्ता पूरी रात भौंकता रहा।"
      }
    ]
  },
  {
    "id": "hg-group-38",
    "word": "Bash",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-bash-1",
        "sno": 94,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To hit something with great force",
        "hindiMeaning": "ज़ोर से मारना",
        "englishSentence": "He bashed the door with a hammer.",
        "hindiSentence": "उसने हथौड़े से दरवाज़ा ज़ोर से मारा।"
      },
      {
        "id": "hg-bash-2",
        "sno": 95,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A lively party or celebration (informal)",
        "hindiMeaning": "पार्टी",
        "englishSentence": "They threw a big birthday bash.",
        "hindiSentence": "उन्होंने शानदार जन्मदिन की पार्टी रखी।"
      }
    ]
  },
  {
    "id": "hg-group-26",
    "word": "Bat",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-bat-1",
        "sno": 59,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A flying nocturnal mammal",
        "hindiMeaning": "चमगादड़",
        "englishSentence": "A bat flew out of the cave.",
        "hindiSentence": "एक चमगादड़ गुफा से उड़ गया।"
      },
      {
        "id": "hg-bat-2",
        "sno": 60,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A wooden club used in sports like cricket or baseball",
        "hindiMeaning": "बल्ला",
        "englishSentence": "He hit a six with his new bat.",
        "hindiSentence": "उसने अपने नए बल्ले से छक्का मारा।"
      }
    ]
  },
  {
    "id": "hg-group-39",
    "word": "Beam",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-beam-1",
        "sno": 96,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A long, sturdy piece of timber or metal used in construction",
        "hindiMeaning": "शहतीर",
        "englishSentence": "The wooden beam supported the ceiling.",
        "hindiSentence": "लकड़ी की शहतीर छत को सहारा दे रही थी।"
      },
      {
        "id": "hg-beam-2",
        "sno": 97,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To smile broadly and happily",
        "hindiMeaning": "खिलखिला कर मुस्कुराना",
        "englishSentence": "She beamed with pride.",
        "hindiSentence": "वह गर्व से मुस्कुराई।"
      },
      {
        "id": "hg-beam-3",
        "sno": 98,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A ray or stream of light",
        "hindiMeaning": "प्रकाश की किरण",
        "englishSentence": "A beam of sunlight lit the room.",
        "hindiSentence": "सूरज की किरण ने कमरे को रोशन किया।"
      }
    ]
  },
  {
    "id": "hg-group-27",
    "word": "Bear",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-bear-1",
        "sno": 61,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To carry or support",
        "hindiMeaning": "सहन करना / उठाना",
        "englishSentence": "I can't bear this pain any longer.",
        "hindiSentence": "मैं अब यह दर्द सहन नहीं कर सकता।"
      },
      {
        "id": "hg-bear-2",
        "sno": 62,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A large, heavy mammal",
        "hindiMeaning": "भालू",
        "englishSentence": "The bear attacked the campsite.",
        "hindiSentence": "भालू ने कैंप पर हमला कर दिया।"
      },
      {
        "id": "hg-bear-3",
        "sno": 63,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To give birth (used formally or literarily)",
        "hindiMeaning": "जन्म देना",
        "englishSentence": "She bore twins last month.",
        "hindiSentence": "उसने पिछले महीने जुड़वां बच्चों को जन्म दिया।"
      }
    ]
  },
  {
    "id": "hg-group-40",
    "word": "Beat",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-beat-1",
        "sno": 99,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To strike repeatedly",
        "hindiMeaning": "पीटना",
        "englishSentence": "The rain beat against the windows.",
        "hindiSentence": "बारिश खिड़कियों से टकराती रही।"
      },
      {
        "id": "hg-beat-2",
        "sno": 100,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A regular rhythm in music or movement",
        "hindiMeaning": "ताल / लय",
        "englishSentence": "The beat of the drum was loud.",
        "hindiSentence": "ढोल की ताल तेज़ थी।"
      }
    ]
  },
  {
    "id": "hg-group-41",
    "word": "Bent",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-bent-1",
        "sno": 101,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Not straight; curved",
        "hindiMeaning": "मुड़ा हुआ",
        "englishSentence": "The rod was bent at the end.",
        "hindiSentence": "छड़ का सिरा मुड़ा हुआ था।"
      },
      {
        "id": "hg-bent-2",
        "sno": 102,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A natural talent or inclination",
        "hindiMeaning": "प्रवृत्ति / झुकाव",
        "englishSentence": "He has a bent for mathematics.",
        "hindiSentence": "उसे गणित में रुचि है।"
      }
    ]
  },
  {
    "id": "hg-group-28",
    "word": "Bill",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-bill-1",
        "sno": 64,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A statement of charges or payment due",
        "hindiMeaning": "बिल / पर्ची",
        "englishSentence": "I paid the electricity bill today.",
        "hindiSentence": "मैंने आज बिजली का बिल भरा।"
      },
      {
        "id": "hg-bill-2",
        "sno": 65,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A proposed law presented in parliament",
        "hindiMeaning": "विधेयक",
        "englishSentence": "The education bill was passed yesterday.",
        "hindiSentence": "शिक्षा विधेयक कल पारित हो गया।"
      },
      {
        "id": "hg-bill-3",
        "sno": 66,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The beak of a bird",
        "hindiMeaning": "चोंच",
        "englishSentence": "The stork has a long bill.",
        "hindiSentence": "सारस की चोंच लंबी होती है।"
      }
    ]
  },
  {
    "id": "hg-group-37",
    "word": "Bit",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-bit-1",
        "sno": 91,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A small piece or amount",
        "hindiMeaning": "छोटा टुकड़ा",
        "englishSentence": "Give me a bit of cake.",
        "hindiSentence": "मुझे थोड़ा सा केक दो।"
      },
      {
        "id": "hg-bit-2",
        "sno": 92,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A metal mouthpiece for a horse",
        "hindiMeaning": "लगाम का हिस्सा",
        "englishSentence": "The horse resisted the bit.",
        "hindiSentence": "घोड़े ने लगाम से विरोध किया।"
      },
      {
        "id": "hg-bit-3",
        "sno": 93,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A unit of digital information in computing",
        "hindiMeaning": "कंप्यूटर डेटा इकाई",
        "englishSentence": "Data is stored in bits and bytes.",
        "hindiSentence": "डेटा बिट्स और बाइट्स में संग्रहीत होता है।"
      }
    ]
  },
  {
    "id": "hg-group-42",
    "word": "Bite",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-bite-1",
        "sno": 103,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To use teeth to cut",
        "hindiMeaning": "काटना",
        "englishSentence": "The dog tried to bite him.",
        "hindiSentence": "कुत्ते ने उसे काटने की कोशिश की।"
      },
      {
        "id": "hg-bite-2",
        "sno": 104,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A small portion of food taken into the mouth",
        "hindiMeaning": "एक कौर",
        "englishSentence": "She took a bite of the sandwich.",
        "hindiSentence": "उसने सैंडविच का एक कौर लिया।"
      }
    ]
  },
  {
    "id": "hg-group-43",
    "word": "Bluff",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-bluff-1",
        "sno": 105,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To mislead by pretending confidence",
        "hindiMeaning": "झांसा देना",
        "englishSentence": "He bluffed his way into the event.",
        "hindiSentence": "उसने झांसा देकर कार्यक्रम में प्रवेश किया।"
      },
      {
        "id": "hg-bluff-2",
        "sno": 106,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A steep cliff, especially by the sea or river",
        "hindiMeaning": "खड़ी चट्टान",
        "englishSentence": "They hiked to the edge of the bluff.",
        "hindiSentence": "वे खड़ी चट्टान के किनारे तक गए।"
      }
    ]
  },
  {
    "id": "hg-group-29",
    "word": "Bolt",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-bolt-1",
        "sno": 67,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A metal fastener with threads",
        "hindiMeaning": "बोल्ट",
        "englishSentence": "The mechanic tightened the bolt.",
        "hindiSentence": "मैकेनिक ने बोल्ट कसा।"
      },
      {
        "id": "hg-bolt-2",
        "sno": 68,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To run away suddenly",
        "hindiMeaning": "तेज़ी से भागना",
        "englishSentence": "The horse bolted from the stable.",
        "hindiSentence": "घोड़ा अस्तबल से तेज़ी से भाग गया।"
      },
      {
        "id": "hg-bolt-3",
        "sno": 69,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A flash of lightning",
        "hindiMeaning": "बिजली की चमक",
        "englishSentence": "A bolt of lightning struck the tree.",
        "hindiSentence": "बिजली की एक चमक पेड़ पर गिरी।"
      }
    ]
  },
  {
    "id": "hg-group-30",
    "word": "Book",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-book-1",
        "sno": 70,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A set of printed pages bound together",
        "hindiMeaning": "किताब",
        "englishSentence": "I borrowed a book from the library.",
        "hindiSentence": "मैंने पुस्तकालय से एक किताब उधार ली।"
      },
      {
        "id": "hg-book-2",
        "sno": 71,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To reserve in advance",
        "hindiMeaning": "आरक्षित करना",
        "englishSentence": "I booked a table at the restaurant.",
        "hindiSentence": "मैंने रेस्तरां में टेबल बुक की।"
      },
      {
        "id": "hg-book-3",
        "sno": 72,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To record a charge or offence officially",
        "hindiMeaning": "दर्ज करना (कानूनी)",
        "englishSentence": "He was booked for speeding.",
        "hindiSentence": "उसे तेज़ गाड़ी चलाने के लिए बुक किया गया।"
      }
    ]
  },
  {
    "id": "hg-group-31",
    "word": "Bow",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-bow-1",
        "sno": 73,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To bend the upper part of the body in respect",
        "hindiMeaning": "झुकना",
        "englishSentence": "He bowed before the king.",
        "hindiSentence": "उसने राजा के सामने झुककर प्रणाम किया।"
      },
      {
        "id": "hg-bow-2",
        "sno": 74,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A weapon for shooting arrows",
        "hindiMeaning": "धनुष",
        "englishSentence": "He aimed the arrow with his bow.",
        "hindiSentence": "उसने अपने धनुष से तीर साधा।"
      },
      {
        "id": "hg-bow-3",
        "sno": 75,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The front part of a ship",
        "hindiMeaning": "जहाज़ का अगला हिस्सा",
        "englishSentence": "The sailor stood at the bow of the ship.",
        "hindiSentence": "नाविक जहाज़ के अगले हिस्से में खड़ा था।"
      }
    ]
  },
  {
    "id": "hg-group-32",
    "word": "Box",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-box-1",
        "sno": 76,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A container, usually with a lid",
        "hindiMeaning": "डिब्बा",
        "englishSentence": "She kept the jewelry in a box.",
        "hindiSentence": "उसने गहने डिब्बे में रखे।"
      },
      {
        "id": "hg-box-2",
        "sno": 77,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To fight with fists (as in boxing)",
        "hindiMeaning": "मुक्केबाज़ी करना",
        "englishSentence": "They boxed for the championship title.",
        "hindiSentence": "उन्होंने चैम्पियनशिप खिताब के लिए मुक्केबाज़ी की।"
      },
      {
        "id": "hg-box-3",
        "sno": 78,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To enclose or confine something",
        "hindiMeaning": "बंद करना / घेरना",
        "englishSentence": "Please box the items before delivery.",
        "hindiSentence": "कृपया डिलीवरी से पहले सामान को डिब्बे में बंद करें।"
      }
    ]
  },
  {
    "id": "hg-group-33",
    "word": "Break",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-break-1",
        "sno": 79,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To cause something to separate into pieces",
        "hindiMeaning": "तोड़ना",
        "englishSentence": "She broke the glass by accident.",
        "hindiSentence": "उसने गलती से गिलास तोड़ दिया।"
      },
      {
        "id": "hg-break-2",
        "sno": 80,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A pause or interruption in activity",
        "hindiMeaning": "विराम",
        "englishSentence": "Let's take a short break.",
        "hindiSentence": "चलिए एक छोटा सा विराम लेते हैं।"
      },
      {
        "id": "hg-break-3",
        "sno": 81,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To violate a rule or law",
        "hindiMeaning": "उल्लंघन करना",
        "englishSentence": "He broke the speed limit.",
        "hindiSentence": "उसने गति सीमा का उल्लंघन किया।"
      }
    ]
  },
  {
    "id": "hg-group-44",
    "word": "Can",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-can-1",
        "sno": 107,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To be able to do something",
        "hindiMeaning": "कर सकना",
        "englishSentence": "She can speak French fluently.",
        "hindiSentence": "वह धाराप्रवाह फ्रेंच बोल सकती है।"
      },
      {
        "id": "hg-can-2",
        "sno": 108,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A metal container for food or liquid",
        "hindiMeaning": "टिन का डिब्बा",
        "englishSentence": "He drank a can of soda.",
        "hindiSentence": "उसने एक टिन सोडा पिया।"
      }
    ]
  },
  {
    "id": "hg-group-64",
    "word": "Cap",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-cap-1",
        "sno": 154,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A type of soft flat head covering",
        "hindiMeaning": "टोपी",
        "englishSentence": "He wore a red cap to the match.",
        "hindiSentence": "वह मैच में लाल टोपी पहनकर गया।"
      },
      {
        "id": "hg-cap-2",
        "sno": 155,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A protective cover or lid",
        "hindiMeaning": "ढक्कन",
        "englishSentence": "Put the cap back on the bottle.",
        "hindiSentence": "बोतल पर ढक्कन वापस लगाओ।"
      },
      {
        "id": "hg-cap-3",
        "sno": 156,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To limit or set a maximum",
        "hindiMeaning": "अधिकतम सीमा तय करना",
        "englishSentence": "The number of participants was capped at 100.",
        "hindiSentence": "प्रतिभागियों की संख्या 100 पर सीमित कर दी गई।"
      }
    ]
  },
  {
    "id": "hg-group-45",
    "word": "Capital",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-capital-1",
        "sno": 109,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A city where a government is based",
        "hindiMeaning": "राजधानी",
        "englishSentence": "Delhi is the capital of India.",
        "hindiSentence": "दिल्ली भारत की राजधानी है।"
      },
      {
        "id": "hg-capital-2",
        "sno": 110,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "Money or assets used for investment",
        "hindiMeaning": "पूँजी",
        "englishSentence": "He invested his capital in a startup.",
        "hindiSentence": "उसने अपनी पूँजी एक स्टार्टअप में लगाई।"
      }
    ]
  },
  {
    "id": "hg-group-46",
    "word": "Case",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-case-1",
        "sno": 111,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A container or box",
        "hindiMeaning": "डिब्बा / संदूक",
        "englishSentence": "The tools are in that metal case.",
        "hindiSentence": "औज़ार उस धातु के डिब्बे में हैं।"
      },
      {
        "id": "hg-case-2",
        "sno": 112,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A legal matter before a court",
        "hindiMeaning": "मुक़दमा",
        "englishSentence": "The court will hear the case tomorrow.",
        "hindiSentence": "अदालत कल यह मुक़दमा सुनेगी।"
      },
      {
        "id": "hg-case-3",
        "sno": 113,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "An instance or example of something",
        "hindiMeaning": "उदाहरण / मामला",
        "englishSentence": "This is a rare case of survival.",
        "hindiSentence": "यह जीवित बचने का एक दुर्लभ मामला है।"
      }
    ]
  },
  {
    "id": "hg-group-47",
    "word": "Cast",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-cast-1",
        "sno": 114,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To throw something forcefully",
        "hindiMeaning": "फेंकना",
        "englishSentence": "He cast the fishing net into the water.",
        "hindiSentence": "उसने मछली पकड़ने का जाल पानी में फेंका।"
      },
      {
        "id": "hg-cast-2",
        "sno": 115,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The group of actors in a play or film",
        "hindiMeaning": "कलाकारों की टीम",
        "englishSentence": "The movie has a famous cast.",
        "hindiSentence": "फिल्म में प्रसिद्ध कलाकारों की टीम है।"
      },
      {
        "id": "hg-cast-3",
        "sno": 116,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To shape metal or other material by pouring into a mold",
        "hindiMeaning": "ढालना / साँचे में ढालना",
        "englishSentence": "The statue was cast in bronze.",
        "hindiSentence": "मूर्ति कांस्य में ढाली गई थी।"
      }
    ]
  },
  {
    "id": "hg-group-65",
    "word": "Cell",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-cell-1",
        "sno": 157,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A small room, often in a prison or monastery",
        "hindiMeaning": "कोठरी / सेल",
        "englishSentence": "He spent a night in the jail cell.",
        "hindiSentence": "उसने जेल की कोठरी में एक रात बिताई।"
      },
      {
        "id": "hg-cell-2",
        "sno": 158,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The basic unit of life in biology",
        "hindiMeaning": "कोशिका",
        "englishSentence": "The human body is made of millions of cells.",
        "hindiSentence": "मानव शरीर लाखों कोशिकाओं से बना है।"
      },
      {
        "id": "hg-cell-3",
        "sno": 159,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A small group working independently (esp. secret or military)",
        "hindiMeaning": "इकाई / संगठन समूह",
        "englishSentence": "The spy belonged to a sleeper cell.",
        "hindiSentence": "वह जासूस एक स्लीपर सेल से संबंधित था।"
      }
    ]
  },
  {
    "id": "hg-group-52",
    "word": "Chain",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-chain-1",
        "sno": 126,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A connected series of metal rings",
        "hindiMeaning": "ज़ंजीर",
        "englishSentence": "He locked the gate with a chain.",
        "hindiSentence": "उसने दरवाज़े को ज़ंजीर से बंद किया।"
      },
      {
        "id": "hg-chain-2",
        "sno": 127,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A series of connected people or events",
        "hindiMeaning": "श्रृंखला",
        "englishSentence": "The chain of events led to his downfall.",
        "hindiSentence": "घटनाओं की श्रृंखला ने उसके पतन का कारण बना।"
      }
    ]
  },
  {
    "id": "hg-group-66",
    "word": "Charge",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-charge-1",
        "sno": 160,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The price or cost of a service",
        "hindiMeaning": "शुल्क",
        "englishSentence": "What's the delivery charge?",
        "hindiSentence": "डिलीवरी शुल्क कितना है?"
      },
      {
        "id": "hg-charge-2",
        "sno": 161,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To formally accuse someone of a crime",
        "hindiMeaning": "आरोप लगाना",
        "englishSentence": "He was charged with theft.",
        "hindiSentence": "उस पर चोरी का आरोप लगाया गया।"
      },
      {
        "id": "hg-charge-3",
        "sno": 162,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To rush forward in attack",
        "hindiMeaning": "झपटना / धावा बोलना",
        "englishSentence": "The soldiers charged at the enemy.",
        "hindiSentence": "सैनिकों ने दुश्मन पर धावा बोल दिया।"
      }
    ]
  },
  {
    "id": "hg-group-53",
    "word": "Check",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-check-1",
        "sno": 128,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To examine or inspect",
        "hindiMeaning": "जाँचना",
        "englishSentence": "Please check your answers before submitting.",
        "hindiSentence": "कृपया उत्तर जमा करने से पहले जाँच लें।"
      },
      {
        "id": "hg-check-2",
        "sno": 129,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A written order for payment",
        "hindiMeaning": "चेक (बैंक)",
        "englishSentence": "He paid the bill by cheque.",
        "hindiSentence": "उसने चेक द्वारा बिल चुकाया।"
      }
    ]
  },
  {
    "id": "hg-group-54",
    "word": "Chest",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-chest-1",
        "sno": 130,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A large strong box for storage",
        "hindiMeaning": "संदूक",
        "englishSentence": "He kept the money in a wooden chest.",
        "hindiSentence": "उसने पैसे लकड़ी के संदूक में रखे।"
      },
      {
        "id": "hg-chest-2",
        "sno": 131,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The front upper part of the human body",
        "hindiMeaning": "छाती",
        "englishSentence": "He had pain in his chest.",
        "hindiSentence": "उसकी छाती में दर्द था।"
      }
    ]
  },
  {
    "id": "hg-group-55",
    "word": "Chuck",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-chuck-1",
        "sno": 132,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To throw something casually",
        "hindiMeaning": "हल्के में फेंकना",
        "englishSentence": "He chucked the paper in the bin.",
        "hindiSentence": "उसने कागज़ को डस्टबिन में फेंक दिया।"
      },
      {
        "id": "hg-chuck-2",
        "sno": 133,
        "partOfSpeech": "Noun (Informal)",
        "posCategory": "noun",
        "englishMeaning": "A light pat or tap, especially under the chin",
        "hindiMeaning": "ठिठोली में थपकी देना",
        "englishSentence": "He gave the baby a chuck under the chin.",
        "hindiSentence": "उसने बच्चे की ठुड्डी पर हल्की थपकी दी।"
      }
    ]
  },
  {
    "id": "hg-group-70",
    "word": "Clear",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-clear-1",
        "sno": 170,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To remove obstacles or make something open",
        "hindiMeaning": "हटाना / साफ़ करना",
        "englishSentence": "Please clear the table.",
        "hindiSentence": "कृपया मेज़ साफ़ करें।"
      },
      {
        "id": "hg-clear-2",
        "sno": 171,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To approve a document or person officially",
        "hindiMeaning": "स्वीकृति देना / मंज़ूरी मिलना",
        "englishSentence": "He was cleared by the committee.",
        "hindiSentence": "उसे समिति द्वारा मंज़ूरी मिल गई।"
      }
    ]
  },
  {
    "id": "hg-group-56",
    "word": "Clip",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-clip-1",
        "sno": 134,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A small device for holding things together",
        "hindiMeaning": "क्लिप",
        "englishSentence": "She attached the papers with a clip.",
        "hindiSentence": "उसने कागज़ों को क्लिप से जोड़ा।"
      },
      {
        "id": "hg-clip-2",
        "sno": 135,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To cut or trim something",
        "hindiMeaning": "काटना / छाँटना",
        "englishSentence": "He clipped the hedge neatly.",
        "hindiSentence": "उसने झाड़ियों को अच्छे से छाँटा।"
      },
      {
        "id": "hg-clip-3",
        "sno": 136,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A short segment from a film or video",
        "hindiMeaning": "वीडियो अंश",
        "englishSentence": "I saw a clip from the upcoming movie.",
        "hindiSentence": "मैंने आने वाली फिल्म का एक वीडियो अंश देखा।"
      }
    ]
  },
  {
    "id": "hg-group-48",
    "word": "Club",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-club-1",
        "sno": 117,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A place for social or recreational activity",
        "hindiMeaning": "क्लब",
        "englishSentence": "They go to the sports club every weekend.",
        "hindiSentence": "वे हर सप्ताहांत खेल क्लब जाते हैं।"
      },
      {
        "id": "hg-club-2",
        "sno": 118,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To hit with a heavy object",
        "hindiMeaning": "डंडे से मारना",
        "englishSentence": "The thief was clubbed unconscious.",
        "hindiSentence": "चोर को डंडे से मारकर बेहोश कर दिया गया।"
      }
    ]
  },
  {
    "id": "hg-group-61",
    "word": "Coach",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-coach-1",
        "sno": 148,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A trainer or instructor, especially in sports",
        "hindiMeaning": "कोच",
        "englishSentence": "The team won under their new coach.",
        "hindiSentence": "टीम ने अपने नए कोच के नेतृत्व में जीत हासिल की।"
      },
      {
        "id": "hg-coach-2",
        "sno": 149,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A railway carriage for passengers",
        "hindiMeaning": "डिब्बा",
        "englishSentence": "We were seated in coach number S5.",
        "hindiSentence": "हम एस5 नंबर डिब्बे में बैठे थे।"
      }
    ]
  },
  {
    "id": "hg-group-59",
    "word": "Compact",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-compact-1",
        "sno": 142,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Small and efficiently arranged",
        "hindiMeaning": "छोटा और समायोजित",
        "englishSentence": "This is a compact camera for travel.",
        "hindiSentence": "यह यात्रा के लिए एक छोटा कैमरा है।"
      },
      {
        "id": "hg-compact-2",
        "sno": 143,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A small cosmetic case with mirror and powder",
        "hindiMeaning": "कॉम्पैक्ट डिब्बी",
        "englishSentence": "She took out her compact to fix her makeup.",
        "hindiSentence": "उसने मेकअप ठीक करने के लिए अपनी कॉम्पैक्ट निकाली।"
      },
      {
        "id": "hg-compact-3",
        "sno": 144,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To compress or pack tightly",
        "hindiMeaning": "दबाकर छोटा करना",
        "englishSentence": "The machine compacts the waste.",
        "hindiSentence": "मशीन कचरे को दबाकर छोटा करती है।"
      }
    ]
  },
  {
    "id": "hg-group-57",
    "word": "Compound",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-compound-1",
        "sno": 137,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A walled or fenced area, especially a residential enclosure",
        "hindiMeaning": "परिसर",
        "englishSentence": "The kids played inside the school compound.",
        "hindiSentence": "बच्चे स्कूल के परिसर में खेल रहे थे।"
      },
      {
        "id": "hg-compound-2",
        "sno": 138,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A substance formed from two or more elements",
        "hindiMeaning": "यौगिक",
        "englishSentence": "Water is a chemical compound.",
        "hindiSentence": "पानी एक रासायनिक यौगिक है।"
      },
      {
        "id": "hg-compound-3",
        "sno": 139,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To make something worse by adding to it",
        "hindiMeaning": "और बिगाड़ना",
        "englishSentence": "His rudeness compounded the problem.",
        "hindiSentence": "उसकी बदतमीज़ी ने समस्या को और बिगाड़ दिया।"
      }
    ]
  },
  {
    "id": "hg-group-58",
    "word": "Conduct",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-conduct-1",
        "sno": 140,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To direct or manage an activity",
        "hindiMeaning": "संचालन करना",
        "englishSentence": "The teacher conducted the experiment.",
        "hindiSentence": "शिक्षक ने प्रयोग का संचालन किया।"
      },
      {
        "id": "hg-conduct-2",
        "sno": 141,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "Behaviour or manner of a person",
        "hindiMeaning": "आचरण",
        "englishSentence": "His conduct was respectful.",
        "hindiSentence": "उसका आचरण सम्मानजनक था।"
      }
    ]
  },
  {
    "id": "hg-group-50",
    "word": "Content",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-content-1",
        "sno": 121,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The topics or material contained in something",
        "hindiMeaning": "सामग्री / विषय-वस्तु",
        "englishSentence": "The content of the book is excellent.",
        "hindiSentence": "पुस्तक की विषय-वस्तु उत्कृष्ट है।"
      },
      {
        "id": "hg-content-2",
        "sno": 122,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Satisfied; happy with what one has",
        "hindiMeaning": "संतुष्ट",
        "englishSentence": "She felt content with her work.",
        "hindiSentence": "वह अपने काम से संतुष्ट थी।"
      }
    ]
  },
  {
    "id": "hg-group-51",
    "word": "Contract",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-contract-1",
        "sno": 123,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A written legal agreement",
        "hindiMeaning": "अनुबंध",
        "englishSentence": "He signed a contract with the company.",
        "hindiSentence": "उसने कंपनी के साथ एक अनुबंध पर हस्ताक्षर किए।"
      },
      {
        "id": "hg-contract-2",
        "sno": 124,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To become smaller or shorter",
        "hindiMeaning": "सिकुड़ना",
        "englishSentence": "Metal contracts when cooled.",
        "hindiSentence": "धातु ठंडा होने पर सिकुड़ती है।"
      },
      {
        "id": "hg-contract-3",
        "sno": 125,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To catch or develop a disease",
        "hindiMeaning": "बीमारी लगना",
        "englishSentence": "She contracted the flu last week.",
        "hindiSentence": "उसे पिछले सप्ताह फ़्लू हो गया था।"
      }
    ]
  },
  {
    "id": "hg-group-62",
    "word": "Cool",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-cool-1",
        "sno": 150,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Moderately cold; not hot",
        "hindiMeaning": "ठंडा",
        "englishSentence": "The weather is cool today.",
        "hindiSentence": "आज मौसम ठंडा है।"
      },
      {
        "id": "hg-cool-2",
        "sno": 151,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Calm and unemotional",
        "hindiMeaning": "शांत / संयमित",
        "englishSentence": "He stayed cool during the argument.",
        "hindiSentence": "बहस के दौरान वह शांत रहा।"
      }
    ]
  },
  {
    "id": "hg-group-67",
    "word": "Court",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-court-1",
        "sno": 163,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A place where legal cases are heard",
        "hindiMeaning": "अदालत",
        "englishSentence": "The court delivered the verdict today.",
        "hindiSentence": "अदालत ने आज फैसला सुनाया।"
      },
      {
        "id": "hg-court-2",
        "sno": 164,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To try to win someone's affection or support",
        "hindiMeaning": "रिझाना / प्रोत्साहित करना",
        "englishSentence": "He is courting public favour.",
        "hindiSentence": "वह जनता का समर्थन जुटा रहा है।"
      },
      {
        "id": "hg-court-3",
        "sno": 165,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To risk something bad, like danger or failure",
        "hindiMeaning": "जोखिम लेना",
        "englishSentence": "You're courting disaster by ignoring safety rules.",
        "hindiSentence": "सुरक्षा नियमों की अनदेखी कर तुम मुसीबत मोल ले रहे हो।"
      }
    ]
  },
  {
    "id": "hg-group-68",
    "word": "Cover",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-cover-1",
        "sno": 166,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "Something used to protect or conceal",
        "hindiMeaning": "आवरण / कवर",
        "englishSentence": "The sofa had a plastic cover.",
        "hindiSentence": "सोफ़ा प्लास्टिक के कवर से ढंका था।"
      },
      {
        "id": "hg-cover-2",
        "sno": 167,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To deal with or report (an event, topic, cost, etc.)",
        "hindiMeaning": "शामिल करना / रिपोर्ट करना",
        "englishSentence": "The reporter covered the whole incident.",
        "hindiSentence": "रिपोर्टर ने पूरी घटना को कवर किया।"
      }
    ]
  },
  {
    "id": "hg-group-69",
    "word": "Crack",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-crack-1",
        "sno": 168,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A narrow break or fracture",
        "hindiMeaning": "दरार",
        "englishSentence": "There's a crack in the wall.",
        "hindiSentence": "दीवार में दरार है।"
      },
      {
        "id": "hg-crack-2",
        "sno": 169,
        "partOfSpeech": "Verb (Slang)",
        "posCategory": "verb",
        "englishMeaning": "To solve or figure out (e.g., a code)",
        "hindiMeaning": "हल करना",
        "englishSentence": "They cracked the secret code.",
        "hindiSentence": "उन्होंने गुप्त कोड हल कर लिया।"
      }
    ]
  },
  {
    "id": "hg-group-63",
    "word": "Crop",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-crop-1",
        "sno": 152,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A cultivated plant grown for food",
        "hindiMeaning": "फ़सल",
        "englishSentence": "Wheat is the main crop in Punjab.",
        "hindiSentence": "पंजाब में गेहूं मुख्य फसल है।"
      },
      {
        "id": "hg-crop-2",
        "sno": 153,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To cut short or trim",
        "hindiMeaning": "काटना / छाँटना",
        "englishSentence": "He cropped his hair very short.",
        "hindiSentence": "उसने अपने बाल बहुत छोटे काट लिए।"
      }
    ]
  },
  {
    "id": "hg-group-60",
    "word": "Cross",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-cross-1",
        "sno": 145,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A symbol (✝) representing Christianity or intersection",
        "hindiMeaning": "क्रॉस / क्रूस",
        "englishSentence": "She wore a silver cross on her necklace.",
        "hindiSentence": "उसने अपनी माला में एक चाँदी का क्रॉस पहना था।"
      },
      {
        "id": "hg-cross-2",
        "sno": 146,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To move from one side to another",
        "hindiMeaning": "पार करना",
        "englishSentence": "He crossed the road carefully.",
        "hindiSentence": "उसने सड़क ध्यान से पार की।"
      },
      {
        "id": "hg-cross-3",
        "sno": 147,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Annoyed or slightly angry",
        "hindiMeaning": "नाराज़",
        "englishSentence": "She looked cross when I interrupted her.",
        "hindiSentence": "जब मैंने उसे टोका, तो वह नाराज़ दिखी।"
      }
    ]
  },
  {
    "id": "hg-group-49",
    "word": "Current",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-current-1",
        "sno": 119,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A flow of water, air, or electricity",
        "hindiMeaning": "धारा",
        "englishSentence": "The river current was very strong.",
        "hindiSentence": "नदी की धारा बहुत तेज़ थी।"
      },
      {
        "id": "hg-current-2",
        "sno": 120,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Happening now; present",
        "hindiMeaning": "वर्तमान",
        "englishSentence": "The current situation is under control.",
        "hindiSentence": "वर्तमान स्थिति नियंत्रण में है।"
      }
    ]
  },
  {
    "id": "hg-group-90",
    "word": "Damper",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-damper-1",
        "sno": 223,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "Something that dulls or suppresses enthusiasm",
        "hindiMeaning": "निरुत्साह पैदा करने वाली चीज़",
        "englishSentence": "The bad weather put a damper on our plans.",
        "hindiSentence": "खराब मौसम ने हमारी योजनाओं पर पानी फेर दिया।"
      },
      {
        "id": "hg-damper-2",
        "sno": 224,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A device that reduces vibration or noise",
        "hindiMeaning": "कंपन रोकने वाला यंत्र",
        "englishSentence": "The car has a damper to absorb shock.",
        "hindiSentence": "कार में झटका कम करने वाला डैम्पर होता है।"
      }
    ]
  },
  {
    "id": "hg-group-72",
    "word": "Dash",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-dash-1",
        "sno": 175,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To run or move quickly",
        "hindiMeaning": "तेज़ दौड़ना",
        "englishSentence": "He dashed across the street.",
        "hindiSentence": "वह सड़क पार तेज़ी से दौड़ा।"
      },
      {
        "id": "hg-dash-2",
        "sno": 176,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A small amount of something",
        "hindiMeaning": "थोड़ा सा",
        "englishSentence": "Add a dash of salt to the soup.",
        "hindiSentence": "सूप में थोड़ा सा नमक डालें।"
      }
    ]
  },
  {
    "id": "hg-group-71",
    "word": "Date",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-date-1",
        "sno": 172,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A particular day on the calendar",
        "hindiMeaning": "तारीख़",
        "englishSentence": "What's the date today?",
        "hindiSentence": "आज कौन सी तारीख़ है?"
      },
      {
        "id": "hg-date-2",
        "sno": 173,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A romantic or social meeting",
        "hindiMeaning": "मुलाक़ात (प्रेम संबंधी)",
        "englishSentence": "They went on their first date last week.",
        "hindiSentence": "वे पिछले हफ्ते अपनी पहली डेट पर गए।"
      },
      {
        "id": "hg-date-3",
        "sno": 174,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A sweet fruit from a palm tree",
        "hindiMeaning": "खजूर",
        "englishSentence": "He ate a bowl full of dates.",
        "hindiSentence": "उसने एक कटोरी खजूर खाए।"
      }
    ]
  },
  {
    "id": "hg-group-73",
    "word": "Deal",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-deal-1",
        "sno": 177,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To distribute or give out",
        "hindiMeaning": "बाँटना",
        "englishSentence": "He dealt the cards evenly.",
        "hindiSentence": "उसने पत्ते बराबर बाँटे।"
      },
      {
        "id": "hg-deal-2",
        "sno": 178,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "An agreement or bargain",
        "hindiMeaning": "सौदा",
        "englishSentence": "They signed the business deal yesterday.",
        "hindiSentence": "उन्होंने कल व्यापारिक सौदे पर हस्ताक्षर किए।"
      },
      {
        "id": "hg-deal-3",
        "sno": 179,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To handle or manage a situation",
        "hindiMeaning": "सामना करना / संभालना",
        "englishSentence": "She deals well with pressure.",
        "hindiSentence": "वह दबाव को अच्छे से संभालती है।"
      }
    ]
  },
  {
    "id": "hg-group-83",
    "word": "Deck",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-deck-1",
        "sno": 202,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A platform on a ship or building",
        "hindiMeaning": "डेक / फ़र्श",
        "englishSentence": "We stood on the deck to enjoy the view.",
        "hindiSentence": "हम नज़ारा देखने के लिए डेक पर खड़े थे।"
      },
      {
        "id": "hg-deck-2",
        "sno": 203,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To decorate or adorn something",
        "hindiMeaning": "सजाना",
        "englishSentence": "The hall was decked with flowers.",
        "hindiSentence": "हॉल फूलों से सजाया गया था।"
      }
    ]
  },
  {
    "id": "hg-group-88",
    "word": "Den",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-den-1",
        "sno": 217,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A wild animal's hidden home",
        "hindiMeaning": "मांद",
        "englishSentence": "The lion rested in its den.",
        "hindiSentence": "शेर अपनी मांद में आराम कर रहा था।"
      },
      {
        "id": "hg-den-2",
        "sno": 218,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A private, cozy room in a house",
        "hindiMeaning": "एकांत कमरा / अध्ययन कक्ष",
        "englishSentence": "He works from his den at home.",
        "hindiSentence": "वह अपने घर के एकांत कमरे से काम करता है।"
      },
      {
        "id": "hg-den-3",
        "sno": 219,
        "partOfSpeech": "Noun (Negative)",
        "posCategory": "noun",
        "englishMeaning": "A place of immoral activity",
        "hindiMeaning": "बुराई का अड्डा",
        "englishSentence": "The house was a den of thieves.",
        "hindiSentence": "वह घर चोरों का अड्डा था।"
      }
    ]
  },
  {
    "id": "hg-group-93",
    "word": "Dial",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-dial-1",
        "sno": 230,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The face of a clock or meter",
        "hindiMeaning": "घड़ी का डायल",
        "englishSentence": "The clock's dial glowed in the dark.",
        "hindiSentence": "घड़ी का डायल अंधेरे में चमक रहा था।"
      },
      {
        "id": "hg-dial-2",
        "sno": 231,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To make a phone call using a number",
        "hindiMeaning": "नंबर घुमाना / डायल करना",
        "englishSentence": "She dialled the emergency number.",
        "hindiSentence": "उसने आपातकालीन नंबर घुमाया।"
      }
    ]
  },
  {
    "id": "hg-group-74",
    "word": "Die",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-die-1",
        "sno": 180,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To cease living",
        "hindiMeaning": "मरना",
        "englishSentence": "The plant died due to lack of water.",
        "hindiSentence": "पानी की कमी से पौधा मर गया।"
      },
      {
        "id": "hg-die-2",
        "sno": 181,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A small cube used in games (singular of dice)",
        "hindiMeaning": "पासा",
        "englishSentence": "Roll the die to start the game.",
        "hindiSentence": "खेल शुरू करने के लिए पासा फेंको।"
      },
      {
        "id": "hg-die-3",
        "sno": 182,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A device used for shaping material in manufacturing",
        "hindiMeaning": "साँचा",
        "englishSentence": "The machine pressed the coin using a die.",
        "hindiSentence": "मशीन ने सिक्का साँचे से दबाकर बनाया।"
      }
    ]
  },
  {
    "id": "hg-group-89",
    "word": "Dig",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-dig-1",
        "sno": 220,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To break up and move soil",
        "hindiMeaning": "खोदना",
        "englishSentence": "He dug a hole to plant the tree.",
        "hindiSentence": "उसने पेड़ लगाने के लिए गड्ढा खोदा।"
      },
      {
        "id": "hg-dig-2",
        "sno": 221,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A sarcastic remark or insult",
        "hindiMeaning": "ताना",
        "englishSentence": "He made a dig at her accent.",
        "hindiSentence": "उसने उसकी बोली पर ताना कसा।"
      },
      {
        "id": "hg-dig-3",
        "sno": 222,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To research or investigate deeply",
        "hindiMeaning": "गहराई से खोज करना",
        "englishSentence": "She dug into the family history.",
        "hindiSentence": "उसने पारिवारिक इतिहास में गहराई से शोध किया।"
      }
    ]
  },
  {
    "id": "hg-group-91",
    "word": "Dispatch",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-dispatch-1",
        "sno": 225,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To send off to a destination",
        "hindiMeaning": "भेजना",
        "englishSentence": "The office dispatched the parcel today.",
        "hindiSentence": "कार्यालय ने आज पार्सल भेजा।"
      },
      {
        "id": "hg-dispatch-2",
        "sno": 226,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A message or report, especially official or military",
        "hindiMeaning": "आधिकारिक सूचना / संदेश",
        "englishSentence": "The commander sent a dispatch to headquarters.",
        "hindiSentence": "कमांडर ने मुख्यालय को सूचना भेजी।"
      },
      {
        "id": "hg-dispatch-3",
        "sno": 227,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "Promptness or speed in action",
        "hindiMeaning": "शीघ्रता / तेज़ी",
        "englishSentence": "She completed the task with dispatch.",
        "hindiSentence": "उसने काम शीघ्रता से पूरा किया।"
      }
    ]
  },
  {
    "id": "hg-group-92",
    "word": "Display",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-display-1",
        "sno": 228,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To show or exhibit",
        "hindiMeaning": "प्रदर्शित करना",
        "englishSentence": "The gallery displayed modern art.",
        "hindiSentence": "गैलरी में आधुनिक कला प्रदर्शित की गई।"
      },
      {
        "id": "hg-display-2",
        "sno": 229,
        "partOfSpeech": "Verb (Emotion)",
        "posCategory": "verb",
        "englishMeaning": "To express a feeling openly",
        "hindiMeaning": "भावना व्यक्त करना",
        "englishSentence": "He displayed no emotion at the verdict.",
        "hindiSentence": "उसने निर्णय पर कोई भावना नहीं दिखाई।"
      }
    ]
  },
  {
    "id": "hg-group-84",
    "word": "Ditch",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-ditch-1",
        "sno": 204,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A narrow trench for drainage",
        "hindiMeaning": "नाली",
        "englishSentence": "The car fell into a ditch.",
        "hindiSentence": "कार नाली में गिर गई।"
      },
      {
        "id": "hg-ditch-2",
        "sno": 205,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To abandon or get rid of something",
        "hindiMeaning": "छोड़ देना / भाग जाना",
        "englishSentence": "He ditched the plan at the last moment.",
        "hindiSentence": "उसने अंतिम क्षण में योजना छोड़ दी।"
      }
    ]
  },
  {
    "id": "hg-group-77",
    "word": "Dock",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-dock-1",
        "sno": 189,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A platform for loading and unloading ships",
        "hindiMeaning": "गोदी",
        "englishSentence": "The ship is anchored at the dock.",
        "hindiSentence": "जहाज़ गोदी पर खड़ा है।"
      },
      {
        "id": "hg-dock-2",
        "sno": 190,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To reduce an amount from pay or time",
        "hindiMeaning": "वेतन / समय से कटौती करना",
        "englishSentence": "His pay was docked for being late.",
        "hindiSentence": "देर से आने पर उसका वेतन काट लिया गया।"
      },
      {
        "id": "hg-dock-3",
        "sno": 191,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The place in court where the accused stands",
        "hindiMeaning": "कठघरा",
        "englishSentence": "The criminal stood in the dock silently.",
        "hindiSentence": "अपराधी चुपचाप कठघरे में खड़ा था।"
      }
    ]
  },
  {
    "id": "hg-group-94",
    "word": "Docket",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-docket-1",
        "sno": 232,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A list of cases for trial",
        "hindiMeaning": "मुकदमों की सूची",
        "englishSentence": "The judge reviewed today's docket.",
        "hindiSentence": "जज ने आज की मुकदमों की सूची देखी।"
      },
      {
        "id": "hg-docket-2",
        "sno": 233,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A tag or label attached to goods",
        "hindiMeaning": "टैग / लेबल",
        "englishSentence": "The docket showed the delivery time.",
        "hindiSentence": "डॉकेट पर डिलीवरी का समय लिखा था।"
      }
    ]
  },
  {
    "id": "hg-group-86",
    "word": "Down",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-down-1",
        "sno": 211,
        "partOfSpeech": "Adverb",
        "posCategory": "verb",
        "englishMeaning": "Toward a lower position",
        "hindiMeaning": "नीचे",
        "englishSentence": "She went down the stairs.",
        "hindiSentence": "वह सीढ़ियों से नीचे गई।"
      },
      {
        "id": "hg-down-2",
        "sno": 212,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Not functioning or sad",
        "hindiMeaning": "बंद / उदास",
        "englishSentence": "The server is down today.",
        "hindiSentence": "सर्वर आज बंद है।"
      },
      {
        "id": "hg-down-3",
        "sno": 213,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "Soft fine feathers from birds",
        "hindiMeaning": "मुलायम पंख",
        "englishSentence": "The pillow is filled with goose down.",
        "hindiSentence": "तकिया मुलायम हंस के पंखों से भरा है।"
      }
    ]
  },
  {
    "id": "hg-group-79",
    "word": "Draft",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-draft-1",
        "sno": 194,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A preliminary version of a document",
        "hindiMeaning": "मसौदा",
        "englishSentence": "He submitted the first draft of his essay.",
        "hindiSentence": "उसने अपने निबंध का पहला मसौदा सौंपा।"
      },
      {
        "id": "hg-draft-2",
        "sno": 195,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A current of air",
        "hindiMeaning": "हवा की हल्की लहर",
        "englishSentence": "A cold draft came through the window.",
        "hindiSentence": "खिड़की से ठंडी हवा की लहर आई।"
      }
    ]
  },
  {
    "id": "hg-group-76",
    "word": "Draw",
    "sensesCount": 5,
    "senses": [
      {
        "id": "hg-draw-1",
        "sno": 186,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To produce a picture using pen or pencil",
        "hindiMeaning": "चित्र बनाना",
        "englishSentence": "She loves to draw animals.",
        "hindiSentence": "उसे जानवरों के चित्र बनाना पसंद है।"
      },
      {
        "id": "hg-draw-2",
        "sno": 187,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To pull or drag something",
        "hindiMeaning": "खींचना",
        "englishSentence": "Draw the curtain, please.",
        "hindiSentence": "कृपया परदा खींच दो।"
      },
      {
        "id": "hg-draw-3",
        "sno": 188,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A game or contest that ends with no winner",
        "hindiMeaning": "बराबरी का मुकाबला",
        "englishSentence": "The match ended in a draw.",
        "hindiSentence": "मैच बराबरी पर समाप्त हुआ।"
      },
      {
        "id": "hg-draw-4",
        "sno": 206,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To attract or pull in",
        "hindiMeaning": "आकर्षित करना",
        "englishSentence": "The event drew a large crowd.",
        "hindiSentence": "इस कार्यक्रम ने बड़ी भीड़ को आकर्षित किया।"
      },
      {
        "id": "hg-draw-5",
        "sno": 207,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "An act of pulling out something (e.g., weapon or ticket)",
        "hindiMeaning": "निकालना",
        "englishSentence": "His quick draw saved his life.",
        "hindiSentence": "उसकी तेज़ी से हथियार निकालने ने उसकी जान बचाई।"
      }
    ]
  },
  {
    "id": "hg-group-81",
    "word": "Dress",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-dress-1",
        "sno": 198,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A one-piece garment for women",
        "hindiMeaning": "पोशाक",
        "englishSentence": "She wore a beautiful red dress.",
        "hindiSentence": "उसने एक सुंदर लाल पोशाक पहनी।"
      },
      {
        "id": "hg-dress-2",
        "sno": 199,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To clean and bandage a wound",
        "hindiMeaning": "घाव साफ़ कर पट्टी करना",
        "englishSentence": "The nurse dressed the wound.",
        "hindiSentence": "नर्स ने घाव की पट्टी की।"
      }
    ]
  },
  {
    "id": "hg-group-95",
    "word": "Drift",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-drift-1",
        "sno": 234,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To be carried slowly by air or water",
        "hindiMeaning": "बहना / बहती चली जाना",
        "englishSentence": "The boat drifted down the river.",
        "hindiSentence": "नाव नदी में बहती चली गई।"
      },
      {
        "id": "hg-drift-2",
        "sno": 235,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A slow movement or change",
        "hindiMeaning": "धीरे-धीरे बदलाव",
        "englishSentence": "There's a drift in public opinion.",
        "hindiSentence": "जनमत में धीरे-धीरे बदलाव आ रहा है।"
      },
      {
        "id": "hg-drift-3",
        "sno": 236,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A heap or pile formed by wind or current",
        "hindiMeaning": "ढेर",
        "englishSentence": "The snow formed drifts by the door.",
        "hindiSentence": "दरवाज़े के पास बर्फ़ के ढेर लग गए।"
      }
    ]
  },
  {
    "id": "hg-group-82",
    "word": "Drill",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-drill-1",
        "sno": 200,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A tool for making holes",
        "hindiMeaning": "ड्रिल मशीन",
        "englishSentence": "Use a drill to fix the shelf.",
        "hindiSentence": "शेल्फ लगाने के लिए ड्रिल का इस्तेमाल करो।"
      },
      {
        "id": "hg-drill-2",
        "sno": 201,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A practice or training session",
        "hindiMeaning": "अभ्यास / ड्रिल",
        "englishSentence": "We had a fire drill today.",
        "hindiSentence": "आज हमने अग्निशमन अभ्यास किया।"
      }
    ]
  },
  {
    "id": "hg-group-80",
    "word": "Drive",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-drive-1",
        "sno": 196,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To operate a vehicle",
        "hindiMeaning": "वाहन चलाना",
        "englishSentence": "She drives to work every day.",
        "hindiSentence": "वह हर दिन काम पर कार चलाकर जाती है।"
      },
      {
        "id": "hg-drive-2",
        "sno": 197,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "Determination or motivation",
        "hindiMeaning": "प्रेरणा / ऊर्जा",
        "englishSentence": "He has the drive to succeed.",
        "hindiSentence": "उसमें सफल होने की प्रेरणा है।"
      }
    ]
  },
  {
    "id": "hg-group-75",
    "word": "Drop",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-drop-1",
        "sno": 183,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To let something fall",
        "hindiMeaning": "गिराना",
        "englishSentence": "Don't drop the glass!",
        "hindiSentence": "गिलास मत गिराओ!"
      },
      {
        "id": "hg-drop-2",
        "sno": 184,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A small amount of liquid",
        "hindiMeaning": "बूँद",
        "englishSentence": "Just one drop of perfume is enough.",
        "hindiSentence": "इत्र की एक बूँद ही काफी है।"
      },
      {
        "id": "hg-drop-3",
        "sno": 185,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A decrease or reduction",
        "hindiMeaning": "गिरावट",
        "englishSentence": "There was a drop in temperature last night.",
        "hindiSentence": "कल रात तापमान में गिरावट आई।"
      }
    ]
  },
  {
    "id": "hg-group-97",
    "word": "Drown",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-drown-1",
        "sno": 239,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To die by submersion in water",
        "hindiMeaning": "डूबना",
        "englishSentence": "He drowned while swimming in the lake.",
        "hindiSentence": "वह झील में तैरते समय डूब गया।"
      },
      {
        "id": "hg-drown-2",
        "sno": 240,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To suppress a sound or voice with another",
        "hindiMeaning": "दबा देना (आवाज़)",
        "englishSentence": "The noise drowned her speech.",
        "hindiSentence": "शोर ने उसकी आवाज़ दबा दी।"
      }
    ]
  },
  {
    "id": "hg-group-96",
    "word": "Drum",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-drum-1",
        "sno": 237,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A percussion musical instrument",
        "hindiMeaning": "ढोल",
        "englishSentence": "He played the drum in the parade.",
        "hindiSentence": "उसने परेड में ढोल बजाया।"
      },
      {
        "id": "hg-drum-2",
        "sno": 238,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To beat rhythmically, usually on a surface",
        "hindiMeaning": "थपथपाना / बजाना",
        "englishSentence": "She drummed her fingers on the desk.",
        "hindiSentence": "उसने मेज़ पर उंगलियाँ थपथपाईं।"
      }
    ]
  },
  {
    "id": "hg-group-78",
    "word": "Duck",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-duck-1",
        "sno": 192,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A water bird with a broad bill",
        "hindiMeaning": "बत्तख",
        "englishSentence": "The duck swam across the pond.",
        "hindiSentence": "बत्तख तालाब में तैरी।"
      },
      {
        "id": "hg-duck-2",
        "sno": 193,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To lower your head or body quickly",
        "hindiMeaning": "झुक जाना",
        "englishSentence": "He ducked to avoid the ball.",
        "hindiSentence": "उसने गेंद से बचने के लिए झुककर बचाव किया।"
      }
    ]
  },
  {
    "id": "hg-group-87",
    "word": "Dull",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-dull-1",
        "sno": 214,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Not sharp or bright",
        "hindiMeaning": "कुंद / मंद",
        "englishSentence": "This knife is too dull to cut anything.",
        "hindiSentence": "यह चाकू बहुत कुंद है, कुछ भी नहीं काट सकता।"
      },
      {
        "id": "hg-dull-2",
        "sno": 215,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To make less sharp or intense",
        "hindiMeaning": "तीव्रता घटाना / कम करना",
        "englishSentence": "The painkillers dulled the ache.",
        "hindiSentence": "दर्द निवारक ने दर्द को कम कर दिया।"
      },
      {
        "id": "hg-dull-3",
        "sno": 216,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Boring or uninteresting",
        "hindiMeaning": "उबाऊ / नीरस",
        "englishSentence": "The lecture was dull and monotonous.",
        "hindiSentence": "व्याख्यान उबाऊ और नीरस था।"
      }
    ]
  },
  {
    "id": "hg-group-85",
    "word": "Dust",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-dust-1",
        "sno": 208,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "Fine dry particles of matter",
        "hindiMeaning": "धूल",
        "englishSentence": "The table was covered with dust.",
        "hindiSentence": "मेज़ पर धूल जमी हुई थी।"
      },
      {
        "id": "hg-dust-2",
        "sno": 209,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To remove dust from a surface",
        "hindiMeaning": "धूल झाड़ना",
        "englishSentence": "Please dust the bookshelf.",
        "hindiSentence": "कृपया किताबों की अलमारी की धूल साफ़ करो।"
      },
      {
        "id": "hg-dust-3",
        "sno": 210,
        "partOfSpeech": "Verb (Slang)",
        "posCategory": "verb",
        "englishMeaning": "To defeat or beat someone soundly",
        "hindiMeaning": "बुरी तरह हराना (स्लेंग)",
        "englishSentence": "They dusted their rivals in the finals.",
        "hindiSentence": "उन्होंने फाइनल में अपने प्रतिद्वंद्वियों को बुरी तरह हरा दिया।"
      }
    ]
  },
  {
    "id": "hg-group-108",
    "word": "Ease",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-ease-1",
        "sno": 266,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "Absence of difficulty or effort",
        "hindiMeaning": "आसानी / सरलता",
        "englishSentence": "He lifted the box with ease.",
        "hindiSentence": "उसने आसानी से डिब्बा उठा लिया।"
      },
      {
        "id": "hg-ease-2",
        "sno": 267,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To make something less severe or intense",
        "hindiMeaning": "कम करना / राहत देना",
        "englishSentence": "This medicine will ease your pain.",
        "hindiSentence": "यह दवा आपका दर्द कम करेगी।"
      },
      {
        "id": "hg-ease-3",
        "sno": 268,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To move carefully or gradually",
        "hindiMeaning": "धीरे-धीरे खिसकाना",
        "englishSentence": "She eased the chair back into place.",
        "hindiSentence": "उसने धीरे से कुर्सी को वापस जगह पर रखा।"
      }
    ]
  },
  {
    "id": "hg-group-98",
    "word": "Edge",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-edge-1",
        "sno": 241,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The boundary or border of something",
        "hindiMeaning": "किनारा",
        "englishSentence": "She stood at the edge of the cliff.",
        "hindiSentence": "वह पहाड़ी के किनारे पर खड़ी थी।"
      },
      {
        "id": "hg-edge-2",
        "sno": 242,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To move slowly and gradually",
        "hindiMeaning": "धीरे-धीरे बढ़ना",
        "englishSentence": "He edged towards the door.",
        "hindiSentence": "वह धीरे-धीरे दरवाज़े की ओर बढ़ा।"
      },
      {
        "id": "hg-edge-3",
        "sno": 243,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "An advantage over others",
        "hindiMeaning": "बढ़त",
        "englishSentence": "Her experience gave her an edge over other candidates.",
        "hindiSentence": "उसके अनुभव ने उसे अन्य उम्मीदवारों पर बढ़त दी।"
      }
    ]
  },
  {
    "id": "hg-group-116",
    "word": "Elevate",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-elevate-1",
        "sno": 283,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To raise something to a higher position",
        "hindiMeaning": "ऊपर उठाना",
        "englishSentence": "Please elevate your leg after surgery.",
        "hindiSentence": "ऑपरेशन के बाद अपना पैर ऊपर रखें।"
      },
      {
        "id": "hg-elevate-2",
        "sno": 284,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To improve moral or emotional status",
        "hindiMeaning": "मनोबल बढ़ाना",
        "englishSentence": "Music can elevate your mood.",
        "hindiSentence": "संगीत आपका मूड सुधार सकता है।"
      }
    ]
  },
  {
    "id": "hg-group-110",
    "word": "Employ",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-employ-1",
        "sno": 271,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To give someone work",
        "hindiMeaning": "नौकरी देना",
        "englishSentence": "The company employs 200 workers.",
        "hindiSentence": "कंपनी 200 कर्मचारियों को नौकरी देती है।"
      },
      {
        "id": "hg-employ-2",
        "sno": 272,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To use a method, tool, or strategy",
        "hindiMeaning": "उपयोग करना",
        "englishSentence": "He employed a clever technique.",
        "hindiSentence": "उसने एक चतुर तकनीक का उपयोग किया।"
      }
    ]
  },
  {
    "id": "hg-group-111",
    "word": "Enclose",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-enclose-1",
        "sno": 273,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To surround or close off something",
        "hindiMeaning": "घेरना / चारों ओर से बंद करना",
        "englishSentence": "The cottage was enclosed by trees.",
        "hindiSentence": "कॉटेज चारों ओर से पेड़ों से घिरा था।"
      },
      {
        "id": "hg-enclose-2",
        "sno": 274,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To include something inside an envelope",
        "hindiMeaning": "लिफ़ाफ़े में शामिल करना",
        "englishSentence": "I enclose my resume for your reference.",
        "hindiSentence": "मैं अपने संदर्भ के लिए रिज़्यूमे संलग्न करता हूँ।"
      }
    ]
  },
  {
    "id": "hg-group-109",
    "word": "Encounter",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-encounter-1",
        "sno": 269,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To come across something unexpectedly",
        "hindiMeaning": "आमना-सामना होना",
        "englishSentence": "We encountered a bear in the forest.",
        "hindiSentence": "जंगल में हमारा सामना एक भालू से हो गया।"
      },
      {
        "id": "hg-encounter-2",
        "sno": 270,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A violent or hostile confrontation",
        "hindiMeaning": "मुठभेड़",
        "englishSentence": "The encounter between police and robbers lasted an hour.",
        "hindiSentence": "पुलिस और लुटेरों के बीच मुठभेड़ एक घंटे चली।"
      }
    ]
  },
  {
    "id": "hg-group-105",
    "word": "End",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-end-1",
        "sno": 260,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The final part of something",
        "hindiMeaning": "अंत",
        "englishSentence": "The movie had a happy end.",
        "hindiSentence": "फिल्म का अंत सुखद था।"
      },
      {
        "id": "hg-end-2",
        "sno": 261,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To die (formal or literary)",
        "hindiMeaning": "मर जाना / समाप्त होना",
        "englishSentence": "Many lives ended during the war.",
        "hindiSentence": "युद्ध के दौरान कई लोगों की जान गई।"
      }
    ]
  },
  {
    "id": "hg-group-124",
    "word": "Endorse",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-endorse-1",
        "sno": 301,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To publicly support or approve",
        "hindiMeaning": "समर्थन करना",
        "englishSentence": "The celebrity endorsed the new product.",
        "hindiSentence": "सेलिब्रिटी ने नए उत्पाद का समर्थन किया।"
      },
      {
        "id": "hg-endorse-2",
        "sno": 302,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To sign a cheque or document",
        "hindiMeaning": "चेक या दस्तावेज़ पर हस्ताक्षर करना",
        "englishSentence": "He endorsed the cheque before depositing it.",
        "hindiSentence": "उसने चेक जमा करने से पहले उस पर हस्ताक्षर किए।"
      }
    ]
  },
  {
    "id": "hg-group-101",
    "word": "Engage",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-engage-1",
        "sno": 249,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To occupy or attract attention",
        "hindiMeaning": "ध्यान खींचना / व्यस्त करना",
        "englishSentence": "The teacher engaged the students in a debate.",
        "hindiSentence": "शिक्षक ने छात्रों को बहस में व्यस्त किया।"
      },
      {
        "id": "hg-engage-2",
        "sno": 250,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To participate in something",
        "hindiMeaning": "शामिल होना",
        "englishSentence": "They engaged in a deep conversation.",
        "hindiSentence": "वे गहरी बातचीत में शामिल हुए।"
      },
      {
        "id": "hg-engage-3",
        "sno": 251,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To hire someone for service",
        "hindiMeaning": "नियुक्त करना / काम पर रखना",
        "englishSentence": "We engaged a guide for the trip.",
        "hindiSentence": "हमने यात्रा के लिए एक गाइड नियुक्त किया।"
      }
    ]
  },
  {
    "id": "hg-group-106",
    "word": "Enlist",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-enlist-1",
        "sno": 262,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To formally join the armed forces",
        "hindiMeaning": "सेना में भर्ती होना",
        "englishSentence": "He enlisted in the army at 18.",
        "hindiSentence": "वह 18 वर्ष की उम्र में सेना में भर्ती हुआ।"
      },
      {
        "id": "hg-enlist-2",
        "sno": 263,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To gain support or help",
        "hindiMeaning": "मदद लेना / समर्थन पाना",
        "englishSentence": "She enlisted their support for the campaign.",
        "hindiSentence": "उसने अभियान के लिए उनका समर्थन प्राप्त किया।"
      }
    ]
  },
  {
    "id": "hg-group-112",
    "word": "Entertain",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-entertain-1",
        "sno": 275,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To provide amusement or enjoyment",
        "hindiMeaning": "मनोरंजन करना",
        "englishSentence": "The comedian entertained the audience.",
        "hindiSentence": "कॉमेडियन ने दर्शकों का मनोरंजन किया।"
      },
      {
        "id": "hg-entertain-2",
        "sno": 276,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To consider or allow an idea or thought",
        "hindiMeaning": "विचार करना",
        "englishSentence": "He entertained the idea of moving abroad.",
        "hindiSentence": "उसने विदेश जाने के विचार पर सोच-विचार किया।"
      }
    ]
  },
  {
    "id": "hg-group-107",
    "word": "Entrance",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-entrance-1",
        "sno": 264,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A doorway or opening into a place",
        "hindiMeaning": "प्रवेश द्वार",
        "englishSentence": "He waited at the entrance of the hall.",
        "hindiSentence": "वह हॉल के प्रवेश द्वार पर इंतज़ार कर रहा था।"
      },
      {
        "id": "hg-entrance-2",
        "sno": 265,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To fill with wonder or delight",
        "hindiMeaning": "मंत्रमुग्ध करना",
        "englishSentence": "The magician entranced the audience.",
        "hindiSentence": "जादूगर ने दर्शकों को मंत्रमुग्ध कर दिया।"
      }
    ]
  },
  {
    "id": "hg-group-113",
    "word": "Entry",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-entry-1",
        "sno": 277,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "An act of going into a place",
        "hindiMeaning": "प्रवेश",
        "englishSentence": "Entry to the museum is free on Sundays.",
        "hindiSentence": "संग्रहालय में रविवार को प्रवेश निःशुल्क है।"
      },
      {
        "id": "hg-entry-2",
        "sno": 278,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "An item written in a list, diary, or register",
        "hindiMeaning": "प्रविष्टि",
        "englishSentence": "Make a new entry in the ledger.",
        "hindiSentence": "लेखा पुस्तिका में एक नई प्रविष्टि करें।"
      }
    ]
  },
  {
    "id": "hg-group-114",
    "word": "Envelope",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-envelope-1",
        "sno": 279,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A flat paper container for a letter",
        "hindiMeaning": "लिफाफा",
        "englishSentence": "He sealed the envelope and posted it.",
        "hindiSentence": "उसने लिफाफा बंद किया और उसे भेज दिया।"
      },
      {
        "id": "hg-envelope-2",
        "sno": 280,
        "partOfSpeech": "Noun (Figurative)",
        "posCategory": "noun",
        "englishMeaning": "The outer boundary or limit of something",
        "hindiMeaning": "सीमा / आवरण",
        "englishSentence": "The noise broke the envelope of silence.",
        "hindiSentence": "शोर ने चुप्पी की सीमा को तोड़ दिया।"
      }
    ]
  },
  {
    "id": "hg-group-115",
    "word": "Establish",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-establish-1",
        "sno": 281,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To set up or found something",
        "hindiMeaning": "स्थापित करना",
        "englishSentence": "The company was established in 1999.",
        "hindiSentence": "कंपनी 1999 में स्थापित हुई थी।"
      },
      {
        "id": "hg-establish-2",
        "sno": 282,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To confirm or prove something",
        "hindiMeaning": "सिद्ध करना",
        "englishSentence": "They established his innocence.",
        "hindiSentence": "उन्होंने उसकी बेगुनाही सिद्ध की।"
      }
    ]
  },
  {
    "id": "hg-group-99",
    "word": "Even",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-even-1",
        "sno": 244,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Equal or balanced",
        "hindiMeaning": "बराबर / समतल",
        "englishSentence": "The table surface is even.",
        "hindiSentence": "मेज़ की सतह बराबर है।"
      },
      {
        "id": "hg-even-2",
        "sno": 245,
        "partOfSpeech": "Adverb",
        "posCategory": "verb",
        "englishMeaning": "Used for emphasis (surprisingly, unexpectedly)",
        "hindiMeaning": "यहाँ तक कि",
        "englishSentence": "She didn't even call to say sorry.",
        "hindiSentence": "उसने माफ़ी माँगने के लिए भी कॉल नहीं की।"
      },
      {
        "id": "hg-even-3",
        "sno": 246,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To make level or equal",
        "hindiMeaning": "सम करना / बराबर करना",
        "englishSentence": "Please even the cake before serving.",
        "hindiSentence": "परोसने से पहले केक को सम कर दो।"
      }
    ]
  },
  {
    "id": "hg-group-104",
    "word": "Exact",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-exact-1",
        "sno": 258,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Precise or accurate",
        "hindiMeaning": "सटीक",
        "englishSentence": "I need the exact measurements.",
        "hindiSentence": "मुझे सटीक माप चाहिए।"
      },
      {
        "id": "hg-exact-2",
        "sno": 259,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To demand and obtain (especially forcefully)",
        "hindiMeaning": "बलपूर्वक लेना / वसूलना",
        "englishSentence": "The criminal exacted revenge.",
        "hindiSentence": "अपराधी ने बदला लिया।"
      }
    ]
  },
  {
    "id": "hg-group-121",
    "word": "Excursion",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-excursion-1",
        "sno": 294,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A short trip or outing",
        "hindiMeaning": "सैर / भ्रमण",
        "englishSentence": "We went on a weekend excursion to the hills.",
        "hindiSentence": "हम पहाड़ियों की सप्ताहांत सैर पर गए।"
      },
      {
        "id": "hg-excursion-2",
        "sno": 295,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A deviation from the regular path or subject",
        "hindiMeaning": "विषय से भटकाव",
        "englishSentence": "The teacher went on an excursion while explaining history.",
        "hindiSentence": "इतिहास समझाते समय शिक्षक विषय से भटक गए।"
      }
    ]
  },
  {
    "id": "hg-group-102",
    "word": "Excuse",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-excuse-1",
        "sno": 252,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A reason given to justify an action",
        "hindiMeaning": "बहाना",
        "englishSentence": "That's just an excuse to avoid work.",
        "hindiSentence": "यह तो काम से बचने का बहाना है।"
      },
      {
        "id": "hg-excuse-2",
        "sno": 253,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To forgive or pardon",
        "hindiMeaning": "माफ़ करना",
        "englishSentence": "Please excuse my late arrival.",
        "hindiSentence": "कृपया मेरी देर से आने के लिए माफ़ करें।"
      },
      {
        "id": "hg-excuse-3",
        "sno": 254,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To release someone from a duty",
        "hindiMeaning": "छूट देना",
        "englishSentence": "He was excused from the meeting.",
        "hindiSentence": "उसे बैठक से छूट दी गई।"
      }
    ]
  },
  {
    "id": "hg-group-122",
    "word": "Execute",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-execute-1",
        "sno": 296,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To carry out or perform a plan or action",
        "hindiMeaning": "लागू करना",
        "englishSentence": "The engineer executed the project flawlessly.",
        "hindiSentence": "अभियंता ने परियोजना को बिना गलती के लागू किया।"
      },
      {
        "id": "hg-execute-2",
        "sno": 297,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To legally kill someone as punishment",
        "hindiMeaning": "फांसी देना",
        "englishSentence": "The criminal was executed after trial.",
        "hindiSentence": "अपराधी को मुकदमे के बाद फांसी दी गई।"
      }
    ]
  },
  {
    "id": "hg-group-120",
    "word": "Exercise",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-exercise-1",
        "sno": 291,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "Physical activity for health or fitness",
        "hindiMeaning": "व्यायाम",
        "englishSentence": "Morning exercise keeps you fit.",
        "hindiSentence": "सुबह का व्यायाम आपको स्वस्थ रखता है।"
      },
      {
        "id": "hg-exercise-2",
        "sno": 292,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To use a right or ability",
        "hindiMeaning": "अधिकार प्रयोग करना",
        "englishSentence": "She exercised her right to vote.",
        "hindiSentence": "उसने अपने मताधिकार का प्रयोग किया।"
      },
      {
        "id": "hg-exercise-3",
        "sno": 293,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A task or activity to develop skill",
        "hindiMeaning": "अभ्यास",
        "englishSentence": "The grammar exercise was easy.",
        "hindiSentence": "व्याकरण अभ्यास आसान था।"
      }
    ]
  },
  {
    "id": "hg-group-123",
    "word": "Exhaust",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-exhaust-1",
        "sno": 298,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To tire out completely",
        "hindiMeaning": "थका देना",
        "englishSentence": "The long journey exhausted us.",
        "hindiSentence": "लंबी यात्रा ने हमें थका दिया।"
      },
      {
        "id": "hg-exhaust-2",
        "sno": 299,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To use up entirely",
        "hindiMeaning": "समाप्त कर देना",
        "englishSentence": "We exhausted all our resources.",
        "hindiSentence": "हमने अपनी सभी संसाधन समाप्त कर दिए।"
      },
      {
        "id": "hg-exhaust-3",
        "sno": 300,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The waste gases from an engine",
        "hindiMeaning": "निकास गैस",
        "englishSentence": "The car's exhaust emits pollution.",
        "hindiSentence": "कार की निकास गैस प्रदूषण फैलाती है।"
      }
    ]
  },
  {
    "id": "hg-group-117",
    "word": "Exploit",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-exploit-1",
        "sno": 285,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To take unfair advantage of something or someone",
        "hindiMeaning": "शोषण करना",
        "englishSentence": "The company exploited its workers.",
        "hindiSentence": "कंपनी ने अपने कर्मचारियों का शोषण किया।"
      },
      {
        "id": "hg-exploit-2",
        "sno": 286,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A brave, daring, or heroic act",
        "hindiMeaning": "साहसिक कार्य",
        "englishSentence": "His military exploits were legendary.",
        "hindiSentence": "उसके सैन्य कारनामे प्रसिद्ध थे।"
      }
    ]
  },
  {
    "id": "hg-group-118",
    "word": "Expose",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-expose-1",
        "sno": 287,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To reveal or uncover something hidden",
        "hindiMeaning": "उजागर करना",
        "englishSentence": "The scam was exposed by the media.",
        "hindiSentence": "घोटाला मीडिया द्वारा उजागर किया गया।"
      },
      {
        "id": "hg-expose-2",
        "sno": 288,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To make vulnerable to harm or risk",
        "hindiMeaning": "जोखिम में डालना",
        "englishSentence": "Don't expose children to such violent content.",
        "hindiSentence": "बच्चों को ऐसे हिंसक कंटेंट के संपर्क में न लाएं।"
      }
    ]
  },
  {
    "id": "hg-group-100",
    "word": "Express",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-express-1",
        "sno": 247,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To convey thoughts or feelings",
        "hindiMeaning": "व्यक्त करना",
        "englishSentence": "She expressed her happiness.",
        "hindiSentence": "उसने अपनी खुशी व्यक्त की।"
      },
      {
        "id": "hg-express-2",
        "sno": 248,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A fast train or delivery service",
        "hindiMeaning": "एक्सप्रेस ट्रेन / सेवा",
        "englishSentence": "He took the morning express to Delhi.",
        "hindiSentence": "उसने सुबह की एक्सप्रेस ट्रेन से दिल्ली की यात्रा की।"
      }
    ]
  },
  {
    "id": "hg-group-119",
    "word": "Extend",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-extend-1",
        "sno": 289,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To make something longer or larger",
        "hindiMeaning": "फैलाना / बढ़ाना",
        "englishSentence": "They extended the deadline.",
        "hindiSentence": "उन्होंने समय सीमा बढ़ा दी।"
      },
      {
        "id": "hg-extend-2",
        "sno": 290,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To offer formally",
        "hindiMeaning": "प्रस्तुत करना / देना",
        "englishSentence": "I extend my congratulations to the winners.",
        "hindiSentence": "मैं विजेताओं को अपनी बधाई देता हूँ।"
      }
    ]
  },
  {
    "id": "hg-group-103",
    "word": "Extract",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-extract-1",
        "sno": 255,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To remove or take out",
        "hindiMeaning": "निकालना",
        "englishSentence": "The dentist extracted her tooth.",
        "hindiSentence": "दंत चिकित्सक ने उसका दांत निकाला।"
      },
      {
        "id": "hg-extract-2",
        "sno": 256,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A short passage taken from a text",
        "hindiMeaning": "अंश / उद्धरण",
        "englishSentence": "Read the extract from Shakespeare.",
        "hindiSentence": "शेक्सपियर के नाटक से अंश पढ़ो।"
      },
      {
        "id": "hg-extract-3",
        "sno": 257,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A concentrated substance like vanilla or herb",
        "hindiMeaning": "सत्व / अर्क",
        "englishSentence": "Add a drop of vanilla extract.",
        "hindiSentence": "वनीला सत्व की एक बूँद डालें।"
      }
    ]
  },
  {
    "id": "hg-group-125",
    "word": "Face",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-face-1",
        "sno": 303,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The front part of the head",
        "hindiMeaning": "चेहरा",
        "englishSentence": "She has a smiling face.",
        "hindiSentence": "उसका चेहरा मुस्कुराता हुआ है।"
      },
      {
        "id": "hg-face-2",
        "sno": 304,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To confront or deal with a challenge",
        "hindiMeaning": "सामना करना",
        "englishSentence": "We must face the truth.",
        "hindiSentence": "हमें सच्चाई का सामना करना चाहिए।"
      },
      {
        "id": "hg-face-3",
        "sno": 305,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The surface of an object",
        "hindiMeaning": "सतह",
        "englishSentence": "The clock's face was cracked.",
        "hindiSentence": "घड़ी की सतह टूटी हुई थी।"
      }
    ]
  },
  {
    "id": "hg-group-126",
    "word": "Fall",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-fall-1",
        "sno": 306,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To drop down suddenly",
        "hindiMeaning": "गिरना",
        "englishSentence": "He fell off the ladder.",
        "hindiSentence": "वह सीढ़ी से गिर गया।"
      },
      {
        "id": "hg-fall-2",
        "sno": 307,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The autumn season",
        "hindiMeaning": "पतझड़",
        "englishSentence": "The leaves change colour in the fall.",
        "hindiSentence": "पतझड़ में पत्तों का रंग बदल जाता है।"
      }
    ]
  },
  {
    "id": "hg-group-127",
    "word": "Fan",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-fan-1",
        "sno": 308,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A device for moving air",
        "hindiMeaning": "पंखा",
        "englishSentence": "Turn on the fan, it's hot.",
        "hindiSentence": "पंखा चला दो, गर्मी है।"
      },
      {
        "id": "hg-fan-2",
        "sno": 309,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A person who admires or supports something",
        "hindiMeaning": "प्रशंसक",
        "englishSentence": "She is a big fan of classical music.",
        "hindiSentence": "वह शास्त्रीय संगीत की बड़ी प्रशंसक है।"
      },
      {
        "id": "hg-fan-3",
        "sno": 310,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To spread or move something out like a fan",
        "hindiMeaning": "फैलाना",
        "englishSentence": "He fanned the cards across the table.",
        "hindiSentence": "उसने मेज़ पर पत्ते फैला दिए।"
      }
    ]
  },
  {
    "id": "hg-group-128",
    "word": "Fast",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-fast-1",
        "sno": 311,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Moving quickly",
        "hindiMeaning": "तेज़",
        "englishSentence": "He is a fast runner.",
        "hindiSentence": "वह तेज़ धावक है।"
      },
      {
        "id": "hg-fast-2",
        "sno": 312,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To abstain from food for a time",
        "hindiMeaning": "उपवास करना",
        "englishSentence": "Muslims fast during Ramadan.",
        "hindiSentence": "मुसलमान रमज़ान में उपवास करते हैं।"
      },
      {
        "id": "hg-fast-3",
        "sno": 313,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Firmly fixed; not easily moved",
        "hindiMeaning": "स्थिर / अटल",
        "englishSentence": "The door is fast shut.",
        "hindiSentence": "दरवाज़ा मज़बूती से बंद है।"
      }
    ]
  },
  {
    "id": "hg-group-142",
    "word": "Fence",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-fence-1",
        "sno": 345,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A barrier enclosing an area",
        "hindiMeaning": "बाड़",
        "englishSentence": "The house has a wooden fence.",
        "hindiSentence": "घर के चारों ओर लकड़ी की बाड़ है।"
      },
      {
        "id": "hg-fence-2",
        "sno": 346,
        "partOfSpeech": "Verb (Slang/Legal)",
        "posCategory": "verb",
        "englishMeaning": "To deal in stolen goods",
        "hindiMeaning": "चोरी का सामान बेचना",
        "englishSentence": "He was arrested for fencing stolen items.",
        "hindiSentence": "उसे चोरी का सामान बेचने के लिए पकड़ा गया।"
      },
      {
        "id": "hg-fence-3",
        "sno": 347,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To fight with swords (fencing)",
        "hindiMeaning": "तलवारबाज़ी करना",
        "englishSentence": "They learned to fence in college.",
        "hindiSentence": "उन्होंने कॉलेज में तलवारबाज़ी सीखी।"
      }
    ]
  },
  {
    "id": "hg-group-138",
    "word": "Figure",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-figure-1",
        "sno": 334,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A number or amount",
        "hindiMeaning": "संख्या / आंकड़ा",
        "englishSentence": "The sales figure has increased.",
        "hindiSentence": "बिक्री की संख्या बढ़ गई है।"
      },
      {
        "id": "hg-figure-2",
        "sno": 335,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The shape or outline of a body",
        "hindiMeaning": "आकृति / शरीर की बनावट",
        "englishSentence": "She has a graceful figure.",
        "hindiSentence": "उसकी आकृति सुंदर है।"
      },
      {
        "id": "hg-figure-3",
        "sno": 336,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To think or assume",
        "hindiMeaning": "सोचना / मान लेना",
        "englishSentence": "I figured you'd be late.",
        "hindiSentence": "मैंने सोचा था कि तुम देर से आओगे।"
      }
    ]
  },
  {
    "id": "hg-group-129",
    "word": "File",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-file-1",
        "sno": 314,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A folder for organizing papers",
        "hindiMeaning": "फ़ाइल",
        "englishSentence": "I kept the report in the blue file.",
        "hindiSentence": "मैंने रिपोर्ट नीली फ़ाइल में रखी।"
      },
      {
        "id": "hg-file-2",
        "sno": 315,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To officially submit a document",
        "hindiMeaning": "दायर करना",
        "englishSentence": "He filed a complaint against the manager.",
        "hindiSentence": "उसने प्रबंधक के खिलाफ शिकायत दर्ज कराई।"
      },
      {
        "id": "hg-file-3",
        "sno": 316,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A tool used to smooth surfaces",
        "hindiMeaning": "रगड़ने का औज़ार (रेती)",
        "englishSentence": "Use a file to smooth the edges.",
        "hindiSentence": "किनारों को सम करने के लिए फाइल का उपयोग करें।"
      }
    ]
  },
  {
    "id": "hg-group-130",
    "word": "Fine",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-fine-1",
        "sno": 317,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Very good or high-quality",
        "hindiMeaning": "उत्तम / बढ़िया",
        "englishSentence": "That's a fine piece of art.",
        "hindiSentence": "यह एक उत्तम कला कृति है।"
      },
      {
        "id": "hg-fine-2",
        "sno": 318,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A monetary penalty",
        "hindiMeaning": "जुर्माना",
        "englishSentence": "He paid a fine for speeding.",
        "hindiSentence": "उसने तेज़ गाड़ी चलाने पर जुर्माना भरा।"
      }
    ]
  },
  {
    "id": "hg-group-146",
    "word": "Finish",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-finish-1",
        "sno": 356,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To complete something",
        "hindiMeaning": "समाप्त करना",
        "englishSentence": "I finished the report last night.",
        "hindiSentence": "मैंने रिपोर्ट कल रात समाप्त की।"
      },
      {
        "id": "hg-finish-2",
        "sno": 357,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To put a final surface or polish",
        "hindiMeaning": "अंतिम चमक देना",
        "englishSentence": "The carpenter finished the table nicely.",
        "hindiSentence": "बढ़ई ने मेज़ को अच्छी तरह से चमकाया।"
      }
    ]
  },
  {
    "id": "hg-group-145",
    "word": "Fire",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-fire-1",
        "sno": 353,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "Combustion producing heat and light",
        "hindiMeaning": "आग",
        "englishSentence": "The fire spread quickly.",
        "hindiSentence": "आग तेज़ी से फैल गई।"
      },
      {
        "id": "hg-fire-2",
        "sno": 354,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To dismiss someone from a job",
        "hindiMeaning": "नौकरी से निकाल देना",
        "englishSentence": "The manager fired two employees.",
        "hindiSentence": "मैनेजर ने दो कर्मचारियों को निकाल दिया।"
      },
      {
        "id": "hg-fire-3",
        "sno": 355,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To shoot a gun or weapon",
        "hindiMeaning": "गोली चलाना",
        "englishSentence": "The soldier fired at the target.",
        "hindiSentence": "सैनिक ने लक्ष्य पर गोली चलाई।"
      }
    ]
  },
  {
    "id": "hg-group-131",
    "word": "Firm",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-firm-1",
        "sno": 319,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Strong or solid",
        "hindiMeaning": "मज़बूत / दृढ़",
        "englishSentence": "Hold the handle firmly.",
        "hindiSentence": "हैंडल को मज़बूती से पकड़ो।"
      },
      {
        "id": "hg-firm-2",
        "sno": 320,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A business or company",
        "hindiMeaning": "फर्म / कंपनी",
        "englishSentence": "She works in a law firm.",
        "hindiSentence": "वह एक विधि फर्म में काम करती है।"
      }
    ]
  },
  {
    "id": "hg-group-132",
    "word": "Fit",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-fit-1",
        "sno": 321,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "In good health or proper condition",
        "hindiMeaning": "स्वस्थ / उपयुक्त",
        "englishSentence": "He is fit to run the marathon.",
        "hindiSentence": "वह मैराथन दौड़ने के लिए फिट है।"
      },
      {
        "id": "hg-fit-2",
        "sno": 322,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A sudden burst of emotion or activity",
        "hindiMeaning": "दौरा / उफान",
        "englishSentence": "He had a fit of laughter.",
        "hindiSentence": "वह हँसी के दौरे में आ गया।"
      }
    ]
  },
  {
    "id": "hg-group-139",
    "word": "Fix",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-fix-1",
        "sno": 337,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To repair something broken",
        "hindiMeaning": "ठीक करना / मरम्मत करना",
        "englishSentence": "Can you fix the broken chair?",
        "hindiSentence": "क्या तुम टूटी कुर्सी ठीक कर सकते हो?"
      },
      {
        "id": "hg-fix-2",
        "sno": 338,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To fasten securely",
        "hindiMeaning": "कसकर लगाना",
        "englishSentence": "Fix the mirror to the wall.",
        "hindiSentence": "दर्पण को दीवार पर कस दो।"
      },
      {
        "id": "hg-fix-3",
        "sno": 339,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A difficult or tricky situation",
        "hindiMeaning": "मुश्किल स्थिति / पेंच",
        "englishSentence": "I'm in a fix over what to decide.",
        "hindiSentence": "मैं निर्णय को लेकर मुश्किल में हूँ।"
      }
    ]
  },
  {
    "id": "hg-group-147",
    "word": "Flag",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-flag-1",
        "sno": 358,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A piece of cloth used as a symbol of a country or group",
        "hindiMeaning": "झंडा",
        "englishSentence": "The national flag was hoisted on Independence Day.",
        "hindiSentence": "स्वतंत्रता दिवस पर राष्ट्रीय ध्वज फहराया गया।"
      },
      {
        "id": "hg-flag-2",
        "sno": 359,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To mark or identify for attention",
        "hindiMeaning": "चिन्हित करना",
        "englishSentence": "Please flag the important emails.",
        "hindiSentence": "कृपया महत्वपूर्ण ईमेल को चिन्हित करें।"
      },
      {
        "id": "hg-flag-3",
        "sno": 360,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To become weak, tired, or less active",
        "hindiMeaning": "थक जाना / ढीला पड़ना",
        "englishSentence": "His energy flagged after running 10 miles.",
        "hindiSentence": "10 मील दौड़ने के बाद उसकी ऊर्जा घट गई।"
      }
    ]
  },
  {
    "id": "hg-group-149",
    "word": "Flare",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-flare-1",
        "sno": 363,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A sudden burst of light or fire",
        "hindiMeaning": "चमक / लौ",
        "englishSentence": "A flare lit up the sky.",
        "hindiSentence": "एक चमक ने आकाश को रोशन कर दिया।"
      },
      {
        "id": "hg-flare-2",
        "sno": 364,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To suddenly intensify (emotion, disease, conflict)",
        "hindiMeaning": "भड़कना",
        "englishSentence": "Violence flared after the protest.",
        "hindiSentence": "प्रदर्शन के बाद हिंसा भड़क उठी।"
      },
      {
        "id": "hg-flare-3",
        "sno": 365,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A tool used to signal distress",
        "hindiMeaning": "संकट संकेत",
        "englishSentence": "They fired a flare to call for help.",
        "hindiSentence": "उन्होंने मदद के लिए संकट संकेत छोड़ा।"
      }
    ]
  },
  {
    "id": "hg-group-143",
    "word": "Flash",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-flash-1",
        "sno": 348,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A sudden burst of light or emotion",
        "hindiMeaning": "चमक / झलक",
        "englishSentence": "A flash of lightning lit the sky.",
        "hindiSentence": "बिजली की चमक से आकाश रोशन हो गया।"
      },
      {
        "id": "hg-flash-2",
        "sno": 349,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To expose something briefly or quickly",
        "hindiMeaning": "अचानक दिखाना",
        "englishSentence": "He flashed his ID at the gate.",
        "hindiSentence": "उसने गेट पर अपना पहचान पत्र जल्दी से दिखाया।"
      }
    ]
  },
  {
    "id": "hg-group-144",
    "word": "Flat",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-flat-1",
        "sno": 350,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Having a level surface",
        "hindiMeaning": "समतल",
        "englishSentence": "The land is flat here.",
        "hindiSentence": "यहाँ ज़मीन समतल है।"
      },
      {
        "id": "hg-flat-2",
        "sno": 351,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A rented apartment",
        "hindiMeaning": "फ्लैट / मकान",
        "englishSentence": "They live in a two-bedroom flat.",
        "hindiSentence": "वे दो कमरे के फ्लैट में रहते हैं।"
      },
      {
        "id": "hg-flat-3",
        "sno": 352,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Lacking emotion or energy",
        "hindiMeaning": "बेरंग / भावहीन",
        "englishSentence": "His performance felt flat.",
        "hindiSentence": "उसका प्रदर्शन बेरंग था।"
      }
    ]
  },
  {
    "id": "hg-group-150",
    "word": "Float",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-float-1",
        "sno": 366,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To rest or move on the surface of a liquid",
        "hindiMeaning": "तैरना",
        "englishSentence": "The boat floated on the water.",
        "hindiSentence": "नाव पानी में तैर रही थी।"
      },
      {
        "id": "hg-float-2",
        "sno": 367,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A small vehicle or platform used in parades",
        "hindiMeaning": "जुलूस की गाड़ी / झाँकी",
        "englishSentence": "The festival had colourful floats.",
        "hindiSentence": "त्योहार में रंग-बिरंगे झाँकियाँ थीं।"
      }
    ]
  },
  {
    "id": "hg-group-140",
    "word": "Flush",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-flush-1",
        "sno": 340,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To clean or wash with a sudden flow of water",
        "hindiMeaning": "बहाकर साफ़ करना",
        "englishSentence": "Flush the toilet after use.",
        "hindiSentence": "उपयोग के बाद टॉयलेट फ्लश करें।"
      },
      {
        "id": "hg-flush-2",
        "sno": 341,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A red or warm colour in the face",
        "hindiMeaning": "लाली",
        "englishSentence": "Her face was flushed with anger.",
        "hindiSentence": "उसका चेहरा गुस्से से लाल हो गया।"
      }
    ]
  },
  {
    "id": "hg-group-141",
    "word": "Fly",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-fly-1",
        "sno": 342,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To move through the air using wings",
        "hindiMeaning": "उड़ना",
        "englishSentence": "Birds fly high in the sky.",
        "hindiSentence": "पक्षी आकाश में ऊँचा उड़ते हैं।"
      },
      {
        "id": "hg-fly-2",
        "sno": 343,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A small flying insect",
        "hindiMeaning": "मक्खी",
        "englishSentence": "There's a fly on your food.",
        "hindiSentence": "तुम्हारे खाने पर एक मक्खी बैठी है।"
      },
      {
        "id": "hg-fly-3",
        "sno": 344,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The zipper area on trousers",
        "hindiMeaning": "पैंट की चेन वाली जगह",
        "englishSentence": "Your fly is open.",
        "hindiSentence": "तुम्हारी चेन खुली है।"
      }
    ]
  },
  {
    "id": "hg-group-133",
    "word": "Fold",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-fold-1",
        "sno": 323,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To bend or crease something",
        "hindiMeaning": "मोड़ना",
        "englishSentence": "Fold the paper in half.",
        "hindiSentence": "कागज़ को आधा मोड़ दो।"
      },
      {
        "id": "hg-fold-2",
        "sno": 324,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A group with shared beliefs (esp. religion)",
        "hindiMeaning": "समुदाय",
        "englishSentence": "He returned to the religious fold.",
        "hindiSentence": "वह धार्मिक समुदाय में लौट आया।"
      }
    ]
  },
  {
    "id": "hg-group-134",
    "word": "Foot",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-foot-1",
        "sno": 325,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The lower extremity of the leg",
        "hindiMeaning": "पैर",
        "englishSentence": "He injured his right foot.",
        "hindiSentence": "उसका दायाँ पैर घायल हो गया।"
      },
      {
        "id": "hg-foot-2",
        "sno": 326,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A unit of measurement (12 inches)",
        "hindiMeaning": "फुट",
        "englishSentence": "The table is 6 feet long.",
        "hindiSentence": "मेज़ की लंबाई 6 फुट है।"
      },
      {
        "id": "hg-foot-3",
        "sno": 327,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To pay a bill or expense",
        "hindiMeaning": "भुगतान करना",
        "englishSentence": "He footed the bill for dinner.",
        "hindiSentence": "उसने खाने का बिल चुकाया।"
      }
    ]
  },
  {
    "id": "hg-group-135",
    "word": "Force",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-force-1",
        "sno": 328,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "Strength or physical power",
        "hindiMeaning": "बल / शक्ति",
        "englishSentence": "The wind blew with great force.",
        "hindiSentence": "हवा तेज़ बल से चली।"
      },
      {
        "id": "hg-force-2",
        "sno": 329,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To make someone do something against their will",
        "hindiMeaning": "मजबूर करना",
        "englishSentence": "The police forced open the door.",
        "hindiSentence": "पुलिस ने दरवाज़ा तोड़कर खोला।"
      }
    ]
  },
  {
    "id": "hg-group-136",
    "word": "Found",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-found-1",
        "sno": 330,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To establish or set up something",
        "hindiMeaning": "स्थापित करना",
        "englishSentence": "He founded a non-profit organisation.",
        "hindiSentence": "उसने एक गैर-लाभकारी संस्था की स्थापना की।"
      },
      {
        "id": "hg-found-2",
        "sno": 331,
        "partOfSpeech": "Verb (Past of find)",
        "posCategory": "verb",
        "englishMeaning": "To discover or come upon something",
        "hindiMeaning": "पाया (find का past)",
        "englishSentence": "She found a coin on the road.",
        "hindiSentence": "उसे सड़क पर एक सिक्का मिला।"
      }
    ]
  },
  {
    "id": "hg-group-148",
    "word": "Frame",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-frame-1",
        "sno": 361,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A rigid structure that supports something",
        "hindiMeaning": "ढांचा",
        "englishSentence": "The picture is in a wooden frame.",
        "hindiSentence": "चित्र लकड़ी के फ्रेम में है।"
      },
      {
        "id": "hg-frame-2",
        "sno": 362,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To falsely accuse someone",
        "hindiMeaning": "झूठा फँसाना",
        "englishSentence": "He was framed for the robbery.",
        "hindiSentence": "उसे चोरी के लिए झूठा फँसाया गया।"
      }
    ]
  },
  {
    "id": "hg-group-137",
    "word": "Fry",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-fry-1",
        "sno": 332,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To cook in hot oil",
        "hindiMeaning": "तलना",
        "englishSentence": "She fried the potatoes till golden.",
        "hindiSentence": "उसने आलू को सुनहरा होने तक तला।"
      },
      {
        "id": "hg-fry-2",
        "sno": 333,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A small fish, especially a young one",
        "hindiMeaning": "मछली का बच्चा",
        "englishSentence": "The pond is full of fry.",
        "hindiSentence": "तालाब में मछलियों के बच्चे भरे हुए हैं।"
      }
    ]
  },
  {
    "id": "hg-group-156",
    "word": "Glare",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-glare-1",
        "sno": 379,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To stare angrily",
        "hindiMeaning": "घूरना",
        "englishSentence": "The teacher glared at the noisy students.",
        "hindiSentence": "शिक्षक ने शोर मचाते छात्रों को घूरा।"
      },
      {
        "id": "hg-glare-2",
        "sno": 380,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A strong, harsh light",
        "hindiMeaning": "तेज़ रोशनी",
        "englishSentence": "The glare of the sun was blinding.",
        "hindiSentence": "सूरज की तेज़ रोशनी चकाचौंध करने वाली थी।"
      }
    ]
  },
  {
    "id": "hg-group-157",
    "word": "Glaze",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-glaze-1",
        "sno": 381,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A smooth, shiny coating",
        "hindiMeaning": "चमकदार परत",
        "englishSentence": "The cake had a sugar glaze.",
        "hindiSentence": "केक पर चीनी की चमकदार परत थी।"
      },
      {
        "id": "hg-glaze-2",
        "sno": 382,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To become dull or expressionless (of eyes)",
        "hindiMeaning": "भावहीन हो जाना",
        "englishSentence": "His eyes glazed over with boredom.",
        "hindiSentence": "बोरियत के कारण उसकी आँखें भावहीन हो गईं।"
      }
    ]
  },
  {
    "id": "hg-group-159",
    "word": "Grade",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-grade-1",
        "sno": 385,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A level or rank in a scale",
        "hindiMeaning": "श्रेणी / कक्षा",
        "englishSentence": "He's in fifth grade.",
        "hindiSentence": "वह पाँचवीं कक्षा में है।"
      },
      {
        "id": "hg-grade-2",
        "sno": 386,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To evaluate or classify into categories",
        "hindiMeaning": "ग्रेड या अंक देना",
        "englishSentence": "The teacher graded the examination papers.",
        "hindiSentence": "शिक्षक ने परीक्षा पत्रों का मूल्यांकन किया।"
      }
    ]
  },
  {
    "id": "hg-group-151",
    "word": "Grave",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-grave-1",
        "sno": 368,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A place where a dead body is buried",
        "hindiMeaning": "कब्र",
        "englishSentence": "He visited his grandfather's grave.",
        "hindiSentence": "वह अपने दादा की कब्र पर गया।"
      },
      {
        "id": "hg-grave-2",
        "sno": 369,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Serious or solemn",
        "hindiMeaning": "गंभीर",
        "englishSentence": "This is a grave matter.",
        "hindiSentence": "यह एक गंभीर मुद्दा है।"
      }
    ]
  },
  {
    "id": "hg-group-154",
    "word": "Grip",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-grip-1",
        "sno": 374,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To hold something tightly",
        "hindiMeaning": "कसकर पकड़ना",
        "englishSentence": "She gripped the handle firmly.",
        "hindiSentence": "उसने हैंडल को मज़बूती से पकड़ा।"
      },
      {
        "id": "hg-grip-2",
        "sno": 375,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A strong hold",
        "hindiMeaning": "पकड़",
        "englishSentence": "His grip was strong despite his age.",
        "hindiSentence": "उम्र के बावजूद उसकी पकड़ मज़बूत थी।"
      },
      {
        "id": "hg-grip-3",
        "sno": 376,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "Control or influence over something",
        "hindiMeaning": "नियंत्रण",
        "englishSentence": "The leader has a firm grip over the party.",
        "hindiSentence": "नेता का पार्टी पर मज़बूत नियंत्रण है।"
      }
    ]
  },
  {
    "id": "hg-group-158",
    "word": "Groom",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-groom-1",
        "sno": 383,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A man on his wedding day",
        "hindiMeaning": "दूल्हा",
        "englishSentence": "The groom looked nervous.",
        "hindiSentence": "दूल्हा घबराया हुआ लग रहा था।"
      },
      {
        "id": "hg-groom-2",
        "sno": 384,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To prepare someone for a role",
        "hindiMeaning": "प्रशिक्षण देना / तैयार करना",
        "englishSentence": "He was groomed for leadership.",
        "hindiSentence": "उसे नेतृत्व के लिए तैयार किया गया।"
      }
    ]
  },
  {
    "id": "hg-group-153",
    "word": "Ground",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-ground-1",
        "sno": 372,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The surface of the earth",
        "hindiMeaning": "ज़मीन",
        "englishSentence": "The ground was wet after the rain.",
        "hindiSentence": "बारिश के बाद ज़मीन गीली थी।"
      },
      {
        "id": "hg-ground-2",
        "sno": 373,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A reason or basis for something",
        "hindiMeaning": "आधार",
        "englishSentence": "There's no ground for your complaint.",
        "hindiSentence": "आपकी शिकायत का कोई आधार नहीं है।"
      }
    ]
  },
  {
    "id": "hg-group-155",
    "word": "Guard",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-guard-1",
        "sno": 377,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To watch over or protect",
        "hindiMeaning": "निगरानी करना",
        "englishSentence": "Soldiers guard the border day and night.",
        "hindiSentence": "सैनिक दिन-रात सीमा की निगरानी करते हैं।"
      },
      {
        "id": "hg-guard-2",
        "sno": 378,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A protective device",
        "hindiMeaning": "सुरक्षा उपकरण",
        "englishSentence": "Wear a mouth guard while boxing.",
        "hindiSentence": "मुक्केबाज़ी करते समय माउथ गार्ड पहनें।"
      }
    ]
  },
  {
    "id": "hg-group-152",
    "word": "Gum",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-gum-1",
        "sno": 370,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "Tissue around the teeth",
        "hindiMeaning": "मसूड़ा",
        "englishSentence": "Her gums were bleeding.",
        "hindiSentence": "उसके मसूड़ों से खून आ रहा था।"
      },
      {
        "id": "hg-gum-2",
        "sno": 371,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To block or stick something together",
        "hindiMeaning": "चिपकाना",
        "englishSentence": "The machine gummed up due to dirt.",
        "hindiSentence": "गंदगी के कारण मशीन चिपक गई।"
      }
    ]
  }
];
