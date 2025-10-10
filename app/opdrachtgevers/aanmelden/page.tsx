"use client";

import React, { useEffect, useState } from "react";

/** ----------------------------------------------------------------
 * Minimal UI primitives (same look & feel as your ZZP form)
 * If you already centralised these, import them from your UI lib.
 * --------------------------------------------------------------- */
function Link(
  { href = "#", children, className = "", ...props }:
  { href?: string; children: React.ReactNode; className?: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>
) {
  return (
    <a href={href} className={className} {...props}>
      {children}
    </a>
  );
}
function Label({ children, htmlFor, hint }: { children: React.ReactNode; htmlFor?: string; hint?: string }) {
  return (
    <label htmlFor={htmlFor} className="block">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-900">{children}</span>
        {hint ? <span className="text-xs text-gray-500">{hint}</span> : null}
      </div>
    </label>
  );
}
function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 placeholder:text-gray-400 ${props.className || ""}`}
    />
  );
}
function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 placeholder:text-gray-400 ${props.className || ""}`}
    />
  );
}
function Button(
  { children, variant, className = "", ...props }:
  { children: React.ReactNode; variant?: "primary" | "secondary" | "ghost"; className?: string } & React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  const base =
    "inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium focus:outline-none focus:ring-4 focus:ring-offset-0 disabled:opacity-50 transition";
  const styles =
    variant === "secondary"
      ? "text-blue-700 bg-blue-100 hover:bg-blue-200 focus:ring-blue-100"
      : variant === "ghost"
      ? "text-gray-700 hover:bg-gray-100 focus:ring-gray-100"
      : "text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-200";
  return (
    <button {...props} className={`${base} ${styles} ${className}`.trim()}>
      {children}
    </button>
  );
}
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-gray-200 bg-white shadow-sm ${className}`.trim()}>{children}</div>;
}
function CardSection({ title, subtitle, children }: { title?: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="p-6">
      {title ? (
        <div className="mb-3">
          <h3 className="text-base font-semibold text-gray-900">{title}</h3>
          {subtitle ? <p className="text-sm text-gray-500">{subtitle}</p> : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}
function LinkButton({ href, children, variant }: { href: string; children: React.ReactNode; variant?: "primary" | "secondary" | "ghost" }) {
  const styles =
    variant === "secondary"
      ? "text-blue-700 bg-blue-100 hover:bg-blue-200"
      : variant === "ghost"
      ? "text-gray-700 hover:bg-gray-100"
      : "text-white bg-blue-600 hover:bg-blue-700";
  return (
    <Link href={href} className={`inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium ${styles}`.trim()}>
      {children}
    </Link>
  );
}

/** ----------------------------------------------------------------
 * Local storage helpers
 * --------------------------------------------------------------- */
const STORAGE_KEY_CLIENT = "psm_profile_client" as const;

function saveLocal(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}
function loadLocal<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}
function downloadJSON(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/** ----------------------------------------------------------------
 * Page: Opdrachtgever Aanmelden
 * - Geen telefoon/IBAN
 * - Lokaal opslaan met schemaVersion: "psm-profile/client@v1"
 * - Basisvalidatie + JSON-download
 * --------------------------------------------------------------- */
export default function OpdrachtgeverAanmeldenPage() {
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const stored = loadLocal<Record<string, string>>(STORAGE_KEY_CLIENT);
    if (stored) {
      setProfile(stored);
    }
  }, []);

  function validate(entries: Record<string, string>): string | null {
    if (!entries.company?.trim()) return "Vul je bedrijfsnaam in.";
    if (!/^\d{8,}$/.test(entries.kvk || "")) return "KvK-nummer lijkt onjuist (minimaal 8 cijfers).";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(entries.email || "")) return "Vul een geldig e-mailadres in.";
    return null;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const form = new FormData(e.currentTarget);
    const entries: Record<string, string> = {};
    form.forEach((v, k) => { entries[k] = typeof v === "string" ? v : ""; });

    const err = validate(entries);
    if (err) {
      setError(err);
      setSubmitting(false);
      return;
    }

    const profilePayload = {
      schemaVersion: "psm-profile/client@v1",
      ...entries,
    } as Record<string, string>;

    const payload = {
      type: "client_signup",
      submittedAt: new Date().toISOString(),
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
      data: profilePayload,
    };

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      saveLocal(STORAGE_KEY_CLIENT, profilePayload);
      setProfile(profilePayload);
      setDone(true);
    } catch (err) {
      console.error("Failed to submit client signup", err);
      setError("We konden je aanmelding niet naar het platform versturen. Probeer het opnieuw of mail ons via info@probrandwacht.nl.");
    }
    setSubmitting(false);
  }

  const hasProfile = profile && Object.keys(profile).length > 0;

  if (done) {
    return (
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        <Card>
          <CardSection
            title="Accountaanvraag opgeslagen ✅"
            subtitle="Je bedrijfsgegevens zijn gelogd voor het platform en lokaal opgeslagen. Je kunt dit later importeren in je dashboard."
          >
            <div className="text-sm text-gray-700">
              <div className="font-semibold mb-1">Samenvatting (JSON)</div>
              <pre className="bg-gray-50 border border-gray-200 rounded-lg p-3 overflow-x-auto text-xs">
                {JSON.stringify(profile, null, 2)}
              </pre>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button onClick={() => downloadJSON("psm-opdrachtgever-profiel.json", profile)}>Download JSON</Button>
              <Button variant="secondary" onClick={() => { try { navigator.clipboard?.writeText(JSON.stringify(profile, null, 2)); } catch {} }}>
                Kopieer JSON
              </Button>
              <LinkButton href="/" variant="ghost">Terug naar home</LinkButton>
            </div>
          </CardSection>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Aanmelden als opdrachtgever</h1>
        <p className="text-gray-600">
          Vul je bedrijfsgegevens in. We versturen de gegevens direct naar het platform en bewaren een kopie in je browser (localStorage) zodat je ze later kunt hergebruiken of importeren.
        </p>
      </div>

      {error ? (
        <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3" role="alert" aria-live="assertive">{error}</div>
      ) : null}

      {hasProfile ? (
        <div className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3">
          Er is al een lokaal profiel gevonden. Als je opnieuw indient, wordt het overschreven.
        </div>
      ) : null}

      <form onSubmit={onSubmit} className="space-y-6" data-testid="client-form">
        <Card>
          <CardSection title="Bedrijfsgegevens">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company">Bedrijfsnaam</Label>
                <Input id="company" name="company" required defaultValue={profile.company || ""} placeholder="Bedrijf BV" autoComplete="organization" />
              </div>
              <div>
                <Label htmlFor="kvk">KvK-nummer</Label>
                <Input id="kvk" name="kvk" required defaultValue={profile.kvk || ""} placeholder="87654321" inputMode="numeric" pattern="\\d{8,}" />
              </div>
              <div>
                <Label htmlFor="contact">Contactpersoon</Label>
                <Input id="contact" name="contact" required defaultValue={profile.contact || ""} placeholder="Voornaam Achternaam" autoComplete="name" />
              </div>
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" name="email" type="email" required defaultValue={profile.email || ""} placeholder="inkoop@bedrijf.nl" autoComplete="email" />
              </div>
              <div>
                <Label htmlFor="region">Locatie / regio</Label>
                <Input id="region" name="region" defaultValue={profile.region || ""} placeholder="Rotterdam / Moerdijk / Terneuzen…" autoComplete="address-level2" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="needs">Behoefte</Label>
                <Textarea id="needs" name="needs" rows={3} defaultValue={profile.needs || ""} placeholder="Aantal brandwachten, data, dag/nacht/weekend, turnaround/stop, vereiste certificaten" />
              </div>
            </div>
          </CardSection>
        </Card>

        <div className="flex flex-wrap gap-3">
          <Button type="submit" disabled={submitting}>
            {submitting ? "Bezig met opslaan…" : "Aanmelding opslaan"}
          </Button>
          <LinkButton href="/" variant="ghost">Annuleren</LinkButton>
        </div>
      </form>
    </div>
  );
}
