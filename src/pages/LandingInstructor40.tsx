import { Helmet } from 'react-helmet-async';
import { Brain, CheckCircle, Calendar, Users, Briefcase, Cpu, BarChart } from 'lucide-react';
import './LandingInstructor40.css';

const LandingInstructor40 = () => {
    const [activeTab, setActiveTab] = useState('b2b'); // Default to B2B view for higher value

    const modules = [
        { id: 1, title: "Introducción al EC0217.01 y la IA", date: "23 Mayo", time: "10:00 - 12:00", priceB2C: "$720", priceB2B: "$3,980", hours: "2 hrs" },
        { id: 2, title: "Planeación Didáctica con IA", date: "30 Mayo", time: "10:00 - 14:00", priceB2C: "$1,440", priceB2B: "$7,960", hours: "4 hrs" },
        { id: 3, title: "Técnicas Instruccionales Modernas", date: "06 Junio", time: "10:00 - 13:00", priceB2C: "$1,080", priceB2B: "$5,970", hours: "3 hrs" },
        { id: 4, title: "Conducción de Sesiones Efectivas", date: "13 Junio", time: "10:00 - 13:00", priceB2C: "$1,080", priceB2B: "$5,970", hours: "3 hrs" },
        { id: 5, title: "Evaluación del Aprendizaje con IA", date: "20 Junio", time: "10:00 - 14:00", priceB2C: "$1,440", priceB2B: "$7,960", hours: "4 hrs" },
        { id: 6, title: "Portafolio de Evidencias (Automátizado)", date: "27 Junio", time: "09:00 - 14:00", priceB2C: "$1,800", priceB2B: "$9,950", hours: "5 hrs" },
        { id: 7, title: "Simulaciones y Roleplay con IA", date: "04 Julio", time: "10:00 - 13:00", priceB2C: "$1,080", priceB2B: "$5,970", hours: "3 hrs" },
    ];

    return (
        <div className="landing-instructor-container">
            <Helmet>
                <title>Curso Instructor 4.0 con IA | Certificación EC0217.01 | Cademmy</title>
                <meta name="description" content="Certificación de instructores con IA y Simuladores. Modalidad híbrida. Inicio 23 de Mayo. Precios B2B y B2C disponibles." />
            </Helmet>

            {/* --- HERO SECTION --- */}
            <header className="hero-instructor">
                <div className="hero-content">
                    <div className="hero-text">
                        <div className="badge-new">Nueva Generación 2026</div>
                        <h1 className="hero-title">
                            INSTRUCTOR 4.0: <br />
                            <span className="accent-text">Enseña con IA,</span> <br />
                            Certifícate con Resultados.
                        </h1>
                        <p className="hero-desc">
                            El primer programa en México que une la certificación <strong>EC0217.01</strong> con <strong>Simuladores de IA</strong> y herramientas de diseño automático.
                            <br /><br />
                            Ideal para empresas que buscan <strong>Rentabilidad</strong> e instructores que buscan <strong>Evolución</strong>.
                        </p>
                        <div className="hero-buttons">
                            <button className="btn-primary-orange">
                                👉 Quiero Inscribirme
                            </button>
                            <button className="btn-secondary-outline">
                                Ver Temario Modular
                            </button>
                        </div>
                        <div className="hero-meta">
                            <div className="meta-item">
                                <Calendar size={16} className="icon-orange" /> Inicio: 23 Mayo 2026
                            </div>
                            <div className="meta-item">
                                <Users size={16} className="icon-orange" /> Cupo Limitado
                            </div>
                        </div>
                    </div>

                    {/* Visual del Software/Simulador */}
                    <div className="hero-visual">
                        <div className="simulator-mockup">
                            <div className="mockup-header">
                                <div className="dot red"></div>
                                <div className="dot yellow"></div>
                                <div className="dot green"></div>
                                <span className="mockup-title">Cademmy Solutions Architect v1.0</span>
                            </div>
                            <div className="mockup-body">
                                <div className="skeleton-line w-75"></div>
                                <div className="skeleton-line w-50"></div>
                                <div className="sim-preview-box">
                                    [Vista Previa: Simulador de Roleplay Activo]
                                </div>
                                <div className="console-text">
                                    &gt; Generando Estrategia de Curso... 100%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* --- BENEFICIOS (Grid) --- */}
            <section className="benefits-section">
                <div className="section-header">
                    <h2>Más que un curso, una actualización de sistema</h2>
                    <p>Por qué las empresas y universidades eligen Instructor 4.0</p>
                </div>

                <div className="benefits-grid">
                    {[
                        { icon: Brain, title: "Neuro-Pedagogía", desc: "Aprende a mantener la atención usando principios de neurociencia y música bio-impulsada." },
                        { icon: Cpu, title: "IA Integrada", desc: "Deja de sufrir planeando. Usa nuestra IA para diseñar cartas descriptivas y evaluaciones en minutos." },
                        { icon: CheckCircle, title: "Certificación EC0217.01", desc: "Alineación total al estándar CONOCER. Validez oficial nacional con enfoque moderno." },
                        { icon: BarChart, title: "Simuladores Reales", desc: "Practica situaciones difíciles con nuestro Director de RH Virtual antes de enfrentarte a uno real." },
                        { icon: Briefcase, title: "Rentabilidad B2B", desc: "Para empresas: Convierte a tu personal en instructores expertos y reduce gastos externos." },
                        { icon: Users, title: "Formato Híbrido", desc: "Clases presenciales de alto impacto + plataforma digital 24/7." }
                    ].map((item, idx) => (
                        <div key={idx} className="benefit-card">
                            <item.icon className="benefit-icon" />
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- TABLA DE PRECIOS Y FECHAS (La Joya) --- */}
            <section className="pricing-section" id="precios">
                <div className="section-container">
                    <div className="pricing-header-row">
                        <div>
                            <h2>Calendario y Modalidades</h2>
                            <p>Primera Emisión 2026 | Selecciona tu perfil para ver precios</p>
                        </div>

                        {/* Toggle B2B / B2C */}
                        <div className="pricing-toggle">
                            <button
                                onClick={() => setActiveTab('b2c')}
                                className={`toggle-btn ${activeTab === 'b2c' ? 'active-b2c' : ''}`}
                            >
                                Individual (B2C)
                            </button>
                            <button
                                onClick={() => setActiveTab('b2b')}
                                className={`toggle-btn ${activeTab === 'b2b' ? 'active-b2b' : ''}`}
                            >
                                Empresas (B2B)
                            </button>
                        </div>
                    </div>

                    <div className="pricing-table-container">
                        <table className="pricing-table">
                            <thead>
                                <tr>
                                    <th>Módulo</th>
                                    <th>Fecha / Hora</th>
                                    <th>Duración</th>
                                    <th className="text-right">
                                        {activeTab === 'b2b' ? 'Inversión Empresa' : 'Inversión Individual'}
                                    </th>
                                    <th className="text-center">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {modules.map((mod) => (
                                    <tr key={mod.id}>
                                        <td className="font-medium">{mod.title}</td>
                                        <td className="text-muted">{mod.date} <br /> <span className="text-small">{mod.time}</span></td>
                                        <td className="text-muted">{mod.hours}</td>
                                        <td className={`text-right font-bold ${activeTab === 'b2b' ? 'text-indigo' : 'text-orange'}`}>
                                            {activeTab === 'b2b' ? mod.priceB2B : mod.priceB2C}
                                        </td>
                                        <td className="text-center">
                                            <button className="btn-select">
                                                Seleccionar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {/* TOTAL ROW */}
                                <tr className={`total-row ${activeTab === 'b2b' ? 'bg-indigo-light' : 'bg-orange-light'}`}>
                                    <td colSpan={3} className="total-label">
                                        {activeTab === 'b2b' ? 'PAQUETE CORPORATIVO (Hasta 30 Pax)' : 'CURSO COMPLETO INDIVIDUAL'}
                                        <p className="total-subtext">
                                            {activeTab === 'b2b'
                                                ? 'Incluye: Acceso a plataforma, certificación de instructores y licencia de software Architect.'
                                                : 'Incluye: Todos los módulos + Acceso a Simulador.'}
                                        </p>
                                    </td>
                                    <td className="total-price text-right">
                                        <div className="price-old">
                                            {activeTab === 'b2b' ? '$59,700' : '$10,500'}
                                        </div>
                                        <div className={`price-final ${activeTab === 'b2b' ? 'text-indigo' : 'text-orange'}`}>
                                            {activeTab === 'b2b' ? '$47,760' : '$8,640'}
                                        </div>
                                        <div className="price-tax">MXN + IVA</div>
                                    </td>
                                    <td className="text-center">
                                        <button className={`btn-subscribe ${activeTab === 'b2b' ? 'btn-indigo' : 'btn-orange'}`}>
                                            Inscribirme Ahora
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* --- CTA FINAL --- */}
            <section className="cta-final-dark">
                <h2>¿Listo para evolucionar tu enseñanza?</h2>
                <p>No te quedes en el pasado. Únete a la generación de instructores que usan IA para potenciar el talento humano.</p>
                <div className="cta-actions">
                    <button className="btn-white">
                        Contactar Asesor B2B
                    </button>
                    <button className="btn-primary-orange">
                        Descargar Temario PDF
                    </button>
                </div>
                <p className="legal-text">
                    Cademmy 2026. Aviso de Privacidad y Términos Legales al pie.
                </p>
            </section>
        </div>
    );
};

export default LandingInstructor40;
