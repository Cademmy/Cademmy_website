import Link from "next/link";
import { Metadata } from "next";

import { getOffersByUnit, getPublicPrice, hasCheckoutConfigured } from "@/lib/solution-catalog";
import { Container } from "@/mvp-components/Container";
import { LeadForm } from "@/mvp-components/LeadForm";
import { PurchasePanel } from "@/mvp-components/PurchasePanel";

export const metadata: Metadata = {
  title: "Learning",
  description:
    "Cursos en linea, presenciales e hibridos de Cademmy Learning con acceso desde cuenta y seguimiento posterior."
};

const learningModes = [
  {
    title: "Online",
    description:
      "Contenido organizado por objetivos, actividades practicas y acceso desde tu cuenta para avanzar a tu ritmo."
  },
  {
    title: "Presencial",
    description:
      "Sesiones facilitadas para equipos que necesitan foco, practica guiada y transferencia inmediata."
  },
  {
    title: "Hibrido",
    description:
      "Lo mejor de ambos formatos: experiencia en vivo, recursos digitales y continuidad posterior."
  }
] as const;

export default function LearningPage() {
  const offers = getOffersByUnit("learning");

  return (
    <>
      <section className="section section-hero">
        <Container className="hero-grid">
          <div className="hero-copy">
            <p className="page-eyebrow unit-learning">Cademmy Learning</p>
            <h1>Cursos que no terminan cuando acaba la sesion.</h1>
            <p>
              Aprende con experiencias en linea, presenciales o hibridas que mantienen recursos,
              actividades y seguimiento dentro de tu cuenta Cademmy.
            </p>
            <div className="actions">
              <a href="#comprar-learning" className="btn btn-primary">
                Comprar acceso
              </a>
              <Link href="/agendar" className="btn btn-secondary">
                Disenar programa
              </Link>
            </div>
          </div>

          <article className="glass-panel hero-side-card">
            <p className="micro-label unit-learning">Que obtiene el usuario</p>
            <ul className="clean-list">
              <li>Acceso al servicio desde cuenta unica.</li>
              <li>Materiales, actividades y proximos pasos en un solo lugar.</li>
              <li>Claridad de modalidad, objetivo y estado del programa.</li>
            </ul>
          </article>
        </Container>
      </section>

      <section className="section section-spacious">
        <Container>
          <div className="section-heading">
            <p className="page-eyebrow">Modalidades</p>
            <h2>Learning se adapta al nivel de acompanamiento que necesitas.</h2>
            <p>
              La experiencia puede ser autoservicio, facilitada o combinada. En cualquier caso, el
              acceso se mantiene asociado a la cuenta.
            </p>
          </div>
          <div className="cards-grid">
            {learningModes.map((mode) => (
              <article className="glass-panel feature-card" key={mode.title}>
                <h3>{mode.title}</h3>
                <p>{mode.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section section-spacious" id="comprar-learning">
        <Container>
          <div className="section-heading">
            <p className="page-eyebrow">Servicios Learning</p>
            <h2>Compra un acceso o solicita una propuesta para tu equipo.</h2>
            <p>
              Si el servicio tiene checkout activo, puedes pagar y verlo en tu cuenta. Si requiere
              alcance a la medida, lo convertimos en propuesta.
            </p>
          </div>
          <div className="purchase-grid">
            {offers.map((offer) => (
              <PurchasePanel
                key={offer.sku}
                offer={offer}
                source="learning_page"
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
            <p className="page-eyebrow">Learning para empresas</p>
            <h2>Cuando el curso debe resolver un objetivo de negocio, no solo cubrir temario.</h2>
            <p>
              Comparte el contexto y te ayudamos a definir modalidad, duracion, entregables,
              participantes y forma de acceso.
            </p>
          </div>
          <LeadForm
            title="Solicitar propuesta Learning"
            intro="Cuéntanos que habilidad o proceso quieres desarrollar."
            leadKind="contact"
            source="learning_page"
            defaultServiceInterest="Cademmy Learning"
            submitLabel="Enviar solicitud"
            challengeLabel="Habilidad o resultado que necesitas lograr"
          />
        </Container>
      </section>
    </>
  );
}
