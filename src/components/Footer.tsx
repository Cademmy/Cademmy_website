<<<<<<< HEAD
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
=======
import React from 'react';
import { Link } from 'react-router-dom';
import { CORPORATE_INFO } from '../constants/corporateInfo';
import './Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Cademmy Learning</h3>
                    <p>Potenciando la educación 4.0 y certificaciones con validez oficial.</p>
                </div>
                <div className="footer-section">
                    <h4>Enlaces</h4>
                    <ul>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/aviso-privacidad">Aviso de Privacidad</Link></li>
                        <li><Link to="/certificacion">Certificaciones</Link></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Contacto</h4>
                    <p>Dirección: {CORPORATE_INFO.address}</p>
                    <p>Teléfono: {CORPORATE_INFO.phone}</p>
                    <p>Email: {CORPORATE_INFO.email}</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Cademmy Learning. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;
>>>>>>> main
