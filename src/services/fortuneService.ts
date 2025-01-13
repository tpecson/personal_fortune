import { supabase } from '../lib/supabase';

export async function getMoonPhase() {
  const currentDate = new Date();
  // Calculate moon phase (0-29.5)
  const synmonth = 29.53058867;
  const date1 = new Date('Jan 6 2000'); // Known new moon date
  const date2 = currentDate;
  const phase = ((date2.getTime() - date1.getTime())/1000) % (synmonth*86400) / (synmonth*86400);
  
  return {
    phase: phase * 29.5,
    illumination: Math.cos(phase * 2 * Math.PI)
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
  // Get current time for real-time chart
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();

  // Calculate positions based on current time
  const basePosition = (hour * 30) + (minute / 2); // 360 degrees / 12 hours = 30 degrees per hour

  // Simulated astrological data with dynamic positions
  const planets = [
    { name: "Sun", symbol: "☉", sign: "Aries", position: (basePosition + 15) % 360, degree: 15 },
    { name: "Moon", symbol: "☽", sign: "Taurus", position: (basePosition + 45) % 360, degree: 15 },
    { name: "Mercury", symbol: "☿", sign: "Pisces", position: (basePosition + 75) % 360, degree: 15 },
    { name: "Venus", symbol: "♀", sign: "Taurus", position: (basePosition + 105) % 360, degree: 15 },
    { name: "Mars", symbol: "♂", sign: "Gemini", position: (basePosition + 135) % 360, degree: 15 },
    { name: "Jupiter", symbol: "♃", sign: "Cancer", position: (basePosition + 165) % 360, degree: 15 },
    { name: "Saturn", symbol: "♄", sign: "Leo", position: (basePosition + 195) % 360, degree: 15 },
    { name: "Uranus", symbol: "♅", sign: "Virgo", position: (basePosition + 225) % 360, degree: 15 },
    { name: "Neptune", symbol: "♆", sign: "Libra", position: (basePosition + 255) % 360, degree: 15 },
    { name: "Pluto", symbol: "♇", sign: "Scorpio", position: (basePosition + 285) % 360, degree: 15 }
  ];

  const houses = Array.from({ length: 12 }, (_, i) => ({
    number: i + 1,
    position: (i * 30 + basePosition) % 360
  }));

  const currentTime = now.toLocaleTimeString();
  const currentDate = now.toLocaleDateString();
  
  return {
    currentTime,
    currentDate,
    sunSign: "Aries",
    moonSign: "Taurus",
    ascendant: "Gemini",
    interpretation: "This chart represents the current planetary positions. The angles between planets (aspects) indicate the cosmic energies at play right now. Pay attention to the house positions to understand which areas of life are being influenced.",
    planets,
    houses,
    aspects: [
      { planet1: "Sun", planet2: "Moon", type: "Trine", angle: 120 },
      { planet1: "Venus", planet2: "Mars", type: "Square", angle: 90 },
      { planet1: "Jupiter", planet2: "Saturn", type: "Opposition", angle: 180 }
    ]
  };
}

export async function getIChing() {
  const hexagramData = [
    { number: 1, name: "The Creative Heaven", interpretation: "The Creative represents the primal power of creation. This hexagram suggests a time of great potential and pure, primal force." },
    { number: 2, name: "The Receptive Earth", interpretation: "The Receptive represents the perfect complement to the Creative, the feminine, receptive principle of nature." },
    // Add more hexagrams as needed
  ];
  
  // Generate 6 lines (either 6, 7, 8, or 9)
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