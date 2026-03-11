import React, { useState, useEffect } from 'react';
import { designProjectWithIA, ArchitectProject } from '../services/geminiService';
import PreviewCard from './PreviewCard';
import { useUser } from '../context/UserContext';
import './ArchitectModule.css';

const ArchitectModule: React.FC = () => {
    const { user } = useUser();
    const [requirement, setRequirement] = useState('');
    const [loading, setLoading] = useState(false);
    const [responses, setResponses] = useState<{ chat: string; project?: ArchitectProject }[]>([]);
    const [interactions, setInteractions] = useState(0);

    // Persistencia local de interacciones para no-logueados
    useEffect(() => {
        const stored = localStorage.getItem('cademmy_architect_interactions');
        if (stored) setInteractions(parseInt(stored));
    }, []);

    const handleDesign = async () => {
        if (!requirement.trim()) return;

        // Regla: 2 interacciones gratis sin login
        if (!user && interactions >= 2) {
            (window as any).showAuthModal?.();
            return;
        }

        setLoading(true);
        const res = await designProjectWithIA(requirement);

        if (res.success) {
            setResponses([...responses, { chat: res.chatText, project: res.projectData }]);
            setRequirement('');

            const newCount = interactions + 1;
            setInteractions(newCount);
            if (!user) {
                localStorage.setItem('cademmy_architect_interactions', newCount.toString());
            }
        }
        setLoading(false);
    };

    return (
        <div className="architect-module">
            <header className="architect-header">
                <h2>Diseño Estratégico a Medida</h2>
                <p>Nuestra Inteligencia Artificial "Arquitecto" diseña el roadmap perfecto para tu organización.</p>
            </header>

            <div className="architect-input-zone">
                <textarea
                    placeholder="Describe tu necesidad (ej: Necesito un plan de upskilling en IA para mi equipo de 50 personas...)"
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                    disabled={loading}
                />
                <button
                    className="architect-send-btn"
                    onClick={handleDesign}
                    disabled={loading || !requirement.trim()}
                >
                    {loading ? '...' : '🚀'}
                </button>
            </div>

            {!user && interactions >= 2 && (
                <div className="auth-limit-banner" style={{ textAlign: 'center', marginTop: '1rem', color: '#ff7a00' }}>
                    💡 Has alcanzado el límite de pruebas gratis. <strong>Inicia sesión</strong> para continuar diseñando.
                </div>
            )}

            <div className="architect-response-area">
                {responses.map((res, idx) => (
                    <div key={idx} className="interaction-block">
                        <div className="chat-bubble">
                            {res.chat}
                        </div>
                        {res.project && <PreviewCard project={res.project} />}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ArchitectModule;
