import { NextRequest, NextResponse } from "next/server";

import { verifyTurnstileToken } from "@/lib/captcha";
import { buildDiagnosisResult } from "@/lib/diagnosis";
import { insertLead } from "@/lib/db";
import { syncLeadToHubSpot } from "@/lib/hubspot";
import { checkRateLimit } from "@/lib/rate-limit";
import { validateLeadInput } from "@/lib/validation";

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  const limiter = await checkRateLimit(`lead:${ip}`);

  if (!limiter.ok) {
    return NextResponse.json(
      { error: "Demasiadas solicitudes. Intenta de nuevo en unos minutos." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.max(1, Math.ceil((limiter.resetAt - Date.now()) / 1000)))
        }
      }
    );
  }

  const payload = await request.json();
  if (typeof payload?.website === "string" && payload.website.trim().length > 0) {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }
  const validated = validateLeadInput(payload);

  if (!validated.valid) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  let leadPayload = validated.value;
  let diagnosisResult = leadPayload.diagnosis?.result;

  if (leadPayload.lead_kind === "diagnosis" && leadPayload.diagnosis?.answers) {
    diagnosisResult = buildDiagnosisResult(leadPayload.diagnosis.answers);
    leadPayload = {
      ...leadPayload,
      diagnosis: {
        answers: leadPayload.diagnosis.answers,
        result: diagnosisResult
      }
    };
  }

  const isHuman = await verifyTurnstileToken(leadPayload.captcha_token, ip);
  if (!isHuman) {
    return NextResponse.json({ error: "Captcha inválido" }, { status: 400 });
  }

  const lead = await insertLead(leadPayload);
  await syncLeadToHubSpot(lead);

  return NextResponse.json({
    ok: true,
    id: lead.id,
    nextUrl: lead.lead_kind === "diagnosis" ? "/diagnostico-rh" : "/gracias/lead",
    diagnosis: diagnosisResult ?? null
  });
}
