import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/cademmy-logo.jpg';
import './Navbar.css';

import { useUser } from '../context/UserContext';

const PublicNavbar: React.FC = () => {
    const { user } = useUser();

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <div className="navbar-brand">
                    <Link to="/">
                        <img src={logo} alt="Cademmy Logo" className="logo" />
                    </Link>
                </div>
            </div>

            <ul className="navbar-links">
                <li className="nav-dropdown">
                    <span className="dropdown-trigger">Soluciones</span>
                    <ul className="dropdown-menu">
                        <li><Link to="/diagnostico-rh">Diagnóstico RH</Link></li>
                        <li><Link to="/certificacion">Formador 4.0</Link></li>
                        <li><Link to="/consultoria">Consultoría</Link></li>
                        <li><Link to="/ia-lab">IA Lab</Link></li>
                    </ul>
                </li>
                <li><Link to="/empresas">Empresas</Link></li>
                <li><Link to="/certificacion">Instructores</Link></li>
                <li className="nav-dropdown">
                    <span className="dropdown-trigger">Recursos</span>
                    <ul className="dropdown-menu">
                        <li><Link to="/blog">Blog</Link></li>
                        <li><Link to="/cademmy-tv">Cademmy TV</Link></li>
                        <li><Link to="/podcast">Podcast</Link></li>
                    </ul>
                </li>
                <li><Link to="/contacto">Nosotros / Contacto</Link></li>
            </ul>

            <div className="navbar-actions">
                {user ? (
                    <Link to="/aula" className="cta-button brand-gradient" style={{ textDecoration: 'none', display: 'inline-block' }}>
                        Ir a la Plataforma
                    </Link>
                ) : (
                    <button className="cta-button brand-gradient" onClick={() => (window as any).showAuthModal?.()}>
                        Ingresar
                    </button>
                )}
            </div>
        </nav>
    );
};

export default PublicNavbar;
