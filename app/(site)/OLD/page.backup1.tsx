// app/(site)/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

import HeroBackground from "@/components/HeroBackground";
import SeoStructuredData from "@/components/SeoStructuredData";
import StructuredBreadcrumbs from "@/components/structured-breadcrumbs";
import { getRouteMetadata } from "@/lib/seo/metadata";
import { generalPlatformFaq } from "@/lib/seo/commonFaqs";

export const metadata: Metadata = getRouteMetadata("/");

export default function HomePage() {
  const breadcrumbItems = [{ name: "Home", url: "https://www.probrandwacht.nl/" }];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      <SeoStructuredData faqs={generalPlatformFaq.slice(0, 4)} />

      <div className="mx-auto w-full max-w-6xl px-4 py-6">
        <StructuredBreadcrumbs items={breadcrumbItems} />
      </div>

      {/* HERO (layout from your first snippet) */}
      <HeroBackground>
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 pb-14 pt-8 px-4">
          <span className="inline-flex w-fit items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
            ProBrandwacht
          </span>

          <h1 className="text-3xl font-semibold text-white md:text-5xl">
            Geen garanties, wel{" "}
            <span className="text-emerald-300">uitvoerbare afspraken</span>
            <br className="hidden md:block" />
            die je op de vloer kunt uitleggen.
          </h1>

          <p className="max-w-3xl text-sm leading-relaxed text-slate-200 md:text-base">
            ProBrandwacht is een selectief platform voor zelfstandige brandwachten en opdrachtgevers
            die directe samenwerking aankunnen en vooraf vastleggen wat er gebeurt als het spannend wordt.
            Niet voor iedereen. Alleen voor partijen die verantwoordelijkheid dragen tot en met de uitvoering.
          </p>

          <p className="max-w-3xl text-xs leading-relaxed text-slate-300 md:text-sm">
            ProBrandwacht is{" "}
            <strong className="font-semibold text-slate-100">geen</strong> bureau,{" "}
            <strong className="font-semibold text-slate-100">geen</strong> bemiddelaar
            en biedt{" "}
            <strong className="font-semibold text-slate-100">geen</strong> garantie op inzet.
            Wel: toetsbare rolverdeling, dossierdiscipline en afspraken die in de praktijk standhouden.
          </p>

          <p className="max-w-3xl text-xs leading-relaxed text-slate-300 md:text-sm">
            Veiligheid blijft leidend. Iedereen mag zich aanmelden, zolang je intenties kloppen met onze manier van werken.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/opdrachtgevers"
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
            >
              Voor opdrachtgevers
            </Link>
            <Link
              href="/voor-brandwachten"
              className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Voor zelfstandige brandwachten
            </Link>
            <Link
              href="/belangen"
              className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Kaders & spelregels
            </Link>
          </div>

          {/* 3 cards (keep your layout, align copy to v2 framing) */}
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {[
              {
                t: "Uitvoerbaar voor start",
                d: "Afspraken die je op locatie kunt uitleggen: rol, gezag, grenzen en verslaglegging.",
              },
              {
                t: "Spoed kan, maar niet blind",
                d: "Snel schakelen kan alleen als randvoorwaarden kloppen en verantwoordelijkheid expliciet is.",
              },
              {
                t: "Geen tariefdwang",
                d: "Transparante fee en heldere afspraken. Tarief en voorwaarden bepaal je samen.",
              },
            ].map((x) => (
              <div
                key={x.t}
                className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-[0_26px_70px_-40px_rgba(0,0,0,0.65)]"
              >
                <p className="text-sm font-semibold text-white">{x.t}</p>
                <p className="mt-2 text-sm text-slate-200">{x.d}</p>
              </div>
            ))}
          </div>

          {/* Expectations block (keep layout) */}
          <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900/60 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
              Wat je wél en niet mag verwachten
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              <li>• Niet geschikt als je volledige bezettingsgarantie of aansturing wilt.</li>
              <li>• Wel: uitvoerbare afspraken die je kunt uitleggen onder druk.</li>
              <li>• Selectieve instroom; niet iedere aanmelding leidt tot deelname.</li>
              <li>• Verwacht gedrag, dossierdiscipline en context-bewuste rolafbakening.</li>
            </ul>
          </div>
        </div>
      </HeroBackground>

      {/* CONTENT SECTIONS (merged from your second snippet, styled like the first) */}
      <section className="border-t border-slate-900/60 bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* What we DO */}
            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                Wat ProBrandwacht wél doet
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Inzicht, kaders en uitvoering</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-200">
                <li>• Afspraken die op de werkvloer kloppen, niet alleen op papier.</li>
                <li>• Kaders voor rolverdeling, gezag, grenzen en verslaglegging.</li>
                <li>• DBA-bewust werken zichtbaar maken in gedrag en uitvoering.</li>
                <li>• Verkennen zonder verplichtingen, maar wel met duidelijke lat.</li>
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/over-ons"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Lees onze uitgangspunten
                </Link>
                <Link
                  href="/disclaimer"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Juridische positie
                </Link>
              </div>
            </div>

            {/* What we are NOT */}
            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                Wat ProBrandwacht niet is
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Geen rol tussen partijen</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-200">
                <li>• Geen bureau en geen detacheringspartij.</li>
                <li>• Geen partij in overeenkomsten.</li>
                <li>• Geen garantie op inzet of inkomen.</li>
                <li>• Geen sturing op tarief, inzet of planning.</li>
                <li>• Geen buffer die verantwoordelijkheid overneemt als het misgaat.</li>
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/opdrachtgevers"
                  className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
                >
                  Voor opdrachtgevers
                </Link>
                <Link
                  href="/voor-brandwachten"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Voor brandwachten
                </Link>
              </div>
            </div>
          </div>

          {/* Your existing two cards section can stay; we tighten copy to match framing */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">Voor opdrachtgevers</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Snel schakelen, zonder ruis</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-200">
                Je plaatst een uitvraag met locatie, rol en randvoorwaarden. Bij spoed kan dit via een korte funnel
                met directe communicatie. Betaling en afspraken zijn afhankelijk van het gekozen scenario.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/opdrachtgevers"
                  className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
                >
                  Naar opdrachtgevers
                </Link>
                <Link
                  href="/disclaimer"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Disclaimer / DBA-kaders
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">Voor brandwachten</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Zelfstandig, met discipline</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-200">
                Jij blijft zelfstandig. Tegelijk maken we zichtbaar wat verantwoordelijkheid op de vloer betekent:
                rolbegrip, communicatie, dossier-discipline en professioneel gedrag onder druk.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/voor-brandwachten"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Naar brandwachten
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Lees de kennisbank
                </Link>
              </div>
            </div>
          </div>

          {/* Final CTA block (merged “Verkennen begint met begrijpen”, but in your style) */}
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
            <p className="text-sm font-semibold text-white">Verkennen begint met begrijpen</p>
            <p className="mt-2 text-sm text-slate-200">
              ProBrandwacht is bedoeld voor professionals en organisaties die bewust willen nadenken over hoe
              samenwerking eruitziet — vóórdat afspraken worden gemaakt. Vragen of een scenario bespreken?
              Neem contact op via{" "}
              <a className="underline hover:text-white" href="mailto:info@prosafetymatch.nl">
                info@prosafetymatch.nl
              </a>
              . Reageertijden zijn afhankelijk van drukte.
            </p>
          </div>

          <section className="mt-16 border-t border-white/10 pt-8">
            <h3 className="text-sm font-semibold text-white">
              Waarom ProBrandwacht bewust beperkt blijft
            </h3>

            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300">
              ProBrandwacht is geen eindproduct en ook geen marktplaats.
              Het is een verkennend platform om zichtbaar te maken
              welke zelfstandigen en opdrachtgevers daadwerkelijk
              passen bij directe samenwerking.
            </p>

            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300">
              Wat hier werkt — in gedrag, rolverdeling en uitvoeringspraktijk —
              vormt de basis voor ProSafetyMatch:
              een afzonderlijk, gesloten platform dat uitsluitend
              bedoeld is voor partijen die deze manier van samenwerken
              aantoonbaar kunnen dragen.
            </p>

            <p className="mt-3 max-w-3xl text-xs text-slate-400">
              ProSafetyMatch is niet openbaar en niet bedoeld voor volume.
              Toegang is contextafhankelijk en volgt pas na bewezen praktijk.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
