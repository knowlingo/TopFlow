"use client"

import { Search } from "lucide-react"

interface BlogEmptyStateProps {
  onClearFilters: () => void
}

export function BlogEmptyState({ onClearFilters }: BlogEmptyStateProps) {
  return (
    <div className="text-center py-16">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-full mb-4">
        <Search className="w-8 h-8 text-muted-foreground" />
      </div>

      <h3 className="text-xl font-semibold text-foreground mb-2">No posts found</h3>
      <p className="text-muted-foreground mb-6">Try adjusting your filters or search query</p>

      <button
        onClick={onClearFilters}
        className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
      >
        Clear All Filters
      </button>
    </div>
  )
}
