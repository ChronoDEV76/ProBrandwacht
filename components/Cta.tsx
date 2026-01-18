import Link from 'next/link'

import { getCta, type CtaId } from '@/lib/ctaCopy'

type Props = {
  id: CtaId
  className?: string
  ariaLabel?: string
  title?: string
}

const baseClassName = 'inline-flex items-center justify-center text-sm font-semibold'
const outlineClassName =
  'rounded-2xl border border-white/30 px-5 py-2.5 text-white transition hover:bg-white/10'
const ghostClassName = 'rounded-2xl border border-white/15 px-5 py-2.5 text-white hover:bg-white/10'
const defaultClassName =
  'rounded-2xl bg-emerald-400 px-5 py-2.5 text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300'
const linkClassName = 'text-emerald-300 underline underline-offset-4'

export function Cta({ id, className, ariaLabel, title }: Props) {
  const cta = getCta(id)
  const isExternal = cta.href.startsWith('http')
  const isMailto = cta.href.startsWith('mailto:')
  const variantClassName =
    cta.variant === 'link'
      ? linkClassName
      : cta.variant === 'ghost'
        ? ghostClassName
        : cta.variant === 'default'
          ? defaultClassName
          : outlineClassName
  const classes = [baseClassName, variantClassName, className].filter(Boolean).join(' ')

  if (isExternal) {
    return (
      <a
        href={cta.href}
        className={classes}
        aria-label={ariaLabel}
        title={title}
        target="_blank"
        rel="noopener noreferrer"
      >
        {cta.label}
      </a>
    )
  }

  if (isMailto) {
    return (
      <a href={cta.href} className={classes} aria-label={ariaLabel} title={title}>
        {cta.label}
      </a>
    )
  }

  return (
    <Link href={cta.href} className={classes} aria-label={ariaLabel} title={title}>
      {cta.label}
    </Link>
  )
}
