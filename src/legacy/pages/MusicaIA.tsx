import React, { useState, useEffect } from 'react';
import './MusicaIA.css';

interface MusicTrack {
    id: string;
    title: string;
    category: 'Creatividad' | 'Concentración' | 'Motivación';
    duration: string;
    description: string;
    audioUrl: string;
    isGenerated?: boolean;
    lyrics?: string;
    format?: string;
}

const defaultTracks: MusicTrack[] = [
    {
        id: '1',
        title: "Innovación Cuántica",
        category: 'Creatividad',
        duration: "05:20",
        description: "Compuesta por IA para sesiones de lluvia de ideas y generación de conceptos disruptivos.",
        audioUrl: "#"
    },
    {
        id: '2',
        title: "Deep Focus 4.0",
        category: 'Concentración',
        duration: "08:45",
        description: "Frecuencias diseñadas para minimizar distracciones durante talleres técnicos intensivos.",
        audioUrl: "#"
    },
    {
        id: '3',
        title: "Vibración de Liderazgo",
        category: 'Motivación',
        duration: "04:15",
        description: "Ritmos energéticos para dinámicas de grupo y cierres de alto impacto.",
        audioUrl: "#"
    },
    {
        id: '4',
        title: "Resonancia Colaborativa",
        category: 'Creatividad',
        duration: "06:10",
        description: "Armonías que fomentan la alineación y el trabajo en equipo en dinámicas disruptivas.",
        audioUrl: "#"
    }
];

const MusicaIA: React.FC = () => {
    const [allTracks, setAllTracks] = useState<MusicTrack[]>(defaultTracks);
    const [filter, setFilter] = useState('Todas');
    const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null);
    const [audio] = useState(new Audio());

    useEffect(() => {
        const generated = JSON.parse(localStorage.getItem('generatedTracks') || '[]');
        const updatedDefaultTracks = defaultTracks.map(t => ({
            ...t,
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" // Mock CDN url
        }));
        setAllTracks([...updatedDefaultTracks, ...generated]);
    }, []);

    const toggleTrack = (track: MusicTrack) => {
        if (currentPlayingId === track.id) {
            audio.pause();
            setCurrentPlayingId(null);
        } else {
            audio.src = track.audioUrl.startsWith('http') ? track.audioUrl : "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3";
            audio.play().catch(e => console.log("Playback error:", e));
            setCurrentPlayingId(track.id);
        }
    };

    const filteredTracks = filter === 'Todas'
        ? allTracks
        : allTracks.filter(t => t.category === filter);

    return (
        <div className="musica-ia-page">
            <header className="musica-hero">
                <div className="container">
                    <span className="premium-label">Exclusivo Cademmy</span>
                    <h1>Librería de Música Corporativa IA</h1>
                    <p>Música adaptada específicamente para escenarios de capacitación empresarial, diseñada para potenciar el aprendizaje y la creatividad.</p>
                </div>
            </header>

            <section className="library-section">
                <div className="container">
                    <div className="category-filters">
                        {['Todas', 'Creatividad', 'Concentración', 'Motivación'].map(cat => (
                            <button
                                key={cat}
                                className={`category-btn ${filter === cat ? 'active' : ''}`}
                                onClick={() => setFilter(cat)}
                            >
                                {cat === 'Todas' ? 'Todas las pistas' : cat}
                            </button>
                        ))}
                    </div>

                    <div className="tracks-list">
                        {filteredTracks.map(track => (
                            <div key={track.id} className={`track-row ${track.isGenerated ? 'generated-track' : ''}`}>
                                <div className="track-play">
                                    <button
                                        className={`play-circle ${currentPlayingId === track.id ? 'playing' : ''}`}
                                        onClick={() => toggleTrack(track)}
                                    >
                                        {currentPlayingId === track.id ? '⏸' : '▶'}
                                    </button>
                                </div>
                                <div className="track-info">
                                    <div className="track-header">
                                        <div className="track-title-row">
                                            <h3>{track.title}</h3>
                                            <div className="track-badges">
                                                {track.isGenerated && <span className="user-badge">Tu Creación</span>}
                                                <span className={`category-tag ${track.category.toLowerCase()}`}>{track.category}</span>
                                                {track.voice && (
                                                    <span className="voice-badge">Voz: {track.voice}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <p>{track.description}</p>
                                    {track.lyrics && (
                                        <details className="lyrics-details">
                                            <summary>Ver Letra</summary>
                                            <pre>{track.lyrics}</pre>
                                        </details>
                                    )}
                                </div>
                                <div className="track-meta">
                                    <span>{track.duration}</span>
                                    <button className="download-btn" title="Descargar como cliente Premium">
                                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"></path>
                                            <polyline points="7 10 12 15 17 10"></polyline>
                                            <line x1="12" y1="15" x2="12" y2="3"></line>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                        {filteredTracks.length === 0 && (
                            <div className="no-results">
                                <p>No hay pistas en esta categoría todavía.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section className="differentiation container">
                <div className="diff-card">
                    <h2>¿Por qué música IA para empresas?</h2>
                    <div className="diff-grid">
                        <div className="item">
                            <h4>Contexto Especializado</h4>
                            <p>Diseñada para escenarios de capacitación, algo que las apps genéricas no ofrecen.</p>
                        </div>
                        <div className="item">
                            <h4>Integración Total</h4>
                            <p>Combina estas pistas con nuestras guías y dinámicas para una experiencia 360°.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MusicaIA;
