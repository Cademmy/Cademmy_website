import Link from "next/link";

import { Container } from "@/components/Container";
import { TrackingOnView } from "@/components/TrackingOnView";
import { EVENTS } from "@/lib/event-names";

export default function GraciasPagoPage() {
  return (
    <section className="section">
      <Container className="card">
        <TrackingOnView eventName={EVENTS.PaymentCompleted} params={{ currency: "MXN" }} />
        <h1>Pago confirmado</h1>
        <p>Tu compra fue procesada correctamente. El siguiente paso es reservar tu sesión.</p>
        <Link href="/agendar" className="btn btn-primary">
          Reservar sesión
        </Link>
      </Container>
    </section>
  );
}
