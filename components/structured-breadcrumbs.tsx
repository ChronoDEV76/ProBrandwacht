import Link from 'next/link'

type BreadcrumbItem = {
  name: string
  url: string
}

type StructuredBreadcrumbsProps = {
  items: BreadcrumbItem[]
  className?: string
  includeJsonLd?: boolean
}

export default function StructuredBreadcrumbs({ items, className = 'text-xs text-slate-500', includeJsonLd = true }: StructuredBreadcrumbsProps) {
  if (!items || items.length === 0) return null

  const jsonLd = includeJsonLd
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }
    : null

  return (
    <>
      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex flex-wrap items-center gap-1">
          {items.map((item, index) => {
            const isLast = index === items.length - 1
            return (
              <li key={item.url} className="inline-flex items-center gap-1">
                {!isLast ? (
                  <Link href={item.url} className="hover:text-brand-700">
                    {item.name}
                  </Link>
                ) : (
                  <span aria-current="page" className="font-medium text-slate-700">
                    {item.name}
                  </span>
                )}
                {!isLast && <span className="text-slate-400">/</span>}
              </li>
            )
          })}
        </ol>
      </nav>
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
    </>
  )
}
