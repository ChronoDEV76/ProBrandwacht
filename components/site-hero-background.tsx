import type { ReactNode } from 'react'

type SiteHeroBackgroundProps = {
  children: ReactNode
}

export default function SiteHeroBackground({ children }: SiteHeroBackgroundProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#0b1a2d_0%,_#050b14_45%,_#02060c_100%)]" />

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[url('/noise.png')] mix-blend-overlay" />

      <div className="relative z-10">{children}</div>
    </section>
  )
}
