import { useState, useEffect } from 'react';
import { B2BService } from '../services/b2bService';
import { AnalyticsService } from '../services/analyticsService';
import { CheckCircle2, Bot, ArrowRight, ShieldCheck, ChevronRight, ChevronLeft, Download, Calendar } from 'lucide-react';
import './DiagnosticoRH.css';

const DiagnosticoRH = () => {
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        role: '',
        company_size: '',
        instructors_type: '',
        transfer_verification: '',
        onboarding_speed: '',
        variability_pain: '',
        budget_range: '',
        company_name: '',
        contact_name: '',
        email: ''
    });

    // Track initialization
    useEffect(() => {
        AnalyticsService.logEvent('start_diagnosis');
    }, []);

    const nextStep = () => setStep((prev: number) => prev + 1);
    const prevStep = () => setStep((prev: number) => prev - 1);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const selectOption = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
        nextStep();
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const result = await B2BService.processDiagnostic({
                ...formData,
                source: 'auditoria_madurez_2026'
            });
            setReport(result.report);
            AnalyticsService.logEvent('complete_diagnosis', { risk: result.scoreRisk });
            setStep(7); // Paso de éxito
        } catch (error) {
            console.error("Error processing diagnostic:", error);
            alert("Hubo un error al procesar tu diagnóstico. Por favor intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    const getBookingsLink = () => {
        // Lógica de interés detectado: 
        // Si hay dolor en variabilidad o velocidad, priorizamos Cursos. 
        // Si hay perfil de RH o tamaño grande, priorizamos Certificación.
        const isCertInterest = formData.role === 'Certificación' || formData.transfer_verification === 'Evidencia en campo (Listas cotejo)';

        if (isCertInterest) {
            return "https://outlook.office.com/book/CademmyCertification1@cademmy.com/?ismsaljsauthenabled";
        }
        return "https://outlook.office.com/book/Capacitacin@cademmy.com/?ismsaljsauthenabled";
    };

    return (
        <div className="diagnostico-page">
            <div className="wizard-container glass-morphism">
                <div className="wizard-header">
                    <div className="brand-badge">
                        <Bot className="bot-icon" />
                        <span>Analista Virtual Cademmy</span>
                    </div>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${(step / 6) * 100}%` }}></div>
                    </div>
                </div>

                <div className="wizard-body">
                    {step === 0 && (
                        <div className="step-content fade-in text-center">
                            <h1>Auditoría de Madurez de Capacitación</h1>
                            <p className="subtitle">Mide el ROI, la Transferencia y la Variabilidad de tu modelo de formación en 2 minutos.</p>
                            <div className="hero-visual">
                                <ShieldCheck className="hero-icon animated-float" />
                            </div>
                            <button className="cta-button brand-gradient large" onClick={nextStep}>
                                Comenzar Auditoría <ArrowRight />
                            </button>
                        </div>
                    )}

                    {step === 1 && (
                        <div className="step-content fade-in">
                            <span className="step-indicator">Paso 1: Perfil de Auditoría</span>
                            <h2>Configuración inicial</h2>
                            <div className="form-group">
                                <label>Rol de quien reporta</label>
                                <select name="role" value={formData.role} onChange={handleChange}>
                                    <option value="">Selecciona tu rol</option>
                                    <option value="Dirección RH">Dirección RH</option>
                                    <option value="Capacitación">Capacitación</option>
                                    <option value="Operaciones">Operaciones</option>
                                    <option value="Otro">Otro</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Tamaño de la organización</label>
                                <select name="company_size" value={formData.company_size} onChange={handleChange}>
                                    <option value="">Colaboradores</option>
                                    <option value="200-499">200 - 499</option>
                                    <option value="500-999">500 - 999</option>
                                    <option value="1000-4999">1000 - 4999</option>
                                    <option value="5000+">5000+</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>¿Quién capacita hoy?</label>
                                <select name="instructors_type" value={formData.instructors_type} onChange={handleChange}>
                                    <option value="">Tipo de instructores</option>
                                    <option value="SMEs">SMEs (Expertos de área)</option>
                                    <option value="Internos dedicados">Internos dedicados</option>
                                    <option value="Mixto">Mixto</option>
                                </select>
                            </div>
                            <div className="wizard-footer">
                                <button className="back-link" onClick={prevStep}><ChevronLeft /> Volver</button>
                                <button className="cta-button primary" disabled={!formData.role || !formData.company_size || !formData.instructors_type} onClick={nextStep}>
                                    Siguiente <ChevronRight />
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="step-content fade-in">
                            <span className="step-indicator">Paso 2: Transferencia</span>
                            <h2>Métrica de Aplicación</h2>
                            <p>¿Cómo verifican hoy que lo aprendido se aplicó en el trabajo?</p>
                            <div className="option-grid">
                                <div className="option-card" onClick={() => selectOption('transfer_verification', 'No lo medimos (solo asistencia)')}>
                                    <h3>Solo Asistencia</h3>
                                    <p>No se mide aplicación real.</p>
                                </div>
                                <div className="option-card" onClick={() => selectOption('transfer_verification', 'Examen teórico')}>
                                    <h3>Examen Teórico</h3>
                                    <p>Validamos conocimiento, no ejecución.</p>
                                </div>
                                <div className="option-card" onClick={() => selectOption('transfer_verification', 'Evidencia en campo (Listas cotejo)')}>
                                    <h3>Evidencia en Campo</h3>
                                    <p>Listas de cotejo y observación.</p>
                                </div>
                                <div className="option-card" onClick={() => selectOption('transfer_verification', 'KPIs de desempeño')}>
                                    <h3>KPIs</h3>
                                    <p>Impacto directo en métricas de negocio.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="step-content fade-in">
                            <span className="step-indicator">Paso 3: Velocidad</span>
                            <h2>Onboarding Operativo</h2>
                            <p>¿El tiempo de curva de aprendizaje de nuevos ingresos cumple con la exigencia operativa?</p>
                            <div className="option-grid">
                                <div className="option-card" onClick={() => selectOption('onboarding_speed', 'No, es lento y costoso')}>
                                    <h3>No cumple</h3>
                                    <p>Es lento y costoso.</p>
                                </div>
                                <div className="option-card" onClick={() => selectOption('onboarding_speed', 'Es aceptable pero variable')}>
                                    <h3>Aceptable</h3>
                                    <p>Pero hay variabilidad.</p>
                                </div>
                                <div className="option-card" onClick={() => selectOption('onboarding_speed', 'Sí, es estandarizado')}>
                                    <h3>Sí cumple</h3>
                                    <p>Es un proceso estandarizado.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="step-content fade-in">
                            <span className="step-indicator">Paso 4: Variabilidad</span>
                            <h2>Dolor de Estandarización</h2>
                            <p>¿Existe diferencia en desempeño según quién capacitó?</p>
                            <div className="option-grid">
                                <div className="option-card" onClick={() => selectOption('variability_pain', 'Sí, mucha variabilidad (dependemos del talento)')}>
                                    <h3>Mucha variabilidad</h3>
                                    <p>Dependemos del talento individual.</p>
                                </div>
                                <div className="option-card" onClick={() => selectOption('variability_pain', 'Poca variabilidad')}>
                                    <h3>Poca variabilidad</h3>
                                    <p>Hay cierta consistencia.</p>
                                </div>
                                <div className="option-card" onClick={() => selectOption('variability_pain', 'No, hay estándar total')}>
                                    <h3>Estándar total</h3>
                                    <p>No hay diferencia detectable.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 5 && (
                        <div className="step-content fade-in">
                            <span className="step-indicator">Paso 5: Presupuesto</span>
                            <h2>Cualificación de Inversión</h2>
                            <p>Rango de presupuesto estimado para formar instructores:</p>
                            <div className="option-grid">
                                <div className="option-pill" onClick={() => selectOption('budget_range', '<$25k')}>Menos de $25k</div>
                                <div className="option-pill" onClick={() => selectOption('budget_range', '$25-50k')}>$25k - $50k</div>
                                <div className="option-pill" onClick={() => selectOption('budget_range', '$50-150k')}>$50k - $150k</div>
                                <div className="option-pill" onClick={() => selectOption('budget_range', '$150k+')}>Más de $150k</div>
                            </div>
                        </div>
                    )}

                    {step === 6 && (
                        <div className="step-content fade-in">
                            <span className="step-indicator">Contacto Empresarial</span>
                            <h2>¿A dónde enviamos tu Auditoría IA?</h2>
                            <div className="form-group">
                                <label>Empresa</label>
                                <input type="text" name="company_name" placeholder="Empresa S.A." value={formData.company_name} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Tu Nombre</label>
                                <input type="text" name="contact_name" placeholder="Gloria Alba" value={formData.contact_name} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Correo Corporativo</label>
                                <input type="email" name="email" placeholder="gloria@empresa.com" value={formData.email} onChange={handleChange} />
                            </div>
                            <div className="wizard-footer">
                                <button className="back-link" onClick={prevStep}><ChevronLeft /> Volver</button>
                                <button className="cta-button brand-gradient large" disabled={!formData.contact_name || !formData.email || loading} onClick={handleSubmit}>
                                    {loading ? 'Consultando IA...' : 'Obtener Auditoría Senior'}
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 7 && report && (
                        <div className="step-content result-view fade-in">
                            <div className="success-header">
                                <CheckCircle2 className="success-icon" />
                                <h2>¡Auditoría de Madurez Lista!</h2>
                            </div>
                            <div className="report-container">
                                <div className="report-content" dangerouslySetInnerHTML={{ __html: report.replace(/\n/g, '<br/>') }}></div>
                            </div>
                            <div className="next-steps-box">
                                <h3>💡 Plan de Acción Sugerido:</h3>
                                <div className="action-buttons">
                                    <button className="cta-button brand-gradient" onClick={() => {
                                        AnalyticsService.logEvent('click_booking');
                                        window.open(getBookingsLink(), '_blank');
                                    }}>
                                        <Calendar /> Agendar Sesión de Resultados (30 min)
                                    </button>
                                    <button className="cta-button outline" onClick={() => window.print()}>
                                        <Download /> Guardar como PDF
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DiagnosticoRH;
