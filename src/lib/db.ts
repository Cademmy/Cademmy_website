import { randomUUID } from "node:crypto";

import type { Pool } from "pg";

import { LeadInput, LeadRecord } from "@/lib/types";

const memoryLeads: LeadRecord[] = [];

let pool: Pool | null = null;

async function getPool(): Promise<Pool | null> {
  if (!process.env.DATABASE_URL) return null;
  if (pool) return pool;

  const { Pool: PgPool } = await import("pg");
  pool = new PgPool({ connectionString: process.env.DATABASE_URL });
  return pool;
}

async function ensureTables(): Promise<void> {
  const currentPool = await getPool();
  if (!currentPool) return;

  await currentPool.query(`
    CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      work_email TEXT NOT NULL,
      phone TEXT,
      company TEXT NOT NULL,
      role TEXT NOT NULL,
      team_size TEXT NOT NULL,
      service_interest TEXT NOT NULL,
      challenge_summary TEXT NOT NULL,
      preferred_language TEXT NOT NULL,
      consent_checkbox BOOLEAN NOT NULL,
      utm JSONB NOT NULL,
      status TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await currentPool.query(`
    CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      lead_id TEXT,
      source TEXT NOT NULL,
      service_type TEXT NOT NULL,
      assignee TEXT,
      start_time_utc TIMESTAMPTZ,
      end_time_utc TIMESTAMPTZ,
      timezone TEXT,
      status TEXT NOT NULL,
      meeting_link TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await currentPool.query(`
    CREATE TABLE IF NOT EXISTS payments (
      id TEXT PRIMARY KEY,
      lead_id TEXT,
      sku TEXT NOT NULL,
      stripe_session_id TEXT,
      stripe_customer_id TEXT,
      amount_mxn INTEGER,
      status TEXT NOT NULL,
      paid_at TIMESTAMPTZ,
      refunded_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

export async function insertLead(input: LeadInput): Promise<LeadRecord> {
  const id = randomUUID();
  const created_at = new Date().toISOString();
  const lead: LeadRecord = {
    ...input,
    id,
    status: "new",
    created_at
  };

  const currentPool = await getPool();
  if (!currentPool) {
    memoryLeads.push(lead);
    return lead;
  }

  await ensureTables();
  await currentPool.query(
    `
      INSERT INTO leads (
        id, first_name, last_name, work_email, phone, company, role,
        team_size, service_interest, challenge_summary, preferred_language,
        consent_checkbox, utm, status, created_at
      ) VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15
      )
    `,
    [
      lead.id,
      lead.first_name,
      lead.last_name,
      lead.work_email,
      lead.phone ?? null,
      lead.company,
      lead.role,
      lead.team_size,
      lead.service_interest,
      lead.challenge_summary,
      lead.preferred_language,
      lead.consent_checkbox,
      JSON.stringify(lead.utm),
      lead.status,
      lead.created_at
    ]
  );

  return lead;
}

type BookingInput = {
  lead_id?: string;
  source: string;
  service_type: string;
  assignee?: string;
  start_time_utc?: string;
  end_time_utc?: string;
  timezone?: string;
  status: string;
  meeting_link?: string;
};

export async function insertBooking(input: BookingInput): Promise<string> {
  const id = randomUUID();
  const currentPool = await getPool();
  if (!currentPool) return id;

  await ensureTables();
  await currentPool.query(
    `
      INSERT INTO bookings (
        id, lead_id, source, service_type, assignee, start_time_utc,
        end_time_utc, timezone, status, meeting_link
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
    `,
    [
      id,
      input.lead_id ?? null,
      input.source,
      input.service_type,
      input.assignee ?? null,
      input.start_time_utc ?? null,
      input.end_time_utc ?? null,
      input.timezone ?? null,
      input.status,
      input.meeting_link ?? null
    ]
  );

  return id;
}

type PaymentInput = {
  lead_id?: string;
  sku: string;
  stripe_session_id?: string;
  stripe_customer_id?: string;
  amount_mxn?: number;
  status: string;
  paid_at?: string;
  refunded_at?: string;
};

export async function insertPayment(input: PaymentInput): Promise<string> {
  const id = randomUUID();
  const currentPool = await getPool();
  if (!currentPool) return id;

  await ensureTables();
  await currentPool.query(
    `
      INSERT INTO payments (
        id, lead_id, sku, stripe_session_id, stripe_customer_id,
        amount_mxn, status, paid_at, refunded_at
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    `,
    [
      id,
      input.lead_id ?? null,
      input.sku,
      input.stripe_session_id ?? null,
      input.stripe_customer_id ?? null,
      input.amount_mxn ?? null,
      input.status,
      input.paid_at ?? null,
      input.refunded_at ?? null
    ]
  );

  return id;
}
