
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type FormFields = {
  company: string;
  contact: string;
  email: string;
  phone?: string;
  city?: string;
  when?: string;
  message?: string;
  people: number;
  hours_estimate: number;
  website?: string; // honeypot
};

function clamp(n: number, min: number, max: number) {
  if (Number.isNaN(n)) return min;
  return Math.min(max, Math.max(min, n));
}

function normalize(form: FormData): FormFields {
  const get = (k: string) => String(form.get(k) ?? '').trim();

  const people = clamp(Number(form.get('people')), 1, 20);
  const hours  = clamp(Number(form.get('hours_estimate')), 1, 24);

  return {
    company: get('company'),
    contact: get('contact'),
    email:   get('email'),
    phone:   get('phone') || undefined,
    city:    get('city') || undefined,
    when:    get('when') || undefined,
    message: get('message') || undefined,
    people,
    hours_estimate: hours,
    website: get('website') || undefined, // honeypot
  };
}

export default function DirectRequestForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const payload = normalize(new FormData(e.currentTarget));

    // client-side quick checks
    if (!payload.company || !payload.contact || !payload.email) {
      setError('Vul bedrijf, contactpersoon en e-mail in.');
      setLoading(false);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      setError('Controleer het e-mailadres.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/probrandwacht-direct-spoed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json?.ok || !json?.id) {
        throw new Error(json?.error || 'server_error');
      }

      // Meest betrouwbare: we hebben id uit de response
      router.push(`/opdrachtgevers/thank-you?id=${json.id}`);
    } catch (err: any) {
      setError(
        err?.message === 'server_error'
          ? 'Er ging iets mis op de server.'
          : err?.message ?? 'Er ging iets mis.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <p className="text-xs text-slate-500">Spoedformulier (beta): technische flow, geen garantie op beschikbaarheid.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="block text-sm text-slate-700">Bedrijf</span>
          <input name="company" required className="mt-1 w-full rounded-md border p-2" />
        </label>

        <label className="block">
          <span className="block text-sm text-slate-700">Contactpersoon</span>
          <input name="contact" required className="mt-1 w-full rounded-md border p-2" />
        </label>

        <label className="block">
          <span className="block text-sm text-slate-700">E-mail</span>
          <input type="email" name="email" required className="mt-1 w-full rounded-md border p-2" />
        </label>

        <label className="block">
          <span className="block text-sm text-slate-700">Telefoon</span>
          <input name="phone" className="mt-1 w-full rounded-md border p-2" />
        </label>

        <label className="block">
          <span className="block text-sm text-slate-700">Locatie / plaats</span>
          <input name="city" className="mt-1 w-full rounded-md border p-2" />
        </label>

        <label className="block">
          <span className="block text-sm text-slate-700">Wanneer (ASAP, vandaag, datum)</span>
          <input name="when" placeholder="Bijv. vandaag 16:00" className="mt-1 w-full rounded-md border p-2" />
        </label>
      </div>

      <label className="block">
        <span className="block text-sm text-slate-700">Toelichting</span>
        <textarea name="message" rows={4} className="mt-1 w-full rounded-md border p-2" />
      </label>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="block text-sm text-slate-700">Aantal brandwachten</span>
          <input
            name="people"
            type="number"
            min={1}
            max={20}
            defaultValue={1}
            required
            className="mt-1 w-full rounded-md border p-2"
          />
        </label>

        <label className="block">
          <span className="block text-sm text-slate-700">Uren (indicatie)</span>
          <input
            name="hours_estimate"
            type="number"
            min={1}
            max={24}
            defaultValue={4}
            required
            className="mt-1 w-full rounded-md border p-2"
          />
        </label>
      </div>

      {/* Honeypot: verborgen veld voor bots */}
      <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
        <input tabIndex={-1} name="website" autoComplete="off" />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-brand-700 px-4 py-2 text-white hover:bg-brand-600 disabled:opacity-60"
        aria-busy={loading}
      >
        {loading ? 'Versturen…' : 'Aanvraag indienen'}
      </button>
    </form>
  );
}
