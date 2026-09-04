import { createClient } from "@supabase/supabase-js";

const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const key = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

export function isSupabaseConfigured() {
  return Boolean(url && key);
}

export function createSupabaseClient() {
  if (!url || !key) return null;
  return createClient(url, key);
}
