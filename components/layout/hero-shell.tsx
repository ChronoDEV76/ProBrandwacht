import Link from 'next/link'
import type { ReactNode } from 'react'

import clsx from 'clsx'

type Cta = {
  href: string
  label: string
}

type HeroShellProps = {
  eyebrow: string
  title: ReactNode
  body: ReactNode
  primaryCta?: Cta
  secondaryCta?: Cta
  footer?: ReactNode
  className?: string
  headingLevel?: 'h1' | 'h2' | 'h3'
}

export function HeroShell({
  eyebrow,
  title,
  body,
  primaryCta,
  secondaryCta,
  footer,
  className,
  headingLevel = 'h1',
}: HeroShellProps) {
  const Heading = headingLevel

  return (
    <div
      className={clsx(
        'w-full max-w-3xl rounded-[32px] border border-white/12',
        'bg-slate-900/80 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-950/85',
        'px-7 py-8 md:px-9 md:py-10',
        'shadow-[0_32px_80px_rgba(0,0,0,0.8)] backdrop-blur-2xl',
        className,
      )}
    >
      <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-300">{eyebrow}</p>

      <Heading className="mt-3 text-center text-2xl font-semibold tracking-tight md:text-3xl lg:text-4xl">{title}</Heading>

      <p className="mt-4 text-center text-sm leading-relaxed text-slate-200">{body}</p>

      {(primaryCta || secondaryCta) && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          {primaryCta ? (
            <Link href={primaryCta.href} className="route-link">
              {primaryCta.label}
            </Link>
          ) : null}
          {secondaryCta ? (
            <Link href={secondaryCta.href} className="route-link">
              {secondaryCta.label}
            </Link>
          ) : null}
        </div>
      )}

      {footer ? <p className="mt-5 text-center text-[11px] text-slate-400">{footer}</p> : null}
    </div>
  )
}
