import React, { useState, useEffect } from 'react';
import { ScrollText } from 'lucide-react';
import { getTarotReading } from '../services/fortuneService';

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

  if (loading) return <div>Drawing cards...</div>;
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
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 rounded-lg" />
              <div className="absolute bottom-2 left-2 right-2 text-white text-xs">
                <h4 className="font-medium">{card.name}</h4>
                <p className="capitalize opacity-75">{card.position}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-600 mb-4">{reading.interpretation}</p>
      <button
        onClick={drawCards}
        className="w-full py-2 px-4 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200"
      >
        Draw New Reading
      </button>
    </div>
  );
}