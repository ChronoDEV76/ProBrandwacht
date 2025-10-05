import { z } from 'zod';
import { NextRequest } from 'next/server'; // Import NextRequest

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});

export async function POST(req: NextRequest) { // Change Request to NextRequest
  try {
    const json = await req.json();
    const body = await req.json(); // Use body instead of parsed
    console.log("SIGNUP", body); // Log body
    return NextResponse.json({ ok: true }); // Return JSON response
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 });
  }
export async function GET() { // Add GET method
    return NextResponse.json({ ok: true });
}
}

