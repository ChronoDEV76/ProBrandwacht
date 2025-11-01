// middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { CITY_DATA } from "@/lib/city-data"

const aliasMap: Record<string, string> = CITY_DATA.reduce((acc, c) => {
  (c.aliases ?? []).forEach(a => { acc[a] = c.slug })
  return acc
}, {} as Record<string, string>)

export function middleware(req: NextRequest) {
  const { pathname, origin, search } = req.nextUrl

  // Alleen voor /steden/*
  if (!pathname.startsWith("/steden/")) return

  const parts = pathname.split("/").filter(Boolean) // ["steden","<slug>","..."]
  const alias = parts[1]
  if (!alias) return

  const canonical = aliasMap[alias]
  if (!canonical) return

  // Bouw nieuwe URL: behoudt eventuele subpad/anchor/query
  const remainder = parts.slice(2).join("/")
  const newPath = `/steden/${canonical}${remainder ? `/${remainder}` : ""}`
  const url = `${origin}${newPath}${search || ""}`

  return NextResponse.redirect(url, { status: 308 }) // permanent
}

// Beperk op /steden/*
export const config = {
  matcher: ["/steden/:path*"],
}

