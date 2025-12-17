// app/api/probrandwacht-direct/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Node runtime (geen Edge i.v.m. libs)
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Payload = {
  company: string;
  contact: string;
  email: string;
  phone?: string;
  city?: string;
  startDate?: string;
  duration?: string;
  hoursPerDay?: string;
  requirements?: string;
  message?: string;
  urgent?: boolean;
  budget?: string;
  consent?: boolean;
  website?: string; // honeypot
  source?: string;
};

function assertEnv() {
  const {
    SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY,
    RESEND_API_KEY,
    RESEND_FROM,
    OPS_EMAIL, // bv. sales@chronosolutions.nl
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

// simpele allowlist voor test e-mails die niet geratelimited worden
const TEST_ALLOW = new Set([
  "info@chronosolutions.nl",
  "rokro@ziggo.nl",
  // voeg hier jouw testadressen toe
]);

export async function POST(req: Request) {
  try {
    const env = assertEnv();
    const body = (await req.json()) as Payload;

    // honeypot spam check
    if (body.website && body.website.trim().length > 0) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // basale validatie
    if (!body.email || !body.company || !body.contact) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // rate-limit: 1 aanvraag per e-mail per 24h (test-allowlist uitgezonderd)
    const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
    if (!TEST_ALLOW.has(body.email.toLowerCase())) {
      const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      const { data: recent, error: rlErr } = await supabase
        .from("direct_requests")
        .select("id, created_at")
        .eq("email", body.email.toLowerCase())
        .gte("created_at", since)
        .limit(1);
      if (rlErr) {
        console.warn("[chrono] ratelimit check warning:", rlErr);
      }
      if (recent && recent.length > 0) {
        return NextResponse.json(
          { ok: true, throttled: true, message: "Je hebt recent al een aanvraag gedaan. We nemen snel contact op." },
          { status: 200 }
        );
      }
    }

    // opslaan in Supabase
    const { error: insErr } = await supabase.from("direct_requests").insert({
      company: body.company,
      contact: body.contact,
      email: body.email.toLowerCase(),
      phone: body.phone ?? null,
      city: body.city ?? null,
      start_date: body.startDate ?? null,
      duration_days: body.duration ?? null,
      hours_per_day: body.hoursPerDay ?? null,
      requirements: body.requirements ?? null,
      message: body.message ?? null,
      urgent: !!body.urgent,
      budget_range: body.budget ?? null,
      consent: !!body.consent,
      source: body.source ?? "probrandwacht-direct",
    });

    if (insErr) {
      console.error("[chrono] insert error:", insErr);
      // we proberen alsnog mail te sturen, maar geven 200 terug met waarschuwing
    }

    // e-mail naar operations (Chrono4Solutions)
    const htmlOps = `
      <h2>Nieuwe directe inzetaanvraag</h2>
      <p><strong>Bedrijf:</strong> ${escapeHtml(body.company)}</p>
      <p><strong>Contact:</strong> ${escapeHtml(body.contact)}</p>
      <p><strong>E-mail:</strong> ${escapeHtml(body.email)}</p>
      <p><strong>Telefoon:</strong> ${escapeHtml(body.phone || "-")}</p>
      <p><strong>Locatie:</strong> ${escapeHtml(body.city || "-")}</p>
      <p><strong>Startdatum:</strong> ${escapeHtml(body.startDate || "-")}</p>
      <p><strong>Duur (dagen):</strong> ${escapeHtml(body.duration || "-")}</p>
      <p><strong>Uren per dag:</strong> ${escapeHtml(body.hoursPerDay || "-")}</p>
      <p><strong>Certificaten:</strong> ${escapeHtml(body.requirements || "-")}</p>
      <p><strong>Budget:</strong> ${escapeHtml(body.budget || "-")}</p>
      <p><strong>Spoed:</strong> ${body.urgent ? "Ja" : "Nee"}</p>
      <p><strong>Toelichting:</strong><br/>${escapeHtml(body.message || "-").replace(/\n/g, "<br/>")}</p>
      <hr/>
      <p style="color:#64748b">Bron: ${escapeHtml(body.source || "probrandwacht-direct")} • AVG: ${
      body.consent ? "toestemming gegeven" : "geen vinkje"
    }</p>
    `;

    const htmlUser = `
      <p>Beste ${escapeHtml(body.contact)},</p>
      <p>Bedankt voor je aanvraag. We nemen snel contact op om de inzet af te stemmen.<br/>
      Indien het binnen <strong>ProSafetyMatch</strong> past, regelen we de inzet eerlijk en DBA-bewust. 
      Is directe levering nodig, dan schakelen we via <strong>Chrono4Solutions</strong>.</p>
      <p>— Team ProBrandwacht</p>
    `;

    // Resend: mail naar ops
    const opsRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM,
        to: [env.OPS_EMAIL],
        reply_to: body.email,
        subject: `Nieuwe directe inzetaanvraag — ${body.company} (${body.city || "locatie n.b."})`,
        html: htmlOps,
      }),
    });

    if (!opsRes.ok) {
      console.error("[chrono] Resend ops error:", opsRes.status, await opsRes.text());
    }

    // Resend: bevestiging naar aanvrager
    const userRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM,
        to: [body.email],
        subject: "Ontvangen: directe inzetaanvraag — ProBrandwacht / Chrono4Solutions",
        html: htmlUser,
      }),
    });

    if (!userRes.ok) {
      console.error("[chrono] Resend user error:", userRes.status, await userRes.text());
      // Geen harde fout naar UI; aanvraag is gelogd
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err: any) {
    console.error("[chrono] fatal:", err?.message || err);
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
