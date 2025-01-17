import React, { useState, useEffect } from 'react';
import ReactGridLayout from 'react-grid-layout';
import { 
  Moon, Compass, BookOpen, ScrollText, User, Hash, Diamond, Cloud, 
  Calendar, Clock, MapPin, Star, Sparkles 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { getHerbs } from '../services/herbService';
import { getSunSign, getMoonSign, getAscendant } from '../services/astroService';
import { getChineseZodiac } from '../services/chineseZodiacService';
import MoonPhaseWidget from '../components/MoonPhaseWidget';
import BiorhythmWidget from '../components/BiorhythmWidget';
import AstroWidget from '../components/AstroWidget';
import IChingWidget from '../components/IChingWidget';
import TarotWidget from '../components/TarotWidget';
import NumerologyWidget from '../components/NumerologyWidget';
import CrystalWidget from '../components/CrystalWidget';
import AstroWeatherWidget from '../components/AstroWeatherWidget';
import OccultNewsFooter from '../components/OccultNewsFooter';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const defaultLayout = [
  { i: 'astroweather', x: 0, y: 0, w: 6, h: 4.4 },
  { i: 'moon', x: 6, y: 0, w: 6, h: 4.4 },
  { i: 'biorhythm', x: 0, y: 4.4, w: 6, h: 4.4 },
  { i: 'crystal', x: 6, y: 4.4, w: 6, h: 4 },
  { i: 'astro', x: 0, y: 8.8, w: 6, h: 8 },
  { i: 'numerology', x: 6, y: 8.4, w: 6, h: 4 },
  { i: 'iching', x: 6, y: 12.4, w: 3, h: 6 },
  { i: 'tarot', x: 9, y: 12.4, w: 3, h: 6 }
];

export default function Dashboard() {
  const [currentLayout, setCurrentLayout] = useState(defaultLayout);
  const [profile, setProfile] = useState<any>(null);
  const [email, setEmail] = useState<string>('');
  const [herbs, setHerbs] = useState<any[]>([]);
  const [currentHerbIndex, setCurrentHerbIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [zodiacInfo, setZodiacInfo] = useState<{
    sunSign: string | null;
    moonSign: string | null;
    ascendant: string | null;
    chineseZodiac: {
      animal: string;
      element: string;
      yearStatus: string;
    } | null;
  }>({
    sunSign: null,
    moonSign: null,
    ascendant: null,
    chineseZodiac: null
  });

  useEffect(() => {
    loadProfile();
    loadHerbs();
  }, []);

  useEffect(() => {
    if (profile?.birth_date) {
      const birthDate = new Date(profile.birth_date);
      const sunSign = getSunSign(birthDate);
      const moonSign = getMoonSign(birthDate);
      const ascendant = getAscendant(profile.birth_time, profile.birth_date);
      const chineseZodiac = getChineseZodiac(birthDate.getFullYear());

      setZodiacInfo({
        sunSign,
        moonSign,
        ascendant,
        chineseZodiac
      });
    }
  }, [profile]);

  useEffect(() => {
    if (herbs.length > 0) {
      const interval = setInterval(() => {
        setCurrentHerbIndex((prev) => (prev + 1) % herbs.length);
      }, 10000); // Change herb every 10 seconds
      return () => clearInterval(interval);
    }
  }, [herbs]);

  async function loadProfile() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      setEmail(user.email || '');

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  }

  async function loadHerbs() {
    try {
      const herbsData = await getHerbs();
      setHerbs(herbsData);
    } catch (error) {
      console.error('Error loading herbs:', error);
    } finally {
      setLoading(false);
    }
  }

  const renderHerbAssociations = (herb: any) => {
    if (!herb?.associations) return null;
    
    return (
      <div className="mt-4 space-y-3 border-t border-halloween-border pt-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-semibold text-halloween-text-primary mb-2">Planetary & Elemental</h3>
            <p className="text-sm text-halloween-text-secondary">
              Planet: {herb.associations.planet}<br />
              Element: {herb.associations.element}<br />
              Gender: {herb.associations.gender}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-halloween-text-primary mb-2">Zodiacal Rulership</h3>
            <p className="text-sm text-halloween-text-secondary">
              {herb.associations.zodiac.join(', ')}
            </p>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-semibold text-halloween-text-primary mb-2">Magickal Uses</h3>
          <div className="flex flex-wrap gap-2">
            {herb.associations.magickal_uses.map((use: string, index: number) => (
              <span 
                key={index}
                className="px-2 py-1 text-xs rounded-full bg-halloween-accent/20 text-halloween-accent"
              >
                {use}
              </span>
            ))}
          </div>
        </div>
        
        {herb.illustration && (
          <div className="mt-4">
            <img
              src={herb.illustration}
              alt={`${herb.name} illustration`}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        )}
        
        <div className="mt-4">
          <p className="text-sm text-halloween-text-secondary italic">
            {herb.additionalInfo}
          </p>
        </div>
      </div>
    );
  };

  const renderZodiacInfo = () => {
    if (!profile?.birth_date) return null;

    return (
      <div className="mt-6 space-y-4 pt-4 border-t border-halloween-border">
        <div>
          <h4 className="text-sm font-medium text-halloween-text-primary mb-3 flex items-center gap-2">
            <Star className="h-4 w-4 text-halloween-accent" />
            Astrological Signs
          </h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-halloween-text-secondary">Sun Sign</span>
              <span className="text-sm text-halloween-text-primary font-medium">
                {zodiacInfo.sunSign || '—'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-halloween-text-secondary">Moon Sign</span>
              <span className="text-sm text-halloween-text-primary font-medium">
                {zodiacInfo.moonSign || '—'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-halloween-text-secondary">Ascendant</span>
              <span className="text-sm text-halloween-text-primary font-medium">
                {zodiacInfo.ascendant || '—'}
              </span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-halloween-text-primary mb-3 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-halloween-accent" />
            Chinese Zodiac
          </h4>
          {zodiacInfo.chineseZodiac ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-halloween-text-secondary">Animal</span>
                <span className="text-sm text-halloween-text-primary font-medium">
                  {zodiacInfo.chineseZodiac.animal}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-halloween-text-secondary">Element</span>
                <span className="text-sm text-halloween-text-primary font-medium">
                  {zodiacInfo.chineseZodiac.element}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-halloween-text-secondary">Year Status</span>
                <span className={`text-sm font-medium ${
                  zodiacInfo.chineseZodiac.yearStatus === 'Auspicious' 
                    ? 'text-green-400' 
                    : zodiacInfo.chineseZodiac.yearStatus === 'Inauspicious'
                    ? 'text-red-400'
                    : 'text-halloween-text-primary'
                }`}>
                  {zodiacInfo.chineseZodiac.yearStatus}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-halloween-text-secondary">
              Complete your profile to see your Chinese zodiac details
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-halloween-background">
      <div className="p-6">
        <div className="flex flex-col gap-6 max-w-7xl mx-auto">
          <header className="flex justify-between items-start">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-halloween-text-primary inline-block px-4 py-2 rounded-lg bg-halloween-secondary/30">
                Personal Fortune
              </h1>
              
              {loading ? (
                <div className="bg-halloween-card rounded-lg shadow-lg shadow-halloween-secondary/20 p-8 border border-halloween-border">
                  <div className="animate-pulse flex space-x-4">
                    <div className="flex-1 space-y-4">
                      <div className="h-4 bg-halloween-border rounded w-3/4"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-halloween-border rounded"></div>
                        <div className="h-4 bg-halloween-border rounded w-5/6"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : herbs.length > 0 ? (
                <div className="bg-halloween-card rounded-lg shadow-lg shadow-halloween-secondary/20 overflow-hidden border border-halloween-border">
                  <div className="flex">
                    <div className="w-1/3">
                      <img
                        src={herbs[currentHerbIndex].image}
                        alt={herbs[currentHerbIndex].name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="w-2/3 p-6">
                      <h2 className="text-xl font-semibold mb-2 text-halloween-text-primary">
                        {herbs[currentHerbIndex].name}
                      </h2>
                      <p className="text-halloween-text-secondary leading-relaxed">
                        {herbs[currentHerbIndex].description}
                      </p>
                      {renderHerbAssociations(herbs[currentHerbIndex])}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-halloween-card rounded-lg shadow-lg shadow-halloween-secondary/20 p-8 border border-halloween-border">
                  <p className="text-halloween-text-secondary">Failed to load herbs information.</p>
                </div>
              )}
            </div>
            
            <div className="bg-halloween-card rounded-lg shadow-lg shadow-halloween-secondary/20 p-6 w-80 border border-halloween-border">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-semibold text-halloween-text-primary text-lg">User Profile</h3>
                  <p className="text-sm text-halloween-text-secondary mt-1">Your mystical identity</p>
                </div>
                <Link
                  to="/profile"
                  className="text-halloween-accent hover:text-halloween-accent/80 flex items-center gap-2 text-sm bg-halloween-accent/10 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <User className="h-4 w-4" />
                  Edit Profile
                </Link>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <User className="h-5 w-5 text-halloween-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-halloween-text-primary">Email</p>
                    <p className="text-sm text-halloween-text-secondary break-all">
                      {email || 'Not set'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <Calendar className="h-5 w-5 text-halloween-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-halloween-text-primary">Birth Date</p>
                    <p className="text-sm text-halloween-text-secondary">
                      {profile?.birth_date || 'Not set'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <Clock className="h-5 w-5 text-halloween-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-halloween-text-primary">Birth Time</p>
                    <p className="text-sm text-halloween-text-secondary">
                      {profile?.birth_time || 'Not set'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <MapPin className="h-5 w-5 text-halloween-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-halloween-text-primary">Birth Place</p>
                    <p className="text-sm text-halloween-text-secondary">
                      {profile?.birth_place || 'Not set'}
                    </p>
                  </div>
                </div>
              </div>

              {renderZodiacInfo()}

              {(!profile?.birth_date || !profile?.birth_time || !profile?.birth_place) && (
                <div className="mt-6 p-3 bg-halloween-background/50 rounded-lg border border-halloween-border">
                  <p className="text-sm text-halloween-text-secondary">
                    ✨ Complete your profile to unlock personalized astrological insights and readings.
                  </p>
                </div>
              )}
            </div>
          </header>

          <ReactGridLayout
            className="layout"
            layout={currentLayout}
            cols={12}
            rowHeight={100}
            width={1200}
            onLayoutChange={(layout) => setCurrentLayout(layout)}
            draggableHandle=".widget-handle"
          >
            <div key="astroweather" className="bg-halloween-card rounded-lg shadow-lg shadow-halloween-secondary/20 p-4 border border-halloween-border">
              <div className="widget-handle flex items-center justify-between mb-4 cursor-move">
                <h2 className="text-lg font-semibold flex items-center gap-2 text-halloween-text-primary">
                  <Cloud className="h-5 w-5 text-halloween-accent" />
                  Astrological Weather
                </h2>
              </div>
              <AstroWeatherWidget />
            </div>

            <div key="moon" className="bg-halloween-card rounded-lg shadow-lg shadow-halloween-secondary/20 p-4 border border-halloween-border">
              <div className="widget-handle flex items-center justify-between mb-4 cursor-move">
                <h2 className="text-lg font-semibold flex items-center gap-2 text-halloween-text-primary">
                  <Moon className="h-5 w-5 text-halloween-accent" />
                  Moon Phase
                </h2>
              </div>
              <MoonPhaseWidget />
            </div>

            <div key="biorhythm" className="bg-halloween-card rounded-lg shadow-lg shadow-halloween-secondary/20 p-4 border border-halloween-border">
              <div className="widget-handle flex items-center justify-between mb-4 cursor-move">
                <h2 className="text-lg font-semibold flex items-center gap-2 text-halloween-text-primary">
                  <Compass className="h-5 w-5 text-halloween-accent" />
                  Biorhythm
                </h2>
              </div>
              <BiorhythmWidget birthDate={profile?.birth_date || ''} />
            </div>

            <div key="crystal" className="bg-halloween-card rounded-lg shadow-lg shadow-halloween-secondary/20 p-4 border border-halloween-border">
              <div className="widget-handle flex items-center justify-between mb-4 cursor-move">
                <h2 className="text-lg font-semibold flex items-center gap-2 text-halloween-text-primary">
                  <Diamond className="h-5 w-5 text-halloween-accent" />
                  Crystal of the Day
                </h2>
              </div>
              <CrystalWidget />
            </div>

            <div key="astro" className="bg-halloween-card rounded-lg shadow-lg shadow-halloween-secondary/20 p-4 border border-halloween-border">
              <div className="widget-handle flex items-center justify-between mb-4 cursor-move">
                <h2 className="text-lg font-semibold flex items-center gap-2 text-halloween-text-primary">
                  <BookOpen className="h-5 w-5 text-halloween-accent" />
                  Astrological Chart
                </h2>
              </div>
              <AstroWidget 
                birthDate={profile?.birth_date || ''} 
                birthTime={profile?.birth_time || ''} 
                birthPlace={profile?.birth_place || ''} 
              />
            </div>

            <div key="numerology" className="bg-halloween-card rounded-lg shadow-lg shadow-halloween-secondary/20 p-4 border border-halloween-border">
              <div className="widget-handle flex items-center justify-between mb-4 cursor-move">
                <h2 className="text-lg font-semibold flex items-center gap-2 text-halloween-text-primary">
                  <Hash className="h-5 w-5 text-halloween-accent" />
                  Numerology
                </h2>
              </div>
              <NumerologyWidget birthDate={profile?.birth_date || ''} />
            </div>

            <div key="iching" className="bg-halloween-card rounded-lg shadow-lg shadow-halloween-secondary/20 p-4 border border-halloween-border">
              <div className="widget-handle flex items-center justify-between mb-4 cursor-move">
                <h2 className="text-lg font-semibold flex items-center gap-2 text-halloween-text-primary">
                  <ScrollText className="h-5 w-5 text-halloween-accent" />
                  I-Ching
                </h2>
              </div>
              <IChingWidget />
            </div>

            <div key="tarot" className="bg-halloween-card rounded-lg shadow-lg shadow-halloween-secondary/20 p-4 border border-halloween-border">
              <div className="widget-handle flex items-center justify-between mb-4 cursor-move">
                <h2 className="text-lg font-semibold flex items-center gap-2 text-halloween-text-primary">
                  <ScrollText className="h-5 w-5 text-halloween-accent" />
                  Tarot Reading
                </h2>
              </div>
              <TarotWidget />
            </div>
          </ReactGridLayout>
        </div>
      </div>
      <OccultNewsFooter />
    </div>
  );
}