// middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { CITY_DATA } from "@/lib/city-data"

const aliasMap: Record<string, string> = CITY_DATA.reduce((acc, c) => {
  (c.aliases ?? []).forEach(a => { acc[a] = c.slug })
  return acc
}, {} as Record<string, string>)

const REALM = "ProBrandwacht Admin"

function unauthorizedResponse(message = "Authentication required") {
  return new NextResponse(message, {
    status: 401,
    headers: { "WWW-Authenticate": `Basic realm="${REALM}"` },
  })
}

export function middleware(req: NextRequest) {
  const { pathname, origin, search } = req.nextUrl

  // Basic auth for /admin
  if (pathname.startsWith("/admin")) {
    const authHeader = req.headers.get("authorization") || ""
    if (!authHeader.startsWith("Basic ")) {
      return unauthorizedResponse()
    }

    const encoded = authHeader.split(" ")[1]
    let decoded = ""
    try {
      decoded = Buffer.from(encoded, "base64").toString()
    } catch (err) {
      console.error("[middleware] basic auth decode failed", err)
      return unauthorizedResponse()
    }

    const [user, pass] = decoded.split(":")
    if (
      !user ||
      !pass ||
      user !== process.env.ADMIN_USER ||
      pass !== process.env.ADMIN_PASS
    ) {
      return unauthorizedResponse("Unauthorized")
    }

    return NextResponse.next()
  }

  // Alias redirect for /steden
  if (pathname.startsWith("/steden/")) {
    const parts = pathname.split("/").filter(Boolean)
    const alias = parts[1]
    if (!alias) return NextResponse.next()

    const canonical = aliasMap[alias]
    if (!canonical) return NextResponse.next()

    const remainder = parts.slice(2).join("/")
    const newPath = `/steden/${canonical}${remainder ? `/${remainder}` : ""}`
    const url = `${origin}${newPath}${search || ""}`

    return NextResponse.redirect(url, { status: 308 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/steden/:path*"],
}
