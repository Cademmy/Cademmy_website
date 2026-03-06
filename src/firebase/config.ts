import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";

// Configuración oficial de Cademmy Plataform
const firebaseConfig = {
    apiKey: "AIzaSyAeArweHX9ddCF4kWnuOLx-nUyjRcePoyw",
    authDomain: "cademmy-web-2026.firebaseapp.com",
    projectId: "cademmy-web-2026",
    storageBucket: "cademmy-web-2026.firebasestorage.app",
    messagingSenderId: "834387833224",
    appId: "1:834387833224:web:d75a4eabfe09d2e59d8a3d",
    measurementId: "G-W9YV0B2TWP"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);

export default app;
