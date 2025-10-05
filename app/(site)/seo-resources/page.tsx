import type { Metadata } from 'next'
import Link from 'next/link'
import { authoritativeSources } from '@/lib/seo/authoritative-sources'

export const metadata: Metadata = {
  title: 'Autoritaire bronnen voor brandwachtcontent | ProSafetyMatch',
  description:
    'Top 10 officiële bronnen (CBS, KVK, Belastingdienst e.a.) om je brandwachtartikelen te onderbouwen met betrouwbare data en regelgeving.',
}

export default function SeoResourcesPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-slate-900">
        Autoritaire bronnen voor brandwachtcontent
      </h1>
      <p className="mt-3 text-sm text-slate-600">
        Gebruik deze lijst wanneer je blogs of landingspagina’s schrijft. Link naar de passende bron
        met een beschrijvende anchor-tekst om Expertise, Authoritativeness en Trustworthiness te
        versterken.
      </p>

      <ol className="mt-8 space-y-6">
        {authoritativeSources.map((src, index) => (
          <li key={src.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-xs font-semibold uppercase text-slate-500">{index + 1}.</div>
            <h2 className="mt-1 text-xl font-semibold text-slate-900">{src.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{src.description}</p>
            <ul className="mt-4 space-y-2">
              {src.links.map(link => (
                <li key={link.href}>
                  <Link
                    className="text-sm font-medium text-brand-700 underline hover:text-brand-800"
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </main>
  )
}
