import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Node runtime
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
    SLACK_BOT_TOKEN,
    SLACK_CHANNEL_ID,
    NEXT_PUBLIC_SITE_URL,
    PAYMENT_LINK_50_DEPOSIT,
  } = process.env;
  const miss: string[] = [];
  if (!SUPABASE_URL) miss.push("SUPABASE_URL");
  if (!SUPABASE_SERVICE_ROLE_KEY) miss.push("SUPABASE_SERVICE_ROLE_KEY");
  if (!SLACK_BOT_TOKEN) miss.push("SLACK_BOT_TOKEN");
  if (!SLACK_CHANNEL_ID) miss.push("SLACK_CHANNEL_ID");
  if (!NEXT_PUBLIC_SITE_URL) miss.push("NEXT_PUBLIC_SITE_URL");
  if (miss.length) throw new Error("ENV misconfig: " + miss.join(", "));
  return {
    SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY,
    SLACK_BOT_TOKEN,
    SLACK_CHANNEL_ID,
    NEXT_PUBLIC_SITE_URL,
    PAYMENT_LINK_50_DEPOSIT: PAYMENT_LINK_50_DEPOSIT || "",
  } as Record<string, string>;
}

export async function POST(req: Request) {
  try {
    const env = assertEnv();
    const body = (await req.json()) as Payload;

    // honeypot
    if (body.website) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    if (!body.company || !body.contact || !body.email) {
      return NextResponse.json({ error: "company/contact/email required" }, { status: 400 });
    }

    // Save in Supabase
    const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
    const { data, error } = await supabase.from("direct_requests").insert({
      company: body.company,
      contact: body.contact,
      email: body.email,
      phone: body.phone ?? null,
      city: body.city ?? null,
      start_date: body.startDate ?? null,
      duration_days: body.duration ?? null,
      hours_per_day: body.hoursPerDay ?? null,
      requirements: body.requirements ?? null,
      notes: body.message ?? null,
      urgent: !!body.urgent,
      budget_hint: body.budget ?? null,
      consent: !!body.consent,
      source: body.source ?? "probrandwacht-direct",
    }).select().single();

    if (error) {
      console.error("[direct] supabase error:", error);
      // ga door: we willen Slack ook proberen
    }

    // Post to Slack
    const blocks = [
      { type: "header", text: { type: "plain_text", text: `🚨 Nieuwe ${body.urgent ? "SPOED" : "aanvraag"}: ${body.company}` } },
      { type: "section", fields: [
        { type: "mrkdwn", text: `*Contact:* ${body.contact}` },
        { type: "mrkdwn", text: `*E-mail:* ${body.email}` },
        { type: "mrkdwn", text: `*Tel:* ${body.phone || "—"}` },
        { type: "mrkdwn", text: `*Locatie:* ${body.city || "—"}` },
        { type: "mrkdwn", text: `*Start:* ${body.startDate || "—"}` },
        { type: "mrkdwn", text: `*Duur (dagen):* ${body.duration || "—"}` },
        { type: "mrkdwn", text: `*Uren/dag:* ${body.hoursPerDay || "—"}` },
        { type: "mrkdwn", text: `*Budget:* ${body.budget || "—"}` },
      ]},
      { type: "section", text: { type: "mrkdwn", text: `*Benodigde certificaten:* ${body.requirements || "—"}` } },
      ...(body.message ? [{ type: "section", text: { type: "mrkdwn", text: `*Toelichting:*\n${body.message}` } }] : []),
      ...(env.PAYMENT_LINK_50_DEPOSIT ? [{
        type: "actions",
        elements: [
          { type: "button", text: { type: "plain_text", text: "50% aanbetaling link" }, url: env.PAYMENT_LINK_50_DEPOSIT },
        ],
      }] : []),
      { type: "context", elements: [
        { type: "mrkdwn", text: "_ProBrandwacht Direct — gemodereerd door het operations-team._" }
      ]},
    ];

    const slackRes = await fetch("https://slack.com/api/chat.postMessage", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.SLACK_BOT_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        channel: env.SLACK_CHANNEL_ID,
        text: `Nieuwe ${body.urgent ? "SPOED" : ""} aanvraag: ${body.company}`,
        blocks,
      }),
    });
    const slackJson = await slackRes.json();
    if (!slackJson.ok) {
      console.error("[direct] slack error:", slackJson);
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err: any) {
    console.error("[direct] fatal:", err?.message || err);
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}
