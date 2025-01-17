import React, { useEffect, useState } from 'react';
import { Hash } from 'lucide-react';
import { getNumerologyReading } from '../services/numerologyService';

export default function NumerologyWidget({ birthDate }: { birthDate: string }) {
  const [reading, setReading] = useState<any>(null);

  useEffect(() => {
    if (birthDate) {
      const fetchReading = async () => {
        const data = await getNumerologyReading(birthDate);
        setReading(data);
      };
      fetchReading();
    }
  }, [birthDate]);

  if (!birthDate) {
    return (
      <div className="flex items-center justify-center h-full text-halloween-text-primary">
        Please set your birth date in your profile to view your numerology reading.
      </div>
    );
  }

  if (!reading) return <div className="text-halloween-text-primary">Calculating numbers...</div>;

  return (
    <div className="p-4">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-halloween-accent/20 mb-4">
          <span className="text-3xl font-bold text-halloween-accent">{reading.dailyNumber}</span>
        </div>
        <h3 className="text-lg font-semibold text-halloween-text-primary mb-1">
          Your Life Path Number: {reading.lifePathNumber}
        </h3>
        <p className="text-sm text-halloween-text-secondary">
          Daily Number: {reading.dailyNumber}
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-halloween-card/50 rounded-lg border border-halloween-border p-4">
          <h4 className="text-sm font-semibold text-halloween-text-primary mb-2">Today's Insight</h4>
          <p className="text-sm text-halloween-text-secondary">{reading.dailyInsight}</p>
        </div>

        <div className="bg-halloween-card/50 rounded-lg border border-halloween-border p-4">
          <h4 className="text-sm font-semibold text-halloween-text-primary mb-2">Life Path Meaning</h4>
          <p className="text-sm text-halloween-text-secondary">{reading.lifePathMeaning}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-halloween-text-primary mb-2">Key Aspects</h4>
          <div className="grid grid-cols-2 gap-2">
            {reading.keyAspects.map((aspect: string, index: number) => (
              <div
                key={index}
                className="px-3 py-2 rounded-lg bg-halloween-card/30 border border-halloween-border text-sm text-halloween-text-secondary"
              >
                {aspect}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}