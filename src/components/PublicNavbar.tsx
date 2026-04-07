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
                <li><Link to="/empresas">Empresas</Link></li>
                <li><Link to="/formador-4-0">Instructores</Link></li>
                <li className="nav-dropdown">
                    <span className="dropdown-trigger">Recursos</span>
                    <ul className="dropdown-menu">
                        <li className="dropdown-category-title">Contenido</li>
                        <li><Link to="/blog">Blog</Link></li>
                        <li><Link to="/podcast">Podcast</Link></li>
                        <li><Link to="/cademmy-tv">Cademmy TV</Link></li>
                        <li><Link to="/webinars">Webinars</Link></li>
                        
                        <li className="dropdown-category-title">Herramientas</li>
                        <li><Link to="/creador-objetivos">Creador de Objetivos</Link></li>
                        <li><Link to="/aprendizaje">Catálogo de Cursos</Link></li>
                        
                        <li className="dropdown-category-title">Materiales</li>
                        <li><Link to="/recursos">Dinámicas</Link></li>
                        <li><Link to="/ia-lab">Música IA</Link></li>
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
