import Image from "next/image"
import HomeHero from "@/components/HomeHero"
import HomeUSPs from "@/components/HomeUSPs"
import type { Metadata } from 'next'
import { getRouteMetadata } from '@/lib/seo/metadata'
import heroBackground from '@/public/home-hero.webp'
export const metadata: Metadata = getRouteMetadata('/');



export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-50">
      {/* Achtergrondfoto + overlay voor hero + USPs samen */}
      <div className="absolute inset-0">
        <Image
          src={heroBackground}
          alt="ChatGPT-achtergrond voor brandwacht-samenwerking"
          fill
          priority
          fetchPriority="high"
          quality={72}
          placeholder="blur"
          sizes="(min-width: 1280px) 1100px, (min-width: 1024px) 1000px, 100vw"
          className="object-cover object-center scale-[1.02]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/44 to-slate-950/60"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-radial from-slate-950/35 via-transparent to-transparent"
        />
      </div>

      {/* Content-stacks boven de foto */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-4 pt-2 pb-12 md:gap-14 md:pt-4 md:pb-14">
        <HomeHero className="mx-auto w-full max-w-xl -mt-6 md:mt-0" />
        <HomeUSPs className="mx-auto w-full mt-48 md:mt-4" />
      </div>
    </main>
  )
}
