"use client";

import { useState } from "react";

type Role = "zelfstandige brandwacht" | "beveiliger" | "mvk";
type NormalizedRole = "brandwacht" | "beveiliger" | "mvk";

const ROLE_MARKET_HINT: Record<NormalizedRole, number> = {
  brandwacht: 43,
  beveiliger: 38,
  mvk: 65,
};

function normalizeRole(role: Role): NormalizedRole {
  if (role === "zelfstandige brandwacht") return "brandwacht";
  return role;
}

function calculateMarketHourly(role: NormalizedRole, bureauHourly: number): number {
  const hint = ROLE_MARKET_HINT[role] ?? bureauHourly + 10;
  const uplift = Math.min(Math.max(bureauHourly + 12, bureauHourly * 1.2), bureauHourly + 20);
  return Math.round(((hint + uplift) / 2) * 100) / 100;
}

function computeIndicative({
  role,
  bureauHourly,
  hoursPerMonth,
  costPct,
  aftrekZelf,
  aftrekMkb,
  aftrekStart,
}: {
  role: Role;
  bureauHourly: number | "";
  hoursPerMonth: number | "";
  costPct: number | "";
  aftrekZelf: boolean;
  aftrekMkb: boolean;
  aftrekStart: boolean;
}) {
  if (bureauHourly === "" || hoursPerMonth === "") return null;

  const bureau = Number(bureauHourly);
  const hours = Number(hoursPerMonth);
  const costsPct = Number(costPct === "" ? 0 : costPct);

  const roleKey = normalizeRole(role);
  const marketHourly = calculateMarketHourly(roleKey, bureau);

  const PLATFORM_FEE = 0.1;
  const ESCROW_MIN = 0.01;
  const ESCROW_MAX = 0.02;

  const netMin = marketHourly * (1 - PLATFORM_FEE - ESCROW_MAX);
  const netMax = marketHourly * (1 - PLATFORM_FEE - ESCROW_MIN);

  const revenueMonth = marketHourly * hours;
  const costsMonth = revenueMonth * (costsPct / 100);
  const profitBeforeTax = revenueMonth - costsMonth;

  const baseTaxPct = (aftrekZelf ? 0.16 : 0.20) - (aftrekMkb ? 0.02 : 0) - (aftrekStart ? 0.02 : 0);
  const estTax = Math.max(profitBeforeTax * baseTaxPct, 0);
  const netMonth = profitBeforeTax - estTax;

  const diffPerHour = Math.max(marketHourly - bureau, 0);
  const diffPerMonth = diffPerHour * hours;

  const reducedHours = hours * 0.9;
  const reducedRevenue = marketHourly * reducedHours;
  const reducedCosts = reducedRevenue * (costsPct / 100);
  const reducedProfitBeforeTax = reducedRevenue - reducedCosts;
  const reducedTax = Math.max(reducedProfitBeforeTax * baseTaxPct, 0);
  const reducedNetMonth = reducedProfitBeforeTax - reducedTax;

  return {
    marketHourly,
    netMin,
    netMax,
    netMonth,
    reducedNetMonth,
    diffPerHour,
    diffPerMonth,
  };
}

const formatCurrency = (value: number) => `€ ${value.toFixed(2)}`;

export default function LeadCalculator() {
  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("zelfstandige brandwacht");

  // “nu via bureau”
  const [bureauHourly, setBureauHourly] = useState<number | "">(0);
  // standaard 144u p/m, bewerkbaar
  const [hoursPerMonth, setHoursPerMonth] = useState<number | "">(0);
  // optioneel, indicatief
  const [costPct, setCostPct] = useState<number | "">(0);

  // aftrek en verzekeringen (indicatief)
  const [hasInsurance, setHasInsurance] = useState(true);
  const [aftrekZelf, setAftrekZelf] = useState(true);
  const [aftrekMkb, setAftrekMkb] = useState(true);
  const [aftrekStart, setAftrekStart] = useState(false);

  // consent / anti-spam
  const [consent, setConsent] = useState(true);
  const [website, setWebsite] = useState(""); // honeypot (leeg laten!)

  // UX state
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<null | { tone: "ok" | "warn" | "error"; msg: string; link?: string }>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);

    if (!email || !bureauHourly || !hoursPerMonth) {
      setStatus({ tone: "error", msg: "Vul minimaal e-mail, huidig uurtarief en uren per maand in." });
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        name: name || null,
        email,
        role,
        bureauHourly: Number(bureauHourly),
        hoursPerMonth: Number(hoursPerMonth),
        costPct: Number(costPct || 0),
        hasInsurance,
        deductions: {
          zelfstandig: aftrekZelf,
          mkb: aftrekMkb,
          starters: aftrekStart,
        },
        consent,
        source: "lead-calculator",
        website, // honeypot (leeg laten!)
      };

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (res.status === 429) {
        setStatus({
          tone: "warn",
          msg: "Je hebt al een rapport aangevraagd. Probeer het over 24 uur opnieuw.",
        });
      } else if (!res.ok && data?.error) {
        setStatus({ tone: "error", msg: `Verzenden mislukt: ${data.error}` });
      } else if (data?.warn && data?.link) {
        // Mail mislukte, maar rapport is wel geüpload — toon downloadlink
        setStatus({
          tone: "warn",
          msg: "Rapport gemaakt, maar e-mail verzenden mislukte. Download hieronder.",
          link: data.link,
        });
      } else {
        setStatus({ tone: "ok", msg: "Verzonden — check je e-mail voor je persoonlijk PDF-rapport." });
      }
    } catch (err: any) {
      setStatus({ tone: "error", msg: "Er ging iets mis bij het verzenden. Probeer het zo nog eens." });
    } finally {
      setSubmitting(false);
    }
  }

  // Badge-styling
  const toneClasses = (t: "ok" | "warn" | "error") =>
    t === "ok"
      ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200"
      : t === "warn"
      ? "bg-amber-50 text-amber-800 ring-1 ring-amber-200"
      : "bg-rose-50 text-rose-800 ring-1 ring-rose-200";

  const indicative = computeIndicative({
    role,
    bureauHourly,
    hoursPerMonth,
    costPct,
    aftrekZelf,
    aftrekMkb,
    aftrekStart,
  });
  const showFullIndicative = !!indicative && email.trim().length > 0;
  const showTeaserIndicative = !!indicative && !showFullIndicative;

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 text-slate-50 shadow-lg">
      <h2 className="text-[20px] font-semibold text-slate-50">Bereken wat je écht waard bent</h2>
      <p className="mt-1 text-[13px] text-slate-200">
        Met <strong>2 velden</strong> ontdek je wat je maandelijks laat liggen. Je ontvangt direct een{" "}
        <strong>persoonlijk PDF-rapport</strong> met het verschil — inclusief <em>indicatie bij 10% minder uren</em>.
      </p>
      <p className="mt-1 text-[11.5px] text-slate-300">
        Aangescherpt met feedback uit de sector (200+ professionals). We delen alleen je e-mail met ProSafetyMatch voor dit rapport.
      </p>

      <form onSubmit={handleSubmit} className="mt-3 grid gap-2.5 sm:grid-cols-2">
        {/* Honeypot (NIET type="hidden") */}
        <label className="sr-only">
          <span>Laat dit veld leeg</span>
          <input
            name="website"
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="opacity-0 absolute -left-[9999px]"
            tabIndex={-1}
          />
        </label>

        <label className="text-[13px]">
          <span className="text-slate-200">Naam (optioneel)</span>
          <input
            className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-brand-400 focus:ring-1 focus:ring-brand-300"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jouw naam"
          />
        </label>

        <label className="text-[13px]">
          <span className="text-slate-200">E-mailadres</span>
          <input
            type="email"
            required
            className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-brand-400 focus:ring-1 focus:ring-brand-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jij@email.nl"
          />
        </label>

        <label className="text-[13px]">
          <span className="text-slate-200">Rol</span>
          <select
            className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
          >
            <option value="zelfstandige brandwacht">Brandwacht</option>
            <option value="beveiliger">Beveiliger</option>
          </select>
        </label>

        <label className="text-[13px]">
          <span className="text-slate-200">Huidig uurtarief via bureau (€)</span>
          <input
            type="number"
            required
            className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
            value={bureauHourly}
            onChange={(e) => setBureauHourly(e.target.value === "" ? "" : Number(e.target.value))}
            placeholder="Bijv. 32"
          />
        </label>

        <label className="text-[13px]">
          <span className="text-slate-200">Uren per maand</span>
          <input
            type="number"
            required
            className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
            value={hoursPerMonth}
            onChange={(e) => setHoursPerMonth(e.target.value === "" ? "" : Number(e.target.value))}
            placeholder="Bijv. 144"
          />
        </label>

        <label className="text-[13px]">
          <span className="text-slate-200">Kosten (% van omzet)</span>
          <input
            type="number"
            className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
            value={costPct}
            onChange={(e) => setCostPct(e.target.value === "" ? "" : Number(e.target.value))}
            placeholder="Bijv. 30"
          />
        </label>

        <div className="rounded-md border border-slate-800 bg-slate-900/80 p-3 text-[13px] sm:col-span-2">
          <p className="font-medium text-slate-100">Belasting & aftrek (indicatief)</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <label className="flex items-center gap-2 text-slate-200">
              <input type="checkbox" checked={hasInsurance} onChange={() => setHasInsurance(!hasInsurance)} />
              AOV/pensioen aanwezig
            </label>
            <label className="flex items-center gap-2 text-slate-200">
              <input type="checkbox" checked={aftrekZelf} onChange={() => setAftrekZelf(!aftrekZelf)} />
              Zelfstandigenaftrek
            </label>
            <label className="flex items-center gap-2 text-slate-200">
              <input type="checkbox" checked={aftrekMkb} onChange={() => setAftrekMkb(!aftrekMkb)} />
              MKB-vrijstelling
            </label>
            <label className="flex items-center gap-2 text-slate-200">
              <input type="checkbox" checked={aftrekStart} onChange={() => setAftrekStart(!aftrekStart)} />
              Startersaftrek
            </label>
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="flex items-center gap-2 text-xs text-slate-300">
            <input type="checkbox" checked={consent} onChange={() => setConsent(!consent)} />
            Ik wil mijn persoonlijk PDF-rapport ontvangen en updates over eerlijk werken (geen spam).
          </label>
        </div>

        {status && (
          <div className={`sm:col-span-2 mt-1 inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm ${toneClasses(status.tone)}`}>
            <span>{status.msg}</span>
            {status.link && (
              <a className="underline decoration-2 underline-offset-2" href={status.link} target="_blank" rel="noreferrer">
                Download rapport
              </a>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="sm:col-span-2 mt-1 w-full rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition transform hover:-translate-y-0.5 hover:bg-brand-500 disabled:opacity-50"
        >
          {submitting ? "Bezig met verzenden…" : "Bereken & ontvang PDF-rapport"}
        </button>
      </form>

      <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-300">Indicatie</p>
            <p className="text-sm font-medium text-slate-50">
              Marktconform + netto, incl. 10% platformfee
            </p>
          </div>
          <p className="text-[11px] text-slate-400">1–2% betaalbuffer inbegrepen</p>
        </div>
        {showFullIndicative ? (
          <>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <dt className="text-[11px] uppercase tracking-wide text-slate-400">Marktconform (bruto)</dt>
                <dd className="text-base font-semibold text-slate-50">{formatCurrency(indicative.marketHourly)} / uur</dd>
              </div>
              <div className="space-y-1">
                <dt className="text-[11px] uppercase tracking-wide text-slate-400">Netto indicatie</dt>
                <dd className="text-base font-semibold text-slate-50">
                  {formatCurrency(indicative.netMin)} – {formatCurrency(indicative.netMax)} / uur
                </dd>
              </div>
              <div className="space-y-1">
                <dt className="text-[11px] uppercase tracking-wide text-slate-400">Netto per maand</dt>
                <dd className="text-base font-semibold text-slate-50">{formatCurrency(indicative.netMonth)}</dd>
              </div>
              <div className="space-y-1">
                <dt className="text-[11px] uppercase tracking-wide text-slate-400">Scenario: 10% minder uren</dt>
                <dd className="text-base font-semibold text-slate-50">{formatCurrency(indicative.reducedNetMonth)} p/m</dd>
              </div>
              <div className="space-y-1 sm:col-span-2 md:col-span-1">
                <dt className="text-[11px] uppercase tracking-wide text-slate-400">Extra t.o.v. huidig via bureau</dt>
                <dd className="text-base font-semibold text-slate-50">
                  {formatCurrency(indicative.diffPerHour)} / uur · {formatCurrency(indicative.diffPerMonth)} p/m
                </dd>
              </div>
            </dl>
            <p className="mt-2 text-xs text-slate-300">Volledig rapport (met alle aannames) ontvang je per mail.</p>
          </>
        ) : showTeaserIndicative ? (
          <div className="mt-4 space-y-2">
            <div className="rounded-lg border border-emerald-300/40 bg-emerald-400/10 px-3 py-2">
              <p className="text-[11px] uppercase tracking-wide text-emerald-200">Netto indicatie</p>
              <p className="text-base font-semibold text-emerald-100">
                {formatCurrency(indicative.netMin)} – {formatCurrency(indicative.netMax)} / uur
              </p>
            </div>
            <p className="text-sm text-slate-200">
              Vul je e-mail in om de volledige berekening te zien (marketconform, scenario en extra t.o.v. bureau) en
              ontvang direct het PDF-rapport.
            </p>
          </div>
        ) : (
          <div className="mt-3 space-y-3">
            <p className="text-sm text-slate-200">
              Vul je e-mail, huidig uurtarief en uren per maand in om de indicatie vrij te spelen.
              Je ziet direct een preview en ontvangt daarna het volledige PDF-rapport.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-slate-800 bg-slate-900 p-3">
                <p className="text-[11px] uppercase tracking-wide text-slate-400">Marktconform (bruto)</p>
                <div className="mt-1 h-5 w-24 rounded bg-slate-700" />
              </div>
              <div className="rounded-lg border border-slate-800 bg-slate-900 p-3">
                <p className="text-[11px] uppercase tracking-wide text-slate-400">Netto indicatie</p>
                <div className="mt-1 h-5 w-28 rounded bg-slate-700" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Micro-feedback tegeltjes */}
      <div className="mt-3 grid gap-2.5 text-sm sm:grid-cols-3">
        <div className="rounded border border-slate-800 bg-slate-900/80 p-3">
          <p className="text-[11px] text-slate-300">Preview</p>
          <p className="text-slate-50">Schatting zichtbaar; volledig rapport komt per mail.</p>
        </div>
        <div className="rounded border border-slate-800 bg-slate-900/80 p-3">
          <p className="text-[11px] text-slate-300">Scenario</p>
          <p className="text-slate-50">Inclusief 10% minder-uren scenario in het rapport.</p>
        </div>
        <div className="rounded border border-slate-800 bg-slate-900/80 p-3">
          <p className="text-[11px] text-slate-300">Transparantie</p>
          <p className="text-slate-50">Gebaseerd op feedback (200+ professionals).</p>
        </div>
      </div>
    </section>
  );
}
