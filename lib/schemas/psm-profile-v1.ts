import { z } from "zod";

export const PSM_ZzpProfileV1 = z.object({
  schemaVersion: z.literal("psm-profile/zzp@v1"),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  kvk: z.string().min(8),
  btw: z.string().optional(),
  skills: z.string().optional(),
  certificateRef: z.string().optional(), // "VCA_JanJansen.pdf; BHV_JanJansen.pdf"
  notes: z.string().optional(),
});
export type PSM_ZzpProfileV1 = z.infer<typeof PSM_ZzpProfileV1>;
