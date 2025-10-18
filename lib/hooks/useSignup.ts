// /lib/hooks/useSignup.ts
"use client";

import { useCallback, useState } from "react";
import { buildPayload, formToSignupData, submitSignup, type SignupOk } from "@/lib/api/signupClient";

export function useSignup(endpoint = "/api/signup") {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SignupOk | null>(null);
  const [error, setError] = useState<{ message: string; details?: string[] } | null>(null);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const data = formToSignupData(e.currentTarget);
      const payload = buildPayload(data);
      const ok = await submitSignup(payload, { endpoint });
      setResult(ok);
    } catch (err: any) {
      setError({ message: err?.message ?? "Onbekende fout", details: err?.details });
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  return { loading, result, error, handleSubmit };
}

