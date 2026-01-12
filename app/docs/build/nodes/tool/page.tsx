import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Wrench, ArrowRight, AlertCircle, CheckCircle2, Code, Play, Sparkles, FileText
} from "lucide-react"
import { SidebarPortal } from "@/components/docs/sidebar-portal"
import { TOCPortal } from "@/components/docs/toc-portal"

export const metadata: Metadata = {
  title: "Tool Node - Node Reference | TopFlow Build",
  description:
    "Complete reference for the Tool Node in TopFlow. Define custom functions that AI models can call dynamically for function calling and structured interactions.",
  keywords: ["tool node", "function calling", "ai tools", "topflow nodes"],
}

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "configuration", title: "Configuration", level: 2 },
  { id: "data-interface", title: "Node Data Interface", level: 2 },
  { id: "usage-examples", title: "Usage Examples", level: 2 },
  { id: "function-calling", title: "Function Calling Flow", level: 2 },
  { id: "validation", title: "Validation Rules", level: 2 },
  { id: "best-practices", title: "Best Practices", level: 2 },
  { id: "troubleshooting", title: "Troubleshooting", level: 2 },
]

export default function ToolNodePage() {
  return (
    <>
      <SidebarPortal currentTab="build" />
      <TOCPortal items={tocItems} />

      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Badge variant="secondary" className="mb-4">
            <Wrench className="mr-1 h-3 w-3" />
            Integration Node
          </Badge>
          <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight">Tool Node</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Define custom functions that AI models can call dynamically. Tool nodes enable function calling, structured
            interactions with external systems, and advanced AI agent capabilities.
          </p>
        </div>

        {/* Overview */}
        <section id="overview" className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Overview</h2>

          <div className="prose prose-sm max-w-none">
            <p>
              The <strong>Tool Node</strong> is a powerful component that defines custom functions AI models can invoke
              during execution. Instead of returning unstructured text, AI models can call your tools to perform
              specific actions—query databases, call APIs, perform calculations, or interact with external services.
            </p>
            <p>Tool nodes work with AI providers that support function calling:</p>
            <ul>
              <li>
                <strong>OpenAI</strong>: GPT-4, GPT-4o, GPT-4 Turbo (function calling)
              </li>
              <li>
                <strong>Anthropic</strong>: Claude 3.5 Sonnet, Claude 3 Opus (tool use)
              </li>
              <li>
                <strong>Google</strong>: Gemini 1.5 Pro, Gemini 1.5 Flash (function calling)
              </li>
              <li>
                <strong>Groq</strong>: Models with function calling support
              </li>
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
                    <strong>Query external APIs</strong> - Fetch real-time data (weather, stock prices, news)
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                  <div>
                    <strong>Database operations</strong> - Search, retrieve, or analyze data from databases
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                  <div>
                    <strong>Calculations</strong> - Perform complex computations or financial projections
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                  <div>
                    <strong>Business logic</strong> - Execute conditional workflows and decision-making processes
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                  <div>
                    <strong>Third-party integrations</strong> - Connect to external services and platforms
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mt-6 border-2 border-blue-500/20 bg-blue-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertCircle className="h-5 w-5 text-blue-500" />
                Key Concept
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p>
                You define <strong>what</strong> the function does and <strong>how</strong> to call it. The AI model
                decides <strong>when</strong> to call it based on the user's prompt and conversation context.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Configuration */}
        <section id="configuration" className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Configuration</h2>

          <div className="space-y-6">
            {/* Required Parameters */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Required Parameters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="mb-2 font-semibold">name</h4>
                  <ul className="ml-4 space-y-1 text-sm">
                    <li>
                      <strong>Type</strong>: <code>string</code>
                    </li>
                    <li>
                      <strong>Required</strong>: Yes
                    </li>
                    <li>
                      <strong>Description</strong>: Function name the AI will call. Must be a valid JavaScript
                      identifier (alphanumeric + underscores, no spaces)
                    </li>
                    <li>
                      <strong>Example</strong>: <code>"get_weather"</code>, <code>"searchDatabase"</code>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-2 font-semibold">description</h4>
                  <ul className="ml-4 space-y-1 text-sm">
                    <li>
                      <strong>Type</strong>: <code>string</code>
                    </li>
                    <li>
                      <strong>Required</strong>: Yes
                    </li>
                    <li>
                      <strong>Description</strong>: Clear explanation of what the function does. The AI uses this to
                      decide when to call it. Be specific and include when to use it
                    </li>
                    <li>
                      <strong>Example</strong>:{" "}
                      <code>"Get current weather for a city. Use when user asks about weather conditions."</code>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Optional Parameters */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Optional Parameters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="mb-2 font-semibold">parameters</h4>
                  <ul className="ml-4 space-y-1 text-sm">
                    <li>
                      <strong>Type</strong>: <code>Record&lt;string, any&gt;</code>
                    </li>
                    <li>
                      <strong>Required</strong>: No
                    </li>
                    <li>
                      <strong>Description</strong>: JSON Schema defining function parameters. Follows OpenAI function
                      calling format. Defines parameter types, descriptions, required fields, and validation rules
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-2 font-semibold">code</h4>
                  <ul className="ml-4 space-y-1 text-sm">
                    <li>
                      <strong>Type</strong>: <code>string</code>
                    </li>
                    <li>
                      <strong>Required</strong>: No
                    </li>
                    <li>
                      <strong>Description</strong>: JavaScript function body to execute when AI calls this tool. Has
                      access to parameters passed by the AI. Can be async. Must return a value (string, object, or
                      JSON)
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Configuration Tips */}
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
                    <strong>Clear descriptions</strong> - Be explicit about what the function does, when to use it, and
                    what it doesn't do
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-blue-500" />
                  <div>
                    <strong>Descriptive parameters</strong> - Use meaningful parameter names like{" "}
                    <code>city</code>, <code>temperature_unit</code> instead of <code>arg1</code>, <code>param</code>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-blue-500" />
                  <div>
                    <strong>Keep it focused</strong> - Each tool should do one thing well. Create multiple tools
                    instead of one "do_everything" function
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-blue-500" />
                  <div>
                    <strong>Environment variables</strong> - Use <code>process.env</code> for API keys and secrets,
                    never hardcode them
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
{`export type ToolNodeData = {
  // Configuration
  name: string                      // Function name (required)
  description: string               // What the function does (required)
  parameters?: Record<string, any>  // JSON Schema for parameters
  code?: string                     // JavaScript function body

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
            {/* Example 1: Weather */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Example 1: Get Current Weather</CardTitle>
                <CardDescription>Fetch weather data from an external API</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <p className="text-xs font-semibold text-foreground">Tool Configuration</p>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>
                      <strong>Name</strong>: <code>get_weather</code>
                    </li>
                    <li>
                      <strong>Description</strong>: "Get the current weather for a specific city. Use when the user
                      asks about weather conditions."
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-semibold text-foreground mb-2">Parameters Schema</p>
                  <pre className="overflow-x-auto rounded bg-muted p-4 text-xs">
{`{
  "type": "object",
  "properties": {
    "city": {
      "type": "string",
      "description": "The city name (e.g., 'San Francisco', 'London')"
    },
    "unit": {
      "type": "string",
      "enum": ["celsius", "fahrenheit"],
      "description": "Temperature unit"
    }
  },
  "required": ["city"]
}`}
                  </pre>
                </div>

                <div>
                  <p className="text-xs font-semibold text-foreground mb-2">Function Code</p>
                  <pre className="overflow-x-auto rounded bg-muted p-4 text-xs">
{`async function get_weather({ city, unit = "celsius" }) {
  const apiKey = process.env.WEATHER_API_KEY
  const url = \`https://api.openweathermap.org/data/2.5/weather?q=\${city}&units=\${
    unit === "celsius" ? "metric" : "imperial"
  }&appid=\${apiKey}\`

  const response = await fetch(url)
  const data = await response.json()

  return {
    city: data.name,
    temperature: data.main.temp,
    conditions: data.weather[0].description,
    unit: unit
  }
}`}
                  </pre>
                </div>

                <div className="text-sm text-muted-foreground">
                  <strong>Result</strong>: When a user asks "What's the weather in Tokyo?", the AI calls{" "}
                  <code>get_weather({`{ city: "Tokyo", unit: "celsius" }`})</code> and uses the result to respond:
                  "The current weather in Tokyo is 22°C with clear skies."
                </div>
              </CardContent>
            </Card>

            {/* Example 2: Database Search */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Example 2: Search Company Database</CardTitle>
                <CardDescription>Query an internal database for employee or project information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <p className="text-xs font-semibold text-foreground">Tool Configuration</p>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>
                      <strong>Name</strong>: <code>search_database</code>
                    </li>
                    <li>
                      <strong>Description</strong>: "Search the company database for employees or projects. Use when
                      user asks about team members or project details."
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-semibold text-foreground mb-2">Parameters Schema</p>
                  <pre className="overflow-x-auto rounded bg-muted p-4 text-xs">
{`{
  "type": "object",
  "properties": {
    "query": {
      "type": "string",
      "description": "Search query (name, department, or project)"
    },
    "type": {
      "type": "string",
      "enum": ["employee", "project"],
      "description": "Type of search"
    }
  },
  "required": ["query", "type"]
}`}
                  </pre>
                </div>

                <div>
                  <p className="text-xs font-semibold text-foreground mb-2">Function Code</p>
                  <pre className="overflow-x-auto rounded bg-muted p-4 text-xs">
{`async function search_database({ query, type }) {
  const db = await getDatabase()

  if (type === "employee") {
    const results = await db.employees.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { department: { $regex: query, $options: "i" } }
      ]
    }).limit(5)

    return results.map(emp => ({
      name: emp.name,
      department: emp.department,
      role: emp.role
    }))
  } else {
    const results = await db.projects.find({
      name: { $regex: query, $options: "i" }
    }).limit(5)

    return results.map(proj => ({
      name: proj.name,
      status: proj.status,
      team_size: proj.team.length
    }))
  }
}`}
                  </pre>
                </div>

                <div className="text-sm text-muted-foreground">
                  <strong>Result</strong>: Returns structured data about employees or projects that the AI can
                  summarize in natural language
                </div>
              </CardContent>
            </Card>

            {/* Example 3: Calculations */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Example 3: Calculate Investment Returns</CardTitle>
                <CardDescription>Pure computation tool without external API calls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <p className="text-xs font-semibold text-foreground">Tool Configuration</p>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>
                      <strong>Name</strong>: <code>calculate_returns</code>
                    </li>
                    <li>
                      <strong>Description</strong>: "Calculate compound investment returns over time. Use when user
                      asks about investment growth or financial projections."
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-semibold text-foreground mb-2">Function Code</p>
                  <pre className="overflow-x-auto rounded bg-muted p-4 text-xs">
{`function calculate_returns({ principal, rate, years }) {
  if (principal <= 0 || rate < 0 || years <= 0) {
    return { error: "Invalid input: all values must be positive numbers" }
  }

  const finalAmount = principal * Math.pow(1 + rate, years)
  const totalGain = finalAmount - principal
  const percentageGain = (totalGain / principal) * 100

  return {
    initial: principal,
    final: finalAmount.toFixed(2),
    gain: totalGain.toFixed(2),
    percentage: percentageGain.toFixed(2),
    years: years
  }
}`}
                  </pre>
                </div>

                <div className="text-sm text-muted-foreground">
                  <strong>Result</strong>: Returns calculated investment data that the AI uses to explain financial
                  projections in plain language
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Function Calling Flow */}
        <section id="function-calling" className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Function Calling Flow</h2>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-lg">Step-by-Step Execution</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <Badge variant="outline" className="bg-chart-2/10 text-chart-2 border-chart-2 mt-0.5">
                    1
                  </Badge>
                  <div>
                    <strong>Tool Definition</strong> - You configure the Tool node with name, description, parameters,
                    and code
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Badge variant="outline" className="bg-chart-2/10 text-chart-2 border-chart-2 mt-0.5">
                    2
                  </Badge>
                  <div>
                    <strong>Registration</strong> - Tool definition is passed to the AI model along with the user's
                    prompt
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Badge variant="outline" className="bg-chart-2/10 text-chart-2 border-chart-2 mt-0.5">
                    3
                  </Badge>
                  <div>
                    <strong>AI Decision</strong> - AI analyzes the prompt and decides whether to call your tool
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Badge variant="outline" className="bg-chart-2/10 text-chart-2 border-chart-2 mt-0.5">
                    4
                  </Badge>
                  <div>
                    <strong>Function Call</strong> - If tool is needed, AI generates function call with appropriate
                    arguments
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Badge variant="outline" className="bg-chart-2/10 text-chart-2 border-chart-2 mt-0.5">
                    5
                  </Badge>
                  <div>
                    <strong>Code Execution</strong> - Your tool's JavaScript code runs with AI-provided arguments
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Badge variant="outline" className="bg-chart-2/10 text-chart-2 border-chart-2 mt-0.5">
                    6
                  </Badge>
                  <div>
                    <strong>Result Return</strong> - Function result is fed back to the AI model
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Badge variant="outline" className="bg-chart-2/10 text-chart-2 border-chart-2 mt-0.5">
                    7
                  </Badge>
                  <div>
                    <strong>Final Response</strong> - AI uses tool result to generate natural language response to user
                  </div>
                </li>
              </ol>
            </CardContent>
          </Card>

          <Card className="mt-6 border-2 border-blue-500/20 bg-blue-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertCircle className="h-5 w-5 text-blue-500" />
                Multi-Tool Workflows
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>
                You can provide multiple Tool nodes to a single AI model. The AI will choose which tool(s) to call
                based on the user's request.
              </p>
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <p className="text-xs font-semibold">Example Multi-Tool Scenario</p>
                <p className="text-xs text-muted-foreground">
                  User: "What's the weather in New York and how should I invest $10,000 at 5% for 10 years?"
                </p>
                <p className="text-xs mt-2">The AI will call <strong>both</strong> tools:</p>
                <ul className="text-xs space-y-1 mt-2">
                  <li>1. <code>get_weather({`{ city: "New York" }`})</code></li>
                  <li>2. <code>calculate_returns({`{ principal: 10000, rate: 0.05, years: 10 }`})</code></li>
                </ul>
                <p className="text-xs text-muted-foreground mt-2">Then formulates a response using both results.</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Validation Rules */}
        <section id="validation" className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Validation Rules</h2>

          <div className="space-y-4">
            {/* Errors */}
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
                      <strong>Missing Tool Name</strong>
                      <p className="text-muted-foreground">Tool node must have a valid function name</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">❌</span>
                    <div>
                      <strong>Missing Description</strong>
                      <p className="text-muted-foreground">
                        Tool node must have a description to help AI decide when to use it
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">❌</span>
                    <div>
                      <strong>Invalid Function Name</strong>
                      <p className="text-muted-foreground">
                        Function name must be a valid JavaScript identifier (alphanumeric + underscores only)
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">❌</span>
                    <div>
                      <strong>Invalid Parameters Schema</strong>
                      <p className="text-muted-foreground">
                        If provided, parameters must be valid JSON Schema format
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Warnings */}
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
                      <strong>No Function Code</strong>
                      <p className="text-muted-foreground">
                        Tool has no implementation. AI can call it but it won't execute anything
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500">⚠️</span>
                    <div>
                      <strong>Vague Description</strong>
                      <p className="text-muted-foreground">
                        Description is too short or unclear. AI may not know when to use this tool
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
                    <div>Write clear, specific descriptions with use cases</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <div>Use descriptive parameter names (city, temperature_unit)</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <div>Add error handling with try/catch blocks</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <div>Validate inputs at the start of the function</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <div>Keep each tool focused on one specific task</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <div>Use environment variables for API keys and secrets</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <div>Always return a value (string, object, or JSON)</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <div>Test tools independently before integrating</div>
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
                    <div>Don't write vague descriptions ("gets weather")</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <div>Don't use generic parameter names (arg1, param, x)</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <div>Don't skip error handling for async operations</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <div>Don't create "do_everything" multi-purpose functions</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <div>Don't hardcode API keys or secrets in code</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <div>Don't return undefined or null without explanation</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <div>Don't assume AI will always call your tool correctly</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <div>Don't skip validation of critical parameters</div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Troubleshooting */}
        <section id="troubleshooting" className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Troubleshooting</h2>

          <div className="space-y-4">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">AI Doesn't Call My Tool</CardTitle>
                <CardDescription>Tool is defined but never gets invoked</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold mb-2">Possible Causes:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Description is too vague or doesn't match user intent</li>
                    <li>• Tool name conflicts with another tool</li>
                    <li>• AI model doesn't support function calling</li>
                    <li>• User prompt doesn't require tool usage</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold mb-2">Solutions:</p>
                  <ul className="space-y-1">
                    <li>• Rewrite description to be more specific and include use cases</li>
                    <li>• Test with a direct prompt: "Use the get_weather tool to check Tokyo's weather"</li>
                    <li>• Verify your AI model supports function calling (GPT-4, Claude 3.5, Gemini 1.5)</li>
                    <li>• Check execution logs for tool registration confirmation</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Function Code Throws Error</CardTitle>
                <CardDescription>Runtime error during tool execution</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold mb-2">Possible Causes:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Syntax error in JavaScript code</li>
                    <li>• Missing dependencies or environment variables</li>
                    <li>• Network timeout for external API calls</li>
                    <li>• Invalid parameters passed by AI</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold mb-2">Solutions:</p>
                  <ul className="space-y-1">
                    <li>• Add try/catch blocks around all async operations</li>
                    <li>• Validate inputs at the start of the function</li>
                    <li>• Check execution panel for error messages and stack traces</li>
                    <li>• Test function independently before integrating</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">AI Calls Tool with Wrong Arguments</CardTitle>
                <CardDescription>Parameters don't match expected format</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold mb-2">Possible Causes:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Parameter descriptions are unclear</li>
                    <li>• Parameter types don't match schema</li>
                    <li>• Missing required parameters in schema</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold mb-2">Solutions:</p>
                  <ul className="space-y-1">
                    <li>• Add detailed descriptions for each parameter</li>
                    <li>• Use <code>enum</code> for parameters with fixed options</li>
                    <li>• Mark critical parameters as <code>required</code> in schema</li>
                    <li>• Add input validation in function code</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Tool Returns But AI Ignores Result</CardTitle>
                <CardDescription>Function executes but result isn't used</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold mb-2">Possible Causes:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Function returns undefined or null</li>
                    <li>• Return format doesn't match AI expectations</li>
                    <li>• Error occurred but was silently caught</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold mb-2">Solutions:</p>
                  <ul className="space-y-1">
                    <li>• Always return a value (string, object, or JSON)</li>
                    <li>• Use consistent return format across all code paths</li>
                    <li>• Log return values for debugging: <code>console.log(result)</code></li>
                    <li>• Return error objects instead of throwing: <code>{`{ error: true, message: "..." }`}</code></li>
                  </ul>
                </div>
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
                <CardDescription>Use tools with AI models for function calling</CardDescription>
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
                <CardTitle className="text-lg">Structured Output Node</CardTitle>
                <CardDescription>Force specific response formats from AI</CardDescription>
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

            <Card className="border-2 transition-all hover:border-primary/50 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">JavaScript Node</CardTitle>
                <CardDescription>Execute custom JavaScript for data transformation</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/docs/build/nodes/javascript">
                    View Documentation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 transition-all hover:border-primary/50 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">HTTP Request Node</CardTitle>
                <CardDescription>Make API calls to external services</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/docs/build/nodes/http-request">
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
            Continue learning about other node types and advanced workflow patterns:
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/docs/build/nodes/text-model">
                <Sparkles className="mr-2 h-4 w-4" />
                Text Model Node
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/docs/build/nodes">View All Nodes</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/docs/learn/workflows-101">
                <FileText className="mr-2 h-4 w-4" />
                Workflows 101
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  )
}
