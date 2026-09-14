const TAROT_API = "https://tarotapi.dev/api/v1/cards";
const TAROT_IMAGE_BASE = "https://www.sacred-texts.com/tarot/pkt/img/";

const SPREADS = {
  daily: {
    name: "Daily Card",
    description: "One consistent card for the day, offering a theme for reflection.",
    positions: ["Today's energy and reflection"]
  },
  single: {
    name: "Single Card",
    description: "A focused card for a question, theme, or moment of guidance.",
    positions: ["Guidance"]
  },
  guidance: {
    name: "Simple Guidance",
    description: "Explore the situation, what deserves consideration, and a possible next step.",
    positions: ["The situation", "What to consider", "Your next step"]
  },
  pastPresentFuture: {
    name: "Past · Present · Future",
    description: "Consider what shaped the situation, where it stands, and its current direction.",
    positions: ["Past", "Present", "Potential future"]
  },
  selfRelationship: {
    name: "Relationship With Self",
    description: "A deeper look at your current relationship with yourself.",
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
    description: "Explore what you carry, what supports healing, and what may emerge.",
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
    description: "A three-part check-in with your thoughts, physical self, and inner life.",
    positions: ["Mind", "Body", "Spirit"]
  },
  releaseEmbrace: {
    name: "Release and Embrace",
    description: "Identify what can be released and what deserves more room.",
    positions: ["What to release", "What to embrace", "How to move forward"]
  },
  decision: {
    name: "Decision Reading",
    description: "Compare two possibilities without treating either path as predetermined.",
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
    description: "Explore the challenge, available strength, and a constructive action.",
    positions: [
      "The heart of the challenge",
      "What is making it harder",
      "A strength available to me",
      "A constructive next action"
    ]
  },
  connection: {
    name: "Connection Reading",
    description: "Reflect on two people and the healthiest direction for the connection.",
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
    description: "Explore your creative energy, blocks, inspiration, and first step.",
    positions: [
      "My current creative energy",
      "What is blocking me",
      "Where to find inspiration",
      "The first step to take"
    ]
  },
  weekAhead: {
    name: "Week Ahead",
    description: "A reflective overview of the coming week and where to place your attention.",
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
    description: "A traditional ten-card spread for a detailed look at a situation.",
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
    description: "Choose between one and ten cards and write your own position labels.",
    positions: []
  }
};

const REFLECTION_PROMPTS = [
  "Where do I recognize this energy in my life?",
  "What feeling does this card bring up before I analyze it?",
  "What might this card be asking me to notice?",
  "How could I work with this energy in a grounded way?",
  "What part of this image or meaning feels most relevant?",
  "What would honoring this message look like today?"
];

async function loadTarotDeck() {
  const cached = localStorage.getItem("tarot-deck-cache-v1");

  if (cached) {
    try {
      return JSON.parse(cached);
    } catch {}
  }

  const response = await fetch(TAROT_API);

  if (!response.ok) {
    throw new Error("The card library could not be loaded.");
  }

  const data = await response.json();
  const cards = data.cards || data;

  localStorage.setItem("tarot-deck-cache-v1", JSON.stringify(cards));
  return cards;
}

function cardImage(card) {
  return `${TAROT_IMAGE_BASE}${card.name_short}.jpg`;
}

function cardMeaning(card, reversed) {
  return reversed ? card.meaning_rev : card.meaning_up;
}

function cardKeywords(card, reversed) {
  const text = cardMeaning(card, reversed) || "";
  const stopWords = new Set([
    "with", "that", "this", "from", "your", "have", "will", "into",
    "upon", "about", "there", "their", "which", "when", "what", "also"
  ]);

  return [...new Set(
    text
      .toLowerCase()
      .replace(/[^a-z\s-]/g, "")
      .split(/\s+/)
      .filter(word => word.length > 4 && !stopWords.has(word))
  )].slice(0, 5);
}

function positionInterpretation(card, reversed, position) {
  const meaning = cardMeaning(card, reversed);

  return `In the position of “${position},” ${card.name} invites you to consider ${meaning.charAt(0).toLowerCase()}${meaning.slice(1)}`;
}

function reflectionPrompt(cardIndex, positionIndex) {
  return REFLECTION_PROMPTS[
    (cardIndex + positionIndex) % REFLECTION_PROMPTS.length
  ];
}
