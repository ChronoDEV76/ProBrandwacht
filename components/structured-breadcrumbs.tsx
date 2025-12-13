// components/structured-breadcrumbs.tsx
import * as React from "react";
import Link from "next/link";

type Crumb = { name: string; url: string };

type Props = {
  items: Crumb[];
  className?: string;
  /** Zet uit als je bewust géén JSON-LD wilt renderen (default: true) */
  schema?: boolean;
};

/** Zorgt dat een URL absoluut is (nodig voor JSON-LD) */
function toAbsoluteUrl(url: string): string {
  try {
    // Al absoluut? Dan zo laten
    new URL(url);
    return url;
  } catch {
    const base =
      process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
      "https://www.probrandwacht.nl";
    return `${base}${url.startsWith("/") ? url : `/${url}`}`;
  }
}

/** Bouwt BreadcrumbList JSON-LD vanuit zichtbare crumbs */
function buildBreadcrumbJsonLd(items: Crumb[]) {
  const itemListElement = items.map((it, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    name: it.name,
    item: toAbsoluteUrl(it.url),
  }));

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };
}

export default function StructuredBreadcrumbs({
  items,
  className,
  schema = true,
}: Props) {
  const jsonLd = React.useMemo(
    () => (schema ? buildBreadcrumbJsonLd(items) : null),
    [items, schema]
  );

  return (
    <>
      {/* Zichtbare breadcrumbs (UI) */}
      <nav aria-label="Breadcrumb" className={["hidden", className].filter(Boolean).join(" ")}>
        <ol className="flex flex-wrap items-center gap-1 text-sm text-slate-600">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={item.url} className="flex items-center gap-1">
                {isLast ? (
                  <span className="font-medium text-slate-900">{item.name}</span>
                ) : (
                  <Link
                    href={item.url}
                    className="underline decoration-slate-300 underline-offset-2 hover:text-slate-900"
                  >
                    {item.name}
                  </Link>
                )}
                {!isLast && <span aria-hidden>›</span>}
              </li>
            );
          })}
        </ol>
      </nav>

      {/* JSON-LD (SEO) — exact gelijk aan de zichtbare crumbs */}
      {jsonLd ? (
        <script
          type="application/ld+json"
          // voorkomt hydration-warnings in Next App Router
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}
    </>
  );
}
