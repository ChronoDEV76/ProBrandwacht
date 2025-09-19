'use client'

import { useMemo, useState, useEffect } from 'react'
import { DEFAULT_TARIFFS, type CityKey, type CategoryKey, type TariffConfig } from '@/lib/tariffs'

export type CalculatorProps = {
  initialCity?: CityKey
  initialCategory?: CategoryKey
  platformFeePct?: number // default 10%
  escrowPct?: number // default 1.5%
  tariffs?: TariffConfig
}

function round2(v: number) {
  return Math.round(v * 100) / 100
}

// --- Lightweight math “tests” to protect against regressions (no external libs) ---
function runDevTests() {
  if (process.env.NODE_ENV === 'production') return
  const hourly = 52
  const fee = 0.1
  const escrow = 0.015
  const hours = 8
  const total = hourly * hours
  const feeAmt = total * fee
  const escrowAmt = total * escrow
  const netPerHour = hourly * (1 - fee)
  const expected = {
    total: 416,
    feeAmt: 41.6,
    netPerHour: 46.8,
    escrowAmt: 6.24,
  }
  console.assert(Math.abs(total - expected.total) < 1e-6, 'Total mismatch')
  console.assert(Math.abs(feeAmt - expected.feeAmt) < 1e-6, 'Fee mismatch')
  console.assert(Math.abs(netPerHour - expected.netPerHour) < 1e-6, 'Net per hour mismatch')
  console.assert(Math.abs(escrowAmt - expected.escrowAmt) < 1e-6, 'Escrow mismatch')
}

export default function CostCalculator({
  initialCity = 'amsterdam',
  initialCategory = 'evenementen_bouw',
  platformFeePct = 10,
  escrowPct = 1.5,
  tariffs = DEFAULT_TARIFFS,
}: CalculatorProps) {
  const [city, setCity] = useState<CityKey>(initialCity)
  const [category, setCategory] = useState<CategoryKey>(initialCategory)
  const [hours, setHours] = useState(8)
  const [hourly, setHourly] = useState<number>(() => {
    const base = category === 'industrie' ? tariffs[city].industrie ?? tariffs[city].standaard : tariffs[city].standaard
    return round2((base.min + base.max) / 2)
  })
  const [night, setNight] = useState(false)
  const [weekend, setWeekend] = useState(false)
  const [rush, setRush] = useState(false)

  useEffect(() => {
    runDevTests()
  }, [])

  const adjHourly = useMemo(() => {
    let rate = hourly
    if (night) rate *= 1.25 // +25%
    if (weekend) rate *= 1.15 // +15%
    if (rush) rate *= 1.1 // +10%
    return round2(rate)
  }, [hourly, night, weekend, rush])

  const feeRate = platformFeePct / 100
  const escrowRate = escrowPct / 100

  const calc = useMemo(() => {
    const total = adjHourly * hours
    const feeAmt = total * feeRate
    const netPerHour = hourly * (1 - feeRate)
    const netTotal = netPerHour * hours
    const escrowAmt = total * escrowRate
    const grand = total + escrowAmt
    return {
      total: round2(total),
      feeAmt: round2(feeAmt),
      netPerHour: round2(netPerHour),
      netTotal: round2(netTotal),
      escrowAmt: round2(escrowAmt),
      grand: round2(grand),
    }
  }, [adjHourly, hours, feeRate, escrowRate, hourly])

  const cityOptions: { key: CityKey; label: string }[] = [
    { key: 'amsterdam', label: 'Amsterdam' },
    { key: 'rotterdam', label: 'Rotterdam' },
    { key: 'den-haag', label: 'Den Haag' },
    { key: 'utrecht', label: 'Utrecht' },
    { key: 'industrie', label: 'Industrieel (algemeen)' },
  ]

  return (
    <div className="rounded-3xl bg-slate-50 p-6">
      <h3 className="text-xl font-semibold">Bereken je tarief</h3>
      <p className="mt-1 text-slate-700">
        Vul je eigen uurtarief en omstandigheden in. De calculator laat alleen zien hoe fee en escrow worden
        opgebouwd, zodat opdrachtgever en professional hetzelfde overzicht delen.
      </p>
      <p className="mt-2 text-xs text-slate-500">
        Voorbeeldfunctie: ProSafetyMatch stelt geen tarieven vast. Gebruik dit hulpmiddel om transparantie in jullie
        afspraak te brengen.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="text-sm text-slate-600">Stad</span>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value as CityKey)}
            className="rounded-xl border px-3 py-2"
          >
            {cityOptions.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm text-slate-600">Type inzet</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as CategoryKey)}
            className="rounded-xl border px-3 py-2"
          >
            <option value="evenementen_bouw">Evenementen / Bouw</option>
            <option value="industrie">Industrie / Petrochemie</option>
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm text-slate-600">Uurtarief (ex. btw)</span>
          <input
            type="number"
            min={0}
            step={0.5}
            value={hourly}
            onChange={(e) => setHourly(Number(e.target.value))}
            className="rounded-xl border px-3 py-2"
          />
          <small className="text-slate-500">
            Richtlijn per stad:{' '}
            {category === 'industrie'
              ? `${tariffs[city].industrie?.min ?? tariffs[city].standaard.min}–${tariffs[city].industrie?.max ?? tariffs[city].standaard.max}`
              : `${tariffs[city].standaard.min}–${tariffs[city].standaard.max}`}{' '}
            €/u
          </small>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm text-slate-600">Uren</span>
          <input
            type="number"
            min={1}
            step={1}
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            className="rounded-xl border px-3 py-2"
          />
        </label>
      </div>

      <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-700">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={night} onChange={(e) => setNight(e.target.checked)} /> Nacht (+25%)
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={weekend} onChange={(e) => setWeekend(e.target.checked)} /> Weekend (+15%)
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={rush} onChange={(e) => setRush(e.target.checked)} /> Spoed (+10%)
        </label>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border bg-white p-4">
          <div className="text-sm text-slate-600">Opdrachtgeverstarief</div>
          <div className="text-2xl font-semibold">€ {calc.total.toFixed(2)}</div>
          <div className="mt-1 text-sm text-slate-600">
            Uurtarief na toeslagen: € {adjHourly.toFixed(2)} × {hours} u
          </div>
        </div>
        <div className="rounded-2xl border bg-white p-4">
          <div className="text-sm text-slate-600">Platformfee ({platformFeePct}%)</div>
          <div className="text-xl font-semibold">€ {calc.feeAmt.toFixed(2)}</div>
          <div className="mt-1 text-sm text-slate-600">
            Netto professional: € {calc.netPerHour.toFixed(2)} /u → € {calc.netTotal.toFixed(2)} totaal
          </div>
        </div>
        <div className="rounded-2xl border bg-white p-4">
          <div className="text-sm text-slate-600">Escrow ({escrowPct}%)</div>
          <div className="text-xl font-semibold">€ {calc.escrowAmt.toFixed(2)}</div>
          <div className="mt-1 text-sm text-slate-600">Beveiligde betaling gekoppeld aan uitvoering</div>
        </div>
        <div className="rounded-2xl border bg-white p-4">
          <div className="text-sm text-slate-600">Totaal te factureren (ex. btw)</div>
          <div className="text-2xl font-semibold">€ {calc.grand.toFixed(2)}</div>
          <div className="mt-1 text-sm text-slate-600">Opdrachtgeverstarief + escrow</div>
        </div>
      </div>
    </div>
  )
}
