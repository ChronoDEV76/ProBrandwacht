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
  const size = small ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm'
  const gap = small ? 'gap-1.5' : 'gap-2'

  const li = `inline-flex items-center rounded-md border bg-white hover:bg-slate-50 ${size}`

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
          className={`${li} cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50`}
        >
          Deel
        </button>
      ) : null}
      <a
        className={`${li} focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50`}
        href={shareLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track('whatsapp')}
      >
        WhatsApp
      </a>
      <a
        className={`${li} focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50`}
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track('linkedin')}
      >
        LinkedIn
      </a>
      <a
        className={`${li} focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50`}
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track('facebook')}
      >
        Facebook
      </a>
      <a
        className={`${li} focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50`}
        href={shareLinks.email}
        onClick={() => track('email')}
      >
        E‑mail
      </a>
      <button
        type="button"
        onClick={() => {
          track('copy')
          copy()
        }}
        className={`${li} cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50`}
      >
        {copied ? 'Gekopieerd' : 'Kopieer link'}
      </button>
    </div>
  )
}
