// app/(site)/layout.tsx
import "@/styles/globals.css";
import localFont from "next/font/local";
import type { Metadata } from "next";

import SiteHeader from "@/components/site-header";
import SiteMain from "@/components/layout/site-main";
import SiteFooter from "@/components/site-footer";

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
  title:
    "ProBrandwacht.nl | Kennisplatform voor zelfstandige brandwachten – 1-op-1 samenwerken binnen Wet DBA",
  description:
    "Inzicht, context en ondersteuning voor bewust zelfstandig werken. Voor brandwachten en opdrachtgevers die 1-op-1 willen samenwerken binnen Wet DBA (zonder bureau).",
  keywords: [
    "wet dba brandwacht",
    "dba-bewust samenwerken",
    "werken binnen wet dba",
    "brandveiligheid evenementen",
    "industriële brandwacht",
    "platform voor zelfstandige brandwachten",
    "kennisplatform brandwacht",
    "zelfstandig werken brandwacht",
    "probrandwacht",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${roboto.className} relative flex min-h-screen flex-1 flex-col text-slate-50`}>
      <span className="sr-only">Hoofdmenu ProBrandwacht</span>
      <SiteHeader />
      <SiteMain>{children}</SiteMain>
      <SiteFooter />
    </div>
  );
}
