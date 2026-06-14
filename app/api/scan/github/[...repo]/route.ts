/**
 * GitHub Repository Security Scanner — REAL scan API (OSV-powered)
 * ================================================================
 * Sibling of the demo route (app/api/demo/github-scan/[...repo]/route.ts).
 * The demo route is left untouched; this one performs a *real* scan using
 * live GitHub + OSV.dev data. Real mode is opt-in (the user enters a repo and
 * their own GitHub token), so demo mode keeps working with zero setup.
 *
 * BYOK / privacy: the GitHub token is read from a per-request header
 * (`x-github-token`), forwarded by the browser from localStorage exactly like
 * the AI provider keys. It is never persisted server-side — consistent with
 * TopFlow's zero-storage model. (A server-side GITHUB_TOKEN env var is honored
 * as a fallback only for self-hosted deployments.)
 *
 * @route GET /api/scan/github/[owner]/[repo]
 * @header x-github-token: <github PAT>   (optional but recommended: 60 -> 5,000 req/hr + private repos)
 * @example GET /api/scan/github/facebook/react
 */
import { NextRequest, NextResponse } from "next/server";
import { scanRepository } from "@/lib/osv/scanner";

export const runtime = "nodejs";
export const maxDuration = 30; // matches the workflow engine's 30s budget

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ repo: string[] }> }
) {
  const { repo } = await params;
  const repoPath = (repo || []).join("/");

  if (!repoPath || !repoPath.includes("/")) {
    return NextResponse.json(
      { error: "Invalid repository path", message: "Expected format: owner/repo", received: repoPath },
      { status: 400 }
    );
  }

  // BYOK token: header first (browser-supplied, not stored), env fallback for self-host.
  const token =
    request.headers.get("x-github-token") ||
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ||
    process.env.GITHUB_TOKEN ||
    undefined;

  const [owner, name] = repoPath.split("/");

  try {
    const result = await scanRepository(owner, name, { githubToken: token });
    // Real results must never be cached (per-repo, per-user, time-sensitive).
    return NextResponse.json(result, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    // 403/rate-limit and private-repo cases surface as actionable 502s.
    const status = /rate limit|forbidden|not found/i.test(message) ? 502 : 500;
    return NextResponse.json({ error: "Scan failed", message }, { status });
  }
}
