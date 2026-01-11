// app/(site)/voor-brandwachten/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

import HeroBackground from "@/components/HeroBackground";
import SeoStructuredData from "@/components/SeoStructuredData";
import StructuredBreadcrumbs from "@/components/structured-breadcrumbs";
import { generalPlatformFaq } from "@/lib/seo/commonFaqs";
import { getRouteMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = getRouteMetadata("/voor-brandwachten");

export default function VoorBrandwachtenPage() {
  const breadcrumbItems = [
    { name: "Home", url: "https://www.probrandwacht.nl/" },
    { name: "Voor brandwachten", url: "https://www.probrandwacht.nl/voor-brandwachten" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      <SeoStructuredData faqs={generalPlatformFaq.slice(0, 4)} />

      <div className="mx-auto w-full max-w-6xl px-4 py-6">
        <StructuredBreadcrumbs items={breadcrumbItems} />
      </div>

      {/* HERO (layout behouden, inhoud uit beide snippets samengevoegd) */}
      <HeroBackground>
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 pb-14 pt-8 px-4">
          <span className="inline-flex w-fit items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
            Voor brandwachten (zzp)
          </span>

          <h1 className="text-3xl font-semibold text-white md:text-4xl">
            Niet voor iedereen, wel{" "}
            <span className="text-emerald-300">voor vakprofessionals</span>
            <br className="hidden md:block" />
            die verantwoordelijkheid tot op de vloer dragen.
          </h1>

          <p className="max-w-3xl text-sm leading-relaxed text-slate-200 md:text-base">
            ProBrandwacht is bedoeld voor zelfstandige brandwachten die directe samenwerking aankunnen
            zonder inzetbelofte, zonder aansturing en zonder iemand die het regelt.
            Aanmeldingen worden selectief beoordeeld; niet iedere aanmelding leidt tot deelname.
          </p>

          <p className="mt-4 max-w-3xl text-sm text-slate-300">
            ProBrandwacht is niet bedoeld voor iedere zelfstandige.
            Veel professionals werken prettig via bureaus - en dat is prima.
            Dit platform is er voor brandwachten die bewust kiezen voor directe
            afstemming en verantwoordelijkheid in de uitvoering.
          </p>

          <p className="max-w-3xl text-sm text-slate-300">
            Of je nu industrieel, evenementen, utiliteit of bouw draait: het gaat om dezelfde basis
            van rolvastheid, gedrag onder druk en afspraken die je kunt uitleggen.
          </p>

          <p className="max-w-3xl text-xs leading-relaxed text-slate-300 md:text-sm">
            DBA-bewust werken is niet alleen papier. Het gaat ook om rolbegrip, voorspelbaarheid in uitvoering,
            en afspraken die je kunt uitleggen en naleven - contextafhankelijk per klus.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/voor-brandwachten/aanmelden"
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
            >
              Interesse doorgeven (wachtlijst)
            </Link>

            <Link
              href="/belangen"
              className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Kaders & verantwoordelijkheid
            </Link>

            <Link
              href="/voorwaarden"
              className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Uitgangspunten
            </Link>

            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Kennisbank
            </Link>
          </div>
        </div>
      </HeroBackground>

      {/* BODY (layout behouden, structuur uit “Dit past bij je als…” toegevoegd) */}
      <section className="border-t border-slate-900/60 bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16 space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Dit past bij je als */}
            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                Dit past bij je als
              </p>

              <ul className="mt-3 space-y-2 text-sm text-slate-200">
                <li>• Je zelfstandig opereert en dat ook zo wilt houden.</li>
                <li>• Je afspraken kunt uitleggen en naleven (schriftelijk en in de praktijk).</li>
                <li>• Je verantwoordelijkheid draagt op de werkvloer, ook onder druk.</li>
                <li>• Je snapt dat geen enkele inzet standaard is: context bepaalt veel.</li>
                <li>• Je tarief en voorwaarden in overleg bepaalt, zonder sturing van derden.</li>
              </ul>
            </div>

            {/* Dit past waarschijnlijk niet */}
            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                Dit past waarschijnlijk niet als
              </p>

              <ul className="mt-3 space-y-2 text-sm text-slate-200">
                <li>• Je zoekt naar vaste aansturing, planning of iemand boven je.</li>
                <li>• Je verwacht dat een platform inzet regelt of bezetting garandeert.</li>
                <li>• Je vooral vaste uren wilt zonder gedeelde verantwoordelijkheid.</li>
                <li>• Je de intentie niet leest en blind wilt inschrijven.</li>
                <li>• Je vooral volume zoekt in plaats van voorspelbare, professionele uitvoering.</li>
              </ul>
            </div>
          </div>

          {/* De lat (in de regel) */}
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
            <p className="text-sm font-semibold text-white">Waar we op selecteren</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-200 max-w-4xl">
              We proberen zichtbaar te maken wat “zelfstandig” in de praktijk betekent. Niet als oordeel,
              maar als selectiecriterium voor samenwerking die uitlegbaar blijft.
            </p>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-5">
                <p className="text-sm font-semibold text-white">Gedrag</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-200">
                  <li>• Rolbegrip: weten wat jouw verantwoordelijkheid is (en wat niet).</li>
                  <li>• Situatiegedrag: kalm communiceren als het spannend wordt.</li>
                  <li>• Communicatie zonder narratief-spin of verhalen achteraf.</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-5">
                <p className="text-sm font-semibold text-white">Afspraken</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-200">
                  <li>• Dossierdiscipline: afspraken vastleggen en terug te vinden houden.</li>
                  <li>• Tarief/voorwaarden: in overleg, passend bij risico en context.</li>
                  <li>• Grenzen: tijdig aangeven wat wel/niet kan binnen jouw rol.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
            <p className="text-sm font-semibold text-white">Herkenbare scenario's</p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-5">
                <p className="text-sm font-semibold text-white">Opdracht zonder rolvastheid</p>
                <p className="mt-2 text-sm text-slate-200">
                  Je wordt verwacht de klus te fixen, maar niemand kan uitleggen wie wat beslist.
                  Dit past niet. Eerst rolafbakening, anders geen start.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-5">
                <p className="text-sm font-semibold text-white">Spoed met onduidelijke afspraken</p>
                <p className="mt-2 text-sm text-slate-200">
                  Een opdrachtgever wil direct starten zonder verslaglegging of afspraken over gezag.
                  Dan zeg je nee, of je stelt expliciet vast wat er wel kan.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-5">
                <p className="text-sm font-semibold text-white">Nabeschouwing onder druk</p>
                <p className="mt-2 text-sm text-slate-200">
                  Er ontstaat discussie achteraf. Dossierdiscipline en duidelijke grenzen maken
                  het verschil tussen conflict en professionele afhandeling.
                </p>
              </div>
            </div>
          </div>

          {/* Waarom zo selectief? */}
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
            <p className="text-sm font-semibold text-white">Waarom zo selectief?</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-200">
              Omdat vertrouwen niet uit marketing komt, maar uit voorspelbaarheid in uitvoering.
              Onder druk zoeken organisaties vaak naar duidelijkheid en rolvastheid.
              Als jij als zelfstandige verantwoordelijkheid kunt dragen én afspraken uitlegbaar houdt,
              dan helpt dat de samenwerking — in de regel — vooruit.
            </p>
            <p className="mt-3 text-xs text-slate-300">
              ProSafetyMatch (in ontwikkeling) bouwt later technisch voort op deze uitgangspunten.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
