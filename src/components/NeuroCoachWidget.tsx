import React, { useState, useEffect } from 'react';
import { NeuroCoachService, NeuroRecommendation } from '../services/neuroCoachService';
import './NeuroCoachWidget.css';

interface NeuroCoachWidgetProps {
    progress: any;
    currentLesson: any;
}

const NeuroCoachWidget: React.FC<NeuroCoachWidgetProps> = ({ progress, currentLesson }) => {
    const [recommendation, setRecommendation] = useState<NeuroRecommendation | null>(null);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const getCoachAdvice = async () => {
        setLoading(true);
        setIsOpen(true);
        const advice = await NeuroCoachService.getRecommendation(progress, currentLesson);
        setRecommendation(advice);
        setLoading(false);
    };

    return (
        <div className={`neuro-coach-widget ${isOpen ? 'open' : ''}`}>
            {isOpen ? (
                <div className="coach-panel glass-morphism">
                    <button className="close-coach" onClick={() => setIsOpen(false)}>×</button>
                    <div className="coach-header">
                        <span className="coach-avatar">🧠</span>
                        <h4>Neuro-Coach IA</h4>
                    </div>

                    <div className="coach-content">
                        {loading ? (
                            <p className="typing-effect">Analizando tus patrones de aprendizaje...</p>
                        ) : recommendation ? (
                            <>
                                <p>{recommendation.message}</p>
                                <button className="coach-action-btn">
                                    {recommendation.action_label}
                                </button>
                            </>
                        ) : (
                            <p>¿Necesitas una recomendación personalizada?</p>
                        )}
                    </div>
                </div>
            ) : (
                <button className="coach-trigger brand-gradient" onClick={getCoachAdvice}>
                    <span className="coach-icon">🧠</span>
                    <span className="coach-label">Neuro-Coach</span>
                </button>
            )}
        </div>
    );
};

export default NeuroCoachWidget;
