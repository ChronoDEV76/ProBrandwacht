// components/ChatBox.tsx
'use client';

import * as React from 'react'

type Viewer = 'agent' | 'customer';

type DirectMessage = {
  id: string;
  request_id: string;
  sender_id: string | null;
  sender_name: string | null;
  sender_role: 'agent' | 'customer' | null;
  text: string | null;
  created_at: string; // timestamptz
};

type Props = {
  requestId: string;
  /** Wie typt in deze view? 'agent' (brandwacht) of 'customer' (opdrachtgever) */
  viewer: Viewer;
  className?: string;
};

export default function ChatBox({ requestId, viewer, className }: Props) {
  const [input, setInput] = React.useState('')
  const [sending, setSending] = React.useState(false)
  const [messages, setMessages] = React.useState<DirectMessage[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const listRef = React.useRef<HTMLDivElement>(null)

  const loadMessages = React.useCallback(async () => {
    if (!requestId) return
    try {
      const res = await fetch(`/api/direct-messages?requestId=${encodeURIComponent(requestId)}`)
      const json = await res.json()
      if (!res.ok || !json?.ok) {
        throw new Error(json?.error || 'fetch_failed')
      }
      setMessages(json.messages ?? [])
      setError(null)
    } catch (err: any) {
      console.error('[ChatBox] load error', err)
      setError(err?.message ?? 'Kon berichten niet laden')
    } finally {
      setLoading(false)
    }
  }, [requestId])

  React.useEffect(() => {
    setLoading(true)
    void loadMessages()
    const timer = setInterval(loadMessages, 4000)
    return () => clearInterval(timer)
  }, [loadMessages])

  // Scroll naar de onderkant bij nieuwe berichten
  React.useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages.length])

  async function sendMessage() {
    const text = input.trim()
    if (!text || sending) return

    setSending(true)

    const optimistic: DirectMessage = {
      id: `optimistic-${Date.now()}`,
      request_id: requestId,
      sender_id: viewer === 'agent' ? 'agent' : 'customer',
      sender_name: viewer === 'agent' ? 'Brandwacht' : 'Opdrachtgever',
      sender_role: viewer,
      text,
      created_at: new Date().toISOString(),
    }

    setMessages(prev => [...prev, optimistic])

    try {
      const res = await fetch('/api/direct-messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ request_id: requestId, text, viewer }),
      })
      const json = await res.json()
      if (!res.ok || !json?.ok) {
        throw new Error(json?.error || 'send_failed')
      }
      await loadMessages()
      setInput('')
    } catch (err) {
      console.error('[chat] send error:', err)
      setMessages(prev => prev.filter(m => !m.id.startsWith('optimistic-')))
      alert('Verzenden mislukt')
    } finally {
      setSending(false)
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    // Enter = verzenden, Shift+Enter = nieuwe regel
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void sendMessage();
    }
  }

  const fmt = (iso?: string) => {
    if (!iso) return '';
    try {
      return new Intl.DateTimeFormat('nl-NL', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
      }).format(new Date(iso));
    } catch {
      return iso;
    }
  };

  return (
    <div className={className}>
      <div className="rounded-xl bg-gray-100 p-4">
        <h2 className="mb-3 font-medium">Chat met opdrachtgever</h2>

        <div
          ref={listRef}
          className="mb-3 h-64 w-full overflow-y-auto rounded-md border bg-white p-3 text-sm"
          aria-live="polite"
        >
          {loading ? (
            <p className="text-gray-500">Berichten laden…</p>
          ) : error ? (
            <p className="text-red-600">Kon berichten niet laden.</p>
          ) : messages.length === 0 ? (
            <p className="text-gray-500">Nog geen berichten.</p>
          ) : (
            <ul className="space-y-3">
              {messages.map(m => (
                <li key={m.id} className="leading-snug">
                  <div className="flex items-baseline gap-2">
                    <span className="font-medium">
                      {m.sender_name ?? (m.sender_role === 'agent' ? 'Brandwacht' : 'Opdrachtgever')}
                    </span>
                    <span className="text-xs text-gray-500">{fmt(m.created_at)}</span>
                  </div>
                  <div className="whitespace-pre-wrap text-gray-800">{m.text}</div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Typ je bericht…"
            className="min-h-[44px] flex-1 resize-y rounded-md border p-2"
            aria-label="Bericht invoer"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || sending}
            className="h-[44px] shrink-0 rounded-md bg-brand-700 px-4 text-white hover:bg-brand-600 disabled:opacity-60"
          >
            {sending ? 'Versturen…' : 'Verstuur'}
          </button>
        </div>

        <p className="mt-2 text-xs text-gray-500">
          Tip: <kbd className="rounded border bg-white px-1">Enter</kbd> om te versturen,{' '}
          <kbd className="rounded border bg-white px-1">Shift</kbd>+<kbd className="rounded border bg-white px-1">Enter</kbd>{' '}
          voor een nieuwe regel.
        </p>
      </div>
    </div>
  );
}
