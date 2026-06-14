"use client"

import { memo } from "react"
import { Handle, Position, type NodeProps, type Node } from "@xyflow/react"
import { FileText } from "lucide-react"
import { Card } from "@/components/ui/card"
import { getStatusColor } from "@charliesu/workflow-core"

export type PromptNodeData = {
  content: string
  status?: "idle" | "running" | "completed" | "error"
  output?: any
}

function PromptNode({ data, selected }: NodeProps<Node<PromptNodeData>>) {
  const hasVariables = data.content?.includes("$input")
  const status = data.status || "idle"

  return (
    <Card
      className={`min-w-[220px] max-w-[300px] border-2 bg-card/95 backdrop-blur-sm transition-all ${getStatusColor(status, selected)}`}
    >
      <div className="flex items-center gap-2.5 border-b border-border/50 bg-gradient-to-r from-chart-5/10 to-transparent px-2.5 py-1.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-chart-5 shadow-sm">
          <FileText className="h-3.5 w-3.5 text-primary-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-foreground leading-tight">Prompt</h3>
          <p className="text-xs text-muted-foreground/90 truncate leading-tight mt-0.5">
            {hasVariables ? "Template with variables" : "Input text"}
          </p>
        </div>
      </div>

      <div className="px-2.5 py-1.5">
        <p className="line-clamp-3 text-xs text-muted-foreground/90 leading-snug">
          {data.content || "Enter your prompt..."}
        </p>
        {status === "running" && (
          <div className="mt-1.5 flex items-center gap-2 text-xs text-yellow-600 dark:text-yellow-500 font-medium">
            <div className="h-2 w-2 animate-pulse rounded-full bg-yellow-500 shadow-sm shadow-yellow-500/50" />
            Running...
          </div>
        )}
      </div>

      {data.output && (
        <div className="border-t border-border/50 bg-secondary/40 px-2.5 py-2">
          <p className="mb-2 text-xs font-semibold text-muted-foreground/90 uppercase tracking-wide">Output:</p>
          <div className="rounded-md bg-background/90 p-3 max-h-36 overflow-y-auto border border-border/30">
            <p className="text-xs text-foreground/95 whitespace-pre-wrap break-words leading-relaxed">
              {typeof data.output === "string" ? data.output : JSON.stringify(data.output, null, 2)}
            </p>
          </div>
        </div>
      )}

      <Handle
        type="target"
        position={Position.Left}
        id="input"
        className="!bg-chart-5 !w-3 !h-3 !border-2 !border-background shadow-lg"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="output"
        className="!bg-chart-5 !w-3 !h-3 !border-2 !border-background shadow-lg"
      />
    </Card>
  )
}

export default memo(PromptNode)
