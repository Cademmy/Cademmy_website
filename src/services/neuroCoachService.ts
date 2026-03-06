import { roleplayWithAI } from './geminiService';

export interface NeuroRecommendation {
    message: string;
    action_label: string;
    action_type: 'repeat_video' | 'extra_exercise' | 'new_course';
    target_id?: string;
}

export const NeuroCoachService = {
    /**
     * Analiza el progreso del usuario y genera una recomendación personalizada.
     */
    async getRecommendation(progress: any, currentLesson: any): Promise<NeuroRecommendation> {
        const metrics = progress.performanceMetrics?.[currentLesson.id] || {};

        const systemPrompt = `
        ERES EL "NEURO-COACH CADEMMY 5.0". Tu misión es analizar el desempeño del aprendiz y recomendar acciones precisas basadas en Neuro-aprendizaje.
        
        PERFIL ACTUAL:
        - Lección: ${currentLesson.title}
        - Desempeño: Score ${metrics.score || 'N/A'}, Dificultad percibida: ${metrics.difficulty || 'N/A'}.
        
        REGLAS DE RECOMENDACIÓN:
        1. Si el score es bajo (<70%), recomienda repetir el video o material para consolidar.
        2. Si el score es alto (>90%) y la dificultad fue "easy", recomienda un curso más avanzado.
        3. Si la dificultad fue "hard", ofrece un ejercicio de reforzamiento.
        
        RESPUESTA:
        Debes responder estrictamente en un formato JSON plano:
        {
            "message": "Mensaje motivador y breve",
            "action_label": "Texto del botón",
            "action_type": "repeat_video" | "extra_exercise" | "new_course",
            "target_id": "opcional"
        }
        `;

        try {
            const aiResponse = await roleplayWithAI(systemPrompt, "Genera mi recomendación basada en mi último desempeño.");
            // Limpiar posibles bloques de markdown
            const cleanJson = aiResponse.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(cleanJson);
        } catch (error) {
            console.error("NeuroCoach Error:", error);
            return {
                message: "¡Vas por buen camino! Sigue explorando las siguientes unidades.",
                action_label: "Continuar Explorando",
                action_type: "extra_exercise"
            };
        }
    }
};
