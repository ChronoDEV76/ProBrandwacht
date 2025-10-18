// /lib/api/signupClient.ts
import { z } from "zod";

/* ===========================
   Types & Schemas
=========================== */
export const SignupDataSchema = z.object({
  email: z.string().email().max(254),
  firstName: z.string().min(1).max(100),
  lastName: z.string().optional(),
  kvk: z.string().min(8).max(12).optional(),
  btw: z.string().optional(),
  skills: z.string().optional(),
  certificateRef: z.string().optional(),
  notes: z.string().optional(),
}).passthrough();

export type SignupData = z.infer<typeof SignupDataSchema>;

export const SignupPayloadSchema = z.object({
  type: z.string().min(1).max(64).default("zzp_signup"),
  submittedAt: z.string().datetime().optional(),
  userAgent: z.string().optional(),
  // optioneel los email veld
  email: z.string().email().max(254).optional(),
  data: SignupDataSchema,
});
export type SignupPayload = z.infer<typeof SignupPayloadSchema>;

export type SignupOk = { ok: true; id: string; createdAt: string };
export type SignupErr = { ok: false; error: string; details?: string[] };
export type SignupResponse = SignupOk | SignupErr;

/* ===========================
   Errors
=========================== */
export class ApiError extends Error {
  status: number;
  details?: string[];
  constructor(message: string, status = 400, details?: string[]) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

/* ===========================
   Helpers
=========================== */
export function formToSignupData(form: HTMLFormElement): SignupData {
  const fd = new FormData(form);
  const asObj: Record<string, string> = {};
  fd.forEach((v, k) => {
    if (typeof v === "string") asObj[k] = v;
  });
  const parsed = SignupDataSchema.safeParse(asObj);
  if (!parsed.success) {
    const issues = parsed.error.issues.map(i => `${i.path.join(".")}: ${i.message}`);
    throw new ApiError("Form validation failed", 400, issues);
  }
  return parsed.data;
}

export function buildPayload(data: SignupData, extra?: Partial<Omit<SignupPayload, "data">>): SignupPayload {
  const payload: SignupPayload = {
    type: extra?.type ?? "zzp_signup",
    submittedAt: extra?.submittedAt ?? new Date().toISOString(),
    userAgent: extra?.userAgent ?? (typeof navigator !== "undefined" ? navigator.userAgent : undefined),
    email: extra?.email ?? data.email,
    data,
  };
  const parsed = SignupPayloadSchema.safeParse(payload);
  if (!parsed.success) {
    const issues = parsed.error.issues.map(i => `${i.path.join(".")}: ${i.message}`);
    throw new ApiError("Payload validation failed", 400, issues);
  }
  return parsed.data;
}

/* ===========================
   API Call
=========================== */
export async function submitSignup(payload: SignupPayload, opts?: { endpoint?: string; signal?: AbortSignal }): Promise<SignupOk> {
  const endpoint = opts?.endpoint ?? "/api/signup";
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: opts?.signal,
  });

  let body: SignupResponse | undefined;
  try {
    body = (await res.json()) as SignupResponse;
  } catch {
    // noop
  }

  if (!res.ok || !body || body.ok === false) {
    const msg = (body && "error" in body) ? body.error : `HTTP ${res.status}`;
    const details = (body && "details" in body) ? body.details : undefined;
    throw new ApiError(msg, res.status, details);
  }
  return body;
}

