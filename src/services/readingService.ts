import { supabase } from '../lib/supabase';

export async function saveReading(userId: string, type: string, content: any) {
  const { error } = await supabase
    .from('readings')
    .insert([
      {
        user_id: userId,
        type,
        content
      }
    ]);
  
  if (error) throw error;
}