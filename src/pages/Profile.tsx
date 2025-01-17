import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Calendar, Clock, MapPin, Loader } from 'lucide-react';

export default function Profile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    birth_date: '',
    birth_time: '',
    birth_place: ''
  });

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      let { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code === 'PGRST116') {
        // Profile doesn't exist, create it
        const { data: newProfile, error: insertError } = await supabase
          .from('profiles')
          .insert([
            { 
              user_id: user.id,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }
          ])
          .select()
          .single();

        if (insertError) throw insertError;
        data = newProfile;
      } else if (error) {
        throw error;
      }

      if (data) {
        setProfile({
          birth_date: data.birth_date || '',
          birth_time: data.birth_time || '',
          birth_place: data.birth_place || ''
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  }

  async function updateProfile(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user');

      const { error } = await supabase
        .from('profiles')
        .update({
          ...profile,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) throw error;
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-halloween-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-halloween-card rounded-lg shadow-lg shadow-halloween-secondary/20 p-8 border border-halloween-border">
        <h1 className="text-2xl font-bold text-center mb-8 text-halloween-text-primary">Your Profile</h1>
        
        <form onSubmit={updateProfile} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-halloween-text-primary">
              Date of Birth
            </label>
            <div className="mt-1 relative">
              <input
                type="date"
                value={profile.birth_date}
                onChange={(e) => setProfile({ ...profile, birth_date: e.target.value })}
                className="appearance-none block w-full px-3 py-2 bg-halloween-background border border-halloween-border rounded-md shadow-sm text-halloween-text-primary placeholder-halloween-text-secondary focus:outline-none focus:ring-2 focus:ring-halloween-accent focus:border-transparent"
              />
              <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-halloween-text-secondary" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-halloween-text-primary">
              Time of Birth
            </label>
            <div className="mt-1 relative">
              <input
                type="time"
                value={profile.birth_time}
                onChange={(e) => setProfile({ ...profile, birth_time: e.target.value })}
                className="appearance-none block w-full px-3 py-2 bg-halloween-background border border-halloween-border rounded-md shadow-sm text-halloween-text-primary placeholder-halloween-text-secondary focus:outline-none focus:ring-2 focus:ring-halloween-accent focus:border-transparent"
              />
              <Clock className="absolute right-3 top-2.5 h-5 w-5 text-halloween-text-secondary" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-halloween-text-primary">
              Place of Birth
            </label>
            <div className="mt-1 relative">
              <input
                type="text"
                value={profile.birth_place}
                onChange={(e) => setProfile({ ...profile, birth_place: e.target.value })}
                placeholder="City, Country"
                className="appearance-none block w-full px-3 py-2 bg-halloween-background border border-halloween-border rounded-md shadow-sm text-halloween-text-primary placeholder-halloween-text-secondary focus:outline-none focus:ring-2 focus:ring-halloween-accent focus:border-transparent"
              />
              <MapPin className="absolute right-3 top-2.5 h-5 w-5 text-halloween-text-secondary" />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-halloween-accent hover:bg-halloween-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-halloween-accent transition-colors duration-200"
            >
              {loading ? <Loader className="animate-spin h-5 w-5" /> : 'Save Profile'}
            </button>

            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="flex-1 py-2 px-4 border border-halloween-border rounded-md shadow-sm text-sm font-medium text-halloween-text-primary bg-halloween-card hover:bg-halloween-card/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-halloween-border transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}