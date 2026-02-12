import React, { useState } from 'react';
import { designProjectWithIA } from '../services/geminiService';
import './EvidenceBuilder.css';

const EvidenceBuilder: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'upload' | 'ai-draft'>('upload');
    const [file, setFile] = useState<File | null>(null);
    const [description, setDescription] = useState('');
    const [aiContent, setAiContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleGenerate = async () => {
        if (!description.trim()) return;
        setIsLoading(true);

        // Simulating context for the AI
        const prompt = `Como experto en certificación CONOCER, redacta una Carta Descriptiva profesional basada en este tema: "${description}". Incluye Objetivo General, 3 Objetivos Específicos y Temario Sintético.`;

        const response = await designProjectWithIA(prompt);
        if (response.success) {
            setAiContent(response.chatText);
        }
        setIsLoading(false);
    };

    return (
        <div className="evidence-builder-container">
            <div className="eb-header">
                <h2>Constructor de Portafolio de Evidencias</h2>
                <p>Módulo 6: Integra tus productos para la evaluación.</p>
            </div>

            <div className="eb-tabs">
                <button
                    className={`eb-tab ${activeTab === 'upload' ? 'active' : ''}`}
                    onClick={() => setActiveTab('upload')}
                >
                    📤 Subir Archivos
                </button>
                <button
                    className={`eb-tab ${activeTab === 'ai-draft' ? 'active' : ''}`}
                    onClick={() => setActiveTab('ai-draft')}
                >
                    ✨ Redactor con IA
                </button>
            </div>

            <div className="eb-content">
                {activeTab === 'upload' && (
                    <div className="upload-section fade-in">
                        <div className="drag-drop-area">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="17 8 12 3 7 8"></polyline>
                                <line x1="12" y1="3" x2="12" y2="15"></line>
                            </svg>
                            <p>Arrastra tus archivos aquí o haz clic para subir</p>
                            <input type="file" onChange={handleFileChange} />
                        </div>
                        {file && (
                            <div className="file-preview">
                                <span>📄 {file.name}</span>
                                <span className="upload-success">✅ Listo para revisión</span>
                            </div>
                        )}
                        <div className="evidence-checklist">
                            <h4>Evidencias Requeridas:</h4>
                            <ul>
                                <li><input type="checkbox" checked={!!file} readOnly /> Carta Descriptiva</li>
                                <li><input type="checkbox" /> Lista de Cotejo</li>
                                <li><input type="checkbox" /> Manual del Participante</li>
                            </ul>
                        </div>
                    </div>
                )}

                {activeTab === 'ai-draft' && (
                    <div className="ai-draft-section fade-in">
                        <label>Describe el curso que quieres diseñar:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Ej: Curso de Seguridad Industrial para supervisores de planta..."
                            rows={3}
                        />
                        <button
                            className="generate-btn"
                            onClick={handleGenerate}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Generando...' : 'Generar Carta Descriptiva con IA'}
                        </button>

                        {aiContent && (
                            <div className="ai-result">
                                <h4>Borrador Sugerido:</h4>
                                <textarea
                                    className="result-area"
                                    value={aiContent}
                                    readOnly
                                />
                                <div className="action-row">
                                    <button className="copy-btn">Copiar Texto</button>
                                    <button className="save-btn">Guardar como Evidencia</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EvidenceBuilder;
