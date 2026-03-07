const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions/v2");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const logger = require("firebase-functions/logger");

// Configuración global (Max 10 instancias para control de costos)
setGlobalOptions({ maxInstances: 10, region: "us-central1" });

/**
 * Función para generar contenido con Gemini Pro de forma segura.
 * Utiliza la API Key almacenada en los secretos de Firebase.
 */
exports.generateGeminiContent = onCall({ secrets: ["GEMINI_API_KEY"] }, async (request) => {
    // Verificar autenticación
    if (!request.auth) {
        throw new HttpsError("unauthenticated", "El usuario debe estar autenticado.");
    }

    const { prompt, systemInstruction } = request.data;

    if (!prompt) {
        throw new HttpsError("invalid-argument", "El prompt es obligatorio.");
    }

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            systemInstruction: systemInstruction 
        });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return {
            success: true,
            text: text
        };
    } catch (error) {
        logger.error("Error en Gemini Cloud Function:", error);
        throw new HttpsError("internal", "Error al procesar la solicitud con IA.");
    }
});

/**
 * Placeholder para pagos seguros con Stripe.
 */
exports.createStripePayment = onCall({ secrets: ["STRIPE_SECRET_KEY"] }, async (request) => {
    if (!request.auth) {
        throw new HttpsError("unauthenticated", "No autorizado.");
    }
    
    // Aquí iría la lógica de Stripe
    return { message: "Endpoint de Stripe preparado (Backend seguro)" };
});
