import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/config';
import { roleplayWithAI } from './geminiService';
import { Lesson } from './lmsService';
import * as pdfjsLib from 'pdfjs-dist';
// @ts-ignore
import mammoth from 'mammoth';
// @ts-ignore
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export interface UploadProgress {
    fileName: string;
    progress: number;
    status: 'uploading' | 'completed' | 'error';
}

export const MaterialAIService = {
    async extractText(file: File): Promise<string> {
        return Promise.race([
            new Promise<string>(async (resolve) => {
                try {
                    if (file.type === 'application/pdf') {
                        const arrayBuffer = await file.arrayBuffer();
                        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
                        let text = '';
                        for (let i = 1; i <= Math.min(pdf.numPages, 10); i++) {
                            const page = await pdf.getPage(i);
                            const content = await page.getTextContent();
                            content.items.forEach((item: any) => { text += item.str + ' '; });
                        }
                        resolve(text);
                    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                        const arrayBuffer = await file.arrayBuffer();
                        const result = await mammoth.extractRawText({ arrayBuffer });
                        resolve(result.value.substring(0, 15000));
                    } else {
                        resolve("");
                    }
                } catch (e) {
                    console.error("Error al extraer texto:", e);
                    resolve("");
                }
            }),
            new Promise<string>((resolve) => setTimeout(() => {
                console.warn("Extracción ignorada por tardar demasiado: " + file.name);
                resolve("");
            }, 8000))
        ]);
    },

    /**
     * Sube múltiples archivos a Firebase Storage y devuelve sus metadatos + texto extraído
     */
    async uploadFiles(
        courseId: string, 
        files: File[], 
        onProgress?: (progresses: UploadProgress[]) => void
    ): Promise<{ name: string; url: string; type: string; size: number, extractedText: string }[]> {
        const results: { name: string; url: string; type: string; size: number, extractedText: string }[] = [];
        const progresses: UploadProgress[] = files.map(f => ({ fileName: f.name, progress: 0, status: 'uploading' }));

        const notifyProgress = () => {
            if (onProgress) onProgress([...progresses]);
        };

        const uploadPromises = files.map((file, index) => {
            return new Promise<void>(async (resolve, reject) => {
                let extractedText = "";
                try {
                    extractedText = await MaterialAIService.extractText(file);
                } catch (err) {
                    console.error("Fallo inesperado al extraer texto", err);
                }

                // Ensure unique name
                const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
                const path = `courses/${courseId}/materials/${Date.now()}_${safeName}`;
                const storageRef = ref(storage, path);
                
                try {
                    progresses[index].progress = 10;
                    notifyProgress();

                    const uploadResult = await uploadBytes(storageRef, file);
                    
                    progresses[index].progress = 60;
                    notifyProgress();
                    
                    const downloadURL = await getDownloadURL(uploadResult.ref);
                    
                    progresses[index].progress = 100;
                    progresses[index].status = 'completed';
                    notifyProgress();
                    
                    results.push({
                        name: file.name,
                        url: downloadURL,
                        type: file.type,
                        size: file.size,
                        extractedText
                    });
                    resolve();
                } catch (error) {
                    console.error("Fallo durante la subida en Firebase:", error);
                    progresses[index].status = 'error';
                    notifyProgress();
                    reject(error);
                }
            });
        });

        await Promise.all(uploadPromises);
        return results;
    },

    /**
     * Utiliza la IA para organizar archivos en Unidades/Lecciones
     */
    async organizeMaterialsWithAI(courseTitle: string, uploadedFiles: { name: string; url: string; type: string, extractedText: string }[]): Promise<Lesson[]> {
        const systemPrompt = `
        Eres un Diseñador Instruccional de IA. Tu misión es crear la estructura de unidades para el curso "${courseTitle}" procesando EXCLUSIVAMENTE los archivos que el usuario acaba de subir.
        
        INSTRUCCIÓN VITAL DE ESQUEMAS:
        Si ves que uno o más archivos tienen contenido de texto ("Contenido detectado: [texto]"), revísalo cuidadosamente: si parece un "esquema", "temario", o "tabla de contenidos" de Módulos u Objetivos, **usa ese esquema como esqueleto maestro**. Y luego haz tu mejor esfuerzo para colocar el resto de los archivos interactivos y multimedia (mp4, jpg) en ese esquema.

        REGLAS Tipos de Activo (asset_type):
        - 'video': Archivos mp4, mov, avi, etc.
        - 'reading': Archivos pdf, docx, pptx.
        - 'interactive': Imágenes jpg, png, gif, u otros no mencionados.
        - 'quiz': Si el nombre del archivo contiene palabras como "quiz", "examen", "test".

        JSON VÁLIDO REQUERIDO:
        Debe devolver un objeto JSON estricto con la siguiente estructura:
        {
          "lessons": [
            {
               "title": "Unidad 1 - Título Profesional Atractivo",
               "asset_type": "video",
               "originalFileName": "nombre_exacto_del_archivo_subido.ext"
            }
          ]
        }
        Asegúrate de incluir TODOS los archivos proporcionados, sin omitir ninguno.
        `;

        const fileSummary = uploadedFiles.map((f, i) => {
             let txt = `${i + 1}. Archivo: ${f.name} (Tipo: ${f.type})`;
             if (f.extractedText && f.extractedText.length > 5) {
                 txt += `\n   Contenido detectado: ${f.extractedText.substring(0, 3000)}`;
             }
             return txt;
        }).join('\n\n--- ARCHIVO SEPARADOR ---\n\n');
        
        try {
            const aiResponse = await roleplayWithAI(systemPrompt, `ARCHIVOS SUBIDOS A ORGANIZAR:\n${fileSummary}`);
            
            const cleanJson = (text: string) => {
                const start = text.indexOf('{');
                const end = text.lastIndexOf('}');
                if (start === -1 || end === -1) return text;
                return text.substring(start, end + 1);
            };

            const jsonToParse = cleanJson(aiResponse);
            const parsed = JSON.parse(jsonToParse);
            
            if (!parsed.lessons || !Array.isArray(parsed.lessons)) {
                throw new Error("Estructura devuelta por IA no contiene el arreglo 'lessons'.");
            }

            // Map URLs y construir los objetos Lesson finales
            return parsed.lessons.map((lesson: any) => {
                const fileRef = uploadedFiles.find(f => f.name === lesson.originalFileName);
                
                return {
                    id: Math.random().toString(36).substr(2, 9),
                    title: lesson.title || lesson.originalFileName,
                    duration: 'Estimado 10:00', 
                    asset_type: lesson.asset_type || 'reading',
                    videoUrl: lesson.asset_type === 'video' ? fileRef?.url : undefined,
                    pdfUrl: lesson.asset_type === 'reading' ? fileRef?.url : undefined,
                    external_link: (lesson.asset_type === 'interactive' || lesson.asset_type === 'quiz') ? fileRef?.url : undefined,
                } as Lesson;
            });

        } catch (error) {
            console.error("MaterialAIService Error:", error);
            throw new Error("No se pudo estructurar el currículum con Inteligencia Artificial. Por favor revisa los archivos.");
        }
    }
};
