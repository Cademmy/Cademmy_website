"use client";

import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";

import {
  SupabaseAuthUser,
  getCurrentSession,
  isSupabaseConfigured,
  signInWithProvider,
  signOutCurrentUser,
  subscribeToAuthState
} from "@/lib/supabase-client";

type AuthContextValue = {
  user: SupabaseAuthUser | null;
  loading: boolean;
  authReady: boolean;
  signIn: (provider: "google" | "microsoft" | "apple") => Promise<void>;
  signOut: () => Promise<void>;
  getAccessToken: () => Promise<string | null>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SupabaseAuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [authReady] = useState(isSupabaseConfigured());

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setLoading(false);
      return () => undefined;
    }

    const unsubscribe = subscribeToAuthState((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      authReady,
      signIn: async (provider) => {
        await signInWithProvider(provider);
      },
      signOut: async () => {
        await signOutCurrentUser();
      },
      getAccessToken: async () => {
        const session = await getCurrentSession();
        return session?.access_token ?? null;
      }
    }),
    [authReady, loading, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
}
