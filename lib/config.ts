export function getReadingWPM(): number {
  const raw = process.env.READING_WPM || process.env.NEXT_PUBLIC_READING_WPM || "225"
  const n = raw ? parseInt(raw, 10) : NaN
  // Clamp to a sensible range if provided; default to 225 wpm otherwise
  if (!Number.isFinite(n)) return 225
  return Math.min(400, Math.max(100, n))
}

export function getSignupUrl(): string {
  const url = process.env.NEXT_PUBLIC_SIGNUP_URL
  return url?.trim() || '/opdrachtgevers/aanmelden'
}

export function getGtmId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_GTM_ID?.trim()
  return id || undefined
}

export function getGaMeasurementId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim()
  return id || undefined
}
