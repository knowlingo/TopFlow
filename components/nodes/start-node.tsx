"use client"

import { memo } from "react"
import { Handle, Position, type NodeProps } from "@xyflow/react"
import { Play } from "lucide-react"
import { Card } from "@/components/ui/card"
import { getStatusColor } from "@charliesu/workflow-core"

export type StartNodeData = {
  // Input configuration
  label?: string
  placeholder?: string
  inputType?: "text" | "url" | "number" | "email"
  defaultValue?: string

  // Execution state
  status?: "idle" | "running" | "completed" | "error"
  output?: any
}

function StartNode({ data, selected }: NodeProps<StartNodeData>) {
  const status = data.status || "idle"
  const displayLabel = data.label || "Start"
  const displayDescription = data.label ? (data.placeholder || "User input required") : "Workflow entry point"

  return (
    <Card
      className={`min-w-[170px] border-2 bg-card/95 backdrop-blur-sm transition-all ${getStatusColor(status, selected)}`}
    >
      <div className="flex items-center gap-2 border-b border-border/50 bg-gradient-to-r from-green-500/10 to-transparent px-2.5 py-1.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-green-500 shadow-sm">
          <Play className="h-3.5 w-3.5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-foreground leading-tight">{displayLabel}</h3>
          <p className="text-xs text-muted-foreground/90 truncate leading-tight mt-0.5">{displayDescription}</p>
        </div>
      </div>

      {status === "running" && (
        <div className="flex items-center gap-2 px-2.5 py-2 text-xs text-yellow-600 dark:text-yellow-500 font-medium">
          <div className="h-2 w-2 animate-pulse rounded-full bg-yellow-500 shadow-sm shadow-yellow-500/50" />
          Starting...
        </div>
      )}

      <Handle
        type="source"
        position={Position.Right}
        id="output"
        className="!bg-green-500 !w-3 !h-3 !border-2 !border-background shadow-lg shadow-green-500/30"
      />
    </Card>
  )
}

export default memo(StartNode)
