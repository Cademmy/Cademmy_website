import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";

// Configuración oficial de Cademmy Plataform
const firebaseConfig = {
    apiKey: "AIzaSyBxdANxynZXGNkdMXijCSWxj5XpP9zUZ5c",
    authDomain: "cademmy-plataform.firebaseapp.com",
    projectId: "cademmy-plataform",
    storageBucket: "cademmy-plataform.firebasestorage.app",
    messagingSenderId: "708624917713",
    appId: "1:708624917713:web:9f2f84a0fa2d7f40d991f0",
    measurementId: "G-873RTWCGVH"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);

export default app;
