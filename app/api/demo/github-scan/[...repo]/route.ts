/**
 * GitHub Repository Security Scanner - Demo API
 *
 * Serves mock security analysis data for demo mode
 * Avoids GitHub API rate limiting by using pre-loaded data
 *
 * @route GET /api/demo/github-scan/[owner]/[repo]
 * @example GET /api/demo/github-scan/facebook/react
 */

import { NextRequest, NextResponse } from "next/server"
import { getRepoAnalysis, type RepoAnalysis } from "@/lib/demo-data/github-repos"

export async function GET(
  request: NextRequest,
  { params }: { params: { repo: string[] } }
) {
  try {
    // Parse repository path from URL segments
    const repoPath = params.repo.join("/")

    // Validate repository path format (owner/repo)
    if (!repoPath || !repoPath.includes("/")) {
      return NextResponse.json(
        {
          error: "Invalid repository path",
          message: "Expected format: owner/repo",
          received: repoPath
        },
        { status: 400 }
      )
    }

    // Add realistic delay to simulate API call (800ms)
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Get analysis (pre-loaded or dynamically generated)
    const analysis: RepoAnalysis = getRepoAnalysis(repoPath)

    // Return JSON response
    return NextResponse.json(analysis, {
      headers: {
        "Content-Type": "application/json",
        // Cache for 1 hour
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200"
      }
    })
  } catch (error) {
    console.error("Error in github-scan demo API:", error)

    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    )
  }
}

// Cache revalidation time (1 hour in seconds)
export const revalidate = 3600
