"use client";

import { useRef, useState } from "react";
import type { DragEvent } from "react";

export default function ZzpImportPage() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  async function onFileSelect(file: File) {
    setState("loading");
    setMessage("");
    try {
      const text = await file.text();
      const json = JSON.parse(text || "{}");
      const res = await fetch("/api/profile/zzp/import", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(json),
      });
      if (!res.ok) {
        const err = await res.text();
        setState("error");
        setMessage(err || "Import mislukt");
        return;
      }
      setState("ok");
      setMessage("Profiel succesvol geïmporteerd.");
    } catch (error: unknown) {
      const fallback = "Ongeldige JSON";
      const parsedMessage = error instanceof Error ? error.message : fallback;
      setState("error");
      setMessage(parsedMessage || fallback);
    }
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) onFileSelect(file);
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Importeer ZZP-profiel (JSON)</h1>
      <p className="text-gray-600">
        Upload de JSON die vanuit het ZZP-aanmeldformulier is gedownload (schema: <code>psm-profile/zzp@v1</code>).
      </p>

      <div
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed rounded-xl p-8 text-center hover:bg-gray-50"
      >
        <p className="mb-3">Sleep je <strong>.json</strong> hierheen of</p>
        <button
          className="px-4 py-2 rounded-lg text-sm text-white bg-blue-600 hover:bg-blue-700"
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
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onFileSelect(f);
          }}
        />
      </div>

      {state !== "idle" && (
        <div
          className={
            state === "ok"
              ? "text-green-700 bg-green-50 border border-green-200 rounded-lg p-3"
              : state === "error"
              ? "text-red-700 bg-red-50 border border-red-200 rounded-lg p-3"
              : "text-blue-700 bg-blue-50 border border-blue-200 rounded-lg p-3"
          }
        >
          {state === "loading" ? "Bezig met importeren…" : message}
        </div>
      )}
    </div>
  );
}
