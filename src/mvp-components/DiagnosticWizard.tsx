"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

import { EVENTS, trackEvent } from "@/lib/analytics";
import { DIAGNOSIS_OPTIONS, buildDiagnosisResult } from "@/lib/diagnosis";
import { DiagnosisAnswers, DiagnosisResult } from "@/lib/types";
import { captureUTMData, readUTMData } from "@/lib/utm";
import { TurnstileWidget } from "@/mvp-components/TurnstileWidget";

const steps: Array<{
  key: keyof DiagnosisAnswers;
  title: string;
  description: string;
  options: readonly string[];
}> = [
  {
    key: "role",
    title: "¿Quién está respondiendo este diagnóstico?",
    description: "Queremos entender desde que funcion se evalua la necesidad.",
    options: DIAGNOSIS_OPTIONS.role
  },
  {
    key: "company_size",
    title: "¿Qué tamaño tiene la organización?",
    description: "Nos ayuda a ajustar el tipo de intervención y el nivel de complejidad operativa.",
    options: DIAGNOSIS_OPTIONS.company_size
  },
  {
    key: "instructors_type",
    title: "¿Como se atiende hoy esta necesidad?",
    description: "Nos ayuda a distinguir si falta aprendizaje, evidencia, implementacion o una combinacion.",
    options: DIAGNOSIS_OPTIONS.instructors_type
  },
  {
    key: "transfer_verification",
    title: "¿Como verifican hoy que la solucion funciona?",
    description: "Aqui se distingue entre actividad registrada y resultado observable.",
    options: DIAGNOSIS_OPTIONS.transfer_verification
  },
  {
    key: "onboarding_speed",
    title: "¿El onboarding cumple con la operación?",
    description: "Buscamos señales de lentitud, variabilidad o control efectivo.",
    options: DIAGNOSIS_OPTIONS.onboarding_speed
  },
  {
    key: "variability_pain",
    title: "¿Que nivel de variabilidad detectas?",
    description: "Este punto es clave para entender consistencia, repetibilidad y riesgo operativo.",
    options: DIAGNOSIS_OPTIONS.variability_pain
  },
  {
    key: "budget_range",
    title: "¿Qué rango de inversión luce más realista hoy?",
    description: "No es una cotización: solo nos ayuda a dimensionar la conversación posterior.",
    options: DIAGNOSIS_OPTIONS.budget_range
  }
];

export function DiagnosticWizard() {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const hasCaptcha = Boolean(siteKey);
  const [stepIndex, setStepIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [captchaResetSignal, setCaptchaResetSignal] = useState(0);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [answers, setAnswers] = useState<DiagnosisAnswers>({
    role: "",
    company_size: "",
    instructors_type: "",
    transfer_verification: "",
    onboarding_speed: "",
    variability_pain: "",
    budget_range: ""
  });
  const [contact, setContact] = useState({
    first_name: "",
    last_name: "",
    work_email: "",
    phone: "",
    company: "",
    challenge_summary: "",
    consent_checkbox: false,
    captcha_token: "",
    website: ""
  });

  const currentStep = steps[stepIndex];
  const progress = useMemo(() => Math.round(((stepIndex + 1) / (steps.length + 1)) * 100), [stepIndex]);

  const handleSelect = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentStep.key]: value }));
    if (stepIndex < steps.length - 1) {
      setStepIndex((prev) => prev + 1);
    } else {
      setStepIndex(steps.length);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (hasCaptcha && !contact.captcha_token) {
      setError("Completa la verificación de seguridad antes de enviar.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const localResult = buildDiagnosisResult(answers);
      const utm = {
        ...captureUTMData(),
        ...readUTMData()
      };

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...contact,
          role: answers.role,
          team_size: answers.company_size,
          service_interest: "Diagnostico consultivo",
          preferred_language: "Español",
          lead_kind: "diagnosis",
          source: "diagnostico_consultivo",
          utm,
          metadata: {
            onboarding_speed: answers.onboarding_speed,
            instructors_type: answers.instructors_type
          },
          challenge_summary:
            contact.challenge_summary ||
            `Diagnostico consultivo: ${answers.transfer_verification}; ${answers.variability_pain}; ${answers.onboarding_speed}.`,
          diagnosis: {
            answers
          }
        })
      });

      if (!response.ok) {
        const payload = (await response.json()) as { error?: string };
        throw new Error(payload.error || "No se pudo registrar el diagnóstico");
      }

      const payload = (await response.json()) as { diagnosis?: DiagnosisResult | null };
      const finalResult = payload.diagnosis || localResult;
      setResult(finalResult);
      trackEvent(EVENTS.DiagnosisCompleted, {
        source: "diagnostico_consultivo",
        risk: finalResult.risk
      });
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Error inesperado");
      if (hasCaptcha) {
        setContact((prev) => ({ ...prev, captcha_token: "" }));
        setCaptchaResetSignal((prev) => prev + 1);
      }
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    return (
      <section className="diagnostic-result card">
        <p className={`chip chip-${result.risk}`}>Riesgo {result.risk}</p>
        <h2>{result.headline}</h2>
        <p>{result.summary}</p>

        <div className="result-grid">
          <article>
            <h3>Lo que esto implica</h3>
            <ul className="clean-list">
              {result.implications.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article>
            <h3>Ruta sugerida</h3>
            <ul className="clean-list">
              {result.actionPlan.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>

        <div className="cta-row">
          <Link href={result.ctaHref} className="btn btn-primary">
            {result.ctaLabel}
          </Link>
          <Link href="/contacto?service=Diagnostico%20consultivo" className="btn btn-secondary">
            Enviar más contexto
          </Link>
        </div>
      </section>
    );
  }

  if (stepIndex < steps.length) {
    return (
      <section className="diagnostic-wizard card">
        <div className="wizard-topline">
          <span>Diagnostico consultivo</span>
          <strong>{progress}%</strong>
        </div>
        <div className="wizard-progress">
          <span style={{ width: `${progress}%` }} />
        </div>
        <h2>{currentStep.title}</h2>
        <p>{currentStep.description}</p>
        <div className="option-grid">
          {currentStep.options.map((option) => (
            <button key={option} type="button" className="option-card" onClick={() => handleSelect(option)}>
              {option}
            </button>
          ))}
        </div>
        {stepIndex > 0 && (
          <button type="button" className="text-button" onClick={() => setStepIndex((prev) => prev - 1)}>
            Volver al paso anterior
          </button>
        )}
      </section>
    );
  }

  return (
    <form className="card form-card diagnostic-contact-form" onSubmit={handleSubmit} noValidate>
      <p className="chip">Cierre del diagnóstico</p>
      <h2>Déjanos tus datos y te entregamos la lectura inicial</h2>
      <p className="form-intro">
        Al enviar, registramos el diagnóstico y te devolvemos una lectura inicial con siguiente paso
        sugerido.
      </p>

      <div className="grid-2">
        <label>
          Nombre
          <input required value={contact.first_name} onChange={(event) => setContact((prev) => ({ ...prev, first_name: event.target.value }))} />
        </label>
        <label>
          Apellido
          <input required value={contact.last_name} onChange={(event) => setContact((prev) => ({ ...prev, last_name: event.target.value }))} />
        </label>
      </div>

      <div className="grid-2">
        <label>
          Correo de trabajo
          <input type="email" required value={contact.work_email} onChange={(event) => setContact((prev) => ({ ...prev, work_email: event.target.value }))} />
        </label>
        <label>
          Teléfono (opcional)
          <input value={contact.phone} onChange={(event) => setContact((prev) => ({ ...prev, phone: event.target.value }))} />
        </label>
      </div>

      <label>
        Empresa
        <input required value={contact.company} onChange={(event) => setContact((prev) => ({ ...prev, company: event.target.value }))} />
      </label>

      <label>
        ¿Qué te preocupa hoy?
        <textarea
          rows={4}
          required
          value={contact.challenge_summary}
          onChange={(event) => setContact((prev) => ({ ...prev, challenge_summary: event.target.value }))}
        />
      </label>

      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={contact.consent_checkbox}
          onChange={(event) => setContact((prev) => ({ ...prev, consent_checkbox: event.target.checked }))}
          required
        />
        Acepto el aviso de privacidad y autorizo el contacto comercial.
      </label>

      {hasCaptcha && (
        <div className="captcha-block">
          <p className="micro-label">Verificación anti-spam</p>
          <TurnstileWidget
            resetSignal={captchaResetSignal}
            onTokenChange={(token) => setContact((prev) => ({ ...prev, captcha_token: token }))}
          />
        </div>
      )}

      <input
        type="text"
        name="website"
        className="honeypot"
        tabIndex={-1}
        autoComplete="off"
        value={contact.website}
        onChange={(event) => setContact((prev) => ({ ...prev, website: event.target.value }))}
      />

      {error && <p className="error-text">{error}</p>}

      <div className="cta-row">
        <button type="button" className="btn btn-secondary" onClick={() => setStepIndex(steps.length - 1)}>
          Regresar
        </button>
        <button type="submit" className="btn btn-primary" disabled={loading || (hasCaptcha && !contact.captcha_token)}>
          {loading ? "Procesando..." : "Obtener lectura inicial"}
        </button>
      </div>
    </form>
  );
}
