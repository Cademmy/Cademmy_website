import { Link } from "react-router-dom";
import './Footer.css';
import logo from '../assets/cademmy-logo.jpg';

export function Footer() {
  return (
    <footer className="cademmy-footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <img src={logo} alt="Cademmy" className="footer-logo" />
            <p className="footer-description">
              Formación 4.0, consultoría B2B y diseño de procesos alineados a estándares de competencia.
            </p>
          </div>
          
          <div className="footer-links-group">
            <h4 className="footer-title">Plataforma</h4>
            <ul className="footer-list">
              <li><Link to="/diagnostico-rh">Diagnóstico RH</Link></li>
              <li><Link to="/certificacion">Instructor 4.0</Link></li>
              <li><Link to="/consultoria">Consultoría B2B</Link></li>
              <li><Link to="/ia-lab">IA Lab</Link></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-title">Legal</h4>
            <ul className="footer-list">
              <li><Link to="/aviso-privacidad">Aviso de Privacidad</Link></li>
              <li><Link to="/legal/terminos">Términos y Condiciones</Link></li>
              <li><Link to="/legal/reembolsos">Reembolsos</Link></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-title">Contacto</h4>
            <ul className="footer-list contact-list">
              <li>contacto@cademmy.com</li>
              <li>+52 55 52 93 9203</li>
              <li>Av. Santa Fe 505 Mezanine Of 2B<br />Santa Fe, Cuajimalpa, CDMX<br />CP 01219</li>
            </ul>
          </div>
      </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div>
              <p style={{ marginBottom: '0.4rem', color: '#64748b' }}>&copy; {new Date().getFullYear()} Cademmy. Todos los derechos reservados.</p>
              <p style={{ fontSize: '0.85rem', color: '#334155', fontWeight: 600 }}>Centro Evaluador Oficial: CE1298-OC063-18 · CADEMMY LEARNING SAS</p>
            </div>
            <div className="footer-socials">
              <a href="#" aria-label="LinkedIn">IN</a>
              <a href="#" aria-label="Twitter">TW</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
