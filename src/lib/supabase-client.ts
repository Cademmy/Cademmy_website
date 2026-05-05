"use client";

import { AuthChangeEvent, Session, User, createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let client: ReturnType<typeof createClient> | null = null;

export type SupabaseAuthUser = User;

export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

export function getSupabaseClient() {
  if (!isSupabaseConfigured()) return null;
  if (!client) {
    client = createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });
  }
  return client;
}

export async function getCurrentSession(): Promise<Session | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase.auth.getSession();
  if (error) return null;
  return data.session;
}

export async function getCurrentUser(): Promise<User | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) return null;
  return data.user;
}

export function subscribeToAuthState(callback: (user: User | null) => void) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    callback(null);
    return () => undefined;
  }

  const {
    data: { subscription }
  } = supabase.auth.onAuthStateChange(async (_event: AuthChangeEvent, session) => {
    callback(session?.user ?? null);
  });

  void getCurrentUser().then(callback);

  return () => subscription.unsubscribe();
}

export async function signInWithProvider(providerName: "google" | "microsoft" | "apple") {
  const supabase = getSupabaseClient();
  if (!supabase) {
    throw new Error("Supabase Auth no esta configurado.");
  }

  const redirectTo =
    typeof window !== "undefined" ? `${window.location.origin}/cuenta` : process.env.NEXT_PUBLIC_SITE_URL;
  const provider = providerName === "microsoft" ? "azure" : providerName;
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo }
  });

  if (error) throw error;
}

export async function signOutCurrentUser() {
  const supabase = getSupabaseClient();
  if (!supabase) return;
  await supabase.auth.signOut();
}
