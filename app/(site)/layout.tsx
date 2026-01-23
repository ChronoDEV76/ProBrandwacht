// app/(site)/layout.tsx
import "@/styles/globals.css";
import localFont from "next/font/local";
import type { Metadata } from "next";

import SiteHeader from "@/components/site-header";
import SiteMain from "@/components/layout/site-main";
import SiteFooter from "@/components/site-footer";
import SiteHeroBackground from "@/components/site-hero-background";
import { seoKeywordClusters } from "@/lib/seo/seo-keywords";

const roboto = localFont({
  src: [
    {
      path: "../../public/fonts/Roboto-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ProBrandwacht — Kennis en uitleg",
  description:
    "Onafhankelijk initiatief met uitleg over rollen, verantwoordelijkheden en samenwerking in de brandwachtenmarkt.",
  keywords: [
    ...seoKeywordClusters.core,
    ...seoKeywordClusters.platform,
    ...seoKeywordClusters.positioning,
    ...seoKeywordClusters.niches,
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${roboto.className} relative flex min-h-screen flex-1 flex-col text-slate-50`}>
      <span className="sr-only">Hoofdmenu</span>
      <SiteHeader />
      <SiteHeroBackground>
        <SiteMain>{children}</SiteMain>
      </SiteHeroBackground>
      <SiteFooter />
    </div>
  );
}
