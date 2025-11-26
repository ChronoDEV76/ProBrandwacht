"use client";

import { useEffect, useState } from "react";

const messages = [
  "Eerlijke tarieven. Direct contact.",
  "Geen bureau-constructies. Geen race to the bottom.",
  "Rijksgediplomeerd en/of repressief.",
  "Bij beschikbaarheid. Snel inzetbaar. Zonder loze beloftes.",
];

export default function HomeHeroCycle() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % messages.length), 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="mt-5 inline-flex items-center justify-center rounded-full bg-white/15 px-4 py-2 text-[13px] font-semibold text-white shadow-md backdrop-blur"
      aria-live="polite"
    >
      {messages[idx]}
    </div>
  );
}
