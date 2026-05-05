import { DiagnosisAnswers, DiagnosisResult, DiagnosisRisk } from "@/lib/types";

export const DIAGNOSIS_OPTIONS = {
  role: ["Direccion RH", "Capacitacion", "Operaciones", "Direccion general", "Otro"],
  company_size: ["1-50", "51-200", "201-500", "500+"],
  instructors_type: ["Equipo interno", "Proveedor externo", "Mixto"],
  transfer_verification: ["Solo actividad", "Evaluacion teorica", "Observacion en campo", "KPIs de desempeno"],
  onboarding_speed: ["No cumple con la operacion", "Cumple con variabilidad", "Cumple y esta estandarizado"],
  variability_pain: ["Alta variabilidad entre instructores", "Variabilidad moderada", "Variabilidad baja"],
  budget_range: ["Menos de 25 mil MXN", "25 a 50 mil MXN", "50 a 150 mil MXN", "Mas de 150 mil MXN"]
} as const;

export function calculateDiagnosisRisk(answers: DiagnosisAnswers): DiagnosisRisk {
  const highRisk =
    answers.variability_pain.includes("Alta") ||
    answers.onboarding_speed.includes("No cumple");

  if (highRisk) return "alto";

  const mediumRisk =
    answers.transfer_verification.includes("Solo actividad") ||
    answers.transfer_verification.includes("teorica") ||
    answers.variability_pain.includes("moderada");

  if (mediumRisk) return "medio";

  return "bajo";
}

export function buildDiagnosisResult(answers: DiagnosisAnswers): DiagnosisResult {
  const risk = calculateDiagnosisRisk(answers);

  if (risk === "alto") {
    return {
      risk,
      headline: "Riesgo alto de inconsistencia en la solucion actual",
      summary:
        "Tu operacion parece depender demasiado de criterios individuales. Eso suele traducirse en avance irregular, tiempos de implementacion mas lentos y dificultad para defender resultados ante direccion.",
      implications: [
        "La experiencia cambia segun quien ejecuta o acompana.",
        "El avance puede quedar fuera del ritmo que exige la operacion.",
        "La conversacion con direccion se vuelve reactiva porque faltan evidencias consistentes."
      ],
      actionPlan: [
        "Definir si conviene Learning, Certification, Consulting o una combinacion.",
        "Establecer instrumentos de evidencia y seguimiento.",
        "Alinear servicio, acceso en cuenta y proximos pasos de implementacion."
      ],
      recommendedService: "Cademmy Consulting",
      ctaLabel: "Agendar diagnostico",
      ctaHref: "/agendar"
    };
  }

  if (risk === "medio") {
    return {
      risk,
      headline: "Hay avance, pero todavia no es defendible del todo",
      summary:
        "Ya existe una base de trabajo, pero la medicion sigue concentrada en actividad o conocimiento teorico. El siguiente salto es demostrar aplicacion real y consistencia.",
      implications: [
        "La direccion puede percibir valor, pero no necesariamente aplicacion real.",
        "Las areas usuarias siguen dependiendo de interpretaciones locales.",
        "La evidencia todavia no alcanza para una lectura completa de impacto."
      ],
      actionPlan: [
        "Fortalecer medicion en campo y criterios de observacion.",
        "Convertir la practica en un estandar mas repetible.",
        "Disenar un mapa minimo de indicadores."
      ],
      recommendedService: "Cademmy Learning",
      ctaLabel: "Revisar la propuesta contigo",
      ctaHref: "/agendar"
    };
  }

  return {
    risk,
    headline: "Tu base es solida, pero aun puede crecer en trazabilidad",
    summary:
      "Parece haber una mejor consistencia de ejecucion. La oportunidad ahora esta en documentar mejor, afinar la trazabilidad y preparar crecimiento con menos friccion.",
    implications: [
      "Existe una base útil para escalar mejores prácticas.",
      "Puedes ordenar la evidencia para defender inversion futura con mayor facilidad.",
      "Hay espacio para optimizar certificaciones o programas especificos."
    ],
    actionPlan: [
      "Identificar qué estándares conviene formalizar primero.",
      "Ajustar instrumentos de seguimiento y consistencia.",
      "Priorizar certificacion, aprendizaje o consultoria segun objetivo del negocio."
    ],
    recommendedService: "Cademmy Certification",
    ctaLabel: "Hablar con Cademmy",
    ctaHref: "/agendar"
  };
}
