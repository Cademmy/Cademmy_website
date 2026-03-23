import { Metadata } from "next";

import { Container } from "@/components/Container";
import { ServiceCard } from "@/components/ServiceCard";
import { SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Servicios",
  description: "Hub de servicios Cademmy: consultoría, capacitación, certificación y talento."
};

export default function ServiciosPage() {
  return (
    <section className="section">
      <Container>
        <h1>Servicios Cademmy</h1>
        <p>Explora nuestras líneas de servicio y elige la ruta adecuada para tu objetivo.</p>
        <div className="cards-grid">
          {SERVICES.map((service) => (
            <ServiceCard key={service.slug} slug={service.slug} name={service.name} summary={service.summary} />
          ))}
        </div>
      </Container>
    </section>
  );
}
