import { SkuId } from "@/lib/types";

export const SITE_NAV = [
  { href: "/", label: "Inicio" },
  { href: "/learning", label: "Learning" },
  { href: "/certificacion", label: "Certification" },
  { href: "/consulting", label: "Consulting" },
  { href: "/diagnostico-rh", label: "Diagnostico" },
  { href: "/cuenta", label: "Cuenta" }
] as const;

export const LEAD_SERVICE_OPTIONS = [
  "Cademmy Learning",
  "Cademmy Certification",
  "Cademmy Consulting",
  "Diagnostico consultivo",
  "Soporte de cuenta",
  "Proyecto corporativo"
] as const;

export const BOOKING_SERVICE_OPTIONS = [
  "Diagnostico consultivo",
  "Cademmy Learning",
  "Cademmy Certification",
  "Cademmy Consulting",
  "Soporte de cuenta"
] as const;

export const HOME_PILLARS = [
  {
    title: "Una cuenta para todo tu avance",
    description:
      "El usuario compra o contrata un servicio y lo encuentra en su cuenta: contenido, seguimiento, entregables y proximos pasos."
  },
  {
    title: "Soluciones conectadas, no productos aislados",
    description:
      "Learning, Certification y Consulting comparten identidad, datos y experiencia para acompanarte desde la habilidad hasta el resultado."
  },
  {
    title: "Evidencia para decidir mejor",
    description:
      "Cada servicio esta pensado para dejar claridad: que se compro, que sigue, quien participa y que evidencia se genera."
  }
] as const;

export const B2B_PAIN_POINTS = [
  {
    title: "El aprendizaje no se traduce en ejecucion",
    description:
      "Se invierte en cursos o talleres, pero cuesta demostrar que la habilidad cambio la forma de trabajar."
  },
  {
    title: "Hay servicios dispersos y poca continuidad",
    description:
      "Capacitacion, certificacion y consultoria viven separados; el usuario pierde claridad sobre su avance y compromisos."
  },
  {
    title: "La decision necesita evidencia",
    description:
      "Direccion, RH, Finanzas u Operaciones necesitan ver trazabilidad, entregables y proximos pasos antes de invertir mas."
  }
] as const;

export const B2B_SOLUTIONS = [
  {
    title: "Cademmy Learning",
    description:
      "Cursos online, presenciales e hibridos para adquirir habilidades practicas con acceso desde cuenta."
  },
  {
    title: "Cademmy Certification",
    description:
      "Certificaciones laborales y profesionales con proceso, evidencia y seguimiento visible."
  },
  {
    title: "Cademmy Consulting",
    description:
      "Consultoria para convertir problemas de negocio en diagnosticos, planes, entregables y resultados medibles."
  }
] as const;

export const CORPORATE_METHOD = [
  "Entendemos la necesidad antes de recomendar un servicio.",
  "Conectamos aprendizaje, certificacion o consultoria segun el resultado esperado.",
  "Dejamos el acceso, el seguimiento y los siguientes pasos dentro de la cuenta Cademmy."
] as const;

export const CERTIFICATION_OFFERS: Array<{
  sku: Extract<SkuId, "EC0217_01" | "EC0301" | "EC0366">;
  code: string;
  title: string;
  summary: string;
  audience: string;
  publicPriceEnv: string;
  outcomes: string[];
}> = [
  {
    sku: "EC0217_01",
    code: "EC0217.01",
    title: "Imparticion de cursos con apoyo de IA",
    summary:
      "Ruta para instructores y facilitadores que necesitan modernizar su practica y documentar competencias con respaldo formal.",
    audience: "Instructores, formadores internos y consultores que ya imparten capacitacion.",
    publicPriceEnv: "NEXT_PUBLIC_CERT_PRICE_EC0217_01",
    outcomes: [
      "Preparacion y evidencia organizadas desde la cuenta.",
      "Proceso de evaluacion claro y acompanado.",
      "Seguimiento posterior al pago sin perder contexto."
    ]
  },
  {
    sku: "EC0301",
    code: "EC0301",
    title: "Diseno de cursos presenciales grupales",
    summary:
      "Enfoque en estructuracion didactica, secuencia de sesion y documentacion de resultados para cursos presenciales.",
    audience: "Docentes, capacitadores internos y disenadores instruccionales con operacion grupal.",
    publicPriceEnv: "NEXT_PUBLIC_CERT_PRICE_EC0301",
    outcomes: [
      "Objetivos, actividades y evidencias mejor estructuradas.",
      "Materiales y encuadres mas solidos para sesiones grupales.",
      "Mayor trazabilidad frente a clientes, auditoria o direccion."
    ]
  },
  {
    sku: "EC0366",
    code: "EC0366",
    title: "Desarrollo de cursos de formacion en linea",
    summary:
      "Ruta para estructurar experiencias digitales con claridad pedagogica, recursos y evaluacion.",
    audience: "Profesionales que construyen cursos virtuales o hibridos para clientes, empresas o instituciones.",
    publicPriceEnv: "NEXT_PUBLIC_CERT_PRICE_EC0366",
    outcomes: [
      "Secuencia, recursos y actividades mejor conectadas.",
      "Criterios de evidencia adaptados a entornos digitales.",
      "Acceso centralizado para preparar y dar seguimiento."
    ]
  }
] as const;
