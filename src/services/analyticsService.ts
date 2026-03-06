export type CademmyEvent =
    | 'view_checklist_landing'
    | 'complete_risk_score'
    | 'download_checklist'
    | 'start_diagnosis'
    | 'complete_diagnosis'
    | 'click_booking'
    | 'booking_confirmed'
    | 'purchase_pack'
    | 'module_completed'
    | 'simulation_win'
    | 'coins_redeemed';

export const AnalyticsService = {
    /**
     * Registra un evento de conversión o interacción.
     * En esta fase guardamos los eventos en Firestore para análisis posterior 
     * y podemos conectar con GA4/Meta Pixel si se requiere.
     */
    logEvent(eventName: CademmyEvent, data?: any) {
        console.log(`[Analytics] Event: ${eventName}`, data || '');

        // Aquí podríamos disparar eventos a Google Analytics o Facebook Pixel
        if (typeof (window as any).gtag === 'function') {
            (window as any).gtag('event', eventName, data);
        }

        // También podemos guardar en Firestore para reportes dentro del admin
    }
};
