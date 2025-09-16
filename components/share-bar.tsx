'use client'
import { useEffect, useState } from 'react'

type ShareBarProps = {
  url: string
  title: string
  small?: boolean
}

export default function ShareBar({ url, title, small }: ShareBarProps) {
  const [copied, setCopied] = useState(false)
  const [canNativeShare, setCanNativeShare] = useState(false)
  const size = small ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm'
  const gap = small ? 'gap-1.5' : 'gap-2'

  const li = `inline-flex items-center rounded-md border bg-white hover:bg-slate-50 ${size}`

  const enc = encodeURIComponent
  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${enc(`${title} ${url}`)}`,
    email: `mailto:?subject=${enc(title)}&body=${enc(url)}`,
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  useEffect(() => {
    setCanNativeShare(
      typeof navigator !== 'undefined' && typeof (navigator as any).share === 'function',
    )
  }, [])

  async function nativeShare() {
    try {
      if (canNativeShare) {
        await (navigator as any).share({ title, text: title, url })
        return
      }
    } catch {}
    copy()
  }

  return (
    <div className={`flex flex-wrap ${gap}`} aria-label="Deel dit artikel">
      {canNativeShare ? (
        <button type="button" onClick={nativeShare} className={`${li} cursor-pointer`}>
          Deel
        </button>
      ) : null}
      <a className={li} href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer">
        WhatsApp
      </a>
      <a className={li} href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer">
        LinkedIn
      </a>
      <a className={li} href={shareLinks.facebook} target="_blank" rel="noopener noreferrer">
        Facebook
      </a>
      <a className={li} href={shareLinks.email}>
        E‑mail
      </a>
      <button type="button" onClick={copy} className={`${li} cursor-pointer`}>
        {copied ? 'Gekopieerd' : 'Kopieer link'}
      </button>
    </div>
  )
}
