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
  // ... rest of the existing getHouseMeaning function ...
}

export async function getAstrologicalChart(birthDate?: string, birthTime?: string, birthPlace?: string) {
  // ... rest of the existing getAstrologicalChart function ...
}