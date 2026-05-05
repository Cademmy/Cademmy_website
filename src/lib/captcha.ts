import { randomUUID } from "node:crypto";

type TurnstileVerificationResult = {
  success?: boolean;
  "error-codes"?: string[];
};

export async function verifyTurnstileToken(token?: string, sourceIp?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret,
        response: token,
        remoteip: sourceIp ?? "",
        idempotency_key: randomUUID()
      }),
      signal: AbortSignal.timeout(8000)
    });

    if (!response.ok) return false;
    const data = (await response.json()) as TurnstileVerificationResult;
    return !!data.success;
  } catch {
    return false;
  }
}
