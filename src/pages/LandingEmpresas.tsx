import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingEmpresas.css';

const LandingEmpresas: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-empresas">
            {/* HERO B2B */}
            <section className="empresas-hero">
                <div className="hero-overlay"></div>
                <div className="container empresas-hero-container">
                    <div className="empresas-hero-content">
                        <h1 className="empresas-hero-title animate-fade-in">
                            Estandariza la capacitación interna de tu equipo y obtén evidencia defendible.
                        </h1>
                        <p className="empresas-hero-subtitle animate-fade-in" style={{ animationDelay: '0.1s' }}>
                            Reduce la variabilidad en la formación impartida por tus expertos (SMEs) y profesionaliza a tus instructores con una metodología técnica alineada a estándares de competencia.
                        </p>
                        <div className="empresas-hero-actions animate-fade-in" style={{ animationDelay: '0.2s' }}>
                            <button className="cta-button brand-gradient" onClick={() => navigate('/diagnostico-rh')}>
                                Solicitar Diagnóstico
                            </button>
                        </div>
                    </div>
                    <div className="empresas-hero-visual animate-fade-in" style={{ animationDelay: '0.3s' }}>
                        <div className="visual-card">
                            <div className="card-badge">Cademmy Business</div>
                            <div className="card-metric">
                                <span className="metric-tag">Beneficio Clave</span>
                                <span className="metric-label-lg">Consistencia Operativa</span>
                            </div>
                            <div className="card-metric">
                                <span className="metric-tag">Impacto Real</span>
                                <span className="metric-label-lg">Transferencia al Puesto</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* THE PAIN: EL RETO DE RH / DO */}
            <section className="pain-points-section">
                <div className="container">
                    <div className="section-header-centered">
                        <span className="section-pre">El Reto de RH / DO</span>
                        <h2>¿Tu capacitación interna se queda en el aula o llega al puesto?</h2>
                    </div>
                    <div className="pain-grid">
                        <div className="pain-card">
                            <div className="pain-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                            </div>
                            <h3>Baja transferencia al puesto</h3>
                            <p>El personal toma los cursos, pero el desempeño operativo no cambia. Rompe el ciclo del "curso por el curso".</p>
                        </div>
                        <div className="pain-card">
                            <div className="pain-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                            </div>
                            <h3>Variabilidad Crítica</h3>
                            <p>Cada jefe o SME enseña "a su manera", generando fragmentación y huecos de calidad en la operación diaria.</p>
                        </div>
                        <div className="pain-card">
                            <div className="pain-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22v-7l-2-2m0 0l-2 2m2-2v7"></path><path d="M9 11V6a3 3 0 0 1 6 0v5"></path><rect x="6" y="11" width="12" height="10" rx="2"></rect></svg>
                            </div>
                            <h3>Incertidumbre de calidad</h3>
                            <p>Falta de rúbricas y portafolios de evidencia para defender la inversión ante Dirección con datos técnicos.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* THE SOLUTION: EL SISTEMA CADEMMY */}
            <section className="solution-section">
                <div className="container solution-grid">
                    <div className="solution-text">
                        <span className="section-pre">La Solución Cademmy</span>
                        <h2>Un sistema diseñado para la consistencia operativa</h2>
                        <p>
                            No somos una academia de cursos sueltos. Somos el estándar que profesionaliza a expertos técnicos (SMEs), 
                            transformando su conocimiento en herramientas de formación medibles, repetibles y defendibles.
                        </p>
                    </div>
                    <div className="solution-pillars">
                        <div className="pillar-item">
                            <div className="pillar-dot"></div>
                            <div className="pillar-content">
                                <strong>Estandarización 4.0</strong>
                                <span>Metodología técnica para que todos tus instructores internos enseñen bajo el mismo estándar rector.</span>
                            </div>
                        </div>
                        <div className="pillar-item">
                            <div className="pillar-dot"></div>
                            <div className="pillar-content">
                                <strong>Instrumentos Defendibles</strong>
                                <span>Rúbricas, guías de observación y listas de cotejo con valor técnico real, listas para auditorías de calidad.</span>
                            </div>
                        </div>
                        <div className="pillar-item">
                            <div className="pillar-dot"></div>
                            <div className="pillar-content">
                                <strong>Neuro-Pedagogía Aplicada</strong>
                                <span>Diseño instruccional basado en procesos cognitivos que maximizan la retención del conocimiento crítico.</span>
                            </div>
                        </div>
                        <div className="pillar-item">
                            <div className="pillar-dot"></div>
                            <div className="pillar-content">
                                <strong>Evidencia Trazable</strong>
                                <span>Portafolios de evidencia 100% trazables que validan el dominio real en el puesto de trabajo.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* DIAGNOSTIC CTA */}
            <section className="diagnostic-cta-section">
                <div className="container diagnostic-container">
                    <div className="diagnostic-header">
                        <h2>Diagnóstico de Madurez Rh / DO</h2>
                        <p>Mide la transferencia y la variabilidad de tu modelo de formación en 2 minutos.</p>
                    </div>
                    <div className="diagnostic-action">
                        <button className="cta-button primary-white" onClick={() => navigate('/diagnostico-rh')}>
                            Solicitar Diagnóstico
                        </button>
                    </div>
                </div>
            </section>

            {/* BACKUP: CERTIFICACIÓN */}
            <section className="backup-section">
                <div className="container">
                    <div className="backup-grid">
                        <div className="backup-content">
                            <h2 className="backup-title">Respaldo Formal del Proceso</h2>
                            <p>
                                Nuestra metodología ofrece una ruta formal de alineación a estándares de competencia para que tu plantilla docente obtenga una base defendible ante Dirección y auditoría. 
                                Se generan portafolios de evidencia auditables e instrumentos técnicos que aseguran la trazabilidad de la capacitación. 
                                Todo el proceso está sujeto a evaluación de competencia (el certificado se emite solo si el candidato resulta competente).
                            </p>
                            <div className="backup-checks">
                                <div className="check-item">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    <span>Alineación a Estándares de Competencia</span>
                                </div>
                                <div className="check-item">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    <span>Portafolios de Evidencia Auditables</span>
                                </div>
                            </div>
                        </div>
                        <div className="backup-image">
                           <div className="trust-visual-box">
                               <h3>Rigor Metodológico</h3>
                               <p>Trazabilidad operativa y rigor técnico en cada etapa.</p>
                           </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FINAL CTA BOFU */}
            <section className="final-bofu-section">
                <div className="container">
                    <div className="bofu-card">
                        <h2>¿Listo para profesionalizar a tus instructores internos?</h2>
                        <p>Agenda una sesión estratégica para analizar el impacto operativo que podemos generar en tu organización.</p>
                        <button className="cta-button brand-gradient lg" onClick={() => window.open('https://outlook.office.com/book/Capacitacin@cademmy.com/?ismsaljsauthenabled', '_blank')}>
                            Agendar Sesión de Resultados
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingEmpresas;
