import { describe, it, expect } from "vitest";
import { PSM_ZzpProfileV1 } from "@/lib/schemas/psm-profile-v1";

describe("PSM_ZzpProfileV1", () => {
  it("accepts valid v1 payload", () => {
    const ok = PSM_ZzpProfileV1.safeParse({
      schemaVersion: "psm-profile/zzp@v1",
      firstName: "Jan",
      lastName: "Jansen",
      email: "jan@example.com",
      kvk: "12345678",
      skills: "Industriële brandwacht, Mangatwacht",
      certificateRef: "VCA_JanJansen.pdf; BHV_JanJansen.pdf",
    });
    expect(ok.success).toBe(true);
  });

  it("rejects when schemaVersion is missing", () => {
    const bad = PSM_ZzpProfileV1.safeParse({
      firstName: "Jan",
      lastName: "Jansen",
      email: "jan@example.com",
      kvk: "12345678",
    });
    expect(bad.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const bad = PSM_ZzpProfileV1.safeParse({
      schemaVersion: "psm-profile/zzp@v1",
      firstName: "Jan",
      lastName: "Jansen",
      email: "nope",
      kvk: "12345678",
    });
    expect(bad.success).toBe(false);
  });
});
