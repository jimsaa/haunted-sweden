/**
 * TODO: Replace with proper authentication before production deploy.
 * Client-side dev gate only — mirrors server check for /admin login UI.
 */
const DEV_ADMIN_PASSWORD = "3513";

export function verifyAdminPasswordClient(password: string): boolean {
  if (process.env.NODE_ENV === "production") return false;
  return password === DEV_ADMIN_PASSWORD;
}
