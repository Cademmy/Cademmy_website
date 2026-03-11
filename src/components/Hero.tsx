import React from 'react';
import { useUser } from '../context/UserContext';
import './Hero.css';

const Hero: React.FC = () => {
    const { userType } = useUser();

    const content = {
        none: {
            title: "Certifícate con validez oficial en México y el mundo",
            subtitle: "Potenciamos tu crecimiento profesional con educación 5.0, certificaciones CONOCER y tecnología de vanguardia.",
            cta1: "Explorar Certificaciones",
            cta2: "Catálogo 2026"
        },
        professional: {
            title: "Eleva tu Perfil Profesional al Nivel 5.0",
            subtitle: "Obtén certificaciones oficiales que validan tu experiencia. Conviértete en el experto que las empresas buscan hoy.",
            cta1: "Mis Certificaciones",
            cta2: "Ruta de Carrera"
        },
        company: {
            title: "Estandarización y ROI para tu Capital Humano",
            subtitle: "Garantiza consistencia operativa y calidad educativa en tu organización con nuestro modelo de Formación 5.0.",
            cta1: "Soluciones B2B",
            cta2: "Mapa de KPI"
        }
    };

    const activeContent = userType === 'none' ? content.none : (userType === 'professional' ? content.professional : content.company);

    return (
        <section key={userType} className={`hero-section profile-${userType}`}>
            <div className="hero-content animate-fade-in">
                <h1 className="hero-title">{activeContent.title}</h1>
                <p className="hero-subtitle">{activeContent.subtitle}</p>
                <div className="hero-actions">
                    <button className="cta-button secondary">{activeContent.cta1}</button>
                    <button className="cta-button primary-outline">{activeContent.cta2}</button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
