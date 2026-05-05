import { db } from '../firebase/config';
import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    collection,
    serverTimestamp,
    increment
} from 'firebase/firestore';

export interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number; // Index of the correct option
    explanation?: string;
}

export interface InteractivePair {
    id: string;
    left: string;
    right: string;
}

export interface Lesson {
    id: string;
    title: string;
    duration: string;
    asset_type: 'video' | '3d_model' | 'audio_story' | 'portfolio' | 'simulator' | 'quiz' | 'interactive' | 'ar_vr' | 'reading';

    // Video/Reading specific
    videoUrl?: string; // Also used for direct video links
    pdfUrl?: string;

    // Quiz/Interactive specific
    questions?: QuizQuestion[];
    pairs?: InteractivePair[];
    instructions?: string;

    // AR/VR & Advanced
    ar_marker_id?: string;
    external_link?: string;
    location_trigger?: { lat: number; lng: number; radius: number };
}

export interface Course {
    id: string;
    title: string;
    description?: string;
    lessons: Lesson[];

    // Marketing & Sales
    tagline?: string;
    promoVideoUrl?: string;
    promoImages?: string[];
    price?: number;
    benefits?: string[];
    targetAudience?: string;
    marketingCopy?: string;
    status: 'draft' | 'active' | 'archived';
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
     * Marca una lección como completada y registra métricas de desempeño.
     */
    async completeLesson(userId: string, courseId: string, lessonId: string, performance?: { score?: number, timeSpent?: number, difficulty?: 'easy' | 'medium' | 'hard' }) {
        const progressRef = doc(db, 'user_progress', `${userId}_${courseId}`);
        const userRef = doc(db, 'users', userId);

        await setDoc(progressRef, {
            completedLessons: { [lessonId]: true },
            performanceMetrics: { [lessonId]: performance || {} },
            lastUpdate: serverTimestamp()
        }, { merge: true });

        // Otorgar monedas
        await updateDoc(userRef, {
            coins: increment(25)
        });
    },

    /**
     * Obtiene el progreso y métricas del alumno.
     */
    async getUserProgress(userId: string, courseId: string) {
        const progressRef = doc(db, 'user_progress', `${userId}_${courseId}`);
        const snap = await getDoc(progressRef);
        return snap.exists() ? snap.data() : { completedLessons: {}, performanceMetrics: {} };
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
    },

    /**
     * Crea un curso completo a partir de una estructura (Draft).
     */
    async createCourseFromDraft(draft: any) {
        const courseRef = doc(collection(db, 'courses'));
        const courseId = courseRef.id;

        const lessons = draft.modules.flatMap((mod: any, mIdx: number) =>
            mod.lessons.map((lesson: any, lIdx: number) => ({
                id: `l_${mIdx}_${lIdx}_${Math.random().toString(36).substr(2, 5)}`,
                title: lesson.title,
                asset_type: lesson.type,
                duration: '5:00',
                module_name: mod.title
            }))
        );

        const courseData = {
            id: courseId,
            title: draft.title,
            description: draft.description,
            lessons: lessons,
            status: 'draft',
            created_at: serverTimestamp()
        };

        await setDoc(courseRef, courseData);
        return courseId;
    },

    async updateCourse(courseId: string, data: Partial<Course>) {
        const courseRef = doc(db, 'courses', courseId);
        await updateDoc(courseRef, data);
    },

    /**
     * Genera copy de marketing basado en neuromarketing usando el contenido del curso.
     */
    async generateMarketingAssets(course: Course): Promise<Partial<Course>> {
        const prompt = `
            Eres un experto en Neuromarketing y Copywriting para educación.
            Basado en el siguiente curso, genera una estrategia de venta de alta conversión.
            
            TÍTULO: ${course.title}
            TEMARIO: ${course.lessons.map(l => l.title).join(', ')}
            
            REGLAS:
            - Aplica principios de Neuromarketing (Atención, Emoción, Recordación).
            - Define un Gancho (tagline) irresistible.
            - Lista 4 beneficios reales centrados en el alumno.
            - Describe para quién es el curso.
            - Crea una descripción de venta (marketingCopy) persuasiva usando el modelo AIDA (Atención, Interés, Deseo, Acción).
            
            Responde ESTRICTAMENTE en JSON con este formato:
            {
              "tagline": "...",
              "benefits": ["...", "...", "...", "..."],
              "targetAudience": "...",
              "marketingCopy": "..."
            }
        `;

        try {
            // Reutilizamos el servicio de Gemini si está disponible, o hacemos fetch directo
            // Para mantener consistencia con geminiService.ts:
            const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
            if (!GEMINI_API_KEY) {
                throw new Error("Falta VITE_GEMINI_API_KEY");
            }
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            });

            const data = await response.json();
            const fullText = data.candidates[0].content.parts[0].text;
            const cleanJson = fullText.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(cleanJson);
        } catch (error) {
            console.error("Error generating marketing assets:", error);
            throw error;
        }
    }
};
