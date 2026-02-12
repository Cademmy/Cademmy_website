import React, { useState } from 'react';
import './CoursePages.css';
import { MusicService } from '../services/musicService';
import { AuthService } from '../services/authService';

const IAMusicLab: React.FC = () => {
    // Estado del Muro de Leads
    const [isIdentified, setIsIdentified] = useState(() => {
        return localStorage.getItem('cademmy_lead_captured') === 'true';
    });
    const [leadData, setLeadData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        position: '',
        objective: 'Uso Educativo / Académico',
        isDecisionMaker: false
    });
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const handleLeadSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (leadData.name && leadData.email && leadData.phone) {
            setIsLoggingIn(true);
            try {
                // Registrar perfil en Firestore
                await AuthService.saveLeadProfile('anonymous_lead_' + Date.now(), leadData);
                setIsIdentified(true);
                console.log("Lead Capturado Elite (HubSpot Ready):", leadData);
            } catch (error) {
                alert("Error al guardar el perfil. Intenta de nuevo.");
            } finally {
                setIsLoggingIn(false);
            }
        } else {
            alert("Por favor, completa los campos requeridos (Nombre, Email y Teléfono).");
        }
    };

    const handleSocialLogin = async (provider: string) => {
        setIsLoggingIn(true);
        try {
            let user;
            if (provider === 'Google') user = await AuthService.loginWithGoogle();
            else if (provider === 'Microsoft') user = await AuthService.loginWithMicrosoft();
            else if (provider === 'Apple') user = await AuthService.loginWithApple();

            if (user) {
                console.log(`Login exitoso con ${provider}:`, user.email);
                setIsIdentified(true);
                localStorage.setItem('cademmy_lead_captured', 'true');
            }
        } catch (error: any) {
            let userMessage = error.message;
            if (error.code === 'auth/configuration-not-found') {
                userMessage = `El proveedor "${provider}" aún no está habilitado en tu consola de Firebase. Debes activarlo manualmente para que funcione.`;
            }
            alert(`Error de conexión con ${provider}: ${userMessage}`);
        } finally {
            setIsLoggingIn(false);
        }
    };

    const handleLogout = async () => {
        if (window.confirm("¿Estás seguro de que deseas cerrar sesión?")) {
            await AuthService.logout();
            setIsIdentified(false);
            setResult(null);
            setTopic('');
        }
    };

    // ... (rest of the logic: handleGenerate, downloadLyrics, etc.)
    const [topic, setTopic] = useState('');
    const [intention, setIntention] = useState('Fijar proceso técnico');
    const [genre, setGenre] = useState('Pop Rock (Energía Alta)');
    const [isInstrumental, setIsInstrumental] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationStep, setGenerationStep] = useState('');
    const [progress, setProgress] = useState(0);
    const [result, setResult] = useState<{ lyrics: string; audioUrl: string } | null>(null);

    const handleGenerate = async () => {
        if (!topic) return;
        setIsGenerating(true);
        setResult(null);
        setProgress(0);
        try {
            setGenerationStep('Redactando letras con neuromarketing (Gemini)...');
            const lyrics = await MusicService.generatePedagogicalLyrics(topic, intention);
            setGenerationStep('Sintetizando frecuencia mnemotécnica (Suno AI)...');
            const audioUrl = await MusicService.generateSunoAudio(lyrics, genre, 'lead_user', isInstrumental, (p) => {
                setProgress(p);
            });
            setProgress(100);
            setTimeout(() => {
                setResult({ lyrics, audioUrl });
                setIsGenerating(false);
                setGenerationStep('');
            }, 500);
        } catch (error: any) {
            console.error("Error capturado:", error);
            alert(`Error en la generación: ${error.message || 'Error desconocido'}.`);
            setIsGenerating(false);
            setGenerationStep('');
        }
    };

    const downloadLyrics = () => {
        if (!result) return;
        const element = document.createElement("a");
        const file = new Blob([result.lyrics], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `Guion_Pedagogico_${topic.replace(/\s+/g, '_')}.txt`;
        document.body.appendChild(element);
        element.click();
    };

    if (!isIdentified) {
        return (
            <div className="course-page">
                <header className="brand-gradient" style={{ padding: '4rem 0', textAlign: 'center', color: 'white' }}>
                    <div className="container">
                        <span style={{ textTransform: 'uppercase', fontWeight: 800, letterSpacing: '3px', background: 'rgba(255,255,255,0.2)', padding: '0.5rem 1.5rem', borderRadius: '50px', fontSize: '0.8rem' }}>
                            PERFILADO DE ALTA MNEMOTECNIA
                        </span>
                        <h1 style={{ fontSize: '2.8rem', marginTop: '1.5rem', fontWeight: 800 }}>Muro de Acceso Pro</h1>
                        <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>Completa tu perfil para activar el laboratorio y sincronizar con tu cuenta.</p>
                    </div>
                </header>

                <section style={{ padding: '3rem 0' }}>
                    <div className="container" style={{ maxWidth: '650px' }}>
                        <div className="glass-card" style={{ padding: '3rem', borderRadius: '30px', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}>
                            <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                                <p style={{ fontWeight: 800, marginBottom: '1.5rem', color: '#666', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Acceso Rápido con tu Cuenta</p>
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                                    <button
                                        onClick={() => handleSocialLogin('Google')}
                                        disabled={isLoggingIn}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                            padding: '0.8rem 1.2rem',
                                            borderRadius: '12px',
                                            border: '1px solid #e2e8f0',
                                            background: 'white',
                                            cursor: isLoggingIn ? 'not-allowed' : 'pointer',
                                            fontWeight: 600,
                                            transition: 'all 0.2s',
                                            opacity: isLoggingIn ? 0.6 : 1
                                        }}
                                        onMouseOver={(e) => { if (!isLoggingIn) e.currentTarget.style.borderColor = 'var(--cademmy-orange)'; }}
                                        onMouseOut={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; }}
                                    >
                                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{ width: '18px' }} /> Google
                                    </button>
                                    <button
                                        onClick={() => handleSocialLogin('Microsoft')}
                                        disabled={isLoggingIn}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                            padding: '0.8rem 1.2rem',
                                            borderRadius: '12px',
                                            border: '1px solid #e2e8f0',
                                            background: 'white',
                                            cursor: isLoggingIn ? 'not-allowed' : 'pointer',
                                            fontWeight: 600,
                                            transition: 'all 0.2s',
                                            opacity: isLoggingIn ? 0.6 : 1
                                        }}
                                        onMouseOver={(e) => { if (!isLoggingIn) e.currentTarget.style.borderColor = '#00a4ef'; }}
                                        onMouseOut={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; }}
                                    >
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" style={{ width: '18px', height: '18px', objectFit: 'contain' }} /> Microsoft
                                    </button>
                                    <button
                                        onClick={() => handleSocialLogin('Apple')}
                                        disabled={isLoggingIn}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                            padding: '0.8rem 1.2rem',
                                            borderRadius: '12px',
                                            border: '1px solid #e2e8f0',
                                            background: 'white',
                                            cursor: isLoggingIn ? 'not-allowed' : 'pointer',
                                            fontWeight: 600,
                                            transition: 'all 0.2s',
                                            opacity: isLoggingIn ? 0.6 : 1
                                        }}
                                        onMouseOver={(e) => { if (!isLoggingIn) e.currentTarget.style.borderColor = '#000'; }}
                                        onMouseOut={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; }}
                                    >
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" style={{ width: '18px' }} /> Apple
                                    </button>
                                </div>
                                <div style={{ margin: '2rem 0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ flex: 1, height: '1px', background: '#eee' }}></div>
                                    <span style={{ fontSize: '0.8rem', color: '#999', fontWeight: 700 }}>O REGISTRO MANUAL DETALLADO</span>
                                    <div style={{ flex: 1, height: '1px', background: '#eee' }}></div>
                                </div>
                            </div>

                            <form onSubmit={handleLeadSubmit}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700, fontSize: '0.9rem' }}>Nombre Completo *</label>
                                        <input
                                            type="text" required
                                            style={{ width: '100%', padding: '0.9rem', borderRadius: '12px', border: '2px solid #eee' }}
                                            value={leadData.name}
                                            onChange={e => setLeadData({ ...leadData, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700, fontSize: '0.9rem' }}>Email *</label>
                                        <input
                                            type="email" required
                                            style={{ width: '100%', padding: '0.9rem', borderRadius: '12px', border: '2px solid #eee' }}
                                            value={leadData.email}
                                            onChange={e => setLeadData({ ...leadData, email: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700, fontSize: '0.9rem' }}>Teléfono (WhatsApp) *</label>
                                        <input
                                            type="tel" required
                                            placeholder="+52 ..."
                                            style={{ width: '100%', padding: '0.9rem', borderRadius: '12px', border: '2px solid #eee' }}
                                            value={leadData.phone}
                                            onChange={e => setLeadData({ ...leadData, phone: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700, fontSize: '0.9rem' }}>Empresa</label>
                                        <input
                                            type="text"
                                            style={{ width: '100%', padding: '0.9rem', borderRadius: '12px', border: '2px solid #eee' }}
                                            value={leadData.company}
                                            onChange={e => setLeadData({ ...leadData, company: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700, fontSize: '0.9rem' }}>Puesto / Cargo</label>
                                        <input
                                            type="text"
                                            placeholder="Ej: Director RRHH"
                                            style={{ width: '100%', padding: '0.9rem', borderRadius: '12px', border: '2px solid #eee' }}
                                            value={leadData.position}
                                            onChange={e => setLeadData({ ...leadData, position: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700, fontSize: '0.9rem' }}>Objetivo de Uso</label>
                                        <select
                                            style={{ width: '100%', padding: '0.9rem', borderRadius: '12px', border: '2px solid #eee', background: 'white' }}
                                            value={leadData.objective}
                                            onChange={e => setLeadData({ ...leadData, objective: e.target.value })}
                                        >
                                            <option>Cursos Online / E-learning</option>
                                            <option>Capacitación Corporativa</option>
                                            <option>Eventos Presenciales</option>
                                            <option>Marketing / Branding</option>
                                            <option>Uso Personal / Curiosidad</option>
                                        </select>
                                    </div>
                                </div>

                                <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.8rem', background: '#fff9f0', padding: '1rem', borderRadius: '12px', border: '1px solid #ffe8cc' }}>
                                    <input
                                        type="checkbox"
                                        id="decisionMaker"
                                        checked={leadData.isDecisionMaker}
                                        onChange={e => setLeadData({ ...leadData, isDecisionMaker: e.target.checked })}
                                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                                    />
                                    <label htmlFor="decisionMaker" style={{ fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', color: '#854d0e' }}>
                                        Soy tomador de decisiones en mi empresa / institución
                                    </label>
                                </div>

                                <button type="submit" className="cta-button primary-orange" style={{ width: '100%', padding: '1.2rem', fontSize: '1.1rem', fontWeight: 800 }}>
                                    Activar mi Perfil de Alta Mnemotecnia
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="course-page">
            <header className="brand-gradient" style={{ padding: '5rem 0', textAlign: 'center', color: 'white', position: 'relative' }}>
                <button
                    onClick={handleLogout}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.3)',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '10px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        backdropFilter: 'blur(5px)',
                        transition: 'all 0.3s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                >
                    🚪 Cerrar Sesión
                </button>
                <div className="container">
                    <span style={{
                        textTransform: 'uppercase',
                        fontWeight: 800,
                        letterSpacing: '3px',
                        background: 'rgba(255,255,255,0.2)',
                        padding: '0.5rem 1.5rem',
                        borderRadius: '50px',
                        fontSize: '0.9rem'
                    }}>
                        CIENCIA SONORA & APRENDIZAJE ACELERADO
                    </span>
                    <h1 style={{ fontSize: '3.5rem', marginTop: '1.5rem', fontWeight: 800 }}>
                        Laboratorio de Alta Mnemotecnia
                    </h1>
                    <p style={{ fontSize: '1.4rem', opacity: 0.9, maxWidth: '700px', margin: '1rem auto 0' }}>
                        Transformamos conceptos complejos en himnos de aprendizaje mediante neuro-composición IA.
                    </p>
                </div>
            </header>

            <section style={{ padding: '4rem 0' }}>
                <div className="container" style={{ maxWidth: '850px' }}>
                    <div className="glass-card" style={{ padding: '3.5rem', borderRadius: '40px', boxShadow: '0 30px 60px rgba(0,0,0,0.12)', border: '1px solid rgba(255,255,255,0.3)' }}>
                        <div style={{ marginBottom: '2.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 800, fontSize: '1.1rem', color: 'var(--cademmy-charcoal)' }}>
                                ¿Cuál es el desafío de aprendizaje hoy?
                            </label>
                            <input
                                type="text"
                                placeholder="Ej: Pasos para el Cierre de Ventas, Protocolo de Seguridad Grado 5..."
                                style={{ width: '100%', padding: '1.2rem', borderRadius: '16px', border: '2px solid #eee', fontSize: '1.2rem', outline: 'none', transition: 'border-color 0.3s' }}
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 800, color: 'var(--cademmy-charcoal)' }}>Intención Cognitiva</label>
                                <select
                                    style={{ width: '100%', padding: '1.2rem', borderRadius: '16px', border: '2px solid #eee', fontSize: '1rem', background: 'white' }}
                                    value={intention}
                                    onChange={(e) => setIntention(e.target.value)}
                                >
                                    <option>Fijar proceso técnico</option>
                                    <option>Motivación conductual</option>
                                    <option>Inspiración de liderazgo</option>
                                    <option>Resumen mnemotécnico 360</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 800, color: 'var(--cademmy-charcoal)' }}>Frecuencia / Género</label>
                                <select
                                    style={{ width: '100%', padding: '1.2rem', borderRadius: '16px', border: '2px solid #eee', fontSize: '1rem', background: 'white' }}
                                    value={genre}
                                    onChange={(e) => setGenre(e.target.value)}
                                >
                                    <option>Pop Rock (Energía Alta)</option>
                                    <option>Lo-fi Alpha (Concentración)</option>
                                    <option>Orquestal Épico (Inspiración)</option>
                                    <option>Synthwave (Retención)</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem', background: '#f1f5f9', padding: '1rem', borderRadius: '12px' }}>
                            <input
                                type="checkbox"
                                id="instrumental"
                                checked={isInstrumental}
                                onChange={(e) => setIsInstrumental(e.target.checked)}
                                style={{ transform: 'scale(1.5)', cursor: 'pointer' }}
                            />
                            <label htmlFor="instrumental" style={{ fontWeight: 700, cursor: 'pointer', color: 'var(--cademmy-orange)' }}>
                                🎵 Modo Instrumental (Sin voces, solo música de fondo)
                            </label>
                        </div>

                        <button
                            className={`cta-button primary-orange ${isGenerating ? 'loading' : ''}`}
                            style={{ width: '100%', padding: '1.5rem', fontSize: '1.3rem', fontWeight: 800, borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}
                            onClick={handleGenerate}
                            disabled={isGenerating || !topic}
                        >
                            {isGenerating ? 'Sincronizando Neuronas...' : 'Activar Síntesis Mnemotécnica'}
                        </button>

                        {isGenerating && (
                            <div style={{ marginTop: '1.5rem' }}>
                                <p style={{ textAlign: 'center', color: 'var(--cademmy-orange)', fontWeight: 600, marginBottom: '0.8rem' }}>
                                    <span className="pulse-dot"></span> {generationStep}
                                </p>
                                <div style={{
                                    width: '100%',
                                    height: '10px',
                                    background: '#eee',
                                    borderRadius: '10px',
                                    overflow: 'hidden'
                                }}>
                                    <div style={{
                                        width: `${progress}%`,
                                        height: '100%',
                                        background: 'linear-gradient(90deg, var(--cademmy-orange), var(--cademmy-red))',
                                        transition: 'width 0.5s ease-out'
                                    }}></div>
                                </div>
                                <p style={{ textAlign: 'center', marginTop: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                                    {progress}% completado
                                </p>
                            </div>
                        )}
                    </div>

                    {result && (
                        <div className="fade-in" style={{ marginTop: '4rem' }}>
                            <div className="section-header-centered">
                                <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--cademmy-charcoal)' }}>🧬 Resultado de la Síntesis</h2>
                            </div>

                            <div style={{ background: 'white', padding: '3.5rem', borderRadius: '32px', boxShadow: '0 40px 80px rgba(0,0,0,0.08)', border: '1px solid #edf2f7' }}>
                                <div style={{ marginBottom: '3rem' }}>
                                    <h3 style={{ color: 'var(--cademmy-orange)', marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: 800 }}>Pista Mnemotécnica</h3>
                                    <audio key={result.audioUrl} controls style={{ width: '100%' }} autoPlay>
                                        <source src={result.audioUrl} type="audio/mpeg" />
                                        Tu navegador no soporta el reproductor de audio.
                                    </audio>
                                    <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                                        <button
                                            className="cta-button secondary-gray"
                                            onClick={() => window.open(result.audioUrl, '_blank')}
                                            style={{ background: '#eee', color: '#333', padding: '0.8rem 1.5rem', borderRadius: '50px', fontWeight: 700, fontSize: '0.9rem' }}
                                        >
                                            ⬇️ Descargar Audio (.mp3)
                                        </button>
                                    </div>
                                </div>

                                {!isInstrumental && (
                                    <>
                                        <h3 style={{ color: 'var(--cademmy-charcoal)', marginBottom: '1.5rem', borderTop: '1px solid #edf2f7', paddingTop: '3rem', fontSize: '1.5rem', fontWeight: 800 }}>Guión de Aprendizaje</h3>
                                        <pre style={{
                                            background: '#f8fafc',
                                            padding: '2.5rem',
                                            borderRadius: '20px',
                                            fontFamily: 'inherit',
                                            lineHeight: '1.8',
                                            whiteSpace: 'pre-wrap',
                                            fontSize: '1.1rem',
                                            color: '#334155',
                                            border: '1px solid #e2e8f0'
                                        }}>
                                            {result.lyrics}
                                        </pre>
                                        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                                            <button
                                                className="cta-button secondary-gray"
                                                onClick={downloadLyrics}
                                                style={{ background: '#eee', color: '#333', padding: '0.8rem 1.5rem', borderRadius: '50px', fontWeight: 700, fontSize: '0.9rem' }}
                                            >
                                                📝 Descargar Guión (.txt)
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default IAMusicLab;
