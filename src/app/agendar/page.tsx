import { Metadata } from "next";
import Link from "next/link";

import { BookingWidget } from "@/mvp-components/BookingWidget";
import { Container } from "@/mvp-components/Container";

export const metadata: Metadata = {
  title: "Agendar",
  description: "Agenda una conversacion con Cademmy para elegir la solucion correcta o resolver dudas de cuenta."
};

export default function AgendarPage() {
  return (
    <>
      <section className="section section-hero">
        <Container className="hero-grid">
          <div className="hero-copy">
            <p className="page-eyebrow">Agenda Cademmy</p>
            <h1>Reserva una conversacion para tomar una mejor decision.</h1>
            <p>
              Podemos ayudarte a elegir entre Learning, Certification, Consulting, resolver dudas de
              pago o definir el alcance de una propuesta antes de contratar.
            </p>
          </div>

          <article className="glass-panel hero-side-card">
            <p className="micro-label">Antes de la llamada</p>
            <ul className="clean-list">
              <li>Ten claro que resultado necesitas lograr.</li>
              <li>Comparte si sera para una persona, equipo o area completa.</li>
              <li>Si ya pagaste, usa el correo asociado a tu cuenta.</li>
            </ul>
          </article>
        </Container>
      </section>

      <section className="section section-spacious">
        <Container className="split-panel split-panel-wide">
          <BookingWidget />

          <article className="glass-panel support-card">
            <h2>Si todavia no quieres reservar</h2>
            <p>
              Puedes enviar contexto por formulario o hacer el diagnostico consultivo para llegar
              con una necesidad mejor definida.
            </p>
            <div className="actions">
              <Link href="/contacto" className="btn btn-secondary">
                Enviar contexto
              </Link>
              <Link href="/diagnostico-rh" className="btn btn-secondary">
                Hacer diagnostico
              </Link>
            </div>
          </article>
        </Container>
      </section>
    </>
  );
}
