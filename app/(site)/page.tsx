import Image from "next/image"
import HomeHero from "@/components/HomeHero"
import HomeUSPs from "@/components/HomeUSPs"
import type { Metadata } from 'next'
import { getRouteMetadata } from '@/lib/seo/metadata'
export const metadata: Metadata = getRouteMetadata('/');



export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-50">
      {/* Achtergrondfoto + overlay voor hero + USPs samen */}
      <div className="absolute inset-0">
        <Image
          src="/ChatGPT%20Image%20Dec%204,%202025,%2010_59_40%20PM.png"
          alt="ChatGPT-achtergrond voor brandwacht-samenwerking"
          fill
          priority
          className="object-contain object-center scale-[0.9] md:scale-[0.96] blur-[0.25px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/25 via-slate-950/38 to-slate-950/52" />
        <div className="absolute inset-0 bg-slate-950/06 backdrop-blur-[0.5px]" />
        <div className="absolute inset-0 bg-radial from-slate-950/35 via-transparent to-transparent" aria-hidden />
      </div>

      {/* Content-stacks boven de foto */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-4 pt-2 pb-12 md:gap-14 md:pt-4 md:pb-14">
        <HomeHero className="mx-auto w-full max-w-xl -mt-6 md:mt-0" />
        <HomeUSPs className="mx-auto w-full mt-48 md:mt-4" />
      </div>
    </main>
  )
}
