"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"

const mainTabs = [
  { title: "Learn", href: "/docs/learn", id: "learn" },
  { title: "Build", href: "/docs/build", id: "build" },
  { title: "Security", href: "/docs/security", id: "security" },
]

export interface SidebarItem {
  title: string
  href: string
}

export interface SidebarSection {
  title: string
  items: SidebarItem[]
}

interface DocsSidebarWithTabsProps {
  sections: SidebarSection[]
  currentTab: "learn" | "build" | "security"
}

export function DocsSidebarWithTabs({ sections, currentTab }: DocsSidebarWithTabsProps) {
  const pathname = usePathname()
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(sections.map((s) => s.title)))

  const toggleSection = (title: string) => {
    const newOpen = new Set(openSections)
    if (newOpen.has(title)) {
      newOpen.delete(title)
    } else {
      newOpen.add(title)
    }
    setOpenSections(newOpen)
  }

  return (
    <nav className="py-6 space-y-6">
      <div className="px-4 pb-4 border-b border-border">
        <div className="flex gap-1 bg-muted/50 rounded-lg p-1">
          {mainTabs.map((tab) => (
            <Link
              key={tab.id}
              href={tab.href}
              className={cn(
                "flex-1 px-3 py-1.5 text-sm font-medium rounded-md transition-all text-center",
                currentTab === tab.id
                  ? "bg-background text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/50",
              )}
            >
              {tab.title}
            </Link>
          ))}
        </div>
      </div>

      {/* Navigation sections */}
      <div className="px-4 space-y-4">
        {sections.map((section) => {
          const isOpen = openSections.has(section.title)

          return (
            <div key={section.title} className="space-y-1">
              <button
                onClick={() => toggleSection(section.title)}
                className="flex items-center gap-2 w-full px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide hover:text-foreground transition-colors"
              >
                {isOpen ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                {section.title}
              </button>

              {isOpen && (
                <div className="space-y-0.5 pl-1">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "block px-3 py-1.5 rounded-md text-sm transition-colors relative",
                          isActive
                            ? // Fixed highlight to not cover text - using left border instead of full background
                              "text-primary font-medium border-l-2 border-primary bg-primary/5 pl-[10px]"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                        )}
                      >
                        {item.title}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </nav>
  )
}
