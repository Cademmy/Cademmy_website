import React from 'react';

interface ARVRPlaceholderProps {
    title: string;
    instructions?: string;
    externalLink?: string;
}

const ARVRPlaceholder: React.FC<ARVRPlaceholderProps> = ({ title, instructions, externalLink }) => {
    return (
        <div className="ar-vr-container text-center" style={{ padding: '4rem 2rem' }}>
            <div className="ar-icon" style={{ fontSize: '5rem', marginBottom: '2rem' }}>🥽</div>
            <h2 style={{ marginBottom: '1.5rem' }}>{title}</h2>
            <p style={{ color: '#64748b', maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: '1.6' }}>
                {instructions || 'Esta experiencia requiere de un entorno de Realidad Aumentada o Virtual. Sigue las instrucciones a continuación para continuar con tu neuro-aprendizaje.'}
            </p>

            {externalLink ? (
                <a
                    href={externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-button brand-gradient"
                    style={{ textDecoration: 'none', display: 'inline-block' }}
                >
                    🔊 Abrir Experiencia Externa
                </a>
            ) : (
                <div className="ocean-blue-tip" style={{ display: 'inline-block' }}>
                    🚀 Esta lección está configurada como una experiencia futura de Océano Azul.
                </div>
            )}
        </div>
    );
};

export default ARVRPlaceholder;
