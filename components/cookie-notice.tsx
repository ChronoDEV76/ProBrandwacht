'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'pb_cookie_consent'

type ConsentState = 'accepted' | 'declined'

export default function CookieNotice() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      setVisible(true)
    }
  }, [])

  function handleChoice(choice: ConsentState) {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, choice)
    }
    setVisible(false)
  }

  if (!visible) {
    return null
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4">
      <div className="max-w-4xl rounded-2xl border border-slate-200 bg-white p-4 shadow-lg">
        <p className="text-sm text-slate-800">
          We gebruiken alleen functionele en analytische cookies om onze diensten te laten werken. Lees meer in onze{' '}
          <a href="/privacy" className="font-semibold underline">
            privacyverklaring
          </a>
          .
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handleChoice('accepted')}
            className="rounded-full bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600"
          >
            Accepteren
          </button>
          <button
            type="button"
            onClick={() => handleChoice('declined')}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Alleen noodzakelijke cookies
          </button>
        </div>
      </div>
    </div>
  )
}
