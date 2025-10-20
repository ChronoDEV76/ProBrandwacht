import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import type { ComponentProps, ReactNode } from 'react'

import CostCalculator from '@/components/cost-calculator'
import { DEFAULT_TARIFFS } from '@/lib/tariffs'

// Mock next/link to avoid Next.js routing in tests
vi.mock('next/link', () => {
  type AnchorProps = ComponentProps<'a'> & { children: ReactNode }
  return {
    default: ({ href, children, ...props }: AnchorProps) => (
      <a href={href ?? undefined} {...props}>
        {children}
      </a>
    ),
  }
})

describe('CostCalculator quick/live mode resets', () => {
  const defaultMidpoint =
    (DEFAULT_TARIFFS.amsterdam.standaard.min + DEFAULT_TARIFFS.amsterdam.standaard.max) / 2

  it('resets to defaults when switching to quick mode', async () => {
    render(<CostCalculator />)

    const hoursInput = screen.getByLabelText('Uren voor deze opdracht') as HTMLInputElement
    fireEvent.change(hoursInput, { target: { value: '16' } })

    const nightToggle = screen.getByLabelText('Nacht (+25%)') as HTMLInputElement
    fireEvent.click(nightToggle)
    expect(nightToggle).toBeChecked()

    fireEvent.click(screen.getByRole('button', { name: 'Snelle berekening' }))

    const quickHours = (await screen.findByLabelText('Uren')) as HTMLInputElement
    expect(quickHours.value).toBe('0')

    const quickNight = screen.getByLabelText('Nacht (+25%)') as HTMLInputElement
    expect(quickNight.checked).toBe(false)

    const citySelect = screen.getByLabelText('Stad') as HTMLSelectElement
    expect(citySelect.value).toBe('amsterdam')

    const categorySelect = screen.getByLabelText('Type inzet') as HTMLSelectElement
    expect(categorySelect.value).toBe('evenementen_bouw')

    const hourlyInput = screen.getByLabelText(/Uurtarief/i) as HTMLInputElement
    expect(parseFloat(hourlyInput.value)).toBeCloseTo(defaultMidpoint, 2)
  })

  it('allows manual reset while staying in quick mode', async () => {
    render(<CostCalculator />)
    fireEvent.click(screen.getByRole('button', { name: 'Snelle berekening' }))
    await screen.findByLabelText('Stad')

    const citySelect = screen.getByLabelText('Stad') as HTMLSelectElement
    fireEvent.change(citySelect, { target: { value: 'rotterdam' } })

    const quickHours = screen.getByLabelText('Uren') as HTMLInputElement
    fireEvent.change(quickHours, { target: { value: '12' } })

    const rushToggle = screen.getByLabelText('Spoed (+10%)') as HTMLInputElement
    fireEvent.click(rushToggle)
    expect(rushToggle).toBeChecked()

    const hourlyInput = screen.getByLabelText(/Uurtarief/i) as HTMLInputElement
    fireEvent.change(hourlyInput, { target: { value: '60' } })
    expect(hourlyInput.value).toBe('60')

    fireEvent.click(screen.getByRole('button', { name: 'Reset invoer' }))

    const resetCity = screen.getByLabelText('Stad') as HTMLSelectElement
    expect(resetCity.value).toBe('amsterdam')

    const resetHours = screen.getByLabelText('Uren') as HTMLInputElement
    expect(resetHours.value).toBe('0')

    const resetRush = screen.getByLabelText('Spoed (+10%)') as HTMLInputElement
    expect(resetRush.checked).toBe(false)

    const resetHourly = screen.getByLabelText(/Uurtarief/i) as HTMLInputElement
    expect(parseFloat(resetHourly.value)).toBeCloseTo(defaultMidpoint, 2)
  })
})
