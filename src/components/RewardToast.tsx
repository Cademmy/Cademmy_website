import React, { useState, useEffect } from 'react';
import './RewardToast.css';

interface RewardToastProps {
    amount: number;
    message?: string;
    onClose: () => void;
}

const RewardToast: React.FC<RewardToastProps> = ({ amount, message = "¡Excelente progreso!", onClose }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            setTimeout(onClose, 500); // Dar tiempo a la animación de salida
        }, 4000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`reward-toast ${visible ? 'slide-in' : 'slide-out'}`}>
            <div className="toast-confetti"></div>
            <div className="toast-content">
                <div className="coin-float">🪙</div>
                <div className="toast-text">
                    <span className="toast-amount">+{amount} CAD-Coins</span>
                    <span className="toast-msg">{message}</span>
                </div>
            </div>
        </div>
    );
};

export default RewardToast;
