'use client'

import { useMemo } from 'react'
import cpiData from '@/data/cpi-monthly.json'

type CpiRecord = {
  label: string
  year: number
  month: number
  date: string
  cpiYoY: number | null
  cpiDerivedYoY: number | null
  effect: number | null
}

const WIDTH = 640
const HEIGHT = 260
const MARGIN = { top: 20, right: 16, bottom: 36, left: 48 }

function formatMonth(record: CpiRecord) {
  return `${record.year}-${String(record.month).padStart(2, '0')}`
}

export default function CpiChart() {
  const points = useMemo(() => {
    const records = (cpiData as CpiRecord[]).filter(r => r.cpiYoY != null)
    const lastRecords = records.slice(-60) // laatste 5 jaar
    const values = lastRecords.map((record, idx) => ({
      xIndex: idx,
      date: formatMonth(record),
      value: record.cpiYoY as number,
    }))

    const min = Math.min(...values.map(v => v.value), 0)
    const max = Math.max(...values.map(v => v.value), 0)
    const xSpan = values.length > 1 ? values.length - 1 : 1

    const toX = (idx: number) =>
      MARGIN.left + (idx / xSpan) * (WIDTH - MARGIN.left - MARGIN.right)
    const toY = (value: number) => {
      if (max === min) return HEIGHT / 2
      return (
        HEIGHT - MARGIN.bottom - ((value - min) / (max - min)) * (HEIGHT - MARGIN.top - MARGIN.bottom)
      )
    }

    const path = values
      .map((p, i) => `${i === 0 ? 'M' : 'L'}${toX(p.xIndex)} ${toY(p.value)}`)
      .join(' ')

    const baseline = toY(0)

    const ticks = values
      .filter((_, idx) => idx % 6 === 0)
      .map(p => ({ x: toX(p.xIndex), label: p.date }))

    return { values, path, baseline, ticks, toX, toY, min, max }
  }, [])

  if (!points) return null

  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label="CPI jaarmutaties volgens CBS">
      <defs>
        <linearGradient id="cpi-gradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#1d4ed8" stopOpacity={0.18} />
          <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0.02} />
        </linearGradient>
      </defs>
      <rect x={0} y={0} width={WIDTH} height={HEIGHT} fill="url(#cpi-gradient)" opacity={0.2} />
      <line
        x1={MARGIN.left}
        x2={WIDTH - MARGIN.right}
        y1={points.baseline}
        y2={points.baseline}
        stroke="#94a3b8"
        strokeDasharray="4 4"
      />
      <path d={points.path} fill="none" stroke="#1d4ed8" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
      {points.values.map(p => (
        <circle key={p.date} cx={points.toX(p.xIndex)} cy={points.toY(p.value)} r={2.2} fill="#1d4ed8" />
      ))}
      {points.ticks.map(tick => (
        <g key={tick.label} transform={`translate(${tick.x}, ${HEIGHT - MARGIN.bottom + 16})`}>
          <line y1={-6} y2={-2} stroke="#94a3b8" />
          <text textAnchor="middle" fontSize={10} fill="#475569" dy="0.9em">
            {tick.label}
          </text>
        </g>
      ))}
      <g transform={`translate(${MARGIN.left - 36}, ${MARGIN.top})`}>
        <text transform="rotate(-90)" fontSize={11} fill="#475569">
          Jaarmutatie CPI (%)
        </text>
      </g>
    </svg>
  )
}
