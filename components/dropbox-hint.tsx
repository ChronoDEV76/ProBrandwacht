"use client";

const FALLBACK_DROPBOX_URL =
  "https://www.dropbox.com/scl/fo/axkyvuoh62y36std3jgsf/AGWQLvWGla_8-uzmwfN6LRU?rlkey=44eawj25bofwgc5sbqbkzp849&st=iqlg0q16&dl=0";

export function DropboxHint() {
  const url = process.env.NEXT_PUBLIC_DROPBOX_FILE_REQUEST_URL?.trim() || FALLBACK_DROPBOX_URL;
  const notConfigured = url === "#";
  return (
    <div className="text-sm text-gray-700 bg-blue-50 border border-blue-200 rounded-lg p-3">
      <div className="font-semibold mb-1">Certificaten uploaden</div>
      <p className="mb-2">
        Certificaten kunnen worden geüpload via de Dropbox File Request. Gebruik als
        bestandsnaam <strong>naam + certificaat</strong> (bijv. <em>VCA_JanJansen.pdf</em>).
      </p>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className={`underline ${notConfigured ? "text-gray-500" : "text-blue-700"}`}
        data-testid="dropbox-link"
      >
        {notConfigured ? "(Nog niet geconfigureerd)" : "Open Dropbox upload"}
      </a>
    </div>
  );
}
