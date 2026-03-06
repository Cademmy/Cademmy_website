/**
 * geminiService.ts
 * Integración con la API de Gemini Pro para el Módulo "Arquitecto".
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyC46ItNCIvMNJaJO4p5X1YZT6-QDxFV6FY";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

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

export const designProjectWithIA = async (userRequirement: string): Promise<ArchitectResponse> => {
    try {
        const response = await fetch(GEMINI_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `${SYSTEM_PROMPT}\n\nREQUERIMIENTO DEL USUARIO: ${userRequirement}`
                    }]
                }]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || "Error en la API de Gemini");
        }

        const fullText = data.candidates[0].content.parts[0].text;
        const [chatPart, jsonPart] = fullText.split('|||JSON_DATA|||');

        let projectData: ArchitectProject | undefined;
        if (jsonPart) {
            try {
                // Limpiar posibles bloques de markdown si Gemini los añade por error
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
        console.error("Gemini Service Error:", error);
        return {
            success: false,
            chatText: "Lo siento, tuve un problema al procesar tu arquitectura. Intenta de nuevo.",
            error: error.message
        };
    }
};

export const roleplayWithAI = async (systemPrompt: string, userMessage: string): Promise<string> => {
    try {
        const response = await fetch(GEMINI_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `${systemPrompt}\n\nMENSAJE DEL USUARIO: ${userMessage}`
                    }]
                }]
            })
        });

        const data = await response.json();
        if (!response.ok) {
            console.error("Gemini API Error Detail:", data);
            throw new Error(data.error?.message || `Error API: ${response.status}`);
        }

        return data.candidates[0].content.parts[0].text;

    } catch (error: any) {
        console.error("Roleplay Error:", error);
        throw error;
    }
};
