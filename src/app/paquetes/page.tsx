import { Metadata } from "next";

import { Container } from "@/components/Container";
import { PricingCards } from "@/components/PricingCards";

export const metadata: Metadata = {
  title: "Paquetes y precios",
  description: "Paquetes Cademmy con cobro en Stripe Checkout (MXN)."
};

export default function PaquetesPage() {
  return (
    <section className="section">
      <Container>
        <h1>Paquetes y precios</h1>
        <p>Selecciona un paquete y completa tu pago seguro con Stripe Checkout.</p>
        <PricingCards />
      </Container>
    </section>
  );
}
