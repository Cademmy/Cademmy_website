import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import './CertFilterWidget.css';

const CertFilterWidget: React.FC = () => {
    const [step, setStep] = useState<'question' | 'offer' | 'checkout'>('question');
    const navigate = useNavigate();

    const handleAnswer = (hasExperience: boolean) => {
        if (hasExperience) {
            setStep('checkout');
        } else {
            setStep('offer');
        }
    };

    const handleSimulatePayment = () => {
        // Simular pago exitoso y redirigir al LMS
        navigate('/aula/ec0217');
    };

    return (
        <div className="cert-filter-widget glass-card">
            {/* Header con indicador de IA */}
            <div className="widget-header">
                <div className="ai-indicator">
                    <span className="pulsing-dot"></span>
                    <span>Diagnóstico IA Activo</span>
                </div>
            </div>

            <div className="widget-content">
                {step === 'question' && (
                    <div className="fade-in">
                        <h3>¿Tienes experiencia impartiendo cursos?</h3>
                        <p className="widget-subtitle">Nuestro asistente personalizará tu ruta de certificación.</p>
                        <div className="widget-actions">
                            <button
                                className="cta-button primary-orange"
                                onClick={() => handleAnswer(true)}
                            >
                                Sí, tengo experiencia
                            </button>
                            <button
                                className="cta-button white-btn outline"
                                onClick={() => handleAnswer(false)}
                            >
                                No, voy empezando
                            </button>
                        </div>
                    </div>
                )}

                {step === 'checkout' && (
                    <div className="fade-in">
                        <div className="success-icon-wrapper">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--cademmy-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </div>
                        <h3>¡Perfil Aprobado!</h3>
                        <p>Estás listo para certificarte directamente. Accede al proceso de evaluación ahora.</p>
                        <div className="widget-actions vertical">
                            <button
                                className="cta-button primary-green full-width"
                                onClick={handleSimulatePayment}
                            >
                                Ir al Pago de Evaluación ($5,000 MXN)
                            </button>
                            <button
                                className="text-link"
                                onClick={() => setStep('question')}
                            >
                                Volver al inicio
                            </button>
                        </div>
                    </div>
                )}

                {step === 'offer' && (
                    <div className="fade-in">
                        <div className="info-icon-wrapper">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--cademmy-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="16" x2="12" y2="12"></line>
                                <line x1="12" y1="8" x2="12.01" y2="8"></line>
                            </svg>
                        </div>
                        <h3>Recomendación: Curso de Alineación</h3>
                        <p>Para asegurar tu éxito, te sugerimos tomar el curso de alineación antes de evaluarte.</p>
                        <div className="widget-actions vertical">
                            <button className="cta-button primary-blue full-width">
                                Ver Curso de Alineación
                            </button>
                            <button
                                className="text-link"
                                onClick={() => setStep('question')}
                            >
                                Volver al inicio
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CertFilterWidget;
