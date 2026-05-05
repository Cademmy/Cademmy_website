import { NextRequest, NextResponse } from "next/server";

import { checkRateLimit } from "@/lib/rate-limit";
import { getSolutionOffer } from "@/lib/solution-catalog";
import { getStripeClient } from "@/lib/stripe";
import { verifySupabaseAccessToken } from "@/lib/supabase-auth";
import { SkuId } from "@/lib/types";

type Body = {
  sku: SkuId;
  email?: string;
  origin?: string;
  accessToken?: string;
};

function normalizeEmail(email?: string | null): string | undefined {
  const normalized = String(email ?? "").trim().toLowerCase();
  return normalized || undefined;
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  const limiter = await checkRateLimit(`checkout:${ip}`, 8, 10 * 60 * 1000);

  if (!limiter.ok) {
    return NextResponse.json(
      { error: "Demasiados intentos de checkout. Intenta de nuevo en unos minutos." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.max(1, Math.ceil((limiter.resetAt - Date.now()) / 1000)))
        }
      }
    );
  }

  const body = (await request.json()) as Body;
  const offer = getSolutionOffer(body.sku);

  if (!offer) {
    return NextResponse.json({ error: "Servicio invalido" }, { status: 400 });
  }

  let verifiedUser = null;
  if (body.accessToken) {
    verifiedUser = await verifySupabaseAccessToken(body.accessToken);
  }

  const customerEmail = normalizeEmail(verifiedUser?.email || body.email);
  if (!customerEmail) {
    return NextResponse.json(
      { error: "Necesitamos un correo para asignar el acceso a tu cuenta Cademmy." },
      { status: 400 }
    );
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const stripe = getStripeClient();
  const priceId = process.env[offer.priceEnv];

  if (stripe && priceId) {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      locale: "es",
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: customerEmail,
      metadata: {
        sku: offer.sku,
        unit: offer.unit,
        origin: body.origin ?? offer.unit,
        user_id: verifiedUser?.uid ?? "",
        access_url: offer.accessUrl
      },
      payment_intent_data: {
        metadata: {
          sku: offer.sku,
          unit: offer.unit,
          origin: body.origin ?? offer.unit,
          user_id: verifiedUser?.uid ?? ""
        }
      },
      success_url: `${siteUrl}/gracias/pago?sku=${offer.sku}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}${offer.detailHref}?cancelled=1`
    });

    if (!session.url) {
      return NextResponse.json({ error: "No se pudo crear la sesion de pago" }, { status: 500 });
    }

    return NextResponse.json({ checkoutUrl: session.url });
  }

  const paymentLink = process.env[offer.paymentLinkEnv];
  if (paymentLink) {
    return NextResponse.json({ checkoutUrl: paymentLink });
  }

  return NextResponse.json(
    {
      error:
        "Este servicio aun no tiene checkout publico configurado. Dejanos tus datos y te ayudamos a completar la contratacion."
    },
    { status: 500 }
  );
}
