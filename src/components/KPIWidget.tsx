import React, { useState } from 'react';
import { designProjectWithIA, ArchitectProject } from '../services/geminiService';
import './KPIWidget.css';

const KPIWidget: React.FC = () => {
    const [topic, setTopic] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<ArchitectProject | null>(null);

    const handleGenerate = async () => {
        if (!topic.trim()) return;
        setLoading(true);
        setResult(null);

        const res = await designProjectWithIA(`Genera un Mapa de KPIs y objetivos para el área de: ${topic}. Enfócate en la estandarización de instructores y evidencia defendible.`);

        if (res.success && res.projectData) {
            setResult(res.projectData);
        }
        setLoading(false);
    };

    return (
        <div className="kpi-widget">
            <div className="input-group-premium">
                <input
                    type="text"
                    placeholder="Ej: Ventas, Seguridad, Liderazgo..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    disabled={loading}
                />
                <button
                    className="generate-btn brand-gradient"
                    onClick={handleGenerate}
                    disabled={loading || !topic.trim()}
                >
                    {loading ? 'Procesando...' : 'Generar Mapa 🚀'}
                </button>
            </div>

            {loading && (
                <div className="loading-animation">
                    <div className="spinner"></div>
                    <p>Diseñando tus KPIs estratégicos...</p>
                </div>
            )}

            {result && (
                <div className="kpi-result-display fade-in">
                    <div className="result-header">
                        <h3>{result.title}</h3>
                        <p>{result.description}</p>
                    </div>

                    <div className="result-grid">
                        <div className="result-card">
                            <h4>🎯 Objetivos Estratégicos</h4>
                            <ul>
                                {result.objectives.map((obj, i) => (
                                    <li key={i}>{obj}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="result-card highlight">
                            <h4>📈 KPI de Impacto</h4>
                            <p className="kpi-value">{result.kpi_expected}</p>
                        </div>
                    </div>

                    <div className="result-footer">
                        <p><strong>Tecnologías sugeridas:</strong> {result.suggested_technologies.join(', ')}</p>
                        <p className="roi-tag">ROI Estimado: {result.estimated_roi}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default KPIWidget;
