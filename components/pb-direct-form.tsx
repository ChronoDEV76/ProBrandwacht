'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function PbDirectForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hours, setHours] = useState<number | undefined>(4)
  const now = new Date()
  const later = new Date(now.getTime() + 72 * 60 * 60 * 1000)
  const minDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
  const maxDateTime = new Date(later.getTime() - later.getTimezoneOffset() * 60000).toISOString().slice(0, 16)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const fd = new FormData(e.currentTarget)
    const payload = {
      company: String(fd.get('company') || '').trim(),
      contact: String(fd.get('contact') || '').trim(),
      email: String(fd.get('email') || '').trim(),
      phone: String(fd.get('phone') || '').trim() || undefined,
      city: String(fd.get('city') || '').trim() || undefined,
      people: String(fd.get('people') || '').trim() || undefined,
      when: String(fd.get('when') || '').trim() || undefined,
      message: String(fd.get('message') || '').trim() || undefined,
      minimumHours: hours ? String(hours) : undefined,
      consent: fd.get('consent') === 'on',
      website: String(fd.get('website') || '').trim() || undefined, // honeypot
      source: 'probrandwacht-direct-spoed',
    }

    if (!payload.company || !payload.contact || !payload.email) {
      setError('Vul bedrijfsnaam, contactpersoon en e-mail in.')
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/probrandwacht-direct-spoed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const txt = await res.text().catch(() => '')
        throw new Error(txt || 'Versturen mislukt.')
      }

      router.push('/opdrachtgevers/thank-you')
    } catch (err: any) {
      setError(err?.message || 'Interne fout, probeer opnieuw.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl bg-white/95 p-7 text-slate-900 shadow-[0_26px_70px_-40px_rgba(0,0,0,0.55)] ring-1 ring-slate-200/80 md:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            ProBrandwacht Direct - Gecertificeerd - Bereikbaar
          </p>
          <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">Start een spoedaanvraag</h2>
          <p className="text-base text-slate-600">
            De aanvraag wordt bevestigd en er volgt contact voor 1-op-1 afstemming.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-[11px]">
          <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 font-semibold text-emerald-800">
            ProBrandwacht Direct
          </span>
          <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 font-semibold text-blue-800">
            Gecertificeerd
          </span>
        </div>
      </div>
      {/* Honeypot */}
      <div className="hidden">
        <label htmlFor="website">Website (laat leeg)</label>
        <input id="website" name="website" autoComplete="off" />
      </div>

      <div>
        <label className="block text-base font-semibold text-slate-800">Bedrijf *</label>
        <input
          name="company"
          required
          className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-base"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-base font-semibold text-slate-800">Contactpersoon *</label>
          <input
            name="contact"
            required
            className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-base"
          />
        </div>
        <div>
          <label className="block text-base font-semibold text-slate-800">E-mail *</label>
          <input
            name="email"
            type="email"
            required
            className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-base"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-base font-semibold text-slate-800">Telefoon</label>
          <input
            name="phone"
            type="tel"
            className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-base"
          />
        </div>
        <div>
          <label className="block text-base font-semibold text-slate-800">Locatie / plaats</label>
          <input
            name="city"
            className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-base"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-base font-semibold text-slate-800">Aantal brandwachten</label>
          <input
            name="people"
            type="number"
            min={1}
            className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-base"
          />
        </div>
        <div>
          <label className="block text-base font-semibold text-slate-800">Wanneer (ASAP, vandaag, datum)</label>
          <input
            name="when"
            type="datetime-local"
            min={minDateTime}
            max={maxDateTime}
            step={900}
            lang="nl"
            className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-base"
          />
          <p className="mt-1 text-sm text-slate-500">Kies een tijd binnen 72 uur.</p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-base font-semibold text-slate-800">Inzetduur (uren, optioneel)</label>
          <input
            name="minimumHours"
            type="number"
            min={1}
            step={1}
            value={hours ?? ''}
            onChange={e => setHours(e.target.value ? Number(e.target.value) : undefined)}
            className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-base"
            placeholder="Bijv. 4"
          />
          <p className="mt-1 text-sm text-slate-500">Spreek details 1-op-1 af op basis van de inzetcontext.</p>
        </div>
      </div>

      <div>
        <label className="block text-base font-semibold text-slate-800">Toelichting</label>
        <textarea
          name="message"
          rows={4}
          className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-base"
        />
        <p className="mt-1 text-sm text-slate-500">Vermeld certificaten, bijzondere risico&apos;s en contactpersoon op locatie.</p>
      </div>

      <label className="flex items-start gap-3 text-sm text-slate-700 md:text-base">
        <input id="terms" name="terms" type="checkbox" required className="mt-1" />
        <span>
          Akkoord met de{' '}
          <a href="/voorwaarden" className="underline underline-offset-4">
            algemene voorwaarden
          </a>{' '}
          en{' '}
          <a href="/privacy" className="underline underline-offset-4">
            privacyverklaring
          </a>
          .
        </span>
      </label>

      <label className="flex items-start gap-3 text-sm text-slate-700 md:text-base">
        <input id="consent" name="consent" type="checkbox" defaultChecked required className="mt-1" />
        <span>Akkoord met het verwerken van gegevens voor deze spoedaanvraag.</span>
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">
          Er volgt contact met beschikbare zelfstandige brandwachten voor 1-op-1 afstemming.
        </p>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-brand-700 px-6 py-3.5 text-base font-semibold text-white hover:bg-brand-600 disabled:opacity-60 sm:w-auto"
        >
          {loading ? 'Versturen...' : 'Spoedaanvraag versturen'}
        </button>
      </div>
    </form>
  )
}
