import Link from 'next/link'

import { getCta, type CtaId } from '@/lib/ctaCopy'

type Props = {
  id: CtaId
  className?: string
  ariaLabel?: string
  title?: string
}

const baseClassName = 'inline-flex items-center justify-center text-sm font-semibold'
const outlineClassName = 'text-slate-200 underline underline-offset-4 transition hover:text-emerald-200'
const ghostClassName = outlineClassName
const defaultClassName = outlineClassName
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
