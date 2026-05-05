type RateLimitResult = { ok: boolean; remaining: number; resetAt: number };

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

function getRedisRestConfig() {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) return null;
  return { url, token };
}

async function checkRedisRateLimit(key: string, limit: number, windowMs: number): Promise<RateLimitResult> {
  const config = getRedisRestConfig();
  if (!config) {
    throw new Error("Redis REST no configurado");
  }

  const now = Date.now();
  const windowStart = Math.floor(now / windowMs) * windowMs;
  const resetAt = windowStart + windowMs;
  const ttlSeconds = Math.max(1, Math.ceil((resetAt - now) / 1000));
  const redisKey = `rate_limit:${key}:${windowStart}`;

  const response = await fetch(`${config.url}/multi-exec`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify([
      ["INCR", redisKey],
      ["EXPIRE", redisKey, ttlSeconds]
    ]),
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("No se pudo consultar Redis REST");
  }

  const payload = (await response.json()) as Array<{ result?: number; error?: string }>;
  const current = Number(payload[0]?.result ?? 0);

  return {
    ok: current <= limit,
    remaining: Math.max(0, limit - current),
    resetAt
  };
}

function checkMemoryRateLimit(key: string, limit = 10, windowMs = 15 * 60 * 1000): RateLimitResult {
  const now = Date.now();
  const current = buckets.get(key);

  if (!current || current.resetAt < now) {
    const resetAt = now + windowMs;
    buckets.set(key, { count: 1, resetAt });
    return { ok: true, remaining: limit - 1, resetAt };
  }

  if (current.count >= limit) {
    return { ok: false, remaining: 0, resetAt: current.resetAt };
  }

  current.count += 1;
  buckets.set(key, current);
  return { ok: true, remaining: limit - current.count, resetAt: current.resetAt };
}

export async function checkRateLimit(key: string, limit = 10, windowMs = 15 * 60 * 1000): Promise<RateLimitResult> {
  try {
    if (getRedisRestConfig()) {
      return await checkRedisRateLimit(key, limit, windowMs);
    }
  } catch {
    // Fallback local para desarrollo o si Redis no está disponible.
  }

  return checkMemoryRateLimit(key, limit, windowMs);
}
