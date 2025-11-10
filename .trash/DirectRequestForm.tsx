"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DirectRequestForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    const form = e.currentTarget;
    const payload = {
      company: (form.company as any).value,
      contact: (form.contact as any).value,
      email: (form.email as any).value,
      phone: (form.phone as any).value,
      city: (form.city as any).value,
      start_date: (form.start_date as any).value,
      duration_days: (form.duration_days as any).value,
      hours_per_day: (form.hours_per_day as any).value,
      requirements: (form.requirements as any).value,
      budget_range: (form.budget_range as any).value,
      message: (form.message as any).value,
      urgent: !!(form.urgent as any).checked,
      consent: !!(form.consent as any).checked,
      // honeypot — laat dit veld leeg in de UI
      website: (form.website as any)?.value || "",
    };

    try {
      const res = await fetch("/api/chrono-direct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // throttle/honeypot feedback
      if (res.status === 429) {
        setErr("Je hebt al een recente aanvraag gedaan. Probeer het later opnieuw.");
        return;
      }

      if (!res.ok) {
        const t = await res.text().catch(() => "");
        setErr(t || "Versturen mislukt. Probeer het zo weer.");
        return;
      }

      // Alles OK → doorsturen
      router.push("/opdrachtgevers/thank-you");
    } catch (e: any) {
      setErr("Netwerkfout. Controleer je verbinding en probeer opnieuw.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Honeypot — verstop in CSS of aria-hidden; niet invullen door mensen */}
      <div className="hidden">
        <label>Website (laat leeg)</label>
        <input name="website" autoComplete="off" />
      </div>

      <div>
        <label className="block text-sm font-medium">Bedrijf</label>
        <input name="company" required className="mt-1 w-full rounded-md border px-3 py-2" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium">Contactpersoon</label>
          <input name="contact" required className="mt-1 w-full rounded-md border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">E-mail</label>
          <input name="email" type="email" required className="mt-1 w-full rounded-md border px-3 py-2" />
        </div>
      </div>

      {/* …(je overige velden) */}

      <div className="flex items-center gap-2">
        <input id="consent" name="consent" type="checkbox" defaultChecked required />
        <label htmlFor="consent" className="text-sm">
          Ik ga akkoord met het verwerken van mijn aanvraag.
        </label>
      </div>

      {err && <p className="text-sm text-red-600">{err}</p>}

      <button
        type="submit"
        disabled={loading}
        className="rounded-2xl bg-brand-700 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-600 disabled:opacity-60"
      >
        {loading ? "Versturen…" : "Aanvraag versturen"}
      </button>
    </form>
  );
}

