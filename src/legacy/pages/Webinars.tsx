import React from 'react';
import './Webinars.css';

interface Webinar {
    id: string;
    title: string;
    date: string;
    time: string;
    speaker: string;
    description: string;
    status: 'Proximo' | 'Grabado';
}

const webinars: Webinar[] = [
    {
        id: '1',
        title: "Transformando la capacitación empresarial con innovación tecnológica",
        date: "25 de Febrero, 2026",
        time: "10:00 AM (CDMX)",
        speaker: "Equipo Académico Cademmy",
        description: "Cierra la brecha de habilidades con estrategias de IA y metodologías inmersivas.",
        status: 'Proximo'
    },
    {
        id: '2',
        title: "Cerrando brechas de habilidades con certificaciones oficiales",
        date: "12 de Marzo, 2026",
        time: "11:00 AM (CDMX)",
        speaker: "Dirección de Innovación",
        description: "Cómo justificar el ROI de la capacitación ante la dirección general.",
        status: 'Proximo'
    }
];

const Webinars: React.FC = () => {
    return (
        <div className="webinars-page">
            <header className="webinars-hero">
                <div className="container">
                    <span className="live-label">Cademmy Live Sessions</span>
                    <h1>Webinars Exclusivos</h1>
                    <p>Conéctate con expertos y descubre las tendencias que están redefiniendo la educación disruptiva en México.</p>
                </div>
            </header>

            <section className="upcoming-webinars">
                <div className="container">
                    <h2 className="section-title">Próximos Eventos</h2>
                    <div className="webinars-list">
                        {webinars.map(wb => (
                            <div key={wb.id} className="webinar-card">
                                <div className="webinar-date-box">
                                    <span className="date-num">{wb.date.split(' ')[0]}</span>
                                    <span className="date-month">{wb.date.split(' ')[2]}</span>
                                </div>
                                <div className="webinar-details">
                                    <div className="webinar-meta">
                                        <span className="speaker">🎤 {wb.speaker}</span>
                                        <span className="time">⏰ {wb.time}</span>
                                    </div>
                                    <h3>{wb.title}</h3>
                                    <p>{wb.description}</p>
                                    <button className="register-btn">Asegurar mi lugar</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="recorded-sessions container">
                <div className="recorded-hero">
                    <div className="hero-text">
                        <h2>Sesiones Grabadas</h2>
                        <p>Accede a nuestra biblioteca de webinars anteriores y aprende a tu propio ritmo.</p>
                        <button className="cta-button outline-white-btn" style={{ border: '2px solid white', color: 'white', background: 'transparent', padding: '1rem 2rem', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' }}>Explorar Biblioteca</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Webinars;
