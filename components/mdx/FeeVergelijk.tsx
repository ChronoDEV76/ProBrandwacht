"use client"

type FeeVergelijkProps = {
  tarief: number // uurtarief dat de opdrachtgever betaalt (excl. btw)
}

export default function FeeVergelijk({ tarief }: FeeVergelijkProps) {
  const platformFee = tarief * 0.1
  const betaalbufferMin = tarief * 0.01
  const betaalbufferMax = tarief * 0.02
  const nettoMin = tarief - platformFee - betaalbufferMax
  const nettoMax = tarief - platformFee - betaalbufferMin
  const bureauMarge = tarief * 0.35 // aanname 35% marge gemiddeld

  return (
    <div className="mt-6 grid gap-4 md:grid-cols-2">
      {/* ProSafetyMatch kaart */}
      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-brand-700">ProSafetyMatch</h3>
        <ul className="mt-3 space-y-2 text-sm text-slate-900">
          <li>📌 Uurtarief opdrachtgever: €{tarief.toFixed(2)}</li>
          <li>🔹 Platformfee 10%: €{platformFee.toFixed(2)}</li>
          <li>
            🔹 Betaalbuffer 1–2% (bij lancering): €{betaalbufferMin.toFixed(2)}–€{betaalbufferMax.toFixed(2)}
          </li>
          <li className="font-semibold text-green-700">
            ✅ Netto naar zzp’er: €{nettoMin.toFixed(2)}–€{nettoMax.toFixed(2)}
          </li>
        </ul>
      </div>

      {/* Traditioneel bureau kaart */}
      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-red-700">Traditioneel bureau</h3>
        <ul className="mt-3 space-y-2 text-sm text-slate-900">
          <li>📌 Uurtarief opdrachtgever: €{tarief.toFixed(2)}</li>
          <li>🔸 Gem. bureau-marge 30–50%: ~€{bureauMarge.toFixed(2)}</li>
          <li className="font-semibold text-slate-900">
            ❌ Netto naar zzp’er: €{(tarief - bureauMarge).toFixed(2)}
          </li>
        </ul>
      </div>
    </div>
  )
}
