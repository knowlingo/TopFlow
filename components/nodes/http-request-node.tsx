"use client"

import { memo } from "react"
import { Handle, Position, type NodeProps } from "@xyflow/react"
import { Globe } from "lucide-react"
import { Card } from "@/components/ui/card"
import { getStatusColor } from "@charliesu/workflow-core"

export type HttpRequestNodeData = {
  url: string
  method: string
  headers?: string
  body?: string
  status?: "idle" | "running" | "completed" | "error"
  output?: any
}

function HttpRequestNode({ data, selected }: NodeProps<HttpRequestNodeData>) {
  const status = data.status || "idle"

  return (
    <Card
      className={`min-w-[220px] max-w-[300px] border-2 bg-card/95 backdrop-blur-sm transition-all ${getStatusColor(status, selected)}`}
    >
      <div className="flex items-center gap-2.5 border-b border-border/50 bg-gradient-to-r from-blue-500/10 to-transparent px-2.5 py-1.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500 shadow-sm">
          <Globe className="h-3.5 w-3.5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-foreground leading-tight">HTTP Request</h3>
          <p className="text-xs text-muted-foreground/90 truncate leading-tight mt-0.5 font-semibold">
            {data.method || "GET"}
          </p>
        </div>
      </div>

      <div className="space-y-1.5 px-2.5 py-1.5">
        <div className="text-xs">
          <span className="text-muted-foreground/90 font-semibold mb-1.5 block">URL:</span>
          <div className="truncate rounded-md bg-secondary/60 px-2.5 py-1.5 font-mono text-xs text-foreground/90 border border-border/30">
            {data.url || "https://api.example.com"}
          </div>
        </div>
        {status === "running" && (
          <div className="flex items-center gap-2 text-xs text-yellow-600 dark:text-yellow-500 font-medium">
            <div className="h-2 w-2 animate-pulse rounded-full bg-yellow-500 shadow-sm shadow-yellow-500/50" />
            Requesting...
          </div>
        )}
      </div>

      {data.output && (
        <div className="border-t border-border/50 bg-secondary/40 px-2.5 py-2">
          <p className="mb-2 text-xs font-semibold text-muted-foreground/90 uppercase tracking-wide">Response:</p>
          <div className="max-h-36 overflow-y-auto rounded-md bg-background/90 p-2.5 border border-border/30">
            <p className="whitespace-pre-wrap break-words text-xs text-foreground/95 leading-snug">
              {typeof data.output === "string" ? data.output : JSON.stringify(data.output, null, 2)}
            </p>
          </div>
        </div>
      )}

      <Handle
        type="target"
        position={Position.Left}
        id="input"
        className="!bg-blue-500 !w-3 !h-3 !border-2 !border-background shadow-lg"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="output"
        className="!bg-blue-500 !w-3 !h-3 !border-2 !border-background shadow-lg"
      />
    </Card>
  )
}

export default memo(HttpRequestNode)
