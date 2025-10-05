import { z } from 'zod';
import { NextRequest } from 'next/server'; // Import NextRequest
import { NextRequest } from 'next/server'; // Import NextRequest

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});


export async function POST(req: NextRequest) { // Change Request to NextRequest
  try {
    const body = await req.json();
    console.log("SIGNUP", body);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 });
  }
export async function GET() {
    return NextResponse.json({ ok: true });
}
}

