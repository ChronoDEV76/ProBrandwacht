import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const { SLACK_BOT_TOKEN, SLACK_CHANNEL_ID } = process.env;
  if (!SLACK_BOT_TOKEN || !SLACK_CHANNEL_ID) {
    return NextResponse.redirect("https://slack.com/downloads", { status: 302 });
  }
  // 1) optioneel: generate shared invite (private channel vereist admin scope)
  // 2) simpel: open SLACK channel deep-link (werkt voor gebruikers met toegang)
  //    slack://channel?team=<TEAM_ID>&id=<CHANNEL_ID>  -> vergt TEAM_ID
  // fallback naar web:
  const webLink = `https://app.slack.com/client/T09MNHR9RSM${SLACK_CHANNEL_ID}`;
  return NextResponse.redirect(webLink, { status: 302 });
}

