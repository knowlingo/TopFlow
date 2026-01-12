import { DocsBreadcrumb } from "@/components/docs/docs-breadcrumb"
import { DocsFooter } from "@/components/docs/docs-footer"
import { SidebarPortal } from "@/components/docs/sidebar-portal"
import { TOCPortal } from "@/components/docs/toc-portal"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Play,
  MessageSquare,
  ImageIcon,
  Globe,
  GitBranch,
  Code,
  Database,
  Wrench,
  FileText,
  Square,
} from "lucide-react"
import Link from "next/link"

const nodes = [
  {
    name: "Start Node",
    icon: Play,
    color: "emerald-500",
    description: "Entry point for all workflows. Defines input schema and validation.",
    href: "/docs/build/nodes/start",
    inputs: 0,
    outputs: 1,
  },
  {
    name: "Text Model Node",
    icon: MessageSquare,
    color: "chart-1",
    description: "Connect to LLMs like GPT-4, Claude, or Gemini for text generation.",
    href: "/docs/build/nodes/text-model",
    inputs: 1,
    outputs: 1,
  },
  {
    name: "Image Generation",
    icon: ImageIcon,
    color: "chart-5",
    description: "Generate images using DALL-E, Stable Diffusion, or Midjourney.",
    href: "/docs/build/nodes/image-generation",
    inputs: 1,
    outputs: 1,
  },
  {
    name: "HTTP Request",
    icon: Globe,
    color: "blue-500",
    description: "Call external APIs and webhooks with full header and auth support.",
    href: "/docs/build/nodes/http-request",
    inputs: 1,
    outputs: 1,
  },
  {
    name: "Conditional Node",
    icon: GitBranch,
    color: "chart-4",
    description: "Branch workflow execution based on conditions and logic.",
    href: "/docs/build/nodes/conditional",
    inputs: 1,
    outputs: 2,
  },
  {
    name: "JavaScript Node",
    icon: Code,
    color: "chart-3",
    description: "Execute custom JavaScript code for data transformation.",
    href: "/docs/build/nodes/javascript",
    inputs: 1,
    outputs: 1,
  },
  {
    name: "Embedding Node",
    icon: Database,
    color: "chart-2",
    description: "Generate vector embeddings for semantic search and RAG.",
    href: "/docs/build/nodes/embedding",
    inputs: 1,
    outputs: 1,
  },
  {
    name: "Tool Node",
    icon: Wrench,
    color: "amber-500",
    description: "Define AI function tools with structured outputs.",
    href: "/docs/build/nodes/tool",
    inputs: 1,
    outputs: 1,
  },
  {
    name: "Prompt Node",
    icon: FileText,
    color: "violet-500",
    description: "Store and manage reusable prompt templates.",
    href: "/docs/build/nodes/prompt",
    inputs: 1,
    outputs: 1,
  },
  {
    name: "End Node",
    icon: Square,
    color: "red-500",
    description: "Final output node. Marks the end of workflow execution.",
    href: "/docs/build/nodes/end",
    inputs: 1,
    outputs: 0,
  },
]

export default function NodesReferencePage() {
  const tocItems = [
    { id: "start-node", title: "Start Node", level: 2 },
    { id: "text-model", title: "Text Model Node", level: 2 },
    { id: "image-gen", title: "Image Generation", level: 2 },
    { id: "http-request", title: "HTTP Request", level: 2 },
    { id: "conditional", title: "Conditional Node", level: 2 },
    { id: "javascript", title: "JavaScript Node", level: 2 },
    { id: "embedding", title: "Embedding Node", level: 2 },
    { id: "tool", title: "Tool Node", level: 2 },
    { id: "prompt", title: "Prompt Node", level: 2 },
    { id: "end-node", title: "End Node", level: 2 },
  ]

  return (
    <>
      <SidebarPortal currentTab="build" />
      <TOCPortal items={tocItems} />

      <div className="space-y-8">
        <DocsBreadcrumb />

        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-balance">Node Reference</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-3xl">
            Comprehensive documentation for all 10 node types in TopFlow. Each node is a building block for your AI
            workflows.
          </p>
        </div>

        {/* Node Grid */}
        <div className="space-y-4">
          {nodes.map((node, idx) => {
            const Icon = node.icon
            const nodeId = [
              "start-node",
              "text-model",
              "image-gen",
              "http-request",
              "conditional",
              "javascript",
              "embedding",
              "tool",
              "prompt",
              "end-node",
            ][idx]

            return (
              <Link key={node.name} href={node.href}>
                <Card className="border-2 hover:border-primary/50 transition-all group" id={nodeId}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div
                          className={`h-12 w-12 rounded-lg bg-${node.color}/10 flex items-center justify-center flex-shrink-0 group-hover:bg-${node.color}/20 transition-colors`}
                        >
                          <Icon className={`h-6 w-6 text-${node.color}`} />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <CardTitle className="group-hover:text-primary transition-colors">{node.name}</CardTitle>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Badge variant="outline" className="text-xs">
                                {node.inputs} {node.inputs === 1 ? "input" : "inputs"}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {node.outputs} {node.outputs === 1 ? "output" : "outputs"}
                              </Badge>
                            </div>
                          </div>
                          <CardDescription>{node.description}</CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Quick Reference */}
        <Card className="bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader>
            <CardTitle>Node Connection Rules</CardTitle>
            <CardDescription>Understanding how nodes connect</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <h3 className="font-semibold">Input Handles (Left)</h3>
                <p className="text-muted-foreground text-xs">
                  Receive data from previous nodes. Start nodes have no inputs.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Output Handles (Right)</h3>
                <p className="text-muted-foreground text-xs">Send data to next nodes. End nodes have no outputs.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <DocsFooter
          previousPage={{
            title: "Build Overview",
            href: "/docs/build",
          }}
          nextPage={{
            title: "Workflow Patterns",
            href: "/docs/build/workflows",
          }}
        />
      </div>
    </>
  )
}
