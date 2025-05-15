import * as React from "react"
import { ChevronRight, LucideIcon } from "lucide-react"
import Link from "next/link"

import { cn } from "@/lib/utils"

interface BreadcrumbProps extends React.ComponentPropsWithoutRef<"nav"> {
  segments: {
    title: string
    href: string
  }[]
  separator?: LucideIcon
  className?: string
}

export function Breadcrumb({
  segments,
  separator: Separator = ChevronRight,
  className,
  ...props
}: BreadcrumbProps) {
  return (
    <nav
      aria-label="breadcrumbs"
      className={cn(
        "inline-flex items-center gap-2 text-sm font-medium text-muted-foreground/80",
        className
      )}
      {...props}
    >
      {segments.map((segment, index) => {
        const isLast = index === segments.length - 1
        return (
          <React.Fragment key={segment.href}>
            {index === 0 ? null : (
              <Separator className="h-3.5 w-3.5 text-muted-foreground/40" />
            )}
            <Link
              href={segment.href}
              className={cn(
                "transition-colors hover:text-foreground",
                isLast && "text-foreground pointer-events-none"
              )}
              aria-current={isLast ? "page" : undefined}
            >
              {segment.title}
            </Link>
          </React.Fragment>
        )
      })}
    </nav>
  )
}
