import React, { useState, useEffect } from 'react';
import './InteractiveMatch.css';

interface Pair {
    id: string;
    left: string;
    right: string;
}

interface InteractiveMatchProps {
    pairs: Pair[];
    onComplete?: () => void;
}

const InteractiveMatch: React.FC<InteractiveMatchProps> = ({ pairs, onComplete }) => {
    const [leftItems, setLeftItems] = useState<string[]>([]);
    const [rightItems, setRightItems] = useState<string[]>([]);
    const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
    const [matches, setMatches] = useState<{ [key: number]: number }>({});
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        // Shuffle items for the game
        const lefts = pairs.map(p => p.left);
        const rights = [...pairs.map(p => p.right)].sort(() => Math.random() - 0.5);
        setLeftItems(lefts);
        setRightItems(rights);
    }, [pairs]);

    const handleLeftClick = (index: number) => {
        if (showResults) return;
        setSelectedLeft(index);
    };

    const handleRightClick = (rightIndex: number) => {
        if (showResults || selectedLeft === null) return;

        setMatches(prev => ({
            ...prev,
            [selectedLeft]: rightIndex
        }));
        setSelectedLeft(null);
    };

    const checkResults = () => {
        setShowResults(true);
        const allCorrect = leftItems.every((left, idx) => {
            const rightIdx = matches[idx];
            if (rightIdx === undefined) return false;
            const originalPair = pairs.find(p => p.left === left);
            return originalPair?.right === rightItems[rightIdx];
        });

        if (allCorrect && onComplete) {
            onComplete();
        }
    };

    return (
        <div className="interactive-match-container glass-morphism">
            <div className="match-header">
                <h3>Relacionar Columnas</h3>
                <p>Selecciona un elemento de la izquierda y luego su par correspondiente en la derecha.</p>
            </div>

            <div className="match-grid">
                <div className="column left-column">
                    {leftItems.map((item, idx) => (
                        <div
                            key={`left-${idx}`}
                            className={`match-item ${selectedLeft === idx ? 'selected' : ''} ${matches[idx] !== undefined ? 'matched' : ''}`}
                            onClick={() => handleLeftClick(idx)}
                        >
                            {item}
                        </div>
                    ))}
                </div>

                <div className="column right-column">
                    {rightItems.map((item, idx) => {
                        const isMatched = Object.values(matches).includes(idx);
                        return (
                            <div
                                key={`right-${idx}`}
                                className={`match-item ${isMatched ? 'matched' : ''}`}
                                onClick={() => handleRightClick(idx)}
                            >
                                {item}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="match-actions">
                <button
                    className="cta-button brand-gradient"
                    onClick={checkResults}
                    disabled={Object.keys(matches).length < leftItems.length}
                >
                    Verificar Respuestas
                </button>
                {showResults && (
                    <div className="match-feedback">
                        <p>¡Buen intento! Revisa tus conexiones.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InteractiveMatch;
