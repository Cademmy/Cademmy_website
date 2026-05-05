import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import './CoursePages.css';
import cintilloConocer from '../assets/cintillo-conocer.png';
import Modal from '../components/Modal';
import Checkout from '../components/Checkout';

// Iconos SVG 
const IconCheck = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ minWidth: '20px' }}>
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

const IconStar = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#ffbb00' }}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
);

const IconUser = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

const certificaciones = [
    {
        id: "EC0301",
        title: "Diseño de cursos presenciales grupales",
        desc: "Aprende a diseñar e implementar cursos presenciales efectivos para grupos.",
        rating: "4.7",
        type: "Certificación profesional"
    },
    {
        id: "EC0217.01",
        title: "Impartición de cursos usando IA",
        desc: "Capacítate para impartir formación utilizando inteligencia artificial.",
        rating: "4.9",
        type: "Certificación profesional"
    },
    {
        id: "EC0366",
        title: "Desarrollo de cursos de formación en línea",
        desc: "Domina la planificación y diseño de cursos virtuales.",
        rating: "4.8",
        type: "Certificación profesional"
    }
];

const CertificacionesIndiv: React.FC = () => {
    const [activeProfile, setActiveProfile] = useState<'docente' | 'independiente' | 'certificacion'>('docente');
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState({ name: '', price: 0 });

    return (
        <div className="course-page cert-page-v2">
            <Helmet>
                <title>Certificación SEP EC0217.01, EC0301 y EC0366 | Profesionalización Docente</title>
                <meta name="description" content="Obtén tu certificación oficial SEP CONOCER con la metodología Cademmy. Mejora tu perfil como docente o instructor independiente." />
            </Helmet>
            <div className="cert-cintillo">
                <img src={cintilloConocer} alt="Cintillo Centro Evaluador" />
            </div>

            <header className="cert-hero-clean" style={{ padding: '3rem 0 1rem' }}>
                <div className="container">
                    <div className="section-header-centered" style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>¿Cuál es tu perfil?</h2>
                        <p style={{ opacity: 0.8 }}>Selecciona tu camino para mostrarte la solución exacta.</p>
                    </div>

                    <div className="segment-selector-grid">
                        <div
                            className={`segment-card ${activeProfile === 'docente' ? 'active' : ''}`}
                            onClick={() => setActiveProfile('docente')}
                        >
                            <span className="segment-icon">👨‍🏫</span>
                            <h3>Soy Docente / Profesor</h3>
                            <p>Innovación en el aula y pedagogía moderna.</p>
                        </div>
                        <div
                            className={`segment-card ${activeProfile === 'independiente' ? 'active' : ''}`}
                            onClick={() => setActiveProfile('independiente')}
                        >
                            <span className="segment-icon">🚀</span>
                            <h3>Soy Capacitador Experto</h3>
                            <p>Metodología para vender y cobrar mejor.</p>
                        </div>
                        <div
                            className={`segment-card ${activeProfile === 'certificacion' ? 'active' : ''}`}
                            onClick={() => setActiveProfile('certificacion')}
                        >
                            <span className="segment-icon">📜</span>
                            <h3>Busco Certificación</h3>
                            <p>Validación oficial SEP para mi CV.</p>
                        </div>
                    </div>

                    <div className="hero-cards-flex fade-tab-enter-active">
                        <div className="hero-card primary-card brand-gradient">
                            <div className="price-tag-circle">
                                <div className="price-wire"></div>
                                <span className="price-currency">$</span>
                                <span className="price-value">5,000</span>
                                <span className="price-unit">/estándar</span>
                            </div>
                            <div className="hero-card-main-content">
                                <div className="hero-card-text">
                                    {activeProfile === 'docente' && (
                                        <>
                                            <h1>Innovación Radical en el Aula</h1>
                                            <p>Domina la Estrategia Freemium, la App Bloom y el uso de Música con IA para transformar tus clases en experiencias memorables.</p>
                                        </>
                                    )}
                                    {activeProfile === 'independiente' && (
                                        <>
                                            <h1>Profesionaliza tu carrera como Instructor</h1>
                                            <p>No solo te damos el papel de la SEP. Te damos la Pedagogía Cademmy para que tus cursos sean de alto impacto y puedas cobrar más.</p>
                                        </>
                                    )}
                                    {activeProfile === 'certificacion' && (
                                        <>
                                            <h1>Potencia tu perfil con certificaciones oficiales</h1>
                                            <p>Valida tu experiencia ante la SEP y obtén el respaldo institucional que necesitas para destacar en el mercado laboral.</p>
                                        </>
                                    )}
                                    <button
                                        className="cta-button white-btn"
                                        onClick={() => {
                                            setSelectedItem({ name: 'Certificación Profesional Cademmy', price: 5000 });
                                            setIsCheckoutOpen(true);
                                        }}
                                    >
                                        {activeProfile === 'independiente' ? 'Profesionalizar mi carrera' : 'Inscribirme ahora'}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="hero-card secondary-card glass-card">
                            <div className="card-inner">
                                {activeProfile === 'independiente' ? (
                                    <>
                                        <h2>¿Tus alumnos se duermen?</h2>
                                        <p>Eres experto en tu tema, pero si no garantizas aprendizaje, no te vuelven a contratar. Aprende a enseñar como un pro.</p>
                                        <div className="card-points">
                                            <p><IconCheck /> Garantía de aprendizaje</p>
                                            <p><IconCheck /> Incremento de tarifas</p>
                                            <p><IconCheck /> Reconocimiento SEP</p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <h2>¿Por qué Cademmy?</h2>
                                        <p>Demuestra lo que sabes hacer con validez nacional e internacional y metodología de vanguardia.</p>
                                        <div className="card-points">
                                            <p><IconCheck /> Avaladas por CONOCER</p>
                                            <p><IconCheck /> Sin necesidad de título previo</p>
                                            <p><IconCheck /> Mejora tu salario y posición</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <section className="catalog-section">
                <div className="container">
                    <div className="section-header-centered">
                        <h2>
                            {activeProfile === 'docente' ? 'Herramientas para Innovar' : 'Estándares de Excelencia'}
                        </h2>
                    </div>
                    <div className="catalog-flex-container">
                        <div className="catalog-grid-wrapper">
                            {certificaciones.map((std) => (
                                <div key={std.id} className="std-vertical-card">
                                    <div className="std-card-content">
                                        <span className="std-card-type">{std.type}</span>
                                        <h3>{std.title}</h3>
                                        <p>{std.desc}</p>
                                        <div className="std-card-footer">
                                            <IconStar /> {std.rating}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="process-section">
                <div className="container">
                    <h2>Tu camino al éxito</h2>
                    <div className="process-steps">
                        <div className="step"><div className="step-num">1</div><p>Inscripción</p></div>
                        <div className="step"><div className="step-num">2</div><p>Formación</p></div>
                        <div className="step"><div className="step-num">3</div><p>Evaluación</p></div>
                        <div className="step"><div className="step-num">4</div><p>Certificación</p></div>
                    </div>
                </div>
            </section>

            <section className="testimonials-section">
                <div className="container">
                    <h2 className="section-header-centered">Testimonios de éxito</h2>
                    <div className="testimonials-grid-coursera">
                        <div className="testimonial-card-v2">
                            <div className="testimonial-header"><div className="testimonial-avatar"><IconUser /></div> <span>Mónica R.</span></div>
                            <p className="testimonial-body">"Gracias a la certificación EC0217.01, hoy imparto talleres en toda Latinoamérica con validez oficial. La flexibilidad de Cademmy fue clave para mi crecimiento."</p>
                        </div>
                        <div className="testimonial-card-v2">
                            <div className="testimonial-header"><div className="testimonial-avatar"><IconUser /></div> <span>Ernesto V.</span></div>
                            <p className="testimonial-body">"Soy docente y necesitaba validar mis competencias ante la SEP. El proceso fue ágil, profesional y me dio el respaldo institucional que buscaba."</p>
                        </div>
                        <div className="testimonial-card-v2">
                            <div className="testimonial-header"><div className="testimonial-avatar"><IconUser /></div> <span>Laura G.</span></div>
                            <p className="testimonial-body">"Diseñar mis propios cursos era un reto, pero con el estándar EC0301 aprendí una metodología sólida que mis alumnos notan y agradecen."</p>
                        </div>
                        <div className="testimonial-card-v2">
                            <div className="testimonial-header"><div className="testimonial-avatar"><IconUser /></div> <span>Ricardo M.</span></div>
                            <p className="testimonial-body">"Validar mi experiencia laboral sin necesidad de un título previo me abrió puertas que creía cerradas. Hoy soy evaluador certificado e independiente."</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cta-final brand-gradient">
                <div className="container">
                    <h2>
                        {activeProfile === 'independiente' ? '¡Profesionaliza tu pasión!' : '¡Empieza hoy mismo!'}
                    </h2>
                    <button
                        className="cta-button white-btn"
                        onClick={() => {
                            setSelectedItem({ name: 'Plan de Formación Integral', price: 5000 });
                            setIsCheckoutOpen(true);
                        }}
                    >
                        {activeProfile === 'independiente' ? 'Quiero saber más' : 'Inscribirme ahora'}
                    </button>
                </div>
            </section>

            <Modal
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
                title="Proceso de Inscripción"
            >
                <Checkout
                    amount={selectedItem.price}
                    itemName={selectedItem.name}
                    onSuccess={() => setIsCheckoutOpen(false)}
                    onCancel={() => setIsCheckoutOpen(false)}
                />
            </Modal>
        </div>
    );
};

export default CertificacionesIndiv;
