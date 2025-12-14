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
    <div className="mt-6 grid gap-6 md:grid-cols-2">
      {/* ProSafetyMatch kaart */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900">
          ProSafetyMatch
        </h3>

        <ul className="mt-4 space-y-2 text-sm text-gray-700">
          <li>
            <span className="text-gray-500">Uurtarief opdrachtgever:</span>{" "}
            <span className="font-medium">€{tarief.toFixed(2)}</span>
          </li>
          <li>
            <span className="text-gray-500">Platformfee (10%):</span>{" "}
            €{platformFee.toFixed(2)}
          </li>
          <li>
            <span className="text-gray-500">
              Betaalbuffer (1–2% bij lancering):
            </span>{" "}
            €{betaalbufferMin.toFixed(2)} – €{betaalbufferMax.toFixed(2)}
          </li>
          <li className="pt-2 font-semibold text-emerald-600">
            Netto naar zzp’er: €{nettoMin.toFixed(2)} – €{nettoMax.toFixed(2)}
          </li>
        </ul>
      </div>

      {/* Traditioneel bureau kaart */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900">
          Traditioneel bureau
        </h3>

        <ul className="mt-4 space-y-2 text-sm text-gray-700">
          <li>
            <span className="text-gray-500">Uurtarief opdrachtgever:</span>{" "}
            <span className="font-medium">€{tarief.toFixed(2)}</span>
          </li>
          <li>
            <span className="text-gray-500">
              Gemiddelde bureau-marge (30–50%):
            </span>{" "}
            ± €{bureauMarge.toFixed(2)}
          </li>
          <li className="pt-2 font-semibold text-gray-900">
            Netto naar zzp’er: €{(tarief - bureauMarge).toFixed(2)}
          </li>
        </ul>
      </div>
    </div>
  )
}

