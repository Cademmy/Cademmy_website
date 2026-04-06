import React from 'react';
import './Pillars.css';

const Icons = {
    Instructor: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
    Consult: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>,
    IA: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>,
    Evidencia: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
};

const Pillars: React.FC = () => {
    const pillars = [
        {
            id: 'instructor',
            title: 'Capacitación e Instructor 4.0',
            description: 'Estandariza a tus formadores internos o certifícate profesionalmente bajo metodologías de alto rendimiento.',
            icon: <Icons.Instructor />
        },
        {
            id: 'consult',
            title: 'Consultoría B2B',
            description: 'Diseño de rutas de aprendizaje, procesos formativos escalables y optimización corporativa.',
            icon: <Icons.Consult />
        },
        {
            id: 'ia',
            title: 'Inteligencia Artificial Útil',
            description: 'Integración de IA generativa para acelerar el diseño instruccional y automatizar rúbricas formativas.',
            icon: <Icons.IA />
        },
        {
            id: 'evidencia',
            title: 'Ruta y Estándares',
            description: 'Construye portafolios defendibles y traza rutas respaldadas por el rigor metodológico.',
            icon: <Icons.Evidencia />
        }
    ];

    return (
        <section className="pillars-section">
            <div className="pillars-container">
                <div className="section-header">
                    <div className="header-left">
                        <h2>El Ecosistema Formador 4.0</h2>
                    </div>
                    <div className="header-right">
                        <p>Nuestros ejes aseguran una formación práctica, medible y orientada a resultados reales.</p>
                    </div>
                </div>
                
                <div className="pillars-grid">
                    {pillars.map((p) => (
                        <div key={p.id} className="pillar-card group">
                            <div className="pillar-icon">
                                {p.icon}
                            </div>
                            <h3>{p.title}</h3>
                            <p>{p.description}</p>
                            <span className="pillar-link">Explorar módulo →</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pillars;
