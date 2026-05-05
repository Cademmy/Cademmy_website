import Image from "next/image";
import Link from "next/link";

import { CORPORATE_INFO } from "@/constants/corporateInfo";
import { UNIT_META } from "@/lib/solution-catalog";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-shell glass-panel">
        <div className="footer-brand-block">
          <Image src="/assets/logo-white-horizontal.png" alt="Cademmy" width={176} height={70} />
          <h2>Aprende, certifica y transforma capacidades desde una sola cuenta.</h2>
          <p>
            Cademmy integra soluciones de aprendizaje, certificación y consultoría para que cada
            servicio contratado tenga acceso, seguimiento y siguiente paso claro.
          </p>
        </div>

        <div className="footer-grid">
          <div>
            <h3>Soluciones</h3>
            <ul className="footer-list">
              {Object.values(UNIT_META).map((unit) => (
                <li key={unit.href}>
                  <Link href={unit.href}>{unit.name}</Link>
                </li>
              ))}
              <li>
                <Link href="/diagnostico-rh">Diagnóstico consultivo</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3>Cuenta</h3>
            <ul className="footer-list">
              <li>
                <Link href="/cuenta">Mi cuenta</Link>
              </li>
              <li>
                <Link href="/agendar">Agendar</Link>
              </li>
              <li>
                <Link href="/contacto">Contacto</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3>Legal</h3>
            <ul className="footer-list">
              <li>
                <Link href="/legal/privacidad">Aviso de privacidad</Link>
              </li>
              <li>
                <Link href="/legal/terminos">Términos y condiciones</Link>
              </li>
              <li>
                <Link href="/legal/reembolsos-cancelaciones">Reembolsos y cancelaciones</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3>Contacto</h3>
            <ul className="footer-list footer-contact-list">
              <li>{CORPORATE_INFO.email}</li>
              <li>{CORPORATE_INFO.phone}</li>
              <li>{CORPORATE_INFO.address}</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Cademmy. Todos los derechos reservados.</p>
          <p>
            {CORPORATE_INFO.legalEntity} · Centro Evaluador Oficial {CORPORATE_INFO.evaluatorCode}
          </p>
        </div>
      </div>
    </footer>
  );
}
