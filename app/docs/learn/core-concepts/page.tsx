import { DocsBreadcrumb } from "@/components/docs/docs-breadcrumb"
import { DocsFooter } from "@/components/docs/docs-footer"
import { SidebarPortal } from "@/components/docs/sidebar-portal"
import { TOCPortal } from "@/components/docs/toc-portal"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Workflow, Circle, Link2, ShieldCheck, ArrowRight, Info } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Core Concepts - Understanding TopFlow's Security Architecture",
  description: "Learn the fundamental building blocks: workflows, nodes, connections, and validation. Understand TopFlow's security layers.",
}

export default function CoreConceptsPage() {
  const tocItems = [
    { id: "workflows", title: "Workflows", level: 2 },
    { id: "nodes", title: "Nodes", level: 2 },
    { id: "connections", title: "Connections", level: 2 },
    { id: "validation", title: "Validation", level: 2 },
  ]

  return (
    <>
      <SidebarPortal sections={learnSidebar} />
      <TOCPortal items={tocItems} />

      <div className="space-y-8">
        <DocsBreadcrumb />

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-balance">Core Concepts</h1>
          </div>
          <p className="text-lg text-muted-foreground text-pretty">
            Understand the fundamental building blocks of TopFlow. Learn how workflows, nodes, connections, and
            validation work together to create secure AI applications.
          </p>
        </div>

        <Alert className="bg-primary/5 border-primary/20">
          <Info className="h-4 w-4" />
          <AlertDescription>
            These concepts form the foundation of everything in TopFlow. Understanding them will help you build more
            effective and secure workflows.
          </AlertDescription>
        </Alert>

        {/* Workflows */}
        <Card className="border-2" id="workflows">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-chart-1/10 flex items-center justify-center">
                  <Workflow className="h-6 w-6 text-chart-1" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle>Workflows</CardTitle>
                    <Badge variant="outline" className="bg-chart-1/10 text-chart-1 border-chart-1">
                      Core Concept
                    </Badge>
                  </div>
                  <CardDescription>The high-level orchestration of AI operations</CardDescription>
                </div>
              </div>
              <Link href="/docs/learn/workflows">
                <ArrowRight className="h-5 w-5 text-muted-foreground hover:text-primary hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              A workflow is a directed graph that defines how data flows through your AI application. Each workflow has
              a clear beginning (entry points), transformation steps (processing nodes), and endpoints (outputs).
            </p>
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <p className="text-xs font-semibold text-foreground">Key Characteristics:</p>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-chart-1 mt-1.5 flex-shrink-0" />
                  <span>
                    <strong>Directed acyclic graphs (DAGs)</strong> - Data flows in one direction without cycles
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-chart-1 mt-1.5 flex-shrink-0" />
                  <span>
                    <strong>Visual representation</strong> - See your entire AI pipeline at a glance
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-chart-1 mt-1.5 flex-shrink-0" />
                  <span>
                    <strong>Version controlled</strong> - Track changes and revert to previous versions
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-chart-1 mt-1.5 flex-shrink-0" />
                  <span>
                    <strong>Exportable to code</strong> - Generate production-ready TypeScript
                  </span>
                </li>
              </ul>
            </div>
            <Link
              href="/docs/learn/workflows"
              className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
            >
              Learn more about Workflows <ArrowRight className="h-3 w-3" />
            </Link>
          </CardContent>
        </Card>

        {/* Nodes */}
        <Card className="border-2" id="nodes">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Circle className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle>Nodes</CardTitle>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary">
                      Core Concept
                    </Badge>
                  </div>
                  <CardDescription>Individual units of computation in your workflow</CardDescription>
                </div>
              </div>
              <Link href="/docs/learn/nodes">
                <ArrowRight className="h-5 w-5 text-muted-foreground hover:text-primary hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Nodes are the building blocks of workflows. Each node performs a specific task: calling an AI model,
              transforming data, making API requests, or controlling flow logic.
            </p>
            <div className="grid md:grid-cols-3 gap-3">
              <div className="bg-muted/50 rounded-lg p-3 space-y-1">
                <p className="text-xs font-semibold text-foreground">AI Nodes</p>
                <ul className="text-xs text-muted-foreground space-y-0.5">
                  <li>• Text Model</li>
                  <li>• Image Generation</li>
                  <li>• Embedding</li>
                  <li>• Audio</li>
                </ul>
              </div>
              <div className="bg-muted/50 rounded-lg p-3 space-y-1">
                <p className="text-xs font-semibold text-foreground">Data Nodes</p>
                <ul className="text-xs text-muted-foreground space-y-0.5">
                  <li>• Prompt Template</li>
                  <li>• JavaScript</li>
                  <li>• Structured Output</li>
                  <li>• HTTP Request</li>
                </ul>
              </div>
              <div className="bg-muted/50 rounded-lg p-3 space-y-1">
                <p className="text-xs font-semibold text-foreground">Control Nodes</p>
                <ul className="text-xs text-muted-foreground space-y-0.5">
                  <li>• Conditional</li>
                  <li>• Start</li>
                  <li>• End</li>
                  <li>• Tool</li>
                </ul>
              </div>
            </div>
            <Link
              href="/docs/learn/nodes"
              className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
            >
              Explore all node types <ArrowRight className="h-3 w-3" />
            </Link>
          </CardContent>
        </Card>

        {/* Connections */}
        <Card className="border-2" id="connections">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-chart-2/10 flex items-center justify-center">
                  <Link2 className="h-6 w-6 text-chart-2" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle>Connections & Data Flow</CardTitle>
                    <Badge variant="outline" className="bg-chart-2/10 text-chart-2 border-chart-2">
                      Core Concept
                    </Badge>
                  </div>
                  <CardDescription>How data moves between nodes in your workflow</CardDescription>
                </div>
              </div>
              <Link href="/docs/learn/connections">
                <ArrowRight className="h-5 w-5 text-muted-foreground hover:text-primary hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Connections define the data flow between nodes. They determine execution order, pass outputs as inputs,
              and enable complex branching logic.
            </p>
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <div className="space-y-2">
                <p className="text-xs font-semibold text-foreground">Connection Types:</p>
                <div className="grid gap-2">
                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="text-xs">
                      Sequential
                    </Badge>
                    <span className="text-xs text-muted-foreground">Output of Node A becomes input of Node B</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="text-xs">
                      Conditional
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Data flows based on true/false conditions
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="text-xs">
                      Multiple
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Multiple inputs can feed into a single node
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <Link
              href="/docs/learn/connections"
              className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
            >
              Deep dive into connections <ArrowRight className="h-3 w-3" />
            </Link>
          </CardContent>
        </Card>

        {/* Validation */}
        <Card className="border-2" id="validation">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6 text-destructive" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle>Security Validation</CardTitle>
                    <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive">
                      Core Concept
                    </Badge>
                  </div>
                  <CardDescription>Built-in security checks for every workflow</CardDescription>
                </div>
              </div>
              <Link href="/docs/learn/validation">
                <ArrowRight className="h-5 w-5 text-muted-foreground hover:text-primary hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Every workflow is automatically validated against 12 security rules before execution. This ensures your
              AI applications follow security best practices from day one.
            </p>
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <p className="text-xs font-semibold text-foreground">Validation Categories:</p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-foreground">Structural Checks</p>
                  <ul className="text-xs text-muted-foreground space-y-0.5">
                    <li>• Cycle detection</li>
                    <li>• Orphaned nodes</li>
                    <li>• Missing endpoints</li>
                  </ul>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-foreground">Security Checks</p>
                  <ul className="text-xs text-muted-foreground space-y-0.5">
                    <li>• SSRF prevention</li>
                    <li>• Input sanitization</li>
                    <li>• API key validation</li>
                  </ul>
                </div>
              </div>
            </div>
            <Alert className="bg-destructive/5 border-destructive/20">
              <ShieldCheck className="h-4 w-4 text-destructive" />
              <AlertDescription className="text-xs">
                Workflows with validation errors cannot be executed. This is a security feature, not a bug.
              </AlertDescription>
            </Alert>
            <Link
              href="/docs/learn/validation"
              className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
            >
              View all validation rules <ArrowRight className="h-3 w-3" />
            </Link>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader>
            <CardTitle>Ready to put these concepts into practice?</CardTitle>
            <CardDescription>
              Now that you understand the core concepts, try building your first workflow.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              <Link
                href="/docs/learn/quick-start"
                className="p-3 rounded-md border border-border hover:border-primary/50 transition-colors"
              >
                <div className="text-sm font-medium mb-1">Quick Start Guide</div>
                <div className="text-xs text-muted-foreground">Build your first workflow in 5 minutes</div>
              </Link>
              <Link
                href="/docs/learn/tutorials"
                className="p-3 rounded-md border border-border hover:border-primary/50 transition-colors"
              >
                <div className="text-sm font-medium mb-1">Step-by-Step Tutorials</div>
                <div className="text-xs text-muted-foreground">Learn through hands-on examples</div>
              </Link>
              <Link
                href="/docs/build/nodes"
                className="p-3 rounded-md border border-border hover:border-primary/50 transition-colors"
              >
                <div className="text-sm font-medium mb-1">Complete Node Reference</div>
                <div className="text-xs text-muted-foreground">Explore all 12 node types in detail</div>
              </Link>
              <Link
                href="/docs/security/validations"
                className="p-3 rounded-md border border-border hover:border-primary/50 transition-colors"
              >
                <div className="text-sm font-medium mb-1">Security Validations</div>
                <div className="text-xs text-muted-foreground">Understand all 12 security rules</div>
              </Link>
            </div>
          </CardContent>
        </Card>

        <DocsFooter
          prevPage={{
            title: "Quick Start",
            href: "/docs/learn/quick-start",
          }}
          nextPage={{
            title: "Workflows",
            href: "/docs/learn/workflows",
          }}
        />
      </div>
    </>
  )
}
