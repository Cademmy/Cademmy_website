import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import './CoursePages.css';
import logoAdams from '../assets/adams-partner.png';
import logoConocer from '../assets/logo-conocer.png';
import Modal from '../components/Modal';
import KPIWidget from '../components/KPIWidget';
import ArchitectModule from '../components/ArchitectModule';

// Iconos SVG 
const IconCheckBrand = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--cademmy-orange)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ minWidth: '20px' }}>
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

const CertificacionesEmpresas: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'corporativo' | 'educacion'>('corporativo');
    const [isKPIModalOpen, setIsKPIModalOpen] = useState(false);
    const [isArchitectModalOpen, setIsArchitectModalOpen] = useState(false);

    return (
        <div className="course-page cert-page-v2">
            <Helmet>
                <title>Estandarización de Capacitación y Evaluación de Instructores Internos | Cademmy</title>
                <meta name="description" content="Optimiza los resultados de tu área de RH con evidencia defendible y KPIs de alto impacto pedagógico." />
            </Helmet>
            <header className="cert-hero-clean brand-gradient" style={{ paddingBottom: '2rem' }}>
                <div className="container" style={{ padding: '4rem 0 2rem', textAlign: 'center', color: 'white' }}>

                    <div className="segment-tabs-container">
                        <button
                            className={`segment-tab ${activeTab === 'corporativo' ? 'active' : ''}`}
                            onClick={() => setActiveTab('corporativo')}
                        >
                            Corporativos y RH
                        </button>
                        <button
                            className={`segment-tab ${activeTab === 'educacion' ? 'active' : ''}`}
                            onClick={() => setActiveTab('educacion')}
                        >
                            Instituciones Educativas
                        </button>
                    </div>

                    {activeTab === 'corporativo' ? (
                        <div className="fade-tab-enter-active">
                            <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', fontWeight: 900, lineHeight: 1.2 }}>Evidencia Defendible y KPIs de Alto Impacto</h1>
                            <p style={{ fontSize: '1.4rem', marginBottom: '3rem', opacity: 0.9, maxWidth: '800px', margin: '0 auto 3rem' }}>
                                Estandariza a tus instructores internos con metodología Formador 4.0 y reduce la variabilidad en la entrega de conocimientos.
                            </p>
                            <div className="hero-cta-group" style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                                <button className="cta-button white-btn" onClick={() => setIsKPIModalOpen(true)}>Generar Mapa de KPIs con IA</button>
                                <button className="cta-button outline-white-btn" style={{ background: 'transparent', border: '2px solid white', color: 'white' }} onClick={() => setIsArchitectModalOpen(true)}>Conocer Cademmy (IA Chat)</button>
                            </div>
                        </div>
                    ) : (
                        <div className="fade-tab-enter-active">
                            <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', fontWeight: 900, lineHeight: 1.2 }}>Sistema de Blindaje de Matrícula</h1>
                            <p style={{ fontSize: '1.4rem', marginBottom: '3rem', opacity: 0.9, maxWidth: '800px', margin: '0 auto 3rem' }}>
                                Instructor 4.0: Asegura el prestigio académico y la retención de tus alumnos con una plantilla docente de alto impacto pedagógico.
                            </p>
                            <div className="hero-cta-group" style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                                <button className="cta-button white-btn" onClick={() => setIsKPIModalOpen(true)}>Generar Blindaje con IA</button>
                                <button className="cta-button outline-white-btn" style={{ background: 'transparent', border: '2px solid white', color: 'white' }} onClick={() => setIsArchitectModalOpen(true)}>Consultar Arquitecto (IA)</button>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            <section className="pain-points-section" style={{ padding: '3rem 0', background: '#f8fafc' }}>
                <div className="container">
                    <div className="section-header-centered" style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                        <span style={{ color: 'var(--cademmy-orange)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
                            {activeTab === 'corporativo' ? 'El reto de RH' : 'El desafío Académico'}
                        </span>
                        <h2 style={{ fontSize: '2.5rem', marginTop: '1rem', fontWeight: 800 }}>
                            {activeTab === 'corporativo' ? '¿Tu capacitación interna se queda en el aula?' : '¿La calidad docente está afectando tu matrícula?'}
                        </h2>
                    </div>
                    <div className="pain-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {activeTab === 'corporativo' ? (
                            <>
                                <div className="pain-card" style={{ background: 'white', padding: '2.5rem', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                                    <h3 style={{ color: 'var(--cademmy-charcoal)', marginBottom: '1rem', fontSize: '1.4rem' }}>Baja transferencia al puesto</h3>
                                    <p style={{ color: '#4a5568', lineHeight: 1.6 }}>El personal toma los cursos, pero no se observa un cambio real en el desempeño diario. <strong>Rompe el ciclo del "curso por el curso".</strong></p>
                                </div>
                                <div className="pain-card" style={{ background: 'white', padding: '2.5rem', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                                    <h3 style={{ color: 'var(--cademmy-charcoal)', marginBottom: '1rem', fontSize: '1.4rem' }}>Inconsistencia entre instructores</h3>
                                    <p style={{ color: '#4a5568', lineHeight: 1.6 }}>Cada capacitador tiene su propia metodología, generando huecos de calidad. <strong>Estandariza la voz de tu marca educativa.</strong></p>
                                </div>
                                <div className="pain-card" style={{ background: 'white', padding: '2.5rem', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                                    <h3 style={{ color: 'var(--cademmy-charcoal)', marginBottom: '1rem', fontSize: '1.4rem' }}>Presión por justificar inversión</h3>
                                    <p style={{ color: '#4a5568', lineHeight: 1.6 }}>Dirección exige resultados tangibles. <strong>Transforma el gasto en capacitación en una inversión con evidencias defendibles.</strong></p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="pain-card" style={{ background: 'white', padding: '2.5rem', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                                    <h3 style={{ color: 'var(--cademmy-charcoal)', marginBottom: '1rem', fontSize: '1.4rem' }}>Fuga de alumnos (Deserción)</h3>
                                    <p style={{ color: '#4a5568', lineHeight: 1.6 }}>Los alumnos se retiran por falta de motivación o conexión con el docente. <strong>Blinda tu matrícula con pedagogía de alto impacto.</strong></p>
                                </div>
                                <div className="pain-card" style={{ background: 'white', padding: '2.5rem', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                                    <h3 style={{ color: 'var(--cademmy-charcoal)', marginBottom: '1rem', fontSize: '1.4rem' }}>Quejas sobre calidad docente</h3>
                                    <p style={{ color: '#4a5568', lineHeight: 1.6 }}>Expertos técnicos que no saben transmitir el conocimiento de forma efectiva. <strong>Convierte expertos en educadores memorables.</strong></p>
                                </div>
                                <div className="pain-card" style={{ background: 'white', padding: '2.5rem', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                                    <h3 style={{ color: 'var(--cademmy-charcoal)', marginBottom: '1rem', fontSize: '1.4rem' }}>Desconexión con el mercado</h3>
                                    <p style={{ color: '#4a5568', lineHeight: 1.6 }}>Programas que se sienten obsoletos o aburridos. <strong>Integra Neuro-Tech para modernizar la experiencia de aprendizaje.</strong></p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>

            <section className="b2b-coursera-section">
                <div className="container b2b-grid-container">
                    <div className="b2b-text-content">
                        <span className="b2b-pre-title">
                            {activeTab === 'corporativo' ? 'Soluciones para RH y L&D' : 'Soluciones para Rectoría y Académicos'}
                        </span>
                        <h2 className="b2b-main-title">
                            {activeTab === 'corporativo' ? 'Estandariza a tus instructores. Blinda tus resultados.' : 'Eleva el prestigio académico. Retén a tus alumnos.'}
                        </h2>
                        <ul className="b2b-checklist">
                            {activeTab === 'corporativo' ? (
                                <>
                                    <li><div className="b2b-item-content"><IconCheckBrand /><span><strong>Evidencia Defendible:</strong> Portafolios listos para auditorías de calidad y Dirección.</span></div></li>
                                    <li><div className="b2b-item-content"><IconCheckBrand /><span><strong>Consistencia Operativa:</strong> Elimina la variabilidad: todos enseñan bajo el mismo estándar rector.</span></div></li>
                                    <li><div className="b2b-item-content"><IconCheckBrand /><span><strong>Instrumentos Listos:</strong> Rúbricas y listas de cotejo diseñadas para medir el impacto real en el puesto.</span></div></li>
                                    <li><div className="b2b-item-content"><IconCheckBrand /><span><strong>Mapa KPI:</strong> Trazabilidad total desde el objetivo de aprendizaje hasta la métrica de desempeño.</span></div></li>
                                </>
                            ) : (
                                <>
                                    <li><div className="b2b-item-content"><IconCheckBrand /><span><strong>Retención Activa:</strong> Metodologías que mantienen al alumno comprometido y reducen la deserción.</span></div></li>
                                    <li><div className="b2b-item-content"><IconCheckBrand /><span><strong>Instructor 4.0:</strong> Capacitación en herramientas digitales y Neuro-Pedagogía aplicada.</span></div></li>
                                    <li><div className="b2b-item-content"><IconCheckBrand /><span><strong>Prestigio Institucional:</strong> Validación SEP que eleva el valor de tu plantilla docente.</span></div></li>
                                    <li><div className="b2b-item-content"><IconCheckBrand /><span><strong>Impacto en Aula:</strong> Garantía de aprendizaje tangible que genera recomendaciones positivas entre alumnos.</span></div></li>
                                </>
                            )}
                        </ul>
                    </div>
                    <div className="b2b-image-container">
                        <div className="b2b-image-placeholder"><div className="image-overlay-decoration"></div></div>
                        <div className="b2b-actions">
                            <button className="cta-button primary-orange" onClick={() => setIsArchitectModalOpen(true)}>
                                {activeTab === 'corporativo' ? 'Conocer Cademmy (IA Chat)' : 'Solicitar Propuesta Académica'}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="innovation-section">
                <div className="container innovation-grid">
                    <div className="innovation-text">
                        <span style={{ color: 'var(--cademmy-orange)', fontWeight: 700, textTransform: 'uppercase' }}>Diferenciación 2026</span>
                        <h2>Más allá de una capacitadora tradicional</h2>
                        <p>No solo enseñamos; hackeamos la curva de aprendizaje con tecnología de vanguardia para garantizar que tu inversión se traduzca en dominio real.</p>
                        <button className="cta-button outline-white-btn" style={{ background: 'transparent', border: '2px solid white', color: 'white' }}>Explorar Tecnología</button>
                    </div>
                    <div className="innovation-cards">
                        <div className="tech-card">
                            <h3>Neuroaprendizaje Aplicado</h3>
                            <p>Diseñamos cada sesión basándonos en cómo el cerebro adulto retiene información, maximizando el ROI por minuto de capacitación.</p>
                        </div>
                        <div className="tech-card">
                            <h3>Música con IA para Concentración</h3>
                            <p>Utilizamos bandas sonoras generadas por IA diseñadas para inducir estados de "Flow" y concentración profunda durante los talleres presenciales y online.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="course-details alliances-section">
                <div className="container">
                    <div className="section-header-centered">
                        <h2>Alianzas Estratégicas</h2>
                    </div>
                    <div className="details-grid">
                        <div className="detail-card">
                            <img src={logoConocer} alt="Red CONOCER" className="partner-card-logo" style={{ width: '120px', marginBottom: '1.5rem' }} />
                            <h3>Certificación SEP</h3>
                            <p>Emisión de certificados con código QR único y validez federal.</p>
                        </div>
                        <div className="detail-card">
                            <img src={logoAdams} alt="ADAMS" className="partner-card-logo" style={{ width: '150px', marginBottom: '1.5rem' }} />
                            <h3>Socio de Formación</h3>
                            <p>Metodología europea aplicada a la certificación mexicana.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="quality-guarantee-section">
                <div className="container">
                    <div className="section-header-centered">
                        <span style={{ color: 'var(--cademmy-orange)', fontWeight: 700 }}>VERIFICACIÓN DE CONFIANZA</span>
                        <h2 style={{ fontSize: '2.5rem', marginTop: '1rem', fontWeight: 800 }}>Garantía de Calidad Cademmy</h2>
                    </div>
                    <div className="quality-grid">
                        <div className="quality-card">
                            <span className="quality-val">+15</span>
                            <span className="quality-label">Años de Trayectoria</span>
                            <p className="quality-sub">Liderando la formación de instructores en México.</p>
                        </div>
                        <div className="quality-card">
                            <span className="quality-val">98%</span>
                            <span className="quality-label">Satisfacción</span>
                            <p className="quality-sub">Índice NPS promedio en programas corporativos.</p>
                        </div>
                        <div className="quality-card">
                            <span className="quality-val">100%</span>
                            <span className="quality-label">Certificados</span>
                            <p className="quality-sub">Instructores avalados oficialmente por CONOCER/SEP.</p>
                        </div>
                        <div className="quality-card">
                            <span className="quality-val">Euro-Am</span>
                            <span className="quality-label">Alianza Global</span>
                            <p className="quality-sub">Metodología internacional adaptada al mercado nacional.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cta-final brand-gradient">
                <div className="container">
                    <h2>
                        {activeTab === 'corporativo' ? '¿Listo para profesionalizar tu equipo?' : '¿Listo para blindar tu institución?'}
                    </h2>
                    <button className="cta-button white-btn" onClick={() => setIsArchitectModalOpen(true)}>Hablar con un consultor</button>
                </div>
            </section>

            {/* MODALS IA */}
            <Modal
                isOpen={isKPIModalOpen}
                onClose={() => setIsKPIModalOpen(false)}
                title="Generador de KPIs Estratégicos"
            >
                <p style={{ marginBottom: '1.5rem', color: '#64748b' }}>Escribe el área que deseas optimizar y nuestra IA diseñará la ruta de impacto pedagógico.</p>
                <KPIWidget />
            </Modal>

            <Modal
                isOpen={isArchitectModalOpen}
                onClose={() => setIsArchitectModalOpen(false)}
                title="Arquitecto de Soluciones Cademmy"
            >
                <ArchitectModule />
            </Modal>
        </div>
    );
};

export default CertificacionesEmpresas;
