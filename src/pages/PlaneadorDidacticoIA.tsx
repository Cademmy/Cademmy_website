import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import './PlaneadorDidacticoIA.css';

interface PlanningResult {
    topic: string;
    target: string;
    duration: string;
    sections: {
        time: string;
        activity: string;
        description: string;
    }[];
}

const PlaneadorDidacticoIA: React.FC = () => {
    const [step, setStep] = useState(1);
    const [generating, setGenerating] = useState(false);
    const [result, setResult] = useState<PlanningResult | null>(null);
    const [formData, setFormData] = useState({
        topic: '',
        target: '',
        duration: '60 min'
    });

    const handleGenerate = () => {
        setGenerating(true);
        // Simulate IA planning
        setTimeout(() => {
            setResult({
                topic: formData.topic,
                target: formData.target,
                duration: formData.duration,
                sections: [
                    { time: "0-10 min", activity: "Rompehielo Dinámico", description: "Dinámica de 'Verdades y Mentiras' para romper la tensión inicial y alinear expectativas." },
                    { time: "10-30 min", activity: "Marco Teórico Interactivo", description: "Presentación de conceptos clave utilizando el método Socrático para fomentar la participación." },
                    { time: "30-50 min", activity: "Taller Práctico", description: "Ejercicio en grupos pequeños para aplicar los conceptos en un caso de estudio real de la empresa." },
                    { time: "50-60 min", activity: "Cierre y Compromisos", description: "Reflexión final y establecimiento de 3 acciones concretas para aplicar el lunes siguiente." }
                ]
            });
            setGenerating(false);
            setStep(2);
        }, 3000);
    };

    const reset = () => {
        setStep(1);
        setResult(null);
        setGenerating(false);
    };

    return (
        <div className="ia-tool-page">
            <Helmet>
                <title>Planeador Didáctico IA | Cademmy</title>
                <meta name="description" content="Prototipo de IA para diseñar rutas de aprendizaje y planes de clase efectivos." />
            </Helmet>

            <section className="ia-hero planning">
                <div className="container">
                    <span className="badge">Prototipo Beta</span>
                    <h1>Planeador Didáctico <span className="text-gradient">Inteligente</span></h1>
                    <p>Diseña estructuras pedagógicas de alto impacto en segundos. Optimizado para instructores y líderes de capacitación.</p>
                </div>
            </section>

            <section className="ia-tool-container container">
                <div className="tool-card planning-card">
                    {step === 1 && (
                        <div className="tool-step">
                            <h2>Configura tu Sesión</h2>
                            <div className="form-group">
                                <label>Tema de la capacitación</label>
                                <input
                                    type="text"
                                    placeholder="Ej: Liderazgo Situacional, Comunicación Asertiva..."
                                    value={formData.topic}
                                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Perfil del participante</label>
                                <input
                                    type="text"
                                    placeholder="Ej: Gerentes de planta, Recién egresados, Equipo de ventas..."
                                    value={formData.target}
                                    onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Duración de la sesión</label>
                                <select
                                    value={formData.duration}
                                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                >
                                    <option value="60 min">60 Minutos</option>
                                    <option value="2 horas">2 Horas</option>
                                    <option value="4 horas">4 Horas (Medio día)</option>
                                    <option value="8 horas">8 Horas (Inmersivo)</option>
                                </select>
                            </div>
                            <button
                                className="btn-primary full-width"
                                disabled={!formData.topic || !formData.target || generating}
                                onClick={handleGenerate}
                            >
                                {generating ? 'Analizando Metodologías...' : 'Generar Plan de Clase'}
                            </button>
                        </div>
                    )}

                    {step === 2 && result && (
                        <div className="tool-result planning-result">
                            <div className="result-header">
                                <div className="status-badge success">Plan Maestro Generado</div>
                                <h2>{result.topic}</h2>
                                <p><strong>Audiencia:</strong> {result.target} | <strong>Duración:</strong> {result.duration}</p>
                            </div>

                            <div className="planning-timeline">
                                {result.sections.map((section, index) => (
                                    <div className="timeline-item" key={index}>
                                        <div className="time-col">{section.time}</div>
                                        <div className="content-col">
                                            <h3>{section.activity}</h3>
                                            <p>{section.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="btn-group">
                                <button className="btn-secondary" onClick={reset}>Nuevo Plan</button>
                                <button className="btn-primary">Exportar PDF</button>
                            </div>
                        </div>
                    )}

                    {generating && (
                        <div className="loading-overlay">
                            <div className="loader"></div>
                            <p>Estructurando objetivos de aprendizaje y seleccionando dinámicas...</p>
                        </div>
                    )}
                </div>
            </section>

            <section className="ia-features container">
                <h2>¿Por qué usar el planeador de Cademmy?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="icon">🎯</div>
                        <h3>Diseño por Objetivos</h3>
                        <p>Alineamos cada minuto de tu sesión con resultados de aprendizaje medibles.</p>
                    </div>
                    <div className="feature-card">
                        <div className="icon">🧠</div>
                        <h3>Basado en Neuroeducación</h3>
                        <p>Utilizamos curvas de atención para determinar cuándo introducir conceptos difíciles y cuándo realizar dinámicas.</p>
                    </div>
                    <div className="feature-card">
                        <div className="icon">⚡</div>
                        <h3>Agilidad Docente</h3>
                        <p>Reduce el tiempo de preparación de 4 horas a tan solo 10 minutos.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PlaneadorDidacticoIA;
