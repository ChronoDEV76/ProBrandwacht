import Image from "next/image"
import HomeHero from "@/components/HomeHero"
import HomeUSPs from "@/components/HomeUSPs"

export default function HomePage() {
  return (
    <main className="relative h-screen overflow-hidden bg-slate-950 text-slate-50">
      {/* Achtergrondfoto + overlay voor hero + USPs samen */}
      <div className="absolute inset-0">
        <Image
          src="/brandweer-psm.webp"
          alt="Brandweerauto met ProSafetyMatch kenteken"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/55" />
      </div>

      {/* Content-stacks boven de foto */}
      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-between px-4 pt-4 pb-4 md:pt-6 md:pb-6">
        <HomeHero className="mx-auto w-full max-w-xl mt-16 md:mt-24 -translate-x-8 md:-translate-x-16 transform" />
        <HomeUSPs className="mx-auto mt-8 w-full md:mt-10" />
      </div>
    </main>
  )
}
