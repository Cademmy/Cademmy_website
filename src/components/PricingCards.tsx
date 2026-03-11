"use client";

import { useState } from "react";

import { PACKAGES } from "@/lib/constants";
import { SkuId } from "@/lib/types";

async function createCheckout(sku: SkuId) {
  const response = await fetch("/api/stripe/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sku })
  });

  if (!response.ok) {
    const data = (await response.json()) as { error?: string };
    throw new Error(data.error || "No se pudo iniciar el pago");
  }

  return (await response.json()) as { checkoutUrl: string };
}

export function PricingCards() {
  const [loadingSku, setLoadingSku] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <section className="cards-grid">
      {PACKAGES.map((pkg) => (
        <article key={pkg.sku} className="card">
          <p className="chip">{pkg.sku}</p>
          <h3>{pkg.name}</h3>
          <p className="price">${pkg.priceMXN.toLocaleString("es-MX")} MXN</p>
          <p>{pkg.description}</p>
          <button
            className="btn btn-primary"
            disabled={loadingSku === pkg.sku}
            onClick={async () => {
              setError(null);
              setLoadingSku(pkg.sku);
              try {
                const { checkoutUrl } = await createCheckout(pkg.sku);
                window.location.href = checkoutUrl;
              } catch (checkoutError) {
                setError(checkoutError instanceof Error ? checkoutError.message : "Error de pago");
              } finally {
                setLoadingSku(null);
              }
            }}
          >
            {loadingSku === pkg.sku ? "Redirigiendo..." : "Pagar ahora"}
          </button>
        </article>
      ))}
      {error && <p className="error-text">{error}</p>}
    </section>
  );
}
