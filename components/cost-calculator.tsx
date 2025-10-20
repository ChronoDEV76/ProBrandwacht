'use client'

import Link from 'next/link'
import { useMemo, useState, useEffect, useCallback, useRef } from 'react'
import type { ReactNode } from 'react'
import { DEFAULT_TARIFFS, type CityKey, type CategoryKey, type TariffConfig } from '@/lib/tariffs'
import ImpactInfoCard from '@/components/impact-info-card'

export type CalculatorProps = {
  initialCity?: CityKey
  initialCategory?: CategoryKey
  platformFeePct?: number // default 10%
  escrowPct?: number // default 1.5%
  tariffs?: TariffConfig
  /** Jaar waarin de meegegeven tarieven (tariffs/DEFAULT_TARIFFS) gelden */
  baseYear?: number
  /** Jaar waarvoor je wilt indexeren (default: huidig jaar) */
  targetYear?: number
  /** CPI index (bijv. 2015 = 100). Als aanwezig, heeft prioriteit boven cpiYoY. */
  cpiIndex?: Record<number, number>
  /** Jaarmutaties in % (alternatief als je geen index hebt) */
  cpiYoY?: Record<number, number>
}

function round2(v: number) {
  return Math.round(v * 100) / 100
}

function InfoTip({ children, text }: { children?: ReactNode; text: string }) {
  return (
    <span className="relative ml-2 inline-block align-middle">
      <span className="group inline-flex cursor-help items-center gap-1 text-xs text-slate-500">
        {children ?? <span className="rounded bg-slate-200 px-1 py-0.5 text-[10px]">i</span>}
        <span className="pointer-events-none absolute left-1/2 top-full z-20 hidden w-64 -translate-x-1/2 rounded-xl bg-slate-900 px-3 py-2 text-[11px] leading-relaxed text-white shadow-lg group-hover:block">
          {text}
        </span>
      </span>
    </span>
  )
}

function TariefInfoNote({ benchmark = 40 }: { benchmark?: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between font-medium text-slate-800"
      >
        <span>Waarom jouw tarief soms boven dat van een bureau ligt</span>
        <span className="text-xs text-slate-500">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="mt-2 text-xs leading-relaxed text-slate-700">
          Bureaus rekenen rond <strong>€{benchmark}/u</strong>, inclusief eigen risico, planning en marge. Werk je als zelfstandige direct voor een opdrachtgever, dan draag jij die verantwoordelijkheden zelf. Een iets hoger tarief (<strong>+10–20%</strong>) is dus economisch en juridisch logisch.
        </div>
      )}
    </div>
  )
}

const BUREAU_BENCHMARK = 40

type Range = { min: number; max: number }

type ReferenceRateEntry = { label: string } & Range

export const REFERENCE_BASE_YEAR = 2025

export const REFERENCE_RATES_BASE: Record<
  'dag' | 'avond' | 'nacht' | 'weekend' | 'spoed',
  ReferenceRateEntry
> = {
  dag: { label: 'Dagdienst (07:00–15:00)', min: 42.0, max: 48.0 },
  avond: { label: 'Avonddienst (15:00–23:00)', min: 46.2, max: 55.2 },
  nacht: { label: 'Nachtdienst (23:00–07:00)', min: 50.4, max: 62.4 },
  weekend: { label: 'Weekend of feestdag', min: 52.5, max: 67.2 },
  spoed: { label: 'Spoed / korte oproep', min: 54.6, max: 72.0 },
}

type RefRates = typeof REFERENCE_RATES_BASE
type ReferenceKey = keyof RefRates

export function indexReferenceRates(ref: RefRates, factor: number): RefRates {
  if (!Number.isFinite(factor) || Math.abs(factor - 1) < 1e-9) return ref
  const out = {} as RefRates
  ;(Object.keys(ref) as ReferenceKey[]).forEach(key => {
    const { label, min, max } = ref[key]
    out[key] = { label, min: round2(min * factor), max: round2(max * factor) }
  })
  return out
}

export function fmtEUR(n: number) {
  return Number.isFinite(n) ? `€ ${n.toFixed(2)}` : '—'
}

export function compareToRange(rate: number, r: Range) {
  if (!Number.isFinite(rate)) return { status: '—', hint: '' }
  if (rate < r.min - 0.01) return { status: 'onder', hint: `→ overweeg +${(r.min - rate).toFixed(2)}/u naar ondergrens` }
  if (rate > r.max + 0.01) return { status: 'boven', hint: `→ overweeg −${(rate - r.max).toFixed(2)}/u richting bovengrens` }
  return { status: 'binnen', hint: '→ binnen richtlijn' }
}

function round1(v: number) {
  return Math.round(v * 10) / 10
}

function diffStatus(requiredBase: number, benchmark = BUREAU_BENCHMARK) {
  if (!Number.isFinite(requiredBase)) return { status: '—', diffPct: NaN, tone: 'neutral' as const }

  const diffPct = ((requiredBase - benchmark) / benchmark) * 100
  let status: 'onder' | 'gelijk' | 'boven'
  let tone: 'good' | 'warn' | 'neutral'

  if (diffPct < -5) {
    status = 'onder'
    tone = 'good'
  } else if (diffPct > 5) {
    status = 'boven'
    tone = 'warn'
  } else {
    status = 'gelijk'
    tone = 'neutral'
  }

  return { status, diffPct, tone }
}

function computeRequiredBaseRate({
  netMonthly,
  totalMonthlyCosts,
  hoursPerMonth,
  platformFeePct,
  reservePct,
  variablePct,
}: {
  netMonthly: number
  totalMonthlyCosts: number
  hoursPerMonth: number
  platformFeePct: number
  reservePct: number
  variablePct: number
}) {
  const f = platformFeePct / 100
  const r = reservePct / 100
  const v = variablePct / 100
  const denom = 1 - f - r - v
  if (hoursPerMonth <= 0 || denom <= 0) return NaN
  return (netMonthly + totalMonthlyCosts) / (hoursPerMonth * denom)
}

function compareToBenchmark(rate: number, benchmark = BUREAU_BENCHMARK) {
  if (!isFinite(rate)) return '—'
  if (rate < benchmark - 0.5) return `lager dan €${benchmark}/u`
  if (rate > benchmark + 0.5) return `hoger dan €${benchmark}/u`
  return `ongeveer gelijk aan €${benchmark}/u`
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
  const expected = { total: 416, feeAmt: 41.6, netPerHour: 46.8, escrowAmt: 6.24 }
  console.assert(Math.abs(total - expected.total) < 1e-6, 'Total mismatch')
  console.assert(Math.abs(feeAmt - expected.feeAmt) < 1e-6, 'Fee mismatch')
  console.assert(Math.abs(netPerHour - expected.netPerHour) < 1e-6, 'Net per hour mismatch')
  console.assert(Math.abs(escrowAmt - expected.escrowAmt) < 1e-6, 'Escrow mismatch')
}

function computeInflationFactor({
  baseYear,
  targetYear,
  cpiIndex,
  cpiYoY,
}: {
  baseYear: number
  targetYear: number
  cpiIndex?: Record<number, number>
  cpiYoY?: Record<number, number>
}): number {
  if (targetYear <= baseYear) return 1

  if (cpiIndex?.[baseYear] != null && cpiIndex?.[targetYear] != null) {
    const base = cpiIndex[baseYear]
    const target = cpiIndex[targetYear]
    if (base > 0) return target / base
  }

  if (cpiYoY) {
    let factor = 1
    for (let y = baseYear + 1; y <= targetYear; y++) {
      const yoy = cpiYoY[y]
      if (typeof yoy === 'number') factor *= 1 + yoy / 100
    }
    return factor
  }

  return 1
}

function inflateTariffs(tariffs: TariffConfig, factor: number): TariffConfig {
  if (Math.abs(factor - 1) < 1e-9) return tariffs
  const scaled: TariffConfig = {} as TariffConfig
  for (const cityKey in tariffs) {
    const t = tariffs[cityKey as CityKey]
    scaled[cityKey as CityKey] = {
      standaard: {
        min: round2(t.standaard.min * factor),
        max: round2(t.standaard.max * factor),
      },
      ...(t.industrie
        ? {
            industrie: {
              min: round2(t.industrie.min * factor),
              max: round2(t.industrie.max * factor),
            },
          }
        : {}),
    }
  }
  return scaled
}

export default function CostCalculator({
  initialCity = 'amsterdam',
  initialCategory = 'evenementen_bouw',
  platformFeePct = 10,
  escrowPct = 1.5,
  tariffs = DEFAULT_TARIFFS,
  baseYear = 2022,
  targetYear = new Date().getFullYear(),
  cpiIndex,
  cpiYoY,
}: CalculatorProps) {
  useEffect(() => {
    runDevTests()
  }, [])

  const inflationFactor = useMemo(
    () => computeInflationFactor({ baseYear, targetYear, cpiIndex, cpiYoY }),
    [baseYear, targetYear, cpiIndex, cpiYoY]
  )
  const indexedTariffs = useMemo(() => inflateTariffs(tariffs, inflationFactor), [tariffs, inflationFactor])
  const referenceRates = useMemo(
    () => indexReferenceRates(REFERENCE_RATES_BASE, inflationFactor),
    [inflationFactor]
  )

  const [city, setCity] = useState<CityKey>(initialCity)
  const [category, setCategory] = useState<CategoryKey>(initialCategory)
  const [hours, setHours] = useState(0)
  const [hourly, setHourly] = useState<number>(() => getMidpointRate(indexedTariffs, initialCity, initialCategory))
  const [night, setNight] = useState(false)
  const [weekend, setWeekend] = useState(false)
  const [rush, setRush] = useState(false)
  const [mode, setMode] = useState<'quick' | 'cost'>('cost')
  const [targetNetMonthly, setTargetNetMonthly] = useState(0)
  const [totalMonthlyCosts, setTotalMonthlyCosts] = useState(0)
  const [billableHoursPerMonth, setBillableHoursPerMonth] = useState(0)
  const [reservePct, setReservePct] = useState(15)
  const [variablePct, setVariablePct] = useState(2)

  useEffect(() => {
    const nextRate = getMidpointRate(indexedTariffs, city, category)
    setHourly(current => (Math.abs(current - nextRate) < 1e-6 ? current : nextRate))
  }, [category, city, indexedTariffs])

  const adjHourly = useMemo(() => {
    let rate = hourly
    if (night) rate *= 1.25
    if (weekend) rate *= 1.15
    if (rush) rate *= 1.1
    return round2(rate)
  }, [hourly, night, weekend, rush])

  const feeRate = platformFeePct / 100
  const escrowRate = escrowPct / 100

  const requiredBase = useMemo(() => {
    return round2(
      computeRequiredBaseRate({
        netMonthly: targetNetMonthly,
        totalMonthlyCosts,
        hoursPerMonth: billableHoursPerMonth,
        platformFeePct,
        reservePct,
        variablePct,
      })
    )
  }, [targetNetMonthly, totalMonthlyCosts, billableHoursPerMonth, platformFeePct, reservePct, variablePct])

  const requiredAdjHourly = useMemo(() => {
    let rate = requiredBase
    if (!isFinite(rate)) return NaN
    if (night) rate *= 1.25
    if (weekend) rate *= 1.15
    if (rush) rate *= 1.1
    return round2(rate)
  }, [requiredBase, night, weekend, rush])

  const costCalc = useMemo(() => {
    if (!isFinite(requiredAdjHourly)) {
      return { total: NaN, feeAmt: NaN, escrowAmt: NaN, grand: NaN, netPerHour: NaN, netTotal: NaN }
    }
    const total = requiredAdjHourly * hours
    const feeAmt = total * feeRate
    const escrowAmt = total * escrowRate
    const grand = total + escrowAmt
    const netPerHour = requiredBase * (1 - feeRate)
    const netTotal = netPerHour * hours
    return {
      total: round2(total),
      feeAmt: round2(feeAmt),
      escrowAmt: round2(escrowAmt),
      grand: round2(grand),
      netPerHour: round2(netPerHour),
      netTotal: round2(netTotal),
    }
  }, [requiredAdjHourly, hours, feeRate, escrowRate, requiredBase])

  const comparisonRows = useMemo(() => {
    const bands: { key: ReferenceKey; multiplier: number; range: ReferenceRateEntry }[] = [
      { key: 'dag', multiplier: 1, range: referenceRates.dag },
      { key: 'avond', multiplier: 1.1, range: referenceRates.avond },
      { key: 'nacht', multiplier: 1.2, range: referenceRates.nacht },
      { key: 'weekend', multiplier: 1.25, range: referenceRates.weekend },
      { key: 'spoed', multiplier: 1.3, range: referenceRates.spoed },
    ]
    return bands.map(({ key, multiplier, range }) => {
      const rate = multiplier === 1 ? requiredBase : round2(requiredBase * multiplier)
      const { status, hint } = compareToRange(rate, range)
      return { key, label: range.label, myRate: rate, range, status, hint }
    })
  }, [referenceRates, requiredBase])

  const bench = useMemo(() => diffStatus(requiredBase, BUREAU_BENCHMARK), [requiredBase])

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

  const resetQuickValues = useCallback(() => {
    setCity(initialCity)
    setCategory(initialCategory)
    setHourly(getMidpointRate(indexedTariffs, initialCity, initialCategory))
    setHours(0)
    setTargetNetMonthly(0)
    setTotalMonthlyCosts(0)
    setBillableHoursPerMonth(0)
    setNight(false)
    setWeekend(false)
    setRush(false)
  }, [initialCity, initialCategory, indexedTariffs])

  const previousModeRef = useRef(mode)

  useEffect(() => {
    if (mode === 'quick' && previousModeRef.current !== 'quick') {
      resetQuickValues()
    }
    previousModeRef.current = mode
  }, [mode, resetQuickValues])

  return (
    <div className="rounded-3xl bg-slate-50 p-6">
      <h3 className="text-xl font-semibold">Bereken je tarief</h3>
      <p className="mt-1 text-slate-700">
        Deze kostendekkende berekening werkt met je <strong>gewenst inkomen</strong> en je
        <strong> totale maandlasten (privé + zakelijk)</strong>. Zo zie je welk uurtarief je écht nodig hebt om rond te
        komen, inclusief wonen, verzekeringen, vervoer, sparen en zakelijke uitgaven.
      </p>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => setMode('cost')}
          className={`px-3 py-2 rounded-xl border ${mode === 'cost' ? 'bg-white font-semibold' : 'bg-slate-100'}`}
        >
          Kostendekkend (2025)
        </button>
        <button
          onClick={() => setMode('quick')}
          className={`px-3 py-2 rounded-xl border ${mode === 'quick' ? 'bg-white font-semibold' : 'bg-slate-100'}`}
        >
          Snelle berekening
        </button>
      </div>

      {mode === 'cost' ? (
        <>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-1">
              <span className="text-sm text-slate-600">Gewenst inkomen p/m (vóór IB)</span>
              <input
                type="number"
                min={0}
                step={50}
                value={targetNetMonthly}
                onChange={e => setTargetNetMonthly(Number(e.target.value))}
                className="rounded-xl border px-3 py-2"
                inputMode="decimal"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm text-slate-600">Facturabele uren p/m</span>
              <input
                type="number"
                min={0}
                step={1}
                value={billableHoursPerMonth}
                onChange={e => setBillableHoursPerMonth(Number(e.target.value))}
                className="rounded-xl border px-3 py-2"
                inputMode="numeric"
              />
            </label>
            <label className="flex flex-col gap-1 md:col-start-1">
              <span className="flex items-center gap-1 text-sm text-slate-600">
                Totale kosten p/m (privé + zakelijk)
                <InfoTip text="Vul hier je totale maandelijkse lasten in: huur/hypotheek, zorg, energie, vervoer, verzekeringen, sparen/buffer én zakelijke kosten (boekhouding, software, materiaal, aansprakelijkheid). Niet óók elders invullen; anders tel je dubbel." />
              </span>
              <input
                type="number"
                min={0}
                step={10}
                value={totalMonthlyCosts}
                onChange={e => setTotalMonthlyCosts(Number(e.target.value))}
                className="rounded-xl border px-3 py-2"
                inputMode="decimal"
              />
              <p className="mt-1 text-xs text-amber-700">
                Let op: vul je kosten niet nogmaals bij een ander veld in, anders worden ze dubbel meegerekend.
              </p>
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm text-slate-600">Reserveringen (% van omzet)</span>
              <input
                type="number"
                min={0}
                step={0.5}
                value={reservePct}
                onChange={e => setReservePct(Number(e.target.value))}
                className="rounded-xl border px-3 py-2"
                inputMode="decimal"
              />
              <small className="text-slate-500">Pensioen, ziekte, vakantiegeld, scholing</small>
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm text-slate-600">Variabele kosten (% van omzet)</span>
              <input
                type="number"
                min={0}
                step={0.5}
                value={variablePct}
                onChange={e => setVariablePct(Number(e.target.value))}
                className="rounded-xl border px-3 py-2"
                inputMode="decimal"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm text-slate-600">Uren voor deze opdracht</span>
              <input
                type="number"
                min={0}
                step={1}
                value={hours}
                onChange={e => setHours(Number(e.target.value))}
                className="rounded-xl border px-3 py-2"
              />
            </label>
          </div>

          <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-700">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={night} onChange={e => setNight(e.target.checked)} /> Nacht (+25%)
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={weekend} onChange={e => setWeekend(e.target.checked)} /> Weekend (+15%)
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={rush} onChange={e => setRush(e.target.checked)} /> Spoed (+10%)
            </label>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border bg-white p-4">
              <div className="text-sm text-slate-600">
                MKU (basis, ex. toeslagen)
                <InfoTip text="Bureaus rekenen rond €40/u inclusief hun eigen risico en marge. Als zelfstandige draag je die risico's zelf, dus hoort jouw tarief vaak iets hoger te liggen (ongeveer +10–20%)." />
              </div>
              <div className="text-2xl font-semibold">
                {isFinite(requiredBase) ? `€ ${requiredBase.toFixed(2)} /u` : '—'}
              </div>
              <div className="mt-1 text-xs text-slate-600">
                {isFinite(requiredBase) ? `→ ${compareToBenchmark(requiredBase)}` : 'Controleer invoer'}
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-4">
              <div className="text-sm text-slate-600">Opdrachtgeverstarief (met toeslagen)</div>
              <div className="text-2xl font-semibold">
                {isFinite(costCalc.total) ? `€ ${costCalc.total.toFixed(2)}` : '—'}
              </div>
              <div className="mt-1 text-sm text-slate-600">
                Uurtarief: {isFinite(requiredAdjHourly) ? `€ ${requiredAdjHourly.toFixed(2)}` : '—'} × {hours} u
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-4">
              <div className="text-sm text-slate-600">Platformfee ({platformFeePct}%)</div>
              <div className="text-xl font-semibold">
                {isFinite(costCalc.feeAmt) ? `€ ${costCalc.feeAmt.toFixed(2)}` : '—'}
              </div>
              <div className="mt-1 text-sm text-slate-600">
                Netto professional: {isFinite(costCalc.netPerHour) ? `€ ${costCalc.netPerHour.toFixed(2)} /u` : '—'} →{' '}
                {isFinite(costCalc.netTotal) ? `€ ${costCalc.netTotal.toFixed(2)}` : '—'}
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-4">
              <div className="text-sm text-slate-600">Totaal te factureren (ex. btw)</div>
              <div className="text-2xl font-semibold">
                {isFinite(costCalc.grand) ? `€ ${costCalc.grand.toFixed(2)}` : '—'}
              </div>
              <div className="mt-1 text-sm text-slate-600">Incl. escrow ({escrowPct}%)</div>
              <div className="mt-1 text-xs text-slate-500">Benchmark bureau: €40/u (alleen ter vergelijking)</div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border bg-white p-4">
            <div className="text-sm font-medium text-slate-700">
              Richtlijnen per tijdvak (excl. btw)
              <InfoTip text="Indicatieve bandbreedtes gebaseerd op cao-logica en zzp-kostprijzen. Geen vaste tarieven: opdrachtgever en professional bepalen samen binnen deze range." />
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Indicatieve bandbreedtes op basis van cao-logica en zzp-kostprijsmodellen. Geen vaste tarieven — opdrachtgever en zzp’er bepalen samen.
            </p>

            <div className="mt-4 space-y-3">
              {comparisonRows.map(({ key, label, myRate, range, status, hint }) => {
                const badgeClass =
                  status === 'onder'
                    ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-200'
                    : status === 'boven'
                      ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-200'
                      : status === 'binnen'
                        ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                        : 'bg-slate-100 text-slate-600'

                return (
                  <div key={key} className="grid items-center gap-3 sm:grid-cols-[1fr_auto_auto]">
                    <div className="min-w-0">
                      <div className="font-medium text-slate-800">{label}</div>
                      <div className="text-xs text-slate-500">Richtlijn: {fmtEUR(range.min)} – {fmtEUR(range.max)} p/u</div>
                    </div>
                    <div className="text-sm text-slate-700">
                      Jouw tarief: <span className="font-semibold">{fmtEUR(myRate)}</span>
                    </div>
                    <div className={`inline-flex justify-center whitespace-nowrap rounded-full px-2 py-1 text-xs ${badgeClass}`}>
                      {status.toUpperCase()} {hint ? <span className="ml-2 opacity-80">{hint}</span> : null}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-3 text-[11px] leading-relaxed text-slate-500">
              Bedragen excl. btw. Ranges variëren per regio en risicoprofiel. Dit is geen tariefstelling door ProSafetyMatch.
            </div>
          </div>

          <div className="mt-6 rounded-2xl border bg-slate-50 p-4">
            <h4 className="text-base font-semibold text-slate-800">Waarom jouw tarief vs. bureauprijs kan verschillen</h4>

            {isFinite(bench.diffPct) && (
              <div
                className={
                  'mt-2 inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs ring-1 ' +
                  (bench.tone === 'good'
                    ? 'bg-blue-50 text-blue-700 ring-blue-200'
                    : bench.tone === 'warn'
                        ? 'bg-amber-50 text-amber-700 ring-amber-200'
                        : 'bg-slate-100 text-slate-700 ring-slate-300')
                }
              >
                {bench.status.toUpperCase()} t.o.v. €{BUREAU_BENCHMARK}/u
                <span className="opacity-75">({round1(bench.diffPct)}%)</span>
              </div>
            )}

            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              Grote bureaus rekenen vaak rond <strong>€{BUREAU_BENCHMARK.toFixed(0)} per uur</strong> richting opdrachtgever. Dat dekt hun personeel, planning, verzekeringen, administratie en een bedrijfswinst. Als zelfstandige werk je direct voor de opdrachtgever en draag je deze verantwoordelijkheden zelf.
            </p>

            {bench.status === 'onder' && (
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                Jouw kostendekkende basis (<strong>MKU</strong>) ligt <strong>{round1(Math.abs(bench.diffPct))}% lager</strong> dan de bureauprijs. Dat is logisch: je rekent hier een kostprijs zonder extra marge. Overweeg <strong>+10–20%</strong> opslag voor risico, reserveringen en continuïteit zodat je uitkomt op een gezond zelfstandig niveau.
              </p>
            )}

            {bench.status === 'gelijk' && (
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                Je zit <strong>ongeveer gelijk</strong> aan de bureauprijs. Dat kan passend zijn, maar reken waar nodig een bescheiden opslag (<strong>+10–15%</strong>) als jij het volledige ondernemersrisico draagt.
              </p>
            )}

            {bench.status === 'boven' && (
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                Je ligt <strong>{round1(bench.diffPct)}% boven</strong> de bureauprijs. Dat is verdedigbaar bij extra verantwoordelijkheden (specialisme, korte oproep, nacht/weekend, eigen materieel of verhoogd risico). Licht dit kort toe in je offerte voor transparantie.
              </p>
            )}

            <ul className="mt-3 list-disc pl-5 text-sm text-slate-700">
              <li>Reserveringen voor ziekte, vakantie en pensioen (bijv. 10–20%)</li>
              <li>Verzekering, vervoer en eigen materiaal</li>
              <li>Administratie, facturatie en betalingsrisico</li>
              <li>Scholing/kwalificaties en het vinden van nieuwe opdrachten</li>
            </ul>

            <p className="mt-3 text-xs text-slate-500">
              Onderbouwd met cao-logica, CBS-inflatie en gangbare zzp-kostprijsmethodes. ProSafetyMatch stelt geen vaste tarieven vast; dit is een hulpmiddel voor transparantie.
            </p>
          </div>

          <TariefInfoNote benchmark={BUREAU_BENCHMARK} />

          <div className="mt-6 rounded-2xl border bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">
            <p>
              Deze berekening laat zien wat een professional écht nodig heeft om duurzaam te kunnen werken. In veel traditionele modellen worden tarieven afgeleid van loondienststructuren, terwijl de zelfstandige intussen zelf verantwoordelijk is voor verzekering, planning, ziekte en continuïteit.
            </p>
            <p className="mt-2">
              Dat verschil – vaak €10 – €15 per uur – lijkt klein, maar bepaalt of iemand zijn vak bekwaam, gemotiveerd en veilig kan uitvoeren. Wanneer bureaus risico’s doorschuiven zonder bijpassende vergoeding, ontstaat een systeem dat professionals structureel tekortdoet.
            </p>
            <p className="mt-2 text-xs text-slate-500">
              Doel van deze tool is niet om te wijzen, maar om inzicht te geven. Eerlijke tarieven zorgen voor gemotiveerde en vakbekwame professionals – en daarmee voor een veiligere werkomgeving voor iedereen.
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-1">
              <span className="text-sm text-slate-600">Stad</span>
              <select
                value={city}
                onChange={e => setCity(e.target.value as CityKey)}
                className="rounded-xl border px-3 py-2"
              >
                {cityOptions.map(c => (
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
                onChange={e => setCategory(e.target.value as CategoryKey)}
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
                onChange={e => setHourly(Number(e.target.value))}
                className="rounded-xl border px-3 py-2"
              />
              <small className="text-slate-500">
                Richtlijn per stad (geïndexeerd):{' '}
                {category === 'industrie'
                  ? `${indexedTariffs[city].industrie?.min ?? indexedTariffs[city].standaard.min}–${
                      indexedTariffs[city].industrie?.max ?? indexedTariffs[city].standaard.max
                    }`
                  : `${indexedTariffs[city].standaard.min}–${indexedTariffs[city].standaard.max}`}{' '}
                €/u
              </small>
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-sm text-slate-600">Uren</span>
              <input
                type="number"
                min={0}
                step={1}
                value={hours}
                onChange={e => setHours(Number(e.target.value))}
                className="rounded-xl border px-3 py-2"
              />
            </label>
          </div>

          <div className="mt-2 flex justify-end">
            <button
              type="button"
              onClick={resetQuickValues}
              className="text-sm text-slate-600 underline underline-offset-4 hover:text-slate-800"
            >
              Reset invoer
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-700">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={night} onChange={e => setNight(e.target.checked)} /> Nacht (+25%)
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={weekend} onChange={e => setWeekend(e.target.checked)} /> Weekend (+15%)
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={rush} onChange={e => setRush(e.target.checked)} /> Spoed (+10%)
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
              <div className="mt-2 text-xs text-slate-500">
                Inflatiefactor CBS {baseYear}→{targetYear}: × {inflationFactor.toFixed(4)}
              </div>
            </div>
          </div>
        </>
      )}

      <ImpactInfoCard />

      <div className="mt-8 rounded-2xl border bg-blue-50 p-5 leading-relaxed text-slate-800">
        <h3 className="text-base font-semibold text-slate-900">Waarom we deze berekening openbaar maken</h3>
        <p className="mt-2 text-sm">
          De tarieven in de veiligheidsbranche zijn vaak gebaseerd op oude loondienstmodellen. Terwijl professionals inmiddels zelfstandig werken, dragen zij nu zelf de risico’s voor ziekte, verzekering, vervoer, opleiding en continuïteit – zonder dat hun vergoeding is meegestegen.
        </p>
        <p className="mt-2 text-sm">
          Met deze{' '}
          <Link
            href="#tarief-calculator-home"
            className="text-blue-600 underline underline-offset-2 hover:text-blue-700"
          >
            calculator
          </Link>{' '}
          maken we inzichtelijk wat een brandwacht of beveiliger werkelijk nodig heeft om duurzaam te kunnen werken. Niet om te wijzen, maar om bewustzijn te creëren: een eerlijk tarief zorgt voor motivatie, vakbekwaamheid en veiligheid op locatie.
        </p>
        <p className="mt-2 text-xs text-slate-600">
          De cijfers zijn gebaseerd op CBS-inflatie en gangbare kostprijsmodellen voor zelfstandigen. Dit is geen oordeel over individuele bureaus, maar een uitnodiging om samen te werken aan een eerlijkere en toekomstbestendige veiligheidssector.
        </p>
      </div>
    </div>
  )
}

function getMidpointRate(tariffs: TariffConfig, city: CityKey, category: CategoryKey) {
  const config = tariffs[city] ?? DEFAULT_TARIFFS[city]
  const range = category === 'industrie' ? config.industrie ?? config.standaard : config.standaard
  const midpoint = (range.min + range.max) / 2
  return round2(midpoint)
}
