import Link from 'next/link'
import type { Metadata } from 'next'
import { getSignupUrl } from '@/lib/config'
import { getPostSlugs, getPostBySlug, readingTime, formatReadingTime } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Eerlijke tarieven voor brandwachten – ProBrandwacht.nl',
  description:
    'ProBrandwacht.nl is het voorportaal van ProSafetyMatch: het digitale platform waar opdrachtgevers en brandwachten elkaar transparant vinden.',
  alternates: { canonical: '/', languages: { 'nl-NL': '/' } },
  other: { hreflang: 'nl-NL' },
}

export default async function HomePage() {
  const signupUrl = getSignupUrl()

  const slugs = await getPostSlugs()
  const posts = (
    await Promise.all(
      slugs.map(async slug => {
        const { frontmatter, content } = await getPostBySlug(slug)
        const date = frontmatter.date ? new Date(frontmatter.date) : undefined
        return {
          slug,
          title: frontmatter.title ?? slug,
          description: (frontmatter.description as string | undefined) ?? undefined,
          date,
          rt: readingTime(content),
        }
      }),
    )
  )
    .sort((a, b) => {
      if (!a.date && !b.date) return 0
      if (!a.date) return 1
      if (!b.date) return -1
      return b.date.getTime() - a.date.getTime()
    })
    .slice(0, 3)

  const faqs = [
    {
      q: 'Hoeveel pakt een bureau gemiddeld per uur?',
      a: 'Vaak €15–€25 per uur bij tarieven van €45–€60; dit verschilt per type inzet, risico en tijdstip (nacht/weekend).',
    },
    {
      q: 'Wat verdien ik als zzp’er via ProBrandwacht straks?',
      a: 'Richtlijn €38–€45+ per uur afhankelijk van opdracht. Je ziet de volledige verdeling; de platformfee is circa €5/u.',
    },
    {
      q: 'Hoe werkt escrow‑betaling?',
      a: 'De opdrachtgever betaalt vooraf in een tussenrekening. Na bevestigde uitvoering volgt automatische uitbetaling—op tijd en transparant.',
    },
  ]

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <div className="relative w-full bg-gradient-to-r from-brand-50 to-white">
      <div className="relative text-slate-900">
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 md:px-8 pt-8 md:pt-12 lg:pt-16 pb-12 md:pb-20 lg:pb-24 space-y-12">
          {/* Hero */}
          <header className="space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold">
              Eerlijke tarieven voor brandwachten in Nederland
            </h1>
            <p className="text-slate-700 max-w-2xl">
              ProBrandwacht.nl is het voorportaal van ProSafetyMatch: het digitale platform waar
              opdrachtgevers en brandwachten elkaar transparant vinden.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={signupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md bg-slate-900 text-white px-5 py-3 text-sm font-medium hover:bg-black shadow"
              >
                Meld je aan als zzp‑brandwacht
              </a>
              <Link href="/manifest" className="text-sm underline">
                Lees hoe het werkt →
              </Link>
            </div>
          </header>

          {/* Probleem */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Het probleem</h2>
            <p className="text-slate-700 max-w-3xl">
              Grote bureaus claimen lage tarieven richting opdrachtgevers, maar brandwachten zijn de
              dupe. Hoge marges drukken motivatie en kwaliteit. Wij maken dit concreet en
              transparant.
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Traditioneel model */}
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="font-medium">Traditioneel bureau</h3>
                <p className="text-sm text-slate-600">Opdrachtgever betaalt €50/u</p>
                <div className="mt-3">
                  <div className="flex h-8 w-full overflow-hidden rounded-md border border-slate-200">
                    <div
                      className="flex items-center justify-center bg-slate-300 text-xs text-slate-800"
                      style={{ width: `${(20 / 50) * 100}%` }}
                      aria-label="Bureau pakt €20/u"
                    >
                      Bureau €20
                    </div>
                    <div
                      className="flex-1 flex items-center justify-center bg-brand-500/90 text-white text-xs"
                      aria-label="Brandwacht ontvangt €30/u"
                    >
                      Brandwacht €30
                    </div>
                  </div>
                </div>
              </div>
              {/* Transparant model */}
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="font-medium">ProSafetyMatch (binnenkort)</h3>
                <p className="text-sm text-slate-600">Opdrachtgever betaalt €45/u</p>
                <div className="mt-3">
                  <div className="flex h-8 w-full overflow-hidden rounded-md border border-slate-200">
                    <div
                      className="flex items-center justify-center bg-emerald-300 text-xs text-slate-900"
                      style={{ width: `${(5 / 45) * 100}%` }}
                      aria-label="Platform fee €5/u"
                    >
                      Platform €5
                    </div>
                    <div
                      className="flex-1 flex items-center justify-center bg-brand-500/90 text-white text-xs"
                      aria-label="Brandwacht ontvangt €40/u"
                    >
                      Brandwacht €40
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Oplossing */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">De oplossing</h2>
            <ul className="grid gap-3 sm:grid-cols-3">
              <li className="rounded-lg border bg-white p-4 text-sm shadow-sm">
                <p className="font-medium">Transparant platform</p>
                <p className="text-slate-600">Iedereen ziet tarieven en verdeling.</p>
              </li>
              <li className="rounded-lg border bg-white p-4 text-sm shadow-sm">
                <p className="font-medium">Escrow‑betaling</p>
                <p className="text-slate-600">
                  Altijd op tijd uitbetaald, veilig voor beide partijen.
                </p>
              </li>
              <li className="rounded-lg border bg-white p-4 text-sm shadow-sm">
                <p className="font-medium">Certificaten & reviews</p>
                <p className="text-slate-600">Controle op actuele certificaten en kwaliteit.</p>
              </li>
            </ul>
            <div className="rounded-lg border border-brand-500/20 bg-brand-50 p-4 text-sm">
              Binnenkort live via <span className="font-medium">ProSafetyMatch.nl</span> – exclusief
              voor brandwachten die nu al aansluiten.
            </div>
            <div>
              <a
                href={signupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-slate-50"
              >
                Reserveer je plek als zzp’er
              </a>
            </div>
          </section>

          {/* Wat jij nu kan doen */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Wat jij nu kan doen</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              <li className="rounded-lg border bg-white p-4 text-sm shadow-sm">
                Meld je aan als zzp’er en word onderdeel van de eerste lichting.
              </li>
              <li className="rounded-lg border bg-white p-4 text-sm shadow-sm">
                Ontvang updates over de lancering + gegarandeerde vroege toegang.
              </li>
            </ul>
            <div>
              <a
                href={signupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md bg-slate-900 text-white px-5 py-3 text-sm font-medium hover:bg-black shadow"
              >
                Meld je gratis aan voor updates
              </a>
            </div>
          </section>

          {/* Blog / kennisbank */}
          {posts.length > 0 ? (
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Blogs & kennisbank</h2>
              <ul className="grid gap-6 sm:grid-cols-3">
                {posts.map(p => (
                  <li
                    key={p.slug}
                    className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <Link href={`/blog/${p.slug}`} className="font-medium hover:underline">
                      {p.title}
                    </Link>
                    <div className="text-xs text-slate-500 mt-1">
                      {p.date ? (
                        <time dateTime={p.date.toISOString().slice(0, 10)}>
                          {p.date.toLocaleDateString('nl-NL', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </time>
                      ) : (
                        <span>Onbekende datum</span>
                      )}
                      <span> • </span>
                      <span>{formatReadingTime(p.rt.minutes, 'nl-NL')}</span>
                    </div>
                    {p.description ? (
                      <p
                        className="text-sm text-slate-600 mt-2 overflow-hidden text-ellipsis"
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical' as any,
                        }}
                      >
                        {p.description}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
              <div className="mt-2 text-sm">
                <Link href="/blog" className="underline">
                  Alle artikelen →
                </Link>
              </div>
            </section>
          ) : null}

          {/* FAQ snippet */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">FAQ</h2>
            <ul className="grid gap-4 sm:grid-cols-2">
              {faqs.map((f, i) => (
                <li key={i} className="rounded-lg border bg-white p-4 shadow-sm">
                  <p className="font-medium">{f.q}</p>
                  <p className="text-sm text-slate-600 mt-1">{f.a}</p>
                </li>
              ))}
            </ul>
            <div className="text-sm">
              <Link href="/faq" className="underline">
                Meer vragen en antwoorden →
              </Link>
            </div>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
          </section>
        </div>
      </div>
    </div>
  )
}
