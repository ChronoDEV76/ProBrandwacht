'use client'

import { useEffect, useRef, useState } from 'react'
import { supabaseBrowser } from '@/lib/supabaseBrowser'

type RawMessage = {
  id: string
  request_id: string
  sender_id: string | null
  sender_name: string | null
  sender_role: 'zelfstandige brandwacht' | 'opdrachtgever in transparante samenwerking' | 'admin' | null
  text?: string | null
  message?: string | null
  content?: string | null
  created_at: string
}

type Message = RawMessage & { body: string }

const mapToMessage = (msg: RawMessage): Message => ({
  ...msg,
  body: msg.text ?? msg.message ?? msg.content ?? '',
})

export default function ChatPanel({
  requestId,
  viewerName,
  viewerRole = 'zelfstandige brandwacht',
  viewerId,
}: {
  requestId: string
  viewerName: string
  viewerRole?: 'zelfstandige brandwacht' | 'opdrachtgever in transparante samenwerking' | 'admin'
  viewerId?: string
}) {
  const supabase = supabaseBrowser()
  const [messages, setMessages] = useState<Message[]>([])
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  // initial load + realtime subscribe
  useEffect(() => {
    let isMounted = true

    async function load() {
      try {
        const res = await fetch(
          `/api/direct-messages?request_id=${encodeURIComponent(requestId)}`
        )
        const json = await res.json().catch(() => ({ ok: false }))

        if (!json?.ok) {
          console.error('[ChatPanel] load error', json?.error)
          return
        }

        if (isMounted && Array.isArray(json.messages)) {
          setMessages(json.messages.map(mapToMessage))
        }
      } catch (err) {
        console.error('[ChatPanel] load exception', err)
      }
    }

    void load()

    const channel = supabase
      .channel(`dm:${requestId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'direct_messages',
          filter: `request_id=eq.${requestId}`,
        },
        payload => {
          setMessages(prev => [...prev, mapToMessage(payload.new as RawMessage)])
        }
      )
      .subscribe()

    return () => {
      isMounted = false
      supabase.removeChannel(channel)
    }
  }, [requestId, supabase])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function send() {
    const content = text.trim()
    if (!content) return
    setText('')

    setSending(true)
    try {
      const res = await fetch('/api/direct-messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          request_id: requestId,
          text: content,
          sender_id: viewerId ?? 'zelfstandige-brandwacht-panel',
          sender_name: viewerName,
          source: 'zelfstandige-brandwacht-dashboard',
        }),
      })

      const json = await res.json().catch(() => ({ ok: false }))
      console.log('[ChatPanel] send response', json)

      if (!json?.ok) {
        alert('Bericht versturen mislukt: ' + (json?.error ?? 'onbekende fout'))
        setText(content) // herstel tekst zodat gebruiker opnieuw kan proberen
      }
    } catch (err) {
      console.error('[ChatPanel] send exception', err)
      alert('Bericht versturen mislukt: netwerkfout')
      setText(content)
    } finally {
      setSending(false)
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      void send()
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-3">
        <h3 className="text-sm font-semibold text-slate-900">
          Chat met opdrachtgever in transparante samenwerking
        </h3>
        <p className="text-xs text-slate-500">
          Je reageert als <span className="font-medium">{viewerName}</span> ({viewerRole})
        </p>
      </div>

      <div className="h-72 overflow-y-auto p-4 space-y-3 bg-slate-50">
        {messages.length === 0 && (
          <p className="text-sm text-slate-500">Nog geen berichten…</p>
        )}

        {messages.map(m => (
          <div key={m.id} className="flex flex-col gap-1">
            <span className="text-xs text-slate-500">
              {m.sender_name ?? 'Onbekend'} ·{' '}
              {new Date(m.created_at).toLocaleString('nl-NL', {
                dateStyle: 'short',
                timeStyle: 'short',
              })}
            </span>
            <div className="max-w-[85%] rounded-lg bg-white p-2 text-sm shadow">
              {m.body}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex gap-2 border-t border-slate-200 p-3">
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={onKeyDown}
          rows={2}
          placeholder="Typ een bericht… (Enter om te versturen)"
          className="flex-1 resize-none rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
        />
        <button
          onClick={send}
          disabled={sending}
          className="whitespace-nowrap rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-60"
        >
          Versturen
        </button>
      </div>
    </div>
  )
}
