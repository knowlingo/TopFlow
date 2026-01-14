"use client"

import { useState, useEffect } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Github, Star, GitFork, Search, ExternalLink, Loader2 } from "lucide-react"

interface Repository {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
}

export function ScanMyReposDialog() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [repos, setRepos] = useState<Repository[]>([])
  const [filteredRepos, setFilteredRepos] = useState<Repository[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (session?.accessToken && open) {
      fetchRepositories()
    }
  }, [session, open])

  useEffect(() => {
    // Filter repos based on search query
    if (searchQuery.trim() === "") {
      setFilteredRepos(repos)
    } else {
      const filtered = repos.filter(
        (repo) =>
          repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      setFilteredRepos(filtered)
    }
  }, [searchQuery, repos])

  const fetchRepositories = async () => {
    if (!session?.accessToken) return

    setIsLoading(true)
    try {
      const response = await fetch("https://api.github.com/user/repos?per_page=100&sort=updated", {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          Accept: "application/vnd.github.v3+json",
        },
      })

      if (response.ok) {
        const data = await response.json()
        setRepos(data)
        setFilteredRepos(data)
      } else {
        console.error("Failed to fetch repositories:", response.statusText)
      }
    } catch (error) {
      console.error("Error fetching repositories:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleScanRepo = (repoFullName: string) => {
    setOpen(false)
    router.push(`/builder?template=github-security-scanner&repo=${encodeURIComponent(repoFullName)}`)
  }

  const handleSignIn = async () => {
    await signIn("github")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Github className="h-4 w-4" />
          Scan My Repos
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Github className="h-6 w-6" />
            Scan Your GitHub Repositories
          </DialogTitle>
          <DialogDescription>
            Connect your GitHub account to scan any of your repositories for security vulnerabilities and best
            practices.
          </DialogDescription>
        </DialogHeader>

        {status === "loading" ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : !session ? (
          <div className="flex flex-col items-center justify-center py-12 gap-6">
            <div className="text-center max-w-md">
              <h3 className="text-lg font-semibold mb-2">Sign in with GitHub</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Authorize TopFlow to access your public repositories. We only request read-only access and will never
                modify your code.
              </p>
              <div className="space-y-3">
                <Button onClick={handleSignIn} size="lg" className="w-full gap-2">
                  <Github className="h-5 w-5" />
                  Sign in with GitHub
                </Button>
                <p className="text-xs text-muted-foreground">
                  By signing in, you agree to grant TopFlow read-only access to your public repositories.
                </p>
              </div>
            </div>

            <div className="w-full max-w-md border-t pt-6">
              <h4 className="text-sm font-semibold mb-3">Why connect GitHub?</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>Instantly scan any of your repositories</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>No need to manually enter repo URLs</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>Get security badges for all your projects</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>100% read-only access - we never modify your code</span>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* User Info */}
            <div className="flex items-center justify-between pb-4 border-b">
              <div className="flex items-center gap-3">
                {session.user?.image && (
                  <img src={session.user.image} alt={session.user.name || "User"} className="h-10 w-10 rounded-full" />
                )}
                <div>
                  <p className="font-semibold">{session.user?.name}</p>
                  <p className="text-sm text-muted-foreground">{session.user?.email}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => signOut()}>
                Sign out
              </Button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search repositories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Repository List */}
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : filteredRepos.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                {searchQuery ? "No repositories found matching your search." : "No repositories found."}
              </div>
            ) : (
              <ScrollArea className="h-96">
                <div className="space-y-2">
                  {filteredRepos.map((repo) => (
                    <div
                      key={repo.id}
                      className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-sm truncate">{repo.name}</h4>
                          {repo.language && (
                            <Badge variant="secondary" className="text-xs">
                              {repo.language}
                            </Badge>
                          )}
                        </div>
                        {repo.description && <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{repo.description}</p>}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            {repo.stargazers_count}
                          </span>
                          <span className="flex items-center gap-1">
                            <GitFork className="h-3 w-3" />
                            {repo.forks_count}
                          </span>
                          <span>Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button size="sm" variant="ghost" asChild>
                          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                        <Button size="sm" onClick={() => handleScanRepo(repo.full_name)}>
                          Scan
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
