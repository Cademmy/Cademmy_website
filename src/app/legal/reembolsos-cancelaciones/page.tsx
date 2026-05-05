import { Metadata } from "next";

import { CORPORATE_INFO } from "@/constants/corporateInfo";
import { Container } from "@/mvp-components/Container";

export const metadata: Metadata = {
  title: "Reembolsos y cancelaciones",
  description: "Política operativa de reembolsos y cancelaciones de Cademmy."
};

export default function ReembolsosCancelacionesPage() {
  return (
    <section className="section">
      <Container className="legal-layout">
        <article className="card legal-hero-card">
          <p className="page-eyebrow">Legal</p>
          <h1>Política de reembolsos y cancelaciones</h1>
          <p>
            Esta política resume el tratamiento general de citas, pagos, accesos e inscripciones
            iniciadas desde el sitio comercial de Cademmy.
          </p>
        </article>

        <div className="legal-grid">
          <article className="card legal-section">
            <h2>Citas y reuniones</h2>
            <ul className="clean-list">
              <li>Las citas pueden reprogramarse o cancelarse con al menos 24 horas de anticipación.</li>
              <li>Si el usuario no asiste o cancela fuera de tiempo, Cademmy puede requerir nueva confirmación antes de reagendar.</li>
              <li>Las sesiones exploratorias no generan reembolso porque no implican cargo directo en el sitio.</li>
            </ul>
          </article>

          <article className="card legal-section">
            <h2>Servicios con pago directo</h2>
            <p>
              Cuando exista compra directa, la solicitud de reembolso se revisa según el momento en
              que se encuentre el acceso, la reserva de agenda, los materiales ya liberados,
              entregables iniciados y costos administrativos comprometidos. Las condiciones
              especificas de cada servicio pueden complementar esta politica.
            </p>
          </article>

          <article className="card legal-section">
            <h2>Servicios empresariales</h2>
            <p>
              Consulting y algunos programas corporativos operan normalmente bajo propuesta, orden de compra o contrato
              específico. En esos casos, las reglas de cancelación, anticipo, reprogramación y
              reembolso se rigen por el documento comercial aprobado entre las partes.
            </p>
          </article>

          <article className="card legal-section">
            <h2>Cómo solicitar revisión</h2>
            <p>
              Para cualquier aclaración, escribe a {CORPORATE_INFO.email} con tu nombre, fecha de la
              compra o cita, medio de pago y motivo de la solicitud. Cademmy revisará el caso y dará
              respuesta por el mismo medio de contacto.
            </p>
          </article>
        </div>
      </Container>
    </section>
  );
}
