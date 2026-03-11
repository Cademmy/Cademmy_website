export const LEAD_STATUSES = ["new", "qualified", "booked", "paid", "lost"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const PAYMENT_STATUSES = ["pending", "paid", "failed", "refunded"] as const;
export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];

export const BOOKING_STATUSES = ["requested", "booked", "completed", "canceled", "no_show"] as const;
export type BookingStatus = (typeof BOOKING_STATUSES)[number];

export const SKU_IDS = [
  "DISCOVERY_CALL_DEPOSIT",
  "CONSULTING_SPRINT",
  "TEAM_TRAINING_PACK",
  "CERTIFICATION_ENROLLMENT"
] as const;
export type SkuId = (typeof SKU_IDS)[number];

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
  utm: UTMData;
};

export type LeadRecord = LeadInput & {
  id: string;
  status: LeadStatus;
  created_at: string;
};
