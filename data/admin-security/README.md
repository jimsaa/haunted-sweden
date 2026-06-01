# Admin security runtime data

Written at runtime (gitignored):

- `security-events.log` — audit trail (IP, country, username, reason; never passwords)
- `login-rate-limit.json` — per-IP failed login counters

## Environment variables (Vercel / `.env.local`)

| Variable | Purpose |
|----------|---------|
| `ADMIN_SESSION_SECRET` | Signs 8-hour session tokens (required in production) |
| `TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key |
| `TURNSTILE_SECRET_KEY` | Turnstile secret for server verification |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Optional alias for site key |

In development, Turnstile is skipped when keys are missing (see server console TODO).
