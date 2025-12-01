import Image from 'next/image'
import type { ReactNode } from 'react'

type HeroBackgroundProps = {
  children: ReactNode
  backgroundImage?: string
  backgroundAlt?: string
  overlayClassName?: string
  imageClassName?: string
}

export default function HeroBackground({
  children,
  backgroundImage,
  backgroundAlt = '',
  overlayClassName = '',
  imageClassName = '',
}: HeroBackgroundProps) {
  return (
    <section className="relative isolate flex min-h-[60vh] items-center justify-center overflow-hidden">
      {backgroundImage ? (
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt={backgroundAlt}
            fill
            priority
            className={`object-cover ${imageClassName}`.trim()}
          />
          <div className={`absolute inset-0 bg-slate-950/60 ${overlayClassName}`.trim()} />
        </div>
      ) : null}
      <div className="relative z-10 flex w-full justify-center px-4">{children}</div>
    </section>
  )
}
