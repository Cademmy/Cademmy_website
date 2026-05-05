import Link from "next/link";
import { Metadata } from "next";

import { getOffersByUnit, getPublicPrice, hasCheckoutConfigured } from "@/lib/solution-catalog";
import { Container } from "@/mvp-components/Container";
import { LeadForm } from "@/mvp-components/LeadForm";
import { PurchasePanel } from "@/mvp-components/PurchasePanel";

export const metadata: Metadata = {
  title: "Consulting",
  description:
    "Consultoria profesional de Cademmy para RH, Marketing, Diseno, Ingenieria, Operaciones y otras areas de negocio."
};

const areas = [
  "Recursos Humanos",
  "Marketing",
  "Diseno",
  "Ingenieria",
  "Operaciones",
  "Liderazgo"
] as const;

const consultingFlow = [
  {
    title: "Diagnostico",
    description: "Aterrizamos problema, restricciones, stakeholders y resultado esperado."
  },
  {
    title: "Diseno de solucion",
    description: "Definimos entregables, plan de trabajo, responsables y evidencia de avance."
  },
  {
    title: "Implementacion",
    description: "Acompanamos la ejecucion y dejamos seguimiento visible en el portal."
  }
] as const;

export default function ConsultingPage() {
  const offers = getOffersByUnit("consulting");

  return (
    <>
      <section className="section section-hero">
        <Container className="hero-grid">
          <div className="hero-copy">
            <p className="page-eyebrow unit-consulting">Cademmy Consulting</p>
            <h1>Consultoria profesional para convertir problemas en sistemas de trabajo.</h1>
            <p>
              Acompanamos a equipos que necesitan diagnostico, diseno de solucion, implementacion y
              entregables medibles en areas clave del negocio.
            </p>
            <div className="actions">
              <a href="#servicios-consulting" className="btn btn-primary">
                Ver servicios
              </a>
              <Link href="/diagnostico-rh" className="btn btn-secondary">
                Iniciar diagnostico
              </Link>
            </div>
          </div>

          <article className="glass-panel hero-side-card">
            <p className="micro-label unit-consulting">Areas frecuentes</p>
            <div className="tag-cloud">
              {areas.map((area) => (
                <span key={area}>{area}</span>
              ))}
            </div>
          </article>
        </Container>
      </section>

      <section className="section section-spacious">
        <Container>
          <div className="section-heading">
            <p className="page-eyebrow">Metodo consultivo</p>
            <h2>El objetivo no es entregar horas, sino claridad y avance verificable.</h2>
            <p>
              Cada proyecto debe explicar que se va a resolver, que entregables habra y como se
              dara seguimiento desde la cuenta Cademmy.
            </p>
          </div>
          <div className="cards-grid">
            {consultingFlow.map((step) => (
              <article className="glass-panel feature-card" key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section section-spacious" id="servicios-consulting">
        <Container>
          <div className="section-heading">
            <p className="page-eyebrow">Servicios Consulting</p>
            <h2>Compra un diagnostico o abre una propuesta para un proyecto completo.</h2>
            <p>
              Cuando existe checkout, el pago crea un espacio de consultoria en la cuenta. Cuando
              el alcance depende del contexto, el equipo Cademmy arma una propuesta.
            </p>
          </div>
          <div className="purchase-grid">
            {offers.map((offer) => (
              <PurchasePanel
                key={offer.sku}
                offer={offer}
                source="consulting_page"
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
            <p className="page-eyebrow">Proyecto a la medida</p>
            <h2>Si el problema aun no esta definido, empecemos por estructurarlo.</h2>
            <p>
              Cuanto mejor entendamos el contexto, mas rapido podremos decirte si conviene
              consultoria, aprendizaje, certificacion o una combinacion.
            </p>
          </div>
          <LeadForm
            title="Solicitar consultoria"
            intro="Describe el reto, area involucrada y resultado que necesitas lograr."
            leadKind="contact"
            source="consulting_page"
            defaultServiceInterest="Cademmy Consulting"
            submitLabel="Enviar contexto"
            challengeLabel="Reto de negocio o area que necesita apoyo"
          />
        </Container>
      </section>
    </>
  );
}
