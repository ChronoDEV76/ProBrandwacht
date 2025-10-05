import { ClientProfileSchema } from "@/lib/schemas/profile";

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = ClientProfileSchema.safeParse(json);
  if (!parsed.success) {
    return new Response(JSON.stringify({ error: parsed.error.flatten() }), { status: 400 });
  }
  // TODO: persist to DB/CRM (MVP: console)
  console.log("CLIENT_SIGNUP", parsed.data);
  return new Response("ok");
}

