"use client"

import { memo } from "react"
import { Handle, Position, type NodeProps } from "@xyflow/react"
import { ImageIcon, Download } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getStatusColor } from "@charliesu/workflow-core"

export type ImageGenerationNodeData = {
  model: string
  aspectRatio?: string
  outputFormat?: string
  status?: "idle" | "running" | "completed" | "error"
  output?: any
}

function ImageGenerationNode({ data, selected }: NodeProps<ImageGenerationNodeData>) {
  const status = data.status || "idle"

  const handleDownloadImage = (imageData: string, index: number) => {
    try {
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
    } catch (error) {
      console.error("Failed to download image:", error)
    }
  }

  return (
    <Card
      className={`min-w-[220px] max-w-[300px] border-2 bg-card/95 backdrop-blur-sm transition-all ${getStatusColor(status, selected)}`}
    >
      <div className="flex items-center gap-2 border-b border-border/50 bg-gradient-to-r from-chart-1/10 to-transparent px-2.5 py-1.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-chart-1 shadow-sm">
          <ImageIcon className="h-3.5 w-3.5 text-primary-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-foreground leading-tight">Image Generation</h3>
          <p className="text-xs text-muted-foreground/90 truncate leading-tight mt-0.5">Generate images</p>
        </div>
      </div>

      <div className="space-y-1.5 px-2.5 py-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground/90 font-medium">Model</span>
          <span className="text-xs font-semibold text-foreground truncate ml-2">{data.model || "gemini-2.5-flash-image"}</span>
        </div>
        {data.aspectRatio && (
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground/90 font-medium">Aspect Ratio</span>
            <span className="text-xs font-semibold text-foreground">{data.aspectRatio}</span>
          </div>
        )}
        {status === "running" && (
          <div className="flex items-center gap-2 text-xs text-yellow-600 dark:text-yellow-500 font-medium">
            <div className="h-2 w-2 animate-pulse rounded-full bg-yellow-500 shadow-sm shadow-yellow-500/50" />
            Generating...
          </div>
        )}
      </div>

      {data.output && (
        <div className="border-t border-border/50 bg-secondary/40 px-2.5 py-2">
          <p className="mb-2 text-xs font-semibold text-muted-foreground/90 uppercase tracking-wide">Output:</p>
          {data.output.text && (
            <div className="mb-2 rounded-md bg-background/90 p-3 border border-border/30">
              <p className="text-xs text-foreground/95 whitespace-pre-wrap break-words leading-relaxed">
                {data.output.text}
              </p>
            </div>
          )}
          {data.output.images && data.output.images.length > 0 && (
            <div className="space-y-2">
              {data.output.images.map((imageDataUrl: string, idx: number) => (
                <div key={idx} className="space-y-1.5">
                  <img
                    src={imageDataUrl || "/placeholder.svg"}
                    alt={`Generated image ${idx + 1}`}
                    className="w-full rounded-md border-2 border-border/30 shadow-sm"
                    onError={(e) => {
                      console.error("[v0] Image failed to load:", imageDataUrl.substring(0, 50))
                      e.currentTarget.src = "/image-error.png"
                    }}
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full h-7 text-xs"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDownloadImage(imageDataUrl, idx)
                    }}
                  >
                    <Download className="mr-1.5 h-3 w-3" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          )}
          {data.output.url && typeof data.output.url === 'string' && data.output.url.startsWith('data:image/') && (
            <div className="space-y-1.5">
              <img
                src={data.output.url}
                alt="Generated image"
                className="w-full rounded-md border-2 border-border/30 shadow-sm"
              />
              <Button
                size="sm"
                variant="outline"
                className="w-full h-7 text-xs"
                onClick={(e) => {
                  e.stopPropagation()
                  handleDownloadImage(data.output.url, 0)
                }}
              >
                <Download className="mr-1.5 h-3 w-3" />
                Download
              </Button>
            </div>
          )}
        </div>
      )}

      <Handle
        type="target"
        position={Position.Left}
        id="prompt"
        className="!bg-chart-1 !w-3 !h-3 !border-2 !border-background shadow-lg"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="image"
        className="!bg-chart-1 !w-3 !h-3 !border-2 !border-background shadow-lg"
      />
    </Card>
  )
}

export default memo(ImageGenerationNode)
