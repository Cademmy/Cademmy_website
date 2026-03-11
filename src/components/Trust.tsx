import { useUser } from '../context/UserContext';

const Trust: React.FC = () => {
    const { userType } = useUser();

    const content = {
        none: {
            title: "Respaldado por los Mejores",
            subtitle: "Alianzas estratégicas que aseguran la calidad de nuestra formación.",
            ctaTitle: "¿Listo para transformar tu futuro?",
            ctaText: "Únete a la comunidad de aprendizaje más innovadora de México.",
            ctaLabel: "Hablar con un Asesor"
        },
        professional: {
            title: "Tu Talento, Respaldado Globalmente",
            subtitle: "Certificaciones con validez oficial ante la SEP y reconocimiento internacional.",
            ctaTitle: "¿Estás listo para el siguiente nivel?",
            ctaText: "Empieza hoy tu camino hacia una certificación de excelencia.",
            ctaLabel: "Iniciar mi Ruta"
        },
        company: {
            title: "Confianza Institucional",
            subtitle: "Soluciones de capital humano validadas por las organizaciones más exigentes.",
            ctaTitle: "¿Buscas consistencia operativa?",
            ctaText: "Agendemos una sesión estratégica para diagnosticar tus necesidades.",
            ctaLabel: "Solicitar Diagnóstico"
        }
    };

    const activeContent = userType === 'none' ? content.none : (userType === 'professional' ? content.professional : content.company);

    return (
        <section className={`trust-section profile-${userType}`}>
            <div className="trust-content animate-fade-in">
                <h2>{activeContent.title}</h2>
                <p>{activeContent.subtitle}</p>

                <div className="partners-placeholder">
                    <div className="partner-item">Partner Microsoft Education</div>
                    <div className="partner-item">Aliado BBVA</div>
                    <div className="partner-item">Respaldo BID</div>
                </div>

                <div className="final-cta">
                    <h3>{activeContent.ctaTitle}</h3>
                    <p>{activeContent.ctaText}</p>
                    <button className="cta-button brand-gradient">{activeContent.ctaLabel}</button>
                </div>
            </div>
        </section>
    );
};

export default Trust;
