import { SidebarPortal } from "@/components/docs/sidebar-portal"
import { TOCPortal } from "@/components/docs/toc-portal"
import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Wrench, AlertCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Tool Node | TopFlow Documentation",
  description: "Define custom functions that AI models can call dynamically. Enable function calling, tool use, and structured interactions with external systems.",
}

export default function ToolNodePage() {
  const tocItems = [
    { id: "overview", title: "Overview" },
    { id: "parameters", title: "Parameters" },
    { id: "usage-examples", title: "Usage Examples" },
    { id: "function-calling", title: "Function Calling Flow" },
    { id: "best-practices", title: "Best Practices" },
    { id: "troubleshooting", title: "Troubleshooting" },
  ]

  return (
    <>
      <SidebarPortal currentTab="build" />
      <TOCPortal items={tocItems} />

      <div className="prose prose-invert max-w-none">
        <h1>Tool Node</h1>
        <p className="text-xl text-muted-foreground">
          Define custom functions that AI models can call dynamically. Tool nodes enable function calling, structured interactions with external systems, and advanced AI agent capabilities.
        </p>

        <section id="overview">
          <h2>Overview</h2>
          <p>
            The Tool node is a powerful component that defines custom functions AI models can invoke during execution.
            Instead of returning unstructured text, AI models can call your tools to perform specific actions—query databases,
            call APIs, perform calculations, or interact with external services.
          </p>

          <p>
            Tool nodes work with AI providers that support function calling:
          </p>
          <ul>
            <li><strong>OpenAI</strong>: GPT-4, GPT-4o, GPT-4 Turbo (function calling)</li>
            <li><strong>Anthropic</strong>: Claude 3.5 Sonnet, Claude 3 Opus (tool use)</li>
            <li><strong>Google</strong>: Gemini 1.5 Pro, Gemini 1.5 Flash (function calling)</li>
            <li><strong>Groq</strong>: Models with function calling support</li>
          </ul>

          <div className="grid md:grid-cols-2 gap-4 not-prose my-8">
            <Card>
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-chart-1/20 flex items-center justify-center mb-3">
                  <Wrench className="h-5 w-5 text-chart-1" />
                </div>
                <CardTitle className="text-lg">When to Use Tool Nodes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Query external APIs or databases</li>
                  <li>• Perform calculations or data transformations</li>
                  <li>• Fetch real-time data (weather, stock prices)</li>
                  <li>• Execute business logic conditionally</li>
                  <li>• Integrate with third-party services</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center mb-3">
                  <Code className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">What Tool Nodes Do</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Define function schema (name, description, parameters)</li>
                  <li>• Provide executable JavaScript code</li>
                  <li>• Pass to AI models as available tools</li>
                  <li>• AI decides when to call your function</li>
                  <li>• Results fed back to AI for final response</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <p>
            <strong>Key concept</strong>: You define <em>what</em> the function does and <em>how</em> to call it.
            The AI model decides <em>when</em> to call it based on the user's prompt and conversation context.
          </p>
        </section>

        <section id="parameters">
          <h2>Parameters</h2>
          <p>
            Tool nodes require a function definition with three key components: name, description, and parameters schema.
          </p>

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
                <td><code>name</code></td>
                <td><code>string</code></td>
                <td>
                  Function name the AI will call. Must be a valid JavaScript identifier
                  (alphanumeric + underscores, no spaces). Example: <code>get_weather</code>, <code>searchDatabase</code>
                </td>
              </tr>
              <tr>
                <td><code>description</code></td>
                <td><code>string</code></td>
                <td>
                  Clear explanation of what the function does. The AI uses this to decide when to call it.
                  Be specific and include when to use it. Example: "Get current weather for a city. Use when user asks about weather conditions."
                </td>
              </tr>
            </tbody>
          </table>

          <h3>Optional Parameters</h3>
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
                <td><code>parameters</code></td>
                <td><code>Record&lt;string, any&gt;</code></td>
                <td>
                  JSON Schema defining function parameters. Follows OpenAI function calling format.
                  Defines parameter types, descriptions, required fields, and validation rules.
                </td>
              </tr>
              <tr>
                <td><code>code</code></td>
                <td><code>string</code></td>
                <td>
                  JavaScript function body to execute when AI calls this tool. Has access to parameters
                  passed by the AI. Can be async. Must return a value (string, object, or JSON).
                </td>
              </tr>
            </tbody>
          </table>

          <h3>TypeScript Interface</h3>
          <pre><code>{`export type ToolNodeData = {
  name: string                  // Function name (required)
  description: string           // What the function does (required)
  parameters?: Record<string, any>  // JSON Schema for parameters
  code?: string                 // JavaScript function body
  status?: "idle" | "running" | "completed" | "error"
}`}</code></pre>
        </section>

        <section id="usage-examples">
          <h2>Usage Examples</h2>

          <h3>Example 1: Get Current Weather</h3>
          <p>
            A simple tool that fetches weather data from an external API.
          </p>

          <div className="not-prose bg-muted/30 p-4 rounded-lg my-4">
            <p className="text-sm font-semibold mb-2">Tool Configuration:</p>
            <ul className="text-sm space-y-2">
              <li><strong>Name:</strong> <code>get_weather</code></li>
              <li><strong>Description:</strong> "Get the current weather for a specific city. Use when the user asks about weather conditions."</li>
            </ul>
          </div>

          <h4>Parameters Schema:</h4>
          <pre><code>{`{
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
}`}</code></pre>

          <h4>Function Code:</h4>
          <pre><code>{`async function get_weather({ city, unit = "celsius" }) {
  const apiKey = process.env.WEATHER_API_KEY
  const url = \`https://api.openweathermap.org/data/2.5/weather?q=\${city}&units=\${unit === "celsius" ? "metric" : "imperial"}&appid=\${apiKey}\`

  const response = await fetch(url)
  const data = await response.json()

  return {
    city: data.name,
    temperature: data.main.temp,
    conditions: data.weather[0].description,
    unit: unit
  }
}`}</code></pre>

          <h4>AI Usage:</h4>
          <p>
            When a user asks "What's the weather in Tokyo?", the AI recognizes it needs weather data and calls:
          </p>
          <pre><code>{`get_weather({ city: "Tokyo", unit: "celsius" })`}</code></pre>
          <p>
            The function returns weather data, which the AI uses to formulate a natural language response:
            "The current weather in Tokyo is 22°C with clear skies."
          </p>

          <h3>Example 2: Search Company Database</h3>
          <p>
            A tool that queries an internal database for employee or project information.
          </p>

          <div className="not-prose bg-muted/30 p-4 rounded-lg my-4">
            <p className="text-sm font-semibold mb-2">Tool Configuration:</p>
            <ul className="text-sm space-y-2">
              <li><strong>Name:</strong> <code>search_database</code></li>
              <li><strong>Description:</strong> "Search the company database for employees or projects. Use when user asks about team members or project details."</li>
            </ul>
          </div>

          <h4>Parameters Schema:</h4>
          <pre><code>{`{
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
}`}</code></pre>

          <h4>Function Code:</h4>
          <pre><code>{`async function search_database({ query, type }) {
  // Connect to database
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
  } else if (type === "project") {
    const results = await db.projects.find({
      name: { $regex: query, $options: "i" }
    }).limit(5)

    return results.map(proj => ({
      name: proj.name,
      status: proj.status,
      team_size: proj.team.length
    }))
  }
}`}</code></pre>

          <h3>Example 3: Calculate Investment Returns</h3>
          <p>
            A pure computation tool that doesn't require external APIs—just performs calculations.
          </p>

          <div className="not-prose bg-muted/30 p-4 rounded-lg my-4">
            <p className="text-sm font-semibold mb-2">Tool Configuration:</p>
            <ul className="text-sm space-y-2">
              <li><strong>Name:</strong> <code>calculate_returns</code></li>
              <li><strong>Description:</strong> "Calculate compound investment returns over time. Use when user asks about investment growth or financial projections."</li>
            </ul>
          </div>

          <h4>Parameters Schema:</h4>
          <pre><code>{`{
  "type": "object",
  "properties": {
    "principal": {
      "type": "number",
      "description": "Initial investment amount in dollars"
    },
    "rate": {
      "type": "number",
      "description": "Annual interest rate (as decimal, e.g., 0.07 for 7%)"
    },
    "years": {
      "type": "integer",
      "description": "Number of years"
    }
  },
  "required": ["principal", "rate", "years"]
}`}</code></pre>

          <h4>Function Code:</h4>
          <pre><code>{`function calculate_returns({ principal, rate, years }) {
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
}`}</code></pre>
        </section>

        <section id="function-calling">
          <h2>Function Calling Flow</h2>
          <p>
            Understanding how Tool nodes integrate with AI models is crucial for building effective workflows.
          </p>

          <h3>Step-by-Step Execution</h3>
          <ol>
            <li>
              <strong>Tool Definition</strong>: You configure the Tool node with name, description, parameters, and code
            </li>
            <li>
              <strong>Registration</strong>: Tool definition is passed to the AI model along with the user's prompt
            </li>
            <li>
              <strong>AI Decision</strong>: AI analyzes the prompt and decides whether to call your tool
            </li>
            <li>
              <strong>Function Call</strong>: If tool is needed, AI generates function call with appropriate arguments
            </li>
            <li>
              <strong>Code Execution</strong>: Your tool's JavaScript code runs with AI-provided arguments
            </li>
            <li>
              <strong>Result Return</strong>: Function result is fed back to the AI model
            </li>
            <li>
              <strong>Final Response</strong>: AI uses tool result to generate natural language response to user
            </li>
          </ol>

          <h3>Multi-Tool Workflows</h3>
          <p>
            You can provide multiple Tool nodes to a single AI model. The AI will choose which tool(s) to call based on the user's request.
          </p>

          <div className="not-prose bg-muted/30 p-4 rounded-lg my-4">
            <p className="text-sm font-semibold mb-2">Example Multi-Tool Scenario:</p>
            <p className="text-sm text-muted-foreground mb-3">
              User: "What's the weather in New York and how should I invest $10,000 at 5% for 10 years?"
            </p>
            <p className="text-sm">
              The AI will call <strong>both</strong> tools:
            </p>
            <ul className="text-sm space-y-1 mt-2">
              <li>1. <code>get_weather({`{ city: "New York" }`})</code></li>
              <li>2. <code>calculate_returns({`{ principal: 10000, rate: 0.05, years: 10 }`})</code></li>
            </ul>
            <p className="text-sm text-muted-foreground mt-3">
              Then formulates a response using both results.
            </p>
          </div>

          <h3>Parallel vs Sequential Tool Calls</h3>
          <p>
            Some AI models support <strong>parallel tool calling</strong> (multiple tools invoked simultaneously),
            while others call tools <strong>sequentially</strong>. Check your provider's documentation for specifics.
          </p>
        </section>

        <section id="best-practices">
          <h2>Best Practices</h2>

          <h3>1. Write Clear Descriptions</h3>
          <p>
            The <code>description</code> field is how the AI decides when to use your tool. Be explicit about:
          </p>
          <ul>
            <li><strong>What it does</strong>: "Get current weather conditions"</li>
            <li><strong>When to use it</strong>: "Use when user asks about weather, temperature, or forecast"</li>
            <li><strong>What it doesn't do</strong>: "Does not provide historical weather data"</li>
          </ul>

          <div className="not-prose my-6">
            <Card className="border-green-500/50">
              <CardHeader>
                <CardTitle className="text-green-400 text-base">✅ Good Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  "Get the current weather for a specific city including temperature, conditions, and humidity.
                  Use when the user asks about current weather, temperature, or atmospheric conditions.
                  Does not provide forecasts or historical data."
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="not-prose my-6">
            <Card className="border-red-500/50">
              <CardHeader>
                <CardTitle className="text-red-400 text-base">❌ Poor Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  "Gets weather" (too vague—AI won't know when to use it)
                </p>
              </CardContent>
            </Card>
          </div>

          <h3>2. Use Descriptive Parameter Names</h3>
          <p>
            Parameter names and descriptions guide the AI in calling your function correctly.
          </p>
          <ul>
            <li><strong>Good</strong>: <code>city</code>, <code>temperature_unit</code>, <code>max_results</code></li>
            <li><strong>Avoid</strong>: <code>arg1</code>, <code>param</code>, <code>x</code></li>
          </ul>

          <h3>3. Handle Errors Gracefully</h3>
          <p>
            Your function code should catch errors and return useful error messages that the AI can relay to the user.
          </p>
          <pre><code>{`async function search_database({ query, type }) {
  try {
    const results = await db.query(query)
    return results
  } catch (error) {
    return {
      error: true,
      message: "Database search failed. Please try again or refine your query."
    }
  }
}`}</code></pre>

          <h3>4. Validate Inputs</h3>
          <p>
            Even though the parameters schema provides type checking, add runtime validation for critical operations.
          </p>
          <pre><code>{`function calculate_returns({ principal, rate, years }) {
  if (principal <= 0 || rate < 0 || years <= 0) {
    return { error: "Invalid input: all values must be positive numbers" }
  }
  // ... calculation logic
}`}</code></pre>

          <h3>5. Keep Functions Focused</h3>
          <p>
            Each tool should do <strong>one thing well</strong>. Don't create a "do_everything" function.
            Instead, create multiple focused tools:
          </p>
          <ul>
            <li><code>get_weather</code> - Weather data only</li>
            <li><code>get_forecast</code> - Forecast data only</li>
            <li><code>get_historical_weather</code> - Historical data only</li>
          </ul>

          <h3>6. Document Return Format</h3>
          <p>
            While not strictly required, adding a comment about the return format helps maintain your workflow:
          </p>
          <pre><code>{`// Returns: { city: string, temperature: number, conditions: string, unit: string }
async function get_weather({ city, unit }) {
  // ... implementation
}`}</code></pre>

          <h3>7. Use Environment Variables for Secrets</h3>
          <p>
            Never hardcode API keys or secrets in your tool code. Use environment variables:
          </p>
          <pre><code>{`const apiKey = process.env.WEATHER_API_KEY  // ✅ Good
const apiKey = "sk-abc123..."                // ❌ Never do this`}</code></pre>

          <h3>8. Test Tools Independently</h3>
          <p>
            Before integrating into a workflow, test your tool functions in isolation to ensure they work correctly.
          </p>
        </section>

        <section id="troubleshooting">
          <h2>Troubleshooting</h2>

          <div className="grid gap-4 not-prose my-8">
            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-destructive mt-1" />
                  <div>
                    <CardTitle className="text-base">AI Doesn't Call My Tool</CardTitle>
                    <CardDescription>Tool is defined but never gets invoked</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p><strong>Possible causes:</strong></p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Description is too vague or doesn't match user intent</li>
                  <li>Tool name conflicts with another tool</li>
                  <li>AI model doesn't support function calling</li>
                  <li>User prompt doesn't require tool usage</li>
                </ul>
                <p className="mt-3"><strong>Solutions:</strong></p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Rewrite description to be more specific and include use cases</li>
                  <li>Test with a direct prompt: "Use the get_weather tool to check Tokyo's weather"</li>
                  <li>Verify your AI model supports function calling (GPT-4, Claude 3.5, Gemini 1.5)</li>
                  <li>Check execution logs for tool registration confirmation</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-destructive mt-1" />
                  <div>
                    <CardTitle className="text-base">Function Code Throws Error</CardTitle>
                    <CardDescription>Runtime error during tool execution</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p><strong>Possible causes:</strong></p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Syntax error in JavaScript code</li>
                  <li>Missing dependencies or environment variables</li>
                  <li>Network timeout for external API calls</li>
                  <li>Invalid parameters passed by AI</li>
                </ul>
                <p className="mt-3"><strong>Solutions:</strong></p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Add try/catch blocks around all async operations</li>
                  <li>Validate inputs at the start of the function</li>
                  <li>Check execution panel for error messages and stack traces</li>
                  <li>Test function independently before integrating</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-destructive mt-1" />
                  <div>
                    <CardTitle className="text-base">AI Calls Tool with Wrong Arguments</CardTitle>
                    <CardDescription>Parameters don't match expected format</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p><strong>Possible causes:</strong></p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Parameter descriptions are unclear</li>
                  <li>Parameter types don't match schema</li>
                  <li>Missing required parameters in schema</li>
                </ul>
                <p className="mt-3"><strong>Solutions:</strong></p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Add detailed descriptions for each parameter</li>
                  <li>Use <code>enum</code> for parameters with fixed options</li>
                  <li>Mark critical parameters as <code>required</code> in schema</li>
                  <li>Add input validation in function code</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-destructive mt-1" />
                  <div>
                    <CardTitle className="text-base">Tool Returns But AI Ignores Result</CardTitle>
                    <CardDescription>Function executes but result isn't used</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p><strong>Possible causes:</strong></p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Function returns undefined or null</li>
                  <li>Return format doesn't match AI expectations</li>
                  <li>Error occurred but was silently caught</li>
                </ul>
                <p className="mt-3"><strong>Solutions:</strong></p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Always return a value (string, object, or JSON)</li>
                  <li>Use consistent return format across all code paths</li>
                  <li>Log return values for debugging: <code>console.log(result)</code></li>
                  <li>Return error objects instead of throwing: <code>{`{ error: true, message: "..." }`}</code></li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <h3>Debugging Tips</h3>
          <ul>
            <li>
              <strong>Check Execution Panel</strong>: View real-time logs showing tool registration, invocation, and results
            </li>
            <li>
              <strong>Test with Explicit Prompts</strong>: Force tool usage with prompts like "Use the X tool to do Y"
            </li>
            <li>
              <strong>Simplify First</strong>: Start with a simple tool that returns hardcoded data, then add complexity
            </li>
            <li>
              <strong>Validate JSON Schema</strong>: Use online validators to ensure your parameters schema is valid JSON Schema format
            </li>
            <li>
              <strong>Check Provider Documentation</strong>: Function calling syntax varies slightly between OpenAI, Anthropic, and Google
            </li>
          </ul>
        </section>

        <div className="not-prose mt-12 p-6 bg-muted/30 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Related Documentation</h3>
          <div className="grid md:grid-cols-2 gap-3">
            <a href="/docs/build/nodes/text-model" className="text-sm text-chart-3 hover:underline">
              → Text Model Node (use tools with AI models)
            </a>
            <a href="/docs/build/nodes/structured-output" className="text-sm text-chart-3 hover:underline">
              → Structured Output Node (force specific response formats)
            </a>
            <a href="/docs/learn/workflows-101" className="text-sm text-chart-3 hover:underline">
              → Workflows 101 (understand node connections)
            </a>
            <a href="/docs/security/validations" className="text-sm text-chart-3 hover:underline">
              → Security Validations (validate tool code safety)
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
