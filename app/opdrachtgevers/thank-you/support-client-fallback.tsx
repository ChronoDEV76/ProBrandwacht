'use client';

import * as React from 'react';
import Link from 'next/link';

export default function ClientFallback() {
  const [id, setId] = React.useState<string | null>(null);

  React.useEffect(() => {
    try {
      const v = localStorage.getItem('pb:last_request_id');
      if (v) setId(v);
    } catch {
      // ignore errors (Safari private mode etc.)
    }
  }, []);

  if (!id) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
        Geen aanvraag-ID gevonden in de URL.  
        Is er zojuist ingestuurd? Ververs de pagina of zorg dat er wordt doorgestuurd naar  
        <code>?id=&lt;aanvraag-id&gt;</code>.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
      <p className="text-sm text-emerald-900">
        Laatst geregistreerde aanvraag gevonden.  
        Verdere afstemming is mogelijk in het inzet-dashboard.
        <br />
        <span className="opacity-70">Aanvraag-ID: {id}</span>
      </p>
      <div className="mt-3">
        <Link
          href={`/dashboard/requests/${encodeURIComponent(id)}`}
          className="inline-flex rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500"
        >
          Ga naar inzet-dashboard
        </Link>
      </div>
    </div>
  );
}
