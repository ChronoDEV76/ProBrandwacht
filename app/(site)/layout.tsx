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
  title: "ProBrandwacht.nl – Het alternatieve brandwachtplatform",
  description:
    "Het alternatieve brandwachtplatform: gecertificeerde professionals, duidelijke tarieven en veilige betaling.",
  keywords: [
    "zelfstandige brandwacht inhuren",
    "zelfstandige brandwacht tarieven",
    "brandveiligheid evenementen",
    "industriele zelfstandige brandwacht",
    "platform voor zelfstandige brandwachten",
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
