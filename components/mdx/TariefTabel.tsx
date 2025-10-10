// components/mdx/TariefTabel.tsx
"use client";

import * as React from "react";

type Range = { label: string; from: number; to: number; hint?: string };

function formatEUR(v: number) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(v);
}

export default function TariefTabel({
  ranges,
  min = 40,
  max = 80,
  caption = "Richtlijnen per tijdvak (excl. btw)",
  showLegend = true,
}: {
  ranges: Range[];
  min?: number;
  max?: number;
  caption?: string;
  showLegend?: boolean;
}) {
  const clamp = (v: number) => Math.min(Math.max(v, min), max);
  const span = Math.max(max - min, 1);

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900">{caption}</h3>
        <p className="mt-1 text-sm text-slate-600">
          Indicatieve bandbreedtes op basis van cao-logica en zzp-kostprijsmodellen.
          <strong> Geen vaste tarieven</strong> — opdrachtgever en zzp’er bepalen samen.
        </p>
      </div>

      <div className="space-y-6">
        {ranges.map((r) => {
          const from = clamp(r.from);
          const to = clamp(r.to);
          const startPct = ((from - min) / span) * 100;
          const endPct = ((to - min) / span) * 100;
          const widthPct = Math.max(endPct - startPct, 2);
          const mid = (from + to) / 2;
          const midPct = ((mid - min) / span) * 100;

          return (
            <div key={r.label} className="grid gap-3 md:grid-cols-[240px_1fr] items-start">
              <div className="min-w-0">
                <div className="font-medium text-slate-900">{r.label}</div>
                <div className="text-sm text-slate-600">
                  {formatEUR(r.from)} – {formatEUR(r.to)} p/u
                </div>
                {r.hint ? <div className="mt-1 text-xs text-slate-500">{r.hint}</div> : null}
              </div>

              <div className="relative h-10 rounded-xl bg-slate-100 ring-1 ring-slate-200/80 overflow-hidden">
                {/* schaal-ticks */}
                <div className="absolute inset-0 flex">
                  {[0, 25, 50, 75, 100].map((tick) => (
                    <div key={tick} className="h-full border-l border-slate-200/80" style={{ width: "20%" }} aria-hidden />
                  ))}
                </div>
                {/* range-bar */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 h-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 shadow-sm"
                  style={{ left: `${startPct}%`, width: `${widthPct}%` }}
                  aria-hidden
                />
                {/* midpoint marker */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 -ml-2 h-5 w-5 rounded-full bg-white ring-2 ring-blue-600 shadow"
                  style={{ left: `${midPct}%` }}
                  title={`Midden: ${formatEUR(mid)}/u`}
                />
                {/* min/max labels */}
                <div className="absolute inset-x-0 -bottom-6 flex justify-between text-[11px] text-slate-500">
                  <span>{formatEUR(min)}</span>
                  <span>{formatEUR(max)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showLegend && (
        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-slate-600">
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-6 rounded-full bg-blue-600 inline-block" /> Bandbreedte
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-white ring-2 ring-blue-600 inline-block" /> Midden van de range
          </span>
        </div>
      )}

      <p className="mt-6 text-xs text-slate-500">
        Bedragen excl. btw. Ranges variëren per regio/risico. Dit is geen tariefstelling door ProSafetyMatch.
      </p>
    </div>
  );
}
