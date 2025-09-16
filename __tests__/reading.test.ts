import { describe, it, expect } from 'vitest'
import { readingTime, formatReadingTime } from '@/lib/blog'

function makeText(words: number): string {
  return Array.from({ length: words }, (_, i) => `w${i + 1}`).join(' ')
}

describe('readingTime', () => {
  it('returns minimum 1 minute for empty text', () => {
    const { minutes, words } = readingTime('')
    expect(words).toBe(0)
    expect(minutes).toBe(1)
  })

  it('uses default WPM when not provided (clamped)', () => {
    const { minutes } = readingTime(makeText(225), 225)
    expect(minutes).toBe(1)
  })

  it('rounds up minutes', () => {
    const { minutes } = readingTime(makeText(226), 225)
    expect(minutes).toBe(2)
  })
})

describe('formatReadingTime', () => {
  it('formats Dutch label', () => {
    expect(formatReadingTime(1, 'nl-NL')).toBe('1 min leestijd')
    expect(formatReadingTime(3, 'nl')).toBe('3 min leestijd')
  })

  it('formats English fallback', () => {
    expect(formatReadingTime(2, 'en-US')).toBe('2 min read')
  })
})
