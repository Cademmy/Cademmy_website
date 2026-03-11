import { Metadata } from "next";

import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "Aviso de privacidad"
};

export default function PrivacidadPage() {
  return (
    <section className="section">
      <Container className="card">
        <h1>Aviso de privacidad</h1>
        <p>
          Cademmy recopila datos para atención comercial, operación de servicios y analítica de
          conversión. Puedes solicitar acceso, corrección o eliminación de datos por correo.
        </p>
      </Container>
    </section>
  );
}
