import React from 'react';
import './Trust.css';

const Trust: React.FC = () => {
    return (
        <section className="trust-section">
            <div className="trust-container">
                <div className="trust-content">
                    <h2 className="trust-title">Ruta Formal de Certificación</h2>
                    <p className="trust-subtitle">
                        Desarrollamos procesos fundamentados en evidencia e instrumentos defendibles, 
                        estrictamente alineados a estándares de competencia.
                    </p>
                </div>

                <div className="trust-features">
                    <div className="trust-feature">
                        <span className="feature-check">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </span>
                        <div className="feature-text">
                            <strong>Alineación a Estándares de Competencia</strong>
                            <span>Estructura curricular y evaluaciones congruentes con normativas formales.</span>
                        </div>
                    </div>
                    
                    <div className="trust-feature">
                        <span className="feature-check">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </span>
                        <div className="feature-text">
                            <strong>Instrumentos Defendibles</strong>
                            <span>Rúbricas, guías de observación y listas de cotejo auditables y medibles.</span>
                        </div>
                    </div>
                    
                    <div className="trust-feature">
                        <span className="feature-check">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </span>
                        <div className="feature-text">
                            <strong>Procesos Fundamentados en Evidencia</strong>
                            <span>Portafolio de evidencias 100% trazable y validación del retorno de aprendizaje.</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Trust;
