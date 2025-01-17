import React, { useState, useEffect } from 'react';
import { ScrollText } from 'lucide-react';
import { getIChing } from '../services/ichingService';

export default function IChingWidget() {
  const [reading, setReading] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!reading) {
      castReading();
    }
  }, []);

  const castReading = async () => {
    setLoading(true);
    try {
      const data = await getIChing();
      setReading(data);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-halloween-text-primary">Casting hexagram...</div>;
  if (!reading) return null;

  return (
    <div className="p-4">
      <div className="flex flex-col items-center mb-6">
        {reading.lines.map((line: string, index: number) => (
          <div
            key={index}
            className={`w-24 h-2 my-1.5 ${
              line === "yang" ? "bg-halloween-accent" : "flex justify-between"
            }`}
          >
            {line === "yin" && (
              <>
                <div className="w-10 h-full bg-halloween-accent" />
                <div className="w-10 h-full bg-halloween-accent" />
              </>
            )}
          </div>
        ))}
      </div>
      <div className="text-center mb-4">
        <h3 className="font-medium text-lg text-halloween-text-primary">{reading.name}</h3>
        <p className="text-sm text-halloween-text-secondary">{reading.number}</p>
      </div>
      <p className="text-sm text-halloween-text-secondary mb-4">{reading.interpretation}</p>
      <button
        onClick={castReading}
        className="w-full py-2 px-4 bg-halloween-accent hover:bg-halloween-accent/90 text-white rounded-lg transition-colors duration-200 shadow-lg shadow-halloween-accent/20"
      >
        Cast New Reading
      </button>
    </div>
  );
}