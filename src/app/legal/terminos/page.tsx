import { Metadata } from "next";

import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "Términos y condiciones"
};

export default function TerminosPage() {
  return (
    <section className="section">
      <Container className="card">
        <h1>Términos y condiciones</h1>
        <p>
          El uso de este sitio implica aceptación de nuestros términos de prestación de servicios,
          pagos, cancelaciones y propiedad intelectual.
        </p>
      </Container>
    </section>
  );
}
