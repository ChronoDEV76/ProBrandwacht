"use client"

type FeeVergelijkProps = {
  tarief: number // het uurtarief dat opdrachtgever betaalt (excl. btw)
}

export default function FeeVergelijk({ tarief }: FeeVergelijkProps) {
  const platformFee = tarief * 0.1
  const escrowFee = tarief * 0.01
  const nettoZzp = tarief - platformFee - escrowFee
  const bureauMarge = tarief * 0.35 // aanname 35% marge gemiddeld

  return (
    <div className="mt-6 grid gap-4 md:grid-cols-2">
      {/* ProSafetyMatch kaart */}
      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-brand-700">ProSafetyMatch</h3>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          <li>📌 Uurtarief opdrachtgever: €{tarief.toFixed(2)}</li>
          <li>🔹 Platformfee 10%: €{platformFee.toFixed(2)}</li>
          <li>🔹 Escrow 1%: €{escrowFee.toFixed(2)}</li>
          <li className="font-semibold text-green-700">
            ✅ Netto naar zzp’er: €{nettoZzp.toFixed(2)}
          </li>
        </ul>
      </div>

      {/* Traditioneel bureau kaart */}
      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-red-700">Traditioneel bureau</h3>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          <li>📌 Uurtarief opdrachtgever: €{tarief.toFixed(2)}</li>
          <li>🔸 Gem. bureau-marge 30–50%: ~€{bureauMarge.toFixed(2)}</li>
          <li className="font-semibold text-gray-500">
            ❌ Netto naar zzp’er: €{(tarief - bureauMarge).toFixed(2)}
          </li>
        </ul>
      </div>
    </div>
  )
}

