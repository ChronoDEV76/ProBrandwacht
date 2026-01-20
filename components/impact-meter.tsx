"use client";
import { useMemo, useState } from "react";

export default function ImpactMeter() {
  const [fair, setFair] = useState(43);     // eerlijk tarief €/u
  const [payout, setPayout] = useState(32); // bureau-uitbetaling €/u
  const [hours, setHours] = useState(144);  // uren p/m
  const [workers, setWorkers] = useState(1);

  const diff = Math.max(fair - payout, 0);
  const monthly = useMemo(() => diff * hours * workers, [diff, hours, workers]);
  const yearly  = useMemo(() => monthly * 12, [monthly]);

  const euro = (v:number) =>
    v.toLocaleString("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

  return (
    <section
      aria-labelledby="impact-heading"
      className="rounded-3xl border border-rose-200 bg-rose-50/60 p-6 shadow-sm sm:p-8"
    >
      <h2 id="impact-heading" className="text-2xl font-semibold text-rose-900">
        Wat doet €10–€11 verschil echt?
      </h2>
      <p className="mt-2 text-sm text-rose-900/80">
        Reken uit wat er verdwijnt in de tussenlaag. Hard op de inhoud, eerlijk in de uitkomst.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-4">
        <Field label="Eerlijk tarief (€/u)" value={fair} onChange={setFair} />
        <Field label="Bureau-uitbetaling (€/u)" value={payout} onChange={setPayout} />
        <Field label="Uren p/m" value={hours} onChange={setHours} />
        <Field label="# Professionals" value={workers} onChange={setWorkers} />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <Stat label="Verschil per uur" value={euro(diff)} />
        <Stat label="Per maand (alle ingevoerde uren)" value={euro(monthly)} />
        <Stat label="Per jaar (alle ingevoerde uren)" value={euro(yearly)} />
      </div>

      <div className="mt-5 rounded-2xl border border-rose-300 bg-white p-4 text-sm text-rose-900">
        <p className="font-semibold">Kern:</p>
        <ul className="ml-4 list-disc">
          <li>Werk je onder je eerlijke tarief, dan werk je mee aan de race to the bottom.</li>
          <li>Een bureau-tarief bevat ruis + marge en zegt niets over jouw echte waarde.</li>
          <li>Gamechanger: eerlijk tarief, rechtstreekse afspraken en voorspelbare betaling.</li>
        </ul>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <label className="block text-sm">
      <span className="text-slate-700">{label}</span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2"
      />
    </label>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white/90 p-4">
      <p className="text-xs text-slate-600">{label}</p>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}
