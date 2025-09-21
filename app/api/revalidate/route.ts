import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const path = searchParams.get('path') ?? '/'
    const type = searchParams.get('type') === 'layout' ? 'layout' : undefined

    revalidatePath(path, type)

    return NextResponse.json({ revalidated: true, path, type: type ?? 'page' })
  } catch (e) {
    return NextResponse.json({ revalidated: false, error: String(e) }, { status: 500 })
  }
}
