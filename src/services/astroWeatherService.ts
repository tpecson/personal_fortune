export async function getAstroWeather(userSunSign: string | null = null) {
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

  const horoscopes = {
    Aries: {
      sign: "Aries",
      prediction: "Today's celestial alignment brings a surge of creative energy. Your natural leadership abilities are heightened, making it an excellent time for initiating new projects.",
      element: "Fire",
      luckyNumber: Math.floor(Math.random() * 20) + 1
    },
    Taurus: {
      sign: "Taurus",
      prediction: "Financial opportunities are highlighted today. Your practical approach to challenges will serve you well, especially in matters of resources and values.",
      element: "Earth",
      luckyNumber: Math.floor(Math.random() * 20) + 1
    },
    Gemini: {
      sign: "Gemini",
      prediction: "Communication channels are wide open. Your natural curiosity leads to valuable discoveries, particularly in areas of learning and short-distance travel.",
      element: "Air",
      luckyNumber: Math.floor(Math.random() * 20) + 1
    },
    Cancer: {
      sign: "Cancer",
      prediction: "Your intuitive powers are heightened today. Focus on home and family matters, as your nurturing energy can bring harmony to your personal relationships.",
      element: "Water",
      luckyNumber: Math.floor(Math.random() * 20) + 1
    },
    Leo: {
      sign: "Leo",
      prediction: "Your creative energies are at their peak. Take center stage and let your natural charisma shine, as others are particularly receptive to your leadership.",
      element: "Fire",
      luckyNumber: Math.floor(Math.random() * 20) + 1
    },
    Virgo: {
      sign: "Virgo",
      prediction: "Your analytical skills are sharp today. Focus on detailed work and planning, as your ability to organize and perfect is enhanced.",
      element: "Earth",
      luckyNumber: Math.floor(Math.random() * 20) + 1
    },
    Libra: {
      sign: "Libra",
      prediction: "Harmony and balance are highlighted today. Your diplomatic skills are enhanced, making it an excellent time for negotiations and partnerships.",
      element: "Air",
      luckyNumber: Math.floor(Math.random() * 20) + 1
    },
    Scorpio: {
      sign: "Scorpio",
      prediction: "Your investigative abilities are heightened. Delve deep into matters that require research and strategic thinking.",
      element: "Water",
      luckyNumber: Math.floor(Math.random() * 20) + 1
    },
    Sagittarius: {
      sign: "Sagittarius",
      prediction: "Adventure and learning opportunities abound. Your optimistic outlook attracts positive experiences and new philosophical insights.",
      element: "Fire",
      luckyNumber: Math.floor(Math.random() * 20) + 1
    },
    Capricorn: {
      sign: "Capricorn",
      prediction: "Professional matters are highlighted. Your disciplined approach and ambition will help you achieve important goals.",
      element: "Earth",
      luckyNumber: Math.floor(Math.random() * 20) + 1
    },
    Aquarius: {
      sign: "Aquarius",
      prediction: "Your innovative ideas are particularly powerful today. Focus on group activities and humanitarian causes.",
      element: "Air",
      luckyNumber: Math.floor(Math.random() * 20) + 1
    },
    Pisces: {
      sign: "Pisces",
      prediction: "Your spiritual and artistic sensitivities are heightened. Trust your intuition and express yourself creatively.",
      element: "Water",
      luckyNumber: Math.floor(Math.random() * 20) + 1
    }
  };
  
  // Select horoscope based on user's sun sign or random if not available
  const dailyHoroscope = userSunSign ? 
    horoscopes[userSunSign as keyof typeof horoscopes] : 
    horoscopes[Object.keys(horoscopes)[Math.floor(Math.random() * 12)] as keyof typeof horoscopes];
  
  return {
    horoscope: dailyHoroscope,
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