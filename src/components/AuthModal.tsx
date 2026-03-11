import React, { useState } from 'react';
import { AuthService } from '../services/authService';
import Modal from './Modal';
import './AuthModal.css';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
    const [step, setStep] = useState<'type' | 'login'>('type');
    const [selectedType, setSelectedType] = useState<'company' | 'professional' | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleTypeSelect = (type: 'company' | 'professional') => {
        setSelectedType(type);
        setStep('login');
        setError(null);
    };

    const handleLogin = async (provider: 'google' | 'microsoft' | 'apple') => {
        setLoading(true);
        setError(null);
        try {
            let user;
            if (provider === 'google') user = await AuthService.loginWithGoogle();
            else if (provider === 'microsoft') user = await AuthService.loginWithMicrosoft();
            else if (provider === 'apple') user = await AuthService.loginWithApple();

            if (user && selectedType) {
                // Guardar la segmentación inmediatamente tras el primer login
                await AuthService.saveLeadProfile(user.uid, {
                    userType: selectedType,
                    segment: selectedType === 'company' ? 'B2B/RH' : 'B2C/Docente'
                });
                onClose();
            }
        } catch (err: any) {
            console.error("Login failed:", err);
            if (err.code === 'auth/configuration-not-found') {
                setError(`El acceso con ${provider} aún no está habilitado en la consola de Firebase. Por favor, contacta a soporte o usa otro método.`);
            } else {
                setError(`Error al iniciar sesión con ${provider}. Por favor, intenta de nuevo.`);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={step === 'type' ? 'Personaliza tu experiencia' : 'Ingresa a Cademmy'}>
            <div className="auth-modal-content">
                {error && <div className="auth-error">{error}</div>}

                {step === 'type' ? (
                    <div className="type-selector-step">
                        <p className="instruction-text">¿Para quién es la capacitación?</p>
                        <div className="type-cards">
                            <div className="type-card" onClick={() => handleTypeSelect('company')}>
                                <span className="icon">🏢</span>
                                <h4>Para mi Empresa</h4>
                                <p>Tag: B2B / RH</p>
                            </div>
                            <div className="type-card" onClick={() => handleTypeSelect('professional')}>
                                <span className="icon">👨‍🏫</span>
                                <h4>Soy Instructor Independiente</h4>
                                <p>Tag: B2C / Docente</p>
                            </div>
                        </div>
                        <div className="auth-modal-footer">
                            <button className="text-link-btn" onClick={() => {
                                setSelectedType('professional'); // Default profile
                                setStep('login');
                                setError(null);
                            }}>
                                Ya tengo cuenta / Iniciar Sesión
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="login-step">
                        <p className="selection-badge">
                            Perfil seleccionado: <strong>{selectedType === 'company' ? 'Empresa' : 'Instructor'}</strong>
                            <button className="change-btn" onClick={() => setStep('type')} disabled={loading}>Cambiar</button>
                        </p>
                        <div className="social-login-grid">
                            <button
                                className={`social-btn google ${loading ? 'disabled' : ''}`}
                                onClick={() => handleLogin('google')}
                                disabled={loading}
                            >
                                {loading ? 'Cargando...' : 'Continuar con Google'}
                            </button>
                            <button
                                className={`social-btn microsoft ${loading ? 'disabled' : ''}`}
                                onClick={() => handleLogin('microsoft')}
                                disabled={loading}
                            >
                                {loading ? 'Cargando...' : 'Continuar con Microsoft'}
                            </button>
                            <button
                                className={`social-btn apple ${loading ? 'disabled' : ''}`}
                                onClick={() => handleLogin('apple')}
                                disabled={loading}
                            >
                                {loading ? 'Cargando...' : 'Continuar con Apple'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default AuthModal;
