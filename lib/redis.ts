// lib/redis.ts
const URL = process.env.UPSTASH_REDIS_REST_URL!;
const TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN!;

async function redisFetch(path: string) {
  const res = await fetch(`${URL}/${path}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Redis ${res.status}: ${text || "unknown"}`);
  }
  return res.json();
}

export async function kvGet(key: string) {
  if (!URL || !TOKEN) return null; // fail open in dev
  const { result } = await redisFetch(`get/${encodeURIComponent(key)}`);
  return result ?? null;
}

export async function kvSetEx(key: string, value: string, ttlSec: number) {
  if (!URL || !TOKEN) return;
  await redisFetch(`set/${encodeURIComponent(key)}/${encodeURIComponent(value)}`);
  await redisFetch(`expire/${encodeURIComponent(key)}/${ttlSec}`);
}

export async function kvIncrWithTTL(key: string, ttlSec: number) {
  if (!URL || !TOKEN) return 1; // dev
  const { result: count } = await redisFetch(`incr/${encodeURIComponent(key)}`);
  if (count === 1) await redisFetch(`expire/${encodeURIComponent(key)}/${ttlSec}`);
  return count as number;
}

export async function kvDel(key: string) {
  if (!URL || !TOKEN) return;
  await redisFetch(`del/${encodeURIComponent(key)}`);
}

