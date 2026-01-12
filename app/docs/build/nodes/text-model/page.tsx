import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageSquare, ArrowRight, AlertCircle, CheckCircle2, Code, Zap } from "lucide-react"
import { SidebarPortal } from "@/components/docs/sidebar-portal"
import { TOCPortal } from "@/components/docs/toc-portal"

export const metadata: Metadata = {
  title: "Text Model Node - Node Reference | TopFlow Build",
  description:
    "Complete reference for the Text Model Node in TopFlow. Generate text with GPT-4, Claude, Gemini, and other LLMs. Configuration, examples, and best practices.",
  keywords: ["text model node", "gpt-4", "claude", "gemini", "llm", "ai text generation", "topflow nodes"],
}


const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "configuration", title: "Configuration", level: 2 },
  { id: "supported-models", title: "Supported Models", level: 2 },
  { id: "data-interface", title: "Node Data Interface", level: 2 },
  { id: "usage-examples", title: "Usage Examples", level: 2 },
  { id: "validation", title: "Validation Rules", level: 2 },
  { id: "code-generation", title: "Code Generation", level: 2 },
  { id: "best-practices", title: "Best Practices", level: 2 },
]

export default function TextModelNodePage() {
  return (
    <>
      <SidebarPortal currentTab="build" />
      <TOCPortal items={tocItems} />

      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Badge variant="secondary" className="mb-4">
            <MessageSquare className="mr-1 h-3 w-3" />
            AI Node
          </Badge>
          <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight">Text Model Node</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Generate text using large language models (LLMs) like GPT-4, Claude, Gemini, and more. The most versatile node in TopFlow for
            AI-powered text generation, analysis, and transformation.
          </p>
        </div>

        {/* Overview */}
        <section id="overview" className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Overview</h2>
          <div className="prose prose-sm max-w-none">
            <p>
              The <strong>Text Model Node</strong> is the core AI node for text generation. It:
            </p>
            <ul>
              <li>Connects to any LLM supported by the Vercel AI SDK</li>
              <li>Accepts text input from upstream nodes</li>
              <li>Generates text based on prompts and configuration</li>
              <li>Outputs generated text to downstream nodes</li>
              <li>Supports streaming, temperature control, and token limits</li>
            </ul>
          </div>

          <Card className="mt-6 border-2">
            <CardHeader>
              <CardTitle className="text-lg">Common Use Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                  <div>
                    <strong>Text generation</strong> - Create blog posts, reports, emails, code
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                  <div>
                    <strong>Analysis</strong> - Sentiment analysis, threat assessment, data extraction
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                  <div>
                    <strong>Classification</strong> - Categorize, tag, or label text data
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                  <div>
                    <strong>Summarization</strong> - Condense long documents into key points
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                  <div>
                    <strong>Translation</strong> - Convert between languages
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                  <div>
                    <strong>Q&A</strong> - Answer questions based on context
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
                  <h4 className="mb-2 font-semibold">model</h4>
                  <ul className="ml-4 space-y-1 text-sm">
                    <li>
                      <strong>Type</strong>: <code>string</code>
                    </li>
                    <li>
                      <strong>Required</strong>: Yes
                    </li>
                    <li>
                      <strong>Description</strong>: Model identifier (e.g., "gpt-4", "claude-3-opus")
                    </li>
                    <li>
                      <strong>Example</strong>: <code>"gpt-4"</code>, <code>"gpt-4-turbo"</code>, <code>"claude-3-sonnet-20240229"</code>
                    </li>
                    <li>
                      <strong>Validation</strong>: Must be a valid model name for the selected provider
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-2 font-semibold">prompt</h4>
                  <ul className="ml-4 space-y-1 text-sm">
                    <li>
                      <strong>Type</strong>: <code>string</code>
                    </li>
                    <li>
                      <strong>Required</strong>: Yes
                    </li>
                    <li>
                      <strong>Description</strong>: The text prompt sent to the model. Supports variable interpolation ($input1, $input2)
                    </li>
                    <li>
                      <strong>Example</strong>: <code>"Analyze this security log: $input1"</code>
                    </li>
                    <li>
                      <strong>Validation</strong>: Cannot be empty
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Optional Parameters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="mb-2 font-semibold">temperature</h4>
                  <ul className="ml-4 space-y-1 text-sm">
                    <li>
                      <strong>Type</strong>: <code>number</code>
                    </li>
                    <li>
                      <strong>Range</strong>: 0.0 to 2.0
                    </li>
                    <li>
                      <strong>Default</strong>: 0.7
                    </li>
                    <li>
                      <strong>Description</strong>: Controls randomness. Lower = more focused/deterministic, higher = more creative/random
                    </li>
                    <li>
                      <strong>Use cases</strong>: 0.0-0.3 (factual), 0.5-0.8 (balanced), 0.9-2.0 (creative)
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-2 font-semibold">maxTokens</h4>
                  <ul className="ml-4 space-y-1 text-sm">
                    <li>
                      <strong>Type</strong>: <code>number</code>
                    </li>
                    <li>
                      <strong>Range</strong>: 1 to model maximum (e.g., 4096 for GPT-4)
                    </li>
                    <li>
                      <strong>Default</strong>: 1000
                    </li>
                    <li>
                      <strong>Description</strong>: Maximum number of tokens to generate
                    </li>
                    <li>
                      <strong>Note</strong>: Higher values increase cost and latency
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-2 font-semibold">topP</h4>
                  <ul className="ml-4 space-y-1 text-sm">
                    <li>
                      <strong>Type</strong>: <code>number</code>
                    </li>
                    <li>
                      <strong>Range</strong>: 0.0 to 1.0
                    </li>
                    <li>
                      <strong>Default</strong>: 1.0
                    </li>
                    <li>
                      <strong>Description</strong>: Nucleus sampling - only consider top P probability mass
                    </li>
                    <li>
                      <strong>Note</strong>: Alternative to temperature for controlling randomness
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-2 font-semibold">frequencyPenalty</h4>
                  <ul className="ml-4 space-y-1 text-sm">
                    <li>
                      <strong>Type</strong>: <code>number</code>
                    </li>
                    <li>
                      <strong>Range</strong>: -2.0 to 2.0
                    </li>
                    <li>
                      <strong>Default</strong>: 0
                    </li>
                    <li>
                      <strong>Description</strong>: Penalize tokens based on frequency in the text so far
                    </li>
                    <li>
                      <strong>Use case</strong>: Reduce repetition (positive values)
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-2 font-semibold">presencePenalty</h4>
                  <ul className="ml-4 space-y-1 text-sm">
                    <li>
                      <strong>Type</strong>: <code>number</code>
                    </li>
                    <li>
                      <strong>Range</strong>: -2.0 to 2.0
                    </li>
                    <li>
                      <strong>Default</strong>: 0
                    </li>
                    <li>
                      <strong>Description</strong>: Penalize tokens based on whether they appear in the text
                    </li>
                    <li>
                      <strong>Use case</strong>: Encourage topic diversity (positive values)
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-2 font-semibold">stop</h4>
                  <ul className="ml-4 space-y-1 text-sm">
                    <li>
                      <strong>Type</strong>: <code>string[]</code>
                    </li>
                    <li>
                      <strong>Default</strong>: <code>undefined</code>
                    </li>
                    <li>
                      <strong>Description</strong>: Stop sequences that halt generation
                    </li>
                    <li>
                      <strong>Example</strong>: <code>["\\n\\n", "END", "---"]</code>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Supported Models */}
        <section id="supported-models" className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Supported Models</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-base">OpenAI</CardTitle>
                <CardDescription>GPT-4, GPT-3.5 models</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1.5 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">▸</span>
                    <code>gpt-4</code> - Most capable
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">▸</span>
                    <code>gpt-4-turbo</code> - Faster, cheaper
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">▸</span>
                    <code>gpt-4-turbo-preview</code> - Latest preview
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">▸</span>
                    <code>gpt-3.5-turbo</code> - Fast, affordable
                  </li>
                </ul>
                <div className="mt-3 text-xs text-muted-foreground">
                  <strong>API Key</strong>: openai
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-base">Anthropic</CardTitle>
                <CardDescription>Claude 3 family</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1.5 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">▸</span>
                    <code>claude-3-opus-20240229</code> - Most intelligent
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">▸</span>
                    <code>claude-3-sonnet-20240229</code> - Balanced
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">▸</span>
                    <code>claude-3-haiku-20240307</code> - Fastest
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">▸</span>
                    <code>claude-2.1</code> - Legacy
                  </li>
                </ul>
                <div className="mt-3 text-xs text-muted-foreground">
                  <strong>API Key</strong>: anthropic
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-base">Google</CardTitle>
                <CardDescription>Gemini models</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1.5 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">▸</span>
                    <code>gemini-pro</code> - Text only
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">▸</span>
                    <code>gemini-pro-vision</code> - Multimodal
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">▸</span>
                    <code>gemini-1.5-pro</code> - Extended context
                  </li>
                </ul>
                <div className="mt-3 text-xs text-muted-foreground">
                  <strong>API Key</strong>: google
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-base">Groq</CardTitle>
                <CardDescription>Fast inference</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1.5 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">▸</span>
                    <code>llama-3-70b</code> - High quality
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">▸</span>
                    <code>llama-3-8b</code> - Ultra fast
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">▸</span>
                    <code>mixtral-8x7b</code> - Balanced
                  </li>
                </ul>
                <div className="mt-3 text-xs text-muted-foreground">
                  <strong>API Key</strong>: groq
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
{`export type TextModelNodeData = {
  // Required configuration
  model: string
  prompt: string

  // Optional - Generation settings
  temperature?: number
  maxTokens?: number
  topP?: number
  frequencyPenalty?: number
  presencePenalty?: number
  stop?: string[]

  // Execution state (managed by system)
  status?: "idle" | "running" | "completed" | "error"
  output?: any
  error?: string
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
                <CardTitle className="text-lg">Example 1: Simple Text Generation</CardTitle>
                <CardDescription>Basic usage with minimal configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <pre className="overflow-x-auto rounded bg-muted p-4 text-xs">
{`import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

const result = await generateText({
  model: openai("gpt-4"),
  prompt: "Explain quantum computing in simple terms"
})

console.log(result.text)
// Output: "Quantum computing is..."`}
                </pre>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Example 2: Security Log Analysis</CardTitle>
                <CardDescription>Real-world use case with variable interpolation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose prose-sm max-w-none">
                  <p>
                    <strong>Workflow setup</strong>:
                  </p>
                </div>
                <pre className="overflow-x-auto rounded bg-muted p-4 text-xs">
{`const workflow = {
  nodes: [
    {
      id: "start",
      type: "start",
      data: { input: "Failed login from IP 192.168.1.100" }
    },
    {
      id: "analyze",
      type: "textModel",
      data: {
        model: "gpt-4",
        prompt: \`Analyze this security event and provide:
1. Severity (LOW/MEDIUM/HIGH/CRITICAL)
2. Potential threat type
3. Recommended action

Event: $input1\`,
        temperature: 0.3, // More deterministic for security analysis
        maxTokens: 500
      }
    }
  ],
  edges: [
    { id: "e1", source: "start", target: "analyze" }
  ]
}`}
                </pre>
                <div className="prose prose-sm max-w-none">
                  <p>
                    <strong>Expected output</strong>:
                  </p>
                </div>
                <pre className="overflow-x-auto rounded bg-muted p-4 text-xs">
{`Severity: HIGH

Potential threat type: Brute force attack or unauthorized access attempt

Recommended action:
1. Block IP 192.168.1.100 immediately
2. Review recent activity from this IP
3. Notify security team for further investigation`}
                </pre>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Example 3: Multi-Step Analysis</CardTitle>
                <CardDescription>Chaining multiple Text Model nodes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <pre className="overflow-x-auto rounded bg-muted p-4 text-xs">
{`const workflow = {
  nodes: [
    {
      id: "start",
      type: "start",
      data: { input: "Customer feedback text..." }
    },
    {
      id: "sentiment",
      type: "textModel",
      data: {
        model: "gpt-4",
        prompt: "Classify sentiment (positive/negative/neutral): $input1",
        temperature: 0.2,
        maxTokens: 50
      }
    },
    {
      id: "topics",
      type: "textModel",
      data: {
        model: "gpt-4",
        prompt: "Extract key topics from: $input1",
        temperature: 0.3,
        maxTokens: 200
      }
    },
    {
      id: "summary",
      type: "textModel",
      data: {
        model: "gpt-4",
        prompt: \`Summarize this feedback analysis:
Sentiment: $input1
Topics: $input2

Original feedback: $input3\`,
        temperature: 0.5,
        maxTokens: 300
      }
    }
  ],
  edges: [
    { source: "start", target: "sentiment" },
    { source: "start", target: "topics" },
    { source: "sentiment", target: "summary" },
    { source: "topics", target: "summary" },
    { source: "start", target: "summary" }
  ]
}`}
                </pre>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Example 4: Temperature Control</CardTitle>
                <CardDescription>Different temperatures for different use cases</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border p-3">
                    <div className="mb-2 text-sm font-semibold">Factual (Low Temperature)</div>
                    <pre className="overflow-x-auto rounded bg-muted p-2 text-xs">
{`{
  model: "gpt-4",
  prompt: "What is 2+2?",
  temperature: 0.1
}
// Nearly always: "4"`}
                    </pre>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="mb-2 text-sm font-semibold">Creative (High Temperature)</div>
                    <pre className="overflow-x-auto rounded bg-muted p-2 text-xs">
{`{
  model: "gpt-4",
  prompt: "Write a poem",
  temperature: 1.5
}
// Highly varied output`}
                    </pre>
                  </div>
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
                      <strong>Missing Model</strong>
                      <p className="text-muted-foreground">Model field cannot be empty</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">❌</span>
                    <div>
                      <strong>Empty Prompt</strong>
                      <p className="text-muted-foreground">Prompt field cannot be empty</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">❌</span>
                    <div>
                      <strong>Missing API Key</strong>
                      <p className="text-muted-foreground">No API key configured for selected provider (openai, anthropic, google, groq)</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">❌</span>
                    <div>
                      <strong>Invalid Temperature</strong>
                      <p className="text-muted-foreground">Temperature must be between 0 and 2</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-yellow-500/20 bg-yellow-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                  Warnings (Don't Block)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500">⚠️</span>
                    <div>
                      <strong>High Temperature</strong>
                      <p className="text-muted-foreground">Temperature &gt; 1.5 may produce inconsistent results</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500">⚠️</span>
                    <div>
                      <strong>Large maxTokens</strong>
                      <p className="text-muted-foreground">maxTokens &gt; 2000 increases cost and latency significantly</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500">⚠️</span>
                    <div>
                      <strong>PII in Prompt</strong>
                      <p className="text-muted-foreground">Prompt contains potential personal data (email, SSN, credit card)</p>
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
              <CardDescription>When exporting workflow to code</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose prose-sm max-w-none">
                <p>
                  <strong>Workflow Function Export</strong>:
                </p>
              </div>
              <pre className="overflow-x-auto rounded bg-muted p-4 text-xs">
{`import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

export async function runAgentWorkflow(initialInput?: string) {
  const node_start = initialInput || "Default input"

  // Text Model node generates this code
  const node_textModel = await generateText({
    model: openai("gpt-4"),
    prompt: \`Analyze: \${node_start}\`,
    temperature: 0.7,
    maxTokens: 1000,
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
{`export async function POST(req: Request) {
  const { input } = await req.json()

  const result = await generateText({
    model: openai(process.env.OPENAI_API_KEY!),
    prompt: \`Analyze: \${input}\`,
    temperature: 0.7,
    maxTokens: 1000,
  })

  return Response.json({
    output: result.text,
    usage: result.usage
  })
}`}
              </pre>
            </CardContent>
          </Card>
        </section>

        {/* Best Practices */}
        <section id="best-practices" className="mb-12">
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
                    <div>Use low temperature (0.1-0.3) for factual responses</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <div>Use medium temperature (0.5-0.8) for creative tasks</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <div>Set maxTokens to minimum needed for your use case</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <div>Use clear, specific prompts with examples</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <div>Test with multiple temperature values to find optimal</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <div>Use stop sequences to prevent over-generation</div>
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
                    <div>Don't use high temperature for factual queries</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <div>Don't set maxTokens higher than needed (wastes money)</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <div>Don't include PII in prompts without masking</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <div>Don't use vague prompts ("analyze this")</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <div>Don't assume first output is best (test variations)</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <div>Don't hardcode API keys in prompts</div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6 border-2 border-blue-500/20 bg-blue-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Zap className="h-5 w-5 text-blue-500" />
                Performance Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Model Selection</strong>:
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• GPT-4: Highest quality, slowest (3-10s)</li>
                    <li>• GPT-3.5 Turbo: Good balance (1-3s)</li>
                    <li>• Claude 3 Haiku: Fast, cost-effective (1-2s)</li>
                    <li>• Groq Llama 3 70B: Fastest, GPT-4 quality (0.5-2s)</li>
                  </ul>
                </div>
                <div>
                  <strong>Cost Optimization</strong>:
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Use cheaper models for simple tasks</li>
                    <li>• Reduce maxTokens to minimum</li>
                    <li>• Cache common responses</li>
                    <li>• Batch similar requests</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Related Nodes */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Related Nodes</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="border-2 transition-all hover:border-primary/50 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Prompt Node</CardTitle>
                <CardDescription>Template and reuse prompts</CardDescription>
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

            <Card className="border-2 transition-all hover:border-primary/50 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Structured Output Node</CardTitle>
                <CardDescription>Parse AI responses into validated JSON</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/docs/build/nodes/structured-output">
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
            Explore related nodes and patterns for building AI workflows:
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/docs/build/nodes/http-request">
                HTTP Request Node
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/docs/build/nodes">View All Nodes</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/docs/learn/best-practices">Best Practices</Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  )
}
