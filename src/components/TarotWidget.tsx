import React, { useState, useEffect } from 'react';
import { ScrollText } from 'lucide-react';
import { getTarotReading } from '../services/tarotService';

export default function TarotWidget() {
  const [reading, setReading] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!reading) {
      drawCards();
    }
  }, []);

  const drawCards = async () => {
    setLoading(true);
    try {
      const data = await getTarotReading();
      setReading(data);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-halloween-text-primary">Drawing cards...</div>;
  if (!reading) return null;

  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-4 mb-4">
        {reading.cards.map((card: any) => (
          <div key={card.position} className="text-center">
            <div className="relative">
              <img
                src={card.image}
                alt={card.name}
                className={`w-full h-40 object-cover rounded-lg shadow-md transform transition-transform hover:scale-105 ${
                  card.reversed ? 'rotate-180' : ''
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-halloween-background/90 rounded-lg" />
              <div className="absolute bottom-2 left-2 right-2">
                <h4 className="font-medium text-halloween-text-primary text-xs">{card.name}</h4>
                <p className="capitalize text-halloween-text-secondary text-xs opacity-75">{card.position}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-sm text-halloween-text-secondary mb-4">{reading.interpretation}</p>
      <button
        onClick={drawCards}
        className="w-full py-2 px-4 bg-halloween-accent hover:bg-halloween-accent/90 text-white rounded-lg transition-colors duration-200 shadow-lg shadow-halloween-accent/20"
      >
        Draw New Reading
      </button>
    </div>
  );
}