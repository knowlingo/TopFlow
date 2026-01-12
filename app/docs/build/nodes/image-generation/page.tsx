import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ImageIcon, AlertCircle, CheckCircle2, Info, ArrowRight, Sparkles, Code } from "lucide-react"
import { SidebarPortal } from "@/components/docs/sidebar-portal"
import { TOCPortal } from "@/components/docs/toc-portal"

export const metadata: Metadata = {
  title: "Image Generation Node - Node Reference | TopFlow Build",
  description:
    "Complete reference for the Image Generation Node in TopFlow. Generate images from text prompts using AI models like Flux Pro and Gemini.",
  keywords: ["image generation", "flux pro", "gemini", "ai images", "topflow nodes"],
}

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "configuration", title: "Configuration", level: 2 },
  { id: "data-interface", title: "Node Data Interface", level: 2 },
  { id: "usage-examples", title: "Usage Examples", level: 2 },
  { id: "supported-models", title: "Supported Models", level: 2 },
  { id: "validation", title: "Validation Rules", level: 2 },
  { id: "best-practices", title: "Best Practices", level: 2 },
  { id: "troubleshooting", title: "Troubleshooting", level: 2 },
]

export default function ImageGenerationNodePage() {
  return (
    <>
      <SidebarPortal currentTab="build" />
      <TOCPortal items={tocItems} />

      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Badge variant="secondary" className="mb-4">
            <ImageIcon className="mr-1 h-3 w-3" />
            AI Model Node
          </Badge>
          <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight">Image Generation Node</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Generate images from text descriptions using state-of-the-art AI models like Flux Pro and Gemini. Convert
            any text prompt into high-quality images programmatically.
          </p>
        </div>

        {/* Overview */}
        <section id="overview" className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Overview</h2>
          <div className="prose prose-sm max-w-none">
            <p>
              The <strong>Image Generation Node</strong> converts text prompts into images using AI models. It accepts
              a text description as input and outputs a base64-encoded image that can be displayed, downloaded, or
              passed to other nodes for further processing.
            </p>
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
                    <strong>Marketing Assets</strong> - Generate product images, social media graphics, ad creatives
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                  <div>
                    <strong>Data Visualization</strong> - Create charts, infographics, threat intelligence maps
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                  <div>
                    <strong>Content Generation</strong> - Produce illustrations for blog posts or documentation
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                  <div>
                    <strong>Security Reporting</strong> - Generate visual threat landscape diagrams
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                  <div>
                    <strong>Compliance Documentation</strong> - Create workflow diagrams for audit reports
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mt-6 border-2">
            <CardHeader>
              <CardTitle className="text-lg">Node Characteristics</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="h-4 w-4 shrink-0 text-muted-foreground">•</div>
                  <div>
                    <strong>Input</strong>: Text prompt (from Start node, Prompt node, or any text source)
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-4 w-4 shrink-0 text-muted-foreground">•</div>
                  <div>
                    <strong>Output</strong>: Base64-encoded image (PNG, JPEG, or WEBP format)
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-4 w-4 shrink-0 text-muted-foreground">•</div>
                  <div>
                    <strong>Processing Time</strong>: 3-30 seconds depending on model and complexity
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-4 w-4 shrink-0 text-muted-foreground">•</div>
                  <div>
                    <strong>Handles</strong>: One input handle (left), one output handle (right)
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
              <CardContent className="space-y-6">
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
                      <strong>Options</strong>: <code>black-forest-labs/flux-1.1-pro</code>,{" "}
                      <code>black-forest-labs/flux-pro</code>, <code>gemini-2.5-flash-image</code>
                    </li>
                    <li>
                      <strong>Description</strong>: AI model to use for image generation
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
                      <strong>Source</strong>: Received from connected input node
                    </li>
                    <li>
                      <strong>Description</strong>: Text description of the image to generate
                    </li>
                    <li>
                      <strong>Example</strong>:{" "}
                      <code>"Professional infographic showing GDPR data subject rights, modern flat design"</code>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Optional Parameters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="mb-2 font-semibold">aspectRatio</h4>
                  <ul className="ml-4 space-y-1 text-sm">
                    <li>
                      <strong>Type</strong>: <code>string</code>
                    </li>
                    <li>
                      <strong>Default</strong>: <code>"1:1"</code>
                    </li>
                    <li>
                      <strong>Options</strong>: <code>"1:1"</code>, <code>"16:9"</code>, <code>"9:16"</code>,{" "}
                      <code>"4:3"</code>, <code>"3:4"</code>, <code>"21:9"</code>
                    </li>
                    <li>
                      <strong>Description</strong>: Image dimensions ratio
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-2 font-semibold">outputFormat</h4>
                  <ul className="ml-4 space-y-1 text-sm">
                    <li>
                      <strong>Type</strong>: <code>string</code>
                    </li>
                    <li>
                      <strong>Default</strong>: <code>"png"</code>
                    </li>
                    <li>
                      <strong>Options</strong>: <code>"png"</code>, <code>"jpeg"</code>, <code>"webp"</code>
                    </li>
                    <li>
                      <strong>Description</strong>: Output image format
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
                    <strong>Be specific</strong> - Include style, colors, composition, and mood in your prompts for
                    better results.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-blue-500" />
                  <div>
                    <strong>Choose the right model</strong> - Use Flux 1.1 Pro for speed, Flux Pro for maximum quality,
                    Gemini Flash for quick prototypes.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-blue-500" />
                  <div>
                    <strong>Aspect ratio matters</strong> - Square (1:1) is fastest, ultrawide (21:9) takes longest.
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
{`export type ImageGenerationNodeData = {
  // Configuration
  model: string                    // AI model identifier
  aspectRatio?: string             // Image dimensions ratio
  outputFormat?: string            // Output format (png/jpeg/webp)

  // Execution state (managed by system)
  status?: "idle" | "running" | "completed" | "error"
  output?: {
    url?: string                   // Base64 data URL
    images?: string[]              // Array of base64 images
    text?: string                  // Optional description
  }
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

export function ImageGenerationNode({ data, id }: NodeProps<ImageGenerationNodeData>) {
  // Component implementation
  return (
    <div className="image-generation-node">
      <Handle type="target" position={Position.Left} />
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
                <CardTitle className="text-lg">Example 1: Basic Image Generation</CardTitle>
                <CardDescription>Simple workflow with prompt and image generation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <pre className="overflow-x-auto rounded bg-muted p-4 text-xs">
{`const workflow = {
  nodes: [
    {
      id: "start-1",
      type: "start",
      data: {
        input: "cybersecurity threat landscape"
      }
    },
    {
      id: "prompt-1",
      type: "prompt",
      data: {
        template: "Create a professional diagram showing $input1, modern flat design"
      }
    },
    {
      id: "image-1",
      type: "imageGeneration",
      data: {
        model: "black-forest-labs/flux-1.1-pro",
        aspectRatio: "16:9"
      }
    },
    {
      id: "end-1",
      type: "end"
    }
  ],
  edges: [
    { id: "e1", source: "start-1", target: "prompt-1" },
    { id: "e2", source: "prompt-1", target: "image-1" },
    { id: "e3", source: "image-1", target: "end-1" }
  ]
}`}
                </pre>
                <div className="text-sm text-muted-foreground">
                  <strong>Result</strong>: Generates a 16:9 diagram image of cybersecurity threat landscape
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Example 2: AI-Enhanced Prompts</CardTitle>
                <CardDescription>Use Text Model to refine the image prompt</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <pre className="overflow-x-auto rounded bg-muted p-4 text-xs">
{`const workflow = {
  nodes: [
    {
      id: "start-1",
      type: "start",
      data: { input: "GDPR compliance" }
    },
    {
      id: "text-1",
      type: "textModel",
      data: {
        model: "gpt-4",
        prompt: "Create a detailed image prompt for a professional infographic about $input1"
      }
    },
    {
      id: "image-1",
      type: "imageGeneration",
      data: {
        model: "black-forest-labs/flux-1.1-pro",
        aspectRatio: "1:1"
      }
    }
  ],
  edges: [
    { id: "e1", source: "start-1", target: "text-1" },
    { id: "e2", source: "text-1", target: "image-1" }
  ]
}`}
                </pre>
                <div className="text-sm text-muted-foreground">
                  <strong>Result</strong>: GPT-4 creates an enhanced prompt, then generates a high-quality infographic
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Example 3: Security Report Visualization</CardTitle>
                <CardDescription>Generate threat maps from security data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <pre className="overflow-x-auto rounded bg-muted p-4 text-xs">
{`const workflow = {
  nodes: [
    {
      id: "http-1",
      type: "httpRequest",
      data: {
        url: "https://api.example.com/threat-data",
        method: "GET"
      }
    },
    {
      id: "js-1",
      type: "javascript",
      data: {
        code: "return JSON.parse(input1).threats.map(t => t.type).join(', ')"
      }
    },
    {
      id: "prompt-1",
      type: "prompt",
      data: {
        template: "Create a heat map visualization showing these cyber threats: $input1"
      }
    },
    {
      id: "image-1",
      type: "imageGeneration",
      data: {
        model: "gemini-2.5-flash-image", // Fast for real-time reports
        aspectRatio: "16:9"
      }
    }
  ],
  edges: [
    { id: "e1", source: "http-1", target: "js-1" },
    { id: "e2", source: "js-1", target: "prompt-1" },
    { id: "e3", source: "prompt-1", target: "image-1" }
  ]
}`}
                </pre>
                <div className="text-sm text-muted-foreground">
                  <strong>Result</strong>: Fetches live threat data and generates a visual heat map for security reports
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Supported Models */}
        <section id="supported-models" className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Supported Models</h2>

          <Card className="border-2 mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Flux Pro Models (Recommended)</CardTitle>
              <CardDescription>via FAL API - Industry-leading image quality</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border bg-muted/50 p-4">
                    <h4 className="mb-2 font-semibold">black-forest-labs/flux-1.1-pro</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>
                        <strong>Speed</strong>: Fast (5-10s)
                      </li>
                      <li>
                        <strong>Quality</strong>: ⭐⭐⭐⭐⭐
                      </li>
                      <li>
                        <strong>Best For</strong>: Professional images, marketing assets
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-lg border bg-muted/50 p-4">
                    <h4 className="mb-2 font-semibold">black-forest-labs/flux-pro</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>
                        <strong>Speed</strong>: Medium (10-20s)
                      </li>
                      <li>
                        <strong>Quality</strong>: ⭐⭐⭐⭐⭐
                      </li>
                      <li>
                        <strong>Best For</strong>: Maximum quality, detailed illustrations
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Google Gemini Models (Alternative)</CardTitle>
              <CardDescription>via Google AI - Fast and cost-effective</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border bg-muted/50 p-4">
                <h4 className="mb-2 font-semibold">gemini-2.5-flash-image</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>
                    <strong>Speed</strong>: Very Fast (3-7s)
                  </li>
                  <li>
                    <strong>Quality</strong>: ⭐⭐⭐⭐
                  </li>
                  <li>
                    <strong>Best For</strong>: Quick diagrams, prototypes, data visualizations
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-500/20 bg-blue-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Info className="h-5 w-5 text-blue-500" />
                API Keys Required
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>You need API keys from the respective providers:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Sparkles className="mt-0.5 h-4 w-4 text-blue-500" />
                  <div>
                    <strong>FAL (for Flux models)</strong>: Get API key at{" "}
                    <a
                      href="https://fal.ai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      fal.ai
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="mt-0.5 h-4 w-4 text-blue-500" />
                  <div>
                    <strong>Google AI (for Gemini)</strong>: Get API key at{" "}
                    <a
                      href="https://aistudio.google.com/app/apikey"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Google AI Studio
                    </a>
                  </div>
                </li>
              </ul>
              <p className="text-xs text-muted-foreground">
                Add your API keys via Settings → API Keys in the TopFlow builder interface.
              </p>
            </CardContent>
          </Card>
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
                      <strong>No Model Selected</strong>
                      <p className="text-muted-foreground">Must select a valid image generation model</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">❌</span>
                    <div>
                      <strong>Missing API Key</strong>
                      <p className="text-muted-foreground">
                        API key for selected provider (FAL or Google AI) must be configured
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">❌</span>
                    <div>
                      <strong>No Input Connection</strong>
                      <p className="text-muted-foreground">
                        Image Generation node must receive prompt from upstream node
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-yellow-500/20 bg-yellow-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                  Warnings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500">⚠️</span>
                    <div>
                      <strong>Empty Prompt</strong>
                      <p className="text-muted-foreground">
                        Prompt appears to be empty. Image generation may fail or produce unexpected results.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500">⚠️</span>
                    <div>
                      <strong>Very Short Prompt</strong>
                      <p className="text-muted-foreground">
                        Prompts with less than 10 characters may produce low-quality images.
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Best Practices */}
        <section id="best-practices" className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Best Practices</h2>

          <div className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Writing Effective Prompts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border-2 border-green-500/50 bg-green-500/5 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <h4 className="font-semibold text-green-500">Good Prompt</h4>
                    </div>
                    <code className="text-xs">
                      "Professional infographic showing GDPR data subject rights: access, rectification, erasure,
                      restriction, portability, objection. Modern flat design, blue and white color scheme, icons for
                      each right, clean layout"
                    </code>
                    <p className="mt-2 text-xs text-muted-foreground">✅ Specific style, colors, elements described</p>
                  </div>

                  <div className="rounded-lg border-2 border-red-500/50 bg-red-500/5 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                      <h4 className="font-semibold text-red-500">Poor Prompt</h4>
                    </div>
                    <code className="text-xs">"GDPR diagram"</code>
                    <p className="mt-2 text-xs text-muted-foreground">❌ Too vague, no style or detail</p>
                  </div>
                </div>

                <div className="rounded-lg bg-muted/50 p-4">
                  <h4 className="mb-3 font-semibold">Prompt Writing Tips</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                      <div>
                        <strong>Be specific</strong>: Describe style, colors, composition, and mood
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                      <div>
                        <strong>Include context</strong>: "professional", "technical", "educational", etc.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                      <div>
                        <strong>Specify format</strong>: diagram, infographic, illustration, chart, map
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                      <div>
                        <strong>Mention colors</strong>: Color schemes improve consistency
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                      <div>
                        <strong>Add adjectives</strong>: Clean, modern, detailed, minimalist, etc.
                      </div>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

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
                      <div>Use Flux 1.1 Pro for best balance of speed and quality</div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <div>Test prompts with quick models first (Gemini Flash)</div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <div>Cache generated images to avoid regenerating</div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <div>Use conditional nodes to control when images generate</div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <div>Validate input prompts to prevent injection attacks</div>
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
                      <div>Don't use vague prompts like "make an image"</div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">✗</span>
                      <div>Don't regenerate images on every workflow run (cache them)</div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">✗</span>
                      <div>Don't use ultrawide aspect ratios unless necessary (slow)</div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">✗</span>
                      <div>Don't pass sensitive data in prompts (may be logged)</div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">✗</span>
                      <div>Don't expect instant results (allow 5-30s processing time)</div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Troubleshooting */}
        <section id="troubleshooting" className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Troubleshooting</h2>

          <div className="space-y-4">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Error: "API key missing"</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>
                  <strong>Cause</strong>: No API key configured for the selected model provider.
                </p>
                <p>
                  <strong>Solution</strong>: Click "API Keys" in the top toolbar and add your FAL or Google AI API key.
                  Make sure you've selected the correct provider for your model.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Error: "Generation failed"</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>
                  <strong>Possible Causes</strong>:
                </p>
                <ul className="ml-4 space-y-1">
                  <li>• Invalid or expired API key</li>
                  <li>• Rate limit exceeded (too many requests)</li>
                  <li>• Content filter triggered (inappropriate prompt)</li>
                  <li>• Network timeout or connectivity issue</li>
                </ul>
                <p>
                  <strong>Solutions</strong>: Verify API key is valid, wait 1 minute for rate limit reset, rephrase
                  prompt to avoid content filters, or check network connection.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Issue: Image quality is poor</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>
                  <strong>Cause</strong>: Vague prompt or suboptimal model selected.
                </p>
                <p>
                  <strong>Solution</strong>: Switch to <code>black-forest-labs/flux-1.1-pro</code> for better quality.
                  Add more descriptive details to your prompt (style, colors, composition, specific elements). Use a
                  Text Model node to enhance the prompt before generation.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Issue: Generation is too slow</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>
                  <strong>Cause</strong>: High-quality model or large aspect ratio selected.
                </p>
                <p>
                  <strong>Solution</strong>: Switch to <code>gemini-2.5-flash-image</code> for 3-5x faster generation.
                  Use square (1:1) aspect ratio for fastest results. Consider caching results to avoid regeneration.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-500/20 bg-blue-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Info className="h-5 w-5 text-blue-500" />
                  Output Format
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>Images are returned as base64-encoded data URLs in this format:</p>
                <pre className="overflow-x-auto rounded bg-muted p-2 text-xs">
                  {`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...`}
                </pre>
                <p>
                  <strong>Using the image in other nodes:</strong>
                </p>
                <ul className="ml-4 space-y-1">
                  <li>
                    <strong>Display inline</strong>: Use the data URL directly in <code>&lt;img src="..." /&gt;</code>
                  </li>
                  <li>
                    <strong>Download</strong>: Click the "Download" button in the node output panel
                  </li>
                  <li>
                    <strong>Upload to storage</strong>: Use an HTTP Request node to upload to S3, Cloudinary, etc.
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
                <CardTitle className="text-lg">Text Model Node</CardTitle>
                <CardDescription>Generate or refine image prompts with AI</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/docs/build/nodes/text-model">
                    View Documentation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 transition-all hover:border-primary/50 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Prompt Node</CardTitle>
                <CardDescription>Template-based prompt generation for images</CardDescription>
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
            Continue learning about image generation and related node types:
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/docs/learn/tutorials">
                <Sparkles className="mr-2 h-4 w-4" />
                Image Generation Tutorials
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
