// app/dashboard/requests/[id]/ChatBox.tsx
'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useSearchParams } from 'next/navigation'

type RawMessage = {
  id: string
  created_at: string
  request_id: string
  sender_id: string | null
  sender_name: string | null
  sender_role: 'agent' | 'customer' | 'brandwacht' | 'opdrachtgever' | null
  text?: string | null
  message?: string | null
  content?: string | null
}

type Message = RawMessage & { body: string }

const toBody = (m: Partial<RawMessage>) =>
  (m.text ?? m.message ?? m.content ?? '').toString()

const mapToMessage = (m: RawMessage): Message => ({
  ...m,
  body: toBody(m),
})

export default function ChatBox({ requestId }: { requestId: string }) {
  const params = useSearchParams()
  const rawRole = (params.get('role') || '').toLowerCase()
  const role: 'agent' | 'customer' = rawRole === 'agent' ? 'agent' : 'customer'

  // one anon client, no session persistence for dashboard view
  const supabase = useMemo(
    () =>
      createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        { auth: { persistSession: false } }
      ),
    []
  )

  const [messages, setMessages] = useState<Message[]>([])
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const listRef = useRef<HTMLDivElement>(null)

  // initial load + realtime inserts
  useEffect(() => {
    let cancelled = false

    async function load() {
      if (!requestId) return
      try {
        const res = await fetch(`/api/direct-messages?request_id=${encodeURIComponent(requestId)}`)
        const json = await res.json()
        if (!res.ok || !json?.ok) throw new Error(json?.error || 'fetch_failed')
        if (!cancelled) {
          setMessages((json.messages ?? json.items ?? []).map(mapToMessage))
          setError(null)
        }
      } catch (err: any) {
        if (!cancelled) {
          console.error('[ChatBox] load error', err)
          setError(err?.message ?? 'Kon berichten niet laden')
        }
      } finally {
        if (!cancelled) setLoading(false)
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
          const row = payload.new as RawMessage
          setMessages(prev => [...prev, mapToMessage(row)])
        }
      )
      .subscribe()

    return () => {
      cancelled = true
      supabase.removeChannel(channel)
    }
  }, [requestId, supabase])

  // autoscroll when new message arrives
  useEffect(() => {
    const el = listRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight })
  }, [messages.length])

  async function send() {
    const body = text.trim()
    if (!body || sending) return

    setSending(true)
    try {
      // IMPORTANT: API expects requestId + content + role
      const res = await fetch('/api/direct-messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestId,
          content: body,
          role, // 'agent' | 'customer'
          source: role === 'agent' ? 'brandwacht-dashboard' : 'customer-dashboard',
        }),
      })
      const json = await res.json()
      if (!res.ok || !json?.ok) {
        throw new Error(json?.error || 'send_failed')
      }
      setText('')
    } catch (err: any) {
      console.error('[ChatBox] send error', err)
      alert(err?.message ?? 'Verzenden mislukt')
    } finally {
      setSending(false)
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      void send()
    }
  }

  const roleLabel = role === 'agent' ? 'Brandwacht (agent)' : 'Opdrachtgever (customer)'

  return (
    <div className="rounded-xl bg-gray-100 p-4">
      <h2 className="mb-3 font-medium">Chat met opdrachtgever</h2>

      <div
        ref={listRef}
        className="mb-3 h-64 w-full overflow-y-auto rounded-lg border bg-white p-3 text-sm"
      >
        {loading ? (
          <p className="text-gray-500">Berichten laden…</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : messages.length === 0 ? (
          <p className="text-gray-500">Nog geen berichten.</p>
        ) : (
          messages.map(m => (
            <div key={m.id} className="mb-2">
              <span className="font-medium">
                {m.sender_name || (m.sender_role === 'agent' ? 'Brandwacht' : 'Opdrachtgever')}
              </span>
              : <span className="whitespace-pre-wrap">{m.body}</span>
              <span className="ml-2 text-xs text-gray-400">
                {new Date(m.created_at).toLocaleString('nl-NL')}
              </span>
            </div>
          ))
        )}
      </div>

      <div className="flex gap-2">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Typ een bericht…"
          className="flex-1 rounded-md border bg-white p-2"
        />
        <button
          onClick={send}
          disabled={sending}
          className="rounded-md bg-brand-700 px-4 py-2 text-white hover:bg-brand-600 disabled:opacity-60"
        >
          Verstuur
        </button>
      </div>

      <p className="mt-2 text-xs text-gray-500">
        Je chat als: <strong>{roleLabel}</strong>
      </p>
    </div>
  )
}

