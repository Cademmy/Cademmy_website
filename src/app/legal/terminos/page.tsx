import { Metadata } from "next";

import { CORPORATE_INFO } from "@/constants/corporateInfo";
import { Container } from "@/mvp-components/Container";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description: "Términos y condiciones del sitio comercial de Cademmy."
};

export default function TerminosPage() {
  return (
    <section className="section">
      <Container className="legal-layout">
        <article className="card legal-hero-card">
          <p className="page-eyebrow">Legal</p>
          <h1>Términos y condiciones</h1>
          <p>
            Estos términos regulan el acceso y uso del sitio comercial de Cademmy, así como las
            solicitudes de contacto, agenda e inscripciones iniciadas desde él.
          </p>
        </article>

        <div className="legal-grid">
          <article className="card legal-section">
            <h2>Objeto del sitio</h2>
            <p>
              El sitio presenta informacion comercial sobre Learning, Certification, Consulting,
              diagnostico consultivo, cuenta, pagos y soporte. La publicacion de una pagina no
              constituye por si sola una obligacion de prestar un servicio sin validacion comercial,
              disponibilidad, pago confirmado o condiciones aceptadas.
            </p>
          </article>

          <article className="card legal-section">
            <h2>Uso permitido</h2>
            <ul className="clean-list">
              <li>Utilizar formularios y herramientas con información verdadera y actualizada.</li>
              <li>No intentar acceder, alterar o interferir con la operación técnica del sitio.</li>
              <li>No usar contenidos, marcas o materiales del sitio con fines engañosos o no autorizados.</li>
            </ul>
          </article>

          <article className="card legal-section">
            <h2>Agenda, propuestas e inscripciones</h2>
            <p>
              Las citas, propuestas y compras quedan sujetas a revision de disponibilidad, alcance y
              condiciones aplicables. En servicios empresariales, la propuesta formal o contrato
              específico prevalece sobre cualquier resumen publicado en el sitio.
            </p>
          </article>

          <article className="card legal-section">
            <h2>Pagos y certificaciones</h2>
            <p>
              Cuando un servicio tenga checkout activo, el pago se procesa mediante el proveedor de
              cobro configurado. La confirmacion del pago genera un acceso asociado a cuenta o correo,
              pero no sustituye requisitos academicos, administrativos, de agenda o de alcance que
              puedan aplicar al servicio adquirido.
            </p>
          </article>

          <article className="card legal-section">
            <h2>Propiedad intelectual</h2>
            <p>
              Los contenidos, textos, marcas, estructuras de programa, materiales y recursos del sitio
              pertenecen a {CORPORATE_INFO.legalEntity} o a sus respectivos titulares, y no pueden
              reproducirse o explotarse sin autorización previa por escrito.
            </p>
          </article>

          <article className="card legal-section">
            <h2>Limitación y contacto</h2>
            <p>
              Cademmy procura mantener información actualizada, pero puede corregir o retirar
              contenidos, accesos u ofertas cuando cambien internamente. Para dudas sobre estos
              términos, escríbenos a {CORPORATE_INFO.email}.
            </p>
          </article>
        </div>
      </Container>
    </section>
  );
}
