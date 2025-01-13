import React, { useEffect, useState } from 'react';
import { Moon } from 'lucide-react';
import { getMoonPhase } from '../services/fortuneService';

export default function MoonPhaseWidget() {
  const [moonData, setMoonData] = useState<{ phase: number; illumination: number } | null>(null);

  useEffect(() => {
    const fetchMoonPhase = async () => {
      const data = await getMoonPhase();
      setMoonData(data);
    };
    fetchMoonPhase();
  }, []);

  if (!moonData) return <div>Loading...</div>;

  const phaseDescription = () => {
    const phase = moonData.phase;
    if (phase < 3.7) return "New Moon";
    if (phase < 7.4) return "Waxing Crescent";
    if (phase < 11.1) return "First Quarter";
    if (phase < 14.8) return "Waxing Gibbous";
    if (phase < 18.5) return "Full Moon";
    if (phase < 22.2) return "Waning Gibbous";
    if (phase < 25.9) return "Last Quarter";
    if (phase < 29.5) return "Waning Crescent";
    return "New Moon";
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-center mb-4">
        <Moon 
          className="h-16 w-16 text-indigo-600"
          style={{ 
            opacity: Math.abs(moonData.illumination),
            transform: `rotate(${(moonData.phase / 29.5) * 360}deg)`
          }}
        />
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold">{phaseDescription()}</h3>
        <p className="text-sm text-gray-600">
          {Math.round(moonData.phase)} days into lunar cycle
        </p>
      </div>
    </div>
  );
}