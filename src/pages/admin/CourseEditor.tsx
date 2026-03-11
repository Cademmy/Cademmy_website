import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Course, Lesson, LMSService } from '../../services/lmsService';
import './Admin.css';

const CourseEditor: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const navigate = useNavigate();
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'content' | 'marketing'>('content');
    const [generatingAI, setGeneratingAI] = useState(false);

    useEffect(() => {
        const load = async () => {
            if (courseId) {
                const data = await LMSService.getCourseData(courseId);
                if (data) {
                    setCourse(data);
                } else if (courseId === 'ec0217') {
                    // Fallback for demo if not in Firestore yet
                    setCourse({
                        id: 'ec0217',
                        title: 'Certificación EC0217.01 - Impartición de Cursos',
                        status: 'active',
                        lessons: [
                            { id: 'l1', title: 'Introducción al Neuro-aprendizaje', duration: '10:00', asset_type: 'video', videoUrl: '...' },
                        ]
                    });
                }
            }
            setLoading(false);
        };
        load();
    }, [courseId]);

    const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);

    const activeUnit = course?.lessons.find(u => u.id === selectedUnitId) || null;

    const updateUnit = (id: string, updates: Partial<Lesson>) => {
        if (!course) return;
        setCourse({
            ...course,
            lessons: course.lessons.map(u => u.id === id ? { ...u, ...updates } : u)
        });
    };

    const addUnit = (type: Lesson['asset_type']) => {
        if (!course) return;
        const newId = Math.random().toString(36).substr(2, 9);
        const newUnit: Lesson = {
            id: newId,
            title: `Nueva Unidad (${type})`,
            duration: '5:00',
            asset_type: type,
        };
        setCourse({ ...course, lessons: [...course.lessons, newUnit] });
        setSelectedUnitId(newId);
    };

    const saveChanges = async () => {
        if (!course) return;
        try {
            await LMSService.updateCourse(course.id, course);
            alert("Cambios guardados con éxito.");
        } catch (error: any) {
            alert("Error al guardar: " + error.message);
        }
    };

    if (loading) return <div className="container">Cargando editor...</div>;
    if (!course) return <div className="container">Curso no encontrado.</div>;

    const generateMarketingWithIA = async () => {
        setGeneratingAI(true);
        try {
            const assets = await LMSService.generateMarketingAssets(course);
            setCourse({
                ...course,
                ...assets
            });
            alert("Copy de marketing generado con éxito. ¡Revisa la sección de Marketing!");
        } catch (error) {
            alert("Error al generar con IA. Inténtalo de nuevo.");
        } finally {
            setGeneratingAI(false);
        }
    };

    return (
        <div className="course-editor-page container">
            <header className="manager-header">
                <div>
                    <button className="back-link" onClick={() => navigate('/admin/cursos')}>← Volver</button>
                    <h2>Editando: {course.title}</h2>
                </div>
                <div className="header-actions">
                    <button
                        className="mini-btn secondary"
                        onClick={() => window.open(`/aula/${course.id}`, '_blank')}
                    >
                        Vista Previa 👁️
                    </button>
                    <button className="cta-button brand-gradient" onClick={saveChanges}>Guardar Cambios</button>
                </div>
            </header>

            <div className="editor-tabs">
                <button
                    className={`tab-btn ${activeTab === 'content' ? 'active' : ''}`}
                    onClick={() => setActiveTab('content')}
                >
                    📚 Contenido de Clases
                </button>
                <button
                    className={`tab-btn ${activeTab === 'marketing' ? 'active' : ''}`}
                    onClick={() => setActiveTab('marketing')}
                >
                    🚀 Página de Venta (Marketing)
                </button>
            </div>

            <div className="editor-layout">
                <aside className="editor-sidebar">
                    <h3>Unidades del Curso</h3>
                    <div className="unit-list">
                        {course.lessons.map((unit, idx) => (
                            <div
                                key={unit.id}
                                className={`unit-editor-card ${selectedUnitId === unit.id ? 'active' : ''}`}
                                onClick={() => setSelectedUnitId(unit.id)}
                            >
                                <span>{idx + 1}. {unit.title}</span>
                                <span className="unit-type-tag">{unit.asset_type}</span>
                            </div>
                        ))}
                    </div>

                    <div className="add-unit-actions">
                        <h4>Añadir Unidad</h4>
                        <div className="add-btns-grid">
                            <button onClick={() => addUnit('video')}>🎥 Video</button>
                            <button onClick={() => addUnit('quiz')}>📝 Quiz</button>
                            <button onClick={() => addUnit('interactive')}>🧩 Interact</button>
                            <button onClick={() => addUnit('reading')}>📖 Lectura</button>
                            <button onClick={() => addUnit('ar_vr')}>🥽 AR/VR</button>
                        </div>
                    </div>
                </aside>

                <main className="editor-main">
                    {activeTab === 'content' ? (
                        activeUnit ? (
                            <div className="unit-detail-form fade-in">
                                <h3>Configurar {activeUnit.asset_type.toUpperCase()}</h3>

                                <div className="form-group">
                                    <label>Título de la Unidad</label>
                                    <input
                                        type="text"
                                        value={activeUnit.title}
                                        onChange={(e) => updateUnit(activeUnit.id, { title: e.target.value })}
                                    />
                                </div>

                                {activeUnit.asset_type === 'video' && (
                                    <div className="form-group">
                                        <label>Video del Curso (YouTube o MP4)</label>
                                        <input
                                            type="text"
                                            value={activeUnit.videoUrl || ''}
                                            onChange={(e) => updateUnit(activeUnit.id, { videoUrl: e.target.value })}
                                            placeholder="Ej: https://www.youtube.com/watch?v=... o .mp4"
                                        />
                                        <p className="field-hint">Soportamos YouTube, Vimeo y archivos MP4.</p>

                                        {activeUnit.videoUrl && activeUnit.videoUrl.includes('youtube.com') && (
                                            <div className="admin-video-preview">
                                                <p className="preview-label">Vista Previa del Video:</p>
                                                <iframe
                                                    width="100%"
                                                    height="200"
                                                    src={activeUnit.videoUrl.replace('watch?v=', 'embed/')}
                                                    title="YouTube video player"
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                    style={{ borderRadius: '12px', marginTop: '10px' }}
                                                ></iframe>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {activeUnit.asset_type === 'reading' && (
                                    <div className="form-group">
                                        <label>Documento PDF (Modo Lectura Interactiva / Flipbook)</label>
                                        <input
                                            type="text"
                                            value={activeUnit.pdfUrl || ''}
                                            onChange={(e) => updateUnit(activeUnit.id, { pdfUrl: e.target.value })}
                                            placeholder="Pegue aquí el enlace al PDF (Firebase, Drive público, etc.)"
                                        />
                                        <p className="field-hint">Cualquier PDF pegado aquí se abrirá con efecto de libro digital y herramientas para subrayar.</p>
                                    </div>
                                )}

                                {activeUnit.asset_type === 'quiz' && (
                                    <div className="form-group">
                                        <label>Configuración de Quiz (JSON)</label>
                                        <textarea
                                            placeholder="Preguntas y respuestas..."
                                            rows={5}
                                        ></textarea>
                                    </div>
                                )}

                                {(activeUnit.asset_type === 'interactive' || activeUnit.asset_type === 'ar_vr') && (
                                    <div className="form-group">
                                        <label>Instrucciones / Enlace Externo</label>
                                        <input
                                            type="text"
                                            value={activeUnit.external_link || ''}
                                            onChange={(e) => updateUnit(activeUnit.id, { external_link: e.target.value })}
                                            placeholder="https://..."
                                        />
                                    </div>
                                )}

                                <div className="form-actions">
                                    <button className="delete-unit-btn" onClick={() => {
                                        setCourse({ ...course, lessons: course.lessons.filter(u => u.id !== activeUnit.id) });
                                        setSelectedUnitId(null);
                                    }}>Eliminar Unidad</button>
                                </div>
                            </div>
                        ) : (
                            <div className="editor-empty-state">
                                <p>Selecciona una unidad para editar sus detalles o añade una nueva para comenzar.</p>
                                <div className="ocean-blue-tip">
                                    💡 Tip Océano Azul: Combina videos con micro-quizzes para aumentar la retención.
                                </div>
                            </div>
                        )
                    ) : (
                        <div className="marketing-section fade-in">
                            <div className="ai-generator-card">
                                <h4>🧠 Generador de Ventas Neuromarketing IA</h4>
                                <p>Usa IA para crear el nombre, tagline y descripción de venta perfecta basada en tu temario.</p>
                                <button
                                    className="cta-button brand-gradient"
                                    onClick={generateMarketingWithIA}
                                    disabled={generatingAI}
                                >
                                    {generatingAI ? '🧠 Procesando con Neuro-IA...' : '🚀 Generar Estrategia Completa'}
                                </button>
                            </div>

                            <div className="marketing-grid">
                                <div className="form-group">
                                    <label>Precio del Curso (MXN)</label>
                                    <input
                                        type="number"
                                        value={course.price || ''}
                                        onChange={(e) => setCourse({ ...course, price: parseFloat(e.target.value) })}
                                        placeholder="Ej: 2500"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Video Promocional (YouTube URL)</label>
                                    <input
                                        type="text"
                                        value={course.promoVideoUrl || ''}
                                        onChange={(e) => setCourse({ ...course, promoVideoUrl: e.target.value })}
                                        placeholder="Trailer o Introducción"
                                    />
                                </div>

                                <div className="form-group full-width">
                                    <label>Tagline (Gancho de Neuromarketing)</label>
                                    <input
                                        type="text"
                                        value={course.tagline || ''}
                                        onChange={(e) => setCourse({ ...course, tagline: e.target.value })}
                                        placeholder="Ej: Conviértete en un experto en Neuro-aprendizaje en 30 días."
                                    />
                                </div>

                                <div className="form-group full-width">
                                    <label>Target Audience (¿Para quién es?)</label>
                                    <input
                                        type="text"
                                        value={course.targetAudience || ''}
                                        onChange={(e) => setCourse({ ...course, targetAudience: e.target.value })}
                                    />
                                </div>

                                <div className="form-group full-width">
                                    <label>Beneficios Principales</label>
                                    <div className="benefits-list-editor">
                                        {(course.benefits || ['', '', '', '']).map((benefit, bIdx) => (
                                            <div key={bIdx} className="benefit-item-input">
                                                <span>{bIdx + 1}.</span>
                                                <input
                                                    type="text"
                                                    value={benefit}
                                                    onChange={(e) => {
                                                        const newBenefits = [...(course.benefits || ['', '', '', ''])];
                                                        newBenefits[bIdx] = e.target.value;
                                                        setCourse({ ...course, benefits: newBenefits });
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="form-group full-width">
                                    <label>Copy de Ventas Completo (AIDA)</label>
                                    <textarea
                                        rows={10}
                                        value={course.marketingCopy || ''}
                                        onChange={(e) => setCourse({ ...course, marketingCopy: e.target.value })}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default CourseEditor;
