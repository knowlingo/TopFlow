import { DocsBreadcrumb } from "@/components/docs/docs-breadcrumb"
import { DocsFooter } from "@/components/docs/docs-footer"
import { SidebarPortal } from "@/components/docs/sidebar-portal"
import { TOCPortal } from "@/components/docs/toc-portal"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Zap, Play, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Quick Start - Build Your First Secure AI Workflow in 5 Minutes",
  description: "Step-by-step guide to creating your first TopFlow workflow. Learn secure AI orchestration with hands-on examples.",
}

export default function QuickStartPage() {
  const tocItems = [
    { id: "step-1", title: "Open the Builder", level: 2 },
    { id: "step-2", title: "Add a Start Node", level: 2 },
    { id: "step-3", title: "Add a Text Model Node", level: 2 },
    { id: "step-4", title: "Add an End Node", level: 2 },
    { id: "step-5", title: "Run Your Workflow", level: 2 },
    { id: "next-steps", title: "What's Next?", level: 2 },
  ]

  return (
    <>
      <SidebarPortal currentTab="learn" />
      <TOCPortal items={tocItems} />

      <div className="space-y-8">
        <DocsBreadcrumb />

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Zap className="h-8 w-8 text-chart-3" />
            <h1 className="text-4xl font-bold text-balance">Quick Start Guide</h1>
          </div>
          <p className="text-lg text-muted-foreground text-pretty">
            Build your first secure AI workflow in 5 minutes. No signup required.
          </p>
        </div>

        <Alert className="bg-chart-3/10 border-chart-3">
          <Play className="h-4 w-4 text-chart-3" />
          <AlertDescription>
            <strong>Try it live:</strong> Open the{" "}
            <Link href="/builder" className="underline hover:text-chart-3">
              visual builder
            </Link>{" "}
            in a new tab to follow along.
          </AlertDescription>
        </Alert>

        {/* Step 1 */}
        <Card className="border-2" id="step-1">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <Badge variant="outline" className="mb-3">
                  Step 1
                </Badge>
                <CardTitle>Open the Builder</CardTitle>
                <CardDescription>Launch the visual workflow editor</CardDescription>
              </div>
              <CheckCircle2 className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm">
              Navigate to{" "}
              <Link href="/builder" className="text-primary underline">
                topflow.dev/builder
              </Link>{" "}
              to access the drag-and-drop workflow canvas. You'll see a blank canvas with a node palette on the left.
            </p>
            <div className="rounded-md bg-muted p-4 font-mono text-xs">
              <div className="text-muted-foreground">// The builder includes:</div>
              <div>• Visual canvas (center)</div>
              <div>• Node palette (left sidebar)</div>
              <div>• Configuration panel (right sidebar)</div>
              <div>• Security validation (bottom)</div>
            </div>
          </CardContent>
        </Card>

        {/* Step 2 */}
        <Card className="border-2" id="step-2">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <Badge variant="outline" className="mb-3">
                  Step 2
                </Badge>
                <CardTitle>Add a Start Node</CardTitle>
                <CardDescription>Every workflow begins here</CardDescription>
              </div>
              <CheckCircle2 className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm">
              Drag the{" "}
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500">
                Start
              </Badge>{" "}
              node from the palette onto the canvas. This node defines the input for your workflow.
            </p>
            <div className="rounded-md bg-muted p-4 space-y-2">
              <p className="text-xs font-medium">Configure the Start node:</p>
              <ul className="text-xs space-y-1 list-disc list-inside text-muted-foreground">
                <li>Set input type (text, JSON, file)</li>
                <li>Define expected schema</li>
                <li>Add validation rules</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Step 3 */}
        <Card className="border-2" id="step-3">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <Badge variant="outline" className="mb-3">
                  Step 3
                </Badge>
                <CardTitle>Add a Text Model Node</CardTitle>
                <CardDescription>Connect to AI models</CardDescription>
              </div>
              <CheckCircle2 className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm">
              Drag the{" "}
              <Badge variant="outline" className="bg-chart-1/10 text-chart-1 border-chart-1">
                Text Model
              </Badge>{" "}
              node to the right of the Start node. Connect them by dragging from the Start node's output handle to the
              Text Model's input handle.
            </p>
            <div className="rounded-md bg-muted p-4 space-y-2">
              <p className="text-xs font-medium">Configure the model:</p>
              <div className="font-mono text-xs space-y-1">
                <div>
                  • <span className="text-primary">Model:</span> gpt-4-turbo
                </div>
                <div>
                  • <span className="text-primary">Prompt:</span> "Summarize: {"{{input}}"}"
                </div>
                <div>
                  • <span className="text-primary">Temperature:</span> 0.7
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 4 */}
        <Card className="border-2" id="step-4">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <Badge variant="outline" className="mb-3">
                  Step 4
                </Badge>
                <CardTitle>Add an End Node</CardTitle>
                <CardDescription>Define your output</CardDescription>
              </div>
              <CheckCircle2 className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm">
              Drag the{" "}
              <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500">
                End
              </Badge>{" "}
              node and connect it to the Text Model's output. This marks the final output of your workflow.
            </p>
          </CardContent>
        </Card>

        {/* Step 5 */}
        <Card className="border-2" id="step-5">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <Badge variant="outline" className="mb-3">
                  Step 5
                </Badge>
                <CardTitle>Run Your Workflow</CardTitle>
                <CardDescription>Test and validate</CardDescription>
              </div>
              <CheckCircle2 className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm">
              Click the <strong>Run Workflow</strong> button in the top toolbar. Enter sample input and watch your
              workflow execute in real-time.
            </p>
            <Alert className="bg-primary/5 border-primary/20">
              <AlertDescription className="text-xs">
                The Security Validation Panel will automatically analyze your workflow against 12 security rules and
                display a score.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="bg-gradient-to-br from-primary/5 to-transparent" id="next-steps">
          <CardHeader>
            <CardTitle>What's Next?</CardTitle>
            <CardDescription>Continue your learning journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              <Link
                href="/docs/learn/core-concepts"
                className="p-3 rounded-md border border-border hover:border-primary/50 transition-colors"
              >
                <div className="text-sm font-medium mb-1">Core Concepts</div>
                <div className="text-xs text-muted-foreground">Understand nodes, connections, and data flow</div>
              </Link>
              <Link
                href="/docs/build/nodes"
                className="p-3 rounded-md border border-border hover:border-primary/50 transition-colors"
              >
                <div className="text-sm font-medium mb-1">Node Reference</div>
                <div className="text-xs text-muted-foreground">Explore all 10 node types</div>
              </Link>
              <Link
                href="/docs/security/validations"
                className="p-3 rounded-md border border-border hover:border-primary/50 transition-colors"
              >
                <div className="text-sm font-medium mb-1">Security Validations</div>
                <div className="text-xs text-muted-foreground">Learn about the 12 security checks</div>
              </Link>
              <Link
                href="/docs/learn/tutorials"
                className="p-3 rounded-md border border-border hover:border-primary/50 transition-colors"
              >
                <div className="text-sm font-medium mb-1">Tutorials</div>
                <div className="text-xs text-muted-foreground">Build real-world workflows</div>
              </Link>
            </div>
          </CardContent>
        </Card>

        <DocsFooter
          nextPage={{
            title: "Core Concepts",
            href: "/docs/learn/core-concepts",
          }}
        />
      </div>
    </>
  )
}
