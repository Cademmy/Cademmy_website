import Link from "next/link";
import { Metadata } from "next";

import { getOffersByUnit, getPublicPrice, hasCheckoutConfigured } from "@/lib/solution-catalog";
import { Container } from "@/mvp-components/Container";
import { LeadForm } from "@/mvp-components/LeadForm";
import { PurchasePanel } from "@/mvp-components/PurchasePanel";

export const metadata: Metadata = {
  title: "Certification",
  description:
    "Certificaciones de competencias laborales y profesionales de Cademmy con compra, evidencia y seguimiento desde cuenta."
};

const processSteps = [
  {
    title: "1. Elige la certificacion",
    description: "Revisa objetivo, audiencia y evidencia esperada antes de pagar o solicitar informacion."
  },
  {
    title: "2. Compra o solicita propuesta",
    description: "Si existe checkout activo, el pago crea el acceso. Si no, el equipo comercial te acompana."
  },
  {
    title: "3. Da seguimiento desde tu cuenta",
    description: "Tu portal muestra el servicio, estado, proximos pasos y materiales relacionados."
  }
] as const;

export default function CertificacionPage() {
  const offers = getOffersByUnit("certification");

  return (
    <>
      <section className="section section-hero">
        <Container className="hero-grid">
          <div className="hero-copy">
            <p className="page-eyebrow unit-certification">Cademmy Certification</p>
            <h1>Certifica competencias con un proceso claro y trazable.</h1>
            <p>
              Las certificaciones de Cademmy ayudan a demostrar competencia laboral o profesional
              con evidencia, seguimiento y acceso desde tu cuenta despues del pago.
            </p>
            <div className="actions">
              <a href="#certificaciones" className="btn btn-primary">
                Ver certificaciones
              </a>
              <Link href="/contacto?service=Certificaciones%20empresariales" className="btn btn-secondary">
                Certificar equipos
              </Link>
            </div>
          </div>

          <article className="glass-panel hero-side-card">
            <p className="micro-label unit-certification">Valor principal</p>
            <ul className="clean-list">
              <li>Proceso visible para preparacion, evidencia y evaluacion.</li>
              <li>Acceso en cuenta para continuar sin depender de correos sueltos.</li>
              <li>Opcion individual o empresarial segun el alcance requerido.</li>
            </ul>
          </article>
        </Container>
      </section>

      <section className="section section-spacious">
        <Container>
          <div className="section-heading">
            <p className="page-eyebrow">Como funciona</p>
            <h2>La certificacion debe sentirse seria antes, durante y despues del pago.</h2>
          </div>
          <div className="cards-grid">
            {processSteps.map((step) => (
              <article className="glass-panel feature-card" key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section section-spacious" id="certificaciones">
        <Container>
          <div className="section-heading">
            <p className="page-eyebrow">Certificaciones disponibles</p>
            <h2>Compra un acceso activo o solicita informacion si la oferta requiere validacion.</h2>
            <p>
              Cada pago exitoso genera un servicio dentro de tu cuenta. Si compras como invitado,
              solo usa el mismo correo al iniciar sesion para reclamar el acceso.
            </p>
          </div>
          <div className="purchase-grid">
            {offers.map((offer) => (
              <PurchasePanel
                key={offer.sku}
                offer={offer}
                source="certification_page"
                priceLabel={getPublicPrice(offer)}
                checkoutEnabled={hasCheckoutConfigured(offer)}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="section section-spacious">
        <Container className="split-panel">
          <div className="section-heading">
            <p className="page-eyebrow">Empresas</p>
            <h2>Si necesitas certificar equipos, primero dimensionamos alcance y operacion.</h2>
            <p>
              Podemos ayudarte a definir grupos, calendario, evidencia, comunicacion interna y
              seguimiento desde cuenta.
            </p>
          </div>
          <LeadForm
            title="Solicitar certificacion empresarial"
            intro="Comparte el contexto del equipo y el tipo de certificacion que buscas."
            leadKind="certification_interest"
            source="certification_page"
            defaultServiceInterest="Cademmy Certification"
            submitLabel="Enviar solicitud"
            challengeLabel="Equipo, volumen o competencia a certificar"
          />
        </Container>
      </section>
    </>
  );
}
