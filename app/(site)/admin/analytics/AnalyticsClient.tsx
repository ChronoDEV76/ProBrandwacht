'use client'

import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { ShareEvent } from '@/components/share-bar'

type ShareWindow = Window & {
  __shareEvents?: ShareEvent[]
}

type AnalyticsClientProps = {
  heading?: ReactNode
}

export default function AnalyticsClient({ heading }: AnalyticsClientProps) {
  const [events, setEvents] = useState<ShareEvent[]>([])

  useEffect(() => {
    const shareWindow = window as ShareWindow
    shareWindow.__shareEvents = shareWindow.__shareEvents || []
    setEvents([...shareWindow.__shareEvents])

    const id = setInterval(() => {
      const eventsForSession = shareWindow.__shareEvents ?? []
      setEvents([...eventsForSession])
    }, 1000)

    return () => clearInterval(id)
  }, [])

  return (
    <section className="space-y-4">
      {(heading ?? <h1 className="text-2xl font-semibold text-white">Share events (session)</h1>)}
      {events.length === 0 ? (
        <p className="text-sm text-slate-400">Nog geen share events in deze sessie.</p>
      ) : (
        <table className="w-full text-sm border border-white/10">
          <thead className="bg-slate-900/70 text-slate-200">
            <tr>
              <th className="border-b p-2 text-left">Tijd</th>
              <th className="border-b p-2 text-left">Platform</th>
              <th className="border-b p-2 text-left">URL</th>
            </tr>
          </thead>
          <tbody>
            {events
              .slice()
              .reverse()
              .map((event, index) => (
                <tr key={index} className="odd:bg-slate-900/70 even:bg-slate-900/50">
                  <td className="border-b border-white/10 p-2 text-slate-200">
                    {new Date(event.ts).toLocaleTimeString('nl-NL', {
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    })}
                  </td>
                  <td className="border-b border-white/10 p-2 text-slate-200">{event.platform}</td>
                  <td className="border-b border-white/10 p-2">
                    <a
                      className="max-w-[0] overflow-hidden text-ellipsis underline text-slate-200"
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {event.url}
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
      <p className="text-xs text-slate-400">
        Deze lijst toont alleen share_click events die in deze browsersessie zijn geregistreerd.
        Voor volledige analytics gebruik Google Tag Manager of GA4.
      </p>
    </section>
  )
}
