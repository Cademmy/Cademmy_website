/**
 * geminiService.ts
 * Integración SEGURA con la API de Gemini Pro a través de Cloud Functions.
 */
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase/config";

export interface ArchitectProject {
    title: string;
    description: string;
    objectives: string[];
    kpi_expected: string;
    estimated_duration: string;
    estimated_roi: string;
    suggested_technologies: string[];
}

export interface ArchitectResponse {
    success: boolean;
    chatText: string;
    projectData?: ArchitectProject;
    error?: string;
}

const SYSTEM_PROMPT = `
Eres el "Arquitecto de Transformación Cademmy 5.0". Tu objetivo es diseñar soluciones educativas disruptivas basadas en IA y Mnemotecnia.
Cuando el usuario te cuente una necesidad, responde de forma profesional e inspiradora.

REQUISITO CRÍTICO:
Debes devolver tu respuesta en DOS PARTES separadas por el delimitador "|||JSON_DATA|||".
1. La primera parte es un mensaje de chat alentador y profesional.
2. La segunda parte es un objeto JSON estrictamente válido con la siguiente estructura:
{
  "title": "Nombre del Proyecto",
  "description": "Breve descripción técnica",
  "objectives": ["Obj 1", "Obj 2", "Obj 3"],
  "kpi_expected": "Métrica de éxito",
  "estimated_duration": "X meses",
  "estimated_roi": "X%",
  "suggested_technologies": ["IA", "VR", "Gamificación"]
}

No incluyas markdown adicionales fuera del bloque de JSON después del delimitador.
`;

/**
 * Llama a la Cloud Function segura para diseñar el proyecto.
 */
export const designProjectWithIA = async (userRequirement: string): Promise<ArchitectResponse> => {
    try {
        const generateGeminiContent = httpsCallable(functions, 'generateGeminiContent');
        
        const result: any = await generateGeminiContent({
            prompt: `REQUERIMIENTO DEL USUARIO: ${userRequirement}`,
            systemInstruction: SYSTEM_PROMPT
        });

        const fullText = result.data.text;
        const [chatPart, jsonPart] = fullText.split('|||JSON_DATA|||');

        let projectData: ArchitectProject | undefined;
        if (jsonPart) {
            try {
                const cleanJson = jsonPart.replace(/```json/g, '').replace(/```/g, '').trim();
                projectData = JSON.parse(cleanJson);
            } catch (jsonErr) {
                console.error("Error parseando JSON de Gemini:", jsonErr);
            }
        }

        return {
            success: true,
            chatText: chatPart.trim(),
            projectData
        };

    } catch (error: any) {
        console.error("Gemini Cloud Function Error:", error);
        return {
            success: false,
            chatText: "Lo siento, tuve un problema al procesar tu arquitectura de forma segura. Intenta de nuevo.",
            error: error.message
        };
    }
};

/**
 * Llama a la Cloud Function segura para roleplay genérico.
 */
export const roleplayWithAI = async (systemPrompt: string, userMessage: string): Promise<string> => {
    try {
        const generateGeminiContent = httpsCallable(functions, 'generateGeminiContent');
        
        const result: any = await generateGeminiContent({
            prompt: `MENSAJE DEL USUARIO: ${userMessage}`,
            systemInstruction: systemPrompt
        });

        return result.data.text;

    } catch (error: any) {
        console.error("Roleplay Cloud Function Error:", error);
        throw error;
    }
};
