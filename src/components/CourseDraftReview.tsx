import React from 'react';
import { CourseDraft } from '../services/courseScannerService';
import './CourseDraftReview.css';

interface CourseDraftReviewProps {
    draft: CourseDraft;
    onConfirm: () => void;
    onCancel: () => void;
}

const CourseDraftReview: React.FC<CourseDraftReviewProps> = ({ draft, onConfirm, onCancel }) => {
    return (
        <div className="draft-overlay">
            <div className="draft-modal glass-morphism">
                <header className="draft-header">
                    <h2>Propuesta de Curso IA 🏛️</h2>
                    <p>He analizado tu documento y he diseñado esta arquitectura inicial.</p>
                </header>

                <div className="draft-body">
                    <div className="draft-info">
                        <h3>{draft.title}</h3>
                        <p>{draft.description}</p>
                    </div>

                    <div className="draft-structure">
                        {draft.modules.map((module, mIdx) => (
                            <div key={mIdx} className="draft-module">
                                <h4>Módulo {mIdx + 1}: {module.title}</h4>
                                <ul>
                                    {module.lessons.map((lesson, lIdx) => (
                                        <li key={lIdx}>
                                            <span className="lesson-type-icon">
                                                {lesson.type === 'video' ? '🎥' : lesson.type === 'quiz' ? '📝' : '🧩'}
                                            </span>
                                            {lesson.title}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <footer className="draft-footer">
                    <button className="mini-btn secondary" onClick={onCancel}>Descartar</button>
                    <button className="cta-button brand-gradient" onClick={onConfirm}>Confirmar y Crear Curso</button>
                </footer>
            </div>
        </div>
    );
};

export default CourseDraftReview;
