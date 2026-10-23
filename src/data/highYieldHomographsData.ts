// ============================================================================
// HIGH-YIELD HOMOGRAPHS (समान वर्तनी, भिन्न अर्थ)
// Curated for SSC CGL, CHSL, CPO, CDS, NDA & Banking Exams
// Source: RBE Officer Batch (Shubham Jain)
// Total Groups: 69
// Total Entries: 169
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
        "partOfSpeech": "Verb",
        "posCategory": "verb",
        "englishMeaning": "To break without a complete separation of parts, or to solve a code/exam",
        "hindiMeaning": "चटकना / तोड़ना / परीक्षा पास करना",
        "englishSentence": "He worked hard to crack the SSC exam.",
        "hindiSentence": "उसने एसएससी परीक्षा पास करने के लिए कड़ी मेहनत की।"
      }
    ]
  }
];
