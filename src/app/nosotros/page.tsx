import { Metadata } from "next";

import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Conoce a Cademmy y nuestro enfoque para transformar capacidad en resultados."
};

export default function NosotrosPage() {
  return (
    <section className="section">
      <Container className="stack-lg">
        <article className="card">
          <h1>Sobre Cademmy</h1>
          <p>
            Somos una firma enfocada en consultoría, formación y certificación para mejorar el
            desempeño organizacional y el crecimiento profesional.
          </p>
          <h2>Nuestra metodología</h2>
          <ul>
            <li>Diagnóstico orientado a negocio</li>
            <li>Diseño de intervención basado en objetivos</li>
            <li>Ejecución medible con acompañamiento</li>
          </ul>
        </article>
      </Container>
    </section>
  );
}
