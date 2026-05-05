import React from 'react';
import './CoursePages.css';

const CursosEnLinea: React.FC = () => {
    return (
        <div className="course-page">
            <section className="course-hero online-bg">
                <div className="hero-overlay">
                    <h1>Cursos en Línea</h1>
                    <p>Tu carrera profesional, a tu ritmo, desde cualquier lugar del mundo.</p>
                </div>
            </section>

            <section className="course-details">
                <div className="details-grid">
                    <div className="detail-card">
                        <div className="icon">💻</div>
                        <h3>Plataforma 24/7</h3>
                        <p>Acceso ilimitado a contenidos de alta calidad desde cualquier dispositivo.</p>
                    </div>
                    <div className="detail-card">
                        <div className="icon">🌐</div>
                        <h3>Comunidad Global</h3>
                        <p>Conecta con profesionales de todo el mundo y expande tu red.</p>
                    </div>
                    <div className="detail-card">
                        <div className="icon">🏆</div>
                        <h3>Certificación Digital</h3>
                        <p>Obtén insignias digitales compartibles al completar tus módulos.</p>
                    </div>
                </div>
            </section>

            <section className="cta-section">
                <h2>¿Listo para empezar hoy mismo?</h2>
                <p>Inscríbete en nuestros cursos estrella y domina la Educación 4.0.</p>
                <button className="cta-button brand-gradient">Explorar Catálogo Digital</button>
            </section>
        </div>
    );
};

export default CursosEnLinea;
