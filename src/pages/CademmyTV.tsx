import React from 'react';
import './CademmyTV.css';

interface Video {
    id: string;
    title: string;
    thumbnail: string;
    category: string;
    duration: string;
}

const videos: Video[] = [
    {
        id: '1',
        title: "¿Cómo las tecnologías inmersivas personalizan la capacitación?",
        thumbnail: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&q=80&w=800",
        category: "Tutorial",
        duration: "12:45"
    },
    {
        id: '2',
        title: "Explicación sobre las certificaciones avaladas por CONOCER",
        thumbnail: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
        category: "Informativo",
        duration: "08:20"
    },
    {
        id: '3',
        title: "El futuro de la Realidad Virtual en el aula empresarial",
        thumbnail: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&q=80&w=800",
        category: "Webinar",
        duration: "45:00"
    },
    {
        id: '4',
        title: "Integrando certificaciones en programas de capacitación",
        thumbnail: "https://images.unsplash.com/photo-1454165833767-027ff33027ef?auto=format&fit=crop&q=80&w=800",
        category: "Masterclass",
        duration: "15:30"
    }
];

const CademmyTV: React.FC = () => {
    return (
        <div className="tv-page">
            <header className="tv-hero">
                <div className="container">
                    <div className="hero-content">
                        <span className="live-badge">En Vivo</span>
                        <h1>Cademmy TV</h1>
                        <p>Contenido visual experto para líderes en educación y capacitación corporativa.</p>
                        <button className="cta-button primary-orange">Ver canal en YouTube</button>
                    </div>
                </div>
            </header>

            <section className="video-explorer">
                <div className="container">
                    <div className="filter-bar">
                        <button className="filter-chip active">Todos</button>
                        <button className="filter-chip">Tutoriales</button>
                        <button className="filter-chip">Webinars</button>
                        <button className="filter-chip">Certificaciones</button>
                    </div>

                    <div className="video-grid">
                        {videos.map(video => (
                            <div key={video.id} className="video-card">
                                <div className="thumbnail-container">
                                    <img src={video.thumbnail} alt={video.title} />
                                    <span className="duration">{video.duration}</span>
                                    <div className="play-overlay">
                                        <div className="play-icon">▶</div>
                                    </div>
                                </div>
                                <div className="video-info">
                                    <span className="category">{video.category}</span>
                                    <h3>{video.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="featured-series">
                <div className="container">
                    <div className="series-banner">
                        <div className="series-text">
                            <h2>Serie: Formador 4.0</h2>
                            <p>Domina las herramientas digitales y metodologías inmersivas para transformar tus clases en experiencias inolvidables.</p>
                            <button className="cta-button white-btn">Explorar Serie</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CademmyTV;
