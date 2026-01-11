"use client"

import { BLOG_CATEGORIES } from "@/lib/blog/blog-utils"
import { X } from "lucide-react"

interface BlogFiltersProps {
  activeCategory: string
  onCategoryChange: (category: string) => void
  categoryCounts: Record<string, number>
  totalPosts: number
  filteredCount: number
  searchQuery: string
  onClearFilters: () => void
}

export function BlogFilters({
  activeCategory,
  onCategoryChange,
  categoryCounts,
  totalPosts,
  filteredCount,
  searchQuery,
  onClearFilters,
}: BlogFiltersProps) {
  const hasActiveFilters = activeCategory !== "all" || searchQuery !== ""

  return (
    <div className="mb-8">
      {/* Category Tabs */}
      <div className="flex items-center gap-1 border-b border-border mb-4 overflow-x-auto">
        {BLOG_CATEGORIES.map((category) => {
          const count = categoryCounts[category.id] || 0
          const isActive = activeCategory === category.id

          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors relative ${
                isActive
                  ? "text-foreground border-b-2 border-primary -mb-[1px]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {category.label}
              <span className={`ml-2 ${isActive ? "text-primary" : "text-muted-foreground"}`}>({count})</span>
            </button>
          )
        })}
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {filteredCount === totalPosts ? (
            <span>Showing {totalPosts} posts</span>
          ) : (
            <span>
              Showing {filteredCount} of {totalPosts} posts
              {activeCategory !== "all" && (
                <span>
                  {" "}
                  • Filtered by <span className="text-primary font-medium">{activeCategory}</span>
                </span>
              )}
              {searchQuery && (
                <span>
                  {" "}
                  • Searching for <span className="text-primary font-medium">"{searchQuery}"</span>
                </span>
              )}
            </span>
          )}
        </div>

        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
            Clear filters
          </button>
        )}
      </div>
    </div>
  )
}
