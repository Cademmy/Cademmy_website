import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export interface B2BLead {
    role: string;
    company_size: string;
    instructors_type: string;
    transfer_verification: string;
    onboarding_speed: string;
    variability_pain: string;
    budget_range: string;
    company_name: string;
    contact_name: string;
    email: string;
    source: string;
}

export const B2BService = {
    async processDiagnostic(leadData: B2BLead) {
        // 1. Calcular Riesgo
        const scoreRisk = this.calculateRisk(leadData);

        // 2. Guardar en Firestore
        const docRef = await addDoc(collection(db, 'leads_b2b'), {
            ...leadData,
            score_risk: scoreRisk,
            status: 'new',
            created_at: serverTimestamp(),
            strategy: 'SOSTAC_2026'
        });

        // 3. Generar Reporte con IA
        const report = await this.generateAIReport(leadData);

        return {
            id: docRef.id,
            report,
            scoreRisk
        };
    },

    calculateRisk(data: B2BLead) {
        if (data.variability_pain.includes('mucha') || data.onboarding_speed.includes('No')) return 'alto';
        if (data.transfer_verification.includes('No lo medimos') || data.transfer_verification.includes('teórico')) return 'medio';
        return 'bajo';
    },

    async generateAIReport(data: B2BLead) {
        const prompt = `
            MISIÓN: ERES UN CONSULTOR SENIOR EN DESARROLLO ORGANIZACIONAL (DO).
            Tu tarea es analizar los resultados de una Auditoría de Madurez de Capacitación y generar un Plan de Acción de Alto Nivel.
            
            DATOS DE LA AUDITORÍA:
            Empresa: ${data.company_name}
            Rol de Contacto: ${data.role}
            Tamaño: ${data.company_size}
            Modelo de Instructores: ${data.instructors_type}
            Transferencia al Puesto: ${data.transfer_verification}
            Velocidad de Onboarding: ${data.onboarding_speed}
            Variabilidad de Desempeño: ${data.variability_pain}
            Presupuesto: ${data.budget_range}
            
            LÓGICA DE DIAGNÓSTICO (ESTRICTA):
            1. Si detectas Variabilidad Alta o Onboarding Lento -> Diagnostica: "Pérdida financiera crítica por falta de estandarización y dependencia del talento individual".
            2. Si detectas Medición solo por Asistencia/Teórico -> Diagnostica: "Riesgo de Auditoría y Bajo Retorno de Inversión (Nivel 1 Kirkpatrick)".
            
            ESTRUCTURA DEL REPORTE (PROFESIONAL):
            # Reporte de Auditoría de Madurez - ${data.company_name}
            
            ## 1. Diagnóstico de Riesgo Existencial
            (Basado en la lógica anterior, explica el impacto financiero y operativo).
            
            ## 2. Análisis de Brechas Críticas
            (Habla sobre ${data.transfer_verification} y ${data.variability_pain}).
            
            ## 3. Plan de Transformación (30-60-90 días)
            - **Día 30: Estandarización Core** (Certificación Instructor 4.0).
            - **Día 60: Digitalización de Evidencia** (Uso de Tecnología y Simuladores).
            - **Día 90: Medición de ROI** (Modelos de transferencia en campo).
            
            ## 4. Recomendación Estratégica
            Por qué el modelo de Instructor 4.0 + Evidencia Tecnológica es la única forma de eliminar la variabilidad.
            
            TONO: Ejecutivo, consultivo, enfocado en ROI y cumplimiento.
            FORMATO: Markdown limpio.
        `;

        try {
            const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
            if (!GEMINI_API_KEY) {
                throw new Error("Falta VITE_GEMINI_API_KEY");
            }
            // Cambiamos a gemini-1.5-flash para mayor confiabilidad y velocidad
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            });

            if (!response.ok) {
                const errData = await response.json();
                console.error("Gemini API Error:", errData);
                throw new Error(`API returned ${response.status}`);
            }

            const result = await response.json();
            return result.candidates[0].content.parts[0].text;
        } catch (error) {
            console.error("Error generating AI report:", error);
            return "Lo sentimos, hubo un error técnico al generar tu reporte. Sin embargo, hemos capturado tus datos y un Consultor Senior de Cademmy te contactará en las próximas 2 horas para entregarte tu plan de estandarización.";
        }
    }
};
