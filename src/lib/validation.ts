import { DiagnosisAnswers, LeadInput, LEAD_KINDS } from "@/lib/types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLeadInput(payload: unknown): { valid: true; value: LeadInput } | { valid: false; error: string } {
  if (!payload || typeof payload !== "object") {
    return { valid: false, error: "Payload inválido" };
  }

  const data = payload as Partial<LeadInput>;
  const required: Array<keyof LeadInput> = [
    "first_name",
    "last_name",
    "work_email",
    "company",
    "role",
    "team_size",
    "service_interest",
    "challenge_summary",
    "preferred_language",
    "consent_checkbox",
    "source",
    "utm"
  ];

  for (const key of required) {
    if (data[key] === undefined || data[key] === null || data[key] === "") {
      return { valid: false, error: `Falta el campo obligatorio: ${String(key)}` };
    }
  }

  if (!EMAIL_REGEX.test(String(data.work_email))) {
    return { valid: false, error: "Correo inválido" };
  }

  if (!data.consent_checkbox) {
    return { valid: false, error: "Debes aceptar el aviso de privacidad" };
  }

  const lead_kind =
    typeof data.lead_kind === "string" && LEAD_KINDS.includes(data.lead_kind as (typeof LEAD_KINDS)[number])
      ? data.lead_kind
      : "contact";

  const diagnosis = parseDiagnosisPayload(data.diagnosis);
  if (lead_kind === "diagnosis" && !diagnosis?.answers) {
    return { valid: false, error: "El diagnóstico requiere respuestas completas." };
  }

  return {
    valid: true,
    value: {
      first_name: String(data.first_name),
      last_name: String(data.last_name),
      work_email: String(data.work_email),
      phone: data.phone ? String(data.phone) : undefined,
      company: String(data.company),
      role: String(data.role),
      team_size: String(data.team_size),
      service_interest: String(data.service_interest),
      challenge_summary: String(data.challenge_summary),
      preferred_language: String(data.preferred_language),
      consent_checkbox: Boolean(data.consent_checkbox),
      captcha_token: data.captcha_token ? String(data.captcha_token) : undefined,
      lead_kind,
      source: String(data.source),
      utm: typeof data.utm === "object" && data.utm ? data.utm : {},
      metadata: typeof data.metadata === "object" && data.metadata ? (data.metadata as Record<string, unknown>) : undefined,
      diagnosis
    }
  };
}

function parseDiagnosisPayload(input: unknown): LeadInput["diagnosis"] | undefined {
  if (!input || typeof input !== "object") return undefined;

  const source = input as {
    answers?: Partial<DiagnosisAnswers>;
    result?: LeadInput["diagnosis"] extends { result?: infer TResult } ? TResult : never;
  };

  if (!source.answers || typeof source.answers !== "object") return undefined;

  const answers = source.answers;
  const keys: Array<keyof DiagnosisAnswers> = [
    "role",
    "company_size",
    "instructors_type",
    "transfer_verification",
    "onboarding_speed",
    "variability_pain",
    "budget_range"
  ];

  for (const key of keys) {
    if (!answers[key]) return undefined;
  }

  return {
    answers: {
      role: String(answers.role),
      company_size: String(answers.company_size),
      instructors_type: String(answers.instructors_type),
      transfer_verification: String(answers.transfer_verification),
      onboarding_speed: String(answers.onboarding_speed),
      variability_pain: String(answers.variability_pain),
      budget_range: String(answers.budget_range)
    },
    result: source.result
  };
}
