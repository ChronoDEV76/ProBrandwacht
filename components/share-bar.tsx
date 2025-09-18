'use client'
import { useEffect, useState } from 'react'

export type ShareEvent = {
  ts: number
  event: 'share_click'
  platform: string
  url: string
}

type ShareBarProps = {
  url: string
  title: string
  small?: boolean
  utmCampaign?: string
}

type AnalyticsWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>
  gtag?: (...args: unknown[]) => void
  __shareEvents?: ShareEvent[]
}

type ShareNavigator = Navigator & {
  share?: (data?: ShareData) => Promise<void>
}

export default function ShareBar({ url, title, small, utmCampaign }: ShareBarProps) {
  const [copied, setCopied] = useState(false)
  const [canNativeShare, setCanNativeShare] = useState(false)
  const size = small ? 'px-3 py-1 text-xs' : 'px-4 py-2 text-sm'
  const iconSize = small ? 'text-base' : 'text-lg'
  const gap = small ? 'gap-2' : 'gap-3'

  const baseButton =
    'inline-flex items-center gap-2 rounded-full font-medium shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white hover:-translate-y-0.5 transform'

  const enc = encodeURIComponent

  function withUtm(platform: string): string {
    const campaign = utmCampaign || 'share'
    try {
      const u = new URL(url)
      u.searchParams.set('utm_source', platform)
      u.searchParams.set('utm_medium', 'social-share')
      u.searchParams.set('utm_campaign', campaign)
      u.searchParams.set('utm_content', small ? 'compact' : 'full')
      return u.toString()
    } catch {
      const qp = `utm_source=${enc(platform)}&utm_medium=social-share&utm_campaign=${enc(
        campaign,
      )}&utm_content=${enc(small ? 'compact' : 'full')}`
      return url + (url.includes('?') ? '&' : '?') + qp
    }
  }

  function track(platform: string) {
    const shareUrl = withUtm(platform)
    try {
      const analyticsWindow = window as AnalyticsWindow
      analyticsWindow.dataLayer?.push({ event: 'share_click', platform, url: shareUrl })
      analyticsWindow.gtag?.('event', 'share_click', {
        event_category: 'engagement',
        event_label: platform,
      })
      const events = analyticsWindow.__shareEvents || []
      events.push({ ts: Date.now(), event: 'share_click', platform, url: shareUrl })
      analyticsWindow.__shareEvents = events
    } catch {}
  }

  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(withUtm('linkedin'))}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${enc(withUtm('facebook'))}`,
    whatsapp: `https://api.whatsapp.com/send?text=${enc(`${title} ${withUtm('whatsapp')}`)}`,
    email: `mailto:?subject=${enc(title)}&body=${enc(withUtm('email'))}`,
  }

  const shareButtons = [
    {
      platform: 'whatsapp',
      label: 'WhatsApp',
      href: shareLinks.whatsapp,
      className: `${baseButton} ${size} bg-emerald-500 text-white hover:bg-emerald-600 focus-visible:ring-emerald-500/60`,
      icon: '💬',
    },
    {
      platform: 'linkedin',
      label: 'LinkedIn',
      href: shareLinks.linkedin,
      className: `${baseButton} ${size} bg-sky-600 text-white hover:bg-sky-700 focus-visible:ring-sky-600/60`,
      icon: '🔗',
    },
    {
      platform: 'facebook',
      label: 'Facebook',
      href: shareLinks.facebook,
      className: `${baseButton} ${size} bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600/60`,
      icon: '📣',
    },
    {
      platform: 'email',
      label: 'E‑mail',
      href: shareLinks.email,
      className: `${baseButton} ${size} bg-slate-900 text-white hover:bg-black focus-visible:ring-slate-900/60`,
      icon: '✉️',
    },
  ]

  async function copy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  useEffect(() => {
    if (typeof navigator === 'undefined') return
    const nav = navigator as ShareNavigator
    setCanNativeShare(typeof nav.share === 'function')
  }, [])

  async function nativeShare() {
    try {
      if (canNativeShare) {
        const nav = navigator as ShareNavigator
        if (typeof nav.share === 'function') {
          await nav.share({ title, text: title, url: withUtm('native') })
        }
        track('native')
        return
      }
    } catch {}
    copy()
  }

  return (
    <div className={`flex flex-wrap ${gap}`} aria-label="Deel dit artikel">
      {canNativeShare ? (
        <button
          type="button"
          onClick={nativeShare}
          className={`${baseButton} ${size} cursor-pointer bg-brand-500 text-white hover:bg-brand-600 focus-visible:ring-brand-500/60`}
        >
          <span className={iconSize} aria-hidden="true">
            🚀
          </span>
          <span>Direct delen</span>
        </button>
      ) : null}
      {shareButtons.map(button => (
        <a
          key={button.platform}
          className={button.className}
          href={button.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track(button.platform)}
        >
          <span className={iconSize} aria-hidden="true">
            {button.icon}
          </span>
          <span>{button.label}</span>
        </a>
      ))}
      <button
        type="button"
        onClick={() => {
          track('copy')
          copy()
        }}
        className={`${baseButton} ${size} cursor-pointer bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-100 focus-visible:ring-brand-500/60`}
      >
        <span className={iconSize} aria-hidden="true">
          {copied ? '✅' : '🔗'}
        </span>
        <span>{copied ? 'Gekopieerd' : 'Kopieer link'}</span>
      </button>
    </div>
  )
}
