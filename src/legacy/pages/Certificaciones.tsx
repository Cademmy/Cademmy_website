import React from 'react';
import './CoursePages.css';
import cintilloConocer from '../assets/cintillo-conocer.png';
import logoAdams from '../assets/adams-partner.png';
import logoConocer from '../assets/logo-conocer.png';
import CertFilterWidget from '../components/CertFilterWidget';

// Iconos SVG minimalistas
const IconCheck = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ minWidth: '20px' }}>
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

const IconTrophy = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
        <path d="M4 22h16"></path>
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
    </svg>
);

const IconBook = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
    </svg>
);

const IconHandshake = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2H14L21 9L14 16H10L3 9L10 2Z"></path>
        <path d="M7 9H17"></path>
        <path d="M10 6L8 9L10 12"></path>
        <path d="M14 6L16 9L14 12"></path>
    </svg>
);

const IconCheckBrand = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--cademmy-orange)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ minWidth: '20px' }}>
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

const IconUser = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);


const IconShield = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
);

const IconUsers = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
);

const IconFileText = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
);

const IconStar = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#ffbb00' }}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
);

const IconArrowRight = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
);

const certificaciones = [
    {
        id: "EC0301",
        title: "Diseño de cursos presenciales grupales",
        desc: "Aprende a diseñar e implementar cursos presenciales efectivos para grupos, incluyendo la creación de manuales y evaluación de los participantes.",
        rating: "4.7",
        type: "Certificación profesional"
    },
    {
        id: "EC0217.01",
        title: "Impartición de cursos usando IA",
        desc: "Capacítate para impartir formación del capital humano utilizando inteligencia artificial para personalizar el aprendizaje y mejorar la experiencia de enseñanza.",
        rating: "4.9",
        type: "Certificación profesional"
    },
    {
        id: "EC0366",
        title: "Desarrollo de cursos de formación en línea",
        desc: "Domina la planificación, diseño y evaluación de cursos virtuales en plataformas de aprendizaje digital.",
        rating: "4.8",
        type: "Certificación profesional"
    }
];

const Certificaciones: React.FC = () => {
    return (
        <div className="course-page cert-page-v2">
            {/* Cintillo Superior */}
            <div className="cert-cintillo">
                <img src={cintilloConocer} alt="Cintillo Centro Evaluador" />
            </div>

            {/* Hero Section - Banners Duales Limpios */}
            <header className="cert-hero-clean">
                <div className="container hero-cards-flex">
                    {/* Tarjeta 1: Impulsa tu carrera CON WIDGET */}
                    <div className="hero-card primary-card brand-gradient" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CertFilterWidget />
                    </div>

                    {/* Tarjeta 2: ¿Qué es? */}
                    <div className="hero-card secondary-card glass-card">
                        <div className="card-inner">
                            <h2>¿Qué es una certificación laboral?</h2>
                            <p>Son validaciones oficiales que demuestran lo que sabes hacer en el mundo real, no solo lo que estudiaste formalmente.</p>
                            <div className="card-points">
                                <p><IconCheck /> Avaladas por CONOCER (SEP)</p>
                                <p><IconCheck /> Reconocidas a nivel nacional</p>
                                <p><IconCheck /> Sin necesidad de título previo</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Fila de Beneficios (Fuera de los cuadros) */}
            <div className="container hero-benefits-row">
                <div className="hero-benefit-card">
                    <div className="benefit-icon-mini"><IconTrophy /></div>
                    <p>Certificaciones 100% válidas ante CONOCER</p>
                </div>
                <div className="hero-benefit-card">
                    <div className="benefit-icon-mini"><IconBook /></div>
                    <p>Metodología práctica y centrada en evidencias</p>
                </div>
                <div className="hero-benefit-card">
                    <div className="benefit-icon-mini"><IconHandshake /></div>
                    <p>Acompañamiento personalizado durante todo el proceso</p>
                </div>
            </div>

            {/* Sección de Beneficios por Competencias */}
            <section className="benefits-comparison-section">
                <div className="container">
                    <div className="section-header-centered">
                        <h2 className="section-title">Beneficios de certificarte por competencias</h2>
                        <p>Descubre cómo nuestros programas impulsan tanto tu crecimiento individual como el éxito de tu organización.</p>
                    </div>

                    <div className="benefits-comparison-grid">
                        {/* Tarjeta Profesional */}
                        <div className="comparison-card">
                            <div className="card-graphic orange-graphic">
                                <svg width="100%" height="100%" viewBox="0 0 400 150">
                                    <path d="M-10,100 C50,80 80,120 120,60 C160,0 220,100 300,40 C380,-20 410,60 410,60" fill="none" stroke="var(--cademmy-orange)" strokeWidth="15" strokeLinecap="round" opacity="0.6" />
                                    <path d="M-20,120 C40,100 70,140 110,80 C150,20 210,120 290,60 C370,0 400,80 400,80" fill="none" stroke="var(--cademmy-orange)" strokeWidth="15" strokeLinecap="round" opacity="0.3" />
                                    <circle cx="120" cy="60" r="10" fill="var(--cademmy-orange)" />
                                    <circle cx="300" cy="40" r="6" fill="var(--cademmy-orange)" />
                                </svg>
                            </div>
                            <div className="card-content">
                                <span className="card-tag">PARA TI COMO PROFESIONAL</span>
                                <h3>Potencia tu perfil</h3>
                                <ul className="comparison-list">
                                    <li><IconCheck /> Recibe una certificación oficial y con validez nacional</li>
                                    <li><IconCheck /> Valida tu experiencia laboral sin necesidad de un título</li>
                                    <li><IconCheck /> Flexibilidad total: estudia a tu ritmo</li>
                                    <li><IconCheck /> Formación con apoyo de inteligencia artificial</li>
                                    <li><IconCheck /> Mejora tu perfil profesional y tus oportunidades de empleo</li>
                                </ul>
                            </div>
                        </div>

                        {/* Tarjeta Empresa */}
                        <div className="comparison-card">
                            <div className="card-graphic yellow-graphic">
                                <svg width="100%" height="100%" viewBox="0 0 400 150">
                                    <path d="M410,100 C350,80 320,120 280,60 C240,0 180,100 100,40 C20,-20 -10,60 -10,60" fill="none" stroke="#ffbb00" strokeWidth="15" strokeLinecap="round" opacity="0.6" />
                                    <path d="M420,120 C360,100 330,140 290,80 C250,20 190,120 110,60 C30,0 0,80 0,80" fill="none" stroke="#ffbb00" strokeWidth="15" strokeLinecap="round" opacity="0.3" />
                                    <circle cx="280" cy="60" r="10" fill="#ffbb00" />
                                    <circle cx="100" cy="40" r="6" fill="#ffbb00" />
                                </svg>
                            </div>
                            <div className="card-content">
                                <span className="card-tag">PARA TU EMPRESA O EQUIPO</span>
                                <h3>Eleva la competitividad</h3>
                                <ul className="comparison-list">
                                    <li><IconCheck /> Eleva la competitividad de tu capital humano</li>
                                    <li><IconCheck /> Certifica a tu equipo con estándares oficiales y medibles</li>
                                    <li><IconCheck /> Mejora procesos internos con personal capacitado</li>
                                    <li><IconCheck /> Cumple con normativas oficiales y asegura calidad</li>
                                    <li><IconCheck /> Proyecta confianza ante clientes y aliados</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección de Catálogo style Coursera */}
            <section className="catalog-section">
                <div className="container">
                    <div className="catalog-flex-container">
                        <div className="catalog-sidebar">
                            <h2>Prepararse para un examen de competencia laboral</h2>
                            <button className="explore-btn">
                                Explorar estándares <IconArrowRight />
                            </button>
                        </div>

                        <div className="catalog-grid-wrapper">
                            {certificaciones.map((std, index) => {
                                const images = [
                                    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=400", // Diseño/Escritorio
                                    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=400", // Clase/Impartición
                                    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400"  // Online/Computadora
                                ];
                                return (
                                    <div key={std.id} className="std-vertical-card">
                                        <div className="std-card-img" style={{ backgroundImage: `url(${images[index % images.length]})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                            <div className="std-card-logo-overlay">
                                                <IconTrophy />
                                            </div>
                                        </div>
                                        <div className="std-card-content">
                                            <span className="std-card-type">{std.type}</span>
                                            <h3>{std.title}</h3>
                                            <div className="std-card-footer">
                                                <IconStar /> {std.rating} <span>(Rating oficial)</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Dirigido a - Redistribuido */}
            <section className="target-section">
                <div className="container">
                    <h2>¿A quién va dirigido?</h2>
                    <div className="target-grid">
                        <div className="target-card">
                            <div className="target-icon-box"><IconUser /></div>
                            <p>Profesionales que quieren validar su experiencia</p>
                        </div>
                        <div className="target-card">
                            <div className="target-icon-box"><IconUsers /></div>
                            <p>Empresas que desean capacitar a su equipo</p>
                        </div>
                        <div className="target-card">
                            <div className="target-icon-box"><IconTrophy /></div>
                            <p>Educadores, coaches y formadores</p>
                        </div>
                        <div className="target-card">
                            <div className="target-icon-box"><IconBook /></div>
                            <p>Emprendedores que diseñan sus propios cursos</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Números - Redistribuido */}
            <section className="numbers-section dark-section">
                <div className="container">
                    <h2>Cademmy en números</h2>
                    <div className="stats-grid">
                        <div className="stat-box">
                            <div className="stat-icon"><IconShield /></div>
                            <p>Alineado con CONOCER, ICEMéxico y la Red de Prestadores</p>
                        </div>
                        <div className="stat-box">
                            <div className="stat-icon"><IconStar /></div>
                            <p>Certificación en menos de 60 días promedio</p>
                        </div>
                        <div className="stat-box">
                            <div className="stat-icon"><IconHandshake /></div>
                            <p>Red de expertos en formación y evaluación</p>
                        </div>
                        <div className="stat-box">
                            <div className="stat-icon"><IconFileText /></div>
                            <p>Certificación oficial con validez ante la CONOCER/SEP</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Proceso - Redistribuido */}
            <section className="process-section">
                <div className="container">
                    <h2>Así es tu proceso de certificación:</h2>
                    <div className="process-steps">
                        <div className="step">
                            <div className="step-num">1</div>
                            <p>Elige tu estándar</p>
                        </div>
                        <div className="step">
                            <div className="step-num">2</div>
                            <p>Toma tu formación y materiales</p>
                        </div>
                        <div className="step">
                            <div className="step-num">3</div>
                            <p>Construye tu portafolio de evidencias</p>
                        </div>
                        <div className="step">
                            <div className="step-num">4</div>
                            <p>Evalúate y recibe tu certificado oficial SEP</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Alianzas Estratégicas */}
            <section className="course-details alliances-section">
                <div className="container">
                    <div className="section-header-centered">
                        <h2>Alianzas y Acreditaciones</h2>
                    </div>
                    <div className="details-grid">
                        <div className="detail-card">
                            <div className="partner-icon-wrapper">
                                <img src={logoConocer} alt="Red CONOCER" className="partner-card-logo" />
                            </div>
                            <h3>CONOCER / SEP</h3>
                            <p>Especialistas en Estándares de Competencia como el EC0217.01 para instructores de vanguardia.</p>
                        </div>
                        <div className="detail-card">
                            <div className="partner-icon-wrapper">
                                <img src={logoAdams} alt="ADAMS Formación" className="partner-card-logo" />
                            </div>
                            <h3>ADAMS Formación</h3>
                            <p>Líderes en capacitación empresarial a medida. Bajo nuestra alianza estratégica, ADAMS imparte la formación experta mientras Cademmy certifica oficialmente las competencias.</p>
                        </div>
                        <div className="detail-card">
                            <div className="partner-icon-wrapper">
                                <div className="ms-logo">
                                    <span className="ms-square red"></span>
                                    <span className="ms-square green"></span>
                                    <span className="ms-square blue"></span>
                                    <span className="ms-square yellow"></span>
                                </div>
                            </div>
                            <h3>Microsoft Education</h3>
                            <p>Como <strong>Global Training Partner</strong>, ofrecemos soluciones tecnológicas de vanguardia, capacitación especializada para docentes y beneficios exclusivos.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonios Estilo Coursera */}
            <section className="testimonials-section">
                <div className="container">
                    <h2 className="section-title-left">Por qué la gente elige Cademmy</h2>
                    <div className="testimonials-grid-coursera">
                        <div className="testimonial-card-v2">
                            <div className="testimonial-header">
                                <div className="testimonial-avatar">
                                    <IconUser />
                                </div>
                                <div className="testimonial-author-info">
                                    <span className="author-name">Mónica R.</span>
                                </div>
                            </div>
                            <p className="testimonial-body">
                                "Gracias a Cademmy hoy imparto talleres en toda Latinoamérica con mi certificación EC0217.01. La flexibilidad fue clave para mi crecimiento profesional."
                            </p>
                        </div>

                        <div className="testimonial-card-v2">
                            <div className="testimonial-header">
                                <div className="testimonial-avatar">
                                    <IconUser />
                                </div>
                                <div className="testimonial-author-info">
                                    <span className="author-name">Ernesto V.</span>
                                </div>
                            </div>
                            <p className="testimonial-body">
                                "Con EC0301 capacitamos a todo el equipo interno. Un proceso oficial, práctico y con resultados inmediatos en la calidad de nuestra formación corporativa."
                            </p>
                        </div>

                        <div className="testimonial-card-v2">
                            <div className="testimonial-header">
                                <div className="testimonial-avatar">
                                    <IconUser />
                                </div>
                                <div className="testimonial-author-info">
                                    <span className="author-name">Laura G.</span>
                                </div>
                            </div>
                            <p className="testimonial-body">
                                "La certificación en diseño de cursos me permitió profesionalizar mi academia en línea de forma excepcional. El acompañamiento técnico fue de primera."
                            </p>
                        </div>

                        <div className="testimonial-card-v2">
                            <div className="testimonial-header">
                                <div className="testimonial-avatar">
                                    <IconUser />
                                </div>
                                <div className="testimonial-author-info">
                                    <span className="author-name">Ricardo M.</span>
                                </div>
                            </div>
                            <p className="testimonial-body">
                                "Validar mi experiencia laboral sin necesidad de un título previo me abrió puertas que creía cerradas. Hoy soy evaluador certificado e independiente."
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Nueva Sección: Solución para tu empresa (B2B) - Rediseño estilo Coursera */}
            <section className="b2b-coursera-section">
                <div className="container b2b-grid-container">
                    <div className="b2b-text-content">
                        <span className="b2b-pre-title">Para equipos de todos los tamaños</span>
                        <h2 className="b2b-main-title">Estandariza la capacitación en tu empresa con un paquete defendible</h2>

                        <div className="b2b-badges-row">
                            <span className="b2b-tag-pill light">5-125 colaboradores</span>
                            <span className="b2b-tag-pill dark">125+ Líderes</span>
                        </div>

                        <p className="b2b-description">
                            Si estás buscando reducir la variabilidad entre instructores, aumentar la transferencia al puesto
                            y demostrar resultados ante auditoría o Dirección, nuestros estándares EC0217.01 y EC0301 son la solución definitiva.
                        </p>

                        <ul className="b2b-checklist">
                            <li>
                                <div className="b2b-item-content">
                                    <IconCheckBrand />
                                    <span><strong>Sistema de Trazabilidad:</strong> Manuales y evidencias trazables que soportan auditorías.</span>
                                </div>
                            </li>
                            <li>
                                <div className="b2b-item-content">
                                    <IconCheckBrand />
                                    <span><strong>Metodología Sólida:</strong> Profesionaliza a tus expertos internos eliminando la improvisación.</span>
                                </div>
                            </li>
                            <li>
                                <div className="b2b-item-content">
                                    <IconCheckBrand />
                                    <span><strong>Acompañamiento Integral:</strong> Te guiamos en diseño, impartición y evaluación experta.</span>
                                </div>
                            </li>
                            <li>
                                <div className="b2b-item-content">
                                    <IconCheckBrand />
                                    <span><strong>Paquete Defendible:</strong> Respaldo institucional para validar el retorno de inversión (ROI).</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="b2b-image-container">
                        <div className="b2b-image-placeholder">
                            {/* Aquí iría la imagen profesional. El usuario puede insertar su foto aquí */}
                            <div className="image-overlay-decoration"></div>
                        </div>
                        <div className="b2b-actions">
                            <button className="cta-button primary-orange">Solicita una propuesta empresarial</button>
                            <p className="b2b-cta-subtext">Respuesta y diagnóstico inicial en menos de 24 horas hábiles</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="faq-section">
                <div className="container">
                    <h2>Preguntas Frecuentes</h2>
                    <div className="faq-item">
                        <h4>¿Necesito título universitario?</h4>
                        <p>No. Solo necesitas habilidades y evidencias.</p>
                    </div>
                    <div className="faq-item">
                        <h4>¿La certificación es oficial?</h4>
                        <p>Sí, avalada por CONOCER (SEP).</p>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="cta-final brand-gradient">
                <div className="container">
                    <h2>¡Empieza tu certificación hoy mismo!</h2>
                    <p>Toma el control de tu desarrollo profesional.</p>
                    <button className="cta-button white-btn">Inscribirme ahora</button>
                    <div className="cta-footer-badges">
                        <span>Asesoría personalizada</span>
                        <span>Certificación oficial</span>
                        <span>Impulsa tu carrera</span>
                    </div>
                </div>
            </section>

            {/* Botón Flotante Mobile */}
            <button className="mobile-floating-cta">Comienza hoy</button>
        </div>
    );
};

export default Certificaciones;
