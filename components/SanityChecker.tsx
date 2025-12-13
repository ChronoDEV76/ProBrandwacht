// app/_sanity-checker.tsx of bijvoorbeeld in components/SanityChecker.tsx
"use client";

import { useEffect } from "react";
import { runVakbondSanityCheck } from "@/lib/vakbondSanityCheck";

export function SanityChecker() {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      runVakbondSanityCheck();
    }
  }, []);

  return null;
}

