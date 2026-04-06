import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import './Hero.css';

const Hero: React.FC = () => {
    const { setUserType, userType } = useUser();
    const navigate = useNavigate();

    return (
        <section className={`hero-section profile-${userType}`}>
            <div className="hero-overlay"></div>
            <div className="hero-container">
                <div className="hero-content-left animate-fade-in">
                    <h1 className="hero-title">
                        Estandariza la capacitación interna de tu equipo <br className="hidden-mobile" />
                        y obtén evidencia defendible.
                    </h1>
                    <p className="hero-subtitle">
                        Procesos formativos fundamentados en evidencia y alineados a estándares de competencia.
                    </p>
                    <div className="hero-actions">
                        <button className="cta-button brand-gradient" onClick={() => navigate('/diagnostico-rh')}>
                            Solicitar Diagnóstico
                        </button>
                        <button className="cta-button primary-outline" onClick={() => navigate(userType === 'company' ? '/empresas' : '/consultoria')}>
                            Ver Soluciones
                        </button>
                    </div>
                </div>

                <div className="hero-content-right animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    <div className="hero-bifurcation-card">
                        <p className="bifurcation-title">
                            Selecciona tu ruta
                        </p>
                        <div className="bifurcation-options">
                            <button 
                                className={`route-btn ${userType === 'company' ? 'active-route' : ''}`}
                                onClick={() => setUserType('company')}
                            >
                                <span className="route-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg>
                                </span>
                                <div className="route-text">
                                    <strong>Para Empresas</strong>
                                    <span>Auditoría B2B y Estandarización</span>
                                </div>
                                <span className="route-arrow">→</span>
                            </button>
                            
                            <button 
                                className={`route-btn ${userType === 'professional' ? 'active-route' : ''}`}
                                onClick={() => setUserType('professional')}
                            >
                                <span className="route-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                </span>
                                <div className="route-text">
                                    <strong>Para Instructores</strong>
                                    <span>Certificación y Ruta de Carrera</span>
                                </div>
                                <span className="route-arrow">→</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
