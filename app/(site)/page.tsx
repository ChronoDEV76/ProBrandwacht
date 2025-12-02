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
          src="/prosafetymatch-bg.webp"
          alt="ProSafetyMatch kenteken op brandweerauto"
          fill
          priority
          className="object-cover object-[50%_84%] md:object-[50%_79%]"
        />
        <div className="absolute inset-0 bg-slate-950/35" />
      </div>

      {/* Content-stacks boven de foto */}
      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col gap-12 px-4 pt-4 pb-12 md:gap-14 md:pt-6 md:pb-16">
        <HomeHero className="mx-auto w-full max-w-xl -mt-4 md:-mt-6" />
        <HomeUSPs className="mx-auto w-full mt-28 md:mt-20" />
      </div>
    </main>
  )
}
