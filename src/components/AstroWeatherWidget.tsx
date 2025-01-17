import React, { useEffect, useState } from 'react';
import { Cloud, Sun, Moon, Star } from 'lucide-react';
import { getAstroWeather } from '../services/astroWeatherService';
import { supabase } from '../lib/supabase';

export default function AstroWeatherWidget() {
  const [weather, setWeather] = useState<any>(null);
  const [userSunSign, setUserSunSign] = useState<string | null>(null);

  useEffect(() => {
    const loadUserSunSign = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: profile } = await supabase
          .from('profiles')
          .select('birth_date')
          .eq('user_id', user.id)
          .single();

        if (profile?.birth_date) {
          const birthDate = new Date(profile.birth_date);
          const sunSign = getSunSign(birthDate);
          setUserSunSign(sunSign);
        }
      } catch (error) {
        console.error('Error loading user sun sign:', error);
      }
    };

    loadUserSunSign();
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await getAstroWeather(userSunSign);
      setWeather(data);
    };
    fetchWeather();
  }, [userSunSign]);

  const getSunSign = (date: Date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
    return "Pisces";
  };

  if (!weather) return <div className="text-halloween-text-primary">Loading...</div>;

  const getIcon = (type: string) => {
    switch (type) {
      case 'retrograde':
        return <Cloud className="w-8 h-8 text-halloween-accent" />;
      case 'conjunction':
        return <Moon className="w-8 h-8 text-halloween-accent" />;
      case 'season':
        return <Sun className="w-8 h-8 text-halloween-accent" />;
      default:
        return <Star className="w-8 h-8 text-halloween-accent" />;
    }
  };

  return (
    <div className="p-4">
      {/* Daily Horoscope Section */}
      <div className="mb-6 bg-halloween-card/50 rounded-lg border border-halloween-border p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-halloween-text-primary">
            {userSunSign ? `${userSunSign} Horoscope` : 'Daily Horoscope'}
          </h3>
          <span className="text-sm text-halloween-accent">
            {weather.horoscope.element} Sign
          </span>
        </div>
        <p className="text-sm text-halloween-text-secondary mb-3">
          {weather.horoscope.prediction}
        </p>
        <div className="flex items-center justify-end">
          <span className="text-xs text-halloween-text-secondary">
            Lucky Number: {weather.horoscope.luckyNumber}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        {getIcon(weather.primaryInfluence.type)}
        <div>
          <h3 className="text-lg font-semibold text-halloween-text-primary">
            {weather.primaryInfluence.name}
          </h3>
          <p className="text-sm text-halloween-text-secondary">
            {weather.primaryInfluence.duration}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-halloween-text-primary mb-2">Opportunities</h4>
          <div className="space-y-2">
            {weather.opportunities.map((opportunity: string, index: number) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm text-halloween-text-secondary"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                {opportunity}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-halloween-text-primary mb-2">Challenges</h4>
          <div className="space-y-2">
            {weather.challenges.map((challenge: string, index: number) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm text-halloween-text-secondary"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                {challenge}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-halloween-card/50 rounded-lg border border-halloween-border p-4">
          <h4 className="text-sm font-semibold text-halloween-text-primary mb-2">Additional Influences</h4>
          <div className="flex flex-wrap gap-2">
            {weather.additionalInfluences.map((influence: any, index: number) => (
              <span
                key={index}
                className="px-2 py-1 text-xs rounded-full bg-halloween-accent/20 text-halloween-accent"
              >
                {influence.name}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-halloween-card/50 rounded-lg border border-halloween-border p-4">
          <h4 className="text-sm font-semibold text-halloween-text-primary mb-2">Daily Guidance</h4>
          <p className="text-sm text-halloween-text-secondary">{weather.guidance}</p>
        </div>
      </div>
    </div>
  );
}