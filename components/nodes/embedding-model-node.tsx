"use client"

import { memo } from "react"
import { Handle, Position, type NodeProps, type Node } from "@xyflow/react"
import { Layers, Settings } from "lucide-react"
import { Card } from "@/components/ui/card"

export type EmbeddingModelNodeData = {
  model: string
  dimensions?: number
}

function EmbeddingModelNode({ data, selected }: NodeProps<Node<EmbeddingModelNodeData>>) {
  return (
    <Card
      className={`min-w-[220px] border-2 bg-card transition-all ${
        selected ? "border-primary shadow-lg" : "border-border"
      }`}
    >
      <div className="flex items-center gap-2 border-b border-border bg-secondary/50 px-2.5 py-1.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-chart-2">
          <Layers className="h-3.5 w-3.5 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-foreground">Embedding Model</h3>
          <p className="text-xs text-muted-foreground">{data.model || "openai/text-embedding-3-small"}</p>
        </div>
        <Settings className="h-4 w-4 text-muted-foreground" />
      </div>

      <div className="space-y-1.5 px-2.5 py-1.5">
        <div className="flex justify-between text-xs leading-snug">
          <span className="text-muted-foreground">Dimensions:</span>
          <span className="font-mono text-foreground">{data.dimensions || 1536}</span>
        </div>
      </div>

      <Handle type="target" position={Position.Left} id="input" className="!bg-chart-2" />
      <Handle type="source" position={Position.Right} id="embedding" className="!bg-chart-2" />
    </Card>
  )
}

export default memo(EmbeddingModelNode)
