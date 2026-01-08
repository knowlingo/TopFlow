"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Search, ArrowRight, FileText } from "lucide-react"
import { docsNavigation } from "@/lib/docs/navigation-data"
import { searchDocs } from "@/lib/docs/generate-search-index"
import type { SearchResult } from "@/lib/docs/generate-search-index"

export function DocsSearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const router = useRouter()

  // Keyboard shortcut: Cmd+K or Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  // Search using dynamic index with relevance scoring
  const results = useMemo(() => {
    if (!query) return []
    return searchDocs(query).slice(0, 8) // Limit to 8 results
  }, [query])

  const handleSelect = (href: string) => {
    setOpen(false)
    setQuery("")
    router.push(href)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl p-0 bg-panel border-2 border-border">
        <div className="flex items-center border-b border-border px-4 py-3">
          <Search className="h-5 w-5 text-muted-foreground mr-3" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documentation..."
            className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
            autoFocus
          />
          <kbd className="hidden md:inline-block px-2 py-1 text-xs rounded bg-muted text-muted-foreground border border-border">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {query && results.length === 0 && (
            <div className="py-8 text-center text-sm text-muted-foreground">No results found for "{query}"</div>
          )}

          {query && results.length > 0 && (
            <div className="py-2">
              {results.map((result, index) => (
                <button
                  key={result.href}
                  onClick={() => handleSelect(result.href)}
                  className="w-full px-4 py-3 text-left hover:bg-accent transition-colors group flex items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <FileText className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {result.title}
                      </div>
                      {result.description && (
                        <div className="text-xs text-muted-foreground truncate">{result.description}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-muted-foreground">{result.section}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </button>
              ))}
            </div>
          )}

          {!query && (
            <div className="py-8 px-4 space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Quick Links</div>
              <div className="space-y-1">
                {docsNavigation.map((section) => (
                  <button
                    key={section.href}
                    onClick={() => handleSelect(section.href)}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-accent rounded-md transition-colors flex items-center justify-between group"
                  >
                    <span className="text-foreground">{section.title}</span>
                    <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border px-4 py-2 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border">↓</kbd>
              <span>Navigate</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border">↵</kbd>
              <span>Select</span>
            </div>
          </div>
          <div>
            Press <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border">ESC</kbd> to close
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
