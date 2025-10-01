// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ProBrandwacht",
  description: "ProSafetyMatch – aanmeldingen",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className="h-full">
      <body className="min-h-screen bg-gradient-to-b from-brand-50 to-white text-slate-800">
        {children}
      </body>
    </html>
  );
}
