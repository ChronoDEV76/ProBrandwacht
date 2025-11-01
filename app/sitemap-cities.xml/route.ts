// app/sitemap-cities.xml/route.ts
import { NextResponse } from "next/server"
import { CITY_DATA } from "@/lib/city-data"

const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.probrandwacht.nl"

export const revalidate = 60 * 60 * 24 // 24h

export async function GET() {
  const urls = CITY_DATA.map(c => {
    const lastmod = (c.updatedAt ?? new Date().toISOString().slice(0,10))
    return `<url><loc>${BASE}/steden/${c.slug}</loc><lastmod>${lastmod}</lastmod><changefreq>weekly</changefreq><priority>0.70</priority></url>`
  }).join("")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls}
  </urlset>`

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  })
}

