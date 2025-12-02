// app/api/signup/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { z } from "zod";
import ExcelJS from "exceljs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ===========================
   Zod schema's (beide formulieren)
=========================== */

// ZZP data
const ZzpDataSchema = z
  .object({
    email: z.string().email().max(254),
    firstName: z.string().min(1).max(100),
    lastName: z.string().optional(),
    kvk: z.string().min(8).max(12).optional(),
    btw: z.string().optional(),
    skills: z.string().optional(),
    certificateRef: z.string().optional(),
    notes: z.string().optional(),
  })
  .passthrough();

// OPDRACHTGEVER (client) data
const ClientDataSchema = z
  .object({
    email: z.string().email().max(254),
    company: z.string().min(2).max(200),
    kvk: z.string().regex(/^\d{8,}$/, "KvK moet minimaal 8 cijfers zijn"),
    contact: z.string().min(2).max(150),
    region: z.string().optional(),
    needs: z.string().optional(),
    schemaVersion: z.string().optional(),
  })
  .passthrough();

// gedeeld payload-gedeelte
const BasePayload = {
  submittedAt: z.string().datetime().optional(),
  userAgent: z.string().optional(),
  email: z.string().email().max(254).optional(), // los veld blijft toegestaan
};

// payload per type (discriminated union)
const PayloadSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("zzp_signup"), data: ZzpDataSchema, ...BasePayload }),
  z.object({ type: z.literal("client_signup"), data: ClientDataSchema, ...BasePayload }),
]);

// helpers
const clamp = (s: string, n: number) => s.slice(0, n);
function extractEmail(body: z.infer<typeof PayloadSchema>): string {
  return clamp(body.email ?? body.data.email, 254);
}
function withTimeout<T>(promise: Promise<T>, ms: number) {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms);
    promise
      .then((value) => {
        clearTimeout(timer);
        resolve(value);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

/* ===========================
   Slack helper (Block Kit)
=========================== */
type SlackPayload = { text: string; blocks: any[] };
async function postSlackWebhook(webhook: string, payload: SlackPayload) {
  const res = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Webhook HTTP ${res.status}`);
}
async function postSlackChatMessage(token: string, channel: string, payload: SlackPayload) {
  const res = await fetch("https://slack.com/api/chat.postMessage", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...payload, channel }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`Slack HTTP ${res.status}`);
  if (!json?.ok) throw new Error(json?.error || "Slack API error");
}
async function postSlackChatMessageTextOnly(token: string, channel: string, text: string) {
  const res = await fetch("https://slack.com/api/chat.postMessage", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ channel, text }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`Slack HTTP ${res.status}`);
  if (!json?.ok) throw new Error(json?.error || "Slack API error");
}
async function notifySlack(payload: {
  id: string;
  type: "zzp_signup" | "client_signup";
  email: string;
  createdAt?: string;

  // ZZP velden
  firstName?: string;
  lastName?: string;
  kvk?: string;

  // Client velden
  company?: string;
  contact?: string;
  region?: string;
}) {
  const webhook = process.env.SLACK_WEBHOOK_URL;
  const botToken = process.env.SLACK_BOT_TOKEN;
  const botChannel = process.env.SLACK_CHANNEL_ID;

  // supabase link voor snelle doorklik
  const explicitRef = process.env.SUPABASE_PROJECT_REF;
  const derivedRef = (() => {
    try {
      const u = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL!);
      return u.hostname.split(".")[0]; // ddqlzwah... uit ddqlzwah...supabase.co
    } catch {
      return undefined;
    }
  })();
  const projectRef = explicitRef || derivedRef;

  const supabaseLink = projectRef
    ? `https://supabase.com/dashboard/project/${projectRef}/editor?schema=public&table=intake_signups&sort=created_at:desc`
    : undefined;

  const isClient = payload.type === "client_signup";
  const nameOrCompany = isClient
    ? payload.company ?? "—"
    : [payload.firstName, payload.lastName].filter(Boolean).join(" ").trim() || "—";

  const extraLeft = isClient
    ? `*Contact:*\n${payload.contact ?? "—"}`
    : `*KvK:*\n${payload.kvk ?? "—"}`;

  const extraRight = isClient
    ? `*Regio:*\n${payload.region ?? "—"}`
    : `*—*\n—`;

  const blocks: any[] = [
    { type: "header", text: { type: "plain_text", text: "Nieuwe signup 🚀", emoji: true } },
    { type: "divider" },
    {
      type: "section",
      fields: [
        { type: "mrkdwn", text: `*Type:*\n${payload.type}` },
        { type: "mrkdwn", text: `*Email:*\n${payload.email || "—"}` },
        { type: "mrkdwn", text: `${isClient ? "*Bedrijf:*" : "*Naam:*"}\n${nameOrCompany}` },
        { type: "mrkdwn", text: `*Created:*\n${payload.createdAt ?? "—"}` },
        { type: "mrkdwn", text: extraLeft },
        { type: "mrkdwn", text: extraRight },
        { type: "mrkdwn", text: `*Row ID:*\n\`${payload.id}\`` },
      ],
    },
  ];

  if (supabaseLink) {
    blocks.push({
      type: "context",
      elements: [{ type: "mrkdwn", text: `🔗 *Supabase*: <${supabaseLink}|open intake_signups>` }],
    });
  }

  const fallback =
    `Nieuwe signup 🚀\n` +
    `Type: ${payload.type}\n` +
    `${isClient ? "Bedrijf" : "Naam"}: ${nameOrCompany}\n` +
    `Email: ${payload.email || "—"}\n` +
    (isClient ? `Contact: ${payload.contact ?? "—"}\nRegio: ${payload.region ?? "—"}\n`
              : `KvK: ${payload.kvk ?? "—"}\n`) +
    `Created: ${payload.createdAt ?? "—"}\n` +
    `Row ID: ${payload.id}` +
    (supabaseLink ? `\nSupabase: ${supabaseLink}` : "");

  const payloadForSlack = { text: fallback, blocks };
  const attempts: string[] = [];

  if (webhook) {
    try {
      await postSlackWebhook(webhook, payloadForSlack);
      return;
    } catch (err: any) {
      attempts.push(`webhook: ${err?.message || err}`);
    }
  }

  if (botToken && botChannel) {
    try {
      await postSlackChatMessage(botToken, botChannel, payloadForSlack);
      return;
    } catch (err: any) {
      attempts.push(`bot(blocks): ${err?.message || err}`);
      // fallback zonder blocks voor het geval Slack blocks weigert
      try {
        await postSlackChatMessageTextOnly(botToken, botChannel, fallback);
        return;
      } catch (err2: any) {
        attempts.push(`bot(text): ${err2?.message || err2}`);
      }
    }
  }

  const msg =
    attempts.length > 0
      ? `Slack notify failed (${attempts.join(" | ")})`
      : "Slack notify skipped (no SLACK_WEBHOOK_URL or SLACK_BOT_TOKEN/SLACK_CHANNEL_ID configured)";
  throw new Error(msg);
}

/* ===========================
   POST /api/signup
=========================== */
export async function POST(req: NextRequest) {
  try {
    // 1) Validatie
    const json = await req.json();
    const parsed = PayloadSchema.safeParse(json);
    if (!parsed.success) {
      const issues = parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`);
      return NextResponse.json({ ok: false, error: "Invalid payload", details: issues }, { status: 400 });
    }
    const body = parsed.data;

    // 2) Normalisatie
    const type = clamp(body.type, 64) as "zzp_signup" | "client_signup";
    const ua = clamp(body.userAgent || req.headers.get("user-agent") || "", 512);
    const email = extractEmail(body);
    const submittedAtIso = body.submittedAt
      ? new Date(body.submittedAt).toISOString()
      : new Date().toISOString();

    const ipHeader = req.headers.get("x-forwarded-for") || "";
    const clientIp = ipHeader.split(",")[0]?.trim() || null;

    // 3) Insert
    const supabase = supabaseServer();
    const { data, error } = await supabase
      .from("intake_signups")
      .insert({
        type,
        email,                    // voor unieke index; zie DB opmerking
        submitted_at: submittedAtIso,
        user_agent: ua,
        ip: clientIp,
        data: body.data,          // volledige formulier payload (jsonb)
        source: "probrandwacht",
      })
      .select("id, created_at")
      .single();

    if (error) {
      if ((error as any).code === "23505") {
        // duplicate e-mail (afhankelijk van je unieke index)
        return NextResponse.json(
          { ok: false, error: "Dit e-mailadres is al aangemeld." },
          { status: 409 }
        );
      }
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }

    // 4) Slack melding (best-effort; mag response niet blokkeren)
    const d: any = body.data;
    const slackPayload = {
      id: data!.id,
      type,
      email,
      createdAt: data!.created_at,
      // zzp
      firstName: d.firstName,
      lastName: d.lastName,
      kvk: d.kvk,
      // client
      company: d.company,
      contact: d.contact,
      region: d.region,
    };

    await withTimeout(notifySlack(slackPayload), 4000).catch((e) =>
      console.warn("Slack notify failed:", e?.message ?? e)
    );

    return NextResponse.json(
      { ok: true, id: data?.id, createdAt: data?.created_at },
      { status: 200 }
    );
  } catch (err) {
    console.error("[SIGNUP:POST] error", err);
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}

/* ===========================
   GET /api/signup (filters + CSV + XLSX export)
=========================== */
export async function GET(req: NextRequest) {
  try {
    const supabase = supabaseServer();

    // --- Query parameters ---
    const url = new URL(req.url);
    const type = url.searchParams.get("type");       // zzp_signup | client_signup
    const from = url.searchParams.get("from");       // YYYY-MM-DD of ISO
    const to = url.searchParams.get("to");           // YYYY-MM-DD of ISO
    const limitParam = url.searchParams.get("limit");
    const format = url.searchParams.get("format");   // csv | xlsx
    const limit = limitParam ? Math.min(parseInt(limitParam, 10) || 10, 200) : 10;

    // --- Baseline query ---
    let query = supabase
      .from("intake_signups")
      .select("id, type, email, submitted_at, created_at, source, data")
      .order("created_at", { ascending: false })
      .limit(limit);

    // --- Optionele filters ---
    if (type) query = query.eq("type", type);

    // helper: parse YYYY-MM-DD (of ISO) en maak geschikt voor range
    function isoOrNull(d?: string | null) {
      if (!d) return null;
      const dt = new Date(d);
      return isNaN(dt.getTime()) ? null : dt.toISOString();
    }
    function startOfDayISO(d?: string | null) {
      if (!d) return null;
      const dt = new Date(d);
      if (isNaN(dt.getTime())) return null;
      dt.setUTCHours(0, 0, 0, 0);
      return dt.toISOString();
    }
    function nextDayStartISO(d?: string | null) {
      if (!d) return null;
      const dt = new Date(d);
      if (isNaN(dt.getTime())) return null;
      dt.setUTCHours(0, 0, 0, 0);
      dt.setUTCDate(dt.getUTCDate() + 1);
      return dt.toISOString();
    }

    const fromIso =
      /^\d{4}-\d{2}-\d{2}$/.test(from || "") ? startOfDayISO(from) : isoOrNull(from);
    const toIsoExclusive =
      /^\d{4}-\d{2}-\d{2}$/.test(to || "") ? nextDayStartISO(to) : isoOrNull(to);

    if (fromIso) query = query.gte("created_at", fromIso);
    if (toIsoExclusive) query = query.lt("created_at", toIsoExclusive);

    const { data, error } = await query;

    if (error) {
      console.error("[SIGNUP:GET] supabase error", error);
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }

    /* -----------------------------
       1) CSV EXPORT
    ----------------------------- */
    if (format === "csv") {
      if (!data || data.length === 0) {
        return new NextResponse("Geen data voor export.", {
          status: 204,
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        });
      }

      const header = ["id", "type", "email", "submitted_at", "created_at", "source", "data_json"];
      const rows = data.map((r) => [
        r.id,
        r.type,
        r.email,
        r.submitted_at,
        r.created_at,
        r.source,
        JSON.stringify(r.data),
      ]);

      const csv = [header, ...rows]
        .map((r) =>
          r
            .map((v) => {
              if (v === null || v === undefined) return "";
              const s = String(v).replace(/"/g, '""');
              return `"${s}"`;
            })
            .join(",")
        )
        .join("\n");

      const filename = `signups_${type || "all"}_${new Date().toISOString().slice(0, 10)}.csv`;

      return new NextResponse(csv, {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="${filename}"`,
        },
      });
    }

    /* -----------------------------
       2) XLSX EXPORT
    ----------------------------- */
    if (format === "xlsx") {
      if (!data || data.length === 0) {
        return new NextResponse("Geen data voor export.", {
          status: 204,
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        });
      }

      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Signups");

      // kolomtitels
      sheet.columns = [
        { header: "ID", key: "id", width: 36 },
        { header: "Type", key: "type", width: 15 },
        { header: "Email", key: "email", width: 30 },
        { header: "Submitted At", key: "submitted_at", width: 24 },
        { header: "Created At", key: "created_at", width: 24 },
        { header: "Source", key: "source", width: 18 },
        { header: "Data (JSON)", key: "data", width: 80 },
      ];

      // data invullen
      data.forEach((r) => {
        sheet.addRow({
          id: r.id,
          type: r.type,
          email: r.email,
          submitted_at: r.submitted_at,
          created_at: r.created_at,
          source: r.source,
          data: JSON.stringify(r.data, null, 2),
        });
      });

      // stijl
      sheet.getRow(1).font = { bold: true };
      sheet.columns.forEach((col) => {
        // @ts-ignore
        col.alignment = { vertical: "middle", wrapText: true };
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const filename = `signups_${type || "all"}_${new Date().toISOString().slice(0, 10)}.xlsx`;

      return new NextResponse(buffer, {
        status: 200,
        headers: {
          "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "Content-Disposition": `attachment; filename="${filename}"`,
        },
      });
    }

    /* -----------------------------
       3) JSON DEFAULT
    ----------------------------- */
    return NextResponse.json(
      {
        ok: true,
        count: data?.length ?? 0,
        filters: { type, from, to, format },
        items: data ?? [],
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[SIGNUP:GET] error", err);
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}

/* ===========================
   HEAD /api/signup (health)
=========================== */
export async function HEAD() {
  try {
    const supabase = supabaseServer();
    const { error } = await supabase.from("intake_signups").select("id").limit(1);
    if (error) throw error;
    return new Response(null, { status: 204 });
  } catch {
    return new Response(null, { status: 500 });
  }
}
