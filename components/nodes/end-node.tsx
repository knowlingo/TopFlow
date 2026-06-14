"use client"

import { memo } from "react"
import { Handle, Position, type NodeProps, type Node } from "@xyflow/react"
import { Flag, Download, FileText } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getStatusColor } from "@charliesu/workflow-core"
import Link from "next/link"

export type EndNodeData = {
  status?: "idle" | "running" | "completed" | "error"
  output?: any
  workflowId?: string
  onViewResults?: () => void
}

function EndNode({ data, selected }: NodeProps<Node<EndNodeData>>) {
  const status = data.status || "idle"

  // Check if this is a threat intelligence report output
  const isThreatIntelReport = () => {
    return (
      data.output &&
      typeof data.output === "object" &&
      "report" in data.output &&
      "threat_map" in data.output
    )
  }

  // Check if this is a GitHub Scanner result
  const isGitHubScannerReport = () => {
    return data.workflowId === "github-security-scanner" && data.output && data.status === "completed"
  }

  const hasImages = () => {
    if (!data.output) return false

    // Check for images array property (from image generation node)
    if (data.output.images && Array.isArray(data.output.images)) {
      return data.output.images.length > 0
    }

    // Check for threat_map image URL
    if (isThreatIntelReport() && data.output.threat_map) {
      return true
    }

    if (Array.isArray(data.output)) {
      return data.output.some((item) => {
        if (typeof item !== "string") return false
        // Check for data URL or raw base64 (starts with / or contains base64 pattern)
        return item.startsWith("data:image/") || item.startsWith("/") || /^[A-Za-z0-9+/=]{20,}/.test(item)
      })
    }
    if (typeof data.output === "string") {
      return data.output.startsWith("data:image/") || data.output.startsWith("/") || /^[A-Za-z0-9+/=]{20,}/.test(data.output)
    }
    return false
  }

  const getImages = () => {
    if (!data.output) return []

    // Extract images from images array property (from image generation node)
    if (data.output.images && Array.isArray(data.output.images)) {
      return data.output.images.filter((img: any) => typeof img === "string")
    }

    // Get threat map if available
    if (isThreatIntelReport() && data.output.threat_map) {
      return [data.output.threat_map]
    }

    const convertToDataUrl = (img: string) => {
      if (typeof img !== "string") return ""
      // If already a data URL or path, return as-is
      if (img.startsWith("data:") || img.startsWith("/")) return img
      // If raw base64, add data URL prefix
      if (/^[A-Za-z0-9+/=]{20,}/.test(img)) {
        return `data:image/png;base64,${img}`
      }
      return img
    }

    if (Array.isArray(data.output)) {
      return data.output
        .filter((item): item is string => typeof item === "string")
        .filter((item) => item.startsWith("data:image/") || item.startsWith("/") || /^[A-Za-z0-9+/=]{20,}/.test(item))
        .map(convertToDataUrl)
        .filter(Boolean)
    }
    if (typeof data.output === "string") {
      const converted = convertToDataUrl(data.output)
      return converted ? [converted] : []
    }
    return []
  }

  const handleDownloadImage = async (imageData: string, index: number) => {
    try {
      // Handle base64 data URLs
      if (imageData.startsWith("data:image/")) {
        // Extract base64 data and mime type
        const [metadata, base64] = imageData.split(',')
        const mimeType = metadata.match(/:(.*?);/)?.[1] || 'image/png'
        const extension = mimeType.split('/')[1] || 'png'

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
        a.download = `generated-image-${Date.now()}-${index + 1}.${extension}`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      } else {
        // Handle regular URLs (like /demo-assets/images/threat-intelligence-map.webp)
        const extension = imageData.match(/\.(png|jpg|jpeg|gif|webp|svg)$/i)?.[1] || "png"

        // Fetch the image
        const response = await fetch(imageData)
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)

        // Download file
        const a = document.createElement("a")
        a.href = url
        a.download = `generated-image-${Date.now()}-${index + 1}.${extension}`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error("Failed to download image:", error)
    }
  }

  return (
    <Card
      className={`min-w-[170px] border-2 bg-card/95 backdrop-blur-sm transition-all ${getStatusColor(status, selected)}`}
    >
      <div className="flex items-center gap-2 border-b border-border/50 bg-gradient-to-r from-red-500/10 to-transparent px-2.5 py-1.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-red-500 shadow-sm">
          <Flag className="h-3.5 w-3.5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-foreground leading-tight">End</h3>
          <p className="text-xs text-muted-foreground/90 truncate leading-tight mt-0.5">Workflow output</p>
        </div>
      </div>

      {data.output && (
        <div className="border-t border-border/50 bg-secondary/40 px-2.5 py-2">
          <p className="mb-1.5 text-xs font-semibold text-muted-foreground/90 uppercase tracking-wide">Final Output:</p>
          {hasImages() ? (
            <div className="space-y-2">
              {getImages().map((img, idx) => (
                <div key={idx} className="space-y-1.5">
                  <img
                    src={img || "/placeholder.svg"}
                    alt={`Output ${idx + 1}`}
                    className="w-full rounded-md border-2 border-border/30 shadow-sm"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full h-7 text-xs"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDownloadImage(img, idx)
                    }}
                  >
                    <Download className="mr-1.5 h-3 w-3" />
                    Download Image
                  </Button>
                  {isThreatIntelReport() && (
                    <Link
                      href="/reports/template-ot-critical-infra"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        size="sm"
                        className="w-full h-7 text-xs bg-primary hover:bg-primary/90"
                      >
                        <FileText className="mr-1.5 h-3 w-3" />
                        View Full Report
                      </Button>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="max-h-36 overflow-y-auto rounded-md bg-background/90 p-2.5 border border-border/30">
              <p className="whitespace-pre-wrap break-words text-xs text-foreground/95 leading-snug">
                {typeof data.output === "string" ? data.output : JSON.stringify(data.output, null, 2)}
              </p>
            </div>
          )}
          {/* GitHub Scanner View Full Report button - always show when conditions met */}
          {isGitHubScannerReport() && data.onViewResults && (
            <Button
              size="sm"
              className="w-full h-7 text-xs bg-primary hover:bg-primary/90 mt-1.5"
              onClick={(e) => {
                e.stopPropagation()
                data.onViewResults?.()
              }}
            >
              <FileText className="mr-1.5 h-3 w-3" />
              View Full Report
            </Button>
          )}
        </div>
      )}

      <Handle
        type="target"
        position={Position.Left}
        id="input"
        className="!bg-red-500 !w-3 !h-3 !border-2 !border-background shadow-lg shadow-red-500/30"
      />
    </Card>
  )
}

export default memo(EndNode)
