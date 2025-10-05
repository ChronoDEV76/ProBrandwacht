export const ZZP_LOCAL_KEY = "psm_profile_zzp";

export function saveZzpLocalWithVersion(entries: Record<string, string>) {
  if (typeof window === "undefined") return;
  const payload = { schemaVersion: "psm-profile/zzp@v1", ...entries };
  localStorage.setItem(ZZP_LOCAL_KEY, JSON.stringify(payload));
}

export function loadZzpLocal<T = unknown>(): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(ZZP_LOCAL_KEY);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}
