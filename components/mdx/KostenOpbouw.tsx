// components/mdx/KostenOpbouwScenarios.tsx
import * as React from "react";

type EscrowPct = number | [number, number];

function fmt(v: number) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(v);
}
const asRange = (p: EscrowPct): [number, number] => (Array.isArray(p) ? p : [p, p]);

export default function KostenOpbouwScenarios({
  rates = [48, 60, 72],
  feePct = 10,
  escrowPct = [1, 2],
  title = "Kostenopbouw (excl. btw) – scenario’s",
  note = "Zzp’er factureert direct; PSM faciliteert transparantie en escrow, maar stelt geen tarieven vast.",
}: {
  rates?: number[];
  feePct?: number;
  escrowPct?: EscrowPct;
  title?: string;
  note?: string;
}) {
  const [emin, emax] = asRange(escrowPct);
  const showRange = Math.round(emin * 100) !== Math.round(emax * 100);

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-600">
              <th className="py-2 pr-3">Scenario</th>
              <th className="py-2 pr-3">Uurtarief zzp’er</th>
              <th className="py-2 pr-3">Platformfee ({feePct}%)</th>
              <th className="py-2 pr-3">
                Escrow {showRange ? `(${emin}–${emax}%)` : `(${emin}%)`}
              </th>
              <th className="py-2 pr-3">Totaal opdrachtgever</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {rates.map((r) => {
              const fee = (r * feePct) / 100;
              const eMin = (r * emin) / 100;
              const eMax = (r * emax) / 100;
              const totalMin = r + fee + eMin;
              const totalMax = r + fee + eMax;
              return (
                <tr key={r} className="align-top">
                  <td className="py-2 pr-3 font-medium text-slate-900">{fmt(r)} /u</td>
                  <td className="py-2 pr-3">{fmt(r)}</td>
                  <td className="py-2 pr-3">{fmt(fee)}</td>
                  <td className="py-2 pr-3">
                    {showRange ? `${fmt(eMin)} – ${fmt(eMax)}` : fmt(eMin)}
                  </td>
                  <td className="py-2 pr-3 font-semibold text-slate-900">
                    {showRange ? `${fmt(totalMin)} – ${fmt(totalMax)}` : fmt(totalMin)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mini progressbars onder de tabel (visueel vergelijk) */}
      <div className="mt-4 grid gap-2 md:grid-cols-3">
        {rates.map((r) => {
          const fee = (r * feePct) / 100;
          const eMin = (r * emin) / 100;
          const eMax = (r * emax) / 100;
          const totalMid = r + fee + (eMin + eMax) / 2; // midden van de escrow range
          // schaal grofweg op basis van min/max van de set:
          const minSet = Math.min(...rates) * (1 + feePct / 100 + emin / 100);
          const maxSet = Math.max(...rates) * (1 + feePct / 100 + emax / 100);
          const pct = Math.min(Math.max(((totalMid - minSet) / (maxSet - minSet)) * 100, 0), 100);

          return (
            <div key={`bar-${r}`} className="rounded-xl border p-3">
              <div className="flex justify-between text-xs text-slate-600">
                <span>{fmt(minSet)}</span>
                <span>{fmt(maxSet)}</span>
              </div>
              <div className="mt-1 h-3 w-full rounded-full bg-slate-100 ring-1 ring-slate-200/70 relative overflow-hidden">
                <div
                  className="absolute h-3 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="mt-2 text-xs text-slate-600">
                <span className="font-medium text-slate-900">{fmt(totalMid)}</span> (geschat midden, incl. fee & escrow)
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-slate-500">{note}</p>
    </div>
  );
}

