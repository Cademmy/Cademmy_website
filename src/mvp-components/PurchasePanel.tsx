"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

import { SolutionOffer } from "@/lib/solution-catalog";
import { useAuth } from "@/mvp-components/AuthProvider";

type Props = {
  offer: SolutionOffer;
  source: string;
  compact?: boolean;
  priceLabel?: string | null;
  checkoutEnabled?: boolean;
};

export function PurchasePanel({ offer, source, compact = false, priceLabel = null, checkoutEnabled = false }: Props) {
  const { authReady, getAccessToken, signIn, user } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const effectiveEmail = useMemo(() => user?.email || email, [email, user?.email]);

  const handleCheckout = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!checkoutEnabled) {
      setError("Este servicio se cotiza con el equipo Cademmy antes de abrir pago.");
      return;
    }

    if (!effectiveEmail) {
      setError("Escribe el correo con el que usaras tu cuenta Cademmy.");
      return;
    }

    setLoading(true);
    try {
      const token = await getAccessToken();
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sku: offer.sku,
          email: effectiveEmail,
          origin: source,
          accessToken: token ?? undefined
        })
      });

      const payload = (await response.json()) as { checkoutUrl?: string; error?: string };
      if (!response.ok || !payload.checkoutUrl) {
        throw new Error(payload.error || "No se pudo iniciar el pago.");
      }

      window.location.href = payload.checkoutUrl;
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : "Error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={`glass-panel purchase-panel ${compact ? "purchase-panel-compact" : ""}`} onSubmit={handleCheckout}>
      <div className="purchase-copy">
        <span className={`unit-dot unit-${offer.unit}`} />
        <p className="micro-label">{offer.format}</p>
        <h3>{offer.shortTitle}</h3>
        <p>{offer.summary}</p>
      </div>

      <div className="purchase-meta">
        <strong>{priceLabel ?? "Cotizacion / precio por confirmar"}</strong>
        <span>El acceso queda disponible en tu cuenta al confirmar el pago.</span>
      </div>

      {!user && (
        <label>
          Correo para asignar acceso
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="tu@empresa.com"
            required={checkoutEnabled}
          />
        </label>
      )}

      <div className="purchase-actions">
        <button type="submit" className="btn btn-primary" disabled={loading || !checkoutEnabled}>
          {loading ? "Abriendo pago..." : checkoutEnabled ? "Comprar acceso" : "Pago no disponible"}
        </button>
        {!user && authReady && (
          <button type="button" className="btn btn-secondary" onClick={() => signIn("google")}>
            Ingresar primero
          </button>
        )}
        {!checkoutEnabled && (
          <Link className="btn btn-secondary" href={`/contacto?service=${encodeURIComponent(offer.title)}`}>
            Solicitar propuesta
          </Link>
        )}
      </div>

      {error && <p className="error-text">{error}</p>}
    </form>
  );
}
