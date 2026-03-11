import Link from "next/link";

import { Container } from "@/components/Container";
import { TrackingOnView } from "@/components/TrackingOnView";
import { EVENTS } from "@/lib/event-names";

export default function GraciasCitaPage() {
  return (
    <section className="section">
      <Container className="card">
        <TrackingOnView eventName={EVENTS.BookingCompleted} params={{ source: "thank_you_page" }} />
        <h1>Cita confirmada</h1>
        <p>Tu sesión quedó registrada. Recibirás recordatorios automáticos por correo.</p>
        <Link href="/paquetes" className="btn btn-secondary">
          Ver paquetes
        </Link>
      </Container>
    </section>
  );
}
