// app/api/chrono-direct/test/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function assertEnv() {
  const {
    SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY,
    RESEND_API_KEY,
    RESEND_FROM,
    OPS_EMAIL,
  } = process.env;

  const missing: string[] = [];
  if (!SUPABASE_URL) missing.push("SUPABASE_URL");
  if (!SUPABASE_SERVICE_ROLE_KEY) missing.push("SUPABASE_SERVICE_ROLE_KEY");
  if (!RESEND_API_KEY) missing.push("RESEND_API_KEY");
  if (!RESEND_FROM) missing.push("RESEND_FROM");
  if (!OPS_EMAIL) missing.push("OPS_EMAIL");

  if (missing.length) {
    console.error("ENV missing:", missing.join(", "));
    throw new Error("Server misconfig: " + missing.join(", "));
  }
  return {
    SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY,
    RESEND_API_KEY,
    RESEND_FROM,
    OPS_EMAIL,
  } as Record<string, string>;
}

export async function GET(req: Request) {
  try {
    const env = assertEnv();
    const url = new URL(req.url);
    const email = (url.searchParams.get("email") || process.env.OPS_EMAIL || "").toLowerCase();

    if (!email) {
      return NextResponse.json(
        { error: "Provide ?email= or set OPS_EMAIL." },
        { status: 400 }
      );
    }

    const payload = {
      company: "Demo BV",
      contact: "Test Aanvrager",
      email,
      phone: "+31 6 12345678",
      city: "Rotterdam",
      start_date: new Date().toISOString().slice(0, 10),
      duration_days: "3",
      hours_per_day: "8",
      requirements: "BHV, VCA",
      message: "Dit is een geautomatiseerde test-aanvraag.",
      urgent: false,
      budget_range: "€40–45/u",
      consent: true,
      source: "chrono-direct-test",
    };

    // 1) Insert in Supabase
    const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
    const { error: insErr } = await supabase.from("direct_requests").insert(payload);

    if (insErr) {
      console.error("[chrono-test] insert error:", insErr);
      // Ga toch door met mail zodat je Resend ook test
    }

    // 2) Mail naar OPS
    const htmlOps = `
      <h2>[TEST] Nieuwe directe inzetaanvraag</h2>
      <p><strong>Bedrijf:</strong> ${escapeHtml(payload.company)}</p>
      <p><strong>Contact:</strong> ${escapeHtml(payload.contact)}</p>
      <p><strong>E-mail:</strong> ${escapeHtml(payload.email)}</p>
      <p><strong>Telefoon:</strong> ${escapeHtml(payload.phone)}</p>
      <p><strong>Locatie:</strong> ${escapeHtml(payload.city)}</p>
      <p><strong>Startdatum:</strong> ${escapeHtml(payload.start_date)}</p>
      <p><strong>Duur (dagen):</strong> ${escapeHtml(payload.duration_days)}</p>
      <p><strong>Uren per dag:</strong> ${escapeHtml(payload.hours_per_day)}</p>
      <p><strong>Certificaten:</strong> ${escapeHtml(payload.requirements)}</p>
      <p><strong>Budget:</strong> ${escapeHtml(payload.budget_range)}</p>
      <p><strong>Toelichting:</strong><br/>${escapeHtml(payload.message).replace(/\n/g, "<br/>")}</p>
      <hr/>
      <p style="color:#64748b">Bron: ${escapeHtml(payload.source)}</p>
    `;

    const opsRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.RESEND_FROM,
        to: [env.OPS_EMAIL],
        subject: `[TEST] Directe inzetaanvraag — ${payload.company} (${payload.city})`,
        html: htmlOps,
      }),
    });

    if (!opsRes.ok) {
      const txt = await opsRes.text();
      console.error("[chrono-test] Resend ops error:", opsRes.status, txt);
      return NextResponse.json(
        { ok: false, warn: "Insert done, mail failed. Check Resend config." },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { ok: true, testEmailSentTo: env.OPS_EMAIL, stored: !insErr },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("[chrono-test] fatal:", err?.message || err);
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

