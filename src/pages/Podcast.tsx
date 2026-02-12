import React from 'react';
import './Podcast.css';

interface Episode {
    id: string;
    title: string;
    duration: string;
    date: string;
    description: string;
    spotifyUrl: string;
    youtubeUrl: string;
    tags: string[];
}

const episodes: Episode[] = [
    {
        id: '1',
        title: "Tendencias clave en capacitación para empresas en 2025",
        duration: "24:15",
        date: "Enero 2026",
        description: "Analizamos las brechas de habilidades actuales y cómo las empresas líderes se están adaptando al nuevo panorama laboral.",
        spotifyUrl: "#",
        youtubeUrl: "#",
        tags: ["Tendencias", "B2B", "Estrategia"]
    },
    {
        id: '2',
        title: "IA y personalización en la capacitación empresarial",
        duration: "18:40",
        date: "Enero 2026",
        description: "¿Cómo las tecnologías inmersivas y la IA están personalizando la ruta de aprendizaje de cada colaborador?",
        spotifyUrl: "#",
        youtubeUrl: "#",
        tags: ["IA", "Tecnología", "Innovación"]
    },
    {
        id: '3',
        title: "Certificaciones laborales: Cómo diferenciar tu oferta",
        duration: "21:10",
        date: "Febrero 2026",
        description: "La importancia de las certificaciones CONOCER como respaldo de calidad y diferenciador en mercados saturados.",
        spotifyUrl: "#",
        youtubeUrl: "#",
        tags: ["Certificaciones", "CONOCER", "Valor"]
    }
];

const Podcast: React.FC = () => {
    return (
        <div className="podcast-page">
            <header className="podcast-hero">
                <div className="container">
                    <span className="pre-title">Podcast Cademmy</span>
                    <h1>Aprendizaje Disruptivo</h1>
                    <p>Tu dosis semanal de innovación, tendencias y estrategias de capacitación para el mundo 4.0.</p>
                    <div className="platforms">
                        <span>Escúchanos en:</span>
                        <div className="platform-badges">
                            <div className="badge spotify">Spotify</div>
                            <div className="badge apple">Apple Podcasts</div>
                            <div className="badge youtube">YouTube</div>
                        </div>
                    </div>
                </div>
            </header>

            <section className="episodes-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Episodios Recientes</h2>
                        <div className="search-filter">
                            <input type="text" placeholder="Buscar temas..." />
                        </div>
                    </div>

                    <div className="episodes-grid">
                        {episodes.map(eps => (
                            <div key={eps.id} className="episode-card">
                                <div className="episode-content">
                                    <div className="episode-meta">
                                        <span>{eps.date}</span>
                                        <span>•</span>
                                        <span>{eps.duration}</span>
                                    </div>
                                    <h3>{eps.title}</h3>
                                    <p>{eps.description}</p>
                                    <div className="episode-tags">
                                        {eps.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                                    </div>
                                    <div className="episode-actions">
                                        <button className="play-btn">
                                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                            Escuchar ahora
                                        </button>
                                        <div className="external-links">
                                            <a href={eps.spotifyUrl} title="Escuchar en Spotify">S</a>
                                            <a href={eps.youtubeUrl} title="Ver en YouTube">Y</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="subscribe-banner container">
                <div className="banner-content">
                    <h2>No te pierdas ningún episodio</h2>
                    <p>Únete a nuestra comunidad de más de 5,000 líderes en educación.</p>
                    <form className="subscribe-form">
                        <input type="email" placeholder="Tu correo electrónico" />
                        <button type="submit">Suscribirme</button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Podcast;
