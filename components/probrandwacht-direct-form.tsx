'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type ProbrandwachtDirectPayload = {
  company: string
  contact: string
  email: string
  phone?: string
  city?: string
  startDate?: string
  duration?: string
  hoursPerDay?: string
  requirements?: string
  message?: string
  consent: boolean
  website?: string
  source: 'probrandwacht-direct'
}

const defaultErrorMessage =
  'Versturen mislukt. Probeer het over een moment opnieuw.'

export default function ProbrandwachtDirectForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputClasses =
    'mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base shadow-sm transition focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100'
  const labelClasses = 'block text-sm font-semibold text-slate-800'

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setLoading(true)

    const form = event.currentTarget
    const formData = new FormData(form)

    const payload: ProbrandwachtDirectPayload = {
      company: String(formData.get('company') ?? '').trim(),
      contact: String(formData.get('contact') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
      phone: String(formData.get('phone') ?? '').trim() || undefined,
      city: String(formData.get('city') ?? '').trim() || undefined,
      startDate: String(formData.get('start_date') ?? '').trim() || undefined,
      duration: String(formData.get('duration_days') ?? '').trim() || undefined,
      hoursPerDay: String(formData.get('hours_per_day') ?? '').trim() || undefined,
      requirements: String(formData.get('requirements') ?? '').trim() || undefined,
      message: String(formData.get('message') ?? '').trim() || undefined,
      consent: formData.get('consent') === 'on',
      website: String(formData.get('website') ?? '').trim() || undefined,
      source: 'probrandwacht-direct',
    }

    if (!payload.company || !payload.contact || !payload.email) {
      setError('Vul bedrijfsnaam, contactpersoon en e-mail in.')
      setLoading(false)
      return
    }

    // Honeypot
    if (payload.website) {
      setError(defaultErrorMessage)
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/probrandwacht-direct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (response.status === 429) {
        setError('We hebben al een recente aanvraag ontvangen. Probeer het later opnieuw.')
        return
      }

      if (!response.ok) {
        const body = await response.text().catch(() => '')
        setError(body || defaultErrorMessage)
        return
      }

      router.push('/opdrachtgevers/thank-you')
    } catch (err) {
      console.error('[probrandwacht-direct] submit failed', err)
      setError('Netwerkfout. Controleer je verbinding en probeer opnieuw.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl border border-slate-100 bg-white p-4 shadow-lg shadow-slate-200 sm:p-6"
    >
      {/* Honeypot veld */}
      <div className="hidden">
        <label htmlFor="website">Website (laat leeg)</label>
        <input id="website" name="website" autoComplete="off" />
      </div>

      <div>
        <label className={labelClasses}>Bedrijf</label>
        <input name="company" required autoComplete="organization" className={inputClasses} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClasses}>Contactpersoon</label>
          <input name="contact" required autoComplete="name" className={inputClasses} />
        </div>
        <div>
          <label className={labelClasses}>E-mail</label>
          <input name="email" type="email" required autoComplete="email" className={inputClasses} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClasses}>Telefoon</label>
          <input name="phone" type="tel" autoComplete="tel" className={inputClasses} />
        </div>
        <div>
          <label className={labelClasses}>Locatie / plaats</label>
          <input name="city" className={inputClasses} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className={labelClasses}>Startdatum</label>
          <input name="start_date" type="date" className={inputClasses} />
        </div>
        <div>
          <label className={labelClasses}>Aantal dagen</label>
          <input name="duration_days" type="number" min={1} className={inputClasses} />
        </div>
        <div>
          <label className={labelClasses}>Uren per dag</label>
          <input name="hours_per_day" type="number" min={1} className={inputClasses} />
        </div>
      </div>

      <div>
        <label className={labelClasses}>Benodigde certificaten</label>
        <input
          name="requirements"
          placeholder="Bijv. Rijksgediplomeerd, mangatwacht, gasmeting"
          className={inputClasses}
        />
      </div>

      <div>
        <label className={labelClasses}>Aanvullende uitleg</label>
        <textarea
          name="message"
          rows={4}
          placeholder="Omschrijf de situatie, aantal brandwachten, bijzondere wensen..."
          className={`${inputClasses} resize-none`}
        />
      </div>

      <div className="flex items-start gap-3 text-sm text-slate-700">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          required
          className="mt-1.5 h-5 w-5 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
        />
        <label htmlFor="terms">
          Ik ga akkoord met de{' '}
          <a href="/voorwaarden" className="underline underline-offset-4">
            algemene voorwaarden
          </a>{' '}
          en{' '}
          <a href="/privacy" className="underline underline-offset-4">
            privacyverklaring
          </a>
          .
        </label>
      </div>

      <div className="flex items-start gap-3 text-sm text-slate-700">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          defaultChecked
          required
          className="mt-1.5 h-5 w-5 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
        />
        <label htmlFor="consent">
          Ik ga akkoord met het verwerken van mijn gegevens voor deze aanvraag en
          ontvang praktische updates over inzet.
        </label>
      </div>

      {error && (
        <p className="rounded-2xl bg-red-50 px-4 py-2 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-2xl bg-brand-700 px-5 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-200 transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? 'Versturen…' : 'Aanvraag versturen'}
      </button>
    </form>
  )
}
