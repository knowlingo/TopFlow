"use client"

import { memo } from "react"
import { Handle, Position, type NodeProps } from "@xyflow/react"
import { MessageSquare, Settings } from "lucide-react"
import { Card } from "@/components/ui/card"
import { getStatusColor } from "@charliesu/workflow-core"

export type TextModelNodeData = {
  model: string
  temperature: number
  maxTokens: number
  prompt?: string
  status?: "idle" | "running" | "completed" | "error"
  structuredOutput?: boolean
  schema?: string
  schemaName?: string
  output?: any
}

function TextModelNode({ data, selected }: NodeProps<TextModelNodeData>) {
  const status = data.status || "idle"

  return (
    <Card
      className={`min-w-[260px] max-w-[360px] border-2 bg-card/95 backdrop-blur-sm transition-all ${getStatusColor(status, selected)}`}
    >
      <div className="flex items-center gap-2.5 border-b border-border/50 bg-gradient-to-r from-primary/5 to-transparent px-2.5 py-1.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary shadow-sm">
          <MessageSquare className="h-3.5 w-3.5 text-primary-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-foreground leading-tight">Text Model</h3>
          <p className="text-xs text-muted-foreground/90 truncate leading-tight mt-0.5">
            {data.model || "openai/gpt-4o-mini"} {/* Updated default display model */}
          </p>
        </div>
        <Settings className="h-4 w-4 text-muted-foreground/70 shrink-0" />
      </div>

      <div className="space-y-1.5 px-3 py-1.5">
        <div className="flex items-center justify-between gap-2 text-xs leading-snug">
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground/90 font-medium">Temp:</span>
            <span className="font-mono text-foreground font-semibold">{data.temperature || 0.7}</span>
          </div>
          <span className="text-muted-foreground/40">•</span>
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground/90 font-medium">Tokens:</span>
            <span className="font-mono text-foreground font-semibold">
              {data.maxTokens ? (data.maxTokens >= 1000 ? `${(data.maxTokens/1000).toFixed(data.maxTokens % 1000 === 0 ? 0 : 1)}k` : data.maxTokens) : '2k'}
            </span>
          </div>
        </div>
        {data.structuredOutput && (
          <div className="flex justify-between text-xs leading-snug">
            <span className="text-muted-foreground/90 font-medium">Structured:</span>
            <span className="font-mono text-foreground font-semibold">{data.schemaName || "Yes"}</span>
          </div>
        )}
        {status === "running" && (
          <div className="flex items-center gap-2 text-xs text-yellow-600 dark:text-yellow-500 font-medium">
            <div className="h-2 w-2 animate-pulse rounded-full bg-yellow-500 shadow-sm shadow-yellow-500/50" />
            Running...
          </div>
        )}
      </div>

      {data.output && (
        <div className="border-t border-border/50 bg-secondary/40 px-3 py-2">
          <p className="mb-2 text-xs font-semibold text-muted-foreground/90 uppercase tracking-wide">Output:</p>
          <div className="rounded-md bg-background/90 p-3 max-h-36 overflow-y-auto border border-border/30">
            <p className="text-xs text-foreground/95 whitespace-pre-wrap break-words leading-relaxed">
              {typeof data.output === "object" && data.output.text
                ? data.output.text
                : typeof data.output === "string"
                  ? data.output
                  : JSON.stringify(data.output, null, 2)}
            </p>
          </div>
        </div>
      )}

      <Handle
        type="target"
        position={Position.Left}
        id="prompt"
        className="!bg-primary !w-3 !h-3 !border-2 !border-background shadow-lg"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="output"
        className="!bg-primary !w-3 !h-3 !border-2 !border-background shadow-lg"
      />
    </Card>
  )
}

export default memo(TextModelNode)
