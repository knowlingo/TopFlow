import { NextRequest, NextResponse } from "next/server"
import { generateSecurityBadge, generateFlatBadge, getGradeFromScore } from "@/lib/badge-generator"
import { getRepoAnalysis } from "@/lib/demo-data/github-repos"

// In-memory cache for badge data (upgrade to Redis/KV for production)
const badgeCache = new Map<string, { grade: string; score: number; timestamp: number }>()
const CACHE_TTL = 1000 * 60 * 60 * 24 // 24 hours

interface RouteContext {
  params: Promise<{
    owner: string
    repo: string
  }>
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { owner, repo } = await context.params
    const { searchParams } = new URL(request.url)
    const style = searchParams.get("style") || "default" // "default" or "flat"

    const repoPath = `${owner}/${repo}`
    const cacheKey = `badge:${repoPath}`

    // Check cache first
    const cached = badgeCache.get(cacheKey)
    const now = Date.now()

    let grade: string
    let score: number

    if (cached && now - cached.timestamp < CACHE_TTL) {
      // Use cached data
      grade = cached.grade
      score = cached.score
    } else {
      // Try to get demo data for this repo
      const demoData = getRepoAnalysis(repoPath)

      if (demoData) {
        // Found demo data
        score = demoData.securityScore
        grade = demoData.grade
      } else {
        // No data - show pending badge
        score = 0
        grade = "?"
      }

      // Cache the result
      badgeCache.set(cacheKey, { grade, score, timestamp: now })
    }

    // Generate SVG badge
    const svg =
      style === "flat"
        ? generateFlatBadge(grade as any, score)
        : generateSecurityBadge(grade as any, score)

    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
        "CDN-Cache-Control": "public, max-age=3600",
        "Vercel-CDN-Cache-Control": "public, max-age=3600",
      },
    })
  } catch (error) {
    console.error("Badge generation error:", error)

    // Return error badge
    const errorSvg = generateSecurityBadge("?", 0)
    return new NextResponse(errorSvg, {
      status: 200, // Return 200 so badge displays
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=60",
      },
    })
  }
}

// Optional: POST endpoint to update badge data (for when scan completes)
export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const { owner, repo } = await context.params
    const body = await request.json()
    const { score } = body

    if (typeof score !== "number" || score < 0 || score > 100) {
      return NextResponse.json({ error: "Invalid score" }, { status: 400 })
    }

    const grade = getGradeFromScore(score)
    const repoPath = `${owner}/${repo}`
    const cacheKey = `badge:${repoPath}`

    // Update cache
    badgeCache.set(cacheKey, {
      grade,
      score,
      timestamp: Date.now(),
    })

    return NextResponse.json({ success: true, grade, score })
  } catch (error) {
    console.error("Badge update error:", error)
    return NextResponse.json({ error: "Failed to update badge" }, { status: 500 })
  }
}
