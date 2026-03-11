/**
 * paymentService.ts
 * Integración híbrida de pagos Cademmy 5.0 (Stripe + PayPal)
 */

export interface PaymentIntent {
    amount: number;
    currency: string;
    description: string;
    customerEmail?: string;
}

export const PaymentService = {
    STRIPE_PUBLIC_KEY: import.meta.env.VITE_STRIPE_PUBLIC_KEY,
    PAYPAL_CLIENT_ID: import.meta.env.VITE_PAYPAL_CLIENT_ID,

    /**
     * Inicia el flujo de pago con Stripe (Pasarela Principal)
     */
    async initiateStripePayment(intent: PaymentIntent) {
        console.log("Iniciando pago con Stripe para:", intent);
        // Simulación de creación de session de Stripe
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true, url: "https://checkout.stripe.com/pay/mock_session" });
            }, 1000);
        });
    },

    /**
     * Inicia el flujo de pago con PayPal (Pasarela Secundaria)
     */
    async initiatePayPalPayment(intent: PaymentIntent) {
        console.log("Iniciando pago con PayPal para:", intent);
        // Simulación de creación de orden de PayPal
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true, orderId: "PAYPAL-MOCK-ID" });
            }, 1000);
        });
    }
};

export default PaymentService;
