/**
 * Node-specific mock data generators
 * Provides fallback demo outputs when no workflow-specific mock data exists
 */

import type {
  TextOutput,
  ImageOutput,
  AudioOutput,
  StructuredOutput,
  HttpResponse,
} from "./types"

/**
 * Simulated duration for each node type (ms)
 */
export function getSimulatedDuration(nodeType: string): number {
  const durations: Record<string, number> = {
    start: 100,
    prompt: 200,
    textModel: 2500,
    embeddingModel: 1500,
    imageGeneration: 3500,
    audio: 3000,
    javascript: 800,
    structuredOutput: 2000,
    conditional: 500,
    httpRequest: 1200,
    tool: 1800,
    end: 100,
  }
  return durations[nodeType] || 1000
}

/**
 * Generate mock text output based on model type
 */
export function generateMockTextOutput(nodeData: any): TextOutput {
  const model = nodeData.model || "unknown"
  const prompt = nodeData.prompt || ""

  let content = ""

  // Model-specific response styles
  if (model.includes("gpt-4")) {
    content = `**Analysis Complete**

Based on the provided information, I've conducted a comprehensive analysis. Here are the key findings:

1. **Primary Insights**: The data shows significant patterns that warrant attention. The metrics indicate strong performance across multiple dimensions.

2. **Recommendations**:
   - Continue monitoring the current trajectory
   - Implement additional safeguards for edge cases
   - Consider scaling resources to meet projected demand

3. **Next Steps**: Schedule a follow-up review in 2-3 weeks to assess progress and adjust strategy as needed.

This analysis leverages GPT-4's advanced reasoning capabilities to provide actionable insights.`
  } else if (model.includes("gpt-3.5") || model.includes("gpt-4o-mini")) {
    content = `Here's a summary based on your request:

The analysis reveals several important points. The data indicates positive trends with some areas requiring attention. Key recommendations include monitoring metrics closely and making data-driven adjustments.

Overall, the situation appears manageable with proper oversight and timely interventions where needed.`
  } else if (model.includes("claude")) {
    content = `I've carefully analyzed the information provided. Here's my assessment:

**Key Observations:**
- The data presents a clear pattern of growth and stability
- Risk factors remain within acceptable parameters
- Opportunities exist for optimization in several areas

**Strategic Recommendations:**
1. Maintain current best practices while exploring incremental improvements
2. Establish clear metrics for measuring success
3. Develop contingency plans for potential challenges

I'm happy to dive deeper into any specific aspect you'd like to explore further.`
  } else if (model.includes("gemini")) {
    content = `Based on my analysis using Google's Gemini model, here are the insights:

🔍 **Analysis Summary:**
The data reveals interesting patterns and correlations. The multimodal analysis capabilities allow for comprehensive understanding across different data types.

📊 **Key Metrics:**
- Performance indicators show positive momentum
- User engagement metrics exceed baseline expectations
- System efficiency remains optimal

💡 **Actionable Insights:**
Consider implementing iterative improvements based on these findings. The combination of quantitative and qualitative data suggests a balanced approach would be most effective.`
  } else {
    content = `[Demo Mode] Simulated AI response for ${model}:

Thank you for your query. Based on the analysis, here are the key takeaways:

• The current approach shows promise and aligns with best practices
• Several opportunities for enhancement have been identified
• Recommended next steps include validation and iterative refinement

This response demonstrates the text generation capabilities of the selected AI model.`
  }

  return {
    type: "text",
    content,
  }
}

/**
 * Generate mock image output
 */
export async function getMockImageOutput(
  nodeData: any
): Promise<ImageOutput> {
  const aspectRatio = nodeData.aspectRatio || "1:1"
  const prompt = nodeData.prompt || ""

  // Map aspect ratios to demo images
  const demoImages: Record<string, string> = {
    "1:1": "/demo-assets/images/placeholder-square.webp",
    "16:9": "/demo-assets/images/placeholder-landscape.webp",
    "9:16": "/demo-assets/images/placeholder-portrait.webp",
    "4:3": "/demo-assets/images/placeholder-4x3.webp",
  }

  // Determine dimensions based on aspect ratio
  const dimensions: Record<string, { width: number; height: number }> = {
    "1:1": { width: 1024, height: 1024 },
    "16:9": { width: 1920, height: 1080 },
    "9:16": { width: 1080, height: 1920 },
    "4:3": { width: 1600, height: 1200 },
  }

  return {
    type: "image",
    url: demoImages[aspectRatio] || demoImages["1:1"],
    format: "webp",
    dimensions: dimensions[aspectRatio] || dimensions["1:1"],
  }
}

/**
 * Generate mock HTTP response
 */
export function generateMockHttpResponse(nodeData: any): HttpResponse {
  const url = nodeData.url || ""
  const method = nodeData.method || "GET"

  // Generate contextual mock data based on URL patterns
  if (url.includes("country") || url.includes("nation")) {
    return {
      status: 200,
      data: {
        name: "Switzerland",
        capital: "Bern",
        population: 8654622,
        region: "Europe",
        subregion: "Western Europe",
        languages: ["German", "French", "Italian", "Romansh"],
        currencies: [{ code: "CHF", name: "Swiss franc", symbol: "Fr" }],
        flag: "🇨🇭",
        maps: {
          googleMaps: "https://goo.gl/maps/uVuZcXaxSx5jLyEC9",
          openStreetMaps: "https://www.openstreetmap.org/relation/51701",
        },
      },
      headers: {
        "content-type": "application/json",
      },
    }
  }

  if (url.includes("weather")) {
    return {
      status: 200,
      data: {
        location: "San Francisco, CA",
        temperature: 68,
        condition: "Partly Cloudy",
        humidity: 65,
        windSpeed: 12,
        forecast: [
          { day: "Monday", high: 70, low: 58, condition: "Sunny" },
          { day: "Tuesday", high: 72, low: 60, condition: "Sunny" },
          { day: "Wednesday", high: 68, low: 56, condition: "Cloudy" },
        ],
      },
      headers: {
        "content-type": "application/json",
      },
    }
  }

  if (url.includes("user") || url.includes("profile")) {
    return {
      status: 200,
      data: {
        id: "user_demo_001",
        name: "Alex Thompson",
        email: "alex.thompson@example.com",
        role: "Product Manager",
        department: "Engineering",
        joinDate: "2023-03-15",
        status: "active",
      },
      headers: {
        "content-type": "application/json",
      },
    }
  }

  if (url.includes("threat") || url.includes("security")) {
    return {
      status: 200,
      data: {
        threatLevel: "medium",
        activeIncidents: 3,
        resolvedToday: 12,
        criticalAssets: ["Database Server", "API Gateway", "Auth Service"],
        recentAlerts: [
          {
            id: "alert_001",
            severity: "high",
            type: "Unusual Login Pattern",
            source: "Authentication Service",
            timestamp: new Date().toISOString(),
          },
          {
            id: "alert_002",
            severity: "medium",
            type: "Elevated API Rate",
            source: "API Gateway",
            timestamp: new Date().toISOString(),
          },
        ],
      },
      headers: {
        "content-type": "application/json",
      },
    }
  }

  // Generic fallback
  return {
    status: 200,
    data: {
      success: true,
      message: "Demo data retrieved successfully",
      timestamp: new Date().toISOString(),
      requestMethod: method,
      demo: true,
    },
    headers: {
      "content-type": "application/json",
    },
  }
}

/**
 * Generate mock structured output
 */
export function generateMockStructuredOutput(
  nodeData: any
): StructuredOutput {
  const schema = nodeData.schema || "unknown"

  // Parse schema to generate appropriate data
  let data: Record<string, any> = {}

  // Try to infer from schema string
  if (schema.includes("threat") || schema.includes("security")) {
    data = {
      overallRisk: "medium",
      riskScore: 6.5,
      threats: [
        {
          id: "threat_001",
          name: "Phishing Campaign",
          severity: "high",
          likelihood: "medium",
          impact: "high",
          status: "monitoring",
        },
        {
          id: "threat_002",
          name: "Brute Force Attempts",
          severity: "medium",
          likelihood: "low",
          impact: "medium",
          status: "mitigated",
        },
      ],
      recommendations: [
        "Enable MFA for all user accounts",
        "Review and update firewall rules",
        "Conduct security awareness training",
      ],
      nextReview: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    }
  } else if (schema.includes("user") || schema.includes("profile")) {
    data = {
      userId: "usr_demo_123",
      profile: {
        displayName: "Alex Thompson",
        email: "alex.thompson@example.com",
        verified: true,
        createdAt: "2023-03-15T10:30:00Z",
      },
      preferences: {
        theme: "dark",
        notifications: true,
        language: "en-US",
      },
      metadata: {
        lastLogin: new Date().toISOString(),
        loginCount: 247,
        accountStatus: "active",
      },
    }
  } else if (schema.includes("analytics") || schema.includes("metrics")) {
    data = {
      period: "last_30_days",
      metrics: {
        totalUsers: 1247,
        activeUsers: 892,
        newUsers: 156,
        churnRate: 2.3,
      },
      performance: {
        avgResponseTime: 245,
        errorRate: 0.12,
        uptime: 99.97,
      },
      topFeatures: [
        { name: "Dashboard", usage: 2847 },
        { name: "Reports", usage: 1923 },
        { name: "Settings", usage: 1456 },
      ],
    }
  } else {
    // Generic structured output
    data = {
      status: "success",
      result: {
        processed: true,
        confidence: 0.92,
        category: "general",
        tags: ["demo", "structured", "output"],
      },
      metadata: {
        model: "demo-model",
        timestamp: new Date().toISOString(),
        version: "1.0",
      },
    }
  }

  return {
    type: "structured",
    schema: schema,
    data: data,
  }
}

/**
 * Generate mock embedding output
 */
export function generateMockEmbedding(nodeData: any): number[] {
  const model = nodeData.model || "text-embedding-ada-002"
  const dimensions = model.includes("3-large")
    ? 3072
    : model.includes("3-small")
      ? 1536
      : 1536

  // Generate deterministic mock embedding
  const embedding: number[] = []
  for (let i = 0; i < dimensions; i++) {
    // Use sine wave pattern for realistic-looking embeddings
    const value = Math.sin(i / 100) * 0.5 + Math.cos(i / 50) * 0.3
    embedding.push(value)
  }

  return embedding
}

/**
 * Generate mock audio output
 */
export function generateMockAudioOutput(nodeData: any): AudioOutput {
  const voice = nodeData.voice || "alloy"

  return {
    type: "audio",
    url: "/demo-assets/audio/sample-voice.mp3",
    format: "mp3",
    duration: 8.5, // seconds
  }
}

/**
 * Generate mock prompt output (passthrough with variable replacement)
 */
export function generateMockPromptOutput(
  nodeData: any,
  inputs: Record<string, any>
): string {
  let template = nodeData.template || nodeData.prompt || ""

  // Replace variables with demo values
  const variables = template.match(/\$\w+/g) || []
  variables.forEach((variable) => {
    const inputKey = variable.slice(1) // Remove $
    const value = inputs[inputKey] || `[Demo ${inputKey}]`
    template = template.replace(
      new RegExp("\\" + variable, "g"),
      typeof value === "string" ? value : JSON.stringify(value)
    )
  })

  return template || "Demo prompt output"
}

/**
 * Generate mock JavaScript execution output
 */
export function generateMockJavaScriptOutput(nodeData: any): any {
  const code = nodeData.code || ""

  // Try to infer output type from code
  if (code.includes("return ") && code.includes("{")) {
    // Looks like it returns an object
    return {
      calculated: true,
      result: 42,
      timestamp: new Date().toISOString(),
      demo: true,
    }
  }

  if (code.includes("return ") && code.includes("Math")) {
    // Looks like mathematical calculation
    return 42
  }

  if (code.includes("return ") && code.includes("string")) {
    return "Processed demo output"
  }

  // Generic fallback
  return {
    success: true,
    processed: true,
    demo: true,
  }
}

/**
 * Generate mock conditional output
 */
export function generateMockConditionalOutput(nodeData: any): boolean {
  const condition = nodeData.condition || ""

  // Try to make an educated guess based on condition text
  if (
    condition.includes(">") ||
    condition.includes("high") ||
    condition.includes("critical")
  ) {
    // Bias toward true for alerting conditions
    return Math.random() > 0.3
  }

  // Default to random
  return Math.random() > 0.5
}

/**
 * Main function to get mock output for any node type
 */
export function getMockNodeOutput(
  nodeType: string,
  nodeData: any,
  inputs: Record<string, any> = {}
): any {
  switch (nodeType) {
    case "start":
      return inputs.initialInput || "Demo workflow started"

    case "prompt":
      return generateMockPromptOutput(nodeData, inputs)

    case "textModel":
      return generateMockTextOutput(nodeData)

    case "embeddingModel":
      return generateMockEmbedding(nodeData)

    case "imageGeneration":
      return getMockImageOutput(nodeData)

    case "audio":
      return generateMockAudioOutput(nodeData)

    case "javascript":
      return generateMockJavaScriptOutput(nodeData)

    case "structuredOutput":
      return generateMockStructuredOutput(nodeData)

    case "conditional":
      return generateMockConditionalOutput(nodeData)

    case "httpRequest":
      return generateMockHttpResponse(nodeData)

    case "tool":
      return {
        toolCalled: nodeData.toolName || "demo-tool",
        result: "Demo tool execution successful",
        timestamp: new Date().toISOString(),
      }

    case "end":
      // Pass through the last input
      const lastInput = Object.values(inputs)[0]
      return lastInput !== undefined ? lastInput : "Demo workflow completed"

    default:
      return `[Demo output for ${nodeType}]`
  }
}
