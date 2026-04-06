import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/cademmy-logo.jpg';
import './Navbar.css';

import { useUser } from '../context/UserContext';
import { AuthService } from '../services/authService';

const AppNavbar: React.FC = () => {
    const { user, userData, isAdmin } = useUser();
    const navigate = useNavigate();

    return (
        <nav className="navbar app-navbar">
            <div className="navbar-left">
                <div className="navbar-brand">
                    <Link to="/aula">
                        <img src={logo} alt="Cademmy Logo" className="logo" />
                    </Link>
                </div>
            </div>

            <ul className="navbar-links">
                <li><Link to="/aula">Mi Panel</Link></li>
            </ul>

            <div className="navbar-actions">
                {user && (
                    <div className="user-wallet-info">
                        <div className="wallet-badge" title="Tus CAD-Coins acumulados">
                            <span className="coin-icon">🪙</span>
                            <span className="coin-amount">{userData?.coins || 0}</span>
                            <span className="coin-label">CADs</span>
                        </div>
                        <div className="user-profile-menu">
                            {isAdmin && (
                                <Link to="/admin" className="admin-link-btn" title="Panel de Administración">
                                    ⚙️ Admin
                                </Link>
                            )}
                            <img src={user?.photoURL || ''} alt="Avatar" className="user-avatar" />
                            <button className="logout-mini" onClick={async () => {
                                await AuthService.logout();
                                navigate('/');
                            }}>Salir</button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default AppNavbar;
