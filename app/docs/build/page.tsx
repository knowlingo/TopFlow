import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Boxes, Workflow, Puzzle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { DocsBreadcrumb } from "@/components/docs/docs-breadcrumb"
import { DocsFooter } from "@/components/docs/docs-footer"
import { SidebarPortal } from "@/components/docs/sidebar-portal"

export const metadata = {
  title: "Build with TopFlow - Node Reference & API Documentation",
  description: "Technical documentation for developers. Complete reference for 12 node types, workflow patterns, API docs, and integration guides.",
}

export default function BuildOverviewPage() {
  return (
    <>
      <SidebarPortal currentTab="build" />

      <div className="space-y-8">
        <DocsBreadcrumb />

        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-balance">Build with TopFlow</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-3xl">
            Technical documentation for developers. Comprehensive node references, API docs, workflow patterns, and
            integration guides.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Node Reference */}
          <Link href="/docs/build/nodes">
            <Card className="h-full border-2 hover:border-primary/50 transition-all group">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <Boxes className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">Node Reference</CardTitle>
                <CardDescription>Complete guide to all 10 node types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Detailed documentation for every node type including configuration options, input/output schemas,
                    and usage examples.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-500">Start</span>
                    <span className="text-xs px-2 py-1 rounded-md bg-chart-1/10 text-chart-1">Text Model</span>
                    <span className="text-xs px-2 py-1 rounded-md bg-chart-5/10 text-chart-5">Image Gen</span>
                    <span className="text-xs px-2 py-1 rounded-md bg-blue-500/10 text-blue-500">HTTP</span>
                    <span className="text-xs px-2 py-1 rounded-md bg-chart-4/10 text-chart-4">Conditional</span>
                    <span className="text-xs px-2 py-1 rounded-md bg-chart-3/10 text-chart-3">+5 more</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Workflow Patterns */}
          <Link href="/docs/build/workflows">
            <Card className="h-full border-2 hover:border-primary/50 transition-all group">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-chart-2/10 flex items-center justify-center mb-3 group-hover:bg-chart-2/20 transition-colors">
                  <Workflow className="h-5 w-5 text-chart-2" />
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">Workflow Patterns</CardTitle>
                <CardDescription>Common architectural patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-chart-2" />
                    Sequential processing
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-chart-2" />
                    Parallel execution
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-chart-2" />
                    Conditional branching
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-chart-2" />
                    Error recovery patterns
                  </li>
                </ul>
              </CardContent>
            </Card>
          </Link>

          {/* API Reference */}
          <Link href="/docs/build/api">
            <Card className="h-full border-2 hover:border-primary/50 transition-all group">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-chart-4/10 flex items-center justify-center mb-3 group-hover:bg-chart-4/20 transition-colors">
                  <Code className="h-5 w-5 text-chart-4" />
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">API Reference</CardTitle>
                <CardDescription>Technical API documentation</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-chart-4" />
                    Workflow execution API
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-chart-4" />
                    Node configuration schemas
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-chart-4" />
                    Export formats
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-chart-4" />
                    Type definitions
                  </li>
                </ul>
              </CardContent>
            </Card>
          </Link>

          {/* Integration Guide */}
          <Link href="/docs/build/integrations">
            <Card className="h-full border-2 hover:border-primary/50 transition-all group">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-chart-3/10 flex items-center justify-center mb-3 group-hover:bg-chart-3/20 transition-colors">
                  <Puzzle className="h-5 w-5 text-chart-3" />
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">Integration Guide</CardTitle>
                <CardDescription>Connect external services and APIs</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-chart-3" />
                    OpenAI, Anthropic, Gemini
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-chart-3" />
                    Custom HTTP endpoints
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-chart-3" />
                    Webhook integrations
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-chart-3" />
                    Authentication patterns
                  </li>
                </ul>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Code Export Info */}
        <Card className="bg-gradient-to-br from-primary/5 to-transparent border-2">
          <CardHeader>
            <CardTitle>Export Production-Ready Code</CardTitle>
            <CardDescription>Generate AI SDK code from your workflows</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              TopFlow automatically generates clean, type-safe code using the Vercel AI SDK. Export your workflows as
              standalone functions ready for deployment.
            </p>
            <div className="flex gap-3">
              <Link href="/docs/build/api">
                <span className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                  Learn about exports <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            </div>
          </CardContent>
        </Card>

        <DocsFooter
          prevPage={{
            title: "Learn Section",
            href: "/docs/learn",
          }}
          nextPage={{
            title: "Node Reference",
            href: "/docs/build/nodes",
          }}
        />
      </div>
    </>
  )
}
