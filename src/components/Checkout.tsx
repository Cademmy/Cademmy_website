import React, { useState } from 'react';
import PaymentService from '../services/paymentService';
import './Checkout.css';

interface CheckoutProps {
    amount: number;
    itemName: string;
    onSuccess?: () => void;
    onCancel?: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ amount, itemName, onSuccess, onCancel }) => {
    const [loading, setLoading] = useState(false);

    const handleStripe = async () => {
        setLoading(true);
        const res: any = await PaymentService.initiateStripePayment({ amount, currency: 'MXN', description: itemName });
        if (res.success) {
            window.location.href = res.url;
        }
        setLoading(false);
    };

    const handlePayPal = async () => {
        setLoading(true);
        const res: any = await PaymentService.initiatePayPalPayment({ amount, currency: 'MXN', description: itemName });
        if (res.success) {
            alert(`Orden de PayPal creada: ${res.orderId}. (Demo Sandbox)`);
            onSuccess?.();
        }
        setLoading(false);
    };

    return (
        <div className="checkout-container">
            <div className="checkout-summary">
                <h3>Resumen de Compra</h3>
                <div className="summary-row">
                    <span>{itemName}</span>
                    <span className="summary-price">${amount} MXN</span>
                </div>
            </div>

            <div className="payment-options">
                <button
                    className="stripe-pay-btn"
                    onClick={handleStripe}
                    disabled={loading}
                >
                    {loading ? 'Procesando...' : 'Pagar con Tarjeta (Stripe)'}
                </button>

                <div className="divider">o</div>

                <button
                    className="paypal-pay-btn"
                    onClick={handlePayPal}
                    disabled={loading}
                >
                    {loading ? 'Procesando...' : 'Pagar con PayPal'}
                </button>
            </div>

            <button className="cancel-btn" onClick={onCancel}>Cancelar</button>
        </div>
    );
};

export default Checkout;
