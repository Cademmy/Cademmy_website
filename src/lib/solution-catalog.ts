import { SkuId, SolutionUnit } from "@/lib/types";

export type SolutionOffer = {
  sku: SkuId;
  unit: SolutionUnit;
  title: string;
  shortTitle: string;
  summary: string;
  audience: string;
  format: string;
  accessUrl: string;
  detailHref: string;
  priceEnv: string;
  paymentLinkEnv: string;
  publicPriceEnv: string;
  outcomes: string[];
};

export const UNIT_META: Record<
  SolutionUnit,
  {
    label: string;
    name: string;
    color: string;
    href: string;
    description: string;
  }
> = {
  learning: {
    label: "Learning",
    name: "Cademmy Learning",
    color: "#1A6FE8",
    href: "/learning",
    description: "Cursos en linea, presenciales e hibridos para desarrollar capacidades practicas."
  },
  certification: {
    label: "Certification",
    name: "Cademmy Certification",
    color: "#1FAD62",
    href: "/certificacion",
    description: "Certificaciones de competencias laborales y profesionales con evidencia verificable."
  },
  consulting: {
    label: "Consulting",
    name: "Cademmy Consulting",
    color: "#E87220",
    href: "/consulting",
    description: "Consultoria profesional para convertir retos de negocio en sistemas de trabajo medibles."
  }
};

export const SOLUTION_OFFERS: SolutionOffer[] = [
  {
    sku: "LEARNING_ONLINE_FOUNDATIONS",
    unit: "learning",
    title: "Ruta de aprendizaje profesional",
    shortTitle: "Ruta profesional",
    summary:
      "Cursos en linea con estructura clara, actividades aplicables y acceso desde tu cuenta para avanzar a tu ritmo.",
    audience: "Profesionales que necesitan aprender una habilidad concreta sin perder trazabilidad de avance.",
    format: "Online",
    accessUrl: "/cuenta?tab=learning",
    detailHref: "/learning",
    priceEnv: "STRIPE_PRICE_LEARNING_ONLINE_FOUNDATIONS",
    paymentLinkEnv: "STRIPE_PAYMENT_LINK_LEARNING_ONLINE_FOUNDATIONS",
    publicPriceEnv: "NEXT_PUBLIC_PRICE_LEARNING_ONLINE_FOUNDATIONS",
    outcomes: [
      "Acceso al contenido desde una cuenta Cademmy.",
      "Lecciones, actividades y recursos organizados por objetivo.",
      "Seguimiento de avance y siguientes pasos visibles."
    ]
  },
  {
    sku: "LEARNING_HYBRID_TEAMS",
    unit: "learning",
    title: "Programa hibrido para equipos",
    shortTitle: "Programa hibrido",
    summary:
      "Experiencia combinada para equipos que requieren sesiones guiadas, recursos digitales y continuidad despues del taller.",
    audience: "Equipos de empresas que necesitan formar capacidades con acompanamiento y evidencia de participacion.",
    format: "Hibrido / presencial",
    accessUrl: "/cuenta?tab=learning",
    detailHref: "/learning",
    priceEnv: "STRIPE_PRICE_LEARNING_HYBRID_TEAMS",
    paymentLinkEnv: "STRIPE_PAYMENT_LINK_LEARNING_HYBRID_TEAMS",
    publicPriceEnv: "NEXT_PUBLIC_PRICE_LEARNING_HYBRID_TEAMS",
    outcomes: [
      "Agenda de sesiones y materiales centralizados.",
      "Acceso posterior a recursos y entregables.",
      "Visibilidad del estado del programa desde la cuenta."
    ]
  },
  {
    sku: "EC0217_01",
    unit: "certification",
    title: "EC0217.01 Imparticion de cursos con apoyo de IA",
    shortTitle: "EC0217.01",
    summary:
      "Certificacion para instructores, facilitadores y formadores que necesitan demostrar competencia con evidencia formal.",
    audience: "Instructores, capacitadores internos, docentes y consultores que ya imparten formacion.",
    format: "Certificacion",
    accessUrl: "/cuenta?tab=certification",
    detailHref: "/certificacion",
    priceEnv: "STRIPE_PRICE_EC0217_01",
    paymentLinkEnv: "STRIPE_PAYMENT_LINK_EC0217_01",
    publicPriceEnv: "NEXT_PUBLIC_CERT_PRICE_EC0217_01",
    outcomes: [
      "Ruta de preparacion y evidencia desde tu cuenta.",
      "Proceso de evaluacion explicado paso a paso.",
      "Seguimiento del estado de certificacion."
    ]
  },
  {
    sku: "EC0301",
    unit: "certification",
    title: "EC0301 Diseno de cursos presenciales grupales",
    shortTitle: "EC0301",
    summary:
      "Certificacion enfocada en planeacion, secuencia didactica, recursos y evaluacion para cursos presenciales.",
    audience: "Capacitadores, disenadores instruccionales y equipos que estructuran sesiones grupales.",
    format: "Certificacion",
    accessUrl: "/cuenta?tab=certification",
    detailHref: "/certificacion",
    priceEnv: "STRIPE_PRICE_EC0301",
    paymentLinkEnv: "STRIPE_PAYMENT_LINK_EC0301",
    publicPriceEnv: "NEXT_PUBLIC_CERT_PRICE_EC0301",
    outcomes: [
      "Instrumentos y evidencias organizadas.",
      "Criterios de evaluacion claros.",
      "Acceso al seguimiento desde el portal."
    ]
  },
  {
    sku: "EC0366",
    unit: "certification",
    title: "EC0366 Desarrollo de cursos de formacion en linea",
    shortTitle: "EC0366",
    summary:
      "Certificacion para estructurar experiencias digitales con claridad pedagogica, recursos y evaluacion.",
    audience: "Profesionales que crean cursos virtuales o hibridos para empresas, clientes o instituciones.",
    format: "Certificacion",
    accessUrl: "/cuenta?tab=certification",
    detailHref: "/certificacion",
    priceEnv: "STRIPE_PRICE_EC0366",
    paymentLinkEnv: "STRIPE_PAYMENT_LINK_EC0366",
    publicPriceEnv: "NEXT_PUBLIC_CERT_PRICE_EC0366",
    outcomes: [
      "Organizacion de evidencias digitales.",
      "Preparacion para evaluacion formal.",
      "Acceso centralizado a materiales y estado."
    ]
  },
  {
    sku: "CONSULTING_DIAGNOSTIC",
    unit: "consulting",
    title: "Diagnostico consultivo Cademmy",
    shortTitle: "Diagnostico consultivo",
    summary:
      "Sesion y lectura inicial para entender necesidades, brechas, prioridades y el siguiente paso de intervencion.",
    audience: "Organizaciones que necesitan claridad antes de comprar capacitacion, certificacion o consultoria amplia.",
    format: "Consultoria inicial",
    accessUrl: "/cuenta?tab=consulting",
    detailHref: "/consulting",
    priceEnv: "STRIPE_PRICE_CONSULTING_DIAGNOSTIC",
    paymentLinkEnv: "STRIPE_PAYMENT_LINK_CONSULTING_DIAGNOSTIC",
    publicPriceEnv: "NEXT_PUBLIC_PRICE_CONSULTING_DIAGNOSTIC",
    outcomes: [
      "Brief de contexto y prioridades.",
      "Agenda de trabajo inicial.",
      "Entregables y proximos pasos visibles en tu cuenta."
    ]
  },
  {
    sku: "CONSULTING_TRANSFORMATION",
    unit: "consulting",
    title: "Proyecto de consultoria profesional",
    shortTitle: "Proyecto consultivo",
    summary:
      "Acompanamiento para areas de RH, Marketing, Diseno, Ingenieria u Operaciones que requieren resolver un reto especifico.",
    audience: "Equipos que buscan diagnostico, diseno de solucion, implementacion y seguimiento ejecutivo.",
    format: "Proyecto consultivo",
    accessUrl: "/cuenta?tab=consulting",
    detailHref: "/consulting",
    priceEnv: "STRIPE_PRICE_CONSULTING_TRANSFORMATION",
    paymentLinkEnv: "STRIPE_PAYMENT_LINK_CONSULTING_TRANSFORMATION",
    publicPriceEnv: "NEXT_PUBLIC_PRICE_CONSULTING_TRANSFORMATION",
    outcomes: [
      "Espacio de proyecto dentro del portal.",
      "Seguimiento de estado, entregables y responsables.",
      "Documentacion de acuerdos y proximos hitos."
    ]
  }
];

export function getSolutionOffer(sku: string): SolutionOffer | undefined {
  return SOLUTION_OFFERS.find((offer) => offer.sku === sku);
}

export function getOffersByUnit(unit: SolutionUnit): SolutionOffer[] {
  return SOLUTION_OFFERS.filter((offer) => offer.unit === unit);
}

export function getPublicPrice(offer: SolutionOffer): string | null {
  return process.env[offer.publicPriceEnv] ?? null;
}

export function hasCheckoutConfigured(offer: SolutionOffer): boolean {
  return Boolean(process.env[offer.priceEnv] || process.env[offer.paymentLinkEnv]);
}
