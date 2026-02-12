import { db } from '../firebase/config';
import {
    doc,
    runTransaction,
    collection,
    serverTimestamp,
    getDoc
} from 'firebase/firestore';

export type TransactionType = 'REWARD' | 'PURCHASE' | 'ADJUSTMENT';

export const WalletService = {
    /**
     * Agrega o resta fondos al balance del usuario de forma atómica.
     * Registra la transacción en el historial.
     */
    async updateBalance(userId: string, amount: number, type: TransactionType, source: string) {
        const userRef = doc(db, 'users', userId);
        const transactionRef = collection(db, 'wallet_transactions');

        try {
            await runTransaction(db, async (transaction) => {
                const userDoc = await transaction.get(userRef);

                if (!userDoc.exists()) {
                    throw new Error("El usuario no existe en Firestore.");
                }

                const currentBalance = userDoc.data().coins || 0;
                const newBalance = currentBalance + amount;

                if (newBalance < 0) {
                    throw new Error("Saldo insuficiente para realizar esta operación.");
                }

                // Actualizar saldo del usuario
                transaction.update(userRef, { coins: newBalance });

                // Registrar transacción
                const transData = {
                    user_id: userId,
                    amount: amount,
                    type: type,
                    source: source,
                    timestamp: serverTimestamp()
                };

                const newTransRef = doc(transactionRef);
                transaction.set(newTransRef, transData);
            });

            console.log(`Billetera actualizada: ${amount} CADs (${type}) por ${source}`);
            return true;
        } catch (error) {
            console.error("Error al actualizar la billetera:", error);
            throw error;
        }
    },

    /**
     * Obtiene el saldo actual del usuario desde Firestore.
     */
    async getBalance(userId: string): Promise<number> {
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            return userSnap.data().coins || 0;
        }
        return 0;
    }
};
