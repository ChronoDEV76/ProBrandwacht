'use client'

import { useRef, useState } from 'react'
import type { DragEvent, ReactNode } from 'react'

type ImportClientProps = {
  heading?: ReactNode
}

export default function ImportClient({ heading }: ImportClientProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [state, setState] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function onFileSelect(file: File) {
    setState('loading')
    setMessage('')
    try {
      const text = await file.text()
      const json = text ? JSON.parse(text) : {}
      if (!json || typeof json !== 'object') {
        throw new Error('Ongeldige JSON-structuur')
      }
      const res = await fetch('/api/profile/zzp/import', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(json),
      })
      if (!res.ok) {
        const err = await res.text()
        setState('error')
        setMessage(err || 'Import mislukt')
        return
      }
      setState('ok')
      setMessage('Profiel succesvol geïmporteerd.')
    } catch (error) {
      const fallback = 'Ongeldige JSON'
      const parsedMessage = error instanceof Error ? error.message : fallback
      setState('error')
      setMessage(parsedMessage || fallback)
    }
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) onFileSelect(file)
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      {(heading ?? (
        <h1 className="text-2xl font-bold">Importeer ZZP-profiel (JSON)</h1>
      ))}
      <p className="text-gray-600">
        Upload het JSON-profielbestand (schema: <code>psm-profile/zzp@v1</code>).
      </p>

      <div
        onDrop={onDrop}
        onDragOver={e => e.preventDefault()}
        className="rounded-xl border-2 border-dashed p-8 text-center hover:bg-gray-50"
      >
        <p className="mb-3">
          Sleep een <strong>.json</strong> hierheen of
        </p>
        <button
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
          onClick={() => inputRef.current?.click()}
          type="button"
        >
          Kies bestand
        </button>
        <input
          ref={inputRef}
          type="file"
          accept=".json"
          className="hidden"
          onChange={event => {
            const f = event.target.files?.[0]
            if (f) onFileSelect(f)
          }}
        />
      </div>

      {state !== 'idle' && (
        <div
          className={
            state === 'ok'
              ? 'rounded-lg border border-green-200 bg-green-50 p-3 text-green-700'
              : state === 'error'
              ? 'rounded-lg border border-red-200 bg-red-50 p-3 text-red-700'
              : 'rounded-lg border border-blue-200 bg-blue-50 p-3 text-blue-700'
          }
        >
          {state === 'loading' ? 'Bezig met importeren…' : message}
        </div>
      )}
    </div>
  )
}
