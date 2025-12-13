"use client";

import { useState } from "react";

type Role = "zelfstandige brandwacht" | "beveiliger" | "mvk";

export default function LeadCalculator() {
  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("zelfstandige brandwacht");

  // “nu via bureau”
  const [bureauHourly, setBureauHourly] = useState<number | "">("");
  // standaard 144u p/m, bewerkbaar
  const [hoursPerMonth, setHoursPerMonth] = useState<number | "">(144);
  // optioneel, indicatief
  const [costPct, setCostPct] = useState<number | "">(30);

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

  return (
    <section className="rounded-3xl p-0 text-slate-900">
      <h2 className="text-[20px] font-semibold text-slate-900">Bereken wat je écht waard bent</h2>
      <p className="mt-1 text-[13px] text-slate-700">
        Met <strong>2 velden</strong> ontdek je wat je maandelijks laat liggen. Je ontvangt direct een{" "}
        <strong>persoonlijk PDF-rapport</strong> met het verschil — inclusief <em>indicatie bij 10% minder uren</em>.
      </p>
      <p className="mt-1 text-[11.5px] text-slate-600">
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
          <span className="text-slate-700">Naam (optioneel)</span>
          <input
            className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-brand-400 focus:ring-1 focus:ring-brand-300"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jouw naam"
          />
        </label>

        <label className="text-[13px]">
          <span className="text-slate-700">E-mailadres</span>
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
          <span className="text-slate-700">Rol</span>
          <select
            className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
          >
            <option value="zelfstandige brandwacht">zelfstandige brandwacht</option>
            <option value="beveiliger">Beveiliger</option>
          </select>
        </label>

        <label className="text-[13px]">
          <span className="text-slate-700">Huidig uurtarief via bureau (€)</span>
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
          <span className="text-slate-700">Uren per maand</span>
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
          <span className="text-slate-700">Kosten (% van omzet)</span>
          <input
            type="number"
            className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
            value={costPct}
            onChange={(e) => setCostPct(e.target.value === "" ? "" : Number(e.target.value))}
            placeholder="Bijv. 30"
          />
        </label>

        <div className="rounded-md border border-slate-200 bg-white p-3 text-[13px] sm:col-span-2">
          <p className="font-medium text-slate-900">Belasting & aftrek (indicatief)</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={hasInsurance} onChange={() => setHasInsurance(!hasInsurance)} />
              AOV/pensioen aanwezig
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={aftrekZelf} onChange={() => setAftrekZelf(!aftrekZelf)} />
              Zelfstandigenaftrek
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={aftrekMkb} onChange={() => setAftrekMkb(!aftrekMkb)} />
              MKB-vrijstelling
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={aftrekStart} onChange={() => setAftrekStart(!aftrekStart)} />
              Startersaftrek
            </label>
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="flex items-center gap-2 text-xs text-slate-600">
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

      {/* Micro-feedback tegeltjes (geen cijfers in UI; alles staat in PDF) */}
      <div className="mt-3 grid gap-2.5 text-sm sm:grid-cols-3">
        <div className="rounded border border-slate-200 bg-white p-3">
          <p className="text-[11px] text-slate-700">Preview</p>
          <p className="text-slate-900">We tonen de uitkomst alleen in je PDF-rapport.</p>
        </div>
        <div className="rounded border border-slate-200 bg-white p-3">
          <p className="text-[11px] text-slate-700">Indicatie</p>
          <p className="text-slate-900">Inclusief scenario bij 10% minder uren.</p>
        </div>
        <div className="rounded border border-slate-200 bg-white p-3">
          <p className="text-[11px] text-slate-700">Transparantie</p>
          <p className="text-slate-900">Gebaseerd op feedback (200+ professionals).</p>
        </div>
      </div>
    </section>
  );
}
