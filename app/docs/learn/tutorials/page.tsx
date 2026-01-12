import { DocsBreadcrumb } from "@/components/docs/docs-breadcrumb"
import { DocsFooter } from "@/components/docs/docs-footer"
import { SidebarPortal } from "@/components/docs/sidebar-portal"
import { TOCPortal } from "@/components/docs/toc-portal"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  Lightbulb,
  ShieldCheck,
  MessageSquare,
  FileText,
  GitCompare,
  Clock,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
} from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Tutorials - Step-by-Step TopFlow Workflow Guides",
  description: "Hands-on tutorials for building secure AI workflows with TopFlow. From beginner to advanced patterns.",
}

export default function TutorialsPage() {
  const tocItems = [
    { id: "getting-started", title: "Getting Started", level: 2 },
    { id: "beginner", title: "Beginner Tutorials", level: 2 },
    { id: "intermediate", title: "Intermediate Tutorials", level: 2 },
    { id: "advanced", title: "Advanced Tutorials", level: 2 },
  ]

  return (
    <>
      <SidebarPortal sections={learnSidebar} />
      <TOCPortal items={tocItems} />

      <div className="space-y-8">
        <DocsBreadcrumb />

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Lightbulb className="h-8 w-8 text-chart-4" />
            <h1 className="text-4xl font-bold text-balance">Step-by-Step Tutorials</h1>
          </div>
          <p className="text-lg text-muted-foreground text-pretty">
            Learn by building real-world AI applications. Each tutorial walks you through creating a complete workflow
            from start to finish, with security best practices included.
          </p>
        </div>

        <Alert className="bg-chart-4/5 border-chart-4">
          <Lightbulb className="h-4 w-4 text-chart-4" />
          <AlertDescription>
            <strong>Hands-on learning:</strong> Each tutorial includes a downloadable workflow template, step-by-step
            instructions, and a video walkthrough.
          </AlertDescription>
        </Alert>

        {/* Getting Started */}
        <div id="getting-started" className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Getting Started with Tutorials</h2>
            <p className="text-sm text-muted-foreground">
              Before diving into tutorials, make sure you've completed the{" "}
              <Link href="/docs/learn/quick-start" className="text-primary underline">
                Quick Start Guide
              </Link>{" "}
              and understand the{" "}
              <Link href="/docs/learn/core-concepts" className="text-primary underline">
                Core Concepts
              </Link>
              .
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <Card className="bg-muted/30">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">Time Estimates</p>
                    <p className="text-xs text-muted-foreground">
                      Each tutorial includes an estimated completion time (15-45 minutes)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/30">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">Difficulty Levels</p>
                    <p className="text-xs text-muted-foreground">
                      Tutorials are tagged as Beginner, Intermediate, or Advanced
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/30">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">Prerequisites</p>
                    <p className="text-xs text-muted-foreground">
                      Each tutorial lists required knowledge and API keys upfront
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Beginner Tutorials */}
        <div id="beginner" className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Beginner Tutorials</h2>
            <p className="text-sm text-muted-foreground">
              Start here if you're new to TopFlow. These tutorials cover fundamental patterns and concepts.
            </p>
          </div>

          <div className="grid gap-4">
            {/* Tutorial 1 */}
            <Link href="/docs/learn/first-workflow">
              <Card className="border-2 hover:border-primary/50 transition-all group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500">
                          Beginner
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          15 min
                        </Badge>
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        Your First AI Workflow
                      </CardTitle>
                      <CardDescription>
                        Build a simple text summarization workflow using OpenAI's GPT-4
                      </CardDescription>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">
                      Start Node
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Text Model
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      End Node
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Tutorial 2 */}
            <Link href="/docs/learn/data-processing">
              <Card className="border-2 hover:border-primary/50 transition-all group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500">
                          Beginner
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          20 min
                        </Badge>
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        Data Processing Pipeline
                      </CardTitle>
                      <CardDescription>
                        Transform and validate data using JavaScript nodes and structured outputs
                      </CardDescription>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">
                      HTTP Request
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      JavaScript
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Structured Output
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Tutorial 3 */}
            <Link href="/docs/learn/api-integration">
              <Card className="border-2 hover:border-primary/50 transition-all group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500">
                          Beginner
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          25 min
                        </Badge>
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">API Integration</CardTitle>
                      <CardDescription>
                        Connect to external APIs and process responses with AI models
                      </CardDescription>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">
                      HTTP Request
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Conditional
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Text Model
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Intermediate Tutorials */}
        <div id="intermediate" className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Intermediate Tutorials</h2>
            <p className="text-sm text-muted-foreground">
              Build more complex workflows with multiple AI models, branching logic, and error handling.
            </p>
          </div>

          <div className="grid gap-4">
            {/* Tutorial 4 */}
            <Card className="border-2 hover:border-chart-4/50 transition-all group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-lg bg-chart-4/10 flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="h-6 w-6 text-chart-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500">
                          Intermediate
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          35 min
                        </Badge>
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        Content Moderation System
                      </CardTitle>
                      <CardDescription>
                        Build an AI-powered content moderation pipeline with multiple classification steps
                      </CardDescription>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Learn to use conditional nodes, structured outputs, and multiple AI models to create a production-ready
                  content moderation system.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">
                    Text Model
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Conditional
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Structured Output
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Multiple Endpoints
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Tutorial 5 */}
            <Card className="border-2 hover:border-chart-4/50 transition-all group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500">
                          Intermediate
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          40 min
                        </Badge>
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        Customer Support Chatbot
                      </CardTitle>
                      <CardDescription>
                        Create an intelligent chatbot with context retention and API integrations
                      </CardDescription>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Build a conversational AI system that can answer questions, retrieve data from APIs, and maintain
                  context across multiple interactions.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">
                    Prompt Templates
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Tool Nodes
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    HTTP Request
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Text Model
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Tutorial 6 */}
            <Card className="border-2 hover:border-chart-4/50 transition-all group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-lg bg-chart-1/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="h-6 w-6 text-chart-1" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500">
                          Intermediate
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          45 min
                        </Badge>
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        Document Analysis Pipeline
                      </CardTitle>
                      <CardDescription>
                        Extract insights from documents using embeddings and structured extraction
                      </CardDescription>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Process documents, extract key information, and generate structured summaries using a combination of
                  embeddings and text models.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">
                    Embedding Model
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Text Model
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Structured Output
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    JavaScript
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Advanced Tutorials */}
        <div id="advanced" className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Advanced Tutorials</h2>
            <p className="text-sm text-muted-foreground">
              Master complex workflows with multiple models, advanced security patterns, and production optimizations.
            </p>
          </div>

          <Card className="border-2 hover:border-destructive/50 transition-all group">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                    <GitCompare className="h-6 w-6 text-destructive" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500">
                        Advanced
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        60 min
                      </Badge>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      Multi-Model Comparison System
                    </CardTitle>
                    <CardDescription>
                      Run the same prompt across multiple AI models and compare results
                    </CardDescription>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Build a sophisticated system that evaluates multiple AI models in parallel, aggregates results, and
                provides comparative analysis. Includes advanced error handling and cost tracking.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs">
                  Multiple Text Models
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Parallel Execution
                </Badge>
                <Badge variant="outline" className="text-xs">
                  JavaScript Aggregation
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Error Recovery
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Next Steps */}
        <Card className="bg-gradient-to-br from-chart-4/5 to-transparent">
          <CardHeader>
            <CardTitle>Continue Learning</CardTitle>
            <CardDescription>Explore related resources to deepen your understanding</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              <Link
                href="/docs/build/nodes"
                className="p-3 rounded-md border border-border hover:border-primary/50 transition-colors"
              >
                <div className="text-sm font-medium mb-1">Complete Node Reference</div>
                <div className="text-xs text-muted-foreground">Detailed documentation for all 12 node types</div>
              </Link>
              <Link
                href="/docs/learn/best-practices"
                className="p-3 rounded-md border border-border hover:border-primary/50 transition-colors"
              >
                <div className="text-sm font-medium mb-1">Best Practices</div>
                <div className="text-xs text-muted-foreground">Expert tips for production workflows</div>
              </Link>
              <Link
                href="/docs/security/validations"
                className="p-3 rounded-md border border-border hover:border-primary/50 transition-colors"
              >
                <div className="text-sm font-medium mb-1">Security Validations</div>
                <div className="text-xs text-muted-foreground">Understand all 12 security checks</div>
              </Link>
              <Link
                href="/builder"
                className="p-3 rounded-md border border-border hover:border-primary/50 transition-colors"
              >
                <div className="text-sm font-medium mb-1">Open the Builder</div>
                <div className="text-xs text-muted-foreground">Start building your own workflows</div>
              </Link>
            </div>
          </CardContent>
        </Card>

        <DocsFooter
          prevPage={{
            title: "Core Concepts",
            href: "/docs/learn/core-concepts",
          }}
          nextPage={{
            title: "Best Practices",
            href: "/docs/learn/best-practices",
          }}
        />
      </div>
    </>
  )
}
