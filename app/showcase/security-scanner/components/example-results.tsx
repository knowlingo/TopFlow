"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, TrendingUp, Shield, Share2 } from "lucide-react"

export function ExampleResults() {
  const examples = [
    {
      repo: "facebook/react",
      description: "A JavaScript library for building user interfaces",
      grade: "A+",
      score: 95,
      stars: "220k",
      highlights: ["Excellent test coverage", "Strong security practices", "Active maintenance"],
      color: "text-green-500 border-green-500"
    },
    {
      repo: "vercel/next.js",
      description: "The React Framework for Production",
      grade: "A",
      score: 92,
      stars: "120k",
      highlights: ["Great documentation", "Security-first design", "Regular updates"],
      color: "text-green-500 border-green-500"
    },
    {
      repo: "microsoft/vscode",
      description: "Visual Studio Code",
      grade: "A",
      score: 90,
      stars: "158k",
      highlights: ["Comprehensive testing", "Security policy", "Active community"],
      color: "text-green-500 border-green-500"
    },
    {
      repo: "tensorflow/tensorflow",
      description: "An Open Source Machine Learning Framework",
      grade: "B+",
      score: 87,
      stars: "183k",
      highlights: ["Strong architecture", "Good practices", "Some outdated deps"],
      color: "text-blue-500 border-blue-500"
    },
    {
      repo: "angular/angular",
      description: "The modern web developer's platform",
      grade: "A-",
      score: 88,
      stars: "94k",
      highlights: ["Solid security", "Well documented", "CI/CD configured"],
      color: "text-green-500 border-green-500"
    },
    {
      repo: "vuejs/core",
      description: "Vue.js is a progressive JavaScript framework",
      grade: "A",
      score: 91,
      stars: "44k",
      highlights: ["Excellent code quality", "Security focus", "Modern practices"],
      color: "text-green-500 border-green-500"
    }
  ]

  return (
    <div className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full mb-4 text-sm font-semibold">
              <TrendingUp className="h-4 w-4" />
              Live Leaderboard
            </div>
            <h2 className="text-4xl font-bold mb-4">Can You Beat These Scores?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Top open source projects and their security grades. Think your repo is more secure? <strong>Prove it!</strong>
            </p>
          </div>

          {/* Examples Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {examples.map((example, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">
                        {example.repo.split("/")[1]}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {example.repo}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${example.color.split(" ")[0]}`}>
                        {example.grade}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {example.score}/100
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {example.description}
                  </p>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Stars */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <TrendingUp className="h-4 w-4" />
                    <span>{example.stars} stars</span>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-1">
                    {example.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span className="text-muted-foreground">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    asChild
                  >
                    <a
                      href={`/builder?template=github-security-scanner&repo=${encodeURIComponent(example.repo)}`}
                      className="flex items-center justify-center gap-2"
                    >
                      Scan This Repo
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Competitive CTA - ENHANCED */}
          <div className="mt-12">
            <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-background">
              <CardContent className="py-8">
                <div className="text-center max-w-2xl mx-auto">
                  <h3 className="text-2xl font-bold mb-3">Think Your Repo Is More Secure?</h3>
                  <p className="text-muted-foreground mb-6">
                    Scan your repository and share your score. Challenge your peers, showcase your security practices,
                    or discover areas for improvement.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button size="lg" asChild>
                      <a href="#top" className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Scan My Repository
                      </a>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <a
                        href="https://twitter.com/intent/tweet?text=I%20just%20scanned%20my%20GitHub%20repo%20with%20%40TopFlowDev%20Security%20Scanner!%20Check%20your%20repo%27s%20security%20score%3A%20https%3A%2F%2Ftopflow.dev%2Fshowcase%2Fsecurity-scanner"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Share2 className="h-5 w-5" />
                        Share on Twitter
                      </a>
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    Free forever • No sign-up required • Get results in 30 seconds
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
