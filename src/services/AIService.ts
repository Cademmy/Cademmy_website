/**
 * AIService.ts
 * Capa de abstracción para conexiones con servicios de IA externos.
 * Actualmente implementa lógica de simulación, pero está estructurada 
 * para ser reemplazada por llamadas a Google AI Studio o APIs de Música.
 */

export interface GenerationParams {
    mood: string;
    objective: string;
    duration: string;
    format: string;
    voice: string;
}

export interface GenerationResponse {
    success: boolean;
    data?: {
        title: string;
        description: string;
        audioUrl: string;
        lyrics: string;
    };
    error?: string;
}

const AI_SERVICE_MOCK_DELAY = 4000;

import { MusicService } from './musicService';

export const generateSongIA = async (params: GenerationParams): Promise<GenerationResponse> => {
    try {
        const { objective, mood, format, voice } = params;
        const lyrics = await MusicService.generatePedagogicalLyrics(objective, `Motivar y transmitir un ambiente ${mood}`);

        let audioUrl = "";
        if (format === 'Canción') {
            audioUrl = await MusicService.generateSunoAudio(lyrics, `${mood} ${voice} vocals`, "public_user");
        } else {
            audioUrl = await MusicService.generateSunoAudio(`[Instrumental] ${objective}`, `${mood} ambient`, "public_user");
        }

        return {
            success: true,
            data: {
                title: `Sintonía Cademmy: ${objective.substring(0, 30)}`,
                description: `Composición ${format} en modo ${mood} con voz ${voice}.`,
                audioUrl,
                lyrics
            }
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || "Error al conectar con los motores de IA."
        };
    }
};
