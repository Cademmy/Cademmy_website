import React from 'react';
import { Link } from 'react-router-dom';
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
                        <li><Link to="/certificaciones">Certificaciones</Link></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Contacto</h4>
                    <p>WhatsApp: +52 56347094</p>
                    <p>Email: contacto@cademmy.com</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Cademmy Learning. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;
