import { z } from "zod";

export const ZzpProfileSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6).max(15).optional().nullable(), // Allow null values
  kvk: z.string().min(8),          // NL KvK = 8 cijfers (soms 8-9 met leidende nul); pas aan indien nodig
  btw: z.string().optional(),      // bv. NL123456789B01
  iban: z.string().min(10),        // basale check; wil je strikt? gebruik iban-lib
  skills: z.string().optional().nullable(), // Allow null values
  certificateRef: z.string().optional().nullable(), // Allow null values
  notes: z.string().optional(),
});
export type ZzpProfile = z.infer<typeof ZzpProfileSchema>;

export const ClientProfileSchema = z.object({
  company: z.string().min(2),
  kvk: z.string().min(8),
  contact: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(6).max(15).optional().nullable(), // Allow null values
  region: z.string().optional(),
  needs: z.string().optional(),
});
export type ClientProfile = z.infer<typeof ClientProfileSchema>;

