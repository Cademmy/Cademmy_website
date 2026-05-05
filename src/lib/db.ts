import { randomUUID } from "node:crypto";

import type { Pool } from "pg";

import { getSolutionOffer } from "@/lib/solution-catalog";
import {
  EntitlementRecord,
  EntitlementStatus,
  LeadInput,
  LeadRecord,
  PaymentRecord,
  PaymentStatus,
  SkuId,
  SolutionUnit
} from "@/lib/types";

const memoryLeads: LeadRecord[] = [];
const memoryPayments: PaymentRecord[] = [];
const memoryEntitlements: EntitlementRecord[] = [];

let pool: Pool | null = null;

function getDatabaseUrl(): string | null {
  return (
    process.env.DATABASE_URL ??
    process.env.POSTGRES_URL ??
    process.env.POSTGRES_PRISMA_URL ??
    process.env.POSTGRES_URL_NON_POOLING ??
    null
  );
}

async function getPool(): Promise<Pool | null> {
  const connectionString = getDatabaseUrl();
  if (!connectionString) return null;
  if (pool) return pool;

  const { Pool: PgPool } = await import("pg");
  pool = new PgPool({ connectionString });
  return pool;
}

function normalizeEmail(email?: string | null): string {
  return String(email ?? "").trim().toLowerCase();
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
      lead_kind TEXT NOT NULL DEFAULT 'contact',
      source TEXT NOT NULL DEFAULT 'website_form',
      utm JSONB NOT NULL,
      metadata JSONB,
      diagnosis JSONB,
      status TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await currentPool.query(`ALTER TABLE leads ADD COLUMN IF NOT EXISTS lead_kind TEXT NOT NULL DEFAULT 'contact';`);
  await currentPool.query(`ALTER TABLE leads ADD COLUMN IF NOT EXISTS source TEXT NOT NULL DEFAULT 'website_form';`);
  await currentPool.query(`ALTER TABLE leads ADD COLUMN IF NOT EXISTS metadata JSONB;`);
  await currentPool.query(`ALTER TABLE leads ADD COLUMN IF NOT EXISTS diagnosis JSONB;`);

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
      user_id TEXT,
      unit TEXT NOT NULL DEFAULT 'certification',
      sku TEXT NOT NULL,
      stripe_session_id TEXT,
      stripe_payment_intent_id TEXT,
      stripe_customer_id TEXT,
      customer_email TEXT,
      amount_mxn INTEGER,
      status TEXT NOT NULL,
      source TEXT,
      paid_at TIMESTAMPTZ,
      refunded_at TIMESTAMPTZ,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await currentPool.query(`ALTER TABLE payments ADD COLUMN IF NOT EXISTS user_id TEXT;`);
  await currentPool.query(`ALTER TABLE payments ADD COLUMN IF NOT EXISTS unit TEXT NOT NULL DEFAULT 'certification';`);
  await currentPool.query(`ALTER TABLE payments ADD COLUMN IF NOT EXISTS stripe_payment_intent_id TEXT;`);
  await currentPool.query(`ALTER TABLE payments ADD COLUMN IF NOT EXISTS customer_email TEXT;`);
  await currentPool.query(`ALTER TABLE payments ADD COLUMN IF NOT EXISTS source TEXT;`);
  await currentPool.query(`ALTER TABLE payments ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();`);
  await currentPool.query(
    `CREATE UNIQUE INDEX IF NOT EXISTS payments_session_id_unique ON payments (stripe_session_id) WHERE stripe_session_id IS NOT NULL;`
  );
  await currentPool.query(
    `CREATE UNIQUE INDEX IF NOT EXISTS payments_payment_intent_unique ON payments (stripe_payment_intent_id) WHERE stripe_payment_intent_id IS NOT NULL;`
  );

  await currentPool.query(`
    CREATE TABLE IF NOT EXISTS entitlements (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      customer_email TEXT NOT NULL,
      unit TEXT NOT NULL,
      sku TEXT NOT NULL,
      title TEXT NOT NULL,
      status TEXT NOT NULL,
      payment_id TEXT,
      stripe_session_id TEXT,
      access_url TEXT NOT NULL,
      granted_at TIMESTAMPTZ,
      expires_at TIMESTAMPTZ,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
  await currentPool.query(
    `CREATE UNIQUE INDEX IF NOT EXISTS entitlements_payment_sku_unique ON entitlements (payment_id, sku) WHERE payment_id IS NOT NULL;`
  );
  await currentPool.query(`CREATE INDEX IF NOT EXISTS entitlements_user_id_idx ON entitlements (user_id);`);
  await currentPool.query(`CREATE INDEX IF NOT EXISTS entitlements_email_idx ON entitlements (customer_email);`);
  await currentPool.query(`CREATE INDEX IF NOT EXISTS bookings_lead_id_idx ON bookings (lead_id);`);
  await currentPool.query(`CREATE INDEX IF NOT EXISTS payments_lead_id_idx ON payments (lead_id);`);
  await currentPool.query(`CREATE INDEX IF NOT EXISTS payments_user_id_idx ON payments (user_id);`);
  await currentPool.query(`CREATE INDEX IF NOT EXISTS payments_customer_email_idx ON payments (customer_email);`);
  await currentPool.query(`CREATE INDEX IF NOT EXISTS entitlements_payment_id_idx ON entitlements (payment_id);`);
  await currentPool.query(`CREATE INDEX IF NOT EXISTS leads_work_email_idx ON leads (work_email);`);
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
        consent_checkbox, lead_kind, source, utm, metadata, diagnosis, status, created_at
      ) VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19
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
      lead.lead_kind,
      lead.source,
      JSON.stringify(lead.utm),
      lead.metadata ? JSON.stringify(lead.metadata) : null,
      lead.diagnosis ? JSON.stringify(lead.diagnosis) : null,
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
  user_id?: string;
  unit: SolutionUnit;
  sku: SkuId;
  stripe_session_id?: string;
  stripe_payment_intent_id?: string;
  stripe_customer_id?: string;
  customer_email?: string;
  amount_mxn?: number;
  status: PaymentStatus;
  source?: string;
  paid_at?: string;
  refunded_at?: string;
};

export async function upsertPayment(input: PaymentInput): Promise<string> {
  const email = normalizeEmail(input.customer_email);
  const now = new Date().toISOString();
  const currentPool = await getPool();

  if (!currentPool) {
    const existing = memoryPayments.find(
      (payment) =>
        (input.stripe_session_id && payment.stripe_session_id === input.stripe_session_id) ||
        (input.stripe_payment_intent_id && payment.stripe_payment_intent_id === input.stripe_payment_intent_id)
    );
    const record: PaymentRecord = {
      id: existing?.id ?? randomUUID(),
      lead_id: input.lead_id ?? existing?.lead_id ?? null,
      user_id: input.user_id ?? existing?.user_id ?? null,
      unit: input.unit,
      sku: input.sku,
      stripe_session_id: input.stripe_session_id ?? existing?.stripe_session_id ?? null,
      stripe_payment_intent_id: input.stripe_payment_intent_id ?? existing?.stripe_payment_intent_id ?? null,
      stripe_customer_id: input.stripe_customer_id ?? existing?.stripe_customer_id ?? null,
      customer_email: email || existing?.customer_email || null,
      amount_mxn: input.amount_mxn ?? existing?.amount_mxn ?? null,
      status: input.status,
      source: input.source ?? existing?.source ?? null,
      paid_at: input.paid_at ?? existing?.paid_at ?? null,
      refunded_at: input.refunded_at ?? existing?.refunded_at ?? null,
      updated_at: now,
      created_at: existing?.created_at ?? now
    };

    if (existing) {
      Object.assign(existing, record);
    } else {
      memoryPayments.push(record);
    }
    return record.id;
  }

  await ensureTables();
  const rowId = randomUUID();
  const values = [
    rowId,
    input.lead_id ?? null,
    input.user_id ?? null,
    input.unit,
    input.sku,
    input.stripe_session_id ?? null,
    input.stripe_payment_intent_id ?? null,
    input.stripe_customer_id ?? null,
    email || null,
    input.amount_mxn ?? null,
    input.status,
    input.source ?? null,
    input.paid_at ?? null,
    input.refunded_at ?? null
  ];

  const fields = `
    id, lead_id, user_id, unit, sku, stripe_session_id, stripe_payment_intent_id,
    stripe_customer_id, customer_email, amount_mxn, status, source, paid_at, refunded_at
  `;
  const placeholders = `$1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14`;

  if (input.stripe_session_id) {
    const result = await currentPool.query(
      `
        INSERT INTO payments (${fields}) VALUES (${placeholders})
        ON CONFLICT (stripe_session_id) DO UPDATE
        SET
          lead_id = COALESCE(EXCLUDED.lead_id, payments.lead_id),
          user_id = COALESCE(EXCLUDED.user_id, payments.user_id),
          unit = EXCLUDED.unit,
          sku = EXCLUDED.sku,
          stripe_payment_intent_id = COALESCE(EXCLUDED.stripe_payment_intent_id, payments.stripe_payment_intent_id),
          stripe_customer_id = COALESCE(EXCLUDED.stripe_customer_id, payments.stripe_customer_id),
          customer_email = COALESCE(EXCLUDED.customer_email, payments.customer_email),
          amount_mxn = COALESCE(EXCLUDED.amount_mxn, payments.amount_mxn),
          status = EXCLUDED.status,
          source = COALESCE(EXCLUDED.source, payments.source),
          paid_at = COALESCE(EXCLUDED.paid_at, payments.paid_at),
          refunded_at = COALESCE(EXCLUDED.refunded_at, payments.refunded_at),
          updated_at = NOW()
        RETURNING id
      `,
      values
    );
    return result.rows[0]?.id ?? rowId;
  }

  if (input.stripe_payment_intent_id) {
    const result = await currentPool.query(
      `
        INSERT INTO payments (${fields}) VALUES (${placeholders})
        ON CONFLICT (stripe_payment_intent_id) DO UPDATE
        SET
          lead_id = COALESCE(EXCLUDED.lead_id, payments.lead_id),
          user_id = COALESCE(EXCLUDED.user_id, payments.user_id),
          unit = EXCLUDED.unit,
          sku = EXCLUDED.sku,
          stripe_session_id = COALESCE(EXCLUDED.stripe_session_id, payments.stripe_session_id),
          stripe_customer_id = COALESCE(EXCLUDED.stripe_customer_id, payments.stripe_customer_id),
          customer_email = COALESCE(EXCLUDED.customer_email, payments.customer_email),
          amount_mxn = COALESCE(EXCLUDED.amount_mxn, payments.amount_mxn),
          status = EXCLUDED.status,
          source = COALESCE(EXCLUDED.source, payments.source),
          paid_at = COALESCE(EXCLUDED.paid_at, payments.paid_at),
          refunded_at = COALESCE(EXCLUDED.refunded_at, payments.refunded_at),
          updated_at = NOW()
        RETURNING id
      `,
      values
    );
    return result.rows[0]?.id ?? rowId;
  }

  await currentPool.query(`INSERT INTO payments (${fields}) VALUES (${placeholders})`, values);
  return rowId;
}

type GrantEntitlementInput = {
  payment_id: string;
  user_id?: string | null;
  customer_email: string;
  unit: SolutionUnit;
  sku: SkuId;
  stripe_session_id?: string | null;
};

export async function grantEntitlement(input: GrantEntitlementInput): Promise<string | null> {
  const offer = getSolutionOffer(input.sku);
  const email = normalizeEmail(input.customer_email);
  if (!offer || !email) return null;

  const now = new Date().toISOString();
  const status: EntitlementStatus = input.user_id ? "active" : "pending_claim";
  const currentPool = await getPool();

  if (!currentPool) {
    const existing = memoryEntitlements.find(
      (entitlement) => entitlement.payment_id === input.payment_id && entitlement.sku === input.sku
    );
    const record: EntitlementRecord = {
      id: existing?.id ?? randomUUID(),
      user_id: input.user_id ?? existing?.user_id ?? null,
      customer_email: email,
      unit: input.unit,
      sku: input.sku,
      title: offer.title,
      status: input.user_id ? "active" : existing?.status ?? status,
      payment_id: input.payment_id,
      stripe_session_id: input.stripe_session_id ?? existing?.stripe_session_id ?? null,
      access_url: offer.accessUrl,
      granted_at: input.user_id ? existing?.granted_at ?? now : existing?.granted_at ?? null,
      expires_at: existing?.expires_at ?? null,
      updated_at: now,
      created_at: existing?.created_at ?? now
    };

    if (existing) {
      Object.assign(existing, record);
    } else {
      memoryEntitlements.push(record);
    }
    return record.id;
  }

  await ensureTables();
  const result = await currentPool.query(
    `
      INSERT INTO entitlements (
        id, user_id, customer_email, unit, sku, title, status, payment_id,
        stripe_session_id, access_url, granted_at
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      ON CONFLICT (payment_id, sku) DO UPDATE
      SET
        user_id = COALESCE(EXCLUDED.user_id, entitlements.user_id),
        customer_email = EXCLUDED.customer_email,
        unit = EXCLUDED.unit,
        title = EXCLUDED.title,
        status = CASE
          WHEN EXCLUDED.user_id IS NOT NULL THEN 'active'
          ELSE entitlements.status
        END,
        stripe_session_id = COALESCE(EXCLUDED.stripe_session_id, entitlements.stripe_session_id),
        access_url = EXCLUDED.access_url,
        granted_at = COALESCE(entitlements.granted_at, EXCLUDED.granted_at),
        updated_at = NOW()
      RETURNING id
    `,
    [
      randomUUID(),
      input.user_id ?? null,
      email,
      input.unit,
      input.sku,
      offer.title,
      status,
      input.payment_id,
      input.stripe_session_id ?? null,
      offer.accessUrl,
      input.user_id ? now : null
    ]
  );

  return result.rows[0]?.id ?? null;
}

export async function claimEntitlementsForUser(userId: string, email?: string | null): Promise<void> {
  const normalizedEmail = normalizeEmail(email);
  if (!userId || !normalizedEmail) return;

  const currentPool = await getPool();
  if (!currentPool) {
    for (const entitlement of memoryEntitlements) {
      if (entitlement.customer_email === normalizedEmail && entitlement.status === "pending_claim") {
        entitlement.user_id = userId;
        entitlement.status = "active";
        entitlement.granted_at = entitlement.granted_at ?? new Date().toISOString();
        entitlement.updated_at = new Date().toISOString();
      }
    }
    return;
  }

  await ensureTables();
  await currentPool.query(
    `
      UPDATE entitlements
      SET user_id = $1, status = 'active', granted_at = COALESCE(granted_at, NOW()), updated_at = NOW()
      WHERE customer_email = $2 AND status = 'pending_claim'
    `,
    [userId, normalizedEmail]
  );
}

export async function revokeEntitlementsByPayment(paymentId: string, status: Extract<EntitlementStatus, "refunded" | "revoked">): Promise<void> {
  if (!paymentId) return;

  const currentPool = await getPool();
  if (!currentPool) {
    for (const entitlement of memoryEntitlements) {
      if (entitlement.payment_id === paymentId) {
        entitlement.status = status;
        entitlement.updated_at = new Date().toISOString();
      }
    }
    return;
  }

  await ensureTables();
  await currentPool.query(`UPDATE entitlements SET status = $1, updated_at = NOW() WHERE payment_id = $2`, [status, paymentId]);
}

export async function listEntitlementsForUser(userId: string, email?: string | null): Promise<EntitlementRecord[]> {
  const normalizedEmail = normalizeEmail(email);
  const currentPool = await getPool();

  if (!currentPool) {
    return memoryEntitlements.filter(
      (entitlement) =>
        entitlement.user_id === userId ||
        (normalizedEmail && entitlement.customer_email === normalizedEmail)
    );
  }

  await ensureTables();
  const result = await currentPool.query(
    `
      SELECT
        id, user_id, customer_email, unit, sku, title, status, payment_id,
        stripe_session_id, access_url, granted_at, expires_at, created_at, updated_at
      FROM entitlements
      WHERE user_id = $1 OR customer_email = $2
      ORDER BY created_at DESC
    `,
    [userId, normalizedEmail]
  );

  return result.rows.map((row) => ({
    ...row,
    sku: row.sku as SkuId,
    unit: row.unit as SolutionUnit,
    status: row.status as EntitlementStatus,
    granted_at: row.granted_at ? new Date(row.granted_at).toISOString() : null,
    expires_at: row.expires_at ? new Date(row.expires_at).toISOString() : null,
    created_at: new Date(row.created_at).toISOString(),
    updated_at: new Date(row.updated_at).toISOString()
  }));
}

export async function listPaymentsForUser(userId: string, email?: string | null): Promise<PaymentRecord[]> {
  const normalizedEmail = normalizeEmail(email);
  const currentPool = await getPool();

  if (!currentPool) {
    return memoryPayments.filter(
      (payment) => payment.user_id === userId || (normalizedEmail && payment.customer_email === normalizedEmail)
    );
  }

  await ensureTables();
  const result = await currentPool.query(
    `
      SELECT
        id, lead_id, user_id, unit, sku, stripe_session_id, stripe_payment_intent_id,
        stripe_customer_id, customer_email, amount_mxn, status, source, paid_at,
        refunded_at, created_at, updated_at
      FROM payments
      WHERE user_id = $1 OR customer_email = $2
      ORDER BY created_at DESC
    `,
    [userId, normalizedEmail]
  );

  return result.rows.map((row) => ({
    ...row,
    sku: row.sku as SkuId,
    unit: row.unit as SolutionUnit,
    status: row.status as PaymentStatus,
    paid_at: row.paid_at ? new Date(row.paid_at).toISOString() : null,
    refunded_at: row.refunded_at ? new Date(row.refunded_at).toISOString() : null,
    created_at: new Date(row.created_at).toISOString(),
    updated_at: new Date(row.updated_at).toISOString()
  }));
}
