import { roleplayWithAI } from './geminiService';

export interface CourseDraft {
    title: string;
    description: string;
    modules: {
        title: string;
        lessons: {
            title: string;
            type: 'video' | 'quiz' | 'interactive' | 'reading';
        }[];
    }[];
}

export const CourseScannerService = {
    /**
     * Envía el texto extraído del documento a Gemini para diseñar la estructura del curso.
     */
    async analyzeCurriculum(docText: string): Promise<CourseDraft> {
        const systemPrompt = `
        MISIÓN: ERES UN "DISEÑADOR INSTRUCCIONAL 5.0".
        Tu tarea es estructurar un curso a partir de un documento de temario, distinguiendo claramente entre INFORMACIÓN GENERAL y CONTENIDO ACADÉMICO.

        REGLAS DE CLASIFICACIÓN (CRÍTICO):
        1. SECCIONES DE INFORMACIÓN: NO SON MÓDULOS. 
           - Los encabezados como "Objetivo General", "Objetivos Particulares", "Tabla de Contenidos", "Introducción", "Presentación" o "Justificación" NO deben ser módulos.
           - Extrae la esencia de estas partes y ponla en el campo "description" del JSON.
        2. MÓDULOS (Nivel 1): Solo las unidades que contienen temas de estudio. Suelen llevar números (Módulo I, Tema 1, Unidad 4). 
           - Mantén el título EXACTO del documento (ej. "Módulo I: Introducción a la IA").
        3. LECCIONES (Nivel 2): Los temas y subtemas dentro de cada módulo.
           - Mantén el texto EXACTO (ej. "1.1 Historia de las Redes Neuronales").
        4. asset_type: 'video' | 'reading' | 'quiz'.

        CUALQUIER RESUMEN O CAMBIO DE PALABRA ESTÁ PROHIBIDO.

        FORMATO JSON:
        {
            "title": "Título exacto",
            "description": "Descripción literal",
            "modules": [
                {
                    "title": "Título Original Módulo",
                    "lessons": [
                        { "title": "Texto Exacto del Documento", "type": "video | reading | quiz | interactive" }
                    ]
                }
            ]
        }
        `;

        if (!docText || docText.trim().length < 50) {
            throw new Error("El documento parece estar vacío o tiene muy poco texto para analizar.");
        }

        try {
            const aiResponse = await roleplayWithAI(systemPrompt, `TEMARIO DEL DOCUMENTO:\n\n${docText}`);
            console.log("Gemini Raw Response:", aiResponse);

            const cleanJson = (text: string) => {
                const start = text.indexOf('{');
                const end = text.lastIndexOf('}');
                if (start === -1 || end === -1) return text;
                return text.substring(start, end + 1);
            };

            const jsonToParse = cleanJson(aiResponse);

            try {
                return JSON.parse(jsonToParse);
            } catch (parseError) {
                console.error("JSON Parse Error:", parseError, "Cleaned Content:", jsonToParse);
                throw new Error("La IA no devolvió un formato válido. Reintenta con otro archivo.");
            }
        } catch (error: any) {
            console.error("CourseScanner Error:", error);
            const detail = error.message || "Error desconocido";
            if (detail.includes("API Key") || detail.includes("403") || detail.includes("401")) {
                throw new Error(`Error de Autenticación: La llave de acceso (API Key) no es válida o ha expirado. [Detalle: ${detail}]`);
            }
            throw new Error(`Error en la conexión con la IA: ${detail}`);
        }
    }
};
