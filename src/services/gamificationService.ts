import { db } from '../firebase/config';
import { doc, updateDoc, increment, getDoc, setDoc } from 'firebase/firestore';

export interface UserProfile {
    uid: string;
    email: string;
    cademmyCoins: number;
    interestTags: string[];
    userType: 'professional' | 'company';
}

/**
 * Servicio para gestionar la economía de Cademmy Coins y el perfilado de datos (CRM).
 */
export const GamificationService = {

    /**
     * Incrementa monedas por acciones específicas (Triggers).
     */
    async addCoins(userId: string, amount: number, actionName: string) {
        const userRef = doc(db, "users", userId);
        try {
            await updateDoc(userRef, {
                cademmyCoins: increment(amount),
                lastAction: actionName,
                lastActionTimestamp: new Date()
            });
            console.log(`+${amount} Cademmy Coins ganadas por: ${actionName}`);
        } catch (error) {
            console.error("Error al actualizar coins:", error);
        }
    },

    /**
     * Taggea al usuario según su comportamiento (AEO/CRM).
     * Ej: "Música de Relajación" -> Tag "Bienestar"
     */
    async addInterestTag(userId: string, tag: string) {
        const userRef = doc(db, "users", userId);
        try {
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
                const currentTags = userSnap.data().interestTags || [];
                if (!currentTags.includes(tag)) {
                    await updateDoc(userRef, {
                        interestTags: [...currentTags, tag]
                    });
                }
            }
        } catch (error) {
            console.error("Error al actualizar tags de interés:", error);
        }
    },

    /**
     * Deducción de monedas para descuentos.
     */
    async spendCoins(userId: string, amount: number) {
        const userRef = doc(db, "users", userId);
        try {
            await updateDoc(userRef, {
                cademmyCoins: increment(-amount)
            });
        } catch (error) {
            console.error("Error al canjear coins:", error);
        }
    }
};
