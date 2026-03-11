import {
    auth,
    db
} from '../firebase/config';
import {
    GoogleAuthProvider,
    OAuthProvider,
    signInWithPopup,
    User
} from 'firebase/auth';
import {
    doc,
    setDoc,
    getDoc,
    serverTimestamp
} from 'firebase/firestore';

export const AuthService = {
    async loginWithGoogle() {
        const provider = new GoogleAuthProvider();
        return this.handleSocialLogin(provider);
    },

    async loginWithMicrosoft() {
        const provider = new OAuthProvider('microsoft.com');
        return this.handleSocialLogin(provider);
    },

    async loginWithApple() {
        const provider = new OAuthProvider('apple.com');
        return this.handleSocialLogin(provider);
    },

    async handleSocialLogin(provider: any) {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            await this.syncUserToFirestore(user);
            return user;
        } catch (error: any) {
            console.error("Auth Social Error:", error);
            throw error;
        }
    },

    async syncUserToFirestore(user: User) {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            await setDoc(userRef, {
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                createdAt: serverTimestamp(),
                lastLogin: serverTimestamp(),
                role: 'user',
                coins: 50 // Bono de bienvenida
            });
        } else {
            await setDoc(userRef, {
                lastLogin: serverTimestamp()
            }, { merge: true });
        }
    },

    async saveLeadProfile(userId: string, leadData: any) {
        const userRef = doc(db, 'users', userId);
        await setDoc(userRef, {
            leadInfo: {
                ...leadData,
                syncedToHubSpot: false,
                updatedAt: serverTimestamp()
            }
        }, { merge: true });

        localStorage.setItem('cademmy_lead_captured', 'true');
        localStorage.setItem('cademmy_lead_info', JSON.stringify(leadData));
    },

    async logout() {
        try {
            await auth.signOut();
            localStorage.removeItem('cademmy_lead_captured');
            localStorage.removeItem('cademmy_lead_info');
            console.log("Sesión cerrada correctamente.");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            throw error;
        }
    }
};
