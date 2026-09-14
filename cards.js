const TAROT_API = "https://tarotapi.dev/api/v1/cards";
const TAROT_IMAGE_BASE = "https://www.sacred-texts.com/tarot/pkt/img/";

const SPREADS = {
  daily: {
    name: "Daily Card",
    description:
      "One consistent card for the day, offering a theme for reflection.",
    positions: ["Today's energy and reflection"]
  },

  single: {
    name: "Single Card",
    description:
      "A focused card for a question, theme, or moment of guidance.",
    positions: ["Guidance"]
  },

  guidance: {
    name: "Simple Guidance",
    description:
      "Explore the situation, what deserves consideration, and a possible next step.",
    positions: [
      "The situation",
      "What to consider",
      "Your next step"
    ]
  },

  pastPresentFuture: {
    name: "Past · Present · Future",
    description:
      "Consider what shaped the situation, where it stands, and its current direction.",
    positions: [
      "Past",
      "Present",
      "Potential future"
    ]
  },

  selfRelationship: {
    name: "Relationship With Self",
    description:
      "A deeper look at your current relationship with yourself.",
    positions: [
      "How I currently see myself",
      "What part of me needs attention",
      "What I need to release",
      "How I can nurture myself",
      "What I am growing into"
    ]
  },

  healing: {
    name: "Healing and Release",
    description:
      "Explore what you carry, what supports healing, and what may emerge.",
    positions: [
      "What I am carrying",
      "Where it comes from",
      "What is ready to be released",
      "What will support my healing",
      "What can emerge afterward"
    ]
  },

  mindBodySpirit: {
    name: "Mind · Body · Spirit",
    description:
      "A three-part check-in with your thoughts, physical self, and inner life.",
    positions: [
      "Mind",
      "Body",
      "Spirit"
    ]
  },

  releaseEmbrace: {
    name: "Release and Embrace",
    description:
      "Identify what can be released and what deserves more room.",
    positions: [
      "What to release",
      "What to embrace",
      "How to move forward"
    ]
  },

  decision: {
    name: "Decision Reading",
    description:
      "Compare two possibilities without treating either path as predetermined.",
    positions: [
      "Energy of Option A",
      "Energy of Option B",
      "What I may be overlooking",
      "What matters most",
      "Most aligned next step"
    ]
  },

  challenge: {
    name: "Working Through a Challenge",
    description:
      "Explore the challenge, available strength, and a constructive action.",
    positions: [
      "The heart of the challenge",
      "What is making it harder",
      "A strength available to me",
      "A constructive next action"
    ]
  },

  connection: {
    name: "Connection Reading",
    description:
      "Reflect on two people and the healthiest direction for the connection.",
    positions: [
      "My energy",
      "Their energy",
      "The current dynamic",
      "What needs attention",
      "The healthiest path forward"
    ]
  },

  creative: {
    name: "Creative Spark",
    description:
      "Explore your creative energy, blocks, inspiration, and first step.",
    positions: [
      "My current creative energy",
      "What is blocking me",
      "Where to find inspiration",
      "The first step to take"
    ]
  },

  weekAhead: {
    name: "Week Ahead",
    description:
      "A reflective overview of the coming week and where to place your attention.",
    positions: [
      "Overall theme",
      "Potential challenge",
      "Available support",
      "Best focus",
      "Lesson of the week"
    ]
  },

  celticCross: {
    name: "Celtic Cross",
    description:
      "A traditional ten-card spread for a detailed look at a situation.",
    positions: [
      "Present situation",
      "Immediate challenge",
      "Foundation",
      "Recent past",
      "Possibility",
      "Near future",
      "Your approach",
      "Outside influences",
      "Hopes or fears",
      "Potential outcome"
    ]
  },

  custom: {
    name: "Custom Spread",
    description:
      "Choose between one and ten cards and write your own position labels.",
    positions: []
  }
};

const REFLECTION_PROMPTS = [
  "Where do I recognize this energy in my life?",
  "What feeling does this card bring up before I analyze it?",
  "What might this card be asking me to notice?",
  "How could I work with this energy in a grounded way?",
  "What part of this image or meaning feels most relevant?",
  "What would honoring this message look like today?",
  "Where might I be resisting this card’s message?",
  "What is one small action I could take based on this card?",
  "How does this card change the way I understand my question?",
  "What would the healthiest expression of this energy look like?"
];

const MAJOR_THEMES = {
  "The Fool":
    "beginnings, openness, trust, and stepping into the unknown",

  "The Magician":
    "personal agency, focused intention, and using the resources available to you",

  "The High Priestess":
    "intuition, inner knowledge, privacy, and what has not yet been revealed",

  "The Empress":
    "nurturing, creativity, abundance, and allowing something to grow",

  "The Emperor":
    "structure, boundaries, stability, and responsible leadership",

  "The Hierophant":
    "tradition, established beliefs, guidance, and learning from shared wisdom",

  "The Lovers":
    "alignment, meaningful choice, intimacy, and acting according to your values",

  "The Chariot":
    "determination, direction, self-control, and moving competing forces forward",

  "Strength":
    "gentle courage, patience, compassion, and emotional self-mastery",

  "The Hermit":
    "solitude, introspection, discernment, and finding your own inner guidance",

  "Wheel of Fortune":
    "change, cycles, timing, and circumstances beginning to shift",

  "Justice":
    "truth, accountability, balance, and accepting the consequences of choices",

  "The Hanged Man":
    "pause, surrender, changed perspective, and releasing the need to force progress",

  "Death":
    "an ending, transformation, release, and making space for a new phase",

  "Temperance":
    "balance, healing, moderation, and combining different needs thoughtfully",

  "The Devil":
    "attachment, avoidance, limiting patterns, and recognizing where choice still exists",

  "The Tower":
    "disruption, revelation, and the collapse of something that could no longer remain unchanged",

  "The Star":
    "hope, renewal, authenticity, and reconnecting with faith in yourself",

  "The Moon":
    "uncertainty, emotion, intuition, and moving carefully through incomplete information",

  "The Sun":
    "clarity, vitality, confidence, and allowing joy or truth to be fully seen",

  "Judgement":
    "self-evaluation, awakening, forgiveness, and answering a deeper call",

  "The World":
    "completion, integration, accomplishment, and recognizing how far you have come"
};

const SUIT_THEMES = {
  Cups:
    "emotion, intuition, relationships, receptivity, and creativity",

  Wands:
    "motivation, passion, identity, inspiration, and personal growth",

  Swords:
    "thoughts, communication, truth, conflict, and decision-making",

  Pentacles:
    "the body, home, work, resources, stability, and practical life"
};

const RANK_THEMES = {
  Ace:
    "a new opening or seed of potential",

  One:
    "a new opening or seed of potential",

  Two:
    "choice, balance, or the relationship between two forces",

  Three:
    "development, expression, and something beginning to take shape",

  Four:
    "stability, boundaries, rest, or the desire to preserve what exists",

  Five:
    "tension, disruption, adjustment, or a challenge that creates change",

  Six:
    "movement toward harmony, recovery, support, or transition",

  Seven:
    "assessment, uncertainty, strategy, or testing your commitment",

  Eight:
    "movement, skill, repetition, restriction, or deepening involvement",

  Nine:
    "maturity, culmination, independence, or nearing the end of a cycle",

  Ten:
    "completion, consequence, responsibility, or the full expression of a cycle",

  Page:
    "curiosity, learning, emotional openness, and a message or emerging possibility",

  Knight:
    "pursuit, movement, intensity, and acting on the suit’s energy",

  Queen:
    "inner mastery, emotional intelligence, and deeply embodying the suit’s energy",

  King:
    "outward mastery, responsibility, and directing the suit’s energy with intention"
};

async function loadTarotDeck() {
  const cached = localStorage.getItem("tarot-deck-cache-v1");

  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (error) {
      localStorage.removeItem("tarot-deck-cache-v1");
    }
  }

  const response = await fetch(TAROT_API);

  if (!response.ok) {
    throw new Error("The card library could not be loaded.");
  }

  const data = await response.json();
  const cards = data.cards || data;

  localStorage.setItem(
    "tarot-deck-cache-v1",
    JSON.stringify(cards)
  );

  return cards;
}

function cardImage(card) {
  return `${TAROT_IMAGE_BASE}${card.name_short}.jpg`;
}

function cardMeaning(card, reversed) {
  const meaning = reversed
    ? card.meaning_rev
    : card.meaning_up;

  return meaning || "Consider what this card’s imagery and themes bring up for you.";
}

function cardKeywords(card, reversed) {
  const text = cardMeaning(card, reversed);

  const stopWords = new Set([
    "with",
    "that",
    "this",
    "from",
    "your",
    "have",
    "will",
    "into",
    "upon",
    "about",
    "there",
    "their",
    "which",
    "when",
    "what",
    "also",
    "being",
    "where",
    "while",
    "could",
    "would",
    "should"
  ]);

  return [
    ...new Set(
      text
        .toLowerCase()
        .replace(/[^a-z\s-]/g, "")
        .split(/\s+/)
        .filter(word => {
          return word.length > 4 && !stopWords.has(word);
        })
    )
  ].slice(0, 5);
}

function detectSuit(card) {
  const cardName = card.name || "";

  return Object.keys(SUIT_THEMES).find(suit => {
    return cardName.toLowerCase().includes(suit.toLowerCase());
  });
}

function detectRank(card) {
  const cardName = card.name || "";

  const writtenRank = Object.keys(RANK_THEMES).find(rank => {
    return cardName.toLowerCase().startsWith(rank.toLowerCase());
  });

  if (writtenRank) {
    return writtenRank;
  }

  const numericRanks = {
    "1": "Ace",
    "2": "Two",
    "3": "Three",
    "4": "Four",
    "5": "Five",
    "6": "Six",
    "7": "Seven",
    "8": "Eight",
    "9": "Nine",
    "10": "Ten"
  };

  const number = cardName.match(/^\d+/);

  if (number) {
    return numericRanks[number[0]];
  }

  return null;
}

function cardTheme(card) {
  if (MAJOR_THEMES[card.name]) {
    return MAJOR_THEMES[card.name];
  }

  const suit = detectSuit(card);
  const rank = detectRank(card);

  const rankTheme =
    RANK_THEMES[rank] ||
    "a developing experience or pattern";

  const suitTheme =
    SUIT_THEMES[suit] ||
    "your emotions, choices, and current circumstances";

  return `${rankTheme}, expressed through ${suitTheme}`;
}

function positionLens(position) {
  const value = position.toLowerCase();

  if (
    value.includes("past") ||
    value.includes("foundation") ||
    value.includes("comes from")
  ) {
    return (
      "This suggests that the card’s energy helped shape how the current " +
      "situation developed. It may describe an earlier experience, belief, " +
      "relationship, or emotional pattern that continues to influence how " +
      "you respond now. Consider what began there and whether it still " +
      "deserves the same amount of influence."
    );
  }

  if (
    value.includes("present") ||
    value.includes("situation") ||
    value.includes("heart of")
  ) {
    return (
      "This places the card at the center of what is happening now. Its " +
      "energy may describe the most important part of the situation, even " +
      "if something louder or more urgent has been receiving your attention. " +
      "Notice where this theme is already active in your thoughts, feelings, " +
      "relationships, or choices."
    );
  }

  if (
    value.includes("future") ||
    value.includes("outcome") ||
    value.includes("emerge") ||
    value.includes("growing into")
  ) {
    return (
      "This is not a fixed prediction. It shows the direction the current " +
      "pattern may take if it continues. Consider whether this possibility " +
      "feels aligned with you and what choices could strengthen, soften, or " +
      "redirect it."
    );
  }

  if (
    value.includes("possibility")
  ) {
    return (
      "This card represents an available possibility rather than a guaranteed " +
      "result. It may show what could become more accessible if you give this " +
      "energy attention, permission, or practical support."
    );
  }

  if (
    value.includes("challenge") ||
    value.includes("blocking") ||
    value.includes("block") ||
    value.includes("harder") ||
    value.includes("fear")
  ) {
    return (
      "Here, the card highlights a source of friction or an energy that may " +
      "be difficult to use constructively. The challenge may come from " +
      "resisting this quality, having too much of it, or not having enough " +
      "of it. Ask what a healthier and more balanced expression of this " +
      "energy would look like."
    );
  }

  if (
    value.includes("release") ||
    value.includes("carrying")
  ) {
    return (
      "This may represent something you have outgrown but continue to carry " +
      "through habit, fear, loyalty, or unfinished emotion. Releasing it does " +
      "not require denying what it once meant. It may simply mean allowing it " +
      "to stop directing your present."
    );
  }

  if (
    value.includes("embrace")
  ) {
    return (
      "This card identifies an energy that may deserve more room in your life. " +
      "Embracing it could involve practicing it intentionally, accepting it " +
      "within yourself, or allowing support and possibility to reach you."
    );
  }

  if (
    value.includes("advice") ||
    value.includes("next step") ||
    value.includes("action") ||
    value.includes("focus") ||
    value.includes("support") ||
    value.includes("strength") ||
    value.includes("nurture") ||
    value.includes("move forward")
  ) {
    return (
      "In this position, the card becomes practical guidance. Rather than " +
      "asking what will happen, consider how you can consciously embody its " +
      "healthiest qualities. Look for one realistic action that expresses " +
      "this energy without requiring you to solve everything at once."
    );
  }

  if (
    value.includes("my energy") ||
    value.includes("your approach") ||
    value.includes("see myself")
  ) {
    return (
      "This reflects how you may currently be approaching yourself or the " +
      "situation. It can reveal both a genuine strength and a pattern worth " +
      "examining. Consider whether this energy represents who you are, how " +
      "you feel temporarily, or who you believe you must be."
    );
  }

  if (
    value.includes("their energy") ||
    value.includes("outside influence") ||
    value.includes("dynamic")
  ) {
    return (
      "This describes an influence within the relationship or environment, " +
      "not a definitive statement about another person’s private thoughts. " +
      "Notice how this energy appears through observable behavior, " +
      "communication, and the effect the connection has on you."
    );
  }

  if (
    value.includes("needs attention") ||
    value.includes("overlooking")
  ) {
    return (
      "This card draws attention to something that may be easy to minimize, " +
      "avoid, or overlook. Consider what changes when you treat this theme as " +
      "meaningful information instead of an inconvenience or distraction."
    );
  }

  if (
    value.includes("matters most") ||
    value.includes("lesson")
  ) {
    return (
      "This position points toward the deeper value or lesson underneath the " +
      "immediate situation. Consider what this experience may be teaching you " +
      "about your needs, boundaries, values, or way of relating to yourself."
    );
  }

  if (
    value.includes("mind")
  ) {
    return (
      "This card reflects your current mental landscape: the thoughts, " +
      "assumptions, and stories shaping your experience. Consider which " +
      "thoughts are providing useful information and which may need to be " +
      "questioned or reframed."
    );
  }

  if (
    value.includes("body")
  ) {
    return (
      "This position brings attention to your physical needs, capacity, and " +
      "sense of safety. Consider what your body may be communicating through " +
      "energy, tension, comfort, sensitivity, or the need for care."
    );
  }

  if (
    value.includes("spirit")
  ) {
    return (
      "This speaks to meaning, inner alignment, and your relationship with " +
      "something larger than the immediate circumstances. Consider what helps " +
      "you feel connected to yourself, your values, or a sense of purpose."
    );
  }

  if (
    value.includes("option a") ||
    value.includes("option b")
  ) {
    return (
      "This card describes the experience and energy associated with this " +
      "option rather than declaring the choice good or bad. Consider what " +
      "this path might ask of you, what it could develop within you, and " +
      "whether that exchange feels aligned."
    );
  }

  if (
    value.includes("overall theme")
  ) {
    return (
      "This card establishes the larger emotional or practical atmosphere of " +
      "the reading. Its themes may appear in several different forms, so look " +
      "for the pattern beneath individual events rather than expecting one " +
      "specific occurrence."
    );
  }

  if (
    value.includes("guidance") ||
    value.includes("consider")
  ) {
    return (
      "This card offers a perspective to carry into your question. It may not " +
      "provide a simple answer, but it can reveal the quality, value, or truth " +
      "that deserves more attention before you decide what comes next."
    );
  }

  if (
    value.includes("clarification")
  ) {
    return (
      "As a clarifying card, this adds another layer to the part of the reading " +
      "that felt uncertain. Consider whether it explains the original card, " +
      "reveals what was missing, or shows how its energy could be expressed."
    );
  }

  return (
    "This position asks you to explore how the card’s central theme is " +
    "operating within this particular part of your question. Notice where " +
    "the energy feels supportive, where it feels uncomfortable, and what it " +
    "may be inviting you to understand differently."
  );
}

function orientationLens(reversed) {
  if (reversed) {
    return (
      "Because the card is reversed, this energy may be blocked, internalized, " +
      "delayed, avoided, excessive, or expressed in an unbalanced way. A " +
      "reversal does not automatically make the card negative; it asks you " +
      "to look at how the energy is being processed beneath the surface."
    );
  }

  return (
    "Because the card is upright, this energy may be available more directly " +
    "or visibly. Consider how you can engage with its constructive qualities " +
    "while remaining aware of where they could become excessive."
  );
}

function positionInterpretation(card, reversed, position) {
  const theme = cardTheme(card);
  const positionMessage = positionLens(position);
  const orientationMessage = orientationLens(reversed);

  return (
    `${card.name} brings in themes of ${theme}. ` +
    `${positionMessage} ` +
    `${orientationMessage}`
  );
}

function reflectionPrompt(cardIndex, positionIndex) {
  return REFLECTION_PROMPTS[
    (cardIndex + positionIndex) % REFLECTION_PROMPTS.length
  ];
}
