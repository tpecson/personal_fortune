import React, { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';
import { getBiorhythm } from '../services/fortuneService';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { addDays, format, differenceInDays } from 'date-fns';

export default function BiorhythmWidget({ birthDate }: { birthDate: string }) {
  const [bioData, setBioData] = useState<any[]>([]);

  useEffect(() => {
    if (birthDate) {
      const fetchBiorhythm = async () => {
        const data = [];
        const today = new Date();
        const birth = new Date(birthDate);
        
        // Generate data for 15 days (7 days before and after today)
        for (let i = -7; i <= 7; i++) {
          const date = addDays(today, i);
          const days = differenceInDays(date, birth);
          
          data.push({
            date: format(date, 'MMM dd'),
            physical: Math.sin((2 * Math.PI * days) / 23),
            emotional: Math.sin((2 * Math.PI * days) / 28),
            intellectual: Math.sin((2 * Math.PI * days) / 33)
          });
        }
        setBioData(data);
      };
      fetchBiorhythm();
    }
  }, [birthDate]);

  if (!birthDate) return (
    <div className="flex items-center justify-center h-full">
      <p className="text-gray-500">Please set your birth date in profile</p>
    </div>
  );
  
  if (!bioData.length) return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500" />
    </div>
  );

  return (
    <div className="h-full flex flex-col">
      <ResponsiveContainer width="100%" height={120}>
        <LineChart data={bioData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="date" 
            fontSize={12}
            tickMargin={8}
          />
          <YAxis 
            domain={[-1, 1]} 
            fontSize={12}
            tickFormatter={(value) => `${Math.round(value * 100)}%`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
            formatter={(value: number) => [`${Math.round(value * 100)}%`]}
          />
          <Line 
            type="monotone" 
            dataKey="physical" 
            stroke="#3B82F6" 
            strokeWidth={2}
            dot={false}
            name="Physical"
          />
          <Line 
            type="monotone" 
            dataKey="emotional" 
            stroke="#EC4899" 
            strokeWidth={2}
            dot={false}
            name="Emotional"
          />
          <Line 
            type="monotone" 
            dataKey="intellectual" 
            stroke="#8B5CF6" 
            strokeWidth={2}
            dot={false}
            name="Intellectual"
          />
        </LineChart>
      </ResponsiveContainer>
      
      <div className="mt-auto pt-4 flex justify-center gap-6 text-sm border-t">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span>Physical</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
          <span>Emotional</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
          <span>Intellectual</span>
        </div>
      </div>
    </div>
  );
}