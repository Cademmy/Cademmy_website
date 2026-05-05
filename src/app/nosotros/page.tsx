import { Metadata } from "next";

import { CORPORATE_INFO } from "@/constants/corporateInfo";
import { CORPORATE_METHOD } from "@/lib/constants";
import { Container } from "@/mvp-components/Container";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Conoce el enfoque de Cademmy como plataforma de aprendizaje, certificacion y consultoria."
};

export default function NosotrosPage() {
  return (
    <>
      <section className="section section-hero">
        <Container className="hero-grid">
          <div className="hero-copy">
            <p className="page-eyebrow">Nosotros</p>
            <h1>Una plataforma para convertir capacidades en avance medible.</h1>
            <p>
              Cademmy integra aprendizaje, certificacion y consultoria profesional en una
              experiencia conectada por cuenta, pagos, accesos y seguimiento.
            </p>
          </div>

          <article className="glass-panel hero-side-card">
            <p className="micro-label">Entidad operativa</p>
            <ul className="clean-list">
              <li>{CORPORATE_INFO.legalEntity}</li>
              <li>{CORPORATE_INFO.address}</li>
              <li>Centro Evaluador Oficial {CORPORATE_INFO.evaluatorCode}</li>
            </ul>
          </article>
        </Container>
      </section>

      <section className="section section-spacious">
        <Container className="split-panel">
          <article className="glass-panel support-card">
            <h2>Como trabajamos</h2>
            <ul className="clean-list">
              {CORPORATE_METHOD.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="glass-panel support-card">
            <h2>Que habilita Cademmy 2.0</h2>
            <ul className="clean-list">
              <li>Soluciones publicas con copy claro y CTAs segun disponibilidad real.</li>
              <li>Compra con cuenta o como invitado.</li>
              <li>Accesos por pago para Learning, Certification y Consulting.</li>
              <li>Portal para consultar servicios, pagos, soporte y proximos pasos.</li>
            </ul>
          </article>
        </Container>
      </section>
    </>
  );
}
