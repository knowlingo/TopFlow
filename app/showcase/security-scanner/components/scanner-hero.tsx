"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Shield, ArrowRight, Github } from "lucide-react"
import { ScanMyReposDialog } from "@/components/scan-my-repos-dialog"

export function ScannerHero() {
  const [repoUrl, setRepoUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleQuickScan = () => {
    if (!repoUrl.trim()) return

    setIsLoading(true)
    // Extract repo from GitHub URL
    let repo = repoUrl.trim()
    if (repo.includes("github.com/")) {
      repo = repo.split("github.com/")[1]
      // Remove trailing .git if present
      repo = repo.replace(/\.git$/, "")
      // Remove trailing slash
      repo = repo.replace(/\/$/, "")
    }

    // Navigate to builder with pre-filled repo
    router.push(`/builder?template=github-security-scanner&repo=${encodeURIComponent(repo)}`)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleQuickScan()
    }
  }

  const handleExampleScan = (repo: string) => {
    setRepoUrl(`https://github.com/${repo}`)
    setIsLoading(true)
    router.push(`/builder?template=github-security-scanner&repo=${encodeURIComponent(repo)}`)
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background py-20 sm:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10" />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center p-4 mb-6 bg-primary/10 rounded-full">
            <Shield className="h-12 w-12 text-primary" />
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            Scan Any GitHub Repo in 30 Seconds
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Get a comprehensive security analysis of any GitHub repository. Check for vulnerabilities, dependency issues, and compliance gaps instantly.
          </p>

          {/* Quick Scan Input */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="text"
                placeholder="https://github.com/facebook/react"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 h-14 text-lg"
                disabled={isLoading}
              />
              <Button
                size="lg"
                className="h-14 px-8 text-lg"
                onClick={handleQuickScan}
                disabled={!repoUrl.trim() || isLoading}
              >
                {isLoading ? "Loading..." : "Scan Now"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Or try one of these popular repos:
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-2 mb-4">
              {[
                "facebook/react",
                "vercel/next.js",
                "microsoft/vscode",
                "tensorflow/tensorflow"
              ].map((repo) => (
                <Button
                  key={repo}
                  variant="outline"
                  size="sm"
                  onClick={() => handleExampleScan(repo)}
                  disabled={isLoading}
                  className="text-xs"
                >
                  {repo}
                </Button>
              ))}
            </div>
            {/* Temporarily hidden - will add OAuth Week 2 */}
            {/*
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 border-t" />
              <span className="text-sm text-muted-foreground">or</span>
              <div className="flex-1 border-t" />
            </div>
            <div className="flex justify-center">
              <ScanMyReposDialog />
            </div>
            */}
          </div>

          {/* Social Proof / Stats - ENHANCED */}
          <div className="flex flex-wrap justify-center gap-8 mb-8 text-center">
            <div className="group hover:scale-105 transition-transform">
              <div className="text-3xl font-bold text-primary">30s</div>
              <div className="text-sm text-muted-foreground">Average Scan Time</div>
            </div>
            <div className="group hover:scale-105 transition-transform">
              <div className="text-3xl font-bold text-primary">15+</div>
              <div className="text-sm text-muted-foreground">Security Checks</div>
            </div>
            <div className="group hover:scale-105 transition-transform">
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Free & Open Source</div>
            </div>
            <div className="group hover:scale-105 transition-transform">
              <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                4.2k+
              </div>
              <div className="text-sm text-muted-foreground">Repos Scanned</div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex flex-wrap justify-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1 bg-muted px-3 py-1 rounded-full">
                <Shield className="h-3 w-3 text-green-500" />
                Privacy-First Design
              </span>
              <span className="flex items-center gap-1 bg-muted px-3 py-1 rounded-full">
                <Shield className="h-3 w-3 text-blue-500" />
                No Sign-Up Required
              </span>
              <span className="flex items-center gap-1 bg-muted px-3 py-1 rounded-full">
                <Shield className="h-3 w-3 text-purple-500" />
                Built by Former CISO
              </span>
            </div>
          </div>

          {/* Secondary CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="outline" size="lg" asChild>
              <a href="https://github.com/csupenn/topflow" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" />
                Star on GitHub
              </a>
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <a href="/builder?template=github-security-scanner">
                View the Workflow
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
