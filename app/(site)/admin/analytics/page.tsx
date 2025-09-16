'use client'
import { useEffect, useState } from 'react'

type ShareEvent = {
  ts: number
  event: string
  platform: string
  url: string
}

export default function AnalyticsDebugPage() {
  const [events, setEvents] = useState<ShareEvent[]>([])

  useEffect(() => {
    const w = window as any
    w.__shareEvents = w.__shareEvents || []
    setEvents([...w.__shareEvents])

    const id = setInterval(() => {
      setEvents([...w.__shareEvents])
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Share events (session)</h1>
      {events.length === 0 ? (
        <p className="text-sm text-slate-600">Nog geen share events in deze sessie.</p>
      ) : (
        <table className="w-full text-sm border">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left p-2 border-b">Tijd</th>
              <th className="text-left p-2 border-b">Platform</th>
              <th className="text-left p-2 border-b">URL</th>
            </tr>
          </thead>
          <tbody>
            {events
              .slice()
              .reverse()
              .map((e, i) => (
                <tr key={i} className="odd:bg-white even:bg-slate-50">
                  <td className="p-2 border-b">
                    {new Date(e.ts).toLocaleTimeString('nl-NL', {
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    })}
                  </td>
                  <td className="p-2 border-b">{e.platform}</td>
                  <td className="p-2 border-b max-w-[0] overflow-hidden text-ellipsis">
                    <a className="underline" href={e.url} target="_blank" rel="noopener noreferrer">
                      {e.url}
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
      <p className="text-xs text-slate-500">
        Deze lijst toont alleen share_click events die in deze browsersessie zijn geregistreerd.
        Voor volledige analytics gebruik Google Tag Manager of GA4.
      </p>
    </section>
  )
}
