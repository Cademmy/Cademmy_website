import { Metadata } from "next";

import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "Reembolsos y cancelaciones"
};

export default function ReembolsosCancelacionesPage() {
  return (
    <section className="section">
      <Container className="card">
        <h1>Política de reembolsos y cancelaciones</h1>
        <p>
          Las cancelaciones de citas aplican con al menos 24 horas de anticipación. Las políticas de
          reembolso dependen del paquete contratado y se comunican antes del pago.
        </p>
      </Container>
    </section>
  );
}
