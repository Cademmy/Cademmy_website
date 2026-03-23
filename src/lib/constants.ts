import { SkuId } from "@/lib/types";

export const SERVICES = [
  { slug: "consultoria", name: "Consultoria", summary: "Diagnóstico e implementación para acelerar resultados." },
  { slug: "capacitacion-coaching", name: "Capacitación y Coaching", summary: "Programas prácticos para líderes y equipos." },
  { slug: "cursos-en-linea", name: "Cursos en Línea", summary: "Formación flexible con enfoque en aplicación real." },
  { slug: "certificacion-competencias", name: "Certificación de Competencias", summary: "Procesos de certificación laboral con validez y trazabilidad." },
  { slug: "talento-capital-humano", name: "Talento y Capital Humano", summary: "Atracción, evaluación y desarrollo de talento." },
  { slug: "learn-hub", name: "Learn Hub", summary: "Comunidad y plataforma e-learning para aprendizaje continuo." }
] as const;

export const PACKAGES: Array<{
  sku: SkuId;
  name: string;
  priceMXN: number;
  description: string;
}> = [
  {
    sku: "DISCOVERY_CALL_DEPOSIT",
    name: "Depósito Sesión Diagnóstico",
    priceMXN: 1500,
    description: "Reserva prioritaria y diagnóstico inicial con plan de acción."
  },
  {
    sku: "CONSULTING_SPRINT",
    name: "Consulting Sprint",
    priceMXN: 25000,
    description: "Sprint intensivo para resolver un reto estratégico en 2-4 semanas."
  },
  {
    sku: "TEAM_TRAINING_PACK",
    name: "Pack Capacitación de Equipo",
    priceMXN: 32000,
    description: "Formación aplicada para equipos con sesiones y materiales estructurados."
  },
  {
    sku: "CERTIFICATION_ENROLLMENT",
    name: "Inscripción Certificación",
    priceMXN: 8900,
    description: "Ruta de evaluación, evidencia y acompañamiento para certificación."
  }
];

export const SITE_NAV = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/paquetes", label: "Paquetes" },
  { href: "/agendar", label: "Agendar" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" }
];
