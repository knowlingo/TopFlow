import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, ArrowRight, AlertCircle, CheckCircle2, Code } from "lucide-react"
import { SidebarPortal } from "@/components/docs/sidebar-portal"
import { TOCPortal } from "@/components/docs/toc-portal"

export const metadata: Metadata = {
  title: "Start Node - Node Reference | TopFlow Build",
  description:
    "Complete reference for the Start Node in TopFlow. Entry point for all workflows, defines initial input and workflow parameters.",
  keywords: ["start node", "workflow entry", "initial input", "topflow nodes"],
}


const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "configuration", title: "Configuration", level: 2 },
  { id: "data-interface", title: "Node Data Interface", level: 2 },
  { id: "usage-examples", title: "Usage Examples", level: 2 },
  { id: "validation", title: "Validation Rules", level: 2 },
  { id: "code-generation", title: "Code Generation", level: 2 },
]

export default function StartNodePage() {
  return (
    <>
      <SidebarPortal currentTab="build" />
      <TOCPortal items={tocItems} />

      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Badge variant="secondary" className="mb-4">
            <Play className="mr-1 h-3 w-3" />
            Entry/Exit Node
          </Badge>
          <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight">Start Node</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Entry point for all TopFlow workflows. Defines the initial input and triggers workflow execution. Every workflow must have
            exactly one Start node.
          </p>
        </div>

        {/* Overview */}
        <section id="overview" className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Overview</h2>
          <div className="prose prose-sm max-w-none">
            <p>
              The <strong>Start Node</strong> is the beginning of every workflow. It:
            </p>
            <ul>
              <li>Provides the initial input data to downstream nodes</li>
              <li>Has no input handles (cannot receive data from other nodes)</li>
              <li>Has one output handle (sends data to connected nodes)</li>
              <li>Triggers the workflow execution sequence</li>
            </ul>
          </div>

          <Card className="mt-6 border-2">
            <CardHeader>
              <CardTitle className="text-lg">Use Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                  <div>
                    <strong>User input</strong> - Accept data from end users
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                  <div>
                    <strong>API trigger</strong> - Receive webhook or API request data
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                  <div>
                    <strong>Static data</strong> - Provide hardcoded initial values
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                  <div>
                    <strong>Demo mode</strong> - Pre-populate with sample data for testing
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Configuration */}
        <section id="configuration" className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Configuration</h2>

          <div className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Required Parameters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="mb-2 font-semibold">input</h4>
                  <ul className="ml-4 space-y-1 text-sm">
                    <li>
                      <strong>Type</strong>: <code>string</code>
                    </li>
                    <li>
                      <strong>Required</strong>: No (can be empty for API-triggered workflows)
                    </li>
                    <li>
                      <strong>Default</strong>: <code>""</code> (empty string)
                    </li>
                    <li>
                      <strong>Description</strong>: The initial data passed to downstream nodes
                    </li>
                    <li>
                      <strong>Example</strong>: <code>"Analyze these security logs..."</code>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-500/20 bg-blue-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertCircle className="h-5 w-5 text-blue-500" />
                  Configuration Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-blue-500" />
                  <div>
                    <strong>Keep it simple</strong> - The Start node should provide raw, unprocessed data. Use Prompt nodes or JavaScript
                    nodes for transformation.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-blue-500" />
                  <div>
                    <strong>Test with real data</strong> - Use actual examples from your use case, not placeholder text like "foo" or
                    "test".
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-blue-500" />
                  <div>
                    <strong>For APIs</strong> - Leave input empty in the visual builder. Pass data via API request body when executing
                    programmatically.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Node Data Interface */}
        <section id="data-interface" className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Node Data Interface</h2>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Code className="h-5 w-5" />
                TypeScript Definition
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <pre className="overflow-x-auto rounded bg-muted p-4 text-xs">
{`export type StartNodeData = {
  // Configuration
  input: string // Initial input data

  // Execution state (managed by system)
  status?: "idle" | "running" | "completed" | "error"
  output?: any
  error?: string
}`}
              </pre>

              <div className="prose prose-sm max-w-none">
                <p>
                  <strong>Node Props</strong>:
                </p>
              </div>

              <pre className="overflow-x-auto rounded bg-muted p-4 text-xs">
{`import { NodeProps } from "@xyflow/react"

export function StartNode({ data, id }: NodeProps<StartNodeData>) {
  // Component implementation
  return (
    <div className="start-node">
      <Handle type="source" position={Position.Right} />
      {/* Node UI */}
    </div>
  )
}`}
              </pre>
            </CardContent>
          </Card>
        </section>

        {/* Usage Examples */}
        <section id="usage-examples" className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Usage Examples</h2>

          <div className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Example 1: Static Initial Input</CardTitle>
                <CardDescription>Hardcoded data for consistent testing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <pre className="overflow-x-auto rounded bg-muted p-4 text-xs">
{`const workflow = {
  nodes: [
    {
      id: "start-1",
      type: "start",
      data: {
        input: "Analyze threat intelligence for CVE-2026-1234"
      }
    },
    {
      id: "text-1",
      type: "textModel",
      data: {
        model: "gpt-4",
        prompt: "$input1" // Receives Start node output
      }
    }
  ],
  edges: [
    { id: "e1", source: "start-1", target: "text-1" }
  ]
}`}
                </pre>
                <div className="text-sm text-muted-foreground">
                  <strong>Result</strong>: Text Model node receives "Analyze threat intelligence for CVE-2026-1234" as input1
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Example 2: API-Triggered Workflow</CardTitle>
                <CardDescription>Dynamic input from API request</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose prose-sm max-w-none">
                  <p>
                    <strong>Workflow configuration</strong> (input left empty):
                  </p>
                </div>
                <pre className="overflow-x-auto rounded bg-muted p-4 text-xs">
{`{
  id: "start-1",
  type: "start",
  data: {
    input: "" // Empty - will be provided via API
  }
}`}
                </pre>
                <div className="prose prose-sm max-w-none">
                  <p>
                    <strong>API execution</strong>:
                  </p>
                </div>
                <pre className="overflow-x-auto rounded bg-muted p-4 text-xs">
{`const response = await fetch("/api/execute-workflow", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    workflow: { nodes, edges },
    input: "Real-time security alert from SIEM", // Overrides Start node input
    apiKeys: { openai: "sk-..." }
  })
})`}
                </pre>
                <div className="text-sm text-muted-foreground">
                  <strong>Result</strong>: Start node output becomes "Real-time security alert from SIEM"
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Example 3: Multiple Downstream Connections</CardTitle>
                <CardDescription>Start node can connect to multiple nodes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <pre className="overflow-x-auto rounded bg-muted p-4 text-xs">
{`const workflow = {
  nodes: [
    {
      id: "start-1",
      type: "start",
      data: { input: "Security incident details" }
    },
    {
      id: "classify-1",
      type: "textModel",
      data: { model: "gpt-4", prompt: "Classify severity: $input1" }
    },
    {
      id: "extract-1",
      type: "textModel",
      data: { model: "gpt-4", prompt: "Extract IOCs from: $input1" }
    }
  ],
  edges: [
    { id: "e1", source: "start-1", target: "classify-1" },
    { id: "e2", source: "start-1", target: "extract-1" } // Same input to both
  ]
}`}
                </pre>
                <div className="text-sm text-muted-foreground">
                  <strong>Result</strong>: Both downstream nodes receive identical input from Start node
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Validation Rules */}
        <section id="validation" className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Validation Rules</h2>

          <div className="space-y-4">
            <Card className="border-2 border-red-500/20 bg-red-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  Errors (Block Execution)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">❌</span>
                    <div>
                      <strong>Missing Start Node</strong>
                      <p className="text-muted-foreground">Workflow must have exactly one Start node</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">❌</span>
                    <div>
                      <strong>Multiple Start Nodes</strong>
                      <p className="text-muted-foreground">Only one Start node allowed per workflow</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">❌</span>
                    <div>
                      <strong>Incoming Edges</strong>
                      <p className="text-muted-foreground">Start node cannot have incoming edges (no inputs allowed)</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">❌</span>
                    <div>
                      <strong>No Outgoing Edges</strong>
                      <p className="text-muted-foreground">Start node must connect to at least one downstream node</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-500/20 bg-blue-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertCircle className="h-5 w-5 text-blue-500" />
                  Info Messages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">ℹ️</span>
                    <div>
                      <strong>Empty Input</strong>
                      <p className="text-muted-foreground">
                        Start node has empty input. This is valid for API-triggered workflows but may cause issues in demo mode.
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Code Generation */}
        <section id="code-generation" className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Code Generation</h2>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-lg">Generated TypeScript Code</CardTitle>
              <CardDescription>When exporting workflow to code, Start node becomes function parameter</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose prose-sm max-w-none">
                <p>
                  <strong>Workflow Function Export</strong>:
                </p>
              </div>
              <pre className="overflow-x-auto rounded bg-muted p-4 text-xs">
{`// Generated code for workflow function export
export async function runAgentWorkflow(
  initialInput?: string // Start node input becomes parameter
) {
  // Use initialInput or default from Start node configuration
  const startInput = initialInput || "Analyze these security logs"

  // Start node execution (returns input as-is)
  const node_start = startInput

  // Downstream nodes receive \`node_start\` as input
  const node_textModel = await generateText({
    model: openai("gpt-4"),
    prompt: node_start // $input1 becomes node_start
  })

  return node_textModel.text
}`}
              </pre>

              <div className="prose prose-sm max-w-none">
                <p>
                  <strong>Route Handler Export</strong>:
                </p>
              </div>
              <pre className="overflow-x-auto rounded bg-muted p-4 text-xs">
{`// Generated code for Next.js API route
export async function POST(req: Request) {
  const { input } = await req.json()

  // Start node input from API request
  const node_start = input || "Default input"

  const node_textModel = await generateText({
    model: openai(process.env.OPENAI_API_KEY),
    prompt: node_start
  })

  return Response.json({ output: node_textModel.text })
}`}
              </pre>
            </CardContent>
          </Card>
        </section>

        {/* Best Practices */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Best Practices</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-2 border-green-500/20 bg-green-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  Do
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <div>Use realistic example data when testing</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <div>Leave input empty for API-triggered workflows</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <div>Connect Start node to multiple branches for parallel processing</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <div>Document expected input format in workflow description</div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-500/20 bg-red-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  Don't
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <div>Don't create multiple Start nodes</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <div>Don't connect edges TO the Start node (no inputs)</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <div>Don't put complex logic in Start node input (use downstream nodes)</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <div>Don't hardcode sensitive data (use environment variables in exported code)</div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Related Nodes */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Related Nodes</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="border-2 transition-all hover:border-primary/50 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">End Node</CardTitle>
                <CardDescription>Workflow exit point, collects final output</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/docs/build/nodes/end">
                    View Documentation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 transition-all hover:border-primary/50 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Prompt Node</CardTitle>
                <CardDescription>Transform Start node output with templates</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/docs/build/nodes/prompt">
                    View Documentation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Next Steps */}
        <section className="mt-12 rounded-lg border-2 border-primary/20 bg-primary/5 p-8">
          <h2 className="mb-4 text-2xl font-semibold">Next Steps</h2>
          <p className="mb-6 text-muted-foreground">
            Continue learning about other node types and workflow patterns:
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/docs/build/nodes/text-model">
                <Play className="mr-2 h-4 w-4" />
                Text Model Node
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/docs/build/nodes">View All Nodes</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/docs/build/workflows">Workflow Patterns</Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  )
}
