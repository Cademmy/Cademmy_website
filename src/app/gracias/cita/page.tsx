import Link from "next/link";

import { EVENTS } from "@/lib/event-names";
import { Container } from "@/mvp-components/Container";
import { TrackingOnView } from "@/mvp-components/TrackingOnView";

export default function GraciasCitaPage() {
  return (
    <section className="section">
      <Container className="legal-layout">
        <article className="glass-panel legal-hero-card thank-you-card">
          <TrackingOnView eventName={EVENTS.BookingCompleted} params={{ source: "thank_you_page" }} />
          <p className="chip">Cita registrada</p>
          <h1>Tu conversacion quedo registrada.</h1>
          <p>
            Recibiras la confirmacion y recordatorios desde la agenda. Si quieres avanzar antes,
            puedes complementar contexto o revisar las soluciones disponibles.
          </p>
          <div className="actions">
            <Link href="/consulting" className="btn btn-primary">
              Ver Consulting
            </Link>
            <Link href="/contacto" className="btn btn-secondary">
              Enviar mas contexto
            </Link>
          </div>
        </article>
      </Container>
    </section>
  );
}
