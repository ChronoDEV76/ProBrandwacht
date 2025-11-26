import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

// --- Runtime ---
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ---- Types ----
type Payload = {
  name?: string | null;
  email: string;
  role: "brandwacht" | "beveiliger" | "mvk";
  bureauHourly: number;          // huidig via bureau (€/uur)
  hoursPerMonth: number;         // uren per maand (totaal)
  costPct?: number;              // kosten (% van omzet)
  hasInsurance?: boolean;        // AOV/pensioen aanwezig
  deductions?: { zelfstandig?: boolean; mkb?: boolean; starters?: boolean };
  consent?: boolean;
  source?: string;
  // anti-spam honeypot (mag NIET ingevuld zijn)
  website?: string;
};

// ---- Config / ENV ----
const LOGO_PATH = "/probrandwacht-logo.png"; // uit /public

function assertEnv() {
  const {
    SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY,
    RESEND_API_KEY,
    RESEND_FROM,
    NEXT_PUBLIC_BASE_URL,
    UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN,
    TEST_BYPASS_EMAILS,
  } = process.env;

  const missing: string[] = [];
  if (!SUPABASE_URL) missing.push("SUPABASE_URL");
  if (!SUPABASE_SERVICE_ROLE_KEY) missing.push("SUPABASE_SERVICE_ROLE_KEY");
  if (!RESEND_API_KEY) missing.push("RESEND_API_KEY");
  if (!RESEND_FROM) missing.push("RESEND_FROM");
  if (!NEXT_PUBLIC_BASE_URL) missing.push("NEXT_PUBLIC_BASE_URL");
  if (!UPSTASH_REDIS_REST_URL) missing.push("UPSTASH_REDIS_REST_URL");
  if (!UPSTASH_REDIS_REST_TOKEN) missing.push("UPSTASH_REDIS_REST_TOKEN");

  if (missing.length) {
    console.error("ENV missing:", missing.join(", "));
    throw new Error("Server misconfig: " + missing.join(", "));
  }

  return {
    SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY,
    RESEND_API_KEY,
    RESEND_FROM,
    NEXT_PUBLIC_BASE_URL,
    UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN,
    TEST_BYPASS_EMAILS: TEST_BYPASS_EMAILS ?? "",
  } as Record<string, string>;
}

// ---- Marktconform richtwaarden (conservatief) ----
const ROLE_MARKET_HINT: Record<string, number> = {
  brandwacht: 43,
  beveiliger: 38,
  mvk: 65,
};
function calculateMarketHourly(role: string, bureauHourly: number): number {
  const hint = ROLE_MARKET_HINT[role] ?? bureauHourly + 10;
  const uplift = Math.min(Math.max(bureauHourly + 12, bureauHourly * 1.2), bureauHourly + 20);
  return Math.round(((hint + uplift) / 2) * 100) / 100;
}

// ---- Upstash Rate-Limit: 1 per 24 uur per email ----
async function assertRateLimit(env: Record<string, string>, email: string) {
  const bypassList = env.TEST_BYPASS_EMAILS
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  if (bypassList.includes(email.toLowerCase())) {
    return; // bypass voor testen
  }

  const windowSeconds = 24 * 60 * 60; // 24h
  const key = `lead:email:${email.toLowerCase()}`;

  const url = `${env.UPSTASH_REDIS_REST_URL}/setnx/${encodeURIComponent(key)}/1`;
  const setnx = await fetch(url, {
    headers: { Authorization: `Bearer ${env.UPSTASH_REDIS_REST_TOKEN}` },
    cache: "no-store",
  }).then((r) => r.json());

  if (setnx?.result === 1) {
    // First time -> set expiry
    await fetch(`${env.UPSTASH_REDIS_REST_URL}/expire/${encodeURIComponent(key)}/${windowSeconds}`, {
      headers: { Authorization: `Bearer ${env.UPSTASH_REDIS_REST_TOKEN}` },
      cache: "no-store",
    });
    return;
  }

  // Already set -> still in window
  throw new Error("RATE_LIMIT");
}

// ---- Main Handler ----
export async function POST(req: Request) {
  try {
    const env = assertEnv();

    const body = (await req.json()) as Payload;
    console.log("[lead] incoming:", body);

    // Honeypot (bots vullen 'website' stiekem in)
    if (body.website && body.website.trim() !== "") {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    if (!body.email || !body.bureauHourly || !body.hoursPerMonth) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // Rate limit
    try {
      await assertRateLimit(env, body.email);
    } catch (e: any) {
      if (e?.message === "RATE_LIMIT") {
        return NextResponse.json(
          { error: "Je hebt al een rapport aangevraagd. Probeer het over 24 uur opnieuw." },
          { status: 429 }
        );
      }
      throw e;
    }

    // ---- Berekeningen ----
    const marketHourly = calculateMarketHourly(body.role, body.bureauHourly);

    // Fees (indicatief)
    const PLATFORM_FEE = 0.10;
    const ESCROW_MIN = 0.01;
    const ESCROW_MAX = 0.02;

    const netMin = marketHourly * (1 - PLATFORM_FEE - ESCROW_MAX);
    const netMax = marketHourly * (1 - PLATFORM_FEE - ESCROW_MIN);

    const revenueMonth = marketHourly * body.hoursPerMonth;
    const costsMonth = revenueMonth * ((body.costPct ?? 0) / 100);
    const profitBeforeTax = revenueMonth - costsMonth;

    // eenvoudige IB-schatting
    const baseTaxPct =
      (body.deductions?.zelfstandig ? 0.16 : 0.20) -
      (body.deductions?.mkb ? 0.02 : 0) -
      (body.deductions?.starters ? 0.02 : 0);
    const estTax = Math.max(profitBeforeTax * baseTaxPct, 0);
    const netMonth = profitBeforeTax - estTax;
    const netYear = netMonth * 12;

    const diffPerHour = Math.max(marketHourly - body.bureauHourly, 0);
    const diffPerMonth = diffPerHour * body.hoursPerMonth;

    // 10% minder uren indicatie
    const reducedHours = body.hoursPerMonth * 0.9;
    const reducedRevenue = marketHourly * reducedHours;
    const reducedCosts = reducedRevenue * ((body.costPct ?? 0) / 100);
    const reducedProfitBeforeTax = reducedRevenue - reducedCosts;
    const reducedTax = Math.max(reducedProfitBeforeTax * baseTaxPct, 0);
    const reducedNetMonth = reducedProfitBeforeTax - reducedTax;

    // Vergelijking (bruto omzet) bureau vs marktconform
    const omzetBureau = body.bureauHourly * body.hoursPerMonth;
    const omzetMarkt = revenueMonth;

    // ---- PDF genereren ----
    const pdf = await PDFDocument.create();
    const page = pdf.addPage([595.28, 841.89]); // A4
    const { width, height } = page.getSize();
    const font = await pdf.embedFont(StandardFonts.Helvetica);

    // Header
    page.drawText("Persoonlijk Rapport — ProSafetyMatch", {
      x: 40,
      y: height - 60,
      size: 18,
      font,
      color: rgb(0.10, 0.10, 0.10),
    });

    // ProBrandwacht-logo rechtsboven
    try {
      const logoRes = await fetch(`${env.NEXT_PUBLIC_BASE_URL}${LOGO_PATH}`);
      if (logoRes.ok) {
        const bytes = new Uint8Array(await logoRes.arrayBuffer());
        const ct = logoRes.headers.get("content-type") || "";
        const img = ct.includes("png") ? await pdf.embedPng(bytes) : await pdf.embedJpg(bytes);
        const w = 140;
        const h = (img.height / img.width) * w;
        page.drawImage(img, { x: width - w - 40, y: height - h - 30, width: w, height: h });
      }
    } catch {
      /* stil verder gaan zonder logo */
    }

    const line = (t: string, y: number, size = 12) =>
      page.drawText(t, { x: 40, y, size, font, color: rgb(0.12, 0.12, 0.12) });

    let y = height - 100;
    line(`Naam: ${body.name || "-"}`, (y -= 18));
    line(`E-mail: ${body.email}`, (y -= 16));
    line(`Rol: ${body.role}`, (y -= 16));
    y -= 8;

    page.drawText("Invoer", { x: 40, y: (y -= 22), size: 13, font, color: rgb(0.05, 0.05, 0.05) });
    line(`Huidig uurtarief via bureau: € ${body.bureauHourly.toFixed(2)}`, (y -= 18));
    line(`Uren p/m: ${body.hoursPerMonth}`, (y -= 16));
    line(`Kosten (%): ${body.costPct ?? 0}%`, (y -= 16));
    line(
      `Aftrekposten: Zelfstandigenaftrek (${body.deductions?.zelfstandig ? "ja" : "nee"}), ` +
        `MKB-vrijstelling (${body.deductions?.mkb ? "ja" : "nee"}), ` +
        `Startersaftrek (${body.deductions?.starters ? "ja" : "nee"})`,
      (y -= 16)
    );

    y -= 10;
    page.drawText("Marktconform & netto via ProSafetyMatch", {
      x: 40,
      y: (y -= 22),
      size: 13,
      font,
      color: rgb(0.05, 0.05, 0.05),
    });
    line(`Marktconform (bruto): € ${marketHourly.toFixed(2)} / uur`, (y -= 18));
    line(
      `Netto range (incl. 10% platform + 1–2% betaalbuffer): € ${netMin.toFixed(2)} – € ${netMax.toFixed(2)} / uur`,
      (y -= 16)
    );

    y -= 10;
    page.drawText("Resultaten na belasting (indicatief)", {
      x: 40,
      y: (y -= 22),
      size: 13,
      font,
      color: rgb(0.05, 0.05, 0.05),
    });
    line(`Omzet p/m (marktconform): € ${revenueMonth.toFixed(2)}`, (y -= 18));
    line(`Kosten p/m: € ${costsMonth.toFixed(2)}`, (y -= 16));
    line(`Winst vóór IB p/m: € ${profitBeforeTax.toFixed(2)}`, (y -= 16));
    line(`Inkomstenbelasting (schatting): € ${estTax.toFixed(2)}`, (y -= 16));
    line(`Netto p/m: € ${netMonth.toFixed(2)}`, (y -= 16));
    line(`Netto p/j: € ${netYear.toFixed(2)}`, (y -= 16));

    y -= 10;
    page.drawText("Indicatie bij 10% minder uren:", {
      x: 40,
      y: (y -= 22),
      size: 13,
      font,
      color: rgb(0.05, 0.05, 0.05),
    });
    line(`Netto p/m (–10% uren): € ${reducedNetMonth.toFixed(2)}`, (y -= 18));

    y -= 10;
    page.drawText("Vergelijking met huidige situatie", {
      x: 40,
      y: (y -= 22),
      size: 13,
      font,
      color: rgb(0.05, 0.05, 0.05),
    });
    line(`Omzet p/m via bureau (bruto): € ${omzetBureau.toFixed(2)}`, (y -= 18));
    line(`Omzet p/m via ProSafetyMatch (marktconform): € ${omzetMarkt.toFixed(2)}`, (y -= 16));
    line(`Extra per uur t.o.v. bureau: +€ ${diffPerHour.toFixed(2)} / uur`, (y -= 16));
    line(`Extra per maand (zelfde uren): +€ ${diffPerMonth.toFixed(2)}`, (y -= 16));

    y -= 14;
    line("Berekeningen gebaseerd op feedback en marktdata uit de sector (200+ professionals).", (y -= 16));
    line(
      "Sluit je aan bij ProSafetyMatch en word een gamechanger in jouw vak.",
      (y -= 16)
    );
    line(`${env.NEXT_PUBLIC_BASE_URL}/zzp/aanmelden`, (y -= 16));

    const pdfBytes = await pdf.save();

    // ---- Supabase opslaan ----
    const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

    // Leads
    const { data: leadRow, error: leadErr } = await supabase
      .from("leads")
      .insert({
        name: body.name ?? null,
        email: body.email,
        role: body.role,
        hourly: marketHourly, // marktconform indicatie
        hours_per_month: body.hoursPerMonth,
        cost_pct: body.costPct ?? 0,
        has_insurance: !!body.hasInsurance,
        deductions: body.deductions ?? {},
        consent: !!body.consent,
        source: body.source ?? "lead-calculator",
      })
      .select()
      .single();

    if (leadErr) console.warn("[lead] insert leads warning:", leadErr);

    // lead_calculations
    if (leadRow?.id) {
      const { error: calcErr } = await supabase.from("lead_calculations").insert({
        lead_id: leadRow.id,
        revenue_month: revenueMonth,
        costs_month: costsMonth,
        profit_before_tax: profitBeforeTax,
        est_tax: estTax,
        net_month: netMonth,
        net_year: netYear,
        diff_per_hour: diffPerHour,
        report_path: null, // vullen na upload
      });
      if (calcErr) console.warn("[lead] insert calc warning:", calcErr);
    }

    // Storage upload
    const reportPath = `lead-${crypto.randomUUID()}.pdf`;
    const { error: upErr } = await supabase.storage
      .from("reports")
      .upload(reportPath, pdfBytes, { contentType: "application/pdf", upsert: true });
    if (upErr) {
      console.error("[lead] upload error:", upErr);
      return NextResponse.json({ ok: false, error: "Storage upload failed" }, { status: 500 });
    }

    // Signed URL
    const { data: signedUrlData, error: signedErr } = await supabase
      .storage
      .from("reports")
      .createSignedUrl(reportPath, 60 * 60 * 72);
    if (signedErr || !signedUrlData?.signedUrl) {
      console.error("[lead] signed url error:", signedErr);
      return NextResponse.json({ ok: false, error: "Create signed URL failed" }, { status: 500 });
    }

    // Email via Resend
    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.RESEND_FROM, // bv. noreply@prosafetymatch.nl (geverified)
        to: [body.email],
        subject: "Jouw persoonlijke tariefrapport — ProSafetyMatch",
        html: `
          <p>Hi ${body.name || "professional"},</p>
          <p>Je rapport is klaar. Download het hier (72 uur geldig):<br/>
          <a href="${signedUrlData.signedUrl}">Download PDF</a></p>
          <p>Transparant samenwerken zonder tussenlaag? Sluit je aan en werk marktconform:</p>
          <p><a href="${env.NEXT_PUBLIC_BASE_URL}/zzp/aanmelden">Aanmelden bij ProSafetyMatch</a></p>
          <p>— Team ProBrandwacht · ProSafetyMatch</p>
        `,
      }),
    });

    if (!emailRes.ok) {
      const txt = await emailRes.text();
      console.error("[lead] Resend error:", emailRes.status, txt);
      // Rapport is wél aangemaakt — nog steeds 200 retourneren met link
      return NextResponse.json(
        { ok: true, warn: "Report generated, mail failed. Check Resend config.", link: signedUrlData.signedUrl },
        { status: 200 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err: any) {
    console.error("[lead] fatal:", err?.message || err);
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}
