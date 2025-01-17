import React, { useEffect, useState } from 'react';
import { getDailyCrystal } from '../services/crystalService';

export default function CrystalWidget() {
  const [crystalData, setCrystalData] = useState<any>(null);

  useEffect(() => {
    const fetchCrystal = async () => {
      const data = await getDailyCrystal();
      setCrystalData(data);
    };
    fetchCrystal();
  }, []);

  if (!crystalData) return <div className="text-halloween-text-primary">Loading...</div>;

  return (
    <div className="p-4">
      <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
        <img
          src={crystalData.image}
          alt={crystalData.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-halloween-background via-transparent" />
        <h3 className="absolute bottom-3 left-3 text-xl font-bold text-halloween-text-primary">
          {crystalData.name}
        </h3>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-halloween-text-primary mb-2">Astrological Influence</h4>
          <div className="flex flex-wrap gap-2">
            {crystalData.astrologicalInfluences.map((influence: string, index: number) => (
              <span
                key={index}
                className="px-2 py-1 text-xs rounded-full bg-halloween-accent/20 text-halloween-accent"
              >
                {influence}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-halloween-text-primary mb-2">Properties</h4>
          <div className="grid grid-cols-2 gap-2">
            {crystalData.properties.map((property: string, index: number) => (
              <div
                key={index}
                className="px-3 py-2 rounded-lg bg-halloween-card/30 border border-halloween-border text-sm text-halloween-text-secondary"
              >
                {property}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-halloween-card/50 rounded-lg border border-halloween-border p-4">
          <h4 className="text-sm font-semibold text-halloween-text-primary mb-2">Daily Guidance</h4>
          <p className="text-sm text-halloween-text-secondary">{crystalData.guidance}</p>
        </div>
      </div>
    </div>
  );
}