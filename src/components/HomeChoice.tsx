import { Link } from 'react-router-dom';
import React from 'react';
import { useUser } from '../context/UserContext';
import './HomeChoice.css';

const HomeChoice: React.FC = () => {
    const { setUserType } = useUser();

    return (
        <section className="home-choice-section animate-fade-in">
            <div className="choice-container">
                <div className="choice-card professional" onClick={() => setUserType('professional')}>
                    <div className="choice-icon">👤</div>
                    <h2>Soy Profesional</h2>
                    <p>Busco certificar mi experiencia, crecer en mi carrera y acceder a herramientas pedagógicas de vanguardia.</p>
                    <button className="choice-btn">Explorar mi Ruta</button>
                </div>

                <div className="choice-divider">
                    <span>O</span>
                </div>

                <div className="choice-card company" onClick={() => setUserType('company')}>
                    <div className="choice-icon">🏢</div>
                    <h2>Soy Empresa</h2>
                    <p>Busco estandarizar procesos, maximizar el ROI de capacitación y soluciones B2B de alto impacto.</p>
                    <button className="choice-btn">Soluciones Corporativas</button>
                </div>
            </div>

            <div className="promo-banner" style={{ marginTop: '2rem', textAlign: 'center' }}>
                <Link to="/instructor-4-0" style={{ display: 'inline-block', background: '#0f172a', color: 'white', padding: '10px 20px', borderRadius: '30px', textDecoration: 'none', fontWeight: 'bold' }}>
                    🚀 ¿Buscas la próxima fecha de certificación? <span style={{ color: '#f97316' }}>Ver Instructor 4.0</span>
                </Link>
            </div>

            <p className="choice-footer">Selecciona tu perfil para personalizar toda tu experiencia de navegación.</p>
        </section>
    );
};

export default HomeChoice;
