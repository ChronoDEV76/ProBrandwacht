'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function PbDirectForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot */}
      <div className="hidden">
        <label htmlFor="website">Website (laat leeg)</label>
        <input id="website" name="website" autoComplete="off" />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Bedrijf *</label>
        <input name="company" required className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">Contactpersoon *</label>
          <input name="contact" required className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">E-mail *</label>
          <input name="email" type="email" required className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">Telefoon</label>
          <input name="phone" type="tel" className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Locatie / plaats</label>
          <input name="city" className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">Aantal brandwachten</label>
          <input name="people" type="number" min={1} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Wanneer (ASAP, vandaag, datum)</label>
          <input name="when" className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2" placeholder="Bijv. vandaag 16:00" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Toelichting</label>
        <textarea name="message" rows={4} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2" />
      </div>

      <label className="flex items-start gap-3 text-sm text-slate-700">
        <input id="consent" name="consent" type="checkbox" defaultChecked required className="mt-1" />
        <span>Ik ga akkoord met het verwerken van mijn gegevens voor deze spoedaanvraag.</span>
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-2xl bg-brand-700 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-600 disabled:opacity-60"
      >
        {loading ? 'Versturen…' : 'Spoedaanvraag versturen'}
      </button>
    </form>
  )
}
