import React from 'react';
import ArchitectModule from '../components/ArchitectModule';
import './CoursePages.css';

const Consultoria: React.FC = () => {
    return (
        <div className="course-page consultoria-5-0">
            {/* Hero 5.0 */}
            <section className="course-hero consultoria-hero">
                <div className="hero-overlay">
                    <div className="hero-badge">Cademmy Business 5.0</div>
                    <h1>Transformación Estratégica con IA Generativa</h1>
                    <p>Reinventamos el capital humano de tu organización a través de tecnologías disruptivas y neuro-aprendizaje.</p>
                    <div className="hero-actions">
                        <button className="cta-button brand-gradient">Solicitar Auditoría de IA</button>
                        <button className="cta-button secondary-glass">Ver Casos de Éxito</button>
                    </div>
                </div>
            </section>

            <div className="container">
                <ArchitectModule />
            </div>

            {/* Servicios Estratégicos */}
            <section className="consultoria-services">
                <div className="container">
                    <h2 className="section-title">Soluciones de Próxima Generación</h2>
                    <div className="services-grid">
                        <div className="service-card-premium">
                            <div className="service-icon">🔬</div>
                            <h3>Talent Design 5.0</h3>
                            <p>Diseñamos estructuras organizacionales ágiles preparadas para la colaboración humano-IA.</p>
                            <ul className="service-features">
                                <li>Mapeo de Skills Críticas 2025</li>
                                <li>Diseño de Planes de Carrera</li>
                                <li>Optimización de Estructuras</li>
                            </ul>
                        </div>
                        <div className="service-card-premium">
                            <div className="service-icon">🤖</div>
                            <h3>AI Upskilling Elite</h3>
                            <p>Capacitación intensiva en herramientas de IA Generativa para aumentar la productividad real en un 40%.</p>
                            <ul className="service-features">
                                <li>Prompt Engineering Avanzado</li>
                                <li>Automatización de Workflows</li>
                                <li>Ética y Seguridad de Datos</li>
                            </ul>
                        </div>
                        <div className="service-card-premium">
                            <div className="service-icon">📊</div>
                            <h3>Diagnóstico AI-Ready</h3>
                            <p>Evaluamos la madurez tecnológica y cultural de tu equipo para la adopción masiva de IA.</p>
                            <ul className="service-features">
                                <li>Análisis de Brechas Digitales</li>
                                <li>Auditoría de Procesos</li>
                                <li>Roadmap de Implementación</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pilot Section: Música IA */}
            <section className="pilot-music-section">
                <div className="container">
                    <div className="pilot-content">
                        <div className="pilot-text">
                            <span className="pilot-label">Piloto Exclusivo</span>
                            <h2>El Poder de la Música IA en la Capacitación</h2>
                            <p>
                                Únete a nuestro programa piloto y descubre cómo la música generada por IA
                                puede aumentar la retención y creatividad en tus equipos.
                            </p>
                            <div className="pilot-stats">
                                <div className="stat-item">
                                    <strong>+25%</strong>
                                    <span>Enfoque</span>
                                </div>
                                <div className="stat-item">
                                    <strong>+40%</strong>
                                    <span>Creatividad</span>
                                </div>
                            </div>
                            <button className="cta-button brand-gradient">Postular a mi Empresa</button>
                        </div>
                        <div className="pilot-visual">
                            <div className="music-player-mockup">
                                <div className="visualizer">
                                    <span></span><span></span><span></span><span></span><span></span>
                                </div>
                                <div className="player-info">
                                    <span className="track-title">Creatividad Alpha v1</span>
                                    <span className="track-artist">Cademmy AI Music Lab</span>
                                </div>
                                <div className="player-controls">
                                    <button className="play-btn">▶</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="cta-section strategist-cta">
                <div className="container">
                    <h2>Agenda una Sesión Estratégica con nuestros Directores</h2>
                    <p>No vendemos cursos, diseñamos el futuro de tu organización.</p>
                    <button className="cta-button brand-gradient lg">Hablar con un Estratega</button>
                    <div className="trust-badges">
                        <span>Certificados por CONOCER</span>
                        <span>Partners de Innovación IA</span>
                        <span>+500 Empresas Transformadas</span>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Consultoria;
