"use client";

export function DropboxHint() {
  const url = process.env.NEXT_PUBLIC_DROPBOX_FILE_REQUEST_URL || "#";
  const notConfigured = url === "#";
  return (
    <div className="text-sm text-gray-700 bg-blue-50 border border-blue-200 rounded-lg p-3">
      <div className="font-semibold mb-1">Certificaten uploaden</div>
      <p className="mb-2">
        Upload je certificaten via onze Dropbox File Request. Gebruik als
        bestandsnaam je <strong>naam + certificaat</strong> (bijv. <em>VCA_JanJansen.pdf</em>).
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

