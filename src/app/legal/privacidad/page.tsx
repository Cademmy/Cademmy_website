import { Metadata } from "next";

import { CORPORATE_INFO } from "@/constants/corporateInfo";
import { Container } from "@/mvp-components/Container";

export const metadata: Metadata = {
  title: "Aviso de privacidad",
  description: "Aviso de privacidad del sitio comercial de Cademmy."
};

export default function PrivacidadPage() {
  return (
    <section className="section">
      <Container className="legal-layout">
        <article className="card legal-hero-card">
          <p className="page-eyebrow">Legal</p>
          <h1>Aviso de privacidad</h1>
          <p>
            {CORPORATE_INFO.legalEntity} es responsable del tratamiento de los datos personales
            recabados a través del sitio comercial de Cademmy y de sus formularios asociados.
          </p>
        </article>

        <div className="legal-grid">
          <article className="card legal-section">
            <h2>Datos que podemos recabar</h2>
            <ul className="clean-list">
              <li>Datos de identificación y contacto: nombre, apellido, correo, teléfono y empresa.</li>
              <li>Datos profesionales: cargo, tamaño de equipo, interés comercial y contexto del proyecto.</li>
              <li>Datos de navegación y campaña: fuente, medio, campaña, página de aterrizaje y referencia.</li>
              <li>Informacion de diagnostico consultivo y resultados derivados cuando el usuario utiliza esa herramienta.</li>
            </ul>
          </article>

          <article className="card legal-section">
            <h2>Finalidades del tratamiento</h2>
            <ul className="clean-list">
              <li>Atender solicitudes de contacto, agenda, cotizacion, compra, soporte o inscripcion.</li>
              <li>Dar seguimiento comercial a Learning, Certification, Consulting y servicios asociados a cuenta.</li>
              <li>Registrar contexto suficiente para clasificar oportunidades y preparar llamadas o propuestas.</li>
              <li>Medir conversiones, atribución de campañas y desempeño del sitio.</li>
            </ul>
          </article>

          <article className="card legal-section">
            <h2>Transferencias y encargados</h2>
            <p>
              Para operar el sitio y la atención comercial podemos utilizar proveedores de
              infraestructura, analítica, agenda, pagos y CRM. Estos terceros tratan la información
              solo para prestar el servicio correspondiente o conforme a sus propias obligaciones
              legales.
            </p>
          </article>

          <article className="card legal-section">
            <h2>Derechos ARCO y revocación</h2>
            <p>
              Puedes solicitar acceso, rectificación, cancelación, oposición o revocación del
              consentimiento enviando un correo a {CORPORATE_INFO.email}. La solicitud debe incluir
              nombre, medio de contacto y una descripción clara del derecho que deseas ejercer.
            </p>
          </article>

          <article className="card legal-section">
            <h2>Cookies y analítica</h2>
            <p>
              El sitio puede almacenar información técnica básica y parámetros de campaña para
              reconocer la fuente de llegada y medir conversiones. Si no deseas este seguimiento,
              puedes limitar cookies desde tu navegador o abandonar el sitio.
            </p>
          </article>

          <article className="card legal-section">
            <h2>Cambios al aviso</h2>
            <p>
              Este aviso puede actualizarse cuando cambien los procesos comerciales, la operación del
              sitio o las obligaciones aplicables. La versión vigente será la publicada en esta
              página.
            </p>
          </article>
        </div>
      </Container>
    </section>
  );
}
