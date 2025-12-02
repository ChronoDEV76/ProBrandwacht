import Image from "next/image"
import HomeHero from "@/components/HomeHero"
import HomeUSPs from "@/components/HomeUSPs"
import type { Metadata } from 'next'
import { getRouteMetadata } from '@/lib/seo/metadata'
export const metadata: Metadata = getRouteMetadata('/');



export default function HomePage() {
  return (
    <main className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-slate-950 text-slate-50">
      {/* Achtergrondfoto + overlay voor hero + USPs samen */}
      <div className="absolute inset-0">
        <Image
          src="/brandweer-psm.webp"
          alt="Brandweerauto met ProSafetyMatch kenteken"
          fill
          priority
          className="object-cover object-[50%_62%] md:object-center"
        />
        <div className="absolute inset-0 bg-slate-950/55" />
      </div>

      {/* Content-stacks boven de foto */}
      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-between px-4 pt-6 pb-10 md:pt-8 md:pb-12">
        <HomeHero className="mx-auto w-full max-w-xl mt-4 md:mt-8 transform" />
        <HomeUSPs className="mx-auto w-full mt-auto translate-y-20 md:translate-y-24" />
      </div>
    </main>
  )
}
