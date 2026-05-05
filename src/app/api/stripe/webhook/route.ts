import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { grantEntitlement, revokeEntitlementsByPayment, upsertPayment } from "@/lib/db";
import { getSolutionOffer } from "@/lib/solution-catalog";
import { getStripeClient } from "@/lib/stripe";
import { SkuId } from "@/lib/types";

function readSku(value?: string | null): SkuId | null {
  if (!value) return null;
  return getSolutionOffer(value) ? (value as SkuId) : null;
}

export async function POST(request: Request) {
  const stripe = getStripeClient();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !webhookSecret) {
    return NextResponse.json({ error: "Webhook no configurado" }, { status: 400 });
  }

  const body = await request.text();
  const signature = headers().get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Firma faltante" }, { status: 400 });
  }

  try {
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const sku = readSku(session.metadata?.sku);
        const offer = sku ? getSolutionOffer(sku) : null;

        if (!sku || !offer) break;

        const customerEmail = session.customer_details?.email ?? session.customer_email ?? undefined;
        const paymentId = await upsertPayment({
          sku,
          unit: offer.unit,
          user_id: session.metadata?.user_id || undefined,
          stripe_session_id: session.id,
          stripe_payment_intent_id: typeof session.payment_intent === "string" ? session.payment_intent : undefined,
          stripe_customer_id: typeof session.customer === "string" ? session.customer : undefined,
          customer_email: customerEmail,
          amount_mxn: session.amount_total ? Math.round(session.amount_total / 100) : undefined,
          status: "paid",
          source: session.metadata?.origin ?? offer.unit,
          paid_at: new Date().toISOString()
        });

        if (customerEmail) {
          await grantEntitlement({
            payment_id: paymentId,
            user_id: session.metadata?.user_id || undefined,
            customer_email: customerEmail,
            unit: offer.unit,
            sku,
            stripe_session_id: session.id
          });
        }
        break;
      }
      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const sku = readSku(paymentIntent.metadata?.sku);
        const offer = sku ? getSolutionOffer(sku) : null;

        if (!sku || !offer) break;

        await upsertPayment({
          sku,
          unit: offer.unit,
          user_id: paymentIntent.metadata?.user_id || undefined,
          stripe_payment_intent_id: paymentIntent.id,
          stripe_customer_id: typeof paymentIntent.customer === "string" ? paymentIntent.customer : undefined,
          amount_mxn: paymentIntent.amount ? Math.round(paymentIntent.amount / 100) : undefined,
          status: "failed",
          source: paymentIntent.metadata?.origin ?? offer.unit
        });
        break;
      }
      case "charge.refunded": {
        const charge = event.data.object as Stripe.Charge;
        const sku = readSku(charge.metadata?.sku);
        const offer = sku ? getSolutionOffer(sku) : null;

        if (!sku || !offer) break;

        const paymentId = await upsertPayment({
          sku,
          unit: offer.unit,
          user_id: charge.metadata?.user_id || undefined,
          stripe_payment_intent_id: typeof charge.payment_intent === "string" ? charge.payment_intent : undefined,
          stripe_customer_id: typeof charge.customer === "string" ? charge.customer : undefined,
          customer_email: charge.billing_details?.email ?? undefined,
          amount_mxn: charge.amount ? Math.round(charge.amount / 100) : undefined,
          status: "refunded",
          source: charge.metadata?.origin ?? offer.unit,
          refunded_at: new Date().toISOString()
        });
        await revokeEntitlementsByPayment(paymentId, "refunded");
        break;
      }
      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json({ error: "Webhook invalido" }, { status: 400 });
  }
}
