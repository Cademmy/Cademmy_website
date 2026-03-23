import { Metadata } from "next";

import { Container } from "@/components/Container";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contáctanos para resolver dudas y diseñar una propuesta con Cademmy."
};

export default function ContactoPage() {
  return (
    <section className="section">
      <Container className="stack-lg">
        <article className="card">
          <h1>Contacto</h1>
          <p>Te respondemos en máximo 1 día hábil.</p>
        </article>
        <LeadForm title="Envíanos tu mensaje" />
      </Container>
    </section>
  );
}
