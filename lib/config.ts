export function getReadingWPM(): number {
  const raw = process.env.READING_WPM || process.env.NEXT_PUBLIC_READING_WPM
  const n = raw ? parseInt(raw, 10) : NaN
  // Clamp to a sensible range if provided; default to 225 wpm otherwise
  if (!Number.isFinite(n)) return 225
  return Math.min(400, Math.max(100, n))
}

