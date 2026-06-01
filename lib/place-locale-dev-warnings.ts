const warned = new Set<string>();

function warnOnce(key: string, message: string): void {
  if (process.env.NODE_ENV !== "development") return;
  if (warned.has(key)) return;
  warned.add(key);
  console.warn(message);
}

export function warnMissingSafetyNoteSv(slug: string): void {
  warnOnce(
    `safety-sv:${slug}`,
    `[place-i18n] Missing safetyNote_sv for "${slug}" — Swedish UI will not show English safety text.`
  );
}

export function warnMissingSafetyNoteEn(slug: string): void {
  warnOnce(
    `safety-en:${slug}`,
    `[place-i18n] Missing safetyNote_en (safetyNote) for "${slug}".`
  );
}
