"use client";

import Link from "next/link";
import { useState } from "react";

import { SkuId } from "@/lib/types";

type Offer = {
  sku: SkuId;
  code: string;
  title: string;
  summary: string;
  audience: string;
  outcomes: string[];
  priceLabel: string | null;
  checkoutEnabled: boolean;
};

async function createCheckout(sku: SkuId) {
  const response = await fetch("/api/stripe/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sku, origin: "certification_hub" })
  });

  if (!response.ok) {
    const payload = (await response.json()) as { error?: string };
    throw new Error(payload.error || "No se pudo iniciar el checkout.");
  }

  return (await response.json()) as { checkoutUrl: string };
}

export function CertificationHub({ offers }: { offers: Offer[] }) {
  const [loadingSku, setLoadingSku] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <section className="stack-lg">
      <article className="card callout-card">
        <p className="chip">Lanzamiento</p>
        <h2>Pago directo solo para ofertas activas y validadas</h2>
        <p>
          El hub puede mostrar varias certificaciones, pero solo habilita checkout cuando la oferta
          y el precio ya están configurados internamente.
        </p>
      </article>

      <div className="cards-grid certification-grid">
        {offers.map((offer) => (
          <article key={offer.sku} className="card certification-card">
            <div className="stack-sm">
              <p className="eyebrow">{offer.code}</p>
              <h3>{offer.title}</h3>
              <p>{offer.summary}</p>
            </div>

            <div className="stack-sm">
              <p className="micro-label">Ideal para</p>
              <p>{offer.audience}</p>
            </div>

            <ul className="clean-list">
              {offer.outcomes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="cert-footer">
              <p className="price-label">{offer.priceLabel ?? "Oferta y precio en validación interna"}</p>
              {offer.checkoutEnabled ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={loadingSku === offer.sku}
                  onClick={async () => {
                    setLoadingSku(offer.sku);
                    setError(null);
                    try {
                      const { checkoutUrl } = await createCheckout(offer.sku);
                      window.location.href = checkoutUrl;
                    } catch (checkoutError) {
                      setError(checkoutError instanceof Error ? checkoutError.message : "Error de checkout");
                    } finally {
                      setLoadingSku(null);
                    }
                  }}
                >
                  {loadingSku === offer.sku ? "Abriendo checkout..." : "Inscribirme ahora"}
                </button>
              ) : (
                <Link href={`/contacto?service=${encodeURIComponent(`Certificación ${offer.code}`)}`} className="btn btn-secondary">
                  Solicitar información
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>

      {error && <p className="error-text">{error}</p>}
    </section>
  );
}
