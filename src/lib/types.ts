export const LEAD_STATUSES = ["new", "qualified", "booked", "paid", "lost"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const PAYMENT_STATUSES = ["pending", "paid", "failed", "refunded"] as const;
export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];

export const BOOKING_STATUSES = ["requested", "booked", "completed", "canceled", "no_show"] as const;
export type BookingStatus = (typeof BOOKING_STATUSES)[number];

export const LEAD_KINDS = ["contact", "diagnosis", "certification_interest"] as const;
export type LeadKind = (typeof LEAD_KINDS)[number];

export const SOLUTION_UNITS = ["learning", "certification", "consulting"] as const;
export type SolutionUnit = (typeof SOLUTION_UNITS)[number];

export const ENTITLEMENT_STATUSES = ["active", "pending_claim", "refunded", "revoked"] as const;
export type EntitlementStatus = (typeof ENTITLEMENT_STATUSES)[number];

export const DIAGNOSIS_RISKS = ["alto", "medio", "bajo"] as const;
export type DiagnosisRisk = (typeof DIAGNOSIS_RISKS)[number];

export const SKU_IDS = [
  "LEARNING_ONLINE_FOUNDATIONS",
  "LEARNING_HYBRID_TEAMS",
  "EC0217_01",
  "EC0301",
  "EC0366",
  "CONSULTING_DIAGNOSTIC",
  "CONSULTING_TRANSFORMATION"
] as const;
export type SkuId = (typeof SKU_IDS)[number];

export type EntitlementRecord = {
  id: string;
  unit: SolutionUnit;
  sku: SkuId;
  title: string;
  status: EntitlementStatus;
  user_id?: string | null;
  customer_email: string;
  payment_id?: string | null;
  stripe_session_id?: string | null;
  access_url: string;
  granted_at?: string | null;
  expires_at?: string | null;
  created_at: string;
  updated_at: string;
};

export type PaymentRecord = {
  id: string;
  lead_id?: string | null;
  user_id?: string | null;
  unit: SolutionUnit;
  sku: SkuId;
  stripe_session_id?: string | null;
  stripe_payment_intent_id?: string | null;
  stripe_customer_id?: string | null;
  customer_email?: string | null;
  amount_mxn?: number | null;
  status: PaymentStatus;
  source?: string | null;
  paid_at?: string | null;
  refunded_at?: string | null;
  updated_at: string;
  created_at: string;
};

export type UTMData = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  referrer?: string;
  landing_page?: string;
};

export type DiagnosisAnswers = {
  role: string;
  company_size: string;
  instructors_type: string;
  transfer_verification: string;
  onboarding_speed: string;
  variability_pain: string;
  budget_range: string;
};

export type DiagnosisResult = {
  risk: DiagnosisRisk;
  headline: string;
  summary: string;
  implications: string[];
  actionPlan: string[];
  recommendedService: string;
  ctaLabel: string;
  ctaHref: string;
};

export type LeadInput = {
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
  captcha_token?: string;
  lead_kind: LeadKind;
  source: string;
  utm: UTMData;
  metadata?: Record<string, unknown>;
  diagnosis?: {
    answers: DiagnosisAnswers;
    result?: DiagnosisResult;
  };
};

export type LeadRecord = LeadInput & {
  id: string;
  status: LeadStatus;
  created_at: string;
};
