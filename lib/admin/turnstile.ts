const VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export function isTurnstileConfigured(): boolean {
  return Boolean(process.env.TURNSTILE_SECRET_KEY?.trim());
}

export function isTurnstileRequiredInProduction(): boolean {
  return process.env.NODE_ENV === "production" && isTurnstileConfigured();
}

/** Site key for Turnstile widget (server exposes via /api/admin/login/config). */
export function getTurnstileSiteKey(): string | undefined {
  return (
    process.env.TURNSTILE_SITE_KEY?.trim() ||
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ||
    undefined
  );
}

/** Skip CAPTCHA in development when keys are missing. */
export function shouldSkipTurnstile(): boolean {
  if (process.env.NODE_ENV !== "production") {
    if (!isTurnstileConfigured()) {
      if (typeof console !== "undefined") {
        console.warn(
          "[admin-security] TODO: Set TURNSTILE_SITE_KEY and TURNSTILE_SECRET_KEY for production CAPTCHA."
        );
      }
      return true;
    }
  }
  return false;
}

export async function verifyTurnstileToken(
  token: string | undefined,
  remoteIp: string
): Promise<boolean> {
  if (shouldSkipTurnstile()) return true;

  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) return false;

  if (!token?.trim()) return false;

  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret,
        response: token.trim(),
        remoteip: remoteIp,
      }),
    });
    const data = (await res.json()) as { success?: boolean };
    return Boolean(data.success);
  } catch (err) {
    console.error("[admin-security] Turnstile verify failed", err);
    return false;
  }
}
