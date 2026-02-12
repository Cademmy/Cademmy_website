import React, { useState } from 'react';
import { roleplayWithAI } from '../services/geminiService';
import { LMSService } from '../services/lmsService';
import { useUser } from '../context/UserContext';
import './SimuladorIA.css';

interface SimuladorIAProps {
    courseId?: string;
}

const SimuladorIA: React.FC<SimuladorIAProps> = ({ courseId = 'ec0217' }) => {
    const { user } = useUser();
    const [history, setHistory] = useState<{ role: 'user' | 'ai', content: string }[]>([
        { role: 'ai', content: 'Soy el Evaluador Certificado de CONOCER. Iniciaremos tu simulacro. Describe brevemente: ¿Cuál es el objetivo de tu curso y a quién va dirigido?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [isPassed, setIsPassed] = useState(false);

    const handleAction = async () => {
        if (!input.trim() || loading) return;

        const userMsg = { role: 'user' as const, content: input };
        setHistory(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        const prompt = `
        ACTÚA COMO UN EVALUADOR ESTRICTO DE LA SEP/CONOCER (Estándar EC0217.01).
        Estás evaluando a un aspirante a instructor.
        
        Tu objetivo: Verificar que sepa planear y conducir un curso.
        
        Instrucciones:
        1. Evalúa su respuesta anterior ("${input}").
        2. Si es vaga o incorrecta, se duro y pide precisión.
        3. Si es correcta, haz la siguiente pregunta del estándar.
        4. Si el usuario demuestra competencia en al menos 3 interacciones, escribe al final de tu respuesta: "[[APROBADO]]".
        
        Mantén el tono formal y de autoridad.
        `;

        const responseText = await roleplayWithAI(prompt, input);

        let finalContent = responseText;
        if (responseText.includes('[[APROBADO]]')) {
            setIsPassed(true);
            finalContent = responseText.replace('[[APROBADO]]', '');
            if (user) {
                LMSService.saveSimulationResult(user.uid, courseId, { status: 'passed', date: new Date() });
            }
        }

        setHistory(prev => [...prev, { role: 'ai', content: finalContent }]);
        setLoading(false);
    };

    return (
        <div className="simulador-ia-page">
            <div className="sim-header">
                <h3>Simulador de Evaluación (EC0217.01)</h3>
                <p>⚠️ Este es un filtro previo a tu evaluación real. Debes convencer al IA.</p>
            </div>

            <div className="chat-window-sim">
                {history.map((msg, i) => (
                    <div key={i} className={`msg-bubble-sim ${msg.role}`}>
                        <div className="avatar-sim">{msg.role === 'ai' ? '📋' : '👤'}</div>
                        <div className="content-sim">{msg.content}</div>
                    </div>
                ))}
                {loading && <div className="typing-sim">El evaluador está analizando tu respuesta...</div>}

                {isPassed && (
                    <div className="success-banner fade-in">
                        <h4>✅ ¡Simulacro Aprobado!</h4>
                        <p>Has demostrado competencia suficiente.</p>
                        <button className="schedule-btn">📅 Agendar Evaluación Real</button>
                    </div>
                )}
            </div>

            <div className="sim-input-area">
                <input
                    type="text"
                    placeholder="Responde como si estuvieras en la evaluación..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAction()}
                    disabled={loading || isPassed}
                />
                <button onClick={handleAction} disabled={loading || isPassed}>Enviar Respuesta</button>
            </div>
        </div>
    );
};

export default SimuladorIA;
