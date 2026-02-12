import React from 'react';
import './CoursePages.css';

const CursosPresenciales: React.FC = () => {
    return (
        <div className="course-page">
            <section className="course-hero presencial-bg">
                <div className="hero-overlay">
                    <h1>Cursos Presenciales</h1>
                    <p>Experiencias de aprendizaje táctico y colaborativo en vivo.</p>
                </div>
            </section>

            <section className="course-details">
                <div className="details-grid">
                    <div className="detail-card">
                        <div className="icon">🏛️</div>
                        <h3>Sede Santa Fe</h3>
                        <p>Visítanos en Av. Santa Fe 505, Mezanine 2B. Espacios diseñados para la innovación.</p>
                    </div>
                    <div className="detail-card">
                        <div className="icon">🏢</div>
                        <h3>Capacitación In-Company</h3>
                        <p><strong>¡Nosotros vamos a ti!</strong> Nos desplazamos a tus oficinas para ofrecerte soluciones personalizadas.</p>
                    </div>
                    <div className="detail-card">
                        <div className="icon">🏃‍♂️</div>
                        <h3>Team Building</h3>
                        <p>Desarrollamos comunicación efectiva, resolución de conflictos y sinergia en tu equipo.</p>
                    </div>
                </div>
            </section>

            <section className="cta-section">
                <h2>La comodidad cerca de ti</h2>
                <p>Tú eliges el lugar, nosotros llevamos la solución. Agenda tu formación presencial hoy mismo.</p>
                <div className="hero-actions">
                    <button className="cta-button brand-gradient">Solicitar Visita In-Company</button>
                    <button className="cta-button primary-outline" style={{ color: 'var(--cademmy-charcoal)', borderColor: 'var(--cademmy-charcoal)' }}>Ver Sedes</button>
                </div>
            </section>
        </div>
    );
};

export default CursosPresenciales;
