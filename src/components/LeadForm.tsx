"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

import { EVENTS, trackEvent } from "@/lib/analytics";
import { captureUTMData, readUTMData } from "@/lib/utm";

type Props = {
  variant?: "default" | "enterprise";
  title?: string;
};

type LeadPayload = {
  first_name: string;
  last_name: string;
  work_email: string;
  phone?: string;
  company: string;
  role: string;
  team_size: string;
  service_interest: string;
  challenge_summary: string;
  preferred_language: string;
  consent_checkbox: boolean;
  website?: string;
  captcha_token?: string;
  utm: Record<string, string | undefined>;
};

const SERVICE_OPTIONS = [
  "Consultoría",
  "Capacitación y Coaching",
  "Cursos en Línea",
  "Certificación de Competencias",
  "Talento y Capital Humano",
  "Learn Hub"
];

export function LeadForm({ variant = "default", title = "Hablemos de tu proyecto" }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [payload, setPayload] = useState<LeadPayload>({
    first_name: "",
    last_name: "",
    work_email: "",
    phone: "",
    company: "",
    role: "",
    team_size: "",
    service_interest: variant === "enterprise" ? "Enterprise / Propuesta" : "Consultoría",
    challenge_summary: "",
    preferred_language: "Español",
    consent_checkbox: false,
    website: "",
    captcha_token: "",
    utm: {}
  });

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const hasCaptcha = Boolean(siteKey);

  useEffect(() => {
    captureUTMData();
    setPayload((prev) => ({ ...prev, utm: readUTMData() }));
  }, []);

  const buttonLabel = useMemo(() => {
    if (loading) return "Enviando...";
    return variant === "enterprise" ? "Solicitar evaluación" : "Enviar y continuar";
  }, [loading, variant]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error || "No se pudo enviar el formulario");
      }

      trackEvent(EVENTS.LeadSubmitted, {
        service_interest: payload.service_interest,
        variant
      });

      window.location.href = "/gracias/lead";
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="card form-card" onSubmit={onSubmit} noValidate>
      <h2>{title}</h2>
      <div className="grid-2">
        <label>
          Nombre
          <input required value={payload.first_name} onChange={(e) => setPayload({ ...payload, first_name: e.target.value })} />
        </label>
        <label>
          Apellido
          <input required value={payload.last_name} onChange={(e) => setPayload({ ...payload, last_name: e.target.value })} />
        </label>
      </div>

      <div className="grid-2">
        <label>
          Correo de trabajo
          <input type="email" required value={payload.work_email} onChange={(e) => setPayload({ ...payload, work_email: e.target.value })} />
        </label>
        <label>
          Teléfono (opcional)
          <input value={payload.phone} onChange={(e) => setPayload({ ...payload, phone: e.target.value })} />
        </label>
      </div>

      <div className="grid-2">
        <label>
          Empresa
          <input required value={payload.company} onChange={(e) => setPayload({ ...payload, company: e.target.value })} />
        </label>
        <label>
          Puesto
          <input required value={payload.role} onChange={(e) => setPayload({ ...payload, role: e.target.value })} />
        </label>
      </div>

      <div className="grid-2">
        <label>
          Tamaño de equipo
          <select required value={payload.team_size} onChange={(e) => setPayload({ ...payload, team_size: e.target.value })}>
            <option value="">Selecciona</option>
            <option value="1-10">1-10</option>
            <option value="11-50">11-50</option>
            <option value="51-200">51-200</option>
            <option value="201+">201+</option>
          </select>
        </label>
        <label>
          Servicio de interés
          <select required value={payload.service_interest} onChange={(e) => setPayload({ ...payload, service_interest: e.target.value })}>
            {SERVICE_OPTIONS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
            {variant === "enterprise" && <option value="Enterprise / Propuesta">Enterprise / Propuesta</option>}
          </select>
        </label>
      </div>

      <label>
        Reto principal
        <textarea required rows={4} value={payload.challenge_summary} onChange={(e) => setPayload({ ...payload, challenge_summary: e.target.value })} />
      </label>

      <label>
        Idioma preferido
        <select required value={payload.preferred_language} onChange={(e) => setPayload({ ...payload, preferred_language: e.target.value })}>
          <option value="Español">Español</option>
          <option value="Inglés">Inglés</option>
        </select>
      </label>

      <label className="checkbox-label">
        <input type="checkbox" required checked={payload.consent_checkbox} onChange={(e) => setPayload({ ...payload, consent_checkbox: e.target.checked })} />
        Acepto el aviso de privacidad y autorizo el contacto comercial.
      </label>

      {hasCaptcha && (
        <label>
          Token captcha
          <input
            placeholder="Integrar widget Turnstile en producción"
            value={payload.captcha_token}
            onChange={(e) => setPayload({ ...payload, captcha_token: e.target.value })}
          />
        </label>
      )}

      <input
        type="text"
        name="website"
        className="honeypot"
        tabIndex={-1}
        autoComplete="off"
        value={payload.website}
        onChange={(e) => setPayload({ ...payload, website: e.target.value })}
      />

      {error && <p className="error-text">{error}</p>}

      <button type="submit" className="btn btn-primary" disabled={loading}>
        {buttonLabel}
      </button>
    </form>
  );
}
