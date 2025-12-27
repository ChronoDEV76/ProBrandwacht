"use client";
import { useEffect, useState } from "react";
import { useSignup } from "@/lib/hooks/useSignup";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  FormEvent,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";

// -----------------------------
// Local Link shim (Canvas friendly)
// -----------------------------
type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href?: string };

function Link({ href = "#", children, className = "", ...props }: LinkProps) {
  return (
    <a href={href} className={className} {...props}>
      {children}
    </a>
  );
}

// -----------------------------
// UI primitives (cleaner visuals)
// -----------------------------
type LabelProps = {
  children: ReactNode;
  htmlFor?: string;
  hint?: string;
  className?: string;
};

function Label({ children, htmlFor, hint, className = "" }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className={`block ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-900">{children}</span>
        {hint && <span className="text-xs text-gray-500">{hint}</span>}
      </div>
    </label>
  );
}

type InputProps = InputHTMLAttributes<HTMLInputElement>;
function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      {...props}
      className={`mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 placeholder:text-gray-400 ${className}`}
    />
  );
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;
function Textarea({ className = "", ...props }: TextareaProps) {
  return (
    <textarea
      {...props}
      className={`mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 placeholder:text-gray-400 ${className}`}
    />
  );
}

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant };
function Button({ children, variant = "primary", className = "", ...props }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium focus:outline-none focus:ring-4 focus:ring-offset-0 disabled:opacity-50 transition";
  const styles =
    variant === "secondary"
      ? "text-blue-700 bg-blue-100 hover:bg-blue-200 focus:ring-blue-100"
      : variant === "ghost"
      ? "text-gray-700 hover:bg-gray-100 focus:ring-gray-100"
      : "text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-200";
  return (
    <button {...props} className={`${base} ${styles} ${className}`}>
      {children}
    </button>
  );
}

type CardProps = { children: ReactNode; className?: string };
function Card({ children, className = "" }: CardProps) {
  return <div className={`rounded-2xl border border-gray-200 bg-white shadow-sm ${className}`}>{children}</div>;
}

type CardSectionProps = { title?: string; subtitle?: string; children: ReactNode };
function CardSection({ title, subtitle, children }: CardSectionProps) {
  return (
    <section className="p-6">
      {title && (
        <div className="mb-3">
          <h2 className="text-base font-semibold text-gray-900">{title}</h2>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      )}
      {children}
    </section>
  );
}

function Divider() {
  return <hr className="border-t border-gray-100" />;
}

type LinkButtonProps = LinkProps & { variant?: ButtonVariant };
function LinkButton({ href = "#", children, variant = "primary", className = "", ...props }: LinkButtonProps) {
  const styles =
    variant === "secondary"
      ? "text-blue-700 bg-blue-100 hover:bg-blue-200"
      : variant === "ghost"
      ? "text-gray-700 hover:bg-gray-100"
      : "text-white bg-blue-600 hover:bg-blue-700";
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium ${styles} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}

const FALLBACK_DROPBOX_URL =
  "https://www.dropbox.com/scl/fo/axkyvuoh62y36std3jgsf/AGWQLvWGla_8-uzmwfN6LRU?rlkey=44eawj25bofwgc5sbqbkzp849&st=iqlg0q16&dl=0";
const DROPBOX_URL = process.env.NEXT_PUBLIC_DROPBOX_FILE_REQUEST_URL?.trim() || FALLBACK_DROPBOX_URL;

// -----------------------------
// Dropbox hint block
// -----------------------------
function DropboxHint() {
  const url = DROPBOX_URL;
  const notConfigured = url === "#";
  return (
    <div className="text-sm text-gray-700 bg-blue-50 border border-blue-200 rounded-lg p-3">
      <div className="font-semibold mb-1">Certificaten uploaden</div>
      <p className="mb-2">
        Upload je certificaten via onze Dropbox File Request. Gebruik als
        bestandsnaam je <strong>naam + certificaat</strong> (bijv.
        <em> VCA_JanJansen.pdf</em>).
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

// ==============================================
// Local profile storage (client-only MVP)
// ==============================================
const STORAGE_KEY_ZZP = "psm_profile_zzp" as const;

type ProfileValues = Record<string, string | undefined>;

function saveLocal<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
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

function formDataToProfile(form: FormData): ProfileValues {
  const result: ProfileValues = {};
  form.forEach((value, key) => {
    result[key] = typeof value === "string" ? value : undefined;
  });
  return result;
}

// ===============================================================
// 1) ZZP — Aanmeldformulier (met useSignup hook)
// ===============================================================
export default function ZzpAanmeldenPage({ heading }: { heading?: ReactNode }) {
  const { loading, result, error: hookError, handleSubmit } = useSignup("/api/signup");

  const [done, setDone] = useState(false);
  const [profile, setProfile] = useState<ProfileValues>({});

  useEffect(() => {
    const storedProfile = loadLocal<ProfileValues>(STORAGE_KEY_ZZP);
    if (storedProfile) setProfile(storedProfile);
  }, []);

  // Wrap de hook-submit zodat we ook lokaal de ingevulde waarden kunnen tonen/opslaan
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    // Leg de formwaarden vast vóórdat de hook het event verwerkt
    const snapshot = new FormData(e.currentTarget);
    const data = formDataToProfile(snapshot);
    setProfile(data);

    await handleSubmit(e);
  }

  // Als de server-POST succesvol was: markeer done en sla lokaal op
  useEffect(() => {
    if (result?.ok) {
      saveLocal(STORAGE_KEY_ZZP, profile);
      setDone(true);
    }
  }, [result, profile]);

  const hasProfile = Object.keys(profile).length > 0;

  if (done) {
    return (
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        <Card>
          <CardSection
            title="Aanmelding opgeslagen ✅"
            subtitle="Je gegevens zijn gelogd voor ons platform en lokaal opgeslagen. Betaal- en uitbetalingsgegevens (zoals IBAN) vul je later in tijdens de profielverificatie zodra je toegang krijgt tot de beta."
          >
            <div className="grid gap-4">
              <DropboxHint />
              <div className="text-sm text-gray-700">
                <div className="font-semibold mb-1">Samenvatting (JSON)</div>
                <pre className="bg-gray-50 border border-gray-200 rounded-lg p-3 overflow-x-auto text-xs">{JSON.stringify(profile, null, 2)}</pre>
              </div>
            </div>
          </CardSection>
          <Divider />
          <CardSection>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => downloadJSON("psm-zzp-profiel.json", profile)}>Download JSON</Button>
              <Button
                variant="secondary"
                onClick={() => {
                  navigator.clipboard?.writeText(JSON.stringify(profile, null, 2));
                }}
              >
                Kopieer JSON
              </Button>
              <LinkButton href="/" variant="ghost">
                Terug naar home
              </LinkButton>
            </div>
          </CardSection>
        </Card>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-5xl space-y-6 px-4 py-12 sm:px-6 md:px-8">
          <div className="space-y-3">
            {heading ?? (
              <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Aanmelden als zelfstandige brandwacht
              </h1>
            )}
            <p className="max-w-3xl text-sm leading-relaxed text-slate-200 md:text-base">
              Vul je basisgegevens in. <span className="font-semibold text-emerald-200">IBAN is niet nodig</span>; die vul je later in tijdens je profielverificatie. Aanmelden geeft je updates, pilots en kennis — geen garantie op opdrachten of volumes.
            </p>
            <p className="text-sm text-amber-200">
              Deze aanmelding zet je op de wachtlijst voor onze bètaversie. We gebruiken je gegevens om je te informeren over testmomenten, feedbacksessies en de overstap naar het live platform.
            </p>
            <p className="text-sm text-amber-200">
              ProBrandwacht groeit bewust en zorgvuldig, omdat opdrachtgevers moeten kunnen vertrouwen op mensen die ook in de praktijk verantwoordelijkheid nemen.
            </p>
          </div>
          <ol className="flex items-center gap-4 text-sm text-slate-200">
            <li className="flex items-center gap-2 text-emerald-300">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-200">1</span> Basisgegevens
            </li>
            <li className="flex items-center gap-2 text-slate-500">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-800">2</span> Certificaten
            </li>
            <li className="flex items-center gap-2 text-slate-500">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-800">3</span> iDIN + Betaalgegevens (IBAN)
            </li>
          </ol>
        </div>
      </section>

      <section className="bg-slate-950">
        <div className="mx-auto max-w-5xl space-y-6 px-4 py-12 sm:px-6 md:px-8">
          {/* Errors uit de hook */}
          {hookError && (
            <div className="text-sm text-red-200 bg-rose-900/40 border border-rose-500/60 rounded-lg p-3">
              <div className="font-semibold">Fout bij opslaan</div>
              <div className="mt-1">{hookError.message}</div>
              {hookError.details && hookError.details.length > 0 && (
                <ul className="list-disc ml-5 mt-2 text-rose-100">
                  {hookError.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Hint wanneer er al lokaal een profiel staat */}
          {hasProfile && !hookError && (
            <div className="text-sm text-amber-200 bg-amber-900/30 border border-amber-500/50 rounded-lg p-3">
              Er is al een lokaal profiel gevonden. Als je opnieuw indient, wordt het overschreven.
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-6" data-testid="zzp-form">
            <Card className="bg-slate-900/80 border-slate-800">
              <CardSection
                title="Contactgegevens"
                subtitle="We gebruiken deze gegevens om je profiel op te zetten en contact te houden over opdrachten."
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-slate-100">
                      Voornaam
                    </Label>
                    <Input id="firstName" name="firstName" required defaultValue={profile.firstName || ""} placeholder="Jan" />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-slate-100">
                      Achternaam
                    </Label>
                    <Input id="lastName" name="lastName" required defaultValue={profile.lastName || ""} placeholder="Jansen" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-slate-100">
                      E‑mail
                    </Label>
                    <Input id="email" name="email" type="email" required defaultValue={profile.email || ""} placeholder="jan@example.com" />
                  </div>
                </div>
              </CardSection>

              <Divider />

              <CardSection title="Zakelijke gegevens" subtitle="Vul je KvK en BTW-nummer in.">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="kvk" className="text-slate-100">
                      KvK-nummer
                    </Label>
                    <Input id="kvk" name="kvk" required defaultValue={profile.kvk || ""} placeholder="12345678" />
                  </div>
                  <div>
                    <Label htmlFor="btw" className="text-slate-100">
                      BTW-nummer{" "}
                    </Label>
                    <Input id="btw" name="btw" defaultValue={profile.btw || ""} placeholder="NL123456789B01" />
                  </div>
                </div>
              </CardSection>

              <Divider />

              <CardSection title="Profiel & certificaten" subtitle="Omschrijf je specialisaties en verwijs naar je certificaten.">
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="skills" className="text-slate-100">
                      Specialisaties
                    </Label>
                    <Input id="skills" name="skills" defaultValue={profile.skills || ""} placeholder="Industriële brandwacht, Mangatwacht, Gasmeting…" />
                  </div>
                  <div>
                    <Label htmlFor="certificateRef" hint="bestandsnaam of lijstje" className="text-slate-100">
                      Certificaten (referentie)
                    </Label>
                    <Input id="certificateRef" name="certificateRef" defaultValue={profile.certificateRef || ""} placeholder="VCA_JanJansen.pdf; BHV_JanJansen.pdf" />
                    <div className="mt-3">
                      <DropboxHint />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="notes" className="text-slate-100">
                      Opmerking
                    </Label>
                    <Textarea id="notes" name="notes" rows={3} defaultValue={profile.notes || ""} placeholder="Beschikbaarheid, regio, dag/nacht/weekend…" />
                  </div>
                </div>
              </CardSection>
            </Card>

            <div className="flex flex-wrap gap-3">
              <Button type="submit" data-testid="zzp-submit" disabled={loading}>
                {loading ? "Bezig met opslaan…" : "Aanmelding opslaan"}
              </Button>
              <LinkButton href="/" variant="ghost">
                Annuleren
              </LinkButton>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Gegevens worden opgeslagen conform de AVG (Algemene Verordening Gegevensbescherming) op beveiligde servers binnen de EU. U heeft te allen tijde recht op inzage, correctie of verwijdering van uw gegevens. Neem hiervoor contact op via{" "}
              <a href="mailto:privacy@prosafetymatch.nl" className="underline text-emerald-200">
                privacy@prosafetymatch.nl
              </a>{" "}
              of gebruik het formulier op onze{" "}
              <a href="/privacy" className="underline text-emerald-200">
                privacy-pagina
              </a>
              .
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}

// ==================================================================
// Notes
// - Gebruik van useSignup hook voor POST + servervalidatie
// - Lokaal opslaan/herstellen van profielgegevens blijft intact
// - Success-state toont JSON + Dropbox instructie
// - Button disabled + label tijdens loading
// ==================================================================
