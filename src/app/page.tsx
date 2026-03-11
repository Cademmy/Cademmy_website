import Link from "next/link";

import { Container } from "@/components/Container";
import { LeadForm } from "@/components/LeadForm";
import { ServiceCard } from "@/components/ServiceCard";
import { SERVICES } from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      <section className="section">
        <Container className="hero hero-panel">
          <div className="stack-lg">
            <p className="chip">Impulsamos resultados medibles</p>
            <h1>Desarrollamos capacidad real para equipos y profesionales</h1>
            <p>
              Combinamos consultoría, formación, certificación y talento para generar resultados
              medibles en organizaciones de todos los tamaños.
            </p>
            <div className="actions">
              <Link href="/agendar" className="btn btn-primary">
                Agendar llamada
              </Link>
              <Link href="/servicios" className="btn btn-secondary">
                Ver servicios
              </Link>
            </div>
            <div className="metric-row">
              <article className="glass-mini">
                <strong>+120</strong>
                <span>programas ejecutados</span>
              </article>
              <article className="glass-mini">
                <strong>95%</strong>
                <span>satisfacción reportada</span>
              </article>
              <article className="glass-mini">
                <strong>es-MX</strong>
                <span>enfoque local para México</span>
              </article>
            </div>
          </div>
          <div className="card glass-card">
            <h2>Ruta de impacto</h2>
            <ol className="timeline-list">
              <li>
                <strong>Diagnóstico</strong>
                <span>Definimos objetivos y brechas prioritarias.</span>
              </li>
              <li>
                <strong>Diseño</strong>
                <span>Alineamos estrategia, formación y métricas.</span>
              </li>
              <li>
                <strong>Ejecución</strong>
                <span>Implementamos con acompañamiento y seguimiento.</span>
              </li>
            </ol>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <h2>Servicios estratégicos</h2>
          <p>Selecciona el servicio que mejor se adapte a tu necesidad actual.</p>
          <div className="cards-grid">
            {SERVICES.map((service) => (
              <ServiceCard key={service.slug} slug={service.slug} name={service.name} summary={service.summary} />
            ))}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <LeadForm />
        </Container>
      </section>
    </>
  );
}
