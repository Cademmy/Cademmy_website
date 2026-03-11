import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/Container";
import { LeadForm } from "@/components/LeadForm";
import { SERVICES } from "@/lib/constants";

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export default function ServicioDetallePage({ params }: { params: { slug: string } }) {
  const service = SERVICES.find((item) => item.slug === params.slug);
  if (!service) notFound();

  return (
    <section className="section">
      <Container className="stack-lg">
        <article className="card">
          <p className="chip">Servicio</p>
          <h1>{service.name}</h1>
          <p>{service.summary}</p>
          <h2>Qué incluye</h2>
          <ul>
            <li>Diagnóstico y alcance inicial</li>
            <li>Plan de trabajo con entregables</li>
            <li>Ejecución guiada y seguimiento</li>
          </ul>
          <div className="actions">
            <Link href="/agendar" className="btn btn-primary">
              Agendar llamada
            </Link>
            <Link href="/paquetes" className="btn btn-secondary">
              Ver paquetes
            </Link>
          </div>
        </article>
        <LeadForm variant={service.slug === "talento-capital-humano" ? "enterprise" : "default"} />
      </Container>
    </section>
  );
}
