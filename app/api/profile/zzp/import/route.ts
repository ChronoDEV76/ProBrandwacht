import { PSM_ZzpProfileV1 } from "@/lib/schemas/psm-profile-v1";

export async function POST(req: Request) {
  const body = await req.json().catch((error) => {
    console.error("Error parsing JSON:", error);
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 });
  });
  const parsed = PSM_ZzpProfileV1.safeParse(body as unknown);
  if (!parsed.success) {
    return new Response(JSON.stringify({ error: parsed.error.flatten() }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const data = parsed.data;

  // Normalize
  const skills = data.skills ? data.skills.split(",").map(s => s.trim()).filter(Boolean) : [];
  const certNames = data.certificateRef
    ? data.certificateRef.split(/[;\n]/).map(s => s.trim()).filter(Boolean)
    : [];

  // TODO: Replace with your DB calls (Prisma/Drizzle)
  console.log("[IMPORT] Zzp v1 ->", {
    ...data,
    skills,
    certNames,
  });

  return new Response("ok");
}
