import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight, BadgeCheck, BookOpen, UsersRound } from "lucide-react";
import { CSSProperties } from "react";

import { B2B_PAIN_POINTS, B2B_SOLUTIONS, HOME_PILLARS } from "@/lib/constants";
import { UNIT_META } from "@/lib/solution-catalog";
import { Container } from "@/mvp-components/Container";
import { LeadForm } from "@/mvp-components/LeadForm";

export const metadata: Metadata = {
  title: "Inicio",
  description:
    "Cademmy integra aprendizaje, certificación y consultoría profesional en una cuenta única para acceder a servicios comprados o contratados."
};

const units = [
  {
    number: "01",
    unit: UNIT_META.learning,
    icon: BookOpen,
    title: "Aprende habilidades que puedes aplicar",
    body: "Cursos en línea, presenciales e híbridos para avanzar con estructura, actividades y continuidad dentro de tu cuenta.",
    href: "/learning"
  },
  {
    number: "02",
    unit: UNIT_META.certification,
    icon: BadgeCheck,
    title: "Certifica competencias con evidencia",
    body: "Procesos de certificación laboral y profesional con preparación, seguimiento y acceso posterior al pago.",
    href: "/certificacion"
  },
  {
    number: "03",
    unit: UNIT_META.consulting,
    icon: UsersRound,
    title: "Resuelve retos con consultoría profesional",
    body: "Diagnóstico, diseño de solución, implementación y entregables para áreas de negocio que necesitan avanzar con claridad.",
    href: "/consulting"
  }
] as const;

export default function HomePage() {
  return (
    <>
      <section className="hero-section">
        <Container className="hero-layout">
          <div className="hero-copy">
            <p className="page-eyebrow">Cademmy 2.0</p>
            <h1>Aprende, certifica y transforma el talento de tu organización.</h1>
            <p>
              Cursos, certificaciones y consultoría para convertir capacidades en resultados
              medibles. Todo queda conectado a una cuenta Cademmy, donde cada servicio comprado o
              contratado tiene acceso, seguimiento y siguiente paso.
            </p>
            <div className="actions">
              <Link href="/agendar" className="btn btn-primary">
                Agendar diagnóstico
              </Link>
              <Link href="#soluciones" className="btn btn-secondary">
                Explorar soluciones
              </Link>
            </div>
          </div>

          <div className="hero-visual glass-panel" aria-hidden>
            <svg className="hero-connectors" viewBox="0 0 600 460" preserveAspectRatio="none">
              <defs>
                <linearGradient id="hero-line-gradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#f9c418" />
                  <stop offset="48%" stopColor="#f5821f" />
                  <stop offset="100%" stopColor="#c81848" />
                </linearGradient>
              </defs>
              <path d="M205 100 C242 104 244 164 272 198" />
              <path d="M205 230 C232 230 245 230 272 230" />
              <path d="M205 360 C244 356 244 294 272 262" />
              <path d="M328 200 C358 166 370 124 394 120" />
              <path d="M328 260 C360 302 370 334 394 340" />
            </svg>
            <div className="hero-system-card system-learning">
              <BookOpen size={22} />
              <span>Aprendizaje continuo</span>
            </div>
            <div className="hero-system-card system-certification">
              <BadgeCheck size={22} />
              <span>Certificación profesional</span>
            </div>
            <div className="hero-system-card system-consulting">
              <UsersRound size={22} />
              <span>Consultoría estratégica</span>
            </div>
            <div className="hero-hub">
              <Image src="/assets/isotipo-color.png" alt="" width={112} height={112} />
            </div>
            <div className="hero-insight insight-learning">
              <span>Rutas visibles</span>
              <strong>Learning</strong>
            </div>
            <div className="hero-insight insight-account">
              <span>Cuenta única</span>
              <strong>Accesos, pagos y entregables</strong>
            </div>
          </div>
        </Container>

        <Container className="unit-strip" id="soluciones">
          {units.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                href={item.href}
                className="glass-panel unit-panel"
                key={item.unit.label}
                style={{ "--unit-color": item.unit.color } as CSSProperties}
              >
                <div className="unit-panel-topline">
                  <span className="unit-card-icon">
                    <Icon size={28} />
                  </span>
                  <span className="unit-number">{item.number}</span>
                </div>
                <span className="unit-label">{item.unit.name}</span>
                <h2>{item.title}</h2>
                <p>{item.body}</p>
                <span className="unit-link">
                  Conoce más <ArrowRight size={18} />
                </span>
              </Link>
            );
          })}
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="section-heading">
            <p className="page-eyebrow">Por qué cambiar el sitio</p>
            <h2>La experiencia debe explicar qué compra el usuario y qué pasa después.</h2>
            <p>
              Cademmy no es un folleto de cursos. Es una plataforma donde cada solución se entiende,
              se contrata y se consulta desde una cuenta con continuidad real.
            </p>
          </div>
          <div className="cards-grid value-grid">
            {HOME_PILLARS.map((item) => (
              <article key={item.title} className="glass-panel feature-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section section-spacious">
        <Container className="split-panel">
          <div className="section-heading">
            <p className="page-eyebrow">Para personas y organizaciones</p>
            <h2>Elige la solución que necesitas, no un camino artificial.</h2>
            <p>
              Puedes comprar una certificación, contratar consultoría, iniciar un programa de
              aprendizaje o agendar un diagnóstico. La diferencia es que todo queda visible en tu
              cuenta y no se pierde entre correos.
            </p>
          </div>
          <div className="cards-grid">
            {B2B_SOLUTIONS.map((item) => (
              <article key={item.title} className="glass-panel feature-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section section-spacious">
        <Container>
          <div className="section-heading">
            <p className="page-eyebrow">Problemas que Cademmy ordena</p>
            <h2>Cuando la formación, la evidencia y la acción viven separadas, se pierde impacto.</h2>
          </div>
          <div className="cards-grid">
            {B2B_PAIN_POINTS.map((item) => (
              <article key={item.title} className="glass-panel feature-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section section-spacious">
        <Container className="split-panel">
          <div className="stack-lg">
            <div className="section-heading">
              <p className="page-eyebrow">Conversemos</p>
              <h2>Si el servicio no está listo para compra directa, lo convertimos en propuesta.</h2>
              <p>
                Deja contexto y te ayudamos a decidir si conviene empezar por aprendizaje,
                certificación, consultoría o un diagnóstico consultivo.
              </p>
            </div>
            <div className="actions">
              <Link href="/cuenta" className="btn btn-secondary">
                Ver cuenta Cademmy
              </Link>
              <Link href="/diagnostico-rh" className="btn btn-secondary">
                Hacer diagnóstico
              </Link>
            </div>
          </div>

          <LeadForm
            title="Cuéntanos qué quieres resolver"
            intro="Te respondemos con el siguiente paso más útil: compra, agenda, propuesta o diagnóstico."
            leadKind="contact"
            source="home_v2"
            defaultServiceInterest="Proyecto corporativo"
            submitLabel="Enviar contexto"
            challengeLabel="Necesidad o resultado esperado"
          />
        </Container>
      </section>
    </>
  );
}
