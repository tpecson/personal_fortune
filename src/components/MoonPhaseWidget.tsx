import React, { useEffect, useState } from 'react';
import { getMoonPhase } from '../services/moonService';

export default function MoonPhaseWidget() {
  const [moonData, setMoonData] = useState<{
    phase: number;
    illumination: number;
    name: string;
    properties: string[];
    rituals: string;
  } | null>(null);

  useEffect(() => {
    const fetchMoonPhase = async () => {
      const data = await getMoonPhase();
      setMoonData(data);
    };
    fetchMoonPhase();
  }, []);

  if (!moonData) return <div className="text-halloween-text-primary">Loading...</div>;

  // Calculate the moon's appearance
  const renderMoon = () => {
    const size = 64; // Size of the moon
    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2;
    
    // For waning phases (past full moon), we flip the illumination curve
    const isWaning = moonData.phase > 14.765;
    const normalizedPhase = isWaning ? 29.53 - moonData.phase : moonData.phase;
    const illuminationWidth = r * (normalizedPhase < 14.765 ? normalizedPhase / 14.765 : 2 - normalizedPhase / 14.765);
    
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mx-auto">
        {/* Full moon circle (base) */}
        <circle
          cx={cx}
          cy={cy}
          r={r - 1}
          fill="#1a1625"
          stroke="#ff6b1a"
          strokeWidth="2"
        />
        
        {/* Illuminated portion */}
        <path
          d={`
            M ${cx} ${cy - r}
            A ${r} ${r} 0 0 ${isWaning ? 0 : 1} ${cx} ${cy + r}
            A ${illuminationWidth} ${r} 0 0 ${isWaning ? 1 : 0} ${cx} ${cy - r}
          `}
          fill="#ff6b1a"
        />
      </svg>
    );
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-center mb-4">
        {renderMoon()}
      </div>
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-halloween-text-primary">{moonData.name}</h3>
        <p className="text-sm text-halloween-text-secondary">
          {Math.round(moonData.phase)} days into lunar cycle
        </p>
      </div>
      
      <div className="space-y-3 border-t border-halloween-border pt-4">
        <div>
          <h4 className="text-sm font-semibold text-halloween-text-primary mb-2">Magical Properties</h4>
          <div className="flex flex-wrap gap-2">
            {moonData.properties.map((property, index) => (
              <span 
                key={index}
                className="px-2 py-1 text-xs rounded-full bg-halloween-accent/20 text-halloween-accent"
              >
                {property}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-semibold text-halloween-text-primary mb-2">Ritual Guidance</h4>
          <p className="text-sm text-halloween-text-secondary">
            {moonData.rituals}
          </p>
        </div>
      </div>
    </div>
  );
}