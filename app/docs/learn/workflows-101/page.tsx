import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Zap, Code, ArrowRight, PlayCircle, AlertCircle, CheckCircle2, GitBranch } from "lucide-react"
import { SidebarPortal } from "@/components/docs/sidebar-portal"
import { TOCPortal } from "@/components/docs/toc-portal"
import { learnSidebar } from "@/lib/docs/navigation-data"

export const metadata: Metadata = {
  title: "Workflows 101 - Understanding AI Workflows | TopFlow Learn",
  description:
    "Learn the fundamentals of AI workflows in TopFlow. Understand nodes, edges, execution order, data flow, and how to build powerful AI automation.",
  keywords: ["ai workflows", "workflow fundamentals", "nodes and edges", "workflow execution", "ai automation basics"],
  openGraph: {
    title: "Workflows 101 - TopFlow Learn",
    description: "Master the fundamentals of building AI workflows with TopFlow",
    type: "article",
  },
}

const sidebarSections = [
  {
    title: "Getting Started",
    items: learnSidebar,
  },
]

const tocItems = [
  { id: "what-is-workflow", title: "What is a Workflow?", level: 2 },
  { id: "anatomy", title: "Anatomy of a Workflow", level: 2 },
  { id: "execution-model", title: "Execution Model", level: 2 },
  { id: "data-flow", title: "Data Flow & Variables", level: 2 },
  { id: "workflow-patterns", title: "Common Patterns", level: 2 },
  { id: "validation", title: "Validation & Errors", level: 2 },
  { id: "best-practices", title: "Best Practices", level: 2 },
]

export default function Workflows101Page() {
  return (
    <>
      <SidebarPortal sections={sidebarSections} currentTab="learn" />
      <TOCPortal items={tocItems} />

      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Badge variant="secondary" className="mb-4">
            <Zap className="mr-1 h-3 w-3" />
            Fundamentals
          </Badge>
          <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight">Workflows 101</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Learn the fundamentals of building AI workflows. Understand how nodes, edges, execution order, and data flow work together to
            create powerful automation.
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <span>⏱️ 15 minutes</span>
            <span>•</span>
            <span>Beginner-friendly</span>
          </div>
        </div>

        {/* What is a Workflow? */}
        <section id="what-is-workflow" className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">What is a Workflow?</h2>
          <div className="prose prose-sm max-w-none">
            <p>
              A <strong>workflow</strong> is a visual representation of an automated process. In TopFlow, workflows are made up of{" "}
              <strong>nodes</strong> (boxes that perform actions) connected by <strong>edges</strong> (arrows that show data flow).
            </p>
            <p>
              Think of it like a flowchart for AI automation:
            </p>
            <ul>
              <li>
                <strong>Nodes</strong> = Steps in your process (e.g., "generate text", "call API", "check condition")
              </li>
              <li>
                <strong>Edges</strong> = Data flowing between steps (e.g., "output from step 1 becomes input for step 2")
              </li>
              <li>
                <strong>Execution</strong> = Running the workflow from start to finish
              </li>
            </ul>
          </div>

          <Card className="mt-6 border-2 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-lg">Real-World Example: Threat Intelligence Report</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  1
                </div>
                <div>
                  <strong>Fetch threat data</strong> - HTTP Request node calls threat intelligence API
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  2
                </div>
                <div>
                  <strong>Analyze threats</strong> - Text Model node (GPT-4) analyzes severity and impact
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  3
                </div>
                <div>
                  <strong>Generate report</strong> - Structured Output node formats as JSON
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  4
                </div>
                <div>
                  <strong>Send alert</strong> - Conditional node checks if critical, then HTTP Request posts to Slack
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Anatomy of a Workflow */}
        <section id="anatomy" className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Anatomy of a Workflow</h2>
          <div className="prose prose-sm max-w-none">
            <p>Every TopFlow workflow has three core components:</p>
          </div>

          <div className="mt-6 space-y-6">
            {/* Nodes */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  1. Nodes (Actions)
                </CardTitle>
                <CardDescription>Building blocks that perform specific tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose prose-sm max-w-none">
                  <p>
                    <strong>12 node types available</strong>:
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border p-3">
                    <div className="mb-1 text-sm font-semibold">Entry/Exit</div>
                    <div className="text-xs text-muted-foreground">Start, End</div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="mb-1 text-sm font-semibold">AI Nodes</div>
                    <div className="text-xs text-muted-foreground">Text Model, Embedding, Image Gen, Audio</div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="mb-1 text-sm font-semibold">Data Processing</div>
                    <div className="text-xs text-muted-foreground">Prompt, JavaScript, Structured Output</div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="mb-1 text-sm font-semibold">Flow Control</div>
                    <div className="text-xs text-muted-foreground">Conditional, HTTP Request, Tool</div>
                  </div>
                </div>
                <div className="prose prose-sm max-w-none">
                  <p>
                    <strong>Node properties</strong>:
                  </p>
                  <ul className="text-sm">
                    <li>
                      <strong>Type</strong> - What the node does (e.g., textModel, httpRequest)
                    </li>
                    <li>
                      <strong>Data</strong> - Configuration settings (e.g., model: "gpt-4", temperature: 0.7)
                    </li>
                    <li>
                      <strong>Inputs</strong> - Data received from upstream nodes
                    </li>
                    <li>
                      <strong>Outputs</strong> - Data sent to downstream nodes
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Edges */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                    <ArrowRight className="h-5 w-5 text-green-500" />
                  </div>
                  2. Edges (Connections)
                </CardTitle>
                <CardDescription>Arrows that define data flow between nodes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose prose-sm max-w-none">
                  <p>
                    Edges connect nodes and determine:
                  </p>
                  <ul className="text-sm">
                    <li>
                      <strong>Execution order</strong> - Which nodes run before others (topological sorting)
                    </li>
                    <li>
                      <strong>Data flow</strong> - How outputs from one node become inputs to another
                    </li>
                    <li>
                      <strong>Conditional branching</strong> - For Conditional nodes, edges can be "true" or "false" paths
                    </li>
                  </ul>
                  <p>
                    <strong>Edge structure</strong>:
                  </p>
                </div>
                <pre className="overflow-x-auto rounded bg-muted p-4 text-xs">
{`{
  id: "edge-1",
  source: "node-start",    // Which node sends data
  target: "node-textModel", // Which node receives data
  sourceHandle: "true"      // Optional: for conditional branching
}`}
                </pre>
                <div className="flex items-start gap-3 rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-4">
                  <AlertCircle className="mt-0.5 h-4 w-4 text-yellow-500" />
                  <div className="text-sm">
                    <strong>Important</strong>: You cannot create cycles (circular loops). TopFlow will detect and block workflows with
                    cycles.
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Workflow Graph */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                    <GitBranch className="h-5 w-5 text-blue-500" />
                  </div>
                  3. Workflow Graph
                </CardTitle>
                <CardDescription>The complete structure combining nodes and edges</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose prose-sm max-w-none">
                  <p>
                    A workflow is a <strong>directed acyclic graph (DAG)</strong>:
                  </p>
                  <ul className="text-sm">
                    <li>
                      <strong>Directed</strong> - Edges have direction (data flows one way)
                    </li>
                    <li>
                      <strong>Acyclic</strong> - No loops or cycles allowed
                    </li>
                    <li>
                      <strong>Graph</strong> - Nodes connected by edges
                    </li>
                  </ul>
                </div>
                <pre className="overflow-x-auto rounded bg-muted p-4 text-xs">
{`{
  nodes: [
    { id: "start", type: "start", data: { input: "Analyze security logs" } },
    { id: "text", type: "textModel", data: { model: "gpt-4" } },
    { id: "end", type: "end", data: {} }
  ],
  edges: [
    { id: "e1", source: "start", target: "text" },
    { id: "e2", source: "text", target: "end" }
  ]
}`}
                </pre>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Execution Model */}
        <section id="execution-model" className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Execution Model</h2>
          <div className="prose prose-sm max-w-none">
            <p>
              Understanding how TopFlow executes workflows is key to building effective automation.
            </p>
          </div>

          <div className="mt-6 space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Topological Execution Order</CardTitle>
                <CardDescription>Nodes execute in dependency order, not creation order</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose prose-sm max-w-none">
                  <p>
                    TopFlow automatically determines execution order using <strong>topological sorting</strong>:
                  </p>
                  <ol className="text-sm">
                    <li>
                      <strong>Find entry nodes</strong> - Nodes with no incoming edges (usually Start node)
                    </li>
                    <li>
                      <strong>Execute node</strong> - Run the node's logic
                    </li>
                    <li>
                      <strong>Store result</strong> - Save output for downstream nodes
                    </li>
                    <li>
                      <strong>Find next nodes</strong> - Nodes whose dependencies are all complete
                    </li>
                    <li>
                      <strong>Repeat</strong> - Until all nodes executed
                    </li>
                  </ol>
                </div>

                <div className="rounded-lg bg-muted p-4">
                  <div className="mb-2 text-sm font-semibold">Example Execution</div>
                  <div className="space-y-2 text-sm font-mono">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded bg-green-500 text-xs text-white">1</div>
                      <div>Start → outputs "Analyze threat data"</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded bg-green-500 text-xs text-white">2</div>
                      <div>HTTP Request → fetches threat intel (receives Start's output)</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded bg-green-500 text-xs text-white">3</div>
                      <div>Text Model → analyzes data (receives HTTP's output)</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded bg-green-500 text-xs text-white">4</div>
                      <div>End → collects final result</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle>Sequential vs. Parallel Execution</CardTitle>
                <CardDescription>How TopFlow handles branching and merging</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose prose-sm max-w-none">
                  <p>
                    <strong>Sequential</strong>: Nodes execute one at a time in topological order.
                  </p>
                  <p>
                    <strong>Conceptual parallelism</strong>: If multiple nodes have all dependencies met, they <em>could</em> run in
                    parallel. However, TopFlow currently executes them sequentially for simplicity and predictability.
                  </p>
                </div>

                <div className="flex items-start gap-3 rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
                  <AlertCircle className="mt-0.5 h-4 w-4 text-blue-500" />
                  <div className="text-sm">
                    <strong>Note</strong>: While the visual builder shows parallel branches, execution is sequential. Future versions may
                    support true parallel execution.
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle>Conditional Branching</CardTitle>
                <CardDescription>How if/else logic works in workflows</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose prose-sm max-w-none">
                  <p>
                    <strong>Conditional nodes</strong> have two output handles:
                  </p>
                  <ul className="text-sm">
                    <li>
                      <strong>"true" handle</strong> - Edge followed if condition evaluates to true
                    </li>
                    <li>
                      <strong>"false" handle</strong> - Edge followed if condition evaluates to false
                    </li>
                  </ul>
                </div>

                <pre className="overflow-x-auto rounded bg-muted p-4 text-xs">
{`// Conditional node checks severity
condition: "output.includes('CRITICAL')"

// Two edges from this node:
{ source: "conditional", target: "alert-slack", sourceHandle: "true" }  // High severity
{ source: "conditional", target: "log-only", sourceHandle: "false" }    // Normal severity`}
                </pre>

                <div className="prose prose-sm max-w-none">
                  <p>
                    <strong>Only matching edges are followed</strong>. If condition is true, only the "true" edge executes. The "false"
                    branch is skipped entirely.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Data Flow & Variables */}
        <section id="data-flow" className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Data Flow & Variables</h2>
          <div className="prose prose-sm max-w-none">
            <p>
              Understanding how data moves through your workflow is essential for building complex automation.
            </p>
          </div>

          <div className="mt-6 space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Variable Interpolation</CardTitle>
                <CardDescription>Using outputs from upstream nodes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose prose-sm max-w-none">
                  <p>
                    <strong>Access upstream outputs using $input1, $input2, etc.</strong>
                  </p>
                  <p>
                    When a node receives multiple inputs, they're numbered by the <strong>X position</strong> of source nodes (left to
                    right):
                  </p>
                </div>

                <pre className="overflow-x-auto rounded bg-muted p-4 text-xs">
{`// Node "merge" receives two inputs:
// - From node "fetch-data" (X: 100)
// - From node "user-prompt" (X: 200)

// In the merge node's prompt:
"Combine this data: $input1 with user request: $input2"

// Runtime replacement:
"Combine this data: [API response] with user request: [user input]"`}
                </pre>

                <div className="prose prose-sm max-w-none">
                  <p>
                    <strong>Where you can use variables</strong>:
                  </p>
                  <ul className="text-sm">
                    <li>Prompt nodes - Template prompts with dynamic data</li>
                    <li>HTTP Request nodes - Dynamic URLs and request bodies</li>
                    <li>JavaScript nodes - Access via <code>input1</code>, <code>input2</code> variables</li>
                    <li>Conditional nodes - Reference in condition expressions</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle>Data Transformations</CardTitle>
                <CardDescription>Processing and formatting data between nodes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose prose-sm max-w-none">
                  <p>
                    <strong>Common transformation patterns</strong>:
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="rounded-lg border p-3">
                    <div className="mb-2 text-sm font-semibold">Extract JSON fields</div>
                    <pre className="overflow-x-auto rounded bg-muted p-3 text-xs">
{`// JavaScript node
const data = JSON.parse(input1)
return data.threats.filter(t => t.severity === "HIGH")`}
                    </pre>
                  </div>

                  <div className="rounded-lg border p-3">
                    <div className="mb-2 text-sm font-semibold">Format for AI prompt</div>
                    <pre className="overflow-x-auto rounded bg-muted p-3 text-xs">
{`// Prompt node
Analyze these security events:

$input1

Provide: severity, affected systems, recommended actions`}
                    </pre>
                  </div>

                  <div className="rounded-lg border p-3">
                    <div className="mb-2 text-sm font-semibold">Structured output parsing</div>
                    <pre className="overflow-x-auto rounded bg-muted p-3 text-xs">
{`// Structured Output node with Zod schema
{
  threatLevel: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
  affectedSystems: z.array(z.string()),
  recommendations: z.array(z.string())
}`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Common Patterns */}
        <section id="workflow-patterns" className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Common Workflow Patterns</h2>
          <div className="prose prose-sm max-w-none">
            <p>
              Learn these proven patterns to solve common automation challenges.
            </p>
          </div>

          <div className="mt-6 space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Pattern 1: API → AI Analysis → Structured Output</CardTitle>
                <CardDescription>Fetch data, analyze with AI, return formatted results</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                      1
                    </div>
                    <div>
                      <strong>Start</strong> → Provides API endpoint URL
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                      2
                    </div>
                    <div>
                      <strong>HTTP Request</strong> → Fetches data from external API
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                      3
                    </div>
                    <div>
                      <strong>Text Model</strong> → Analyzes data with GPT-4/Claude
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                      4
                    </div>
                    <div>
                      <strong>Structured Output</strong> → Validates and formats as JSON schema
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                      5
                    </div>
                    <div>
                      <strong>End</strong> → Returns formatted result
                    </div>
                  </div>
                </div>
                <div className="prose prose-sm max-w-none">
                  <p>
                    <strong>Use case</strong>: Security log analysis, market research, data enrichment
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle>Pattern 2: Conditional Alert Routing</CardTitle>
                <CardDescription>Route based on severity or other criteria</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                      1
                    </div>
                    <div>
                      <strong>Start</strong> → Security event data
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                      2
                    </div>
                    <div>
                      <strong>Text Model</strong> → Classify severity (LOW, MEDIUM, HIGH, CRITICAL)
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                      3
                    </div>
                    <div>
                      <strong>Conditional</strong> → Check if <code>severity === "CRITICAL"</code>
                    </div>
                  </div>
                  <div className="ml-11 space-y-2 border-l-2 pl-4">
                    <div>
                      <strong>If TRUE</strong> → HTTP Request to PagerDuty (immediate page)
                    </div>
                    <div>
                      <strong>If FALSE</strong> → HTTP Request to Slack (notification only)
                    </div>
                  </div>
                </div>
                <div className="prose prose-sm max-w-none">
                  <p>
                    <strong>Use case</strong>: Alert routing, approval workflows, data filtering
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle>Pattern 3: Multi-Step Enrichment</CardTitle>
                <CardDescription>Enhance data through multiple AI calls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                      1
                    </div>
                    <div>
                      <strong>Start</strong> → Raw customer feedback
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                      2
                    </div>
                    <div>
                      <strong>Text Model (GPT-4)</strong> → Extract sentiment (positive/negative/neutral)
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                      3
                    </div>
                    <div>
                      <strong>Text Model (GPT-4)</strong> → Identify key topics and themes
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                      4
                    </div>
                    <div>
                      <strong>JavaScript</strong> → Merge sentiment + topics into single object
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                      5
                    </div>
                    <div>
                      <strong>End</strong> → Return enriched data
                    </div>
                  </div>
                </div>
                <div className="prose prose-sm max-w-none">
                  <p>
                    <strong>Use case</strong>: Data enrichment, multi-modal analysis, progressive refinement
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Validation & Errors */}
        <section id="validation" className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Validation & Errors</h2>
          <div className="prose prose-sm max-w-none">
            <p>
              TopFlow validates your workflow before execution to catch errors early.
            </p>
          </div>

          <div className="mt-6 space-y-6">
            <Card className="border-2 border-red-500/20 bg-red-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  Errors (Block Execution)
                </CardTitle>
                <CardDescription>Must be fixed before workflow can run</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">❌</span>
                    <div>
                      <strong>Cycle detected</strong> - Workflow has circular dependency
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">❌</span>
                    <div>
                      <strong>Missing start/end node</strong> - Must have exactly one Start and one End
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">❌</span>
                    <div>
                      <strong>Orphan nodes</strong> - Nodes not connected to main flow
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">❌</span>
                    <div>
                      <strong>Missing required config</strong> - Empty model, prompt, or URL
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">❌</span>
                    <div>
                      <strong>SSRF blocked</strong> - HTTP Request targeting localhost or internal IP
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">❌</span>
                    <div>
                      <strong>Missing API key</strong> - Provider key not configured in settings
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-yellow-500/20 bg-yellow-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                  Warnings (Don't Block)
                </CardTitle>
                <CardDescription>Recommendations to improve security or performance</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500">⚠️</span>
                    <div>
                      <strong>PII detected</strong> - Prompt contains potential personal data (email, SSN)
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500">⚠️</span>
                    <div>
                      <strong>High temperature</strong> - Using temperature > 1.5 may produce inconsistent results
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500">⚠️</span>
                    <div>
                      <strong>Large maxTokens</strong> - Setting > 2000 may slow execution
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500">⚠️</span>
                    <div>
                      <strong>Prompt injection pattern</strong> - Input contains suspicious phrases ("ignore previous instructions")
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle>Validation Score</CardTitle>
                <CardDescription>Security and quality rating (0-100)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose prose-sm max-w-none">
                  <p>
                    TopFlow assigns a grade based on errors and warnings:
                  </p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-lg font-bold text-white">
                        A
                      </div>
                      <div>
                        <div className="font-semibold">90-100</div>
                        <div className="text-xs text-muted-foreground">Excellent - Production ready</div>
                      </div>
                    </div>
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-lg font-bold text-white">
                        B
                      </div>
                      <div>
                        <div className="font-semibold">80-89</div>
                        <div className="text-xs text-muted-foreground">Good - Minor improvements needed</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500 text-lg font-bold text-white">
                        C
                      </div>
                      <div>
                        <div className="font-semibold">70-79</div>
                        <div className="text-xs text-muted-foreground">Acceptable - Review warnings</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-lg font-bold text-white">
                        D
                      </div>
                      <div>
                        <div className="font-semibold">60-69</div>
                        <div className="text-xs text-muted-foreground">Poor - Significant issues</div>
                      </div>
                    </div>
                    <AlertCircle className="h-5 w-5 text-orange-500" />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-red-500/20 bg-red-500/5 p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-lg font-bold text-white">
                        F
                      </div>
                      <div>
                        <div className="font-semibold">Below 60</div>
                        <div className="text-xs text-muted-foreground">Failed - Cannot execute</div>
                      </div>
                    </div>
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Best Practices */}
        <section id="best-practices" className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Best Practices</h2>
          <div className="prose prose-sm max-w-none">
            <p>
              Follow these guidelines to build robust, secure, and maintainable workflows.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Card className="border-2 border-green-500/20 bg-green-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  Do's
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <div>
                      <strong>Start simple</strong> - Build incrementally, test each node
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <div>
                      <strong>Use descriptive node names</strong> - "Analyze Security Logs" not "Text Model 1"
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <div>
                      <strong>Validate early</strong> - Check validation panel before execution
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <div>
                      <strong>Export regularly</strong> - Download TypeScript backups
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <div>
                      <strong>Use Structured Output</strong> - For consistent, parseable results
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <div>
                      <strong>Test with demo mode first</strong> - Before using real API keys
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-500/20 bg-red-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  Don'ts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <div>
                      <strong>Don't create cycles</strong> - Circular dependencies crash workflows
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <div>
                      <strong>Don't hardcode secrets</strong> - Use API Settings for keys
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <div>
                      <strong>Don't ignore SSRF warnings</strong> - They block malicious URLs
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <div>
                      <strong>Don't use high temperature for facts</strong> - Use 0.1-0.3 for accuracy
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <div>
                      <strong>Don't skip validation</strong> - Fix all errors before execution
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <div>
                      <strong>Don't build on incognito</strong> - localStorage lost on close
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Next Steps */}
        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold">Next Steps</h2>
          <p className="text-muted-foreground">
            Now that you understand the fundamentals, dive deeper into specific topics:
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-2 transition-all hover:border-primary/50 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <PlayCircle className="h-5 w-5 text-primary" />
                  Build Your First Workflow
                </CardTitle>
                <CardDescription>Step-by-step tutorial</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/docs/learn/quick-start">
                    Quick Start
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 transition-all hover:border-primary/50 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Code className="h-5 w-5 text-purple-500" />
                  Explore Node Types
                </CardTitle>
                <CardDescription>All 12 nodes explained</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/docs/build/nodes">
                    Node Reference
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 transition-all hover:border-primary/50 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Shield className="h-5 w-5 text-green-500" />
                  Security Validations
                </CardTitle>
                <CardDescription>12 security checks</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/docs/security/validations">
                    Learn Security
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </>
  )
}
