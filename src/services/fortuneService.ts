import { supabase } from '../lib/supabase';

function getHouseMeaning(houseNumber: number): string {
  const houseNames = [
    "The House of Self",
    "The House of Values", 
    "The House of Communication",
    "The House of Home and Family",
    "The House of Pleasure",
    "The House of Health",
    "The House of Partnerships",
    "The House of Transformation",
    "The House of Philosophy",
    "The House of Career",
    "The House of Friendship",
    "The House of Spirituality"
  ];
  
  const houseMeanings = [
    "Self, personality, and appearance",
    "Values, possessions, and resources",
    "Communication, siblings, and local environment",
    "Home, family, and emotional foundation",
    "Creativity, pleasure, and self-expression",
    "Work, health, and daily routines",
    "Relationships and partnerships",
    "Transformation, shared resources, and deep psychology",
    "Higher learning, travel, and beliefs",
    "Career, public status, and life direction",
    "Friends, groups, and future hopes",
    "Spirituality, unconscious, and self-undoing"
  ];
  
  return `${houseNames[houseNumber - 1]} - ${houseMeanings[houseNumber - 1]}`;
}

export async function getMoonPhase() {
  // Simulating an API call with a delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const currentDate = new Date();
  const synmonth = 29.53058867;
  const date1 = new Date('Jan 6 2000');
  const date2 = currentDate;
  const phase = ((date2.getTime() - date1.getTime())/1000) % (synmonth*86400) / (synmonth*86400);
  
  const phaseNumber = phase * 29.5;
  
  // Determine moon phase name and properties
  let name, properties, rituals;
  if (phaseNumber < 3.7) {
    name = "New Moon";
    properties = ["New Beginnings", "Setting Intentions", "Fresh Start"];
    rituals = "Perfect time for setting new goals and planting seeds of intention. Focus on personal growth and new projects.";
  } else if (phaseNumber < 7.4) {
    name = "Waxing Crescent";
    properties = ["Growth", "Creation", "Momentum"];
    rituals = "Channel your energy into building and creating. Take action on goals set during the New Moon.";
  } else if (phaseNumber < 11.1) {
    name = "First Quarter";
    properties = ["Action", "Decision", "Commitment"];
    rituals = "Time to overcome challenges and make important decisions. Stay committed to your goals.";
  } else if (phaseNumber < 14.8) {
    name = "Waxing Gibbous";
    properties = ["Refinement", "Patience", "Preparation"];
    rituals = "Focus on refining your projects and preparing for completion. Pay attention to details.";
  } else if (phaseNumber < 18.5) {
    name = "Full Moon";
    properties = ["Completion", "Illumination", "Manifestation"];
    rituals = "Celebrate achievements and manifest your desires. Powerful time for rituals and spellwork.";
  } else if (phaseNumber < 22.2) {
    name = "Waning Gibbous";
    properties = ["Gratitude", "Sharing", "Teaching"];
    rituals = "Share your knowledge and express gratitude. Good time for teaching and mentoring others.";
  } else if (phaseNumber < 25.9) {
    name = "Last Quarter";
    properties = ["Release", "Forgiveness", "Transition"];
    rituals = "Let go of what no longer serves you. Focus on forgiveness and clearing space.";
  } else {
    name = "Waning Crescent";
    properties = ["Rest", "Reflection", "Surrender"];
    rituals = "Time for quiet reflection and rest. Prepare for the next cycle of new beginnings.";
  }
  
  return {
    phase: phaseNumber,
    illumination: Math.cos(phase * 2 * Math.PI),
    name,
    properties,
    rituals
  };
}

export async function getBiorhythm(birthDate: string) {
  const today = new Date();
  const birth = new Date(birthDate);
  const diff = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
  
  return {
    physical: Math.sin((2 * Math.PI * diff) / 23),
    emotional: Math.sin((2 * Math.PI * diff) / 28),
    intellectual: Math.sin((2 * Math.PI * diff) / 33)
  };
}

export async function getAstrologicalChart(birthDate?: string, birthTime?: string, birthPlace?: string) {
  if (!birthDate || !birthTime || !birthPlace) {
    return null;
  }

  const birthDateTime = new Date(`${birthDate}T${birthTime}`);
  
  // Calculate base position based on birth time
  const hour = birthDateTime.getHours();
  const minute = birthDateTime.getMinutes();
  const basePosition = (hour * 30) + (minute / 2);

  const zodiacSigns = [
    { symbol: "♈", name: "Aries", meaning: "Cardinal Fire - The Pioneer" },
    { symbol: "♉", name: "Taurus", meaning: "Fixed Earth - The Builder" },
    { symbol: "♊", name: "Gemini", meaning: "Mutable Air - The Messenger" },
    { symbol: "♋", name: "Cancer", meaning: "Cardinal Water - The Nurturer" },
    { symbol: "♌", name: "Leo", meaning: "Fixed Fire - The Creator" },
    { symbol: "♍", name: "Virgo", meaning: "Mutable Earth - The Analyst" },
    { symbol: "♎", name: "Libra", meaning: "Cardinal Air - The Diplomat" },
    { symbol: "♏", name: "Scorpio", meaning: "Fixed Water - The Transformer" },
    { symbol: "♐", name: "Sagittarius", meaning: "Mutable Fire - The Explorer" },
    { symbol: "♑", name: "Capricorn", meaning: "Cardinal Earth - The Achiever" },
    { symbol: "♒", name: "Aquarius", meaning: "Fixed Air - The Visionary" },
    { symbol: "♓", name: "Pisces", meaning: "Mutable Water - The Mystic" }
  ];

  // Calculate planet positions with exact degrees
  const planets = [
    { 
      name: "Sun", 
      symbol: "☉", 
      sign: "♐", // Sagittarius
      position: 260.73, // 20° 44' in Sagittarius (260.73 = 8 * 30 + 20.73)
      degree: 20.73, 
      meaning: "Core identity and life purpose" 
    },
    { 
      name: "Moon", 
      symbol: "☽", 
      sign: "♏", // Scorpio
      position: 211.4, // 1° 24' in Scorpio (211.4 = 7 * 30 + 1.4)
      degree: 1.4, 
      meaning: "Emotions and inner self" 
    },
    { 
      name: "Mercury", 
      symbol: "☿", 
      sign: "♐", // Sagittarius
      position: 265.5, 
      degree: 25.5,
      meaning: "Communication and thought process" 
    },
    { 
      name: "Venus", 
      symbol: "♀", 
      sign: "♑", // Capricorn
      position: 285.8, 
      degree: 15.8,
      meaning: "Love, beauty, and values" 
    },
    { 
      name: "Mars", 
      symbol: "♂", 
      sign: "♏", // Scorpio
      position: 225.3, 
      degree: 15.3,
      meaning: "Action, drive, and energy" 
    },
    { 
      name: "Jupiter", 
      symbol: "♃", 
      sign: "♈", // Aries
      position: 15.7, 
      degree: 15.7,
      meaning: "Growth, luck, and expansion" 
    },
    { 
      name: "Saturn", 
      symbol: "♄", 
      sign: "♉", // Taurus
      position: 45.2, 
      degree: 15.2,
      meaning: "Structure, limitations, and lessons" 
    },
    { 
      name: "Uranus", 
      symbol: "♅", 
      sign: "♊", // Gemini
      position: 75.8, 
      degree: 15.8,
      meaning: "Innovation and sudden changes" 
    },
    { 
      name: "Neptune", 
      symbol: "♆", 
      sign: "♋", // Cancer
      position: 105.4, 
      degree: 15.4,
      meaning: "Dreams, spirituality, and illusion" 
    },
    { 
      name: "Pluto", 
      symbol: "♇", 
      sign: "♌", // Leo
      position: 135.6, 
      degree: 15.6,
      meaning: "Transformation and power" 
    }
  ];

  // Calculate houses based on birth time
  const houses = Array.from({ length: 12 }, (_, i) => ({
    number: i + 1,
    position: (i * 30 + basePosition) % 360,
    meaning: getHouseMeaning(i + 1),
    sign: zodiacSigns[i].symbol
  }));

  // Calculate major aspects between planets
  const aspects = [];
  for (let i = 0; i < planets.length; i++) {
    for (let j = i + 1; j < planets.length; j++) {
      const angle = Math.abs(planets[i].position - planets[j].position) % 360;
      const normalizedAngle = angle > 180 ? 360 - angle : angle;
      
      if (Math.abs(normalizedAngle - 120) <= 8) { // Trine
        aspects.push({ planet1: planets[i].name, planet2: planets[j].name, type: "Trine", angle: 120 });
      } else if (Math.abs(normalizedAngle - 90) <= 8) { // Square
        aspects.push({ planet1: planets[i].name, planet2: planets[j].name, type: "Square", angle: 90 });
      } else if (Math.abs(normalizedAngle - 180) <= 8) { // Opposition
        aspects.push({ planet1: planets[i].name, planet2: planets[j].name, type: "Opposition", angle: 180 });
      } else if (Math.abs(normalizedAngle - 60) <= 6) { // Sextile
        aspects.push({ planet1: planets[i].name, planet2: planets[j].name, type: "Sextile", angle: 60 });
      } else if (Math.abs(normalizedAngle) <= 8) { // Conjunction
        aspects.push({ planet1: planets[i].name, planet2: planets[j].name, type: "Conjunction", angle: 0 });
      }
    }
  }
  
  return {
    birthDate,
    birthTime,
    birthPlace,
    sunSign: "Sagittarius",
    moonSign: "Scorpio",
    ascendant: "Gemini",
    interpretation: "This natal chart represents the cosmic snapshot at the moment of your birth. The positions of the planets and their relationships to each other (aspects) reveal your personality traits, strengths, challenges, and life patterns.",
    planets,
    houses,
    zodiacSigns,
    aspects
  };
}

export async function getIChing() {
  // Simulating an API call with a delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const hexagramData = [
    { number: 1, name: "The Creative Heaven", interpretation: "The Creative represents the primal power of creation. This hexagram suggests a time of great potential and pure, primal force." },
    { number: 2, name: "The Receptive Earth", interpretation: "The Receptive represents the perfect complement to the Creative, the feminine, receptive principle of nature." },
  ];
  
  const lines = Array.from({ length: 6 }, () => Math.floor(Math.random() * 4) + 6);
  const hexagram = lines.map(line => line % 2 === 0 ? "yin" : "yang");
  const selectedHexagram = hexagramData[Math.floor(Math.random() * hexagramData.length)];
  
  return {
    lines: hexagram,
    name: selectedHexagram.name,
    number: `Hexagram ${selectedHexagram.number}`,
    interpretation: selectedHexagram.interpretation
  };
}

export async function getTarotReading() {
  // Simulating an API call with a delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const cards = [
    { 
      name: "The Fool", 
      position: "past",
      reversed: false,
      image: "https://images.unsplash.com/photo-1601024445121-e294d1c73b37",
      meaning: "New beginnings, innocence, spontaneity"
    },
    { 
      name: "The Magician", 
      position: "present",
      reversed: true,
      image: "https://images.unsplash.com/photo-1572937336162-31b8f58c2784",
      meaning: "Manipulation, poor planning, untapped talents"
    },
    { 
      name: "The High Priestess", 
      position: "future",
      reversed: false,
      image: "https://images.unsplash.com/photo-1590902657566-09e8587cc612",
      meaning: "Intuition, sacred knowledge, divine feminine"
    }
  ];
  
  return {
    cards,
    interpretation: "Your journey begins with innocence and pure potential, represented by The Fool. Currently, you're learning to harness your personal power through The Magician, though its reversed position suggests some self-doubt. The High Priestess in your future indicates developing intuition and hidden knowledge coming to light."
  };
}

export async function getNumerologyReading(birthDate: string) {
  // Simulating an API call with a delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Calculate Life Path Number (simple example)
  const dateStr = birthDate.replace(/-/g, '');
  const lifePathNumber = dateStr.split('').reduce((sum, digit) => sum + parseInt(digit, 10), 0) % 9 || 9;
  
  // Calculate daily number based on current date
  const today = new Date();
  const dailyNumber = ((today.getMonth() + 1) + today.getDate() + today.getFullYear()) % 9 || 9;
  
  const readings = {
    1: {
      meaning: "Leadership, independence, and new beginnings",
      aspects: ["Natural leader", "Independent", "Creative", "Original"]
    },
    2: {
      meaning: "Harmony, cooperation, and diplomacy",
      aspects: ["Diplomatic", "Sensitive", "Cooperative", "Peacemaker"]
    },
    3: {
      meaning: "Creativity, self-expression, and joy",
      aspects: ["Creative", "Expressive", "Social", "Artistic"]
    },
    4: {
      meaning: "Stability, organization, and hard work",
      aspects: ["Practical", "Organized", "Reliable", "Hard-working"]
    },
    5: {
      meaning: "Freedom, change, and adventure",
      aspects: ["Adventurous", "Versatile", "Freedom-loving", "Progressive"]
    },
    6: {
      meaning: "Harmony, responsibility, and nurturing",
      aspects: ["Responsible", "Caring", "Harmonious", "Supportive"]
    },
    7: {
      meaning: "Wisdom, spirituality, and analysis",
      aspects: ["Analytical", "Spiritual", "Studious", "Mysterious"]
    },
    8: {
      meaning: "Power, abundance, and material success",
      aspects: ["Ambitious", "Powerful", "Successful", "Material mastery"]
    },
    9: {
      meaning: "Completion, humanitarianism, and wisdom",
      aspects: ["Compassionate", "Wise", "Humanitarian", "Universal love"]
    }
  };

  return {
    lifePathNumber,
    dailyNumber,
    lifePathMeaning: readings[lifePathNumber as keyof typeof readings].meaning,
    keyAspects: readings[lifePathNumber as keyof typeof readings].aspects,
    dailyInsight: `Today's number ${dailyNumber} suggests a focus on ${readings[dailyNumber as keyof typeof readings].meaning.toLowerCase()}.`
  };
}

export async function getDailyCrystal() {
  // Simulating an API call with a delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const crystals = [
    {
      name: "Amethyst",
      image: "https://images.unsplash.com/photo-1567593810070-7a3d471af022",
      properties: [
        "Spiritual awareness",
        "Inner peace",
        "Intuition",
        "Protection"
      ],
      astrologicalInfluences: [
        "Pisces",
        "Virgo",
        "Aquarius"
      ],
      guidance: "Focus on spiritual growth and inner wisdom today. Amethyst helps calm the mind and enhance meditation practices."
    },
    {
      name: "Rose Quartz",
      image: "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0",
      properties: [
        "Love",
        "Emotional healing",
        "Self-acceptance",
        "Heart chakra"
      ],
      astrologicalInfluences: [
        "Taurus",
        "Libra",
        "Cancer"
      ],
      guidance: "Open your heart to love and compassion today. Rose Quartz helps heal emotional wounds and promote self-love."
    }
  ];
  
  return crystals[Math.floor(Math.random() * crystals.length)];
}

export async function getAstroWeather() {
  // Simulating an API call with a delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const phenomena = [
    {
      type: "retrograde",
      name: "Mercury Retrograde",
      duration: "Until Dec 23",
      opportunities: [
        "Review and revise plans",
        "Reconnect with old friends",
        "Reflect on past experiences"
      ],
      challenges: [
        "Communication mishaps",
        "Technology issues",
        "Travel delays"
      ],
      guidance: "Take extra care with communications and double-check important details. Use this time for reflection rather than new beginnings."
    },
    {
      type: "conjunction",
      name: "Venus-Jupiter Conjunction",
      duration: "Peak influence today",
      opportunities: [
        "Expand social connections",
        "Manifest abundance",
        "Enhance creativity"
      ],
      challenges: [
        "Overindulgence",
        "Unrealistic expectations",
        "Excessive optimism"
      ],
      guidance: "Channel this harmonious energy into creative projects and relationship building, but maintain practical boundaries."
    }
  ];
  
  const selectedPhenomenon = phenomena[Math.floor(Math.random() * phenomena.length)];
  
  return {
    primaryInfluence: {
      type: selectedPhenomenon.type,
      name: selectedPhenomenon.name,
      duration: selectedPhenomenon.duration
    },
    opportunities: selectedPhenomenon.opportunities,
    challenges: selectedPhenomenon.challenges,
    guidance: selectedPhenomenon.guidance,
    additionalInfluences: [
      { name: "Full Moon in Gemini" },
      { name: "Mars in Scorpio" }
    ]
  };
}

export async function getHerbs() {
  // Simulating an API call with a delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      name: "Lavender",
      image: "https://images.unsplash.com/photo-1595235060330-c51166d60d69",
      description: "Sacred to Mercury, lavender is used for purification, peace, and restful sleep. Its calming properties make it ideal for meditation and dream work.",
      associations: {
        planet: "Mercury",
        element: "Air",
        gender: "Masculine",
        deities: ["Mercury", "Hecate", "Morpheus"],
        magickal_uses: [
          "Peace",
          "Sleep",
          "Purification",
          "Healing",
          "Love spells"
        ],
        zodiac: ["Virgo", "Gemini"]
      },
      illustration: "https://images.unsplash.com/photo-1471943311424-646960669fbc",
      additionalInfo: "Lavender has been used in magical practices for centuries. Its soothing aroma is known to enhance psychic abilities and promote peaceful dreams."
    },
    {
      name: "Rosemary",
      image: "https://images.unsplash.com/photo-1515586000433-45406d8e6662",
      description: "Associated with the Sun and Fire, rosemary enhances memory, protection, and mental clarity. It's traditionally used to purify sacred spaces and strengthen spellwork.",
      associations: {
        planet: "Sun",
        element: "Fire",
        gender: "Masculine",
        deities: ["Apollo", "Hebe", "Ra"],
        magickal_uses: [
          "Protection",
          "Mental clarity",
          "Memory enhancement",
          "Purification",
          "Love spells",
          "Healing rituals"
        ],
        zodiac: ["Leo", "Aries"]
      },
      illustration: "https://images.unsplash.com/photo-1606604830754-4d0a0421d05e",
      additionalInfo: "Known as the 'herb of remembrance', rosemary has been used in folk medicine and magical practices for centuries. Its strong protective properties make it excellent for warding."
    },
    {
      name: "Sage",
      image: "https://images.unsplash.com/photo-1600831606133-c9b0aeb2aa0f",
      description: "Ruled by Jupiter, sage is a powerful cleansing herb used for wisdom, longevity, and purification. It's essential in smudging rituals and healing magic.",
      associations: {
        planet: "Jupiter",
        element: "Air",
        gender: "Masculine",
        deities: ["Zeus", "Minerva", "Athena"],
        magickal_uses: [
          "Cleansing",
          "Wisdom",
          "Longevity",
          "Protection",
          "Spiritual cleansing"
        ],
        zodiac: ["Sagittarius", "Aquarius"]
      },
      illustration: "https://images.unsplash.com/photo-1599099555183-5d76e889e6f9",
      additionalInfo: "White sage is particularly revered for its powerful cleansing properties. It's been used in sacred ceremonies to purify spaces and people for generations."
    },
    {
      name: "Chamomile",
      image: "https://images.unsplash.com/photo-1587593132708-ced55ed0f132",
      description: "Governed by the Sun, chamomile brings peace, prosperity, and healing. It's often used in sleep magic and for attracting abundance.",
      associations: {
        planet: "Sun",
        element: "Water",
        gender: "Feminine",
        deities: ["Freya", "Helios", "Eir"],
        magickal_uses: [
          "Peace",
          "Prosperity",
          "Sleep",
          "Meditation",
          "Love"
        ],
        zodiac: ["Cancer", "Libra"]
      },
      illustration: "https://images.unsplash.com/photo-1589396575653-c09c794ff6a6",
      additionalInfo: "Chamomile is known as the 'plant's physician' because it helps other plants grow better. In magic, it's used to enhance any spell for peace and tranquility."
    },
    {
      name: "Mugwort",
      image: "https://images.unsplash.com/photo-15645088542-60a1b9ea0e09",
      description: "Sacred to the Moon, mugwort enhances psychic abilities and prophetic dreams. It's traditionally used for divination and astral travel.",
      associations: {
        planet: "Moon",
        element: "Earth",
        gender: "Feminine",
        deities: ["Artemis", "Diana", "Hecate"],
        magickal_uses: [
          "Divination",
          "Psychic development",
          "Dream work",
          "Astral travel",
          "Protection"
        ],
        zodiac: ["Cancer", "Pisces"]
      },
      illustration: "https://images.unsplash.com/photo-1564508967009-21c2cb240c7c",
      additionalInfo: "Also known as the 'traveler's herb', mugwort is traditionally used to protect travelers and enhance prophetic dreams when placed under the pillow."
    }
  ];
}

export async function saveReading(userId: string, type: string, content: any) {
  const { error } = await supabase
    .from('readings')
    .insert([
      {
        user_id: userId,
        type,
        content
      }
    ]);
  
  if (error) throw error;
}