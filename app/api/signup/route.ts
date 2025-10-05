import { ZzpProfileSchema } from "@/lib/schemas/profile";

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = ZzpProfileSchema.safeParse(json);
  if (!parsed.success) {
    return new Response(JSON.stringify({ error: parsed.error.flatten() }), { status: 400 });
  }
  // TODO: persist to DB/CRM + KYC trigger (MVP: console)
  console.log("ZZP_SIGNUP", parsed.data);
  return new Response("ok");
}

