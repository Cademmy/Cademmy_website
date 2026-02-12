import React from 'react';
import './KitsDinamicas.css';

interface Kit {
    id: string;
    title: string;
    category: string;
    description: string;
    items: string[];
    image: string;
}

const kits: Kit[] = [
    {
        id: '1',
        title: "Kit de Liderazgo Disruptivo",
        category: "Habilidades Blandas",
        description: "5 dinámicas de grupo diseñadas para fomentar la agilidad y la toma de decisiones en entornos inciertos.",
        items: ["Guía de facilitador", "Tarjetas de rol (PDF)", "Pista de música IA"],
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: '2',
        title: "Comunicación 4.0",
        category: "Productividad",
        description: "Herramientas para alinear equipos remotos y mejorar el flujo de información en la organización.",
        items: ["Plantilla de feedback", "Matriz de comunicación", "Video introductorio"],
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: '3',
        title: "Kit de Resolución de Conflictos",
        category: "Clima Organizacional",
        description: "Método práctico para desactivar tensiones y transformar el conflicto en oportunidad creativa.",
        items: ["Protocolo de actuación", "Casos de estudio", "Escala de mediación"],
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800"
    }
];

const KitsDinamicas: React.FC = () => {
    return (
        <div className="kits-page">
            <header className="kits-hero brand-gradient">
                <div className="container">
                    <span className="hero-tag">Recursos Gratuitos para RH</span>
                    <h1>Kits de Dinámicas de Grupo</h1>
                    <p>Potencia tus sesiones de capacitación con material listo para usar, diseñado por expertos en pedagogía empresarial.</p>
                </div>
            </header>

            <section className="kits-explorer">
                <div className="container">
                    <div className="kits-grid">
                        {kits.map(kit => (
                            <div key={kit.id} className="kit-card">
                                <div className="kit-image">
                                    <img src={kit.image} alt={kit.title} />
                                    <span className="kit-badge">{kit.category}</span>
                                </div>
                                <div className="kit-content">
                                    <h3>{kit.title}</h3>
                                    <p>{kit.description}</p>
                                    <div className="kit-includes">
                                        <strong>Incluye:</strong>
                                        <ul>
                                            {kit.items.map((item, idx) => <li key={idx}>• {item}</li>)}
                                        </ul>
                                    </div>
                                    <button className="download-cta">Descargar Kit Gratis</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="b2b-lead-capture container">
                <div className="capture-card">
                    <div className="capture-text">
                        <h2>¿Necesitas algo a la medida?</h2>
                        <p>Creamos dinámicas y materiales personalizados según los retos específicos de tu empresa.</p>
                        <button className="cta-button primary-orange">Hablar con un experto</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default KitsDinamicas;
