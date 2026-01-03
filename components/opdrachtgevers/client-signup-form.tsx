'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type ClientSignupFormProps = {
  className?: string
  heading?: string
  description?: string
  cancelHref?: string
  showCancel?: boolean
  successReturnHref?: string
  headingClassName?: string
  descriptionClassName?: string
}

type ProfileEntries = Record<string, string>

const STORAGE_KEY_CLIENT = 'psm_profile_client' as const

function saveLocal(key: string, value: unknown) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* ignore quotas */
  }
}

function loadLocal<T>(key: string): T | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

function downloadJSON(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}

const linkBase = 'inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition'

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-gray-200 bg-white shadow-sm ${className}`.trim()}>{children}</div>
}

function CardSection({ title, subtitle, children }: { title?: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="p-6">
      {title ? (
        <div className="mb-3">
          <h3 className="text-base font-semibold text-gray-900">{title}</h3>
          {subtitle ? <p className="text-sm text-gray-500">{subtitle}</p> : null}
        </div>
      ) : null}
      {children}
    </section>
  )
}

function Label({ children, htmlFor, hint }: { children: React.ReactNode; htmlFor?: string; hint?: string }) {
  return (
    <label htmlFor={htmlFor} className="block">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-900">{children}</span>
        {hint ? <span className="text-xs text-gray-500">{hint}</span> : null}
      </div>
    </label>
  )
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 placeholder:text-gray-400 ${props.className || ''}`}
    />
  )
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 placeholder:text-gray-400 ${props.className || ''}`}
    />
  )
}

function PrimaryButton({ children, className = '', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow transition focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:opacity-50 ${className}`.trim()}
    >
      {children}
    </button>
  )
}

function SecondaryButton({ children, className = '', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center rounded-lg bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 transition focus:outline-none focus:ring-4 focus:ring-blue-100 hover:bg-blue-200 disabled:opacity-50 ${className}`.trim()}
    >
      {children}
    </button>
  )
}

export default function ClientSignupForm({
  className = '',
  heading = 'Aanmelden als opdrachtgever',
  description =
    'Vul je bedrijfsgegevens in. We versturen de gegevens direct naar het platform en bewaren een kopie in je browser (localStorage) zodat je ze later kunt hergebruiken of importeren.',
  cancelHref = '/',
  showCancel = true,
  successReturnHref = '/',
  headingClassName = 'text-2xl font-semibold text-gray-900 md:text-3xl',
  descriptionClassName = 'text-sm text-gray-600 md:text-base',
}: ClientSignupFormProps) {
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [profile, setProfile] = useState<ProfileEntries>({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const stored = loadLocal<ProfileEntries>(STORAGE_KEY_CLIENT)
    if (stored) {
      setProfile(stored)
    }
  }, [])

  function validate(entries: ProfileEntries): string | null {
    if (!entries.company?.trim()) return 'Vul je bedrijfsnaam in.'
    if (!/^[0-9]{8,}$/.test(entries.kvk || '')) return 'KvK-nummer lijkt onjuist (minimaal 8 cijfers).'
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(entries.email || '')) return 'Vul een geldig e-mailadres in.'
    return null
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setSubmitting(true)

    const form = new FormData(event.currentTarget)
    const entries: ProfileEntries = {}
    form.forEach((value, key) => {
      entries[key] = typeof value === 'string' ? value : ''
    })

    const validationError = validate(entries)
    if (validationError) {
      setError(validationError)
      setSubmitting(false)
      return
    }

    const profilePayload: ProfileEntries = {
      schemaVersion: 'psm-profile/client@v1',
      ...entries,
    }

    const payload = {
      type: 'client_signup',
      submittedAt: new Date().toISOString(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      data: profilePayload,
    }

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }
      saveLocal(STORAGE_KEY_CLIENT, profilePayload)
      setProfile(profilePayload)
      setDone(true)
    } catch (err) {
      console.error('Failed to submit client signup', err)
      setError('We konden je aanmelding niet naar het platform versturen. Probeer het opnieuw of mail ons via info@prosafetymatch.nl.')
    }

    setSubmitting(false)
  }

  const hasProfile = profile && Object.keys(profile).length > 0

  if (done) {
    return (
      <div className={`mx-auto max-w-3xl space-y-6 ${className}`.trim()}>
        <Card>
          <CardSection
            title="Accountaanvraag opgeslagen ✅"
            subtitle="Je bedrijfsgegevens zijn gelogd voor het platform en lokaal opgeslagen. Je kunt dit later importeren in je dashboard."
          >
            <div className="text-sm text-gray-700">
              <div className="mb-1 font-semibold">Samenvatting (JSON)</div>
              <pre className="max-h-64 overflow-auto rounded-lg border border-gray-200 bg-gray-50 p-3 text-xs">{JSON.stringify(profile, null, 2)}</pre>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <PrimaryButton type="button" onClick={() => downloadJSON('psm-opdrachtgever-profiel.json', profile)}>
                Download JSON
              </PrimaryButton>
              <SecondaryButton
                type="button"
                onClick={() => {
                  try {
                    navigator.clipboard?.writeText(JSON.stringify(profile, null, 2))
                  } catch {
                    /* clipboard failure silently ignored */
                  }
                }}
              >
                Kopieer JSON
              </SecondaryButton>
              <Link href={successReturnHref} className={`${linkBase} text-gray-700 hover:bg-gray-100`}>
                Terug naar home
              </Link>
            </div>
          </CardSection>
        </Card>
      </div>
    )
  }

  return (
    <div className={`mx-auto max-w-3xl space-y-6 ${className}`.trim()}>
      <div className="space-y-2">
        <h2 className={headingClassName}>{heading}</h2>
        <p className={descriptionClassName}>{description}</p>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700" role="alert" aria-live="assertive">
          {error}
        </div>
      ) : null}

      {hasProfile ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
          Er is al een lokaal profiel gevonden. Als je opnieuw indient, wordt het overschreven.
        </div>
      ) : null}

      <form onSubmit={onSubmit} className="space-y-6" data-testid="client-form">
        <Card>
          <CardSection title="Bedrijfsgegevens">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="company">Bedrijfsnaam</Label>
                <Input id="company" name="company" required defaultValue={profile.company || ''} placeholder="Bedrijf BV" autoComplete="organization" />
              </div>
              <div>
                <Label htmlFor="kvk">KvK-nummer</Label>
                <Input
                  id="kvk"
                  name="kvk"
                  required
                  defaultValue={profile.kvk || ''}
                  placeholder="87654321"
                  inputMode="numeric"
                  pattern="\\d{8,}"
                />
              </div>
              <div>
                <Label htmlFor="contact">Contactpersoon</Label>
                <Input id="contact" name="contact" required defaultValue={profile.contact || ''} placeholder="Voornaam Achternaam" autoComplete="name" />
              </div>
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" name="email" type="email" required defaultValue={profile.email || ''} placeholder="inkoop@bedrijf.nl" autoComplete="email" />
              </div>
              <div>
                <Label htmlFor="region">Locatie / regio</Label>
                <Input id="region" name="region" defaultValue={profile.region || ''} placeholder="Rotterdam / Moerdijk / Terneuzen…" autoComplete="address-level2" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="needs">Behoefte</Label>
                <Textarea
                  id="needs"
                  name="needs"
                  rows={3}
                  defaultValue={profile.needs || ''}
                  placeholder="Aantal brandwachten, data, dag/nacht/weekend, turnaround/stop, vereiste certificaten"
                />
              </div>
            </div>
          </CardSection>
        </Card>

        <div className="flex flex-wrap gap-3">
          <PrimaryButton type="submit" disabled={submitting}>
            {submitting ? 'Bezig met opslaan…' : 'Aanmelding opslaan'}
          </PrimaryButton>
          {showCancel ? (
            <Link href={cancelHref} className={`${linkBase} text-gray-700 hover:bg-gray-100`}>
              Annuleren
            </Link>
          ) : null}
        </div>
      </form>
    </div>
  )
}
