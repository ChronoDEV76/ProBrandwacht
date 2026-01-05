#!/usr/bin/env node
import fs from 'node:fs'

const SOURCE = 'data/cpi-monthly.csv'
const TARGET = 'data/cpi-monthly.json'

const monthMap = {
  januari: '01',
  februari: '02',
  maart: '03',
  april: '04',
  mei: '05',
  juni: '06',
  juli: '07',
  augustus: '08',
  september: '09',
  oktober: '10',
  november: '11',
  december: '12',
}

function parseNumber(value) {
  if (!value) return null
  const normalized = value.replace(/\s+/g, '').replace('%', '').replace(',', '.')
  const parsed = Number(normalized)
  return Number.isFinite(parsed) ? parsed : null
}

function main() {
  const raw = fs.readFileSync(SOURCE, 'utf8').replace(/\r\n/g, '\n').trim()
  const [headerLine, ...rows] = raw.split('\n')
  const header = headerLine.replace(/^\uFEFF/, '').split(';')
  const [monthKey, cpiKey, derivedKey, effectKey] = header

  const parsed = rows
    .map(row => row.split(';'))
    .filter(cols => cols.length >= 4)
    .map(([monthLabel, cpi, derived, effect]) => {
      const [monthName, yearStr] = monthLabel.split(' ')
      const year = Number(yearStr)
      const monthNum = monthMap[monthName.toLowerCase()]
      if (!year || !monthNum) return null
      return {
        label: monthLabel,
        year,
        month: Number(monthNum),
        date: `${year}-${monthNum}`,
        cpiYoY: parseNumber(cpi),
        cpiDerivedYoY: parseNumber(derived),
        effect: parseNumber(effect),
      }
    })
    .filter(Boolean)

  fs.writeFileSync(TARGET, JSON.stringify(parsed, null, 2))
  console.log(`Written ${parsed.length} records to ${TARGET}`)
}

main()
