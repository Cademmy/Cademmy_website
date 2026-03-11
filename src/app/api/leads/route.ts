import { NextRequest, NextResponse } from "next/server";

import { verifyTurnstileToken } from "@/lib/captcha";
import { insertLead } from "@/lib/db";
import { syncLeadToHubSpot } from "@/lib/hubspot";
import { checkRateLimit } from "@/lib/rate-limit";
import { validateLeadInput } from "@/lib/validation";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const limiter = checkRateLimit(`lead:${ip}`);

  if (!limiter.ok) {
    return NextResponse.json({ error: "Demasiadas solicitudes. Intenta de nuevo en unos minutos." }, { status: 429 });
  }

  const payload = await request.json();
  if (typeof payload?.website === "string" && payload.website.trim().length > 0) {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }
  const validated = validateLeadInput(payload);

  if (!validated.valid) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  const isHuman = await verifyTurnstileToken(validated.value.captcha_token);
  if (!isHuman) {
    return NextResponse.json({ error: "Captcha inválido" }, { status: 400 });
  }

  const lead = await insertLead(validated.value);
  await syncLeadToHubSpot(lead);

  return NextResponse.json({ ok: true, id: lead.id, nextUrl: "/gracias/lead" });
}
