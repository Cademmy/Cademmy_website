import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/cademmy-logo.jpg';
import './Navbar.css';

import { useUser } from '../context/UserContext';
import { AuthService } from '../services/authService';

const Navbar: React.FC = () => {
    const { user, userData, userType, setUserType } = useUser();

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <div className="navbar-brand">
                    <Link to="/">
                        <img src={logo} alt="Cademmy Logo" className="logo" />
                    </Link>
                </div>

                <div className="profile-config">
                    <div className="profile-selector">
                        <button
                            className={`profile-btn ${userType === 'professional' ? 'active' : ''}`}
                            onClick={() => setUserType('professional')}
                            data-label="Persona"
                            title="Perfil Persona"
                        >
                            👤
                        </button>
                        <button
                            className={`profile-btn ${userType === 'company' ? 'active' : ''}`}
                            onClick={() => setUserType('company')}
                            data-label="Empresa"
                            title="Perfil Empresa"
                        >
                            🏢
                        </button>
                    </div>
                </div>
            </div>

            <ul className="navbar-links">
                <li>
                    <Link to="/instructor-4-0" style={{ color: '#f97316', fontWeight: 'bold', border: '1px solid #f97316', padding: '5px 10px', borderRadius: '5px' }}>
                        Nuevo: Instructor 4.0
                    </Link>
                </li>
                <li>
                    <Link to={userType === 'company' ? '/certificaciones/empresas' : '/certificaciones/profesionales'}>
                        Certificaciones
                    </Link>
                </li>
                <li>
                    <Link to={userType === 'company' ? '/cursos-presenciales' : '/cursos-en-linea'}>
                        Capacitación
                    </Link>
                </li>
                <li><Link to="/consultoria">Consultoría</Link></li>
                <li className="nav-dropdown">
                    <span className="dropdown-trigger">Recursos</span>
                    <ul className="dropdown-menu">
                        <li><Link to="/blog">Artículos</Link></li>
                        <li><Link to="/cademmy-tv">Cademmy TV</Link></li>
                        <li><Link to="/podcast">Podcast</Link></li>
                        <li className="sub-dropdown">
                            <span className="sub-trigger">IA Lab</span>
                            <ul className="sub-menu">
                                <li><Link to="/ia/music-lab">Música Pedagógica</Link></li>
                                <li><Link to="/ia/planeador-didactico">Planeador Didáctico</Link></li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>

            <div className="navbar-actions">
                {user ? (
                    <div className="user-wallet-info">
                        <div className="wallet-badge" title="Tus CAD-Coins acumulados">
                            <span className="coin-icon">🪙</span>
                            <span className="coin-amount">{userData?.coins || 0}</span>
                            <span className="coin-label">CADs</span>
                        </div>
                        <div className="user-profile-menu">
                            <img src={user.photoURL || ''} alt="Avatar" className="user-avatar" />
                            <button className="logout-mini" onClick={() => AuthService.logout()}>Salir</button>
                        </div>
                    </div>
                ) : (
                    <button className="cta-button brand-gradient" onClick={() => (window as any).showAuthModal?.()}>
                        Ingresar
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
