// scripts/ops/verifyEnv.mjs
import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";

const ROOT = process.cwd();
const ENV_FILE = path.join(ROOT, ".env.local");

// Laad .env.local indien aanwezig (prod gebruikt Vercel env)
if (fs.existsSync(ENV_FILE)) {
  dotenv.config({ path: ENV_FILE });
}

const required = [
  // Server-side secrets
  "SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "RESEND_API_KEY",
  "RESEND_FROM",

  // Public runtime config
  "NEXT_PUBLIC_BASE_URL",

  // Quota / rate-limit (optioneel, maar aanbevolen)
  // "KV_URL", "KV_REST_API_TOKEN", "KV_REST_API_READ_ONLY_TOKEN"
];

const warnings = [
  // Handige maar niet verplicht
  "NEXT_PUBLIC_ENV",
  "VERCEL_ENV"
];

let ok = true;

console.log("🔎 verifyEnv.mjs — checking required environment variables…\n");

for (const key of required) {
  if (!process.env[key] || String(process.env[key]).trim() === "") {
    ok = false;
    console.error(`❌ Missing: ${key}`);
  } else {
    console.log(`✅ ${key}`);
  }
}

if (warnings.length) {
  console.log("\nℹ️ Optional vars:");
  for (const key of warnings) {
    if (!process.env[key] || String(process.env[key]).trim() === "") {
      console.warn(`   ⚠︎ Not set: ${key}`);
    } else {
      console.log(`   ✓ ${key}`);
    }
  }
}

// Extra controles
console.log("\n🧪 Additional checks:");
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
if (!/^https?:\/\/.+/i.test(baseUrl)) {
  ok = false;
  console.error("❌ NEXT_PUBLIC_BASE_URL must start with http(s):// (e.g. https://www.probrandwacht.nl)");
} else {
  console.log("✅ NEXT_PUBLIC_BASE_URL looks valid");
}

const from = process.env.RESEND_FROM || "";
if (!/.+@.+\..+/.test(from)) {
  ok = false;
  console.error("❌ RESEND_FROM must be a valid email (e.g. noreply@yourdomain.nl)");
} else {
  console.log("✅ RESEND_FROM looks valid");
}

if (!ok) {
  console.error("\n⛔ Environment check failed. Fix the missing/invalid variables above.");
  process.exit(1);
}

console.log("\n🎉 All required environment variables are present.\n");
