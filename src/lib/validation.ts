import { LeadInput } from "@/lib/types";

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
      utm: typeof data.utm === "object" && data.utm ? data.utm : {}
    }
  };
}
