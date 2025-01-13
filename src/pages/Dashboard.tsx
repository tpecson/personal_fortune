import React, { useState, useEffect } from 'react';
import ReactGridLayout from 'react-grid-layout';
import { Moon, Compass, BookOpen, ScrollText, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import MoonPhaseWidget from '../components/MoonPhaseWidget';
import BiorhythmWidget from '../components/BiorhythmWidget';
import AstroWidget from '../components/AstroWidget';
import IChingWidget from '../components/IChingWidget';
import TarotWidget from '../components/TarotWidget';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const herbs = [
  {
    name: "Lavender",
    image: "https://images.unsplash.com/photo-1595235060330-c51166d60d69",
    description: "Sacred to Mercury, lavender is used for purification, peace, and restful sleep. Its calming properties make it ideal for meditation and dream work."
  },
  {
    name: "Rosemary",
    image: "https://images.unsplash.com/photo-1515586000433-45406d8e6662",
    description: "Associated with the Sun and Fire, rosemary enhances memory, protection, and mental clarity. It's traditionally used to purify sacred spaces and strengthen spellwork."
  },
  {
    name: "Sage",
    image: "https://images.unsplash.com/photo-1600831606133-c9b0aeb2aa0f",
    description: "Ruled by Jupiter, sage is a powerful cleansing herb used for wisdom, longevity, and purification. It's essential in smudging rituals and healing magic."
  },
  {
    name: "Chamomile",
    image: "https://images.unsplash.com/photo-1587593132708-ced55ed0f132",
    description: "Governed by the Sun, chamomile brings peace, prosperity, and healing. It's often used in sleep magic and for attracting abundance."
  },
  {
    name: "Mugwort",
    image: "https://images.unsplash.com/photo-15645088806-4f0e7b2e9d76",
    description: "Sacred to the Moon, mugwort enhances psychic abilities and prophetic dreams. It's traditionally used for divination and astral travel."
  }
];

const layout = [
  { i: 'moon', x: 0, y: 0, w: 3, h: 2 },
  { i: 'biorhythm', x: 3, y: 0, w: 9, h: 3 },
  { i: 'astro', x: 0, y: 3, w: 6, h: 7 },
  { i: 'iching', x: 6, y: 3, w: 3, h: 4 },
  { i: 'tarot', x: 9, y: 3, w: 3, h: 4 },
];

export default function Dashboard() {
  const [currentLayout, setCurrentLayout] = useState(layout);
  const [profile, setProfile] = useState<any>(null);
  const [email, setEmail] = useState<string>('');
  const [currentHerb, setCurrentHerb] = useState(herbs[Math.floor(Math.random() * herbs.length)]);

  useEffect(() => {
    loadProfile();
  }, []);

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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-6 flex justify-between items-start">
        <h1 className="text-3xl font-bold text-gray-900">Personal Fortune</h1>
        
        <div className="bg-white rounded-lg shadow-md p-4 w-64">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-800">User Information</h3>
            <Link
              to="/profile"
              className="text-purple-600 hover:text-purple-700 flex items-center gap-1 text-sm"
            >
              <User className="h-4 w-4" />
              Profile
            </Link>
          </div>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium">Email:</span> {email}</p>
            <p><span className="font-medium">Birth Date:</span> {profile?.birth_date || 'Not set'}</p>
            <p><span className="font-medium">Birth Time:</span> {profile?.birth_time || 'Not set'}</p>
            <p><span className="font-medium">Birth Place:</span> {profile?.birth_place || 'Not set'}</p>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto mb-8 bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex">
          <div className="w-1/3">
            <img
              src={currentHerb.image}
              alt={currentHerb.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="w-2/3 p-6">
            <h2 className="text-xl font-semibold mb-2">{currentHerb.name}</h2>
            <p className="text-gray-600 leading-relaxed">{currentHerb.description}</p>
          </div>
        </div>
      </div>

      <ReactGridLayout
        className="layout"
        layout={currentLayout}
        cols={12}
        rowHeight={100}
        width={1200}
        onLayoutChange={(layout) => setCurrentLayout(layout)}
        draggableHandle=".widget-handle"
      >
        <div key="moon" className="bg-white rounded-lg shadow-lg p-4">
          <div className="widget-handle flex items-center justify-between mb-4 cursor-move">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Moon className="h-5 w-5" />
              Moon Phase
            </h2>
          </div>
          <MoonPhaseWidget />
        </div>

        <div key="biorhythm" className="bg-white rounded-lg shadow-lg p-4">
          <div className="widget-handle flex items-center justify-between mb-4 cursor-move">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Compass className="h-5 w-5" />
              Biorhythm
            </h2>
          </div>
          <BiorhythmWidget birthDate={profile?.birth_date || ''} />
        </div>

        <div key="astro" className="bg-white rounded-lg shadow-lg p-4">
          <div className="widget-handle flex items-center justify-between mb-4 cursor-move">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Astrological Chart
            </h2>
          </div>
          <AstroWidget 
            birthDate={profile?.birth_date || ''} 
            birthTime={profile?.birth_time || ''} 
            birthPlace={profile?.birth_place || ''} 
          />
        </div>

        <div key="iching" className="bg-white rounded-lg shadow-lg p-4">
          <div className="widget-handle flex items-center justify-between mb-4 cursor-move">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <ScrollText className="h-5 w-5" />
              I-Ching
            </h2>
          </div>
          <IChingWidget />
        </div>

        <div key="tarot" className="bg-white rounded-lg shadow-lg p-4">
          <div className="widget-handle flex items-center justify-between mb-4 cursor-move">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <ScrollText className="h-5 w-5" />
              Tarot Reading
            </h2>
          </div>
          <TarotWidget />
        </div>
      </ReactGridLayout>
    </div>
  );
}