import Link from "next/link";

import { Container } from "@/components/Container";

export function Footer() {
  return (
    <footer className="site-footer">
      <Container className="footer-grid">
        <div>
          <p className="brand">Cademmy</p>
          <p>Consultoría, formación y certificación para acelerar resultados.</p>
        </div>
        <div>
          <p className="footer-title">Legal</p>
          <ul>
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
          <p className="footer-title">Contacto</p>
          <p>hola@cademmy.com</p>
          <p>Ciudad de México, MX</p>
        </div>
      </Container>
    </footer>
  );
}
