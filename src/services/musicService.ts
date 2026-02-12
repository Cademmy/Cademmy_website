import { GamificationService } from './gamificationService';
import { GoogleGenerativeAI } from "@google/generative-ai";

export interface MusicGenerationProgress {
    lyrics: string;
    audioUrl?: string;
    status: 'generating_lyrics' | 'generating_audio' | 'completed' | 'error';
}

/**
 * Orquestador del Sistema de Dos Cerebros (Gemini + Suno).
 * MODO RESILIENCIA TOTAL (V4 + Balance Check)
 */
const SUNO_API_KEY = "4906363e6804085dfb7e6dcf79ef53fc";
const SUNO_BASE_URL = "https://api.sunoapi.org";
const GEMINI_API_KEY = "AIzaSyDPM50JIGjqtxQAYSB2fqsW6CtXbnAcERU";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const SYSTEM_INSTRUCTION = `Actúa como Compositor Pedagógico de ÉLITE y Experto en Neuromarketing. 
Tu misión es crear himnos de aprendizaje memorables que utilicen la psicología de la música para anclar conocimientos.

REGLAS CRÍTICAS DE CALIDAD:
1. NUNCA menciones la palabra "Cademmy" (Marca Blanca).
2. NUNCA incluyas la instrucción inicial (ej: "Crea una canción...") dentro de la letra. Empieza directamente con el contenido.
3. APORTA VALOR REAL: No te limites a mencionar el tema. Incluye al menos 2 datos técnicos, consejos prácticos o pasos del proceso real sobre el tema solicitado.
4. NEUROMNEMOTECNIA: Usa rimas potentes, aliteraciones y ganchos emocionales que faciliten la retención a largo plazo.

ESTRUCTURA OBLIGATORIA:
[Verso 1] - El desafío o problema real (Empatía y contexto técnico).
[Coro] - La solución mnemotécnica (El corazón del aprendizaje, muy pegajoso).
[Verso 2] - Caso práctico o técnica específica (Datos y pasos a seguir).
[Outro] - Cierre de alto impacto para la retención.

ESTILO: Profesional, inspirador y basado en datos. Máximo 180 palabras.`;

export const MusicService = {

    /**
     * Verifica balance y validez de la API Key sin consumir créditos de generación.
     */
    async checkBalance(): Promise<number> {
        console.log("Cerebro 2: Verificando balance de créditos...");
        try {
            const response = await fetch(`${SUNO_BASE_URL}/api/v1/generate/credit`, {
                headers: { 'Authorization': `Bearer ${SUNO_API_KEY}` }
            });
            const data = await response.json();

            // Si el servidor responde 401, el Key es rechazado por el navegador
            if (data.code === 401) {
                throw new Error(`Llave rechazada por el servidor (401). Verifica que no haya bloqueadores en tu navegador.`);
            }

            if (data.code !== 200) {
                throw new Error(data.msg || "Error verificando créditos");
            }

            return data.data;
        } catch (error: any) {
            console.error("Error de Auth Suno:", error);
            throw error;
        }
    },

    async generatePedagogicalLyrics(topic: string, intention: string): Promise<string> {
        console.log(`Cerebro 1: Iniciando composición 'Flash' para: ${topic}`);
        const fullPrompt = `${SYSTEM_INSTRUCTION}\nTema: ${topic}\nIntención: ${intention}\nGenera directo la letra:`;

        try {
            const flashModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
            const result = await flashModel.generateContent(fullPrompt);
            const response = await result.response;
            return response.text().trim();
        } catch (error: any) {
            console.error("Cerebro 1 Error Real:", error);
            console.warn("Cerebro 1 Fallback activado.");
            return `[Verso 1]\nCuando el desafío de ${topic} se hace presente,\nnecesitas una mente clara y valiente.\n[Coro]\nCon enfoque y técnica vas a ganar,\nnadie detiene tu forma de avanzar.\n[Verso 2]\nAplica el sistema, mantén la pasión,\nel éxito llega con tu dedicación.`;
        }
    },

    async generateSunoAudio(lyrics: string, genre: string, userId: string, isInstrumental: boolean = false, onProgress?: (percent: number) => void): Promise<string> {
        console.log(`Cerebro 2: Iniciando Modo Resiliencia. Meta: <60s. (Instrumental: ${isInstrumental})`);

        try {
            // 0. Pre-vuelo: Verificar que el navegador y la llave se comuniquen bien (Costo $0)
            const credits = await this.checkBalance();
            console.log(`Seguridad: Llave validada. Créditos actuales: ${credits}`);

            if (onProgress) onProgress(10);

            const controller = new AbortController();
            const dxTimeoutMs = 240000;
            const timeoutId = setTimeout(() => controller.abort(), dxTimeoutMs);

            // 1. Iniciar generación con Motor V4 (Máxima Estabilidad)
            const response = await fetch(`${SUNO_BASE_URL}/api/v1/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${SUNO_API_KEY}`
                },
                body: JSON.stringify({
                    prompt: lyrics,
                    style: genre,
                    title: "Cademmy Instant Track",
                    customMode: true,
                    instrumental: isInstrumental,
                    model: "V4",
                    callBackUrl: "https://cademmy.com/api/webhook/suno",
                    wait_audio: false
                }),
                signal: controller.signal
            });

            const data = await response.json();
            console.log("DEBUG: Suno Generate Response:", data);

            const taskId = data.data?.taskId || data.id || data[0]?.id || data.task_id;

            if (!taskId) {
                const raw = JSON.stringify(data);
                throw new Error(`Suno denegó la tarea (401/400). Respuesta RAW: ${raw}`);
            }

            console.log(`Cerebro 2: Tarea aceptada (ID: ${taskId}).`);
            if (onProgress) onProgress(25);

            // 2. Rush Polling: Captura de Streaming
            let audioUrl = "";
            let attempts = 0;
            const maxAttempts = 60;

            while (attempts < maxAttempts) {
                await new Promise(resolve => setTimeout(resolve, 4000));
                attempts++;

                if (onProgress) {
                    let p = attempts <= 15 ? 25 + Math.floor((attempts / 15) * 65) : 90 + Math.floor(((attempts - 15) / (maxAttempts - 15)) * 9);
                    onProgress(Math.min(99.5, p));
                }

                try {
                    const checkResponse = await fetch(`${SUNO_BASE_URL}/api/v1/generate/record-info?taskId=${taskId}`, {
                        headers: { 'Authorization': `Bearer ${SUNO_API_KEY}` },
                        signal: controller.signal
                    });
                    const checkData = await checkResponse.json();
                    const task = checkData.data;

                    const status = (task?.status || "").toString().toUpperCase();
                    // Extraer URL del primer elemento de sunoData si existe
                    const audioUrlFromTask = task?.response?.sunoData?.[0]?.audioUrl;

                    console.log(`V4 Polling [${status}]`, audioUrlFromTask ? "Audio URL detectada" : "En proceso...");

                    if (status === 'SUCCESS' && audioUrlFromTask) {
                        audioUrl = audioUrlFromTask;
                        if (onProgress) onProgress(100);
                        break;
                    } else if (status === 'FAILED') {
                        throw new Error(task.errorMessage || "Suno falló en la síntesis de este audio.");
                    }
                } catch (e: any) {
                    if (e.name === 'AbortError') throw new Error("Tiempo máximo superado (8 min).");
                    console.warn(`Reintento ${attempts}...`, e.message);
                }
            }

            if (!audioUrl) throw new Error("No se capturó audio en el tiempo límite.");

            clearTimeout(timeoutId);

            // Gamificación en segundo plano (no bloqueante) para evitar retrasos en UI
            GamificationService.addInterestTag(userId, "Música IA").catch(e => console.warn("Tag fail:", e));
            GamificationService.addCoins(userId, 50, "Cadenmy Instant Track").catch(e => console.warn("Coins fail:", e));

            return audioUrl;
        } catch (error: any) {
            console.error("DIAGNÓSTICO FINAL:", error);
            throw error;
        }
    }
};
