'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type ChronoDirectPayload = {
  company: string
  contact: string
  email: string
  phone?: string
  city?: string
  startDate?: string
  duration?: string
  hoursPerDay?: string
  requirements?: string
  budget?: string
  message?: string
  consent: boolean
  website?: string
  source: 'chrono-direct'
}

const defaultErrorMessage =
  'Versturen mislukt. Probeer het over een moment opnieuw.'

export default function ChronoDirectForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setLoading(true)

    const form = event.currentTarget
    const formData = new FormData(form)

    const payload: ChronoDirectPayload = {
      company: String(formData.get('company') ?? '').trim(),
      contact: String(formData.get('contact') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
      phone: String(formData.get('phone') ?? '').trim() || undefined,
      city: String(formData.get('city') ?? '').trim() || undefined,
      startDate: String(formData.get('start_date') ?? '').trim() || undefined,
      duration: String(formData.get('duration_days') ?? '').trim() || undefined,
      hoursPerDay: String(formData.get('hours_per_day') ?? '').trim() || undefined,
      requirements: String(formData.get('requirements') ?? '').trim() || undefined,
      budget: String(formData.get('budget_range') ?? '').trim() || undefined,
      message: String(formData.get('message') ?? '').trim() || undefined,
      consent: formData.get('consent') === 'on',
      website: String(formData.get('website') ?? '').trim() || undefined,
      source: 'chrono-direct',
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
      const response = await fetch('/api/chrono-direct', {
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
      console.error('[chrono-direct] submit failed', err)
      setError('Netwerkfout. Controleer je verbinding en probeer opnieuw.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot veld */}
      <div className="hidden">
        <label htmlFor="website">Website (laat leeg)</label>
        <input id="website" name="website" autoComplete="off" />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Bedrijf</label>
        <input
          name="company"
          required
          autoComplete="organization"
          className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 shadow-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">Contactpersoon</label>
          <input
            name="contact"
            required
            autoComplete="name"
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 shadow-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">E-mail</label>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 shadow-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">Telefoon</label>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 shadow-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Locatie / plaats</label>
          <input
            name="city"
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 shadow-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-slate-700">Startdatum</label>
          <input
            name="start_date"
            type="date"
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 shadow-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Aantal dagen</label>
          <input
            name="duration_days"
            type="number"
            min={1}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 shadow-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Uren per dag</label>
          <input
            name="hours_per_day"
            type="number"
            min={1}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 shadow-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">Benodigde certificaten</label>
          <input
            name="requirements"
            placeholder="Bijv. Rijksgediplomeerd, mangatwacht, gasmeting"
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 shadow-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Budgetindicatie</label>
          <input
            name="budget_range"
            placeholder="Bijv. €45–€55 per uur"
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 shadow-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Aanvullende toelichting</label>
        <textarea
          name="message"
          rows={4}
          placeholder="Omschrijf de situatie, aantal brandwachten, bijzondere wensen..."
          className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 shadow-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
      </div>

      <div className="flex items-start gap-3 text-sm text-slate-700">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          defaultChecked
          required
          className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
        />
        <label htmlFor="consent">
          Ik ga akkoord met het verwerken van mijn gegevens voor deze aanvraag en
          ontvang praktische updates over inzet.
        </label>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-2xl bg-brand-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? 'Versturen…' : 'Aanvraag versturen'}
      </button>
    </form>
  )
}

