import Link from "next/link";
import { Metadata } from "next";

import { Container } from "@/mvp-components/Container";
import { DiagnosticWizard } from "@/mvp-components/DiagnosticWizard";

export const metadata: Metadata = {
  title: "Diagnostico consultivo",
  description:
    "Diagnostico consultivo de Cademmy para entender necesidades de aprendizaje, certificacion o consultoria antes de recomendar una solucion."
};

const outputs = [
  {
    title: "Necesidad mejor definida",
    description: "Ordenamos el problema antes de recomendar aprendizaje, certificacion o consultoria."
  },
  {
    title: "Conversacion mas util",
    description: "El equipo Cademmy recibe contexto para no iniciar desde cero y cuidar tu tiempo."
  },
  {
    title: "Siguiente paso claro",
    description: "El resultado sugiere si conviene comprar, agendar, pedir propuesta o profundizar."
  }
] as const;

export default function DiagnosticoRhPage() {
  return (
    <>
      <section className="section section-hero">
        <Container className="hero-grid">
          <div className="hero-copy">
            <p className="page-eyebrow">Diagnostico consultivo</p>
            <h1>Antes de comprar, entiende que solucion necesita tu contexto.</h1>
            <p>
              Este diagnostico ayuda a identificar si el reto se resuelve con Learning,
              Certification, Consulting o una combinacion. No sustituye la conversacion; la hace mas
              precisa.
            </p>
            <div className="actions">
              <a href="#wizard" className="btn btn-primary">
                Empezar diagnostico
              </a>
              <Link href="/agendar" className="btn btn-secondary">
                Prefiero agendar
              </Link>
            </div>
          </div>

          <article className="glass-panel hero-side-card">
            <p className="micro-label">Que revisamos</p>
            <ul className="clean-list">
              <li>Necesidad, urgencia y area involucrada.</li>
              <li>Senales de aprendizaje, evidencia o implementacion.</li>
              <li>Tipo de acompanamiento mas razonable para empezar.</li>
            </ul>
          </article>
        </Container>
      </section>

      <section className="section section-spacious">
        <Container>
          <div className="cards-grid value-grid">
            {outputs.map((item) => (
              <article key={item.title} className="glass-panel feature-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section section-spacious" id="wizard">
        <Container className="split-panel split-panel-wide">
          <DiagnosticWizard />

          <article className="glass-panel support-card">
            <h2>Cuando tiene sentido hacerlo</h2>
            <ul className="clean-list">
              <li>No sabes si necesitas curso, certificacion o consultoria.</li>
              <li>Quieres explicar un problema antes de recibir una propuesta.</li>
              <li>Necesitas que Cademmy recomiende el siguiente paso con contexto.</li>
              <li>Buscas una solucion para una persona, equipo o area completa.</li>
            </ul>
            <p>
              Si ya tienes claro el servicio que quieres comprar, puedes ir directo a Learning,
              Certification o Consulting.
            </p>
            <div className="actions">
              <Link href="/learning" className="btn btn-secondary">
                Learning
              </Link>
              <Link href="/certificacion" className="btn btn-secondary">
                Certification
              </Link>
              <Link href="/consulting" className="btn btn-secondary">
                Consulting
              </Link>
            </div>
          </article>
        </Container>
      </section>
    </>
  );
}
