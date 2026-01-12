import { SidebarPortal } from "@/components/docs/sidebar-portal"
import { TOCPortal } from "@/components/docs/toc-portal"
import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageIcon, AlertTriangle, Info, CheckCircle } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Image Generation Node | TopFlow Documentation",
  description: "Generate images from text prompts using AI models like Flux Pro. Complete API reference for the Image Generation node in TopFlow.",
}

export default function ImageGenerationNodePage() {
  const tocItems = [
    { id: "overview", title: "Overview" },
    { id: "parameters", title: "Parameters" },
    { id: "usage", title: "Usage Examples" },
    { id: "supported-models", title: "Supported Models" },
    { id: "best-practices", title: "Best Practices" },
    { id: "troubleshooting", title: "Troubleshooting" },
  ]

  return (
    <>
      <SidebarPortal currentTab="build" />
      <TOCPortal items={tocItems} />

      <div className="prose prose-invert max-w-none">
        <h1>Image Generation Node</h1>
        <p className="text-xl text-muted-foreground">
          Generate images from text descriptions using AI models like Flux Pro and Gemini.
          Connect this node to any text source to create images programmatically.
        </p>

        <section id="overview">
          <h2>Overview</h2>
          <p>
            The <strong>Image Generation Node</strong> converts text prompts into images using state-of-the-art AI models.
            It accepts a text prompt as input and outputs a base64-encoded image that can be displayed, downloaded, or
            passed to other nodes.
          </p>

          <Card className="my-6 border-chart-1">
            <CardHeader>
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-chart-1/20 flex items-center justify-center">
                  <ImageIcon className="h-5 w-5 text-chart-1" />
                </div>
                <div>
                  <CardTitle className="text-lg">Node Type</CardTitle>
                  <CardDescription>AI Model → Image Output</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-start gap-2">
                <div className="h-5 w-5 shrink-0 text-muted-foreground">•</div>
                <p className="text-sm"><strong>Input</strong>: Text prompt (from Start node, Prompt node, or any text source)</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="h-5 w-5 shrink-0 text-muted-foreground">•</div>
                <p className="text-sm"><strong>Output</strong>: Base64-encoded image (PNG, JPEG, or WEBP format)</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="h-5 w-5 shrink-0 text-muted-foreground">•</div>
                <p className="text-sm"><strong>Processing Time</strong>: 5-30 seconds depending on model and complexity</p>
              </div>
            </CardContent>
          </Card>

          <h3>Common Use Cases</h3>
          <ul>
            <li><strong>Marketing Assets</strong>: Generate product images, social media graphics, or ad creatives</li>
            <li><strong>Data Visualization</strong>: Create charts, infographics, or threat intelligence maps</li>
            <li><strong>Content Generation</strong>: Produce illustrations for blog posts or documentation</li>
            <li><strong>Security Reporting</strong>: Generate visual threat landscape diagrams</li>
            <li><strong>Compliance Documentation</strong>: Create workflow diagrams for audit reports</li>
          </ul>
        </section>

        <section id="parameters">
          <h2>Parameters</h2>

          <h3>Required Parameters</h3>
          <table>
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>model</code></td>
                <td><code>string</code></td>
                <td>AI model to use for image generation (e.g., <code>gemini-2.5-flash-image</code>, <code>black-forest-labs/flux-1.1-pro</code>)</td>
              </tr>
              <tr>
                <td><code>prompt</code></td>
                <td><code>string</code></td>
                <td>Text description of the image to generate (received from connected input node)</td>
              </tr>
            </tbody>
          </table>

          <h3>Optional Parameters</h3>
          <table>
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>aspectRatio</code></td>
                <td><code>string</code></td>
                <td><code>"1:1"</code></td>
                <td>Image dimensions ratio (<code>"1:1"</code>, <code>"16:9"</code>, <code>"9:16"</code>, <code>"4:3"</code>, etc.)</td>
              </tr>
              <tr>
                <td><code>outputFormat</code></td>
                <td><code>string</code></td>
                <td><code>"png"</code></td>
                <td>Output image format (<code>"png"</code>, <code>"jpeg"</code>, <code>"webp"</code>)</td>
              </tr>
            </tbody>
          </table>

          <h3>Node Data Interface</h3>
          <pre><code className="language-typescript">{`export type ImageGenerationNodeData = {
  model: string                    // AI model identifier
  aspectRatio?: string             // Image dimensions ratio
  outputFormat?: string            // Output format (png/jpeg/webp)
  status?: "idle" | "running" | "completed" | "error"
  output?: {
    url?: string                   // Base64 data URL
    images?: string[]              // Array of base64 images
    text?: string                  // Optional description
  }
}`}</code></pre>
        </section>

        <section id="usage">
          <h2>Usage Examples</h2>

          <h3>Basic Image Generation</h3>
          <p>
            Connect a Prompt node to the Image Generation node to create images from templates:
          </p>

          <Card className="my-4 bg-muted/50">
            <CardHeader>
              <CardTitle className="text-base">Example Workflow</CardTitle>
            </CardHeader>
            <CardContent>
              <pre><code>{`Start Node (user input: "cybersecurity threat")
  ↓
Prompt Node:
  Create a professional diagram showing cyber threat landscape for {{input1}}
  ↓
Image Generation Node:
  Model: black-forest-labs/flux-1.1-pro
  Aspect Ratio: 16:9
  ↓
End Node (displays generated image)`}</code></pre>
            </CardContent>
          </Card>

          <h3>Multi-Step Generation</h3>
          <p>
            Use a Text Model to refine the prompt before generating the image:
          </p>

          <Card className="my-4 bg-muted/50">
            <CardHeader>
              <CardTitle className="text-base">Advanced Workflow</CardTitle>
            </CardHeader>
            <CardContent>
              <pre><code>{`Start Node (topic: "GDPR compliance")
  ↓
Text Model Node (GPT-4):
  Create a detailed image prompt for a professional infographic about {{input1}}
  ↓
Image Generation Node:
  Model: black-forest-labs/flux-1.1-pro
  Aspect Ratio: 1:1
  ↓
End Node`}</code></pre>
            </CardContent>
          </Card>

          <h3>Security Report Visualization</h3>
          <p>
            Generate threat maps from security data:
          </p>

          <Card className="my-4 bg-muted/50">
            <CardHeader>
              <CardTitle className="text-base">Security Use Case</CardTitle>
            </CardHeader>
            <CardContent>
              <pre><code>{`HTTP Request Node (fetch threat data)
  ↓
JavaScript Node (process and summarize)
  ↓
Prompt Node:
  Create a heat map visualization showing cyber threats: {{input1}}
  ↓
Image Generation Node:
  Model: gemini-2.5-flash-image
  ↓
End Node (include in security report)`}</code></pre>
            </CardContent>
          </Card>
        </section>

        <section id="supported-models">
          <h2>Supported Models</h2>

          <h3>Recommended: Flux Pro (via FAL)</h3>
          <table>
            <thead>
              <tr>
                <th>Model</th>
                <th>Speed</th>
                <th>Quality</th>
                <th>Best For</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>black-forest-labs/flux-1.1-pro</code></td>
                <td>Fast (5-10s)</td>
                <td>⭐⭐⭐⭐⭐</td>
                <td>High-quality professional images, marketing assets</td>
              </tr>
              <tr>
                <td><code>black-forest-labs/flux-pro</code></td>
                <td>Medium (10-20s)</td>
                <td>⭐⭐⭐⭐⭐</td>
                <td>Maximum quality, detailed illustrations</td>
              </tr>
            </tbody>
          </table>

          <h3>Alternative: Google Gemini</h3>
          <table>
            <thead>
              <tr>
                <th>Model</th>
                <th>Speed</th>
                <th>Quality</th>
                <th>Best For</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>gemini-2.5-flash-image</code></td>
                <td>Very Fast (3-7s)</td>
                <td>⭐⭐⭐⭐</td>
                <td>Quick diagrams, prototypes, data visualizations</td>
              </tr>
            </tbody>
          </table>

          <Card className="my-6 border-chart-3 bg-chart-3/5">
            <CardHeader>
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-chart-3 mt-0.5" />
                <div>
                  <CardTitle className="text-base">API Key Required</CardTitle>
                  <CardDescription>
                    You need a FAL API key for Flux models or Google AI API key for Gemini models.
                    Add your keys in Settings → API Keys.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• <strong>FAL</strong>: Get API key at <a href="https://fal.ai" target="_blank" rel="noopener noreferrer" className="text-chart-3 hover:underline">fal.ai</a></li>
                <li>• <strong>Google AI</strong>: Get API key at <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-chart-3 hover:underline">Google AI Studio</a></li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section id="best-practices">
          <h2>Best Practices</h2>

          <h3>Writing Effective Prompts</h3>
          <div className="space-y-4 my-6">
            <Card className="border-green-500/50">
              <CardHeader>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <CardTitle className="text-base text-green-500">Good Prompt</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <code className="text-sm">
                  "Professional infographic showing GDPR data subject rights: access, rectification, erasure,
                  restriction, portability, objection. Modern flat design, blue and white color scheme,
                  icons for each right, clean layout"
                </code>
                <p className="text-sm text-muted-foreground mt-3">
                  ✅ Specific style, colors, elements, and layout described
                </p>
              </CardContent>
            </Card>

            <Card className="border-red-500/50">
              <CardHeader>
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <CardTitle className="text-base text-red-500">Poor Prompt</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <code className="text-sm">
                  "GDPR diagram"
                </code>
                <p className="text-sm text-muted-foreground mt-3">
                  ❌ Too vague, no style or detail specified
                </p>
              </CardContent>
            </Card>
          </div>

          <h3>Prompt Writing Tips</h3>
          <ul>
            <li><strong>Be specific</strong>: Describe style, colors, composition, and mood</li>
            <li><strong>Include context</strong>: "professional", "technical", "educational", etc.</li>
            <li><strong>Specify format</strong>: diagram, infographic, illustration, chart, map</li>
            <li><strong>Mention colors</strong>: Color schemes improve consistency</li>
            <li><strong>Add adjectives</strong>: Clean, modern, detailed, minimalist, etc.</li>
          </ul>

          <h3>Performance Optimization</h3>
          <ul>
            <li><strong>Choose the right model</strong>: Use Gemini for speed, Flux Pro for quality</li>
            <li><strong>Aspect ratio matters</strong>: Square (1:1) is fastest, ultrawide (21:9) is slowest</li>
            <li><strong>Cache results</strong>: Store generated images to avoid regenerating</li>
            <li><strong>Use conditional nodes</strong>: Only generate images when needed</li>
          </ul>

          <h3>Security Considerations</h3>
          <ul>
            <li><strong>Validate prompts</strong>: Ensure user input doesn't contain injection attempts</li>
            <li><strong>Rate limiting</strong>: TopFlow limits image generation to prevent API abuse</li>
            <li><strong>Content filtering</strong>: Some models filter inappropriate content automatically</li>
            <li><strong>Output validation</strong>: Always check that output is actually an image before using</li>
          </ul>
        </section>

        <section id="troubleshooting">
          <h2>Troubleshooting</h2>

          <h3>Common Issues</h3>

          <Card className="my-6">
            <CardHeader>
              <CardTitle className="text-base">Error: "API key missing"</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                <strong>Cause</strong>: No API key configured for the selected model provider.
              </p>
              <p className="text-sm">
                <strong>Solution</strong>: Click "API Keys" in the top toolbar and add your FAL or Google AI API key.
              </p>
            </CardContent>
          </Card>

          <Card className="my-6">
            <CardHeader>
              <CardTitle className="text-base">Error: "Generation failed"</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                <strong>Possible Causes</strong>:
              </p>
              <ul className="text-sm space-y-1">
                <li>• Invalid or expired API key</li>
                <li>• Rate limit exceeded</li>
                <li>• Content filter triggered (inappropriate prompt)</li>
                <li>• Network timeout</li>
              </ul>
              <p className="text-sm">
                <strong>Solutions</strong>: Check API key validity, wait 1 minute for rate limit reset,
                or rephrase prompt to avoid content filters.
              </p>
            </CardContent>
          </Card>

          <Card className="my-6">
            <CardHeader>
              <CardTitle className="text-base">Issue: Image quality is poor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                <strong>Cause</strong>: Vague prompt or wrong model selected.
              </p>
              <p className="text-sm">
                <strong>Solution</strong>: Use <code>black-forest-labs/flux-1.1-pro</code> for best quality.
                Add more descriptive details to your prompt (style, colors, composition).
              </p>
            </CardContent>
          </Card>

          <Card className="my-6">
            <CardHeader>
              <CardTitle className="text-base">Issue: Generation is too slow</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                <strong>Cause</strong>: High-quality model or large aspect ratio selected.
              </p>
              <p className="text-sm">
                <strong>Solution</strong>: Switch to <code>gemini-2.5-flash-image</code> for 3-5x faster generation.
                Use square (1:1) aspect ratio for fastest results.
              </p>
            </CardContent>
          </Card>

          <h3>Output Format Issues</h3>
          <p>
            Images are returned as base64-encoded data URLs in this format:
          </p>
          <pre><code>{`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...`}</code></pre>
          <p>
            If you need to use the image in other nodes:
          </p>
          <ul>
            <li><strong>Display inline</strong>: Use the data URL directly in <code>&lt;img src="..." /&gt;</code></li>
            <li><strong>Download</strong>: Click the "Download" button in the node output</li>
            <li><strong>Upload to storage</strong>: Use an HTTP Request node to upload to S3, Cloudinary, etc.</li>
          </ul>
        </section>

        <div className="mt-12 pt-6 border-t border-border">
          <h2 className="text-lg font-semibold mb-4">Related Documentation</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/docs/build/nodes/text-model" className="block">
              <Card className="h-full border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <CardTitle className="text-base">Text Model Node</CardTitle>
                  <CardDescription>Generate AI prompts for better images</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/docs/learn/tutorials" className="block">
              <Card className="h-full border-2 hover:border-chart-3 transition-colors">
                <CardHeader>
                  <CardTitle className="text-base">Tutorials</CardTitle>
                  <CardDescription>Step-by-step image generation guides</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
