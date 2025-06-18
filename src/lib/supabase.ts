import { MMKV } from 'react-native-mmkv';
import { createClient } from '@supabase/supabase-js';

const storage = new MMKV();

const MMKVAdapter = {
  getItem: (key: string) => {
    const value = storage.getString(key);
    return value === undefined ? null : value;
  },
  setItem: (key: string, value: string) => {
    storage.set(key, value);
  },
  removeItem: (key: string) => {
    storage.delete(key);
  },
};

const supabaseUrl = 'https://lsfbzmlueclvnihhwcsr.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzZmJ6bWx1ZWNsdm5paGh3Y3NyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyMTQzMDAsImV4cCI6MjA2NTc5MDMwMH0.kTXlupJjM13O1e7NX8hFjC7QAyu5-gq3P0aT7KhyBhY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: MMKVAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
