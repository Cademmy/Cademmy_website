import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingProfesionales.css';

const LandingProfesionales: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="landing-profesionales">
            {/* HERO PROFESIONAL */}
            <section className="prof-hero">
                <div className="hero-overlay"></div>
                <div className="container prof-hero-container">
                    <div className="prof-hero-content">
                        <span className="hero-eyebrow animate-fade-in">Formación para Expertos e Instructores</span>
                        <h1 className="prof-hero-title animate-fade-in">
                            De experto técnico a <span className="text-gradient">Formador 4.0</span>: traduce tu experiencia en impacto.
                        </h1>
                        <p className="prof-hero-subtitle animate-fade-in" style={{ animationDelay: '0.1s' }}>
                            Deja de improvisar al capacitar. Implementa una metodología técnica de clase mundial reforzada con IA para planear, conducir y evaluar con resultados defendibles.
                        </p>
                        <div className="prof-hero-actions animate-fade-in" style={{ animationDelay: '0.2s' }}>
                            <button className="cta-button brand-gradient" onClick={() => navigate('/diagnostico-rh')}>
                                Explorar Formador 4.0
                            </button>
                            <button className="cta-button secondary-cta" onClick={() => navigate('/ia-lab')}>
                                Probar IA Lab
                            </button>
                        </div>
                    </div>
                    <div className="prof-hero-visual animate-fade-in" style={{ animationDelay: '0.3s' }}>
                        <div className="prof-visual-card">
                            <div className="prof-card-badge">Cademmy Professional</div>
                            <div className="prof-card-metric">
                                <span className="metric-tag">Evolución</span>
                                <span className="metric-label-lg">De SME a Instructor Senior</span>
                            </div>
                            <div className="prof-card-metric">
                                <span className="metric-tag">Eficiencia IA</span>
                                <span className="metric-label-lg">Planeación Automatizada</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BLOQUE DE DOLOR: EL TECHO DE CRISTAL */}
            <section className="prof-pain-section">
                <div className="container">
                    <div className="section-header centered">
                        <span className="section-tag">El Desafío del Experto</span>
                        <h2>¿Sientes que enseñas por intuición?</h2>
                        <p className="section-lead">
                            Dominas tu área técnica, pero al momento de capacitar, la estructura se vuelve difusa. 
                            Sin un método medible, la inconsistencia se apodera del aprendizaje.
                        </p>
                    </div>

                    <div className="prof-pain-grid">
                        <div className="pain-card">
                            <div className="pain-icon">⚠️</div>
                            <h3>Improvisación Estratégica</h3>
                            <p>Enseñar "bajo instinto" sin una secuencia didáctica técnica que asegure el dominio del conocimiento.</p>
                        </div>
                        <div className="pain-card">
                            <div className="pain-icon">⏳</div>
                            <h3>Alta Carga Manual</h3>
                            <p>Horas invertidas en planeación administrativa, redacción de objetivos y creación de rúbricas desde cero.</p>
                        </div>
                        <div className="pain-card">
                            <div className="pain-icon">📉</div>
                            <h3>Invisibilidad de Resultados</h3>
                            <p>Falta de instrumentos y evidencias que validen ante dirección el impacto real de tu capacitación.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SOLUCIÓN: SISTEMA FORMADOR 4.0 */}
            <section className="prof-solution-section">
                <div className="container prof-solution-grid">
                    <div className="solution-content">
                        <span className="section-tag">La Solución Cademmy</span>
                        <h2>No te enseñamos a usar PowerPoint. Profesionalizamos tu talento.</h2>
                        <p>
                            Formador 4.0 es el sistema integral para expertos que buscan impacto real, método técnico y respaldo formal en su práctica docente.
                        </p>
                        
                        <ul className="solution-list">
                            <li>
                                <strong>Estructura Técnica:</strong> Objetivos basados en taxonomías reales y dominios de aprendizaje.
                            </li>
                            <li>
                                <strong>IA de Planeación:</strong> Diseña programas, materiales y rúbricas en una fracción del tiempo.
                            </li>
                            <li>
                                <strong>Neuro-Pedagogía:</strong> Estrategias aplicadas para mantener el compromiso y la retención del participante.
                            </li>
                            <li>
                                <strong>Evidencia Operativa:</strong> Genera portafolios de evidencia que validan tu desempeño técnica y formalmente.
                            </li>
                        </ul>
                    </div>
                    <div className="solution-visual">
                        <div className="solution-image-placeholder">
                            <div className="floating-badge">IA First Methodology</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* IA LAB: TU COPILOTO */}
            <section className="prof-ia-lab-section">
                <div className="container">
                    <div className="ia-lab-banner brand-gradient">
                        <div className="ia-lab-content">
                            <h3>Tu Planeación Didáctica en Segundos</h3>
                            <p>Usa nuestro IA Lab para generar secuencias, encuadres y evaluaciones alineadas a estándares internacionales. Profesionaliza tu estructura sin la carga administrativa.</p>
                            <button className="cta-button white-btn" onClick={() => navigate('/ia-lab')}>
                                Comenzar Auditoría IA
                            </button>
                        </div>
                        <div className="ia-lab-preview">
                            {/* Visual representativo de la interfaz de IA */}
                            <div className="ia-mockup">
                                <div className="mockup-line short"></div>
                                <div className="mockup-line long"></div>
                                <div className="mockup-line medium"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* MÓDULOS DE PROFESIONALIZACIÓN */}
            <section className="prof-modules-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">Ruta de Formación</span>
                        <h2>El Programa Instructor 4.0</h2>
                        <p>Diseñado para avanzar con entregables, no solo con teoría suelta.</p>
                    </div>

                    <div className="modules-grid">
                        <div className="module-item">
                            <span className="module-number">01</span>
                            <h3>Diseño y Planeación</h3>
                            <p>Taxonomía de Bloom, objetivos por dominio y estructuración de la sesión presencial u online.</p>
                        </div>
                        <div className="module-item">
                            <span className="module-number">02</span>
                            <h3>IA Aplicada (Copiloto)</h3>
                            <p>Prompts avanzados para material didáctico, casos de estudio y actividades gamificadas.</p>
                        </div>
                        <div className="module-item">
                            <span className="module-number">03</span>
                            <h3>Conducción de Alto Impacto</h3>
                            <p>Encuadres potentes, manejo de grupos difíciles y técnicas de neuro-facilitación.</p>
                        </div>
                        <div className="module-item">
                            <span className="module-number">04</span>
                            <h3>Evaluación y Evidencia</h3>
                            <p>Instrumentos de evaluación técnica (Cotejo, Rúbrica) y generación de portafolios auditables.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* RIGOR METODOLÓGICO (RESPALDO) */}
            <section className="prof-backup-section">
                <div className="container prof-backup-grid">
                    <div className="backup-content">
                        <span className="section-tag">Respaldo Formal del Proceso</span>
                        <h2>Rigor Metodológico y Alineación Técnica</h2>
                        <p>
                            Nuestra metodología ofrece una ruta formal de alineación a estándares de competencia para que tu práctica docente obtenga una base defendible.
                        </p>
                        <ul className="backup-points">
                            <li><span className="check">✓</span> Alineación a Estándares de Competencia</li>
                            <li><span className="check">✓</span> Portafolios de Evidencia Auditables</li>
                            <li><span className="check">✓</span> Sujeto a Evaluación de Competencia Técnica</li>
                        </ul>
                    </div>
                    <div className="backup-visual">
                        <div className="trust-cert-card">
                            <h3>Base Defendible</h3>
                            <p>Proyecta autoridad técnica ante cualquier auditoría o dirección.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* TESTIMONIOS */}
            <section className="prof-testimonials">
                <div className="container">
                    <div className="section-header centered">
                        <h2>Evolución Real</h2>
                    </div>
                    <div className="testimonials-grid">
                        <div className="testimonial-card">
                            <p>"Pasé de dar clases por intuición a tener un sistema que me permite planear en minutos y evaluar con precisión técnica."</p>
                            <span className="testimonial-author">— Experto Técnico (SME)</span>
                        </div>
                        <div className="testimonial-card">
                            <p>"La IA de Cademmy me devolvió el tiempo para enfocarme en los alumnos y no en el Excel de planeación."</p>
                            <span className="testimonial-author">— Instructor Independiente</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* CIERRE BOFU */}
            <section className="prof-bofu-section">
                <div className="container">
                    <div className="prof-bofu-card brand-gradient">
                        <h2>¿Listo para profesionalizar tu práctica docente?</h2>
                        <p>Únete a la próxima cohorte y obtén las herramientas para convertirte en un Formador 4.0 certificado.</p>
                        <div className="bofu-actions">
                            <button className="cta-button white-btn" onClick={() => window.open('https://outlook.office.com/book/Capacitacin@cademmy.com/')}>
                                Agendar Entrevista de Admisión
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingProfesionales;
