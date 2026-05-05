import { Metadata } from "next";
import Link from "next/link";

import { CORPORATE_INFO } from "@/constants/corporateInfo";
import { Container } from "@/mvp-components/Container";
import { LeadForm } from "@/mvp-components/LeadForm";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contacta a Cademmy para soluciones, pagos, accesos, propuestas y soporte de cuenta."
};

type Props = {
  searchParams?: {
    service?: string;
  };
};

export default function ContactoPage({ searchParams }: Props) {
  const selectedService = searchParams?.service ? decodeURIComponent(searchParams.service) : "Cademmy Consulting";

  return (
    <>
      <section className="section section-hero">
        <Container className="hero-grid">
          <div className="hero-copy">
            <p className="page-eyebrow">Contacto</p>
            <h1>Comparte el contexto y te damos el siguiente paso mas util.</h1>
            <p>
              Usa esta pagina para propuestas, servicios sin checkout publico, dudas de cuenta,
              compras invitadas o proyectos que requieren alcance a la medida.
            </p>
          </div>

          <article className="glass-panel hero-side-card">
            <p className="micro-label">Canales activos</p>
            <ul className="clean-list">
              <li>Correo: {CORPORATE_INFO.email}</li>
              <li>Telefono: {CORPORATE_INFO.phone}</li>
              <li>Agenda directa: Microsoft Bookings</li>
            </ul>
            <div className="actions">
              <Link href="/agendar" className="btn btn-secondary">
                Agendar ahora
              </Link>
              <Link href="/cuenta" className="btn btn-secondary">
                Ir a mi cuenta
              </Link>
            </div>
          </article>
        </Container>
      </section>

      <section className="section section-spacious">
        <Container className="split-panel">
          <LeadForm
            title="Envia tu mensaje"
            intro="Te responderemos con una recomendacion clara: compra, agenda, propuesta, soporte o diagnostico."
            leadKind="contact"
            source="contact_page_v2"
            defaultServiceInterest={selectedService}
            submitLabel="Enviar mensaje"
            challengeLabel="Contexto, duda o resultado esperado"
          />

          <article className="glass-panel support-card">
            <h2>Cuándo conviene usar esta ruta</h2>
            <ul className="clean-list">
              <li>El servicio que necesitas aun no tiene pago directo.</li>
              <li>Compraste como invitado y necesitas ayuda para reclamar acceso.</li>
              <li>Quieres definir una propuesta para equipo, area o proyecto consultivo.</li>
              <li>No sabes si corresponde Learning, Certification o Consulting.</li>
            </ul>
          </article>
        </Container>
      </section>
    </>
  );
}
