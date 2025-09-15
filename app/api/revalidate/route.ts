import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Here you could call revalidatePath('/blog') etc.
    return NextResponse.json({ revalidated: true })
  } catch (e) {
    return NextResponse.json({ revalidated: false, error: String(e) }, { status: 500 })
  }
}
