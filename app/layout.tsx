// app/layout.tsx
import "@/styles/globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import dynamic from "next/dynamic";
import SeoStructuredData from "@/components/SeoStructuredData";
import { headers } from "next/headers";

const roboto = localFont({
  src: [{ path: "../public/fonts/Roboto-Regular.ttf", weight: "400", style: "normal" }],
  display: "swap",
});

const AnalyticsScripts = dynamic(() => import("@/components/analytics"), { ssr: false });

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
    breadcrumbs.push({ name: label, item: `${SITE_BASE_URL}${cumulativePath}` });
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
  title: "ProBrandwacht.nl | Brandwacht inhuren & eerlijke tarieven",
  description:
    "Huur een brandwacht in zonder tussenbureau. ProBrandwacht.nl – eerlijke tarieven en DBA-proof samenwerking via ProSafetyMatch.",
  metadataBase: new URL(SITE_BASE_URL),
  icons: { icon: "/og.jpg", shortcut: "/og.jpg", apple: "/og.jpg" },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: SITE_BASE_URL,
    siteName: "ProBrandwacht.nl",
    title: "ProBrandwacht.nl | Brandwacht inhuren & eerlijke tarieven",
    description:
      "Huur een brandwacht in zonder tussenbureau. ProBrandwacht.nl – eerlijke tarieven en DBA-proof samenwerking via ProSafetyMatch.",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "ProBrandwacht.nl – Brandwacht inhuren",
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

  return (
    <html lang="nl">
      <body className={`${roboto.className} bg-white text-slate-900`}>
        {/* Globale SEO-schema’s */}
        <SeoStructuredData
          website={{ name: "ProBrandwacht.nl", url: SITE_BASE_URL }}
        />
        {/* Analytics: Google Tag Manager (googletagmanager.com) & GA4 */}
        <AnalyticsScripts />
        {/* Belangrijk: géén extra header hier — je bestaande (onderste) header blijft zo de enige header */}
        <div className="flex flex-1 flex-col">{children}</div>
      </body>
    </html>
  );
}
