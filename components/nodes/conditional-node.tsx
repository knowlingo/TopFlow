"use client"

import { memo } from "react"
import { Handle, Position, type NodeProps } from "@xyflow/react"
import { GitBranch } from "lucide-react"
import { Card } from "@/components/ui/card"
import { getStatusColor } from "@charliesu/workflow-core"

export type ConditionalNodeData = {
  condition: string
  status?: "idle" | "running" | "completed" | "error"
  output?: any
}

function ConditionalNode({ data, selected }: NodeProps<ConditionalNodeData>) {
  const status = data.status || "idle"

  return (
    <Card
      className={`min-w-[220px] max-w-[300px] border-2 bg-card/95 backdrop-blur-sm transition-all ${getStatusColor(status, selected)}`}
    >
      <div className="flex items-center gap-2.5 border-b border-border/50 bg-gradient-to-r from-purple-500/10 to-transparent px-2.5 py-1.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-purple-500 shadow-sm">
          <GitBranch className="h-3.5 w-3.5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-foreground leading-tight">Conditional</h3>
          <p className="text-xs text-muted-foreground/90 truncate leading-tight mt-0.5">Branch based on condition</p>
        </div>
      </div>

      <div className="space-y-1.5 px-2.5 py-1.5">
        <div className="text-xs">
          <span className="text-muted-foreground/90 font-semibold mb-1.5 block">Condition:</span>
          <div className="rounded-md bg-secondary/60 px-2.5 py-1.5 font-mono text-xs text-foreground/90 border border-border/30">
            {data.condition || "input1 === 'value'"}
          </div>
        </div>
        {status === "running" && (
          <div className="flex items-center gap-2 text-xs text-yellow-600 dark:text-yellow-500 font-medium">
            <div className="h-2 w-2 animate-pulse rounded-full bg-yellow-500 shadow-sm shadow-yellow-500/50" />
            Evaluating...
          </div>
        )}
      </div>

      {data.output !== undefined && (
        <div className="border-t border-border/50 bg-secondary/40 px-2.5 py-2">
          <p className="mb-2 text-xs font-semibold text-muted-foreground/90 uppercase tracking-wide">Result:</p>
          <div className="rounded-md bg-background/90 p-2.5 border border-border/30">
            <p
              className={`text-sm font-bold ${data.output ? "text-green-600 dark:text-green-500" : "text-red-600 dark:text-red-500"}`}
            >
              {data.output ? "✓ TRUE" : "✗ FALSE"}
            </p>
          </div>
        </div>
      )}

      <Handle
        type="target"
        position={Position.Left}
        id="input"
        className="!bg-purple-500 !w-3 !h-3 !border-2 !border-background shadow-lg"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="true"
        className="!bg-green-500 !w-3 !h-3 !border-2 !border-background shadow-lg shadow-green-500/30"
        style={{ top: "40%" }}
        title="TRUE path"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="false"
        className="!bg-red-500 !w-3 !h-3 !border-2 !border-background shadow-lg shadow-red-500/30"
        style={{ top: "60%" }}
        title="FALSE path"
      />
    </Card>
  )
}

export default memo(ConditionalNode)
