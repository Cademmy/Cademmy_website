import { NextRequest, NextResponse } from "next/server";

import { claimEntitlementsForUser, listEntitlementsForUser, listPaymentsForUser } from "@/lib/db";
import { getBearerToken, verifySupabaseAccessToken } from "@/lib/supabase-auth";

export async function GET(request: NextRequest) {
  const token = getBearerToken(request.headers.get("authorization"));

  if (!token) {
    return NextResponse.json({ error: "Inicia sesion para ver tu cuenta." }, { status: 401 });
  }

  try {
    const user = await verifySupabaseAccessToken(token);
    if (!user) {
      return NextResponse.json({ error: "Sesion invalida." }, { status: 401 });
    }

    await claimEntitlementsForUser(user.uid, user.email);
    const [entitlements, payments] = await Promise.all([
      listEntitlementsForUser(user.uid, user.email),
      listPaymentsForUser(user.uid, user.email)
    ]);

    return NextResponse.json({
      user,
      entitlements,
      payments
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "No se pudo cargar tu cuenta." },
      { status: 401 }
    );
  }
}
