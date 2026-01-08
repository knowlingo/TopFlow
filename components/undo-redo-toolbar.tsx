"use client"

import { Button } from "@/components/ui/button"
import { Undo2, Redo2 } from "lucide-react"
import { useWorkflowStore } from "@/lib/workflow-store"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Kbd } from "@/components/ui/kbd"

export function UndoRedoToolbar() {
  const { undo, redo, canUndo, canRedo, getHistory, currentIndex } = useWorkflowStore()
  const history = getHistory()

  const handleUndo = () => {
    if (canUndo()) {
      undo()
    }
  }

  const handleRedo = () => {
    if (canRedo()) {
      redo()
    }
  }

  // Get last 10 history entries for display
  const recentHistory = history.slice(Math.max(0, currentIndex - 9), currentIndex + 1).reverse()

  return (
    <div className="flex items-center gap-1">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" disabled={!canUndo()} className="gap-2">
            <Undo2 className="h-4 w-4" />
            <span className="hidden md:inline">Undo</span>
            <Kbd className="hidden lg:inline">⌘Z</Kbd>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-64">
          <DropdownMenuLabel>History</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {recentHistory.length > 0 ? (
            recentHistory.map((entry, idx) => (
              <DropdownMenuItem key={entry.timestamp} className="text-sm">
                <span className="flex-1 truncate">{entry.action}</span>
                <span className="text-xs text-muted-foreground">{new Date(entry.timestamp).toLocaleTimeString()}</span>
              </DropdownMenuItem>
            ))
          ) : (
            <DropdownMenuItem disabled>No history</DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <Button variant="ghost" size="sm" disabled={!canRedo()} onClick={handleRedo} className="gap-2">
        <Redo2 className="h-4 w-4" />
        <span className="hidden md:inline">Redo</span>
        <Kbd className="hidden lg:inline">⌘⇧Z</Kbd>
      </Button>
    </div>
  )
}
