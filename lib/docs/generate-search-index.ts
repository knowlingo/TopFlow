/**
 * Dynamic Search Index Generator
 *
 * Generates searchable content from navigation data automatically.
 * No need to manually update search indexes when adding new pages.
 */

import { docsNavigation, learnSidebar, buildSidebar, securitySidebar, type NavItem, type NavSection } from './navigation-data'

export interface SearchResult {
  title: string
  href: string
  description?: string
  section: string
}

/**
 * Determines which section a URL belongs to
 */
function getSectionFromHref(href: string): string {
  if (href.startsWith('/docs/learn')) return 'Learn'
  if (href.startsWith('/docs/build')) return 'Build'
  if (href.startsWith('/docs/security')) return 'Security'
  return 'Docs'
}

/**
 * Extracts search results from a navigation section
 */
function extractFromNavSection(section: NavSection): SearchResult[] {
  const results: SearchResult[] = []

  // Add the section itself
  results.push({
    title: section.title,
    href: section.href,
    description: `${section.title} section overview`,
    section: section.title,
  })

  // Add all items in the section
  if (section.items) {
    section.items.forEach((item) => {
      results.push({
        title: item.title,
        href: item.href,
        description: item.description || `Learn about ${item.title}`,
        section: section.title,
      })
    })
  }

  return results
}

/**
 * Extracts search results from sidebar navigation items
 */
function extractFromSidebar(items: NavItem[], sectionName: string): SearchResult[] {
  return items
    .filter((item) => item.href !== `/docs/${sectionName.toLowerCase()}`) // Skip overview (already in main nav)
    .map((item) => ({
      title: item.title,
      href: item.href,
      description: item.description || `Documentation for ${item.title}`,
      section: sectionName,
    }))
}

/**
 * Generates comprehensive search index from all navigation data
 */
export function generateSearchIndex(): SearchResult[] {
  const results: SearchResult[] = []

  // Extract from main navigation
  docsNavigation.forEach((section) => {
    results.push(...extractFromNavSection(section))
  })

  // Extract additional items from sidebars (that aren't in main nav)
  const mainNavUrls = new Set(results.map((r) => r.href))

  // Learn sidebar
  const learnItems = extractFromSidebar(learnSidebar, 'Learn').filter(
    (item) => !mainNavUrls.has(item.href)
  )
  results.push(...learnItems)

  // Build sidebar
  const buildItems = extractFromSidebar(buildSidebar, 'Build').filter(
    (item) => !mainNavUrls.has(item.href)
  )
  results.push(...buildItems)

  // Security sidebar
  const securityItems = extractFromSidebar(securitySidebar, 'Security').filter(
    (item) => !mainNavUrls.has(item.href)
  )
  results.push(...securityItems)

  // Remove duplicates based on href
  const uniqueResults = Array.from(
    new Map(results.map((item) => [item.href, item])).values()
  )

  // Sort alphabetically by title within each section
  uniqueResults.sort((a, b) => {
    if (a.section === b.section) {
      return a.title.localeCompare(b.title)
    }
    // Order sections: Learn, Build, Security
    const sectionOrder = { Learn: 1, Build: 2, Security: 3, Docs: 4 }
    return sectionOrder[a.section as keyof typeof sectionOrder] - sectionOrder[b.section as keyof typeof sectionOrder]
  })

  return uniqueResults
}

/**
 * Pre-generated search index (computed at module load time)
 * This is a constant that gets tree-shaken in production builds
 */
export const searchIndex = generateSearchIndex()

/**
 * Enhanced search with keyword matching
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
