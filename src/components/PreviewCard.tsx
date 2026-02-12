import React from 'react';
import { ArchitectProject } from '../services/geminiService';
import { useUser } from '../context/UserContext';
import { saveProjectLead } from '../services/leadService';

interface PreviewCardProps {
    project: ArchitectProject;
}

const PreviewCard: React.FC<PreviewCardProps> = ({ project }) => {
    const { user } = useUser();

    const handleAction = async (action: 'pdf' | 'quote') => {
        if (!user) {
            (window as any).showAuthModal?.();
            return;
        }

        if (action === 'quote') {
            const res = await saveProjectLead({
                userId: user.uid,
                userEmail: user.email || '',
                userName: user.displayName || 'Usuario Cademmy',
                project: project,
                status: 'pending'
            });

            if (res.success) {
                alert("¡Cotización solicitada con éxito! Nos pondremos en contacto contigo.");
            } else {
                alert("Hubo un error al procesar tu solicitud. Intenta de nuevo.");
            }
        } else {
            alert("Descargando PDF... (Función simulada para demo)");
        }
    };

    return (
        <div className="preview-card animate-fade-in">
            <div className="preview-card-content">
                <div className="card-header-main">
                    <div className="card-title-zone">
                        <span className="card-badge">Estrategia Premium</span>
                        <h3>{project.title}</h3>
                    </div>
                </div>

                <p className="card-description">{project.description}</p>

                <div className="grid-details">
                    <div className="detail-item">
                        <span className="detail-label">KPI Esperado</span>
                        <span className="detail-value">{project.kpi_expected}</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Duración Est.</span>
                        <span className="detail-value">{project.estimated_duration}</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">ROI Proyectado</span>
                        <span className="detail-value">{project.estimated_roi}</span>
                    </div>
                </div>

                <div className="objectives-list">
                    <h4>Ejes Estratégicos</h4>
                    <ul>
                        {project.objectives.map((obj, i) => (
                            <li key={i}>{obj}</li>
                        ))}
                    </ul>
                </div>

                <div className="card-actions">
                    <button className="cta-button primary-outline" onClick={() => handleAction('pdf')}>
                        Descargar PDF <span className="lock-badge">🔒</span>
                    </button>
                    <button className="cta-button secondary" onClick={() => handleAction('quote')}>
                        Solicitar Cotización <span className="lock-badge">🔒</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PreviewCard;
