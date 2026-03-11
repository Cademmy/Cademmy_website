import React, { useState, useEffect } from 'react';
import './NeuroPlayer.css';

interface NeuroPlayerProps {
    videoUrl: string;
    title: string;
    onCompleted?: () => void;
}

const NeuroPlayer: React.FC<NeuroPlayerProps> = ({ videoUrl, title, onCompleted }) => {
    const [mood, setMood] = useState<'focus' | 'relax' | 'creative'>('focus');
    const [bgVolume, setBgVolume] = useState(0.2);

    // En una implementación real, aquí se controlaría el AudioContext 
    // o un elemento <audio> persistente del MusicService.
    useEffect(() => {
        console.log(`Cambiando ambiente sonoro a: ${mood}`);
    }, [mood]);

    const getEmbedUrl = (url: string) => {
        if (!url) return '';

        // YouTube detection
        const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/);
        if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=0&rel=0`;

        // Vimeo detection
        const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
        if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;

        return url;
    };

    const isDirectVideo = (url: string) => {
        return url.match(/\.(mp4|webm|ogg)$/i) || url.includes('firebasestorage.googleapis.com');
    };

    const renderVideo = () => {
        const embedUrl = getEmbedUrl(videoUrl);

        if (isDirectVideo(videoUrl)) {
            return (
                <video
                    controls
                    className="native-video-player"
                    onEnded={onCompleted}
                >
                    <source src={videoUrl} type="video/mp4" />
                    Tu navegador no soporta el elemento de video.
                </video>
            );
        }

        return (
            <iframe
                src={embedUrl}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        );
    };

    return (
        <div className="neuro-player-container">
            <div className="main-stage">
                <div className="video-wrapper">
                    {renderVideo()}
                </div>

                <div className="neuro-controls glass-morphism">
                    <div className="mood-selector">
                        <span>Estado de Ánimo:</span>
                        <div className="mood-btns">
                            <button
                                className={`mood-btn ${mood === 'focus' ? 'active' : ''}`}
                                onClick={() => setMood('focus')}
                            >
                                🎯 Foco
                            </button>
                            <button
                                className={`mood-btn ${mood === 'relax' ? 'active' : ''}`}
                                onClick={() => setMood('relax')}
                            >
                                🧘 Relajación
                            </button>
                            <button
                                className={`mood-btn ${mood === 'creative' ? 'active' : ''}`}
                                onClick={() => setMood('creative')}
                            >
                                💡 Creatividad
                            </button>
                        </div>
                    </div>

                    <div className="volume-control">
                        <span>Música de Enfoque:</span>
                        <input
                            type="range"
                            min="0" max="1" step="0.1"
                            value={bgVolume}
                            onChange={(e) => setBgVolume(parseFloat(e.target.value))}
                        />
                    </div>

                    <button className="complete-btn brand-gradient" onClick={onCompleted}>
                        Marcar como completada ✔️
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NeuroPlayer;
