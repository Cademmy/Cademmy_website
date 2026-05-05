import Link from "next/link";

import { Container } from "@/mvp-components/Container";

export default function GraciasLeadPage() {
  return (
    <section className="section">
      <Container className="legal-layout">
        <article className="glass-panel legal-hero-card thank-you-card">
          <p className="chip">Solicitud recibida</p>
          <h1>Gracias. Ya tenemos el contexto para recomendar el siguiente paso.</h1>
          <p>
            Revisaremos tu mensaje y te responderemos si conviene compra directa, agenda,
            diagnostico, soporte de cuenta o una propuesta a la medida.
          </p>
          <div className="actions">
            <Link href="/agendar" className="btn btn-primary">
              Agendar ahora
            </Link>
            <Link href="/diagnostico-rh" className="btn btn-secondary">
              Hacer diagnostico
            </Link>
          </div>
        </article>
      </Container>
    </section>
  );
}
