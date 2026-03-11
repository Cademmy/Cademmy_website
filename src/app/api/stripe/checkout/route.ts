import { NextRequest, NextResponse } from "next/server";

import { getStripeClient } from "@/lib/stripe";
import { SkuId } from "@/lib/types";

const skuEnvMap: Record<SkuId, string | undefined> = {
  DISCOVERY_CALL_DEPOSIT: process.env.STRIPE_PRICE_DISCOVERY_CALL_DEPOSIT,
  CONSULTING_SPRINT: process.env.STRIPE_PRICE_CONSULTING_SPRINT,
  TEAM_TRAINING_PACK: process.env.STRIPE_PRICE_TEAM_TRAINING_PACK,
  CERTIFICATION_ENROLLMENT: process.env.STRIPE_PRICE_CERTIFICATION_ENROLLMENT
};

const paymentLinkEnvMap: Record<SkuId, string | undefined> = {
  DISCOVERY_CALL_DEPOSIT: process.env.STRIPE_PAYMENT_LINK_DISCOVERY_CALL_DEPOSIT,
  CONSULTING_SPRINT: process.env.STRIPE_PAYMENT_LINK_CONSULTING_SPRINT,
  TEAM_TRAINING_PACK: process.env.STRIPE_PAYMENT_LINK_TEAM_TRAINING_PACK,
  CERTIFICATION_ENROLLMENT: process.env.STRIPE_PAYMENT_LINK_CERTIFICATION_ENROLLMENT
};

type Body = {
  sku: SkuId;
  email?: string;
};

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Body;
  const sku = body.sku;

  if (!sku || !(sku in skuEnvMap)) {
    return NextResponse.json({ error: "SKU inválido" }, { status: 400 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const stripe = getStripeClient();
  const priceId = skuEnvMap[sku];

  if (stripe && priceId) {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      locale: "es",
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: body.email,
      success_url: `${siteUrl}/gracias/pago?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/paquetes`
    });

    if (!session.url) {
      return NextResponse.json({ error: "No se pudo crear la sesión de pago" }, { status: 500 });
    }

    return NextResponse.json({ checkoutUrl: session.url });
  }

  const paymentLink = paymentLinkEnvMap[sku];
  if (paymentLink) {
    return NextResponse.json({ checkoutUrl: paymentLink });
  }

  return NextResponse.json(
    {
      error:
        "Falta configuración de Stripe. Define STRIPE_SECRET_KEY + STRIPE_PRICE_* o STRIPE_PAYMENT_LINK_*"
    },
    { status: 500 }
  );
}
