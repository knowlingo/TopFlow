"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { ArrowRight, ArrowLeft, Calendar, Clock, Tag } from "lucide-react"
import { blogPosts } from "@/lib/blog/blog-data"
import { BlogListSchema } from "@/components/blog/blog-schema"
import { BlogControls } from "@/components/blog/blog-controls"
import { BlogFilters } from "@/components/blog/blog-filters"
import { BlogListView } from "@/components/blog/blog-list-view"
import { BlogEmptyState } from "@/components/blog/blog-empty-state"
import {
  filterPostsByCategory,
  searchPosts,
  sortPosts,
  getCategoryCount,
  BLOG_CATEGORIES,
  type ViewMode,
  type SortOption,
} from "@/lib/blog/blog-utils"

export default function BlogPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [sortBy, setSortBy] = useState<SortOption>("newest")
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  // Load view preference from localStorage
  useEffect(() => {
    const savedView = localStorage.getItem("topflow-blog-view") as ViewMode | null
    if (savedView) setViewMode(savedView)

    const savedSort = localStorage.getItem("topflow-blog-sort") as SortOption | null
    if (savedSort) setSortBy(savedSort)
  }, [])

  // Save view preference
  useEffect(() => {
    localStorage.setItem("topflow-blog-view", viewMode)
  }, [viewMode])

  // Save sort preference
  useEffect(() => {
    localStorage.setItem("topflow-blog-sort", sortBy)
  }, [sortBy])

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  // Apply filters and sorting
  const filteredPosts = useMemo(() => {
    let posts = [...blogPosts]

    // Apply category filter
    posts = filterPostsByCategory(posts, activeCategory)

    // Apply search
    posts = searchPosts(posts, debouncedSearch)

    // Apply sorting
    posts = sortPosts(posts, sortBy)

    return posts
  }, [activeCategory, debouncedSearch, sortBy])

  // Calculate category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    BLOG_CATEGORIES.forEach((category) => {
      counts[category.id] = getCategoryCount(blogPosts, category.id)
    })
    return counts
  }, [])

  const handleClearFilters = () => {
    setActiveCategory("all")
    setSearchQuery("")
    setDebouncedSearch("")
  }

  const featuredPost = sortBy === "newest" && activeCategory === "all" && !debouncedSearch ? filteredPosts[0] : null
  const displayPosts = featuredPost ? filteredPosts.slice(1) : filteredPosts

  return (
    <div className="min-h-screen bg-background">
      <BlogListSchema />

      {/* Header */}
      <div className="border-b border-border bg-panel">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Builder
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-3">Blog</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Insights on AI security, workflow automation, and compliance from{" "}
            <a
              href="https://charliesu.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Charlie Su
            </a>
            , former CISO and creator of TopFlow.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Controls */}
        <BlogControls
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          sortBy={sortBy}
          onSortChange={setSortBy}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Filters */}
        <BlogFilters
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          categoryCounts={categoryCounts}
          totalPosts={blogPosts.length}
          filteredCount={filteredPosts.length}
          searchQuery={debouncedSearch}
          onClearFilters={handleClearFilters}
        />

        {/* Featured Post (only show in default state) */}
        {featuredPost && (
          <Link href={`/blog/${featuredPost.slug}`} className="block group mb-16">
            <div className="bg-card border border-border rounded-lg p-8 hover:border-primary transition-all duration-200">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-semibold text-primary uppercase tracking-wide">Featured</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{featuredPost.category}</span>
              </div>

              <h2 className="text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                {featuredPost.title}
              </h2>

              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">{featuredPost.excerpt}</p>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{featuredPost.publishedAt}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{featuredPost.readTime}</span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Empty State */}
        {displayPosts.length === 0 && <BlogEmptyState onClearFilters={handleClearFilters} />}

        {/* Posts Display */}
        {displayPosts.length > 0 && (
          <>
            {viewMode === "list" ? (
              <BlogListView posts={displayPosts} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayPosts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                    <div className="bg-card border border-border rounded-lg p-6 h-full hover:border-primary transition-all duration-200">
                      <div className="flex items-center gap-2 mb-3">
                        <Tag className="w-3.5 h-3.5 text-primary" />
                        <span className="text-xs text-muted-foreground">{post.category}</span>
                      </div>

                      <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors leading-snug">
                        {post.title}
                      </h3>

                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">{post.excerpt}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{post.publishedAt}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>

                        <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
