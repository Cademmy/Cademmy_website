import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Course, LMSService } from '../services/lmsService';
import Checkout from '../components/Checkout';
import Modal from '../components/Modal';
import './CoursePages.css';
import './CourseLandingPage.css';

const CourseLandingPage: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const navigate = useNavigate();
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [showCheckout, setShowCheckout] = useState(false);

    useEffect(() => {
        const load = async () => {
            if (courseId) {
                const data = await LMSService.getCourseData(courseId);
                if (data) {
                    setCourse(data);
                } else if (courseId === 'ec0217') {
                    // Fallback para demo
                    setCourse({
                        id: 'ec0217',
                        title: 'Formador 4.0: Certificación EC0217.01',
                        tagline: 'Domina el arte de enseñar con Neuro-aprendizaje y Tecnología 5.0',
                        price: 3500,
                        marketingCopy: '¿Te has sentido frustrado al ver que tus alumnos no retienen la información? En Cademmy hemos decodificado cómo aprende el cerebro para que tú puedas enseñar con impacto real.',
                        benefits: [
                            'Certificación oficial nacional ante la SEP-CONOCER.',
                            'Dominio de herramientas de IA para planeación didáctica.',
                            'Estrategias de gamificación de alto impacto.',
                            'Acceso de por vida a la comunidad Alumni.'
                        ],
                        targetAudience: 'Instructores, capacitadores, RH y cualquier persona que desee profesionalizar su enseñanza.',
                        promoVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                        lessons: [
                            { id: '1', title: 'Fundamentos de Neuro-aprendizaje', duration: '20min', asset_type: 'video' },
                            { id: '2', title: 'Diseño de Cartas Descriptivas', duration: '45min', asset_type: 'reading' },
                            { id: '3', title: 'Evaluación de Competencias', duration: '30min', asset_type: 'quiz' }
                        ],
                        status: 'active'
                    });
                }
            }
            setLoading(false);
        };
        load();
    }, [courseId]);

    if (loading) return <div className="loading-screen">Cargando la experiencia...</div>;
    if (!course) return (
        <div className="container error-page">
            <h2>Huston, tenemos un problema.</h2>
            <p>No encontramos el curso que buscas.</p>
            <button className="cta-button" onClick={() => navigate('/')}>Ir al Inicio</button>
        </div>
    );

    const videoId = course.promoVideoUrl?.includes('v=')
        ? course.promoVideoUrl.split('v=')[1].split('&')[0]
        : null;

    return (
        <div className="course-landing-page">
            {/* Hero Section - ATENCION */}
            <section className="landing-hero brand-gradient">
                <div className="container hero-content">
                    <div className="hero-text fade-in">
                        <span className="badge">CURSO DISRUPTIVO</span>
                        <h1>{course.title}</h1>
                        <p className="tagline">{course.tagline}</p>
                        <div className="hero-actions">
                            <button className="cta-button white-btn" onClick={() => setShowCheckout(true)}>
                                Inscribirse por ${course.price || 0} MXN
                            </button>
                            <a href="#curriculum" className="secondary-link">Ver Temario ↓</a>
                        </div>
                    </div>

                    <div className="hero-video-box fade-in">
                        {videoId ? (
                            <div className="video-wrapper">
                                <iframe
                                    src={`https://www.youtube.com/embed/${videoId}?autoplay=0`}
                                    title="Promo Video"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ) : (
                            <div className="placeholder-image">
                                <img src="/assets/course-placeholder.jpg" alt={course.title} />
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Social Proof & Trust */}
            <section className="container trust-bar">
                <div className="trust-stats">
                    <div className="stat"><span>+5,000</span> Alumnos</div>
                    <div className="stat"><span>4.9/5</span> Valoración</div>
                    <div className="stat"><span>SEP</span> Aval Oficial</div>
                </div>
            </section>

            {/* Pain Points & Solution - INTERES & DESEO */}
            <section className="container problem-solution">
                <div className="neuromarking-copy">
                    <h2>¿Por qué este curso cambiará tu vida?</h2>
                    <p className="model-aida">{course.marketingCopy}</p>
                </div>

                <div className="benefits-grid">
                    {course.benefits?.map((benefit, idx) => (
                        <div key={idx} className="benefit-card">
                            <span className="check">✓</span>
                            <p>{benefit}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Curriculum - TRANSPARENCIA */}
            <section id="curriculum" className="container curriculum-section">
                <h3>Lo que aprenderás</h3>
                <div className="curriculum-list">
                    {course.lessons.map((lesson, idx) => (
                        <div key={lesson.id} className="lesson-item">
                            <span className="lesson-num">{idx + 1}</span>
                            <div className="lesson-info">
                                <h4>{lesson.title}</h4>
                                <span className="lesson-meta">{lesson.asset_type.toUpperCase()} • {lesson.duration}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Target Audience */}
            <section className="audience-section brand-gradient">
                <div className="container">
                    <h3>¿Es para ti?</h3>
                    <p>{course.targetAudience}</p>
                </div>
            </section>

            {/* Final CTA - ACCION */}
            <section className="final-cta container">
                <div className="cta-box">
                    <h2>¿Listo para dar el siguiente paso?</h2>
                    <p>Únete a la nueva era de la educación profesional.</p>
                    <div className="price-tag">${course.price || 0} MXN</div>
                    <button className="cta-button brand-gradient large" onClick={() => setShowCheckout(true)}>
                        QUIERO INSCRIBIRME AHORA
                    </button>
                    <p className="guarantee">Garantía de satisfacción de 7 días.</p>
                </div>
            </section>

            {/* Checkout Modal */}
            {showCheckout && (
                <Modal isOpen={showCheckout} onClose={() => setShowCheckout(false)} title="Inscripción al Curso">
                    <Checkout
                        amount={course.price || 0}
                        itemName={course.title}
                        onSuccess={() => {
                            alert("¡Felicidades! Bienvenido al curso.");
                            setShowCheckout(false);
                            navigate(`/aula/${course.id}`);
                        }}
                        onCancel={() => setShowCheckout(false)}
                    />
                </Modal>
            )}
        </div>
    );
};

export default CourseLandingPage;
