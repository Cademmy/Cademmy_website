"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

import { EVENTS, trackEvent } from "@/lib/analytics";
import { LEAD_SERVICE_OPTIONS } from "@/lib/constants";
import { LeadKind } from "@/lib/types";
import { captureUTMData, readUTMData } from "@/lib/utm";
import { TurnstileWidget } from "@/mvp-components/TurnstileWidget";

type Props = {
  title?: string;
  intro?: string;
  leadKind?: LeadKind;
  source?: string;
  defaultServiceInterest?: string;
  submitLabel?: string;
  challengeLabel?: string;
  metadata?: Record<string, unknown>;
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
  lead_kind: LeadKind;
  source: string;
  utm: Record<string, string | undefined>;
  metadata?: Record<string, unknown>;
};

export function LeadForm({
  title = "Hablemos de tu proyecto",
  intro,
  leadKind = "contact",
  source = "website_form",
  defaultServiceInterest = "Cademmy Consulting",
  submitLabel,
  challengeLabel = "Reto principal",
  metadata
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [captchaResetSignal, setCaptchaResetSignal] = useState(0);
  const serviceOptions = useMemo(() => {
    const options = [...LEAD_SERVICE_OPTIONS] as string[];
    if (defaultServiceInterest && !options.includes(defaultServiceInterest)) {
      options.unshift(defaultServiceInterest);
    }
    return options;
  }, [defaultServiceInterest]);

  const [payload, setPayload] = useState<LeadPayload>({
    first_name: "",
    last_name: "",
    work_email: "",
    phone: "",
    company: "",
    role: "",
    team_size: "",
    service_interest: defaultServiceInterest,
    challenge_summary: "",
    preferred_language: "Español",
    consent_checkbox: false,
    website: "",
    captcha_token: "",
    lead_kind: leadKind,
    source,
    utm: {},
    metadata
  });

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const hasCaptcha = Boolean(siteKey);

  useEffect(() => {
    captureUTMData();
    setPayload((prev) => ({ ...prev, utm: readUTMData() }));
  }, []);

  const buttonLabel = useMemo(() => (loading ? "Enviando..." : submitLabel ?? "Enviar y continuar"), [loading, submitLabel]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (hasCaptcha && !payload.captcha_token) {
      setError("Completa la verificacion de seguridad antes de enviar.");
      return;
    }

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

      const data = (await response.json()) as { nextUrl?: string };
      trackEvent(EVENTS.LeadSubmitted, {
        service_interest: payload.service_interest,
        lead_kind: payload.lead_kind,
        source: payload.source
      });

      window.location.href = data.nextUrl || "/gracias/lead";
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Error inesperado");
      if (hasCaptcha) {
        setPayload((prev) => ({ ...prev, captcha_token: "" }));
        setCaptchaResetSignal((prev) => prev + 1);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="card form-card" onSubmit={onSubmit} noValidate>
      <h2>{title}</h2>
      {intro && <p className="form-intro">{intro}</p>}
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
            {serviceOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label>
        {challengeLabel}
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
        <div className="captcha-block">
          <p className="micro-label">Verificación anti-spam</p>
          <TurnstileWidget
            resetSignal={captchaResetSignal}
            onTokenChange={(token) => setPayload((prev) => ({ ...prev, captcha_token: token }))}
          />
        </div>
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

      <button type="submit" className="btn btn-primary" disabled={loading || (hasCaptcha && !payload.captcha_token)}>
        {buttonLabel}
      </button>
    </form>
  );
}
