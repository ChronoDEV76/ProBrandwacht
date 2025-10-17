import Link from 'next/link'

type BreadcrumbItem = {
  name: string
  url: string
}

type StructuredBreadcrumbsProps = {
  items: BreadcrumbItem[]
}

export default function StructuredBreadcrumbs({ items }: StructuredBreadcrumbsProps) {
  if (!items || items.length === 0) return null

  return (
    <nav aria-label="Breadcrumb" className="text-xs text-slate-500">
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
  )
}
