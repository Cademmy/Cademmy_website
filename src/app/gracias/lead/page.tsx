import Link from "next/link";

import { Container } from "@/components/Container";

export default function GraciasLeadPage() {
  return (
    <section className="section">
      <Container className="card">
        <h1>Gracias, recibimos tu solicitud</h1>
        <p>Te contactaremos en máximo 1 día hábil. Mientras tanto, puedes agendar tu llamada.</p>
        <Link href="/agendar" className="btn btn-primary">
          Agendar ahora
        </Link>
      </Container>
    </section>
  );
}
