// app/layout.tsx
import "@/styles/globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import SeoStructuredData from "@/components/SeoStructuredData";
import CookieNotice from "@/components/cookie-notice";
import { headers } from "next/headers";
import { SanityChecker } from "./_sanity-checker";
import AnalyticsScripts from "@/components/analytics";
import { seoKeywordClusters } from "@/lib/seo/seo-keywords";
// import { SanityChecker } from "./_sanity-checker"; // verwijderd

const roboto = localFont({
  src: [
    {
      path: "../public/fonts/Roboto-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
});

const SITE_BASE_URL = "https://www.probrandwacht.nl";

const SEGMENT_LABELS: Record<string, string> = {
  tools: "Tools",
  tarieven: "Kaders",
  steden: "Regio context",
  blog: "Kennisbank",
  faq: "FAQ",
  opdrachtgevers: "Opdrachtgevers",
  brandwacht: "Brandwacht",
  platform: "Initiatief",
  zzp: "ZZP",
  "voor-brandwachten": "Voor professionals",
  "waarom-wij-soms-nee-zeggen": "Afbakening",
  seo: "SEO",
  "seo-resources": "SEO resources",
};

function buildBreadcrumbs(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs: { name: string; item: string }[] = [
    { name: "Home", item: `${SITE_BASE_URL}/` },
  ];
  let cumulativePath = "";
  segments.forEach((segment) => {
    cumulativePath += `/${segment}`;
    const normalized = segment.toLowerCase();
    const label = SEGMENT_LABELS[normalized] ?? titleizeSegment(normalized);
    breadcrumbs.push({
      name: label,
      item: `${SITE_BASE_URL}${cumulativePath}`,
    });
  });
  return breadcrumbs;
}

function titleizeSegment(segment: string) {
  if (!segment) return segment;
  return segment
    .split("-")
    .map((part) => {
      if (!part) return part;
      if (part.length <= 3) return part.toUpperCase();
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(" ");
}

export const metadata: Metadata = {
  title: "ProBrandwacht — Duidelijkheid in de brandwachtenmarkt",
  description:
    "Onafhankelijk kennis- en kaderinitiatief met veiligheidskundige context over rolafbakening, verantwoordelijkheden en samenwerking in de brandwachtenmarkt.",
  keywords: [
    ...seoKeywordClusters.core,
    ...seoKeywordClusters.platform,
    ...seoKeywordClusters.positioning,
  ],
  metadataBase: new URL(SITE_BASE_URL),
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg", apple: "/favicon.svg" },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: SITE_BASE_URL,
    siteName: "ProBrandwacht",
    title: "ProBrandwacht — Duidelijkheid in de brandwachtenmarkt",
    description:
      "Onafhankelijk kennis- en kaderinitiatief met veiligheidskundige context over rolafbakening, verantwoordelijkheden en samenwerking in de brandwachtenmarkt.",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "ProBrandwacht – kennis- en kaderinitiatief",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const headerList = headers();
  const nextUrl = headerList.get("next-url") ?? "/";
  const currentUrl = new URL(nextUrl, SITE_BASE_URL);
  const breadcrumbs = buildBreadcrumbs(currentUrl.pathname);
  // breadcrumbs worden nu nog niet gebruikt, maar je kunt ze doorgeven aan je layout / header als je wilt

  return (
    <html lang="nl">
      <body
        className={`${roboto.className} min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100`}
      >
        {/* Globale SEO-schema’s */}
        <SeoStructuredData website={{ name: "ProBrandwacht", url: SITE_BASE_URL }} />

        {/* Analytics: Google Tag Manager & GA4 */}
        <AnalyticsScripts />

        {/* Main content */}
        <div className="flex flex-1 flex-col">{children}</div>

        {/* Cookie notice */}
        <CookieNotice />
        {/* Dev-only sanity checker; no-op in production */}
        <SanityChecker />
      </body>
    </html>
  );
}
