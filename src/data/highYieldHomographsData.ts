// ============================================================================
// HIGH-YIELD HOMOGRAPHS (समान वर्तनी, भिन्न अर्थ)
// Curated for SSC CGL, CHSL, CPO, CDS, NDA & Banking Exams
// Source: RBE Officer Batch (Shubham Jain) - Complete Parts 1 to 6 (1 to 1201)
// Total Groups: 519
// Total Entries: 1203
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
    "id": "hg-group-1",
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
    "id": "hg-group-2",
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
    "id": "hg-group-3",
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
    "id": "hg-group-4",
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
    "id": "hg-group-5",
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
    "id": "hg-group-6",
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
    "id": "hg-group-7",
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
    "id": "hg-group-8",
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
    "id": "hg-group-9",
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
    "id": "hg-group-10",
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
    "id": "hg-group-11",
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
    "id": "hg-group-12",
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
    "id": "hg-group-13",
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
    "id": "hg-group-14",
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
    "id": "hg-group-15",
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
    "id": "hg-group-16",
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
    "id": "hg-group-17",
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
    "id": "hg-group-18",
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
    "id": "hg-group-19",
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
    "id": "hg-group-20",
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
    "id": "hg-group-21",
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
    "id": "hg-group-22",
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
    "id": "hg-group-23",
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
    "id": "hg-group-24",
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
    "id": "hg-group-25",
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
    "id": "hg-group-26",
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
    "id": "hg-group-27",
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
    "id": "hg-group-28",
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
    "id": "hg-group-29",
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
    "id": "hg-group-30",
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
    "id": "hg-group-31",
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
    "id": "hg-group-32",
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
    "id": "hg-group-33",
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
    "id": "hg-group-34",
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
    "id": "hg-group-35",
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
    "id": "hg-group-36",
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
    "id": "hg-group-37",
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
    "id": "hg-group-38",
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
    "id": "hg-group-39",
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
    "id": "hg-group-40",
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
    "id": "hg-group-41",
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
    "id": "hg-group-42",
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
    "id": "hg-group-43",
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
    "id": "hg-group-45",
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
    "id": "hg-group-46",
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
    "id": "hg-group-47",
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
    "id": "hg-group-48",
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
    "id": "hg-group-49",
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
    "id": "hg-group-50",
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
    "id": "hg-group-51",
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
    "id": "hg-group-52",
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
    "id": "hg-group-53",
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
    "id": "hg-group-54",
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
    "id": "hg-group-55",
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
    "id": "hg-group-57",
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
    "id": "hg-group-58",
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
    "id": "hg-group-60",
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
    "id": "hg-group-61",
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
    "id": "hg-group-62",
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
    "id": "hg-group-63",
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
    "id": "hg-group-64",
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
    "id": "hg-group-65",
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
    "id": "hg-group-66",
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
    "id": "hg-group-67",
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
    "id": "hg-group-68",
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
    "id": "hg-group-69",
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
    "id": "hg-group-70",
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
    "id": "hg-group-71",
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
    "id": "hg-group-73",
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
    "id": "hg-group-74",
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
    "id": "hg-group-75",
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
    "id": "hg-group-76",
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
    "id": "hg-group-77",
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
    "id": "hg-group-78",
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
    "id": "hg-group-79",
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
    "id": "hg-group-80",
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
    "id": "hg-group-81",
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
    "id": "hg-group-82",
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
    "id": "hg-group-83",
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
    "id": "hg-group-84",
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
    "id": "hg-group-85",
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
    "id": "hg-group-86",
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
    "id": "hg-group-87",
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
    "id": "hg-group-88",
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
    "id": "hg-group-89",
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
    "id": "hg-group-90",
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
    "id": "hg-group-91",
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
    "id": "hg-group-92",
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
    "id": "hg-group-93",
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
    "id": "hg-group-94",
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
    "id": "hg-group-95",
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
    "id": "hg-group-96",
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
    "id": "hg-group-97",
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
    "id": "hg-group-98",
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
    "id": "hg-group-99",
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
    "id": "hg-group-100",
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
    "id": "hg-group-101",
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
    "id": "hg-group-102",
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
    "id": "hg-group-103",
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
    "id": "hg-group-104",
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
    "id": "hg-group-105",
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
    "id": "hg-group-106",
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
    "id": "hg-group-107",
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
    "id": "hg-group-108",
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
    "id": "hg-group-109",
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
    "id": "hg-group-110",
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
    "id": "hg-group-111",
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
    "id": "hg-group-112",
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
    "id": "hg-group-113",
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
    "id": "hg-group-114",
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
    "id": "hg-group-115",
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
    "id": "hg-group-116",
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
    "id": "hg-group-117",
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
    "id": "hg-group-118",
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
    "id": "hg-group-119",
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
    "id": "hg-group-120",
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
    "id": "hg-group-121",
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
    "id": "hg-group-122",
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
    "id": "hg-group-123",
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
    "id": "hg-group-124",
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
    "id": "hg-group-129",
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
    "id": "hg-group-130",
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
    "id": "hg-group-131",
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
    "id": "hg-group-132",
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
    "id": "hg-group-133",
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
    "id": "hg-group-134",
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
    "id": "hg-group-135",
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
    "id": "hg-group-136",
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
    "id": "hg-group-137",
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
    "id": "hg-group-138",
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
    "id": "hg-group-139",
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
    "id": "hg-group-140",
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
    "id": "hg-group-141",
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
    "id": "hg-group-142",
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
    "id": "hg-group-143",
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
    "id": "hg-group-144",
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
    "id": "hg-group-145",
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
    "id": "hg-group-146",
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
    "id": "hg-group-147",
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
    "id": "hg-group-148",
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
    "id": "hg-group-149",
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
    "id": "hg-group-150",
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
    "id": "hg-group-151",
    "word": "Gall",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-gall-1",
        "sno": 392,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "Bold or impudent behaviour",
        "hindiMeaning": "धृष्टता",
        "englishSentence": "He had the gall to lie to her face.",
        "hindiSentence": "उसमें सीधे झूठ बोलने की भी धृष्टता थी।"
      },
      {
        "id": "hg-gall-2",
        "sno": 393,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A sore or swelling on the skin from rubbing",
        "hindiMeaning": "छाला / घाव",
        "englishSentence": "The saddle caused a gall on the horse.",
        "hindiSentence": "जीन के कारण घोड़े की पीठ पर छाला पड़ गया।"
      },
      {
        "id": "hg-gall-3",
        "sno": 394,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To irritate or annoy",
        "hindiMeaning": "चिढ़ाना",
        "englishSentence": "His arrogance galls me.",
        "hindiSentence": "उसका घमंड मुझे चिढ़ाता है।"
      }
    ]
  },
  {
    "id": "hg-group-152",
    "word": "Gang",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-gang-1",
        "sno": 390,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A group of people (often with negative implication)",
        "hindiMeaning": "गिरोह",
        "englishSentence": "The gang was arrested for robbery.",
        "hindiSentence": "उस गिरोह को चोरी के आरोप में पकड़ा गया।"
      },
      {
        "id": "hg-gang-2",
        "sno": 391,
        "partOfSpeech": "Verb (Slang)",
        "posCategory": "verb",
        "englishMeaning": "To unite in a group (often to attack)",
        "hindiMeaning": "समूह बनाकर हमला करना",
        "englishSentence": "The boys ganged up on the new student.",
        "hindiSentence": "लड़कों ने नए छात्र पर मिलकर हमला कर दिया।"
      }
    ]
  },
  {
    "id": "hg-group-153",
    "word": "Gift",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-gift-1",
        "sno": 399,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A present",
        "hindiMeaning": "उपहार",
        "englishSentence": "She gave me a birthday gift.",
        "hindiSentence": "उसने मुझे जन्मदिन पर उपहार दिया।"
      },
      {
        "id": "hg-gift-2",
        "sno": 400,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A natural talent",
        "hindiMeaning": "प्रतिभा",
        "englishSentence": "He has a gift for music.",
        "hindiSentence": "उसमें संगीत की विशेष प्रतिभा है।"
      }
    ]
  },
  {
    "id": "hg-group-154",
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
    "id": "hg-group-155",
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
    "id": "hg-group-156",
    "word": "Gloss",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-gloss-1",
        "sno": 395,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A shiny or smooth surface",
        "hindiMeaning": "चमक",
        "englishSentence": "The table had a high gloss finish.",
        "hindiSentence": "मेज़ की सतह पर उच्च चमक थी।"
      },
      {
        "id": "hg-gloss-2",
        "sno": 396,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "An explanation of a word or phrase",
        "hindiMeaning": "व्याख्या / अर्थ",
        "englishSentence": "The glossary provides glosses for tough terms.",
        "hindiSentence": "शब्दकोश कठिन शब्दों के अर्थ देता है।"
      }
    ]
  },
  {
    "id": "hg-group-157",
    "word": "Glow",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-glow-1",
        "sno": 415,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To give off light steadily",
        "hindiMeaning": "चमकना",
        "englishSentence": "The candle glowed in the dark.",
        "hindiSentence": "अंधेरे में मोमबत्ती चमकी।"
      },
      {
        "id": "hg-glow-2",
        "sno": 416,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A warm healthy appearance",
        "hindiMeaning": "रक्तिमा / लालिमा",
        "englishSentence": "Her face had a lovely glow after the facial.",
        "hindiSentence": "फेशियल के बाद उसके चेहरे पर सुंदर लालिमा थी।"
      }
    ]
  },
  {
    "id": "hg-group-158",
    "word": "Go",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-go-1",
        "sno": 408,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To move or travel from one place to another",
        "hindiMeaning": "जाना",
        "englishSentence": "I go to school every day.",
        "hindiSentence": "मैं हर दिन स्कूल जाता हूँ।"
      },
      {
        "id": "hg-go-2",
        "sno": 409,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "An attempt or turn at doing something",
        "hindiMeaning": "कोशिश / बारी",
        "englishSentence": "Give it another go.",
        "hindiSentence": "एक और कोशिश करो।"
      }
    ]
  },
  {
    "id": "hg-group-159",
    "word": "Grade",
    "sensesCount": 4,
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
      },
      {
        "id": "hg-grade-3",
        "sno": 386,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To assign a score or level",
        "hindiMeaning": "मूल्यांकन करना",
        "englishSentence": "The teacher graded the test papers.",
        "hindiSentence": "शिक्षक ने उत्तर पुस्तिकाओं का मूल्यांकन किया।"
      },
      {
        "id": "hg-grade-4",
        "sno": 387,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The slope of a road or surface",
        "hindiMeaning": "ढलान",
        "englishSentence": "The truck struggled on the steep grade.",
        "hindiSentence": "ट्रक को तीव्र ढलान पर चढ़ने में कठिनाई हुई।"
      }
    ]
  },
  {
    "id": "hg-group-160",
    "word": "Grant",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-grant-1",
        "sno": 403,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To give something officially or legally",
        "hindiMeaning": "प्रदान करना",
        "englishSentence": "The court granted him bail.",
        "hindiSentence": "अदालत ने उसे ज़मानत दी।"
      },
      {
        "id": "hg-grant-2",
        "sno": 404,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A sum of money given for a specific purpose",
        "hindiMeaning": "अनुदान",
        "englishSentence": "He received a research grant.",
        "hindiSentence": "उसे शोध के लिए अनुदान मिला।"
      },
      {
        "id": "hg-grant-3",
        "sno": 405,
        "partOfSpeech": "Verb (Formal)",
        "posCategory": "verb",
        "englishMeaning": "To admit or concede something",
        "hindiMeaning": "स्वीकार करना",
        "englishSentence": "I grant that I was wrong.",
        "hindiSentence": "मैं मानता हूँ कि मैं गलत था।"
      }
    ]
  },
  {
    "id": "hg-group-161",
    "word": "Grapple",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-grapple-1",
        "sno": 410,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To struggle or wrestle physically",
        "hindiMeaning": "हाथापाई करना",
        "englishSentence": "The wrestlers grappled fiercely.",
        "hindiSentence": "पहलवानों ने ज़ोर से हाथापाई की।"
      },
      {
        "id": "hg-grapple-2",
        "sno": 411,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To try hard to understand or deal with something",
        "hindiMeaning": "जूझना (मानसिक रूप से)",
        "englishSentence": "She grappled with grief after the loss.",
        "hindiSentence": "वह नुकसान के बाद दुःख से जूझ रही थी।"
      }
    ]
  },
  {
    "id": "hg-group-162",
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
    "id": "hg-group-163",
    "word": "Grind",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-grind-1",
        "sno": 388,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To reduce something to small particles",
        "hindiMeaning": "पीसना",
        "englishSentence": "Grind the spices finely.",
        "hindiSentence": "मसालों को बारीक पीस लो।"
      },
      {
        "id": "hg-grind-2",
        "sno": 389,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "Hard or monotonous work",
        "hindiMeaning": "थका देने वाला काम",
        "englishSentence": "The daily grind can be exhausting.",
        "hindiSentence": "रोज़ की भागदौड़ थका देती है।"
      }
    ]
  },
  {
    "id": "hg-group-164",
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
    "id": "hg-group-165",
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
    "id": "hg-group-166",
    "word": "Groove",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-groove-1",
        "sno": 412,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A long narrow cut or depression",
        "hindiMeaning": "खांचा",
        "englishSentence": "There's a groove in the wooden panel.",
        "hindiSentence": "लकड़ी में एक खांचा है।"
      },
      {
        "id": "hg-groove-2",
        "sno": 413,
        "partOfSpeech": "Verb (Slang)",
        "posCategory": "verb",
        "englishMeaning": "To enjoy music rhythmically",
        "hindiMeaning": "संगीत पर झूमना",
        "englishSentence": "They were grooving to the music.",
        "hindiSentence": "वे संगीत पर झूम रहे थे।"
      },
      {
        "id": "hg-groove-3",
        "sno": 414,
        "partOfSpeech": "Noun (Routine)",
        "posCategory": "noun",
        "englishMeaning": "A habitual or steady routine",
        "hindiMeaning": "नियमित क्रम",
        "englishSentence": "He's back in his work groove now.",
        "hindiSentence": "अब वह फिर से अपने काम की लय में आ गया है।"
      }
    ]
  },
  {
    "id": "hg-group-167",
    "word": "Gross",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-gross-1",
        "sno": 397,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Total before deductions",
        "hindiMeaning": "सकल",
        "englishSentence": "His gross salary is ₹50,000 per month.",
        "hindiSentence": "उसका सकल वेतन प्रति माह ₹50,000 है।"
      },
      {
        "id": "hg-gross-2",
        "sno": 398,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Disgusting or offensive",
        "hindiMeaning": "घिनौना",
        "englishSentence": "That was a gross smell.",
        "hindiSentence": "वह बहुत घिनौनी गंध थी।"
      }
    ]
  },
  {
    "id": "hg-group-168",
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
    "id": "hg-group-169",
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
    "id": "hg-group-170",
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
  },
  {
    "id": "hg-group-171",
    "word": "Gush",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-gush-1",
        "sno": 401,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To flow out in a sudden, forceful stream",
        "hindiMeaning": "तेज़ी से बहना",
        "englishSentence": "Water gushed from the pipe.",
        "hindiSentence": "पाइप से पानी तेज़ी से बह निकला।"
      },
      {
        "id": "hg-gush-2",
        "sno": 402,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To speak with exaggerated enthusiasm",
        "hindiMeaning": "भावुकता से बोलना",
        "englishSentence": "She gushed about the new dress.",
        "hindiSentence": "वह अपनी नई ड्रेस की बहुत तारीफ़ कर रही थी।"
      }
    ]
  },
  {
    "id": "hg-group-172",
    "word": "Gut",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-gut-1",
        "sno": 406,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The internal organs, especially intestines",
        "hindiMeaning": "आँत",
        "englishSentence": "The fish was cleaned and its guts removed.",
        "hindiSentence": "मछली को साफ कर उसकी आँतें निकाल दी गईं।"
      },
      {
        "id": "hg-gut-2",
        "sno": 407,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To remove internal parts or destroy the inside",
        "hindiMeaning": "आंतरिक हिस्सा निकालना",
        "englishSentence": "The house was gutted in the fire.",
        "hindiSentence": "आग में घर अंदर से पूरी तरह जल गया।"
      }
    ]
  },
  {
    "id": "hg-group-173",
    "word": "Hack",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-hack-1",
        "sno": 459,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To cut or chop roughly",
        "hindiMeaning": "काटना",
        "englishSentence": "He hacked at the tree with an axe.",
        "hindiSentence": "उसने कुल्हाड़ी से पेड़ को काटा।"
      },
      {
        "id": "hg-hack-2",
        "sno": 460,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A rough cut or blow",
        "hindiMeaning": "प्रहार",
        "englishSentence": "The log split with one hack.",
        "hindiSentence": "एक वार में लकड़ी चीर गई।"
      },
      {
        "id": "hg-hack-3",
        "sno": 461,
        "partOfSpeech": "Verb (Computing)",
        "posCategory": "verb",
        "englishMeaning": "To gain unauthorised access to data",
        "hindiMeaning": "हैक करना",
        "englishSentence": "Someone hacked into the system.",
        "hindiSentence": "किसी ने सिस्टम हैक कर लिया।"
      }
    ]
  },
  {
    "id": "hg-group-174",
    "word": "Hail",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-hail-1",
        "sno": 454,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "Small balls of ice falling from the sky",
        "hindiMeaning": "ओले",
        "englishSentence": "The hail damaged the crops.",
        "hindiSentence": "ओलों ने फसल को नुकसान पहुँचाया।"
      },
      {
        "id": "hg-hail-2",
        "sno": 455,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To call or shout to attract attention",
        "hindiMeaning": "बुलाना / आवाज़ लगाना",
        "englishSentence": "He hailed a taxi.",
        "hindiSentence": "उसने टैक्सी को आवाज़ दी।"
      },
      {
        "id": "hg-hail-3",
        "sno": 456,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To praise or welcome formally",
        "hindiMeaning": "स्वागत करना / सराहना करना",
        "englishSentence": "The athlete was hailed as a hero.",
        "hindiSentence": "खिलाड़ी का नायक के रूप में स्वागत हुआ।"
      }
    ]
  },
  {
    "id": "hg-group-175",
    "word": "Hammer",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-hammer-1",
        "sno": 431,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A tool with a heavy head used for hitting",
        "hindiMeaning": "हथौड़ा",
        "englishSentence": "He hit the nail with a hammer.",
        "hindiSentence": "उसने कील पर हथौड़े से प्रहार किया।"
      },
      {
        "id": "hg-hammer-2",
        "sno": 432,
        "partOfSpeech": "Verb (Figurative)",
        "posCategory": "verb",
        "englishMeaning": "To criticise or defeat severely",
        "hindiMeaning": "गंभीर आलोचना करना",
        "englishSentence": "The press hammered the politician.",
        "hindiSentence": "प्रेस ने राजनेता की तीखी आलोचना की।"
      }
    ]
  },
  {
    "id": "hg-group-176",
    "word": "Hand",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-hand-1",
        "sno": 417,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The body part at the end of the arm",
        "hindiMeaning": "हाथ",
        "englishSentence": "She raised her hand to answer.",
        "hindiSentence": "उसने उत्तर देने के लिए हाथ उठाया।"
      },
      {
        "id": "hg-hand-2",
        "sno": 418,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To give or pass something to someone",
        "hindiMeaning": "देना",
        "englishSentence": "Please hand me the book.",
        "hindiSentence": "कृपया मुझे किताब दें।"
      },
      {
        "id": "hg-hand-3",
        "sno": 419,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A pointer on a clock",
        "hindiMeaning": "घड़ी की सुई",
        "englishSentence": "The minute hand moved slowly.",
        "hindiSentence": "मिनट की सुई धीरे-धीरे घूमी।"
      }
    ]
  },
  {
    "id": "hg-group-177",
    "word": "Handle",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-handle-1",
        "sno": 438,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To touch, hold, or manage something",
        "hindiMeaning": "संभालना",
        "englishSentence": "Please handle the glassware carefully.",
        "hindiSentence": "कृपया काँच के बर्तनों को सावधानी से संभालें।"
      },
      {
        "id": "hg-handle-2",
        "sno": 439,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To deal with a situation or problem",
        "hindiMeaning": "निपटना",
        "englishSentence": "Can you handle the pressure?",
        "hindiSentence": "क्या आप दबाव संभाल सकते हैं?"
      }
    ]
  },
  {
    "id": "hg-group-178",
    "word": "Hang",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-hang-1",
        "sno": 433,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To suspend from above",
        "hindiMeaning": "लटकाना",
        "englishSentence": "Hang your coat on the rack.",
        "hindiSentence": "अपनी जैकेट रैक पर टाँग दो।"
      },
      {
        "id": "hg-hang-2",
        "sno": 434,
        "partOfSpeech": "Verb (Slang)",
        "posCategory": "verb",
        "englishMeaning": "To remain or spend time casually",
        "hindiMeaning": "समय बिताना",
        "englishSentence": "We hung out at the mall.",
        "hindiSentence": "हम मॉल में घूमते रहे।"
      }
    ]
  },
  {
    "id": "hg-group-179",
    "word": "Hatch",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-hatch-1",
        "sno": 440,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To come out of an egg",
        "hindiMeaning": "अंडे से बाहर आना",
        "englishSentence": "The chicks hatched this morning.",
        "hindiSentence": "चूज़े आज सुबह अंडों से निकले।"
      },
      {
        "id": "hg-hatch-2",
        "sno": 441,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To devise a plan secretly",
        "hindiMeaning": "योजना बनाना",
        "englishSentence": "They hatched a plan to escape.",
        "hindiSentence": "उन्होंने भागने की योजना बनाई।"
      },
      {
        "id": "hg-hatch-3",
        "sno": 442,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A small door or opening",
        "hindiMeaning": "छोटी खिड़की / दरवाज़ा",
        "englishSentence": "He opened the hatch to the attic.",
        "hindiSentence": "उसने अटारी का हैच खोला।"
      }
    ]
  },
  {
    "id": "hg-group-180",
    "word": "Haul",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-haul-1",
        "sno": 443,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To pull or drag something with effort",
        "hindiMeaning": "खींचना",
        "englishSentence": "They hauled the boat onto the shore.",
        "hindiSentence": "उन्होंने नाव को किनारे तक खींचा।"
      },
      {
        "id": "hg-haul-2",
        "sno": 444,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A quantity of something carried or moved",
        "hindiMeaning": "लाद / ढुलाई",
        "englishSentence": "The truck delivered a haul of timber.",
        "hindiSentence": "ट्रक ने लकड़ी की ढुलाई की।"
      }
    ]
  },
  {
    "id": "hg-group-181",
    "word": "Head",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-head-1",
        "sno": 420,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The upper part of the body",
        "hindiMeaning": "सिर",
        "englishSentence": "He hit his head on the wall.",
        "hindiSentence": "उसका सिर दीवार से टकरा गया।"
      },
      {
        "id": "hg-head-2",
        "sno": 421,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To lead or be in charge",
        "hindiMeaning": "नेतृत्व करना",
        "englishSentence": "She heads the marketing team.",
        "hindiSentence": "वह विपणन टीम का नेतृत्व करती है।"
      },
      {
        "id": "hg-head-3",
        "sno": 422,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A person in authority",
        "hindiMeaning": "प्रमुख",
        "englishSentence": "The head of the department will speak next.",
        "hindiSentence": "विभागाध्यक्ष अगला भाषण देंगे।"
      }
    ]
  },
  {
    "id": "hg-group-182",
    "word": "Heap",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-heap-1",
        "sno": 464,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A pile or mass of things",
        "hindiMeaning": "ढेर",
        "englishSentence": "There's a heap of clothes on the bed.",
        "hindiSentence": "बिस्तर पर कपड़ों का ढेर है।"
      },
      {
        "id": "hg-heap-2",
        "sno": 465,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To pile up or accumulate",
        "hindiMeaning": "इकट्ठा करना",
        "englishSentence": "She heaped food onto his plate.",
        "hindiSentence": "उसने उसकी प्लेट में खाना ढेर कर दिया।"
      },
      {
        "id": "hg-heap-3",
        "sno": 466,
        "partOfSpeech": "Verb (Figurative)",
        "posCategory": "verb",
        "englishMeaning": "To give a lot of something (e.g., praise, insult)",
        "hindiMeaning": "बहुत सारा देना",
        "englishSentence": "The teacher heaped praise on the students.",
        "hindiSentence": "शिक्षक ने छात्रों की खूब प्रशंसा की।"
      }
    ]
  },
  {
    "id": "hg-group-183",
    "word": "Heel",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-heel-1",
        "sno": 475,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The back part of the foot",
        "hindiMeaning": "एड़ी",
        "englishSentence": "He injured his heel while running.",
        "hindiSentence": "दौड़ते समय उसकी एड़ी में चोट लग गई।"
      },
      {
        "id": "hg-heel-2",
        "sno": 476,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To follow closely (dog or person)",
        "hindiMeaning": "पीछे चलना",
        "englishSentence": "The dog heeled beside its owner.",
        "hindiSentence": "कुत्ता मालिक के साथ-साथ चला।"
      }
    ]
  },
  {
    "id": "hg-group-184",
    "word": "Hike",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-hike-1",
        "sno": 447,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A long walk, especially in nature",
        "hindiMeaning": "पैदल यात्रा",
        "englishSentence": "We went for a mountain hike.",
        "hindiSentence": "हम पहाड़ों में पैदल यात्रा पर गए।"
      },
      {
        "id": "hg-hike-2",
        "sno": 448,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To increase something, especially a price",
        "hindiMeaning": "वृद्धि करना",
        "englishSentence": "The fuel prices were hiked again.",
        "hindiSentence": "ईंधन के दाम फिर बढ़ा दिए गए।"
      },
      {
        "id": "hg-hike-3",
        "sno": 449,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To raise or lift something abruptly",
        "hindiMeaning": "ऊपर खींचना",
        "englishSentence": "He hiked up his trousers.",
        "hindiSentence": "उसने अपनी पैंट ऊपर खींची।"
      }
    ]
  },
  {
    "id": "hg-group-185",
    "word": "Hiss",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-hiss-1",
        "sno": 467,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To make a sharp, sibilant sound like a snake",
        "hindiMeaning": "सर्प की तरह सीटी बजाना / फुफकारना",
        "englishSentence": "The snake hissed when disturbed.",
        "hindiSentence": "साँप ने छेड़ने पर फुफकार मारी।"
      },
      {
        "id": "hg-hiss-2",
        "sno": 468,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A sharp or angry sound",
        "hindiMeaning": "फुफकार / सीटी जैसी आवाज़",
        "englishSentence": "The hiss from the audience showed disapproval.",
        "hindiSentence": "दर्शकों की फुफकार असहमति दिखा रही थी।"
      },
      {
        "id": "hg-hiss-3",
        "sno": 469,
        "partOfSpeech": "Verb (Figurative)",
        "posCategory": "verb",
        "englishMeaning": "To express disapproval",
        "hindiMeaning": "विरोध करना",
        "englishSentence": "They hissed at the rude comment.",
        "hindiSentence": "उन्होंने अभद्र टिप्पणी पर फुफकार से विरोध जताया।"
      }
    ]
  },
  {
    "id": "hg-group-186",
    "word": "Hit",
    "sensesCount": 5,
    "senses": [
      {
        "id": "hg-hit-1",
        "sno": 423,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To strike something with force",
        "hindiMeaning": "मारना",
        "englishSentence": "He hit the ball hard.",
        "hindiSentence": "उसने गेंद को ज़ोर से मारा।"
      },
      {
        "id": "hg-hit-2",
        "sno": 424,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A successful song, film, or product",
        "hindiMeaning": "हिट / लोकप्रिय",
        "englishSentence": "The movie was a big hit.",
        "hindiSentence": "फिल्म बहुत बड़ी हिट रही।"
      },
      {
        "id": "hg-hit-3",
        "sno": 425,
        "partOfSpeech": "Verb (Figurative)",
        "posCategory": "verb",
        "englishMeaning": "To affect emotionally or financially",
        "hindiMeaning": "असर डालना",
        "englishSentence": "The news really hit me hard.",
        "hindiSentence": "इस खबर ने मुझे बहुत प्रभावित किया।"
      },
      {
        "id": "hg-hit-4",
        "sno": 457,
        "partOfSpeech": "Noun (Sports)",
        "posCategory": "noun",
        "englishMeaning": "A successful stroke or impact in sports",
        "hindiMeaning": "सफल प्रहार",
        "englishSentence": "His six was the biggest hit of the match.",
        "hindiSentence": "उसका छक्का मैच का सबसे बड़ा प्रहार था।"
      },
      {
        "id": "hg-hit-5",
        "sno": 458,
        "partOfSpeech": "Verb (Slang)",
        "posCategory": "verb",
        "englishMeaning": "To arrive at or visit a place",
        "hindiMeaning": "पहुँचना",
        "englishSentence": "We hit the beach early in the morning.",
        "hindiSentence": "हम सुबह जल्दी समुद्र तट पर पहुँचे।"
      }
    ]
  },
  {
    "id": "hg-group-187",
    "word": "Hitch",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-hitch-1",
        "sno": 462,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A temporary problem or difficulty",
        "hindiMeaning": "अड़चन",
        "englishSentence": "The launch went well despite a hitch.",
        "hindiSentence": "थोड़ी अड़चन के बावजूद लॉन्च सफल रहा।"
      },
      {
        "id": "hg-hitch-2",
        "sno": 463,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To fasten or tie temporarily",
        "hindiMeaning": "बाँधना",
        "englishSentence": "He hitched the trailer to the truck.",
        "hindiSentence": "उसने ट्रक से ट्रेलर बाँधा।"
      }
    ]
  },
  {
    "id": "hg-group-188",
    "word": "Hoist",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-hoist-1",
        "sno": 450,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To raise or lift something, especially with a rope",
        "hindiMeaning": "ऊपर उठाना",
        "englishSentence": "They hoisted the national flag.",
        "hindiSentence": "उन्होंने राष्ट्रीय ध्वज फहराया।"
      },
      {
        "id": "hg-hoist-2",
        "sno": 451,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A device used for lifting",
        "hindiMeaning": "उठाने की मशीन",
        "englishSentence": "Use the hoist to lift the engine.",
        "hindiSentence": "इंजन को उठाने के लिए होइस्ट का उपयोग करें।"
      }
    ]
  },
  {
    "id": "hg-group-189",
    "word": "Hold",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-hold-1",
        "sno": 426,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To grasp or support",
        "hindiMeaning": "पकड़ना",
        "englishSentence": "Hold the rope tightly.",
        "hindiSentence": "रस्सी को कसकर पकड़ो।"
      },
      {
        "id": "hg-hold-2",
        "sno": 427,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To organise or conduct an event",
        "hindiMeaning": "आयोजित करना",
        "englishSentence": "They will hold the meeting tomorrow.",
        "hindiSentence": "वे कल बैठक आयोजित करेंगे।"
      }
    ]
  },
  {
    "id": "hg-group-190",
    "word": "Hook",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-hook-1",
        "sno": 428,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A curved device for catching or hanging things",
        "hindiMeaning": "हुक / काँटा",
        "englishSentence": "Hang your bag on the hook.",
        "hindiSentence": "अपना बैग हुक पर टाँग दो।"
      },
      {
        "id": "hg-hook-2",
        "sno": 429,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To fasten or attach",
        "hindiMeaning": "जोड़ना",
        "englishSentence": "She hooked the clasp of her necklace.",
        "hindiSentence": "उसने अपने हार की चेन जोड़ी।"
      },
      {
        "id": "hg-hook-3",
        "sno": 430,
        "partOfSpeech": "Noun (Informal)",
        "posCategory": "noun",
        "englishMeaning": "An engaging element (in music or writing)",
        "hindiMeaning": "आकर्षक तत्व",
        "englishSentence": "The song's hook is very catchy.",
        "hindiSentence": "इस गीत का मुख्य अंश बहुत आकर्षक है।"
      }
    ]
  },
  {
    "id": "hg-group-191",
    "word": "Hound",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-hound-1",
        "sno": 445,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A type of dog used for hunting",
        "hindiMeaning": "शिकारी कुत्ता",
        "englishSentence": "The hound chased the deer.",
        "hindiSentence": "शिकारी कुत्ते ने हिरण का पीछा किया।"
      },
      {
        "id": "hg-hound-2",
        "sno": 446,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To harass or pursue relentlessly",
        "hindiMeaning": "पीछे पड़ जाना",
        "englishSentence": "The media hounded the actor after the scandal.",
        "hindiSentence": "घोटाले के बाद मीडिया अभिनेता के पीछे पड़ गई।"
      }
    ]
  },
  {
    "id": "hg-group-192",
    "word": "House",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-house-1",
        "sno": 435,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A building where people live",
        "hindiMeaning": "घर",
        "englishSentence": "We live in a big house.",
        "hindiSentence": "हम एक बड़े घर में रहते हैं।"
      },
      {
        "id": "hg-house-2",
        "sno": 436,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To provide shelter or storage",
        "hindiMeaning": "ठहराना / रखना",
        "englishSentence": "The library houses rare books.",
        "hindiSentence": "पुस्तकालय में दुर्लभ पुस्तकें रखी जाती हैं।"
      },
      {
        "id": "hg-house-3",
        "sno": 437,
        "partOfSpeech": "Noun (Government)",
        "posCategory": "noun",
        "englishMeaning": "A legislative or governing body",
        "hindiMeaning": "सदन",
        "englishSentence": "The bill passed in the upper house.",
        "hindiSentence": "विधेयक उच्च सदन में पारित हुआ।"
      }
    ]
  },
  {
    "id": "hg-group-193",
    "word": "Hover",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-hover-1",
        "sno": 452,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To remain suspended in one place (in air)",
        "hindiMeaning": "मँडराना",
        "englishSentence": "The helicopter hovered over the building.",
        "hindiSentence": "हेलिकॉप्टर इमारत के ऊपर मँडराता रहा।"
      },
      {
        "id": "hg-hover-2",
        "sno": 453,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To remain uncertain or hesitant",
        "hindiMeaning": "झिझकना",
        "englishSentence": "He hovered at the door before entering.",
        "hindiSentence": "वह दरवाज़े पर झिझकता रहा।"
      }
    ]
  },
  {
    "id": "hg-group-194",
    "word": "Hunch",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-hunch-1",
        "sno": 470,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To bend forward or downward",
        "hindiMeaning": "झुकना",
        "englishSentence": "He hunched over the table.",
        "hindiSentence": "वह मेज़ पर झुक गया।"
      },
      {
        "id": "hg-hunch-2",
        "sno": 471,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A feeling or guess based on intuition",
        "hindiMeaning": "पूर्वानुभव / आभास",
        "englishSentence": "I had a hunch it would rain today.",
        "hindiSentence": "मुझे आभास था कि आज बारिश होगी।"
      },
      {
        "id": "hg-hunch-3",
        "sno": 472,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A hump or rounded back (esp. due to posture or condition)",
        "hindiMeaning": "कूबड़",
        "englishSentence": "The old man walked with a hunch.",
        "hindiSentence": "बूढ़ा आदमी कूबड़ के साथ चला।"
      }
    ]
  },
  {
    "id": "hg-group-195",
    "word": "Hustle",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-hustle-1",
        "sno": 473,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To move quickly and energetically",
        "hindiMeaning": "तेज़ी से भागना",
        "englishSentence": "He hustled to catch the train.",
        "hindiSentence": "वह ट्रेन पकड़ने के लिए तेज़ी से भागा।"
      },
      {
        "id": "hg-hustle-2",
        "sno": 474,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To push roughly",
        "hindiMeaning": "धक्का देना",
        "englishSentence": "She was hustled through the crowd.",
        "hindiSentence": "उसे भीड़ में धक्का देकर आगे बढ़ाया गया।"
      }
    ]
  },
  {
    "id": "hg-group-196",
    "word": "Impact",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-impact-1",
        "sno": 487,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A strong effect or influence",
        "hindiMeaning": "प्रभाव",
        "englishSentence": "His speech had a huge impact.",
        "hindiSentence": "उसके भाषण का गहरा प्रभाव पड़ा।"
      },
      {
        "id": "hg-impact-2",
        "sno": 488,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The force of one thing hitting another",
        "hindiMeaning": "टक्कर",
        "englishSentence": "The impact cracked the windshield.",
        "hindiSentence": "टक्कर से विंडशील्ड में दरार आ गई।"
      }
    ]
  },
  {
    "id": "hg-group-197",
    "word": "Import",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-import-1",
        "sno": 489,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To bring goods into a country",
        "hindiMeaning": "आयात करना",
        "englishSentence": "India imports oil from the Middle East.",
        "hindiSentence": "भारत मध्य पूर्व से तेल आयात करता है।"
      },
      {
        "id": "hg-import-2",
        "sno": 490,
        "partOfSpeech": "Verb (Formal)",
        "posCategory": "verb",
        "englishMeaning": "To signify or convey meaning",
        "hindiMeaning": "महत्व रखना",
        "englishSentence": "His words imported deep wisdom.",
        "hindiSentence": "उसके शब्दों का गहरा महत्व था।"
      }
    ]
  },
  {
    "id": "hg-group-198",
    "word": "Impress",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-impress-1",
        "sno": 491,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To make someone feel admiration or respect",
        "hindiMeaning": "प्रभावित करना",
        "englishSentence": "He impressed the judges with his performance.",
        "hindiSentence": "उसने अपनी प्रस्तुति से न्यायाधीशों को प्रभावित किया।"
      },
      {
        "id": "hg-impress-2",
        "sno": 492,
        "partOfSpeech": "Verb (Printing)",
        "posCategory": "verb",
        "englishMeaning": "To press a mark or design onto something",
        "hindiMeaning": "छाप छोड़ना",
        "englishSentence": "They impressed the logo onto the seal.",
        "hindiSentence": "उन्होंने मोहर पर लोगो की छाप छोड़ी।"
      }
    ]
  },
  {
    "id": "hg-group-199",
    "word": "Incline",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-incline-1",
        "sno": 493,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To lean or tilt in a particular direction",
        "hindiMeaning": "झुकना",
        "englishSentence": "The tower inclines slightly to the left.",
        "hindiSentence": "टावर थोड़ा बाईं ओर झुका हुआ है।"
      },
      {
        "id": "hg-incline-2",
        "sno": 494,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A slope or inclined surface",
        "hindiMeaning": "ढलान",
        "englishSentence": "He climbed the steep incline.",
        "hindiSentence": "उसने तीव्र ढलान पर चढ़ाई की।"
      },
      {
        "id": "hg-incline-3",
        "sno": 495,
        "partOfSpeech": "Verb (Figurative)",
        "posCategory": "verb",
        "englishMeaning": "To be willing or disposed toward something",
        "hindiMeaning": "प्रवृत्त होना",
        "englishSentence": "I incline to agree with you.",
        "hindiSentence": "मैं आपसे सहमत होने की प्रवृत्ति रखता हूँ।"
      }
    ]
  },
  {
    "id": "hg-group-200",
    "word": "Induce",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-induce-1",
        "sno": 508,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To persuade or influence",
        "hindiMeaning": "प्रेरित करना",
        "englishSentence": "He was induced to confess.",
        "hindiSentence": "उसे स्वीकार करने के लिए प्रेरित किया गया।"
      },
      {
        "id": "hg-induce-2",
        "sno": 509,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To bring about or cause something",
        "hindiMeaning": "उत्पन्न करना",
        "englishSentence": "The medicine induced sleep.",
        "hindiSentence": "दवा ने नींद ला दी।"
      }
    ]
  },
  {
    "id": "hg-group-201",
    "word": "Inhabit",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-inhabit-1",
        "sno": 502,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To live or reside in a place",
        "hindiMeaning": "निवास करना",
        "englishSentence": "Polar bears inhabit the Arctic region.",
        "hindiSentence": "ध्रुवीय भालू आर्कटिक क्षेत्र में निवास करते हैं।"
      },
      {
        "id": "hg-inhabit-2",
        "sno": 503,
        "partOfSpeech": "Verb (Passive)",
        "posCategory": "verb",
        "englishMeaning": "To fill or occupy mentally",
        "hindiMeaning": "मन में बसा होना",
        "englishSentence": "Fear inhabited his every thought.",
        "hindiSentence": "डर उसकी हर सोच में बसा था।"
      }
    ]
  },
  {
    "id": "hg-group-202",
    "word": "Initiate",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-initiate-1",
        "sno": 496,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To begin or start something",
        "hindiMeaning": "प्रारंभ करना",
        "englishSentence": "They initiated a new policy.",
        "hindiSentence": "उन्होंने एक नई नीति की शुरुआत की।"
      },
      {
        "id": "hg-initiate-2",
        "sno": 497,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A person who has recently joined a group",
        "hindiMeaning": "नया सदस्य",
        "englishSentence": "The initiates were welcomed into the club.",
        "hindiSentence": "नए सदस्यों का क्लब में स्वागत किया गया।"
      }
    ]
  },
  {
    "id": "hg-group-203",
    "word": "Institute",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-institute-1",
        "sno": 514,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To establish or initiate (rules, policies, etc.)",
        "hindiMeaning": "प्रारंभ करना / लागू करना",
        "englishSentence": "The school instituted new dress rules.",
        "hindiSentence": "स्कूल ने नए ड्रेस नियम लागू किए।"
      },
      {
        "id": "hg-institute-2",
        "sno": 515,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "An organization for education, research, etc.",
        "hindiMeaning": "संस्था",
        "englishSentence": "He studies at a management institute.",
        "hindiSentence": "वह एक प्रबंधन संस्थान में पढ़ता है।"
      }
    ]
  },
  {
    "id": "hg-group-204",
    "word": "Instruct",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-instruct-1",
        "sno": 504,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To teach or educate",
        "hindiMeaning": "सिखाना",
        "englishSentence": "He instructed the students in coding.",
        "hindiSentence": "उसने छात्रों को कोडिंग सिखाई।"
      },
      {
        "id": "hg-instruct-2",
        "sno": 505,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To give orders or directions",
        "hindiMeaning": "आदेश देना",
        "englishSentence": "The manager instructed the team to start.",
        "hindiSentence": "प्रबंधक ने टीम को शुरू करने का आदेश दिया।"
      }
    ]
  },
  {
    "id": "hg-group-205",
    "word": "Insure",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-insure-1",
        "sno": 498,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To protect financially through insurance",
        "hindiMeaning": "बीमा करना",
        "englishSentence": "We insured our house against fire.",
        "hindiSentence": "हमने अपने घर का अग्नि बीमा करवाया।"
      },
      {
        "id": "hg-insure-2",
        "sno": 499,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To make certain or guarantee",
        "hindiMeaning": "सुनिश्चित करना",
        "englishSentence": "Hard work insures success.",
        "hindiSentence": "मेहनत सफलता सुनिश्चित करती है।"
      }
    ]
  },
  {
    "id": "hg-group-206",
    "word": "Intake",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-intake-1",
        "sno": 516,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The amount consumed or taken in",
        "hindiMeaning": "खपत / ग्रहण",
        "englishSentence": "Reduce your intake of sugar.",
        "hindiSentence": "अपनी चीनी की खपत कम करें।"
      },
      {
        "id": "hg-intake-2",
        "sno": 517,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The act of taking in air or food",
        "hindiMeaning": "अंदर लेना",
        "englishSentence": "He took a deep intake of breath.",
        "hindiSentence": "उसने गहरी साँस ली।"
      }
    ]
  },
  {
    "id": "hg-group-207",
    "word": "Intend",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-intend-1",
        "sno": 510,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To have as a plan or purpose",
        "hindiMeaning": "इरादा होना",
        "englishSentence": "I intend to complete this project today.",
        "hindiSentence": "मेरा आज यह परियोजना पूरा करने का इरादा है।"
      },
      {
        "id": "hg-intend-2",
        "sno": 511,
        "partOfSpeech": "Verb (Formal)",
        "posCategory": "verb",
        "englishMeaning": "To design or designate for a particular use",
        "hindiMeaning": "निर्धारित करना",
        "englishSentence": "This course is intended for beginners.",
        "hindiSentence": "यह कोर्स शुरुआती लोगों के लिए निर्धारित है।"
      }
    ]
  },
  {
    "id": "hg-group-208",
    "word": "Interact",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-interact-1",
        "sno": 512,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To communicate or work with someone",
        "hindiMeaning": "बातचीत करना / संपर्क करना",
        "englishSentence": "Kids interact well in group activities.",
        "hindiSentence": "बच्चे समूह गतिविधियों में अच्छी तरह से बातचीत करते हैं।"
      },
      {
        "id": "hg-interact-2",
        "sno": 513,
        "partOfSpeech": "Verb (Science/Systems)",
        "posCategory": "verb",
        "englishMeaning": "To influence or act upon each other",
        "hindiMeaning": "पारस्परिक प्रभाव डालना",
        "englishSentence": "Chemicals interact during the reaction.",
        "hindiSentence": "रासायनिक अभिक्रिया के दौरान पदार्थ पारस्परिक रूप से प्रभाव डालते हैं।"
      }
    ]
  },
  {
    "id": "hg-group-209",
    "word": "Intercept",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-intercept-1",
        "sno": 500,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To stop or interrupt before arrival",
        "hindiMeaning": "रोकना",
        "englishSentence": "The police intercepted the shipment.",
        "hindiSentence": "पुलिस ने खेप को बीच में रोक लिया।"
      },
      {
        "id": "hg-intercept-2",
        "sno": 501,
        "partOfSpeech": "Noun (Math)",
        "posCategory": "noun",
        "englishMeaning": "A point where a line crosses an axis",
        "hindiMeaning": "अवरोध बिंदु",
        "englishSentence": "The graph shows the y-intercept clearly.",
        "hindiSentence": "ग्राफ में y-अवरोध स्पष्ट दिखता है।"
      }
    ]
  },
  {
    "id": "hg-group-210",
    "word": "Interest",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-interest-1",
        "sno": 482,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A feeling of curiosity or concern",
        "hindiMeaning": "रुचि",
        "englishSentence": "She has a deep interest in art.",
        "hindiSentence": "उसे कला में गहरी रुचि है।"
      },
      {
        "id": "hg-interest-2",
        "sno": 483,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "Money earned or paid for borrowing/saving",
        "hindiMeaning": "ब्याज",
        "englishSentence": "The bank pays 6% interest on savings.",
        "hindiSentence": "बैंक बचत पर 6% ब्याज देता है।"
      },
      {
        "id": "hg-interest-3",
        "sno": 484,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To attract or engage",
        "hindiMeaning": "आकर्षित करना",
        "englishSentence": "The topic interested the students.",
        "hindiSentence": "विषय ने छात्रों को आकर्षित किया।"
      }
    ]
  },
  {
    "id": "hg-group-211",
    "word": "Intrigue",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-intrigue-1",
        "sno": 518,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To arouse curiosity or interest",
        "hindiMeaning": "आकर्षित करना",
        "englishSentence": "The story intrigued me.",
        "hindiSentence": "कहानी ने मुझे आकर्षित किया।"
      },
      {
        "id": "hg-intrigue-2",
        "sno": 519,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A secret plot or scheme",
        "hindiMeaning": "गुप्त षड्यंत्र",
        "englishSentence": "The novel was full of political intrigue.",
        "hindiSentence": "उपन्यास राजनीतिक षड्यंत्रों से भरा था।"
      }
    ]
  },
  {
    "id": "hg-group-212",
    "word": "Invalid",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-invalid-1",
        "sno": 520,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A person made weak by illness or injury",
        "hindiMeaning": "रोगी / दुर्बल व्यक्ति",
        "englishSentence": "He was an invalid after the accident.",
        "hindiSentence": "दुर्घटना के बाद वह रोगी हो गया।"
      },
      {
        "id": "hg-invalid-2",
        "sno": 521,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Not valid or legally acceptable",
        "hindiMeaning": "अमान्य",
        "englishSentence": "Your ticket is invalid without a stamp.",
        "hindiSentence": "बिना मोहर के आपका टिकट अमान्य है।"
      }
    ]
  },
  {
    "id": "hg-group-213",
    "word": "Invest",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-invest-1",
        "sno": 506,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To allocate money expecting returns",
        "hindiMeaning": "निवेश करना",
        "englishSentence": "She invested in real estate.",
        "hindiSentence": "उसने रियल एस्टेट में निवेश किया।"
      },
      {
        "id": "hg-invest-2",
        "sno": 507,
        "partOfSpeech": "Verb (Formal)",
        "posCategory": "verb",
        "englishMeaning": "To formally give power or authority",
        "hindiMeaning": "अधिकार प्रदान करना",
        "englishSentence": "The president was invested with new powers.",
        "hindiSentence": "राष्ट्रपति को नए अधिकार प्रदान किए गए।"
      }
    ]
  },
  {
    "id": "hg-group-214",
    "word": "Involve",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-involve-1",
        "sno": 485,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To include or engage in something",
        "hindiMeaning": "शामिल करना",
        "englishSentence": "The project involves three teams.",
        "hindiSentence": "इस परियोजना में तीन टीमें शामिल हैं।"
      },
      {
        "id": "hg-involve-2",
        "sno": 486,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To imply or require as a necessary part",
        "hindiMeaning": "आवश्यक होना",
        "englishSentence": "Surgery involves some risk.",
        "hindiSentence": "सर्जरी में कुछ जोखिम शामिल होता है।"
      }
    ]
  },
  {
    "id": "hg-group-215",
    "word": "Iron",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-iron-1",
        "sno": 480,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A strong metal",
        "hindiMeaning": "लोहा",
        "englishSentence": "The gate is made of iron.",
        "hindiSentence": "यह फाटक लोहे का बना है।"
      },
      {
        "id": "hg-iron-2",
        "sno": 481,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To press clothes with heat to remove wrinkles",
        "hindiMeaning": "इस्त्री करना",
        "englishSentence": "She ironed his shirt for the interview.",
        "hindiSentence": "उसने साक्षात्कार के लिए उसकी शर्ट को इस्त्री किया।"
      }
    ]
  },
  {
    "id": "hg-group-216",
    "word": "Irony",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-irony-1",
        "sno": 522,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The use of words that mean the opposite of what is said",
        "hindiMeaning": "व्यंग्य",
        "englishSentence": "There's irony in his compliment.",
        "hindiSentence": "उसकी तारीफ़ में व्यंग्य है।"
      },
      {
        "id": "hg-irony-2",
        "sno": 523,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A situation that is opposite of what is expected",
        "hindiMeaning": "विरोधाभास",
        "englishSentence": "It was irony that the firefighter's house burned down.",
        "hindiSentence": "यह विरोधाभास था कि दमकलकर्मी का ही घर जल गया।"
      }
    ]
  },
  {
    "id": "hg-group-217",
    "word": "Issue",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-issue-1",
        "sno": 477,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A topic of discussion or concern",
        "hindiMeaning": "मुद्दा",
        "englishSentence": "The issue was discussed in the meeting.",
        "hindiSentence": "बैठक में इस मुद्दे पर चर्चा हुई।"
      },
      {
        "id": "hg-issue-2",
        "sno": 478,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To officially distribute or release",
        "hindiMeaning": "जारी करना",
        "englishSentence": "The passport was issued last week.",
        "hindiSentence": "पासपोर्ट पिछले सप्ताह जारी हुआ।"
      },
      {
        "id": "hg-issue-3",
        "sno": 479,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A publication released at a specific time",
        "hindiMeaning": "अंक",
        "englishSentence": "I read the latest issue of the magazine.",
        "hindiSentence": "मैंने पत्रिका का नवीनतम अंक पढ़ा।"
      }
    ]
  },
  {
    "id": "hg-group-218",
    "word": "Jack",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-jack-1",
        "sno": 532,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A device for lifting heavy objects",
        "hindiMeaning": "जैक (उठाने का यंत्र)",
        "englishSentence": "Use the jack to lift the car.",
        "hindiSentence": "कार को उठाने के लिए जैक का इस्तेमाल करो।"
      },
      {
        "id": "hg-jack-2",
        "sno": 533,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A playing card with a man figure",
        "hindiMeaning": "पत्ते का एक कार्ड (गुलाम)",
        "englishSentence": "I drew the jack of hearts.",
        "hindiSentence": "मैंने दिल का जैक निकाला।"
      }
    ]
  },
  {
    "id": "hg-group-219",
    "word": "Jerk",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-jerk-1",
        "sno": 539,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A sudden, sharp movement",
        "hindiMeaning": "झटका",
        "englishSentence": "The car stopped with a jerk.",
        "hindiSentence": "कार झटके से रुकी।"
      },
      {
        "id": "hg-jerk-2",
        "sno": 540,
        "partOfSpeech": "Noun (Slang)",
        "posCategory": "noun",
        "englishMeaning": "A rude or mean person",
        "hindiMeaning": "असभ्य व्यक्ति",
        "englishSentence": "Don't be such a jerk!",
        "hindiSentence": "इतना असभ्य मत बनो!"
      }
    ]
  },
  {
    "id": "hg-group-220",
    "word": "Jockey",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-jockey-1",
        "sno": 547,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A person who rides racehorses professionally",
        "hindiMeaning": "घुड़सवार",
        "englishSentence": "The jockey guided the horse to victory.",
        "hindiSentence": "घुड़सवार ने घोड़े को जीत तक पहुँचाया।"
      },
      {
        "id": "hg-jockey-2",
        "sno": 548,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To compete or struggle for advantage",
        "hindiMeaning": "होड़ करना",
        "englishSentence": "They jockeyed for the top position.",
        "hindiSentence": "उन्होंने शीर्ष स्थान के लिए होड़ की।"
      },
      {
        "id": "hg-jockey-3",
        "sno": 549,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To maneuver or manipulate cleverly",
        "hindiMeaning": "चालाकी से काम लेना",
        "englishSentence": "He jockeyed his way into the boardroom.",
        "hindiSentence": "उसने चालाकी से खुद को बोर्ड रूम में पहुँचाया।"
      }
    ]
  },
  {
    "id": "hg-group-221",
    "word": "Jog",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-jog-1",
        "sno": 541,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To run slowly for exercise",
        "hindiMeaning": "धीरे दौड़ना",
        "englishSentence": "She jogs every morning.",
        "hindiSentence": "वह हर सुबह धीरे दौड़ती है।"
      },
      {
        "id": "hg-jog-2",
        "sno": 542,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To nudge or push slightly",
        "hindiMeaning": "हल्का धक्का देना",
        "englishSentence": "He jogged my elbow by mistake.",
        "hindiSentence": "उसने गलती से मेरी कुहनी को हल्का धक्का दिया।"
      }
    ]
  },
  {
    "id": "hg-group-222",
    "word": "Join",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-join-1",
        "sno": 554,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To connect or link together",
        "hindiMeaning": "जोड़ना",
        "englishSentence": "Please join the two wires.",
        "hindiSentence": "कृपया दोनों तारों को जोड़ें।"
      },
      {
        "id": "hg-join-2",
        "sno": 555,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To become a member or participant",
        "hindiMeaning": "शामिल होना",
        "englishSentence": "He joined the army last year.",
        "hindiSentence": "वह पिछले साल सेना में शामिल हुआ।"
      }
    ]
  },
  {
    "id": "hg-group-223",
    "word": "Joint",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-joint-1",
        "sno": 524,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A place where two parts are connected",
        "hindiMeaning": "जोड़",
        "englishSentence": "He injured the joint in his elbow.",
        "hindiSentence": "उसने अपनी कोहनी के जोड़ को घायल कर लिया।"
      },
      {
        "id": "hg-joint-2",
        "sno": 525,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Shared or done by two or more people",
        "hindiMeaning": "संयुक्त",
        "englishSentence": "They opened a joint account.",
        "hindiSentence": "उन्होंने एक संयुक्त खाता खोला।"
      }
    ]
  },
  {
    "id": "hg-group-224",
    "word": "Jolt",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-jolt-1",
        "sno": 545,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To shake suddenly and violently",
        "hindiMeaning": "झटका देना",
        "englishSentence": "The train jolted to a stop.",
        "hindiSentence": "ट्रेन झटका देकर रुकी।"
      },
      {
        "id": "hg-jolt-2",
        "sno": 546,
        "partOfSpeech": "Verb (Figurative)",
        "posCategory": "verb",
        "englishMeaning": "To shock emotionally",
        "hindiMeaning": "चौंका देना",
        "englishSentence": "The news jolted her completely.",
        "hindiSentence": "यह खबर उसे पूरी तरह चौंका गई।"
      }
    ]
  },
  {
    "id": "hg-group-225",
    "word": "Jot",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-jot-1",
        "sno": 552,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To write something quickly",
        "hindiMeaning": "जल्दी में लिखना",
        "englishSentence": "Jot down his number.",
        "hindiSentence": "उसका नंबर जल्दी से लिख लो।"
      },
      {
        "id": "hg-jot-2",
        "sno": 553,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A very small amount",
        "hindiMeaning": "बहुत थोड़ी मात्रा",
        "englishSentence": "He didn't care a jot about the result.",
        "hindiSentence": "उसे परिणाम की रत्ती भर भी परवाह नहीं थी।"
      }
    ]
  },
  {
    "id": "hg-group-226",
    "word": "Judge",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-judge-1",
        "sno": 534,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A person who decides in court",
        "hindiMeaning": "न्यायाधीश",
        "englishSentence": "The judge gave a fair verdict.",
        "hindiSentence": "न्यायाधीश ने निष्पक्ष फैसला दिया।"
      },
      {
        "id": "hg-judge-2",
        "sno": 535,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To form an opinion or decision",
        "hindiMeaning": "निर्णय देना",
        "englishSentence": "Don't judge a book by its cover.",
        "hindiSentence": "किसी किताब को उसके कवर से मत आँको।"
      },
      {
        "id": "hg-judge-3",
        "sno": 536,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To evaluate in a contest or competition",
        "hindiMeaning": "मूल्यांकन करना",
        "englishSentence": "She judged the singing contest.",
        "hindiSentence": "उसने गायन प्रतियोगिता का मूल्यांकन किया।"
      }
    ]
  },
  {
    "id": "hg-group-227",
    "word": "Juggle",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-juggle-1",
        "sno": 543,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To keep multiple objects in the air by throwing and catching",
        "hindiMeaning": "गेंदों को हवा में उछालना",
        "englishSentence": "He juggled three balls at once.",
        "hindiSentence": "उसने एक साथ तीन गेंदें उछालीं।"
      },
      {
        "id": "hg-juggle-2",
        "sno": 544,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To manipulate or alter dishonestly",
        "hindiMeaning": "हेरफेर करना",
        "englishSentence": "He was caught juggling the accounts.",
        "hindiSentence": "उसे खातों में हेरफेर करते पकड़ा गया।"
      }
    ]
  },
  {
    "id": "hg-group-228",
    "word": "Jump",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-jump-1",
        "sno": 537,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To spring off the ground",
        "hindiMeaning": "कूदना",
        "englishSentence": "He jumped over the fence.",
        "hindiSentence": "वह बाड़ कूद गया।"
      },
      {
        "id": "hg-jump-2",
        "sno": 538,
        "partOfSpeech": "Verb (Figurative)",
        "posCategory": "verb",
        "englishMeaning": "To increase or change suddenly",
        "hindiMeaning": "अचानक बढ़ना",
        "englishSentence": "Prices jumped overnight.",
        "hindiSentence": "रातों-रात कीमतें बढ़ गईं।"
      }
    ]
  },
  {
    "id": "hg-group-229",
    "word": "Junk",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-junk-1",
        "sno": 529,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "Useless or discarded material",
        "hindiMeaning": "बेकार सामान",
        "englishSentence": "Throw that old junk away.",
        "hindiSentence": "वह पुराना बेकार सामान फेंक दो।"
      },
      {
        "id": "hg-junk-2",
        "sno": 530,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To discard or get rid of something",
        "hindiMeaning": "फेंकना",
        "englishSentence": "He junked the broken TV.",
        "hindiSentence": "उसने टूटा हुआ टीवी फेंक दिया।"
      },
      {
        "id": "hg-junk-3",
        "sno": 531,
        "partOfSpeech": "Noun (Food)",
        "posCategory": "noun",
        "englishMeaning": "Unhealthy but tasty food",
        "hindiMeaning": "जंक फूड",
        "englishSentence": "Kids love eating junk.",
        "hindiSentence": "बच्चों को जंक फूड खाना पसंद है।"
      }
    ]
  },
  {
    "id": "hg-group-230",
    "word": "Just",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-just-1",
        "sno": 526,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Fair and morally right",
        "hindiMeaning": "न्यायसंगत",
        "englishSentence": "It was a just decision.",
        "hindiSentence": "यह एक न्यायसंगत निर्णय था।"
      },
      {
        "id": "hg-just-2",
        "sno": 527,
        "partOfSpeech": "Adverb",
        "posCategory": "verb",
        "englishMeaning": "Exactly or precisely",
        "hindiMeaning": "ठीक / बिल्कुल",
        "englishSentence": "That's just what I needed.",
        "hindiSentence": "यही तो मुझे चाहिए था।"
      },
      {
        "id": "hg-just-3",
        "sno": 528,
        "partOfSpeech": "Adverb",
        "posCategory": "verb",
        "englishMeaning": "A short time ago",
        "hindiMeaning": "अभी-अभी",
        "englishSentence": "She just left the office.",
        "hindiSentence": "वह अभी-अभी ऑफिस से निकली है।"
      }
    ]
  },
  {
    "id": "hg-group-231",
    "word": "Justify",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-justify-1",
        "sno": 550,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To show or prove something to be right",
        "hindiMeaning": "उचित ठहराना",
        "englishSentence": "He tried to justify his mistake.",
        "hindiSentence": "उसने अपनी गलती को सही ठहराने की कोशिश की।"
      },
      {
        "id": "hg-justify-2",
        "sno": 551,
        "partOfSpeech": "Verb (Printing)",
        "posCategory": "verb",
        "englishMeaning": "To align text evenly on both sides",
        "hindiMeaning": "टेक्स्ट सम करना",
        "englishSentence": "The paragraph was justified on the page.",
        "hindiSentence": "अनुच्छेद को पेज पर बराबर समतल किया गया।"
      }
    ]
  },
  {
    "id": "hg-group-232",
    "word": "Keen",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-keen-1",
        "sno": 577,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Having a sharp edge or point",
        "hindiMeaning": "तीक्ष्ण / कुशल",
        "englishSentence": "He used a keen blade to carve wood.",
        "hindiSentence": "उसने लकड़ी तराशने के लिए तीक्ष्ण ब्लेड का इस्तेमाल किया।"
      },
      {
        "id": "hg-keen-2",
        "sno": 578,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Showing eagerness or enthusiasm",
        "hindiMeaning": "उत्साही",
        "englishSentence": "She's keen to start the new project.",
        "hindiSentence": "वह नई परियोजना शुरू करने के लिए उत्साही है।"
      }
    ]
  },
  {
    "id": "hg-group-233",
    "word": "Keep",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-keep-1",
        "sno": 556,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To retain or hold",
        "hindiMeaning": "रखना",
        "englishSentence": "Keep your money safe.",
        "hindiSentence": "अपना पैसा सुरक्षित रखो।"
      },
      {
        "id": "hg-keep-2",
        "sno": 557,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To continue doing something",
        "hindiMeaning": "जारी रखना",
        "englishSentence": "Keep walking straight.",
        "hindiSentence": "सीधे चलते रहो।"
      },
      {
        "id": "hg-keep-3",
        "sno": 558,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A castle's strongest tower used for defence",
        "hindiMeaning": "किला / मुख्य गढ़",
        "englishSentence": "The guards stood near the keep.",
        "hindiSentence": "पहरेदार किले के पास खड़े थे।"
      }
    ]
  },
  {
    "id": "hg-group-234",
    "word": "Key",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-key-1",
        "sno": 573,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A small metal piece used to open locks",
        "hindiMeaning": "चाबी",
        "englishSentence": "He turned the key in the lock.",
        "hindiSentence": "उसने ताला खोलने के लिए चाबी घुमाई।"
      },
      {
        "id": "hg-key-2",
        "sno": 574,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A crucial factor or central element",
        "hindiMeaning": "महत्व का कारक / कुंजी",
        "englishSentence": "Trust is the key to their success.",
        "hindiSentence": "उनकी सफलता की कुंजी विश्वास है।"
      }
    ]
  },
  {
    "id": "hg-group-235",
    "word": "Kick",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-kick-1",
        "sno": 559,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To strike with the foot",
        "hindiMeaning": "लात मारना",
        "englishSentence": "He kicked the ball into the goal.",
        "hindiSentence": "उसने गेंद को गोल में लात मारी।"
      },
      {
        "id": "hg-kick-2",
        "sno": 560,
        "partOfSpeech": "Noun (Informal)",
        "posCategory": "noun",
        "englishMeaning": "A burst of energy, thrill, or excitement",
        "hindiMeaning": "जोश / रोमांच",
        "englishSentence": "That ride gave me a real kick!",
        "hindiSentence": "उस सवारी से मुझे ज़बरदस्त रोमांच मिला!"
      },
      {
        "id": "hg-kick-3",
        "sno": 561,
        "partOfSpeech": "Verb (Informal)",
        "posCategory": "verb",
        "englishMeaning": "To start or begin something forcefully",
        "hindiMeaning": "शुरू करना",
        "englishSentence": "The campaign kicks off next week.",
        "hindiSentence": "अभियान अगले सप्ताह शुरू होगा।"
      }
    ]
  },
  {
    "id": "hg-group-236",
    "word": "Kid",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-kid-1",
        "sno": 562,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A child",
        "hindiMeaning": "बच्चा",
        "englishSentence": "The kid is playing outside.",
        "hindiSentence": "बच्चा बाहर खेल रहा है।"
      },
      {
        "id": "hg-kid-2",
        "sno": 563,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To joke or tease",
        "hindiMeaning": "मज़ाक करना",
        "englishSentence": "Are you kidding me?",
        "hindiSentence": "क्या तुम मज़ाक कर रहे हो?"
      }
    ]
  },
  {
    "id": "hg-group-237",
    "word": "Kill",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-kill-1",
        "sno": 564,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To cause death",
        "hindiMeaning": "मारना",
        "englishSentence": "He killed the snake.",
        "hindiSentence": "उसने साँप को मार डाला।"
      },
      {
        "id": "hg-kill-2",
        "sno": 565,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "An animal that has been hunted or killed",
        "hindiMeaning": "शिकार",
        "englishSentence": "The lion dragged its kill away.",
        "hindiSentence": "शेर अपने शिकार को घसीटकर ले गया।"
      },
      {
        "id": "hg-kill-3",
        "sno": 566,
        "partOfSpeech": "Verb (Figurative)",
        "posCategory": "verb",
        "englishMeaning": "To destroy or ruin something",
        "hindiMeaning": "नष्ट करना",
        "englishSentence": "Loud noise kills concentration.",
        "hindiSentence": "तेज़ आवाज़ एकाग्रता को नष्ट कर देती है।"
      }
    ]
  },
  {
    "id": "hg-group-238",
    "word": "Kin",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-kin-1",
        "sno": 579,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "One's family or relatives",
        "hindiMeaning": "परिवार / संबंधी",
        "englishSentence": "All my kin will attend the wedding.",
        "hindiSentence": "मेरी शादी में मेरे सभी संबंधी आएंगे।"
      },
      {
        "id": "hg-kin-2",
        "sno": 580,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Related by birth or origin",
        "hindiMeaning": "जन्मगत / परिचित",
        "englishSentence": "These two plants are kin species.",
        "hindiSentence": "ये दोनों पौधे एक ही जाति के हैं।"
      }
    ]
  },
  {
    "id": "hg-group-239",
    "word": "Kind",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-kind-1",
        "sno": 567,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A type or category",
        "hindiMeaning": "प्रकार",
        "englishSentence": "This kind of fruit is rare.",
        "hindiSentence": "इस प्रकार का फल दुर्लभ है।"
      },
      {
        "id": "hg-kind-2",
        "sno": 568,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Gentle and caring",
        "hindiMeaning": "दयालु",
        "englishSentence": "She is very kind to animals.",
        "hindiSentence": "वह जानवरों के प्रति बहुत दयालु है।"
      }
    ]
  },
  {
    "id": "hg-group-240",
    "word": "Kink",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-kink-1",
        "sno": 585,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A twist, curl, or tight loop",
        "hindiMeaning": "मोड़ / कर्ल",
        "englishSentence": "There's a kink in the hose stopping the water flow.",
        "hindiSentence": "नली में एक मोड़ है जो पानी के बहाव को रोक रहा है।"
      },
      {
        "id": "hg-kink-2",
        "sno": 586,
        "partOfSpeech": "Noun (Figurative)",
        "posCategory": "noun",
        "englishMeaning": "A quirk or idiosyncrasy",
        "hindiMeaning": "विचित्रता / अजीब स्वभाव",
        "englishSentence": "He has a few kinks in his personality.",
        "hindiSentence": "उसके स्वभाव में कुछ अजीब विचित्रताएँ हैं।"
      },
      {
        "id": "hg-kink-3",
        "sno": 587,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To create a twist or loop",
        "hindiMeaning": "मोड़ना / मरोड़ना",
        "englishSentence": "She kinked the wire for better grip.",
        "hindiSentence": "उसने बेहतर पकड़ के लिए तार को मोड़ा।"
      }
    ]
  },
  {
    "id": "hg-group-241",
    "word": "Kip",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-kip-1",
        "sno": 581,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A short sleep or nap",
        "hindiMeaning": "झपकी",
        "englishSentence": "I'll catch a quick kip before dinner.",
        "hindiSentence": "रात के खाने से पहले मैं थोड़ी झपकी लूंगा।"
      },
      {
        "id": "hg-kip-2",
        "sno": 582,
        "partOfSpeech": "Verb (British slang)",
        "posCategory": "verb",
        "englishMeaning": "To sleep",
        "hindiMeaning": "सोना",
        "englishSentence": "He kipped on the sofa all afternoon.",
        "hindiSentence": "उसने दोपहर भर सोफ़े पर सोया।"
      }
    ]
  },
  {
    "id": "hg-group-242",
    "word": "Kit",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-kit-1",
        "sno": 583,
        "partOfSpeech": "Noun (Equipment)",
        "posCategory": "noun",
        "englishMeaning": "A set of tools or equipment for a specific purpose",
        "hindiMeaning": "उपकरण सेट",
        "englishSentence": "The first-aid kit is in the glovebox.",
        "hindiSentence": "फर्स्ट-एड किट ग्लोवबॉक्स में है।"
      },
      {
        "id": "hg-kit-2",
        "sno": 584,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To equip or outfit someone or something",
        "hindiMeaning": "सुसज्जित करना",
        "englishSentence": "They kitted the team out in new uniforms.",
        "hindiSentence": "उन्होंने टीम को नए वर्दी से सुसज्जित किया।"
      }
    ]
  },
  {
    "id": "hg-group-243",
    "word": "Kite",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-kite-1",
        "sno": 575,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A lightweight frame covered with paper flown in the wind",
        "hindiMeaning": "पतंग",
        "englishSentence": "Children flew kites in the park.",
        "hindiSentence": "बच्चे पार्क में पतंगें उड़ाते हैं।"
      },
      {
        "id": "hg-kite-2",
        "sno": 576,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A trick of floating a check hoping funds arrive before it's processed",
        "hindiMeaning": "चेक धोखाधड़ी",
        "englishSentence": "He was arrested for kiting checks.",
        "hindiSentence": "उसे चेक धोखाधड़ी के आरोप में गिरफ्तार किया गया।"
      }
    ]
  },
  {
    "id": "hg-group-244",
    "word": "Knight",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-knight-1",
        "sno": 588,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A medieval mounted soldier granted honour",
        "hindiMeaning": "योद्धा / शूरवीर",
        "englishSentence": "The knight swore loyalty to his liege lord.",
        "hindiSentence": "योद्धा ने अपने स्वामी के प्रति वफादारी की शपथ ली।"
      },
      {
        "id": "hg-knight-2",
        "sno": 589,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To confer knighthood on someone",
        "hindiMeaning": "सम्मानित करना",
        "englishSentence": "The queen knighted her most loyal servant.",
        "hindiSentence": "रानी ने अपने सबसे वफादार सेवक को सम्मानित किया।"
      }
    ]
  },
  {
    "id": "hg-group-245",
    "word": "Knock",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-knock-1",
        "sno": 569,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To hit or strike a surface",
        "hindiMeaning": "खटखटाना",
        "englishSentence": "He knocked on the door.",
        "hindiSentence": "उसने दरवाज़ा खटखटाया।"
      },
      {
        "id": "hg-knock-2",
        "sno": 570,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A hit, blow, or sound of hitting",
        "hindiMeaning": "ठोकर / दस्तक",
        "englishSentence": "There was a knock at the window.",
        "hindiSentence": "खिड़की पर दस्तक हुई।"
      }
    ]
  },
  {
    "id": "hg-group-246",
    "word": "Knot",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-knot-1",
        "sno": 571,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A fastening made by tying string/rope",
        "hindiMeaning": "गाँठ",
        "englishSentence": "He tied the rope in a tight knot.",
        "hindiSentence": "उसने रस्सी में कसकर गाँठ बाँधी।"
      },
      {
        "id": "hg-knot-2",
        "sno": 572,
        "partOfSpeech": "Noun (Figurative)",
        "posCategory": "noun",
        "englishMeaning": "A tangle or complication",
        "hindiMeaning": "उलझन",
        "englishSentence": "There was a knot of tension in the air.",
        "hindiSentence": "माहौल में तनाव की गाँठ थी।"
      }
    ]
  },
  {
    "id": "hg-group-247",
    "word": "Lace",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-lace-1",
        "sno": 667,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A fine ornamental openwork fabric",
        "hindiMeaning": "फ़ीता / लेस",
        "englishSentence": "Her dress was trimmed with lace.",
        "hindiSentence": "उसकी पोशाक फीते से सजाई गई थी।"
      },
      {
        "id": "hg-lace-2",
        "sno": 668,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To add alcohol or another substance in small quantities to (a drink or dish)",
        "hindiMeaning": "मिलाना / मिश्रण करना",
        "englishSentence": "He laced his coffee with brandy.",
        "hindiSentence": "उसने अपनी कॉफ़ी में ब्रांडी मिलाई।"
      }
    ]
  },
  {
    "id": "hg-group-248",
    "word": "Lag",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-lag-1",
        "sno": 590,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To fall behind in movement, progress, or development",
        "hindiMeaning": "पीछे रह जाना",
        "englishSentence": "He lagged behind the group on the hike.",
        "hindiSentence": "ट्रेक पर चलने में वह समूह के पीछे रह गया।"
      },
      {
        "id": "hg-lag-2",
        "sno": 591,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A delay between two related events",
        "hindiMeaning": "विलंब",
        "englishSentence": "There's a lag between action and response in the system.",
        "hindiSentence": "सिस्टम में क्रिया और प्रतिक्रिया के बीच विलंब है।"
      }
    ]
  },
  {
    "id": "hg-group-249",
    "word": "Lamb",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-lamb-1",
        "sno": 592,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A young sheep",
        "hindiMeaning": "मेमना",
        "englishSentence": "The farmer fed the lamb with a bottle.",
        "hindiSentence": "किसान ने मेमने को बोतल से दूध पिलाया।"
      },
      {
        "id": "hg-lamb-2",
        "sno": 593,
        "partOfSpeech": "Noun (Figurative)",
        "posCategory": "noun",
        "englishMeaning": "A gentle or innocent person",
        "hindiMeaning": "कोमल / भोला व्यक्ति",
        "englishSentence": "He's a lamb compared to his brother's rough ways.",
        "hindiSentence": "अपने भाई की कठोर प्रवृत्ति की तुलना में वह बिलकुल भोला है।"
      }
    ]
  },
  {
    "id": "hg-group-250",
    "word": "Land",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-land-1",
        "sno": 594,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To come to rest on the ground or a surface after moving through air",
        "hindiMeaning": "उतारना / उतरना",
        "englishSentence": "The plane landed safely at dawn.",
        "hindiSentence": "विमान सुबह सुरक्षित रूप से उतरा।"
      },
      {
        "id": "hg-land-2",
        "sno": 595,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The solid part of the earth's surface",
        "hindiMeaning": "ज़मीन",
        "englishSentence": "They bought a plot of land near the river.",
        "hindiSentence": "उन्होंने नदी के पास एक खेत खरीदा।"
      }
    ]
  },
  {
    "id": "hg-group-251",
    "word": "Lap",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-lap-1",
        "sno": 596,
        "partOfSpeech": "Noun (Body)",
        "posCategory": "noun",
        "englishMeaning": "The top of the thighs when seated",
        "hindiMeaning": "जाँघ",
        "englishSentence": "The cat curled up in her lap.",
        "hindiSentence": "बिल्ली उसके जाँघ पर सिकुड़ गई।"
      },
      {
        "id": "hg-lap-2",
        "sno": 597,
        "partOfSpeech": "Noun (Circuit)",
        "posCategory": "noun",
        "englishMeaning": "One circuit around a track",
        "hindiMeaning": "चक्कर",
        "englishSentence": "He completed the lap in under a minute.",
        "hindiSentence": "उसने एक मिनट से कम समय में चक्कर पूरा किया।"
      },
      {
        "id": "hg-lap-3",
        "sno": 598,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To drink by licking with the tongue",
        "hindiMeaning": "जीभ से चाटकर पीना",
        "englishSentence": "The dog lapped water from the bowl.",
        "hindiSentence": "कुत्ते ने कटोरे से पानी चाटकर पिया।"
      }
    ]
  },
  {
    "id": "hg-group-252",
    "word": "Lark",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-lark-1",
        "sno": 694,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A carefree or spirited adventure",
        "hindiMeaning": "मस्तीभरी हरकत / मज़ाक",
        "englishSentence": "We went out for a lark.",
        "hindiSentence": "हम मस्ती करने गए।"
      },
      {
        "id": "hg-lark-2",
        "sno": 695,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A small songbird",
        "hindiMeaning": "लार्क पक्षी / भारद्वाज पक्षी",
        "englishSentence": "The lark sang at dawn.",
        "hindiSentence": "लार्क पक्षी ने सुबह गाना गाया।"
      }
    ]
  },
  {
    "id": "hg-group-253",
    "word": "Last",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-last-1",
        "sno": 599,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Coming after all others in time or order",
        "hindiMeaning": "अंतिम",
        "englishSentence": "He was the last to arrive.",
        "hindiSentence": "वह पहुँचने में सबसे अंतिम था।"
      },
      {
        "id": "hg-last-2",
        "sno": 600,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To continue to function or exist",
        "hindiMeaning": "चलना / टिकना",
        "englishSentence": "The battery will last for ten hours.",
        "hindiSentence": "बैटरी दस घंटे तक चलेगी।"
      },
      {
        "id": "hg-last-3",
        "sno": 600,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To continue for a specified period",
        "hindiMeaning": "चलना / टिके रहना",
        "englishSentence": "This meeting should last an hour.",
        "hindiSentence": "यह बैठक एक घंटे तक चलेगी।"
      }
    ]
  },
  {
    "id": "hg-group-254",
    "word": "Late",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-late-1",
        "sno": 601,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "After the expected or usual time",
        "hindiMeaning": "विलंबित / देर से",
        "englishSentence": "She was late for the appointment.",
        "hindiSentence": "वह अपॉइंटमेंट के लिए देर से आई।"
      },
      {
        "id": "hg-late-2",
        "sno": 602,
        "partOfSpeech": "Adverb",
        "posCategory": "verb",
        "englishMeaning": "Not long ago",
        "hindiMeaning": "अभी-अभी / देर से",
        "englishSentence": "He left late last night.",
        "hindiSentence": "वह अभी-अभी रात को देर से गया था।"
      }
    ]
  },
  {
    "id": "hg-group-255",
    "word": "Lavish",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-lavish-1",
        "sno": 661,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Sumptuously rich or elaborate",
        "hindiMeaning": "भव्य / शानदार",
        "englishSentence": "They hosted a lavish banquet.",
        "hindiSentence": "उन्होंने एक भव्य भोज आयोजित किया।"
      },
      {
        "id": "hg-lavish-2",
        "sno": 662,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To bestow in generous or extravagant quantities",
        "hindiMeaning": "बहुतायत से देना / लुटाना",
        "englishSentence": "He lavished praise on the team.",
        "hindiSentence": "उसने टीम पर बहुतायत से प्रशंसा की।"
      }
    ]
  },
  {
    "id": "hg-group-256",
    "word": "Lawn",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-lawn-1",
        "sno": 663,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "An area of short, mown grass",
        "hindiMeaning": "लॉन / घास का मैदान",
        "englishSentence": "The children played on the lawn.",
        "hindiSentence": "बच्चे लॉन पर खेल रहे थे।"
      },
      {
        "id": "hg-lawn-2",
        "sno": 664,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A fine translucent fabric",
        "hindiMeaning": "महीन कपड़ा (लॉन कपड़ा)",
        "englishSentence": "Her summer dress was made of lawn.",
        "hindiSentence": "उसकी गर्मियों की पोशाक महीन कपड़े की बनी थी।"
      }
    ]
  },
  {
    "id": "hg-group-257",
    "word": "Lay",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-lay-1",
        "sno": 603,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To put or place in a flat position",
        "hindiMeaning": "रखना",
        "englishSentence": "Lay the book on the table.",
        "hindiSentence": "किताब को मेज़ पर रखो।"
      },
      {
        "id": "hg-lay-2",
        "sno": 604,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A short ballad or narrative poem",
        "hindiMeaning": "लोकगीत",
        "englishSentence": "He sang a lay of ancient heroes.",
        "hindiSentence": "उसने प्राचीन नायकों का एक लोकगीत गाया।"
      }
    ]
  },
  {
    "id": "hg-group-258",
    "word": "Lead",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-lead-1",
        "sno": 605,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A heavy, soft, malleable metal (/led/)",
        "hindiMeaning": "सीसा (धातु)",
        "englishSentence": "Pipes used to be made of lead.",
        "hindiSentence": "पहले पाइप सीसे के बने होते थे।"
      },
      {
        "id": "hg-lead-2",
        "sno": 606,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To guide or direct (/liːd/)",
        "hindiMeaning": "नेतृत्व करना / राह दिखाना",
        "englishSentence": "She will lead the expedition team.",
        "hindiSentence": "वह खोज दल का नेतृत्व करेगी।"
      },
      {
        "id": "hg-lead-3",
        "sno": 607,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The initiative or advantage (/liːd/)",
        "hindiMeaning": "बढ़त / बढ़त हासिल करना",
        "englishSentence": "He took the lead in the negotiations.",
        "hindiSentence": "उसने बातचीत में बढ़त ली।"
      }
    ]
  },
  {
    "id": "hg-group-259",
    "word": "Leaf",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-leaf-1",
        "sno": 692,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A flattened structure of a plant",
        "hindiMeaning": "पत्ता / पर्ण",
        "englishSentence": "The leaf fell from the tree.",
        "hindiSentence": "पत्ता पेड़ से गिरा।"
      },
      {
        "id": "hg-leaf-2",
        "sno": 693,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To turn over pages",
        "hindiMeaning": "पन्ना पलटना",
        "englishSentence": "Leaf through the magazine.",
        "hindiSentence": "पत्रिका में पन्ना पलटें।"
      }
    ]
  },
  {
    "id": "hg-group-260",
    "word": "Lean",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-lean-1",
        "sno": 608,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To incline or bend from a vertical position",
        "hindiMeaning": "झुकना",
        "englishSentence": "She leaned out of the window to look down.",
        "hindiSentence": "उसने झुककर नीचे देखने के लिए खिड़की से बाहर देखा।"
      },
      {
        "id": "hg-lean-2",
        "sno": 609,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Thin or without much fat",
        "hindiMeaning": "दुबला-पतला",
        "englishSentence": "He has a lean build suited for running.",
        "hindiSentence": "उसकी शारीरिक बनावट दुबली-पतली है, जो दौड़ने के लिए उपयुक्त है।"
      }
    ]
  },
  {
    "id": "hg-group-261",
    "word": "Leave",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-leave-1",
        "sno": 610,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To go away from",
        "hindiMeaning": "छोड़कर जाना / विदा होना",
        "englishSentence": "They will leave the city at dawn.",
        "hindiSentence": "वे सुबह शहर छोड़कर जाएंगे।"
      },
      {
        "id": "hg-leave-2",
        "sno": 611,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "Time off from work or duty (Permission)",
        "hindiMeaning": "अवकाश / छुट्टी",
        "englishSentence": "She requested a leave of absence.",
        "hindiSentence": "उसने अवकाश का अनुरोध किया।"
      }
    ]
  },
  {
    "id": "hg-group-262",
    "word": "Leech",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-leech-1",
        "sno": 688,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A bloodsucking worm-like parasite",
        "hindiMeaning": "जोंक / पिच्छू",
        "englishSentence": "They removed a leech from his leg.",
        "hindiSentence": "उन्होंने उसके पैर से जोंक निकाल दिया।"
      },
      {
        "id": "hg-leech-2",
        "sno": 689,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To cling to and drain resources from someone",
        "hindiMeaning": "चिपटना / शोषण करना",
        "englishSentence": "He leeches off his relatives.",
        "hindiSentence": "वह अपने संबंधियों का शोषण करता है।"
      }
    ]
  },
  {
    "id": "hg-group-263",
    "word": "Legend",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-legend-1",
        "sno": 665,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A key explaining symbols on a map or chart",
        "hindiMeaning": "(मैप) कुंजी / संकेत सूची",
        "englishSentence": "Refer to the legend for the map symbols.",
        "hindiSentence": "मानचित्र के प्रतीकों के लिए कुंजी देखें।"
      },
      {
        "id": "hg-legend-2",
        "sno": 666,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A very famous or notorious person",
        "hindiMeaning": "दंतकथा व्यक्ति / किंवदंती",
        "englishSentence": "He’s a legend in the world of music.",
        "hindiSentence": "वह संगीत जगत का एक दंतकथा व्यक्ति है।"
      }
    ]
  },
  {
    "id": "hg-group-264",
    "word": "Letter",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-letter-1",
        "sno": 690,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A character representing one or more sounds used in speech",
        "hindiMeaning": "अक्षर / वर्ण",
        "englishSentence": "The word begins with the letter ‘L’.",
        "hindiSentence": "यह शब्द ‘L’ अक्षर से शुरू होता है।"
      },
      {
        "id": "hg-letter-2",
        "sno": 691,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A written or printed message addressed to a person",
        "hindiMeaning": "पत्र / चिट्ठी",
        "englishSentence": "I received a letter yesterday.",
        "hindiSentence": "मुझे कल एक पत्र मिला।"
      }
    ]
  },
  {
    "id": "hg-group-265",
    "word": "Level",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-level-1",
        "sno": 612,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A horizontal plane or line",
        "hindiMeaning": "स्तर / सतह",
        "englishSentence": "Water reached the level of the deck.",
        "hindiSentence": "पानी डेक के स्तर तक पहुँच गया।"
      },
      {
        "id": "hg-level-2",
        "sno": 613,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To make something flat or even",
        "hindiMeaning": "समतल करना",
        "englishSentence": "They levelled the ground for planting.",
        "hindiSentence": "उन्होंने रोपण के लिए जमीन समतल की।"
      }
    ]
  },
  {
    "id": "hg-group-266",
    "word": "Leverage",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-leverage-1",
        "sno": 669,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The power to influence people or situations",
        "hindiMeaning": "प्रभाव / ताकत",
        "englishSentence": "He used his connections as leverage.",
        "hindiSentence": "उसने अपने संबंधों को प्रभाव के लिए इस्तेमाल किया।"
      },
      {
        "id": "hg-leverage-2",
        "sno": 670,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To use (something) to maximum advantage",
        "hindiMeaning": "लाभ उठाना / भरपूर उपयोग करना",
        "englishSentence": "She leveraged her experience to get the job.",
        "hindiSentence": "उसने नौकरी पाने के लिए अपने अनुभव का लाभ उठाया।"
      }
    ]
  },
  {
    "id": "hg-group-267",
    "word": "License",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-license-1",
        "sno": 614,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "An official permit or document",
        "hindiMeaning": "लाइसेंस / अनुज्ञा-पत्र",
        "englishSentence": "He renewed his driver’s license.",
        "hindiSentence": "उसने अपना ड्राइविंग लाइसेंस नवीनीकृत किया।"
      },
      {
        "id": "hg-license-2",
        "sno": 615,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To grant permission legally",
        "hindiMeaning": "लाइसेंस देना / अनुमति देना",
        "englishSentence": "The authority licensed the broadcaster.",
        "hindiSentence": "प्राधिकरण ने प्रसारक को लाइसेंस दिया।"
      }
    ]
  },
  {
    "id": "hg-group-268",
    "word": "Lick",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-lick-1",
        "sno": 629,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To pass the tongue over; to lap",
        "hindiMeaning": "चाटना",
        "englishSentence": "The dog licked my hand.",
        "hindiSentence": "कुत्ते ने मेरा हाथ चाटा।"
      },
      {
        "id": "hg-lick-2",
        "sno": 630,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A defeat (informal/slang)",
        "hindiMeaning": "पराजय / शिकस्त",
        "englishSentence": "They took a lick in last night’s game.",
        "hindiSentence": "उन्होंने कल रात के खेल में पराजय झेली।"
      },
      {
        "id": "hg-lick-3",
        "sno": 631,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A small amount",
        "hindiMeaning": "थोड़ा सा / हल्की परत",
        "englishSentence": "Add a lick of paint here.",
        "hindiSentence": "यहाँ थोड़ा सा पेंट लगाओ।"
      }
    ]
  },
  {
    "id": "hg-group-269",
    "word": "Lie",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-lie-1",
        "sno": 616,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To rest in a horizontal position (Recline)",
        "hindiMeaning": "लेटना",
        "englishSentence": "I like to lie in bed and read on Sundays.",
        "hindiSentence": "मुझे रविवार को बिस्तर पर लेटकर पढ़ना पसंद है।"
      },
      {
        "id": "hg-lie-2",
        "sno": 617,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To tell a falsehood",
        "hindiMeaning": "झूठ बोलना",
        "englishSentence": "He lied about his age.",
        "hindiSentence": "उसने अपनी उम्र के बारे में झूठ बोला।"
      }
    ]
  },
  {
    "id": "hg-group-270",
    "word": "Lift",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-lift-1",
        "sno": 632,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To raise to a higher position",
        "hindiMeaning": "उठाना",
        "englishSentence": "She lifted the box easily.",
        "hindiSentence": "उसने डिब्बा आसानी से उठाया।"
      },
      {
        "id": "hg-lift-2",
        "sno": 633,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "An elevator",
        "hindiMeaning": "लिफ्ट",
        "englishSentence": "Take the lift to the fifth floor.",
        "hindiSentence": "पाँचवीं मंज़िल पर जाने के लिए लिफ्ट लें।"
      },
      {
        "id": "hg-lift-3",
        "sno": 634,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A free ride in a vehicle (Slang)",
        "hindiMeaning": "सवारी / लिफ्ट",
        "englishSentence": "Can you give me a lift?",
        "hindiSentence": "क्या तुम मुझे सवारी दे सकते हो?"
      }
    ]
  },
  {
    "id": "hg-group-271",
    "word": "Light",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-light-1",
        "sno": 618,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The natural agent that stimulates sight and makes things visible",
        "hindiMeaning": "प्रकाश / रोशनी",
        "englishSentence": "The room was filled with light.",
        "hindiSentence": "कमरा प्रकाश से भरा हुआ था।"
      },
      {
        "id": "hg-light-2",
        "sno": 619,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To make something start to burn",
        "hindiMeaning": "जलाना / प्रज्वलित करना",
        "englishSentence": "She lit the candle at dusk.",
        "hindiSentence": "उसने सांझ होते ही मोमबत्ती जलाई।"
      },
      {
        "id": "hg-light-3",
        "sno": 620,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Having little weight; not heavy",
        "hindiMeaning": "हल्का",
        "englishSentence": "This fabric is very light.",
        "hindiSentence": "यह कपड़ा बहुत हल्का है।"
      }
    ]
  },
  {
    "id": "hg-group-272",
    "word": "Like",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-like-1",
        "sno": 621,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To find something pleasant or enjoyable",
        "hindiMeaning": "पसंद करना",
        "englishSentence": "I like chocolate ice cream.",
        "hindiSentence": "मुझे चॉकलेट आइसक्रीम पसंद है।"
      },
      {
        "id": "hg-like-2",
        "sno": 622,
        "partOfSpeech": "Preposition",
        "posCategory": "other",
        "englishMeaning": "Similar to or in the manner of",
        "hindiMeaning": "जैसा / की तरह",
        "englishSentence": "She sings like an angel.",
        "hindiSentence": "वह एक देवदूत की तरह गाती है।"
      }
    ]
  },
  {
    "id": "hg-group-273",
    "word": "Limb",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-limb-1",
        "sno": 671,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "An arm or leg of a person or animal",
        "hindiMeaning": "अंग / सदस्य",
        "englishSentence": "He injured his left limb.",
        "hindiSentence": "उसने अपने बाएं अंग को घायल किया।"
      },
      {
        "id": "hg-limb-2",
        "sno": 672,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A large branch of a tree",
        "hindiMeaning": "शाखा / बड़ी डाली",
        "englishSentence": "A bird perched on a high limb.",
        "hindiSentence": "एक पक्षी ऊँची शाखा पर बैठा था।"
      }
    ]
  },
  {
    "id": "hg-group-274",
    "word": "Lime",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-lime-1",
        "sno": 635,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A green citrus fruit",
        "hindiMeaning": "नींबू",
        "englishSentence": "She added a slice of lime to her drink.",
        "hindiSentence": "उसने अपनी ड्रिंक में नींबू का एक टुकड़ा डाला।"
      },
      {
        "id": "hg-lime-2",
        "sno": 636,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A calcium-containing chemical used in soil treatment",
        "hindiMeaning": "चूना",
        "englishSentence": "They applied lime to the fields.",
        "hindiSentence": "उन्होंने खेतों में चूना डाला।"
      }
    ]
  },
  {
    "id": "hg-group-275",
    "word": "Limp",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-limp-1",
        "sno": 637,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Lacking firmness or stiffness",
        "hindiMeaning": "ढीला / बेजान",
        "englishSentence": "The ribbon hung limp in the wind.",
        "hindiSentence": "फीता हवा में ढीला लटक रहा था।"
      },
      {
        "id": "hg-limp-2",
        "sno": 638,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To walk with difficulty, typically because of a damaged leg",
        "hindiMeaning": "लंगड़ाना",
        "englishSentence": "He limped after twisting his ankle.",
        "hindiSentence": "उसने टखना मुड़ने के बाद लंगड़ाया।"
      }
    ]
  },
  {
    "id": "hg-group-276",
    "word": "Line",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-line-1",
        "sno": 673,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A long, narrow mark or band",
        "hindiMeaning": "रेखा / लाइन",
        "englishSentence": "Draw a straight line here.",
        "hindiSentence": "यहाँ एक सीधी रेखा खींचो।"
      },
      {
        "id": "hg-line-2",
        "sno": 674,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A row or series of things",
        "hindiMeaning": "पंक्ति / कतार",
        "englishSentence": "Stand in a line, please.",
        "hindiSentence": "कृपया कतार में खड़े हों।"
      },
      {
        "id": "hg-line-3",
        "sno": 675,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To cover the inside surface",
        "hindiMeaning": "अस्तर लगाना",
        "englishSentence": "They lined the drawer with fabric.",
        "hindiSentence": "उन्होंने दराज के अंदर कपड़े की अस्तर लगाई।"
      }
    ]
  },
  {
    "id": "hg-group-277",
    "word": "Lip",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-lip-1",
        "sno": 696,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The fleshy edge of the mouth",
        "hindiMeaning": "होंठ / अधर",
        "englishSentence": "He kissed her gently on the upper lip.",
        "hindiSentence": "उसने हल्के से उसके ऊपरी होंठ पर चूमा।"
      },
      {
        "id": "hg-lip-2",
        "sno": 697,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A cheeky or impudent remark",
        "hindiMeaning": "चिढ़ाने वाली बात / गुस्ताखी",
        "englishSentence": "Don’t give me any lip!",
        "hindiSentence": "मुझे चिढ़ाने वाली कोई बात मत कहना!"
      },
      {
        "id": "hg-lip-3",
        "sno": 698,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To speak back or reply insolently",
        "hindiMeaning": "चालाकी से जवाब देना / गुस्ताखी करना",
        "englishSentence": "She lipped back when he insulted her.",
        "hindiSentence": "उसने अपमान सुनकर चालाकी से जवाब दिया।"
      }
    ]
  },
  {
    "id": "hg-group-278",
    "word": "Litter",
    "sensesCount": 4,
    "senses": [
      {
        "id": "hg-litter-1",
        "sno": 639,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "Trash scattered about",
        "hindiMeaning": "कचरा (बिखरा हुआ)",
        "englishSentence": "The park was covered in litter.",
        "hindiSentence": "पार्क कचरे से भरा हुआ था।"
      },
      {
        "id": "hg-litter-2",
        "sno": 640,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A group of young animals born at one time",
        "hindiMeaning": "संतान / बच्चे (एक झोल)",
        "englishSentence": "A litter of kittens was born yesterday.",
        "hindiSentence": "कल एक बिल्लियों का लिटर हुआ।"
      },
      {
        "id": "hg-litter-3",
        "sno": 641,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To scatter untidily",
        "hindiMeaning": "फैलाना / कूड़ा फैलाना",
        "englishSentence": "Please don’t litter the street.",
        "hindiSentence": "कृपया सड़क पर कूड़ा न फैलाएं।"
      },
      {
        "id": "hg-litter-4",
        "sno": 642,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A stretcher for carrying the injured",
        "hindiMeaning": "पालना / स्ट्रेचर / डोली",
        "englishSentence": "The injured hiker was carried out on a litter.",
        "hindiSentence": "घायल पर्वतारोही को पालने पर बाहर निकाला गया।"
      }
    ]
  },
  {
    "id": "hg-group-279",
    "word": "Live",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-live-1",
        "sno": 643,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To reside or have one’s home in a place",
        "hindiMeaning": "रहना",
        "englishSentence": "They live in Mumbai.",
        "hindiSentence": "वे मुंबई में रहते हैं।"
      },
      {
        "id": "hg-live-2",
        "sno": 644,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Alive",
        "hindiMeaning": "जीवित / सजीव",
        "englishSentence": "The fish is still live.",
        "hindiSentence": "मछली अभी भी जीवित है।"
      },
      {
        "id": "hg-live-3",
        "sno": 645,
        "partOfSpeech": "Adverb",
        "posCategory": "verb",
        "englishMeaning": "Broadcast in real time",
        "hindiMeaning": "प्रत्यक्ष रूप से / सीधा प्रसारण",
        "englishSentence": "The concert is live on TV.",
        "hindiSentence": "कॉन्सर्ट टीवी पर प्रत्यक्ष रूप से है।"
      }
    ]
  },
  {
    "id": "hg-group-280",
    "word": "Load",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-load-1",
        "sno": 623,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A quantity of something carried or borne",
        "hindiMeaning": "भार / बोझ",
        "englishSentence": "The truck carried a heavy load.",
        "hindiSentence": "ट्रक भारी भार लेकर चल रहा था।"
      },
      {
        "id": "hg-load-2",
        "sno": 624,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To put a load onto or into something",
        "hindiMeaning": "लोड करना / लादना",
        "englishSentence": "They loaded the cargo onto the ship.",
        "hindiSentence": "उन्होंने माल को जहाज पर लोड किया।"
      }
    ]
  },
  {
    "id": "hg-group-281",
    "word": "Loaf",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-loaf-1",
        "sno": 676,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A shaped mass of baked bread",
        "hindiMeaning": "रोटी का पाव / लोफ",
        "englishSentence": "She bought a loaf of wholewheat.",
        "hindiSentence": "उसने साबुत गेहूँ की एक रोटी (पाव) खरीदी।"
      },
      {
        "id": "hg-loaf-2",
        "sno": 677,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To spend time lazily",
        "hindiMeaning": "आलस्य करना / मटरगश्ती करना",
        "englishSentence": "He loafed around all weekend.",
        "hindiSentence": "वह पूरा सप्ताहांत आलस्य करता रहा।"
      }
    ]
  },
  {
    "id": "hg-group-282",
    "word": "Loan",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-loan-1",
        "sno": 646,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "Money lent that must be repaid",
        "hindiMeaning": "ऋण / कर्ज़",
        "englishSentence": "They took out a loan to buy the car.",
        "hindiSentence": "उन्होंने कार खरीदने के लिए ऋण लिया।"
      },
      {
        "id": "hg-loan-2",
        "sno": 647,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To lend something",
        "hindiMeaning": "उधार देना",
        "englishSentence": "Can you loan me some money?",
        "hindiSentence": "क्या आप मुझे कुछ पैसे उधार दे सकते हो?"
      }
    ]
  },
  {
    "id": "hg-group-283",
    "word": "Lobby",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-lobby-1",
        "sno": 678,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A large entrance hall or reception area",
        "hindiMeaning": "प्रवेश कक्ष / लॉबी",
        "englishSentence": "We waited in the hotel lobby.",
        "hindiSentence": "हम होटल के प्रवेश कक्ष में इंतज़ार कर रहे थे।"
      },
      {
        "id": "hg-lobby-2",
        "sno": 679,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To try to influence (politicians or public officials)",
        "hindiMeaning": "लॉबी करना / दबाव बनाना",
        "englishSentence": "They lobbied the council for changes.",
        "hindiSentence": "उन्होंने बदलावों के लिए परिषद पर दबाव डाला।"
      }
    ]
  },
  {
    "id": "hg-group-284",
    "word": "Lock",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-lock-1",
        "sno": 625,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A mechanism for keeping a door, lid, etc., fastened",
        "hindiMeaning": "ताला",
        "englishSentence": "Don’t forget to close the lock.",
        "hindiSentence": "ताला बंद करना न भूलें।"
      },
      {
        "id": "hg-lock-2",
        "sno": 626,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To secure with a lock",
        "hindiMeaning": "बंद करना / ताला लगाना",
        "englishSentence": "She locked the diary before going out.",
        "hindiSentence": "वह बाहर जाने से पहले डायरी बंद कर गई।"
      }
    ]
  },
  {
    "id": "hg-group-285",
    "word": "Lodge",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-lodge-1",
        "sno": 680,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A holiday cottage or club house",
        "hindiMeaning": "लॉज / कॉटेज",
        "englishSentence": "They rented a mountain lodge.",
        "hindiSentence": "उन्होंने पहाड़ में एक लॉज किराए पर ली।"
      },
      {
        "id": "hg-lodge-2",
        "sno": 681,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To formally present (e.g., a complaint or claim)",
        "hindiMeaning": "औपचारिक रूप से दर्ज कराना",
        "englishSentence": "She lodged a complaint with HR.",
        "hindiSentence": "उसने मानव संसाधन विभाग में शिकायत दर्ज कराई।"
      }
    ]
  },
  {
    "id": "hg-group-286",
    "word": "Log",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-log-1",
        "sno": 627,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A large piece of a cut or fallen tree",
        "hindiMeaning": "लट्ठ / लकड़ी का कुंदा",
        "englishSentence": "He chopped the log into firewood.",
        "hindiSentence": "उसने लट्ठ को ईंधन के लिए काटा।"
      },
      {
        "id": "hg-log-2",
        "sno": 628,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To record events, measurements, or observations",
        "hindiMeaning": "रिकॉर्ड करना / दर्ज करना",
        "englishSentence": "Pilots log flight hours daily.",
        "hindiSentence": "पायलट रोज़ उड़ान के घंटे रिकॉर्ड करते हैं।"
      }
    ]
  },
  {
    "id": "hg-group-287",
    "word": "Look",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-look-1",
        "sno": 682,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To direct one’s gaze in a specified direction",
        "hindiMeaning": "देखना",
        "englishSentence": "Look at the painting carefully.",
        "hindiSentence": "चित्र को ध्यान से देखिए।"
      },
      {
        "id": "hg-look-2",
        "sno": 683,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A fashion style or appearance",
        "hindiMeaning": "रूप-रंग / लुक",
        "englishSentence": "That’s quite a glamorous look!",
        "hindiSentence": "यह एक बहुत ही ग्लैमरस लुक है!"
      }
    ]
  },
  {
    "id": "hg-group-288",
    "word": "Loom",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-loom-1",
        "sno": 648,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A device for weaving yarn into cloth",
        "hindiMeaning": "बुनाई चक्का / करघा",
        "englishSentence": "The weaver sat at the loom.",
        "hindiSentence": "बुनकर बुनाई चक्के पर बैठा था।"
      },
      {
        "id": "hg-loom-2",
        "sno": 649,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To appear as a large, often threatening shape",
        "hindiMeaning": "प्रकट होना / मंडराना",
        "englishSentence": "Dark clouds loomed on the horizon.",
        "hindiSentence": "क्षितिज पर काले बादल प्रकट हुए।"
      }
    ]
  },
  {
    "id": "hg-group-289",
    "word": "Loose",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-loose-1",
        "sno": 650,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Not firmly or tightly fixed in place",
        "hindiMeaning": "ढीला / खुले में",
        "englishSentence": "The screw is loose.",
        "hindiSentence": "पेचकस ढीला है।"
      },
      {
        "id": "hg-loose-2",
        "sno": 651,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To release or set free",
        "hindiMeaning": "खोलना / मुक्त करना",
        "englishSentence": "They loosed the sails.",
        "hindiSentence": "उन्होंने पाल खोल दी।"
      }
    ]
  },
  {
    "id": "hg-group-290",
    "word": "Lot",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-lot-1",
        "sno": 684,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A large number or amount",
        "hindiMeaning": "बहुतायत / बहुत सारे",
        "englishSentence": "He has a lot of good friends.",
        "hindiSentence": "उसके बहुत सारे अच्छे दोस्त हैं।"
      },
      {
        "id": "hg-lot-2",
        "sno": 685,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A plot of land",
        "hindiMeaning": "जमीन का टुकड़ा / भूखंड",
        "englishSentence": "They purchased a lot next to the park.",
        "hindiSentence": "उन्होंने पार्क के बगल में जमीन का टुकड़ा खरीदा।"
      }
    ]
  },
  {
    "id": "hg-group-291",
    "word": "Love",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-love-1",
        "sno": 701,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To feel deep affection for someone or something",
        "hindiMeaning": "प्रेम करना / प्यार करना",
        "englishSentence": "I love spending time at the beach.",
        "hindiSentence": "मुझे समंदर किनारे समय बिताना पसंद है।"
      },
      {
        "id": "hg-love-2",
        "sno": 702,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A score of zero in tennis",
        "hindiMeaning": "(टेनिस में) शून्य अंक",
        "englishSentence": "She lost the game “love to 15.”",
        "hindiSentence": "वह “लव टू 15” पर हार गई।"
      }
    ]
  },
  {
    "id": "hg-group-292",
    "word": "Low",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-low-1",
        "sno": 658,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Of little height or depth",
        "hindiMeaning": "नीचा / कम",
        "englishSentence": "The ceiling is too low.",
        "hindiSentence": "छत बहुत नीची है।"
      },
      {
        "id": "hg-low-2",
        "sno": 659,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A mooing sound made by a cow",
        "hindiMeaning": "रंभाने की ध्वनि / मिमिया ध्वनि",
        "englishSentence": "The cow let out a low in the field.",
        "hindiSentence": "खेत में गाय ने रंभाने की ध्वनि निकाली।"
      },
      {
        "id": "hg-low-3",
        "sno": 660,
        "partOfSpeech": "Adverb",
        "posCategory": "verb",
        "englishMeaning": "At a reduced level, amount, or intensity",
        "hindiMeaning": "कम / धीमे",
        "englishSentence": "Keep the volume low.",
        "hindiSentence": "वॉल्यूम कम रखें।"
      }
    ]
  },
  {
    "id": "hg-group-293",
    "word": "Lower",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-lower-1",
        "sno": 699,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To let or make something descend",
        "hindiMeaning": "नीचे करना / घटाना",
        "englishSentence": "Lower the blinds to block the sun.",
        "hindiSentence": "सूरज को रोकने के लिए ब्लाइंड्स नीचे करें।"
      },
      {
        "id": "hg-lower-2",
        "sno": 700,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Situated below another part",
        "hindiMeaning": "निचला",
        "englishSentence": "The lower shelf holds the heavy boxes.",
        "hindiSentence": "निचली शेल्फ पर भारी डिब्बे रखे हैं।"
      }
    ]
  },
  {
    "id": "hg-group-294",
    "word": "Lump",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-lump-1",
        "sno": 652,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A small shapeless mass",
        "hindiMeaning": "गांठ / उभार / ढेला",
        "englishSentence": "She felt a lump in her throat.",
        "hindiSentence": "उसने अपने गले में गांठ महसूस की।"
      },
      {
        "id": "hg-lump-2",
        "sno": 653,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To group together indiscriminately",
        "hindiMeaning": "एक साथ मिलाना / एकत्र करना",
        "englishSentence": "They lumped all complaints into one file.",
        "hindiSentence": "उन्होंने सभी शिकायतों को एक ही फाइल में एकत्र किया।"
      }
    ]
  },
  {
    "id": "hg-group-295",
    "word": "Lurch",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-lurch-1",
        "sno": 686,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To make an abrupt, unsteady movement",
        "hindiMeaning": "अचानक लड़खड़ाना / अस्थिर होकर हिलना",
        "englishSentence": "The car lurched forward unexpectedly.",
        "hindiSentence": "कार अचानक अस्थिर होकर आगे बढ़ी।"
      },
      {
        "id": "hg-lurch-2",
        "sno": 687,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "An act of swaying or staggering",
        "hindiMeaning": "अचानक झटका / लड़खड़ाहट",
        "englishSentence": "He felt a lurch as the train started.",
        "hindiSentence": "ट्रेन के चलने पर उसे अचानक झटका लगा।"
      }
    ]
  },
  {
    "id": "hg-group-296",
    "word": "Lure",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-lure-1",
        "sno": 656,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "Something that tempts or entices",
        "hindiMeaning": "प्रलोभन / लोभ",
        "englishSentence": "The lure of easy money proved irresistible.",
        "hindiSentence": "आसान पैसे का लोभ असहनीय था।"
      },
      {
        "id": "hg-lure-2",
        "sno": 657,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To tempt or attract someone",
        "hindiMeaning": "आकर्षित करना / लुभाना",
        "englishSentence": "The promise of fame lured many participants.",
        "hindiSentence": "शोहरत का वादा कई प्रतिभागियों को आकर्षित कर गया।"
      }
    ]
  },
  {
    "id": "hg-group-297",
    "word": "Lust",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-lust-1",
        "sno": 654,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "Strong sexual desire",
        "hindiMeaning": "कामवासना / तीव्र लालसा",
        "englishSentence": "His lust for power was evident.",
        "hindiSentence": "सत्ता के लिए उसकी कामवासना स्पष्ट थी।"
      },
      {
        "id": "hg-lust-2",
        "sno": 655,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To have strong desire for something",
        "hindiMeaning": "लालसा करना",
        "englishSentence": "She lusted after adventure.",
        "hindiSentence": "वह रोमांच की लालसा रखती थी।"
      }
    ]
  },
  {
    "id": "hg-group-298",
    "word": "Mail",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-mail-1",
        "sno": 703,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "Armour made of interlinked metal rings (chain-mail)",
        "hindiMeaning": "जालीदार कवच / बख्तर",
        "englishSentence": "The knight wore a mail shirt into battle.",
        "hindiSentence": "योद्धा ने युद्ध में जालीदार कवच पहन रखा था।"
      },
      {
        "id": "hg-mail-2",
        "sno": 704,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To send something by post",
        "hindiMeaning": "डाक से भेजना",
        "englishSentence": "Please mail the documents today.",
        "hindiSentence": "कृपया आज ही दस्तावेज़ डाक से भेज दें।"
      }
    ]
  },
  {
    "id": "hg-group-299",
    "word": "Main",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-main-1",
        "sno": 774,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Most important; principal",
        "hindiMeaning": "मुख्य / प्रधान",
        "englishSentence": "The main road runs through town.",
        "hindiSentence": "मुख्य मार्ग शहर से होकर गुज़रता है।"
      },
      {
        "id": "hg-main-2",
        "sno": 775,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The open sea; the ocean",
        "hindiMeaning": "महासागर / खुला समुद्र",
        "englishSentence": "The sailors ventured far out on the main.",
        "hindiSentence": "नाविक महासागर पर दूर तक गए थे।"
      }
    ]
  },
  {
    "id": "hg-group-300",
    "word": "Man",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-man-1",
        "sno": 730,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "An adult male human",
        "hindiMeaning": "पुरुष / आदमी",
        "englishSentence": "He is a tall man.",
        "hindiSentence": "वह एक लंबा पुरुष है।"
      },
      {
        "id": "hg-man-2",
        "sno": 731,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To staff or operate (e.g., a station)",
        "hindiMeaning": "संचालित करना / तैनात होना",
        "englishSentence": "Please man the reception desk.",
        "hindiSentence": "कृपया रिसेप्शन डेस्क संचालित करें।"
      }
    ]
  },
  {
    "id": "hg-group-301",
    "word": "Mantle",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-mantle-1",
        "sno": 776,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A cloak or loose outer garment",
        "hindiMeaning": "आवरण / चादर / लबादा",
        "englishSentence": "He draped a mantle over his shoulders.",
        "hindiSentence": "उसने अपने कंधों पर एक आवरण ओढ़ा।"
      },
      {
        "id": "hg-mantle-2",
        "sno": 777,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The layer of the Earth between the crust and core",
        "hindiMeaning": "पृथ्वी का आवरण (मेंटल)",
        "englishSentence": "Heat from the mantle causes volcanic activity.",
        "hindiSentence": "आवरण से निकली गर्मी ज्वालामुखी गतिविधि का कारण बनती है।"
      },
      {
        "id": "hg-mantle-3",
        "sno": 778,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To cover or envelop",
        "hindiMeaning": "आवरण से ढकना",
        "englishSentence": "Lava mantles the ocean floor after eruptions.",
        "hindiSentence": "ज्वालामुखी विस्फोटों के बाद महासागर का तल लावा से ढक जाता है।"
      }
    ]
  },
  {
    "id": "hg-group-302",
    "word": "Mark",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-mark-1",
        "sno": 712,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A sign, symbol, or trace",
        "hindiMeaning": "निशान / चिह्न",
        "englishSentence": "There was a mark on the wall.",
        "hindiSentence": "दीवार पर एक निशान था।"
      },
      {
        "id": "hg-mark-2",
        "sno": 713,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To note or indicate",
        "hindiMeaning": "चिह्नित करना / निशान लगाना",
        "englishSentence": "Please mark the errors in red.",
        "hindiSentence": "कृपया गलतियों को लाल रंग से चिह्नित करें।"
      }
    ]
  },
  {
    "id": "hg-group-303",
    "word": "Mask",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-mask-1",
        "sno": 732,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A covering worn over the face",
        "hindiMeaning": "मुखावरण / मास्क",
        "englishSentence": "She put on a protective mask.",
        "hindiSentence": "उसने एक सुरक्षात्मक मुखावरण पहना।"
      },
      {
        "id": "hg-mask-2",
        "sno": 733,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To conceal or disguise",
        "hindiMeaning": "छुपाना",
        "englishSentence": "He masked his disappointment with a smile.",
        "hindiSentence": "उसने एक मुस्कान से अपनी निराशा छुपा ली।"
      }
    ]
  },
  {
    "id": "hg-group-304",
    "word": "Mass",
    "sensesCount": 4,
    "senses": [
      {
        "id": "hg-mass-1",
        "sno": 705,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A large religious service",
        "hindiMeaning": "मिस्सा / धार्मिक प्रार्थना (यज्ञ)",
        "englishSentence": "We attended Sunday Mass at the cathedral.",
        "hindiSentence": "हम कैथेड्रल में रविवार की मिस्सा में गए।"
      },
      {
        "id": "hg-mass-2",
        "sno": 706,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A large quantity or amount",
        "hindiMeaning": "बड़ी मात्रा / ढेर",
        "englishSentence": "A mass of data needs analysis.",
        "hindiSentence": "बड़ी मात्रा में डेटा का विश्लेषण करना है।"
      },
      {
        "id": "hg-mass-3",
        "sno": 707,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Relating to or affecting a large number",
        "hindiMeaning": "व्यापक / सामूहिक",
        "englishSentence": "A mass movement swept the nation.",
        "hindiSentence": "एक व्यापक आंदोलन ने राष्ट्र को झकझोरा।"
      },
      {
        "id": "hg-mass-4",
        "sno": 708,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To gather into a large group",
        "hindiMeaning": "इकट्ठा करना / एकत्र होना",
        "englishSentence": "The troops massed at the border.",
        "hindiSentence": "सैनिक सीमा पर इकट्ठे हुए।"
      }
    ]
  },
  {
    "id": "hg-group-305",
    "word": "Master",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-master-1",
        "sno": 734,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "An expert or teacher",
        "hindiMeaning": "गुरु / विशेषज्ञ",
        "englishSentence": "He is a master of chess.",
        "hindiSentence": "वह शतरंज का विशेषज्ञ है।"
      },
      {
        "id": "hg-master-2",
        "sno": 735,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Main or principal (e.g., master copy)",
        "hindiMeaning": "मुख्य / प्रधान",
        "englishSentence": "Keep the master document safe.",
        "hindiSentence": "मुख्य दस्तावेज़ सुरक्षित रखें।"
      }
    ]
  },
  {
    "id": "hg-group-306",
    "word": "Mat",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-mat-1",
        "sno": 779,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A piece of fabric or material placed on a floor or other surface",
        "hindiMeaning": "चटाई / पायदान",
        "englishSentence": "She wiped her boots on the mat.",
        "hindiSentence": "उसने अपने बूट चटाई पर पोंछे।"
      },
      {
        "id": "hg-mat-2",
        "sno": 780,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A padded platform for gymnastics, wrestling, etc. (Sports)",
        "hindiMeaning": "मैट (अखाड़ा / गद्दा)",
        "englishSentence": "The wrestlers prepared on the mat.",
        "hindiSentence": "पहलवान मैट पर तैयार हुए।"
      },
      {
        "id": "hg-mat-3",
        "sno": 781,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To tangle or clump hair or fibers",
        "hindiMeaning": "उलझाना / जटा बनना",
        "englishSentence": "If you don’t brush it, your hair will mat.",
        "hindiSentence": "अगर आप इसे कंघा नहीं करेंगे तो आपके बाल उलझ जाएंगे।"
      }
    ]
  },
  {
    "id": "hg-group-307",
    "word": "Match",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-match-1",
        "sno": 709,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A contest between opponents",
        "hindiMeaning": "मैच / मुकाबला",
        "englishSentence": "They watched the football match on TV.",
        "hindiSentence": "उन्होंने टीवी पर फुटबॉल मैच देखा।"
      },
      {
        "id": "hg-match-2",
        "sno": 710,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A stick that produces flame when struck",
        "hindiMeaning": "दियासलाई / तीली",
        "englishSentence": "He struck a match to light the candle.",
        "hindiSentence": "उसने मोमबत्ती जलाने के लिए तीली जलाई।"
      },
      {
        "id": "hg-match-3",
        "sno": 711,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To be equal or similar",
        "hindiMeaning": "मेल खाना / मिलना",
        "englishSentence": "Their skills match perfectly.",
        "hindiSentence": "उनकी क्षमताएं एकदम मेल खाती हैं।"
      }
    ]
  },
  {
    "id": "hg-group-308",
    "word": "Matter",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-matter-1",
        "sno": 736,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "Physical substance",
        "hindiMeaning": "पदार्थ / द्रव्य",
        "englishSentence": "Dark matter remains a mystery.",
        "hindiSentence": "डार्क मैटर एक रहस्य बनी हुई है।"
      },
      {
        "id": "hg-matter-2",
        "sno": 737,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To be of importance",
        "hindiMeaning": "महत्व रखना",
        "englishSentence": "It doesn’t matter to me.",
        "hindiSentence": "मेरे लिए इसका कोई महत्व नहीं है।"
      }
    ]
  },
  {
    "id": "hg-group-309",
    "word": "Mean",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-mean-1",
        "sno": 714,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To signify or intend",
        "hindiMeaning": "अर्थ होना / आशय होना",
        "englishSentence": "What does this word mean?",
        "hindiSentence": "इस शब्द का क्या अर्थ है?"
      },
      {
        "id": "hg-mean-2",
        "sno": 715,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Unkind or spiteful",
        "hindiMeaning": "कठोर / दुष्ट / दुर्भावी",
        "englishSentence": "That was a mean remark.",
        "hindiSentence": "वह एक कठोर टिप्पणी थी।"
      },
      {
        "id": "hg-mean-3",
        "sno": 716,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The average value",
        "hindiMeaning": "औसत / माध्य",
        "englishSentence": "Calculate the mean of these numbers.",
        "hindiSentence": "इन संख्याओं का औसत निकालिए।"
      }
    ]
  },
  {
    "id": "hg-group-310",
    "word": "Mess",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-mess-1",
        "sno": 767,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A dirty or untidy state",
        "hindiMeaning": "गंदगी / अव्यवस्था",
        "englishSentence": "Her room was in a mess.",
        "hindiSentence": "उसका कमरा अव्यवस्था में था।"
      },
      {
        "id": "hg-mess-2",
        "sno": 768,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A dining hall, especially in military context",
        "hindiMeaning": "खाने का हॉल / मेस",
        "englishSentence": "The soldiers ate in the mess.",
        "hindiSentence": "सैनिकों ने खाने के हॉल में खाना खाया।"
      }
    ]
  },
  {
    "id": "hg-group-311",
    "word": "Meter",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-meter-1",
        "sno": 717,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A device that measures and records quantities (e.g., gas meter)",
        "hindiMeaning": "मीटर यंत्र / मापक",
        "englishSentence": "The gas meter showed high consumption.",
        "hindiSentence": "गैस मीटर ने अधिक उपभोग दिखाया।"
      },
      {
        "id": "hg-meter-2",
        "sno": 718,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The basic rhythmic unit in poetry or music",
        "hindiMeaning": "मीटर (कविता/संगीत का छंद)",
        "englishSentence": "The poem’s meter is iambic pentameter.",
        "hindiSentence": "कविता का मीटर आइएमबिक पेंटामीटर है।"
      }
    ]
  },
  {
    "id": "hg-group-312",
    "word": "Milk",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-milk-1",
        "sno": 738,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The white liquid produced by mammals",
        "hindiMeaning": "दूध",
        "englishSentence": "She drinks milk every morning.",
        "hindiSentence": "वह हर सुबह दूध पीती है।"
      },
      {
        "id": "hg-milk-2",
        "sno": 739,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To extract (liquid or profit)",
        "hindiMeaning": "(दूध/लाभ) निकालना / निचोड़ना",
        "englishSentence": "He milked the opportunity for all it was worth.",
        "hindiSentence": "उसने अवसर का पूरा लाभ उठाया।"
      }
    ]
  },
  {
    "id": "hg-group-313",
    "word": "Mince",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-mince-1",
        "sno": 742,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "Meat chopped into very small pieces",
        "hindiMeaning": "कीमा",
        "englishSentence": "Use beef mince for the tacos.",
        "hindiSentence": "टैकोस के लिए गोमांस का कीमा प्रयोग करें।"
      },
      {
        "id": "hg-mince-2",
        "sno": 743,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To speak or walk daintily (Figurative)",
        "hindiMeaning": "नाज़ुक बोलना / संभलकर शब्द चुनना",
        "englishSentence": "He minced his words carefully.",
        "hindiSentence": "उसने सावधानी से अपने शब्द चुने।"
      }
    ]
  },
  {
    "id": "hg-group-314",
    "word": "Mind",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-mind-1",
        "sno": 740,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The seat of thought and feeling",
        "hindiMeaning": "मन / दिमाग",
        "englishSentence": "Her mind is full of ideas.",
        "hindiSentence": "उसके मन में विचार भरे हुए हैं।"
      },
      {
        "id": "hg-mind-2",
        "sno": 741,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To pay attention to; to care about",
        "hindiMeaning": "ध्यान रखना / परवाह करना",
        "englishSentence": "Mind the gap when you step off the train.",
        "hindiSentence": "ट्रेन से उतरते समय गैप पर ध्यान दें।"
      }
    ]
  },
  {
    "id": "hg-group-315",
    "word": "Mine",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-mine-1",
        "sno": 719,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A pit from which minerals or coal are extracted",
        "hindiMeaning": "खान / खदान",
        "englishSentence": "The workers entered the coal mine.",
        "hindiSentence": "मजदूर कोयला खदान में गए।"
      },
      {
        "id": "hg-mine-2",
        "sno": 720,
        "partOfSpeech": "Pronoun",
        "posCategory": "noun",
        "englishMeaning": "Belonging to me",
        "hindiMeaning": "मेरा",
        "englishSentence": "That book is mine.",
        "hindiSentence": "वह किताब मेरी है।"
      }
    ]
  },
  {
    "id": "hg-group-316",
    "word": "Mint",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-mint-1",
        "sno": 771,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "An herb with aromatic leaves",
        "hindiMeaning": "पुदीना",
        "englishSentence": "Add fresh mint to the salad.",
        "hindiSentence": "सलाद में ताज़ा पुदीना डालें।"
      },
      {
        "id": "hg-mint-2",
        "sno": 772,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A place where coins are made",
        "hindiMeaning": "टकसाल",
        "englishSentence": "The mint produces our currency.",
        "hindiSentence": "टकसाल हमारी मुद्रा बनाती है।"
      },
      {
        "id": "hg-mint-3",
        "sno": 773,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To produce coins",
        "hindiMeaning": "सिक्के ढालना",
        "englishSentence": "They minted commemorative coins.",
        "hindiSentence": "उन्होंने स्मरणीय सिक्के ढाले।"
      }
    ]
  },
  {
    "id": "hg-group-317",
    "word": "Mirror",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-mirror-1",
        "sno": 769,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A reflective surface",
        "hindiMeaning": "दर्पण / आईना",
        "englishSentence": "She checked herself in the mirror.",
        "hindiSentence": "उसने खुद को दर्पण में देखा।"
      },
      {
        "id": "hg-mirror-2",
        "sno": 770,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To reflect or give a likeness to",
        "hindiMeaning": "प्रतिबिंबित करना",
        "englishSentence": "The lake mirrored the mountains.",
        "hindiSentence": "झील ने पहाड़ों का प्रतिबिंब दिखाया।"
      }
    ]
  },
  {
    "id": "hg-group-318",
    "word": "Miss",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-miss-1",
        "sno": 744,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A failure to hit or catch",
        "hindiMeaning": "चूक",
        "englishSentence": "That was a miss by the striker.",
        "hindiSentence": "वह स्ट्राइकर की चूक थी।"
      },
      {
        "id": "hg-miss-2",
        "sno": 745,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A young girl or unmarried woman (title)",
        "hindiMeaning": "सुश्री / कुमारी",
        "englishSentence": "Miss Sharma is our class monitor.",
        "hindiSentence": "सुश्री शर्मा हमारे क्लास मॉनिटर हैं।"
      },
      {
        "id": "hg-miss-3",
        "sno": 746,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To fail to attend or notice / feel absence",
        "hindiMeaning": "न पहुँच पाना / कमी खलना",
        "englishSentence": "I’ll miss you when you leave.",
        "hindiSentence": "जब तुम जाओगे तो मुझे तुम्हारी कमी खलेगी।"
      }
    ]
  },
  {
    "id": "hg-group-319",
    "word": "Moan",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-moan-1",
        "sno": 787,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A low, prolonged sound of pain or complaint",
        "hindiMeaning": "कराह / चीख",
        "englishSentence": "He let out a moan when he stubbed his toe.",
        "hindiSentence": "उसने अपनी उँगली ठोकर मारने पर कराह निकाली।"
      },
      {
        "id": "hg-moan-2",
        "sno": 788,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To complain or grumble",
        "hindiMeaning": "शिकायत करना / कुड़कुड़ाना",
        "englishSentence": "She moaned that the work was too hard.",
        "hindiSentence": "उसने शिकायत की कि काम बहुत कठिन है।"
      }
    ]
  },
  {
    "id": "hg-group-320",
    "word": "Mob",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-mob-1",
        "sno": 721,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A large disorderly crowd",
        "hindiMeaning": "भीड़ / उग्र भीड़",
        "englishSentence": "A mob gathered outside the courthouse.",
        "hindiSentence": "न्यायालय के बाहर एक भीड़ इकट्ठा हो गई।"
      },
      {
        "id": "hg-mob-2",
        "sno": 722,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To surround and harass",
        "hindiMeaning": "घेरे में लेना / परेशान करना",
        "englishSentence": "Reporters mobbed the celebrity.",
        "hindiSentence": "रिपोर्टर्स ने सेलिब्रिटी को घेरे में लिया।"
      }
    ]
  },
  {
    "id": "hg-group-321",
    "word": "Mobile",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-mobile-1",
        "sno": 747,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Able to move freely or easily",
        "hindiMeaning": "गतिशील / चलायमान",
        "englishSentence": "Monkeys are very mobile in trees.",
        "hindiSentence": "बंदर पेड़ों पर बहुत गतिशील होते हैं।"
      },
      {
        "id": "hg-mobile-2",
        "sno": 748,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A mobile phone",
        "hindiMeaning": "मोबाइल फोन",
        "englishSentence": "He called me on his mobile.",
        "hindiSentence": "उसने मुझे अपने मोबाइल से कॉल किया।"
      }
    ]
  },
  {
    "id": "hg-group-322",
    "word": "Mock",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-mock-1",
        "sno": 760,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Not authentic or real; imitation",
        "hindiMeaning": "नकली / कृत्रिम",
        "englishSentence": "They held a mock election.",
        "hindiSentence": "उन्होंने नकली चुनाव कराया।"
      },
      {
        "id": "hg-mock-2",
        "sno": 761,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A practice test or trial assessment",
        "hindiMeaning": "अभ्यास परीक्षा / मॉक टेस्ट",
        "englishSentence": "We took a mock before the final exam.",
        "hindiSentence": "हमने अंतिम परीक्षा से पहले अभ्यास परीक्षा दी।"
      },
      {
        "id": "hg-mock-3",
        "sno": 762,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To ridicule or make fun of",
        "hindiMeaning": "उपहास करना / मज़ाक उड़ाना",
        "englishSentence": "The others mocked his accent.",
        "hindiSentence": "दूसरों ने उसकी बोली का उपहास किया।"
      }
    ]
  },
  {
    "id": "hg-group-323",
    "word": "Mode",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-mode-1",
        "sno": 782,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A way or manner of doing something; a fashion",
        "hindiMeaning": "तरीका / ढंग / मोड",
        "englishSentence": "Please switch your phone to silent mode.",
        "hindiSentence": "कृपया अपना फ़ोन साइलेंट मोड में रखो।"
      },
      {
        "id": "hg-mode-2",
        "sno": 783,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The value that appears most frequently in a data set (Statistics)",
        "hindiMeaning": "बहुलक",
        "englishSentence": "The mode of these test scores is 78.",
        "hindiSentence": "इन परीक्षण अंकों का बहुलक 78 है।"
      }
    ]
  },
  {
    "id": "hg-group-324",
    "word": "Model",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-model-1",
        "sno": 723,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A representation or example for imitation",
        "hindiMeaning": "नमूना / प्रतिरूप",
        "englishSentence": "The architect built a scale model of the building.",
        "hindiSentence": "वास्तुविद ने इमारत का पैमाना नमूना बनाया।"
      },
      {
        "id": "hg-model-2",
        "sno": 724,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To shape or fashion",
        "hindiMeaning": "आकार देना / ढालना",
        "englishSentence": "She modeled the clay into a vase.",
        "hindiSentence": "उसने मिट्टी को फूलदान का आकार दिया।"
      }
    ]
  },
  {
    "id": "hg-group-325",
    "word": "Mold",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-mold-1",
        "sno": 749,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A hollow container for giving shape to molten material",
        "hindiMeaning": "साँचा",
        "englishSentence": "They poured the metal into the mold.",
        "hindiSentence": "उन्होंने धातु को साँचे में डाला।"
      },
      {
        "id": "hg-mold-2",
        "sno": 750,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A fungus that grows in damp conditions",
        "hindiMeaning": "फफूंदी",
        "englishSentence": "There’s mold on the bathroom wall.",
        "hindiSentence": "बाथरूम की दीवार पर फफूंदी है।"
      },
      {
        "id": "hg-mold-3",
        "sno": 751,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To shape or form",
        "hindiMeaning": "आकार देना / ढालना",
        "englishSentence": "The artist molded the clay into a vase.",
        "hindiSentence": "कलाकार ने मिट्टी को फूलदान का आकार दिया।"
      }
    ]
  },
  {
    "id": "hg-group-326",
    "word": "Mole",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-mole-1",
        "sno": 725,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A small burrowing mammal",
        "hindiMeaning": "गिलहरी जैसा कीट / छछूंदर",
        "englishSentence": "The mole created tunnels in the garden.",
        "hindiSentence": "छछूंदर बगीचे में सुरंगें बनाता है।"
      },
      {
        "id": "hg-mole-2",
        "sno": 726,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A spy who infiltrates an organization",
        "hindiMeaning": "जासूस / भेदिया",
        "englishSentence": "He was exposed as a mole in the agency.",
        "hindiSentence": "एजेंसी में वह जासूस के रूप में उजागर हुआ।"
      }
    ]
  },
  {
    "id": "hg-group-327",
    "word": "Moor",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-moor-1",
        "sno": 758,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "An expanse of open, rolling infertile land",
        "hindiMeaning": "दलदली भूमि / बंजर भूमि",
        "englishSentence": "We hiked across the moor at dawn.",
        "hindiSentence": "हम सुबह दलदली भूमि पर गए।"
      },
      {
        "id": "hg-moor-2",
        "sno": 759,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To secure (a boat) by attaching it",
        "hindiMeaning": "बाँधना / लंगर डालना",
        "englishSentence": "They moored the boat at the quay.",
        "hindiSentence": "उन्होंने नाव को घाट पर बाँधा।"
      }
    ]
  },
  {
    "id": "hg-group-328",
    "word": "Moot",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-moot-1",
        "sno": 784,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Subject to debate or no longer important",
        "hindiMeaning": "विवादास्पद / अर्थहीन",
        "englishSentence": "That point is now moot.",
        "hindiSentence": "वह मुद्दा अब विवादास्पद हो गया है।"
      },
      {
        "id": "hg-moot-2",
        "sno": 785,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A hypothetical case argued as an exercise",
        "hindiMeaning": "वाद-विवाद अभ्यास (मूट कोर्ट)",
        "englishSentence": "Law students participated in a moot.",
        "hindiSentence": "विधि छात्रों ने वाद-विवाद अभ्यास में भाग लिया।"
      },
      {
        "id": "hg-moot-3",
        "sno": 786,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To raise (a question or topic) for discussion",
        "hindiMeaning": "प्रस्तावित करना / चर्चा के लिए उठाना",
        "englishSentence": "She mooted the idea of a citywide recycling program.",
        "hindiSentence": "उसने पूरे शहर में रीसाइक्लिंग कार्यक्रम की अवधारणा प्रस्तावित की।"
      }
    ]
  },
  {
    "id": "hg-group-329",
    "word": "Mount",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-mount-1",
        "sno": 752,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A horse or other animal for riding",
        "hindiMeaning": "सवारियाँ / सवारी का घोड़ा",
        "englishSentence": "He cleaned his mount before the race.",
        "hindiSentence": "उसने दौड़ से पहले अपनी सवारी साफ की।"
      },
      {
        "id": "hg-mount-2",
        "sno": 753,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To climb or get up on",
        "hindiMeaning": "चढ़ना / आरूढ़ होना",
        "englishSentence": "She mounted the platform to speak.",
        "hindiSentence": "वह बोलने के लिए मंच पर चढ़ी।"
      },
      {
        "id": "hg-mount-3",
        "sno": 754,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To organize or initiate",
        "hindiMeaning": "आयोजित करना / शुरू करना",
        "englishSentence": "They mounted a major campaign.",
        "hindiSentence": "उन्होंने एक बड़ा अभियान आयोजित किया।"
      }
    ]
  },
  {
    "id": "hg-group-330",
    "word": "Move",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-move-1",
        "sno": 755,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To change position or go from one place to another",
        "hindiMeaning": "हिलना / स्थान बदलना",
        "englishSentence": "They moved to a new house.",
        "hindiSentence": "वे एक नए घर में चले गए।"
      },
      {
        "id": "hg-move-2",
        "sno": 756,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "An action or step, especially in chess or a game",
        "hindiMeaning": "चाल / कदम",
        "englishSentence": "That was a clever move!",
        "hindiSentence": "वह चाल बहुत होशियार थी!"
      },
      {
        "id": "hg-move-3",
        "sno": 757,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To cause someone to feel strong emotion (Emotional)",
        "hindiMeaning": "प्रभावित करना / भावुक करना",
        "englishSentence": "The speech moved the audience to tears.",
        "hindiSentence": "भाषण ने दर्शकों को आंसू ला दिए।"
      }
    ]
  },
  {
    "id": "hg-group-331",
    "word": "Mug",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-mug-1",
        "sno": 727,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A large cup with a handle",
        "hindiMeaning": "प्याला / मग",
        "englishSentence": "He drank coffee from a mug.",
        "hindiSentence": "उसने एक प्याले से कॉफ़ी पी।"
      },
      {
        "id": "hg-mug-2",
        "sno": 728,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A person’s face (informal/slang)",
        "hindiMeaning": "चेहरा / थोबड़ा",
        "englishSentence": "I couldn’t recognize him by his mug.",
        "hindiSentence": "मैं उसे उसके चेहरे से पहचान नहीं पाया।"
      },
      {
        "id": "hg-mug-3",
        "sno": 729,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To assault and rob someone in a public place",
        "hindiMeaning": "लूटपाट करना",
        "englishSentence": "She was mugged on her way home.",
        "hindiSentence": "उसे घर जाते समय लूट लिया गया।"
      }
    ]
  },
  {
    "id": "hg-group-332",
    "word": "Mull",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-mull-1",
        "sno": 789,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To think about carefully; to ponder",
        "hindiMeaning": "विचार करना / मनन करना",
        "englishSentence": "He mulled over the decision for days.",
        "hindiSentence": "उसने निर्णय पर कई दिन विचार किया।"
      },
      {
        "id": "hg-mull-2",
        "sno": 790,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A warm spiced wine or cider (Culinary)",
        "hindiMeaning": "मसालेदार शराब / गरम पेय",
        "englishSentence": "On cold nights they drank hot mull.",
        "hindiSentence": "ठंडी रातों में वे गरम मसालेदार शराब पीते थे।"
      }
    ]
  },
  {
    "id": "hg-group-333",
    "word": "Mummy",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-mummy-1",
        "sno": 791,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A preserved corpse, especially of an ancient Egyptian",
        "hindiMeaning": "ममी (संरक्षित शव)",
        "englishSentence": "The museum displayed a pharaoh’s mummy.",
        "hindiSentence": "म्यूज़ियम में एक फ़राओ के ममी को प्रदर्शित किया गया।"
      },
      {
        "id": "hg-mummy-2",
        "sno": 792,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "Mother (child’s pronunciation, informal)",
        "hindiMeaning": "मम्मी / माँ",
        "englishSentence": "“Mummy, can I have some juice?” she asked.",
        "hindiSentence": "“मम्मी, क्या मुझे थोड़ा जूस मिल सकता है?” उसने पूछा।"
      }
    ]
  },
  {
    "id": "hg-group-334",
    "word": "Muse",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-muse-1",
        "sno": 763,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A source of inspiration, especially a goddess or artistic figure",
        "hindiMeaning": "प्रेरणा स्रोत",
        "englishSentence": "The poet’s muse was the beauty of nature.",
        "hindiSentence": "कवि की प्रेरणा स्रोत प्रकृति की सुंदरता थी।"
      },
      {
        "id": "hg-muse-2",
        "sno": 764,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To think about something carefully and for a long time",
        "hindiMeaning": "चिन्तन करना / गहराई से सोचना",
        "englishSentence": "She mused on the question all night.",
        "hindiSentence": "उसने सारी रात उस प्रश्न पर चिन्तन किया।"
      }
    ]
  },
  {
    "id": "hg-group-335",
    "word": "Must",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-must-1",
        "sno": 765,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To be required or have to (Modal)",
        "hindiMeaning": "ज़रूरी होना / अवश्य करना",
        "englishSentence": "You must finish your homework.",
        "hindiSentence": "तुम्हें अपना होमवर्क पूरा करना होगा।"
      },
      {
        "id": "hg-must-2",
        "sno": 766,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The solid residue of grapes, olives, etc., used in winemaking",
        "hindiMeaning": "किण्वित अंगूर का गूदा (मस्ट) / जाँघ",
        "englishSentence": "The winemaker added yeast to the must.",
        "hindiSentence": "वाइनमेकर ने जाँघ में खमीर मिलाया।"
      }
    ]
  },
  {
    "id": "hg-group-336",
    "word": "Muzzle",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-muzzle-1",
        "sno": 793,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The projecting part of an animal’s head (nose and mouth)",
        "hindiMeaning": "नाक/मुँह का हिस्सा / थूथन",
        "englishSentence": "The dog’s muzzle was covered in snow.",
        "hindiSentence": "कुत्ते का नाक-मुँह बर्फ़ से ढका हुआ था।"
      },
      {
        "id": "hg-muzzle-2",
        "sno": 794,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A guard placed over an animal’s mouth to prevent biting",
        "hindiMeaning": "मक़ाना / मँहछींका",
        "englishSentence": "Fit the muzzle on the horse before approaching.",
        "hindiSentence": "पास आने से पहले घोड़े की मक़ाना लगाओ।"
      },
      {
        "id": "hg-muzzle-3",
        "sno": 795,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To silence or prevent from speaking",
        "hindiMeaning": "बोलने से रोकना / चुप कराना",
        "englishSentence": "The law muzzled the critical press.",
        "hindiSentence": "कानून ने आलोचनात्मक प्रेस को चुप करा दिया।"
      }
    ]
  },
  {
    "id": "hg-group-337",
    "word": "Nab",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-nab-1",
        "sno": 796,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To catch or seize suddenly",
        "hindiMeaning": "पकड़ना / ज़ब्त करना / दबोचना",
        "englishSentence": "The police nabbed the suspect as he fled.",
        "hindiSentence": "पुलिस ने भागने वाले संदिग्ध को पकड़ लिया।"
      },
      {
        "id": "hg-nab-2",
        "sno": 797,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A person who steals or is caught (Slang)",
        "hindiMeaning": "चोर / बंदी",
        "englishSentence": "He’s known as a skilled nab in the underworld.",
        "hindiSentence": "वह अंडरवर्ल्ड में एक निपुण चोर के रूप में जाना जाता है।"
      }
    ]
  },
  {
    "id": "hg-group-338",
    "word": "Naught",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-naught-1",
        "sno": 830,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "Nothing; zero",
        "hindiMeaning": "शून्य / कुछ नहीं",
        "englishSentence": "All his efforts came to naught.",
        "hindiSentence": "उसकी सभी कोशिशें शून्य हो गईं।"
      },
      {
        "id": "hg-naught-2",
        "sno": 831,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Worthless; of no value",
        "hindiMeaning": "बेकार / व्यर्थ",
        "englishSentence": "His excuses were naught.",
        "hindiSentence": "उसके बहाने बेकार थे।"
      }
    ]
  },
  {
    "id": "hg-group-339",
    "word": "Navel",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-navel-1",
        "sno": 818,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A person’s belly button",
        "hindiMeaning": "नाभि",
        "englishSentence": "His navel was pierced.",
        "hindiSentence": "उसकी नाभि छिदी हुई थी।"
      },
      {
        "id": "hg-navel-2",
        "sno": 819,
        "partOfSpeech": "Noun (Geology)",
        "posCategory": "noun",
        "englishMeaning": "A central point or nucleus",
        "hindiMeaning": "केंद्र बिंदु",
        "englishSentence": "The city is the navel of the region.",
        "hindiSentence": "शहर इस क्षेत्र का केंद्र बिंदु है।"
      }
    ]
  },
  {
    "id": "hg-group-340",
    "word": "Near",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-near-1",
        "sno": 798,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "At a short distance in space or time",
        "hindiMeaning": "पास / निकट",
        "englishSentence": "The grocery store is near my house.",
        "hindiSentence": "किराने की दुकान मेरे घर के पास है।"
      },
      {
        "id": "hg-near-2",
        "sno": 799,
        "partOfSpeech": "Adverb",
        "posCategory": "verb",
        "englishMeaning": "Almost; nearly",
        "hindiMeaning": "लगभग / करीब-करीब",
        "englishSentence": "He’s near finishing the project.",
        "hindiSentence": "वह लगभग परियोजना पूरा करने ही वाला है।"
      }
    ]
  },
  {
    "id": "hg-group-341",
    "word": "Neat",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-neat-1",
        "sno": 810,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Tidy and well arranged",
        "hindiMeaning": "साफ-सुथरा",
        "englishSentence": "Keep your desk neat.",
        "hindiSentence": "अपनी मेज़ साफ-सुथरी रखें।"
      },
      {
        "id": "hg-neat-2",
        "sno": 811,
        "partOfSpeech": "Adverb",
        "posCategory": "verb",
        "englishMeaning": "(of a drink) without any mixer",
        "hindiMeaning": "सीधे / बिना मिलावट",
        "englishSentence": "He prefers whiskey neat.",
        "hindiSentence": "वह बिना मिलावट व्हिस्की पसंद करता है।"
      }
    ]
  },
  {
    "id": "hg-group-342",
    "word": "Needle",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-needle-1",
        "sno": 822,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A slender, pointed implement for sewing",
        "hindiMeaning": "सिलाई की सुई",
        "englishSentence": "Thread the needle carefully.",
        "hindiSentence": "सुई में ध्यान से धागा डालें।"
      },
      {
        "id": "hg-needle-2",
        "sno": 823,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To tease or provoke someone (informal)",
        "hindiMeaning": "चिढ़ाना / उकसाना",
        "englishSentence": "He needled his brother about his new haircut.",
        "hindiSentence": "वह अपने भाई को नए हेयरकट के लिए चिढ़ा रहा था।"
      }
    ]
  },
  {
    "id": "hg-group-343",
    "word": "Nerve",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-nerve-1",
        "sno": 812,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A bundle of fibers transmitting impulses",
        "hindiMeaning": "तंत्रिका / नस",
        "englishSentence": "He damaged a nerve in his hand.",
        "hindiSentence": "उसने अपने हाथ में एक तंत्रिका को चोट पहुँचाई।"
      },
      {
        "id": "hg-nerve-2",
        "sno": 813,
        "partOfSpeech": "Noun (Figurative)",
        "posCategory": "noun",
        "englishMeaning": "Courage or boldness",
        "hindiMeaning": "साहस / हिम्मत",
        "englishSentence": "It took nerve to stand up and speak.",
        "hindiSentence": "बोलने के लिए हिम्मत चाहिए थी।"
      }
    ]
  },
  {
    "id": "hg-group-344",
    "word": "Nest",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-nest-1",
        "sno": 800,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A structure built by birds or other animals to hold eggs or young",
        "hindiMeaning": "घोंसला",
        "englishSentence": "The robin built its nest in the tree.",
        "hindiSentence": "रॉबिन ने पेड़ में अपना घोंसला बनाया।"
      },
      {
        "id": "hg-nest-2",
        "sno": 801,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To settle or arrange oneself comfortably",
        "hindiMeaning": "आराम से जगह बनाना / व्यवस्थित करना",
        "englishSentence": "They nested the chairs for the ceremony.",
        "hindiSentence": "उन्होंने समारोह के लिए कुर्सियों को आराम से रखा।"
      }
    ]
  },
  {
    "id": "hg-group-345",
    "word": "Nestle",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-nestle-1",
        "sno": 820,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To settle or lie comfortably within or against something",
        "hindiMeaning": "आराम से स्थित होना",
        "englishSentence": "The cabin nestles in the valley.",
        "hindiSentence": "केबिन घाटी में आराम से स्थित है।"
      },
      {
        "id": "hg-nestle-2",
        "sno": 821,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To cuddle or snuggle",
        "hindiMeaning": "गले लगाना / सिमटना",
        "englishSentence": "The child nestles against her mother.",
        "hindiSentence": "बच्चा अपनी माँ के गले में सिमट गया।"
      }
    ]
  },
  {
    "id": "hg-group-346",
    "word": "Net",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-net-1",
        "sno": 839,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A mesh fabric used for catching or filtering",
        "hindiMeaning": "जाल",
        "englishSentence": "Cast the net into the water.",
        "hindiSentence": "जाल को पानी में फेंको।"
      },
      {
        "id": "hg-net-2",
        "sno": 840,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "Income remaining after deductions (net profit)",
        "hindiMeaning": "शुद्ध आय",
        "englishSentence": "Their net last year was ₹2 lakhs.",
        "hindiSentence": "उनकी पिछले साल की शुद्ध आय ₹2 लाख थी।"
      }
    ]
  },
  {
    "id": "hg-group-347",
    "word": "Nettle",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-nettle-1",
        "sno": 835,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A stinging plant of the genus Urtica",
        "hindiMeaning": "बिच्छू पौधा / कंडाली",
        "englishSentence": "He brushed against a patch of nettles.",
        "hindiSentence": "वह बिच्छू पौधों के पास से गुजर गया।"
      },
      {
        "id": "hg-nettle-2",
        "sno": 836,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To irritate or provoke",
        "hindiMeaning": "चिढ़ाना / परेशान करना",
        "englishSentence": "His careless remarks nettled her deeply.",
        "hindiSentence": "उसकी लापरवाही वाली टिप्पणियों ने उसे गहराई से चिढ़ाया।"
      }
    ]
  },
  {
    "id": "hg-group-348",
    "word": "Nib",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-nib-1",
        "sno": 816,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The pointed end of a pen",
        "hindiMeaning": "कलम का निब",
        "englishSentence": "The fountain pen’s nib was gold-plated.",
        "hindiSentence": "फाउंटेन पेन का निब स्वर्ण-परत वाला था।"
      },
      {
        "id": "hg-nib-2",
        "sno": 817,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To cut or shape into a nib",
        "hindiMeaning": "निब बनाना / नोक तराशना",
        "englishSentence": "He nibbed the wood to form a join.",
        "hindiSentence": "उसने जोड़ बनाने के लिए लकड़ी पर निब बनाया।"
      }
    ]
  },
  {
    "id": "hg-group-349",
    "word": "Niche",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-niche-1",
        "sno": 824,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A shallow recess in a wall, typically for a statue",
        "hindiMeaning": "दीवार की कोठरी / आला",
        "englishSentence": "A statue stood in the garden’s stone niche.",
        "hindiSentence": "बगीचे की पत्थर की कोठरी में एक मूर्ति खड़ी थी।"
      },
      {
        "id": "hg-niche-2",
        "sno": 825,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A comfortable or suitable position in life or work",
        "hindiMeaning": "अनुकूल स्थान / उपयुक्त क्षेत्र",
        "englishSentence": "She found her niche in teaching foreign languages.",
        "hindiSentence": "उसे विदेशी भाषाएं सिखाने में अनुकूल स्थान मिला।"
      }
    ]
  },
  {
    "id": "hg-group-350",
    "word": "Nick",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-nick-1",
        "sno": 802,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A small cut or notch",
        "hindiMeaning": "चीरा / निशान",
        "englishSentence": "There’s a nick in the blade.",
        "hindiSentence": "ब्लेड में एक निशान है।"
      },
      {
        "id": "hg-nick-2",
        "sno": 803,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To pinch or steal / tease",
        "hindiMeaning": "चुराना / चिढ़ाना",
        "englishSentence": "Someone nicked my wallet on the train.",
        "hindiSentence": "किसी ने ट्रेन में मेरा वॉलेट चुरा लिया।"
      }
    ]
  },
  {
    "id": "hg-group-351",
    "word": "Nickel",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-nickel-1",
        "sno": 814,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A silvery-white metal",
        "hindiMeaning": "निकल (धातु)",
        "englishSentence": "The statue is made of pure nickel.",
        "hindiSentence": "मूर्ति शुद्ध निकल की बनी है।"
      },
      {
        "id": "hg-nickel-2",
        "sno": 815,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To coat with a thin layer of nickel",
        "hindiMeaning": "निकल की परत चढ़ाना",
        "englishSentence": "They nickeled the car rims for shine.",
        "hindiSentence": "उन्होंने रिम्स को चमक के लिए निकल की परत से ढका।"
      }
    ]
  },
  {
    "id": "hg-group-352",
    "word": "Nil",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-nil-1",
        "sno": 826,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The number zero; nothing at all",
        "hindiMeaning": "शून्य",
        "englishSentence": "The score remained at two-all, two-nil.",
        "hindiSentence": "स्कोर दो-दो, दो-शून्य पर स्थिर रहा।"
      },
      {
        "id": "hg-nil-2",
        "sno": 827,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Having no legal or binding force (archaic usage)",
        "hindiMeaning": "अमान्य / शून्य",
        "englishSentence": "The contract was declared nil by the court.",
        "hindiSentence": "न्यायालय द्वारा अनुबंध को अमान्य घोषित किया गया।"
      }
    ]
  },
  {
    "id": "hg-group-353",
    "word": "None",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-none-1",
        "sno": 844,
        "partOfSpeech": "Pronoun",
        "posCategory": "noun",
        "englishMeaning": "Not any; no part or share",
        "hindiMeaning": "कोई नहीं",
        "englishSentence": "None of the answers were correct.",
        "hindiSentence": "उत्तरों में से कोई भी सही नहीं था।"
      },
      {
        "id": "hg-none-2",
        "sno": 845,
        "partOfSpeech": "Adverb",
        "posCategory": "verb",
        "englishMeaning": "By no means",
        "hindiMeaning": "बिल्कुल नहीं",
        "englishSentence": "I can none agree with that view.",
        "hindiSentence": "मैं उस दृष्टिकोण से बिल्कुल सहमत नहीं हूँ।"
      }
    ]
  },
  {
    "id": "hg-group-354",
    "word": "Nook",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-nook-1",
        "sno": 837,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A corner or recess, especially one offering seclusion",
        "hindiMeaning": "कोना / नुक्कड़",
        "englishSentence": "She read her book in a cozy nook by the window.",
        "hindiSentence": "उसने खिड़की के पास एक आरामदायक नुक्कड़ में किताब पढ़ी।"
      },
      {
        "id": "hg-nook-2",
        "sno": 838,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "Barnes & Noble’s e-reading device",
        "hindiMeaning": "नूक (ई-रीडर)",
        "englishSentence": "He bought a Nook to carry his library everywhere.",
        "hindiSentence": "उसने अपनी पुस्तकालय साथ ले जाने के लिए नूक खरीदा।"
      }
    ]
  },
  {
    "id": "hg-group-355",
    "word": "Note",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-note-1",
        "sno": 841,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A brief record or written remark",
        "hindiMeaning": "नोट / संक्षिप्त टिप्पणी",
        "englishSentence": "I made a note of the appointment time.",
        "hindiSentence": "मैंने अपॉइंटमेंट के समय का नोट बनाया।"
      },
      {
        "id": "hg-note-2",
        "sno": 842,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A musical tone or pitch",
        "hindiMeaning": "स्वर / सुर",
        "englishSentence": "She held the final note perfectly.",
        "hindiSentence": "उसने अंतिम स्वर को पूरी तरह से पकड़ा।"
      },
      {
        "id": "hg-note-3",
        "sno": 843,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To notice or pay attention to",
        "hindiMeaning": "ध्यान देना / गौर करना",
        "englishSentence": "Please note the change in schedule.",
        "hindiSentence": "कृपया कार्यक्रम में बदलाव पर ध्यान दें।"
      }
    ]
  },
  {
    "id": "hg-group-356",
    "word": "Notice",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-notice-1",
        "sno": 832,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A written or printed announcement",
        "hindiMeaning": "सूचना / घोषणा",
        "englishSentence": "There was a notice on the door about the meeting.",
        "hindiSentence": "बैठक के बारे में दरवाज़े पर सूचना लगी थी।"
      },
      {
        "id": "hg-notice-2",
        "sno": 833,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "Attention taken to something",
        "hindiMeaning": "ध्यान / गौर",
        "englishSentence": "She paid no notice to the noise.",
        "hindiSentence": "उसने शोर पर कोई ध्यान नहीं दिया।"
      },
      {
        "id": "hg-notice-3",
        "sno": 834,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To become aware of; to observe",
        "hindiMeaning": "पहचानना / देखना / गौर करना",
        "englishSentence": "Did you notice the typo in the report?",
        "hindiSentence": "क्या आपने रिपोर्ट में त्रुटि देखी?"
      }
    ]
  },
  {
    "id": "hg-group-357",
    "word": "Novel",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-novel-1",
        "sno": 828,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A long fictional narrative",
        "hindiMeaning": "उपन्यास",
        "englishSentence": "She’s reading a mystery novel.",
        "hindiSentence": "वह एक रहस्य उपन्यास पढ़ रही है।"
      },
      {
        "id": "hg-novel-2",
        "sno": 829,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "New or unusual in an interesting way",
        "hindiMeaning": "नया / अनोखा",
        "englishSentence": "They developed a novel approach to solve the problem.",
        "hindiSentence": "उन्होंने समस्या हल करने के लिए एक अनोखी विधि विकसित की।"
      }
    ]
  },
  {
    "id": "hg-group-358",
    "word": "Number",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-number-1",
        "sno": 808,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A quantity or count",
        "hindiMeaning": "संख्या",
        "englishSentence": "What is the number of participants?",
        "hindiSentence": "प्रतिभागियों की संख्या क्या है?"
      },
      {
        "id": "hg-number-2",
        "sno": 809,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "More numb",
        "hindiMeaning": "अधिक सुन्न",
        "englishSentence": "His hand felt number after the injection.",
        "hindiSentence": "इंजेक्शन के बाद उसका हाथ और सुन्न हो गया।"
      }
    ]
  },
  {
    "id": "hg-group-359",
    "word": "Nurse",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-nurse-1",
        "sno": 804,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A person trained to care for the sick or infirm",
        "hindiMeaning": "नर्स / परिचारिका",
        "englishSentence": "The nurse checked his temperature.",
        "hindiSentence": "नर्स ने उसका तापमान मापा।"
      },
      {
        "id": "hg-nurse-2",
        "sno": 805,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To care for or tend",
        "hindiMeaning": "देखभाल करना / सेवा करना",
        "englishSentence": "She nursed him back to health.",
        "hindiSentence": "उसने उनकी देखभाल करके उन्हें स्वस्थ किया।"
      }
    ]
  },
  {
    "id": "hg-group-360",
    "word": "Nut",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-nut-1",
        "sno": 806,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A hard-shelled seed",
        "hindiMeaning": "अखरोट / बीज / काष्ठफल",
        "englishSentence": "He cracked the nut with a hammer.",
        "hindiSentence": "उसने हथौड़े से अखरोट फोड़ा।"
      },
      {
        "id": "hg-nut-2",
        "sno": 807,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A person who is very enthusiastic about something (Slang)",
        "hindiMeaning": "दीवाना / जुनूनी",
        "englishSentence": "He’s a real baseball nut.",
        "hindiSentence": "वह बेसबॉल का असली दीवाना है।"
      }
    ]
  },
  {
    "id": "hg-group-361",
    "word": "Oath",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-oath-1",
        "sno": 864,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A solemn promise",
        "hindiMeaning": "कसम / शपथ",
        "englishSentence": "He took an oath to serve his country.",
        "hindiSentence": "उसने देश की सेवा करने की शपथ ली।"
      },
      {
        "id": "hg-oath-2",
        "sno": 865,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A curse or profane word",
        "hindiMeaning": "गाली / अपशब्द",
        "englishSentence": "The outburst included several oaths.",
        "hindiSentence": "चिल्लाने में कई गालियाँ शामिल थीं।"
      }
    ]
  },
  {
    "id": "hg-group-362",
    "word": "Object",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-object-1",
        "sno": 848,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A thing that can be seen or touched",
        "hindiMeaning": "वस्तु / चीज़",
        "englishSentence": "Pick up any object you find.",
        "hindiSentence": "जो भी वस्तु मिले, उसे उठा लें।"
      },
      {
        "id": "hg-object-2",
        "sno": 849,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To express disapproval",
        "hindiMeaning": "आपत्ति करना / विरोध करना",
        "englishSentence": "They objected to the new rule.",
        "hindiSentence": "उन्होंने नए नियम पर आपत्ति जताई।"
      }
    ]
  },
  {
    "id": "hg-group-363",
    "word": "Oblige",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-oblige-1",
        "sno": 850,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To do someone a favor or service",
        "hindiMeaning": "एहसान करना / अनुग्रहित करना",
        "englishSentence": "Could you oblige me with a glass of water?",
        "hindiSentence": "क्या आप मुझे एक गिलास पानी दे सकते हैं?"
      },
      {
        "id": "hg-oblige-2",
        "sno": 851,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To make (someone) legally or morally bound",
        "hindiMeaning": "बाध्य करना",
        "englishSentence": "The contract obliges you to pay on time.",
        "hindiSentence": "अनुबंध आपको समय पर भुगतान के लिए बाध्य करता है।"
      }
    ]
  },
  {
    "id": "hg-group-364",
    "word": "Occasion",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-occasion-1",
        "sno": 846,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A particular time or instance",
        "hindiMeaning": "अवसर / मौका",
        "englishSentence": "We’ll meet on that occasion.",
        "hindiSentence": "हम उस अवसर पर मिलेंगे।"
      },
      {
        "id": "hg-occasion-2",
        "sno": 847,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To cause or bring about",
        "hindiMeaning": "कारण बनना / उत्पन्न करना",
        "englishSentence": "The storm occasioned widespread damage.",
        "hindiSentence": "तूफान ने व्यापक तबाही मचाई।"
      }
    ]
  },
  {
    "id": "hg-group-365",
    "word": "Occur",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-occur-1",
        "sno": 870,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To happen or take place",
        "hindiMeaning": "होना / घटित होना",
        "englishSentence": "The earthquake occurred at midnight.",
        "hindiSentence": "भूकंप आधी रात को हुआ।"
      },
      {
        "id": "hg-occur-2",
        "sno": 871,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To come to mind; be perceived",
        "hindiMeaning": "याद आना / विचार में आना",
        "englishSentence": "An idea occurred to her while she was driving.",
        "hindiSentence": "ड्राइव करते समय उसे एक विचार आया।"
      }
    ]
  },
  {
    "id": "hg-group-366",
    "word": "Off",
    "sensesCount": 4,
    "senses": [
      {
        "id": "hg-off-1",
        "sno": 866,
        "partOfSpeech": "Adverb",
        "posCategory": "verb",
        "englishMeaning": "Away from a place or position",
        "hindiMeaning": "दूर / हटकर",
        "englishSentence": "She ran off into the woods.",
        "hindiSentence": "वह जंगल की ओर भाग गई।"
      },
      {
        "id": "hg-off-2",
        "sno": 867,
        "partOfSpeech": "Preposition",
        "posCategory": "other",
        "englishMeaning": "From; starting at",
        "hindiMeaning": "से / छूट पर",
        "englishSentence": "The sale is off Tuesday through Friday.",
        "hindiSentence": "बिक्री मंगलवार से शुक्रवार तक चलेगी।"
      },
      {
        "id": "hg-off-3",
        "sno": 868,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Not operating; deactivated",
        "hindiMeaning": "बंद / निष्क्रिय",
        "englishSentence": "The server is currently off.",
        "hindiSentence": "सर्वर अभी बंद है।"
      },
      {
        "id": "hg-off-4",
        "sno": 869,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A discount or reduction",
        "hindiMeaning": "छूट",
        "englishSentence": "The shop offered ten percent off all items.",
        "hindiSentence": "दुकान ने सभी वस्तुओं पर दस प्रतिशत छूट दी।"
      }
    ]
  },
  {
    "id": "hg-group-367",
    "word": "Offend",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-offend-1",
        "sno": 872,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To cause hurt feelings; insult",
        "hindiMeaning": "आहत करना / अपमानित करना",
        "englishSentence": "He didn’t mean to offend anyone.",
        "hindiSentence": "उसका उद्देश्य किसी को अपमानित करना नहीं था।"
      },
      {
        "id": "hg-offend-2",
        "sno": 873,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To commit a crime or violation",
        "hindiMeaning": "अपराध करना / उल्लंघन करना",
        "englishSentence": "They offended against the new law.",
        "hindiSentence": "उन्होंने नए कानून का उल्लंघन किया।"
      }
    ]
  },
  {
    "id": "hg-group-368",
    "word": "Old",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-old-1",
        "sno": 874,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Having lived for a long time; aged",
        "hindiMeaning": "बूढ़ा / पुराना",
        "englishSentence": "She has a picture of her old dog.",
        "hindiSentence": "उसके पास अपने बूढ़े कुत्ते की तस्वीर है।"
      },
      {
        "id": "hg-old-2",
        "sno": 875,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "An elderly person",
        "hindiMeaning": "बूढ़े लोग / वृद्ध",
        "englishSentence": "The shelter cares for the old and infirm.",
        "hindiSentence": "आश्रय बूढ़ों और दुर्बलों की देखभाल करता है।"
      }
    ]
  },
  {
    "id": "hg-group-369",
    "word": "Olive",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-olive-1",
        "sno": 876,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A small oval fruit used for oil and table consumption",
        "hindiMeaning": "जैतून",
        "englishSentence": "He served bread with olives and cheese.",
        "hindiSentence": "उसने ब्रेड के साथ जैतून और पनीर परोसे।"
      },
      {
        "id": "hg-olive-2",
        "sno": 877,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "A yellowish-green color",
        "hindiMeaning": "जैतूनी हरा",
        "englishSentence": "She chose an olive dress for the event.",
        "hindiSentence": "उसने कार्यक्रम के लिए जैतूनी हरे रंग की पोशाक चुनी।"
      }
    ]
  },
  {
    "id": "hg-group-370",
    "word": "On",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-on-1",
        "sno": 852,
        "partOfSpeech": "Preposition",
        "posCategory": "other",
        "englishMeaning": "Physically in contact with and supported by a surface",
        "hindiMeaning": "पर / ऊपर",
        "englishSentence": "The book is on the table.",
        "hindiSentence": "किताब मेज़ पर है।"
      },
      {
        "id": "hg-on-2",
        "sno": 853,
        "partOfSpeech": "Adverb",
        "posCategory": "verb",
        "englishMeaning": "Functioning; operational",
        "hindiMeaning": "चालू / सक्रिय",
        "englishSentence": "The lights are on in every room.",
        "hindiSentence": "हर कमरे में बत्तियाँ चालू हैं।"
      }
    ]
  },
  {
    "id": "hg-group-371",
    "word": "Once",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-once-1",
        "sno": 854,
        "partOfSpeech": "Adverb",
        "posCategory": "verb",
        "englishMeaning": "On one occasion; one time only",
        "hindiMeaning": "एक बार",
        "englishSentence": "I have only been there once.",
        "hindiSentence": "मैं वहां केवल एक बार गया हूँ।"
      },
      {
        "id": "hg-once-2",
        "sno": 855,
        "partOfSpeech": "Conjunction",
        "posCategory": "other",
        "englishMeaning": "As soon as",
        "hindiMeaning": "जैसे ही",
        "englishSentence": "Once he arrives, we’ll start.",
        "hindiSentence": "जैसे ही वह पहुंचता है, हम शुरू करेंगे।"
      }
    ]
  },
  {
    "id": "hg-group-372",
    "word": "Only",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-only-1",
        "sno": 856,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Single; sole",
        "hindiMeaning": "एकमात्र / अकेला",
        "englishSentence": "He was the only candidate.",
        "hindiSentence": "वह एकमात्र उम्मीदवार था।"
      },
      {
        "id": "hg-only-2",
        "sno": 857,
        "partOfSpeech": "Adverb",
        "posCategory": "verb",
        "englishMeaning": "Exclusively; merely",
        "hindiMeaning": "केवल / सिर्फ",
        "englishSentence": "I only have ten rupees left.",
        "hindiSentence": "मेरे पास केवल दस रुपये बचे हैं।"
      }
    ]
  },
  {
    "id": "hg-group-373",
    "word": "Organ",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-organ-1",
        "sno": 878,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A musical instrument with pipes and a keyboard",
        "hindiMeaning": "ऑर्गन (वाद्य यंत्र)",
        "englishSentence": "The cathedral’s organ is famous for its sound.",
        "hindiSentence": "कैथेड्रल का ऑर्गन अपनी ध्वनि के लिए प्रसिद्ध है।"
      },
      {
        "id": "hg-organ-2",
        "sno": 879,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A part of an organism that performs a specific function",
        "hindiMeaning": "अंग",
        "englishSentence": "The liver is a vital organ.",
        "hindiSentence": "यकृत एक महत्वपूर्ण अंग है।"
      }
    ]
  },
  {
    "id": "hg-group-374",
    "word": "Out",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-out-1",
        "sno": 858,
        "partOfSpeech": "Adverb",
        "posCategory": "verb",
        "englishMeaning": "Away from the inside or center",
        "hindiMeaning": "बाहर",
        "englishSentence": "She went out of the room.",
        "hindiSentence": "वह कमरे से बाहर चली गई।"
      },
      {
        "id": "hg-out-2",
        "sno": 859,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Not in fashion; unfashionable",
        "hindiMeaning": "फैशन से बाहर",
        "englishSentence": "Bell-bottom pants are out now.",
        "hindiSentence": "बेल-बॉटम पैंट्स अब फैशन से बाहर हैं।"
      }
    ]
  },
  {
    "id": "hg-group-375",
    "word": "Outline",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-outline-1",
        "sno": 880,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A general description covering the main points",
        "hindiMeaning": "रूपरेखा",
        "englishSentence": "The outline of the speech was given in advance.",
        "hindiSentence": "भाषण की रूपरेखा पहले प्रदान की गई थी।"
      },
      {
        "id": "hg-outline-2",
        "sno": 881,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To give a summary or sketch",
        "hindiMeaning": "संक्षेप में बताना",
        "englishSentence": "Please outline your plan in three sentences.",
        "hindiSentence": "कृपया तीन वाक्यों में अपनी योजना संक्षेप में बताएं।"
      }
    ]
  },
  {
    "id": "hg-group-376",
    "word": "Over",
    "sensesCount": 4,
    "senses": [
      {
        "id": "hg-over-1",
        "sno": 860,
        "partOfSpeech": "Preposition",
        "posCategory": "other",
        "englishMeaning": "Above; across the top of",
        "hindiMeaning": "ऊपर / पार से",
        "englishSentence": "The bird flew over the roof.",
        "hindiSentence": "पक्षी छत के ऊपर से उड़ गया।"
      },
      {
        "id": "hg-over-2",
        "sno": 861,
        "partOfSpeech": "Adverb",
        "posCategory": "verb",
        "englishMeaning": "Finished; ended",
        "hindiMeaning": "समाप्त / खत्म",
        "englishSentence": "The show is over.",
        "hindiSentence": "शो खत्म हो गया।"
      },
      {
        "id": "hg-over-3",
        "sno": 862,
        "partOfSpeech": "Adverb",
        "posCategory": "verb",
        "englishMeaning": "Again; one more time (“do it over”)",
        "hindiMeaning": "दोबारा / फिर से",
        "englishSentence": "She asked him to do the task over.",
        "hindiSentence": "उसने उसे काम को फिर से करने को कहा।"
      },
      {
        "id": "hg-over-4",
        "sno": 863,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "In cricket, the set of six balls bowled by one bowler",
        "hindiMeaning": "ओवर (क्रिकेट में छह गेंद)",
        "englishSentence": "He bowled a maiden over.",
        "hindiSentence": "उसने एक मेडियन ओवर फेंका।"
      }
    ]
  },
  {
    "id": "hg-group-377",
    "word": "Overboard",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-overboard-1",
        "sno": 882,
        "partOfSpeech": "Adverb",
        "posCategory": "verb",
        "englishMeaning": "Over the side of a boat or ship",
        "hindiMeaning": "नाव से बाहर / जहाज के पार",
        "englishSentence": "He fell overboard but was rescued.",
        "hindiSentence": "वह नाव से बाहर गिर गया, लेकिन बचाया गया।"
      },
      {
        "id": "hg-overboard-2",
        "sno": 883,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Excessive; going to extremes",
        "hindiMeaning": "अत्यधिक / अति कर देना",
        "englishSentence": "She went overboard with decorations.",
        "hindiSentence": "उसने सजावट में अत्यधिक कर दिया।"
      }
    ]
  },
  {
    "id": "hg-group-378",
    "word": "Overlook",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-overlook-1",
        "sno": 884,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To fail to notice or consider",
        "hindiMeaning": "अनदेखा करना / नज़रअंदाज़ करना",
        "englishSentence": "I overlooked a typo in the report.",
        "hindiSentence": "मैंने रिपोर्ट में एक त्रुटि अनदेखी कर दी।"
      },
      {
        "id": "hg-overlook-2",
        "sno": 885,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To supervise or oversee",
        "hindiMeaning": "निरीक्षण करना / देखरेख करना",
        "englishSentence": "He was asked to overlook the project.",
        "hindiSentence": "उसे परियोजना का निरीक्षण करने के लिए कहा गया।"
      },
      {
        "id": "hg-overlook-3",
        "sno": 886,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A high place giving a broad view",
        "hindiMeaning": "दृश्य बिंदु / ऊँचा नज़ारा स्थल",
        "englishSentence": "The hill’s overlook offers a stunning panorama.",
        "hindiSentence": "पहाड़ी का दृश्य बिंदु आश्चर्यजनक दृश्य प्रस्तुत करता है।"
      }
    ]
  },
  {
    "id": "hg-group-379",
    "word": "Owing",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-owing-1",
        "sno": 887,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Unpaid; due",
        "hindiMeaning": "बकाया / देय",
        "englishSentence": "His account shows owing taxes.",
        "hindiSentence": "उसके खाते में बकाया कर दिख रहा है।"
      },
      {
        "id": "hg-owing-2",
        "sno": 888,
        "partOfSpeech": "Preposition",
        "posCategory": "other",
        "englishMeaning": "Because of (Owing to)",
        "hindiMeaning": "के कारण",
        "englishSentence": "Owing to the storm, the flight was delayed.",
        "hindiSentence": "तूफान के कारण उड़ान में देरी हुई।"
      }
    ]
  },
  {
    "id": "hg-group-380",
    "word": "Own",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-own-1",
        "sno": 889,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To possess or have as property",
        "hindiMeaning": "रखना / स्वामित्व होना",
        "englishSentence": "She owns three cars.",
        "hindiSentence": "उसके पास तीन कारें हैं।"
      },
      {
        "id": "hg-own-2",
        "sno": 890,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Belonging to oneself or itself",
        "hindiMeaning": "अपना / स्वयं का",
        "englishSentence": "He prepared his own report.",
        "hindiSentence": "उसने अपनी ही रिपोर्ट तैयार की।"
      }
    ]
  },
  {
    "id": "hg-group-381",
    "word": "Pallet",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-pallet-1",
        "sno": 938,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A flat wooden platform for storage or transport",
        "hindiMeaning": "तख्ता मंच / पैलेट",
        "englishSentence": "The boxes were stacked on a pallet.",
        "hindiSentence": "डिब्बे एक तख्ता मंच पर रखे गए थे।"
      },
      {
        "id": "hg-pallet-2",
        "sno": 939,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A simple bed or mattress",
        "hindiMeaning": "साधारण पलंग / गद्देदार बिछौना",
        "englishSentence": "They slept on wooden pallets during the trip.",
        "hindiSentence": "उन्होंने यात्रा के दौरान लकड़ी के साधारण पलंग पर सोया।"
      }
    ]
  },
  {
    "id": "hg-group-382",
    "word": "Park",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-park-1",
        "sno": 903,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A large public green area",
        "hindiMeaning": "पार्क / उद्यान",
        "englishSentence": "We had a picnic in the park.",
        "hindiSentence": "हमने पार्क में पिकनिक मनाया।"
      },
      {
        "id": "hg-park-2",
        "sno": 904,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To bring a vehicle to a stop and leave it there",
        "hindiMeaning": "पार्क करना / गाड़ी खड़ी करना",
        "englishSentence": "She parked her car outside the mall.",
        "hindiSentence": "उसने मॉल के बाहर अपनी कार पार्क की।"
      }
    ]
  },
  {
    "id": "hg-group-383",
    "word": "Parrot",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-parrot-1",
        "sno": 924,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A tropical bird known for mimicking speech",
        "hindiMeaning": "तोता",
        "englishSentence": "The parrot repeated every word we said.",
        "hindiSentence": "तोते ने हमारे हर शब्द की नकल की।"
      },
      {
        "id": "hg-parrot-2",
        "sno": 925,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To repeat mechanically or mindlessly",
        "hindiMeaning": "रटना / बिना सोचे दोहराना",
        "englishSentence": "He just parrots what he hears on TV.",
        "hindiSentence": "वह बस टीवी पर सुनी बातें बिना सोचे दोहराता है।"
      }
    ]
  },
  {
    "id": "hg-group-384",
    "word": "Past",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-past-1",
        "sno": 905,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The time before the present",
        "hindiMeaning": "अतीत / भूतकाल",
        "englishSentence": "We cannot change the past.",
        "hindiSentence": "हम अतीत को नहीं बदल सकते।"
      },
      {
        "id": "hg-past-2",
        "sno": 906,
        "partOfSpeech": "Preposition",
        "posCategory": "other",
        "englishMeaning": "Beyond in position or time",
        "hindiMeaning": "से परे / अधिक होने पर (बाद)",
        "englishSentence": "The deadline is past Friday.",
        "hindiSentence": "समय सीमा शुक्रवार के बाद है।"
      }
    ]
  },
  {
    "id": "hg-group-385",
    "word": "Patent",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-patent-1",
        "sno": 907,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A government grant giving exclusive rights to an inventor",
        "hindiMeaning": "पेटेंट / एकस्व अधिकार",
        "englishSentence": "She applied for a patent on her new device.",
        "hindiSentence": "उसने अपने नए यंत्र के लिए पेटेंट के लिए आवेदन किया।"
      },
      {
        "id": "hg-patent-2",
        "sno": 908,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Obvious or readily apparent",
        "hindiMeaning": "स्पष्ट / प्रत्यक्ष",
        "englishSentence": "It was a patent mistake.",
        "hindiSentence": "यह एक स्पष्ट गलती थी।"
      }
    ]
  },
  {
    "id": "hg-group-386",
    "word": "Peer",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-peer-1",
        "sno": 909,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A person of the same age, rank, or ability",
        "hindiMeaning": "समकक्ष / साथी",
        "englishSentence": "He’s well respected by his peers.",
        "hindiSentence": "उसे उसके साथियों द्वारा आदर दिया जाता है।"
      },
      {
        "id": "hg-peer-2",
        "sno": 910,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To look closely or inquisitively",
        "hindiMeaning": "झांकना / ध्यान से देखना",
        "englishSentence": "She peered through the fog.",
        "hindiSentence": "उसने कोहरे में झाँककर देखा।"
      }
    ]
  },
  {
    "id": "hg-group-387",
    "word": "Permit",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-permit-1",
        "sno": 926,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "An official document giving permission",
        "hindiMeaning": "अनुमति-पत्र / परमिट",
        "englishSentence": "You need a permit to camp here.",
        "hindiSentence": "यहाँ कैंपिंग के लिए आपको अनुमति-पत्र चाहिए।"
      },
      {
        "id": "hg-permit-2",
        "sno": 927,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To allow or authorize",
        "hindiMeaning": "अनुमति देना / मंज़ूरी देना",
        "englishSentence": "The council permitted outdoor dining.",
        "hindiSentence": "परिषद ने बाहरी भोजन की अनुमति दी।"
      }
    ]
  },
  {
    "id": "hg-group-388",
    "word": "Pet",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-pet-1",
        "sno": 936,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A domesticated animal kept for companionship",
        "hindiMeaning": "पालतू जानवर",
        "englishSentence": "They adopted a cat as a pet.",
        "hindiSentence": "उन्होंने एक बिल्ली को पालतू जानवर के रूप में गोद लिया।"
      },
      {
        "id": "hg-pet-2",
        "sno": 937,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To stroke or caress gently",
        "hindiMeaning": "प्यार से सहलाना",
        "englishSentence": "She petted the dog affectionately.",
        "hindiSentence": "उसने प्रेम से कुत्ते को सहलाया।"
      }
    ]
  },
  {
    "id": "hg-group-389",
    "word": "Pick",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-pick-1",
        "sno": 911,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To choose or select",
        "hindiMeaning": "चुनना",
        "englishSentence": "Please pick a card from the deck.",
        "hindiSentence": "कृपया डेक से एक कार्ड चुनें।"
      },
      {
        "id": "hg-pick-2",
        "sno": 912,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A small pointed tool or a thin piece",
        "hindiMeaning": "पिक / छोटा नुकीला औज़ार",
        "englishSentence": "He used a pick to loosen the soil.",
        "hindiSentence": "उसने मिट्टी को ढीला करने के लिए पिक का इस्तेमाल किया।"
      }
    ]
  },
  {
    "id": "hg-group-390",
    "word": "Plate",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-plate-1",
        "sno": 913,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A flat dish from which food is eaten",
        "hindiMeaning": "थाली / प्लेट",
        "englishSentence": "He served salad on a blue plate.",
        "hindiSentence": "उसने सलाद नीली थाली में परोसा।"
      },
      {
        "id": "hg-plate-2",
        "sno": 914,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To cover with a layer of metal",
        "hindiMeaning": "प्लेट चढ़ाना / परत चढ़ाना",
        "englishSentence": "The rims were plated with chrome.",
        "hindiSentence": "रिम्स पर क्रोम की परत चढ़ाई गई।"
      }
    ]
  },
  {
    "id": "hg-group-391",
    "word": "Plug",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-plug-1",
        "sno": 915,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A device for making an electrical connection",
        "hindiMeaning": "प्लग",
        "englishSentence": "Make sure the plug is inserted firmly.",
        "hindiSentence": "सुनिश्चित करें कि प्लग अच्छी तरह से लगा हुआ है।"
      },
      {
        "id": "hg-plug-2",
        "sno": 916,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To fill a hole or gap",
        "hindiMeaning": "छेद भरना / बंद करना",
        "englishSentence": "They plugged the leak in the roof.",
        "hindiSentence": "उन्होंने छत के रिसाव को भरा।"
      }
    ]
  },
  {
    "id": "hg-group-392",
    "word": "Police",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-police-1",
        "sno": 928,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The civil force responsible for law enforcement",
        "hindiMeaning": "पुलिस / आरक्षी बल",
        "englishSentence": "The police arrived within minutes of the call.",
        "hindiSentence": "कॉल के कुछ ही मिनटों में पुलिस पहुँच गई।"
      },
      {
        "id": "hg-police-2",
        "sno": 929,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To maintain order or enforce regulations",
        "hindiMeaning": "नियंत्रित करना / निगरानी करना",
        "englishSentence": "Volunteers policed the event to keep it safe.",
        "hindiSentence": "स्वयंसेवकों ने कार्यक्रम को सुरक्षित रखने के लिए निगरानी की।"
      }
    ]
  },
  {
    "id": "hg-group-393",
    "word": "Poll",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-poll-1",
        "sno": 930,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A survey of public opinion",
        "hindiMeaning": "जनमत सर्वेक्षण / पोल",
        "englishSentence": "The poll showed most people support the plan.",
        "hindiSentence": "सर्वेक्षण से पता चला कि अधिकांश लोग योजना का समर्थन करते हैं।"
      },
      {
        "id": "hg-poll-2",
        "sno": 931,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The top of the head",
        "hindiMeaning": "सिर की खोपड़ी / सिर का ऊपरी भाग",
        "englishSentence": "He was struck on the poll by the cricket ball.",
        "hindiSentence": "उसे क्रिकेट गेंद से सिर पर चोट लगी।"
      }
    ]
  },
  {
    "id": "hg-group-394",
    "word": "Port",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-port-1",
        "sno": 932,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A harbor or town with docks",
        "hindiMeaning": "बंदरगाह / पत्तन",
        "englishSentence": "The ship docked at the nearest port.",
        "hindiSentence": "जहाज़ निकटतम बंदरगाह पर पहुँचा।"
      },
      {
        "id": "hg-port-2",
        "sno": 933,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To carry or bring to another place",
        "hindiMeaning": "स्थानांतरित करना / ले जाना",
        "englishSentence": "They ported the data from the old system.",
        "hindiSentence": "उन्होंने पुराने सिस्टम से डेटा स्थानांतरित किया।"
      }
    ]
  },
  {
    "id": "hg-group-395",
    "word": "Post",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-post-1",
        "sno": 917,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "Mail or letters carried by postal service",
        "hindiMeaning": "डाक",
        "englishSentence": "He received the post this morning.",
        "hindiSentence": "उसे आज सुबह डाक मिली।"
      },
      {
        "id": "hg-post-2",
        "sno": 918,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A pole or stake",
        "hindiMeaning": "खंभा / लट्ठा",
        "englishSentence": "The fence posts were wooden.",
        "hindiSentence": "बाड़ के खंभे लकड़ी के थे।"
      }
    ]
  },
  {
    "id": "hg-group-396",
    "word": "Pour",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-pour-1",
        "sno": 919,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To cause a liquid to flow from one container into another",
        "hindiMeaning": "बहाना / उंडेलना / डालना",
        "englishSentence": "She poured tea into his cup.",
        "hindiSentence": "उसने उसके कप में चाय डाली।"
      },
      {
        "id": "hg-pour-2",
        "sno": 920,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "(of rain) to fall heavily",
        "hindiMeaning": "जमकर गिरना / मूसलाधार बारिश होना",
        "englishSentence": "It poured all night.",
        "hindiSentence": "सारी रात तेज़ बारिश हुई।"
      }
    ]
  },
  {
    "id": "hg-group-397",
    "word": "Present",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-present-1",
        "sno": 921,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A gift",
        "hindiMeaning": "उपहार / भेंट",
        "englishSentence": "He gave her a birthday present.",
        "hindiSentence": "उसने उसे जन्मदिन का उपहार दिया।"
      },
      {
        "id": "hg-present-2",
        "sno": 922,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Existing now; current",
        "hindiMeaning": "वर्तमान / उपस्थित",
        "englishSentence": "Let’s discuss present conditions.",
        "hindiSentence": "आइए वर्तमान परिस्थितियों पर चर्चा करें।"
      },
      {
        "id": "hg-present-3",
        "sno": 923,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To give or show something to someone",
        "hindiMeaning": "पेश करना / दिखाना / प्रस्तुत करना",
        "englishSentence": "She presented her findings at the conference.",
        "hindiSentence": "उसने सम्मेलन में अपने निष्कर्ष पेश किए।"
      }
    ]
  },
  {
    "id": "hg-group-398",
    "word": "Process",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-process-1",
        "sno": 934,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A series of actions taken to achieve a result",
        "hindiMeaning": "प्रक्रिया",
        "englishSentence": "Quality control is part of the manufacturing process.",
        "hindiSentence": "निर्माण प्रक्रिया के हिस्से के रूप में गुणवत्ता नियंत्रण होता है।"
      },
      {
        "id": "hg-process-2",
        "sno": 935,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To perform a series of actions on (data, materials, etc.)",
        "hindiMeaning": "संसाधित करना / प्रोसेस करना",
        "englishSentence": "They process the orders within 24 hours.",
        "hindiSentence": "वे 24 घंटे के भीतर ऑर्डर संसाधित करते हैं।"
      }
    ]
  },
  {
    "id": "hg-group-399",
    "word": "Project",
    "sensesCount": 4,
    "senses": [
      {
        "id": "hg-project-1",
        "sno": 891,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A planned undertaking",
        "hindiMeaning": "परियोजना",
        "englishSentence": "They completed the research project on time.",
        "hindiSentence": "उन्होंने समय पर शोध परियोजना पूरी की।"
      },
      {
        "id": "hg-project-2",
        "sno": 892,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A school assignment",
        "hindiMeaning": "गृहकार्य / प्रोजेक्ट असाइनमेंट",
        "englishSentence": "My project for school is due Monday.",
        "hindiSentence": "मेरा स्कूल का गृहकार्य सोमवार तक जमा करना है।"
      },
      {
        "id": "hg-project-3",
        "sno": 893,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A protruding structure or overhang",
        "hindiMeaning": "उभरा हुआ भाग",
        "englishSentence": "The balcony projects over the courtyard.",
        "hindiSentence": "बालकनी आंगनों पर उभरी हुई है।"
      },
      {
        "id": "hg-project-4",
        "sno": 894,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To make a public display (e.g., film onto a screen)",
        "hindiMeaning": "प्रदर्शित करना / प्रक्षेपित करना",
        "englishSentence": "They projected the movie outdoors.",
        "hindiSentence": "उन्होंने फिल्म बाहर प्रदर्शित की।"
      }
    ]
  },
  {
    "id": "hg-group-400",
    "word": "Prop",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-prop-1",
        "sno": 895,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A support placed under or against something",
        "hindiMeaning": "सहारा / टेक",
        "englishSentence": "He used a wedge as a prop to keep the door open.",
        "hindiSentence": "उसने दरवाज़ा खुला रखने के लिए कील का सहारा लगाया।"
      },
      {
        "id": "hg-prop-2",
        "sno": 896,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "An object used by actors on stage",
        "hindiMeaning": "मंच वस्तु / प्रोप",
        "englishSentence": "The actor forgot his prop during the play.",
        "hindiSentence": "अभिनेता ने नाटक के दौरान अपनी वस्तु भुला दी।"
      },
      {
        "id": "hg-prop-3",
        "sno": 897,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "Short for “property” (theatre technical equipment)",
        "hindiMeaning": "तकनीकी संपत्ति",
        "englishSentence": "The stage manager organized all the props.",
        "hindiSentence": "मंच प्रबंधक ने सभी तकनीकी संपत्ति व्यवस्थित की।"
      }
    ]
  },
  {
    "id": "hg-group-401",
    "word": "Prospect",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-prospect-1",
        "sno": 898,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The possibility or likelihood of some future event",
        "hindiMeaning": "संभावना / आशा",
        "englishSentence": "The prospect of rain kept us indoors.",
        "hindiSentence": "बारिश की संभावना ने हमें घर में रोके रखा।"
      },
      {
        "id": "hg-prospect-2",
        "sno": 899,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A potential customer or candidate",
        "hindiMeaning": "संभावित ग्राहक / उम्मीदवार",
        "englishSentence": "Sales reps called every prospect.",
        "hindiSentence": "सेल्स रेप ने हर संभावित ग्राहक को फोन किया।"
      },
      {
        "id": "hg-prospect-3",
        "sno": 900,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To explore an area for minerals",
        "hindiMeaning": "खोज करना (खनिज)",
        "englishSentence": "They prospected for gold along the river.",
        "hindiSentence": "उन्होंने नदी किनारे सोना खोजा।"
      }
    ]
  },
  {
    "id": "hg-group-402",
    "word": "Protest",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-protest-1",
        "sno": 901,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A public demonstration of objection",
        "hindiMeaning": "विरोध प्रदर्शन",
        "englishSentence": "Thousands joined the protest against the law.",
        "hindiSentence": "हज़ारों लोग कानून के खिलाफ विरोध प्रदर्शन में शामिल हुए।"
      },
      {
        "id": "hg-protest-2",
        "sno": 902,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "An expression of disapproval",
        "hindiMeaning": "असहमति की अभिव्यक्ति",
        "englishSentence": "His harsh words earned him many protests.",
        "hindiSentence": "उसकी कठोर टिप्पणियों ने कई असहमतियाँ पैदा कीं।"
      }
    ]
  },
  {
    "id": "hg-group-403",
    "word": "Quack",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-quack-1",
        "sno": 940,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The characteristic sound of a duck",
        "hindiMeaning": "बतख की कर्कश ध्वनि / क्वैक",
        "englishSentence": "The duck gave a loud quack.",
        "hindiSentence": "बतख ने जोरदार कर्कश ध्वनि निकाली।"
      },
      {
        "id": "hg-quack-2",
        "sno": 941,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A fraudulent or incompetent doctor",
        "hindiMeaning": "झूठा डॉक्टर / नीम-हकीम / ठग",
        "englishSentence": "The “doctor” turned out to be a quack.",
        "hindiSentence": "वह “डॉक्टर” झूठा निकला।"
      }
    ]
  },
  {
    "id": "hg-group-404",
    "word": "Quad",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-quad-1",
        "sno": 963,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A quadrangle or courtyard",
        "hindiMeaning": "चौकोर आंगन / अहाता",
        "englishSentence": "Students gathered in the campus quad at noon.",
        "hindiSentence": "छात्र दोपहर में कैंपस के चौकोर आंगन में इकट्ठे हुए।"
      },
      {
        "id": "hg-quad-2",
        "sno": 964,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The quadriceps muscle in the front of the thigh",
        "hindiMeaning": "जांघ की मांसपेशी (क्वाड्रिसेप्स)",
        "englishSentence": "He pulled his quad during the sprint.",
        "hindiSentence": "उसने दौड़ के दौरान अपनी जांघ की मांसपेशी खींच ली।"
      }
    ]
  },
  {
    "id": "hg-group-405",
    "word": "Quadrant",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-quadrant-1",
        "sno": 965,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "One of four equal parts of a circle",
        "hindiMeaning": "वृत्त का एक-चौथाई भाग (चतुर्थांश)",
        "englishSentence": "Plot the point in the second quadrant.",
        "hindiSentence": "बिंदु को दूसरे चतुर्थांश में चित्रित करें।"
      },
      {
        "id": "hg-quadrant-2",
        "sno": 966,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "An instrument for measuring angles",
        "hindiMeaning": "कोण मापक यंत्र / चतुर्थांश यंत्र",
        "englishSentence": "The sailor used a quadrant to measure the sun’s altitude.",
        "hindiSentence": "नाविक ने सूर्य की ऊँचाई मापने के लिए कोण यंत्र का उपयोग किया।"
      }
    ]
  },
  {
    "id": "hg-group-406",
    "word": "Quail",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-quail-1",
        "sno": 942,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A small game bird",
        "hindiMeaning": "बटेर / कोयलची",
        "englishSentence": "They hunted quail in the marsh.",
        "hindiSentence": "उन्होंने दलदली इलाके में बटेर का शिकार किया।"
      },
      {
        "id": "hg-quail-2",
        "sno": 943,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To cower, shrink back in fear",
        "hindiMeaning": "डर से सिकुड़ जाना / कांपना",
        "englishSentence": "He quailed at the thought of speaking in public.",
        "hindiSentence": "भीड़ में बोलने का विचार सुनकर वह डर के मारे सिकुड़ गया।"
      }
    ]
  },
  {
    "id": "hg-group-407",
    "word": "Qualify",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-qualify-1",
        "sno": 944,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To meet the necessary requirements",
        "hindiMeaning": "पात्र होना / अहर्ता प्राप्त करना",
        "englishSentence": "She qualified for the finals.",
        "hindiSentence": "वह फाइनल में पात्र हो गई।"
      },
      {
        "id": "hg-qualify-2",
        "sno": 945,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To modify or limit in meaning",
        "hindiMeaning": "सीमित करना / परिष्कृत करना",
        "englishSentence": "He qualified his statement with an apology.",
        "hindiSentence": "उसने माफी मांगकर अपनी टिप्पणी सीमित की।"
      },
      {
        "id": "hg-qualify-3",
        "sno": 946,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To become eligible by passing tests",
        "hindiMeaning": "प्रतियोगी परीक्षा पास कर योग्य बनना",
        "englishSentence": "He qualified as a lawyer last year.",
        "hindiSentence": "वह पिछले साल वकील बनने के लिए चयनित हुआ।"
      }
    ]
  },
  {
    "id": "hg-group-408",
    "word": "Quantum",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-quantum-1",
        "sno": 959,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "In physics, the smallest discrete quantity of a physical property",
        "hindiMeaning": "क्वांटा / भौतिक गुण की न्यूनतम मात्रा",
        "englishSentence": "Photons are quanta of light.",
        "hindiSentence": "फोटॉन प्रकाश के क्वांटा हैं।"
      },
      {
        "id": "hg-quantum-2",
        "sno": 960,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "An amount or portion",
        "hindiMeaning": "हिस्सा / निश्चित परिमाण",
        "englishSentence": "He received a quantum of the profits.",
        "hindiSentence": "उसे मुनाफे में एक हिस्सा मिला।"
      }
    ]
  },
  {
    "id": "hg-group-409",
    "word": "Quarter",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-quarter-1",
        "sno": 947,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "One-fourth part of something",
        "hindiMeaning": "एक चौथाई / पाव",
        "englishSentence": "She ate a quarter of the cake.",
        "hindiSentence": "उसने केक का एक चौथाई हिस्सा खा लिया।"
      },
      {
        "id": "hg-quarter-2",
        "sno": 948,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "Housing or lodging",
        "hindiMeaning": "ठहरने की जगह / आवास (क्वार्टर)",
        "englishSentence": "The soldiers were given quarters on base.",
        "hindiSentence": "सैनिकों को अड्डे पर ठहरने की व्यवस्था दी गई।"
      }
    ]
  },
  {
    "id": "hg-group-410",
    "word": "Queer",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-queer-1",
        "sno": 967,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Strange or odd",
        "hindiMeaning": "अजीब / विचित्र",
        "englishSentence": "That’s a queer way to solve the problem.",
        "hindiSentence": "समस्या हल करने का वह तरीका अजीब है।"
      },
      {
        "id": "hg-queer-2",
        "sno": 968,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A homosexual person (colloquial)",
        "hindiMeaning": "समलैंगिक व्यक्ति",
        "englishSentence": "He was one of the first openly queer artists.",
        "hindiSentence": "वह पहले खुलेआम समलैंगिक कलाकारों में से एक था।"
      },
      {
        "id": "hg-queer-3",
        "sno": 969,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To spoil or ruin",
        "hindiMeaning": "बिगाड़ना / चौपट करना",
        "englishSentence": "The scandal queered her chances of election.",
        "hindiSentence": "घोटाले ने उसके चुनाव की संभावनाएं बिगाड़ दीं।"
      }
    ]
  },
  {
    "id": "hg-group-411",
    "word": "Quick",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-quick-1",
        "sno": 957,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Moving fast; rapid",
        "hindiMeaning": "तेज़ / शीघ्र",
        "englishSentence": "She took a quick glance at her email.",
        "hindiSentence": "उसने अपना ईमेल जल्दी से देखा।"
      },
      {
        "id": "hg-quick-2",
        "sno": 958,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Alive; living (archaic usage)",
        "hindiMeaning": "जीवित / सजीव",
        "englishSentence": "The quick and the dead.",
        "hindiSentence": "जीवित और मृत।"
      }
    ]
  },
  {
    "id": "hg-group-412",
    "word": "Quirk",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-quirk-1",
        "sno": 955,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A peculiar trait or mannerism",
        "hindiMeaning": "विचित्र स्वभाव / अनोखी आदत",
        "englishSentence": "His quirk of tapping his foot annoyed everyone.",
        "hindiSentence": "पैरों की थपथपाहट की उसकी विचित्र शैली ने सबको चिढ़ाया।"
      },
      {
        "id": "hg-quirk-2",
        "sno": 956,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To twist or bend suddenly",
        "hindiMeaning": "झटका लगाना / भौंह मटकाना",
        "englishSentence": "She quirked her eyebrow in surprise.",
        "hindiSentence": "उसने आश्चर्य में अपनी भौंह उठा ली।"
      }
    ]
  },
  {
    "id": "hg-group-413",
    "word": "Quit",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-quit-1",
        "sno": 951,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To stop doing something",
        "hindiMeaning": "छोड़ देना / त्यागना",
        "englishSentence": "He decided to quit smoking.",
        "hindiSentence": "उसने धूम्रपान छोड़ने का फैसला किया।"
      },
      {
        "id": "hg-quit-2",
        "sno": 952,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Finished; ended (archaic usage)",
        "hindiMeaning": "समाप्त / मुक्त",
        "englishSentence": "The race was over and the crowd was quit.",
        "hindiSentence": "दौड़ समाप्त हो गई और भीड़ शांत हो गई।"
      }
    ]
  },
  {
    "id": "hg-group-414",
    "word": "Quite",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-quite-1",
        "sno": 961,
        "partOfSpeech": "Adverb",
        "posCategory": "verb",
        "englishMeaning": "Completely; entirely",
        "hindiMeaning": "पूरी तरह / बिल्कुल",
        "englishSentence": "She was quite surprised by the news.",
        "hindiSentence": "वह खबर सुनकर पूरी तरह चौंक गई थी।"
      },
      {
        "id": "hg-quite-2",
        "sno": 962,
        "partOfSpeech": "Adverb",
        "posCategory": "verb",
        "englishMeaning": "To a considerable extent; fairly",
        "hindiMeaning": "काफी / बहुत",
        "englishSentence": "It’s quite cold today.",
        "hindiSentence": "आज काफी ठंड है।"
      }
    ]
  },
  {
    "id": "hg-group-415",
    "word": "Quiver",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-quiver-1",
        "sno": 949,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To tremble or shake",
        "hindiMeaning": "कांपना / थरथराना",
        "englishSentence": "Her voice quivered with emotion.",
        "hindiSentence": "उसकी आवाज़ भावुकता से कांपी।"
      },
      {
        "id": "hg-quiver-2",
        "sno": 950,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A container for holding arrows",
        "hindiMeaning": "बाण थैला / तरकश",
        "englishSentence": "The archer reached for his quiver.",
        "hindiSentence": "धनुर्धर ने अपने बाण थैले (तरकश) को हाथ लगाया।"
      }
    ]
  },
  {
    "id": "hg-group-416",
    "word": "Quote",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-quote-1",
        "sno": 953,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To repeat exactly what someone has said",
        "hindiMeaning": "उद्धृत करना / हवाला देना",
        "englishSentence": "He quoted Shakespeare in his speech.",
        "hindiSentence": "उसने अपने भाषण में शेक्सपियर को उद्धृत किया।"
      },
      {
        "id": "hg-quote-2",
        "sno": 954,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To state a price",
        "hindiMeaning": "कीमत बताना / दर बताना",
        "englishSentence": "The contractor quoted a high price for repairs.",
        "hindiSentence": "ठेकेदार ने मरम्मत के लिए ऊँची कीमत बताई।"
      }
    ]
  },
  {
    "id": "hg-group-417",
    "word": "Quotient",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-quotient-1",
        "sno": 970,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The result obtained by dividing one number by another",
        "hindiMeaning": "भागफल",
        "englishSentence": "Divide 15 by 3 to get the quotient.",
        "hindiSentence": "15 को 3 से भाग करने पर भागफल प्राप्त करें।"
      },
      {
        "id": "hg-quotient-2",
        "sno": 971,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A share or portion of a whole",
        "hindiMeaning": "हिस्सा / अनुपात",
        "englishSentence": "A high poverty quotient in the region points to widespread need.",
        "hindiSentence": "उस क्षेत्र में उच्च गरीबी हिस्सा व्यापक आवश्यकता दर्शाता है।"
      }
    ]
  },
  {
    "id": "hg-group-418",
    "word": "Race",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-race-1",
        "sno": 977,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A competition of speed (running, cars, etc.)",
        "hindiMeaning": "दौड़ / स्पर्धा",
        "englishSentence": "He won the 100-meter race.",
        "hindiSentence": "उसने 100 मीटर की दौड़ जीती।"
      },
      {
        "id": "hg-race-2",
        "sno": 978,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A distinct ethnic or cultural group",
        "hindiMeaning": "जाति / नस्ल",
        "englishSentence": "They study the history of different races.",
        "hindiSentence": "वे विभिन्न जातियों का इतिहास पढ़ते हैं।"
      }
    ]
  },
  {
    "id": "hg-group-419",
    "word": "Rack",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-rack-1",
        "sno": 972,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A framework of bars for storage (e.g., dishes, clothes)",
        "hindiMeaning": "रैक / धारक / खांचा",
        "englishSentence": "She placed the plates on the drying rack.",
        "hindiSentence": "उसने प्लेटें सुखाने वाले रैक पर रखीं।"
      },
      {
        "id": "hg-rack-2",
        "sno": 973,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To cause extreme physical or mental pain (torture)",
        "hindiMeaning": "यातना देना / पीड़ा देना",
        "englishSentence": "They racked the prisoner for information.",
        "hindiSentence": "उन्होंने जानकारी के लिए कैदी को यातना दी।"
      },
      {
        "id": "hg-rack-3",
        "sno": 974,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To arrange or store by placing on a rack",
        "hindiMeaning": "सजाना / रैक पर चढ़ाना",
        "englishSentence": "He racked his golf clubs in the garage.",
        "hindiSentence": "उसने अपने गोल्फ क्लब गैराज में चढ़ा दिए।"
      }
    ]
  },
  {
    "id": "hg-group-420",
    "word": "Racket",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-racket-1",
        "sno": 975,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A loud, unpleasant noise",
        "hindiMeaning": "कर्कश शोर / कोलाहल",
        "englishSentence": "The children made a terrible racket in the yard.",
        "hindiSentence": "बच्चों ने यार्ड में कर्कश शोर मचाया।"
      },
      {
        "id": "hg-racket-2",
        "sno": 976,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "An illegal scheme for profit",
        "hindiMeaning": "अवैध कारोबार / ठगी का गिरोह",
        "englishSentence": "The police broke up the drug racket.",
        "hindiSentence": "पुलिस ने ड्रग रैकेट तोड़ दिया।"
      }
    ]
  },
  {
    "id": "hg-group-421",
    "word": "Rail",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-rail-1",
        "sno": 979,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A bar or series of bars, often as a guard or support",
        "hindiMeaning": "रेलिंग / छड़ / बार",
        "englishSentence": "She held onto the rail as she climbed the stairs.",
        "hindiSentence": "उसने सीढ़ियाँ चढ़ते समय रेलिंग को पकड़ा।"
      },
      {
        "id": "hg-rail-2",
        "sno": 980,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To complain bitterly or criticize harshly",
        "hindiMeaning": "शिकायत करना / कड़ी आलोचना करना",
        "englishSentence": "Critics railed against the new policy.",
        "hindiSentence": "आलोचकों ने नई नीति की कड़ी आलोचना की।"
      }
    ]
  },
  {
    "id": "hg-group-422",
    "word": "Raise",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-raise-1",
        "sno": 981,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To lift or move to a higher position",
        "hindiMeaning": "उठाना / ऊपर करना",
        "englishSentence": "He raised his hand to ask a question.",
        "hindiSentence": "उसने सवाल पूछने के लिए अपना हाथ उठाया।"
      },
      {
        "id": "hg-raise-2",
        "sno": 982,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To collect or bring together (funds, animals, children)",
        "hindiMeaning": "इकट्ठा करना / पालन-पोषण करना",
        "englishSentence": "They raised money for charity.",
        "hindiSentence": "उन्होंने चैरिटी के लिए धन इकट्ठा किया।"
      },
      {
        "id": "hg-raise-3",
        "sno": 983,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "An increase in salary or wages",
        "hindiMeaning": "वेतन वृद्धि / बढ़त",
        "englishSentence": "She got a raise after her performance review.",
        "hindiSentence": "प्रदर्शन समीक्षा के बाद उसे वेतन वृद्धि मिली।"
      }
    ]
  },
  {
    "id": "hg-group-423",
    "word": "Ram",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-ram-1",
        "sno": 984,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A male sheep",
        "hindiMeaning": "भेड़ का नर / मेंढ़ा",
        "englishSentence": "The farmer showed off his prize-winning ram.",
        "hindiSentence": "किसान ने अपने पुरस्कार विजेता मेंढ़े को दिखाया।"
      },
      {
        "id": "hg-ram-2",
        "sno": 985,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A heavy battering implement",
        "hindiMeaning": "तोड़ने वाला भारी यंत्र / मूसल",
        "englishSentence": "They used a ram to break down the door.",
        "hindiSentence": "उन्होंने दरवाज़ा तोड़ने के लिए भारी यंत्र का इस्तेमाल किया।"
      },
      {
        "id": "hg-ram-3",
        "sno": 986,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To drive or force violently against something",
        "hindiMeaning": "टक्कर मारना / ज़ोर से टकराना",
        "englishSentence": "The car rammed into the barrier.",
        "hindiSentence": "कार ने बाधा से टक्कर मारी।"
      }
    ]
  },
  {
    "id": "hg-group-424",
    "word": "Range",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-range-1",
        "sno": 987,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A variety or scope",
        "hindiMeaning": "विविधता / श्रेणी / दायरा",
        "englishSentence": "The store offers a wide range of products.",
        "hindiSentence": "स्टोर विभिन्न प्रकार के उत्पाद पेश करता है।"
      },
      {
        "id": "hg-range-2",
        "sno": 988,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A mountain range",
        "hindiMeaning": "पर्वत श्रेणी / शृंखला",
        "englishSentence": "The Himalayas are an immense mountain range.",
        "hindiSentence": "हिमालय एक विशाल पर्वत श्रेणी है।"
      },
      {
        "id": "hg-range-3",
        "sno": 989,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To extend or vary between limits",
        "hindiMeaning": "सीमाओं में फैलना / विस्तार होना",
        "englishSentence": "Temperatures range from 10°C to 30°C.",
        "hindiSentence": "तापमान 10°C से 30°C तक रहता है।"
      }
    ]
  },
  {
    "id": "hg-group-425",
    "word": "Rank",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-rank-1",
        "sno": 990,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A position in a hierarchy",
        "hindiMeaning": "रैंक / पद",
        "englishSentence": "She achieved the rank of captain.",
        "hindiSentence": "उसने कप्तान का पद प्राप्त किया।"
      },
      {
        "id": "hg-rank-2",
        "sno": 991,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A foul or offensive smell",
        "hindiMeaning": "बदबूदार / दुर्गंध",
        "englishSentence": "There was a rank odor in the basement.",
        "hindiSentence": "तहखाने में बदबू आ रही थी।"
      },
      {
        "id": "hg-rank-3",
        "sno": 992,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To arrange in order",
        "hindiMeaning": "क्रमबद्ध करना / श्रेणीबद्ध करना",
        "englishSentence": "The data were ranked by importance.",
        "hindiSentence": "डेटा को महत्व के अनुसार क्रमबद्ध किया गया।"
      }
    ]
  },
  {
    "id": "hg-group-426",
    "word": "Rash",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-rash-1",
        "sno": 1023,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A skin eruption",
        "hindiMeaning": "चकत्ता / फुंसी",
        "englishSentence": "She developed a rash from the lotion.",
        "hindiSentence": "लोशन से उसे चकत्ता हो गया।"
      },
      {
        "id": "hg-rash-2",
        "sno": 1024,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Acting without careful thought",
        "hindiMeaning": "जल्दबाज़ / लापरवाह",
        "englishSentence": "It was a rash decision to quit.",
        "hindiSentence": "नौकरी छोड़ना जल्दबाज़ी भरा निर्णय था।"
      }
    ]
  },
  {
    "id": "hg-group-427",
    "word": "Rate",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-rate-1",
        "sno": 1025,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A measurement per unit",
        "hindiMeaning": "दर / गति",
        "englishSentence": "The success rate was 90%.",
        "hindiSentence": "सफलता की दर 90% थी।"
      },
      {
        "id": "hg-rate-2",
        "sno": 1026,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To evaluate or assign a value",
        "hindiMeaning": "मूल्यांकन करना / दर्जा देना",
        "englishSentence": "She rated the movie three stars.",
        "hindiSentence": "उसने फिल्म को तीन सितारे दिए।"
      },
      {
        "id": "hg-rate-3",
        "sno": 1027,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A fee or charge",
        "hindiMeaning": "शुल्क / भाव",
        "englishSentence": "What’s the hourly rate?",
        "hindiSentence": "प्रति घंटा शुल्क कितना है?"
      }
    ]
  },
  {
    "id": "hg-group-428",
    "word": "Raven",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-raven-1",
        "sno": 993,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A large, glossy black bird",
        "hindiMeaning": "कौआ (विशाल काला कौआ)",
        "englishSentence": "He spotted a raven perched on the branch.",
        "hindiSentence": "उसने शाखा पर बैठे विशाल कौए को देखा।"
      },
      {
        "id": "hg-raven-2",
        "sno": 994,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To devour greedily",
        "hindiMeaning": "लपेटना / बड़ी भूख से खाना / हड़पना",
        "englishSentence": "The lion ravens its prey in minutes.",
        "hindiSentence": "शेर ने अपने शिकार को मिनटों में लपेट लिया।"
      }
    ]
  },
  {
    "id": "hg-group-429",
    "word": "Reach",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-reach-1",
        "sno": 995,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To stretch out an arm or hand to touch something",
        "hindiMeaning": "पहुँचाना / हाथ बढ़ाना",
        "englishSentence": "She reached for the book on the top shelf.",
        "hindiSentence": "उसने ऊपरी शेल्फ से किताब तक हाथ पहुँचाया।"
      },
      {
        "id": "hg-reach-2",
        "sno": 996,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The extent or range of one’s ability or influence",
        "hindiMeaning": "क्षमता की सीमा / पहुँच",
        "englishSentence": "His reach extends to international markets.",
        "hindiSentence": "उसकी पहुँच अंतर्राष्ट्रीय बाज़ारों तक फैली है।"
      }
    ]
  },
  {
    "id": "hg-group-430",
    "word": "Ream",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-ream-1",
        "sno": 999,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A quantity of paper (typically 500 sheets)",
        "hindiMeaning": "रीम (कागज़ के 500 पन्नों का गट्ठा)",
        "englishSentence": "He bought a ream of printing paper.",
        "hindiSentence": "उसने प्रिंटिंग पेपर की एक रीम खरीदी।"
      },
      {
        "id": "hg-ream-2",
        "sno": 1000,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To criticize or scold severely",
        "hindiMeaning": "खरी-खरी सुनाना / डांटना",
        "englishSentence": "The coach reamed the team after their poor performance.",
        "hindiSentence": "खराब प्रदर्शन के बाद कोच ने टीम को खरी-खरी सुनाई।"
      }
    ]
  },
  {
    "id": "hg-group-431",
    "word": "Reap",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-reap-1",
        "sno": 1001,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To cut and gather a crop",
        "hindiMeaning": "कटाई / फसल काटना",
        "englishSentence": "Farmers reap wheat in the summer.",
        "hindiSentence": "किसान गर्मियों में गेहूं की कटाई करते हैं।"
      },
      {
        "id": "hg-reap-2",
        "sno": 1002,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To receive something as a consequence of actions",
        "hindiMeaning": "फल प्राप्त करना",
        "englishSentence": "He reaped the rewards of his hard work.",
        "hindiSentence": "उसने अपनी मेहनत का फल प्राप्त किया।"
      }
    ]
  },
  {
    "id": "hg-group-432",
    "word": "Rear",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-rear-1",
        "sno": 997,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The back part of something",
        "hindiMeaning": "पिछला हिस्सा / पृष्ठ भाग",
        "englishSentence": "He was hit in the rear in the collision.",
        "hindiSentence": "टक्कर में वह पीछे के हिस्से में टकराया।"
      },
      {
        "id": "hg-rear-2",
        "sno": 998,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To raise young (children or animals)",
        "hindiMeaning": "पालन-पोषण करना / बड़ा करना",
        "englishSentence": "They reared three children on a small farm.",
        "hindiSentence": "उन्होंने एक छोटे खेत में तीन बच्चों की परवरिश की।"
      }
    ]
  },
  {
    "id": "hg-group-433",
    "word": "Record",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-record-1",
        "sno": 1003,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The best achievement or time",
        "hindiMeaning": "रिकॉर्ड / सर्वश्रेष्ठ उपलब्धि",
        "englishSentence": "She set a new world record.",
        "hindiSentence": "उसने नया विश्व रिकॉर्ड बनाया।"
      },
      {
        "id": "hg-record-2",
        "sno": 1004,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To capture (audio, video, data)",
        "hindiMeaning": "रिकॉर्ड करना / दर्ज करना",
        "englishSentence": "They recorded the meeting for later review.",
        "hindiSentence": "उन्होंने बाद में समीक्षा के लिए बैठक रिकॉर्ड की।"
      }
    ]
  },
  {
    "id": "hg-group-434",
    "word": "Reel",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-reel-1",
        "sno": 1007,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To wind or pull onto a reel",
        "hindiMeaning": "लपेटना / खींचना",
        "englishSentence": "They reeled in the fishing line slowly.",
        "hindiSentence": "उन्होंने मछली पकड़ने की लाइन धीरे-धीरे लपेटी।"
      },
      {
        "id": "hg-reel-2",
        "sno": 1008,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To stagger or sway, as from shock",
        "hindiMeaning": "हिलना / थर्राना / लड़खड़ाना",
        "englishSentence": "He reeled from the sudden news.",
        "hindiSentence": "अचानक खबर सुनकर वह कांप उठा।"
      }
    ]
  },
  {
    "id": "hg-group-435",
    "word": "Refrain",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-refrain-1",
        "sno": 1039,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A repeated line or phrase, especially in a song or poem",
        "hindiMeaning": "दोहराया गया हिस्सा / टेक",
        "englishSentence": "The chorus served as the refrain of the song.",
        "hindiSentence": "गाने का कोरस इसका दोहराया गया हिस्सा था।"
      },
      {
        "id": "hg-refrain-2",
        "sno": 1040,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To hold oneself back; to avoid doing something",
        "hindiMeaning": "बचना / परहेज़ करना",
        "englishSentence": "Please refrain from smoking in this area.",
        "hindiSentence": "कृपया इस क्षेत्र में धूम्रपान से परहेज़ करें।"
      }
    ]
  },
  {
    "id": "hg-group-436",
    "word": "Refuse",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-refuse-1",
        "sno": 1005,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "Waste material; trash",
        "hindiMeaning": "कचरा / बेकार चीज़ें",
        "englishSentence": "The trucks carried the city’s refuse away.",
        "hindiSentence": "ट्रक शहर का कचरा ले गए।"
      },
      {
        "id": "hg-refuse-2",
        "sno": 1006,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To decline to accept or allow",
        "hindiMeaning": "इनकार करना / मना करना",
        "englishSentence": "He refused to answer the question.",
        "hindiSentence": "उसने प्रश्न का उत्तर देने से इनकार कर दिया।"
      }
    ]
  },
  {
    "id": "hg-group-437",
    "word": "Resort",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-resort-1",
        "sno": 1009,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A holiday place with amenities",
        "hindiMeaning": "रिसॉर्ट / सैरगाह",
        "englishSentence": "They stayed at a beach resort.",
        "hindiSentence": "वे समुद्र तट रिसॉर्ट में ठहरे।"
      },
      {
        "id": "hg-resort-2",
        "sno": 1010,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To turn to for help or use",
        "hindiMeaning": "सहारा लेना",
        "englishSentence": "She resorted to old photographs to remember him.",
        "hindiSentence": "उसने उसे याद करने के लिए पुरानी तस्वीरों का सहारा लिया।"
      }
    ]
  },
  {
    "id": "hg-group-438",
    "word": "Rest",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-rest-1",
        "sno": 1028,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "What remains after others are removed",
        "hindiMeaning": "अवशेष / बाकी हिस्सा",
        "englishSentence": "She ate three slices and left the rest.",
        "hindiSentence": "उसने तीन स्लाइस खाए और बाकी छोड़ दिया।"
      },
      {
        "id": "hg-rest-2",
        "sno": 1029,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To cease work or movement",
        "hindiMeaning": "आराम करना / विश्राम लेना",
        "englishSentence": "He rested after the long hike.",
        "hindiSentence": "लंबी चढ़ाई के बाद उसने आराम किया।"
      }
    ]
  },
  {
    "id": "hg-group-439",
    "word": "Resume",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-resume-1",
        "sno": 1011,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To begin again after a pause",
        "hindiMeaning": "पुनः आरंभ करना",
        "englishSentence": "The meeting will resume after lunch.",
        "hindiSentence": "दोपहर के भोजन के बाद बैठक पुनः आरंभ होगी।"
      },
      {
        "id": "hg-resume-2",
        "sno": 1012,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A brief account of one’s education and work experience",
        "hindiMeaning": "जीवन परिचय (बायोडाटा / सीवी)",
        "englishSentence": "Please email your resume to HR.",
        "hindiSentence": "कृपया अपना जीवन परिचय (रिज्यूमे) एचआर को ईमेल करें।"
      }
    ]
  },
  {
    "id": "hg-group-440",
    "word": "Review",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-review-1",
        "sno": 1041,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A critical evaluation or assessment",
        "hindiMeaning": "समीक्षा",
        "englishSentence": "The director’s new film received glowing reviews.",
        "hindiSentence": "निर्देशक की नई फिल्म को प्रशंसात्मक समीक्षाएं मिलीं।"
      },
      {
        "id": "hg-review-2",
        "sno": 1042,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To examine or assess again",
        "hindiMeaning": "पुनः जाँचना / समीक्षा करना",
        "englishSentence": "Please review your answers before submitting.",
        "hindiSentence": "कृपया जमा करने से पहले अपने उत्तर पुनः जाँच लें।"
      }
    ]
  },
  {
    "id": "hg-group-441",
    "word": "Rib",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-rib-1",
        "sno": 1037,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "One of the curved bones protecting the chest cavity",
        "hindiMeaning": "पसली की हड्डी",
        "englishSentence": "The blow cracked his rib.",
        "hindiSentence": "प्रहार से उसकी पसली की हड्डी टूट गई।"
      },
      {
        "id": "hg-rib-2",
        "sno": 1038,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A playful jab or joke",
        "hindiMeaning": "ताना / मज़ाक",
        "englishSentence": "He took her comment as a rib.",
        "hindiSentence": "उसने उसकी टिप्पणी को मज़ाक समझा।"
      }
    ]
  },
  {
    "id": "hg-group-442",
    "word": "Right",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-right-1",
        "sno": 1034,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Correct or true",
        "hindiMeaning": "सही / उचित",
        "englishSentence": "That’s the right answer.",
        "hindiSentence": "वह सही उत्तर है।"
      },
      {
        "id": "hg-right-2",
        "sno": 1035,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A legal entitlement or moral claim",
        "hindiMeaning": "अधिकार",
        "englishSentence": "Everyone has the right to free speech.",
        "hindiSentence": "हर किसी को अभिव्यक्ति की स्वतंत्रता का अधिकार है।"
      },
      {
        "id": "hg-right-3",
        "sno": 1036,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The direction opposite of left",
        "hindiMeaning": "दाहिना किनारा / दायाँ",
        "englishSentence": "Turn right at the next corner.",
        "hindiSentence": "अगले मोड़ पर दाहिने मुड़ें।"
      }
    ]
  },
  {
    "id": "hg-group-443",
    "word": "Ring",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-ring-1",
        "sno": 1030,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A band worn on the finger",
        "hindiMeaning": "अंगूठी",
        "englishSentence": "She bought a diamond ring.",
        "hindiSentence": "उसने हीरे की अंगूठी खरीदी।"
      },
      {
        "id": "hg-ring-2",
        "sno": 1031,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The sound of a bell",
        "hindiMeaning": "घंटी की आवाज़",
        "englishSentence": "I heard the ring of church bells.",
        "hindiSentence": "मैंने चर्च की घंटियों की आवाज़ सुनी।"
      }
    ]
  },
  {
    "id": "hg-group-444",
    "word": "Ripe",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-ripe-1",
        "sno": 1032,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Fully developed or mature",
        "hindiMeaning": "पका हुआ",
        "englishSentence": "The bananas were fully ripe.",
        "hindiSentence": "केले पूरी तरह पके हुए थे।"
      },
      {
        "id": "hg-ripe-2",
        "sno": 1033,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Suitable for a particular action",
        "hindiMeaning": "उपयुक्त / सही समय पर",
        "englishSentence": "It’s a ripe time to harvest the crop.",
        "hindiSentence": "फसल की कटाई के लिए यह उपयुक्त समय है।"
      }
    ]
  },
  {
    "id": "hg-group-445",
    "word": "Rock",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-rock-1",
        "sno": 1013,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A large natural stone",
        "hindiMeaning": "चट्टान / पत्थर",
        "englishSentence": "We sat on the rock by the stream.",
        "hindiSentence": "हम धारा किनारे चट्टान पर बैठे।"
      },
      {
        "id": "hg-rock-2",
        "sno": 1014,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A genre of popular music",
        "hindiMeaning": "रॉक संगीत",
        "englishSentence": "He’s a fan of classic rock.",
        "hindiSentence": "वह क्लासिक रॉक संगीत का प्रशंसक है।"
      }
    ]
  },
  {
    "id": "hg-group-446",
    "word": "Rook",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-rook-1",
        "sno": 1043,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A chess piece shaped like a tower",
        "hindiMeaning": "शतरंज का हाथी (रूक)",
        "englishSentence": "He moved his rook to protect the king.",
        "hindiSentence": "उसने राजा की रक्षा के लिए अपना रूक चलाया।"
      },
      {
        "id": "hg-rook-2",
        "sno": 1044,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To swindle or cheat",
        "hindiMeaning": "धोखा देना / छल करना / ठगना",
        "englishSentence": "The con artist rooked him out of his savings.",
        "hindiSentence": "ठग ने उसकी बचत को धोखे से हड़प लिया।"
      }
    ]
  },
  {
    "id": "hg-group-447",
    "word": "Root",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-root-1",
        "sno": 1015,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The edible part of a plant",
        "hindiMeaning": "जड़ / कंद",
        "englishSentence": "We harvested the beetroot roots.",
        "hindiSentence": "हमने चुकंदर की जड़ें निकालीं।"
      },
      {
        "id": "hg-root-2",
        "sno": 1016,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To cheer on or support",
        "hindiMeaning": "समर्थन करना / चीयर्स करना",
        "englishSentence": "Fans rooted for their team.",
        "hindiSentence": "प्रशंसकों ने अपनी टीम का समर्थन किया।"
      },
      {
        "id": "hg-root-3",
        "sno": 1017,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The fundamental basis of something",
        "hindiMeaning": "मूल / आधार",
        "englishSentence": "Grammar drills cover the root of the word.",
        "hindiSentence": "व्याकरण अभ्यास शब्द के मूल पर आधारित हैं।"
      }
    ]
  },
  {
    "id": "hg-group-448",
    "word": "Row",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-row-1",
        "sno": 1018,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A line of people or things",
        "hindiMeaning": "पंक्ति / कतार",
        "englishSentence": "There’s a row of shops along the street.",
        "hindiSentence": "सड़क के किनारे दुकानों की कतार है।"
      },
      {
        "id": "hg-row-2",
        "sno": 1019,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A noisy argument",
        "hindiMeaning": "बहस / विवाद / झगड़ा",
        "englishSentence": "They had a row over money.",
        "hindiSentence": "पैसों को लेकर उनका विवाद हुआ।"
      },
      {
        "id": "hg-row-3",
        "sno": 1020,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To propel a boat with oars",
        "hindiMeaning": "नाव चलाना / खेना",
        "englishSentence": "We rowed across the lake.",
        "hindiSentence": "हमने झील पार करने के लिए नाव चलाई।"
      }
    ]
  },
  {
    "id": "hg-group-449",
    "word": "Rule",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-rule-1",
        "sno": 1021,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A prescribed guideline",
        "hindiMeaning": "नियम / क़ानून",
        "englishSentence": "Always follow the safety rules.",
        "hindiSentence": "हमेशा सुरक्षा नियमों का पालन करें।"
      },
      {
        "id": "hg-rule-2",
        "sno": 1022,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To govern or control",
        "hindiMeaning": "शासन करना",
        "englishSentence": "That family ruled the region for centuries.",
        "hindiSentence": "उस परिवार ने सदियों तक क्षेत्र पर शासन किया।"
      }
    ]
  },
  {
    "id": "hg-group-450",
    "word": "Sack",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-sack-1",
        "sno": 1045,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A large bag for carrying things",
        "hindiMeaning": "थैला / बोरी",
        "englishSentence": "He packed his clothes in a large sack.",
        "hindiSentence": "उसने अपने कपड़े एक बड़े थैले में रखे।"
      },
      {
        "id": "hg-sack-2",
        "sno": 1046,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To dismiss someone from a job",
        "hindiMeaning": "नौकरी से निकालना / बर्खास्त करना",
        "englishSentence": "The manager decided to sack the underperforming employee.",
        "hindiSentence": "मैनेजर ने काम न करने वाले कर्मचारी को नौकरी से निकाल दिया।"
      },
      {
        "id": "hg-sack-3",
        "sno": 1047,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The plunder taken from a conquered town",
        "hindiMeaning": "लूटपाट / लूटा हुआ माल",
        "englishSentence": "The army marched off with the sack from the captured town.",
        "hindiSentence": "सेना ने कब्ज़े वाले शहर से लूटी गई चीजें ले लीं।"
      }
    ]
  },
  {
    "id": "hg-group-451",
    "word": "Sail",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-sail-1",
        "sno": 1048,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A piece of fabric used to catch wind on a boat",
        "hindiMeaning": "पाल (नाव का)",
        "englishSentence": "They raised the sail as the wind picked up.",
        "hindiSentence": "जैसे ही हवा चलने लगी, उन्होंने पाल उठाई।"
      },
      {
        "id": "hg-sail-2",
        "sno": 1049,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To travel by boat or ship",
        "hindiMeaning": "जहाज़ से यात्रा करना / नौकायन करना",
        "englishSentence": "We will sail to the island tomorrow.",
        "hindiSentence": "हम कल द्वीप की ओर जहाज़ से यात्रा करेंगे।"
      }
    ]
  },
  {
    "id": "hg-group-452",
    "word": "Sale",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-sale-1",
        "sno": 1050,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The act of selling something",
        "hindiMeaning": "बिक्री",
        "englishSentence": "The sale of tickets began this morning.",
        "hindiSentence": "टिकटों की बिक्री आज सुबह शुरू हुई।"
      },
      {
        "id": "hg-sale-2",
        "sno": 1051,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A period when goods are sold at reduced prices",
        "hindiMeaning": "सेल (छूट की बिक्री)",
        "englishSentence": "The store is holding a big sale this weekend.",
        "hindiSentence": "स्टोर इस सप्ताहांत बड़ी छूट की बिक्री कर रहा है।"
      }
    ]
  },
  {
    "id": "hg-group-453",
    "word": "Salt",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-salt-1",
        "sno": 1052,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "Sodium chloride used for seasoning food",
        "hindiMeaning": "नमक",
        "englishSentence": "She sprinkled a pinch of salt on her eggs.",
        "hindiSentence": "उसने अपने अंडों पर एक चुटकी नमक छिड़का।"
      },
      {
        "id": "hg-salt-2",
        "sno": 1053,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A person of courage or wit (slang)",
        "hindiMeaning": "बहादुर / अनुभवी नाविक",
        "englishSentence": "He’s a salty old sailor with many tales.",
        "hindiSentence": "वह कई कहानियाँ सुनाने वाला एक बहादुर पुराना नाविक है।"
      }
    ]
  },
  {
    "id": "hg-group-454",
    "word": "Saw",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-saw-1",
        "sno": 1054,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A tool with a toothed blade used for cutting",
        "hindiMeaning": "आरी",
        "englishSentence": "He cut the plank with a saw.",
        "hindiSentence": "उसने आरी से तख्ते को काटा।"
      },
      {
        "id": "hg-saw-2",
        "sno": 1055,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "Past tense of “see”",
        "hindiMeaning": "देखा",
        "englishSentence": "I saw her at the market yesterday.",
        "hindiSentence": "मैंने कल उसे बाज़ार में देखा।"
      }
    ]
  },
  {
    "id": "hg-group-455",
    "word": "Scale",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-scale-1",
        "sno": 1056,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A device for measuring weight",
        "hindiMeaning": "तराजू / वजन पैमाना",
        "englishSentence": "The fish weighed three kilos on the scale.",
        "hindiSentence": "मछली का वज़न तराजू पर तीन किलो था।"
      },
      {
        "id": "hg-scale-2",
        "sno": 1057,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The series of musical notes ordered by pitch",
        "hindiMeaning": "स्वरमाला (स्केल)",
        "englishSentence": "He practiced the C major scale on his piano.",
        "hindiSentence": "वह अपने पियानो पर C मेजर स्वरमाला का अभ्यास कर रहा है।"
      },
      {
        "id": "hg-scale-3",
        "sno": 1058,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To climb up or over",
        "hindiMeaning": "चढ़ना / फलांगना",
        "englishSentence": "The hikers scaled the rocky cliff.",
        "hindiSentence": "पर्वतारोहियों ने खड़ी चट्टान पर चढ़ाई की।"
      }
    ]
  },
  {
    "id": "hg-group-456",
    "word": "Scarf",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-scarf-1",
        "sno": 1059,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A length of cloth worn around the neck or head",
        "hindiMeaning": "स्कार्फ / दुपट्टा / गुलूबंद",
        "englishSentence": "She wrapped a warm scarf around her neck.",
        "hindiSentence": "उसने गले में एक गर्म स्कार्फ लपेटा।"
      },
      {
        "id": "hg-scarf-2",
        "sno": 1060,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To eat something quickly and greedily",
        "hindiMeaning": "जल्दी-जल्दी खाना / हड़पना",
        "englishSentence": "He scarfed down his breakfast before work.",
        "hindiSentence": "उसने काम से पहले जल्दी-जल्दी नाश्ता कर लिया।"
      }
    ]
  },
  {
    "id": "hg-group-457",
    "word": "Score",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-score-1",
        "sno": 1061,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The number of points achieved in a game or exam",
        "hindiMeaning": "अंक / स्कोर",
        "englishSentence": "She had a perfect score on the exam.",
        "hindiSentence": "उसने परीक्षा में पूर्ण अंक प्राप्त किए।"
      },
      {
        "id": "hg-score-2",
        "sno": 1062,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A written musical notation",
        "hindiMeaning": "संगीत रचना (स्कोर लिपि)",
        "englishSentence": "He bought the score for the orchestra.",
        "hindiSentence": "उसने ऑर्केस्ट्रा के लिए संगीत रचना खरीदी।"
      }
    ]
  },
  {
    "id": "hg-group-458",
    "word": "Seal",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-seal-1",
        "sno": 1063,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A marine mammal",
        "hindiMeaning": "सील (समुद्री स्तनपायी)",
        "englishSentence": "We spotted a seal basking on the rocks.",
        "hindiSentence": "हमने चट्टानों पर धूप सेकते हुए सील को देखा।"
      },
      {
        "id": "hg-seal-2",
        "sno": 1064,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A closure device, often stamped with an emblem",
        "hindiMeaning": "मुहर / सील",
        "englishSentence": "The envelope bore the official seal.",
        "hindiSentence": "लिफाफे पर आधिकारिक मुहर लगी थी।"
      },
      {
        "id": "hg-seal-3",
        "sno": 1065,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To close or fasten securely",
        "hindiMeaning": "बंद करना / सील करना",
        "englishSentence": "Please seal the package before mailing.",
        "hindiSentence": "मेल करने से पहले कृपया पैकेज सील कर दें।"
      }
    ]
  },
  {
    "id": "hg-group-459",
    "word": "Season",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-season-1",
        "sno": 1072,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "One of the four divisions of the year",
        "hindiMeaning": "मौसम / ऋतु",
        "englishSentence": "Spring is my favorite season.",
        "hindiSentence": "वसंत मेरा पसंदीदा मौसम है।"
      },
      {
        "id": "hg-season-2",
        "sno": 1073,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To add flavor by adding spices or condiments",
        "hindiMeaning": "मसाला मिलाना / स्वाद बढ़ाना / छौंकना",
        "englishSentence": "Season the soup with salt and pepper.",
        "hindiSentence": "सूप में नमक और काली मिर्च मिलाएं।"
      }
    ]
  },
  {
    "id": "hg-group-460",
    "word": "Second",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-second-1",
        "sno": 1066,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Coming immediately after the first",
        "hindiMeaning": "दूसरा / द्वितीय",
        "englishSentence": "She finished second in the race.",
        "hindiSentence": "उसने दौड़ में दूसरा स्थान प्राप्त किया।"
      },
      {
        "id": "hg-second-2",
        "sno": 1067,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A unit of time equal to one sixtieth of a minute",
        "hindiMeaning": "सेकंड",
        "englishSentence": "Wait for ten seconds before opening the oven.",
        "hindiSentence": "ओवन खोलने से पहले दस सेकंड प्रतीक्षा करें।"
      },
      {
        "id": "hg-second-3",
        "sno": 1068,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To formally support a motion or nomination",
        "hindiMeaning": "समर्थन करना (प्रस्ताव का)",
        "englishSentence": "I second the motion to adjourn.",
        "hindiSentence": "मैं स्थगन प्रस्ताव का समर्थन करता हूँ।"
      }
    ]
  },
  {
    "id": "hg-group-461",
    "word": "Section",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-section-1",
        "sno": 1074,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A distinct part or subdivision of something",
        "hindiMeaning": "अनुभाग / खंड",
        "englishSentence": "Read the next section of the chapter.",
        "hindiSentence": "अध्याय का अगला अनुभाग पढ़ें।"
      },
      {
        "id": "hg-section-2",
        "sno": 1075,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To divide into parts",
        "hindiMeaning": "विभाजित करना / हिस्सों में बांटना",
        "englishSentence": "They sectioned the report by topic.",
        "hindiSentence": "उन्होंने रिपोर्ट को विषय अनुसार विभाजित किया।"
      }
    ]
  },
  {
    "id": "hg-group-462",
    "word": "See",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-see-1",
        "sno": 1069,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To perceive with the eyes",
        "hindiMeaning": "देखना",
        "englishSentence": "I see a bird in the tree.",
        "hindiSentence": "मैं पेड़ में एक पक्षी देखता हूँ।"
      },
      {
        "id": "hg-see-2",
        "sno": 1070,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To understand or comprehend",
        "hindiMeaning": "समझना",
        "englishSentence": "Do you see what I mean?",
        "hindiSentence": "क्या तुम समझ रहे हो मेरा क्या मतलब है?"
      },
      {
        "id": "hg-see-3",
        "sno": 1071,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To meet or have a romantic relationship",
        "hindiMeaning": "मिलना / डेट पर जाना",
        "englishSentence": "They have been seeing each other for months.",
        "hindiSentence": "वे महीनों से एक-दूसरे से मिल रहे हैं।"
      }
    ]
  },
  {
    "id": "hg-group-463",
    "word": "Sentence",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-sentence-1",
        "sno": 1076,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A set of words that is complete in itself",
        "hindiMeaning": "वाक्य",
        "englishSentence": "That sentence needs a comma.",
        "hindiSentence": "उस वाक्य में एक अल्पविराम चाहिए।"
      },
      {
        "id": "hg-sentence-2",
        "sno": 1077,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A punishment assigned by a court",
        "hindiMeaning": "सज़ा / कारावास आदेश",
        "englishSentence": "The judge handed down a ten-year sentence.",
        "hindiSentence": "न्यायाधीश ने दस साल की सज़ा सुनाई।"
      }
    ]
  },
  {
    "id": "hg-group-464",
    "word": "Set",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-set-1",
        "sno": 1078,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A group of items or collection",
        "hindiMeaning": "सेट / समूह",
        "englishSentence": "She bought a set of dinnerware.",
        "hindiSentence": "उसने रात के खाने के बर्तन का सेट खरीदा।"
      },
      {
        "id": "hg-set-2",
        "sno": 1079,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To put in a specific place or position",
        "hindiMeaning": "रखना / स्थापित करना",
        "englishSentence": "She set the vase on the table.",
        "hindiSentence": "उसने मेज़ पर फूलदान रखा।"
      },
      {
        "id": "hg-set-3",
        "sno": 1080,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Fixed, established, or arranged",
        "hindiMeaning": "निर्धारित / तय",
        "englishSentence": "We have a set schedule for the project.",
        "hindiSentence": "परियोजना के लिए हमारी निर्धारित समय-सारणी है।"
      }
    ]
  },
  {
    "id": "hg-group-465",
    "word": "Settle",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-settle-1",
        "sno": 1081,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To resolve or reach an agreement",
        "hindiMeaning": "सुलझाना / निपटाना",
        "englishSentence": "They settled their dispute out of court.",
        "hindiSentence": "उन्होंने अपने विवाद को अदालत से बाहर सुलझाया।"
      },
      {
        "id": "hg-settle-2",
        "sno": 1082,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To move to and establish a residence",
        "hindiMeaning": "बसना / निवास करना",
        "englishSentence": "He settled in the countryside after retirement.",
        "hindiSentence": "सेवानिवृत्ति के बाद वह ग्रामीण इलाके में बस गया।"
      },
      {
        "id": "hg-settle-3",
        "sno": 1083,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To pay (a bill or debt)",
        "hindiMeaning": "भुगतान करना / चुकता करना",
        "englishSentence": "Please settle your account by Friday.",
        "hindiSentence": "कृपया शुक्रवार तक अपना बिल भुगतान करें।"
      }
    ]
  },
  {
    "id": "hg-group-466",
    "word": "Sewer",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-sewer-1",
        "sno": 1115,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A person who sews",
        "hindiMeaning": "दर्जी / सिलाई करने वाला",
        "englishSentence": "The sewer stitched the costume flawlessly.",
        "hindiSentence": "दर्जी ने पोशाक को बेदाग सिल दिया।"
      },
      {
        "id": "hg-sewer-2",
        "sno": 1116,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "An underground conduit for wastewater",
        "hindiMeaning": "सीवर / नाली",
        "englishSentence": "They inspected the city sewer for blockages.",
        "hindiSentence": "उन्होंने शहर की नाली में रुकावटों के लिए जांच की।"
      }
    ]
  },
  {
    "id": "hg-group-467",
    "word": "Shade",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-shade-1",
        "sno": 1084,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A region sheltered from direct light",
        "hindiMeaning": "छायादार स्थान / छांव",
        "englishSentence": "We sat in the shade to avoid the sun.",
        "hindiSentence": "हमने धूप से बचने के लिए छायादार स्थान में बैठना चुना।"
      },
      {
        "id": "hg-shade-2",
        "sno": 1085,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A subtle variation of color",
        "hindiMeaning": "रंग की टोन / रंगत",
        "englishSentence": "The painter mixed several shades of blue.",
        "hindiSentence": "चित्रकार ने नीले रंग की कई टोन मिलाई।"
      }
    ]
  },
  {
    "id": "hg-group-468",
    "word": "Shark",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-shark-1",
        "sno": 1117,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A large predatory fish",
        "hindiMeaning": "शार्क मछली",
        "englishSentence": "We saw a shark fin cutting through the waves.",
        "hindiSentence": "हमने लहरों में से निकलती हुई शार्क का पंख देखा।"
      },
      {
        "id": "hg-shark-2",
        "sno": 1118,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A swindler, especially one who cheats at cards",
        "hindiMeaning": "धोखेबाज़ / ताश का जुआरी",
        "englishSentence": "The card shark cleaned out everyone at the table.",
        "hindiSentence": "कार्ड धोखेबाज़ ने मेज़ पर सबकी जेब साफ़ कर दी।"
      },
      {
        "id": "hg-shark-3",
        "sno": 1119,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To swindle or cheat",
        "hindiMeaning": "छल करना / ठगना",
        "englishSentence": "He sharked unsuspecting tourists out of their money.",
        "hindiSentence": "उसने बेखबर पर्यटकों से उनका पैसा छल कर छीन लिया।"
      }
    ]
  },
  {
    "id": "hg-group-469",
    "word": "Shift",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-shift-1",
        "sno": 1120,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A work period in a factory or duty rota",
        "hindiMeaning": "काम की पाली / शिफ्ट",
        "englishSentence": "He works the night shift at the hospital.",
        "hindiSentence": "वह अस्पताल में रात की पाली में काम करता है।"
      },
      {
        "id": "hg-shift-2",
        "sno": 1121,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To change gears in a vehicle",
        "hindiMeaning": "गियर बदलना / स्थान बदलना",
        "englishSentence": "She shifted into second gear as she turned.",
        "hindiSentence": "मोड़ पर उसने दूसरे गियर में बदला।"
      }
    ]
  },
  {
    "id": "hg-group-470",
    "word": "Shore",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-shore-1",
        "sno": 1086,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The land along the edge of a sea or lake",
        "hindiMeaning": "तट / किनारा",
        "englishSentence": "We walked along the shore at sunset.",
        "hindiSentence": "हमने सूर्यास्त पर समुद्र तट के साथ चलना शुरू किया।"
      },
      {
        "id": "hg-shore-2",
        "sno": 1087,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To support or prop up",
        "hindiMeaning": "सहारा देना / टेक लगाना",
        "englishSentence": "They shored up the old wall with wooden beams.",
        "hindiSentence": "उन्होंने लकड़ी की शहतीरों से पुरानी दीवार को सहारा दिया।"
      }
    ]
  },
  {
    "id": "hg-group-471",
    "word": "Sink",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-sink-1",
        "sno": 1088,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To go down below the surface",
        "hindiMeaning": "डूबना",
        "englishSentence": "The ship began to sink after hitting the reef.",
        "hindiSentence": "चट्टान से टकराने के बाद जहाज़ डूबने लगा।"
      },
      {
        "id": "hg-sink-2",
        "sno": 1089,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A basin in a kitchen or bathroom",
        "hindiMeaning": "सिंक / वॉश बेसिन",
        "englishSentence": "Wash your hands in the sink.",
        "hindiSentence": "सिंक में हाथ धोएं।"
      }
    ]
  },
  {
    "id": "hg-group-472",
    "word": "Skirt",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-skirt-1",
        "sno": 1090,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A garment hanging from the waist",
        "hindiMeaning": "स्कर्ट / घाघरा",
        "englishSentence": "She wore a floral skirt to the party.",
        "hindiSentence": "उसने पार्टी में फूलदार स्कर्ट पहनी।"
      },
      {
        "id": "hg-skirt-2",
        "sno": 1091,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To go around the edge of",
        "hindiMeaning": "किनारे से चलना / कतरा कर निकलना",
        "englishSentence": "We skirted the lake on our hike.",
        "hindiSentence": "हमने अपनी ट्रैक पर झील के किनारे से यात्रा की।"
      }
    ]
  },
  {
    "id": "hg-group-473",
    "word": "Slash",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-slash-1",
        "sno": 1092,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To cut with a sweeping stroke",
        "hindiMeaning": "चीरना / काटना",
        "englishSentence": "He slashed the canvas with a knife.",
        "hindiSentence": "उसने चाकू से कैनवास को चीर दिया।"
      },
      {
        "id": "hg-slash-2",
        "sno": 1093,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A strong reduction (e.g., in prices)",
        "hindiMeaning": "कटौती",
        "englishSentence": "They announced a slash in ticket prices.",
        "hindiSentence": "उन्होंने टिकट की कीमतों में भारी कटौती की घोषणा की।"
      }
    ]
  },
  {
    "id": "hg-group-474",
    "word": "Sling",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-sling-1",
        "sno": 1124,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A strap or bandage to support a broken arm",
        "hindiMeaning": "पट्टी / स्लिंग (हाथ का सहारा)",
        "englishSentence": "He wore a sling after breaking his arm.",
        "hindiSentence": "उसने हाथ टूटने के बाद स्लिंग बांधी।"
      },
      {
        "id": "hg-sling-2",
        "sno": 1125,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To throw or hurl with force",
        "hindiMeaning": "फेंकना / उछालना",
        "englishSentence": "He slung his bag over his shoulder and left.",
        "hindiSentence": "उसने अपना बैग कंधे पर फेंककर निकल गया।"
      }
    ]
  },
  {
    "id": "hg-group-475",
    "word": "Slip",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-slip-1",
        "sno": 1122,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A small mistake or oversight",
        "hindiMeaning": "चूक / गलती",
        "englishSentence": "That was just a slip of the tongue.",
        "hindiSentence": "वह सिर्फ ज़ुबानी चूक थी।"
      },
      {
        "id": "hg-slip-2",
        "sno": 1123,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To slide accidentally",
        "hindiMeaning": "फिसलना",
        "englishSentence": "Be careful or you’ll slip on the ice.",
        "hindiSentence": "सावधान रहें, नहीं तो बर्फ पर फिसल सकते हैं।"
      }
    ]
  },
  {
    "id": "hg-group-476",
    "word": "Slump",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-slump-1",
        "sno": 1094,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A sudden decrease (e.g., in sales)",
        "hindiMeaning": "गिरावट / मंदी",
        "englishSentence": "There was a slump in sales last quarter.",
        "hindiSentence": "पिछली तिमाही में बिक्री में भारी गिरावट आई।"
      },
      {
        "id": "hg-slump-2",
        "sno": 1095,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To fall or sink heavily",
        "hindiMeaning": "धड़ाम से गिरना / लुढ़कना",
        "englishSentence": "The stock market slumped after the announcement.",
        "hindiSentence": "घोषणा के बाद शेयर बाज़ार धड़ाम से गिर गया।"
      }
    ]
  },
  {
    "id": "hg-group-477",
    "word": "Smell",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-smell-1",
        "sno": 1096,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To perceive odor",
        "hindiMeaning": "सूँघना / महकना",
        "englishSentence": "The roses smell wonderful.",
        "hindiSentence": "गुलाब से अद्भुत सुगंध आती है।"
      },
      {
        "id": "hg-smell-2",
        "sno": 1097,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "An odor, pleasant or unpleasant",
        "hindiMeaning": "गंध / महक / बदबू",
        "englishSentence": "There was a foul smell in the basement.",
        "hindiSentence": "तहखाने में बदबूदार गंध थी।"
      }
    ]
  },
  {
    "id": "hg-group-478",
    "word": "Sole",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-sole-1",
        "sno": 1098,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Only; single",
        "hindiMeaning": "एकमात्र / अकेला",
        "englishSentence": "She is the sole survivor of the crash.",
        "hindiSentence": "वह दुर्घटना की एकमात्र जीवित बची है।"
      },
      {
        "id": "hg-sole-2",
        "sno": 1099,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The bottom surface of the foot or shoe",
        "hindiMeaning": "तलवा (पैर या जूते का)",
        "englishSentence": "The sole of my shoe is worn out.",
        "hindiSentence": "मेरे जूते का तलवा घिस गया है।"
      }
    ]
  },
  {
    "id": "hg-group-479",
    "word": "Sort",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-sort-1",
        "sno": 1100,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A category or type",
        "hindiMeaning": "प्रकार / किस्म",
        "englishSentence": "What sort of music do you like?",
        "hindiSentence": "आपको किस प्रकार का संगीत पसंद है?"
      },
      {
        "id": "hg-sort-2",
        "sno": 1101,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To arrange or classify",
        "hindiMeaning": "वर्गबद्ध करना / छांटना",
        "englishSentence": "Please sort these files by date.",
        "hindiSentence": "कृपया इन फाइलों को तारीख के अनुसार वर्गबद्ध करें।"
      }
    ]
  },
  {
    "id": "hg-group-480",
    "word": "Spare",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-spare-1",
        "sno": 1126,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Extra; not currently in use",
        "hindiMeaning": "अतिरिक्त / रिज़र्व",
        "englishSentence": "We have a spare key if you need one.",
        "hindiSentence": "हमारे पास आपके लिए अतिरिक्त चाबी है।"
      },
      {
        "id": "hg-spare-2",
        "sno": 1127,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To refrain from harming; to grant mercy",
        "hindiMeaning": "बख्श देना / क्षमा करना",
        "englishSentence": "Please spare me the details.",
        "hindiSentence": "कृपया मुझे विस्तृत विवरण सुनाने से बख्श दें।"
      }
    ]
  },
  {
    "id": "hg-group-481",
    "word": "Spell",
    "sensesCount": 4,
    "senses": [
      {
        "id": "hg-spell-1",
        "sno": 1128,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A charm or incantation",
        "hindiMeaning": "जादू-टोना / मंत्र",
        "englishSentence": "The witch cast a spell over the forest.",
        "hindiSentence": "चुड़ैल ने जंगल पर जादू-टोना किया।"
      },
      {
        "id": "hg-spell-2",
        "sno": 1129,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A short period of a particular condition",
        "hindiMeaning": "अवधि / दौरा",
        "englishSentence": "He had a brief spell of illness last month.",
        "hindiSentence": "पिछले महीने उसे थोड़ी बीमारी की अवधि हुई।"
      },
      {
        "id": "hg-spell-3",
        "sno": 1130,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To write or name the letters of a word in order",
        "hindiMeaning": "वर्तनी करना / स्पेलिंग बोलना",
        "englishSentence": "Can you spell “accommodate”?",
        "hindiSentence": "क्या आप “accommodate” की वर्तनी बता सकते हैं?"
      },
      {
        "id": "hg-spell-4",
        "sno": 1131,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To put someone on duty in place of another",
        "hindiMeaning": "ड्यूटी बदलना / राहत देना",
        "englishSentence": "I’ll spell you on reception at noon.",
        "hindiSentence": "मैं दोपहर में रिसेप्शन पर आपकी ड्यूटी संभालूँगा।"
      }
    ]
  },
  {
    "id": "hg-group-482",
    "word": "Spring",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-spring-1",
        "sno": 1102,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The season between winter and summer",
        "hindiMeaning": "वसंत ऋतु",
        "englishSentence": "Flowers bloom in spring.",
        "hindiSentence": "वसंत में फूल खिलते हैं।"
      },
      {
        "id": "hg-spring-2",
        "sno": 1103,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To jump or leap suddenly",
        "hindiMeaning": "उछलना / कूदना",
        "englishSentence": "The cat sprang onto the windowsill.",
        "hindiSentence": "बिल्ली खिड़की की पेटी पर उछल गई।"
      }
    ]
  },
  {
    "id": "hg-group-483",
    "word": "Staff",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-staff-1",
        "sno": 1132,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The employees of an organization",
        "hindiMeaning": "कर्मचारी वर्ग / स्टाफ",
        "englishSentence": "The hospital staff worked around the clock.",
        "hindiSentence": "अस्पताल के कर्मचारी चौबीसों घंटे काम करते रहे।"
      },
      {
        "id": "hg-staff-2",
        "sno": 1133,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A long stick used as a support or symbol",
        "hindiMeaning": "छड़ी / लाठी",
        "englishSentence": "He carried a walking staff on the trail.",
        "hindiSentence": "उसने ट्रेल पर चलने के लिए एक वॉकिंग स्टाफ लिया।"
      }
    ]
  },
  {
    "id": "hg-group-484",
    "word": "Stalk",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-stalk-1",
        "sno": 1140,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The main stem of a plant",
        "hindiMeaning": "तना / डंठल",
        "englishSentence": "The tomato plant’s stalk was covered in flowers.",
        "hindiSentence": "टमाटर के पौधे का तना फूलों से ढका हुआ था।"
      },
      {
        "id": "hg-stalk-2",
        "sno": 1141,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To follow stealthily",
        "hindiMeaning": "पीछा करना / छिपकर शिकार करना",
        "englishSentence": "He stalked the deer through the woods.",
        "hindiSentence": "वह शिकार को जंगल में चोरी-छिपे पीछा करता रहा।"
      }
    ]
  },
  {
    "id": "hg-group-485",
    "word": "Stamp",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-stamp-1",
        "sno": 1142,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A small adhesive label for postage",
        "hindiMeaning": "डाक टिकट",
        "englishSentence": "She affixed a stamp to the envelope.",
        "hindiSentence": "उसने लिफाफे पर डाक टिकट चिपका दिया।"
      },
      {
        "id": "hg-stamp-2",
        "sno": 1143,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A device used to imprint a design",
        "hindiMeaning": "मोहर लगाने का यंत्र / स्टाम्प",
        "englishSentence": "The official stamp was missing from the document.",
        "hindiSentence": "दस्तावेज़ पर आधिकारिक मोहर लगाने का यंत्र गायब था।"
      },
      {
        "id": "hg-stamp-3",
        "sno": 1144,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To bring down one’s foot heavily",
        "hindiMeaning": "पैर पटकना / ज़ोर से कदम रखना",
        "englishSentence": "He stamped his foot in frustration.",
        "hindiSentence": "उसने नाराज़गी में ज़ोर से पैर पटका।"
      }
    ]
  },
  {
    "id": "hg-group-486",
    "word": "Stand",
    "sensesCount": 4,
    "senses": [
      {
        "id": "hg-stand-1",
        "sno": 1136,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A small booth or stall",
        "hindiMeaning": "बूथ / स्टॉल / ठेला",
        "englishSentence": "They bought lemonade at the roadside stand.",
        "hindiSentence": "उन्होंने सड़क किनारे के बूथ से नींबू पानी खरीदा।"
      },
      {
        "id": "hg-stand-2",
        "sno": 1137,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A position or opinion",
        "hindiMeaning": "रुख / दृष्टिकोण / स्थिति",
        "englishSentence": "What is your stand on the new policy?",
        "hindiSentence": "नई नीति पर आपका रुख क्या है?"
      },
      {
        "id": "hg-stand-3",
        "sno": 1138,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To endure or withstand",
        "hindiMeaning": "सहना / बर्दाश्त करना",
        "englishSentence": "I can’t stand the heat anymore.",
        "hindiSentence": "अब मैं गर्मी सहन नहीं कर सकता।"
      },
      {
        "id": "hg-stand-4",
        "sno": 1139,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To rise to one’s feet",
        "hindiMeaning": "उठना / खड़े होना",
        "englishSentence": "Everyone stood when the principal entered.",
        "hindiSentence": "प्रधानाचार्य के प्रवेश करते ही सभी खड़े हो गए।"
      }
    ]
  },
  {
    "id": "hg-group-487",
    "word": "Staple",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-staple-1",
        "sno": 1134,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A principal or essential item",
        "hindiMeaning": "मुख्य वस्तु / प्रधान आहार",
        "englishSentence": "Rice is a staple food in many countries.",
        "hindiSentence": "कई देशों में चावल मुख्य आहार है।"
      },
      {
        "id": "hg-staple-2",
        "sno": 1135,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To fasten with a staple",
        "hindiMeaning": "स्टेपल करना / नत्थी करना",
        "englishSentence": "Please staple these pages together.",
        "hindiSentence": "कृपया इन पृष्ठों को स्टेपल से जोड़ दें।"
      }
    ]
  },
  {
    "id": "hg-group-488",
    "word": "Steer",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-steer-1",
        "sno": 1148,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To guide or direct the course of",
        "hindiMeaning": "मार्गदर्शन करना / गाड़ी या नाव मोड़ना",
        "englishSentence": "She steered the boat through the channel.",
        "hindiSentence": "उसने नाव को जल मार्ग से मार्गदर्शित किया।"
      },
      {
        "id": "hg-steer-2",
        "sno": 1149,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A castrated male cattle",
        "hindiMeaning": "बधिया बैल / गोश्त के लिए पाला गया बछड़ा",
        "englishSentence": "The rancher raised two steers for beef.",
        "hindiSentence": "रैंचर ने गोश्त के लिए दो बछड़े पाले।"
      }
    ]
  },
  {
    "id": "hg-group-489",
    "word": "Stem",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-stem-1",
        "sno": 1145,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The main supporting structure of a plant",
        "hindiMeaning": "तना / डंठल",
        "englishSentence": "The rose’s stem was covered in thorns.",
        "hindiSentence": "गुलाब के तने पर कांटे लगे हुए थे।"
      },
      {
        "id": "hg-stem-2",
        "sno": 1146,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To originate from; to arise",
        "hindiMeaning": "उत्पन्न होना / आरंभ होना",
        "englishSentence": "Many English words stem from Latin.",
        "hindiSentence": "कई अंग्रेज़ी शब्द लैटिन से उत्पन्न होते हैं।"
      },
      {
        "id": "hg-stem-3",
        "sno": 1147,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To stop or restrict the flow of",
        "hindiMeaning": "रोकना / प्रवाह थामना",
        "englishSentence": "They tried to stem the floodwaters with sandbags.",
        "hindiSentence": "उन्होंने रेत के थैलों से बाढ़ के पानी को रोकने की कोशिश की।"
      }
    ]
  },
  {
    "id": "hg-group-490",
    "word": "Stern",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-stern-1",
        "sno": 1150,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Strict and unyielding",
        "hindiMeaning": "सख्त / कड़क / कठोर",
        "englishSentence": "The teacher’s stern look silenced the class.",
        "hindiSentence": "शिक्षक की कड़क नज़र ने कक्षा को चुप करा दिया।"
      },
      {
        "id": "hg-stern-2",
        "sno": 1151,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The rear part of a boat",
        "hindiMeaning": "नाव का पिछला भाग",
        "englishSentence": "They sat at the stern of the yacht.",
        "hindiSentence": "वे यॉट के पिछले भाग में बैठे।"
      }
    ]
  },
  {
    "id": "hg-group-491",
    "word": "Stick",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-stick-1",
        "sno": 1104,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A thin piece of wood",
        "hindiMeaning": "लकड़ी की डंडी / छड़ी",
        "englishSentence": "He carved a toy boat from a stick.",
        "hindiSentence": "उसने लकड़ी की डंडी से खिलौना नाव बनाई।"
      },
      {
        "id": "hg-stick-2",
        "sno": 1105,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To adhere or cling",
        "hindiMeaning": "चिपकना / चिपकाना",
        "englishSentence": "The label sticks better when wet.",
        "hindiSentence": "गीले होने पर लेबल अच्छी तरह से चिपकता है।"
      }
    ]
  },
  {
    "id": "hg-group-492",
    "word": "Stone",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-stone-1",
        "sno": 1152,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A small hard piece of mineral material",
        "hindiMeaning": "पत्थर / कंकड़",
        "englishSentence": "He skipped stones across the lake.",
        "hindiSentence": "उसने झील पर पत्थर उछाले।"
      },
      {
        "id": "hg-stone-2",
        "sno": 1153,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The pit of a fruit",
        "hindiMeaning": "गुठली",
        "englishSentence": "She removed the stone from the cherry.",
        "hindiSentence": "उसने चेरी से गुठली निकाल दी।"
      }
    ]
  },
  {
    "id": "hg-group-493",
    "word": "Store",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-store-1",
        "sno": 1106,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A shop or place of sale",
        "hindiMeaning": "दुकान / भंडार",
        "englishSentence": "I stopped by the store for some milk.",
        "hindiSentence": "मैं दूध लेने के लिए दुकान गया।"
      },
      {
        "id": "hg-store-2",
        "sno": 1107,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To put away for future use",
        "hindiMeaning": "संग्रह करना / जमा करना",
        "englishSentence": "She stores her winter clothes in the attic.",
        "hindiSentence": "वह अपनी सर्दियों के कपड़े अटारी में संग्रह करती है।"
      }
    ]
  },
  {
    "id": "hg-group-494",
    "word": "Stress",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-stress-1",
        "sno": 1154,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "Emphasis or importance given to something",
        "hindiMeaning": "ज़ोर / बल / महत्व",
        "englishSentence": "Put stress on the first syllable of “record.”",
        "hindiSentence": "“record” के पहले अक्षर पर ज़ोर डालें।"
      },
      {
        "id": "hg-stress-2",
        "sno": 1155,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "Mental or physical pressure or tension",
        "hindiMeaning": "तनाव / मानसिक दबाव",
        "englishSentence": "He’s under a lot of stress at work.",
        "hindiSentence": "वह कार्यस्थल पर बहुत तनाव में है।"
      }
    ]
  },
  {
    "id": "hg-group-495",
    "word": "Strike",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-strike-1",
        "sno": 1108,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To hit forcibly",
        "hindiMeaning": "वार करना / प्रहार करना",
        "englishSentence": "He struck the gong with a mallet.",
        "hindiSentence": "उसने हथौड़े से घंटी पर वार किया।"
      },
      {
        "id": "hg-strike-2",
        "sno": 1109,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A labor protest by workers refusing to work",
        "hindiMeaning": "हड़ताल",
        "englishSentence": "The workers called a strike for better wages.",
        "hindiSentence": "श्रमिकों ने बेहतर वेतन के लिए हड़ताल की।"
      }
    ]
  },
  {
    "id": "hg-group-496",
    "word": "Strip",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-strip-1",
        "sno": 1110,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A long narrow piece",
        "hindiMeaning": "पट्टी / धारी",
        "englishSentence": "He cut a strip of cloth for the patch.",
        "hindiSentence": "उसने पैच के लिए कपड़े की पट्टी काटी।"
      },
      {
        "id": "hg-strip-2",
        "sno": 1111,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To remove covering or outer layer",
        "hindiMeaning": "उतारना / छीलना",
        "englishSentence": "They stripped the wallpaper before painting.",
        "hindiSentence": "उन्होंने पेंट करने से पहले वॉलपेपर उतारा।"
      }
    ]
  },
  {
    "id": "hg-group-497",
    "word": "Subject",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-subject-1",
        "sno": 1112,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A topic or theme",
        "hindiMeaning": "विषय / विषय-वस्तु",
        "englishSentence": "The subject of her thesis is renewable energy.",
        "hindiSentence": "उसके शोध का विषय अक्षय ऊर्जा है।"
      },
      {
        "id": "hg-subject-2",
        "sno": 1113,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A citizen under a sovereign",
        "hindiMeaning": "प्रजा / नागरिक",
        "englishSentence": "He was a British subject until 1947.",
        "hindiSentence": "वह 1947 तक ब्रिटिश प्रजा था।"
      },
      {
        "id": "hg-subject-3",
        "sno": 1114,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To expose or make liable to something",
        "hindiMeaning": "अधीन करना / सहने पर विवश करना",
        "englishSentence": "The ruler subjected the province to his authority.",
        "hindiSentence": "शासक ने प्रांत को अपनी सत्ता के अधीन कर दिया।"
      }
    ]
  },
  {
    "id": "hg-group-498",
    "word": "Suit",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-suit-1",
        "sno": 1156,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A set of clothes for a particular occasion",
        "hindiMeaning": "सूट / पोशाक",
        "englishSentence": "He wore a suit to the wedding.",
        "hindiSentence": "उसने शादी में सूट पहना।"
      },
      {
        "id": "hg-suit-2",
        "sno": 1157,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A legal action filed in court",
        "hindiMeaning": "मुकदमा / वाद",
        "englishSentence": "The company filed a suit against its former partner.",
        "hindiSentence": "कंपनी ने अपने पूर्व साझेदार के खिलाफ मुकदमा दायर किया।"
      },
      {
        "id": "hg-suit-3",
        "sno": 1158,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To be appropriate or acceptable",
        "hindiMeaning": "सूट करना / अनुकूल होना",
        "englishSentence": "Does this time suit you?",
        "hindiSentence": "क्या यह समय आपके लिए उपयुक्त है?"
      }
    ]
  },
  {
    "id": "hg-group-499",
    "word": "Swell",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-swell-1",
        "sno": 1159,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To expand in size or volume",
        "hindiMeaning": "फूलना / सूजना / बढ़ना",
        "englishSentence": "Her ankle swelled after she twisted it.",
        "hindiSentence": "मोड़ आने पर उसका टखना सूज गया।"
      },
      {
        "id": "hg-swell-2",
        "sno": 1160,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A long wave on the surface of the ocean",
        "hindiMeaning": "समुद्री लहर / तरंग",
        "englishSentence": "Surfers waited for the morning swell.",
        "hindiSentence": "सर्फर्स सुबह की समुद्री लहर का इंतज़ार करते रहे।"
      },
      {
        "id": "hg-swell-3",
        "sno": 1161,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Excellent; very good (slang)",
        "hindiMeaning": "शानदार / बेहतरीन",
        "englishSentence": "That concert was really swell!",
        "hindiSentence": "वह कॉन्सर्ट वाकई शानदार था!"
      }
    ]
  },
  {
    "id": "hg-group-500",
    "word": "Table",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-table-1",
        "sno": 1192,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A piece of furniture with a flat top and legs",
        "hindiMeaning": "मेज़",
        "englishSentence": "We set the vase on the table.",
        "hindiSentence": "हमने मेज़ पर फूलदान रखा।"
      },
      {
        "id": "hg-table-2",
        "sno": 1193,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To postpone consideration of (a proposal, issue, etc.)",
        "hindiMeaning": "टाल देना / स्थगित करना",
        "englishSentence": "They tabled the discussion until next week.",
        "hindiSentence": "उन्होंने चर्चा को अगले सप्ताह तक स्थगित कर दिया।"
      }
    ]
  },
  {
    "id": "hg-group-501",
    "word": "Tack",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-tack-1",
        "sno": 1162,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A small nail with a broad, flat head",
        "hindiMeaning": "कील / पिन",
        "englishSentence": "He used a tack to pin the notice to the board.",
        "hindiSentence": "उसने बोर्ड पर नोटिस लगाने के लिए एक पिन लगाई।"
      },
      {
        "id": "hg-tack-2",
        "sno": 1163,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A course of action or policy",
        "hindiMeaning": "तरीका / कार्य-योजना",
        "englishSentence": "They changed tack when the negotiations stalled.",
        "hindiSentence": "जब बातचीत अटकी, उन्होंने रास्ता बदल लिया।"
      }
    ]
  },
  {
    "id": "hg-group-502",
    "word": "Tackle",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-tackle-1",
        "sno": 1194,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "An act of stopping the ball in football or rugby",
        "hindiMeaning": "टैकल (खेल में रोकना)",
        "englishSentence": "He made a crucial tackle to save the game.",
        "hindiSentence": "उसने मैच बचाने के लिए एक महत्वपूर्ण टैकल किया।"
      },
      {
        "id": "hg-tackle-2",
        "sno": 1195,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To confront or take on a challenge or opponent",
        "hindiMeaning": "सामना करना / निपटना",
        "englishSentence": "We need to tackle this problem immediately.",
        "hindiSentence": "हमें इस समस्या का तुरंत सामना करना होगा।"
      }
    ]
  },
  {
    "id": "hg-group-503",
    "word": "Tail",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-tail-1",
        "sno": 1164,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "The rear part of an animal",
        "hindiMeaning": "पूंछ",
        "englishSentence": "The cat flicked its tail.",
        "hindiSentence": "बिल्ली ने अपनी पूंछ हिलाई।"
      },
      {
        "id": "hg-tail-2",
        "sno": 1165,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To follow or track secretly",
        "hindiMeaning": "पीछा करना / जासूसी करना",
        "englishSentence": "The detective tailed the suspect all day.",
        "hindiSentence": "जासूस ने संदिग्ध का पूरा दिन पीछा किया।"
      }
    ]
  },
  {
    "id": "hg-group-504",
    "word": "Tailor",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-tailor-1",
        "sno": 1166,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A person whose occupation is making or altering clothes",
        "hindiMeaning": "दर्जी",
        "englishSentence": "The tailor fitted the suit perfectly.",
        "hindiSentence": "दर्जी ने सूट का नाप बिल्कुल सही किया।"
      },
      {
        "id": "hg-tailor-2",
        "sno": 1167,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To adapt or make to suit a particular need",
        "hindiMeaning": "अनुकूल बनाना / ज़रूरत के अनुसार ढालना",
        "englishSentence": "We tailored the program to fit each student’s needs.",
        "hindiSentence": "हमने प्रत्येक छात्र की आवश्यकताओं के अनुसार कार्यक्रम अनुकूलित किया।"
      }
    ]
  },
  {
    "id": "hg-group-505",
    "word": "Take",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-take-1",
        "sno": 1196,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To get into one’s hands or possession",
        "hindiMeaning": "लेना / ग्रहण करना",
        "englishSentence": "Please take one cookie.",
        "hindiSentence": "कृपया एक कुकी ले लीजिए।"
      },
      {
        "id": "hg-take-2",
        "sno": 1197,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A particular recorded performance or viewpoint",
        "hindiMeaning": "रिकॉर्डिंग / दृष्टिकोण (टेक)",
        "englishSentence": "That was my favorite take of the song.",
        "hindiSentence": "वह गाने की मेरी पसंदीदा रिकॉर्डिंग (टेक) थी।"
      }
    ]
  },
  {
    "id": "hg-group-506",
    "word": "Tap",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-tap-1",
        "sno": 1168,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A device controlling the flow of liquid from a pipe",
        "hindiMeaning": "नल / टोंटी",
        "englishSentence": "Turn off the tap to save water.",
        "hindiSentence": "पानी बचाने के लिए नल बंद करें।"
      },
      {
        "id": "hg-tap-2",
        "sno": 1169,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To make a light, repeated touch",
        "hindiMeaning": "थपथपाना / हल्की टक्कर देना",
        "englishSentence": "He tapped me on the shoulder to get my attention.",
        "hindiSentence": "उसने मेरा ध्यान आकर्षित करने के लिए कंधे पर थपथपाया।"
      }
    ]
  },
  {
    "id": "hg-group-507",
    "word": "Tape",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-tape-1",
        "sno": 1170,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A narrow strip of material, often adhesive",
        "hindiMeaning": "टेप / चिपकने वाली पट्टी",
        "englishSentence": "Use tape to seal the box.",
        "hindiSentence": "बॉक्स सील करने के लिए टेप का उपयोग करें।"
      },
      {
        "id": "hg-tape-2",
        "sno": 1171,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To record sound or images",
        "hindiMeaning": "रिकॉर्ड करना / टेप करना",
        "englishSentence": "They taped the concert for later broadcast.",
        "hindiSentence": "उन्होंने बाद में प्रसारण के लिए कॉन्सर्ट रिकॉर्ड किया।"
      }
    ]
  },
  {
    "id": "hg-group-508",
    "word": "Tear",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-tear-1",
        "sno": 1172,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A drop of clear, salty liquid from the eye",
        "hindiMeaning": "आँसू",
        "englishSentence": "A single tear rolled down her cheek.",
        "hindiSentence": "उसके गाल पर एक आँसू लुढ़क गया।"
      },
      {
        "id": "hg-tear-2",
        "sno": 1173,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To rip or pull apart",
        "hindiMeaning": "फाड़ना / चीरना",
        "englishSentence": "He tore the letter into pieces.",
        "hindiSentence": "उसने पत्र को टुकड़ों में फाड़ दिया।"
      }
    ]
  },
  {
    "id": "hg-group-509",
    "word": "Tender",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-tender-1",
        "sno": 1174,
        "partOfSpeech": "Adjective",
        "posCategory": "adj",
        "englishMeaning": "Gentle and caring",
        "hindiMeaning": "कोमल / संवेदनशील / दयालु",
        "englishSentence": "She gave him a tender look.",
        "hindiSentence": "उसने उसे कोमल दृष्टि दी।"
      },
      {
        "id": "hg-tender-2",
        "sno": 1175,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To offer formally",
        "hindiMeaning": "प्रस्तावित करना / सौंपना (इस्तीफा आदि)",
        "englishSentence": "They tendered their resignation yesterday.",
        "hindiSentence": "उन्होंने कल अपना इस्तीफा सौंपा।"
      }
    ]
  },
  {
    "id": "hg-group-510",
    "word": "Term",
    "sensesCount": 3,
    "senses": [
      {
        "id": "hg-term-1",
        "sno": 1198,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A fixed or limited period",
        "hindiMeaning": "अवधि / कार्यकाल",
        "englishSentence": "His term as president lasts four years.",
        "hindiSentence": "राष्ट्रपति के रूप में उनका कार्यकाल चार साल का है।"
      },
      {
        "id": "hg-term-2",
        "sno": 1199,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A word or expression",
        "hindiMeaning": "शब्द / पारिभाषिक पद",
        "englishSentence": "Look up the term in the dictionary.",
        "hindiSentence": "शब्दकोश में उस शब्द को देखें।"
      },
      {
        "id": "hg-term-3",
        "sno": 1200,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To call by a particular name or designation",
        "hindiMeaning": "कहना / नामकरण करना / करार देना",
        "englishSentence": "They term that behavior unacceptable.",
        "hindiSentence": "वे उस व्यवहार को अस्वीकार्य कहते हैं।"
      }
    ]
  },
  {
    "id": "hg-group-511",
    "word": "Test",
    "sensesCount": 1,
    "senses": [
      {
        "id": "hg-test-1",
        "sno": 1201,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "An examination of knowledge or ability",
        "hindiMeaning": "परीक्षा / परीक्षण",
        "englishSentence": "The math test is scheduled for Friday.",
        "hindiSentence": "गणित की परीक्षा शुक्रवार को निर्धारित है।"
      }
    ]
  },
  {
    "id": "hg-group-512",
    "word": "Tire",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-tire-1",
        "sno": 1176,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A rubber covering for a wheel",
        "hindiMeaning": "टायर",
        "englishSentence": "The car needs a new tire.",
        "hindiSentence": "कार को नए टायर की ज़रूरत है।"
      },
      {
        "id": "hg-tire-2",
        "sno": 1177,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To become weary",
        "hindiMeaning": "थकना / ऊब जाना",
        "englishSentence": "I tire easily when I run long distances.",
        "hindiSentence": "लंबी दूरी तक दौड़ने से मैं आसानी से थक जाता हूँ।"
      }
    ]
  },
  {
    "id": "hg-group-513",
    "word": "Toast",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-toast-1",
        "sno": 1178,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "Sliced bread browned by heat",
        "hindiMeaning": "टोस्ट (सिका हुआ ब्रेड)",
        "englishSentence": "She buttered her toast.",
        "hindiSentence": "उसने अपने टोस्ट पर मक्खन लगाया।"
      },
      {
        "id": "hg-toast-2",
        "sno": 1179,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To make a toast in honor of someone",
        "hindiMeaning": "जाम टकराना / जयकार करना / सम्मान में पीना",
        "englishSentence": "They toasted the bride and groom.",
        "hindiSentence": "उन्होंने दूल्हा-दुल्हन के लिए जयकार की।"
      }
    ]
  },
  {
    "id": "hg-group-514",
    "word": "Train",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-train-1",
        "sno": 1180,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A series of connected vehicles on rails",
        "hindiMeaning": "ट्रेन / रेलगाड़ी",
        "englishSentence": "The train departed at noon.",
        "hindiSentence": "ट्रेन दोपहर में रवाना हुई।"
      },
      {
        "id": "hg-train-2",
        "sno": 1181,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To teach or develop skills",
        "hindiMeaning": "प्रशिक्षित करना / सिखाना",
        "englishSentence": "She trained the new employees.",
        "hindiSentence": "उसने नए कर्मचारियों को प्रशिक्षित किया।"
      }
    ]
  },
  {
    "id": "hg-group-515",
    "word": "Trash",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-trash-1",
        "sno": 1182,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "Waste material; garbage",
        "hindiMeaning": "कचरा / कूड़ा",
        "englishSentence": "Please take out the trash.",
        "hindiSentence": "कृपया कचरा बाहर निकाल दें।"
      },
      {
        "id": "hg-trash-2",
        "sno": 1183,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To discard or treat as worthless",
        "hindiMeaning": "फेंक देना / तबाह करना",
        "englishSentence": "They trashed the old documents.",
        "hindiSentence": "उन्होंने पुराने दस्तावेज़ फेंक दिए।"
      }
    ]
  },
  {
    "id": "hg-group-516",
    "word": "Treat",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-treat-1",
        "sno": 1184,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To act or behave toward someone in a specified way",
        "hindiMeaning": "व्यवहार करना / बर्ताव करना",
        "englishSentence": "They treated us like family.",
        "hindiSentence": "उन्होंने हमारे साथ परिवार जैसा व्यवहार किया।"
      },
      {
        "id": "hg-treat-2",
        "sno": 1185,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "An event or item giving great pleasure",
        "hindiMeaning": "आनंददायक चीज़ / दावत / विशेष उपहार",
        "englishSentence": "Ice cream is a special treat on hot days.",
        "hindiSentence": "गर्म दिनों में आइसक्रीम विशेष उपहार होती है।"
      }
    ]
  },
  {
    "id": "hg-group-517",
    "word": "Trim",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-trim-1",
        "sno": 1186,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To make neat by cutting away irregular parts",
        "hindiMeaning": "छाँटना / ट्रिम करना",
        "englishSentence": "She trimmed the hedge neatly.",
        "hindiSentence": "उसने बाड़ को खूबसूरती से ट्रिम किया।"
      },
      {
        "id": "hg-trim-2",
        "sno": 1187,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "Decoration of an edge or border",
        "hindiMeaning": "किनारे की सजावट / गोट",
        "englishSentence": "The dress had lace trim at the hem.",
        "hindiSentence": "पोशाक के किनारे फीते की सजावट थी।"
      }
    ]
  },
  {
    "id": "hg-group-518",
    "word": "Trip",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-trip-1",
        "sno": 1188,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A journey or excursion",
        "hindiMeaning": "यात्रा / सैर",
        "englishSentence": "Our family trip was unforgettable.",
        "hindiSentence": "हमारे परिवार की यात्रा अविस्मरणीय थी।"
      },
      {
        "id": "hg-trip-2",
        "sno": 1189,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To stumble or momentarily lose one’s footing",
        "hindiMeaning": "ठोकर खाना / लड़खड़ाना",
        "englishSentence": "She tripped over the curb and fell.",
        "hindiSentence": "वह किनारे पर ठोकर खाकर गिर पड़ी।"
      }
    ]
  },
  {
    "id": "hg-group-519",
    "word": "Turn",
    "sensesCount": 2,
    "senses": [
      {
        "id": "hg-turn-1",
        "sno": 1190,
        "partOfSpeech": "Noun",
        "posCategory": "noun",
        "englishMeaning": "A change in direction or sequence",
        "hindiMeaning": "मोड़ / बारी",
        "englishSentence": "It’s your turn to speak.",
        "hindiSentence": "आपकी बोलने की बारी है।"
      },
      {
        "id": "hg-turn-2",
        "sno": 1191,
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To become in a certain state",
        "hindiMeaning": "हो जाना / बदलना",
        "englishSentence": "The milk has turned sour.",
        "hindiSentence": "दूध खट्टा हो गया है।"
      }
    ]
  }
];
