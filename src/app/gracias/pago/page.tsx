import Link from "next/link";

import { EVENTS } from "@/lib/event-names";
import { getSolutionOffer } from "@/lib/solution-catalog";
import { Container } from "@/mvp-components/Container";
import { TrackingOnView } from "@/mvp-components/TrackingOnView";

type Props = {
  searchParams?: {
    sku?: string;
  };
};

export default function GraciasPagoPage({ searchParams }: Props) {
  const offer = searchParams?.sku ? getSolutionOffer(searchParams.sku) : undefined;

  return (
    <section className="section">
      <Container className="legal-layout">
        <article className="glass-panel legal-hero-card thank-you-card">
          <TrackingOnView
            eventName={EVENTS.PaymentCompleted}
            params={{ currency: "MXN", sku: searchParams?.sku ?? null }}
          />
          <p className="chip">Pago confirmado</p>
          <h1>{offer ? `Tu acceso a ${offer.shortTitle} quedo registrado.` : "Tu pago quedo registrado."}</h1>
          <p>
            Si pagaste con sesion iniciada, el servicio aparecera en tu cuenta. Si compraste como
            invitado, entra con el mismo correo del pago para reclamar el acceso automaticamente.
          </p>
          <div className="actions">
            <Link href="/cuenta" className="btn btn-primary">
              Ir a mi cuenta
            </Link>
            <Link href="/contacto?service=Soporte%20de%20cuenta" className="btn btn-secondary">
              Necesito ayuda
            </Link>
          </div>
        </article>
      </Container>
    </section>
  );
}
