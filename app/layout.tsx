// app/layout.tsx
import "@/styles/globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import dynamic from "next/dynamic";
import SeoStructuredData from "@/components/SeoStructuredData";
import CookieNotice from "@/components/cookie-notice";
import { headers } from "next/headers";
import { SanityChecker } from "./_sanity-checker";
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

const AnalyticsScripts = dynamic(() => import("@/components/analytics"), {
  ssr: false,
});

const SITE_BASE_URL = "https://www.probrandwacht.nl";

const SEGMENT_LABELS: Record<string, string> = {
  tools: "Tools",
  tarieven: "Tarieven",
  steden: "Regio tarieven",
  missie: "Missie",
  blog: "Blog",
  faq: "FAQ",
  opdrachtgevers: "Opdrachtgevers",
  brandwacht: "Brandwacht",
  "brandwacht-inhuren": "Brandwacht inhuren",
  zzp: "ZZP",
  aanmelding: "Aanmelding",
  aanmelden: "Aanmelden",
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
  title: "Brandwacht platform | ProBrandwacht",
  description:
    "Inzicht, context en ondersteuning voor bewust zelfstandig werken. Voor brandwachten en opdrachtgevers die 1-op-1 willen samenwerken binnen Wet DBA (zonder bureau).",
  keywords: [
    "wet dba",
    "wet dba brandwacht",
    "dba-bewust samenwerken",
    "samenwerken binnen wet dba",
    "zelfstandig werken brandwacht",
    "platform voor zelfstandige brandwachten",
    "probrandwacht",
  ],
  metadataBase: new URL(SITE_BASE_URL),
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg", apple: "/favicon.svg" },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: SITE_BASE_URL,
    siteName: "ProBrandwacht",
    title: "Brandwacht platform | ProBrandwacht",
    description:
      "Inzicht, context en ondersteuning voor bewust zelfstandig werken. Voor brandwachten en opdrachtgevers die 1-op-1 willen samenwerken binnen Wet DBA (zonder bureau).",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "ProBrandwacht – brandwacht platform",
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
        <SeoStructuredData website={{ name: "ProBrandwacht.nl", url: SITE_BASE_URL }} />

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
