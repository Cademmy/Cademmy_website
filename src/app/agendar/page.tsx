import { Metadata } from "next";

import { BookingWidget } from "@/components/BookingWidget";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "Agendar llamada",
  description: "Agenda tu sesión con Cademmy mediante Microsoft 365 Bookings."
};

export default function AgendarPage() {
  return (
    <section className="section">
      <Container>
        <h1>Agenda tu llamada</h1>
        <p>Antes de ver disponibilidad, necesitamos algunos datos para asignarte con la persona correcta.</p>
        <BookingWidget />
      </Container>
    </section>
  );
}
