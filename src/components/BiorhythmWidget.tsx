import React, { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';
import { getBiorhythm } from '../services/biorhythmService';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { addDays, format, differenceInDays } from 'date-fns';

export default function BiorhythmWidget({ birthDate }: { birthDate: string }) {
  const [bioData, setBioData] = useState<any[]>([]);
  const [todayValues, setTodayValues] = useState<{
    physical: number;
    emotional: number;
    intellectual: number;
  } | null>(null);

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
          const values = {
            physical: Math.sin((2 * Math.PI * days) / 23),
            emotional: Math.sin((2 * Math.PI * days) / 28),
            intellectual: Math.sin((2 * Math.PI * days) / 33)
          };
          
          if (i === 0) {
            setTodayValues(values);
          }
          
          data.push({
            date: format(date, 'MMM dd'),
            ...values
          });
        }
        setBioData(data);
      };
      fetchBiorhythm();
    }
  }, [birthDate]);

  const getPhaseDescription = (value: number) => {
    if (value > 0.8) return "Peak";
    if (value > 0.3) return "High";
    if (value > -0.3) return "Neutral";
    if (value > -0.8) return "Low";
    return "Critical";
  };

  const getAdvice = (physical: number, emotional: number, intellectual: number) => {
    const advice = [];
    
    if (physical > 0.3) {
      advice.push("Good day for physical activities and exercise");
    } else if (physical < -0.3) {
      advice.push("Take it easy physically, focus on rest and recovery");
    }
    
    if (emotional > 0.3) {
      advice.push("Express yourself and connect with others");
    } else if (emotional < -0.3) {
      advice.push("Practice self-care and emotional grounding");
    }
    
    if (intellectual > 0.3) {
      advice.push("Tackle complex tasks and creative projects");
    } else if (intellectual < -0.3) {
      advice.push("Focus on routine tasks and review work");
    }
    
    return advice;
  };

  if (!birthDate) return (
    <div className="flex items-center justify-center h-full">
      <p className="text-gray-500">Please set your birth date in profile</p>
    </div>
  );
  
  if (!bioData.length || !todayValues) return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500" />
    </div>
  );

  return (
    <div className="h-full flex flex-col">
      <ResponsiveContainer width="100%" height={120}>
        <LineChart data={bioData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#3d3450" />
          <XAxis 
            dataKey="date" 
            fontSize={12}
            tickMargin={8}
            stroke="#b8b8b8"
          />
          <YAxis 
            domain={[-1, 1]} 
            fontSize={12}
            tickFormatter={(value) => `${Math.round(value * 100)}%`}
            stroke="#b8b8b8"
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#2d2438',
              border: 'none',
              borderRadius: '0.5rem',
              color: '#ffffff'
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
      
      <div className="mt-4 p-4 bg-halloween-card/50 rounded-lg border border-halloween-border">
        <h4 className="text-sm font-semibold text-halloween-text-primary mb-2">Today's Analysis</h4>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-halloween-text-secondary">Physical:</span>
            <span className="text-sm text-halloween-text-primary">
              {getPhaseDescription(todayValues.physical)} ({Math.round(todayValues.physical * 100)}%)
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-halloween-text-secondary">Emotional:</span>
            <span className="text-sm text-halloween-text-primary">
              {getPhaseDescription(todayValues.emotional)} ({Math.round(todayValues.emotional * 100)}%)
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-halloween-text-secondary">Intellectual:</span>
            <span className="text-sm text-halloween-text-primary">
              {getPhaseDescription(todayValues.intellectual)} ({Math.round(todayValues.intellectual * 100)}%)
            </span>
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-halloween-text-primary">Daily Guidance</h4>
          <ul className="text-sm text-halloween-text-secondary list-disc list-inside">
            {getAdvice(todayValues.physical, todayValues.emotional, todayValues.intellectual).map((advice, index) => (
              <li key={index}>{advice}</li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="mt-auto pt-4 flex justify-center gap-6 text-sm border-t border-halloween-border">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-halloween-text-secondary">Physical</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
          <span className="text-halloween-text-secondary">Emotional</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
          <span className="text-halloween-text-secondary">Intellectual</span>
        </div>
      </div>
    </div>
  );
}