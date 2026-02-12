import { db } from '../firebase/config';
import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    collection,
    query,
    where,
    getDocs,
    serverTimestamp,
    increment
} from 'firebase/firestore';

export interface Lesson {
    id: string;
    title: string;
    videoUrl: string;
    duration: string;
    asset_type: 'video' | '3d_model' | 'audio_story' | 'portfolio' | 'simulator';
    ar_marker_id?: string;
    location_trigger?: { lat: number; lng: number; radius: number };
}

export interface Course {
    id: string;
    title: string;
    lessons: Lesson[];
}

export const LMSService = {
    /**
     * Obtiene el contenido de un curso (lessons, quizzes) desde Firestore.
     * Estructura agnóstica para soportar Web, Móvil y VR.
     */
    async getCourseData(courseId: string): Promise<Course | null> {
        const courseRef = doc(db, 'courses', courseId);
        const courseSnap = await getDoc(courseRef);

        if (courseSnap.exists()) {
            return { id: courseSnap.id, ...courseSnap.data() } as Course;
        }
        return null;
    },

    /**
     * Marca una lección como completada y otorga monedas.
     */
    async completeLesson(userId: string, courseId: string, lessonId: string) {
        const progressRef = doc(db, 'user_progress', `${userId}_${courseId}`);
        const userRef = doc(db, 'users', userId);

        await setDoc(progressRef, {
            completedLessons: { [lessonId]: true },
            lastUpdate: serverTimestamp()
        }, { merge: true });

        // Otorgar monedas via incremento atómico
        await updateDoc(userRef, {
            coins: increment(25)
        });
    },

    /**
     * Obtiene el progreso del alumno.
     */
    async getUserProgress(userId: string, courseId: string) {
        const progressRef = doc(db, 'user_progress', `${userId}_${courseId}`);
        const snap = await getDoc(progressRef);
        return snap.exists() ? snap.data() : { completedLessons: {} };
    },

    /**
     * Guarda el resultado del Simulador de IA (Roleplay).
     */
    async saveSimulationResult(userId: string, courseId: string, result: any) {
        const simRef = collection(db, 'simulations');
        await setDoc(doc(simRef), {
            userId,
            courseId,
            result,
            timestamp: serverTimestamp()
        });
    }
};
