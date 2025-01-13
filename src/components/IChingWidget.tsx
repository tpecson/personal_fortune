import React, { useState, useEffect } from 'react';
import { ScrollText } from 'lucide-react';
import { getIChing } from '../services/fortuneService';

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

  if (loading) return <div>Casting hexagram...</div>;
  if (!reading) return null;

  return (
    <div className="p-4">
      <div className="flex flex-col items-center mb-6">
        {reading.lines.map((line: string, index: number) => (
          <div
            key={index}
            className={`w-24 h-2 my-1.5 ${
              line === "yang" ? "bg-black" : "flex justify-between"
            }`}
          >
            {line === "yin" && (
              <>
                <div className="w-10 h-full bg-black" />
                <div className="w-10 h-full bg-black" />
              </>
            )}
          </div>
        ))}
      </div>
      <div className="text-center mb-4">
        <h3 className="font-medium text-lg">{reading.name}</h3>
        <p className="text-sm text-gray-500">{reading.number}</p>
      </div>
      <p className="text-sm text-gray-600 mb-4">{reading.interpretation}</p>
      <button
        onClick={castReading}
        className="w-full py-2 px-4 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200"
      >
        Cast New Reading
      </button>
    </div>
  );
}