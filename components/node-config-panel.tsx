"use client"

import { useState } from "react"
import type { Node } from "@xyflow/react"
import { X, Copy, Check, Trash2, Download, Image, Music, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { PromptEditor } from "@/components/advanced-editors/prompt-editor"
import { ConditionalBuilder } from "@/components/advanced-editors/conditional-builder"
import { HttpRequestEditor } from "@/components/advanced-editors/http-request-editor"
import { SchemaBuilder } from "@/components/advanced-editors/schema-builder"
import Link from "next/link"

type NodeConfigPanelProps = {
  node: Node | null
  onClose: () => void
  onUpdate: (nodeId: string, data: any) => void
  onDelete?: () => void
}

export function NodeConfigPanel({ node, onClose, onUpdate, onDelete }: NodeConfigPanelProps) {
  const [copiedOutput, setCopiedOutput] = useState(false)
  if (!node) return null

  const handleUpdate = (field: string, value: any) => {
    onUpdate(node.id, { ...node.data, [field]: value })
  }

  const handleCopyOutput = () => {
    if (!node.data || typeof navigator === "undefined") return
    const rawOutput = node.data.output
    if (rawOutput === undefined || rawOutput === null) return
    const value = typeof rawOutput === "string" ? rawOutput : JSON.stringify(rawOutput, null, 2)
    navigator.clipboard?.writeText(value).then(() => {
      setCopiedOutput(true)
      setTimeout(() => setCopiedOutput(false), 1500)
    })
  }

  const handleDownloadImage = async () => {
    if (!node.data || !node.data.output) return

    let imageUrl: string | null = null

    // Handle different output formats
    if (typeof node.data.output === "string") {
      imageUrl = node.data.output
    } else if (node.data.output.url) {
      imageUrl = node.data.output.url
    } else if (node.data.output.threat_map) {
      // End node demo mode
      imageUrl = node.data.output.threat_map
    } else if (node.data.output.finalOutput && typeof node.data.output.finalOutput === "string") {
      // End node live mode
      imageUrl = node.data.output.finalOutput
    } else if (Array.isArray(node.data.output)) {
      // Take first image if array
      const firstImage = node.data.output.find(
        (item: any) => typeof item === "string" && (item.startsWith("data:image/") || /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(item))
      )
      if (firstImage) imageUrl = firstImage
    }

    if (!imageUrl) return

    try {
      // Handle base64 data URLs
      if (imageUrl.startsWith("data:image/")) {
        const [metadata, base64] = imageUrl.split(",")
        const mimeType = metadata.match(/:(.*?);/)?.[1] || "image/png"
        const extension = mimeType.split("/")[1] || "png"

        // Convert base64 to blob
        const byteString = atob(base64)
        const arrayBuffer = new ArrayBuffer(byteString.length)
        const uint8Array = new Uint8Array(arrayBuffer)

        for (let i = 0; i < byteString.length; i++) {
          uint8Array[i] = byteString.charCodeAt(i)
        }

        const blob = new Blob([arrayBuffer], { type: mimeType })
        const url = URL.createObjectURL(blob)

        // Download file
        const a = document.createElement("a")
        a.href = url
        a.download = `${node.type}-${node.id}-${Date.now()}.${extension}`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      } else {
        // Handle regular URLs (like /demo-assets/images/threat-intelligence-map.webp)
        const extension = imageUrl.match(/\.(png|jpg|jpeg|gif|webp|svg)$/i)?.[1] || "png"

        // Fetch the image
        const response = await fetch(imageUrl)
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)

        // Download file
        const a = document.createElement("a")
        a.href = url
        a.download = `${node.type}-${node.id}-${Date.now()}.${extension}`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error("Failed to download image:", error)
    }
  }

  const handleDownloadAudio = async () => {
    if (!node.data || !node.data.output) return

    let audioUrl: string | null = null

    // Handle different output formats
    if (typeof node.data.output === "string") {
      audioUrl = node.data.output
    } else if (node.data.output.url) {
      audioUrl = node.data.output.url
    }

    if (!audioUrl) return

    try {
      // Handle base64 data URLs
      if (audioUrl.startsWith("data:audio/")) {
        const [metadata, base64] = audioUrl.split(",")
        const mimeType = metadata.match(/:(.*?);/)?.[1] || "audio/mpeg"
        const extension = mimeType.split("/")[1] || "mp3"

        // Convert base64 to blob
        const byteString = atob(base64)
        const arrayBuffer = new ArrayBuffer(byteString.length)
        const uint8Array = new Uint8Array(arrayBuffer)

        for (let i = 0; i < byteString.length; i++) {
          uint8Array[i] = byteString.charCodeAt(i)
        }

        const blob = new Blob([arrayBuffer], { type: mimeType })
        const url = URL.createObjectURL(blob)

        // Download file
        const a = document.createElement("a")
        a.href = url
        a.download = `${node.type}-${node.id}-${Date.now()}.${extension}`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      } else {
        // Handle regular URLs
        const extension = audioUrl.match(/\.(mp3|wav|ogg|m4a)$/i)?.[1] || "mp3"

        // Fetch the audio
        const response = await fetch(audioUrl)
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)

        // Download file
        const a = document.createElement("a")
        a.href = url
        a.download = `${node.type}-${node.id}-${Date.now()}.${extension}`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error("Failed to download audio:", error)
    }
  }

  const hasImageOutput = () => {
    if (!node.data || !node.data.output) return false

    const isImageUrl = (str: string) => {
      return str.startsWith("data:image/") || /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(str)
    }

    // Check direct string
    if (typeof node.data.output === "string" && isImageUrl(node.data.output)) {
      return true
    }

    // Check object with url property (Image Generation node)
    if (node.data.output.url && isImageUrl(node.data.output.url)) {
      return true
    }

    // Check object with threat_map property (End node demo mode)
    if (node.data.output.threat_map && isImageUrl(node.data.output.threat_map)) {
      return true
    }

    // Check object with finalOutput property (End node live mode)
    if (node.data.output.finalOutput && typeof node.data.output.finalOutput === "string" && isImageUrl(node.data.output.finalOutput)) {
      return true
    }

    // Check array
    if (Array.isArray(node.data.output)) {
      return node.data.output.some(
        (item: any) => typeof item === "string" && isImageUrl(item)
      )
    }

    return false
  }

  const hasAudioOutput = () => {
    if (!node.data || !node.data.output) return false

    const isAudioUrl = (str: string) => {
      return str.startsWith("data:audio/") || /\.(mp3|wav|ogg|m4a)$/i.test(str)
    }

    // Check direct string
    if (typeof node.data.output === "string" && isAudioUrl(node.data.output)) {
      return true
    }

    // Check object with url property
    if (node.data.output.url && isAudioUrl(node.data.output.url)) {
      return true
    }

    return false
  }

  const isThreatIntelReport = () => {
    if (!node.data || !node.data.output) return false

    // Check if this is a threat intelligence report output
    return (
      typeof node.data.output === "object" &&
      "report" in node.data.output &&
      "threat_map" in node.data.output
    )
  }

  const getImagePreview = () => {
    if (!hasImageOutput()) return null

    const isImageUrl = (str: string) => {
      return str.startsWith("data:image/") || /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(str)
    }

    if (typeof node.data.output === "string" && isImageUrl(node.data.output)) {
      return node.data.output
    }

    if (node.data.output.url && isImageUrl(node.data.output.url)) {
      return node.data.output.url
    }

    // Check for threat_map property (End node demo mode)
    if (node.data.output.threat_map && isImageUrl(node.data.output.threat_map)) {
      return node.data.output.threat_map
    }

    // Check for finalOutput property (End node live mode)
    if (node.data.output.finalOutput && typeof node.data.output.finalOutput === "string" && isImageUrl(node.data.output.finalOutput)) {
      return node.data.output.finalOutput
    }

    if (Array.isArray(node.data.output)) {
      const firstImage = node.data.output.find(
        (item: any) => typeof item === "string" && isImageUrl(item)
      )
      return firstImage || null
    }

    return null
  }

  const renderConfig = () => {
    switch (node.type) {
      case "start":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="start-label">Input Label (Optional)</Label>
              <Input
                id="start-label"
                value={node.data.label || ""}
                onChange={(e) => handleUpdate("label", e.target.value)}
                placeholder="e.g., GitHub URL Input"
              />
              <p className="text-xs text-muted-foreground">
                Custom label for the input field. If empty, node will not require user input.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="start-placeholder">Placeholder Text</Label>
              <Input
                id="start-placeholder"
                value={node.data.placeholder || ""}
                onChange={(e) => handleUpdate("placeholder", e.target.value)}
                placeholder="e.g., https://github.com/owner/repo"
                disabled={!node.data.label}
              />
              <p className="text-xs text-muted-foreground">
                Example text shown in the input field
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="start-input-type">Input Type</Label>
              <Select
                value={node.data.inputType || "text"}
                onValueChange={(value) => handleUpdate("inputType", value)}
                disabled={!node.data.label}
              >
                <SelectTrigger id="start-input-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="url">URL</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Type of input validation to apply
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="start-default">Default Value (Optional)</Label>
              <Input
                id="start-default"
                value={node.data.defaultValue || ""}
                onChange={(e) => handleUpdate("defaultValue", e.target.value)}
                placeholder="Optional pre-fill value"
                disabled={!node.data.label}
              />
              <p className="text-xs text-muted-foreground">
                Pre-filled value for the input field
              </p>
            </div>

            {!node.data.label && (
              <div className="rounded-md border border-blue-200 bg-blue-50 p-3 dark:border-blue-900 dark:bg-blue-950">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  <strong>No Input Configuration:</strong> This Start node will not require user input.
                  To enable user input, add a custom label above.
                </p>
              </div>
            )}
          </div>
        )

      case "end":
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              The End node marks the final output of your workflow.
            </p>
            {node.data.output && (
              <p className="text-sm text-muted-foreground">
                View and download the workflow output below.
              </p>
            )}
          </div>
        )

      case "conditional":
        return (
          <div className="space-y-4">
            <ConditionalBuilder
              value={node.data.condition || ""}
              onChange={(value) => handleUpdate("condition", value)}
            />
          </div>
        )

      case "httpRequest":
        return (
          <div className="space-y-4">
            <HttpRequestEditor
              url={node.data.url || ""}
              method={node.data.method || "GET"}
              headers={node.data.headers}
              body={node.data.body}
              onUpdate={(data) => {
                onUpdate(node.id, { ...node.data, ...data })
              }}
            />
          </div>
        )

      case "textModel":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Select
                value={node.data.model || "openai/gpt-4o-mini"}
                onValueChange={(value) => handleUpdate("model", value)}
              >
                <SelectTrigger id="model">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="openai/gpt-4o-mini">GPT-4o Mini (Recommended - Fast & Cheap)</SelectItem>
                  <SelectItem value="openai/gpt-4o">GPT-4o</SelectItem>
                  <SelectItem value="openai/gpt-4.1">GPT-4.1</SelectItem>
                  <SelectItem value="openai/gpt-4.1-mini">GPT-4.1 Mini</SelectItem>
                  <SelectItem value="openai/gpt-4">GPT-4</SelectItem>
                  <SelectItem value="openai/gpt-4-turbo">GPT-4 Turbo</SelectItem>
                  <SelectItem value="anthropic/claude-3-5-sonnet-20241022">Claude 3.5 Sonnet</SelectItem>
                  <SelectItem value="anthropic/claude-3-5-haiku-20241022">Claude 3.5 Haiku</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                GPT-4o Mini is recommended for best compatibility with AI SDK 5 (v2 spec)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="temperature">Temperature: {node.data.temperature || 0.7}</Label>
              <Slider
                id="temperature"
                min={0}
                max={2}
                step={0.1}
                value={[node.data.temperature || 0.7]}
                onValueChange={([value]) => handleUpdate("temperature", value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxTokens">Max Tokens</Label>
              <Input
                id="maxTokens"
                type="number"
                value={node.data.maxTokens || 2000}
                onChange={(e) => handleUpdate("maxTokens", Number.parseInt(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="structuredOutput"
                  checked={node.data.structuredOutput || false}
                  onChange={(e) => handleUpdate("structuredOutput", e.target.checked)}
                  className="h-4 w-4 rounded border-border"
                />
                <Label htmlFor="structuredOutput" className="cursor-pointer">
                  Structured Output
                </Label>
              </div>
            </div>

            {node.data.structuredOutput && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="schemaName">Schema Name</Label>
                  <Input
                    id="schemaName"
                    value={node.data.schemaName || ""}
                    onChange={(e) => handleUpdate("schemaName", e.target.value)}
                    placeholder="e.g., UserProfile"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="schema">Schema (Zod)</Label>
                  <SchemaBuilder value={node.data.schema || ""} onChange={(value) => handleUpdate("schema", value)} />
                </div>
              </>
            )}
          </div>
        )

      case "embeddingModel":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Select
                value={node.data.model || "openai/text-embedding-3-small"}
                onValueChange={(value) => handleUpdate("model", value)}
              >
                <SelectTrigger id="model">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="openai/text-embedding-3-small">OpenAI Embedding Small</SelectItem>
                  <SelectItem value="openai/text-embedding-3-large">OpenAI Embedding Large</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dimensions">Dimensions</Label>
              <Input
                id="dimensions"
                type="number"
                value={node.data.dimensions || 1536}
                onChange={(e) => handleUpdate("dimensions", Number.parseInt(e.target.value))}
              />
            </div>
          </div>
        )

      case "imageGeneration":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Select
                value={node.data.model || "gemini-2.5-flash-image"}
                onValueChange={(value) => handleUpdate("model", value)}
              >
                <SelectTrigger id="model">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gemini-2.5-flash-image">Gemini 2.5 Flash Image</SelectItem>
                  <SelectItem value="openai/dall-e-3">DALL-E 3</SelectItem>
                  <SelectItem value="stability-ai/stable-diffusion">Stable Diffusion</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="aspectRatio">Aspect Ratio</Label>
              <Select
                value={node.data.aspectRatio || "1:1"}
                onValueChange={(value) => handleUpdate("aspectRatio", value)}
              >
                <SelectTrigger id="aspectRatio">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1:1">1:1 (Square)</SelectItem>
                  <SelectItem value="16:9">16:9 (Landscape)</SelectItem>
                  <SelectItem value="9:16">9:16 (Portrait)</SelectItem>
                  <SelectItem value="4:3">4:3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="outputFormat">Output Format</Label>
              <Select
                value={node.data.outputFormat || "png"}
                onValueChange={(value) => handleUpdate("outputFormat", value)}
              >
                <SelectTrigger id="outputFormat">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="png">PNG</SelectItem>
                  <SelectItem value="jpg">JPG</SelectItem>
                  <SelectItem value="webp">WebP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case "audio":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Select value={node.data.model || "openai/tts-1"} onValueChange={(value) => handleUpdate("model", value)}>
                <SelectTrigger id="model">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="openai/tts-1">OpenAI TTS-1</SelectItem>
                  <SelectItem value="openai/tts-1-hd">OpenAI TTS-1 HD</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="voice">Voice</Label>
              <Select value={node.data.voice || "alloy"} onValueChange={(value) => handleUpdate("voice", value)}>
                <SelectTrigger id="voice">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alloy">Alloy</SelectItem>
                  <SelectItem value="echo">Echo</SelectItem>
                  <SelectItem value="fable">Fable</SelectItem>
                  <SelectItem value="onyx">Onyx</SelectItem>
                  <SelectItem value="nova">Nova</SelectItem>
                  <SelectItem value="shimmer">Shimmer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="speed">Speed: {node.data.speed || 1.0}</Label>
              <Slider
                id="speed"
                min={0.25}
                max={4.0}
                step={0.25}
                value={[node.data.speed || 1.0]}
                onValueChange={([value]) => handleUpdate("speed", value)}
              />
            </div>
          </div>
        )

      case "tool":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Tool Name</Label>
              <Input
                id="name"
                value={node.data.name || ""}
                onChange={(e) => handleUpdate("name", e.target.value)}
                placeholder="e.g., getWeather"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={node.data.description || ""}
                onChange={(e) => handleUpdate("description", e.target.value)}
                placeholder="Describe what this tool does..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="code">Implementation (JavaScript)</Label>
              <Textarea
                id="code"
                value={node.data.code || ""}
                onChange={(e) => handleUpdate("code", e.target.value)}
                placeholder="// Tool implementation&#10;async function execute(args) {&#10;  // Your code here&#10;  return result;&#10;}"
                rows={8}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">Write the JavaScript function that implements this tool</p>
            </div>
          </div>
        )

      case "structuredOutput":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="schemaName">Schema Name</Label>
              <Input
                id="schemaName"
                value={node.data.schemaName || ""}
                onChange={(e) => handleUpdate("schemaName", e.target.value)}
                placeholder="e.g., UserProfile"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mode">Mode</Label>
              <Select value={node.data.mode || "object"} onValueChange={(value) => handleUpdate("mode", value)}>
                <SelectTrigger id="mode">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="object">Object</SelectItem>
                  <SelectItem value="array">Array</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <SchemaBuilder value={node.data.schema || ""} onChange={(value) => handleUpdate("schema", value)} />
          </div>
        )

      case "prompt":
        return (
          <div className="space-y-4">
            <PromptEditor value={node.data.content || ""} onChange={(value) => handleUpdate("content", value)} />
          </div>
        )

      case "javascript":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">JavaScript Code</Label>
              <Textarea
                id="code"
                value={node.data.code || ""}
                onChange={(e) => handleUpdate("code", e.target.value)}
                placeholder="// Access inputs as input1, input2, etc.&#10;return input1.toUpperCase()"
                rows={10}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Access connected node outputs as input1, input2, etc. Return a value to pass to the next node.
              </p>
            </div>
          </div>
        )

      default:
        return <p className="text-sm text-muted-foreground">No configuration available</p>
    }
  }

  const renderOutputSection = () => {
    if (!node.data || node.data.output === undefined || node.data.output === null) {
      return null
    }

    // Check for special output types
    const isImage = hasImageOutput()
    const isAudio = hasAudioOutput()
    const imagePreview = getImagePreview()

    return (
      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Latest Output
          </Label>
          <div className="flex items-center gap-2">
            {isImage && (
              <Button variant="outline" size="xs" onClick={handleDownloadImage}>
                <Download className="mr-1.5 h-3.5 w-3.5" />
                Download Image
              </Button>
            )}
            {isAudio && (
              <Button variant="outline" size="xs" onClick={handleDownloadAudio}>
                <Download className="mr-1.5 h-3.5 w-3.5" />
                Download Audio
              </Button>
            )}
            {isThreatIntelReport() && (
              <Link href="/reports/template-ot-critical-infra" target="_blank" rel="noopener noreferrer">
                <Button size="xs" className="bg-primary hover:bg-primary/90">
                  <FileText className="mr-1.5 h-3.5 w-3.5" />
                  View Full Report
                </Button>
              </Link>
            )}
            <Button variant="outline" size="xs" onClick={handleCopyOutput}>
              {copiedOutput ? <Check className="mr-1.5 h-3.5 w-3.5" /> : <Copy className="mr-1.5 h-3.5 w-3.5" />}
              {copiedOutput ? "Copied" : "Copy"}
            </Button>
          </div>
        </div>

        {/* Image Preview */}
        {isImage && imagePreview && (
          <div className="space-y-2">
            <div className="rounded-md border border-border/60 bg-muted/20 p-2">
              <img
                src={imagePreview}
                alt="Output preview"
                className="w-full rounded border border-border/30"
              />
            </div>
            {isThreatIntelReport() && (
              <Link
                href="/reports/template-ot-critical-infra"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                  <FileText className="mr-2 h-4 w-4" />
                  View Full Report
                </Button>
              </Link>
            )}
            <p className="text-xs text-muted-foreground">
              <Image className="mr-1 inline-block h-3 w-3" />
              {isThreatIntelReport()
                ? "Threat intelligence map - Click above to view complete incident report"
                : "Image output ready to download"}
            </p>
          </div>
        )}

        {/* Audio Preview */}
        {isAudio && (
          <div className="space-y-2">
            <div className="rounded-md border border-border/60 bg-muted/20 p-3">
              <audio controls className="w-full">
                <source src={node.data.output.url || node.data.output} />
                Your browser does not support the audio element.
              </audio>
            </div>
            <p className="text-xs text-muted-foreground">
              <Music className="mr-1 inline-block h-3 w-3" />
              Audio output ready to download
            </p>
          </div>
        )}

        {/* Text/JSON Preview (default) */}
        {!isImage && !isAudio && (
          <pre className="max-h-48 overflow-auto rounded-md border border-border/60 bg-muted/40 p-3 text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap">
            {typeof node.data.output === "string"
              ? node.data.output
              : JSON.stringify(node.data.output, null, 2)}
          </pre>
        )}
      </div>
    )
  }

  return (
    <aside className="absolute right-0 top-0 z-10 h-full w-full border-l border-border bg-card md:relative md:w-80">
      <div className="flex items-center justify-between border-b border-border p-4">
        <h2 className="text-sm font-semibold text-foreground">Node Configuration</h2>
        <div className="flex items-center gap-1">
          {onDelete && (
            <Button variant="ghost" size="icon" onClick={onDelete} title="Delete node (Del)">
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="overflow-y-auto p-4" style={{ height: "calc(100% - 57px)" }}>
        {renderConfig()}
        {renderOutputSection()}
      </div>
    </aside>
  )
}
