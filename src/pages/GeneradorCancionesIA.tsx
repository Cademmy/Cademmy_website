import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import './GeneradorCancionesIA.css';
import { generateSongIA } from '../services/AIService';

interface SongGenerationResult {
    title: string;
    description: string;
    audioUrl: string;
    mood: string;
    format: string;
    lyrics?: string;
    voice?: string;
}

const GeneradorCancionesIA: React.FC = () => {
    const [step, setStep] = useState(1);
    const [generating, setGenerating] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [result, setResult] = useState<SongGenerationResult | null>(null);
    const [isSaved, setIsSaved] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [audio] = useState(new Audio());
    const [formData, setFormData] = useState({
        mood: '',
        objective: '',
        duration: 'Short',
        format: 'Armonía',
        voice: 'Mujer'
    });

    const handleGenerate = async () => {
        setGenerating(true);
        setIsSaved(false);
        setIsPlaying(false);
        setError(null);
        audio.pause();

        const response = await generateSongIA(formData);

        if (response.success && response.data) {
            const { title, description, audioUrl, lyrics } = response.data;

            setResult({
                title,
                description,
                audioUrl,
                mood: formData.mood,
                format: formData.format,
                lyrics,
                voice: formData.voice
            });

            audio.src = audioUrl;
            setStep(3);
        } else {
            setError(response.error || "Ocurrió un error inesperado al generar la música.");
        }

        setGenerating(false);
    };

    const saveToLibrary = () => {
        if (!result) return;

        const generatedTracks = JSON.parse(localStorage.getItem('generatedTracks') || '[]');
        const newTrack = {
            id: `gen-${Date.now()}`,
            title: result.title,
            category: result.mood === 'Enérgico' ? 'Motivación' : (result.mood === 'Enfocado' ? 'Concentración' : 'Creatividad'),
            duration: "03:00",
            description: `[Generada por IA] ${result.description}`,
            audioUrl: result.audioUrl,
            isGenerated: true,
            lyrics: result.lyrics,
            format: result.format
        };

        localStorage.setItem('generatedTracks', JSON.stringify([...generatedTracks, newTrack]));
        setIsSaved(true);
    };

    const reset = () => {
        audio.pause();
        setStep(1);
        setResult(null);
        setGenerating(false);
        setIsPlaying(false);
        setIsSaved(false);
    };

    const togglePlay = () => {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play().catch((e: Error) => console.log("Audio play failed:", e));
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="ia-tool-page">
            <Helmet>
                <title>Generador de Canciones IA | Cademmy</title>
                <meta name="description" content="Prototipo de IA para generar música corporativa personalizada para tus capacitaciones." />
            </Helmet>

            <section className="ia-hero">
                <div className="container">
                    <span className="badge">Prototipo Beta</span>
                    <h1>Generador de Canciones <span className="text-gradient">Corporativas IA</span></h1>
                    <p>Personaliza la atmósfera de tus eventos y cursos con música compuesta específicamente para tus objetivos pedagógicos.</p>
                </div>
            </section>

            <section className="ia-tool-container container">
                <div className="tool-card">
                    {step === 1 && (
                        <div className="tool-step">
                            <h2>1. Define el ambiente</h2>
                            <p>¿Qué emoción quieres transmitir en tu sesión?</p>
                            <div className="mood-grid">
                                {['Enérgico', 'Enfocado', 'Relajado', 'Creativo', 'Solemne'].map(mood => (
                                    <button
                                        key={mood}
                                        className={`mood-btn ${formData.mood === mood ? 'active' : ''}`}
                                        onClick={() => setFormData({ ...formData, mood })}
                                    >
                                        {mood}
                                    </button>
                                ))}
                            </div>
                            <button
                                className="btn-primary"
                                disabled={!formData.mood}
                                onClick={() => setStep(2)}
                            >
                                Siguiente
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="tool-step">
                            <h2>2. Objetivo y Duración</h2>
                            <div className="form-group">
                                <label>Objetivo de la dinámica</label>
                                <textarea
                                    placeholder="Ej: Rompehielo para equipo de tecnología, cierre de convención anual..."
                                    value={formData.objective}
                                    onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Duración estimada</label>
                                <select
                                    value={formData.duration}
                                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                >
                                    <option value="Short">Corta (2-3 min)</option>
                                    <option value="Medium">Media (5-10 min)</option>
                                    <option value="Long">Ambiente (Loop continuo)</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Tipo de Recurso</label>
                                <div className="format-selector">
                                    {['Armonía', 'Pista', 'Canción'].map(format => (
                                        <button
                                            key={format}
                                            className={`format-btn ${formData.format === format ? 'active' : ''}`}
                                            onClick={() => setFormData({ ...formData, format })}
                                        >
                                            {format}
                                        </button>
                                    ))}
                                </div>
                                <p className="help-text">
                                    {formData.format === 'Armonía' && "Solo instrumentos de ambiente."}
                                    {formData.format === 'Pista' && "Ritmos marcados sin letra."}
                                    {formData.format === 'Canción' && "Música con letra y voz IA."}
                                </p>
                            </div>

                            {formData.format === 'Canción' && (
                                <div className="form-group animate-fade-in">
                                    <label>Voz del Intérprete IA</label>
                                    <div className="voice-selector">
                                        {['Mujer', 'Hombre'].map(voice => (
                                            <button
                                                key={voice}
                                                className={`voice-btn ${formData.voice === voice ? 'active' : ''}`}
                                                onClick={() => setFormData({ ...formData, voice })}
                                            >
                                                <span className="icon">{voice === 'Mujer' ? '👩' : '👨'}</span>
                                                {voice}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div className="btn-group">
                                <button className="btn-secondary" onClick={() => setStep(1)}>Atrás</button>
                                <button
                                    className="btn-primary"
                                    disabled={!formData.objective || generating}
                                    onClick={handleGenerate}
                                >
                                    {generating ? 'Componiendo...' : 'Generar Música'}
                                </button>
                            </div>
                            {error && <p className="error-message">{error}</p>}
                        </div>
                    )}

                    {step === 3 && result && (
                        <div className="tool-result">
                            <div className="result-header">
                                <div className="status-badge success">¡Música Cantada Generada!</div>
                                <h2>{result.title}</h2>
                                <div className="result-meta">
                                    <p className="mood-tag">Mood: {result.mood}</p>
                                    {result.format === 'Canción' && (
                                        <p className="voice-tag">Voz: {result.voice}</p>
                                    )}
                                </div>
                            </div>
                            <div className="player-mock">
                                <div className="player-controls">
                                    <button className="play-btn" onClick={togglePlay}>
                                        {isPlaying ? '⏸' : '▶'}
                                    </button>
                                    <div className="progress-bar">
                                        <div className="progress" style={{ width: isPlaying ? '100%' : '60%', transition: 'width 2s linear' }}></div>
                                    </div>
                                    <span className="time">{isPlaying ? '03:00' : '01:45'} / 03:00</span>
                                </div>
                            </div>
                            <p className="description">{result.description}</p>

                            {result.format === 'Canción' && result.lyrics && (
                                <div className="lyrics-box">
                                    <h3>Letra Generada</h3>
                                    <pre>{result.lyrics}</pre>
                                </div>
                            )}
                            <div className="btn-group">
                                <button className="btn-secondary" onClick={reset}>Crear Otra</button>
                                <button
                                    className={`btn-primary ${isSaved ? 'btn-success' : ''}`}
                                    onClick={saveToLibrary}
                                    disabled={isSaved}
                                >
                                    {isSaved ? '✓ Guardada en Librería' : 'Guardar en Librería'}
                                </button>
                                <button className="btn-primary">Descargar WAV</button>
                            </div>
                            {isSaved && (
                                <p style={{ marginTop: '1rem', color: '#2e7d32', fontWeight: 'bold' }}>
                                    ¡Listo! Ahora puedes encontrar esta pista en el menú Recursos &gt; Música Corporativa IA.
                                </p>
                            )}
                        </div>
                    )}

                    {generating && (
                        <div className="loading-overlay">
                            <div className="loader"></div>
                            <div className="loading-steps">
                                <p className="animate-pulse">Arrastrando patrones armónicos...</p>
                                {formData.format === 'Canción' && (
                                    <p className="animate-pulse" style={{ animationDelay: '1s' }}>
                                        Sintetizando voz de {formData.voice} con redes neuronales...
                                    </p>
                                )}
                                <p className="animate-pulse" style={{ animationDelay: '2s' }}>Finalizando masterización digital...</p>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <section className="ia-info container">
                <div className="info-grid">
                    <div className="info-item">
                        <h3>¿Cómo funciona?</h3>
                        <p>Nuestros modelos de IA han sido entrenados con miles de pistas de música corporativa y psicológica para entender qué frecuencias y ritmos potencian mejor el aprendizaje y la retención.</p>
                    </div>
                    <div className="info-item">
                        <h3>Derechos de Autor</h3>
                        <p>Al generar música con Cademmy IA, obtienes una licencia de uso perpetua para tus capacitaciones internas, sin preocuparte por regalías.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default GeneradorCancionesIA;
