"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export interface TOCItem {
  id: string
  title: string
  level: number
}

interface TableOfContentsProps {
  items: TOCItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null

    const observer = new IntersectionObserver(
      (entries) => {
        // Debounce the state update to prevent rapid fire updates during scroll
        if (timeoutId) {
          clearTimeout(timeoutId)
        }

        timeoutId = setTimeout(() => {
          const intersectingEntry = entries.find((entry) => entry.isIntersecting)
          if (intersectingEntry) {
            setActiveId(intersectingEntry.target.id)
          }
        }, 100)
      },
      {
        rootMargin: "0% 0% -80% 0%",
        threshold: 0.5,
      },
    )

    // Batch DOM queries
    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)

    elements.forEach((element) => observer.observe(element))

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      observer.disconnect()
    }
  }, [items])

  if (items.length === 0) {
    return null
  }

  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-foreground mb-4">On this page</p>
      <nav className="space-y-1">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              "block py-1 text-sm transition-colors hover:text-foreground",
              item.level === 2 && "pl-0",
              item.level === 3 && "pl-4",
              item.level === 4 && "pl-8",
              activeId === item.id ? "text-primary font-medium" : "text-muted-foreground",
            )}
            onClick={(e) => {
              e.preventDefault()
              const element = document.getElementById(item.id)
              if (element) {
                const top = element.getBoundingClientRect().top + window.scrollY - 80
                window.scrollTo({ top, behavior: "smooth" })
              }
            }}
          >
            {item.title}
          </a>
        ))}
      </nav>
    </div>
  )
}
