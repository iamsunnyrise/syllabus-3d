// 89 THEME-BASED IDIOMS & PHRASES CURRICULUM
// Complete 89 Themes extracted from Master English Curriculum for SSC CGL, CHSL, CPO, MTS & CDS

export interface IdiomTheme {
  id: number;
  title: string;
  category: string;
  hindiTitle: string;
  description: string;
  iconName: string;
  accentColor: string;
  sampleKeywords: string[];
}

export const IDIOM_THEME_CATEGORIES = [
  'All',
  'Effort & Career',
  'Wealth & Fortune',
  'Trust & Deception',
  'Social & Relationships',
  'Emotions & Feelings',
  'Speech & Communication',
  'Wisdom, Mind & Learning',
  'Time, Change & Routine',
  'Nature, Health & Food',
  'Power, Law & Conflict',
  'Life & Miscellaneous'
] as const;

export const IDIOM_THEMES_DATA: IdiomTheme[] = [
  {
    id: 1,
    title: "Hard Work & Effort",
    category: "Effort & Career",
    hindiTitle: "कड़ी मेहनत और प्रयास",
    description: "Idioms describing relentless toil, burning midnight oil, sweat, and tireless determination.",
    iconName: "Hammer",
    accentColor: "from-amber-500 to-orange-600",
    sampleKeywords: ["Burn the midnight oil", "Sweat blood", "Put shoulder to wheel", "Go the extra mile"]
  },
  {
    id: 2,
    title: "Success & Achievement",
    category: "Effort & Career",
    hindiTitle: "सफलता और उपलब्धि",
    description: "Idioms representing triumphant victories, reaching milestones, and coming out with flying colors.",
    iconName: "Trophy",
    accentColor: "from-emerald-500 to-teal-600",
    sampleKeywords: ["With flying colors", "Feather in one's cap", "Hit the jackpot", "Bear the palm"]
  },
  {
    id: 3,
    title: "Failure & Setbacks",
    category: "Effort & Career",
    hindiTitle: "असफलता और झटका",
    description: "Expressions capturing disappointment, missing targets, facing downfalls, and dashed hopes.",
    iconName: "TrendingDown",
    accentColor: "from-rose-500 to-red-600",
    sampleKeywords: ["Bite the dust", "Flash in the pan", "Fall flat", "Go down in flames"]
  },
  {
    id: 4,
    title: "Deception & Lies",
    category: "Trust & Deception",
    hindiTitle: "धोखा और झूठ",
    description: "Idioms for bad eggs, hypocrites, wolves in sheep's clothing, and deceitful tricks.",
    iconName: "EyeOff",
    accentColor: "from-red-500 to-rose-700",
    sampleKeywords: ["A Bad Egg", "Wolf in sheep's clothing", "Pull wool over eyes", "Crocodile tears"]
  },
  {
    id: 5,
    title: "Truth & Honesty",
    category: "Trust & Deception",
    hindiTitle: "सच्चाई और ईमानदारी",
    description: "Phrases denoting integrity, forthright behavior, cards on the table, and transparent dealings.",
    iconName: "ShieldCheck",
    accentColor: "from-blue-500 to-indigo-600",
    sampleKeywords: ["Above board", "Call a spade a spade", "Lay cards on table", "Straight from the shoulder"]
  },
  {
    id: 6,
    title: "Money & Wealth",
    category: "Wealth & Fortune",
    hindiTitle: "धन और समृद्धि",
    description: "Idioms describing deep pockets, born with silver spoons, affluence, and financial prosperity.",
    iconName: "Coins",
    accentColor: "from-amber-400 to-yellow-600",
    sampleKeywords: ["Born with silver spoon", "Make a killing", "Deep pockets", "Cost an arm and a leg"]
  },
  {
    id: 7,
    title: "Poverty & Scarcity",
    category: "Wealth & Fortune",
    hindiTitle: "गरीबी और अभाव",
    description: "Expressions for keeping the wolf from the door, hand to mouth existence, and bankruptcy.",
    iconName: "Receipt",
    accentColor: "from-orange-500 to-amber-700",
    sampleKeywords: ["Hand to mouth", "Wolf from door", "Down and out", "Penniless"]
  },
  {
    id: 8,
    title: "Time & Timing",
    category: "Time, Change & Routine",
    hindiTitle: "समय और अवसर",
    description: "Phrases relating to Eleventh hour rushes, nick of time, fleeting moments, and timeliness.",
    iconName: "Clock",
    accentColor: "from-cyan-500 to-blue-600",
    sampleKeywords: ["At the eleventh hour", "In the nick of time", "Once in a blue moon", "Round the clock"]
  },
  {
    id: 9,
    title: "Love and Relationships",
    category: "Social & Relationships",
    hindiTitle: "प्रेम और संबंध",
    description: "Expressions about tied knots, head over heels affection, soulmates, and romantic bonds.",
    iconName: "Heart",
    accentColor: "from-pink-500 to-rose-600",
    sampleKeywords: ["Tie the knot", "Head over heels", "Apple of eye", "Cupboard love"]
  },
  {
    id: 10,
    title: "Friendship and Loyalty",
    category: "Social & Relationships",
    hindiTitle: "दोस्ती और निष्ठा",
    description: "Idioms highlighting bosom friends, standing thick and thin, and unwavering camaraderie.",
    iconName: "Users",
    accentColor: "from-indigo-500 to-purple-600",
    sampleKeywords: ["Through thick and thin", "Bosom friend", "Birds of a feather", "Fair-weather friend"]
  },
  {
    id: 11,
    title: "Anger and Conflict",
    category: "Emotions & Feelings",
    hindiTitle: "क्रोध और टकराव",
    description: "Idioms for flying off the handle, seeing red, bad blood, and furious clashes.",
    iconName: "Flame",
    accentColor: "from-red-600 to-orange-600",
    sampleKeywords: ["Fly off the handle", "See red", "Bad blood", "Lock horns"]
  },
  {
    id: 12,
    title: "Peace and Resolution",
    category: "Power, Law & Conflict",
    hindiTitle: "शांति और समाधान",
    description: "Phrases denoting burying the hatchet, holding an olive branch, and restoring harmony.",
    iconName: "Feather",
    accentColor: "from-teal-400 to-emerald-600",
    sampleKeywords: ["Bury the hatchet", "Hold out olive branch", "Clear the air", "Smooth troubled waters"]
  },
  {
    id: 13,
    title: "Happiness & Joy",
    category: "Emotions & Feelings",
    hindiTitle: "प्रसन्नता और आनंद",
    description: "Idioms representing being on Cloud Nine, walking on air, over the moon, and blissful joy.",
    iconName: "Smile",
    accentColor: "from-yellow-400 to-amber-500",
    sampleKeywords: ["On cloud nine", "Over the moon", "Walking on air", "In seventh heaven"]
  },
  {
    id: 14,
    title: "Sadness & Despair",
    category: "Emotions & Feelings",
    hindiTitle: "उदास और निराशा",
    description: "Expressions about down in the dumps, feeling blue, broken hearts, and melancholic sorrow.",
    iconName: "CloudRain",
    accentColor: "from-slate-500 to-slate-700",
    sampleKeywords: ["Down in the dumps", "Feeling blue", "Down in the mouth", "Heart sinking"]
  },
  {
    id: 15,
    title: "Fear & Anxiety",
    category: "Emotions & Feelings",
    hindiTitle: "भय और घबराहट",
    description: "Phrases describing butterflies in stomach, cold feet, sitting on pins and needles.",
    iconName: "Zap",
    accentColor: "from-violet-600 to-indigo-700",
    sampleKeywords: ["Butterflies in stomach", "Cold feet", "On pins and needles", "Quake in boots"]
  },
  {
    id: 16,
    title: "Courage & Bravery",
    category: "Emotions & Feelings",
    hindiTitle: "साहस और वीरता",
    description: "Idioms for biting the bullet, taking bull by horns, showing mettle, and fearless acts.",
    iconName: "Shield",
    accentColor: "from-amber-600 to-red-600",
    sampleKeywords: ["Bite the bullet", "Take bull by horns", "Show grit", "Lion-hearted"]
  },
  {
    id: 17,
    title: "Luck & Fortune",
    category: "Wealth & Fortune",
    hindiTitle: "भाग्य और सौभाग्य",
    description: "Expressions regarding lucky breaks, blessings in disguise, and stars aligning.",
    iconName: "Sparkles",
    accentColor: "from-emerald-400 to-green-600",
    sampleKeywords: ["Blessing in disguise", "Stroke of luck", "Born under lucky star", "Midas touch"]
  },
  {
    id: 18,
    title: "Unluckiness & Misfortune",
    category: "Wealth & Fortune",
    hindiTitle: "दुर्भाग्य और विपत्ति",
    description: "Idioms describing Murphy's law, a bad patch, falling on hard times, and ill-fated strokes.",
    iconName: "AlertTriangle",
    accentColor: "from-stone-500 to-stone-700",
    sampleKeywords: ["A Bad Patch", "Fall on evil days", "Left in the lurch", "Ill at ease"]
  },
  {
    id: 19,
    title: "Communication & Speech",
    category: "Speech & Communication",
    hindiTitle: "संवाद और भाषण",
    description: "Phrases about beating around the bush, breaking the ice, gift of the gab, and straight talk.",
    iconName: "MessageSquare",
    accentColor: "from-blue-500 to-cyan-600",
    sampleKeywords: ["Gift of the gab", "Break the ice", "Beat around the bush", "Spill the beans"]
  },
  {
    id: 20,
    title: "Silence & Secrets",
    category: "Speech & Communication",
    hindiTitle: "मौन और रहस्य",
    description: "Idioms for tight lips, skeletons in the closet, cat out of bag, and sealed secrets.",
    iconName: "Lock",
    accentColor: "from-indigo-600 to-slate-800",
    sampleKeywords: ["Keep under wraps", "Skeleton in closet", "Tight-lipped", "Mum's the word"]
  },
  {
    id: 21,
    title: "Decisions & Choices",
    category: "Wisdom, Mind & Learning",
    hindiTitle: "निर्णय और चयन",
    description: "Expressions for sitting on the fence, Hobson's choice, crossing the Rubicon.",
    iconName: "GitFork",
    accentColor: "from-amber-500 to-purple-600",
    sampleKeywords: ["Hobson's choice", "Sit on the fence", "Cross the Rubicon", "Bite the bullet"]
  },
  {
    id: 22,
    title: "Uncertainty & Confusion",
    category: "Wisdom, Mind & Learning",
    hindiTitle: "अनिश्चितता और भ्रम",
    description: "Phrases for at sixes and sevens, all at sea, in two minds, and cloud of mystery.",
    iconName: "HelpCircle",
    accentColor: "from-purple-500 to-violet-700",
    sampleKeywords: ["At sixes and sevens", "All at sea", "In a dilemma", "Up in the air"]
  },
  {
    id: 23,
    title: "Learning & Knowledge",
    category: "Wisdom, Mind & Learning",
    hindiTitle: "सीखना और ज्ञान",
    description: "Idioms denoting bookworms, knowing the ropes, picking someone's brain.",
    iconName: "GraduationCap",
    accentColor: "from-emerald-500 to-cyan-600",
    sampleKeywords: ["Know the ropes", "Bookworm", "Learn by heart", "Pick someone's brain"]
  },
  {
    id: 24,
    title: "Ignorance & Mistakes",
    category: "Wisdom, Mind & Learning",
    hindiTitle: "अज्ञान और गलतियाँ",
    description: "Expressions for barking up the wrong tree, slip of tongue, blind spots, and gaffes.",
    iconName: "AlertCircle",
    accentColor: "from-amber-600 to-orange-700",
    sampleKeywords: ["Bark up wrong tree", "Slip of the tongue", "In the dark", "Blunder"]
  },
  {
    id: 25,
    title: "Change & Transformation",
    category: "Time, Change & Routine",
    hindiTitle: "परिवर्तन और रूपांतरण",
    description: "Phrases for turning over a new leaf, changing colors, paradigm shifts.",
    iconName: "RefreshCw",
    accentColor: "from-teal-500 to-blue-600",
    sampleKeywords: ["Turn over a new leaf", "Sea change", "Change of heart", "Shift gears"]
  },
  {
    id: 26,
    title: "Stability & Routine",
    category: "Time, Change & Routine",
    hindiTitle: "स्थिरता और दिनचर्या",
    description: "Idioms about keeping feet on the ground, rock solid consistency, and standard course.",
    iconName: "Anchor",
    accentColor: "from-blue-600 to-indigo-800",
    sampleKeywords: ["Rock solid", "Keep feet on ground", "Run of the mill", "Even keel"]
  },
  {
    id: 27,
    title: "Movement & Travel",
    category: "Nature, Health & Food",
    hindiTitle: "गति और यात्रा",
    description: "Expressions for hitting the road, globetrotting, on the fly, and journeying.",
    iconName: "Navigation",
    accentColor: "from-sky-500 to-indigo-600",
    sampleKeywords: ["Hit the road", "Off the beaten track", "In transit", "Globetrotter"]
  },
  {
    id: 28,
    title: "Nature & Animals",
    category: "Nature, Health & Food",
    hindiTitle: "प्रकृति और पशु",
    description: "Idioms derived from animal traits, dark horses, elephant in room, and wildlife habits.",
    iconName: "Trees",
    accentColor: "from-emerald-600 to-green-700",
    sampleKeywords: ["Dark horse", "Elephant in the room", "Lion's share", "Bull in china shop"]
  },
  {
    id: 29,
    title: "Weather & Seasons",
    category: "Nature, Health & Food",
    hindiTitle: "मौसम और ऋतुएँ",
    description: "Phrases involving weather the storm, under the weather, rainy days, and thunderbolts.",
    iconName: "CloudSun",
    accentColor: "from-sky-400 to-blue-600",
    sampleKeywords: ["Under the weather", "Save for rainy day", "Weather the storm", "Bolt from the blue"]
  },
  {
    id: 30,
    title: "Workplace & Career",
    category: "Effort & Career",
    hindiTitle: "कार्यस्थल और करियर",
    description: "Idioms representing climbing the corporate ladder, pink slips, corner offices, and duty.",
    iconName: "Briefcase",
    accentColor: "from-amber-600 to-stone-700",
    sampleKeywords: ["Get the pink slip", "Climb corporate ladder", "Nine to five", "Learn the ropes"]
  },
  {
    id: 31,
    title: "Health & Illness",
    category: "Nature, Health & Food",
    hindiTitle: "स्वास्थ्य और बीमारी",
    description: "Expressions for fit as a fiddle, at death's door, in the pink of health, and remedies.",
    iconName: "HeartPulse",
    accentColor: "from-rose-500 to-emerald-600",
    sampleKeywords: ["Fit as a fiddle", "In the pink of health", "Under the weather", "Breathe last"]
  },
  {
    id: 32,
    title: "Food & Eating",
    category: "Nature, Health & Food",
    hindiTitle: "भोजन और खानपान",
    description: "Phrases about a piece of cake, sour grapes, hard nut to crack, and culinary metaphors.",
    iconName: "Utensils",
    accentColor: "from-amber-500 to-orange-500",
    sampleKeywords: ["Piece of cake", "Sour grapes", "Hard nut to crack", "Couch potato"]
  },
  {
    id: 33,
    title: "Sports & Competition",
    category: "Nature, Health & Food",
    hindiTitle: "खेल और प्रतियोगिता",
    description: "Idioms from boxing, track, ballgames: drop the ball, below the belt, level playing field.",
    iconName: "Medal",
    accentColor: "from-orange-500 to-amber-600",
    sampleKeywords: ["Below the belt", "Drop the ball", "Level playing field", "Game changer"]
  },
  {
    id: 34,
    title: "War & Peace",
    category: "Power, Law & Conflict",
    hindiTitle: "युद्ध और शांति",
    description: "Phrases about battle cries, call to arms, holding forts, and ceasefire accords.",
    iconName: "Sword",
    accentColor: "from-red-700 to-stone-800",
    sampleKeywords: ["Hold the fort", "Call to arms", "Cross swords", "Bury the hatchet"]
  },
  {
    id: 35,
    title: "Law & Justice",
    category: "Power, Law & Conflict",
    hindiTitle: "कानून और न्याय",
    description: "Idioms for eye for an eye, long arm of law, kangaroo courts, and legal verdicts.",
    iconName: "Scale",
    accentColor: "from-indigo-600 to-purple-800",
    sampleKeywords: ["Long arm of law", "Kangaroo court", "Eye for an eye", "Beyond reasonable doubt"]
  },
  {
    id: 36,
    title: "Revenge & Payback",
    category: "Power, Law & Conflict",
    hindiTitle: "बदला और प्रतिशोध",
    description: "Expressions for settling scores, tit for tat, paying back in same coin.",
    iconName: "Undo2",
    accentColor: "from-rose-700 to-red-900",
    sampleKeywords: ["Settle scores", "Tit for tat", "Pay in same coin", "A dish best served cold"]
  },
  {
    id: 37,
    title: "Surprise & Shock",
    category: "Life & Miscellaneous",
    hindiTitle: "आश्चर्य और सदमा",
    description: "Idioms for a bolt from the blue, taking by storm, jaw-dropping occurrences.",
    iconName: "Lightbulb",
    accentColor: "from-yellow-500 to-amber-600",
    sampleKeywords: ["Bolt from blue", "Out of the blue", "Take by surprise", "Knock socks off"]
  },
  {
    id: 38,
    title: "Celebration & Festivity",
    category: "Life & Miscellaneous",
    hindiTitle: "उत्सव और जश्न",
    description: "Phrases denoting painting the town red, gala days, high spirits, and rejoicing.",
    iconName: "PartyPopper",
    accentColor: "from-pink-500 to-amber-500",
    sampleKeywords: ["Paint the town red", "Gala day", "Have a ball", "Roll out red carpet"]
  },
  {
    id: 39,
    title: "Death & Mortality",
    category: "Time, Change & Routine",
    hindiTitle: "मृत्यु और नश्वरता",
    description: "Idioms for kicking the bucket, breathing last, paying the debt of nature.",
    iconName: "Skull",
    accentColor: "from-stone-700 to-slate-900",
    sampleKeywords: ["Kick the bucket", "Breathe one's last", "Meet one's Maker", "Rest in peace"]
  },
  {
    id: 40,
    title: "Old Age & Wisdom",
    category: "Wisdom, Mind & Learning",
    hindiTitle: "वृद्धावस्था और ज्ञान",
    description: "Phrases about gray hair, old hands, voice of experience, and seasoned elders.",
    iconName: "Compass",
    accentColor: "from-amber-600 to-yellow-800",
    sampleKeywords: ["Old hand", "Wise owl", "Grey matter", "Voice of experience"]
  },
  {
    id: 41,
    title: "Youth & Inexperience",
    category: "Wisdom, Mind & Learning",
    hindiTitle: "युवावस्था और अनुभवहीनता",
    description: "Idioms representing greenhorns, salad days, wet behind the ears.",
    iconName: "Sprout",
    accentColor: "from-lime-500 to-emerald-600",
    sampleKeywords: ["Wet behind ears", "Greenhorn", "Salad days", "Young blood"]
  },
  {
    id: 42,
    title: "Habits & Behavior",
    category: "Life & Miscellaneous",
    hindiTitle: "आदतें और आचरण",
    description: "Expressions for old habits die hard, second nature, leopard changing spots.",
    iconName: "Repeat",
    accentColor: "from-blue-600 to-cyan-700",
    sampleKeywords: ["Old habits die hard", "Second nature", "Leopard cannot change spots"]
  },
  {
    id: 43,
    title: "Dreams & Ambitions",
    category: "Effort & Career",
    hindiTitle: "सपने और महत्वाकांक्षाएं",
    description: "Idioms for shooting for stars, castles in air, hitching wagon to a star.",
    iconName: "Moon",
    accentColor: "from-indigo-500 to-purple-600",
    sampleKeywords: ["Castles in air", "Shoot for stars", "Reach for sky", "Pipe dream"]
  },
  {
    id: 44,
    title: "Appearance & Judgment",
    category: "Life & Miscellaneous",
    hindiTitle: "दिखावा और मूल्यांकन",
    description: "Phrases for judging books by covers, all that glitters is not gold.",
    iconName: "Eye",
    accentColor: "from-amber-400 to-orange-600",
    sampleKeywords: ["Judge book by cover", "All that glitters", "Beauty is skin deep"]
  },
  {
    id: 45,
    title: "Power & Control",
    category: "Power, Law & Conflict",
    hindiTitle: "शक्ति और नियंत्रण",
    description: "Idioms describing holding the reins, calling the shots, iron fisted rule.",
    iconName: "Crown",
    accentColor: "from-purple-600 to-amber-600",
    sampleKeywords: ["Call the shots", "Hold the reins", "Iron fist in velvet glove", "Upper hand"]
  },
  {
    id: 46,
    title: "Technology & Modern Life",
    category: "Nature, Health & Food",
    hindiTitle: "प्रौद्योगिकी और आधुनिक जीवन",
    description: "Phrases relating to modern jargon, cutting edge, on the radar, high-tech age.",
    iconName: "Laptop",
    accentColor: "from-cyan-500 to-blue-700",
    sampleKeywords: ["Cutting edge", "State of the art", "On the radar", "Ahead of the curve"]
  },
  {
    id: 47,
    title: "Hope & Optimism",
    category: "Emotions & Feelings",
    hindiTitle: "आशा और सकारात्मकता",
    description: "Idioms for silver linings, light at end of tunnel, looking on bright side.",
    iconName: "Sun",
    accentColor: "from-yellow-400 to-amber-500",
    sampleKeywords: ["Silver lining", "Light at end of tunnel", "Look on bright side", "Keep chin up"]
  },
  {
    id: 48,
    title: "Risk & Danger",
    category: "Power, Law & Conflict",
    hindiTitle: "जोखिम और खतरा",
    description: "Expressions for skating on thin ice, playing with fire, neck on the line.",
    iconName: "Flame",
    accentColor: "from-red-600 to-rose-700",
    sampleKeywords: ["Skate on thin ice", "Play with fire", "Neck on the line", "Sword of Damocles"]
  },
  {
    id: 49,
    title: "Safety & Caution",
    category: "Power, Law & Conflict",
    hindiTitle: "सुरक्षा और सावधानी",
    description: "Idioms for better safe than sorry, looking before leaping, playing it safe.",
    iconName: "ShieldAlert",
    accentColor: "from-emerald-500 to-teal-700",
    sampleKeywords: ["Better safe than sorry", "Look before you leap", "Play it safe", "On guard"]
  },
  {
    id: 50,
    title: "Praise & Appreciation",
    category: "Social & Relationships",
    hindiTitle: "प्रशंसा और आभार",
    description: "Phrases about singing praises, giving credit where due, patting on back.",
    iconName: "ThumbsUp",
    accentColor: "from-teal-500 to-emerald-600",
    sampleKeywords: ["Sing one's praises", "Pat on the back", "Give devil his due", "Kudos"]
  },
  {
    id: 51,
    title: "Trust & Dependability",
    category: "Trust & Deception",
    hindiTitle: "विश्वास और निर्भरता",
    description: "Idioms for man of word, safe pair of hands, banking on someone.",
    iconName: "Handshake",
    accentColor: "from-blue-500 to-indigo-600",
    sampleKeywords: ["Man of his word", "Safe pair of hands", "Bank on someone", "True to salt"]
  },
  {
    id: 52,
    title: "Betrayal & Disloyalty",
    category: "Trust & Deception",
    hindiTitle: "विश्वासघात और गद्दारी",
    description: "Expressions for stabbing in back, Judas kiss, Trojan horse, turncoat behavior.",
    iconName: "UserX",
    accentColor: "from-rose-600 to-red-800",
    sampleKeywords: ["Stab in the back", "Judas kiss", "Trojan horse", "Turncoat"]
  },
  {
    id: 53,
    title: "Manipulation & Control",
    category: "Trust & Deception",
    hindiTitle: "हेरफेर और नियंत्रण",
    description: "Idioms for pulling strings, backseat driver, twisting around little finger.",
    iconName: "Settings2",
    accentColor: "from-purple-600 to-pink-600",
    sampleKeywords: ["Pull strings", "A Backseat Driver", "Twist around little finger", "Lead by nose"]
  },
  {
    id: 54,
    title: "Freedom & Independence",
    category: "Power, Law & Conflict",
    hindiTitle: "स्वतंत्रता और स्वायत्तता",
    description: "Phrases about free hand, off leash, calling one's own tune, liberty.",
    iconName: "Bird",
    accentColor: "from-sky-400 to-cyan-600",
    sampleKeywords: ["Free hand", "Off the hook", "Footloose and fancy-free", "Cast off shackles"]
  },
  {
    id: 55,
    title: "Restriction & Limitations",
    category: "Power, Law & Conflict",
    hindiTitle: "प्रतिबंध और सीमाएं",
    description: "Idioms for hands being tied, clipping wings, caged birds, boundary lines.",
    iconName: "SquareSlash",
    accentColor: "from-stone-600 to-slate-800",
    sampleKeywords: ["Hands are tied", "Clip someone's wings", "Draw the line", "Toe the line"]
  },
  {
    id: 56,
    title: "Authority & Leadership",
    category: "Power, Law & Conflict",
    hindiTitle: "प्राधिकार और नेतृत्व",
    description: "Expressions describing taking the lead, helming the ship, commanding respect.",
    iconName: "Award",
    accentColor: "from-amber-600 to-indigo-700",
    sampleKeywords: ["At the helm", "Take the lead", "Captain of ship", "Command respect"]
  },
  {
    id: 57,
    title: "Rebellion & Defiance",
    category: "Power, Law & Conflict",
    hindiTitle: "विद्रोह और अवज्ञा",
    description: "Idioms for raising banner of revolt, flying in face of, bucking the trend.",
    iconName: "AlertOctagon",
    accentColor: "from-red-600 to-rose-700",
    sampleKeywords: ["Fly in the face of", "Buck the trend", "Raise banner of revolt", "Kick against pricks"]
  },
  {
    id: 58,
    title: "Obedience & Submission",
    category: "Power, Law & Conflict",
    hindiTitle: "आज्ञाकारिता और समर्पण",
    description: "Phrases for toeing the line, eating humble pie, bending the knee.",
    iconName: "CheckCircle",
    accentColor: "from-teal-600 to-slate-700",
    sampleKeywords: ["Toe the line", "Eat humble pie", "Bend the knee", "At one's beck and call"]
  },
  {
    id: 59,
    title: "Survival & Endurance",
    category: "Power, Law & Conflict",
    hindiTitle: "उत्तरजीविता और सहनशक्ति",
    description: "Idioms about weathering storm, hanging by a thread, holding ground.",
    iconName: "HeartHandshake",
    accentColor: "from-emerald-600 to-teal-800",
    sampleKeywords: ["Weather the storm", "Hang by a thread", "Hold one's own", "Stand ground"]
  },
  {
    id: 60,
    title: "Creativity & Innovation",
    category: "Life & Miscellaneous",
    hindiTitle: "रचनात्मकता और नवाचार",
    description: "Expressions for thinking outside the box, reinventing the wheel, brainstorms.",
    iconName: "Sparkle",
    accentColor: "from-fuchsia-500 to-purple-600",
    sampleKeywords: ["Think outside box", "Reinvent wheel", "Brainchild", "Stroke of genius"]
  },
  {
    id: 61,
    title: "Routine & Monotony",
    category: "Time, Change & Routine",
    hindiTitle: "नियमितता और नीरसता",
    description: "Idioms for stuck in a rut, daily grind, run of the mill repetitive cycles.",
    iconName: "Clock8",
    accentColor: "from-slate-500 to-stone-700",
    sampleKeywords: ["Stuck in a rut", "Daily grind", "Run of the mill", "Same old story"]
  },
  {
    id: 62,
    title: "Perfection & Excellence",
    category: "Effort & Career",
    hindiTitle: "उत्कृष्टता और पूर्णता",
    description: "Phrases denoting top notch, cream of the crop, second to none, flawless execution.",
    iconName: "Gem",
    accentColor: "from-emerald-400 to-cyan-500",
    sampleKeywords: ["Cream of the crop", "Second to none", "Top notch", "A cut above"]
  },
  {
    id: 63,
    title: "Strategy & Planning",
    category: "Effort & Career",
    hindiTitle: "रणनीति और योजना",
    description: "Idioms for ace up sleeve, drawing board, master plan, calculated gambits.",
    iconName: "Target",
    accentColor: "from-indigo-600 to-blue-700",
    sampleKeywords: ["Ace up one's sleeve", "Back to drawing board", "Master plan", "Play one's cards right"]
  },
  {
    id: 64,
    title: "Spontaneity & Impulse",
    category: "Life & Miscellaneous",
    hindiTitle: "सहजता और क्षणिक प्रेरणा",
    description: "Phrases about on spur of moment, shooting from hip, off the cuff remarks.",
    iconName: "ZapOff",
    accentColor: "from-amber-500 to-orange-600",
    sampleKeywords: ["Spur of the moment", "Shoot from hip", "Off the cuff", "On a whim"]
  },
  {
    id: 65,
    title: "Tradition & Culture",
    category: "Social & Relationships",
    hindiTitle: "परंपरा और संस्कृति",
    description: "Idioms for time honored customs, old school, following footprints of ancestors.",
    iconName: "Landmark",
    accentColor: "from-amber-600 to-stone-700",
    sampleKeywords: ["Old school", "Time-honored", "Follow in footsteps", "Dye in wool"]
  },
  {
    id: 66,
    title: "Fashion & Appearance",
    category: "Nature, Health & Food",
    hindiTitle: "पहनावा और रूप-रंग",
    description: "Expressions for dressed to nines, in vogue, mutton dressed as lamb.",
    iconName: "Shirt",
    accentColor: "from-pink-500 to-purple-600",
    sampleKeywords: ["Dressed to nines", "In vogue", "Fit like glove", "Cut a dash"]
  },
  {
    id: 67,
    title: "Mystery & Intrigue",
    category: "Life & Miscellaneous",
    hindiTitle: "रहस्य और कौतूहल",
    description: "Idioms for riddle wrapped in enigma, dark horse, cloaked in secrecy.",
    iconName: "Search",
    accentColor: "from-indigo-700 to-slate-900",
    sampleKeywords: ["Riddle in enigma", "Cloaked in mystery", "Dark horse", "Between the lines"]
  },
  {
    id: 68,
    title: "Fame & Recognition",
    category: "Social & Relationships",
    hindiTitle: "प्रसिद्धि और पहचान",
    description: "Phrases about limelight, household names, making a splash, hall of fame.",
    iconName: "Star",
    accentColor: "from-yellow-400 to-amber-600",
    sampleKeywords: ["In the limelight", "Household name", "Make a splash", "Claim to fame"]
  },
  {
    id: 69,
    title: "Obscurity & Being Forgotten",
    category: "Social & Relationships",
    hindiTitle: "गुमनामी और उपेक्षा",
    description: "Idioms for fading into oblivion, yesterday's news, lost in mists of time.",
    iconName: "CloudFog",
    accentColor: "from-stone-500 to-slate-700",
    sampleKeywords: ["Fade into oblivion", "Yesterday's news", "Lost in mists", "Drop off map"]
  },
  {
    id: 70,
    title: "Greed & Excess",
    category: "Wealth & Fortune",
    hindiTitle: "लालच और अति",
    description: "Expressions for bite off more than one can chew, eyes bigger than belly, dog in manger.",
    iconName: "CircleDollarSign",
    accentColor: "from-amber-700 to-red-700",
    sampleKeywords: ["Bite more than chew", "Dog in the manger", "Eyes bigger than belly", "Money hungry"]
  },
  {
    id: 71,
    title: "Generosity & Kindness",
    category: "Wealth & Fortune",
    hindiTitle: "उदारता और दयालुता",
    description: "Idioms for Good Samaritan, heart of gold, giving shirt off back.",
    iconName: "Gift",
    accentColor: "from-teal-400 to-emerald-600",
    sampleKeywords: ["Heart of gold", "Good Samaritan", "Give shirt off back", "Milk of human kindness"]
  },
  {
    id: 72,
    title: "Patience & Waiting",
    category: "Time, Change & Routine",
    hindiTitle: "धैर्य और प्रतीक्षा",
    description: "Phrases for hold your horses, biding one's time, cooling one's heels.",
    iconName: "Hourglass",
    accentColor: "from-blue-500 to-teal-600",
    sampleKeywords: ["Hold your horses", "Bide one's time", "Cool one's heels", "Patience of Job"]
  },
  {
    id: 73,
    title: "Impatience & Urgency",
    category: "Time, Change & Routine",
    hindiTitle: "अधीरता और जल्दबाजी",
    description: "Idioms for jump the gun, champing at the bit, pressing matters of hour.",
    iconName: "Timer",
    accentColor: "from-orange-500 to-red-600",
    sampleKeywords: ["Jump the gun", "Champ at the bit", "Matter of urgency", "On edge"]
  },
  {
    id: 74,
    title: "Conflict & Argument",
    category: "Emotions & Feelings",
    hindiTitle: "विवाद और बहस",
    description: "Phrases describing bone of contention, apple of discord, at loggerheads.",
    iconName: "Swords",
    accentColor: "from-red-600 to-rose-800",
    sampleKeywords: ["Bone of contention", "Apple of discord", "At loggerheads", "Cross swords"]
  },
  {
    id: 75,
    title: "Jealousy & Envy",
    category: "Emotions & Feelings",
    hindiTitle: "ईर्ष्या और डाह",
    description: "Idioms for green eyed monster, dog in manger, sour grapes, envious eyes.",
    iconName: "Eye",
    accentColor: "from-lime-600 to-emerald-800",
    sampleKeywords: ["Green-eyed monster", "Sour grapes", "Dog in manger", "Envy of all"]
  },
  {
    id: 76,
    title: "Noise & Disruption",
    category: "Speech & Communication",
    hindiTitle: "शोर और अशांति",
    description: "Expressions for raising the roof, kicking up dust, hullabaloo and chaos.",
    iconName: "Volume2",
    accentColor: "from-amber-600 to-red-600",
    sampleKeywords: ["Raise the roof", "Kick up a dust", "Make a racket", "Storm in teacup"]
  },
  {
    id: 77,
    title: "Silence & Calm",
    category: "Speech & Communication",
    hindiTitle: "शांति और खामोशी",
    description: "Idioms for calm before storm, drop of a pin, still waters running deep.",
    iconName: "VolumeX",
    accentColor: "from-teal-500 to-cyan-700",
    sampleKeywords: ["Calm before storm", "Hear a pin drop", "Still waters run deep", "Peace of mind"]
  },
  {
    id: 78,
    title: "Failure to Understand",
    category: "Wisdom, Mind & Learning",
    hindiTitle: "समझने में विफलता",
    description: "Phrases describing Greek and Latin, over one's head, lost the plot.",
    iconName: "HelpCircle",
    accentColor: "from-violet-500 to-purple-700",
    sampleKeywords: ["All Greek to me", "Over one's head", "Cannot make head or tail", "Out of depth"]
  },
  {
    id: 79,
    title: "Insight & Realization",
    category: "Wisdom, Mind & Learning",
    hindiTitle: "ज्ञानोदय और अहसास",
    description: "Idioms for penny dropping, light dawning upon, reading between lines.",
    iconName: "Lightbulb",
    accentColor: "from-amber-400 to-yellow-500",
    sampleKeywords: ["Penny dropped", "Light dawned", "Read between lines", "Eureka moment"]
  },
  {
    id: 80,
    title: "Temptation & Desire",
    category: "Emotions & Feelings",
    hindiTitle: "प्रलोभन और इच्छा",
    description: "Phrases for forbidden fruit, siren song, watering at mouth, sweet tooth.",
    iconName: "Apple",
    accentColor: "from-rose-500 to-pink-600",
    sampleKeywords: ["Forbidden fruit", "Siren song", "Water at mouth", "Lured into"]
  },
  {
    id: 81,
    title: "Self-Control & Discipline",
    category: "Emotions & Feelings",
    hindiTitle: "आत्म-नियंत्रण और अनुशासन",
    description: "Idioms for keeping a lid on, biting one's lip, holding horse, iron will.",
    iconName: "LockKeyhole",
    accentColor: "from-blue-600 to-slate-800",
    sampleKeywords: ["Keep a lid on", "Bite one's lip", "Hold one's peace", "Iron discipline"]
  },
  {
    id: 82,
    title: "Endings & Closure",
    category: "Time, Change & Routine",
    hindiTitle: "समाप्ति और निष्कर्ष",
    description: "Phrases for calling it a day, curtains down, drawing line, final bow.",
    iconName: "Flag",
    accentColor: "from-stone-600 to-stone-800",
    sampleKeywords: ["Call it a day", "Curtains for", "Swan song", "Draw to a close"]
  },
  {
    id: 83,
    title: "Balance & Moderation",
    category: "Time, Change & Routine",
    hindiTitle: "संतुलन और संयम",
    description: "Idioms for golden mean, strike balance, middle course, middle ground.",
    iconName: "Scale",
    accentColor: "from-teal-500 to-blue-600",
    sampleKeywords: ["Golden mean", "Strike a balance", "Middle of road", "Happy medium"]
  },
  {
    id: 84,
    title: "Overconfidence & Arrogance",
    category: "Emotions & Feelings",
    hindiTitle: "अति-आत्मविश्वास और घमंड",
    description: "Phrases for too big for one's boots, high horse, pride going before fall.",
    iconName: "UserCheck",
    accentColor: "from-red-500 to-amber-700",
    sampleKeywords: ["Too big for boots", "Riding high horse", "Pride before fall", "Full of oneself"]
  },
  {
    id: 85,
    title: "Humility & Modesty",
    category: "Emotions & Feelings",
    hindiTitle: "विनम्रता और सादगी",
    description: "Idioms for down to earth, hide light under bushel, unassuming nature.",
    iconName: "Smile",
    accentColor: "from-emerald-500 to-teal-700",
    sampleKeywords: ["Down to earth", "Hide light under bushel", "Unassuming", "Modest to fault"]
  },
  {
    id: 86,
    title: "Giving Up & Quitting",
    category: "Effort & Career",
    hindiTitle: "हार मान लेना और छोड़ना",
    description: "Phrases for throwing in the towel, waving white flag, calling it quits.",
    iconName: "XCircle",
    accentColor: "from-rose-600 to-stone-700",
    sampleKeywords: ["Throw in the towel", "Wave white flag", "Call it quits", "Hang up boots"]
  },
  {
    id: 87,
    title: "Problem-Solving & Resolution",
    category: "Effort & Career",
    hindiTitle: "समस्या-समाधान और उपाय",
    description: "Idioms for cutting Gordian knot, ironing out wrinkles, crack the code.",
    iconName: "Wrench",
    accentColor: "from-cyan-600 to-emerald-600",
    sampleKeywords: ["Cut Gordian knot", "Iron out wrinkles", "Crack the code", "Sort out"]
  },
  {
    id: 88,
    title: "Observation & Awareness",
    category: "Wisdom, Mind & Learning",
    hindiTitle: "अवलोकन और जागरूकता",
    description: "Phrases for keeping ears to ground, eye like a hawk, on lookout.",
    iconName: "Binoculars",
    accentColor: "from-blue-600 to-indigo-700",
    sampleKeywords: ["Keep ear to ground", "Eye like hawk", "On the lookout", "Wide awake"]
  },
  {
    id: 89,
    title: "Miscellaneous",
    category: "Life & Miscellaneous",
    hindiTitle: "विविध और मिश्रित मुहावरे",
    description: "Essential cross-category idioms, Baker's dozen, wild goose chases, and eclectic gems.",
    iconName: "Sparkles",
    accentColor: "from-purple-500 to-amber-500",
    sampleKeywords: ["Baker's dozen", "Wild goose chase", "Bite the dust", "At random"]
  }
];
