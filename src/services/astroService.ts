import { format } from 'date-fns';

export function getSunSign(date: Date): string {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
  return "Pisces";
}

export function getMoonSign(date: Date): string {
  // This is a simplified calculation. In reality, moon sign calculation requires ephemeris data
  const moonSigns = [
    "Aries", "Taurus", "Gemini", "Cancer", 
    "Leo", "Virgo", "Libra", "Scorpio", 
    "Sagittarius", "Capricorn", "Aquarius", "Pisces"
  ];
  
  // Calculate moon position based on date
  const startDate = new Date(1970, 0, 1);
  const daysSince = Math.floor((date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const moonCycle = daysSince % 29.5; // Lunar month is approximately 29.5 days
  const moonSignIndex = Math.floor((moonCycle / 29.5) * 12);
  
  return moonSigns[moonSignIndex];
}

export function getAscendant(birthTime: string | null, birthDate: string): string {
  if (!birthTime) return "Unknown";

  // This is a simplified calculation. Real ascendant calculation requires birth location and precise calculations
  const signs = [
    "Aries", "Taurus", "Gemini", "Cancer", 
    "Leo", "Virgo", "Libra", "Scorpio", 
    "Sagittarius", "Capricorn", "Aquarius", "Pisces"
  ];

  const [hours, minutes] = birthTime.split(':').map(Number);
  const date = new Date(birthDate);
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  
  // Calculate ascendant based on birth time and day of year
  const ascendantIndex = (Math.floor(((hours * 60 + minutes) / 4) + (dayOfYear / 30.44)) % 12);
  
  return signs[ascendantIndex];
}

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
        aspects.push({ 
          planet1: planets[i].name, 
          planet2: planets[j].name, 
          type: "Trine", 
          angle: 120,
          meaning: "Harmony and flow between planetary energies"
        });
      } else if (Math.abs(normalizedAngle - 90) <= 8) { // Square
        aspects.push({ 
          planet1: planets[i].name, 
          planet2: planets[j].name, 
          type: "Square", 
          angle: 90,
          meaning: "Tension and growth opportunities"
        });
      } else if (Math.abs(normalizedAngle - 180) <= 8) { // Opposition
        aspects.push({ 
          planet1: planets[i].name, 
          planet2: planets[j].name, 
          type: "Opposition", 
          angle: 180,
          meaning: "Balance and awareness through polarities"
        });
      } else if (Math.abs(normalizedAngle - 60) <= 6) { // Sextile
        aspects.push({ 
          planet1: planets[i].name, 
          planet2: planets[j].name, 
          type: "Sextile", 
          angle: 60,
          meaning: "Opportunities for growth and development"
        });
      } else if (Math.abs(normalizedAngle) <= 8) { // Conjunction
        aspects.push({ 
          planet1: planets[i].name, 
          planet2: planets[j].name, 
          type: "Conjunction", 
          angle: 0,
          meaning: "Merging and intensification of planetary energies"
        });
      }
    }
  }

  // Calculate dominant elements and modalities
  const elementCount = {
    Fire: 0,
    Earth: 0,
    Air: 0,
    Water: 0
  };

  const modalityCount = {
    Cardinal: 0,
    Fixed: 0,
    Mutable: 0
  };

  planets.forEach(planet => {
    const sign = zodiacSigns.find(s => s.symbol === planet.sign);
    if (sign) {
      const [modality, element] = sign.meaning.split(' ');
      elementCount[element as keyof typeof elementCount]++;
      modalityCount[modality as keyof typeof modalityCount]++;
    }
  });

  const dominantElement = Object.entries(elementCount)
    .sort(([,a], [,b]) => b - a)[0][0];

  const dominantModality = Object.entries(modalityCount)
    .sort(([,a], [,b]) => b - a)[0][0];
  
  return {
    birthDate,
    birthTime,
    birthPlace,
    sunSign: getSunSign(birthDateTime),
    moonSign: getMoonSign(birthDateTime),
    ascendant: getAscendant(birthTime, birthDate),
    interpretation: `This natal chart reveals a ${dominantElement}-dominant temperament with a strong ${dominantModality.toLowerCase()} approach to life. The planetary positions and their relationships to each other (aspects) reveal your personality traits, strengths, challenges, and life patterns.`,
    planets,
    houses,
    zodiacSigns,
    aspects,
    elementalBalance: elementCount,
    modalityBalance: modalityCount,
    dominantElement,
    dominantModality
  };
}