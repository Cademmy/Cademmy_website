type SupabaseUserResponse = {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
    name?: string;
    avatar_url?: string;
    picture?: string;
  };
};

export type VerifiedSupabaseUser = {
  uid: string;
  email?: string;
  name?: string;
  photoUrl?: string;
};

export async function verifySupabaseAccessToken(accessToken?: string | null): Promise<VerifiedSupabaseUser | null> {
  if (!accessToken) return null;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase Auth no esta configurado en el servidor.");
  }

  const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: {
      apikey: supabaseAnonKey,
      authorization: `Bearer ${accessToken}`
    },
    cache: "no-store"
  });

  const payload = (await response.json()) as SupabaseUserResponse & { msg?: string; error_description?: string };

  if (!response.ok || !payload.id) {
    throw new Error(payload.error_description || payload.msg || "Sesion Supabase invalida.");
  }

  return {
    uid: payload.id,
    email: payload.email,
    name: payload.user_metadata?.full_name ?? payload.user_metadata?.name,
    photoUrl: payload.user_metadata?.avatar_url ?? payload.user_metadata?.picture
  };
}

export function getBearerToken(authorizationHeader: string | null): string | null {
  if (!authorizationHeader?.startsWith("Bearer ")) return null;
  return authorizationHeader.slice("Bearer ".length).trim() || null;
}
