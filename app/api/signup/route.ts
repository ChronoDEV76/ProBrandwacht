import { z } from 'zod';
import rateLimit from 'express-rate-limit'; // Assuming you're using express-rate-limit

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = signupSchema.parse(json); // Validate input
    console.log("SIGNUP", parsed);
    // Process the validated data
    console.log("SIGNUP", parsed);
    return new Response("ok");
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 });
  }
  // TODO: persist to DB/CRM + KYC trigger (MVP: console)
  console.log("ZZP_SIGNUP", parsed.data);
  return new Response("ok");
}

