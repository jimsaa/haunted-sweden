/**
 * Stripe architecture stub — no hardcoded pricing.
 * Wire STRIPE_SECRET_KEY / STRIPE_WEBHOOK_SECRET / price IDs via env.
 */

export type StripeBillingInterval = "month" | "year" | "lifetime";

export type StripePriceEnvKey =
  | "STRIPE_PRICE_PREMIUM_MONTHLY"
  | "STRIPE_PRICE_PREMIUM_YEARLY"
  | "STRIPE_PRICE_FOUNDER_LIFETIME";

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY?.trim());
}

export function getStripePriceId(key: StripePriceEnvKey): string | null {
  return process.env[key]?.trim() || null;
}

export const STRIPE_ARCHITECTURE = {
  products: ["premium_membership", "founder_membership"],
  intervals: ["month", "year", "lifetime"] as StripeBillingInterval[],
  envKeys: [
    "STRIPE_SECRET_KEY",
    "STRIPE_WEBHOOK_SECRET",
    "STRIPE_PRICE_PREMIUM_MONTHLY",
    "STRIPE_PRICE_PREMIUM_YEARLY",
    "STRIPE_PRICE_FOUNDER_LIFETIME",
  ],
  notes: [
    "Never hardcode currency amounts in the UI — load from Stripe Price objects.",
    "Checkout + Customer Portal + webhooks land in /api/members/billing (v2).",
    "Entitlement source of truth: memberships table / member.tier after webhook.",
  ],
} as const;
