// app/_sanity-checker.tsx of bijvoorbeeld in components/SanityChecker.tsx
"use client";

import { useEffect } from "react";
import { runCollectiveSanityCheck } from "@/lib/collectiveSanityCheck";

export function SanityChecker() {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      runCollectiveSanityCheck();
    }
  }, []);

  return null;
}
