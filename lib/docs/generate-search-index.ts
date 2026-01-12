/**
 * Dynamic Search Index Generator
 *
 * Generates searchable content from unified navigation data automatically.
 * No need to manually update search indexes when adding new pages.
 */

import { getAllNavItems, getCategoryOverviews } from './unified-navigation'

export interface SearchResult {
  title: string
  href: string
  description?: string
  section: string
}

/**
 * Generates comprehensive search index from unified navigation data
 */
export function generateSearchIndex(): SearchResult[] {
  const results: SearchResult[] = []

  // Add category overview pages
  const categories = getCategoryOverviews()
  categories.forEach((cat) => {
    results.push({
      title: cat.title,
      href: cat.href,
      description: cat.description,
      section: cat.title,
    })
  })

  // Add all navigation items
  const allItems = getAllNavItems()
  allItems.forEach((item) => {
    // Skip if it's a category overview (already added above)
    if (!categories.some((cat) => cat.href === item.href)) {
      results.push({
        title: item.title,
        href: item.href,
        description: item.description || `Documentation for ${item.title}`,
        section: item.section,
      })
    }
  })

  // Remove duplicates based on href
  const uniqueResults = Array.from(
    new Map(results.map((item) => [item.href, item])).values()
  )

  // Sort alphabetically by title within each section
  uniqueResults.sort((a, b) => {
    const sectionA = a.section || ''
    const sectionB = b.section || ''

    if (sectionA === sectionB) {
      return a.title.localeCompare(b.title)
    }

    // Order sections: Learn, Build, Security, then others
    const sectionOrder: Record<string, number> = {
      Learn: 1,
      Build: 2,
      Security: 3
    }
    const orderA = sectionOrder[sectionA] || 99
    const orderB = sectionOrder[sectionB] || 99
    return orderA - orderB
  })

  return uniqueResults
}

/**
 * Pre-generated search index (computed at module load time)
 * This is a constant that gets tree-shaken in production builds
 */
export const searchIndex = generateSearchIndex()

/**
 * Enhanced search with keyword matching and relevance scoring
 * Returns results sorted by relevance
 */
export function searchDocs(query: string): SearchResult[] {
  if (!query || query.trim().length === 0) {
    return []
  }

  const lowercaseQuery = query.toLowerCase().trim()
  const keywords = lowercaseQuery.split(/\s+/)

  // Score each result based on matches
  const scoredResults = searchIndex.map((result) => {
    const titleLower = result.title.toLowerCase()
    const descriptionLower = (result.description || '').toLowerCase()
    const sectionLower = result.section.toLowerCase()

    let score = 0

    // Exact title match = highest score
    if (titleLower === lowercaseQuery) {
      score += 100
    }

    // Title starts with query = high score
    if (titleLower.startsWith(lowercaseQuery)) {
      score += 50
    }

    // Title contains query = medium score
    if (titleLower.includes(lowercaseQuery)) {
      score += 25
    }

    // Description contains query = low score
    if (descriptionLower.includes(lowercaseQuery)) {
      score += 10
    }

    // Section matches = bonus
    if (sectionLower.includes(lowercaseQuery)) {
      score += 5
    }

    // Keyword matching (all keywords must match somewhere)
    const allKeywordsMatch = keywords.every(
      (keyword) =>
        titleLower.includes(keyword) ||
        descriptionLower.includes(keyword) ||
        sectionLower.includes(keyword)
    )

    if (allKeywordsMatch && keywords.length > 1) {
      score += keywords.length * 3
    }

    return { result, score }
  })

  // Filter to only results with score > 0, sort by score descending
  return scoredResults
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ result }) => result)
    .slice(0, 12) // Limit to top 12 results
}
