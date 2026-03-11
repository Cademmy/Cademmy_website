import React, { useState } from 'react';
import './QuizPlayer.css';

export interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
}

interface QuizPlayerProps {
    questions: QuizQuestion[];
    onComplete: (score: number) => void;
}

const QuizPlayer: React.FC<QuizPlayerProps> = ({ questions, onComplete }) => {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);

    const question = questions[currentIdx];

    const handleAnswer = () => {
        if (selectedIdx === null) return;

        const isCorrect = selectedIdx === question.correctAnswer;
        if (isCorrect) setScore(s => s + 1);

        setShowExplanation(true);
    };

    const nextQuestion = () => {
        const next = currentIdx + 1;
        if (next < questions.length) {
            setCurrentIdx(next);
            setSelectedIdx(null);
            setShowExplanation(false);
        } else {
            setIsFinished(true);
            onComplete(score);
        }
    };

    if (isFinished) {
        return (
            <div className="quiz-finished glass-morphism text-center">
                <h2>¡Quiz Completado!</h2>
                <div className="score-badge">{Math.round((score / questions.length) * 100)}%</div>
                <p>Tu puntuación: {score} de {questions.length}</p>
                <div className="ocean-blue-tip">
                    🎯 La IA está analizando tus resultados para recomendarte el siguiente paso.
                </div>
            </div>
        );
    }

    return (
        <div className="quiz-player-container glass-morphism">
            <div className="quiz-progress">
                Pregunta {currentIdx + 1} de {questions.length}
            </div>

            <h3 className="quiz-question">{question.question}</h3>

            <div className="quiz-options">
                {question.options.map((opt, idx) => (
                    <button
                        key={idx}
                        className={`quiz-opt-btn ${selectedIdx === idx ? 'selected' : ''} ${showExplanation && idx === question.correctAnswer ? 'correct' : ''} ${showExplanation && selectedIdx === idx && idx !== question.correctAnswer ? 'wrong' : ''}`}
                        onClick={() => !showExplanation && setSelectedIdx(idx)}
                        disabled={showExplanation}
                    >
                        {opt}
                    </button>
                ))}
            </div>

            {showExplanation && (
                <div className="quiz-explanation fade-in">
                    <p>{question.explanation || (selectedIdx === question.correctAnswer ? "¡Correcto!" : "Vuelve a intentarlo en el repaso.")}</p>
                    <button className="cta-button brand-gradient" onClick={nextQuestion}>Continuar</button>
                </div>
            )}

            {!showExplanation && (
                <button
                    className="submit-quiz-btn"
                    onClick={handleAnswer}
                    disabled={selectedIdx === null}
                >
                    Confirmar Respuesta
                </button>
            )}
        </div>
    );
};

export default QuizPlayer;
